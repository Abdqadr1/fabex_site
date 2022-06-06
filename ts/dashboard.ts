declare const bootstrap: any;
declare const isNotAllowed: boolean;
declare let dash_version: number;
declare let version: number;
declare let activePage:string;
dash_version += 0.001;
version += 0.001;

import { Ajax } from "./ajax.js";

const container = document.querySelector("div#container") as HTMLDivElement;
const view_all = document.querySelector("p#view_all") as HTMLParagraphElement;
const navLinks = document.querySelectorAll("li>a.nav-link") as NodeListOf<HTMLAnchorElement>;
const navToggleButton = document.querySelector(".dropdown-toggle") as HTMLAnchorElement;
const tradeCrypto = document.querySelector("[data-trade-crypto]") as HTMLDivElement;
const tradeGiftcard = document.querySelector("[data-trade-giftcard]") as HTMLDivElement;


if (isNotAllowed) {
    console.log("You are not allowed")
} else {
    console.log("You are allowed");
}
function checkAllowed(isNotAllowed:boolean, f:Function) {
    if (isNotAllowed) {
        console.log("You are not allowed");
        const bankModalDiv = document.querySelector("[data-bank-modal]") as HTMLDivElement;
        const bankModalDivModal = new bootstrap.Modal(bankModalDiv, {
            keyboard: false,
        });
        bankModalDivModal.show();
    } else {
        console.log("You are allowed");
        f();
    }
}

tradeCrypto.addEventListener("click", (e) => {
    checkAllowed(isNotAllowed, () => location.href="crypto")
})

tradeGiftcard.addEventListener("click", (e) => {
    checkAllowed(isNotAllowed, () => location.href = "giftcard")
})




view_all.onclick = () => {
    // go to history
    load("history");
    activePage = "History";
    navToggleButton.innerText = activePage;
    let active = "active";
    let borderBottom = "border-bottom"
    let border2 = "border-2";
    let borderPrimary = "border-primary";
    let dSMNone = "d-none";
    let dMdBlock = "d-md-block";
    navLinks.forEach(el => {
        if (el.innerText === activePage) {
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
const load = (pageName: string) => {
    const ur = decodeURI(location.href).split("/");
    ur[ur.length - 1] = pageName.toLowerCase();
    history.pushState("", "", ur.join("/"));
    version = version + 0.001;
    const url: string = pageName.toLowerCase() + ".php";
    Ajax.fetchPage(url, (data:string) => {
        container.innerHTML = "";
        container.innerHTML = data;
        document.title = activePage
        const scriptB4 = container.querySelector("script#pageScript") as HTMLScriptElement;
        if (scriptB4 !== null) {
            container.removeChild(scriptB4);
        }
        const script = document.createElement("script");
        script.src = "../js/" + pageName.toLowerCase() + ".js?version="+version;
        script.setAttribute("type", "module");
        script.id = "pageScript";
        container.appendChild(script);
    })
}

const script = document.createElement("script");
script.type = "module";
script.src = "../js/history.js?version=" + dash_version;
container.appendChild(script);

const topTenScript = document.createElement("script");
topTenScript.type = "module";
topTenScript.src = "../js/top-ten.js?version=" + dash_version;
container.appendChild(topTenScript);


// for timeout
import "./timeout.js";