import { Ajax } from "./ajax.js";
declare const bootstrap: any;
let modal: any;
const adminRateDiv = document.querySelector("div#admin_rate") as HTMLDivElement;
const loadingContainer = document.querySelector("div#loading") as HTMLDivElement;
const rateColumns = document.querySelectorAll("div.rate-column") as NodeListOf<HTMLDivElement>;
const modalTag = document.querySelector("div#modal") as HTMLDivElement;
const modalBody = modalTag.querySelector("div#modal_body") as HTMLDivElement;

const addProducts = (arr: [][]) => {
    let counter = 0, len = rateColumns.length;
    arr.forEach((array: any[]) => { 
        let index: number = counter % len;
        let parent = rateColumns[index];
        const which: string = array[0];
        const id = (which == "crypto") ? "" : array[1];
        const price = (which == "crypto") ? array[1] : array[3];
        const type = (which == "crypto") ? (array[2] === "buy"?"Buy":"Sell") : "";
        const name = (which == "crypto") ? `Crypto (${type})` : array[2];

        const rowDiv = document.createElement("div") as HTMLDivElement;
        rowDiv.className = "row justify-content-between mt-3 px-4";
        rowDiv.innerHTML = `<div class="col-7 text-muted text-left">
            <span class="d-inline-block product-name">${name}</span>
        </div>
        <div class="col-2">
            <input which='${which}' type="number" class="form-control admin-rate text-center" id='${id}' value='${price}'>
        </div>
        <div class='spinner-border spinner-border-sm mt-2 text-primary d-none' aria-hidden='true' role='status' id="loader"></div>
        <span class="material-icons text-primary mt-2 d-none" style="width: 24px;" id="mark_icon">done</span>`;

        const input = rowDiv.querySelector("input") as HTMLInputElement;
        input.onchange = event => {
            updatePrice(input, rowDiv, type.toLowerCase());
        }
        parent.appendChild(rowDiv);
        counter++;
    });
    
}
//update price function 
const updatePrice = (input: HTMLInputElement, row: HTMLDivElement, type: string) => {
    const which = input.getAttribute("which");
    const id = input.id;
    const price = input.value;
    const loader = row.querySelector("div#loader") as HTMLDivElement;
    loader.classList.remove("d-none");
    const icon = row.querySelector("span#mark_icon") as HTMLSpanElement;
    Ajax.fetchPage(`php/update_prices.php`, (data: string) => {
        if (data.toLowerCase().indexOf("success") != -1) {
            showModal(data);
        } else {
            showModal(data, "text-danger");
        }
        loader.classList.add("d-none");
    }, {which, id, price, type});
}
//get all rates
(function () {
    Ajax.fetchPage("php/admin_data.php?which=rates", (data: string) => {
        const arr:any[] = JSON.parse(data);
        const message:string = arr[0];
        if (message.toLowerCase().indexOf('success') != -1) {
            loadingContainer.classList.add("d-none");
            adminRateDiv.classList.remove("d-none");
            addProducts(arr[1]);
        } else {
            loadingContainer.classList.add("d-none");
            showModal(message, "text-danger");
            setTimeout(() => {
                hideModal();
            }, 2000);
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
    modal.show();
    setTimeout(() => {
        modal.hide();
    }, 2000);
}
const hideModal = () => modal.hide();