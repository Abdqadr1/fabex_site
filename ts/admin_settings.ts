import { Ajax } from "./ajax.js";
declare const bootstrap: any;
const giftcardLoading = document.querySelector("div#giftcard_loading") as HTMLDivElement;
// for buy cryptos 
const buyCryptoLoading = document.querySelector("div#buy_crypto_loading") as HTMLDivElement;
const buyCryptoDiv = document.querySelector("div#buy_crypto_div") as HTMLDivElement;
const addBuyCrypto = buyCryptoDiv.querySelector("div#add_crypto") as HTMLDivElement;
const addBuyCryptoForm = document.querySelector("form#add_buycrypto_form") as HTMLFormElement;
const addBuyCryptoSubmitBtn = addBuyCryptoForm.querySelector("button") as HTMLButtonElement;
const buyCryptoErrorDiv = addBuyCryptoForm.querySelector("div#errorDiv") as HTMLDivElement;
const buyNetwork1Input = addBuyCryptoForm.querySelector("input#network1") as HTMLInputElement;
const addNetworkBuy = addBuyCryptoForm.querySelector("div#add_network_buy") as HTMLDivElement;
const allBuyNetworksInput = addBuyCryptoForm.querySelector("input#all_networks") as HTMLInputElement;

//  for sell cryptos 
const sellCryptoLoading = document.querySelector("div#sell_crypto_loading") as HTMLDivElement;
const sellCryptoDiv = document.querySelector("div#sell_crypto_div") as HTMLDivElement;
const addSellCrypto = sellCryptoDiv.querySelector("div#add_crypto") as HTMLDivElement;
const addSellCryptoForm = document.querySelector("form#add_sellcrypto_form") as HTMLFormElement;
const addSellCryptoSubmitBtn = addSellCryptoForm.querySelector("button") as HTMLButtonElement;
const sellCryptoErrorDiv = addSellCryptoForm.querySelector("div#errorDiv") as HTMLDivElement;
const sellNetwork1Input = addSellCryptoForm.querySelector("input#network1") as HTMLInputElement;
const addNetworkSell = addSellCryptoForm.querySelector("div#add_network_sell") as HTMLDivElement;
const allSellNetworksInput = addSellCryptoForm.querySelector("input#all_networks") as HTMLInputElement;


// for banks
const addBankForm = document.querySelector("form#addBankForm") as HTMLFormElement;
const addBankSubmitBtn = addBankForm.querySelector("button") as HTMLButtonElement;
const bankSelect = addBankForm.querySelector("select#bankname") as HTMLSelectElement;
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

const buyNetworks: string[] = []; const sellNetworks: string[] = [];
let buyCryptos: any[]; let sellCryptos: any[]; let allGiftcards: any[];
const findIndex = (arr: [][], id: number) => {
    let index:number = 0; let i;
    arr.forEach((ar: any[]) => {
        if (id == ar[0]) {
            i = index;
        }
        index++;
    });
    return i;
}

const writeNetwork = (type: string, value:string, index:number) => {
    if (type === "buy") {
        buyNetworks[index] = value;
    } else {
        sellNetworks[index] = value;
    }
}
buyNetwork1Input.oninput = () => {
    writeNetwork("buy", buyNetwork1Input.value, 0)
    allBuyNetworksInput.value = buyNetworks.join(",");
}
sellNetwork1Input.oninput = () => {
    writeNetwork("sell", sellNetwork1Input.value, 0)
    allSellNetworksInput.value = sellNetworks.join(",");
}
addNetworkBuy.onclick = () => {
    const no:number = Number(addBuyCryptoForm.getAttribute("aria-network"));
    const newNode = document.createElement("div") as HTMLDivElement
    newNode.className ="mt-3"
    newNode.innerHTML =
        ` <label for="network1" class="form-label">Network ${no + 1}</label>
    <input id="network${no + 1}" name="network${no + 1}" type="text" class="form-control form-control-lg rad8" placeholder="Enter Network ${no + 1}">`;
    const input = newNode.querySelector("input") as HTMLInputElement;
    input.oninput = () => {
        writeNetwork("buy", input.value, no)
        allBuyNetworksInput.value = buyNetworks.join(",");
    }
    addBuyCryptoForm.insertBefore(newNode, addNetworkBuy)
    addBuyCryptoForm.setAttribute("aria-network", (Number(no + 1)).toString());
}
addNetworkSell.onclick = () => {
    const no:number = Number(addSellCryptoForm.getAttribute("aria-network"));
    const newNode = document.createElement("div") as HTMLDivElement
    newNode.className ="mt-3"
    newNode.innerHTML =
        ` <label for="network1" class="form-label">Network ${no + 1}</label>
    <input id="network${no + 1}" name="network${no + 1}" type="text" class="form-control form-control-lg rad8" placeholder="Enter Network ${no + 1}">`;
    const input = newNode.querySelector("input") as HTMLInputElement;
    input.oninput = () => {
        writeNetwork("sell", input.value, no)
        allSellNetworksInput.value = sellNetworks.join(",");
    }
    addSellCryptoForm.insertBefore(newNode, addNetworkSell)
    addSellCryptoForm.setAttribute("aria-network", (Number(no + 1)).toString());
}
let adminBanks: [][] = [];

