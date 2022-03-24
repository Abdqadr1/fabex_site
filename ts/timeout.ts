
declare const bootstrap: any;
const logoutLink = document.querySelector("a#logout") as HTMLAnchorElement;
const logoutDiv = document.querySelector("div#logoutModal") as HTMLDivElement;
const inactiveDiv = document.querySelector("div#inactiveModal") as HTMLDivElement;
const logoutModal = new bootstrap.Modal(logoutDiv, {
        keyboard: false
    });
const inactiveModal = new bootstrap.Modal(inactiveDiv, {
        keyboard: false
});
    

let duration: number = 300000; let lastShown = new Date().getTime();let isModalShown:boolean =false
const fiveMinsTimeout = setInterval(() => {
    const now = new Date().getTime();
    const diff = now - lastShown;
    if (diff >= duration && !isModalShown) {
        console.log(diff);
        showModal("inactive");
    }
}, 5000);


let time: number = 30; let timer: any;
const showModal = (which: string, duration:number = 0) => {
    let modal: any; isModalShown = true;
    lastShown = new Date().getTime();
    if (which === "logout") {
        modal = logoutModal;
        const yes = logoutDiv.querySelector("p#yes") as HTMLParagraphElement;
        const no = logoutDiv.querySelector("p#no") as HTMLParagraphElement;
        yes.onclick = event => location.href = "logout";
        no.onclick = event => {
            modal.hide(); isModalShown = false
        }
    } else {
        modal = inactiveModal;
        const yes = inactiveDiv.querySelector("p#yes") as HTMLParagraphElement;
        const no = inactiveDiv.querySelector("p#no") as HTMLParagraphElement;
        const noSpan = no.querySelector("span") as HTMLSpanElement;
        no.onclick = event => location.href = "logout";
        noSpan.innerText = `(${time}s)`; 
        timer = setInterval(() => {
            time--;
            noSpan.innerText = `(${time}s)`; 
            lastShown = new Date().getTime();
            if (time <= 0) {
                location.href = "logout";
            }
        }, 1000);
        yes.onclick = event => {
            clearInterval(timer);
            time = 30;
            console.log("cleared")
            modal.hide();
            isModalShown = false;
        }
    }
    modal.show();
}
// when user clicks logout
if (logoutLink) {
    logoutLink.onclick = event => {
        event.preventDefault();
        // show modal to confirm
        showModal("logout");
    }
}
