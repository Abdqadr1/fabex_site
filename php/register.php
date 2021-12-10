<?php
include_once "connect_db.php";
include_once "user_actions.php";

$fname = mysqli_escape_string($conn, $_POST["fname"]);
$lname = mysqli_escape_string($conn, $_POST["lname"]);
$email = mysqli_escape_string($conn, $_POST["email"]);
$pword = mysqli_escape_string($conn, $_POST["pword"]);
$address = mysqli_escape_string($conn, $_POST["address"]);
$city = mysqli_escape_string($conn, $_POST["city"]);
$zipcode = mysqli_escape_string($conn, $_POST["zipcode"]);

if (!empty($fname) && !empty($lname) && !empty($email) && !empty($pword) && !empty($address) && !empty($city) && !empty($zipcode)) {
    $user = new User($fname, $lname, $email, $pword, $address, $city, $zipcode);
    $user->setFname($fname);
    $user->setLname($lname);
    $user->setAddress($address);
    $user->setCity($city);
    $user->setZip($zipcode);
    $user->register($conn);
} else {
    echo "All fields are required!";
}
