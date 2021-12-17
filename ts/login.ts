import { Ajax } from "./ajax.js";
const loginForm = document.getElementById("loginForm") as HTMLFormElement;
const button = loginForm.querySelector('button') as HTMLButtonElement;
const errorDiv = loginForm.querySelector("#errorDiv") as HTMLDivElement;
const spinner = `<div class='spinner-border spinner-border-sm' aria-hidden='true' role='status'></div>
                Please wait... `;
loginForm.onsubmit = (e) => {
    e.preventDefault();
    const aj = new Ajax(loginForm as HTMLFormElement);
    aj.setBefore(() => {
        button.disabled = true;
        button.innerHTML = spinner;
    });
    aj.setAfter((responseText: string) => {
        console.log(responseText);
        if (responseText.toLowerCase().indexOf("success") != -1) location.href = "dashboard";
        else {
            errorDiv.innerText = responseText;
            errorDiv.classList.remove("d-none");
            errorDiv.classList.add("d-block");
            button.disabled = false;
            button.innerHTML = "Register";
            errorDiv.focus();
        }
    });
    aj.start();
}
