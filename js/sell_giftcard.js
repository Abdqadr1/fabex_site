import { Ajax } from "./ajax.js";
var backBtn = document.querySelector("span#backBtn");
backBtn.onclick = function (event) {
    event.stopPropagation();
    history.go(-1);
};
var uploadForm = document.querySelector("form#uploadForm");
var input = uploadForm.querySelector("input#upload");
var submitBtn = uploadForm.querySelector("button");
var errorDiv = uploadForm.querySelector("#errorDiv");
var spinner = "<div class='spinner-border spinner-border-sm' aria-hidden='true' role='status'></div>\n                Please wait... ";
var isError = false;
var imgNumber = document.querySelector("span#number");
input.onchange = function (event) {
    var files = input.files;
    imgNumber.classList.remove("material-icons");
    imgNumber.classList.add("fs-4");
    imgNumber.innerHTML = "";
    imgNumber.innerText = files.length + " file(s) selected";
    var i = -1;
    while (i++ < files.length - 1) {
        var file = files.item(i);
        var type = file === null || file === void 0 ? void 0 : file.type;
        if ((type === null || type === void 0 ? void 0 : type.indexOf("image")) == -1) {
            isError = true;
            break;
        }
        else {
            isError = false;
        }
    }
};
uploadForm.onsubmit = function (event) {
    event.preventDefault();
    if (!isError) {
        errorDiv.classList.remove("d-block");
        errorDiv.classList.add("d-none");
        var aj = new Ajax(uploadForm);
        // console.log("submitting...")
        aj.setBefore(function () {
            submitBtn.disabled = true;
            submitBtn.innerHTML = spinner;
        });
        aj.setAfter(function (responseText) {
            if (responseText.toLowerCase().indexOf("success") != -1) {
                location.href = "dashboard";
            }
            else {
                input.value = "";
                submitBtn.disabled = false;
                submitBtn.innerHTML = "Proceed";
                errorDiv.innerText = responseText;
                errorDiv.classList.remove("d-none");
                errorDiv.classList.add("d-block");
                imgNumber.classList.remove("fs-4");
                imgNumber.innerText = "add";
            }
        });
        aj.start();
    }
    else {
        input.value = "";
        errorDiv.innerText = "Some of the files selected are not image files.";
        errorDiv.classList.remove("d-none");
        errorDiv.classList.add("d-block");
        imgNumber.classList.remove("fs-4");
        imgNumber.classList.add("material-icons");
        imgNumber.innerHTML = "";
        imgNumber.innerText = "add";
    }
};
// for timeout
import "./timeout.js";
