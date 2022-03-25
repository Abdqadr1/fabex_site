declare const fname: string;
declare let version: number;
declare let activePage: string;
declare let page: string;
import { Ajax } from "./ajax.js";
const jsFolder = "../js/";
const navLinks = document.querySelectorAll("li>a.nav-link") as NodeListOf<HTMLAnchorElement>;
const navToggleButton = document.querySelector(".dropdown-toggle") as HTMLAnchorElement;
const container = document.querySelector("div#container") as HTMLDivElement;
const navLinkDiv = document.querySelector("div#navbarTogglerDemo03") as HTMLDivElement;
const movingRatesDiv = document.querySelector("div.moving_rates") as HTMLDivElement;
const loaderHTML = `<div class='d-flex align-items-center justify-content-center' style='height: 100%;'>
            <div class='spinner-border text-primary' role='status' style='height: 60px; width:60px;'>
                <span class='visually-hidden'>Loading...</span>
            </div>
        </div>`;


const activate = (activePage: string) => {
    navLinks.forEach(el => {
        const text = el.innerText;
        let active = "active";
        let borderBottom = "border-bottom"
        let border2 = "border-2";
        let borderPrimary = "border-primary";
        let dSMNone = "d-none";
        let dMdBlock = "d-md-block";
        if (activePage.toLowerCase() === text.toLowerCase()) {
            navToggleButton.innerText = text;
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
    })
}
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
            load(text);
            activePage = text;
            activate(activePage);
        }
    }
});

const load = (pageName: string) => {
    //TODO: change url before server
    history.pushState("", "", "http://localhost/fabex/account/" + pageName.toLowerCase());
    version = version + 0.001;
    const url: string = pageName.toLowerCase() + ".php";
    Ajax.fetchPage(url, (data:string) => {
        container.innerHTML = "";
        container.innerHTML = data;
        document.title = activePage;
        const scriptB4 = container.querySelector("script#pageScript") as HTMLScriptElement;
        if (scriptB4 !== null) {
            container.removeChild(scriptB4);
        }
        const script = document.createElement("script");
        script.src = jsFolder + pageName.toLowerCase() + ".js?version="+version;
        script.setAttribute("type", "module");
        script.id = "pageScript";
        container.appendChild(script);
        if (activePage === "Dashboard") {
             const fNameTag = container.querySelector("span#fname") as HTMLSpanElement;
            fNameTag.innerText = fname;
        }
    })
}
// get page
(function () {
    switch (page.toLowerCase()) {
        case "settings":
            activePage = "Settings"
            load(activePage);
            break;
        case "history":
            activePage = "History"
            load(activePage);
            break;
        case "rates":
            activePage = "Rates"
            load(activePage);
            break;
        case "dashboard":
            activePage = "Dashboard"
            load(activePage);
            break;
        case "top-ten":
            activePage = "top-ten"
            load(activePage)
            break;
        default:
            location.href = "../errors/404.html"
    }
    activate(activePage)
})();

// number formatter
const numberFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 1,
    maximumFractionDigits: 2
})

// get top cryptocurrencies current prices
const socket = new WebSocket("wss://stream.binance.com:9443/ws")
const data = {
    method: 'SUBSCRIBE',
    params: ['btcusdt@trade', 'ethusdt@trade', 'bnbusdt@trade', 'dogeusdt@trade','solusdt@trade'],
    id:1
}
socket.onopen = () => {
    socket.send(JSON.stringify(data))
}
socket.onmessage = event => {
    const data: any = JSON.parse(event.data);
    const name:string = data.s;
    const price = numberFormatter.format(data.p);
    const el = movingRatesDiv.querySelector(`b#${name.toLowerCase()}`) as HTMLElement
    el.innerText = price;
    // console.log(name, price)
}