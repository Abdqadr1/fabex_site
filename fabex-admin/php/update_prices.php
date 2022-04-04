<?php
include_once "../../account/php/connect_db.php";
$headers = getallheaders();
if (
    !isset($headers["which"]) || empty($headers["which"]) || !isset($headers["id"])
    || !isset($headers["price"]) || empty($headers["price"]) || !isset($headers["type"])
    || !isset($headers["range_to"])
) {
    exit("Invalid parameters..");
}
$which = mysqli_escape_string($conn, $headers["which"]);
$id = mysqli_escape_string($conn, $headers["id"]);
$price = mysqli_escape_string($conn, $headers["price"]);
$type = mysqli_escape_string($conn, $headers["type"]);
$range = mysqli_escape_string($conn, $headers["range_to"]);
$which = testInput($which);
$id = testInput($id);
$price = testInput($price);
$type = testInput($type);
$range = testInput($range);

if ($which == "crypto") {
    if ($type == "buy") {
        if ($range === "range") $sql = "UPDATE buy_cryptos SET low_price='$price'";
        else $sql = "UPDATE buy_cryptos SET price='$price'";
    } else {
        if ($range === "range") $sql = "UPDATE sell_cryptos SET low_price='$price'";
        else $sql = "UPDATE sell_cryptos SET price='$price'";
    }

    $result = $conn->query($sql);
    if ($result == true) {
        echo "$type crypto price changed successfully";
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
