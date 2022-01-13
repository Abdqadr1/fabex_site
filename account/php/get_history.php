<?php
session_start();

include_once "../functions.php";
isTime();

include_once "connect_db.php";
if (!isset($_SESSION['id']) || empty($_SESSION['id'])) {
    exit("No valid user");
}
$id = $_SESSION['id'];

$r_time = $conn->query("SELECT CURRENT_TIMESTAMP()");
$current_time = $r_time->fetch_array()[0];

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
            return "In progress";
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

$sql = "SELECT descrip, time, amount, id, status FROM trx_history WHERE u_id='$id' AND status != 0 ORDER BY time DESC";
$result = $conn->query($sql);
if ($result == true && $result->num_rows > 0) {
    while ($rows = $result->fetch_assoc()) {
        $desc = $rows["descrip"];
        $amount = $rows['amount'];
        $tid = $rows['id'];
        $status = getStatusColor($rows['status']);
        $time = getTimeDiff($rows['time'], $current_time);
        $statText = getStatusText($rows['status']);

        array_push($output, array($tid, $desc, $amount, $time, $status, $statText));
    }
}

echo json_encode($output);
