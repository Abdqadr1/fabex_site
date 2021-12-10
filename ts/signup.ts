import { Ajax } from "./ajax.js";
const signupForm = document.getElementById('signup-form') as HTMLFormElement;
const submitBtn = signupForm.querySelector("button") as HTMLButtonElement;
const messageDiv = signupForm.querySelector(".message") as HTMLDivElement;
signupForm.onsubmit = (event) => {
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
