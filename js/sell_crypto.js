import { Ajax } from "./ajax.js";
var allCopyBtn = document.querySelectorAll(".copyBtn");
var backBtn = document.querySelector("span#backBtn");
backBtn.onclick = function (event) {
    event.stopPropagation();
    history.go(-1);
};
allCopyBtn.forEach(function (element) {
    element.onclick = function () {
        var _a, _b;
        var greatGrandParent = (_b = (_a = element.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement;
        var val = greatGrandParent.querySelector('span.value');
        navigator.clipboard.writeText(val.innerText);
        console.log(val.innerText);
    };
});
var uploadForm = document.querySelector("form#uploadForm");
var errorDiv = uploadForm.querySelector("div#errorDiv");
var spinner = "<div class='spinner-border spinner-border-sm' aria-hidden='true' role='status'></div>\n                Please wait... ";
var submitBtn = uploadForm.querySelector("button");
var input = uploadForm.querySelector("input#upload");
var imgNumber = uploadForm.querySelector("span.file-placeholder");
var text = imgNumber.innerText;
var isError = false;
input.onchange = function (event) {
    var files = input.files;
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
        console.log("submitting...");
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
                imgNumber.innerText = text;
            }
        });
        aj.start();
    }
    else {
        input.value = "";
        errorDiv.innerText = "Some of the files selected are not image files.";
        errorDiv.classList.remove("d-none");
        errorDiv.classList.add("d-block");
        imgNumber.innerHTML = "";
        imgNumber.innerText = text;
    }
};
