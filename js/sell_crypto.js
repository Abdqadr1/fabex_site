"use strict";
var allCopyBtn = document.querySelectorAll(".copyBtn");
allCopyBtn.forEach(function (element) {
    element.onclick = function () {
        var _a, _b;
        var greatGrandParent = (_b = (_a = element.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement;
        var val = greatGrandParent.querySelector('span.value');
        navigator.clipboard.writeText(val.innerText);
        console.log(val.innerText);
    };
});
