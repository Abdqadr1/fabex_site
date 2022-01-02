<?php
session_start();

include_once "connect_db.php";
include_once "user_actions.php";

if (!isset($_SESSION['timestamp']) || (time() - $_SESSION['timestamp']) > 1800) {
    exit("Session timeout: Login again");
}

if (
    !isset($_POST["fname"]) || !isset($_POST["lname"]) ||
    !isset($_POST["phone"]) ||
    !isset($_POST["bank_name"]) || !isset($_POST["account_number"])
    || !isset($_POST["bvn"]) || !$_SESSION["id"]
) {
    exit("Invalid credentials!");
}

$id = $_SESSION["id"];

$fname = mysqli_escape_string($conn, $_POST["fname"]);
$lname = mysqli_escape_string($conn, $_POST["lname"]);
$phone = mysqli_escape_string($conn, $_POST["phone"]);
$bank_name = mysqli_escape_string($conn, $_POST["bank_name"]);
$account_number = mysqli_escape_string($conn, $_POST["account_number"]);
$bvn = mysqli_escape_string($conn, $_POST["bvn"]);
if (
    !empty($bank_name) && !empty($account_number) && !empty($bvn)
    && !empty($fname) && !empty($lname) && !empty($phone)
) {
    $user = new User("", "");
    $user->setId($id);
    $user->setPhone($phone);
    $user->setFname($fname);
    $user->setLname($lname);
    $user->setBankName($bank_name);
    $user->setAccountNumber($account_number);
    $user->setBvn($bvn);
    $user->changeInfo($conn);
} else {
    exit("All fields are required!");
}
