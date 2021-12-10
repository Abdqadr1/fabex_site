import { Ajax } from "./ajax.js";
var signupForm = document.getElementById('signup-form');
var submitBtn = signupForm.querySelector("button");
var messageDiv = signupForm.querySelector(".message");
signupForm.onsubmit = function (event) {
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
