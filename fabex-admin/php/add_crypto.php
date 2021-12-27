<?php
include_once "../../php/connect_db.php";
if (!isset($_POST["coin_name"]) || !isset($_POST["short_name"]) || !isset($_POST["network"]) || !isset($_POST["address"]) || !isset($_POST["memo"])) {
    exit("Invalid parameters");
}
if (empty($_POST["coin_name"]) || empty($_POST["short_name"]) || empty($_POST["network"]) || empty($_POST["address"]) || empty($_POST["memo"])) {
    exit("Parameters cannot be empty");
}
$name = mysqli_escape_string($conn, $_POST["coin_name"]);
$acronym = mysqli_escape_string($conn, $_POST["short_name"]);
$network = mysqli_escape_string($conn, $_POST["network"]);
$memo = mysqli_escape_string($conn, $_POST["memo"]);
$address = mysqli_escape_string($conn, $_POST["address"]);
$name = ucwords(testInput($name));
$acronym = testInput($acronym);
$network = testInput($network);
$memo = testInput($memo);
$address = testInput($address);
$arr = array();
$sql = "INSERT INTO cryptos (name, acronym, network, address, memo) VALUES 
('$name','$acronym','$network', '$address', '$memo')";
$result = $conn->query($sql);
if ($result === true) {
    array_push($arr, "Success: product inserted!");
    $data = array($name, $acronym, $network, $address, $memo, true);
    array_push($arr, $data);
    echo json_encode($arr);
} else {
    array_push($arr, "Something went wrong " . $conn->error);
}
