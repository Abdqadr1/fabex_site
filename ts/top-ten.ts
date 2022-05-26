import { Ajax } from "./ajax.js";
const loadingContainer = document.querySelector("div#loadingContainer") as HTMLDivElement;
const rates_container = document.querySelector("div#rates_container") as HTMLDivElement;
const backBtn = document.querySelector("span#backBtn") as HTMLSpanElement || "not_exist";
const rateTemplate = document.querySelector("[data-top-ten]") as HTMLTemplateElement;
const noRateTemplate = document.querySelector("[data-no-ten]") as HTMLTemplateElement;

if (backBtn instanceof HTMLSpanElement) {
    backBtn.onclick = event => {
        event.stopPropagation();
        location.href ="dashboard";
    }
}

const addRates = (giftcard: any[]) => {
    const dg = document.createElement("div");
    dg.className = "rates top-rates";
    giftcard.forEach((giftcard:any) => {
        const el = rateTemplate.content.cloneNode(true).childNodes[1] as HTMLSpanElement;
        const title = el.querySelector(".rate-title") as HTMLSpanElement;
        const price = el.querySelector(".rate-price") as HTMLSpanElement;
        title.textContent = giftcard.name;
        const buy = giftcard.buy_price > 0 ? `${giftcard.buy_price}/$(buy)` : "";
        const sell = giftcard.sell_price > 0 ? `${giftcard.sell_price}/$(sell)` : "";
        price.textContent = `${buy} ${sell}`;
        dg.appendChild(el);
    });
    rates_container.appendChild(dg)
    
}

(
    function () { 
        Ajax.fetchPage("php/get_top_ten.php", (data: string) => {
            const result: any[] = JSON.parse(data);
            if (result.length > 0) {
                addRates(result);
            } else { 
                const el = noRateTemplate.content.cloneNode(true).childNodes[1] as HTMLDivElement;
                const title = el.querySelector(".rate-title") as HTMLSpanElement;
                title.textContent = "No Top 10 Yet..."
                rates_container.appendChild(el);
            }
            loadingContainer.classList.remove("d-block");
            loadingContainer.classList.add("d-none");
        });
    }
)()