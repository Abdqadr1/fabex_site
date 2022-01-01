<?php
$headers = getallheaders();
if (!isset($headers["code"]) || empty($headers["code"]) || !isset($headers["action"]) || empty($headers["action"])) {
    echo ("Invalid parameters..");
}
include_once "../../php/connect_db.php";

$id = mysqli_escape_string($conn, $headers["code"]);
$action = mysqli_escape_string($conn, $headers["action"]);
$id = testInput($id);
$action = testInput($action);

$val = 0;
if ($action === "approve") $val = 2;
if ($action === "reject") $val = 3;
if ($action === "undo") $val = 1;

if ($val > 0) {
    $sql = "UPDATE trx_history SET status='$val' WHERE id='$id'";
    $result = $conn->query($sql);
    if ($result === true) {
        echo "Transaction status updated successfully.";
    } else {
        echo ("Error occur updating record");
    }
} else {
    echo ("Invalid action");
}
$conn->close();
