<div class="container pl-5 my-4">
    <span class="backBtn material-icons d-none" id="backbtn">
        chevron_left
    </span>
</div>
<div class="body no-margin">
    <div class="row justify-content-center mt-4 no-margin">
        <div class="col-4 mx-auto my-5 text-center d-block" id="loadingContainer">
            <div class='spinner-border spinner-border-sm text-primary' aria-hidden='true' role='status' style='width:4em;height:4em;'></div>
        </div>
        <div class="col-10 col-md-8 d-none" id="settings_pass_div">
            <form action="php/settings.php" method="POST" id="changeInfoForm">
                <p class="text-left mt-2 fw-bold mx-3 mx-md-4 fs-5">Personal Information</p>
                <div class="row justify-content-between gap no-margin mt-1 my-3">
                    <div tabindex="-1" class="alert alert-success col-10 d-none text-center mx-auto" id="successDiv" role="alert"></div>
                    <div tabindex="-1" class="alert alert-danger col-10 d-none text-center mx-auto" id="errorDiv" role="alert"></div>
                    <div class="col-11 col-md-5 mx-auto">
                        <label for="firstname" class="form-label settings">First name</label>
                        <input name="fname" type="text" class="form-control rad8" id="firstname" placeholder="Joseph" required>
                    </div>
                    <div class="col-11 col-md-5 mx-auto">
                        <label for="lastname" class="form-label settings">Last name</label>
                        <input name="lname" type="text" class="form-control rad8" id="lastname" placeholder="Adeleye" required>
                    </div>
                </div>
                <div class="row justify-content-between gap no-margin mt-1 my-3">
                    <div class="col-11 col-md-5 mx-auto">
                        <label for="phonenumber" class="form-label settings">Phone number</label>
                        <input name="phone" type="text" class="form-control rad8" id="phonenumber" placeholder="08172847341" required>
                    </div>
                    <div class="col-11 col-md-5 mx-auto">
                        <label for="email" class="form-label settings">Email</label>
                        <input name="email" type="email" class="form-control rad8" id="email" placeholder="josephy123@gmail.com" required disabled>
                    </div>
                </div>
                <p class="fw-bold mt-3 mx-3 mx-md-4 fs-5">Bank Information</p>
                <div class="row justify-content-between gap no-margin mt-1 my-3">
                    <div class="col-11 col-md-5 mx-auto">
                        <label for="bankname" class="form-label settings">Bank name</label>
                        <select name="bank_name" class="form-select rad8" id="bankname" required>
                        </select>
                    </div>
                    <div class="col-11 col-md-5 mx-auto">
                        <label for="accountnumber" class="form-label settings">Account number</label>
                        <input name="account_number" type="text" class="form-control rad8 mb-2" id="accountnumber" placeholder="2222225555" required>
                        <span class="text-caps" id="account_name">Adeleye Joseph</span>
                    </div>
                </div>
                <div class="row justify-content-between gap no-margin mt-1 my-3">
                    <div class="col-11 col-md-5 mx-auto">
                        <label for="bvn" class="form-label settings">Bank verification number</label>
                        <input name="bvn" type="text" class="form-control rad8" id="bvn" placeholder="2222225555" required>
                    </div>
                    <div class="col-11 col-md-5 mx-auto">
                    </div>
                </div>
                <div class="row justify-content-center">
                    <p class="col-10 changepass mx-auto text-primary"><a id="change_pass_a">Change Password</a></p>
                    <button class="col-10 settings text-center mx-auto">Save Changes</button>
                </div>
            </form>

        </div>
        <div class="col-10 col-md-6 d-none" id="change_pass_div">
            <form action="php/change_current_password.php" method="POST" id="changePassForm">
                <p class="text-center mt-2 fw-bold fs-3">Change Password</p>
                <div class="row justify-content-center">
                    <div tabindex="-1" class="alert alert-success col-10 d-none text-center" id="successDiv" role="alert"></div>
                    <div tabindex="-1" class="alert alert-danger col-10 d-none text-center" id="errorDiv" role="alert"></div>
                    <div class="col-10 mt-1 my-3">
                        <label for="currentpass" class="form-label settings">Current password</label>
                        <input name="current_password" type="password" class="form-control rad8" id="currentpass" placeholder="" required>
                    </div>
                    <div class="col-10 mt-1 my-3">
                        <label for="newpass" class="form-label settings">New password</label>
                        <input name="new_password" type="password" class="form-control rad8" id="newpass" placeholder="At least 8 characters" required>
                    </div>
                    <div class="col-10 mt-1 my-3">
                        <label for="conpass" class="form-label settings">Confirm password</label>
                        <input name="con_password" type="password" class="form-control rad8" id="conpass" placeholder="At least 8 characters" required>
                    </div>

                    <div class="row justify-content-center">
                        <button class="col-10 changepass text-center mx-auto">Change password</button>
                    </div>
                </div>
            </form>

        </div>
    </div>
</div>