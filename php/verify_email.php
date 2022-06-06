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
    $query = "SELECT id, verified, nin FROM users WHERE email='$email' AND v_code='$code'";
    $result = $conn->query($query);
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $id = $row["id"];
        $verified = $row["verified"];
        $nin = $row["nin"];
        if ($verified == 1) {
            echo "Email already verified!";
        } else {
            $update_query = "UPDATE users SET verified=true WHERE id='$id'";
            $res = $conn->query($update_query);
            if ($res == true) {
                $_SESSION["id"] = $id;
                $_SESSION["email"] = $email;
                $_SESSION["verified"] = $verified;
                $_SESSION["nin"] = $nin;
                echo "<div style='height: 100vh;display:flex;align-items:center;justify-content:center'>
                        <div style='margin:auto 0;'>
                            <h4 style='text-align:center;'>Email verified successfully!</h4>
                            <a href='../login' style='margin: 0 auto;display: block;width: fit-content;
                                padding: 8px 15px;border-radius: 8px;
                                background: #1d5255;color: white;text-decoration: none;'>Log In</a>
                        </div>
                    </div>";
            } else {
                echo "Error verifying email, try again later.";
            }
        }
    } else {
        echo `Email: $email does not exist`;
    }
} else {
    echo `Nothing to see!`;
}
$conn->close();
