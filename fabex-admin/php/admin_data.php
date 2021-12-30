<?php
include_once "../../php/connect_db.php";
if (!isset($_GET["which"]) || empty($_GET["which"])) {
    exit("Invalid parameters..");
}

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
    if (!isset($_GET["type"]) || empty($_GET["type"])) {
        exit("Invalid parameters..");
    }
    $arr = array();
    $type = mysqli_escape_string($conn, $_GET["type"]);
    $type = testInput($type);
    $sql = "SELECT users.fname, users.lname, trx_history.id FROM trx_history 
    INNER JOIN users ON trx_history.u_id=users.id AND trx_history.which='$type'";
    $result = $conn->query($sql);
    if ($result == true && $result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            array_push($arr, $row);
        }
        echo json_encode(array("success", $arr));
    } else {
        exit(json_encode(array("No transaction yet..", $arr)));
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
