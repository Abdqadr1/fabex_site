import { Ajax } from "./ajax.js";
var buttons = document.querySelectorAll("button.trading");
var toggleSwitch = document.querySelector("input.toggle-switch");
var allBuyData = document.querySelectorAll("div.for-buy");
var allSellData = document.querySelectorAll("div.for-sell");
var bankData = document.querySelectorAll("div.for-sell.bank");
var cryptoButton = document.querySelector("button.payment");
var toggleDiv = document.querySelector("div#toggle-switch");
var select = document.querySelector("select#bankName");
var assets = document.querySelector("select#assets");
// console.log(select);
toggleSwitch.onchange = function (event) {
    if (toggleSwitch.checked) {
        bankData.forEach(function (element) {
            element.classList.remove("d-block");
            element.classList.add("d-none");
        });
    }
    else {
        bankData.forEach(function (element) {
            element.classList.remove("d-none");
            element.classList.add("d-block");
        });
    }
};
toggleSwitch.checked = false;
buttons.forEach(function (element) {
    element.onclick = function (e) {
        element.classList.remove("disabled");
        element.classList.add("active");
        var action = "";
        if (element.classList.contains("buy")) {
            action = "buy";
            cryptoButton.textContent = "Buy Crypto";
        }
        else {
            action = "sell";
            cryptoButton.textContent = "Sell Crypto";
        }
        var parent = element.parentElement;
        var children = parent.children;
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            if (child === element) {
                // change the ui as needed
                if (action == "buy") {
                    allSellData.forEach(function (element) {
                        element.classList.remove("d-block");
                        element.classList.add("d-none");
                    });
                    toggleDiv.classList.remove("d-block");
                    toggleDiv.classList.add("d-none");
                    allBuyData.forEach(function (element) {
                        element.classList.remove("d-none");
                        element.classList.add("d-block");
                    });
                }
                else {
                    toggleDiv.classList.remove("d-none");
                    toggleDiv.classList.add("d-block");
                    allBuyData.forEach(function (element) {
                        element.classList.remove("d-block");
                        element.classList.add("d-none");
                    });
                    if (toggleSwitch.checked) {
                        allSellData.forEach(function (element) {
                            element.classList.remove("d-block");
                            element.classList.add("d-none");
                        });
                    }
                    else {
                        allSellData.forEach(function (element) {
                            element.classList.remove("d-none");
                            element.classList.add("d-block");
                        });
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
