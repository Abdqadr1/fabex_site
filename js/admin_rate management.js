import { Ajax } from "./ajax.js";
var modal;
var rateColumns = document.querySelectorAll("div.rate-column");
var modalTag = document.querySelector("div#modal");
var modalBody = modalTag.querySelector("div#modal_body");
var addProducts = function (arr) {
    var counter = 0, len = rateColumns.length;
    arr.forEach(function (array) {
        var index = counter % len;
        var parent = rateColumns[index];
        var which = array[0];
        var id = (which == "crypto") ? "" : array[1];
        var price = (which == "crypto") ? array[1] : array[3];
        var name = (which == "crypto") ? "Crypto" : array[2];
        var rowDiv = document.createElement("div");
        rowDiv.className = "row justify-content-between mt-3 px-4";
        rowDiv.innerHTML = "<div class=\"col-7 text-muted text-left\">\n            <span class=\"d-inline-block product-name\">" + name + "</span>\n        </div>\n        <div class=\"col-2\">\n            <input which='" + which + "' type=\"number\" class=\"form-control admin-rate text-center\" id='" + id + "' value='" + price + "'>\n        </div>\n        <div class='spinner-border spinner-border-sm mt-2 text-primary d-none' aria-hidden='true' role='status' id=\"loader\"></div>\n        <span class=\"material-icons text-primary mt-2 d-none\" style=\"width: 24px;\" id=\"icon\">done</span>";
        var input = rowDiv.querySelector("input");
        input.onchange = function (event) {
            updatePrice(input, rowDiv);
        };
        parent.appendChild(rowDiv);
        counter++;
    });
};
//update price function 
var updatePrice = function (input, row) {
    console.log(input, row);
};
//get all rates
(function () {
    Ajax.fetchPage("php/admin_data.php?which=rates", function (data) {
        var arr = JSON.parse(data);
        var message = arr[0];
        if (message.toLowerCase().indexOf('success') != -1) {
            addProducts(arr[1]);
        }
        else {
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
};
var hideModal = function () { return modal.hide(); };
