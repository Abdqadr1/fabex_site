<?php include_once "header.php"; ?>

<body>
    <div class="container pl-4 my-4"><span class="backBtn material-icons">
            chevron_left
        </span></div>
    <div class="body row justify-content-center payment-row">
        <div class="col-md-5 col-lg-4 col-10 trade">
            <p class="kindly-pay my-2 text-center mb-3">Trade Giftcards</p>
            <div class="row justify-content-center mb-3">
                <button class="col-3 btn btn-outline-secondary mr-3 buy active trading">Buy</button>
                <button class="col-3 btn btn-outline-secondary ml-3 sell trading">Sell</button>
            </div>
            <!-- category -->
            <div class="mt-3">
                <label for="category" class="form-label">Category</label>
                <select class="form-select rad8" id="category">
                    <option selected hidden>Select category...</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
            </div>
            <!-- sub category -->
            <div class="mt-3">
                <label for="subCategory" class="form-label">Sub Category</label>
                <select class="form-select rad8" id="subCategory">
                    <option selected hidden>Select sub...</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
            </div>

            <!-- amount -->
            <label for="amount" class="form-label mb-1 mt-3">Amount ($)</label>
            <input type="text" class="form-control form-control-lg" id="amount" required>
            <p class="mt-2 mb-0 fw-bold">Total: N33,000</p>

            <!-- toggle div -->
            <div class="form-check form-switch my-2" id="toggle-switch">
                <input class="form-check-input toggle-switch" type="checkbox" role="switch" id="bankSwitch">
                <label class="form-check-label" for="bankSwitch">Use default account details</label>
            </div>

            <!-- bank name -->
            <div class="mt-3 for-sell bank">
                <label for="bankName" class="form-label">Bank Name</label>
                <select class="form-select rad8" id="bankName">
                    <option selected disabled hidden>Select Bank Name</option>
                    <option>Access Bank Plc</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
            </div>

            <!-- account number -->
            <div class="for-sell bank">
                <label for="accountNumber" class="form-label mb-1 mt-3">Account number</label>
                <input type="text" class="form-control form-control-lg" id="accountNumber" placeholder="Enter account number" required>

            </div>

            <!-- account name -->
            <div class="for-sell bank">
                <label for="accountName" class="form-label mb-1 mt-3">Account name</label>
                <input type="text" class="form-control form-control-lg" id="accountName" placeholder="Enter account name" required>

            </div>

            <button class="payment text-center">Buy Giftcard</button>
        </div>
    </div>
    <script type="module" src="js/trade_crypto.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>

</body>

</html>