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
$which = $_GET["which"];

function getGiftcards()
{
    $arr = array();
    include_once "connect_db.php";
    $sql = "SELECT * FROM giftcards WHERE status=1";
    $result = $conn->query($sql);
    if ($result == true && $result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            array_push($arr, $row);
        }
    } else {
        array_push($arr, "No giftcard found, Contact admin");
    }
    echo json_encode($arr);
    $conn->close();
}

function getCryptos()
{
    include_once "connect_db.php";
    $arr = array();
    $sql = "SELECT id, name, acronym, price FROM cryptos WHERE status=1";
    $result = $conn->query($sql);
    if ($result == true && $result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            array_push($arr, $row);
        }
    } else {
        echo "Error: " . $conn->error;
    }
    echo json_encode($arr);
    $conn->close();
}

if (!empty($which)) {
    switch (strtolower($which)) {
        case "banks":
            echo json_encode($banks);
            break;
        case "giftcards":
            return getGiftcards();
        case "cryptos":
            return getCryptos();
    }
}
