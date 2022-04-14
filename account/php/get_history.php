<?php
session_start();

include_once "connect_db.php";
include_once "../functions.php";
isTime($conn);

if (!isset($_SESSION['id']) || empty($_SESSION['id'])) {
    exit("No valid user");
}
$id = $_SESSION['id'];

$r_time = $conn->query("SELECT CURRENT_TIMESTAMP()");
$current_time = date("Y-m-d H:i:s", time());

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
function getStatusText($stat)
{
    switch ($stat) {
        case 1:
            return "Pending";
        case 2:
            return "Success";
        case 3:
            return "Cancelled";
    }
};
function plural($val, $unit)
{
    if ($val > 1) {
        return "$val $unit" . "s";
    };
    return "$val $unit";
};
function getTimeDiff($date, $current_time)
{
    $date1 = new DateTime($date);
    $since = $date1->diff(new DateTime(date($current_time)));
    $y = $since->y;
    $m = $since->m;
    $d = $since->d;
    $h = $since->h;
    $i = $since->i;
    $s = $since->s;
    if ($y > 0) return plural($y, "year") . " ago";
    if ($m > 0) return plural($m, "month") . " ago";
    if ($d > 0) return plural($d, "day") . " ago";
    if ($h > 0) return plural($h, "hour") . " ago";
    if ($i > 0) return plural($i, "minute") . " ago";
    if ($s > 0) return plural($s, "second") . " ago";
};

$output = array();

$sql = "SELECT descrip, time, amount,price, id, tx_id, type, status, email, which, network, memo, wallet_address, bank_name, 
account_number FROM trx_history WHERE u_id='$id' AND status != 0 ORDER BY time DESC";
$result = $conn->query($sql);
if ($result == true && $result->num_rows > 0) {
    while ($rows = $result->fetch_array(MYSQLI_ASSOC)) {
        $stat = $rows['status'];
        $rows["status_color"] = getStatusColor($stat);
        $rows['timestamp'] = $rows['time'];
        $rows['time'] = getTimeDiff($rows['time'], $current_time);
        $rows['status_text'] = getStatusText($stat);
        $rows["type"] = ($rows["type"] == 1) ? "sell" : "buy";
        array_push($output, $rows);
    }
}

echo json_encode($output);
