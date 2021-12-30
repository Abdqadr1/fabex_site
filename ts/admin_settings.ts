import { Ajax } from "./ajax.js";
declare const bootstrap: any;
const cryptoLoading = document.querySelector("div#crypto_loading") as HTMLDivElement;
const giftcardLoading = document.querySelector("div#giftcard_loading") as HTMLDivElement;
const cryptoDiv = document.querySelector("div#crypto_div") as HTMLDivElement;
const add_crypto = document.querySelector("div#add_crypto") as HTMLDivElement;
const addCryptoForm = document.querySelector("form#add_crypto_form") as HTMLFormElement;
const addCryptoSubmitBtn = addCryptoForm.querySelector("button") as HTMLButtonElement;
const cryptoErrorDiv = addCryptoForm.querySelector("div#errorDiv") as HTMLDivElement;
const addBankForm = document.querySelector("form#addBankForm") as HTMLFormElement;
const addBankSubmitBtn = addBankForm.querySelector("button") as HTMLButtonElement;
const bankSelect = addBankForm.querySelector("select#bankname") as HTMLSelectElement;
const accountName = addBankForm.querySelector("input#accountname") as HTMLInputElement;
const accountNumber = addBankForm.querySelector("input#accountnumber") as HTMLInputElement;
const bankErrorDiv = addBankForm.querySelector('div#errorDiv') as HTMLDivElement;
const bankSuccessDiv = addBankForm.querySelector("div#successDiv") as HTMLDivElement;
const spinner = `<div class='spinner-border spinner-border-sm' aria-hidden='true' role='status'></div>
                Please wait... `;

const giftcardDiv = document.querySelector("div#giftcard_div") as HTMLDivElement;
const addGiftcard = document.querySelector("div#add_giftcard") as HTMLDivElement;
const giftcardFormDiv = document.querySelector("div#giftcardFormDiv") as HTMLDivElement;
const addGiftcardForm = document.querySelector("form#add_new_giftcard_form") as HTMLFormElement;
const addGiftcardSubmitBtn = addGiftcardForm.querySelector("button") as HTMLButtonElement;
const addGiftcardErrorDiv = addGiftcardForm.querySelector("div#errorDiv") as HTMLDivElement;


// show crypto form
add_crypto.onclick = event => {
    addCryptoForm.classList.remove("d-none");
    addCryptoForm.classList.add("d-block");
    add_crypto.classList.add("d-none");
}
// add crypto function
const addCrypto = (content:any[]) => {
    const div = document.createElement("div") as HTMLDivElement;
    const nameSpan = document.createElement("span") as HTMLSpanElement;
    const checkSpan = document.createElement("span") as HTMLSpanElement;
    const switchInput = document.createElement("input") as HTMLInputElement;
    const dotSpan = document.createElement("span") as HTMLSpanElement;
    dotSpan.className = "material-icons text-primary three-dots";
    dotSpan.textContent = "more_vert";
    switchInput.type = "checkbox";
    switchInput.setAttribute("role", "switch");
    switchInput.className = "form-check-input";
    switchInput.checked = content[content.length - 1];
    switchInput.id = content[0];
    switchInput.onchange = event => toggleProduct(event, "crypto");
    checkSpan.className = "form-switch mx-3";
    checkSpan.appendChild(switchInput);
    nameSpan.className = "d-inline-block crypto-name";
    nameSpan.textContent = `${content[1]} (${content[2].toUpperCase()})`;
    div.classList.add("each-crypto");
    div.appendChild(nameSpan);
    div.appendChild(checkSpan);
    div.appendChild(dotSpan);
    cryptoDiv.insertBefore(div, cryptoDiv.lastElementChild);
}

