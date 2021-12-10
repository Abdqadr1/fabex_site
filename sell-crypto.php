<?php include_once "header.php"; ?>

<body>
    <div class="container pl-5 my-4"><span class="backBtn material-icons">
            chevron_left
        </span></div>
    <div class="body row justify-content-center payment-row">
        <div class="col-md-5 col-lg-4 col-9 col-sm-7">
            <p class="kindly-pay my-2 text-center mb-5">Kindly withdraw $30 worth of ETH to the address below</p>
            <div class="details my-3  row p-2 rounded border paybg">
                <div class="col-8 p-0">
                    <span class="d-block title">Network</span>
                    <span class="value">LTC</span>
                </div>
            </div>
            <div class="details my-3 row p-2 rounded border justify-content-between paybg">
                <div class="col-8 p-0">
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
                <span class="col-6 text-left placeholder">png, jpg or jpeg</span>
                <label for="upload" class="col-5 text-right choose">Choose image</label>
            </div>
            <input type="file" class="file-input" id="upload" placeholder="png, jpg or jpeg">
            <button class="payment text-center">Proceed</button>
        </div>
    </div>
    <script src="js/sell_crypto.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</body>

</html>