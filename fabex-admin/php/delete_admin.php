<?php
session_start();
if (isset($_SESSION["access_level"]) && !empty($_SESSION["access_level"])) {
    $access_level = $_SESSION["access_level"];
    $headers = getallheaders();
    if (
        !isset($headers["_id"]) || empty($headers["_id"])
    ) {
        http_response_code(403);
        echo ("Invalid parameters..");
    } else {
        $id = $headers["_id"];
        if ($access_level == 1) {
            include_once "../../account/php/connect_db.php";
            $sql = "DELETE FROM admins WHERE id='$id'";
            $res = $conn->query($sql);
            if ($res === TRUE) {
                echo json_encode("Admin deleted");
            } else {
                http_response_code(500);
                echo json_encode("Could not delete admin");
            }
            $conn->close();
        } else {
            http_response_code(403);
            echo json_encode("Not authorized");
        }
    }
} else {
    http_response_code(403);
}
