<?php
session_start();

include_once "php/connect_db.php";
include_once "functions.php";
isTimeout();
isLoggedIn();

include_once "php/connect_db.php";
isTransaction();

$amount = $_SESSION["amount"];

if ($_SESSION["act"] != "sell") {
    echo ("Wrong transaction!1");
    header("location: giftcard");
}
if ($_SESSION["which"] != "giftcard") {
    echo ("Wrong transaction!2");
    header("location: giftcard");
}

$tx_id = $_SESSION["tx_id"];
$act = $_SESSION["act"];
$sql = "SELECT type, u_id FROM trx_history WHERE tx_id='$tx_id'";
$res = $conn->query($sql);
if ($res == true && $res->num_rows == 1) {
    $row = $res->fetch_assoc();
    if ($row["type"] != 1 || $act != "sell") {
        header("location: giftcard");
    }
} else {
    header("location: giftcard");
}

include_once "header.php";
?>

<body>
    <div class="container pl-5 my-4">
        <span class="backBtn material-icons" id="backBtn">
            chevron_left
        </span>
    </div>
    <div class="body row justify-content-center payment-row">
        <div class="col-md-5 col-lg-4 col-10">
            <form action="php/sell.php" method="POST" id="uploadForm" enctype="multipart/form-data">
                <p class="kindly-pay my-2 text-center mb-5">Kindly upload image(s) of the Giftcards</p>
                <div tabindex="-1" class="alert alert-danger d-none text-center px-2 fw-bold" id="errorDiv" role="alert"></div>
                <!-- upload form -->
                <div class="no-margin mt-5">
                    <label class="text-center d-inline-block giftcard" for="upload">
                        <span class="material-icons" id="number">
                            add
                        </span>
                    </label>
                </div>
                <input name="upload[]" type="file" accept="image/*" class="file-input" id="upload" placeholder="png, jpg or jpeg" multiple required>
                <button type="submit" name="submit" class="payment text-center">Proceed</button>
            </form>

        </div>
    </div>

    <?php include_once "timeout-modal.html" ?>
    <script src="../js/sell_giftcard.js" type="module"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</body>

</html>