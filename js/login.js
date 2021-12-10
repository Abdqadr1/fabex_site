import { Ajax } from "./ajax.js";
var loginForm = document.getElementById("login-form");
var button = loginForm.querySelector('button');
loginForm.onsubmit = function (e) {
    e.preventDefault();
    button.disabled = true;
    button.innerText = "Logging in...";
    var aj = new Ajax(loginForm);
    aj.setAfter(function (responseText) {
        console.log(responseText);
        if (responseText.indexOf("success") != -1)
            location.href = "dashboard.php";
    });
    aj.start();
};
