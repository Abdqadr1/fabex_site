<?php
session_start();
include_once "connect_db.php";
if (!isset($_SESSION['id']) || empty($_SESSION['id'])) {
    exit("No valid user");
}
$id = $_SESSION['id'];
$output = array();

function getStatusColor($stat)
{
    switch ($stat) {
        case 1:
            return "warning";
        case 2:
            return "success";
        case 3:
            return "red";
    }
};
function getTimeDiff($date)
{
    $d = strtotime($date);
    $date1 = date_create(date("Y-m-d h:i:sa", $d));
    $date2 = date_create(date("Y-m-d h:i:sa"));
    return date_diff($date2, $date1);
};
$sql = "SELECT descrip, time, amount, id, status FROM trx_history WHERE u_id='$id' AND status>0";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    while ($rows = $result->fetch_assoc()) {
        $desc = $rows["descrip"];
        $amount = $rows['amount'];
        $tid = $rows['id'];
        $status = getStatusColor($rows['status']);
        $time = getTimeDiff($rows['time']);

        $each = "<div class='row justify-content-between transaction' id='$tid'>
                <div class='col-8 ml-2'>
                    <span class='trans-title'>$desc</span><br>
                    <span class='trans-status'>
                        <span class='ellipse' style='--type: var(--$status);'></span>In progress</span>
                </div>
                <div class='col-3 text-to-right'>
                    <span class='trans-amount'>N$amount</span><br>
                    <span class='trans-time'>$time mins ago</span>
                </div>
            </div>";
        array_push($output, $each);
    }
} else {
    $no = "no history";
    array_push($output, $no);
}

echo implode("", $output);
