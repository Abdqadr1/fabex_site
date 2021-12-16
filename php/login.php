<?php
session_start();

include_once "connect_db.php";
include_once "user_actions.php";

if (!isset($_POST["email"]) || !isset($_POST["password"])) {
    exit("Invalid credentials!");
}

$email = mysqli_escape_string($conn, $_POST["email"]);
$pword = mysqli_escape_string($conn, $_POST["password"]);
if (!empty($email) && !empty($pword)) {
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        exit("enter a valid email address!");
    }
    //TODO: hash password
    $user = new User($email, $pword);
    $user->login($conn);
} else {
    exit("All fields are required!");
}
