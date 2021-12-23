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

// click handler for back button
const backBtn = document.querySelector("span.backBtn") as HTMLSpanElement;
backBtn.onclick = event => {
    event.stopPropagation();
    history.go(-1);
}
const changeDisability = (nodes:NodeListOf<HTMLElement>,show:boolean) => {
    nodes.forEach(el => {
        let element;
        if (el instanceof HTMLInputElement) {
            element = el as HTMLInputElement;
        } else if(el instanceof HTMLSelectElement) {
            element = el as HTMLSelectElement;
        } else {
            element = el as HTMLButtonElement;
        }
        element.disabled = show;
    })
}
 

let action:string = "buy";
const tradeGiftcardForm = document.querySelector("form#tradeGiftcardForm") as HTMLFormElement;
const submitBtn = tradeGiftcardForm.querySelector("button") as HTMLButtonElement;
const hiddenInput = tradeGiftcardForm.querySelector("input#hidden") as HTMLInputElement;
const priceInput = tradeGiftcardForm.querySelector("input#priceInput") as HTMLInputElement;
const errorDiv = tradeGiftcardForm.querySelector("#errorDiv") as HTMLDivElement;

const timeoutFun = () => {
    errorDiv.innerText = "Request taking too long, Check your internet connection";
    errorDiv.classList.remove("d-none");
    errorDiv.classList.add("d-block");
    submitBtn.disabled = false;
    submitBtn.innerHTML = action + " giftcard";
    changeDisability(actionButtons, false);
    errorDiv.focus();
}

tradeGiftcardForm.onsubmit = event => {
    event.preventDefault();
    hiddenInput.value = action;
    console.log("submitting...")
    const aj = new Ajax(tradeGiftcardForm as HTMLFormElement);
    aj.setTimer(timeoutFun, 120000);
    aj.setBefore(() => {
        submitBtn.disabled = true;
        submitBtn.innerHTML = spinner;
        changeDisability(actionButtons, true)
    });
    aj.setAfter((responseText: string) => {
        console.log(responseText);
        if (responseText.toLowerCase().indexOf("success") != -1) {
            if (action === "buy") {
                location.href = "payment";
            } else {
                location.href = "sell_giftcard";
            }
        } else {
            errorDiv.innerText = responseText;
            errorDiv.classList.remove("d-none");
            errorDiv.classList.add("d-block");
            errorDiv.focus();
        }
        submitBtn.innerText = action + " giftcard"
        submitBtn.disabled = false;
    });
    aj.start();
}

toggleBank.onchange = (event) => {
    if (toggleBank.checked) {
        bankField.forEach(element => {
            element.classList.remove("d-block");
            element.classList.add("d-none");
        });
        changeDisability(allSellInput,true);
    } else {
        bankField.forEach(element => {
            element.classList.remove("d-none");
            element.classList.add("d-block");
        });
        changeDisability(allSellInput,false);
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
                        changeDisability(allSellInput,true);
                    } else {
                        allSellField.forEach(element => {
                            element.classList.remove("d-none");
                            element.classList.add("d-block");
                        });
                        changeDisability(allSellInput,false);
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