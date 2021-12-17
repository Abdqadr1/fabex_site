<?php
if ($_SERVER["REQUEST_METHOD"] != "GET" || !isset($_GET["which"])) {
    exit("Invalid credentials!");
}
//TODO: insert banks and crypto
$banks = array("Access Bank", "Alat", "UBA Plc");
$coins = array("BTC" => "Bitcoin", "ETH" => "Etherium", "BNB" => "Binance Coin");
$which = $_GET["which"];
if (!empty($which)) {
    if (strtolower($which) == "banks") {
        echo json_encode($banks);
    } else if (strtolower($which) == "coins") {
        echo json_encode($coins);
    }
}
