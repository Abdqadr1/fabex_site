import { Ajax } from "./ajax.js";
var settingsDiv = document.querySelector("#settings_pass_div");
var changePassDiv = document.querySelector("#change_pass_div");
var changePassAnchor = document.querySelector("#change_pass_a");
var backbtn = document.querySelector("#backbtn");
var loadingContainer = document.querySelector("div#loadingContainer");
var changeInfoForm = document.querySelector("form#changeInfoForm");
var changePassForm = document.querySelector("form#changePassForm");
var changeInfoBtn = changeInfoForm.querySelector("button");
var changePassBtn = changePassForm.querySelector("button");
var changeInfoErrorDiv = changeInfoForm.querySelector("div#errorDiv");
var changePassErrorDiv = changePassForm.querySelector("div#errorDiv");
var changeInfoSuccessDiv = changeInfoForm.querySelector("div#successDiv");
var changePassSuccessDiv = changePassForm.querySelector("div#successDiv");
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
    // TODO: dont forget to change the url before uploading to the server
    console.info("fetching data from the server...");
    Ajax.fetchPage(/** correct the url before server */ "/fabex/php/get_user_data.php", function (data) {
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
