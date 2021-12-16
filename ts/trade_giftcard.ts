const actionButtons = document.querySelectorAll("button.trading") as NodeListOf<HTMLButtonElement>;
const toggleBank = document.querySelector("input.toggle-switch") as HTMLInputElement;
const allBuyField = document.querySelectorAll("div.for-buy") as NodeListOf<HTMLDivElement>;
const allSellField = document.querySelectorAll("div.for-sell") as NodeListOf<HTMLDivElement>;
const bankField = document.querySelectorAll("div.for-sell.bank") as NodeListOf<HTMLDivElement>;
const giftcardButton = document.querySelector("button.payment") as HTMLButtonElement;
const toggleField = document.querySelector("div#toggle-switch") as HTMLDivElement;
const bankDiv = document.querySelector("div#bankDiv") as HTMLDivElement;
console.log(toggleField)

let action:string = "Buy";
const tradeGiftcardForm = document.querySelector("form#tradeGiftcardForm") as HTMLFormElement;
tradeGiftcardForm.onsubmit = event => {
    event.preventDefault();
}

toggleBank.onchange = (event) => {
    if (toggleBank.checked) {
        bankField.forEach(element => {
            element.classList.remove("d-block");
            element.classList.add("d-none");
        })
    } else {
        bankField.forEach(element => {
            element.classList.remove("d-none");
            element.classList.add("d-block");
        })
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
                        })
                    } else {
                        allSellField.forEach(element => {
                            element.classList.remove("d-none");
                            element.classList.add("d-block");
                        })
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