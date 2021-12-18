"use strict";
var copy_icon = document.querySelector("span.payment.material-icons");
var backBtn = document.querySelector("span.backBtn");
backBtn.onclick = function (event) {
    event.stopPropagation();
    history.go(-1);
};
copy_icon.onclick = function (e) {
    e.stopPropagation();
    console.log(e.target);
    var acct = document.querySelector("span.account-number");
    navigator.clipboard.writeText(acct.innerText);
};
