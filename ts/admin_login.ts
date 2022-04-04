import { Ajax } from "./ajax.js";
const loginForm = document.getElementById("loginForm") as HTMLFormElement;
const button = loginForm.querySelector('button') as HTMLButtonElement;
const errorDiv = loginForm.querySelector("#errorDiv") as HTMLDivElement;
const spinner = `<div class='spinner-border spinner-border-sm' aria-hidden='true' role='status'></div>
                Please wait... `;
const toggleIcon = loginForm.querySelector("span.toggle-password") as HTMLSpanElement;
const passwordInput = loginForm.querySelector('input[type=password]') as HTMLInputElement;
toggleIcon.onclick = event => {
    event.stopPropagation();
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleIcon.innerText = "visibility_off"
    } else {
        passwordInput.type = "password";
        toggleIcon.innerText = "visibility";
    }
}

const timeout = () : void => {
    errorDiv.innerText = "Request taking too long, Check your internet connection";
    errorDiv.classList.remove("d-none");
    errorDiv.classList.add("d-block");
    button.disabled = false;
    button.innerHTML = "Login";
    errorDiv.focus();
}
                
loginForm.onsubmit = (e) => {
    e.preventDefault();
    const aj = new Ajax(loginForm as HTMLFormElement);
    aj.setTimer(timeout, 180000);
    aj.setBefore(() => {
        button.disabled = true;
        button.innerHTML = spinner;
    });
    aj.setError((xhttp: XMLHttpRequest) => {
        console.log(xhttp.status);
    })
    aj.setAfter((responseText: string) => {
        if (responseText.toLowerCase().indexOf("success") != -1) location.href = "orders";
        else {
            errorDiv.innerText = responseText;
            errorDiv.classList.remove("d-none");
            errorDiv.classList.add("d-block");
            button.disabled = false;
            button.innerHTML = "Login";
            errorDiv.focus();
        }
    });
    aj.start();
}
