<?php include_once "header.php"; ?>

<body>
    <div class="container pl-5 my-4">
        <span class="backBtn material-icons d-none" id="backbtn">
            chevron_left
        </span>
    </div>
    <div class="body no-margin">
        <div class="row justify-content-center mt-4">
            <div class="col-10 col-md-8" id="settings_pass_div">
                <p class="text-left mt-2 fw-bold mx-3 mx-md-4 fs-5">Personal Information</p>
                <div class="row justify-content-between gap no-margin mt-1 my-3">
                    <div class="col-11 col-md-5 mx-auto">
                        <label for="firstname" class="form-label settings">First name</label>
                        <input type="text" class="form-control rad8" id="firstname" placeholder="Joseph">
                    </div>
                    <div class="col-11 col-md-5 mx-auto">
                        <label for="lastname" class="form-label settings">Last name</label>
                        <input type="text" class="form-control rad8" id="lastname" placeholder="Adeleye">
                    </div>
                </div>
                <div class="row justify-content-between gap no-margin mt-1 my-3">
                    <div class="col-11 col-md-5 mx-auto">
                        <label for="phonenumber" class="form-label settings">Phone number</label>
                        <input type="text" class="form-control rad8" id="phonenumber" placeholder="08172847341">
                    </div>
                    <div class="col-11 col-md-5 mx-auto">
                        <label for="email" class="form-label settings">Email</label>
                        <input type="email" class="form-control rad8" id="email" placeholder="josephy123@gmail.com">
                    </div>
                </div>
                <p class="fw-bold mt-3 mx-3 mx-md-4 fs-5">Bank Information</p>
                <div class="row justify-content-between gap no-margin mt-1 my-3">
                    <div class="col-11 col-md-5 mx-auto">
                        <label for="bankname" class="form-label settings">Bank name</label>
                        <select class="form-select rad8" id="bankname">
                            <option selected>Kuda MFB</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>
                    <div class="col-11 col-md-5 mx-auto">
                        <label for="accountnumber" class="form-label settings">Account number</label>
                        <input type="text" class="form-control rad8 mb-2" id="accountnumber" placeholder="2222225555">
                        <span>Adeleye Joseph</span>
                    </div>
                </div>
                <div class="row justify-content-between gap no-margin mt-1 my-3">
                    <div class="col-11 col-md-5 mx-auto">
                        <label for="bvn" class="form-label settings">Bank verification number</label>
                        <input type="text" class="form-control rad8" id="bvn" placeholder="2222225555">
                    </div>
                    <div class="col-11 col-md-5 mx-auto">
                    </div>
                </div>
                <div class="row justify-content-center">
                    <p class="col-10 changepass mx-auto"><a href="" id="change_pass_a">Change Password</a></p>
                    <button class="col-10 settings text-center mx-auto">Save Changes</button>
                </div>
            </div>
            <div class="col-10 col-md-6 d-none" id="change_pass_div">
                <p class="text-center mt-2 fw-bold fs-3">Change Password</p>
                <div class="row justify-content-center">
                    <div class="col-10 mt-1 my-3">
                        <label for="currentpass" class="form-label settings">Current password</label>
                        <input type="password" class="form-control rad8" id="currentpass" placeholder="">
                    </div>
                    <div class="col-10 mt-1 my-3">
                        <label for="newpass" class="form-label settings">New password</label>
                        <input type="password" class="form-control rad8" id="newpass" placeholder="At least 8 characters">
                    </div>
                    <div class="col-10 mt-1 my-3">
                        <label for="conpass" class="form-label settings">Confirm password</label>
                        <input type="password" class="form-control rad8" id="conpass" placeholder="At least 8 characters">
                    </div>

                    <div class="row justify-content-center">
                        <button class="col-10 changepass text-center mx-auto">Change password</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="js/settings.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</body>

</html>