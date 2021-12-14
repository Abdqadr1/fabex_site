import { Ajax } from "./ajax.js";
const newPassword = document.querySelector("form#newPassword") as HTMLFormElement;
const errorDiv = document.querySelector("#errorDiv") as HTMLDivElement;
const submitBtn = newPassword.querySelector("button") as HTMLButtonElement;
const spinner = `<div class='spinner-border spinner-border-sm' aria-hidden='true' role='status'></div>
                Please wait... `;
newPassword.onsubmit = (event) => {
    event.preventDefault();
    submitBtn.disabled = true;
    const aj = new Ajax(event.target as HTMLFormElement);
    aj.setBefore(() => {
        submitBtn.innerHTML = spinner;
    });
    aj.setAfter((responseText: string) => {
        console.log(responseText);
        if (responseText.indexOf("success") != -1) location.href = "congrats.php";
        else {
            errorDiv.innerHTML = responseText;
            errorDiv.classList.remove("d-none");
            errorDiv.classList.add("d-block");
            submitBtn.disabled = false;
            submitBtn.innerHTML = "Create password";
            errorDiv.focus();
        }
    });
    aj.start();

}