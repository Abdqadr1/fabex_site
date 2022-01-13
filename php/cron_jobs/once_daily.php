<?php
include_once "../../account/php/connect_db.php";
// for accounts  that has being verified after 3 days
$sql = "SELECT id FROM users where time<= CURRENT_DATE - INTERVAL 3 DAY AND verified='0'";
$result = $conn->query($sql);
if ($result == true && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $id = $row["id"];
        $query = "DELETE FROM users WHERE id='$id' LIMIT 1";
        if ($conn->query($query)) {
        } else {
            echo "Something went wrong " . $conn->error;
        }
    }
} else {
    // echo "No user found! " . $conn->error;
}

// for transaction that was not completed after 24 hours
$sql = "SELECT id FROM trx_history where time<= CURRENT_DATE - INTERVAL 1 DAY AND status='0'";
$result = $conn->query($sql);
if ($result == true && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $id = $row["id"];
        $query = "DELETE FROM trx_history WHERE id='$id' LIMIT 1";
        if ($conn->query($query)) {
        } else {
            echo "Something went wrong " . $conn->error;
        }
    }
} else {
    // echo "No transaction found! " . $conn->error;
}
