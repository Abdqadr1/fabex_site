import { Ajax } from "./ajax.js";
const loadingContainer = document.querySelector("div#loadingContainer") as HTMLDivElement;
const rates_container = document.querySelector("div#rates_container") as HTMLDivElement;
const giftcardRateTemplate = document.querySelector("[data-giftcard-rate]") as HTMLTemplateElement;
const cryptoRateTemplate = document.querySelector("[data-crypto-rate]") as HTMLTemplateElement;
const noRateTemplate = document.querySelector("[data-no-rate]") as HTMLTemplateElement;
const cryptoRatesDiv = document.querySelector("[data-crypto-rates]") as HTMLDivElement;
const giftcardRatesDiv = document.querySelector("[data-giftcard-rates]") as HTMLDivElement;

const addRates = (content: [][]) => {
    const cryptos: any[] = content[0];
    const giftcard: any[] = content[1];

    cryptos.forEach((crypto: string) => {
        const sec = crypto[1] ? crypto[1] + "/$" : "";
        const el =cryptoRateTemplate.content.cloneNode(true).childNodes[1] as HTMLDivElement;
        const title = el.querySelector(".rate-title") as HTMLSpanElement;
        const price = el.querySelector(".rate-price") as HTMLSpanElement;
        title.textContent = `${crypto[0]} (${crypto[2]})`;
        price.textContent = sec;
        cryptoRatesDiv.appendChild(el)
    });
    
    // for giftcards
    giftcard.forEach((cont: any) => {
        const buyPrice = Number(cont['buy_price']);
        const sellPrice = Number(cont['sell_price']);
        const el = giftcardRateTemplate.content.cloneNode(true).childNodes[1] as HTMLDivElement;
        const title = el.querySelector(".rate-title") as HTMLSpanElement;
        const buySpan = el.querySelector("[data-buy]") as HTMLSpanElement;
        const sellSpan = el.querySelector("[data-sell]") as HTMLSpanElement;

        title.textContent = cont.name;
        if(buyPrice > 0){
            buySpan.textContent = `(Buy)${buyPrice}/$`;
        }else {
            buySpan.classList.add("d-none")
        }
        if (sellPrice > 0) {
          sellSpan.textContent = `(Buy)${sellPrice}/$`;
        } else {
          sellSpan.classList.add("d-none");
        }
        giftcardRatesDiv.appendChild(el);
    });
    
}

(
    function () { 
        // console.info("fetching rates from server...");
        Ajax.fetchPage("php/get_rates.php", (data: string) => {
            const result: any[] = JSON.parse(data);
            if (result.length > 1) {
                addRates(result);
            } else { 
                const t:string = result[0][0];
                const el = noRateTemplate.content.cloneNode(true).childNodes[1] as HTMLDivElement;
                const title = el.querySelector(".rate-title") as HTMLSpanElement;
                title.textContent = t;
                cryptoRatesDiv.appendChild(el);
                giftcardRatesDiv.remove();
            }
            loadingContainer.classList.remove("d-block");
            loadingContainer.classList.add("d-none");
        });
    }
)()


// for timeout
import "./timeout.js";