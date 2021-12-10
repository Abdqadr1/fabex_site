import { Ajax } from "./ajax.js";
const loginForm = document.getElementById("login-form") as HTMLFormElement;
const button = loginForm.querySelector('button') as HTMLButtonElement;
loginForm.onsubmit = (e) => {
    e.preventDefault();
    button.disabled = true;
    button.innerText = "Logging in...";
    const aj = new Ajax(loginForm);
    aj.setAfter((responseText: string) => {
        console.log(responseText);
        if (responseText.indexOf("success") != -1) location.href = "dashboard.php";
    });
    aj.start();
}
