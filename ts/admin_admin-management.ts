import { Ajax } from "./ajax.js";
declare const  bootstrap:any;
const audit = document.querySelector("[data-audit]") as HTMLTemplateElement;
const admins = document.querySelector("[data-admins]") as HTMLTemplateElement;
const noAdminTemplate = document.querySelector("[data-no-admin]") as HTMLTemplateElement;
const adminItem = document.querySelector("[data-admin-item]") as HTMLTemplateElement;
const noFeedTemplate = document.querySelector("[data-no-feeds]") as HTMLTemplateElement;
const feedItem = document.querySelector("[data-feed-item]") as HTMLTemplateElement;
const registerAdmin = document.querySelector("#register_admin") as HTMLDivElement;
const spinner = `<div class='spinner-border text-light spinner-border-sm' aria-hidden='true' role='status'></div>`;
const deleteModalDiv = document.querySelector("#delete-modal") as HTMLDivElement;
const deleteModalName = deleteModalDiv.querySelector("[data-name]") as HTMLElement;
const deleteModalBtn = deleteModalDiv.querySelector("[data-delete]") as HTMLButtonElement;
const registerSection = document.querySelector("#registerSection") as HTMLElement;
const adminSection = document.querySelector("#adminSection") as HTMLDivElement;
const bactBtn = registerSection.querySelector(".backBtn") as HTMLSpanElement;
const registerForm = document.getElementById("registerForm") as HTMLFormElement;
const alertDiv = registerForm.querySelector("#alertDiv") as HTMLDivElement;
const submitBtn = registerForm.querySelector("button") as HTMLButtonElement;
const toggleIcons = registerForm.querySelectorAll(
  "span.toggle-password"
) as NodeListOf<HTMLSpanElement>;
const passwordInputs = registerForm.querySelectorAll(
  "input[type=password]"
) as NodeListOf<HTMLInputElement>;
toggleIcons.forEach((icon, index) => {
  icon.onclick = (event) => {
    event.stopPropagation();
    const passwordInput = passwordInputs[index];
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      icon.innerText = "visibility_off";
    } else {
      passwordInput.type = "password";
      icon.innerText = "visibility";
    }
  };
});
type feedType = {tx_id:string, description:string, full_name:string}
type adminType = {
  id: string,
  access: string,
  access_level: string,
  full_name: string,
  email: string
};
let deleteModal:any;
const toggleSections = () => {
    registerSection.classList.toggle("d-none");
    adminSection.classList.toggle("d-none");
}
registerAdmin.onclick = ()=> toggleSections();
bactBtn.onclick = () => toggleSections();



registerForm.onsubmit = event => {
    event.preventDefault();
    console.log("submitting admin form...");
    const ajax = new Ajax(event.target as HTMLFormElement);
    ajax.setBefore(()=> {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `${spinner} please wait`;
    })
    ajax.setAfter((data:string) => {
        const response = JSON.parse(data);
        alert(response);
        toggleSections();
        getAdmins();
    })
    ajax.setError((xhttp: XMLHttpRequest)=> {
        const response = JSON.parse(xhttp.response)
        const status:number = xhttp.status;
        console.log("error", response);
        if(status == 403){
            location.href = "../errors/403.html"
        }
        if(status == 400 || status == 500){
            alertDiv.textContent = response;
            alertDiv.classList.remove("d-none");
            alertDiv.focus();
        }
    })
    ajax.setFinally(()=>{
        submitBtn.innerHTML = "Register";
        submitBtn.disabled = false;
    })
    ajax.start();
}

//show and hide modal
const showModal = (name: string, id:number, el:HTMLDivElement) => {
    if(!deleteModal){
        deleteModal = new bootstrap.Modal(deleteModalDiv, {
            keyboard: false
        });
    }
    deleteModalName.textContent = name;
    deleteModalBtn.onclick = () => deleteAdmin(deleteModalBtn, id, el);
    deleteModal.show();
}

