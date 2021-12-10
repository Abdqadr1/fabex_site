const buttons = document.querySelectorAll("button.trading") as NodeListOf<HTMLButtonElement>;
const toggleSwitch = document.querySelector("input.toggle-switch") as HTMLInputElement;
const allBuyData = document.querySelectorAll("div.for-buy") as NodeListOf<HTMLDivElement>;
const allSellData = document.querySelectorAll("div.for-sell") as NodeListOf<HTMLDivElement>;
const bankData = document.querySelectorAll("div.for-sell.bank") as NodeListOf<HTMLDivElement>;
const cryptoButton = document.querySelector("button.payment") as HTMLButtonElement;
const toggleDiv = document.querySelector("div#toggle-switch") as HTMLDivElement;
console.log(toggleDiv)

toggleSwitch.onchange = (event) => {
    if (toggleSwitch.checked) {
        bankData.forEach(element => {
            element.classList.remove("d-block");
            element.classList.add("d-none");
        })
    } else {
        bankData.forEach(element => {
            element.classList.remove("d-none");
            element.classList.add("d-block");
        })
    }
}
toggleSwitch.checked = false;

buttons.forEach(element => {
    element.onclick = (e) => {
        element.classList.remove("disabled");
        element.classList.add("active");
        let action:string = "";
        if (element.classList.contains("buy")) {
            action = "buy";
            cryptoButton.textContent = "Buy Crypto"
            
        } else {
            action = "sell";
            cryptoButton.textContent = "Sell Crypto"
        }
        const parent = element.parentElement as HTMLDivElement;
        const children = parent.children;
        for (var i = 0; i < children.length; i++){
            let child = children[i];
            if (child === element) {
                // change the ui as needed
                if (action == "buy") {
                    allSellData.forEach(element => {
                        element.classList.remove("d-block");
                        element.classList.add("d-none");
                    })
                    toggleDiv.classList.remove("d-block");
                    toggleDiv.classList.add("d-none");
                    allBuyData.forEach(element => {
                        element.classList.remove("d-none");
                        element.classList.add("d-block");
                    })
                } else {
                    toggleDiv.classList.remove("d-none");
                    toggleDiv.classList.add("d-block");
                    allBuyData.forEach(element => {
                        element.classList.remove("d-block");
                        element.classList.add("d-none");
                    })
                    if (toggleSwitch.checked) {
                        allSellData.forEach(element => {
                            element.classList.remove("d-block");
                            element.classList.add("d-none");
                        })
                    } else {
                        allSellData.forEach(element => {
                            element.classList.remove("d-none");
                            element.classList.add("d-block");
                        })
                    }
                    
                }
            } else {
                child.classList.remove("active");
                // child.classList.add("disabled");
                //change ui 
            }
        }
            
    }
})