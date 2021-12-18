const copy_icon = document.querySelector("span.payment.material-icons") as HTMLSpanElement;
const backBtn = document.querySelector("span.backBtn") as HTMLSpanElement;
backBtn.onclick = event => {
    event.stopPropagation();
    history.go(-1);
}
copy_icon.onclick = (e) => {
    e.stopPropagation();
    console.log(e.target);
    const acct = document.querySelector("span.account-number") as HTMLParagraphElement;
    navigator.clipboard.writeText(acct.innerText);
}