<?php include "header.php"; ?>

<body>
    <div class="container-lg py-3 mt-5">
        <div class="row justify-content-center g-2">
            <div class="col-10 col-md-6">
                <p class="kindly-pay mb-3 mx-md-4 mx-4">Hello Joseph,</p>
                <p class="mb-3 fw-bold mx-md-4 mx-4">What would you like to do? </p>
                <div class="row justify-content-center justify-content-md-around mt-3 no-margin">
                    <div class="col-12 col-md-5 py-md-4 py-2 px-md-3 px-5 todo my-3 my-md-0">
                        <span class="material-icons icon giftcard d-inline-block">
                            card_giftcard
                        </span>
                        <span class="mt-md-3 mb-0 act d-inline-block d-md-block text-md-left px-2 px-md-0">Trade Giftcards</span>
                        <p class="note d-none d-md-block">Amazon, Google play, Xbox, Itunes, ebay, etc.</p>
                    </div>
                    <div class="col-12 col-md-5 py-md-4 py-2 px-md-3 px-5 todo">
                        <span class="material-icons icon crypto">
                            currency_bitcoin
                        </span>
                        <span class="mt-md-3 mb-0 act d-inline-block d-md-block text-md-left px-2 px-md-0">Trade Crypto</span>
                        <p class="note d-none d-md-block">Bitcoin (BTC), Ethereum (ETH), Tether USD (USDT), Binance coin (BNB)</p>
                    </div>
                </div>
            </div>
            <div class=" col-10 col-md-5 my-md-0 my-4">
                <div class="row justify-content-between align-items-end">
                    <p class="col-8 fs-4">Recent transactions</p>
                    <p class="col-3 fs-6 view-all">view all</p>
                </div>
                <div class="row justify-content-center my-5 no-margin">
                    <div class="col-6 text-center">
                        <span class="material-icons rounded-pill no-history">
                            sync_alt
                        </span>
                        <span class="no-trans-yet">No transaction yet</span>
                    </div>
                </div>
                <div class="history">
                    <!-- each transaction -->
                    <div class="row justify-content-between transaction">
                        <div class="col-8 ml-2">
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
                        <div class="col-8 ml-2">
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
                        <div class="col-8 ml-2">
                            <span class="trans-title">Sold Amazon giftcard</span><br>
                            <span class="trans-status">
                                <span class="ellipse" style="--type: var(--red);"></span>Cancelled</span>
                        </div>
                        <div class="col-3 text-to-right">
                            <span class="trans-amount">N24,000</span><br>
                            <span class="trans-time">20 mins ago</span>
                        </div>
                    </div>
                    <!-- each transaction -->
                    <div class="row justify-content-between transaction">
                        <div class="col-8 ml-2">
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
                        <div class="col-8 ml-2">
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
                        <div class="col-8 ml-2">
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
                        <div class="col-8 ml-2">
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
                        <div class="col-8 ml-2">
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
                        <div class="col-8 ml-2">
                            <span class="trans-title">Sold USDT</span><br>
                            <span class="trans-status">
                                <span class="ellipse" style="--type: var(--success);"></span>Success</span>
                        </div>
                        <div class="col-3 text-to-right">
                            <span class="trans-amount">N24,000</span><br>
                            <span class="trans-time"> 4 weeks ago</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</body>

</html>