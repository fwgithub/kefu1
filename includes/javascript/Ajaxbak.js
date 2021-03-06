jx = {
    getHTTPObject: function() {
        var a = false;
        if (typeof ActiveXObject != "undefined") {
            try {
                a = new ActiveXObject("Msxml2.XMLHTTP")
            } catch (c) {
                try {
                    a = new ActiveXObject("Microsoft.XMLHTTP")
                } catch (b) {
                    a = false
                }
            }
        } else {
            if (window.XMLHttpRequest) {
                try {
                    a = new XMLHttpRequest()
                } catch (c) {
                    a = false
                }
            }
        }
        return a
    },
    load: function(url, callback, format, method, opt) {
        var http = this.init();
        if (!http || !url) {
            return
        }
        if (http.overrideMimeType) {
            http.overrideMimeType("text/xml")
        }
        if (!method) {
            method = "GET"
        }
        if (!format) {
            format = "text"
        }
        if (!opt) {
            opt = {}
        }
        format = format.toLowerCase();
        method = method.toUpperCase();
        var now = "iecode=" + new Date().getTime();
        url += (url.indexOf("?") + 1) ? "&" : "?";
        url += now;
        var parameters = null;
        if (method == "POST") {
            var parts = url.split("?");
            url = parts[0];
            parameters = parts[1]
        }
        http.open(method, url, true);
        if (method == "POST") {
            http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            http.setRequestHeader("Content-length", parameters.length);
            http.setRequestHeader("Connection", "close")
        }
        var clearTO = setTimeout(function() {
            http.abort();
            if (callback) {
                callback(0)
            }
        }, 20000);
        if (opt.handler) {
            http.onreadystatechange = function() {
                opt.handler(http)
            }
        } else {
            http.onreadystatechange = function() {
                if (http.readyState == 4) {
                    if (clearTO) {
                        clearTimeout(clearTO)
                    }
                    if (http.status == 200) {
                        var result = "";
                        if (http.responseText) {
                            result = http.responseText
                        }
                        if (format.charAt(0) == "j") {
                            result = result.replace(/[\n\r]/g, "");
                            result = eval("(" + result + ")")
                        } else {
                            if (format.charAt(0) == "x") {
                                result = http.responseXML
                            }
                        }
                        if (callback) {
                            callback(result)
                        }
                    } else {
                        if (opt.loadingIndicator) {
                            document.getElementsByTagName("body")[0].removeChild(opt.loadingIndicator)
                        }
                        if (opt.loading) {
                            document.getElementById(opt.loading).style.display = "none"
                        }
                        if (opt.onError) {
                            opt.onError(http.status)
                        }
                    }
                }
            }
        }
        http.send(parameters)
    },
    bind: function(a) {
        var c = {
            url: "",
            onSuccess: false,
            onError: false,
            format: "text",
            method: "GET",
            update: "",
            loading: "",
            loadingIndicator: ""
        };
        for (var b in c) {
            if (a[b]) {
                c[b] = a[b]
            }
        }
        if (!c.url) {
            return
        }
        var d = false;
        if (c.loadingIndicator) {
            d = document.createElement("div");
            d.setAttribute("style", "position:absolute;top:0px;left:0px;");
            d.setAttribute("class", "loading-indicator");
            d.innerHTML = c.loadingIndicator;
            document.getElementsByTagName("body")[0].appendChild(d);
            this.opt.loadingIndicator = d
        }
        if (c.loading) {
            document.getElementById(c.loading).style.display = "block"
        }
        this.load(c.url, function(e) {
            if (c.onSuccess) {
                c.onSuccess(e)
            }
            if (c.update) {
                document.getElementById(c.update).innerHTML = e
            }
            if (d) {
                document.getElementsByTagName("body")[0].removeChild(d)
            }
            if (c.loading) {
                document.getElementById(c.loading).style.display = "none"
            }
        }, c.format, c.method, c)
    },
    init: function() {
        return this.getHTTPObject()
    }
};