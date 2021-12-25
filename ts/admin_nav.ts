let version = 1.00;
import { Ajax } from "./ajax.js";
const jsFolder = "../js/admin_";
const navLinks = document.querySelectorAll("li>a.nav-link") as NodeListOf<HTMLAnchorElement>;
const navToggleButton = document.querySelector(".dropdown-toggle") as HTMLAnchorElement;
const container = document.querySelector("div#container") as HTMLDivElement;
const navLinkDiv = document.querySelector("div#navbarTogglerDemo03") as HTMLDivElement;
const loaderHTML = `<div class='d-flex align-items-center justify-content-center' style='height: 100%;'>
            <div class='spinner-border text-primary' role='status' style='height: 60px; width:60px;'>
                <span class='visually-hidden'>Loading...</span>
            </div>
        </div>`;
let activePage = "";
const orderNavLink = document.querySelector("a.nav-link.active") as HTMLAnchorElement;
navLinks.forEach(element => {
    element.onclick = (event) => {
        event.preventDefault();
        (navToggleButton.parentElement as HTMLButtonElement).classList.add("collapsed");
        (navToggleButton.parentElement as HTMLButtonElement).setAttribute("aria-expanded", "false");
        navLinkDiv.classList.remove("show");
        let text = element.innerText;
        if (activePage !== text) {
            container.innerHTML = "";
            container.innerHTML = loaderHTML;
            //load page asynchronously
            load(text);
            console.log("loading page...");
            activePage = text;
            navToggleButton.innerText = text;
            let active = "active";
            let borderBottom = "border-bottom"
            let border2 = "border-2";
            let borderPrimary = "border-primary";
            let dSMNone = "d-none";
            let dMdBlock = "d-md-block";
            navLinks.forEach(el => {
                if (el.innerText === text) {
                    el.classList.add(active);
                    el.classList.add(borderBottom);
                    el.classList.add(border2);
                    el.classList.add(borderPrimary);
                    el.classList.add(dSMNone);
                    el.classList.add(dMdBlock);
                } else {
                    el.classList.remove(active);
                    el.classList.remove(borderBottom);
                    el.classList.remove(border2);
                    el.classList.remove(borderPrimary);
                    el.classList.remove(dSMNone);
                }
            });
        }
    }
});

const load = (pageName: string) => {
    version = version + 0.001;
    const url: string = "../fabex-admin/" + pageName.toLowerCase() + ".php";
    Ajax.fetchPage(url, (data:string) => {
        container.innerHTML = "";
        container.innerHTML = data;
        const scriptB4 = container.querySelector("script#pageScript") as HTMLScriptElement;
        if (scriptB4 !== null) {
            container.removeChild(scriptB4);
        }
        const script = document.createElement("script");
        script.src = jsFolder + pageName.toLowerCase() + ".js?version="+version;
        script.setAttribute("type", "module");
        script.id = "pageScript";
        container.appendChild(script);
    })
}
navLinks[0].click();
