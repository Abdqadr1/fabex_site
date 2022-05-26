<?php
session_start();


include_once "connect_db.php";
include_once "../functions.php";
isTime($conn);

if (!isset($_SESSION['id'])) {
    exit("No valid user presents!");
}

if ($_SERVER["REQUEST_METHOD"] != "GET") {
    exit("Invalid parameters!");
}

$id = $_SESSION['id'];

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

$g_sql = "SELECT name, buy_price, sell_price FROM giftcards WHERE type='sub_category'
     AND status=1 AND (buy_price > 0 OR sell_price > 0)";
$g_res = $conn->query($g_sql);
if ($g_res == true && $g_res->num_rows > 0) {
    array_push($rates, $g_res->fetch_all(MYSQLI_ASSOC));
} else {
    array_push($rates, []);
    $conn->close();
}
echo json_encode($rates);
$conn->close();
