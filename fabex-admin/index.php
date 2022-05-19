<?php

session_start();
if (
    !isset($_SESSION["email"]) || !isset($_SESSION["admin_id"])
    || empty($_SESSION["email"]) || empty($_SESSION["admin_id"])
    || !isset($_SESSION["completed"])

) {
    header("location: login");
}

include "header.php"; ?>

<body>
    <?php include_once "navbar.php" ?>
    <script>
        let version = 0.6;
        let dash_version = 1.0;
        let activePage = "Orders";
        document.title = activePage;
        const url = decodeURI(location.href);
        const page = url.split("/").pop() || "orders";
        // console.log(decodeURI(location.href))
    </script>
    <div id="container" class="px-4 mt-4">
        <div class='d-flex align-items-center justify-content-center' style='height: 100%;'>
            <div class='spinner-border text-primary' role='status' style='height: 60px; width:60px;'>
                <span class='visually-hidden'>Loading...</span>
            </div>
        </div>;
    </div>

    <div class="modal" tabindex="-1" id="password-modal" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header justify-content-center">
                    <h5 class="modal-title">Change default password</h5>
                </div>
                <div class="modal-body p-3 rounded">
                    <form method="post" action="php/change_default_password.php" id="passwordForm">
                        <div class="row justify-content-center justify-content-md-between gap no-margin mt-1 my-3">
                            <div tabindex="-1" class="alert alert-danger d-none text-center mx-3" id="alertDiv" role="alert"></div>

                            <div class="row justify-content-center justify-content-md-between gap no-margin mt-1 my-3">
                                <div class="col-11 col-md-5 mx-auto position-relative">
                                    <label for="password" class="form-label settings">Password</label>
                                    <input minlength="8" name="password" type="password" class="form-control rad8" id="password" placeholder="At least 8 characters" required>
                                </div>
                                <div class="col-11 col-md-5 mx-auto position-relative">
                                    <label for="con-password" class="form-label settings">Confirm password</label>
                                    <input minlength="8" name="con_password" type="password" class="form-control rad8" id="con-password" placeholder="At least 8 characters" required>
                                </div>
                            </div>
                            <div class="row justify-content-center">
                                <button type="submit" class="btn btn-primary col-5 settings text-center mx-auto">Change Password</button>
                            </div>
                    </form>
                </div>
            </div>
        </div>
    </div>


    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    <?php
    if ($_SESSION["completed"] == 0) {
        echo "<script>const isCompleted=false</script>";
    } else {
        echo "<script>const isCompleted=true</script>";
    }
    ?>
    <script src="../js/admin_nav.js" type="module"></script>
</body>

</html>