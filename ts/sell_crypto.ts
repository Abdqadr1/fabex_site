const allCopyBtn = document.querySelectorAll(".copyBtn") as NodeListOf<HTMLSpanElement>;

allCopyBtn.forEach(element => {
    element.onclick = () => {
        const greatGrandParent = element.parentElement?.parentElement?.parentElement as HTMLDivElement;
        const val = greatGrandParent.querySelector('span.value') as HTMLSpanElement;
        navigator.clipboard.writeText(val.innerText);
        console.log(val.innerText);
    }
    
});