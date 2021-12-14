<?php
session_start();

include_once "connect_db.php";
include_once "user_actions.php";

if (
    !isset($_POST["password"]) || !isset($_POST["con_password"])
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
        echo "Confirm your password!";
        exit();
    }
    if (strlen($password) < 8) {
        echo "Password must be at least 8 characters!";
        exit();
    }
    $user = new User("", $password);
    $user->setId($id);
    $user->changePassword($conn);
} else {
    echo "All fields are required!";
}
