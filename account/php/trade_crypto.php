<?php
session_start();

if (!isset($_SESSION["id"])) {
    exit("No valid user!");
}
if ($_SERVER["REQUEST_METHOD"] != "POST" || !isset($_POST["act"]) || !isset($_SESSION["id"])) {
    exit("Invalid parameters!");
}

$action = $_POST["act"];
$asset = $_POST["asset"];
$amount = $_POST["amount"];
$total = $_POST["total"];
$product_id = $_POST["product_id"];

if (empty($action) || empty($asset) || empty($amount) || empty($total) || empty($product_id)) {
    exit("Fill the required fields!");
}

include_once "connect_db.php";
include_once "user_actions.php";

$action = mysqli_escape_string($conn, $_POST["act"]);
$asset = mysqli_escape_string($conn, $_POST["asset"]);
$amount = mysqli_escape_string($conn, $_POST["amount"]);
$total = mysqli_escape_string($conn, $_POST["total"]);
$product_id = mysqli_escape_string($conn, $_POST["product_id"]);
$action = testInput($action);
$asset = testInput($asset);
$amount = testInput($amount);
$total = testInput($total);
$product_id = testInput($product_id);

if ($amount < 10) {
    exit("The minimum amount allowed is $10");
}

$dir = "trx_proof/";

function buyCrypto(&$conn, $amount, $total, $product_name, $product_id)
{
    if (!isset($_POST["address"]) || !isset($_POST["network"]) || !isset($_POST["memo"])) {
        exit("Incomplete parameters");
    }
    if (empty($_POST["address"]) || empty($_POST["network"])) {
        exit("Parameters cannot be empty");
    }
    $network = mysqli_escape_string($conn, $_POST["network"]);
    $address = mysqli_escape_string($conn, $_POST["address"]);
    $memo = mysqli_escape_string($conn, $_POST["memo"]);
    $network = testInput($network);
    $address = testInput($address);
    $memo = testInput($memo);
    $uid = $_SESSION["id"];
    $tx_id = getId($conn);
    $desc = "Bought " . $product_name;
    // insert into transactions
    $sql = "INSERT INTO trx_history (u_id, tx_id, descrip, amount, price, product, type, status, network, wallet_address,which, memo) 
    VALUES ('$uid','$tx_id','$desc', '$total', '$amount','$product_name', 0,0, '$network','$address','crypto', '$memo')";
    $res = $conn->query($sql);
    if ($res === true) {
        $_SESSION['tx_id'] = $tx_id;
        $_SESSION["which"] = "crypto";
        $_SESSION["act"] = "buy";
        $_SESSION["amount"] = $total;
        echo "Success: transaction was inserted " . $conn->insert_id;
    } else {
        echo "Something went wrong " . $conn->error;
    }
}

function sellCrypto(&$conn, $amount, $total, $product_name, $product_id)
{
    $uid = $_SESSION["id"];
    $tx_id = getId($conn);
    $desc = "Sold " . $product_name;
    $bank_name = $account_number = $account_name = "";
    if (isset($_POST["toggle"]) && $_POST["toggle"] === "on") {
        $sql = "SELECT fname, lname, bank_name, account_number FROM users WHERE id='$uid'";
        $res = $conn->query($sql);
        $row = $res->fetch_assoc();
        $bank_name = $row["bank_name"];
        $account_number = $row["account_number"];
        $account_name = $row["fname"] . " " . $row["lname"];
    } else {
        $bank_name = mysqli_escape_string($conn, $_POST["bank_name"]);
        $account_number = mysqli_escape_string($conn, $_POST["account_number"]);
        $account_name = mysqli_escape_string($conn, $_POST["account_name"]);
    }
    // insert into transactions
    $sql = "INSERT INTO trx_history (u_id, tx_id, descrip, amount, price,product, type, status, bank_name, account_number, account_name, which) 
    VALUES ('$uid','$tx_id','$desc', '$total', '$amount', '$product_name', 1,0, '$bank_name','$account_number','$account_name','crypto')";
    $res = $conn->query($sql);
    if ($res === true) {
        $_SESSION['tx_id'] = $tx_id;
        $_SESSION["which"] = "crypto";
        $_SESSION["act"] = "sell";
        $_SESSION["amount"] = $amount;
        $_SESSION["product_id"] = $product_id;
        echo "Success: transaction was inserted " . $conn->insert_id;
    } else {
        echo "Something went wrong " . $conn->error;
    }
}

switch ($action) {
    case "buy":
        buyCrypto($conn, $amount, $total, $asset, $product_id);
        break;
    case "sell":
        sellCrypto($conn, $amount, $total, $asset, $product_id);
        break;
    default:
        echo "This action is not supported.";
}

mkdir($dir . $_SESSION["tx_id"], 0777, true);
