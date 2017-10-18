if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery"); + function(a) {
    "use strict";
    var b = a.fn.jquery.split(" ")[0].split(".");
    if (b[0] < 2 && b[1] < 9 || 1 == b[0] && 9 == b[1] && b[2] < 1) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")
}(jQuery), + function(a) {
    "use strict";

    function b() {
        var a = document.createElement("bootstrap"),
            b = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
        for (var c in b)
            if (void 0 !== a.style[c]) return {
                end: b[c]
            };
        return !1
    }
    a.fn.emulateTransitionEnd = function(b) {
        var c = !1,
            d = this;
        a(this).one("bsTransitionEnd", function() {
            c = !0
        });
        var e = function() {
            c || a(d).trigger(a.support.transition.end)
        };
        return setTimeout(e, b), this
    }, a(function() {
        a.support.transition = b(), a.support.transition && (a.event.special.bsTransitionEnd = {
            bindType: a.support.transition.end,
            delegateType: a.support.transition.end,
            handle: function(b) {
                return a(b.target).is(this) ? b.handleObj.handler.apply(this, arguments) : void 0
            }
        })
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var c = a(this),
                e = c.data("bs.alert");
            e || c.data("bs.alert", e = new d(this)), "string" == typeof b && e[b].call(c)
        })
    }
    var c = '[data-dismiss="alert"]',
        d = function(b) {
            a(b).on("click", c, this.close)
        };
    d.VERSION = "3.3.4", d.TRANSITION_DURATION = 150, d.prototype.close = function(b) {
        function c() {
            g.detach().trigger("closed.bs.alert").remove()
        }
        var e = a(this),
            f = e.attr("data-target");
        f || (f = e.attr("href"), f = f && f.replace(/.*(?=#[^\s]*$)/, ""));
        var g = a(f);
        b && b.preventDefault(), g.length || (g = e.closest(".alert")), g.trigger(b = a.Event("close.bs.alert")), b.isDefaultPrevented() || (g.removeClass("in"), a.support.transition && g.hasClass("fade") ? g.one("bsTransitionEnd", c).emulateTransitionEnd(d.TRANSITION_DURATION) : c())
    };
    var e = a.fn.alert;
    a.fn.alert = b, a.fn.alert.Constructor = d, a.fn.alert.noConflict = function() {
        return a.fn.alert = e, this
    }, a(document).on("click.bs.alert.data-api", c, d.prototype.close)
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.button"),
                f = "object" == typeof b && b;
            e || d.data("bs.button", e = new c(this, f)), "toggle" == b ? e.toggle() : b && e.setState(b)
        })
    }
    var c = function(b, d) {
        this.$element = a(b), this.options = a.extend({}, c.DEFAULTS, d), this.isLoading = !1
    };
    c.VERSION = "3.3.4", c.DEFAULTS = {
        loadingText: "loading..."
    }, c.prototype.setState = function(b) {
        var c = "disabled",
            d = this.$element,
            e = d.is("input") ? "val" : "html",
            f = d.data();
        b += "Text", null == f.resetText && d.data("resetText", d[e]()), setTimeout(a.proxy(function() {
            d[e](null == f[b] ? this.options[b] : f[b]), "loadingText" == b ? (this.isLoading = !0, d.addClass(c).attr(c, c)) : this.isLoading && (this.isLoading = !1, d.removeClass(c).removeAttr(c))
        }, this), 0)
    }, c.prototype.toggle = function() {
        var a = !0,
            b = this.$element.closest('[data-toggle="buttons"]');
        if (b.length) {
            var c = this.$element.find("input");
            "radio" == c.prop("type") && (c.prop("checked") && this.$element.hasClass("active") ? a = !1 : b.find(".active").removeClass("active")), a && c.prop("checked", !this.$element.hasClass("active")).trigger("change")
        } else this.$element.attr("aria-pressed", !this.$element.hasClass("active"));
        a && this.$element.toggleClass("active")
    };
    var d = a.fn.button;
    a.fn.button = b, a.fn.button.Constructor = c, a.fn.button.noConflict = function() {
        return a.fn.button = d, this
    }, a(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(c) {
        var d = a(c.target);
        d.hasClass("btn") || (d = d.closest(".btn")), b.call(d, "toggle"), c.preventDefault()
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(b) {
        a(b.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(b.type))
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.carousel"),
                f = a.extend({}, c.DEFAULTS, d.data(), "object" == typeof b && b),
                g = "string" == typeof b ? b : f.slide;
            e || d.data("bs.carousel", e = new c(this, f)), "number" == typeof b ? e.to(b) : g ? e[g]() : f.interval && e.pause().cycle()
        })
    }
    var c = function(b, c) {
        this.$element = a(b), this.$indicators = this.$element.find(".carousel-indicators"), this.options = c, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", a.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", a.proxy(this.pause, this)).on("mouseleave.bs.carousel", a.proxy(this.cycle, this))
    };
    c.VERSION = "3.3.4", c.TRANSITION_DURATION = 600, c.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    }, c.prototype.keydown = function(a) {
        if (!/input|textarea/i.test(a.target.tagName)) {
            switch (a.which) {
                case 37:
                    this.prev();
                    break;
                case 39:
                    this.next();
                    break;
                default:
                    return
            }
            a.preventDefault()
        }
    }, c.prototype.cycle = function(b) {
        return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this
    }, c.prototype.getItemIndex = function(a) {
        return this.$items = a.parent().children(".item"), this.$items.index(a || this.$active)
    }, c.prototype.getItemForDirection = function(a, b) {
        var c = this.getItemIndex(b),
            d = "prev" == a && 0 === c || "next" == a && c == this.$items.length - 1;
        if (d && !this.options.wrap) return b;
        var e = "prev" == a ? -1 : 1,
            f = (c + e) % this.$items.length;
        return this.$items.eq(f)
    }, c.prototype.to = function(a) {
        var b = this,
            c = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        return a > this.$items.length - 1 || 0 > a ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function() {
            b.to(a)
        }) : c == a ? this.pause().cycle() : this.slide(a > c ? "next" : "prev", this.$items.eq(a))
    }, c.prototype.pause = function(b) {
        return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    }, c.prototype.next = function() {
        return this.sliding ? void 0 : this.slide("next")
    }, c.prototype.prev = function() {
        return this.sliding ? void 0 : this.slide("prev")
    }, c.prototype.slide = function(b, d) {
        var e = this.$element.find(".item.active"),
            f = d || this.getItemForDirection(b, e),
            g = this.interval,
            h = "next" == b ? "left" : "right",
            i = this;
        if (f.hasClass("active")) return this.sliding = !1;
        var j = f[0],
            k = a.Event("slide.bs.carousel", {
                relatedTarget: j,
                direction: h
            });
        if (this.$element.trigger(k), !k.isDefaultPrevented()) {
            if (this.sliding = !0, g && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var l = a(this.$indicators.children()[this.getItemIndex(f)]);
                l && l.addClass("active")
            }
            var m = a.Event("slid.bs.carousel", {
                relatedTarget: j,
                direction: h
            });
            return a.support.transition && this.$element.hasClass("slide") ? (f.addClass(b), f[0].offsetWidth, e.addClass(h), f.addClass(h), e.one("bsTransitionEnd", function() {
                f.removeClass([b, h].join(" ")).addClass("active"), e.removeClass(["active", h].join(" ")), i.sliding = !1, setTimeout(function() {
                    i.$element.trigger(m)
                }, 0)
            }).emulateTransitionEnd(c.TRANSITION_DURATION)) : (e.removeClass("active"), f.addClass("active"), this.sliding = !1, this.$element.trigger(m)), g && this.cycle(), this
        }
    };
    var d = a.fn.carousel;
    a.fn.carousel = b, a.fn.carousel.Constructor = c, a.fn.carousel.noConflict = function() {
        return a.fn.carousel = d, this
    };
    var e = function(c) {
        var d, e = a(this),
            f = a(e.attr("data-target") || (d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""));
        if (f.hasClass("carousel")) {
            var g = a.extend({}, f.data(), e.data()),
                h = e.attr("data-slide-to");
            h && (g.interval = !1), b.call(f, g), h && f.data("bs.carousel").to(h), c.preventDefault()
        }
    };
    a(document).on("click.bs.carousel.data-api", "[data-slide]", e).on("click.bs.carousel.data-api", "[data-slide-to]", e), a(window).on("load", function() {
        a('[data-ride="carousel"]').each(function() {
            var c = a(this);
            b.call(c, c.data())
        })
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        var c, d = b.attr("data-target") || (c = b.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, "");
        return a(d)
    }

    function c(b) {
        return this.each(function() {
            var c = a(this),
                e = c.data("bs.collapse"),
                f = a.extend({}, d.DEFAULTS, c.data(), "object" == typeof b && b);
            !e && f.toggle && /show|hide/.test(b) && (f.toggle = !1), e || c.data("bs.collapse", e = new d(this, f)), "string" == typeof b && e[b]()
        })
    }
    var d = function(b, c) {
        this.$element = a(b), this.options = a.extend({}, d.DEFAULTS, c), this.$trigger = a('[data-toggle="collapse"][href="#' + b.id + '"],[data-toggle="collapse"][data-target="#' + b.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
    };
    d.VERSION = "3.3.4", d.TRANSITION_DURATION = 350, d.DEFAULTS = {
        toggle: !0
    }, d.prototype.dimension = function() {
        var a = this.$element.hasClass("width");
        return a ? "width" : "height"
    }, d.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var b, e = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(e && e.length && (b = e.data("bs.collapse"), b && b.transitioning))) {
                var f = a.Event("show.bs.collapse");
                if (this.$element.trigger(f), !f.isDefaultPrevented()) {
                    e && e.length && (c.call(e, "hide"), b || e.data("bs.collapse", null));
                    var g = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                    var h = function() {
                        this.$element.removeClass("collapsing").addClass("collapse in")[g](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                    };
                    if (!a.support.transition) return h.call(this);
                    var i = a.camelCase(["scroll", g].join("-"));
                    this.$element.one("bsTransitionEnd", a.proxy(h, this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])
                }
            }
        }
    }, d.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var b = a.Event("hide.bs.collapse");
            if (this.$element.trigger(b), !b.isDefaultPrevented()) {
                var c = this.dimension();
                this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                var e = function() {
                    this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                };
                return a.support.transition ? void this.$element[c](0).one("bsTransitionEnd", a.proxy(e, this)).emulateTransitionEnd(d.TRANSITION_DURATION) : e.call(this)
            }
        }
    }, d.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    }, d.prototype.getParent = function() {
        return a(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(a.proxy(function(c, d) {
            var e = a(d);
            this.addAriaAndCollapsedClass(b(e), e)
        }, this)).end()
    }, d.prototype.addAriaAndCollapsedClass = function(a, b) {
        var c = a.hasClass("in");
        a.attr("aria-expanded", c), b.toggleClass("collapsed", !c).attr("aria-expanded", c)
    };
    var e = a.fn.collapse;
    a.fn.collapse = c, a.fn.collapse.Constructor = d, a.fn.collapse.noConflict = function() {
        return a.fn.collapse = e, this
    }, a(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(d) {
        var e = a(this);
        e.attr("data-target") || d.preventDefault();
        var f = b(e),
            g = f.data("bs.collapse"),
            h = g ? "toggle" : e.data();
        c.call(f, h)
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        b && 3 === b.which || (a(e).remove(), a(f).each(function() {
            var d = a(this),
                e = c(d),
                f = {
                    relatedTarget: this
                };
            e.hasClass("open") && (e.trigger(b = a.Event("hide.bs.dropdown", f)), b.isDefaultPrevented() || (d.attr("aria-expanded", "false"), e.removeClass("open").trigger("hidden.bs.dropdown", f)))
        }))
    }

    function c(b) {
        var c = b.attr("data-target");
        c || (c = b.attr("href"), c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));
        var d = c && a(c);
        return d && d.length ? d : b.parent()
    }

    function d(b) {
        return this.each(function() {
            var c = a(this),
                d = c.data("bs.dropdown");
            d || c.data("bs.dropdown", d = new g(this)), "string" == typeof b && d[b].call(c)
        })
    }
    var e = ".dropdown-backdrop",
        f = '[data-toggle="dropdown"]',
        g = function(b) {
            a(b).on("click.bs.dropdown", this.toggle)
        };
    g.VERSION = "3.3.4", g.prototype.toggle = function(d) {
        var e = a(this);
        if (!e.is(".disabled, :disabled")) {
            var f = c(e),
                g = f.hasClass("open");
            if (b(), !g) {
                "ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click", b);
                var h = {
                    relatedTarget: this
                };
                if (f.trigger(d = a.Event("show.bs.dropdown", h)), d.isDefaultPrevented()) return;
                e.trigger("focus").attr("aria-expanded", "true"), f.toggleClass("open").trigger("shown.bs.dropdown", h)
            }
            return !1
        }
    }, g.prototype.keydown = function(b) {
        if (/(38|40|27|32)/.test(b.which) && !/input|textarea/i.test(b.target.tagName)) {
            var d = a(this);
            if (b.preventDefault(), b.stopPropagation(), !d.is(".disabled, :disabled")) {
                var e = c(d),
                    g = e.hasClass("open");
                if (!g && 27 != b.which || g && 27 == b.which) return 27 == b.which && e.find(f).trigger("focus"), d.trigger("click");
                var h = " li:not(.disabled):visible a",
                    i = e.find('[role="menu"]' + h + ', [role="listbox"]' + h);
                if (i.length) {
                    var j = i.index(b.target);
                    38 == b.which && j > 0 && j--, 40 == b.which && j < i.length - 1 && j++, ~j || (j = 0), i.eq(j).trigger("focus")
                }
            }
        }
    };
    var h = a.fn.dropdown;
    a.fn.dropdown = d, a.fn.dropdown.Constructor = g, a.fn.dropdown.noConflict = function() {
        return a.fn.dropdown = h, this
    }, a(document).on("click.bs.dropdown.data-api", b).on("click.bs.dropdown.data-api", ".dropdown form", function(a) {
        a.stopPropagation()
    }).on("click.bs.dropdown.data-api", f, g.prototype.toggle).on("keydown.bs.dropdown.data-api", f, g.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="menu"]', g.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="listbox"]', g.prototype.keydown)
}(jQuery), + function(a) {
    "use strict";

    function b(b, d) {
        return this.each(function() {
            var e = a(this),
                f = e.data("bs.modal"),
                g = a.extend({}, c.DEFAULTS, e.data(), "object" == typeof b && b);
            f || e.data("bs.modal", f = new c(this, g)), "string" == typeof b ? f[b](d) : g.show && f.show(d)
        })
    }
    var c = function(b, c) {
        this.options = c, this.$body = a(document.body), this.$element = a(b), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, a.proxy(function() {
            this.$element.trigger("loaded.bs.modal")
        }, this))
    };
    c.VERSION = "3.3.4", c.TRANSITION_DURATION = 300, c.BACKDROP_TRANSITION_DURATION = 150, c.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, c.prototype.toggle = function(a) {
        return this.isShown ? this.hide() : this.show(a)
    }, c.prototype.show = function(b) {
        var d = this,
            e = a.Event("show.bs.modal", {
                relatedTarget: b
            });
        this.$element.trigger(e), this.isShown || e.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function() {
            d.$element.one("mouseup.dismiss.bs.modal", function(b) {
                a(b.target).is(d.$element) && (d.ignoreBackdropClick = !0)
            })
        }), this.backdrop(function() {
            var e = a.support.transition && d.$element.hasClass("fade");
            d.$element.parent().length || d.$element.appendTo(d.$body), d.$element.show().scrollTop(0), d.adjustDialog(), e && d.$element[0].offsetWidth, d.$element.addClass("in").attr("aria-hidden", !1), d.enforceFocus();
            var f = a.Event("shown.bs.modal", {
                relatedTarget: b
            });
            e ? d.$dialog.one("bsTransitionEnd", function() {
                d.$element.trigger("focus").trigger(f)
            }).emulateTransitionEnd(c.TRANSITION_DURATION) : d.$element.trigger("focus").trigger(f)
        }))
    }, c.prototype.hide = function(b) {
        b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), a(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", a.proxy(this.hideModal, this)).emulateTransitionEnd(c.TRANSITION_DURATION) : this.hideModal())
    }, c.prototype.enforceFocus = function() {
        a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function(a) {
            this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.trigger("focus")
        }, this))
    }, c.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", a.proxy(function(a) {
            27 == a.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
    }, c.prototype.resize = function() {
        this.isShown ? a(window).on("resize.bs.modal", a.proxy(this.handleUpdate, this)) : a(window).off("resize.bs.modal")
    }, c.prototype.hideModal = function() {
        var a = this;
        this.$element.hide(), this.backdrop(function() {
            a.$body.removeClass("modal-open"), a.resetAdjustments(), a.resetScrollbar(), a.$element.trigger("hidden.bs.modal")
        })
    }, c.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
    }, c.prototype.backdrop = function(b) {
        var d = this,
            e = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var f = a.support.transition && e;
            if (this.$backdrop = a('<div class="modal-backdrop ' + e + '" />').appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", a.proxy(function(a) {
                    return this.ignoreBackdropClick ? void(this.ignoreBackdropClick = !1) : void(a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()))
                }, this)), f && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b) return;
            f ? this.$backdrop.one("bsTransitionEnd", b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : b()
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var g = function() {
                d.removeBackdrop(), b && b()
            };
            a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : g()
        } else b && b()
    }, c.prototype.handleUpdate = function() {
        this.adjustDialog()
    }, c.prototype.adjustDialog = function() {
        var a = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && a ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !a ? this.scrollbarWidth : ""
        })
    }, c.prototype.resetAdjustments = function() {
        this.$element.css({
            paddingLeft: "",
            paddingRight: ""
        })
    }, c.prototype.checkScrollbar = function() {
        var a = window.innerWidth;
        if (!a) {
            var b = document.documentElement.getBoundingClientRect();
            a = b.right - Math.abs(b.left)
        }
        this.bodyIsOverflowing = document.body.clientWidth < a, this.scrollbarWidth = this.measureScrollbar()
    }, c.prototype.setScrollbar = function() {
        var a = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", a + this.scrollbarWidth)
    }, c.prototype.resetScrollbar = function() {
        this.$body.css("padding-right", this.originalBodyPad)
    }, c.prototype.measureScrollbar = function() {
        var a = document.createElement("div");
        a.className = "modal-scrollbar-measure", this.$body.append(a);
        var b = a.offsetWidth - a.clientWidth;
        return this.$body[0].removeChild(a), b
    };
    var d = a.fn.modal;
    a.fn.modal = b, a.fn.modal.Constructor = c, a.fn.modal.noConflict = function() {
        return a.fn.modal = d, this
    }, a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(c) {
        var d = a(this),
            e = d.attr("href"),
            f = a(d.attr("data-target") || e && e.replace(/.*(?=#[^\s]+$)/, "")),
            g = f.data("bs.modal") ? "toggle" : a.extend({
                remote: !/#/.test(e) && e
            }, f.data(), d.data());
        d.is("a") && c.preventDefault(), f.one("show.bs.modal", function(a) {
            a.isDefaultPrevented() || f.one("hidden.bs.modal", function() {
                d.is(":visible") && d.trigger("focus")
            })
        }), b.call(f, g, this)
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.tooltip"),
                f = "object" == typeof b && b;
            (e || !/destroy|hide/.test(b)) && (e || d.data("bs.tooltip", e = new c(this, f)), "string" == typeof b && e[b]())
        })
    }
    var c = function(a, b) {
        this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.init("tooltip", a, b)
    };
    c.VERSION = "3.3.4", c.TRANSITION_DURATION = 150, c.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    }, c.prototype.init = function(b, c, d) {
        if (this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d), this.$viewport = this.options.viewport && a(this.options.viewport.selector || this.options.viewport), this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (var e = this.options.trigger.split(" "), f = e.length; f--;) {
            var g = e[f];
            if ("click" == g) this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this));
            else if ("manual" != g) {
                var h = "hover" == g ? "mouseenter" : "focusin",
                    i = "hover" == g ? "mouseleave" : "focusout";
                this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = a.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, c.prototype.getDefaults = function() {
        return c.DEFAULTS
    }, c.prototype.getOptions = function(b) {
        return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = {
            show: b.delay,
            hide: b.delay
        }), b
    }, c.prototype.getDelegateOptions = function() {
        var b = {},
            c = this.getDefaults();
        return this._options && a.each(this._options, function(a, d) {
            c[a] != d && (b[a] = d)
        }), b
    }, c.prototype.enter = function(b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
        return c && c.$tip && c.$tip.is(":visible") ? void(c.hoverState = "in") : (c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), clearTimeout(c.timeout), c.hoverState = "in", c.options.delay && c.options.delay.show ? void(c.timeout = setTimeout(function() {
            "in" == c.hoverState && c.show()
        }, c.options.delay.show)) : c.show())
    }, c.prototype.leave = function(b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
        return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), clearTimeout(c.timeout), c.hoverState = "out", c.options.delay && c.options.delay.hide ? void(c.timeout = setTimeout(function() {
            "out" == c.hoverState && c.hide()
        }, c.options.delay.hide)) : c.hide()
    }, c.prototype.show = function() {
        var b = a.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(b);
            var d = a.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (b.isDefaultPrevented() || !d) return;
            var e = this,
                f = this.tip(),
                g = this.getUID(this.type);
            this.setContent(), f.attr("id", g), this.$element.attr("aria-describedby", g), this.options.animation && f.addClass("fade");
            var h = "function" == typeof this.options.placement ? this.options.placement.call(this, f[0], this.$element[0]) : this.options.placement,
                i = /\s?auto?\s?/i,
                j = i.test(h);
            j && (h = h.replace(i, "") || "top"), f.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(h).data("bs." + this.type, this), this.options.container ? f.appendTo(this.options.container) : f.insertAfter(this.$element);
            var k = this.getPosition(),
                l = f[0].offsetWidth,
                m = f[0].offsetHeight;
            if (j) {
                var n = h,
                    o = this.options.container ? a(this.options.container) : this.$element.parent(),
                    p = this.getPosition(o);
                h = "bottom" == h && k.bottom + m > p.bottom ? "top" : "top" == h && k.top - m < p.top ? "bottom" : "right" == h && k.right + l > p.width ? "left" : "left" == h && k.left - l < p.left ? "right" : h, f.removeClass(n).addClass(h)
            }
            var q = this.getCalculatedOffset(h, k, l, m);
            this.applyPlacement(q, h);
            var r = function() {
                var a = e.hoverState;
                e.$element.trigger("shown.bs." + e.type), e.hoverState = null, "out" == a && e.leave(e)
            };
            a.support.transition && this.$tip.hasClass("fade") ? f.one("bsTransitionEnd", r).emulateTransitionEnd(c.TRANSITION_DURATION) : r()
        }
    }, c.prototype.applyPlacement = function(b, c) {
        var d = this.tip(),
            e = d[0].offsetWidth,
            f = d[0].offsetHeight,
            g = parseInt(d.css("margin-top"), 10),
            h = parseInt(d.css("margin-left"), 10);
        isNaN(g) && (g = 0), isNaN(h) && (h = 0), b.top = b.top + g, b.left = b.left + h, a.offset.setOffset(d[0], a.extend({
            using: function(a) {
                d.css({
                    top: Math.round(a.top),
                    left: Math.round(a.left)
                })
            }
        }, b), 0), d.addClass("in");
        var i = d[0].offsetWidth,
            j = d[0].offsetHeight;
        "top" == c && j != f && (b.top = b.top + f - j);
        var k = this.getViewportAdjustedDelta(c, b, i, j);
        k.left ? b.left += k.left : b.top += k.top;
        var l = /top|bottom/.test(c),
            m = l ? 2 * k.left - e + i : 2 * k.top - f + j,
            n = l ? "offsetWidth" : "offsetHeight";
        d.offset(b), this.replaceArrow(m, d[0][n], l)
    }, c.prototype.replaceArrow = function(a, b, c) {
        this.arrow().css(c ? "left" : "top", 50 * (1 - a / b) + "%").css(c ? "top" : "left", "")
    }, c.prototype.setContent = function() {
        var a = this.tip(),
            b = this.getTitle();
        a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right")
    }, c.prototype.hide = function(b) {
        function d() {
            "in" != e.hoverState && f.detach(), e.$element.removeAttr("aria-describedby").trigger("hidden.bs." + e.type), b && b()
        }
        var e = this,
            f = a(this.$tip),
            g = a.Event("hide.bs." + this.type);
        return this.$element.trigger(g), g.isDefaultPrevented() ? void 0 : (f.removeClass("in"), a.support.transition && f.hasClass("fade") ? f.one("bsTransitionEnd", d).emulateTransitionEnd(c.TRANSITION_DURATION) : d(), this.hoverState = null, this)
    }, c.prototype.fixTitle = function() {
        var a = this.$element;
        (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "")
    }, c.prototype.hasContent = function() {
        return this.getTitle()
    }, c.prototype.getPosition = function(b) {
        b = b || this.$element;
        var c = b[0],
            d = "BODY" == c.tagName,
            e = c.getBoundingClientRect();
        null == e.width && (e = a.extend({}, e, {
            width: e.right - e.left,
            height: e.bottom - e.top
        }));
        var f = d ? {
                top: 0,
                left: 0
            } : b.offset(),
            g = {
                scroll: d ? document.documentElement.scrollTop || document.body.scrollTop : b.scrollTop()
            },
            h = d ? {
                width: a(window).width(),
                height: a(window).height()
            } : null;
        return a.extend({}, e, g, h, f)
    }, c.prototype.getCalculatedOffset = function(a, b, c, d) {
        return "bottom" == a ? {
            top: b.top + b.height,
            left: b.left + b.width / 2 - c / 2
        } : "top" == a ? {
            top: b.top - d,
            left: b.left + b.width / 2 - c / 2
        } : "left" == a ? {
            top: b.top + b.height / 2 - d / 2,
            left: b.left - c
        } : {
            top: b.top + b.height / 2 - d / 2,
            left: b.left + b.width
        }
    }, c.prototype.getViewportAdjustedDelta = function(a, b, c, d) {
        var e = {
            top: 0,
            left: 0
        };
        if (!this.$viewport) return e;
        var f = this.options.viewport && this.options.viewport.padding || 0,
            g = this.getPosition(this.$viewport);
        if (/right|left/.test(a)) {
            var h = b.top - f - g.scroll,
                i = b.top + f - g.scroll + d;
            h < g.top ? e.top = g.top - h : i > g.top + g.height && (e.top = g.top + g.height - i)
        } else {
            var j = b.left - f,
                k = b.left + f + c;
            j < g.left ? e.left = g.left - j : k > g.width && (e.left = g.left + g.width - k)
        }
        return e
    }, c.prototype.getTitle = function() {
        var a, b = this.$element,
            c = this.options;
        return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title)
    }, c.prototype.getUID = function(a) {
        do a += ~~(1e6 * Math.random()); while (document.getElementById(a));
        return a
    }, c.prototype.tip = function() {
        return this.$tip = this.$tip || a(this.options.template)
    }, c.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, c.prototype.enable = function() {
        this.enabled = !0
    }, c.prototype.disable = function() {
        this.enabled = !1
    }, c.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    }, c.prototype.toggle = function(b) {
        var c = this;
        b && (c = a(b.currentTarget).data("bs." + this.type), c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c))), c.tip().hasClass("in") ? c.leave(c) : c.enter(c)
    }, c.prototype.destroy = function() {
        var a = this;
        clearTimeout(this.timeout), this.hide(function() {
            a.$element.off("." + a.type).removeData("bs." + a.type)
        })
    };
    var d = a.fn.tooltip;
    a.fn.tooltip = b, a.fn.tooltip.Constructor = c, a.fn.tooltip.noConflict = function() {
        return a.fn.tooltip = d, this
    }
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.popover"),
                f = "object" == typeof b && b;
            (e || !/destroy|hide/.test(b)) && (e || d.data("bs.popover", e = new c(this, f)), "string" == typeof b && e[b]())
        })
    }
    var c = function(a, b) {
        this.init("popover", a, b)
    };
    if (!a.fn.tooltip) throw new Error("Popover requires tooltip.js");
    c.VERSION = "3.3.4", c.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), c.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), c.prototype.constructor = c, c.prototype.getDefaults = function() {
        return c.DEFAULTS
    }, c.prototype.setContent = function() {
        var a = this.tip(),
            b = this.getTitle(),
            c = this.getContent();
        a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof c ? "html" : "append" : "text"](c), a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide()
    }, c.prototype.hasContent = function() {
        return this.getTitle() || this.getContent()
    }, c.prototype.getContent = function() {
        var a = this.$element,
            b = this.options;
        return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content)
    }, c.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    };
    var d = a.fn.popover;
    a.fn.popover = b, a.fn.popover.Constructor = c, a.fn.popover.noConflict = function() {
        return a.fn.popover = d, this
    }
}(jQuery), + function(a) {
    "use strict";

    function b(c, d) {
        this.$body = a(document.body), this.$scrollElement = a(a(c).is(document.body) ? window : c), this.options = a.extend({}, b.DEFAULTS, d), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", a.proxy(this.process, this)), this.refresh(), this.process()
    }

    function c(c) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.scrollspy"),
                f = "object" == typeof c && c;
            e || d.data("bs.scrollspy", e = new b(this, f)), "string" == typeof c && e[c]()
        })
    }
    b.VERSION = "3.3.4", b.DEFAULTS = {
        offset: 10
    }, b.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    }, b.prototype.refresh = function() {
        var b = this,
            c = "offset",
            d = 0;
        this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), a.isWindow(this.$scrollElement[0]) || (c = "position", d = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function() {
            var b = a(this),
                e = b.data("target") || b.attr("href"),
                f = /^#./.test(e) && a(e);
            return f && f.length && f.is(":visible") && [
                [f[c]().top + d, e]
            ] || null
        }).sort(function(a, b) {
            return a[0] - b[0]
        }).each(function() {
            b.offsets.push(this[0]), b.targets.push(this[1])
        })
    }, b.prototype.process = function() {
        var a, b = this.$scrollElement.scrollTop() + this.options.offset,
            c = this.getScrollHeight(),
            d = this.options.offset + c - this.$scrollElement.height(),
            e = this.offsets,
            f = this.targets,
            g = this.activeTarget;
        if (this.scrollHeight != c && this.refresh(), b >= d) return g != (a = f[f.length - 1]) && this.activate(a);
        if (g && b < e[0]) return this.activeTarget = null, this.clear();
        for (a = e.length; a--;) g != f[a] && b >= e[a] && (void 0 === e[a + 1] || b < e[a + 1]) && this.activate(f[a])
    }, b.prototype.activate = function(b) {
        this.activeTarget = b, this.clear();
        var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]',
            d = a(c).parents("li").addClass("active");
        d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")), d.trigger("activate.bs.scrollspy")
    }, b.prototype.clear = function() {
        a(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
    };
    var d = a.fn.scrollspy;
    a.fn.scrollspy = c, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function() {
        return a.fn.scrollspy = d, this
    }, a(window).on("load.bs.scrollspy.data-api", function() {
        a('[data-spy="scroll"]').each(function() {
            var b = a(this);
            c.call(b, b.data())
        })
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.tab");
            e || d.data("bs.tab", e = new c(this)), "string" == typeof b && e[b]()
        })
    }
    var c = function(b) {
        this.element = a(b)
    };
    c.VERSION = "3.3.4", c.TRANSITION_DURATION = 150, c.prototype.show = function() {
        var b = this.element,
            c = b.closest("ul:not(.dropdown-menu)"),
            d = b.data("target");
        if (d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) {
            var e = c.find(".active:last a"),
                f = a.Event("hide.bs.tab", {
                    relatedTarget: b[0]
                }),
                g = a.Event("show.bs.tab", {
                    relatedTarget: e[0]
                });
            if (e.trigger(f), b.trigger(g), !g.isDefaultPrevented() && !f.isDefaultPrevented()) {
                var h = a(d);
                this.activate(b.closest("li"), c), this.activate(h, h.parent(), function() {
                    e.trigger({
                        type: "hidden.bs.tab",
                        relatedTarget: b[0]
                    }), b.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: e[0]
                    })
                })
            }
        }
    }, c.prototype.activate = function(b, d, e) {
        function f() {
            g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), h ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu").length && b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), e && e()
        }
        var g = d.find("> .active"),
            h = e && a.support.transition && (g.length && g.hasClass("fade") || !!d.find("> .fade").length);
        g.length && h ? g.one("bsTransitionEnd", f).emulateTransitionEnd(c.TRANSITION_DURATION) : f(), g.removeClass("in")
    };
    var d = a.fn.tab;
    a.fn.tab = b, a.fn.tab.Constructor = c, a.fn.tab.noConflict = function() {
        return a.fn.tab = d, this
    };
    var e = function(c) {
        c.preventDefault(), b.call(a(this), "show")
    };
    a(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', e).on("click.bs.tab.data-api", '[data-toggle="pill"]', e)
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.affix"),
                f = "object" == typeof b && b;
            e || d.data("bs.affix", e = new c(this, f)), "string" == typeof b && e[b]()
        })
    }
    var c = function(b, d) {
        this.options = a.extend({}, c.DEFAULTS, d), this.$target = a(this.options.target).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)), this.$element = a(b), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition()
    };
    c.VERSION = "3.3.4", c.RESET = "affix affix-top affix-bottom", c.DEFAULTS = {
        offset: 0,
        target: window
    }, c.prototype.getState = function(a, b, c, d) {
        var e = this.$target.scrollTop(),
            f = this.$element.offset(),
            g = this.$target.height();
        if (null != c && "top" == this.affixed) return c > e ? "top" : !1;
        if ("bottom" == this.affixed) return null != c ? e + this.unpin <= f.top ? !1 : "bottom" : a - d >= e + g ? !1 : "bottom";
        var h = null == this.affixed,
            i = h ? e : f.top,
            j = h ? g : b;
        return null != c && c >= e ? "top" : null != d && i + j >= a - d ? "bottom" : !1
    }, c.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(c.RESET).addClass("affix");
        var a = this.$target.scrollTop(),
            b = this.$element.offset();
        return this.pinnedOffset = b.top - a
    }, c.prototype.checkPositionWithEventLoop = function() {
        setTimeout(a.proxy(this.checkPosition, this), 1)
    }, c.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var b = this.$element.height(),
                d = this.options.offset,
                e = d.top,
                f = d.bottom,
                g = a(document.body).height();
            "object" != typeof d && (f = e = d), "function" == typeof e && (e = d.top(this.$element)), "function" == typeof f && (f = d.bottom(this.$element));
            var h = this.getState(g, b, e, f);
            if (this.affixed != h) {
                null != this.unpin && this.$element.css("top", "");
                var i = "affix" + (h ? "-" + h : ""),
                    j = a.Event(i + ".bs.affix");
                if (this.$element.trigger(j), j.isDefaultPrevented()) return;
                this.affixed = h, this.unpin = "bottom" == h ? this.getPinnedOffset() : null, this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix", "affixed") + ".bs.affix")
            }
            "bottom" == h && this.$element.offset({
                top: g - b - f
            })
        }
    };
    var d = a.fn.affix;
    a.fn.affix = b, a.fn.affix.Constructor = c, a.fn.affix.noConflict = function() {
        return a.fn.affix = d, this
    }, a(window).on("load", function() {
        a('[data-spy="affix"]').each(function() {
            var c = a(this),
                d = c.data();
            d.offset = d.offset || {}, null != d.offsetBottom && (d.offset.bottom = d.offsetBottom), null != d.offsetTop && (d.offset.top = d.offsetTop), b.call(c, d)
        })
    })
}(jQuery),
function(a, b) {
    a(function() {
        "use strict";

        function a(a, b) {
            return null != a && null != b && a.toLowerCase() === b.toLowerCase()
        }

        function c(a, b) {
            var c, d, e = a.length;
            if (!e || !b) return !1;
            for (c = b.toLowerCase(), d = 0; e > d; ++d)
                if (c === a[d].toLowerCase()) return !0;
            return !1
        }

        function d(a) {
            for (var b in a) h.call(a, b) && (a[b] = new RegExp(a[b], "i"))
        }

        function e(a, b) {
            this.ua = a || "", this._cache = {}, this.maxPhoneWidth = b || 600
        }
        var f = {};
        f.mobileDetectRules = {
            phones: {
                iPhone: "\\biPhone\\b|\\biPod\\b",
                BlackBerry: "BlackBerry|\\bBB10\\b|rim[0-9]+",
                HTC: "HTC|HTC.*(Sensation|Evo|Vision|Explorer|6800|8100|8900|A7272|S510e|C110e|Legend|Desire|T8282)|APX515CKT|Qtek9090|APA9292KT|HD_mini|Sensation.*Z710e|PG86100|Z715e|Desire.*(A8181|HD)|ADR6200|ADR6400L|ADR6425|001HT|Inspire 4G|Android.*\\bEVO\\b|T-Mobile G1|Z520m",
                Nexus: "Nexus One|Nexus S|Galaxy.*Nexus|Android.*Nexus.*Mobile|Nexus 4|Nexus 5|Nexus 6",
                Dell: "Dell.*Streak|Dell.*Aero|Dell.*Venue|DELL.*Venue Pro|Dell Flash|Dell Smoke|Dell Mini 3iX|XCD28|XCD35|\\b001DL\\b|\\b101DL\\b|\\bGS01\\b",
                Motorola: "Motorola|DROIDX|DROID BIONIC|\\bDroid\\b.*Build|Android.*Xoom|HRI39|MOT-|A1260|A1680|A555|A853|A855|A953|A955|A956|Motorola.*ELECTRIFY|Motorola.*i1|i867|i940|MB200|MB300|MB501|MB502|MB508|MB511|MB520|MB525|MB526|MB611|MB612|MB632|MB810|MB855|MB860|MB861|MB865|MB870|ME501|ME502|ME511|ME525|ME600|ME632|ME722|ME811|ME860|ME863|ME865|MT620|MT710|MT716|MT720|MT810|MT870|MT917|Motorola.*TITANIUM|WX435|WX445|XT300|XT301|XT311|XT316|XT317|XT319|XT320|XT390|XT502|XT530|XT531|XT532|XT535|XT603|XT610|XT611|XT615|XT681|XT701|XT702|XT711|XT720|XT800|XT806|XT860|XT862|XT875|XT882|XT883|XT894|XT901|XT907|XT909|XT910|XT912|XT928|XT926|XT915|XT919|XT925|XT1021|\\bMoto E\\b",
                Samsung: "Samsung|SM-G9250|GT-19300|SGH-I337|BGT-S5230|GT-B2100|GT-B2700|GT-B2710|GT-B3210|GT-B3310|GT-B3410|GT-B3730|GT-B3740|GT-B5510|GT-B5512|GT-B5722|GT-B6520|GT-B7300|GT-B7320|GT-B7330|GT-B7350|GT-B7510|GT-B7722|GT-B7800|GT-C3010|GT-C3011|GT-C3060|GT-C3200|GT-C3212|GT-C3212I|GT-C3262|GT-C3222|GT-C3300|GT-C3300K|GT-C3303|GT-C3303K|GT-C3310|GT-C3322|GT-C3330|GT-C3350|GT-C3500|GT-C3510|GT-C3530|GT-C3630|GT-C3780|GT-C5010|GT-C5212|GT-C6620|GT-C6625|GT-C6712|GT-E1050|GT-E1070|GT-E1075|GT-E1080|GT-E1081|GT-E1085|GT-E1087|GT-E1100|GT-E1107|GT-E1110|GT-E1120|GT-E1125|GT-E1130|GT-E1160|GT-E1170|GT-E1175|GT-E1180|GT-E1182|GT-E1200|GT-E1210|GT-E1225|GT-E1230|GT-E1390|GT-E2100|GT-E2120|GT-E2121|GT-E2152|GT-E2220|GT-E2222|GT-E2230|GT-E2232|GT-E2250|GT-E2370|GT-E2550|GT-E2652|GT-E3210|GT-E3213|GT-I5500|GT-I5503|GT-I5700|GT-I5800|GT-I5801|GT-I6410|GT-I6420|GT-I7110|GT-I7410|GT-I7500|GT-I8000|GT-I8150|GT-I8160|GT-I8190|GT-I8320|GT-I8330|GT-I8350|GT-I8530|GT-I8700|GT-I8703|GT-I8910|GT-I9000|GT-I9001|GT-I9003|GT-I9010|GT-I9020|GT-I9023|GT-I9070|GT-I9082|GT-I9100|GT-I9103|GT-I9220|GT-I9250|GT-I9300|GT-I9305|GT-I9500|GT-I9505|GT-M3510|GT-M5650|GT-M7500|GT-M7600|GT-M7603|GT-M8800|GT-M8910|GT-N7000|GT-S3110|GT-S3310|GT-S3350|GT-S3353|GT-S3370|GT-S3650|GT-S3653|GT-S3770|GT-S3850|GT-S5210|GT-S5220|GT-S5229|GT-S5230|GT-S5233|GT-S5250|GT-S5253|GT-S5260|GT-S5263|GT-S5270|GT-S5300|GT-S5330|GT-S5350|GT-S5360|GT-S5363|GT-S5369|GT-S5380|GT-S5380D|GT-S5560|GT-S5570|GT-S5600|GT-S5603|GT-S5610|GT-S5620|GT-S5660|GT-S5670|GT-S5690|GT-S5750|GT-S5780|GT-S5830|GT-S5839|GT-S6102|GT-S6500|GT-S7070|GT-S7200|GT-S7220|GT-S7230|GT-S7233|GT-S7250|GT-S7500|GT-S7530|GT-S7550|GT-S7562|GT-S7710|GT-S8000|GT-S8003|GT-S8500|GT-S8530|GT-S8600|SCH-A310|SCH-A530|SCH-A570|SCH-A610|SCH-A630|SCH-A650|SCH-A790|SCH-A795|SCH-A850|SCH-A870|SCH-A890|SCH-A930|SCH-A950|SCH-A970|SCH-A990|SCH-I100|SCH-I110|SCH-I400|SCH-I405|SCH-I500|SCH-I510|SCH-I515|SCH-I600|SCH-I730|SCH-I760|SCH-I770|SCH-I830|SCH-I910|SCH-I920|SCH-I959|SCH-LC11|SCH-N150|SCH-N300|SCH-R100|SCH-R300|SCH-R351|SCH-R400|SCH-R410|SCH-T300|SCH-U310|SCH-U320|SCH-U350|SCH-U360|SCH-U365|SCH-U370|SCH-U380|SCH-U410|SCH-U430|SCH-U450|SCH-U460|SCH-U470|SCH-U490|SCH-U540|SCH-U550|SCH-U620|SCH-U640|SCH-U650|SCH-U660|SCH-U700|SCH-U740|SCH-U750|SCH-U810|SCH-U820|SCH-U900|SCH-U940|SCH-U960|SCS-26UC|SGH-A107|SGH-A117|SGH-A127|SGH-A137|SGH-A157|SGH-A167|SGH-A177|SGH-A187|SGH-A197|SGH-A227|SGH-A237|SGH-A257|SGH-A437|SGH-A517|SGH-A597|SGH-A637|SGH-A657|SGH-A667|SGH-A687|SGH-A697|SGH-A707|SGH-A717|SGH-A727|SGH-A737|SGH-A747|SGH-A767|SGH-A777|SGH-A797|SGH-A817|SGH-A827|SGH-A837|SGH-A847|SGH-A867|SGH-A877|SGH-A887|SGH-A897|SGH-A927|SGH-B100|SGH-B130|SGH-B200|SGH-B220|SGH-C100|SGH-C110|SGH-C120|SGH-C130|SGH-C140|SGH-C160|SGH-C170|SGH-C180|SGH-C200|SGH-C207|SGH-C210|SGH-C225|SGH-C230|SGH-C417|SGH-C450|SGH-D307|SGH-D347|SGH-D357|SGH-D407|SGH-D415|SGH-D780|SGH-D807|SGH-D980|SGH-E105|SGH-E200|SGH-E315|SGH-E316|SGH-E317|SGH-E335|SGH-E590|SGH-E635|SGH-E715|SGH-E890|SGH-F300|SGH-F480|SGH-I200|SGH-I300|SGH-I320|SGH-I550|SGH-I577|SGH-I600|SGH-I607|SGH-I617|SGH-I627|SGH-I637|SGH-I677|SGH-I700|SGH-I717|SGH-I727|SGH-i747M|SGH-I777|SGH-I780|SGH-I827|SGH-I847|SGH-I857|SGH-I896|SGH-I897|SGH-I900|SGH-I907|SGH-I917|SGH-I927|SGH-I937|SGH-I997|SGH-J150|SGH-J200|SGH-L170|SGH-L700|SGH-M110|SGH-M150|SGH-M200|SGH-N105|SGH-N500|SGH-N600|SGH-N620|SGH-N625|SGH-N700|SGH-N710|SGH-P107|SGH-P207|SGH-P300|SGH-P310|SGH-P520|SGH-P735|SGH-P777|SGH-Q105|SGH-R210|SGH-R220|SGH-R225|SGH-S105|SGH-S307|SGH-T109|SGH-T119|SGH-T139|SGH-T209|SGH-T219|SGH-T229|SGH-T239|SGH-T249|SGH-T259|SGH-T309|SGH-T319|SGH-T329|SGH-T339|SGH-T349|SGH-T359|SGH-T369|SGH-T379|SGH-T409|SGH-T429|SGH-T439|SGH-T459|SGH-T469|SGH-T479|SGH-T499|SGH-T509|SGH-T519|SGH-T539|SGH-T559|SGH-T589|SGH-T609|SGH-T619|SGH-T629|SGH-T639|SGH-T659|SGH-T669|SGH-T679|SGH-T709|SGH-T719|SGH-T729|SGH-T739|SGH-T746|SGH-T749|SGH-T759|SGH-T769|SGH-T809|SGH-T819|SGH-T839|SGH-T919|SGH-T929|SGH-T939|SGH-T959|SGH-T989|SGH-U100|SGH-U200|SGH-U800|SGH-V205|SGH-V206|SGH-X100|SGH-X105|SGH-X120|SGH-X140|SGH-X426|SGH-X427|SGH-X475|SGH-X495|SGH-X497|SGH-X507|SGH-X600|SGH-X610|SGH-X620|SGH-X630|SGH-X700|SGH-X820|SGH-X890|SGH-Z130|SGH-Z150|SGH-Z170|SGH-ZX10|SGH-ZX20|SHW-M110|SPH-A120|SPH-A400|SPH-A420|SPH-A460|SPH-A500|SPH-A560|SPH-A600|SPH-A620|SPH-A660|SPH-A700|SPH-A740|SPH-A760|SPH-A790|SPH-A800|SPH-A820|SPH-A840|SPH-A880|SPH-A900|SPH-A940|SPH-A960|SPH-D600|SPH-D700|SPH-D710|SPH-D720|SPH-I300|SPH-I325|SPH-I330|SPH-I350|SPH-I500|SPH-I600|SPH-I700|SPH-L700|SPH-M100|SPH-M220|SPH-M240|SPH-M300|SPH-M305|SPH-M320|SPH-M330|SPH-M350|SPH-M360|SPH-M370|SPH-M380|SPH-M510|SPH-M540|SPH-M550|SPH-M560|SPH-M570|SPH-M580|SPH-M610|SPH-M620|SPH-M630|SPH-M800|SPH-M810|SPH-M850|SPH-M900|SPH-M910|SPH-M920|SPH-M930|SPH-N100|SPH-N200|SPH-N240|SPH-N300|SPH-N400|SPH-Z400|SWC-E100|SCH-i909|GT-N7100|GT-N7105|SCH-I535|SM-N900A|SGH-I317|SGH-T999L|GT-S5360B|GT-I8262|GT-S6802|GT-S6312|GT-S6310|GT-S5312|GT-S5310|GT-I9105|GT-I8510|GT-S6790N|SM-G7105|SM-N9005|GT-S5301|GT-I9295|GT-I9195|SM-C101|GT-S7392|GT-S7560|GT-B7610|GT-I5510|GT-S7582|GT-S7530E|GT-I8750|SM-G9006V|SM-G9008V|SM-G9009D|SM-G900A|SM-G900D|SM-G900F|SM-G900H|SM-G900I|SM-G900J|SM-G900K|SM-G900L|SM-G900M|SM-G900P|SM-G900R4|SM-G900S|SM-G900T|SM-G900V|SM-G900W8|SHV-E160K|SCH-P709|SCH-P729|SM-T2558|GT-I9205",
                LG: "\\bLG\\b;|LG[- ]?(C800|C900|E400|E610|E900|E-900|F160|F180K|F180L|F180S|730|855|L160|LS740|LS840|LS970|LU6200|MS690|MS695|MS770|MS840|MS870|MS910|P500|P700|P705|VM696|AS680|AS695|AX840|C729|E970|GS505|272|C395|E739BK|E960|L55C|L75C|LS696|LS860|P769BK|P350|P500|P509|P870|UN272|US730|VS840|VS950|LN272|LN510|LS670|LS855|LW690|MN270|MN510|P509|P769|P930|UN200|UN270|UN510|UN610|US670|US740|US760|UX265|UX840|VN271|VN530|VS660|VS700|VS740|VS750|VS910|VS920|VS930|VX9200|VX11000|AX840A|LW770|P506|P925|P999|E612|D955|D802|MS323)",
                Sony: "SonyST|SonyLT|SonyEricsson|SonyEricssonLT15iv|LT18i|E10i|LT28h|LT26w|SonyEricssonMT27i|C5303|C6902|C6903|C6906|C6943|D2533",
                Asus: "Asus.*Galaxy|PadFone.*Mobile",
                Micromax: "Micromax.*\\b(A210|A92|A88|A72|A111|A110Q|A115|A116|A110|A90S|A26|A51|A35|A54|A25|A27|A89|A68|A65|A57|A90)\\b",
                Palm: "PalmSource|Palm",
                Vertu: "Vertu|Vertu.*Ltd|Vertu.*Ascent|Vertu.*Ayxta|Vertu.*Constellation(F|Quest)?|Vertu.*Monika|Vertu.*Signature",
                Pantech: "PANTECH|IM-A850S|IM-A840S|IM-A830L|IM-A830K|IM-A830S|IM-A820L|IM-A810K|IM-A810S|IM-A800S|IM-T100K|IM-A725L|IM-A780L|IM-A775C|IM-A770K|IM-A760S|IM-A750K|IM-A740S|IM-A730S|IM-A720L|IM-A710K|IM-A690L|IM-A690S|IM-A650S|IM-A630K|IM-A600S|VEGA PTL21|PT003|P8010|ADR910L|P6030|P6020|P9070|P4100|P9060|P5000|CDM8992|TXT8045|ADR8995|IS11PT|P2030|P6010|P8000|PT002|IS06|CDM8999|P9050|PT001|TXT8040|P2020|P9020|P2000|P7040|P7000|C790",
                Fly: "IQ230|IQ444|IQ450|IQ440|IQ442|IQ441|IQ245|IQ256|IQ236|IQ255|IQ235|IQ245|IQ275|IQ240|IQ285|IQ280|IQ270|IQ260|IQ250",
                Wiko: "KITE 4G|HIGHWAY|GETAWAY|STAIRWAY|DARKSIDE|DARKFULL|DARKNIGHT|DARKMOON|SLIDE|WAX 4G|RAINBOW|BLOOM|SUNSET|GOA|LENNY|BARRY|IGGY|OZZY|CINK FIVE|CINK PEAX|CINK PEAX 2|CINK SLIM|CINK SLIM 2|CINK +|CINK KING|CINK PEAX|CINK SLIM|SUBLIM",
                iMobile: "i-mobile (IQ|i-STYLE|idea|ZAA|Hitz)",
                SimValley: "\\b(SP-80|XT-930|SX-340|XT-930|SX-310|SP-360|SP60|SPT-800|SP-120|SPT-800|SP-140|SPX-5|SPX-8|SP-100|SPX-8|SPX-12)\\b",
                Wolfgang: "AT-B24D|AT-AS50HD|AT-AS40W|AT-AS55HD|AT-AS45q2|AT-B26D|AT-AS50Q",
                Alcatel: "Alcatel",
                Nintendo: "Nintendo 3DS",
                Amoi: "Amoi",
                INQ: "INQ",
                GenericPhone: "Tapatalk|PDA;|SAGEM|\\bmmp\\b|pocket|\\bpsp\\b|symbian|Smartphone|smartfon|treo|up.browser|up.link|vodafone|\\bwap\\b|nokia|Series40|Series60|S60|SonyEricsson|N900|MAUI.*WAP.*Browser"
            },
            tablets: {
                iPad: "iPad|iPad.*Mobile",
                NexusTablet: "Android.*Nexus[\\s]+(7|9|10)",
                SamsungTablet: "SAMSUNG.*Tablet|Galaxy.*Tab|SC-01C|GT-P1000|GT-P1003|GT-P1010|GT-P3105|GT-P6210|GT-P6800|GT-P6810|GT-P7100|GT-P7300|GT-P7310|GT-P7500|GT-P7510|SCH-I800|SCH-I815|SCH-I905|SGH-I957|SGH-I987|SGH-T849|SGH-T859|SGH-T869|SPH-P100|GT-P3100|GT-P3108|GT-P3110|GT-P5100|GT-P5110|GT-P6200|GT-P7320|GT-P7511|GT-N8000|GT-P8510|SGH-I497|SPH-P500|SGH-T779|SCH-I705|SCH-I915|GT-N8013|GT-P3113|GT-P5113|GT-P8110|GT-N8010|GT-N8005|GT-N8020|GT-P1013|GT-P6201|GT-P7501|GT-N5100|GT-N5105|GT-N5110|SHV-E140K|SHV-E140L|SHV-E140S|SHV-E150S|SHV-E230K|SHV-E230L|SHV-E230S|SHW-M180K|SHW-M180L|SHW-M180S|SHW-M180W|SHW-M300W|SHW-M305W|SHW-M380K|SHW-M380S|SHW-M380W|SHW-M430W|SHW-M480K|SHW-M480S|SHW-M480W|SHW-M485W|SHW-M486W|SHW-M500W|GT-I9228|SCH-P739|SCH-I925|GT-I9200|GT-P5200|GT-P5210|GT-P5210X|SM-T311|SM-T310|SM-T310X|SM-T210|SM-T210R|SM-T211|SM-P600|SM-P601|SM-P605|SM-P900|SM-P901|SM-T217|SM-T217A|SM-T217S|SM-P6000|SM-T3100|SGH-I467|XE500|SM-T110|GT-P5220|GT-I9200X|GT-N5110X|GT-N5120|SM-P905|SM-T111|SM-T2105|SM-T315|SM-T320|SM-T320X|SM-T321|SM-T520|SM-T525|SM-T530NU|SM-T230NU|SM-T330NU|SM-T900|XE500T1C|SM-P605V|SM-P905V|SM-T337V|SM-T537V|SM-T707V|SM-T807V|SM-P600X|SM-P900X|SM-T210X|SM-T230|SM-T230X|SM-T325|GT-P7503|SM-T531|SM-T330|SM-T530|SM-T705|SM-T705C|SM-T535|SM-T331|SM-T800|SM-T700|SM-T537|SM-T807|SM-P907A|SM-T337A|SM-T537A|SM-T707A|SM-T807A|SM-T237|SM-T807P|SM-P607T|SM-T217T|SM-T337T|SM-T807T|SM-T116NQ|SM-P550|SM-T350|SM-T550|SM-T9000|SM-P9000|SM-T705Y|SM-T805|GT-P3113|SM-T710|SM-T810|SM-T360|SM-T533|SM-T113|SM-T335|SM-T715",
                Kindle: "Kindle|Silk.*Accelerated|Android.*\\b(KFOT|KFTT|KFJWI|KFJWA|KFOTE|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|WFJWAE|KFSAWA|KFSAWI|KFASWI)\\b",
                SurfaceTablet: "Windows NT [0-9.]+; ARM;.*(Tablet|ARMBJS)",
                HPTablet: "HP Slate (7|8|10)|HP ElitePad 900|hp-tablet|EliteBook.*Touch|HP 8|Slate 21|HP SlateBook 10",
                AsusTablet: "^.*PadFone((?!Mobile).)*$|Transformer|TF101|TF101G|TF300T|TF300TG|TF300TL|TF700T|TF700KL|TF701T|TF810C|ME171|ME301T|ME302C|ME371MG|ME370T|ME372MG|ME172V|ME173X|ME400C|Slider SL101|\\bK00F\\b|\\bK00C\\b|\\bK00E\\b|\\bK00L\\b|TX201LA|ME176C|ME102A|\\bM80TA\\b|ME372CL|ME560CG|ME372CG|ME302KL| K010 | K017 |ME572C|ME103K|ME170C|ME171C|\\bME70C\\b|ME581C|ME581CL|ME8510C|ME181C",
                BlackBerryTablet: "PlayBook|RIM Tablet",
                HTCtablet: "HTC_Flyer_P512|HTC Flyer|HTC Jetstream|HTC-P715a|HTC EVO View 4G|PG41200|PG09410",
                MotorolaTablet: "xoom|sholest|MZ615|MZ605|MZ505|MZ601|MZ602|MZ603|MZ604|MZ606|MZ607|MZ608|MZ609|MZ615|MZ616|MZ617",
                NookTablet: "Android.*Nook|NookColor|nook browser|BNRV200|BNRV200A|BNTV250|BNTV250A|BNTV400|BNTV600|LogicPD Zoom2",
                AcerTablet: "Android.*; \\b(A100|A101|A110|A200|A210|A211|A500|A501|A510|A511|A700|A701|W500|W500P|W501|W501P|W510|W511|W700|G100|G100W|B1-A71|B1-710|B1-711|A1-810|A1-811|A1-830)\\b|W3-810|\\bA3-A10\\b|\\bA3-A11\\b",
                ToshibaTablet: "Android.*(AT100|AT105|AT200|AT205|AT270|AT275|AT300|AT305|AT1S5|AT500|AT570|AT700|AT830)|TOSHIBA.*FOLIO",
                LGTablet: "\\bL-06C|LG-V909|LG-V900|LG-V700|LG-V510|LG-V500|LG-V410|LG-V400|LG-VK810\\b",
                FujitsuTablet: "Android.*\\b(F-01D|F-02F|F-05E|F-10D|M532|Q572)\\b",
                PrestigioTablet: "PMP3170B|PMP3270B|PMP3470B|PMP7170B|PMP3370B|PMP3570C|PMP5870C|PMP3670B|PMP5570C|PMP5770D|PMP3970B|PMP3870C|PMP5580C|PMP5880D|PMP5780D|PMP5588C|PMP7280C|PMP7280C3G|PMP7280|PMP7880D|PMP5597D|PMP5597|PMP7100D|PER3464|PER3274|PER3574|PER3884|PER5274|PER5474|PMP5097CPRO|PMP5097|PMP7380D|PMP5297C|PMP5297C_QUAD|PMP812E|PMP812E3G|PMP812F|PMP810E|PMP880TD|PMT3017|PMT3037|PMT3047|PMT3057|PMT7008|PMT5887|PMT5001|PMT5002",
                LenovoTablet: "Idea(Tab|Pad)( A1|A10| K1|)|ThinkPad([ ]+)?Tablet|Lenovo.*(S2109|S2110|S5000|S6000|K3011|A3000|A3500|A1000|A2107|A2109|A1107|A5500|A7600|B6000|B8000|B8080)(-|)(FL|F|HV|H|)",
                DellTablet: "Venue 11|Venue 8|Venue 7|Dell Streak 10|Dell Streak 7",
                YarvikTablet: "Android.*\\b(TAB210|TAB211|TAB224|TAB250|TAB260|TAB264|TAB310|TAB360|TAB364|TAB410|TAB411|TAB420|TAB424|TAB450|TAB460|TAB461|TAB464|TAB465|TAB467|TAB468|TAB07-100|TAB07-101|TAB07-150|TAB07-151|TAB07-152|TAB07-200|TAB07-201-3G|TAB07-210|TAB07-211|TAB07-212|TAB07-214|TAB07-220|TAB07-400|TAB07-485|TAB08-150|TAB08-200|TAB08-201-3G|TAB08-201-30|TAB09-100|TAB09-211|TAB09-410|TAB10-150|TAB10-201|TAB10-211|TAB10-400|TAB10-410|TAB13-201|TAB274EUK|TAB275EUK|TAB374EUK|TAB462EUK|TAB474EUK|TAB9-200)\\b",
                MedionTablet: "Android.*\\bOYO\\b|LIFE.*(P9212|P9514|P9516|S9512)|LIFETAB",
                ArnovaTablet: "AN10G2|AN7bG3|AN7fG3|AN8G3|AN8cG3|AN7G3|AN9G3|AN7dG3|AN7dG3ST|AN7dG3ChildPad|AN10bG3|AN10bG3DT|AN9G2",
                IntensoTablet: "INM8002KP|INM1010FP|INM805ND|Intenso Tab|TAB1004",
                IRUTablet: "M702pro",
                MegafonTablet: "MegaFon V9|\\bZTE V9\\b|Android.*\\bMT7A\\b",
                EbodaTablet: "E-Boda (Supreme|Impresspeed|Izzycomm|Essential)",
                AllViewTablet: "Allview.*(Viva|Alldro|City|Speed|All TV|Frenzy|Quasar|Shine|TX1|AX1|AX2)",
                ArchosTablet: "\\b(101G9|80G9|A101IT)\\b|Qilive 97R|Archos5|\\bARCHOS (70|79|80|90|97|101|FAMILYPAD|)(b|)(G10| Cobalt| TITANIUM(HD|)| Xenon| Neon|XSK| 2| XS 2| PLATINUM| CARBON|GAMEPAD)\\b",
                AinolTablet: "NOVO7|NOVO8|NOVO10|Novo7Aurora|Novo7Basic|NOVO7PALADIN|novo9-Spark",
                SonyTablet: "Sony.*Tablet|Xperia Tablet|Sony Tablet S|SO-03E|SGPT12|SGPT13|SGPT114|SGPT121|SGPT122|SGPT123|SGPT111|SGPT112|SGPT113|SGPT131|SGPT132|SGPT133|SGPT211|SGPT212|SGPT213|SGP311|SGP312|SGP321|EBRD1101|EBRD1102|EBRD1201|SGP351|SGP341|SGP511|SGP512|SGP521|SGP541|SGP551|SGP621|SGP612|SOT31",
                PhilipsTablet: "\\b(PI2010|PI3000|PI3100|PI3105|PI3110|PI3205|PI3210|PI3900|PI4010|PI7000|PI7100)\\b",
                CubeTablet: "Android.*(K8GT|U9GT|U10GT|U16GT|U17GT|U18GT|U19GT|U20GT|U23GT|U30GT)|CUBE U8GT",
                CobyTablet: "MID1042|MID1045|MID1125|MID1126|MID7012|MID7014|MID7015|MID7034|MID7035|MID7036|MID7042|MID7048|MID7127|MID8042|MID8048|MID8127|MID9042|MID9740|MID9742|MID7022|MID7010",
                MIDTablet: "M9701|M9000|M9100|M806|M1052|M806|T703|MID701|MID713|MID710|MID727|MID760|MID830|MID728|MID933|MID125|MID810|MID732|MID120|MID930|MID800|MID731|MID900|MID100|MID820|MID735|MID980|MID130|MID833|MID737|MID960|MID135|MID860|MID736|MID140|MID930|MID835|MID733",
                MSITablet: "MSI \\b(Primo 73K|Primo 73L|Primo 81L|Primo 77|Primo 93|Primo 75|Primo 76|Primo 73|Primo 81|Primo 91|Primo 90|Enjoy 71|Enjoy 7|Enjoy 10)\\b",
                SMiTTablet: "Android.*(\\bMID\\b|MID-560|MTV-T1200|MTV-PND531|MTV-P1101|MTV-PND530)",
                RockChipTablet: "Android.*(RK2818|RK2808A|RK2918|RK3066)|RK2738|RK2808A",
                FlyTablet: "IQ310|Fly Vision",
                bqTablet: "Android.*(bq)?.*(Elcano|Curie|Edison|Maxwell|Kepler|Pascal|Tesla|Hypatia|Platon|Newton|Livingstone|Cervantes|Avant|Aquaris E10)|Maxwell.*Lite|Maxwell.*Plus",
                HuaweiTablet: "MediaPad|MediaPad 7 Youth|IDEOS S7|S7-201c|S7-202u|S7-101|S7-103|S7-104|S7-105|S7-106|S7-201|S7-Slim",
                NecTablet: "\\bN-06D|\\bN-08D",
                PantechTablet: "Pantech.*P4100",
                BronchoTablet: "Broncho.*(N701|N708|N802|a710)",
                VersusTablet: "TOUCHPAD.*[78910]|\\bTOUCHTAB\\b",
                ZyncTablet: "z1000|Z99 2G|z99|z930|z999|z990|z909|Z919|z900",
                PositivoTablet: "TB07STA|TB10STA|TB07FTA|TB10FTA",
                NabiTablet: "Android.*\\bNabi",
                KoboTablet: "Kobo Touch|\\bK080\\b|\\bVox\\b Build|\\bArc\\b Build",
                DanewTablet: "DSlide.*\\b(700|701R|702|703R|704|802|970|971|972|973|974|1010|1012)\\b",
                TexetTablet: "NaviPad|TB-772A|TM-7045|TM-7055|TM-9750|TM-7016|TM-7024|TM-7026|TM-7041|TM-7043|TM-7047|TM-8041|TM-9741|TM-9747|TM-9748|TM-9751|TM-7022|TM-7021|TM-7020|TM-7011|TM-7010|TM-7023|TM-7025|TM-7037W|TM-7038W|TM-7027W|TM-9720|TM-9725|TM-9737W|TM-1020|TM-9738W|TM-9740|TM-9743W|TB-807A|TB-771A|TB-727A|TB-725A|TB-719A|TB-823A|TB-805A|TB-723A|TB-715A|TB-707A|TB-705A|TB-709A|TB-711A|TB-890HD|TB-880HD|TB-790HD|TB-780HD|TB-770HD|TB-721HD|TB-710HD|TB-434HD|TB-860HD|TB-840HD|TB-760HD|TB-750HD|TB-740HD|TB-730HD|TB-722HD|TB-720HD|TB-700HD|TB-500HD|TB-470HD|TB-431HD|TB-430HD|TB-506|TB-504|TB-446|TB-436|TB-416|TB-146SE|TB-126SE",
                PlaystationTablet: "Playstation.*(Portable|Vita)",
                TrekstorTablet: "ST10416-1|VT10416-1|ST70408-1|ST702xx-1|ST702xx-2|ST80208|ST97216|ST70104-2|VT10416-2|ST10216-2A|SurfTab",
                PyleAudioTablet: "\\b(PTBL10CEU|PTBL10C|PTBL72BC|PTBL72BCEU|PTBL7CEU|PTBL7C|PTBL92BC|PTBL92BCEU|PTBL9CEU|PTBL9CUK|PTBL9C)\\b",
                AdvanTablet: "Android.* \\b(E3A|T3X|T5C|T5B|T3E|T3C|T3B|T1J|T1F|T2A|T1H|T1i|E1C|T1-E|T5-A|T4|E1-B|T2Ci|T1-B|T1-D|O1-A|E1-A|T1-A|T3A|T4i)\\b ",
                DanyTechTablet: "Genius Tab G3|Genius Tab S2|Genius Tab Q3|Genius Tab G4|Genius Tab Q4|Genius Tab G-II|Genius TAB GII|Genius TAB GIII|Genius Tab S1",
                GalapadTablet: "Android.*\\bG1\\b",
                MicromaxTablet: "Funbook|Micromax.*\\b(P250|P560|P360|P362|P600|P300|P350|P500|P275)\\b",
                KarbonnTablet: "Android.*\\b(A39|A37|A34|ST8|ST10|ST7|Smart Tab3|Smart Tab2)\\b",
                AllFineTablet: "Fine7 Genius|Fine7 Shine|Fine7 Air|Fine8 Style|Fine9 More|Fine10 Joy|Fine11 Wide",
                PROSCANTablet: "\\b(PEM63|PLT1023G|PLT1041|PLT1044|PLT1044G|PLT1091|PLT4311|PLT4311PL|PLT4315|PLT7030|PLT7033|PLT7033D|PLT7035|PLT7035D|PLT7044K|PLT7045K|PLT7045KB|PLT7071KG|PLT7072|PLT7223G|PLT7225G|PLT7777G|PLT7810K|PLT7849G|PLT7851G|PLT7852G|PLT8015|PLT8031|PLT8034|PLT8036|PLT8080K|PLT8082|PLT8088|PLT8223G|PLT8234G|PLT8235G|PLT8816K|PLT9011|PLT9045K|PLT9233G|PLT9735|PLT9760G|PLT9770G)\\b",
                YONESTablet: "BQ1078|BC1003|BC1077|RK9702|BC9730|BC9001|IT9001|BC7008|BC7010|BC708|BC728|BC7012|BC7030|BC7027|BC7026",
                ChangJiaTablet: "TPC7102|TPC7103|TPC7105|TPC7106|TPC7107|TPC7201|TPC7203|TPC7205|TPC7210|TPC7708|TPC7709|TPC7712|TPC7110|TPC8101|TPC8103|TPC8105|TPC8106|TPC8203|TPC8205|TPC8503|TPC9106|TPC9701|TPC97101|TPC97103|TPC97105|TPC97106|TPC97111|TPC97113|TPC97203|TPC97603|TPC97809|TPC97205|TPC10101|TPC10103|TPC10106|TPC10111|TPC10203|TPC10205|TPC10503",
                GUTablet: "TX-A1301|TX-M9002|Q702|kf026",
                PointOfViewTablet: "TAB-P506|TAB-navi-7-3G-M|TAB-P517|TAB-P-527|TAB-P701|TAB-P703|TAB-P721|TAB-P731N|TAB-P741|TAB-P825|TAB-P905|TAB-P925|TAB-PR945|TAB-PL1015|TAB-P1025|TAB-PI1045|TAB-P1325|TAB-PROTAB[0-9]+|TAB-PROTAB25|TAB-PROTAB26|TAB-PROTAB27|TAB-PROTAB26XL|TAB-PROTAB2-IPS9|TAB-PROTAB30-IPS9|TAB-PROTAB25XXL|TAB-PROTAB26-IPS10|TAB-PROTAB30-IPS10",
                OvermaxTablet: "OV-(SteelCore|NewBase|Basecore|Baseone|Exellen|Quattor|EduTab|Solution|ACTION|BasicTab|TeddyTab|MagicTab|Stream|TB-08|TB-09)",
                HCLTablet: "HCL.*Tablet|Connect-3G-2.0|Connect-2G-2.0|ME Tablet U1|ME Tablet U2|ME Tablet G1|ME Tablet X1|ME Tablet Y2|ME Tablet Sync",
                DPSTablet: "DPS Dream 9|DPS Dual 7",
                VistureTablet: "V97 HD|i75 3G|Visture V4( HD)?|Visture V5( HD)?|Visture V10",
                CrestaTablet: "CTP(-)?810|CTP(-)?818|CTP(-)?828|CTP(-)?838|CTP(-)?888|CTP(-)?978|CTP(-)?980|CTP(-)?987|CTP(-)?988|CTP(-)?989",
                MediatekTablet: "\\bMT8125|MT8389|MT8135|MT8377\\b",
                ConcordeTablet: "Concorde([ ]+)?Tab|ConCorde ReadMan",
                GoCleverTablet: "GOCLEVER TAB|A7GOCLEVER|M1042|M7841|M742|R1042BK|R1041|TAB A975|TAB A7842|TAB A741|TAB A741L|TAB M723G|TAB M721|TAB A1021|TAB I921|TAB R721|TAB I720|TAB T76|TAB R70|TAB R76.2|TAB R106|TAB R83.2|TAB M813G|TAB I721|GCTA722|TAB I70|TAB I71|TAB S73|TAB R73|TAB R74|TAB R93|TAB R75|TAB R76.1|TAB A73|TAB A93|TAB A93.2|TAB T72|TAB R83|TAB R974|TAB R973|TAB A101|TAB A103|TAB A104|TAB A104.2|R105BK|M713G|A972BK|TAB A971|TAB R974.2|TAB R104|TAB R83.3|TAB A1042",
                ModecomTablet: "FreeTAB 9000|FreeTAB 7.4|FreeTAB 7004|FreeTAB 7800|FreeTAB 2096|FreeTAB 7.5|FreeTAB 1014|FreeTAB 1001 |FreeTAB 8001|FreeTAB 9706|FreeTAB 9702|FreeTAB 7003|FreeTAB 7002|FreeTAB 1002|FreeTAB 7801|FreeTAB 1331|FreeTAB 1004|FreeTAB 8002|FreeTAB 8014|FreeTAB 9704|FreeTAB 1003",
                VoninoTablet: "\\b(Argus[ _]?S|Diamond[ _]?79HD|Emerald[ _]?78E|Luna[ _]?70C|Onyx[ _]?S|Onyx[ _]?Z|Orin[ _]?HD|Orin[ _]?S|Otis[ _]?S|SpeedStar[ _]?S|Magnet[ _]?M9|Primus[ _]?94[ _]?3G|Primus[ _]?94HD|Primus[ _]?QS|Android.*\\bQ8\\b|Sirius[ _]?EVO[ _]?QS|Sirius[ _]?QS|Spirit[ _]?S)\\b",
                ECSTablet: "V07OT2|TM105A|S10OT1|TR10CS1",
                StorexTablet: "eZee[_']?(Tab|Go)[0-9]+|TabLC7|Looney Tunes Tab",
                VodafoneTablet: "SmartTab([ ]+)?[0-9]+|SmartTabII10|SmartTabII7",
                EssentielBTablet: "Smart[ ']?TAB[ ]+?[0-9]+|Family[ ']?TAB2",
                RossMoorTablet: "RM-790|RM-997|RMD-878G|RMD-974R|RMT-705A|RMT-701|RME-601|RMT-501|RMT-711",
                iMobileTablet: "i-mobile i-note",
                TolinoTablet: "tolino tab [0-9.]+|tolino shine",
                AudioSonicTablet: "\\bC-22Q|T7-QC|T-17B|T-17P\\b",
                AMPETablet: "Android.* A78 ",
                SkkTablet: "Android.* (SKYPAD|PHOENIX|CYCLOPS)",
                TecnoTablet: "TECNO P9",
                JXDTablet: "Android.*\\b(F3000|A3300|JXD5000|JXD3000|JXD2000|JXD300B|JXD300|S5800|S7800|S602b|S5110b|S7300|S5300|S602|S603|S5100|S5110|S601|S7100a|P3000F|P3000s|P101|P200s|P1000m|P200m|P9100|P1000s|S6600b|S908|P1000|P300|S18|S6600|S9100)\\b",
                iJoyTablet: "Tablet (Spirit 7|Essentia|Galatea|Fusion|Onix 7|Landa|Titan|Scooby|Deox|Stella|Themis|Argon|Unique 7|Sygnus|Hexen|Finity 7|Cream|Cream X2|Jade|Neon 7|Neron 7|Kandy|Scape|Saphyr 7|Rebel|Biox|Rebel|Rebel 8GB|Myst|Draco 7|Myst|Tab7-004|Myst|Tadeo Jones|Tablet Boing|Arrow|Draco Dual Cam|Aurix|Mint|Amity|Revolution|Finity 9|Neon 9|T9w|Amity 4GB Dual Cam|Stone 4GB|Stone 8GB|Andromeda|Silken|X2|Andromeda II|Halley|Flame|Saphyr 9,7|Touch 8|Planet|Triton|Unique 10|Hexen 10|Memphis 4GB|Memphis 8GB|Onix 10)",
                FX2Tablet: "FX2 PAD7|FX2 PAD10",
                XoroTablet: "KidsPAD 701|PAD[ ]?712|PAD[ ]?714|PAD[ ]?716|PAD[ ]?717|PAD[ ]?718|PAD[ ]?720|PAD[ ]?721|PAD[ ]?722|PAD[ ]?790|PAD[ ]?792|PAD[ ]?900|PAD[ ]?9715D|PAD[ ]?9716DR|PAD[ ]?9718DR|PAD[ ]?9719QR|PAD[ ]?9720QR|TelePAD1030|Telepad1032|TelePAD730|TelePAD731|TelePAD732|TelePAD735Q|TelePAD830|TelePAD9730|TelePAD795|MegaPAD 1331|MegaPAD 1851|MegaPAD 2151",
                ViewsonicTablet: "ViewPad 10pi|ViewPad 10e|ViewPad 10s|ViewPad E72|ViewPad7|ViewPad E100|ViewPad 7e|ViewSonic VB733|VB100a",
                OdysTablet: "LOOX|XENO10|ODYS[ -](Space|EVO|Xpress|NOON)|\\bXELIO\\b|Xelio10Pro|XELIO7PHONETAB|XELIO10EXTREME|XELIOPT2|NEO_QUAD10",
                CaptivaTablet: "CAPTIVA PAD",
                IconbitTablet: "NetTAB|NT-3702|NT-3702S|NT-3702S|NT-3603P|NT-3603P|NT-0704S|NT-0704S|NT-3805C|NT-3805C|NT-0806C|NT-0806C|NT-0909T|NT-0909T|NT-0907S|NT-0907S|NT-0902S|NT-0902S",
                TeclastTablet: "T98 4G|\\bP80\\b|\\bX90HD\\b|X98 Air|X98 Air 3G|\\bX89\\b|P80 3G|\\bX80h\\b|P98 Air|\\bX89HD\\b|P98 3G|\\bP90HD\\b|P89 3G|X98 3G|\\bP70h\\b|P79HD 3G|G18d 3G|\\bP79HD\\b|\\bP89s\\b|\\bA88\\b|\\bP10HD\\b|\\bP19HD\\b|G18 3G|\\bP78HD\\b|\\bA78\\b|\\bP75\\b|G17s 3G|G17h 3G|\\bP85t\\b|\\bP90\\b|\\bP11\\b|\\bP98t\\b|\\bP98HD\\b|\\bG18d\\b|\\bP85s\\b|\\bP11HD\\b|\\bP88s\\b|\\bA80HD\\b|\\bA80se\\b|\\bA10h\\b|\\bP89\\b|\\bP78s\\b|\\bG18\\b|\\bP85\\b|\\bA70h\\b|\\bA70\\b|\\bG17\\b|\\bP18\\b|\\bA80s\\b|\\bA11s\\b|\\bP88HD\\b|\\bA80h\\b|\\bP76s\\b|\\bP76h\\b|\\bP98\\b|\\bA10HD\\b|\\bP78\\b|\\bP88\\b|\\bA11\\b|\\bA10t\\b|\\bP76a\\b|\\bP76t\\b|\\bP76e\\b|\\bP85HD\\b|\\bP85a\\b|\\bP86\\b|\\bP75HD\\b|\\bP76v\\b|\\bA12\\b|\\bP75a\\b|\\bA15\\b|\\bP76Ti\\b|\\bP81HD\\b|\\bA10\\b|\\bT760VE\\b|\\bT720HD\\b|\\bP76\\b|\\bP73\\b|\\bP71\\b|\\bP72\\b|\\bT720SE\\b|\\bC520Ti\\b|\\bT760\\b|\\bT720VE\\b|T720-3GE|T720-WiFi",
                OndaTablet: "\\b(V975i|Vi30|VX530|V701|Vi60|V701s|Vi50|V801s|V719|Vx610w|VX610W|V819i|Vi10|VX580W|Vi10|V711s|V813|V811|V820w|V820|Vi20|V711|VI30W|V712|V891w|V972|V819w|V820w|Vi60|V820w|V711|V813s|V801|V819|V975s|V801|V819|V819|V818|V811|V712|V975m|V101w|V961w|V812|V818|V971|V971s|V919|V989|V116w|V102w|V973|Vi40)\\b[\\s]+",
                JaytechTablet: "TPC-PA762",
                BlaupunktTablet: "Endeavour 800NG|Endeavour 1010",
                DigmaTablet: "\\b(iDx10|iDx9|iDx8|iDx7|iDxD7|iDxD8|iDsQ8|iDsQ7|iDsQ8|iDsD10|iDnD7|3TS804H|iDsQ11|iDj7|iDs10)\\b",
                EvolioTablet: "ARIA_Mini_wifi|Aria[ _]Mini|Evolio X10|Evolio X7|Evolio X8|\\bEvotab\\b|\\bNeura\\b",
                LavaTablet: "QPAD E704|\\bIvoryS\\b|E-TAB IVORY|\\bE-TAB\\b",
                AocTablet: "MW0811|MW0812|MW0922|MTK8382",
                CelkonTablet: "CT695|CT888|CT[\\s]?910|CT7 Tab|CT9 Tab|CT3 Tab|CT2 Tab|CT1 Tab|C820|C720|\\bCT-1\\b",
                WolderTablet: "miTab \\b(DIAMOND|SPACE|BROOKLYN|NEO|FLY|MANHATTAN|FUNK|EVOLUTION|SKY|GOCAR|IRON|GENIUS|POP|MINT|EPSILON|BROADWAY|JUMP|HOP|LEGEND|NEW AGE|LINE|ADVANCE|FEEL|FOLLOW|LIKE|LINK|LIVE|THINK|FREEDOM|CHICAGO|CLEVELAND|BALTIMORE-GH|IOWA|BOSTON|SEATTLE|PHOENIX|DALLAS|IN 101|MasterChef)\\b",
                MiTablet: "\\bMI PAD\\b|\\bHM NOTE 1W\\b",
                NibiruTablet: "Nibiru M1|Nibiru Jupiter One",
                NexoTablet: "NEXO NOVA|NEXO 10|NEXO AVIO|NEXO FREE|NEXO GO|NEXO EVO|NEXO 3G|NEXO SMART|NEXO KIDDO|NEXO MOBI",
                LeaderTablet: "TBLT10Q|TBLT10I|TBL-10WDKB|TBL-10WDKBO2013|TBL-W230V2|TBL-W450|TBL-W500|SV572|TBLT7I|TBA-AC7-8G|TBLT79|TBL-8W16|TBL-10W32|TBL-10WKB|TBL-W100",
                UbislateTablet: "UbiSlate[\\s]?7C",
                PocketBookTablet: "Pocketbook",
                Hudl: "Hudl HT7S3|Hudl 2",
                TelstraTablet: "T-Hub2",
                GenericTablet: "Android.*\\b97D\\b|Tablet(?!.*PC)|BNTV250A|MID-WCDMA|LogicPD Zoom2|\\bA7EB\\b|CatNova8|A1_07|CT704|CT1002|\\bM721\\b|rk30sdk|\\bEVOTAB\\b|M758A|ET904|ALUMIUM10|Smartfren Tab|Endeavour 1010|Tablet-PC-4|Tagi Tab|\\bM6pro\\b|CT1020W|arc 10HD|\\bJolla\\b|\\bTP750\\b"
            },
            oss: {
                AndroidOS: "Android",
                BlackBerryOS: "blackberry|\\bBB10\\b|rim tablet os",
                PalmOS: "PalmOS|avantgo|blazer|elaine|hiptop|palm|plucker|xiino",
                SymbianOS: "Symbian|SymbOS|Series60|Series40|SYB-[0-9]+|\\bS60\\b",
                WindowsMobileOS: "Windows CE.*(PPC|Smartphone|Mobile|[0-9]{3}x[0-9]{3})|Window Mobile|Windows Phone [0-9.]+|WCE;",
                WindowsPhoneOS: "Windows Phone 10.0|Windows Phone 8.1|Windows Phone 8.0|Windows Phone OS|XBLWP7|ZuneWP7|Windows NT 6.[23]; ARM;",
                iOS: "\\biPhone.*Mobile|\\biPod|\\biPad",
                MeeGoOS: "MeeGo",
                MaemoOS: "Maemo",
                JavaOS: "J2ME/|\\bMIDP\\b|\\bCLDC\\b",
                webOS: "webOS|hpwOS",
                badaOS: "\\bBada\\b",
                BREWOS: "BREW"
            },
            uas: {
                Chrome: "\\bCrMo\\b|CriOS|Android.*Chrome/[.0-9]* (Mobile)?",
                Dolfin: "\\bDolfin\\b",
                Opera: "Opera.*Mini|Opera.*Mobi|Android.*Opera|Mobile.*OPR/[0-9.]+|Coast/[0-9.]+",
                Skyfire: "Skyfire",
                IE: "IEMobile|MSIEMobile",
                Firefox: "fennec|firefox.*maemo|(Mobile|Tablet).*Firefox|Firefox.*Mobile",
                Bolt: "bolt",
                TeaShark: "teashark",
                Blazer: "Blazer",
                Safari: "Version.*Mobile.*Safari|Safari.*Mobile|MobileSafari",
                Tizen: "Tizen",
                UCBrowser: "UC.*Browser|UCWEB",
                baiduboxapp: "baiduboxapp",
                baidubrowser: "baidubrowser",
                DiigoBrowser: "DiigoBrowser",
                Puffin: "Puffin",
                Mercury: "\\bMercury\\b",
                ObigoBrowser: "Obigo",
                NetFront: "NF-Browser",
                GenericBrowser: "NokiaBrowser|OviBrowser|OneBrowser|TwonkyBeamBrowser|SEMC.*Browser|FlyFlow|Minimo|NetFront|Novarra-Vision|MQQBrowser|MicroMessenger"
            },
            props: {
                Mobile: "Mobile/[VER]",
                Build: "Build/[VER]",
                Version: "Version/[VER]",
                VendorID: "VendorID/[VER]",
                iPad: "iPad.*CPU[a-z ]+[VER]",
                iPhone: "iPhone.*CPU[a-z ]+[VER]",
                iPod: "iPod.*CPU[a-z ]+[VER]",
                Kindle: "Kindle/[VER]",
                Chrome: ["Chrome/[VER]", "CriOS/[VER]", "CrMo/[VER]"],
                Coast: ["Coast/[VER]"],
                Dolfin: "Dolfin/[VER]",
                Firefox: "Firefox/[VER]",
                Fennec: "Fennec/[VER]",
                IE: ["IEMobile/[VER];", "IEMobile [VER]", "MSIE [VER];", "Trident/[0-9.]+;.*rv:[VER]"],
                NetFront: "NetFront/[VER]",
                NokiaBrowser: "NokiaBrowser/[VER]",
                Opera: [" OPR/[VER]", "Opera Mini/[VER]", "Version/[VER]"],
                "Opera Mini": "Opera Mini/[VER]",
                "Opera Mobi": "Version/[VER]",
                "UC Browser": "UC Browser[VER]",
                MQQBrowser: "MQQBrowser/[VER]",
                MicroMessenger: "MicroMessenger/[VER]",
                baiduboxapp: "baiduboxapp/[VER]",
                baidubrowser: "baidubrowser/[VER]",
                Iron: "Iron/[VER]",
                Safari: ["Version/[VER]", "Safari/[VER]"],
                Skyfire: "Skyfire/[VER]",
                Tizen: "Tizen/[VER]",
                Webkit: "webkit[ /][VER]",
                Gecko: "Gecko/[VER]",
                Trident: "Trident/[VER]",
                Presto: "Presto/[VER]",
                iOS: " \\bi?OS\\b [VER][ ;]{1}",
                Android: "Android [VER]",
                BlackBerry: ["BlackBerry[\\w]+/[VER]", "BlackBerry.*Version/[VER]", "Version/[VER]"],
                BREW: "BREW [VER]",
                Java: "Java/[VER]",
                "Windows Phone OS": ["Windows Phone OS [VER]", "Windows Phone [VER]"],
                "Windows Phone": "Windows Phone [VER]",
                "Windows CE": "Windows CE/[VER]",
                "Windows NT": "Windows NT [VER]",
                Symbian: ["SymbianOS/[VER]", "Symbian/[VER]"],
                webOS: ["webOS/[VER]", "hpwOS/[VER];"]
            },
            utils: {
                Bot: "Googlebot|facebookexternalhit|AdsBot-Google|Google Keyword Suggestion|Facebot|YandexBot|bingbot|ia_archiver|AhrefsBot|Ezooms|GSLFbot|WBSearchBot|Twitterbot|TweetmemeBot|Twikle|PaperLiBot|Wotbox|UnwindFetchor|Exabot|MJ12bot|YandexImages|TurnitinBot|Pingdom",
                MobileBot: "Googlebot-Mobile|AdsBot-Google-Mobile|YahooSeeker/M1A1-R2D2",
                DesktopMode: "WPDesktop",
                TV: "SonyDTV|HbbTV",
                WebKit: "(webkit)[ /]([\\w.]+)",
                Console: "\\b(Nintendo|Nintendo WiiU|Nintendo 3DS|PLAYSTATION|Xbox)\\b",
                Watch: "SM-V700"
            }
        }, f.detectMobileBrowsers = {
            fullPattern: /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,
            shortPattern: /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
            tabletPattern: /android|ipad|playbook|silk/i
        };
        var g, h = Object.prototype.hasOwnProperty;
        return f.FALLBACK_PHONE = "UnknownPhone", f.FALLBACK_TABLET = "UnknownTablet", f.FALLBACK_MOBILE = "UnknownMobile", g = "isArray" in Array ? Array.isArray : function(a) {
                return "[object Array]" === Object.prototype.toString.call(a)
            },
            function() {
                var a, b, c, e, i, j, k = f.mobileDetectRules;
                for (a in k.props)
                    if (h.call(k.props, a)) {
                        for (b = k.props[a], g(b) || (b = [b]), i = b.length, e = 0; i > e; ++e) c = b[e], j = c.indexOf("[VER]"), j >= 0 && (c = c.substring(0, j) + "([\\w._\\+]+)" + c.substring(j + 5)), b[e] = new RegExp(c, "i");
                        k.props[a] = b
                    }
                d(k.oss), d(k.phones), d(k.tablets), d(k.uas), d(k.utils), k.oss0 = {
                    WindowsPhoneOS: k.oss.WindowsPhoneOS,
                    WindowsMobileOS: k.oss.WindowsMobileOS
                }
            }(), f.findMatch = function(a, b) {
                for (var c in a)
                    if (h.call(a, c) && a[c].test(b)) return c;
                return null
            }, f.findMatches = function(a, b) {
                var c = [];
                for (var d in a) h.call(a, d) && a[d].test(b) && c.push(d);
                return c
            }, f.getVersionStr = function(a, b) {
                var c, d, e, g, i = f.mobileDetectRules.props;
                if (h.call(i, a))
                    for (c = i[a], e = c.length, d = 0; e > d; ++d)
                        if (g = c[d].exec(b), null !== g) return g[1];
                return null
            }, f.getVersion = function(a, b) {
                var c = f.getVersionStr(a, b);
                return c ? f.prepareVersionNo(c) : NaN
            }, f.prepareVersionNo = function(a) {
                var b;
                return b = a.split(/[a-z._ \/\-]/i), 1 === b.length && (a = b[0]), b.length > 1 && (a = b[0] + ".", b.shift(), a += b.join("")), Number(a)
            }, f.isMobileFallback = function(a) {
                return f.detectMobileBrowsers.fullPattern.test(a) || f.detectMobileBrowsers.shortPattern.test(a.substr(0, 4))
            }, f.isTabletFallback = function(a) {
                return f.detectMobileBrowsers.tabletPattern.test(a)
            }, f.prepareDetectionCache = function(a, c, d) {
                if (a.mobile === b) {
                    var g, h, i;
                    return (h = f.findMatch(f.mobileDetectRules.tablets, c)) ? (a.mobile = a.tablet = h, void(a.phone = null)) : (g = f.findMatch(f.mobileDetectRules.phones, c)) ? (a.mobile = a.phone = g, void(a.tablet = null)) : void(f.isMobileFallback(c) ? (i = e.isPhoneSized(d), i === b ? (a.mobile = f.FALLBACK_MOBILE, a.tablet = a.phone = null) : i ? (a.mobile = a.phone = f.FALLBACK_PHONE, a.tablet = null) : (a.mobile = a.tablet = f.FALLBACK_TABLET, a.phone = null)) : f.isTabletFallback(c) ? (a.mobile = a.tablet = f.FALLBACK_TABLET, a.phone = null) : a.mobile = a.tablet = a.phone = null)
                }
            }, f.mobileGrade = function(a) {
                var b = null !== a.mobile();
                return a.os("iOS") && a.version("iPad") >= 4.3 || a.os("iOS") && a.version("iPhone") >= 3.1 || a.os("iOS") && a.version("iPod") >= 3.1 || a.version("Android") > 2.1 && a.is("Webkit") || a.version("Windows Phone OS") >= 7 || a.is("BlackBerry") && a.version("BlackBerry") >= 6 || a.match("Playbook.*Tablet") || a.version("webOS") >= 1.4 && a.match("Palm|Pre|Pixi") || a.match("hp.*TouchPad") || a.is("Firefox") && a.version("Firefox") >= 12 || a.is("Chrome") && a.is("AndroidOS") && a.version("Android") >= 4 || a.is("Skyfire") && a.version("Skyfire") >= 4.1 && a.is("AndroidOS") && a.version("Android") >= 2.3 || a.is("Opera") && a.version("Opera Mobi") > 11 && a.is("AndroidOS") || a.is("MeeGoOS") || a.is("Tizen") || a.is("Dolfin") && a.version("Bada") >= 2 || (a.is("UC Browser") || a.is("Dolfin")) && a.version("Android") >= 2.3 || a.match("Kindle Fire") || a.is("Kindle") && a.version("Kindle") >= 3 || a.is("AndroidOS") && a.is("NookTablet") || a.version("Chrome") >= 11 && !b || a.version("Safari") >= 5 && !b || a.version("Firefox") >= 4 && !b || a.version("MSIE") >= 7 && !b || a.version("Opera") >= 10 && !b ? "A" : a.os("iOS") && a.version("iPad") < 4.3 || a.os("iOS") && a.version("iPhone") < 3.1 || a.os("iOS") && a.version("iPod") < 3.1 || a.is("Blackberry") && a.version("BlackBerry") >= 5 && a.version("BlackBerry") < 6 || a.version("Opera Mini") >= 5 && a.version("Opera Mini") <= 6.5 && (a.version("Android") >= 2.3 || a.is("iOS")) || a.match("NokiaN8|NokiaC7|N97.*Series60|Symbian/3") || a.version("Opera Mobi") >= 11 && a.is("SymbianOS") ? "B" : (a.version("BlackBerry") < 5 || a.match("MSIEMobile|Windows CE.*Mobile") || a.version("Windows Mobile") <= 5.2, "C")
            }, f.detectOS = function(a) {
                return f.findMatch(f.mobileDetectRules.oss0, a) || f.findMatch(f.mobileDetectRules.oss, a)
            }, f.getDeviceSmallerSide = function() {
                return window.screen.width < window.screen.height ? window.screen.width : window.screen.height
            }, e.prototype = {
                constructor: e,
                mobile: function() {
                    return f.prepareDetectionCache(this._cache, this.ua, this.maxPhoneWidth), this._cache.mobile
                },
                phone: function() {
                    return f.prepareDetectionCache(this._cache, this.ua, this.maxPhoneWidth), this._cache.phone
                },
                tablet: function() {
                    return f.prepareDetectionCache(this._cache, this.ua, this.maxPhoneWidth), this._cache.tablet
                },
                userAgent: function() {
                    return this._cache.userAgent === b && (this._cache.userAgent = f.findMatch(f.mobileDetectRules.uas, this.ua)), this._cache.userAgent
                },
                userAgents: function() {
                    return this._cache.userAgents === b && (this._cache.userAgents = f.findMatches(f.mobileDetectRules.uas, this.ua)), this._cache.userAgents
                },
                os: function() {
                    return this._cache.os === b && (this._cache.os = f.detectOS(this.ua)), this._cache.os
                },
                version: function(a) {
                    return f.getVersion(a, this.ua)
                },
                versionStr: function(a) {
                    return f.getVersionStr(a, this.ua)
                },
                is: function(b) {
                    return c(this.userAgents(), b) || a(b, this.os()) || a(b, this.phone()) || a(b, this.tablet()) || c(f.findMatches(f.mobileDetectRules.utils, this.ua), b)
                },
                match: function(a) {
                    return a instanceof RegExp || (a = new RegExp(a, "i")), a.test(this.ua)
                },
                isPhoneSized: function(a) {
                    return e.isPhoneSized(a || this.maxPhoneWidth)
                },
                mobileGrade: function() {
                    return this._cache.grade === b && (this._cache.grade = f.mobileGrade(this)), this._cache.grade
                }
            }, "undefined" != typeof window && window.screen ? e.isPhoneSized = function(a) {
                return 0 > a ? b : f.getDeviceSmallerSide() <= a
            } : e.isPhoneSized = function() {}, e._impl = f, e
    })
}(function(a) {
    if ("undefined" != typeof module && module.exports) return function(a) {
        module.exports = a()
    };
    if ("function" == typeof define && define.amd) return define;
    if ("undefined" != typeof window) return function(a) {
        window.MobileDetect = a()
    };
    throw new Error("unknown environment")
}()),
function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], function(b) {
        a(b, window, document)
    }) : "object" == typeof module && module.exports ? module.exports = a(require("jquery"), window, document) : a(jQuery, window, document)
}(function(a, b, c, d) {
    "use strict";

    function e(b, c) {
        this.element = b, this.options = a.extend({}, h, c), this._defaults = h, this.ns = "." + f + g++, this.isGoodBrowser = Boolean(b.setSelectionRange), this.hadInitialPlaceholder = Boolean(a(b).attr("placeholder")), this._name = f
    }
    var f = "intlTelInput",
        g = 1,
        h = {
            allowExtensions: !1,
            autoFormat: !0,
            autoHideDialCode: !0,
            autoPlaceholder: !0,
            dropdownContainer: !1,
            excludeCountries: [],
            geoIpLookup: null,
            initialCountry: "",
            nationalMode: !0,
            numberType: "MOBILE",
            onlyCountries: [],
            preferredCountries: ["us", "gb"],
            utilsScript: ""
        },
        i = {
            UP: 38,
            DOWN: 40,
            ENTER: 13,
            ESC: 27,
            PLUS: 43,
            A: 65,
            Z: 90,
            ZERO: 48,
            NINE: 57,
            SPACE: 32,
            BSPACE: 8,
            TAB: 9,
            DEL: 46,
            CTRL: 17,
            CMD1: 91,
            CMD2: 224
        },
        j = !1;
    a(b).load(function() {
        j = !0
    }), e.prototype = {
        _init: function() {
            return this.options.nationalMode && (this.options.autoHideDialCode = !1), navigator.userAgent.match(/IEMobile/i) && (this.options.autoFormat = !1), this.isMobile = /Android.+Mobile|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), this.autoCountryDeferred = new a.Deferred, this.utilsScriptDeferred = new a.Deferred, this._processCountryData(), this._generateMarkup(), this._setInitialState(), this._initListeners(), this._initRequests(), [this.autoCountryDeferred, this.utilsScriptDeferred]
        },
        _processCountryData: function() {
            this._processAllCountries(), this._processCountryCodes(), this._processPreferredCountries()
        },
        _addCountryCode: function(a, b, c) {
            b in this.countryCodes || (this.countryCodes[b] = []);
            var d = c || 0;
            this.countryCodes[b][d] = a
        },
        _filterCountries: function(b, c) {
            var d;
            for (d = 0; d < b.length; d++) b[d] = b[d].toLowerCase();
            for (this.countries = [], d = 0; d < k.length; d++) c(a.inArray(k[d].iso2, b)) && this.countries.push(k[d])
        },
        _processAllCountries: function() {
            this.options.onlyCountries.length ? this._filterCountries(this.options.onlyCountries, function(a) {
                return -1 != a
            }) : this.options.excludeCountries.length ? this._filterCountries(this.options.excludeCountries, function(a) {
                return -1 == a
            }) : this.countries = k
        },
        _processCountryCodes: function() {
            this.countryCodes = {};
            for (var a = 0; a < this.countries.length; a++) {
                var b = this.countries[a];
                if (this._addCountryCode(b.iso2, b.dialCode, b.priority), b.areaCodes)
                    for (var c = 0; c < b.areaCodes.length; c++) this._addCountryCode(b.iso2, b.dialCode + b.areaCodes[c])
            }
        },
        _processPreferredCountries: function() {
            this.preferredCountries = [];
            for (var a = 0; a < this.options.preferredCountries.length; a++) {
                var b = this.options.preferredCountries[a].toLowerCase(),
                    c = this._getCountryData(b, !1, !0);
                c && this.preferredCountries.push(c)
            }
        },
        _generateMarkup: function() {
            this.telInput = a(this.element), this.telInput.attr("autocomplete", "tel"), this.telInput.wrap(a("<div>", {
                "class": "intl-tel-input"
            })), this.flagsContainer = a("<div>", {
                "class": "flag-container"
            }).insertBefore(this.telInput);
            var b = a("<div>", {
                tabindex: "0",
                "class": "selected-flag"
            }).appendTo(this.flagsContainer);
            this.selectedFlagInner = a("<div>", {
                "class": "iti-flag"
            }).appendTo(b), a("<div>", {
                "class": "iti-arrow"
            }).appendTo(b), this.isMobile ? this.countryList = a("<select>", {
                "class": "iti-mobile-select"
            }).appendTo(this.flagsContainer) : (this.countryList = a("<ul>", {
                "class": "country-list hide"
            }), this.preferredCountries.length && !this.isMobile && (this._appendListItems(this.preferredCountries, "preferred"), a("<li>", {
                "class": "divider"
            }).appendTo(this.countryList))), this._appendListItems(this.countries, ""), this.isMobile || (this.countryListItems = this.countryList.children(".country"), this.options.dropdownContainer ? this.dropdown = a("<div>", {
                "class": "intl-tel-input iti-container"
            }).append(this.countryList) : this.countryList.appendTo(this.flagsContainer))
        },
        _appendListItems: function(a, b) {
            for (var c = "", d = 0; d < a.length; d++) {
                var e = a[d];
                this.isMobile ? (c += "<option data-dial-code='" + e.dialCode + "' value='" + e.iso2 + "'>", c += e.name + " +" + e.dialCode, c += "</option>") : (c += "<li class='country " + b + "' data-dial-code='" + e.dialCode + "' data-country-code='" + e.iso2 + "'>", c += "<div class='flag-box'><div class='iti-flag " + e.iso2 + "'></div></div>", c += "<span class='country-name'>" + e.name + "</span>", c += "<span class='dial-code'>+" + e.dialCode + "</span>", c += "</li>")
            }
            this.countryList.append(c)
        },
        _setInitialState: function() {
            var a = this.telInput.val();
            if (this._getDialCode(a)) this._updateFlagFromNumber(a);
            else if ("auto" !== this.options.initialCountry && (this.options.initialCountry ? this._setFlag(this.options.initialCountry) : (this.defaultCountry = this.preferredCountries.length ? this.preferredCountries[0].iso2 : this.countries[0].iso2, a || this._setFlag(this.defaultCountry)), !a)) {
                var b = this._getCountryData(this.defaultCountry, !1, !1);
                this._updateDialCode(b.dialCode, !1)
            }
            a && this._updateVal(a, null, !1, !1, !1)
        },
        _initListeners: function() {
            var b = this;
            if (this._initKeyListeners(), (this.options.autoHideDialCode || this.options.autoFormat) && this._initFocusListeners(), this.isMobile) this.countryList.on("change" + this.ns, function(c) {
                b._selectListItem(a(this).find("option:selected"))
            });
            else {
                var c = this.telInput.closest("label");
                c.length && c.on("click" + this.ns, function(a) {
                    b.countryList.hasClass("hide") ? b.telInput.focus() : a.preventDefault()
                });
                var d = this.selectedFlagInner.parent();
                d.on("click" + this.ns, function(a) {
                    !b.countryList.hasClass("hide") || b.telInput.prop("disabled") || b.telInput.prop("readonly") || b._showDropdown()
                })
            }
            this.flagsContainer.on("keydown" + b.ns, function(a) {
                var c = b.countryList.hasClass("hide");
                !c || a.which != i.UP && a.which != i.DOWN && a.which != i.SPACE && a.which != i.ENTER || (a.preventDefault(), a.stopPropagation(), b._showDropdown()), a.which == i.TAB && b._closeDropdown()
            })
        },
        _initRequests: function() {
            var c = this;
            this.options.utilsScript ? j ? a.fn[f].loadUtils(this.options.utilsScript, this.utilsScriptDeferred) : a(b).load(function() {
                a.fn[f].loadUtils(c.options.utilsScript, c.utilsScriptDeferred)
            }) : this.utilsScriptDeferred.resolve(), "auto" === this.options.initialCountry ? this._loadAutoCountry() : this.autoCountryDeferred.resolve()
        },
        _loadAutoCountry: function() {
            var c = b.Cookies ? Cookies.get("itiAutoCountry") : "";
            c && (a.fn[f].autoCountry = c), a.fn[f].autoCountry ? this.handleAutoCountry() : a.fn[f].startedLoadingAutoCountry || (a.fn[f].startedLoadingAutoCountry = !0, "function" == typeof this.options.geoIpLookup && this.options.geoIpLookup(function(c) {
                a.fn[f].autoCountry = c.toLowerCase(), b.Cookies && Cookies.set("itiAutoCountry", a.fn[f].autoCountry, {
                    path: "/"
                }), setTimeout(function() {
                    a(".intl-tel-input input").intlTelInput("handleAutoCountry")
                })
            }))
        },
        _initKeyListeners: function() {
            var a = this;
            this.options.autoFormat && this.telInput.on("keypress" + this.ns, function(c) {
                if (c.which >= i.SPACE && !c.ctrlKey && !c.metaKey && b.intlTelInputUtils && !a.telInput.prop("readonly")) {
                    c.preventDefault();
                    var d = c.which >= i.ZERO && c.which <= i.NINE || c.which == i.PLUS,
                        e = a.telInput[0],
                        f = a.isGoodBrowser && e.selectionStart == e.selectionEnd,
                        g = a.telInput.attr("maxlength"),
                        h = a.telInput.val(),
                        j = g ? h.length < g : !0;
                    if (j && (d || f)) {
                        var k = d ? String.fromCharCode(c.which) : null;
                        a._handleInputKey(k, !0, d), h != a.telInput.val() && a.telInput.trigger("input")
                    }
                    d || a._handleInvalidKey()
                }
            }), this.telInput.on("cut" + this.ns + " paste" + this.ns, function() {
                setTimeout(function() {
                    if (a.options.autoFormat && b.intlTelInputUtils) {
                        var c = a.isGoodBrowser && a.telInput[0].selectionStart == a.telInput.val().length;
                        a._handleInputKey(null, c, !0), a._ensurePlus()
                    } else a._updateFlagFromNumber(a.telInput.val())
                })
            }), this.telInput.on("keyup" + this.ns, function(c) {
                if (c.which == i.ENTER || a.telInput.prop("readonly"));
                else if (a.options.autoFormat && b.intlTelInputUtils) {
                    var d = a.isGoodBrowser && a.telInput[0].selectionStart == a.telInput.val().length;
                    a.telInput.val() ? (c.which == i.DEL && !d || c.which == i.BSPACE) && a._handleInputKey(null, !1, !1) : a._updateFlagFromNumber(""), a._ensurePlus()
                } else a._updateFlagFromNumber(a.telInput.val())
            })
        },
        _ensurePlus: function() {
            if (!this.options.nationalMode) {
                var a = this.telInput.val(),
                    b = this.telInput[0];
                if ("+" != a.charAt(0)) {
                    var c = this.isGoodBrowser ? b.selectionStart + 1 : 0;
                    this.telInput.val("+" + a), this.isGoodBrowser && b.setSelectionRange(c, c)
                }
            }
        },
        _handleInvalidKey: function() {
            var a = this;
            this.telInput.trigger("invalidkey").addClass("iti-invalid-key"), setTimeout(function() {
                a.telInput.removeClass("iti-invalid-key")
            }, 100)
        },
        _handleInputKey: function(a, b, c) {
            var d, e = this.telInput.val(),
                f = (this._getClean(e), this.telInput[0]),
                g = 0;
            if (this.isGoodBrowser ? (g = this._getDigitsOnRight(e, f.selectionEnd), a ? e = e.substr(0, f.selectionStart) + a + e.substring(f.selectionEnd, e.length) : d = e.substr(f.selectionStart - 2, 2)) : a && (e += a), this.setNumber(e, null, b, !0, c), this.isGoodBrowser) {
                var h;
                e = this.telInput.val(), g ? (h = this._getCursorFromDigitsOnRight(e, g), a || (h = this._getCursorFromLeftChar(e, h, d))) : h = e.length, f.setSelectionRange(h, h)
            }
        },
        _getCursorFromLeftChar: function(b, c, d) {
            for (var e = c; e > 0; e--) {
                var f = b.charAt(e - 1);
                if (a.isNumeric(f) || b.substr(e - 2, 2) == d) return e
            }
            return 0
        },
        _getCursorFromDigitsOnRight: function(b, c) {
            for (var d = b.length - 1; d >= 0; d--)
                if (a.isNumeric(b.charAt(d)) && 0 === --c) return d;
            return 0
        },
        _getDigitsOnRight: function(b, c) {
            for (var d = 0, e = c; e < b.length; e++) a.isNumeric(b.charAt(e)) && d++;
            return d
        },
        _initFocusListeners: function() {
            var a = this;
            this.options.autoHideDialCode && this.telInput.on("mousedown" + this.ns, function(b) {
                a.telInput.is(":focus") || a.telInput.val() || (b.preventDefault(), a.telInput.focus())
            }), this.telInput.on("focus" + this.ns, function(c) {
                var d = a.telInput.val();
                a.telInput.data("focusVal", d), a.options.autoHideDialCode && !d && !a.telInput.prop("readonly") && a.selectedCountryData.dialCode && (a._updateVal("+" + a.selectedCountryData.dialCode, null, !0, !1, !1), a.telInput.one("keypress.plus" + a.ns, function(c) {
                    if (c.which == i.PLUS) {
                        var d = a.options.autoFormat && b.intlTelInputUtils ? "+" : "";
                        a.telInput.val(d)
                    }
                }), setTimeout(function() {
                    var b = a.telInput[0];
                    if (a.isGoodBrowser) {
                        var c = a.telInput.val().length;
                        b.setSelectionRange(c, c)
                    }
                }))
            }), this.telInput.on("blur" + this.ns, function() {
                if (a.options.autoHideDialCode) {
                    var c = a.telInput.val(),
                        d = "+" == c.charAt(0);
                    if (d) {
                        var e = a._getNumeric(c);
                        e && a.selectedCountryData.dialCode != e || a.telInput.val("")
                    }
                    a.telInput.off("keypress.plus" + a.ns)
                }
                a.options.autoFormat && b.intlTelInputUtils && a.telInput.val() != a.telInput.data("focusVal") && a.telInput.trigger("change")
            })
        },
        _getNumeric: function(a) {
            return a.replace(/\D/g, "")
        },
        _getClean: function(a) {
            var b = "+" == a.charAt(0) ? "+" : "";
            return b + this._getNumeric(a)
        },
        _showDropdown: function() {
            this._setDropdownPosition();
            var a = this.countryList.children(".active");
            a.length && (this._highlightListItem(a), this._scrollTo(a)), this._bindDropdownListeners(), this.selectedFlagInner.children(".iti-arrow").addClass("up")
        },
        _setDropdownPosition: function() {
            var c = this,
                d = this.options.dropdownContainer && !this.isMobile;
            d && this.dropdown.appendTo(this.options.dropdownContainer), this.dropdownHeight = this.countryList.removeClass("hide").outerHeight();
            var e = this.telInput.offset(),
                f = e.top,
                g = a(b).scrollTop(),
                h = f + this.telInput.outerHeight() + this.dropdownHeight < g + a(b).height(),
                i = f - this.dropdownHeight > g;
            if (this.countryList.toggleClass("dropup", !h && i), d) {
                var j = !h && i ? 0 : this.telInput.innerHeight();
                this.dropdown.css({
                    top: f + j,
                    left: e.left
                }), a(b).on("scroll" + this.ns, function() {
                    c._closeDropdown()
                })
            }
        },
        _bindDropdownListeners: function() {
            var b = this;
            this.countryList.on("mouseover" + this.ns, ".country", function(c) {
                b._highlightListItem(a(this))
            }), this.countryList.on("click" + this.ns, ".country", function(c) {
                b._selectListItem(a(this))
            });
            var d = !0;
            a("html").on("click" + this.ns, function(a) {
                d || b._closeDropdown(), d = !1
            });
            var e = "",
                f = null;
            a(c).on("keydown" + this.ns, function(a) {
                a.preventDefault(), a.which == i.UP || a.which == i.DOWN ? b._handleUpDownKey(a.which) : a.which == i.ENTER ? b._handleEnterKey() : a.which == i.ESC ? b._closeDropdown() : (a.which >= i.A && a.which <= i.Z || a.which == i.SPACE) && (f && clearTimeout(f), e += String.fromCharCode(a.which), b._searchForCountry(e), f = setTimeout(function() {
                    e = ""
                }, 1e3))
            })
        },
        _handleUpDownKey: function(a) {
            var b = this.countryList.children(".highlight").first(),
                c = a == i.UP ? b.prev() : b.next();
            c.length && (c.hasClass("divider") && (c = a == i.UP ? c.prev() : c.next()), this._highlightListItem(c), this._scrollTo(c))
        },
        _handleEnterKey: function() {
            var a = this.countryList.children(".highlight").first();
            a.length && this._selectListItem(a)
        },
        _searchForCountry: function(a) {
            for (var b = 0; b < this.countries.length; b++)
                if (this._startsWith(this.countries[b].name, a)) {
                    var c = this.countryList.children("[data-country-code=" + this.countries[b].iso2 + "]").not(".preferred");
                    this._highlightListItem(c), this._scrollTo(c, !0);
                    break
                }
        },
        _startsWith: function(a, b) {
            return a.substr(0, b.length).toUpperCase() == b
        },
        _updateVal: function(a, c, d, e, f) {
            var g;
            if (this.options.autoFormat && b.intlTelInputUtils && this.selectedCountryData) {
                g = "number" == typeof c && intlTelInputUtils.isValidNumber(a, this.selectedCountryData.iso2) ? intlTelInputUtils.formatNumberByType(a, this.selectedCountryData.iso2, c) : !e && this.options.nationalMode && "+" == a.charAt(0) && intlTelInputUtils.isValidNumber(a, this.selectedCountryData.iso2) ? intlTelInputUtils.formatNumberByType(a, this.selectedCountryData.iso2, intlTelInputUtils.numberFormat.NATIONAL) : intlTelInputUtils.formatNumber(a, this.selectedCountryData.iso2, d, this.options.allowExtensions, f);
                var h = this.telInput.attr("maxlength");
                h && g.length > h && (g = g.substr(0, h))
            } else g = a;
            this.telInput.val(g)
        },
        _updateFlagFromNumber: function(b) {
            b && this.options.nationalMode && this.selectedCountryData && "1" == this.selectedCountryData.dialCode && "+" != b.charAt(0) && ("1" != b.charAt(0) && (b = "1" + b), b = "+" + b);
            var c = this._getDialCode(b),
                d = null;
            if (c) {
                var e = this.countryCodes[this._getNumeric(c)],
                    f = this.selectedCountryData && -1 != a.inArray(this.selectedCountryData.iso2, e);
                if (!f || this._isUnknownNanp(b, c))
                    for (var g = 0; g < e.length; g++)
                        if (e[g]) {
                            d = e[g];
                            break
                        }
            } else "+" == b.charAt(0) && this._getNumeric(b).length ? d = "" : b && "+" != b || (d = this.defaultCountry);
            null !== d && this._setFlag(d)
        },
        _isUnknownNanp: function(a, b) {
            return "+1" == b && this._getNumeric(a).length >= 4
        },
        _highlightListItem: function(a) {
            this.countryListItems.removeClass("highlight"), a.addClass("highlight")
        },
        _getCountryData: function(a, b, c) {
            for (var d = b ? k : this.countries, e = 0; e < d.length; e++)
                if (d[e].iso2 == a) return d[e];
            if (c) return null;
            throw new Error("No country data for '" + a + "'")
        },
        _setFlag: function(a) {
            this.selectedCountryData = a ? this._getCountryData(a, !1, !1) : {}, this.selectedCountryData.iso2 && (this.defaultCountry = this.selectedCountryData.iso2), this.selectedFlagInner.attr("class", "iti-flag " + a);
            var b = a ? this.selectedCountryData.name + ": +" + this.selectedCountryData.dialCode : "Unknown";
            this.selectedFlagInner.parent().attr("title", b), this._updatePlaceholder(), this.isMobile ? this.countryList.val(a) : (this.countryListItems.removeClass("active"), a && this.countryListItems.find(".iti-flag." + a).first().closest(".country").addClass("active"))
        },
        _updatePlaceholder: function() {
            if (b.intlTelInputUtils && !this.hadInitialPlaceholder && this.options.autoPlaceholder && this.selectedCountryData) {
                var a = this.selectedCountryData.iso2,
                    c = intlTelInputUtils.numberType[this.options.numberType || "FIXED_LINE"],
                    d = a ? intlTelInputUtils.getExampleNumber(a, this.options.nationalMode, c) : "";
                "function" == typeof this.options.customPlaceholder && (d = this.options.customPlaceholder(d, this.selectedCountryData)), this.telInput.attr("placeholder", d)
            }
        },
        _selectListItem: function(a) {
            var b = this.isMobile ? "value" : "data-country-code";
            if (this._setFlag(a.attr(b)), this.isMobile || this._closeDropdown(), this._updateDialCode(a.attr("data-dial-code"), !0), this.telInput.trigger("change"), this.telInput.focus(), this.isGoodBrowser) {
                var c = this.telInput.val().length;
                this.telInput[0].setSelectionRange(c, c)
            }
        },
        _closeDropdown: function() {
            this.countryList.addClass("hide"), this.selectedFlagInner.children(".iti-arrow").removeClass("up"), a(c).off(this.ns), a("html").off(this.ns), this.countryList.off(this.ns), this.options.dropdownContainer && !this.isMobile && (a(b).off("scroll" + this.ns), this.dropdown.detach())
        },
        _scrollTo: function(a, b) {
            var c = this.countryList,
                d = c.height(),
                e = c.offset().top,
                f = e + d,
                g = a.outerHeight(),
                h = a.offset().top,
                i = h + g,
                j = h - e + c.scrollTop(),
                k = d / 2 - g / 2;
            if (e > h) b && (j -= k), c.scrollTop(j);
            else if (i > f) {
                b && (j += k);
                var l = d - g;
                c.scrollTop(j - l)
            }
        },
        _updateDialCode: function(b, c) {
            var d, e = this.telInput.val();
            if (b = "+" + b, this.options.nationalMode && "+" != e.charAt(0)) d = e;
            else if (e) {
                var f = this._getDialCode(e);
                if (f.length > 1) d = e.replace(f, b);
                else {
                    var g = "+" != e.charAt(0) ? a.trim(e) : "";
                    d = b + g
                }
            } else d = !this.options.autoHideDialCode || c ? b : "";
            this._updateVal(d, null, c, !1, !1)
        },
        _getDialCode: function(b) {
            var c = "";
            if ("+" == b.charAt(0))
                for (var d = "", e = 0; e < b.length; e++) {
                    var f = b.charAt(e);
                    if (a.isNumeric(f) && (d += f, this.countryCodes[d] && (c = b.substr(0, e + 1)), 4 == d.length)) break
                }
            return c
        },
        handleAutoCountry: function() {
            "auto" === this.options.initialCountry && (this.defaultCountry = a.fn[f].autoCountry, this.telInput.val() || this.setCountry(this.defaultCountry), this.autoCountryDeferred.resolve())
        },
        destroy: function() {
            this.isMobile || this._closeDropdown(), this.telInput.off(this.ns), this.isMobile ? this.countryList.off(this.ns) : (this.selectedFlagInner.parent().off(this.ns), this.telInput.closest("label").off(this.ns));
            var a = this.telInput.parent();
            a.before(this.telInput).remove()
        },
        getExtension: function() {
            return this.telInput.val().split(" ext. ")[1] || ""
        },
        getNumber: function(a) {
            return b.intlTelInputUtils ? intlTelInputUtils.formatNumberByType(this.telInput.val(), this.selectedCountryData.iso2, a) : ""
        },
        getNumberType: function() {
            return b.intlTelInputUtils ? intlTelInputUtils.getNumberType(this.telInput.val(), this.selectedCountryData.iso2) : -99
        },
        getSelectedCountryData: function() {
            return this.selectedCountryData || {}
        },
        getValidationError: function() {
            return b.intlTelInputUtils ? intlTelInputUtils.getValidationError(this.telInput.val(), this.selectedCountryData.iso2) : -99
        },
        isValidNumber: function() {
            var c = a.trim(this.telInput.val()),
                d = this.options.nationalMode ? this.selectedCountryData.iso2 : "";
            return b.intlTelInputUtils ? intlTelInputUtils.isValidNumber(c, d) : !1
        },
        setCountry: function(a) {
            a = a.toLowerCase(), this.selectedFlagInner.hasClass(a) || (this._setFlag(a), this._updateDialCode(this.selectedCountryData.dialCode, !1))
        },
        setNumber: function(a, b, c, d, e) {
            this.options.nationalMode || "+" == a.charAt(0) || (a = "+" + a), this._updateFlagFromNumber(a), this._updateVal(a, b, c, d, e)
        },
        handleUtils: function() {
            b.intlTelInputUtils && (this.options.autoFormat && this.telInput.val() && this._updateVal(this.telInput.val(), null, !1, !1, !1), this._updatePlaceholder()), this.utilsScriptDeferred.resolve()
        }
    }, a.fn[f] = function(b) {
        var c = arguments;
        if (b === d || "object" == typeof b) {
            var g = [];
            return this.each(function() {
                if (!a.data(this, "plugin_" + f)) {
                    var c = new e(this, b),
                        d = c._init();
                    g.push(d[0]), g.push(d[1]), a.data(this, "plugin_" + f, c)
                }
            }), a.when.apply(null, g)
        }
        if ("string" == typeof b && "_" !== b[0]) {
            var h;
            return this.each(function() {
                var d = a.data(this, "plugin_" + f);
                d instanceof e && "function" == typeof d[b] && (h = d[b].apply(d, Array.prototype.slice.call(c, 1))), "destroy" === b && a.data(this, "plugin_" + f, null)
            }), h !== d ? h : this
        }
    }, a.fn[f].getCountryData = function() {
        return k
    }, a.fn[f].loadUtils = function(b, c) {
        a.fn[f].loadedUtilsScript ? c && c.resolve() : (a.fn[f].loadedUtilsScript = !0, a.ajax({
            url: b,
            complete: function() {
                a(".intl-tel-input input").intlTelInput("handleUtils")
            },
            dataType: "script",
            cache: !0
        }))
    }, a.fn[f].version = "7.0.2";
    for (var k = [
            ["Afghanistan (â€«Ø§ÙØºØ§Ù†Ø³ØªØ§Ù†â€¬â€Ž)", "af", "93"],
            ["Albania (ShqipÃ«ri)", "al", "355"],
            ["Algeria (â€«Ø§Ù„Ø¬Ø²Ø§Ø¦Ø±â€¬â€Ž)", "dz", "213"],
            ["American Samoa", "as", "1684"],
            ["Andorra", "ad", "376"],
            ["Angola", "ao", "244"],
            ["Anguilla", "ai", "1264"],
            ["Antigua and Barbuda", "ag", "1268"],
            ["Argentina", "ar", "54"],
            ["Armenia (Õ€Õ¡ÕµÕ¡Õ½Õ¿Õ¡Õ¶)", "am", "374"],
            ["Aruba", "aw", "297"],
            ["Australia", "au", "61", 0],
            ["Austria (Ã–sterreich)", "at", "43"],
            ["Azerbaijan (AzÉ™rbaycan)", "az", "994"],
            ["Bahamas", "bs", "1242"],
            ["Bahrain (â€«Ø§Ù„Ø¨Ø­Ø±ÙŠÙ†â€¬â€Ž)", "bh", "973"],
            ["Bangladesh (à¦¬à¦¾à¦‚à¦²à¦¾à¦¦à§‡à¦¶)", "bd", "880"],
            ["Barbados", "bb", "1246"],
            ["Belarus (Ð‘ÐµÐ»Ð°Ñ€ÑƒÑÑŒ)", "by", "375"],
            ["Belgium (BelgiÃ«)", "be", "32"],
            ["Belize", "bz", "501"],
            ["Benin (BÃ©nin)", "bj", "229"],
            ["Bermuda", "bm", "1441"],
            ["Bhutan (à½ à½–à¾²à½´à½‚)", "bt", "975"],
            ["Bolivia", "bo", "591"],
            ["Bosnia and Herzegovina (Ð‘Ð¾ÑÐ½Ð° Ð¸ Ð¥ÐµÑ€Ñ†ÐµÐ³Ð¾Ð²Ð¸Ð½Ð°)", "ba", "387"],
            ["Botswana", "bw", "267"],
            ["Brazil (Brasil)", "br", "55"],
            ["British Indian Ocean Territory", "io", "246"],
            ["British Virgin Islands", "vg", "1284"],
            ["Brunei", "bn", "673"],
            ["Bulgaria (Ð‘ÑŠÐ»Ð³Ð°Ñ€Ð¸Ñ)", "bg", "359"],
            ["Burkina Faso", "bf", "226"],
            ["Burundi (Uburundi)", "bi", "257"],
            ["Cambodia (áž€áž˜áŸ’áž–áž»áž‡áž¶)", "kh", "855"],
            ["Cameroon (Cameroun)", "cm", "237"],
            ["Canada", "ca", "1", 1, ["204", "226", "236", "249", "250", "289", "306", "343", "365", "387", "403", "416", "418", "431", "437", "438", "450", "506", "514", "519", "548", "579", "581", "587", "604", "613", "639", "647", "672", "705", "709", "742", "778", "780", "782", "807", "819", "825", "867", "873", "902", "905"]],
            ["Cape Verde (Kabu Verdi)", "cv", "238"],
            ["Caribbean Netherlands", "bq", "599", 1],
            ["Cayman Islands", "ky", "1345"],
            ["Central African Republic (RÃ©publique centrafricaine)", "cf", "236"],
            ["Chad (Tchad)", "td", "235"],
            ["Chile", "cl", "56"],
            ["China (ä¸­å›½)", "cn", "86"],
            ["Christmas Island", "cx", "61", 2],
            ["Cocos (Keeling) Islands", "cc", "61", 1],
            ["Colombia", "co", "57"],
            ["Comoros (â€«Ø¬Ø²Ø± Ø§Ù„Ù‚Ù…Ø±â€¬â€Ž)", "km", "269"],
            ["Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)", "cd", "243"],
            ["Congo (Republic) (Congo-Brazzaville)", "cg", "242"],
            ["Cook Islands", "ck", "682"],
            ["Costa Rica", "cr", "506"],
            ["CÃ´te dâ€™Ivoire", "ci", "225"],
            ["Croatia (Hrvatska)", "hr", "385"],
            ["Cuba", "cu", "53"],
            ["CuraÃ§ao", "cw", "599", 0],
            ["Cyprus (ÎšÏÏ€ÏÎ¿Ï‚)", "cy", "357"],
            ["Czech Republic (ÄŒeskÃ¡ republika)", "cz", "420"],
            ["Denmark (Danmark)", "dk", "45"],
            ["Djibouti", "dj", "253"],
            ["Dominica", "dm", "1767"],
            ["Dominican Republic (RepÃºblica Dominicana)", "do", "1", 2, ["809", "829", "849"]],
            ["Ecuador", "ec", "593"],
            ["Egypt (â€«Ù…ØµØ±â€¬â€Ž)", "eg", "20"],
            ["El Salvador", "sv", "503"],
            ["Equatorial Guinea (Guinea Ecuatorial)", "gq", "240"],
            ["Eritrea", "er", "291"],
            ["Estonia (Eesti)", "ee", "372"],
            ["Ethiopia", "et", "251"],
            ["Falkland Islands (Islas Malvinas)", "fk", "500"],
            ["Faroe Islands (FÃ¸royar)", "fo", "298"],
            ["Fiji", "fj", "679"],
            ["Finland (Suomi)", "fi", "358", 0],
            ["France", "fr", "33"],
            ["French Guiana (Guyane franÃ§aise)", "gf", "594"],
            ["French Polynesia (PolynÃ©sie franÃ§aise)", "pf", "689"],
            ["Gabon", "ga", "241"],
            ["Gambia", "gm", "220"],
            ["Georgia (áƒ¡áƒáƒ¥áƒáƒ áƒ—áƒ•áƒ”áƒšáƒ)", "ge", "995"],
            ["Germany (Deutschland)", "de", "49"],
            ["Ghana (Gaana)", "gh", "233"],
            ["Gibraltar", "gi", "350"],
            ["Greece (Î•Î»Î»Î¬Î´Î±)", "gr", "30"],
            ["Greenland (Kalaallit Nunaat)", "gl", "299"],
            ["Grenada", "gd", "1473"],
            ["Guadeloupe", "gp", "590", 0],
            ["Guam", "gu", "1671"],
            ["Guatemala", "gt", "502"],
            ["Guernsey", "gg", "44", 1],
            ["Guinea (GuinÃ©e)", "gn", "224"],
            ["Guinea-Bissau (GuinÃ© Bissau)", "gw", "245"],
            ["Guyana", "gy", "592"],
            ["Haiti", "ht", "509"],
            ["Honduras", "hn", "504"],
            ["Hong Kong (é¦™æ¸¯)", "hk", "852"],
            ["Hungary (MagyarorszÃ¡g)", "hu", "36"],
            ["Iceland (Ãsland)", "is", "354"],
            ["India (à¤­à¤¾à¤°à¤¤)", "in", "91"],
            ["Indonesia", "id", "62"],
            ["Iran (â€«Ø§ÛŒØ±Ø§Ù†â€¬â€Ž)", "ir", "98"],
            ["Iraq (â€«Ø§Ù„Ø¹Ø±Ø§Ù‚â€¬â€Ž)", "iq", "964"],
            ["Ireland", "ie", "353"],
            ["Isle of Man", "im", "44", 2],
            ["Israel (â€«×™×©×¨××œâ€¬â€Ž)", "il", "972"],
            ["Italy (Italia)", "it", "39", 0],
            ["Jamaica", "jm", "1876"],
            ["Japan (æ—¥æœ¬)", "jp", "81"],
            ["Jersey", "je", "44", 3],
            ["Jordan (â€«Ø§Ù„Ø£Ø±Ø¯Ù†â€¬â€Ž)", "jo", "962"],
            ["Kazakhstan (ÐšÐ°Ð·Ð°Ñ…ÑÑ‚Ð°Ð½)", "kz", "7", 1],
            ["Kenya", "ke", "254"],
            ["Kiribati", "ki", "686"],
            ["Kuwait (â€«Ø§Ù„ÙƒÙˆÙŠØªâ€¬â€Ž)", "kw", "965"],
            ["Kyrgyzstan (ÐšÑ‹Ñ€Ð³Ñ‹Ð·ÑÑ‚Ð°Ð½)", "kg", "996"],
            ["Laos (àº¥àº²àº§)", "la", "856"],
            ["Latvia (Latvija)", "lv", "371"],
            ["Lebanon (â€«Ù„Ø¨Ù†Ø§Ù†â€¬â€Ž)", "lb", "961"],
            ["Lesotho", "ls", "266"],
            ["Liberia", "lr", "231"],
            ["Libya (â€«Ù„ÙŠØ¨ÙŠØ§â€¬â€Ž)", "ly", "218"],
            ["Liechtenstein", "li", "423"],
            ["Lithuania (Lietuva)", "lt", "370"],
            ["Luxembourg", "lu", "352"],
            ["Macau (æ¾³é–€)", "mo", "853"],
            ["Macedonia (FYROM) (ÐœÐ°ÐºÐµÐ´Ð¾Ð½Ð¸Ñ˜Ð°)", "mk", "389"],
            ["Madagascar (Madagasikara)", "mg", "261"],
            ["Malawi", "mw", "265"],
            ["Malaysia", "my", "60"],
            ["Maldives", "mv", "960"],
            ["Mali", "ml", "223"],
            ["Malta", "mt", "356"],
            ["Marshall Islands", "mh", "692"],
            ["Martinique", "mq", "596"],
            ["Mauritania (â€«Ù…ÙˆØ±ÙŠØªØ§Ù†ÙŠØ§â€¬â€Ž)", "mr", "222"],
            ["Mauritius (Moris)", "mu", "230"],
            ["Mayotte", "yt", "262", 1],
            ["Mexico (MÃ©xico)", "mx", "52"],
            ["Micronesia", "fm", "691"],
            ["Moldova (Republica Moldova)", "md", "373"],
            ["Monaco", "mc", "377"],
            ["Mongolia (ÐœÐ¾Ð½Ð³Ð¾Ð»)", "mn", "976"],
            ["Montenegro (Crna Gora)", "me", "382"],
            ["Montserrat", "ms", "1664"],
            ["Morocco (â€«Ø§Ù„Ù…ØºØ±Ø¨â€¬â€Ž)", "ma", "212", 0],
            ["Mozambique (MoÃ§ambique)", "mz", "258"],
            ["Myanmar (Burma) (á€™á€¼á€”á€ºá€™á€¬)", "mm", "95"],
            ["Namibia (NamibiÃ«)", "na", "264"],
            ["Nauru", "nr", "674"],
            ["Nepal (à¤¨à¥‡à¤ªà¤¾à¤²)", "np", "977"],
            ["Netherlands (Nederland)", "nl", "31"],
            ["New Caledonia (Nouvelle-CalÃ©donie)", "nc", "687"],
            ["New Zealand", "nz", "64"],
            ["Nicaragua", "ni", "505"],
            ["Niger (Nijar)", "ne", "227"],
            ["Nigeria", "ng", "234"],
            ["Niue", "nu", "683"],
            ["Norfolk Island", "nf", "672"],
            ["North Korea (ì¡°ì„  ë¯¼ì£¼ì£¼ì˜ ì¸ë¯¼ ê³µí™”êµ­)", "kp", "850"],
            ["Northern Mariana Islands", "mp", "1670"],
            ["Norway (Norge)", "no", "47", 0],
            ["Oman (â€«Ø¹ÙÙ…Ø§Ù†â€¬â€Ž)", "om", "968"],
            ["Pakistan (â€«Ù¾Ø§Ú©Ø³ØªØ§Ù†â€¬â€Ž)", "pk", "92"],
            ["Palau", "pw", "680"],
            ["Palestine (â€«ÙÙ„Ø³Ø·ÙŠÙ†â€¬â€Ž)", "ps", "970"],
            ["Panama (PanamÃ¡)", "pa", "507"],
            ["Papua New Guinea", "pg", "675"],
            ["Paraguay", "py", "595"],
            ["Peru (PerÃº)", "pe", "51"],
            ["Philippines", "ph", "63"],
            ["Poland (Polska)", "pl", "48"],
            ["Portugal", "pt", "351"],
            ["Puerto Rico", "pr", "1", 3, ["787", "939"]],
            ["Qatar (â€«Ù‚Ø·Ø±â€¬â€Ž)", "qa", "974"],
            ["RÃ©union (La RÃ©union)", "re", "262", 0],
            ["Romania (RomÃ¢nia)", "ro", "40"],
            ["Russia (Ð Ð¾ÑÑÐ¸Ñ)", "ru", "7", 0],
            ["Rwanda", "rw", "250"],
            ["Saint BarthÃ©lemy (Saint-BarthÃ©lemy)", "bl", "590", 1],
            ["Saint Helena", "sh", "290"],
            ["Saint Kitts and Nevis", "kn", "1869"],
            ["Saint Lucia", "lc", "1758"],
            ["Saint Martin (Saint-Martin (partie franÃ§aise))", "mf", "590", 2],
            ["Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)", "pm", "508"],
            ["Saint Vincent and the Grenadines", "vc", "1784"],
            ["Samoa", "ws", "685"],
            ["San Marino", "sm", "378"],
            ["SÃ£o TomÃ© and PrÃ­ncipe (SÃ£o TomÃ© e PrÃ­ncipe)", "st", "239"],
            ["Saudi Arabia (â€«Ø§Ù„Ù…Ù…Ù„ÙƒØ© Ø§Ù„Ø¹Ø±Ø¨ÙŠØ© Ø§Ù„Ø³Ø¹ÙˆØ¯ÙŠØ©â€¬â€Ž)", "sa", "966"],
            ["Senegal (SÃ©nÃ©gal)", "sn", "221"],
            ["Serbia (Ð¡Ñ€Ð±Ð¸Ñ˜Ð°)", "rs", "381"],
            ["Seychelles", "sc", "248"],
            ["Sierra Leone", "sl", "232"],
            ["Singapore", "sg", "65"],
            ["Sint Maarten", "sx", "1721"],
            ["Slovakia (Slovensko)", "sk", "421"],
            ["Slovenia (Slovenija)", "si", "386"],
            ["Solomon Islands", "sb", "677"],
            ["Somalia (Soomaaliya)", "so", "252"],
            ["South Africa", "za", "27"],
            ["South Korea (ëŒ€í•œë¯¼êµ­)", "kr", "82"],
            ["South Sudan (â€«Ø¬Ù†ÙˆØ¨ Ø§Ù„Ø³ÙˆØ¯Ø§Ù†â€¬â€Ž)", "ss", "211"],
            ["Spain (EspaÃ±a)", "es", "34"],
            ["Sri Lanka (à·à·Šâ€à¶»à·“ à¶½à¶‚à¶šà·à·€)", "lk", "94"],
            ["Sudan (â€«Ø§Ù„Ø³ÙˆØ¯Ø§Ù†â€¬â€Ž)", "sd", "249"],
            ["Suriname", "sr", "597"],
            ["Svalbard and Jan Mayen", "sj", "47", 1],
            ["Swaziland", "sz", "268"],
            ["Sweden (Sverige)", "se", "46"],
            ["Switzerland (Schweiz)", "ch", "41"],
            ["Syria (â€«Ø³ÙˆØ±ÙŠØ§â€¬â€Ž)", "sy", "963"],
            ["Taiwan (å°ç£)", "tw", "886"],
            ["Tajikistan", "tj", "992"],
            ["Tanzania", "tz", "255"],
            ["Thailand (à¹„à¸—à¸¢)", "th", "66"],
            ["Timor-Leste", "tl", "670"],
            ["Togo", "tg", "228"],
            ["Tokelau", "tk", "690"],
            ["Tonga", "to", "676"],
            ["Trinidad and Tobago", "tt", "1868"],
            ["Tunisia (â€«ØªÙˆÙ†Ø³â€¬â€Ž)", "tn", "216"],
            ["Turkey (TÃ¼rkiye)", "tr", "90"],
            ["Turkmenistan", "tm", "993"],
            ["Turks and Caicos Islands", "tc", "1649"],
            ["Tuvalu", "tv", "688"],
            ["U.S. Virgin Islands", "vi", "1340"],
            ["Uganda", "ug", "256"],
            ["Ukraine (Ð£ÐºÑ€Ð°Ñ—Ð½Ð°)", "ua", "380"],
            ["United Arab Emirates (â€«Ø§Ù„Ø¥Ù…Ø§Ø±Ø§Øª Ø§Ù„Ø¹Ø±Ø¨ÙŠØ© Ø§Ù„Ù…ØªØ­Ø¯Ø©â€¬â€Ž)", "ae", "971"],
            ["United Kingdom", "gb", "44", 0],
            ["United States", "us", "1", 0],
            ["Uruguay", "uy", "598"],
            ["Uzbekistan (OÊ»zbekiston)", "uz", "998"],
            ["Vanuatu", "vu", "678"],
            ["Vatican City (CittÃ  del Vaticano)", "va", "39", 1],
            ["Venezuela", "ve", "58"],
            ["Vietnam (Viá»‡t Nam)", "vn", "84"],
            ["Wallis and Futuna", "wf", "681"],
            ["Western Sahara (â€«Ø§Ù„ØµØ­Ø±Ø§Ø¡ Ø§Ù„ØºØ±Ø¨ÙŠØ©â€¬â€Ž)", "eh", "212", 1],
            ["Yemen (â€«Ø§Ù„ÙŠÙ…Ù†â€¬â€Ž)", "ye", "967"],
            ["Zambia", "zm", "260"],
            ["Zimbabwe", "zw", "263"],
            ["Ã…land Islands", "ax", "358", 1]
        ], l = 0; l < k.length; l++) {
        var m = k[l];
        k[l] = {
            name: m[0],
            iso2: m[1],
            dialCode: m[2],
            priority: m[3] || 0,
            areaCodes: m[4] || null
        }
    }
}),
function() {
    function a(a, b) {
        var c = a.split("."),
            d = na;
        c[0] in d || !d.execScript || d.execScript("var " + c[0]);
        for (var e; c.length && (e = c.shift());) c.length || void 0 === b ? d = d[e] ? d[e] : d[e] = {} : d[e] = b
    }

    function b(a, b) {
        function c() {}
        c.prototype = b.prototype, a.xa = b.prototype, a.prototype = new c, a.prototype.constructor = a, a.Da = function(a, c, d) {
            for (var e = Array(arguments.length - 2), f = 2; f < arguments.length; f++) e[f - 2] = arguments[f];
            return b.prototype[c].apply(a, e)
        }
    }

    function c(a, b) {
        null != a && this.append.apply(this, arguments)
    }

    function d(a, b) {
        a.sort(b || e)
    }

    function e(a, b) {
        return a > b ? 1 : b > a ? -1 : 0
    }

    function f(a) {
        var b, c = [],
            d = 0;
        for (b in a) c[d++] = a[b];
        return c
    }

    function g(a, b, c) {
        for (this.ta = a, this.ma = b.name || null, this.n = {}, a = 0; a < c.length; a++) b = c[a], this.n[b.j] = b
    }

    function h(a) {
        return a = f(a.n), d(a, function(a, b) {
            return a.j - b.j
        }), a
    }

    function i(a, b, c) {
        switch (this.j = b, this.ma = c.name, this.da = !!c.pa, this.p = c.a, this.na = c.type, this.ia = !1, this.p) {
            case qa:
            case ra:
            case sa:
            case ta:
            case ua:
            case pa:
            case oa:
                this.ia = !0
        }
        this.w = c.defaultValue
    }

    function j() {
        this.c = {}, this.n = this.e().n, this.g = this.la = null
    }

    function k(a, b) {
        for (var c = h(a.e()), d = 0; d < c.length; d++) {
            var e = c[d],
                f = e.j;
            if (null != b.c[f]) {
                a.g && delete a.g[e.j];
                var g = 11 == e.p || 10 == e.p;
                if (e.da)
                    for (var e = l(b, f) || [], i = 0; i < e.length; i++) q(a, f, g ? e[i].clone() : e[i]);
                else e = l(b, f), g ? (g = l(a, f)) ? k(g, e) : p(a, f, e.clone()) : p(a, f, e)
            }
        }
    }

    function l(a, b) {
        var c = a.c[b];
        if (null == c) return null;
        if (a.la) {
            if (!(b in a.g)) {
                var d = a.la,
                    e = a.n[b];
                if (null != c)
                    if (e.da) {
                        for (var f = [], g = 0; g < c.length; g++) f[g] = d.ca(e, c[g]);
                        c = f
                    } else c = d.ca(e, c);
                return a.g[b] = c
            }
            return a.g[b]
        }
        return c
    }

    function m(a, b, c) {
        var d = l(a, b);
        return a.n[b].da ? d[c || 0] : d
    }

    function n(a, b) {
        var c;
        if (null != a.c[b]) c = m(a, b, void 0);
        else a: {
            if (c = a.n[b], void 0 === c.w) {
                var d = c.na;
                if (d === Boolean) c.w = !1;
                else if (d === Number) c.w = 0;
                else {
                    if (d !== String) {
                        c = new d;
                        break a
                    }
                    c.w = c.ia ? "0" : ""
                }
            }
            c = c.w
        }
        return c
    }

    function o(a, b) {
        return a.n[b].da ? null != a.c[b] ? a.c[b].length : 0 : null != a.c[b] ? 1 : 0
    }

    function p(a, b, c) {
        a.c[b] = c, a.g && (a.g[b] = c)
    }

    function q(a, b, c) {
        a.c[b] || (a.c[b] = []), a.c[b].push(c), a.g && delete a.g[b]
    }

    function r(a, b) {
        delete a.c[b], a.g && delete a.g[b]
    }

    function s(a, b) {
        var c, d = [],
            e = b[0];
        for (c in b) 0 != c && d.push(new i(0, c, b[c]));
        return new g(a, e, d)
    }

    function t() {
        j.call(this)
    }

    function u() {
        j.call(this)
    }

    function v() {
        j.call(this)
    }

    function w() {
        j.call(this)
    }

    function x() {}

    function y() {}

    function z() {}

    function A() {
        this.ua = {}
    }

    function B(a) {
        var b = a.search(Ha);
        return b >= 0 ? (a = a.substring(b), a = a.replace(Ja, ""), b = a.search(Ia), b >= 0 && (a = a.substring(0, b))) : a = "", a
    }

    function C(a) {
        return 2 > a.length ? !1 : X(Ma, a)
    }

    function D(a) {
        return X(Ka, a) ? F(a, Da) : F(a, Ca)
    }

    function E(a) {
        var b = D(a.toString());
        a.clear(), a.append(b)
    }

    function F(a, b) {
        for (var d, e = new c, f = a.length, g = 0; f > g; ++g) d = a.charAt(g), d = b[d.toUpperCase()], null != d && e.append(d);
        return e.toString()
    }

    function G(a) {
        return null != a && isNaN(a) && a.toUpperCase() in Ba
    }

    function H(a, b, c) {
        return "001" == c ? M(a, "" + b) : M(a, c)
    }

    function I(a) {
        var b = "" + m(a, 2);
        return null != a.c[4] && m(a, 4) ? Array(n(a, 8) + 1).join("0") + b : b
    }

    function J(a, b, c, d) {
        switch (b) {
            case 0:
                return "+" + a + c + d;
            case 1:
                return "+" + a + " " + c + d;
            case 3:
                return "tel:+" + a + "-" + c + d;
            default:
                return c + d
        }
    }

    function K(a, b) {
        switch (b) {
            case 4:
                return m(a, 5);
            case 3:
                return m(a, 4);
            case 1:
                return m(a, 3);
            case 0:
            case 2:
                return m(a, 2);
            case 5:
                return m(a, 6);
            case 6:
                return m(a, 8);
            case 7:
                return m(a, 7);
            case 8:
                return m(a, 21);
            case 9:
                return m(a, 25);
            case 10:
                return m(a, 28);
            default:
                return m(a, 1)
        }
    }

    function L(a, b) {
        return N(a, m(b, 1)) ? N(a, m(b, 5)) ? 4 : N(a, m(b, 4)) ? 3 : N(a, m(b, 6)) ? 5 : N(a, m(b, 8)) ? 6 : N(a, m(b, 7)) ? 7 : N(a, m(b, 21)) ? 8 : N(a, m(b, 25)) ? 9 : N(a, m(b, 28)) ? 10 : N(a, m(b, 2)) ? m(b, 18) || N(a, m(b, 3)) ? 2 : 0 : !m(b, 18) && N(a, m(b, 3)) ? 1 : -1 : -1
    }

    function M(a, b) {
        if (null == b) return null;
        b = b.toUpperCase();
        var c = a.ua[b];
        if (null == c) {
            if (c = Ba[b], null == c) return null;
            c = (new z).$(v.e(), c), a.ua[b] = c
        }
        return c
    }

    function N(a, b) {
        return X(n(b, 3), a) && X(n(b, 2), a)
    }

    function O(a, b) {
        if (null == b) return null;
        var c = b.l(),
            c = Aa[c];
        if (null == c) c = null;
        else if (1 == c.length) c = c[0];
        else a: {
            for (var d, e = I(b), f = c.length, g = 0; f > g; g++) {
                d = c[g];
                var h = M(a, d);
                if (null != h.c[23]) {
                    if (0 == e.search(m(h, 23))) {
                        c = d;
                        break a
                    }
                } else if (-1 != L(e, h)) {
                    c = d;
                    break a
                }
            }
            c = null
        }
        return c
    }

    function P(a) {
        return a = Aa[a], null == a ? "ZZ" : a[0]
    }

    function Q(a, b) {
        var c = M(a, b);
        if (null == c) throw "Invalid region code: " + b;
        return c.l()
    }

    function R(a, b) {
        return X(a, b) ? 0 : 0 == b.search(a) ? 3 : 2
    }

    function S(a, b) {
        var c = a.toString();
        if (0 == c.length || "0" == c.charAt(0)) return 0;
        for (var d, e = c.length, f = 1; 3 >= f && e >= f; ++f)
            if (d = parseInt(c.substring(0, f), 10), d in Aa) return b.append(c.substring(f)), d;
        return 0
    }

    function T(a, b, d, e, f) {
        if (0 == a.length) return 0;
        a = new c(a);
        var g;
        null != b && (g = m(b, 11)), null == g && (g = "NonMatch");
        var h = a.toString();
        if (0 == h.length) g = 20;
        else if (Fa.test(h)) h = h.replace(Fa, ""), a.clear(), a.append(D(h)), g = 1;
        else {
            if (h = new RegExp(g), E(a), g = a.toString(), 0 == g.search(h)) {
                var h = g.match(h)[0].length,
                    i = g.substring(h).match(Ga);
                i && null != i[1] && 0 < i[1].length && "0" == F(i[1], Ca) ? g = !1 : (a.clear(), a.append(g.substring(h)), g = !0)
            } else g = !1;
            g = g ? 5 : 20
        }
        if (e && p(f, 6, g), 20 != g) {
            if (2 >= a.f.length) throw "Phone number too short after IDD";
            if (d = S(a, d), 0 != d) return f.ba(d), d;
            throw "Invalid country calling code"
        }
        if (null != b && (g = b.l(), h = "" + g, i = a.toString(), 0 == i.lastIndexOf(h, 0))) {
            var j = new c(i.substring(h.length)),
                i = m(b, 1),
                h = new RegExp(n(i, 2));
            if (U(j, b, null), b = j.toString(), i = n(i, 3), !X(h, a.toString()) && X(h, b) || 3 == R(i, a.toString())) return d.append(b), e && p(f, 6, 10), f.ba(g), g
        }
        return f.ba(0), 0
    }

    function U(a, b, c) {
        var d = a.toString(),
            e = d.length,
            f = m(b, 15);
        if (0 != e && null != f && 0 != f.length && (f = new RegExp("^(?:" + f + ")"), e = f.exec(d))) {
            var g, h = RegExp;
            g = m(b, 1), g = n(g, 2), h = new h(g), g = X(h, d);
            var i = e.length - 1;
            b = m(b, 16), null == b || 0 == b.length || null == e[i] || 0 == e[i].length ? (!g || X(h, d.substring(e[0].length))) && (null != c && i > 0 && null != e[i] && c.append(e[1]), a.set(d.substring(e[0].length))) : (d = d.replace(f, b), (!g || X(h, d)) && (null != c && i > 0 && c.append(e[1]), a.set(d)))
        }
    }

    function V(a, b, c) {
        if (!G(c) && 0 < b.length && "+" != b.charAt(0)) throw "Invalid country calling code";
        return W(a, b, c, !0)
    }

    function W(a, b, d, e) {
        if (null == b) throw "The string supplied did not seem to be a phone number";
        if (250 < b.length) throw "The string supplied is too long to be a phone number";
        var f = new c,
            g = b.indexOf(";phone-context=");
        if (g > 0) {
            var h = g + 15;
            if ("+" == b.charAt(h)) {
                var i = b.indexOf(";", h);
                i > 0 ? f.append(b.substring(h, i)) : f.append(b.substring(h))
            }
            h = b.indexOf("tel:"), f.append(b.substring(h >= 0 ? h + 4 : 0, g))
        } else f.append(B(b));
        if (g = f.toString(), h = g.indexOf(";isub="), h > 0 && (f.clear(), f.append(g.substring(0, h))), !C(f.toString())) throw "The string supplied did not seem to be a phone number";
        if (g = f.toString(), !(G(d) || null != g && 0 < g.length && Fa.test(g))) throw "Invalid country calling code";
        g = new w, e && p(g, 5, b);
        a: {
            if (b = f.toString(), h = b.search(La), h >= 0 && C(b.substring(0, h)))
                for (var i = b.match(La), j = i.length, k = 1; j > k; ++k)
                    if (null != i[k] && 0 < i[k].length) {
                        f.clear(), f.append(b.substring(0, h)), b = i[k];
                        break a
                    }
            b = ""
        }
        0 < b.length && p(g, 3, b), h = M(a, d), b = new c, i = 0, j = f.toString();
        try {
            i = T(j, h, b, e, g)
        } catch (l) {
            if ("Invalid country calling code" != l || !Fa.test(j)) throw l;
            if (j = j.replace(Fa, ""), i = T(j, h, b, e, g), 0 == i) throw l
        }
        if (0 != i ? (f = P(i), f != d && (h = H(a, i, f))) : (E(f), b.append(f.toString()), null != d ? (i = h.l(), g.ba(i)) : e && r(g, 6)), 2 > b.f.length) throw "The string supplied is too short to be a phone number";
        if (null != h && (a = new c, d = new c(b.toString()), U(d, h, a), f = d.toString(), h = m(h, 1), h = n(h, 3), 2 != R(h, f) && (b = d, e && p(g, 7, a.toString()))), e = b.toString(), a = e.length, 2 > a) throw "The string supplied is too short to be a phone number";
        if (a > 17) throw "The string supplied is too long to be a phone number";
        if (1 < e.length && "0" == e.charAt(0)) {
            for (p(g, 4, !0), a = 1; a < e.length - 1 && "0" == e.charAt(a);) a++;
            1 != a && p(g, 8, a)
        }
        return p(g, 2, parseInt(e, 10)), g
    }

    function X(a, b) {
        var c = "string" == typeof a ? b.match("^(?:" + a + ")$") : b.match(a);
        return c && c[0].length == b.length ? !0 : !1
    }

    function Y(a) {
        this.qa = "â€ˆ", this.fa = new RegExp(this.qa), this.ga = "", this.q = new c, this.v = "", this.k = new c, this.u = new c, this.m = !0, this.aa = this.s = this.ka = !1, this.oa = A.r(), this.t = 0, this.d = new c, this.ea = !1, this.o = "", this.b = new c, this.h = [], this.ha = a, this.va = this.i = Z(this, this.ha)
    }

    function Z(a, b) {
        var c = G(b) ? Q(a.oa, b) : 0,
            c = M(a.oa, P(c));
        return null != c ? c : Pa
    }

    function $(a) {
        for (var b = a.h.length, c = 0; b > c; ++c) {
            var d = a.h[c],
                e = n(d, 1);
            if (a.v == e) return !1;
            var f;
            f = a;
            var g = d,
                h = n(g, 1);
            if (-1 != h.indexOf("|")) f = !1;
            else {
                h = h.replace(Qa, "\\d"), h = h.replace(Ra, "\\d"), f.q.clear();
                var i;
                i = f;
                var g = n(g, 2),
                    j = "999999999999999".match(h)[0];
                j.length < i.b.f.length ? i = "" : (h = j.replace(new RegExp(h, "g"), g), i = h = h.replace(RegExp("9", "g"), i.qa)), 0 < i.length ? (f.q.append(i), f = !0) : f = !1
            }
            if (f) return a.v = e, a.ea = Ta.test(m(d, 4)), a.t = 0, !0
        }
        return a.m = !1
    }

    function _(a, b) {
        for (var c = [], d = b.length - 3, e = a.h.length, f = 0; e > f; ++f) {
            var g = a.h[f];
            if (0 == o(g, 3)) c.push(a.h[f]);
            else {
                var h = Math.min(d, o(g, 3) - 1),
                    g = m(g, 3, h);
                0 == b.search(g) && c.push(a.h[f])
            }
        }
        a.h = c
    }

    function aa(a, b) {
        return a.ga = ba(a, b), a.ga
    }

    function ba(a, b) {
        a.k.append(b);
        var c = b;
        if (Ga.test(c) || 1 == a.k.f.length && Ea.test(c)) {
            var d, c = b;
            "+" == c ? (d = c, a.u.append(c)) : (d = Ca[c], a.u.append(d), a.b.append(d)), b = d
        } else a.m = !1, a.ka = !0;
        if (!a.m) {
            if (!a.ka)
                if (ia(a)) {
                    if (ja(a)) return ca(a)
                } else if (0 < a.o.length && (c = a.b.toString(), a.b.clear(), a.b.append(a.o), a.b.append(c), c = a.d.toString(), d = c.lastIndexOf(a.o), a.d.clear(), a.d.append(c.substring(0, d))), a.o != ha(a)) return a.d.append(" "), ca(a);
            return a.k.toString()
        }
        switch (a.u.f.length) {
            case 0:
            case 1:
            case 2:
                return a.k.toString();
            case 3:
                if (!ia(a)) return a.o = ha(a), fa(a);
                a.aa = !0;
            default:
                return a.aa ? (ja(a) && (a.aa = !1), a.d.toString() + a.b.toString()) : 0 < a.h.length ? (c = ka(a, b), d = da(a), 0 < d.length ? d : (_(a, a.b.toString()), $(a) ? ga(a) : a.m ? ea(a, c) : a.k.toString())) : fa(a)
        }
    }

    function ca(a) {
        return a.m = !0, a.aa = !1, a.h = [], a.t = 0, a.q.clear(), a.v = "", fa(a)
    }

    function da(a) {
        for (var b = a.b.toString(), c = a.h.length, d = 0; c > d; ++d) {
            var e = a.h[d],
                f = n(e, 1);
            if (new RegExp("^(?:" + f + ")$").test(b)) return a.ea = Ta.test(m(e, 4)), b = b.replace(new RegExp(f, "g"), m(e, 2)), ea(a, b)
        }
        return ""
    }

    function ea(a, b) {
        var c = a.d.f.length;
        return a.ea && c > 0 && " " != a.d.toString().charAt(c - 1) ? a.d + " " + b : a.d + b
    }

    function fa(a) {
        var b = a.b.toString();
        if (3 <= b.length) {
            for (var c = a.s && 0 < o(a.i, 20) ? l(a.i, 20) || [] : l(a.i, 19) || [], d = c.length, e = 0; d > e; ++e) {
                var f, g = c[e];
                (f = null == a.i.c[12] || a.s || m(g, 6)) || (f = n(g, 4), f = 0 == f.length || Oa.test(f)), f && (f = n(g, 2), Sa.test(f) && a.h.push(g))
            }
            return _(a, b), b = da(a), 0 < b.length ? b : $(a) ? ga(a) : a.k.toString()
        }
        return ea(a, b)
    }

    function ga(a) {
        var b = a.b.toString(),
            c = b.length;
        if (c > 0) {
            for (var d = "", e = 0; c > e; e++) d = ka(a, b.charAt(e));
            return a.m ? ea(a, d) : a.k.toString()
        }
        return a.d.toString()
    }

    function ha(a) {
        var b, c = a.b.toString(),
            d = 0;
        return 1 != a.i.ra() ? b = !1 : (b = a.b.toString(), b = "1" == b.charAt(0) && "0" != b.charAt(1) && "1" != b.charAt(1)), b ? (d = 1, a.d.append("1").append(" "), a.s = !0) : null != a.i.c[15] && (b = new RegExp("^(?:" + m(a.i, 15) + ")"), b = c.match(b), null != b && null != b[0] && 0 < b[0].length && (a.s = !0, d = b[0].length, a.d.append(c.substring(0, d)))), a.b.clear(), a.b.append(c.substring(d)), c.substring(0, d)
    }

    function ia(a) {
        var b = a.u.toString(),
            c = new RegExp("^(?:\\+|" + m(a.i, 11) + ")"),
            c = b.match(c);
        return null != c && null != c[0] && 0 < c[0].length ? (a.s = !0, c = c[0].length, a.b.clear(), a.b.append(b.substring(c)), a.d.clear(), a.d.append(b.substring(0, c)), "+" != b.charAt(0) && a.d.append(" "), !0) : !1
    }

    function ja(a) {
        if (0 == a.b.f.length) return !1;
        var b = new c,
            d = S(a.b, b);
        return 0 == d ? !1 : (a.b.clear(), a.b.append(b.toString()), b = P(d), "001" == b ? a.i = M(a.oa, "" + d) : b != a.ha && (a.i = Z(a, b)), a.d.append("" + d).append(" "), a.o = "", !0)
    }

    function ka(a, b) {
        var c = a.q.toString();
        if (0 <= c.substring(a.t).search(a.fa)) {
            var d = c.search(a.fa),
                c = c.replace(a.fa, b);
            return a.q.clear(), a.q.append(c), a.t = d, c.substring(0, a.t + 1)
        }
        return 1 == a.h.length && (a.m = !1), a.v = "", a.k.toString()
    }

    function la(a, b) {
        try {
            var c, d = A.r(),
                e = V(d, a, b),
                f = I(e),
                g = e.l();
            if (g in Aa) {
                var h, i = H(d, g, P(g));
                h = m(i, 1);
                var j = n(h, 3);
                c = R(j, f)
            } else c = 1;
            return c
        } catch (k) {
            return "Invalid country calling code" == k ? 1 : "The string supplied did not seem to be a phone number" == k ? 4 : "Phone number too short after IDD" == k || "The string supplied is too short to be a phone number" == k ? 2 : "The string supplied is too long to be a phone number" == k ? 3 : -99
        }
    }
    var ma, na = this;
    ma = c.prototype, ma.f = "", ma.set = function(a) {
        this.f = "" + a
    }, ma.append = function(a, b, c) {
        if (this.f += a, null != b)
            for (var d = 1; d < arguments.length; d++) this.f += arguments[d];
        return this
    }, ma.clear = function() {
        this.f = ""
    }, ma.toString = function() {
        return this.f
    }, g.prototype.getName = function() {
        return this.ma
    };
    var oa = 1,
        pa = 2,
        qa = 3,
        ra = 4,
        sa = 6,
        ta = 16,
        ua = 18;
    i.prototype.getName = function() {
        return this.ma
    }, ma = j.prototype, ma.e = function() {
        var a = this.constructor;
        return a.wa || (a.wa = s(a, a.Ea))
    }, ma.has = function(a) {
        return null != this.c[a.j]
    }, ma.get = function(a, b) {
        return m(this, a.j, b)
    }, ma.set = function(a, b) {
        p(this, a.j, b)
    }, ma.add = function(a, b) {
        q(this, a.j, b)
    }, ma.clear = function(a) {
        r(this, a.j)
    }, ma.clone = function() {
        var a = new this.constructor;
        return a != this && (a.c = {}, a.g && (a.g = {}), k(a, this)), a
    };
    var va;
    b(t, j);
    var wa;
    b(u, j);
    var xa;
    b(v, j), v.prototype.ra = function() {
        return m(this, 10)
    }, v.prototype.l = function() {
        return n(this, 10)
    }, v.prototype.ba = function(a) {
        p(this, 10, a)
    }, t.prototype.e = function() {
        return va || (va = s(t, {
            0: {
                name: "NumberFormat",
                ja: "i18n.phonenumbers.NumberFormat"
            },
            1: {
                name: "pattern",
                required: !0,
                a: 9,
                type: String
            },
            2: {
                name: "format",
                required: !0,
                a: 9,
                type: String
            },
            3: {
                name: "leading_digits_pattern",
                pa: !0,
                a: 9,
                type: String
            },
            4: {
                name: "national_prefix_formatting_rule",
                a: 9,
                type: String
            },
            6: {
                name: "national_prefix_optional_when_formatting",
                a: 8,
                type: Boolean
            },
            5: {
                name: "domestic_carrier_code_formatting_rule",
                a: 9,
                type: String
            }
        })), va
    }, t.ctor = t, t.ctor.e = t.prototype.e, u.prototype.e = function() {
        return wa || (wa = s(u, {
            0: {
                name: "PhoneNumberDesc",
                ja: "i18n.phonenumbers.PhoneNumberDesc"
            },
            2: {
                name: "national_number_pattern",
                a: 9,
                type: String
            },
            3: {
                name: "possible_number_pattern",
                a: 9,
                type: String
            },
            6: {
                name: "example_number",
                a: 9,
                type: String
            },
            7: {
                name: "national_number_matcher_data",
                a: 12,
                type: String
            },
            8: {
                name: "possible_number_matcher_data",
                a: 12,
                type: String
            }
        })), wa
    }, u.ctor = u, u.ctor.e = u.prototype.e, v.prototype.e = function() {
        return xa || (xa = s(v, {
            0: {
                name: "PhoneMetadata",
                ja: "i18n.phonenumbers.PhoneMetadata"
            },
            1: {
                name: "general_desc",
                a: 11,
                type: u
            },
            2: {
                name: "fixed_line",
                a: 11,
                type: u
            },
            3: {
                name: "mobile",
                a: 11,
                type: u
            },
            4: {
                name: "toll_free",
                a: 11,
                type: u
            },
            5: {
                name: "premium_rate",
                a: 11,
                type: u
            },
            6: {
                name: "shared_cost",
                a: 11,
                type: u
            },
            7: {
                name: "personal_number",
                a: 11,
                type: u
            },
            8: {
                name: "voip",
                a: 11,
                type: u
            },
            21: {
                name: "pager",
                a: 11,
                type: u
            },
            25: {
                name: "uan",
                a: 11,
                type: u
            },
            27: {
                name: "emergency",
                a: 11,
                type: u
            },
            28: {
                name: "voicemail",
                a: 11,
                type: u
            },
            24: {
                name: "no_international_dialling",
                a: 11,
                type: u
            },
            9: {
                name: "id",
                required: !0,
                a: 9,
                type: String
            },
            10: {
                name: "country_code",
                a: 5,
                type: Number
            },
            11: {
                name: "international_prefix",
                a: 9,
                type: String
            },
            17: {
                name: "preferred_international_prefix",
                a: 9,
                type: String
            },
            12: {
                name: "national_prefix",
                a: 9,
                type: String
            },
            13: {
                name: "preferred_extn_prefix",
                a: 9,
                type: String
            },
            15: {
                name: "national_prefix_for_parsing",
                a: 9,
                type: String
            },
            16: {
                name: "national_prefix_transform_rule",
                a: 9,
                type: String
            },
            18: {
                name: "same_mobile_and_fixed_line_pattern",
                a: 8,
                defaultValue: !1,
                type: Boolean
            },
            19: {
                name: "number_format",
                pa: !0,
                a: 11,
                type: t
            },
            20: {
                name: "intl_number_format",
                pa: !0,
                a: 11,
                type: t
            },
            22: {
                name: "main_country_for_code",
                a: 8,
                defaultValue: !1,
                type: Boolean
            },
            23: {
                name: "leading_digits",
                a: 9,
                type: String
            },
            26: {
                name: "leading_zero_possible",
                a: 8,
                defaultValue: !1,
                type: Boolean
            }
        })), xa
    }, v.ctor = v, v.ctor.e = v.prototype.e;
    var ya;
    b(w, j), w.prototype.ra = function() {
        return m(this, 1)
    }, w.prototype.l = function() {
        return n(this, 1)
    }, w.prototype.ba = function(a) {
        p(this, 1, a)
    }, w.prototype.getExtension = function() {
        return m(this, 3)
    };
    var za = {
        Ca: 1,
        Ba: 5,
        Aa: 10,
        za: 20
    };
    w.prototype.e = function() {
        return ya || (ya = s(w, {
            0: {
                name: "PhoneNumber",
                ja: "i18n.phonenumbers.PhoneNumber"
            },
            1: {
                name: "country_code",
                required: !0,
                a: 5,
                type: Number
            },
            2: {
                name: "national_number",
                required: !0,
                a: 4,
                type: Number
            },
            3: {
                name: "extension",
                a: 9,
                type: String
            },
            4: {
                name: "italian_leading_zero",
                a: 8,
                type: Boolean
            },
            8: {
                name: "number_of_leading_zeros",
                a: 5,
                defaultValue: 1,
                type: Number
            },
            5: {
                name: "raw_input",
                a: 9,
                type: String
            },
            6: {
                name: "country_code_source",
                a: 14,
                defaultValue: 1,
                type: za
            },
            7: {
                name: "preferred_domestic_carrier_code",
                a: 9,
                type: String
            }
        })), ya
    }, w.ctor = w, w.ctor.e = w.prototype.e, x.prototype.$ = function(a) {
        throw new a.ta, Error("Unimplemented")
    }, x.prototype.ca = function(a, b) {
        if (11 == a.p || 10 == a.p) return b instanceof j ? b : this.$(a.na.e(), b);
        if (14 == a.p || !a.ia) return b;
        var c = a.na;
        if (c === String) {
            if ("number" == typeof b) return String(b)
        } else if (c === Number && "string" == typeof b && ("Infinity" === b || "-Infinity" === b || "NaN" === b || /^-?[0-9]+$/.test(b))) return Number(b);
        return b
    }, b(y, x), y.prototype.$ = function(a, b) {
        var c = new a.ta;
        return c.la = this, c.c = b, c.g = {}, c
    }, b(z, y), z.prototype.ya = !1, z.prototype.ca = function(a, b) {
        return 8 == a.p ? !!b : x.prototype.ca.apply(this, arguments)
    }, z.prototype.$ = function(a, b) {
        var c = b;
        if (this.ya) {
            var d, c = [];
            for (d in b) c[parseInt(d, 10) + 1] = b[d]
        }
        return z.xa.$.call(this, a, c)
    };
    var Aa = {
            1: "US AG AI AS BB BM BS CA DM DO GD GU JM KN KY LC MP MS PR SX TC TT VC VG VI".split(" "),
            7: ["RU", "KZ"],
            20: ["EG"],
            27: ["ZA"],
            30: ["GR"],
            31: ["NL"],
            32: ["BE"],
            33: ["FR"],
            34: ["ES"],
            36: ["HU"],
            39: ["IT", "VA"],
            40: ["RO"],
            41: ["CH"],
            43: ["AT"],
            44: ["GB", "GG", "IM", "JE"],
            45: ["DK"],
            46: ["SE"],
            47: ["NO", "SJ"],
            48: ["PL"],
            49: ["DE"],
            51: ["PE"],
            52: ["MX"],
            53: ["CU"],
            54: ["AR"],
            55: ["BR"],
            56: ["CL"],
            57: ["CO"],
            58: ["VE"],
            60: ["MY"],
            61: ["AU", "CC", "CX"],
            62: ["ID"],
            63: ["PH"],
            64: ["NZ"],
            65: ["SG"],
            66: ["TH"],
            81: ["JP"],
            82: ["KR"],
            84: ["VN"],
            86: ["CN"],
            90: ["TR"],
            91: ["IN"],
            92: ["PK"],
            93: ["AF"],
            94: ["LK"],
            95: ["MM"],
            98: ["IR"],
            211: ["SS"],
            212: ["MA", "EH"],
            213: ["DZ"],
            216: ["TN"],
            218: ["LY"],
            220: ["GM"],
            221: ["SN"],
            222: ["MR"],
            223: ["ML"],
            224: ["GN"],
            225: ["CI"],
            226: ["BF"],
            227: ["NE"],
            228: ["TG"],
            229: ["BJ"],
            230: ["MU"],
            231: ["LR"],
            232: ["SL"],
            233: ["GH"],
            234: ["NG"],
            235: ["TD"],
            236: ["CF"],
            237: ["CM"],
            238: ["CV"],
            239: ["ST"],
            240: ["GQ"],
            241: ["GA"],
            242: ["CG"],
            243: ["CD"],
            244: ["AO"],
            245: ["GW"],
            246: ["IO"],
            247: ["AC"],
            248: ["SC"],
            249: ["SD"],
            250: ["RW"],
            251: ["ET"],
            252: ["SO"],
            253: ["DJ"],
            254: ["KE"],
            255: ["TZ"],
            256: ["UG"],
            257: ["BI"],
            258: ["MZ"],
            260: ["ZM"],
            261: ["MG"],
            262: ["RE", "YT"],
            263: ["ZW"],
            264: ["NA"],
            265: ["MW"],
            266: ["LS"],
            267: ["BW"],
            268: ["SZ"],
            269: ["KM"],
            290: ["SH", "TA"],
            291: ["ER"],
            297: ["AW"],
            298: ["FO"],
            299: ["GL"],
            350: ["GI"],
            351: ["PT"],
            352: ["LU"],
            353: ["IE"],
            354: ["IS"],
            355: ["AL"],
            356: ["MT"],
            357: ["CY"],
            358: ["FI", "AX"],
            359: ["BG"],
            370: ["LT"],
            371: ["LV"],
            372: ["EE"],
            373: ["MD"],
            374: ["AM"],
            375: ["BY"],
            376: ["AD"],
            377: ["MC"],
            378: ["SM"],
            380: ["UA"],
            381: ["RS"],
            382: ["ME"],
            385: ["HR"],
            386: ["SI"],
            387: ["BA"],
            389: ["MK"],
            420: ["CZ"],
            421: ["SK"],
            423: ["LI"],
            500: ["FK"],
            501: ["BZ"],
            502: ["GT"],
            503: ["SV"],
            504: ["HN"],
            505: ["NI"],
            506: ["CR"],
            507: ["PA"],
            508: ["PM"],
            509: ["HT"],
            590: ["GP", "BL", "MF"],
            591: ["BO"],
            592: ["GY"],
            593: ["EC"],
            594: ["GF"],
            595: ["PY"],
            596: ["MQ"],
            597: ["SR"],
            598: ["UY"],
            599: ["CW", "BQ"],
            670: ["TL"],
            672: ["NF"],
            673: ["BN"],
            674: ["NR"],
            675: ["PG"],
            676: ["TO"],
            677: ["SB"],
            678: ["VU"],
            679: ["FJ"],
            680: ["PW"],
            681: ["WF"],
            682: ["CK"],
            683: ["NU"],
            685: ["WS"],
            686: ["KI"],
            687: ["NC"],
            688: ["TV"],
            689: ["PF"],
            690: ["TK"],
            691: ["FM"],
            692: ["MH"],
            800: ["001"],
            808: ["001"],
            850: ["KP"],
            852: ["HK"],
            853: ["MO"],
            855: ["KH"],
            856: ["LA"],
            870: ["001"],
            878: ["001"],
            880: ["BD"],
            881: ["001"],
            882: ["001"],
            883: ["001"],
            886: ["TW"],
            888: ["001"],
            960: ["MV"],
            961: ["LB"],
            962: ["JO"],
            963: ["SY"],
            964: ["IQ"],
            965: ["KW"],
            966: ["SA"],
            967: ["YE"],
            968: ["OM"],
            970: ["PS"],
            971: ["AE"],
            972: ["IL"],
            973: ["BH"],
            974: ["QA"],
            975: ["BT"],
            976: ["MN"],
            977: ["NP"],
            979: ["001"],
            992: ["TJ"],
            993: ["TM"],
            994: ["AZ"],
            995: ["GE"],
            996: ["KG"],
            998: ["UZ"]
        },
        Ba = {
            AC: [, [, , "[46]\\d{4}|[01589]\\d{5}", "\\d{5,6}"],
                [, , "6[2-467]\\d{3}", "\\d{5}", , , "62889"],
                [, , "4\\d{4}", "\\d{5}", , , "40123"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "AC", 247, "00", , , , , , , , , , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "[01589]\\d{5}", "\\d{6}", , , "542011"], , , [, , "NA", "NA"]
            ],
            AD: [, [, , "(?:[346-9]|180)\\d{5}", "\\d{6,8}"],
                [, , "[78]\\d{5}", "\\d{6}", , , "712345"],
                [, , "[346]\\d{5}", "\\d{6}", , , "312345"],
                [, , "180[02]\\d{4}", "\\d{8}", , , "18001234"],
                [, , "9\\d{5}", "\\d{6}", , , "912345"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "AD", 376, "00", , , , , , , , [
                    [, "(\\d{3})(\\d{3})", "$1 $2", ["[346-9]"]],
                    [, "(180[02])(\\d{4})", "$1 $2", ["1"]]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            AE: [, [, , "[2-79]\\d{7,8}|800\\d{2,9}", "\\d{5,12}"],
                [, , "[2-4679][2-8]\\d{6}", "\\d{7,8}", , , "22345678"],
                [, , "5[0256]\\d{7}", "\\d{9}", , , "501234567"],
                [, , "400\\d{6}|800\\d{2,9}", "\\d{5,12}", , , "800123456"],
                [, , "900[02]\\d{5}", "\\d{9}", , , "900234567"],
                [, , "700[05]\\d{5}", "\\d{9}", , , "700012345"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "AE", 971, "00", "0", , , "0", , , , [
                    [, "([2-4679])(\\d{3})(\\d{4})", "$1 $2 $3", ["[2-4679][2-8]"], "0$1"],
                    [, "(5[0256])(\\d{3})(\\d{4})", "$1 $2 $3", ["5"], "0$1"],
                    [, "([479]00)(\\d)(\\d{5})", "$1 $2 $3", ["[479]0"], "$1"],
                    [, "([68]00)(\\d{2,9})", "$1 $2", ["60|8"], "$1"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "600[25]\\d{5}", "\\d{9}", , , "600212345"], , , [, , "NA", "NA"]
            ],
            AF: [, [, , "[2-7]\\d{8}", "\\d{7,9}"],
                [, , "(?:[25][0-8]|[34][0-4]|6[0-5])[2-9]\\d{6}", "\\d{7,9}", , , "234567890"],
                [, , "7(?:[014-9]\\d{7}|2[89]\\d{6})", "\\d{9}", , , "701234567"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "AF", 93, "00", "0", , , "0", , , , [
                    [, "([2-7]\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["[2-7]"], "0$1"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            AG: [, [, , "[2589]\\d{9}", "\\d{7}(?:\\d{3})?"],
                [, , "268(?:4(?:6[0-38]|84)|56[0-2])\\d{4}", "\\d{7}(?:\\d{3})?", , , "2684601234"],
                [, , "268(?:464|7(?:2[0-9]|64|7[0-689]|8[02-68]))\\d{4}", "\\d{10}", , , "2684641234"],
                [, , "8(?:00|44|55|66|77|88)[2-9]\\d{6}", "\\d{10}", , , "8002123456"],
                [, , "900[2-9]\\d{6}", "\\d{10}", , , "9002123456"],
                [, , "NA", "NA"],
                [, , "5(?:00|33|44|66|77)[2-9]\\d{6}", "\\d{10}", , , "5002345678"],
                [, , "26848[01]\\d{4}", "\\d{10}", , , "2684801234"], "AG", 1, "011", "1", , , "1", , , , , , [, , "26840[69]\\d{4}", "\\d{10}", , , "2684061234"], , "268", [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            AI: [, [, , "[2589]\\d{9}", "\\d{7}(?:\\d{3})?"],
                [, , "2644(?:6[12]|9[78])\\d{4}", "\\d{7}(?:\\d{3})?", , , "2644612345"],
                [, , "264(?:235|476|5(?:3[6-9]|8[1-4])|7(?:29|72))\\d{4}", "\\d{10}", , , "2642351234"],
                [, , "8(?:00|44|55|66|77|88)[2-9]\\d{6}", "\\d{10}", , , "8002123456"],
                [, , "900[2-9]\\d{6}", "\\d{10}", , , "9002123456"],
                [, , "NA", "NA"],
                [, , "5(?:00|33|44|66|77)[2-9]\\d{6}", "\\d{10}", , , "5002345678"],
                [, , "NA", "NA"], "AI", 1, "011", "1", , , "1", , , , , , [, , "NA", "NA"], , "264", [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            AL: [, [, , "[2-57]\\d{7}|6\\d{8}|8\\d{5,7}|9\\d{5}", "\\d{5,9}"],
                [, , "(?:2(?:[168][1-9]|[247]\\d|9[1-7])|3(?:1[1-3]|[2-6]\\d|[79][1-8]|8[1-9])|4\\d{2}|5(?:1[1-4]|[2-578]\\d|6[1-5]|9[1-7])|8(?:[19][1-5]|[2-6]\\d|[78][1-7]))\\d{5}", "\\d{5,8}", , , "22345678"],
                [, , "6[6-9]\\d{7}", "\\d{9}", , , "661234567"],
                [, , "800\\d{4}", "\\d{7}", , , "8001234"],
                [, , "900\\d{3}", "\\d{6}", , , "900123"],
                [, , "808\\d{3}", "\\d{6}", , , "808123"],
                [, , "700\\d{5}", "\\d{8}", , , "70012345"],
                [, , "NA", "NA"], "AL", 355, "00", "0", , , "0", , , , [
                    [, "(4)(\\d{3})(\\d{4})", "$1 $2 $3", ["4[0-6]"], "0$1"],
                    [, "(6[6-9])(\\d{3})(\\d{4})", "$1 $2 $3", ["6"], "0$1"],
                    [, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2358][2-5]|4[7-9]"], "0$1"],
                    [, "(\\d{3})(\\d{3,5})", "$1 $2", ["[235][16-9]|8[016-9]|[79]"], "0$1"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            AM: [, [, , "[1-9]\\d{7}", "\\d{5,8}"],
                [, , "(?:1[01]\\d|2(?:2[2-46]|3[1-8]|4[2-69]|5[2-7]|6[1-9]|8[1-7])|3[12]2|47\\d)\\d{5}", "\\d{5,8}", , , "10123456"],
                [, , "(?:4[139]|55|77|9[1-9])\\d{6}", "\\d{8}", , , "77123456"],
                [, , "800\\d{5}", "\\d{8}", , , "80012345"],
                [, , "90[016]\\d{5}", "\\d{8}", , , "90012345"],
                [, , "80[1-4]\\d{5}", "\\d{8}", , , "80112345"],
                [, , "NA", "NA"],
                [, , "60[2-6]\\d{5}", "\\d{8}", , , "60271234"], "AM", 374, "00", "0", , , "0", , , , [
                    [, "(\\d{2})(\\d{6})", "$1 $2", ["1|47"], "(0$1)"],
                    [, "(\\d{2})(\\d{6})", "$1 $2", ["4[139]|[5-7]|9[1-9]"], "0$1"],
                    [, "(\\d{3})(\\d{5})", "$1 $2", ["[23]"], "(0$1)"],
                    [, "(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["8|90"], "0 $1"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            AO: [, [, , "[29]\\d{8}", "\\d{9}"],
                [, , "2\\d(?:[26-9]\\d|\\d[26-9])\\d{5}", "\\d{9}", , , "222123456"],
                [, , "9[1-49]\\d{7}", "\\d{9}", , , "923123456"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "AO", 244, "00", , , , , , , , [
                    [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            AR: [, [, , "11\\d{8}|[2368]\\d{9}|9\\d{10}", "\\d{6,11}"],
                [, , "11\\d{8}|(?:2(?:2(?:[013]\\d|2[13-79]|4[1-6]|5[2457]|6[124-8]|7[1-4]|8[13-6]|9[1267])|3(?:1[467]|2[03-6]|3[13-8]|[49][2-6]|5[2-8]|[067]\\d)|4(?:7[3-8]|9\\d)|6(?:[01346]\\d|2[24-6]|5[15-8])|80\\d|9(?:[0124789]\\d|3[1-6]|5[234]|6[2-46]))|3(?:3(?:2[79]|6\\d|8[2578])|4(?:[78]\\d|0[0124-9]|[1-35]\\d|4[24-7]|6[02-9]|9[123678])|5(?:[138]\\d|2[1245]|4[1-9]|6[2-4]|7[1-6])|6[24]\\d|7(?:[0469]\\d|1[1568]|2[013-9]|3[145]|5[14-8]|7[2-57]|8[0-24-9])|8(?:[013578]\\d|2[15-7]|4[13-6]|6[1-357-9]|9[124]))|670\\d)\\d{6}", "\\d{6,10}", , , "1123456789"],
                [, , "675\\d{7}|9(?:11[2-9]\\d{7}|(?:2(?:2[013]|3[067]|49|6[01346]|80|9[147-9])|3(?:36|4[12358]|5[138]|6[24]|7[069]|8[013578]))[2-9]\\d{6}|\\d{4}[2-9]\\d{5})", "\\d{6,11}", , , "91123456789"],
                [, , "800\\d{7}", "\\d{10}", , , "8001234567"],
                [, , "60[04579]\\d{7}", "\\d{10}", , , "6001234567"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "AR", 54, "00", "0", , , "0?(?:(11|2(?:2(?:02?|[13]|2[13-79]|4[1-6]|5[2457]|6[124-8]|7[1-4]|8[13-6]|9[1267])|3(?:02?|1[467]|2[03-6]|3[13-8]|[49][2-6]|5[2-8]|[67])|4(?:7[3-578]|9)|6(?:[0136]|2[24-6]|4[6-8]?|5[15-8])|80|9(?:0[1-3]|[19]|2\\d|3[1-6]|4[02568]?|5[2-4]|6[2-46]|72?|8[23]?))|3(?:3(?:2[79]|6|8[2578])|4(?:0[0-24-9]|[12]|3[5-8]?|4[24-7]|5[4-68]?|6[02-9]|7[126]|8[2379]?|9[1-36-8])|5(?:1|2[1245]|3[237]?|4[1-46-9]|6[2-4]|7[1-6]|8[2-5]?)|6[24]|7(?:[069]|1[1568]|2[15]|3[145]|4[13]|5[14-8]|7[2-57]|8[126])|8(?:[01]|2[15-7]|3[2578]?|4[13-6]|5[4-8]?|6[1-357-9]|7[36-8]?|8[5-8]?|9[124])))?15)?", "9$1", , , [
                    [, "([68]\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["[68]"], "0$1"],
                    [, "(\\d{2})(\\d{4})", "$1-$2", ["[2-9]"], "$1"],
                    [, "(\\d{3})(\\d{4})", "$1-$2", ["[2-9]"], "$1"],
                    [, "(\\d{4})(\\d{4})", "$1-$2", ["[2-9]"], "$1"],
                    [, "(9)(11)(\\d{4})(\\d{4})", "$2 15-$3-$4", ["911"], "0$1"],
                    [, "(9)(\\d{3})(\\d{3})(\\d{4})", "$2 15-$3-$4", ["9(?:2[234689]|3[3-8])", "9(?:2(?:2[013]|3[067]|49|6[01346]|80|9[147-9])|3(?:36|4[1-358]|5[138]|6[24]|7[069]|8[013578]))", "9(?:2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3[456]|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45])))", "9(?:2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3(?:4|5[014]|6[1239])|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45])))"], "0$1"],
                    [, "(9)(\\d{4})(\\d{2})(\\d{4})", "$2 15-$3-$4", ["9[23]"], "0$1"],
                    [, "(11)(\\d{4})(\\d{4})", "$1 $2-$3", ["1"], "0$1", , 1],
                    [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2-$3", ["2(?:2[013]|3[067]|49|6[01346]|80|9[147-9])|3(?:36|4[1-358]|5[138]|6[24]|7[069]|8[013578])", "2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3[456]|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45]))", "2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3(?:4|5[014]|6[1239])|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45]))"], "0$1", , 1],
                    [, "(\\d{4})(\\d{2})(\\d{4})", "$1 $2-$3", ["[23]"], "0$1", , 1],
                    [, "(\\d{3})", "$1", ["1[012]|911"], "$1"]
                ],
                [
                    [, "([68]\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["[68]"], "0$1"],
                    [, "(9)(11)(\\d{4})(\\d{4})", "$1 $2 $3-$4", ["911"]],
                    [, "(9)(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3-$4", ["9(?:2[234689]|3[3-8])", "9(?:2(?:2[013]|3[067]|49|6[01346]|80|9[147-9])|3(?:36|4[1-358]|5[138]|6[24]|7[069]|8[013578]))", "9(?:2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3[456]|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45])))", "9(?:2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3(?:4|5[014]|6[1239])|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45])))"]],
                    [, "(9)(\\d{4})(\\d{2})(\\d{4})", "$1 $2 $3-$4", ["9[23]"]],
                    [, "(11)(\\d{4})(\\d{4})", "$1 $2-$3", ["1"], "0$1", , 1],
                    [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2-$3", ["2(?:2[013]|3[067]|49|6[01346]|80|9[147-9])|3(?:36|4[1-358]|5[138]|6[24]|7[069]|8[013578])", "2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3[456]|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45]))", "2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3(?:4|5[014]|6[1239])|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45]))"], "0$1", , 1],
                    [, "(\\d{4})(\\d{2})(\\d{4})", "$1 $2-$3", ["[23]"], "0$1", , 1]
                ],
                [, , "NA", "NA"], , , [, , "810\\d{7}", "\\d{10}", , , "8101234567"],
                [, , "810\\d{7}", "\\d{10}", , , "8101234567"], , , [, , "NA", "NA"]
            ],
            AS: [, [, , "[5689]\\d{9}", "\\d{7}(?:\\d{3})?"],
                [, , "6846(?:22|33|44|55|77|88|9[19])\\d{4}", "\\d{7}(?:\\d{3})?", , , "6846221234"],
                [, , "684(?:2(?:5[2468]|72)|7(?:3[13]|70))\\d{4}", "\\d{10}", , , "6847331234"],
                [, , "8(?:00|44|55|66|77|88)[2-9]\\d{6}", "\\d{10}", , , "8002123456"],
                [, , "900[2-9]\\d{6}", "\\d{10}", , , "9002123456"],
                [, , "NA", "NA"],
                [, , "5(?:00|33|44|66|77)[2-9]\\d{6}", "\\d{10}", , , "5002345678"],
                [, , "NA", "NA"], "AS", 1, "011", "1", , , "1", , , , , , [, , "NA", "NA"], , "684", [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            AT: [, [, , "[1-9]\\d{3,12}", "\\d{3,13}"],
                [, , "1\\d{3,12}|(?:2(?:1[467]|2[13-8]|5[2357]|6[1-46-8]|7[1-8]|8[124-7]|9[1458])|3(?:1[1-8]|3[23568]|4[5-7]|5[1378]|6[1-38]|8[3-68])|4(?:2[1-8]|35|63|7[1368]|8[2457])|5(?:12|2[1-8]|3[357]|4[147]|5[12578]|6[37])|6(?:13|2[1-47]|4[1-35-8]|5[468]|62)|7(?:2[1-8]|3[25]|4[13478]|5[68]|6[16-8]|7[1-6]|9[45]))\\d{3,10}", "\\d{3,13}", , , "1234567890"],
                [, , "6(?:5[0-3579]|6[013-9]|[7-9]\\d)\\d{4,10}", "\\d{7,13}", , , "664123456"],
                [, , "800\\d{6,10}", "\\d{9,13}", , , "800123456"],
                [, , "(?:9(?:0[01]|3[019]))\\d{6,10}", "\\d{9,13}", , , "900123456"],
                [, , "8(?:10\\d|2(?:[01]\\d|8\\d?))\\d{5,9}", "\\d{8,13}", , , "810123456"],
                [, , "NA", "NA"],
                [, , "780\\d{6,10}", "\\d{9,13}", , , "780123456"], "AT", 43, "00", "0", , , "0", , , , [
                    [, "(116\\d{3})", "$1", ["116"], "$1"],
                    [, "(1)(\\d{3,12})", "$1 $2", ["1"], "0$1"],
                    [, "(5\\d)(\\d{3,5})", "$1 $2", ["5[079]"], "0$1"],
                    [, "(5\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["5[079]"], "0$1"],
                    [, "(5\\d)(\\d{4})(\\d{4,7})", "$1 $2 $3", ["5[079]"], "0$1"],
                    [, "(\\d{3})(\\d{3,10})", "$1 $2", ["316|46|51|732|6(?:5[0-3579]|[6-9])|7(?:[28]0)|[89]"], "0$1"],
                    [, "(\\d{4})(\\d{3,9})", "$1 $2", ["2|3(?:1[1-578]|[3-8])|4[2378]|5[2-6]|6(?:[12]|4[1-9]|5[468])|7(?:2[1-8]|35|4[1-8]|[5-79])"], "0$1"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "5(?:(?:0[1-9]|17)\\d{2,10}|[79]\\d{3,11})|720\\d{6,10}", "\\d{5,13}", , , "50123"], , , [, , "NA", "NA"]
            ],
            AU: [, [, , "[1-578]\\d{5,9}", "\\d{6,10}"],
                [, , "[237]\\d{8}|8(?:[68]\\d{3}|7[0-69]\\d{2}|9(?:[02-9]\\d{2}|1(?:[0-57-9]\\d|6[0135-9])))\\d{4}", "\\d{8,9}", , , "212345678"],
                [, , "14(?:5\\d|71)\\d{5}|4(?:[0-2]\\d|3[0-57-9]|4[47-9]|5[0-25-9]|6[6-9]|7[03-9]|8[147-9]|9[017-9])\\d{6}", "\\d{9}", , , "412345678"],
                [, , "180(?:0\\d{3}|2)\\d{3}", "\\d{7,10}", , , "1800123456"],
                [, , "190[0126]\\d{6}", "\\d{10}", , , "1900123456"],
                [, , "13(?:00\\d{2})?\\d{4}", "\\d{6,10}", , , "1300123456"],
                [, , "500\\d{6}", "\\d{9}", , , "500123456"],
                [, , "550\\d{6}", "\\d{9}", , , "550123456"], "AU", 61, "(?:14(?:1[14]|34|4[17]|[56]6|7[47]|88))?001[14-689]", "0", , , "0", , "0011", , [
                    [, "([2378])(\\d{4})(\\d{4})", "$1 $2 $3", ["[2378]"], "(0$1)"],
                    [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[45]|14"], "0$1"],
                    [, "(16)(\\d{3})(\\d{2,4})", "$1 $2 $3", ["16"], "0$1"],
                    [, "(1[389]\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["1(?:[38]0|90)", "1(?:[38]00|90)"], "$1"],
                    [, "(180)(2\\d{3})", "$1 $2", ["180", "1802"], "$1"],
                    [, "(19\\d)(\\d{3})", "$1 $2", ["19[13]"], "$1"],
                    [, "(19\\d{2})(\\d{4})", "$1 $2", ["19[67]"], "$1"],
                    [, "(13)(\\d{2})(\\d{2})", "$1 $2 $3", ["13[1-9]"], "$1"]
                ], , [, , "16\\d{3,7}", "\\d{5,9}", , , "1612345"], 1, , [, , "1(?:3(?:\\d{4}|00\\d{6})|80(?:0\\d{6}|2\\d{3}))", "\\d{6,10}", , , "1300123456"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            AW: [, [, , "[25-9]\\d{6}", "\\d{7}"],
                [, , "5(?:2\\d|8[1-9])\\d{4}", "\\d{7}", , , "5212345"],
                [, , "(?:5(?:6\\d|9[2-478])|6(?:[039]0|22|4[01]|6[0-2])|7[34]\\d|9(?:6[45]|9[4-8]))\\d{4}", "\\d{7}", , , "5601234"],
                [, , "800\\d{4}", "\\d{7}", , , "8001234"],
                [, , "900\\d{4}", "\\d{7}", , , "9001234"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "28\\d{5}|501\\d{4}", "\\d{7}", , , "5011234"], "AW", 297, "00", , , , , , , , [
                    [, "(\\d{3})(\\d{4})", "$1 $2"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            AX: [, [, , "[135]\\d{5,9}|[27]\\d{4,9}|4\\d{5,10}|6\\d{7,8}|8\\d{6,9}", "\\d{5,12}"],
                [, , "18[1-8]\\d{3,9}", "\\d{6,12}", , , "1812345678"],
                [, , "4\\d{5,10}|50\\d{4,8}", "\\d{6,11}", , , "412345678"],
                [, , "800\\d{4,7}", "\\d{7,10}", , , "8001234567"],
                [, , "[67]00\\d{5,6}", "\\d{8,9}", , , "600123456"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "AX", 358, "00|99[049]", "0", , , "0", , , , , , [, , "NA", "NA"], , , [, , "[13]00\\d{3,7}|2(?:0(?:0\\d{3,7}|2[023]\\d{1,6}|9[89]\\d{1,6}))|60(?:[12]\\d{5,6}|6\\d{7})|7(?:1\\d{7}|3\\d{8}|5[03-9]\\d{2,7})", "\\d{5,10}", , , "100123"],
                [, , "[13]0\\d{4,8}|2(?:0(?:[016-8]\\d{3,7}|[2-59]\\d{2,7})|9\\d{4,8})|60(?:[12]\\d{5,6}|6\\d{7})|7(?:1\\d{7}|3\\d{8}|5[03-9]\\d{2,7})", "\\d{5,10}", , , "10112345"], , , [, , "NA", "NA"]
            ],
            AZ: [, [, , "[1-9]\\d{8}", "\\d{7,9}"],
                [, , "(?:1[28]\\d|2(?:02|1[24]|2[2-4]|33|[45]2|6[23])|365)\\d{6}", "\\d{7,9}", , , "123123456"],
                [, , "(?:4[04]|5[015]|60|7[07])\\d{7}", "\\d{9}", , , "401234567"],
                [, , "88\\d{7}", "\\d{9}", , , "881234567"],
                [, , "900200\\d{3}", "\\d{9}", , , "900200123"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "AZ", 994, "00", "0", , , "0", , , , [
                    [, "(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["(?:1[28]|2(?:[45]2|[0-36])|365)"], "(0$1)"],
                    [, "(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[4-8]"], "0$1"],
                    [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["9"], "0$1"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            BA: [, [, , "[3-9]\\d{7,8}", "\\d{6,9}"],
                [, , "(?:[35]\\d|49)\\d{6}", "\\d{6,8}", , , "30123456"],
                [, , "6(?:03|44|71|[1-356])\\d{6}", "\\d{8,9}", , , "61123456"],
                [, , "8[08]\\d{6}", "\\d{8}", , , "80123456"],
                [, , "9[0246]\\d{6}", "\\d{8}", , , "90123456"],
                [, , "8[12]\\d{6}", "\\d{8}", , , "82123456"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "BA", 387, "00", "0", , , "0", , , , [
                    [, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2-$3", ["[3-5]"], "0$1"],
                    [, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["6[1-356]|[7-9]"], "0$1"],
                    [, "(\\d{2})(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["6[047]"], "0$1"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "70[23]\\d{5}", "\\d{8}", , , "70223456"], , , [, , "NA", "NA"]
            ],
            BB: [, [, , "[2589]\\d{9}", "\\d{7}(?:\\d{3})?"],
                [, , "246(?:2(?:2[78]|7[0-4])|4(?:1[024-6]|2\\d|3[2-9])|5(?:20|[34]\\d|54|7[1-3])|6(?:2\\d|38)|7(?:37|57)|9(?:1[89]|63))\\d{4}", "\\d{7}(?:\\d{3})?", , , "2464123456"],
                [, , "246(?:2(?:[356]\\d|4[0-57-9]|8[0-79])|45\\d|8(?:[2-5]\\d|83))\\d{4}", "\\d{10}", , , "2462501234"],
                [, , "8(?:00|44|55|66|77|88)[2-9]\\d{6}", "\\d{10}", , , "8002123456"],
                [, , "900\\d{7}|246976\\d{4}", "\\d{10}", , , "9002123456"],
                [, , "NA", "NA"],
                [, , "5(?:00|33|44|66|77)[2-9]\\d{3}", "\\d{10}", , , "5002345678"],
                [, , "24631\\d{5}", "\\d{10}", , , "2463101234"], "BB", 1, "011", "1", , , "1", , , , , , [, , "NA", "NA"], , "246", [, , "NA", "NA"],
                [, , "246(?:292|41[7-9]|43[01])\\d{4}", "\\d{10}", , , "2464301234"], , , [, , "NA", "NA"]
            ],
            BD: [, [, , "[2-79]\\d{5,9}|1\\d{9}|8[0-7]\\d{4,8}", "\\d{6,10}"],
                [, , "2(?:550\\d|7(?:1[0-267]|2[0-289]|3[0-29]|[46][01]|5[1-3]|7[017]|91)|8(?:0[125]|[139][1-6]|2[0157-9]|6[1-35]|7[1-5]|8[1-8]|90)|9(?:0[0-2]|1[0-4]|2[568]|3[3-6]|5[5-7]|6[0167]|7[15]|8[0146-8]))\\d{4}|3(?:12?[5-7]\\d{2}|0(?:2(?:[025-79]\\d|[348]\\d{1,2})|3(?:[2-4]\\d|[56]\\d?))|2(?:1\\d{2}|2(?:[12]\\d|[35]\\d{1,2}|4\\d?))|3(?:1\\d{2}|2(?:[2356]\\d|4\\d{1,2}))|4(?:1\\d{2}|2(?:2\\d{1,2}|[47]|5\\d{2}))|5(?:1\\d{2}|29)|[67]1\\d{2}|8(?:1\\d{2}|2(?:2\\d{2}|3|4\\d)))\\d{3}|4(?:0(?:2(?:[09]\\d|7)|33\\d{2})|1\\d{3}|2(?:1\\d{2}|2(?:[25]\\d?|[348]\\d|[67]\\d{1,2}))|3(?:1\\d{2}(?:\\d{2})?|2(?:[045]\\d|[236-9]\\d{1,2})|32\\d{2})|4(?:[18]\\d{2}|2(?:[2-46]\\d{2}|3)|5[25]\\d{2})|5(?:1\\d{2}|2(?:3\\d|5))|6(?:[18]\\d{2}|2(?:3(?:\\d{2})?|[46]\\d{1,2}|5\\d{2}|7\\d)|5(?:3\\d?|4\\d|[57]\\d{1,2}|6\\d{2}|8))|71\\d{2}|8(?:[18]\\d{2}|23\\d{2}|54\\d{2})|9(?:[18]\\d{2}|2[2-5]\\d{2}|53\\d{1,2}))\\d{3}|5(?:02[03489]\\d{2}|1\\d{2}|2(?:1\\d{2}|2(?:2(?:\\d{2})?|[457]\\d{2}))|3(?:1\\d{2}|2(?:[37](?:\\d{2})?|[569]\\d{2}))|4(?:1\\d{2}|2[46]\\d{2})|5(?:1\\d{2}|26\\d{1,2})|6(?:[18]\\d{2}|2|53\\d{2})|7(?:1|24)\\d{2}|8(?:1|26)\\d{2}|91\\d{2})\\d{3}|6(?:0(?:1\\d{2}|2(?:3\\d{2}|4\\d{1,2}))|2(?:2[2-5]\\d{2}|5(?:[3-5]\\d{2}|7)|8\\d{2})|3(?:1|2[3478])\\d{2}|4(?:1|2[34])\\d{2}|5(?:1|2[47])\\d{2}|6(?:[18]\\d{2}|6(?:2(?:2\\d|[34]\\d{2})|5(?:[24]\\d{2}|3\\d|5\\d{1,2})))|72[2-5]\\d{2}|8(?:1\\d{2}|2[2-5]\\d{2})|9(?:1\\d{2}|2[2-6]\\d{2}))\\d{3}|7(?:(?:02|[3-589]1|6[12]|72[24])\\d{2}|21\\d{3}|32)\\d{3}|8(?:(?:4[12]|[5-7]2|1\\d?)|(?:0|3[12]|[5-7]1|217)\\d)\\d{4}|9(?:[35]1|(?:[024]2|81)\\d|(?:1|[24]1)\\d{2})\\d{3}", "\\d{6,9}", , , "27111234"],
                [, , "(?:1[13-9]\\d|(?:3[78]|44)[02-9]|6(?:44|6[02-9]))\\d{7}", "\\d{10}", , , "1812345678"],
                [, , "80[03]\\d{7}", "\\d{10}", , , "8001234567"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "96(?:0[49]|1[0-4]|6[69])\\d{6}", "\\d{10}", , , "9604123456"], "BD", 880, "00[12]?", "0", , , "0", , "00", , [
                    [, "(2)(\\d{7,8})", "$1-$2", ["2"], "0$1"],
                    [, "(\\d{2})(\\d{4,6})", "$1-$2", ["[3-79]1"], "0$1"],
                    [, "(\\d{4})(\\d{3,6})", "$1-$2", ["1|3(?:0|[2-58]2)|4(?:0|[25]2|3[23]|[4689][25])|5(?:[02-578]2|6[25])|6(?:[0347-9]2|[26][25])|7[02-9]2|8(?:[023][23]|[4-7]2)|9(?:[02][23]|[458]2|6[016])"], "0$1"],
                    [, "(\\d{3})(\\d{3,7})", "$1-$2", ["[3-79][2-9]|8"], "0$1"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            BE: [, [, , "[1-9]\\d{7,8}", "\\d{8,9}"],
                [, , "(?:1[0-69]|[23][2-8]|4[23]|5\\d|6[013-57-9]|71|8[1-79]|9[2-4])\\d{6}|80[2-8]\\d{5}", "\\d{8}", , , "12345678"],
                [, , "4(?:6[0135-8]|[79]\\d|8[3-9])\\d{6}", "\\d{9}", , , "470123456"],
                [, , "800\\d{5}", "\\d{8}", , , "80012345"],
                [, , "(?:70[2-467]|90[0-79])\\d{5}", "\\d{8}", , , "90123456"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "BE", 32, "00", "0", , , "0", , , , [
                    [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["4[6-9]"], "0$1"],
                    [, "(\\d)(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[23]|4[23]|9[2-4]"], "0$1"],
                    [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[156]|7[018]|8(?:0[1-9]|[1-79])"], "0$1"],
                    [, "(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["(?:80|9)0"], "0$1"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "78\\d{6}", "\\d{8}", , , "78123456"], , , [, , "NA", "NA"]
            ],
            BF: [, [, , "[267]\\d{7}", "\\d{8}"],
                [, , "2(?:0(?:49|5[23]|9[016-9])|4(?:4[569]|5[4-6]|7[0179])|5(?:[34]\\d|50))\\d{4}", "\\d{8}", , , "20491234"],
                [, , "6(?:[0-689]\\d|7[0-5])\\d{5}|7\\d{7}", "\\d{8}", , , "70123456"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "BF", 226, "00", , , , , , , , [
                    [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            BG: [, [, , "[23567]\\d{5,7}|[489]\\d{6,8}", "\\d{5,9}"],
                [, , "2(?:[0-8]\\d{5,6}|9\\d{4,6})|(?:[36]\\d|5[1-9]|8[1-6]|9[1-7])\\d{5,6}|(?:4(?:[124-7]\\d|3[1-6])|7(?:0[1-9]|[1-9]\\d))\\d{4,5}", "\\d{5,8}", , , "2123456"],
                [, , "(?:8[7-9]\\d|9(?:8\\d|99))\\d{6}|4(?:3[0789]|8\\d)\\d{5}", "\\d{8,9}", , , "48123456"],
                [, , "800\\d{5}", "\\d{8}", , , "80012345"],
                [, , "90\\d{6}", "\\d{8}", , , "90123456"],
                [, , "NA", "NA"],
                [, , "700\\d{5}", "\\d{5,9}", , , "70012345"],
                [, , "NA", "NA"], "BG", 359, "00", "0", , , "0", , , , [
                    [, "(2)(\\d{5})", "$1 $2", ["29"], "0$1"],
                    [, "(2)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2"], "0$1"],
                    [, "(\\d{3})(\\d{4})", "$1 $2", ["43[124-7]|70[1-9]"], "0$1"],
                    [, "(\\d{3})(\\d{3})(\\d{2})", "$1 $2 $3", ["43[124-7]|70[1-9]"], "0$1"],
                    [, "(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["[78]00"], "0$1"],
                    [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["999"], "0$1"],
                    [, "(\\d{2})(\\d{3})(\\d{2,3})", "$1 $2 $3", ["[356]|4[124-7]|7[1-9]|8[1-6]|9[1-7]"], "0$1"],
                    [, "(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["48|8[7-9]|9[08]"], "0$1"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            BH: [, [, , "[136-9]\\d{7}", "\\d{8}"],
                [, , "(?:1(?:3[1356]|6[0156]|7\\d)\\d|6(?:1[16]\\d|500|6(?:0\\d|3[12]|44|7[7-9])|9[69][69])|7(?:1(?:11|78)|7\\d{2}))\\d{4}", "\\d{8}", , , "17001234"],
                [, , "(?:3(?:[1-4679]\\d|5[013569]|8[0-47-9])\\d|6(?:3(?:00|33|6[16])|6(?:[69]\\d|3[03-9]|7[0-6])))\\d{4}", "\\d{8}", , , "36001234"],
                [, , "80\\d{6}", "\\d{8}", , , "80123456"],
                [, , "(?:87|9[014578])\\d{6}", "\\d{8}", , , "90123456"],
                [, , "84\\d{6}", "\\d{8}", , , "84123456"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "BH", 973, "00", , , , , , , , [
                    [, "(\\d{4})(\\d{4})", "$1 $2"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            BI: [, [, , "[267]\\d{7}", "\\d{8}"],
                [, , "22\\d{6}", "\\d{8}", , , "22201234"],
                [, , "(?:29|6[189]|7[124-9])\\d{6}", "\\d{8}", , , "79561234"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "BI", 257, "00", , , , , , , , [
                    [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            BJ: [, [, , "[2689]\\d{7}|7\\d{3}", "\\d{4,8}"],
                [, , "2(?:02|1[037]|2[45]|3[68])\\d{5}", "\\d{8}", , , "20211234"],
                [, , "(?:6[146-8]|9[03-9])\\d{6}", "\\d{8}", , , "90011234"],
                [, , "7[3-5]\\d{2}", "\\d{4}", , , "7312"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "857[58]\\d{4}", "\\d{8}", , , "85751234"], "BJ", 229, "00", , , , , , , , [
                    [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "81\\d{6}", "\\d{8}", , , "81123456"], , , [, , "NA", "NA"]
            ],
            BL: [, [, , "[56]\\d{8}", "\\d{9}"],
                [, , "590(?:2[7-9]|5[12]|87)\\d{4}", "\\d{9}", , , "590271234"],
                [, , "690(?:0[0-7]|[1-9]\\d)\\d{4}", "\\d{9}", , , "690301234"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "BL", 590, "00", "0", , , "0", , , , , , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            BM: [, [, , "[4589]\\d{9}", "\\d{7}(?:\\d{3})?"],
                [, , "441(?:2(?:02|23|61|[3479]\\d)|[46]\\d{2}|5(?:4\\d|60|89)|824)\\d{4}", "\\d{7}(?:\\d{3})?", , , "4412345678"],
                [, , "441(?:[37]\\d|5[0-39])\\d{5}", "\\d{10}", , , "4413701234"],
                [, , "8(?:00|44|55|66|77|88)[2-9]\\d{6}", "\\d{10}", , , "8002123456"],
                [, , "900[2-9]\\d{6}", "\\d{10}", , , "9002123456"],
                [, , "NA", "NA"],
                [, , "5(?:00|33|44|66|77)[2-9]\\d{6}", "\\d{10}", , , "5002345678"],
                [, , "NA", "NA"], "BM", 1, "011", "1", , , "1", , , , , , [, , "NA", "NA"], , "441", [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            BN: [, [, , "[2-578]\\d{6}", "\\d{7}"],
                [, , "2(?:[013-9]\\d|2[0-7])\\d{4}|[3-5]\\d{6}", "\\d{7}", , , "2345678"],
                [, , "22[89]\\d{4}|[78]\\d{6}", "\\d{7}", , , "7123456"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "BN", 673, "00", , , , , , , , [
                    [, "([2-578]\\d{2})(\\d{4})", "$1 $2"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            BO: [, [, , "[23467]\\d{7}", "\\d{7,8}"],
                [, , "(?:2(?:2\\d{2}|5(?:11|[258]\\d|9[67])|6(?:12|2\\d|9[34])|8(?:2[34]|39|62))|3(?:3\\d{2}|4(?:6\\d|8[24])|8(?:25|42|5[257]|86|9[25])|9(?:2\\d|3[234]|4[248]|5[24]|6[2-6]|7\\d))|4(?:4\\d{2}|6(?:11|[24689]\\d|72)))\\d{4}", "\\d{7,8}", , , "22123456"],
                [, , "[67]\\d{7}", "\\d{8}", , , "71234567"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "BO", 591, "00(1\\d)?", "0", , , "0(1\\d)?", , , , [
                    [, "([234])(\\d{7})", "$1 $2", ["[234]"], , "0$CC $1"],
                    [, "([67]\\d{7})", "$1", ["[67]"], , "0$CC $1"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            BQ: [, [, , "[347]\\d{6}", "\\d{7}"],
                [, , "(?:318[023]|416[023]|7(?:1[578]|50)\\d)\\d{3}", "\\d{7}", , , "7151234"],
                [, , "(?:318[14-68]|416[15-9]|7(?:0[01]|7[07]|[89]\\d)\\d)\\d{3}", "\\d{7}", , , "3181234"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "BQ", 599, "00", , , , , , , , , , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            BR: [, [, , "[1-46-9]\\d{7,10}|5\\d{8,9}", "\\d{8,11}"],
                [, , "1[1-9][2-5]\\d{7}|(?:[4689][1-9]|2[12478]|3[1-578]|5[1-5]|7[13-579])[2-5]\\d{7}", "\\d{8,11}", , , "1123456789"],
                [, , "1[1-9](?:7|9\\d)\\d{7}|(?:2[12478]|3[1-578]|7[13-579]|[89][1-9])9?[6-9]\\d{7}|(?:[46][1-9]|5[1-5])[6-9]\\d{7}", "\\d{10,11}", , , "11961234567"],
                [, , "800\\d{6,7}", "\\d{8,11}", , , "800123456"],
                [, , "[359]00\\d{6,7}", "\\d{8,11}", , , "300123456"],
                [, , "(?:300\\d|40(?:0\\d|20))\\d{4}", "\\d{8}", , , "40041234"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "BR", 55, "00(?:1[45]|2[135]|31|4[13])", "0", , , "0(?:(1[245]|2[135]|31|4[13])(\\d{10,11}))?", "$2", , , [
                    [, "(\\d{4})(\\d{4})", "$1-$2", ["[2-9](?:[1-9]|0[1-9])"], "$1"],
                    [, "(\\d{5})(\\d{4})", "$1-$2", ["9(?:[1-9]|0[1-9])"], "$1"],
                    [, "(\\d{3,5})", "$1", ["1[125689]"], "$1"],
                    [, "(\\d{2})(\\d{5})(\\d{4})", "$1 $2-$3", ["(?:[189][1-9]|2[12478]|3[1-578]|7[13-579])9"], "($1)", "0 $CC ($1)"],
                    [, "(\\d{2})(\\d{4})(\\d{4})", "$1 $2-$3", ["[1-9][1-9]"], "($1)", "0 $CC ($1)"],
                    [, "(\\d{4})(\\d{4})", "$1-$2", ["(?:300|40(?:0|20))"]],
                    [, "([3589]00)(\\d{2,3})(\\d{4})", "$1 $2 $3", ["[3589]00"], "0$1"]
                ],
                [
                    [, "(\\d{2})(\\d{5})(\\d{4})", "$1 $2-$3", ["(?:[189][1-9]|2[12478]|3[1-578]|7[13-579])9"], "($1)", "0 $CC ($1)"],
                    [, "(\\d{2})(\\d{4})(\\d{4})", "$1 $2-$3", ["[1-9][1-9]"], "($1)", "0 $CC ($1)"],
                    [, "(\\d{4})(\\d{4})", "$1-$2", ["(?:300|40(?:0|20))"]],
                    [, "([3589]00)(\\d{2,3})(\\d{4})", "$1 $2 $3", ["[3589]00"], "0$1"]
                ],
                [, , "NA", "NA"], , , [, , "(?:300\\d|40(?:0\\d|20))\\d{4}", "\\d{8}", , , "40041234"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            BS: [, [, , "[2589]\\d{9}", "\\d{7}(?:\\d{3})?"],
                [, , "242(?:3(?:02|[236][1-9]|4[0-24-9]|5[0-68]|7[3467]|8[0-4]|9[2-467])|461|502|6(?:0[1-3]|12|7[67]|8[78]|9[89])|7(?:02|88))\\d{4}", "\\d{7}(?:\\d{3})?", , , "2423456789"],
                [, , "242(?:3(?:5[79]|[79]5)|4(?:[2-4][1-9]|5[1-8]|6[2-8]|7\\d|81)|5(?:2[45]|3[35]|44|5[1-9]|65|77)|6[34]6|727)\\d{4}", "\\d{10}", , , "2423591234"],
                [, , "242300\\d{4}|8(?:00|44|55|66|77|88)[2-9]\\d{6}", "\\d{10}", , , "8002123456"],
                [, , "900[2-9]\\d{6}", "\\d{10}", , , "9002123456"],
                [, , "NA", "NA"],
                [, , "5(?:00|33|44|66|77)[2-9]\\d{6}", "\\d{10}", , , "5002345678"],
                [, , "NA", "NA"], "BS", 1, "011", "1", , , "1", , , , , , [, , "NA", "NA"], , "242", [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            BT: [, [, , "[1-8]\\d{6,7}", "\\d{6,8}"],
                [, , "(?:2[3-6]|[34][5-7]|5[236]|6[2-46]|7[246]|8[2-4])\\d{5}", "\\d{6,7}", , , "2345678"],
                [, , "(?:1[67]|77)\\d{6}", "\\d{8}", , , "17123456"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "BT", 975, "00", , , , , , , , [
                    [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["1|77"]],
                    [, "([2-8])(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-68]|7[246]"]]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            BW: [, [, , "[2-79]\\d{6,7}", "\\d{7,8}"],
                [, , "(?:2(?:4[0-48]|6[0-24]|9[0578])|3(?:1[0235-9]|55|6\\d|7[01]|9[0-57])|4(?:6[03]|7[1267]|9[0-5])|5(?:3[0389]|4[0489]|7[1-47]|88|9[0-49])|6(?:2[1-35]|5[149]|8[067]))\\d{4}", "\\d{7}", , , "2401234"],
                [, , "7(?:[1-6]\\d|7[014-8])\\d{5}", "\\d{8}", , , "71123456"],
                [, , "NA", "NA"],
                [, , "90\\d{5}", "\\d{7}", , , "9012345"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "79[12][01]\\d{4}", "\\d{8}", , , "79101234"], "BW", 267, "00", , , , , , , , [
                    [, "(\\d{3})(\\d{4})", "$1 $2", ["[2-6]"]],
                    [, "(7\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["7"]],
                    [, "(90)(\\d{5})", "$1 $2", ["9"]]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            BY: [, [, , "[1-4]\\d{8}|800\\d{3,7}|[89]\\d{9,10}", "\\d{6,11}"],
                [, , "(?:1(?:5(?:1[1-5]|[24]\\d|6[2-4]|9[1-7])|6(?:[235]\\d|4[1-7])|7\\d{2})|2(?:1(?:[246]\\d|3[0-35-9]|5[1-9])|2(?:[235]\\d|4[0-8])|3(?:[26]\\d|3[02-79]|4[024-7]|5[03-7])))\\d{5}", "\\d{6,11}", , , "152450911"],
                [, , "(?:2(?:5[5679]|9[1-9])|33\\d|44\\d)\\d{6}", "\\d{9}", , , "294911911"],
                [, , "8(?:0[13]|20\\d)\\d{7}|800\\d{3,7}", "\\d{6,11}", , , "8011234567"],
                [, , "(?:810|902)\\d{7}", "\\d{10}", , , "9021234567"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "249\\d{6}", "\\d{9}", , , "249123456"], "BY", 375, "810", "8", , , "8?0?", , "8~10", , [
                    [, "(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["17[0-3589]|2[4-9]|[34]", "17(?:[02358]|1[0-2]|9[0189])|2[4-9]|[34]"], "8 0$1"],
                    [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["1(?:5[24]|6[235]|7[467])|2(?:1[246]|2[25]|3[26])", "1(?:5[24]|6(?:2|3[04-9]|5[0346-9])|7(?:[46]|7[37-9]))|2(?:1[246]|2[25]|3[26])"], "8 0$1"],
                    [, "(\\d{4})(\\d{2})(\\d{3})", "$1 $2-$3", ["1(?:5[169]|6[3-5]|7[179])|2(?:1[35]|2[34]|3[3-5])", "1(?:5[169]|6(?:3[1-3]|4|5[125])|7(?:1[3-9]|7[0-24-6]|9[2-7]))|2(?:1[35]|2[34]|3[3-5])"], "8 0$1"],
                    [, "([89]\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["8[01]|9"], "8 $1"],
                    [, "(82\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["82"], "8 $1"],
                    [, "(800)(\\d{3})", "$1 $2", ["800"], "8 $1"],
                    [, "(800)(\\d{2})(\\d{2,4})", "$1 $2 $3", ["800"], "8 $1"]
                ], , [, , "NA", "NA"], , , [, , "8(?:[013]|[12]0)\\d{8}|800\\d{3,7}|902\\d{7}", "\\d{6,11}", , , "82012345678"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            BZ: [, [, , "[2-8]\\d{6}|0\\d{10}", "\\d{7}(?:\\d{4})?"],
                [, , "[234578][02]\\d{5}", "\\d{7}", , , "2221234"],
                [, , "6[0-367]\\d{5}", "\\d{7}", , , "6221234"],
                [, , "0800\\d{7}", "\\d{11}", , , "08001234123"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "BZ", 501, "00", , , , , , , , [
                    [, "(\\d{3})(\\d{4})", "$1-$2", ["[2-8]"]],
                    [, "(0)(800)(\\d{4})(\\d{3})", "$1-$2-$3-$4", ["0"]]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], 1, , [, , "NA", "NA"]
            ],
            CA: [, [, , "[2-9]\\d{9}|3\\d{6}", "\\d{7}(?:\\d{3})?"],
                [, , "(?:2(?:04|[23]6|[48]9|50)|3(?:06|43|65)|4(?:03|1[68]|3[178]|50)|5(?:06|1[49]|48|79|8[17])|6(?:0[04]|13|22|39|47)|7(?:0[59]|78|8[02])|8(?:[06]7|19|73)|90[25])[2-9]\\d{6}|310\\d{4}", "\\d{7}(?:\\d{3})?", , , "2042345678"],
                [, , "(?:2(?:04|[23]6|[48]9|50)|3(?:06|43|65)|4(?:03|1[68]|3[178]|50)|5(?:06|1[49]|48|79|8[17])|6(?:0[04]|13|22|39|47)|7(?:0[59]|78|8[02])|8(?:[06]7|19|73)|90[25])[2-9]\\d{6}", "\\d{7}(?:\\d{3})?", , , "2042345678"],
                [, , "8(?:00|44|55|66|77|88)[2-9]\\d{6}|310\\d{4}", "\\d{7}(?:\\d{3})?", , , "8002123456"],
                [, , "900[2-9]\\d{6}", "\\d{10}", , , "9002123456"],
                [, , "NA", "NA"],
                [, , "5(?:00|33|44|66|77)[2-9]\\d{6}", "\\d{10}", , , "5002345678"],
                [, , "NA", "NA"], "CA", 1, "011", "1", , , "1", , , , , , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            CC: [, [, , "[1458]\\d{5,9}", "\\d{6,10}"],
                [, , "89162\\d{4}", "\\d{8,9}", , , "891621234"],
                [, , "14(?:5\\d|71)\\d{5}|4(?:[0-2]\\d|3[0-57-9]|4[47-9]|5[0-25-9]|6[6-9]|7[03-9]|8[147-9]|9[017-9])\\d{6}", "\\d{9}", , , "412345678"],
                [, , "180(?:0\\d{3}|2)\\d{3}", "\\d{7,10}", , , "1800123456"],
                [, , "190[0126]\\d{6}", "\\d{10}", , , "1900123456"],
                [, , "13(?:00\\d{2})?\\d{4}", "\\d{6,10}", , , "1300123456"],
                [, , "500\\d{6}", "\\d{9}", , , "500123456"],
                [, , "550\\d{6}", "\\d{9}", , , "550123456"], "CC", 61, "(?:14(?:1[14]|34|4[17]|[56]6|7[47]|88))?001[14-689]", "0", , , "0", , "0011", , , , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            CD: [, [, , "[2-6]\\d{6}|[18]\\d{6,8}|9\\d{8}", "\\d{7,9}"],
                [, , "1(?:2\\d{7}|\\d{6})|[2-6]\\d{6}", "\\d{7,9}", , , "1234567"],
                [, , "8(?:[0-2459]\\d{2}|8)\\d{5}|9[7-9]\\d{7}", "\\d{7,9}", , , "991234567"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "CD", 243, "00", "0", , , "0", , , , [
                    [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["12"], "0$1"],
                    [, "([89]\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["8[0-2459]|9"], "0$1"],
                    [, "(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["88"], "0$1"],
                    [, "(\\d{2})(\\d{5})", "$1 $2", ["[1-6]"], "0$1"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            CF: [, [, , "[278]\\d{7}", "\\d{8}"],
                [, , "2[12]\\d{6}", "\\d{8}", , , "21612345"],
                [, , "7[0257]\\d{6}", "\\d{8}", , , "70012345"],
                [, , "NA", "NA"],
                [, , "8776\\d{4}", "\\d{8}", , , "87761234"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "CF", 236, "00", , , , , , , , [
                    [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            CG: [, [, , "[028]\\d{8}", "\\d{9}"],
                [, , "222[1-589]\\d{5}", "\\d{9}", , , "222123456"],
                [, , "0[14-6]\\d{7}", "\\d{9}", , , "061234567"],
                [, , "NA", "NA"],
                [, , "800\\d{6}", "\\d{9}", , , "800123456"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "CG", 242, "00", , , , , , , , [
                    [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[02]"]],
                    [, "(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["8"]]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], 1, , [, , "NA", "NA"]
            ],
            CH: [, [, , "[2-9]\\d{8}|860\\d{9}", "\\d{9}(?:\\d{3})?"],
                [, , "(?:2[12467]|3[1-4]|4[134]|5[256]|6[12]|[7-9]1)\\d{7}", "\\d{9}", , , "212345678"],
                [, , "7[5-9]\\d{7}", "\\d{9}", , , "781234567"],
                [, , "800\\d{6}", "\\d{9}", , , "800123456"],
                [, , "90[016]\\d{6}", "\\d{9}", , , "900123456"],
                [, , "84[0248]\\d{6}", "\\d{9}", , , "840123456"],
                [, , "878\\d{6}", "\\d{9}", , , "878123456"],
                [, , "NA", "NA"], "CH", 41, "00", "0", , , "0", , , , [
                    [, "([2-9]\\d)(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2-7]|[89]1"], "0$1"],
                    [, "([89]\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["8[047]|90"], "0$1"],
                    [, "(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["860"], "0$1"]
                ], , [, , "74[0248]\\d{6}", "\\d{9}", , , "740123456"], , , [, , "NA", "NA"],
                [, , "5[18]\\d{7}", "\\d{9}", , , "581234567"], , , [, , "860\\d{9}", "\\d{12}", , , "860123456789"]
            ],
            CI: [, [, , "[02-7]\\d{7}", "\\d{8}"],
                [, , "(?:2(?:0[023]|1[02357]|[23][045]|4[03-5])|3(?:0[06]|1[069]|[2-4][07]|5[09]|6[08]))\\d{5}", "\\d{8}", , , "21234567"],
                [, , "(?:0[1-9]|4\\d|5[4-9]|6[015-79]|7[578])\\d{6}", "\\d{8}", , , "01234567"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "CI", 225, "00", , , , , , , , [
                    [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], 1, , [, , "NA", "NA"]
            ],
            CK: [, [, , "[2-57]\\d{4}", "\\d{5}"],
                [, , "(?:2\\d|3[13-7]|4[1-5])\\d{3}", "\\d{5}", , , "21234"],
                [, , "(?:5[0-68]|7\\d)\\d{3}", "\\d{5}", , , "71234"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "CK", 682, "00", , , , , , , , [
                    [, "(\\d{2})(\\d{3})", "$1 $2"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            CL: [, [, , "(?:[2-9]|600|123)\\d{7,8}", "\\d{7,11}"],
                [, , "2(?:2\\d{7}|3(?:20|22)\\d{5}|1962\\d{4})|(?:3[2-5]|[47][1-35]|5[1-3578]|6[13-57])\\d{7}", "\\d{7,9}", , , "221234567"],
                [, , "9[4-9]\\d{7}", "\\d{8,9}", , , "961234567"],
                [, , "800\\d{6}|1230\\d{7}", "\\d{9,11}", , , "800123456"],
                [, , "NA", "NA"],
                [, , "600\\d{7,8}", "\\d{10,11}", , , "6001234567"],
                [, , "NA", "NA"],
                [, , "44\\d{7}", "\\d{9}", , , "441234567"], "CL", 56, "(?:0|1(?:1[0-69]|2[0-57]|5[13-58]|69|7[0167]|8[018]))0", "0", , , "0|(1(?:1[0-69]|2[0-57]|5[13-58]|69|7[0167]|8[018]))", , , , [
                    [, "(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["2[23]"], "($1)", "$CC ($1)"],
                    [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[357]|4[1-35]|6[13-57]"], "($1)", "$CC ($1)"],
                    [, "(9)(\\d{4})(\\d{4})", "$1 $2 $3", ["9"], "0$1"],
                    [, "(44)(\\d{3})(\\d{4})", "$1 $2 $3", ["44"], "0$1"],
                    [, "([68]00)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["60|8"], "$1"],
                    [, "(600)(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["60"], "$1"],
                    [, "(1230)(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "$1"],
                    [, "(\\d{5})(\\d{4})", "$1 $2", ["219"], "($1)", "$CC ($1)"],
                    [, "(\\d{4,5})", "$1", ["[1-9]"], "$1"]
                ],
                [
                    [, "(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["2[23]"], "($1)", "$CC ($1)"],
                    [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[357]|4[1-35]|6[13-57]"], "($1)", "$CC ($1)"],
                    [, "(9)(\\d{4})(\\d{4})", "$1 $2 $3", ["9"], "0$1"],
                    [, "(44)(\\d{3})(\\d{4})", "$1 $2 $3", ["44"], "0$1"],
                    [, "([68]00)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["60|8"], "$1"],
                    [, "(600)(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["60"], "$1"],
                    [, "(1230)(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "$1"],
                    [, "(\\d{5})(\\d{4})", "$1 $2", ["219"], "($1)", "$CC ($1)"]
                ],
                [, , "NA", "NA"], , , [, , "600\\d{7,8}", "\\d{10,11}", , , "6001234567"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            CM: [, [, , "[2368]\\d{7,8}", "\\d{8,9}"],
                [, , "2(?:22|33|4[23])\\d{6}", "\\d{9}", , , "222123456"],
                [, , "6[5-9]\\d{7}", "\\d{9}", , , "671234567"],
                [, , "800\\d{5}", "\\d{8}", , , "80012345"],
                [, , "88\\d{6}", "\\d{8}", , , "88012345"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "CM", 237, "00", , , , , , , , [
                    [, "([26])(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["[26]"]],
                    [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[23]|88"]],
                    [, "(800)(\\d{2})(\\d{3})", "$1 $2 $3", ["80"]]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            CN: [, [, , "[1-7]\\d{6,11}|8[0-357-9]\\d{6,9}|9\\d{7,10}", "\\d{4,12}"],
                [, , "21(?:100\\d{2}|95\\d{3,4}|\\d{8,10})|(?:10|2[02-57-9]|3(?:11|7[179])|4(?:[15]1|3[12])|5(?:1\\d|2[37]|3[12]|51|7[13-79]|9[15])|7(?:31|5[457]|6[09]|91)|8(?:[57]1|98))(?:100\\d{2}|95\\d{3,4}|\\d{8})|(?:3(?:1[02-9]|35|49|5\\d|7[02-68]|9[1-68])|4(?:1[02-9]|2[179]|3[3-9]|5[2-9]|6[4789]|7\\d|8[23])|5(?:3[03-9]|4[36]|5[02-9]|6[1-46]|7[028]|80|9[2-46-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[17]\\d|2[248]|3[04-9]|4[3-6]|5[0-3689]|6[2368]|9[02-9])|8(?:1[236-8]|2[5-7]|3\\d|5[4-9]|7[02-9]|8[3678]|9[1-7])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:100\\d{2}|95\\d{3,4}|\\d{7})|80(?:29|6[03578]|7[018]|81)\\d{4}", "\\d{4,12}", , , "1012345678"],
                [, , "1(?:[38]\\d|4[57]|5[0-35-9]|7[06-8])\\d{8}", "\\d{11}", , , "13123456789"],
                [, , "(?:10)?800\\d{7}", "\\d{10,12}", , , "8001234567"],
                [, , "16[08]\\d{5}", "\\d{8}", , , "16812345"],
                [, , "400\\d{7}|950\\d{7,8}|(?:10|2[0-57-9]|3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[4789]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[3678]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))96\\d{3,4}", "\\d{7,11}", , , "4001234567"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "CN", 86, "(1(?:[129]\\d{3}|79\\d{2}))?00", "0", , , "(1(?:[129]\\d{3}|79\\d{2}))|0", , "00", , [
                    [, "(80\\d{2})(\\d{4})", "$1 $2", ["80[2678]"], "0$1", "$CC $1", 1],
                    [, "([48]00)(\\d{3})(\\d{4})", "$1 $2 $3", ["[48]00"]],
                    [, "(\\d{5,6})", "$1", ["100|95"]],
                    [, "(\\d{2})(\\d{5,6})", "$1 $2", ["(?:10|2\\d)[19]", "(?:10|2\\d)(?:10|9[56])", "(?:10|2\\d)(?:100|9[56])"], "0$1", "$CC $1"],
                    [, "(\\d{3})(\\d{5,6})", "$1 $2", ["[3-9]", "[3-9]\\d{2}[19]", "[3-9]\\d{2}(?:10|9[56])"], "0$1", "$CC $1"],
                    [, "(\\d{3,4})(\\d{4})", "$1 $2", ["[2-9]"]],
                    [, "(21)(\\d{4})(\\d{4,6})", "$1 $2 $3", ["21"], "0$1", "$CC $1", 1],
                    [, "([12]\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["10[1-9]|2[02-9]", "10[1-9]|2[02-9]", "10(?:[1-79]|8(?:[1-9]|0[1-9]))|2[02-9]"], "0$1", "$CC $1", 1],
                    [, "(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["3(?:11|7[179])|4(?:[15]1|3[12])|5(?:1|2[37]|3[12]|51|7[13-79]|9[15])|7(?:31|5[457]|6[09]|91)|8(?:[57]1|98)"], "0$1", "$CC $1", 1],
                    [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["3(?:1[02-9]|35|49|5|7[02-68]|9[1-68])|4(?:1[02-9]|2[179]|[35][2-9]|6[4789]|7\\d|8[23])|5(?:3[03-9]|4[36]|5[02-9]|6[1-46]|7[028]|80|9[2-46-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]|2[248]|3[04-9]|4[3-6]|6[2368])|8(?:1[236-8]|2[5-7]|3|5[4-9]|7[02-9]|8[3678]|9[1-7])|9(?:0[1-3689]|1[1-79]|[379]|4[13]|5[1-5])"], "0$1", "$CC $1", 1],
                    [, "(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["1[3-578]"], , "$CC $1"],
                    [, "(10800)(\\d{3})(\\d{4})", "$1 $2 $3", ["108", "1080", "10800"]],
                    [, "(\\d{3})(\\d{7,8})", "$1 $2", ["950"]]
                ],
                [
                    [, "(80\\d{2})(\\d{4})", "$1 $2", ["80[2678]"], "0$1", "$CC $1", 1],
                    [, "([48]00)(\\d{3})(\\d{4})", "$1 $2 $3", ["[48]00"]],
                    [, "(\\d{2})(\\d{5,6})", "$1 $2", ["(?:10|2\\d)[19]", "(?:10|2\\d)(?:10|9[56])", "(?:10|2\\d)(?:100|9[56])"], "0$1", "$CC $1"],
                    [, "(\\d{3})(\\d{5,6})", "$1 $2", ["[3-9]", "[3-9]\\d{2}[19]", "[3-9]\\d{2}(?:10|9[56])"], "0$1", "$CC $1"],
                    [, "(21)(\\d{4})(\\d{4,6})", "$1 $2 $3", ["21"], "0$1", "$CC $1", 1],
                    [, "([12]\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["10[1-9]|2[02-9]", "10[1-9]|2[02-9]", "10(?:[1-79]|8(?:[1-9]|0[1-9]))|2[02-9]"], "0$1", "$CC $1", 1],
                    [, "(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["3(?:11|7[179])|4(?:[15]1|3[12])|5(?:1|2[37]|3[12]|51|7[13-79]|9[15])|7(?:31|5[457]|6[09]|91)|8(?:[57]1|98)"], "0$1", "$CC $1", 1],
                    [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["3(?:1[02-9]|35|49|5|7[02-68]|9[1-68])|4(?:1[02-9]|2[179]|[35][2-9]|6[4789]|7\\d|8[23])|5(?:3[03-9]|4[36]|5[02-9]|6[1-46]|7[028]|80|9[2-46-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]|2[248]|3[04-9]|4[3-6]|6[2368])|8(?:1[236-8]|2[5-7]|3|5[4-9]|7[02-9]|8[3678]|9[1-7])|9(?:0[1-3689]|1[1-79]|[379]|4[13]|5[1-5])"], "0$1", "$CC $1", 1],
                    [, "(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["1[3-578]"], , "$CC $1"],
                    [, "(10800)(\\d{3})(\\d{4})", "$1 $2 $3", ["108", "1080", "10800"]],
                    [, "(\\d{3})(\\d{7,8})", "$1 $2", ["950"]]
                ],
                [, , "NA", "NA"], , , [, , "(?:4|(?:10)?8)00\\d{7}|950\\d{7,8}", "\\d{10,12}", , , "4001234567"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            CO: [, [, , "(?:[13]\\d{0,3}|[24-8])\\d{7}", "\\d{7,11}"],
                [, , "[124-8][2-9]\\d{6}", "\\d{8}", , , "12345678"],
                [, , "3(?:0[0-5]|1\\d|2[0-2]|5[01])\\d{7}", "\\d{10}", , , "3211234567"],
                [, , "1800\\d{7}", "\\d{11}", , , "18001234567"],
                [, , "19(?:0[01]|4[78])\\d{7}", "\\d{11}", , , "19001234567"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "CO", 57, "00(?:4(?:[14]4|56)|[579])", "0", , , "0([3579]|4(?:44|56))?", , , , [
                    [, "(\\d)(\\d{7})", "$1 $2", ["1(?:8[2-9]|9[0-3]|[2-7])|[24-8]", "1(?:8[2-9]|9(?:09|[1-3])|[2-7])|[24-8]"], "($1)", "0$CC $1"],
                    [, "(\\d{3})(\\d{7})", "$1 $2", ["3"], , "0$CC $1"],
                    [, "(1)(\\d{3})(\\d{7})", "$1-$2-$3", ["1(?:80|9[04])", "1(?:800|9(?:0[01]|4[78]))"], "0$1"]
                ],
                [
                    [, "(\\d)(\\d{7})", "$1 $2", ["1(?:8[2-9]|9[0-3]|[2-7])|[24-8]", "1(?:8[2-9]|9(?:09|[1-3])|[2-7])|[24-8]"], "($1)", "0$CC $1"],
                    [, "(\\d{3})(\\d{7})", "$1 $2", ["3"], , "0$CC $1"],
                    [, "(1)(\\d{3})(\\d{7})", "$1 $2 $3", ["1(?:80|9[04])", "1(?:800|9(?:0[01]|4[78]))"]]
                ],
                [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            CR: [, [, , "[24-9]\\d{7,9}", "\\d{8,10}"],
                [, , "2[0-24-7]\\d{6}", "\\d{8}", , , "22123456"],
                [, , "5(?:0[01]|7[0-3])\\d{5}|6(?:[0-2]\\d|30)\\d{5}|7[0-3]\\d{6}|8[3-9]\\d{6}", "\\d{8}", , , "83123456"],
                [, , "800\\d{7}", "\\d{10}", , , "8001234567"],
                [, , "90[059]\\d{7}", "\\d{10}", , , "9001234567"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "210[0-6]\\d{4}|4\\d{7}|5100\\d{4}", "\\d{8}", , , "40001234"], "CR", 506, "00", , , , "(19(?:0[012468]|1[09]|20|66|77|99))", , , , [
                    [, "(\\d{4})(\\d{4})", "$1 $2", ["[24-7]|8[3-9]"], , "$CC $1"],
                    [, "(\\d{3})(\\d{3})(\\d{4})", "$1-$2-$3", ["[89]0"], , "$CC $1"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            CU: [, [, , "[2-57]\\d{5,7}", "\\d{4,8}"],
                [, , "2[1-4]\\d{5,6}|3(?:1\\d{6}|[23]\\d{4,6})|4(?:[125]\\d{5,6}|[36]\\d{6}|[78]\\d{4,6})|7\\d{6,7}", "\\d{4,8}", , , "71234567"],
                [, , "5\\d{7}", "\\d{8}", , , "51234567"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "CU", 53, "119", "0", , , "0", , , , [
                    [, "(\\d)(\\d{6,7})", "$1 $2", ["7"], "(0$1)"],
                    [, "(\\d{2})(\\d{4,6})", "$1 $2", ["[2-4]"], "(0$1)"],
                    [, "(\\d)(\\d{7})", "$1 $2", ["5"], "0$1"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            CV: [, [, , "[259]\\d{6}", "\\d{7}"],
                [, , "2(?:2[1-7]|3[0-8]|4[12]|5[1256]|6\\d|7[1-3]|8[1-5])\\d{4}", "\\d{7}", , , "2211234"],
                [, , "(?:9\\d|59)\\d{5}", "\\d{7}", , , "9911234"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "CV", 238, "0", , , , , , , , [
                    [, "(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            CW: [, [, , "[169]\\d{6,7}", "\\d{7,8}"],
                [, , "9(?:[48]\\d{2}|50\\d|7(?:2[0-24]|[34]\\d|6[35-7]|77|8[7-9]))\\d{4}", "\\d{7,8}", , , "94151234"],
                [, , "9(?:5(?:[1246]\\d|3[01])|6(?:[16-9]\\d|3[01]))\\d{4}", "\\d{7,8}", , , "95181234"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "(?:10|69)\\d{5}", "\\d{7}", , , "1011234"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "CW", 599, "00", , , , , , , , [
                    [, "(\\d{3})(\\d{4})", "$1 $2", ["[13-7]"]],
                    [, "(9)(\\d{3})(\\d{4})", "$1 $2 $3", ["9"]]
                ], , [, , "955\\d{5}", "\\d{7,8}", , , "95581234"], 1, , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            CX: [, [, , "[1458]\\d{5,9}", "\\d{6,10}"],
                [, , "89164\\d{4}", "\\d{8,9}", , , "891641234"],
                [, , "14(?:5\\d|71)\\d{5}|4(?:[0-2]\\d|3[0-57-9]|4[47-9]|5[0-25-9]|6[6-9]|7[03-9]|8[147-9]|9[017-9])\\d{6}", "\\d{9}", , , "412345678"],
                [, , "180(?:0\\d{3}|2)\\d{3}", "\\d{7,10}", , , "1800123456"],
                [, , "190[0126]\\d{6}", "\\d{10}", , , "1900123456"],
                [, , "13(?:00\\d{2})?\\d{4}", "\\d{6,10}", , , "1300123456"],
                [, , "500\\d{6}", "\\d{9}", , , "500123456"],
                [, , "550\\d{6}", "\\d{9}", , , "550123456"], "CX", 61, "(?:14(?:1[14]|34|4[17]|[56]6|7[47]|88))?001[14-689]", "0", , , "0", , "0011", , , , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            CY: [, [, , "[257-9]\\d{7}", "\\d{8}"],
                [, , "2[2-6]\\d{6}", "\\d{8}", , , "22345678"],
                [, , "9[4-79]\\d{6}", "\\d{8}", , , "96123456"],
                [, , "800\\d{5}", "\\d{8}", , , "80001234"],
                [, , "90[09]\\d{5}", "\\d{8}", , , "90012345"],
                [, , "80[1-9]\\d{5}", "\\d{8}", , , "80112345"],
                [, , "700\\d{5}", "\\d{8}", , , "70012345"],
                [, , "NA", "NA"], "CY", 357, "00", , , , , , , , [
                    [, "(\\d{2})(\\d{6})", "$1 $2"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "(?:50|77)\\d{6}", "\\d{8}", , , "77123456"], , , [, , "NA", "NA"]
            ],
            CZ: [, [, , "[2-8]\\d{8}|9\\d{8,11}", "\\d{9,12}"],
                [, , "2\\d{8}|(?:3[1257-9]|4[16-9]|5[13-9])\\d{7}", "\\d{9,12}", , , "212345678"],
                [, , "(?:60[1-8]|7(?:0[2-5]|[2379]\\d))\\d{6}", "\\d{9,12}", , , "601123456"],
                [, , "800\\d{6}", "\\d{9,12}", , , "800123456"],
                [, , "9(?:0[05689]|76)\\d{6}", "\\d{9,12}", , , "900123456"],
                [, , "8[134]\\d{7}", "\\d{9,12}", , , "811234567"],
                [, , "70[01]\\d{6}", "\\d{9,12}", , , "700123456"],
                [, , "9[17]0\\d{6}", "\\d{9,12}", , , "910123456"], "CZ", 420, "00", , , , , , , , [
                    [, "([2-9]\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-8]|9[015-7]"]],
                    [, "(96\\d)(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["96"]],
                    [, "(9\\d)(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["9[36]"]]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "9(?:5\\d|7[234])\\d{6}", "\\d{9,12}", , , "972123456"], , , [, , "9(?:3\\d{9}|6\\d{7,10})", "\\d{9,12}", , , "93123456789"]
            ],
            DE: [, [, , "[1-35-9]\\d{3,14}|4(?:[0-8]\\d{4,12}|9(?:[0-37]\\d|4(?:[1-35-8]|4\\d?)|5\\d{1,2}|6[1-8]\\d?)\\d{2,8})", "\\d{2,15}"],
                [, , "[246]\\d{5,13}|3(?:0\\d{3,13}|2\\d{9}|[3-9]\\d{4,13})|5(?:0[2-8]|[1256]\\d|[38][0-8]|4\\d{0,2}|[79][0-7])\\d{3,11}|7(?:0[2-8]|[1-9]\\d)\\d{3,10}|8(?:0[2-9]|[1-9]\\d)\\d{3,10}|9(?:0[6-9]\\d{3,10}|1\\d{4,12}|[2-9]\\d{4,11})", "\\d{2,15}", , , "30123456"],
                [, , "1(?:5[0-25-9]\\d{8}|6[023]\\d{7,8}|7(?:[0-57-9]\\d?|6\\d)\\d{7})", "\\d{10,11}", , , "15123456789"],
                [, , "800\\d{7,12}", "\\d{10,15}", , , "8001234567890"],
                [, , "137[7-9]\\d{6}|900(?:[135]\\d{6}|9\\d{7})", "\\d{10,11}", , , "9001234567"],
                [, , "1(?:3(?:7[1-6]\\d{6}|8\\d{4})|80\\d{5,11})", "\\d{7,14}", , , "18012345"],
                [, , "700\\d{8}", "\\d{11}", , , "70012345678"],
                [, , "NA", "NA"], "DE", 49, "00", "0", , , "0", , , , [
                    [, "(1\\d{2})(\\d{7,8})", "$1 $2", ["1[67]"], "0$1"],
                    [, "(15\\d{3})(\\d{6})", "$1 $2", ["15[0568]"], "0$1"],
                    [, "(1\\d{3})(\\d{7})", "$1 $2", ["15"], "0$1"],
                    [, "(\\d{2})(\\d{3,11})", "$1 $2", ["3[02]|40|[68]9"], "0$1"],
                    [, "(\\d{3})(\\d{3,11})", "$1 $2", ["2(?:\\d1|0[2389]|1[24]|28|34)|3(?:[3-9][15]|40)|[4-8][1-9]1|9(?:06|[1-9]1)"], "0$1"],
                    [, "(\\d{4})(\\d{2,11})", "$1 $2", ["[24-6]|[7-9](?:\\d[1-9]|[1-9]\\d)|3(?:[3569][02-46-9]|4[2-4679]|7[2-467]|8[2-46-8])", "[24-6]|[7-9](?:\\d[1-9]|[1-9]\\d)|3(?:3(?:0[1-467]|2[127-9]|3[124578]|[46][1246]|7[1257-9]|8[1256]|9[145])|4(?:2[135]|3[1357]|4[13578]|6[1246]|7[1356]|9[1346])|5(?:0[14]|2[1-3589]|3[1357]|4[1246]|6[1-4]|7[1346]|8[13568]|9[1246])|6(?:0[356]|2[1-489]|3[124-6]|4[1347]|6[13]|7[12579]|8[1-356]|9[135])|7(?:2[1-7]|3[1357]|4[145]|6[1-5]|7[1-4])|8(?:21|3[1468]|4[1347]|6[0135-9]|7[1467]|8[136])|9(?:0[12479]|2[1358]|3[1357]|4[134679]|6[1-9]|7[136]|8[147]|9[1468]))"], "0$1"],
                    [, "(3\\d{4})(\\d{1,10})", "$1 $2", ["3"], "0$1"],
                    [, "(800)(\\d{7,12})", "$1 $2", ["800"], "0$1"],
                    [, "(177)(99)(\\d{7,8})", "$1 $2 $3", ["177", "1779", "17799"], "0$1"],
                    [, "(\\d{3})(\\d)(\\d{4,10})", "$1 $2 $3", ["(?:18|90)0|137", "1(?:37|80)|900[1359]"], "0$1"],
                    [, "(1\\d{2})(\\d{5,11})", "$1 $2", ["181"], "0$1"],
                    [, "(18\\d{3})(\\d{6})", "$1 $2", ["185", "1850", "18500"], "0$1"],
                    [, "(18\\d{2})(\\d{7})", "$1 $2", ["18[68]"], "0$1"],
                    [, "(18\\d)(\\d{8})", "$1 $2", ["18[2-579]"], "0$1"],
                    [, "(700)(\\d{4})(\\d{4})", "$1 $2 $3", ["700"], "0$1"],
                    [, "(138)(\\d{4})", "$1 $2", ["138"], "0$1"]
                ], , [, , "16(?:4\\d{1,10}|[89]\\d{1,11})", "\\d{4,14}", , , "16412345"], , , [, , "NA", "NA"],
                [, , "18(?:1\\d{5,11}|[2-9]\\d{8})", "\\d{8,14}", , , "18500123456"], , , [, , "17799\\d{7,8}", "\\d{12,13}", , , "177991234567"]
            ],
            DJ: [, [, , "[27]\\d{7}", "\\d{8}"],
                [, , "2(?:1[2-5]|7[45])\\d{5}", "\\d{8}", , , "21360003"],
                [, , "77[6-8]\\d{5}", "\\d{8}", , , "77831001"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "DJ", 253, "00", , , , , , , , [
                    [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            DK: [, [, , "[2-9]\\d{7}", "\\d{8}"],
                [, , "(?:[2-7]\\d|8[126-9]|9[1-36-9])\\d{6}", "\\d{8}", , , "32123456"],
                [, , "(?:[2-7]\\d|8[126-9]|9[1-36-9])\\d{6}", "\\d{8}", , , "20123456"],
                [, , "80\\d{6}", "\\d{8}", , , "80123456"],
                [, , "90\\d{6}", "\\d{8}", , , "90123456"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "DK", 45, "00", , , , , , , 1, [
                    [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            DM: [, [, , "[57-9]\\d{9}", "\\d{7}(?:\\d{3})?"],
                [, , "767(?:2(?:55|66)|4(?:2[01]|4[0-25-9])|50[0-4]|70[1-3])\\d{4}", "\\d{7}(?:\\d{3})?", , , "7674201234"],
                [, , "767(?:2(?:[234689]5|7[5-7])|31[5-7]|61[2-7])\\d{4}", "\\d{10}", , , "7672251234"],
                [, , "8(?:00|44|55|66|77|88)[2-9]\\d{6}", "\\d{10}", , , "8002123456"],
                [, , "900[2-9]\\d{6}", "\\d{10}", , , "9002123456"],
                [, , "NA", "NA"],
                [, , "5(?:00|33|44|66|77)[2-9]\\d{6}", "\\d{10}", , , "5002345678"],
                [, , "NA", "NA"], "DM", 1, "011", "1", , , "1", , , , , , [, , "NA", "NA"], , "767", [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            DO: [, [, , "[589]\\d{9}", "\\d{7}(?:\\d{3})?"],
                [, , "8(?:[04]9[2-9]\\d{6}|29(?:2(?:[0-59]\\d|6[04-9]|7[0-27]|8[0237-9])|3(?:[0-35-9]\\d|4[7-9])|[45]\\d{2}|6(?:[0-27-9]\\d|[3-5][1-9]|6[0135-8])|7(?:0[013-9]|[1-37]\\d|4[1-35689]|5[1-4689]|6[1-57-9]|8[1-79]|9[1-8])|8(?:0[146-9]|1[0-48]|[248]\\d|3[1-79]|5[01589]|6[013-68]|7[124-8]|9[0-8])|9(?:[0-24]\\d|3[02-46-9]|5[0-79]|60|7[0169]|8[57-9]|9[02-9]))\\d{4})", "\\d{7}(?:\\d{3})?", , , "8092345678"],
                [, , "8[024]9[2-9]\\d{6}", "\\d{7}(?:\\d{3})?", , , "8092345678"],
                [, , "8(?:00|44|55|66|77|88)[2-9]\\d{6}", "\\d{10}", , , "8002123456"],
                [, , "900[2-9]\\d{6}", "\\d{10}", , , "9002123456"],
                [, , "NA", "NA"],
                [, , "5(?:00|33|44|66|77)[2-9]\\d{6}", "\\d{10}", , , "5002345678"],
                [, , "NA", "NA"], "DO", 1, "011", "1", , , "1", , , , , , [, , "NA", "NA"], , "8[024]9", [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            DZ: [, [, , "(?:[1-4]|[5-9]\\d)\\d{7}", "\\d{8,9}"],
                [, , "(?:1\\d|2[013-79]|3[0-8]|4[0135689])\\d{6}|9619\\d{5}", "\\d{8,9}", , , "12345678"],
                [, , "(?:5[4-6]|7[7-9])\\d{7}|6(?:[569]\\d|7[0-6])\\d{6}", "\\d{9}", , , "551234567"],
                [, , "800\\d{6}", "\\d{9}", , , "800123456"],
                [, , "80[3-689]1\\d{5}", "\\d{9}", , , "808123456"],
                [, , "80[12]1\\d{5}", "\\d{9}", , , "801123456"],
                [, , "NA", "NA"],
                [, , "98[23]\\d{6}", "\\d{9}", , , "983123456"], "DZ", 213, "00", "0", , , "0", , , , [
                    [, "([1-4]\\d)(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[1-4]"], "0$1"],
                    [, "([5-8]\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[5-8]"], "0$1"],
                    [, "(9\\d)(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["9"], "0$1"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            EC: [, [, , "1\\d{9,10}|[2-8]\\d{7}|9\\d{8}", "\\d{7,11}"],
                [, , "[2-7][2-7]\\d{6}", "\\d{7,8}", , , "22123456"],
                [, , "9(?:39|[45][89]|[67][7-9]|[89]\\d)\\d{6}", "\\d{9}", , , "991234567"],
                [, , "1800\\d{6,7}", "\\d{10,11}", , , "18001234567"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "[2-7]890\\d{4}", "\\d{8}", , , "28901234"], "EC", 593, "00", "0", , , "0", , , , [
                    [, "(\\d)(\\d{3})(\\d{4})", "$1 $2-$3", ["[247]|[356][2-8]"], "(0$1)"],
                    [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["9"], "0$1"],
                    [, "(1800)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["1"], "$1"]
                ],
                [
                    [, "(\\d)(\\d{3})(\\d{4})", "$1-$2-$3", ["[247]|[356][2-8]"]],
                    [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["9"], "0$1"],
                    [, "(1800)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["1"], "$1"]
                ],
                [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            EE: [, [, , "1\\d{3,4}|[3-9]\\d{6,7}|800\\d{6,7}", "\\d{4,10}"],
                [, , "(?:3[23589]|4[3-8]|6\\d|7[1-9]|88)\\d{5}", "\\d{7}", , , "3212345"],
                [, , "(?:5\\d|8[1-5])\\d{6}|5(?:[02]\\d{2}|1(?:[0-8]\\d|95)|5[0-478]\\d|64[0-4]|65[1-589])\\d{3}", "\\d{7,8}", , , "51234567"],
                [, , "800(?:0\\d{3}|1\\d|[2-9])\\d{3}", "\\d{7,10}", , , "80012345"],
                [, , "(?:40\\d{2}|900)\\d{4}", "\\d{7,8}", , , "9001234"],
                [, , "NA", "NA"],
                [, , "70[0-2]\\d{5}", "\\d{8}", , , "70012345"],
                [, , "NA", "NA"], "EE", 372, "00", , , , , , , , [
                    [, "([3-79]\\d{2})(\\d{4})", "$1 $2", ["[369]|4[3-8]|5(?:[0-2]|5[0-478]|6[45])|7[1-9]", "[369]|4[3-8]|5(?:[02]|1(?:[0-8]|95)|5[0-478]|6(?:4[0-4]|5[1-589]))|7[1-9]"]],
                    [, "(70)(\\d{2})(\\d{4})", "$1 $2 $3", ["70"]],
                    [, "(8000)(\\d{3})(\\d{3})", "$1 $2 $3", ["800", "8000"]],
                    [, "([458]\\d{3})(\\d{3,4})", "$1 $2", ["40|5|8(?:00|[1-5])", "40|5|8(?:00[1-9]|[1-5])"]]
                ], , [, , "NA", "NA"], , , [, , "1\\d{3,4}|800[2-9]\\d{3}", "\\d{4,7}", , , "8002123"],
                [, , "1(?:2[01245]|3[0-6]|4[1-489]|5[0-59]|6[1-46-9]|7[0-27-9]|8[189]|9[012])\\d{1,2}", "\\d{4,5}", , , "12123"], , , [, , "NA", "NA"]
            ],
            EG: [, [, , "1\\d{4,9}|[2456]\\d{8}|3\\d{7}|[89]\\d{8,9}", "\\d{5,10}"],
                [, , "(?:1(?:3[23]\\d|5(?:[23]|9\\d))|2[2-4]\\d{2}|3\\d{2}|4(?:0[2-5]|[578][23]|64)\\d|5(?:0[2-7]|[57][23])\\d|6[24-689]3\\d|8(?:2[2-57]|4[26]|6[237]|8[2-4])\\d|9(?:2[27]|3[24]|52|6[2356]|7[2-4])\\d)\\d{5}|1[69]\\d{3}", "\\d{5,9}", , , "234567890"],
                [, , "1(?:0[0-269]|1[0-245]|2[0-278])\\d{7}", "\\d{10}", , , "1001234567"],
                [, , "800\\d{7}", "\\d{10}", , , "8001234567"],
                [, , "900\\d{7}", "\\d{10}", , , "9001234567"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "EG", 20, "00", "0", , , "0", , , , [
                    [, "(\\d)(\\d{7,8})", "$1 $2", ["[23]"], "0$1"],
                    [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["1[012]|[89]00"], "0$1"],
                    [, "(\\d{2})(\\d{6,7})", "$1 $2", ["1[35]|[4-6]|[89][2-9]"], "0$1"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            EH: [, [, , "[5689]\\d{8}", "\\d{9}"],
                [, , "528[89]\\d{5}", "\\d{9}", , , "528812345"],
                [, , "6(?:0[0-8]|[12-79]\\d|8[017])\\d{6}", "\\d{9}", , , "650123456"],
                [, , "80\\d{7}", "\\d{9}", , , "801234567"],
                [, , "89\\d{7}", "\\d{9}", , , "891234567"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "EH", 212, "00", "0", , , "0", , , , , , [, , "NA", "NA"], , "528[89]", [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            ER: [, [, , "[178]\\d{6}", "\\d{6,7}"],
                [, , "1(?:1[12568]|20|40|55|6[146])\\d{4}|8\\d{6}", "\\d{6,7}", , , "8370362"],
                [, , "17[1-3]\\d{4}|7\\d{6}", "\\d{7}", , , "7123456"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "ER", 291, "00", "0", , , "0", , , , [
                    [, "(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", , "0$1"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            ES: [, [, , "[5-9]\\d{8}", "\\d{9}"],
                [, , "8(?:[13]0|[28][0-8]|[47][1-9]|5[01346-9]|6[0457-9])\\d{6}|9(?:[1238][0-8]\\d{6}|4[1-9]\\d{6}|5\\d{7}|6(?:[0-8]\\d{6}|9(?:0(?:[0-57-9]\\d{4}|6(?:0[0-8]|1[1-9]|[2-9]\\d)\\d{2})|[1-9]\\d{5}))|7(?:[124-9]\\d{2}|3(?:[0-8]\\d|9[1-9]))\\d{4})", "\\d{9}", , , "810123456"],
                [, , "(?:6\\d{6}|7[1-4]\\d{5}|9(?:6906(?:09|10)|7390\\d{2}))\\d{2}", "\\d{9}", , , "612345678"],
                [, , "[89]00\\d{6}", "\\d{9}", , , "800123456"],
                [, , "80[367]\\d{6}", "\\d{9}", , , "803123456"],
                [, , "90[12]\\d{6}", "\\d{9}", , , "901123456"],
                [, , "70\\d{7}", "\\d{9}", , , "701234567"],
                [, , "NA", "NA"], "ES", 34, "00", , , , , , , , [
                    [, "([89]00)(\\d{3})(\\d{3})", "$1 $2 $3", ["[89]00"]],
                    [, "([5-9]\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[568]|[79][0-8]"]]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "51\\d{7}", "\\d{9}", , , "511234567"], , , [, , "NA", "NA"]
            ],
            ET: [, [, , "[1-59]\\d{8}", "\\d{7,9}"],
                [, , "(?:11(?:1(?:1[124]|2[2-57]|3[1-5]|5[5-8]|8[6-8])|2(?:13|3[6-8]|5[89]|7[05-9]|8[2-6])|3(?:2[01]|3[0-289]|4[1289]|7[1-4]|87)|4(?:1[69]|3[2-49]|4[0-3]|6[5-8])|5(?:1[57]|44|5[0-4])|6(?:18|2[69]|4[5-7]|5[1-5]|6[0-59]|8[015-8]))|2(?:2(?:11[1-9]|22[0-7]|33\\d|44[1467]|66[1-68])|5(?:11[124-6]|33[2-8]|44[1467]|55[14]|66[1-3679]|77[124-79]|880))|3(?:3(?:11[0-46-8]|22[0-6]|33[0134689]|44[04]|55[0-6]|66[01467])|4(?:44[0-8]|55[0-69]|66[0-3]|77[1-5]))|4(?:6(?:22[0-24-7]|33[1-5]|44[13-69]|55[14-689]|660|88[1-4])|7(?:11[1-9]|22[1-9]|33[13-7]|44[13-6]|55[1-689]))|5(?:7(?:227|55[05]|(?:66|77)[14-8])|8(?:11[149]|22[013-79]|33[0-68]|44[013-8]|550|66[1-5]|77\\d)))\\d{4}", "\\d{7,9}", , , "111112345"],
                [, , "9(?:[1-3]\\d|5[89])\\d{6}", "\\d{9}", , , "911234567"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "ET", 251, "00", "0", , , "0", , , , [
                    [, "([1-59]\\d)(\\d{3})(\\d{4})", "$1 $2 $3", , "0$1"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            FI: [, [, , "1\\d{4,11}|[2-9]\\d{4,10}", "\\d{5,12}"],
                [, , "1(?:[3569][1-8]\\d{3,9}|[47]\\d{5,10})|2[1-8]\\d{3,9}|3(?:[1-8]\\d{3,9}|9\\d{4,8})|[5689][1-8]\\d{3,9}", "\\d{5,12}", , , "1312345678"],
                [, , "4\\d{5,10}|50\\d{4,8}", "\\d{6,11}", , , "412345678"],
                [, , "800\\d{4,7}", "\\d{7,10}", , , "8001234567"],
                [, , "[67]00\\d{5,6}", "\\d{8,9}", , , "600123456"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "FI", 358, "00|99[049]", "0", , , "0", , , , [
                    [, "(\\d{3})(\\d{3,7})", "$1 $2", ["(?:[1-3]00|[6-8]0)"], "0$1"],
                    [, "(116\\d{3})", "$1", ["116"], "$1"],
                    [, "(\\d{2})(\\d{4,10})", "$1 $2", ["[14]|2[09]|50|7[135]"], "0$1"],
                    [, "(\\d)(\\d{4,11})", "$1 $2", ["[25689][1-8]|3"], "0$1"]
                ], , [, , "NA", "NA"], 1, , [, , "[13]00\\d{3,7}|2(?:0(?:0\\d{3,7}|2[023]\\d{1,6}|9[89]\\d{1,6}))|60(?:[12]\\d{5,6}|6\\d{7})|7(?:1\\d{7}|3\\d{8}|5[03-9]\\d{2,7})", "\\d{5,10}", , , "100123"],
                [, , "[13]0\\d{4,8}|2(?:0(?:[016-8]\\d{3,7}|[2-59]\\d{2,7})|9\\d{4,8})|60(?:[12]\\d{5,6}|6\\d{7})|7(?:1\\d{7}|3\\d{8}|5[03-9]\\d{2,7})", "\\d{5,10}", , , "10112345"], , , [, , "NA", "NA"]
            ],
            FJ: [, [, , "[36-9]\\d{6}|0\\d{10}", "\\d{7}(?:\\d{4})?"],
                [, , "(?:3[0-5]|6[25-7]|8[58])\\d{5}", "\\d{7}", , , "3212345"],
                [, , "(?:7[0-8]|8[034679]|9\\d)\\d{5}", "\\d{7}", , , "7012345"],
                [, , "0800\\d{7}", "\\d{11}", , , "08001234567"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "FJ", 679, "0(?:0|52)", , , , , , "00", , [
                    [, "(\\d{3})(\\d{4})", "$1 $2", ["[36-9]"]],
                    [, "(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["0"]]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], 1, , [, , "NA", "NA"]
            ],
            FK: [, [, , "[2-7]\\d{4}", "\\d{5}"],
                [, , "[2-47]\\d{4}", "\\d{5}", , , "31234"],
                [, , "[56]\\d{4}", "\\d{5}", , , "51234"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "FK", 500, "00", , , , , , , , , , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            FM: [, [, , "[39]\\d{6}", "\\d{7}"],
                [, , "3[2357]0[1-9]\\d{3}|9[2-6]\\d{5}", "\\d{7}", , , "3201234"],
                [, , "3[2357]0[1-9]\\d{3}|9[2-7]\\d{5}", "\\d{7}", , , "3501234"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "FM", 691, "00", , , , , , , , [
                    [, "(\\d{3})(\\d{4})", "$1 $2"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            FO: [, [, , "[2-9]\\d{5}", "\\d{6}"],
                [, , "(?:20|[3-4]\\d|8[19])\\d{4}", "\\d{6}", , , "201234"],
                [, , "(?:2[1-9]|5\\d|7[1-79])\\d{4}", "\\d{6}", , , "211234"],
                [, , "80[257-9]\\d{3}", "\\d{6}", , , "802123"],
                [, , "90(?:[1345][15-7]|2[125-7]|99)\\d{2}", "\\d{6}", , , "901123"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "(?:6[0-36]|88)\\d{4}", "\\d{6}", , , "601234"], "FO", 298, "00", , , , "(10(?:01|[12]0|88))", , , , [
                    [, "(\\d{6})", "$1", , , "$CC $1"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            FR: [, [, , "[1-9]\\d{8}", "\\d{9}"],
                [, , "[1-5]\\d{8}", "\\d{9}", , , "123456789"],
                [, , "6\\d{8}|7(?:00\\d{6}|[3-9]\\d{7})", "\\d{9}", , , "612345678"],
                [, , "80\\d{7}", "\\d{9}", , , "801234567"],
                [, , "89[1-37-9]\\d{6}", "\\d{9}", , , "891123456"],
                [, , "8(?:1[019]|2[0156]|84|90)\\d{6}", "\\d{9}", , , "810123456"],
                [, , "NA", "NA"],
                [, , "9\\d{8}", "\\d{9}", , , "912345678"], "FR", 33, "00", "0", , , "0", , , , [
                    [, "([1-79])(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["[1-79]"], "0$1"],
                    [, "(1\\d{2})(\\d{3})", "$1 $2", ["11"], "$1"],
                    [, "(8\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"], "0 $1"]
                ],
                [
                    [, "([1-79])(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["[1-79]"], "0$1"],
                    [, "(8\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"], "0 $1"]
                ],
                [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            GA: [, [, , "0?\\d{7}", "\\d{7,8}"],
                [, , "01\\d{6}", "\\d{8}", , , "01441234"],
                [, , "0?[2-7]\\d{6}", "\\d{7,8}", , , "06031234"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "GA", 241, "00", , , , , , , , [
                    [, "(\\d)(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2-7]"], "0$1"],
                    [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["0"]]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], 1, , [, , "NA", "NA"]
            ],
            GB: [, [, , "\\d{7,10}", "\\d{4,10}"],
                [, , "2(?:0[01378]|3[0189]|4[017]|8[0-46-9]|9[012])\\d{7}|1(?:(?:1(?:3[0-48]|[46][0-4]|5[012789]|7[0-49]|8[01349])|21[0-7]|31[0-8]|[459]1\\d|61[0-46-9]))\\d{6}|1(?:2(?:0[024-9]|2[3-9]|3[3-79]|4[1-689]|[58][02-9]|6[0-4789]|7[013-9]|9\\d)|3(?:0\\d|[25][02-9]|3[02-579]|[468][0-46-9]|7[1235679]|9[24578])|4(?:0[03-9]|[28][02-5789]|[37]\\d|4[02-69]|5[0-8]|[69][0-79])|5(?:0[1235-9]|2[024-9]|3[015689]|4[02-9]|5[03-9]|6\\d|7[0-35-9]|8[0-468]|9[0-5789])|6(?:0[034689]|2[0-35689]|[38][013-9]|4[1-467]|5[0-69]|6[13-9]|7[0-8]|9[0124578])|7(?:0[0246-9]|2\\d|3[023678]|4[03-9]|5[0-46-9]|6[013-9]|7[0-35-9]|8[024-9]|9[02-9])|8(?:0[35-9]|2[1-5789]|3[02-578]|4[0-578]|5[124-9]|6[2-69]|7\\d|8[02-9]|9[02569])|9(?:0[02-589]|2[02-689]|3[1-5789]|4[2-9]|5[0-579]|6[234789]|7[0124578]|8\\d|9[2-57]))\\d{6}|1(?:2(?:0(?:46[1-4]|87[2-9])|545[1-79]|76(?:2\\d|3[1-8]|6[1-6])|9(?:7(?:2[0-4]|3[2-5])|8(?:2[2-8]|7[0-4789]|8[345])))|3(?:638[2-5]|647[23]|8(?:47[04-9]|64[015789]))|4(?:044[1-7]|20(?:2[23]|8\\d)|6(?:0(?:30|5[2-57]|6[1-8]|7[2-8])|140)|8(?:052|87[123]))|5(?:24(?:3[2-79]|6\\d)|276\\d|6(?:26[06-9]|686))|6(?:06(?:4\\d|7[4-79])|295[567]|35[34]\\d|47(?:24|61)|59(?:5[08]|6[67]|74)|955[0-4])|7(?:26(?:6[13-9]|7[0-7])|442\\d|50(?:2[0-3]|[3-68]2|76))|8(?:27[56]\\d|37(?:5[2-5]|8[239])|84(?:3[2-58]))|9(?:0(?:0(?:6[1-8]|85)|52\\d)|3583|4(?:66[1-8]|9(?:2[01]|81))|63(?:23|3[1-4])|9561))\\d{3}|176888[234678]\\d{2}|16977[23]\\d{3}", "\\d{4,10}", , , "1212345678"],
                [, , "7(?:[1-4]\\d\\d|5(?:0[0-8]|[13-9]\\d|2[0-35-9])|7(?:0[1-9]|[1-7]\\d|8[02-9]|9[0-689])|8(?:[014-9]\\d|[23][0-8])|9(?:[04-9]\\d|1[02-9]|2[0-35-9]|3[0-689]))\\d{6}", "\\d{10}", , , "7400123456"],
                [, , "80(?:0(?:1111|\\d{6,7})|8\\d{7})|500\\d{6}", "\\d{7}(?:\\d{2,3})?", , , "8001234567"],
                [, , "(?:87[123]|9(?:[01]\\d|8[2349]))\\d{7}", "\\d{10}", , , "9012345678"],
                [, , "8(?:4(?:5464\\d|[2-5]\\d{7})|70\\d{7})", "\\d{7}(?:\\d{3})?", , , "8431234567"],
                [, , "70\\d{8}", "\\d{10}", , , "7012345678"],
                [, , "56\\d{8}", "\\d{10}", , , "5612345678"], "GB", 44, "00", "0", " x", , "0", , , , [
                    [, "(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["2|5[56]|7(?:0|6[013-9])", "2|5[56]|7(?:0|6(?:[013-9]|2[0-35-9]))"], "0$1"],
                    [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["1(?:1|\\d1)|3|9[018]"], "0$1"],
                    [, "(\\d{5})(\\d{4,5})", "$1 $2", ["1(?:38|5[23]|69|76|94)", "1(?:387|5(?:24|39)|697|768|946)", "1(?:3873|5(?:242|39[456])|697[347]|768[347]|9467)"], "0$1"],
                    [, "(1\\d{3})(\\d{5,6})", "$1 $2", ["1"], "0$1"],
                    [, "(7\\d{3})(\\d{6})", "$1 $2", ["7(?:[1-5789]|62)", "7(?:[1-5789]|624)"], "0$1"],
                    [, "(800)(\\d{4})", "$1 $2", ["800", "8001", "80011", "800111", "8001111"], "0$1"],
                    [, "(845)(46)(4\\d)", "$1 $2 $3", ["845", "8454", "84546", "845464"], "0$1"],
                    [, "(8\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["8(?:4[2-5]|7[0-3])"], "0$1"],
                    [, "(80\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["80"], "0$1"],
                    [, "([58]00)(\\d{6})", "$1 $2", ["[58]00"], "0$1"]
                ], , [, , "76(?:0[012]|2[356]|4[0134]|5[49]|6[0-369]|77|81|9[39])\\d{6}", "\\d{10}", , , "7640123456"], 1, , [, , "NA", "NA"],
                [, , "(?:3[0347]|55)\\d{8}", "\\d{10}", , , "5512345678"], , , [, , "NA", "NA"]
            ],
            GD: [, [, , "[4589]\\d{9}", "\\d{7}(?:\\d{3})?"],
                [, , "473(?:2(?:3[0-2]|69)|3(?:2[89]|86)|4(?:[06]8|3[5-9]|4[0-49]|5[5-79]|68|73|90)|63[68]|7(?:58|84)|800|938)\\d{4}", "\\d{7}(?:\\d{3})?", , , "4732691234"],
                [, , "473(?:4(?:0[2-79]|1[04-9]|20|58)|5(?:2[01]|3[3-8])|901)\\d{4}", "\\d{10}", , , "4734031234"],
                [, , "8(?:00|44|55|66|77|88)[2-9]\\d{6}", "\\d{10}", , , "8002123456"],
                [, , "900[2-9]\\d{6}", "\\d{10}", , , "9002123456"],
                [, , "NA", "NA"],
                [, , "5(?:00|33|44|66|77)[2-9]\\d{6}", "\\d{10}", , , "5002345678"],
                [, , "NA", "NA"], "GD", 1, "011", "1", , , "1", , , , , , [, , "NA", "NA"], , "473", [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            GE: [, [, , "[34578]\\d{8}", "\\d{6,9}"],
                [, , "(?:3(?:[256]\\d|4[124-9]|7[0-4])|4(?:1\\d|2[2-7]|3[1-79]|4[2-8]|7[239]|9[1-7]))\\d{6}", "\\d{6,9}", , , "322123456"],
                [, , "5(?:14|5[01578]|68|7[0147-9]|9[0-35-9])\\d{6}", "\\d{9}", , , "555123456"],
                [, , "800\\d{6}", "\\d{9}", , , "800123456"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "706\\d{6}", "\\d{9}", , , "706123456"], "GE", 995, "00", "0", , , "0", , , , [
                    [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[348]"], "0$1"],
                    [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["7"], "0$1"],
                    [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["5"], "$1"]
                ], , [, , "NA", "NA"], , , [, , "706\\d{6}", "\\d{9}", , , "706123456"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            GF: [, [, , "[56]\\d{8}", "\\d{9}"],
                [, , "594(?:10|2[012457-9]|3[0-57-9]|4[3-9]|5[7-9]|6[0-3]|9[014])\\d{4}", "\\d{9}", , , "594101234"],
                [, , "694(?:[04][0-7]|1[0-5]|3[018]|[29]\\d)\\d{4}", "\\d{9}", , , "694201234"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "GF", 594, "00", "0", , , "0", , , , [
                    [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", , "0$1"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            GG: [, [, , "[135789]\\d{6,9}", "\\d{6,10}"],
                [, , "1481\\d{6}", "\\d{6,10}", , , "1481456789"],
                [, , "7(?:781|839|911)\\d{6}", "\\d{10}", , , "7781123456"],
                [, , "80(?:0(?:1111|\\d{6,7})|8\\d{7})|500\\d{6}", "\\d{7}(?:\\d{2,3})?", , , "8001234567"],
                [, , "(?:87[123]|9(?:[01]\\d|8[0-3]))\\d{7}", "\\d{10}", , , "9012345678"],
                [, , "8(?:4(?:5464\\d|[2-5]\\d{7})|70\\d{7})", "\\d{7}(?:\\d{3})?", , , "8431234567"],
                [, , "70\\d{8}", "\\d{10}", , , "7012345678"],
                [, , "56\\d{8}", "\\d{10}", , , "5612345678"], "GG", 44, "00", "0", " x", , "0", , , , , , [, , "76(?:0[012]|2[356]|4[0134]|5[49]|6[0-369]|77|81|9[39])\\d{6}", "\\d{10}", , , "7640123456"], , , [, , "NA", "NA"],
                [, , "(?:3[0347]|55)\\d{8}", "\\d{10}", , , "5512345678"], , , [, , "NA", "NA"]
            ],
            GH: [, [, , "[235]\\d{8}|8\\d{7}", "\\d{7,9}"],
                [, , "3(?:0[237]\\d|[167](?:2[0-6]|7\\d)|2(?:2[0-5]|7\\d)|3(?:2[0-3]|7\\d)|4(?:2[013-9]|3[01]|7\\d)|5(?:2[0-7]|7\\d)|8(?:2[0-2]|7\\d)|9(?:20|7\\d))\\d{5}", "\\d{7,9}", , , "302345678"],
                [, , "(?:2[034678]\\d|5(?:[047]\\d|5[3-6]|6[01]))\\d{6}", "\\d{9}", , , "231234567"],
                [, , "800\\d{5}", "\\d{8}", , , "80012345"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "GH", 233, "00", "0", , , "0", , , , [
                    [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[235]"], "0$1"],
                    [, "(\\d{3})(\\d{5})", "$1 $2", ["8"], "0$1"]
                ], , [, , "NA", "NA"], , , [, , "800\\d{5}", "\\d{8}", , , "80012345"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            GI: [, [, , "[2568]\\d{7}", "\\d{8}"],
                [, , "2(?:00\\d|1(?:6[24-7]|9\\d)|2(?:00|2[2457]))\\d{4}", "\\d{8}", , , "20012345"],
                [, , "(?:5[46-8]|62)\\d{6}", "\\d{8}", , , "57123456"],
                [, , "80\\d{6}", "\\d{8}", , , "80123456"],
                [, , "8[1-689]\\d{6}", "\\d{8}", , , "88123456"],
                [, , "87\\d{6}", "\\d{8}", , , "87123456"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "GI", 350, "00", , , , , , , , [
                    [, "(\\d{3})(\\d{5})", "$1 $2", ["2"]]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            GL: [, [, , "[1-689]\\d{5}", "\\d{6}"],
                [, , "(?:19|3[1-6]|6[14689]|8[14-79]|9\\d)\\d{4}", "\\d{6}", , , "321000"],
                [, , "[245][2-9]\\d{4}", "\\d{6}", , , "221234"],
                [, , "80\\d{4}", "\\d{6}", , , "801234"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "3[89]\\d{4}", "\\d{6}", , , "381234"], "GL", 299, "00", , , , , , , , [
                    [, "(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            GM: [, [, , "[2-9]\\d{6}", "\\d{7}"],
                [, , "(?:4(?:[23]\\d{2}|4(?:1[024679]|[6-9]\\d))|5(?:54[0-7]|6(?:[67]\\d)|7(?:1[04]|2[035]|3[58]|48))|8\\d{3})\\d{3}", "\\d{7}", , , "5661234"],
                [, , "(?:2[0-6]|[3679]\\d)\\d{5}", "\\d{7}", , , "3012345"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "GM", 220, "00", , , , , , , , [
                    [, "(\\d{3})(\\d{4})", "$1 $2"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            GN: [, [, , "[367]\\d{7,8}", "\\d{8,9}"],
                [, , "30(?:24|3[12]|4[1-35-7]|5[13]|6[189]|[78]1|9[1478])\\d{4}", "\\d{8}", , , "30241234"],
                [, , "6[02356]\\d{7}", "\\d{9}", , , "601123456"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "722\\d{6}", "\\d{9}", , , "722123456"], "GN", 224, "00", , , , , , , , [
                    [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["3"]],
                    [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[67]"]]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            GP: [, [, , "[56]\\d{8}", "\\d{9}"],
                [, , "590(?:0[13468]|1[012]|2[0-68]|3[28]|4[0-8]|5[579]|6[0189]|70|8[0-689]|9\\d)\\d{4}", "\\d{9}", , , "590201234"],
                [, , "690(?:0[0-7]|[1-9]\\d)\\d{4}", "\\d{9}", , , "690301234"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "GP", 590, "00", "0", , , "0", , , , [
                    [, "([56]90)(\\d{2})(\\d{4})", "$1 $2-$3", , "0$1"]
                ], , [, , "NA", "NA"], 1, , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            GQ: [, [, , "[23589]\\d{8}", "\\d{9}"],
                [, , "3(?:3(?:3\\d[7-9]|[0-24-9]\\d[46])|5\\d{2}[7-9])\\d{4}", "\\d{9}", , , "333091234"],
                [, , "(?:222|551)\\d{6}", "\\d{9}", , , "222123456"],
                [, , "80\\d[1-9]\\d{5}", "\\d{9}", , , "800123456"],
                [, , "90\\d[1-9]\\d{5}", "\\d{9}", , , "900123456"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "GQ", 240, "00", , , , , , , , [
                    [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[235]"]],
                    [, "(\\d{3})(\\d{6})", "$1 $2", ["[89]"]]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            GR: [, [, , "[26-9]\\d{9}", "\\d{10}"],
                [, , "2(?:1\\d{2}|2(?:2[1-46-9]|3[1-8]|4[1-7]|5[1-4]|6[1-8]|7[1-5]|[89][1-9])|3(?:1\\d|2[1-57]|[35][1-3]|4[13]|7[1-7]|8[124-6]|9[1-79])|4(?:1\\d|2[1-8]|3[1-4]|4[13-5]|6[1-578]|9[1-5])|5(?:1\\d|[29][1-4]|3[1-5]|4[124]|5[1-6])|6(?:1\\d|3[1245]|4[1-7]|5[13-9]|[269][1-6]|7[14]|8[1-5])|7(?:1\\d|2[1-5]|3[1-6]|4[1-7]|5[1-57]|6[135]|9[125-7])|8(?:1\\d|2[1-5]|[34][1-4]|9[1-57]))\\d{6}", "\\d{10}", , , "2123456789"],
                [, , "69\\d{8}", "\\d{10}", , , "6912345678"],
                [, , "800\\d{7}", "\\d{10}", , , "8001234567"],
                [, , "90[19]\\d{7}", "\\d{10}", , , "9091234567"],
                [, , "8(?:0[16]|12|25)\\d{7}", "\\d{10}", , , "8011234567"],
                [, , "70\\d{8}", "\\d{10}", , , "7012345678"],
                [, , "NA", "NA"], "GR", 30, "00", , , , , , , , [
                    [, "([27]\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["21|7"]],
                    [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["2[2-9]1|[689]"]],
                    [, "(2\\d{3})(\\d{6})", "$1 $2", ["2[2-9][02-9]"]]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            GT: [, [, , "[2-7]\\d{7}|1[89]\\d{9}", "\\d{8}(?:\\d{3})?"],
                [, , "[267][2-9]\\d{6}", "\\d{8}", , , "22456789"],
                [, , "[345]\\d{7}", "\\d{8}", , , "51234567"],
                [, , "18[01]\\d{8}", "\\d{11}", , , "18001112222"],
                [, , "19\\d{9}", "\\d{11}", , , "19001112222"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "GT", 502, "00", , , , , , , , [
                    [, "(\\d{4})(\\d{4})", "$1 $2", ["[2-7]"]],
                    [, "(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"]]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            GU: [, [, , "[5689]\\d{9}", "\\d{7}(?:\\d{3})?"],
                [, , "671(?:3(?:00|3[39]|4[349]|55|6[26])|4(?:56|7[1-9]|8[236-9])|5(?:55|6[2-5]|88)|6(?:3[2-578]|4[24-9]|5[34]|78|8[5-9])|7(?:[079]7|2[0167]|3[45]|8[789])|8(?:[2-5789]8|6[48])|9(?:2[29]|6[79]|7[179]|8[789]|9[78]))\\d{4}", "\\d{7}(?:\\d{3})?", , , "6713001234"],
                [, , "671(?:3(?:00|3[39]|4[349]|55|6[26])|4(?:56|7[1-9]|8[236-9])|5(?:55|6[2-5]|88)|6(?:3[2-578]|4[24-9]|5[34]|78|8[5-9])|7(?:[079]7|2[0167]|3[45]|8[789])|8(?:[2-5789]8|6[48])|9(?:2[29]|6[79]|7[179]|8[789]|9[78]))\\d{4}", "\\d{7}(?:\\d{3})?", , , "6713001234"],
                [, , "8(?:00|44|55|66|77|88)[2-9]\\d{6}", "\\d{10}", , , "8002123456"],
                [, , "900[2-9]\\d{6}", "\\d{10}", , , "9002123456"],
                [, , "NA", "NA"],
                [, , "5(?:00|33|44|66|77)[2-9]\\d{6}", "\\d{10}", , , "5002345678"],
                [, , "NA", "NA"], "GU", 1, "011", "1", , , "1", , , 1, , , [, , "NA", "NA"], , "671", [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            GW: [, [, , "(?:4(?:0\\d{5}|4\\d{7})|9\\d{8})", "\\d{7,9}"],
                [, , "443(?:2[0125]|3[1245]|4[12]|5[1-4]|70|9[1-467])\\d{4}", "\\d{7,9}", , , "443201234"],
                [, , "9(?:55\\d|6(?:6\\d|9[012])|77\\d)\\d{5}", "\\d{7,9}", , , "955012345"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "40\\d{5}", "\\d{7,9}", , , "4012345"], "GW", 245, "00", , , , , , , , [
                    [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["44|9[567]"]],
                    [, "(\\d{3})(\\d{4})", "$1 $2", ["40"]]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            GY: [, [, , "[2-4679]\\d{6}", "\\d{7}"],
                [, , "(?:2(?:1[6-9]|2[0-35-9]|3[1-4]|5[3-9]|6\\d|7[0-24-79])|3(?:2[25-9]|3\\d)|4(?:4[0-24]|5[56])|77[1-57])\\d{4}", "\\d{7}", , , "2201234"],
                [, , "6\\d{6}", "\\d{7}", , , "6091234"],
                [, , "(?:289|862)\\d{4}", "\\d{7}", , , "2891234"],
                [, , "9008\\d{3}", "\\d{7}", , , "9008123"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "GY", 592, "001", , , , , , , , [
                    [, "(\\d{3})(\\d{4})", "$1 $2"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            HK: [, [, , "[235-7]\\d{7}|8\\d{7,8}|9\\d{4,10}", "\\d{5,11}"],
                [, , "(?:[23]\\d|58)\\d{6}", "\\d{8}", , , "21234567"],
                [, , "(?:5[1-79]\\d|6\\d{2}|8[4-79]\\d|9(?:0[1-9]|[1-8]\\d))\\d{5}", "\\d{8}", , , "51234567"],
                [, , "800\\d{6}", "\\d{9}", , , "800123456"],
                [, , "900(?:[0-24-9]\\d{7}|3\\d{1,4})", "\\d{5,11}", , , "90012345678"],
                [, , "NA", "NA"],
                [, , "8[1-3]\\d{6}", "\\d{8}", , , "81123456"],
                [, , "NA", "NA"], "HK", 852, "00", , , , , , , , [
                    [, "(\\d{4})(\\d{4})", "$1 $2", ["[235-7]|[89](?:0[1-9]|[1-9])"]],
                    [, "(800)(\\d{3})(\\d{3})", "$1 $2 $3", ["800"]],
                    [, "(900)(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["900"]],
                    [, "(900)(\\d{2,5})", "$1 $2", ["900"]]
                ], , [, , "7\\d{7}", "\\d{8}", , , "71234567"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            HN: [, [, , "[237-9]\\d{7}", "\\d{8}"],
                [, , "2(?:2(?:0[019]|1[1-36]|[23]\\d|4[056]|5[57]|7[01389]|8[0146-9]|9[012])|4(?:2[3-59]|3[13-689]|4[0-68]|5[1-35])|5(?:4[3-5]|5\\d|6[56]|74)|6(?:[056]\\d|34|4[0-378]|[78][0-8]|9[01])|7(?:6[46-9]|7[02-9]|8[34])|8(?:79|8[0-35789]|9[1-57-9]))\\d{4}", "\\d{8}", , , "22123456"],
                [, , "[37-9]\\d{7}", "\\d{8}", , , "91234567"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "HN", 504, "00", , , , , , , , [
                    [, "(\\d{4})(\\d{4})", "$1-$2"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            HR: [, [, , "[1-7]\\d{5,8}|[89]\\d{6,11}", "\\d{6,12}"],
                [, , "1\\d{7}|(?:2[0-3]|3[1-5]|4[02-47-9]|5[1-3])\\d{6,7}", "\\d{6,9}", , , "12345678"],
                [, , "9(?:[1-9]\\d{6,10}|01\\d{6,9})", "\\d{8,12}", , , "912345678"],
                [, , "80[01]\\d{4,7}", "\\d{7,10}", , , "8001234567"],
                [, , "6(?:[01459]\\d{4,7})", "\\d{6,9}", , , "611234"],
                [, , "NA", "NA"],
                [, , "7[45]\\d{4,7}", "\\d{6,9}", , , "741234567"],
                [, , "NA", "NA"], "HR", 385, "00", "0", , , "0", , , , [
                    [, "(1)(\\d{4})(\\d{3})", "$1 $2 $3", ["1"], "0$1"],
                    [, "(6[09])(\\d{4})(\\d{3})", "$1 $2 $3", ["6[09]"], "0$1"],
                    [, "([67]2)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[67]2"], "0$1"],
                    [, "([2-5]\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2-5]"], "0$1"],
                    [, "(9\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["9"], "0$1"],
                    [, "(9\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["9"], "0$1"],
                    [, "(9\\d)(\\d{3,4})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["9"], "0$1"],
                    [, "(\\d{2})(\\d{2})(\\d{2,3})", "$1 $2 $3", ["6[0145]|7"], "0$1"],
                    [, "(\\d{2})(\\d{3,4})(\\d{3})", "$1 $2 $3", ["6[0145]|7"], "0$1"],
                    [, "(80[01])(\\d{2})(\\d{2,3})", "$1 $2 $3", ["8"], "0$1"],
                    [, "(80[01])(\\d{3,4})(\\d{3})", "$1 $2 $3", ["8"], "0$1"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "[76]2\\d{6,7}", "\\d{8,9}", , , "62123456"], , , [, , "NA", "NA"]
            ],
            HT: [, [, , "[2-489]\\d{7}", "\\d{8}"],
                [, , "2(?:[248]\\d|5[1-5]|94)\\d{5}", "\\d{8}", , , "22453300"],
                [, , "(?:3[1-9]\\d|4\\d{2}|9(?:8[0-35]|9[5-9]))\\d{5}", "\\d{8}", , , "34101234"],
                [, , "8\\d{7}", "\\d{8}", , , "80012345"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "98[89]\\d{5}", "\\d{8}", , , "98901234"], "HT", 509, "00", , , , , , , , [
                    [, "(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            HU: [, [, , "[1-9]\\d{7,8}", "\\d{6,9}"],
                [, , "(?:1\\d|2(?:1\\d|[2-9])|3(?:[2-7]|8\\d)|4[24-9]|5[2-79]|6[23689]|7(?:1\\d|[2-9])|8[2-57-9]|9[2-69])\\d{6}", "\\d{6,9}", , , "12345678"],
                [, , "(?:[257]0|3[01])\\d{7}", "\\d{9}", , , "201234567"],
                [, , "80\\d{6}", "\\d{8}", , , "80123456"],
                [, , "9[01]\\d{6}", "\\d{8}", , , "90123456"],
                [, , "40\\d{6}", "\\d{8}", , , "40123456"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "HU", 36, "00", "06", , , "06", , , , [
                    [, "(1)(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "($1)"],
                    [, "(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2-9]"], "($1)"]
                ], , [, , "NA", "NA"], , , [, , "[48]0\\d{6}", "\\d{8}", , , "80123456"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            ID: [, [, , "(?:[1-79]\\d{6,10}|8\\d{7,11})", "\\d{5,12}"],
                [, , "2(?:1(?:14\\d{3}|[0-8]\\d{6,7}|500\\d{3}|9\\d{6})|2\\d{6,8}|4\\d{7,8})|(?:2(?:[35][1-4]|6[0-8]|7[1-6]|8\\d|9[1-8])|3(?:1|[25][1-8]|3[1-68]|4[1-3]|6[1-3568]|7[0-469]|8\\d)|4(?:0[1-589]|1[01347-9]|2[0-36-8]|3[0-24-68]|43|5[1-378]|6[1-5]|7[134]|8[1245])|5(?:1[1-35-9]|2[25-8]|3[124-9]|4[1-3589]|5[1-46]|6[1-8])|6(?:19?|[25]\\d|3[1-69]|4[1-6])|7(?:02|[125][1-9]|[36]\\d|4[1-8]|7[0-36-9])|9(?:0[12]|1[013-8]|2[0-479]|5[125-8]|6[23679]|7[159]|8[01346]))\\d{5,8}", "\\d{5,11}", , , "612345678"],
                [, , "(?:2(?:1(?:3[145]|4[01]|5[1-469]|60|8[0359]|9\\d)|2(?:88|9[1256])|3[1-4]9|4(?:36|91)|5(?:1[349]|[2-4]9)|6[0-7]9|7(?:[1-36]9|4[39])|8[1-5]9|9[1-48]9)|3(?:19[1-3]|2[12]9|3[13]9|4(?:1[69]|39)|5[14]9|6(?:1[69]|2[89])|709)|4[13]19|5(?:1(?:19|8[39])|4[129]9|6[12]9)|6(?:19[12]|2(?:[23]9|77))|7(?:1[13]9|2[15]9|419|5(?:1[89]|29)|6[15]9|7[178]9))\\d{5,6}|8[1-35-9]\\d{7,10}", "\\d{9,12}", , , "812345678"],
                [, , "177\\d{6,8}|800\\d{5,7}", "\\d{8,11}", , , "8001234567"],
                [, , "809\\d{7}", "\\d{10}", , , "8091234567"],
                [, , "804\\d{7}", "\\d{10}", , , "8041234567"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "ID", 62, "0(?:0[1789]|10(?:00|1[67]))", "0", , , "0", , , , [
                    [, "(\\d{2})(\\d{5,8})", "$1 $2", ["2[124]|[36]1"], "(0$1)"],
                    [, "(\\d{3})(\\d{5,8})", "$1 $2", ["[4579]|2[035-9]|[36][02-9]"], "(0$1)"],
                    [, "(8\\d{2})(\\d{3,4})(\\d{3,5})", "$1-$2-$3", ["8[1-35-9]"], "0$1"],
                    [, "(1)(500)(\\d{3})", "$1 $2 $3", ["15"], "$1"],
                    [, "(177)(\\d{6,8})", "$1 $2", ["17"], "0$1"],
                    [, "(800)(\\d{5,7})", "$1 $2", ["800"], "0$1"],
                    [, "(804)(\\d{3})(\\d{4})", "$1 $2 $3", ["804"], "0$1"],
                    [, "(80\\d)(\\d)(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["80[79]"], "0$1"]
                ], , [, , "NA", "NA"], , , [, , "8071\\d{6}", "\\d{10}", , , "8071123456"],
                [, , "1500\\d{3}|8071\\d{6}", "\\d{7,10}", , , "8071123456"], , , [, , "NA", "NA"]
            ],
            IE: [, [, , "[124-9]\\d{6,9}", "\\d{5,10}"],
                [, , "1\\d{7,8}|2(?:1\\d{6,7}|3\\d{7}|[24-9]\\d{5})|4(?:0[24]\\d{5}|[1-469]\\d{7}|5\\d{6}|7\\d{5}|8[0-46-9]\\d{7})|5(?:0[45]\\d{5}|1\\d{6}|[23679]\\d{7}|8\\d{5})|6(?:1\\d{6}|[237-9]\\d{5}|[4-6]\\d{7})|7[14]\\d{7}|9(?:1\\d{6}|[04]\\d{7}|[35-9]\\d{5})", "\\d{5,10}", , , "2212345"],
                [, , "8(?:22\\d{6}|[35-9]\\d{7})", "\\d{9}", , , "850123456"],
                [, , "1800\\d{6}", "\\d{10}", , , "1800123456"],
                [, , "15(?:1[2-8]|[2-8]0|9[089])\\d{6}", "\\d{10}", , , "1520123456"],
                [, , "18[59]0\\d{6}", "\\d{10}", , , "1850123456"],
                [, , "700\\d{6}", "\\d{9}", , , "700123456"],
                [, , "76\\d{7}", "\\d{9}", , , "761234567"], "IE", 353, "00", "0", , , "0", , , , [
                    [, "(1)(\\d{3,4})(\\d{4})", "$1 $2 $3", ["1"], "(0$1)"],
                    [, "(\\d{2})(\\d{5})", "$1 $2", ["2[24-9]|47|58|6[237-9]|9[35-9]"], "(0$1)"],
                    [, "(\\d{3})(\\d{5})", "$1 $2", ["40[24]|50[45]"], "(0$1)"],
                    [, "(48)(\\d{4})(\\d{4})", "$1 $2 $3", ["48"], "(0$1)"],
                    [, "(818)(\\d{3})(\\d{3})", "$1 $2 $3", ["81"], "(0$1)"],
                    [, "(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[24-69]|7[14]"], "(0$1)"],
                    [, "([78]\\d)(\\d{3,4})(\\d{4})", "$1 $2 $3", ["76|8[35-9]"], "0$1"],
                    [, "(700)(\\d{3})(\\d{3})", "$1 $2 $3", ["70"], "0$1"],
                    [, "(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1(?:8[059]|5)", "1(?:8[059]0|5)"], "$1"]
                ], , [, , "NA", "NA"], , , [, , "18[59]0\\d{6}", "\\d{10}", , , "1850123456"],
                [, , "818\\d{6}", "\\d{9}", , , "818123456"], , , [, , "8[35-9]\\d{8}", "\\d{10}", , , "8501234567"]
            ],
            IL: [, [, , "[17]\\d{6,9}|[2-589]\\d{3}(?:\\d{3,6})?|6\\d{3}", "\\d{4,10}"],
                [, , "[2-489]\\d{7}", "\\d{7,8}", , , "21234567"],
                [, , "5(?:[02-47-9]\\d{2}|5(?:01|2[23]|3[2-4]|4[45]|5[5689]|6[67]|7[0178]|[89][6-9])|6[2-9]\\d)\\d{5}", "\\d{9}", , , "501234567"],
                [, , "1(?:80[019]\\d{3}|255)\\d{3}", "\\d{7,10}", , , "1800123456"],
                [, , "1(?:212|(?:9(?:0[01]|19)|200)\\d{2})\\d{4}", "\\d{8,10}", , , "1919123456"],
                [, , "1700\\d{6}", "\\d{10}", , , "1700123456"],
                [, , "NA", "NA"],
                [, , "7(?:18\\d|2[23]\\d|3[237]\\d|47\\d|6(?:5\\d|8[0168])|7\\d{2}|8(?:2\\d|33|55|77|81)|9[29]\\d)\\d{5}", "\\d{9}", , , "771234567"], "IL", 972, "0(?:0|1[2-9])", "0", , , "0", , , , [
                    [, "([2-489])(\\d{3})(\\d{4})", "$1-$2-$3", ["[2-489]"], "0$1"],
                    [, "([57]\\d)(\\d{3})(\\d{4})", "$1-$2-$3", ["[57]"], "0$1"],
                    [, "(1)([7-9]\\d{2})(\\d{3})(\\d{3})", "$1-$2-$3-$4", ["1[7-9]"], "$1"],
                    [, "(1255)(\\d{3})", "$1-$2", ["125"], "$1"],
                    [, "(1200)(\\d{3})(\\d{3})", "$1-$2-$3", ["120"], "$1"],
                    [, "(1212)(\\d{2})(\\d{2})", "$1-$2-$3", ["121"], "$1"],
                    [, "(1599)(\\d{6})", "$1-$2", ["15"], "$1"],
                    [, "(\\d{4})", "*$1", ["[2-689]"], "$1"]
                ], , [, , "NA", "NA"], , , [, , "1700\\d{6}|[2-689]\\d{3}", "\\d{4,10}", , , "1700123456"],
                [, , "[2-689]\\d{3}|1599\\d{6}", "\\d{4}(?:\\d{6})?", , , "1599123456"], , , [, , "NA", "NA"]
            ],
            IM: [, [, , "[135789]\\d{6,9}", "\\d{6,10}"],
                [, , "1624\\d{6}", "\\d{6,10}", , , "1624456789"],
                [, , "7[569]24\\d{6}", "\\d{10}", , , "7924123456"],
                [, , "808162\\d{4}", "\\d{10}", , , "8081624567"],
                [, , "(?:872299|90[0167]624)\\d{4}", "\\d{10}", , , "9016247890"],
                [, , "8(?:4(?:40[49]06|5624\\d)|70624\\d)\\d{3}", "\\d{10}", , , "8456247890"],
                [, , "70\\d{8}", "\\d{10}", , , "7012345678"],
                [, , "56\\d{8}", "\\d{10}", , , "5612345678"], "IM", 44, "00", "0", " x", , "0", , , , , , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "3(?:08162\\d|3\\d{5}|4(?:40[49]06|5624\\d)|7(?:0624\\d|2299\\d))\\d{3}|55\\d{8}", "\\d{10}", , , "5512345678"], , , [, , "NA", "NA"]
            ],
            IN: [, [, , "1\\d{7,12}|[2-9]\\d{9,10}", "\\d{6,13}"],
                [, , "(?:11|2[02]|33|4[04]|79)[2-7]\\d{7}|80[2-467]\\d{7}|(?:1(?:2[0-249]|3[0-25]|4[145]|[59][14]|6[014]|7[1257]|8[01346])|2(?:1[257]|3[013]|4[01]|5[0137]|6[0158]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|[36][25]|22|4[28]|5[12]|[78]1|9[15])|6(?:12|[2345]1|57|6[13]|7[14]|80)|7(?:12|2[14]|3[134]|4[47]|5[15]|[67]1|88)|8(?:16|2[014]|3[126]|6[136]|7[078]|8[34]|91))[2-7]\\d{6}|(?:(?:1(?:2[35-8]|3[346-9]|4[236-9]|[59][0235-9]|6[235-9]|7[34689]|8[257-9])|2(?:1[134689]|3[24-8]|4[2-8]|5[25689]|6[2-4679]|7[13-79]|8[2-479]|9[235-9])|3(?:01|1[79]|2[1-5]|4[25-8]|5[125689]|6[235-7]|7[157-9]|8[2-467])|4(?:1[14578]|2[5689]|3[2-467]|5[4-7]|6[35]|73|8[2689]|9[2389])|5(?:[16][146-9]|2[14-8]|3[1346]|4[14-69]|5[46]|7[2-4]|8[2-8]|9[246])|6(?:1[1358]|2[2457]|3[2-4]|4[235-7]|[57][2-689]|6[24-578]|8[1-6])|8(?:1[1357-9]|2[235-8]|3[03-57-9]|4[0-24-9]|5\\d|6[2457-9]|7[1-6]|8[1256]|9[2-4]))\\d|7(?:(?:1[013-9]|2[0235-9]|3[2679]|4[1-35689]|5[2-46-9]|[67][02-9]|9\\d)\\d|8(?:2[0-6]|[013-8]\\d)))[2-7]\\d{5}", "\\d{6,10}", , , "1123456789"],
                [, , "(?:7(?:0\\d{2}|2(?:[0235679]\\d|[14][017-9]|8[0-59]|9[389])|3(?:[058]\\d|10|7[3679]|9[689])|4(?:0[1-9]|1[015-9]|[29][89]|39|8[389])|5(?:[034678]\\d|2[03-9]|5[017-9]|9[7-9])|6(?:0[0-47]|1[0-257-9]|2[0-4]|3[19]|5[4589]|[6-9]\\d)|7(?:0[2-9]|[1-79]\\d|8[1-9])|8[0-79]\\d)|8(?:0(?:[01589]\\d|6[67])|1(?:[02-57-9]\\d|1[0135-9])|2(?:[236-9]\\d|5[1-9])|3(?:[0357-9]\\d|4[1-9])|[45]\\d{2}|6[02457-9]\\d|7(?:07|[1-69]\\d)|8(?:[0-26-9]\\d|44|5[2-9])|9(?:[035-9]\\d|2[2-9]|4[0-8]))|9\\d{3})\\d{6}", "\\d{10}", , , "9123456789"],
                [, , "1(?:600\\d{6}|80(?:0\\d{4,9}|3\\d{9}))", "\\d{8,13}", , , "1800123456"],
                [, , "186[12]\\d{9}", "\\d{13}", , , "1861123456789"],
                [, , "1860\\d{7}", "\\d{11}", , , "18603451234"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "IN", 91, "00", "0", , , "0", , , , [
                    [, "(\\d{5})(\\d{5})", "$1 $2", ["7(?:[0257]|3[0157-9]|4[0-389]|6[0-35-9]|8[0-79])|8(?:0[015689]|1[0-57-9]|2[2356-9]|3[0-57-9]|[45]|6[02457-9]|7[01-69]|8[0-24-9]|9[02-9])|9", "7(?:0|2(?:[0235679]|[14][017-9]|8[0-59]|9[389])|3(?:[058]|10|7[3679]|9[689])|4(?:0[1-9]|1[015-9]|[29][89]|39|8[389])|5(?:[034678]|2[03-9]|5[017-9]|9[7-9])|6(?:0[0-47]|1[0-257-9]|2[0-4]|3[19]|5[4589]|[6-9])|7(?:0[2-9]|[1-79]|8[1-9])|8[0-79])|8(?:0(?:[01589]|6[67])|1(?:[02-57-9]|1[0135-9])|2(?:[236-9]|5[1-9])|3(?:[0357-9]|4[1-9])|[45]|6[02457-9]|7(?:07|[1-69])|8(?:[0-26-9]|44|5[2-9])|9(?:[035-9]|2[2-9]|4[0-8]))|9"], "0$1", , 1],
                    [, "(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["11|2[02]|33|4[04]|79|80[2-46]"], "0$1", , 1],
                    [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["1(?:2[0-249]|3[0-25]|4[145]|[569][14]|7[1257]|8[1346]|[68][1-9])|2(?:1[257]|3[013]|4[01]|5[0137]|6[0158]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|[36][25]|22|4[28]|5[12]|[78]1|9[15])|6(?:12|[2345]1|57|6[13]|7[14]|80)"], "0$1", , 1],
                    [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["7(?:12|2[14]|3[134]|4[47]|5[15]|[67]1|88)", "7(?:12|2[14]|3[134]|4[47]|5(?:1|5[2-6])|[67]1|88)"], "0$1", , 1],
                    [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["8(?:16|2[014]|3[126]|6[136]|7[078]|8[34]|91)"], "0$1", , 1],
                    [, "(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1(?:[23579]|[468][1-9])|[2-8]"], "0$1", , 1],
                    [, "(1600)(\\d{2})(\\d{4})", "$1 $2 $3", ["160", "1600"], "$1", , 1],
                    [, "(1800)(\\d{4,5})", "$1 $2", ["180", "1800"], "$1", , 1],
                    [, "(18[06]0)(\\d{2,4})(\\d{4})", "$1 $2 $3", ["18[06]", "18[06]0"], "$1", , 1],
                    [, "(140)(\\d{3})(\\d{4})", "$1 $2 $3", ["140"], "$1", , 1],
                    [, "(\\d{4})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["18[06]", "18(?:0[03]|6[12])"], "$1", , 1]
                ], , [, , "NA", "NA"], , , [, , "1(?:600\\d{6}|8(?:0(?:0\\d{4,9}|3\\d{9})|6(?:0\\d{7}|[12]\\d{9})))", "\\d{8,13}", , , "1800123456"],
                [, , "140\\d{7}", "\\d{10}", , , "1409305260"], , , [, , "NA", "NA"]
            ],
            IO: [, [, , "3\\d{6}", "\\d{7}"],
                [, , "37\\d{5}", "\\d{7}", , , "3709100"],
                [, , "38\\d{5}", "\\d{7}", , , "3801234"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "IO", 246, "00", , , , , , , , [
                    [, "(\\d{3})(\\d{4})", "$1 $2"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            IQ: [, [, , "[1-7]\\d{7,9}", "\\d{6,10}"],
                [, , "1\\d{7}|(?:2[13-5]|3[02367]|4[023]|5[03]|6[026])\\d{6,7}", "\\d{6,9}", , , "12345678"],
                [, , "7[3-9]\\d{8}", "\\d{10}", , , "7912345678"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "IQ", 964, "00", "0", , , "0", , , , [
                    [, "(1)(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "0$1"],
                    [, "([2-6]\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2-6]"], "0$1"],
                    [, "(7\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["7"], "0$1"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            IR: [, [, , "[1-8]\\d{9}|9(?:[0-4]\\d{8}|9\\d{2,8})", "\\d{4,10}"],
                [, , "(?:1[137]|2[13-68]|3[1458]|4[145]|5[146-8]|6[146]|7[1467]|8[13467])\\d{8}", "\\d{10}", , , "2123456789"],
                [, , "9(?:0[1-3]|[13]\\d|2[0-2]|90)\\d{7}", "\\d{10}", , , "9123456789"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "(?:[2-6]0\\d|993)\\d{7}", "\\d{10}", , , "9932123456"], "IR", 98, "00", "0", , , "0", , , , [
                    [, "(21)(\\d{3,5})", "$1 $2", ["21"], "0$1"],
                    [, "(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["[1-8]"], "0$1"],
                    [, "(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["9"], "0$1"],
                    [, "(\\d{3})(\\d{2})(\\d{2,3})", "$1 $2 $3", ["9"], "0$1"],
                    [, "(\\d{3})(\\d{3})", "$1 $2", ["9"], "0$1"]
                ], , [, , "943\\d{7}", "\\d{10}", , , "9432123456"], , , [, , "NA", "NA"],
                [, , "9990\\d{0,6}", "\\d{4,10}", , , "9990123456"], , , [, , "NA", "NA"]
            ],
            IS: [, [, , "[4-9]\\d{6}|38\\d{7}", "\\d{7,9}"],
                [, , "(?:4(?:1[0-24-6]|2[0-7]|[37][0-8]|4[0-245]|5[0-68]|6\\d|8[0-36-8])|5(?:05|[156]\\d|2[02578]|3[013-79]|4[03-7]|7[0-2578]|8[0-35-9]|9[013-689])|87[23])\\d{4}", "\\d{7}", , , "4101234"],
                [, , "38[589]\\d{6}|(?:6(?:1[1-8]|2[056]|3[089]|4[0167]|5[0159]|[67][0-69]|9\\d)|7(?:5[057]|6[0-2]|[78]\\d)|8(?:2[0-59]|3[0-4]|[469]\\d|5[1-9]))\\d{4}", "\\d{7,9}", , , "6111234"],
                [, , "800\\d{4}", "\\d{7}", , , "8001234"],
                [, , "90\\d{5}", "\\d{7}", , , "9011234"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "49\\d{5}", "\\d{7}", , , "4921234"], "IS", 354, "1(?:0(?:01|10|20)|100)|00", , , , , , "00", , [
                    [, "(\\d{3})(\\d{4})", "$1 $2", ["[4-9]"]],
                    [, "(3\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["3"]]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "809\\d{4}", "\\d{7}", , , "8091234"], , , [, , "(?:6(?:2[1-478]|49|8\\d)|8(?:7[0189]|80)|95[48])\\d{4}", "\\d{7}", , , "6211234"]
            ],
            IT: [, [, , "[01589]\\d{5,10}|3(?:[12457-9]\\d{8}|[36]\\d{7,9})", "\\d{6,11}"],
                [, , "0(?:[26]\\d{4,9}|(?:1(?:[0159]\\d|[27][1-5]|31|4[1-4]|6[1356]|8[2-57])|3(?:[0159]\\d|2[1-4]|3[12]|[48][1-6]|6[2-59]|7[1-7])|4(?:[0159]\\d|[23][1-9]|4[245]|6[1-5]|7[1-4]|81)|5(?:[0159]\\d|2[1-5]|3[2-6]|4[1-79]|6[4-6]|7[1-578]|8[3-8])|7(?:[0159]\\d|2[12]|3[1-7]|4[2346]|6[13569]|7[13-6]|8[1-59])|8(?:[0159]\\d|2[34578]|3[1-356]|[6-8][1-5])|9(?:[0159]\\d|[238][1-5]|4[12]|6[1-8]|7[1-6]))\\d{2,7})", "\\d{6,11}", , , "0212345678"],
                [, , "3(?:[12457-9]\\d{8}|6\\d{7,8}|3\\d{7,9})", "\\d{9,11}", , , "3123456789"],
                [, , "80(?:0\\d{6}|3\\d{3})", "\\d{6,9}", , , "800123456"],
                [, , "0878\\d{5}|1(?:44|6[346])\\d{6}|89(?:2\\d{3}|4(?:[0-4]\\d{2}|[5-9]\\d{4})|5(?:[0-4]\\d{2}|[5-9]\\d{6})|9\\d{6})", "\\d{6,10}", , , "899123456"],
                [, , "84(?:[08]\\d{6}|[17]\\d{3})", "\\d{6,9}", , , "848123456"],
                [, , "1(?:78\\d|99)\\d{6}", "\\d{9,10}", , , "1781234567"],
                [, , "55\\d{8}", "\\d{10}", , , "5512345678"], "IT", 39, "00", , , , , , , , [
                    [, "(\\d{2})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["0[26]|55"]],
                    [, "(0[26])(\\d{4})(\\d{5})", "$1 $2 $3", ["0[26]"]],
                    [, "(0[26])(\\d{4,6})", "$1 $2", ["0[26]"]],
                    [, "(0\\d{2})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["0[13-57-9][0159]"]],
                    [, "(\\d{3})(\\d{3,6})", "$1 $2", ["0[13-57-9][0159]|8(?:03|4[17]|9[245])", "0[13-57-9][0159]|8(?:03|4[17]|9(?:2|[45][0-4]))"]],
                    [, "(0\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["0[13-57-9][2-46-8]"]],
                    [, "(0\\d{3})(\\d{2,6})", "$1 $2", ["0[13-57-9][2-46-8]"]],
                    [, "(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[13]|8(?:00|4[08]|9[59])", "[13]|8(?:00|4[08]|9(?:5[5-9]|9))"]],
                    [, "(\\d{4})(\\d{4})", "$1 $2", ["894", "894[5-9]"]],
                    [, "(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["3"]]
                ], , [, , "NA", "NA"], 1, , [, , "848\\d{6}", "\\d{9}", , , "848123456"],
                [, , "NA", "NA"], 1, , [, , "NA", "NA"]
            ],
            JE: [, [, , "[135789]\\d{6,9}", "\\d{6,10}"],
                [, , "1534\\d{6}", "\\d{6,10}", , , "1534456789"],
                [, , "7(?:509|7(?:00|97)|829|937)\\d{6}", "\\d{10}", , , "7797123456"],
                [, , "80(?:07(?:35|81)|8901)\\d{4}", "\\d{10}", , , "8007354567"],
                [, , "(?:871206|90(?:066[59]|1810|71(?:07|55)))\\d{4}", "\\d{10}", , , "9018105678"],
                [, , "8(?:4(?:4(?:4(?:05|42|69)|703)|5(?:041|800))|70002)\\d{4}", "\\d{10}", , , "8447034567"],
                [, , "701511\\d{4}", "\\d{10}", , , "7015115678"],
                [, , "56\\d{8}", "\\d{10}", , , "5612345678"], "JE", 44, "00", "0", " x", , "0", , , , , , [, , "76(?:0[012]|2[356]|4[0134]|5[49]|6[0-369]|77|81|9[39])\\d{6}", "\\d{10}", , , "7640123456"], , , [, , "NA", "NA"],
                [, , "3(?:0(?:07(?:35|81)|8901)|3\\d{4}|4(?:4(?:4(?:05|42|69)|703)|5(?:041|800))|7(?:0002|1206))\\d{4}|55\\d{8}", "\\d{10}", , , "5512345678"], , , [, , "NA", "NA"]
            ],
            JM: [, [, , "[589]\\d{9}", "\\d{7}(?:\\d{3})?"],
                [, , "876(?:5(?:0[12]|1[0-468]|2[35]|63)|6(?:0[1-3579]|1[027-9]|[23]\\d|40|5[06]|6[2-589]|7[05]|8[04]|9[4-9])|7(?:0[2-689]|[1-6]\\d|8[056]|9[45])|9(?:0[1-8]|1[02378]|[2-8]\\d|9[2-468]))\\d{4}", "\\d{7}(?:\\d{3})?", , , "8765123456"],
                [, , "876(?:2[16-9]\\d|[348]\\d{2}|5(?:0[3-9]|27|6[0-24-9]|[3-578]\\d)|7(?:0[07]|7\\d|8[1-47-9]|9[0-36-9])|9(?:[01]9|9[0579]))\\d{4}", "\\d{10}", , , "8762101234"],
                [, , "8(?:00|44|55|66|77|88)[2-9]\\d{6}", "\\d{10}", , , "8002123456"],
                [, , "900[2-9]\\d{6}", "\\d{10}", , , "9002123456"],
                [, , "NA", "NA"],
                [, , "5(?:00|33|44|66|77)[2-9]\\d{6}", "\\d{10}", , , "5002345678"],
                [, , "NA", "NA"], "JM", 1, "011", "1", , , "1", , , , , , [, , "NA", "NA"], , "876", [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            JO: [, [, , "[235-9]\\d{7,8}", "\\d{8,9}"],
                [, , "(?:2(?:6(?:2[0-35-9]|3[0-57-8]|4[24-7]|5[0-24-8]|[6-8][023]|9[0-3])|7(?:0[1-79]|10|2[014-7]|3[0-689]|4[019]|5[0-3578]))|32(?:0[1-69]|1[1-35-7]|2[024-7]|3\\d|4[0-3]|[57][023]|6[03])|53(?:0[0-3]|[13][023]|2[0-59]|49|5[0-35-9]|6[15]|7[45]|8[1-6]|9[0-36-9])|6(?:2[50]0|3(?:00|33)|4(?:0[0125]|1[2-7]|2[0569]|[38][07-9]|4[025689]|6[0-589]|7\\d|9[0-2])|5(?:[01][056]|2[034]|3[0-57-9]|4[17-8]|5[0-69]|6[0-35-9]|7[1-379]|8[0-68]|9[02-39]))|87(?:[02]0|7[08]|90))\\d{4}", "\\d{8}", , , "62001234"],
                [, , "7(?:55|7[025-9]|8[015-9]|9[0-25-9])\\d{6}", "\\d{9}", , , "790123456"],
                [, , "80\\d{6}", "\\d{8}", , , "80012345"],
                [, , "900\\d{5}", "\\d{8}", , , "90012345"],
                [, , "85\\d{6}", "\\d{8}", , , "85012345"],
                [, , "70\\d{7}", "\\d{9}", , , "700123456"],
                [, , "NA", "NA"], "JO", 962, "00", "0", , , "0", , , , [
                    [, "(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["[2356]|87"], "(0$1)"],
                    [, "(7)(\\d{4})(\\d{4})", "$1 $2 $3", ["7[457-9]"], "0$1"],
                    [, "(\\d{3})(\\d{5,6})", "$1 $2", ["70|8[0158]|9"], "0$1"]
                ], , [, , "74(?:66|77)\\d{5}", "\\d{9}", , , "746612345"], , , [, , "NA", "NA"],
                [, , "8(?:10|8\\d)\\d{5}", "\\d{8}", , , "88101234"], , , [, , "NA", "NA"]
            ],
            JP: [, [, , "[1-9]\\d{8,9}|00(?:[36]\\d{7,14}|7\\d{5,7}|8\\d{7})", "\\d{8,17}"],
                [, , "(?:1(?:1[235-8]|2[3-6]|3[3-9]|4[2-6]|[58][2-8]|6[2-7]|7[2-9]|9[1-9])|2[2-9]\\d|[36][1-9]\\d|4(?:6[02-8]|[2-578]\\d|9[2-59])|5(?:6[1-9]|7[2-8]|[2-589]\\d)|7(?:3[4-9]|4[02-9]|[25-9]\\d)|8(?:3[2-9]|4[5-9]|5[1-9]|8[03-9]|[2679]\\d)|9(?:[679][1-9]|[2-58]\\d))\\d{6}", "\\d{9}", , , "312345678"],
                [, , "[7-9]0[1-9]\\d{7}", "\\d{10}", , , "9012345678"],
                [, , "120\\d{6}|800\\d{7}|00(?:37\\d{6,13}|66\\d{6,13}|777(?:[01]\\d{2}|5\\d{3}|8\\d{4})|882[1245]\\d{4})", "\\d{8,17}", , , "120123456"],
                [, , "990\\d{6}", "\\d{9}", , , "990123456"],
                [, , "NA", "NA"],
                [, , "60\\d{7}", "\\d{9}", , , "601234567"],
                [, , "50[1-9]\\d{7}", "\\d{10}", , , "5012345678"], "JP", 81, "010", "0", , , "0", , , , [
                    [, "(\\d{3})(\\d{3})(\\d{3})", "$1-$2-$3", ["(?:12|57|99)0"], "0$1"],
                    [, "(\\d{3})(\\d{3})(\\d{4})", "$1-$2-$3", ["800"], "0$1"],
                    [, "(\\d{4})(\\d{4})", "$1-$2", ["0077"], "$1"],
                    [, "(\\d{4})(\\d{2})(\\d{3,4})", "$1-$2-$3", ["0077"], "$1"],
                    [, "(\\d{4})(\\d{2})(\\d{4})", "$1-$2-$3", ["0088"], "$1"],
                    [, "(\\d{4})(\\d{3})(\\d{3,4})", "$1-$2-$3", ["00(?:37|66)"], "$1"],
                    [, "(\\d{4})(\\d{4})(\\d{4,5})", "$1-$2-$3", ["00(?:37|66)"], "$1"],
                    [, "(\\d{4})(\\d{5})(\\d{5,6})", "$1-$2-$3", ["00(?:37|66)"], "$1"],
                    [, "(\\d{4})(\\d{6})(\\d{6,7})", "$1-$2-$3", ["00(?:37|66)"], "$1"],
                    [, "(\\d{2})(\\d{4})(\\d{4})", "$1-$2-$3", ["[2579]0|80[1-9]"], "0$1"],
                    [, "(\\d{4})(\\d)(\\d{4})", "$1-$2-$3", ["1(?:26|3[79]|4[56]|5[4-68]|6[3-5])|5(?:76|97)|499|746|8(?:3[89]|63|47|51)|9(?:49|80|9[16])", "1(?:267|3(?:7[247]|9[278])|4(?:5[67]|66)|5(?:47|58|64|8[67])|6(?:3[245]|48|5[4-68]))|5(?:76|97)9|499[2468]|7468|8(?:3(?:8[78]|96)|636|477|51[24])|9(?:496|802|9(?:1[23]|69))", "1(?:267|3(?:7[247]|9[278])|4(?:5[67]|66)|5(?:47|58|64|8[67])|6(?:3[245]|48|5[4-68]))|5(?:769|979[2-69])|499[2468]|7468|8(?:3(?:8[78]|96[2457-9])|636[2-57-9]|477|51[24])|9(?:496|802|9(?:1[23]|69))"], "0$1"],
                    [, "(\\d{3})(\\d{2})(\\d{4})", "$1-$2-$3", ["1(?:2[3-6]|3[3-9]|4[2-6]|5[2-8]|[68][2-7]|7[2-689]|9[1-578])|2(?:2[03-689]|3[3-58]|4[0-468]|5[04-8]|6[013-8]|7[06-9]|8[02-57-9]|9[13])|4(?:2[28]|3[689]|6[035-7]|7[05689]|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|6[1-9]|7[2-8]|8[14-7]|9[4-9])|7(?:2[15]|3[5-9]|4[02-9]|6[135-8]|7[0-4689]|9[014-9])|8(?:2[49]|3[3-8]|4[5-8]|5[2-9]|6[35-9]|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9[3-7])", "1(?:2[3-6]|3[3-9]|4[2-6]|5(?:[236-8]|[45][2-69])|[68][2-7]|7[2-689]|9[1-578])|2(?:2(?:[04-689]|3[23])|3[3-58]|4[0-468]|5(?:5[78]|7[2-4]|[0468][2-9])|6(?:[0135-8]|4[2-5])|7(?:[0679]|8[2-7])|8(?:[024578]|3[25-9]|9[6-9])|9(?:11|3[2-4]))|4(?:2(?:2[2-9]|8[237-9])|3[689]|6[035-7]|7(?:[059][2-8]|[68])|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|6[1-9]|7[2-8]|8[14-7]|9(?:[89][2-8]|[4-7]))|7(?:2[15]|3[5-9]|4[02-9]|6[135-8]|7[0-4689]|9(?:[017-9]|4[6-8]|5[2-478]|6[2-589]))|8(?:2(?:4[4-8]|9[2-8])|3(?:7[2-6]|[3-6][2-9]|8[2-5])|4[5-8]|5[2-9]|6(?:[37]|5[4-7]|6[2-9]|8[2-8]|9[236-9])|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9(?:3[34]|[4-7]))", "1(?:2[3-6]|3[3-9]|4[2-6]|5(?:[236-8]|[45][2-69])|[68][2-7]|7[2-689]|9[1-578])|2(?:2(?:[04-689]|3[23])|3[3-58]|4[0-468]|5(?:5[78]|7[2-4]|[0468][2-9])|6(?:[0135-8]|4[2-5])|7(?:[0679]|8[2-7])|8(?:[024578]|3[25-9]|9[6-9])|9(?:11|3[2-4]))|4(?:2(?:2[2-9]|8[237-9])|3[689]|6[035-7]|7(?:[059][2-8]|[68])|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|6[1-9]|7[2-8]|8[14-7]|9(?:[89][2-8]|[4-7]))|7(?:2[15]|3[5-9]|4[02-9]|6[135-8]|7[0-4689]|9(?:[017-9]|4[6-8]|5[2-478]|6[2-589]))|8(?:2(?:4[4-8]|9(?:[3578]|20|4[04-9]|6[56]))|3(?:7(?:[2-5]|6[0-59])|[3-6][2-9]|8[2-5])|4[5-8]|5[2-9]|6(?:[37]|5(?:[467]|5[014-9])|6(?:[2-8]|9[02-69])|8[2-8]|9(?:[236-8]|9[23]))|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9(?:3(?:3[02-9]|4[0-24689])|4[2-69]|[5-7]))", "1(?:2[3-6]|3[3-9]|4[2-6]|5(?:[236-8]|[45][2-69])|[68][2-7]|7[2-689]|9[1-578])|2(?:2(?:[04-689]|3[23])|3[3-58]|4[0-468]|5(?:5[78]|7[2-4]|[0468][2-9])|6(?:[0135-8]|4[2-5])|7(?:[0679]|8[2-7])|8(?:[024578]|3[25-9]|9[6-9])|9(?:11|3[2-4]))|4(?:2(?:2[2-9]|8[237-9])|3[689]|6[035-7]|7(?:[059][2-8]|[68])|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|6[1-9]|7[2-8]|8[14-7]|9(?:[89][2-8]|[4-7]))|7(?:2[15]|3[5-9]|4[02-9]|6[135-8]|7[0-4689]|9(?:[017-9]|4[6-8]|5[2-478]|6[2-589]))|8(?:2(?:4[4-8]|9(?:[3578]|20|4[04-9]|6(?:5[25]|60)))|3(?:7(?:[2-5]|6[0-59])|[3-6][2-9]|8[2-5])|4[5-8]|5[2-9]|6(?:[37]|5(?:[467]|5[014-9])|6(?:[2-8]|9[02-69])|8[2-8]|9(?:[236-8]|9[23]))|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9(?:3(?:3[02-9]|4[0-24689])|4[2-69]|[5-7]))"], "0$1"],
                    [, "(\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["1|2(?:2[37]|5[5-9]|64|78|8[39]|91)|4(?:2[2689]|64|7[347])|5(?:[2-589]|39)|60|8(?:[46-9]|3[279]|2[124589])|9(?:[235-8]|93)", "1|2(?:2[37]|5(?:[57]|[68]0|9[19])|64|78|8[39]|917)|4(?:2(?:[68]|20|9[178])|64|7[347])|5(?:[2-589]|39[67])|60|8(?:[46-9]|3[279]|2[124589])|9(?:[235-8]|93[34])", "1|2(?:2[37]|5(?:[57]|[68]0|9(?:17|99))|64|78|8[39]|917)|4(?:2(?:[68]|20|9[178])|64|7[347])|5(?:[2-589]|39[67])|60|8(?:[46-9]|3[279]|2[124589])|9(?:[235-8]|93(?:31|4))"], "0$1"],
                    [, "(\\d{3})(\\d{2})(\\d{4})", "$1-$2-$3", ["2(?:9[14-79]|74|[34]7|[56]9)|82|993"], "0$1"],
                    [, "(\\d)(\\d{4})(\\d{4})", "$1-$2-$3", ["3|4(?:2[09]|7[01])|6[1-9]"], "0$1"],
                    [, "(\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["[2479][1-9]"], "0$1"]
                ],
                [
                    [, "(\\d{3})(\\d{3})(\\d{3})", "$1-$2-$3", ["(?:12|57|99)0"], "0$1"],
                    [, "(\\d{3})(\\d{3})(\\d{4})", "$1-$2-$3", ["800"], "0$1"],
                    [, "(\\d{2})(\\d{4})(\\d{4})", "$1-$2-$3", ["[2579]0|80[1-9]"], "0$1"],
                    [, "(\\d{4})(\\d)(\\d{4})", "$1-$2-$3", ["1(?:26|3[79]|4[56]|5[4-68]|6[3-5])|5(?:76|97)|499|746|8(?:3[89]|63|47|51)|9(?:49|80|9[16])", "1(?:267|3(?:7[247]|9[278])|4(?:5[67]|66)|5(?:47|58|64|8[67])|6(?:3[245]|48|5[4-68]))|5(?:76|97)9|499[2468]|7468|8(?:3(?:8[78]|96)|636|477|51[24])|9(?:496|802|9(?:1[23]|69))", "1(?:267|3(?:7[247]|9[278])|4(?:5[67]|66)|5(?:47|58|64|8[67])|6(?:3[245]|48|5[4-68]))|5(?:769|979[2-69])|499[2468]|7468|8(?:3(?:8[78]|96[2457-9])|636[2-57-9]|477|51[24])|9(?:496|802|9(?:1[23]|69))"], "0$1"],
                    [, "(\\d{3})(\\d{2})(\\d{4})", "$1-$2-$3", ["1(?:2[3-6]|3[3-9]|4[2-6]|5[2-8]|[68][2-7]|7[2-689]|9[1-578])|2(?:2[03-689]|3[3-58]|4[0-468]|5[04-8]|6[013-8]|7[06-9]|8[02-57-9]|9[13])|4(?:2[28]|3[689]|6[035-7]|7[05689]|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|6[1-9]|7[2-8]|8[14-7]|9[4-9])|7(?:2[15]|3[5-9]|4[02-9]|6[135-8]|7[0-4689]|9[014-9])|8(?:2[49]|3[3-8]|4[5-8]|5[2-9]|6[35-9]|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9[3-7])", "1(?:2[3-6]|3[3-9]|4[2-6]|5(?:[236-8]|[45][2-69])|[68][2-7]|7[2-689]|9[1-578])|2(?:2(?:[04-689]|3[23])|3[3-58]|4[0-468]|5(?:5[78]|7[2-4]|[0468][2-9])|6(?:[0135-8]|4[2-5])|7(?:[0679]|8[2-7])|8(?:[024578]|3[25-9]|9[6-9])|9(?:11|3[2-4]))|4(?:2(?:2[2-9]|8[237-9])|3[689]|6[035-7]|7(?:[059][2-8]|[68])|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|6[1-9]|7[2-8]|8[14-7]|9(?:[89][2-8]|[4-7]))|7(?:2[15]|3[5-9]|4[02-9]|6[135-8]|7[0-4689]|9(?:[017-9]|4[6-8]|5[2-478]|6[2-589]))|8(?:2(?:4[4-8]|9[2-8])|3(?:7[2-6]|[3-6][2-9]|8[2-5])|4[5-8]|5[2-9]|6(?:[37]|5[4-7]|6[2-9]|8[2-8]|9[236-9])|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9(?:3[34]|[4-7]))", "1(?:2[3-6]|3[3-9]|4[2-6]|5(?:[236-8]|[45][2-69])|[68][2-7]|7[2-689]|9[1-578])|2(?:2(?:[04-689]|3[23])|3[3-58]|4[0-468]|5(?:5[78]|7[2-4]|[0468][2-9])|6(?:[0135-8]|4[2-5])|7(?:[0679]|8[2-7])|8(?:[024578]|3[25-9]|9[6-9])|9(?:11|3[2-4]))|4(?:2(?:2[2-9]|8[237-9])|3[689]|6[035-7]|7(?:[059][2-8]|[68])|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|6[1-9]|7[2-8]|8[14-7]|9(?:[89][2-8]|[4-7]))|7(?:2[15]|3[5-9]|4[02-9]|6[135-8]|7[0-4689]|9(?:[017-9]|4[6-8]|5[2-478]|6[2-589]))|8(?:2(?:4[4-8]|9(?:[3578]|20|4[04-9]|6[56]))|3(?:7(?:[2-5]|6[0-59])|[3-6][2-9]|8[2-5])|4[5-8]|5[2-9]|6(?:[37]|5(?:[467]|5[014-9])|6(?:[2-8]|9[02-69])|8[2-8]|9(?:[236-8]|9[23]))|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9(?:3(?:3[02-9]|4[0-24689])|4[2-69]|[5-7]))", "1(?:2[3-6]|3[3-9]|4[2-6]|5(?:[236-8]|[45][2-69])|[68][2-7]|7[2-689]|9[1-578])|2(?:2(?:[04-689]|3[23])|3[3-58]|4[0-468]|5(?:5[78]|7[2-4]|[0468][2-9])|6(?:[0135-8]|4[2-5])|7(?:[0679]|8[2-7])|8(?:[024578]|3[25-9]|9[6-9])|9(?:11|3[2-4]))|4(?:2(?:2[2-9]|8[237-9])|3[689]|6[035-7]|7(?:[059][2-8]|[68])|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|6[1-9]|7[2-8]|8[14-7]|9(?:[89][2-8]|[4-7]))|7(?:2[15]|3[5-9]|4[02-9]|6[135-8]|7[0-4689]|9(?:[017-9]|4[6-8]|5[2-478]|6[2-589]))|8(?:2(?:4[4-8]|9(?:[3578]|20|4[04-9]|6(?:5[25]|60)))|3(?:7(?:[2-5]|6[0-59])|[3-6][2-9]|8[2-5])|4[5-8]|5[2-9]|6(?:[37]|5(?:[467]|5[014-9])|6(?:[2-8]|9[02-69])|8[2-8]|9(?:[236-8]|9[23]))|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9(?:3(?:3[02-9]|4[0-24689])|4[2-69]|[5-7]))"], "0$1"],
                    [, "(\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["1|2(?:2[37]|5[5-9]|64|78|8[39]|91)|4(?:2[2689]|64|7[347])|5(?:[2-589]|39)|60|8(?:[46-9]|3[279]|2[124589])|9(?:[235-8]|93)", "1|2(?:2[37]|5(?:[57]|[68]0|9[19])|64|78|8[39]|917)|4(?:2(?:[68]|20|9[178])|64|7[347])|5(?:[2-589]|39[67])|60|8(?:[46-9]|3[279]|2[124589])|9(?:[235-8]|93[34])", "1|2(?:2[37]|5(?:[57]|[68]0|9(?:17|99))|64|78|8[39]|917)|4(?:2(?:[68]|20|9[178])|64|7[347])|5(?:[2-589]|39[67])|60|8(?:[46-9]|3[279]|2[124589])|9(?:[235-8]|93(?:31|4))"], "0$1"],
                    [, "(\\d{3})(\\d{2})(\\d{4})", "$1-$2-$3", ["2(?:9[14-79]|74|[34]7|[56]9)|82|993"], "0$1"],
                    [, "(\\d)(\\d{4})(\\d{4})", "$1-$2-$3", ["3|4(?:2[09]|7[01])|6[1-9]"], "0$1"],
                    [, "(\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["[2479][1-9]"], "0$1"]
                ],
                [, , "20\\d{8}", "\\d{10}", , , "2012345678"], , , [, , "00(?:37\\d{6,13}|66\\d{6,13}|777(?:[01]\\d{2}|5\\d{3}|8\\d{4})|882[1245]\\d{4})", "\\d{8,17}", , , "00777012"],
                [, , "570\\d{6}", "\\d{9}", , , "570123456"], 1, , [, , "NA", "NA"]
            ],
            KE: [, [, , "20\\d{6,7}|[4-9]\\d{6,9}", "\\d{7,10}"],
                [, , "20\\d{6,7}|4(?:[0136]\\d{7}|[245]\\d{5,7})|5(?:[08]\\d{7}|[1-79]\\d{5,7})|6(?:[01457-9]\\d{5,7}|[26]\\d{7})", "\\d{7,9}", , , "202012345"],
                [, , "7(?:[0-36]\\d|5[0-6]|7[0-5]|8[0-25-9]|9[0-4])\\d{6}", "\\d{9}", , , "712123456"],
                [, , "800[24-8]\\d{5,6}", "\\d{9,10}", , , "800223456"],
                [, , "900[02-9]\\d{5}", "\\d{9}", , , "900223456"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "KE", 254, "000", "0", , , "0", , , , [
                    [, "(\\d{2})(\\d{5,7})", "$1 $2", ["[24-6]"], "0$1"],
                    [, "(\\d{3})(\\d{6})", "$1 $2", ["7"], "0$1"],
                    [, "(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[89]"], "0$1"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            KG: [, [, , "[235-8]\\d{8,9}", "\\d{5,10}"],
                [, , "(?:3(?:1(?:[256]\\d|3[1-9]|47)|2(?:22|3[0-479]|6[0-7])|4(?:22|5[6-9]|6\\d)|5(?:22|3[4-7]|59|6\\d)|6(?:22|5[35-7]|6\\d)|7(?:22|3[468]|4[1-9]|59|[67]\\d)|9(?:22|4[1-8]|6\\d))|6(?:09|12|2[2-4])\\d)\\d{5}", "\\d{5,10}", , , "312123456"],
                [, , "(?:20[0-35]|5[124-7]\\d|7[07]\\d)\\d{6}", "\\d{9}", , , "700123456"],
                [, , "800\\d{6,7}", "\\d{9,10}", , , "800123456"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "KG", 996, "00", "0", , , "0", , , , [
                    [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[25-7]|31[25]"], "0$1"],
                    [, "(\\d{4})(\\d{5})", "$1 $2", ["3(?:1[36]|[2-9])"], "0$1"],
                    [, "(\\d{3})(\\d{3})(\\d)(\\d{3})", "$1 $2 $3 $4", ["8"], "0$1"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            KH: [, [, , "[1-9]\\d{7,9}", "\\d{6,10}"],
                [, , "(?:2[3-6]|3[2-6]|4[2-4]|[5-7][2-5])(?:[237-9]|4[56]|5\\d|6\\d?)\\d{5}|23(?:4[234]|8\\d{2})\\d{4}", "\\d{6,9}", , , "23756789"],
                [, , "(?:1(?:[013-9]|2\\d?)|3[18]\\d|6[016-9]|7(?:[07-9]|[16]\\d)|8(?:[013-79]|8\\d)|9(?:6\\d|7\\d?|[0-589]))\\d{6}", "\\d{8,9}", , , "91234567"],
                [, , "1800(?:1\\d|2[019])\\d{4}", "\\d{10}", , , "1800123456"],
                [, , "1900(?:1\\d|2[09])\\d{4}", "\\d{10}", , , "1900123456"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "KH", 855, "00[14-9]", "0", , , "0", , , , [
                    [, "(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["1\\d[1-9]|[2-9]"], "0$1"],
                    [, "(1[89]00)(\\d{3})(\\d{3})", "$1 $2 $3", ["1[89]0"]]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            KI: [, [, , "[2458]\\d{4}|3\\d{4,7}|7\\d{7}", "\\d{5,8}"],
                [, , "(?:[24]\\d|3[1-9]|50|8[0-5])\\d{3}", "\\d{5}", , , "31234"],
                [, , "7\\d{7}", "\\d{8}", , , "72012345"],
                [, , "NA", "NA"],
                [, , "3001\\d{4}", "\\d{5,8}", , , "30010000"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "KI", 686, "00", , , , "0", , , , , , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            KM: [, [, , "[379]\\d{6}", "\\d{7}"],
                [, , "7(?:6[0-37-9]|7[0-57-9])\\d{4}", "\\d{7}", , , "7712345"],
                [, , "3[234]\\d{5}", "\\d{7}", , , "3212345"],
                [, , "NA", "NA"],
                [, , "(?:39[01]|9[01]0)\\d{4}", "\\d{7}", , , "9001234"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "KM", 269, "00", , , , , , , , [
                    [, "(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            KN: [, [, , "[589]\\d{9}", "\\d{7}(?:\\d{3})?"],
                [, , "869(?:2(?:29|36)|302|4(?:6[015-9]|70))\\d{4}", "\\d{7}(?:\\d{3})?", , , "8692361234"],
                [, , "869(?:5(?:5[6-8]|6[5-7])|66\\d|76[02-6])\\d{4}", "\\d{10}", , , "8697652917"],
                [, , "8(?:00|44|55|66|77|88)[2-9]\\d{6}", "\\d{10}", , , "8002123456"],
                [, , "900[2-9]\\d{6}", "\\d{10}", , , "9002123456"],
                [, , "NA", "NA"],
                [, , "5(?:00|33|44|66|77)[2-9]\\d{6}", "\\d{10}", , , "5002345678"],
                [, , "NA", "NA"], "KN", 1, "011", "1", , , "1", , , , , , [, , "NA", "NA"], , "869", [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            KP: [, [, , "1\\d{9}|[28]\\d{7}", "\\d{6,8}|\\d{10}"],
                [, , "2\\d{7}|85\\d{6}", "\\d{6,8}", , , "21234567"],
                [, , "19[123]\\d{7}", "\\d{10}", , , "1921234567"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "KP", 850, "00|99", "0", , , "0", , , , [
                    [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "0$1"],
                    [, "(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["2"], "0$1"],
                    [, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"], "0$1"]
                ], , [, , "NA", "NA"], , , [, , "2(?:[0-24-9]\\d{2}|3(?:[0-79]\\d|8[02-9]))\\d{4}", "\\d{8}", , , "23821234"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            KR: [, [, , "[1-7]\\d{3,9}|8\\d{8}", "\\d{4,10}"],
                [, , "(?:2|3[1-3]|[46][1-4]|5[1-5])(?:1\\d{2,3}|[1-9]\\d{6,7})", "\\d{4,10}", , , "22123456"],
                [, , "1[0-26-9]\\d{7,8}", "\\d{9,10}", , , "1000000000"],
                [, , "80\\d{7}", "\\d{9}", , , "801234567"],
                [, , "60[2-9]\\d{6}", "\\d{9}", , , "602345678"],
                [, , "NA", "NA"],
                [, , "50\\d{8}", "\\d{10}", , , "5012345678"],
                [, , "70\\d{8}", "\\d{10}", , , "7012345678"], "KR", 82, "00(?:[124-68]|[37]\\d{2})", "0", , , "0(8[1-46-8]|85\\d{2})?", , , , [
                    [, "(\\d{2})(\\d{4})(\\d{4})", "$1-$2-$3", ["1(?:0|1[19]|[69]9|5[458])|[57]0", "1(?:0|1[19]|[69]9|5(?:44|59|8))|[57]0"], "0$1", "0$CC-$1"],
                    [, "(\\d{2})(\\d{3,4})(\\d{4})", "$1-$2-$3", ["1(?:[169][2-8]|[78]|5[1-4])|[68]0|[3-6][1-9][1-9]", "1(?:[169][2-8]|[78]|5(?:[1-3]|4[56]))|[68]0|[3-6][1-9][1-9]"], "0$1", "0$CC-$1"],
                    [, "(\\d{3})(\\d)(\\d{4})", "$1-$2-$3", ["131", "1312"], "0$1", "0$CC-$1"],
                    [, "(\\d{3})(\\d{2})(\\d{4})", "$1-$2-$3", ["131", "131[13-9]"], "0$1", "0$CC-$1"],
                    [, "(\\d{3})(\\d{3})(\\d{4})", "$1-$2-$3", ["13[2-9]"], "0$1", "0$CC-$1"],
                    [, "(\\d{2})(\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3-$4", ["30"], "0$1", "0$CC-$1"],
                    [, "(\\d)(\\d{3,4})(\\d{4})", "$1-$2-$3", ["2[1-9]"], "0$1", "0$CC-$1"],
                    [, "(\\d)(\\d{3,4})", "$1-$2", ["21[0-46-9]"], "0$1", "0$CC-$1"],
                    [, "(\\d{2})(\\d{3,4})", "$1-$2", ["[3-6][1-9]1", "[3-6][1-9]1(?:[0-46-9])"], "0$1", "0$CC-$1"],
                    [, "(\\d{4})(\\d{4})", "$1-$2", ["1(?:5[46-9]|6[04678]|8[0579])", "1(?:5(?:44|66|77|88|99)|6(?:00|44|6[16]|70|88)|8(?:00|55|77|99))"], "$1", "0$CC-$1"]
                ], , [, , "15\\d{7,8}", "\\d{9,10}", , , "1523456789"], , , [, , "NA", "NA"],
                [, , "1(?:5(?:44|66|77|88|99)|6(?:00|44|6[16]|70|88)|8(?:00|55|77|99))\\d{4}", "\\d{8}", , , "15441234"], , , [, , "NA", "NA"]
            ],
            KW: [, [, , "[12569]\\d{6,7}", "\\d{7,8}"],
                [, , "(?:18\\d|2(?:[23]\\d{2}|4(?:[1-35-9]\\d|44)|5(?:0[034]|[2-46]\\d|5[1-3]|7[1-7])))\\d{4}", "\\d{7,8}", , , "22345678"],
                [, , "(?:5(?:[05]\\d{2}|1[0-7]\\d|2(?:22|55))|6(?:0[034679]\\d|5[015-9]\\d|6\\d{2}|7[067]\\d|9[0369]\\d)|9(?:0[09]\\d|22\\d|4[01479]\\d|55\\d|6[0679]\\d|[79]\\d{2}|8[057-9]\\d))\\d{4}", "\\d{8}", , , "50012345"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "KW", 965, "00", , , , , , , , [
                    [, "(\\d{4})(\\d{3,4})", "$1 $2", ["[126]|9[04-9]|52[25]"]],
                    [, "(\\d{3})(\\d{5})", "$1 $2", ["5[015]|92"]]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            KY: [, [, , "[3589]\\d{9}", "\\d{7}(?:\\d{3})?"],
                [, , "345(?:2(?:22|44)|444|6(?:23|38|40)|7(?:4[35-79]|6[6-9]|77)|8(?:00|1[45]|25|[48]8)|9(?:14|4[035-9]))\\d{4}", "\\d{7}(?:\\d{3})?", , , "3452221234"],
                [, , "345(?:32[1-9]|5(?:1[67]|2[5-7]|4[6-8]|76)|9(?:1[67]|2[2-9]|3[689]))\\d{4}", "\\d{10}", , , "3453231234"],
                [, , "8(?:00|44|55|66|77|88)[2-9]\\d{6}", "\\d{10}", , , "8002345678"],
                [, , "900[2-9]\\d{6}|345976\\d{4}", "\\d{10}", , , "9002345678"],
                [, , "NA", "NA"],
                [, , "5(?:00|33|44|66|77)[2-9]\\d{6}", "\\d{10}", , , "5002345678"],
                [, , "NA", "NA"], "KY", 1, "011", "1", , , "1", , , , , , [, , "345849\\d{4}", "\\d{10}", , , "3458491234"], , "345", [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            KZ: [, [, , "(?:33\\d|7\\d{2}|80[09])\\d{7}", "\\d{10}"],
                [, , "33622\\d{5}|7(?:1(?:0(?:[23]\\d|4[023]|59|63)|1(?:[23]\\d|4[0-79]|59)|2(?:[23]\\d|59)|3(?:2\\d|3[1-79]|4[0-35-9]|59)|4(?:2\\d|3[013-79]|4[0-8]|5[1-79])|5(?:2\\d|3[1-8]|4[1-7]|59)|6(?:[234]\\d|5[19]|61)|72\\d|8(?:[27]\\d|3[1-46-9]|4[0-5]))|2(?:1(?:[23]\\d|4[46-9]|5[3469])|2(?:2\\d|3[0679]|46|5[12679])|3(?:[234]\\d|5[139])|4(?:2\\d|3[1235-9]|59)|5(?:[23]\\d|4[01246-8]|59|61)|6(?:2\\d|3[1-9]|4[0-4]|59)|7(?:[237]\\d|40|5[279])|8(?:[23]\\d|4[0-3]|59)|9(?:2\\d|3[124578]|59)))\\d{5}", "\\d{10}", , , "7123456789"],
                [, , "7(?:0[012578]|47|6[02-4]|7[15-8]|85)\\d{7}", "\\d{10}", , , "7710009998"],
                [, , "800\\d{7}", "\\d{10}", , , "8001234567"],
                [, , "809\\d{7}", "\\d{10}", , , "8091234567"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "751\\d{7}", "\\d{10}", , , "7511234567"], "KZ", 7, "810", "8", , , "8", , "8~10", , , , [, , "NA", "NA"], , , [, , "751\\d{7}", "\\d{10}", , , "7511234567"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            LA: [, [, , "[2-8]\\d{7,9}", "\\d{6,10}"],
                [, , "(?:2[13]|3(?:0\\d|[14])|[5-7][14]|41|8[1468])\\d{6}", "\\d{6,9}", , , "21212862"],
                [, , "20(?:2[2389]|5[4-689]|7[6-8]|9[15-9])\\d{6}", "\\d{10}", , , "2023123456"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "LA", 856, "00", "0", , , "0", , , , [
                    [, "(20)(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["20"], "0$1"],
                    [, "([2-8]\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["2[13]|3[14]|[4-8]"], "0$1"],
                    [, "(30)(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["30"], "0$1"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            LB: [, [, , "[13-9]\\d{6,7}", "\\d{7,8}"],
                [, , "(?:[14-6]\\d{2}|7(?:[2-57]\\d|62|8[0-7]|9[04-9])|8[02-9]\\d|9\\d{2})\\d{4}", "\\d{7}", , , "1123456"],
                [, , "(?:3\\d|7(?:[01]\\d|6[013-9]|8[89]|9[1-3])|81\\d)\\d{5}", "\\d{7,8}", , , "71123456"],
                [, , "NA", "NA"],
                [, , "9[01]\\d{6}", "\\d{8}", , , "90123456"],
                [, , "80\\d{6}", "\\d{8}", , , "80123456"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "LB", 961, "00", "0", , , "0", , , , [
                    [, "(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[13-6]|7(?:[2-57]|62|8[0-7]|9[04-9])|8[02-9]|9"], "0$1"],
                    [, "([7-9]\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[89][01]|7(?:[01]|6[013-9]|8[89]|9[1-3])"]]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            LC: [, [, , "[5789]\\d{9}", "\\d{7}(?:\\d{3})?"],
                [, , "758(?:4(?:30|5[0-9]|6[2-9]|8[0-2])|57[0-2]|638)\\d{4}", "\\d{7}(?:\\d{3})?", , , "7584305678"],
                [, , "758(?:28[4-7]|384|4(?:6[01]|8[4-9])|5(?:1[89]|20|84)|7(?:1[2-9]|2[0-8]))\\d{4}", "\\d{10}", , , "7582845678"],
                [, , "8(?:00|44|55|66|77|88)[2-9]\\d{6}", "\\d{10}", , , "8002123456"],
                [, , "900[2-9]\\d{6}", "\\d{10}", , , "9002123456"],
                [, , "NA", "NA"],
                [, , "5(?:00|33|44|66|77)[2-9]\\d{6}", "\\d{10}", , , "5002345678"],
                [, , "NA", "NA"], "LC", 1, "011", "1", , , "1", , , , , , [, , "NA", "NA"], , "758", [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            LI: [, [, , "6\\d{8}|[23789]\\d{6}", "\\d{7,9}"],
                [, , "(?:2(?:01|1[27]|3\\d|6[02-578]|96)|3(?:7[0135-7]|8[048]|9[0269]))\\d{4}", "\\d{7}", , , "2345678"],
                [, , "6(?:51[01]|6(?:0[0-6]|2[016-9]|39))\\d{5}|7(?:[37-9]\\d|42|56)\\d{4}", "\\d{7,9}", , , "660234567"],
                [, , "80(?:02[28]|9\\d{2})\\d{2}", "\\d{7}", , , "8002222"],
                [, , "90(?:02[258]|1(?:23|3[14])|66[136])\\d{2}", "\\d{7}", , , "9002222"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "LI", 423, "00", "0", , , "0", , , , [
                    [, "(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3", ["[23789]"]],
                    [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["6[56]"]],
                    [, "(69)(7\\d{2})(\\d{4})", "$1 $2 $3", ["697"]]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "870(?:28|87)\\d{2}", "\\d{7}", , , "8702812"], , , [, , "697(?:42|56|[7-9]\\d)\\d{4}", "\\d{9}", , , "697861234"]
            ],
            LK: [, [, , "[1-9]\\d{8}", "\\d{7,9}"],
                [, , "(?:[189]1|2[13-7]|3[1-8]|4[157]|5[12457]|6[35-7])[2-57]\\d{6}", "\\d{7,9}", , , "112345678"],
                [, , "7[0125-8]\\d{7}", "\\d{9}", , , "712345678"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "LK", 94, "00", "0", , , "0", , , , [
                    [, "(\\d{2})(\\d{1})(\\d{6})", "$1 $2 $3", ["[1-689]"], "0$1"],
                    [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["7"], "0$1"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            LR: [, [, , "2\\d{7,8}|[37-9]\\d{8}|4\\d{6}|5\\d{6,8}", "\\d{7,9}"],
                [, , "2\\d{7}", "\\d{8}", , , "21234567"],
                [, , "(?:330\\d|4[67]|5\\d|77\\d{2}|88\\d{2}|994\\d)\\d{5}|(?:20\\d{3}|33(?:0\\d{2}|2(?:02|5\\d))|555\\d{2}|77[0567]\\d{2}|88[068]\\d{2}|994\\d{2})\\d{4}", "\\d{7,9}", , , "770123456"],
                [, , "NA", "NA"],
                [, , "90[03]\\d{6}", "\\d{9}", , , "900123456"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "332(?:0[02]|5\\d)\\d{4}", "\\d{9}", , , "332001234"], "LR", 231, "00", "0", , , "0", , , , [
                    [, "(2\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["2"], "0$1"],
                    [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2579]"], "0$1"],
                    [, "([4-6])(\\d{3})(\\d{3})", "$1 $2 $3", ["[4-6]"], "0$1"],
                    [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[38]"], "0$1"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            LS: [, [, , "[2568]\\d{7}", "\\d{8}"],
                [, , "2\\d{7}", "\\d{8}", , , "22123456"],
                [, , "[56]\\d{7}", "\\d{8}", , , "50123456"],
                [, , "800[256]\\d{4}", "\\d{8}", , , "80021234"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "LS", 266, "00", , , , , , , , [
                    [, "(\\d{4})(\\d{4})", "$1 $2"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            LT: [, [, , "[3-9]\\d{7}", "\\d{8}"],
                [, , "(?:3[1478]|4[124-6]|52)\\d{6}", "\\d{8}", , , "31234567"],
                [, , "6\\d{7}", "\\d{8}", , , "61234567"],
                [, , "800\\d{5}", "\\d{8}", , , "80012345"],
                [, , "9(?:0[0239]|10)\\d{5}", "\\d{8}", , , "90012345"],
                [, , "808\\d{5}", "\\d{8}", , , "80812345"],
                [, , "700\\d{5}", "\\d{8}", , , "70012345"],
                [, , "NA", "NA"], "LT", 370, "00", "8", , , "[08]", , , , [
                    [, "([34]\\d)(\\d{6})", "$1 $2", ["37|4(?:1|5[45]|6[2-4])"], "(8-$1)", , 1],
                    [, "([3-6]\\d{2})(\\d{5})", "$1 $2", ["3[148]|4(?:[24]|6[09])|528|6"], "(8-$1)", , 1],
                    [, "([7-9]\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["[7-9]"], "8 $1", , 1],
                    [, "(5)(2\\d{2})(\\d{4})", "$1 $2 $3", ["52[0-79]"], "(8-$1)", , 1]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "70[67]\\d{5}", "\\d{8}", , , "70712345"], , , [, , "NA", "NA"]
            ],
            LU: [, [, , "[24-9]\\d{3,10}|3(?:[0-46-9]\\d{2,9}|5[013-9]\\d{1,8})", "\\d{4,11}"],
                [, , "(?:2[2-9]\\d{2,9}|(?:[3457]\\d{2}|8(?:0[2-9]|[13-9]\\d)|9(?:0[89]|[2-579]\\d))\\d{1,8})", "\\d{4,11}", , , "27123456"],
                [, , "6[2679][18]\\d{6}", "\\d{9}", , , "628123456"],
                [, , "800\\d{5}", "\\d{8}", , , "80012345"],
                [, , "90[015]\\d{5}", "\\d{8}", , , "90012345"],
                [, , "801\\d{5}", "\\d{8}", , , "80112345"],
                [, , "70\\d{6}", "\\d{8}", , , "70123456"],
                [, , "20(?:1\\d{5}|[2-689]\\d{1,7})", "\\d{4,10}", , , "20201234"], "LU", 352, "00", , , , "(15(?:0[06]|1[12]|35|4[04]|55|6[26]|77|88|99)\\d)", , , , [
                    [, "(\\d{2})(\\d{3})", "$1 $2", ["[2-5]|7[1-9]|[89](?:[1-9]|0[2-9])"], , "$CC $1"],
                    [, "(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["[2-5]|7[1-9]|[89](?:[1-9]|0[2-9])"], , "$CC $1"],
                    [, "(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["20"], , "$CC $1"],
                    [, "(\\d{2})(\\d{2})(\\d{2})(\\d{1,2})", "$1 $2 $3 $4", ["2(?:[0367]|4[3-8])"], , "$CC $1"],
                    [, "(\\d{2})(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["20"], , "$CC $1"],
                    [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})(\\d{1,2})", "$1 $2 $3 $4 $5", ["2(?:[0367]|4[3-8])"], , "$CC $1"],
                    [, "(\\d{2})(\\d{2})(\\d{2})(\\d{1,4})", "$1 $2 $3 $4", ["2(?:[12589]|4[12])|[3-5]|7[1-9]|8(?:[1-9]|0[2-9])|9(?:[1-9]|0[2-46-9])"], , "$CC $1"],
                    [, "(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["70|80[01]|90[015]"], , "$CC $1"],
                    [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["6"], , "$CC $1"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            LV: [, [, , "[2689]\\d{7}", "\\d{8}"],
                [, , "6[3-8]\\d{6}", "\\d{8}", , , "63123456"],
                [, , "2\\d{7}", "\\d{8}", , , "21234567"],
                [, , "80\\d{6}", "\\d{8}", , , "80123456"],
                [, , "90\\d{6}", "\\d{8}", , , "90123456"],
                [, , "81\\d{6}", "\\d{8}", , , "81123456"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "LV", 371, "00", , , , , , , , [
                    [, "([2689]\\d)(\\d{3})(\\d{3})", "$1 $2 $3"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            LY: [, [, , "[25679]\\d{8}", "\\d{7,9}"],
                [, , "(?:2[1345]|5[1347]|6[123479]|71)\\d{7}", "\\d{7,9}", , , "212345678"],
                [, , "9[1-6]\\d{7}", "\\d{9}", , , "912345678"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "LY", 218, "00", "0", , , "0", , , , [
                    [, "([25679]\\d)(\\d{7})", "$1-$2", , "0$1"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            MA: [, [, , "[5689]\\d{8}", "\\d{9}"],
                [, , "5(?:2(?:(?:[015-7]\\d|2[2-9]|3[2-57]|4[2-8]|8[235-7])\\d|9(?:0\\d|[89]0))|3(?:(?:[0-4]\\d|[57][2-9]|6[235-8]|9[3-9])\\d|8(?:0\\d|[89]0)))\\d{4}", "\\d{9}", , , "520123456"],
                [, , "6(?:0[0-8]|[12-79]\\d|8[017])\\d{6}", "\\d{9}", , , "650123456"],
                [, , "80\\d{7}", "\\d{9}", , , "801234567"],
                [, , "89\\d{7}", "\\d{9}", , , "891234567"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "MA", 212, "00", "0", , , "0", , , , [
                    [, "([56]\\d{2})(\\d{6})", "$1-$2", ["5(?:2[015-7]|3[0-4])|6"], "0$1"],
                    [, "([58]\\d{3})(\\d{5})", "$1-$2", ["5(?:2[2-489]|3[5-9])|892", "5(?:2(?:[2-48]|90)|3(?:[5-79]|80))|892"], "0$1"],
                    [, "(5\\d{4})(\\d{4})", "$1-$2", ["5(?:29|38)", "5(?:29|38)[89]"], "0$1"],
                    [, "(8[09])(\\d{7})", "$1-$2", ["8(?:0|9[013-9])"], "0$1"]
                ], , [, , "NA", "NA"], 1, , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            MC: [, [, , "[4689]\\d{7,8}", "\\d{8,9}"],
                [, , "870\\d{5}|9[2-47-9]\\d{6}", "\\d{8}", , , "99123456"],
                [, , "6\\d{8}|4(?:4\\d|5[1-9])\\d{5}", "\\d{8,9}", , , "612345678"],
                [, , "90\\d{6}", "\\d{8}", , , "90123456"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "MC", 377, "00", "0", , , "0", , , , [
                    [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["9"], "$1"],
                    [, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["4"], "0$1"],
                    [, "(6)(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["6"], "0$1"],
                    [, "(\\d{3})(\\d{3})(\\d{2})", "$1 $2 $3", ["8"], "$1"]
                ], , [, , "NA", "NA"], , , [, , "8\\d{7}", "\\d{8}"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            MD: [, [, , "[235-9]\\d{7}", "\\d{8}"],
                [, , "(?:2(?:1[0569]|2\\d|3[015-7]|4[1-46-9]|5[0-24689]|6[2-589]|7[1-37]|9[1347-9])|5(?:33|5[257]))\\d{5}", "\\d{8}", , , "22212345"],
                [, , "(?:562\\d|6(?:[089]\\d{2}|[12][01]\\d|7(?:[1-6]\\d|7[0-4]))|7(?:6[07]|7[457-9]|[89]\\d)\\d)\\d{4}", "\\d{8}", , , "62112345"],
                [, , "800\\d{5}", "\\d{8}", , , "80012345"],
                [, , "90[056]\\d{5}", "\\d{8}", , , "90012345"],
                [, , "808\\d{5}", "\\d{8}", , , "80812345"],
                [, , "NA", "NA"],
                [, , "3[08]\\d{6}", "\\d{8}", , , "30123456"], "MD", 373, "00", "0", , , "0", , , , [
                    [, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["22|3"], "0$1"],
                    [, "([25-7]\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["2[13-79]|[5-7]"], "0$1"],
                    [, "([89]\\d{2})(\\d{5})", "$1 $2", ["[89]"], "0$1"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "8(?:03|14)\\d{5}", "\\d{8}", , , "80312345"], , , [, , "NA", "NA"]
            ],
            ME: [, [, , "[2-9]\\d{7,8}", "\\d{6,9}"],
                [, , "(?:20[2-8]|3(?:0[2-7]|[12][35-7]|3[4-7])|4(?:0[2367]|1[267])|5(?:0[467]|1[267]|2[367]))\\d{5}", "\\d{6,8}", , , "30234567"],
                [, , "6(?:00\\d|32\\d|[89]\\d{2}|61\\d|7(?:[0-8]\\d|9(?:[3-9]|[0-2]\\d)))\\d{4}", "\\d{8,9}", , , "67622901"],
                [, , "80\\d{6}", "\\d{8}", , , "80080002"],
                [, , "(?:9(?:4[1568]|5[178]))\\d{5}", "\\d{8}", , , "94515151"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "78[1-9]\\d{5}", "\\d{8}", , , "78108780"], "ME", 382, "00", "0", , , "0", , , , [
                    [, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-57-9]|6[036-9]", "[2-57-9]|6(?:[03689]|7(?:[0-8]|9[3-9]))"], "0$1"],
                    [, "(67)(9)(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["679", "679[0-2]"], "0$1"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "77\\d{6}", "\\d{8}", , , "77273012"], , , [, , "NA", "NA"]
            ],
            MF: [, [, , "[56]\\d{8}", "\\d{9}"],
                [, , "590(?:[02][79]|13|5[0-268]|[78]7)\\d{4}", "\\d{9}", , , "590271234"],
                [, , "690(?:0[0-7]|[1-9]\\d)\\d{4}", "\\d{9}", , , "690301234"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "MF", 590, "00", "0", , , "0", , , , , , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            MG: [, [, , "[23]\\d{8}", "\\d{7,9}"],
                [, , "20(?:2\\d{2}|4[47]\\d|5[3467]\\d|6[279]\\d|7(?:2[29]|[35]\\d)|8[268]\\d|9[245]\\d)\\d{4}", "\\d{7,9}", , , "202123456"],
                [, , "3[2-49]\\d{7}", "\\d{9}", , , "321234567"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "22\\d{7}", "\\d{9}", , , "221234567"], "MG", 261, "00", "0", , , "0", , , , [
                    [, "([23]\\d)(\\d{2})(\\d{3})(\\d{2})", "$1 $2 $3 $4", , "0$1"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            MH: [, [, , "[2-6]\\d{6}", "\\d{7}"],
                [, , "(?:247|528|625)\\d{4}", "\\d{7}", , , "2471234"],
                [, , "(?:235|329|45[56]|545)\\d{4}", "\\d{7}", , , "2351234"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "635\\d{4}", "\\d{7}", , , "6351234"], "MH", 692, "011", "1", , , "1", , , , [
                    [, "(\\d{3})(\\d{4})", "$1-$2"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            MK: [, [, , "[2-578]\\d{7}", "\\d{8}"],
                [, , "(?:2(?:[23]\\d|5[124578]|6[01])|3(?:1[3-6]|[23][2-6]|4[2356])|4(?:[23][2-6]|4[3-6]|5[256]|6[25-8]|7[24-6]|8[4-6]))\\d{5}", "\\d{6,8}", , , "22212345"],
                [, , "7(?:[0-25-8]\\d{2}|32\\d|421)\\d{4}", "\\d{8}", , , "72345678"],
                [, , "800\\d{5}", "\\d{8}", , , "80012345"],
                [, , "5[02-9]\\d{6}", "\\d{8}", , , "50012345"],
                [, , "8(?:0[1-9]|[1-9]\\d)\\d{5}", "\\d{8}", , , "80123456"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "MK", 389, "00", "0", , , "0", , , , [
                    [, "(2)(\\d{3})(\\d{4})", "$1 $2 $3", ["2"], "0$1"],
                    [, "([347]\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[347]"], "0$1"],
                    [, "([58]\\d{2})(\\d)(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[58]"], "0$1"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            ML: [, [, , "[246-9]\\d{7}", "\\d{8}"],
                [, , "(?:2(?:0(?:2[0-589]|7\\d)|1(?:2[5-7]|[3-689]\\d|7[2-4689]))|44[239]\\d)\\d{4}", "\\d{8}", , , "20212345"],
                [, , "[67]\\d{7}|9[0-25-9]\\d{6}", "\\d{8}", , , "65012345"],
                [, , "800\\d{5}", "\\d{8}", , , "80012345"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "ML", 223, "00", , , , , , , , [
                    [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[246-9]"]],
                    [, "(\\d{4})", "$1", ["67|74"]]
                ],
                [
                    [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[246-9]"]]
                ],
                [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            MM: [, [, , "[14578]\\d{5,7}|[26]\\d{5,8}|9(?:2\\d{0,2}|[58]|3\\d|4\\d{1,2}|6\\d?|[79]\\d{0,2})\\d{6}", "\\d{5,10}"],
                [, , "1(?:2\\d{1,2}|[3-5]\\d|6\\d?|[89][0-6]\\d)\\d{4}|2(?:2(?:000\\d{3}|\\d{4})|3\\d{4}|4(?:0\\d{5}|\\d{4})|5(?:1\\d{3,6}|[02-9]\\d{3,5})|[6-9]\\d{4})|4(?:2[245-8]|[346][2-6]|5[3-5])\\d{4}|5(?:2(?:20?|[3-8])|3[2-68]|4(?:21?|[4-8])|5[23]|6[2-4]|7[2-8]|8[24-7]|9[2-7])\\d{4}|6(?:0[23]|1[2356]|[24][2-6]|3[24-6]|5[2-4]|6[2-8]|7(?:[2367]|4\\d|5\\d?|8[145]\\d)|8[245]|9[24])\\d{4}|7(?:[04][24-8]|[15][2-7]|22|3[2-4])\\d{4}|8(?:1(?:2\\d{1,2}|[3-689]\\d)|2(?:2\\d|3(?:\\d|20)|[4-8]\\d)|3[24]\\d|4[24-7]\\d|5[245]\\d|6[23]\\d)\\d{3}", "\\d{5,9}", , , "1234567"],
                [, , "17[01]\\d{4}|9(?:2(?:[0-4]|5\\d{2}|6[0-5]\\d)|3[0-36]\\d|4(?:0[0-4]\\d|[1379]\\d|2\\d{2}|4[0-589]\\d|5\\d{2}|88)|5[0-6]|61?\\d|7(?:3\\d|[789]\\d{2})|8\\d|9(?:1\\d|[67]\\d{2}|[089]))\\d{5}", "\\d{7,10}", , , "92123456"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "1333\\d{4}", "\\d{8}", , , "13331234"], "MM", 95, "00", "0", , , "0", , , , [
                    [, "(\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["1|2[245]"], "0$1"],
                    [, "(2)(\\d{4})(\\d{4})", "$1 $2 $3", ["251"], "0$1"],
                    [, "(\\d)(\\d{2})(\\d{3})", "$1 $2 $3", ["16|2"], "0$1"],
                    [, "(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["67|81"], "0$1"],
                    [, "(\\d{2})(\\d{2})(\\d{3,4})", "$1 $2 $3", ["[4-8]"], "0$1"],
                    [, "(9)(\\d{3})(\\d{4,6})", "$1 $2 $3", ["9(?:2[0-4]|[35-9]|4[137-9])"], "0$1"],
                    [, "(9)([34]\\d{4})(\\d{4})", "$1 $2 $3", ["9(?:3[0-36]|4[0-57-9])"], "0$1"],
                    [, "(9)(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["92[56]"], "0$1"],
                    [, "(9)(\\d{3})(\\d{3})(\\d{2})", "$1 $2 $3 $4", ["93"], "0$1"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            MN: [, [, , "[12]\\d{7,9}|[57-9]\\d{7}", "\\d{6,10}"],
                [, , "[12](?:1\\d|2(?:[1-3]\\d?|7\\d)|3[2-8]\\d{1,2}|4[2-68]\\d{1,2}|5[1-4689]\\d{1,2})\\d{5}|5[0568]\\d{6}", "\\d{6,10}", , , "50123456"],
                [, , "(?:8(?:[05689]\\d|3[01])|9[013-9]\\d)\\d{5}", "\\d{8}", , , "88123456"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "7[05-8]\\d{6}", "\\d{8}", , , "75123456"], "MN", 976, "001", "0", , , "0", , , , [
                    [, "([12]\\d)(\\d{2})(\\d{4})", "$1 $2 $3", ["[12]1"], "0$1"],
                    [, "([12]2\\d)(\\d{5,6})", "$1 $2", ["[12]2[1-3]"], "0$1"],
                    [, "([12]\\d{3})(\\d{5})", "$1 $2", ["[12](?:27|[3-5])", "[12](?:27|[3-5]\\d)2"], "0$1"],
                    [, "(\\d{4})(\\d{4})", "$1 $2", ["[57-9]"], "$1"],
                    [, "([12]\\d{4})(\\d{4,5})", "$1 $2", ["[12](?:27|[3-5])", "[12](?:27|[3-5]\\d)[4-9]"], "0$1"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            MO: [, [, , "[268]\\d{7}", "\\d{8}"],
                [, , "(?:28[2-57-9]|8[2-57-9]\\d)\\d{5}", "\\d{8}", , , "28212345"],
                [, , "6(?:[2356]\\d|8[18])\\d{5}", "\\d{8}", , , "66123456"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "MO", 853, "00", , , , , , , , [
                    [, "([268]\\d{3})(\\d{4})", "$1 $2"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            MP: [, [, , "[5689]\\d{9}", "\\d{7}(?:\\d{3})?"],
                [, , "670(?:2(?:3[3-7]|56|8[5-8])|32[1238]|4(?:33|8[348])|5(?:32|55|88)|6(?:64|70|82)|78[589]|8[3-9]8|989)\\d{4}", "\\d{7}(?:\\d{3})?", , , "6702345678"],
                [, , "670(?:2(?:3[3-7]|56|8[5-8])|32[1238]|4(?:33|8[348])|5(?:32|55|88)|6(?:64|70|82)|78[589]|8[3-9]8|989)\\d{4}", "\\d{7}(?:\\d{3})?", , , "6702345678"],
                [, , "8(?:00|44|55|66|77|88)[2-9]\\d{6}", "\\d{10}", , , "8002123456"],
                [, , "900[2-9]\\d{6}", "\\d{10}", , , "9002123456"],
                [, , "NA", "NA"],
                [, , "5(?:00|33|44|66|77)[2-9]\\d{6}", "\\d{10}", , , "5002345678"],
                [, , "NA", "NA"], "MP", 1, "011", "1", , , "1", , , 1, , , [, , "NA", "NA"], , "670", [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            MQ: [, [, , "[56]\\d{8}", "\\d{9}"],
                [, , "596(?:0[2-5]|[12]0|3[05-9]|4[024-8]|[5-7]\\d|89|9[4-8])\\d{4}", "\\d{9}", , , "596301234"],
                [, , "696(?:[0-479]\\d|5[01]|8[0-689])\\d{4}", "\\d{9}", , , "696201234"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "MQ", 596, "00", "0", , , "0", , , , [
                    [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", , "0$1"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            MR: [, [, , "[2-48]\\d{7}", "\\d{8}"],
                [, , "25[08]\\d{5}|35\\d{6}|45[1-7]\\d{5}", "\\d{8}", , , "35123456"],
                [, , "[234][0-46-9]\\d{6}", "\\d{8}", , , "22123456"],
                [, , "800\\d{5}", "\\d{8}", , , "80012345"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "MR", 222, "00", , , , , , , , [
                    [, "([2-48]\\d)(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            MS: [, [, , "[5689]\\d{9}", "\\d{7}(?:\\d{3})?"],
                [, , "664491\\d{4}", "\\d{7}(?:\\d{3})?", , , "6644912345"],
                [, , "66449[2-6]\\d{4}", "\\d{10}", , , "6644923456"],
                [, , "8(?:00|44|55|66|77|88)[2-9]\\d{6}", "\\d{10}", , , "8002123456"],
                [, , "900[2-9]\\d{6}", "\\d{10}", , , "9002123456"],
                [, , "NA", "NA"],
                [, , "5(?:00|33|44|66|77)[2-9]\\d{6}", "\\d{10}", , , "5002345678"],
                [, , "NA", "NA"], "MS", 1, "011", "1", , , "1", , , , , , [, , "NA", "NA"], , "664", [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            MT: [, [, , "[2357-9]\\d{7}", "\\d{8}"],
                [, , "2(?:0(?:1[0-6]|3[1-4]|[69]\\d)|[1-357]\\d{2})\\d{4}", "\\d{8}", , , "21001234"],
                [, , "(?:7(?:210|[79]\\d{2})|9(?:2(?:1[01]|31)|696|8(?:1[1-3]|89|97)|9\\d{2}))\\d{4}", "\\d{8}", , , "96961234"],
                [, , "800[3467]\\d{4}", "\\d{8}", , , "80071234"],
                [, , "5(?:0(?:0(?:37|43)|6\\d{2}|70\\d|9[0168])|[12]\\d0[1-5])\\d{3}", "\\d{8}", , , "50037123"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "3550\\d{4}", "\\d{8}", , , "35501234"], "MT", 356, "00", , , , , , , , [
                    [, "(\\d{4})(\\d{4})", "$1 $2"]
                ], , [, , "7117\\d{4}", "\\d{8}", , , "71171234"], , , [, , "NA", "NA"],
                [, , "501\\d{5}", "\\d{8}", , , "50112345"], , , [, , "NA", "NA"]
            ],
            MU: [, [, , "[2-9]\\d{6,7}", "\\d{7,8}"],
                [, , "(?:2(?:[03478]\\d|1[0-7]|6[1-69])|4(?:[013568]\\d|2[4-7])|5(?:44\\d|471)|6\\d{2}|8(?:14|3[129]))\\d{4}", "\\d{7,8}", , , "2012345"],
                [, , "5(?:2[59]\\d|4(?:2[1-389]|4\\d|7[1-9]|9\\d)|7\\d{2}|8(?:[0-2568]\\d|7[15-8])|9[0-8]\\d)\\d{4}", "\\d{8}", , , "52512345"],
                [, , "80[012]\\d{4}", "\\d{7}", , , "8001234"],
                [, , "30\\d{5}", "\\d{7}", , , "3012345"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "3(?:20|9\\d)\\d{4}", "\\d{7}", , , "3201234"], "MU", 230, "0(?:0|[2-7]0|33)", , , , , , "020", , [
                    [, "([2-46-9]\\d{2})(\\d{4})", "$1 $2", ["[2-46-9]"]],
                    [, "(5\\d{3})(\\d{4})", "$1 $2", ["5"]]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            MV: [, [, , "[3467]\\d{6}|9(?:00\\d{7}|\\d{6})", "\\d{7,10}"],
                [, , "(?:3(?:0[01]|3[0-59])|6(?:[567][02468]|8[024689]|90))\\d{4}", "\\d{7}", , , "6701234"],
                [, , "(?:46[46]|7[3-9]\\d|9[15-9]\\d)\\d{4}", "\\d{7}", , , "7712345"],
                [, , "NA", "NA"],
                [, , "900\\d{7}", "\\d{10}", , , "9001234567"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "MV", 960, "0(?:0|19)", , , , , , "00", , [
                    [, "(\\d{3})(\\d{4})", "$1-$2", ["[3467]|9(?:[1-9]|0[1-9])"]],
                    [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["900"]]
                ], , [, , "781\\d{4}", "\\d{7}", , , "7812345"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            MW: [, [, , "(?:1(?:\\d{2})?|[2789]\\d{2})\\d{6}", "\\d{7,9}"],
                [, , "(?:1[2-9]|21\\d{2})\\d{5}", "\\d{7,9}", , , "1234567"],
                [, , "(?:111|77\\d|88\\d|99\\d)\\d{6}", "\\d{9}", , , "991234567"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "MW", 265, "00", "0", , , "0", , , , [
                    [, "(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["1"], "0$1"],
                    [, "(2\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["2"], "0$1"],
                    [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[1789]"], "0$1"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            MX: [, [, , "[1-9]\\d{9,10}", "\\d{7,11}"],
                [, , "(?:33|55|81)\\d{8}|(?:2(?:0[01]|2[2-9]|3[1-35-8]|4[13-9]|7[1-689]|8[1-578]|9[467])|3(?:1[1-79]|[2458][1-9]|7[1-8]|9[1-5])|4(?:1[1-57-9]|[24-6][1-9]|[37][1-8]|8[1-35-9]|9[2-689])|5(?:88|9[1-79])|6(?:1[2-68]|[234][1-9]|5[1-3689]|6[12457-9]|7[1-7]|8[67]|9[4-8])|7(?:[13467][1-9]|2[1-8]|5[13-9]|8[1-69]|9[17])|8(?:2[13-689]|3[1-6]|4[124-6]|6[1246-9]|7[1-378]|9[12479])|9(?:1[346-9]|2[1-4]|3[2-46-8]|5[1348]|[69][1-9]|7[12]|8[1-8]))\\d{7}", "\\d{7,10}", , , "2221234567"],
                [, , "1(?:(?:33|55|81)\\d{8}|(?:2(?:2[2-9]|3[1-35-8]|4[13-9]|7[1-689]|8[1-578]|9[467])|3(?:1[1-79]|[2458][1-9]|7[1-8]|9[1-5])|4(?:1[1-57-9]|[24-6][1-9]|[37][1-8]|8[1-35-9]|9[2-689])|5(?:88|9[1-79])|6(?:1[2-68]|[2-4][1-9]|5[1-3689]|6[12457-9]|7[1-7]|8[67]|9[4-8])|7(?:[13467][1-9]|2[1-8]|5[13-9]|8[1-69]|9[17])|8(?:2[13-689]|3[1-6]|4[124-6]|6[1246-9]|7[1-378]|9[12479])|9(?:1[346-9]|2[1-4]|3[2-46-8]|5[1348]|[69][1-9]|7[12]|8[1-8]))\\d{7})", "\\d{11}", , , "12221234567"],
                [, , "8(?:00|88)\\d{7}", "\\d{10}", , , "8001234567"],
                [, , "900\\d{7}", "\\d{10}", , , "9001234567"],
                [, , "300\\d{7}", "\\d{10}", , , "3001234567"],
                [, , "500\\d{7}", "\\d{10}", , , "5001234567"],
                [, , "NA", "NA"], "MX", 52, "0[09]", "01", , , "0[12]|04[45](\\d{10})", "1$1", , , [
                    [, "([358]\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["33|55|81"], "01 $1", , 1],
                    [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[2467]|3[0-2457-9]|5[089]|8[02-9]|9[0-35-9]"], "01 $1", , 1],
                    [, "(1)([358]\\d)(\\d{4})(\\d{4})", "044 $2 $3 $4", ["1(?:33|55|81)"], "$1", , 1],
                    [, "(1)(\\d{3})(\\d{3})(\\d{4})", "044 $2 $3 $4", ["1(?:[2467]|3[0-2457-9]|5[089]|8[2-9]|9[1-35-9])"], "$1", , 1]
                ],
                [
                    [, "([358]\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["33|55|81"], "01 $1", , 1],
                    [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[2467]|3[0-2457-9]|5[089]|8[02-9]|9[0-35-9]"], "01 $1", , 1],
                    [, "(1)([358]\\d)(\\d{4})(\\d{4})", "$1 $2 $3 $4", ["1(?:33|55|81)"]],
                    [, "(1)(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3 $4", ["1(?:[2467]|3[0-2457-9]|5[089]|8[2-9]|9[1-35-9])"]]
                ],
                [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], 1, , [, , "NA", "NA"]
            ],
            MY: [, [, , "[13-9]\\d{7,9}", "\\d{6,10}"],
                [, , "(?:3[2-9]\\d|[4-9][2-9])\\d{6}", "\\d{6,9}", , , "323456789"],
                [, , "1(?:1[1-5]\\d{2}|[02-4679][2-9]\\d|59\\d{2}|8(?:1[23]|[2-9]\\d))\\d{5}", "\\d{9,10}", , , "123456789"],
                [, , "1[378]00\\d{6}", "\\d{10}", , , "1300123456"],
                [, , "1600\\d{6}", "\\d{10}", , , "1600123456"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "154\\d{7}", "\\d{10}", , , "1541234567"], "MY", 60, "00", "0", , , "0", , , , [
                    [, "([4-79])(\\d{3})(\\d{4})", "$1-$2 $3", ["[4-79]"], "0$1"],
                    [, "(3)(\\d{4})(\\d{4})", "$1-$2 $3", ["3"], "0$1"],
                    [, "([18]\\d)(\\d{3})(\\d{3,4})", "$1-$2 $3", ["1[02-46-9][1-9]|8"], "0$1"],
                    [, "(1)([36-8]00)(\\d{2})(\\d{4})", "$1-$2-$3-$4", ["1[36-8]0"]],
                    [, "(11)(\\d{4})(\\d{4})", "$1-$2 $3", ["11"], "0$1"],
                    [, "(15[49])(\\d{3})(\\d{4})", "$1-$2 $3", ["15"], "0$1"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            MZ: [, [, , "[28]\\d{7,8}", "\\d{8,9}"],
                [, , "2(?:[1346]\\d|5[0-2]|[78][12]|93)\\d{5}", "\\d{8}", , , "21123456"],
                [, , "8[23467]\\d{7}", "\\d{9}", , , "821234567"],
                [, , "800\\d{6}", "\\d{9}", , , "800123456"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "MZ", 258, "00", , , , , , , , [
                    [, "([28]\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2|8[2-7]"]],
                    [, "(80\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["80"]]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            NA: [, [, , "[68]\\d{7,8}", "\\d{8,9}"],
                [, , "6(?:1(?:17|2(?:[0189]\\d|[2-6]|7\\d?)|3(?:[01378]|2\\d)|4[01]|69|7[014])|2(?:17|5(?:[0-36-8]|4\\d?)|69|70)|3(?:17|2(?:[0237]\\d?|[14-689])|34|6[289]|7[01]|81)|4(?:17|2(?:[012]|7?)|4(?:[06]|1\\d)|5(?:[01357]|[25]\\d?)|69|7[01])|5(?:17|2(?:[0459]|[23678]\\d?)|69|7[01])|6(?:17|2(?:5|6\\d?)|38|42|69|7[01])|7(?:17|2(?:[569]|[234]\\d?)|3(?:0\\d?|[13])|69|7[01]))\\d{4}", "\\d{8,9}", , , "61221234"],
                [, , "(?:60|8[125])\\d{7}", "\\d{9}", , , "811234567"],
                [, , "NA", "NA"],
                [, , "8701\\d{5}", "\\d{9}", , , "870123456"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "8(?:3\\d{2}|86)\\d{5}", "\\d{8,9}", , , "88612345"], "NA", 264, "00", "0", , , "0", , , , [
                    [, "(8\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["8[1235]"], "0$1"],
                    [, "(6\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["6"], "0$1"],
                    [, "(88)(\\d{3})(\\d{3})", "$1 $2 $3", ["88"], "0$1"],
                    [, "(870)(\\d{3})(\\d{3})", "$1 $2 $3", ["870"], "0$1"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            NC: [, [, , "[2-57-9]\\d{5}", "\\d{6}"],
                [, , "(?:2[03-9]|3[0-5]|4[1-7]|88)\\d{4}", "\\d{6}", , , "201234"],
                [, , "(?:5[0-4]|[79]\\d|8[0-79])\\d{4}", "\\d{6}", , , "751234"],
                [, , "NA", "NA"],
                [, , "36\\d{4}", "\\d{6}", , , "366711"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "NC", 687, "00", , , , , , , , [
                    [, "(\\d{2})(\\d{2})(\\d{2})", "$1.$2.$3", ["[2-46-9]|5[0-4]"]]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            NE: [, [, , "[0289]\\d{7}", "\\d{8}"],
                [, , "2(?:0(?:20|3[1-7]|4[134]|5[14]|6[14578]|7[1-578])|1(?:4[145]|5[14]|6[14-68]|7[169]|88))\\d{4}", "\\d{8}", , , "20201234"],
                [, , "(?:8[089]|9\\d)\\d{6}", "\\d{8}", , , "93123456"],
                [, , "08\\d{6}", "\\d{8}", , , "08123456"],
                [, , "09\\d{6}", "\\d{8}", , , "09123456"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "NE", 227, "00", , , , , , , , [
                    [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[289]|09"]],
                    [, "(08)(\\d{3})(\\d{3})", "$1 $2 $3", ["08"]]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], 1, , [, , "NA", "NA"]
            ],
            NF: [, [, , "[13]\\d{5}", "\\d{5,6}"],
                [, , "(?:1(?:06|17|28|39)|3[012]\\d)\\d{3}", "\\d{5,6}", , , "106609"],
                [, , "3[58]\\d{4}", "\\d{5,6}", , , "381234"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "NF", 672, "00", , , , , , , , [
                    [, "(\\d{2})(\\d{4})", "$1 $2", ["1"]],
                    [, "(\\d)(\\d{5})", "$1 $2", ["3"]]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            NG: [, [, , "[1-6]\\d{5,8}|9\\d{5,9}|[78]\\d{5,13}", "\\d{5,14}"],
                [, , "[12]\\d{6,7}|9(?:0[3-9]|[1-9]\\d)\\d{5}|(?:3\\d|4[023568]|5[02368]|6[02-469]|7[4-69]|8[2-9])\\d{6}|(?:4[47]|5[14579]|6[1578]|7[0-357])\\d{5,6}|(?:78|41)\\d{5}", "\\d{5,9}", , , "12345678"],
                [, , "(?:1(?:7[34]\\d|8(?:04|[124579]\\d|8[0-3])|95\\d)|287[0-7]|3(?:18[1-8]|88[0-7]|9(?:8[5-9]|6[1-5]))|4(?:28[0-2]|6(?:7[1-9]|8[02-47])|88[0-2])|5(?:2(?:7[7-9]|8\\d)|38[1-79]|48[0-7]|68[4-7])|6(?:2(?:7[7-9]|8\\d)|4(?:3[7-9]|[68][129]|7[04-69]|9[1-8])|58[0-2]|98[7-9])|7(?:38[0-7]|69[1-8]|78[2-4])|8(?:28[3-9]|38[0-2]|4(?:2[12]|3[147-9]|5[346]|7[4-9]|8[014-689]|90)|58[1-8]|78[2-9]|88[5-7])|98[07]\\d)\\d{4}|(?:70(?:[13-9]\\d|2[1-9])|8(?:0[2-9]|1\\d)\\d|90[2359]\\d)\\d{6}", "\\d{8,10}", , , "8021234567"],
                [, , "800\\d{7,11}", "\\d{10,14}", , , "80017591759"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "NG", 234, "009", "0", , , "0", , , , [
                    [, "([129])(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[129]"], "0$1"],
                    [, "(\\d{2})(\\d{3})(\\d{2,3})", "$1 $2 $3", ["[3-6]|7(?:[1-79]|0[1-9])|8[2-9]"], "0$1"],
                    [, "(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["70|8[01]|90[2359]"], "0$1"],
                    [, "([78]00)(\\d{4})(\\d{4,5})", "$1 $2 $3", ["[78]00"], "0$1"],
                    [, "([78]00)(\\d{5})(\\d{5,6})", "$1 $2 $3", ["[78]00"], "0$1"],
                    [, "(78)(\\d{2})(\\d{3})", "$1 $2 $3", ["78"], "0$1"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "700\\d{7,11}", "\\d{10,14}", , , "7001234567"], , , [, , "NA", "NA"]
            ],
            NI: [, [, , "[12578]\\d{7}", "\\d{8}"],
                [, , "2\\d{7}", "\\d{8}", , , "21234567"],
                [, , "5(?:5[0-7]\\d{5}|[78]\\d{6})|7[5-8]\\d{6}|8\\d{7}", "\\d{8}", , , "81234567"],
                [, , "1800\\d{4}", "\\d{8}", , , "18001234"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "NI", 505, "00", , , , , , , , [
                    [, "(\\d{4})(\\d{4})", "$1 $2"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            NL: [, [, , "1\\d{4,8}|[2-7]\\d{8}|[89]\\d{6,9}", "\\d{5,10}"],
                [, , "(?:1[0135-8]|2[02-69]|3[0-68]|4[0135-9]|[57]\\d|8[478])\\d{7}", "\\d{9}", , , "101234567"],
                [, , "6[1-58]\\d{7}", "\\d{9}", , , "612345678"],
                [, , "800\\d{4,7}", "\\d{7,10}", , , "8001234"],
                [, , "90[069]\\d{4,7}", "\\d{7,10}", , , "9061234"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "85\\d{7}", "\\d{9}", , , "851234567"], "NL", 31, "00", "0", , , "0", , , , [
                    [, "([1-578]\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["1[035]|2[0346]|3[03568]|4[0356]|5[0358]|7|8[4578]"], "0$1"],
                    [, "([1-5]\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["1[16-8]|2[259]|3[124]|4[17-9]|5[124679]"], "0$1"],
                    [, "(6)(\\d{8})", "$1 $2", ["6[0-57-9]"], "0$1"],
                    [, "(66)(\\d{7})", "$1 $2", ["66"], "0$1"],
                    [, "(14)(\\d{3,4})", "$1 $2", ["14"], "$1"],
                    [, "([89]0\\d)(\\d{4,7})", "$1 $2", ["80|9"], "0$1"]
                ], , [, , "66\\d{7}", "\\d{9}", , , "662345678"], , , [, , "14\\d{3,4}", "\\d{5,6}"],
                [, , "140(?:1(?:[035]|[16-8]\\d)|2(?:[0346]|[259]\\d)|3(?:[03568]|[124]\\d)|4(?:[0356]|[17-9]\\d)|5(?:[0358]|[124679]\\d)|7\\d|8[458])", "\\d{5,6}", , , "14020"], , , [, , "NA", "NA"]
            ],
            NO: [, [, , "0\\d{4}|[2-9]\\d{7}", "\\d{5}(?:\\d{3})?"],
                [, , "(?:2[1-4]|3[1-3578]|5[1-35-7]|6[1-4679]|7[0-8])\\d{6}", "\\d{8}", , , "21234567"],
                [, , "(?:4[015-8]|5[89]|9\\d)\\d{6}", "\\d{8}", , , "40612345"],
                [, , "80[01]\\d{5}", "\\d{8}", , , "80012345"],
                [, , "82[09]\\d{5}", "\\d{8}", , , "82012345"],
                [, , "810(?:0[0-6]|[2-8]\\d)\\d{3}", "\\d{8}", , , "81021234"],
                [, , "880\\d{5}", "\\d{8}", , , "88012345"],
                [, , "85[0-5]\\d{5}", "\\d{8}", , , "85012345"], "NO", 47, "00", , , , , , , , [
                    [, "([489]\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["[489]"]],
                    [, "([235-7]\\d)(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[235-7]"]]
                ], , [, , "NA", "NA"], 1, , [, , "NA", "NA"],
                [, , "0\\d{4}|81(?:0(?:0[7-9]|1\\d)|5\\d{2})\\d{3}", "\\d{5}(?:\\d{3})?", , , "01234"], 1, , [, , "81[23]\\d{5}", "\\d{8}", , , "81212345"]
            ],
            NP: [, [, , "[1-8]\\d{7}|9(?:[1-69]\\d{6,8}|7[2-6]\\d{5,7}|8\\d{8})", "\\d{6,10}"],
                [, , "(?:1[0-6]\\d|2[13-79][2-6]|3[135-8][2-6]|4[146-9][2-6]|5[135-7][2-6]|6[13-9][2-6]|7[15-9][2-6]|8[1-46-9][2-6]|9[1-79][2-6])\\d{5}", "\\d{6,8}", , , "14567890"],
                [, , "9(?:6[013]|7[245]|8[0-24-6])\\d{7}", "\\d{10}", , , "9841234567"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "NP", 977, "00", "0", , , "0", , , , [
                    [, "(1)(\\d{7})", "$1-$2", ["1[2-6]"], "0$1"],
                    [, "(\\d{2})(\\d{6})", "$1-$2", ["1[01]|[2-8]|9(?:[1-69]|7[15-9])"], "0$1"],
                    [, "(9\\d{2})(\\d{7})", "$1-$2", ["9(?:6[013]|7[245]|8)"], "$1"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            NR: [, [, , "[458]\\d{6}", "\\d{7}"],
                [, , "(?:444|888)\\d{4}", "\\d{7}", , , "4441234"],
                [, , "55[5-9]\\d{4}", "\\d{7}", , , "5551234"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "NR", 674, "00", , , , , , , , [
                    [, "(\\d{3})(\\d{4})", "$1 $2"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            NU: [, [, , "[1-5]\\d{3}", "\\d{4}"],
                [, , "[34]\\d{3}", "\\d{4}", , , "4002"],
                [, , "[125]\\d{3}", "\\d{4}", , , "1234"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "NU", 683, "00", , , , , , , , , , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            NZ: [, [, , "6[235-9]\\d{6}|[2-57-9]\\d{7,10}", "\\d{7,11}"],
                [, , "(?:3[2-79]|[49][2-9]|6[235-9]|7[2-57-9])\\d{6}|24099\\d{3}", "\\d{7,8}", , , "32345678"],
                [, , "2(?:[028]\\d{7,8}|1(?:[03]\\d{5,7}|[12457]\\d{5,6}|[689]\\d{5})|[79]\\d{7})", "\\d{8,10}", , , "211234567"],
                [, , "508\\d{6,7}|80\\d{6,8}", "\\d{8,10}", , , "800123456"],
                [, , "90\\d{7,9}", "\\d{9,11}", , , "900123456"],
                [, , "NA", "NA"],
                [, , "70\\d{7}", "\\d{9}", , , "701234567"],
                [, , "NA", "NA"], "NZ", 64, "0(?:0|161)", "0", , , "0", , "00", , [
                    [, "([34679])(\\d{3})(\\d{4})", "$1-$2 $3", ["[346]|7[2-57-9]|9[1-9]"], "0$1"],
                    [, "(24099)(\\d{3})", "$1 $2", ["240", "2409", "24099"], "0$1"],
                    [, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["21"], "0$1"],
                    [, "(\\d{2})(\\d{3})(\\d{3,5})", "$1 $2 $3", ["2(?:1[1-9]|[69]|7[0-35-9])|70|86"], "0$1"],
                    [, "(2\\d)(\\d{3,4})(\\d{4})", "$1 $2 $3", ["2[028]"], "0$1"],
                    [, "(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2(?:10|74)|5|[89]0"], "0$1"]
                ], , [, , "[28]6\\d{6,7}", "\\d{8,9}", , , "26123456"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            OM: [, [, , "(?:2[2-6]|5|9\\d)\\d{6}|800\\d{5,6}", "\\d{7,9}"],
                [, , "2[2-6]\\d{6}", "\\d{8}", , , "23123456"],
                [, , "9(?:0[1-9]|[1-9]\\d)\\d{5}", "\\d{8}", , , "92123456"],
                [, , "8007\\d{4,5}|500\\d{4}", "\\d{7,9}", , , "80071234"],
                [, , "(?:900)\\d{5}", "\\d{8}", , , "90012345"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "OM", 968, "00", , , , , , , , [
                    [, "(2\\d)(\\d{6})", "$1 $2", ["2"]],
                    [, "(9\\d{3})(\\d{4})", "$1 $2", ["9"]],
                    [, "([58]00)(\\d{4,6})", "$1 $2", ["[58]"]]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            PA: [, [, , "[1-9]\\d{6,7}", "\\d{7,8}"],
                [, , "(?:1(?:0[0-8]|1[49]|2[37]|3[0137]|4[147]|5[05]|6[58]|7[0167]|8[58]|9[139])|2(?:[0235679]\\d|1[0-7]|4[04-9]|8[028])|3(?:[09]\\d|1[014-7]|2[0-3]|3[03]|4[03-57]|55|6[068]|7[06-8]|8[06-9])|4(?:3[013-69]|4\\d|7[0-589])|5(?:[01]\\d|2[0-7]|[56]0|79)|7(?:0[09]|2[0-267]|3[06]|[469]0|5[06-9]|7[0-24-79]|8[7-9])|8(?:09|[34]\\d|5[0134]|8[02])|9(?:0[6-9]|1[016-8]|2[036-8]|3[3679]|40|5[0489]|6[06-9]|7[046-9]|8[36-8]|9[1-9]))\\d{4}", "\\d{7}", , , "2001234"],
                [, , "(?:1[16]1|21[89]|8(?:1[01]|7[23]))\\d{4}|6(?:[024-9]\\d|1[0-5]|3[0-24-9])\\d{5}", "\\d{7,8}", , , "60012345"],
                [, , "80[09]\\d{4}", "\\d{7}", , , "8001234"],
                [, , "(?:779|8(?:55|60|7[78])|9(?:00|81))\\d{4}", "\\d{7}", , , "8601234"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "PA", 507, "00", , , , , , , , [
                    [, "(\\d{3})(\\d{4})", "$1-$2", ["[1-57-9]"]],
                    [, "(\\d{4})(\\d{4})", "$1-$2", ["6"]]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            PE: [, [, , "[14-9]\\d{7,8}", "\\d{6,9}"],
                [, , "(?:1\\d|4[1-4]|5[1-46]|6[1-7]|7[2-46]|8[2-4])\\d{6}", "\\d{6,8}", , , "11234567"],
                [, , "9\\d{8}", "\\d{9}", , , "912345678"],
                [, , "800\\d{5}", "\\d{8}", , , "80012345"],
                [, , "805\\d{5}", "\\d{8}", , , "80512345"],
                [, , "801\\d{5}", "\\d{8}", , , "80112345"],
                [, , "80[24]\\d{5}", "\\d{8}", , , "80212345"],
                [, , "NA", "NA"], "PE", 51, "19(?:1[124]|77|90)00", "0", " Anexo ", , "0", , , , [
                    [, "(1)(\\d{7})", "$1 $2", ["1"], "(0$1)"],
                    [, "([4-8]\\d)(\\d{6})", "$1 $2", ["[4-7]|8[2-4]"], "(0$1)"],
                    [, "(\\d{3})(\\d{5})", "$1 $2", ["80"], "(0$1)"],
                    [, "(9\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["9"], "$1"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            PF: [, [, , "4\\d{5,7}|8\\d{7}", "\\d{6}(?:\\d{2})?"],
                [, , "4(?:[09][45689]\\d|4)\\d{4}", "\\d{6}(?:\\d{2})?", , , "40412345"],
                [, , "8[79]\\d{6}", "\\d{8}", , , "87123456"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "PF", 689, "00", , , , , , , , [
                    [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["4[09]|8[79]"]],
                    [, "(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["44"]]
                ], , [, , "NA", "NA"], , , [, , "44\\d{4}", "\\d{6}", , , "441234"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            PG: [, [, , "[1-9]\\d{6,7}", "\\d{7,8}"],
                [, , "(?:3[0-2]\\d|4[25]\\d|5[34]\\d|64[1-9]|77(?:[0-24]\\d|30)|85[02-46-9]|9[78]\\d)\\d{4}", "\\d{7}", , , "3123456"],
                [, , "(?:20150|68\\d{2}|7(?:[0-369]\\d|75)\\d{2})\\d{3}", "\\d{7,8}", , , "6812345"],
                [, , "180\\d{4}", "\\d{7}", , , "1801234"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "275\\d{4}", "\\d{7}", , , "2751234"], "PG", 675, "00", , , , , , , , [
                    [, "(\\d{3})(\\d{4})", "$1 $2", ["[13-689]|27"]],
                    [, "(\\d{4})(\\d{4})", "$1 $2", ["20|7"]]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            PH: [, [, , "2\\d{5,7}|[3-9]\\d{7,9}|1800\\d{7,9}", "\\d{5,13}"],
                [, , "2\\d{5}(?:\\d{2})?|(?:3[2-68]|4[2-9]|5[2-6]|6[2-58]|7[24578]|8[2-8])\\d{7}|88(?:22\\d{6}|42\\d{4})", "\\d{5,10}", , , "21234567"],
                [, , "(?:81[37]|9(?:0[5-9]|1[024-9]|2[0-35-9]|3[02-9]|4[236-9]|50|7[34-79]|89|9[4-9]))\\d{7}", "\\d{10}", , , "9051234567"],
                [, , "1800\\d{7,9}", "\\d{11,13}", , , "180012345678"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "PH", 63, "00", "0", , , "0", , , , [
                    [, "(2)(\\d{3})(\\d{4})", "$1 $2 $3", ["2"], "(0$1)"],
                    [, "(2)(\\d{5})", "$1 $2", ["2"], "(0$1)"],
                    [, "(\\d{4})(\\d{4,6})", "$1 $2", ["3(?:23|39|46)|4(?:2[3-6]|[35]9|4[26]|76)|5(?:22|44)|642|8(?:62|8[245])", "3(?:230|397|461)|4(?:2(?:35|[46]4|51)|396|4(?:22|63)|59[347]|76[15])|5(?:221|446)|642[23]|8(?:622|8(?:[24]2|5[13]))"], "(0$1)"],
                    [, "(\\d{5})(\\d{4})", "$1 $2", ["346|4(?:27|9[35])|883", "3469|4(?:279|9(?:30|56))|8834"], "(0$1)"],
                    [, "([3-8]\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["[3-8]"], "(0$1)"],
                    [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["81|9"], "0$1"],
                    [, "(1800)(\\d{3})(\\d{4})", "$1 $2 $3", ["1"]],
                    [, "(1800)(\\d{1,2})(\\d{3})(\\d{4})", "$1 $2 $3 $4", ["1"]]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            PK: [, [, , "1\\d{8}|[2-8]\\d{5,11}|9(?:[013-9]\\d{4,9}|2\\d(?:111\\d{6}|\\d{3,7}))", "\\d{6,12}"],
                [, , "(?:21|42)[2-9]\\d{7}|(?:2[25]|4[0146-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)[2-9]\\d{6}|(?:2(?:3[2358]|4[2-4]|9[2-8])|45[3479]|54[2-467]|60[468]|72[236]|8(?:2[2-689]|3[23578]|4[3478]|5[2356])|9(?:1|2[2-8]|3[27-9]|4[2-6]|6[3569]|9[25-8]))[2-9]\\d{5,6}|58[126]\\d{7}", "\\d{6,10}", , , "2123456789"],
                [, , "3(?:0\\d|1[0-6]|2[0-5]|3[0-7]|4[0-8]|55|64)\\d{7}", "\\d{10}", , , "3012345678"],
                [, , "800\\d{5}", "\\d{8}", , , "80012345"],
                [, , "900\\d{5}", "\\d{8}", , , "90012345"],
                [, , "NA", "NA"],
                [, , "122\\d{6}", "\\d{9}", , , "122044444"],
                [, , "NA", "NA"], "PK", 92, "00", "0", , , "0", , , , [
                    [, "(\\d{2})(111)(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["(?:2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)1", "(?:2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)11", "(?:2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)111"], "(0$1)"],
                    [, "(\\d{3})(111)(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["2[349]|45|54|60|72|8[2-5]|9[2-9]", "(?:2[349]|45|54|60|72|8[2-5]|9[2-9])\\d1", "(?:2[349]|45|54|60|72|8[2-5]|9[2-9])\\d11", "(?:2[349]|45|54|60|72|8[2-5]|9[2-9])\\d111"], "(0$1)"],
                    [, "(\\d{2})(\\d{7,8})", "$1 $2", ["(?:2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)[2-9]"], "(0$1)"],
                    [, "(\\d{3})(\\d{6,7})", "$1 $2", ["2[349]|45|54|60|72|8[2-5]|9[2-9]", "(?:2[349]|45|54|60|72|8[2-5]|9[2-9])\\d[2-9]"], "(0$1)"],
                    [, "(3\\d{2})(\\d{7})", "$1 $2", ["3"], "0$1"],
                    [, "([15]\\d{3})(\\d{5,6})", "$1 $2", ["58[12]|1"], "(0$1)"],
                    [, "(586\\d{2})(\\d{5})", "$1 $2", ["586"], "(0$1)"],
                    [, "([89]00)(\\d{3})(\\d{2})", "$1 $2 $3", ["[89]00"], "0$1"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "(?:2(?:[125]|3[2358]|4[2-4]|9[2-8])|4(?:[0-246-9]|5[3479])|5(?:[1-35-7]|4[2-467])|6(?:[1-8]|0[468])|7(?:[14]|2[236])|8(?:[16]|2[2-689]|3[23578]|4[3478]|5[2356])|9(?:1|22|3[27-9]|4[2-6]|6[3569]|9[2-7]))111\\d{6}", "\\d{11,12}", , , "21111825888"], , , [, , "NA", "NA"]
            ],
            PL: [, [, , "[12]\\d{6,8}|[3-57-9]\\d{8}|6\\d{5,8}", "\\d{6,9}"],
                [, , "(?:1[2-8]|2[2-69]|3[2-4]|4[1-468]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145])\\d{7}|[12]2\\d{5}", "\\d{6,9}", , , "123456789"],
                [, , "(?:5[0137]|6[069]|7[2389]|88)\\d{7}", "\\d{9}", , , "512345678"],
                [, , "800\\d{6}", "\\d{9}", , , "800123456"],
                [, , "70\\d{7}", "\\d{9}", , , "701234567"],
                [, , "801\\d{6}", "\\d{9}", , , "801234567"],
                [, , "NA", "NA"],
                [, , "39\\d{7}", "\\d{9}", , , "391234567"], "PL", 48, "00", , , , , , , , [
                    [, "(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[14]|2[0-57-9]|3[2-4]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145]"]],
                    [, "(\\d{2})(\\d{1})(\\d{4})", "$1 $2 $3", ["[12]2"]],
                    [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["26|39|5[0137]|6[0469]|7[02389]|8[08]"]],
                    [, "(\\d{3})(\\d{2})(\\d{2,3})", "$1 $2 $3", ["64"]],
                    [, "(\\d{3})(\\d{3})", "$1 $2", ["64"]]
                ], , [, , "64\\d{4,7}", "\\d{6,9}", , , "641234567"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            PM: [, [, , "[45]\\d{5}", "\\d{6}"],
                [, , "41\\d{4}", "\\d{6}", , , "411234"],
                [, , "55\\d{4}", "\\d{6}", , , "551234"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "PM", 508, "00", "0", , , "0", , , , [
                    [, "([45]\\d)(\\d{2})(\\d{2})", "$1 $2 $3", , "0$1"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            PR: [, [, , "[5789]\\d{9}", "\\d{7}(?:\\d{3})?"],
                [, , "(?:787|939)[2-9]\\d{6}", "\\d{7}(?:\\d{3})?", , , "7872345678"],
                [, , "(?:787|939)[2-9]\\d{6}", "\\d{7}(?:\\d{3})?", , , "7872345678"],
                [, , "8(?:00|44|55|66|77|88)[2-9]\\d{6}", "\\d{10}", , , "8002345678"],
                [, , "900[2-9]\\d{6}", "\\d{10}", , , "9002345678"],
                [, , "NA", "NA"],
                [, , "5(?:00|33|44|66|77)[2-9]\\d{6}", "\\d{10}", , , "5002345678"],
                [, , "NA", "NA"], "PR", 1, "011", "1", , , "1", , , 1, , , [, , "NA", "NA"], , "787|939", [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            PS: [, [, , "[24589]\\d{7,8}|1(?:[78]\\d{8}|[49]\\d{2,3})", "\\d{4,10}"],
                [, , "(?:22[234789]|42[45]|82[01458]|92[369])\\d{5}", "\\d{7,8}", , , "22234567"],
                [, , "5[69]\\d{7}", "\\d{9}", , , "599123456"],
                [, , "1800\\d{6}", "\\d{10}", , , "1800123456"],
                [, , "1(?:4|9\\d)\\d{2}", "\\d{4,5}", , , "19123"],
                [, , "1700\\d{6}", "\\d{10}", , , "1700123456"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "PS", 970, "00", "0", , , "0", , , , [
                    [, "([2489])(2\\d{2})(\\d{4})", "$1 $2 $3", ["[2489]"], "0$1"],
                    [, "(5[69]\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["5"], "0$1"],
                    [, "(1[78]00)(\\d{3})(\\d{3})", "$1 $2 $3", ["1[78]"], "$1"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            PT: [, [, , "[2-46-9]\\d{8}", "\\d{9}"],
                [, , "2(?:[12]\\d|[35][1-689]|4[1-59]|6[1-35689]|7[1-9]|8[1-69]|9[1256])\\d{6}", "\\d{9}", , , "212345678"],
                [, , "9(?:[1236]\\d{2}|480)\\d{5}", "\\d{9}", , , "912345678"],
                [, , "80[02]\\d{6}", "\\d{9}", , , "800123456"],
                [, , "6(?:0[178]|4[68])\\d{6}|76(?:0[1-57]|1[2-47]|2[237])\\d{5}", "\\d{9}", , , "760123456"],
                [, , "80(?:8\\d|9[1579])\\d{5}", "\\d{9}", , , "808123456"],
                [, , "884[0-4689]\\d{5}", "\\d{9}", , , "884123456"],
                [, , "30\\d{7}", "\\d{9}", , , "301234567"], "PT", 351, "00", , , , , , , , [
                    [, "(2\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["2[12]"]],
                    [, "([2-46-9]\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["2[3-9]|[346-9]"]]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "7(?:0(?:7\\d|8[17]))\\d{5}", "\\d{9}", , , "707123456"], , , [, , "600\\d{6}", "\\d{9}", , , "600110000"]
            ],
            PW: [, [, , "[2-8]\\d{6}", "\\d{7}"],
                [, , "2552255|(?:277|345|488|5(?:35|44|87)|6(?:22|54|79)|7(?:33|47)|8(?:24|55|76))\\d{4}", "\\d{7}", , , "2771234"],
                [, , "(?:6[234689]0|77[45789])\\d{4}", "\\d{7}", , , "6201234"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "PW", 680, "01[12]", , , , , , , , [
                    [, "(\\d{3})(\\d{4})", "$1 $2"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            PY: [, [, , "5[0-5]\\d{4,7}|[2-46-9]\\d{5,8}", "\\d{5,9}"],
                [, , "(?:[26]1|3[289]|4[124678]|7[123]|8[1236])\\d{5,7}|(?:2(?:2[4568]|7[15]|9[1-5])|3(?:18|3[167]|4[2357]|51)|4(?:18|2[45]|3[12]|5[13]|64|71|9[1-47])|5(?:[1-4]\\d|5[0234])|6(?:3[1-3]|44|7[1-4678])|7(?:17|4[0-4]|6[1-578]|75|8[0-8])|858)\\d{5,6}", "\\d{5,9}", , , "212345678"],
                [, , "9(?:6[12]|[78][1-6]|9[1-5])\\d{6}", "\\d{9}", , , "961456789"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "8700[0-4]\\d{4}", "\\d{9}", , , "870012345"], "PY", 595, "00", "0", , , "0", , , , [
                    [, "(\\d{2})(\\d{5,7})", "$1 $2", ["(?:[26]1|3[289]|4[124678]|7[123]|8[1236])"], "($1)"],
                    [, "(\\d{3})(\\d{3,6})", "$1 $2", ["[2-9]0"], "0$1"],
                    [, "(\\d{3})(\\d{6})", "$1 $2", ["9[1-9]"], "0$1"],
                    [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["8700"]],
                    [, "(\\d{3})(\\d{4,6})", "$1 $2", ["[2-8][1-9]"], "($1)"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "[2-9]0\\d{4,7}", "\\d{6,9}", , , "201234567"], , , [, , "NA", "NA"]
            ],
            QA: [, [, , "[2-8]\\d{6,7}", "\\d{7,8}"],
                [, , "4[04]\\d{6}", "\\d{7,8}", , , "44123456"],
                [, , "[3567]\\d{7}", "\\d{7,8}", , , "33123456"],
                [, , "800\\d{4}", "\\d{7,8}", , , "8001234"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "QA", 974, "00", , , , , , , , [
                    [, "([28]\\d{2})(\\d{4})", "$1 $2", ["[28]"]],
                    [, "([3-7]\\d{3})(\\d{4})", "$1 $2", ["[3-7]"]]
                ], , [, , "2(?:[12]\\d|61)\\d{4}", "\\d{7}", , , "2123456"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            RE: [, [, , "[268]\\d{8}", "\\d{9}"],
                [, , "262\\d{6}", "\\d{9}", , , "262161234"],
                [, , "6(?:9[23]|47)\\d{6}", "\\d{9}", , , "692123456"],
                [, , "80\\d{7}", "\\d{9}", , , "801234567"],
                [, , "89[1-37-9]\\d{6}", "\\d{9}", , , "891123456"],
                [, , "8(?:1[019]|2[0156]|84|90)\\d{6}", "\\d{9}", , , "810123456"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "RE", 262, "00", "0", , , "0", , , , [
                    [, "([268]\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", , "0$1"]
                ], , [, , "NA", "NA"], 1, "262|6[49]|8", [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            RO: [, [, , "2\\d{5,8}|[37-9]\\d{8}", "\\d{6,9}"],
                [, , "2(?:1(?:\\d{7}|9\\d{3})|[3-6](?:\\d{7}|\\d9\\d{2}))|3[13-6]\\d{7}", "\\d{6,9}", , , "211234567"],
                [, , "7(?:[0-8]\\d{2}|99\\d)\\d{5}", "\\d{9}", , , "712345678"],
                [, , "800\\d{6}", "\\d{9}", , , "800123456"],
                [, , "90[036]\\d{6}", "\\d{9}", , , "900123456"],
                [, , "801\\d{6}", "\\d{9}", , , "801123456"],
                [, , "802\\d{6}", "\\d{9}", , , "802123456"],
                [, , "NA", "NA"], "RO", 40, "00", "0", " int ", , "0", , , , [
                    [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[23]1"], "0$1"],
                    [, "(21)(\\d{4})", "$1 $2", ["21"], "0$1"],
                    [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[23][3-7]|[7-9]"], "0$1"],
                    [, "(2\\d{2})(\\d{3})", "$1 $2", ["2[3-6]"], "0$1"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "37\\d{7}", "\\d{9}", , , "372123456"], , , [, , "NA", "NA"]
            ],
            RS: [, [, , "[126-9]\\d{4,11}|3(?:[0-79]\\d{3,10}|8[2-9]\\d{2,9})", "\\d{5,12}"],
                [, , "(?:1(?:[02-9][2-9]|1[1-9])\\d|2(?:[0-24-7][2-9]\\d|[389](?:0[2-9]|[2-9]\\d))|3(?:[0-8][2-9]\\d|9(?:[2-9]\\d|0[2-9])))\\d{3,8}", "\\d{5,12}", , , "10234567"],
                [, , "6(?:[0-689]|7\\d)\\d{6,7}", "\\d{8,10}", , , "601234567"],
                [, , "800\\d{3,9}", "\\d{6,12}", , , "80012345"],
                [, , "(?:90[0169]|78\\d)\\d{3,7}", "\\d{6,12}", , , "90012345"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "RS", 381, "00", "0", , , "0", , , , [
                    [, "([23]\\d{2})(\\d{4,9})", "$1 $2", ["(?:2[389]|39)0"], "0$1"],
                    [, "([1-3]\\d)(\\d{5,10})", "$1 $2", ["1|2(?:[0-24-7]|[389][1-9])|3(?:[0-8]|9[1-9])"], "0$1"],
                    [, "(6\\d)(\\d{6,8})", "$1 $2", ["6"], "0$1"],
                    [, "([89]\\d{2})(\\d{3,9})", "$1 $2", ["[89]"], "0$1"],
                    [, "(7[26])(\\d{4,9})", "$1 $2", ["7[26]"], "0$1"],
                    [, "(7[08]\\d)(\\d{4,9})", "$1 $2", ["7[08]"], "0$1"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "7[06]\\d{4,10}", "\\d{6,12}", , , "700123456"], , , [, , "NA", "NA"]
            ],
            RU: [, [, , "[3489]\\d{9}", "\\d{10}"],
                [, , "(?:3(?:0[12]|4[1-35-79]|5[1-3]|65|8[1-58]|9[0145])|4(?:01|1[1356]|2[13467]|7[1-5]|8[1-7]|9[1-689])|8(?:1[1-8]|2[01]|3[13-6]|4[0-8]|5[15]|6[1-35-79]|7[1-37-9]))\\d{7}", "\\d{10}", , , "3011234567"],
                [, , "9\\d{9}", "\\d{10}", , , "9123456789"],
                [, , "80[04]\\d{7}", "\\d{10}", , , "8001234567"],
                [, , "80[39]\\d{7}", "\\d{10}", , , "8091234567"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "RU", 7, "810", "8", , , "8", , "8~10", , [
                    [, "(\\d{3})(\\d{2})(\\d{2})", "$1-$2-$3", ["[1-79]"], "$1", , 1],
                    [, "([3489]\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["[34689]"], "8 ($1)", , 1],
                    [, "(7\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["7"], "8 ($1)", , 1]
                ],
                [
                    [, "([3489]\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["[34689]"], "8 ($1)", , 1],
                    [, "(7\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["7"], "8 ($1)", , 1]
                ],
                [, , "NA", "NA"], 1, , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            RW: [, [, , "[027-9]\\d{7,8}", "\\d{8,9}"],
                [, , "2[258]\\d{7}|06\\d{6}", "\\d{8,9}", , , "250123456"],
                [, , "7[238]\\d{7}", "\\d{9}", , , "720123456"],
                [, , "800\\d{6}", "\\d{9}", , , "800123456"],
                [, , "900\\d{6}", "\\d{9}", , , "900123456"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "RW", 250, "00", "0", , , "0", , , , [
                    [, "(2\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["2"], "$1"],
                    [, "([7-9]\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[7-9]"], "0$1"],
                    [, "(0\\d)(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["0"]]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], 1, , [, , "NA", "NA"]
            ],
            SA: [, [, , "1\\d{7,8}|(?:[2-467]|92)\\d{7}|5\\d{8}|8\\d{9}", "\\d{7,10}"],
                [, , "11\\d{7}|1?(?:2[24-8]|3[35-8]|4[3-68]|6[2-5]|7[235-7])\\d{6}", "\\d{7,9}", , , "112345678"],
                [, , "(?:5(?:[013-689]\\d|7[0-26-8])|811\\d)\\d{6}", "\\d{9,10}", , , "512345678"],
                [, , "800\\d{7}", "\\d{10}", , , "8001234567"],
                [, , "NA", "NA"],
                [, , "92[05]\\d{6}", "\\d{9}", , , "920012345"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "SA", 966, "00", "0", , , "0", , , , [
                    [, "([1-467])(\\d{3})(\\d{4})", "$1 $2 $3", ["[1-467]"], "0$1"],
                    [, "(1\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["1[1-467]"], "0$1"],
                    [, "(5\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["5"], "0$1"],
                    [, "(92\\d{2})(\\d{5})", "$1 $2", ["92"], "$1"],
                    [, "(800)(\\d{3})(\\d{4})", "$1 $2 $3", ["80"], "$1"],
                    [, "(811)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["81"], "0$1"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            SB: [, [, , "[1-9]\\d{4,6}", "\\d{5,7}"],
                [, , "(?:1[4-79]|[23]\\d|4[0-2]|5[03]|6[0-37])\\d{3}", "\\d{5}", , , "40123"],
                [, , "48\\d{3}|7(?:30|[46-8]\\d|5[025-9]|9[0-5])\\d{4}|8[4-8]\\d{5}|9(?:1[2-9]|2[013-9]|3[0-2]|[46]\\d|5[0-46-9]|7[0-689]|8[0-79]|9[0-8])\\d{4}", "\\d{5,7}", , , "7421234"],
                [, , "1[38]\\d{3}", "\\d{5}", , , "18123"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "5[12]\\d{3}", "\\d{5}", , , "51123"], "SB", 677, "0[01]", , , , , , , , [
                    [, "(\\d{2})(\\d{5})", "$1 $2", ["[7-9]"]]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            SC: [, [, , "[2468]\\d{5,6}", "\\d{6,7}"],
                [, , "4[2-46]\\d{5}", "\\d{7}", , , "4217123"],
                [, , "2[5-8]\\d{5}", "\\d{7}", , , "2510123"],
                [, , "8000\\d{2}", "\\d{6}", , , "800000"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "64\\d{5}", "\\d{7}", , , "6412345"], "SC", 248, "0[0-2]", , , , , , "00", , [
                    [, "(\\d{3})(\\d{3})", "$1 $2", ["8"]],
                    [, "(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[246]"]]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            SD: [, [, , "[19]\\d{8}", "\\d{9}"],
                [, , "1(?:[125]\\d|8[3567])\\d{6}", "\\d{9}", , , "121231234"],
                [, , "9[0-3569]\\d{7}", "\\d{9}", , , "911231234"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "SD", 249, "00", "0", , , "0", , , , [
                    [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", , "0$1"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            SE: [, [, , "[1-9]\\d{5,9}", "\\d{5,10}"],
                [, , "1(?:0[1-8]\\d{6}|[136]\\d{5,7}|(?:2[0-35]|4[0-4]|5[0-25-9]|7[13-6]|[89]\\d)\\d{5,6})|2(?:[136]\\d{5,7}|(?:2[0-7]|4[0136-8]|5[0138]|7[018]|8[01]|9[0-57])\\d{5,6})|3(?:[356]\\d{5,7}|(?:0[0-4]|1\\d|2[0-25]|4[056]|7[0-2]|8[0-3]|9[023])\\d{5,6})|4(?:0[1-9]\\d{4,6}|[246]\\d{5,7}|(?:1[013-8]|3[0135]|5[14-79]|7[0-246-9]|8[0156]|9[0-689])\\d{5,6})|5(?:0[0-6]|[15][0-5]|2[0-68]|3[0-4]|4\\d|6[03-5]|7[013]|8[0-79]|9[01])\\d{5,6}|6(?:0[1-9]\\d{4,6}|3\\d{5,7}|(?:1[1-3]|2[0-4]|4[02-57]|5[0-37]|6[0-3]|7[0-2]|8[0247]|9[0-356])\\d{5,6})|8[1-9]\\d{5,7}|9(?:0[1-9]\\d{4,6}|(?:1[0-68]|2\\d|3[02-5]|4[0-3]|5[0-4]|[68][01]|7[0135-8])\\d{5,6})", "\\d{5,9}", , , "8123456"],
                [, , "7[02369]\\d{7}", "\\d{9}", , , "701234567"],
                [, , "20(?:0(?:0\\d{2}|[1-9](?:0\\d{1,4}|[1-9]\\d{4}))|1(?:0\\d{4}|[1-9]\\d{4,5})|[2-9]\\d{5})", "\\d{6,9}", , , "20123456"],
                [, , "9(?:00|39|44)(?:1(?:[0-26]\\d{5}|[3-57-9]\\d{2})|2(?:[0-2]\\d{5}|[3-9]\\d{2})|3(?:[0139]\\d{5}|[24-8]\\d{2})|4(?:[045]\\d{5}|[1-36-9]\\d{2})|5(?:5\\d{5}|[0-46-9]\\d{2})|6(?:[679]\\d{5}|[0-58]\\d{2})|7(?:[078]\\d{5}|[1-69]\\d{2})|8(?:[578]\\d{5}|[0-469]\\d{2}))", "\\d{7}(?:\\d{3})?", , , "9001234567"],
                [, , "77(?:0(?:0\\d{2}|[1-9](?:0\\d|[1-9]\\d{4}))|[1-6][1-9]\\d{5})", "\\d{6}(?:\\d{3})?", , , "771234567"],
                [, , "75[1-8]\\d{6}", "\\d{9}", , , "751234567"],
                [, , "NA", "NA"], "SE", 46, "00", "0", , , "0", , , , [
                    [, "(8)(\\d{2,3})(\\d{2,3})(\\d{2})", "$1-$2 $3 $4", ["8"], "0$1"],
                    [, "([1-69]\\d)(\\d{2,3})(\\d{2})(\\d{2})", "$1-$2 $3 $4", ["1[013689]|2[0136]|3[1356]|4[0246]|54|6[03]|90"], "0$1"],
                    [, "([1-69]\\d)(\\d{3})(\\d{2})", "$1-$2 $3", ["1[13689]|2[136]|3[1356]|4[0246]|54|6[03]|90"], "0$1"],
                    [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1-$2 $3 $4", ["1[2457]|2[2457-9]|3[0247-9]|4[1357-9]|5[0-35-9]|6[124-9]|9(?:[125-8]|3[0-5]|4[0-3])"], "0$1"],
                    [, "(\\d{3})(\\d{2,3})(\\d{2})", "$1-$2 $3", ["1[2457]|2[2457-9]|3[0247-9]|4[1357-9]|5[0-35-9]|6[124-9]|9(?:[125-8]|3[0-5]|4[0-3])"], "0$1"],
                    [, "(7\\d)(\\d{3})(\\d{2})(\\d{2})", "$1-$2 $3 $4", ["7"], "0$1"],
                    [, "(77)(\\d{2})(\\d{2})", "$1-$2$3", ["7"], "0$1"],
                    [, "(20)(\\d{2,3})(\\d{2})", "$1-$2 $3", ["20"], "0$1"],
                    [, "(9[034]\\d)(\\d{2})(\\d{2})(\\d{3})", "$1-$2 $3 $4", ["9[034]"], "0$1"],
                    [, "(9[034]\\d)(\\d{4})", "$1-$2", ["9[034]"], "0$1"]
                ],
                [
                    [, "(8)(\\d{2,3})(\\d{2,3})(\\d{2})", "$1 $2 $3 $4", ["8"]],
                    [, "([1-69]\\d)(\\d{2,3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["1[013689]|2[0136]|3[1356]|4[0246]|54|6[03]|90"]],
                    [, "([1-69]\\d)(\\d{3})(\\d{2})", "$1 $2 $3", ["1[13689]|2[136]|3[1356]|4[0246]|54|6[03]|90"]],
                    [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["1[2457]|2[2457-9]|3[0247-9]|4[1357-9]|5[0-35-9]|6[124-9]|9(?:[125-8]|3[0-5]|4[0-3])"]],
                    [, "(\\d{3})(\\d{2,3})(\\d{2})", "$1 $2 $3", ["1[2457]|2[2457-9]|3[0247-9]|4[1357-9]|5[0-35-9]|6[124-9]|9(?:[125-8]|3[0-5]|4[0-3])"]],
                    [, "(7\\d)(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["7"]],
                    [, "(77)(\\d{2})(\\d{2})", "$1 $2 $3", ["7"]],
                    [, "(20)(\\d{2,3})(\\d{2})", "$1 $2 $3", ["20"]],
                    [, "(9[034]\\d)(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["9[034]"]],
                    [, "(9[034]\\d)(\\d{4})", "$1 $2", ["9[034]"]]
                ],
                [, , "74[02-9]\\d{6}", "\\d{9}", , , "740123456"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            SG: [, [, , "[36]\\d{7}|[17-9]\\d{7,10}", "\\d{8,11}"],
                [, , "6[1-9]\\d{6}", "\\d{8}", , , "61234567"],
                [, , "(?:8[1-8]|9[0-8])\\d{6}", "\\d{8}", , , "81234567"],
                [, , "1?800\\d{7}", "\\d{10,11}", , , "18001234567"],
                [, , "1900\\d{7}", "\\d{11}", , , "19001234567"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "3[12]\\d{6}", "\\d{8}", , , "31234567"], "SG", 65, "0[0-3]\\d", , , , , , , , [
                    [, "([3689]\\d{3})(\\d{4})", "$1 $2", ["[369]|8[1-9]"]],
                    [, "(1[89]00)(\\d{3})(\\d{4})", "$1 $2 $3", ["1[89]"]],
                    [, "(7000)(\\d{4})(\\d{3})", "$1 $2 $3", ["70"]],
                    [, "(800)(\\d{3})(\\d{4})", "$1 $2 $3", ["80"]]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "7000\\d{7}", "\\d{11}", , , "70001234567"], , , [, , "NA", "NA"]
            ],
            SH: [, [, , "[256]\\d{4}", "\\d{4,5}"],
                [, , "2(?:[0-57-9]\\d|6[4-9])\\d{2}", "\\d{5}", , , "22158"],
                [, , "[56]\\d{4}", "\\d{5}"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "262\\d{2}", "\\d{5}"], "SH", 290, "00", , , , , , , , , , [, , "NA", "NA"], 1, , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            SI: [, [, , "[1-7]\\d{6,7}|[89]\\d{4,7}", "\\d{5,8}"],
                [, , "(?:1\\d|[25][2-8]|3[4-8]|4[24-8]|7[3-8])\\d{6}", "\\d{7,8}", , , "11234567"],
                [, , "(?:[37][01]|4[0139]|51|6[48])\\d{6}", "\\d{8}", , , "31234567"],
                [, , "80\\d{4,6}", "\\d{6,8}", , , "80123456"],
                [, , "90\\d{4,6}|89[1-3]\\d{2,5}", "\\d{5,8}", , , "90123456"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "(?:59|8[1-3])\\d{6}", "\\d{8}", , , "59012345"], "SI", 386, "00", "0", , , "0", , , , [
                    [, "(\\d)(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[12]|3[4-8]|4[24-8]|5[2-8]|7[3-8]"], "(0$1)"],
                    [, "([3-7]\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[37][01]|4[0139]|51|6"], "0$1"],
                    [, "([89][09])(\\d{3,6})", "$1 $2", ["[89][09]"], "0$1"],
                    [, "([58]\\d{2})(\\d{5})", "$1 $2", ["59|8[1-3]"], "0$1"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            SJ: [, [, , "0\\d{4}|[4789]\\d{7}", "\\d{5}(?:\\d{3})?"],
                [, , "79\\d{6}", "\\d{8}", , , "79123456"],
                [, , "(?:4[015-8]|5[89]|9\\d)\\d{6}", "\\d{8}", , , "41234567"],
                [, , "80[01]\\d{5}", "\\d{8}", , , "80012345"],
                [, , "82[09]\\d{5}", "\\d{8}", , , "82012345"],
                [, , "810(?:0[0-6]|[2-8]\\d)\\d{3}", "\\d{8}", , , "81021234"],
                [, , "880\\d{5}", "\\d{8}", , , "88012345"],
                [, , "85[0-5]\\d{5}", "\\d{8}", , , "85012345"], "SJ", 47, "00", , , , , , , , , , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "0\\d{4}|81(?:0(?:0[7-9]|1\\d)|5\\d{2})\\d{3}", "\\d{5}(?:\\d{3})?", , , "01234"], 1, , [, , "81[23]\\d{5}", "\\d{8}", , , "81212345"]
            ],
            SK: [, [, , "(?:[2-68]\\d{8}|9\\d{6,8})", "\\d{7,9}"],
                [, , "[2-5]\\d{8}", "\\d{9}", , , "212345678"],
                [, , "9(?:0[1-8]|1[0-24-9]|4[0489]|50)\\d{6}", "\\d{9}", , , "912123456"],
                [, , "800\\d{6}", "\\d{9}", , , "800123456"],
                [, , "9(?:[78]\\d{7}|00\\d{6})", "\\d{9}", , , "900123456"],
                [, , "8[5-9]\\d{7}", "\\d{9}", , , "850123456"],
                [, , "NA", "NA"],
                [, , "6(?:02|5[0-4]|9[0-6])\\d{6}", "\\d{9}", , , "690123456"], "SK", 421, "00", "0", , , "0", , , , [
                    [, "(2)(\\d{3})(\\d{3})(\\d{2})", "$1/$2 $3 $4", ["2"], "0$1"],
                    [, "([3-5]\\d)(\\d{3})(\\d{2})(\\d{2})", "$1/$2 $3 $4", ["[3-5]"], "0$1"],
                    [, "([689]\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[689]"], "0$1"],
                    [, "(9090)(\\d{3})", "$1 $2", ["9090"], "0$1"]
                ], , [, , "9090\\d{3}", "\\d{7}", , , "9090123"], , , [, , "(?:602|8(?:00|[5-9]\\d)|9(?:00|[78]\\d))\\d{6}|9090\\d{3}", "\\d{7,9}", , , "800123456"],
                [, , "96\\d{7}", "\\d{9}", , , "961234567"], , , [, , "NA", "NA"]
            ],
            SL: [, [, , "[2-9]\\d{7}", "\\d{6,8}"],
                [, , "[235]2[2-4][2-9]\\d{4}", "\\d{6,8}", , , "22221234"],
                [, , "(?:2[15]|3[03-5]|4[04]|5[05]|66|7[6-9]|88|99)\\d{6}", "\\d{6,8}", , , "25123456"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "SL", 232, "00", "0", , , "0", , , , [
                    [, "(\\d{2})(\\d{6})", "$1 $2", , "(0$1)"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            SM: [, [, , "[05-7]\\d{7,9}", "\\d{6,10}"],
                [, , "0549(?:8[0157-9]|9\\d)\\d{4}", "\\d{6,10}", , , "0549886377"],
                [, , "6[16]\\d{6}", "\\d{8}", , , "66661212"],
                [, , "NA", "NA"],
                [, , "7[178]\\d{6}", "\\d{8}", , , "71123456"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "5[158]\\d{6}", "\\d{8}", , , "58001110"], "SM", 378, "00", , , , "(?:0549)?([89]\\d{5})", "0549$1", , , [
                    [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[5-7]"]],
                    [, "(0549)(\\d{6})", "$1 $2", ["0"]],
                    [, "(\\d{6})", "0549 $1", ["[89]"]]
                ],
                [
                    [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[5-7]"]],
                    [, "(0549)(\\d{6})", "($1) $2", ["0"]],
                    [, "(\\d{6})", "(0549) $1", ["[89]"]]
                ],
                [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], 1, , [, , "NA", "NA"]
            ],
            SN: [, [, , "[3789]\\d{8}", "\\d{9}"],
                [, , "3(?:0(?:1[0-2]|80)|282|3(?:8[1-9]|9[3-9])|611|90[1-5])\\d{5}", "\\d{9}", , , "301012345"],
                [, , "7(?:[067]\\d|21|8[0-26]|90)\\d{6}", "\\d{9}", , , "701234567"],
                [, , "800\\d{6}", "\\d{9}", , , "800123456"],
                [, , "88[4689]\\d{6}", "\\d{9}", , , "884123456"],
                [, , "81[02468]\\d{6}", "\\d{9}", , , "810123456"],
                [, , "NA", "NA"],
                [, , "3392\\d{5}|93330\\d{4}", "\\d{9}", , , "933301234"], "SN", 221, "00", , , , , , , , [
                    [, "(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[379]"]],
                    [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"]]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            SO: [, [, , "[1-79]\\d{6,8}", "\\d{7,9}"],
                [, , "(?:1\\d|2[0-79]|3[0-46-8]|4[0-7]|59)\\d{5}", "\\d{7}", , , "4012345"],
                [, , "(?:15\\d|2(?:4\\d|8)|6[1-35-9]?\\d{2}|7(?:[1-8]\\d|99?\\d)|9(?:07|[2-9])\\d)\\d{5}", "\\d{7,9}", , , "71123456"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "SO", 252, "00", "0", , , "0", , , , [
                    [, "(\\d)(\\d{6})", "$1 $2", ["2[0-79]|[13-5]"]],
                    [, "(\\d)(\\d{7})", "$1 $2", ["24|[67]"]],
                    [, "(\\d{2})(\\d{5,7})", "$1 $2", ["15|28|6[1-35-9]|799|9[2-9]"]],
                    [, "(90\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["90"]]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            SR: [, [, , "[2-8]\\d{5,6}", "\\d{6,7}"],
                [, , "(?:2[1-3]|3[0-7]|4\\d|5[2-58]|68\\d)\\d{4}", "\\d{6,7}", , , "211234"],
                [, , "(?:7[124-7]|8[1-9])\\d{5}", "\\d{7}", , , "7412345"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "5(?:6\\d{4}|90[0-4]\\d{3})", "\\d{6,7}", , , "561234"], "SR", 597, "00", , , , , , , , [
                    [, "(\\d{3})(\\d{3})", "$1-$2", ["[2-4]|5[2-58]"]],
                    [, "(\\d{2})(\\d{2})(\\d{2})", "$1-$2-$3", ["56"]],
                    [, "(\\d{3})(\\d{4})", "$1-$2", ["59|[6-8]"]]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            SS: [, [, , "[19]\\d{8}", "\\d{9}"],
                [, , "18\\d{7}", "\\d{9}", , , "181234567"],
                [, , "(?:12|9[1257])\\d{7}", "\\d{9}", , , "977123456"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "SS", 211, "00", "0", , , "0", , , , [
                    [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", , "0$1"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            ST: [, [, , "[29]\\d{6}", "\\d{7}"],
                [, , "22\\d{5}", "\\d{7}", , , "2221234"],
                [, , "9(?:0(?:0[5-9]|[1-9]\\d)|[89]\\d{2})\\d{3}", "\\d{7}", , , "9812345"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "ST", 239, "00", , , , , , , , [
                    [, "(\\d{3})(\\d{4})", "$1 $2"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            SV: [, [, , "[267]\\d{7}|[89]\\d{6}(?:\\d{4})?", "\\d{7,8}|\\d{11}"],
                [, , "2[1-6]\\d{6}", "\\d{8}", , , "21234567"],
                [, , "[67]\\d{7}", "\\d{8}", , , "70123456"],
                [, , "800\\d{4}(?:\\d{4})?", "\\d{7}(?:\\d{4})?", , , "8001234"],
                [, , "900\\d{4}(?:\\d{4})?", "\\d{7}(?:\\d{4})?", , , "9001234"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "SV", 503, "00", , , , , , , , [
                    [, "(\\d{4})(\\d{4})", "$1 $2", ["[267]"]],
                    [, "(\\d{3})(\\d{4})", "$1 $2", ["[89]"]],
                    [, "(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["[89]"]]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            SX: [, [, , "[5789]\\d{9}", "\\d{7}(?:\\d{3})?"],
                [, , "7215(?:4[2-8]|8[239]|9[056])\\d{4}", "\\d{7}(?:\\d{3})?", , , "7215425678"],
                [, , "7215(?:1[02]|2\\d|5[034679]|8[014-8])\\d{4}", "\\d{10}", , , "7215205678"],
                [, , "8(?:00|44|55|66|77|88)[2-9]\\d{6}", "\\d{10}", , , "8002123456"],
                [, , "900[2-9]\\d{6}", "\\d{10}", , , "9002123456"],
                [, , "NA", "NA"],
                [, , "5(?:00|33|44|66|77)[2-9]\\d{6}", "\\d{10}", , , "5002345678"],
                [, , "NA", "NA"], "SX", 1, "011", "1", , , "1", , , , , , [, , "NA", "NA"], , "721", [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            SY: [, [, , "[1-59]\\d{7,8}", "\\d{6,9}"],
                [, , "(?:1(?:1\\d?|4\\d|[2356])|2(?:1\\d?|[235])|3(?:[13]\\d|4)|4[13]|5[1-3])\\d{6}", "\\d{6,9}", , , "112345678"],
                [, , "9(?:22|[35][0-8]|4\\d|6[024-9]|88|9[0-489])\\d{6}", "\\d{9}", , , "944567890"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "SY", 963, "00", "0", , , "0", , , , [
                    [, "(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[1-5]"], "0$1", , 1],
                    [, "(9\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["9"], "0$1", , 1]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            SZ: [, [, , "[027]\\d{7}", "\\d{8}"],
                [, , "2[2-5]\\d{6}", "\\d{8}", , , "22171234"],
                [, , "7[6-8]\\d{6}", "\\d{8}", , , "76123456"],
                [, , "0800\\d{4}", "\\d{8}", , , "08001234"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "SZ", 268, "00", , , , , , , , [
                    [, "(\\d{4})(\\d{4})", "$1 $2", ["[027]"]]
                ], , [, , "NA", "NA"], , , [, , "0800\\d{4}", "\\d{8}", , , "08001234"],
                [, , "NA", "NA"], 1, , [, , "NA", "NA"]
            ],
            TA: [, [, , "8\\d{3}", "\\d{4}"],
                [, , "8\\d{3}", "\\d{4}", , , "8999"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "TA", 290, "00", , , , , , , , , , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            TC: [, [, , "[5689]\\d{9}", "\\d{7}(?:\\d{3})?"],
                [, , "649(?:712|9(?:4\\d|50))\\d{4}", "\\d{7}(?:\\d{3})?", , , "6497121234"],
                [, , "649(?:2(?:3[129]|4[1-7])|3(?:3[1-389]|4[1-7])|4[34][1-3])\\d{4}", "\\d{10}", , , "6492311234"],
                [, , "8(?:00|44|55|66|77|88)[2-9]\\d{6}", "\\d{10}", , , "8002345678"],
                [, , "900[2-9]\\d{6}", "\\d{10}", , , "9002345678"],
                [, , "NA", "NA"],
                [, , "5(?:00|33|44|66|77)[2-9]\\d{6}", "\\d{10}", , , "5002345678"],
                [, , "64971[01]\\d{4}", "\\d{10}", , , "6497101234"], "TC", 1, "011", "1", , , "1", , , , , , [, , "NA", "NA"], , "649", [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            TD: [, [, , "[2679]\\d{7}", "\\d{8}"],
                [, , "22(?:[3789]0|5[0-5]|6[89])\\d{4}", "\\d{8}", , , "22501234"],
                [, , "(?:6[02368]\\d|77\\d|9\\d{2})\\d{5}", "\\d{8}", , , "63012345"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "TD", 235, "00|16", , , , , , "00", , [
                    [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            TG: [, [, , "[29]\\d{7}", "\\d{8}"],
                [, , "2(?:2[2-7]|3[23]|44|55|66|77)\\d{5}", "\\d{8}", , , "22212345"],
                [, , "9[0-389]\\d{6}", "\\d{8}", , , "90112345"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "TG", 228, "00", , , , , , , , [
                    [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            TH: [, [, , "[2-9]\\d{7,8}|1\\d{3}(?:\\d{5,6})?", "\\d{4}|\\d{8,10}"],
                [, , "(?:2\\d|3[2-9]|4[2-5]|5[2-6]|7[3-7])\\d{6}", "\\d{8}", , , "21234567"],
                [, , "(?:14|6[1-3]|[89]\\d)\\d{7}", "\\d{9}", , , "812345678"],
                [, , "1800\\d{6}", "\\d{10}", , , "1800123456"],
                [, , "1900\\d{6}", "\\d{10}", , , "1900123456"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "6[08]\\d{7}", "\\d{9}", , , "601234567"], "TH", 66, "00", "0", , , "0", , , , [
                    [, "(2)(\\d{3})(\\d{4})", "$1 $2 $3", ["2"], "0$1"],
                    [, "([13-9]\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["14|[3-9]"], "0$1"],
                    [, "(1[89]00)(\\d{3})(\\d{3})", "$1 $2 $3", ["1"], "$1"]
                ], , [, , "NA", "NA"], , , [, , "1\\d{3}", "\\d{4}", , , "1100"],
                [, , "1\\d{3}", "\\d{4}", , , "1100"], , , [, , "NA", "NA"]
            ],
            TJ: [, [, , "[3-59]\\d{8}", "\\d{3,9}"],
                [, , "(?:3(?:1[3-5]|2[245]|3[12]|4[24-7]|5[25]|72)|4(?:46|74|87))\\d{6}", "\\d{3,9}", , , "372123456"],
                [, , "(?:50[125]|9[0-35-9]\\d)\\d{6}", "\\d{9}", , , "917123456"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "TJ", 992, "810", "8", , , "8", , "8~10", , [
                    [, "([349]\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3", ["[34]7|91[78]"], "(8) $1", , 1],
                    [, "([459]\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["4[48]|5|9(?:1[59]|[0235-9])"], "(8) $1", , 1],
                    [, "(331700)(\\d)(\\d{2})", "$1 $2 $3", ["331", "3317", "33170", "331700"], "(8) $1", , 1],
                    [, "(\\d{4})(\\d)(\\d{4})", "$1 $2 $3", ["3[1-5]", "3(?:[1245]|3(?:[02-9]|1[0-589]))"], "(8) $1", , 1]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            TK: [, [, , "[2-9]\\d{3}", "\\d{4}"],
                [, , "[2-4]\\d{3}", "\\d{4}", , , "3010"],
                [, , "[5-9]\\d{3}", "\\d{4}", , , "5190"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "TK", 690, "00", , , , , , , , , , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            TL: [, [, , "[2-489]\\d{6}|7\\d{6,7}", "\\d{7,8}"],
                [, , "(?:2[1-5]|3[1-9]|4[1-4])\\d{5}", "\\d{7}", , , "2112345"],
                [, , "7[3-8]\\d{6}", "\\d{8}", , , "77212345"],
                [, , "80\\d{5}", "\\d{7}", , , "8012345"],
                [, , "90\\d{5}", "\\d{7}", , , "9012345"],
                [, , "NA", "NA"],
                [, , "70\\d{5}", "\\d{7}", , , "7012345"],
                [, , "NA", "NA"], "TL", 670, "00", , , , , , , , [
                    [, "(\\d{3})(\\d{4})", "$1 $2", ["[2-489]"]],
                    [, "(\\d{4})(\\d{4})", "$1 $2", ["7"]]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            TM: [, [, , "[1-6]\\d{7}", "\\d{8}"],
                [, , "(?:1(?:2\\d|3[1-9])|2(?:22|4[0-35-8])|3(?:22|4[03-9])|4(?:22|3[128]|4\\d|6[15])|5(?:22|5[7-9]|6[014-689]))\\d{5}", "\\d{8}", , , "12345678"],
                [, , "6[2-9]\\d{6}", "\\d{8}", , , "66123456"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "TM", 993, "810", "8", , , "8", , "8~10", , [
                    [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["12"], "(8 $1)"],
                    [, "(\\d{2})(\\d{6})", "$1 $2", ["6"], "8 $1"],
                    [, "(\\d{3})(\\d)(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["13|[2-5]"], "(8 $1)"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            TN: [, [, , "[2-57-9]\\d{7}", "\\d{8}"],
                [, , "3(?:[012]\\d|6[0-4]|91)\\d{5}|7\\d{7}|81200\\d{3}", "\\d{8}", , , "71234567"],
                [, , "(?:[259]\\d|4[0-6])\\d{6}", "\\d{8}", , , "20123456"],
                [, , "8010\\d{4}", "\\d{8}", , , "80101234"],
                [, , "88\\d{6}", "\\d{8}", , , "88123456"],
                [, , "8[12]10\\d{4}", "\\d{8}", , , "81101234"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "TN", 216, "00", , , , , , , , [
                    [, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            TO: [, [, , "[02-8]\\d{4,6}", "\\d{5,7}"],
                [, , "(?:2\\d|3[1-8]|4[1-4]|[56]0|7[0149]|8[05])\\d{3}", "\\d{5}", , , "20123"],
                [, , "(?:7[578]|8[47-9])\\d{5}", "\\d{7}", , , "7715123"],
                [, , "0800\\d{3}", "\\d{7}", , , "0800222"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "TO", 676, "00", , , , , , , , [
                    [, "(\\d{2})(\\d{3})", "$1-$2", ["[1-6]|7[0-4]|8[05]"]],
                    [, "(\\d{3})(\\d{4})", "$1 $2", ["7[5-9]|8[47-9]"]],
                    [, "(\\d{4})(\\d{3})", "$1 $2", ["0"]]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], 1, , [, , "NA", "NA"]
            ],
            TR: [, [, , "[2-589]\\d{9}|444\\d{4}", "\\d{7,10}"],
                [, , "(?:2(?:[13][26]|[28][2468]|[45][268]|[67][246])|3(?:[13][28]|[24-6][2468]|[78][02468]|92)|4(?:[16][246]|[23578][2468]|4[26]))\\d{7}", "\\d{10}", , , "2123456789"],
                [, , "5(?:0[1-7]|22|[34]\\d|5[1-59]|9[246])\\d{7}", "\\d{10}", , , "5012345678"],
                [, , "800\\d{7}", "\\d{10}", , , "8001234567"],
                [, , "900\\d{7}", "\\d{10}", , , "9001234567"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "TR", 90, "00", "0", , , "0", , , , [
                    [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[23]|4(?:[0-35-9]|4[0-35-9])"], "(0$1)", , 1],
                    [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[589]"], "0$1", , 1],
                    [, "(444)(\\d{1})(\\d{3})", "$1 $2 $3", ["444"]]
                ], , [, , "512\\d{7}", "\\d{10}", , , "5123456789"], , , [, , "444\\d{4}", "\\d{7}", , , "4441444"],
                [, , "444\\d{4}|850\\d{7}", "\\d{7,10}", , , "4441444"], , , [, , "NA", "NA"]
            ],
            TT: [, [, , "[589]\\d{9}", "\\d{7}(?:\\d{3})?"],
                [, , "868(?:2(?:01|2[1-6]|3[1-5])|6(?:0[79]|1[02-8]|2[1-9]|[3-69]\\d|7[0-79])|82[124])\\d{4}", "\\d{7}(?:\\d{3})?", , , "8682211234"],
                [, , "868(?:2(?:[789]\\d)|3(?:0[1-9]|1[02-9]|[2-9]\\d)|4[6-9]\\d|6(?:20|78|8\\d)|7(?:0[1-9]|1[02-9]|[2-9]\\d))\\d{4}", "\\d{10}", , , "8682911234"],
                [, , "8(?:00|44|55|66|77|88)[2-9]\\d{6}", "\\d{10}", , , "8002345678"],
                [, , "900[2-9]\\d{6}", "\\d{10}", , , "9002345678"],
                [, , "NA", "NA"],
                [, , "5(?:00|33|44|66|77)[2-9]\\d{6}", "\\d{10}", , , "5002345678"],
                [, , "NA", "NA"], "TT", 1, "011", "1", , , "1", , , , , , [, , "NA", "NA"], , "868", [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "868619\\d{4}", "\\d{10}"]
            ],
            TV: [, [, , "[29]\\d{4,5}", "\\d{5,6}"],
                [, , "2[02-9]\\d{3}", "\\d{5}", , , "20123"],
                [, , "90\\d{4}", "\\d{6}", , , "901234"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "TV", 688, "00", , , , , , , , , , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            TW: [, [, , "[2-689]\\d{7,8}|7\\d{7,9}", "\\d{8,10}"],
                [, , "[2-8]\\d{7,8}", "\\d{8,9}", , , "21234567"],
                [, , "9\\d{8}", "\\d{9}", , , "912345678"],
                [, , "800\\d{6}", "\\d{9}", , , "800123456"],
                [, , "900\\d{6}", "\\d{9}", , , "900123456"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "70\\d{8}", "\\d{10}", , , "7012345678"], "TW", 886, "0(?:0[25679]|19)", "0", "#", , "0", , , , [
                    [, "([2-8])(\\d{3,4})(\\d{4})", "$1 $2 $3", ["[2-6]|[78][1-9]"], "0$1"],
                    [, "([89]\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["80|9"], "0$1"],
                    [, "(70)(\\d{4})(\\d{4})", "$1 $2 $3", ["70"], "0$1"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            TZ: [, [, , "\\d{9}", "\\d{7,9}"],
                [, , "2[2-8]\\d{7}", "\\d{7,9}", , , "222345678"],
                [, , "(?:6[25-8]|7[13-9])\\d{7}", "\\d{9}", , , "621234567"],
                [, , "80[08]\\d{6}", "\\d{9}", , , "800123456"],
                [, , "90\\d{7}", "\\d{9}", , , "900123456"],
                [, , "8(?:40|6[01])\\d{6}", "\\d{9}", , , "840123456"],
                [, , "NA", "NA"],
                [, , "41\\d{7}", "\\d{9}", , , "412345678"], "TZ", 255, "00[056]", "0", , , "0", , , , [
                    [, "([24]\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["[24]"], "0$1"],
                    [, "([67]\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[67]"], "0$1"],
                    [, "([89]\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3", ["[89]"], "0$1"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            UA: [, [, , "[3-9]\\d{8}", "\\d{5,9}"],
                [, , "(?:3[1-8]|4[13-8]|5[1-7]|6[12459])\\d{7}", "\\d{5,9}", , , "311234567"],
                [, , "(?:39|50|6[36-8]|73|9[1-9])\\d{7}", "\\d{9}", , , "391234567"],
                [, , "800\\d{6}", "\\d{9}", , , "800123456"],
                [, , "900\\d{6}", "\\d{9}", , , "900123456"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "89\\d{7}", "\\d{9}", , , "891234567"], "UA", 380, "00", "0", , , "0", , "0~0", , [
                    [, "([3-9]\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["[38]9|4(?:[45][0-5]|87)|5(?:0|6[37]|7[37])|6[36-8]|73|9[1-9]", "[38]9|4(?:[45][0-5]|87)|5(?:0|6(?:3[14-7]|7)|7[37])|6[36-8]|73|9[1-9]"], "0$1"],
                    [, "([3-689]\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["3[1-8]2|4[13678]2|5(?:[12457]2|6[24])|6(?:[49]2|[12][29]|5[24])|8[0-8]|90", "3(?:[1-46-8]2[013-9]|52)|4(?:[1378]2|62[013-9])|5(?:[12457]2|6[24])|6(?:[49]2|[12][29]|5[24])|8[0-8]|90"], "0$1"],
                    [, "([3-6]\\d{3})(\\d{5})", "$1 $2", ["3(?:5[013-9]|[1-46-8])|4(?:[137][013-9]|6|[45][6-9]|8[4-6])|5(?:[1245][013-9]|6[0135-9]|3|7[4-6])|6(?:[49][013-9]|5[0135-9]|[12][13-8])", "3(?:5[013-9]|[1-46-8](?:22|[013-9]))|4(?:[137][013-9]|6(?:[013-9]|22)|[45][6-9]|8[4-6])|5(?:[1245][013-9]|6(?:3[02389]|[015689])|3|7[4-6])|6(?:[49][013-9]|5[0135-9]|[12][13-8])"], "0$1"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            UG: [, [, , "\\d{9}", "\\d{5,9}"],
                [, , "20(?:[0147]\\d{2}|2(?:40|[5-9]\\d)|3[23]\\d|5[0-4]\\d|6[03]\\d|8[0-2]\\d)\\d{4}|[34]\\d{8}", "\\d{5,9}", , , "312345678"],
                [, , "2030\\d{5}|7(?:0[0-7]|[15789]\\d|2[03]|30|[46][0-4])\\d{6}", "\\d{9}", , , "712345678"],
                [, , "800[123]\\d{5}", "\\d{9}", , , "800123456"],
                [, , "90[123]\\d{6}", "\\d{9}", , , "901123456"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "UG", 256, "00[057]", "0", , , "0", , , , [
                    [, "(\\d{3})(\\d{6})", "$1 $2", ["[7-9]|20(?:[013-8]|2[5-9])|4(?:6[45]|[7-9])"], "0$1"],
                    [, "(\\d{2})(\\d{7})", "$1 $2", ["3|4(?:[1-5]|6[0-36-9])"], "0$1"],
                    [, "(2024)(\\d{5})", "$1 $2", ["2024"], "0$1"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            US: [, [, , "[2-9]\\d{9}", "\\d{7}(?:\\d{3})?"],
                [, , "(?:2(?:0[1-35-9]|1[02-9]|2[04589]|3[149]|4[08]|5[1-46]|6[0279]|7[026]|8[13])|3(?:0[1-57-9]|1[02-9]|2[0135]|3[014679]|4[67]|5[12]|6[014]|8[56])|4(?:0[124-9]|1[02-579]|2[3-5]|3[0245]|4[0235]|58|69|7[0589]|8[04])|5(?:0[1-57-9]|1[0235-8]|20|3[0149]|4[01]|5[19]|6[1-37]|7[013-5]|8[056])|6(?:0[1-35-9]|1[024-9]|2[03689]|3[016]|4[16]|5[017]|6[0-279]|78|8[12])|7(?:0[1-46-8]|1[02-9]|2[0457]|3[1247]|4[07]|5[47]|6[02359]|7[02-59]|8[156])|8(?:0[1-68]|1[02-8]|28|3[0-25]|4[3578]|5[046-9]|6[02-5]|7[028])|9(?:0[1346-9]|1[02-9]|2[0589]|3[01678]|4[0179]|5[12469]|7[0-3589]|8[0459]))[2-9]\\d{6}", "\\d{7}(?:\\d{3})?", , , "2015555555"],
                [, , "(?:2(?:0[1-35-9]|1[02-9]|2[04589]|3[149]|4[08]|5[1-46]|6[0279]|7[026]|8[13])|3(?:0[1-57-9]|1[02-9]|2[0135]|3[014679]|4[67]|5[12]|6[014]|8[56])|4(?:0[124-9]|1[02-579]|2[3-5]|3[0245]|4[0235]|58|69|7[0589]|8[04])|5(?:0[1-57-9]|1[0235-8]|20|3[0149]|4[01]|5[19]|6[1-37]|7[013-5]|8[056])|6(?:0[1-35-9]|1[024-9]|2[03689]|3[016]|4[16]|5[017]|6[0-279]|78|8[12])|7(?:0[1-46-8]|1[02-9]|2[0457]|3[1247]|4[07]|5[47]|6[02359]|7[02-59]|8[156])|8(?:0[1-68]|1[02-8]|28|3[0-25]|4[3578]|5[046-9]|6[02-5]|7[028])|9(?:0[1346-9]|1[02-9]|2[0589]|3[01678]|4[0179]|5[12469]|7[0-3589]|8[0459]))[2-9]\\d{6}", "\\d{7}(?:\\d{3})?", , , "2015555555"],
                [, , "8(?:00|44|55|66|77|88)[2-9]\\d{6}", "\\d{10}", , , "8002345678"],
                [, , "900[2-9]\\d{6}", "\\d{10}", , , "9002345678"],
                [, , "NA", "NA"],
                [, , "5(?:00|33|44|66|77)[2-9]\\d{6}", "\\d{10}", , , "5002345678"],
                [, , "NA", "NA"], "US", 1, "011", "1", , , "1", , , 1, [
                    [, "(\\d{3})(\\d{4})", "$1-$2", , , , 1],
                    [, "(\\d{3})(\\d{3})(\\d{4})", "($1) $2-$3", , , , 1]
                ],
                [
                    [, "(\\d{3})(\\d{3})(\\d{4})", "$1-$2-$3"]
                ],
                [, , "NA", "NA"], 1, , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            UY: [, [, , "[2489]\\d{6,7}", "\\d{7,8}"],
                [, , "2\\d{7}|4[2-7]\\d{6}", "\\d{7,8}", , , "21231234"],
                [, , "9[1-9]\\d{6}", "\\d{8}", , , "94231234"],
                [, , "80[05]\\d{4}", "\\d{7}", , , "8001234"],
                [, , "90[0-8]\\d{4}", "\\d{7}", , , "9001234"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "UY", 598, "0(?:1[3-9]\\d|0)", "0", " int. ", , "0", , "00", , [
                    [, "(\\d{4})(\\d{4})", "$1 $2", ["[24]"]],
                    [, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["9[1-9]"], "0$1"],
                    [, "(\\d{3})(\\d{4})", "$1 $2", ["[89]0"], "0$1"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            UZ: [, [, , "[679]\\d{8}", "\\d{7,9}"],
                [, , "(?:6(?:1(?:22|3[124]|4[1-4]|5[123578]|64)|2(?:22|3[0-57-9]|41)|5(?:22|3[3-7]|5[024-8])|6\\d{2}|7(?:[23]\\d|7[69])|9(?:22|4[1-8]|6[135]))|7(?:0(?:5[4-9]|6[0146]|7[12456]|9[135-8])|1[12]\\d|2(?:22|3[1345789]|4[123579]|5[14])|3(?:2\\d|3[1578]|4[1-35-7]|5[1-57]|61)|4(?:2\\d|3[1-579]|7[1-79])|5(?:22|5[1-9]|6[1457])|6(?:22|3[12457]|4[13-8])|9(?:22|5[1-9])))\\d{5}", "\\d{7,9}", , , "662345678"],
                [, , "6(?:1(?:2(?:98|2[01])|35[0-4]|50\\d|61[23]|7(?:[01][017]|4\\d|55|9[5-9]))|2(?:11\\d|2(?:[12]1|9[01379])|5(?:[126]\\d|3[0-4])|7\\d{2})|5(?:19[01]|2(?:27|9[26])|30\\d|59\\d|7\\d{2})|6(?:2(?:1[5-9]|2[0367]|38|41|52|60)|3[79]\\d|4(?:56|83)|7(?:[07]\\d|1[017]|3[07]|4[047]|5[057]|67|8[0178]|9[79])|9[0-3]\\d)|7(?:2(?:24|3[237]|4[5-9]|7[15-8])|5(?:7[12]|8[0589])|7(?:0\\d|[39][07])|9(?:0\\d|7[079]))|9(?:2(?:1[1267]|5\\d|3[01]|7[0-4])|5[67]\\d|6(?:2[0-26]|8\\d)|7\\d{2}))\\d{4}|7(?:0\\d{3}|1(?:13[01]|6(?:0[47]|1[67]|66)|71[3-69]|98\\d)|2(?:2(?:2[79]|95)|3(?:2[5-9]|6[0-6])|57\\d|7(?:0\\d|1[17]|2[27]|3[37]|44|5[057]|66|88))|3(?:2(?:1[0-6]|21|3[469]|7[159])|33\\d|5(?:0[0-4]|5[579]|9\\d)|7(?:[0-3579]\\d|4[0467]|6[67]|8[078])|9[4-6]\\d)|4(?:2(?:29|5[0257]|6[0-7]|7[1-57])|5(?:1[0-4]|8\\d|9[5-9])|7(?:0\\d|1[024589]|2[0127]|3[0137]|[46][07]|5[01]|7[5-9]|9[079])|9(?:7[015-9]|[89]\\d))|5(?:112|2(?:0\\d|2[29]|[49]4)|3[1568]\\d|52[6-9]|7(?:0[01578]|1[017]|[23]7|4[047]|[5-7]\\d|8[78]|9[079]))|6(?:2(?:2[1245]|4[2-4])|39\\d|41[179]|5(?:[349]\\d|5[0-2])|7(?:0[017]|[13]\\d|22|44|55|67|88))|9(?:22[128]|3(?:2[0-4]|7\\d)|57[05629]|7(?:2[05-9]|3[37]|4\\d|60|7[2579]|87|9[07])))\\d{4}|9[0-57-9]\\d{7}", "\\d{7,9}", , , "912345678"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "UZ", 998, "810", "8", , , "8", , "8~10", , [
                    [, "([679]\\d)(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", , "8 $1"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            VA: [, [, , "(?:0(?:878\\d{5}|6698\\d{5})|[1589]\\d{5,10}|3(?:[12457-9]\\d{8}|[36]\\d{7,9}))", "\\d{6,11}"],
                [, , "06698\\d{5}", "\\d{10}", , , "0669812345"],
                [, , "3(?:[12457-9]\\d{8}|6\\d{7,8}|3\\d{7,9})", "\\d{9,11}", , , "3123456789"],
                [, , "80(?:0\\d{6}|3\\d{3})", "\\d{6,9}", , , "800123456"],
                [, , "0878\\d{5}|1(?:44|6[346])\\d{6}|89(?:2\\d{3}|4(?:[0-4]\\d{2}|[5-9]\\d{4})|5(?:[0-4]\\d{2}|[5-9]\\d{6})|9\\d{6})", "\\d{6,10}", , , "899123456"],
                [, , "84(?:[08]\\d{6}|[17]\\d{3})", "\\d{6,9}", , , "848123456"],
                [, , "1(?:78\\d|99)\\d{6}", "\\d{9,10}", , , "1781234567"],
                [, , "55\\d{8}", "\\d{10}", , , "5512345678"], "VA", 39, "00", , , , , , , , , , [, , "NA", "NA"], , , [, , "848\\d{6}", "\\d{9}", , , "848123456"],
                [, , "NA", "NA"], 1, , [, , "NA", "NA"]
            ],
            VC: [, [, , "[5789]\\d{9}", "\\d{7}(?:\\d{3})?"],
                [, , "784(?:266|3(?:6[6-9]|7\\d|8[0-24-6])|4(?:38|5[0-36-8]|8[0-8])|5(?:55|7[0-2]|93)|638|784)\\d{4}", "\\d{7}(?:\\d{3})?", , , "7842661234"],
                [, , "784(?:4(?:3[0-4]|5[45]|89|9[0-58])|5(?:2[6-9]|3[0-4]))\\d{4}", "\\d{10}", , , "7844301234"],
                [, , "8(?:00|44|55|66|77|88)[2-9]\\d{6}", "\\d{10}", , , "8002345678"],
                [, , "900[2-9]\\d{6}", "\\d{10}", , , "9002345678"],
                [, , "NA", "NA"],
                [, , "5(?:00|33|44|66|77)[2-9]\\d{6}", "\\d{10}", , , "5002345678"],
                [, , "NA", "NA"], "VC", 1, "011", "1", , , "1", , , , , , [, , "NA", "NA"], , "784", [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            VE: [, [, , "[24589]\\d{9}", "\\d{7,10}"],
                [, , "(?:2(?:12|3[457-9]|[58][1-9]|[467]\\d|9[1-6])|50[01])\\d{7}", "\\d{7,10}", , , "2121234567"],
                [, , "4(?:1[24-8]|2[46])\\d{7}", "\\d{10}", , , "4121234567"],
                [, , "800\\d{7}", "\\d{10}", , , "8001234567"],
                [, , "900\\d{7}", "\\d{10}", , , "9001234567"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "VE", 58, "00", "0", , , "0", , , , [
                    [, "(\\d{3})(\\d{7})", "$1-$2", , "0$1", "$CC $1"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            VG: [, [, , "[2589]\\d{9}", "\\d{7}(?:\\d{3})?"],
                [, , "284(?:(?:229|4(?:22|9[45])|774|8(?:52|6[459]))\\d{4}|496[0-5]\\d{3})", "\\d{7}(?:\\d{3})?", , , "2842291234"],
                [, , "284(?:(?:3(?:0[0-3]|4[0-367]|94)|4(?:4[0-6]|68|99)|54[0-57])\\d{4}|496[6-9]\\d{3})", "\\d{10}", , , "2843001234"],
                [, , "8(?:00|44|55|66|77|88)[2-9]\\d{6}", "\\d{10}", , , "8002345678"],
                [, , "900[2-9]\\d{6}", "\\d{10}", , , "9002345678"],
                [, , "NA", "NA"],
                [, , "5(?:00|33|44|66|77)[2-9]\\d{6}", "\\d{10}", , , "5002345678"],
                [, , "NA", "NA"], "VG", 1, "011", "1", , , "1", , , , , , [, , "NA", "NA"], , "284", [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            VI: [, [, , "[3589]\\d{9}", "\\d{7}(?:\\d{3})?"],
                [, , "340(?:2(?:01|2[0678]|44|77)|3(?:32|44)|4(?:22|7[34])|5(?:1[34]|55)|6(?:26|4[23]|77|9[023])|7(?:1[2-589]|27|7\\d)|884|998)\\d{4}", "\\d{7}(?:\\d{3})?", , , "3406421234"],
                [, , "340(?:2(?:01|2[0678]|44|77)|3(?:32|44)|4(?:22|7[34])|5(?:1[34]|55)|6(?:26|4[23]|77|9[023])|7(?:1[2-589]|27|7\\d)|884|998)\\d{4}", "\\d{7}(?:\\d{3})?", , , "3406421234"],
                [, , "8(?:00|44|55|66|77|88)[2-9]\\d{6}", "\\d{10}", , , "8002345678"],
                [, , "900[2-9]\\d{6}", "\\d{10}", , , "9002345678"],
                [, , "NA", "NA"],
                [, , "5(?:00|33|44|66|77)[2-9]\\d{6}", "\\d{10}", , , "5002345678"],
                [, , "NA", "NA"], "VI", 1, "011", "1", , , "1", , , 1, , , [, , "NA", "NA"], , "340", [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            VN: [, [, , "[17]\\d{6,9}|[2-69]\\d{7,9}|8\\d{6,8}", "\\d{7,10}"],
                [, , "(?:2(?:[025-79]|1[0189]|[348][01])|3(?:[0136-9]|[25][01])|4\\d|5(?:[01][01]|[2-9])|6(?:[0-46-8]|5[01])|7(?:[02-79]|[18][01])|8[1-9])\\d{7}", "\\d{9,10}", , , "2101234567"],
                [, , "(?:9\\d|1(?:2\\d|6[2-9]|8[68]|99))\\d{7}", "\\d{9,10}", , , "912345678"],
                [, , "1800\\d{4,6}", "\\d{8,10}", , , "1800123456"],
                [, , "1900\\d{4,6}", "\\d{8,10}", , , "1900123456"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "VN", 84, "00", "0", , , "0", , , , [
                    [, "([17]99)(\\d{4})", "$1 $2", ["[17]99"], "0$1", , 1],
                    [, "([48])(\\d{4})(\\d{4})", "$1 $2 $3", ["[48]"], "0$1", , 1],
                    [, "([235-7]\\d)(\\d{4})(\\d{3})", "$1 $2 $3", ["2[025-79]|3[0136-9]|5[2-9]|6[0-46-8]|7[02-79]"], "0$1", , 1],
                    [, "(80)(\\d{5})", "$1 $2", ["80"], "0$1", , 1],
                    [, "(69\\d)(\\d{4,5})", "$1 $2", ["69"], "0$1", , 1],
                    [, "([235-7]\\d{2})(\\d{4})(\\d{3})", "$1 $2 $3", ["2[1348]|3[25]|5[01]|65|7[18]"], "0$1", , 1],
                    [, "(9\\d)(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["9"], "0$1", , 1],
                    [, "(1[2689]\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["1(?:[26]|8[68]|99)"], "0$1", , 1],
                    [, "(1[89]00)(\\d{4,6})", "$1 $2", ["1[89]0"], "$1", , 1]
                ], , [, , "NA", "NA"], , , [, , "[17]99\\d{4}|69\\d{5,6}", "\\d{7,8}", , , "1992000"],
                [, , "[17]99\\d{4}|69\\d{5,6}|80\\d{5}", "\\d{7,8}", , , "1992000"], , , [, , "NA", "NA"]
            ],
            VU: [, [, , "[2-57-9]\\d{4,6}", "\\d{5,7}"],
                [, , "(?:2[02-9]\\d|3(?:[5-7]\\d|8[0-8])|48[4-9]|88\\d)\\d{2}", "\\d{5}", , , "22123"],
                [, , "(?:5(?:7[2-5]|[0-689]\\d)|7[013-7]\\d)\\d{4}", "\\d{7}", , , "5912345"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "VU", 678, "00", , , , , , , , [
                    [, "(\\d{3})(\\d{4})", "$1 $2", ["[579]"]]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "3[03]\\d{3}|900\\d{4}", "\\d{5,7}", , , "30123"], , , [, , "NA", "NA"]
            ],
            WF: [, [, , "[5-7]\\d{5}", "\\d{6}"],
                [, , "(?:50|68|72)\\d{4}", "\\d{6}", , , "501234"],
                [, , "(?:50|68|72)\\d{4}", "\\d{6}", , , "501234"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "WF", 681, "00", , , , , , , 1, [
                    [, "(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            WS: [, [, , "[2-8]\\d{4,6}", "\\d{5,7}"],
                [, , "(?:[2-5]\\d|6[1-9]|84\\d{2})\\d{3}", "\\d{5,7}", , , "22123"],
                [, , "(?:60|7[25-7]\\d)\\d{4}", "\\d{6,7}", , , "601234"],
                [, , "800\\d{3}", "\\d{6}", , , "800123"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "WS", 685, "0", , , , , , , , [
                    [, "(8\\d{2})(\\d{3,4})", "$1 $2", ["8"]],
                    [, "(7\\d)(\\d{5})", "$1 $2", ["7"]],
                    [, "(\\d{5})", "$1", ["[2-6]"]]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            YE: [, [, , "[1-7]\\d{6,8}", "\\d{6,9}"],
                [, , "(?:1(?:7\\d|[2-68])|2[2-68]|3[2358]|4[2-58]|5[2-6]|6[3-58]|7[24-68])\\d{5}", "\\d{6,8}", , , "1234567"],
                [, , "7[0137]\\d{7}", "\\d{9}", , , "712345678"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "YE", 967, "00", "0", , , "0", , , , [
                    [, "([1-7])(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[1-6]|7[24-68]"], "0$1"],
                    [, "(7\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["7[0137]"], "0$1"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            YT: [, [, , "[268]\\d{8}", "\\d{9}"],
                [, , "269(?:6[0-4]|50)\\d{4}", "\\d{9}", , , "269601234"],
                [, , "639\\d{6}", "\\d{9}", , , "639123456"],
                [, , "80\\d{7}", "\\d{9}", , , "801234567"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "YT", 262, "00", "0", , , "0", , , , , , [, , "NA", "NA"], , "269|63", [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            ZA: [, [, , "[1-79]\\d{8}|8(?:[067]\\d{7}|[1-4]\\d{3,7})", "\\d{5,9}"],
                [, , "(?:1[0-8]|2[0-378]|3[1-69]|4\\d|5[1346-8])\\d{7}", "\\d{9}", , , "101234567"],
                [, , "(?:6[0-5]|7[0-46-9])\\d{7}|8[1-4]\\d{3,7}", "\\d{5,9}", , , "711234567"],
                [, , "80\\d{7}", "\\d{9}", , , "801234567"],
                [, , "86[2-9]\\d{6}|90\\d{7}", "\\d{9}", , , "862345678"],
                [, , "860\\d{6}", "\\d{9}", , , "860123456"],
                [, , "NA", "NA"],
                [, , "87\\d{7}", "\\d{9}", , , "871234567"], "ZA", 27, "00", "0", , , "0", , , , [
                    [, "(860)(\\d{3})(\\d{3})", "$1 $2 $3", ["860"], "0$1"],
                    [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[1-79]|8(?:[0-47]|6[1-9])"], "0$1"],
                    [, "(\\d{2})(\\d{3,4})", "$1 $2", ["8[1-4]"], "0$1"],
                    [, "(\\d{2})(\\d{3})(\\d{2,3})", "$1 $2 $3", ["8[1-4]"], "0$1"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "861\\d{6}", "\\d{9}", , , "861123456"], , , [, , "NA", "NA"]
            ],
            ZM: [, [, , "[289]\\d{8}", "\\d{9}"],
                [, , "21[1-8]\\d{6}", "\\d{9}", , , "211234567"],
                [, , "9(?:5[05]|6\\d|7[1-9])\\d{6}", "\\d{9}", , , "955123456"],
                [, , "800\\d{6}", "\\d{9}", , , "800123456"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "ZM", 260, "00", "0", , , "0", , , , [
                    [, "([29]\\d)(\\d{7})", "$1 $2", ["[29]"], "0$1"],
                    [, "(800)(\\d{3})(\\d{3})", "$1 $2 $3", ["8"], "0$1"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            ZW: [, [, , "2(?:[012457-9]\\d{3,8}|6(?:[14]\\d{7}|\\d{4}))|[13-79]\\d{4,9}|8[06]\\d{8}", "\\d{3,10}"],
                [, , "(?:2(?:0(?:4\\d|5\\d{2})|2[278]\\d|48\\d|7(?:[1-7]\\d|[089]\\d{2})|8(?:[2-57-9]|[146]\\d{2})|98)|3(?:08|17|3[78]|7(?:[19]|[56]\\d)|8[37]|98)|5[15][78]|6(?:28\\d{2}|[36]7|75\\d|[69]8|8(?:7\\d|8)))\\d{3}|(?:2(?:1[39]|2[0157]|6[14]|7[35]|84)|329)\\d{7}|(?:1(?:3\\d{2}|9\\d|[4-8])|2(?:0\\d{2}|[569]\\d)|3(?:[26]|[013459]\\d)|5(?:0|5\\d{2}|[689]\\d)|6(?:[39]|[01246]\\d|[78]\\d{2}))\\d{3}|(?:29\\d|39|54)\\d{6}|(?:(?:25|54)83|2582\\d)\\d{3}|(?:4\\d{6,7}|9[2-9]\\d{4,5})", "\\d{3,10}", , , "1312345"],
                [, , "7[1378]\\d{7}", "\\d{9}", , , "711234567"],
                [, , "800\\d{7}", "\\d{10}", , , "8001234567"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "86(?:1[12]|30|44|55|77|8[367]|99)\\d{6}", "\\d{10}", , , "8686123456"], "ZW", 263, "00", "0", , , "0", , , , [
                    [, "([49])(\\d{3})(\\d{2,4})", "$1 $2 $3", ["4|9[2-9]"], "0$1"],
                    [, "(7\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["7"], "0$1"],
                    [, "(86\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["86[24]"], "0$1"],
                    [, "([2356]\\d{2})(\\d{3,5})", "$1 $2", ["2(?:0[45]|2[278]|[49]8|[78])|3(?:08|17|3[78]|7[1569]|8[37]|98)|5[15][78]|6(?:[29]8|[38]7|6[78]|75|[89]8)"], "0$1"],
                    [, "(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2(?:1[39]|2[0157]|6[14]|7[35]|84)|329"], "0$1"],
                    [, "([1-356]\\d)(\\d{3,5})", "$1 $2", ["1[3-9]|2[0569]|3[0-69]|5[05689]|6[0-46-9]"], "0$1"],
                    [, "([235]\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[23]9|54"], "0$1"],
                    [, "([25]\\d{3})(\\d{3,5})", "$1 $2", ["(?:25|54)8", "258[23]|5483"], "0$1"],
                    [, "(8\\d{3})(\\d{6})", "$1 $2", ["86"], "0$1"],
                    [, "(80\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["80"], "0$1"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            800: [, [, , "\\d{8}", "\\d{8}", , , "12345678"],
                [, , "NA", "NA", , , "12345678"],
                [, , "NA", "NA", , , "12345678"],
                [, , "\\d{8}", "\\d{8}", , , "12345678"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "001", 800, , , , , , , , 1, [
                    [, "(\\d{4})(\\d{4})", "$1 $2"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], 1, , [, , "NA", "NA"]
            ],
            808: [, [, , "\\d{8}", "\\d{8}", , , "12345678"],
                [, , "NA", "NA", , , "12345678"],
                [, , "NA", "NA", , , "12345678"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "\\d{8}", "\\d{8}", , , "12345678"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "001", 808, , , , , , , , 1, [
                    [, "(\\d{4})(\\d{4})", "$1 $2"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], 1, , [, , "NA", "NA"]
            ],
            870: [, [, , "[35-7]\\d{8}", "\\d{9}", , , "301234567"],
                [, , "NA", "NA", , , "301234567"],
                [, , "(?:[356]\\d|7[6-8])\\d{7}", "\\d{9}", , , "301234567"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "001", 870, , , , , , , , , [
                    [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            878: [, [, , "1\\d{11}", "\\d{12}", , , "101234567890"],
                [, , "NA", "NA", , , "101234567890"],
                [, , "NA", "NA", , , "101234567890"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "10\\d{10}", "\\d{12}", , , "101234567890"], "001", 878, , , , , , , , 1, [
                    [, "(\\d{2})(\\d{5})(\\d{5})", "$1 $2 $3"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            881: [, [, , "[67]\\d{8}", "\\d{9}", , , "612345678"],
                [, , "NA", "NA", , , "612345678"],
                [, , "[67]\\d{8}", "\\d{9}", , , "612345678"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "001", 881, , , , , , , , , [
                    [, "(\\d)(\\d{3})(\\d{5})", "$1 $2 $3", ["[67]"]]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            882: [, [, , "[13]\\d{6,11}", "\\d{7,12}", , , "3451234567"],
                [, , "NA", "NA", , , "3451234567"],
                [, , "3(?:2\\d{3}|37\\d{2}|4(?:2|7\\d{3}))\\d{4}", "\\d{7,10}", , , "3451234567"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "1(?:3(?:0[0347]|[13][0139]|2[035]|4[013568]|6[0459]|7[06]|8[15678]|9[0689])\\d{4}|6\\d{5,10})|345\\d{7}", "\\d{7,12}", , , "3451234567"], "001", 882, , , , , , , , , [
                    [, "(\\d{2})(\\d{4})(\\d{3})", "$1 $2 $3", ["3[23]"]],
                    [, "(\\d{2})(\\d{5})", "$1 $2", ["16|342"]],
                    [, "(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["34[57]"]],
                    [, "(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["348"]],
                    [, "(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3", ["1"]],
                    [, "(\\d{2})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["16"]],
                    [, "(\\d{2})(\\d{4,5})(\\d{5})", "$1 $2 $3", ["16"]]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "348[57]\\d{7}", "\\d{11}", , , "3451234567"]
            ],
            883: [, [, , "51\\d{7}(?:\\d{3})?", "\\d{9}(?:\\d{3})?", , , "510012345"],
                [, , "NA", "NA", , , "510012345"],
                [, , "NA", "NA", , , "510012345"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "51(?:00\\d{5}(?:\\d{3})?|[13]0\\d{8})", "\\d{9}(?:\\d{3})?", , , "510012345"], "001", 883, , , , , , , , 1, [
                    [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["510"]],
                    [, "(\\d{3})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["510"]],
                    [, "(\\d{4})(\\d{4})(\\d{4})", "$1 $2 $3", ["51[13]"]]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], , , [, , "NA", "NA"]
            ],
            888: [, [, , "\\d{11}", "\\d{11}", , , "12345678901"],
                [, , "NA", "NA", , , "12345678901"],
                [, , "NA", "NA", , , "12345678901"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "001", 888, , , , , , , , 1, [
                    [, "(\\d{3})(\\d{3})(\\d{5})", "$1 $2 $3"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "\\d{11}", "\\d{11}", , , "12345678901"], 1, , [, , "NA", "NA"]
            ],
            979: [, [, , "\\d{9}", "\\d{9}", , , "123456789"],
                [, , "NA", "NA", , , "123456789"],
                [, , "NA", "NA", , , "123456789"],
                [, , "NA", "NA"],
                [, , "\\d{9}", "\\d{9}", , , "123456789"],
                [, , "NA", "NA"],
                [, , "NA", "NA"],
                [, , "NA", "NA"], "001", 979, , , , , , , , 1, [
                    [, "(\\d)(\\d{4})(\\d{4})", "$1 $2 $3"]
                ], , [, , "NA", "NA"], , , [, , "NA", "NA"],
                [, , "NA", "NA"], 1, , [, , "NA", "NA"]
            ]
        };
    A.r = function() {
        return A.sa ? A.sa : A.sa = new A
    };
    var Ca = {
            0: "0",
            1: "1",
            2: "2",
            3: "3",
            4: "4",
            5: "5",
            6: "6",
            7: "7",
            8: "8",
            9: "9",
            "ï¼": "0",
            "ï¼‘": "1",
            "ï¼’": "2",
            "ï¼“": "3",
            "ï¼”": "4",
            "ï¼•": "5",
            "ï¼–": "6",
            "ï¼—": "7",
            "ï¼˜": "8",
            "ï¼™": "9",
            "Ù ": "0",
            "Ù¡": "1",
            "Ù¢": "2",
            "Ù£": "3",
            "Ù¤": "4",
            "Ù¥": "5",
            "Ù¦": "6",
            "Ù§": "7",
            "Ù¨": "8",
            "Ù©": "9",
            "Û°": "0",
            "Û±": "1",
            "Û²": "2",
            "Û³": "3",
            "Û´": "4",
            "Ûµ": "5",
            "Û¶": "6",
            "Û·": "7",
            "Û¸": "8",
            "Û¹": "9"
        },
        Da = {
            0: "0",
            1: "1",
            2: "2",
            3: "3",
            4: "4",
            5: "5",
            6: "6",
            7: "7",
            8: "8",
            9: "9",
            "ï¼": "0",
            "ï¼‘": "1",
            "ï¼’": "2",
            "ï¼“": "3",
            "ï¼”": "4",
            "ï¼•": "5",
            "ï¼–": "6",
            "ï¼—": "7",
            "ï¼˜": "8",
            "ï¼™": "9",
            "Ù ": "0",
            "Ù¡": "1",
            "Ù¢": "2",
            "Ù£": "3",
            "Ù¤": "4",
            "Ù¥": "5",
            "Ù¦": "6",
            "Ù§": "7",
            "Ù¨": "8",
            "Ù©": "9",
            "Û°": "0",
            "Û±": "1",
            "Û²": "2",
            "Û³": "3",
            "Û´": "4",
            "Ûµ": "5",
            "Û¶": "6",
            "Û·": "7",
            "Û¸": "8",
            "Û¹": "9",
            A: "2",
            B: "2",
            C: "2",
            D: "3",
            E: "3",
            F: "3",
            G: "4",
            H: "4",
            I: "4",
            J: "5",
            K: "5",
            L: "5",
            M: "6",
            N: "6",
            O: "6",
            P: "7",
            Q: "7",
            R: "7",
            S: "7",
            T: "8",
            U: "8",
            V: "8",
            W: "9",
            X: "9",
            Y: "9",
            Z: "9"
        },
        Ea = RegExp("[+ï¼‹]+"),
        Fa = RegExp("^[+ï¼‹]+"),
        Ga = RegExp("([0-9ï¼-ï¼™Ù -Ù©Û°-Û¹])"),
        Ha = RegExp("[+ï¼‹0-9ï¼-ï¼™Ù -Ù©Û°-Û¹]"),
        Ia = /[\\\/] *x/,
        Ja = RegExp("[^0-9ï¼-ï¼™Ù -Ù©Û°-Û¹A-Za-z#]+$"),
        Ka = /(?:.*?[A-Za-z]){3}.*/,
        La = RegExp("(?:;ext=([0-9ï¼-ï¼™Ù -Ù©Û°-Û¹]{1,7})|[ Â \\t,]*(?:e?xt(?:ensi(?:oÌ?|Ã³))?n?|ï½…?ï½˜ï½”ï½Ž?|[,xï½˜#ï¼ƒ~ï½ž]|int|anexo|ï½‰ï½Žï½”)[:\\.ï¼Ž]?[ Â \\t,-]*([0-9ï¼-ï¼™Ù -Ù©Û°-Û¹]{1,7})#?|[- ]+([0-9ï¼-ï¼™Ù -Ù©Û°-Û¹]{1,5})#)$", "i"),
        Ma = RegExp("^[0-9ï¼-ï¼™Ù -Ù©Û°-Û¹]{2}$|^[+ï¼‹]*(?:[-xâ€-â€•âˆ’ãƒ¼ï¼-ï¼ Â Â­â€‹â ã€€()ï¼ˆï¼‰ï¼»ï¼½.\\[\\]/~â“âˆ¼ï½ž*]*[0-9ï¼-ï¼™Ù -Ù©Û°-Û¹]){3,}[-xâ€-â€•âˆ’ãƒ¼ï¼-ï¼ Â Â­â€‹â ã€€()ï¼ˆï¼‰ï¼»ï¼½.\\[\\]/~â“âˆ¼ï½ž*A-Za-z0-9ï¼-ï¼™Ù -Ù©Û°-Û¹]*(?:;ext=([0-9ï¼-ï¼™Ù -Ù©Û°-Û¹]{1,7})|[ Â \\t,]*(?:e?xt(?:ensi(?:oÌ?|Ã³))?n?|ï½…?ï½˜ï½”ï½Ž?|[,xï½˜#ï¼ƒ~ï½ž]|int|anexo|ï½‰ï½Žï½”)[:\\.ï¼Ž]?[ Â \\t,-]*([0-9ï¼-ï¼™Ù -Ù©Û°-Û¹]{1,7})#?|[- ]+([0-9ï¼-ï¼™Ù -Ù©Û°-Û¹]{1,5})#)?$", "i"),
        Na = /(\$\d)/,
        Oa = /^\(?\$1\)?$/;
    A.prototype.format = function(a, b) {
        if (0 == m(a, 2) && null != a.c[5]) {
            var c = n(a, 5);
            if (0 < c.length) return c
        }
        var c = a.l(),
            d = I(a);
        if (0 == b) return J(c, 0, d, "");
        if (!(c in Aa)) return d;
        var e, f = H(this, c, P(c));
        e = null != a.c[3] && 0 != a.getExtension().length ? 3 == b ? ";ext=" + a.getExtension() : null != f.c[13] ? m(f, 13) + n(a, 3) : " ext. " + n(a, 3) : "";
        a: {
            for (var g, f = 0 == (l(f, 20) || []).length || 2 == b ? l(f, 19) || [] : l(f, 20) || [], h = f.length, i = 0; h > i; ++i) {
                g = f[i];
                var j = o(g, 3);
                if ((0 == j || 0 == d.search(m(g, 3, j - 1))) && (j = new RegExp(m(g, 1)), X(j, d))) {
                    f = g;
                    break a
                }
            }
            f = null
        }
        return null != f && (h = f, f = n(h, 2), g = new RegExp(m(h, 1)), n(h, 5), i = "", h = n(h, 4), i = 2 == b && null != h && 0 < h.length ? d.replace(g, f.replace(Na, h)) : d.replace(g, f), 3 == b && (i = i.replace(RegExp("^[-xâ€-â€•âˆ’ãƒ¼ï¼-ï¼ Â Â­â€‹â ã€€()ï¼ˆï¼‰ï¼»ï¼½.\\[\\]/~â“âˆ¼ï½ž]+"), ""), i = i.replace(RegExp("[-xâ€-â€•âˆ’ãƒ¼ï¼-ï¼ Â Â­â€‹â ã€€()ï¼ˆï¼‰ï¼»ï¼½.\\[\\]/~â“âˆ¼ï½ž]+", "g"), "-")), d = i), J(c, b, d, e)
    }, A.prototype.parse = function(a, b) {
        return W(this, a, b, !1)
    };
    var Pa = new v;
    p(Pa, 11, "NA");
    var Qa = /\[([^\[\]])*\]/g,
        Ra = /\d(?=[^,}][^,}])/g,
        Sa = RegExp("^[-xâ€-â€•âˆ’ãƒ¼ï¼-ï¼ Â Â­â€‹â ã€€()ï¼ˆï¼‰ï¼»ï¼½.\\[\\]/~â“âˆ¼ï½ž]*(\\$\\d[-xâ€-â€•âˆ’ãƒ¼ï¼-ï¼ Â Â­â€‹â ã€€()ï¼ˆï¼‰ï¼»ï¼½.\\[\\]/~â“âˆ¼ï½ž]*)+$"),
        Ta = /[- ]/;
    Y.prototype.clear = function() {
        this.ga = "", this.k.clear(), this.u.clear(), this.q.clear(), this.t = 0, this.v = "", this.d.clear(), this.o = "", this.b.clear(), this.m = !0, this.aa = this.s = this.ka = !1, this.h = [], this.ea = !1, this.i != this.va && (this.i = Z(this, this.ha))
    }, a("intlTelInputUtils", {}), a("intlTelInputUtils.formatNumber", function(a, b, c, d, e) {
        try {
            var f, g = a.replace(/\D/g, ""),
                h = new Y(b),
                i = "";
            "+" == a.substr(0, 1) && (g = "+" + g);
            for (var j = 0; j < g.length; j++) {
                if (f = aa(h, g.charAt(j)), d && i && f.length <= i.length && -1 == f.indexOf(" ") && 2 != la(g.substring(0, j - 1), b)) return i + " ext. " + g.substring(j, g.length);
                i = f
            }
            if (" " == i.charAt(i.length - 1) && (i = i.substr(0, i.length - 1)), c && !a.split(" ext. ")[1]) {
                var k = aa(h, "5");
                if (" " == k.charAt(k.length - 1) && (k = k.substr(0, k.length - 1)), isNaN(parseFloat(k.substr(k.length - 2, 1)))) return k.substr(0, k.length - 1);
                if (d && i && k.length <= i.length && -1 == k.indexOf(" ") && 2 != la(g.substring(0, j - 1), b) && !e) return i + " ext. "
            }
            return i
        } catch (l) {
            return a
        }
    }), a("intlTelInputUtils.formatNumberByType", function(a, b, c) {
        try {
            var d = A.r(),
                e = V(d, a, b);
            return d.format(e, "undefined" == typeof c ? 0 : c)
        } catch (f) {
            return ""
        }
    }), a("intlTelInputUtils.getExampleNumber", function(a, b, c) {
        try {
            var d, e = A.r();
            a: {
                if (G(a)) {
                    var f = K(M(e, a), c);
                    try {
                        if (null != f.c[6]) {
                            d = e.parse(n(f, 6), a);
                            break a
                        }
                    } catch (g) {}
                }
                d = null
            }
            return e.format(d, b ? 2 : 1)
        } catch (h) {
            return ""
        }
    }), a("intlTelInputUtils.getNumberType", function(a, b) {
        try {
            var c, d = A.r(),
                e = V(d, a, b),
                f = O(d, e),
                g = H(d, e.l(), f);
            if (null == g) c = -1;
            else {
                var h = I(e);
                c = L(h, g)
            }
            return c
        } catch (i) {
            return -99
        }
    }), a("intlTelInputUtils.getValidationError", la), a("intlTelInputUtils.isValidNumber", function(a, b) {
        try {
            var c, d = A.r(),
                e = V(d, a, b),
                f = O(d, e),
                g = e.l(),
                h = H(d, g, f);
            if (null == h || "001" != f && g != Q(d, f)) c = !1;
            else {
                var i = I(e);
                c = -1 != L(i, h)
            }
            return c
        } catch (j) {
            return !1
        }
    }), a("intlTelInputUtils.numberType", {
        FIXED_LINE: 0,
        MOBILE: 1,
        FIXED_LINE_OR_MOBILE: 2,
        TOLL_FREE: 3,
        PREMIUM_RATE: 4,
        SHARED_COST: 5,
        VOIP: 6,
        PERSONAL_NUMBER: 7,
        PAGER: 8,
        UAN: 9,
        VOICEMAIL: 10,
        UNKNOWN: -1
    }), a("intlTelInputUtils.validationError", {
        IS_POSSIBLE: 0,
        INVALID_COUNTRY_CODE: 1,
        TOO_SHORT: 2,
        TOO_LONG: 3,
        NOT_A_NUMBER: 4
    }), a("intlTelInputUtils.numberFormat", {
        E164: 0,
        INTERNATIONAL: 1,
        NATIONAL: 2,
        RFC3966: 3
    })
}(), ! function(a) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery)
}(function(a) {
    "use strict";
    var b = window.Slick || {};
    b = function() {
        function b(b, d) {
            var e, f, g = this;
            if (g.defaults = {
                    accessibility: !0,
                    arrows: !0,
                    autoplay: !1,
                    autoplaySpeed: 3e3,
                    centerMode: !1,
                    centerPadding: "50px",
                    cssEase: "ease",
                    customPaging: function(a, b) {
                        return '<button type="button">' + (b + 1) + "</button>"
                    },
                    dots: !1,
                    draggable: !0,
                    easing: "linear",
                    fade: !1,
                    infinite: !0,
                    lazyLoad: "ondemand",
                    onBeforeChange: null,
                    onAfterChange: null,
                    onInit: null,
                    onReInit: null,
                    pauseOnHover: !0,
                    responsive: null,
                    slide: "div",
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: 300,
                    swipe: !0,
                    touchMove: !0,
                    touchThreshold: 5,
                    useCSS: !0,
                    vertical: !1
                }, g.initials = {
                    animating: !1,
                    autoPlayTimer: null,
                    currentSlide: 0,
                    currentLeft: null,
                    direction: 1,
                    $dots: null,
                    listWidth: null,
                    listHeight: null,
                    loadIndex: 0,
                    $nextArrow: null,
                    $prevArrow: null,
                    slideCount: null,
                    slideWidth: null,
                    $slideTrack: null,
                    $slides: null,
                    sliding: !1,
                    slideOffset: 0,
                    swipeLeft: null,
                    $list: null,
                    touchObject: {},
                    transformsEnabled: !1
                }, a.extend(g, g.initials), g.activeBreakpoint = null, g.animType = null, g.animProp = null, g.breakpoints = [], g.breakpointSettings = [], g.cssTransitions = !1, g.paused = !1, g.positionProp = null, g.$slider = a(b), g.$slidesCache = null, g.transformType = null, g.transitionType = null, g.windowWidth = 0, g.windowTimer = null, g.options = a.extend({}, g.defaults, d), g.originalSettings = g.options, e = g.options.responsive || null, e && e.length > -1) {
                for (f in e) e.hasOwnProperty(f) && (g.breakpoints.push(e[f].breakpoint), g.breakpointSettings[e[f].breakpoint] = e[f].settings);
                g.breakpoints.sort(function(a, b) {
                    return b - a
                })
            }
            g.autoPlay = a.proxy(g.autoPlay, g), g.autoPlayClear = a.proxy(g.autoPlayClear, g), g.changeSlide = a.proxy(g.changeSlide, g), g.setPosition = a.proxy(g.setPosition, g), g.swipeHandler = a.proxy(g.swipeHandler, g), g.dragHandler = a.proxy(g.dragHandler, g), g.keyHandler = a.proxy(g.keyHandler, g), g.autoPlayIterator = a.proxy(g.autoPlayIterator, g), g.instanceUid = c++, g.init()
        }
        var c = 0;
        return b
    }(), b.prototype.addSlide = function(b, c, d) {
        var e = this;
        if ("boolean" == typeof c) d = c, c = null;
        else if (0 > c || c >= e.slideCount) return !1;
        e.unload(), "number" == typeof c ? 0 === c && 0 === e.$slides.length ? a(b).appendTo(e.$slideTrack) : d ? a(b).insertBefore(e.$slides.eq(c)) : a(b).insertAfter(e.$slides.eq(c)) : d === !0 ? a(b).prependTo(e.$slideTrack) : a(b).appendTo(e.$slideTrack), e.$slides = e.$slideTrack.children(this.options.slide), e.$slideTrack.children(this.options.slide).remove(), e.$slideTrack.append(e.$slides), e.$slidesCache = e.$slides, e.reinit()
    }, b.prototype.animateSlide = function(b, c) {
        var d = {},
            e = this;
        e.transformsEnabled === !1 ? e.options.vertical === !1 ? e.$slideTrack.animate({
            left: b
        }, e.options.speed, e.options.easing, c) : e.$slideTrack.animate({
            top: b
        }, e.options.speed, e.options.easing, c) : e.cssTransitions === !1 ? a({
            animStart: e.currentLeft
        }).animate({
            animStart: b
        }, {
            duration: e.options.speed,
            easing: e.options.easing,
            step: function(a) {
                e.options.vertical === !1 ? (d[e.animType] = "translate(" + a + "px, 0px)", e.$slideTrack.css(d)) : (d[e.animType] = "translate(0px," + a + "px)", e.$slideTrack.css(d))
            },
            complete: function() {
                c && c.call()
            }
        }) : (e.applyTransition(), d[e.animType] = e.options.vertical === !1 ? "translate3d(" + b + "px, 0px, 0px)" : "translate3d(0px," + b + "px, 0px)", e.$slideTrack.css(d), c && setTimeout(function() {
            e.disableTransition(), c.call()
        }, e.options.speed))
    }, b.prototype.applyTransition = function(a) {
        var b = this,
            c = {};
        c[b.transitionType] = b.options.fade === !1 ? b.transformType + " " + b.options.speed + "ms " + b.options.cssEase : "opacity " + b.options.speed + "ms " + b.options.cssEase, b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c)
    }, b.prototype.autoPlay = function() {
        var a = this;
        a.autoPlayTimer && clearInterval(a.autoPlayTimer), a.slideCount > a.options.slidesToShow && a.paused !== !0 && (a.autoPlayTimer = setInterval(a.autoPlayIterator, a.options.autoplaySpeed))
    }, b.prototype.autoPlayClear = function() {
        var a = this;
        a.autoPlayTimer && clearInterval(a.autoPlayTimer)
    }, b.prototype.autoPlayIterator = function() {
        var a = this;
        a.options.infinite === !1 ? 1 === a.direction ? (a.currentSlide + 1 === a.slideCount - 1 && (a.direction = 0), a.slideHandler(a.currentSlide + a.options.slidesToScroll)) : (0 === a.currentSlide - 1 && (a.direction = 1), a.slideHandler(a.currentSlide - a.options.slidesToScroll)) : a.slideHandler(a.currentSlide + a.options.slidesToScroll)
    }, b.prototype.buildArrows = function() {
        var b = this;
        b.options.arrows === !0 && b.slideCount > b.options.slidesToShow && (b.$prevArrow = a('<button type="button" class="slick-prev">Previous</button>').appendTo(b.$slider), b.$nextArrow = a('<button type="button" class="slick-next">Next</button>').appendTo(b.$slider), b.options.infinite !== !0 && b.$prevArrow.addClass("slick-disabled"))
    }, b.prototype.buildDots = function() {
        var b, c, d = this;
        if (d.options.dots === !0 && d.slideCount > d.options.slidesToShow) {
            for (c = '<ul class="slick-dots">', b = 0; b <= d.getDotCount(); b += 1) c += "<li>" + d.options.customPaging.call(this, d, b) + "</li>";
            c += "</ul>", d.$dots = a(c).appendTo(d.$slider), d.$dots.find("li").first().addClass("slick-active")
        }
    }, b.prototype.buildOut = function() {
        var b = this;
        b.$slides = b.$slider.children(b.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), b.slideCount = b.$slides.length, b.$slidesCache = b.$slides, b.$slider.addClass("slick-slider"), b.$slideTrack = 0 === b.slideCount ? a('<div class="slick-track"/>').appendTo(b.$slider) : b.$slides.wrapAll('<div class="slick-track"/>').parent(), b.$list = b.$slideTrack.wrap('<div class="slick-list"/>').parent(), b.$slideTrack.css("opacity", 0), b.options.centerMode === !0 && (b.options.infinite = !0, b.options.slidesToScroll = 1, 0 === b.options.slidesToShow % 2 && (b.options.slidesToShow = 3)), a("img[data-lazy]", b.$slider).not("[src]").addClass("slick-loading"), b.setupInfinite(), b.buildArrows(), b.buildDots(), b.options.accessibility === !0 && b.$list.prop("tabIndex", 0), b.setSlideClasses(0), b.options.draggable === !0 && b.$list.addClass("draggable")
    }, b.prototype.checkResponsive = function() {
        var b, c, d = this;
        if (d.originalSettings.responsive && d.originalSettings.responsive.length > -1 && null !== d.originalSettings.responsive) {
            c = null;
            for (b in d.breakpoints) d.breakpoints.hasOwnProperty(b) && a(window).width() < d.breakpoints[b] && (c = d.breakpoints[b]);
            null !== c ? null !== d.activeBreakpoint ? c !== d.activeBreakpoint && (d.activeBreakpoint = c, d.options = a.extend({}, d.defaults, d.breakpointSettings[c]), d.refresh()) : (d.activeBreakpoint = c, d.options = a.extend({}, d.defaults, d.breakpointSettings[c]), d.refresh()) : null !== d.activeBreakpoint && (d.activeBreakpoint = null, d.options = a.extend({}, d.defaults, d.originalSettings), d.refresh())
        }
    }, b.prototype.changeSlide = function(b) {
        var c = this;
        switch (b.data.message) {
            case "previous":
                c.slideHandler(c.currentSlide - c.options.slidesToScroll);
                break;
            case "next":
                c.slideHandler(c.currentSlide + c.options.slidesToScroll);
                break;
            case "index":
                c.slideHandler(a(b.target).parent().index() * c.options.slidesToScroll);
                break;
            default:
                return !1
        }
    }, b.prototype.destroy = function() {
        var b = this;
        b.autoPlayClear(), b.touchObject = {}, a(".slick-cloned", b.$slider).remove(), b.$dots && b.$dots.remove(), b.$prevArrow && (b.$prevArrow.remove(), b.$nextArrow.remove()), b.$slides.unwrap().unwrap(), b.$slides.removeClass("slick-slide slick-active slick-visible").removeAttr("style"), b.$slider.removeClass("slick-slider"), b.$slider.removeClass("slick-initialized"), b.$list.off(".slick"), a(window).off(".slick-" + b.instanceUid)
    }, b.prototype.disableTransition = function(a) {
        var b = this,
            c = {};
        c[b.transitionType] = "", b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c)
    }, b.prototype.fadeSlide = function(a, b) {
        var c = this;
        c.cssTransitions === !1 ? (c.$slides.eq(a).css({
            zIndex: 1e3
        }), c.$slides.eq(a).animate({
            opacity: 1
        }, c.options.speed, c.options.easing, b)) : (c.applyTransition(a), c.$slides.eq(a).css({
            opacity: 1,
            zIndex: 1e3
        }), b && setTimeout(function() {
            c.disableTransition(a), b.call()
        }, c.options.speed))
    }, b.prototype.filterSlides = function(a) {
        var b = this;
        null !== a && (b.unload(), b.$slideTrack.children(this.options.slide).remove(), b.$slidesCache.filter(a).appendTo(b.$slideTrack), b.reinit())
    }, b.prototype.getCurrent = function() {
        var a = this;
        return a.currentSlide
    }, b.prototype.getDotCount = function() {
        var a, b = this,
            c = 0,
            d = 0,
            e = 0;
        for (a = b.options.infinite === !0 ? b.slideCount + b.options.slidesToShow - b.options.slidesToScroll : b.slideCount; a > c;) e++, d += b.options.slidesToScroll, c = d + b.options.slidesToShow;
        return e
    }, b.prototype.getLeft = function(a) {
        var b, c, d = this,
            e = 0;
        return d.slideOffset = 0, c = d.$slides.first().outerHeight(), d.options.infinite === !0 ? (d.slideCount > d.options.slidesToShow && (d.slideOffset = -1 * d.slideWidth * d.options.slidesToShow, e = -1 * c * d.options.slidesToShow), 0 !== d.slideCount % d.options.slidesToScroll && a + d.options.slidesToScroll > d.slideCount && d.slideCount > d.options.slidesToShow && (d.slideOffset = -1 * d.slideCount % d.options.slidesToShow * d.slideWidth, e = -1 * d.slideCount % d.options.slidesToShow * c)) : 0 !== d.slideCount % d.options.slidesToShow && a + d.options.slidesToScroll > d.slideCount && d.slideCount > d.options.slidesToShow && (d.slideOffset = d.options.slidesToShow * d.slideWidth - d.slideCount % d.options.slidesToShow * d.slideWidth, e = d.slideCount % d.options.slidesToShow * c), d.options.centerMode === !0 && (d.slideOffset += d.slideWidth * Math.floor(d.options.slidesToShow / 2) - d.slideWidth), b = d.options.vertical === !1 ? -1 * a * d.slideWidth + d.slideOffset : -1 * a * c + e
    }, b.prototype.init = function() {
        var b = this;
        a(b.$slider).hasClass("slick-initialized") || (a(b.$slider).addClass("slick-initialized"), b.buildOut(), b.setProps(), b.startLoad(), b.loadSlider(), b.initializeEvents(), b.checkResponsive()), null !== b.options.onInit && b.options.onInit.call(this, b)
    }, b.prototype.initArrowEvents = function() {
        var a = this;
        a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.on("click.slick", {
            message: "previous"
        }, a.changeSlide), a.$nextArrow.on("click.slick", {
            message: "next"
        }, a.changeSlide))
    }, b.prototype.initDotEvents = function() {
        var b = this;
        b.options.dots === !0 && b.slideCount > b.options.slidesToShow && a("li", b.$dots).on("click.slick", {
            message: "index"
        }, b.changeSlide)
    }, b.prototype.initializeEvents = function() {
        var b = this;
        b.initArrowEvents(), b.initDotEvents(), b.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, b.swipeHandler), b.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, b.swipeHandler), b.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, b.swipeHandler), b.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, b.swipeHandler), b.options.pauseOnHover === !0 && b.options.autoplay === !0 && (b.$list.on("mouseenter.slick", b.autoPlayClear), b.$list.on("mouseleave.slick", b.autoPlay)), b.options.accessibility === !0 && b.$list.on("keydown.slick", b.keyHandler), a(window).on("orientationchange.slick.slick-" + b.instanceUid, function() {
            b.checkResponsive(), b.setPosition()
        }), a(window).on("resize.slick.slick-" + b.instanceUid, function() {
            a(window).width !== b.windowWidth && (clearTimeout(b.windowDelay), b.windowDelay = window.setTimeout(function() {
                b.windowWidth = a(window).width(), b.checkResponsive(), b.setPosition()
            }, 50))
        }), a(window).on("load.slick.slick-" + b.instanceUid, b.setPosition)
    }, b.prototype.initUI = function() {
        var a = this;
        a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.show(), a.$nextArrow.show()), a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.show(), a.options.autoplay === !0 && a.autoPlay()
    }, b.prototype.keyHandler = function(a) {
        var b = this;
        37 === a.keyCode ? b.changeSlide({
            data: {
                message: "previous"
            }
        }) : 39 === a.keyCode && b.changeSlide({
            data: {
                message: "next"
            }
        })
    }, b.prototype.lazyLoad = function() {
        var b, c, d, e, f = this;
        f.options.centerMode === !0 ? (d = f.options.slidesToShow + f.currentSlide - 1, e = d + f.options.slidesToShow + 2) : (d = f.options.infinite ? f.options.slidesToShow + f.currentSlide : f.currentSlide, e = d + f.options.slidesToShow), b = f.$slider.find(".slick-slide").slice(d, e), a("img[data-lazy]", b).not("[src]").each(function() {
            a(this).css({
                opacity: 0
            }).attr("src", a(this).attr("data-lazy")).removeClass("slick-loading").load(function() {
                a(this).animate({
                    opacity: 1
                }, 200)
            })
        }), f.currentSlide >= f.slideCount - f.options.slidesToShow ? (c = f.$slider.find(".slick-cloned").slice(0, f.options.slidesToShow), a("img[data-lazy]", c).not("[src]").each(function() {
            a(this).css({
                opacity: 0
            }).attr("src", a(this).attr("data-lazy")).removeClass("slick-loading").load(function() {
                a(this).animate({
                    opacity: 1
                }, 200)
            })
        })) : 0 === f.currentSlide && (c = f.$slider.find(".slick-cloned").slice(-1 * f.options.slidesToShow), a("img[data-lazy]", c).not("[src]").each(function() {
            a(this).css({
                opacity: 0
            }).attr("src", a(this).attr("data-lazy")).removeClass("slick-loading").load(function() {
                a(this).animate({
                    opacity: 1
                }, 200)
            })
        }))
    }, b.prototype.loadSlider = function() {
        var a = this;
        a.setPosition(), a.$slideTrack.css({
            opacity: 1
        }), a.$slider.removeClass("slick-loading"), a.initUI(), "progressive" === a.options.lazyLoad && a.progressiveLazyLoad()
    }, b.prototype.postSlide = function(a) {
        var b = this;
        null !== b.options.onAfterChange && b.options.onAfterChange.call(this, b, a), b.animating = !1, b.setPosition(), b.swipeLeft = null, b.options.autoplay === !0 && b.paused === !1 && b.autoPlay()
    }, b.prototype.progressiveLazyLoad = function() {
        var b, c, d = this;
        b = a("img[data-lazy]").not("[src]").length, b > 0 && (c = a(a("img[data-lazy]", d.$slider).not("[src]").get(0)), c.attr("src", c.attr("data-lazy")).removeClass("slick-loading").load(function() {
            d.progressiveLazyLoad()
        }))
    }, b.prototype.refresh = function() {
        var b = this;
        b.destroy(), a.extend(b, b.initials), b.init()
    }, b.prototype.reinit = function() {
        var a = this;
        a.$slides = a.$slideTrack.children(a.options.slide).addClass("slick-slide"), a.slideCount = a.$slides.length, a.currentSlide >= a.slideCount && 0 !== a.currentSlide && (a.currentSlide = a.currentSlide - a.options.slidesToScroll), a.setProps(), a.setupInfinite(), a.buildArrows(), a.updateArrows(), a.initArrowEvents(), a.buildDots(), a.updateDots(), a.initDotEvents(), a.setSlideClasses(0), a.setPosition(), null !== a.options.onReInit && a.options.onReInit.call(this, a)
    }, b.prototype.removeSlide = function(a, b) {
        var c = this;
        return "boolean" == typeof a ? (b = a, a = b === !0 ? 0 : c.slideCount - 1) : a = b === !0 ? --a : a, c.slideCount < 1 || 0 > a || a > c.slideCount - 1 ? !1 : (c.unload(), c.$slideTrack.children(this.options.slide).eq(a).remove(), c.$slides = c.$slideTrack.children(this.options.slide), c.$slideTrack.children(this.options.slide).remove(), c.$slideTrack.append(c.$slides), c.$slidesCache = c.$slides, void c.reinit())
    }, b.prototype.setCSS = function(a) {
        var b, c, d = this,
            e = {};
        b = "left" == d.positionProp ? a + "px" : "0px", c = "top" == d.positionProp ? a + "px" : "0px", e[d.positionProp] = a, d.transformsEnabled === !1 ? d.$slideTrack.css(e) : (e = {}, d.cssTransitions === !1 ? (e[d.animType] = "translate(" + b + ", " + c + ")", d.$slideTrack.css(e)) : (e[d.animType] = "translate3d(" + b + ", " + c + ", 0px)", d.$slideTrack.css(e)))
    }, b.prototype.setDimensions = function() {
        var a = this;
        a.options.centerMode === !0 ? a.$slideTrack.children(".slick-slide").width(a.slideWidth) : a.$slideTrack.children(".slick-slide").width(a.slideWidth), a.options.vertical === !1 ? (a.$slideTrack.width(Math.ceil(a.slideWidth * a.$slideTrack.children(".slick-slide").length)), a.options.centerMode === !0 && a.$list.css({
            padding: "0px " + a.options.centerPadding
        })) : (a.$list.height(a.$slides.first().outerHeight() * a.options.slidesToShow), a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight() * a.$slideTrack.children(".slick-slide").length)), a.options.centerMode === !0 && a.$list.css({
            padding: a.options.centerPadding + " 0px"
        }))
    }, b.prototype.setFade = function() {
        var b, c = this;
        c.$slides.each(function(d, e) {
            b = -1 * c.slideWidth * d, a(e).css({
                position: "relative",
                left: b,
                top: 0,
                zIndex: 800,
                opacity: 0
            })
        }), c.$slides.eq(c.currentSlide).css({
            zIndex: 900,
            opacity: 1
        })
    }, b.prototype.setPosition = function() {
        var a = this;
        a.setValues(), a.setDimensions(), a.options.fade === !1 ? a.setCSS(a.getLeft(a.currentSlide)) : a.setFade()
    }, b.prototype.setProps = function() {
        var a = this;
        a.positionProp = a.options.vertical === !0 ? "top" : "left", "top" === a.positionProp ? a.$slider.addClass("slick-vertical") : a.$slider.removeClass("slick-vertical"), (void 0 !== document.body.style.WebkitTransition || void 0 !== document.body.style.MozTransition || void 0 !== document.body.style.msTransition) && a.options.useCSS === !0 && (a.cssTransitions = !0), void 0 !== document.body.style.MozTransform && (a.animType = "MozTransform", a.transformType = "-moz-transform", a.transitionType = "MozTransition"), void 0 !== document.body.style.webkitTransform && (a.animType = "webkitTransform", a.transformType = "-webkit-transform", a.transitionType = "webkitTransition"), void 0 !== document.body.style.msTransform && (a.animType = "transform", a.transformType = "transform", a.transitionType = "transition"), a.transformsEnabled = null !== a.animType
    }, b.prototype.setValues = function() {
        var a = this;
        a.listWidth = a.$list.width(), a.listHeight = a.$list.height(), a.slideWidth = a.options.vertical === !1 ? Math.ceil(a.listWidth / a.options.slidesToShow) : Math.ceil(a.listWidth)
    }, b.prototype.setSlideClasses = function(a) {
        var b, c, d, e = this;
        e.$slider.find(".slick-slide").removeClass("slick-active").removeClass("slick-center"), c = e.$slider.find(".slick-slide"), e.options.centerMode === !0 ? (b = Math.floor(e.options.slidesToShow / 2), a >= b && a <= e.slideCount - 1 - b ? e.$slides.slice(a - b, a + b + 1).addClass("slick-active") : (d = e.options.slidesToShow + a, c.slice(d - b + 1, d + b + 2).addClass("slick-active")), 0 === a ? c.eq(c.length - 1 - e.options.slidesToShow).addClass("slick-center") : a === e.slideCount - 1 && c.eq(e.options.slidesToShow).addClass("slick-center"), e.$slides.eq(a).addClass("slick-center")) : a > 0 && a < e.slideCount - e.options.slidesToShow ? e.$slides.slice(a, a + e.options.slidesToShow).addClass("slick-active") : (d = e.options.infinite === !0 ? e.options.slidesToShow + a : a, c.slice(d, d + e.options.slidesToShow).addClass("slick-active")), "ondemand" === e.options.lazyLoad && e.lazyLoad()
    }, b.prototype.setupInfinite = function() {
        var b, c, d, e = this;
        if ((e.options.fade === !0 || e.options.vertical === !0) && (e.options.centerMode = !1), e.options.infinite === !0 && e.options.fade === !1 && (c = null, e.slideCount > e.options.slidesToShow)) {
            for (d = e.options.centerMode === !0 ? e.options.slidesToShow + 1 : e.options.slidesToShow, b = e.slideCount; b > e.slideCount - d; b -= 1) c = b - 1, a(e.$slides[c]).clone().attr("id", "").prependTo(e.$slideTrack).addClass("slick-cloned");
            for (b = 0; d > b; b += 1) c = b, a(e.$slides[c]).clone().attr("id", "").appendTo(e.$slideTrack).addClass("slick-cloned");
            e.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                a(this).attr("id", "")
            })
        }
    }, b.prototype.slideHandler = function(a) {
        var b, c, d, e, f = null,
            g = this;
        return g.animating === !0 ? !1 : (b = a, f = g.getLeft(b), d = g.getLeft(g.currentSlide), e = 0 !== g.slideCount % g.options.slidesToScroll ? g.options.slidesToScroll : 0, g.currentLeft = null === g.swipeLeft ? d : g.swipeLeft, g.options.infinite === !1 && (0 > a || a > g.slideCount - g.options.slidesToShow + e) ? (g.options.fade === !1 && (b = g.currentSlide, g.animateSlide(d, function() {
            g.postSlide(b)
        })), !1) : (g.options.autoplay === !0 && clearInterval(g.autoPlayTimer), c = 0 > b ? 0 !== g.slideCount % g.options.slidesToScroll ? g.slideCount - g.slideCount % g.options.slidesToScroll : g.slideCount - g.options.slidesToScroll : b > g.slideCount - 1 ? 0 : b, g.animating = !0, null !== g.options.onBeforeChange && a !== g.currentSlide && g.options.onBeforeChange.call(this, g, g.currentSlide, c), g.currentSlide = c, g.setSlideClasses(g.currentSlide), g.updateDots(), g.updateArrows(), g.options.fade === !0 ? (g.fadeSlide(c, function() {
            g.postSlide(c)
        }), !1) : void g.animateSlide(f, function() {
            g.postSlide(c)
        })))
    }, b.prototype.startLoad = function() {
        var a = this;
        a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.hide(), a.$nextArrow.hide()), a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.hide(), a.$slider.addClass("slick-loading")
    }, b.prototype.swipeDirection = function() {
        var a, b, c, d, e = this;
        return a = e.touchObject.startX - e.touchObject.curX, b = e.touchObject.startY - e.touchObject.curY, c = Math.atan2(b, a), d = Math.round(180 * c / Math.PI), 0 > d && (d = 360 - Math.abs(d)), 45 >= d && d >= 0 ? "left" : 360 >= d && d >= 315 ? "left" : d >= 135 && 225 >= d ? "right" : "vertical"
    }, b.prototype.swipeEnd = function(b) {
        var c = this;
        if (c.$list.removeClass("dragging"), void 0 === c.touchObject.curX) return !1;
        if (c.touchObject.swipeLength >= c.touchObject.minSwipe) switch (a(b.target).on("click.slick", function(b) {
            b.stopImmediatePropagation(), b.stopPropagation(), b.preventDefault(), a(b.target).off("click.slick")
        }), c.swipeDirection()) {
            case "left":
                c.slideHandler(c.currentSlide + c.options.slidesToScroll), c.touchObject = {};
                break;
            case "right":
                c.slideHandler(c.currentSlide - c.options.slidesToScroll), c.touchObject = {}
        } else c.touchObject.startX !== c.touchObject.curX && (c.slideHandler(c.currentSlide), c.touchObject = {})
    }, b.prototype.swipeHandler = function(a) {
        var b = this;
        if ("ontouchend" in document && b.options.swipe === !1) return !1;
        if (b.options.draggable === !1 && !a.originalEvent.touches) return !0;
        switch (b.touchObject.fingerCount = a.originalEvent && void 0 !== a.originalEvent.touches ? a.originalEvent.touches.length : 1, b.touchObject.minSwipe = b.listWidth / b.options.touchThreshold, a.data.action) {
            case "start":
                b.swipeStart(a);
                break;
            case "move":
                b.swipeMove(a);
                break;
            case "end":
                b.swipeEnd(a)
        }
    }, b.prototype.swipeMove = function(a) {
        var b, c, d, e, f = this;
        return e = void 0 !== a.originalEvent ? a.originalEvent.touches : null, b = f.getLeft(f.currentSlide), !f.$list.hasClass("dragging") || e && 1 !== e.length ? !1 : (f.touchObject.curX = void 0 !== e ? e[0].pageX : a.clientX, f.touchObject.curY = void 0 !== e ? e[0].pageY : a.clientY, f.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(f.touchObject.curX - f.touchObject.startX, 2))), c = f.swipeDirection(), "vertical" !== c ? (void 0 !== a.originalEvent && f.touchObject.swipeLength > 4 && a.preventDefault(), d = f.touchObject.curX > f.touchObject.startX ? 1 : -1, f.swipeLeft = f.options.vertical === !1 ? b + f.touchObject.swipeLength * d : b + f.touchObject.swipeLength * (f.$list.height() / f.listWidth) * d, f.options.fade === !0 || f.options.touchMove === !1 ? !1 : f.animating === !0 ? (f.swipeLeft = null, !1) : void f.setCSS(f.swipeLeft)) : void 0)
    }, b.prototype.swipeStart = function(a) {
        var b, c = this;
        return 1 !== c.touchObject.fingerCount || c.slideCount <= c.options.slidesToShow ? (c.touchObject = {}, !1) : (void 0 !== a.originalEvent && void 0 !== a.originalEvent.touches && (b = a.originalEvent.touches[0]), c.touchObject.startX = c.touchObject.curX = void 0 !== b ? b.pageX : a.clientX, c.touchObject.startY = c.touchObject.curY = void 0 !== b ? b.pageY : a.clientY, void c.$list.addClass("dragging"))
    }, b.prototype.unfilterSlides = function() {
        var a = this;
        null !== a.$slidesCache && (a.unload(), a.$slideTrack.children(this.options.slide).remove(), a.$slidesCache.appendTo(a.$slideTrack), a.reinit())
    }, b.prototype.unload = function() {
        var b = this;
        a(".slick-cloned", b.$slider).remove(), b.$dots && b.$dots.remove(), b.$prevArrow && (b.$prevArrow.remove(), b.$nextArrow.remove()), b.$slides.removeClass("slick-slide slick-active slick-visible").removeAttr("style")
    }, b.prototype.updateArrows = function() {
        var a = this;
        a.options.arrows === !0 && a.options.infinite !== !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.removeClass("slick-disabled"), a.$nextArrow.removeClass("slick-disabled"), 0 === a.currentSlide ? (a.$prevArrow.addClass("slick-disabled"), a.$nextArrow.removeClass("slick-disabled")) : a.currentSlide >= a.slideCount - a.options.slidesToShow && (a.$nextArrow.addClass("slick-disabled"), a.$prevArrow.removeClass("slick-disabled")))
    }, b.prototype.updateDots = function() {
        var a = this;
        null !== a.$dots && (a.$dots.find("li").removeClass("slick-active"), a.$dots.find("li").eq(a.currentSlide / a.options.slidesToScroll).addClass("slick-active"))
    }, a.fn.slick = function(a) {
        var c = this;
        return c.each(function(c, d) {
            d.slick = new b(d, a)
        })
    }, a.fn.slickAdd = function(a, b, c) {
        var d = this;
        return d.each(function(d, e) {
            e.slick.addSlide(a, b, c)
        })
    }, a.fn.slickCurrentSlide = function() {
        var a = this;
        return a.get(0).slick.getCurrent()
    }, a.fn.slickFilter = function(a) {
        var b = this;
        return b.each(function(b, c) {
            c.slick.filterSlides(a)
        })
    }, a.fn.slickGoTo = function(a) {
        var b = this;
        return b.each(function(b, c) {
            c.slick.slideHandler(a)
        })
    }, a.fn.slickNext = function() {
        var a = this;
        return a.each(function(a, b) {
            b.slick.changeSlide({
                data: {
                    message: "next"
                }
            })
        })
    }, a.fn.slickPause = function() {
        var a = this;
        return a.each(function(a, b) {
            b.slick.autoPlayClear(), b.slick.paused = !0
        })
    }, a.fn.slickPlay = function() {
        var a = this;
        return a.each(function(a, b) {
            b.slick.paused = !1, b.slick.autoPlay()
        })
    }, a.fn.slickPrev = function() {
        var a = this;
        return a.each(function(a, b) {
            b.slick.changeSlide({
                data: {
                    message: "previous"
                }
            })
        })
    }, a.fn.slickRemove = function(a, b) {
        var c = this;
        return c.each(function(c, d) {
            d.slick.removeSlide(a, b)
        })
    }, a.fn.slickSetOption = function(a, b, c) {
        var d = this;
        return d.each(function(d, e) {
            e.slick.options[a] = b, c === !0 && (e.slick.unload(), e.slick.reinit())
        })
    }, a.fn.slickUnfilter = function() {
        var a = this;
        return a.each(function(a, b) {
            b.slick.unfilterSlides()
        })
    }, a.fn.unslick = function() {
        var a = this;
        return a.each(function(a, b) {
            b.slick.destroy()
        })
    }
}),
function() {
    var a = [].indexOf || function(a) {
            for (var b = 0, c = this.length; c > b; b++)
                if (b in this && this[b] === a) return b;
            return -1
        },
        b = [].slice;
    ! function(a, b) {
        return "function" == typeof define && define.amd ? define("waypoints", ["jquery"], function(c) {
            return b(c, a)
        }) : b(a.jQuery, a)
    }(this, function(c, d) {
        var e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t;
        return e = c(d), l = a.call(d, "ontouchstart") >= 0, h = {
            horizontal: {},
            vertical: {}
        }, i = 1, k = {}, j = "waypoints-context-id", o = "resize.waypoints", p = "scroll.waypoints", q = 1, r = "waypoints-waypoint-ids", s = "waypoint", t = "waypoints", f = function() {
            function a(a) {
                var b = this;
                this.$element = a, this.element = a[0], this.didResize = !1, this.didScroll = !1, this.id = "context" + i++, this.oldScroll = {
                    x: a.scrollLeft(),
                    y: a.scrollTop()
                }, this.waypoints = {
                    horizontal: {},
                    vertical: {}
                }, a.data(j, this.id), k[this.id] = this, a.bind(p, function() {
                    var a;
                    return b.didScroll || l ? void 0 : (b.didScroll = !0, a = function() {
                        return b.doScroll(), b.didScroll = !1
                    }, d.setTimeout(a, c[t].settings.scrollThrottle))
                }), a.bind(o, function() {
                    var a;
                    return b.didResize ? void 0 : (b.didResize = !0, a = function() {
                        return c[t]("refresh"), b.didResize = !1
                    }, d.setTimeout(a, c[t].settings.resizeThrottle))
                })
            }
            return a.prototype.doScroll = function() {
                var a, b = this;
                return a = {
                    horizontal: {
                        newScroll: this.$element.scrollLeft(),
                        oldScroll: this.oldScroll.x,
                        forward: "right",
                        backward: "left"
                    },
                    vertical: {
                        newScroll: this.$element.scrollTop(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up"
                    }
                }, !l || a.vertical.oldScroll && a.vertical.newScroll || c[t]("refresh"), c.each(a, function(a, d) {
                    var e, f, g;
                    return g = [], f = d.newScroll > d.oldScroll, e = f ? d.forward : d.backward, c.each(b.waypoints[a], function(a, b) {
                        var c, e;
                        return d.oldScroll < (c = b.offset) && c <= d.newScroll ? g.push(b) : d.newScroll < (e = b.offset) && e <= d.oldScroll ? g.push(b) : void 0
                    }), g.sort(function(a, b) {
                        return a.offset - b.offset
                    }), f || g.reverse(), c.each(g, function(a, b) {
                        return b.options.continuous || a === g.length - 1 ? b.trigger([e]) : void 0
                    })
                }), this.oldScroll = {
                    x: a.horizontal.newScroll,
                    y: a.vertical.newScroll
                }
            }, a.prototype.refresh = function() {
                var a, b, d, e = this;
                return d = c.isWindow(this.element), b = this.$element.offset(), this.doScroll(), a = {
                    horizontal: {
                        contextOffset: d ? 0 : b.left,
                        contextScroll: d ? 0 : this.oldScroll.x,
                        contextDimension: this.$element.width(),
                        oldScroll: this.oldScroll.x,
                        forward: "right",
                        backward: "left",
                        offsetProp: "left"
                    },
                    vertical: {
                        contextOffset: d ? 0 : b.top,
                        contextScroll: d ? 0 : this.oldScroll.y,
                        contextDimension: d ? c[t]("viewportHeight") : this.$element.height(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up",
                        offsetProp: "top"
                    }
                }, c.each(a, function(a, b) {
                    return c.each(e.waypoints[a], function(a, d) {
                        var e, f, g, h, i;
                        return e = d.options.offset, g = d.offset, f = c.isWindow(d.element) ? 0 : d.$element.offset()[b.offsetProp], c.isFunction(e) ? e = e.apply(d.element) : "string" == typeof e && (e = parseFloat(e), d.options.offset.indexOf("%") > -1 && (e = Math.ceil(b.contextDimension * e / 100))), d.offset = f - b.contextOffset + b.contextScroll - e, d.options.onlyOnScroll && null != g || !d.enabled ? void 0 : null !== g && g < (h = b.oldScroll) && h <= d.offset ? d.trigger([b.backward]) : null !== g && g > (i = b.oldScroll) && i >= d.offset ? d.trigger([b.forward]) : null === g && b.oldScroll >= d.offset ? d.trigger([b.forward]) : void 0
                    })
                })
            }, a.prototype.checkEmpty = function() {
                return c.isEmptyObject(this.waypoints.horizontal) && c.isEmptyObject(this.waypoints.vertical) ? (this.$element.unbind([o, p].join(" ")), delete k[this.id]) : void 0
            }, a
        }(), g = function() {
            function a(a, b, d) {
                var e, f;
                d = c.extend({}, c.fn[s].defaults, d), "bottom-in-view" === d.offset && (d.offset = function() {
                    var a;
                    return a = c[t]("viewportHeight"), c.isWindow(b.element) || (a = b.$element.height()), a - c(this).outerHeight()
                }), this.$element = a, this.element = a[0], this.axis = d.horizontal ? "horizontal" : "vertical", this.callback = d.handler, this.context = b, this.enabled = d.enabled, this.id = "waypoints" + q++, this.offset = null, this.options = d, b.waypoints[this.axis][this.id] = this, h[this.axis][this.id] = this, e = null != (f = a.data(r)) ? f : [], e.push(this.id), a.data(r, e)
            }
            return a.prototype.trigger = function(a) {
                return this.enabled ? (null != this.callback && this.callback.apply(this.element, a), this.options.triggerOnce ? this.destroy() : void 0) : void 0
            }, a.prototype.disable = function() {
                return this.enabled = !1
            }, a.prototype.enable = function() {
                return this.context.refresh(), this.enabled = !0
            }, a.prototype.destroy = function() {
                return delete h[this.axis][this.id], delete this.context.waypoints[this.axis][this.id], this.context.checkEmpty()
            }, a.getWaypointsByElement = function(a) {
                var b, d;
                return (d = c(a).data(r)) ? (b = c.extend({}, h.horizontal, h.vertical), c.map(d, function(a) {
                    return b[a]
                })) : []
            }, a
        }(), n = {
            init: function(a, b) {
                var d;
                return null == b && (b = {}), null == (d = b.handler) && (b.handler = a), this.each(function() {
                    var a, d, e, h;
                    return a = c(this), e = null != (h = b.context) ? h : c.fn[s].defaults.context, c.isWindow(e) || (e = a.closest(e)), e = c(e), d = k[e.data(j)], d || (d = new f(e)), new g(a, d, b)
                }), c[t]("refresh"), this
            },
            disable: function() {
                return n._invoke(this, "disable")
            },
            enable: function() {
                return n._invoke(this, "enable")
            },
            destroy: function() {
                return n._invoke(this, "destroy")
            },
            prev: function(a, b) {
                return n._traverse.call(this, a, b, function(a, b, c) {
                    return b > 0 ? a.push(c[b - 1]) : void 0
                })
            },
            next: function(a, b) {
                return n._traverse.call(this, a, b, function(a, b, c) {
                    return b < c.length - 1 ? a.push(c[b + 1]) : void 0
                })
            },
            _traverse: function(a, b, e) {
                var f, g;
                return null == a && (a = "vertical"), null == b && (b = d), g = m.aggregate(b), f = [], this.each(function() {
                    var b;
                    return b = c.inArray(this, g[a]), e(f, b, g[a])
                }), this.pushStack(f)
            },
            _invoke: function(a, b) {
                return a.each(function() {
                    var a;
                    return a = g.getWaypointsByElement(this), c.each(a, function(a, c) {
                        return c[b](), !0
                    })
                }), this
            }
        }, c.fn[s] = function() {
            var a, d;
            return d = arguments[0], a = 2 <= arguments.length ? b.call(arguments, 1) : [], n[d] ? n[d].apply(this, a) : c.isFunction(d) ? n.init.apply(this, arguments) : c.isPlainObject(d) ? n.init.apply(this, [null, d]) : d ? c.error("The " + d + " method does not exist in jQuery Waypoints.") : c.error("jQuery Waypoints needs a callback function or handler option.")
        }, c.fn[s].defaults = {
            context: d,
            continuous: !0,
            enabled: !0,
            horizontal: !1,
            offset: 0,
            triggerOnce: !1
        }, m = {
            refresh: function() {
                return c.each(k, function(a, b) {
                    return b.refresh()
                })
            },
            viewportHeight: function() {
                var a;
                return null != (a = d.innerHeight) ? a : e.height()
            },
            aggregate: function(a) {
                var b, d, e;
                return b = h, a && (b = null != (e = k[c(a).data(j)]) ? e.waypoints : void 0), b ? (d = {
                    horizontal: [],
                    vertical: []
                }, c.each(d, function(a, e) {
                    return c.each(b[a], function(a, b) {
                        return e.push(b)
                    }), e.sort(function(a, b) {
                        return a.offset - b.offset
                    }), d[a] = c.map(e, function(a) {
                        return a.element
                    }), d[a] = c.unique(d[a])
                }), d) : []
            },
            above: function(a) {
                return null == a && (a = d), m._filter(a, "vertical", function(a, b) {
                    return b.offset <= a.oldScroll.y
                })
            },
            below: function(a) {
                return null == a && (a = d), m._filter(a, "vertical", function(a, b) {
                    return b.offset > a.oldScroll.y
                })
            },
            left: function(a) {
                return null == a && (a = d), m._filter(a, "horizontal", function(a, b) {
                    return b.offset <= a.oldScroll.x
                })
            },
            right: function(a) {
                return null == a && (a = d), m._filter(a, "horizontal", function(a, b) {
                    return b.offset > a.oldScroll.x
                })
            },
            enable: function() {
                return m._invoke("enable")
            },
            disable: function() {
                return m._invoke("disable")
            },
            destroy: function() {
                return m._invoke("destroy")
            },
            extendFn: function(a, b) {
                return n[a] = b
            },
            _invoke: function(a) {
                var b;
                return b = c.extend({}, h.vertical, h.horizontal), c.each(b, function(b, c) {
                    return c[a](), !0
                })
            },
            _filter: function(a, b, d) {
                var e, f;
                return (e = k[c(a).data(j)]) ? (f = [], c.each(e.waypoints[b], function(a, b) {
                    return d(e, b) ? f.push(b) : void 0
                }), f.sort(function(a, b) {
                    return a.offset - b.offset
                }), c.map(f, function(a) {
                    return a.element
                })) : []
            }
        }, c[t] = function() {
            var a, c;
            return c = arguments[0], a = 2 <= arguments.length ? b.call(arguments, 1) : [], m[c] ? m[c].apply(null, a) : m.aggregate.call(null, c)
        }, c[t].settings = {
            resizeThrottle: 100,
            scrollThrottle: 30
        }, e.load(function() {
            return c[t]("refresh")
        })
    })
}.call(this),
    function(a, b) {
        "use strict";

        function c() {
            if (!d.READY) {
                d.event.determineEventTypes();
                for (var a in d.gestures) d.gestures.hasOwnProperty(a) && d.detection.register(d.gestures[a]);
                d.event.onTouch(d.DOCUMENT, d.EVENT_MOVE, d.detection.detect), d.event.onTouch(d.DOCUMENT, d.EVENT_END, d.detection.detect), d.READY = !0
            }
        }
        var d = function(a, b) {
            return new d.Instance(a, b || {})
        };
        d.defaults = {
            stop_browser_behavior: {
                userSelect: "none",
                touchAction: "inherit",
                touchCallout: "none",
                contentZooming: "none",
                userDrag: "none",
                tapHighlightColor: "rgba(0,0,0,0)"
            }
        }, d.HAS_POINTEREVENTS = navigator.pointerEnabled || navigator.msPointerEnabled, d.HAS_TOUCHEVENTS = "ontouchstart" in a, d.MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i, d.NO_MOUSEEVENTS = d.HAS_TOUCHEVENTS && navigator.userAgent.match(d.MOBILE_REGEX), d.EVENT_TYPES = {}, d.DIRECTION_DOWN = "down", d.DIRECTION_LEFT = "left", d.DIRECTION_UP = "up", d.DIRECTION_RIGHT = "right", d.POINTER_MOUSE = "mouse", d.POINTER_TOUCH = "touch", d.POINTER_PEN = "pen", d.EVENT_START = "start", d.EVENT_MOVE = "move", d.EVENT_END = "end", d.DOCUMENT = document, d.plugins = {}, d.READY = !1, d.Instance = function(a, b) {
            var e = this;
            return c(), this.element = a, this.enabled = !0, this.options = d.utils.extend(d.utils.extend({}, d.defaults), b || {}), this.options.stop_browser_behavior && d.utils.stopDefaultBrowserBehavior(this.element, this.options.stop_browser_behavior), d.event.onTouch(a, d.EVENT_START, function(a) {
                e.enabled && d.detection.startDetect(e, a)
            }), this
        }, d.Instance.prototype = {
            on: function(a, b) {
                for (var c = a.split(" "), d = 0; c.length > d; d++) this.element.addEventListener(c[d], b, !1);
                return this
            },
            off: function(a, b) {
                for (var c = a.split(" "), d = 0; c.length > d; d++) this.element.removeEventListener(c[d], b, !1);
                return this
            },
            trigger: function(a, b) {
                var c = d.DOCUMENT.createEvent("Event");
                c.initEvent(a, !0, !0), c.gesture = b;
                var e = this.element;
                return d.utils.hasParent(b.target, e) && (e = b.target), e.dispatchEvent(c), this
            },
            enable: function(a) {
                return this.enabled = a, this
            }
        };
        var e = null,
            f = !1,
            g = !1;
        d.event = {
            bindDom: function(a, b, c) {
                for (var d = b.split(" "), e = 0; d.length > e; e++) a.addEventListener(d[e], c, !1)
            },
            onTouch: function(a, b, c) {
                var h = this;
                this.bindDom(a, d.EVENT_TYPES[b], function(i) {
                    var j = i.type.toLowerCase();
                    if (!j.match(/mouse/) || !g) {
                        (j.match(/touch/) || j.match(/pointerdown/) || j.match(/mouse/) && 1 === i.which) && (f = !0), j.match(/touch|pointer/) && (g = !0);
                        var k = 0;
                        f && (d.HAS_POINTEREVENTS && b != d.EVENT_END ? k = d.PointerEvent.updatePointer(b, i) : j.match(/touch/) ? k = i.touches.length : g || (k = j.match(/up/) ? 0 : 1), k > 0 && b == d.EVENT_END ? b = d.EVENT_MOVE : k || (b = d.EVENT_END), k || null === e ? e = i : i = e, c.call(d.detection, h.collectEventData(a, b, i)), d.HAS_POINTEREVENTS && b == d.EVENT_END && (k = d.PointerEvent.updatePointer(b, i))), k || (e = null, f = !1, g = !1, d.PointerEvent.reset())
                    }
                })
            },
            determineEventTypes: function() {
                var a;
                a = d.HAS_POINTEREVENTS ? d.PointerEvent.getEvents() : d.NO_MOUSEEVENTS ? ["touchstart", "touchmove", "touchend touchcancel"] : ["touchstart mousedown", "touchmove mousemove", "touchend touchcancel mouseup"], d.EVENT_TYPES[d.EVENT_START] = a[0], d.EVENT_TYPES[d.EVENT_MOVE] = a[1], d.EVENT_TYPES[d.EVENT_END] = a[2]
            },
            getTouchList: function(a) {
                return d.HAS_POINTEREVENTS ? d.PointerEvent.getTouchList() : a.touches ? a.touches : [{
                    identifier: 1,
                    pageX: a.pageX,
                    pageY: a.pageY,
                    target: a.target
                }]
            },
            collectEventData: function(a, b, c) {
                var e = this.getTouchList(c, b),
                    f = d.POINTER_TOUCH;
                return (c.type.match(/mouse/) || d.PointerEvent.matchType(d.POINTER_MOUSE, c)) && (f = d.POINTER_MOUSE), {
                    center: d.utils.getCenter(e),
                    timeStamp: (new Date).getTime(),
                    target: c.target,
                    touches: e,
                    eventType: b,
                    pointerType: f,
                    srcEvent: c,
                    preventDefault: function() {
                        this.srcEvent.preventManipulation && this.srcEvent.preventManipulation(), this.srcEvent.preventDefault && this.srcEvent.preventDefault()
                    },
                    stopPropagation: function() {
                        this.srcEvent.stopPropagation()
                    },
                    stopDetect: function() {
                        return d.detection.stopDetect()
                    }
                }
            }
        }, d.PointerEvent = {
            pointers: {},
            getTouchList: function() {
                var a = this,
                    b = [];
                return Object.keys(a.pointers).sort().forEach(function(c) {
                    b.push(a.pointers[c])
                }), b
            },
            updatePointer: function(a, b) {
                return a == d.EVENT_END ? this.pointers = {} : (b.identifier = b.pointerId, this.pointers[b.pointerId] = b), Object.keys(this.pointers).length
            },
            matchType: function(a, b) {
                if (!b.pointerType) return !1;
                var c = {};
                return c[d.POINTER_MOUSE] = b.pointerType == b.MSPOINTER_TYPE_MOUSE || b.pointerType == d.POINTER_MOUSE, c[d.POINTER_TOUCH] = b.pointerType == b.MSPOINTER_TYPE_TOUCH || b.pointerType == d.POINTER_TOUCH, c[d.POINTER_PEN] = b.pointerType == b.MSPOINTER_TYPE_PEN || b.pointerType == d.POINTER_PEN, c[a]
            },
            getEvents: function() {
                return ["pointerdown MSPointerDown", "pointermove MSPointerMove", "pointerup pointercancel MSPointerUp MSPointerCancel"]
            },
            reset: function() {
                this.pointers = {}
            }
        }, d.utils = {
            extend: function(a, c, d) {
                for (var e in c) a[e] !== b && d || (a[e] = c[e]);
                return a
            },
            hasParent: function(a, b) {
                for (; a;) {
                    if (a == b) return !0;
                    a = a.parentNode
                }
                return !1
            },
            getCenter: function(a) {
                for (var b = [], c = [], d = 0, e = a.length; e > d; d++) b.push(a[d].pageX), c.push(a[d].pageY);
                return {
                    pageX: (Math.min.apply(Math, b) + Math.max.apply(Math, b)) / 2,
                    pageY: (Math.min.apply(Math, c) + Math.max.apply(Math, c)) / 2
                }
            },
            getVelocity: function(a, b, c) {
                return {
                    x: Math.abs(b / a) || 0,
                    y: Math.abs(c / a) || 0
                }
            },
            getAngle: function(a, b) {
                var c = b.pageY - a.pageY,
                    d = b.pageX - a.pageX;
                return 180 * Math.atan2(c, d) / Math.PI
            },
            getDirection: function(a, b) {
                var c = Math.abs(a.pageX - b.pageX),
                    e = Math.abs(a.pageY - b.pageY);
                return c >= e ? a.pageX - b.pageX > 0 ? d.DIRECTION_LEFT : d.DIRECTION_RIGHT : a.pageY - b.pageY > 0 ? d.DIRECTION_UP : d.DIRECTION_DOWN
            },
            getDistance: function(a, b) {
                var c = b.pageX - a.pageX,
                    d = b.pageY - a.pageY;
                return Math.sqrt(c * c + d * d)
            },
            getScale: function(a, b) {
                return a.length >= 2 && b.length >= 2 ? this.getDistance(b[0], b[1]) / this.getDistance(a[0], a[1]) : 1
            },
            getRotation: function(a, b) {
                return a.length >= 2 && b.length >= 2 ? this.getAngle(b[1], b[0]) - this.getAngle(a[1], a[0]) : 0
            },
            isVertical: function(a) {
                return a == d.DIRECTION_UP || a == d.DIRECTION_DOWN
            },
            stopDefaultBrowserBehavior: function(a, b) {
                var c, d = ["webkit", "khtml", "moz", "ms", "o", ""];
                if (b && a.style) {
                    for (var e = 0; d.length > e; e++)
                        for (var f in b) b.hasOwnProperty(f) && (c = f, d[e] && (c = d[e] + c.substring(0, 1).toUpperCase() + c.substring(1)), a.style[c] = b[f]);
                    "none" == b.userSelect && (a.onselectstart = function() {
                        return !1
                    })
                }
            }
        }, d.detection = {
            gestures: [],
            current: null,
            previous: null,
            stopped: !1,
            startDetect: function(a, b) {
                this.current || (this.stopped = !1, this.current = {
                    inst: a,
                    startEvent: d.utils.extend({}, b),
                    lastEvent: !1,
                    name: ""
                }, this.detect(b))
            },
            detect: function(a) {
                if (this.current && !this.stopped) {
                    a = this.extendEventData(a);
                    for (var b = this.current.inst.options, c = 0, e = this.gestures.length; e > c; c++) {
                        var f = this.gestures[c];
                        if (!this.stopped && b[f.name] !== !1 && f.handler.call(f, a, this.current.inst) === !1) {
                            this.stopDetect();
                            break
                        }
                    }
                    return this.current && (this.current.lastEvent = a), a.eventType == d.EVENT_END && !a.touches.length - 1 && this.stopDetect(), a
                }
            },
            stopDetect: function() {
                this.previous = d.utils.extend({}, this.current), this.current = null, this.stopped = !0
            },
            extendEventData: function(a) {
                var b = this.current.startEvent;
                if (b && (a.touches.length != b.touches.length || a.touches === b.touches)) {
                    b.touches = [];
                    for (var c = 0, e = a.touches.length; e > c; c++) b.touches.push(d.utils.extend({}, a.touches[c]))
                }
                var f = a.timeStamp - b.timeStamp,
                    g = a.center.pageX - b.center.pageX,
                    h = a.center.pageY - b.center.pageY,
                    i = d.utils.getVelocity(f, g, h);
                return d.utils.extend(a, {
                    deltaTime: f,
                    deltaX: g,
                    deltaY: h,
                    velocityX: i.x,
                    velocityY: i.y,
                    distance: d.utils.getDistance(b.center, a.center),
                    angle: d.utils.getAngle(b.center, a.center),
                    direction: d.utils.getDirection(b.center, a.center),
                    scale: d.utils.getScale(b.touches, a.touches),
                    rotation: d.utils.getRotation(b.touches, a.touches),
                    startEvent: b
                }), a
            },
            register: function(a) {
                var c = a.defaults || {};
                return c[a.name] === b && (c[a.name] = !0), d.utils.extend(d.defaults, c, !0), a.index = a.index || 1e3, this.gestures.push(a), this.gestures.sort(function(a, b) {
                    return a.index < b.index ? -1 : a.index > b.index ? 1 : 0
                }), this.gestures
            }
        }, d.gestures = d.gestures || {}, d.gestures.Hold = {
            name: "hold",
            index: 10,
            defaults: {
                hold_timeout: 500,
                hold_threshold: 1
            },
            timer: null,
            handler: function(a, b) {
                switch (a.eventType) {
                    case d.EVENT_START:
                        clearTimeout(this.timer), d.detection.current.name = this.name, this.timer = setTimeout(function() {
                            "hold" == d.detection.current.name && b.trigger("hold", a)
                        }, b.options.hold_timeout);
                        break;
                    case d.EVENT_MOVE:
                        a.distance > b.options.hold_threshold && clearTimeout(this.timer);
                        break;
                    case d.EVENT_END:
                        clearTimeout(this.timer)
                }
            }
        }, d.gestures.Tap = {
            name: "tap",
            index: 100,
            defaults: {
                tap_max_touchtime: 250,
                tap_max_distance: 10,
                tap_always: !0,
                doubletap_distance: 20,
                doubletap_interval: 300
            },
            handler: function(a, b) {
                if (a.eventType == d.EVENT_END) {
                    var c = d.detection.previous,
                        e = !1;
                    if (a.deltaTime > b.options.tap_max_touchtime || a.distance > b.options.tap_max_distance) return;
                    c && "tap" == c.name && a.timeStamp - c.lastEvent.timeStamp < b.options.doubletap_interval && a.distance < b.options.doubletap_distance && (b.trigger("doubletap", a), e = !0), (!e || b.options.tap_always) && (d.detection.current.name = "tap", b.trigger(d.detection.current.name, a))
                }
            }
        }, d.gestures.Swipe = {
            name: "swipe",
            index: 40,
            defaults: {
                swipe_max_touches: 1,
                swipe_velocity: .7
            },
            handler: function(a, b) {
                if (a.eventType == d.EVENT_END) {
                    if (b.options.swipe_max_touches > 0 && a.touches.length > b.options.swipe_max_touches) return;
                    (a.velocityX > b.options.swipe_velocity || a.velocityY > b.options.swipe_velocity) && (b.trigger(this.name, a), b.trigger(this.name + a.direction, a))
                }
            }
        }, d.gestures.Drag = {
            name: "drag",
            index: 50,
            defaults: {
                drag_min_distance: 10,
                drag_max_touches: 1,
                drag_block_horizontal: !1,
                drag_block_vertical: !1,
                drag_lock_to_axis: !1,
                drag_lock_min_distance: 25
            },
            triggered: !1,
            handler: function(a, c) {
                if (d.detection.current.name != this.name && this.triggered) return c.trigger(this.name + "end", a), this.triggered = !1, b;
                if (!(c.options.drag_max_touches > 0 && a.touches.length > c.options.drag_max_touches)) switch (a.eventType) {
                    case d.EVENT_START:
                        this.triggered = !1;
                        break;
                    case d.EVENT_MOVE:
                        if (a.distance < c.options.drag_min_distance && d.detection.current.name != this.name) return;
                        d.detection.current.name = this.name, (d.detection.current.lastEvent.drag_locked_to_axis || c.options.drag_lock_to_axis && c.options.drag_lock_min_distance <= a.distance) && (a.drag_locked_to_axis = !0);
                        var e = d.detection.current.lastEvent.direction;
                        a.drag_locked_to_axis && e !== a.direction && (a.direction = d.utils.isVertical(e) ? 0 > a.deltaY ? d.DIRECTION_UP : d.DIRECTION_DOWN : 0 > a.deltaX ? d.DIRECTION_LEFT : d.DIRECTION_RIGHT), this.triggered || (c.trigger(this.name + "start", a), this.triggered = !0), c.trigger(this.name, a), c.trigger(this.name + a.direction, a), (c.options.drag_block_vertical && d.utils.isVertical(a.direction) || c.options.drag_block_horizontal && !d.utils.isVertical(a.direction)) && a.preventDefault();
                        break;
                    case d.EVENT_END:
                        this.triggered && c.trigger(this.name + "end", a), this.triggered = !1
                }
            }
        }, d.gestures.Transform = {
            name: "transform",
            index: 45,
            defaults: {
                transform_min_scale: .01,
                transform_min_rotation: 1,
                transform_always_block: !1
            },
            triggered: !1,
            handler: function(a, c) {
                if (d.detection.current.name != this.name && this.triggered) return c.trigger(this.name + "end", a), this.triggered = !1, b;
                if (!(2 > a.touches.length)) switch (c.options.transform_always_block && a.preventDefault(), a.eventType) {
                    case d.EVENT_START:
                        this.triggered = !1;
                        break;
                    case d.EVENT_MOVE:
                        var e = Math.abs(1 - a.scale),
                            f = Math.abs(a.rotation);
                        if (c.options.transform_min_scale > e && c.options.transform_min_rotation > f) return;
                        d.detection.current.name = this.name, this.triggered || (c.trigger(this.name + "start", a), this.triggered = !0), c.trigger(this.name, a), f > c.options.transform_min_rotation && c.trigger("rotate", a), e > c.options.transform_min_scale && (c.trigger("pinch", a), c.trigger("pinch" + (1 > a.scale ? "in" : "out"), a));
                        break;
                    case d.EVENT_END:
                        this.triggered && c.trigger(this.name + "end", a), this.triggered = !1
                }
            }
        }, d.gestures.Touch = {
            name: "touch",
            index: -1 / 0,
            defaults: {
                prevent_default: !1,
                prevent_mouseevents: !1
            },
            handler: function(a, c) {
                return c.options.prevent_mouseevents && a.pointerType == d.POINTER_MOUSE ? (a.stopDetect(), b) : (c.options.prevent_default && a.preventDefault(), a.eventType == d.EVENT_START && c.trigger(this.name, a), b)
            }
        }, d.gestures.Release = {
            name: "release",
            index: 1 / 0,
            handler: function(a, b) {
                a.eventType == d.EVENT_END && b.trigger(this.name, a)
            }
        }, "object" == typeof module && "object" == typeof module.exports ? module.exports = d : (a.Hammer = d, "function" == typeof a.define && a.define.amd && a.define("hammer", [], function() {
            return d
        }))
    }(this),
    function(a, b) {
        "use strict";
        a !== b && (Hammer.event.bindDom = function(c, d, e) {
            a(c).on(d, function(a) {
                var c = a.originalEvent || a;
                c.pageX === b && (c.pageX = a.pageX, c.pageY = a.pageY), c.target || (c.target = a.target), c.which === b && (c.which = c.button), c.preventDefault || (c.preventDefault = a.preventDefault), c.stopPropagation || (c.stopPropagation = a.stopPropagation), e.call(this, c)
            })
        }, Hammer.Instance.prototype.on = function(b, c) {
            return a(this.element).on(b, c)
        }, Hammer.Instance.prototype.off = function(b, c) {
            return a(this.element).off(b, c)
        }, Hammer.Instance.prototype.trigger = function(b, c) {
            var d = a(this.element);
            return d.has(c.target).length && (d = a(c.target)), d.trigger({
                type: b,
                gesture: c
            })
        }, a.fn.hammer = function(b) {
            return this.each(function() {
                var c = a(this),
                    d = c.data("hammer");
                d ? d && b && Hammer.utils.extend(d.options, b) : c.data("hammer", new Hammer(this, b || {}))
            })
        })
    }(window.jQuery || window.Zepto),
    function(a) {
        "use strict";
        var b = a.GreenSockGlobals || a;
        if (!b.TweenLite) {
            var c, d, e, f, g, h = function(a) {
                    var c, d = a.split("."),
                        e = b;
                    for (c = 0; d.length > c; c++) e[d[c]] = e = e[d[c]] || {};
                    return e
                },
                i = h("com.greensock"),
                j = 1e-10,
                k = [].slice,
                l = function() {},
                m = function() {
                    var a = Object.prototype.toString,
                        b = a.call([]);
                    return function(c) {
                        return null != c && (c instanceof Array || "object" == typeof c && !!c.push && a.call(c) === b)
                    }
                }(),
                n = {},
                o = function(c, d, e, f) {
                    this.sc = n[c] ? n[c].sc : [], n[c] = this, this.gsClass = null, this.func = e;
                    var g = [];
                    this.check = function(i) {
                        for (var j, k, l, m, p = d.length, q = p; --p > -1;)(j = n[d[p]] || new o(d[p], [])).gsClass ? (g[p] = j.gsClass, q--) : i && j.sc.push(this);
                        if (0 === q && e)
                            for (k = ("com.greensock." + c).split("."), l = k.pop(), m = h(k.join("."))[l] = this.gsClass = e.apply(e, g), f && (b[l] = m, "function" == typeof define && define.amd ? define((a.GreenSockAMDPath ? a.GreenSockAMDPath + "/" : "") + c.split(".").join("/"), [], function() {
                                    return m
                                }) : "undefined" != typeof module && module.exports && (module.exports = m)), p = 0; this.sc.length > p; p++) this.sc[p].check()
                    }, this.check(!0)
                },
                p = a._gsDefine = function(a, b, c, d) {
                    return new o(a, b, c, d)
                },
                q = i._class = function(a, b, c) {
                    return b = b || function() {}, p(a, [], function() {
                        return b
                    }, c), b
                };
            p.globals = b;
            var r = [0, 0, 1, 1],
                s = [],
                t = q("easing.Ease", function(a, b, c, d) {
                    this._func = a, this._type = c || 0, this._power = d || 0, this._params = b ? r.concat(b) : r
                }, !0),
                u = t.map = {},
                v = t.register = function(a, b, c, d) {
                    for (var e, f, g, h, j = b.split(","), k = j.length, l = (c || "easeIn,easeOut,easeInOut").split(","); --k > -1;)
                        for (f = j[k], e = d ? q("easing." + f, null, !0) : i.easing[f] || {}, g = l.length; --g > -1;) h = l[g], u[f + "." + h] = u[h + f] = e[h] = a.getRatio ? a : a[h] || new a
                };
            for (e = t.prototype, e._calcEnd = !1, e.getRatio = function(a) {
                    if (this._func) return this._params[0] = a, this._func.apply(null, this._params);
                    var b = this._type,
                        c = this._power,
                        d = 1 === b ? 1 - a : 2 === b ? a : .5 > a ? 2 * a : 2 * (1 - a);
                    return 1 === c ? d *= d : 2 === c ? d *= d * d : 3 === c ? d *= d * d * d : 4 === c && (d *= d * d * d * d), 1 === b ? 1 - d : 2 === b ? d : .5 > a ? d / 2 : 1 - d / 2
                }, c = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], d = c.length; --d > -1;) e = c[d] + ",Power" + d, v(new t(null, null, 1, d), e, "easeOut", !0), v(new t(null, null, 2, d), e, "easeIn" + (0 === d ? ",easeNone" : "")), v(new t(null, null, 3, d), e, "easeInOut");
            u.linear = i.easing.Linear.easeIn, u.swing = i.easing.Quad.easeInOut;
            var w = q("events.EventDispatcher", function(a) {
                this._listeners = {}, this._eventTarget = a || this
            });
            e = w.prototype, e.addEventListener = function(a, b, c, d, e) {
                e = e || 0;
                var h, i, j = this._listeners[a],
                    k = 0;
                for (null == j && (this._listeners[a] = j = []), i = j.length; --i > -1;) h = j[i], h.c === b && h.s === c ? j.splice(i, 1) : 0 === k && e > h.pr && (k = i + 1);
                j.splice(k, 0, {
                    c: b,
                    s: c,
                    up: d,
                    pr: e
                }), this !== f || g || f.wake()
            }, e.removeEventListener = function(a, b) {
                var c, d = this._listeners[a];
                if (d)
                    for (c = d.length; --c > -1;)
                        if (d[c].c === b) return void d.splice(c, 1)
            }, e.dispatchEvent = function(a) {
                var b, c, d, e = this._listeners[a];
                if (e)
                    for (b = e.length, c = this._eventTarget; --b > -1;) d = e[b], d.up ? d.c.call(d.s || c, {
                        type: a,
                        target: c
                    }) : d.c.call(d.s || c)
            };
            var x = a.requestAnimationFrame,
                y = a.cancelAnimationFrame,
                z = Date.now || function() {
                    return (new Date).getTime()
                },
                A = z();
            for (c = ["ms", "moz", "webkit", "o"], d = c.length; --d > -1 && !x;) x = a[c[d] + "RequestAnimationFrame"], y = a[c[d] + "CancelAnimationFrame"] || a[c[d] + "CancelRequestAnimationFrame"];
            q("Ticker", function(a, b) {
                var c, d, e, h, i, j = this,
                    k = z(),
                    m = b !== !1 && x,
                    n = function(a) {
                        A = z(), j.time = (A - k) / 1e3;
                        var b, f = j.time - i;
                        (!c || f > 0 || a === !0) && (j.frame++, i += f + (f >= h ? .004 : h - f), b = !0), a !== !0 && (e = d(n)), b && j.dispatchEvent("tick")
                    };
                w.call(j), j.time = j.frame = 0, j.tick = function() {
                    n(!0)
                }, j.sleep = function() {
                    null != e && (m && y ? y(e) : clearTimeout(e), d = l, e = null, j === f && (g = !1))
                }, j.wake = function() {
                    null !== e && j.sleep(), d = 0 === c ? l : m && x ? x : function(a) {
                        return setTimeout(a, 0 | 1e3 * (i - j.time) + 1)
                    }, j === f && (g = !0), n(2)
                }, j.fps = function(a) {
                    return arguments.length ? (c = a, h = 1 / (c || 60), i = this.time + h, void j.wake()) : c
                }, j.useRAF = function(a) {
                    return arguments.length ? (j.sleep(), m = a, void j.fps(c)) : m
                }, j.fps(a), setTimeout(function() {
                    m && (!e || 5 > j.frame) && j.useRAF(!1)
                }, 1500)
            }), e = i.Ticker.prototype = new i.events.EventDispatcher, e.constructor = i.Ticker;
            var B = q("core.Animation", function(a, b) {
                if (this.vars = b = b || {}, this._duration = this._totalDuration = a || 0, this._delay = Number(b.delay) || 0, this._timeScale = 1, this._active = b.immediateRender === !0, this.data = b.data, this._reversed = b.reversed === !0, O) {
                    g || f.wake();
                    var c = this.vars.useFrames ? N : O;
                    c.add(this, c._time), this.vars.paused && this.paused(!0)
                }
            });
            f = B.ticker = new i.Ticker, e = B.prototype, e._dirty = e._gc = e._initted = e._paused = !1, e._totalTime = e._time = 0, e._rawPrevTime = -1, e._next = e._last = e._onUpdate = e._timeline = e.timeline = null, e._paused = !1;
            var C = function() {
                g && z() - A > 2e3 && f.wake(), setTimeout(C, 2e3)
            };
            C(), e.play = function(a, b) {
                return arguments.length && this.seek(a, b), this.reversed(!1).paused(!1)
            }, e.pause = function(a, b) {
                return arguments.length && this.seek(a, b), this.paused(!0)
            }, e.resume = function(a, b) {
                return arguments.length && this.seek(a, b), this.paused(!1)
            }, e.seek = function(a, b) {
                return this.totalTime(Number(a), b !== !1)
            }, e.restart = function(a, b) {
                return this.reversed(!1).paused(!1).totalTime(a ? -this._delay : 0, b !== !1, !0)
            }, e.reverse = function(a, b) {
                return arguments.length && this.seek(a || this.totalDuration(), b), this.reversed(!0).paused(!1)
            }, e.render = function() {}, e.invalidate = function() {
                return this
            }, e.isActive = function() {
                var a, b = this._timeline,
                    c = this._startTime;
                return !b || !this._gc && !this._paused && b.isActive() && (a = b.rawTime()) >= c && c + this.totalDuration() / this._timeScale > a
            }, e._enabled = function(a, b) {
                return g || f.wake(), this._gc = !a, this._active = this.isActive(), b !== !0 && (a && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !a && this.timeline && this._timeline._remove(this, !0)), !1
            }, e._kill = function() {
                return this._enabled(!1, !1)
            }, e.kill = function(a, b) {
                return this._kill(a, b), this
            }, e._uncache = function(a) {
                for (var b = a ? this : this.timeline; b;) b._dirty = !0, b = b.timeline;
                return this
            }, e._swapSelfInParams = function(a) {
                for (var b = a.length, c = a.concat(); --b > -1;) "{self}" === a[b] && (c[b] = this);
                return c
            }, e.eventCallback = function(a, b, c, d) {
                if ("on" === (a || "").substr(0, 2)) {
                    var e = this.vars;
                    if (1 === arguments.length) return e[a];
                    null == b ? delete e[a] : (e[a] = b, e[a + "Params"] = m(c) && -1 !== c.join("").indexOf("{self}") ? this._swapSelfInParams(c) : c, e[a + "Scope"] = d), "onUpdate" === a && (this._onUpdate = b)
                }
                return this
            }, e.delay = function(a) {
                return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + a - this._delay), this._delay = a, this) : this._delay
            }, e.duration = function(a) {
                return arguments.length ? (this._duration = this._totalDuration = a, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== a && this.totalTime(this._totalTime * (a / this._duration), !0), this) : (this._dirty = !1, this._duration)
            }, e.totalDuration = function(a) {
                return this._dirty = !1, arguments.length ? this.duration(a) : this._totalDuration
            }, e.time = function(a, b) {
                return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(a > this._duration ? this._duration : a, b)) : this._time
            }, e.totalTime = function(a, b, c) {
                if (g || f.wake(), !arguments.length) return this._totalTime;
                if (this._timeline) {
                    if (0 > a && !c && (a += this.totalDuration()), this._timeline.smoothChildTiming) {
                        this._dirty && this.totalDuration();
                        var d = this._totalDuration,
                            e = this._timeline;
                        if (a > d && !c && (a = d), this._startTime = (this._paused ? this._pauseTime : e._time) - (this._reversed ? d - a : a) / this._timeScale, e._dirty || this._uncache(!1), e._timeline)
                            for (; e._timeline;) e._timeline._time !== (e._startTime + e._totalTime) / e._timeScale && e.totalTime(e._totalTime, !0), e = e._timeline
                    }
                    this._gc && this._enabled(!0, !1), (this._totalTime !== a || 0 === this._duration) && this.render(a, b, !1)
                }
                return this
            }, e.progress = e.totalProgress = function(a, b) {
                return arguments.length ? this.totalTime(this.duration() * a, b) : this._time / this.duration()
            }, e.startTime = function(a) {
                return arguments.length ? (a !== this._startTime && (this._startTime = a, this.timeline && this.timeline._sortChildren && this.timeline.add(this, a - this._delay)), this) : this._startTime
            }, e.timeScale = function(a) {
                if (!arguments.length) return this._timeScale;
                if (a = a || j, this._timeline && this._timeline.smoothChildTiming) {
                    var b = this._pauseTime,
                        c = b || 0 === b ? b : this._timeline.totalTime();
                    this._startTime = c - (c - this._startTime) * this._timeScale / a
                }
                return this._timeScale = a, this._uncache(!1)
            }, e.reversed = function(a) {
                return arguments.length ? (a != this._reversed && (this._reversed = a, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed
            }, e.paused = function(a) {
                if (!arguments.length) return this._paused;
                if (a != this._paused && this._timeline) {
                    g || a || f.wake();
                    var b = this._timeline,
                        c = b.rawTime(),
                        d = c - this._pauseTime;
                    !a && b.smoothChildTiming && (this._startTime += d, this._uncache(!1)), this._pauseTime = a ? c : null, this._paused = a, this._active = this.isActive(), !a && 0 !== d && this._initted && this.duration() && this.render(b.smoothChildTiming ? this._totalTime : (c - this._startTime) / this._timeScale, !0, !0)
                }
                return this._gc && !a && this._enabled(!0, !1), this
            };
            var D = q("core.SimpleTimeline", function(a) {
                B.call(this, 0, a), this.autoRemoveChildren = this.smoothChildTiming = !0
            });
            e = D.prototype = new B, e.constructor = D, e.kill()._gc = !1, e._first = e._last = null, e._sortChildren = !1, e.add = e.insert = function(a, b) {
                var c, d;
                if (a._startTime = Number(b || 0) + a._delay, a._paused && this !== a._timeline && (a._pauseTime = a._startTime + (this.rawTime() - a._startTime) / a._timeScale), a.timeline && a.timeline._remove(a, !0), a.timeline = a._timeline = this, a._gc && a._enabled(!0, !0), c = this._last, this._sortChildren)
                    for (d = a._startTime; c && c._startTime > d;) c = c._prev;
                return c ? (a._next = c._next, c._next = a) : (a._next = this._first, this._first = a), a._next ? a._next._prev = a : this._last = a, a._prev = c, this._timeline && this._uncache(!0), this
            }, e._remove = function(a, b) {
                return a.timeline === this && (b || a._enabled(!1, !0), a.timeline = null, a._prev ? a._prev._next = a._next : this._first === a && (this._first = a._next), a._next ? a._next._prev = a._prev : this._last === a && (this._last = a._prev), this._timeline && this._uncache(!0)), this
            }, e.render = function(a, b, c) {
                var d, e = this._first;
                for (this._totalTime = this._time = this._rawPrevTime = a; e;) d = e._next, (e._active || a >= e._startTime && !e._paused) && (e._reversed ? e.render((e._dirty ? e.totalDuration() : e._totalDuration) - (a - e._startTime) * e._timeScale, b, c) : e.render((a - e._startTime) * e._timeScale, b, c)), e = d
            }, e.rawTime = function() {
                return g || f.wake(), this._totalTime
            };
            var E = q("TweenLite", function(b, c, d) {
                    if (B.call(this, c, d), this.render = E.prototype.render, null == b) throw "Cannot tween a null target.";
                    this.target = b = "string" != typeof b ? b : E.selector(b) || b;
                    var e, f, g, h = b.jquery || b.length && b !== a && b[0] && (b[0] === a || b[0].nodeType && b[0].style && !b.nodeType),
                        i = this.vars.overwrite;
                    if (this._overwrite = i = null == i ? M[E.defaultOverwrite] : "number" == typeof i ? i >> 0 : M[i], (h || b instanceof Array || b.push && m(b)) && "number" != typeof b[0])
                        for (this._targets = g = k.call(b, 0), this._propLookup = [], this._siblings = [], e = 0; g.length > e; e++) f = g[e], f ? "string" != typeof f ? f.length && f !== a && f[0] && (f[0] === a || f[0].nodeType && f[0].style && !f.nodeType) ? (g.splice(e--, 1), this._targets = g = g.concat(k.call(f, 0))) : (this._siblings[e] = P(f, this, !1), 1 === i && this._siblings[e].length > 1 && Q(f, this, null, 1, this._siblings[e])) : (f = g[e--] = E.selector(f), "string" == typeof f && g.splice(e + 1, 1)) : g.splice(e--, 1);
                    else this._propLookup = {}, this._siblings = P(b, this, !1), 1 === i && this._siblings.length > 1 && Q(b, this, null, 1, this._siblings);
                    (this.vars.immediateRender || 0 === c && 0 === this._delay && this.vars.immediateRender !== !1) && this.render(-this._delay, !1, !0)
                }, !0),
                F = function(b) {
                    return b.length && b !== a && b[0] && (b[0] === a || b[0].nodeType && b[0].style && !b.nodeType)
                },
                G = function(a, b) {
                    var c, d = {};
                    for (c in a) L[c] || c in b && "x" !== c && "y" !== c && "width" !== c && "height" !== c && "className" !== c && "border" !== c || !(!I[c] || I[c] && I[c]._autoCSS) || (d[c] = a[c], delete a[c]);
                    a.css = d
                };
            e = E.prototype = new B, e.constructor = E, e.kill()._gc = !1, e.ratio = 0, e._firstPT = e._targets = e._overwrittenProps = e._startAt = null, e._notifyPluginsOfEnabled = !1, E.version = "1.11.5", E.defaultEase = e._ease = new t(null, null, 1, 1), E.defaultOverwrite = "auto", E.ticker = f, E.autoSleep = !0, E.selector = a.$ || a.jQuery || function(b) {
                return a.$ ? (E.selector = a.$, a.$(b)) : a.document ? a.document.getElementById("#" === b.charAt(0) ? b.substr(1) : b) : b
            };
            var H = E._internals = {
                    isArray: m,
                    isSelector: F
                },
                I = E._plugins = {},
                J = E._tweenLookup = {},
                K = 0,
                L = H.reservedProps = {
                    ease: 1,
                    delay: 1,
                    overwrite: 1,
                    onComplete: 1,
                    onCompleteParams: 1,
                    onCompleteScope: 1,
                    useFrames: 1,
                    runBackwards: 1,
                    startAt: 1,
                    onUpdate: 1,
                    onUpdateParams: 1,
                    onUpdateScope: 1,
                    onStart: 1,
                    onStartParams: 1,
                    onStartScope: 1,
                    onReverseComplete: 1,
                    onReverseCompleteParams: 1,
                    onReverseCompleteScope: 1,
                    onRepeat: 1,
                    onRepeatParams: 1,
                    onRepeatScope: 1,
                    easeParams: 1,
                    yoyo: 1,
                    immediateRender: 1,
                    repeat: 1,
                    repeatDelay: 1,
                    data: 1,
                    paused: 1,
                    reversed: 1,
                    autoCSS: 1
                },
                M = {
                    none: 0,
                    all: 1,
                    auto: 2,
                    concurrent: 3,
                    allOnStart: 4,
                    preexisting: 5,
                    "true": 1,
                    "false": 0
                },
                N = B._rootFramesTimeline = new D,
                O = B._rootTimeline = new D;
            O._startTime = f.time, N._startTime = f.frame, O._active = N._active = !0, B._updateRoot = function() {
                if (O.render((f.time - O._startTime) * O._timeScale, !1, !1), N.render((f.frame - N._startTime) * N._timeScale, !1, !1), !(f.frame % 120)) {
                    var a, b, c;
                    for (c in J) {
                        for (b = J[c].tweens, a = b.length; --a > -1;) b[a]._gc && b.splice(a, 1);
                        0 === b.length && delete J[c]
                    }
                    if (c = O._first, (!c || c._paused) && E.autoSleep && !N._first && 1 === f._listeners.tick.length) {
                        for (; c && c._paused;) c = c._next;
                        c || f.sleep()
                    }
                }
            }, f.addEventListener("tick", B._updateRoot);
            var P = function(a, b, c) {
                    var d, e, f = a._gsTweenID;
                    if (J[f || (a._gsTweenID = f = "t" + K++)] || (J[f] = {
                            target: a,
                            tweens: []
                        }), b && (d = J[f].tweens, d[e = d.length] = b, c))
                        for (; --e > -1;) d[e] === b && d.splice(e, 1);
                    return J[f].tweens
                },
                Q = function(a, b, c, d, e) {
                    var f, g, h, i;
                    if (1 === d || d >= 4) {
                        for (i = e.length, f = 0; i > f; f++)
                            if ((h = e[f]) !== b) h._gc || h._enabled(!1, !1) && (g = !0);
                            else if (5 === d) break;
                        return g
                    }
                    var k, l = b._startTime + j,
                        m = [],
                        n = 0,
                        o = 0 === b._duration;
                    for (f = e.length; --f > -1;)(h = e[f]) === b || h._gc || h._paused || (h._timeline !== b._timeline ? (k = k || R(b, 0, o), 0 === R(h, k, o) && (m[n++] = h)) : l >= h._startTime && h._startTime + h.totalDuration() / h._timeScale > l && ((o || !h._initted) && 2e-10 >= l - h._startTime || (m[n++] = h)));
                    for (f = n; --f > -1;) h = m[f], 2 === d && h._kill(c, a) && (g = !0), (2 !== d || !h._firstPT && h._initted) && h._enabled(!1, !1) && (g = !0);
                    return g
                },
                R = function(a, b, c) {
                    for (var d = a._timeline, e = d._timeScale, f = a._startTime; d._timeline;) {
                        if (f += d._startTime, e *= d._timeScale, d._paused) return -100;
                        d = d._timeline
                    }
                    return f /= e, f > b ? f - b : c && f === b || !a._initted && 2 * j > f - b ? j : (f += a.totalDuration() / a._timeScale / e) > b + j ? 0 : f - b - j
                };
            e._init = function() {
                var a, b, c, d, e = this.vars,
                    f = this._overwrittenProps,
                    g = this._duration,
                    h = e.immediateRender,
                    i = e.ease;
                if (e.startAt) {
                    if (this._startAt && this._startAt.render(-1, !0), e.startAt.overwrite = 0, e.startAt.immediateRender = !0, this._startAt = E.to(this.target, 0, e.startAt), h)
                        if (this._time > 0) this._startAt = null;
                        else if (0 !== g) return
                } else if (e.runBackwards && 0 !== g)
                    if (this._startAt) this._startAt.render(-1, !0), this._startAt = null;
                    else {
                        c = {};
                        for (d in e) L[d] && "autoCSS" !== d || (c[d] = e[d]);
                        if (c.overwrite = 0, c.data = "isFromStart", this._startAt = E.to(this.target, 0, c), e.immediateRender) {
                            if (0 === this._time) return
                        } else this._startAt.render(-1, !0)
                    }
                if (this._ease = i ? i instanceof t ? e.easeParams instanceof Array ? i.config.apply(i, e.easeParams) : i : "function" == typeof i ? new t(i, e.easeParams) : u[i] || E.defaultEase : E.defaultEase, this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets)
                    for (a = this._targets.length; --a > -1;) this._initProps(this._targets[a], this._propLookup[a] = {}, this._siblings[a], f ? f[a] : null) && (b = !0);
                else b = this._initProps(this.target, this._propLookup, this._siblings, f);
                if (b && E._onPluginEvent("_onInitAllProps", this), f && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), e.runBackwards)
                    for (c = this._firstPT; c;) c.s += c.c, c.c = -c.c, c = c._next;
                this._onUpdate = e.onUpdate, this._initted = !0
            }, e._initProps = function(b, c, d, e) {
                var f, g, h, i, j, k;
                if (null == b) return !1;
                this.vars.css || b.style && b !== a && b.nodeType && I.css && this.vars.autoCSS !== !1 && G(this.vars, b);
                for (f in this.vars) {
                    if (k = this.vars[f], L[f]) k && (k instanceof Array || k.push && m(k)) && -1 !== k.join("").indexOf("{self}") && (this.vars[f] = k = this._swapSelfInParams(k, this));
                    else if (I[f] && (i = new I[f])._onInitTween(b, this.vars[f], this)) {
                        for (this._firstPT = j = {
                                _next: this._firstPT,
                                t: i,
                                p: "setRatio",
                                s: 0,
                                c: 1,
                                f: !0,
                                n: f,
                                pg: !0,
                                pr: i._priority
                            }, g = i._overwriteProps.length; --g > -1;) c[i._overwriteProps[g]] = this._firstPT;
                        (i._priority || i._onInitAllProps) && (h = !0), (i._onDisable || i._onEnable) && (this._notifyPluginsOfEnabled = !0)
                    } else this._firstPT = c[f] = j = {
                        _next: this._firstPT,
                        t: b,
                        p: f,
                        f: "function" == typeof b[f],
                        n: f,
                        pg: !1,
                        pr: 0
                    }, j.s = j.f ? b[f.indexOf("set") || "function" != typeof b["get" + f.substr(3)] ? f : "get" + f.substr(3)]() : parseFloat(b[f]), j.c = "string" == typeof k && "=" === k.charAt(1) ? parseInt(k.charAt(0) + "1", 10) * Number(k.substr(2)) : Number(k) - j.s || 0;
                    j && j._next && (j._next._prev = j)
                }
                return e && this._kill(e, b) ? this._initProps(b, c, d, e) : this._overwrite > 1 && this._firstPT && d.length > 1 && Q(b, this, c, this._overwrite, d) ? (this._kill(c, b), this._initProps(b, c, d, e)) : h
            }, e.render = function(a, b, c) {
                var d, e, f, g, h = this._time,
                    i = this._duration;
                if (a >= i) this._totalTime = this._time = i, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (d = !0, e = "onComplete"), 0 === i && (g = this._rawPrevTime, (0 === a || 0 > g || g === j) && g !== a && (c = !0, g > j && (e = "onReverseComplete")), this._rawPrevTime = g = !b || a || 0 === g ? a : j);
                else if (1e-7 > a) this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== h || 0 === i && this._rawPrevTime > j) && (e = "onReverseComplete", d = this._reversed), 0 > a ? (this._active = !1, 0 === i && (this._rawPrevTime >= 0 && (c = !0), this._rawPrevTime = g = !b || a || 0 === this._rawPrevTime ? a : j)) : this._initted || (c = !0);
                else if (this._totalTime = this._time = a, this._easeType) {
                    var k = a / i,
                        l = this._easeType,
                        m = this._easePower;
                    (1 === l || 3 === l && k >= .5) && (k = 1 - k), 3 === l && (k *= 2), 1 === m ? k *= k : 2 === m ? k *= k * k : 3 === m ? k *= k * k * k : 4 === m && (k *= k * k * k * k), this.ratio = 1 === l ? 1 - k : 2 === l ? k : .5 > a / i ? k / 2 : 1 - k / 2
                } else this.ratio = this._ease.getRatio(a / i);
                if (this._time !== h || c) {
                    if (!this._initted) {
                        if (this._init(), !this._initted || this._gc) return;
                        this._time && !d ? this.ratio = this._ease.getRatio(this._time / i) : d && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                    }
                    for (this._active || !this._paused && this._time !== h && a >= 0 && (this._active = !0), 0 === h && (this._startAt && (a >= 0 ? this._startAt.render(a, b, c) : e || (e = "_dummyGS")), this.vars.onStart && (0 !== this._time || 0 === i) && (b || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || s))), f = this._firstPT; f;) f.f ? f.t[f.p](f.c * this.ratio + f.s) : f.t[f.p] = f.c * this.ratio + f.s, f = f._next;
                    this._onUpdate && (0 > a && this._startAt && this._startTime && this._startAt.render(a, b, c), b || (this._time !== h || d) && this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || s)), e && (this._gc || (0 > a && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(a, b, c), d && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !b && this.vars[e] && this.vars[e].apply(this.vars[e + "Scope"] || this, this.vars[e + "Params"] || s), 0 === i && this._rawPrevTime === j && g !== j && (this._rawPrevTime = 0)))
                }
            }, e._kill = function(a, b) {
                if ("all" === a && (a = null), null == a && (null == b || b === this.target)) return this._enabled(!1, !1);
                b = "string" != typeof b ? b || this._targets || this.target : E.selector(b) || b;
                var c, d, e, f, g, h, i, j;
                if ((m(b) || F(b)) && "number" != typeof b[0])
                    for (c = b.length; --c > -1;) this._kill(a, b[c]) && (h = !0);
                else {
                    if (this._targets) {
                        for (c = this._targets.length; --c > -1;)
                            if (b === this._targets[c]) {
                                g = this._propLookup[c] || {}, this._overwrittenProps = this._overwrittenProps || [], d = this._overwrittenProps[c] = a ? this._overwrittenProps[c] || {} : "all";
                                break
                            }
                    } else {
                        if (b !== this.target) return !1;
                        g = this._propLookup, d = this._overwrittenProps = a ? this._overwrittenProps || {} : "all"
                    }
                    if (g) {
                        i = a || g, j = a !== d && "all" !== d && a !== g && ("object" != typeof a || !a._tempKill);
                        for (e in i)(f = g[e]) && (f.pg && f.t._kill(i) && (h = !0), f.pg && 0 !== f.t._overwriteProps.length || (f._prev ? f._prev._next = f._next : f === this._firstPT && (this._firstPT = f._next), f._next && (f._next._prev = f._prev), f._next = f._prev = null), delete g[e]), j && (d[e] = 1);
                        !this._firstPT && this._initted && this._enabled(!1, !1)
                    }
                }
                return h
            }, e.invalidate = function() {
                return this._notifyPluginsOfEnabled && E._onPluginEvent("_onDisable", this), this._firstPT = null, this._overwrittenProps = null, this._onUpdate = null, this._startAt = null, this._initted = this._active = this._notifyPluginsOfEnabled = !1, this._propLookup = this._targets ? {} : [], this
            }, e._enabled = function(a, b) {
                if (g || f.wake(), a && this._gc) {
                    var c, d = this._targets;
                    if (d)
                        for (c = d.length; --c > -1;) this._siblings[c] = P(d[c], this, !0);
                    else this._siblings = P(this.target, this, !0)
                }
                return B.prototype._enabled.call(this, a, b), this._notifyPluginsOfEnabled && this._firstPT ? E._onPluginEvent(a ? "_onEnable" : "_onDisable", this) : !1
            }, E.to = function(a, b, c) {
                return new E(a, b, c)
            }, E.from = function(a, b, c) {
                return c.runBackwards = !0, c.immediateRender = 0 != c.immediateRender, new E(a, b, c)
            }, E.fromTo = function(a, b, c, d) {
                return d.startAt = c, d.immediateRender = 0 != d.immediateRender && 0 != c.immediateRender, new E(a, b, d)
            }, E.delayedCall = function(a, b, c, d, e) {
                return new E(b, 0, {
                    delay: a,
                    onComplete: b,
                    onCompleteParams: c,
                    onCompleteScope: d,
                    onReverseComplete: b,
                    onReverseCompleteParams: c,
                    onReverseCompleteScope: d,
                    immediateRender: !1,
                    useFrames: e,
                    overwrite: 0
                })
            }, E.set = function(a, b) {
                return new E(a, 0, b)
            }, E.getTweensOf = function(a, b) {
                if (null == a) return [];
                a = "string" != typeof a ? a : E.selector(a) || a;
                var c, d, e, f;
                if ((m(a) || F(a)) && "number" != typeof a[0]) {
                    for (c = a.length, d = []; --c > -1;) d = d.concat(E.getTweensOf(a[c], b));
                    for (c = d.length; --c > -1;)
                        for (f = d[c], e = c; --e > -1;) f === d[e] && d.splice(c, 1)
                } else
                    for (d = P(a).concat(), c = d.length; --c > -1;)(d[c]._gc || b && !d[c].isActive()) && d.splice(c, 1);
                return d
            }, E.killTweensOf = E.killDelayedCallsTo = function(a, b, c) {
                "object" == typeof b && (c = b, b = !1);
                for (var d = E.getTweensOf(a, b), e = d.length; --e > -1;) d[e]._kill(c, a)
            };
            var S = q("plugins.TweenPlugin", function(a, b) {
                this._overwriteProps = (a || "").split(","), this._propName = this._overwriteProps[0], this._priority = b || 0, this._super = S.prototype
            }, !0);
            if (e = S.prototype, S.version = "1.10.1", S.API = 2, e._firstPT = null, e._addTween = function(a, b, c, d, e, f) {
                    var g, h;
                    return null != d && (g = "number" == typeof d || "=" !== d.charAt(1) ? Number(d) - c : parseInt(d.charAt(0) + "1", 10) * Number(d.substr(2))) ? (this._firstPT = h = {
                        _next: this._firstPT,
                        t: a,
                        p: b,
                        s: c,
                        c: g,
                        f: "function" == typeof a[b],
                        n: e || b,
                        r: f
                    }, h._next && (h._next._prev = h), h) : void 0
                }, e.setRatio = function(a) {
                    for (var b, c = this._firstPT, d = 1e-6; c;) b = c.c * a + c.s, c.r ? b = 0 | b + (b > 0 ? .5 : -.5) : d > b && b > -d && (b = 0), c.f ? c.t[c.p](b) : c.t[c.p] = b, c = c._next
                }, e._kill = function(a) {
                    var b, c = this._overwriteProps,
                        d = this._firstPT;
                    if (null != a[this._propName]) this._overwriteProps = [];
                    else
                        for (b = c.length; --b > -1;) null != a[c[b]] && c.splice(b, 1);
                    for (; d;) null != a[d.n] && (d._next && (d._next._prev = d._prev), d._prev ? (d._prev._next = d._next, d._prev = null) : this._firstPT === d && (this._firstPT = d._next)), d = d._next;
                    return !1
                }, e._roundProps = function(a, b) {
                    for (var c = this._firstPT; c;)(a[this._propName] || null != c.n && a[c.n.split(this._propName + "_").join("")]) && (c.r = b), c = c._next
                }, E._onPluginEvent = function(a, b) {
                    var c, d, e, f, g, h = b._firstPT;
                    if ("_onInitAllProps" === a) {
                        for (; h;) {
                            for (g = h._next, d = e; d && d.pr > h.pr;) d = d._next;
                            (h._prev = d ? d._prev : f) ? h._prev._next = h: e = h, (h._next = d) ? d._prev = h : f = h, h = g
                        }
                        h = b._firstPT = e
                    }
                    for (; h;) h.pg && "function" == typeof h.t[a] && h.t[a]() && (c = !0), h = h._next;
                    return c
                }, S.activate = function(a) {
                    for (var b = a.length; --b > -1;) a[b].API === S.API && (I[(new a[b])._propName] = a[b]);
                    return !0
                }, p.plugin = function(a) {
                    if (!(a && a.propName && a.init && a.API)) throw "illegal plugin definition.";
                    var b, c = a.propName,
                        d = a.priority || 0,
                        e = a.overwriteProps,
                        f = {
                            init: "_onInitTween",
                            set: "setRatio",
                            kill: "_kill",
                            round: "_roundProps",
                            initAll: "_onInitAllProps"
                        },
                        g = q("plugins." + c.charAt(0).toUpperCase() + c.substr(1) + "Plugin", function() {
                            S.call(this, c, d), this._overwriteProps = e || []
                        }, a.global === !0),
                        h = g.prototype = new S(c);
                    h.constructor = g, g.API = a.API;
                    for (b in f) "function" == typeof a[b] && (h[f[b]] = a[b]);
                    return g.version = a.version, S.activate([g]), g
                }, c = a._gsQueue) {
                for (d = 0; c.length > d; d++) c[d]();
                for (e in n) n[e].func || a.console.log("GSAP encountered missing dependency: com.greensock." + e)
            }
            g = !1
        }
    }(window), (window._gsQueue || (window._gsQueue = [])).push(function() {
        "use strict";
        window._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(a, b, c) {
            var d = function(a) {
                    b.call(this, a), this._labels = {}, this.autoRemoveChildren = this.vars.autoRemoveChildren === !0, this.smoothChildTiming = this.vars.smoothChildTiming === !0, this._sortChildren = !0, this._onUpdate = this.vars.onUpdate;
                    var c, d, e = this.vars;
                    for (d in e) c = e[d], g(c) && -1 !== c.join("").indexOf("{self}") && (e[d] = this._swapSelfInParams(c));
                    g(e.tweens) && this.add(e.tweens, 0, e.align, e.stagger)
                },
                e = 1e-10,
                f = c._internals.isSelector,
                g = c._internals.isArray,
                h = [],
                i = function(a) {
                    var b, c = {};
                    for (b in a) c[b] = a[b];
                    return c
                },
                j = function(a, b, c, d) {
                    a._timeline.pause(a._startTime), b && b.apply(d || a._timeline, c || h)
                },
                k = h.slice,
                l = d.prototype = new b;
            return d.version = "1.11.5", l.constructor = d, l.kill()._gc = !1, l.to = function(a, b, d, e) {
                return b ? this.add(new c(a, b, d), e) : this.set(a, d, e)
            }, l.from = function(a, b, d, e) {
                return this.add(c.from(a, b, d), e)
            }, l.fromTo = function(a, b, d, e, f) {
                return b ? this.add(c.fromTo(a, b, d, e), f) : this.set(a, e, f)
            }, l.staggerTo = function(a, b, e, g, h, j, l, m) {
                var n, o = new d({
                    onComplete: j,
                    onCompleteParams: l,
                    onCompleteScope: m,
                    smoothChildTiming: this.smoothChildTiming
                });
                for ("string" == typeof a && (a = c.selector(a) || a), f(a) && (a = k.call(a, 0)), g = g || 0, n = 0; a.length > n; n++) e.startAt && (e.startAt = i(e.startAt)), o.to(a[n], b, i(e), n * g);
                return this.add(o, h)
            }, l.staggerFrom = function(a, b, c, d, e, f, g, h) {
                return c.immediateRender = 0 != c.immediateRender, c.runBackwards = !0, this.staggerTo(a, b, c, d, e, f, g, h)
            }, l.staggerFromTo = function(a, b, c, d, e, f, g, h, i) {
                return d.startAt = c, d.immediateRender = 0 != d.immediateRender && 0 != c.immediateRender, this.staggerTo(a, b, d, e, f, g, h, i)
            }, l.call = function(a, b, d, e) {
                return this.add(c.delayedCall(0, a, b, d), e)
            }, l.set = function(a, b, d) {
                return d = this._parseTimeOrLabel(d, 0, !0), null == b.immediateRender && (b.immediateRender = d === this._time && !this._paused), this.add(new c(a, 0, b), d)
            }, d.exportRoot = function(a, b) {
                a = a || {}, null == a.smoothChildTiming && (a.smoothChildTiming = !0);
                var e, f, g = new d(a),
                    h = g._timeline;
                for (null == b && (b = !0), h._remove(g, !0), g._startTime = 0, g._rawPrevTime = g._time = g._totalTime = h._time, e = h._first; e;) f = e._next, b && e instanceof c && e.target === e.vars.onComplete || g.add(e, e._startTime - e._delay), e = f;
                return h.add(g, 0), g
            }, l.add = function(e, f, h, i) {
                var j, k, l, m, n, o;
                if ("number" != typeof f && (f = this._parseTimeOrLabel(f, 0, !0, e)), !(e instanceof a)) {
                    if (e instanceof Array || e && e.push && g(e)) {
                        for (h = h || "normal", i = i || 0, j = f, k = e.length, l = 0; k > l; l++) g(m = e[l]) && (m = new d({
                            tweens: m
                        })), this.add(m, j), "string" != typeof m && "function" != typeof m && ("sequence" === h ? j = m._startTime + m.totalDuration() / m._timeScale : "start" === h && (m._startTime -= m.delay())), j += i;
                        return this._uncache(!0)
                    }
                    if ("string" == typeof e) return this.addLabel(e, f);
                    if ("function" != typeof e) throw "Cannot add " + e + " into the timeline; it is not a tween, timeline, function, or string.";
                    e = c.delayedCall(0, e)
                }
                if (b.prototype.add.call(this, e, f), (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration())
                    for (n = this, o = n.rawTime() > e._startTime; n._timeline;) o && n._timeline.smoothChildTiming ? n.totalTime(n._totalTime, !0) : n._gc && n._enabled(!0, !1), n = n._timeline;
                return this
            }, l.remove = function(b) {
                if (b instanceof a) return this._remove(b, !1);
                if (b instanceof Array || b && b.push && g(b)) {
                    for (var c = b.length; --c > -1;) this.remove(b[c]);
                    return this
                }
                return "string" == typeof b ? this.removeLabel(b) : this.kill(null, b)
            }, l._remove = function(a, c) {
                b.prototype._remove.call(this, a, c);
                var d = this._last;
                return d ? this._time > d._startTime + d._totalDuration / d._timeScale && (this._time = this.duration(), this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0, this
            }, l.append = function(a, b) {
                return this.add(a, this._parseTimeOrLabel(null, b, !0, a))
            }, l.insert = l.insertMultiple = function(a, b, c, d) {
                return this.add(a, b || 0, c, d)
            }, l.appendMultiple = function(a, b, c, d) {
                return this.add(a, this._parseTimeOrLabel(null, b, !0, a), c, d)
            }, l.addLabel = function(a, b) {
                return this._labels[a] = this._parseTimeOrLabel(b), this
            }, l.addPause = function(a, b, c, d) {
                return this.call(j, ["{self}", b, c, d], this, a)
            }, l.removeLabel = function(a) {
                return delete this._labels[a], this
            }, l.getLabelTime = function(a) {
                return null != this._labels[a] ? this._labels[a] : -1
            }, l._parseTimeOrLabel = function(b, c, d, e) {
                var f;
                if (e instanceof a && e.timeline === this) this.remove(e);
                else if (e && (e instanceof Array || e.push && g(e)))
                    for (f = e.length; --f > -1;) e[f] instanceof a && e[f].timeline === this && this.remove(e[f]);
                if ("string" == typeof c) return this._parseTimeOrLabel(c, d && "number" == typeof b && null == this._labels[c] ? b - this.duration() : 0, d);
                if (c = c || 0, "string" != typeof b || !isNaN(b) && null == this._labels[b]) null == b && (b = this.duration());
                else {
                    if (f = b.indexOf("="), -1 === f) return null == this._labels[b] ? d ? this._labels[b] = this.duration() + c : c : this._labels[b] + c;
                    c = parseInt(b.charAt(f - 1) + "1", 10) * Number(b.substr(f + 1)), b = f > 1 ? this._parseTimeOrLabel(b.substr(0, f - 1), 0, d) : this.duration()
                }
                return Number(b) + c
            }, l.seek = function(a, b) {
                return this.totalTime("number" == typeof a ? a : this._parseTimeOrLabel(a), b !== !1)
            }, l.stop = function() {
                return this.paused(!0)
            }, l.gotoAndPlay = function(a, b) {
                return this.play(a, b)
            }, l.gotoAndStop = function(a, b) {
                return this.pause(a, b)
            }, l.render = function(a, b, c) {
                this._gc && this._enabled(!0, !1);
                var d, f, g, i, j, k = this._dirty ? this.totalDuration() : this._totalDuration,
                    l = this._time,
                    m = this._startTime,
                    n = this._timeScale,
                    o = this._paused;
                if (a >= k ? (this._totalTime = this._time = k, this._reversed || this._hasPausedChild() || (f = !0, i = "onComplete", 0 === this._duration && (0 === a || 0 > this._rawPrevTime || this._rawPrevTime === e) && this._rawPrevTime !== a && this._first && (j = !0, this._rawPrevTime > e && (i = "onReverseComplete"))), this._rawPrevTime = this._duration || !b || a || 0 === this._rawPrevTime ? a : e, a = k + 1e-4) : 1e-7 > a ? (this._totalTime = this._time = 0, (0 !== l || 0 === this._duration && (this._rawPrevTime > e || 0 > a && this._rawPrevTime >= 0)) && (i = "onReverseComplete", f = this._reversed), 0 > a ? (this._active = !1, 0 === this._duration && this._rawPrevTime >= 0 && this._first && (j = !0), this._rawPrevTime = a) : (this._rawPrevTime = this._duration || !b || a || 0 === this._rawPrevTime ? a : e, a = 0, this._initted || (j = !0))) : this._totalTime = this._time = this._rawPrevTime = a, this._time !== l && this._first || c || j) {
                    if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== l && a > 0 && (this._active = !0), 0 === l && this.vars.onStart && 0 !== this._time && (b || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || h)), this._time >= l)
                        for (d = this._first; d && (g = d._next, !this._paused || o);)(d._active || d._startTime <= this._time && !d._paused && !d._gc) && (d._reversed ? d.render((d._dirty ? d.totalDuration() : d._totalDuration) - (a - d._startTime) * d._timeScale, b, c) : d.render((a - d._startTime) * d._timeScale, b, c)), d = g;
                    else
                        for (d = this._last; d && (g = d._prev, !this._paused || o);)(d._active || l >= d._startTime && !d._paused && !d._gc) && (d._reversed ? d.render((d._dirty ? d.totalDuration() : d._totalDuration) - (a - d._startTime) * d._timeScale, b, c) : d.render((a - d._startTime) * d._timeScale, b, c)), d = g;
                    this._onUpdate && (b || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || h)), i && (this._gc || (m === this._startTime || n !== this._timeScale) && (0 === this._time || k >= this.totalDuration()) && (f && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !b && this.vars[i] && this.vars[i].apply(this.vars[i + "Scope"] || this, this.vars[i + "Params"] || h)))
                }
            }, l._hasPausedChild = function() {
                for (var a = this._first; a;) {
                    if (a._paused || a instanceof d && a._hasPausedChild()) return !0;
                    a = a._next
                }
                return !1
            }, l.getChildren = function(a, b, d, e) {
                e = e || -9999999999;
                for (var f = [], g = this._first, h = 0; g;) e > g._startTime || (g instanceof c ? b !== !1 && (f[h++] = g) : (d !== !1 && (f[h++] = g), a !== !1 && (f = f.concat(g.getChildren(!0, b, d)), h = f.length))), g = g._next;
                return f
            }, l.getTweensOf = function(a, b) {
                for (var d = c.getTweensOf(a), e = d.length, f = [], g = 0; --e > -1;)(d[e].timeline === this || b && this._contains(d[e])) && (f[g++] = d[e]);
                return f
            }, l._contains = function(a) {
                for (var b = a.timeline; b;) {
                    if (b === this) return !0;
                    b = b.timeline
                }
                return !1
            }, l.shiftChildren = function(a, b, c) {
                c = c || 0;
                for (var d, e = this._first, f = this._labels; e;) e._startTime >= c && (e._startTime += a), e = e._next;
                if (b)
                    for (d in f) f[d] >= c && (f[d] += a);
                return this._uncache(!0)
            }, l._kill = function(a, b) {
                if (!a && !b) return this._enabled(!1, !1);
                for (var c = b ? this.getTweensOf(b) : this.getChildren(!0, !0, !1), d = c.length, e = !1; --d > -1;) c[d]._kill(a, b) && (e = !0);
                return e
            }, l.clear = function(a) {
                var b = this.getChildren(!1, !0, !0),
                    c = b.length;
                for (this._time = this._totalTime = 0; --c > -1;) b[c]._enabled(!1, !1);
                return a !== !1 && (this._labels = {}), this._uncache(!0)
            }, l.invalidate = function() {
                for (var a = this._first; a;) a.invalidate(), a = a._next;
                return this
            }, l._enabled = function(a, c) {
                if (a === this._gc)
                    for (var d = this._first; d;) d._enabled(a, !0), d = d._next;
                return b.prototype._enabled.call(this, a, c)
            }, l.duration = function(a) {
                return arguments.length ? (0 !== this.duration() && 0 !== a && this.timeScale(this._duration / a), this) : (this._dirty && this.totalDuration(), this._duration)
            }, l.totalDuration = function(a) {
                if (!arguments.length) {
                    if (this._dirty) {
                        for (var b, c, d = 0, e = this._last, f = 999999999999; e;) b = e._prev, e._dirty && e.totalDuration(), e._startTime > f && this._sortChildren && !e._paused ? this.add(e, e._startTime - e._delay) : f = e._startTime, 0 > e._startTime && !e._paused && (d -= e._startTime, this._timeline.smoothChildTiming && (this._startTime += e._startTime / this._timeScale), this.shiftChildren(-e._startTime, !1, -9999999999), f = 0), c = e._startTime + e._totalDuration / e._timeScale, c > d && (d = c), e = b;
                        this._duration = this._totalDuration = d, this._dirty = !1
                    }
                    return this._totalDuration
                }
                return 0 !== this.totalDuration() && 0 !== a && this.timeScale(this._totalDuration / a), this
            }, l.usesFrames = function() {
                for (var b = this._timeline; b._timeline;) b = b._timeline;
                return b === a._rootFramesTimeline
            }, l.rawTime = function() {
                return this._paused ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale
            }, d
        }, !0)
    }), window._gsDefine && window._gsQueue.pop()(), (window._gsQueue || (window._gsQueue = [])).push(function() {
        "use strict";
        window._gsDefine("easing.Back", ["easing.Ease"], function(a) {
            var b, c, d, e = window.GreenSockGlobals || window,
                f = e.com.greensock,
                g = 2 * Math.PI,
                h = Math.PI / 2,
                i = f._class,
                j = function(b, c) {
                    var d = i("easing." + b, function() {}, !0),
                        e = d.prototype = new a;
                    return e.constructor = d, e.getRatio = c, d
                },
                k = a.register || function() {},
                l = function(a, b, c, d) {
                    var e = i("easing." + a, {
                        easeOut: new b,
                        easeIn: new c,
                        easeInOut: new d
                    }, !0);
                    return k(e, a), e
                },
                m = function(a, b, c) {
                    this.t = a, this.v = b, c && (this.next = c, c.prev = this, this.c = c.v - b, this.gap = c.t - a)
                },
                n = function(b, c) {
                    var d = i("easing." + b, function(a) {
                            this._p1 = a || 0 === a ? a : 1.70158, this._p2 = 1.525 * this._p1
                        }, !0),
                        e = d.prototype = new a;
                    return e.constructor = d, e.getRatio = c, e.config = function(a) {
                        return new d(a)
                    }, d
                },
                o = l("Back", n("BackOut", function(a) {
                    return (a -= 1) * a * ((this._p1 + 1) * a + this._p1) + 1
                }), n("BackIn", function(a) {
                    return a * a * ((this._p1 + 1) * a - this._p1)
                }), n("BackInOut", function(a) {
                    return 1 > (a *= 2) ? .5 * a * a * ((this._p2 + 1) * a - this._p2) : .5 * ((a -= 2) * a * ((this._p2 + 1) * a + this._p2) + 2)
                })),
                p = i("easing.SlowMo", function(a, b, c) {
                    b = b || 0 === b ? b : .7, null == a ? a = .7 : a > 1 && (a = 1), this._p = 1 !== a ? b : 0, this._p1 = (1 - a) / 2, this._p2 = a, this._p3 = this._p1 + this._p2, this._calcEnd = c === !0
                }, !0),
                q = p.prototype = new a;
            return q.constructor = p, q.getRatio = function(a) {
                var b = a + (.5 - a) * this._p;
                return this._p1 > a ? this._calcEnd ? 1 - (a = 1 - a / this._p1) * a : b - (a = 1 - a / this._p1) * a * a * a * b : a > this._p3 ? this._calcEnd ? 1 - (a = (a - this._p3) / this._p1) * a : b + (a - b) * (a = (a - this._p3) / this._p1) * a * a * a : this._calcEnd ? 1 : b
            }, p.ease = new p(.7, .7), q.config = p.config = function(a, b, c) {
                return new p(a, b, c)
            }, b = i("easing.SteppedEase", function(a) {
                a = a || 1, this._p1 = 1 / a, this._p2 = a + 1
            }, !0), q = b.prototype = new a, q.constructor = b, q.getRatio = function(a) {
                return 0 > a ? a = 0 : a >= 1 && (a = .999999999), (this._p2 * a >> 0) * this._p1
            }, q.config = b.config = function(a) {
                return new b(a)
            }, c = i("easing.RoughEase", function(b) {
                b = b || {};
                for (var c, d, e, f, g, h, i = b.taper || "none", j = [], k = 0, l = 0 | (b.points || 20), n = l, o = b.randomize !== !1, p = b.clamp === !0, q = b.template instanceof a ? b.template : null, r = "number" == typeof b.strength ? .4 * b.strength : .4; --n > -1;) c = o ? Math.random() : 1 / l * n, d = q ? q.getRatio(c) : c, "none" === i ? e = r : "out" === i ? (f = 1 - c, e = f * f * r) : "in" === i ? e = c * c * r : .5 > c ? (f = 2 * c, e = .5 * f * f * r) : (f = 2 * (1 - c), e = .5 * f * f * r), o ? d += Math.random() * e - .5 * e : n % 2 ? d += .5 * e : d -= .5 * e, p && (d > 1 ? d = 1 : 0 > d && (d = 0)), j[k++] = {
                    x: c,
                    y: d
                };
                for (j.sort(function(a, b) {
                        return a.x - b.x
                    }), h = new m(1, 1, null), n = l; --n > -1;) g = j[n], h = new m(g.x, g.y, h);
                this._prev = new m(0, 0, 0 !== h.t ? h : h.next)
            }, !0), q = c.prototype = new a, q.constructor = c, q.getRatio = function(a) {
                var b = this._prev;
                if (a > b.t) {
                    for (; b.next && a >= b.t;) b = b.next;
                    b = b.prev
                } else
                    for (; b.prev && b.t >= a;) b = b.prev;
                return this._prev = b, b.v + (a - b.t) / b.gap * b.c
            }, q.config = function(a) {
                return new c(a)
            }, c.ease = new c, l("Bounce", j("BounceOut", function(a) {
                return 1 / 2.75 > a ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375
            }), j("BounceIn", function(a) {
                return 1 / 2.75 > (a = 1 - a) ? 1 - 7.5625 * a * a : 2 / 2.75 > a ? 1 - (7.5625 * (a -= 1.5 / 2.75) * a + .75) : 2.5 / 2.75 > a ? 1 - (7.5625 * (a -= 2.25 / 2.75) * a + .9375) : 1 - (7.5625 * (a -= 2.625 / 2.75) * a + .984375)
            }), j("BounceInOut", function(a) {
                var b = .5 > a;
                return a = b ? 1 - 2 * a : 2 * a - 1, a = 1 / 2.75 > a ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375, b ? .5 * (1 - a) : .5 * a + .5
            })), l("Circ", j("CircOut", function(a) {
                return Math.sqrt(1 - (a -= 1) * a)
            }), j("CircIn", function(a) {
                return -(Math.sqrt(1 - a * a) - 1)
            }), j("CircInOut", function(a) {
                return 1 > (a *= 2) ? -.5 * (Math.sqrt(1 - a * a) - 1) : .5 * (Math.sqrt(1 - (a -= 2) * a) + 1)
            })), d = function(b, c, d) {
                var e = i("easing." + b, function(a, b) {
                        this._p1 = a || 1, this._p2 = b || d, this._p3 = this._p2 / g * (Math.asin(1 / this._p1) || 0)
                    }, !0),
                    f = e.prototype = new a;
                return f.constructor = e, f.getRatio = c, f.config = function(a, b) {
                    return new e(a, b)
                }, e
            }, l("Elastic", d("ElasticOut", function(a) {
                return this._p1 * Math.pow(2, -10 * a) * Math.sin((a - this._p3) * g / this._p2) + 1
            }, .3), d("ElasticIn", function(a) {
                return -(this._p1 * Math.pow(2, 10 * (a -= 1)) * Math.sin((a - this._p3) * g / this._p2))
            }, .3), d("ElasticInOut", function(a) {
                return 1 > (a *= 2) ? -.5 * this._p1 * Math.pow(2, 10 * (a -= 1)) * Math.sin((a - this._p3) * g / this._p2) : .5 * this._p1 * Math.pow(2, -10 * (a -= 1)) * Math.sin((a - this._p3) * g / this._p2) + 1
            }, .45)), l("Expo", j("ExpoOut", function(a) {
                return 1 - Math.pow(2, -10 * a)
            }), j("ExpoIn", function(a) {
                return Math.pow(2, 10 * (a - 1)) - .001
            }), j("ExpoInOut", function(a) {
                return 1 > (a *= 2) ? .5 * Math.pow(2, 10 * (a - 1)) : .5 * (2 - Math.pow(2, -10 * (a - 1)));
            })), l("Sine", j("SineOut", function(a) {
                return Math.sin(a * h)
            }), j("SineIn", function(a) {
                return -Math.cos(a * h) + 1
            }), j("SineInOut", function(a) {
                return -.5 * (Math.cos(Math.PI * a) - 1)
            })), i("easing.EaseLookup", {
                find: function(b) {
                    return a.map[b]
                }
            }, !0), k(e.SlowMo, "SlowMo", "ease,"), k(c, "RoughEase", "ease,"), k(b, "SteppedEase", "ease,"), o
        }, !0)
    }), window._gsDefine && window._gsQueue.pop()(), (window._gsQueue || (window._gsQueue = [])).push(function() {
        "use strict";
        window._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function(a, b) {
            var c, d, e, f, g = function() {
                    a.call(this, "css"), this._overwriteProps.length = 0, this.setRatio = g.prototype.setRatio
                },
                h = {},
                i = g.prototype = new a("css");
            i.constructor = g, g.version = "1.11.5", g.API = 2, g.defaultTransformPerspective = 0, i = "px", g.suffixMap = {
                top: i,
                right: i,
                bottom: i,
                left: i,
                width: i,
                height: i,
                fontSize: i,
                padding: i,
                margin: i,
                perspective: i,
                lineHeight: ""
            };
            var j, k, l, m, n, o, p = /(?:\d|\-\d|\.\d|\-\.\d)+/g,
                q = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
                r = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
                s = /[^\d\-\.]/g,
                t = /(?:\d|\-|\+|=|#|\.)*/g,
                u = /opacity *= *([^)]*)/,
                v = /opacity:([^;]*)/,
                w = /alpha\(opacity *=.+?\)/i,
                x = /^(rgb|hsl)/,
                y = /([A-Z])/g,
                z = /-([a-z])/gi,
                A = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
                B = function(a, b) {
                    return b.toUpperCase()
                },
                C = /(?:Left|Right|Width)/i,
                D = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
                E = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
                F = /,(?=[^\)]*(?:\(|$))/gi,
                G = Math.PI / 180,
                H = 180 / Math.PI,
                I = {},
                J = document,
                K = J.createElement("div"),
                L = J.createElement("img"),
                M = g._internals = {
                    _specialProps: h
                },
                N = navigator.userAgent,
                O = function() {
                    var a, b = N.indexOf("Android"),
                        c = J.createElement("div");
                    return l = -1 !== N.indexOf("Safari") && -1 === N.indexOf("Chrome") && (-1 === b || Number(N.substr(b + 8, 1)) > 3), n = l && 6 > Number(N.substr(N.indexOf("Version/") + 8, 1)), m = -1 !== N.indexOf("Firefox"), /MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(N) && (o = parseFloat(RegExp.$1)), c.innerHTML = "<a style='top:1px;opacity:.55;'>a</a>", a = c.getElementsByTagName("a")[0], a ? /^0.55/.test(a.style.opacity) : !1
                }(),
                P = function(a) {
                    return u.test("string" == typeof a ? a : (a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
                },
                Q = function(a) {
                    window.console && console.log(a)
                },
                R = "",
                S = "",
                T = function(a, b) {
                    b = b || K;
                    var c, d, e = b.style;
                    if (void 0 !== e[a]) return a;
                    for (a = a.charAt(0).toUpperCase() + a.substr(1), c = ["O", "Moz", "ms", "Ms", "Webkit"], d = 5; --d > -1 && void 0 === e[c[d] + a];);
                    return d >= 0 ? (S = 3 === d ? "ms" : c[d], R = "-" + S.toLowerCase() + "-", S + a) : null
                },
                U = J.defaultView ? J.defaultView.getComputedStyle : function() {},
                V = g.getStyle = function(a, b, c, d, e) {
                    var f;
                    return O || "opacity" !== b ? (!d && a.style[b] ? f = a.style[b] : (c = c || U(a, null)) ? (a = c.getPropertyValue(b.replace(y, "-$1").toLowerCase()), f = a || c.length ? a : c[b]) : a.currentStyle && (f = a.currentStyle[b]), null == e || f && "none" !== f && "auto" !== f && "auto auto" !== f ? f : e) : P(a)
                },
                W = function(a, b, c, d, e) {
                    if ("px" === d || !d) return c;
                    if ("auto" === d || !c) return 0;
                    var f, g = C.test(b),
                        h = a,
                        i = K.style,
                        j = 0 > c;
                    return j && (c = -c), "%" === d && -1 !== b.indexOf("border") ? f = c / 100 * (g ? a.clientWidth : a.clientHeight) : (i.cssText = "border:0 solid red;position:" + V(a, "position") + ";line-height:0;", "%" !== d && h.appendChild ? i[g ? "borderLeftWidth" : "borderTopWidth"] = c + d : (h = a.parentNode || J.body, i[g ? "width" : "height"] = c + d), h.appendChild(K), f = parseFloat(K[g ? "offsetWidth" : "offsetHeight"]), h.removeChild(K), 0 !== f || e || (f = W(a, b, c, d, !0))), j ? -f : f
                },
                X = function(a, b, c) {
                    if ("absolute" !== V(a, "position", c)) return 0;
                    var d = "left" === b ? "Left" : "Top",
                        e = V(a, "margin" + d, c);
                    return a["offset" + d] - (W(a, b, parseFloat(e), e.replace(t, "")) || 0)
                },
                Y = function(a, b) {
                    var c, d, e = {};
                    if (b = b || U(a, null))
                        if (c = b.length)
                            for (; --c > -1;) e[b[c].replace(z, B)] = b.getPropertyValue(b[c]);
                        else
                            for (c in b) e[c] = b[c];
                    else if (b = a.currentStyle || a.style)
                        for (c in b) "string" == typeof c && void 0 === e[c] && (e[c.replace(z, B)] = b[c]);
                    return O || (e.opacity = P(a)), d = xa(a, b, !1), e.rotation = d.rotation, e.skewX = d.skewX, e.scaleX = d.scaleX, e.scaleY = d.scaleY, e.x = d.x, e.y = d.y, wa && (e.z = d.z, e.rotationX = d.rotationX, e.rotationY = d.rotationY, e.scaleZ = d.scaleZ), e.filters && delete e.filters, e
                },
                Z = function(a, b, c, d, e) {
                    var f, g, h, i = {},
                        j = a.style;
                    for (g in c) "cssText" !== g && "length" !== g && isNaN(g) && (b[g] !== (f = c[g]) || e && e[g]) && -1 === g.indexOf("Origin") && ("number" == typeof f || "string" == typeof f) && (i[g] = "auto" !== f || "left" !== g && "top" !== g ? "" !== f && "auto" !== f && "none" !== f || "string" != typeof b[g] || "" === b[g].replace(s, "") ? f : 0 : X(a, g), void 0 !== j[g] && (h = new la(j, g, j[g], h)));
                    if (d)
                        for (g in d) "className" !== g && (i[g] = d[g]);
                    return {
                        difs: i,
                        firstMPT: h
                    }
                },
                $ = {
                    width: ["Left", "Right"],
                    height: ["Top", "Bottom"]
                },
                _ = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
                aa = function(a, b, c) {
                    var d = parseFloat("width" === b ? a.offsetWidth : a.offsetHeight),
                        e = $[b],
                        f = e.length;
                    for (c = c || U(a, null); --f > -1;) d -= parseFloat(V(a, "padding" + e[f], c, !0)) || 0, d -= parseFloat(V(a, "border" + e[f] + "Width", c, !0)) || 0;
                    return d
                },
                ba = function(a, b) {
                    (null == a || "" === a || "auto" === a || "auto auto" === a) && (a = "0 0");
                    var c = a.split(" "),
                        d = -1 !== a.indexOf("left") ? "0%" : -1 !== a.indexOf("right") ? "100%" : c[0],
                        e = -1 !== a.indexOf("top") ? "0%" : -1 !== a.indexOf("bottom") ? "100%" : c[1];
                    return null == e ? e = "0" : "center" === e && (e = "50%"), ("center" === d || isNaN(parseFloat(d)) && -1 === (d + "").indexOf("=")) && (d = "50%"), b && (b.oxp = -1 !== d.indexOf("%"), b.oyp = -1 !== e.indexOf("%"), b.oxr = "=" === d.charAt(1), b.oyr = "=" === e.charAt(1), b.ox = parseFloat(d.replace(s, "")), b.oy = parseFloat(e.replace(s, ""))), d + " " + e + (c.length > 2 ? " " + c[2] : "")
                },
                ca = function(a, b) {
                    return "string" == typeof a && "=" === a.charAt(1) ? parseInt(a.charAt(0) + "1", 10) * parseFloat(a.substr(2)) : parseFloat(a) - parseFloat(b)
                },
                da = function(a, b) {
                    return null == a ? b : "string" == typeof a && "=" === a.charAt(1) ? parseInt(a.charAt(0) + "1", 10) * Number(a.substr(2)) + b : parseFloat(a)
                },
                ea = function(a, b, c, d) {
                    var e, f, g, h, i = 1e-6;
                    return null == a ? h = b : "number" == typeof a ? h = a : (e = 360, f = a.split("_"), g = Number(f[0].replace(s, "")) * (-1 === a.indexOf("rad") ? 1 : H) - ("=" === a.charAt(1) ? 0 : b), f.length && (d && (d[c] = b + g), -1 !== a.indexOf("short") && (g %= e, g !== g % (e / 2) && (g = 0 > g ? g + e : g - e)), -1 !== a.indexOf("_cw") && 0 > g ? g = (g + 9999999999 * e) % e - (0 | g / e) * e : -1 !== a.indexOf("ccw") && g > 0 && (g = (g - 9999999999 * e) % e - (0 | g / e) * e)), h = b + g), i > h && h > -i && (h = 0), h
                },
                fa = {
                    aqua: [0, 255, 255],
                    lime: [0, 255, 0],
                    silver: [192, 192, 192],
                    black: [0, 0, 0],
                    maroon: [128, 0, 0],
                    teal: [0, 128, 128],
                    blue: [0, 0, 255],
                    navy: [0, 0, 128],
                    white: [255, 255, 255],
                    fuchsia: [255, 0, 255],
                    olive: [128, 128, 0],
                    yellow: [255, 255, 0],
                    orange: [255, 165, 0],
                    gray: [128, 128, 128],
                    purple: [128, 0, 128],
                    green: [0, 128, 0],
                    red: [255, 0, 0],
                    pink: [255, 192, 203],
                    cyan: [0, 255, 255],
                    transparent: [255, 255, 255, 0]
                },
                ga = function(a, b, c) {
                    return a = 0 > a ? a + 1 : a > 1 ? a - 1 : a, 0 | 255 * (1 > 6 * a ? b + 6 * (c - b) * a : .5 > a ? c : 2 > 3 * a ? b + 6 * (c - b) * (2 / 3 - a) : b) + .5
                },
                ha = function(a) {
                    var b, c, d, e, f, g;
                    return a && "" !== a ? "number" == typeof a ? [a >> 16, 255 & a >> 8, 255 & a] : ("," === a.charAt(a.length - 1) && (a = a.substr(0, a.length - 1)), fa[a] ? fa[a] : "#" === a.charAt(0) ? (4 === a.length && (b = a.charAt(1), c = a.charAt(2), d = a.charAt(3), a = "#" + b + b + c + c + d + d), a = parseInt(a.substr(1), 16), [a >> 16, 255 & a >> 8, 255 & a]) : "hsl" === a.substr(0, 3) ? (a = a.match(p), e = Number(a[0]) % 360 / 360, f = Number(a[1]) / 100, g = Number(a[2]) / 100, c = .5 >= g ? g * (f + 1) : g + f - g * f, b = 2 * g - c, a.length > 3 && (a[3] = Number(a[3])), a[0] = ga(e + 1 / 3, b, c), a[1] = ga(e, b, c), a[2] = ga(e - 1 / 3, b, c), a) : (a = a.match(p) || fa.transparent, a[0] = Number(a[0]), a[1] = Number(a[1]), a[2] = Number(a[2]), a.length > 3 && (a[3] = Number(a[3])), a)) : fa.black
                },
                ia = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b";
            for (i in fa) ia += "|" + i + "\\b";
            ia = RegExp(ia + ")", "gi");
            var ja = function(a, b, c, d) {
                    if (null == a) return function(a) {
                        return a
                    };
                    var e, f = b ? (a.match(ia) || [""])[0] : "",
                        g = a.split(f).join("").match(r) || [],
                        h = a.substr(0, a.indexOf(g[0])),
                        i = ")" === a.charAt(a.length - 1) ? ")" : "",
                        j = -1 !== a.indexOf(" ") ? " " : ",",
                        k = g.length,
                        l = k > 0 ? g[0].replace(p, "") : "";
                    return k ? e = b ? function(a) {
                        var b, m, n, o;
                        if ("number" == typeof a) a += l;
                        else if (d && F.test(a)) {
                            for (o = a.replace(F, "|").split("|"), n = 0; o.length > n; n++) o[n] = e(o[n]);
                            return o.join(",")
                        }
                        if (b = (a.match(ia) || [f])[0], m = a.split(b).join("").match(r) || [], n = m.length, k > n--)
                            for (; k > ++n;) m[n] = c ? m[0 | (n - 1) / 2] : g[n];
                        return h + m.join(j) + j + b + i + (-1 !== a.indexOf("inset") ? " inset" : "")
                    } : function(a) {
                        var b, f, m;
                        if ("number" == typeof a) a += l;
                        else if (d && F.test(a)) {
                            for (f = a.replace(F, "|").split("|"), m = 0; f.length > m; m++) f[m] = e(f[m]);
                            return f.join(",")
                        }
                        if (b = a.match(r) || [], m = b.length, k > m--)
                            for (; k > ++m;) b[m] = c ? b[0 | (m - 1) / 2] : g[m];
                        return h + b.join(j) + i
                    } : function(a) {
                        return a
                    }
                },
                ka = function(a) {
                    return a = a.split(","),
                        function(b, c, d, e, f, g, h) {
                            var i, j = (c + "").split(" ");
                            for (h = {}, i = 0; 4 > i; i++) h[a[i]] = j[i] = j[i] || j[(i - 1) / 2 >> 0];
                            return e.parse(b, h, f, g)
                        }
                },
                la = (M._setPluginRatio = function(a) {
                    this.plugin.setRatio(a);
                    for (var b, c, d, e, f = this.data, g = f.proxy, h = f.firstMPT, i = 1e-6; h;) b = g[h.v], h.r ? b = b > 0 ? 0 | b + .5 : 0 | b - .5 : i > b && b > -i && (b = 0), h.t[h.p] = b, h = h._next;
                    if (f.autoRotate && (f.autoRotate.rotation = g.rotation), 1 === a)
                        for (h = f.firstMPT; h;) {
                            if (c = h.t, c.type) {
                                if (1 === c.type) {
                                    for (e = c.xs0 + c.s + c.xs1, d = 1; c.l > d; d++) e += c["xn" + d] + c["xs" + (d + 1)];
                                    c.e = e
                                }
                            } else c.e = c.s + c.xs0;
                            h = h._next
                        }
                }, function(a, b, c, d, e) {
                    this.t = a, this.p = b, this.v = c, this.r = e, d && (d._prev = this, this._next = d)
                }),
                ma = (M._parseToProxy = function(a, b, c, d, e, f) {
                    var g, h, i, j, k, l = d,
                        m = {},
                        n = {},
                        o = c._transform,
                        p = I;
                    for (c._transform = null, I = b, d = k = c.parse(a, b, d, e), I = p, f && (c._transform = o, l && (l._prev = null, l._prev && (l._prev._next = null))); d && d !== l;) {
                        if (1 >= d.type && (h = d.p, n[h] = d.s + d.c, m[h] = d.s, f || (j = new la(d, "s", h, j, d.r), d.c = 0), 1 === d.type))
                            for (g = d.l; --g > 0;) i = "xn" + g, h = d.p + "_" + i, n[h] = d.data[i], m[h] = d[i], f || (j = new la(d, i, h, j, d.rxp[i]));
                        d = d._next
                    }
                    return {
                        proxy: m,
                        end: n,
                        firstMPT: j,
                        pt: k
                    }
                }, M.CSSPropTween = function(a, b, d, e, g, h, i, j, k, l, m) {
                    this.t = a, this.p = b, this.s = d, this.c = e, this.n = i || b, a instanceof ma || f.push(this.n), this.r = j, this.type = h || 0, k && (this.pr = k, c = !0), this.b = void 0 === l ? d : l, this.e = void 0 === m ? d + e : m, g && (this._next = g, g._prev = this)
                }),
                na = g.parseComplex = function(a, b, c, d, e, f, g, h, i, k) {
                    c = c || f || "", g = new ma(a, b, 0, 0, g, k ? 2 : 1, null, !1, h, c, d), d += "";
                    var l, m, n, o, r, s, t, u, v, w, y, z, A = c.split(", ").join(",").split(" "),
                        B = d.split(", ").join(",").split(" "),
                        C = A.length,
                        D = j !== !1;
                    for ((-1 !== d.indexOf(",") || -1 !== c.indexOf(",")) && (A = A.join(" ").replace(F, ", ").split(" "), B = B.join(" ").replace(F, ", ").split(" "), C = A.length), C !== B.length && (A = (f || "").split(" "), C = A.length), g.plugin = i, g.setRatio = k, l = 0; C > l; l++)
                        if (o = A[l], r = B[l], u = parseFloat(o), u || 0 === u) g.appendXtra("", u, ca(r, u), r.replace(q, ""), D && -1 !== r.indexOf("px"), !0);
                        else if (e && ("#" === o.charAt(0) || fa[o] || x.test(o))) z = "," === r.charAt(r.length - 1) ? ")," : ")", o = ha(o), r = ha(r), v = o.length + r.length > 6, v && !O && 0 === r[3] ? (g["xs" + g.l] += g.l ? " transparent" : "transparent", g.e = g.e.split(B[l]).join("transparent")) : (O || (v = !1), g.appendXtra(v ? "rgba(" : "rgb(", o[0], r[0] - o[0], ",", !0, !0).appendXtra("", o[1], r[1] - o[1], ",", !0).appendXtra("", o[2], r[2] - o[2], v ? "," : z, !0), v && (o = 4 > o.length ? 1 : o[3], g.appendXtra("", o, (4 > r.length ? 1 : r[3]) - o, z, !1)));
                    else if (s = o.match(p)) {
                        if (t = r.match(q), !t || t.length !== s.length) return g;
                        for (n = 0, m = 0; s.length > m; m++) y = s[m], w = o.indexOf(y, n), g.appendXtra(o.substr(n, w - n), Number(y), ca(t[m], y), "", D && "px" === o.substr(w + y.length, 2), 0 === m), n = w + y.length;
                        g["xs" + g.l] += o.substr(n)
                    } else g["xs" + g.l] += g.l ? " " + o : o;
                    if (-1 !== d.indexOf("=") && g.data) {
                        for (z = g.xs0 + g.data.s, l = 1; g.l > l; l++) z += g["xs" + l] + g.data["xn" + l];
                        g.e = z + g["xs" + l]
                    }
                    return g.l || (g.type = -1, g.xs0 = g.e), g.xfirst || g
                },
                oa = 9;
            for (i = ma.prototype, i.l = i.pr = 0; --oa > 0;) i["xn" + oa] = 0, i["xs" + oa] = "";
            i.xs0 = "", i._next = i._prev = i.xfirst = i.data = i.plugin = i.setRatio = i.rxp = null, i.appendXtra = function(a, b, c, d, e, f) {
                var g = this,
                    h = g.l;
                return g["xs" + h] += f && h ? " " + a : a || "", c || 0 === h || g.plugin ? (g.l++, g.type = g.setRatio ? 2 : 1, g["xs" + g.l] = d || "", h > 0 ? (g.data["xn" + h] = b + c, g.rxp["xn" + h] = e, g["xn" + h] = b, g.plugin || (g.xfirst = new ma(g, "xn" + h, b, c, g.xfirst || g, 0, g.n, e, g.pr), g.xfirst.xs0 = 0), g) : (g.data = {
                    s: b + c
                }, g.rxp = {}, g.s = b, g.c = c, g.r = e, g)) : (g["xs" + h] += b + (d || ""), g)
            };
            var pa = function(a, b) {
                    b = b || {}, this.p = b.prefix ? T(a) || a : a, h[a] = h[this.p] = this, this.format = b.formatter || ja(b.defaultValue, b.color, b.collapsible, b.multi), b.parser && (this.parse = b.parser), this.clrs = b.color, this.multi = b.multi, this.keyword = b.keyword, this.dflt = b.defaultValue, this.pr = b.priority || 0
                },
                qa = M._registerComplexSpecialProp = function(a, b, c) {
                    "object" != typeof b && (b = {
                        parser: c
                    });
                    var d, e, f = a.split(","),
                        g = b.defaultValue;
                    for (c = c || [g], d = 0; f.length > d; d++) b.prefix = 0 === d && b.prefix, b.defaultValue = c[d] || g, e = new pa(f[d], b)
                },
                ra = function(a) {
                    if (!h[a]) {
                        var b = a.charAt(0).toUpperCase() + a.substr(1) + "Plugin";
                        qa(a, {
                            parser: function(a, c, d, e, f, g, i) {
                                var j = (window.GreenSockGlobals || window).com.greensock.plugins[b];
                                return j ? (j._cssRegister(), h[d].parse(a, c, d, e, f, g, i)) : (Q("Error: " + b + " js file not loaded."), f)
                            }
                        })
                    }
                };
            i = pa.prototype, i.parseComplex = function(a, b, c, d, e, f) {
                var g, h, i, j, k, l, m = this.keyword;
                if (this.multi && (F.test(c) || F.test(b) ? (h = b.replace(F, "|").split("|"), i = c.replace(F, "|").split("|")) : m && (h = [b], i = [c])), i) {
                    for (j = i.length > h.length ? i.length : h.length, g = 0; j > g; g++) b = h[g] = h[g] || this.dflt, c = i[g] = i[g] || this.dflt, m && (k = b.indexOf(m), l = c.indexOf(m), k !== l && (c = -1 === l ? i : h, c[g] += " " + m));
                    b = h.join(", "), c = i.join(", ")
                }
                return na(a, this.p, b, c, this.clrs, this.dflt, d, this.pr, e, f)
            }, i.parse = function(a, b, c, d, f, g) {
                return this.parseComplex(a.style, this.format(V(a, this.p, e, !1, this.dflt)), this.format(b), f, g)
            }, g.registerSpecialProp = function(a, b, c) {
                qa(a, {
                    parser: function(a, d, e, f, g, h) {
                        var i = new ma(a, e, 0, 0, g, 2, e, !1, c);
                        return i.plugin = h, i.setRatio = b(a, d, f._tween, e), i
                    },
                    priority: c
                })
            };
            var sa = "scaleX,scaleY,scaleZ,x,y,z,skewX,rotation,rotationX,rotationY,perspective".split(","),
                ta = T("transform"),
                ua = R + "transform",
                va = T("transformOrigin"),
                wa = null !== T("perspective"),
                xa = function(a, b, c, d) {
                    if (a._gsTransform && c && !d) return a._gsTransform;
                    var e, f, h, i, j, k, l, m, n, o, p, q, r, s = c ? a._gsTransform || {
                            skewY: 0
                        } : {
                            skewY: 0
                        },
                        t = 0 > s.scaleX,
                        u = 2e-5,
                        v = 1e5,
                        w = 179.99,
                        x = w * G,
                        y = wa ? parseFloat(V(a, va, b, !1, "0 0 0").split(" ")[2]) || s.zOrigin || 0 : 0;
                    for (ta ? e = V(a, ua, b, !0) : a.currentStyle && (e = a.currentStyle.filter.match(D), e = e && 4 === e.length ? [e[0].substr(4), Number(e[2].substr(4)), Number(e[1].substr(4)), e[3].substr(4), s.x || 0, s.y || 0].join(",") : ""), f = (e || "").match(/(?:\-|\b)[\d\-\.e]+\b/gi) || [], h = f.length; --h > -1;) i = Number(f[h]), f[h] = (j = i - (i |= 0)) ? (0 | j * v + (0 > j ? -.5 : .5)) / v + i : i;
                    if (16 === f.length) {
                        var z = f[8],
                            A = f[9],
                            B = f[10],
                            C = f[12],
                            E = f[13],
                            F = f[14];
                        if (s.zOrigin && (F = -s.zOrigin, C = z * F - f[12], E = A * F - f[13], F = B * F + s.zOrigin - f[14]), !c || d || null == s.rotationX) {
                            var I, J, K, L, M, N, O, P = f[0],
                                Q = f[1],
                                R = f[2],
                                S = f[3],
                                T = f[4],
                                U = f[5],
                                W = f[6],
                                X = f[7],
                                Y = f[11],
                                Z = Math.atan2(W, B),
                                $ = -x > Z || Z > x;
                            s.rotationX = Z * H, Z && (L = Math.cos(-Z), M = Math.sin(-Z), I = T * L + z * M, J = U * L + A * M, K = W * L + B * M, z = T * -M + z * L, A = U * -M + A * L, B = W * -M + B * L, Y = X * -M + Y * L, T = I, U = J, W = K), Z = Math.atan2(z, P), s.rotationY = Z * H, Z && (N = -x > Z || Z > x, L = Math.cos(-Z), M = Math.sin(-Z), I = P * L - z * M, J = Q * L - A * M, K = R * L - B * M, A = Q * M + A * L, B = R * M + B * L, Y = S * M + Y * L, P = I, Q = J, R = K), Z = Math.atan2(Q, U), s.rotation = Z * H, Z && (O = -x > Z || Z > x, L = Math.cos(-Z), M = Math.sin(-Z), P = P * L + T * M, J = Q * L + U * M, U = Q * -M + U * L, W = R * -M + W * L, Q = J), O && $ ? s.rotation = s.rotationX = 0 : O && N ? s.rotation = s.rotationY = 0 : N && $ && (s.rotationY = s.rotationX = 0), s.scaleX = (0 | Math.sqrt(P * P + Q * Q) * v + .5) / v, s.scaleY = (0 | Math.sqrt(U * U + A * A) * v + .5) / v, s.scaleZ = (0 | Math.sqrt(W * W + B * B) * v + .5) / v, s.skewX = 0, s.perspective = Y ? 1 / (0 > Y ? -Y : Y) : 0, s.x = C, s.y = E, s.z = F
                        }
                    } else if (!(wa && !d && f.length && s.x === f[4] && s.y === f[5] && (s.rotationX || s.rotationY) || void 0 !== s.x && "none" === V(a, "display", b))) {
                        var _ = f.length >= 6,
                            aa = _ ? f[0] : 1,
                            ba = f[1] || 0,
                            ca = f[2] || 0,
                            da = _ ? f[3] : 1;
                        s.x = f[4] || 0, s.y = f[5] || 0, k = Math.sqrt(aa * aa + ba * ba), l = Math.sqrt(da * da + ca * ca), m = aa || ba ? Math.atan2(ba, aa) * H : s.rotation || 0, n = ca || da ? Math.atan2(ca, da) * H + m : s.skewX || 0, o = k - Math.abs(s.scaleX || 0), p = l - Math.abs(s.scaleY || 0), Math.abs(n) > 90 && 270 > Math.abs(n) && (t ? (k *= -1, n += 0 >= m ? 180 : -180, m += 0 >= m ? 180 : -180) : (l *= -1, n += 0 >= n ? 180 : -180)), q = (m - s.rotation) % 180, r = (n - s.skewX) % 180, (void 0 === s.skewX || o > u || -u > o || p > u || -u > p || q > -w && w > q && !1 | q * v || r > -w && w > r && !1 | r * v) && (s.scaleX = k, s.scaleY = l, s.rotation = m, s.skewX = n), wa && (s.rotationX = s.rotationY = s.z = 0, s.perspective = parseFloat(g.defaultTransformPerspective) || 0, s.scaleZ = 1)
                    }
                    s.zOrigin = y;
                    for (h in s) u > s[h] && s[h] > -u && (s[h] = 0);
                    return c && (a._gsTransform = s), s
                },
                ya = function(a) {
                    var b, c, d = this.data,
                        e = -d.rotation * G,
                        f = e + d.skewX * G,
                        g = 1e5,
                        h = (0 | Math.cos(e) * d.scaleX * g) / g,
                        i = (0 | Math.sin(e) * d.scaleX * g) / g,
                        j = (0 | Math.sin(f) * -d.scaleY * g) / g,
                        k = (0 | Math.cos(f) * d.scaleY * g) / g,
                        l = this.t.style,
                        m = this.t.currentStyle;
                    if (m) {
                        c = i, i = -j, j = -c, b = m.filter, l.filter = "";
                        var n, p, q = this.t.offsetWidth,
                            r = this.t.offsetHeight,
                            s = "absolute" !== m.position,
                            v = "progid:DXImageTransform.Microsoft.Matrix(M11=" + h + ", M12=" + i + ", M21=" + j + ", M22=" + k,
                            w = d.x,
                            x = d.y;
                        if (null != d.ox && (n = (d.oxp ? .01 * q * d.ox : d.ox) - q / 2, p = (d.oyp ? .01 * r * d.oy : d.oy) - r / 2, w += n - (n * h + p * i), x += p - (n * j + p * k)), s ? (n = q / 2, p = r / 2, v += ", Dx=" + (n - (n * h + p * i) + w) + ", Dy=" + (p - (n * j + p * k) + x) + ")") : v += ", sizingMethod='auto expand')", l.filter = -1 !== b.indexOf("DXImageTransform.Microsoft.Matrix(") ? b.replace(E, v) : v + " " + b, (0 === a || 1 === a) && 1 === h && 0 === i && 0 === j && 1 === k && (s && -1 === v.indexOf("Dx=0, Dy=0") || u.test(b) && 100 !== parseFloat(RegExp.$1) || -1 === b.indexOf(b.indexOf("Alpha")) && l.removeAttribute("filter")), !s) {
                            var y, z, A, B = 8 > o ? 1 : -1;
                            for (n = d.ieOffsetX || 0, p = d.ieOffsetY || 0, d.ieOffsetX = Math.round((q - ((0 > h ? -h : h) * q + (0 > i ? -i : i) * r)) / 2 + w), d.ieOffsetY = Math.round((r - ((0 > k ? -k : k) * r + (0 > j ? -j : j) * q)) / 2 + x), oa = 0; 4 > oa; oa++) z = _[oa], y = m[z], c = -1 !== y.indexOf("px") ? parseFloat(y) : W(this.t, z, parseFloat(y), y.replace(t, "")) || 0, A = c !== d[z] ? 2 > oa ? -d.ieOffsetX : -d.ieOffsetY : 2 > oa ? n - d.ieOffsetX : p - d.ieOffsetY, l[z] = (d[z] = Math.round(c - A * (0 === oa || 2 === oa ? 1 : B))) + "px"
                        }
                    }
                },
                za = function() {
                    var a, b, c, d, e, f, g, h, i, j, k, l, n, o, p, q, r, s, t, u, v, w, x, y = this.data,
                        z = this.t.style,
                        A = y.rotation * G,
                        B = y.scaleX,
                        C = y.scaleY,
                        D = y.scaleZ,
                        E = y.perspective;
                    if (m) {
                        var F = 1e-4;
                        F > B && B > -F && (B = D = 2e-5), F > C && C > -F && (C = D = 2e-5), !E || y.z || y.rotationX || y.rotationY || (E = 0)
                    }
                    if (A || y.skewX) s = Math.cos(A), t = Math.sin(A), a = s, e = t, y.skewX && (A -= y.skewX * G, s = Math.cos(A), t = Math.sin(A)), b = -t, f = s;
                    else {
                        if (!(y.rotationY || y.rotationX || 1 !== D || E)) return void(z[ta] = "translate3d(" + y.x + "px," + y.y + "px," + y.z + "px)" + (1 !== B || 1 !== C ? " scale(" + B + "," + C + ")" : ""));
                        a = f = 1, b = e = 0
                    }
                    k = 1, c = d = g = h = i = j = l = n = o = 0, p = E ? -1 / E : 0, q = y.zOrigin, r = 1e5, A = y.rotationY * G, A && (s = Math.cos(A), t = Math.sin(A), i = k * -t, n = p * -t, c = a * t, g = e * t, k *= s, p *= s, a *= s, e *= s), A = y.rotationX * G, A && (s = Math.cos(A), t = Math.sin(A), u = b * s + c * t, v = f * s + g * t, w = j * s + k * t, x = o * s + p * t, c = b * -t + c * s, g = f * -t + g * s, k = j * -t + k * s, p = o * -t + p * s, b = u, f = v, j = w, o = x), 1 !== D && (c *= D, g *= D, k *= D, p *= D), 1 !== C && (b *= C, f *= C, j *= C, o *= C), 1 !== B && (a *= B, e *= B, i *= B, n *= B), q && (l -= q, d = c * l, h = g * l, l = k * l + q), d = (u = (d += y.x) - (d |= 0)) ? (0 | u * r + (0 > u ? -.5 : .5)) / r + d : d, h = (u = (h += y.y) - (h |= 0)) ? (0 | u * r + (0 > u ? -.5 : .5)) / r + h : h, l = (u = (l += y.z) - (l |= 0)) ? (0 | u * r + (0 > u ? -.5 : .5)) / r + l : l, z[ta] = "matrix3d(" + [(0 | a * r) / r, (0 | e * r) / r, (0 | i * r) / r, (0 | n * r) / r, (0 | b * r) / r, (0 | f * r) / r, (0 | j * r) / r, (0 | o * r) / r, (0 | c * r) / r, (0 | g * r) / r, (0 | k * r) / r, (0 | p * r) / r, d, h, l, E ? 1 + -l / E : 1].join(",") + ")"
                },
                Aa = function(a) {
                    var b, c, d, e, f, g = this.data,
                        h = this.t,
                        i = h.style;
                    return g.rotationX || g.rotationY || g.z || g.force3D ? (this.setRatio = za, void za.call(this, a)) : void(g.rotation || g.skewX ? (b = g.rotation * G, c = b - g.skewX * G, d = 1e5, e = g.scaleX * d, f = g.scaleY * d, i[ta] = "matrix(" + (0 | Math.cos(b) * e) / d + "," + (0 | Math.sin(b) * e) / d + "," + (0 | Math.sin(c) * -f) / d + "," + (0 | Math.cos(c) * f) / d + "," + g.x + "," + g.y + ")") : i[ta] = "matrix(" + g.scaleX + ",0,0," + g.scaleY + "," + g.x + "," + g.y + ")")
                };
            qa("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,transformPerspective,directionalRotation,parseTransform,force3D", {
                parser: function(a, b, c, d, f, g, h) {
                    if (d._transform) return f;
                    var i, j, k, l, m, n, o, p = d._transform = xa(a, e, !0, h.parseTransform),
                        q = a.style,
                        r = 1e-6,
                        s = sa.length,
                        t = h,
                        u = {};
                    if ("string" == typeof t.transform && ta) k = q.cssText, q[ta] = t.transform, q.display = "block", i = xa(a, null, !1), q.cssText = k;
                    else if ("object" == typeof t) {
                        if (i = {
                                scaleX: da(null != t.scaleX ? t.scaleX : t.scale, p.scaleX),
                                scaleY: da(null != t.scaleY ? t.scaleY : t.scale, p.scaleY),
                                scaleZ: da(t.scaleZ, p.scaleZ),
                                x: da(t.x, p.x),
                                y: da(t.y, p.y),
                                z: da(t.z, p.z),
                                perspective: da(t.transformPerspective, p.perspective)
                            }, o = t.directionalRotation, null != o)
                            if ("object" == typeof o)
                                for (k in o) t[k] = o[k];
                            else t.rotation = o;
                        i.rotation = ea("rotation" in t ? t.rotation : "shortRotation" in t ? t.shortRotation + "_short" : "rotationZ" in t ? t.rotationZ : p.rotation, p.rotation, "rotation", u), wa && (i.rotationX = ea("rotationX" in t ? t.rotationX : "shortRotationX" in t ? t.shortRotationX + "_short" : p.rotationX || 0, p.rotationX, "rotationX", u), i.rotationY = ea("rotationY" in t ? t.rotationY : "shortRotationY" in t ? t.shortRotationY + "_short" : p.rotationY || 0, p.rotationY, "rotationY", u)), i.skewX = null == t.skewX ? p.skewX : ea(t.skewX, p.skewX), i.skewY = null == t.skewY ? p.skewY : ea(t.skewY, p.skewY), (j = i.skewY - p.skewY) && (i.skewX += j, i.rotation += j)
                    }
                    for (wa && null != t.force3D && (p.force3D = t.force3D, n = !0), m = p.force3D || p.z || p.rotationX || p.rotationY || i.z || i.rotationX || i.rotationY || i.perspective, m || null == t.scale || (i.scaleZ = 1); --s > -1;) c = sa[s], l = i[c] - p[c], (l > r || -r > l || null != I[c]) && (n = !0, f = new ma(p, c, p[c], l, f), c in u && (f.e = u[c]), f.xs0 = 0, f.plugin = g, d._overwriteProps.push(f.n));
                    return l = t.transformOrigin, (l || wa && m && p.zOrigin) && (ta ? (n = !0, c = va, l = (l || V(a, c, e, !1, "50% 50%")) + "", f = new ma(q, c, 0, 0, f, -1, "transformOrigin"), f.b = q[c], f.plugin = g, wa ? (k = p.zOrigin, l = l.split(" "), p.zOrigin = (l.length > 2 && (0 === k || "0px" !== l[2]) ? parseFloat(l[2]) : k) || 0, f.xs0 = f.e = q[c] = l[0] + " " + (l[1] || "50%") + " 0px", f = new ma(p, "zOrigin", 0, 0, f, -1, f.n), f.b = k, f.xs0 = f.e = p.zOrigin) : f.xs0 = f.e = q[c] = l) : ba(l + "", p)), n && (d._transformType = m || 3 === this._transformType ? 3 : 2), f
                },
                prefix: !0
            }), qa("boxShadow", {
                defaultValue: "0px 0px 0px 0px #999",
                prefix: !0,
                color: !0,
                multi: !0,
                keyword: "inset"
            }), qa("borderRadius", {
                defaultValue: "0px",
                parser: function(a, b, c, f, g) {
                    b = this.format(b);
                    var h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
                        y = a.style;
                    for (p = parseFloat(a.offsetWidth), q = parseFloat(a.offsetHeight), h = b.split(" "), i = 0; x.length > i; i++) this.p.indexOf("border") && (x[i] = T(x[i])), l = k = V(a, x[i], e, !1, "0px"), -1 !== l.indexOf(" ") && (k = l.split(" "), l = k[0], k = k[1]), m = j = h[i], n = parseFloat(l), s = l.substr((n + "").length), t = "=" === m.charAt(1), t ? (o = parseInt(m.charAt(0) + "1", 10), m = m.substr(2), o *= parseFloat(m), r = m.substr((o + "").length - (0 > o ? 1 : 0)) || "") : (o = parseFloat(m), r = m.substr((o + "").length)), "" === r && (r = d[c] || s), r !== s && (u = W(a, "borderLeft", n, s), v = W(a, "borderTop", n, s), "%" === r ? (l = 100 * (u / p) + "%", k = 100 * (v / q) + "%") : "em" === r ? (w = W(a, "borderLeft", 1, "em"), l = u / w + "em", k = v / w + "em") : (l = u + "px", k = v + "px"), t && (m = parseFloat(l) + o + r, j = parseFloat(k) + o + r)), g = na(y, x[i], l + " " + k, m + " " + j, !1, "0px", g);
                    return g
                },
                prefix: !0,
                formatter: ja("0px 0px 0px 0px", !1, !0)
            }), qa("backgroundPosition", {
                defaultValue: "0 0",
                parser: function(a, b, c, d, f, g) {
                    var h, i, j, k, l, m, n = "background-position",
                        p = e || U(a, null),
                        q = this.format((p ? o ? p.getPropertyValue(n + "-x") + " " + p.getPropertyValue(n + "-y") : p.getPropertyValue(n) : a.currentStyle.backgroundPositionX + " " + a.currentStyle.backgroundPositionY) || "0 0"),
                        r = this.format(b);
                    if (-1 !== q.indexOf("%") != (-1 !== r.indexOf("%")) && (m = V(a, "backgroundImage").replace(A, ""), m && "none" !== m)) {
                        for (h = q.split(" "), i = r.split(" "), L.setAttribute("src", m), j = 2; --j > -1;) q = h[j], k = -1 !== q.indexOf("%"), k !== (-1 !== i[j].indexOf("%")) && (l = 0 === j ? a.offsetWidth - L.width : a.offsetHeight - L.height, h[j] = k ? parseFloat(q) / 100 * l + "px" : 100 * (parseFloat(q) / l) + "%");
                        q = h.join(" ")
                    }
                    return this.parseComplex(a.style, q, r, f, g)
                },
                formatter: ba
            }), qa("backgroundSize", {
                defaultValue: "0 0",
                formatter: ba
            }), qa("perspective", {
                defaultValue: "0px",
                prefix: !0
            }), qa("perspectiveOrigin", {
                defaultValue: "50% 50%",
                prefix: !0
            }), qa("transformStyle", {
                prefix: !0
            }), qa("backfaceVisibility", {
                prefix: !0
            }), qa("userSelect", {
                prefix: !0
            }), qa("margin", {
                parser: ka("marginTop,marginRight,marginBottom,marginLeft")
            }), qa("padding", {
                parser: ka("paddingTop,paddingRight,paddingBottom,paddingLeft")
            }), qa("clip", {
                defaultValue: "rect(0px,0px,0px,0px)",
                parser: function(a, b, c, d, f, g) {
                    var h, i, j;
                    return 9 > o ? (i = a.currentStyle, j = 8 > o ? " " : ",", h = "rect(" + i.clipTop + j + i.clipRight + j + i.clipBottom + j + i.clipLeft + ")", b = this.format(b).split(",").join(j)) : (h = this.format(V(a, this.p, e, !1, this.dflt)), b = this.format(b)), this.parseComplex(a.style, h, b, f, g)
                }
            }), qa("textShadow", {
                defaultValue: "0px 0px 0px #999",
                color: !0,
                multi: !0
            }), qa("autoRound,strictUnits", {
                parser: function(a, b, c, d, e) {
                    return e
                }
            }), qa("border", {
                defaultValue: "0px solid #000",
                parser: function(a, b, c, d, f, g) {
                    return this.parseComplex(a.style, this.format(V(a, "borderTopWidth", e, !1, "0px") + " " + V(a, "borderTopStyle", e, !1, "solid") + " " + V(a, "borderTopColor", e, !1, "#000")), this.format(b), f, g)
                },
                color: !0,
                formatter: function(a) {
                    var b = a.split(" ");
                    return b[0] + " " + (b[1] || "solid") + " " + (a.match(ia) || ["#000"])[0]
                }
            }), qa("borderWidth", {
                parser: ka("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
            }), qa("float,cssFloat,styleFloat", {
                parser: function(a, b, c, d, e) {
                    var f = a.style,
                        g = "cssFloat" in f ? "cssFloat" : "styleFloat";
                    return new ma(f, g, 0, 0, e, -1, c, !1, 0, f[g], b)
                }
            });
            var Ba = function(a) {
                var b, c = this.t,
                    d = c.filter || V(this.data, "filter"),
                    e = 0 | this.s + this.c * a;
                100 === e && (-1 === d.indexOf("atrix(") && -1 === d.indexOf("radient(") && -1 === d.indexOf("oader(") ? (c.removeAttribute("filter"), b = !V(this.data, "filter")) : (c.filter = d.replace(w, ""), b = !0)), b || (this.xn1 && (c.filter = d = d || "alpha(opacity=" + e + ")"), -1 === d.indexOf("opacity") ? 0 === e && this.xn1 || (c.filter = d + " alpha(opacity=" + e + ")") : c.filter = d.replace(u, "opacity=" + e))
            };
            qa("opacity,alpha,autoAlpha", {
                defaultValue: "1",
                parser: function(a, b, c, d, f, g) {
                    var h = parseFloat(V(a, "opacity", e, !1, "1")),
                        i = a.style,
                        j = "autoAlpha" === c;
                    return "string" == typeof b && "=" === b.charAt(1) && (b = ("-" === b.charAt(0) ? -1 : 1) * parseFloat(b.substr(2)) + h), j && 1 === h && "hidden" === V(a, "visibility", e) && 0 !== b && (h = 0), O ? f = new ma(i, "opacity", h, b - h, f) : (f = new ma(i, "opacity", 100 * h, 100 * (b - h), f), f.xn1 = j ? 1 : 0, i.zoom = 1, f.type = 2, f.b = "alpha(opacity=" + f.s + ")", f.e = "alpha(opacity=" + (f.s + f.c) + ")", f.data = a, f.plugin = g, f.setRatio = Ba), j && (f = new ma(i, "visibility", 0, 0, f, -1, null, !1, 0, 0 !== h ? "inherit" : "hidden", 0 === b ? "hidden" : "inherit"), f.xs0 = "inherit", d._overwriteProps.push(f.n), d._overwriteProps.push(c)), f
                }
            });
            var Ca = function(a, b) {
                    b && (a.removeProperty ? a.removeProperty(b.replace(y, "-$1").toLowerCase()) : a.removeAttribute(b))
                },
                Da = function(a) {
                    if (this.t._gsClassPT = this, 1 === a || 0 === a) {
                        this.t.className = 0 === a ? this.b : this.e;
                        for (var b = this.data, c = this.t.style; b;) b.v ? c[b.p] = b.v : Ca(c, b.p), b = b._next;
                        1 === a && this.t._gsClassPT === this && (this.t._gsClassPT = null)
                    } else this.t.className !== this.e && (this.t.className = this.e)
                };
            qa("className", {
                parser: function(a, b, d, f, g, h, i) {
                    var j, k, l, m, n, o = a.className,
                        p = a.style.cssText;
                    if (g = f._classNamePT = new ma(a, d, 0, 0, g, 2), g.setRatio = Da, g.pr = -11, c = !0, g.b = o, k = Y(a, e), l = a._gsClassPT) {
                        for (m = {}, n = l.data; n;) m[n.p] = 1, n = n._next;
                        l.setRatio(1)
                    }
                    return a._gsClassPT = g, g.e = "=" !== b.charAt(1) ? b : o.replace(RegExp("\\s*\\b" + b.substr(2) + "\\b"), "") + ("+" === b.charAt(0) ? " " + b.substr(2) : ""), f._tween._duration && (a.className = g.e, j = Z(a, k, Y(a), i, m), a.className = o, g.data = j.firstMPT, a.style.cssText = p, g = g.xfirst = f.parse(a, j.difs, g, h)), g
                }
            });
            var Ea = function(a) {
                if ((1 === a || 0 === a) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
                    var b, c, d, e, f = this.t.style,
                        g = h.transform.parse;
                    if ("all" === this.e) f.cssText = "", e = !0;
                    else
                        for (b = this.e.split(","), d = b.length; --d > -1;) c = b[d], h[c] && (h[c].parse === g ? e = !0 : c = "transformOrigin" === c ? va : h[c].p), Ca(f, c);
                    e && (Ca(f, ta), this.t._gsTransform && delete this.t._gsTransform)
                }
            };
            for (qa("clearProps", {
                    parser: function(a, b, d, e, f) {
                        return f = new ma(a, d, 0, 0, f, 2), f.setRatio = Ea, f.e = b, f.pr = -10, f.data = e._tween, c = !0, f
                    }
                }), i = "bezier,throwProps,physicsProps,physics2D".split(","), oa = i.length; oa--;) ra(i[oa]);
            i = g.prototype, i._firstPT = null, i._onInitTween = function(a, b, h) {
                if (!a.nodeType) return !1;
                this._target = a, this._tween = h, this._vars = b, j = b.autoRound, c = !1, d = b.suffixMap || g.suffixMap, e = U(a, ""), f = this._overwriteProps;
                var i, m, o, p, q, r, s, t, u, w = a.style;
                if (k && "" === w.zIndex && (i = V(a, "zIndex", e), ("auto" === i || "" === i) && (w.zIndex = 0)), "string" == typeof b && (p = w.cssText, i = Y(a, e), w.cssText = p + ";" + b, i = Z(a, i, Y(a)).difs, !O && v.test(b) && (i.opacity = parseFloat(RegExp.$1)), b = i, w.cssText = p), this._firstPT = m = this.parse(a, b, null), this._transformType) {
                    for (u = 3 === this._transformType, ta ? l && (k = !0, "" === w.zIndex && (s = V(a, "zIndex", e), ("auto" === s || "" === s) && (w.zIndex = 0)), n && (w.WebkitBackfaceVisibility = this._vars.WebkitBackfaceVisibility || (u ? "visible" : "hidden"))) : w.zoom = 1, o = m; o && o._next;) o = o._next;
                    t = new ma(a, "transform", 0, 0, null, 2), this._linkCSSP(t, null, o), t.setRatio = u && wa ? za : ta ? Aa : ya, t.data = this._transform || xa(a, e, !0), f.pop()
                }
                if (c) {
                    for (; m;) {
                        for (r = m._next, o = p; o && o.pr > m.pr;) o = o._next;
                        (m._prev = o ? o._prev : q) ? m._prev._next = m: p = m, (m._next = o) ? o._prev = m : q = m, m = r
                    }
                    this._firstPT = p
                }
                return !0
            }, i.parse = function(a, b, c, f) {
                var g, i, k, l, m, n, o, p, q, r, s = a.style;
                for (g in b) n = b[g], i = h[g], i ? c = i.parse(a, n, g, this, c, f, b) : (m = V(a, g, e) + "", q = "string" == typeof n, "color" === g || "fill" === g || "stroke" === g || -1 !== g.indexOf("Color") || q && x.test(n) ? (q || (n = ha(n), n = (n.length > 3 ? "rgba(" : "rgb(") + n.join(",") + ")"), c = na(s, g, m, n, !0, "transparent", c, 0, f)) : !q || -1 === n.indexOf(" ") && -1 === n.indexOf(",") ? (k = parseFloat(m), o = k || 0 === k ? m.substr((k + "").length) : "", ("" === m || "auto" === m) && ("width" === g || "height" === g ? (k = aa(a, g, e), o = "px") : "left" === g || "top" === g ? (k = X(a, g, e), o = "px") : (k = "opacity" !== g ? 0 : 1, o = "")), r = q && "=" === n.charAt(1), r ? (l = parseInt(n.charAt(0) + "1", 10), n = n.substr(2), l *= parseFloat(n), p = n.replace(t, "")) : (l = parseFloat(n), p = q ? n.substr((l + "").length) || "" : ""), "" === p && (p = g in d ? d[g] : o), n = l || 0 === l ? (r ? l + k : l) + p : b[g], o !== p && "" !== p && (l || 0 === l) && (k || 0 === k) && (k = W(a, g, k, o), "%" === p ? (k /= W(a, g, 100, "%") / 100, b.strictUnits !== !0 && (m = k + "%")) : "em" === p ? k /= W(a, g, 1, "em") : (l = W(a, g, l, p), p = "px"), r && (l || 0 === l) && (n = l + k + p)), r && (l += k), !k && 0 !== k || !l && 0 !== l ? void 0 !== s[g] && (n || "NaN" != n + "" && null != n) ? (c = new ma(s, g, l || k || 0, 0, c, -1, g, !1, 0, m, n), c.xs0 = "none" !== n || "display" !== g && -1 === g.indexOf("Style") ? n : m) : Q("invalid " + g + " tween value: " + b[g]) : (c = new ma(s, g, k, l - k, c, 0, g, j !== !1 && ("px" === p || "zIndex" === g), 0, m, n), c.xs0 = p)) : c = na(s, g, m, n, !0, null, c, 0, f)), f && c && !c.plugin && (c.plugin = f);
                return c
            }, i.setRatio = function(a) {
                var b, c, d, e = this._firstPT,
                    f = 1e-6;
                if (1 !== a || this._tween._time !== this._tween._duration && 0 !== this._tween._time)
                    if (a || this._tween._time !== this._tween._duration && 0 !== this._tween._time || this._tween._rawPrevTime === -1e-6)
                        for (; e;) {
                            if (b = e.c * a + e.s, e.r ? b = b > 0 ? 0 | b + .5 : 0 | b - .5 : f > b && b > -f && (b = 0), e.type)
                                if (1 === e.type)
                                    if (d = e.l, 2 === d) e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2;
                                    else if (3 === d) e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2 + e.xn2 + e.xs3;
                            else if (4 === d) e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2 + e.xn2 + e.xs3 + e.xn3 + e.xs4;
                            else if (5 === d) e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2 + e.xn2 + e.xs3 + e.xn3 + e.xs4 + e.xn4 + e.xs5;
                            else {
                                for (c = e.xs0 + b + e.xs1, d = 1; e.l > d; d++) c += e["xn" + d] + e["xs" + (d + 1)];
                                e.t[e.p] = c
                            } else -1 === e.type ? e.t[e.p] = e.xs0 : e.setRatio && e.setRatio(a);
                            else e.t[e.p] = b + e.xs0;
                            e = e._next
                        } else
                            for (; e;) 2 !== e.type ? e.t[e.p] = e.b : e.setRatio(a), e = e._next;
                    else
                        for (; e;) 2 !== e.type ? e.t[e.p] = e.e : e.setRatio(a), e = e._next
            }, i._enableTransforms = function(a) {
                this._transformType = a || 3 === this._transformType ? 3 : 2, this._transform = this._transform || xa(this._target, e, !0)
            }, i._linkCSSP = function(a, b, c, d) {
                return a && (b && (b._prev = a), a._next && (a._next._prev = a._prev), a._prev ? a._prev._next = a._next : this._firstPT === a && (this._firstPT = a._next, d = !0), c ? c._next = a : d || null !== this._firstPT || (this._firstPT = a), a._next = b, a._prev = c), a
            }, i._kill = function(b) {
                var c, d, e, f = b;
                if (b.autoAlpha || b.alpha) {
                    f = {};
                    for (d in b) f[d] = b[d];
                    f.opacity = 1, f.autoAlpha && (f.visibility = 1)
                }
                return b.className && (c = this._classNamePT) && (e = c.xfirst, e && e._prev ? this._linkCSSP(e._prev, c._next, e._prev._prev) : e === this._firstPT && (this._firstPT = c._next), c._next && this._linkCSSP(c._next, c._next._next, e._prev), this._classNamePT = null), a.prototype._kill.call(this, f)
            };
            var Fa = function(a, b, c) {
                var d, e, f, g;
                if (a.slice)
                    for (e = a.length; --e > -1;) Fa(a[e], b, c);
                else
                    for (d = a.childNodes, e = d.length; --e > -1;) f = d[e], g = f.type, f.style && (b.push(Y(f)), c && c.push(f)), 1 !== g && 9 !== g && 11 !== g || !f.childNodes.length || Fa(f, b, c)
            };
            return g.cascadeTo = function(a, c, d) {
                var e, f, g, h = b.to(a, c, d),
                    i = [h],
                    j = [],
                    k = [],
                    l = [],
                    m = b._internals.reservedProps;
                for (a = h._targets || h.target, Fa(a, j, l), h.render(c, !0), Fa(a, k), h.render(0, !0), h._enabled(!0), e = l.length; --e > -1;)
                    if (f = Z(l[e], j[e], k[e]), f.firstMPT) {
                        f = f.difs;
                        for (g in d) m[g] && (f[g] = d[g]);
                        i.push(b.to(l[e], c, f))
                    }
                return i
            }, a.activate([g]), g
        }, !0)
    }), window._gsDefine && window._gsQueue.pop()(),
    function(a, b) {
        a.waitForImages = {
            hasImageProperties: ["backgroundImage", "listStyleImage", "borderImage", "borderCornerImage"]
        }, a.expr[":"].uncached = function(b) {
            var c = document.createElement("img");
            return c.src = b.src, a(b).is('img[src!=""]') && !c.complete
        }, a.fn.waitForImages = function(b, c, d) {
            if (a.isPlainObject(arguments[0]) && (c = b.each, d = b.waitForAll, b = b.finished), b = b || a.noop, c = c || a.noop, d = !!d, !a.isFunction(b) || !a.isFunction(c)) throw new TypeError("An invalid callback was supplied.");
            return this.each(function() {
                var e = a(this),
                    f = [];
                if (d) {
                    var g = a.waitForImages.hasImageProperties || [],
                        h = /url\((['"]?)(.*?)\1\)/g;
                    e.find("*").each(function() {
                        var b = a(this);
                        b.is("img:uncached") && f.push({
                            src: b.attr("src"),
                            element: b[0]
                        }), a.each(g, function(a, c) {
                            var d = b.css(c);
                            if (!d) return !0;
                            for (var e; e = h.exec(d);) f.push({
                                src: e[2],
                                element: b[0]
                            })
                        })
                    })
                } else e.find("img:uncached").each(function() {
                    f.push({
                        src: this.src,
                        element: this
                    })
                });
                var i = f.length,
                    j = 0;
                0 == i && b.call(e[0]), a.each(f, function(d, f) {
                    var g = new Image;
                    a(g).bind("load error", function(a) {
                        return j++, c.call(f.element, j, i, "load" == a.type), j == i ? (b.call(e[0]), !1) : void 0
                    }), g.src = f.src
                })
            })
        }
    }(jQuery);
var appMaster = {
   
    scrollMenu: function() {
        var a = 50;
        $(window).scrollTop() > a && $("#indexNav").addClass("scrolled");
        var b = ($("#veronaLogo"), $("#indexNav"));
        $(window).width();
        $(window).bind("scroll", function() {
            $(window).scrollTop() > a ? b.addClass("scrolled") : b.removeClass("scrolled")
        }), $("ul.navbar-nav li a").bind("click", function() {
            $(this).closest(".navbar-collapse").hasClass("in") && $(this).closest(".navbar-collapse").removeClass("in")
        })
    }
};