export class Ajax{
    private url: string;
    private method: string;
    private form: HTMLFormElement;
    private isFetch: boolean;
    private before: Function = () => { };
    private after: Function = () => { };
    constructor(form:HTMLFormElement, isF:boolean = false) {
        this.url = form.action;
        this.method = form.method;
        this.form = form;
        this.isFetch = isF;
    }

    public setFetch = (u: boolean) => {
        this.isFetch = u;
    }

    public setBefore = (f: Function) => { this.before = f; }
    public setAfter = (f: Function) => { this.after = f;}

    protected doFetch() {
        if (!fetch) { this.ajax(); return; }
        fetch(this.url, {
            method: this.method,
            body: new FormData(this.form),
        }).then(response => response.text())
            .then(data => this.after(data))
            .catch(error => console.error("An error occurred", error));
    }
    protected ajax() {
        this.before();
        const xhttp = new XMLHttpRequest();
        xhttp.open(this.method, this.url, true);
        xhttp.addEventListener("load", () => {
            if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) this.after(xhttp.responseText);
        });
        xhttp.addEventListener("error", (e) => console.error("An error occurred", e));
        xhttp.addEventListener("abort", (e) => console.error("Ajax process was aborted!", e));
        xhttp.send(new FormData(this.form));
    }
    public start() {
        if (this.isFetch) this.doFetch();
        else this.ajax();
    }
}