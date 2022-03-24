"use strict";
var logoutLink = document.querySelector("a#logout");
var logoutDiv = document.querySelector("div#logoutModal");
var inactiveDiv = document.querySelector("div#inactiveModal");
var logoutModal = new bootstrap.Modal(logoutDiv, {
    keyboard: false
});
var inactiveModal = new bootstrap.Modal(inactiveDiv, {
    keyboard: false
});
var duration = 300000;
var lastShown = new Date().getTime();
var isModalShown = false;
var fiveMinsTimeout = setInterval(function () {
    var now = new Date().getTime();
    var diff = now - lastShown;
    if (diff >= duration && !isModalShown) {
        console.log(diff);
        showModal("inactive");
    }
}, 5000);
var time = 30;
var timer;
var showModal = function (which, duration) {
    if (duration === void 0) { duration = 0; }
    var modal;
    isModalShown = true;
    lastShown = new Date().getTime();
    if (which === "logout") {
        modal = logoutModal;
        var yes = logoutDiv.querySelector("p#yes");
        var no = logoutDiv.querySelector("p#no");
        yes.onclick = function (event) { return location.href = "logout"; };
        no.onclick = function (event) {
            modal.hide();
            isModalShown = false;
        };
    }
    else {
        modal = inactiveModal;
        var yes = inactiveDiv.querySelector("p#yes");
        var no = inactiveDiv.querySelector("p#no");
        var noSpan_1 = no.querySelector("span");
        no.onclick = function (event) { return location.href = "logout"; };
        noSpan_1.innerText = "(" + time + "s)";
        timer = setInterval(function () {
            time--;
            noSpan_1.innerText = "(" + time + "s)";
            lastShown = new Date().getTime();
            if (time <= 0) {
                location.href = "logout";
            }
        }, 1000);
        yes.onclick = function (event) {
            clearInterval(timer);
            time = 30;
            console.log("cleared");
            modal.hide();
            isModalShown = false;
        };
    }
    modal.show();
};
// when user clicks logout
if (logoutLink) {
    logoutLink.onclick = function (event) {
        event.preventDefault();
        // show modal to confirm
        showModal("logout");
    };
}
