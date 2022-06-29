import { Ajax } from "./ajax.js";
declare const bootstrap: any;
const whichSelect = document.querySelector("select#which") as HTMLSelectElement;
const buttons = document.querySelectorAll("button.trading") as NodeListOf<HTMLButtonElement>;
const loadingContainer = document.querySelector("div#orders_loading") as HTMLDivElement;
const table = document.querySelector("table#table") as HTMLTableElement;
const tableHeader = table.querySelector("thead#header") as HTMLTableSectionElement
const headers = tableHeader.querySelectorAll("tr.heading") as NodeListOf<HTMLTableRowElement>;
const tableBody = table.querySelector("tbody#table_body") as HTMLTableSectionElement
const spinner = `<div class='spinner-border text-success spinner-border-sm' aria-hidden='true' role='status'></div>`;
const tabs = document.querySelectorAll(".nav-tab") as NodeListOf<HTMLAnchorElement>;
const modal = document.querySelector("div#modal") as HTMLDivElement;
const modalBody = modal.querySelector("div.modal-body") as HTMLDivElement;
const detailsModal = document.querySelector("div#details_modal") as HTMLDivElement;
const searchForm = document.querySelector("form#searchForm") as HTMLFormElement;
const searchInput = searchForm.querySelector("[aria-describedby=search]") as HTMLInputElement
const detailsModalBody = detailsModal.querySelector("div#details_modal_body") as HTMLDivElement;
const activityFeedTemplate = document.querySelector("[activity-feed-template]") as HTMLTemplateElement;
type filterType = { which: string, type: number, status: number, keyword:string|null };
type feedType = {description:string, full_name:string,time: string}

