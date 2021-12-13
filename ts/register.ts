import { Ajax } from "./ajax.js";
const registerForm = document.getElementById('register-form') as HTMLFormElement;
const submitBtn = registerForm.querySelector("button") as HTMLButtonElement;
const messageDiv = registerForm.querySelector(".message") as HTMLDivElement;
registerForm.onsubmit = (event) => {
    submitBtn.disabled = true;
    submitBtn.innerText = "Please wait...";
    event.preventDefault();
    const aj = new Ajax(event.target as HTMLFormElement);
    console.log(event.target);
    aj.setAfter((responseText: string) => {
        console.log(responseText);
        if (responseText.indexOf("success") != -1) location.href = "dashboard.php";
        else messageDiv.innerHTML = responseText;
    });
    aj.start();
}
