<?php
session_start();
$amount = $_SESSION["amount"];
if (!isset($_SESSION["amount"]) || !isset($_SESSION["tx_id"]) || !isset($_SESSION["which"]) || !isset($_SESSION["act"])) {
    echo ("Invalid credentials!");
    header("location: dashboard");
}
if (empty($_SESSION["amount"]) || empty($_SESSION["tx_id"]) || empty($_SESSION["which"]) || empty($_SESSION["act"])) {
    echo ("Invalid credentials!");
    header("location: dashboard");
}

if ($_SESSION["act"] != "buy") {
    echo ("Wrong transaction!");
    header("location: dashboard");
}
$tx_id = $_SESSION["tx_id"];
$act = $_SESSION["act"];
include_once "php/connect_db.php";
$sql = "SELECT typ, u_id FROM trx_history WHERE tx_id='$tx_id'";
$res = $conn->query($sql);
if ($res->num_rows == 1) {
    $row = $res->fetch_assoc();
    if ($row["typ"] == 0 && $act != "buy") {
        header("location: dashboard");
    } elseif ($row["typ"] == 1 && $act != "sell") {
        header("location: dashboard");
    }
    if ($row['u_id'] !== $_SESSION["id"]) {
        header("location: dashboard");
    }
} else {
    header("location: dashboard");
}
include_once "header.php";
?>

<body>
    <div class="container-md pl-5 my-4 mx-auto"><span class="backBtn material-icons">
            chevron_left
        </span></div>
    <div class="body row justify-content-center payment-row">
        <div class="col-md-5 col-lg-4 col-10">
            <p class="kindly-pay my-2 text-center mb-5">Kindly pay <span class="amount">#<?php echo $amount; ?></span>
                to the account details below</p>
            <div class="details my-3  row p-2 rounded border paybg">
                <div class="col-8 p-0">
                    <span class="d-block title">Bank Name</span>
                    <span class="value">FirstBank</span>
                </div>
            </div>
            <div class="details my-3 row p-2 rounded border justify-content-between paybg">
                <div class="col-8 p-0">
                    <span class="d-block title">Account number</span>
                    <span class="value account-number">3848543594</span>
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
                    <span class="value">Fabex Global</span>
                </div>
            </div>
            <p class="text-danger note"><b>Note:</b> Third party payments are not allowed! You should only pay from an account registered with your name.</p>

            <p class="confirm d-none">Your Gift card will be sent to your email address once order is confirmed.</p>
            <button class="payment text-center"> I have paid, Proceed</button>
        </div>
    </div>

    <script src="js/payment.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</body>

</html>