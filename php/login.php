<?php
session_start();
include_once "connect_db.php";
include_once "user_actions.php";

$email = mysqli_escape_string($conn, $_POST["email"]);
$pword = mysqli_escape_string($conn, $_POST["password"]);
if (!empty($email) && !empty($pword)) {
    $user = new User($email, $pword);
    $user->login($conn);
} else {
    echo "All fields are required!";
}
