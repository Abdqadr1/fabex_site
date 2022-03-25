<?php
session_start();
include_once "connect_db.php";
if (
    !isset($_SESSION["id"]) || !isset($_SESSION["tx_id"]) || !isset($_SESSION["amount"]) || !isset($_SESSION["which"])
    || !isset($_POST["bankname"]) || !isset($_POST["accountname"]) || !isset($_POST["accountnumber"])
) {
    exit("Not enough parameters!");
}
if (
    empty($_SESSION["id"]) || empty($_SESSION["tx_id"]) || empty($_SESSION["amount"]) || empty($_SESSION["which"])
    || empty($_POST["bankname"]) || empty($_POST["accountname"]) || empty($_POST["accountnumber"])
) {
    exit("Parameters must not be empty!");
}
$id = $_SESSION["id"];
$tx_id = $_SESSION["tx_id"];
$amount = $_SESSION["amount"];
$which = $_SESSION["which"];
$bankname = $_POST["bankname"];
$accountnumber = $_POST["accountnumber"];
$accountname = $_POST["accountname"];

$sql = "SELECT COUNT(*) FROM trx_history WHERE tx_id='$tx_id'";
$res = $conn->query($sql);
if ($res->fetch_array()[0] == 1) {
    $query = "UPDATE trx_history SET status='1', proof='', bank_name='$bankname', account_name='$accountname', 
    account_number='$accountnumber' WHERE tx_id='$tx_id'";
    $result = $conn->query($query);
    if ($result === true) {
        $_SESSION['tx_id'] = "";
        $_SESSION["which"] = "";
        $_SESSION["amount"] = "";
        $_SESSION["price"] = "";
        echo "Success: transaction status updated!";
    } else {
        echo "Something went wrong: " . $conn->error;
    }
}
