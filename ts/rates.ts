import { Ajax } from "./ajax.js";
const loadingContainer = document.querySelector("div#loadingContainer") as HTMLDivElement;
const rates_container = document.querySelector("div#rates_container") as HTMLDivElement;

const addRates = (content: [][]) => {
    const crypto: any[] = content[0];
    const giftcard: any[] = content[1];
    const sec = crypto[1] ? crypto[1] + "/$" : "";
    const d = document.createElement("div");
    d.className = "rates";
    d.innerHTML = `
                <div class="row justify-content-between rate">
                    <div class="col-9 ml-2">
                        <span class="rate-title">${crypto[0]}</span><br>
                    </div>
                    <div class="col-3 text-to-right">
                        <span class="rate-price">${sec}</span>
                    </div>
                </div>`;
    rates_container.appendChild(d);
    const dg = document.createElement("div");
    dg.className = "rates";
    giftcard.forEach((cont: string) => {
        const sec = cont[1] ? cont[1] + "/$" : "";
        const d = document.createElement("div");
        d.className = "row justify-content-between rate";
        d.innerHTML = `
                <div class="col-9 ml-2">
                    <span class="rate-title">${cont[0]}</span><br>
                </div>
                <div class="col-3 text-to-right">
                    <span class="rate-price">${sec}</span>
                </div>`;
        dg.appendChild(d);
    });
    rates_container.appendChild(dg)
    
}

(
    function () { 
    //TODO: get current rates
        console.info("fetching rates from server...");
        Ajax.fetchPage("php/get_rates.php", (data: string) => {
            const result: any[] = JSON.parse(data);
            //TODO: do something with the data.
            if (result.length > 1) {
                addRates(result);
            } else { 
                const t = result[0][0];
                const div = document.createElement("div");
                div.className = "rates"
                div.innerHTML = `
                <div class="row justify-content-center rate">
                    <div class="col-10 ml-2">
                        <span class="rate-title">${t}</span><br>
                    </div>
                </div>`;
                rates_container.appendChild(div);
            }
            loadingContainer.classList.remove("d-block");
            loadingContainer.classList.add("d-none");
        });
    }
)()