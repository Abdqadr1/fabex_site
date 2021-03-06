var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var Ajax = /** @class */ (function () {
    function Ajax(form, isF) {
        var _this = this;
        if (isF === void 0) { isF = false; }
        this.before = function () { };
        this.finally = function () { };
        this.after = function () { };
        this.error = function () { };
        this.xhttp = new XMLHttpRequest();
        this.timing = 0;
        this.setFetch = function (u) {
            _this.isFetch = u;
        };
        this.setBefore = function (f) { _this.before = f; };
        this.setFinally = function (f) { _this.finally = f; };
        this.setAfter = function (f) { _this.after = f; };
        this.setError = function (f) { _this.error = f; };
        this.setTimer = function (f, t) {
            _this.timing = setTimeout(function () {
                _this.xhttp.abort();
                f(_this.xhttp);
            }, t);
        };
        this.clearTimer = function () {
            clearTimeout(_this.timing);
        };
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
            _this.clearTimer();
            if (_this.xhttp.readyState === XMLHttpRequest.DONE && _this.xhttp.status === 200)
                _this.after(_this.xhttp.responseText);
            else {
                _this.error(_this.xhttp);
            }
            _this.finally(_this.xhttp);
        });
        this.xhttp.addEventListener("error", function (e) {
            _this.clearTimer();
            console.error("An error occurred", e);
            _this.error(_this.xhttp);
            _this.after = function () { };
        });
        this.xhttp.addEventListener("abort", function (e) { return console.error("Ajax process was aborted!", e); });
        this.xhttp.send(new FormData(this.form));
    };
    Ajax.prototype.start = function () {
        if (this.isFetch)
            this.doFetch();
        else
            this.ajax();
    };
    Ajax.fetchPage = function (url, doAfter, headers, funcs) {
        if (headers === void 0) { headers = {}; }
        if (funcs === void 0) { funcs = [function () { }, function () { }]; }
        fetch(url, {
            headers: __assign({}, headers),
        }).then(function (response) {
            if (response.status === 200)
                return response.text();
            funcs[0](response);
        })
            .then(function (data) {
            if (data) {
                if (data.toLowerCase().indexOf("timeout") > -1)
                    location.href = "logout";
                doAfter(data);
            }
        })
            .catch(function (error) {
            console.error("An error occurred", error);
            if (funcs[0])
                funcs[0](error);
        })
            .finally(function () { if (funcs[1])
            funcs[1](); });
    };
    return Ajax;
}());
export { Ajax };
