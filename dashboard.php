<?php include "header.php"; ?>

<body>
    <div class="container-lg py-3 mt-5">
        <div class="row justify-content-center g-2">
            <div class="col-md-6">
                <p class="kindly-pay mb-3">Hello Joseph,</p>
                <p class="mb-3 fw-bold">What would you like to do? </p>
                <div class="row justify-content-start g-2 mt-3">
                    <div class="col col-md-5 py-4 px-3 todo text-sm-center">
                        <span class="material-icons icon giftcard">
                            card_giftcard
                        </span>
                        <p class="mt-3 act">Trade Giftcards</p>
                        <p class="note">Amazon, Google play, Xbox, Itunes, ebay, etc.</p>
                    </div>
                    <div class="col-md-5 py-4 px-3 todo">
                        <span class="material-icons icon crypto">
                            currency_bitcoin
                        </span>
                        <p class="mt-3 act">Trade Crypto</p>
                        <p class="note">Bitcoin (BTC), Ethereum (ETH), Tether USD (USDT), Binance coin (BNB)</p>
                    </div>
                </div>
            </div>
            <div class="col-md-5">
                <div class="row justify-content-between align-items-end">
                    <p class="col-8 fs-4">Recent transactions</p>
                    <p class="col-3 fs-6 view-all">view all</p>
                </div>
                <div class="row justify-content-center my-5 ">
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

    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</body>

</html>