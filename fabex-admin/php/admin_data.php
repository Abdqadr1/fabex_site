<?php
session_start();
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
        array_push($arr, array("which" => "crypto", "price" => $bAll[0], "low_price" => $bAll[1], "type" => "buy"));
    } else {
        array_push($arr, array("msg" => "not_found", "which" => "crypto", "price" => "", "type" => "buy"));
    }
    // get sell crypto price
    $sql = "SELECT price, low_price FROM sell_cryptos LIMIT 1";
    $res = $conn->query($sql);
    if ($res == true && $res->num_rows > 0) {
        $all = $res->fetch_array();
        array_push($arr, array("which" => "crypto", "price" => $all[0], "low_price" => $all[1], "type" => "sell"));
    } else {
        array_push($arr, array("msg" => "not_found", "which" => "crypto", "price" => "", "type" => "sell"));
    }
    //get giftcards prices
    $query = "SELECT id, name, sell_price, buy_price FROM giftcards where type='sub_category'";
    $result = $conn->query($query);
    if ($result == true && $result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $id = $row['id'];
            $name = $row['name'];
            $sell_price = $row['sell_price'];
            $buy_price = $row['buy_price'];
            array_push($arr, array("which" => "giftcard", "id" => $id, "name" => $name, "sell_price" => $sell_price, "buy_price" => $buy_price));
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
    if (
        !isset($header["type"]) || empty($header["type"]) || !isset($header["action"])
        || !isset($header["status"]) || !isset($header["_keyword"])
    ) {
        echo ("Invalid parameters..");
    }
    $arr = array();
    $type = mysqli_escape_string($conn, $header["type"]);
    $action = mysqli_escape_string($conn, $header["action"]);
    $status = mysqli_escape_string($conn, $header["status"]);
    $keyword = mysqli_escape_string($conn, $header["_keyword"]);
    $type = testInput($type);
    $action = testInput($action);
    $status = testInput($status);
    $keyword = testInput($keyword);
    $need = "";
    if ($type == "crypto") {
        $need = "CONCAT (u.fname,' ', u.lname) AS name, u.bank_name AS user_bank, u.account_number AS user_account_number, t.id, t.tx_id, t.product, 
        t.amount, t.price, t.wallet_address, t.time, t.status, t.type, t.bank_name, t.account_number, t.memo, t.which, t.network, t.proof";
    } else {
        $need = "CONCAT (u.fname,' ', u.lname) AS name, u.bank_name AS user_bank, u.account_number AS user_account_number,t.email, t.id, t.tx_id, t.product, 
        t.amount, t.price, t.time, t.status, t.type,t.bank_name, t.account_number, t.which, t.proof";
    }
    $sql = "SELECT " . $need . " FROM trx_history AS t INNER JOIN users AS u ON t.u_id=u.id 
    AND t.which='$type' AND t.type='$action' AND t.status='$status' AND CONCAT(t.tx_id, ' ',t.descrip,' ',t.amount,' ',t.price,' ',t.email, ' ', t.bank_name,
    ' ', t.account_name,' ', t.account_number, ' ', t.wallet_address, ' ', t.network, ' ', t.memo) LIKE '%$keyword%' ORDER BY t.time DESC";

    error_reporting(E_ALL);
    $result = $conn->query($sql);
    if ($result == true && $result->num_rows > 0) {
        echo json_encode(array("success", $result->fetch_all(MYSQLI_ASSOC)));
    } else {
        array_push($arr, "type: " . $type, "action: " . $action, "status: " . $status, "keyword: " . $keyword);
        echo (json_encode(array("No transaction found for the search queries\n" . json_encode($arr))));
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
    if (!isset($headers["_prevstate"]) || !isset($headers['_id']) || empty($headers["_id"])) {
        $conn->close();

        $head = json_encode($headers);
        exit(json_encode(array("message" => "No previous state or id included")));
    }
    $prev = $conn->real_escape_string($headers["_prevstate"]);
    $id = $conn->real_escape_string($headers["_id"]);
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

function getAllAdmins(mysqli &$conn)
{
    if ($_SESSION["access_level"] == 1) {
        $sql = "SELECT id, full_name, email, access_level, access FROM admins WHERE access_level!=1";
        $res = $conn->query($sql);
        if ($res->num_rows > 0) {
            $arr = array();
            while ($row = $res->fetch_assoc()) {
                array_push($arr, $row);
            }
            echo json_encode($arr);
        } else {
            echo json_encode([]);
        }
    } else {
        http_response_code(403);
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
    case "admins":
        return getAllAdmins($conn);
}
$conn->close();
