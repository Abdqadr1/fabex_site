<?php
session_start();
include_once "connect_db.php";
include_once "user_actions.php";

if (!isset($_SESSION["id"])) {
    exit("No valid user!");
}
if ($_SERVER["REQUEST_METHOD"] != "POST" || !isset($_POST["act"]) || !isset($_SESSION["id"])) {
    header("location: ../login");
}


$action = mysqli_escape_string($conn, $_POST["act"]);
$category = mysqli_escape_string($conn, $_POST["category"]);
$sub_category = mysqli_escape_string($conn, $_POST["sub_category"]);
$amount = mysqli_escape_string($conn, $_POST["amount"]);
$price = mysqli_escape_string($conn, $_POST["price"]);


if (empty($action) || empty($category) || empty($sub_category) || empty($amount) || empty($price)) {
    exit("Fill the required fields!");
}

$dir = "trx_proof/";

function getId(&$conn)
{
    $tx_id = md5(time(), false);
    $sql = "SELECT COUNT(*) FROM tx_history WHERE tx_id='$tx_id'";
    while (($res = $conn->query($sql)) > 0) {
        $uniq = uniqid("trx", true);
        $tx_id = md5(time() . $uniq, false);
    }
    return $tx_id;
}

function buyGiftcard(&$conn, $amount, $price, $product_id, $product_name)
{
    $uid = $_SESSION["id"];
    $tx_id = getId($conn);
    $desc = "Bought " . $product_name;
    // insert into transactions
    $sql = "INSERT INTO trx_history (u_id, tx_id, descrip, amount, price, product, typ, status, which) 
    VALUES ('$uid','$tx_id','$desc', '$amount', '$price','$product_id', 0,0,'giftcard')";
    $res = $conn->query($sql);
    if ($res === true) {
        $_SESSION['tx_id'] = $tx_id;
        $_SESSION["which"] = "giftcard";
        $_SESSION["act"] = "buy";
        $_SESSION["amount"] = $amount;
        $_SESSION["price"] = $price;
        echo "Success: transaction was inserted " . $conn->insert_id;
    } else {
        echo "Something went wrong " . $conn->error;
    }
}
function sellGiftcard(&$conn, $amount, $price, $product_id, $product_name)
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
    $sql = "INSERT INTO trx_history (u_id, tx_id, descrip, amount, price,product, typ, status, bank_name, account_number, account_name,which) 
    VALUES ('$uid','$tx_id','$desc', '$amount', '$price', '$product_id', 1,0, '$bank_name','$account_number','$account_name','giftcard')";
    $res = $conn->query($sql);
    if ($res === true) {
        $_SESSION['tx_id'] = $tx_id;
        $_SESSION["which"] = "giftcard";
        $_SESSION["act"] = "sell";
        $_SESSION["amount"] = $amount;
        $_SESSION["price"] = $price;
        echo "Success: transaction was inserted " . $conn->insert_id;
    } else {
        echo "Something went wrong " . $conn->error;
    }
}


//TODO: do something about the products id and name
switch ($action) {
    case "buy":
        buyGiftcard($conn, $amount, $price, $sub_category, $category);
        break;
    case "sell":
        sellGiftcard($conn, $amount, $price, $sub_category, $category);
        break;
    default:
        echo "This action is not supported.";
}

mkdir($dir . $_SESSION["tx_id"], 0777, true);
