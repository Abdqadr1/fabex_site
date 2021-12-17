import { Ajax } from "./ajax.js";
var loginForm = document.getElementById("loginForm");
var button = loginForm.querySelector('button');
var errorDiv = loginForm.querySelector("#errorDiv");
var spinner = "<div class='spinner-border spinner-border-sm' aria-hidden='true' role='status'></div>\n                Please wait... ";
var timeout = function (xhttp) {
    errorDiv.innerText = "Request taking too long, Check your internet connection";
    errorDiv.classList.remove("d-none");
    errorDiv.classList.add("d-block");
    button.disabled = false;
    button.innerHTML = "Register";
    errorDiv.focus();
    xhttp.abort();
};
loginForm.onsubmit = function (e) {
    e.preventDefault();
    var aj = new Ajax(loginForm);
    var timing = setTimeout(function () {
        timeout(aj.xhttp);
    }, 180000);
    aj.setBefore(function () {
        button.disabled = true;
        button.innerHTML = spinner;
    });
    aj.setError(function (xhttp) {
        // console.log(xhttp);
    });
    aj.setAfter(function (responseText) {
        clearTimeout(timing);
        console.log(responseText);
        if (responseText.toLowerCase().indexOf("success") != -1)
            location.href = "dashboard";
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
