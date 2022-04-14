<?php
include_once "../../account/php/connect_db.php";
$headers = getallheaders();
if (
    !isset($headers["data_sent"]) || empty($headers["data_sent"])
) {
    exit("Invalid parameters..");
}
$data_sent = $headers["data_sent"];
$sql = '';

$data = json_decode($headers["data_sent"]);
foreach ($data as $obj) {
    $which = $obj->which;
    $price = $obj->value;
    $type = $obj->type;
    $range = $obj->range;
    $id = $obj->id;

    if ($which == 'crypto') {
        if ($type == 'buy') {
            if ($range == 'range') $sql .= "UPDATE buy_cryptos SET low_price ='$price';";
            elseif ($range == 'normal') $sql .= "UPDATE buy_cryptos SET price='$price';";
        } else if ($type == 'sell') {
            if ($range == "range") $sql .= "UPDATE sell_cryptos SET low_price='$price';";
            elseif ($range == 'normal') $sql .= "UPDATE sell_cryptos SET price='$price';";
        }
    } else if ($which == 'giftcard') {
        if ($type == 'buy') $sql .= "UPDATE giftcards SET buy_price='$price' WHERE id='$id';";
        elseif ($type == 'sell') $sql .= "UPDATE giftcards SET sell_price='$price' WHERE id='$id';";
    }
}


if ($conn->multi_query($sql)) {
    echo "Rates changed successfully";
} else {
    echo ("Something went wrong updating giftcard price, Try again. " . $conn->error);
}

$conn->close();
