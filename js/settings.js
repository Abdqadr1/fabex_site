import { Ajax } from "./ajax.js";
var settingsDiv = document.querySelector("#settings_pass_div");
var changePassDiv = document.querySelector("#change_pass_div");
var changePassAnchor = document.querySelector("#change_pass_a");
var backbtn = document.querySelector("#backbtn");
var select = document.querySelector("select#bankname");
var loadingContainer = document.querySelector("div#loadingContainer");
var changeInfoForm = document.querySelector("form#changeInfoForm");
var changePassForm = document.querySelector("form#changePassForm");
var changeInfoBtn = changeInfoForm.querySelector("button");
var changePassBtn = changePassForm.querySelector("button");
var changeInfoErrorDiv = changeInfoForm.querySelector("div#errorDiv");
var changePassErrorDiv = changePassForm.querySelector("div#errorDiv");
var changeInfoSuccessDiv = changeInfoForm.querySelector("div#successDiv");
var changePassSuccessDiv = changePassForm.querySelector("div#successDiv");
var toggleIcons = changePassForm.querySelectorAll("span.toggle-password");
var passwordInputs = changePassForm.querySelectorAll('input[type=password]');
toggleIcons.forEach(function (icon, index) {
    icon.onclick = function (event) {
        event.stopPropagation();
        var passwordInput = passwordInputs[index];
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            icon.innerText = "visibility_off";
        }
        else {
            passwordInput.type = "password";
            icon.innerText = "visibility";
        }
    };
});
var spinner = "<div class='spinner-border spinner-border-sm' aria-hidden='true' role='status'></div> Please wait...";
changePassAnchor.onclick = function (event) {
    event.preventDefault();
    backbtn.classList.remove("d-none");
    backbtn.classList.add("d-block");
    settingsDiv.classList.remove("d-block");
    settingsDiv.classList.add("d-none");
    changePassDiv.classList.remove("d-none");
    changePassDiv.classList.add("d-block");
};
backbtn.onclick = function (event) {
    changePassDiv.classList.remove("d-block");
    changePassDiv.classList.add("d-none");
    backbtn.classList.remove("d-block");
    backbtn.classList.add("d-none");
    settingsDiv.classList.remove("d-none");
    settingsDiv.classList.add("d-block");
};
changeInfoForm.onsubmit = function (event) {
    event.preventDefault();
    changeInfoBtn.disabled = true;
    var aj = new Ajax(changeInfoForm);
    aj.setBefore(function () {
        changeInfoBtn.innerHTML = spinner;
    });
    aj.setAfter(function (responseText) {
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
        }
        else {
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
};
changePassForm.onsubmit = function (event) {
    event.preventDefault();
    changePassBtn.disabled = true;
    var aj = new Ajax(changePassForm);
    aj.setBefore(function () {
        changePassBtn.innerHTML = spinner;
    });
    aj.setAfter(function (responseText) {
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
        }
        else {
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
};
(function () {
    console.info("fetching data from the server...");
    Ajax.fetchPage("php/get_user_data.php", function (data) {
        var json = JSON.parse(data);
        changeInfoForm.querySelector("input#firstname").value = json.fname;
        changeInfoForm.querySelector("input#lastname").value = json.lname;
        changeInfoForm.querySelector("input#phonenumber").value = json.phone;
        changeInfoForm.querySelector("input#email").value = json.email;
        // create option tag for the select
        var option = document.createElement("option");
        option.value = json.bank_name;
        option.selected = true;
        option.hidden = true;
        option.innerText = json.bank_name;
        changeInfoForm.querySelector("select#bankname").appendChild(option);
        changeInfoForm.querySelector("input#accountnumber").value = json.account_number;
        changeInfoForm.querySelector("input#bvn").value = json.bvn;
        changeInfoForm.querySelector("span#account_name").innerText = json.fname + " " + json.lname;
        loadingContainer.classList.remove("d-block");
        loadingContainer.classList.add("d-none");
        settingsDiv.classList.remove("d-none");
        settingsDiv.classList.add("d-block");
    });
})();
// get all banks
(function () {
    Ajax.fetchPage("php/data.php?which=banks", function (data) {
        var bankList = JSON.parse(data);
        bankList.forEach(function (bank) {
            var option = document.createElement("option");
            option.value = bank;
            option.innerText = bank;
            select.appendChild(option);
        });
    });
})();
// for timeout
import "./timeout.js";
