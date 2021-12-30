"use strict";
var whichSelect = document.querySelector("select#which");
var buttons = document.querySelectorAll("button.trading");
var spinner = "<div class='spinner-border spinner-border-sm' aria-hidden='true' role='status'></div>\n                Please wait... ";
var tabs = document.querySelectorAll(".nav-tab");
var filterObj = {
    which: "crypto",
    type: "buy",
    status: "pending"
};
whichSelect.onchange = function (event) {
    if (whichSelect.value != filterObj.which) {
        filterObj.which = whichSelect.value;
        changeTable(filterObj);
    }
};
tabs.forEach((function (tab) {
    tab.onclick = function (event) {
        event.preventDefault();
        var value = tab.innerText;
        if (filterObj.status != value.toLowerCase()) {
            filterObj.status = value.toLowerCase();
            tabs.forEach(function (tb) {
                var val = tb.innerText;
                if (val == value) {
                    tb.classList.add("active");
                    tb.classList.add("border-bottom");
                    tb.classList.add("border-2");
                    tb.classList.add("border-primary");
                }
                else {
                    tb.classList.remove("active");
                    tb.classList.remove("border-bottom");
                    tb.classList.remove("border-2");
                    tb.classList.remove("border-primary");
                }
            });
            changeTable(filterObj);
        }
    };
}));
buttons.forEach(function (element) {
    element.onclick = function (e) {
        var _a;
        var action = "buy";
        element.classList.add("active");
        if (((_a = element.textContent) === null || _a === void 0 ? void 0 : _a.toLowerCase().indexOf("buy")) != -1) {
            action = "buy";
        }
        else {
            action = "sell";
        }
        if (action != filterObj.type) {
            var parent_1 = element.parentElement;
            var children = parent_1.children;
            for (var i = 0; i < children.length; i++) {
                var child = children[i];
                if (child !== element) {
                    child.classList.remove("active");
                }
            }
            changeTable(filterObj);
        }
    };
});
// change table 
var changeTable = function (filters) {
    console.log("table changing...");
};
