import { Ajax } from "./ajax.js";
var addBankForm = document.querySelector("form#addBankForm");
var errorDiv = document.querySelector("#errorDiv");
var submitBtn = addBankForm.querySelector("button");
var spinner = "<div class='spinner-border spinner-border-sm' aria-hidden='true' role='status'></div>\n                Please wait... ";
var btnClose = "<button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"alert\" aria-label=\"close\"></button>";
addBankForm.onsubmit = function (event) {
    event.preventDefault();
    submitBtn.disabled = true;
    var aj = new Ajax(event.target);
    aj.setBefore(function () {
        submitBtn.innerHTML = spinner;
    });
    aj.setAfter(function (responseText) {
        console.log(responseText);
        if (responseText.indexOf("success") != -1)
            location.href = "congrats.php";
        else {
            errorDiv.innerHTML = responseText;
            errorDiv.classList.remove("d-none");
            errorDiv.classList.add("d-block");
            submitBtn.disabled = false;
            submitBtn.innerHTML = "Add account details";
            errorDiv.focus();
        }
    });
    aj.start();
};
