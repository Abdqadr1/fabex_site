import { Ajax } from "./ajax.js";
var modal;
var spinner = "<div class='spinner-border spinner-border-sm' aria-hidden='true' role='status'></div>\n                Please wait... ";
var adminRateDiv = document.querySelector("div#admin_rate");
var buyDiv = document.querySelector("div#buyDiv");
var sellDiv = document.querySelector("div#sellDiv");
var loadingContainer = document.querySelector("div#loading");
var modalTag = document.querySelector("div#modal");
var modalBody = modalTag.querySelector("div#modal_body");
var isModalShown = false;
var applyBtn = document.querySelector("btn#applyBtn");
var changes = [];
applyBtn.onclick = function () {
    var json = JSON.stringify(changes);
    if (json.length > 2) {
        updatePrice(json);
    }
};
var addProducts = function (arr) {
    arr.forEach(function (obj, index) {
        var which = obj.which;
        var hidden = "", col = "col-8";
        var type = obj.type === "buy" ? "Buy" : "Sell";
        var parent = obj.type === "buy" ? buyDiv : sellDiv;
        var range = obj.range;
        var rangeName = (range == "range") ? "(10 - 150)" : "";
        var name = (which == "crypto") ? "Crypto " + rangeName : obj.name;
        var id = (which == "crypto") ? "" : obj.id;
        if (obj.msg === "not_found") {
            name = (which == "crypto") ? "No " + type + " Crypto found " + rangeName + ", Add in settings" :
                "No Giftcard found, Add in settings";
            hidden = "d-none";
            col = "col-12";
            parent.innerHTML += "<div class='row justify-content-between mt-3 px-4'>\n                        <div class=\"" + col + " text-muted text-left\">\n                <span class=\"d-inline-block product-name\">" + name + "</span>\n                </div></div>";
        }
        else {
            if (which === "crypto") {
                // for normal price
                parent.innerHTML += "<div class='row justify-content-between mt-3 px-4'>\n                        <div class=\"" + col + " text-muted text-left\">\n                <span class=\"d-inline-block product-name\">" + name + "</span>\n                </div>\n                <div class=\"col-4 row justify-content-around " + hidden + "\">\n                    <input which='" + which + "' type='number' trade-type='" + obj.type + "' id='" + id + "'\n                    value='" + obj.price + "' range='normal' class=\"form-control col admin-rate text-center\">\n                </div></div>";
                // for low price
                parent.innerHTML += "<div class='row justify-content-between mt-3 px-4'>\n                        <div class=\"" + col + " text-muted text-left\">\n                <span class=\"d-inline-block product-name\">" + name + "(10 - 150)</span>\n                </div>\n                <div class=\"col-4 row justify-content-around " + hidden + "\">\n                    <input which='" + which + "' range='range' type='number' trade-type='" + obj.type + "' id='" + id + "'\n                     value='" + obj.low_price + "' class=\"form-control col admin-rate text-center\">\n                </div></div>";
            }
            else {
                var buyPrice = obj['buy_price'];
                var sellPrice = obj['sell_price'];
                buyDiv.innerHTML += "<div class='row justify-content-between mt-3 px-4'>\n                        <div class=\"" + col + " text-muted text-left\">\n                <span class=\"d-inline-block product-name\">" + name + "</span>\n                </div>\n                <div class=\"col-4 row justify-content-around " + hidden + "\">\n                    <input which='" + which + "' type='number' trade-type='buy' id='" + id + "' value='" + buyPrice + "' class=\"form-control col admin-rate text-center\">\n                </div></div>";
                sellDiv.innerHTML += "<div class='row justify-content-between mt-3 px-4'>\n                        <div class=\"" + col + " text-muted text-left\">\n                <span class=\"d-inline-block product-name\">" + name + "</span>\n                </div>\n                <div class=\"col-4 row justify-content-around " + hidden + "\">\n                    <input which='" + which + "' type='number' trade-type='sell' id='" + id + "' value='" + sellPrice + "' class=\"form-control col admin-rate text-center\">\n                </div></div>";
            }
        }
    });
    var allInputs = adminRateDiv.querySelectorAll("input[type='number']");
    allInputs.forEach(function (input) {
        input.onchange = function () {
            if (input.value) {
                var obj = {
                    type: input.getAttribute('trade-type'),
                    id: input.id,
                    value: input.valueAsNumber,
                    which: input.getAttribute('which'),
                    range: input.getAttribute('range')
                };
                var index = input.getAttribute('index');
                if (index === undefined || index === null || index < 0) {
                    index = changes.length;
                    changes[index] = obj;
                    input.setAttribute('index', index);
                }
                else {
                    changes[index] = obj;
                }
            }
        };
    });
};
//update price function 
var updatePrice = function (data_sent) {
    applyBtn.innerHTML = spinner;
    applyBtn.disabled = true;
    Ajax.fetchPage("php/update_prices.php", function (data) {
        applyBtn.innerHTML = "Apply";
        applyBtn.disabled = false;
        if (data.toLowerCase().indexOf("success") != -1) {
            showModal(data);
            changes = [];
        }
        else {
            showModal(data, "text-danger");
        }
    }, { data_sent: data_sent });
};
//get all rates
(function () {
    applyBtn.disabled = true;
    Ajax.fetchPage("php/admin_data.php?which=rates", function (data) {
        var arr = JSON.parse(data);
        var message = arr[0];
        if (message.toLowerCase().indexOf('success') != -1) {
            loadingContainer.classList.add("d-none");
            adminRateDiv.classList.remove("d-none");
            addProducts(arr[1]);
            applyBtn.disabled = false;
        }
        else {
            loadingContainer.classList.add("d-none");
            showModal(message, "text-danger");
            setTimeout(function () {
                hideModal();
            }, 1000);
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
    if (!isModalShown) {
        modal.show();
        setTimeout(function () {
            modal.hide();
        }, 2000);
    }
};
var hideModal = function () {
    modal.hide();
    isModalShown = false;
};
