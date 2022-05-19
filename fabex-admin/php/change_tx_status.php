<?php
session_start();
if (!isset($_SESSION["admin_id"])) {
    http_response_code(400);
    exit(json_encode("Bad Request"));
}
$admin_id = $_SESSION["admin_id"];
$headers = getallheaders();
if (!isset($headers["code"]) || empty($headers["code"]) || !isset($headers["action"]) || empty($headers["action"])) {
    http_response_code(400);
    echo json_encode("Invalid parameters..");
}
include_once "../../account/php/connect_db.php";

$id = mysqli_escape_string($conn, $headers["code"]);
$action = mysqli_escape_string($conn, $headers["action"]);
$id = testInput($id);
$action = testInput($action);
$time = date("Y-m-d H:i:s a", time());

$val = 0;
if ($action === "approve") {
    $val = 2;
    $action = "approved";
}
if ($action === "reject") {
    $val = 3;
    $action = "rejected";
}
if ($action === "undo") {
    $val = 1;
    $action = "undid";
}

if ($val > 0) {
    $sql = "UPDATE trx_history SET status='$val' WHERE id='$id'";
    $result = $conn->query($sql);
    if ($result === true) {
        $adminSql = "INSERT INTO activity_feeds (admin_id,description, tx_id, time) VALUES
         ('$admin_id', '$action', '$id', '$time')";
        if ($conn->query($adminSql)) {
            echo json_encode("Transaction status updated successfully.");
        } else {
            http_response_code(500);
            exit(json_encode("Error occur while updating feeds table"));
        }
    } else {
        http_response_code(500);
        echo json_encode("Error occur updating record");
    }
} else {
    http_response_code(400);
    echo json_encode("Invalid action");
}
$conn->close();