searchInput.oninput = () => filterObj.keyword = searchInput.value
searchForm.onsubmit = function(event){
    event.preventDefault();
    fetchOrders(filterObj)
}
const filterObj:filterType  = {
    which: "crypto",
    type: 0,
    status: 1,
    keyword: ''
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
    "00": [8,[ "tx_id","name","product", ["price","amount"], ["wallet_address", "network"], "memo", "time"]],
    "10":[7,["tx_id", "name", "product",["price","amount"], ["account_number", "bank_name"], "time"]],
    "01":[7,["tx_id", "name",  "product", ["price","amount"],"email","time"]],
    "11":[7,["tx_id", "name", "product", ["price","amount"],["account_number", "bank_name"],"time"]]
}
// price and amount formatter
const dollarFormatter = new Intl.NumberFormat("en-US", {style:'currency',currency:'USD', maximumFractionDigits:2, minimumFractionDigits:1})
const nairaFormatter = new Intl.NumberFormat("en-NG", {style:'currency',currency:'NGN', maximumFractionDigits:2, minimumFractionDigits:1})
const dateFormatter = new Intl.DateTimeFormat("en-NG", {
    month: "numeric",
    day:"2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12:true,
    year: "2-digit"
})
const todayFormatter = new Intl.DateTimeFormat("en-NG", {
    hour: "2-digit",
    minute: "2-digit",
    hour12:true,
})
// change table 
const changeTable = (list: any[], filters: filterType) => {
    showHeader(filters);
    const w = filters.which == "crypto" ? 0 : 1;
    const cell:any[] = cellNames[filters.type +""+ w];
    const numberOfCells = cell[0];
    tableBody.innerHTML = "";
    if (list.length > 0) {
        list.forEach(order => {
            const tr = document.createElement("tr") as HTMLTableRowElement;
            const cellNames: any[] = cell[1];
            for (let i = 0; i < numberOfCells; i++) {
                const name = cellNames[i];
                const td = document.createElement("td") as HTMLTableCellElement;
                if (typeof name === "string") {
                    let val:string = (name == "tx_id") ? order[name].toUpperCase() : order[name];
                    td.innerText = val.length > 19 ? val.substring(0, 17)+"..." : val;
                    if (name === "memo" || name === "email") {
                        td.innerHTML += "<span class='copy material-icons' title='copy full text'>content_copy</span>";
                        const copy = td.querySelector("span.copy") as HTMLSpanElement;
                        if (copy) copy.addEventListener("click", event => {
                            event.stopPropagation();
                            copyFunc(order[name]);
                        }) 
                    }
                    if (name === "time") {
                        td.innerText = formatDate(order[name]);
                    }
                } else if (name instanceof Array) {
                    let content:string = order[name[0]];
                    let extra = order[name[1]];
                    //for bank and account number
                    if (name[0] == 'account_number') {
                        content = order[name[0]] || order["user_account_number"];
                        extra = order[name[1]] || order["user_bank"];
                    }
                    //for price and amount
                    if (name[0] == 'price') {
                        extra = nairaFormatter.format(order[name[1]]);
                        content = dollarFormatter.format(order[name[0]]) ;
                    }
                    // Don't show copy icon for amount cell
                    const addCopy = name[0] == "price"?"":"<span class='copy material-icons' title='copy full text'>content_copy</span>";
                    const val = content.length > 18 ? content.substring(0,18)+"..." : content;
                        td.innerHTML = `<span class="val">${val}${addCopy}
                        </span><br><span class="extra-detail">${extra}</span>
                        <input type="hidden" id="hidden" value="${content}"/>`;
                    const copy = td.querySelector("span.copy") as HTMLSpanElement;
                    if (copy) copy.onclick = event => {
                        event.stopPropagation();
                        copyFunc(td.querySelector("input#hidden") as HTMLInputElement);
                    } 
                } else {
                    const id = order['id'];
                    const first = filters.status === 2 ? "reject" : "approve";
                    const second = filters.status === 1 ? "reject" : "undo"
                    td.className = "d-flex justify-content-center align-top";
                    td.innerHTML = `<button aria-id='${id}' class="action-button text-capitalize ${first}">${first}</button>
                    <button aria-id='${id}' class="action-button text-capitalize ${second}">${second}</button>
                    <div class="dropdown">
                        <span data-feed-button data-feed class="material-icons" id=${id} aria-expanded="false"
                         data-bs-toggle="dropdown" title='show activities'>feed</span>
                        <ul class="dropdown-menu" aria-labelledby=${id} style='min-width: 20rem;' data-order-feeds>
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                        </ul>
                        </div>`;
                    //registering click events for buttons
                    td.querySelectorAll("button").forEach(btn => {
                        btn.addEventListener("click", event => {
                            event.stopPropagation();
                            changeStatus(btn as HTMLButtonElement);
                        })
                    });
                    (td.querySelector("[data-feed]") as HTMLSpanElement)
                    .addEventListener("click", (event) => {
                        event.stopPropagation();
                        loadActivityFeeds(Number(id), event.target as HTMLSpanElement);
                    })
                }
                tr.appendChild(td);
            }
            tr.addEventListener("click", () => showTransactionDetails(order));
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
const showModal = (message: string, style: string, duration:number = 0) => {
    let myModal: any;
    modalBody.innerText = message;
    modalBody.className = "modal-body py-1 " + style;
    myModal = new bootstrap.Modal(modal, {
        keyboard: false
    });
    myModal.show();
    if (duration > 0) {
        setTimeout(() => {
            myModal.hide();
        }, duration);
    }
}
const showTransactionDetails = (order: any) => {
    // show transaction details
    const children = detailsModalBody.children;
    for (let i = 0; i < children.length; i++){
        const child = children[i];
        const For = child.getAttribute("for")
        const el = child.querySelector(`div#${For}`) as HTMLDivElement
        const val: string = order[For || ""];
        if (val === undefined || val === null || val === "") {
            child.classList.add("d-none");
        } else {
            child.classList.remove("d-none");
            if (For === "proof") {
                el.innerHTML = "";
                const str: string = order[For];
                if (str !== "") {
                    const url = "../account/php/";
                    const images: string[] = str.split(",");
                    if (images.length > 0) {
                        images.forEach((src: string) => {
                            src = url + src;
                            el.innerHTML += `<img src="${src}" width="80%" height="200px" class="border mt-1" />`;
                        })
                    } else {
                        el.innerHTML = `<img src="${url + str}" width="80%" height="200px" class="border mt-1" />`
                    }
                } 
            } else {
                el.innerText = order[For||"name"];
            }
        }
        
    }
    // show modal
    new bootstrap.Modal(detailsModal, {
        keyboard: false
    }).show();
        
}
// fetch orders
const fetchOrders = (filters:filterType) => {
    const which = filters.which;
    const status = filters.status;
    const action = filters.type;
    const _keyword = filters.keyword;
    loadingContainer.classList.remove("d-none");
    table.classList.add("d-none");
    Ajax.fetchPage(`php/admin_data.php?which=orders`, (data: string) => {
        // console.log(data);
        const arr: any[] = JSON.parse(data);
        const message: string = arr[0];
        if (message.toLowerCase().indexOf("success") != -1) {
            changeTable(arr[1], filters);
        } else {
            // showModal(message, "text-danger", 3000);
            changeTable([], filters);
        }
        loadingContainer.classList.add("d-none");
    }, { "type": which, "action":action, "status":status, _keyword });
}
//change order status 
const changeStatus = (btn:HTMLButtonElement) => {
    const id = btn.getAttribute("aria-id");
    const val = btn.innerText.toLowerCase();
    btn.innerHTML = spinner;
    Ajax.fetchPage(`php/change_tx_status.php`, () => {
        const tr = btn.parentElement?.parentElement as HTMLTableRowElement;
        tableBody.removeChild(tr);
    }, {"code":id,"action":val}, [() =>{
        btn.innerText = val;
        showModal("Could not perform action", "text-danger", 3000);
    }])
}

const loadActivityFeeds = (id: number, span: HTMLSpanElement) => {
    const dropdown = span.parentElement as HTMLDListElement;
    const menu = dropdown.querySelector(".dropdown-menu") as HTMLUListElement;
    menu.innerHTML = `<div class="d-flex justify-content-center py-3">${spinner}</div>`;
    Ajax.fetchPage(
      `php/activity_feeds.php?id=${id}`,
      (data: string) => {
        const arr: feedType[] = JSON.parse(data);
        // console.log(arr)
        if(arr.length > 0){
            menu.innerHTML= ""
            arr.forEach(feed =>{
                let color = "success";
                if (feed.description.startsWith("reject")){
                    color = "red"
                }else if(feed.description.startsWith("und")){
                    color = "secondary"
                }
                  const template = activityFeedTemplate.content.cloneNode(true)
                    .childNodes[1] as HTMLDivElement;
                const indicator = template.querySelector("[indicator]") as HTMLDivElement;
                const title = template.querySelector("[data-title]") as HTMLSpanElement;
                const name = template.querySelector("[data-name]") as HTMLElement;
                const time = template.querySelector("[data-time]") as HTMLSpanElement;
                indicator.innerHTML = `<span class="ellipse" style="--type: var(--${color});"></span>`;
                title.textContent = feed.description;
                name.textContent = feed.full_name;
                
                time.textContent = formatDate(feed.time);
                template.onclick = event => event.stopPropagation()
                menu.appendChild(template);
            })
        }else {
            menu.innerHTML = `<li><a class="dropdown-item text-center">No activity yet</li>`;        
        }
      },
      {}
    );
}

// format time 
function formatDate(dateString:string){
    const date = new Date(dateString);
    const today = new Date();
    const isToday =
        date.toDateString() === today.toDateString();
    return isToday
        ? "Today " + todayFormatter.format(date)
        : dateFormatter.format(date);
}

// get all orders
(function () {
    fetchOrders(filterObj);
})();
