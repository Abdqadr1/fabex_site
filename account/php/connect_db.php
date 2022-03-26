<?php
$server_name = "localhost";
$username = "root";
$password = "";
$database = "fabex";

date_default_timezone_set("Africa/Lagos");
// turn off error reporting
// error_reporting(0);

// Create connection
$conn = new mysqli($server_name, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// escape inputs
function testInput($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
// get id for transaction
function getId(&$conn)
{
    $tx_id = substr(md5(time(), false), 0, 10);
    $sql = "SELECT COUNT(*) FROM tx_history WHERE tx_id='$tx_id'";
    while (($res = $conn->query($sql)) > 0) {
        $uniq = uniqid(
            "trx",
            true
        );
        $tx_id = substr(md5(time() . $uniq, false), 0, 10);
    }
    return $tx_id;
}

// create table if not exist
