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
// buy and sell cryptos
var buyCryptos = [];
var sellCryptos = [];
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
var lowPriceInput = tradeCryptoForm.querySelector("input#lowPriceInput");
var totalInput = tradeCryptoForm.querySelector("input#totalInput");
var amountInput = tradeCryptoForm.querySelector("input#amount");
var bankInputs = tradeCryptoForm.querySelectorAll(".bankInput");
var buyInputs = tradeCryptoForm.querySelectorAll(".buyInput");
var errorDiv = tradeCryptoForm.querySelector("div#errorDiv");
var act = tradeCryptoForm.querySelector("input#hidden");
var amountParagraph = tradeCryptoForm.querySelector("p#amount");
var networkSelect = tradeCryptoForm.querySelector("select#network");
var memoDiv = tradeCryptoForm.querySelector("div#memoDiv");
var memoInput = memoDiv.querySelector("input[name=memo]");
var priceNote = tradeCryptoForm.querySelector("#priceNote");
amountInput.oninput = function () { return changeAmount(); };
var changeAmount = function () {
    var charge = action === "buy" ? 1000 : 0;
    var price = Number(priceInput.value);
    var lowPrice = Number(lowPriceInput.value);
    var amount = amountInput.valueAsNumber;
    // console.log(price, amount);
    if (price && amount && amount > 0 && price > 0) {
        if (amount < 150)
            price = lowPrice;
        var tot = Number(price * amount);
        amountParagraph.innerText = "Total: " + numberFormatter.format(tot) + " @ " + price + "/$ + #" + charge;
        tot += charge;
        totalInput.value = "" + tot.toFixed(2);
    }
    else {
        totalInput.value = "" + ((price * amount) + charge);
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
    // console.log("submitting...")
    var aj = new Ajax(tradeCryptoForm);
    aj.setTimer(timeoutFun, 120000);
    aj.setBefore(function () {
        submitBtn.disabled = true;
        submitBtn.innerHTML = spinner;
        changeDisability(buttons, true);
    });
    aj.setAfter(function (responseText) {
        // console.log(responseText)
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
        populateAssets((action == "buy" ? buyCryptos : sellCryptos));
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
        if (action === "buy")
            priceNote.classList.remove("d-none");
        else
            priceNote.classList.add("d-none");
    };
});
// get all banks
(function () {
    Ajax.fetchPage("php/data.php?which=banks", function (data) {
        bankList = JSON.parse(data);
    });
})();
// onchange assets
assets.onchange = function (event) {
    var select = event.target;
    var children = select.children;
    var array = (action === "buy") ? buyCryptos : sellCryptos;
    var crypto_name = select.value;
    networkSelect.innerHTML = "<option value=\"\" selected hidden>Select network...</option>";
    var _loop_1 = function (i) {
        var child = children[i];
        if (child.value.toLowerCase() === crypto_name.toLowerCase()) {
            assets.setAttribute("aria-id", child.id);
            priceInput.value = child.getAttribute("price");
            lowPriceInput.value = child.getAttribute("low_price");
            productIdInput.value = child.id;
            changeAmount();
            var obj = array.filter(function (el) { return el.id === child.id; })[0];
            if (obj.memo) {
                memoInput.required = true;
                memoDiv.classList.remove('d-none');
            }
            else {
                memoInput.required = false;
                memoDiv.classList.add('d-none');
            }
            var networks = array.filter(function (arr) { return arr.acronym.toLowerCase() === child.value.toLowerCase(); });
            networks.forEach(function (net) {
                var network = net.network.toUpperCase();
                networkSelect.innerHTML += "<option id='" + net.id + "' value='" + network + "'>" + network + "</option>";
            });
        }
    };
    for (var i = 0; i < children.length; i++) {
        _loop_1(i);
    }
};
var populateAssets = function (activeAssets) {
    assets.innerHTML = "<option value=\"\" selected hidden>Select coin...</option>";
    var insertedNames = [];
    if (activeAssets.length > 0) {
        activeAssets.forEach(function (crypto) {
            if (insertedNames.indexOf(crypto.acronym) == -1) {
                var option = document.createElement("option");
                option.innerText = crypto.name;
                option.value = crypto.acronym;
                option.id = crypto.id;
                option.setAttribute("price", crypto.price);
                option.setAttribute("low_price", crypto.low_price);
                assets.appendChild(option);
                insertedNames.push(crypto.acronym);
            }
        });
    }
    else {
        var option = document.createElement("option");
        option.innerText = "No crypto available, contact admin";
        option.disabled = true;
        assets.appendChild(option);
        var net = document.createElement("option");
        net.innerText = "No network available";
        net.disabled = true;
        networkSelect.innerHTML = "<option value=\"\" selected hidden>Select network...</option>";
        networkSelect.appendChild(net);
    }
};
//get all cryptos
(function () {
    Ajax.fetchPage("php/data.php?which=cryptos", function (data) {
        var arr = JSON.parse(data);
        // console.log(arr)
        buyCryptos = arr[0];
        sellCryptos = arr[1];
        var activeAssets;
        if (action === "buy") {
            activeAssets = buyCryptos;
        }
        else {
            activeAssets = sellCryptos;
        }
        populateAssets(activeAssets);
    });
})();
// for timeout
import "./timeout.js";
