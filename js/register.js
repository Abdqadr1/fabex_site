import { Ajax } from "./ajax.js";
var registerForm = document.getElementById('register-form');
var submitBtn = registerForm.querySelector("button");
var messageDiv = registerForm.querySelector(".message");
registerForm.onsubmit = function (event) {
    submitBtn.disabled = true;
    submitBtn.innerText = "Please wait...";
    event.preventDefault();
    var aj = new Ajax(event.target);
    console.log(event.target);
    aj.setAfter(function (responseText) {
        console.log(responseText);
        if (responseText.indexOf("success") != -1)
            location.href = "dashboard.php";
        else
            messageDiv.innerHTML = responseText;
    });
    aj.start();
};
