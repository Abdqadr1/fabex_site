<?php
$arr = array();
include_once "../../account/php/connect_db.php";
if (
    !isset($_POST["coin_name"]) || !isset($_POST["short_name"]) || !isset($_POST["all_networks"])
    || !isset($_POST["address"]) || !isset($_POST["memo"])
) {
    array_push($arr, "Invalid parameters " . $conn->error);
    echo json_encode($arr);
    $conn->close();
    exit();
}
if (
    empty($_POST["coin_name"]) || empty($_POST["short_name"]) || empty($_POST["all_networks"])
    || empty($_POST["address"])
) {
    array_push($arr, "Parameters cannot be empty" . $conn->error);
    echo json_encode($arr);
    $conn->close();
    exit();
}


$name = mysqli_escape_string($conn, $_POST["coin_name"]);
$acronym = mysqli_escape_string($conn, $_POST["short_name"]);
$network = mysqli_escape_string($conn, $_POST["all_networks"]);
$address = mysqli_escape_string($conn, $_POST["address"]);
$memo = mysqli_escape_string($conn, $_POST["memo"]);
$name = ucwords(testInput($name));
$acronym = strtoupper(testInput($acronym));
$network = testInput($network);
$address = testInput($address);
$memo = testInput($memo);
$network_array = explode(",", $network);

// get crypto price
$price = 0;
$low_price = 0;
$q = "SELECT price, low_price FROM sell_cryptos LIMIT 1";
$res = $conn->query($q);
if ($res == true && $res->num_rows > 0) {
    $row = $res->fetch_assoc();
    $price = $row['price'];
    $low_price = $row['low_price'];
}
foreach ($network_array as $net) {
    $sql = "INSERT INTO sell_cryptos (name, acronym, network, address, memo, status, price, low_price) VALUES 
    ('$name','$acronym','$net', '$address', '$memo', 1, '$price', '$low_price')";
    $result = $conn->query($sql);
    if ($result === true) {
        $id = $conn->insert_id;
        $data = array($id, $name, $acronym, $net, $address, $memo, true);
        array_push($arr, $data);
    } else {
        array_push($arr, "Something went wrong " . $conn->error);
        echo json_encode($arr);
        exit($conn->close());
    }
}
array_unshift($arr, "Success: product(s) inserted!");
echo json_encode($arr);
$conn->close();
