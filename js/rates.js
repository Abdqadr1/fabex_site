import { Ajax } from "./ajax.js";
var loadingContainer = document.querySelector("div#loadingContainer");
var rates_container = document.querySelector("div#rates_container");
(function () {
    //TODO: get current rates
    // TODO: dont forget to change the url before uploading to the server
    console.info("fetching rates from server...");
    Ajax.fetchPage(/** correct the url before server */ "/fabex/php/get_rates.php", function (data) {
        console.log(data);
        //TODO: do something with the data.
        if (data.toLowerCase().indexOf("failed") != -1) {
        }
        else {
        }
        loadingContainer.classList.remove("d-block");
        loadingContainer.classList.add("d-none");
    });
})();
