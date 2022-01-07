<div class="row justify-content-center justify-content-md-around no-margin mt-5">
    <div class="col-10 col-md-6">
        <p class="kindly-pay mb-3 mx-md-3 mx-3">Hello <span class="text-caps" id="fname"><?php echo $fname; ?></span>,</p>
        <p class="mb-3 fw-bold mx-md-3 mx-3">What would you like to do? </p>
        <div class="row justify-content-center justify-content-md-around mt-3 no-margin">
            <div class="col-12 col-md-5 py-md-4 py-2 px-md-3 px-5 todo my-3 my-md-0">
                <a href="giftcard" class="dash">
                    <span class="material-icons icon giftcard d-inline-block">
                        card_giftcard
                    </span>
                    <span class="mt-md-3 mb-0 act d-inline-block d-md-block text-md-left px-2 px-md-0">Trade Giftcards</span>
                    <p class="note d-none d-md-block">Amazon, Google play, Xbox, Itunes, ebay, etc.</p>
                </a>
            </div>
            <div class="col-12 col-md-5 py-md-4 py-2 px-md-3 px-5 todo">
                <a href="crypto" class="dash">
                    <span class="material-icons icon crypto">
                        currency_bitcoin
                    </span>
                    <span class="mt-md-3 mb-0 act d-inline-block d-md-block text-md-left px-2 px-md-0">Trade Crypto</span>
                    <p class="note d-none d-md-block">Bitcoin (BTC), Ethereum (ETH), Tether USD (USDT), Binance coin (BNB)</p>
                </a>
            </div>
        </div>
    </div>
    <div class=" col-10 col-md-5 my-md-0 my-4">
        <div class="row justify-content-between align-items-end no-margin">
            <p class="col-9 fs-4 px-0">Recent transactions</p>
            <p class="col-3 fs-6 view-all px-0" id="view_all">view all</p>
        </div>
        <div id="historyDiv">
            <div class="col-4 mx-auto my-5 text-center d-block" id="loadingContainer">
                <div class='spinner-border spinner-border-sm text-primary' aria-hidden='true' role='status' style='width:4em;height:4em;'></div>
            </div>
            <div class="row justify-content-center my-5 no-margin d-none" id="no-history">
                <div class="col-6 text-center">
                    <span class="material-icons rounded-pill no-history">
                        sync_alt
                    </span>
                    <span class="no-trans-yet">No transaction yet</span>
                </div>
            </div>
            <!-- <div class="history">
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
            </div> -->
        </div>

    </div>
</div>