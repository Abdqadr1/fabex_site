const copy_icon = document.querySelector("span.payment.material-icons") as HTMLSpanElement;
copy_icon.onclick = (e) => {
    e.stopPropagation();
    console.log(e.target);
    const acct = document.querySelector("span.account-number") as HTMLParagraphElement;
    navigator.clipboard.writeText(acct.innerText);
}