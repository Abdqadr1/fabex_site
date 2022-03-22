<?php
include_once "../../account/php/connect_db.php";
$headers = getallheaders();
if (
    !isset($headers["which"]) || empty($headers["which"]) || !isset($headers["id"]) || empty($headers["id"])
    || !isset($headers["status"])
) {
    echo ("Invalid parameters..");
}

$which = mysqli_escape_string($conn, $headers["which"]);
$type = mysqli_escape_string($conn, $headers["type"]);
$id = mysqli_escape_string($conn, $headers["id"]);
$status = mysqli_escape_string($conn, $headers["status"]);
$which = testInput($which);
$type = testInput($type);
$id = testInput($id);
$status = testInput($status);
if ($which == "crypto") {
    if ($type === "buy") {
        $sql = "SELECT id FROM buy_cryptos WHERE id='$id'";
        $query = "UPDATE buy_cryptos SET status='$status' WHERE id='$id'";
    } else {
        $sql = "SELECT id FROM sell_cryptos WHERE id='$id'";
        $query = "UPDATE sell_cryptos SET status='$status' WHERE id='$id'";
    }
    $res = $conn->query($sql);
    if ($res == true && $res->num_rows > 0) {
        $result = $conn->query($query);
        if ($result === true) {
            echo "Crypto status changed successfully";
        } else {
            echo ("something went wrong ");
        }
    } else {
        echo ("does not exist.");
    }
} else {
    $sql = "SELECT id FROM giftcards WHERE id='$id'";
    $res = $conn->query($sql);
    if ($res == true && $res->num_rows > 0) {
        $query = "UPDATE giftcards SET status='$status' WHERE id='$id'";
        $result = $conn->query($query);
        if ($result === true) {
            echo "Giftcard status changed successfully";
        } else {
            echo ("something went wrong ");
        }
    } else {
        echo ("does not exist.");
    }
}
$conn->close();
