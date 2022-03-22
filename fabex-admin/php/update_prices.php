<?php
include_once "../../account/php/connect_db.php";
$headers = getallheaders();
if (
    !isset($headers["which"]) || empty($headers["which"]) || !isset($headers["id"])
    || !isset($headers["price"]) || empty($headers["price"]) || !isset($headers["type"])
) {
    echo ("Invalid parameters..");
}
$which = mysqli_escape_string($conn, $headers["which"]);
$id = mysqli_escape_string($conn, $headers["id"]);
$price = mysqli_escape_string($conn, $headers["price"]);
$type = mysqli_escape_string($conn, $headers["type"]);
$which = testInput($which);
$id = testInput($id);
$price = testInput($price);
$type = testInput($type);

if ($which == "crypto") {
    if ($type == "buy") {
        $sql = "UPDATE buy_cryptos SET price='$price'";
    } else {
        $sql = "UPDATE sell_cryptos SET price='$price'";
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
