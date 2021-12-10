<?php include "header.php" ?>

<body>
    <div class="body no-margin">
        <div class="row justify-content-center mt-4">
            <div class="col col-md-8 col-lg-6" id="settings_pass_div">
                <img src="assets/images/FabEx.png" class="mx-auto d-block" alt="Logo">
                <p class="text-center mt-2 fw-bold fs-4">Create your account</p>
                <p class="text-center mt-2 fw-bold changepass">Already a user? <a href="login.php">Log in</a></p>
                <div class="row justify-content-between gap no-margin">
                    <div class="col mt-1 my-3">
                        <label for="firstname" class="form-label settings">First name</label>
                        <input type="text" class="form-control rad8" id="firstname" placeholder="Enter first name">
                    </div>
                    <div class="col mt-1 my-3">
                        <label for="lastname" class="form-label settings">Last name</label>
                        <input type="text" class="form-control rad8" id="lastname" placeholder="Enter last name">
                    </div>
                </div>
                <div class="row justify-content-between gap no-margin">
                    <div class="col mt-1 my-3">
                        <label for="phonenumber" class="form-label settings">Phone number</label>
                        <input type="text" class="form-control rad8" id="phonenumber" placeholder="Enter phone number">
                    </div>
                    <div class="col mt-1 my-3">
                        <label for="email" class="form-label settings">Email</label>
                        <input type="email" class="form-control rad8" id="email" placeholder="Enter Email address">
                    </div>
                </div>
                <div class="row justify-content-between gap no-margin">
                    <div class="col mt-1 my-3">
                        <label for="password" class="form-label settings">Password</label>
                        <input type="text" class="form-control rad8" id="password" placeholder="At least 8 characters">
                    </div>
                    <div class="col mt-1 my-3">
                        <label for="con-password" class="form-label settings">Confirm password</label>
                        <input type="email" class="form-control rad8" id="con-password" placeholder="At least 8 characters">
                    </div>
                </div>
                <div class="form-check no-margin">
                    <input class="form-check-input mx-0" type="checkbox" id="flexCheckChecked" required>
                    <label class="form-check-label mx-2" for="flexCheckChecked">
                        I agree to the terms, conditions and privacy policy
                    </label>
                </div>
                <div class="row justify-content-center">
                    <button class="col-5 settings text-center mx-auto">Register</button>
                </div>
            </div>
        </div>
    </div>
    <script type="module" src="js/signup.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</body>

</html>