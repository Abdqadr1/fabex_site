import { Ajax } from "./ajax.js";
declare const bootstrap: any;
const whichSelect = document.querySelector("select#which") as HTMLSelectElement;
const buttons = document.querySelectorAll("button.trading") as NodeListOf<HTMLButtonElement>;
const loadingContainer = document.querySelector("div#orders_loading") as HTMLDivElement;
const table = document.querySelector("table#table") as HTMLTableElement;
const giftcardHeader = table.querySelector("thead#giftcard_header") as HTMLElement;
const cryptoHeader = table.querySelector("thead#crypto_header") as HTMLElement;
const spinner = `<div class='spinner-border spinner-border-sm' aria-hidden='true' role='status'></div>
                Please wait... `;
const tabs = document.querySelectorAll(".nav-tab") as NodeListOf<HTMLAnchorElement>;
const modal = document.querySelector("div#modal") as HTMLDivElement;
const modalBody = modal.querySelector("div.modal-body") as HTMLDivElement;
type filterType = { which: string, type: string, status: string };
const filterObj:filterType  = {
    which: "crypto",
    type: "buy",
    status: "pending"
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
        const value = tab.innerText;
        if (filterObj.status != value.toLowerCase()) {
            filterObj.status = value.toLowerCase();
            tabs.forEach(tb => {
                const val = tb.innerText;
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
        let action: string = "buy";
        element.classList.add("active");
        if (element.textContent?.toLowerCase().indexOf("buy") != -1) {
            action = "buy";
        } else {
            action = "sell";
        }
        if (action != filterObj.type) {
            const parent = element.parentElement as HTMLDivElement;
            const children = parent.children;
            for (var i = 0; i < children.length; i++) {
                let child = children[i];
                if (child !== element)  {
                    child.classList.remove("active");
                }
            }
            fetchOrders(filterObj);
        }
            
    }
});

// change table 
const changeTable = (list:any[], filters:filterType) => {
    const which = filters.which;
    if (which == "crypto") {
        console.log("crypto", list);
        cryptoHeader.classList.remove("d-none");
        giftcardHeader.classList.add("d-none");
    } else {
        console.log("giftcard", list);
        giftcardHeader.classList.remove("d-none");
        cryptoHeader.classList.add("d-none");
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
    const type = filters.which;
    loadingContainer.classList.remove("d-none");
    table.classList.add("d-none");
    Ajax.fetchPage(`php/admin_data.php?which=orders&type=${type}`, (data: string) => {
        const arr: any[] = JSON.parse(data);
        const message: string = arr[0];
        if (message.toLowerCase().indexOf("success") != -1) {
            changeTable(arr[1], filters);
        } else {
            const text = "Search queries: " + JSON.stringify(filterObj) + "\n \n" + message;
            showModal(text, "text-danger");
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