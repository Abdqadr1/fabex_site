<?php include_once "header.php"; ?>

<body>
    <div class="body no-margin">
        <div class="row justify-content-center mt-4">
            <div class="col col-md-5 col-lg-3" id="settings_pass_div">
                <img src="assets/images/FabEx.png" class="mx-auto d-block" alt="Logo">
                <p class="text-center mt-2 fw-bold fs-4">Login to your account</p>
                <p class="text-center mt-2 fw-bold changepass">New to Fabex? <a href="register.php">Register</a></p>
                <div class="row justify-content-center">
                    <div class="col-10 mt-1 my-3">
                        <label for="email" class="form-label settings">Email</label>
                        <input type="text" class="form-control rad8" id="email" placeholder="Enter Email address">
                    </div>
                    <div class="col-10 mt-1 my-3">
                        <label for="password" class="form-label settings">Password</label>
                        <input type="text" class="form-control rad8" id="password" placeholder="Enter password">
                    </div>
                </div>

                <div class="row justify-content-center">
                    <button class="col-10 settings text-center mx-auto">Go to login</button>
                </div>
            </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</body>

</html>