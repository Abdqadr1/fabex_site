<?php
session_start();
include_once "header.php"; ?>

<body>
    <div class="body no-margin">
        <div class="row justify-content-center mt-4">
            <div class="col-9 col-md-5 col-lg-5" id="settings_pass_div">
                <img src="assets/images/FabEx.png" class="mx-auto d-block" alt="Logo">
                <p class="text-center mt-2 fw-bold fs-4">Reset password</p>
                <p class="text-center fs-6 mb-3">Enter the email address linked to your account.
                    We will email you instructions to reset your password </p>
                <form action="php/reset.php" method="POST" id="resetForm">
                    <div tabindex="-1" class="alert alert-danger col-10 mx-auto d-none text-center" id="errorDiv" role="alert"></div>
                    <div class="mt-4">
                        <input name="email" type="text" class="form-control rad8" id="email" placeholder="Enter Email address" required>
                        <p class="info mt-2 d-none">Email sent! Check your email and follow the instructions</p>
                    </div>
                    <div class="row justify-content-center no-margin">
                        <button type="submit" class="col-12 settings text-center mx-auto">Proceed</button>
                    </div>
                </form>

            </div>
        </div>
    </div>
    <script src="js/reset.js" type="module"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</body>

</html>