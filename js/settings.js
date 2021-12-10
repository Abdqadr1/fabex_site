"use strict";
var settingsDiv = document.querySelector("#settings_pass_div");
var changePassDiv = document.querySelector("#change_pass_div");
var changePassAnchor = document.querySelector("#change_pass_a");
var backbtn = document.querySelector("#backbtn");
changePassAnchor.onclick = function (event) {
    event.preventDefault();
    console.log("a clicked");
    backbtn.classList.remove("d-none");
    backbtn.classList.add("d-block");
    settingsDiv.classList.remove("d-block");
    settingsDiv.classList.add("d-none");
    changePassDiv.classList.remove("d-none");
    changePassDiv.classList.add("d-block");
};
backbtn.onclick = function (event) {
    console.log("btn clicked");
    changePassDiv.classList.remove("d-block");
    changePassDiv.classList.add("d-none");
    backbtn.classList.remove("d-block");
    backbtn.classList.add("d-none");
    settingsDiv.classList.remove("d-none");
    settingsDiv.classList.add("d-block");
};
