<?php
session_start();



if (!isset($_POST["email"]) || !isset($_POST["password"])) {
    http_response_code(400);
    exit("Invalid credentials!");
}

$email = $_POST["email"];
$password = $_POST['password'];

include_once "../../account/php/connect_db.php";


if (!empty($email) && !empty($password)) {
    $email = mysqli_escape_string($conn, $_POST["email"]);
    $password = mysqli_escape_string($conn, $_POST["password"]);
    $email = testInput($email);
    $password = testInput($password);

    $_SESSION["timestamp"] = time();

    $login_query = "SELECT * FROM admins WHERE email = '$email'";
    $result = $conn->query($login_query);
    if ($result->num_rows === 1) {
        $row = $result->fetch_assoc();
        $pword = $row["pword"];
        if (password_verify($password, $pword)) {
            $_SESSION["admin_id"] = $row["id"];
            $_SESSION["email"] = $row["email"];
            $_SESSION["completed"] = $row["completed"];
            $_SESSION["access_level"] = $row["access_level"];
            $_SESSION["wordings"] = $row["pword"];
            if ($row["access"] != 1) {
                http_response_code(403);
                echo "Forbidden: You have no access";
            } else {
                $name = $row["full_name"];
                include_once "../../php/send_email.php";
                if ($row["access_level"] != 1) {
                    sendEmail("admin_login", "", "fabexglobal@gmail.com", $conn, $name);
                }
                echo "success: admin logged in";
            }
        } else {
            http_response_code(400);
            echo "Wrong password!";
        }
    } else {
        http_response_code(400);
        echo "Invalid email address";
    }
} else {
    http_response_code(400);
    echo ("All fields are required!");
}
$conn->close();
