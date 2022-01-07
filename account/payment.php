<?php
session_start();
include_once "functions.php";
isTimeout();
isLoggedIn();
isTransaction();

$amount = $_SESSION["amount"];

if ($_SESSION["act"] != "buy") {
    echo ("Wrong transaction!");
    header("location: dashboard");
}

$which = $_SESSION["which"];
$d = "d-none";

$tx_id = $_SESSION["tx_id"];
$act = $_SESSION["act"];
include_once "php/connect_db.php";
$sql = "SELECT type, u_id FROM trx_history WHERE tx_id='$tx_id'";
$res = $conn->query($sql);
if ($res->num_rows == 1) {
    $row = $res->fetch_assoc();
    if ($row["type"] != 0 || $act != "buy") {
        header("location: dashboard");
    }
} else {
    header("location: dashboard");
}
// get admin bank
$query = "SELECT bank_name, account_number, account_name FROM admin_banks WHERE id=1";
$result = $conn->query($query);
if ($result == true && $result->num_rows == 1) {
    $row = $result->fetch_assoc();
    $bank = $row["bank_name"];
    $accountNumber = $row["account_number"];
    $accountName = $row["account_name"];
}

include_once "header.php";
?>
<script>
    <?php echo "const which = '$which'"; ?>
</script>

<body>
    <div class="container-md pl-5 my-4 mx-auto"><span class="backBtn material-icons">
            chevron_left
        </span></div>
    <div class="body row justify-content-center payment-row">
        <div class="col-md-5 col-lg-4 col-10">
            <p class="kindly-pay my-2 text-center mb-5">Kindly pay <span class="amount">N<?php echo $amount; ?></span>
                to the account details below</p>
            <div tabindex="-1" class="alert alert-danger col-10 d-none text-center" id="errorDiv" role="alert"></div>
            <div class="details my-3  row p-2 rounded border paybg">
                <div class="col-8 p-0">
                    <span class="d-block title">Bank Name</span>
                    <span class="value"><?php echo $bank; ?></span>
                </div>
            </div>
            <div class="details my-3 row p-2 rounded border justify-content-between paybg">
                <div class="col-8 p-0">
                    <span class="d-block title">Account number</span>
                    <span class="value account-number"><?php echo $accountNumber; ?></span>
                </div>
                <div class="col-1 text-center">
                    <span class="tt" title="Copy account number">
                        <span class="payment material-icons">
                            content_copy
                        </span>
                    </span>

                </div>
            </div>
            <div class="details mt-3 mb-4 row p-2 rounded border justify-content-between paybg">
                <div class="col-8 p-0">
                    <span class="d-block title">Account name</span>
                    <span class="value"><?php echo $accountName; ?></span>
                </div>
            </div>
            <p tabindex="-2" class="text-danger note"><b>Note:</b> Third party payments are not allowed! You should only pay from an account registered with your name.</p>

            <p class="confirm d-none" id="confirm">Your Gift card will be sent to your email address once order is confirmed.</p>
            <form action="php/payment.php" method="POST" id="paidForm">
                <input type="hidden" name="paid" value="yes" id="paidInput">
                <button type="submit" name="paidBtn" class="payment text-center"> I have paid, Proceed</button>
            </form>
        </div>
    </div>

    <script src="../js/payment.js" type="module"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</body>

</html>