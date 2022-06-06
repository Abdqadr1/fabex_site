<?php
session_start();
if (empty($_SESSION["nin"])) {
    exit("Forbidden: Verify your identity first!");
}

include_once "connect_db.php";
include_once "../functions.php";
isTime($conn);

if (
    !isset($_POST["fname"]) || !isset($_POST["lname"]) || !isset($_POST["phone"]) ||
    !isset($_POST["bank_name"]) || !isset($_POST["account_number"]) || !$_SESSION["id"]
) {
    exit("Invalid credentials!");
}

if (
    empty($_POST["fname"]) || empty($_POST["lname"]) || empty($_POST["phone"]) ||
    empty($_POST["bank_name"]) || empty($_POST["account_number"])
) {
    exit("All fields are required!");
}

if (
    !is_numeric($_POST["phone"]) || !is_numeric($_POST["account_number"])
    || strlen($_POST["phone"]) != 11 || strlen($_POST["account_number"]) != 10
) {
    exit("Invalid phone number or account number!");
}

include_once "user_actions.php";
$id = $_SESSION["id"];

$fname = mysqli_escape_string($conn, $_POST["fname"]);
$lname = mysqli_escape_string($conn, $_POST["lname"]);
$phone = mysqli_escape_string($conn, $_POST["phone"]);
$bank_name = mysqli_escape_string($conn, $_POST["bank_name"]);
$account_number = mysqli_escape_string($conn, $_POST["account_number"]);
$fname = testInput($fname);
$lname = testInput($lname);
$phone = testInput($phone);
$bank_name = testInput($bank_name);
$account_number = testInput($account_number);
if (
    !empty($bank_name) && !empty($account_number) && !empty($fname) && !empty($lname) && !empty($phone)
) {
    $user = new User("", "");
    $user->setId($id);
    $user->setPhone($phone);
    $user->setFname($fname);
    $user->setLname($lname);
    $user->setBankName($bank_name);
    $user->setAccountNumber($account_number);
    $user->changeInfo($conn);
} else {
    $conn->close();
    exit("All fields are required!");
}
$conn->close();
