<?php

// send email function
function sendEmail(string $type, string $link, string $to, mysqli $conn, string $fname = "", int $userId = 0)
{
    $headers = "From: Fabex <notification@fabex.com>\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html;charset=utf-8\r\n";
    if ($type == "register") {
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
        if ($type == "register") {
            echo "Email not sent, Try again";
            $conn->query("DELETE FROM users WHERE id='$userId'");
        } else echo "Email not sent, something went wrong";
    }
}