function deleteAdmin(button:HTMLButtonElement, _id:number, el:HTMLDivElement){
    button.disabled =true;
    button.innerHTML = spinner;
    Ajax.fetchPage(`php/delete_admin.php`, (data:string) => {
        const str:string = JSON.parse(data);
        alert(str)
        if(str.endsWith("deleted")){
            admins.removeChild(el);
        }
    }, {_id},
     [() => {},
        () => {
            deleteModal.hide();
            button.innerHTML = "Delete";
            button.disabled = false;}])
}

function toggleAccess(event:Event, _id:number){
    const button = event.target as HTMLButtonElement;
    let _access = Number(button.getAttribute("data-access"));
    _access = (_access === 1) ? 0 : 1;
    button.innerHTML = spinner;
    button.disabled = true;
    Ajax.fetchPage(`php/toggle_admin_access.php`, (data:string) => {
        const str:string = JSON.parse(data);
        alert(str);
        if(str.endsWith("updated")){
            button.setAttribute("data-access", _access.toString());
            if(_access === 1) {
                button.textContent = "Disable Access";
                button.classList.remove("btn-primary");
                button.classList.add("btn-danger");
            } else {
                button.textContent = "Enable Access";
                button.classList.remove("btn-danger");
                button.classList.add("btn-primary");
            }
        }
        
    }, {_id, _access}, [()=>{}, ()=>button.disabled=false])
}

function getAdmins(){
    admins.innerHTML = spinner;
    Ajax.fetchPage(
    `php/admin_data.php?which=admins`,
    (data: string) => {
        const arr: adminType[] = JSON.parse(data);
        admins.innerHTML = "";
        if (arr.length > 0) {
        arr.forEach((admin) => {
            const el = adminItem.content.cloneNode(true)
            .childNodes[1] as HTMLDivElement;
            const name = el.querySelector("[data-name]") as HTMLDivElement;
            const email = el.querySelector("[data-email]") as HTMLDivElement;
            const button = el.querySelector(
            "[data-button]"
            ) as HTMLButtonElement;
            const deleteBtn = el.querySelector(
            "[data-delete-button]"
            ) as HTMLSpanElement;
            name.textContent = admin.full_name;
            email.textContent = admin.email;
            const access: number = Number(admin.access);
            const id: number = Number(admin.id);
            if (access === 1) {
            button.classList.replace("btn-primary", "btn-danger");
            button.textContent = "Disable Access";
            } else {
            button.classList.replace("btn-danger", "btn-primary");
            button.textContent = "Enable Access";
            }
            button.setAttribute("data-access", admin.access)
            button.onclick = (event) => toggleAccess(event, id);
            deleteBtn.onclick = (event) => showModal(admin.full_name, id, el);
            admins.appendChild(el);
        });
        } else {
        const el = noAdminTemplate.content.cloneNode(true)
            .childNodes[1] as HTMLDivElement;
        const button = el.querySelector("button") as HTMLButtonElement;
        button.onclick = () => toggleSections();
        admins.appendChild(el);
        }
    },
    {},
    [
        (response: any) => {
        if (response.status === 403) location.href = "../errors/403.html";
        },
    ]
    );
}

// get admins
(function () {
   getAdmins();
})();

//get feeds
(function(){
    audit.innerHTML = spinner;
    Ajax.fetchPage(`php/activity_feeds.php?which=admins`, (data:string) => {
        const arr:feedType[] = JSON.parse(data);
        audit.innerHTML = "";
        if(arr.length > 0){
            arr.forEach(feed => {
                const el = feedItem.content.cloneNode(true).childNodes[1] as HTMLDivElement;
                const name = el.querySelector("[data-name]") as HTMLElement;
                const action = el.querySelector("[data-action]") as HTMLSpanElement;
                const tx_id = el.querySelector("[data-id]") as HTMLSpanElement;
                name.textContent = feed.full_name;
                action.textContent = feed.description;
                tx_id.textContent = feed.tx_id.toUpperCase();
                audit.appendChild(el);
            })
        }else {
            const el = noFeedTemplate.content.cloneNode(true).childNodes[1] as HTMLDivElement;
            audit.appendChild(el);
        }
    }, {}, [
        (response:any) => {
            if (response.status === 403) location.href = "../errors/403.html";
        }]);
})()
