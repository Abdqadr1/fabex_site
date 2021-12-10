<?php include_once "header.php"; ?>

<body>
    <div class="container pl-4 my-4"><span class="backBtn material-icons">
            chevron_left
        </span></div>
    <div class="body row justify-content-center payment-row">
        <div class="col-md-5 col-lg-4 col-9 col-sm-7 trade">
            <p class="kindly-pay my-2 text-center mb-5">Trade Giftcards</p>
            <div class="row justify-content-center mb-4">
                <button class="col-3 btn btn-outline-secondary mr-3 buy active trading">Buy</button>
                <button class="col-3 btn btn-outline-secondary ml-3 sell trading">Sell</button>
            </div>
            <!-- category -->
            <label for="category" class="form-label mb-1 mt-3">Category</label>
            <select class="select" id="category" required>
                <option selected>Select category...</option>
            </select>

            <!-- sub category -->
            <label for="subCategory" class="form-labe mb-1 mt-3">Sub category</label>
            <select class="select" id="subCategory" required>
                <option selected>Select sub...</option>
            </select>

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
            <div class="for-sell bank">
                <label for="bankName" class="form-label my-1">Bank Name</label>
                <select class="select mb-1" id="bankName" required>
                    <option selected disabled hidden>Select Bank Name</option>
                    <option>Access Bank Plc</option>
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

            <button class="payment text-center">Buy Crypto</button>
        </div>
    </div>
    <script type="module" src="js/trade_crypto.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>

</body>

</html>