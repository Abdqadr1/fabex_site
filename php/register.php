<?php
session_start();

include_once "connect_db.php";
include_once "user_actions.php";

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
    if ($pword == $con_pword) {
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
