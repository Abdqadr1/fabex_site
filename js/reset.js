import { Ajax } from "./ajax.js";
var resetForm = document.querySelector("#resetForm");
var btn = resetForm.querySelector("button");
var errorDiv = resetForm.querySelector("#errorDiv");
var spinner = "<div class='spinner-border spinner-border-sm' aria-hidden='true' role='status'></div>\n                Please wait... ";
var infoTag = resetForm.querySelector("p.info");
resetForm.onsubmit = function (e) {
    e.preventDefault();
    btn.disabled = true;
    var aj = new Ajax(resetForm);
    aj.setBefore(function () {
        btn.innerHTML = spinner;
    });
    aj.setAfter(function (responseText) {
        console.log(responseText);
        if (responseText.toLowerCase().indexOf("success") != -1) {
            infoTag.classList.remove("d-none");
            infoTag.classList.add("d-block");
            btn.disabled = false;
            btn.innerHTML = "Proceed";
            errorDiv.classList.remove("d-block");
            errorDiv.classList.add("d-none");
            var input = resetForm.querySelector("input");
            input.value = "";
        }
        else {
            errorDiv.innerText = responseText;
            errorDiv.classList.remove("d-none");
            errorDiv.classList.add("d-block");
            btn.disabled = false;
            btn.innerHTML = "Proceed";
            errorDiv.focus();
        }
    });
    aj.start();
};
