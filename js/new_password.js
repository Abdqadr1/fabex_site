import { Ajax } from "./ajax.js";
var newPassword = document.querySelector("form#newPassword");
var errorDiv = document.querySelector("#errorDiv");
var submitBtn = newPassword.querySelector("button");
var spinner = "<div class='spinner-border spinner-border-sm' aria-hidden='true' role='status'></div>\n                Please wait... ";
var toggleIcons = newPassword.querySelectorAll("span.toggle-password");
var passwordInputs = newPassword.querySelectorAll('input[type=password]');
toggleIcons.forEach(function (icon, index) {
    icon.onclick = function (event) {
        event.stopPropagation();
        var passwordInput = passwordInputs[index];
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            icon.innerText = "visibility_off";
        }
        else {
            passwordInput.type = "password";
            icon.innerText = "visibility";
        }
    };
});
newPassword.onsubmit = function (event) {
    event.preventDefault();
    submitBtn.disabled = true;
    var aj = new Ajax(event.target);
    aj.setBefore(function () {
        submitBtn.innerHTML = spinner;
    });
    aj.setAfter(function (responseText) {
        console.log(responseText);
        if (responseText.indexOf("success") != -1)
            location.href = "reset-success.php";
        else {
            errorDiv.innerHTML = responseText;
            errorDiv.classList.remove("d-none");
            errorDiv.classList.add("d-block");
            submitBtn.disabled = false;
            submitBtn.innerHTML = "Create password";
            errorDiv.focus();
        }
    });
    aj.start();
};
