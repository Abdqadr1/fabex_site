<?php
session_start();
if (!isset($_SESSION["id"]) || empty($_SESSION["id"])) {
    echo ("Invalid parameters..");
    header("location: login");
}

include_once "header.php"; ?>

<body>
    <div class="body no-margin">
        <div class="row justify-content-center mt-4">
            <div class="col-10 col-md-5 col-lg-5" id="settings_pass_div">
                <img src="assets/images/FabEx.png" class="mx-auto d-block" alt="Logo">
                <p class="text-center mt-2 fw-bold fs-4">Create new password</p>
                <p class="text-center mt-2 info">Create a new password for your account</p>
                <form action="php/new_password.php" method="POST" id="newPassword">
                    <div tabindex="-1" class="alert alert-danger col-10 mx-auto d-none text-center" id="errorDiv" role="alert"></div>
                    <div class="row justify-content-center" id="change_row">
                        <div class="col-10 mt-1 my-3  position-relative">
                            <label for="password" class="form-label settings">New password</label>
                            <input name="password" type="password" class="form-control rad8" id="password" placeholder="At least 8 characters">
                            <span class="material-icons toggle-password">visibility</span>
                        </div>
                        <div class="col-10 mt-1 my-3  position-relative">
                            <label for="con-password" class="form-label settings">Confirm password</label>
                            <input name="con_password" type="password" class="form-control rad8" id="con-password" placeholder="At least 8 characters">
                            <span class="material-icons toggle-password">visibility</span>
                        </div>
                    </div>

                    <div class="row justify-content-center">
                        <button type="submit" class="col-10 settings text-center mx-auto">Create password</button>
                    </div>
                </form>

            </div>
        </div>
    </div>
    <script src="js/new_password.js" type="module"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</body>

</html>