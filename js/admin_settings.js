import { Ajax } from "./ajax.js";
var cryptoDiv = document.querySelector("div#crypto_div");
var add_crypto = document.querySelector("div#add_crypto");
var addCryptoForm = document.querySelector("form#add_crypto_form");
var addCryptoSubmitBtn = addCryptoForm.querySelector("button");
var cryptoErrorDiv = addCryptoForm.querySelector("div#errorDiv");
var spinner = "<div class='spinner-border spinner-border-sm' aria-hidden='true' role='status'></div>\n                Please wait... ";
var all_cryptos = document.querySelectorAll("div.each-crypto input");
all_cryptos.forEach(function (input) {
    input.onchange = function (event) {
        console.log(input);
    };
});
add_crypto.onclick = function (event) {
    addCryptoForm.classList.remove("d-none");
    addCryptoForm.classList.add("d-block");
    add_crypto.classList.add("d-none");
};
var addCrypto = function (content, isOpen) {
    if (isOpen === void 0) { isOpen = true; }
    var div = document.createElement("div");
    var nameSpan = document.createElement("span");
    var checkSpan = document.createElement("span");
    var switchInput = document.createElement("input");
    var dotSpan = document.createElement("span");
    dotSpan.className = "material-icons text-primary three-dots";
    dotSpan.textContent = "more_vert";
    switchInput.type = "checkbox";
    switchInput.setAttribute("role", "switch");
    switchInput.className = "form-check-input";
    switchInput.checked = isOpen;
    checkSpan.className = "form-switch mx-3";
    checkSpan.appendChild(switchInput);
    nameSpan.className = "d-inline-block crypto-name";
    nameSpan.textContent = content[0] + " (" + content[1] + ")";
    div.classList.add("each-crypto");
    div.appendChild(nameSpan);
    div.appendChild(checkSpan);
    div.appendChild(dotSpan);
    cryptoDiv.appendChild(div);
};
addCryptoForm.onsubmit = function (event) {
    event.preventDefault();
    console.log("submitting...");
    var aj = new Ajax(addCryptoForm);
    aj.setBefore(function () {
        addCryptoSubmitBtn.disabled = true;
        addCryptoSubmitBtn.innerHTML = spinner;
    });
    aj.setAfter(function (responseText) {
        var arr = JSON.parse(responseText);
        console.log(arr);
        var message = arr[0];
        if (message.toLowerCase().indexOf("success") != -1) {
            addCrypto(arr[1]);
            cryptoErrorDiv.classList.remove("d-block");
            cryptoErrorDiv.classList.add("d-none");
            addCryptoForm.classList.remove("d-block");
            addCryptoForm.classList.add("d-none");
            add_crypto.classList.remove("d-none");
            add_crypto.classList.add("d-block");
        }
        else {
            cryptoErrorDiv.classList.remove("d-none");
            cryptoErrorDiv.classList.add("d-block");
            cryptoErrorDiv.textContent = responseText;
        }
        addCryptoSubmitBtn.disabled = true;
        addCryptoSubmitBtn.innerHTML = "Add New Crypto";
    });
    aj.start();
};
