import { Ajax } from "./ajax.js";
var buttons = document.querySelectorAll("button.trading");
var toggleSwitch = document.querySelector("input.toggle-switch");
// const allBuyData = document.querySelectorAll("div.for-buy") as NodeListOf<HTMLDivElement>;
// const allSellData = document.querySelectorAll("div.for-sell") as NodeListOf<HTMLDivElement>;
var bankData = document.querySelectorAll("div.for-sell.bank");
var spinner = "<div class='spinner-border spinner-border-sm' aria-hidden='true' role='status'></div>\n                Please wait... ";
var cryptoButton = document.querySelector("button.payment");
var toggleDiv = document.querySelector("div#toggle-switch");
var backBtn = document.querySelector("span#backBtn");
backBtn.onclick = function (event) {
    event.stopPropagation();
    history.go(-1);
};
var action = "buy";
var select = document.querySelector("select#bankName");
var assets = document.querySelector("select#assets");
var sellingFields = document.querySelector("div#sellingFields");
var buyingFields = document.querySelector("div#buyingFields");
var tradeCryptoForm = document.querySelector("form#tradeCryptoForm");
var submitBtn = tradeCryptoForm.querySelector("button");
var bankInputs = tradeCryptoForm.querySelectorAll(".bankInput");
var buyInputs = tradeCryptoForm.querySelectorAll(".buyInput");
var errorDiv = tradeCryptoForm.querySelector("div#errorDiv");
var act = tradeCryptoForm.querySelector("input#hidden");
// console.log(select);
var changeDisability = function (node, show) {
    node.forEach(function (el) {
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
var timeoutFun = function () {
    errorDiv.innerText = "Request taking too long, Check your internet connection";
    errorDiv.classList.remove("d-none");
    errorDiv.classList.add("d-block");
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
            errorDiv.classList.add("d-block");
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
    //TODO: replace url before server
    Ajax.fetchPage("/fabex/php/data.php?which=banks", function (data) {
        var bankList = JSON.parse(data);
        console.log(bankList);
        bankList.forEach(function (bank) {
            var option = document.createElement("option");
            option.value = bank;
            option.innerText = bank;
            select.appendChild(option);
        });
    });
})();
// get all banks
(function () {
    //TODO: replace url before server
    Ajax.fetchPage("/fabex/php/data.php?which=coins", function (data) {
        var coinList = JSON.parse(data);
        var keys = Object.keys(coinList);
        console.log(keys);
        keys.forEach(function (key) {
            var option = document.createElement("option");
            option.value = key;
            option.innerText = coinList[key];
            assets.appendChild(option);
        });
    });
})();
