import { Ajax } from "./ajax.js";
const cryptoDiv = document.querySelector("div#crypto_div") as HTMLDivElement;
const add_crypto = document.querySelector("div#add_crypto") as HTMLDivElement;
const addCryptoForm = document.querySelector("form#add_crypto_form") as HTMLFormElement;
const addCryptoSubmitBtn = addCryptoForm.querySelector("button") as HTMLButtonElement;
const cryptoErrorDiv = addCryptoForm.querySelector("div#errorDiv") as HTMLDivElement;
const spinner = `<div class='spinner-border spinner-border-sm' aria-hidden='true' role='status'></div>
                Please wait... `;
const all_cryptos = document.querySelectorAll("div.each-crypto input") as NodeListOf<HTMLInputElement>;
all_cryptos.forEach(input => {
    input.onchange = event => {
        console.log(input);
    }
})
add_crypto.onclick = event => {
    addCryptoForm.classList.remove("d-none");
    addCryptoForm.classList.add("d-block");
    add_crypto.classList.add("d-none");
}
const addCrypto = (content:string[], isOpen:boolean = true) => {
    const div = document.createElement("div") as HTMLDivElement;
    const nameSpan = document.createElement("span") as HTMLSpanElement;
    const checkSpan = document.createElement("span") as HTMLSpanElement;
    const switchInput = document.createElement("input") as HTMLInputElement;
    const dotSpan = document.createElement("span") as HTMLSpanElement;
    dotSpan.className = "material-icons text-primary three-dots";
    dotSpan.textContent = "more_vert";
    switchInput.type = "checkbox";
    switchInput.setAttribute("role", "switch");
    switchInput.className = "form-check-input";
    switchInput.checked = isOpen;
    checkSpan.className = "form-switch mx-3";
    checkSpan.appendChild(switchInput);
    nameSpan.className = "d-inline-block crypto-name";
    nameSpan.textContent = `${content[0]} (${content[1]})`;
    div.classList.add("each-crypto");
    div.appendChild(nameSpan);
    div.appendChild(checkSpan);
    div.appendChild(dotSpan);
    cryptoDiv.appendChild(div);
}
addCryptoForm.onsubmit = event => {
    event.preventDefault();
    console.log("submitting...");
    const aj = new Ajax(addCryptoForm as HTMLFormElement);
    aj.setBefore(() => {
        addCryptoSubmitBtn.disabled = true;
        addCryptoSubmitBtn.innerHTML = spinner;
    })
    aj.setAfter((responseText:string) => {
        const arr = JSON.parse(responseText);
        console.log(arr);
        const message = arr[0];
        if (message.toLowerCase().indexOf("success") != -1) {
            addCrypto(arr[1]);
            cryptoErrorDiv.classList.remove("d-block");
            cryptoErrorDiv.classList.add("d-none");
            addCryptoForm.classList.remove("d-block");
            addCryptoForm.classList.add("d-none");
            add_crypto.classList.remove("d-none");
            add_crypto.classList.add("d-block"); 
        } else {
            cryptoErrorDiv.classList.remove("d-none");
            cryptoErrorDiv.classList.add("d-block");
            cryptoErrorDiv.textContent = responseText;
        }
        addCryptoSubmitBtn.disabled = true;
        addCryptoSubmitBtn.innerHTML = "Add New Crypto";
    })
    aj.start()
}