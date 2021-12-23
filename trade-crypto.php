<?php
session_start();
$fname = $_SESSION["fname"];
if (!isset($_SESSION["id"]) || !isset($_SESSION["fname"]) || empty($_SESSION["id"]) || empty($_SESSION["fname"])) {
    header("location: login");
    exit();
}
include_once "header.php"; ?>

<body>
    <div class="container pl-4 my-4"><span class="backBtn material-icons" id="backBtn">
            chevron_left
        </span></div>
    <div class="body row justify-content-center payment-row">
        <div class="col-md-5 col-lg-4 col-10 trade">
            <p class="kindly-pay my-2 text-center mb-3">Trade Crypto</p>
            <div class="row justify-content-center">
                <button class="col-3 btn btn-outline-secondary mr-3 buy active trading">Buy</button>
                <button class="col-3 btn btn-outline-secondary ml-3 sell trading">Sell</button>
            </div>
            <form method="POST" action="php/trade_crypto.php" id="tradeCryptoForm">
                <div tabindex="-1" class="alert alert-danger d-none text-center mt-3" id="errorDiv" role="alert"></div>
                <!-- assets -->
                <div class="mt-3">
                    <label for="assets" class="form-label">Assets</label>
                    <select name="asset" class="form-select rad8" id="assets" required>
                        <option value="" selected hidden>Select coin...</option>
                    </select>
                </div>
                <!-- amount -->
                <label for="amount" class="form-label mb-1 mt-3">Amount ($)</label>
                <input name="amount" type="text" class="form-control form-control-lg" id="amount" required>
                <p class="mt-2 mb-0 fw-bold">Total: N33,000</p>
                <input type="hidden" name="price" value="33,00">
                <div id="buyingFields" class="no-margin">
                    <!-- amount -->
                    <div class="for-buy">
                        <label for="address" class="form-label mb-1 mt-3">Wallet Address</label>
                        <input name="address" type="text" class="form-control form-control-lg buyInput" id="address" placeholder="Enter wallet address" required>
                    </div>

                    <!-- network -->
                    <div class="mt-3 for-buy">
                        <label for="network" class="form-label">Network</label>
                        <select name="network" class="form-select rad8 buyInput" id="network">
                            <option selected>BEP20 (BSC)</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>
                </div>


                <div class="form-check form-switch my-2 d-none" id="toggle-switch">
                    <input name="switch" class="form-check-input toggle-switch" type="checkbox" role="switch" id="bankSwitch">
                    <label class="form-check-label" for="bankSwitch">Use default account details</label>
                </div>

                <div id="sellingFields" class="no-margin d-none">

                    <!-- bank name -->
                    <div class="mt-3 for-sell bank">
                        <label for="bankName" class="form-label">Bank Name</label>
                        <select name="bank_name" class="form-select rad8 bankInput" id="bankName" required disabled>
                            <option value="" selected disabled hidden>Select Bank Name</option>
                        </select>
                    </div>

                    <!-- account number -->
                    <div class="for-sell bank">
                        <label for="accountNumber" class="form-label mb-1 mt-3">Account number</label>
                        <input name="account_number" type="text" class="form-control form-control-lg bankInput" id="accountNumber" placeholder="Enter account number" required disabled>
                    </div>

                    <!-- account name -->
                    <div class="for-sell bank">
                        <label for="accountName" class="form-label mb-1 mt-3">Account name</label>
                        <input name="account_name" type="text" class="form-control form-control-lg bankInput" id="accountName" placeholder="Enter account name" required disabled>
                    </div>
                </div>

                <input type="hidden" name="act" id="hidden" value="buy">
                <button type="submit" class="payment text-center">Buy Crypto</button>
            </form>


        </div>
    </div>
    <script type="module" src="js/trade_crypto.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>

</body>

</html>