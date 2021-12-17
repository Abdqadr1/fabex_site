var Ajax = /** @class */ (function () {
    function Ajax(form, isF) {
        var _this = this;
        if (isF === void 0) { isF = false; }
        this.before = function () { };
        this.after = function () { };
        this.error = function () { };
        this.xhttp = new XMLHttpRequest();
        this.setFetch = function (u) {
            _this.isFetch = u;
        };
        this.setBefore = function (f) { _this.before = f; };
        this.setAfter = function (f) { _this.after = f; };
        this.setError = function (f) { _this.error = f; };
        this.url = form.action;
        this.method = form.method;
        this.form = form;
        this.isFetch = isF;
    }
    Ajax.prototype.doFetch = function () {
        var _this = this;
        if (!fetch) {
            this.ajax();
            return;
        }
        fetch(this.url, {
            method: this.method,
            body: new FormData(this.form),
        }).then(function (response) { return response.text(); })
            .then(function (data) { return _this.after(data); })
            .catch(function (error) { return console.error("An error occurred", error); });
    };
    Ajax.prototype.ajax = function () {
        var _this = this;
        this.before();
        this.xhttp.open(this.method, this.url, true);
        this.xhttp.addEventListener("load", function () {
            if (_this.xhttp.readyState === XMLHttpRequest.DONE && _this.xhttp.status === 200)
                _this.after(_this.xhttp.responseText);
            else {
                _this.error(_this.xhttp);
            }
        });
        this.xhttp.addEventListener("error", function (e) { return console.error("An error occurred", e); });
        this.xhttp.addEventListener("abort", function (e) { return console.error("Ajax process was aborted!", e); });
        this.xhttp.send(new FormData(this.form));
    };
    Ajax.prototype.start = function () {
        if (this.isFetch)
            this.doFetch();
        else
            this.ajax();
    };
    Ajax.fetchPage = function (url, doAfter) {
        fetch(url, {
            method: "get"
        }).then(function (response) { return response.text(); })
            .then(function (data) { return doAfter(data); })
            .catch(function (error) { return console.error("An error occurred", error); });
    };
    return Ajax;
}());
export { Ajax };
