<?php
session_start();
include_once "header.php"; ?>

<body>
    <div class="body no-margin px-sm-4">
        <div class="row justify-content-center mt-5">
            <div class="col-9 col-md-5 col-lg-3 mt-5" id="settings_pass_div">
                <img src="assets/images/FabEx.png" class="mx-auto d-block" alt="Logo">
                <p class="text-center mt-2 fw-bold fs-4">Confirm your email</p>
                <p class="text-center mt-2 fs-6">An email has been sent to <b><?php echo $_SESSION["email"] ?></b>
                    Check your email and follow the instructions.</a></p>
                <p class="text-center changepass"><a href="#" onclick="history.go(-1)">Change email</a></p>
                <div class="row justify-content-center">
                    <button class="btn col-10 settings text-center mx-auto"><a class="text-white d-block" href="login.php">Go to login</a></button>
                </div>
            </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</body>

</html>