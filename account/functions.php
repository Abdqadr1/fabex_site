<?php

function isTimeout()
{
    if (!isset($_SESSION['timestamp']) || (time() - $_SESSION['timestamp']) > 86400) {
        header("location: ../login");
    }
}
function isTime(mysqli $conn)
{
    if (!isset($_SESSION['session_id']) || !isset($_SESSION['timestamp']) || (time() - $_SESSION['timestamp']) > 600) {
        exit("Session timeout: Login again");
    }
    $session_id = $_SESSION['session_id'];
    $sql = "SELECT session_id FROM users WHERE id='$session_id'";
    $result = $conn->query($sql);
    if ($result->num_rows === 1) {
        $row = $result->fetch_assoc();
        if ($row["session_id"] !== $session_id) {
            exit("Session timeout: Login again");
        }
    }
}

function isSessionChanged($conn)
{
    $id = $_SESSION['id'];
    $session_id = $_SESSION['session_id'];
    $sql = "SELECT session_id FROM users WHERE id='$id'";
    $result = $conn->query($sql);
    if ($result->num_rows === 1) {
        $row = $result->fetch_assoc();
        if ($row["session_id"] !== $session_id) {
            header("location: ../login");
        }
    }
}

function isLoggedIn()
{
    if (
        !isset($_SESSION["id"]) || !isset($_SESSION["fname"])
        || empty($_SESSION["id"]) || empty($_SESSION["fname"]) || !isset($_SESSION["nin"])
    ) {
        header("location: ../login");
        exit();
    }
}

function isTransaction()
{
    if (!isset($_SESSION["amount"]) || !isset($_SESSION["tx_id"]) || !isset($_SESSION["which"]) || !isset($_SESSION["act"])) {
        echo ("Invalid credentials!");
        header("location: dashboard");
    }
    if (empty($_SESSION["amount"]) || empty($_SESSION["tx_id"]) || empty($_SESSION["which"]) || empty($_SESSION["act"])) {
        echo ("Invalid credentials!");
        header("location: dashboard");
    }
}
