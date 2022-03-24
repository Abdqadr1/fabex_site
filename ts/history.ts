import { Ajax } from "./ajax.js";
const historyDiv = document.querySelector("div#historyDiv") as HTMLDivElement;
const loadingContainer = document.querySelector("div#loadingContainer") as HTMLDivElement;
const noHistory = document.querySelector("div#no-history") as HTMLDivElement;

const formatter = new Intl.NumberFormat("en-NG", { style: 'currency', currency: 'NGN', minimumFractionDigits:1, maximumFractionDigits: 2});

const addHistory = (list: [][]) => {
    const history = document.createElement("div") as HTMLDivElement;
    history.className = "history";
    list.forEach((each:any[]) => {
        const div = document.createElement("div") as HTMLDivElement;
        div.className = "row justify-content-between transaction";
        div.innerHTML = `<div class="col-8 ml-2">
                        <span class="trans-title">${each[1]}</span><br>
                        <span class="trans-status">
                            <span class="ellipse" style="--type: var(--${each[4]});"></span>${each[5]}</span>
                    </div>
                    <div class="col-4 text-to-right">
                        <span class="trans-amount">${formatter.format(each[2])}</span><br>
                        <span class="trans-time">${each[3]}</span>
                    </div>`;
        history.appendChild(div);
    });
    historyDiv.appendChild(history);
}

// get history 
(
    function () {
        console.info("fetching history from server...");
        Ajax.fetchPage("php/get_history.php", (data: string) => {
            // console.log(data);
            const arr:any[] = JSON.parse(data);
            if (arr.length > 0) {
                addHistory(arr);
            } else {
                noHistory.classList.remove("d-none");
            }
            loadingContainer.classList.add("d-none");
        });
    }
)()


// for timeout
import "./timeout.js";