import { Ajax } from "./ajax.js";
var registerForm = document.getElementById('registerForm');
var submitBtn = registerForm.querySelector("button");
var phoneInput = registerForm.querySelector("#phonenumber");
var errorDiv = registerForm.querySelector("#errorDiv");
var spinner = "<div class='spinner-border spinner-border-sm' aria-hidden='true' role='status'></div>\n                Please wait... ";
var toggleIcons = registerForm.querySelectorAll("span.toggle-password");
var passwordInputs = registerForm.querySelectorAll('input[type=password]');
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
registerForm.onsubmit = function (event) {
    event.preventDefault();
    if (isNaN(Number(phoneInput.value))) {
        errorDiv.textContent = "Invalid phone number";
        errorDiv.classList.remove("d-none");
        return;
    }
    var aj = new Ajax(event.target);
    aj.setBefore(function () {
        submitBtn.disabled = true;
        submitBtn.innerHTML = spinner;
    });
    aj.setAfter(function (responseText) {
        console.log(responseText);
        if (responseText.toLowerCase().indexOf("success") != -1)
            location.href = "confirm-email.php";
        else {
            errorDiv.innerText = responseText;
            errorDiv.classList.remove("d-none");
            submitBtn.disabled = false;
            submitBtn.innerHTML = "Register";
            errorDiv.focus();
        }
    });
    aj.start();
};
