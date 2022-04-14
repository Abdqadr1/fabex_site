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

let bankList: [] = [];
let isChanged: boolean = false;
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
            if (el.id == "bankName" && isChanged === false && bankList.length > 0) {
                bankList.forEach((bank: string) => {
                    if (banks.disabled == true) banks.disabled = false;
                    const option = document.createElement("option");
                    option.value = bank;
                    option.innerText = bank;
                    banks.appendChild(option);
                });
                isChanged = true;
            }
        } else {
            element = el as HTMLButtonElement;
        }
        element.disabled = show;
    })
}

// number formatter
const numberFormatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 1,
    maximumFractionDigits: 2
})

let action:string = "buy";
const tradeGiftcardForm = document.querySelector("form#tradeGiftcardForm") as HTMLFormElement;
const submitBtn = tradeGiftcardForm.querySelector("button") as HTMLButtonElement;
const hiddenInput = tradeGiftcardForm.querySelector("input#hidden") as HTMLInputElement;
const priceInput = tradeGiftcardForm.querySelector("input#priceInput") as HTMLInputElement;
const totalInput = tradeGiftcardForm.querySelector("input#totalInput") as HTMLInputElement;
const amountInput = tradeGiftcardForm.querySelector("input#amount") as HTMLInputElement;
const errorDiv = tradeGiftcardForm.querySelector("#errorDiv") as HTMLDivElement;
const categories = tradeGiftcardForm.querySelector("select#category") as HTMLSelectElement;
const subCategories = tradeGiftcardForm.querySelector("select#subCategory") as HTMLSelectElement;
const amountParagraph = tradeGiftcardForm.querySelector("p#amount") as HTMLParagraphElement;

amountInput.oninput = () => changeAmount();

const changeAmount = () => {
    const price:number = Number(priceInput.value);
    const amount:number = amountInput.valueAsNumber;
    // console.log(price, amount);
    if (price && amount && amount > 0 && price > 0) {
        const tot = Number(price * amount);
        totalInput.value = "" + tot.toFixed(2);
        amountParagraph.innerText = `Total: ${numberFormatter.format(tot)} @ ${price}/$`;
    } else {
        totalInput.value = "";
        amountParagraph.innerText = "Total: N0";
    }
}

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
    const act:string = action;
    console.log("submitting...", tradeGiftcardForm)
    const aj = new Ajax(tradeGiftcardForm as HTMLFormElement);
    aj.setTimer(timeoutFun, 120000);
    aj.setBefore(() => {
        submitBtn.disabled = true;
        submitBtn.innerHTML = spinner;
        changeDisability(actionButtons, true)
    });
    aj.setAfter((responseText: string) => {
        // console.log(responseText);
        if (responseText.toLowerCase().indexOf("success") != -1) {
            if (act === "buy") {
                location.href = "payment";
            } else {
                location.href = "sell_giftcard";
            }
        } else {
            errorDiv.innerText = responseText;
            errorDiv.classList.remove("d-none");
            errorDiv.focus();
        }
        changeDisability(actionButtons, false)
        submitBtn.innerText = action + " giftcard"
        submitBtn.disabled = false;
    });
    aj.start();
}

toggleBank.onchange = (event) => {
    console.log(toggleBank)
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
            giftcardButton.textContent = "Buy Giftcard"
            
        } else {
            action = "sell";
            giftcardButton.textContent = "Sell Giftcard"
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
        // reset categories and sub categories
        categories.innerHTML += `<option selected="" hidden="">Select category...</option>`;
        subCategories.innerHTML = `<option  selected="" hidden="">Select sub category...</option>`;
    }
   
})

const banks = tradeGiftcardForm.querySelector("select#bankName") as HTMLSelectElement;
// get all banks
(function () {
    Ajax.fetchPage("php/data.php?which=banks", (data: string) => {
        bankList = JSON.parse(data);
    });
}
)();

// onchange categories
categories.onchange = event => {
    const select = event.target as HTMLSelectElement;
    const children = select.children;
    const giftcard_name = select.value;
    for (let i = 0; i < children.length; i++){
        const child = children[i] as HTMLOptionElement;
        if (child.value === giftcard_name) {
            categories.setAttribute("aria-id", child.id);
            changeSub(Number(child.id));
        }
    }
}
// onchange categories
subCategories.onchange = event => {
    const select = event.target as HTMLSelectElement;
    const children = select.children;
    const sub_cat_name = select.value;
    for (let i = 0; i < children.length; i++){
        const child = children[i] as HTMLOptionElement;
        if (child.value === sub_cat_name) {
            priceInput.value = child.getAttribute("price") as string;
            changeAmount();
        }
    }
}

let cats: any[] = [];
let subCats: any[] = [];
const changeSub = (id: number) => {
    const prop = action === 'buy' ? 'buy_price' : 'sell_price';
    const sub: any[] = subCats.filter(each => each.parent == id && each[prop] > 0);
    // console.log(id, sub);
    if (sub.length > 0) {
        subCategories.innerHTML = `<option value="" selected hidden>Select sub category...</option>`;
        sub.forEach(giftcard => {
            const option = document.createElement("option");
            option.innerText = giftcard.name;
            option.value = giftcard.name;
            option.setAttribute("price", giftcard[prop])
            subCategories.appendChild(option);
        })
    } else {
            subCategories.innerHTML = `<option value="" selected hidden>No sub category found</option>`;
    }

}

// get giftcards
(function () {
    Ajax.fetchPage("php/data.php?which=giftcards", ((data: string) => {
        const result: (string|any[])[] = JSON.parse(data);
        const el = result[0];
        if (typeof el === "string") {
            const option = document.createElement("option")
            option.innerText = el; option.value = ""; option.disabled = true;
            categories.appendChild(option);
        } 
        if (typeof el === "object") {
            cats = result.filter((each:any) => each.type === "category");
            subCats = result.filter((each:any) => each.type === "sub_category");
            cats.forEach(category => {
                const option = document.createElement("option");
                option.id = category.id;
                option.value = category.name;
                option.innerText = category.name;
                categories.appendChild(option);
            })
        }
    }))
})()

// // for timeout
import "./timeout.js";