import { Ajax } from "./ajax.js";
const noHistory = document.querySelector("div#no-history") as HTMLDivElement;
const history = document.querySelector("div#history") as HTMLDivElement;

const loadingContainer = document.querySelector("div#loadingContainer") as HTMLDivElement;

(
    function () {
    // TODO: dont forget to change the url before uploading to the server
        //TODO: get user history
        console.info("fetching history from server...");
        Ajax.fetchPage(/** correct the url before server */"/fabex/php/get_history.php", (data: string) => {
            // console.log(data);
            if (data.toLowerCase().indexOf("no history") != -1) {
                noHistory.classList.remove("d-none");
                noHistory.classList.add("d-flex");
            } else {
                noHistory.classList.remove("d-flex");
                noHistory.classList.add("d-none");
                history.innerHTML = "";
                history.innerHTML = data;
                history.classList.remove("d-none");
                history.classList.add("d-block");
            }
            loadingContainer.classList.remove("d-block");
            loadingContainer.classList.add("d-none");
        });
    }
)()