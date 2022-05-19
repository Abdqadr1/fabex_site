<?php
session_start();
$_SESSION = array();
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="../assets/css/main.min.css" rel="stylesheet">

    <title>Fabex</title>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Overpass&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../assets/css/general_styles.css" />
    <link rel="stylesheet" href="../assets/css/landing_page.css" />
    <link rel="icon" href="../assets/images/FabEx.png">

</head>

<body>
    <div class="body no-margin">
        <div class="row justify-content-center mt-5">
            <div class="col-11 col-md-5 col-lg-4 mt-5" id="settings_pass_div">
                <a href="/"><img src="../assets/images/FabEx.png" class="mx-auto d-block" alt="Logo"></a>
                <p class="text-center mt-2 fw-bold fs-4">Login as an Admin</p>
                <form action="php/login.php" method="POST" id="loginForm">
                    <div class="row justify-content-center">
                        <div tabindex="-1" class="alert alert-danger col-10 d-none text-center" id="errorDiv" role="alert"></div>
                        <div class="col-10 mt-1 my-3">
                            <label for="email" class="form-label settings">Email</label>
                            <input name="email" type="text" class="form-control rad8" id="email" placeholder="Enter email address" required>
                        </div>
                        <div class="col-10 mt-1 my-3 position-relative">
                            <label for="password" class="form-label settings">Password</label>
                            <input name="password" type="password" class="form-control rad8" id="password" placeholder="Enter password" required>
                            <span class="material-icons toggle-password">visibility</span>
                        </div>
                    </div>

                    <div class="row justify-content-center">
                        <button type="submit" class="col-10 settings text-center mx-auto">Login</button>
                    </div>
                </form>

            </div>
        </div>
    </div>
    <script src="../js/admin_login.js" type="module"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</body>

</html>