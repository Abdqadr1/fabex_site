import { Ajax } from "./ajax.js";
const addBankForm = document.querySelector("form#addBankForm") as HTMLFormElement;
const bvnInput = addBankForm.querySelector("[name=bvn]") as HTMLInputElement;
const acctInput = addBankForm.querySelector("[name=account_number]") as HTMLInputElement;
const errorDiv = document.querySelector("#errorDiv") as HTMLDivElement;
const submitBtn = addBankForm.querySelector("button") as HTMLButtonElement;
const spinner = `<div class='spinner-border spinner-border-sm' aria-hidden='true' role='status'></div>
                Please wait... `;
const select = document.querySelector("select#bankname") as HTMLSelectElement;
addBankForm.onsubmit = (event) => {
    event.preventDefault();
    if(isNaN(Number(bvnInput.value)) || isNaN(Number(acctInput.value))){
        errorDiv.textContent = "Invalid bvn or account number";
        errorDiv.classList.remove("d-none");
        return;
    }

    submitBtn.disabled = true;
    const aj = new Ajax(event.target as HTMLFormElement);
    aj.setBefore(() => {
        submitBtn.innerHTML = spinner;
    });
    aj.setError((xhttp:XMLHttpRequest) => {
        const str:string = JSON.parse(xhttp.response);
            errorDiv.textContent = str;
            errorDiv.classList.remove("d-none");
            submitBtn.disabled = false;
            submitBtn.innerHTML = "Add account details";
            errorDiv.focus();
    })
    aj.setAfter((responseText: string) => {
        location.href = "congrats.php";
    });
    aj.start();
}

// get all banks
(function () {
    Ajax.fetchPage("account/php/data.php?which=banks", (data: string) => {
        const bankList:[] = JSON.parse(data);
        bankList.forEach((bank:string) => {
            const option = document.createElement("option");
            option.value = bank;
            option.innerText = bank;
            select.appendChild(option);
        })
    })
}
)()