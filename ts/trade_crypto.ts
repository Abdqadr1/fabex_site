import { Ajax } from "./ajax.js";
const buttons = document.querySelectorAll("button.trading") as NodeListOf<HTMLButtonElement>;
const toggleSwitch = document.querySelector("input.toggle-switch") as HTMLInputElement;
// const allBuyData = document.querySelectorAll("div.for-buy") as NodeListOf<HTMLDivElement>;
// const allSellData = document.querySelectorAll("div.for-sell") as NodeListOf<HTMLDivElement>;
const bankData = document.querySelectorAll("div.for-sell.bank") as NodeListOf<HTMLDivElement>;
const spinner = `<div class='spinner-border spinner-border-sm' aria-hidden='true' role='status'></div>
                Please wait... `;
const cryptoButton = document.querySelector("button.payment") as HTMLButtonElement;
const toggleDiv = document.querySelector("div#toggle-switch") as HTMLDivElement;
const backBtn = document.querySelector("span#backBtn") as HTMLSpanElement;
backBtn.onclick = event => {
    event.stopPropagation();
    history.go(-1);
}

let action: string = "buy";
const select = document.querySelector("select#bankName") as HTMLSelectElement;
const assets = document.querySelector("select#assets") as HTMLSelectElement;
const sellingFields = document.querySelector("div#sellingFields") as HTMLDivElement;
const buyingFields = document.querySelector("div#buyingFields") as HTMLDivElement;
const tradeCryptoForm = document.querySelector("form#tradeCryptoForm") as HTMLFormElement;
const submitBtn = tradeCryptoForm.querySelector("button") as HTMLButtonElement;
const bankInputs = tradeCryptoForm.querySelectorAll(".bankInput") as NodeListOf<HTMLElement>;
const buyInputs = tradeCryptoForm.querySelectorAll(".buyInput") as NodeListOf<HTMLElement>;
const errorDiv = tradeCryptoForm.querySelector("div#errorDiv") as HTMLDivElement;
const act = tradeCryptoForm.querySelector("input#hidden") as HTMLInputElement;

// console.log(select);

const changeDisability = (node:NodeListOf<HTMLElement>,show:boolean) => {
    node.forEach(el => {
        let element;
        if (el instanceof HTMLInputElement) {
            element = el as HTMLInputElement;
        } else {
            element = el as HTMLSelectElement;
        }
        element.disabled = show;
    })
}

const timeoutFun = () => {
    errorDiv.innerText = "Request taking too long, Check your internet connection";
    errorDiv.classList.remove("d-none");
    errorDiv.classList.add("d-block");
    submitBtn.disabled = false;
    submitBtn.innerHTML = action + " crypto";
    changeDisability(buttons, false);
    errorDiv.focus();
}

tradeCryptoForm.onsubmit = event => {
    event.preventDefault();
    console.log("submitting...")
    const aj = new Ajax(tradeCryptoForm as HTMLFormElement);
    aj.setTimer(timeoutFun, 120000)
    aj.setBefore(() => {
        submitBtn.disabled = true;
        submitBtn.innerHTML = spinner;
        changeDisability(buttons, true);
    })
    aj.setAfter((responseText:string) => {
        if (responseText.toLowerCase().indexOf("success") != -1) {
            if (action === "buy") {
                location.href = "payment";
            } else {
                location.href = "sell_crypto";
            }
        } else {
            errorDiv.innerText = responseText;
            errorDiv.classList.remove("d-none");
            errorDiv.classList.add("d-block");
            errorDiv.focus();
        }
        submitBtn.disabled = false;
        submitBtn.innerHTML = action + " crypto";
        changeDisability(buttons, false);
    })
    aj.start();
}

toggleSwitch.onchange = (event) => {
    if (toggleSwitch.checked) {
        sellingFields.classList.remove("d-block");
        sellingFields.classList.add("d-none");
        changeDisability(bankInputs, true);
    } else {
        sellingFields.classList.remove("d-none");
        sellingFields.classList.add("d-block");
        changeDisability(bankInputs, false);
    }
}
toggleSwitch.checked = false;

buttons.forEach(element => {
    element.onclick = (e) => {
        element.classList.remove("disabled");
        element.classList.add("active");
        if (element.classList.contains("buy")) {
            action = "buy";
            act.value = action
            cryptoButton.textContent = "Buy Crypto"
            
        } else {
            action = "sell";
            act.value = action
            cryptoButton.textContent = "Sell Crypto"
        }
        const parent = element.parentElement as HTMLDivElement;
        const children = parent.children;
        for (var i = 0; i < children.length; i++) {
            let child = children[i];
            if (child === element) {
                // change the ui as needed
                if (action == "buy") {
                    buyingFields.classList.remove("d-none");
                    buyingFields.classList.add("d-block");
                    sellingFields.classList.remove("d-block");
                    sellingFields.classList.add("d-none");
                    toggleDiv.classList.remove("d-block");
                    toggleDiv.classList.add("d-none");
                    changeDisability(buyInputs, false);
                } else {
                    toggleDiv.classList.remove("d-none");
                    toggleDiv.classList.add("d-block");
                    changeDisability(buyInputs, true);
                    buyingFields.classList.remove("d-block");
                    buyingFields.classList.add("d-none");
                    if (toggleSwitch.checked) {              
                        sellingFields.classList.remove("d-block");
                        sellingFields.classList.add("d-none");
                        changeDisability(bankInputs, true);
                    } else {
                        sellingFields.classList.remove("d-none");
                        sellingFields.classList.add("d-block");
                        changeDisability(bankInputs, false);
                    }
                    
                }
            } else {
                child.classList.remove("active");
                // child.classList.add("disabled");
                //change ui 
            }
        }
            
    }
});

// get all banks
(function () {
    //TODO: replace url before server
    Ajax.fetchPage("/fabex/php/data.php?which=banks", (data: string) => {
        const bankList: [] = JSON.parse(data);
        console.log(bankList);
        bankList.forEach((bank: string) => {
            const option = document.createElement("option");
            option.value = bank;
            option.innerText = bank;
            select.appendChild(option);
        })
    })
})();

// get all banks
(function () {
    //TODO: replace url before server
    Ajax.fetchPage("/fabex/php/data.php?which=coins", (data: string) => {
        const coinList = JSON.parse(data);
        const keys:string[] = Object.keys(coinList);
        console.log(keys);
        keys.forEach((key:string) => {
            const option = document.createElement("option");
            option.value = key;
            option.innerText = coinList[key];
            assets.appendChild(option);
        })
    })
})()