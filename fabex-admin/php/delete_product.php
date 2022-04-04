<?php
include_once "../../account/php/connect_db.php";
$headers = getallheaders();
if (
    !isset($headers["which"]) || empty($headers["which"]) || !isset($headers["id"]) || empty($headers["id"])
    || !isset($headers["type"]) || empty($headers["type"]) || $headers["type"] === "null"
) {
    echo ("Invalid parameters..");
}

$which = mysqli_escape_string($conn, $headers["which"]);
$id = mysqli_escape_string($conn, $headers["id"]);
$which = testInput($which);
$id = testInput($id);
$type = mysqli_escape_string($conn, $headers["type"]);
$type = testInput($type);

$sql = "";

if ($which === "crypto") {
    if ($type === "buy") {
        $sql = "DELETE FROM buy_cryptos WHERE id='$id' LIMIT 1";
    } else if ($sql === "sell") {
        $sql = "DELETE FROM sell_cryptos WHERE id='$id' LIMIT 1";
    }
} else {
    if ($type === "category") {
        $sql = "DELETE FROM giftcards WHERE id='$id' OR parent='$id'";
    } else if ($type === "sub_category") {
        $sql = "DELETE FROM giftcards WHERE id='$id' LIMIT 1";
    }
}

$result = $conn->query($sql);
if ($result === true) {
    echo "Product deleted successfully";
} else {
    echo "Error occur deleting product";
}
$conn->close();
