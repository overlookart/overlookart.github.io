"use strict";
function _classCallCheck(e, t) {
    if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function")
}
function _defineProperty(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e
}
function _slicedToArray(e, t) {
    return _arrayWithHoles(e) || _iterableToArrayLimit(e, t) || _unsupportedIterableToArray(e, t) || _nonIterableRest()
}
function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
}
function _unsupportedIterableToArray(e, t) {
    if (e) {
        if ("string" == typeof e)
            return _arrayLikeToArray(e, t);
        var n = Object.prototype.toString.call(e).slice(8, -1);
        return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? _arrayLikeToArray(e, t) : void 0
    }
}
function _arrayLikeToArray(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var n = 0, r = new Array(t); n < t; n++)
        r[n] = e[n];
    return r
}
function _iterableToArrayLimit(e, t) {
    if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) {
        var n = [],
            r = !0,
            i = !1,
            o = void 0;
        try {
            for (var a, l = e[Symbol.iterator](); !(r = (a = l.next()).done) && (n.push(a.value), !t || n.length !== t); r = !0)
                ;
        } catch (e) {
            i = !0,
            o = e
        } finally {
            try {
                r || null == l.return || l.return()
            } finally {
                if (i)
                    throw o
            }
        }
        return n
    }
}
function _arrayWithHoles(e) {
    if (Array.isArray(e))
        return e
}
!function() {
    function n(e) {
        return ["elInY+elHeight", "elCenterY-".concat(e = 0 < arguments.length && void 0 !== e ? e : 30), "elCenterY", "elCenterY+".concat(e), "elOutY-elHeight"]
    }
    var l,
        u,
        s,
        _,
        P,
        I,
        t = {
            fadeInOut: function(e, t) {
                t = 1 < arguments.length && void 0 !== t ? t : 0;
                return {
                    opacity: [n(0 < arguments.length && void 0 !== e ? e : 30), [t, 1, 1, 1, t]]
                }
            },
            fadeIn: function(e, t) {
                return {
                    opacity: [["elInY+elHeight", 0 < arguments.length && void 0 !== e ? e : "elCenterY"], [1 < arguments.length && void 0 !== t ? t : 0, 1]]
                }
            },
            fadeOut: function(e, t) {
                return {
                    opacity: [[0 < arguments.length && void 0 !== e ? e : "elCenterY", "elOutY-elHeight"], [1, 1 < arguments.length && void 0 !== t ? t : 0]]
                }
            },
            blurInOut: function(e, t) {
                t = 1 < arguments.length && void 0 !== t ? t : 20;
                return {
                    blur: [n(0 < arguments.length && void 0 !== e ? e : 100), [t, 0, 0, 0, t]]
                }
            },
            blurIn: function(e, t) {
                return {
                    blur: [["elInY+elHeight", 0 < arguments.length && void 0 !== e ? e : "elCenterY"], [1 < arguments.length && void 0 !== t ? t : 20, 0]]
                }
            },
            blurOut: function(e, t) {
                return {
                    opacity: [[0 < arguments.length && void 0 !== e ? e : "elCenterY", "elOutY-elHeight"], [0, 1 < arguments.length && void 0 !== t ? t : 20]]
                }
            },
            scaleInOut: function(e, t) {
                t = 1 < arguments.length && void 0 !== t ? t : .6;
                return {
                    scale: [n(0 < arguments.length && void 0 !== e ? e : 100), [t, 1, 1, 1, t]]
                }
            },
            scaleIn: function(e, t) {
                return {
                    scale: [["elInY+elHeight", 0 < arguments.length && void 0 !== e ? e : "elCenterY"], [1 < arguments.length && void 0 !== t ? t : .6, 1]]
                }
            },
            scaleOut: function(e, t) {
                return {
                    scale: [[0 < arguments.length && void 0 !== e ? e : "elCenterY", "elOutY-elHeight"], [1, 1 < arguments.length && void 0 !== t ? t : .6]]
                }
            },
            slideX: function(e, t) {
                return {
                    translateX: [["elInY", 0 < arguments.length && void 0 !== e ? e : 0], [0, 1 < arguments.length && void 0 !== t ? t : 500]]
                }
            },
            slideY: function(e, t) {
                return {
                    translateY: [["elInY", 0 < arguments.length && void 0 !== e ? e : 0], [0, 1 < arguments.length && void 0 !== t ? t : 500]]
                }
            },
            spin: function(e, t) {
                e = 0 < arguments.length && void 0 !== e ? e : 1e3;
                return {
                    rotate: [[0, e], [0, 1 < arguments.length && void 0 !== t ? t : 360], {
                        modValue: e
                    }]
                }
            },
            flipX: function(e, t) {
                e = 0 < arguments.length && void 0 !== e ? e : 1e3;
                return {
                    rotateX: [[0, e], [0, 1 < arguments.length && void 0 !== t ? t : 360], {
                        modValue: e
                    }]
                }
            },
            flipY: function(e, t) {
                e = 0 < arguments.length && void 0 !== e ? e : 1e3;
                return {
                    rotateY: [[0, e], [0, 1 < arguments.length && void 0 !== t ? t : 360], {
                        modValue: e
                    }]
                }
            },
            jiggle: function(e, t) {
                e = 0 < arguments.length && void 0 !== e ? e : 50,
                t = 1 < arguments.length && void 0 !== t ? t : 40;
                return {
                    skewX: [[0, +e, 2 * e, 3 * e, 4 * e], [0, t, 0, -t, 0], {
                        modValue: 4 * e
                    }]
                }
            },
            seesaw: function(e, t) {
                e = 0 < arguments.length && void 0 !== e ? e : 50,
                t = 1 < arguments.length && void 0 !== t ? t : 40;
                return {
                    skewY: [[0, +e, 2 * e, 3 * e, 4 * e], [0, t, 0, -t, 0], {
                        modValue: 4 * e
                    }]
                }
            },
            zigzag: function(e, t) {
                e = 0 < arguments.length && void 0 !== e ? e : 100,
                t = 1 < arguments.length && void 0 !== t ? t : 100;
                return {
                    translateX: [[0, +e, 2 * e, 3 * e, 4 * e], [0, t, 0, -t, 0], {
                        modValue: 4 * e
                    }]
                }
            },
            hueRotate: function(e, t) {
                e = 0 < arguments.length && void 0 !== e ? e : 600;
                return {
                    "hue-rotate": [[0, e], [0, 1 < arguments.length && void 0 !== t ? t : 360], {
                        modValue: e
                    }]
                }
            }
        },
        e = (l = ["perspective", "scaleX", "scaleY", "scale", "skewX", "skewY", "skew", "rotateX", "rotateY", "rotate"], u = ["blur", "hue-rotate", "brightness"], s = ["translateX", "translateY", "translateZ"], _ = ["perspective", "border-radius", "blur", "translateX", "translateY", "translateZ"], P = ["hue-rotate", "rotate", "rotateX", "rotateY", "skew", "skewX", "skewY"], I = {
            easeInQuad: function(e) {
                return e * e
            },
            easeOutQuad: function(e) {
                return e * (2 - e)
            },
            easeInOutQuad: function(e) {
                return e < .5 ? 2 * e * e : (4 - 2 * e) * e - 1
            },
            easeInCubic: function(e) {
                return e * e * e
            },
            easeOutCubic: function(e) {
                return --e * e * e + 1
            },
            easeInOutCubic: function(e) {
                return e < .5 ? 4 * e * e * e : (e - 1) * (2 * e - 2) * (2 * e - 2) + 1
            },
            easeInQuart: function(e) {
                return e * e * e * e
            },
            easeOutQuart: function(e) {
                return 1 - --e * e * e * e
            },
            easeInOutQuart: function(e) {
                return e < .5 ? 8 * e * e * e * e : 1 - 8 * --e * e * e * e
            },
            easeInQuint: function(e) {
                return e * e * e * e * e
            },
            easeOutQuint: function(e) {
                return 1 + --e * e * e * e * e
            },
            easeInOutQuint: function(e) {
                return e < .5 ? 16 * e * e * e * e * e : 1 + 16 * --e * e * e * e * e
            },
            easeOutBounce: function(e) {
                var t = 7.5625,
                    n = 2.75;
                return e < 1 / n ? t * e * e : e < 2 / n ? t * (e -= 1.5 / n) * e + .75 : e < 2.5 / n ? t * (e -= 2.25 / n) * e + .9375 : t * (e -= 2.625 / n) * e + .984375
            },
            easeInBounce: function(e) {
                return 1 - I.easeOutBounce(1 - e)
            },
            easeOutBack: function(e) {
                return 1 + 2.70158 * Math.pow(e - 1, 3) + 1.70158 * Math.pow(e - 1, 2)
            },
            easeInBack: function(e) {
                return 2.70158 * e * e * e - 1.70158 * e * e
            }
        }, new function e() {
            var o = this;
            _classCallCheck(this, e),
            _defineProperty(this, "drivers", []),
            _defineProperty(this, "elements", []),
            _defineProperty(this, "frame", 0),
            _defineProperty(this, "debug", !1),
            _defineProperty(this, "windowWidth", 0),
            _defineProperty(this, "windowHeight", 0),
            _defineProperty(this, "presets", t),
            _defineProperty(this, "debugData", {
                frameLengths: []
            }),
            _defineProperty(this, "init", function() {
                o.findAndAddElements(),
                window.requestAnimationFrame(o.onAnimationFrame),
                o.windowWidth = document.body.clientWidth,
                o.windowHeight = document.body.clientHeight,
                window.onresize = o.onWindowResize
            }),
            _defineProperty(this, "onWindowResize", function() {
                document.body.clientWidth === o.windowWidth && document.body.clientHeight === o.windowHeight || (o.windowWidth = document.body.clientWidth, o.windowHeight = document.body.clientHeight, o.elements.forEach(function(e) {
                    return e.calculateTransforms()
                }))
            }),
            _defineProperty(this, "onAnimationFrame", function(e) {
                o.debug && (o.debugData.frameStart = Date.now());
                var t,
                    n = {};
                o.drivers.forEach(function(e) {
                    n[e.name] = e.getValue(o.frame)
                }),
                o.elements.forEach(function(e) {
                    e.update(n, o.frame)
                }),
                o.debug && o.debugData.frameLengths.push(Date.now() - o.debugData.frameStart),
                o.frame % 60 == 0 && o.debug && (t = Math.ceil(o.debugData.frameLengths.reduce(function(e, t) {
                    return e + t
                }, 0) / 60), console.log("Average frame calculation time: ".concat(t, "ms")), o.debugData.frameLengths = []),
                o.frame++,
                window.requestAnimationFrame(o.onAnimationFrame)
            }),
            _defineProperty(this, "addDriver", function(e, t) {
                var n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
                o.drivers.push(new i(e, t, n))
            }),
            _defineProperty(this, "removeDriver", function(t) {
                o.drivers = o.drivers.filter(function(e) {
                    return e.name !== t
                })
            }),
            _defineProperty(this, "findAndAddElements", function() {
                o.elements = [],
                document.querySelectorAll(".lax").forEach(function(e) {
                    var t = [];
                    e.classList.forEach(function(e) {
                        e.includes("lax_preset") && (e = e.replace("lax_preset_", ""), t.push(e))
                    });
                    var n = _defineProperty({}, "scrollY", {
                        presets: t
                    });
                    o.elements.push(new f(".lax", o, e, n, 0, {}))
                })
            }),
            _defineProperty(this, "addElements", function(n, r, i) {
                document.querySelectorAll(n).forEach(function(e, t) {
                    o.elements.push(new f(n, o, e, r, t, i))
                })
            }),
            _defineProperty(this, "removeElements", function(t) {
                o.elements = o.elements.filter(function(e) {
                    return e.selector !== t
                })
            }),
            _defineProperty(this, "addElement", function(e, t, n) {
                o.elements.push(new f("", o, e, t, 0, n))
            }),
            _defineProperty(this, "removeElement", function(t) {
                o.elements = o.elements.filter(function(e) {
                    return e.domElement !== t
                })
            })
        });
    function c(e, t) {
        if (Array.isArray(e))
            return e;
        for (var n = Object.keys(e).map(function(e) {
                return parseInt(e)
            }).sort(function(e, t) {
                return t < e ? 1 : -1
            }), r = n[n.length - 1], i = 0; i < n.length; i++) {
            var o = n[i];
            if (t < o) {
                r = o;
                break
            }
        }
        return e[r]
    }
    function d(e, t, n) {
        var r = t.width,
            i = t.height,
            o = t.x,
            a = t.y;
        if ("number" == typeof e)
            return e;
        var l,
            u = document.body.scrollHeight,
            s = document.body.scrollWidth,
            c = window.innerWidth,
            d = window.innerHeight,
            f = _slicedToArray((l = void 0 !== window.pageXOffset, f = "CSS1Compat" === (document.compatMode || ""), t = l ? window.pageXOffset : (f ? document.documentElement : document.body).scrollLeft, [l ? window.pageYOffset : (f ? document.documentElement : document.body).scrollTop, t]), 2),
            t = f[0],
            o = o + f[1],
            f = o + r,
            a = a + t,
            t = a + i;
        return Function("return ".concat(e.replace(/screenWidth/g, c).replace(/screenHeight/g, d).replace(/pageHeight/g, u).replace(/pageWidth/g, s).replace(/elWidth/g, r).replace(/elHeight/g, i).replace(/elInY/g, a - d).replace(/elOutY/g, t).replace(/elCenterY/g, a + i / 2 - d / 2).replace(/elInX/g, o - c).replace(/elOutX/g, f).replace(/elCenterX/g, o + r / 2 - c / 2).replace(/index/g, n)))()
    }
    function i(e, t) {
        var n = this,
            r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
        _classCallCheck(this, i),
        _defineProperty(this, "getValueFn", void 0),
        _defineProperty(this, "name", ""),
        _defineProperty(this, "lastValue", 0),
        _defineProperty(this, "frameStep", 1),
        _defineProperty(this, "m1", 0),
        _defineProperty(this, "m2", 0),
        _defineProperty(this, "inertia", 0),
        _defineProperty(this, "inertiaEnabled", !1),
        _defineProperty(this, "getValue", function(e) {
            var t = n.lastValue;
            return e % n.frameStep == 0 && (t = n.getValueFn(e)), n.inertiaEnabled && (e = t - n.lastValue, n.m1 = .8 * n.m1 + e * (1 - .8), n.m2 = .8 * n.m2 + n.m1 * (1 - .8), n.inertia = Math.round(5e3 * n.m2) / 15e3), n.lastValue = t, [n.lastValue, n.inertia]
        }),
        this.name = e,
        this.getValueFn = t,
        Object.keys(r).forEach(function(e) {
            n[e] = r[e]
        }),
        this.lastValue = this.getValueFn(0)
    }
    function f(e, t, n, r) {
        var b = this,
            i = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : 0,
            o = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : {};
        _classCallCheck(this, f),
        _defineProperty(this, "domElement", void 0),
        _defineProperty(this, "transformsData", void 0),
        _defineProperty(this, "styles", {}),
        _defineProperty(this, "selector", ""),
        _defineProperty(this, "groupIndex", 0),
        _defineProperty(this, "laxInstance", void 0),
        _defineProperty(this, "onUpdate", void 0),
        _defineProperty(this, "update", function(e, t) {
            var n,
                r = b.transforms,
                i = {};
            for (n in r) {
                var o = r[n];
                e[n] || console.error("No lax driver with name: ", n);
                var a,
                    l = _slicedToArray(e[n], 2),
                    u = l[0],
                    s = l[1];
                for (a in o) {
                    var c,
                        d = _slicedToArray(o[a], 3),
                        f = d[0],
                        h = d[1],
                        m = d[2],
                        p = void 0 === m ? {} : m,
                        g = p.modValue,
                        y = p.frameStep,
                        v = void 0 === y ? 1 : y,
                        w = p.easing,
                        d = p.inertia,
                        m = p.inertiaMode,
                        y = p.cssFn,
                        p = p.cssUnit,
                        p = void 0 === p ? "" : p,
                        w = I[w];
                    t % v == 0 && (w = function(e, t, n, r) {
                        var i = 0;
                        if (e.forEach(function(e) {
                            e < n && i++
                        }), i <= 0)
                            return t[0];
                        if (i >= e.length)
                            return t[e.length - 1];
                        var o,
                            a = (a = e[o = i - 1], e = e[i], (n - a) / (e - a));
                        return r && (a = r(a)), o = t[o], t = t[i], o * (1 - (a = a)) + t * a
                    }(f, h, g ? u % g : u, w), d && (c = s * d, "absolute" === m && (c = Math.abs(c)), w += c), c = "px" == (p || _.includes(a) ? "px" : P.includes(a) ? "deg" : "") ? 0 : 3, c = w.toFixed(c), i[a] = y ? y(c, b.domElement) : c + p)
                }
            }
            b.applyStyles(i),
            b.onUpdate && b.onUpdate(e, b.domElement)
        }),
        _defineProperty(this, "calculateTransforms", function() {
            b.transforms = {};
            var e,
                l = b.laxInstance.windowWidth;
            for (e in b.transformsData)
                !function(e) {
                    var o = b.transformsData[e],
                        a = {},
                        t = o.presets;
                    (void 0 === t ? [] : t).forEach(function(e) {
                        var t,
                            n = _slicedToArray(e.split(":"), 3),
                            r = n[0],
                            i = n[1],
                            e = n[2],
                            n = window.lax.presets[r];
                        n ? (t = n(i, e), Object.keys(t).forEach(function(e) {
                            o[e] = t[e]
                        })) : console.error("Lax preset cannot be found with name: ", r)
                    }),
                    delete o.presets;
                    for (var n in o)
                        !function(e) {
                            var t = _slicedToArray(o[e], 3),
                                n = t[0],
                                r = void 0 === n ? [-1e9, 1e9] : n,
                                n = t[1],
                                n = void 0 === n ? [-1e9, 1e9] : n,
                                t = t[2],
                                t = void 0 === t ? {} : t,
                                i = b.domElement.getBoundingClientRect(),
                                r = c(r, l).map(function(e) {
                                    return d(e, i, b.groupIndex)
                                }),
                                n = c(n, l).map(function(e) {
                                    return d(e, i, b.groupIndex)
                                });
                            a[e] = [r, n, t]
                        }(n);
                    b.transforms[e] = a
                }(e)
        }),
        _defineProperty(this, "applyStyles", function(e) {
            var r,
                i,
                o,
                t = (r = e, i = {
                    transform: "",
                    filter: ""
                }, o = {
                    translateX: 1e-5,
                    translateY: 1e-5,
                    translateZ: 1e-5
                }, Object.keys(r).forEach(function(e) {
                    var t = r[e],
                        n = _.includes(e) ? "px" : P.includes(e) ? "deg" : "";
                    s.includes(e) ? o[e] = t : l.includes(e) ? i.transform += "".concat(e, "(").concat(t).concat(n, ") ") : u.includes(e) ? i.filter += "".concat(e, "(").concat(t).concat(n, ") ") : i[e] = "".concat(t).concat(n, " ")
                }), i.transform = "translate3d(".concat(o.translateX, "px, ").concat(o.translateY, "px, ").concat(o.translateZ, "px) ").concat(i.transform), i);
            Object.keys(t).forEach(function(e) {
                b.domElement.style.setProperty(e, t[e])
            })
        }),
        this.selector = e,
        this.laxInstance = t,
        this.domElement = n,
        this.transformsData = r,
        this.groupIndex = i;
        var a = void 0 === (i = o.style) ? {} : i,
            o = o.onUpdate;
        Object.keys(a).forEach(function(e) {
            n.style.setProperty(e, a[e])
        }),
        o && (this.onUpdate = o),
        this.calculateTransforms()
    }
    "undefined" != typeof module && void 0 !== module.exports ? module.exports = e : window.lax = e
}();
