import { Ajax } from "./ajax.js";
var cryptoLoading = document.querySelector("div#crypto_loading");
var giftcardLoading = document.querySelector("div#giftcard_loading");
var cryptoDiv = document.querySelector("div#crypto_div");
var add_crypto = document.querySelector("div#add_crypto");
var addCryptoForm = document.querySelector("form#add_crypto_form");
var addCryptoSubmitBtn = addCryptoForm.querySelector("button");
var cryptoErrorDiv = addCryptoForm.querySelector("div#errorDiv");
var addBankForm = document.querySelector("form#addBankForm");
var addBankSubmitBtn = addBankForm.querySelector("button");
var bankSelect = addBankForm.querySelector("select#bankname");
var accountName = addBankForm.querySelector("input#accountname");
var accountNumber = addBankForm.querySelector("input#accountnumber");
var bankErrorDiv = addBankForm.querySelector('div#errorDiv');
var bankSuccessDiv = addBankForm.querySelector("div#successDiv");
var spinner = "<div class='spinner-border spinner-border-sm' aria-hidden='true' role='status'></div>\n                Please wait... ";
var giftcardDiv = document.querySelector("div#giftcard_div");
var addGiftcard = document.querySelector("div#add_giftcard");
var giftcardFormDiv = document.querySelector("div#giftcardFormDiv");
var addGiftcardForm = document.querySelector("form#add_new_giftcard_form");
var addGiftcardSubmitBtn = addGiftcardForm.querySelector("button");
var addGiftcardErrorDiv = addGiftcardForm.querySelector("div#errorDiv");
// show crypto form
add_crypto.onclick = function (event) {
    addCryptoForm.classList.remove("d-none");
    addCryptoForm.classList.add("d-block");
    add_crypto.classList.add("d-none");
};
// add crypto function
var addCrypto = function (content) {
    var div = document.createElement("div");
    div.className = "each-crypto";
    var name = content[1] + " (" + content[2].toUpperCase() + ")";
    div.innerHTML = "<span id='" + content[0] + "' class=\"d-inline-block crypto-name\" tabindex=\"-1\">" + name + "</span>\n                    <span class=\"form-switch mx-3\">\n                        <input id='" + content[0] + "' class=\"form-check-input\" type=\"checkbox\" role=\"switch\">\n                    </span>\n                    <div class=\"d-inline-block\">\n                        <span data-bs-toggle=\"dropdown\" id=\"dropdown\" class=\"material-icons text-primary three-dots dropdown-toggle\" aria-expanded='false'>more_vert</span>\n                        <ul class=\"dropdown-menu\" aria-labelledby=\"dropdown\">\n                            <li><span id='edit' class=\"dropdown-item text-primary\">Edit</span></li>\n                            <li><span id='delete' class=\"dropdown-item text-danger\">Delete</span></li>\n                        </ul>\n                    </div>";
    var switchInput = div.querySelector("input");
    var deleteAction = div.querySelector("span#delete");
    var editAction = div.querySelector("span#edit");
    editAction.onclick = function () { return showEdit("crypto", content); };
    deleteAction.onclick = function () { return deleteProduct("crypto", div); };
    switchInput.checked = content[content.length - 1];
    switchInput.onchange = function (event) { return toggleProduct(event, "crypto"); };
    cryptoDiv.insertBefore(div, cryptoDiv.lastElementChild);
};
// crypto submit
addCryptoForm.onsubmit = function (event) {
    event.preventDefault();
    var aj = new Ajax(addCryptoForm);
    aj.setBefore(function () {
        addCryptoSubmitBtn.disabled = true;
        addCryptoSubmitBtn.innerHTML = spinner;
    });
    aj.setAfter(function (responseText) {
        var arr = JSON.parse(responseText);
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
            cryptoErrorDiv.textContent = message;
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
var showFormFunction = function (parent) {
    var form = parent.childNodes[1];
    form.classList.remove("d-none");
    form.classList.add("d-block");
};
var submitSubGiftCard = function (form, subCatDiv) {
    if (subCatDiv.innerHTML === "") {
        var span = document.createElement("span");
        span.className = "sub_cat";
        span.innerText = "Sub-category";
        subCatDiv.appendChild(span);
    }
    var button = form.querySelector("button");
    var errorDiv = form.querySelector("div#errorDiv");
    var aj = new Ajax(form);
    aj.setBefore(function () {
        button.disabled = true;
        button.innerHTML = spinner;
    });
    aj.setAfter(function (data) {
        var arr = JSON.parse(data);
        var message = arr[0].toLowerCase();
        if (message.indexOf("success") != -1) {
            var content_1 = arr[1];
            var div_1 = document.createElement("div");
            div_1.className = "inline-block mt-2";
            div_1.innerHTML = "<span id='" + content_1[0] + "' class=\"d-inline-block crypto-name\">" + content_1[1] + "</span>\n                                <span class=\"form-switch mx-3\">\n                                    <input id='" + content_1[0] + "' class=\"form-check-input\" type=\"checkbox\" role=\"switch\" checked>\n                                </span>\n                                <div class=\"d-inline-block\">\n                                    <span data-bs-toggle=\"dropdown\" id=\"dropdown\" class=\"material-icons text-primary three-dots dropdown-toggle\" aria-expanded='false'>more_vert</span>\n                                    <ul class=\"dropdown-menu\" aria-labelledby=\"dropdown\">\n                                        <li><span id='edit' class=\"dropdown-item text-primary\">Edit</span></li>\n                                        <li><span id='delete' class=\"dropdown-item text-danger\">Delete</span></li>\n                                    </ul>\n                                </div>";
            var input = div_1.querySelector("input");
            var deleteAction = div_1.querySelector("span#delete");
            var editAction = div_1.querySelector("span#edit");
            editAction.onclick = function () { return showEdit("giftcard", content_1); };
            deleteAction.onclick = function () { return deleteProduct("giftcard", div_1); };
            input.onchange = function (event) { return toggleProduct(event, 'giftcard'); };
            subCatDiv.appendChild(div_1);
            form.reset();
            form.classList.remove("d-block");
            form.classList.add("d-none");
            errorDiv.classList.remove("d-block");
            errorDiv.classList.add("d-none");
        }
        else {
            errorDiv.classList.remove("d-none");
            errorDiv.classList.add("d-block");
            errorDiv.innerText = data;
            errorDiv.focus();
        }
        button.disabled = false;
        button.innerHTML = "Add Sub-category";
    });
    aj.start();
};
var addGiftCardFun = function (content, children) {
    var isChecked = content[3] == 1 ? true : false;
    var which = content[2];
    var id = content[0];
    var parent = (which == "category") ? id : "";
    var div = document.createElement("div");
    div.className = "cap";
    var each = document.createElement("div");
    each.className = "each-giftcard";
    each.innerHTML = "<div class=\"inline-block\">\n                            <span id='" + id + "' class=\"d-inline-block crypto-name\">" + content[1] + "</span>\n                            <span class=\"form-switch mx-3\">\n                                <input id='" + id + "' class=\"form-check-input\" type=\"checkbox\" role=\"switch\">\n                            </span>\n                            <div class=\"d-inline-block\">\n                                    <span data-bs-toggle=\"dropdown\" id=\"dropdown\" class=\"material-icons text-primary three-dots dropdown-toggle\" aria-expanded='false'>more_vert</span>\n                                    <ul class=\"dropdown-menu\" aria-labelledby=\"dropdown\">\n                                        <li><span id='edit' class=\"dropdown-item text-primary\">Edit</span></li>\n                                        <li><span id='delete' class=\"dropdown-item text-danger\">Delete</span></li>\n                                    </ul>\n                                </div>\n                        </div>";
    var input = each.querySelector("input");
    input.checked = isChecked;
    var deleteAction = each.querySelector("span#delete");
    var editAction = each.querySelector("span#edit");
    editAction.onclick = function () { return showEdit("giftcard", content); };
    deleteAction.onclick = function () { return deleteProduct("giftcard", div); };
    input.onchange = function (event) { return toggleProduct(event, 'giftcard'); };
    var subCatDiv = document.createElement("div");
    subCatDiv.id = "sub_cat_div";
    if (children.length > 0) {
        var span = document.createElement("span");
        span.className = "sub_cat";
        span.innerText = "Sub-category";
        subCatDiv.appendChild(span);
        children.forEach(function (cat) {
            var checked = cat[3] == 1 ? true : false;
            var div = document.createElement("div");
            div.className = "inline-block mt-2";
            div.innerHTML = "<span id='" + cat[0] + "' class=\"d-inline-block crypto-name\">" + cat[1] + "</span>\n                                <span class=\"form-switch mx-3\">\n                                    <input id='" + cat[0] + "' class=\"form-check-input\" type=\"checkbox\" role=\"switch\">\n                                </span>\n                                <div class=\"d-inline-block\">\n                                    <span data-bs-toggle=\"dropdown\" id=\"dropdown\" class=\"material-icons text-primary three-dots dropdown-toggle\" aria-expanded='false'>more_vert</span>\n                                    <ul class=\"dropdown-menu\" aria-labelledby=\"dropdown\">\n                                        <li><span id='edit' class=\"dropdown-item text-primary\">Edit</span></li>\n                                        <li><span id='delete' class=\"dropdown-item text-danger\">Delete</span></li>\n                                    </ul>\n                                </div>";
            var input = div.querySelector("input");
            input.checked = checked;
            var deleteAction = div.querySelector("span#delete");
            var editAction = div.querySelector("span#edit");
            editAction.onclick = function () { return showEdit("giftcard", cat); };
            deleteAction.onclick = function () { return deleteProduct("giftcard", div); };
            input.onchange = function (event) { return toggleProduct(event, 'giftcard'); };
            subCatDiv.appendChild(div);
        });
    }
    var addDiv = document.createElement("div");
    addDiv.className = "add-giftcard mt-2";
    addDiv.title = "add sub category";
    addDiv.onclick = function (event) {
        var _a;
        showFormFunction((_a = addDiv.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement);
    };
    addDiv.innerHTML = "<span class=\"material-icons add-crypto\">add</span>\n                            <span>Add Subcategory</span>";
    var form = document.createElement("form");
    form.action = "php/add_giftcard.php";
    form.method = "post";
    form.className = "d-none";
    form.id = "add_new_sub_form";
    form.onsubmit = function (event) {
        event.preventDefault();
        submitSubGiftCard(form, subCatDiv);
    };
    form.innerHTML = "\n                <div tabindex=\"-10\" class=\"alert alert-danger mx-0 d-none text-center\" id=\"errorDiv\" role=\"alert\"></div>\n                <div class=\"mt-1 my-3\">\n                                <label for=\"add_sub\" class=\"form-label settings\">Add sub-category (Amazon Giftcards)</label>\n                                <input name=\"giftcard_name\" type=\"text\" class=\"form-control rad8\" id=\"add_sub\" placeholder=\"e.g Amazon Giftcard\" required>\n                            </div>\n                            <input type=\"hidden\" name=\"which\" value=\"sub_category\">\n                            <input type=\"hidden\" name=\"parent\" value=\"" + parent + "\"><!-- parent_id should replaced  -->\n                            <button type=\"submit\" class=\"payment text-center mx-auto\">Add Sub-category</button>";
    each.appendChild(subCatDiv);
    each.appendChild(addDiv);
    div.appendChild(each);
    div.appendChild(form);
    giftcardDiv.insertBefore(div, giftcardDiv.lastElementChild);
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
            addGiftCardFun(arr[1], []);
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
            addGiftcardErrorDiv.innerText = message;
            addGiftcardErrorDiv.focus();
        }
        addGiftcardSubmitBtn.disabled = false;
        addGiftcardSubmitBtn.innerHTML = "Add New Giftcard";
    });
    aj.start();
};
// toggle product
var toggleProduct = function (event, which) {
    event.preventDefault();
    var el = event.target;
    var id = el.id;
    var status = el.checked ? 1 : 0;
    Ajax.fetchPage("php/toggle.php", function (data) {
        var message = data;
        if (message.indexOf('success') != -1) {
            showModal(message);
        }
        else {
            showModal(message, "text-danger");
            el.checked = !el.checked;
        }
        setTimeout(function () {
            hideModal();
        }, 2000);
    }, { status: status, id: id, which: which });
};
//show and hide modal
var myModal;
var showModal = function (message, style, duration) {
    if (style === void 0) { style = "text-success"; }
    if (duration === void 0) { duration = 0; }
    var content = document.querySelector("div#modal_body");
    content.innerText = message;
    content.className = "modal-body py-1 " + style;
    myModal = new bootstrap.Modal(document.getElementById('modal'), {
        keyboard: false
    });
    myModal.show();
    if (duration > 0) {
        setTimeout(function () {
            myModal.hide();
        }, duration);
    }
};
var showEdit = function (which, arr) {
    var editModal = document.querySelector("div#editModal");
    var body = editModal.querySelector("div#edit_body");
    body.innerHTML = "";
    if (which === "crypto") {
        body.innerHTML = "\n        <div tabindex=\"-1\" class=\"my-2 alert alert-danger mx-0 d-none text-center\" id=\"errorDiv\" role=\"alert\"></div>\n        <div tabindex=\"-1\" class=\"my-2 alert alert-success mx-0 d-none text-center\" id=\"successDiv\" role=\"alert\"></div>\n        <input value='" + arr[1] + "' name=\"coin_name\" class=\"form-control form-control-lg rad8 mt-3\" placeholder=\"Enter coin name\" required>\n        <input value='" + arr[2] + "' name=\"short_name\" class=\"form-control form-control-lg rad8 mt-3\" placeholder=\"Short name\" required>\n        <input value='" + arr[3] + "' name=\"network\" class=\"form-control form-control-lg rad8 mt-3\" placeholder=\"Enter network\" required>\n        <input value='" + arr[4] + "' name=\"address\" class=\"form-control form-control-lg rad8 mt-3\" placeholder=\"Enter wallet address\" required>\n        <input value='" + arr[6] + "' name=\"memo\" class=\"form-control form-control-lg rad8 mt-3\" placeholder=\"Memo\" required>\n        <input id=\"hidden\" type=\"hidden\" value='" + which + "' name='which'>\n        <input type=\"hidden\" value='" + arr[0] + "' name='id'>";
    }
    else {
        body.innerHTML = "\n        <div tabindex=\"-1\" class=\"my-2 alert alert-danger mx-0 d-none text-center\" id=\"errorDiv\" role=\"alert\"></div>\n        <div tabindex=\"-1\" class=\"my-2 alert alert-success mx-0 d-none text-center\" id=\"successDiv\" role=\"alert\"></div>\n        <input value='" + arr[1] + "' name=\"name\" class=\"form-control rad8 mt-3\" placeholder=\"Enter giftcard name\" required>\n        <input type=\"hidden\" value='" + which + "' name='which'>\n        <input type=\"hidden\" value='" + arr[0] + "' name='id'>";
    }
    var submitBtn = editModal.querySelector("button#submitBtn");
    submitBtn.onclick = function (event) { return updateProduct(which, editModal, arr); };
    // show modal
    var modal = new bootstrap.Modal(editModal, {
        keyboard: false
    });
    modal.show();
};
var hideModal = function () { return myModal.hide(); };
var updateProduct = function (which, modal, data) {
    var btn = modal.querySelector("button#submitBtn");
    var body = modal.querySelector("div#edit_body");
    var errorDiv = body.querySelector("div#errorDiv");
    var successDiv = body.querySelector("div#successDiv");
    var inputs = body.querySelectorAll("input");
    var params = {};
    inputs.forEach(function (input) {
        params[input.name] = input.value;
    });
    var id = data[0];
    var parent = which === "crypto" ? cryptoDiv : giftcardDiv;
    var nameSpan = parent.querySelector("span#" + CSS.escape(id));
    btn.disabled = true;
    btn.innerHTML = spinner;
    Ajax.fetchPage("php/edit_product.php", function (data) {
        if (data.indexOf("success") != -1) {
            if (which === "giftcard") {
                nameSpan.innerText = params.name;
            }
            else {
                nameSpan.innerText = params.coin_name + " (" + params.short_name + ")";
            }
            errorDiv.classList.add("d-none");
            successDiv.innerText = data;
            successDiv.classList.remove("d-none");
        }
        else {
            errorDiv.innerText = data;
            errorDiv.classList.remove("d-none");
            successDiv.classList.add("d-none");
        }
        btn.disabled = false;
        btn.innerText = "Change";
    }, params);
};
//delete product
var deleteProduct = function (which, el) {
    var parent = el.parentElement;
    var input = parent.querySelector("input");
    var id = input.id;
    Ajax.fetchPage("php/delete_product.php", function (data) {
        if (data.toLowerCase().indexOf("success") != -1) {
            showModal(data, "text-success", 3000);
            //remove element
            parent.removeChild(el);
        }
        else {
            showModal(data, "text-danger", 3000);
        }
    }, { which: which, id: id });
};
// get all banks
(function () {
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
var getAllCryptos = function () {
    Ajax.fetchPage("php/admin_data.php?which=crypto", function (data) {
        var object = JSON.parse(data);
        var keys = Object.keys(object);
        var message = keys[0];
        if (message.toLowerCase().indexOf('success') != -1) {
            var array = object.success;
            array.forEach(function (arr) {
                addCrypto(arr);
            });
            cryptoLoading.classList.add("d-none");
            cryptoDiv.classList.remove("d-none");
        }
        else {
            cryptoLoading.classList.add("d-none");
            showModal(data, "text-danger");
            setTimeout(function () {
                hideModal();
            }, 2000);
        }
    });
};
var getAllGiftcards = function () {
    Ajax.fetchPage("php/admin_data.php?which=giftcard", function (data) {
        var arr = JSON.parse(data);
        var cat = arr[0];
        var subCat = arr[1];
        if (data.toLowerCase().indexOf('No giftcard.') != -1) {
            giftcardLoading.classList.add("d-none");
            showModal(data, "text-danger");
        }
        else {
            if (cat.length > 0) {
                cat.forEach(function (category) {
                    var id = category[0];
                    var children = [];
                    subCat.forEach(function (subCategory) {
                        var parentId = subCategory[4];
                        if (parentId == id) {
                            children.push(subCategory);
                        }
                    });
                    addGiftCardFun(category, children);
                });
            }
            giftcardLoading.classList.add("d-none");
            giftcardDiv.classList.remove("d-none");
        }
    });
};
//get all cryptos 
(function () {
    getAllCryptos();
})();
//get all giftcards 
(function () {
    getAllGiftcards();
})();
//get admin bank details 
(function () {
    Ajax.fetchPage("php/admin_data.php?which=bank", function (data) {
        var arr = JSON.parse(data);
        var message = arr[0];
        if (message.toLowerCase().indexOf('success') != -1) {
            var details = arr[1];
            var option = document.createElement("option");
            option.value = details[0];
            option.innerText = details[0];
            option.selected = true;
            option.hidden = true;
            option.disabled = true;
            bankSelect.appendChild(option);
            accountNumber.value = details[1];
            accountName.value = details[2];
        }
    });
})();