// crypto submit
addCryptoForm.onsubmit = event => {
    event.preventDefault();
    console.log("submitting...");
    const aj = new Ajax(addCryptoForm as HTMLFormElement);
    aj.setBefore(() => {
        addCryptoSubmitBtn.disabled = true;
        addCryptoSubmitBtn.innerHTML = spinner;
    })
    aj.setAfter((responseText:string) => {
        const arr = JSON.parse(responseText);
        const message = arr[0];
        if (message.toLowerCase().indexOf("success") != -1) {
            addCrypto(arr[1]);
            cryptoErrorDiv.classList.remove("d-block");
            cryptoErrorDiv.classList.add("d-none");
            addCryptoForm.classList.remove("d-block");
            addCryptoForm.classList.add("d-none");
            add_crypto.classList.remove("d-none");
            add_crypto.classList.add("d-block"); 
        } else {
            cryptoErrorDiv.classList.remove("d-none");
            cryptoErrorDiv.classList.add("d-block");
            cryptoErrorDiv.textContent = message;
            cryptoErrorDiv.focus()
        }
        addCryptoSubmitBtn.disabled = false;
        addCryptoSubmitBtn.innerHTML = "Add New Crypto";
    })
    aj.start()
}

// add admin bank
addBankForm.onsubmit = event => {
    event.preventDefault();
    const aj = new Ajax(addBankForm as HTMLFormElement);
    aj.setBefore(() => {
        addBankSubmitBtn.disabled = true;
        addBankSubmitBtn.innerHTML = spinner;
    });
    aj.setAfter((data: string) => {
        const message = data.toLowerCase();
        if (message.indexOf("success") != -1) {
            bankErrorDiv.classList.remove("d-block");
            bankErrorDiv.classList.add("d-none");
            bankSuccessDiv.classList.remove("d-none");
            bankSuccessDiv.classList.add("d-block");
            bankSuccessDiv.textContent = data;
            bankSuccessDiv.focus();
        } else {
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
}
//adding giftcard 
addGiftcard.onclick = event => {
    giftcardFormDiv.classList.remove("d-none");
    giftcardFormDiv.classList.add("d-block");
    addGiftcard.classList.add("d-none");
}
const showFormFunction = (parent: HTMLDivElement) => {
    const form = parent.childNodes[1] as HTMLFormElement;
    form.classList.remove("d-none");
    form.classList.add("d-block");
}
const submitSubGiftCard = (form: HTMLFormElement, subCatDiv:HTMLDivElement) => {
    if (subCatDiv.innerHTML === "") {
        const span = document.createElement("span") as HTMLSpanElement
        span.className = "sub_cat";
        span.innerText = "Sub-category";
        subCatDiv.appendChild(span);
    }
    const button = form.querySelector("button") as HTMLButtonElement;
    const errorDiv = form.querySelector("div#errorDiv") as HTMLDivElement;
    const aj = new Ajax(form);
    aj.setBefore(() => {
        button.disabled = true;
        button.innerHTML = spinner;
    });
    aj.setAfter((data: string) => {
        const arr = JSON.parse(data);
        const message = arr[0].toLowerCase();
        if (message.indexOf("success") != -1) {
            const content: any[] = arr[1];
            const div = document.createElement("div") as HTMLDivElement
            div.className = "inline-block mt-2";
            div.innerHTML = `<span class="d-inline-block crypto-name">${content[1]}</span>
                                <span class="form-switch mx-3">
                                    <input id='${content[0]}' class="form-check-input" type="checkbox" role="switch" checked>
                                </span>
                                <span class="material-icons text-primary three-dots">more_vert</span>`;
            const input = div.querySelector("input") as HTMLInputElement;
            input.onchange = event => toggleProduct(event, 'giftcard');
            subCatDiv.appendChild(div);
            form.reset();
            form.classList.remove("d-block");
            form.classList.add("d-none");
            errorDiv.classList.remove("d-block");
            errorDiv.classList.add("d-none");
        } else {
            errorDiv.classList.remove("d-none");
            errorDiv.classList.add("d-block");
            errorDiv.innerText = data;
            errorDiv.focus();
        }
        button.disabled = false;
        button.innerHTML = "Add Sub-category";
    })
    aj.start();
}
const addGiftCardFun = (content: any[], children: any[]) => {
    const isChecked: boolean = content[3] == 1 ? true : false;
    let which = content[2];
    const id = content[0];
    const parent = (which == "category") ? id : "";
    const div = document.createElement("div") as HTMLDivElement;
    div.className = "cap";
    const each = document.createElement("div") as HTMLDivElement;
    each.className = "each-giftcard";
    each.innerHTML = `<div class="inline-block">
                            <span class="d-inline-block crypto-name">${content[1]}</span>
                            <span class="form-switch mx-3">
                                <input id='${id}' class="form-check-input" type="checkbox" role="switch">
                            </span>
                            <span class="material-icons text-primary three-dots">more_vert</span>
                        </div>`;
    const input = each.querySelector("input") as HTMLInputElement;
    input.checked = isChecked;
    input.onchange = event => toggleProduct(event, 'giftcard');
    const subCatDiv = document.createElement("div") as HTMLDivElement;
    subCatDiv.id = "sub_cat_div";
    if (children.length > 0) {
        const span = document.createElement("span") as HTMLSpanElement
        span.className = "sub_cat";
        span.innerText = "Sub-category";
        subCatDiv.appendChild(span);
        children.forEach((cat: any[]) => {
            const checked = cat[3] == 1 ? true : false;
            const div = document.createElement("div") as HTMLDivElement
            div.className = "inline-block mt-2";
            div.innerHTML = `<span class="d-inline-block crypto-name">${cat[1]}</span>
                                <span class="form-switch mx-3">
                                    <input id='${cat[0]}' class="form-check-input" type="checkbox" role="switch">
                                </span>
                                <span class="material-icons text-primary three-dots">more_vert</span>`;
            const input = div.querySelector("input") as HTMLInputElement;
            input.checked = checked;
            input.onchange = event => toggleProduct(event, 'giftcard');
            subCatDiv.appendChild(div);
        })
    }
    const addDiv = document.createElement("div") as HTMLDivElement;
    addDiv.className = "add-giftcard mt-2";
    addDiv.title = "add sub category"
    addDiv.onclick = event => {
        showFormFunction(addDiv.parentElement?.parentElement as HTMLDivElement);
    }
    addDiv.innerHTML = `<span class="material-icons add-crypto">add</span>
                            <span>Add Subcategory</span>`;
    const form = document.createElement("form") as HTMLFormElement;
    form.action = "php/add_giftcard.php";
    form.method = "post";
    form.className = "d-none"
    form.id = "add_new_sub_form";
    form.onsubmit = event => {
        event.preventDefault();
        submitSubGiftCard(form, subCatDiv);
    }
    form.innerHTML = `
                <div tabindex="-10" class="alert alert-danger mx-0 d-none text-center" id="errorDiv" role="alert"></div>
                <div class="mt-1 my-3">
                                <label for="add_sub" class="form-label settings">Add sub-category (Amazon Giftcards)</label>
                                <input name="giftcard_name" type="text" class="form-control rad8" id="add_sub" placeholder="e.g Amazon Giftcard" required>
                            </div>
                            <input type="hidden" name="which" value="sub_category">
                            <input type="hidden" name="parent" value="${parent}"><!-- parent_id should replaced  -->
                            <button type="submit" class="payment text-center mx-auto">Add Sub-category</button>`;
    each.appendChild(subCatDiv);
    each.appendChild(addDiv);
    div.appendChild(each);
    div.appendChild(form);
    giftcardDiv.insertBefore(div, giftcardDiv.lastElementChild);
}
addGiftcardForm.onsubmit = event => {
    event.preventDefault();
    const aj = new Ajax(addGiftcardForm as HTMLFormElement);
    aj.setBefore(() => {
        addGiftcardSubmitBtn.disabled = true;
        addGiftcardSubmitBtn.innerHTML = spinner;
    }); 
    aj.setAfter((data: string) => {
        const arr = JSON.parse(data);
        const message = arr[0].toLowerCase();
        if (message.indexOf("success") != -1) {
            addGiftCardFun(arr[1],[]);
            addGiftcardForm.reset();
            addGiftcardErrorDiv.classList.remove("d-block");
            addGiftcardErrorDiv.classList.add("d-none");
            giftcardFormDiv.classList.remove("d-block");
            giftcardFormDiv.classList.add("d-none");
            addGiftcard.classList.remove("d-none");
            addGiftcard.classList.add("d-block");
        } else {
            addGiftcardErrorDiv.classList.remove("d-none");
            addGiftcardErrorDiv.classList.add("d-block");
            addGiftcardErrorDiv.innerText = message;
            addGiftcardErrorDiv.focus();
        }
        addGiftcardSubmitBtn.disabled = false;
        addGiftcardSubmitBtn.innerHTML = "Add New Giftcard";
    }); 
    aj.start();
}
// toggle product
const toggleProduct = (event: Event, which:string) => {
    event.preventDefault();
    const el = event.target as HTMLInputElement;
    const status = el.checked ? 1 : 0;
    Ajax.fetchPage(`php/toggle.php?which=${which}&status=${status}&id=${el.id}`, (data: string) => {
        const message:string = data;
        if (message.indexOf('success') != -1) {
            showModal(message);
        } else {
            showModal(message, "text-danger");
            el.checked = !el.checked;
        }
        setTimeout(() => {
            hideModal();
        }, 2000);
    })
}
//show and hide modal
let myModal: any;
const showModal = (message: string, style:string = "text-success") => {
    const content = document.querySelector("div#modal_body") as HTMLDivElement;
    content.innerText = message;
    content.className = "modal-body py-1 " + style;
    myModal = new bootstrap.Modal(document.getElementById('modal'), {
        keyboard: false
    });
    myModal.show();
}
const hideModal = () => myModal.hide();
// get all banks
(function () {
    //TODO: replace url before server
    Ajax.fetchPage("/fabex/php/data.php?which=banks", (data: string) => {
        const bankList:[] = JSON.parse(data);
        bankList.forEach((bank:string) => {
            const option = document.createElement("option");
            option.value = bank;
            option.innerText = bank;
            bankSelect.appendChild(option);
        })
    })
}
)();
//get all cryptos 
(function () {
 Ajax.fetchPage("php/admin_data.php?which=crypto", (data: string) => {
        const object: {success:[][]} = JSON.parse(data);
        const keys = Object.keys(object);
        const message:string = keys[0];
        if (message.toLowerCase().indexOf('success') != -1) {
            const array: [][] = object.success;
            array.forEach(arr => {
                addCrypto(arr);
            });
            cryptoLoading.classList.add("d-none");
            cryptoDiv.classList.remove("d-none");
        } else {
            cryptoLoading.classList.add("d-none");
            showModal(data, "text-danger");
            setTimeout(() => {
                hideModal();
            }, 2000);
        }
    })   
})();
//get all giftcards 
(function () {
    Ajax.fetchPage("php/admin_data.php?which=giftcard", (data: string) => {
        const arr = JSON.parse(data);
        const cat:[] = arr[0];
        const subCat:[] = arr[1];
        if (data.toLowerCase().indexOf('No giftcard.') != -1) {
            giftcardLoading.classList.add("d-none");
            showModal(data, "text-danger");
        } else {
            if (cat.length > 0) {
                cat.forEach((category: any[], index) => {
                    const id = category[0];
                    const children: any[] = [];
                    subCat.forEach((subCategory: any[], i) => {
                        const parentId = subCategory[4];
                        if (parentId == id) {
                            children.push(subCategory);
                        }
                    })
                    addGiftCardFun(category, children);
                })
            }
            giftcardLoading.classList.add("d-none");
            giftcardDiv.classList.remove("d-none");
        }
    })
})();
//get admin bank details 
(function () {
    Ajax.fetchPage("php/admin_data.php?which=bank", (data: string) => {
        const arr = JSON.parse(data);
        const message:string = arr[0];
        if (message.toLowerCase().indexOf('success') != -1) {
            const details: string[] = arr[1];
            const option = document.createElement("option");
            option.value = details[0];
            option.innerText = details[0];
            option.selected = true;
            option.hidden = true;
            option.disabled = true;
            bankSelect.appendChild(option);
            accountNumber.value = details[1];
            accountName.value = details[2];
        }
    })
})();