import { Ajax } from "./ajax.js";
var addBankForm = document.querySelector("form#addBankForm");
var bvnInput = addBankForm.querySelector("[name=bvn]");
var acctInput = addBankForm.querySelector("[name=account_number]");
var errorDiv = document.querySelector("#errorDiv");
var submitBtn = addBankForm.querySelector("button");
var spinner = "<div class='spinner-border spinner-border-sm' aria-hidden='true' role='status'></div>\n                Please wait... ";
var select = document.querySelector("select#bankname");
addBankForm.onsubmit = function (event) {
    event.preventDefault();
    if (isNaN(Number(bvnInput.value)) || isNaN(Number(acctInput.value))) {
        errorDiv.textContent = "Invalid bvn or account number";
        errorDiv.classList.remove("d-none");
        return;
    }
    submitBtn.disabled = true;
    var aj = new Ajax(event.target);
    aj.setBefore(function () {
        submitBtn.innerHTML = spinner;
    });
    aj.setError(function (xhttp) {
        var str = JSON.parse(xhttp.response);
        errorDiv.textContent = str;
        errorDiv.classList.remove("d-none");
        submitBtn.disabled = false;
        submitBtn.innerHTML = "Add account details";
        errorDiv.focus();
    });
    aj.setAfter(function (responseText) {
        location.href = "congrats.php";
    });
    aj.start();
};
// get all banks
(function () {
    Ajax.fetchPage("account/php/data.php?which=banks", function (data) {
        var bankList = JSON.parse(data);
        bankList.forEach(function (bank) {
            var option = document.createElement("option");
            option.value = bank;
            option.innerText = bank;
            select.appendChild(option);
        });
    });
})();
