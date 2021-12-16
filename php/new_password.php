<?php
session_start();

include_once "connect_db.php";
include_once "user_actions.php";

if (
    !isset($_POST["password"]) || !isset($_POST["con_password"]) || !isset($_SESSION["id"])
) {
    exit("Invalid credentials!");
}

$id = $_SESSION["id"];

$password = mysqli_escape_string($conn, $_POST["password"]);
$con_password = mysqli_escape_string($conn, $_POST["con_password"]);
if (
    !empty($password) && !empty($con_password)
) {
    if ($password !== $con_password) {
        exit("Confirm your password!");
    }
    if (strlen($password) < 8) {
        exit("Password must be at least 8 characters!");
    }
    //TODO: hash password
    $user = new User("", $password);
    $user->setId($id);
    $user->changePassword($conn);
} else {
    exit("All fields are required!");
}
