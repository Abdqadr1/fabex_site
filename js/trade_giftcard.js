import { Ajax } from "./ajax.js";
var actionButtons = document.querySelectorAll("button.trading");
var toggleBank = document.querySelector("input.toggle-switch");
var allBuyField = document.querySelectorAll("div.for-buy");
var allSellField = document.querySelectorAll("div.for-sell");
var bankField = document.querySelectorAll("div.for-sell.bank");
var giftcardButton = document.querySelector("button.payment");
var toggleField = document.querySelector("div#toggle-switch");
var bankDiv = document.querySelector("div#bankDiv");
var allSellInput = document.querySelectorAll(".sell-input");
var spinner = "<div class='spinner-border spinner-border-sm' aria-hidden='true' role='status'></div>\n                Please wait... ";
var changeDisability = function (show) {
    allSellInput.forEach(function (el) {
        var element;
        if (el instanceof HTMLInputElement) {
            element = el;
        }
        else {
            element = el;
        }
        element.disabled = show;
    });
};
var action = "buy";
var tradeGiftcardForm = document.querySelector("form#tradeGiftcardForm");
var submitBtn = tradeGiftcardForm.querySelector("button");
var hiddenInput = tradeGiftcardForm.querySelector("input#hidden");
tradeGiftcardForm.onsubmit = function (event) {
    event.preventDefault();
    hiddenInput.value = action;
    var aj = new Ajax(tradeGiftcardForm);
    aj.setBefore(function () {
        submitBtn.disabled = true;
        submitBtn.innerHTML = spinner;
    });
    aj.setAfter(function (responseText) {
        console.log(responseText);
        submitBtn.innerText = action + " giftcard";
        submitBtn.disabled = false;
    });
    aj.start();
};
toggleBank.onchange = function (event) {
    console.log(allSellInput);
    if (toggleBank.checked) {
        bankField.forEach(function (element) {
            element.classList.remove("d-block");
            element.classList.add("d-none");
        });
        changeDisability(true);
    }
    else {
        bankField.forEach(function (element) {
            element.classList.remove("d-none");
            element.classList.add("d-block");
        });
        changeDisability(false);
    }
};
toggleBank.checked = false;
actionButtons.forEach(function (element) {
    element.onclick = function (e) {
        element.classList.remove("disabled");
        element.classList.add("active");
        if (element.classList.contains("buy")) {
            action = "buy";
            giftcardButton.textContent = "Buy Crypto";
        }
        else {
            action = "sell";
            giftcardButton.textContent = "Sell Crypto";
        }
        var parent = element.parentElement;
        var children = parent.children;
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            if (child === element) {
                // change the ui as needed
                if (action == "buy") {
                    allSellField.forEach(function (element) {
                        element.classList.remove("d-block");
                        element.classList.add("d-none");
                    });
                    bankDiv.classList.remove("d-block");
                    bankDiv.classList.add("d-none");
                }
                else {
                    allBuyField.forEach(function (element) {
                        element.classList.remove("d-block");
                        element.classList.add("d-none");
                    });
                    if (toggleBank.checked) {
                        allSellField.forEach(function (element) {
                            element.classList.remove("d-block");
                            element.classList.add("d-none");
                        });
                        changeDisability(true);
                    }
                    else {
                        allSellField.forEach(function (element) {
                            element.classList.remove("d-none");
                            element.classList.add("d-block");
                        });
                        changeDisability(false);
                    }
                    bankDiv.classList.remove("d-none");
                    bankDiv.classList.add("d-block");
                }
            }
            else {
                child.classList.remove("active");
                // child.classList.add("disabled");
                //change ui 
            }
        }
    };
});
