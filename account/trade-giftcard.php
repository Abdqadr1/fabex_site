<?php
session_start();

include_once "php/connect_db.php";
include_once "functions.php";
isTimeout();
isLoggedIn();
isSessionChanged($conn);

if (empty($_SESSION["nin"])) {
    header("location: dashboard");
}

include_once "header.php"; ?>

<body>
    <div class="container ps-4 my-4"><span class="backBtn material-icons">
            chevron_left
        </span></div>
    <div class="body row justify-content-center payment-row">
        <div class="col-md-5 col-lg-4 col-10 trade">
            <p class="kindly-pay my-2 text-center mb-3">Trade Giftcards</p>
            <div class="row justify-content-center mb-3">
                <button class="col-3 btn btn-outline-secondary mr-3 buy active trading">Buy</button>
                <button class="col-3 btn btn-outline-secondary ml-3 sell trading">Sell</button>
            </div>
            <form action="php/trade_giftcard.php" method="POST" id="tradeGiftcardForm">
                <div tabindex="-1" class="alert alert-danger d-none text-center" id="errorDiv" role="alert"></div>
                <!-- category -->
                <div class="mt-3">
                    <label for="category" class="form-label">Category</label>
                    <select name="category" class="form-select rad8" id="category" aria-id="0" required>
                        <option value="" selected hidden>Select category...</option>
                    </select>
                </div>
                <!-- sub category -->
                <div class="mt-3">
                    <label for="subCategory" class="form-label">Sub Category</label>
                    <select name="sub_category" class="form-select rad8" id="subCategory" aria-id="0" required>
                        <option selected hidden>Select sub category...</option>
                    </select>
                </div>

                <!-- amount -->
                <label for="amount" class="form-label mb-1 mt-3">Amount ($)</label>
                <input name="amount" step="0.01" type="number" class="form-control form-control-lg" id="amount" required>
                <p class="mt-2 mb-0 fw-bold" id="amount">Total: N0</p>
                <input type="hidden" name="price" value="" id="priceInput" required>
                <input type="hidden" name="total" value="0" id="totalInput" required>

                <div class="no-margin d-none" id="bankDiv">
                    <!-- toggle div -->
                    <div class="form-check form-switch my-2" id="toggle-switch">
                        <input name="toggle" class="form-check-input toggle-switch" type="checkbox" role="switch" id="bankSwitch">
                        <label class="form-check-label" for="bankSwitch">Use default account details</label>
                    </div>
                    <!-- bank name -->
                    <div class="mt-3 for-sell bank">
                        <label for="bankName" class="form-label">Bank Name</label>
                        <select name="bank_name" class="form-select rad8 sell-input" id="bankName" disabled required>
                            <option selected disabled hidden>Select Bank Name</option>
                        </select>
                    </div>
                    <!-- account number -->
                    <div class="for-sell bank">
                        <label for="account_number" class="form-label mb-1 mt-3">Account number</label>
                        <input name="account_number" type="text" class="form-control form-control-lg sell-input" id="account_number" placeholder="Enter account number" required disabled>
                    </div>
                    <!-- account name -->
                    <div class="for-sell bank">
                        <label for="accountName" class="form-label mb-1 mt-3">Account name</label>
                        <input name="account_name" type="text" class="form-control form-control-lg sell-input" id="accountName" placeholder="Enter account name" required disabled>
                    </div>
                </div>
                <input type="hidden" name="act" id="hidden" value="buy">
                <button type="submit" class="payment text-center">Buy Giftcard</button>
            </form>

        </div>
    </div>
    <?php include_once "timeout-modal.html" ?>
    <script type="module" src="../js/trade_giftcard.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>

</body>

</html>