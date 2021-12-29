<?php
session_start();

include_once "connect_db.php";
include_once "user_actions.php";

if (
    !isset($_POST["fname"]) || !isset($_POST["lname"])
    || !isset($_POST["email"]) || !isset($_POST["password"])
    || !isset($_POST["con_password"]) || !isset($_POST["phone"])
) {
    exit("Invalid credentials!");
}

$fname = mysqli_escape_string($conn, $_POST["fname"]);
$lname = mysqli_escape_string($conn, $_POST["lname"]);
$email = mysqli_escape_string($conn, $_POST["email"]);
$pword = mysqli_escape_string($conn, $_POST["password"]);
$con_pword = mysqli_escape_string($conn, $_POST["con_password"]);
$phone = mysqli_escape_string($conn, $_POST["phone"]);
if (
    !empty($fname) && !empty($lname) && !empty($email) && !empty($pword)
    && !empty($phone) && !empty($con_pword)
) {
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        exit("enter a valid email address!");
    }
    if ($pword == $con_pword) {
        if (strlen($pword) < 8) {
            echo "Password must be at least 8 characters!";
            exit();
        }
        //TODO: hash password
        $user = new User($email, $pword);
        $user->setFname($fname);
        $user->setLname($lname);
        $user->setPhone($phone);
        $user->register($conn);
    } else {
        echo "Confirm your password!";
    }
} else {
    echo "All fields are required!";
}