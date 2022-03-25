<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie-edge">
    <link href="https://fonts.googleapis.com/css2?family=Overpass&display=swap" rel="stylesheet">
    <title>Document</title>
    <style>
        img.socials {
            display: inline-block;
            width: 24px;
            height: 24px;
            margin-right: 20px;
        }

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
    <h3 style="margin-bottom:20px;color:#166d71;font-size:24px;">Confirm your email address</h3>
    <p>Hi <em>{FIRST_NAME}</em>,</p>
    <p>Please click the button below to confirm that your email address to continue with your registration</p>
    <a href="{CONFIRMATION_LINK}" style="text-decoration: none;display:inline-block;padding:8px 10px; background-color: #166d71; 
    color:white; border-radius: 6px;">
        Confirm Now</a>
    <h3 style="margin-bottom:20px;margin-left:20px;color:#166d71;text-align:left">Or</h3>
    <p>copy the link below into browser address bar</p>
    <a href="{CONFIRMATION_LINK}" style="margin: 15px 0px;">{CONFIRMATION_LINK}</a>
    <p style="margin:15px 0px;">Best Regards.</p>

    <div style="margin-top: 4em;">
        <a href="https://web.facebook.com/fabexglobal" target="blank"><img class="socials" src="http://localhost/fabex/assets/images/fb.png" alt="fabex"></a>
        <a href="https://www.instagram.com/fabex_global/" target="blank"><img class="socials" src="http://localhost/fabex/assets/images/instagram.png" alt="fabex"></a>
        <a href="mailto:fabexglobal@gmail.com"><img class="socials" src="http://localhost/fabex/assets/images/mail.png" alt="fabex"></a>
    </div>
    <p class="address">Suite C2 & C3, Lenu Plaza Sani Abacha,<br /> GRA phase 3, Port Harcourt</p>
</body>

</html>