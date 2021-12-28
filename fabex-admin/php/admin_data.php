<?php
include_once "../../php/connect_db.php";
if (!isset($_GET["which"]) || empty($_GET["which"])) {
    exit("Invalid parameters..");
}

$which = mysqli_escape_string($conn, $_GET["which"]);
$which = testInput($which);
function getBank(mysqli &$conn)
{
    $sql = "SELECT * FROM admin_banks WHERE id=1";
    $result = $conn->query($sql);
    if ($result->num_rows) {
        $row = $result->fetch_assoc();
        $arr = array($row["bank_name"], $row["account_number"], $row["account_name"]);
        echo json_encode(array("Success", $arr));
    } else {
        exit("Something went wrong");
    }
};

switch ($which) {
    case "bank":
        return getBank($conn);
}
