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

// TODO: get rates from database

$query = "SELECT fname, lname FROM users WHERE id='$id'";
$result = $conn->query($query);
if ($result->num_rows > 0) {
    $sql = "SELECT * FROM products";
    $res = $conn->query($sql);
    if ($res->num_rows > 0) {
        $rows = $res->fetch_assoc();
        echo json_encode($rows);
    } else {
        echo "Failed: No products yet!";
    }
} else {
    exit("No valid user presents!");
}
