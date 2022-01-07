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
var bankList = [];
var isChanged = false;
// click handler for back button
var backBtn = document.querySelector("span.backBtn");
backBtn.onclick = function (event) {
    event.stopPropagation();
    history.go(-1);
};
var changeDisability = function (nodes, show) {
    nodes.forEach(function (el) {
        var element;
        if (el instanceof HTMLInputElement) {
            element = el;
        }
        else if (el instanceof HTMLSelectElement) {
            element = el;
            if (el.id == "bankName" && isChanged === false && bankList.length > 0) {
                bankList.forEach(function (bank) {
                    if (banks.disabled == true)
                        banks.disabled = false;
                    var option = document.createElement("option");
                    option.value = bank;
                    option.innerText = bank;
                    banks.appendChild(option);
                });
                isChanged = true;
            }
        }
        else {
            element = el;
        }
        element.disabled = show;
    });
};
// number formatter
var numberFormatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 1,
    maximumFractionDigits: 2
});
var action = "buy";
var tradeGiftcardForm = document.querySelector("form#tradeGiftcardForm");
var submitBtn = tradeGiftcardForm.querySelector("button");
var hiddenInput = tradeGiftcardForm.querySelector("input#hidden");
var priceInput = tradeGiftcardForm.querySelector("input#priceInput");
var totalInput = tradeGiftcardForm.querySelector("input#totalInput");
var amountInput = tradeGiftcardForm.querySelector("input#amount");
var errorDiv = tradeGiftcardForm.querySelector("#errorDiv");
var categories = tradeGiftcardForm.querySelector("select#category");
var subCategories = tradeGiftcardForm.querySelector("select#subCategory");
var amountParagraph = tradeGiftcardForm.querySelector("p#amount");
amountInput.onkeyup = function (event) { return changeAmount(); };
var changeAmount = function () {
    var price = Number(priceInput.value);
    var amount = amountInput.valueAsNumber;
    // console.log(price, amount);
    if (price && amount && amount > 0 && price > 0) {
        var tot = Number(price * amount);
        totalInput.value = "" + tot.toFixed(2);
        amountParagraph.innerText = "Total: " + numberFormatter.format(tot);
    }
    else {
        totalInput.value = "";
        amountParagraph.innerText = "Total: N0";
    }
};
var timeoutFun = function () {
    errorDiv.innerText = "Request taking too long, Check your internet connection";
    errorDiv.classList.remove("d-none");
    errorDiv.classList.add("d-block");
    submitBtn.disabled = false;
    submitBtn.innerHTML = action + " giftcard";
    changeDisability(actionButtons, false);
    errorDiv.focus();
};
tradeGiftcardForm.onsubmit = function (event) {
    event.preventDefault();
    hiddenInput.value = action;
    var act = action;
    // console.log("submitting...")
    var aj = new Ajax(tradeGiftcardForm);
    aj.setTimer(timeoutFun, 120000);
    aj.setBefore(function () {
        submitBtn.disabled = true;
        submitBtn.innerHTML = spinner;
        changeDisability(actionButtons, true);
    });
    aj.setAfter(function (responseText) {
        // console.log(responseText);
        if (responseText.toLowerCase().indexOf("success") != -1) {
            if (act === "buy") {
                location.href = "payment";
            }
            else {
                location.href = "sell_giftcard";
            }
        }
        else {
            errorDiv.innerText = responseText;
            errorDiv.classList.remove("d-none");
            errorDiv.focus();
        }
        changeDisability(actionButtons, false);
        submitBtn.innerText = action + " giftcard";
        submitBtn.disabled = false;
    });
    aj.start();
};
toggleBank.onchange = function (event) {
    if (toggleBank.checked) {
        bankField.forEach(function (element) {
            element.classList.remove("d-block");
            element.classList.add("d-none");
        });
        changeDisability(allSellInput, true);
    }
    else {
        bankField.forEach(function (element) {
            element.classList.remove("d-none");
            element.classList.add("d-block");
        });
        changeDisability(allSellInput, false);
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
                        changeDisability(allSellInput, true);
                    }
                    else {
                        allSellField.forEach(function (element) {
                            element.classList.remove("d-none");
                            element.classList.add("d-block");
                        });
                        changeDisability(allSellInput, false);
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
var banks = tradeGiftcardForm.querySelector("select#bankName");
// get all banks
(function () {
    Ajax.fetchPage("php/data.php?which=banks", function (data) {
        bankList = JSON.parse(data);
    });
})();
var cats = [];
var subCats = [];
var changeSub = function (id) {
    var sub = subCats.filter(function (each) { return each.parent == id; });
    // console.log(id, sub);
    if (sub.length > 0) {
        subCategories.innerHTML = "<option value=\"\" selected hidden>Select sub...</option>";
        sub.forEach(function (giftcard) {
            var option = document.createElement("option");
            option.innerText = giftcard.name;
            option.value = giftcard.name;
            option.onclick = function (event) {
                priceInput.value = giftcard.price;
                changeAmount();
            };
            subCategories.appendChild(option);
        });
    }
    else {
        subCategories.innerHTML = "<option value=\"\" selected hidden>No sub category found</option>";
    }
};
// get giftcards
(function () {
    Ajax.fetchPage("php/data.php?which=giftcards", (function (data) {
        var result = JSON.parse(data);
        var el = result[0];
        if (typeof el === "string") {
            var option = document.createElement("option");
            option.innerText = el;
            option.value = "";
            option.disabled = true;
            categories.appendChild(option);
        }
        if (typeof el === "object") {
            cats = result.filter(function (each) { return each.type === "category"; });
            subCats = result.filter(function (each) { return each.type === "sub_category" && each.price > 0; });
            cats.forEach(function (category) {
                var option = document.createElement("option");
                option.id = category.id;
                option.value = category.name;
                option.innerText = category.name;
                option.onclick = function (event) {
                    categories.setAttribute("aria-id", option.id);
                    changeSub(category.id);
                };
                categories.appendChild(option);
            });
        }
    }));
})();
