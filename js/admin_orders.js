import { Ajax } from "./ajax.js";
var whichSelect = document.querySelector("select#which");
var buttons = document.querySelectorAll("button.trading");
var loadingContainer = document.querySelector("div#orders_loading");
var table = document.querySelector("table#table");
var tableHeader = table.querySelector("thead#header");
var headers = tableHeader.querySelectorAll("tr.heading");
var tableBody = table.querySelector("tbody#table_body");
var spinner = "<div class='spinner-border text-success spinner-border-sm' aria-hidden='true' role='status'></div>";
var tabs = document.querySelectorAll(".nav-tab");
var modal = document.querySelector("div#modal");
var modalBody = modal.querySelector("div.modal-body");
var detailsModal = document.querySelector("div#details_modal");
var searchForm = document.querySelector("form#searchForm");
var searchInput = searchForm.querySelector("[aria-describedby=search]");
var detailsModalBody = detailsModal.querySelector("div#details_modal_body");
var activityFeedTemplate = document.querySelector("[activity-feed-template]");
searchInput.oninput = function () { return filterObj.keyword = searchInput.value; };
searchForm.onsubmit = function (event) {
    event.preventDefault();
    console.log(filterObj);
    fetchOrders(filterObj);
};
var filterObj = {
    which: "crypto",
    type: 0,
    status: 1,
    keyword: ''
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
    "00": [8, ["tx_id", "name", "product", ["price", "amount"], ["wallet_address", "network"], "memo", "time"]],
    "10": [7, ["tx_id", "name", "product", ["price", "amount"], ["account_number", "bank_name"], "time"]],
    "01": [7, ["tx_id", "name", "product", ["price", "amount"], "email", "time"]],
    "11": [7, ["tx_id", "name", "product", ["price", "amount"], ["account_number", "bank_name"], "time"]]
};
// price and amount formatter
var dollarFormatter = new Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD', maximumFractionDigits: 2, minimumFractionDigits: 1 });
var nairaFormatter = new Intl.NumberFormat("en-NG", { style: 'currency', currency: 'NGN', maximumFractionDigits: 2, minimumFractionDigits: 1 });
var dateFormatter = new Intl.DateTimeFormat("en-NG", {
    month: "numeric",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    year: "2-digit"
});
var todayFormatter = new Intl.DateTimeFormat("en-NG", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
});
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
                    var val = (name_1 == "tx_id") ? order[name_1].toUpperCase() : order[name_1];
                    td.innerText = val.length > 19 ? val.substring(0, 17) + "..." : val;
                    if (name_1 === "memo" || name_1 === "email") {
                        td.innerHTML += "<span class='copy material-icons' title='copy full text'>content_copy</span>";
                        var copy = td.querySelector("span.copy");
                        if (copy)
                            copy.onclick = function (event) {
                                event.stopPropagation();
                                copyFunc(order[name_1]);
                            };
                    }
                    if (name_1 === "time") {
                        td.innerText = formatDate(order[name_1]);
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
                    //for price and amount
                    if (name_1[0] == 'price') {
                        extra = nairaFormatter.format(order[name_1[1]]);
                        content = dollarFormatter.format(order[name_1[0]]);
                    }
                    // Don't show copy icon for amount cell
                    var addCopy = name_1[0] == "price" ? "" : "<span class='copy material-icons' title='copy full text'>content_copy</span>";
                    var val = content.length > 18 ? content.substring(0, 18) + "..." : content;
                    td.innerHTML = "<span class=\"val\">" + val + addCopy + "\n                        </span><br><span class=\"extra-detail\">" + extra + "</span>\n                        <input type=\"hidden\" id=\"hidden\" value=\"" + content + "\"/>";
                    var copy = td.querySelector("span.copy");
                    if (copy)
                        copy.onclick = function (event) {
                            event.stopPropagation();
                            copyFunc(td.querySelector("input#hidden"));
                        };
                }
                else {
                    var id_1 = order['id'];
                    var first = filters.status === 2 ? "reject" : "approve";
                    var second = filters.status === 1 ? "reject" : "undo";
                    td.className = "d-flex justify-content-center align-top";
                    td.innerHTML = "<button aria-id='" + id_1 + "' class=\"action-button text-capitalize " + first + "\">" + first + "</button>\n                    <button aria-id='" + id_1 + "' class=\"action-button text-capitalize " + second + "\">" + second + "</button>\n                    <div class=\"dropdown\">\n                        <span data-feed-button data-feed class=\"material-icons\" id=" + id_1 + " aria-expanded=\"false\"\n                         data-bs-toggle=\"dropdown\" title='show activities'>feed</span>\n                        <ul class=\"dropdown-menu\" aria-labelledby=" + id_1 + " style='min-width: 20rem;' data-order-feeds>\n                            <li><a class=\"dropdown-item\" href=\"#\">Action</a></li>\n                            <li><a class=\"dropdown-item\" href=\"#\">Another action</a></li>\n                        </ul>\n                        </div>";
                    //registering click events for buttons
                    td.querySelectorAll("button").forEach(function (btn) {
                        btn.onclick = function (event) {
                            event.stopPropagation();
                            changeStatus(btn);
                        };
                    });
                    td.querySelector("[data-feed]")
                        .onclick = function (event) {
                        event.stopPropagation();
                        loadActivityFeeds(Number(id_1), event.target);
                    };
                }
                tr.appendChild(td);
            };
            for (var i = 0; i < numberOfCells; i++) {
                _loop_1(i);
            }
            tr.onclick = function () { return showTransactionDetails(order); };
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
var showModal = function (message, style, duration) {
    if (duration === void 0) { duration = 0; }
    var myModal;
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
var showTransactionDetails = function (order) {
    // show transaction details
    var children = detailsModalBody.children;
    var _loop_2 = function (i) {
        var child = children[i];
        var For = child.getAttribute("for");
        var el = child.querySelector("div#" + For);
        var val = order[For || ""];
        if (val === undefined || val === null || val === "") {
            child.classList.add("d-none");
        }
        else {
            child.classList.remove("d-none");
            if (For === "proof") {
                el.innerHTML = "";
                var str = order[For];
                if (str !== "") {
                    var url_1 = "../account/php/";
                    var images = str.split(",");
                    if (images.length > 0) {
                        images.forEach(function (src) {
                            src = url_1 + src;
                            el.innerHTML += "<img src=\"" + src + "\" width=\"80%\" height=\"200px\" class=\"border mt-1\" />";
                        });
                    }
                    else {
                        el.innerHTML = "<img src=\"" + (url_1 + str) + "\" width=\"80%\" height=\"200px\" class=\"border mt-1\" />";
                    }
                }
            }
            else {
                el.innerText = order[For || "name"];
            }
        }
    };
    for (var i = 0; i < children.length; i++) {
        _loop_2(i);
    }
    // show modal
    new bootstrap.Modal(detailsModal, {
        keyboard: false
    }).show();
};
// fetch orders
var fetchOrders = function (filters) {
    var which = filters.which;
    var status = filters.status;
    var action = filters.type;
    var _keyword = filters.keyword;
    loadingContainer.classList.remove("d-none");
    table.classList.add("d-none");
    Ajax.fetchPage("php/admin_data.php?which=orders", function (data) {
        // console.log(data);
        var arr = JSON.parse(data);
        var message = arr[0];
        if (message.toLowerCase().indexOf("success") != -1) {
            changeTable(arr[1], filters);
        }
        else {
            // showModal(message, "text-danger", 3000);
            changeTable([], filters);
        }
        loadingContainer.classList.add("d-none");
    }, { "type": which, "action": action, "status": status, _keyword: _keyword });
};
//change order status 
var changeStatus = function (btn) {
    var id = btn.getAttribute("aria-id");
    var val = btn.innerText.toLowerCase();
    btn.innerHTML = spinner;
    Ajax.fetchPage("php/change_tx_status.php", function () {
        var _a;
        var tr = (_a = btn.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement;
        tableBody.removeChild(tr);
    }, { "code": id, "action": val }, [function () {
            btn.innerText = val;
            showModal("Could not perform action", "text-danger", 3000);
        }]);
};
var loadActivityFeeds = function (id, span) {
    var dropdown = span.parentElement;
    var menu = dropdown.querySelector(".dropdown-menu");
    menu.innerHTML = "<div class=\"d-flex justify-content-center py-3\">" + spinner + "</div>";
    Ajax.fetchPage("php/activity_feeds.php?id=" + id, function (data) {
        var arr = JSON.parse(data);
        console.log(arr);
        if (arr.length > 0) {
            menu.innerHTML = "";
            arr.forEach(function (feed) {
                var color = "success";
                if (feed.description.startsWith("reject")) {
                    color = "red";
                }
                else if (feed.description.startsWith("und")) {
                    color = "secondary";
                }
                var template = activityFeedTemplate.content.cloneNode(true)
                    .childNodes[1];
                var indicator = template.querySelector("[indicator]");
                var title = template.querySelector("[data-title]");
                var name = template.querySelector("[data-name]");
                var time = template.querySelector("[data-time]");
                indicator.innerHTML = "<span class=\"ellipse\" style=\"--type: var(--" + color + ");\"></span>";
                title.textContent = feed.description;
                name.textContent = feed.full_name;
                time.textContent = formatDate(feed.time);
                template.onclick = function (event) { return event.stopPropagation(); };
                menu.appendChild(template);
            });
        }
        else {
            menu.innerHTML = "<li><a class=\"dropdown-item text-center\">No activity yet</li>";
        }
    }, {});
};
// format time 
function formatDate(dateString) {
    var date = new Date(dateString);
    var today = new Date();
    var isToday = date.toDateString() === today.toDateString();
    return isToday
        ? "Today " + todayFormatter.format(date)
        : dateFormatter.format(date);
}
// get all orders
(function () {
    fetchOrders(filterObj);
})();
