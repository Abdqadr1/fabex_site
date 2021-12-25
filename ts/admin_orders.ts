const buttons = document.querySelectorAll("button.trading") as NodeListOf<HTMLButtonElement>;
const spinner = `<div class='spinner-border spinner-border-sm' aria-hidden='true' role='status'></div>
                Please wait... `;
const tabs = document.querySelectorAll(".nav-tab") as NodeListOf<HTMLAnchorElement>;
console.log(tabs);
tabs.forEach((tab => {
    tab.onclick = event => {
        event.preventDefault();
        console.log(tab);
    }
}));
let action: string = "buy";
buttons.forEach(element => {
    element.onclick = (e) => {
        element.classList.add("active");
        if (element.textContent?.toLowerCase().indexOf("buy") != -1) {
            action = "buy";
        } else {
            action = "sell";
        }
        const parent = element.parentElement as HTMLDivElement;
        const children = parent.children;
        for (var i = 0; i < children.length; i++) {
            let child = children[i];
            if (child !== element)  {
                child.classList.remove("active");
            }
        }
            
    }
});