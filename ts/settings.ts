import { Ajax } from "./ajax.js";
const settingsDiv = document.querySelector("#settings_pass_div") as HTMLDivElement;
const changePassDiv = document.querySelector("#change_pass_div") as HTMLDivElement;
const changePassAnchor = document.querySelector("#change_pass_a") as HTMLDivElement;
const backbtn = document.querySelector("#backbtn") as HTMLSpanElement;

const loadingContainer = document.querySelector("div#loadingContainer") as HTMLDivElement;

const changeInfoForm = document.querySelector("form#changeInfoForm") as HTMLFormElement;
const changePassForm = document.querySelector("form#changePassForm") as HTMLFormElement;
const changeInfoBtn = changeInfoForm.querySelector("button") as HTMLButtonElement;
const changePassBtn = changePassForm.querySelector("button") as HTMLButtonElement;
const changeInfoErrorDiv = changeInfoForm.querySelector("div#errorDiv") as HTMLDivElement;
const changePassErrorDiv = changePassForm.querySelector("div#errorDiv") as HTMLDivElement;


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

(function () {
    // TODO: dont forget to change the url before uploading to the server
    console.info("fetching data from the server...");
    Ajax.fetchPage(/** correct the url before server */"/fabex/php/get_user_data.php", (data: string) => {
        type user_data = {
            fname: string, lname: string, phone: string, email: string,
            bank_name: string, account_number: string, bvn: string
        };
        const json:user_data  = JSON.parse(data);
        console.log(json);
        (changeInfoForm.querySelector("input#firstname") as HTMLInputElement).value = json.fname;
        (changeInfoForm.querySelector("input#lastname") as HTMLInputElement).value = json.lname;
        (changeInfoForm.querySelector("input#phonenumber") as HTMLInputElement).value = json.phone;
        (changeInfoForm.querySelector("select#bankname") as HTMLInputElement).value = json.bank_name;
        (changeInfoForm.querySelector("input#accountnumber") as HTMLInputElement).value = json.account_number;
        (changeInfoForm.querySelector("input#bvn") as HTMLInputElement).value = json.bvn;
        (changeInfoForm.querySelector("span#account_name") as HTMLSpanElement).innerText = `${json.fname} ${json.lname}`;
        loadingContainer.classList.remove("d-block");
        loadingContainer.classList.add("d-none");
        settingsDiv.classList.remove("d-none");
        settingsDiv.classList.add("d-block");
    });
})()