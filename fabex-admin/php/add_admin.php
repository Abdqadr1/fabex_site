<?php
session_start();
if (isset($_SESSION["access_level"]) && $_SESSION["access_level"] == 1) {
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        if (
            isset($_POST["fname"]) && !empty($_POST["fname"]) &&
            isset($_POST["lname"]) && !empty($_POST["lname"]) &&
            isset($_POST["phone"]) && !empty($_POST["phone"]) &&
            isset($_POST["email"]) && !empty($_POST["email"]) &&
            isset($_POST["password"]) && !empty($_POST["password"]) &&
            isset($_POST["con_password"]) && !empty($_POST["con_password"])
        ) {
            include_once "../../account/php/connect_db.php";
            $fname = mysqli_escape_string($conn, $_POST["fname"]);
            $lname = mysqli_escape_string($conn, $_POST["lname"]);
            $phone = mysqli_escape_string($conn, $_POST["phone"]);
            $email = mysqli_escape_string($conn, $_POST["email"]);
            $password = mysqli_escape_string($conn, $_POST["password"]);
            $con_password = mysqli_escape_string($conn, $_POST["con_password"]);

            if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
                if (!isEmailExist($conn, $email)) {
                    if (strlen($password) >= 8 && strlen($con_password) >= 8) {
                        if ($password === $con_password) {
                            $password = password_hash($password, PASSWORD_DEFAULT);
                            $sql = "INSERT INTO admins 
                            (full_name, email, pword, phone_number, access, access_level, completed) VALUES
                            (CONCAT('$fname', ' ', '$lname'), '$email', '$password', '$phone', 1, 2, 0)";
                            $result = $conn->query($sql);
                            if ($result === true) {
                                echo json_encode("Record inserted");
                            } else {
                                http_response_code(500);
                                echo json_encode("Error inserting record ");
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
                    echo json_encode("Email already exists");
                    http_response_code(400);
                }
                $conn->close();
            } else {
                http_response_code(400);
                echo json_encode("Enter a valid email address");
            }
        } else {
            http_response_code(400);
            json_encode("Incomplete parameters");
        }
    } else {
        http_response_code(400);
        echo json_encode("Request method not supported");
    }
} else {
    http_response_code(403);
    echo json_encode("Not authorized");
}

function isEmailExist(mysqli &$conn, string $email)
{
    $sql = "SELECT COUNT(id) FROM admins WHERE email='$email'";
    $res = $conn->query($sql);
    if ($res->fetch_array()[0] > 0) {
        return true;
    }
    return false;
}
