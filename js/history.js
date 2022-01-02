import { Ajax } from "./ajax.js";
var historyDiv = document.querySelector("div#historyDiv");
var loadingContainer = document.querySelector("div#loadingContainer");
var noHistory = document.querySelector("div#no-history");
var addHistory = function (list) {
    var history = document.createElement("div");
    history.className = "history";
    list.forEach(function (each) {
        var div = document.createElement("div");
        div.className = "row justify-content-between transaction";
        div.innerHTML = "<div class=\"col-8 ml-2\">\n                        <span class=\"trans-title\">" + each[1] + "</span><br>\n                        <span class=\"trans-status\">\n                            <span class=\"ellipse\" style=\"--type: var(--" + each[4] + ");\"></span>" + each[5] + "</span>\n                    </div>\n                    <div class=\"col-3 text-to-right\">\n                        <span class=\"trans-amount\">" + each[2] + "</span><br>\n                        <span class=\"trans-time\">" + each[3] + "</span>\n                    </div>";
        history.appendChild(div);
    });
    historyDiv.appendChild(history);
};
// get history 
(function () {
    console.info("fetching history from server...");
    Ajax.fetchPage("php/get_history.php", function (data) {
        var arr = JSON.parse(data);
        // console.log(arr);
        if (arr.length > 0) {
            addHistory(arr);
        }
        else {
            noHistory.classList.remove("d-none");
        }
        loadingContainer.classList.add("d-none");
    });
})();
