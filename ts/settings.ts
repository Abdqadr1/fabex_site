const settingsDiv = document.querySelector("#settings_pass_div") as HTMLDivElement;
const changePassDiv = document.querySelector("#change_pass_div") as HTMLDivElement;
const changePassAnchor = document.querySelector("#change_pass_a") as HTMLDivElement;
const backbtn = document.querySelector("#backbtn") as HTMLSpanElement;

changePassAnchor.onclick = (event) => {
    event.preventDefault();
    console.log("a clicked");
    backbtn.classList.remove("d-none");
    backbtn.classList.add("d-block");
    settingsDiv.classList.remove("d-block");
    settingsDiv.classList.add("d-none");
    changePassDiv.classList.remove("d-none");
    changePassDiv.classList.add("d-block");

}

backbtn.onclick = (event) => {
    console.log("btn clicked")
    changePassDiv.classList.remove("d-block");
    changePassDiv.classList.add("d-none");
    backbtn.classList.remove("d-block");
    backbtn.classList.add("d-none");
    settingsDiv.classList.remove("d-none");
    settingsDiv.classList.add("d-block");
}

