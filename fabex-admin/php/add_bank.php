<?php
include_once "../../account/php/connect_db.php";

if (!isset($_POST["bank_name"]) || !isset($_POST["account_number"]) || !isset($_POST["account_name"])) {
    echo ("Incomplete parameters!");
}

if (empty($_POST["bank_name"]) || empty($_POST["account_number"]) || empty($_POST["account_name"])) {
    echo ("Invalid parameters!");
}

$bank_name = mysqli_escape_string($conn, $_POST["bank_name"]);
$account_number = mysqli_escape_string($conn, $_POST["account_number"]);
$account_name = mysqli_escape_string($conn, $_POST["account_name"]);
$bank_name = testInput($bank_name);
$account_number = testInput($account_number);
$account_name = ucwords(testInput($account_name));

$query = "INSERT INTO admin_banks (bank_name, account_number, account_name) VALUES 
    ('$bank_name','$account_number','$account_name')";
$result = $conn->query($query);
if ($result === true) {
    $id = $conn->insert_id;
    echo json_encode(array("Success: Bank Inserted..", array($id, $bank_name, $account_name, $account_number)));
} else {
    echo ("Something went wrong " . $conn->error);
}
$conn->close();
