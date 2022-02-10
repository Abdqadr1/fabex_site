<?php
session_start();

if (!isset($_SESSION['timestamp']) || (time() - $_SESSION['timestamp']) > 1800) {
    exit("Session timeout: Login again");
}


if (
    !isset($_POST["current_password"]) || !isset($_POST["new_password"]) || !isset($_POST["con_password"]) || !isset($_SESSION["id"])
) {
    exit("Invalid credentials!");
}

include_once "connect_db.php";
include_once "user_actions.php";
$id = $_SESSION["id"];

$current_password = mysqli_escape_string($conn, $_POST["current_password"]);
$new_password = mysqli_escape_string($conn, $_POST["new_password"]);
$con_password = mysqli_escape_string($conn, $_POST["con_password"]);
$new_password = testInput($new_password);
$con_password = testInput($con_password);
if (
    !empty($current_password) && !empty($con_password) && !empty($new_password)
) {
    if ($new_password !== $con_password) {
        exit("Confirm your password!");
    }
    if (strlen($new_password) < 8) {
        exit("Password must be at least 8 characters!");
    }
    if ($new_password == $current_password) {
        exit("Old and new password must be different!");
    }
    $user = new User("", $current_password);
    $user->setId($id);
    $user->changeCurrentPassword($conn, password_hash($new_password, PASSWORD_DEFAULT));
} else {
    exit("All fields are required!");
}
