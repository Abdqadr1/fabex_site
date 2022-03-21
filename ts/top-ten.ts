import { Ajax } from "./ajax.js";
const loadingContainer = document.querySelector("div#loadingContainer") as HTMLDivElement;
const rates_container = document.querySelector("div#rates_container") as HTMLDivElement;
const backBtn = document.querySelector("span#backBtn") as HTMLSpanElement || "not_exist";

if (backBtn instanceof HTMLSpanElement) {
    backBtn.onclick = event => {
        event.stopPropagation();
        history.go(-1);
    }
}

const addRates = (giftcard: any[]) => {
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
        // console.info("fetching rates from server...");
        Ajax.fetchPage("php/get_top_ten.php", (data: string) => {
            const result: any[] = JSON.parse(data);
            console.log(result);
            if (result.length > 1) {
                addRates(result);
            } else { 
                const t:string = result[0];
                const div = document.createElement("div");
                div.className = "rates"
                div.innerHTML = `
                <div class="row justify-content-center rate">
                    <div class="col-10 ml-2">
                        <span class="rate-title text-caps">${t}</span><br>
                    </div>
                </div>`;
                rates_container.appendChild(div);
            }
            loadingContainer.classList.remove("d-block");
            loadingContainer.classList.add("d-none");
        });
    }
)()