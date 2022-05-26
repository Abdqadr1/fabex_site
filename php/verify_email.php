<?php
session_start();


if ($_SERVER["REQUEST_METHOD"] !== "GET" || !isset($_GET["email"]) || !isset($_GET["verify"])) {
    echo "Nothing to see";
    exit();
}

include_once "../account/php/connect_db.php";
include_once "../account/php/user_actions.php";

$email = mysqli_escape_string($conn, $_GET["email"]);
$code = mysqli_escape_string($conn, $_GET["verify"]);
if (
    !empty($email) && !empty($code)
) {
    $query = "SELECT id, verified FROM users WHERE email='$email' AND v_code='$code'";
    $result = $conn->query($query);
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $id = $row["id"];
        $verified = $row["verified"];
        if ($verified == 1) {
            echo "Email already verified!";
        } else {
            $update_query = "UPDATE users SET verified=true WHERE id='$id'";
            $res = $conn->query($update_query);
            if ($res == true) {
                $_SESSION["id"] = $id;
                $_SESSION["email"] = $email;
                $_SESSION["verified"] = $verified;
                header("location: ../add-bank.php");
            } else {
                echo "Error occur while updating record: " . $conn->error;
            }
        }
    } else {
        echo `Email: $email does not exist`;
    }
} else {
    echo `Nothing to see!`;
}
$conn->close();
