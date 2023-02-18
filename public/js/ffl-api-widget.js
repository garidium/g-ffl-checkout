! function(t) {
    function n(r) {
        if (e[r]) return e[r].exports;
        var i = e[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return t[r].call(i.exports, i, i.exports, n), i.l = !0, i.exports
    }
    var e = {};
    n.m = t, n.c = e, n.d = function(t, e, r) {
        n.o(t, e) || Object.defineProperty(t, e, {
            configurable: !1,
            enumerable: !0,
            get: r
        })
    }, n.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default
        } : function() {
            return t
        };
        return n.d(e, "a", e), e
    }, n.o = function(t, n) {
        return Object.prototype.hasOwnProperty.call(t, n)
    }, n.p = "", n(n.s = 13)
}([function(t, n, e) {
    "use strict";

    function r(t) {
        return t = t.toLowerCase(),
            function(n) {
                return E(n) === t
            }
    }

    function i(t) {
        return Array.isArray(t)
    }

    function o(t) {
        return void 0 === t
    }

    function a(t) {
        return null !== t && !o(t) && null !== t.constructor && !o(t.constructor) && "function" == typeof t.constructor.isBuffer && t.constructor.isBuffer(t)
    }

    function s(t) {
        return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(t) : t && t.buffer && D(t.buffer)
    }

    function u(t) {
        return "string" == typeof t
    }

    function c(t) {
        return "number" == typeof t
    }

    function f(t) {
        return null !== t && "object" == typeof t
    }

    function l(t) {
        if ("object" !== E(t)) return !1;
        var n = Object.getPrototypeOf(t);
        return null === n || n === Object.prototype
    }

    function h(t) {
        return "[object Function]" === T.call(t)
    }

    function p(t) {
        return f(t) && h(t.pipe)
    }

    function d(t) {
        return t && ("function" == typeof FormData && t instanceof FormData || "[object FormData]" === T.call(t) || h(t.toString) && "[object FormData]" === t.toString())
    }

    function g(t) {
        return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")
    }

    function y() {
        return ("undefined" == typeof navigator || "ReactNative" !== navigator.product && "NativeScript" !== navigator.product && "NS" !== navigator.product) && ("undefined" != typeof window && "undefined" != typeof document)
    }

    function m(t, n) {
        if (null !== t && void 0 !== t)
            if ("object" != typeof t && (t = [t]), i(t))
                for (var e = 0, r = t.length; e < r; e++) n.call(null, t[e], e, t);
            else
                for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && n.call(null, t[o], o, t)
    }

    function I() {
        function t(t, e) {
            l(n[e]) && l(t) ? n[e] = I(n[e], t) : l(t) ? n[e] = I({}, t) : i(t) ? n[e] = t.slice() : n[e] = t
        }
        for (var n = {}, e = 0, r = arguments.length; e < r; e++) m(arguments[e], t);
        return n
    }

    function M(t, n, e) {
        return m(n, function(n, r) {
            t[r] = e && "function" == typeof n ? x(n, e) : n
        }), t
    }

    function w(t) {
        return 65279 === t.charCodeAt(0) && (t = t.slice(1)), t
    }

    function N(t, n, e, r) {
        t.prototype = Object.create(n.prototype, r), t.prototype.constructor = t, e && Object.assign(t.prototype, e)
    }

    function v(t, n, e) {
        var r, i, o, a = {};
        n = n || {};
        do {
            for (r = Object.getOwnPropertyNames(t), i = r.length; i-- > 0;) o = r[i], a[o] || (n[o] = t[o], a[o] = !0);
            t = Object.getPrototypeOf(t)
        } while (t && (!e || e(t, n)) && t !== Object.prototype);
        return n
    }

    function j(t, n, e) {
        t = String(t), (void 0 === e || e > t.length) && (e = t.length), e -= n.length;
        var r = t.indexOf(n, e);
        return -1 !== r && r === e
    }

    function b(t) {
        if (!t) return null;
        var n = t.length;
        if (o(n)) return null;
        for (var e = new Array(n); n-- > 0;) e[n] = t[n];
        return e
    }
    var x = e(4),
        T = Object.prototype.toString,
        E = function(t) {
            return function(n) {
                var e = T.call(n);
                return t[e] || (t[e] = e.slice(8, -1).toLowerCase())
            }
        }(Object.create(null)),
        D = r("ArrayBuffer"),
        z = r("Date"),
        O = r("File"),
        S = r("Blob"),
        L = r("FileList"),
        A = r("URLSearchParams"),
        k = function(t) {
            return function(n) {
                return t && n instanceof t
            }
        }("undefined" != typeof Uint8Array && Object.getPrototypeOf(Uint8Array));
    t.exports = {
        isArray: i,
        isArrayBuffer: D,
        isBuffer: a,
        isFormData: d,
        isArrayBufferView: s,
        isString: u,
        isNumber: c,
        isObject: f,
        isPlainObject: l,
        isUndefined: o,
        isDate: z,
        isFile: O,
        isBlob: S,
        isFunction: h,
        isStream: p,
        isURLSearchParams: A,
        isStandardBrowserEnv: y,
        forEach: m,
        merge: I,
        extend: M,
        trim: g,
        stripBOM: w,
        inherits: N,
        toFlatObject: v,
        kindOf: E,
        kindOfTest: r,
        endsWith: j,
        toArray: b,
        isTypedArray: k,
        isFileList: L
    }
}, function(t, n, e) {
    "use strict";

    function r(t, n, e, r, i) {
        Error.call(this), this.message = t, this.name = "AxiosError", n && (this.code = n), e && (this.config = e), r && (this.request = r), i && (this.response = i)
    }
    var i = e(0);
    i.inherits(r, Error, {
        toJSON: function() {
            return {
                message: this.message,
                name: this.name,
                description: this.description,
                number: this.number,
                fileName: this.fileName,
                lineNumber: this.lineNumber,
                columnNumber: this.columnNumber,
                stack: this.stack,
                config: this.config,
                code: this.code,
                status: this.response && this.response.status ? this.response.status : null
            }
        }
    });
    var o = r.prototype,
        a = {};
    ["ERR_BAD_OPTION_VALUE", "ERR_BAD_OPTION", "ECONNABORTED", "ETIMEDOUT", "ERR_NETWORK", "ERR_FR_TOO_MANY_REDIRECTS", "ERR_DEPRECATED", "ERR_BAD_RESPONSE", "ERR_BAD_REQUEST", "ERR_CANCELED"].forEach(function(t) {
        a[t] = {
            value: t
        }
    }), Object.defineProperties(r, a), Object.defineProperty(o, "isAxiosError", {
        value: !0
    }), r.from = function(t, n, e, a, s, u) {
        var c = Object.create(o);
        return i.toFlatObject(t, c, function(t) {
            return t !== Error.prototype
        }), r.call(c, t.message, n, e, a, s), c.name = t.name, u && Object.assign(c, u), c
    }, t.exports = r
}, function(t, n, e) {
    "use strict";

    function r(t) {
        i.call(this, null == t ? "canceled" : t, i.ERR_CANCELED), this.name = "CanceledError"
    }
    var i = e(1);
    e(0).inherits(r, i, {
        __CANCEL__: !0
    }), t.exports = r
}, function(t, n, e) {
    "use strict";
    (function(n) {
        function r(t, n) {
            !o.isUndefined(t) && o.isUndefined(t["Content-Type"]) && (t["Content-Type"] = n)
        }

        function i(t, n, e) {
            if (o.isString(t)) try {
                return (n || JSON.parse)(t), o.trim(t)
            } catch (t) {
                if ("SyntaxError" !== t.name) throw t
            }
            return (e || JSON.stringify)(t)
        }
        var o = e(0),
            a = e(22),
            s = e(1),
            u = e(6),
            c = e(7),
            f = {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            l = {
                transitional: u,
                adapter: function() {
                    var t;
                    return "undefined" != typeof XMLHttpRequest ? t = e(8) : void 0 !== n && "[object process]" === Object.prototype.toString.call(n) && (t = e(8)), t
                }(),
                transformRequest: [function(t, n) {
                    if (a(n, "Accept"), a(n, "Content-Type"), o.isFormData(t) || o.isArrayBuffer(t) || o.isBuffer(t) || o.isStream(t) || o.isFile(t) || o.isBlob(t)) return t;
                    if (o.isArrayBufferView(t)) return t.buffer;
                    if (o.isURLSearchParams(t)) return r(n, "application/x-www-form-urlencoded;charset=utf-8"), t.toString();
                    var e, s = o.isObject(t),
                        u = n && n["Content-Type"];
                    if ((e = o.isFileList(t)) || s && "multipart/form-data" === u) {
                        var f = this.env && this.env.FormData;
                        return c(e ? {
                            "files[]": t
                        } : t, f && new f)
                    }
                    return s || "application/json" === u ? (r(n, "application/json"), i(t)) : t
                }],
                transformResponse: [function(t) {
                    var n = this.transitional || l.transitional,
                        e = n && n.silentJSONParsing,
                        r = n && n.forcedJSONParsing,
                        i = !e && "json" === this.responseType;
                    if (i || r && o.isString(t) && t.length) try {
                        return JSON.parse(t)
                    } catch (t) {
                        if (i) {
                            if ("SyntaxError" === t.name) throw s.from(t, s.ERR_BAD_RESPONSE, this, null, this.response);
                            throw t
                        }
                    }
                    return t
                }],
                timeout: 0,
                xsrfCookieName: "XSRF-TOKEN",
                xsrfHeaderName: "X-XSRF-TOKEN",
                maxContentLength: -1,
                maxBodyLength: -1,
                env: {
                    FormData: e(35)
                },
                validateStatus: function(t) {
                    return t >= 200 && t < 300
                },
                headers: {
                    common: {
                        Accept: "application/json, text/plain, */*"
                    }
                }
            };
        o.forEach(["delete", "get", "head"], function(t) {
            l.headers[t] = {}
        }), o.forEach(["post", "put", "patch"], function(t) {
            l.headers[t] = o.merge(f)
        }), t.exports = l
    }).call(n, e(21))
}, function(t, n, e) {
    "use strict";
    t.exports = function(t, n) {
        return function() {
            for (var e = new Array(arguments.length), r = 0; r < e.length; r++) e[r] = arguments[r];
            return t.apply(n, e)
        }
    }
}, function(t, n, e) {
    "use strict";

    function r(t) {
        return encodeURIComponent(t).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]")
    }
    var i = e(0);
    t.exports = function(t, n, e) {
        if (!n) return t;
        var o;
        if (e) o = e(n);
        else if (i.isURLSearchParams(n)) o = n.toString();
        else {
            var a = [];
            i.forEach(n, function(t, n) {
                null !== t && void 0 !== t && (i.isArray(t) ? n += "[]" : t = [t], i.forEach(t, function(t) {
                    i.isDate(t) ? t = t.toISOString() : i.isObject(t) && (t = JSON.stringify(t)), a.push(r(n) + "=" + r(t))
                }))
            }), o = a.join("&")
        }
        if (o) {
            var s = t.indexOf("#"); - 1 !== s && (t = t.slice(0, s)), t += (-1 === t.indexOf("?") ? "?" : "&") + o
        }
        return t
    }
}, function(t, n, e) {
    "use strict";
    t.exports = {
        silentJSONParsing: !0,
        forcedJSONParsing: !0,
        clarifyTimeoutError: !1
    }
}, function(t, n, e) {
    "use strict";
    (function(n) {
        function r(t, e) {
            function r(t) {
                return null === t ? "" : i.isDate(t) ? t.toISOString() : i.isArrayBuffer(t) || i.isTypedArray(t) ? "function" == typeof Blob ? new Blob([t]) : n.from(t) : t
            }

            function o(t, n) {
                if (i.isPlainObject(t) || i.isArray(t)) {
                    if (-1 !== a.indexOf(t)) throw Error("Circular reference detected in " + n);
                    a.push(t), i.forEach(t, function(t, a) {
                        if (!i.isUndefined(t)) {
                            var s, u = n ? n + "." + a : a;
                            if (t && !n && "object" == typeof t)
                                if (i.endsWith(a, "{}")) t = JSON.stringify(t);
                                else if (i.endsWith(a, "[]") && (s = i.toArray(t))) return void s.forEach(function(t) {
                                !i.isUndefined(t) && e.append(u, r(t))
                            });
                            o(t, u)
                        }
                    }), a.pop()
                } else e.append(n, r(t))
            }
            e = e || new FormData;
            var a = [];
            return o(t), e
        }
        var i = e(0);
        t.exports = r
    }).call(n, e(23).Buffer)
}, function(t, n, e) {
    "use strict";
    var r = e(0),
        i = e(28),
        o = e(29),
        a = e(5),
        s = e(9),
        u = e(32),
        c = e(33),
        f = e(6),
        l = e(1),
        h = e(2),
        p = e(34);
    t.exports = function(t) {
        return new Promise(function(n, e) {
            function d() {
                t.cancelToken && t.cancelToken.unsubscribe(y), t.signal && t.signal.removeEventListener("abort", y)
            }

            function g() {
                if (w) {
                    var r = "getAllResponseHeaders" in w ? u(w.getAllResponseHeaders()) : null,
                        o = M && "text" !== M && "json" !== M ? w.response : w.responseText,
                        a = {
                            data: o,
                            status: w.status,
                            statusText: w.statusText,
                            headers: r,
                            config: t,
                            request: w
                        };
                    i(function(t) {
                        n(t), d()
                    }, function(t) {
                        e(t), d()
                    }, a), w = null
                }
            }
            var y, m = t.data,
                I = t.headers,
                M = t.responseType;
            r.isFormData(m) && r.isStandardBrowserEnv() && delete I["Content-Type"];
            var w = new XMLHttpRequest;
            if (t.auth) {
                var N = t.auth.username || "",
                    v = t.auth.password ? unescape(encodeURIComponent(t.auth.password)) : "";
                I.Authorization = "Basic " + btoa(N + ":" + v)
            }
            var j = s(t.baseURL, t.url);
            if (w.open(t.method.toUpperCase(), a(j, t.params, t.paramsSerializer), !0), w.timeout = t.timeout, "onloadend" in w ? w.onloadend = g : w.onreadystatechange = function() {
                    w && 4 === w.readyState && (0 !== w.status || w.responseURL && 0 === w.responseURL.indexOf("file:")) && setTimeout(g)
                }, w.onabort = function() {
                    w && (e(new l("Request aborted", l.ECONNABORTED, t, w)), w = null)
                }, w.onerror = function() {
                    e(new l("Network Error", l.ERR_NETWORK, t, w, w)), w = null
                }, w.ontimeout = function() {
                    var n = t.timeout ? "timeout of " + t.timeout + "ms exceeded" : "timeout exceeded",
                        r = t.transitional || f;
                    t.timeoutErrorMessage && (n = t.timeoutErrorMessage), e(new l(n, r.clarifyTimeoutError ? l.ETIMEDOUT : l.ECONNABORTED, t, w)), w = null
                }, r.isStandardBrowserEnv()) {
                var b = (t.withCredentials || c(j)) && t.xsrfCookieName ? o.read(t.xsrfCookieName) : void 0;
                b && (I[t.xsrfHeaderName] = b)
            }
            "setRequestHeader" in w && r.forEach(I, function(t, n) {
                void 0 === m && "content-type" === n.toLowerCase() ? delete I[n] : w.setRequestHeader(n, t)
            }), r.isUndefined(t.withCredentials) || (w.withCredentials = !!t.withCredentials), M && "json" !== M && (w.responseType = t.responseType), "function" == typeof t.onDownloadProgress && w.addEventListener("progress", t.onDownloadProgress), "function" == typeof t.onUploadProgress && w.upload && w.upload.addEventListener("progress", t.onUploadProgress), (t.cancelToken || t.signal) && (y = function(t) {
                w && (e(!t || t && t.type ? new h : t), w.abort(), w = null)
            }, t.cancelToken && t.cancelToken.subscribe(y), t.signal && (t.signal.aborted ? y() : t.signal.addEventListener("abort", y))), m || (m = null);
            var x = p(j);
            if (x && -1 === ["http", "https", "file"].indexOf(x)) return void e(new l("Unsupported protocol " + x + ":", l.ERR_BAD_REQUEST, t));
            w.send(m)
        })
    }
}, function(t, n, e) {
    "use strict";
    var r = e(30),
        i = e(31);
    t.exports = function(t, n) {
        return t && !r(n) ? i(t, n) : n
    }
}, function(t, n, e) {
    "use strict";
    t.exports = function(t) {
        return !(!t || !t.__CANCEL__)
    }
}, function(t, n, e) {
    "use strict";
    var r = e(0);
    t.exports = function(t, n) {
        function e(t, n) {
            return r.isPlainObject(t) && r.isPlainObject(n) ? r.merge(t, n) : r.isPlainObject(n) ? r.merge({}, n) : r.isArray(n) ? n.slice() : n
        }

        function i(i) {
            return r.isUndefined(n[i]) ? r.isUndefined(t[i]) ? void 0 : e(void 0, t[i]) : e(t[i], n[i])
        }

        function o(t) {
            if (!r.isUndefined(n[t])) return e(void 0, n[t])
        }

        function a(i) {
            return r.isUndefined(n[i]) ? r.isUndefined(t[i]) ? void 0 : e(void 0, t[i]) : e(void 0, n[i])
        }

        function s(r) {
            return r in n ? e(t[r], n[r]) : r in t ? e(void 0, t[r]) : void 0
        }
        n = n || {};
        var u = {},
            c = {
                url: o,
                method: o,
                data: o,
                baseURL: a,
                transformRequest: a,
                transformResponse: a,
                paramsSerializer: a,
                timeout: a,
                timeoutMessage: a,
                withCredentials: a,
                adapter: a,
                responseType: a,
                xsrfCookieName: a,
                xsrfHeaderName: a,
                onUploadProgress: a,
                onDownloadProgress: a,
                decompress: a,
                maxContentLength: a,
                maxBodyLength: a,
                beforeRedirect: a,
                transport: a,
                httpAgent: a,
                httpsAgent: a,
                cancelToken: a,
                socketPath: a,
                responseEncoding: a,
                validateStatus: s
            };
        return r.forEach(Object.keys(t).concat(Object.keys(n)), function(t) {
            var n = c[t] || i,
                e = n(t);
            r.isUndefined(e) && n !== s || (u[t] = e)
        }), u
    }
}, function(t, n) {
    t.exports = {
        version: "0.27.2"
    }
}, function(t, n, e) {
    "use strict";
    Object.defineProperty(n, "__esModule", {
        value: !0
    });
    var r = e(14);
    ! function(t) {
        var n = function(t) {
                r.a.generate(t)
            },
            e = function() {
                r.a.initGMap()
            },
            i = function(t) {
                r.a.geoCodeInit(t)
            },
            o = function(t) {
                r.a.setSelected(t)
            },
            a = function() {
                r.a.getSelected()
            };
        t.FFL = {
            init: n,
            initGMap: e,
            geoCodeInit: i,
            setSelected: o,
            getSelected: a
        }
    }(window)
}, function(t, n, e) {
    "use strict";

    function r() {
        for (var t in d) d.hasOwnProperty(t) && d[t].remove();
        for (var n = 0; n < g.length; n++) g[n].remove();
        for (var e = 0; e < y.length; e++) y[e].remove();
        d = [], g = [], y = []
    }
    function scrollToMyRef(id){
        setTimeout(function () {
             document.getElementById(id).scrollIntoView({
                 behavior: "smooth",
                 block: "start",
             });
        }, 100);
    }
    function scrollToMyRefWithOffset(id, offset){
        setTimeout(function () {
            const yOffset = offset; 
            const element = document.getElementById(id);
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({top: y, behavior: 'smooth'});
        }, 100);
    }
    function i(t, n, e) {
        if (!fflIncludeMap){
            return;
        }
        var r = l
        if (n.lng < 0 && n.lat > 0){
            var phone = e.voice_phone;
            if ((phone+"").length == 10){
                var phone_sects = phone.match(/^(\d{3})(\d{3})(\d{4})$/);
                phone = phone_sects[1] + '-' + phone_sects[2] + '-' + phone_sects[3];
            }
            var markerColor = {"color": "#cfd4ce" }
            if (e.ffl_on_file){
                markerColor = {"color": "#28e51f" }
            }
            var i = new mapboxgl.Marker(markerColor)
                .setLngLat([n.lng, n.lat])
                .setPopup(new mapboxgl.Popup().setHTML('<div id="popupContent"><h4 style="font-weight:bold;">' + e.list_name + "</h3>"+ (e.ffl_on_file?"<font color=#09bb00><b>Preferred Dealer:</b> We have the FFL on-file. Contact Dealer for Transfer Details.</font>":"<font color=red><b>Dealer Contact Required</b> for Transfer Details. We need a signed copy of their FFL.</font>") + "<br>" + e.premise_street + "<br>" + e.premise_city + ", " + e.premise_state + " " + e.premise_zip_code + "<br/>" + phone + (e.email!=null?"<br/>" + e.email:"") + "</div>"))
                .addTo(r);
            
            i.getElement().addEventListener("click", function() {
                window.scrollBy(0, 1);
                window.scrollBy(0, -1);
                f.setSelected({data: e});
                scrollToMyRef(e.license_number);
            });
            d[e.license_number] = i, g.push(i), null === localStorage.getItem("mapCenter") && localStorage.setItem("mapCenter", !0)
        }

    }
    var o = e(15),
        a = e.n(o),
        s = e(40),
        u = e.n(s),
        c = this,
        f = {
            inputArray: [],
            table: [],
            winner: {}
        },
        l = "",
        h = null,
        p = "",
        d = {},
        g = [],
        y = [];
    f.generate = function(t) {
        var n = t.container,
            e = void 0 === n ? "" : n,
            o = t.apiKey,
            s = void 0 === o ? "" : o,
            h = t.geoKey,
            g = void 0 === h ? "" : h,
            m = t.cBack;
        if (p = void 0 === m ? "" : m, "" === s) return alert("Please define your g-FFL API key!"), !1;

        var M = document.getElementById(e);
        if (void 0 === M) {
            document.createElement("div").id = "ffl_container", M = document.getElementById("ffl_container")
        }
        if (null === M) {
            document.createElement("div").id = "ffl_container", M = document.getElementById("ffl_container")
        }
        M.insertAdjacentHTML("beforeend", u.a);
        var w = a.a.create({
                withCredentials: !1,
                baseURL: "https://ffl-api.garidium.com",
                crossdomain: !0
            }),
            N = document.getElementById("ffl-search"),
            v = document.getElementById("ffl-zip-code"),
            j = document.getElementById("ffl-radius"),
            ns = document.getElementById("ffl-name-search"),
            b = document.getElementById("ffl-list");
        v.addEventListener("keypress", function(t) {
            "Enter" !== t.key && "Enter" !== t.code || (N.click(), t.preventDefault(), t.stopPropagation())
        }), N.addEventListener("click", function(t) {
            if (5 !== v.value.length) return alert("Enter valid zip code!"), t.preventDefault(), !1;
            if (0 === j.value) return alert("Enter valid radius!"), t.preventDefault(), !1;
            N.classList.add("dsbSearch"), r(), b.classList.add("ffl-hide"), b.innerHTML = "";
            var n = {};
            return n.action = 'get_ffl_list', n.data = "{\"ffl_name\": \"" + ns.value + "\", \"zipcode\": \"" + v.value + "\", \"radius\": \"" + j.value + "\"}", w.post("", n, {
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": s,
                }
            }).then(function(t) {
                if (fflIncludeMap && document.getElementById("ffl-map").classList.remove("ffl-map-full"), document.getElementById("ffl-map").classList.add("ffl-map-resize"), N.classList.remove("dsbSearch"), 200 === t.status) {
                    if (t.data.Error!=null || (t.data.original && 400 === t.data.original.status)) return alert("No FFL's found, Please check your inputs and try again."), !1;
                    localStorage.removeItem("mapCenter");
                    var n, e = t.data,
                        o = 0;
                    var count = 0;
                    var overallCount = 0;
                    var bounds = null;
                    for (var a in e) {
                        overallCount += 1;
                        var s = e[a],
                            u = s.premise_street + ", " + s.premise_city + ", " + s.premise_state + ", " + s.premise_zip_code;
                        if (0 !== s.lat) {
                            i(r, {
                                lat: parseFloat(s.lat),
                                lng: parseFloat(s.lng)
                            }, s)
                        }
                        0 === o && (n = {
                            lat: parseFloat(s.lat),
                            lng: parseFloat(s.lng)
                        }), o++;
                        //Check if the input is of correct length
                        var phone = s.voice_phone;
                        if ((phone+"").length == 10){
                            var phone_sects = s.voice_phone.match(/^(\d{3})(\d{3})(\d{4})$/);
                            phone = phone_sects[1] + '-' + phone_sects[2] + '-' + phone_sects[3];
                        }
                        
                        var p = encodeURIComponent(JSON.stringify(s)),
                            g = "<div id=" + s.license_number + '><button class="ffl-list-div" data-marker-id=' + s.license_number + " data-content=" + p + "><b>" + s.list_name + "</b>  ";
                            var icon_url = g_ffl_plugin_directory + "includes/images/ffl_required.png";
                            var icon_text = "We need a signed copy of the FFL emailed to us";
                            if (s.ffl_on_file){
                                icon_text = "FFL On-File";
                                icon_url = g_ffl_plugin_directory + "includes/images/ffl_on_file.png";
                            }
                            g+="<img align=right height=25 width=25 title='" + icon_text + "' src='" + icon_url + "'>" + "<br>" + s.premise_street + ", " + s.premise_city + "<br>" + phone+ (s.email!=undefined?" | <a target=_blank href='mailto:" + s.email + "'>" + s.email + "</a>":"") + "</button></div>";
                        b.insertAdjacentHTML("beforeend", g)

                        // Create a 'LngLatBounds' with the first coordinate.
                        if (fflIncludeMap){
                            var lat = parseFloat(s.lat);
                            var lng = parseFloat(s.lng);
                            if (lat > 0 && lng < 0){
                                var coord = new mapboxgl.LngLat(lng,lat)
                                if (count == 0){
                                    bounds = new mapboxgl.LngLatBounds(
                                        parseFloat(coord),
                                        parseFloat(coord)
                                    );
                                    bounds.extend(coord);
                                    count += 1
                                }else{
                                    bounds.extend(coord);
                                }
                            }
                        }
                      
                    }

                    // Note there are other options such as easeing animation and maxZoom
                    if (count > 0){ 
                        if (fflIncludeMap){                       
                            l.fitBounds(bounds, {
                                padding: 50
                            });  
                        }
                    }
                    
                    if (overallCount==0){
                        alert("No FFL's were found based on your search criteria.")
                    }

                    for (var m = document.getElementsByClassName("ffl-list-div"), I = 0; I < m.length; I++) m[I].addEventListener("click", function(t) {
                        var a3 = d[this.getAttribute("data-marker-id")];
                        var data = this.getAttribute("data-content")
                        getSelected(JSON.parse(decodeURIComponent(data)));
                        t.preventDefault();t.stopPropagation();
                        if (fflIncludeMap){
                            l.flyTo({center: [a3._lngLat.lng, a3._lngLat.lat], zoom: 15});
                        }else{
                            if (hok=='woocommerce_before_checkout_shipping_form'){
                                scrollToMyRef("first_last_notice");
                            }
                        }
                    });
                }
                if (t.data.length > 0){
                    b.classList.remove("ffl-hide");
                }
    
            }, function(t) {
                if (422 === t.response.status || 400 === t.response.status) return alert(t.response.data.message), !1;
            }), t.preventDefault(), t.stopPropagation(), !1
        })
    }, f.initGMap = function() {
         var JavaScript = {
           load: function(src, callback) {
             var script = document.createElement('script'),
                 loaded;
             script.setAttribute('src', src);
             if (callback) {
               script.onreadystatechange = script.onload = function() {
                 if (!loaded) {
                   callback();
                 }
                 loaded = true;
               };
             }
             
             document.getElementsByTagName('head')[0].appendChild(script);
             if (fflIncludeMap){
                var I2 = document.createElement("link");
                I2.setAttribute("href", "https://api.mapbox.com/mapbox-gl-js/v2.12.0/mapbox-gl.css");
                I2.setAttribute("rel", "stylesheet");
                document.getElementsByTagName('head')[0].appendChild(I2);
             }
           }
         };
         var t = null;
         // still run this request even if we don't have the map
         // to preload the API for better performance 
         JavaScript.load("https://api.mapbox.com/mapbox-gl-js/v2.12.0/mapbox-gl.js", function() {
            fetch('https://ffl-api.garidium.com', {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-api-key': aKey,
                },
                body: JSON.stringify({'action': 'get_mapbox_token'})
            })
            .then(response=>response.json())
            .then(data=>{ 
                if (fflIncludeMap){
                    mapboxgl.accessToken = data;
                    t = new mapboxgl.Map({
                        container: 'ffl-map', // container ID
                        style: 'mapbox://styles/garidium/clds8orfo000q01udg0o23pp5', // style URL
                        center: [-78.16847, 38.21885], // starting position [lng, lat]
                        zoom: 14 // starting zoom
                    });
                    t.resize();
                    t.addControl(new mapboxgl.FullscreenControl());
                    l = t 
                    l.resize();
                }       
            });
        });
         if (!fflIncludeMap){                    
            document.getElementById("ffl-map").style.display = "none";
            document.getElementById("mapbox-attribution-line").style.display = "none";
         }
        
    }, f.chunkArr = function(t) {
        for (var n = t.arr, e = t.chunkSize, r = [], i = 0, o = n.length; i < o; i += e) r.push(n.slice(i, i + e));
        return r
    }, f.setSelected = function(t) {
        var n = t.data;
        h = n, p(h)
    }, f.getSelected = function() {
        return h
    }, 
    n.a = f
}, function(t, n, e) {
    t.exports = e(16)
}, function(t, n, e) {
    "use strict";

    function r(t) {
        var n = new a(t),
            e = o(a.prototype.request, n);
        return i.extend(e, a.prototype, n), i.extend(e, n), e.create = function(n) {
            return r(s(t, n))
        }, e
    }
    var i = e(0),
        o = e(4),
        a = e(17),
        s = e(11),
        u = e(3),
        c = r(u);
    c.Axios = a, c.CanceledError = e(2), c.CancelToken = e(37), c.isCancel = e(10), c.VERSION = e(12).version, c.toFormData = e(7), c.AxiosError = e(1), c.Cancel = c.CanceledError, c.all = function(t) {
        return Promise.all(t)
    }, c.spread = e(38), c.isAxiosError = e(39), t.exports = c, t.exports.default = c
}, function(t, n, e) {
    "use strict";

    function r(t) {
        this.defaults = t, this.interceptors = {
            request: new a,
            response: new a
        }
    }
    var i = e(0),
        o = e(5),
        a = e(18),
        s = e(19),
        u = e(11),
        c = e(9),
        f = e(36),
        l = f.validators;
    r.prototype.request = function(t, n) {
        "string" == typeof t ? (n = n || {}, n.url = t) : n = t || {}, n = u(this.defaults, n), n.method ? n.method = n.method.toLowerCase() : this.defaults.method ? n.method = this.defaults.method.toLowerCase() : n.method = "get";
        var e = n.transitional;
        void 0 !== e && f.assertOptions(e, {
            silentJSONParsing: l.transitional(l.boolean),
            forcedJSONParsing: l.transitional(l.boolean),
            clarifyTimeoutError: l.transitional(l.boolean)
        }, !1);
        var r = [],
            i = !0;
        this.interceptors.request.forEach(function(t) {
            "function" == typeof t.runWhen && !1 === t.runWhen(n) || (i = i && t.synchronous, r.unshift(t.fulfilled, t.rejected))
        });
        var o = [];
        this.interceptors.response.forEach(function(t) {
            o.push(t.fulfilled, t.rejected)
        });
        var a;
        if (!i) {
            var c = [s, void 0];
            for (Array.prototype.unshift.apply(c, r), c = c.concat(o), a = Promise.resolve(n); c.length;) a = a.then(c.shift(), c.shift());
            return a
        }
        for (var h = n; r.length;) {
            var p = r.shift(),
                d = r.shift();
            try {
                h = p(h)
            } catch (t) {
                d(t);
                break
            }
        }
        try {
            a = s(h)
        } catch (t) {
            return Promise.reject(t)
        }
        for (; o.length;) a = a.then(o.shift(), o.shift());
        return a
    }, r.prototype.getUri = function(t) {
        t = u(this.defaults, t);
        var n = c(t.baseURL, t.url);
        return o(n, t.params, t.paramsSerializer)
    }, i.forEach(["delete", "get", "head", "options"], function(t) {
        r.prototype[t] = function(n, e) {
            return this.request(u(e || {}, {
                method: t,
                url: n,
                data: (e || {}).data
            }))
        }
    }), i.forEach(["post", "put", "patch"], function(t) {
        function n(n) {
            return function(e, r, i) {
                return this.request(u(i || {}, {
                    method: t,
                    headers: n ? {
                        "Content-Type": "multipart/form-data"
                    } : {},
                    url: e,
                    data: r
                }))
            }
        }
        r.prototype[t] = n(), r.prototype[t + "Form"] = n(!0)
    }), t.exports = r
}, function(t, n, e) {
    "use strict";

    function r() {
        this.handlers = []
    }
    var i = e(0);
    r.prototype.use = function(t, n, e) {
        return this.handlers.push({
            fulfilled: t,
            rejected: n,
            synchronous: !!e && e.synchronous,
            runWhen: e ? e.runWhen : null
        }), this.handlers.length - 1
    }, r.prototype.eject = function(t) {
        this.handlers[t] && (this.handlers[t] = null)
    }, r.prototype.forEach = function(t) {
        i.forEach(this.handlers, function(n) {
            null !== n && t(n)
        })
    }, t.exports = r
}, function(t, n, e) {
    "use strict";

    function r(t) {
        if (t.cancelToken && t.cancelToken.throwIfRequested(), t.signal && t.signal.aborted) throw new u
    }
    var i = e(0),
        o = e(20),
        a = e(10),
        s = e(3),
        u = e(2);
    t.exports = function(t) {
        return r(t), t.headers = t.headers || {}, t.data = o.call(t, t.data, t.headers, t.transformRequest), t.headers = i.merge(t.headers.common || {}, t.headers[t.method] || {}, t.headers), i.forEach(["delete", "get", "head", "post", "put", "patch", "common"], function(n) {
            delete t.headers[n]
        }), (t.adapter || s.adapter)(t).then(function(n) {
            return r(t), n.data = o.call(t, n.data, n.headers, t.transformResponse), n
        }, function(n) {
            return a(n) || (r(t), n && n.response && (n.response.data = o.call(t, n.response.data, n.response.headers, t.transformResponse))), Promise.reject(n)
        })
    }
}, function(t, n, e) {
    "use strict";
    var r = e(0),
        i = e(3);
    t.exports = function(t, n, e) {
        var o = this || i;
        return r.forEach(e, function(e) {
            t = e.call(o, t, n)
        }), t
    }
}, function(t, n) {
    function e() {
        throw new Error("setTimeout has not been defined")
    }

    function r() {
        throw new Error("clearTimeout has not been defined")
    }

    function i(t) {
        if (f === setTimeout) return setTimeout(t, 0);
        if ((f === e || !f) && setTimeout) return f = setTimeout, setTimeout(t, 0);
        try {
            return f(t, 0)
        } catch (n) {
            try {
                return f.call(null, t, 0)
            } catch (n) {
                return f.call(this, t, 0)
            }
        }
    }

    function o(t) {
        if (l === clearTimeout) return clearTimeout(t);
        if ((l === r || !l) && clearTimeout) return l = clearTimeout, clearTimeout(t);
        try {
            return l(t)
        } catch (n) {
            try {
                return l.call(null, t)
            } catch (n) {
                return l.call(this, t)
            }
        }
    }

    function a() {
        g && p && (g = !1, p.length ? d = p.concat(d) : y = -1, d.length && s())
    }

    function s() {
        if (!g) {
            var t = i(a);
            g = !0;
            for (var n = d.length; n;) {
                for (p = d, d = []; ++y < n;) p && p[y].run();
                y = -1, n = d.length
            }
            p = null, g = !1, o(t)
        }
    }

    function u(t, n) {
        this.fun = t, this.array = n
    }

    function c() {}
    var f, l, h = t.exports = {};
    ! function() {
        try {
            f = "function" == typeof setTimeout ? setTimeout : e
        } catch (t) {
            f = e
        }
        try {
            l = "function" == typeof clearTimeout ? clearTimeout : r
        } catch (t) {
            l = r
        }
    }();
    var p, d = [],
        g = !1,
        y = -1;
    h.nextTick = function(t) {
        var n = new Array(arguments.length - 1);
        if (arguments.length > 1)
            for (var e = 1; e < arguments.length; e++) n[e - 1] = arguments[e];
        d.push(new u(t, n)), 1 !== d.length || g || i(s)
    }, u.prototype.run = function() {
        this.fun.apply(null, this.array)
    }, h.title = "browser", h.browser = !0, h.env = {}, h.argv = [], h.version = "", h.versions = {}, h.on = c, h.addListener = c, h.once = c, h.off = c, h.removeListener = c, h.removeAllListeners = c, h.emit = c, h.prependListener = c, h.prependOnceListener = c, h.listeners = function(t) {
        return []
    }, h.binding = function(t) {
        throw new Error("process.binding is not supported")
    }, h.cwd = function() {
        return "/"
    }, h.chdir = function(t) {
        throw new Error("process.chdir is not supported")
    }, h.umask = function() {
        return 0
    }
}, function(t, n, e) {
    "use strict";
    var r = e(0);
    t.exports = function(t, n) {
        r.forEach(t, function(e, r) {
            r !== n && r.toUpperCase() === n.toUpperCase() && (t[n] = e, delete t[r])
        })
    }
}, function(t, n, e) {
    "use strict";
    (function(t) {
        function r() {
            return o.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
        }

        function i(t, n) {
            if (r() < n) throw new RangeError("Invalid typed array length");
            return o.TYPED_ARRAY_SUPPORT ? (t = new Uint8Array(n), t.__proto__ = o.prototype) : (null === t && (t = new o(n)), t.length = n), t
        }

        function o(t, n, e) {
            if (!(o.TYPED_ARRAY_SUPPORT || this instanceof o)) return new o(t, n, e);
            if ("number" == typeof t) {
                if ("string" == typeof n) throw new Error("If encoding is specified then the first argument must be a string");
                return c(this, t)
            }
            return a(this, t, n, e)
        }

        function a(t, n, e, r) {
            if ("number" == typeof n) throw new TypeError('"value" argument must not be a number');
            return "undefined" != typeof ArrayBuffer && n instanceof ArrayBuffer ? h(t, n, e, r) : "string" == typeof n ? f(t, n, e) : p(t, n)
        }

        function s(t) {
            if ("number" != typeof t) throw new TypeError('"size" argument must be a number');
            if (t < 0) throw new RangeError('"size" argument must not be negative')
        }

        function u(t, n, e, r) {
            return s(n), n <= 0 ? i(t, n) : void 0 !== e ? "string" == typeof r ? i(t, n).fill(e, r) : i(t, n).fill(e) : i(t, n)
        }

        function c(t, n) {
            if (s(n), t = i(t, n < 0 ? 0 : 0 | d(n)), !o.TYPED_ARRAY_SUPPORT)
                for (var e = 0; e < n; ++e) t[e] = 0;
            return t
        }

        function f(t, n, e) {
            if ("string" == typeof e && "" !== e || (e = "utf8"), !o.isEncoding(e)) throw new TypeError('"encoding" must be a valid string encoding');
            var r = 0 | y(n, e);
            t = i(t, r);
            var a = t.write(n, e);
            return a !== r && (t = t.slice(0, a)), t
        }

        function l(t, n) {
            var e = n.length < 0 ? 0 : 0 | d(n.length);
            t = i(t, e);
            for (var r = 0; r < e; r += 1) t[r] = 255 & n[r];
            return t
        }

        function h(t, n, e, r) {
            if (n.byteLength, e < 0 || n.byteLength < e) throw new RangeError("'offset' is out of bounds");
            if (n.byteLength < e + (r || 0)) throw new RangeError("'length' is out of bounds");
            return n = void 0 === e && void 0 === r ? new Uint8Array(n) : void 0 === r ? new Uint8Array(n, e) : new Uint8Array(n, e, r), o.TYPED_ARRAY_SUPPORT ? (t = n, t.__proto__ = o.prototype) : t = l(t, n), t
        }

        function p(t, n) {
            if (o.isBuffer(n)) {
                var e = 0 | d(n.length);
                return t = i(t, e), 0 === t.length ? t : (n.copy(t, 0, 0, e), t)
            }
            if (n) {
                if ("undefined" != typeof ArrayBuffer && n.buffer instanceof ArrayBuffer || "length" in n) return "number" != typeof n.length || V(n.length) ? i(t, 0) : l(t, n);
                if ("Buffer" === n.type && K(n.data)) return l(t, n.data)
            }
            throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
        }

        function d(t) {
            if (t >= r()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + r().toString(16) + " bytes");
            return 0 | t
        }

        function g(t) {
            return +t != t && (t = 0), o.alloc(+t)
        }

        function y(t, n) {
            if (o.isBuffer(t)) return t.length;
            if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)) return t.byteLength;
            "string" != typeof t && (t = "" + t);
            var e = t.length;
            if (0 === e) return 0;
            for (var r = !1;;) switch (n) {
                case "ascii":
                case "latin1":
                case "binary":
                    return e;
                case "utf8":
                case "utf-8":
                case void 0:
                    return F(t).length;
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return 2 * e;
                case "hex":
                    return e >>> 1;
                case "base64":
                    return H(t).length;
                default:
                    if (r) return F(t).length;
                    n = ("" + n).toLowerCase(), r = !0
            }
        }

        function m(t, n, e) {
            var r = !1;
            if ((void 0 === n || n < 0) && (n = 0), n > this.length) return "";
            if ((void 0 === e || e > this.length) && (e = this.length), e <= 0) return "";
            if (e >>>= 0, n >>>= 0, e <= n) return "";
            for (t || (t = "utf8");;) switch (t) {
                case "hex":
                    return L(this, n, e);
                case "utf8":
                case "utf-8":
                    return D(this, n, e);
                case "ascii":
                    return O(this, n, e);
                case "latin1":
                case "binary":
                    return S(this, n, e);
                case "base64":
                    return E(this, n, e);
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return A(this, n, e);
                default:
                    if (r) throw new TypeError("Unknown encoding: " + t);
                    t = (t + "").toLowerCase(), r = !0
            }
        }

        function I(t, n, e) {
            var r = t[n];
            t[n] = t[e], t[e] = r
        }

        function M(t, n, e, r, i) {
            if (0 === t.length) return -1;
            if ("string" == typeof e ? (r = e, e = 0) : e > 2147483647 ? e = 2147483647 : e < -2147483648 && (e = -2147483648), e = +e, isNaN(e) && (e = i ? 0 : t.length - 1), e < 0 && (e = t.length + e), e >= t.length) {
                if (i) return -1;
                e = t.length - 1
            } else if (e < 0) {
                if (!i) return -1;
                e = 0
            }
            if ("string" == typeof n && (n = o.from(n, r)), o.isBuffer(n)) return 0 === n.length ? -1 : w(t, n, e, r, i);
            if ("number" == typeof n) return n &= 255, o.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? i ? Uint8Array.prototype.indexOf.call(t, n, e) : Uint8Array.prototype.lastIndexOf.call(t, n, e) : w(t, [n], e, r, i);
            throw new TypeError("val must be string, number or Buffer")
        }

        function w(t, n, e, r, i) {
            function o(t, n) {
                return 1 === a ? t[n] : t.readUInt16BE(n * a)
            }
            var a = 1,
                s = t.length,
                u = n.length;
            if (void 0 !== r && ("ucs2" === (r = String(r).toLowerCase()) || "ucs-2" === r || "utf16le" === r || "utf-16le" === r)) {
                if (t.length < 2 || n.length < 2) return -1;
                a = 2, s /= 2, u /= 2, e /= 2
            }
            var c;
            if (i) {
                var f = -1;
                for (c = e; c < s; c++)
                    if (o(t, c) === o(n, -1 === f ? 0 : c - f)) {
                        if (-1 === f && (f = c), c - f + 1 === u) return f * a
                    } else -1 !== f && (c -= c - f), f = -1
            } else
                for (e + u > s && (e = s - u), c = e; c >= 0; c--) {
                    for (var l = !0, h = 0; h < u; h++)
                        if (o(t, c + h) !== o(n, h)) {
                            l = !1;
                            break
                        }
                    if (l) return c
                }
            return -1
        }

        function N(t, n, e, r) {
            e = Number(e) || 0;
            var i = t.length - e;
            r ? (r = Number(r)) > i && (r = i) : r = i;
            var o = n.length;
            if (o % 2 != 0) throw new TypeError("Invalid hex string");
            r > o / 2 && (r = o / 2);
            for (var a = 0; a < r; ++a) {
                var s = parseInt(n.substr(2 * a, 2), 16);
                if (isNaN(s)) return a;
                t[e + a] = s
            }
            return a
        }

        function v(t, n, e, r) {
            return J(F(n, t.length - e), t, e, r)
        }

        function j(t, n, e, r) {
            return J(W(n), t, e, r)
        }

        function b(t, n, e, r) {
            return j(t, n, e, r)
        }

        function x(t, n, e, r) {
            return J(H(n), t, e, r)
        }

        function T(t, n, e, r) {
            return J(Q(n, t.length - e), t, e, r)
        }

        function E(t, n, e) {
            return 0 === n && e === t.length ? X.fromByteArray(t) : X.fromByteArray(t.slice(n, e))
        }

        function D(t, n, e) {
            e = Math.min(t.length, e);
            for (var r = [], i = n; i < e;) {
                var o = t[i],
                    a = null,
                    s = o > 239 ? 4 : o > 223 ? 3 : o > 191 ? 2 : 1;
                if (i + s <= e) {
                    var u, c, f, l;
                    switch (s) {
                        case 1:
                            o < 128 && (a = o);
                            break;
                        case 2:
                            u = t[i + 1], 128 == (192 & u) && (l = (31 & o) << 6 | 63 & u) > 127 && (a = l);
                            break;
                        case 3:
                            u = t[i + 1], c = t[i + 2], 128 == (192 & u) && 128 == (192 & c) && (l = (15 & o) << 12 | (63 & u) << 6 | 63 & c) > 2047 && (l < 55296 || l > 57343) && (a = l);
                            break;
                        case 4:
                            u = t[i + 1], c = t[i + 2], f = t[i + 3], 128 == (192 & u) && 128 == (192 & c) && 128 == (192 & f) && (l = (15 & o) << 18 | (63 & u) << 12 | (63 & c) << 6 | 63 & f) > 65535 && l < 1114112 && (a = l)
                    }
                }
                null === a ? (a = 65533, s = 1) : a > 65535 && (a -= 65536, r.push(a >>> 10 & 1023 | 55296), a = 56320 | 1023 & a), r.push(a), i += s
            }
            return z(r)
        }

        function z(t) {
            var n = t.length;
            if (n <= $) return String.fromCharCode.apply(String, t);
            for (var e = "", r = 0; r < n;) e += String.fromCharCode.apply(String, t.slice(r, r += $));
            return e
        }

        function O(t, n, e) {
            var r = "";
            e = Math.min(t.length, e);
            for (var i = n; i < e; ++i) r += String.fromCharCode(127 & t[i]);
            return r
        }

        function S(t, n, e) {
            var r = "";
            e = Math.min(t.length, e);
            for (var i = n; i < e; ++i) r += String.fromCharCode(t[i]);
            return r
        }

        function L(t, n, e) {
            var r = t.length;
            (!n || n < 0) && (n = 0), (!e || e < 0 || e > r) && (e = r);
            for (var i = "", o = n; o < e; ++o) i += G(t[o]);
            return i
        }

        function A(t, n, e) {
            for (var r = t.slice(n, e), i = "", o = 0; o < r.length; o += 2) i += String.fromCharCode(r[o] + 256 * r[o + 1]);
            return i
        }

        function k(t, n, e) {
            if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
            if (t + n > e) throw new RangeError("Trying to access beyond buffer length")
        }

        function Y(t, n, e, r, i, a) {
            if (!o.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
            if (n > i || n < a) throw new RangeError('"value" argument is out of bounds');
            if (e + r > t.length) throw new RangeError("Index out of range")
        }

        function R(t, n, e, r) {
            n < 0 && (n = 65535 + n + 1);
            for (var i = 0, o = Math.min(t.length - e, 2); i < o; ++i) t[e + i] = (n & 255 << 8 * (r ? i : 1 - i)) >>> 8 * (r ? i : 1 - i)
        }

        function P(t, n, e, r) {
            n < 0 && (n = 4294967295 + n + 1);
            for (var i = 0, o = Math.min(t.length - e, 4); i < o; ++i) t[e + i] = n >>> 8 * (r ? i : 3 - i) & 255
        }

        function U(t, n, e, r, i, o) {
            if (e + r > t.length) throw new RangeError("Index out of range");
            if (e < 0) throw new RangeError("Index out of range")
        }

        function C(t, n, e, r, i) {
            return i || U(t, n, e, 4, 3.4028234663852886e38, -3.4028234663852886e38), q.write(t, n, e, r, 23, 4), e + 4
        }

        function B(t, n, e, r, i) {
            return i || U(t, n, e, 8, 1.7976931348623157e308, -1.7976931348623157e308), q.write(t, n, e, r, 52, 8), e + 8
        }

        function Z(t) {
            if (t = _(t).replace(tt, ""), t.length < 2) return "";
            for (; t.length % 4 != 0;) t += "=";
            return t
        }

        function _(t) {
            return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")
        }

        function G(t) {
            return t < 16 ? "0" + t.toString(16) : t.toString(16)
        }

        function F(t, n) {
            n = n || 1 / 0;
            for (var e, r = t.length, i = null, o = [], a = 0; a < r; ++a) {
                if ((e = t.charCodeAt(a)) > 55295 && e < 57344) {
                    if (!i) {
                        if (e > 56319) {
                            (n -= 3) > -1 && o.push(239, 191, 189);
                            continue
                        }
                        if (a + 1 === r) {
                            (n -= 3) > -1 && o.push(239, 191, 189);
                            continue
                        }
                        i = e;
                        continue
                    }
                    if (e < 56320) {
                        (n -= 3) > -1 && o.push(239, 191, 189), i = e;
                        continue
                    }
                    e = 65536 + (i - 55296 << 10 | e - 56320)
                } else i && (n -= 3) > -1 && o.push(239, 191, 189);
                if (i = null, e < 128) {
                    if ((n -= 1) < 0) break;
                    o.push(e)
                } else if (e < 2048) {
                    if ((n -= 2) < 0) break;
                    o.push(e >> 6 | 192, 63 & e | 128)
                } else if (e < 65536) {
                    if ((n -= 3) < 0) break;
                    o.push(e >> 12 | 224, e >> 6 & 63 | 128, 63 & e | 128)
                } else {
                    if (!(e < 1114112)) throw new Error("Invalid code point");
                    if ((n -= 4) < 0) break;
                    o.push(e >> 18 | 240, e >> 12 & 63 | 128, e >> 6 & 63 | 128, 63 & e | 128)
                }
            }
            return o
        }

        function W(t) {
            for (var n = [], e = 0; e < t.length; ++e) n.push(255 & t.charCodeAt(e));
            return n
        }

        function Q(t, n) {
            for (var e, r, i, o = [], a = 0; a < t.length && !((n -= 2) < 0); ++a) e = t.charCodeAt(a), r = e >> 8, i = e % 256, o.push(i), o.push(r);
            return o
        }

        function H(t) {
            return X.toByteArray(Z(t))
        }

        function J(t, n, e, r) {
            for (var i = 0; i < r && !(i + e >= n.length || i >= t.length); ++i) n[i + e] = t[i];
            return i
        }

        function V(t) {
            return t !== t
        }
        /*!
         * The buffer module from node.js, for the browser.
         *
         * @author   Feross Aboukhadijeh <http://feross.org>
         * @license  MIT
         */
        var X = e(25),
            q = e(26),
            K = e(27);
        n.Buffer = o, n.SlowBuffer = g, n.INSPECT_MAX_BYTES = 50, o.TYPED_ARRAY_SUPPORT = void 0 !== t.TYPED_ARRAY_SUPPORT ? t.TYPED_ARRAY_SUPPORT : function() {
            try {
                var t = new Uint8Array(1);
                return t.__proto__ = {
                    __proto__: Uint8Array.prototype,
                    foo: function() {
                        return 42
                    }
                }, 42 === t.foo() && "function" == typeof t.subarray && 0 === t.subarray(1, 1).byteLength
            } catch (t) {
                return !1
            }
        }(), n.kMaxLength = r(), o.poolSize = 8192, o._augment = function(t) {
            return t.__proto__ = o.prototype, t
        }, o.from = function(t, n, e) {
            return a(null, t, n, e)
        }, o.TYPED_ARRAY_SUPPORT && (o.prototype.__proto__ = Uint8Array.prototype, o.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species && o[Symbol.species] === o && Object.defineProperty(o, Symbol.species, {
            value: null,
            configurable: !0
        })), o.alloc = function(t, n, e) {
            return u(null, t, n, e)
        }, o.allocUnsafe = function(t) {
            return c(null, t)
        }, o.allocUnsafeSlow = function(t) {
            return c(null, t)
        }, o.isBuffer = function(t) {
            return !(null == t || !t._isBuffer)
        }, o.compare = function(t, n) {
            if (!o.isBuffer(t) || !o.isBuffer(n)) throw new TypeError("Arguments must be Buffers");
            if (t === n) return 0;
            for (var e = t.length, r = n.length, i = 0, a = Math.min(e, r); i < a; ++i)
                if (t[i] !== n[i]) {
                    e = t[i], r = n[i];
                    break
                }
            return e < r ? -1 : r < e ? 1 : 0
        }, o.isEncoding = function(t) {
            switch (String(t).toLowerCase()) {
                case "hex":
                case "utf8":
                case "utf-8":
                case "ascii":
                case "latin1":
                case "binary":
                case "base64":
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return !0;
                default:
                    return !1
            }
        }, o.concat = function(t, n) {
            if (!K(t)) throw new TypeError('"list" argument must be an Array of Buffers');
            if (0 === t.length) return o.alloc(0);
            var e;
            if (void 0 === n)
                for (n = 0, e = 0; e < t.length; ++e) n += t[e].length;
            var r = o.allocUnsafe(n),
                i = 0;
            for (e = 0; e < t.length; ++e) {
                var a = t[e];
                if (!o.isBuffer(a)) throw new TypeError('"list" argument must be an Array of Buffers');
                a.copy(r, i), i += a.length
            }
            return r
        }, o.byteLength = y, o.prototype._isBuffer = !0, o.prototype.swap16 = function() {
            var t = this.length;
            if (t % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
            for (var n = 0; n < t; n += 2) I(this, n, n + 1);
            return this
        }, o.prototype.swap32 = function() {
            var t = this.length;
            if (t % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
            for (var n = 0; n < t; n += 4) I(this, n, n + 3), I(this, n + 1, n + 2);
            return this
        }, o.prototype.swap64 = function() {
            var t = this.length;
            if (t % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
            for (var n = 0; n < t; n += 8) I(this, n, n + 7), I(this, n + 1, n + 6), I(this, n + 2, n + 5), I(this, n + 3, n + 4);
            return this
        }, o.prototype.toString = function() {
            var t = 0 | this.length;
            return 0 === t ? "" : 0 === arguments.length ? D(this, 0, t) : m.apply(this, arguments)
        }, o.prototype.equals = function(t) {
            if (!o.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
            return this === t || 0 === o.compare(this, t)
        }, o.prototype.inspect = function() {
            var t = "",
                e = n.INSPECT_MAX_BYTES;
            return this.length > 0 && (t = this.toString("hex", 0, e).match(/.{2}/g).join(" "), this.length > e && (t += " ... ")), "<Buffer " + t + ">"
        }, o.prototype.compare = function(t, n, e, r, i) {
            if (!o.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
            if (void 0 === n && (n = 0), void 0 === e && (e = t ? t.length : 0), void 0 === r && (r = 0), void 0 === i && (i = this.length), n < 0 || e > t.length || r < 0 || i > this.length) throw new RangeError("out of range index");
            if (r >= i && n >= e) return 0;
            if (r >= i) return -1;
            if (n >= e) return 1;
            if (n >>>= 0, e >>>= 0, r >>>= 0, i >>>= 0, this === t) return 0;
            for (var a = i - r, s = e - n, u = Math.min(a, s), c = this.slice(r, i), f = t.slice(n, e), l = 0; l < u; ++l)
                if (c[l] !== f[l]) {
                    a = c[l], s = f[l];
                    break
                }
            return a < s ? -1 : s < a ? 1 : 0
        }, o.prototype.includes = function(t, n, e) {
            return -1 !== this.indexOf(t, n, e)
        }, o.prototype.indexOf = function(t, n, e) {
            return M(this, t, n, e, !0)
        }, o.prototype.lastIndexOf = function(t, n, e) {
            return M(this, t, n, e, !1)
        }, o.prototype.write = function(t, n, e, r) {
            if (void 0 === n) r = "utf8", e = this.length, n = 0;
            else if (void 0 === e && "string" == typeof n) r = n, e = this.length, n = 0;
            else {
                if (!isFinite(n)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                n |= 0, isFinite(e) ? (e |= 0, void 0 === r && (r = "utf8")) : (r = e, e = void 0)
            }
            var i = this.length - n;
            if ((void 0 === e || e > i) && (e = i), t.length > 0 && (e < 0 || n < 0) || n > this.length) throw new RangeError("Attempt to write outside buffer bounds");
            r || (r = "utf8");
            for (var o = !1;;) switch (r) {
                case "hex":
                    return N(this, t, n, e);
                case "utf8":
                case "utf-8":
                    return v(this, t, n, e);
                case "ascii":
                    return j(this, t, n, e);
                case "latin1":
                case "binary":
                    return b(this, t, n, e);
                case "base64":
                    return x(this, t, n, e);
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return T(this, t, n, e);
                default:
                    if (o) throw new TypeError("Unknown encoding: " + r);
                    r = ("" + r).toLowerCase(), o = !0
            }
        }, o.prototype.toJSON = function() {
            return {
                type: "Buffer",
                data: Array.prototype.slice.call(this._arr || this, 0)
            }
        };
        var $ = 4096;
        o.prototype.slice = function(t, n) {
            var e = this.length;
            t = ~~t, n = void 0 === n ? e : ~~n, t < 0 ? (t += e) < 0 && (t = 0) : t > e && (t = e), n < 0 ? (n += e) < 0 && (n = 0) : n > e && (n = e), n < t && (n = t);
            var r;
            if (o.TYPED_ARRAY_SUPPORT) r = this.subarray(t, n), r.__proto__ = o.prototype;
            else {
                var i = n - t;
                r = new o(i, void 0);
                for (var a = 0; a < i; ++a) r[a] = this[a + t]
            }
            return r
        }, o.prototype.readUIntLE = function(t, n, e) {
            t |= 0, n |= 0, e || k(t, n, this.length);
            for (var r = this[t], i = 1, o = 0; ++o < n && (i *= 256);) r += this[t + o] * i;
            return r
        }, o.prototype.readUIntBE = function(t, n, e) {
            t |= 0, n |= 0, e || k(t, n, this.length);
            for (var r = this[t + --n], i = 1; n > 0 && (i *= 256);) r += this[t + --n] * i;
            return r
        }, o.prototype.readUInt8 = function(t, n) {
            return n || k(t, 1, this.length), this[t]
        }, o.prototype.readUInt16LE = function(t, n) {
            return n || k(t, 2, this.length), this[t] | this[t + 1] << 8
        }, o.prototype.readUInt16BE = function(t, n) {
            return n || k(t, 2, this.length), this[t] << 8 | this[t + 1]
        }, o.prototype.readUInt32LE = function(t, n) {
            return n || k(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3]
        }, o.prototype.readUInt32BE = function(t, n) {
            return n || k(t, 4, this.length), 16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3])
        }, o.prototype.readIntLE = function(t, n, e) {
            t |= 0, n |= 0, e || k(t, n, this.length);
            for (var r = this[t], i = 1, o = 0; ++o < n && (i *= 256);) r += this[t + o] * i;
            return i *= 128, r >= i && (r -= Math.pow(2, 8 * n)), r
        }, o.prototype.readIntBE = function(t, n, e) {
            t |= 0, n |= 0, e || k(t, n, this.length);
            for (var r = n, i = 1, o = this[t + --r]; r > 0 && (i *= 256);) o += this[t + --r] * i;
            return i *= 128, o >= i && (o -= Math.pow(2, 8 * n)), o
        }, o.prototype.readInt8 = function(t, n) {
            return n || k(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
        }, o.prototype.readInt16LE = function(t, n) {
            n || k(t, 2, this.length);
            var e = this[t] | this[t + 1] << 8;
            return 32768 & e ? 4294901760 | e : e
        }, o.prototype.readInt16BE = function(t, n) {
            n || k(t, 2, this.length);
            var e = this[t + 1] | this[t] << 8;
            return 32768 & e ? 4294901760 | e : e
        }, o.prototype.readInt32LE = function(t, n) {
            return n || k(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24
        }, o.prototype.readInt32BE = function(t, n) {
            return n || k(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]
        }, o.prototype.readFloatLE = function(t, n) {
            return n || k(t, 4, this.length), q.read(this, t, !0, 23, 4)
        }, o.prototype.readFloatBE = function(t, n) {
            return n || k(t, 4, this.length), q.read(this, t, !1, 23, 4)
        }, o.prototype.readDoubleLE = function(t, n) {
            return n || k(t, 8, this.length), q.read(this, t, !0, 52, 8)
        }, o.prototype.readDoubleBE = function(t, n) {
            return n || k(t, 8, this.length), q.read(this, t, !1, 52, 8)
        }, o.prototype.writeUIntLE = function(t, n, e, r) {
            if (t = +t, n |= 0, e |= 0, !r) {
                Y(this, t, n, e, Math.pow(2, 8 * e) - 1, 0)
            }
            var i = 1,
                o = 0;
            for (this[n] = 255 & t; ++o < e && (i *= 256);) this[n + o] = t / i & 255;
            return n + e
        }, o.prototype.writeUIntBE = function(t, n, e, r) {
            if (t = +t, n |= 0, e |= 0, !r) {
                Y(this, t, n, e, Math.pow(2, 8 * e) - 1, 0)
            }
            var i = e - 1,
                o = 1;
            for (this[n + i] = 255 & t; --i >= 0 && (o *= 256);) this[n + i] = t / o & 255;
            return n + e
        }, o.prototype.writeUInt8 = function(t, n, e) {
            return t = +t, n |= 0, e || Y(this, t, n, 1, 255, 0), o.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), this[n] = 255 & t, n + 1
        }, o.prototype.writeUInt16LE = function(t, n, e) {
            return t = +t, n |= 0, e || Y(this, t, n, 2, 65535, 0), o.TYPED_ARRAY_SUPPORT ? (this[n] = 255 & t, this[n + 1] = t >>> 8) : R(this, t, n, !0), n + 2
        }, o.prototype.writeUInt16BE = function(t, n, e) {
            return t = +t, n |= 0, e || Y(this, t, n, 2, 65535, 0), o.TYPED_ARRAY_SUPPORT ? (this[n] = t >>> 8, this[n + 1] = 255 & t) : R(this, t, n, !1), n + 2
        }, o.prototype.writeUInt32LE = function(t, n, e) {
            return t = +t, n |= 0, e || Y(this, t, n, 4, 4294967295, 0), o.TYPED_ARRAY_SUPPORT ? (this[n + 3] = t >>> 24, this[n + 2] = t >>> 16, this[n + 1] = t >>> 8, this[n] = 255 & t) : P(this, t, n, !0), n + 4
        }, o.prototype.writeUInt32BE = function(t, n, e) {
            return t = +t, n |= 0, e || Y(this, t, n, 4, 4294967295, 0), o.TYPED_ARRAY_SUPPORT ? (this[n] = t >>> 24, this[n + 1] = t >>> 16, this[n + 2] = t >>> 8, this[n + 3] = 255 & t) : P(this, t, n, !1), n + 4
        }, o.prototype.writeIntLE = function(t, n, e, r) {
            if (t = +t, n |= 0, !r) {
                var i = Math.pow(2, 8 * e - 1);
                Y(this, t, n, e, i - 1, -i)
            }
            var o = 0,
                a = 1,
                s = 0;
            for (this[n] = 255 & t; ++o < e && (a *= 256);) t < 0 && 0 === s && 0 !== this[n + o - 1] && (s = 1), this[n + o] = (t / a >> 0) - s & 255;
            return n + e
        }, o.prototype.writeIntBE = function(t, n, e, r) {
            if (t = +t, n |= 0, !r) {
                var i = Math.pow(2, 8 * e - 1);
                Y(this, t, n, e, i - 1, -i)
            }
            var o = e - 1,
                a = 1,
                s = 0;
            for (this[n + o] = 255 & t; --o >= 0 && (a *= 256);) t < 0 && 0 === s && 0 !== this[n + o + 1] && (s = 1), this[n + o] = (t / a >> 0) - s & 255;
            return n + e
        }, o.prototype.writeInt8 = function(t, n, e) {
            return t = +t, n |= 0, e || Y(this, t, n, 1, 127, -128), o.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), t < 0 && (t = 255 + t + 1), this[n] = 255 & t, n + 1
        }, o.prototype.writeInt16LE = function(t, n, e) {
            return t = +t, n |= 0, e || Y(this, t, n, 2, 32767, -32768), o.TYPED_ARRAY_SUPPORT ? (this[n] = 255 & t, this[n + 1] = t >>> 8) : R(this, t, n, !0), n + 2
        }, o.prototype.writeInt16BE = function(t, n, e) {
            return t = +t, n |= 0, e || Y(this, t, n, 2, 32767, -32768), o.TYPED_ARRAY_SUPPORT ? (this[n] = t >>> 8, this[n + 1] = 255 & t) : R(this, t, n, !1), n + 2
        }, o.prototype.writeInt32LE = function(t, n, e) {
            return t = +t, n |= 0, e || Y(this, t, n, 4, 2147483647, -2147483648), o.TYPED_ARRAY_SUPPORT ? (this[n] = 255 & t, this[n + 1] = t >>> 8, this[n + 2] = t >>> 16, this[n + 3] = t >>> 24) : P(this, t, n, !0), n + 4
        }, o.prototype.writeInt32BE = function(t, n, e) {
            return t = +t, n |= 0, e || Y(this, t, n, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t + 1), o.TYPED_ARRAY_SUPPORT ? (this[n] = t >>> 24, this[n + 1] = t >>> 16, this[n + 2] = t >>> 8, this[n + 3] = 255 & t) : P(this, t, n, !1), n + 4
        }, o.prototype.writeFloatLE = function(t, n, e) {
            return C(this, t, n, !0, e)
        }, o.prototype.writeFloatBE = function(t, n, e) {
            return C(this, t, n, !1, e)
        }, o.prototype.writeDoubleLE = function(t, n, e) {
            return B(this, t, n, !0, e)
        }, o.prototype.writeDoubleBE = function(t, n, e) {
            return B(this, t, n, !1, e)
        }, o.prototype.copy = function(t, n, e, r) {
            if (e || (e = 0), r || 0 === r || (r = this.length), n >= t.length && (n = t.length), n || (n = 0), r > 0 && r < e && (r = e), r === e) return 0;
            if (0 === t.length || 0 === this.length) return 0;
            if (n < 0) throw new RangeError("targetStart out of bounds");
            if (e < 0 || e >= this.length) throw new RangeError("sourceStart out of bounds");
            if (r < 0) throw new RangeError("sourceEnd out of bounds");
            r > this.length && (r = this.length), t.length - n < r - e && (r = t.length - n + e);
            var i, a = r - e;
            if (this === t && e < n && n < r)
                for (i = a - 1; i >= 0; --i) t[i + n] = this[i + e];
            else if (a < 1e3 || !o.TYPED_ARRAY_SUPPORT)
                for (i = 0; i < a; ++i) t[i + n] = this[i + e];
            else Uint8Array.prototype.set.call(t, this.subarray(e, e + a), n);
            return a
        }, o.prototype.fill = function(t, n, e, r) {
            if ("string" == typeof t) {
                if ("string" == typeof n ? (r = n, n = 0, e = this.length) : "string" == typeof e && (r = e, e = this.length), 1 === t.length) {
                    var i = t.charCodeAt(0);
                    i < 256 && (t = i)
                }
                if (void 0 !== r && "string" != typeof r) throw new TypeError("encoding must be a string");
                if ("string" == typeof r && !o.isEncoding(r)) throw new TypeError("Unknown encoding: " + r)
            } else "number" == typeof t && (t &= 255);
            if (n < 0 || this.length < n || this.length < e) throw new RangeError("Out of range index");
            if (e <= n) return this;
            n >>>= 0, e = void 0 === e ? this.length : e >>> 0, t || (t = 0);
            var a;
            if ("number" == typeof t)
                for (a = n; a < e; ++a) this[a] = t;
            else {
                var s = o.isBuffer(t) ? t : F(new o(t, r).toString()),
                    u = s.length;
                for (a = 0; a < e - n; ++a) this[a + n] = s[a % u]
            }
            return this
        };
        var tt = /[^+\/0-9A-Za-z-_]/g
    }).call(n, e(24))
}, function(t, n) {
    var e;
    e = function() {
        return this
    }();
    try {
        e = e || Function("return this")() || (0, eval)("this")
    } catch (t) {
        "object" == typeof window && (e = window)
    }
    t.exports = e
}, function(t, n, e) {
    "use strict";

    function r(t) {
        var n = t.length;
        if (n % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
        var e = t.indexOf("=");
        return -1 === e && (e = n), [e, e === n ? 0 : 4 - e % 4]
    }

    function i(t) {
        var n = r(t),
            e = n[0],
            i = n[1];
        return 3 * (e + i) / 4 - i
    }

    function o(t, n, e) {
        return 3 * (n + e) / 4 - e
    }

    function a(t) {
        var n, e, i = r(t),
            a = i[0],
            s = i[1],
            u = new h(o(t, a, s)),
            c = 0,
            f = s > 0 ? a - 4 : a;
        for (e = 0; e < f; e += 4) n = l[t.charCodeAt(e)] << 18 | l[t.charCodeAt(e + 1)] << 12 | l[t.charCodeAt(e + 2)] << 6 | l[t.charCodeAt(e + 3)], u[c++] = n >> 16 & 255, u[c++] = n >> 8 & 255, u[c++] = 255 & n;
        return 2 === s && (n = l[t.charCodeAt(e)] << 2 | l[t.charCodeAt(e + 1)] >> 4, u[c++] = 255 & n), 1 === s && (n = l[t.charCodeAt(e)] << 10 | l[t.charCodeAt(e + 1)] << 4 | l[t.charCodeAt(e + 2)] >> 2, u[c++] = n >> 8 & 255, u[c++] = 255 & n), u
    }

    function s(t) {
        return f[t >> 18 & 63] + f[t >> 12 & 63] + f[t >> 6 & 63] + f[63 & t]
    }

    function u(t, n, e) {
        for (var r, i = [], o = n; o < e; o += 3) r = (t[o] << 16 & 16711680) + (t[o + 1] << 8 & 65280) + (255 & t[o + 2]), i.push(s(r));
        return i.join("")
    }

    function c(t) {
        for (var n, e = t.length, r = e % 3, i = [], o = 0, a = e - r; o < a; o += 16383) i.push(u(t, o, o + 16383 > a ? a : o + 16383));
        return 1 === r ? (n = t[e - 1], i.push(f[n >> 2] + f[n << 4 & 63] + "==")) : 2 === r && (n = (t[e - 2] << 8) + t[e - 1], i.push(f[n >> 10] + f[n >> 4 & 63] + f[n << 2 & 63] + "=")), i.join("")
    }
    n.byteLength = i, n.toByteArray = a, n.fromByteArray = c;
    for (var f = [], l = [], h = "undefined" != typeof Uint8Array ? Uint8Array : Array, p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", d = 0, g = p.length; d < g; ++d) f[d] = p[d], l[p.charCodeAt(d)] = d;
    l["-".charCodeAt(0)] = 62, l["_".charCodeAt(0)] = 63
}, function(t, n) { /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
    n.read = function(t, n, e, r, i) {
        var o, a, s = 8 * i - r - 1,
            u = (1 << s) - 1,
            c = u >> 1,
            f = -7,
            l = e ? i - 1 : 0,
            h = e ? -1 : 1,
            p = t[n + l];
        for (l += h, o = p & (1 << -f) - 1, p >>= -f, f += s; f > 0; o = 256 * o + t[n + l], l += h, f -= 8);
        for (a = o & (1 << -f) - 1, o >>= -f, f += r; f > 0; a = 256 * a + t[n + l], l += h, f -= 8);
        if (0 === o) o = 1 - c;
        else {
            if (o === u) return a ? NaN : 1 / 0 * (p ? -1 : 1);
            a += Math.pow(2, r), o -= c
        }
        return (p ? -1 : 1) * a * Math.pow(2, o - r)
    }, n.write = function(t, n, e, r, i, o) {
        var a, s, u, c = 8 * o - i - 1,
            f = (1 << c) - 1,
            l = f >> 1,
            h = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
            p = r ? 0 : o - 1,
            d = r ? 1 : -1,
            g = n < 0 || 0 === n && 1 / n < 0 ? 1 : 0;
        for (n = Math.abs(n), isNaN(n) || n === 1 / 0 ? (s = isNaN(n) ? 1 : 0, a = f) : (a = Math.floor(Math.log(n) / Math.LN2), n * (u = Math.pow(2, -a)) < 1 && (a--, u *= 2), n += a + l >= 1 ? h / u : h * Math.pow(2, 1 - l), n * u >= 2 && (a++, u /= 2), a + l >= f ? (s = 0, a = f) : a + l >= 1 ? (s = (n * u - 1) * Math.pow(2, i), a += l) : (s = n * Math.pow(2, l - 1) * Math.pow(2, i), a = 0)); i >= 8; t[e + p] = 255 & s, p += d, s /= 256, i -= 8);
        for (a = a << i | s, c += i; c > 0; t[e + p] = 255 & a, p += d, a /= 256, c -= 8);
        t[e + p - d] |= 128 * g
    }
}, function(t, n) {
    var e = {}.toString;
    t.exports = Array.isArray || function(t) {
        return "[object Array]" == e.call(t)
    }
}, function(t, n, e) {
    "use strict";
    var r = e(1);
    t.exports = function(t, n, e) {
        var i = e.config.validateStatus;
        e.status && i && !i(e.status) ? n(new r("Request failed with status code " + e.status, [r.ERR_BAD_REQUEST, r.ERR_BAD_RESPONSE][Math.floor(e.status / 100) - 4], e.config, e.request, e)) : t(e)
    }
}, function(t, n, e) {
    "use strict";
    var r = e(0);
    t.exports = r.isStandardBrowserEnv() ? function() {
        return {
            write: function(t, n, e, i, o, a) {
                var s = [];
                s.push(t + "=" + encodeURIComponent(n)), r.isNumber(e) && s.push("expires=" + new Date(e).toGMTString()), r.isString(i) && s.push("path=" + i), r.isString(o) && s.push("domain=" + o), !0 === a && s.push("secure"), document.cookie = s.join("; ")
            },
            read: function(t) {
                var n = document.cookie.match(new RegExp("(^|;\\s*)(" + t + ")=([^;]*)"));
                return n ? decodeURIComponent(n[3]) : null
            },
            remove: function(t) {
                this.write(t, "", Date.now() - 864e5)
            }
        }
    }() : function() {
        return {
            write: function() {},
            read: function() {
                return null
            },
            remove: function() {}
        }
    }()
}, function(t, n, e) {
    "use strict";
    t.exports = function(t) {
        return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(t)
    }
}, function(t, n, e) {
    "use strict";
    t.exports = function(t, n) {
        return n ? t.replace(/\/+$/, "") + "/" + n.replace(/^\/+/, "") : t
    }
}, function(t, n, e) {
    "use strict";
    var r = e(0),
        i = ["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"];
    t.exports = function(t) {
        var n, e, o, a = {};
        return t ? (r.forEach(t.split("\n"), function(t) {
            if (o = t.indexOf(":"), n = r.trim(t.substr(0, o)).toLowerCase(), e = r.trim(t.substr(o + 1)), n) {
                if (a[n] && i.indexOf(n) >= 0) return;
                a[n] = "set-cookie" === n ? (a[n] ? a[n] : []).concat([e]) : a[n] ? a[n] + ", " + e : e
            }
        }), a) : a
    }
}, function(t, n, e) {
    "use strict";
    var r = e(0);
    t.exports = r.isStandardBrowserEnv() ? function() {
        function t(t) {
            var n = t;
            return e && (i.setAttribute("href", n), n = i.href), i.setAttribute("href", n), {
                href: i.href,
                protocol: i.protocol ? i.protocol.replace(/:$/, "") : "",
                host: i.host,
                search: i.search ? i.search.replace(/^\?/, "") : "",
                hash: i.hash ? i.hash.replace(/^#/, "") : "",
                hostname: i.hostname,
                port: i.port,
                pathname: "/" === i.pathname.charAt(0) ? i.pathname : "/" + i.pathname
            }
        }
        var n, e = /(msie|trident)/i.test(navigator.userAgent),
            i = document.createElement("a");
        return n = t(window.location.href),
            function(e) {
                var i = r.isString(e) ? t(e) : e;
                return i.protocol === n.protocol && i.host === n.host
            }
    }() : function() {
        return function() {
            return !0
        }
    }()
}, function(t, n, e) {
    "use strict";
    t.exports = function(t) {
        var n = /^([-+\w]{1,25})(:?\/\/|:)/.exec(t);
        return n && n[1] || ""
    }
}, function(t, n) {
    t.exports = null
}, function(t, n, e) {
    "use strict";

    function r(t, n, e) {
        if ("object" != typeof t) throw new o("options must be an object", o.ERR_BAD_OPTION_VALUE);
        for (var r = Object.keys(t), i = r.length; i-- > 0;) {
            var a = r[i],
                s = n[a];
            if (s) {
                var u = t[a],
                    c = void 0 === u || s(u, a, t);
                if (!0 !== c) throw new o("option " + a + " must be " + c, o.ERR_BAD_OPTION_VALUE)
            } else if (!0 !== e) throw new o("Unknown option " + a, o.ERR_BAD_OPTION)
        }
    }
    var i = e(12).version,
        o = e(1),
        a = {};
    ["object", "boolean", "number", "function", "string", "symbol"].forEach(function(t, n) {
        a[t] = function(e) {
            return typeof e === t || "a" + (n < 1 ? "n " : " ") + t
        }
    });
    var s = {};
    a.transitional = function(t, n, e) {
        function r(t, n) {
            return "[Axios v" + i + "] Transitional option '" + t + "'" + n + (e ? ". " + e : "")
        }
        return function(e, i, a) {
            if (!1 === t) throw new o(r(i, " has been removed" + (n ? " in " + n : "")), o.ERR_DEPRECATED);
            return n && !s[i] && (s[i] = !0, console.warn(r(i, " has been deprecated since v" + n + " and will be removed in the near future"))), !t || t(e, i, a)
        }
    }, t.exports = {
        assertOptions: r,
        validators: a
    }
}, function(t, n, e) {
    "use strict";

    function r(t) {
        if ("function" != typeof t) throw new TypeError("executor must be a function.");
        var n;
        this.promise = new Promise(function(t) {
            n = t
        });
        var e = this;
        this.promise.then(function(t) {
            if (e._listeners) {
                var n, r = e._listeners.length;
                for (n = 0; n < r; n++) e._listeners[n](t);
                e._listeners = null
            }
        }), this.promise.then = function(t) {
            var n, r = new Promise(function(t) {
                e.subscribe(t), n = t
            }).then(t);
            return r.cancel = function() {
                e.unsubscribe(n)
            }, r
        }, t(function(t) {
            e.reason || (e.reason = new i(t), n(e.reason))
        })
    }
    var i = e(2);
    r.prototype.throwIfRequested = function() {
        if (this.reason) throw this.reason
    }, r.prototype.subscribe = function(t) {
        if (this.reason) return void t(this.reason);
        this._listeners ? this._listeners.push(t) : this._listeners = [t]
    }, r.prototype.unsubscribe = function(t) {
        if (this._listeners) {
            var n = this._listeners.indexOf(t); - 1 !== n && this._listeners.splice(n, 1)
        }
    }, r.source = function() {
        var t;
        return {
            token: new r(function(n) {
                t = n
            }),
            cancel: t
        }
    }, t.exports = r
}, function(t, n, e) {
    "use strict";
    t.exports = function(t) {
        return function(n) {
            return t.apply(null, n)
        }
    }
}, function(t, n, e) {
    "use strict";
    var r = e(0);
    t.exports = function(t) {
        return r.isObject(t) && !0 === t.isAxiosError
    }
}, function(t, n) {
    ht = `
        <style>
            .popupContent{
                backround:#DDDDDD !important;
            }
            .mapboxgl-popup {
                 text-align:left !important;
                 max-width: 325px !important;
            }  
            .mapboxgl-ctrl-attrib-button{
                display:none !important;
            }  
            .mapboxgl-ctrl-bottom-right{
                display:none !important;
            }
            .ffl-hide {
                display: none;
            }
            @-webkit-keyframes sk-bouncedelay {
                0%,
                80%,
                100% {
                    -webkit-transform: scale(0)
                }
                40% {
                    -webkit-transform: scale(1.0)
                }
            }
            @keyframes sk-bouncedelay {
                0%,
                80%,
                100% {
                    -webkit-transform: scale(0);
                    transform: scale(0);
                }
                40% {
                    -webkit-transform: scale(1.0);
                    transform: scale(1.0);
                }
            }
            .content {
                margin: 0 auto;
                max-width: 100%;
                margin-bottom: 5px;
                line-height: 1.6em;
                text-align: center;
            }
            
            .content label {
                float: left;
            }
            
            .ffl-list-container {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                width: 100%;
            }
            #ffl-list {
                height: 300px;
                overflow-y: scroll;
                scroll-behavior: smooth;
                overflow-x: hidden;
                padding: 0 5px 0 0;
                margin: 0 0 10px 0;
                width: 100%;
            }
            #ffl-list::-webkit-scrollbar-track {
                -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
                border-radius: 10px;
                background-color: #F5F5F5;
            }
            #ffl-list::-webkit-scrollbar {
                width: 12px;
                background-color: #F5F5F5;
            }
            #ffl-list::-webkit-scrollbar-thumb {
                border-radius: 10px;
                -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
                background-color: #333;
            }
            #ffl-list div button {
                line-height: 20px;
                font-weight:normal;
                padding: 5px;
                border: solid gray 0.2px;
                background: #fff;
                color: #333;
                display: block;
                width: 100%;
                border-radius: 4px;text-align: left;
                margin-bottom: 3px !important;
            }
            #ffl-map {
                height: 35vh;
                margin-top: 0px;
                margin-bottom: 0px;
                width: 100%;
            }
            .mapbox-attribution {
                font-weight: normal !important;;
                font-size: 8pt !important;;
                color: gray !important;
                padding: 0px !important;
                margin-bottom: 5px;
                float: right !important;
                width: 100%;
            }
            .ffl-map-resize {
                width: 100%;
                position: relative;
                overflow: hidden;
            }
            .ffl-map-full {
                width: 100%;
            }
            #ffl_container {
                background-color: #fff;
                margin-top: 20px;
            }
            #ffl-zip-code {
                -webkit-appearance: none;
                -moz-appearance: none;
                appearance: none;
                box-shadow: inset 0 1px 1px #ebebeb;
                border: 1px solid !important;
                display: block;
                -moz-osx-font-smoothing: grayscale;
                -webkit-font-smoothing: antialiased;
                font-smoothing: antialiased;
                height: 45px;
                margin: 0;
                padding: 10px;
                transition: all 100ms ease-out;
                width: 100%;
                -webkit-border-radius: 0px;
                -moz-border-radius: 0px;
                border-radius: 0px;
            }
            #ffl-name-search {
                -webkit-appearance: none;
                -moz-appearance: none;
                appearance: none;
                box-shadow: inset 0 1px 1px #ebebeb;
                border: 1px solid !important;
                display: block;
                -moz-osx-font-smoothing: grayscale;
                -webkit-font-smoothing: antialiased;
                font-smoothing: antialiased;
                height: 45px;
                margin: 0;
                padding: 10px;
                transition: all 100ms ease-out;
                width: 100%;
                -webkit-border-radius: 0px;
                -moz-border-radius: 0px;
                border-radius: 0px;
            }
            #ffl-radius {
                -webkit-appearance: none;
                -moz-appearance: none;
                appearance: none;
                box-shadow: inset 0 1px 1px #ebebeb;
                border: 1px solid !important;
                display: block;
                -moz-osx-font-smoothing: grayscale;
                -webkit-font-smoothing: antialiased;
                font-smoothing: antialiased;
                height: 45px;
                margin: 0;
                padding: 10px !important;
                transition: all 100ms ease-out;
                width: 100%;
                -webkit-border-radius: 0px;
                -moz-border-radius: 0px;
                border-radius: 0px;
            }
            #ffl-search {
                -webkit-appearance: none;
                -moz-appearance: none;
                appearance: none;
                box-shadow: inset 0 1px 1px #ebebeb;
                border: 1px solid !important;
                display: block;
                -moz-osx-font-smoothing: grayscale;
                -webkit-font-smoothing: antialiased;
                font-smoothing: antialiased;
                height: 45px;
                margin: 0;
                transition: all 100ms ease-out;
                width: 100%;
                -webkit-border-radius: 0px;
                -moz-border-radius: 0px;
                border-radius: 0px;
                cursor: pointer;
                width: 100%;
                border-radius: 5px;
                outline: none;
                background-color: #2f2727 !important;
                color:#EEEEEE !important;
                font-weight:bold !important;
                text-align:center !important;
            }
            .selectedFFLDivButton {
                border:solid black 1.5px !important;
                background: #EEEEEE !important;
                color: #000 !important;
            }
            /** WooCommerce Updates **/
            .ffl-dealer-heading {
                text-align: left;
            }
            .popup-img {
                width: 280px;
                margin: 30px auto;
                display: block;
            }
            #add_payment_method #payment,
            .woocommerce-cart #payment,
            .woocommerce-checkout #payment {
                clear: both;
            }
            .notice {
                text-align: left;
                line-height: 22px;
                font-weight: 500;
                padding: 10px;
                margin-bottom: 0;
                background: #ffffcc;
                border-radius: 4px;
            }
            /* Last Update */
            .columns {
                display: flex;
                justify-content: center;
                //align-items: baseline;
                padding-bottom: 5px !important;
            }
            .column {
                flex: 1;
                margin: 2px;
            }
            .column:first-child {
                margin-left: 0;
            }
            .column:last-child {
                margin-right: 0;
            }
            @media (min-width: 320px) and (max-width: 480px) {
                #ffl-map {
                    width: 100%;
                    float: left;
                }
                #ffl-list div button {
                    background: #fff;
                    color: #333;
                    display: block;
                    margin:1px 1px 1px 1px;
                    width: 100%;
                    padding: 15px 10px;
                    border: 1px solid rgb(204, 204, 204);
                    border-radius: 4px;
                    text-align: left;
                    outline: none;
                    margin-bottom: 3px !important;
                }
                #ffl-list {
                    width: 100%;
                    padding: 0 5px 0 0px;
                }
                body,
                html {
                    overflow-x: hidden;
                }
            }
            @media (min-width: 481px) and (max-width: 767px) {
                .ffl-map-resize {
                    width: 91%;
                }
            }
            @media (min-width: 768px) and (max-width: 1024px) {
                .ffl-map-resize {
                    width: 69%;
                }
            }
            .dsbSearch {
                pointer-events: none;
            }
        </style>
        <div class="content">
            <h3 class="ffl-dealer-heading">Select your preferred FFL Dealer</h3>
            <p style="margin-bottom:10px !important;" class="notice">
                <span class="ffl_checkout_notice">
                    <b>Federal law dictates that your online firearms purchase must be delivered to a 
                    federally licensed firearms dealer (FFL) before you can take possession</b>. This 
                    process is called a Transfer. Enter your zip code, radius, and FFL name (optional), 
                    then click the Find button to get a list of FFL dealers in your area.
                    Select the FFL dealer you want the firearm shipped to. <b><u>Before Checking Out, 
                    Contact your selected FFL dealer to confirm they are currently accepting transfers</u>. 
                    You can also confirm transfer costs.</b>.
                </span>
            </p>
            <div class="columns">
                <div class="column">
                    <input autocomplete="off" type="text" id="ffl-zip-code" placeholder="Zip Code" class="" value="">
                </div>
                <div class="column">
                    <select id="ffl-radius">
                        <option value="5" selected="">within 5 Miles</option>
                        <option value="10">Within 10 Miles</option>
                        <option value="25">Within 25 Miles</option>
                        <option value="50">Within 50 Miles</option>
                    </select>
                </div>
                <div class="column">
                    <input readonly id="ffl-search" placeholder="FIND FFL" value="FIND FFL">
                </div>
            </div>
            <div class="columns">
                <div class="column">
                    <input autocomplete="off" type="text" id="ffl-name-search" placeholder="FFL Name (optional)">
                </div>
            </div>
        </div>
        <div class="ffl-list-container">
            <ul id="ffl-list" style="height:300px;" class="ffl-hide"></ul>
        </div>
        <div id="ffl-map" class="ffl-map-resize"></div>
        <span id="mapbox-attribution-line" class="mapbox-attribution">© <a style="color:gray !important;" target=_blank href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a style="color:gray !important;" target=_blank href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> © <a style="color:gray !important;" target=_blank href='http://www.maxar.com'>Maxar</a><strong> | <a style="color:gray !important;" href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong></span><br>
        `;
    t.exports = ht
}]);
