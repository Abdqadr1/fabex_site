<?php
session_start();


if (!isset($_POST["email"])) {
    exit("Invalid credentials!");
}


$email = $_POST["email"];
if (!empty($email)) {
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        exit("enter a valid email address!");
    }
    include_once "../account/php/connect_db.php";
    include_once "../account/php/user_actions.php";
    include_once "../php/send_email.php";

    $email = mysqli_escape_string($conn, $_POST["email"]);
    $email = testInput($email);

    $user = new User($email, "");
    $user->resetPassword($conn);
} else {
    echo "All fields are required!";
}
$conn->close();
