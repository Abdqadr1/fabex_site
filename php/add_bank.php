<?php
session_start();
if (!isset($_SESSION['id']) || empty($_SESSION['id']) || !isset($_SESSION['verified'])) {
    http_response_code(403);
    exit(json_encode("Forbidden"));
}

$id = $_SESSION['id'];


if (
    !isset($_POST["bank_name"]) || !isset($_POST["account_number"]) || !isset($_POST["bvn"])
    || empty($_POST["bank_name"]) || empty($_POST["account_number"]) || empty($_POST["bvn"])
) {
    http_response_code(400);
    exit(json_encode("All fields are required!"));
}

if (
    strlen($_POST["account_number"])  != 10 || !is_numeric($_POST["account_number"])
    || !is_numeric($_POST["bvn"]) || strlen($_POST["bvn"]) != 11
) {
    http_response_code(400);
    exit(json_encode("Account Number or BVN is not valid"));
}

include_once "../account/php/connect_db.php";
include_once "../account/php/user_actions.php";

$bankName = mysqli_escape_string($conn, $_POST["bank_name"]);
$accountNumber = mysqli_escape_string($conn, $_POST['account_number']);
$bvn = mysqli_escape_string($conn, $_POST['bvn']);
$bankName = testInput($bankName);
$accountNumber = testInput($accountNumber);
$bvn = testInput($bvn);

$user = new User("", "");
$user->setId($id);
$user->setBankName($bankName);
$user->setAccountNumber($accountNumber);
$user->setBvn($bvn);

$user->addBank($conn);

unset($_SESSION['id']);
unset($_SESSION['verified']);
$conn->close();
