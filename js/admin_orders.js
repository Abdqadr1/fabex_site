"use strict";
var buttons = document.querySelectorAll("button.trading");
var spinner = "<div class='spinner-border spinner-border-sm' aria-hidden='true' role='status'></div>\n                Please wait... ";
var tabs = document.querySelectorAll(".nav-tab");
console.log(tabs);
tabs.forEach((function (tab) {
    tab.onclick = function (event) {
        event.preventDefault();
        console.log(tab);
    };
}));
var action = "buy";
buttons.forEach(function (element) {
    element.onclick = function (e) {
        var _a;
        element.classList.add("active");
        if (((_a = element.textContent) === null || _a === void 0 ? void 0 : _a.toLowerCase().indexOf("buy")) != -1) {
            action = "buy";
        }
        else {
            action = "sell";
        }
        var parent = element.parentElement;
        var children = parent.children;
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            if (child !== element) {
                child.classList.remove("active");
            }
        }
    };
});
