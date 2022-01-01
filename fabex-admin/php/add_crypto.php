<?php
include_once "../../php/connect_db.php";
if (!isset($_POST["coin_name"]) || !isset($_POST["short_name"]) || !isset($_POST["network"]) || !isset($_POST["address"]) || !isset($_POST["memo"])) {
    echo ("Invalid parameters");
}
if (empty($_POST["coin_name"]) || empty($_POST["short_name"]) || empty($_POST["network"]) || empty($_POST["address"]) || empty($_POST["memo"])) {
    echo ("Parameters cannot be empty");
}
$name = mysqli_escape_string($conn, $_POST["coin_name"]);
$acronym = mysqli_escape_string($conn, $_POST["short_name"]);
$network = mysqli_escape_string($conn, $_POST["network"]);
$memo = mysqli_escape_string($conn, $_POST["memo"]);
$address = mysqli_escape_string($conn, $_POST["address"]);
$name = ucwords(testInput($name));
$acronym = strtoupper(testInput($acronym));
$network = testInput($network);
$memo = testInput($memo);
$address = testInput($address);
$arr = array();

$q = "SELECT * FROM cryptos WHERE address='$address'";
$res = $conn->query($q);
if ($res == true && $res->num_rows > 0) {
    array_push($arr, "Wallet address already exists");
    echo (json_encode($arr));
}

$sql = "INSERT INTO cryptos (name, acronym, network, address, memo, status) VALUES 
('$name','$acronym','$network', '$address', '$memo', 1)";
$result = $conn->query($sql);
if ($result === true) {
    $id = $conn->insert_id;
    array_push($arr, "Success: product inserted!");
    $data = array($id, $name, $acronym, $address, true);
    array_push($arr, $data);
    echo json_encode($arr);
} else {
    array_push($arr, "Something went wrong " . $conn->error);
    echo json_encode($arr);
}
$conn->close();
