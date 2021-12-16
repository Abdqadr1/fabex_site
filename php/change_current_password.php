<?php
session_start();

include_once "connect_db.php";
include_once "user_actions.php";

if (
    !isset($_POST["current_password"]) || !isset($_POST["new_password"]) || !isset($_POST["con_password"]) || !isset($_SESSION["id"])
) {
    exit("Invalid credentials!");
}

$id = $_SESSION["id"];

$current_password = mysqli_escape_string($conn, $_POST["current_password"]);
$new_password = mysqli_escape_string($conn, $_POST["new_password"]);
$con_password = mysqli_escape_string($conn, $_POST["con_password"]);
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
        exit("Change password!");
    }
    //TODO: hash password
    $user = new User("", $current_password);
    $user->setId($id);
    $user->changeCurrentPassword($conn, $new_password);
} else {
    exit("All fields are required!");
}
