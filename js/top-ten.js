import { Ajax } from "./ajax.js";
var loadingContainer = document.querySelector("div#loadingContainer");
var rates_container = document.querySelector("div#rates_container");
var backBtn = document.querySelector("span#backBtn") || "not_exist";
var rateTemplate = document.querySelector("[data-top-ten]");
var noRateTemplate = document.querySelector("[data-no-ten]");
if (backBtn instanceof HTMLSpanElement) {
    backBtn.onclick = function (event) {
        event.stopPropagation();
        location.href = "dashboard";
    };
}
var addRates = function (giftcard) {
    var dg = document.createElement("div");
    dg.className = "rates top-rates";
    giftcard.forEach(function (giftcard) {
        var el = rateTemplate.content.cloneNode(true).childNodes[1];
        var title = el.querySelector(".rate-title");
        var price = el.querySelector(".rate-price");
        title.textContent = giftcard.name;
        var buy = giftcard.buy_price > 0 ? giftcard.buy_price + "/$(buy)" : "";
        var sell = giftcard.sell_price > 0 ? giftcard.sell_price + "/$(sell)" : "";
        price.textContent = buy + " " + sell;
        dg.appendChild(el);
    });
    rates_container.appendChild(dg);
};
(function () {
    Ajax.fetchPage("php/get_top_ten.php", function (data) {
        var result = JSON.parse(data);
        if (result.length > 0) {
            addRates(result);
        }
        else {
            var el = noRateTemplate.content.cloneNode(true).childNodes[1];
            var title = el.querySelector(".rate-title");
            title.textContent = "No Top 10 Yet...";
            rates_container.appendChild(el);
        }
        loadingContainer.classList.remove("d-block");
        loadingContainer.classList.add("d-none");
    });
})();
