import { Ajax } from "./ajax.js";
var loginForm = document.getElementById("loginForm");
var button = loginForm.querySelector('button');
var errorDiv = loginForm.querySelector("#errorDiv");
var spinner = "<div class='spinner-border spinner-border-sm' aria-hidden='true' role='status'></div>\n                Please wait... ";
var toggleIcon = loginForm.querySelector("span.toggle-password");
var passwordInput = loginForm.querySelector('input[type=password]');
toggleIcon.onclick = function (event) {
    event.stopPropagation();
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleIcon.innerText = "visibility_off";
    }
    else {
        passwordInput.type = "password";
        toggleIcon.innerText = "visibility";
    }
};
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
        if (xhttp.status === 403)
            location.href = "../errors/403.html";
    });
    aj.setAfter(function (responseText) {
        if (responseText.toLowerCase().indexOf("success") != -1)
            location.href = "orders";
    });
    aj.setFinally(function (xhttp) {
        if (xhttp.status === 200) {
            errorDiv.classList.replace("alert-danger", "alert-success");
            errorDiv.innerText = "Logging...";
        }
        else {
            errorDiv.classList.replace("alert-success", "alert-danger");
            errorDiv.innerText = xhttp.responseText;
            button.disabled = false;
        }
        errorDiv.classList.remove("d-none");
        errorDiv.classList.add("d-block");
        button.innerHTML = "Login";
        errorDiv.focus();
    });
    aj.start();
};
