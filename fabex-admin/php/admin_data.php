<?php
if (!isset($_GET["which"]) || empty($_GET["which"])) {
    echo ("Invalid parameters..");
}
include_once "../../php/connect_db.php";
$which = mysqli_escape_string($conn, $_GET["which"]);
$which = testInput($which);

function getBank(mysqli &$conn)
{
    $sql = "SELECT * FROM admin_banks LIMIT 1";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $arr = array($row["bank_name"], $row["account_number"], $row["account_name"]);
        echo json_encode(array("Success", $arr));
    } else {
        exit("Something went wrong");
    }
};

function getCryptos(mysqli &$conn)
{
    $sql = "SELECT id, name, acronym, address, status FROM cryptos";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        $array = array();
        while ($row = $result->fetch_assoc()) {
            $isOn = $row['status'] == 1 ? true : false;
            $arr = array($row["id"], $row["name"], $row["acronym"], $row["address"], $isOn);
            array_push($array, $arr);
        }
        echo json_encode(array("success" => $array));
    } else {
        exit("Something went wrong");
    }
}

function getGiftcards(mysqli &$conn)
{
    $cat = array();
    $sub_cat = array();
    $sql = "SELECT id, name, status FROM giftcards WHERE type='category'";
    $result = $conn->query($sql);
    if ($result == true && $result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $parent_id = $row['id'];
            $name = $row["name"];
            $status = $row['status'];
            $arr = array($parent_id, $name, "category", $status);
            array_push($cat, $arr);
            $query = "SELECT id, name, status FROM giftcards WHERE parent='$parent_id'";
            $res = $conn->query($query);
            if ($res == true && $res->num_rows > 0) {
                while ($roww = $res->fetch_assoc()) {
                    $id = $roww['id'];
                    $childName = $roww["name"];
                    $stat = $roww['status'];
                    array_push($sub_cat, array($id, $childName, "sub_category", $stat, $parent_id));
                }
            } else {
                array_push($sub_cat, array());
            }
        }
        echo json_encode(array($cat, $sub_cat));
    } else {
        exit("No giftcard.");
    }
}

function getRates(mysqli &$conn)
{
    $arr = array();
    $sql = "SELECT price FROM cryptos LIMIT 1";
    $res = $conn->query($sql);
    if ($res == true && $res->num_rows > 0) {
        $all = $res->fetch_array();
        array_push($arr, array("crypto", $all[0]));
        //get giftcards prices
        $query = "SELECT id, name, price FROM giftcards where type='sub_category'";
        $result = $conn->query($query);
        if ($result == true && $result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $id = $row['id'];
                $name = $row['name'];
                $price = $row['price'];
                array_push($arr, array("giftcard", $id, $name, $price));
            }
            echo json_encode(array("success", $arr));
        } else {
            echo json_encode(array("Something went wrong getting giftcards prices."));
        }
    } else {
        echo json_encode(array("Something went wrong getting crypto price " . $conn->error));
    }
}

function getAllOrders(mysqli &$conn, string $which)
{
    $header = getallheaders();
    if (!isset($header["type"]) || empty($header["type"]) || !isset($header["action"]) || !isset($header["status"])) {
        echo ("Invalid parameters..");
    }
    $arr = array();
    $type = mysqli_escape_string($conn, $header["type"]);
    $action = mysqli_escape_string($conn, $header["action"]);
    $status = mysqli_escape_string($conn, $header["status"]);
    $type = testInput($type);
    $action = testInput($action);
    $status = testInput($status);
    $need = "";
    if ($type == "crypto") {
        $need = 'CONCAT (users.fname, users.lname) AS name, users.bank_name AS user_bank, users.account_number AS user_account_number, trx_history.id, trx_history.product, 
        trx_history.amount, trx_history.price, trx_history.wallet_address, trx_history.time, trx_history.status, 
        trx_history.type, trx_history.bank_name, trx_history.account_number, trx_history.memo, trx_history.which, trx_history.network';
    } else {
        $need = 'CONCAT (users.fname, users.lname) AS name, users.bank_name AS user_bank, users.account_number AS user_account_number,users.email, trx_history.id, trx_history.product, 
        trx_history.amount, trx_history.price, trx_history.time, trx_history.status, trx_history.type, 
        trx_history.bank_name, trx_history.account_number, trx_history.which';
    }
    $sql = "SELECT " . $need . " FROM trx_history INNER JOIN users ON trx_history.u_id=users.id 
    AND trx_history.which='$type' AND trx_history.type='$action' AND trx_history.status='$status' ORDER BY trx_history.time DESC";

    $result = $conn->query($sql);
    if ($result == true && $result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            array_push($arr, $row);
        }
        echo json_encode(array("success", $arr));
    } else {
        array_push($arr, "type: " . $type, "action: " . $action, "status: " . $status);
        echo (json_encode(array("No transaction found for the search queries \n\n" . json_encode($arr), $arr)));
    }
}

switch ($which) {
    case "bank":
        return getBank($conn);
    case "crypto":
        return getCryptos($conn);
    case "giftcard":
        return getGiftcards($conn);
    case "rates":
        return getRates($conn);
    case "orders":
        return getAllOrders($conn, $which);
}
$conn->close();
