<?php

session_start();
if (
    !isset($_SESSION["username"]) || !isset($_SESSION["admin_id"])
    || empty($_SESSION["username"]) || empty($_SESSION["admin_id"])
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
    <script src="../js/admin_nav.js" type="module"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</body>

</html>