import { Ajax } from "./ajax.js";
const registerForm = document.getElementById('registerForm') as HTMLFormElement;
const submitBtn = registerForm.querySelector("button") as HTMLButtonElement;
const errorDiv = registerForm.querySelector("#errorDiv") as HTMLDivElement;
const spinner = `<div class='spinner-border spinner-border-sm' aria-hidden='true' role='status'></div>
                Please wait... `;
registerForm.onsubmit = (event) => {
    submitBtn.disabled = true;
    event.preventDefault();
    const aj = new Ajax(event.target as HTMLFormElement);
    console.log(event.target);
    aj.setBefore(() => {
        submitBtn.innerHTML = spinner;
    });
    aj.setAfter((responseText: string) => {
        console.log(responseText);
        if (responseText.toLowerCase().indexOf("success") != -1) location.href = "confirm-email.php";
        else {
            errorDiv.innerText = responseText;
            errorDiv.classList.remove("d-none");
            errorDiv.classList.add("d-block");
            submitBtn.disabled = false;
            submitBtn.innerHTML = "Register";
            errorDiv.focus();
        }
    });
    aj.start();
}
