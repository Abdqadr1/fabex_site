<?php
session_start();


if (!isset($_POST["email"])) {
    exit("Invalid credentials!");
}

include_once "connect_db.php";
include_once "user_actions.php";

$email = $_POST["email"];
if (!empty($email)) {
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        exit("enter a valid email address!");
    }
    $email = mysqli_escape_string($conn, $_POST["email"]);
    $email = testInput($email);

    $user = new User($email, "");
    $user->resetPassword($conn);
} else {
    echo "All fields are required!";
}
$conn->close();
