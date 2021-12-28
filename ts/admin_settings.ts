import { Ajax } from "./ajax.js";
const cryptoDiv = document.querySelector("div#crypto_div") as HTMLDivElement;
const add_crypto = document.querySelector("div#add_crypto") as HTMLDivElement;
const addCryptoForm = document.querySelector("form#add_crypto_form") as HTMLFormElement;
const addCryptoSubmitBtn = addCryptoForm.querySelector("button") as HTMLButtonElement;
const cryptoErrorDiv = addCryptoForm.querySelector("div#errorDiv") as HTMLDivElement;
const addBankForm = document.querySelector("form#addBankForm") as HTMLFormElement;
const addBankSubmitBtn = addBankForm.querySelector("button") as HTMLButtonElement;
const bankSelect = addBankForm.querySelector("select#bankname") as HTMLSelectElement;
const bankErrorDiv = addBankForm.querySelector('div#errorDiv') as HTMLDivElement;
const bankSuccessDiv = addBankForm.querySelector("div#successDiv") as HTMLDivElement;
const spinner = `<div class='spinner-border spinner-border-sm' aria-hidden='true' role='status'></div>
                Please wait... `;
const all_cryptos = document.querySelectorAll("div.each-crypto input") as NodeListOf<HTMLInputElement>;

const gifcardDiv = document.querySelector("div#giftcard_div") as HTMLDivElement;
const addGiftcard = document.querySelector("div#add_giftcard") as HTMLDivElement;
const giftcardFormDiv = document.querySelector("div#giftcardFormDiv") as HTMLDivElement;
const addGiftcardForm = document.querySelector("form#add_new_giftcard_form") as HTMLFormElement;
const addGiftcardSubmitBtn = addGiftcardForm.querySelector("button") as HTMLButtonElement;
const addGiftcardErrorDiv = addGiftcardForm.querySelector("div#errorDiv") as HTMLDivElement;
//TODO: write function when toggle product
all_cryptos.forEach(input => {
    input.onchange = event => {
        console.log(input);
    }
})

// add crypto product
add_crypto.onclick = event => {
    addCryptoForm.classList.remove("d-none");
    addCryptoForm.classList.add("d-block");
    add_crypto.classList.add("d-none");
}
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
    checkSpan.className = "form-switch mx-3";
    checkSpan.appendChild(switchInput);
    nameSpan.className = "d-inline-block crypto-name";
    nameSpan.textContent = `${content[0]} (${content[1]})`;
    div.classList.add("each-crypto");
    div.appendChild(nameSpan);
    div.appendChild(checkSpan);
    div.appendChild(dotSpan);
    cryptoDiv.appendChild(div);
}
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
        console.log(arr);
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
            cryptoErrorDiv.textContent = responseText;
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
const addGiftCardFun = (content: any[]) => {
    const isChecked: boolean = content[2] === 1 ? true : false;
    let which = "category";
    const parent = content[1] === "category" ? "0" : content[3]
    const div = document.createElement("div") as HTMLDivElement;
    div.className = "cap";
    const each = document.createElement("div") as HTMLDivElement;
    each.className = "each-giftcard";
    each.innerHTML = `<div class="inline-block">
                            <span class="d-inline-block crypto-name">${content[0]}</span>
                            <span class="form-switch mx-3">
                                <input class="form-check-input" type="checkbox" role="switch" onchange="" checked="${isChecked}">
                            </span>
                            <span class="material-icons text-primary three-dots">more_vert</span>
                        </div>`;
    const addDiv = document.createElement("div") as HTMLDivElement;
    addDiv.className = "add-giftcard mt-2";
    addDiv.title = "add sub category"
    addDiv.innerHTML = `<span class="material-icons add-crypto">add</span>
                            <span>Add Subcategory</span>`;
    const form = document.createElement("form") as HTMLFormElement;
    const children:[] = content[4];
    if (children.length > 0) {
        console.log('has children...')
    }
    form.action = "php/add_giftcard.php";
    form.method = "post";
    form.id = "add_new_sub_form";
    form.innerHTML = `<div class="mt-1 my-3">
                                <label for="add_sub" class="form-label settings">Add sub-category (Amazon Giftcards)</label>
                                <input name="sub_cat_name" type="text" class="form-control rad8" id="add_sub" placeholder="e.g Amazon Giftcard" required>
                            </div>
                            <input type="hidden" name="which" value="${content[1]}">
                            <input type="hidden" name="parent" value="${parent}"><!-- parent_id should replaced  -->
                            <button type="submit" class="payment text-center mx-auto">Add Sub-category</button>`;
    each.appendChild(addDiv);
    div.appendChild(each);
    div.appendChild(form);
    giftcardFormDiv.appendChild(div);
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
            addGiftCardFun(arr[1]);
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
            addGiftcardErrorDiv.innerText = data;
            addGiftcardErrorDiv.focus();
        }
        addGiftcardSubmitBtn.disabled = false;
        addGiftcardSubmitBtn.innerHTML = "Add New Giftcard";
    }); 
    aj.start();
}

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