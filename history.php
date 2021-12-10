<?php include_once "header.php" ?>

<body>
    <div class="body row justify-content-center">
        <div class="col-md-5 col-lg-5 col-9 col-sm-7">
            <p class="trans-history">Transaction History</p>
            <div class="row justify-content-center my-4">
                <div class="col-4 text-center">
                    <span class="material-icons rounded-pill no-history">
                        sync_alt
                    </span>
                    <span class="no-trans-yet">no transaction yet</span>
                </div>
            </div>
            <div class="rounded history d-none">
                <!-- each transaction -->
                <div class="row justify-content-between transaction">
                    <div class="col-5 ml-2">
                        <span class="trans-title">Bought BTC</span><br>
                        <span class="trans-status">
                            <span class="ellipse" style="--type: var(--warning);"></span>In progress</span>
                    </div>
                    <div class="col-3 text-to-right">
                        <span class="trans-amount">N24,000</span><br>
                        <span class="trans-time">3 mins ago</span>
                    </div>
                </div>
                <!-- each transaction -->
                <div class="row justify-content-between transaction">
                    <div class="col-5 ml-2">
                        <span class="trans-title">Sold USDT</span><br>
                        <span class="trans-status">
                            <span class="ellipse" style="--type: var(--success);"></span>Success</span>
                    </div>
                    <div class="col-3 text-to-right">
                        <span class="trans-amount">N24,000</span><br>
                        <span class="trans-time"> 4 weeks ago</span>
                    </div>
                </div>
                <!-- each transaction -->
                <div class="row justify-content-between transaction">
                    <div class="col-5 ml-2">
                        <span class="trans-title">Sold Amazon giftcard</span><br>
                        <span class="trans-status">
                            <span class="ellipse" style="--type: var(--red);"></span>Cancelled</span>
                    </div>
                    <div class="col-3 text-to-right">
                        <span class="trans-amount">N24,000</span><br>
                        <span class="trans-time">20 mins ago</span>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</body>