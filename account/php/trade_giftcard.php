<?php
session_start();

if (empty($_SESSION["nin"])) {
    exit("Forbidden");
}

if (!isset($_SESSION["id"])) {
    exit("No valid user!");
}
if ($_SERVER["REQUEST_METHOD"] != "POST" || !isset($_POST["act"]) || !isset($_SESSION["id"])) {
    header("location: ../login");
}

include_once "connect_db.php";
include_once "user_actions.php";

$action = mysqli_escape_string($conn, $_POST["act"]);
$category = mysqli_escape_string($conn, $_POST["category"]);
$sub_category = mysqli_escape_string($conn, $_POST["sub_category"]);
$amount = mysqli_escape_string($conn, $_POST["amount"]);
$total = mysqli_escape_string($conn, $_POST["total"]);
$action = testInput($action);
$category = testInput($category);
$sub_category = testInput($sub_category);
$amount = testInput($amount);
$total = testInput($total);

$time = date("Y-m-d H:i:s a", time());


if (
    !isset($_POST["act"]) || !isset($_POST["category"]) || !isset($_POST["sub_category"]) || !isset($_POST["amount"])
    || !isset($_POST["total"]) || empty($action) || empty($category) || empty($sub_category) || empty($total) || empty($amount)
) {
    exit("Fill the required fields!");
}

$dir = "trx_proof/";



function buyGiftcard(&$conn, $amount, $price, $product_name, $time)
{
    $uid = $_SESSION["id"];
    $email = $_SESSION["email"];
    $tx_id = getId($conn);
    $desc = "Bought " . $product_name;
    // insert into transactions
    $sql = "INSERT INTO trx_history (u_id, tx_id, descrip, amount, price, product, type, status, which, email, time) 
    VALUES ('$uid','$tx_id','$desc', '$amount', '$price','$product_name', 0,0,'giftcard', '$email', '$time')";
    $res = $conn->query($sql);
    if ($res === true) {
        $_SESSION['tx_id'] = $tx_id;
        $_SESSION["which"] = "giftcard";
        $_SESSION["act"] = "buy";
        $_SESSION["amount"] = $amount;
        $_SESSION["price"] = $price;
        echo "Success: transaction was inserted " . $conn->insert_id;
    } else {
        exit("Something went wrong " . $conn->error);
    }
}
function sellGiftcard(&$conn, $amount, $price, $product_name, $time)
{
    $uid = $_SESSION["id"];
    $email = $_SESSION["email"];
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
    $sql = "INSERT INTO trx_history (u_id, tx_id, descrip, amount, price,product, type, status, bank_name, account_number, account_name,which, email, time) 
    VALUES ('$uid','$tx_id','$desc', '$amount', '$price', '$product_name', 1,0, '$bank_name','$account_number','$account_name','giftcard', '$email', '$time')";
    $res = $conn->query($sql);
    if ($res === true) {
        $_SESSION['tx_id'] = $tx_id;
        $_SESSION["which"] = "giftcard";
        $_SESSION["act"] = "sell";
        $_SESSION["amount"] = $amount;
        $_SESSION["price"] = $price;
        echo "Success: transaction was inserted " . $conn->insert_id;
    } else {
        exit("Something went wrong " . $conn->error);
    }
}

echo json_encode($_POST);

switch ($action) {
    case "buy":
        buyGiftcard($conn, $total, $amount, $category, $time);
        break;
    case "sell":
        sellGiftcard($conn, $total, $amount, $category, $time);
        break;
    default:
        echo "This action is not supported.";
}

mkdir($dir . $_SESSION["tx_id"], 0777, true);
