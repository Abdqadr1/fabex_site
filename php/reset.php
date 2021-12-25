<?php
session_start();

include_once "connect_db.php";
include_once "user_actions.php";

if (!isset($_POST["email"])) {
    exit("Invalid credentials!");
}

$email = mysqli_escape_string($conn, $_POST["email"]);
if (!empty($email)) {
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        exit("enter a valid email address!");
    }
    $user = new User($email, "");
    $user->resetPassword($conn);
} else {
    echo "All fields are required!";
}
