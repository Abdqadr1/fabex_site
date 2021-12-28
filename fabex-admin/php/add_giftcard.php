<?php
include_once "../../php/connect_db.php";
if (!isset($_POST["giftcard_name"]) || empty($_POST["giftcard_name"])) {
    exit("Invalid parameters");
}
if (!isset($_POST["which"]) || empty($_POST["which"])) {
    exit("Invalid parameters");
}

$giftcard_name = mysqli_escape_string($conn, $_POST["giftcard_name"]);
$which = mysqli_escape_string($conn, $_POST["which"]);
$giftcard_name = testInput($giftcard_name);
$which = testInput($which);
$arr = array();
if ($which === "category") {
    $query = "INSERT INTO giftcards (name, type, status)  VALUES ('$giftcard_name','$which',1)";
    $result = $conn->query($query);
    if ($result === true) {
        array_push($arr, "Success: product inserted!");
        $data = array($giftcard_name, $which, 1, "", array());
        array_push($arr, $data);
        echo json_encode($arr);
    } else {
        array_push($arr, "Something went wrong " . $conn->error);
        echo json_encode($arr);
    }
} else {
    if (!isset($_POST["parent"]) || empty($_POST["parent"])) {
        exit("No parent");
    }
    $parent = mysqli_escape_string($conn, $_POST["parent"]);
    $parent = testInput($parent);
    $query = "INSERT INTO giftcards (name, type, parent, price, status)  VALUES ('$giftcard_name','$which', '$parent', 1)";
    $result = $conn->query($query);
    if ($result === true) {
        array_push($arr, "Success: product inserted!");
        $data = array($giftcard_name, $which, 1, $parent, "");
        array_push($arr, $data);
        echo json_encode($arr);
    } else {
        array_push($arr, "Something went wrong " . $conn->error);
        echo json_encode($arr);
    }
}
