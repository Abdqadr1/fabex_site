<?php
session_start();
if (empty($_SESSION["nin"])) {
    exit("location: dashboard");
}
if (!isset($_SESSION["id"]) || !isset($_SESSION["tx_id"]) || !isset($_SESSION["amount"]) || !isset($_SESSION["which"])) {
    exit("Not enough parameters!");
}
if (empty($_SESSION["id"]) || empty($_SESSION["tx_id"]) || empty($_SESSION["amount"]) || empty($_SESSION["which"])) {
    exit("Parameters must not be empty!");
}
$id = $_SESSION["id"];
$tx_id = $_SESSION["tx_id"];
$amount = $_SESSION["amount"];
$which = $_SESSION["which"];

include_once "connect_db.php";

$sql = "SELECT COUNT(*) FROM trx_history WHERE tx_id='$tx_id'";
$res = $conn->query($sql);
if ($res->fetch_array()[0] != 1) {
    exit("Invalid transaction ID!");
}

if (!isset($_FILES["upload"]) || empty($_FILES["upload"])) {
    exit("Invalid parameters!");
}

$accepted = array("jpg", "jpeg", "png", "gif");
$error = array();
$target_dir = "trx_proof/";
$uploaded = array();
$not_uploaded = 0;
$number = 0;


foreach ($_FILES["upload"]['tmp_name'] as $key => $tmp_name) {
    $number++;
    $file_name = strtolower($_FILES["upload"]["name"][$key]);
    $file_tmp = $_FILES["upload"]["tmp_name"][$key];
    $ext = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));
    // echo "$file_name $file_tmp $ext";
    $checkImage = getimagesize($file_tmp);
    $size = $_FILES["upload"]["size"][$key];
    if ($checkImage !== false) {
        if (in_array($ext, $accepted)) {
            //check if file is not too large
            if ($size < 2000000) {
                // remove if already exists
                $upload_file = $target_dir . $tx_id . "/" . $file_name;
                if (file_exists($upload_file)) {
                    unlink($upload_file);
                }
                //upload the file
                if (move_uploaded_file($file_tmp, $upload_file)) {
                    array_push($uploaded, $upload_file);
                } else {
                    $not_uploaded++;
                    array_push($error, "There was an error uploading $file_name");
                }
            } else {
                $not_uploaded++;
                array_push($error, "$file_name is larger than 2MB");
            }
        } else {
            $not_uploaded++;
            array_push($error, "$file_name is not an actual image");
        }
    } else {
        $not_uploaded++;
        array_push($error, "$file_name was not uploaded, Only JPG, JPEG, PNG, GIF are allowed");
    }
}

if (count($uploaded) === $number) {
    $up = implode(",", $uploaded);
    $sql = "UPDATE trx_history SET proof='$up', status=1 WHERE tx_id='$tx_id'";
    $result = $conn->query($sql);
    if ($result === true) {
        $_SESSION['tx_id'] = "";
        $_SESSION["which"] = "";
        $_SESSION["amount"] = "";
        $_SESSION["price"] = "";
        echo "Success: Images uploaded!";
    } else {
        echo "Something went wrong when updating record: " . $conn->error;
    }
} else {
    echo implode("\n", $error) . "\n Try again";
}
