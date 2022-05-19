<?php
session_start();
if (!isset($_SESSION["access_level"]) && !empty($_SESSION["access_level"])) {
    http_response_code(403);
    exit;
}
$access_level = $_SESSION["access_level"];
$method = $_SERVER['REQUEST_METHOD'];
if ($method === "GET") {
    if (isset($_GET["id"]) && !empty($_GET["id"])) {
        $id = $_GET["id"];
        include_once "../../account/php/connect_db.php";
        $sql = "SELECT d.full_name, a.time, a.description FROM activity_feeds AS a 
        INNER JOIN admins AS d ON a.admin_id=d.id WHERE tx_id='$id' ORDER BY a.time DESC";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            $arr = array();
            while ($row = $result->fetch_assoc()) {
                array_push($arr, $row);
            }
            echo json_encode($arr);
        } else {
            echo json_encode([]);
        }
        $conn->close();
    } else if (isset($_GET["which"]) && !empty($_GET["which"])) {
        $which = $_GET["which"];
        if ($access_level == 1) {
            include_once "../../account/php/connect_db.php";
            $sql = "SELECT t.tx_id, d.full_name, a.description FROM activity_feeds AS a 
            JOIN trx_history AS t ON a.tx_id=t.id JOIN admins AS d 
            ON a.admin_id=d.id ORDER BY a.time DESC";
            $result = $conn->query($sql);
            if ($result->num_rows > 0) {
                $arr = array();
                while ($row = $result->fetch_assoc()) {
                    array_push($arr, $row);
                }
                echo json_encode($arr);
            } else {
                echo json_encode([]);
            }
            $conn->close();
        } else {
            http_response_code(403);
        }
    } else {
        http_response_code(400);
        echo "Invalid parameters";
    }
}
