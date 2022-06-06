import { Ajax } from "./ajax.js";
var addBankForm = document.querySelector("form#addBankForm");
var bankModalDiv = document.querySelector("[data-bank-modal]");
var clickHere = document.querySelector("[data-here]");
if (clickHere != null && bankModalDiv != null) {
    clickHere.addEventListener("click", function () {
        var modal = new bootstrap.Modal(bankModalDiv, {});
        modal.show();
    });
    var ninInput_1 = addBankForm.querySelector("[name=nin]");
    var acctInput_1 = addBankForm.querySelector("[name=account_number]");
    var errorDiv_1 = addBankForm.querySelector("#errorDiv");
    var submitBtn_1 = addBankForm.querySelector("button");
    var spinner_1 = "<div class='spinner-border spinner-border-sm' aria-hidden='true' role='status'></div>\n                    Please wait... ";
    var select_1 = document.querySelector("select#bankname");
    addBankForm.onsubmit = function (event) {
        event.preventDefault();
        if (isNaN(Number(ninInput_1.value)) || isNaN(Number(acctInput_1.value))) {
            errorDiv_1.textContent = "Invalid NIN or account number";
            errorDiv_1.classList.remove("d-none");
            return;
        }
        submitBtn_1.disabled = true;
        var aj = new Ajax(event.target);
        aj.setBefore(function () {
            submitBtn_1.innerHTML = spinner_1;
        });
        aj.setError(function (xhttp) {
            var str = JSON.parse(xhttp.response);
            errorDiv_1.textContent = str;
            errorDiv_1.classList.remove("d-none");
            submitBtn_1.disabled = false;
            submitBtn_1.innerHTML = "Add account details";
            errorDiv_1.focus();
        });
        aj.setAfter(function (responseText) {
            location.reload();
        });
        aj.start();
    };
    // get all banks
    (function () {
        Ajax.fetchPage("php/data.php?which=banks", function (data) {
            var bankList = JSON.parse(data);
            bankList.forEach(function (bank) {
                var option = document.createElement("option");
                option.value = bank;
                option.innerText = bank;
                select_1.appendChild(option);
            });
        });
    })();
}
