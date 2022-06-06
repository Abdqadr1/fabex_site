import { Ajax } from "./ajax.js";
const registerForm = document.getElementById('registerForm') as HTMLFormElement;
const submitBtn = registerForm.querySelector("button") as HTMLButtonElement;
const phoneInput = registerForm.querySelector("#phonenumber") as HTMLInputElement;
const errorDiv = registerForm.querySelector("#errorDiv") as HTMLDivElement;
const spinner = `<div class='spinner-border spinner-border-sm' aria-hidden='true' role='status'></div>
                Please wait... `;
const toggleIcons = registerForm.querySelectorAll("span.toggle-password") as NodeListOf<HTMLSpanElement>;
const passwordInputs = registerForm.querySelectorAll('input[type=password]') as NodeListOf<HTMLInputElement>;
toggleIcons.forEach((icon, index) => {
    icon.onclick = event => {
        event.stopPropagation();
        const passwordInput = passwordInputs[index];
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        icon.innerText = "visibility_off"
    } else {
        passwordInput.type = "password";
        icon.innerText = "visibility";
    }
}
})

registerForm.onsubmit = (event) => {
    event.preventDefault();
    if (isNaN(Number(phoneInput.value))) {
        errorDiv.textContent = "Invalid phone number";
        errorDiv.classList.remove("d-none");
        return;
     }
    const aj = new Ajax(event.target as HTMLFormElement);
    aj.setBefore(() => {
        submitBtn.disabled = true;
        submitBtn.innerHTML = spinner;
    });
    aj.setAfter((responseText: string) => {
        console.log(responseText);
        if (responseText.toLowerCase().indexOf("success") != -1) location.href = "confirm-email.php";
        else {
            errorDiv.innerText = responseText;
            errorDiv.classList.remove("d-none");
            submitBtn.disabled = false;
            submitBtn.innerHTML = "Register";
            errorDiv.focus();
        }
    });
    aj.start();
}
