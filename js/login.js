import { Ajax } from "./ajax.js";
var loginForm = document.getElementById("loginForm");
var button = loginForm.querySelector('button');
var errorDiv = loginForm.querySelector("#errorDiv");
var spinner = "<div class='spinner-border spinner-border-sm' aria-hidden='true' role='status'></div>\n                Please wait... ";
loginForm.onsubmit = function (e) {
    e.preventDefault();
    button.disabled = true;
    var aj = new Ajax(loginForm);
    aj.setBefore(function () {
        button.innerHTML = spinner;
    });
    aj.setAfter(function (responseText) {
        console.log(responseText);
        if (responseText.toLowerCase().indexOf("success") != -1)
            location.href = "profile.php";
        else {
            errorDiv.innerText = responseText;
            errorDiv.classList.remove("d-none");
            errorDiv.classList.add("d-block");
            button.disabled = false;
            button.innerHTML = "Register";
            errorDiv.focus();
        }
    });
    aj.start();
};
