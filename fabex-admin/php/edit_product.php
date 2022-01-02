<?php
include_once "../../php/connect_db.php";
$headers = getallheaders();
if (
    !isset($headers["which"]) || empty($headers["which"]) || !isset($headers["id"]) || empty($headers["id"])
) {
    exit("Invalid parameters.." . $conn->close());
}
$which = mysqli_escape_string($conn, $headers["which"]);
$id = mysqli_escape_string($conn, $headers["id"]);
$which = testInput($which);
$id = testInput($id);

if ($which === "giftcard") {
    if (!isset($headers["name"]) || empty($headers["name"])) exit("Incomplete parameters.." . $conn->close());
    $name = mysqli_escape_string($conn, $headers["name"]);
    $name = testInput($name);
    $q = "SELECT * FROM giftcards WHERE name='$name'";
    $res = $conn->query($q);
    if ($res == false || $res->num_rows != 0) exit("Name already exists " . $conn->close());

    $sql = "UPDATE giftcards SET name='$name' WHERE id='$id'";
    $result = $conn->query($sql);
    if ($result === true) echo "Giftcard updated successfully";
    else exit("Error occur updating record " . $conn->close());
} else {
    if (
        !isset($headers["coin_name"]) || !isset($headers["short_name"]) || !isset($headers["network"])
        || !isset($headers["address"]) || !isset($headers["memo"])
    ) exit("Incomplete parameters.." . $conn->close());
    $name = mysqli_escape_string($conn, $headers["coin_name"]);
    $short_name = mysqli_escape_string($conn, $headers["short_name"]);
    $network = mysqli_escape_string($conn, $headers["network"]);
    $address = mysqli_escape_string($conn, $headers["address"]);
    $memo = mysqli_escape_string($conn, $headers["memo"]);
    $name = testInput($name);
    $short_name = testInput($short_name);
    $network = testInput($network);
    $address = testInput($address);
    $memo = testInput($memo);

    $q = "SELECT * FROM cryptos WHERE address='$address' AND id !='$id'";
    $res = $conn->query($q);
    if ($res == false || $res->num_rows != 0) exit("Wallet address already exists " . $conn->close());

    $sql = "UPDATE cryptos SET name='$name', acronym='$short_name', network='$network',address='$address',memo='$memo' WHERE id='$id'";
    $result = $conn->query($sql);
    if ($result === true) echo "Crypto updated successfully";
    else exit("Error occur updating record " . $conn->close());
}

$conn->close();
