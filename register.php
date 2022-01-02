<?php include "header.php" ?>

<body>
    <div class="body no-margin">
        <div class="row justify-content-center mt-4">
            <div class="col-10 col-md-9 col-lg-7" id="settings_pass_div">
                <img src="assets/images/FabEx.png" class="mx-auto d-block logo" alt="Logo">
                <p class="text-center mt-2 fw-bold fs-4">Create your account</p>
                <p class="text-center mt-2 fw-bold changepass">Already a user? <a href="login.php">Log in</a></p>
                <form method="post" action="php/register.php" id="registerForm">
                    <div class="row justify-content-center justify-content-md-between gap no-margin mt-1 my-3">
                        <div tabindex="-1" class="alert alert-danger d-none text-center mx-3" id="errorDiv" role="alert"></div>
                        <div class="col-11 col-md-5 mx-auto">
                            <label for="firstname" class="form-label settings">First name</label>
                            <input name="fname" type="text" class="form-control rad8" id="firstname" placeholder="Enter first name" required>
                        </div>
                        <div class="col-11 col-md-5 mx-auto">
                            <label for="lastname" class="form-label settings">Last name</label>
                            <input name="lname" type="text" class="form-control rad8" id="lastname" placeholder="Enter last name" required>
                        </div>
                    </div>
                    <div class="row justify-content-center justify-content-md-between gap no-margin mt-1 my-3">
                        <div class="col-11 col-md-5 mx-auto">
                            <label for="phonenumber" class="form-label settings">Phone number</label>
                            <input name="phone" type="text" class="form-control rad8" id="phonenumber" placeholder="Enter phone number" maxlength="11" required>
                        </div>
                        <div class="col-11 col-md-5 mx-auto">
                            <label for="email" class="form-label settings">Email</label>
                            <input name="email" type="email" class="form-control rad8" id="email" placeholder="Enter Email address" required>
                        </div>
                    </div>
                    <div class="row justify-content-center justify-content-md-between gap no-margin mt-1 my-3">
                        <div class="col-11 col-md-5 mx-auto position-relative">
                            <label for="password" class="form-label settings">Password</label>
                            <input name="password" type="password" class="form-control rad8" id="password" placeholder="At least 8 characters" required>
                            <span class="material-icons toggle-password">visibility</span>
                        </div>
                        <div class="col-11 col-md-5 mx-auto position-relative">
                            <label for="con-password" class="form-label settings">Confirm password</label>
                            <input name="con_password" type="password" class="form-control rad8" id="con-password" placeholder="At least 8 characters" required>
                            <span class="material-icons toggle-password">visibility</span>
                        </div>
                    </div>
                    <div class="form-check no-margin px-md-3">
                        <input name="agree" class="form-check-input mx-3" type="checkbox" id="flexCheckChecked" required>
                        <label class="form-check-label" for="flexCheckChecked" style="max-width: 80%;">
                            I agree to the terms, conditions and privacy policy
                        </label>
                    </div>
                    <div class="row justify-content-center">
                        <button type="submit" class="btn btn-primary col-5 settings text-center mx-auto">Register</button>
                    </div>
                </form>

            </div>
        </div>
    </div>
    <script type="module" src="js/register.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</body>

</html>