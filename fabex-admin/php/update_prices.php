<?php
include_once "../../php/connect_db.php";
$headers = getallheaders();
if (
    !isset($headers["which"]) || empty($headers["which"]) || !isset($headers["id"])
    || !isset($headers["price"]) || empty($headers["price"])
) {
    echo ("Invalid parameters..");
}
$which = mysqli_escape_string($conn, $headers["which"]);
$id = mysqli_escape_string($conn, $headers["id"]);
$price = mysqli_escape_string($conn, $headers["price"]);
$which = testInput($which);
$id = testInput($id);
$price = testInput($price);

if ($which == "crypto") {
    $sql = "UPDATE cryptos SET price='$price'";
    $result = $conn->query($sql);
    if ($result == true) {
        echo "Crypto price changed successfully";
    } else {
        echo ("Something went wrong updating crypto prices, Try again.");
    }
} else {
    $sql = "UPDATE giftcards SET price='$price' WHERE id='$id'";
    $result = $conn->query($sql);
    if ($result == true) {
        echo "Giftcard price changed successfully";
    } else {
        echo ("Something went wrong updating giftcard price, Try again.");
    }
}
$conn->close();
