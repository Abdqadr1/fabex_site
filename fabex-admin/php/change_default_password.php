<?php
session_start();
if (isset($_SESSION["admin_id"]) && $_SESSION["admin_id"] != 1 && $_SESSION["admin_id"] != 2) {
    $admin_id = $_SESSION["admin_id"];
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        if (
            isset($_POST["password"]) && !empty($_POST["password"]) &&
            isset($_POST["con_password"]) && !empty($_POST["con_password"])
        ) {
            include_once "../../account/php/connect_db.php";
            $password = mysqli_escape_string($conn, $_POST["password"]);
            $con_password = mysqli_escape_string($conn, $_POST["con_password"]);

            if (strlen($password) >= 8 && strlen($con_password) >= 8) {
                if ($password === $con_password) {
                    if (!password_verify($password, $_SESSION["wordings"])) {
                        $password = password_hash($password, PASSWORD_DEFAULT);
                        $sql = "UPDATE admins SET pword='$password', completed=1 WHERE id='$admin_id'";
                        $res = $conn->query($sql);
                        if ($res === true) {
                            $_SESSION["completed"] = 1;
                            echo json_encode("Record updated");
                        } else {
                            http_response_code(500);
                            echo json_encode("Error inserting record ");
                        }
                    } else {
                        http_response_code(400);
                        echo json_encode("Change password");
                    }
                } else {
                    http_response_code(400);
                    echo json_encode("Confirm your password");
                }
            } else {
                http_response_code(400);
                echo json_encode("Password length must be equal or greater than 8 characters");
            }
        } else {
            http_response_code(400);
            echo json_encode("Incomplete parameters");
        }
    }
} else {
    http_response_code(400);
    echo json_encode("Action not allowed");
}
