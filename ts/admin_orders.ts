import { Ajax } from "./ajax.js";
declare const bootstrap: any;
const whichSelect = document.querySelector("select#which") as HTMLSelectElement;
const buttons = document.querySelectorAll("button.trading") as NodeListOf<HTMLButtonElement>;
const loadingContainer = document.querySelector("div#orders_loading") as HTMLDivElement;
const table = document.querySelector("table#table") as HTMLTableElement;
const tableHeader = table.querySelector("thead#header") as HTMLTableSectionElement
const headers = tableHeader.querySelectorAll("tr.heading") as NodeListOf<HTMLTableRowElement>;
const tableBody = table.querySelector("tbody#table_body") as HTMLTableSectionElement
const spinner = `<div class='spinner-border spinner-border-sm' aria-hidden='true' role='status'></div>
                Please wait... `;
const tabs = document.querySelectorAll(".nav-tab") as NodeListOf<HTMLAnchorElement>;
const modal = document.querySelector("div#modal") as HTMLDivElement;
const modalBody = modal.querySelector("div.modal-body") as HTMLDivElement;
type filterType = { which: string, type: number, status: number };
const filterObj:filterType  = {
    which: "crypto",
    type: 0,
    status: 1
};
whichSelect.onchange = event => {
    if (whichSelect.value != filterObj.which) { 
        filterObj.which = whichSelect.value;
        fetchOrders(filterObj);
    }
    
}
tabs.forEach((tab => {
    tab.onclick = event => {
        event.preventDefault();
        const value:number = Number(tab.getAttribute("aria-value"));
        if (filterObj.status != value) {
            filterObj.status = value;
            tabs.forEach(tb => {
                const val = Number(tb.getAttribute("aria-value"));
                if (val == value) {
                    tb.classList.add("active");
                    tb.classList.add("border-bottom");
                    tb.classList.add("border-2");
                    tb.classList.add("border-primary");
                } else {
                    tb.classList.remove("active");
                    tb.classList.remove("border-bottom");
                    tb.classList.remove("border-2");
                    tb.classList.remove("border-primary");
                }
            });
            fetchOrders(filterObj);
        }
        
    }
}));
buttons.forEach(element => {
    element.onclick = (e) => {
        const value = Number(element.getAttribute("aria-value"))
        if (value != filterObj.type) {
            filterObj.type = value;
            buttons.forEach(btn => {
                const val = Number(btn.getAttribute("aria-value"))
                if (val == value) {
                    btn.classList.add("active");
                } else {
                    btn.classList.remove("active");
                }
            })
            fetchOrders(filterObj);
        }
            
    }
});
//show header
const showHeader = (filters: filterType) => {
    const w = filters.which == "crypto" ? 0 : 1;
    const s = filters.type + " " + w;
    headers.forEach(header => {
        const value = header.getAttribute("aria-value");
        if (value == s) {
            header.classList.remove("d-none");
        } else {
            header.classList.add("d-none");
        }
    });
    tableHeader.classList.remove("d-none");
}
const copyFunc = (input: HTMLInputElement | string) => {
    const value = (typeof input === "string") ? input : input.value;
    navigator.clipboard.writeText(value);
    alert("Text copied!")
}
const cellNames:any = { 
    "00": [8,[ "id","name","product", ["amount","price"], ["wallet_address", "network"], "memo", "time"]],
    "10":[7,["id", "name", "product",["amount", "price"], ["account_number", "bank_name"], "time"]],
    "01":[7,["id", "name",  "product", ["amount", "price"],"email","time"]],
    "11":[7,["id", "name", "product", ["amount", "price"],["account_number", "bank_name"],"time"]]
}
// change table 
const changeTable = (list: any[], filters: filterType) => {
    showHeader(filters);
    const which = filters.which;
    const w = filters.which == "crypto" ? 0 : 1;
    const cell:any[] = cellNames[filters.type +""+ w];
    const numberOfCells = cell[0];
    tableBody.innerHTML = "";
    console.log(list);
    if (list.length > 0) {
        list.forEach(order => {
            const tr = document.createElement("tr") as HTMLTableRowElement;
            const cellNames: any[] = cell[1];
            for (let i = 0; i < numberOfCells; i++) {
                const name = cellNames[i];
                const td = document.createElement("td") as HTMLTableCellElement;
                if (typeof name === "string") {
                    td.innerText = order[name];
                    if (name === "memo") {
                        td.innerHTML += "<span class='copy material-icons' title='copy full text'>content_copy</span>";
                        const copy = td.querySelector("span.copy") as HTMLSpanElement;
                        if(copy) copy.onclick = () => copyFunc(order[name]);
                    }
                } else if (name instanceof Array) {
                    let content:string = order[name[0]];
                    let extra = order[name[1]];
                    //for bank and account number
                    if (name[0] == 'account_number') {
                        content = order[name[0]] || order["user_account_number"];
                        extra = order[name[1]] || order["user_bank"];
                    }
                    // Don't show copy icon for amount cell
                    const addCopy = name[0] == "amount"?"":"<span class='copy material-icons' title='copy full text'>content_copy</span>";
                    const val = content.length > 18 ? content.substring(0,18)+"..." : content;
                        td.innerHTML = `<span class="val">${val}${addCopy}
                        </span><br><span class="extra-detail">${extra}</span>
                        <input type="hidden" id="hidden" value="${content}"/>`;
                    const copy = td.querySelector("span.copy") as HTMLSpanElement;
                    if(copy) copy.onclick = () => copyFunc(td.querySelector("input#hidden") as HTMLInputElement);
                } else {
                    console.log(i, "Not defined", filters.status);
                    const id = order['id'];
                    const first = filters.status === 2 ? "reject" : "approve";
                    const second = filters.status === 1 ? "reject" : "undo"
                    td.className = "d-flex justify-content-center align-top";
                    td.innerHTML = `<button aria-id='${id}' class="action-button text-capitalize ${first}">${first}</button>
                    <button aria-id='${id}' class="action-button text-capitalize ${second}">${second}</button>`;
                    //registering click events for buttons
                    td.querySelectorAll("button").forEach(btn => {
                        btn.onclick = () => {
                            const id = btn.getAttribute("aria-id");
                            const val = btn.innerText;
                            console.log("clicking ", id, val);
                            // change the transaction status
                            
                        }
                    })
                }
                tr.appendChild(td);
            }
            tableBody.appendChild(tr);
        })
    } else {
        const html = `<tr><td class='text-center text-danger fs-5' colspan='${numberOfCells}' class="table-active">No order found...</td>
        </tr>`;
        tableBody.innerHTML = html;
    }
    table.classList.remove("d-none");
}

//show and hide modal
let myModal: any;
const showModal = (message: string, style: string) => {
    modalBody.innerText = message;
    modalBody.className = "modal-body py-1 " + style;
    myModal = new bootstrap.Modal(modal, {
        keyboard: false
    });
    myModal.show(); 
}
const hideModal = () => myModal.hide();
// fetch orders
const fetchOrders = (filters:filterType) => {
    const which = filters.which;
    const status = filters.status;
    const action = filters.type;
    loadingContainer.classList.remove("d-none");
    table.classList.add("d-none");
    Ajax.fetchPage(`php/admin_data.php?which=orders&type=${which}&action=${action}&status=${status}`, (data: string) => {
        // console.log(data);
        const arr: any[] = JSON.parse(data);
        const message: string = arr[0];
        if (message.toLowerCase().indexOf("success") != -1) {
            changeTable(arr[1], filters);
        } else {
            const text = "Search queries: " + JSON.stringify(filterObj) + "\n \n" + message;
            showModal(text, "text-danger");
            changeTable([], filters);
            setTimeout(() => {
                hideModal();
            }, 3000);
        }
        loadingContainer.classList.add("d-none");
    })
}

// get all orders
(function () {
    fetchOrders(filterObj);
})();