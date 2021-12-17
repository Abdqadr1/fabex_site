import { Ajax } from "./ajax.js";
const actionButtons = document.querySelectorAll("button.trading") as NodeListOf<HTMLButtonElement>;
const toggleBank = document.querySelector("input.toggle-switch") as HTMLInputElement;
const allBuyField = document.querySelectorAll("div.for-buy") as NodeListOf<HTMLDivElement>;
const allSellField = document.querySelectorAll("div.for-sell") as NodeListOf<HTMLDivElement>;
const bankField = document.querySelectorAll("div.for-sell.bank") as NodeListOf<HTMLDivElement>;
const giftcardButton = document.querySelector("button.payment") as HTMLButtonElement;
const toggleField = document.querySelector("div#toggle-switch") as HTMLDivElement;
const bankDiv = document.querySelector("div#bankDiv") as HTMLDivElement;
const allSellInput = document.querySelectorAll(".sell-input") as NodeListOf<HTMLElement>;
const spinner = `<div class='spinner-border spinner-border-sm' aria-hidden='true' role='status'></div>
                Please wait... `;

const changeDisability = (show:boolean) => {
    allSellInput.forEach(el => {
        let element;
        if (el instanceof HTMLInputElement) {
            element = el as HTMLInputElement;
        } else {
            element = el as HTMLSelectElement;
        }
        element.disabled = show;
    })
}

let action:string = "buy";
const tradeGiftcardForm = document.querySelector("form#tradeGiftcardForm") as HTMLFormElement;
const submitBtn = tradeGiftcardForm.querySelector("button") as HTMLButtonElement;
const hiddenInput = tradeGiftcardForm.querySelector("input#hidden") as HTMLInputElement;
tradeGiftcardForm.onsubmit = event => {
    event.preventDefault();
    hiddenInput.value = action;
    const aj = new Ajax(tradeGiftcardForm as HTMLFormElement);
    aj.setBefore(() => {
        submitBtn.disabled = true;
        submitBtn.innerHTML = spinner;
    });
    aj.setAfter((responseText: string) => {
        console.log(responseText);
        submitBtn.innerText = action + " giftcard"
        submitBtn.disabled = false;
    });
    aj.start();
}

toggleBank.onchange = (event) => {
    console.log(allSellInput);
    if (toggleBank.checked) {
        bankField.forEach(element => {
            element.classList.remove("d-block");
            element.classList.add("d-none");
        });
        changeDisability(true);
    } else {
        bankField.forEach(element => {
            element.classList.remove("d-none");
            element.classList.add("d-block");
        });
        changeDisability(false);
    }
}
toggleBank.checked = false;

actionButtons.forEach(element => {
    element.onclick = (e) => {
        element.classList.remove("disabled");
        element.classList.add("active");
        if (element.classList.contains("buy")) {
            action = "buy";
            giftcardButton.textContent = "Buy Crypto"
            
        } else {
            action = "sell";
            giftcardButton.textContent = "Sell Crypto"
        }
        const parent = element.parentElement as HTMLDivElement;
        const children = parent.children;
        for (var i = 0; i < children.length; i++){
            let child = children[i];
            if (child === element) {
                // change the ui as needed
                if (action == "buy") {
                    allSellField.forEach(element => {
                        element.classList.remove("d-block");
                        element.classList.add("d-none");
                    })
                    bankDiv.classList.remove("d-block");
                    bankDiv.classList.add("d-none");
                } else {
                    allBuyField.forEach(element => {
                        element.classList.remove("d-block");
                        element.classList.add("d-none");
                    })
                    if (toggleBank.checked) {
                        allSellField.forEach(element => {
                            element.classList.remove("d-block");
                            element.classList.add("d-none");
                        });
                        changeDisability(true);
                    } else {
                        allSellField.forEach(element => {
                            element.classList.remove("d-none");
                            element.classList.add("d-block");
                        });
                        changeDisability(false);
                    }
                    bankDiv.classList.remove("d-none");
                    bankDiv.classList.add("d-block");
                    
                }
            } else {
                child.classList.remove("active");
                // child.classList.add("disabled");
                //change ui 
            }
        }
            
    }
})