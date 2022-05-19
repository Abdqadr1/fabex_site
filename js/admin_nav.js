import { Ajax } from "./ajax.js";
if (isCompleted) {
    doComplete();
}
else {
    var spinner_1 = "<div class='spinner-border text-light spinner-border-sm' aria-hidden='true' role='status'></div>";
    var modalDiv_1 = document.querySelector("#password-modal");
    var passwordModal_1 = new bootstrap.Modal(modalDiv_1, { keyboard: false });
    var form = modalDiv_1.querySelector("form#passwordForm");
    var alertDiv_1 = form.querySelector("#alertDiv");
    var submitBtn_1 = form.querySelector("button");
    form.onsubmit = function (event) {
        event.preventDefault();
        var ajax = new Ajax(event.target);
        ajax.setBefore(function () {
            submitBtn_1.disabled = true;
            submitBtn_1.innerHTML = spinner_1;
        });
        ajax.setFinally(function () {
            submitBtn_1.innerHTML = "Change Password";
            submitBtn_1.disabled = false;
        });
        ajax.setError(function (xhttp) {
            var response = JSON.parse(xhttp.response);
            alertDiv_1.textContent = response;
            alertDiv_1.classList.remove("d-none");
        });
        ajax.setAfter(function (data) {
            var response = JSON.parse(data);
            if (response.endsWith("updated")) {
                alertDiv_1.textContent = response;
                alertDiv_1.classList.remove("d-none");
                alertDiv_1.classList.replace("alert-danger", "alert-success");
                passwordModal_1.hide();
                document.body.removeChild(modalDiv_1);
                doComplete();
            }
        });
        ajax.start();
    };
    passwordModal_1.show();
}
function doComplete() {
    var jsFolder = "../js/admin_";
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
                //load page asynchronously
                load(text);
                activePage = text;
                navToggleButton.innerText = text;
                var active_1 = "active";
                var borderBottom_1 = "border-bottom";
                var border2_1 = "border-2";
                var borderPrimary_1 = "border-primary";
                var dSMNone_1 = "d-none";
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
        var ur = decodeURI(location.href).split("/");
        ur[ur.length - 1] = pageName.toLowerCase();
        history.pushState("", "", ur.join("/"));
        version = version + 0.01;
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
            script.src =
                jsFolder + pageName.toLowerCase() + ".js?version=" + version;
            script.setAttribute("type", "module");
            script.id = "pageScript";
            container.appendChild(script);
        });
    };
    // get page
    (function () {
        switch (page.toLowerCase()) {
            case "orders":
                activePage = "orders";
                load(activePage);
                break;
            case "rate-management":
                activePage = "rate-management";
                load(activePage);
                break;
            case "settings":
                activePage = "settings";
                load(activePage);
                break;
            case "admin-management":
                activePage = "admin-management";
                load(activePage);
                break;
            default:
                console.log(page);
                location.href = "../errors/404.html";
        }
        activate(activePage);
    })();
}
