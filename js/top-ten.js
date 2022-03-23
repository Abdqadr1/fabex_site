import { Ajax } from "./ajax.js";
var loadingContainer = document.querySelector("div#loadingContainer");
var rates_container = document.querySelector("div#rates_container");
var backBtn = document.querySelector("span#backBtn") || "not_exist";
if (backBtn instanceof HTMLSpanElement) {
    backBtn.onclick = function (event) {
        event.stopPropagation();
        history.go(-1);
    };
}
var addRates = function (giftcard) {
    var dg = document.createElement("div");
    dg.className = "rates top-rates";
    giftcard.forEach(function (cont) {
        var sec = cont[1] ? cont[1] + "/$" : "";
        var d = document.createElement("div");
        d.className = "row justify-content-between rate";
        d.innerHTML = "\n                <div class=\"col-9 ml-2\">\n                    <span class=\"rate-title\">" + cont[0] + "</span><br>\n                </div>\n                <div class=\"col-3 text-to-right\">\n                    <span class=\"rate-price\">" + sec + "</span>\n                </div>";
        dg.appendChild(d);
    });
    rates_container.appendChild(dg);
};
(function () {
    // console.info("fetching rates from server...");
    Ajax.fetchPage("php/get_top_ten.php", function (data) {
        var result = JSON.parse(data);
        console.log(result);
        if (result.length > 1) {
            addRates(result);
        }
        else {
            var t = result[0];
            var div = document.createElement("div");
            div.className = "rates";
            div.innerHTML = "\n                <div class=\"row justify-content-center rate\">\n                    <div class=\"col-10 ml-2\">\n                        <span class=\"rate-title text-caps\">" + t + "</span><br>\n                    </div>\n                </div>";
            rates_container.appendChild(div);
        }
        loadingContainer.classList.remove("d-block");
        loadingContainer.classList.add("d-none");
    });
})();
