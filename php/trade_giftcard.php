<?php
session_start();
include_once "connect_db.php";
include_once "user_actions.php";

if ($_SERVER["REQUEST_METHOD"] != "POST" || !isset($_POST["act"])) {
    header("location: ../login");
}
if (!isset($_SESSION["id"])) {
    header("location: ../login");
}

$action = mysqli_escape_string($conn, $_POST["act"]);
$category = mysqli_escape_string($conn, $_POST["category"]);
$sub_category = mysqli_escape_string($conn, $_POST["sub_category"]);
$amount = mysqli_escape_string($conn, $_POST["amount"]);


if (empty($action) || empty($category) || empty($sub_category) || empty($amount)) {
    exit("Fill the required fields!");
}

function buyGiftcard(&$conn)
{
}
function sellGiftcard(&$conn)
{
    $toggle = mysqli_escape_string($conn, $_POST["toggle"]);
    $bank_name = mysqli_escape_string($conn, $_POST["bank_name"]);
    $account_number = mysqli_escape_string($conn, $_POST["account_number"]);
    $account_name = mysqli_escape_string($conn, $_POST["account_name"]);
}


switch ($action) {
    case "buy":
        // buyGiftcard($conn);
        break;
    case "sell":
        // sellGiftcard($conn);
        break;
}
