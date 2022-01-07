import { Ajax } from "./ajax.js";
const settingsDiv = document.querySelector("#settings_pass_div") as HTMLDivElement;
const changePassDiv = document.querySelector("#change_pass_div") as HTMLDivElement;
const changePassAnchor = document.querySelector("#change_pass_a") as HTMLDivElement;
const backbtn = document.querySelector("#backbtn") as HTMLSpanElement;

const select = document.querySelector("select#bankname") as HTMLSelectElement;

const loadingContainer = document.querySelector("div#loadingContainer") as HTMLDivElement;

const changeInfoForm = document.querySelector("form#changeInfoForm") as HTMLFormElement;
const changePassForm = document.querySelector("form#changePassForm") as HTMLFormElement;
const changeInfoBtn = changeInfoForm.querySelector("button") as HTMLButtonElement;
const changePassBtn = changePassForm.querySelector("button") as HTMLButtonElement;
const changeInfoErrorDiv = changeInfoForm.querySelector("div#errorDiv") as HTMLDivElement;
const changePassErrorDiv = changePassForm.querySelector("div#errorDiv") as HTMLDivElement;
const changeInfoSuccessDiv = changeInfoForm.querySelector("div#successDiv") as HTMLDivElement;
const changePassSuccessDiv = changePassForm.querySelector("div#successDiv") as HTMLDivElement;
const toggleIcons = changePassForm.querySelectorAll("span.toggle-password") as NodeListOf<HTMLSpanElement>;
const passwordInputs = changePassForm.querySelectorAll('input[type=password]') as NodeListOf<HTMLInputElement>;
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

const spinner = `<div class='spinner-border spinner-border-sm' aria-hidden='true' role='status'></div> Please wait...`;

changePassAnchor.onclick = (event) => {
    event.preventDefault();
    backbtn.classList.remove("d-none");
    backbtn.classList.add("d-block");
    settingsDiv.classList.remove("d-block");
    settingsDiv.classList.add("d-none");
    changePassDiv.classList.remove("d-none");
    changePassDiv.classList.add("d-block");

}

backbtn.onclick = (event) => {
    changePassDiv.classList.remove("d-block");
    changePassDiv.classList.add("d-none");
    backbtn.classList.remove("d-block");
    backbtn.classList.add("d-none");
    settingsDiv.classList.remove("d-none");
    settingsDiv.classList.add("d-block");
}

changeInfoForm.onsubmit = event => {
    event.preventDefault();
    changeInfoBtn.disabled = true;
    const aj = new Ajax(changeInfoForm as HTMLFormElement);
    aj.setBefore(() => {
        changeInfoBtn.innerHTML = spinner;
    });
    aj.setAfter((responseText: string) => {
        console.log(responseText);
        if (responseText.toLowerCase().indexOf("success") != -1) {
            changeInfoSuccessDiv.innerText = responseText;
            changeInfoSuccessDiv.classList.remove("d-none");
            changeInfoSuccessDiv.classList.add("d-block");
            changeInfoErrorDiv.classList.remove("d-block");
            changeInfoErrorDiv.classList.add("d-none");
            changeInfoBtn.disabled = false;
            changeInfoBtn.innerHTML = "Save changes";
            changeInfoSuccessDiv.focus();
        } else {
            changeInfoSuccessDiv.classList.remove("d-block");
            changeInfoSuccessDiv.classList.add("d-none");
            changeInfoErrorDiv.innerText = responseText;
            changeInfoErrorDiv.classList.remove("d-none");
            changeInfoErrorDiv.classList.add("d-block");
            changeInfoBtn.disabled = false;
            changeInfoBtn.innerHTML = "Save changes";
            changeInfoErrorDiv.focus();
        }
    });
    aj.start();
}

changePassForm.onsubmit = event => {
    event.preventDefault();
    changePassBtn.disabled = true;
    const aj = new Ajax(changePassForm as HTMLFormElement);
    aj.setBefore(() => {
        changePassBtn.innerHTML = spinner;
    });
    aj.setAfter((responseText: string) => {
        console.log(responseText);
        if (responseText.toLowerCase().indexOf("success") != -1) {
            changePassSuccessDiv.innerText = responseText;
            changePassSuccessDiv.classList.remove("d-none");
            changePassSuccessDiv.classList.add("d-block");
            changePassErrorDiv.classList.remove("d-block");
            changePassErrorDiv.classList.add("d-none");
            changePassBtn.innerHTML = "Save changes";
            changePassSuccessDiv.focus();
            changePassForm.reset();
        } else {
            changePassSuccessDiv.classList.remove("d-block");
            changePassSuccessDiv.classList.add("d-none");
            changePassErrorDiv.innerText = responseText;
            changePassErrorDiv.classList.remove("d-none");
            changePassErrorDiv.classList.add("d-block");
            changePassBtn.innerHTML = "Save changes";
            changePassErrorDiv.focus();
        }
        changePassBtn.disabled = false;
    });
    aj.start();
}

(function () {
    // TODO: dont forget to change the url before uploading to the server
    console.info("fetching data from the server...");
    Ajax.fetchPage("php/get_user_data.php", (data: string) => {
        type user_data = {
            fname: string, lname: string, phone: string, email: string,
            bank_name: string, account_number: string, bvn: string
        };
        const json: user_data = JSON.parse(data);
        
        (changeInfoForm.querySelector("input#firstname") as HTMLInputElement).value = json.fname;
        (changeInfoForm.querySelector("input#lastname") as HTMLInputElement).value = json.lname;
        (changeInfoForm.querySelector("input#phonenumber") as HTMLInputElement).value = json.phone;
        (changeInfoForm.querySelector("input#email") as HTMLInputElement).value = json.email;
        // create option tag for the select
        const option = document.createElement("option") as HTMLOptionElement;
        option.value = json.bank_name;
        option.selected = true;
        option.hidden = true;
        option.innerText = json.bank_name;
        (changeInfoForm.querySelector("select#bankname") as HTMLInputElement).appendChild(option);
        (changeInfoForm.querySelector("input#accountnumber") as HTMLInputElement).value = json.account_number;
        (changeInfoForm.querySelector("input#bvn") as HTMLInputElement).value = json.bvn;
        (changeInfoForm.querySelector("span#account_name") as HTMLSpanElement).innerText = `${json.fname} ${json.lname}`;
        loadingContainer.classList.remove("d-block");
        loadingContainer.classList.add("d-none");
        settingsDiv.classList.remove("d-none");
        settingsDiv.classList.add("d-block");
    });
})();

// get all banks
(function () {
    //TODO: replace url before server
    Ajax.fetchPage("php/data.php?which=banks", (data: string) => {
        const bankList:[] = JSON.parse(data);
        bankList.forEach((bank:string) => {
            const option = document.createElement("option");
            option.value = bank;
            option.innerText = bank;
            select.appendChild(option);
        })
    })
}
)();