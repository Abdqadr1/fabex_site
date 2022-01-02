<?php
session_start();
if (!isset($_SESSION['id']) || empty($_SESSION['id'])) {
    exit("Invalid parameters");
}

$id = $_SESSION['id'];


// set_time_limit(150);

if (
    !isset($_POST["bank_name"]) || !isset($_POST["account_number"]) || !isset($_POST["bvn"])
    || empty($_POST["bank_name"]) || empty($_POST["account_number"]) || empty($_POST["bvn"])
) {
    exit("Invalid credentials!");
}


include_once "connect_db.php";
include_once "user_actions.php";

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

$conn->close();
