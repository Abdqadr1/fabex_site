<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie-edge">
    <link href="https://fonts.googleapis.com/css2?family=Overpass&display=swap" rel="stylesheet">
    <title>Document</title>
    <style>
        img.fabex {
            display: inline-block;
            width: 120px;
            height: 20px;
        }

        p.address {
            font-family: "Overpass";
            font-style: normal;
            font-weight: 400;
            font-size: 13px;
            line-height: 30px;
            color: #131313;
            margin-top: 12px;
        }
    </style>
</head>

<body style="padding: 8px 12px; font-family: Overpass, sans-serif;">
    <!-- TODO: correct the image url-->
    <img src="http://localhost/fabex/assets/images/FabEx.png" alt="Fabex Logo" style="margin: 10px auto; width: auto;">
    <h3 style="margin-bottom:20px;color:#166d71;">Reset your password</h3>
    <p>Hi <em>{FIRST_NAME}</em>,</p>
    <p>You requested to change your password <br> Click the link below to do so</p>
    <a href="{CONFIRMATION_LINK}" style="display: inline-block;">Change password</a>
    <p style="margin:15px 0px;">Best Regards,</p>
    <img class="fabex" src="http://localhost/fabex/assets/images/FabEx3.png" alt="fabex logo">

    <p class="address">Suite C2 & C3, Lenu Plaza Sani Abacha,<br /> GRA phase 3, Port Harcourt</p>
    <!-- TODO: confirm the site url-->
    <a href="https://www.fabex.com" style="display: block;margin-top:10px;">https://www.fabex.com</a>
</body>

</html>