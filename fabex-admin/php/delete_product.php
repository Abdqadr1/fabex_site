<?php
$headers = getallheaders();
include_once "../../php/connect_db.php";
$headers = getallheaders();
if (
    !isset($headers["which"]) || empty($headers["which"]) || !isset($headers["id"]) || empty($headers["id"])
) {
    echo ("Invalid parameters..");
}
$which = mysqli_escape_string($conn, $headers["which"]);
$id = mysqli_escape_string($conn, $headers["id"]);
$which = testInput($which);
$id = testInput($id);

if ($which === "crypto") {
    $sql = "DELETE FROM cryptos WHERE id='$id';";
} else {
    $sql = "DELETE FROM giftcards WHERE id='$id';";
}

$result = $conn->query($sql);
if ($result === true) {
    echo "Product deleted successfully";
} else {
    echo "Error occur deleting product";
}
$conn->close();
