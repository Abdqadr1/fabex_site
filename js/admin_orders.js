import { Ajax } from "./ajax.js";
var whichSelect = document.querySelector("select#which");
var buttons = document.querySelectorAll("button.trading");
var loadingContainer = document.querySelector("div#orders_loading");
var table = document.querySelector("table#table");
var giftcardHeader = table.querySelector("thead#giftcard_header");
var cryptoHeader = table.querySelector("thead#crypto_header");
var spinner = "<div class='spinner-border spinner-border-sm' aria-hidden='true' role='status'></div>\n                Please wait... ";
var tabs = document.querySelectorAll(".nav-tab");
var modal = document.querySelector("div#modal");
var modalBody = modal.querySelector("div.modal-body");
var filterObj = {
    which: "crypto",
    type: "buy",
    status: "pending"
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
            fetchOrders(filterObj);
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
            fetchOrders(filterObj);
        }
    };
});
// change table 
var changeTable = function (list, filters) {
    var which = filters.which;
    if (which == "crypto") {
        console.log("crypto", list);
        cryptoHeader.classList.remove("d-none");
        giftcardHeader.classList.add("d-none");
    }
    else {
        console.log("giftcard", list);
        giftcardHeader.classList.remove("d-none");
        cryptoHeader.classList.add("d-none");
    }
    table.classList.remove("d-none");
};
//show and hide modal
var myModal;
var showModal = function (message, style) {
    modalBody.innerText = message;
    modalBody.className = "modal-body py-1 " + style;
    myModal = new bootstrap.Modal(modal, {
        keyboard: false
    });
    myModal.show();
};
var hideModal = function () { return myModal.hide(); };
// fetch orders
var fetchOrders = function (filters) {
    var type = filters.which;
    loadingContainer.classList.remove("d-none");
    table.classList.add("d-none");
    Ajax.fetchPage("php/admin_data.php?which=orders&type=" + type, function (data) {
        var arr = JSON.parse(data);
        var message = arr[0];
        if (message.toLowerCase().indexOf("success") != -1) {
            changeTable(arr[1], filters);
        }
        else {
            var text = "Search queries: " + JSON.stringify(filterObj) + "\n \n" + message;
            showModal(text, "text-danger");
            setTimeout(function () {
                hideModal();
            }, 3000);
        }
        loadingContainer.classList.add("d-none");
    });
};
// get all orders
(function () {
    fetchOrders(filterObj);
})();
