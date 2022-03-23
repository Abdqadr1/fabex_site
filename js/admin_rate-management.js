import { Ajax } from "./ajax.js";
var modal;
var adminRateDiv = document.querySelector("div#admin_rate");
var loadingContainer = document.querySelector("div#loading");
var rateColumns = document.querySelectorAll("div.rate-column");
var modalTag = document.querySelector("div#modal");
var modalBody = modalTag.querySelector("div#modal_body");
var addProducts = function (arr) {
    var counter = 0, len = rateColumns.length;
    arr.forEach(function (obj) {
        var index = counter % len;
        var parent = rateColumns[index];
        var which = obj.which;
        var id = (which == "crypto") ? "" : obj.id;
        var price = obj.price;
        var range = (which == "crypto") ? obj.range : "";
        var rangeName = (range == "range") ? "(10 - 150)" : "";
        var type = (which == "crypto") ? (obj.type === "buy" ? "Buy" : "Sell") : "";
        var name = (which == "crypto") ? "Crypto (" + type + ") " + rangeName : obj.name;
        var rowDiv = document.createElement("div");
        rowDiv.className = "row justify-content-between mt-3 px-4";
        rowDiv.innerHTML = "<div class=\"col-7 text-muted text-left\">\n            <span class=\"d-inline-block product-name\">" + name + "</span>\n        </div>\n        <div class=\"col-2\">\n            <input which='" + which + "' type=\"number\" class=\"form-control admin-rate text-center\" id='" + id + "' value='" + price + "'>\n        </div>\n        <div class='spinner-border spinner-border-sm mt-2 text-primary d-none' aria-hidden='true' role='status' id=\"loader\"></div>\n        <span class=\"material-icons text-primary mt-2 d-none\" style=\"width: 24px;\" id=\"mark_icon\">done</span>";
        var input = rowDiv.querySelector("input");
        input.onchange = function (event) {
            updatePrice(input, rowDiv, type.toLowerCase(), range);
        };
        parent.appendChild(rowDiv);
        counter++;
    });
};
//update price function 
var updatePrice = function (input, row, type, range) {
    console.log(range);
    var which = input.getAttribute("which");
    var id = input.id;
    var price = input.value;
    var loader = row.querySelector("div#loader");
    loader.classList.remove("d-none");
    var icon = row.querySelector("span#mark_icon");
    Ajax.fetchPage("php/update_prices.php", function (data) {
        if (data.toLowerCase().indexOf("success") != -1) {
            showModal(data);
        }
        else {
            showModal(data, "text-danger");
        }
        loader.classList.add("d-none");
    }, { which: which, id: id, price: price, type: type, range: range });
};
//get all rates
(function () {
    Ajax.fetchPage("php/admin_data.php?which=rates", function (data) {
        var arr = JSON.parse(data);
        console.log(arr);
        var message = arr[0];
        if (message.toLowerCase().indexOf('success') != -1) {
            loadingContainer.classList.add("d-none");
            adminRateDiv.classList.remove("d-none");
            addProducts(arr[1]);
        }
        else {
            loadingContainer.classList.add("d-none");
            showModal(message, "text-danger");
            setTimeout(function () {
                hideModal();
            }, 2000);
        }
    });
})();
// show and hide modal
var showModal = function (message, colorClass) {
    if (colorClass === void 0) { colorClass = "text-success"; }
    modalBody.innerText = message;
    modalBody.className = "modal-body py-1 " + colorClass;
    modal = new bootstrap.Modal(modalTag, {
        keyboard: false
    });
    modal.show();
    setTimeout(function () {
        modal.hide();
    }, 2000);
};
var hideModal = function () { return modal.hide(); };
