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
$id = mysqli_escape_string($conn, $headers["id"]);
$status = mysqli_escape_string($conn, $headers["status"]);
$which = testInput($which);
$id = testInput($id);
$status = testInput($status);
if ($which == "crypto") {
    $sql = "SELECT id FROM cryptos WHERE id='$id'";
    $res = $conn->query($sql);
    if ($res == true && $res->num_rows > 0) {
        $query = "UPDATE cryptos SET status='$status' WHERE id='$id'";
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
