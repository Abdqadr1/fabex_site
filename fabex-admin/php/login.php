<?php
session_start();


include_once "../../account/php/connect_db.php";

if (!isset($_POST["username"]) || !isset($_POST["password"])) {
    exit("Invalid credentials!");
}

$username = $_POST["username"];
$password = $_POST['password'];



if (!empty($username) && !empty($password)) {
    $username = mysqli_escape_string($conn, $_POST["username"]);
    $password = mysqli_escape_string($conn, $_POST["password"]);
    $username = testInput($username);
    $password = testInput($password);

    $_SESSION["timestamp"] = time();

    $login_query = "SELECT id, pword, username FROM admins WHERE username = '$username'";
    $result = $conn->query($login_query);
    if ($result->num_rows === 1) {
        $row = $result->fetch_assoc();
        $pword = $row["pword"];
        if (password_verify($password, $pword)) {
            $_SESSION["admin_id"] = $row["id"];
            $_SESSION["username"] = $row["username"];
            echo "success: admin logged in";
        } else {
            echo "Wrong password!";
        }
    } else {
        echo "Invalid username";
    }
} else {
    exit("All fields are required! " . $_POST['password'] . $_POST["username"]);
}
$conn->close();
