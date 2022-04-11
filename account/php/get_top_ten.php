<?php
session_start();


include_once "connect_db.php";
include_once "../functions.php";
isTime($conn);

if (!isset($_SESSION['id'])) {
    exit("No valid user presents!");
}

if ($_SERVER["REQUEST_METHOD"] != "GET") {
    exit("Invalid parameters!");
}

$id = $_SESSION['id'];


$rates = array();

// get giftcards rates

$g_sql = "SELECT name, price FROM giftcards WHERE type='sub_category' AND topten=1 AND price>0 LIMIT 10";
$g_res = $conn->query($g_sql);
$arr = array();
if ($g_res == true && $g_res->num_rows > 0) {
    while ($r = $g_res->fetch_assoc()) {
        array_push($arr, array($r['name'], $r["price"]));
    };
} else {
    array_push($arr, array("No giftcard yet.. Contact Admin"));
    $conn->close();
}
echo json_encode($arr);
$conn->close();
