<?php
session_start();
if (isset($_SESSION["access_level"]) && !empty($_SESSION["access_level"])) {
    $access_level = $_SESSION["access_level"];
    $headers = getallheaders();
    if (
        !isset($headers["_access"]) || !isset($headers["_id"])
        || empty($headers["_id"])
    ) {
        http_response_code(400);
        echo ("Invalid parameters..");
    } else {
        $access = $headers["_access"];
        $id = $headers["_id"];
        if ($access_level == 1) {
            include_once "../../account/php/connect_db.php";
            $sql = "UPDATE admins SET access='$access' WHERE id='$id'";
            $res = $conn->query($sql);
            if ($res === TRUE) {
                echo json_encode("Access updated");
            } else {
                http_response_code(500);
                echo json_encode($conn->error);
            }
            $conn->close();
        } else {
            http_response_code(403);
        }
    }
} else {
    http_response_code(403);
}
