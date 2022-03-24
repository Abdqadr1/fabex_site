import { Ajax } from "./ajax.js";
var historyDiv = document.querySelector("div#historyDiv");
var loadingContainer = document.querySelector("div#loadingContainer");
var noHistory = document.querySelector("div#no-history");
var formatter = new Intl.NumberFormat("en-NG", { style: 'currency', currency: 'NGN', minimumFractionDigits: 1, maximumFractionDigits: 2 });
var addHistory = function (list) {
    var history = document.createElement("div");
    history.className = "history";
    list.forEach(function (each) {
        var div = document.createElement("div");
        div.className = "row justify-content-between transaction";
        div.title = each.desc;
        div.innerHTML = "<div class=\"col-8 ml-2\">\n                        <span class=\"trans-title\">" + each.desc + "</span><br>\n                        <span class=\"trans-status\">\n                            <span class=\"ellipse\" style=\"--type: var(--" + each.status + ");\"></span>" + each.status_text + "</span>\n                    </div>\n                    <div class=\"col-4 text-to-right\">\n                        <span class=\"trans-amount\">" + formatter.format(each.amount) + "</span><br>\n                        <span class=\"trans-time\">" + each.time + "</span>\n                    </div>";
        div.onclick = function () { return console.log("show more details..."); };
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
