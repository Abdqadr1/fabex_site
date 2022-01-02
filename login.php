<?php include_once "header.php"; ?>

<body>
    <div class="body no-margin">
        <div class="row justify-content-center mt-5">
            <div class="col-11 col-md-5 col-lg-4 mt-5" id="settings_pass_div">
                <img src="assets/images/FabEx.png" class="mx-auto d-block" alt="Logo">
                <p class="text-center mt-2 fw-bold fs-4">Login to your account</p>
                <p class="text-center mt-2 fw-bold changepass">New to Fabex? <a href="register.php">Register</a></p>
                <form action="php/login.php" method="POST" id="loginForm">
                    <div class="row justify-content-center">
                        <div tabindex="-1" class="alert alert-danger col-10 d-none text-center" id="errorDiv" role="alert"></div>
                        <div class="col-10 mt-1 my-3">
                            <label for="email" class="form-label settings">Email</label>
                            <input name="email" type="text" class="form-control rad8" id="email" placeholder="Enter Email address" required>
                        </div>
                        <div class="col-10 mt-1 my-3 position-relative">
                            <label for="password" class="form-label settings">Password</label>
                            <input name="password" type="password" class="form-control rad8" id="password" placeholder="Enter password" required>
                            <span class="material-icons toggle-password">visibility</span>
                            <p class="forgotpass"><a href="reset">Forgot password?</a></p>
                        </div>
                    </div>

                    <div class="row justify-content-center">
                        <button type="submit" class="col-10 settings text-center mx-auto">Login</button>
                    </div>
                </form>

            </div>
        </div>
    </div>
    <script src="js/login.js" type="module"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</body>

</html>