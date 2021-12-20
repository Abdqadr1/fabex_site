import { Ajax } from "./ajax.js";
var loginForm = document.getElementById("loginForm");
var button = loginForm.querySelector('button');
var errorDiv = loginForm.querySelector("#errorDiv");
var spinner = "<div class='spinner-border spinner-border-sm' aria-hidden='true' role='status'></div>\n                Please wait... ";
var timeout = function () {
    errorDiv.innerText = "Request taking too long, Check your internet connection";
    errorDiv.classList.remove("d-none");
    errorDiv.classList.add("d-block");
    button.disabled = false;
    button.innerHTML = "Login";
    errorDiv.focus();
};
loginForm.onsubmit = function (e) {
    e.preventDefault();
    var aj = new Ajax(loginForm);
    aj.setTimer(timeout, 180000);
    aj.setBefore(function () {
        button.disabled = true;
        button.innerHTML = spinner;
    });
    aj.setError(function (xhttp) {
        console.log(xhttp.status);
    });
    aj.setAfter(function (responseText) {
        console.log(responseText);
        if (responseText.toLowerCase().indexOf("success") != -1)
            location.href = "dashboard";
        else {
            errorDiv.innerText = responseText;
            errorDiv.classList.remove("d-none");
            errorDiv.classList.add("d-block");
            button.disabled = false;
            button.innerHTML = "Login";
            errorDiv.focus();
        }
    });
    aj.start();
};
