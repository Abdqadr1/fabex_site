<?php
include_once "../../php/connect_db.php";
if (
    !isset($_GET["which"]) || empty($_GET["which"]) || !isset($_GET["id"])
    || !isset($_GET["price"]) || empty($_GET["price"])
) {
    exit("Invalid parameters..");
}
$which = mysqli_escape_string($conn, $_GET["which"]);
$id = mysqli_escape_string($conn, $_GET["id"]);
$price = mysqli_escape_string($conn, $_GET["price"]);
$which = testInput($which);
$id = testInput($id);
$price = testInput($price);

if ($which == "crypto") {
    $sql = "UPDATE cryptos SET price='$price'";
    $result = $conn->query($sql);
    if ($result == true) {
        echo "Crypto price changed successfully";
    } else {
        exit("Something went wrong updating crypto prices, Try again.");
    }
} else {
    $sql = "UPDATE giftcards SET price='$price' WHERE id='$id'";
    $result = $conn->query($sql);
    if ($result == true) {
        echo "Giftcard price changed successfully";
    } else {
        exit("Something went wrong updating giftcard price, Try again.");
    }
}
