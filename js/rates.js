import { Ajax } from "./ajax.js";
var loadingContainer = document.querySelector("div#loadingContainer");
var rates_container = document.querySelector("div#rates_container");
var addRates = function (content) {
    var cryptos = content[0];
    var giftcard = content[1];
    var dc = document.createElement("div");
    dc.className = "rates";
    cryptos.forEach(function (crypto) {
        var sec = crypto[1] ? crypto[1] + "/$" : "";
        var d = document.createElement("div");
        d.className = "row justify-content-between rate";
        d.innerHTML = "\n                        <div class=\"col-9 ml-2\">\n                            <span class=\"rate-title text-caps\">" + crypto[0] + " (" + crypto[2] + ")</span><br>\n                        </div>\n                        <div class=\"col-3 text-to-right\">\n                            <span class=\"rate-price\">" + sec + "</span>\n                        </div>";
        dc.appendChild(d);
    });
    rates_container.appendChild(dc);
    // for giftcards
    var dg = document.createElement("div");
    dg.className = "rates";
    giftcard.forEach(function (cont) {
        var buyPrice = cont['buy_price'] ? cont['buy_price'] + "/$" : "";
        var sellPrice = cont['sell_price'] ? cont['sell_price'] + "/$" : "";
        var d = document.createElement("div");
        d.className = "row justify-content-between rate";
        d.innerHTML = "\n                <div class=\"col-7 ml-2\">\n                    <span class=\"rate-title\">" + cont.name + "</span><br>\n                </div>\n                <div class=\"col-5 text-to-right\">\n                    <span class=\"rate-price\">(Buy)" + buyPrice + "</span>\n                    <span class=\"rate-price\">(Sell)" + sellPrice + "</span>\n                </div>";
        dg.appendChild(d);
    });
    rates_container.appendChild(dg);
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
            var div = document.createElement("div");
            div.className = "rates";
            div.innerHTML = "\n                <div class=\"row justify-content-center rate\">\n                    <div class=\"col-10 ml-2\">\n                        <span class=\"rate-title text-caps\">" + t + "</span><br>\n                    </div>\n                </div>";
            rates_container.appendChild(div);
        }
        loadingContainer.classList.remove("d-block");
        loadingContainer.classList.add("d-none");
    });
})();
// for timeout
import "./timeout.js";
