<?php
include_once "../../account/php/connect_db.php";
// for accounts  that has not been verified after 3 days
$sql = "DELETE FROM users where time<= CURRENT_DATE - INTERVAL 3 DAY AND verified=0";
$users_result = $conn->query($sql);

// for transaction that was not completed after 24 hours
$sql = "DELETE FROM trx_history where time<= CURRENT_DATE - INTERVAL 1 DAY AND status=0";
$history_result = $conn->query($sql);
