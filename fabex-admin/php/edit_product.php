<?php
include_once "../../account/php/connect_db.php";
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
    if (!isset($headers["type"]) || !isset($headers["coin_name"]) || !isset($headers["short_name"]) || !isset($headers["network"])) {
        exit("Incomplete params");
    } else {
        $type = mysqli_escape_string($conn, $headers["type"]);
        $name = mysqli_escape_string($conn, $headers["coin_name"]);
        $short_name = mysqli_escape_string($conn, $headers["short_name"]);
        $network = mysqli_escape_string($conn, $headers["network"]);
        $name = testInput($name);
        $short_name = testInput($short_name);
        $network = testInput($network);
        $type = testInput($type);
        if ($type == "buy") {

            $q = "SELECT * FROM buy_cryptos WHERE network='$network' AND name ='$name'  AND id !='$id'";
            $res = $conn->query($q);
            if ($res == false || $res->num_rows != 0) exit("Crypto with name and network already exists " . $conn->close());

            $sql = "UPDATE buy_cryptos SET name='$name', acronym='$short_name', network='$network' WHERE id='$id'";
            $result = $conn->query($sql);
            if ($result === true) echo "Crypto updated successfully";
            else exit("Error occur updating record " . $conn->close());
        } else {
            if (
                !isset($headers["address"]) || !isset($headers["memo"])
            ) {
                exit("Incomplete parameters.." . $conn->close());
            }
            $address = mysqli_escape_string($conn, $headers["address"]);
            $memo = mysqli_escape_string($conn, $headers["memo"]);
            $address = testInput($address);
            $memo = testInput($memo);

            $q = "SELECT * FROM sell_cryptos WHERE address='$address' AND network='$network' AND id !='$id'";
            $res = $conn->query($q);
            if (
                $res == false || $res->num_rows != 0
            ) exit("Crypto with address and network already exists " . $conn->close());

            $sql = "UPDATE sell_cryptos SET name='$name', acronym='$short_name', network='$network',address='$address',memo='$memo' WHERE id='$id'";
            $result = $conn->query($sql);
            if ($result === true) echo "Crypto updated successfully";
            else exit("Error occur updating record " . $conn->error . $conn->close());
        }
    }
}

$conn->close();
