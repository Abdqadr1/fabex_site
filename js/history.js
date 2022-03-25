import { Ajax } from "./ajax.js";
var historyDiv = document.querySelector("div#historyDiv");
var loadingContainer = document.querySelector("div#loadingContainer");
var noHistory = document.querySelector("div#no-history");
var transDetailsModalDiv = document.querySelector("div#trans_details_modal");
var transDetailsModalBody = transDetailsModalDiv.querySelector("div.modal-body");
var transDetailsModal = new bootstrap.Modal(transDetailsModalDiv, {
    keyboard: false
});
var formatter = new Intl.NumberFormat("en-NG", { style: 'currency', currency: 'NGN', minimumFractionDigits: 1, maximumFractionDigits: 2 });
var addHistory = function (list) {
    var history = document.createElement("div");
    history.className = "history";
    list.forEach(function (each) {
        var div = document.createElement("div");
        div.className = "row justify-content-between transaction";
        div.title = each.descrip;
        div.innerHTML = "<div class=\"col-8 ml-2\">\n                        <span class=\"trans-title\">" + each.descrip + "</span><br>\n                        <span class=\"trans-status\">\n                            <span class=\"ellipse\" style=\"--type: var(--" + each.status_color + ");\"></span>" + each.status_text + "</span>\n                    </div>\n                    <div class=\"col-4 text-to-right\">\n                        <span class=\"trans-amount\">" + formatter.format(each.amount) + "</span><br>\n                        <span class=\"trans-time\">" + each.time + "</span>\n                    </div>";
        div.onclick = function () { return showDetailsModal(each); };
        history.appendChild(div);
    });
    historyDiv.appendChild(history);
};
// get history 
(function () {
    console.info("fetching history from server...");
    Ajax.fetchPage("php/get_history.php", function (data) {
        var arr = JSON.parse(data);
        console.log(arr);
        if (arr.length > 0) {
            addHistory(arr);
        }
        else {
            noHistory.classList.remove("d-none");
        }
        loadingContainer.classList.add("d-none");
    });
})();
// for timeout
import "./timeout.js";
function showDetailsModal(each) {
    var type = each.type;
    var which = each.which;
    var rate = Math.round(each.amount / each.price);
    transDetailsModalBody.innerHTML = "";
    var div = document.createElement("div");
    div.className = "trans-details";
    div.innerHTML =
        "<p class=\"header\">" + each.descrip + "</p>\n        <div class=\"stat-div mb-2\">\n            <p class=\"stat-name\">Status</p>\n            <p class=\"stat-val\" style=\"--type: var(--" + each.status_color + ");\">" + each.status_text + "</span></p>\n        </div>\n        <div class=\"stat-div mb-2\">\n            <p class=\"stat-name\">Amount</p>\n            <p class=\"stat-val\">$" + each.price + " <span class=\"muted\">@ " + rate + "</span> = " + formatter.format(each.amount) + "</p>\n        </div>";
    if (which == "crypto") {
        var to = "";
        if (type == "buy") {
            div.innerHTML += "\n            <div class=\"stat-div mb-2\">\n                <p class=\"stat-name\">To</p>\n                <p class=\"stat-val\">" + each.wallet_address + " <span class=\"muted\">(" + each.network + ")</span></p>\n            </div>\n            <div class=\"stat-div mb-2\">\n                <p class=\"stat-name\">Memo</p>\n                <p class=\"stat-val\">" + each.memo + "</span></p>\n            </div>";
        }
        else {
            div.innerHTML += "\n            <div class=\"stat-div mb-2\">\n            <p class=\"stat-name\">To</p>\n            <p class=\"stat-val\">" + each.account_number + " <span class=\"muted\">(" + each.bank_name + ")</span></p>\n        </div>";
        }
    }
    else {
        var to = "";
        if (type == "buy") {
            div.innerHTML += "\n            <div class=\"stat-div mb-2\">\n                <p class=\"stat-name\">To</p>\n                <p class=\"stat-val\">" + each.email + "</p>\n            </div>";
        }
        else {
            div.innerHTML += "\n            <div class=\"stat-div mb-2\">\n            <p class=\"stat-name\">To</p>\n            <p class=\"stat-val\">" + each.account_number + " <span class=\"muted\">(" + each.bank_name + ")</span></p>\n        </div>";
        }
    }
    div.innerHTML += "<div class=\"stat-div mb-2\">\n                <p class=\"stat-name\">Timestamp</p>\n                <p class=\"stat-val\">" + each.timestamp + "</span></p>\n            </div>\n            <div class=\"mb-2 row justify-content-between mx-0\">\n                <div class=\"col-8 p-0\">\n                    <p class=\"stat-name\">Order ID</p>\n                    <p class=\"stat-val text-uppercase\">" + each.tx_id + "</p>\n                </div>\n                <div class=\"col-1 text-center\">\n                    <span class=\"tt\" title=\"Copy order id\">\n                        <span class=\"payment material-icons\">\n                            content_copy\n                        </span>\n                    </span>\n\n                </div>\n            </div>";
    transDetailsModalBody.appendChild(div);
    transDetailsModal.show();
}
