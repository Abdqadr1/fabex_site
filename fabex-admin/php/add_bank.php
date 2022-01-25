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

$sql = "SELECT * FROM admin_banks WHERE id=1";
$res = $conn->query($sql);
if ($res->num_rows > 0) {
    $query = "UPDATE admin_banks SET bank_name='$bank_name', account_number='$account_number', account_name='$account_name' WHERE id=1";
    $result = $conn->query($query);
    if ($result === true) {
        echo "Success: Bank Inserted..";
    } else {
        echo ("Something went wrong " . $conn->error);
    }
} else {
    $query = "INSERT INTO admin_banks (bank_name, account_number, account_name) VALUES ('$bank_name','$account_number','$account_name')";
    $result = $conn->query($query);
    if ($result === true) {
        echo "Success: Bank Inserted..";
    } else {
        echo ("Something went wrong " . $conn->error);
    }
}
$conn->close();
