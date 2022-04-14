<?php
session_start();

include_once "php/connect_db.php";
include_once "functions.php";
isTimeout();
isLoggedIn();
isSessionChanged($conn);
isTransaction();
$amount = $_SESSION["amount"];

if ($_SESSION["act"] != "sell" || $_SESSION["which"] != "crypto" || !isset($_SESSION["product_id"]) || empty($_SESSION["product_id"])) {
    exit("Wrong transaction!");
}

$tx_id = $_SESSION["tx_id"];
$act = $_SESSION["act"];
$product_id = $_SESSION["product_id"];

$sql = "SELECT type FROM trx_history WHERE tx_id='$tx_id'";
$res = $conn->query($sql);
if ($res->num_rows == 1) {
    $row = $res->fetch_assoc();
    if ($row["type"] != 1 || $act != "sell") {
        header("location: giftcard");
    } else {
        $query = "SELECT network, acronym, address,memo  FROM sell_cryptos WHERE id='$product_id'";
        $result = $conn->query($query);
        if ($result == true && $result->num_rows == 1) {
            $r = $result->fetch_assoc();
            $network = $r["network"];
            $address = $r["address"];
            $acronym = $r["acronym"];
            $memo = $r["memo"];
            if (empty($memo)) $memo = 'No memo';
        } else {
            exit("Error getting crypto details...");
        }
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
                <p class="kindly-pay my-2 text-center mb-3">Kindly withdraw <span class="amount">$<?php echo $amount; ?></span> worth of <?php echo $acronym; ?> to the address below</p>
                <div tabindex="-1" class="alert alert-danger d-none text-center mt-2" id="errorDiv" role="alert"></div>
                <div class="details my-3  row p-2 rounded border paybg">
                    <div class="col-8 p-0">
                        <span class="d-block title">Network</span>
                        <span class="value"><?php echo strtoupper($network);  ?></span>
                    </div>
                </div>
                <div class="details my-3 row p-2 rounded border justify-content-between paybg">
                    <div class="col-10 p-0">
                        <span class="d-block title">Address</span>
                        <span class="value account-number"><?php echo $address; ?></span>
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
                        <span class="value account-number"><?php echo $memo; ?></span>
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
                <input type="file" accept="image/*" name="upload[]" class="file-input" id="upload" multiple required>
                <button type="submit" name="submit" class="payment text-center">Proceed</button>
            </form>
        </div>
    </div>

    <?php include_once "timeout-modal.html" ?>
    <script src="../js/sell_crypto.js" type="module"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</body>

</html>