import { Ajax } from "./ajax.js";
var whichSelect = document.querySelector("select#which");
var buttons = document.querySelectorAll("button.trading");
var loadingContainer = document.querySelector("div#orders_loading");
var table = document.querySelector("table#table");
var tableHeader = table.querySelector("thead#header");
var headers = tableHeader.querySelectorAll("tr.heading");
var tableBody = table.querySelector("tbody#table_body");
var spinner = "<div class='spinner-border spinner-border-sm' aria-hidden='true' role='status'></div>";
var tabs = document.querySelectorAll(".nav-tab");
var modal = document.querySelector("div#modal");
var modalBody = modal.querySelector("div.modal-body");
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
var filterObj = {
    which: "crypto",
    type: 0,
    status: 1
};
whichSelect.onchange = function (event) {
    if (whichSelect.value != filterObj.which) {
        filterObj.which = whichSelect.value;
        fetchOrders(filterObj);
    }
};
tabs.forEach((function (tab) {
    tab.onclick = function (event) {
        event.preventDefault();
        var value = Number(tab.getAttribute("aria-value"));
        if (filterObj.status != value) {
            filterObj.status = value;
            tabs.forEach(function (tb) {
                var val = Number(tb.getAttribute("aria-value"));
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
            fetchOrders(filterObj);
        }
    };
}));
buttons.forEach(function (element) {
    element.onclick = function (e) {
        var value = Number(element.getAttribute("aria-value"));
        if (value != filterObj.type) {
            filterObj.type = value;
            buttons.forEach(function (btn) {
                var val = Number(btn.getAttribute("aria-value"));
                if (val == value) {
                    btn.classList.add("active");
                }
                else {
                    btn.classList.remove("active");
                }
            });
            fetchOrders(filterObj);
        }
    };
});
//show header
var showHeader = function (filters) {
    var w = filters.which == "crypto" ? 0 : 1;
    var s = filters.type + " " + w;
    headers.forEach(function (header) {
        var value = header.getAttribute("aria-value");
        if (value == s) {
            header.classList.remove("d-none");
        }
        else {
            header.classList.add("d-none");
        }
    });
    tableHeader.classList.remove("d-none");
};
var copyFunc = function (input) {
    var value = (typeof input === "string") ? input : input.value;
    navigator.clipboard.writeText(value);
    alert("Text copied!");
};
var cellNames = {
    "00": [8, ["id", "name", "product", ["amount", "price"], ["wallet_address", "network"], "memo", "time"]],
    "10": [7, ["id", "name", "product", ["amount", "price"], ["account_number", "bank_name"], "time"]],
    "01": [7, ["id", "name", "product", ["amount", "price"], "email", "time"]],
    "11": [7, ["id", "name", "product", ["amount", "price"], ["account_number", "bank_name"], "time"]]
};
// change table 
var changeTable = function (list, filters) {
    showHeader(filters);
    var w = filters.which == "crypto" ? 0 : 1;
    var cell = cellNames[filters.type + "" + w];
    var numberOfCells = cell[0];
    tableBody.innerHTML = "";
    if (list.length > 0) {
        list.forEach(function (order) {
            var tr = document.createElement("tr");
            var cellNames = cell[1];
            var _loop_1 = function (i) {
                var name_1 = cellNames[i];
                var td = document.createElement("td");
                if (typeof name_1 === "string") {
                    var val = order[name_1];
                    td.innerText = val.length > 20 ? val.substring(0, 17) + "..." : val;
                    if (name_1 === "memo" || name_1 === "email") {
                        td.innerHTML += "<span class='copy material-icons' title='copy full text'>content_copy</span>";
                        var copy = td.querySelector("span.copy");
                        if (copy)
                            copy.onclick = function () { return copyFunc(order[name_1]); };
                    }
                    if (name_1 === "time") {
                        // const date = new Date(order[name]);
                        // const today = new Date();
                        // const isToday = date.toDateString() === today.toDateString();
                        // const day = isToday ? 'Today' : date.toDateString();
                        // const amPm = date.getHours() > 12 ? "pm" : "am";
                        // if (isToday) {
                        // }
                        // console.log(date.toDateString() + day);
                    }
                }
                else if (name_1 instanceof Array) {
                    var content = order[name_1[0]];
                    var extra = order[name_1[1]];
                    //for bank and account number
                    if (name_1[0] == 'account_number') {
                        content = order[name_1[0]] || order["user_account_number"];
                        extra = order[name_1[1]] || order["user_bank"];
                    }
                    // Don't show copy icon for amount cell
                    var addCopy = name_1[0] == "amount" ? "" : "<span class='copy material-icons' title='copy full text'>content_copy</span>";
                    var val = content.length > 18 ? content.substring(0, 18) + "..." : content;
                    td.innerHTML = "<span class=\"val\">" + val + addCopy + "\n                        </span><br><span class=\"extra-detail\">" + extra + "</span>\n                        <input type=\"hidden\" id=\"hidden\" value=\"" + content + "\"/>";
                    var copy = td.querySelector("span.copy");
                    if (copy)
                        copy.onclick = function () { return copyFunc(td.querySelector("input#hidden")); };
                }
                else {
                    var id = order['id'];
                    var first = filters.status === 2 ? "reject" : "approve";
                    var second = filters.status === 1 ? "reject" : "undo";
                    td.className = "d-flex justify-content-center align-top";
                    td.innerHTML = "<button aria-id='" + id + "' class=\"action-button text-capitalize " + first + "\">" + first + "</button>\n                    <button aria-id='" + id + "' class=\"action-button text-capitalize " + second + "\">" + second + "</button>";
                    //registering click events for buttons
                    td.querySelectorAll("button").forEach(function (btn) {
                        btn.onclick = function () {
                            changeStatus(btn);
                        };
                    });
                }
                tr.appendChild(td);
            };
            for (var i = 0; i < numberOfCells; i++) {
                _loop_1(i);
            }
            tableBody.appendChild(tr);
        });
    }
    else {
        var html = "<tr><td class='text-center text-danger fs-5' colspan='" + numberOfCells + "' class=\"table-active\">No order found...</td>\n        </tr>";
        tableBody.innerHTML = html;
    }
    table.classList.remove("d-none");
};
//show and hide modal
var myModal;
var showModal = function (message, style, duration) {
    if (duration === void 0) { duration = 0; }
    modalBody.innerText = message;
    modalBody.className = "modal-body py-1 " + style;
    myModal = new bootstrap.Modal(modal, {
        keyboard: false
    });
    myModal.show();
    if (duration > 0) {
        setTimeout(function () {
            myModal.hide();
        }, duration);
    }
};
// fetch orders
var fetchOrders = function (filters) {
    var which = filters.which;
    var status = filters.status;
    var action = filters.type;
    loadingContainer.classList.remove("d-none");
    table.classList.add("d-none");
    Ajax.fetchPage("php/admin_data.php?which=orders", function (data) {
        var arr = JSON.parse(data);
        var message = arr[0];
        if (message.toLowerCase().indexOf("success") != -1) {
            changeTable(arr[1], filters);
        }
        else {
            showModal(message, "text-danger", 3000);
            changeTable([], filters);
        }
        loadingContainer.classList.add("d-none");
    }, { "type": which, "action": action, "status": status });
};
//change order status 
var changeStatus = function (btn) {
    var id = btn.getAttribute("aria-id");
    var val = btn.innerText.toLowerCase();
    // console.log("clicking ", id, val);
    // change the transaction status
    btn.innerHTML = spinner;
    Ajax.fetchPage("php/change_tx_status.php", function (data) {
        var _a;
        if (data.indexOf("success") != -1) {
            var tr = (_a = btn.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement;
            tableBody.removeChild(tr);
        }
        else {
            btn.innerText = val;
            showModal(data, "text-danger", 3000);
        }
    }, { "code": id, "action": val });
};
// get all orders
(function () {
    fetchOrders(filterObj);
})();
