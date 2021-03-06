dash_version += 0.001;
version += 0.001;
import { Ajax } from "./ajax.js";
var container = document.querySelector("div#container");
var view_all = document.querySelector("p#view_all");
var navLinks = document.querySelectorAll("li>a.nav-link");
var navToggleButton = document.querySelector(".dropdown-toggle");
var tradeCrypto = document.querySelector("[data-trade-crypto]");
var tradeGiftcard = document.querySelector("[data-trade-giftcard]");
if (isNotAllowed) {
    console.log("You are not allowed");
}
else {
    console.log("You are allowed");
}
function checkAllowed(isNotAllowed, f) {
    if (isNotAllowed) {
        console.log("You are not allowed");
        var bankModalDiv = document.querySelector("[data-bank-modal]");
        var bankModalDivModal = new bootstrap.Modal(bankModalDiv, {
            keyboard: false,
        });
        bankModalDivModal.show();
    }
    else {
        console.log("You are allowed");
        f();
    }
}
tradeCrypto.addEventListener("click", function (e) {
    checkAllowed(isNotAllowed, function () { return location.href = "crypto"; });
});
tradeGiftcard.addEventListener("click", function (e) {
    checkAllowed(isNotAllowed, function () { return location.href = "giftcard"; });
});
view_all.onclick = function () {
    // go to history
    load("history");
    activePage = "History";
    navToggleButton.innerText = activePage;
    var active = "active";
    var borderBottom = "border-bottom";
    var border2 = "border-2";
    var borderPrimary = "border-primary";
    var dSMNone = "d-none";
    var dMdBlock = "d-md-block";
    navLinks.forEach(function (el) {
        if (el.innerText === activePage) {
            el.classList.add(active);
            el.classList.add(borderBottom);
            el.classList.add(border2);
            el.classList.add(borderPrimary);
            el.classList.add(dSMNone);
            el.classList.add(dMdBlock);
        }
        else {
            el.classList.remove(active);
            el.classList.remove(borderBottom);
            el.classList.remove(border2);
            el.classList.remove(borderPrimary);
            el.classList.remove(dSMNone);
        }
    });
};
var load = function (pageName) {
    var ur = decodeURI(location.href).split("/");
    ur[ur.length - 1] = pageName.toLowerCase();
    history.pushState("", "", ur.join("/"));
    version = version + 0.001;
    var url = pageName.toLowerCase() + ".php";
    Ajax.fetchPage(url, function (data) {
        container.innerHTML = "";
        container.innerHTML = data;
        document.title = activePage;
        var scriptB4 = container.querySelector("script#pageScript");
        if (scriptB4 !== null) {
            container.removeChild(scriptB4);
        }
        var script = document.createElement("script");
        script.src = "../js/" + pageName.toLowerCase() + ".js?version=" + version;
        script.setAttribute("type", "module");
        script.id = "pageScript";
        container.appendChild(script);
    });
};
var script = document.createElement("script");
script.type = "module";
script.src = "../js/history.js?version=" + dash_version;
container.appendChild(script);
var topTenScript = document.createElement("script");
topTenScript.type = "module";
topTenScript.src = "../js/top-ten.js?version=" + dash_version;
container.appendChild(topTenScript);
// for timeout
import "./timeout.js";
