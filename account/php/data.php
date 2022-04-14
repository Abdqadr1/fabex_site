<?php
if ($_SERVER["REQUEST_METHOD"] != "GET" || !isset($_GET["which"])) {
    exit("Invalid credentials!");
}
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
    // get buy cryptos
    $buy_array = array();
    $sql = "SELECT id, name, acronym, price, low_price, network, memo FROM buy_cryptos WHERE status=1 AND price>0";
    $result = $conn->query($sql);
    if ($result == true && $result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            array_push($buy_array, $row);
        }
    } else {
        echo "Error: " . $conn->error;
    }

    // get sell cryptos
    $sell_array = array();
    $sql = "SELECT id, name, acronym, price, low_price, network, memo FROM sell_cryptos WHERE status=1 AND price>0";
    $result = $conn->query($sql);
    if ($result == true && $result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            array_push($sell_array, $row);
        }
    } else {
        echo "Error: " . $conn->error;
    }
    echo json_encode(array($buy_array, $sell_array));
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
