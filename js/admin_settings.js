import { Ajax } from "./ajax.js";
var cryptoDiv = document.querySelector("div#crypto_div");
var add_crypto = document.querySelector("div#add_crypto");
var addCryptoForm = document.querySelector("form#add_crypto_form");
var addCryptoSubmitBtn = addCryptoForm.querySelector("button");
var cryptoErrorDiv = addCryptoForm.querySelector("div#errorDiv");
var addBankForm = document.querySelector("form#addBankForm");
var addBankSubmitBtn = addBankForm.querySelector("button");
var bankSelect = addBankForm.querySelector("select#bankname");
var bankErrorDiv = addBankForm.querySelector('div#errorDiv');
var bankSuccessDiv = addBankForm.querySelector("div#successDiv");
var spinner = "<div class='spinner-border spinner-border-sm' aria-hidden='true' role='status'></div>\n                Please wait... ";
var all_cryptos = document.querySelectorAll("div.each-crypto input");
var gifcardDiv = document.querySelector("div#giftcard_div");
var addGiftcard = document.querySelector("div#add_giftcard");
var giftcardFormDiv = document.querySelector("div#giftcardFormDiv");
var addGiftcardForm = document.querySelector("form#add_new_giftcard_form");
var addGiftcardSubmitBtn = addGiftcardForm.querySelector("button");
var addGiftcardErrorDiv = addGiftcardForm.querySelector("div#errorDiv");
//TODO: write function when toggle product
all_cryptos.forEach(function (input) {
    input.onchange = function (event) {
        console.log(input);
    };
});
// add crypto product
add_crypto.onclick = function (event) {
    addCryptoForm.classList.remove("d-none");
    addCryptoForm.classList.add("d-block");
    add_crypto.classList.add("d-none");
};
var addCrypto = function (content) {
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
    switchInput.checked = content[content.length - 1];
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
            cryptoErrorDiv.focus();
        }
        addCryptoSubmitBtn.disabled = false;
        addCryptoSubmitBtn.innerHTML = "Add New Crypto";
    });
    aj.start();
};
// add admin bank
addBankForm.onsubmit = function (event) {
    event.preventDefault();
    var aj = new Ajax(addBankForm);
    aj.setBefore(function () {
        addBankSubmitBtn.disabled = true;
        addBankSubmitBtn.innerHTML = spinner;
    });
    aj.setAfter(function (data) {
        var message = data.toLowerCase();
        if (message.indexOf("success") != -1) {
            bankErrorDiv.classList.remove("d-block");
            bankErrorDiv.classList.add("d-none");
            bankSuccessDiv.classList.remove("d-none");
            bankSuccessDiv.classList.add("d-block");
            bankSuccessDiv.textContent = data;
            bankSuccessDiv.focus();
        }
        else {
            bankSuccessDiv.classList.remove("d-block");
            bankSuccessDiv.classList.add("d-none");
            bankErrorDiv.classList.remove("d-none");
            bankErrorDiv.classList.add("d-block");
            bankErrorDiv.textContent = data;
            bankErrorDiv.focus();
        }
        addBankSubmitBtn.disabled = false;
        addBankSubmitBtn.innerText = "Add Account Details";
    });
    aj.start();
};
//adding giftcard 
addGiftcard.onclick = function (event) {
    giftcardFormDiv.classList.remove("d-none");
    giftcardFormDiv.classList.add("d-block");
    addGiftcard.classList.add("d-none");
};
var addGiftCardFun = function (content) {
    var isChecked = content[2] === 1 ? true : false;
    var which = "category";
    var parent = content[1] === "category" ? "0" : content[3];
    var div = document.createElement("div");
    div.className = "cap";
    var each = document.createElement("div");
    each.className = "each-giftcard";
    each.innerHTML = "<div class=\"inline-block\">\n                            <span class=\"d-inline-block crypto-name\">" + content[0] + "</span>\n                            <span class=\"form-switch mx-3\">\n                                <input class=\"form-check-input\" type=\"checkbox\" role=\"switch\" onchange=\"\" checked=\"" + isChecked + "\">\n                            </span>\n                            <span class=\"material-icons text-primary three-dots\">more_vert</span>\n                        </div>";
    var addDiv = document.createElement("div");
    addDiv.className = "add-giftcard mt-2";
    addDiv.title = "add sub category";
    addDiv.innerHTML = "<span class=\"material-icons add-crypto\">add</span>\n                            <span>Add Subcategory</span>";
    var form = document.createElement("form");
    var children = content[4];
    if (children.length > 0) {
        console.log('has children...');
    }
    form.action = "php/add_giftcard.php";
    form.method = "post";
    form.id = "add_new_sub_form";
    form.innerHTML = "<div class=\"mt-1 my-3\">\n                                <label for=\"add_sub\" class=\"form-label settings\">Add sub-category (Amazon Giftcards)</label>\n                                <input name=\"sub_cat_name\" type=\"text\" class=\"form-control rad8\" id=\"add_sub\" placeholder=\"e.g Amazon Giftcard\" required>\n                            </div>\n                            <input type=\"hidden\" name=\"which\" value=\"" + content[1] + "\">\n                            <input type=\"hidden\" name=\"parent\" value=\"" + parent + "\"><!-- parent_id should replaced  -->\n                            <button type=\"submit\" class=\"payment text-center mx-auto\">Add Sub-category</button>";
    each.appendChild(addDiv);
    div.appendChild(each);
    div.appendChild(form);
    giftcardFormDiv.appendChild(div);
};
addGiftcardForm.onsubmit = function (event) {
    event.preventDefault();
    var aj = new Ajax(addGiftcardForm);
    aj.setBefore(function () {
        addGiftcardSubmitBtn.disabled = true;
        addGiftcardSubmitBtn.innerHTML = spinner;
    });
    aj.setAfter(function (data) {
        var arr = JSON.parse(data);
        var message = arr[0].toLowerCase();
        if (message.indexOf("success") != -1) {
            addGiftCardFun(arr[1]);
            addGiftcardForm.reset();
            addGiftcardErrorDiv.classList.remove("d-block");
            addGiftcardErrorDiv.classList.add("d-none");
            giftcardFormDiv.classList.remove("d-block");
            giftcardFormDiv.classList.add("d-none");
            addGiftcard.classList.remove("d-none");
            addGiftcard.classList.add("d-block");
        }
        else {
            addGiftcardErrorDiv.classList.remove("d-none");
            addGiftcardErrorDiv.classList.add("d-block");
            addGiftcardErrorDiv.innerText = data;
            addGiftcardErrorDiv.focus();
        }
        addGiftcardSubmitBtn.disabled = false;
        addGiftcardSubmitBtn.innerHTML = "Add New Giftcard";
    });
    aj.start();
};
// get all banks
(function () {
    //TODO: replace url before server
    Ajax.fetchPage("/fabex/php/data.php?which=banks", function (data) {
        var bankList = JSON.parse(data);
        bankList.forEach(function (bank) {
            var option = document.createElement("option");
            option.value = bank;
            option.innerText = bank;
            bankSelect.appendChild(option);
        });
    });
})();
