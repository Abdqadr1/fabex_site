import { Ajax } from "./ajax.js";
declare const bootstrap: any;
const historyDiv = document.querySelector("div#historyDiv") as HTMLDivElement;
const loadingContainer = document.querySelector("div#loadingContainer") as HTMLDivElement;
const noHistory = document.querySelector("div#no-history") as HTMLDivElement;
const transDetailsModalDiv = document.querySelector("div#trans_details_modal") as HTMLDivElement;
const transDetailsModalBody = transDetailsModalDiv.querySelector("div.modal-body") as HTMLDivElement;
const transDetailsModal = new bootstrap.Modal(transDetailsModalDiv, {
    keyboard: false
})
const formatter = new Intl.NumberFormat("en-NG", { style: 'currency', currency: 'NGN', minimumFractionDigits:1, maximumFractionDigits: 2});

const addHistory = (list: any[]) => {
    const history = document.createElement("div") as HTMLDivElement;
    history.className = "history";
    list.forEach((each:any) => {
        const div = document.createElement("div") as HTMLDivElement;
        div.className = "row justify-content-between transaction";
        div.title = each.descrip;
        div.innerHTML = `<div class="col-8 ml-2">
                        <span class="trans-title">${each.descrip}</span><br>
                        <span class="trans-status">
                            <span class="ellipse" style="--type: var(--${each.status_color});"></span>${each.status_text}</span>
                    </div>
                    <div class="col-4 text-to-right">
                        <span class="trans-amount">${formatter.format(each.amount)}</span><br>
                        <span class="trans-time">${each.time}</span>
                    </div>`;
        div.onclick = () => showDetailsModal(each);
        history.appendChild(div);
    });
    historyDiv.appendChild(history);
}

// get history 
(
    function () {
        console.info("fetching history from server...");
        Ajax.fetchPage("php/get_history.php", (data: string) => {
            const arr: any[] = JSON.parse(data);
            console.log(arr)
            if (arr.length > 0) {
                addHistory(arr);
            } else {
                noHistory.classList.remove("d-none");
            }
            loadingContainer.classList.add("d-none");
        });
    }
)()


// for timeout
import "./timeout.js";

function showDetailsModal(each: any): any {
    const type: string = each.type;
    const which: string = each.which;
    const rate = Math.round(each.amount / each.price);
    transDetailsModalBody.innerHTML = "";
    const div = document.createElement("div");
    div.className = "trans-details";
    div.innerHTML =
        `<p class="header">${each.descrip}</p>
        <div class="stat-div mb-2">
            <p class="stat-name">Status</p>
            <p class="stat-val" style="--type: var(--${each.status_color});">${each.status_text}</span></p>
        </div>
        <div class="stat-div mb-2">
            <p class="stat-name">Amount</p>
            <p class="stat-val">$${each.price} <span class="muted">@ ${rate}</span> = ${formatter.format(each.amount)}</p>
        </div>`
    if (which == "crypto") {
        let to: string = "";
        if (type == "buy") {
            div.innerHTML += `
            <div class="stat-div mb-2">
                <p class="stat-name">To</p>
                <p class="stat-val">${each.wallet_address} <span class="muted">(${each.network})</span></p>
            </div>
            <div class="stat-div mb-2">
                <p class="stat-name">Memo</p>
                <p class="stat-val">${each.memo}</span></p>
            </div>`;
        } else {
            div.innerHTML += `
            <div class="stat-div mb-2">
            <p class="stat-name">To</p>
            <p class="stat-val">${each.account_number} <span class="muted">(${each.bank_name})</span></p>
        </div>`;
        }
        
    } else {
        let to: string = "";
        if (type == "buy") {
            div.innerHTML += `
            <div class="stat-div mb-2">
                <p class="stat-name">To</p>
                <p class="stat-val">${each.email}</p>
            </div>`;
        } else {
            div.innerHTML += `
            <div class="stat-div mb-2">
            <p class="stat-name">To</p>
            <p class="stat-val">${each.account_number} <span class="muted">(${each.bank_name})</span></p>
        </div>`;
        }
    }
    div.innerHTML += `<div class="stat-div mb-2">
                <p class="stat-name">Timestamp</p>
                <p class="stat-val">${each.timestamp}</span></p>
            </div>
            <div class="mb-2 row justify-content-between mx-0">
                <div class="col-8 p-0">
                    <p class="stat-name">Order ID</p>
                    <p class="stat-val text-uppercase">${each.tx_id}</p>
                </div>
                <div class="col-1 text-center">
                    <span class="tt" title="Copy order id">
                        <span class="payment material-icons">
                            content_copy
                        </span>
                    </span>

                </div>
            </div>`;
    transDetailsModalBody.appendChild(div)
    transDetailsModal.show();
}
