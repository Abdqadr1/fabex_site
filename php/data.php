<?php
if ($_SERVER["REQUEST_METHOD"] != "GET" || !isset($_GET["which"])) {
    exit("Invalid credentials!");
}
//TODO: insert banks and crypto
$banks = array(
    "ACCESS BANK", "ALATbyWEMA", "CITI BANK", "ECOBANK", "FCMB", "FIDELITY BANK", "FIRST BANK", "GUARANTY TRUST BANK", "JAIZ BANK",
    "KEYSTONE BANK", "KUDA BANK", "LOTUS BANK", "PAGA", "PALMPAY", "OPAY", "POLARIS BANK", "PROVIDUS BANK", "STANBIC IBTC BANK", "STANDARD CHARTERED BANK", "STERLING BANK",
    "UNION BANK", "UNITED BANK OF AFRICA(UBA)", "UNITY BANK", "VFD MFB", "WEMA BANK", "ZENITH BANK"
);
$coins = array("BTC" => "Bitcoin", "ETH" => "Etherium", "BNB" => "Binance Coin");
$which = $_GET["which"];
if (!empty($which)) {
    if (strtolower($which) == "banks") {
        echo json_encode($banks);
    } else if (strtolower($which) == "coins") {
        echo json_encode($coins);
    }
}
