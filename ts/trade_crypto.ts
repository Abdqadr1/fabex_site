import { Ajax } from "./ajax.js";
const buttons = document.querySelectorAll("button.trading") as NodeListOf<HTMLButtonElement>;
const toggleSwitch = document.querySelector("input.toggle-switch") as HTMLInputElement;
const spinner = `<div class='spinner-border spinner-border-sm' aria-hidden='true' role='status'></div>
                Please wait... `;
const cryptoButton = document.querySelector("button.payment") as HTMLButtonElement;
const toggleDiv = document.querySelector("div#toggle-switch") as HTMLDivElement;
const backBtn = document.querySelector("span#backBtn") as HTMLSpanElement;
backBtn.onclick = event => {
    event.stopPropagation();
    history.go(-1);
}
// buy and sell cryptos
let buyCryptos: any[] = []; let sellCryptos: any[] = [];

// number formatter
const numberFormatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 1,
    maximumFractionDigits: 2
})

let bankList: [] = [];
let isChanged: boolean = false;
let action: string = "buy";
const select = document.querySelector("select#bankName") as HTMLSelectElement;
const assets = document.querySelector("select#assets") as HTMLSelectElement;
const sellingFields = document.querySelector("div#sellingFields") as HTMLDivElement;
const buyingFields = document.querySelector("div#buyingFields") as HTMLDivElement;
const tradeCryptoForm = document.querySelector("form#tradeCryptoForm") as HTMLFormElement;
const submitBtn = tradeCryptoForm.querySelector("button") as HTMLButtonElement;
const productIdInput = tradeCryptoForm.querySelector("input#productId") as HTMLInputElement;
const priceInput = tradeCryptoForm.querySelector("input#priceInput") as HTMLInputElement;
const lowPriceInput = tradeCryptoForm.querySelector("input#lowPriceInput") as HTMLInputElement;
const totalInput = tradeCryptoForm.querySelector("input#totalInput") as HTMLInputElement;
const amountInput = tradeCryptoForm.querySelector("input#amount") as HTMLInputElement;
const bankInputs = tradeCryptoForm.querySelectorAll(".bankInput") as NodeListOf<HTMLElement>;
const buyInputs = tradeCryptoForm.querySelectorAll(".buyInput") as NodeListOf<HTMLElement>;
const errorDiv = tradeCryptoForm.querySelector("div#errorDiv") as HTMLDivElement;
const act = tradeCryptoForm.querySelector("input#hidden") as HTMLInputElement;
const amountParagraph = tradeCryptoForm.querySelector("p#amount") as HTMLParagraphElement;
const networkSelect = tradeCryptoForm.querySelector("select#network") as HTMLSelectElement;

amountInput.onkeyup = event => changeAmount();
amountInput.onpaste = () => changeAmount();
const changeAmount = () => {
    let price:number = Number(priceInput.value);
    const lowPrice:number = Number(lowPriceInput.value);
    const amount = amountInput.valueAsNumber;
    // console.log(price, amount);
    if (price && amount && amount > 0 && price > 0) {
        if (amount < 150) price = lowPrice;
        const tot = Number(price * amount);
        totalInput.value = "" + tot.toFixed(2);
        amountParagraph.innerText = `Total: ${numberFormatter.format(tot)} @ ${price}/$`;
    } else {
        totalInput.value = "" + (price * amount);
        amountParagraph.innerText = "Total: N0";
    }
}

const changeDisability = (node:NodeListOf<HTMLElement>,show:boolean) => {
    node.forEach(el => {
        let element;
        if (el instanceof HTMLInputElement) {
            element = el as HTMLInputElement;
        } else {
            element = el as HTMLSelectElement;
            if (el.id == "bankName" && isChanged === false && bankList.length > 0) { 
                bankList.forEach((bank: string) => {
                    const option = document.createElement("option");
                    option.value = bank;
                    option.innerText = bank;
                    select.appendChild(option);
                })
            }
        }
        element.disabled = show;
    })
}

const timeoutFun = () => {
    errorDiv.innerText = "Request taking too long, Check your internet connection";
    errorDiv.classList.remove("d-none");
    submitBtn.disabled = false;
    submitBtn.innerHTML = action + " crypto";
    changeDisability(buttons, false);
    errorDiv.focus();
}

tradeCryptoForm.onsubmit = event => {
    event.preventDefault();
    // console.log("submitting...")
    const aj = new Ajax(tradeCryptoForm as HTMLFormElement);
    aj.setTimer(timeoutFun, 120000)
    aj.setBefore(() => {
        submitBtn.disabled = true;
        submitBtn.innerHTML = spinner;
        changeDisability(buttons, true);
    })
    aj.setAfter((responseText: string) => {
        console.log(responseText)
        if (responseText.toLowerCase().indexOf("success") != -1) {
            if (action === "buy") {
                location.href = "payment";
            } else {
                location.href = "sell_crypto";
            }
        } else {
            errorDiv.innerText = responseText;
            errorDiv.classList.remove("d-none");
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
        changeNetworks((action=="buy" ? buyCryptos : sellCryptos))
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
    Ajax.fetchPage("php/data.php?which=banks", (data: string) => {
        bankList = JSON.parse(data);
    })
})();

// onchange assets
assets.onchange = event => {
    const select = event.target as HTMLSelectElement;
    const children = select.children;
    const crypto_name = select.value;
    for (let i = 0; i < children.length; i++){
        const child = children[i] as HTMLOptionElement;
        if (child.value === crypto_name) {
            assets.setAttribute("aria-id", child.id);
            priceInput.value = child.getAttribute("price") as string;
            lowPriceInput.value = child.getAttribute("low_price") as string;
            productIdInput.value = child.id;
            changeAmount();
        }
    }
}

const changeNetworks = (activeAssets: any[]) => {
    networkSelect.innerHTML = `<option value="" selected hidden>Select network...</option>`;
    assets.innerHTML = `<option value="" selected hidden>Select coin...</option>`;
     if (activeAssets.length > 0) {
            activeAssets.forEach((crypto: any) => {
                const option = document.createElement("option");
                option.innerText = crypto.name;
                option.value = crypto.acronym;
                option.id = crypto.id;
                option.setAttribute("price", crypto.price);
                option.setAttribute("low_price", crypto.low_price);
                assets.appendChild(option);
                const networkOption = document.createElement("option");
                const network: string = crypto.network;
                networkOption.innerText = network.toUpperCase();
                networkOption.value = network.toUpperCase();
                networkOption.id = crypto.id;
                networkSelect.appendChild(networkOption);
            })
        } else {
            const option = document.createElement("option");
            option.innerText = "No crypto available, contact admin";
            option.disabled = true;
            assets.appendChild(option);
            const net = document.createElement("option");
            net.innerText = "No network available";
            net.disabled = true;
            networkSelect.appendChild(net);
        }
}

//get all cryptos
(function () {
    Ajax.fetchPage("php/data.php?which=cryptos", (data: string) => {
        const arr: any[] = JSON.parse(data);
        console.log(arr)
        buyCryptos = arr[0];
        sellCryptos = arr[1];
        let activeAssets:any[];
        if (action === "buy") {
            activeAssets = buyCryptos
        } else {
            activeAssets = sellCryptos
        }
        changeNetworks(activeAssets);
    })
})()


// for timeout
import "./timeout.js";