(function() {
    /*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
    var m, aa = function(a) {
        var b = 0;
        return function() {
            return b < a.length ? {
                done: !1,
                value: a[b++]
            } : {
                done: !0
            }
        }
    }, ba = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
        if (a == Array.prototype || a == Object.prototype)
            return a;
        a[b] = c.value;
        return a
    }
    , ca = function(a) {
        a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
        for (var b = 0; b < a.length; ++b) {
            var c = a[b];
            if (c && c.Math == Math)
                return c
        }
        throw Error("a");
    }, fa = ca(this), ha = function(a, b) {
        if (b)
            a: {
                var c = fa;
                a = a.split(".");
                for (var d = 0; d < a.length - 1; d++) {
                    var e = a[d];
                    if (!(e in c))
                        break a;
                    c = c[e]
                }
                a = a[a.length - 1];
                d = c[a];
                b = b(d);
                b != d && null != b && ba(c, a, {
                    configurable: !0,
                    writable: !0,
                    value: b
                })
            }
    };
    ha("Symbol", function(a) {
        if (a)
            return a;
        var b = function(e, f) {
            this.g = e;
            ba(this, "description", {
                configurable: !0,
                writable: !0,
                value: f
            })
        };
        b.prototype.toString = function() {
            return this.g
        }
        ;
        var c = 0
          , d = function(e) {
            if (this instanceof d)
                throw new TypeError("b");
            return new b("jscomp_symbol_" + (e || "") + "_" + c++,e)
        };
        return d
    });
    ha("Symbol.iterator", function(a) {
        if (a)
            return a;
        a = Symbol("Symbol.iterator");
        for (var b = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), c = 0; c < b.length; c++) {
            var d = fa[b[c]];
            "function" === typeof d && "function" != typeof d.prototype[a] && ba(d.prototype, a, {
                configurable: !0,
                writable: !0,
                value: function() {
                    return ia(aa(this))
                }
            })
        }
        return a
    });
    var ia = function(a) {
        a = {
            next: a
        };
        a[Symbol.iterator] = function() {
            return this
        }
        ;
        return a
    }, n = function(a) {
        var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
        return b ? b.call(a) : {
            next: aa(a)
        }
    }, ja = function(a) {
        if (!(a instanceof Array)) {
            a = n(a);
            for (var b, c = []; !(b = a.next()).done; )
                c.push(b.value);
            a = c
        }
        return a
    }, ka = "function" == typeof Object.create ? Object.create : function(a) {
        var b = function() {};
        b.prototype = a;
        return new b
    }
    , la;
    if ("function" == typeof Object.setPrototypeOf)
        la = Object.setPrototypeOf;
    else {
        var ma;
        a: {
            var na = {
                a: !0
            }
              , oa = {};
            try {
                oa.__proto__ = na;
                ma = oa.a;
                break a
            } catch (a) {}
            ma = !1
        }
        la = ma ? function(a, b) {
            a.__proto__ = b;
            if (a.__proto__ !== b)
                throw new TypeError("c`" + a);
            return a
        }
        : null
    }
    var pa = la
      , p = function(a, b) {
        a.prototype = ka(b.prototype);
        a.prototype.constructor = a;
        if (pa)
            pa(a, b);
        else
            for (var c in b)
                if ("prototype" != c)
                    if (Object.defineProperties) {
                        var d = Object.getOwnPropertyDescriptor(b, c);
                        d && Object.defineProperty(a, c, d)
                    } else
                        a[c] = b[c];
        a.Wb = b.prototype
    }
      , qa = function() {
        this.o = !1;
        this.i = null;
        this.j = void 0;
        this.g = 1;
        this.H = 0;
        this.v = null
    }
      , ra = function(a) {
        if (a.o)
            throw new TypeError("e");
        a.o = !0
    };
    qa.prototype.s = function(a) {
        this.j = a
    }
    ;
    var sa = function(a, b) {
        a.v = {
            Se: b,
            Ue: !0
        };
        a.g = a.H
    };
    qa.prototype.return = function(a) {
        this.v = {
            return: a
        };
        this.g = this.H
    }
    ;
    var ta = function(a, b, c) {
        a.g = c;
        return {
            value: b
        }
    }
      , va = function(a) {
        this.g = new qa;
        this.i = a
    }
      , ya = function(a, b) {
        ra(a.g);
        var c = a.g.i;
        if (c)
            return wa(a, "return"in c ? c["return"] : function(d) {
                return {
                    value: d,
                    done: !0
                }
            }
            , b, a.g.return);
        a.g.return(b);
        return xa(a)
    }
      , wa = function(a, b, c, d) {
        try {
            var e = b.call(a.g.i, c);
            if (!(e instanceof Object))
                throw new TypeError("d`" + e);
            if (!e.done)
                return a.g.o = !1,
                e;
            var f = e.value
        } catch (g) {
            return a.g.i = null,
            sa(a.g, g),
            xa(a)
        }
        a.g.i = null;
        d.call(a.g, f);
        return xa(a)
    }
      , xa = function(a) {
        for (; a.g.g; )
            try {
                var b = a.i(a.g);
                if (b)
                    return a.g.o = !1,
                    {
                        value: b.value,
                        done: !1
                    }
            } catch (c) {
                a.g.j = void 0,
                sa(a.g, c)
            }
        a.g.o = !1;
        if (a.g.v) {
            b = a.g.v;
            a.g.v = null;
            if (b.Ue)
                throw b.Se;
            return {
                value: b.return,
                done: !0
            }
        }
        return {
            value: void 0,
            done: !0
        }
    }
      , za = function(a) {
        this.next = function(b) {
            ra(a.g);
            a.g.i ? b = wa(a, a.g.i.next, b, a.g.s) : (a.g.s(b),
            b = xa(a));
            return b
        }
        ;
        this.throw = function(b) {
            ra(a.g);
            a.g.i ? b = wa(a, a.g.i["throw"], b, a.g.s) : (sa(a.g, b),
            b = xa(a));
            return b
        }
        ;
        this.return = function(b) {
            return ya(a, b)
        }
        ;
        this[Symbol.iterator] = function() {
            return this
        }
    }
      , Aa = function(a) {
        function b(d) {
            return a.next(d)
        }
        function c(d) {
            return a.throw(d)
        }
        return new Promise(function(d, e) {
            function f(g) {
                g.done ? d(g.value) : Promise.resolve(g.value).then(b, c).then(f, e)
            }
            f(a.next())
        }
        )
    }
      , Ba = function(a) {
        return Aa(new za(new va(a)))
    };
    ha("Promise", function(a) {
        function b() {
            this.g = null
        }
        function c(g) {
            return g instanceof e ? g : new e(function(h) {
                h(g)
            }
            )
        }
        if (a)
            return a;
        b.prototype.i = function(g) {
            if (null == this.g) {
                this.g = [];
                var h = this;
                this.j(function() {
                    h.v()
                })
            }
            this.g.push(g)
        }
        ;
        var d = fa.setTimeout;
        b.prototype.j = function(g) {
            d(g, 0)
        }
        ;
        b.prototype.v = function() {
            for (; this.g && this.g.length; ) {
                var g = this.g;
                this.g = [];
                for (var h = 0; h < g.length; ++h) {
                    var k = g[h];
                    g[h] = null;
                    try {
                        k()
                    } catch (l) {
                        this.o(l)
                    }
                }
            }
            this.g = null
        }
        ;
        b.prototype.o = function(g) {
            this.j(function() {
                throw g;
            })
        }
        ;
        var e = function(g) {
            this.g = 0;
            this.j = void 0;
            this.i = [];
            this.H = !1;
            var h = this.o();
            try {
                g(h.resolve, h.reject)
            } catch (k) {
                h.reject(k)
            }
        };
        e.prototype.o = function() {
            function g(l) {
                return function(q) {
                    k || (k = !0,
                    l.call(h, q))
                }
            }
            var h = this
              , k = !1;
            return {
                resolve: g(this.ka),
                reject: g(this.v)
            }
        }
        ;
        e.prototype.ka = function(g) {
            if (g === this)
                this.v(new TypeError("f"));
            else if (g instanceof e)
                this.Da(g);
            else {
                a: switch (typeof g) {
                case "object":
                    var h = null != g;
                    break a;
                case "function":
                    h = !0;
                    break a;
                default:
                    h = !1
                }
                h ? this.ha(g) : this.s(g)
            }
        }
        ;
        e.prototype.ha = function(g) {
            var h = void 0;
            try {
                h = g.then
            } catch (k) {
                this.v(k);
                return
            }
            "function" == typeof h ? this.Ca(h, g) : this.s(g)
        }
        ;
        e.prototype.v = function(g) {
            this.S(2, g)
        }
        ;
        e.prototype.s = function(g) {
            this.S(1, g)
        }
        ;
        e.prototype.S = function(g, h) {
            if (0 != this.g)
                throw Error("g`" + g + "`" + h + "`" + this.g);
            this.g = g;
            this.j = h;
            2 === this.g && this.W();
            this.V()
        }
        ;
        e.prototype.W = function() {
            var g = this;
            d(function() {
                if (g.ta()) {
                    var h = fa.console;
                    "undefined" !== typeof h && h.error(g.j)
                }
            }, 1)
        }
        ;
        e.prototype.ta = function() {
            if (this.H)
                return !1;
            var g = fa.CustomEvent
              , h = fa.Event
              , k = fa.dispatchEvent;
            if ("undefined" === typeof k)
                return !0;
            "function" === typeof g ? g = new g("unhandledrejection",{
                cancelable: !0
            }) : "function" === typeof h ? g = new h("unhandledrejection",{
                cancelable: !0
            }) : (g = fa.document.createEvent("CustomEvent"),
            g.initCustomEvent("unhandledrejection", !1, !0, g));
            g.promise = this;
            g.reason = this.j;
            return k(g)
        }
        ;
        e.prototype.V = function() {
            if (null != this.i) {
                for (var g = 0; g < this.i.length; ++g)
                    f.i(this.i[g]);
                this.i = null
            }
        }
        ;
        var f = new b;
        e.prototype.Da = function(g) {
            var h = this.o();
            g.Dc(h.resolve, h.reject)
        }
        ;
        e.prototype.Ca = function(g, h) {
            var k = this.o();
            try {
                g.call(h, k.resolve, k.reject)
            } catch (l) {
                k.reject(l)
            }
        }
        ;
        e.prototype.then = function(g, h) {
            function k(B, A) {
                return "function" == typeof B ? function(T) {
                    try {
                        l(B(T))
                    } catch (W) {
                        q(W)
                    }
                }
                : A
            }
            var l, q, t = new e(function(B, A) {
                l = B;
                q = A
            }
            );
            this.Dc(k(g, l), k(h, q));
            return t
        }
        ;
        e.prototype.catch = function(g) {
            return this.then(void 0, g)
        }
        ;
        e.prototype.Dc = function(g, h) {
            function k() {
                switch (l.g) {
                case 1:
                    g(l.j);
                    break;
                case 2:
                    h(l.j);
                    break;
                default:
                    throw Error("h`" + l.g);
                }
            }
            var l = this;
            null == this.i ? f.i(k) : this.i.push(k);
            this.H = !0
        }
        ;
        e.resolve = c;
        e.reject = function(g) {
            return new e(function(h, k) {
                k(g)
            }
            )
        }
        ;
        e.race = function(g) {
            return new e(function(h, k) {
                for (var l = n(g), q = l.next(); !q.done; q = l.next())
                    c(q.value).Dc(h, k)
            }
            )
        }
        ;
        e.all = function(g) {
            var h = n(g)
              , k = h.next();
            return k.done ? c([]) : new e(function(l, q) {
                function t(T) {
                    return function(W) {
                        B[T] = W;
                        A--;
                        0 == A && l(B)
                    }
                }
                var B = []
                  , A = 0;
                do
                    B.push(void 0),
                    A++,
                    c(k.value).Dc(t(B.length - 1), q),
                    k = h.next();
                while (!k.done)
            }
            )
        }
        ;
        return e
    });
    ha("Object.is", function(a) {
        return a ? a : function(b, c) {
            return b === c ? 0 !== b || 1 / b === 1 / c : b !== b && c !== c
        }
    });
    ha("Array.prototype.includes", function(a) {
        return a ? a : function(b, c) {
            var d = this;
            d instanceof String && (d = String(d));
            var e = d.length;
            c = c || 0;
            for (0 > c && (c = Math.max(c + e, 0)); c < e; c++) {
                var f = d[c];
                if (f === b || Object.is(f, b))
                    return !0
            }
            return !1
        }
    });
    ha("String.prototype.includes", function(a) {
        return a ? a : function(b, c) {
            if (null == this)
                throw new TypeError("i`includes");
            if (b instanceof RegExp)
                throw new TypeError("j`includes");
            return -1 !== (this + "").indexOf(b, c || 0)
        }
    });
    ha("Array.prototype.fill", function(a) {
        return a ? a : function(b, c, d) {
            var e = this.length || 0;
            0 > c && (c = Math.max(0, e + c));
            if (null == d || d > e)
                d = e;
            d = Number(d);
            0 > d && (d = Math.max(0, e + d));
            for (c = Number(c || 0); c < d; c++)
                this[c] = b;
            return this
        }
    });
    var Ca = function(a) {
        return a ? a : Array.prototype.fill
    };
    ha("Int8Array.prototype.fill", Ca);
    ha("Uint8Array.prototype.fill", Ca);
    ha("Uint8ClampedArray.prototype.fill", Ca);
    ha("Int16Array.prototype.fill", Ca);
    ha("Uint16Array.prototype.fill", Ca);
    ha("Int32Array.prototype.fill", Ca);
    ha("Uint32Array.prototype.fill", Ca);
    ha("Float32Array.prototype.fill", Ca);
    ha("Float64Array.prototype.fill", Ca);
    var Da = function(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    }
      , Ea = "function" == typeof Object.assign ? Object.assign : function(a, b) {
        for (var c = 1; c < arguments.length; c++) {
            var d = arguments[c];
            if (d)
                for (var e in d)
                    Da(d, e) && (a[e] = d[e])
        }
        return a
    }
    ;
    ha("Object.assign", function(a) {
        return a || Ea
    });
    ha("WeakMap", function(a) {
        function b() {}
        function c(k) {
            var l = typeof k;
            return "object" === l && null !== k || "function" === l
        }
        function d(k) {
            if (!Da(k, f)) {
                var l = new b;
                ba(k, f, {
                    value: l
                })
            }
        }
        function e(k) {
            var l = Object[k];
            l && (Object[k] = function(q) {
                if (q instanceof b)
                    return q;
                Object.isExtensible(q) && d(q);
                return l(q)
            }
            )
        }
        if (function() {
            if (!a || !Object.seal)
                return !1;
            try {
                var k = Object.seal({})
                  , l = Object.seal({})
                  , q = new a([[k, 2], [l, 3]]);
                if (2 != q.get(k) || 3 != q.get(l))
                    return !1;
                q.delete(k);
                q.set(l, 4);
                return !q.has(k) && 4 == q.get(l)
            } catch (t) {
                return !1
            }
        }())
            return a;
        var f = "$jscomp_hidden_" + Math.random();
        e("freeze");
        e("preventExtensions");
        e("seal");
        var g = 0
          , h = function(k) {
            this.g = (g += Math.random() + 1).toString();
            if (k) {
                k = n(k);
                for (var l; !(l = k.next()).done; )
                    l = l.value,
                    this.set(l[0], l[1])
            }
        };
        h.prototype.set = function(k, l) {
            if (!c(k))
                throw Error("k");
            d(k);
            if (!Da(k, f))
                throw Error("l`" + k);
            k[f][this.g] = l;
            return this
        }
        ;
        h.prototype.get = function(k) {
            return c(k) && Da(k, f) ? k[f][this.g] : void 0
        }
        ;
        h.prototype.has = function(k) {
            return c(k) && Da(k, f) && Da(k[f], this.g)
        }
        ;
        h.prototype.delete = function(k) {
            return c(k) && Da(k, f) && Da(k[f], this.g) ? delete k[f][this.g] : !1
        }
        ;
        return h
    });
    ha("Map", function(a) {
        if (function() {
            if (!a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal)
                return !1;
            try {
                var h = Object.seal({
                    x: 4
                })
                  , k = new a(n([[h, "s"]]));
                if ("s" != k.get(h) || 1 != k.size || k.get({
                    x: 4
                }) || k.set({
                    x: 4
                }, "t") != k || 2 != k.size)
                    return !1;
                var l = k.entries()
                  , q = l.next();
                if (q.done || q.value[0] != h || "s" != q.value[1])
                    return !1;
                q = l.next();
                return q.done || 4 != q.value[0].x || "t" != q.value[1] || !l.next().done ? !1 : !0
            } catch (t) {
                return !1
            }
        }())
            return a;
        var b = new WeakMap
          , c = function(h) {
            this.i = {};
            this.g = f();
            this.size = 0;
            if (h) {
                h = n(h);
                for (var k; !(k = h.next()).done; )
                    k = k.value,
                    this.set(k[0], k[1])
            }
        };
        c.prototype.set = function(h, k) {
            h = 0 === h ? 0 : h;
            var l = d(this, h);
            l.list || (l.list = this.i[l.id] = []);
            l.Pa ? l.Pa.value = k : (l.Pa = {
                next: this.g,
                Bb: this.g.Bb,
                head: this.g,
                key: h,
                value: k
            },
            l.list.push(l.Pa),
            this.g.Bb.next = l.Pa,
            this.g.Bb = l.Pa,
            this.size++);
            return this
        }
        ;
        c.prototype.delete = function(h) {
            h = d(this, h);
            return h.Pa && h.list ? (h.list.splice(h.index, 1),
            h.list.length || delete this.i[h.id],
            h.Pa.Bb.next = h.Pa.next,
            h.Pa.next.Bb = h.Pa.Bb,
            h.Pa.head = null,
            this.size--,
            !0) : !1
        }
        ;
        c.prototype.clear = function() {
            this.i = {};
            this.g = this.g.Bb = f();
            this.size = 0
        }
        ;
        c.prototype.has = function(h) {
            return !!d(this, h).Pa
        }
        ;
        c.prototype.get = function(h) {
            return (h = d(this, h).Pa) && h.value
        }
        ;
        c.prototype.entries = function() {
            return e(this, function(h) {
                return [h.key, h.value]
            })
        }
        ;
        c.prototype.keys = function() {
            return e(this, function(h) {
                return h.key
            })
        }
        ;
        c.prototype.values = function() {
            return e(this, function(h) {
                return h.value
            })
        }
        ;
        c.prototype.forEach = function(h, k) {
            for (var l = this.entries(), q; !(q = l.next()).done; )
                q = q.value,
                h.call(k, q[1], q[0], this)
        }
        ;
        c.prototype[Symbol.iterator] = c.prototype.entries;
        var d = function(h, k) {
            var l = k && typeof k;
            "object" == l || "function" == l ? b.has(k) ? l = b.get(k) : (l = "" + ++g,
            b.set(k, l)) : l = "p_" + k;
            var q = h.i[l];
            if (q && Da(h.i, l))
                for (h = 0; h < q.length; h++) {
                    var t = q[h];
                    if (k !== k && t.key !== t.key || k === t.key)
                        return {
                            id: l,
                            list: q,
                            index: h,
                            Pa: t
                        }
                }
            return {
                id: l,
                list: q,
                index: -1,
                Pa: void 0
            }
        }
          , e = function(h, k) {
            var l = h.g;
            return ia(function() {
                if (l) {
                    for (; l.head != h.g; )
                        l = l.Bb;
                    for (; l.next != l.head; )
                        return l = l.next,
                        {
                            done: !1,
                            value: k(l)
                        };
                    l = null
                }
                return {
                    done: !0,
                    value: void 0
                }
            })
        }
          , f = function() {
            var h = {};
            return h.Bb = h.next = h.head = h
        }
          , g = 0;
        return c
    });
    var Fa = function(a, b) {
        a instanceof String && (a += "");
        var c = 0
          , d = !1
          , e = {
            next: function() {
                if (!d && c < a.length) {
                    var f = c++;
                    return {
                        value: b(f, a[f]),
                        done: !1
                    }
                }
                d = !0;
                return {
                    done: !0,
                    value: void 0
                }
            }
        };
        e[Symbol.iterator] = function() {
            return e
        }
        ;
        return e
    };
    ha("Array.prototype.entries", function(a) {
        return a ? a : function() {
            return Fa(this, function(b, c) {
                return [b, c]
            })
        }
    });
    ha("Set", function(a) {
        if (function() {
            if (!a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal)
                return !1;
            try {
                var c = Object.seal({
                    x: 4
                })
                  , d = new a(n([c]));
                if (!d.has(c) || 1 != d.size || d.add(c) != d || 1 != d.size || d.add({
                    x: 4
                }) != d || 2 != d.size)
                    return !1;
                var e = d.entries()
                  , f = e.next();
                if (f.done || f.value[0] != c || f.value[1] != c)
                    return !1;
                f = e.next();
                return f.done || f.value[0] == c || 4 != f.value[0].x || f.value[1] != f.value[0] ? !1 : e.next().done
            } catch (g) {
                return !1
            }
        }())
            return a;
        var b = function(c) {
            this.g = new Map;
            if (c) {
                c = n(c);
                for (var d; !(d = c.next()).done; )
                    this.add(d.value)
            }
            this.size = this.g.size
        };
        b.prototype.add = function(c) {
            c = 0 === c ? 0 : c;
            this.g.set(c, c);
            this.size = this.g.size;
            return this
        }
        ;
        b.prototype.delete = function(c) {
            c = this.g.delete(c);
            this.size = this.g.size;
            return c
        }
        ;
        b.prototype.clear = function() {
            this.g.clear();
            this.size = 0
        }
        ;
        b.prototype.has = function(c) {
            return this.g.has(c)
        }
        ;
        b.prototype.entries = function() {
            return this.g.entries()
        }
        ;
        b.prototype.values = function() {
            return this.g.values()
        }
        ;
        b.prototype.keys = b.prototype.values;
        b.prototype[Symbol.iterator] = b.prototype.values;
        b.prototype.forEach = function(c, d) {
            var e = this;
            this.g.forEach(function(f) {
                return c.call(d, f, f, e)
            })
        }
        ;
        return b
    });
    ha("Array.prototype.values", function(a) {
        return a ? a : function() {
            return Fa(this, function(b, c) {
                return c
            })
        }
    });
    ha("Array.prototype.keys", function(a) {
        return a ? a : function() {
            return Fa(this, function(b) {
                return b
            })
        }
    });
    ha("Array.from", function(a) {
        return a ? a : function(b, c, d) {
            c = null != c ? c : function(h) {
                return h
            }
            ;
            var e = []
              , f = "undefined" != typeof Symbol && Symbol.iterator && b[Symbol.iterator];
            if ("function" == typeof f) {
                b = f.call(b);
                for (var g = 0; !(f = b.next()).done; )
                    e.push(c.call(d, f.value, g++))
            } else
                for (f = b.length,
                g = 0; g < f; g++)
                    e.push(c.call(d, b[g], g));
            return e
        }
    });
    ha("Array.prototype.flat", function(a) {
        return a ? a : function(b) {
            b = void 0 === b ? 1 : b;
            for (var c = [], d = 0; d < this.length; d++) {
                var e = this[d];
                Array.isArray(e) && 0 < b ? (e = Array.prototype.flat.call(e, b - 1),
                c.push.apply(c, e)) : c.push(e)
            }
            return c
        }
    });
    var Ga = Ga || {}
      , Ha = this || self
      , Ia = function() {}
      , Ja = function(a) {
        a.$c = void 0;
        a.ya = function() {
            return a.$c ? a.$c : a.$c = new a
        }
    }
      , Ka = function(a) {
        var b = typeof a;
        b = "object" != b ? b : a ? Array.isArray(a) ? "array" : b : "null";
        return "array" == b || "object" == b && "number" == typeof a.length
    }
      , La = function(a) {
        var b = typeof a;
        return "object" == b && null != a || "function" == b
    }
      , Ma = function(a, b, c) {
        return a.call.apply(a.bind, arguments)
    }
      , Oa = function(a, b, c) {
        if (!a)
            throw Error();
        if (2 < arguments.length) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function() {
                var e = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(e, d);
                return a.apply(b, e)
            }
        }
        return function() {
            return a.apply(b, arguments)
        }
    }
      , Pa = function(a, b, c) {
        Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? Pa = Ma : Pa = Oa;
        return Pa.apply(null, arguments)
    }
      , Qa = function(a, b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return function() {
            var d = c.slice();
            d.push.apply(d, arguments);
            return a.apply(this, d)
        }
    }
      , Ra = function(a, b) {
        a = a.split(".");
        var c = Ha;
        a[0]in c || "undefined" == typeof c.execScript || c.execScript("var " + a[0]);
        for (var d; a.length && (d = a.shift()); )
            a.length || void 0 === b ? c[d] && c[d] !== Object.prototype[d] ? c = c[d] : c = c[d] = {} : c[d] = b
    }
      , Ta = function(a, b) {
        function c() {}
        c.prototype = b.prototype;
        a.Wb = b.prototype;
        a.prototype = new c;
        a.prototype.constructor = a;
        a.nf = function(d, e, f) {
            for (var g = Array(arguments.length - 2), h = 2; h < arguments.length; h++)
                g[h - 2] = arguments[h];
            return b.prototype[e].apply(d, g)
        }
    }
      , Ua = function(a) {
        return a
    };
    var Xa = function(a) {
        var b = new Image;
        b.onerror = b.onload = b.onabort = function() {
            delete Va[Wa]
        }
        ;
        Va[Wa] = b;
        b.src = "/gen_204?atyp=i&ct=doodle&cad=" + a + "&zx=" + Date.now();
        Wa++
    }
      , Va = []
      , Wa = 0;
    var Ya;
    var Za = Array.prototype.indexOf ? function(a, b) {
        return Array.prototype.indexOf.call(a, b, void 0)
    }
    : function(a, b) {
        if ("string" === typeof a)
            return "string" !== typeof b || 1 != b.length ? -1 : a.indexOf(b, 0);
        for (var c = 0; c < a.length; c++)
            if (c in a && a[c] === b)
                return c;
        return -1
    }
      , $a = Array.prototype.forEach ? function(a, b, c) {
        Array.prototype.forEach.call(a, b, c)
    }
    : function(a, b, c) {
        for (var d = a.length, e = "string" === typeof a ? a.split("") : a, f = 0; f < d; f++)
            f in e && b.call(c, e[f], f, a)
    }
      , ab = Array.prototype.filter ? function(a, b) {
        return Array.prototype.filter.call(a, b, void 0)
    }
    : function(a, b) {
        for (var c = a.length, d = [], e = 0, f = "string" === typeof a ? a.split("") : a, g = 0; g < c; g++)
            if (g in f) {
                var h = f[g];
                b.call(void 0, h, g, a) && (d[e++] = h)
            }
        return d
    }
      , bb = Array.prototype.reduce ? function(a, b, c) {
        return Array.prototype.reduce.call(a, b, c)
    }
    : function(a, b, c) {
        var d = c;
        $a(a, function(e, f) {
            d = b.call(void 0, d, e, f, a)
        });
        return d
    }
    ;
    function cb(a, b) {
        a: {
            for (var c = a.length, d = "string" === typeof a ? a.split("") : a, e = 0; e < c; e++)
                if (e in d && b.call(void 0, d[e], e, a)) {
                    b = e;
                    break a
                }
            b = -1
        }
        return 0 > b ? null : "string" === typeof a ? a.charAt(b) : a[b]
    }
    function db(a, b) {
        b = Za(a, b);
        var c;
        (c = 0 <= b) && Array.prototype.splice.call(a, b, 1);
        return c
    }
    function eb(a) {
        return Array.prototype.concat.apply([], arguments)
    }
    function fb(a) {
        var b = a.length;
        if (0 < b) {
            for (var c = Array(b), d = 0; d < b; d++)
                c[d] = a[d];
            return c
        }
        return []
    }
    function gb(a, b) {
        if (!Ka(a) || !Ka(b) || a.length != b.length)
            return !1;
        for (var c = a.length, d = hb, e = 0; e < c; e++)
            if (!d(a[e], b[e]))
                return !1;
        return !0
    }
    function hb(a, b) {
        return a === b
    }
    function ib(a) {
        for (var b = Math.random, c = a.length - 1; 0 < c; c--) {
            var d = Math.floor(b() * (c + 1))
              , e = a[c];
            a[c] = a[d];
            a[d] = e
        }
    }
    ;var jb = function(a, b, c) {
        for (var d in a)
            b.call(c, a[d], d, a)
    }
      , kb = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ")
      , lb = function(a, b) {
        for (var c, d, e = 1; e < arguments.length; e++) {
            d = arguments[e];
            for (c in d)
                a[c] = d[c];
            for (var f = 0; f < kb.length; f++)
                c = kb[f],
                Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
        }
    };
    var mb;
    var nb = /[A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02b8\u0300-\u0590\u0900-\u1fff\u200e\u2c00-\ud801\ud804-\ud839\ud83c-\udbff\uf900-\ufb1c\ufe00-\ufe6f\ufefd-\uffff]/
      , ob = /^[^A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02b8\u0300-\u0590\u0900-\u1fff\u200e\u2c00-\ud801\ud804-\ud839\ud83c-\udbff\uf900-\ufb1c\ufe00-\ufe6f\ufefd-\uffff]*[\u0591-\u06ef\u06fa-\u08ff\u200f\ud802-\ud803\ud83a-\ud83b\ufb1d-\ufdff\ufe70-\ufefc]/
      , pb = /^http:\/\/.*/
      , qb = /\s+/
      , rb = /[\d\u06f0-\u06f9]/;
    var sb = String.prototype.trim ? function(a) {
        return a.trim()
    }
    : function(a) {
        return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]
    }
      , tb = /&/g
      , ub = /</g
      , vb = />/g
      , wb = /"/g
      , xb = /'/g
      , yb = /\x00/g
      , zb = /[\x00&<>"']/
      , Ab = function(a, b) {
        return -1 != a.indexOf(b)
    }
      , Bb = function(a, b) {
        return a < b ? -1 : a > b ? 1 : 0
    };
    var Db = function(a, b) {
        this.j = b === Cb ? a : ""
    };
    Db.prototype.Yc = !0;
    Db.prototype.g = function() {
        return this.j.toString()
    }
    ;
    Db.prototype.Md = !0;
    Db.prototype.i = function() {
        return 1
    }
    ;
    var Eb = function(a) {
        return a instanceof Db && a.constructor === Db ? a.j : "type_error:SafeUrl"
    }
      , Fb = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i
      , Gb = function(a) {
        if (a instanceof Db)
            return a;
        a = "object" == typeof a && a.Yc ? a.g() : String(a);
        Fb.test(a) || (a = "about:invalid#zClosurez");
        return new Db(a,Cb)
    }
      , Cb = {};
    var Hb;
    a: {
        var Ib = Ha.navigator;
        if (Ib) {
            var Jb = Ib.userAgent;
            if (Jb) {
                Hb = Jb;
                break a
            }
        }
        Hb = ""
    }
    ;var Lb = function(a, b, c) {
        this.j = c === Kb ? a : "";
        this.o = b
    };
    Lb.prototype.Md = !0;
    Lb.prototype.i = function() {
        return this.o
    }
    ;
    Lb.prototype.Yc = !0;
    Lb.prototype.g = function() {
        return this.j.toString()
    }
    ;
    var Mb = function(a) {
        return a instanceof Lb && a.constructor === Lb ? a.j : "type_error:SafeHtml"
    }
      , Ob = function(a) {
        if (a instanceof Lb)
            return a;
        var b = "object" == typeof a
          , c = null;
        b && a.Md && (c = a.i());
        a = b && a.Yc ? a.g() : String(a);
        zb.test(a) && (-1 != a.indexOf("&") && (a = a.replace(tb, "&amp;")),
        -1 != a.indexOf("<") && (a = a.replace(ub, "&lt;")),
        -1 != a.indexOf(">") && (a = a.replace(vb, "&gt;")),
        -1 != a.indexOf('"') && (a = a.replace(wb, "&quot;")),
        -1 != a.indexOf("'") && (a = a.replace(xb, "&#39;")),
        -1 != a.indexOf("\x00") && (a = a.replace(yb, "&#0;")));
        return Nb(a, c)
    }
      , Kb = {}
      , Nb = function(a, b) {
        if (void 0 === mb) {
            var c = null;
            var d = Ha.trustedTypes;
            if (d && d.createPolicy) {
                try {
                    c = d.createPolicy("goog#html", {
                        createHTML: Ua,
                        createScript: Ua,
                        createScriptURL: Ua
                    })
                } catch (e) {
                    Ha.console && Ha.console.error(e.message)
                }
                mb = c
            } else
                mb = c
        }
        a = (c = mb) ? c.createHTML(a) : a;
        return new Lb(a,b,Kb)
    }
      , Pb = new Lb(Ha.trustedTypes && Ha.trustedTypes.emptyHTML || "",0,Kb);
    var Qb = function(a) {
        var b = !1, c;
        return function() {
            b || (c = a(),
            b = !0);
            return c
        }
    }(function() {
        var a = document.createElement("div")
          , b = document.createElement("div");
        b.appendChild(document.createElement("div"));
        a.appendChild(b);
        b = a.firstChild.firstChild;
        a.innerHTML = Mb(Pb);
        return !b.parentElement
    })
      , Rb = function(a) {
        a = a instanceof Db ? a : Gb(a);
        Ha.open(Eb(a), "", void 0, void 0)
    };
    var Sb = function(a, b) {
        return a + Math.random() * (b - a)
    }
      , Tb = function(a, b) {
        return Math.min(Math.max(a, 0), b)
    }
      , r = function(a, b, c) {
        return a + c * (b - a)
    }
      , Ub = function(a, b) {
        a = 180 * Math.atan2(b - 0, a - 0) / Math.PI % 360;
        return 0 > 360 * a ? a + 360 : a
    }
      , Vb = function(a) {
        return bb(arguments, function(b, c) {
            return b + c
        }, 0)
    }
      , Xb = function(a) {
        return Vb.apply(null, arguments) / arguments.length
    };
    var Yb = function(a, b) {
        this.i = {};
        this.g = [];
        this.j = 0;
        var c = arguments.length;
        if (1 < c) {
            if (c % 2)
                throw Error("m");
            for (var d = 0; d < c; d += 2)
                this.set(arguments[d], arguments[d + 1])
        } else if (a)
            if (a instanceof Yb)
                for (c = a.wb(),
                d = 0; d < c.length; d++)
                    this.set(c[d], a.get(c[d]));
            else
                for (d in a)
                    this.set(d, a[d])
    };
    Yb.prototype.rb = function() {
        Zb(this);
        for (var a = [], b = 0; b < this.g.length; b++)
            a.push(this.i[this.g[b]]);
        return a
    }
    ;
    Yb.prototype.wb = function() {
        Zb(this);
        return this.g.concat()
    }
    ;
    var Zb = function(a) {
        if (a.j != a.g.length) {
            for (var b = 0, c = 0; b < a.g.length; ) {
                var d = a.g[b];
                $b(a.i, d) && (a.g[c++] = d);
                b++
            }
            a.g.length = c
        }
        if (a.j != a.g.length) {
            var e = {};
            for (c = b = 0; b < a.g.length; )
                d = a.g[b],
                $b(e, d) || (a.g[c++] = d,
                e[d] = 1),
                b++;
            a.g.length = c
        }
    };
    Yb.prototype.get = function(a, b) {
        return $b(this.i, a) ? this.i[a] : b
    }
    ;
    Yb.prototype.set = function(a, b) {
        $b(this.i, a) || (this.j++,
        this.g.push(a));
        this.i[a] = b
    }
    ;
    Yb.prototype.forEach = function(a, b) {
        for (var c = this.wb(), d = 0; d < c.length; d++) {
            var e = c[d]
              , f = this.get(e);
            a.call(b, f, e, this)
        }
    }
    ;
    var $b = function(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    };
    var ac = function(a) {
        if (a.rb && "function" == typeof a.rb)
            return a.rb();
        if ("string" === typeof a)
            return a.split("");
        if (Ka(a)) {
            for (var b = [], c = a.length, d = 0; d < c; d++)
                b.push(a[d]);
            return b
        }
        b = [];
        c = 0;
        for (d in a)
            b[c++] = a[d];
        return b
    }
      , bc = function(a, b) {
        if (a.forEach && "function" == typeof a.forEach)
            a.forEach(b, void 0);
        else if (Ka(a) || "string" === typeof a)
            $a(a, b, void 0);
        else {
            if (a.wb && "function" == typeof a.wb)
                var c = a.wb();
            else if (a.rb && "function" == typeof a.rb)
                c = void 0;
            else if (Ka(a) || "string" === typeof a) {
                c = [];
                for (var d = a.length, e = 0; e < d; e++)
                    c.push(e)
            } else
                for (e in c = [],
                d = 0,
                a)
                    c[d++] = e;
            d = ac(a);
            e = d.length;
            for (var f = 0; f < e; f++)
                b.call(void 0, d[f], c && c[f], a)
        }
    };
    var cc = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^\\/?#]*)@)?([^\\/?#]*?)(?::([0-9]+))?(?=[\\/?#]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/
      , dc = function(a, b) {
        if (a) {
            a = a.split("&");
            for (var c = 0; c < a.length; c++) {
                var d = a[c].indexOf("=")
                  , e = null;
                if (0 <= d) {
                    var f = a[c].substring(0, d);
                    e = a[c].substring(d + 1)
                } else
                    f = a[c];
                b(f, e ? decodeURIComponent(e.replace(/\+/g, " ")) : "")
            }
        }
    };
    var ec = function(a) {
        this.j = this.H = this.o = "";
        this.S = null;
        this.v = this.i = "";
        this.s = !1;
        var b;
        a instanceof ec ? (this.s = a.s,
        fc(this, a.o),
        this.H = a.H,
        this.j = a.j,
        gc(this, a.S),
        this.i = a.i,
        hc(this, ic(a.g)),
        this.v = a.v) : a && (b = String(a).match(cc)) ? (this.s = !1,
        fc(this, b[1] || "", !0),
        this.H = jc(b[2] || ""),
        this.j = jc(b[3] || "", !0),
        gc(this, b[4]),
        this.i = jc(b[5] || "", !0),
        hc(this, b[6] || "", !0),
        this.v = jc(b[7] || "")) : (this.s = !1,
        this.g = new kc(null,this.s))
    };
    ec.prototype.toString = function() {
        var a = []
          , b = this.o;
        b && a.push(lc(b, mc, !0), ":");
        var c = this.j;
        if (c || "file" == b)
            a.push("//"),
            (b = this.H) && a.push(lc(b, mc, !0), "@"),
            a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g, "%$1")),
            c = this.S,
            null != c && a.push(":", String(c));
        if (c = this.i)
            this.j && "/" != c.charAt(0) && a.push("/"),
            a.push(lc(c, "/" == c.charAt(0) ? nc : oc, !0));
        (c = this.g.toString()) && a.push("?", c);
        (c = this.v) && a.push("#", lc(c, pc));
        return a.join("")
    }
    ;
    ec.prototype.resolve = function(a) {
        var b = new ec(this)
          , c = !!a.o;
        c ? fc(b, a.o) : c = !!a.H;
        c ? b.H = a.H : c = !!a.j;
        c ? b.j = a.j : c = null != a.S;
        var d = a.i;
        if (c)
            gc(b, a.S);
        else if (c = !!a.i) {
            if ("/" != d.charAt(0))
                if (this.j && !this.i)
                    d = "/" + d;
                else {
                    var e = b.i.lastIndexOf("/");
                    -1 != e && (d = b.i.substr(0, e + 1) + d)
                }
            e = d;
            if (".." == e || "." == e)
                d = "";
            else if (Ab(e, "./") || Ab(e, "/.")) {
                d = 0 == e.lastIndexOf("/", 0);
                e = e.split("/");
                for (var f = [], g = 0; g < e.length; ) {
                    var h = e[g++];
                    "." == h ? d && g == e.length && f.push("") : ".." == h ? ((1 < f.length || 1 == f.length && "" != f[0]) && f.pop(),
                    d && g == e.length && f.push("")) : (f.push(h),
                    d = !0)
                }
                d = f.join("/")
            } else
                d = e
        }
        c ? b.i = d : c = "" !== a.g.toString();
        c ? hc(b, ic(a.g)) : c = !!a.v;
        c && (b.v = a.v);
        return b
    }
    ;
    var fc = function(a, b, c) {
        a.o = c ? jc(b, !0) : b;
        a.o && (a.o = a.o.replace(/:$/, ""))
    }
      , gc = function(a, b) {
        if (b) {
            b = Number(b);
            if (isNaN(b) || 0 > b)
                throw Error("n`" + b);
            a.S = b
        } else
            a.S = null
    }
      , hc = function(a, b, c) {
        b instanceof kc ? (a.g = b,
        qc(a.g, a.s)) : (c || (b = lc(b, rc)),
        a.g = new kc(b,a.s))
    }
      , jc = function(a, b) {
        return a ? b ? decodeURI(a.replace(/%25/g, "%2525")) : decodeURIComponent(a) : ""
    }
      , lc = function(a, b, c) {
        return "string" === typeof a ? (a = encodeURI(a).replace(b, sc),
        c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")),
        a) : null
    }
      , sc = function(a) {
        a = a.charCodeAt(0);
        return "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16)
    }
      , mc = /[#\/\?@]/g
      , oc = /[#\?:]/g
      , nc = /[#\?]/g
      , rc = /[#\?@]/g
      , pc = /#/g
      , kc = function(a, b) {
        this.i = this.g = null;
        this.j = a || null;
        this.o = !!b
    }
      , tc = function(a) {
        a.g || (a.g = new Yb,
        a.i = 0,
        a.j && dc(a.j, function(b, c) {
            a.add(decodeURIComponent(b.replace(/\+/g, " ")), c)
        }))
    };
    kc.prototype.add = function(a, b) {
        tc(this);
        this.j = null;
        a = uc(this, a);
        var c = this.g.get(a);
        c || this.g.set(a, c = []);
        c.push(b);
        this.i += 1;
        return this
    }
    ;
    var vc = function(a, b) {
        tc(a);
        b = uc(a, b);
        $b(a.g.i, b) && (a.j = null,
        a.i -= a.g.get(b).length,
        a = a.g,
        $b(a.i, b) && (delete a.i[b],
        a.j--,
        a.g.length > 2 * a.j && Zb(a)))
    }
      , wc = function(a, b) {
        tc(a);
        b = uc(a, b);
        return $b(a.g.i, b)
    };
    m = kc.prototype;
    m.forEach = function(a, b) {
        tc(this);
        this.g.forEach(function(c, d) {
            $a(c, function(e) {
                a.call(b, e, d, this)
            }, this)
        }, this)
    }
    ;
    m.wb = function() {
        tc(this);
        for (var a = this.g.rb(), b = this.g.wb(), c = [], d = 0; d < b.length; d++)
            for (var e = a[d], f = 0; f < e.length; f++)
                c.push(b[d]);
        return c
    }
    ;
    m.rb = function(a) {
        tc(this);
        var b = [];
        if ("string" === typeof a)
            wc(this, a) && (b = eb(b, this.g.get(uc(this, a))));
        else {
            a = this.g.rb();
            for (var c = 0; c < a.length; c++)
                b = eb(b, a[c])
        }
        return b
    }
    ;
    m.set = function(a, b) {
        tc(this);
        this.j = null;
        a = uc(this, a);
        wc(this, a) && (this.i -= this.g.get(a).length);
        this.g.set(a, [b]);
        this.i += 1;
        return this
    }
    ;
    m.get = function(a, b) {
        if (!a)
            return b;
        a = this.rb(a);
        return 0 < a.length ? String(a[0]) : b
    }
    ;
    m.toString = function() {
        if (this.j)
            return this.j;
        if (!this.g)
            return "";
        for (var a = [], b = this.g.wb(), c = 0; c < b.length; c++) {
            var d = b[c]
              , e = encodeURIComponent(String(d));
            d = this.rb(d);
            for (var f = 0; f < d.length; f++) {
                var g = e;
                "" !== d[f] && (g += "=" + encodeURIComponent(String(d[f])));
                a.push(g)
            }
        }
        return this.j = a.join("&")
    }
    ;
    var ic = function(a) {
        var b = new kc;
        b.j = a.j;
        a.g && (b.g = new Yb(a.g),
        b.i = a.i);
        return b
    }
      , uc = function(a, b) {
        b = String(b);
        a.o && (b = b.toLowerCase());
        return b
    }
      , qc = function(a, b) {
        b && !a.o && (tc(a),
        a.j = null,
        a.g.forEach(function(c, d) {
            var e = d.toLowerCase();
            d != e && (vc(this, d),
            vc(this, e),
            0 < c.length && (this.j = null,
            this.g.set(uc(this, e), fb(c)),
            this.i += c.length))
        }, a));
        a.o = b
    };
    var xc = navigator.userAgent
      , yc = new ec(location.href)
      , zc = "MacIntel" === navigator.platform && 1 < navigator.maxTouchPoints
      , Ac = xc.includes("iPad") || xc.includes("iPhone") || xc.includes("iPod") || zc
      , Bc = xc.toLowerCase().includes("gsa") || xc.includes("GoogleApp")
      , Cc = Bc && Ac
      , Dc = Bc && !Ac
      , Ec = Ac || xc.includes("Android") || xc.includes("Mobile") || xc.includes("Silk") || xc.includes("UCBrowser") || xc.includes("UCWEB")
      , Fc = !!document.querySelector("body.hp");
    xc.includes("GT-I9300") && xc.includes("Chrome");
    var Gc = yc.i.includes("/logos/") && yc.i.includes(".html")
      , Ic = function() {
        return !!document.getElementById("fkbx") || Hc()
    }
      , Hc = function() {
        var a = yc.g.get("ntp");
        return "1" == a || "2" == a
    }
      , Jc = function() {
        return "1" == yc.g.get("fpdoodle") && !!document.getElementById("fpdoodle")
    }
      , Kc = function() {
        return !!document.querySelector("body#iframedoodle")
    };
    var Lc = function(a, b) {
        for (var c = [], d = 1; d < arguments.length; ++d)
            c[d - 1] = arguments[d];
        if (a)
            for (d = 0; d < c.length; d += 2) {
                var e = c[d]
                  , f = c[d + 1]
                  , g = a.style;
                g && e in g ? g[e] = f : e in a && (a[e] = f)
            }
    }
      , Mc = Date.now
      , Nc = function() {
        return self.performance.now()
    }
      , Oc = ["Moz", "ms", "O", "webkit"]
      , Pc = function(a, b, c) {
        if (a) {
            for (var d = n(Oc), e = d.next(); !e.done; e = d.next())
                a.style[e.value + b] = c;
            a.style[b.charAt(0).toLowerCase() + b.substr(1)] = c
        }
    }
      , Qc = ["", "moz", "ms", "o", "webkit"]
      , Rc = function(a, b) {
        if (!a)
            return null;
        for (var c = n(Qc), d = c.next(); !d.done; d = c.next()) {
            d = d.value;
            var e = b;
            0 < d.length && (e = b.charAt(0).toUpperCase() + b.substr(1));
            d += e;
            if ("undefined" != typeof a[d])
                return d
        }
        return null
    }
      , Sc = function(a) {
        var b;
        (b = (b = !Cc) || Hc()) ? Rb(a) : (b = window.top.location,
        a = a instanceof Db ? a : Gb(a),
        b.assign(Eb(a)))
    }
      , Tc = function(a, b) {
        var c;
        return (c = window.google && void 0 !== window.google.doodle ? window.google.doodle : null) && void 0 != c[a] ? c[a] : b
    }
      , Uc = function(a) {
        return 0 == a.indexOf("//") ? "https:" + a : a
    }
      , Vc = function() {
        return Uc(Tc("shortlink", null) || "//www.google.com/?doodle=144867964")
    }
      , Wc = function(a) {
        return Uc(Tc(a, null) || Vc())
    }
      , Xc = function() {
        var a = Tc("doodle_args", {}).is_dogfood;
        return null != a ? a : !1
    }
      , Yc = Tc("alt", "")
      , Zc = Tc("hl", "en")
      , $c = Tc("gl", "")
      , bd = function(a, b, c) {
        var d = Math.max(0, c - 230) + (document.querySelector("div.og-pdp") ? 36 : 12);
        Lc(a, "width", b + "px", "height", c + "px");
        ad(d)
    }
      , ad = function(a) {
        a += "px";
        var b = document.getElementById("lga");
        b && Lc(b, "marginBottom", a);
        Ic() || ((b = document.getElementById("searchform")) && Lc(b, "transform", "translateY(" + a + ")"),
        a = new UIEvent("resize",{
            bubbles: !1,
            qf: !1,
            view: window,
            detail: 0
        }),
        window.dispatchEvent(a))
    }
      , cd = null
      , dd = null
      , ed = null;
    var u = function(a, b) {
        this.x = void 0 !== a ? a : 0;
        this.y = void 0 !== b ? b : 0
    }
      , fd = function(a) {
        return Math.sqrt(a.x * a.x + a.y * a.y)
    }
      , gd = function(a, b) {
        return new u(a.x - b.x,a.y - b.y)
    }
      , hd = function(a, b) {
        return new u(a.x + b.x,a.y + b.y)
    };
    u.prototype.ceil = function() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this
    }
    ;
    u.prototype.floor = function() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this
    }
    ;
    u.prototype.round = function() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this
    }
    ;
    u.prototype.scale = function(a, b) {
        this.x *= a;
        this.y *= "number" === typeof b ? b : a;
        return this
    }
    ;
    document.getElementById("hplogo");
    document.getElementById("hpcanvas");
    var id = new ec("https://www.google.com/doodles/halloween-2016");
    id.g.set("hl", Zc);
    var jd = id.toString()
      , kd = new u(320,110)
      , ld = new u(320,180)
      , md = !1
      , nd = new u(370,60);
    var pd = function(a, b, c, d, e, f) {
        if (6 == arguments.length)
            od(this, a, b, c, d, e, f);
        else {
            if (0 != arguments.length)
                throw Error("p");
            this.j = this.o = 1;
            this.s = this.v = this.i = this.g = 0
        }
    }
      , qd = function(a) {
        return new pd(a.j,a.s,a.v,a.o,a.i,a.g)
    }
      , od = function(a, b, c, d, e, f, g) {
        if ("number" !== typeof b || "number" !== typeof c || "number" !== typeof d || "number" !== typeof e || "number" !== typeof f || "number" !== typeof g)
            throw Error("q");
        a.j = b;
        a.s = c;
        a.v = d;
        a.o = e;
        a.i = f;
        a.g = g;
        return a
    };
    pd.prototype.scale = function(a, b) {
        this.j *= a;
        this.s *= a;
        this.v *= b;
        this.o *= b;
        return this
    }
    ;
    var rd = function(a, b, c) {
        a.i += b * a.j + c * a.v;
        a.g += b * a.s + c * a.o;
        return a
    };
    pd.prototype.rotate = function(a, b, c) {
        var d = new pd
          , e = Math.cos(a);
        a = Math.sin(a);
        b = od(d, e, a, -a, e, b - b * e + c * a, c - b * a - c * e);
        return sd(this, b)
    }
    ;
    pd.prototype.toString = function() {
        return "matrix(" + [this.j, this.s, this.v, this.o, this.i, this.g].join() + ")"
    }
    ;
    var sd = function(a, b) {
        var c = a.j
          , d = a.v;
        a.j = b.j * c + b.s * d;
        a.v = b.v * c + b.o * d;
        a.i += b.i * c + b.g * d;
        c = a.s;
        d = a.o;
        a.s = b.j * c + b.s * d;
        a.o = b.v * c + b.o * d;
        a.g += b.i * c + b.g * d;
        return a
    };
    pd.prototype.transform = function(a, b, c, d, e) {
        var f = b;
        for (b += 2 * e; f < b; ) {
            e = a[f++];
            var g = a[f++];
            c[d++] = e * this.j + g * this.v + this.i;
            c[d++] = e * this.s + g * this.o + this.g
        }
    }
    ;
    var v = function() {
        this.Qa = new pd;
        this.opacity = 1;
        this.$ = 0;
        this.Aa = !0;
        this.children = [];
        this.parent = null;
        this.Nc = this.Yb = this.qd = 0;
        this.La = new td;
        this.Bc = null
    };
    v.prototype.Wa = function() {
        return this.Aa
    }
    ;
    v.prototype.Ka = function() {
        return this.children
    }
    ;
    v.prototype.getParent = function() {
        return this.parent
    }
    ;
    var w = function(a, b) {
        null != b.parent && b.parent.removeChild(b);
        b.od(a);
        a.children.push(b);
        ud(b)
    };
    v.prototype.removeChild = function(a) {
        var b = this.children.indexOf(a);
        -1 != b && (this.children.splice(b, 1),
        a.Ec());
        ud(a)
    }
    ;
    var x = function(a) {
        var b;
        null === (b = a.parent) || void 0 === b ? void 0 : b.removeChild(a)
    }
      , vd = function(a) {
        for (var b = 0; b < a.children.length; b++)
            a.children[b].Ec();
        a.children = []
    };
    v.prototype.Ec = function() {
        this.parent = null
    }
    ;
    v.prototype.od = function(a) {
        this.parent = a
    }
    ;
    v.prototype.update = function() {}
    ;
    v.prototype.Ba = function() {}
    ;
    var y = function(a, b, c) {
        var d = a.Qa
          , e = -a.Qa.g;
        d.i += -a.Qa.i;
        d.g += e;
        d = a.Qa;
        e = void 0 === c ? b.y : c;
        d.i += void 0 === c ? b.x : b;
        d.g += e;
        ud(a)
    }
      , z = function(a) {
        return new u(a.Qa.i,a.Qa.g)
    };
    v.prototype.setScale = function(a) {
        0 >= a && (a = 1E-4);
        this.Db() && this.Qa.scale(1 / this.Qa.j, 1 / this.Qa.o);
        this.Qa.scale(a, a);
        ud(this)
    }
    ;
    v.prototype.Db = function() {
        return this.Qa.j
    }
    ;
    v.prototype.rotate = function(a) {
        this.Nc += a;
        this.Qa.rotate(a, 0, 0);
        ud(this)
    }
    ;
    var wd = function(a, b) {
        a.qd = b;
        ud(a)
    }
      , xd = function(a) {
        if (!a.Bc) {
            var b = a.parent ? rd(sd(qd(xd(a.parent)), a.Qa), a.Yb, a.qd) : rd(qd(a.Qa), a.Yb, a.qd);
            a.Bc = b
        }
        return a.Bc
    }
      , ud = function(a) {
        a.Bc = null;
        for (var b = 0; b < a.children.length; b++)
            ud(a.children[b])
    }
      , yd = function(a, b) {
        for (a.La.index = -1; null != a; ) {
            var c = a.Ka();
            -1 == a.La.index && b(a) && (a.La.index = c.length);
            a.La.index++;
            a.La.index < c.length ? (c[a.La.index].La.index = -1,
            a = c[a.La.index]) : a = a.getParent()
        }
    }
      , td = function() {
        this.i = this.g = this.index = 0
    };
    var zd = function() {
        v.call(this);
        this.v = !1
    };
    p(zd, v);
    m = zd.prototype;
    m.update = function(a) {
        this.v || (this.v = !0,
        this.jd());
        this.kd(a);
        this.$a() && this.Lc()
    }
    ;
    m.kd = function() {}
    ;
    m.jd = function() {}
    ;
    m.Lc = function() {}
    ;
    m.$a = function() {
        return !1
    }
    ;
    var C = function(a) {
        zd.call(this);
        this.g = !1;
        this.jd = a
    };
    p(C, zd);
    C.prototype.update = function(a) {
        this.g = !0;
        return zd.prototype.update.call(this, a)
    }
    ;
    C.prototype.$a = function() {
        return this.g
    }
    ;
    var D = function(a, b, c) {
        zd.call(this);
        this.duration = a;
        this.g = 0;
        b && (this.j = b);
        c && (this.S = c)
    };
    p(D, zd);
    D.prototype.kd = function(a) {
        this.j && this.j(a)
    }
    ;
    D.prototype.Lc = function() {
        this.S && this.S()
    }
    ;
    D.prototype.update = function(a) {
        this.g += a;
        return zd.prototype.update.call(this, a)
    }
    ;
    D.prototype.$a = function() {
        return this.g >= this.duration
    }
    ;
    var Ad = Number.POSITIVE_INFINITY;
    var Bd = function(a) {
        zd.call(this);
        this.actions = a
    };
    p(Bd, zd);
    Bd.prototype.update = function(a) {
        zd.prototype.update.call(this, a);
        for (var b = n(this.actions), c = b.next(); !c.done; c = b.next())
            c = c.value,
            c.$a() || c.update(a)
    }
    ;
    Bd.prototype.$a = function() {
        for (var a = n(this.actions), b = a.next(); !b.done; b = a.next())
            if (!b.value.$a())
                return !1;
        return !0
    }
    ;
    var Cd = function(a, b, c, d, e, f, g, h) {
        this.v = a;
        this.S = b;
        this.g = c;
        this.j = d;
        this.i = e;
        this.o = f;
        this.s = g;
        this.H = h
    }
      , Dd = function(a, b) {
        if (0 == b)
            return a.v;
        if (1 == b)
            return a.s;
        var c = r(a.v, a.g, b)
          , d = r(a.g, a.i, b);
        a = r(a.i, a.s, b);
        c = r(c, d, b);
        d = r(d, a, b);
        return r(c, d, b)
    }
      , Ed = function(a, b) {
        if (0 == b)
            return a.S;
        if (1 == b)
            return a.H;
        var c = r(a.S, a.j, b)
          , d = r(a.j, a.o, b);
        a = r(a.o, a.H, b);
        c = r(c, d, b);
        d = r(d, a, b);
        return r(c, d, b)
    }
      , Fd = function(a, b) {
        return new u(Dd(a, b),Ed(a, b))
    }
      , Gd = function(a, b) {
        var c = (b - a.v) / (a.s - a.v);
        if (0 >= c)
            return 0;
        if (1 <= c)
            return 1;
        for (var d = 0, e = 1, f = 0, g = 0; 8 > g; g++) {
            f = Dd(a, c);
            var h = (Dd(a, c + 1E-6) - f) / 1E-6;
            if (1E-6 > Math.abs(f - b))
                return c;
            if (1E-6 > Math.abs(h))
                break;
            else
                f < b ? d = c : e = c,
                c -= (f - b) / h
        }
        for (g = 0; 1E-6 < Math.abs(f - b) && 8 > g; g++)
            f < b ? (d = c,
            c = (c + e) / 2) : (e = c,
            c = (c + d) / 2),
            f = Dd(a, c);
        return c
    };
    var Hd = function(a, b, c) {
        var d = new Cd(0,0,a,b,c,1,1,1);
        return function(e) {
            return Ed(d, Gd(d, e))
        }
    }
      , Id = Hd(.25, .1, .25)
      , Jd = function(a, b, c, d) {
        d = void 0 === d ? Id : d;
        return b + d(a) * (c - b)
    }
      , Kd = function(a) {
        return a
    }
      , Ld = Hd(.4, 0, 1)
      , Md = Hd(0, 0, .6)
      , Nd = Hd(.6, 0, .4);
    var E = function(a, b, c, d, e, f) {
        f = void 0 === f ? Kd : f;
        D.call(this, b, null, e);
        this.s = a;
        this.i = c;
        this.o = d;
        this.H = f
    };
    p(E, D);
    E.prototype.update = function(a) {
        this.i || (this.i = z(this.s));
        a = D.prototype.update.call(this, a);
        var b = Tb(this.g / this.duration, 1)
          , c = Jd(b, this.i.x, this.o.x, this.H);
        b = Jd(b, this.i.y, this.o.y, this.H);
        y(this.s, c, b);
        return a
    }
    ;
    var F = function() {
        v.apply(this, arguments);
        this.v = [];
        this.ha = []
    };
    p(F, v);
    F.prototype.update = function(a) {
        var b;
        if (0 < this.v.length && 0 < a) {
            var c = this.v[0];
            c.update(a);
            c.$a() && this.v.length && this.v[0] === c && this.v.shift()
        }
        for (c = 0; c < this.ha.length; c++)
            this.ha[c].update(a),
            (null === (b = this.ha[c]) || void 0 === b ? 0 : b.$a()) && this.ha.splice(c--, 1)
    }
    ;
    var G = function(a, b) {
        a.v.push(b)
    }
      , H = function(a, b) {
        a.v.push(new D(b))
    }
      , I = function(a, b, c) {
        a.v.push(new D(b,null,c))
    }
      , Od = function(a, b) {
        I(a, 0, function() {
            J(a, b)
        })
    }
      , Pd = function(a, b, c, d, e, f) {
        a.v.push(new E(a,b,c,d,e,f))
    }
      , K = function(a) {
        a.v = []
    }
      , Qd = function(a) {
        a.ha = []
    }
      , J = function(a, b) {
        a.ha.push(b)
    };
    var Rd = function(a, b, c, d, e) {
        e = void 0 === e ? Kd : e;
        D.call(this, b, null, void 0 === d ? function() {}
        : d);
        this.o = a;
        this.i = c;
        this.s = e
    };
    p(Rd, D);
    Rd.prototype.update = function(a) {
        D.prototype.update.call(this, a);
        a = Fd(this.i, this.s(Tb(this.g / this.duration, 1)));
        y(this.o, a.x, a.y)
    }
    ;
    var Sd = function(a, b, c, d, e, f) {
        f = void 0 === f ? Kd : f;
        D.call(this, b, null, void 0 === e ? function() {}
        : e);
        this.i = a;
        this.easing = f;
        this.o = c;
        this.s = d
    };
    p(Sd, D);
    Sd.prototype.update = function(a) {
        a = D.prototype.update.call(this, a);
        var b = Jd(Tb(this.g / this.duration, 1), this.o, this.s, this.easing);
        this.i.opacity = b;
        return a
    }
    ;
    var Td = function(a) {
        this.Mb = a;
        this.j = !1;
        this.v = []
    };
    Td.prototype.i = function() {
        if (!this.j) {
            this.j = !0;
            for (var a = n(this.v), b = a.next(); !b.done; b = a.next())
                b = b.value,
                b()
        }
    }
    ;
    Td.prototype.preload = function() {}
    ;
    Td.prototype.Kc = function() {
        return this.j
    }
    ;
    var Ud = function(a, b) {
        a.j ? b() : a.v.push(b)
    }
      , Vd = function(a, b) {
        return Promise.all(a.map(function(c) {
            return c.preload()
        })).then(b)
    };
    var Wd = function(a) {
        Td.call(this, a);
        this.image = new Image
    };
    p(Wd, Td);
    Wd.prototype.preload = function() {
        var a = this;
        if (this.image.src)
            return Promise.resolve(this.image);
        var b, c = new Promise(function(e) {
            return b = e
        }
        ), d = function() {
            a.i();
            b(a.image)
        };
        this.image.decode ? (this.image.src = this.Mb,
        this.image.decode().then(d, function(e) {
            console.error(e);
            d()
        })) : (this.image.onload = d,
        this.image.src = this.Mb);
        (this.image.complete || "complete" == this.image.readyState) && d();
        return c
    }
    ;
    var Xd = function(a, b) {
        this.g = [];
        this.i = [];
        b = n(b);
        for (var c = b.next(); !c.done; c = b.next()) {
            var d = c.value;
            c = new Wd(a + d.filename);
            d = d.size;
            this.g.push(c);
            this.i.push(d)
        }
    }
      , Yd = function(a) {
        return "number" === typeof a ? a : a[0]
    };
    Xd.prototype.preload = function(a, b) {
        var c = Zd(this, a);
        return (new Promise(function(d) {
            Ud(c, d);
            c.preload()
        }
        )).then(function() {
            return b && b()
        })
    }
    ;
    Xd.prototype.Kc = function() {
        return Zd(this, void 0).Kc()
    }
    ;
    var Zd = function(a, b) {
        return a.g[Yd(b)]
    };
    Xd.prototype.Hc = function() {
        return Zd(this, void 0).image
    }
    ;
    var $d = function(a, b) {
        return b[3]
    };
    Xd.prototype.Ga = function(a) {
        return a[4]
    }
    ;
    Xd.prototype.Db = function(a) {
        return a[5] || 1
    }
    ;
    Xd.prototype.Ba = function(a, b, c, d, e, f, g) {
        e = void 0 === e ? 1 : e;
        f = void 0 === f ? !1 : f;
        g = void 0 === g ? !1 : g;
        var h = void 0 === h ? !1 : h;
        var k = a[3]
          , l = this.Ga(a);
        b.save();
        b.translate(c, d);
        b.scale(g ? -e : e, h ? -e : e);
        var q = -k * (f ? .5 : g ? 1 : 0)
          , t = a[1]
          , B = a[2]
          , A = a[3]
          , T = a[4];
        void 0 == k ? (c = t,
        d = B,
        e = A,
        g = T,
        f = q = 0,
        k = A,
        l = T) : void 0 == q ? (c = t,
        d = B,
        e = A,
        g = T,
        f = q = 0) : (c = t + 0,
        d = B + 0,
        e = k,
        g = l,
        f = -l * (f ? .5 : h ? 1 : 0));
        c < t && (h = t - c,
        c = t,
        e -= h,
        q += h,
        k -= h);
        d < B && (h = B - d,
        d = B,
        g -= h,
        f += h,
        l -= h);
        c + e > t + A && (t = c + e - (t + A),
        e -= t,
        k -= t);
        d + g > B + T && (B = d + g - (B + T),
        g -= B,
        l -= B);
        a = Zd(this, a);
        if (!a.Kc())
            throw Error("r");
        0 < e && 0 < g && b.drawImage(a.image, c, d, e, g, q, f, k, l);
        b.restore()
    }
    ;
    var ae = function(a, b, c) {
        c = void 0 === c ? 1 : c;
        var d = a.Db(b);
        a = a.i[Yd(b)];
        return c * a[0] / d + "px " + c * a[1] / d + "px"
    }
      , ce = function(a) {
        var b = be
          , c = document.createElement("div");
        Lc(c, "position", "absolute");
        Lc(c, "userSelect", "none", "MozUserSelect", "none", "webkitUserSelect", "none", "webkitTapHighlightColor", "rgba(0,0,0,0)");
        c.unselectable = "on";
        var d = a[3]
          , e = b.Ga(a)
          , f = b.Db(a);
        f && 1 != f && b.i[Yd(a)] && (d = Math.floor(d / f),
        e = Math.floor(e / f));
        Lc(c, "width", d + "px", "height", e + "px");
        var g;
        d = g = void 0 === g ? 1 : g;
        d = void 0 === d ? 1 : d;
        e = b.Db(a);
        a = [c, "url(" + Zd(b, a).Mb + ") " + (-(d * a[1] / e) + "px " + -(d * a[2] / e) + "px/") + ae(b, a, g) + " no-repeat", ae(b, a)];
        b = a[0];
        c = a[2];
        Lc(b, "background", a[1]);
        c && Lc(b, "backgroundSize", c);
        return b
    };
    var ee = function() {
        Xd.call(this, "./", de)
    };
    p(ee, Xd);
    Ja(ee);
    var de = [{
        filename: "window-fish-sprite.png",
        size: [354, 462]
    }, {
        filename: "level2sun-sprite.png",
        size: [778, 64]
    }, {
        filename: "symbols.png",
        size: [190, 32]
    }, {
        filename: "progress.png",
        size: [751, 884]
    }, {
        filename: "cat-spell-sprites.png",
        size: [4147, 321]
    }, {
        filename: "cat-sprites.png",
        size: [3626, 685]
    }, {
        filename: "ocean-bg-sprite.png",
        size: [2106, 416]
    }, {
        filename: "ocean-sprite.png",
        size: [2676, 835]
    }, {
        filename: "ocean-boss-fight.png",
        size: [1590, 1879]
    }, {
        filename: "ocean-boss-intro-sprite.png",
        size: [5217, 385]
    }, {
        filename: "ocean-boss-lose-sprite.png",
        size: [3714, 511]
    }, {
        filename: "ocean-boss-victory-sprite.png",
        size: [3455, 503]
    }, {
        filename: "volcano-boss-attack-sprite.png",
        size: [2961, 723]
    }, {
        filename: "volcano-boss-inhale-sprite.png",
        size: [4443, 360]
    }, {
        filename: "volcano-boss-hit-sprite.png",
        size: [2961, 723]
    }, {
        filename: "volcano-boss-intro-sprite.png",
        size: [3455, 723]
    }, {
        filename: "volcano-boss-victory-one-sprite.png",
        size: [3455, 723]
    }, {
        filename: "volcano-boss-victory-two-sprite.png",
        size: [2961, 723]
    }, {
        filename: "angler-entry-sprite.png",
        size: [2027, 1014]
    }, {
        filename: "angler-misc-sprite.png",
        size: [2635, 360]
    }, {
        filename: "angler-hit-sprite.png",
        size: [2839, 675]
    }, {
        filename: "angler-attack-one-sprite.png",
        size: [3369, 723]
    }, {
        filename: "angler-attack-two-sprite.png",
        size: [3931, 360]
    }, {
        filename: "angler-attack-three-sprite.png",
        size: [3369, 723]
    }, {
        filename: "angler-lose-one-sprite.png",
        size: [3855, 723]
    }, {
        filename: "angler-lose-two-sprite.png",
        size: [3212, 723]
    }, {
        filename: "angler-lose-three-sprite.png",
        size: [3855, 360]
    }, {
        filename: "angler-lose-four-sprite.png",
        size: [1926, 1086]
    }, {
        filename: "angler-lose-five-sprite.png",
        size: [1926, 1086]
    }, {
        filename: "angler-victory-one-sprite.png",
        size: [2027, 1014]
    }, {
        filename: "angler-victory-two-sprite.png",
        size: [4463, 336]
    }, {
        filename: "anenome-sprite.png",
        size: [1287, 196]
    }, {
        filename: "jellyfish-cinematic-sprite.png",
        size: [1545, 1240]
    }, {
        filename: "jellyfish-sprite.png",
        size: [2331, 527]
    }, {
        filename: "boops-sprite.png",
        size: [2048, 1126]
    }, {
        filename: "cta-png-sprite.png",
        size: [1311, 163]
    }, {
        filename: "level1-png-sprite.png",
        size: [1755, 255]
    }, {
        filename: "whirlpool-one-sprite.png",
        size: [640, 2569]
    }, {
        filename: "whirlpool-two-sprite.png",
        size: [3212, 640]
    }, {
        filename: "gameover-png-sprite.png",
        size: [1890, 430]
    }, {
        filename: "level3-environment-sprite.png",
        size: [693, 796]
    }, {
        filename: "shield-sprite.png",
        size: [1986, 303]
    }, {
        filename: "vamp-tank-sprite.png",
        size: [1081, 1094]
    }, {
        filename: "vamp-tank-transition-sprite.png",
        size: [3627, 655]
    }, {
        filename: "vamp-tank-victory-sprite.png",
        size: [2558, 194]
    }, {
        filename: "vamp-squid-sprite.png",
        size: [1519, 1701]
    }, {
        filename: "vamp-squid-lose-sprite.png",
        size: [2813, 783]
    }, {
        filename: "vamp-squid-victory-sprite.png",
        size: [2121, 559]
    }]
      , fe = [35, 1189, 83, 46, 24]
      , ge = [35, 1238, 103, 43, 32]
      , he = [36, 916, 0, 189, 124]
      , ie = [34, 1975, 737, 60, 22]
      , je = [34, 1286, 0, 640, 360]
      , ke = [34, 0, 363, 640, 360]
      , le = [34, 643, 363, 640, 360]
      , me = [34, 1955, 946, 80, 65]
      , ne = [34, 1955, 946, 80, 65]
      , oe = [34, 1286, 1061, 80, 65]
      , pe = [21, 0, 0, 559, 360]
      , qe = [33, 140, 363, 127, 161]
      , re = [33, 2194, 0, 137, 162]
      , se = [32, 161, 1069, 150, 171]
      , te = [42, 0, 900, 206, 194]
      , ue = [46, 0, 0, 253, 259]
      , ve = [45, 711, 568, 234, 281]
      , we = [39, 1771, 110, 71, 71]
      , xe = [39, 1697, 110, 71, 71]
      , ye = [39, 1845, 158, 45, 45]
      , ze = [39, 1845, 110, 45, 45]
      , Ae = [39, 1771, 184, 71, 71]
      , Be = [39, 1697, 184, 71, 71]
      , Ce = [39, 1697, 0, 178, 52]
      , De = [39, 1697, 55, 178, 52]
      , Ee = [39, 1771, 258, 71, 71]
      , Fe = [39, 1697, 258, 71, 71]
      , Ge = [3, 676, 237, 64, 54]
      , He = [3, 676, 294, 64, 54]
      , Ie = [33, 1286, 0, 225, 222]
      , Je = [39, 1286, 0, 408, 430]
      , Ke = [7, 0, 0, 700, 549]
      , Le = [39, 0, 0, 640, 360]
      , Me = [36, 0, 0, 455, 65]
      , Ne = [36, 458, 0, 455, 65]
      , Oe = [36, 567, 183, 78, 63]
      , Pe = [36, 1705, 108, 50, 50]
      , Qe = [36, 1048, 175, 42, 31]
      , Re = [36, 1183, 202, 42, 31]
      , Se = [33, 643, 0, 640, 360]
      , Te = [34, 0, 726, 640, 360]
      , Ue = [34, 643, 726, 640, 360]
      , Ve = [19, 1286, 0, 640, 360]
      , We = [36, 886, 68, 20, 40]
      , Xe = [3, 676, 351, 43, 370]
      , Ye = [8, 1062, 257, 528, 254]
      , Ze = [8, 0, 710, 520, 193]
      , $e = [8, 523, 710, 520, 193]
      , af = [8, 1046, 710, 520, 193]
      , bf = [8, 0, 906, 520, 193]
      , cf = [3, 0, 0, 512, 290]
      , df = [6, 0, 0, 700, 416]
      , ef = [6, 703, 0, 700, 416]
      , ff = [6, 1406, 0, 700, 416]
      , gf = [36, 1705, 161, 50, 50]
      , hf = [39, 1845, 254, 45, 45]
      , jf = [39, 1845, 206, 45, 45]
      , kf = [39, 1697, 332, 45, 45]
      , lf = [39, 1845, 302, 45, 45]
      , mf = [39, 210, 363, 207, 45]
      , nf = [39, 0, 363, 207, 45]
      , of = [39, 420, 363, 207, 45]
      , pf = [39, 630, 363, 207, 45]
      , qf = [39, 1793, 332, 45, 45]
      , rf = [39, 1745, 332, 45, 45]
      , sf = [33, 1050, 363, 85, 56]
      , tf = [39, 643, 0, 640, 360]
      , uf = [40, 0, 363, 640, 360]
      , vf = [[34, 0, 0, 640, 360], [34, 643, 0, 640, 360], je, ke, le]
      , wf = [me, ne, [34, 1286, 993, 80, 65], [34, 1369, 993, 80, 65], [34, 1369, 993, 80, 65], [34, 1452, 993, 80, 65], [34, 1535, 993, 80, 65], [34, 1618, 1010, 80, 65], [34, 1701, 1010, 80, 65], [34, 1784, 1010, 80, 65], [34, 1955, 1014, 80, 65], [34, 1867, 1021, 80, 65], oe]
      , xf = [se, [32, 314, 1069, 150, 171], [32, 467, 1069, 150, 171], [32, 620, 1069, 150, 171], [32, 773, 1069, 150, 171], [32, 926, 1069, 150, 171], [32, 1079, 1069, 150, 171]]
      , yf = [te, [42, 209, 900, 206, 194], [42, 418, 900, 206, 194], [42, 627, 900, 206, 194], [42, 836, 900, 206, 194]]
      , zf = [ue, [46, 0, 0, 253, 259], [46, 256, 0, 253, 259], [46, 512, 0, 253, 259], [46, 768, 0, 253, 259], [46, 1024, 0, 253, 259], [46, 1280, 0, 253, 259], [46, 1536, 0, 253, 259], [46, 1536, 0, 253, 259], [46, 1536, 0, 253, 259], [46, 1536, 0, 253, 259], [46, 1536, 0, 253, 259], [46, 1792, 0, 253, 259], [46, 2048, 0, 253, 259], [46, 2304, 0, 253, 259], [46, 2560, 0, 253, 259], [46, 0, 262, 253, 259], [46, 256, 262, 253, 259], [46, 512, 262, 253, 259], [46, 768, 262, 253, 259], [46, 1024, 262, 253, 259], [46, 1280, 262, 253, 259], [46, 1280, 262, 253, 259], [46, 1536, 262, 253, 259], [46, 1792, 262, 253, 259], [46, 2048, 262, 253, 259], [46, 2304, 262, 253, 259], [46, 2560, 262, 253, 259], [46, 0, 524, 253, 259], [46, 256, 524, 253, 259], [46, 256, 524, 253, 259], [46, 256, 524, 253, 259], [46, 256, 524, 253, 259], [46, 256, 524, 253, 259], [46, 256, 524, 253, 259], [46, 256, 524, 253, 259], [46, 512, 524, 253, 259], [46, 768, 524, 253, 259], [46, 1024, 524, 253, 259], [46, 1280, 524, 253, 259], [46, 1536, 524, 253, 259], [46, 1792, 524, 253, 259], [46, 2048, 524, 253, 259], [46, 2304, 524, 253, 259], [46, 1536, 524, 253, 259], [46, 1792, 524, 253, 259], [46, 2560, 524, 253, 259], [46, 2304, 524, 253, 259], [46, 1536, 524, 253, 259], [46, 1792, 524, 253, 259], [46, 2560, 524, 253, 259]]
      , Af = [ve, [45, 948, 568, 234, 281], [45, 1185, 568, 234, 281], [45, 0, 852, 234, 281], [45, 0, 852, 234, 281], [45, 0, 852, 234, 281], [45, 237, 852, 234, 281], [45, 474, 852, 234, 281], [45, 711, 852, 234, 281], [45, 948, 852, 234, 281], [45, 1185, 852, 234, 281], [45, 0, 1136, 234, 281], [45, 237, 1136, 234, 281], [45, 474, 1136, 234, 281], [45, 711, 1136, 234, 281], [45, 948, 1136, 234, 281], [45, 1185, 1136, 234, 281], [45, 0, 1420, 234, 281], [45, 237, 1420, 234, 281], [45, 474, 1420, 234, 281], [45, 711, 1420, 234, 281], [45, 948, 1420, 234, 281], [45, 1185, 1420, 234, 281]]
      , Bf = [[35, 83, 83, 76, 76], [35, 162, 83, 76, 76], [35, 241, 83, 76, 76], [35, 320, 83, 76, 76], [35, 399, 83, 76, 76], [35, 478, 83, 76, 76], [35, 557, 83, 76, 76], [35, 636, 83, 76, 76], [35, 715, 83, 76, 76], [35, 794, 83, 76, 76], [35, 873, 83, 76, 76], [35, 320, 83, 76, 76], [35, 952, 83, 76, 76], [35, 1031, 83, 76, 76], [35, 1110, 83, 76, 76], [35, 1110, 83, 76, 76]]
      , Cf = [[35, 0, 0, 80, 80], [35, 83, 0, 80, 80], [35, 166, 0, 80, 80], [35, 249, 0, 80, 80], [35, 332, 0, 80, 80], [35, 415, 0, 80, 80], [35, 498, 0, 80, 80], [35, 581, 0, 80, 80], [35, 664, 0, 80, 80], [35, 747, 0, 80, 80], [35, 830, 0, 80, 80], [35, 249, 0, 80, 80], [35, 913, 0, 80, 80], [35, 996, 0, 80, 80], [35, 1079, 0, 80, 80], [35, 1079, 0, 80, 80]]
      , Df = [Qe, [36, 648, 183, 42, 31], [36, 693, 183, 42, 31], [36, 738, 183, 42, 31], [36, 881, 193, 42, 31], [36, 926, 193, 42, 31], [36, 971, 193, 42, 31], [36, 1093, 202, 42, 31], [36, 1138, 202, 42, 31], Re]
      , Ef = [[36, 1228, 202, 41, 38], [36, 1272, 202, 41, 38], [36, 1316, 202, 41, 38], [36, 1360, 202, 41, 38], [36, 1404, 202, 41, 38], [36, 1448, 202, 41, 38], [36, 1492, 202, 41, 38], [36, 1536, 202, 41, 38], [36, 1016, 209, 41, 38], [36, 1705, 214, 41, 38], [36, 648, 217, 41, 38], [36, 692, 217, 41, 38]]
      , Ff = [[8, 0, 514, 520, 193], [8, 523, 514, 520, 193], [8, 523, 514, 520, 193], [8, 1046, 514, 520, 193], Ze, $e, af, bf, [8, 0, 710, 520, 193]];
    var Gf = ee.ya()
      , L = function(a, b) {
        F.call(this);
        this.V = this.ta = this.time = 0;
        this.S = this.j = null;
        this.Ab = !1;
        this.scale = 1;
        "number" === typeof a[0] ? this.j = {
            wa: a,
            duration: 0,
            x: 0,
            y: 0,
            z: null,
            children: null
        } : (this.S = a,
        this.j = this.S[this.V]);
        this.Qc = b ? b : Ia
    };
    p(L, F);
    var Hf = function(a) {
        for (var b = 0, c = 0; c < a.length; c++)
            b += 0 < a[c].duration ? a[c].duration : 83;
        return b
    }
      , If = function(a, b, c, d, e) {
        e = void 0 === e ? null : e;
        return a.map(function(f) {
            return {
                wa: f,
                duration: b,
                x: c,
                y: d,
                z: e,
                children: null
            }
        })
    }
      , M = function(a, b, c, d, e) {
        a = If(a, b, c, d, e);
        0 < a.length && (a[a.length - 1].duration = 0);
        return a
    };
    L.prototype.Ma = function() {
        var a = this.S[this.V].duration;
        0 < a && this.ta > a && (this.V = ++this.V % this.S.length,
        this.ta -= a);
        this.j = this.S[this.V]
    }
    ;
    L.prototype.update = function(a) {
        F.prototype.update.call(this, a);
        this.Qc(a);
        this.ta += a;
        this.S && this.Ma()
    }
    ;
    L.prototype.Ba = function(a) {
        F.prototype.Ba.call(this, a);
        if (this.j.wa) {
            var b = this.j.x || 0
              , c = this.j.y || 0;
            Gf.Ba(this.j.wa, a, b, c, this.scale, !0, this.Ab);
            if (this.j.children)
                for (var d = 0, e; e = this.j.children[d]; d++)
                    Gf.Ba(e.wa, a, b + (e.x || 0), c + (e.y || 0), 1, !0, this.Ab)
        }
    }
    ;
    L.prototype.Ga = function() {
        return Gf.Ga(this.j.wa)
    }
    ;
    var N = function(a, b) {
        b = void 0 === b ? new Map : b;
        L.call(this, a.get(0));
        this.Rb = a;
        this.Ja = b;
        this.state = 0
    };
    p(N, L);
    N.prototype.Ma = function() {
        var a = this.Rb.get(this.state);
        a && (this.S = a,
        L.prototype.Ma.call(this))
    }
    ;
    var O = function(a, b, c, d, e, f) {
        G(a, new Jf(a,b,c,d,e,f))
    }
      , Kf = function(a, b, c) {
        G(a, new Jf(a,1,b,null,null,function() {}
        ,c))
    };
    N.prototype.U = function(a) {
        this.Ja.has(this.state) && this.Ja.get(this.state).stop();
        this.state = a;
        this.V = this.ta = 0;
        this.Ma();
        this.Ja.has(a) && this.Ja.get(a).play()
    }
    ;
    N.prototype.Va = function(a, b, c, d) {
        this.opacity = a;
        J(this, new Sd(this,c,a,b,void 0 === d ? function() {}
        : d))
    }
    ;
    var Jf = function(a, b, c, d, e, f, g) {
        f = void 0 === f ? function() {}
        : f;
        D.call(this, c, null, function() {
            h.H.U(h.V);
            h.s()
        });
        var h = this;
        this.H = a;
        this.s = f;
        this.V = b;
        e && (this.o = new E(a,c,d,e));
        !e && g && (this.i = new Rd(a,c,g))
    };
    p(Jf, D);
    Jf.prototype.update = function(a) {
        this.o && this.o.update(a);
        this.i && this.i.update(a);
        D.prototype.update.call(this, a)
    }
    ;
    var Nf = function(a, b) {
        N.call(this, Lf);
        y(this, a, b);
        this.U(0);
        this.V = Math.floor(Math.random() * Mf.length)
    };
    p(Nf, N);
    var Qf = function(a) {
        var b = new L(Of);
        y(b, 0, -40);
        I(b, Pf, function() {
            x(b)
        });
        w(a, b)
    }
      , Mf = If([[31, 0, 95, 93, 101], [31, 0, 95, 93, 101], [31, 96, 95, 93, 101], [31, 96, 95, 93, 101], [31, 192, 95, 93, 101], [31, 192, 95, 93, 101], [31, 288, 95, 93, 101], [31, 288, 95, 93, 101], [31, 384, 95, 93, 101], [31, 384, 95, 93, 101], [31, 480, 95, 93, 101], [31, 480, 95, 93, 101], [31, 576, 95, 93, 101], [31, 576, 95, 93, 101], [31, 672, 95, 93, 101], [31, 672, 95, 93, 101], [31, 768, 95, 93, 101], [31, 768, 95, 93, 101], [31, 864, 95, 93, 101], [31, 864, 95, 93, 101], [31, 960, 95, 93, 101], [31, 960, 95, 93, 101], [31, 1056, 95, 93, 101], [31, 1056, 95, 93, 101], [31, 1152, 95, 93, 101], [31, 1152, 95, 93, 101]], 83, 0, 0)
      , Of = M([[31, 0, 0, 126, 92], [31, 129, 0, 126, 92], [31, 258, 0, 126, 92], [31, 387, 0, 126, 92], [31, 516, 0, 126, 92], [31, 645, 0, 126, 92], [31, 774, 0, 126, 92], [31, 903, 0, 126, 92], [31, 1032, 0, 126, 92], [31, 1161, 0, 126, 92]], 83, 0, 0)
      , Lf = new Map([[0, Mf]])
      , Pf = Hf(Of);
    var Rf = function(a) {
        Rf[" "](a);
        return a
    };
    Rf[" "] = Ia;
    var Tf = function(a, b) {
        var c = Sf;
        return Object.prototype.hasOwnProperty.call(c, a) ? c[a] : c[a] = b(a)
    };
    var Uf = Ab(Hb, "Opera"), Vf = Ab(Hb, "Trident") || Ab(Hb, "MSIE"), Wf = Ab(Hb, "Edge"), Xf = Ab(Hb, "Gecko") && !(Ab(Hb.toLowerCase(), "webkit") && !Ab(Hb, "Edge")) && !(Ab(Hb, "Trident") || Ab(Hb, "MSIE")) && !Ab(Hb, "Edge"), Yf = Ab(Hb.toLowerCase(), "webkit") && !Ab(Hb, "Edge"), Zf = function() {
        var a = Ha.document;
        return a ? a.documentMode : void 0
    }, $f;
    a: {
        var ag = ""
          , bg = function() {
            var a = Hb;
            if (Xf)
                return /rv:([^\);]+)(\)|;)/.exec(a);
            if (Wf)
                return /Edge\/([\d\.]+)/.exec(a);
            if (Vf)
                return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
            if (Yf)
                return /WebKit\/(\S+)/.exec(a);
            if (Uf)
                return /(?:Version)[ \/]?(\S+)/.exec(a)
        }();
        bg && (ag = bg ? bg[1] : "");
        if (Vf) {
            var cg = Zf();
            if (null != cg && cg > parseFloat(ag)) {
                $f = String(cg);
                break a
            }
        }
        $f = ag
    }
    var dg = $f, Sf = {}, eg = function(a) {
        return Tf(a, function() {
            for (var b = 0, c = sb(String(dg)).split("."), d = sb(String(a)).split("."), e = Math.max(c.length, d.length), f = 0; 0 == b && f < e; f++) {
                var g = c[f] || ""
                  , h = d[f] || "";
                do {
                    g = /(\d*)(\D*)(.*)/.exec(g) || ["", "", "", ""];
                    h = /(\d*)(\D*)(.*)/.exec(h) || ["", "", "", ""];
                    if (0 == g[0].length && 0 == h[0].length)
                        break;
                    b = Bb(0 == g[1].length ? 0 : parseInt(g[1], 10), 0 == h[1].length ? 0 : parseInt(h[1], 10)) || Bb(0 == g[2].length, 0 == h[2].length) || Bb(g[2], h[2]);
                    g = g[3];
                    h = h[3]
                } while (0 == b)
            }
            return 0 <= b
        })
    }, fg;
    if (Ha.document && Vf) {
        var gg = Zf();
        fg = gg ? gg : parseInt(dg, 10) || void 0
    } else
        fg = void 0;
    var hg = fg;
    var ig = !Vf || 9 <= Number(hg)
      , jg = Vf && !eg("9")
      , kg = function() {
        if (!Ha.addEventListener || !Object.defineProperty)
            return !1;
        var a = !1
          , b = Object.defineProperty({}, "passive", {
            get: function() {
                a = !0
            }
        });
        try {
            Ha.addEventListener("test", Ia, b),
            Ha.removeEventListener("test", Ia, b)
        } catch (c) {}
        return a
    }();
    var lg = function() {
        this.V = this.V;
        this.H = this.H
    };
    lg.prototype.V = !1;
    lg.prototype.Fc = function() {
        this.V || (this.V = !0,
        this.i())
    }
    ;
    var mg = function(a, b) {
        a.V ? b() : (a.H || (a.H = []),
        a.H.push(b))
    };
    lg.prototype.i = function() {
        if (this.H)
            for (; this.H.length; )
                this.H.shift()()
    }
    ;
    var ng = function(a) {
        a && "function" == typeof a.Fc && a.Fc()
    };
    var og = function(a, b) {
        this.type = a;
        this.g = this.target = b;
        this.defaultPrevented = this.i = !1
    };
    og.prototype.stopPropagation = function() {
        this.i = !0
    }
    ;
    og.prototype.preventDefault = function() {
        this.defaultPrevented = !0
    }
    ;
    var qg = function(a, b) {
        og.call(this, a ? a.type : "");
        this.relatedTarget = this.g = this.target = null;
        this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0;
        this.key = "";
        this.keyCode = 0;
        this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
        this.state = null;
        this.pointerId = 0;
        this.pointerType = "";
        this.j = null;
        if (a) {
            var c = this.type = a.type
              , d = a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : null;
            this.target = a.target || a.srcElement;
            this.g = b;
            if (b = a.relatedTarget) {
                if (Xf) {
                    a: {
                        try {
                            Rf(b.nodeName);
                            var e = !0;
                            break a
                        } catch (f) {}
                        e = !1
                    }
                    e || (b = null)
                }
            } else
                "mouseover" == c ? b = a.fromElement : "mouseout" == c && (b = a.toElement);
            this.relatedTarget = b;
            d ? (this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX,
            this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY,
            this.screenX = d.screenX || 0,
            this.screenY = d.screenY || 0) : (this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX,
            this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY,
            this.screenX = a.screenX || 0,
            this.screenY = a.screenY || 0);
            this.button = a.button;
            this.keyCode = a.keyCode || 0;
            this.key = a.key || "";
            this.ctrlKey = a.ctrlKey;
            this.altKey = a.altKey;
            this.shiftKey = a.shiftKey;
            this.metaKey = a.metaKey;
            this.pointerId = a.pointerId || 0;
            this.pointerType = "string" === typeof a.pointerType ? a.pointerType : pg[a.pointerType] || "";
            this.state = a.state;
            this.j = a;
            a.defaultPrevented && this.preventDefault()
        }
    };
    Ta(qg, og);
    var pg = {
        2: "touch",
        3: "pen",
        4: "mouse"
    };
    qg.prototype.stopPropagation = function() {
        qg.Wb.stopPropagation.call(this);
        this.j.stopPropagation ? this.j.stopPropagation() : this.j.cancelBubble = !0
    }
    ;
    qg.prototype.preventDefault = function() {
        qg.Wb.preventDefault.call(this);
        var a = this.j;
        if (a.preventDefault)
            a.preventDefault();
        else if (a.returnValue = !1,
        jg)
            try {
                if (a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode)
                    a.keyCode = -1
            } catch (b) {}
    }
    ;
    var rg = "closure_listenable_" + (1E6 * Math.random() | 0)
      , sg = 0;
    var tg = function(a, b, c, d, e) {
        this.listener = a;
        this.g = null;
        this.src = b;
        this.type = c;
        this.capture = !!d;
        this.Ic = e;
        this.key = ++sg;
        this.Ub = this.Cc = !1
    }
      , ug = function(a) {
        a.Ub = !0;
        a.listener = null;
        a.g = null;
        a.src = null;
        a.Ic = null
    };
    var vg = function(a) {
        this.src = a;
        this.g = {};
        this.i = 0
    };
    vg.prototype.add = function(a, b, c, d, e) {
        var f = a.toString();
        a = this.g[f];
        a || (a = this.g[f] = [],
        this.i++);
        var g = wg(a, b, d, e);
        -1 < g ? (b = a[g],
        c || (b.Cc = !1)) : (b = new tg(b,this.src,f,!!d,e),
        b.Cc = c,
        a.push(b));
        return b
    }
    ;
    var xg = function(a, b) {
        var c = b.type;
        c in a.g && db(a.g[c], b) && (ug(b),
        0 == a.g[c].length && (delete a.g[c],
        a.i--))
    }
      , wg = function(a, b, c, d) {
        for (var e = 0; e < a.length; ++e) {
            var f = a[e];
            if (!f.Ub && f.listener == b && f.capture == !!c && f.Ic == d)
                return e
        }
        return -1
    };
    var yg = "closure_lm_" + (1E6 * Math.random() | 0)
      , zg = {}
      , Ag = 0
      , Cg = function(a, b, c, d, e) {
        if (d && d.once)
            return Bg(a, b, c, d, e);
        if (Array.isArray(b)) {
            for (var f = 0; f < b.length; f++)
                Cg(a, b[f], c, d, e);
            return null
        }
        c = Dg(c);
        return a && a[rg] ? Eg(a, b, c, La(d) ? !!d.capture : !!d, e) : Fg(a, b, c, !1, d, e)
    }
      , Fg = function(a, b, c, d, e, f) {
        if (!b)
            throw Error("s");
        var g = La(e) ? !!e.capture : !!e
          , h = Gg(a);
        h || (a[yg] = h = new vg(a));
        c = h.add(b, c, d, g, f);
        if (c.g)
            return c;
        d = Hg();
        c.g = d;
        d.src = a;
        d.listener = c;
        if (a.addEventListener)
            kg || (e = g),
            void 0 === e && (e = !1),
            a.addEventListener(b.toString(), d, e);
        else if (a.attachEvent)
            a.attachEvent(Ig(b.toString()), d);
        else if (a.addListener && a.removeListener)
            a.addListener(d);
        else
            throw Error("t");
        Ag++;
        return c
    }
      , Hg = function() {
        var a = Jg
          , b = ig ? function(c) {
            return a.call(b.src, b.listener, c)
        }
        : function(c) {
            c = a.call(b.src, b.listener, c);
            if (!c)
                return c
        }
        ;
        return b
    }
      , Bg = function(a, b, c, d, e) {
        if (Array.isArray(b)) {
            for (var f = 0; f < b.length; f++)
                Bg(a, b[f], c, d, e);
            return null
        }
        c = Dg(c);
        return a && a[rg] ? a.j.add(String(b), c, !0, La(d) ? !!d.capture : !!d, e) : Fg(a, b, c, !0, d, e)
    }
      , Kg = function(a, b, c, d, e) {
        if (Array.isArray(b))
            for (var f = 0; f < b.length; f++)
                Kg(a, b[f], c, d, e);
        else
            (d = La(d) ? !!d.capture : !!d,
            c = Dg(c),
            a && a[rg]) ? (a = a.j,
            b = String(b).toString(),
            b in a.g && (f = a.g[b],
            c = wg(f, c, d, e),
            -1 < c && (ug(f[c]),
            Array.prototype.splice.call(f, c, 1),
            0 == f.length && (delete a.g[b],
            a.i--)))) : a && (a = Gg(a)) && (b = a.g[b.toString()],
            a = -1,
            b && (a = wg(b, c, d, e)),
            (c = -1 < a ? b[a] : null) && Lg(c))
    }
      , Lg = function(a) {
        if ("number" !== typeof a && a && !a.Ub) {
            var b = a.src;
            if (b && b[rg])
                xg(b.j, a);
            else {
                var c = a.type
                  , d = a.g;
                b.removeEventListener ? b.removeEventListener(c, d, a.capture) : b.detachEvent ? b.detachEvent(Ig(c), d) : b.addListener && b.removeListener && b.removeListener(d);
                Ag--;
                (c = Gg(b)) ? (xg(c, a),
                0 == c.i && (c.src = null,
                b[yg] = null)) : ug(a)
            }
        }
    }
      , Ig = function(a) {
        return a in zg ? zg[a] : zg[a] = "on" + a
    }
      , Ng = function(a, b, c, d) {
        var e = !0;
        if (a = Gg(a))
            if (b = a.g[b.toString()])
                for (b = b.concat(),
                a = 0; a < b.length; a++) {
                    var f = b[a];
                    f && f.capture == c && !f.Ub && (f = Mg(f, d),
                    e = e && !1 !== f)
                }
        return e
    }
      , Mg = function(a, b) {
        var c = a.listener
          , d = a.Ic || a.src;
        a.Cc && Lg(a);
        return c.call(d, b)
    }
      , Jg = function(a, b) {
        if (a.Ub)
            return !0;
        if (!ig) {
            if (!b)
                a: {
                    b = ["window", "event"];
                    for (var c = Ha, d = 0; d < b.length; d++)
                        if (c = c[b[d]],
                        null == c) {
                            b = null;
                            break a
                        }
                    b = c
                }
            d = b;
            b = new qg(d,this);
            c = !0;
            if (!(0 > d.keyCode || void 0 != d.returnValue)) {
                a: {
                    var e = !1;
                    if (0 == d.keyCode)
                        try {
                            d.keyCode = -1;
                            break a
                        } catch (g) {
                            e = !0
                        }
                    if (e || void 0 == d.returnValue)
                        d.returnValue = !0
                }
                d = [];
                for (e = b.g; e; e = e.parentNode)
                    d.push(e);
                a = a.type;
                for (e = d.length - 1; !b.i && 0 <= e; e--) {
                    b.g = d[e];
                    var f = Ng(d[e], a, !0, b);
                    c = c && f
                }
                for (e = 0; !b.i && e < d.length; e++)
                    b.g = d[e],
                    f = Ng(d[e], a, !1, b),
                    c = c && f
            }
            return c
        }
        return Mg(a, new qg(b,this))
    }
      , Gg = function(a) {
        a = a[yg];
        return a instanceof vg ? a : null
    }
      , Og = "__closure_events_fn_" + (1E9 * Math.random() >>> 0)
      , Dg = function(a) {
        if ("function" === typeof a)
            return a;
        a[Og] || (a[Og] = function(b) {
            return a.handleEvent(b)
        }
        );
        return a[Og]
    };
    var Pg = function() {
        lg.call(this);
        this.j = new vg(this);
        this.mb = this;
        this.Ca = null
    };
    Ta(Pg, lg);
    Pg.prototype[rg] = !0;
    Pg.prototype.addEventListener = function(a, b, c, d) {
        Cg(this, a, b, c, d)
    }
    ;
    Pg.prototype.removeEventListener = function(a, b, c, d) {
        Kg(this, a, b, c, d)
    }
    ;
    var Rg = function(a, b) {
        var c, d = a.Ca;
        if (d)
            for (c = []; d; d = d.Ca)
                c.push(d);
        a = a.mb;
        d = b.type || b;
        if ("string" === typeof b)
            b = new og(b,a);
        else if (b instanceof og)
            b.target = b.target || a;
        else {
            var e = b;
            b = new og(d,a);
            lb(b, e)
        }
        e = !0;
        if (c)
            for (var f = c.length - 1; !b.i && 0 <= f; f--) {
                var g = b.g = c[f];
                e = Qg(g, d, !0, b) && e
            }
        b.i || (g = b.g = a,
        e = Qg(g, d, !0, b) && e,
        b.i || (e = Qg(g, d, !1, b) && e));
        if (c)
            for (f = 0; !b.i && f < c.length; f++)
                g = b.g = c[f],
                e = Qg(g, d, !1, b) && e
    };
    Pg.prototype.i = function() {
        Pg.Wb.i.call(this);
        if (this.j) {
            var a = this.j, b = 0, c;
            for (c in a.g) {
                for (var d = a.g[c], e = 0; e < d.length; e++)
                    ++b,
                    ug(d[e]);
                delete a.g[c];
                a.i--
            }
        }
        this.Ca = null
    }
    ;
    var Eg = function(a, b, c, d, e) {
        return a.j.add(String(b), c, !1, d, e)
    }
      , Qg = function(a, b, c, d) {
        b = a.j.g[String(b)];
        if (!b)
            return !0;
        b = b.concat();
        for (var e = !0, f = 0; f < b.length; ++f) {
            var g = b[f];
            if (g && !g.Ub && g.capture == c) {
                var h = g.listener
                  , k = g.Ic || g.src;
                g.Cc && xg(a.j, g);
                e = !1 !== h.call(k, d) && e
            }
        }
        return e && !d.defaultPrevented
    };
    var Sg = function() {};
    Sg.prototype.g = null;
    Sg.prototype.getOptions = function() {
        var a;
        (a = this.g) || (a = {},
        Tg(this) && (a[0] = !0,
        a[1] = !0),
        a = this.g = a);
        return a
    }
    ;
    var Ug, Vg = function() {};
    Ta(Vg, Sg);
    var Wg = function(a) {
        return (a = Tg(a)) ? new ActiveXObject(a) : new XMLHttpRequest
    }
      , Tg = function(a) {
        if (!a.i && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
            for (var b = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], c = 0; c < b.length; c++) {
                var d = b[c];
                try {
                    return new ActiveXObject(d),
                    a.i = d
                } catch (e) {}
            }
            throw Error("u");
        }
        return a.i
    };
    Ug = new Vg;
    var Xg = !Xf && !Vf || Vf && 9 <= Number(hg) || Xf && eg("1.9.1");
    var Yg = function(a, b) {
        this.width = a;
        this.height = b
    };
    m = Yg.prototype;
    m.aspectRatio = function() {
        return this.width / this.height
    }
    ;
    m.ceil = function() {
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this
    }
    ;
    m.floor = function() {
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    }
    ;
    m.round = function() {
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    }
    ;
    m.scale = function(a, b) {
        this.width *= a;
        this.height *= "number" === typeof b ? b : a;
        return this
    }
    ;
    var Zg = function() {
        var a = window.document;
        a = "CSS1Compat" == a.compatMode ? a.documentElement : a.body;
        return new Yg(a.clientWidth,a.clientHeight)
    }
      , $g = function() {
        this.g = Ha.document || document
    };
    $g.prototype.Ka = function() {
        return Xg && void 0 != (void 0).children ? (void 0).children : ab((void 0).childNodes, function(a) {
            return 1 == a.nodeType
        })
    }
    ;
    var ah = function(a, b, c) {
        if ("function" === typeof a)
            c && (a = Pa(a, c));
        else if (a && "function" == typeof a.handleEvent)
            a = Pa(a.handleEvent, a);
        else
            throw Error("w");
        return 2147483647 < Number(b) ? -1 : Ha.setTimeout(a, b || 0)
    };
    var bh = function(a) {
        Pg.call(this);
        this.headers = new Yb;
        this.ha = a || null;
        this.o = !1;
        this.ta = this.g = null;
        this.Da = "";
        this.v = this.W = this.s = this.ka = !1;
        this.Ja = 0;
        this.S = null;
        this.Ia = "";
        this.Ma = this.Ra = !1
    };
    Ta(bh, Pg);
    var ch = /^https?$/i
      , dh = ["POST", "PUT"]
      , eh = []
      , gh = function(a, b) {
        var c = new bh;
        eh.push(c);
        b && Eg(c, "complete", b);
        c.j.add("ready", c.Gb, !0, void 0, void 0);
        fh(c, a, void 0, void 0, void 0);
        return c
    };
    bh.prototype.Gb = function() {
        this.Fc();
        db(eh, this)
    }
    ;
    var fh = function(a, b, c, d, e) {
        if (a.g)
            throw Error("x`" + a.Da + "`" + b);
        c = c ? c.toUpperCase() : "GET";
        a.Da = b;
        a.ka = !1;
        a.o = !0;
        a.g = a.ha ? Wg(a.ha) : Wg(Ug);
        a.ta = a.ha ? a.ha.getOptions() : Ug.getOptions();
        a.g.onreadystatechange = Pa(a.Na, a);
        try {
            a.W = !0,
            a.g.open(c, String(b), !0),
            a.W = !1
        } catch (g) {
            hh(a);
            return
        }
        b = d || "";
        var f = new Yb(a.headers);
        e && bc(e, function(g, h) {
            f.set(h, g)
        });
        e = cb(f.wb(), ih);
        d = Ha.FormData && b instanceof Ha.FormData;
        !(0 <= Za(dh, c)) || e || d || f.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        f.forEach(function(g, h) {
            this.g.setRequestHeader(h, g)
        }, a);
        a.Ia && (a.g.responseType = a.Ia);
        "withCredentials"in a.g && a.g.withCredentials !== a.Ra && (a.g.withCredentials = a.Ra);
        try {
            jh(a),
            0 < a.Ja && (a.Ma = kh(a.g),
            a.Ma ? (a.g.timeout = a.Ja,
            a.g.ontimeout = Pa(a.Ta, a)) : a.S = ah(a.Ta, a.Ja, a)),
            a.s = !0,
            a.g.send(b),
            a.s = !1
        } catch (g) {
            hh(a)
        }
    }
      , kh = function(a) {
        return Vf && eg(9) && "number" === typeof a.timeout && void 0 !== a.ontimeout
    }
      , ih = function(a) {
        return "content-type" == a.toLowerCase()
    };
    bh.prototype.Ta = function() {
        "undefined" != typeof Ga && this.g && (Rg(this, "timeout"),
        this.abort(8))
    }
    ;
    var hh = function(a) {
        a.o = !1;
        a.g && (a.v = !0,
        a.g.abort(),
        a.v = !1);
        lh(a);
        mh(a)
    }
      , lh = function(a) {
        a.ka || (a.ka = !0,
        Rg(a, "complete"),
        Rg(a, "error"))
    };
    bh.prototype.abort = function() {
        this.g && this.o && (this.o = !1,
        this.v = !0,
        this.g.abort(),
        this.v = !1,
        Rg(this, "complete"),
        Rg(this, "abort"),
        mh(this))
    }
    ;
    bh.prototype.i = function() {
        this.g && (this.o && (this.o = !1,
        this.v = !0,
        this.g.abort(),
        this.v = !1),
        mh(this, !0));
        bh.Wb.i.call(this)
    }
    ;
    bh.prototype.Na = function() {
        this.V || (this.W || this.s || this.v ? nh(this) : this.Qc())
    }
    ;
    bh.prototype.Qc = function() {
        nh(this)
    }
    ;
    var nh = function(a) {
        if (a.o && "undefined" != typeof Ga && (!a.ta[1] || 4 != (a.g ? a.g.readyState : 0) || 2 != oh(a)))
            if (a.s && 4 == (a.g ? a.g.readyState : 0))
                ah(a.Na, 0, a);
            else if (Rg(a, "readystatechange"),
            a.Fa()) {
                a.o = !1;
                try {
                    ph(a) ? (Rg(a, "complete"),
                    Rg(a, "success")) : lh(a)
                } finally {
                    mh(a)
                }
            }
    }
      , mh = function(a, b) {
        if (a.g) {
            jh(a);
            var c = a.g
              , d = a.ta[0] ? Ia : null;
            a.g = null;
            a.ta = null;
            b || Rg(a, "ready");
            try {
                c.onreadystatechange = d
            } catch (e) {}
        }
    }
      , jh = function(a) {
        a.g && a.Ma && (a.g.ontimeout = null);
        a.S && (Ha.clearTimeout(a.S),
        a.S = null)
    };
    bh.prototype.Wa = function() {
        return !!this.g
    }
    ;
    bh.prototype.Fa = function() {
        return 4 == (this.g ? this.g.readyState : 0)
    }
    ;
    var ph = function(a) {
        var b = oh(a);
        a: switch (b) {
        case 200:
        case 201:
        case 202:
        case 204:
        case 206:
        case 304:
        case 1223:
            var c = !0;
            break a;
        default:
            c = !1
        }
        if (!c) {
            if (b = 0 === b)
                a = String(a.Da).match(cc)[1] || null,
                !a && Ha.self && Ha.self.location && (a = Ha.self.location.protocol,
                a = a.substr(0, a.length - 1)),
                b = !ch.test(a ? a.toLowerCase() : "");
            c = b
        }
        return c
    }
      , oh = function(a) {
        try {
            return 2 < (a.g ? a.g.readyState : 0) ? a.g.status : -1
        } catch (b) {
            return -1
        }
    }
      , qh = function(a) {
        try {
            return a.g ? a.g.responseXML : null
        } catch (b) {
            return null
        }
    };
    var rh = function(a, b) {
        this.v = a;
        this.o = b;
        this.j = this.g = null;
        this.S = this.s = this.H = !1;
        this.V = [];
        this.i = null
    }
      , xh = function(a) {
        var b = sh;
        if (th && !b.g) {
            b.g = new (window.AudioContext || window.webkitAudioContext);
            b.j = b.g.createGain();
            b.j.connect(b.g.destination);
            for (var c in b.v)
                b.v[c].o = b.g;
            for (var d in b.o)
                uh(b.o[d], b.g, b.j);
            b.g.onstatechange = function() {
                vh(b)
            }
            ;
            vh(b);
            wh(b);
            Bg(a, ["click", "pointerup", "mouseup", "touchend"], function() {
                b.g.resume();
                wh(b)
            }, !0)
        }
    }
      , vh = function(a) {
        if ("running" == a.g.state && !a.S) {
            a.S = !0;
            for (var b = 0; b < a.V.length; b++)
                a.V[b]()
        }
    }
      , yh = function(a) {
        a.i = a.g.createBufferSource();
        a.i.buffer = a.g.createBuffer(1, 1, 22050);
        a.i.connect(a.g.destination);
        a.i.start(0)
    }
      , wh = function(a) {
        a.g && (null == a.i ? yh(a) : void 0 === a.i.playbackState ? yh(a) : a.i.playbackState !== a.i.PLAYING_STATE && a.i.playbackState !== a.i.FINISHED_STATE && yh(a))
    };
    rh.prototype.destroy = function() {
        this.g.close();
        this.g = null
    }
    ;
    rh.prototype.reset = function() {
        for (var a in this.v)
            this.v[a].v = [];
        for (var b in this.o)
            this.o[b].stop()
    }
    ;
    var zh = function() {
        var a = sh;
        a.j && a.j.gain.setValueAtTime(0, a.g.currentTime);
        a.H = !0
    };
    rh.prototype.isMuted = function() {
        return this.H && !!this.j && 0 == this.j.gain.value
    }
    ;
    var th = !(!window.AudioContext && !window.webkitAudioContext) && !!window.GainNode
      , P = function(a, b, c) {
        this.s = a;
        this.S = b;
        this.H = c;
        this.j = {};
        this.o = this.v = this.g = this.i = null;
        this.V = 0
    }
      , uh = function(a, b, c) {
        a.g = b;
        a.v = c
    }
      , Ah = function(a) {
        if (a.g)
            for (var b in a.j) {
                var c = a.j[b];
                !c.Ve && 1E3 * a.g.currentTime > c.Pd + a.H && delete a.j[b]
            }
    }
      , Bh = function(a) {
        !a.i && a.g.createGain && (a.i = a.g.createGain())
    };
    P.prototype.play = function(a, b, c, d, e, f) {
        a = void 0 === a ? 0 : a;
        b = void 0 === b ? !1 : b;
        c = void 0 === c ? 0 : c;
        e = void 0 === e ? !1 : e;
        if (!this.g || !this.v)
            return -1;
        Ah(this);
        f = void 0 === f ? this.g.currentTime + a / 1E3 : f;
        d || (d = this.g.createBufferSource(),
        d.playbackRate.setValueAtTime(1, this.g.currentTime));
        Bh(this);
        this.o && d.connect(this.o);
        this.i ? (this.o ? this.o.connect(this.i) : d.connect(this.i),
        this.i.connect(this.v)) : this.o ? this.o.connect(this.v) : d.connect(this.v);
        this.o = null;
        d.loop = b;
        try {
            d.buffer = this.s.s
        } catch (h) {
            return -1
        }
        a = this.S / 1E3;
        var g = this.H / 1E3 / d.playbackRate.value;
        b ? (d.loopStart = a + (e ? c / 1E3 : 0),
        d.loopEnd = a + g,
        d.start(f, a + c / 1E3)) : d.start(f, a + c / 1E3, g);
        e = this.V++;
        this.j[e] = {
            node: d,
            Pd: 1E3 * f - c,
            Ve: b
        };
        return e
    }
    ;
    var Ch = function(a, b) {
        var c = void 0 === c ? 0 : c;
        Bh(a);
        a.i && a.i.gain.setValueAtTime(b, a.g.currentTime + c)
    }
      , Dh = function(a, b, c, d) {
        d = void 0 === d ? 0 : d;
        Bh(a);
        a.i && (a.i.gain.setValueAtTime(a.i.gain.value, a.g.currentTime + d),
        a.i.gain.exponentialRampToValueAtTime(b, a.g.currentTime + d + c))
    };
    P.prototype.stop = function(a) {
        Ah(this);
        if (void 0 !== a) {
            if (this.j[a]) {
                try {
                    this.j[a].node.stop(0)
                } catch (c) {}
                var b = (1E3 * this.g.currentTime - this.j[a].Pd) % this.H;
                delete this.j[a];
                return [b]
            }
            return []
        }
        a = [];
        for (b in this.j)
            a = a.concat(this.stop(b));
        return a
    }
    ;
    var Eh, Fh = document.createElement("audio"), Gh = (Eh = "function" === typeof Fh.canPlayType && "" != Fh.canPlayType("audio/mpeg")) ? ".mp3" : ".ogg", Hh = function(a, b) {
        Td.call(this, a + b + Gh);
        this.o = this.s = null;
        this.g = 0
    };
    p(Hh, Td);
    Hh.prototype.preload = function(a, b) {
        var c = this
          , d = new Promise(function(f) {
            Ud(c, f)
        }
        );
        a && Ud(this, a);
        if (0 != this.g)
            return Promise.resolve();
        if (!this.o)
            return Promise.reject();
        var e = new XMLHttpRequest;
        e.open("GET", this.Mb, !0);
        e.responseType = "arraybuffer";
        e.onload = function() {
            c.o.decodeAudioData(e.response, function(f) {
                f && (c.s = f,
                c.g = 3,
                c.i())
            });
            c.g = 2
        }
        ;
        b && (e.onprogress = function(f) {
            f.lengthComputable && b(f.loaded / f.total)
        }
        );
        e.send();
        this.g = 1;
        return d
    }
    ;
    var Ih = function() {
        rh.call(this, Q, R)
    };
    p(Ih, rh);
    var Q = {};
    Q.Ua = new Hh("./","main");
    Q.Ac = new Hh("./","music");
    Q.ud = new Hh("./","l2_music");
    Q.wd = new Hh("./","l3_music");
    Q.Zd = new Hh("./","l4_music");
    Q.zc = new Hh("./","l5_music");
    Q.Ea = new Hh("./","sfx");
    Q.Id = new Hh("./","victory");
    Q.Lb = new Hh("./","end");
    var R = {};
    R.Xe = new P(Q.Ea,0,3613.3330078125);
    R.Ye = new P(Q.Lb,0,1933.3330078125);
    R.Ze = new P(Q.Lb,2933.3330078125,4466.6669921875);
    R.$e = new P(Q.Lb,8400,5233.3330078125);
    R.df = new P(Q.Lb,14633.3330078125,2309.342041015625);
    R.ef = new P(Q.Lb,17942.67578125,2966.6669921875);
    R.Rd = new P(Q.Ea,4613.3330078125,1790);
    R.Sd = new P(Q.Ea,7403.3330078125,1100);
    R.ff = new P(Q.Lb,21909.341796875,3E4);
    R.Td = new P(Q.Ac,0,2627.595947265625);
    R.Ud = new P(Q.Ua,0,1741.4969482421875);
    R.Rc = new P(Q.Ua,2741.4970703125,1335.14697265625);
    R.Vd = new P(Q.Ac,3627.595947265625,1207.052001953125);
    R.rd = new P(Q.Ac,5834.64892578125,30858.888671875);
    R.Wd = new P(Q.ud,0,2668.616943359375);
    R.sd = new P(Q.ud,3668.616943359375,16708.5703125);
    R.Xd = new P(Q.wd,0,7714.2861328125);
    R.vd = new P(Q.wd,8714.2861328125,36091.65625);
    R.Yd = new P(Q.Ea,9503.3330078125,2633.197021484375);
    R.xd = new P(Q.Zd,0,45175.984375);
    R.$d = new P(Q.zc,0,2115.14697265625);
    R.yd = new P(Q.zc,3115.14697265625,37613.17578125);
    R.Sc = new P(Q.zc,41728.3203125,29589.796875);
    R.zd = new P(Q.zc,72318.1171875,8645.0791015625);
    R.Ad = new P(Q.Ua,5076.64404296875,1573.1519775390625);
    R.Bd = new P(Q.Ea,108517.53125,783.3330078125);
    R.Cd = new P(Q.Ea,110300.859375,783.3330078125);
    R.Dd = new P(Q.Ac,37693.53515625,48E3);
    R.Ed = new P(Q.Ea,13136.53125,396.6669921875);
    R.fe = new P(Q.Ea,14533.197265625,3611.677978515625);
    R.he = new P(Q.Ea,19144.875,886.6669921875);
    R.le = new P(Q.Ea,21031.54296875,1248.344970703125);
    R.hf = new P(Q.Ea,23279.88671875,2506.6669921875);
    R.oe = new P(Q.Ea,26786.552734375,1088.344970703125);
    R.Fd = new P(Q.Ea,28874.8984375,2506.6669921875);
    R.qe = new P(Q.Ea,32381.564453125,5528.34521484375);
    R.re = new P(Q.Ea,38909.91015625,1261.677978515625);
    R.jf = new P(Q.Ea,41171.5859375,8516.6669921875);
    R.te = new P(Q.Ea,50688.25390625,2969.251953125);
    R.ue = new P(Q.Ea,54657.5078125,5770);
    R.we = new P(Q.Ea,61427.5078125,2666.6669921875);
    R.xe = new P(Q.Ea,65094.171875,11124.9892578125);
    R.Gd = new P(Q.Ea,77219.1640625,785.010986328125);
    R.ye = new P(Q.Ea,79004.171875,2200);
    R.ze = new P(Q.Ea,82204.171875,3886.6669921875);
    R.Ae = new P(Q.Ea,87090.8359375,5421.67822265625);
    R.kf = new P(Q.Ea,93512.515625,2756.6669921875);
    R.Be = new P(Q.Ea,97269.1875,2735.010986328125);
    R.Ce = new P(Q.Ea,101004.1953125,6513.3330078125);
    R.lf = new P(Q.Ea,112084.1953125,4E3);
    R.De = new P(Q.Ua,7649.7958984375,1168.2540283203125);
    R.mf = new P(Q.Ea,117084.1953125,3071.677978515625);
    R.Ee = new P(Q.Ea,121155.875,713.3330078125);
    R.Fe = new P(Q.Ea,122869.203125,666.6669921875);
    R.Ge = new P(Q.Ea,124535.875,4800);
    R.He = new P(Q.Ea,130335.875,4011.677978515625);
    R.Tc = new P(Q.Ua,9818.0498046875,983.5599975585938);
    R.Hd = new P(Q.Ua,11801.6103515625,1160);
    R.Ie = new P(Q.Ua,13961.6103515625,1248.0050048828125);
    R.Je = new P(Q.Ua,16209.615234375,1386.6669921875);
    R.Ke = new P(Q.Ua,18596.28125,1482.6529541015625);
    R.Le = new P(Q.Ua,21078.93359375,1271.29296875);
    R.Me = new P(Q.Ua,23350.2265625,1567.3470458984375);
    R.Ne = new P(Q.Ua,25917.57421875,1625.39697265625);
    R.Oe = new P(Q.Ua,28542.970703125,2066.575927734375);
    R.Uc = new P(Q.Id,0,2626.16796875);
    R.Jd = new P(Q.Id,3626.16796875,17823.58203125);
    R.Pe = new P(Q.Ea,135347.546875,1783.3330078125);
    Ja(Ih);
    var Jh = function() {
        this.g = new Map
    }, Kh, Lh = function() {
        Kh || (Kh = new Jh);
        return Kh
    };
    Jh.prototype.play = function(a) {
        this.g.has(a) && 200 > Date.now() - this.g.get(a) || (a.play(),
        this.g.set(a, Date.now()))
    }
    ;
    var Mh = function() {
        this.g = new Set
    }, Nh, S = function(a, b, c) {
        for (var d = n(new Set(a.g)), e = d.next(); !e.done; e = d.next())
            e = e.value,
            a.g.has(e) && e.Sa(b, c)
    };
    Mh.prototype.addListener = function(a) {
        this.g.add(a)
    }
    ;
    Mh.prototype.removeListener = function(a) {
        this.g.delete(a)
    }
    ;
    var Oh = function() {
        Nh || (Nh = new Mh);
        return Nh
    };
    var Ph = /#(.)(.)(.)/
      , Qh = /^#(?:[0-9a-f]{3}){1,2}$/i;
    var Rh = function(a, b, c) {
        b *= c.length;
        for (var d = 0, e = c[0]; 0 <= b && d < c.length; ) {
            e = c[d];
            var f = Math.min(b, 1);
            if (1 > f) {
                var g = e = new Cd(e.v,e.S,e.g,e.j,e.i,e.o,e.s,e.H);
                if (1 != f) {
                    var h = r(g.v, g.g, f)
                      , k = r(g.S, g.j, f)
                      , l = r(g.g, g.i, f)
                      , q = r(g.j, g.o, f)
                      , t = r(g.i, g.s, f)
                      , B = r(g.o, g.H, f);
                    g.g = h;
                    g.j = k;
                    h = r(h, l, f);
                    k = r(k, q, f);
                    l = r(l, t, f);
                    q = r(q, B, f);
                    g.i = h;
                    g.o = k;
                    g.s = r(h, l, f);
                    g.H = r(k, q, f)
                }
            }
            f = a;
            g = e;
            f.save();
            f.beginPath();
            f.moveTo(g.v, g.S);
            f.bezierCurveTo(g.g, g.j, g.i, g.o, g.s, g.H);
            f.stroke();
            f.restore();
            d++;
            b--
        }
        return e
    }
      , Sh = [255, 255, 255];
    function Th(a, b, c) {
        a.save();
        a.translate(b - 73, c - 15);
        a.beginPath();
        a.moveTo(66.7, 352.6);
        a.bezierCurveTo(66.7, 352.6, 67.8, 279.6, 67.8, 263.1);
        a.bezierCurveTo(67.8, 246.6, 50.3, 247.1, 43.3, 234.8);
        a.bezierCurveTo(36.4, 222.6, 8.7, 156.5, 49.7, 150.1);
        a.bezierCurveTo(52.4, 115.5, 56.1, 50.6, 57.7, 29.2);
        a.bezierCurveTo(59.3, 7.9, 90.2, 13.3, 89.7, 29.8);
        a.bezierCurveTo(89.1, 46.3, 87.5, 111.3, 87.5, 111.3);
        a.bezierCurveTo(87.5, 111.3, 93.4, 103.3, 107.2, 105.9);
        a.bezierCurveTo(121.1, 108.6, 124.8, 122.5, 124.8, 122.5);
        a.bezierCurveTo(124.8, 122.5, 149.9, 98.5, 161, 134.7);
        a.bezierCurveTo(176.5, 117.7, 188.2, 133.6, 189.8, 145.9);
        a.bezierCurveTo(191, 155.5, 196.2, 192.8, 189.3, 215.7);
        a.bezierCurveTo(182.3, 238.6, 163.7, 264.7, 163.7, 264.7);
        a.lineTo(162.6, 352.6);
        a.lineWidth = 9;
        a.strokeStyle = "rgb(255, 255, 255)";
        a.lineCap = "round";
        a.lineJoin = "round";
        a.stroke();
        a.restore()
    }
    function Uh(a, b, c) {
        a.save();
        a.translate(b, c);
        a.save();
        a.beginPath();
        a.moveTo(12.5, 43.5);
        a.lineTo(.2, 54.7);
        a.lineTo(0, 0);
        a.lineTo(44.9, 33.4);
        a.lineTo(25.9, 36.3);
        a.lineTo(33.4, 53);
        a.lineTo(21, 59.2);
        a.lineTo(12.5, 43.5);
        a.closePath();
        a.fillStyle = "rgb(255, 255, 255)";
        a.fill();
        a.beginPath();
        a.moveTo(36.8, 31.1);
        a.lineTo(3, 6);
        a.lineTo(3.2, 46.8);
        a.lineTo(13.2, 36.2);
        a.lineTo(22.3, 55.2);
        a.lineTo(29.4, 51.7);
        a.lineTo(20.2, 32.7);
        a.lineTo(36.8, 31.1);
        a.closePath();
        a.fillStyle = "rgb(1, 1, 1)";
        a.fill();
        a.restore();
        a.restore()
    }
    var Vh = [new Cd(390.1,169.5,406.9,185.5,430.7,194.3,476,162.2), new Cd(452.4,164.3,455.4,164.2,472.5,162.8,475.1,162.6), new Cd(466.6,183.9,467.2,178.4,472.8,167.5,475.7,162.6)];
    function Wh(a, b, c, d) {
        return new Cd(a,b,a,b,c,d,c,d)
    }
    ;for (var Xh = new Map([[0, {
        color: "#0000ff",
        wa: [2, 182, 0, 8, 32],
        kb: [Wh(0, -100, 0, 100)],
        Jb: new u(50,180),
        vb: [[0, -10], [0, 0], [0, 16]],
        ab: null
    }], [1, {
        color: "#22ff43",
        wa: [2, 28, 0, 24, 32],
        kb: null,
        Jb: null,
        vb: [[-10, 4], [0, 0], [10, -12], [20, 0]],
        ab: null
    }], [2, {
        color: "#ff0000",
        wa: [2, 55, 0, 24, 32],
        kb: [Wh(175, 0, -175, 0)],
        Jb: new u(320,240),
        vb: [[-8, 0], [0, 0], [16, 0]],
        ab: null
    }], [3, {
        color: "#ffff00",
        wa: [2, 109, 0, 24, 32],
        kb: null,
        Jb: null,
        vb: [[-10, -6], [0, 0], [10, 12], [20, 0]],
        ab: null
    }], [4, {
        color: "#ff69b4",
        wa: [2, 0, 0, 25, 32],
        kb: null,
        Jb: null,
        vb: null,
        ab: R.Ne
    }], [5, {
        color: "#6bfbfd",
        wa: [2, 136, 0, 22, 32],
        kb: null,
        Jb: null,
        vb: null,
        ab: null
    }], [6, {
        color: "#ffd700",
        wa: [2, 161, 0, 18, 32],
        kb: [Wh(25, -62.5, -25, 0), Wh(-25, 0, 31, -4), Wh(31, -4, -19, 58.5)],
        Jb: new u(410,190),
        ab: R.Oe,
        vb: null
    }], [7, {
        color: "#4682b4",
        wa: null,
        kb: null,
        vb: null,
        ab: null
    }], [8, {
        color: "#b888dd",
        wa: [2, 82, 0, 24, 32],
        kb: null,
        vb: null,
        ab: null
    }], [9, {
        color: "#d1002d",
        wa: null,
        kb: null,
        vb: null,
        ab: null
    }], [10, {
        color: "#00d5ff",
        wa: null,
        kb: null,
        vb: null,
        ab: null
    }]]), Yh = n(Xh.values()), Zh = Yh.next(); !Zh.done; Zh = Yh.next()) {
        var $h = Zh.value
          , ai = $h.color
          , bi = ai;
        if (!Qh.test(bi))
            throw Error("y`" + bi);
        4 == bi.length && (bi = bi.replace(Ph, "#$1$1$2$2$3$3"));
        ai = bi.toLowerCase();
        var ci = parseInt(ai.substr(1), 16);
        $h.We = [ci >> 16, ci >> 8 & 255, ci & 255]
    }
    ;var di = function(a, b, c, d) {
        this.g = a;
        this.j = b;
        this.i = c;
        this.o = void 0 === d ? !1 : d
    }
      , U = function(a, b, c, d) {
        return new di(ei(a, b),1E3 * c,fi(d))
    }
      , fi = function(a) {
        var b = [];
        a = n(a);
        for (var c = a.next(); !c.done; c = a.next())
            b.push(gi.get(c.value));
        return b
    }
      , ei = function(a, b) {
        a = 2 * a * Math.PI / 360;
        return new u(320 + Math.cos(a) * b,Math.sin(a) * b + 203)
    }
      , gi = new Map([["|", 0], ["^", 1], ["-", 2], ["v", 3], ["z", 6], ["o", 5], ["3", 4], ["@", 8]]);
    var hi = function(a, b, c, d) {
        D.call(this, Ad);
        this.i = a;
        this.H = c;
        this.s = b;
        this.o = d || 0
    };
    p(hi, D);
    hi.prototype.update = function(a) {
        D.prototype.update.call(this, a);
        a = Math.sin(this.s * this.g * 2 * Math.PI / 1E3);
        var b = this.i;
        b.Yb = a * this.o;
        ud(b);
        wd(this.i, a * this.H)
    }
    ;
    var ii = ee.ya()
      , ji = function() {
        v.call(this);
        this.j = 0;
        this.g = [];
        this.o = [];
        this.i = [];
        this.v = [];
        this.s = [];
        this.H = new u(0,0)
    };
    p(ji, v);
    ji.prototype.update = function(a) {
        this.j += a;
        a = xd(this);
        this.g = [new u(0,-a.g / a.o), this.H];
        this.g = ki(this, this.g[0], this.g[1], 3);
        this.o = ki(this, this.g[Math.floor(Number(Math.random() * this.g.length * .2))], null, 2);
        this.i = ki(this, this.g[Math.floor(Number(Math.random() * this.g.length * .5))], null, 2);
        this.v = ki(this, this.i[this.i.length - 1], null, 2);
        this.s = ki(this, this.i[this.i.length - 1], null, 2)
    }
    ;
    ji.prototype.Ba = function(a) {
        var b = 8 + 4 * Math.cos(3 * this.j / 1E3);
        a.save();
        a.globalCompositeOperation = "overlay";
        a.shadowColor = "#7fa7fe";
        li(a, this.g, b);
        li(a, this.o, .5 * b);
        li(a, this.i, .3 * b);
        li(a, this.v, .2 * b);
        li(a, this.s, .1 * b);
        a.restore()
    }
    ;
    var ki = function(a, b, c, d) {
        var e = .5 < Math.random() ? -1 : 1;
        d = Math.pow(2, d) + 1 - 1;
        var f = [b];
        c || (c = new u(b.x + (20 * Math.random() + 10) * e,b.y + 10 * Math.random() + 30));
        f[d] = c;
        mi(a, f, 0, d);
        return f
    }
      , mi = function(a, b, c, d) {
        if (c + 1 != d) {
            var e = Math.floor((c + d) / 2)
              , f = b[c]
              , g = b[d];
            b[e] = new u((f.x + g.x) / 2 + (20 * Math.random() - 10),(f.y + g.y) / 2 + (10 * Math.random() - 5));
            mi(a, b, c, e);
            mi(a, b, e, d)
        }
    }
      , li = function(a, b, c) {
        for (var d = 0; d < b.length - 1; d += 1) {
            var e = b[d]
              , f = b[d + 1];
            a.save();
            a.translate(e.x, e.y);
            a.scale(.2, .2);
            var g = f.x - e.x;
            e = f.y - e.y;
            f = Math.sqrt(g * g + e * e);
            a.rotate(Math.atan2(e, g) + .5 * Math.PI);
            a.scale(2 * c, .14 * f);
            ii.Ba(We, a, -10, -40, 1);
            a.restore();
            c -= .5;
            c = Math.max(0, c)
        }
        a.beginPath();
        a.moveTo(b[0].x, b[0].y);
        for (d = 1; d < b.length; d++)
            a.lineTo(b[d].x, b[d].y);
        a.lineWidth = c;
        a.strokeStyle = "white";
        a.stroke();
        a.closePath()
    };
    var ni = function(a, b, c, d, e, f, g) {
        e = void 0 === e ? Kd : e;
        g = void 0 === g ? function() {}
        : g;
        D.call(this, a);
        this.i = b;
        this.H = c;
        this.s = d;
        this.ta = e;
        this.o = f;
        this.V = g
    };
    p(ni, D);
    ni.prototype.jd = function() {
        null === this.i && void 0 !== this.o && (this.i = this.o())
    }
    ;
    ni.prototype.kd = function() {
        this.s(r(this.i, this.H, this.ta(Tb(this.g / this.duration, 1))))
    }
    ;
    ni.prototype.Lc = function() {
        this.s(this.H);
        this.V()
    }
    ;
    var pi = function() {
        L.call(this, oi);
        this.Aa = this.g = !1
    };
    p(pi, L);
    var qi = function(a) {
        a.g = !0;
        R.Ee.play();
        J(a, new ni(700,.8,.2,function(b) {
            a.opacity = b
        }
        ,Nd));
        G(a, new D(700,null,function() {
            a.Aa = !1
        }
        ))
    }
      , ri = function(a, b) {
        R.Fe.play();
        a.Aa = !0;
        a.g = !1;
        a.opacity = 0;
        I(a, 100, function() {
            K(a);
            var c = gd(b, z(a.getParent()));
            J(a, new E(a,800,c,new u(0,0),function() {}
            ,Nd));
            J(a, new ni(800,0,.8,function(d) {
                a.opacity = d
            }
            ));
            J(a, new ni(800,.4,1,function(d) {
                a.setScale(d)
            }
            ))
        })
    }
      , oi = If([[41, 0, 0, 150, 150], [41, 153, 0, 150, 150], [41, 306, 0, 150, 150], [41, 459, 0, 150, 150], [41, 612, 0, 150, 150], [41, 765, 0, 150, 150], [41, 918, 0, 150, 150], [41, 1071, 0, 150, 150], [41, 1224, 0, 150, 150], [41, 1377, 0, 150, 150], [41, 1530, 0, 150, 150], [41, 1683, 0, 150, 150], [41, 1836, 0, 150, 150], [41, 0, 153, 150, 150], [41, 153, 153, 150, 150], [41, 306, 153, 150, 150], [41, 459, 153, 150, 150], [41, 612, 153, 150, 150], [41, 765, 153, 150, 150], [41, 918, 153, 150, 150], [41, 1071, 153, 150, 150], [41, 1224, 153, 150, 150], [41, 1377, 153, 150, 150], [41, 1530, 153, 150, 150], [41, 1683, 153, 150, 150], [41, 1836, 153, 150, 150]], 83, 0, 0);
    var ui = function() {
        N.call(this, si);
        var a = this;
        this.U(0);
        R.Pe.play();
        G(this, new D(ti,null,function() {
            x(a)
        }
        ));
        this.$ = -1
    };
    p(ui, N);
    var vi = M([[37, 0, 0, 640, 640], [37, 0, 643, 640, 640], [37, 0, 1286, 640, 640], [37, 0, 1929, 640, 640], [38, 0, 0, 640, 640], [38, 643, 0, 640, 640], [38, 1286, 0, 640, 640], [38, 1929, 0, 640, 640], [38, 2572, 0, 640, 640]], 83, 0, 0)
      , ti = Hf(vi)
      , si = new Map([[0, vi]]);
    var wi = Oh()
      , xi = M([[5, 1086, 161, 146, 184], [5, 1086, 161, 146, 184], [5, 1235, 161, 146, 184], [5, 1384, 161, 146, 184], [5, 1533, 161, 146, 184], [5, 1682, 161, 146, 184], [5, 1831, 161, 146, 184], [5, 1980, 161, 146, 184], [5, 2129, 161, 146, 184], [5, 2278, 161, 146, 184], [5, 2427, 161, 146, 184], [5, 2576, 161, 146, 184], [5, 2725, 161, 146, 184], [5, 2874, 161, 146, 184], [5, 3023, 161, 146, 184], [5, 3172, 161, 146, 184], [5, 3321, 161, 146, 184], [5, 3470, 161, 146, 184], [5, 0, 322, 146, 184], [5, 0, 322, 146, 184], [5, 0, 322, 146, 184]], 83, 0, -36)
      , yi = M([[5, 3029, 518, 113, 113]], 0, -40, 0)
      , zi = If([[5, 1829, 348, 117, 167], [5, 1949, 348, 117, 167], [5, 2069, 348, 117, 167], [5, 2189, 348, 117, 167], [5, 2309, 348, 117, 167], [5, 2429, 348, 117, 167], [5, 2549, 348, 117, 167], [5, 2669, 348, 117, 167], [5, 2789, 348, 117, 167], [5, 2909, 348, 117, 167], [5, 3029, 348, 117, 167], [5, 3149, 348, 117, 167], [5, 3269, 348, 117, 167], [5, 3389, 348, 117, 167], [5, 3509, 348, 117, 167], [5, 149, 492, 117, 167], [5, 269, 492, 117, 167], [5, 389, 492, 117, 167], [5, 509, 492, 117, 167], [5, 629, 492, 117, 167], [5, 749, 492, 117, 167], [5, 0, 509, 117, 167], [5, 869, 492, 117, 167], [5, 989, 518, 117, 167], [5, 1109, 518, 117, 167], [5, 1229, 518, 117, 167], [5, 1349, 518, 117, 167], [5, 1469, 518, 117, 167], [5, 1589, 518, 117, 167]], 83, 0, 0)
      , Ai = M([[5, 3145, 518, 110, 113], [5, 3258, 518, 110, 113], [5, 3371, 518, 110, 113], [5, 3484, 518, 110, 113]], 83, 0, -31)
      , Bi = If([[4, 1572, 168, 117, 107], [4, 1692, 168, 117, 107], [4, 1812, 168, 117, 107], [4, 1932, 168, 117, 107], [4, 2052, 168, 117, 107], [4, 2172, 168, 117, 107]], 83, 10, -3)
      , Ci = M([[4, 3179, 0, 159, 151], [4, 3179, 0, 159, 151], [4, 3341, 0, 159, 151], [4, 3503, 0, 159, 151], [4, 3665, 0, 159, 151], [4, 3827, 0, 159, 151], [4, 3827, 0, 159, 151]], 83, 12, -21)
      , Di = M([[4, 3989, 0, 158, 154], [4, 3989, 0, 158, 154], [4, 3179, 154, 158, 154], [4, 3340, 154, 158, 154], [4, 3501, 154, 158, 154], [4, 3662, 154, 158, 154], [4, 3823, 154, 158, 154]], 83, 0, -26.5)
      , Ei = M([[4, 3984, 157, 155, 130], [4, 3984, 157, 155, 130], [4, 2359, 161, 155, 130], [4, 2517, 161, 155, 130], [4, 2675, 161, 155, 130], [4, 2833, 161, 155, 130], [4, 2833, 161, 155, 130]], 83, 0, -19)
      , Fi = M([[4, 780, 168, 129, 144], [4, 780, 168, 129, 144], [4, 912, 168, 129, 144], [4, 1044, 168, 129, 144], [4, 1176, 168, 129, 144], [4, 1308, 168, 129, 144], [4, 1440, 168, 129, 144]], 83, 0, -27)
      , Gi = M([[4, 0, 0, 186, 165], [4, 0, 0, 186, 165], [4, 189, 0, 186, 165], [4, 378, 0, 186, 165], [4, 567, 0, 186, 165], [4, 756, 0, 186, 165], [4, 945, 0, 186, 165]], 83, 0, -27)
      , Hi = M([[4, 1134, 0, 172, 165], [4, 1134, 0, 172, 165], [4, 1309, 0, 172, 165], [4, 1484, 0, 172, 165], [4, 1659, 0, 172, 165], [4, 1834, 0, 172, 165], [4, 2009, 0, 172, 165], [4, 2184, 0, 172, 165]], 83, 0, -27)
      , Ii = M([[5, 1709, 518, 117, 167], [5, 1829, 518, 117, 167], [5, 1949, 518, 117, 167], [5, 2069, 518, 117, 167], [5, 2189, 518, 117, 167], [5, 2309, 518, 117, 167], [5, 2429, 518, 117, 167], [5, 2549, 518, 117, 167], [5, 1709, 518, 117, 167], [5, 2669, 518, 117, 167], [5, 2789, 518, 117, 167], [5, 2909, 518, 117, 167]], 83, 0, 0)
      , Ji = M([[4, 2359, 0, 161, 158], [4, 2359, 0, 161, 158], [4, 2523, 0, 161, 158], [4, 2687, 0, 161, 158], [4, 2851, 0, 161, 158], [4, 3015, 0, 161, 158], [4, 3015, 0, 161, 158]], 83, 6, -22)
      , Ki = M([[4, 2991, 161, 153, 153], [4, 2991, 161, 153, 153], [4, 0, 168, 153, 153], [4, 156, 168, 153, 153], [4, 312, 168, 153, 153], [4, 468, 168, 153, 153], [4, 624, 168, 153, 153]], 83, 0, -28)
      , Li = M([[5, 149, 322, 137, 167], [5, 289, 322, 137, 167], [5, 429, 322, 137, 167], [5, 569, 322, 137, 167], [5, 709, 322, 137, 167], [5, 849, 322, 137, 167], [5, 989, 348, 137, 167], [5, 989, 348, 137, 167], [5, 989, 348, 137, 167], [5, 1129, 348, 137, 167], [5, 1269, 348, 137, 167], [5, 1409, 348, 137, 167], [5, 1549, 348, 137, 167], [5, 1689, 348, 137, 167], [5, 1269, 348, 137, 167], [5, 1409, 348, 137, 167], [5, 1549, 348, 137, 167], [5, 1689, 348, 137, 167], [5, 1269, 348, 137, 167], [5, 1409, 348, 137, 167], [5, 1549, 348, 137, 167], [5, 1689, 348, 137, 167], [5, 1269, 348, 137, 167], [5, 1409, 348, 137, 167], [5, 1549, 348, 137, 167], [5, 1689, 348, 137, 167]], 83, 0, 0)
      , Mi = M([[5, 0, 0, 178, 158], [5, 0, 0, 178, 158], [5, 0, 0, 178, 158], [5, 0, 0, 178, 158], [5, 0, 0, 178, 158], [5, 181, 0, 178, 158], [5, 362, 0, 178, 158], [5, 543, 0, 178, 158], [5, 724, 0, 178, 158], [5, 905, 0, 178, 158], [5, 1086, 0, 178, 158], [5, 1267, 0, 178, 158], [5, 1448, 0, 178, 158], [5, 1629, 0, 178, 158], [5, 1810, 0, 178, 158], [5, 1991, 0, 178, 158], [5, 2172, 0, 178, 158], [5, 2353, 0, 178, 158], [5, 2534, 0, 178, 158], [5, 2715, 0, 178, 158], [5, 2896, 0, 178, 158], [5, 3077, 0, 178, 158], [5, 3258, 0, 178, 158], [5, 3439, 0, 178, 158], [5, 0, 161, 178, 158], [5, 181, 161, 178, 158], [5, 362, 161, 178, 158], [5, 543, 161, 178, 158], [5, 724, 161, 178, 158], [5, 905, 161, 178, 158]], 83, -40, 0)
      , Ni = new Map([[12, Bi], [1, Ai], [0, zi], [13, Bi], [10, Ii], [2, Ci], [3, Di], [4, Ei], [5, Fi], [6, Ji], [7, Ki], [8, Gi], [9, Hi], [11, xi], [15, Li]])
      , Oi = new Map([[10, R.Sd]])
      , Pi = new Map([[0, yi], [1, Mi]])
      , Qi = function() {
        N.call(this, Ni, Oi);
        this.o = new pi;
        this.brightness = 100;
        this.W = 150;
        this.H = !1;
        this.s = 0;
        y(this, 320, 180);
        this.i = 5;
        this.ka = this.i - 1;
        this.state = 0;
        wi.addListener(this);
        w(this, this.o)
    };
    p(Qi, N);
    var Ri = function(a) {
        0 >= a.s && 1 != a.state && (a.i = Math.max(0, a.i - 1),
        O(a, 1, 0),
        0 >= a.i && !a.H ? (a.H = !0,
        S(wi, 0),
        O(a, 15, 350, void 0, void 0, function() {
            R.Rd.play()
        }),
        a.g && O(a.g, 1, 350),
        H(a, 900),
        Pd(a, 1E3, z(a), new u(z(a).x,-100), function() {}, Ld),
        I(a, 500, function() {
            S(wi, 16)
        })) : (a.s = a.W,
        O(a, 0, 350)));
        a.i <= a.ka && (a.ka--,
        S(wi, 21))
    }
      , Si = function(a) {
        0 != a.state && (a.U(0),
        a.g && a.g.U(0))
    }
      , Ui = function(a, b) {
        if (15 == a.state)
            return !1;
        K(a);
        a.U(Ti.get(b));
        O(a, 0, 500);
        return !0
    };
    Qi.prototype.reset = function() {
        this.i = 5;
        this.ka = this.i - 1;
        this.H = !1;
        this.g && x(this.g)
    }
    ;
    Qi.prototype.update = function(a) {
        this.s -= a;
        N.prototype.update.call(this, a)
    }
    ;
    Qi.prototype.Ba = function(a) {
        100 !== this.brightness ? (a.save(),
        a.filter = "brightness(" + this.brightness + "%)",
        N.prototype.Ba.call(this, a),
        a.restore()) : N.prototype.Ba.call(this, a)
    }
    ;
    Qi.prototype.Sa = function(a, b) {
        switch (a) {
        case 6:
            this.o.Wa() ? (a = this.o,
            a.g || qi(a)) : Ri(this);
            break;
        case 7:
        case 9:
            Vi(this);
            break;
        case 8:
            Wi(this);
            break;
        case 19:
            ri(this.o, b);
            break;
        case 28:
            w(this, new ui);
            break;
        case 18:
            this.i = a = this.i + 1,
            S(wi, 10, a)
        }
    }
    ;
    var Xi = function(a, b, c) {
        O(a, 10, 0);
        O(a, 0, 1E3 / a.Db(), null, b, c)
    }
      , Vi = function(a) {
        0 == a.state && a.U(13)
    }
      , Wi = function(a) {
        13 == a.state && a.U(0)
    }
      , Yi = function(a) {
        a.g ? x(a.g) : (a.g = new N(Pi),
        J(a.g, new hi(a,.7,3)));
        a.g.setScale(2.5);
        a.g.Ab = !1;
        wd(a.g, 2);
        w(a, a.g)
    }
      , Zi = 83 * xi.length
      , Ti = new Map([[0, 2], [1, 3], [2, 4], [3, 5], [4, 6], [5, 9], [6, 7], [8, 8], [7, 0]]);
    [].concat(ja(Ti.entries())).map(function(a) {
        return [a[1], a[0]]
    });
    var $i = ee.ya()
      , aj = function(a) {
        v.call(this);
        this.g = a
    };
    p(aj, v);
    aj.prototype.Ba = function(a) {
        for (var b = this.g.length, c = -5, d = 0; d < b; d++) {
            var e = Xh.get(this.g[d]).wa;
            c += e[3] + 5
        }
        c = -c / 2;
        for (d = 0; d < b; d++)
            e = Xh.get(this.g[d]).wa,
            $i.Ba(e, a, Math.floor(c), Math.floor(-$i.Ga(e) / 2)),
            c += e[3] + 5
    }
    ;
    var bj = function(a, b) {
        this.x = a;
        this.y = b
    };
    Ta(bj, u);
    var cj = function(a) {
        return Math.sqrt(a.x * a.x + a.y * a.y)
    };
    bj.prototype.scale = u.prototype.scale;
    var dj = function(a) {
        return a.scale(1 / cj(a))
    };
    bj.prototype.add = function(a) {
        this.x += a.x;
        this.y += a.y;
        return this
    }
    ;
    bj.prototype.rotate = function(a) {
        var b = Math.cos(a);
        a = Math.sin(a);
        var c = this.y * b + this.x * a;
        this.x = this.x * b - this.y * a;
        this.y = c;
        return this
    }
    ;
    var ej = function(a, b) {
        return new bj(a.x - b.x,a.y - b.y)
    }
      , fj = function(a, b, c) {
        return new bj(r(a.x, b.x, c),r(a.y, b.y, c))
    };
    var gj = Oh()
      , V = function(a, b, c, d, e, f, g, h) {
        N.call(this, a, h);
        this.points = b;
        this.Ha = f;
        this.Da = !1;
        this.s = 0;
        this.o = !0;
        this.Ta = .2;
        this.mb = 0;
        this.Ia = new ji;
        this.Ia.Aa = !1;
        w(this, this.Ia);
        this.Ab = 320 > d;
        this.i = c;
        this.g = new aj(c);
        y(this.g, this.Ab ? -7 : 7, g);
        this.g.$ = 1;
        w(this, this.g);
        this.Gb = Hf(a.get(2));
        this.ka = Hf(a.get(3));
        this.Ca = Hf(a.get(5));
        y(this, d, e);
        460 < this.$ && (this.$ = 460);
        this.opacity = .8;
        J(this, new hi(this,.8,5))
    };
    p(V, N);
    V.prototype.od = function(a) {
        gj.addListener(this);
        N.prototype.od.call(this, a)
    }
    ;
    V.prototype.Ec = function() {
        N.prototype.Ec.call(this);
        gj.removeListener(this)
    }
    ;
    var hj = function(a, b) {
        0 < b && (a.s = b,
        O(a, 1, b, z(a), fj(z(a), a.Ha, 1 - a.Ta * a.Db())))
    }
      , ij = function(a, b, c) {
        c = void 0 === c ? 1 : c;
        J(a, new ni(1E3,0,b,function(d) {
            a.setScale(d);
            a.g.setScale(c)
        }
        ))
    };
    V.prototype.Qb = function() {
        this.Va(0, .8, 1E3)
    }
    ;
    V.prototype.Od = function() {
        K(this);
        Qd(this);
        this.U(2);
        S(gj, 6);
        Lh().play(R.Ud);
        this.ld()
    }
    ;
    V.prototype.ld = function() {
        var a = this;
        O(this, 4, this.Gb, void 0, void 0, function() {
            a.Va(.8, 0, 500)
        });
        O(this, 6, 500)
    }
    ;
    var lj = function(a, b) {
        if (!jj(a) || kj(a) !== b)
            return !1;
        switch (b) {
        case 6:
            return S(gj, 20),
            !0;
        case 8:
            return S(gj, 28),
            !0;
        default:
            return a.H()
        }
    }
      , kj = function(a) {
        if (jj(a))
            return a.i[0]
    };
    V.prototype.H = function() {
        var a = this;
        if (0 === this.i.length)
            return !0;
        var b = this.i.shift();
        b = Xh.get(b).color;
        this.Ib() ? this.Oa(b) : (S(gj, 11, {
            points: this.points,
            position: z(this),
            color: b
        }),
        this.mb = this.state,
        this.U(3),
        J(this, new D(this.ka,null,function() {
            mj(a)
        }
        )),
        this.nd());
        return !0
    }
    ;
    var mj = function(a) {
        2 === a.mb || 1 === a.mb ? a.U(1) : a.U(0)
    };
    V.prototype.Ib = function() {
        return 0 == this.i.length
    }
    ;
    V.prototype.nd = function() {}
    ;
    V.prototype.Oa = function(a, b) {
        a = void 0 === a ? "#000" : a;
        b = void 0 === b ? !0 : b;
        K(this);
        Qd(this);
        gj.removeListener(this);
        this.U(5);
        O(this, 6, this.Ca);
        S(gj, 5, {
            points: this.points,
            position: z(this),
            color: a
        });
        b && Lh().play(R.Rc)
    }
    ;
    var nj = function(a) {
        a.Ia.Aa = !0;
        J(a, new D(500,null,function() {
            a.Ia.Aa = !1
        }
        ))
    };
    V.prototype.update = function(a) {
        N.prototype.update.call(this, a);
        6 == this.state ? x(this) : 1 == this.state && this.Od()
    }
    ;
    V.prototype.Va = function(a, b, c) {
        this.opacity = a;
        J(this, new Sd(this,c,a,b))
    }
    ;
    var oj = function(a, b) {
        a.i = b;
        x(a.g);
        a.g = new aj(b);
        y(a.g, a.Ab ? -7 : 7, -35);
        a.g.$ = 1;
        w(a, a.g)
    }
      , pj = function(a) {
        a.Da && (K(a),
        a.H(),
        a.Da = !1,
        G(a, new D(a.ka,null,function() {
            hj(a, a.s)
        }
        )))
    };
    V.prototype.Sa = function(a) {
        var b = this;
        jj(this) && (20 === a ? (nj(this),
        this.H()) : 28 === a && (this.Da = !0,
        K(this),
        this.U(10),
        O(this, 0, 1E3, z(this), qj(this), function() {
            b.H();
            b.Da = !1;
            hj(b, b.s)
        })))
    }
    ;
    var jj = function(a) {
        return a.getParent() && a.Wa() && 6 != a.state && a.o
    }
      , qj = function(a) {
        a = gd(z(a), a.Ha);
        a = dj(new bj(a.x,a.y));
        return new u(Tb(295 * a.x + 320, 640),Tb(295 * a.y + 180, 360))
    }
      , vj = function(a, b, c, d, e) {
        return new V(new Map([[0, rj], [2, sj], [3, tj], [5, uj], [6, [uj[uj.length - 1]]], [10, tj]]),10,a,b,c,d,void 0 === e ? -35 : e)
    }
      , rj = M([[36, 1668, 0, 83, 105]], 83, 0, 0)
      , tj = M([[36, 1108, 0, 109, 91], [36, 1220, 0, 109, 91], [36, 1332, 0, 109, 91], [36, 1444, 0, 109, 91], [36, 1556, 0, 109, 91], [36, 1556, 0, 109, 91], [36, 1556, 0, 109, 91], [36, 1556, 0, 109, 91]], 83, 0, 0)
      , uj = M([[36, 0, 68, 97, 112], [36, 100, 68, 97, 112], [36, 200, 68, 97, 112], [36, 300, 68, 97, 112], [36, 400, 68, 97, 112], [36, 500, 68, 97, 112], [36, 600, 68, 97, 112], [36, 700, 68, 97, 112]], 83, 0, 0)
      , sj = M([[36, 1668, 0, 83, 105], [36, 800, 68, 83, 105], [36, 1108, 94, 83, 105], [36, 1194, 94, 83, 105], [36, 1280, 94, 83, 105], [36, 1366, 94, 83, 105], [36, 1452, 94, 83, 105], [36, 1538, 94, 83, 105], [36, 1538, 94, 83, 105]], 83, 0, 0);
    var wj = Oh()
      , yj = function(a, b, c) {
        V.call(this, xj, 10, a, b, c, new u(0,0), -35);
        this.Na = b;
        this.Ra = c;
        this.W = R.Yd;
        this.$ = 2E3
    };
    p(yj, V);
    yj.prototype.H = function() {
        var a = this;
        if (0 === this.i.length)
            return !0;
        var b = this.i.shift()
          , c = Xh.get(b).color;
        if (this.Ib()) {
            this.W.stop();
            K(this);
            b = new u(this.Na,this.Ra + 18);
            var d = new u(this.Na,this.Ra + -150);
            I(this, 0, function() {
                R.Gd.play()
            });
            G(this, new E(this,300,null,b,function() {}
            ,Ld));
            G(this, new E(this,600,null,d,function() {}
            ,Md));
            G(this, new C(function() {
                a.Oa(c, !1)
            }
            ))
        } else
            S(wj, 11, {
                points: this.points,
                position: z(this),
                color: c
            }),
            this.U(3),
            J(this, new D(this.ka,null,function() {
                mj(a)
            }
            )),
            this.nd();
        return !0
    }
    ;
    yj.prototype.Ba = function(a) {
        V.prototype.Ba.call(this, a);
        var b = a.createRadialGradient(0, 18, 20, 0, 18, 100);
        b.addColorStop(0, "rgba(240, 183, 29, 1)");
        b.addColorStop(.3, "rgba(240, 183, 29, 0.9)");
        b.addColorStop(1, "rgba(240, 183, 29, 0)");
        a.globalAlpha = .3 * this.opacity;
        a.beginPath();
        a.arc(0, 18, 100, 0, 2 * Math.PI);
        a.fillStyle = b;
        a.fill();
        a.globalAlpha = .4 * this.opacity;
        a.beginPath();
        a.arc(0, 18, 20, 0, 2 * Math.PI);
        a.fillStyle = "#f0b71d";
        a.fill()
    }
    ;
    var Aj = function(a, b, c) {
        b ? c ? zj(a, .1, 1, 1E3, Ld, !0) : a.opacity = 1 : c ? zj(a, 1, .1, 1E3, Ld, !0) : a.opacity = 0
    }
      , Bj = function(a, b) {
        I(a, 0, function() {
            R.Gd.play()
        });
        G(a, new E(a,700,null,b,function() {}
        ,Md))
    }
      , Cj = function(a) {
        H(a, 1E3);
        for (var b = 0; b < Math.floor(Sb(1, 3)); b++)
            H(a, Sb(20, 60)),
            G(a, new C(function() {
                a.opacity = Sb(.5, .8)
            }
            )),
            H(a, Sb(20, 60)),
            G(a, new C(function() {
                a.opacity = 1
            }
            ));
        zj(a, 1, .5, 2E3, Nd);
        zj(a, .5, 1, 2E3, Nd);
        I(a, 200, function() {
            Cj(a)
        })
    }
      , Dj = function(a) {
        J(a, new C(function() {
            Ch(a.W, .1);
            a.W.play(0, !0)
        }
        ));
        J(a, new C(function() {
            setTimeout(function() {
                Dh(a.W, .5, 2)
            }, 10)
        }
        ))
    }
      , zj = function(a, b, c, d, e, f) {
        e = void 0 === e ? Ld : e;
        f = void 0 === f ? !1 : f;
        I(a, 0, function() {
            f && (b < c ? (Ch(R.Cd, .5),
            R.Cd.play()) : (Ch(R.Bd, .5),
            R.Bd.play()))
        });
        G(a, new Sd(a,d,b,c,function() {}
        ,e))
    }
      , Ej = If([[19, 2335, 203, 118, 154]], 83, 0, 0)
      , xj = new Map([[0, Ej], [2, Ej], [3, Ej], [5, Ej], [6, Ej]]);
    var Fj = function(a, b) {
        v.call(this);
        this.g = 0;
        y(this, a, b)
    };
    p(Fj, v);
    Fj.prototype.update = function(a) {
        this.g += a
    }
    ;
    Fj.prototype.Ba = function(a) {
        var b = Math.min(1, this.g / 1500);
        a.save();
        a.lineCap = "round";
        a.lineJoin = "round";
        a.lineWidth = 3;
        a.strokeStyle = "white";
        a.translate(-476, -163);
        Rh(a, b, Vh);
        a.restore()
    }
    ;
    function Gj() {
        if (Eh)
            for (var a = n(Object.keys(Ih.ya().o)), b = a.next(); !b.done; b = a.next())
                Ih.ya().o[b.value].S = Ih.ya().o[b.value].S + 25
    }
    ;var Hj = "af am ar az be bg bn bs ca cs da de el en en-GB es es-419 et eu fa fi fil fr fr-ca gl gu hi hr hu hy id is it iw ja ka kk km kn ko ky lo lt lv mk ml mn mr ms my ne nl no pa pl pt-BR pt-PT ro ru si sk sl sn sq sr sv sw ta te th tr uk ur uz vi zh-CN zh-HK zh-TW zu".split(" ");
    var Ij = function(a) {
        var b = this;
        this.o = a;
        this.g = this.i = 0;
        this.j = new Promise(function(c) {
            b.v = c
        }
        )
    }
      , Jj = function(a) {
        var b = document.createElement("canvas").getContext("2d");
        return function() {
            a(b)
        }
    }
      , Kj = function(a) {
        a.Fa() ? a.v(a) : requestAnimationFrame(function() {
            var b = performance.now();
            do {
                a.o();
                var c = performance.now() - b;
                ++a.i;
                a.g += c
            } while (5 > c && !a.Fa());
            Kj(a)
        });
        return a.j
    };
    Ij.prototype.Fa = function() {
        return 15 <= this.g || 100 < this.i
    }
    ;
    var Lj = Oh()
      , Nj = function(a, b) {
        V.call(this, Mj, 10, [], a, b, new u(100,180), -35);
        this.Ab = this.W = !1;
        this.Ta = .15
    };
    p(Nj, V);
    Nj.prototype.update = function(a) {
        V.prototype.update.call(this, a);
        -20 > z(this).x && this.W && x(this)
    }
    ;
    Nj.prototype.Oa = function(a) {
        a = void 0 === a ? "#000" : a;
        K(this);
        Qd(this);
        Lj.removeListener(this);
        this.U(5);
        O(this, 14, this.Ca);
        var b = new E(this,1E3,null,new u(640,z(this).y))
          , c = new Sd(this,500,1,0);
        G(this, new Bd([b, c]));
        O(this, 6, 0);
        S(Lj, 5, {
            points: this.points,
            position: z(this),
            color: a
        });
        R.Rc.play()
    }
    ;
    var Oj = M([[34, 1369, 1061, 79, 36]], 83, 0, 0)
      , Pj = M([me, ne], 83, 0, 0)
      , Qj = M([oe], 83, 0, 0)
      , Rj = M([je, ke, le], 83, 0, 0)
      , Sj = M(vf, 83, 0, 0)
      , Tj = M(wf, 83, 0, 0)
      , Uj = M([[34, 1929, 0, 86, 64], [34, 1929, 67, 86, 64], [34, 1929, 134, 86, 64], [34, 1929, 201, 86, 64], [34, 1929, 268, 86, 64], [34, 1929, 268, 86, 64], [34, 1929, 335, 86, 64], [34, 1929, 335, 86, 64], [34, 1929, 402, 86, 64], [34, 1929, 469, 86, 64], [34, 1929, 536, 86, 64], [34, 1929, 603, 86, 64], [34, 1929, 670, 86, 64], [34, 1619, 726, 86, 64], [34, 1708, 726, 86, 64], [34, 1797, 726, 86, 64], [34, 1797, 726, 86, 64], [34, 1797, 726, 86, 64], [34, 1886, 737, 86, 64], [34, 1797, 726, 86, 64], [34, 1886, 737, 86, 64], [34, 1797, 726, 86, 64], [34, 1797, 726, 86, 64], [34, 1797, 726, 86, 64], [34, 1797, 726, 86, 64], [34, 1797, 726, 86, 64], [34, 1797, 726, 86, 64], [34, 1619, 793, 86, 64], [34, 1708, 793, 86, 64], [34, 1797, 793, 86, 64], [34, 1886, 804, 86, 64]], 83, 0, 0)
      , Vj = If([[34, 1451, 1061, 79, 36]], 83, 0, 0)
      , Mj = new Map([[0, Oj], [2, Sj], [3, Oj], [11, Pj], [12, Rj], [5, Tj], [13, Uj], [14, Qj], [6, Oj]])
      , Wj = new Map([[0, Vj], [2, Vj], [3, Vj], [5, Vj], [6, Vj]]);
    var Xj = Oh()
      , Zj = function() {
        N.call(this, Yj);
        this.T = this.va = null;
        this.Za = 0;
        this.Jc = !0;
        this.Tb = 0;
        this.brightness = 20;
        this.bc = R.xe;
        y(this, 320, 180);
        this.opacity = 0;
        this.setScale(.8);
        Xj.addListener(this);
        this.reset()
    };
    p(Zj, N);
    m = Zj.prototype;
    m.reset = function() {
        this.Za = 8E3;
        this.Jc = !0;
        this.Tb = 0
    }
    ;
    m.update = function(a) {
        var b = this, c;
        if (null === (c = this.va) || void 0 === c ? 0 : 5 === c.state)
            this.va = null,
            this.bc.stop(),
            K(this),
            Qd(this),
            this.Ib() ? this.Oa() : (this.U(4),
            H(this, 500),
            ak(this, 1E3, this.Db(), .8),
            I(this, 0, function() {
                b.Va(1, 0, 1E3)
            }));
        N.prototype.update.call(this, a)
    }
    ;
    m.Ba = function(a) {
        a.save();
        a.filter = "brightness(" + this.brightness + "%)";
        N.prototype.Ba.call(this, a);
        a.restore()
    }
    ;
    m.Ib = function() {
        return 3 === this.Tb
    }
    ;
    m.Oa = function() {
        this.U(6);
        R.ue.play();
        this.T && (this.T.brightness = 100)
    }
    ;
    m.Hb = function(a, b) {
        this.T = b;
        this.Jc = !0;
        this.Tb++;
        this.va = a;
        a = z(this);
        y(this.va, a.x, a.y);
        this.va.points = 100;
        this.va.opacity = 0;
        this.va.g.opacity = 0;
        this.va.$ = this.$ + 1;
        this.Za -= 1E3;
        this.Eb()
    }
    ;
    m.Eb = function() {
        var a = this;
        this.setScale(.8);
        O(this, 0, 300);
        this.Jc && (this.opacity = 0,
        I(this, 10, function() {
            a.va && J(a, new Sd(a.va.g,1500,0,1,function() {}
            ,Ld));
            J(a, new Sd(a,1500,0,1,function() {}
            ,Ld))
        }));
        bk(this);
        I(this, 0, function() {
            J(a, new Jf(a,1,2E3,void 0,void 0,void 0))
        });
        ak(this, this.Za - Hf(ck), .8, 1.5);
        O(this, 2, 0);
        H(this, Hf(ck) - 200);
        I(this, 0, function() {
            a.bc.stop();
            R.te.play();
            S(Xj, 6)
        });
        O(this, 5, 0);
        H(this, Hf(dk));
        ak(this, 1E3, 1.5, .8, function() {
            a.Jc = !1;
            a.Eb()
        })
    }
    ;
    var ak = function(a, b, c, d, e) {
        e = void 0 === e ? function() {}
        : e;
        var f = new ni(b,c,d,function(k) {
            a.setScale(k)
        }
        ,Ld)
          , g = 100
          , h = 40;
        d < c && (g = 40,
        h = 100);
        c = new ni(.8 * b,null,g,function(k) {
            a.brightness = k
        }
        ,Ld,function() {
            return a.brightness
        }
        );
        b = new ni(.6 * b,null,h,function(k) {
            a.T && (a.T.brightness = k)
        }
        ,Ld,function() {
            return a.T ? a.T.brightness : 100
        }
        );
        f = new Bd([f, c, b]);
        G(a, f);
        G(a, new C(function() {
            e()
        }
        ))
    }
      , bk = function(a) {
        I(a, 0, function() {
            Ch(a.bc, .1);
            a.bc.play()
        });
        I(a, 2, function() {
            Dh(a.bc, 1, 4)
        })
    };
    Zj.prototype.Sa = function(a) {
        0 === a && (Qd(this),
        K(this),
        ak(this, 500, 1.5, .8),
        I(this, 0, function() {
            R.we.play()
        }),
        O(this, 7, 0))
    }
    ;
    var ek = M([pe], 83, 0, 0)
      , fk = M([pe, [21, 562, 0, 559, 360], [21, 1124, 0, 559, 360], [21, 1686, 0, 559, 360], [21, 2248, 0, 559, 360], [21, 2810, 0, 559, 360], [21, 0, 363, 559, 360], [21, 562, 363, 559, 360], [21, 1124, 363, 559, 360], [21, 1686, 363, 559, 360], [21, 2248, 363, 559, 360]], 83, 0, 0)
      , ck = M([[22, 0, 0, 559, 360], [22, 0, 0, 559, 360], [22, 562, 0, 559, 360], [22, 1124, 0, 559, 360], [22, 1686, 0, 559, 360]], 83, 0, 0)
      , dk = M([[22, 2248, 0, 559, 360], [22, 2810, 0, 559, 360], [23, 1124, 0, 559, 360], [23, 1686, 0, 559, 360], [23, 2248, 0, 559, 360], [23, 2810, 0, 559, 360], [23, 0, 363, 559, 360], [23, 562, 363, 559, 360], [23, 1124, 363, 559, 360], [23, 1124, 363, 559, 360], [23, 1124, 363, 559, 360], [23, 1686, 363, 559, 360], [23, 2248, 363, 559, 360], pe], 83, 0, 0)
      , gk = M([[20, 0, 0, 403, 336], [20, 406, 0, 403, 336], [20, 812, 0, 403, 336], [20, 1218, 0, 403, 336], [20, 1624, 0, 403, 336], [20, 2030, 0, 403, 336], [20, 2030, 0, 403, 336], [20, 2030, 0, 403, 336], [20, 2030, 0, 403, 336], [20, 2030, 0, 403, 336], [20, 2030, 0, 403, 336], [20, 2030, 0, 403, 336], [20, 2436, 0, 403, 336], [20, 0, 339, 403, 336], [20, 406, 339, 403, 336], [20, 812, 339, 403, 336], [20, 1218, 339, 403, 336], [20, 1624, 339, 403, 336], [20, 2030, 339, 403, 336]], 83, 0, 0)
      , hk = M([[24, 0, 0, 640, 360], [24, 643, 0, 640, 360], [24, 1286, 0, 640, 360], [24, 1929, 0, 640, 360], [24, 2572, 0, 640, 360], [24, 3215, 0, 640, 360], [24, 0, 363, 640, 360], [24, 643, 363, 640, 360], [24, 1286, 363, 640, 360], [24, 1929, 363, 640, 360], [24, 2572, 363, 640, 360], [24, 3215, 363, 640, 360], [25, 0, 0, 640, 360], [25, 643, 0, 640, 360], [25, 1286, 0, 640, 360], [25, 1929, 0, 640, 360], [25, 2572, 0, 640, 360], [25, 0, 363, 640, 360], [25, 643, 363, 640, 360], [25, 0, 363, 640, 360], [25, 643, 363, 640, 360], [25, 1286, 363, 640, 360], [25, 1929, 363, 640, 360], [25, 2572, 363, 640, 360], [26, 0, 0, 640, 360], [26, 643, 0, 640, 360], [26, 1286, 0, 640, 360], [26, 1929, 0, 640, 360], [26, 2572, 0, 640, 360], [26, 3215, 0, 640, 360], [26, 3215, 0, 640, 360], [26, 3215, 0, 640, 360], [26, 3215, 0, 640, 360], [26, 3215, 0, 640, 360], [26, 3215, 0, 640, 360], [26, 3215, 0, 640, 360], [27, 0, 0, 640, 360], [27, 643, 0, 640, 360], [27, 1286, 0, 640, 360], [27, 0, 363, 640, 360], [27, 643, 363, 640, 360], [27, 1286, 363, 640, 360], [27, 0, 726, 640, 360], [27, 643, 726, 640, 360], [27, 1286, 726, 640, 360], [28, 0, 0, 640, 360], [28, 643, 0, 640, 360], [28, 1286, 0, 640, 360], [28, 0, 363, 640, 360], [28, 643, 363, 640, 360], [28, 1286, 363, 640, 360], [28, 0, 726, 640, 360], [28, 643, 726, 640, 360], [28, 1286, 726, 640, 360]], 83, 0, 0)
      , ik = M([[29, 0, 0, 403, 336], [29, 0, 0, 403, 336], [29, 406, 0, 403, 336], [29, 812, 0, 403, 336], [29, 1218, 0, 403, 336], [29, 1624, 0, 403, 336], [29, 0, 339, 403, 336], [29, 406, 339, 403, 336], [29, 812, 339, 403, 336], [29, 1218, 339, 403, 336], [29, 1624, 339, 403, 336], [29, 0, 678, 403, 336], [29, 406, 678, 403, 336], [29, 812, 678, 403, 336], [29, 1218, 678, 403, 336], [29, 1624, 678, 403, 336], [30, 0, 0, 403, 336], [30, 406, 0, 403, 336], [30, 812, 0, 403, 336], [30, 1218, 0, 403, 336], [30, 1624, 0, 403, 336], [30, 406, 0, 403, 336], [30, 2030, 0, 403, 336], [30, 2436, 0, 403, 336], [30, 2842, 0, 403, 336], [30, 406, 0, 403, 336], [30, 3248, 0, 403, 336], [30, 3654, 0, 403, 336], [30, 4060, 0, 403, 336], [30, 406, 0, 403, 336]], 83, 0, 0)
      , Yj = new Map([[0, ek], [1, fk], [2, ck], [5, dk], [3, ek], [4, gk], [6, hk], [7, ik]]);
    var jk = Oh()
      , kk = ee.ya()
      , lk = [["o"]]
      , mk = [{
        Xc: ["..oo....".split(""), ".oooo..o".split(""), ".oooo.oo".split(""), "oooooooo".split(""), ".oooo.oo".split(""), ".oooo..o".split(""), "..oo....".split("")],
        hd: 10,
        Wc: "-|-v-|-v"
    }, {
        Xc: [[".", "o", "o", ".", "o"], ["o", "o", "o", "o", "o"], [".", "o", "o", ".", "o"]],
        hd: 7,
        Wc: "^|v^|v^|"
    }, {
        Xc: lk,
        hd: 4,
        Wc: "^-^-^z"
    }]
      , nk = ie[3]
      , ok = kk.Ga(ie)
      , pk = ["|", "v", "^", "-"]
      , sk = function() {
        N.call(this, qk);
        this.g = new v;
        this.va = null;
        this.o = new u(450,180);
        this.Za = 7E3;
        this.s = new F;
        this.i = 0;
        this.H = !1;
        this.opacity = 0;
        y(this, this.o);
        w(this, this.g);
        rk(this);
        J(this, new hi(this,.8,5));
        w(this, this.s)
    };
    p(sk, N);
    var rk = function(a) {
        Qd(a);
        K(a);
        vd(a.g);
        x(a.g);
        a.g = new v;
        y(a.g, 400, 0);
        w(a, a.g);
        var b = mk[a.i].Xc;
        b === lk && (a.H = !0);
        for (var c = 0; c < b.length; c++)
            for (var d = 0; d < b[c].length; d++)
                if ("o" === b[c][d]) {
                    var e = new Nj(d * nk * .54,c * ok * .9 * .8);
                    e.setScale(.9);
                    w(a.g, e)
                }
        c = a.g;
        c.Yb = .54 * -nk * b[0].length / 2;
        ud(c);
        wd(a.g, .9 * -ok * .8 * b.length / 2);
        G(a, new E(a.g,2E3,null,new u(0,0)))
    }
      , uk = function(a, b) {
        var c = 0
          , d = new Map
          , e = [].concat(ja(a.g.Ka()));
        ib(e);
        var f = mk[a.i].hd
          , g = e.slice(0, f)
          , h = e.slice(f);
        f = 0;
        var k = 360 / h.length;
        h = n(h);
        for (var l = h.next(); !l.done; l = h.next()) {
            l = l.value;
            l.W = !0;
            l.Rb = Wj;
            .5 > Math.random() ? l.setScale(.5) : l.setScale(.3);
            l.opacity = 1;
            l.$ = 0;
            y(l, 680, f);
            var q = 1E3 * Sb(5, 10);
            q > c && (c = q);
            l = new E(l,q,null,new u(-50,f),function() {}
            );
            d.set(l, !1);
            f += k
        }
        f = 360 / g.length;
        k = 0;
        h = {};
        g = n(g);
        for (l = g.next(); !l.done; h = {
            Fb: h.Fb,
            $b: h.$b
        },
        l = g.next())
            h.Fb = l.value,
            y(h.Fb, 680, k),
            k += f,
            h.$b = 1E3 * Sb(6, 10),
            h.$b > c && (c = h.$b),
            l = new C(function(t) {
                return function() {
                    hj(t.Fb, t.$b)
                }
            }(h)),
            d.set(l, !0),
            oj(h.Fb, tk()),
            h.Fb.$ = 2,
            l = h.Fb.g,
            l.setScale(.75),
            l.Yb = -10,
            ud(l),
            wd(l, 20);
        I(a, 0, function() {
            vd(a.g);
            for (var t = n(e), B = t.next(); !B.done; B = t.next())
                w(b, B.value)
        });
        f = Array.from(d.keys());
        ib(f);
        g = {};
        f = n(f);
        for (k = f.next(); !k.done; g = {
            yc: g.yc
        },
        k = f.next())
            g.yc = k.value,
            k = d.get(g.yc) ? 300 : 100,
            c += k,
            I(a, k, function(t) {
                return function() {
                    J(a, t.yc)
                }
            }(g));
        return c
    }
      , vk = function(a) {
        for (var b = a.g.Ka().length, c = [], d = 0; d < b; d++) {
            var e = a.g.Ka()[d]
              , f = new u;
            f.y = d <= b / 2 ? -300 : 300;
            f.x = z(e).x - Sb(100, 200);
            e = new E(e,Sb(1E3, 2E3),z(e),f,function() {}
            ,Ld);
            c.push(e)
        }
        b = new Bd(c);
        G(a, b);
        return b
    };
    sk.prototype.update = function(a) {
        var b;
        if (null === (b = this.va) || void 0 === b ? 0 : 5 === b.state) {
            this.va = null;
            K(this);
            Qd(this);
            this.U(3);
            if (this.H) {
                var c = this.g.Ka()[0];
                R.le.play();
                O(c, 13, 0);
                O(c, 14, Hf(c.Rb.get(13)));
                Pd(c, 1E3, null, new u(640,-180));
                N.prototype.update.call(this, a);
                return
            }
            c = n(this.g.Ka());
            for (var d = c.next(); !d.done; d = c.next())
                d = d.value,
                O(d, 11, 0),
                O(d, 0, 700);
            Pd(this, 700, null, this.o);
            c = 0;
            c = void 0 === c ? 0 : c;
            this.va && (d = new E(this.va,700,null,this.o),
            H(this.s, c),
            G(this.s, d))
        }
        N.prototype.update.call(this, a)
    }
    ;
    sk.prototype.Hb = function(a, b) {
        this.Za -= 1E3;
        this.va = a;
        a = z(this);
        y(this.va, a.x, a.y);
        this.va.points = 75;
        this.va.opacity = 0;
        this.va.o = !1;
        this.va.g.opacity = 0;
        this.va.$ = this.$ + 1;
        this.Eb(b)
    }
    ;
    sk.prototype.Eb = function(a) {
        var b = this;
        this.va && 0 === this.va.g.opacity && (I(this, 0, function() {
            var c;
            null === (c = b.va) || void 0 === c ? void 0 : c.o = !0
        }),
        G(this, new Sd(this.va.g,500,0,1)));
        wk(this, this.Za, new u(a.x + this.j.wa[3] / 2.1,a.y));
        I(this, 10, function() {
            R.he.play();
            S(jk, 6);
            for (var c = b.H ? 2 : 12, d = n(b.g.Ka()), e = d.next(); !e.done; e = d.next())
                e = e.value,
                O(e, c, 0),
                O(e, 0, Hf(e.Rb.get(c)))
        });
        wk(this, 700, this.o);
        G(this, new C(function() {
            b.Eb(a)
        }
        ))
    }
    ;
    var wk = function(a, b, c) {
        var d = []
          , e = new E(a,b,null,c);
        b = new E(a.va,b,null,c);
        a.va && d.push(b);
        d.push(e);
        G(a, new Bd(d))
    }
      , tk = function() {
        for (var a = [], b = 0; 3 > b; b++)
            a.push(pk[Math.floor(Math.random() * pk.length)]);
        return fi(a.join(""))
    }
      , xk = If([[34, 1286, 726, 330, 264]], 83, 0, 0)
      , qk = new Map([[0, xk], [1, xk], [4, xk], [2, xk], [3, xk]]);
    var yk = Oh()
      , zk = If([qe, qe, qe, qe, qe, qe, qe, qe, [33, 270, 363, 127, 161], [33, 400, 363, 127, 161], [33, 530, 363, 127, 161], [33, 660, 363, 127, 161], [33, 790, 363, 127, 161], [33, 920, 363, 127, 161]], 83, 2, -10)
      , Ak = M([[32, 0, 0, 255, 142], [32, 258, 0, 255, 142], [32, 516, 0, 255, 142], [32, 774, 0, 255, 142], [32, 1032, 0, 255, 142], [32, 1290, 0, 255, 142], [32, 0, 145, 255, 142], [32, 258, 145, 255, 142], [32, 516, 145, 255, 142], [32, 774, 145, 255, 142], [32, 1032, 145, 255, 142], [32, 1290, 145, 255, 142], [32, 0, 290, 255, 142], [32, 258, 290, 255, 142], [32, 516, 290, 255, 142], [32, 774, 290, 255, 142], [32, 1032, 290, 255, 142], [32, 1290, 290, 255, 142], [32, 0, 435, 255, 142], [32, 258, 435, 255, 142], [32, 516, 435, 255, 142], [32, 774, 435, 255, 142], [32, 1032, 435, 255, 142], [32, 1290, 435, 255, 142], [32, 0, 580, 255, 142]], 83, -39, 9)
      , Bk = If([[33, 2194, 0, 137, 162], [33, 1902, 354, 137, 162], [33, 2042, 354, 137, 162], [33, 2182, 354, 137, 162], [33, 0, 363, 137, 162], [33, 2194, 0, 137, 162], re, re, re, re, re, re, re, re], 83, 0, 0)
      , Ck = M([[33, 2024, 176, 151, 175], [33, 2178, 176, 151, 175], [33, 1286, 225, 151, 175], [33, 1440, 352, 151, 175], [33, 1594, 352, 151, 175], [33, 1748, 352, 151, 175], [33, 1748, 352, 151, 175]], 83, 0, 0)
      , Dk = M([[32, 258, 580, 158, 160], [32, 419, 580, 158, 160], [32, 580, 580, 158, 160], [32, 741, 580, 158, 160], [32, 902, 580, 158, 160], [32, 902, 580, 158, 160], [32, 902, 580, 158, 160], [32, 902, 580, 158, 160], [32, 1063, 580, 158, 160], [32, 1224, 580, 158, 160], [32, 1385, 580, 158, 160], [32, 0, 725, 158, 160], [32, 161, 743, 158, 160], [32, 322, 743, 158, 160], [32, 483, 743, 158, 160], [32, 644, 743, 158, 160], [32, 805, 743, 158, 160], [32, 966, 743, 158, 160], [32, 966, 743, 158, 160], [32, 966, 743, 158, 160], [32, 1127, 743, 158, 160], [32, 1288, 743, 158, 160], [32, 0, 888, 158, 160], [32, 161, 906, 158, 160], [32, 322, 906, 158, 160], [32, 483, 906, 158, 160], [32, 644, 906, 158, 160], [32, 805, 906, 158, 160], [32, 966, 906, 158, 160], [32, 1127, 906, 158, 160], [32, 1288, 906, 158, 160], [32, 0, 1051, 158, 160], [32, 0, 1051, 158, 160], [32, 0, 1051, 158, 160], [32, 0, 1051, 158, 160], [32, 0, 1051, 158, 160], [32, 0, 1051, 158, 160]], 83, 0, 0)
      , Ek = M([[33, 1514, 0, 167, 173], [33, 1684, 0, 167, 173], [33, 1854, 0, 167, 173], [33, 2024, 0, 167, 173], [33, 1514, 176, 167, 173], [33, 1684, 176, 167, 173], [33, 1854, 176, 167, 173]], 83, 0, 0)
      , Fk = If(xf, 83, 0, 0)
      , Gk = If([[33, 1440, 225, 56, 56]], 83, -2, 52)
      , Hk = new Map([[2, R.Ed]])
      , Ik = new Map([[0, Bk], [2, Ek], [9, Fk], [3, Ck], [5, Dk], [13, Gk], [6, [Dk[Dk.length - 1]]], [7, Ak], [14, zk], [10, Ck], [9, Fk]])
      , Jk = function() {
        V.call(this, Ik, 100, fi("-"), 0, 0, kd, -60, Hk);
        this.Ra = ["--^--^@", "v|v|v|@", "|-v|^@"];
        this.W = [new u(170,210), new u(120,150), new u(220,250)];
        y(this, this.W[0].x, this.W[0].y);
        this.i = [].concat(ja(fi(this.Ra.shift())));
        this.g.g = this.i;
        this.opacity = 0;
        this.g.opacity = 0;
        this.Na = this.W[0];
        this.W.shift();
        this.Ta = .3;
        this.o = !1
    };
    p(Jk, V);
    m = Jk.prototype;
    m.ld = function() {
        var a = this;
        O(this, 9, this.Gb);
        O(this, 0, this.ka, z(this), this.Na, function() {
            hj(a, a.s)
        })
    }
    ;
    m.Ib = function() {
        return 0 === this.i.length && 0 === this.Ra.length
    }
    ;
    m.Od = function() {
        K(this);
        Qd(this);
        this.U(2);
        S(yk, 6);
        this.ld()
    }
    ;
    m.Oa = function(a) {
        var b = this;
        V.prototype.Oa.call(this, void 0 === a ? "#000" : a);
        K(this);
        I(this, 800, function() {
            R.fe.play()
        });
        O(this, 13, this.Ca, void 0, void 0, function() {
            var c = new L(sf);
            w(b, c);
            y(c, 0, -51);
            c.Ab = !0;
            J(c, new hi(c,.8,5))
        });
        H(this, 2E4)
    }
    ;
    m.Qb = function() {
        var a = this;
        I(this, 0, function() {
            y(a, new u(999,999));
            a.opacity = 1;
            a.U(14)
        });
        Pd(this, 2E3, new u(160,460), z(this));
        I(this, 200, function() {
            a.U(7)
        });
        I(this, Hf(Ak), function() {
            a.g.opacity = 1;
            a.U(0);
            a.o = !0
        })
    }
    ;
    m.nd = function() {
        var a = this;
        if (0 === this.i.length) {
            K(this);
            var b = this.Ra.shift();
            R.Rc.play();
            b || this.Oa();
            this.Na = this.W.shift();
            O(this, 0, this.ka, z(this), this.Na, function() {
                a.i.push.apply(a.i, ja(fi(b)));
                a.s *= .5;
                hj(a, a.s)
            })
        }
    }
    ;
    var Kk = Oh();
    ee.ya();
    var Pk = function() {
        N.call(this, Lk);
        this.va = null;
        this.Za = 7E3;
        this.T = null;
        this.Xb = new L(Mk);
        this.tc = new L(Nk);
        this.Tb = 0;
        this.Zc = R.Ce;
        this.Xb.opacity = 0;
        wd(this.Xb, 65);
        this.tc.opacity = 0;
        w(this, this.tc);
        w(this, this.Xb);
        wd(this.tc, 215);
        y(this, 320, 360 - this.Ga() / 2);
        this.$ = -1;
        this.U(0);
        H(this, Hf(Ok));
        O(this, 1, 1);
        Kk.addListener(this)
    };
    p(Pk, N);
    m = Pk.prototype;
    m.update = function(a) {
        var b;
        if (null === (b = this.va) || void 0 === b ? 0 : 5 === b.state)
            this.Zc.stop(),
            R.Be.play(),
            this.va = null,
            K(this),
            Qd(this),
            this.Ib() ? this.Oa() : (this.U(5),
            Qk(this),
            this.Rb === Rk || O(this, 1, 1));
        N.prototype.update.call(this, a)
    }
    ;
    m.Ib = function() {
        return 3 === this.Tb
    }
    ;
    m.Oa = function() {
        R.ze.play();
        this.U(6)
    }
    ;
    m.Hb = function(a, b) {
        this.va = a;
        this.T = b;
        this.Tb++;
        a = z(this);
        y(this.va, a.x, a.y);
        this.va.points = 100;
        this.va.opacity = 0;
        this.va.g.$ = b.$ + 1;
        this.va.$ = this.$ + 1;
        this.Za -= 1E3;
        this.Eb()
    }
    ;
    m.Eb = function() {
        var a = this;
        O(this, 1, 300);
        I(this, 0, function() {
            a.Zc.play()
        });
        O(this, 2, 1, null, void 0, function() {
            a.U(3)
        });
        Sk(this);
        H(this, 20);
        O(this, 4, 1);
        I(this, 0, function() {
            a.Zc.stop();
            R.ye.play()
        });
        Qk(this, function() {
            a.Eb()
        })
    }
    ;
    var Sk = function(a) {
        var b = new E(a.T,a.Za,null,new u(nd.x,z(a).y),function() {
            S(Kk, 6)
        }
        );
        G(a, b)
    }
      , Qk = function(a, b) {
        b = new E(a.T,1E3,null,nd,void 0 === b ? function() {}
        : b);
        G(a, b)
    };
    Pk.prototype.Sa = function(a) {
        0 === a && (Qd(this),
        K(this),
        this.va && (this.va.g.opacity = 0),
        O(this, 7, 0))
    }
    ;
    var Tk = If([[8, 1046, 1298, 519, 191], [8, 1046, 1492, 519, 191], [8, 0, 1494, 519, 191], [8, 522, 1494, 519, 191], [8, 1044, 1686, 519, 191], [8, 0, 1688, 519, 191], [8, 1046, 1298, 519, 191], [8, 1046, 1492, 519, 191], [8, 0, 1494, 519, 191], [8, 522, 1494, 519, 191], [8, 1044, 1686, 519, 191], [8, 0, 1688, 519, 191], [8, 1046, 1298, 519, 191]], 83, 0, 0)
      , Ok = M([[9, 0, 0, 519, 191], [9, 0, 0, 519, 191], [9, 0, 0, 519, 191], [9, 0, 0, 519, 191], [9, 0, 0, 519, 191], [9, 0, 0, 519, 191], [9, 0, 0, 519, 191], [9, 0, 0, 519, 191], [9, 0, 0, 519, 191], [9, 522, 0, 519, 191], [9, 1044, 0, 519, 191], [9, 1566, 0, 519, 191], [9, 0, 0, 519, 191], [9, 1566, 0, 519, 191], [9, 2088, 0, 519, 191], [9, 2610, 0, 519, 191], [9, 3132, 0, 519, 191], [9, 3654, 0, 519, 191], [9, 3654, 0, 519, 191], [9, 3654, 0, 519, 191], [9, 3654, 0, 519, 191], [9, 3654, 0, 519, 191], [9, 3654, 0, 519, 191], [9, 3654, 0, 519, 191], [9, 3654, 0, 519, 191], [9, 3654, 0, 519, 191], [9, 3654, 0, 519, 191], [9, 3654, 0, 519, 191], [9, 3654, 0, 519, 191], [9, 4176, 0, 519, 191], [9, 4698, 0, 519, 191], [9, 0, 194, 519, 191], [9, 522, 194, 519, 191], [9, 1044, 194, 519, 191], [9, 1566, 194, 519, 191], [9, 2088, 194, 519, 191], [9, 2610, 194, 519, 191], [9, 3132, 194, 519, 191], [9, 3654, 194, 519, 191], [9, 4176, 194, 519, 191], [9, 1566, 194, 519, 191], [9, 2088, 194, 519, 191], [9, 2610, 194, 519, 191], [9, 3132, 194, 519, 191], [9, 3654, 194, 519, 191], [9, 4176, 194, 519, 191]], 83, 0, 0)
      , Uk = M([[10, 0, 0, 528, 254], [10, 531, 0, 528, 254], [10, 1062, 0, 528, 254], [10, 1593, 0, 528, 254], [10, 2124, 0, 528, 254], [10, 2655, 0, 528, 254], [10, 3186, 0, 528, 254], [10, 3186, 0, 528, 254], [10, 3186, 0, 528, 254], [10, 3186, 0, 528, 254], [10, 3186, 0, 528, 254], [10, 3186, 0, 528, 254], [10, 0, 257, 528, 254], [10, 531, 257, 528, 254], [10, 1062, 257, 528, 254], [10, 1062, 257, 528, 254], [10, 1062, 257, 528, 254], [10, 1062, 257, 528, 254], [10, 1062, 257, 528, 254], [10, 1593, 257, 528, 254], [10, 2124, 257, 528, 254], [10, 2655, 257, 528, 254], [10, 3186, 257, 528, 254]], 83, 0, 0)
      , Vk = M([[11, 0, 0, 491, 250], [11, 494, 0, 491, 250], [11, 988, 0, 491, 250], [11, 1482, 0, 491, 250], [11, 1976, 0, 491, 250], [11, 2470, 0, 491, 250], [11, 2964, 0, 491, 250], [11, 1482, 0, 491, 250], [11, 1976, 0, 491, 250], [11, 2470, 0, 491, 250], [11, 2964, 0, 491, 250], [11, 1482, 0, 491, 250], [11, 1976, 0, 491, 250], [11, 2470, 0, 491, 250], [11, 2964, 0, 491, 250], [11, 1482, 0, 491, 250], [11, 1976, 0, 491, 250], [11, 2470, 0, 491, 250], [11, 2964, 0, 491, 250], [11, 1482, 0, 491, 250], [11, 1976, 0, 491, 250], [11, 2470, 0, 491, 250], [11, 2964, 0, 491, 250], [11, 1482, 0, 491, 250], [11, 0, 253, 491, 250], [11, 494, 253, 491, 250], [11, 988, 253, 491, 250], [11, 1482, 253, 491, 250], [11, 1976, 253, 491, 250], [11, 2470, 253, 491, 250], [11, 988, 253, 491, 250], [11, 1482, 253, 491, 250], [11, 1976, 253, 491, 250], [11, 2470, 253, 491, 250], [11, 988, 253, 491, 250], [11, 1482, 253, 491, 250], [11, 1976, 253, 491, 250], [11, 2470, 253, 491, 250], [11, 988, 253, 491, 250], [11, 1482, 253, 491, 250], [11, 1976, 253, 491, 250]], 83, 0, 0)
      , Wk = M([[8, 0, 0, 528, 254], [8, 531, 0, 528, 254], [8, 1062, 0, 528, 254], [8, 0, 257, 528, 254], [8, 531, 257, 528, 254], Ye, Ye, Ye, Ye, Ye, Ye, Ye, Ye, Ye, Ye, Ye, Ye], 83, 0, 0)
      , Xk = M([[8, 523, 906, 520, 193], [8, 523, 514, 520, 193], [8, 1046, 906, 520, 193], [8, 0, 1102, 520, 193], [8, 523, 1102, 520, 193], [8, 1046, 1102, 520, 193], [8, 0, 1298, 520, 193], [8, 523, 1298, 520, 193], [8, 523, 1102, 520, 193], [8, 1046, 1102, 520, 193], [8, 0, 1298, 520, 193], [8, 523, 1298, 520, 193], [8, 523, 1102, 520, 193], [8, 1046, 1102, 520, 193], [8, 0, 1298, 520, 193], [8, 523, 1298, 520, 193], [8, 523, 1102, 520, 193], [8, 1046, 1102, 520, 193], [8, 0, 1298, 520, 193]], 83, 0, 0)
      , Yk = M(Ff, 83, 0, 0)
      , Zk = If([Ze, $e, af, bf], 83, 0, 0)
      , $k = If([[14, 0, 363, 491, 360], [14, 494, 363, 491, 360], [14, 988, 363, 491, 360], [14, 1482, 363, 491, 360], [14, 1976, 363, 491, 360], [14, 2470, 363, 491, 360], [14, 0, 363, 491, 360], [14, 494, 363, 491, 360], [14, 988, 363, 491, 360], [14, 1482, 363, 491, 360], [14, 1976, 363, 491, 360], [14, 2470, 363, 491, 360]], 83, 0, 0)
      , al = M([[16, 0, 0, 491, 360], [16, 0, 0, 491, 360], [16, 0, 0, 491, 360], [16, 0, 0, 491, 360], [16, 494, 0, 491, 360], [16, 988, 0, 491, 360], [16, 1482, 0, 491, 360], [16, 1976, 0, 491, 360], [16, 1976, 0, 491, 360], [16, 1976, 0, 491, 360], [16, 1976, 0, 491, 360], [16, 1976, 0, 491, 360], [16, 1976, 0, 491, 360], [16, 2470, 0, 491, 360], [16, 2964, 0, 491, 360], [16, 0, 363, 491, 360], [16, 494, 363, 491, 360], [16, 988, 363, 491, 360], [16, 1482, 363, 491, 360], [16, 1976, 363, 491, 360], [16, 2470, 363, 491, 360], [17, 0, 0, 491, 360], [17, 494, 0, 491, 360], [17, 988, 0, 491, 360], [17, 1482, 0, 491, 360], [17, 1976, 0, 491, 360], [17, 2470, 0, 491, 360], [17, 0, 363, 491, 360], [17, 494, 363, 491, 360], [17, 988, 363, 491, 360], [17, 1482, 363, 491, 360], [17, 1976, 363, 491, 360], [17, 2470, 363, 491, 360], [17, 0, 0, 491, 360], [17, 494, 0, 491, 360], [17, 988, 0, 491, 360], [17, 1482, 0, 491, 360], [17, 1976, 0, 491, 360], [17, 2470, 0, 491, 360], [17, 0, 363, 491, 360], [17, 494, 363, 491, 360]], 83, 0, 0)
      , bl = M([[14, 0, 0, 491, 360], [14, 494, 0, 491, 360], [14, 988, 0, 491, 360], [14, 1482, 0, 491, 360], [14, 1976, 0, 491, 360], [14, 2470, 0, 491, 360], [14, 2470, 0, 491, 360], [14, 2470, 0, 491, 360], [14, 2470, 0, 491, 360], [14, 2470, 0, 491, 360], [14, 2470, 0, 491, 360], [14, 2470, 0, 491, 360], [14, 2470, 0, 491, 360], [14, 2470, 0, 491, 360], [14, 2470, 0, 491, 360], [14, 2470, 0, 491, 360], [14, 2470, 0, 491, 360]], 83, 0, 0)
      , cl = M([[15, 0, 0, 491, 360], [15, 0, 0, 491, 360], [15, 0, 0, 491, 360], [15, 494, 0, 491, 360], [15, 988, 0, 491, 360], [15, 1482, 0, 491, 360], [15, 1976, 0, 491, 360], [15, 2470, 0, 491, 360], [15, 2470, 0, 491, 360], [15, 2470, 0, 491, 360], [15, 2470, 0, 491, 360], [15, 2470, 0, 491, 360], [15, 2470, 0, 491, 360], [15, 2964, 0, 491, 360], [15, 0, 363, 491, 360], [15, 494, 363, 491, 360], [15, 988, 363, 491, 360], [15, 1482, 363, 491, 360], [15, 1976, 363, 491, 360], [15, 2470, 363, 491, 360], [15, 2964, 363, 491, 360]], 83, 0, 0)
      , dl = M([[12, 0, 0, 491, 360], [12, 494, 0, 491, 360], [12, 988, 0, 491, 360], [12, 1482, 0, 491, 360], [12, 1976, 0, 491, 360], [12, 2470, 0, 491, 360], [12, 0, 363, 491, 360], [12, 494, 363, 491, 360], [12, 988, 363, 491, 360], [12, 1482, 363, 491, 360], [12, 1976, 363, 491, 360], [12, 2470, 363, 491, 360], [12, 0, 0, 491, 360], [12, 494, 0, 491, 360], [12, 988, 0, 491, 360], [12, 1482, 0, 491, 360], [12, 1976, 0, 491, 360], [12, 2470, 0, 491, 360], [12, 0, 363, 491, 360]], 83, 0, 0)
      , el = M([[13, 0, 0, 491, 360], [13, 494, 0, 491, 360], [13, 988, 0, 491, 360], [13, 1482, 0, 491, 360]], 83, 0, 0)
      , fl = If([[13, 1976, 0, 491, 360], [13, 2470, 0, 491, 360], [13, 2964, 0, 491, 360], [13, 3458, 0, 491, 360], [13, 3952, 0, 491, 360], [13, 1482, 0, 491, 360]], 83, 0, 0)
      , Mk = M([[7, 1406, 0, 700, 416]], 83, 0, 0)
      , Nk = M([[7, 703, 419, 700, 416]], 83, 0, 0)
      , Lk = new Map([[0, Ok], [1, Tk], [2, Yk], [3, Zk], [4, Xk], [6, Uk], [7, Vk], [5, Wk]])
      , Rk = new Map([[0, cl], [1, $k], [2, el], [3, fl], [4, dl], [6, $k], [7, al], [5, bl]]);
    var gl = Oh()
      , il = function() {
        N.call(this, hl);
        this.va = null;
        this.Mc = new u(320,180);
        this.tb = !1;
        this.Oc = this.Gc = 0;
        this.Pc = null;
        this.Qd = 0;
        this.reset();
        gl.addListener(this)
    };
    p(il, N);
    il.prototype.reset = function() {
        this.Aa = !1;
        this.Gc = 2100;
        this.Oc = 5500;
        this.U(0);
        K(this);
        Qd(this);
        J(this, new hi(this,.8,5));
        this.tb = !1;
        y(this, jl);
        this.$ = 1;
        this.setScale(.6);
        this.Pc && x(this.Pc);
        H(this, 1800);
        this.opacity = 1
    }
    ;
    var nl = function(a) {
        a.tb ? kl(a) : (ll(a),
        ml(a))
    }
      , ll = function(a) {
        var b = void 0 === b ? 1E3 : b;
        O(a, 3, 0);
        var c = dj(ej(z(a), a.Mc)).scale(320);
        G(a, new E(a,b,z(a),hd(z(a), c),function() {}
        ,Ld))
    }
      , ml = function(a) {
        var b = .5 > Math.random() ? -60 : 700
          , c = new u(b,Math.floor(360 * Math.random()));
        I(a, 0, function() {
            y(a, c);
            a.va.g.opacity = 1;
            a.va.o = !0;
            a.Ab = 0 > b
        });
        H(a, 500);
        O(a, 2, 0, void 0, void 0, function() {
            a.Qd = R.Fd.play()
        });
        G(a, new E(a,a.Gc,c,a.Mc,function() {}
        ,Md))
    }
      , rl = function(a) {
        ol(a);
        I(a, 0, function() {
            R.re.play()
        });
        a.tb ? (O(a, 12, 0),
        O(a, 1, Hf(pl), void 0, void 0, function() {
            K(a);
            a.tb = !1;
            ol(a);
            nl(a)
        })) : (O(a, 6, 0),
        O(a, 8, Hf(ql), void 0, void 0, function() {
            K(a);
            a.tb = !0;
            nl(a)
        }))
    }
      , kl = function(a) {
        ol(a);
        I(a, 0, function() {
            a.va.g.opacity = 1;
            a.va.o = !0
        });
        O(a, 9, 0);
        G(a, new E(a,a.Oc,sl(a),a.Mc))
    }
      , ol = function(a) {
        O(a, a.tb ? 8 : 3, 0);
        G(a, new E(a,1E3,z(a),sl(a),function() {}
        ,Nd))
    }
      , sl = function(a) {
        return 320 > z(a).x ? tl : jl
    };
    il.prototype.Hb = function(a) {
        this.va = a;
        this.va.points = this.tb ? 500 : 100;
        this.va.opacity = 0;
        this.va.g.opacity = 0;
        this.va.g.setScale(1 / .6);
        this.va.o = !1;
        this.Pc = this.va.g;
        w(this, this.Pc);
        this.va.$ = this.$ + 1;
        nl(this)
    }
    ;
    il.prototype.Oa = function() {
        var a = this;
        K(this);
        G(this, new E(this,800,z(this),sl(this),function() {
            a.U(14);
            R.qe.play()
        }
        ,Nd));
        H(this, 3200);
        G(this, new E(this,2E3,sl(this),new u(sl(this).x,sl(this).y - 500),function() {}
        ,Ld))
    }
    ;
    il.prototype.update = function(a) {
        var b, c;
        null === (b = this.va) || void 0 === b ? void 0 : y(b, z(this));
        (2 === this.state || 9 === this.state) && 60 > cj(ej(z(this), this.Mc)) && (R.oe.play(),
        this.U(this.tb ? 10 : 4),
        K(this),
        H(this, 400),
        nl(this),
        S(gl, 6));
        if (null === (c = this.va) || void 0 === c ? 0 : 5 === c.state)
            this.va.U(6),
            this.va = null,
            K(this),
            this.tb ? (this.U(11),
            this.Oc -= 1E3) : (R.Fd.stop(this.Qd),
            this.U(5),
            this.Gc -= 50),
            H(this, Hf(ul));
        N.prototype.update.call(this, a)
    }
    ;
    il.prototype.Sa = function(a) {
        var b = this;
        0 === a && (Qd(this),
        K(this),
        this.tb ? this.U(13) : (this.U(7),
        I(this, Hf(vl), function() {
            var c;
            b.opacity = 0;
            null === (c = b.va) || void 0 === c ? void 0 : c.g.opacity = 0
        })))
    }
    ;
    var tl = new u(120,200)
      , jl = new u(520,200)
      , wl = M([[45, 1285, 0, 234, 281], [45, 0, 284, 234, 281], [45, 237, 284, 234, 281], [45, 474, 284, 234, 281], [45, 711, 284, 234, 281], [45, 948, 284, 234, 281], [45, 1185, 284, 234, 281], [45, 0, 568, 234, 281], [45, 237, 568, 234, 281], [45, 474, 568, 234, 281], [45, 711, 568, 234, 281]], 83, 0, 0)
      , xl = If([ve], 83, 0, 0)
      , yl = M(Af, 83, 0, 0)
      , ul = M([[45, 0, 0, 254, 281], [45, 257, 0, 254, 281], [45, 514, 0, 254, 281], [45, 771, 0, 254, 281], [45, 1028, 0, 254, 281]], 83, 0, 0)
      , ql = M([[43, 0, 0, 360, 326], [43, 0, 0, 360, 326], [43, 363, 0, 360, 326], [43, 726, 0, 360, 326], [43, 1089, 0, 360, 326], [43, 1452, 0, 360, 326], [43, 1815, 0, 360, 326], [43, 2178, 0, 360, 326], [43, 2541, 0, 360, 326], [43, 2904, 0, 360, 326], [43, 3267, 0, 360, 326], [43, 0, 329, 360, 326], [43, 363, 329, 360, 326], [43, 726, 329, 360, 326], [43, 1089, 329, 360, 326], [43, 1452, 329, 360, 326], [43, 1815, 329, 360, 326], [43, 2178, 329, 360, 326], [43, 2178, 329, 360, 326], [43, 2178, 329, 360, 326], [43, 2541, 329, 360, 326], [43, 2904, 329, 360, 326], [43, 3267, 329, 360, 326]], 83, 0, 0)
      , vl = M([[47, 0, 0, 233, 278], [47, 236, 0, 233, 278], [47, 472, 0, 233, 278], [47, 708, 0, 233, 278], [47, 236, 0, 233, 278], [47, 944, 0, 233, 278], [47, 236, 0, 233, 278], [47, 1180, 0, 233, 278], [47, 1416, 0, 233, 278], [47, 1652, 0, 233, 278], [47, 1888, 0, 233, 278], [47, 0, 281, 233, 278], [47, 236, 281, 233, 278], [47, 472, 281, 233, 278], [47, 708, 281, 233, 278], [47, 944, 281, 233, 278], [47, 1180, 281, 233, 278], [47, 1416, 281, 233, 278], [47, 1652, 281, 233, 278]], 83, 0, 0)
      , zl = If([te], 83, 0, 0)
      , Al = M(yf, 83, 0, 0)
      , Bl = M([ue], 83, 0, 0)
      , pl = M([[42, 0, 0, 268, 222], [42, 271, 0, 268, 222], [42, 542, 0, 268, 222], [42, 813, 0, 268, 222], [42, 0, 225, 268, 222], [42, 271, 225, 268, 222], [42, 542, 225, 268, 222], [42, 813, 225, 268, 222], [42, 0, 450, 268, 222], [42, 271, 450, 268, 222], [42, 542, 450, 268, 222], [42, 813, 450, 268, 222], [42, 0, 675, 268, 222], [42, 271, 675, 268, 222], [42, 542, 675, 268, 222], [42, 813, 675, 268, 222]], 83, 0, 0)
      , Cl = M([[44, 0, 0, 194, 194], [44, 0, 0, 194, 194], [44, 197, 0, 194, 194], [44, 394, 0, 194, 194], [44, 591, 0, 194, 194], [44, 788, 0, 194, 194], [44, 788, 0, 194, 194], [44, 788, 0, 194, 194], [44, 788, 0, 194, 194], [44, 788, 0, 194, 194], [44, 985, 0, 194, 194], [44, 1182, 0, 194, 194], [44, 1379, 0, 194, 194], [44, 1576, 0, 194, 194], [44, 1773, 0, 194, 194], [44, 1970, 0, 194, 194], [44, 2167, 0, 194, 194], [44, 2364, 0, 194, 194], [44, 2364, 0, 194, 194], [44, 2364, 0, 194, 194], [44, 2364, 0, 194, 194]], 83, 0, 0)
      , Dl = M(zf, 83, 0, 0)
      , hl = new Map([[0, wl], [1, xl], [2, yl], [3, xl], [4, xl], [5, ul], [6, ql], [7, vl], [8, zl], [9, Al], [10, zl], [11, Bl], [12, pl], [13, Cl], [14, Dl]]);
    var Fl = function(a, b, c, d, e, f, g) {
        N.call(this, El);
        this.i = a;
        this.x = b;
        this.y = c;
        this.o = d;
        this.ka = e;
        this.H = f;
        this.s = g;
        this.g = 0;
        this.speed = 1;
        6 > this.i ? this.U(0) : this.U(1);
        this.$ = 300;
        this.opacity = .25
    };
    p(Fl, N);
    Fl.prototype.update = function(a) {
        -50 > this.y ? x(this) : (this.y -= this.ka * a * .05 * this.speed,
        this.rotate(this.o * a * .05 * this.speed),
        this.g += a * this.s * this.speed,
        y(this, this.x + Math.sin(this.g) * this.H, this.y))
    }
    ;
    var Gl = M([[35, 1210, 132, 12, 11]], 83, 0, 0)
      , Hl = M([[35, 1210, 110, 17, 19]], 83, 0, 0)
      , Il = M([[35, 1189, 110, 18, 25]], 83, 0, 0)
      , El = new Map([[0, Gl], [1, Hl], [2, Il]]);
    var Jl = function(a) {
        a = void 0 === a ? .01 : a;
        v.call(this);
        this.g = a
    };
    p(Jl, v);
    Jl.prototype.update = function() {
        if (this.Wa() && Math.random() < this.g) {
            var a = 3 + 9 * Math.random()
              , b = 160 * Math.random();
            .5 > Math.random() && (b += 480);
            w(this, new Fl(a,b,410,Math.random() / a * .3,1.2 - a / 35,Math.random() * a * 1.2,.05 * Math.random() / a))
        }
    }
    ;
    var Kl = function() {};
    Kl.prototype.s = function() {
        return !0
    }
    ;
    var Ll = function(a, b, c, d) {
        this.g = a;
        this.i = b;
        this.o = Math.abs(c);
        this.v = void 0 === d ? !1 : d;
        this.v || (this.g += this.o,
        this.i += this.o)
    };
    p(Ll, Kl);
    var Ml = function(a, b, c) {
        a.g = b;
        a.i = c;
        a.v || (a.g += a.o,
        a.i += a.o)
    };
    Ll.prototype.j = function(a, b) {
        return Math.sqrt((this.g - a) * (this.g - a) + (this.i - b) * (this.i - b)) <= this.o
    }
    ;
    Ll.prototype.Ba = function(a) {
        a.beginPath();
        a.arc(this.g, this.i, this.o, 0, 2 * Math.PI, !0);
        a.fill();
        a.stroke()
    }
    ;
    var Nl = function(a) {
        this.g = a
    };
    p(Nl, Kl);
    var Ol = function(a, b, c, d) {
        return new Nl([a, b, a + c, b, a + c, b + d, a, b + d])
    };
    Nl.prototype.j = function(a, b) {
        var c = this.g;
        if (6 > c.length)
            return !1;
        for (var d = !1, e = 0, f = c.length - 2; e < c.length; f = e,
        e += 2) {
            var g = c[e]
              , h = c[e + 1]
              , k = c[f];
            f = c[f + 1];
            a < g != a < k && b > h + (a - g) * (f - h) / (k - g) && (d = !d)
        }
        return d
    }
    ;
    Nl.prototype.Ba = function(a) {
        a.beginPath();
        for (var b = 0; b < this.g.length; b += 2)
            a.lineTo(this.g[b], this.g[b + 1]);
        a.lineTo(this.g[0], this.g[1]);
        a.fill();
        a.stroke()
    }
    ;
    var Pl = function(a, b, c) {
        b -= a.g[0];
        c -= a.g[1];
        if (0 != b || 0 != c)
            for (var d = 0; d < a.g.length - 1; d += 2)
                a.g[d] += b,
                a.g[d + 1] += c
    };
    var Ql = function(a, b, c, d, e, f, g, h, k) {
        k = void 0 === k ? function() {}
        : k;
        N.call(this, new Map([[0, M([e], 0, 0, 0)], [1, M([f || e], 0, 0, 0)]]));
        this.g = c;
        this.o = d;
        this.H = g;
        this.ka = h;
        this.s = k;
        this.i = document.getElementById("hplogo");
        y(this, a, b)
    };
    p(Ql, N);
    var Sl = function(a, b, c, d, e, f) {
        var g = Rl;
        f = void 0 === f ? 0 : f;
        var h = cb(g, function(k) {
            return gb(k.wa, b)
        }) || {
            x: 0,
            y: 0
        };
        g = $d(ee.ya(), b) / 2;
        f = h.x + g + f;
        h = h.y + g;
        return new Ql(f,h,new Ll(f,h,3 * g,!0),a,b,c,d,e)
    }
      , Tl = function(a, b, c, d, e, f) {
        var g = Rl;
        f = void 0 === f ? 0 : f;
        g = cb(g, function(l) {
            return gb(l.wa, b)
        }) || {
            x: 0,
            y: 0
        };
        var h = $d(ee.ya(), b)
          , k = ee.ya().Ga(b);
        return new Ql(g.x + f,g.y,Ol(0, 0, 3 * h, 3 * k),a,b,c,d,e)
    }
      , Wl = function(a) {
        var b = xd(a);
        a.g instanceof Ll ? Ml(a.g, b.i, b.g) : Pl(a.g, b.i - 3 * a.j.wa[3] / 2, b.g - 3 * a.Ga() / 2);
        a.U(0);
        a.s(!1);
        Ul(a.o, a.g, function(c) {
            "mouseup" == c ? a.H() : "mouseover" == c ? (a.U(1),
            a.s(!0),
            a.i.title = a.ka,
            a.i.style.cursor = "pointer") : "mouseout" == c && (a.U(0),
            a.s(!1),
            a.i.title = "",
            a.i.style.cursor = "default")
        });
        Vl(a.o.g, a.g)
    };
    var Xl = function() {
        v.call(this)
    };
    p(Xl, v);
    Xl.prototype.Ba = function(a) {
        a.clearRect(0, 0, 640, 360);
        v.prototype.Ba.call(this, a)
    }
    ;
    var Yl = function() {
        v.call(this);
        this.g = new F;
        this.$ = 460;
        w(this, this.g);
        this.opacity = 0
    };
    p(Yl, v);
    Yl.prototype.Ba = function(a) {
        a.save();
        a.globalCompositeOperation = "multiply";
        a.fillStyle = "#403f45";
        a.fillRect(0, 0, 640, 360);
        a.restore()
    }
    ;
    Yl.prototype.Va = function(a, b, c) {
        J(this.g, new Sd(this,c,a,b))
    }
    ;
    var Zl = ee.ya()
      , X = function(a, b, c, d) {
        d = void 0 === d ? !1 : d;
        return new di(a,1E3 * b,fi(c),d)
    }
      , $l = new L([7, 136, 552, 71, 70])
      , am = new L([7, 0, 552, 133, 63])
      , bm = new L([7, 2612, 100, 49, 20])
      , cm = new L([7, 2612, 151, 24, 19])
      , dm = new L([7, 2612, 123, 39, 25])
      , em = new L([7, 1406, 419, 640, 360])
      , fm = If([[40, 643, 0, 50, 70], [40, 643, 0, 50, 70], [40, 643, 0, 50, 70], [40, 643, 73, 50, 70], [40, 643, 146, 50, 70], [40, 643, 146, 50, 70], [40, 643, 146, 50, 70], [40, 643, 146, 50, 70], [40, 643, 146, 50, 70], [40, 643, 219, 50, 70], [40, 643, 292, 50, 70], [40, 643, 365, 50, 70], [40, 643, 365, 50, 70], [40, 643, 365, 50, 70], [40, 643, 365, 50, 70], [40, 643, 365, 50, 70], [40, 643, 438, 50, 70], [40, 643, 438, 50, 70], [40, 643, 511, 50, 70], [40, 643, 511, 50, 70], [40, 643, 584, 50, 70], [40, 643, 584, 50, 70], [40, 643, 657, 50, 70], [40, 643, 657, 50, 70], [40, 0, 726, 50, 70], [40, 0, 726, 50, 70]], 83, 23, 270, 460);
    fm[fm.length - 1].duration = 6E3;
    var gm = If([[0, 0, 0, 48, 90], [0, 51, 0, 48, 90], [0, 102, 0, 48, 90], [0, 153, 0, 48, 90], [0, 204, 0, 48, 90], [0, 255, 0, 48, 90], [0, 306, 0, 48, 90], [0, 0, 93, 48, 90], [0, 51, 93, 48, 90], [0, 102, 93, 48, 90], [0, 153, 93, 48, 90], [0, 204, 93, 48, 90], [0, 255, 93, 48, 90], [0, 306, 93, 48, 90], [0, 0, 186, 48, 90], [0, 51, 186, 48, 90], [0, 102, 186, 48, 90], [0, 153, 186, 48, 90]], 83, 38, 133, 1);
    gm[gm.length - 1].duration = 2E3;
    var hm = If([[0, 204, 186, 48, 90], [0, 255, 186, 48, 90], [0, 306, 186, 48, 90], [0, 0, 279, 48, 90], [0, 51, 279, 48, 90], [0, 102, 279, 48, 90], [0, 153, 279, 48, 90], [0, 204, 279, 48, 90], [0, 255, 279, 48, 90], [0, 306, 279, 48, 90], [0, 0, 372, 48, 90], [0, 51, 372, 48, 90], [0, 102, 372, 48, 90], [0, 153, 372, 48, 90], [0, 204, 372, 48, 90], [0, 255, 372, 48, 90], [0, 306, 372, 48, 90]], 83, 38, 123, 1);
    hm[hm.length - 1].duration = 3E3;
    var im = [Zd(Zl, 3), Zd(Zl, 36), Zd(Zl, 37), Zd(Zl, 38), Zd(Zl, 39), Zd(Zl, 31), Zd(Zl, 33), Zd(Zl, 32), Zd(Zl, 41), Zd(Zl, 2), Zd(Zl, 5), Zd(Zl, 4), R.rd.s, R.Ed.s, R.Hd.s]
      , Lm = [{
        title: "Level1",
        background: [33, 0, 0, 640, 360],
        backgroundPosition: ld,
        lc: [M([Se], 0, Se[3] / 2, Zl.Ga(Se) / 2, 300)],
        kc: new Jl,
        ac: [],
        Sb: [],
        Vb: [new Nf(15,80), new Nf(15,160), new Nf(15,240), new Nf(90,320), new Nf(165,320), new Nf(630,80), new Nf(630,160), new Nf(630,240), new Nf(480,320), new Nf(560,320)],
        nc: [R.sd],
        qc: [34, 1],
        Ha: kd,
        uc: function(a) {
            var b = function(c) {
                return jm(a, c)
            };
            b = [b([U(180, 295, 8, "|")]), km(800), b([U(0, 295, 8, "-")]), km(800), b([U(100, 140, 8, "^")]), Y(a), b([U(0, 295, 8, "-|")]), km(800), b([U(170, 140, 8, "^v")]), Y(a), b([U(20, 217.5, 4, "@")]), km(400), b([U(-10, 295, 8, "--"), U(200, 217.5, 8, "||"), U(160, 140, 8, "vv")]), Y(a), lm(a), km(2E3), b([U(-20, 295, 9, "|vv")]), b([U(60, 217.5, 9, "|vv")]), km(400), b([U(150, 295, 9, "-^^")]), b([U(210, 217.5, 9, "-^^")]), Y(a), b([U(40, 295, 9, "-")]), km(100), b([U(140, 295, 9, "-")]), km(100), b([U(20, 295, 9, "^")]), km(100), b([U(160, 295, 9, "^")]), km(100), b([U(0, 295, 9, "|")]), km(100), b([U(180, 295, 9, "|")]), km(100), b([U(-20, 295, 9, "v")]), km(100), b([U(200, 295, 9, "v")]), km(100), b([U(0, 140, 4, "@")]), Y(a), km(2E3), mm(a), nm(a)].flat();
            om(a, b);
            return b
        },
        state: 13,
        hb: null,
        scale: 1,
        nb: R.rd,
        yb: R.Vd,
        Pb: 800,
        Kb: !1
    }, {
        title: "Level2",
        background: [34, 1286, 363, 640, 360],
        backgroundPosition: ld,
        lc: [M([Ue], 0, Ue[3] / 2, Zl.Ga(Ue) / 2, 460), M([Te], 0, Te[3] / 2, Zl.Ga(Te) / 2, 1)],
        kc: null,
        ac: [If([[1, 0, 0, 68, 64], [1, 0, 0, 68, 64], [1, 0, 0, 68, 64], [1, 71, 0, 68, 64], [1, 71, 0, 68, 64], [1, 71, 0, 68, 64], [1, 142, 0, 68, 64], [1, 142, 0, 68, 64], [1, 142, 0, 68, 64], [1, 213, 0, 68, 64], [1, 213, 0, 68, 64], [1, 213, 0, 68, 64], [1, 284, 0, 68, 64], [1, 284, 0, 68, 64], [1, 284, 0, 68, 64], [1, 355, 0, 68, 64], [1, 355, 0, 68, 64], [1, 355, 0, 68, 64], [1, 426, 0, 68, 64], [1, 426, 0, 68, 64], [1, 426, 0, 68, 64], [1, 497, 0, 68, 64], [1, 497, 0, 68, 64], [1, 497, 0, 68, 64], [1, 568, 0, 68, 64], [1, 568, 0, 68, 64], [1, 568, 0, 68, 64], [1, 639, 0, 68, 64], [1, 639, 0, 68, 64], [1, 639, 0, 68, 64], [1, 710, 0, 68, 64], [1, 710, 0, 68, 64], [1, 710, 0, 68, 64]], 50, 320, 30, 0)],
        Sb: [],
        Vb: [],
        nc: [R.vd],
        qc: [40, 42, 43, 44, 45, 46, 47],
        scale: 1,
        Ha: new u(70,190),
        uc: function(a) {
            var b = new sk;
            b = [pm(a, b), qm(a, b), Y(a), rm(a, b), Y(a), sm(b), km(1E3), tm(b), lm(a), qm(a, b), Y(a), rm(a, b), Y(a), sm(b), km(1E3), tm(b), qm(a, b), Y(a), rm(a, b), Y(a), km(5E3)].flat();
            om(a, b);
            return b
        },
        yb: R.Wd,
        Pb: 2100,
        state: 14,
        hb: null,
        nb: R.sd,
        Kb: !1
    }, {
        title: "Level3",
        background: [40, 0, 0, 640, 360],
        backgroundPosition: ld,
        lc: [M([uf], 83, uf[3] / 2, 360 - Zl.Ga(uf) / 2, 360 - Zl.Ga(uf) / 2)],
        kc: new Jl,
        ac: [fm],
        Sb: [],
        Vb: [],
        nc: [R.xd],
        qc: [19, 20, 18, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 0],
        scale: 1,
        Ha: new u(310,170),
        uc: function(a) {
            var b = function(d) {
                return km(1E3 * d)
            }
              , c = function(d) {
                return jm(a, d)
            };
            b = [c([U(-20, 295, 6, "|^")]), c([U(180, 295, 6, "-^")]), c([U(30, 295, 6, "v^")]), Y(a), b(.8), c([U(20, 295, 5, "|-")]), c([U(200, 295, 5, "^-")]), c([U(140, 295, 5, "v-")]), Y(a), c([U(40, 295, 8, "-^^--^")]), c([U(140, 295, 8, "|^^||^")]), Y(a), lm(a), b(1), c([U(-20, 295, 3, "|")]), b(1), c([U(200, 295, 3, "^")]), b(1), c([U(0, 295, 3, "v")]), b(1), c([U(180, 295, 3, "-")]), Y(a), b(1), c([U(-20, 295, 3, "^")]), b(.8), c([U(200, 295, 3, "-")]), b(.7), c([U(0, 295, 3, "^")]), b(.6), c([U(180, 295, 3, "|")]), b(.5), c([U(-20, 295, 3, "v")]), b(.4), c([U(200, 295, 3, "-")]), b(.3), c([U(0, 295, 3, "|")]), b(.3), c([U(180, 295, 3, "v")]), b(.3), c([U(200, 295, 3, "|")]), b(.3), c([U(220, 295, 3, "-")]), b(.3), c([U(-40, 295, 3, "|")]), b(.3), c([U(-20, 295, 3, "v")]), b(.3), c([U(0, 295, 3, "-")]), b(.3), c([U(20, 295, 3, "^")]), b(.3), c([U(40, 295, 3, "^")]), b(.3), c([U(140, 295, 3, "-")]), b(.3), c([U(180, 295, 3, "v")]), Y(a), b(2), um(), vm(a, "|"), Y(a), vm(a, "^"), Y(a), vm(a, "v"), Y(a), wm(), vm(a, "||||||||||"), Y(a), wm(), vm(a, "^"), Y(a), vm(a, "-"), Y(a), wm(), vm(a, "----------"), Y(a), xm(), b(6)];
            om(a, b);
            return b
        },
        state: 15,
        hb: new il,
        nb: R.vd,
        yb: R.Xd,
        Pb: 6200,
        Ld: 200,
        Kb: !1
    }, {
        title: "Level4",
        background: [19, 643, 0, 640, 360],
        backgroundPosition: ld,
        lc: [M([Ve], 0, Ve[3] / 2, Zl.Ga(Ve) / 2, 300)],
        kc: null,
        ac: [gm, hm],
        Sb: [],
        Vb: [],
        Ha: new u(310,150),
        nc: [R.yd],
        qc: [7, 6, 8, 9, 10, 11, 14, 12, 13, 15, 16, 17],
        scale: .8,
        uc: function(a) {
            var b = new u(320,48)
              , c = new u(320,-80)
              , d = function(l) {
                return km(1E3 * l)
            }
              , e = function(l) {
                return jm(a, l)
            }
              , f = function(l, q) {
                return ym(a, new yj([],l.x,l.y), q)
            }
              , g = function(l, q) {
                return zm(a, !0, l, void 0 === q ? !1 : q)
            }
              , h = function(l) {
                return zm(a, !1, l, !1)
            }
              , k = new Yl;
            b = [Am(a, k), Bm(a), f(b), d(.5), e([U(10, 295, 10, "^-^")]), d(.9), e([U(90, 140, 10, "v-^")]), d(.5), h(!0), Cm(k), d(1), e([U(30, 295, 10, "|vv")]), d(.2), e([U(135, 217.5, 10, "-|v")]), d(1), g(!0), Dm(k), d(.2), e([U(160, 295, 10, "--v")]), d(.8), e([U(170, 295, 10, "^-v")]), d(1.2), h(!0), Cm(k), d(3), g(!0), Dm(k), e([U(0, 217.5, 6, "^|-v-")]), Y(a), d(.2), e([U(0, 295, 10, "^v-|")]), d(.2), e([U(-30, 295, 15, "v-")]), d(.2), e([U(30, 295, 10, "^v-")]), d(.2), e([U(60, 217.5, 15, "v")]), d(.2), e([U(90, 140, 10, "v-|")]), d(.2), e([U(120, 140, 15, "^")]), d(.2), h(!0), Cm(k), d(1), e([U(150, 217.5, 10, "-|")]), d(.2), e([U(180, 295, 15, "^v")]), d(.2), e([U(200, 295, 10, "-")]), d(.2), e([U(210, 295, 15, "v-|")]), d(.2), d(1), g(!0), Dm(k), d(2), h(!0), Cm(k), d(2), Y(a), g(!0), Dm(k), e([U(0, 295, 3, "-")]), d(.2), e([U(170, 295, 3, "^")]), d(.2), e([U(10, 295, 3, "|")]), d(.2), e([U(190, 295, 3, "v")]), d(.2), e([U(-15, 295, 3, "-")]), d(.2), e([U(160, 295, 3, "^")]), d(.2), e([U(5, 295, 3, "|")]), d(.2), h(!0), Cm(k), e([U(10, 295, 20, "z")]), e([U(180, 295, 3, "v")]), d(.2), e([U(0, 295, 3, "-")]), d(.2), e([U(0, 295, 3, "|")]), d(.2), e([U(170, 295, 3, "^")]), d(.2), e([U(10, 295, 3, "v")]), d(.2), e([U(190, 295, 3, "-")]), d(.2), e([U(-15, 295, 3, "^")]), d(.2), g(!0), Dm(k), e([U(160, 295, 3, "|")]), d(.2), e([U(5, 295, 3, "v")]), d(.2), e([U(-20, 295, 3, "|")]), e([U(180, 295, 3, "v")]), d(.2), e([U(0, 295, 3, "-")]), d(.2), h(!0), Cm(k), d(3), Y(a), Em(), g(!0, !0), Dm(k), d(2), Fm(a, fi("|v|v|v")), Y(a), Gm(a, "|^|^|^|^"), Y(a), d(2), f(c, b), g(!1, !0), Fm(a, fi("|v^v|")), Y(a), Gm(a, "-||v^v^||-"), Y(a), d(2), f(c, b), g(!1, !0), Fm(a, fi("^|v-|")), Y(a), Gm(a, "v|^-v-|^v"), Y(a), d(4)].flat();
            om(a, b);
            return b
        },
        state: 16,
        hb: new Zj,
        nb: R.xd,
        Kb: !1
    }, {
        title: "Level5",
        background: [7, 703, 0, 700, 416],
        backgroundPosition: ld,
        scale: .44,
        nc: [R.Uc],
        qc: [],
        kc: null,
        ac: [],
        Sb: [{
            Cb: $l,
            position: new u(100,330),
            z: 0
        }, {
            Cb: am,
            position: new u(540,240),
            z: 0
        }, {
            Cb: bm,
            position: new u(540,340),
            z: 0
        }, {
            Cb: cm,
            position: new u(70,200),
            z: 0
        }, {
            Cb: dm,
            position: new u(30,260),
            z: 0
        }, {
            Cb: em,
            position: new u(320,180),
            z: 460
        }],
        lc: [],
        Vb: [],
        Ha: nd,
        Kb: !0,
        yb: R.$d,
        Pb: 1600,
        nb: R.yd,
        uc: function(a) {
            var b = function(Wb) {
                return km(1E3 * Wb)
            }
              , c = function(Wb) {
                return jm(a, Wb, !0)
            }
              , d = function(Wb) {
                return jm(a, Wb, !1, !0)
            }
              , e = new Pk
              , f = new u(z(e).x,230)
              , g = new v
              , h = new L(df)
              , k = new L(ef)
              , l = new L(ff);
            y(g, h.j.wa[3] / 2, h.Ga() / 2);
            k = [l, k, h];
            for (l = 0; l < k.length; l++) {
                var q = k[l];
                w(g, q);
                y(q, 0, -l * h.Ga());
                q.$ = -1
            }
            var t = new L(Ke);
            y(t, 320, -1 * t.Ga());
            h = new u(220,220);
            k = new u(400,230);
            l = new u(140,280);
            q = new u(220,310);
            var B = new u(320,320)
              , A = new u(400,310)
              , T = new u(470,300)
              , W = new u(270,275)
              , ea = new u(270,275)
              , da = new u(300,275)
              , Na = new u(340,275)
              , ua = new u(370,275)
              , Sa = new u(370,275)
              , cq = new C(function() {
                Z.nb.stop();
                R.zd.play();
                R.Sc.play(R.zd.H - 800, !0)
            }
            )
              , dq = new C(function() {
                R.Sc.stop()
            }
            );
            b = [Hm(a, g, t), Im(a, e), b(3), c([X(h, 9, "^^")]), b(.9), c([X(k, 9, "||")]), b(.9), c([X(l, 9, "--")]), b(.9), c([X(q, 9, "vv")]), b(.9), c([X(B, 9, "^-")]), b(.9), c([X(A, 9, "|-")]), b(.9), c([X(T, 9, "-v")]), b(.9), c([X(k, 9, "v|")]), Y(a), Jm(a, e, "|-|^-^|-|z"), Y(a), b(1), c([X(l, 3, "^")]), b(.5), c([X(k, 4, "|")]), b(.5), c([X(q, 5, "-")]), b(.5), c([X(T, 3, "v")]), b(.5), c([X(h, 4, "^")]), b(.5), c([X(A, 5, "|")]), b(.5), c([X(l, 3, "-")]), b(.5), c([X(k, 4, "v")]), b(.5), c([X(h, 5, "|")]), b(.5), c([X(B, 3, "^")]), b(.5), c([X(T, 4, "-")]), b(.5), c([X(l, 5, "v")]), b(.5), c([X(k, 3, "|")]), Y(a), Jm(a, e, "vv|^-^|vvz"), Y(a), b(1), c([X(h, 10, "^-^-")]), c([X(k, 10, "v-v-")]), c([X(l, 10, "|-|-")]), c([X(q, 10, "v|v|")]), c([X(B, 10, "^|^|")]), c([X(A, 10, "-|-|")]), c([X(T, 10, "vv^^")]), Y(a), Jm(a, e, "^-|v^-|v-^z"), Y(a), cq, function() {
                return Km(a, g, Lm[4].Sb.map(function(Wb) {
                    return Wb.Cb
                }), t, e)
            }(), Mm(a, e, f), d([X(W, 10, "^|--"), X(Sa, 10, "--|^", !0)]), b(3), d([X(ea, 10, "||v-"), X(ua, 10, "-v||", !0)]), b(3), d([X(da, 10, "^--|"), X(Na, 10, "|--^", !0)]), b(1.5), d([X(W, 10, "|-"), X(Sa, 10, "-|", !0)]), b(1.5), d([X(ea, 10, "^-^"), X(ua, 10, "v-v", !0)]), b(1.5), d([X(da, 10, "||v"), X(Na, 10, "^||", !0)]), b(1.5), d([X(da, 20, "z", !0)]), b(1.5), d([X(da, 10, "^--|"), X(Na, 10, "|--v", !0)]), b(1.5), d([X(ea, 10, "|-v-|"), X(ua, 10, "^--|", !0)]), b(1.5), d([X(W, 10, "^|--"), X(Na, 10, "--|^", !0)]), Y(a), Jm(a, e, "-|-v^-|-v^-|-z"), Y(a), b(1), dq].flat();
            om(a, b);
            return b
        },
        state: 17,
        hb: null
    }];
    function Nm() {
        return [].concat(ja(Z.nc.map(function(a) {
            return a.s
        })), ja(Z.qc.map(function(a) {
            return Zd(Zl, a)
        })))
    }
    var Z = Lm[0];
    var Om = function(a) {
        v.call(this);
        this.g = a
    };
    p(Om, v);
    Om.prototype.update = function() {
        var a = this.g.Ka()
          , b = Z.Vb;
        a = n(a);
        for (var c = a.next(); !c.done; c = a.next())
            if (c = c.value,
            c.Da)
                for (var d = n(b), e = d.next(); !e.done; e = d.next()) {
                    e = e.value;
                    var f = z(c)
                      , g = z(e)
                      , h = f.x - g.x;
                    f = f.y - g.y;
                    h * h + f * f < Math.pow(60, 2) && (Qf(e),
                    pj(c))
                }
    }
    ;
    var Pm = {}
      , Qm = function() {
        throw Error("z");
    };
    Qm.prototype.Kd = null;
    Qm.prototype.toString = function() {
        return this.g
    }
    ;
    var Rm = function() {
        Qm.call(this)
    };
    Ta(Rm, Qm);
    Rm.prototype.Re = Pm;
    var Sm = function(a) {
        function b(c) {
            this.g = c
        }
        b.prototype = a.prototype;
        return function(c, d) {
            c = new b(String(c));
            void 0 !== d && (c.Kd = d);
            return c
        }
    }(Rm);
    var Tm = function() {
        var a = Sm("<style>\n#fpdoodle body,#sadoodle body{background:#000;-webkit-transition:background 200ms;-o-transition:background 200ms;transition:background 200ms}#fpdoodle #ntp{background:transparent}.ddlh20-fullscreenClickTarget_{position:absolute;height:100%;width:100%;top:0;left:0;z-index:1;pointer-events:all;cursor:pointer}.ddlh20-audioOnButton_{position:absolute;bottom:6px;left:15px;z-index:0}.ddlh20-audioOffButton_{position:absolute;bottom:10px;left:15px;z-index:0}.ddlh20-unmute_{font-family:Itim,sans-serif;position:absolute;bottom:8px;left:70px;z-index:0;padding:5px;color:white;background-color:rgba(0,0,0,0.6);-webkit-border-radius:10px;-moz-border-radius:10px;border-radius:10px}.ddlh20-unmuteFade_{opacity:0;-webkit-transition:opacity 300ms ease-in-out;-o-transition:opacity 300ms ease-in-out;transition:opacity 300ms ease-in-out}.ddlh20-video_{width:100%;height:100%;opacity:0;-webkit-transition:opacity 200ms;-o-transition:opacity 200ms;transition:opacity 200ms}.ddlh20-video_.ddlh20-videoFadeIn_{opacity:1}.ddlh20-thumbnail_{width:100%;height:100%;position:absolute;top:0;left:0}.ddlh20-wipeOut_{position:absolute;top:0;left:0;width:100%;height:100%;opacity:0;background-color:white}.ddlh20-wipeOut_.ddlh20-transition_{opacity:1;-webkit-transition:opacity 500ms ease-in-out;-o-transition:opacity 500ms ease-in-out;transition:opacity 500ms ease-in-out}.ddlh20-skip_{position:absolute;bottom:-2px;right:5px;z-index:2;pointer-events:all;cursor:pointer}.ddlh20-pauseContainer_{width:100%;height:100%;position:absolute;bottom:0;right:0}.ddlh20-pauseBg_{width:100%;height:100%;position:absolute;top:0;left:0;background:black;opacity:0.5}.ddlh20-pauseButton_{position:absolute;width:100px;height:100px;bottom:15px;right:15px;background-color:black;z-index:2;pointer-events:all}.ddlh20-pauseButton_:hover{cursor:pointer;filter:drop-shadow(-3px 3px 2px #2f3538)}.ddlh20-unpauseButton_{text-align:center;position:absolute;font-family:Itim,sans-serif;width:100%;font-size:48px;font-weight:normal;color:white;top:154px;z-index:2}.ddlh20-pauseText_{font-family:Itim,sans-serif;text-align:center;position:absolute;width:100%;font-size:24px;font-weight:400;color:#fbaa1a;line-height:28px;top:133px;z-index:2}.ddlh20-hide_{visibility:hidden}.ddlh20-domRoot_{left:50%;top:50%;pointer-events:all;position:absolute;-webkit-transform-origin:0 0;-ms-transform-origin:0 0;-o-transform-origin:0 0;transform-origin:0 0}#fpdoodle #hplogo.ddlh20-fpdoodleready_{opacity:1}.ddlh20-closeButton_{z-index:101}\n</style>");
        var b = (Ya || (Ya = new $g)).g;
        var c = "DIV";
        "application/xhtml+xml" === b.contentType && (c = c.toLowerCase());
        b = b.createElement(c);
        if (La(a))
            if (a instanceof Qm) {
                if (a.Re !== Pm)
                    throw Error("A");
                a = Nb(a.toString(), a.Kd || null)
            } else
                a = Ob("zSoyz");
        else
            a = Ob(String(a));
        if (Qb())
            for (; b.lastChild; )
                b.removeChild(b.lastChild);
        b.innerHTML = Mb(a);
        1 == b.childNodes.length && (a = b.firstChild,
        1 == a.nodeType && (b = a));
        return b
    };
    var Vm = function() {
        v.call(this);
        this.g = !1;
        this.i = .075;
        for (var a = 0; 30 > a; a++)
            Um(this);
        a = n(this.Ka());
        for (var b = a.next(); !b.done; b = a.next())
            b.value.y = 360 * Math.random()
    };
    p(Vm, v);
    Vm.prototype.update = function() {
        Math.random() < this.i && Um(this);
        if (this.g)
            for (var a = n(this.Ka()), b = a.next(); !b.done; b = a.next())
                b.value.speed = 3
    }
    ;
    var Um = function(a) {
        var b = 3 + 9 * Math.random();
        for (var c = 0, d = 0; 2 > d; d++)
            c += Math.random();
        c = Math.floor(c / 2 * 640) - 320;
        .5 > Math.random() && (c = 320 + (320 - c));
        b = new Fl(b,c,360,Math.random() / b * .3,1.4 - b / 35,Math.random() * b * 1.2,.05 * Math.random() / b);
        b.setScale(.1 * (b.i - 5) + 1.2);
        w(a, b)
    }
      , Wm = function(a) {
        a.g = !0;
        a.i = .8
    }
      , Xm = function(a) {
        a.g = !1;
        a.i = .075;
        a = n(a.Ka());
        for (var b = a.next(); !b.done; b = a.next())
            b.value.speed = 1
    };
    var Ym = function() {
        return Kc() ? "1" != yc.g.get("scta") : !Ic()
    }
      , Zm = function() {
        if (Kc())
            throw "";
        return Fc || Ic()
    }
      , $m = function() {
        if (Kc())
            throw "";
        return Jc() || Gc || Ec && !zc
    }
      , an = function() {
        return Kc() ? "1" == yc.g.get("ccta") : Jc() && !Ic() || Gc && Ec && !Fc
    };
    var bn = [5, 6, 7, 8, 9, 11, 12, 16]
      , cn = 0
      , dn = 0
      , en = !1
      , fn = {}
      , gn = []
      , hn = function(a, b) {
        fn[a] = b;
        !gn.includes(a) && gn.push(a)
    }
      , jn = function(a) {
        var b = Date.now();
        fn.dt = b - dn;
        dn = b;
        0 == a && (cn = b);
        fn.e = a;
        fn.t = 0 == cn ? -1 : Math.floor(b - cn);
        fn.m = Ec ? 1 : 0;
        b = Zg();
        fn.w = b.width > b.height ? 1 : 0;
        b = [];
        for (var c in fn)
            fn.hasOwnProperty(c) && b.push(c + ":" + fn[c]);
        c = b.join(",");
        b = 10 == a;
        var d = 0 <= bn.indexOf(a);
        Ic() && (c += "&ntp=1");
        b ? (cd || ((b = document.getElementById("hplogoved")) ? cd = b.getAttribute("data-ved") : Kc() && wc(yc.g, "ved") && (cd = yc.g.get("ved"))),
        (b = cd) && (c += "&ved=" + b)) : d && (dd || ((b = document.getElementById("hplogoshareved")) ? dd = b.getAttribute("data-ved") : Kc() && wc(yc.g, "sved") && (dd = yc.g.get("sved"))),
        (b = dd) && (c += "&ved=" + b));
        -1 == c.search("&ei=") && (c += "&ei=",
        ed || (window.google && window.google.kEI && window.google.kEI.length ? ed = window.google.kEI : Kc() && wc(yc.g, "ei") && (ed = yc.g.get("ei"))),
        (b = ed) && (c += b));
        for (window.google && window.google.log ? window.google.log("doodle", c) : Xa(c); 0 < gn.length; )
            delete fn[gn.pop()];
        en || 0 != a || an() || (en = !0,
        jn(10))
    };
    var kn = function() {
        this.g = new Set;
        dn = Date.now();
        fn.d = "144867964";
        !en && an() && (en = !0,
        jn(10))
    }, ln, on = function() {
        var a = mn;
        jn(101);
        nn(a, 0)
    }, qn = function(a) {
        var b = pn;
        hn("d1", a);
        jn(104);
        nn(b, 8)
    }, nn = function(a, b) {
        a.g.has(b) || (fn.c = b,
        jn(1),
        a.g.add(b))
    }, rn = function() {
        ln || (ln = new kn);
        return ln
    };
    var sn = function() {
        v.call(this);
        y(this, 330, 170);
        this.i = new L(If(Bf, 83, 0, 0, 2));
        this.i.setScale(2);
        this.g = new L(If(Cf, 83, 0, 0, 2));
        this.g.opacity = 0;
        this.g.setScale(2);
        w(this, this.i);
        w(this, this.g)
    };
    p(sn, v);
    var tn = function(a) {
        a.i.opacity = 0;
        a.g.opacity = 1
    }
      , un = function(a) {
        a.i.opacity = 1;
        a.g.opacity = 0
    };
    var vn = function(a, b, c, d, e) {
        d = void 0 === d ? !1 : d;
        e = void 0 === e ? !1 : e;
        F.call(this);
        this.g = a;
        this.width = b;
        this.height = c;
        this.j = d;
        this.i = e;
        this.width += 10
    };
    p(vn, F);
    vn.prototype.Ba = function(a) {
        a.fillStyle = this.g;
        a.beginPath();
        a.moveTo(0, 0);
        this.j ? wn(this, a, 0, 0) : a.lineTo(this.width, 0);
        a.lineTo(this.width, this.height);
        this.i ? wn(this, a, this.width, this.height, !0) : a.lineTo(0, this.height);
        a.closePath();
        a.fill()
    }
    ;
    var wn = function(a, b, c, d, e) {
        e = void 0 === e ? !1 : e;
        for (var f = 0; f < a.width; f++)
            b.lineTo(c + f * (e ? -1 : 1), d + 15 * (180 < d ? 1 : -1) + 15 * Math.sin(.05 * f))
    };
    var xn = function() {
        this.g = new v;
        this.g.setScale(3)
    }, yn;
    xn.prototype.reset = function() {
        this.g = new v;
        this.g.setScale(3)
    }
    ;
    var zn = function() {
        yn || (yn = new xn);
        return yn
    }
      , Cn = function(a, b) {
        var c = An
          , d = [];
        yd(c.g, function(g) {
            return g.Wa() ? (d.push(g),
            !1) : !0
        });
        for (var e = 0; e < d.length; e++)
            d[e].update(a);
        d = [];
        var f = 0;
        yd(c.g, function(g) {
            return g.Wa() ? (d.push(g),
            g.La.i = ++f,
            g.La.g = g.$ + (g.getParent() ? g.getParent().La.g : 0),
            !1) : !0
        });
        d.sort(function(g, h) {
            return g.La.g != h.La.g ? g.La.g - h.La.g : g.La.i - h.La.i
        });
        b.save();
        for (a = 0; a < d.length; a++)
            Bn(b, xd(d[a])),
            b.globalAlpha = d[a].opacity,
            d[a].Ba(b);
        b.restore()
    }
      , Bn = function(a, b) {
        a.setTransform(b.j, b.v, b.s, b.o, b.i, b.g)
    };
    var Dn = function() {
        this.Fa = !1
    };
    Dn.prototype.update = function() {
        return this.Fa ? (this.Fa = !1,
        1) : 0
    }
    ;
    Dn.prototype.ta = function() {}
    ;
    Dn.prototype.Da = function() {}
    ;
    var mn = rn()
      , En = zn()
      , Fn = function(a, b, c) {
        this.Fa = !1;
        this.o = a;
        this.s = c;
        this.v = b;
        this.j = Ol(75, 75, 1770, 930);
        this.i = new sn;
        this.bubbles = new Vm;
        this.Va = new vn("black",640,360);
        this.Va.$ = 460;
        this.Va.opacity = 0;
        this.g = new F;
        w(this.g, new Xl);
        w(this.g, this.i);
        Ym() && w(this.g, this.bubbles);
        w(this.g, this.Va)
    };
    p(Fn, Dn);
    Fn.prototype.Xa = function() {
        var a = this;
        this.Va.opacity = 0;
        Ul(this.v, this.j, function(b) {
            switch (b) {
            case "mouseup":
                on();
                a.s();
                G(a.g, new Sd(a.Va,150,0,1));
                I(a.g, 300, function() {
                    a.Fa = !0
                });
                break;
            case "mouseover":
                a.o.style.cursor = "pointer";
                tn(a.i);
                Wm(a.bubbles);
                break;
            case "mouseout":
                a.o.style.cursor = "",
                un(a.i),
                Xm(a.bubbles)
            }
        });
        w(En.g, this.g)
    }
    ;
    Fn.prototype.Ya = function() {
        x(this.g);
        Gn(this.v.g, this.j);
        var a = document.getElementById("hplogo");
        null != a && (a.removeAttribute("title"),
        a.querySelector("canvas").style.background = "transparent")
    }
    ;
    ee.ya();
    var In = function(a, b) {
        N.call(this, Hn);
        y(this, a, b)
    };
    p(In, N);
    In.prototype.update = function(a) {
        N.prototype.update.call(this, a);
        a = 1;
        1 == this.state && (a += .1 * Math.max(0, Math.sin(this.ta / 100)));
        this.setScale(a)
    }
    ;
    In.prototype.U = function(a) {
        this.state == a || 3 == this.state && 2 == a || 4 == this.state && 1 == a || (Jn.get(a) && Kn.get(this.state) ? (K(this),
        O(this, 2, Ln),
        a = 3) : Kn.get(a) && Jn.get(this.state) && (K(this),
        O(this, 0, Mn),
        a = 4),
        N.prototype.U.call(this, a))
    }
    ;
    var Nn = Qe[3]
      , On = 1E3 / 12
      , Ln = Df.length * On
      , Mn = Ef.length * On
      , Jn = new Map([[2, !0], [3, !0]])
      , Kn = new Map([[0, !0], [1, !0], [4, !0]])
      , Hn = new Map([[0, [{
        wa: Qe,
        duration: 0,
        x: 0,
        y: 0,
        z: 0,
        children: []
    }]], [1, [{
        wa: Qe,
        duration: 0,
        x: 0,
        y: 0,
        z: 0,
        children: []
    }]], [2, [{
        wa: Re,
        duration: 0,
        x: 0,
        y: 0,
        z: 0,
        children: []
    }]], [3, M(Df, On, 0, 0)], [4, M(Ef, On, -3, 0)]]);
    function Pn(a, b, c, d, e, f, g) {
        var h = void 0 === h ? "" : h;
        var k = a.font;
        a.font = h + " " + d + "px " + c;
        for (var l = Qn(a, b, f); l.length > g && d > e; )
            d = Math.max(e, 1 < d ? d - 1 : d - .1),
            a.font = h + " " + d + "px " + c,
            l = Qn(a, b, f);
        for (b = 0; b < l.length; b++)
            for (; a.measureText(l[b]).width > f && d > e; )
                d = Math.max(e, 1 < d ? d - 1 : d - .1),
                a.font = h + " " + d + "px " + c;
        a.font = k;
        return {
            lines: l,
            fontFamily: c,
            fontSize: d,
            fontStyle: h
        }
    }
    function Qn(a, b, c) {
        b = b.match(/[^\s-]+-?/g);
        if (!b || 1 > b.length)
            return [""];
        for (var d = b[0], e = [], f = 1; f < b.length; f++) {
            var g = d + ("-" == d[d.length - 1] ? "" : " ") + b[f];
            a.measureText(g).width > c ? (e.push(d),
            d = b[f]) : d = g
        }
        e.push(d);
        return e
    }
    ;var Rn = function(a, b, c, d, e, f, g, h, k) {
        f = void 0 === f ? "#000" : f;
        g = void 0 === g ? "left" : g;
        v.call(this);
        this.text = a;
        this.fontFamily = d;
        this.fontSize = e;
        this.i = f;
        this.s = g;
        this.v = h;
        this.o = k;
        y(this, b, c);
        this.j = this.fontSize + "px " + this.fontFamily
    };
    p(Rn, v);
    Rn.prototype.Ba = function(a) {
        v.prototype.Ba.call(this, a);
        a.save();
        void 0 !== this.o && (this.fontSize = Pn(a, this.text, this.fontFamily, this.fontSize, this.fontSize / 4, this.o, 1).fontSize,
        this.j = this.fontSize + "px " + this.fontFamily);
        a.font = this.j;
        this.i && (a.fillStyle = this.i);
        md && this.v && (a.shadowColor = this.v,
        a.shadowBlur = 5);
        a.textAlign = this.s;
        a.fillText(this.text, 0, 0);
        a.restore()
    }
    ;
    var Sn = Oh()
      , Un = function(a) {
        F.call(this);
        this.i = [];
        this.g = 0;
        this.o = a;
        for (a = 0; 5 > a; a++) {
            var b = new In(Nn * (a + 1),25);
            this.i.push(b);
            w(this, b)
        }
        Tn(this);
        this.j = new Rn(this.g.toString(),640 - (Ec ? 74 : 25),37,"'Itim', sans-serif",40,"orange","right","black");
        w(this, this.j);
        Sn.addListener(this)
    };
    p(Un, F);
    Un.prototype.Sa = function(a, b) {
        var c = this;
        10 == a && 5 < b ? this.i[this.i.length - 1].U(2) : 2 == a && (K(this),
        this.g < b ? G(this, new ni(300,this.g,b,function(d) {
            c.g = Math.ceil(d);
            c.j.text = c.g.toString()
        }
        )) : (this.g = b,
        this.j.text = this.g.toString()))
    }
    ;
    Un.prototype.update = function(a) {
        F.prototype.update.call(this, a);
        Tn(this)
    }
    ;
    var Tn = function(a) {
        for (var b = 0; b < a.i.length; b++) {
            var c = 0;
            b > a.o.i - 1 ? c = 2 : b == a.o.i - 1 && (c = 1);
            a.i[b].U(c)
        }
    };
    var Vn = function(a) {
        F.call(this);
        var b = this
          , c = a.position;
        a = new Rn("+" + a.points.toString(),0,0,"'Itim', sans-serif",24,a.color,"center");
        w(this, a);
        y(this, c.x, c.y - 30);
        this.opacity = 0;
        this.$ = 470;
        J(this, new E(this,400,null,new u(c.x,c.y - 60),function() {}
        ,Id));
        J(this, new Sd(a,400,1,0,function() {
            x(b)
        }
        ));
        J(this, new hi(this,1.1 * (320 > c.x ? -1 : 1),0,2))
    };
    p(Vn, F);
    var Wn = Oh()
      , Xn = function() {
        F.call(this);
        this.S = this.s = this.o = 0;
        this.i = new F;
        w(this, this.i);
        this.g = new Rn("0",315,340,"'Itim', sans-serif",32,"orange","center","black");
        this.g.$ = 470;
        J(this, new hi(this.g,.7,3));
        this.g.Aa = !1;
        this.j = new L(he);
        this.j.$ = -1;
        this.j.setScale(.5);
        this.j.opacity = .6;
        y(this.j, 5, -10);
        w(this.g, this.j);
        w(this, this.g);
        this.H = R.Tc;
        Oh().addListener(this)
    };
    p(Xn, F);
    Xn.prototype.Sa = function(a, b) {
        !this.Wa() || 5 != a && 11 != a ? this.Wa() && 0 < this.s && (8 == a || 17 == a) ? (K(this.i),
        Od(this.i, new Sd(this.j,200,.6,0)),
        G(this.i, new Sd(this.g,200,1,0)),
        $n(this)) : 13 == a && (this.S = this.o) : (Yn(this),
        this.H = Zn[(this.s - 1) % Zn.length],
        b.points *= this.s,
        this.o += b.points,
        S(Wn, 2, this.o),
        w(this, new Vn(b)))
    }
    ;
    var Yn = function(a) {
        K(a.i);
        Qd(a.i);
        a.s++;
        2 <= a.s ? (2 == a.s ? (J(a, new Sd(a.g,200,0,1)),
        J(a, new Sd(a.j,200,0,.6))) : (a.g.opacity = 1,
        a.j.opacity = .6),
        a.g.Aa = !0,
        a.g.text = " x " + a.s,
        H(a.i, 500),
        Od(a.i, new Sd(a.j,500,.6,0)),
        G(a.i, new Sd(a.g,500,1,0,function() {
            return $n(a)
        }
        ))) : I(a.i, 1E3, function() {
            return $n(a)
        })
    }
      , $n = function(a) {
        a.s = 0;
        a.H = R.Tc
    }
      , Zn = [R.Hd, R.Ie, R.Je, R.Ke];
    var ao = Oh()
      , eo = function(a, b) {
        V.call(this, new Map([[0, bo], [2, bo], [3, bo], [5, co], [6, [co[co.length - 1]]]]), 20, [4], a, b, new u(0,0), -35);
        this.$ = 460
    };
    p(eo, V);
    eo.prototype.H = function() {
        S(ao, 18);
        return V.prototype.H.call(this)
    }
    ;
    var bo = If([[36, 324, 183, 78, 63], [36, 405, 183, 78, 63], [36, 486, 183, 78, 63], Oe, Oe, Oe, Oe, Oe], 83, 0, 0)
      , co = M([[36, 1624, 108, 78, 63], [36, 886, 127, 78, 63], [36, 967, 127, 78, 63], [36, 1624, 174, 78, 63], [36, 800, 176, 78, 63], [36, 0, 183, 78, 63], [36, 81, 183, 78, 63], [36, 162, 183, 78, 63], [36, 243, 183, 78, 63], [36, 243, 183, 78, 63], [36, 243, 183, 78, 63], [36, 243, 183, 78, 63]], 83, 0, 0);
    var fo = function(a, b, c) {
        D.call(this, b, null, void 0 === c ? function() {}
        : c);
        this.s = a;
        this.i = 0;
        this.o = z(a)
    };
    p(fo, D);
    fo.prototype.update = function(a) {
        D.prototype.update.call(this, a);
        60 < this.g - this.i && (this.i = this.g,
        y(this.s, this.o.x + 12 * Math.random(), this.o.y + 12 * Math.random()))
    }
    ;
    var go = Oh()
      , jo = function(a, b) {
        V.call(this, ho, 20, [5], a.start.x, a.start.y, new u(0,0), -35);
        this.Na = b;
        this.speed = 80;
        this.W = !0;
        this.direction = a.direction;
        this.state = 0;
        io(this);
        this.setScale(.3);
        this.g.setScale(1 / .3);
        wd(this.g, -40);
        this.g.$ = this.$
    };
    p(jo, V);
    jo.prototype.Qb = function() {}
    ;
    jo.prototype.H = function() {
        var a = this;
        S(go, 19, z(this));
        this.U(5);
        this.g.opacity = 0;
        this.o = !1;
        K(this);
        I(this, 100, function() {
            J(a, new E(a,800,z(a),a.Na,function() {
                a.Oa()
            }
            ,Nd));
            J(a, new ni(800,1,0,function(b) {
                a.opacity = b
            }
            ));
            J(a, new ni(800,.3,.7,function(b) {
                a.setScale(b)
            }
            ,Nd))
        });
        return !0
    }
    ;
    jo.prototype.update = function(a) {
        var b = z(this);
        (50 < b.x - 640 || 50 < b.y - 360 || -50 > b.x || -50 > b.y) && this.W && this.Oa();
        V.prototype.update.call(this, a)
    }
    ;
    jo.prototype.Oa = function() {
        this.W = !1;
        K(this);
        Qd(this);
        go.removeListener(this);
        this.U(5);
        O(this, 6, this.Ca)
    }
    ;
    var io = function(a) {
        a.state = 2;
        G(a, new E(a,1700,z(a),ko(a),function() {}
        ,Md));
        O(a, 0, 0);
        I(a, 500, function() {
            io(a)
        })
    }
      , ko = function(a) {
        var b = z(a);
        return new u(b.x + dj(a.direction).x * a.speed,b.y + dj(a.direction).y * a.speed)
    }
      , lo = M([Ie], 83, 0, 0)
      , mo = If([Ie], 83, 0, 0)
      , ho = new Map([[0, mo], [2, mo], [3, mo], [5, lo], [6, lo]]);
    var no = function() {
        F.call(this)
    };
    p(no, F);
    var oo = function(a) {
        H(a, Sb(4E3, 1E4));
        I(a, 0, function() {
            .5 < Math.random() ? R.Ge.play() : R.He.play()
        });
        I(a, 0, function() {
            oo(a)
        })
    };
    var po = Oh()
      , qo = function(a, b, c, d) {
        v.call(this);
        this.g = a;
        this.T = b;
        this.i = c;
        this.s = d;
        this.j = null;
        this.scale = 1;
        this.v = this.o = null;
        this.Ha = z(b);
        po.addListener(this)
    };
    p(qo, v);
    var km = function(a) {
        return new D(a)
    }
      , Y = function(a) {
        var b = new zd;
        b.$a = function() {
            return a.g.Ka().length === (a.o && 6 != a.o.state ? 1 : 0) + (a.v && 6 != a.v.state ? 1 : 0)
        }
        ;
        return b
    }
      , jm = function(a, b, c, d) {
        c = void 0 === c ? !1 : c;
        d = void 0 === d ? !1 : d;
        return new C(function() {
            var e = c
              , f = d;
            e = void 0 === e ? !1 : e;
            f = void 0 === f ? !1 : f;
            for (var g = [], h = 0; h < b.length; h++) {
                var k = b[h];
                if (!(4 === k.i[0] && 5 <= a.T.i)) {
                    var l = void 0;
                    0 < k.i.length && 4 === k.i[0] ? l = new eo(k.g.x,k.g.y) : l = vj(k.i.slice(), k.g.x, k.g.y, a.Ha);
                    l.Qb();
                    if (0 < k.j)
                        if (f) {
                            var q = l
                              , t = k.j
                              , B = k.o;
                            if (0 < t) {
                                q.s = t;
                                k = q.Ha.x;
                                var A = q.Ha.y
                                  , T = z(q).x
                                  , W = z(q).y
                                  , ea = A - W
                                  , da = k - T
                                  , Na = (void 0 === B ? 0 : B) ? .8 : -.8;
                                B = new u(k + ea * -Na,A + da * Na);
                                da = new u(T + ea * -Na,W + da * Na);
                                ea = fj(da, B, .15);
                                B = fj(da, B, .85);
                                Kf(q, t, new Cd(T,W,ea.x,ea.y,B.x,B.y,k,A))
                            }
                        } else
                            hj(l, k.j);
                    e ? (l.setScale(0),
                    .5 > a.scale ? ij(l, a.scale, 3 * a.scale) : ij(l, a.scale)) : (l.setScale(a.scale),
                    .5 > a.scale && l.g.setScale(3 * a.scale));
                    l.$ < a.T.$ && (l.$ = a.T.$ + 1);
                    w(a.g, l);
                    g.push(l)
                }
            }
            S(po, 22)
        }
        )
    }
      , ym = function(a, b, c) {
        return new C(function() {
            w(a.i, b);
            c && Bj(b, c);
            b.setScale(a.scale);
            b.o = !1
        }
        )
    }
      , Fm = function(a, b) {
        return new C(function() {
            var c = a.i.Ka().filter(function(d) {
                return d instanceof yj
            })[0];
            oj(c, b);
            c.o = !0;
            Dj(c);
            w(a.g, c)
        }
        )
    }
      , Bm = function(a) {
        return new C(function() {
            var b = new no;
            w(a.i, b);
            oo(b)
        }
        )
    }
      , zm = function(a, b, c, d) {
        return new C(function() {
            var e = a.i.Ka().filter(function(f) {
                return f instanceof yj
            })[0];
            Aj(e, b, c);
            d && b && Cj(e)
        }
        )
    }
      , mm = function(a) {
        var b = U(5, 295, 14, "");
        return new C(function() {
            var c = new Jk;
            c.Qb();
            hj(c, b.j);
            w(a.g, c);
            S(po, 22)
        }
        )
    }
      , nm = function(a) {
        var b = new zd
          , c = a.g.Ka();
        b.$a = function() {
            return 1 === c.length && c[0]instanceof Jk && 13 === c[0].state
        }
        ;
        return b
    }
      , tm = function(a) {
        var b, c = new C(function() {
            b = vk(a)
        }
        ), d = new zd;
        d.$a = function() {
            return b.$a()
        }
        ;
        return [c, d]
    }
      , pm = function(a, b) {
        return new C(function() {
            w(a.s, b)
        }
        )
    }
      , qm = function(a, b) {
        var c = 20
          , d = new C(function() {
            c = uk(b, a.g)
        }
        )
          , e = new D(c);
        e.j = function() {
            e.duration = c
        }
        ;
        return [d, e]
    }
      , rm = function(a, b) {
        return new C(function() {
            for (var c = n([].concat(ja(a.g.Ka()))), d = c.next(); !d.done; d = c.next())
                d = d.value,
                d instanceof eo || d instanceof jo || x(d);
            rk(b);
            c = vj(fi(mk[b.i].Wc), 0, 0, a.Ha, -105);
            b.Hb(c, a.Ha);
            w(a.g, c);
            S(po, 22)
        }
        )
    }
      , sm = function(a) {
        return new C(function() {
            a.i++
        }
        )
    }
      , um = function() {
        var a = Lm[2].hb;
        return new C(function() {
            a.reset();
            a.Aa = !0
        }
        )
    }
      , vm = function(a, b) {
        var c = Lm[2].hb;
        return new C(function() {
            var d = vj(fi(b), 0, 0, a.Ha, -120);
            c.Hb(d);
            w(a.g, d);
            w(a.s, c);
            S(po, 22)
        }
        )
    }
      , wm = function() {
        var a = Lm[2].hb;
        return new C(function() {
            rl(a)
        }
        )
    }
      , xm = function() {
        var a = Lm[2].hb;
        return new C(function() {
            a.Oa()
        }
        )
    }
      , Em = function() {
        var a = Lm[3].hb;
        return new C(function() {
            a.reset()
        }
        )
    }
      , Gm = function(a, b) {
        var c = Lm[3].hb;
        return new C(function() {
            var d = vj(fi(b), 0, 0, a.Ha, -105);
            c.Hb(d, a.T);
            w(a.g, d);
            w(a.s, c);
            S(po, 22)
        }
        )
    }
      , Im = function(a, b) {
        return new C(function() {
            w(a.s, b)
        }
        )
    }
      , Jm = function(a, b, c) {
        return new C(function() {
            var d = vj(fi(c), 0, 0, a.Ha, -105);
            b.Hb(d, a.T);
            w(a.g, d);
            S(po, 22)
        }
        )
    }
      , Mm = function(a, b, c) {
        var d = new C(function() {
            S(Kk, 29);
            b.Rb = Rk;
            b.U(1);
            wd(b, -50);
            b.opacity = 0;
            b.$ = 460;
            b.Xb.$ = -10;
            b.tc.$ = -461;
            b.Xb.opacity = 1;
            b.tc.opacity = 1
        }
        );
        c = new E(b,2E3,null,c,function() {}
        ,Ld);
        var e = b.Xb
          , f = z(e);
        e = new E(e,2E3,new u(f.x,f.y + 40),new u(f.x,f.y),function() {}
        ,Ld);
        f = new E(a.T,2E3,null,nd,function() {
            a.Ha = z(a.T)
        }
        );
        c = new Bd([c, e, f]);
        var g = 0;
        e = new C(function() {
            b.U(0);
            b.opacity = 1;
            g = Hf(cl)
        }
        );
        f = new C(function() {
            b.U(1)
        }
        );
        var h = new D(g);
        h.j = function() {
            h.duration = g
        }
        ;
        return [d, c, e, h, f]
    }
      , Hm = function(a, b, c) {
        return new C(function() {
            w(a.i, b);
            w(a.i, c)
        }
        )
    }
      , Km = function(a, b, c, d, e) {
        var f = []
          , g = [];
        c = n(c);
        for (var h = c.next(); !h.done; h = c.next())
            h = h.value,
            g.push(new fo(h,1500)),
            f.push(new E(h,1E3,null,new u(z(h).x,500)));
        c = new C(function() {
            R.Ae.play()
        }
        );
        g = new Bd(g);
        b = new E(b,3E3,null,new u(320,1E3),function() {}
        ,Nd);
        a = new E(a.T,2E3,null,new u(nd.x,500),function() {}
        ,Ld);
        e = new E(e,1E3,null,new u(z(e).x,500),function() {}
        ,Ld);
        d = new E(d,2E3,null,new u(z(d).x,1.5 * d.Ga()),function() {}
        ,Ld);
        f.push(b);
        f.push(a);
        f.push(e);
        f.push(d);
        f = new Bd(f);
        return [c, g, f]
    }
      , om = function(a, b) {
        for (var c = function(e) {
            return function() {
                x(b[e]);
                if (e < b.length - 1) {
                    var f = b[e + 1];
                    a.j && x(a.j);
                    a.j = f;
                    w(a, f)
                } else
                    S(po, 1)
            }
        }, d = 0; d < b.length; d++)
            b[d].Lc = c(d)
    }
      , Am = function(a, b) {
        return new C(function() {
            w(a.i, b)
        }
        )
    }
      , Cm = function(a) {
        return new C(function() {
            a.Va(0, 1, 1E3)
        }
        )
    }
      , Dm = function(a) {
        return new C(function() {
            a.Va(1, 0, 1E3)
        }
        )
    };
    qo.prototype.Sa = function(a) {
        switch (a) {
        case 21:
            this.o && 6 != this.o.state || (a = ei(190, 295),
            a = new eo(a.x,a.y),
            a.Qb(),
            a.setScale(this.scale),
            w(this.g, a),
            this.o = a)
        }
    }
    ;
    var lm = function(a) {
        return new C(function() {
            if (!(a.v && 6 != a.v.state || a.T.o.Wa())) {
                var b = new jo(ro[Math.floor(Math.random() * ro.length)],a.Ha);
                b.Qb();
                w(a.g, b);
                a.v = b
            }
        }
        )
    }
      , ro = [{
        start: new u(670,300),
        direction: new bj(-1,0)
    }, {
        start: new u(-30,300),
        direction: new bj(1,0)
    }];
    var so = function(a) {
        Td.call(this, a);
        this.o = this.g = this.s = null
    };
    p(so, Td);
    so.prototype.preload = function() {
        var a = this, b, c = new Promise(function(d) {
            return b = d
        }
        );
        if (this.s || this.g)
            return Promise.resolve();
        this.g = gh(this.Mb, function() {
            a.i();
            b()
        });
        return c
    }
    ;
    so.prototype.i = function() {
        var a = this;
        this.g && ph(this.g) && (this.s = qh(this.g),
        this.g.Fc(),
        this.g = null,
        this.o = new Image,
        this.o.onload = function() {
            return Td.prototype.i.call(a)
        }
        ,
        this.o.src = "data:image/svg+xml;utf-8," + encodeURIComponent((new XMLSerializer).serializeToString(this.s)))
    }
    ;
    so.prototype.Hc = function() {
        return this.o
    }
    ;
    var to = function(a, b) {
        this.g = b.map(function(c) {
            return new so(a + c)
        })
    };
    to.prototype.preload = function(a, b) {
        var c = uo(this, a);
        return (new Promise(function(d) {
            Ud(c, d);
            c.preload()
        }
        )).then(function() {
            return b && b()
        })
    }
    ;
    var uo = function(a, b) {
        return "number" == typeof b ? a.g[b] : a.g[b[0]]
    };
    to.prototype.Ga = function(a) {
        return a[4]
    }
    ;
    var vo = function(a, b) {
        var c = void 0 === c ? 1 : c;
        var d = document.createElement("div");
        d.style.width = b[3] * c + "px";
        d.style.height = a.Ga(b) * c + "px";
        c = void 0 === c ? 1 : c;
        a = uo(a, b);
        d.style.background = "url(" + a.Mb + ") " + (-b[1] * c + "px " + -b[2] * c + "px/") + (a.Hc().width * c + "px " + (a.Hc().height * c + "px no-repeat"));
        return d
    };
    to.prototype.Ba = function(a, b, c, d, e, f) {
        var g = uo(this, a);
        g.Kc() && b.drawImage(g.Hc(), a[0], a[1], a[3], a[4], c - e / 2, d - f / 2, e, f)
    }
    ;
    var xo = function() {
        to.call(this, "./", wo)
    };
    p(xo, to);
    Ja(xo);
    var wo = ["svg-sprite.svg"]
      , yo = [0, 20, 20, 54, 54]
      , zo = [0, 20, 94, 54, 54]
      , Ao = [0, 20, 168, 54, 54]
      , Bo = [0, 20, 242, 54, 54];
    ee.ya();
    var Co = xo.ya()
      , Do = rn()
      , Eo = Oh()
      , Fo = zn()
      , Go = function(a, b, c) {
        this.Fa = !1;
        this.T = a;
        this.s = b;
        this.V = c;
        this.i = new v;
        this.W = new v;
        this.ka = new v;
        this.v = new qo(this.i,this.T,this.W,this.ka);
        this.S = new Un(this.T);
        this.Ca = new Om(this.i);
        this.j = new Xn;
        this.j.Aa = !1;
        this.g = new v;
        this.g.Aa = !1;
        this.ha = 0;
        Eo.addListener(this);
        w(this.g, this.T);
        w(this.g, this.i);
        w(this.g, this.W);
        w(this.g, this.ka);
        w(this.g, this.v);
        w(this.g, this.j);
        this.S.$ = 470;
        w(this.g, this.S);
        w(this.g, this.Ca);
        this.H = vo(Co, yo);
        this.H.classList.add("ddlh20-pauseButton_");
        Cg(this.H, "click", function() {
            S(Eo, 23)
        });
        this.o = vo(Co, zo);
        this.o.classList.add("ddlh20-pauseButton_");
        this.o.classList.add("ddlh20-hide_");
        Cg(this.o, "click", function() {
            S(Eo, 24)
        })
    };
    p(Go, Dn);
    Go.prototype.Sa = function(a, b) {
        switch (a) {
        case 4:
            if (!this.g.Wa())
                break;
            if (!Ui(this.T, b))
                break;
            var c = this.i.Ka();
            a = !1;
            c = n(c);
            for (var d = c.next(); !d.done; d = c.next())
                d = d.value,
                6 == d.state || (a = lj(d, b) || a);
            a || S(Eo, 17);
            (b = Xh.get(b).ab) ? b.play() : this.j.H.play();
            break;
        case 7:
            Ho(this);
            break;
        case 9:
            if (!this.g.Wa())
                break;
            Vi(this.T);
            break;
        case 8:
            if (!this.g.Wa())
                break;
            Wi(this.T);
            break;
        case 1:
            b = this.j.o;
            a = Z.title;
            hn("d2", this.T.i);
            hn("d1", b);
            hn("d3", a);
            jn(103);
            K(this.T);
            S(Eo, 13);
            this.ha = 1;
            break;
        case 0:
            hn("d3", Z.title);
            jn(102);
            nn(Do, 7);
            Io(this.s);
            this.v.Aa = !1;
            4 === Lm.indexOf(Z) && R.Sc.stop();
            Z.nb.stop();
            R.Td.play();
            break;
        case 16:
            this.ha = 7;
            break;
        case 15:
            x(this.g);
            this.T.reset();
            b = this.j;
            b.o = 0;
            S(Wn, 2, b.o);
            b.S = 0;
            break;
        case 14:
            this.T.reset();
            Z.Kb && Yi(this.T);
            b = this.j;
            b.o = b.S;
            S(Wn, 2, b.o);
            Jo(this);
            break;
        case 22:
            Ho(this)
        }
    }
    ;
    Go.prototype.ta = function() {
        this.v.Aa = !1;
        Io(this.s);
        this.H.classList.add("ddlh20-hide_");
        this.o.classList.remove("ddlh20-hide_")
    }
    ;
    var Jo = function(a) {
        Si(a.T);
        vd(a.i);
        vd(a.W);
        vd(a.ka);
        var b = Z
          , c = a.v;
        a = b.uc(a.v);
        var d = b.Ha;
        c.scale = b.scale;
        c.o = null;
        c.v = null;
        c.Ha = d;
        b = a[0];
        c.j && x(c.j);
        c.j = b;
        w(c, b)
    }
      , Ho = function(a) {
        for (var b = new Set, c = n(a.i.Ka()), d = c.next(); !d.done; d = c.next())
            b.add(kj(d.value));
        a.s.o = b
    };
    Go.prototype.Xa = function() {
        this.g.Aa = !0;
        this.ha = 0;
        this.S.Aa = !0;
        w(this.g, this.T);
        w(this.g, this.i);
        K(this.T);
        y(this.T, Z.Ha);
        Si(this.T);
        this.T.$ = 180 + this.T.Ga() / 2;
        this.T.setScale(Z.scale);
        this.j.Aa = !0;
        this.v.Aa = !0;
        Z.Kb && Yi(this.T);
        w(Fo.g, this.g);
        Ko(this.s);
        this.V.appendChild(this.H);
        this.V.appendChild(this.o);
        var a = Z.title;
        hn("d2", this.T.i);
        jn(105);
        switch (a) {
        case "Level1":
            nn(Do, 2);
            break;
        case "Level2":
            nn(Do, 3);
            break;
        case "Level3":
            nn(Do, 4);
            break;
        case "Level4":
            nn(Do, 5);
            break;
        case "Level5":
            nn(Do, 6)
        }
    }
    ;
    Go.prototype.Ya = function() {
        if (4 === Lm.indexOf(Z))
            this.S.Aa = !1,
            Z.nb.stop();
        else {
            0 === Lm.indexOf(Z) && w(Fo.g, this.i);
            this.g.Aa = !1;
            var a = this.T;
            a.g && x(a.g);
            x(this.g)
        }
        this.j.Aa = !1;
        Io(this.s);
        K(this.T);
        this.V.removeChild(this.H);
        this.V.removeChild(this.o)
    }
    ;
    Go.prototype.update = function() {
        return this.ha
    }
    ;
    var Lo = function(a, b) {
        b = void 0 === b ? "white" : b;
        F.call(this);
        var c = this
          , d = new u(0,0);
        a = new Rn(a,0,0,"'Itim', sans-serif",21,b,"center");
        w(this, a);
        y(this, d.x, d.y);
        this.$ = 470;
        H(this, 1E3);
        G(this, new Sd(a,500,1,0,function() {
            x(c)
        }
        ))
    };
    p(Lo, F);
    var Mo = function(a, b, c, d, e, f, g, h, k, l, q, t) {
        Rn.call(this, b, c, d, g, h, e, f);
        var B = this;
        this.g = Pn(a, b, g, h, k, l, q);
        t && (a = new v,
        a.Ba = function(A) {
            A.fillStyle = "#000";
            var T = B.g;
            A.font = T.fontStyle + " " + T.fontSize + "px " + T.fontFamily;
            for (var W = 0, ea = 0; ea < T.lines.length; ea++)
                W = Math.max(W, A.measureText(T.lines[ea]).width);
            var da = W + 40;
            ea = B.g.lines.length * h + 20;
            T = -ea / 2;
            W = -da / 2;
            da /= 2;
            ea /= 2;
            A.beginPath();
            A.moveTo(W + 20, T);
            A.lineTo(da - 20, T);
            A.quadraticCurveTo(da, T, da, T + 20);
            A.lineTo(da, ea - 20);
            A.quadraticCurveTo(da, ea, da - 20, ea);
            A.lineTo(W + 20, ea);
            A.quadraticCurveTo(W, ea, W, ea - 20);
            A.lineTo(W, T + 20);
            A.quadraticCurveTo(W, T, W + 20, T);
            A.fill()
        }
        ,
        a.opacity = .7,
        a.$ = -1,
        y(a, 0, -5),
        w(this, a))
    };
    p(Mo, Rn);
    Mo.prototype.Ba = function(a) {
        a.fillStyle = this.i;
        a.textAlign = this.s;
        var b = this.g
          , c = this.g.fontSize / 4 - (this.g.lines.length - 1) / 2 * this.g.fontSize
          , d = this.g.fontSize
          , e = a.font;
        a.font = b.fontStyle + " " + b.fontSize + "px " + b.fontFamily;
        for (var f = 0; f < b.lines.length; f++)
            a.fillText(b.lines[f], 0, c + f * d);
        a.font = e
    }
    ;
    var No = {
        ad: ["ca"],
        ae: ["ar", "en", "fa", "hi", "ur"],
        af: ["ps", "fa"],
        ag: ["en"],
        ai: ["en"],
        al: ["sq", "en"],
        am: ["hy", "ru"],
        ao: ["pt-PT"],
        ar: ["es-419", "es"],
        as: ["en"],
        at: ["de"],
        au: ["en"],
        az: ["az", "ru"],
        ba: ["bs", "hr", "sr"],
        bd: ["bn", "en"],
        be: ["nl", "de", "en", "fr"],
        bf: ["fr"],
        bg: ["bg"],
        bh: ["ar", "en"],
        bi: ["fr"],
        bj: ["fr"],
        bn: ["ms", "en", "zh-CN"],
        bo: ["es-419", "es"],
        br: ["pt-BR", "en"],
        bs: ["en"],
        bt: ["en"],
        bw: ["tn", "en"],
        by: ["be", "ru"],
        bz: ["en", "es", "es-419"],
        ca: ["en", "fr", "fr-CA"],
        cd: ["fr", "sw"],
        cf: ["fr"],
        cg: ["fr"],
        ch: ["de", "en", "fr", "it"],
        ci: ["fr"],
        ck: ["en"],
        cl: ["es-419", "es"],
        cm: ["fr", "en"],
        cn: ["zh-CN"],
        co: ["es-419", "es"],
        cr: ["es-419", "en", "es"],
        cu: ["es-419", "es"],
        cv: ["pt-PT"],
        cy: ["en", "el", "tr"],
        cz: ["cs"],
        de: ["de", "en", "fr"],
        dj: ["fr", "ar", "so"],
        dk: ["da"],
        dm: ["en"],
        "do": ["es-419", "es"],
        dz: ["fr", "ar"],
        ec: ["es-419", "es"],
        ee: ["et", "ru"],
        eg: ["ar", "en"],
        es: ["es", "ca", "en", "eu", "gl"],
        et: ["am", "en", "so"],
        fi: ["fi", "sv"],
        fj: ["en"],
        fr: ["fr"],
        ga: ["fr"],
        ge: ["ka", "en"],
        gg: ["en", "fr"],
        gh: ["en"],
        gi: ["en", "es", "it", "pt-PT"],
        gl: ["da", "en"],
        gm: ["en", "wo"],
        gr: ["el"],
        gt: ["es-419", "es"],
        gy: ["en"],
        hk: ["zh-TW", "en", "zh-CN", "zh-HK"],
        hn: ["es-419", "es"],
        hr: ["hr"],
        ht: ["fr", "en", "ht"],
        hu: ["hu"],
        id: ["id", "en", "nl"],
        ie: ["en-GB", "ga"],
        il: ["iw", "ar", "en"],
        im: ["en"],
        "in": "en bn gu hi kn ml mr ne or pa ta te".split(" "),
        iq: ["ar", "en"],
        is: ["is", "en"],
        it: ["it", "en"],
        je: ["en", "fr"],
        jm: ["en"],
        jo: ["ar", "en"],
        jp: ["ja"],
        ke: ["sw", "en"],
        kg: ["ky", "ru"],
        kh: ["km", "en"],
        ki: ["en"],
        kr: ["ko"],
        kw: ["ar", "en"],
        kz: ["kk", "ru"],
        la: ["lo", "en"],
        lb: ["ar", "en", "fr", "hy"],
        lk: ["en", "si", "ta"],
        ls: ["st", "en", "zu"],
        lt: ["lt"],
        lu: ["de", "fr"],
        lv: ["lv", "lt", "ru"],
        ly: ["ar", "en", "it"],
        ma: ["fr", "ar"],
        md: ["ro", "ro-MD", "ru"],
        me: ["sr-ME", "bs", "sr"],
        mg: ["mg", "fr"],
        mk: ["mk"],
        ml: ["fr"],
        mm: ["my", "en"],
        mn: ["mn"],
        mt: ["mt", "en"],
        mu: ["en", "fr"],
        mv: ["en"],
        mw: ["ny", "en"],
        mx: ["es-419", "es"],
        my: ["en", "ms"],
        mz: ["pt-PT", "ny", "sn", "sw"],
        na: ["en", "af", "de"],
        ne: ["fr"],
        ng: ["en"],
        ni: ["es-419", "en", "es"],
        nl: ["nl", "en"],
        no: ["no", "nn"],
        np: ["ne", "en"],
        nr: ["en"],
        nu: ["en"],
        nz: ["en-GB"],
        om: ["ar", "en"],
        pa: ["es-419", "en", "es"],
        pe: ["es-419", "es"],
        pg: ["en"],
        ph: ["en"],
        pk: ["en", "pa", "ur"],
        pl: ["pl"],
        pn: ["en"],
        pr: ["es-419", "en", "es"],
        ps: ["ar", "en"],
        pt: ["pt-PT"],
        py: ["es-419", "es"],
        qa: ["ar", "en"],
        ro: ["ro", "de", "hu"],
        rs: ["sr", "sr-Latn"],
        ru: ["ru"],
        rw: ["en", "fr", "sw"],
        sa: ["ar", "en"],
        sb: ["en"],
        sc: ["crs", "en", "fr"],
        se: ["sv"],
        sg: ["en", "ms", "ta", "zh-CN"],
        si: ["sl"],
        sk: ["sk", "hu"],
        sl: ["en"],
        sm: ["it"],
        sn: ["fr", "wo"],
        so: ["so", "ar", "en"],
        sr: ["nl", "en"],
        st: ["pt-PT"],
        sv: ["es-419", "es"],
        td: ["fr", "ar"],
        tg: ["fr"],
        th: ["th", "en"],
        tj: ["tg", "ru"],
        tl: ["pt-PT", "en", "id"],
        tm: ["tk", "ru", "uz"],
        tn: ["ar", "fr"],
        to: ["en"],
        tr: ["tr"],
        tt: "en es es-419 fr hi zh-TW".split(" "),
        tw: ["zh-TW", "en"],
        tz: ["sw", "en"],
        ua: ["uk", "ru"],
        ug: ["en"],
        uk: ["en-GB"],
        us: ["en", "es", "es-419", "zh-CN"],
        uy: ["es-419", "es"],
        uz: ["uz", "ru"],
        vc: ["en"],
        ve: ["es-419", "es"],
        vi: ["en"],
        vn: ["vi", "en", "fr", "zh-TW"],
        vu: ["en", "fr"],
        ws: ["en"],
        za: ["en", "af", "st", "tn", "zu"],
        zm: ["en", "ny", "sn"],
        zw: ["en", "ny", "sn", "tn", "zu"]
    };
    var Oo = function() {
        this.g = this.i = null
    };
    Oo.prototype.load = function(a, b, c, d) {
        var e = this;
        a = Po(this, a, b, c);
        if (null == a)
            return Promise.resolve();
        var f = d + "messages." + a + ".nocache.json"
          , g = new bh;
        g.Ia = "text";
        return new Promise(function(h, k) {
            Eg(g, "success", function() {
                try {
                    var l = g.g ? g.g.responseText : ""
                } catch (q) {
                    l = ""
                }
                e.i = JSON.parse(l.substring(5));
                h()
            });
            Eg(g, "error", k);
            fh(g, f)
        }
        )
    }
    ;
    var Qo = function(a, b) {
        if (null == a.i)
            throw Error("B");
        a = void 0 === a.i[b] ? "" : a.i[b];
        for (var c = b = 0, d = !1, e = a.split(qb), f = 0; f < e.length; f++) {
            var g = e[f];
            ob.test(g) ? (b++,
            c++) : pb.test(g) ? d = !0 : nb.test(g) ? c++ : rb.test(g) && (d = !0)
        }
        b = 0 == c ? d ? 1 : 0 : .4 < b / c ? -1 : 1;
        return 1 == b ? "\u202a" + a + "\u202c" : -1 == b ? "\u202b" + a + "\u202c" : a
    }
      , Po = function(a, b, c, d) {
        var e = b + "-" + c;
        if (d.includes(e))
            return a.g = b,
            e;
        if (b && d.includes(b))
            return a.g = b;
        if (c && No[c])
            for (b = n(No[c]),
            c = b.next(); !c.done; c = b.next())
                if (c = c.value,
                d.includes(c))
                    return a.g = c,
                    a.g;
        return d.includes("en") ? (a.g = "en",
        a.g) : a.g = null
    };
    Ja(Oo);
    var Uo = function(a) {
        var b = void 0 === b ? !0 : b;
        var c, d, e, f;
        return Ba(function(g) {
            switch (g.g) {
            case 1:
                return c = "string" === typeof a ? a : a.value,
                ta(g, Ro(c), 2);
            case 2:
                var h;
                if (!(h = g.j))
                    if (document.execCommand) {
                        "string" === typeof a ? (So || (So = document.createElement("input"),
                        So.readOnly = !0,
                        Lc(So, "position", "absolute", "opacity", 0, "left", 0, "top", 0, "pointerEvents", "none"),
                        document.body.appendChild(So)),
                        So.value = a,
                        h = So) : h = a;
                        h !== document.activeElement && h.focus();
                        var k = h.contentEditable
                          , l = h.readOnly;
                        h.contentEditable = !0;
                        h.readOnly = !1;
                        var q = document.createRange();
                        q.selectNodeContents(h);
                        var t = window.getSelection();
                        t.removeAllRanges();
                        t.addRange(q);
                        try {
                            h.select(),
                            h.setSelectionRange(0, h.value.length)
                        } catch (A) {}
                        h.contentEditable = k;
                        h.readOnly = l;
                        try {
                            var B = document.execCommand("copy")
                        } catch (A) {
                            B = !1
                        }
                        window.getSelection().removeAllRanges();
                        h.blur();
                        So && So.remove();
                        h = B
                    } else
                        h = !1;
                if (d = h) {
                    g.g = 3;
                    break
                }
                if (!(e = b)) {
                    g.g = 4;
                    break
                }
                return ta(g, To(), 5);
            case 5:
                e = g.j;
            case 4:
                if (!(f = e)) {
                    g.g = 6;
                    break
                }
                return ta(g, Ro(c), 7);
            case 7:
                f = g.j;
            case 6:
                d = f;
            case 3:
                return d ? g.return(Promise.resolve()) : g.return(Promise.reject())
            }
        })
    }
      , Ro = function(a) {
        return Ba(function(b) {
            return navigator.clipboard && navigator.clipboard.writeText ? b.return(navigator.clipboard.writeText(a).then(function() {
                return !0
            }, function() {
                return !1
            })) : b.return(!1)
        })
    }
      , Vo = function(a) {
        return Ba(function(b) {
            switch (a.state) {
            case "granted":
                return b.return(!0);
            case "denied":
                return b.return(!1)
            }
            return b.return(new Promise(function(c) {
                a.onchange = function() {
                    return c(Vo(a))
                }
            }
            ))
        })
    }
      , To = function() {
        var a;
        return Ba(function(b) {
            if (1 == b.g) {
                if (!navigator.permissions || !navigator.permissions.query)
                    return b.return(!1);
                a = Vo;
                return ta(b, navigator.permissions.query({
                    name: "clipboard-write"
                }), 2)
            }
            return b.return(a(b.j))
        })
    }
      , So = null;
    var Wo = function(a) {
        lg.call(this);
        this.j = a;
        this.g = {}
    };
    Ta(Wo, lg);
    var Xo = []
      , Yo = function(a, b, c, d, e) {
        Array.isArray(c) || (c && (Xo[0] = c.toString()),
        c = Xo);
        for (var f = 0; f < c.length; f++) {
            var g = Cg(b, c[f], d || a.handleEvent, e || !1, a.j || a);
            if (!g)
                break;
            a.g[g.key] = g
        }
    }
      , Zo = function(a) {
        jb(a.g, function(b, c) {
            this.g.hasOwnProperty(c) && Lg(b)
        }, a);
        a.g = {}
    };
    Wo.prototype.i = function() {
        Wo.Wb.i.call(this);
        Zo(this)
    }
    ;
    Wo.prototype.handleEvent = function() {
        throw Error("C");
    }
    ;
    var $o = function(a) {
        return 0 == a.indexOf("//") ? "https:" + a : a
    }
      , ap = function(a, b) {
        var c = new kc, d;
        for (d in b)
            c.add(d, b[d]);
        a = new ec(a);
        hc(a, c);
        return a.toString()
    }
      , bp = function() {
        var a = Wc("copy_link");
        Ba(function(b) {
            if (Xc())
                return b.return(Promise.reject());
            jn(16);
            return b.return(Uo(a))
        })
    };
    var cp = Oo.ya();
    function dp(a) {
        return Qo(cp, "ShareText").replace(/\[.*\]/, "" + a)
    }
    ;var Rl = [{
        wa: we,
        x: 350,
        y: 134
    }, {
        wa: xe,
        x: 350,
        y: 134
    }, {
        wa: ye,
        x: 528,
        y: 224
    }, {
        wa: ze,
        x: 528,
        y: 224
    }, {
        wa: Ae,
        x: 431,
        y: 134
    }, {
        wa: Be,
        x: 431,
        y: 134
    }, {
        wa: Ce,
        x: 568,
        y: 324
    }, {
        wa: Ee,
        x: 511,
        y: 134
    }, {
        wa: Fe,
        x: 511,
        y: 134
    }, {
        wa: hf,
        x: 474,
        y: 224
    }, {
        wa: jf,
        x: 474,
        y: 224
    }, {
        wa: kf,
        x: 366,
        y: 224
    }, {
        wa: lf,
        x: 366,
        y: 224
    }, {
        wa: mf,
        x: 467,
        y: 244
    }, {
        wa: nf,
        x: 467,
        y: 244
    }, {
        wa: qf,
        x: 420,
        y: 224
    }, {
        wa: rf,
        x: 420,
        y: 224
    }, {
        wa: tf,
        x: 0,
        y: 0
    }];
    var ep = Oh()
      , fp = Oo.ya()
      , pn = rn()
      , gp = function(a, b, c) {
        this.Fa = !1;
        var d = this;
        this.H = this.S = !1;
        this.o = 0;
        this.s = this.v = null;
        (this.i = b) && qn(this.o);
        this.ha = c;
        c = b ? -40 : 0;
        this.Na = Sl(a, we, xe, function() {
            d.S = !0;
            hn("d3", Z.title);
            jn(106)
        }, Qo(fp, "Replay"));
        this.Ta = Sl(a, Ae, Be, function() {
            d.H = !0;
            var e = pn;
            hn("d4", d.i);
            jn(107);
            nn(e, 9)
        }, Qo(fp, "New Game"), c);
        this.Ra = Sl(a, Ee, Fe, function() {
            var e = google.doodle ? google.doodle.url : "";
            e && Sc(e);
            jn(113)
        }, Qo(fp, "Search"), c);
        this.V = Sl(a, ye, ze, function() {
            hn("d4", d.i);
            jn(111);
            bp();
            var e = new Lo(Qo(fp, "Share2"));
            e.Yb = -80;
            ud(e);
            wd(e, 43);
            w(d.V, e)
        }, Qo(fp, "Share1"));
        this.mb = Sl(a, qf, rf, function() {
            hn("d4", d.i);
            jn(110);
            var e = Wc("twitter_link")
              , f = dp(d.o);
            Xc() || (e = $o(e),
            e = "text=" + encodeURIComponent(f + "\n" + e),
            Rb("http://twitter.com/intent/tweet?" + e),
            jn(6))
        }, Qo(fp, "Share Twitter"));
        this.Ja = Sl(a, kf, lf, function() {
            hn("d4", d.i);
            jn(109);
            var e = Wc("facebook_link");
            Xc() || (e = $o(e),
            e = ap("https://www.facebook.com/dialog/share", {
                app_id: "738026486351791",
                href: e,
                hashtag: "#GoogleDoodle"
            }),
            Rb(e),
            jn(5))
        }, Qo(fp, "Share Facebook"));
        this.Ia = Sl(a, hf, jf, function() {
            hn("d4", d.i);
            jn(108);
            var e = Wc("email_link")
              , f = dp(d.o);
            if (!Xc()) {
                jn(8);
                var g = window.top.location
                  , h = void 0;
                h = void 0 === h ? Yc : h;
                e = $o(e);
                f = ap("mailto:", {
                    subject: h,
                    body: f + "\n" + e
                });
                g.href = f
            }
        }, Qo(fp, "Email"));
        this.Ma = Tl(a, mf, nf, function() {
            hn("d4", d.i);
            jn(112);
            var e = Vc()
              , f = dp(d.o);
            Xc() || (jn(9),
            e = $o(e),
            window.location = "http://www.google.com/doodles/_SHARE?description=" + encodeURIComponent(f) + "&url=" + encodeURIComponent(e))
        }, Qo(fp, "Share1"));
        this.Ca = Tl(a, of, pf, function() {
            var e = Vc()
              , f = dp(d.o);
            Xc() || null == window.agsa_ext || null == window.agsa_ext.share || (jn(15),
            window.agsa_ext.share(f + " " + e, null))
        }, Qo(fp, "Share1"));
        this.ka = Tl(a, Ce, De, function() {
            Sc(jd)
        }, Qo(fp, "Play old game"), 0);
        this.g = [this.Ta, this.Ra, this.ka];
        b || this.g.push(this.Na);
        Cc && !Gc ? this.g.push(this.Ma) : Dc ? this.g.push(this.Ca) : this.g = this.g.concat([this.V, this.mb, this.Ja, this.Ia]);
        this.j = new v;
        this.j.$ = 461;
        a = new L(b ? tf : Le);
        b = new L(Je);
        b.setScale(.67);
        y(b, 148, -5);
        w(a, b);
        y(a, 320, 180);
        w(this.j, a);
        this.buttons = new v;
        w(this.j, this.buttons);
        this.buttons.setScale(.9);
        y(this.buttons, 46, 45);
        $a(this.g, function(e) {
            w(d.buttons, e)
        });
        this.W = new Rn("0",466,143,"'Itim', sans-serif",40,"white","center");
        w(this.j, this.W);
        ep.addListener(this)
    };
    p(gp, Dn);
    gp.prototype.Xa = function() {
        this.H = this.S = !1;
        this.v || (this.v = new Mo(this.ha,Qo(fp, "Happy Halloween"),466,78,"white","center","'Itim', sans-serif",36,20,236,1,!1),
        w(this.j, this.v));
        this.s || (this.s = new Mo(this.ha,Qo(fp, "Play old game"),-34,0,"white","center","'Itim', sans-serif",24,10,65,1,!1),
        w(this.ka, this.s));
        w(zn().g, this.j);
        $a(this.g, function(a) {
            Wl(a)
        });
        Z.nb.stop();
        Z.yb && Z.yb.stop();
        this.i ? (R.Uc.play(),
        R.Jd.play(2200, !0)) : R.Dd.play(0, !0)
    }
    ;
    gp.prototype.Ya = function() {
        x(this.j);
        R.Uc.stop();
        R.Jd.stop();
        R.Dd.stop();
        $a(this.g, function(a) {
            Gn(a.o.g, a.g);
            a.i.title = ""
        })
    }
    ;
    gp.prototype.update = function() {
        return this.S ? (S(ep, 14),
        Z.state) : this.H ? (S(ep, 15),
        13) : 0
    }
    ;
    gp.prototype.Sa = function(a, b) {
        2 == a && (this.o = b,
        this.W.text = "" + this.o)
    }
    ;
    var hp = ee.ya()
      , ip = function() {
        this.i = this.j = this.o = 0;
        this.H = .8 * Math.random();
        this.S = .5 * Math.random() + .9;
        this.g = Math.random() + 2;
        this.v = -.2;
        this.s = 2 * Math.random() * Math.PI
    }
      , jp = function(a, b, c) {
        a.j = b;
        a.i = c;
        a.H = .8 * Math.random();
        a.S = .5 * Math.random() + .9;
        a.g = Math.random() + 2;
        a.v = -.2;
        a.s = 2 * Math.random() * Math.PI
    };
    ip.prototype.update = function(a, b, c) {
        this.V = b;
        this.ta = c;
        this.o = a;
        this.j += Math.cos(this.s) * this.S;
        this.i += Math.sin(this.s) * this.S;
        this.i += this.v;
        this.g -= .05;
        this.v += .04;
        2 >= this.g && jp(this, this.V, this.ta)
    }
    ;
    ip.prototype.Ba = function(a) {
        a.save();
        a.globalAlpha = .2 * Math.sin(this.g) * this.g;
        var b = this.o * (.5 - 2 * this.H + .2 * this.o);
        hp.Ba(Pe, a, this.j - 4, this.i - 4, .1 * b, !0);
        a.globalAlpha = .5 * this.g + .2 * this.o;
        b = Math.sin(this.j) + .15 * this.H + .2 * this.o;
        hp.Ba(gf, a, this.j - 4, this.i - 4, .3 * b, !0);
        a.restore()
    }
    ;
    var kp = function() {};
    p(kp, Kl);
    kp.prototype.j = function() {
        return !1
    }
    ;
    kp.prototype.Ba = function() {}
    ;
    var mp = function(a) {
        var b = this;
        this.o = a;
        this.i = [];
        this.g = null;
        this.s = this.v = 0;
        this.ha = this.H = !1;
        this.S = [];
        this.V = this.ka = 1;
        this.W = [this.o];
        this.ta = !1;
        Cg(window, "resize", function() {
            lp(b)
        });
        lp(this)
    }
      , lp = function(a, b) {
        void 0 !== b && (a.ta = b);
        a.ka = a.o.width / a.o.clientWidth;
        a.V = a.o.height / a.o.clientHeight
    }
      , op = function(a, b, c) {
        a.i.push(new np(b,c))
    }
      , Gn = function(a, b) {
        for (var c = a.i.length - 1; 0 <= c; c--)
            a.i[c].i === b && a.i.splice(c, 1);
        a.g && b === a.g.i && (a.g = null,
        pp(a));
        a.j && b === a.j.i && (a.j = null);
        qp(a, "areamove", a.v, a.s)
    }
      , Vl = function(a, b) {
        for (var c = null, d = 0; d < a.i.length; d++)
            a.i[d].i === b && (c = a.i[d]);
        c && (db(a.i, c),
        a.i.unshift(c))
    };
    mp.prototype.handleEvent = function(a) {
        var b = a.j;
        var c = void 0;
        b = (b = b || window.event) ? (c = c || b.targetTouches && b.targetTouches[0] || b.changedTouches && b.changedTouches[0]) && void 0 !== c.pageX ? [c.pageX, c.pageY] : void 0 !== b.clientX ? [b.clientX + ("rtl" == document.dir ? -1 : 1) * (document.body.scrollLeft || document.documentElement.scrollLeft || 0), b.clientY + (document.body.scrollTop || document.documentElement.scrollTop || 0)] : void 0 !== b.pageX ? [b.pageX, b.pageY] : [0, 0] : [0, 0];
        c = this.o;
        var d = 0
          , e = 0;
        if (c) {
            do
                d += c.offsetLeft,
                e += c.offsetTop;
            while (c = c.offsetParent)
        }
        c = [d, e];
        b = [b[0] - c[0], b[1] - c[1]];
        this.ta && (c = b[0],
        b[0] = b[1],
        b[1] = 0 - c);
        b[0] *= this.ka;
        b[1] *= this.V;
        c = b[1];
        this.v = b[0];
        this.s = c;
        a = a.type;
        this.ha && 0 == a.indexOf("mouse") || (b = {
            touchstart: "mousedown",
            touchend: "mouseup",
            touchmove: "mousemove"
        },
        a in b && (this.ha = !0,
        a = b[a]),
        qp(this, a, this.v, this.s))
    }
    ;
    var qp = function(a, b, c, d) {
        if (!a.H && "mousedown" == b) {
            a.H = !0;
            for (var e = 0; e < a.S.length; e++)
                a.S[e]()
        }
        if ("mousedown" == b) {
            if (!a.j)
                for (b = 0; b < a.i.length; b++)
                    if (e = a.i[b],
                    e.i.j(c, d)) {
                        a.j = e;
                        e.g("mousedown", c, d);
                        break
                    }
        } else if ("mouseup" == b)
            a.j ? (a.j.g("mouseup", c, d),
            a.j = null) : a.g && a.g.g("mouseup", c, d);
        else if ("mousemove" == b || "areamove" == b) {
            e = null;
            for (var f = 0; f < a.i.length; f++) {
                var g = a.i[f];
                if (g.i.j(c, d)) {
                    e = g;
                    break
                }
            }
            a.g != e && (a.g && a.g.g("mouseout", c, d),
            e && e.g("mouseover", c, d),
            a.g = e);
            if ("mousemove" == b)
                for (a.j && a.j.g("mousemove", c, d),
                b = 0; b < a.i.length; b++)
                    e = a.i[b],
                    e != a.j && e.i.j(c, d) && e.g("mousemove", c, d)
        } else
            "mouseout" == b ? (a.g && a.g.g("mouseout", c, d),
            a.j = null,
            a.g = null) : "contextmenu" == b && a.g && a.g.g("contextmenu", c, d);
        pp(a)
    }
      , pp = function(a) {
        for (var b = a.g && a.g.i.s() ? "pointer" : "default", c = 0, d; d = a.W[c]; c++)
            Lc(d, "cursor", b)
    }
      , np = function(a, b) {
        this.i = a;
        this.g = b
    }
      , rp = function() {
        var a = new kp;
        a.j = function() {
            return !0
        }
        ;
        a.s = function() {
            return !1
        }
        ;
        return a
    }();
    var sp = Oh()
      , vp = function(a) {
        v.call(this);
        this.g = [];
        this.Na = [];
        this.Ta = [];
        this.Ja = 0;
        this.o = new Set;
        this.mb = 0;
        this.Da = [];
        this.Ma = !1;
        this.S = this.H = this.Ia = this.Ca = this.W = this.ha = 0;
        this.V = !1;
        this.Ra = 0;
        this.i = new u(0,0);
        this.v = new u(0,0);
        this.ta = new u(0,0);
        this.ka = new u(0,0);
        this.s = new u(0,0);
        this.j = new u(0,0);
        tp(this);
        this.Gb = a;
        if (up)
            for (a = 0; 100 > a; a++)
                this.Da.push(new ip)
    };
    p(vp, v);
    var Ko = function(a) {
        a.Ma || (Ul(a.Gb, rp, function(b, c, d) {
            a.handleEvent(b, c / 3, d / 3)
        }),
        a.Ma = !0)
    }
      , Io = function(a) {
        a.Ma && (Gn(a.Gb.g, rp),
        a.Ma = !1,
        a.V = !1,
        tp(a))
    }
      , wp = function(a, b) {
        a.o = b
    }
      , tp = function(a) {
        a.g = [];
        a.Ta = [];
        a.Ja = 0;
        a.i.x = 640;
        a.i.y = 360;
        a.v.x = 0;
        a.v.y = 0;
        a.ka.y = 360;
        a.ta.y = 0;
        a.ha = 0;
        a.W = 0;
        a.Ca = 0;
        a.Ia = 0;
        a.H = 0;
        a.S = 0
    }
      , xp = function(a) {
        if (3 > a.Ja || 3 > a.g.length)
            return null;
        var b = ej(a.v, a.i)
          , c = cj(b)
          , d = a.i.y
          , e = a.v.y
          , f = a.i.x
          , g = a.s
          , h = a.j
          , k = b.x / 2
          , l = b.y / 2
          , q = b.y / 3
          , t = Tb(c / 320, 1)
          , B = 15 < a.Ja / ((k + l) / 2);
        if (a.o.has(2) && 3 < b.x / b.y && 1 >= a.W)
            return {
                ub: 2,
                confidence: t
            };
        if (a.o.has(0) && 3 > a.W && (3 < b.y / b.x && 2 > a.ha || 5 < b.y / b.x && 4 > a.ha))
            return {
                ub: 0,
                confidence: t
            };
        var A = [[0], [0, 0], [0, 0, 0]]
          , T = [[0], [0, 0], [0, 0, 0]];
        if (0 < b.y)
            for (var W = 0, ea = a.g.length; W < ea - 1; W++) {
                for (var da = a.g[W], Na = a.Ta[W], ua = (da[1] - d) / b.y, Sa = 0; Sa < A.length; Sa++)
                    A[Sa][Math.floor(Tb(ua * (Sa + 1), Sa))] += Na;
                da = (da[0] - f) / b.x;
                for (ua = 0; ua < A.length; ua++)
                    T[ua][Math.floor(Tb(da * (ua + 1), ua))] += Na
            }
        if (cj(ej(a.j, a.s)) < c / 3.75 && !B)
            return h = t,
            g = A[1][0] / A[1][1],
            a.o.has(4) && 1 < g ? {
                ub: 4,
                confidence: h
            } : a.o.has(5) ? {
                ub: 5,
                confidence: h
            } : null;
        if (a.o.has(8) && (b = new u(a.i.x + k,a.i.y + l),
        b = Math.sqrt(Math.pow(a.s.x - b.x, 2) + Math.pow(a.s.y - b.y, 2)) < Math.sqrt(Math.pow(a.j.x - b.x, 2) + Math.pow(a.j.y - b.y, 2)) ? a.s : a.j,
        b = .08 < Math.min(a.v.x - b.x, a.v.y - b.y, b.x - a.i.x, b.y - a.i.y) / c ? {
            ub: 8,
            confidence: t
        } : null))
            return b;
        if (a.o.has(6) && (3 === a.ha || A[2][1] > .4 * A[0][0] && (g.y < d + q && h.y > e - q || h.y < d + q && g.y > e - q)))
            return {
                ub: 6,
                confidence: t
            };
        A = c / 6;
        e = gd(a.ka, g);
        t = fd(e);
        d = gd(h, a.ka);
        c = fd(d);
        if (t > A && c > A && (e = Ub(e.x, e.y),
        d = Ub(d.x, d.y),
        270 < e && 90 > d || 180 < e && 270 > e && 90 < d && 180 > d)) {
            t = Tb(1 - Math.abs(t - Math.min(t, c)) / t, 1);
            if (a.o.has(10) && 2 < a.W)
                return {
                    ub: 10,
                    confidence: t
                };
            if (a.o.has(1))
                return {
                    ub: 1,
                    confidence: t
                }
        }
        t = gd(a.ta, g);
        g = fd(t);
        c = gd(h, a.ta);
        h = fd(c);
        return a.o.has(3) && g > A && h > A && (a = Ub(t.x, t.y),
        t = Ub(c.x, c.y),
        90 > a && 270 < t || 90 < a && 180 > a && 180 < t && 270 > t) ? (t = Tb(1 - Math.abs(g - Math.min(g, h)) / g, 1),
        {
            ub: 3,
            confidence: t
        }) : null
    };
    vp.prototype.Ba = function(a) {
        a.save();
        var b = Date.now() - this.mb
          , c = !this.V && 500 > b;
        if (this.V || c)
            if (c && (a.globalAlpha = 1 - b / 500),
            this.s && this.g.length) {
                (c = xp(this)) ? (b = Xh.get(c.ub).We,
                c = c.confidence,
                c = Tb(c, 1),
                b = "rgb(" + [Math.round(Sh[0] + c * (b[0] - Sh[0])), Math.round(Sh[1] + c * (b[1] - Sh[1])), Math.round(Sh[2] + c * (b[2] - Sh[2]))].join() + ")") : b = "white";
                a.strokeStyle = b;
                a.lineWidth = 10;
                a.lineCap = "round";
                a.beginPath();
                a.moveTo(this.s.x, this.s.y);
                b = this.g.length;
                for (c = 0; c < b - 2; c++)
                    a.quadraticCurveTo(this.g[c][0], this.g[c][1], (this.g[c][0] + this.g[c + 1][0]) / 2, (this.g[c][1] + this.g[c + 1][1]) / 2);
                1 < b && a.quadraticCurveTo(this.g[b - 2][0], this.g[b - 2][1], this.g[b - 1][0], this.g[b - 1][1]);
                a.stroke();
                b = this.g.length;
                if (0 < b && (a.beginPath(),
                a.arc(this.g[b - 1][0], this.g[b - 1][1], 10, 0, 2 * Math.PI),
                a.fillStyle = "white",
                a.fill(),
                up))
                    for (a.globalCompositeOperation = "lighter",
                    c = b - 1,
                    b = this.j.x - (0 < c ? this.g[c - 1][0] : 0),
                    c = this.j.y - (0 < c ? this.g[c - 1][1] : 0),
                    b = Math.sqrt(b * b + c * c),
                    b = Math.min(b, 1.5),
                    c = 0; c < this.Da.length; c++)
                        this.V && this.Da[c].Ba(a),
                        this.Da[c].update(b, this.j.x, this.j.y)
            }
        a.restore()
    }
    ;
    var yp = function(a, b, c) {
        a.V && (a.V = !1,
        a.j = new u(b,c),
        a.mb = Date.now(),
        (b = xp(a)) ? (a.Ra = b.ub,
        S(sp, 4, a.Ra)) : S(sp, 8))
    };
    vp.prototype.handleEvent = function(a, b, c) {
        switch (a) {
        case "mousemove":
            if (8 > b || 8 > c || 632 < b || 352 < c)
                yp(this, b, c);
            else if (this.V) {
                this.g.push([b, c]);
                this.Na.push(new u(b,c));
                a = this.g.length - 1;
                if (0 < a) {
                    a = this.g[a - 1];
                    var d = a[1] - c
                      , e = Math.abs(d);
                    0 === this.Ia && 3.75 < e ? (this.W++,
                    this.Ia = d / e) : 0 > d * this.Ia ? (this.S += e,
                    15 < this.S && (this.W++,
                    this.S = 0,
                    this.Ia = d / e)) : 0 < d * this.Ia && (this.S -= e,
                    -7.5 > this.S && (this.S = 0));
                    d = a[0] - b;
                    e = Math.abs(d);
                    0 === this.Ca && 3.75 < e ? (this.ha++,
                    this.Ca = d / e) : 0 > d * this.Ca ? (this.H += e,
                    15 < this.H && (this.ha++,
                    this.H = 0,
                    this.Ca = d / e)) : 0 < d * this.Ca && (this.H -= e,
                    -7.5 > this.H && (this.H = 0));
                    a = Math.sqrt(Math.pow(b - a[0], 2) + Math.pow(c - a[1], 2));
                    this.Ta.push(a);
                    this.Ja += a
                }
                this.i.x = Math.min(this.i.x, b);
                this.i.y = Math.min(this.i.y, c);
                this.v.x = Math.max(this.v.x, b);
                this.v.y = Math.max(this.v.y, c);
                c > this.ta.y && (this.ta.x = b,
                this.ta.y = c);
                c < this.ka.y && (this.ka.x = b,
                this.ka.y = c);
                this.j = new u(b,c);
                S(sp, 9)
            }
            break;
        case "mousedown":
            tp(this);
            for (a = 0; a < this.Da.length; a++)
                jp(this.Da[a], b, c);
            this.g = [];
            this.Na = [];
            this.V = !0;
            this.s = new u(b,c);
            S(sp, 7);
            break;
        case "mouseup":
            yp(this, b, c);
            break;
        case "mouseout":
            yp(this, b, c)
        }
    }
    ;
    var up = !Ec;
    var zp = zn()
      , Ap = Oo.ya()
      , Bp = function(a, b) {
        this.Fa = !1;
        this.o = 0;
        this.g = [];
        this.S = this.H = null;
        this.i = a;
        this.s = 0;
        ee.ya();
        a = Me[3];
        this.V = new u(-a / 2,40);
        this.ka = new u(a / 2,40);
        this.ha = new u(-a / 2,120);
        this.W = new u(a / 2,120);
        this.v = b;
        this.j = new v;
        this.j.$ = 461
    };
    p(Bp, Dn);
    Bp.prototype.Xa = function() {
        this.g[0] = new L(Me);
        y(this.g[0], this.V);
        w(this.g[0], new Mo(this.v,Qo(Ap, "Ready"),-90,3,"black","left","'Itim', sans-serif",53,20,260,1,!1));
        this.g[1] = new L(Ne);
        y(this.g[1], this.ha);
        w(this.g[1], new Mo(this.v,Qo(Ap, "Set"),-90,3,"black","left","'Itim', sans-serif",53,20,260,1,!1));
        this.H = new Mo(this.v,Qo(Ap, "Draw"),320,80,"white","center","'Itim', sans-serif",53,26.5,640,1,!0);
        y(this.H, 320, 80);
        this.S = new Mo(this.v,Qo(Ap, Z.title),320,105,"white","center","'Itim', sans-serif",53,26.5,640,2,!0);
        this.o = 0;
        w(zp.g, this.j);
        w(zp.g, this.i);
        this.i.$ = 2;
        0 === Lm.indexOf(Z) ? Pd(this.i, 1E3, null, Z.Ha) : y(this.i, Z.Ha);
        this.i.setScale(Z.scale);
        Si(this.i);
        Z.Kb && Yi(this.i);
        this.U(0)
    }
    ;
    Bp.prototype.Ya = function() {
        vd(this.j);
        x(this.j);
        x(this.i);
        this.i.$ = 0;
        var a = this.i;
        a.g && x(a.g);
        (a = Z.hb) && x(a)
    }
    ;
    Bp.prototype.update = function(a) {
        this.o += a;
        if (this.o >= Cp.get(this.s)) {
            this.o = 0;
            if (3 == this.s)
                return 1;
            this.U(this.s + 1)
        }
        return 0
    }
    ;
    Bp.prototype.U = function(a) {
        switch (a) {
        case 0:
            w(this.j, this.S);
            break;
        case 1:
            x(this.S);
            w(this.j, this.g[0]);
            Pd(this.g[0], 500, null, this.ka);
            break;
        case 2:
            w(this.j, this.g[1]);
            Pd(this.g[1], 500, null, this.W);
            break;
        case 3:
            Pd(this.g[0], 300, null, this.V);
            Pd(this.g[1], 300, null, this.ha);
            w(this.j, this.H);
            break;
        default:
            throw Error("Unknown GetReadyStateState");
        }
        this.s = a
    }
    ;
    var Cp = new Map([[0, 1400], [1, 900], [2, 900], [3, 1200]]);
    var Dp = Oh()
      , Ep = zn()
      , Fp = Oo.ya()
      , Hp = function(a) {
        this.Fa = !1;
        this.v = new v;
        this.i = 0;
        this.o = new F;
        this.T = a;
        this.g = new L(cf);
        this.g.$ = 461;
        J(this.g, new hi(this.g,.5,4));
        for (a = 0; 5 > a; a++) {
            var b = Gp[a]
              , c = new Rn(Qo(Fp, b.depth),b.Ob.x,b.Ob.y,"'Itim', sans-serif",16,"#88bbff",void 0,void 0,70);
            c.rotate(2 * Math.PI / 180);
            w(this.g, c);
            b = new Rn(Qo(Fp, b.xc),b.Zb.x,b.Zb.y,"'Itim', sans-serif",18,"#88bbff","right",void 0,120);
            b.rotate(2 * Math.PI / 180);
            w(this.g, b)
        }
        this.j = new L(Xe);
        y(this.j, -157, 10);
        this.j.setScale(.65);
        w(this.g, this.j);
        w(this.g, this.v);
        Dp.addListener(this)
    };
    p(Hp, Dn);
    Hp.prototype.Xa = function() {
        var a = this;
        R.Ad.play();
        x(this.o);
        vd(this.o);
        w(Ep.g, this.o);
        w(this.o, this.T);
        w(this.o, this.g);
        var b = Gp[this.i].wc;
        y(b, 140, -40);
        w(this.v, b);
        b = new Rn(Qo(Fp, Gp[this.i].jc),120,60,"'Itim', sans-serif",20,"#122a36","center",void 0,200);
        b.rotate(-12 * Math.PI / 180);
        var c = new Rn(Qo(Fp, Gp[this.i].hc),115,80,"'Itim', sans-serif",15,"#445c5c","center",void 0,200);
        c.rotate(-12 * Math.PI / 180);
        w(this.v, b);
        w(this.v, c);
        for (b = 0; b < this.i; b++)
            c = new L(Ge),
            c.setScale(.85),
            y(c, Gp[b].Nb),
            w(this.j, c);
        b = new L(He);
        y(b, Gp[this.i].Nb);
        b.setScale(.85);
        b.opacity = 0;
        w(this.j, b);
        y(this.g, 320, -this.g.Ga());
        I(this.T, 0, function() {
            a.T.o.Aa = !1
        });
        O(this.T, 11, 500);
        I(this.T, 0, function() {
            R.Me.play()
        });
        I(this.T, 1E3, function() {
            R.Le.play()
        });
        H(this.T, Zi - 1E3);
        Z.nb.stop();
        Z.yb && Z.yb.stop();
        R.Ad.play();
        G(this.T, new E(this.g,700,null,new u(320,180)));
        H(this.T, 200);
        I(this.T, 0, function() {
            R.De.play()
        });
        G(this.T, new Sd(b,200,0,1));
        H(this.T, 200);
        I(this.T, 0, function() {
            3 === a.i ? (a.T.setScale(1),
            y(a.T, 314, 245)) : (O(a.T, 0, 0),
            y(a.T, Z.Ha))
        });
        H(this.T, 2700);
        G(this.T, new E(this.g,700,null,new u(320,2 * this.g.Ga())));
        I(this.T, 500, function() {
            a.Fa = !0
        })
    }
    ;
    Hp.prototype.Ya = function() {
        K(this.T);
        vd(this.v);
        vd(this.j);
        x(this.g)
    }
    ;
    Hp.prototype.Sa = function(a, b) {
        12 === a && (this.i = b)
    }
    ;
    var Ip = new L([3, 393, 293, 280, 195]);
    Ip.setScale(.7);
    wd(Ip, 30);
    var Jp = new L([3, 393, 491, 280, 195]);
    Jp.setScale(.6);
    wd(Jp, 20);
    var Kp = new L([3, 0, 683, 280, 195]);
    Kp.setScale(.7);
    wd(Kp, 30);
    var Lp = new L([3, 283, 689, 280, 195]);
    Lp.setScale(.6);
    wd(Lp, 15);
    var Gp = [{
        Nb: new u(5,-185),
        Ob: new u(-246,-90),
        depth: "Depth1",
        Zb: new u(0,-100),
        xc: "SunlightZone",
        wc: Ip,
        jc: "Jellyfish1",
        hc: "Jellyfish2"
    }, {
        Nb: new u(5,-150),
        Ob: new u(-245,-65),
        depth: "Depth2",
        Zb: new u(0,-73),
        xc: "TwilightZone",
        wc: Jp,
        jc: "Boops1",
        hc: "Boops2"
    }, {
        Nb: new u(7,-75),
        Ob: new u(-244,0),
        depth: "Depth3",
        Zb: new u(0,-7),
        xc: "MidnightZone",
        wc: Kp,
        jc: "Squid1",
        hc: "Squid2"
    }, {
        Nb: new u(10,12),
        Ob: new u(-242,47),
        depth: "Depth4",
        Zb: new u(0,39),
        xc: "The Abyss",
        wc: Lp,
        jc: "Angler1",
        hc: "Angler2"
    }, {
        Nb: new u(7,100),
        Ob: new u(-240,137),
        depth: "Depth5",
        Zb: new u(0,130),
        xc: "The Trenches",
        wc: new L(se),
        jc: "Final Boss",
        hc: "Final Boss"
    }];
    var Mp = Oh()
      , Np = zn()
      , Op = function(a, b) {
        this.Fa = !1;
        this.Nd = a;
        this.Te = b;
        this.Vc = new vn("black",640,360);
        this.Vc.$ = 461;
        Mp.addListener(this)
    };
    p(Op, Dn);
    Op.prototype.Xa = function() {
        Z = Lm[this.Nd];
        Vd(Nm(), Ia);
        Pp();
        Jo(this.Te);
        S(Mp, 12, this.Nd);
        this.Fa = !0;
        w(Np.g, this.Vc);
        var a = Z
          , b = a.nb;
        a.yb && a.Pb ? (a.yb.play(),
        b.play(a.Pb, !0)) : b.play(0, !0);
        if (a.Ld) {
            var c = a.Pb || 0;
            Ch(b, 1E-4);
            var d = a.Ld;
            setTimeout(function() {
                Dh(b, 1, d / 1E3, c / 1E3)
            }, 1)
        }
    }
    ;
    Op.prototype.Sa = function(a) {
        29 !== a || Qp || (Qp = new Jl,
        w(Np.g, Qp))
    }
    ;
    Op.prototype.reset = function() {
        Rp = Sp = null
    }
    ;
    var Pp = function() {
        if (Sp) {
            var a = Sp
              , b = Z.background;
            a.S = null;
            a.j = {
                wa: b,
                duration: 0,
                x: 0,
                y: 0,
                z: null,
                children: null
            }
        } else
            Sp = new L(Z.background),
            Sp.$ = -1,
            y(Sp, 320, 180),
            w(Np.g, Sp);
        Qp && x(Qp);
        (Qp = Z.kc) && w(Np.g, Qp);
        y(Sp, Z.backgroundPosition);
        Rp ? vd(Rp) : (Rp = new v,
        w(Np.g, Rp));
        a = Z.lc;
        for (b = 0; b < a.length; b++) {
            var c = new L(a[b]);
            void 0 != a[b][0].z && (c.$ = a[b][0].z);
            w(Rp, c)
        }
        a = n(Z.Sb);
        for (b = a.next(); !b.done; b = a.next())
            b = b.value,
            y(b.Cb, b.position),
            b.Cb.$ = b.z,
            w(Rp, b.Cb);
        a = n(Z.ac);
        for (b = a.next(); !b.done; b = a.next())
            b = b.value,
            c = new L(b),
            c.$ = b[0].z,
            w(Rp, c);
        a = Z.Vb;
        for (b = 0; b < a.length; b++)
            w(Rp, a[b])
    };
    Op.prototype.Ya = function() {
        x(this.Vc)
    }
    ;
    var Sp = null
      , Rp = null
      , Qp = null;
    var Tp = function(a) {
        L.call(this, a);
        this.$ = 462;
        y(this, ld)
    };
    p(Tp, L);
    var Up = function(a) {
        G(a, new D(2E3,function(b) {
            a.rotate(.1 * 17 / b)
        }
        ));
        I(a, 0, function() {
            Up(a)
        })
    };
    var Vp = zn()
      , Yp = function(a, b, c) {
        c = void 0 === c ? [] : c;
        this.Fa = !1;
        this.j = c;
        this.v = a;
        this.j = c;
        this.s = b || null;
        this.g = new F;
        this.o = new vn(Wp.get(this.v),640,360);
        this.o.$ = 461;
        w(this.g, this.o);
        this.i = new Tp(Xp.get(this.v));
        w(this.g, this.i)
    };
    p(Yp, Dn);
    Yp.prototype.Xa = function() {
        this.i.opacity = 0;
        var a = this.i;
        a.Qa.rotate(-a.Nc, 0, 0);
        a.Nc = 0;
        ud(a);
        this.i.rotate(-20);
        Up(this.i);
        Zp(this);
        w(Vp.g, this.g)
    }
    ;
    Yp.prototype.Ya = function() {
        x(this.g);
        K(this.g);
        K(this.i)
    }
    ;
    var Zp = function(a) {
        var b = a.j.map(function(c) {
            return c()
        });
        b.push(Vd(a.s || Nm(), function() {}));
        Promise.all(b).then(function() {
            K(a.g);
            0 < a.i.opacity && G(a.g, new Sd(a.i,200,a.i.opacity,0));
            I(a.g, 0, function() {
                a.Fa = !0
            })
        });
        H(a.g, 500);
        G(a.g, new Sd(a.i,200,0,1))
    }
      , Wp = new Map([[0, "white"], [1, "black"]])
      , Xp = new Map([[0, [35, 0, 83, 80, 80]], [1, [35, 1162, 0, 80, 80]]]);
    var $p = zn()
      , aq = function(a) {
        this.Fa = !1;
        this.T = a;
        this.i = new v;
        this.g = new vn("#000",640,360,!0);
        this.g.$ = 461;
        w(this.i, this.g)
    };
    p(aq, Dn);
    aq.prototype.Xa = function() {
        var a = this;
        w(this.i, this.T);
        w($p.g, this.i);
        y(this.g, 0, 0);
        var b = Z.Ha;
        0 === Lm.indexOf(Z) && (b = ld);
        y(this.T, b.x, -this.T.Ga());
        this.T.setScale(Z.scale);
        G(this.g, new E(this.g,1E3,null,new u(0,390)));
        H(this.T, 200);
        Xi(this.T, b, function() {
            a.Fa = !0
        })
    }
    ;
    aq.prototype.Ya = function() {
        K(this.T);
        K(this.g);
        x(this.i)
    }
    ;
    var bq = zn()
      , eq = function(a) {
        this.Fa = !1;
        this.i = new v;
        this.g = a
    };
    p(eq, Dn);
    eq.prototype.Xa = function() {
        var a = this;
        w(this.i, this.g);
        w(bq.g, this.i);
        var b = Z.Ha;
        y(this.g, b);
        this.g.setScale(Z.scale);
        Xi(this.g, new u(b.x,360 + this.g.Ga()), function() {
            a.Fa = !0
        })
    }
    ;
    eq.prototype.Ya = function() {
        K(this.g);
        x(this.i)
    }
    ;
    var gq = function(a) {
        v.call(this);
        this.i = a;
        this.g = 2;
        this.j = 0;
        fq(this);
        this.i.get(this.g).Xa()
    };
    p(gq, v);
    var fq = function(a) {
        2 !== a.g && a.i.get(a.g) && a.i.get(a.g).Ya();
        a.j = 0;
        Jc() && !Ic() && (a.j = 1);
        a.g = hq[a.j]
    };
    gq.prototype.update = function(a) {
        if (a = this.i.get(this.g).update(a)) {
            if (1 === a && this.j < hq.length - 1)
                a = hq[++this.j];
            else {
                var b = hq.indexOf(a);
                -1 !== b && (this.j = b)
            }
            this.U(a)
        }
    }
    ;
    gq.prototype.U = function(a) {
        this.i.get(this.g).Ya();
        this.g = a;
        this.i.get(this.g).Xa()
    }
    ;
    var iq = function(a) {
        return a.i.get(a.g)
    }
      , hq = [2, 24, 3, 26, 13, 10, 4, 9, 5, 6, 19, 11, 12, 23, 14, 10, 5, 6, 19, 11, 12, 23, 15, 10, 5, 6, 19, 11, 12, 27, 16, 10, 5, 6, 19, 18, 28, 17, 5, 6, 22, 8, 25];
    var jq = function(a) {
        v.call(this);
        this.i = this.g = 0;
        a = Xh.get(a);
        this.o = a.kb;
        this.j = a.color;
        this.v = Ec ? Th : Uh;
        a = a.Jb;
        y(this, a.x, a.y)
    };
    p(jq, v);
    jq.prototype.update = function(a) {
        this.g += a;
        this.i = Nd(Tb(this.g % 2E3 / 1E3, 1))
    }
    ;
    jq.prototype.Ba = function(a) {
        a.save();
        a.lineWidth = 10;
        a.lineCap = "round";
        a.lineJoin = "round";
        a.strokeStyle = this.j;
        var b = Fd(Rh(a, this.i, this.o), 1);
        this.v(a, b.x, b.y);
        a.restore()
    }
    ;
    ee.ya();
    var kq = xo.ya()
      , lq = Oh()
      , mq = zn()
      , nq = rn()
      , oq = Oo.ya()
      , pq = function(a, b, c, d, e, f) {
        this.Fa = !1;
        var g = this;
        this.ha = a;
        this.W = b;
        this.T = f;
        this.H = [];
        this.v = this.o = null;
        nn(nq, 1);
        this.S = e;
        this.g = new F;
        this.ka = fi(c);
        this.s = this.ka.slice();
        this.j = new v;
        y(this.j, 320, 70);
        this.j.$ = 465;
        w(this.g, this.j);
        this.j.Aa = !1;
        w(this.j, new Mo(this.W,Qo(oq, 1 < this.s.length ? "Tutorial2" : "Tutorial1"),0,0,"white","center","'Itim', sans-serif",50,20,400,2,!0));
        this.i = new jq(this.s[0]);
        this.i.$ = 464;
        this.i.Aa = !1;
        w(this.g, this.i);
        this.state = 0;
        this.V = vo(kq, Ao);
        this.V.classList.add("ddlh20-skip_");
        Cg(this.V, ["click"], function() {
            g.U(7)
        })
    };
    p(pq, Dn);
    m = pq.prototype;
    m.Xa = function() {
        this.s = this.ka.slice();
        lq.addListener(this);
        this.ha.appendChild(this.V);
        Pd(this.T, 1E3, null, ld);
        Si(this.T);
        w(this.g, this.T);
        this.v = vj(this.s, 550, 198, ld);
        y(this.v, 690, 180);
        this.H.push(this.v);
        w(this.g, this.v);
        this.o && (this.o.Aa = !1);
        this.i.Aa = !1;
        w(mq.g, this.g);
        this.U(1);
        Ko(this.S)
    }
    ;
    m.Ya = function() {
        this.ha.removeChild(this.V);
        Io(this.S);
        K(this.g);
        K(this.T);
        lq.removeListener(this);
        for (var a = 0; a < this.H.length; a++)
            this.g.removeChild(this.H[a]);
        this.H = [];
        x(this.g);
        this.state = 0
    }
    ;
    m.update = function() {
        switch (this.state) {
        case 6:
            return 1;
        case 7:
            return 5;
        default:
            return 0
        }
    }
    ;
    m.Sa = function(a, b) {
        var c = this;
        switch (a) {
        case 4:
            if (b !== this.s[0]) {
                this.U(3);
                Wi(this.T);
                break
            }
            Ui(this.T, b);
            for (a = 0; a < this.H.length; a++)
                lj(this.H[a], b);
            (b = Xh.get(b).ab) ? b.play() : R.Tc.play();
            0 < this.s.length && (x(this.i),
            this.i = new jq(this.s[0]),
            this.i.$ = 464,
            this.i.Aa = !1,
            w(this.g, this.i),
            I(this.g, 2E3, function() {
                c.U(2)
            }));
            this.o && this.o.Wa() && J(this.g, new Sd(this.o,200,1,0));
            break;
        case 5:
            this.U(5);
            break;
        case 8:
            if (3 === this.state || 2 === this.state)
                this.U(3),
                Wi(this.T);
            break;
        case 7:
            K(this.g);
            if (3 === this.state || 2 === this.state)
                this.U(4),
                Vi(this.T);
            break;
        case 9:
            this.v && wp(this.S, new Set([this.s[0]])),
            3 !== this.state && 2 !== this.state && 4 !== this.state || Vi(this.T)
        }
    }
    ;
    m.U = function(a) {
        var b = this;
        switch (a) {
        case 1:
            qq(this);
            break;
        case 2:
            rq(this);
            break;
        case 3:
            this.j.Aa = !0;
            this.i.Aa = !0;
            break;
        case 4:
            this.j.Aa = !1;
            this.i.Aa = !1;
            break;
        case 5:
            Io(this.S),
            this.j.Aa = !1,
            this.i.Aa = !1,
            this.j.Aa = !1,
            I(this.T, 1E3, function() {
                b.U(6)
            })
        }
        this.state = a
    }
    ;
    var qq = function(a) {
        a.v && Pd(a.v, 2E3, null, new u(490,180), function() {
            a.U(2)
        })
    }
      , rq = function(a) {
        Si(a.T);
        a.j.Aa = !0;
        a.o && (a.o.Aa = !0);
        G(a.g, new D(2E3,null,function() {
            a.U(3)
        }
        ));
        a.v && (a.o = new Fj(-20,-30),
        w(a.v, a.o))
    };
    var tq = function(a, b) {
        var c = this;
        this.S = a;
        this.g = sq(b);
        this.j = this.v = null;
        this.H = new Promise(function(d) {
            c.j = d
        }
        );
        this.i = null;
        this.s = new Promise(function(d) {
            c.i = d
        }
        );
        this.o = !1
    };
    tq.prototype.reset = function() {
        var a = this;
        this.s = new Promise(function(b) {
            a.i = b
        }
        );
        this.H = new Promise(function(b) {
            a.j = b
        }
        );
        this.o = !1
    }
    ;
    tq.prototype.load = function() {
        var a = this;
        if (!this.v) {
            var b = null;
            this.v = new Promise(function(f) {
                b = f
            }
            );
            var c = null
              , d = function() {
                null !== c && (clearInterval(c),
                c = null);
                b()
            };
            c = setInterval(function() {
                a.g.readyState === a.g.HAVE_ENOUGH_DATA && d()
            }, 32);
            var e = function() {
                a.g.removeEventListener("error", e);
                var f = 0
                  , g = null
                  , h = a.g.error;
                h && (f = h.code || 0,
                g = h.message || null);
                console.error("video loading error", f, g);
                d()
            };
            this.g.addEventListener("canplaythrough", function() {
                a.g.removeEventListener("error", e);
                d()
            });
            this.g.addEventListener("error", e);
            this.g.preload = "auto";
            this.g.load()
        }
        return this.v
    }
    ;
    tq.prototype.play = function(a) {
        var b = this;
        a = void 0 === a ? !1 : a;
        var c = function() {
            b.g.removeEventListener("timeupdate", c);
            b.S.appendChild(b.g);
            b.j()
        };
        this.g.addEventListener("timeupdate", c);
        this.g.addEventListener("ended", function() {
            b.o = !1;
            b.i()
        });
        var d = function(f) {
            var g = 0
              , h = null;
            if (void 0 === f) {
                if (f = b.g.error)
                    g = f.code || 0,
                    h = f.message || null
            } else
                h = f,
                "NotSupportedError" === h ? g = 4 : "NotAllowedError" === h && (g = 5);
            console.error("video error", g, h);
            b.o = !1;
            b.j();
            b.i()
        };
        this.g.addEventListener("error", function() {
            d()
        });
        this.o = !0;
        var e = this.g.play();
        a && e.catch(function(f) {
            console.error("playback failed", b.g.src);
            d(f)
        });
        return e
    }
    ;
    var sq = function(a) {
        var b = document.createElement("video");
        b.setAttribute("webkit-playsinline", "");
        b.setAttribute("playsinline", "");
        b.preload = "none";
        b.muted = !0;
        b.src = a;
        return b
    };
    var uq = xo.ya()
      , be = ee.ya()
      , vq = zn()
      , wq = Oo.ya()
      , xq = function(a, b, c, d, e, f) {
        this.Fa = !1;
        var g = this;
        this.g = a;
        this.video = b;
        this.ka = c;
        this.Ia = void 0 === d ? !1 : d;
        this.ha = void 0 === e ? !1 : e;
        this.W = void 0 === f ? !1 : f;
        this.V = new F;
        this.Ca = new F;
        this.v = new v;
        w(this.v, this.V);
        w(this.v, this.Ca);
        this.video.g.classList.add("ddlh20-video_");
        this.o = document.createElement("div");
        this.o.classList.add("ddlh20-wipeOut_");
        this.S = vo(uq, Ao);
        this.S.classList.add("ddlh20-skip_");
        Cg(this.S, ["click"], function() {
            var h = g.video;
            h.o = !1;
            h.g.pause();
            h.j();
            h.i()
        });
        this.i = document.createElement("div");
        this.i.textContent = Qo(wq, "Unmute");
        this.i.classList.add("ddlh20-unmute_");
        this.s = ce(fe);
        this.s.classList.add("ddlh20-audioOffButton_");
        this.j = ce(ge);
        this.j.classList.add("ddlh20-audioOnButton_");
        this.j.classList.add("ddlh20-hide_");
        this.H = document.createElement("div");
        this.H.classList.add("ddlh20-fullscreenClickTarget_");
        Cg(this.H, ["mousedown"], function() {
            var h;
            (null === (h = g.video.g) || void 0 === h ? 0 : h.muted) ? (g.j.classList.remove("ddlh20-hide_"),
            g.s.classList.add("ddlh20-hide_"),
            g.i.classList.add("ddlh20-hide_"),
            g.video.g.muted = !1) : (g.j.classList.add("ddlh20-hide_"),
            g.s.classList.remove("ddlh20-hide_"),
            g.video.g.muted = !0)
        })
    };
    p(xq, Dn);
    xq.prototype.Xa = function() {
        var a = this;
        w(vq.g, this.v);
        this.o.classList.add("ddlh20-wipeOut_");
        this.g.appendChild(this.o);
        this.video.g.style.opacity = "1";
        this.video.g.currentTime = 0;
        this.W || this.video.g.classList.add("ddlh20-videoFadeIn_");
        this.ha && (this.video.g.muted = !1);
        this.video.H.then(function() {
            a.W && setTimeout(function() {
                a.video.g.classList.add("ddlh20-videoFadeIn_")
            }, 50);
            a.g.appendChild(a.S);
            a.ha || (a.g.appendChild(a.j),
            a.g.appendChild(a.s),
            a.g.appendChild(a.i),
            a.g.appendChild(a.H),
            a.i.classList.contains("ddlh20-hide_") || I(a.Ca, 5E3, function() {
                a.i.classList.add("ddlh20-unmuteFade_")
            }))
        });
        this.video.s.then(function() {
            a.Ia ? (a.o.classList.add("ddlh20-transition_"),
            H(a.V, 700),
            I(a.V, 0, function() {
                a.Fa = !0
            })) : a.Fa = !0
        });
        this.video.play().catch(function() {
            yq(a)
        })
    }
    ;
    var yq = function(a) {
        var b = Ol(75, 75, 1770, 930)
          , c = new sn;
        c.$ = 461;
        var d = new vn("black",640,360);
        d.$ = 460;
        w(a.v, new Xl);
        w(a.v, d);
        w(a.v, c);
        a.g.style.cursor = "pointer";
        a.video.g.style.opacity = "0.3";
        op(a.ka, b, function(e) {
            "mousedown" === e ? (a.video.g.style.opacity = "1",
            a.video.play(!0),
            x(c),
            a.g.style.cursor = "",
            Gn(a.ka, b)) : "mouseover" === e ? tn(c) : "mouseout" === e && un(c)
        })
    };
    xq.prototype.Ya = function() {
        this.g.contains(this.video.g) && this.g.removeChild(this.video.g);
        this.g.contains(this.s) && this.g.removeChild(this.s);
        this.g.contains(this.j) && this.g.removeChild(this.j);
        this.g.contains(this.i) && this.g.removeChild(this.i);
        this.g.contains(this.H) && this.g.removeChild(this.H);
        this.g.removeChild(this.S);
        this.g.removeChild(this.o);
        x(this.v);
        this.o.classList.remove("ddlh20-transition_");
        this.o.classList.remove("ddlh20-wipeOut_");
        this.video.g.classList.remove("ddlh20-videoFadeIn_");
        this.video.reset()
    }
    ;
    xq.prototype.ta = function() {
        this.video.g.pause()
    }
    ;
    xq.prototype.Da = function() {
        this.video.play()
    }
    ;
    var zq = zn()
      , Aq = function() {
        this.Fa = !1;
        this.g = new vn("#000",642,360,!1,!0);
        this.g.$ = 461
    };
    p(Aq, Dn);
    Aq.prototype.Xa = function() {
        var a = this;
        w(zq.g, this.g);
        y(this.g, -1, -390);
        G(this.g, new E(this.g,1E3,null,new u(-1,0)));
        G(this.g, new D(1E3,null,function() {
            a.Fa = !0
        }
        ))
    }
    ;
    Aq.prototype.Ya = function() {
        K(this.g);
        x(this.g)
    }
    ;
    var Bq = function(a, b) {
        var c = void 0 === c ? 52 : c;
        var d = c * (window.devicePixelRatio || 1)
          , e = document.createElement("canvas");
        e.width = d;
        e.height = d;
        var f = e.getContext("2d");
        f.fillStyle = "rgba(0,0,0,.3)";
        f.arc(d / 2, d / 2, d / 2, 0, 2 * Math.PI);
        f.fill();
        f.strokeStyle = "#fff";
        f.lineWidth = d / 52 * 3.5;
        var g = d / 52 * 2;
        f.beginPath();
        f.moveTo(d / 4 + g, d / 4 + g);
        f.lineTo(3 * d / 4 - g, 3 * d / 4 - g);
        f.stroke();
        f.beginPath();
        f.moveTo(3 * d / 4 - g, d / 4 + g);
        f.lineTo(d / 4 + g, 3 * d / 4 - g);
        f.stroke();
        this.g = e;
        this.g.style.top = "10px";
        this.g.style.right = "10px";
        this.g.style.width = c + "px";
        this.g.style.height = c + "px";
        this.g.style.cursor = "pointer";
        this.g.style.position = "absolute";
        this.g.style.pointerEvents = "all";
        this.g.style.background = "transparent";
        this.g.style.display = "none";
        this.g.setAttribute("role", "button");
        Cg(this.g, "click", b);
        a.appendChild(this.g)
    };
    var Cq = Ac && navigator.userAgent.includes("OS 12_")
      , Dq = function() {
        this.ka = this.W = this.Da = this.j = this.i = null;
        this.Ca = !1;
        this.V = null;
        this.s = this.ta = this.o = this.v = !1;
        this.g = !0;
        this.H = this.ha = !1;
        this.S = null
    };
    Dq.prototype.reset = function() {
        this.ka = this.W = this.Da = this.j = this.i = null;
        this.Ca = !1;
        this.V = null;
        this.s = this.ta = this.o = this.v = !1;
        this.g = !0;
        this.H = this.ha = !1;
        this.S = null
    }
    ;
    var Fq = function(a) {
        a.v && (a.H ? (Eq.call(document),
        a.H = !1) : (a.V.call(a.j),
        a.S && (window.screen.lockOrientation && window.screen.lockOrientation(a.S),
        window.screen.orientation && window.screen.orientation.lock && window.screen.orientation.lock(a.S).catch(Ia))))
    }
      , Hq = function(a, b, c, d, e) {
        var f = void 0 === f ? !0 : f;
        a.j = b;
        a.i = c;
        a.Da = void 0 === e ? function() {}
        : e;
        a.s = !1;
        a.V = b[Rc(b, "requestFullscreen")];
        b = !!(document[Rc(document, "fullscreenEnabled")] && a.V && Eq);
        if (Kc())
            throw "";
        c = Ac ? !1 : Jc() && !(Cc || Dc) || Gc && Ec;
        a.v = c && b;
        a.o = f && $m();
        a.ta = !f && $m();
        a.g = !0;
        if (a.v || a.o)
            Lc(document.body, "margin", "0"),
            Lc(a.j, "overflow", "visible", "width", "100%", "height", "100%"),
            document.body.scrollLeft = 0,
            d ? Yo(d, window, "scroll", Gq) : Cg(window, "scroll", Gq, !0)
    }
      , Jq = function(a) {
        var b = Iq;
        b.i.push(a);
        b.g = !0
    }
      , Lq = function() {
        var a = Kq;
        return function(b) {
            "mousedown" == b && (a.H = !0)
        }
    };
    Dq.prototype.close = function() {
        this.H = !0;
        Fq(this)
    }
    ;
    Dq.prototype.update = function() {
        if (this.v || this.o || this.ta) {
            var a = !!document[Mq]
              , b = window.innerWidth
              , c = window.innerHeight;
            0 == window.scrollX && 0 == window.scrollY || window.scrollTo(0, 0);
            if (b != this.W || c != this.ka || a != this.Ca || this.g) {
                this.ha = b < c;
                for (var d = !1, e = 0; e < this.i.length; ++e) {
                    var f = this.i[e]
                      , g = f.width || parseInt(f.dataset.width, 10)
                      , h = f.height || parseInt(f.dataset.height, 10);
                    if (this.o) {
                        if (Kc())
                            throw "";
                        $m() && Ec && !Fc && !Cc && 0 == e && (d = g < h != this.ha);
                        var k = d ? Math.min(b / h, c / g) : Math.min(b / g, c / h)
                          , l = k * g
                          , q = k * h
                          , t = this.s ? "scale(" + k + ") " : "";
                        if (d) {
                            k = (b - q) / 2 + q;
                            var B = (c - l) / 2;
                            t += "rotate(90deg)"
                        } else
                            k = (b - l) / 2,
                            B = (c - q) / 2;
                        g = this.s ? g : l;
                        h = this.s ? h : q;
                        Pc(f, "TransformOrigin", "0 0");
                        Pc(f, "Transform", t);
                        Lc(f, "position", "absolute", "width", g + "px", "height", h + "px", "left", k + "px", "top", B + "px")
                    } else
                        Ac && Lc(f, "height", c + "px")
                }
                Cq && (e = document.documentElement,
                f = e.getBoundingClientRect(),
                f.width == b && f.height == c || Lc(e, "width", b + "px", "height", c + "px"));
                !this.ta && !xc.includes("CriOS") && 0 < b && document.body.clientWidth !== b && (document.body.clientWidth < document.body.scrollWidth && Lc(document.body, "width", Math.min(document.body.scrollWidth, b) + "px"),
                document.body.clientWidth > b && Lc(document.body, "width", b + "px"));
                Lc(this.j, "height", "100%", "width", "100%");
                this.Da(d);
                this.W = b;
                this.ka = c;
                this.Ca = a;
                this.g = !1
            }
        }
    }
    ;
    var Nq = function(a, b) {
        var c = document.createElement("div");
        c.style.pointerEvents = "none";
        c.style.position = "absolute";
        c.style.top = "0";
        c.style.left = "0";
        c.style.width = "100%";
        c.style.height = "100%";
        c.style.direction = "ltr";
        c.dataset.width = a.toString();
        c.dataset.height = b.toString();
        return c
    };
    Ja(Dq);
    var Mq = Rc(document, "fullscreenElement")
      , Eq = document[Rc(document, "exitFullscreen")]
      , Gq = function(a) {
        a.preventDefault();
        a.stopPropagation();
        return !1
    };
    var Sq = function(a, b, c) {
        lg.call(this);
        this.W = a;
        this.Ia = b;
        this.Ja = c;
        this.ha = Mc();
        this.Da = Rc(document, "hidden");
        this.v = (this.ta = Rc(document, "visibilityState")) ? this.ta.replace(/state$/i, "change").toLowerCase() : null;
        this.s = Oq(this);
        this.j = !1;
        this.o = this.s;
        this.ka = new Wo;
        mg(this, Qa(ng, this.ka));
        Pq(this);
        Qq(this);
        Rq(this)
    };
    p(Sq, lg);
    var Qq = function(a) {
        Yo(a.ka, document, "mousedown mouseout touchstart mouseup mousemove touchend touchmove contextmenu keypress keydown keyup".split(" "), function() {
            a.ha = Mc();
            a.j = !1;
            Tq(a)
        }, !0)
    }
      , Pq = function(a) {
        a.v ? Uq(a) : Dc && Vq(a, function() {
            Uq(a)
        })
    }
      , Uq = function(a) {
        a.g = function() {
            a.s = Oq(a);
            a.s || (a.ha = Mc(),
            a.j = !1);
            Tq(a)
        }
        ;
        var b = window.agsa_ext;
        a.v ? document.addEventListener(a.v, a.g, !1) : b && b.registerPageVisibilityListener && (google.doodle || (google.doodle = {}),
        google.doodle.pvc = function() {
            a.g && a.g()
        }
        ,
        b.registerPageVisibilityListener("google.doodle.pvc();"))
    }
      , Vq = function(a, b) {
        window.agsa_ext ? b() : a.Ca = setTimeout(function() {
            Pq(a)
        }, 100)
    };
    Sq.prototype.i = function() {
        clearTimeout(this.S);
        clearTimeout(this.Ca);
        this.g && (this.v && document.removeEventListener ? document.removeEventListener(this.v, this.g, !1) : window.agsa_ext && window.agsa_ext.registerPageVisibilityListener && (this.g = null));
        lg.prototype.i.call(this)
    }
    ;
    var Oq = function(a) {
        if (!a.Da && !a.ta && window.agsa_ext && window.agsa_ext.getPageVisibility)
            return "hidden" == window.agsa_ext.getPageVisibility();
        var b = document[a.ta];
        return document[a.Da] || "hidden" == b
    }
      , Tq = function(a) {
        var b = a.s || a.j;
        a.o && !b ? (a.o = !1,
        a.Ja(),
        Rq(a)) : !a.o && b && (a.o = !0,
        a.Ia())
    }
      , Rq = function(a) {
        a.S && clearTimeout(a.S);
        var b = Math.max(100, a.W - Wq(a));
        a.S = setTimeout(function() {
            a.S = null;
            a.j = Wq(a) >= a.W;
            a.j || Rq(a);
            Tq(a)
        }, b)
    }
      , Wq = function(a) {
        return Mc() - a.ha
    };
    var Kq = Dq.ya()
      , cr = function(a, b, c, d) {
        c = void 0 === c ? [] : c;
        d = void 0 === d ? 6E4 : d;
        lg.call(this);
        var e = this;
        this.j = b;
        this.ta = Zg();
        this.o = new Wo(this);
        mg(this, Qa(ng, this.o));
        this.Ca = new Sq(d,function() {
            Xq();
            zh()
        }
        ,function() {
            6 !== Yq.j.g && Zq();
            var f = sh;
            f.j && f.j.gain.setValueAtTime(1, f.g.currentTime);
            f.H = !1
        }
        );
        mg(this, Qa(ng, this.Ca));
        this.g = new mp(b);
        Yo(this.o, a, ["mousedown", "mouseout", "touchstart"], function(f) {
            e.g.handleEvent(f)
        }, !0);
        Yo(this.o, document, ["mouseup", "mousemove", "touchend", "touchmove", "contextmenu"], function(f) {
            e.g.handleEvent(f)
        }, !0);
        Hq(Kq, a, [b].concat(c), this.o, function(f) {
            lp(e.g, f)
        });
        $q(this, b);
        this.Ia = ar;
        this.ha = Bo;
        this.S = .5;
        this.Da = !0;
        this.s = this.ha[3];
        this.ka = this.Ia.Ga(this.ha);
        this.v = 0;
        this.W = Ol(this.v, 0, this.s + 10, this.ka + 10);
        Ul(this, this.W, Lq());
        br(this)
    };
    p(cr, lg);
    cr.prototype.i = function() {
        Kq.reset();
        lg.prototype.i.call(this)
    }
    ;
    cr.prototype.update = function() {
        Kq.update();
        var a = Zg();
        (document[Mq] && (this.ta.width != a.width || this.ta.height != a.height) || this.Da) && 0 < parseInt(getComputedStyle(this.j).width, 10) && (this.ta = a,
        br(this),
        this.Da = !1)
    }
    ;
    var br = function(a) {
        a.S = 26 / a.s * a.j.width / parseInt(getComputedStyle(a.j).width, 10);
        a.v = a.j.width - a.S * (10 + a.s);
        var b = a.S * (10 + a.ka);
        a.W.g = [a.v, 0, a.j.width, 0, a.j.width, b, a.v, b];
        a = a.g;
        qp(a, "areamove", a.v, a.s)
    }
      , $q = function(a, b) {
        Yo(a.o, b, "touchend", function() {
            Fq(Kq)
        })
    }
      , Ul = function(a, b, c) {
        op(a.g, b, c)
    };
    var er = function() {
        lg.call(this);
        this.ha = !0;
        this.ta = !1;
        this.s = [];
        this.S = !1;
        this.g = this.o = this.j = 0;
        this.v = dr
    };
    p(er, lg);
    var hr = function(a, b) {
        b = new fr(b);
        gr(a, b)
    }
      , gr = function(a, b) {
        a.s.push(b);
        a.S = !0
    }
      , kr = function(a) {
        if (a.ha)
            a.ta = !1;
        else {
            a.ta = !0;
            ir(a);
            a.S && (a.s.sort(function(e, f) {
                return e.g == f.g ? f.i - e.i : e.g - f.g
            }),
            a.S = !1);
            for (var b = 0, c, d = 0; c = a.s[d]; d++)
                if (c.g <= a.j)
                    jr(c) && gr(a, c),
                    b++;
                else
                    break;
            a.s.splice(0, b);
            a.j++;
            requestAnimationFrame(function() {
                kr(a)
            })
        }
    }
      , ir = function(a) {
        var b = (new Date).getTime();
        30 < a.j && a.o && (b - a.o >= 1.05 * a.v ? a.g++ : a.g >>= 1,
        20 < a.g && (a.v = Math.min(50, 1.2 * a.v),
        a.g = 0));
        a.o = b
    };
    er.prototype.start = function() {
        this.ha = !1;
        this.ta || kr(this)
    }
    ;
    er.prototype.stop = function() {
        this.ha = !0;
        this.o = this.g = 0
    }
    ;
    er.prototype.i = function() {
        this.reset();
        lg.prototype.i.call(this)
    }
    ;
    er.prototype.reset = function() {
        this.stop();
        this.s = [];
        this.j = 0;
        this.S = !1;
        this.v = dr;
        this.o = this.g = 0
    }
    ;
    Ja(er);
    var dr = 1E3 / 60
      , fr = function(a) {
        var b = void 0;
        b = void 0 === b ? null : b;
        this.i = 1E3 / 60;
        this.j = a;
        this.g = er.ya().j;
        this.v = 0;
        this.o = b
    }
      , jr = function(a) {
        var b = a.j(a.v);
        a.v++;
        a.g = er.ya().j + a.i / er.ya().v;
        !b && a.o && a.o();
        return b
    };
    fr.prototype.cancel = function() {
        this.j = function() {
            return !1
        }
    }
    ;
    var mr = function(a, b, c) {
        var d = lr;
        d = void 0 === d ? Id : d;
        c = void 0 === c ? Nc : c;
        this.i = a;
        this.v = b;
        this.s = {};
        this.duration = 400;
        this.H = d;
        this.j = c;
        this.g = null;
        this.o = !1
    }
      , or = function(a) {
        var b = Math.min(Math.max(nr(a) / a.duration, 0), 1);
        a.o && (b = 1 - b);
        for (var c in a.i)
            a.v.hasOwnProperty(c) && (a.s[c] = Jd(b, a.i[c], a.v[c], a.H));
        return a.s
    };
    mr.prototype.Fa = function() {
        return nr(this) >= this.duration
    }
    ;
    var nr = function(a) {
        return null === a.g ? 0 : a.j() - a.g
    };
    mr.prototype.start = function() {
        this.g = this.j();
        this.o = !1
    }
    ;
    mr.prototype.reset = function() {
        this.g = null
    }
    ;
    var lr = function(a) {
        return 3 * a * a - 2 * a * a * a
    };
    var pr = function(a, b) {
        b = void 0 === b ? function() {}
        : b;
        lg.call(this);
        this.j = !1;
        this.S = b;
        this.g = a;
        this.s = "1" == yc.g.get("ntp");
        this.v = function() {
            return !1
        }
        ;
        this.o = null;
        Zm() && (this.g.style.willChange = "width,height")
    };
    p(pr, lg);
    var rr = function(a, b) {
        var c = !0;
        b = void 0 === b ? function() {}
        : b;
        c = void 0 === c ? !1 : c;
        var d = void 0 === d ? 0 : d;
        var e = void 0 === e ? !1 : e;
        if (a.g && Zm() && !a.j) {
            var f = a.g;
            if (Hc())
                qr(a, b);
            else {
                document.getElementById("fkbx") && Lc(f.parentElement, "width", "100%");
                var g = f.offsetHeight
                  , h = f.offsetWidth;
                d = Math.min(960, f.parentElement.clientWidth) - 2 * d;
                e = e ? 540 : d / (960 / 540);
                var k = er.ya()
                  , l = Nc()
                  , q = new mr({
                    height: g,
                    width: h
                },{
                    height: e,
                    width: d
                },function() {
                    return l
                }
                );
                q.start();
                a.j = !0;
                a.v = function(t) {
                    l = void 0 !== t ? l + t : Nc();
                    t = or(q);
                    bd(f, Math.round(t.width), Math.round(t.height));
                    a.S();
                    return q.Fa() ? (b(),
                    a.g.style.willChange = "unset",
                    a.v = function() {
                        return !1
                    }
                    ,
                    !1) : !0
                }
                ;
                c || hr(k, function() {
                    return a.v()
                })
            }
        }
    }
      , qr = function(a, b) {
        var c, d, e;
        Ba(function(f) {
            if (1 == f.g)
                return ta(f, sr(a), 2);
            c = {
                cmd: "resizeDoodle",
                width: "960px",
                height: "540px",
                duration: "400ms"
            };
            "1" == yc.g.get("ntp") ? window.parent.postMessage(c, "chrome-search://local-ntp") : window.top.postMessage(c, "chrome://new-tab-page");
            a.j = !0;
            d = !1;
            e = function() {
                a.s && a.g.classList.remove("expanderHide");
                d = !0;
                b()
            }
            ;
            a.o = setTimeout(e, 500);
            window.addEventListener("message", function(g) {
                "resizeComplete" === g.data.rf && (null !== a.o && (clearTimeout(a.o),
                a.o = null),
                d || e())
            });
            return f.return()
        })
    }
      , sr = function(a) {
        if (!a.s)
            return Promise.resolve();
        a.g.classList.add("expanderHide");
        return new Promise(function(b) {
            setTimeout(b, 200)
        }
        )
    };
    pr.prototype.i = function() {
        lg.prototype.i.call(this);
        this.reset();
        this.g = null
    }
    ;
    pr.prototype.reset = function() {
        this.j && (Lc(this.g, "width", "", "height", ""),
        ad(0),
        this.g.style.width = "",
        this.g.style.height = "");
        this.j = !1
    }
    ;
    pr.prototype.update = function(a) {
        this.v(a)
    }
    ;
    var ur = function() {
        var a = ["Itim"], b, c, d = new Promise(function(f, g) {
            b = f;
            c = g
        }
        );
        if (window.WebFontConfig && a) {
            a = n(a);
            for (var e = a.next(); !e.done; e = a.next())
                tr(e.value);
            return d
        }
        Ra("WebFontConfig.active", b);
        Ra("WebFontConfig.inactive", c);
        Ra("WebFontConfig.google.families", a);
        a = document.createElement("script");
        a.src = ("https:" == document.location.protocol ? "https" : "http") + "://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js";
        a.type = "text/javascript";
        a.async = !0;
        (document.getElementById("xjsc") || document.body).appendChild(a);
        return d
    }
      , tr = function(a) {
        a = a.toLowerCase().replace(/ /g, "");
        for (var b = n(document.documentElement.classList.values()), c = b.next(); !c.done && !c.value.search("wf-" + a + "-w+-active"); c = b.next())
            ;
    };
    var vr = function() {
        this.v = this.i = null;
        this.g = {};
        this.o = null;
        this.mc = Number.MIN_VALUE;
        this.min = Number.MAX_VALUE;
        this.j = this.s = 0
    };
    vr.prototype.update = function() {
        var a = self.performance ? self.performance.now() : Date.now();
        if (this.i) {
            var b = a - this.i
              , c = Math.round(1E3 / b);
            c > this.mc && (this.mc = c);
            c < this.min && (this.min = c);
            this.s++;
            this.j += b;
            b = Math.round(1E3 * this.s / this.j);
            this.g[a] = c;
            this.o = {
                now: c,
                tf: wr(this, 1E3, a),
                sf: wr(this, 5E3, a),
                uf: {
                    Qe: b,
                    mc: this.mc,
                    min: this.min
                }
            }
        }
        this.i = a;
        for (var d in this.g)
            Number(d) + 5100 < a && delete this.g[d];
        return this.o
    }
    ;
    var yr = function(a) {
        var b = xr;
        b.v || (b.v = a)
    }
      , wr = function(a, b, c) {
        var d = [], e = Number.MIN_VALUE, f = Number.MAX_VALUE, g;
        for (g in a.g)
            Number(g) + b >= c && (a.g[g] > e && (e = a.g[g]),
            a.g[g] < f && (f = a.g[g]),
            d.push(a.g[g]));
        return {
            Qe: Math.round(Xb.apply(null, d)),
            mc: e,
            min: f
        }
    };
    Ja(vr);
    var zr = function(a) {
        if (Ac) {
            a = n(a);
            for (var b = a.next(); !b.done; b = a.next())
                Cg(b.value, "touchmove", function(c) {
                    1 !== c.scale && c.preventDefault()
                }, {
                    passive: !1
                })
        }
    };
    var sh = Ih.ya()
      , ar = ee.ya()
      , Ar = xo.ya()
      , xr = vr.ya()
      , Br = Oh()
      , An = zn()
      , Cr = Oo.ya()
      , Iq = Dq.ya()
      , Dr = function(a, b) {
        cr.call(this, a, b)
    };
    p(Dr, cr);
    var Fr = function(a, b) {
        lg.call(this);
        var c = this;
        this.Ta = a;
        this.ha = !0;
        this.Da = !1;
        this.ta = null;
        this.ka = !1;
        this.s = b.getContext("2d");
        var d = Tm();
        a.appendChild(d);
        yr(this.s);
        this.o = new Dr(a,b);
        mg(this, Qa(ng, this.o));
        var e = this.o.g;
        d = this.o.o;
        Br.addListener(this);
        Hq(Iq, a, [b], d, function(t) {
            lp(e, t)
        });
        this.W = Nq(b.width, b.height);
        a.appendChild(this.W);
        Jq(this.W);
        this.g = document.createElement("div");
        this.g.className = "ddlh20-domRoot_";
        this.g.style.width = "640px";
        this.g.style.height = "360px";
        this.W.appendChild(this.g);
        this.Ja = function() {
            var t = c.W.offsetHeight / 360;
            c.g.style.transform = "scale(" + t + "," + t + ") translate3d(-50%,-50%,0)";
            lp(e)
        }
        ;
        this.Ja();
        this.Ia = new Bq(this.g,function() {
            Iq.close()
        }
        );
        this.Ia.g.classList.add("ddlh20-closeButton_");
        this.Ca = Date.now();
        Zm() && (this.ta = new pr(a,function() {
            return lp(e)
        }
        ),
        mg(this, Qa(ng, this.ta)));
        var f = new Qi
          , g = new vp(this.o);
        g.$ = 461;
        w(An.g, g);
        this.v = new Go(f,g,this.g);
        var h = new tq(this.g,"./intro.mp4")
          , k = new tq(this.g,"./shipcutscene.mp4")
          , l = new tq(this.g,"./outro.mp4");
        f = new Map([[2, new Fn(a,this.o,function() {
            Er(c)
        }
        )], [6, this.v], [3, new xq(this.g,h,e,!1,!1,!0)], [5, new Bp(f,this.s)], [7, new gp(this.o,!1,this.s)], [8, new gp(this.o,!0,this.s)], [4, new pq(this.g,this.s,"-",d,g,f)], [9, new pq(this.g,this.s,"|-|",d,g,f)], [10, new aq(f)], [11, new eq(f)], [12, new Aq], [13, new Op(0,this.v)], [14, new Op(1,this.v)], [15, new Op(2,this.v)], [16, new Op(3,this.v)], [17, new Op(4,this.v)], [18, new xq(this.g,k,e,!1,!0)], [19, new Hp(f)], [22, new xq(this.g,l,e,!0,!0)], [23, new Yp(1)], [24, new Yp(1,[],[function() {
            return h.load()
        }
        ])], [25, new Yp(0)], [26, new Yp(1,im)], [27, new Yp(1,void 0,[function() {
            return k.load()
        }
        ])], [28, new Yp(1,void 0,[function() {
            return l.load()
        }
        ])]]);
        this.Ma = [f.get(13), f.get(14), f.get(15), f.get(16), f.get(17)];
        this.j = new gq(f);
        this.S = document.createElement("div");
        this.S.classList.add("ddlh20-pauseContainer_");
        f = document.createElement("div");
        f.classList.add("ddlh20-pauseBg_");
        g = document.createElement("div");
        g.classList.add("ddlh20-pauseText_");
        var q = document.createElement("div");
        q.classList.add("ddlh20-unpauseButton_");
        this.S.appendChild(f);
        this.S.appendChild(g);
        this.S.appendChild(q);
        Cg(this.S, ["click"], function() {
            S(Br, 24)
        });
        g.textContent = Qo(Cr, "Paused");
        q.textContent = Qo(Cr, "Resume");
        Yo(d, a, "contextmenu", function(t) {
            t.preventDefault()
        }, !1);
        Yo(d, a, "keydown", function(t) {
            27 === t.keyCode && 6 === c.j.g && S(Br, 23)
        }, !1);
        Yo(d, a, ["mousedown", "touchstart"], function() {
            Fq(Iq)
        }, !0);
        zr([document, a, this.g, b])
    };
    p(Fr, lg);
    Fr.prototype.Sa = function(a) {
        23 === a && 6 === this.j.g ? Xq() : 24 === a && 6 === this.j.g && Zq()
    }
    ;
    Fr.prototype.i = function() {
        for (var a = 0, b; b = this.Ma[a++]; )
            b.reset();
        fq(this.j);
        An.reset();
        lg.prototype.i.call(this)
    }
    ;
    Fr.prototype.start = function() {
        this.Ta.classList.add("ddlh20-fpdoodleready_");
        Ym() || this.ka ? !this.o.Ca.o || Dc ? (this.Da = !0,
        this.loop()) : Xq() : this.update(50)
    }
    ;
    var Er = function(a) {
        a.ta && rr(a.ta, function() {});
        a.ka = !0;
        Ym() || a.start()
    };
    Fr.prototype.loop = function() {
        var a = this;
        if (this.ha) {
            requestAnimationFrame(function() {
                a.loop()
            });
            var b = Date.now()
              , c = Math.min(b - this.Ca, 50);
            this.Ca = b;
            this.update(c)
        } else
            this.Da = !1
    }
    ;
    Fr.prototype.update = function(a) {
        this.Ja();
        this.o.update();
        Iq.update();
        this.Ia.g.style.display = document[Mq] ? "block" : "none";
        this.ta && this.ta.update(a);
        this.j.update(a);
        Cn(a, this.s)
    }
    ;
    var Gr = function() {
        var a = document.getElementById("hplogo")
          , b = a.querySelector("canvas");
        xh(a);
        var c = [Ar.preload(0), ur(), ar.preload(35), Oo.ya().load(Zc, $c, Hj, "./")];
        Gj();
        var d = new Rn("test text",0,0,"serif",10,void 0,void 0,"black",100)
          , e = Kj(new Ij(Jj(function(f) {
            d.Ba(f)
        }))).then(function(f) {
            f.Fa();
            md = 1 > (0 === f.i ? Number.POSITIVE_INFINITY : f.g / f.i)
        });
        c.push(e);
        Promise.all(c).then(function() {
            Yq = new Fr(a,b);
            Yq.start()
        })
    }
      , Xq = function() {
        var a = Yq;
        a && a.ha && (Ym() || a.ka) && (a.ha = !1,
        iq(a.j).ta(),
        6 === a.j.g && (a.g.appendChild(a.S),
        a.v.ta(),
        a = sh,
        a.s || a.g.suspend(),
        a.s = !0))
    }
      , Zq = function() {
        var a = Yq;
        a && !a.ha && (Ym() || a.ka) && (a.ha = !0,
        a.Ca = Date.now(),
        a.Da || (a.Da = !0,
        a.loop()),
        iq(a.j).Da(),
        6 === a.j.g && (a.g.removeChild(a.S),
        a = a.v,
        a.v.Aa = !0,
        Ko(a.s),
        a.H.classList.remove("ddlh20-hide_"),
        a.o.classList.add("ddlh20-hide_"),
        a = sh,
        a.s && a.g.resume(),
        a.s = !1))
    }
      , Yq = null
      , Hr = function() {
        var a = document.getElementById("hplogo")
          , b = a ? a.querySelector("canvas") : null;
        a && b && (Ic() && (document.body.id = "ntp"),
        Gr())
    };
    (function(a, b) {
        window.google && google.doodle && (b && Ra("google.doodle.cpDestroy", b),
        Ra("google.doodle.cpInit", function() {
            b && b();
            a()
        }))
    }
    )(Hr, function() {
        zh();
        for (var a = n(ar.g), b = a.next(); !b.done; b = a.next())
            b.value.v = [];
        Xq();
        ng(Yq);
        Yq = null
    });
    Hr();
}
).call(this);
