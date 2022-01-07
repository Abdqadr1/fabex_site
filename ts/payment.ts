declare const which: string;
import { Ajax } from "./ajax.js";
const copy_icon = document.querySelector("span.payment.material-icons") as HTMLSpanElement;
const backBtn = document.querySelector("span.backBtn") as HTMLSpanElement;
const paidForm = document.querySelector("form#paidForm") as HTMLFormElement;
const paidBtn = paidForm.querySelector("button") as HTMLButtonElement;
const paidInput = paidForm.querySelector("input#paidInput") as HTMLInputElement;
const errorDiv = document.querySelector("#errorDiv") as HTMLDivElement;
const pConfirm = document.querySelector("p#confirm") as HTMLParagraphElement;
if (which == "giftcard") {
    pConfirm.classList.remove('d-none');
    pConfirm.classList.add("d-block");
}
const spinner = `<div class='spinner-border spinner-border-sm' aria-hidden='true' role='status'></div>
                Please wait... `;

const timeout = () : void => {
    errorDiv.innerText = "Request taking too long, Check your internet connection";
    errorDiv.classList.remove("d-none");
    errorDiv.classList.add("d-block");
    paidBtn.disabled = false;
    paidBtn.innerHTML = "I Have Paid, Proceed";
    errorDiv.focus();
}

paidForm.onsubmit = event => {
    event.preventDefault();
    const aj = new Ajax(paidForm as HTMLFormElement);
    aj.setTimer(timeout, 120000);
    aj.setBefore(() => {
        paidBtn.disabled = true;
        paidBtn.innerHTML = spinner;
    });
    aj.setAfter((responseText: string) => {
        // console.log(responseText);
        if (responseText.toLowerCase().indexOf("success") != -1) {
            location.href = "dashboard";
        } else {
            errorDiv.innerText = responseText;
            errorDiv.classList.remove("d-none");
            errorDiv.classList.add("d-block");
            paidBtn.disabled = false;
            paidBtn.innerHTML = "I Have Paid, Proceed";
            errorDiv.focus();
        }
    });
    aj.start();

}

backBtn.onclick = event => {
    event.stopPropagation();
    history.go(-1);
}
copy_icon.onclick = (e) => {
    e.stopPropagation();
    const acct = document.querySelector("span.account-number") as HTMLParagraphElement;
    navigator.clipboard.writeText(acct.innerText);
    alert("Text copied!")
}