<?php
session_start();


include_once "connect_db.php";
include_once "../functions.php";
isTime($conn);

if (!isset($_SESSION['id'])) {
    http_response_code(403);
    exit("No valid user presents!");
}

if ($_SERVER["REQUEST_METHOD"] != "GET") {
    http_response_code(400);
    exit("Invalid parameters!");
}

$id = $_SESSION['id'];


// get giftcards rates

$g_sql = "SELECT name, buy_price, sell_price FROM giftcards WHERE type='sub_category' AND topten=1 
 AND (buy_price > 0 OR sell_price > 0) LIMIT 10";
$g_res = $conn->query($g_sql);
if ($g_res == true && $g_res->num_rows > 0) {
    echo json_encode($g_res->fetch_all(MYSQLI_ASSOC));
} else {
    echo json_encode([]);
}
$conn->close();