// show crypto form
addBuyCrypto.onclick = event => {
    addBuyCryptoForm.classList.remove("d-none");
    addBuyCryptoForm.classList.add("d-block");
    addBuyCrypto.classList.add("d-none");
}
addSellCrypto.onclick = event => {
    addSellCryptoForm.classList.remove("d-none");
    addSellCryptoForm.classList.add("d-block");
    addSellCrypto.classList.add("d-none");
}
// add crypto function
const addCrypto = (content: any[], type:string) => {
    const div = document.createElement("div") as HTMLDivElement;
    div.className = "each-crypto";
    const name = `${content[1]} (${content[2].toUpperCase()})`;
    div.innerHTML = `<div><span id='${content[0]}' class="d-inline-block crypto-name" tabindex="-1">${name}</span>
                    <span class="form-switch mx-3">
                        <input id='${content[0]}' class="form-check-input" type="checkbox" role="switch">
                    </span>
                    <div class="d-inline-block">
                        <span data-bs-toggle="dropdown" id="dropdown" class="material-icons text-primary three-dots dropdown-toggle" aria-expanded='false'>more_vert</span>
                        <ul class="dropdown-menu" aria-labelledby="dropdown">
                            <li><span id='edit' class="dropdown-item text-primary">Edit</span></li>
                            <li><span id='delete' class="dropdown-item text-danger">Delete</span></li>
                        </ul>
                    </div>
                    <span id='crypto_network${content[0]}' class='crypto_network'>${content[3]}</span></div>`;
    const switchInput = div.querySelector("input") as HTMLInputElement;
    const deleteAction = div.querySelector("span#delete") as HTMLSpanElement;
    const editAction = div.querySelector("span#edit") as HTMLSpanElement;
    editAction.onclick = () => showEdit("crypto", content, type);
    deleteAction.onclick = () => deleteProduct("crypto", div, content[0], type);
    switchInput.checked = content[content.length - 1];
    switchInput.onchange = event => toggleProduct(event, "crypto", type);
    if (type === "buy") {
        buyCryptoDiv.insertBefore(div, buyCryptoDiv.lastElementChild);
    } else {
        sellCryptoDiv.insertBefore(div, sellCryptoDiv.lastElementChild);
    }
}
// crypto submit
addBuyCryptoForm.onsubmit = event => {
    event.preventDefault();
    const aj = new Ajax(addBuyCryptoForm as HTMLFormElement);
    aj.setBefore(() => {
        addBuyCryptoSubmitBtn.disabled = true;
        addBuyCryptoSubmitBtn.innerHTML = spinner;
    })
    aj.setAfter((responseText:string) => {
        // console.log(responseText)
        const arr:any[] = JSON.parse(responseText);
        const message = arr[0];
        if (message.toLowerCase().indexOf("success") != -1) {
            arr.shift();
            arr.forEach(e => {
                addCrypto(e, "buy");
            })
            buyCryptoErrorDiv.classList.remove("d-block");
            buyCryptoErrorDiv.classList.add("d-none");
            addBuyCryptoForm.classList.remove("d-block");
            addBuyCryptoForm.classList.add("d-none");
            addBuyCrypto.classList.remove("d-none");
            addBuyCrypto.classList.add("d-block"); 
            addBuyCryptoForm.reset();
        } else {
            buyCryptoErrorDiv.classList.remove("d-none");
            buyCryptoErrorDiv.classList.add("d-block");
            buyCryptoErrorDiv.textContent = message;
            buyCryptoErrorDiv.focus()
        }
        addBuyCryptoSubmitBtn.disabled = false;
        addBuyCryptoSubmitBtn.innerHTML = "Add New Crypto";
    })
    aj.start()
}
addSellCryptoForm.onsubmit = event => {
    event.preventDefault();
    const aj = new Ajax(addSellCryptoForm as HTMLFormElement);
    aj.setBefore(() => {
        addSellCryptoSubmitBtn.disabled = true;
        addSellCryptoSubmitBtn.innerHTML = spinner;
    })
    aj.setAfter((responseText:string) => {
        // console.log(responseText)
        const arr:any[] = JSON.parse(responseText);
        const message = arr[0];
        if (message.toLowerCase().indexOf("success") != -1) {
            arr.shift();
            arr.forEach(e => {
                addCrypto(e, "sell");
            })
            sellCryptoErrorDiv.classList.remove("d-block");
            sellCryptoErrorDiv.classList.add("d-none");
            addSellCryptoForm.classList.remove("d-block");
            addSellCryptoForm.classList.add("d-none");
            addSellCrypto.classList.remove("d-none");
            addSellCrypto.classList.add("d-block"); 
            addSellCryptoForm.reset();
        } else {
            sellCryptoErrorDiv.classList.remove("d-none");
            sellCryptoErrorDiv.classList.add("d-block");
            sellCryptoErrorDiv.textContent = message;
            sellCryptoErrorDiv.focus()
        }
        addSellCryptoSubmitBtn.disabled = false;
        addSellCryptoSubmitBtn.innerHTML = "Add New Crypto";
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
            const arr: any[] = JSON.parse(data);
            console.log(arr);
            const bank = arr[1];
            adminBanks.push(bank)
            showBanks();
            bankErrorDiv.classList.add("d-none");
            bankSuccessDiv.classList.remove("d-none");
            bankSuccessDiv.textContent = arr[0];
            bankSuccessDiv.focus();
            addBankForm.reset();
        } else {
            bankSuccessDiv.classList.add("d-none");
            bankErrorDiv.classList.remove("d-none");
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
            div.innerHTML = `<span id='${content[0]}' class="d-inline-block crypto-name">${content[1]}</span>
                                <span class="form-switch mx-3">
                                    <input id='${content[0]}' class="form-check-input" type="checkbox" role="switch" checked>
                                </span>
                                <div class="d-inline-block">
                                    <span data-bs-toggle="dropdown" id="dropdown" class="material-icons text-primary three-dots dropdown-toggle" aria-expanded='false'>more_vert</span>
                                    <ul class="dropdown-menu" aria-labelledby="dropdown">
                                        <li><span id='edit' class="dropdown-item text-primary">Edit</span></li>
                                        <li><span id='delete' class="dropdown-item text-danger">Delete</span></li>
                                        <li><span id='toggle' class="dropdown-item text-secondary">Add To Top 10</span></li>
                                    </ul>
                                </div>`;
            const input = div.querySelector("input") as HTMLInputElement;
            const deleteAction = div.querySelector("span#delete") as HTMLSpanElement;
            const editAction = div.querySelector("span#edit") as HTMLSpanElement;
            const toggleAction = div.querySelector("span#toggle") as HTMLSpanElement;
            editAction.onclick = () => showEdit("giftcard", content);
            deleteAction.onclick = () => deleteProduct("giftcard", div, content[0], "sub_category");
            toggleAction.onclick = () => toggleTopTen(content[0], 0, toggleAction);
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
                            <span id='${id}' class="d-inline-block crypto-name">${content[1]}</span>
                            <span class="form-switch mx-3">
                                <input id='${id}' class="form-check-input" type="checkbox" role="switch">
                            </span>
                            <div class="d-inline-block">
                                    <span data-bs-toggle="dropdown" id="dropdown" class="material-icons text-primary three-dots dropdown-toggle" aria-expanded='false'>more_vert</span>
                                    <ul class="dropdown-menu" aria-labelledby="dropdown">
                                        <li><span id='edit' class="dropdown-item text-primary">Edit</span></li>
                                        <li><span id='delete' class="dropdown-item text-danger">Delete</span></li>
                                    </ul>
                                </div>
                        </div>`;
    const input = each.querySelector("input") as HTMLInputElement;
    input.checked = isChecked;
    let deleteAction = each.querySelector("span#delete") as HTMLSpanElement;
    let editAction = each.querySelector("span#edit") as HTMLSpanElement;
    editAction.onclick = () => showEdit("giftcard", content);
    deleteAction.onclick = () => deleteProduct("giftcard", div, id, "category");
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
            const isTop10 = cat[5] == 1 ? true : false;
            const tenName = isTop10 ? "Remove From" : "Add To";
            const div = document.createElement("div") as HTMLDivElement
            div.className = "inline-block mt-2";
            div.innerHTML = `<span id='${cat[0]}' class="d-inline-block crypto-name">${cat[1]}</span>
                                <span class="form-switch mx-3">
                                    <input id='${cat[0]}' class="form-check-input" type="checkbox" role="switch">
                                </span>
                                <div class="d-inline-block">
                                    <span data-bs-toggle="dropdown" id="dropdown" class="material-icons text-primary three-dots dropdown-toggle" aria-expanded='false'>more_vert</span>
                                    <ul class="dropdown-menu" aria-labelledby="dropdown">
                                        <li><span id='edit' class="dropdown-item text-primary">Edit</span></li>
                                        <li><span id='delete' class="dropdown-item text-danger">Delete</span></li>
                                        <li><span id='toggle' class="dropdown-item text-secondary">${tenName} Top 10</span></li>
                                    </ul>
                                </div>`;
            const input = div.querySelector("input") as HTMLInputElement;
            input.checked = checked;   
            let deleteAction = div.querySelector("span#delete") as HTMLSpanElement;
            let editAction = div.querySelector("span#edit") as HTMLSpanElement;
            let toggleAction = div.querySelector("span#toggle") as HTMLSpanElement;
            editAction.onclick = () => showEdit("giftcard", cat);
            deleteAction.onclick = () => deleteProduct("giftcard", div, cat[0], "sub_category");
            toggleAction.onclick = () => toggleTopTen(cat[0], cat[5], toggleAction);
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
const toggleProduct = (event: Event, which:string, type:string="null") => {
    event.preventDefault();
    const el = event.target as HTMLInputElement;
    const id = el.id;
    const status = el.checked ? 1 : 0;
    Ajax.fetchPage(`php/toggle.php`, (data: string) => {
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
    }, {status, id, which, type})
}
//show and hide modal
let myModal: any;
const showModal = (message: string, style:string = "text-success", duration:number = 0) => {
    const content = document.querySelector("div#modal_body") as HTMLDivElement;
    content.innerText = message;
    content.className = "modal-body py-1 " + style;
    myModal = new bootstrap.Modal(document.getElementById('modal'), {
        keyboard: false
    });
    myModal.show();
    if (duration > 0) {
        setTimeout(() => {
            myModal.hide();
        }, duration);
    }
}
const showEdit = (which: string, arr: any[], type:string = "null") => {
    const editModal = document.querySelector("div#editModal") as HTMLDivElement;
    const body = editModal.querySelector("div#edit_body") as HTMLDivElement;
    body.innerHTML = "";
    if (which === "crypto") {
        body.innerHTML = `
        <div tabindex="-1" class="my-2 alert alert-danger mx-0 d-none text-center" id="errorDiv" role="alert"></div>
        <div tabindex="-1" class="my-2 alert alert-success mx-0 d-none text-center" id="successDiv" role="alert"></div>
        <input value='${arr[1]}' name="coin_name" class="form-control form-control-lg rad8 mt-3" placeholder="Enter coin name" required>
        <input value='${arr[2]}' name="short_name" class="form-control form-control-lg rad8 mt-3" placeholder="Short name" required>
        <input value='${arr[3]}' name="network" class="form-control form-control-lg rad8 mt-3" placeholder="Enter network" required>
        <input id="hidden" type="hidden" value='${which}' name='which'>
        <input id="type" type="hidden" value='${type}' name='type'>
        <input type="hidden" value='${arr[0]}' name='id'>`;
        if (type === "sell") {
            body.innerHTML += `<input value='${arr[4]}' name="address" class="form-control form-control-lg rad8 mt-3" placeholder="Enter wallet address" required>
            <input value='${arr[5]}' name="memo" class="form-control form-control-lg rad8 mt-3" placeholder="Memo" required>
            `;
        }
    } else {
        body.innerHTML = `
        <div tabindex="-1" class="my-2 alert alert-danger mx-0 d-none text-center" id="errorDiv" role="alert"></div>
        <div tabindex="-1" class="my-2 alert alert-success mx-0 d-none text-center" id="successDiv" role="alert"></div>
        <input value='${arr[1]}' name="name" class="form-control rad8 mt-3" placeholder="Enter giftcard name" required>
        <input type="hidden" value='${which}' name='which'>
        <input type="hidden" value='${arr[0]}' name='id'>`;
    }
    const submitBtn = editModal.querySelector("button#submitBtn") as HTMLButtonElement;
    submitBtn.onclick = (event) => updateProduct(which, editModal, arr, type);
    // show modal
    const modal = new bootstrap.Modal(editModal, {
        keyboard: false
    });
    modal.show();
}
const hideModal = () => myModal.hide();

const updateProduct = (which: string, modal: HTMLDivElement, data: any[], type:string="null") => {
    const btn = modal.querySelector("button#submitBtn") as HTMLButtonElement;
    const body = modal.querySelector("div#edit_body") as HTMLDivElement;
    const errorDiv = body.querySelector("div#errorDiv") as HTMLDivElement;
    const successDiv = body.querySelector("div#successDiv") as HTMLDivElement;
    const inputs = body.querySelectorAll("input") as NodeListOf<HTMLInputElement>;
    const params:any = {};
    inputs.forEach(input => {
        params[input.name] = input.value;
    });
    const id = data[0];
    let parent: HTMLDivElement = which === "crypto" ? (type === "buy" ? buyCryptoDiv:sellCryptoDiv) : giftcardDiv;
    const nameSpan = parent.querySelector("span#" + CSS.escape(id)) as HTMLSpanElement;
    const networkSpan = parent.querySelector("span#crypto_network" + CSS.escape(id)) as HTMLSpanElement;
    btn.disabled = true; btn.innerHTML = spinner;
    Ajax.fetchPage("php/edit_product.php", (data: string) => {
        if (data.indexOf("success") != -1) {
            if (which === "giftcard") { 
                nameSpan.innerText = params.name;
            } else {
                nameSpan.innerText = `${params.coin_name} (${params.short_name})`;
                networkSpan.innerText = `${params.network}`;
                if (type === "buy") {
                    const index: any = findIndex(buyCryptos, id);
                    const old: any[] = buyCryptos[index];
                    old[1] = params.coin_name;
                    old[2] = params.short_name;
                    old[3] = params.network;
                    buyCryptos[index] = old;
                    // console.log(buyCryptos[index])
                } else {
                    const index:any = findIndex(sellCryptos, id);
                    const old: any[] = sellCryptos[index];
                    old[1] = params.coin_name;
                    old[2] = params.short_name;
                    old[3] = params.network;
                    old[4] = params.address;
                    old[5] = params.memo;
                    sellCryptos[index] = old;
                    // console.log(sellCryptos[index])
                }
            }
            errorDiv.classList.add("d-none");
            successDiv.innerText = data;
            successDiv.classList.remove("d-none");
        } else {
            errorDiv.innerText = data;
            errorDiv.classList.remove("d-none");
            successDiv.classList.add("d-none");
        }
        btn.disabled = false; btn.innerText = "Change";
    }, params);
}

//delete product
const deleteProduct = (which: string, el: HTMLSpanElement, id: number, type: string = "null") => {
    console.log(id, type);
    if (confirm(`Delete ${which}, Are you sure?`)) {
        const parent = el.parentElement as HTMLDivElement;
        console.log(id);
        Ajax.fetchPage("php/delete_product.php", (data: string) => {
            if (data.toLowerCase().indexOf("success") != -1) {
                showModal(data, "text-success", 3000);
                //remove element
                parent.removeChild(el);
            } else {
                showModal(data, "text-danger", 3000);
            }
        },{which, id, type})
    }
    
}
// get all banks
(function () {
    Ajax.fetchPage("../account/php/data.php?which=banks", (data: string) => {
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
const getAllBuyCryptos = () => {
    Ajax.fetchPage("php/admin_data.php?which=buy_crypto", (data: string) => {
        const object: { success: [][] } = JSON.parse(data);
        // console.log(object)
        const keys = Object.keys(object);
        const message: string = keys[0];
        if (message.toLowerCase().indexOf('success') != -1) {
            const array: [][] = object.success;
            buyCryptos = array;
            buyCryptos.forEach(arr => {
                addCrypto(arr, "buy");
            });
            buyCryptoLoading.classList.add("d-none");
            buyCryptoDiv.classList.remove("d-none");
        } else {
            buyCryptoLoading.classList.add("d-none");
            buyCryptoDiv.classList.remove("d-none");
        }
    }); 
}
const getAllSellCryptos = () => {
    Ajax.fetchPage("php/admin_data.php?which=sell_crypto", (data: string) => {
        const object: { success: [][] } = JSON.parse(data);
        // console.log(object)
        const keys = Object.keys(object);
        const message: string = keys[0];
        if (message.toLowerCase().indexOf('success') != -1) {
            const array: [][] = object.success;
            sellCryptos = array;
            sellCryptos.forEach(arr => {
                addCrypto(arr, "sell");
            });
            sellCryptoLoading.classList.add("d-none");
            sellCryptoDiv.classList.remove("d-none");
        } else {
            sellCryptoLoading.classList.add("d-none");
            sellCryptoDiv.classList.remove("d-none");
        }
    }); 
}
const getAllGiftcards = () => {
    Ajax.fetchPage("php/admin_data.php?which=giftcard", (data: string) => {
        const arr = JSON.parse(data);
        allGiftcards = arr;
        const cat:[] = arr[0];
        const subCat:[] = arr[1];
        if (data.toLowerCase().indexOf('no giftcard.') != -1) {
            giftcardLoading.classList.add("d-none");
            giftcardDiv.classList.remove("d-none");
        } else {
            if (cat.length > 0) {
                cat.forEach((category: any[]) => {
                    const id = category[0];
                    const children: any[] = [];
                    subCat.forEach((subCategory: any[]) => {
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
}
//get all cryptos 
(function () {
    getAllBuyCryptos();
    getAllSellCryptos();
})();
//get all giftcards 
(function () {
    getAllGiftcards();
})();
//get admin bank details 
const banksTableBody = document.querySelector("table#banks-table tbody") as HTMLTableSectionElement;
(function () {
    Ajax.fetchPage("php/admin_data.php?which=bank", (data: string) => {
        if (data.substring(0, 15).toLowerCase().indexOf('success') != -1) {
            const arr = JSON.parse(data);
            adminBanks = arr[1]
            showBanks();
        } else {
            banksTableBody.innerHTML = `<td class='text-center text-danger' colspan='5'>No bank account found!</td>`;
        }
    })
})();

// delete Admin Bank
const deleteAdminBank = (span: HTMLSpanElement, tr: HTMLTableRowElement) => {
    if (confirm("Delete admin bank account")) {
        const ref = span.getAttribute("ref")
        span.textContent = "deleting..."
        Ajax.fetchPage("php/admin_data.php?which=deleteBank", (data: string) => {
            if (data.toLowerCase().indexOf("success") != -1) {
                for (let i = 0; i < adminBanks.length; i++){
                    const bank:string[] = adminBanks[i];
                    if (bank[0] == ref) {
                        adminBanks.splice(i, 1);
                        break;
                    }
                }
                showBanks();
            } else {
                span.textContent = "delete";
                alert(data); 
            }
        }, {ref})
    }
}

// function to show admin banks
const showBanks = () => {
    banksTableBody.innerHTML = "";
    if (adminBanks.length > 0) {
        adminBanks.forEach((bank:string[], index) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `<th scope="row">${index + 1}</th>
                <td>${bank[1]}</td>
                <td>${bank[2]}</td>
                <td>${bank[3]}</td>
                <td class="">
                    <span class="material-icons text-danger bank-icon" ref='${bank[0]}' title="Delete Account">delete</span>
                </td>`;
            const icon = tr.querySelector("span") as HTMLSpanElement;
            icon.onclick = event => deleteAdminBank(event.target as HTMLSpanElement, tr)
            banksTableBody.appendChild(tr);
        })
    } else {
        banksTableBody.innerHTML = `<td class='text-center text-danger' colspan='5'>No bank account found!</td>`; 
    }
    
}


// for adding and removing giftcard sub categories from the top 10
function toggleTopTen(_id:number, _prevstate:number, el: HTMLSpanElement): void {
    Ajax.fetchPage(`php/admin_data.php?which=toggle_ten`, (data: string) => {
        const response: {message:string} = JSON.parse(data);
        if (response.message.indexOf("success") != -1) {
            showModal(response.message)
            let text, newState:number;
            if (_prevstate === 1) {
                text = "Add To"
                newState = 0;
            } else {
                text = "Remove From";
                newState = 1
            }
            el.innerHTML = `${text} Top 10`;
            el.onclick = () => toggleTopTen(_id, newState, el);
        } else {
            showModal(response.message, 'text-danger')
            console.error(response.message);
        }
    }, { _id, _prevstate})
}
