<?php
include_once "../../php/connect_db.php";
if (!isset($_POST["bank_name"]) || !isset($_POST["account_number"]) || !isset($_POST["account_name"])) {
    exit("Incomplete parameters!");
}

if (empty($_POST["bank_name"]) || empty($_POST["account_number"]) || empty($_POST["account_name"])) {
    exit("Invalid parameters!");
}

$bank_name = mysqli_escape_string($conn, $_POST["bank_name"]);
$account_number = mysqli_escape_string($conn, $_POST["account_number"]);
$account_name = mysqli_escape_string($conn, $_POST["account_name"]);
$bank_name = testInput($bank_name);
$account_number = testInput($account_number);
$account_name = ucwords(testInput($account_name));

$query = "INSERT INTO admin_banks (bank_name, account_number, account_name) VALUES ('$bank_name','$account_number','$account_name')";
$result = $conn->query($query);
if ($result === true) {
    echo "Success: Bank Inserted..";
} else {
    exit("Something went wrong " . $conn->error);
}
