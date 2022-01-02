<?php
session_start();
$_SESSION = array();
include_once "header.php"; ?>

<body>
    <div class="body no-margin">
        <div class="row justify-content-center mt-4">
            <div class="col-9 col-md-5 col-lg-5" id="settings_pass_div">
                <img src="assets/images/FabEx.png" class="mx-auto d-block" alt="Logo">
                <p class="text-center my-2 fw-bold fs-4">Your password has been reset
                <div class="row justify-content-center">
                    <button class="col-10 settings text-center mx-auto"><a href="login" class="text-white">Go to login</a></button>
                </div>
            </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</body>

</html>