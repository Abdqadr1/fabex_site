import { Ajax } from "./ajax.js";
const resetForm = document.querySelector("#resetForm") as HTMLFormElement;
const btn = resetForm.querySelector("button") as HTMLButtonElement;
const errorDiv = resetForm.querySelector("#errorDiv") as HTMLDivElement;
const spinner = `<div class='spinner-border spinner-border-sm' aria-hidden='true' role='status'></div>
                Please wait... `;
const infoTag = resetForm.querySelector("p.info") as HTMLParagraphElement;
resetForm.onsubmit = (e) => {
    e.preventDefault();
    btn.disabled = true;
    const aj = new Ajax(resetForm as HTMLFormElement);
    aj.setBefore(() => {
        btn.innerHTML = spinner;
    });
    aj.setAfter((responseText: string) => {
        // console.log(responseText);
        if (responseText.toLowerCase().indexOf("success") != -1) {
            infoTag.classList.remove("d-none");
            infoTag.classList.add("d-block");
            btn.disabled = false;
            btn.innerHTML = "Proceed";
            errorDiv.classList.remove("d-block");
            errorDiv.classList.add("d-none");
            const input = resetForm.querySelector("input") as HTMLInputElement;
            input.value = "";
        } 
        else {
            errorDiv.innerText = responseText;
            errorDiv.classList.remove("d-none");
            errorDiv.classList.add("d-block");
            btn.disabled = false;
            btn.innerHTML = "Proceed";
            errorDiv.focus();
        }
    });
    aj.start();
}