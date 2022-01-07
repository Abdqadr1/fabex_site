<?php
session_start();


// set_time_limit(150);

if (!isset($_POST["email"]) || !isset($_POST["password"])) {
    exit("Invalid credentials!");
}

$email = $_POST["email"];
$pword = $_POST['password'];

include_once "../account/php/connect_db.php";
include_once "../account/php/user_actions.php";


if (!empty($email) && !empty($pword)) {
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        exit("enter a valid email address!");
    }
    $email = mysqli_escape_string($conn, $_POST["email"]);
    $email = testInput($email);

    $_SESSION["timestamp"] = time();

    $user = new User($email, $_POST["password"]);
    $user->login($conn);
} else {
    exit("All fields are required!");
}
$conn->close();
