import { Ajax } from "./ajax.js";
var registerForm = document.getElementById('registerForm');
var submitBtn = registerForm.querySelector("button");
var errorDiv = registerForm.querySelector("#errorDiv");
var spinner = "<div class='spinner-border spinner-border-sm' aria-hidden='true' role='status'></div>\n                Please wait... ";
registerForm.onsubmit = function (event) {
    submitBtn.disabled = true;
    event.preventDefault();
    var aj = new Ajax(event.target);
    console.log(event.target);
    aj.setBefore(function () {
        submitBtn.innerHTML = spinner;
    });
    aj.setAfter(function (responseText) {
        console.log(responseText);
        if (responseText.toLowerCase().indexOf("success") != -1)
            location.href = "confirm-email.php";
        else {
            errorDiv.innerText = responseText;
            errorDiv.classList.remove("d-none");
            errorDiv.classList.add("d-block");
            submitBtn.disabled = false;
            submitBtn.innerHTML = "Register";
            errorDiv.focus();
        }
    });
    aj.start();
};
