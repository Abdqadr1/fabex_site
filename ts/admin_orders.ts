const whichSelect = document.querySelector("select#which") as HTMLSelectElement;
const buttons = document.querySelectorAll("button.trading") as NodeListOf<HTMLButtonElement>;
const spinner = `<div class='spinner-border spinner-border-sm' aria-hidden='true' role='status'></div>
                Please wait... `;
const tabs = document.querySelectorAll(".nav-tab") as NodeListOf<HTMLAnchorElement>;
type filterType = { which: string, type: string, status: string };
const filterObj:filterType  = {
    which: "crypto",
    type: "buy",
    status: "pending"
};
whichSelect.onchange = event => {
    if (whichSelect.value != filterObj.which) { 
        filterObj.which = whichSelect.value;
        changeTable(filterObj);
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
            changeTable(filterObj);
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
            changeTable(filterObj);
        }
            
    }
});

// change table 
const changeTable = (filters:filterType) => {
    console.log("table changing...");
}