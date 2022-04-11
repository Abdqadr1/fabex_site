<?php
if (!isset($_GET["which"]) || empty($_GET["which"])) {
    echo ("Invalid parameters..");
}
include_once "../../account/php/connect_db.php";
$which = mysqli_escape_string($conn, $_GET["which"]);
$which = testInput($which);

function getBanks(mysqli &$conn)
{
    $sql = "SELECT id, bank_name, account_name, account_number FROM admin_banks";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        $row = $result->fetch_all();
        echo json_encode(array("Success", $row));
    } else {
        echo ("Something went wrong");
    }
    $conn->close();
};

function getSellCryptos(mysqli &$conn)
{
    $sql = "SELECT id, name, acronym, network, address, status, memo FROM sell_cryptos";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        $array = array();
        while ($row = $result->fetch_assoc()) {
            $isOn = $row['status'] == 1 ? true : false;
            $arr = array($row["id"], $row["name"], $row["acronym"], $row["network"], $row["address"], $row['memo'], $isOn);
            array_push($array, $arr);
        }
        echo json_encode(array("success" => $array));
    } else {
        echo ("Something went wrong");
    }
    $conn->close();
}

function getBuyCryptos(mysqli &$conn)
{
    $sql = "SELECT id, name, acronym, network, status FROM buy_cryptos";
    $result = $conn->query($sql);
    if ($result == true && $result->num_rows > 0) {
        $array = array();
        while ($row = $result->fetch_assoc()) {
            $isOn = $row['status'] == 1 ? true : false;
            $arr = array($row["id"], $row["name"], $row["acronym"], $row["network"], $isOn);
            array_push($array, $arr);
        }
        echo json_encode(array("success" => $array));
    } else {
        echo (json_encode("No buy crypto found"));
    }
    $conn->close();
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
            $query = "SELECT id, name, status, topten FROM giftcards WHERE parent='$parent_id'";
            $res = $conn->query($query);
            if ($res == true && $res->num_rows > 0) {
                while ($roww = $res->fetch_assoc()) {
                    $id = $roww['id'];
                    $childName = $roww["name"];
                    $stat = $roww['status'];
                    array_push($sub_cat, array($id, $childName, "sub_category", $stat, $parent_id, $roww['topten']));
                }
            } else {
                array_push($sub_cat, array());
            }
        }
        echo json_encode(array($cat, $sub_cat));
    } else {
        echo ("No giftcard.");
    }
    $conn->close();
}

function getRates(mysqli &$conn)
{
    $arr = array();

    // get buy crypto price
    $bSql = "SELECT price, low_price FROM buy_cryptos LIMIT 1";
    $bRes = $conn->query($bSql);
    if ($bRes == true && $bRes->num_rows > 0) {
        $bAll = $bRes->fetch_array();
        array_push($arr, array("which" => "crypto", "price" => $bAll[0], "type" => "buy", "range" => "normal"));
        array_push($arr, array("which" => "crypto", "price" => $bAll[1], "type" => "buy", "range" => "range"));
    } else {
        array_push($arr, array("msg" => "not_found", "which" => "crypto", "price" => "", "type" => "buy", "range" => "normal"));
        array_push($arr, array("msg" => "not_found", "which" => "crypto", "price" => "", "type" => "buy", "range" => "range"));
    }
    // get sell crypto price
    $sql = "SELECT price, low_price FROM sell_cryptos LIMIT 1";
    $res = $conn->query($sql);
    if ($res == true && $res->num_rows > 0) {
        $all = $res->fetch_array();
        array_push($arr, array("which" => "crypto", "price" => $all[0], "type" => "sell", "range" => "normal"));
        array_push($arr, array("which" => "crypto", "price" => $all[1], "type" => "sell", "range" => "range"));
    } else {
        array_push($arr, array("msg" => "not_found", "which" => "crypto", "price" => "", "type" => "sell", "range" => "normal"));
        array_push($arr, array("msg" => "not_found", "which" => "crypto", "price" => "", "type" => "sell", "range" => "range"));
    }
    //get giftcards prices
    $query = "SELECT id, name, price FROM giftcards where type='sub_category'";
    $result = $conn->query($query);
    if ($result == true && $result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $id = $row['id'];
            $name = $row['name'];
            $price = $row['price'];
            array_push($arr, array("which" => "giftcard", "id" => $id, "name" => $name, "price" => $price));
        }
    } else {
        array_push($arr, array("msg" => "not_found", "which" => "giftcard", "id" => "", "name" => "No giftcard found", "price" => ""));
    }

    echo json_encode(array("success", $arr));
    $conn->close();
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
        $need = "CONCAT (users.fname,' ', users.lname) AS name, users.bank_name AS user_bank, users.account_number AS user_account_number, trx_history.id, trx_history.tx_id, trx_history.product, 
        trx_history.amount, trx_history.price, trx_history.wallet_address, trx_history.time, trx_history.status, 
        trx_history.type, trx_history.bank_name, trx_history.account_number, trx_history.memo, trx_history.which, trx_history.network, trx_history.proof";
    } else {
        $need = "CONCAT (users.fname,' ', users.lname) AS name, users.bank_name AS user_bank, users.account_number AS user_account_number,trx_history.email, trx_history.id, trx_history.tx_id, trx_history.product, 
        trx_history.amount, trx_history.price, trx_history.time, trx_history.status, trx_history.type,
        trx_history.bank_name, trx_history.account_number, trx_history.which, trx_history.proof";
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
    $conn->close();
}

function deleteBank(mysqli &$conn)
{
    $header = getallheaders();
    if (isset($header['ref']) && !empty($header['ref'])) {
        $id = mysqli_escape_string($conn, $header["ref"]);
        $id = testInput($id);
        $sql = "DELETE FROM admin_banks WHERE id='$id'";
        $result = $conn->query($sql);
        if ($result == true) {
            echo "Deleted Successfully!";
        } else {
            echo "Something went wrong, Try again!";
        }
    } else {
        echo "Invalid parameters";
    }
    $conn->close();
}

function toggleTen(mysqli &$conn)
{
    $headers = getallheaders();
    if (!isset($headers["prevState"]) || !isset($headers['id']) || empty($headers["id"])) {
        $conn->close();

        exit(json_encode(array("message" => "No previous state or id included")));
    }
    $prev = $conn->real_escape_string($headers["prevState"]);
    $id = $conn->real_escape_string($headers["id"]);
    $prev = testInput($prev);
    $id = testInput($id);
    $new = $prev == 1 ? 0 : 1;
    $sql = "UPDATE giftcards SET topten='$new' WHERE id='$id'";
    if ($conn->query($sql)) {
        $msg = $new === 1 ? "added to" : "removed from";
        echo (json_encode(array("message" => "giftcard $msg top 10 successfully")));
    } else {
        $msg = $new === 1 ? " adding giftcard to " : " removing giftcard from ";
        echo (json_encode(array("message" => "something went wrong $msg top 10.Try again")));
    }
}


switch ($which) {
    case "toggle_ten":
        return toggleTen($conn);
    case "bank":
        return getBanks($conn);
    case "deleteBank":
        return deleteBank($conn);
    case "sell_crypto":
        return getSellCryptos($conn);
    case "buy_crypto":
        return getBuyCryptos($conn);
    case "giftcard":
        return getGiftcards($conn);
    case "rates":
        return getRates($conn);
    case "orders":
        return getAllOrders($conn, $which);
}
$conn->close();
