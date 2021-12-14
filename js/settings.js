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
(function () {
    // TODO: dont forget to change the url before uploading to the server
    console.info("fetching data from the server...");
    Ajax.fetchPage(/** correct the url before server */ "/fabex/php/get_user_data.php", function (data) {
        var json = JSON.parse(data);
        console.log(json);
        changeInfoForm.querySelector("input#firstname").value = json.fname;
        changeInfoForm.querySelector("input#lastname").value = json.lname;
        changeInfoForm.querySelector("input#phonenumber").value = json.phone;
        changeInfoForm.querySelector("select#bankname").value = json.bank_name;
        changeInfoForm.querySelector("input#accountnumber").value = json.account_number;
        changeInfoForm.querySelector("input#bvn").value = json.bvn;
        changeInfoForm.querySelector("span#account_name").innerText = json.fname + " " + json.lname;
        loadingContainer.classList.remove("d-block");
        loadingContainer.classList.add("d-none");
        settingsDiv.classList.remove("d-none");
        settingsDiv.classList.add("d-block");
    });
})();
