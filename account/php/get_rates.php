<?php
session_start();


include_once "../functions.php";
isTime();

if (!isset($_SESSION['id'])) {
    exit("No valid user presents!");
}

if ($_SERVER["REQUEST_METHOD"] != "GET") {
    exit("Invalid parameters!");
}

$id = $_SESSION['id'];

include_once "connect_db.php";
$rates = array();

$crypto_rates = array();
$query = "SELECT fname, lname FROM users WHERE id='$id'";
$result = $conn->query($query);
if ($result == true && $result->num_rows == 1) {
    // get crypto rates
    $sql = "SELECT price FROM buy_cryptos LIMIT 1";
    $c_res = $conn->query($sql);
    if ($c_res == true && $c_res->num_rows == 1) {
        array_push($crypto_rates, array("crypto", $c_res->fetch_assoc()["price"], "buy"));

        $sell_sql = "SELECT price FROM sell_cryptos LIMIT 1";
        $sell_res = $conn->query($sell_sql);
        if ($sell_res == true && $sell_res->num_rows == 1) {
            array_push($crypto_rates, array("crypto", $sell_res->fetch_assoc()["price"], "sell"));
        } else {
            array_push($crypto_rates, array("No sell crypto yet.. Contact Admin"));
            $conn->close();
        }
    } else {
        array_push($crypto_rates, array("No buy crypto yet.. Contact Admin"));
        $conn->close();
    }
} else {
    array_push($crypto_rates, array("User does not exist. Try login again"));
    $conn->close();
}

array_push($rates, $crypto_rates);

// get giftcards rates

$g_sql = "SELECT name, price FROM giftcards WHERE type='sub_category'";
$g_res = $conn->query($g_sql);
$arr = array();
if ($g_res == true && $g_res->num_rows > 0) {
    while ($r = $g_res->fetch_assoc()) {
        array_push($arr, array($r['name'], $r["price"]));
    };
    array_push($rates, $arr);
} else {
    array_push($arr, array("No giftcard yet.. Contact Admin"));
    array_push($rates, $arr);
    $conn->close();
}
echo json_encode($rates);
$conn->close();
