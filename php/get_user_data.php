<?php
session_start();
include_once "connect_db.php";


if (!isset($_SESSION['id'])) {
    exit("No valid user presents!");
}

if ($_SERVER["REQUEST_METHOD"] != "GET") {
    exit("Invalid parameters!");
}

$id = $_SESSION['id'];

$query = "SELECT fname, lname ,phone, email, bank_name, account_number, bvn FROM users WHERE id='$id'";
$result = $conn->query($query);
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $json = json_encode($row);
    echo $json;
} else {
    exit("No valid user presents!");
}
