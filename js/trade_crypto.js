import { Ajax } from "./ajax.js";
var buttons = document.querySelectorAll("button.trading");
var toggleSwitch = document.querySelector("input.toggle-switch");
var spinner = "<div class='spinner-border spinner-border-sm' aria-hidden='true' role='status'></div>\n                Please wait... ";
var cryptoButton = document.querySelector("button.payment");
var toggleDiv = document.querySelector("div#toggle-switch");
var backBtn = document.querySelector("span#backBtn");
backBtn.onclick = function (event) {
    event.stopPropagation();
    history.go(-1);
};
// number formatter
var numberFormatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 1,
    maximumFractionDigits: 2
});
var bankList = [];
var isChanged = false;
var action = "buy";
var select = document.querySelector("select#bankName");
var assets = document.querySelector("select#assets");
var sellingFields = document.querySelector("div#sellingFields");
var buyingFields = document.querySelector("div#buyingFields");
var tradeCryptoForm = document.querySelector("form#tradeCryptoForm");
var submitBtn = tradeCryptoForm.querySelector("button");
var productIdInput = tradeCryptoForm.querySelector("input#productId");
var priceInput = tradeCryptoForm.querySelector("input#priceInput");
var totalInput = tradeCryptoForm.querySelector("input#totalInput");
var amountInput = tradeCryptoForm.querySelector("input#amount");
var bankInputs = tradeCryptoForm.querySelectorAll(".bankInput");
var buyInputs = tradeCryptoForm.querySelectorAll(".buyInput");
var errorDiv = tradeCryptoForm.querySelector("div#errorDiv");
var act = tradeCryptoForm.querySelector("input#hidden");
var amountParagraph = tradeCryptoForm.querySelector("p#amount");
amountInput.onkeyup = function (event) { return changeAmount(); };
var changeAmount = function () {
    var price = Number(priceInput.value);
    var amount = amountInput.valueAsNumber;
    console.log(price, amount);
    if (price && amount && amount > 0 && price > 0) {
        var tot = Number(price * amount);
        totalInput.value = "" + tot.toFixed(2);
        amountParagraph.innerText = "Total: " + numberFormatter.format(tot);
    }
    else {
        totalInput.value = "" + (price * amount);
        amountParagraph.innerText = "Total: N0";
    }
};
var changeDisability = function (node, show) {
    node.forEach(function (el) {
        var element;
        if (el instanceof HTMLInputElement) {
            element = el;
        }
        else {
            element = el;
            if (el.id == "bankName" && isChanged === false && bankList.length > 0) {
                bankList.forEach(function (bank) {
                    var option = document.createElement("option");
                    option.value = bank;
                    option.innerText = bank;
                    select.appendChild(option);
                });
            }
        }
        element.disabled = show;
    });
};
var timeoutFun = function () {
    errorDiv.innerText = "Request taking too long, Check your internet connection";
    errorDiv.classList.remove("d-none");
    submitBtn.disabled = false;
    submitBtn.innerHTML = action + " crypto";
    changeDisability(buttons, false);
    errorDiv.focus();
};
tradeCryptoForm.onsubmit = function (event) {
    event.preventDefault();
    console.log("submitting...");
    var aj = new Ajax(tradeCryptoForm);
    aj.setTimer(timeoutFun, 120000);
    aj.setBefore(function () {
        submitBtn.disabled = true;
        submitBtn.innerHTML = spinner;
        changeDisability(buttons, true);
    });
    aj.setAfter(function (responseText) {
        console.log(responseText);
        if (responseText.toLowerCase().indexOf("success") != -1) {
            if (action === "buy") {
                location.href = "payment";
            }
            else {
                location.href = "sell_crypto";
            }
        }
        else {
            errorDiv.innerText = responseText;
            errorDiv.classList.remove("d-none");
            errorDiv.focus();
        }
        submitBtn.disabled = false;
        submitBtn.innerHTML = action + " crypto";
        changeDisability(buttons, false);
    });
    aj.start();
};
toggleSwitch.onchange = function (event) {
    if (toggleSwitch.checked) {
        sellingFields.classList.remove("d-block");
        sellingFields.classList.add("d-none");
        changeDisability(bankInputs, true);
    }
    else {
        sellingFields.classList.remove("d-none");
        sellingFields.classList.add("d-block");
        changeDisability(bankInputs, false);
    }
};
toggleSwitch.checked = false;
buttons.forEach(function (element) {
    element.onclick = function (e) {
        element.classList.remove("disabled");
        element.classList.add("active");
        if (element.classList.contains("buy")) {
            action = "buy";
            act.value = action;
            cryptoButton.textContent = "Buy Crypto";
        }
        else {
            action = "sell";
            act.value = action;
            cryptoButton.textContent = "Sell Crypto";
        }
        var parent = element.parentElement;
        var children = parent.children;
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            if (child === element) {
                // change the ui as needed
                if (action == "buy") {
                    buyingFields.classList.remove("d-none");
                    buyingFields.classList.add("d-block");
                    sellingFields.classList.remove("d-block");
                    sellingFields.classList.add("d-none");
                    toggleDiv.classList.remove("d-block");
                    toggleDiv.classList.add("d-none");
                    changeDisability(buyInputs, false);
                }
                else {
                    toggleDiv.classList.remove("d-none");
                    toggleDiv.classList.add("d-block");
                    changeDisability(buyInputs, true);
                    buyingFields.classList.remove("d-block");
                    buyingFields.classList.add("d-none");
                    if (toggleSwitch.checked) {
                        sellingFields.classList.remove("d-block");
                        sellingFields.classList.add("d-none");
                        changeDisability(bankInputs, true);
                    }
                    else {
                        sellingFields.classList.remove("d-none");
                        sellingFields.classList.add("d-block");
                        changeDisability(bankInputs, false);
                    }
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
// get all banks
(function () {
    Ajax.fetchPage("php/data.php?which=banks", function (data) {
        bankList = JSON.parse(data);
    });
})();
//get all cryptos
(function () {
    Ajax.fetchPage("php/data.php?which=cryptos", function (data) {
        var arr = JSON.parse(data);
        if (arr.length > 0) {
            arr.forEach(function (crypto) {
                var option = document.createElement("option");
                option.innerText = crypto.name;
                option.value = crypto.acronym;
                option.onclick = function (event) {
                    console.log(crypto);
                    priceInput.value = crypto.price;
                    productIdInput.value = crypto.id;
                    changeAmount();
                };
                assets.appendChild(option);
            });
        }
        else {
            var option = document.createElement("option");
            option.innerText = "No crypto available, contact admin";
            option.disabled = true;
            assets.appendChild(option);
        }
    });
})();
