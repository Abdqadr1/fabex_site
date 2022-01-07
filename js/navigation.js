import { Ajax } from "./ajax.js";
var jsFolder = "../js/";
var navLinks = document.querySelectorAll("li>a.nav-link");
var navToggleButton = document.querySelector(".dropdown-toggle");
var container = document.querySelector("div#container");
var navLinkDiv = document.querySelector("div#navbarTogglerDemo03");
var loaderHTML = "<div class='d-flex align-items-center justify-content-center' style='height: 100%;'>\n            <div class='spinner-border text-primary' role='status' style='height: 60px; width:60px;'>\n                <span class='visually-hidden'>Loading...</span>\n            </div>\n        </div>";
var activate = function (activePage) {
    navLinks.forEach(function (el) {
        var text = el.innerText;
        var active = "active";
        var borderBottom = "border-bottom";
        var border2 = "border-2";
        var borderPrimary = "border-primary";
        var dSMNone = "d-none";
        var dMdBlock = "d-md-block";
        if (activePage.toLowerCase() === text.toLowerCase()) {
            navToggleButton.innerText = text;
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
navLinks.forEach(function (element) {
    element.onclick = function (event) {
        event.preventDefault();
        navToggleButton.parentElement.classList.add("collapsed");
        navToggleButton.parentElement.setAttribute("aria-expanded", "false");
        navLinkDiv.classList.remove("show");
        var text = element.innerText;
        if (activePage !== text) {
            container.innerHTML = "";
            container.innerHTML = loaderHTML;
            load(text);
            activePage = text;
            activate(activePage);
        }
    };
});
var load = function (pageName) {
    //TODO: change url before server
    history.pushState("", "", "http://localhost/fabex/account/" + pageName.toLowerCase());
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
        script.src = jsFolder + pageName.toLowerCase() + ".js?version=" + version;
        script.setAttribute("type", "module");
        script.id = "pageScript";
        container.appendChild(script);
        if (activePage === "Dashboard") {
            var fNameTag = container.querySelector("span#fname");
            fNameTag.innerText = fname;
        }
    });
};
// get page
(function () {
    switch (page.toLowerCase()) {
        case "settings":
            activePage = "Settings";
            load(activePage);
            break;
        case "history":
            activePage = "History";
            load(activePage);
            break;
        case "rates":
            activePage = "Rates";
            load(activePage);
            break;
        case "dashboard":
            activePage = "Dashboard";
            load(activePage);
            break;
        default:
            location.href = "../errors/404.html";
    }
    activate(activePage);
})();
