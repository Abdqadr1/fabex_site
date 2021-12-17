import { Ajax } from "./ajax.js";
const loginForm = document.getElementById("loginForm") as HTMLFormElement;
const button = loginForm.querySelector('button') as HTMLButtonElement;
const errorDiv = loginForm.querySelector("#errorDiv") as HTMLDivElement;
const spinner = `<div class='spinner-border spinner-border-sm' aria-hidden='true' role='status'></div>
                Please wait... `;
const timeout = (xhttp: XMLHttpRequest) => {
    errorDiv.innerText = "Request taking too long, Check your internet connection";
    errorDiv.classList.remove("d-none");
    errorDiv.classList.add("d-block");
    button.disabled = false;
    button.innerHTML = "Register";
    errorDiv.focus();
    xhttp.abort();
}
                
loginForm.onsubmit = (e) => {
    e.preventDefault();
    const aj = new Ajax(loginForm as HTMLFormElement);
    const timing = setTimeout(() => {
        timeout(aj.xhttp);
    }, 180000);
    aj.setBefore(() => {
        button.disabled = true;
        button.innerHTML = spinner;
    });
    aj.setError((xhttp: XMLHttpRequest) => {
        // console.log(xhttp);
    })
    aj.setAfter((responseText: string) => {
        clearTimeout(timing);
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
