<?php include_once "header.php"; ?>

<body>
    <div class="container pl-5 my-4">
        <span class="backBtn material-icons">
            chevron_left
        </span>
    </div>
    <div class="body row justify-content-center payment-row">
        <div class="col-md-5 col-lg-4 col-9 col-sm-7">
            <p class="kindly-pay my-2 text-center mb-5">Kindly upload image(s) of the Giftcards</p>
            <!-- upload form -->
            <div class="no-margin row justify-content-start mt-5">
                <label class="col-3 text-center d-block giftcard" for="upload">
                    <span class="material-icons">
                        add
                    </span>
                </label>
            </div>
            <input type="file" class="file-input" id="upload" placeholder="png, jpg or jpeg">
            <button class="payment text-center">Proceed</button>
        </div>
    </div>
    <script src="js/sell_crypto.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</body>

</html>