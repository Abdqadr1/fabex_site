<?php
session_start();
$fname = $_SESSION["fname"];
if (!isset($_SESSION["id"]) || !isset($_SESSION["fname"]) || empty($_SESSION["id"]) || empty($_SESSION["fname"])) {
    header("location: login");
    exit();
}
include "header.php"; ?>
<script>
    <?php echo "const fname = '$fname'" ?>
</script>

<body>
    <?php include_once "navbar.php" ?>
    <div id="container">
        <?php include_once "dashboard.php"; ?>
    </div>
    <script src="js/navigation.js" type="module"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</body>

</html>