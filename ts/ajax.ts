export class Ajax{
    private url: string;
    private method: string;
    private form: HTMLFormElement;
    private isFetch: boolean;
    private before: Function = () => { };
    private finally: Function = () => { };
    private after: Function = () => { };
    private error: Function = () => { };
    public xhttp: XMLHttpRequest = new XMLHttpRequest();
    private timing: number = 0;
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
    public setFinally = (f: Function) => { this.finally = f; }
    public setAfter = (f: Function) => { this.after = f; }
    public setError = (f: Function) => { this.error = f; } 
    public setTimer = (f: Function, t: number) => {
        this.timing = setTimeout(() => {
            this.xhttp.abort();
            f(this.xhttp);
        }, t);
    }
    private clearTimer = () => {
        clearTimeout(this.timing);
    }

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
        this.xhttp.open(this.method, this.url, true);
        this.xhttp.addEventListener("load", () => {
            this.clearTimer();
            if (this.xhttp.readyState === XMLHttpRequest.DONE && this.xhttp.status === 200) this.after(this.xhttp.responseText);
            else { this.error(this.xhttp); }
            this.finally(this.xhttp);
        });
        this.xhttp.addEventListener("error", (e) => {
            this.clearTimer();
            console.error("An error occurred", e);
            this.error(this.xhttp);
            this.after = function () { };
            });
        this.xhttp.addEventListener("abort", (e) => console.error("Ajax process was aborted!", e));
        this.xhttp.send(new FormData(this.form));
    }
    public start() {
        if (this.isFetch) this.doFetch();
        else this.ajax();
    }

    public static fetchPage(url: string, doAfter: Function, 
        headers: object = {}, funcs: Function[] = [()=>{}, () => {}]) {
        fetch(url, {
            headers: { ...headers },
        }
        ).then(response => {
            if(response.status === 200)
            return response.text();
            funcs[0](response);
        })
        .then(data => {
            if(data){
                if(data.toLowerCase().indexOf("timeout") > -1) location.href="logout"
                doAfter(data);
            }
        })
        .catch(error => {
            console.error("An error occurred", error)
            if (funcs[0]) funcs[0](error);
        })
        .finally(() => {if(funcs[1])funcs[1]();})
    }
}