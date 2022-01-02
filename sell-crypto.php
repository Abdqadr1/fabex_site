<?php
session_start();
if (!isset($_SESSION['timestamp']) || (time() - $_SESSION['timestamp']) > 1800) {
    header("location: login");
}
if (!isset($_SESSION["id"])) header("location : login");
$amount = $_SESSION["amount"];
if (!isset($_SESSION["amount"]) || !isset($_SESSION["tx_id"]) || !isset($_SESSION["which"]) || !isset($_SESSION["act"])) {
    echo ("Invalid credentials!");
    header("location: giftcard");
}
if (empty($_SESSION["amount"]) || empty($_SESSION["tx_id"]) || empty($_SESSION["which"]) || empty($_SESSION["act"])) {
    echo ("Invalid credentials!");
    header("location: giftcard");
}

if ($_SESSION["act"] != "sell") {
    echo ("Wrong transaction!");
    header("location: crypto");
}
if ($_SESSION["which"] != "crypto") {
    echo ("Wrong transaction!");
    header("location: crypto");
}

$tx_id = $_SESSION["tx_id"];
$act = $_SESSION["act"];
include_once "php/connect_db.php";
$sql = "SELECT typ, u_id FROM trx_history WHERE tx_id='$tx_id'";
$res = $conn->query($sql);
if ($res->num_rows == 1) {
    $row = $res->fetch_assoc();
    if ($row["typ"] == 0 && $act != "buy") {
        header("location: giftcard");
    } elseif ($row["typ"] == 1 && $act != "sell") {
        header("location: crypto");
    }
    if ($row['u_id'] !== $_SESSION["id"]) {
        header("location: crypto");
    }
} else {
    header("location: crypto");
}
include_once "header.php"; ?>

<body>
    <div class="container pl-5 my-4"><span class="backBtn material-icons" id="backBtn">
            chevron_left
        </span></div>
    <div class="body row justify-content-center payment-row">
        <div class="col-md-5 col-lg-4 col-10">
            <form action="php/sell.php" method="POST" enctype="multipart/form-data" id="uploadForm">
                <p class="kindly-pay my-2 text-center mb-3">Kindly withdraw <span class="amount">$<?php echo $amount; ?></span> worth of ETH to the address below</p>
                <div tabindex="-1" class="alert alert-danger d-none text-center mt-2" id="errorDiv" role="alert"></div>
                <div class="details my-3  row p-2 rounded border paybg">
                    <div class="col-8 p-0">
                        <span class="d-block title">Network</span>
                        <span class="value">LTC</span>
                    </div>
                </div>
                <div class="details my-3 row p-2 rounded border justify-content-between paybg">
                    <div class="col-10 p-0">
                        <span class="d-block title">Address</span>
                        <span class="value account-number">e1t2f2yff3fnfjh3rf2f89e2fffef2fiu2fnsge</span>
                    </div>
                    <div class="col-1 text-center">
                        <span class="tt" title="Copy account number">
                            <span class="payment material-icons copyBtn">
                                content_copy
                            </span>
                        </span>

                    </div>
                </div>
                <div class="details my-3 row p-2 rounded border justify-content-between paybg">
                    <div class="col-8 p-0">
                        <span class="d-block title">Memo</span>
                        <span class="value account-number">1214</span>
                    </div>
                    <div class="col-1 text-center">
                        <span class="tt" title="Copy account number">
                            <span class="payment material-icons copyBtn">
                                content_copy
                            </span>
                        </span>

                    </div>
                </div>
                <!-- upload form -->
                <p class="mb-1">Upload proof of transfer</p>
                <div class="upload row justify-content-between">
                    <span class="col-7 text-left file-placeholder">png, jpg or jpeg</span>
                    <label for="upload" class="col-5 choose">Choose image</label>
                </div>
                <input type="file" accept="image/*" name="upload[]" class="file-input" id="upload" multiple>
                <button type="submit" name="submit" class="payment text-center">Proceed</button>
            </form>
        </div>
    </div>
    <script src="js/sell_crypto.js" type="module"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</body>

</html>