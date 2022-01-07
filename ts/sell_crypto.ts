import { Ajax } from "./ajax.js";
const allCopyBtn = document.querySelectorAll(".copyBtn") as NodeListOf<HTMLSpanElement>;
const backBtn = document.querySelector("span#backBtn") as HTMLSpanElement;
backBtn.onclick = event => {
    event.stopPropagation();
    history.go(-1);
}
allCopyBtn.forEach(element => {
    element.onclick = () => {
        const greatGrandParent = element.parentElement?.parentElement?.parentElement as HTMLDivElement;
        const val = greatGrandParent.querySelector('span.value') as HTMLSpanElement;
        navigator.clipboard.writeText(val.innerText);
        // console.log(val.innerText);
    }
});
const uploadForm = document.querySelector("form#uploadForm") as HTMLFormElement;
const errorDiv = uploadForm.querySelector("div#errorDiv") as HTMLDivElement;
const spinner = `<div class='spinner-border spinner-border-sm' aria-hidden='true' role='status'></div>
                Please wait... `;
const submitBtn = uploadForm.querySelector("button") as HTMLButtonElement;  
const input = uploadForm.querySelector("input#upload") as HTMLInputElement; 
const imgNumber = uploadForm.querySelector("span.file-placeholder") as HTMLSpanElement;  
const text = imgNumber.innerText;         
let isError: boolean = false;
input.onchange = event => {
    const files: FileList = input.files as FileList;
    imgNumber.innerHTML = "";
    imgNumber.innerText = files.length + " file(s) selected";
    let i = -1;
    while (i++ < files.length - 1) {
        const file = files.item(i);
        const type = file?.type;
        if (type?.indexOf("image") == -1) {
            isError = true;
            break;
        } else {
            isError = false;
        }
    }
}
uploadForm.onsubmit = event => {
    event.preventDefault();
    if (!isError) {
        errorDiv.classList.remove("d-block");
        errorDiv.classList.add("d-none");
        const aj = new Ajax(uploadForm as HTMLFormElement);
        // console.log("submitting...")
        aj.setBefore(() => {
            submitBtn.disabled = true;
            submitBtn.innerHTML = spinner;
        });
        aj.setAfter((responseText: string) => {
            if (responseText.toLowerCase().indexOf("success") != -1) {
                location.href = "dashboard";
            } else {
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
    } else {
        input.value = "";
        errorDiv.innerText = "Some of the files selected are not image files.";
        errorDiv.classList.remove("d-none");
        errorDiv.classList.add("d-block");
        imgNumber.innerHTML = "";
        imgNumber.innerText = text;
    }
}