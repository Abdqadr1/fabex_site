<?php
session_start();

include_once "functions.php";
isTimeout();
isLoggedIn();

$fname = $_SESSION["fname"];
include "header.php"; ?>
<script>
    <?php echo "const fname = '$fname'" ?>
</script>

<body>
    <?php include_once "navbar.php"; ?>
    <script>
        let dash_version = 1.0;
        let version = 0.6;
        let activePage = "Dashboard";
        document.title = activePage;
        const url = location.href;
        const page = url.split("/").pop();
        console.log(page)
    </script>
    <div id="container">
        <div class='d-flex align-items-center justify-content-center' style='height: 100%;'>
            <div class='spinner-border text-primary' role='status' style='height: 60px; width:60px;'>
                <span class='visually-hidden'>Loading...</span>
            </div>
        </div>;
    </div>
    <script src="../js/navigation.js" type="module"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</body>

</html>