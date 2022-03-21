<?php
if (!isset($_POST["coin_name"]) || !isset($_POST["short_name"]) || !isset($_POST["all_networks"])) {
    echo ("Invalid parameters");
}
if (empty($_POST["coin_name"]) || empty($_POST["short_name"]) || empty($_POST["all_networks"])) {
    echo ("Parameters cannot be empty");
}

include_once "../../account/php/connect_db.php";

$name = mysqli_escape_string($conn, $_POST["coin_name"]);
$acronym = mysqli_escape_string($conn, $_POST["short_name"]);
$network = mysqli_escape_string($conn, $_POST["all_networks"]);
$name = ucwords(testInput($name));
$acronym = strtoupper(testInput($acronym));
$network = testInput($network);
$network_array = explode(",", $network);
$arr = array();

// get crypto price
$price = 0;
$q = "SELECT price FROM cryptos LIMIT 1";
$res = $conn->query($q);
if ($res == true && $res->num_rows > 0) {
    $row = $res->fetch_assoc();
    $price = $row['price'];
}
foreach ($network_array as $net) {
    $sql = "INSERT INTO buy_cryptos (name, acronym, network, status, price) VALUES 
    ('$name','$acronym','$net', 1, '0')";
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
