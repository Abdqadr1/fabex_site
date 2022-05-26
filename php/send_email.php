<?php

// send email function
function sendEmail(string $type, string $link = "", string $to, mysqli $conn, string $fname = "", int $userId = 0)
{
    $headers = "From: Fabex <fabexofficial@fabex.io>\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html;charset=iso-8859-1\r\n";
    $headers .= "X-Priority: 1\r\n";
    $headers .= "X-MSMail-Priority: High\r\n";
    $headers .= "Importance: High\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

    if ($type == "admin_login") {
        $message = file_get_contents("../../login_email_template.php");
        $subject = "Admin Panel Notification";
    } else if ($type == "register") {
        $message = file_get_contents("../verify_email_template.php");
        $subject = "Confirm your email";
    } else {
        $message = file_get_contents("../reset_password_template.php");
        $subject = "Reset your password";
    }
    $message = str_replace("{CONFIRMATION_LINK}", $link, $message);
    $message = str_replace("{FIRST_NAME}", $fname, $message);
    if (mail($to, $subject, $message, $headers)) {
        echo "Success: email sent";
    } else {
        echo "Could not sent email, Try again";
        if ($type == "register") {
            // if email cannot be sent - remove the user from the database
            $conn->query("DELETE FROM users WHERE id='$userId'");
        }
    }
}
