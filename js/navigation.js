import { Ajax } from "./ajax.js";
var jsFolder = "js/";
var navLinks = document.querySelectorAll("li>a.nav-link");
var navToggleButton = document.querySelector(".dropdown-toggle");
var container = document.querySelector("div#container");
var loaderHTML = "<div class='d-flex align-items-center justify-content-center' style='height: 100%;'>\n            <div class='spinner-border text-primary' role='status' style='height: 60px; width:60px;'>\n                <span class='visually-hidden'>Loading...</span>\n            </div>\n        </div>";
var activePage = "Dashboard";
navLinks.forEach(function (element) {
    element.onclick = function (event) {
        var text = element.innerText;
        if (activePage !== text) {
            container.innerHTML = "";
            container.innerHTML = loaderHTML;
            //load page asynchronously
            load(text);
            console.log("loading page...");
            activePage = text;
            navToggleButton.innerText = text;
            var active_1 = "active";
            var borderBottom_1 = "border-bottom";
            var border2_1 = "border-2";
            var borderPrimary_1 = "border-primary";
            var dSMNone_1 = "d-sm-none";
            var dMdBlock_1 = "d-md-block";
            navLinks.forEach(function (el) {
                if (el.innerText === text) {
                    el.classList.add(active_1);
                    el.classList.add(borderBottom_1);
                    el.classList.add(border2_1);
                    el.classList.add(borderPrimary_1);
                    el.classList.add(dSMNone_1);
                    el.classList.add(dMdBlock_1);
                }
                else {
                    el.classList.remove(active_1);
                    el.classList.remove(borderBottom_1);
                    el.classList.remove(border2_1);
                    el.classList.remove(borderPrimary_1);
                    el.classList.remove(dSMNone_1);
                }
            });
        }
    };
});
var load = function (pageName) {
    var url = pageName.toLowerCase() + ".php";
    Ajax.fetchPage(url, function (data) {
        container.innerHTML = "";
        container.innerHTML = data;
        var script = document.createElement("script");
        script.src = jsFolder + pageName.toLowerCase() + ".js";
        script.setAttribute("type", "module");
        container.appendChild(script);
        if (activePage === "Dashboard") {
            var fNameTag = container.querySelector("b#fname");
            fNameTag.innerText = fname;
        }
    });
    console.log(url);
};
