<?php
$server_name = "localhost";
$username = "root";
$password = "";
$database = "crypto_table";

date_default_timezone_set("Africa/Lagos");

// Create connection
$conn = new mysqli($server_name, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

function testInput($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
