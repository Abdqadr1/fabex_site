<?php
include_once "../../php/connect_db.php";
if (
    !isset($_GET["which"]) || empty($_GET["which"]) || !isset($_GET["id"]) || empty($_GET["id"])
    || !isset($_GET["status"])
) {
    exit("Invalid parameters..");
}

$which = mysqli_escape_string($conn, $_GET["which"]);
$id = mysqli_escape_string($conn, $_GET["id"]);
$status = mysqli_escape_string($conn, $_GET["status"]);
$which = testInput($which);
$id = testInput($id);
$which = testInput($which);
if ($which == "crypto") {
    $sql = "SELECT id FROM cryptos WHERE id='$id'";
    $res = $conn->query($sql);
    if ($res == true && $res->num_rows > 0) {
        $query = "UPDATE cryptos SET status='$status' WHERE id='$id'";
        $result = $conn->query($query);
        if ($result === true) {
            echo "Crypto status changed successfully";
        } else {
            exit("something went wrong ");
        }
    } else {
        exit("does not exist.");
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
            exit("something went wrong ");
        }
    } else {
        exit("does not exist.");
    }
}
