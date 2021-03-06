<div class="body row justify-content-center">
    <div class="col-md-6 col-lg-6 col-11" id="">
        <div class="mx-auto mb-3" id="rates_container">
            <p class="trans-history">Exchange rates</p>
            <div class="rates" data-crypto-rates></div>
            <div class="rates" data-giftcard-rates></div>
            <!-- <div class="rates">
                <div class="row justify-content-between rate">
                    <div class="col-9 ml-2">
                        <span class="rate-title">Crypto</span><br>
                    </div>
                    <div class="col-3 text-to-right">
                        <span class="rate-price">555/$</span>
                    </div>
                </div>
            </div>
            <div class="rates">
                <div class="row justify-content-between rate">
                    <div class="col-9 ml-2">
                        <span class="rate-title">Amazon Gift card (200 above)</span><br>
                    </div>
                    <div class="col-3 text-to-right">
                        <span class="rate-price">230/$</span>
                    </div>
                </div>
                
            </div> -->
        </div>
        <template data-giftcard-rate>
            <div class="row justify-content-between rate">
                <div class="col-7 ml-2">
                    <span class="rate-title"></span><br>
                </div>
                <div class="col-5 text-to-right">
                    <span class="rate-price" data-buy></span>
                    <span class="rate-price" data-sell></span>
                </div>
            </div>
        </template>
        <template data-crypto-rate>
            <div class="row justify-content-between rate">
                <div class="col-9 ml-2">
                    <span class="rate-title"></span><br>
                </div>
                <div class="col-3 text-to-right">
                    <span class="rate-price"></span>
                </div>
            </div>
        </template>
        <template data-no-rate>
            <div class="row justify-content-between rate">
                <div class="col-10 ml-2">
                    <span class="rate-title"></span><br>
                </div>
            </div>
        </template>

        <div class="col-4 mx-auto my-5 text-center d-block" id="loadingContainer">
            <div class='spinner-border spinner-border-sm text-primary' aria-hidden='true' role='status' style='width:4em;height:4em;'></div>
        </div>
    </div>
</div>