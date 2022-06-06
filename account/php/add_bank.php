<?php
session_start();
if (!isset($_SESSION['id']) || empty($_SESSION['id']) || !isset($_SESSION['verified'])) {
    http_response_code(403);
    exit(json_encode("Forbidden"));
}

$id = $_SESSION['id'];


if (
    !isset($_POST["bank_name"]) || !isset($_POST["account_number"]) || !isset($_POST["nin"])
    || empty($_POST["bank_name"]) || empty($_POST["account_number"]) || empty($_POST["nin"])
) {
    http_response_code(400);
    exit(json_encode("All fields are required!"));
}

if (
    strlen($_POST["account_number"])  != 10 || !is_numeric($_POST["account_number"])
    || !is_numeric($_POST["nin"]) || strlen($_POST["nin"]) != 11
) {
    http_response_code(400);
    exit(json_encode("Account Number or NIN is not valid"));
}

include_once "connect_db.php";
include_once "user_actions.php";

$bankName = mysqli_escape_string($conn, $_POST["bank_name"]);
$accountNumber = mysqli_escape_string($conn, $_POST['account_number']);
$nin = mysqli_escape_string($conn, $_POST['nin']);
$bankName = testInput($bankName);
$accountNumber = testInput($accountNumber);
$nin = testInput($nin);

$user = new User("", "");
$user->setId($id);
$user->setBankName($bankName);
$user->setAccountNumber($accountNumber);
$user->setNin($nin);

$user->addBank($conn);
$conn->close();
