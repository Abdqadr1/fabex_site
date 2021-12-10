"use strict";
var copy_icon = document.querySelector("span.payment.material-icons");
copy_icon.onclick = function (e) {
    e.stopPropagation();
    console.log(e.target);
    var acct = document.querySelector("span.account-number");
    navigator.clipboard.writeText(acct.innerText);
};
