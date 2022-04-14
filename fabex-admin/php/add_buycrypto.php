<?php
$arr = array();
include_once "../../account/php/connect_db.php";

if (!isset($_POST["coin_name"]) || !isset($_POST["short_name"]) || !isset($_POST["all_networks"]) || !isset($_POST["memo"])) {
    echo ("Invalid parameters");
    array_unshift($arr, "Invalid parameters");
    echo json_encode($arr);
    $conn->close();
    exit();
}
if (empty($_POST["coin_name"]) || empty($_POST["short_name"]) || empty($_POST["all_networks"])) {
    echo ("Parameters cannot be empty");
    array_unshift($arr, "Parameters cannot be empty");
    echo json_encode($arr);
    $conn->close();
    exit();
}


$name = mysqli_escape_string($conn, $_POST["coin_name"]);
$acronym = mysqli_escape_string($conn, $_POST["short_name"]);
$network = mysqli_escape_string($conn, $_POST["all_networks"]);
$memo = mysqli_escape_string($conn, $_POST["memo"]);
$name = ucwords(testInput($name));
$acronym = strtoupper(testInput($acronym));
$network = testInput($network);
$memo = testInput($memo);
$network_array = explode(",", $network);

// get crypto price
$price = 0;
$low_price = 0;
$q = "SELECT price, low_price FROM buy_cryptos LIMIT 1";
$res = $conn->query($q);
if ($res == true && $res->num_rows > 0) {
    $row = $res->fetch_assoc();
    $price = $row['price'];
    $low_price = $row['low_price'];
}
foreach ($network_array as $net) {
    $sql = "INSERT INTO buy_cryptos (name, acronym, memo, network, status, price, low_price) VALUES 
    ('$name','$acronym', '$memo','$net', 1, '$price', '$low_price')";
    $result = $conn->query($sql);
    if ($result === true) {
        $id = $conn->insert_id;
        $data = array($id, $name, $acronym, $net, true);
        array_push($arr, $data);
    } else {
        array_push($arr, "Something went wrong " . $conn->error);
    }
}
array_unshift($arr, "Success: product(s) inserted!");
echo json_encode($arr);
$conn->close();
