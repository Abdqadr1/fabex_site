import { Ajax } from "./ajax.js";
var loadingContainer = document.querySelector("div#loadingContainer");
var rates_container = document.querySelector("div#rates_container");
var giftcardRateTemplate = document.querySelector("[data-giftcard-rate]");
var cryptoRateTemplate = document.querySelector("[data-crypto-rate]");
var noRateTemplate = document.querySelector("[data-no-rate]");
var cryptoRatesDiv = document.querySelector("[data-crypto-rates]");
var giftcardRatesDiv = document.querySelector("[data-giftcard-rates]");
var addRates = function (content) {
    var cryptos = content[0];
    var giftcard = content[1];
    cryptos.forEach(function (crypto) {
        var sec = crypto[1] ? crypto[1] + "/$" : "";
        var el = cryptoRateTemplate.content.cloneNode(true).childNodes[1];
        var title = el.querySelector(".rate-title");
        var price = el.querySelector(".rate-price");
        title.textContent = crypto[0] + " (" + crypto[2] + ")";
        price.textContent = sec;
        cryptoRatesDiv.appendChild(el);
    });
    // for giftcards
    giftcard.forEach(function (cont) {
        var buyPrice = Number(cont['buy_price']);
        var sellPrice = Number(cont['sell_price']);
        var el = giftcardRateTemplate.content.cloneNode(true).childNodes[1];
        var title = el.querySelector(".rate-title");
        var buySpan = el.querySelector("[data-buy]");
        var sellSpan = el.querySelector("[data-sell]");
        title.textContent = cont.name;
        if (buyPrice > 0) {
            buySpan.textContent = "(Buy)" + buyPrice + "/$";
        }
        else {
            buySpan.classList.add("d-none");
        }
        if (sellPrice > 0) {
            sellSpan.textContent = "(Sell)" + sellPrice + "/$";
        }
        else {
            sellSpan.classList.add("d-none");
        }
        giftcardRatesDiv.appendChild(el);
    });
};
(function () {
    // console.info("fetching rates from server...");
    Ajax.fetchPage("php/get_rates.php", function (data) {
        var result = JSON.parse(data);
        if (result.length > 1) {
            addRates(result);
        }
        else {
            var t = result[0][0];
            var el = noRateTemplate.content.cloneNode(true).childNodes[1];
            var title = el.querySelector(".rate-title");
            title.textContent = t;
            cryptoRatesDiv.appendChild(el);
            giftcardRatesDiv.remove();
        }
        loadingContainer.classList.remove("d-block");
        loadingContainer.classList.add("d-none");
    });
})();
// for timeout
import "./timeout.js";
