import { Ajax } from "./ajax.js";
declare const bootstrap: any;
let modal: any;
const spinner = `<div class='spinner-border spinner-border-sm' aria-hidden='true' role='status'></div>
                Please wait... `;
const adminRateDiv = document.querySelector("div#admin_rate") as HTMLDivElement;
const buyDiv = document.querySelector("div#buyDiv") as HTMLDivElement;
const sellDiv = document.querySelector("div#sellDiv") as HTMLDivElement;
const loadingContainer = document.querySelector("div#loading") as HTMLDivElement;
const modalTag = document.querySelector("div#modal") as HTMLDivElement;
const modalBody = modalTag.querySelector("div#modal_body") as HTMLDivElement;
let isModalShown: boolean = false;
const applyBtn = document.querySelector("btn#applyBtn") as HTMLButtonElement;
let changes: object[] = [];

applyBtn.onclick = () => {
    const json = JSON.stringify(changes)
    if (json.length > 2) {
        updatePrice(json)
    }
    
}

const addProducts = (arr: object[]) => {
    arr.forEach((obj: any, index:number) => { 
        const which: string = obj.which;
        let hidden = "", col="col-8";
        const type = obj.type === "buy" ? "Buy" : "Sell";
        const parent = obj.type === "buy" ? buyDiv : sellDiv;
        const range = obj.range;
        const rangeName = (range == "range") ? "(10 - 150)" : "";
        let name = (which == "crypto") ? `Crypto ${rangeName}` : obj.name;
        const id = (which == "crypto") ? "" : obj.id;
        if (obj.msg === "not_found") {
            name = (which == "crypto") ? `No ${type} Crypto found ${rangeName}, Add in settings` :
                "No Giftcard found, Add in settings";
            hidden = "d-none";
            col = "col-12"
            parent.innerHTML += `<div class='row justify-content-between mt-3 px-4'>
                        <div class="${col} text-muted text-left">
                <span class="d-inline-block product-name">${name}</span>
                </div></div>`
        } else {
            if (which === "crypto") {
                // for normal price
                parent.innerHTML += `<div class='row justify-content-between mt-3 px-4'>
                        <div class="${col} text-muted text-left">
                <span class="d-inline-block product-name">${name}</span>
                </div>
                <div class="col-4 row justify-content-around ${hidden}">
                    <input which='${which}' type='number' trade-type='${obj.type}' id='${id}'
                    value='${obj.price}' range='normal' class="form-control col admin-rate text-center">
                </div></div>`
                // for low price
                parent.innerHTML += `<div class='row justify-content-between mt-3 px-4'>
                        <div class="${col} text-muted text-left">
                <span class="d-inline-block product-name">${name}(10 - 150)</span>
                </div>
                <div class="col-4 row justify-content-around ${hidden}">
                    <input which='${which}' range='range' type='number' trade-type='${obj.type}' id='${id}'
                     value='${obj.low_price}' class="form-control col admin-rate text-center">
                </div></div>`
            } else {
                const buyPrice = obj['buy_price'];
                const sellPrice = obj['sell_price'];
                buyDiv.innerHTML += `<div class='row justify-content-between mt-3 px-4'>
                        <div class="${col} text-muted text-left">
                <span class="d-inline-block product-name">${name}</span>
                </div>
                <div class="col-4 row justify-content-around ${hidden}">
                    <input which='${which}' type='number' trade-type='buy' id='${id}' value='${buyPrice}' class="form-control col admin-rate text-center">
                </div></div>`;
                sellDiv.innerHTML += `<div class='row justify-content-between mt-3 px-4'>
                        <div class="${col} text-muted text-left">
                <span class="d-inline-block product-name">${name}</span>
                </div>
                <div class="col-4 row justify-content-around ${hidden}">
                    <input which='${which}' type='number' trade-type='sell' id='${id}' value='${sellPrice}' class="form-control col admin-rate text-center">
                </div></div>`
            }
        }
    });
    const allInputs = adminRateDiv.querySelectorAll(`input[type='number']`) as NodeListOf<HTMLInputElement>;
    allInputs.forEach(input => {
        input.onchange = () => {
            if (input.value) {
                const obj = {
                    type: input.getAttribute('trade-type'),
                    id: input.id,
                    value: input.valueAsNumber,
                    which: input.getAttribute('which'),
                    range: input.getAttribute('range')
                }
                let index:any = input.getAttribute('index');
                if (index === undefined || index === null || index < 0) {
                    index = changes.length;
                    changes[index] = obj;
                    input.setAttribute('index', index);
                } else {
                    changes[index] = obj;
                }
            }
            
        }
    })
}
//update price function 
const updatePrice = (data_sent:string) => {
    applyBtn.innerHTML = spinner;
    applyBtn.disabled = true;
    Ajax.fetchPage(`php/update_prices.php`, (data: string) => {
        applyBtn.innerHTML = "Apply";
        applyBtn.disabled = false;
        if (data.toLowerCase().indexOf("success") != -1) {
            showModal(data);
            changes = []
        } else {
            showModal(data, "text-danger");
        }
            
    }, {data_sent});
}
//get all rates
(function () {
    applyBtn.disabled = true;
    Ajax.fetchPage("php/admin_data.php?which=rates", (data: string) => {
        const arr: any[] = JSON.parse(data);
        const message:string = arr[0];
        if (message.toLowerCase().indexOf('success') != -1) {
            loadingContainer.classList.add("d-none");
            adminRateDiv.classList.remove("d-none");
            addProducts(arr[1]);
            applyBtn.disabled = false;
        } else {
            loadingContainer.classList.add("d-none");
            showModal(message, "text-danger");
            setTimeout(() => {
                hideModal();
            }, 1000);
        }
    })
})()

// show and hide modal
const showModal = (message: string, colorClass: string = "text-success") => {
    modalBody.innerText = message;
    modalBody.className = "modal-body py-1 " + colorClass;
    modal = new bootstrap.Modal(modalTag, {
        keyboard: false
    });
    if (!isModalShown) {
        modal.show();
        setTimeout(() => {
            modal.hide();
        }, 2000);
    }
}
const hideModal = () => {
    modal.hide();
    isModalShown = false;
}