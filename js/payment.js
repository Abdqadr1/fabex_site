import { Ajax } from "./ajax.js";
var copy_icon = document.querySelector("span.payment.material-icons");
var backBtn = document.querySelector("span.backBtn");
var paidForm = document.querySelector("form#paidForm");
var paidBtn = paidForm.querySelector("button");
var paidInput = paidForm.querySelector("input#paidInput");
var errorDiv = document.querySelector("#errorDiv");
var pConfirm = document.querySelector("p#confirm");
if (which == "giftcard") {
    pConfirm.classList.remove('d-none');
    pConfirm.classList.add("d-block");
}
var spinner = "<div class='spinner-border spinner-border-sm' aria-hidden='true' role='status'></div>\n                Please wait... ";
var timeout = function () {
    errorDiv.innerText = "Request taking too long, Check your internet connection";
    errorDiv.classList.remove("d-none");
    errorDiv.classList.add("d-block");
    paidBtn.disabled = false;
    paidBtn.innerHTML = "I Have Paid, Proceed";
    errorDiv.focus();
};
paidForm.onsubmit = function (event) {
    event.preventDefault();
    var aj = new Ajax(paidForm);
    aj.setTimer(timeout, 120000);
    aj.setBefore(function () {
        paidBtn.disabled = true;
        paidBtn.innerHTML = spinner;
    });
    aj.setError(function (xhttp) {
        console.log(xhttp.status);
    });
    aj.setAfter(function (responseText) {
        console.log(responseText);
        if (responseText.toLowerCase().indexOf("success") != -1) {
            location.href = "dashboard";
        }
        else {
            errorDiv.innerText = responseText;
            errorDiv.classList.remove("d-none");
            errorDiv.classList.add("d-block");
            paidBtn.disabled = false;
            paidBtn.innerHTML = "I Have Paid, Proceed";
            errorDiv.focus();
        }
    });
    aj.start();
};
backBtn.onclick = function (event) {
    event.stopPropagation();
    history.go(-1);
};
copy_icon.onclick = function (e) {
    e.stopPropagation();
    console.log(e.target);
    var acct = document.querySelector("span.account-number");
    navigator.clipboard.writeText(acct.innerText);
};
