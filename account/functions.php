<?php
function isTimeout()
{
    if (!isset($_SESSION['timestamp']) || (time() - $_SESSION['timestamp']) > 86400) {
        header("location: ../login");
    }
}
function isTime()
{
    if (!isset($_SESSION['timestamp']) || (time() - $_SESSION['timestamp']) > 900) {
        exit("Session timeout: Login again");
    }
}

function isLoggedIn()
{
    if (!isset($_SESSION["id"]) || !isset($_SESSION["fname"]) || empty($_SESSION["id"]) || empty($_SESSION["fname"])) {
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
