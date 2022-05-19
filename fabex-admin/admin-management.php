<!-- header -->
<div id="adminSection" class="mx-0 row justify-content-between">
    <div style="width: 62%;">
        <div class="row justify-content between">
            <h3 class="text-left mb-3 col-8">Admin management</h3>
            <div class="text-left mb-3 col-3">
                <div class="add-crypto mt-2" title="register" id="register_admin">
                    <span class="material-icons add-crypto">add</span>
                    <span>Register New Admin</span>
                </div>
            </div>
        </div>
        <div data-admins>
        </div>
    </div>
    <div style="width: 35%;">
        <h4 class="text-left mb-3 col-8 ps-1">Audit</h4>
        <div data-audit class="py-2 px-3">
        </div>
    </div>
</div>

<template data-no-admin>
    <div class="d-flex align-items-center justify-content-center" style="height:100%">
        <div style="width: fit-content;">
            <span class="d-block text-center text-muted mb-2">No Another Admin yet</span>
            <button class="btn btn-primary py-2" style="border-radius: 8px;">Register New Admin</button>
        </div>
    </div>
</template>
<template data-no-feeds>
    <div class="d-flex align-items-center justify-content-center" style="height:100%">
        <div style="width: fit-content;">
            <span class="d-block text-center text-muted mb-2">No activities yet</span>
        </div>
    </div>
</template>
<template data-admin-item>
    <div class="row justify-content-between align-items-center my-2">
        <div class="col-4 px-2 fw-bold text-capitalize" data-name></div>
        <div class="col-4 px-2 text-center" data-email></div>
        <div class="col-4 px-2">
            <button class="btn btn-primary" data-button></button>
            <span data-delete-button class="material-icons ms-2" title='delete admin'>delete</span>
        </div>
    </div>
</template>
<template data-feed-item>
    <div class="my-2 mx-0">
        <b data-name>Fawas Adegoke</b>
        <span data-action>denied</span>
        <span data-id>#1234567890</span>
    </div>
</template>

<div class="modal" tabindex="-1" id="delete-modal" data-bs-backdrop="static" data-bs-keyboard="false">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-body p-3 rounded">
                <p>
                    <span class="text-danger">Delete</span>
                    <b class="text-capitalize" data-name></b>
                    ?
                </p>
            </div>
            <div class="modal-footer pe-3">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button data-delete type="button" class="btn btn-primary">Delete</button>
            </div>
        </div>
    </div>
</div>

<section class="d-none" id="registerSection">
    <div class="container ps-4 my-4">
        <span class="backBtn material-icons p-2" id="backbtn">
            chevron_left
        </span>
    </div>
    <div class="row justify-content-center mt-4">
        <div class="col-10 col-md-9 col-lg-7" id="settings_pass_div">
            <p class="text-center mt-2 fw-bold fs-4">Register New Admin</p>
            <form method="post" action="php/add_admin.php" id="registerForm">
                <div class="row justify-content-center justify-content-md-between gap no-margin mt-1 my-3">
                    <div tabindex="-1" class="alert alert-danger d-none text-center mx-3" id="alertDiv" role="alert"></div>
                    <div class="col-11 col-md-5 mx-auto">
                        <label for="firstname" class="form-label settings">First name</label>
                        <input minlength="2" maxlength="20" name="fname" type="text" class="form-control rad8" id="firstname" placeholder="Enter first name" required>
                    </div>
                    <div class="col-11 col-md-5 mx-auto">
                        <label for="lastname" class="form-label settings">Last name</label>
                        <input minlength="2" maxlength="20" name="lname" type="text" class="form-control rad8" id="lastname" placeholder="Enter last name" required>
                    </div>
                </div>
                <div class="row justify-content-center justify-content-md-between gap no-margin mt-1 my-3">
                    <div class="col-11 col-md-5 mx-auto">
                        <label for="phonenumber" class="form-label settings">Phone number</label>
                        <input minlength="11" maxlength="15" name="phone" type="text" class="form-control rad8" id="phonenumber" placeholder="Enter phone number" maxlength="11" required>
                    </div>
                    <div class="col-11 col-md-5 mx-auto">
                        <label for="email" class="form-label settings">Email</label>
                        <input minlength="5" maxlength="40" name="email" type="email" class="form-control rad8" id="email" placeholder="Enter Email address" required>
                    </div>
                </div>
                <div class="row justify-content-center justify-content-md-between gap no-margin mt-1 my-3">
                    <div class="col-11 col-md-5 mx-auto position-relative">
                        <label for="password" class="form-label settings">Password</label>
                        <input minlength="8" name="password" type="password" class="form-control rad8" id="password" placeholder="At least 8 characters" required>
                        <span class="material-icons toggle-password">visibility</span>
                    </div>
                    <div class="col-11 col-md-5 mx-auto position-relative">
                        <label for="con-password" class="form-label settings">Confirm password</label>
                        <input minlength="8" name="con_password" type="password" class="form-control rad8" id="con-password" placeholder="At least 8 characters" required>
                        <span class="material-icons toggle-password">visibility</span>
                    </div>
                </div>
                <div class="row justify-content-center">
                    <button type="submit" class="btn btn-primary col-5 settings text-center mx-auto">Register</button>
                </div>
            </form>

        </div>
    </div>
</section>