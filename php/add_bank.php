<?php
session_start();

include_once "connect_db.php";
include_once "user_actions.php";

if (
    !isset($_POST["bank_name"]) || !isset($_POST["account_number"])
    || !isset($_POST["account_name"]) || !isset($_POST["bvn"]) || !$_SESSION["id"]
) {
    exit("Invalid credentials!");
}

$id = $_SESSION["id"];

$bank_name = mysqli_escape_string($conn, $_POST["bank_name"]);
$account_number = mysqli_escape_string($conn, $_POST["account_number"]);
$account_name = mysqli_escape_string($conn, $_POST["account_name"]);
$bvn = mysqli_escape_string($conn, $_POST["bvn"]);
if (
    !empty($bank_name) && !empty($account_number) && !empty($bvn) && !empty($account_name)
) {
    $user = new User("", "");
    $user->setId($id);
    $user->setBankName($bank_name);
    $user->setAccountNumber($account_number);
    $user->setBvn($bvn);
    $user->setAccountName($account_name);
    $user->addBank($conn);
} else {
    echo "All fields are required!";
}
