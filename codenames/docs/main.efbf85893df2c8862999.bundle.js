webpackJsonp(
  [1],
  {
    0: function (e, t, n) {
      e.exports = n("cDNt");
    },
    1: function (e, t) {},
    "1j/l": function (e, t, n) {
      "use strict";
      n.d(t, "a", function () {
        return r;
      });
      var r =
        Array.isArray ||
        function (e) {
          return e && "number" == typeof e.length;
        };
    },
    "2kLc": function (e, t, n) {
      "use strict";
      var r = n("AP4T"),
        o = n("6Xbx"),
        i = (function (e) {
          function t(t, n) {
            e.call(this),
              (this.value = t),
              (this.scheduler = n),
              (this._isScalar = !0),
              n && (this._isScalar = !1);
          }
          return (
            Object(o.b)(t, e),
            (t.create = function (e, n) {
              return new t(e, n);
            }),
            (t.dispatch = function (e) {
              var t = e.value,
                n = e.subscriber;
              e.done
                ? n.complete()
                : (n.next(t), n.closed || ((e.done = !0), this.schedule(e)));
            }),
            (t.prototype._subscribe = function (e) {
              var n = this.value,
                r = this.scheduler;
              if (r)
                return r.schedule(t.dispatch, 0, {
                  done: !1,
                  value: n,
                  subscriber: e,
                });
              e.next(n), e.closed || e.complete();
            }),
            t
          );
        })(r.a),
        a = n("Ecq+");
      function s(e) {
        return e && "function" == typeof e.schedule;
      }
      var l = (function (e) {
          function t(t, n) {
            e.call(this),
              (this.array = t),
              (this.scheduler = n),
              n ||
                1 !== t.length ||
                ((this._isScalar = !0), (this.value = t[0]));
          }
          return (
            Object(o.b)(t, e),
            (t.create = function (e, n) {
              return new t(e, n);
            }),
            (t.of = function () {
              for (var e = [], n = 0; n < arguments.length; n++)
                e[n - 0] = arguments[n];
              var r = e[e.length - 1];
              s(r) ? e.pop() : (r = null);
              var o = e.length;
              return o > 1
                ? new t(e, r)
                : 1 === o
                ? new i(e[0], r)
                : new a.a(r);
            }),
            (t.dispatch = function (e) {
              var t = e.array,
                n = e.index,
                r = e.subscriber;
              n >= e.count
                ? r.complete()
                : (r.next(t[n]),
                  r.closed || ((e.index = n + 1), this.schedule(e)));
            }),
            (t.prototype._subscribe = function (e) {
              var n = this.array,
                r = n.length,
                o = this.scheduler;
              if (o)
                return o.schedule(t.dispatch, 0, {
                  array: n,
                  index: 0,
                  count: r,
                  subscriber: e,
                });
              for (var i = 0; i < r && !e.closed; i++) e.next(n[i]);
              e.complete();
            }),
            t
          );
        })(r.a),
        u = n("qgI0"),
        c = n("lI6h"),
        p = (function () {
          function e(e, t, n) {
            void 0 === n && (n = Number.POSITIVE_INFINITY),
              (this.project = e),
              (this.resultSelector = t),
              (this.concurrent = n);
          }
          return (
            (e.prototype.call = function (e, t) {
              return t.subscribe(
                new h(e, this.project, this.resultSelector, this.concurrent)
              );
            }),
            e
          );
        })(),
        h = (function (e) {
          function t(t, n, r, o) {
            void 0 === o && (o = Number.POSITIVE_INFINITY),
              e.call(this, t),
              (this.project = n),
              (this.resultSelector = r),
              (this.concurrent = o),
              (this.hasCompleted = !1),
              (this.buffer = []),
              (this.active = 0),
              (this.index = 0);
          }
          return (
            Object(o.b)(t, e),
            (t.prototype._next = function (e) {
              this.active < this.concurrent
                ? this._tryNext(e)
                : this.buffer.push(e);
            }),
            (t.prototype._tryNext = function (e) {
              var t,
                n = this.index++;
              try {
                t = this.project(e, n);
              } catch (e) {
                return void this.destination.error(e);
              }
              this.active++, this._innerSub(t, e, n);
            }),
            (t.prototype._innerSub = function (e, t, n) {
              this.add(Object(u.a)(this, e, t, n));
            }),
            (t.prototype._complete = function () {
              (this.hasCompleted = !0),
                0 === this.active &&
                  0 === this.buffer.length &&
                  this.destination.complete();
            }),
            (t.prototype.notifyNext = function (e, t, n, r, o) {
              this.resultSelector
                ? this._notifyResultSelector(e, t, n, r)
                : this.destination.next(t);
            }),
            (t.prototype._notifyResultSelector = function (e, t, n, r) {
              var o;
              try {
                o = this.resultSelector(e, t, n, r);
              } catch (e) {
                return void this.destination.error(e);
              }
              this.destination.next(o);
            }),
            (t.prototype.notifyComplete = function (e) {
              var t = this.buffer;
              this.remove(e),
                this.active--,
                t.length > 0
                  ? this._next(t.shift())
                  : 0 === this.active &&
                    this.hasCompleted &&
                    this.destination.complete();
            }),
            t
          );
        })(c.a);
      function f(e) {
        return e;
      }
      t.a = function () {
        for (var e = [], t = 0; t < arguments.length; t++)
          e[t - 0] = arguments[t];
        var n = Number.POSITIVE_INFINITY,
          o = null,
          i = e[e.length - 1];
        return (
          s(i)
            ? ((o = e.pop()),
              e.length > 1 &&
                "number" == typeof e[e.length - 1] &&
                (n = e.pop()))
            : "number" == typeof i && (n = e.pop()),
          null === o && 1 === e.length && e[0] instanceof r.a
            ? e[0]
            : (function (e) {
                return (
                  void 0 === e && (e = Number.POSITIVE_INFINITY),
                  (function (e, t, n) {
                    return (
                      void 0 === n && (n = Number.POSITIVE_INFINITY),
                      function (r) {
                        return (
                          "number" == typeof t && ((n = t), (t = null)),
                          r.lift(new p(e, t, n))
                        );
                      }
                    );
                  })(f, null, e)
                );
              })(n)(new l(e, o))
        );
      };
    },
    "6Xbx": function (e, t, n) {
      "use strict";
      (t.b = function (e, t) {
        function n() {
          this.constructor = e;
        }
        r(e, t),
          (e.prototype =
            null === t
              ? Object.create(t)
              : ((n.prototype = t.prototype), new n()));
      }),
        n.d(t, "a", function () {
          return o;
        });
      var r =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (e, t) {
              e.__proto__ = t;
            }) ||
          function (e, t) {
            for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
          },
        o =
          Object.assign ||
          function (e) {
            for (var t, n = 1, r = arguments.length; n < r; n++)
              for (var o in (t = arguments[n]))
                Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
            return e;
          };
    },
    AP4T: function (e, t, n) {
      "use strict";
      var r = n("xIGM"),
        o = n("E9/g"),
        i = n("V7AE"),
        a = n("grVA"),
        s = n("mz3w");
      n.d(t, "a", function () {
        return l;
      });
      var l = (function () {
        function e(e) {
          (this._isScalar = !1), e && (this._subscribe = e);
        }
        return (
          (e.prototype.lift = function (t) {
            var n = new e();
            return (n.source = this), (n.operator = t), n;
          }),
          (e.prototype.subscribe = function (e, t, n) {
            var r = this.operator,
              s = (function (e, t, n) {
                if (e) {
                  if (e instanceof o.a) return e;
                  if (e[i.a]) return e[i.a]();
                }
                return e || t || n ? new o.a(e, t, n) : new o.a(a.a);
              })(e, t, n);
            if (
              (r
                ? r.call(s, this.source)
                : s.add(
                    this.source || !s.syncErrorThrowable
                      ? this._subscribe(s)
                      : this._trySubscribe(s)
                  ),
              s.syncErrorThrowable &&
                ((s.syncErrorThrowable = !1), s.syncErrorThrown))
            )
              throw s.syncErrorValue;
            return s;
          }),
          (e.prototype._trySubscribe = function (e) {
            try {
              return this._subscribe(e);
            } catch (t) {
              (e.syncErrorThrown = !0), (e.syncErrorValue = t), e.error(t);
            }
          }),
          (e.prototype.forEach = function (e, t) {
            var n = this;
            if (
              (t ||
                (r.a.Rx && r.a.Rx.config && r.a.Rx.config.Promise
                  ? (t = r.a.Rx.config.Promise)
                  : r.a.Promise && (t = r.a.Promise)),
              !t)
            )
              throw new Error("no Promise impl found");
            return new t(function (t, r) {
              var o;
              o = n.subscribe(
                function (t) {
                  if (o)
                    try {
                      e(t);
                    } catch (e) {
                      r(e), o.unsubscribe();
                    }
                  else e(t);
                },
                r,
                t
              );
            });
          }),
          (e.prototype._subscribe = function (e) {
            return this.source.subscribe(e);
          }),
          (e.prototype[s.a] = function () {
            return this;
          }),
          (e.prototype.pipe = function () {
            for (var e = [], t = 0; t < arguments.length; t++)
              e[t - 0] = arguments[t];
            return 0 === e.length
              ? this
              : ((n = e)
                  ? 1 === n.length
                    ? n[0]
                    : function (e) {
                        return n.reduce(function (e, t) {
                          return t(e);
                        }, e);
                      }
                  : function () {})(this);
            var n;
          }),
          (e.prototype.toPromise = function (e) {
            var t = this;
            if (
              (e ||
                (r.a.Rx && r.a.Rx.config && r.a.Rx.config.Promise
                  ? (e = r.a.Rx.config.Promise)
                  : r.a.Promise && (e = r.a.Promise)),
              !e)
            )
              throw new Error("no Promise impl found");
            return new e(function (e, n) {
              var r;
              t.subscribe(
                function (e) {
                  return (r = e);
                },
                function (e) {
                  return n(e);
                },
                function () {
                  return e(r);
                }
              );
            });
          }),
          (e.create = function (t) {
            return new e(t);
          }),
          e
        );
      })();
    },
    B1iP: function (e, t, n) {
      "use strict";
      t.a = function (e) {
        return "function" == typeof e;
      };
    },
    "E9/g": function (e, t, n) {
      "use strict";
      n.d(t, "a", function () {
        return l;
      });
      var r = n("6Xbx"),
        o = n("B1iP"),
        i = n("qLnt"),
        a = n("grVA"),
        s = n("V7AE"),
        l = (function (e) {
          function t(n, r, o) {
            switch (
              (e.call(this),
              (this.syncErrorValue = null),
              (this.syncErrorThrown = !1),
              (this.syncErrorThrowable = !1),
              (this.isStopped = !1),
              arguments.length)
            ) {
              case 0:
                this.destination = a.a;
                break;
              case 1:
                if (!n) {
                  this.destination = a.a;
                  break;
                }
                if ("object" == typeof n) {
                  n instanceof t
                    ? ((this.syncErrorThrowable = n.syncErrorThrowable),
                      (this.destination = n),
                      this.destination.add(this))
                    : ((this.syncErrorThrowable = !0),
                      (this.destination = new u(this, n)));
                  break;
                }
              default:
                (this.syncErrorThrowable = !0),
                  (this.destination = new u(this, n, r, o));
            }
          }
          return (
            Object(r.b)(t, e),
            (t.prototype[s.a] = function () {
              return this;
            }),
            (t.create = function (e, n, r) {
              var o = new t(e, n, r);
              return (o.syncErrorThrowable = !1), o;
            }),
            (t.prototype.next = function (e) {
              this.isStopped || this._next(e);
            }),
            (t.prototype.error = function (e) {
              this.isStopped || ((this.isStopped = !0), this._error(e));
            }),
            (t.prototype.complete = function () {
              this.isStopped || ((this.isStopped = !0), this._complete());
            }),
            (t.prototype.unsubscribe = function () {
              this.closed ||
                ((this.isStopped = !0), e.prototype.unsubscribe.call(this));
            }),
            (t.prototype._next = function (e) {
              this.destination.next(e);
            }),
            (t.prototype._error = function (e) {
              this.destination.error(e), this.unsubscribe();
            }),
            (t.prototype._complete = function () {
              this.destination.complete(), this.unsubscribe();
            }),
            (t.prototype._unsubscribeAndRecycle = function () {
              var e = this._parent,
                t = this._parents;
              return (
                (this._parent = null),
                (this._parents = null),
                this.unsubscribe(),
                (this.closed = !1),
                (this.isStopped = !1),
                (this._parent = e),
                (this._parents = t),
                this
              );
            }),
            t
          );
        })(i.a),
        u = (function (e) {
          function t(t, n, r, i) {
            var s;
            e.call(this), (this._parentSubscriber = t);
            var l = this;
            Object(o.a)(n)
              ? (s = n)
              : n &&
                ((s = n.next),
                (r = n.error),
                (i = n.complete),
                n !== a.a &&
                  ((l = Object.create(n)),
                  Object(o.a)(l.unsubscribe) && this.add(l.unsubscribe.bind(l)),
                  (l.unsubscribe = this.unsubscribe.bind(this)))),
              (this._context = l),
              (this._next = s),
              (this._error = r),
              (this._complete = i);
          }
          return (
            Object(r.b)(t, e),
            (t.prototype.next = function (e) {
              if (!this.isStopped && this._next) {
                var t = this._parentSubscriber;
                t.syncErrorThrowable
                  ? this.__tryOrSetError(t, this._next, e) && this.unsubscribe()
                  : this.__tryOrUnsub(this._next, e);
              }
            }),
            (t.prototype.error = function (e) {
              if (!this.isStopped) {
                var t = this._parentSubscriber;
                if (this._error)
                  t.syncErrorThrowable
                    ? (this.__tryOrSetError(t, this._error, e),
                      this.unsubscribe())
                    : (this.__tryOrUnsub(this._error, e), this.unsubscribe());
                else {
                  if (!t.syncErrorThrowable) throw (this.unsubscribe(), e);
                  (t.syncErrorValue = e),
                    (t.syncErrorThrown = !0),
                    this.unsubscribe();
                }
              }
            }),
            (t.prototype.complete = function () {
              var e = this;
              if (!this.isStopped) {
                var t = this._parentSubscriber;
                if (this._complete) {
                  var n = function () {
                    return e._complete.call(e._context);
                  };
                  t.syncErrorThrowable
                    ? (this.__tryOrSetError(t, n), this.unsubscribe())
                    : (this.__tryOrUnsub(n), this.unsubscribe());
                } else this.unsubscribe();
              }
            }),
            (t.prototype.__tryOrUnsub = function (e, t) {
              try {
                e.call(this._context, t);
              } catch (e) {
                throw (this.unsubscribe(), e);
              }
            }),
            (t.prototype.__tryOrSetError = function (e, t, n) {
              try {
                t.call(this._context, n);
              } catch (t) {
                return (e.syncErrorValue = t), (e.syncErrorThrown = !0), !0;
              }
              return !1;
            }),
            (t.prototype._unsubscribe = function () {
              var e = this._parentSubscriber;
              (this._context = null),
                (this._parentSubscriber = null),
                e.unsubscribe();
            }),
            t
          );
        })(l);
    },
    "Ecq+": function (e, t, n) {
      "use strict";
      n.d(t, "a", function () {
        return o;
      });
      var r = n("6Xbx"),
        o = (function (e) {
          function t(t) {
            e.call(this), (this.scheduler = t);
          }
          return (
            Object(r.b)(t, e),
            (t.create = function (e) {
              return new t(e);
            }),
            (t.dispatch = function (e) {
              e.subscriber.complete();
            }),
            (t.prototype._subscribe = function (e) {
              var n = this.scheduler;
              if (n) return n.schedule(t.dispatch, 0, { subscriber: e });
              e.complete();
            }),
            t
          );
        })(n("AP4T").a);
    },
    Jnzd: function (e, t, n) {
      (function (e) {
        var r;
        !(function (e, o, i) {
          function a(e, t) {
            return (
              (t.x = e.x),
              (t.y = e.y),
              (t.z = e.z),
              (t.w = e.w),
              (t.v = e.v),
              (t.d = e.d),
              t
            );
          }
          function s(e, t) {
            var n = new (function (e) {
                var t = this,
                  n = "";
                (t.next = function () {
                  var e = t.x ^ (t.x >>> 2);
                  return (
                    (t.x = t.y),
                    (t.y = t.z),
                    (t.z = t.w),
                    (t.w = t.v),
                    ((t.d = (t.d + 362437) | 0) +
                      (t.v = t.v ^ (t.v << 4) ^ e ^ (e << 1))) |
                      0
                  );
                }),
                  (t.x = 0),
                  (t.y = 0),
                  (t.z = 0),
                  (t.w = 0),
                  (t.v = 0),
                  e === (0 | e) ? (t.x = e) : (n += e);
                for (var r = 0; r < n.length + 64; r++)
                  (t.x ^= 0 | n.charCodeAt(r)),
                    r == n.length && (t.d = (t.x << 10) ^ (t.x >>> 4)),
                    t.next();
              })(e),
              r = t && t.state,
              o = function () {
                return (n.next() >>> 0) / 4294967296;
              };
            return (
              (o.double = function () {
                do {
                  var e =
                    ((n.next() >>> 11) + (n.next() >>> 0) / 4294967296) /
                    (1 << 21);
                } while (0 === e);
                return e;
              }),
              (o.int32 = n.next),
              (o.quick = o),
              r &&
                ("object" == typeof r && a(r, n),
                (o.state = function () {
                  return a(n, {});
                })),
              o
            );
          }
          o && o.exports
            ? (o.exports = s)
            : n("MwgA") && n("f8Ud")
            ? void 0 ===
                (r = function () {
                  return s;
                }.call(t, n, t, o)) || (o.exports = r)
            : (this.xorwow = s);
        })(0, "object" == typeof e && e, n("MwgA"));
      }).call(t, n("ZwkM")(e));
    },
    LMZF: function (e, t, n) {
      "use strict";
      (function (e) {
        n.d(t, "e", function () {
          return Ke;
        }),
          n.d(t, "I", function () {
            return He;
          }),
          n.d(t, "L", function () {
            return Ue;
          }),
          n.d(t, "H", function () {
            return Ge;
          }),
          n.d(t, "r", function () {
            return We;
          }),
          n.d(t, "a", function () {
            return ne;
          }),
          n.d(t, "v", function () {
            return ie;
          }),
          n.d(t, "u", function () {
            return ae;
          }),
          n.d(t, "b", function () {
            return ee;
          }),
          n.d(t, "c", function () {
            return te;
          }),
          n.d(t, "K", function () {
            return ut;
          }),
          n.d(t, "C", function () {
            return Ne;
          }),
          n.d(t, "N", function () {
            return De;
          }),
          n.d(t, "p", function () {
            return Ot;
          }),
          n.d(t, "d", function () {
            return Dt;
          }),
          n.d(t, "j", function () {
            return Ee;
          }),
          n.d(t, "i", function () {
            return J;
          }),
          n.d(t, "z", function () {
            return Vt;
          }),
          n.d(t, "A", function () {
            return Bt;
          }),
          n.d(t, "F", function () {
            return p;
          }),
          n.d(t, "D", function () {
            return h;
          }),
          n.d(t, "J", function () {
            return E;
          }),
          n.d(t, "m", function () {
            return P;
          }),
          n.d(t, "l", function () {
            return l;
          }),
          n.d(t, "k", function () {
            return d;
          }),
          n.d(t, "t", function () {
            return y;
          }),
          n.d(t, "s", function () {
            return je;
          }),
          n.d(t, "w", function () {
            return Xe;
          }),
          n.d(t, "x", function () {
            return Je;
          }),
          n.d(t, "y", function () {
            return Ye;
          }),
          n.d(t, "f", function () {
            return ce;
          }),
          n.d(t, "g", function () {
            return be;
          }),
          n.d(t, "h", function () {
            return et;
          }),
          n.d(t, "q", function () {
            return we;
          }),
          n.d(t, "B", function () {
            return nt;
          }),
          n.d(t, "E", function () {
            return rt;
          }),
          n.d(t, "n", function () {
            return Et;
          }),
          n.d(t, "o", function () {
            return jt;
          }),
          n.d(t, "G", function () {
            return ht;
          }),
          n.d(t, "M", function () {
            return Pt;
          }),
          n.d(t, "Z", function () {
            return dt;
          }),
          n.d(t, "P", function () {
            return le;
          }),
          n.d(t, "O", function () {
            return ge;
          }),
          n.d(t, "W", function () {
            return m;
          }),
          n.d(t, "_2", function () {
            return k;
          }),
          n.d(t, "_11", function () {
            return S;
          }),
          n.d(t, "_0", function () {
            return X;
          }),
          n.d(t, "_1", function () {
            return Y;
          }),
          n.d(t, "Q", function () {
            return In;
          }),
          n.d(t, "R", function () {
            return Kn;
          }),
          n.d(t, "S", function () {
            return $o;
          }),
          n.d(t, "T", function () {
            return tn;
          }),
          n.d(t, "U", function () {
            return br;
          }),
          n.d(t, "V", function () {
            return Pn;
          }),
          n.d(t, "Y", function () {
            return Tn;
          }),
          n.d(t, "_4", function () {
            return Fn;
          }),
          n.d(t, "_5", function () {
            return zn;
          }),
          n.d(t, "_7", function () {
            return ar;
          }),
          n.d(t, "_10", function () {
            return gr;
          }),
          n.d(t, "_9", function () {
            return zr;
          }),
          n.d(t, "_12", function () {
            return Fr;
          }),
          n.d(t, "_13", function () {
            return Ur;
          }),
          n.d(t, "_3", function () {
            return Mt;
          }),
          n.d(t, "_6", function () {
            return Nt;
          }),
          n.d(t, "_8", function () {
            return Rt;
          }),
          n.d(t, "X", function () {
            return re;
          });
        var r = n("6Xbx"),
          o = n("AP4T"),
          i = n("2kLc"),
          a = n("URbD"),
          s = n("TO51"),
          l = (function () {
            function e(e) {
              (this._desc = e), (this.ngMetadataName = "InjectionToken");
            }
            return (
              (e.prototype.toString = function () {
                return "InjectionToken " + this._desc;
              }),
              e
            );
          })(),
          u = "__paramaters__";
        function c(e, t, n) {
          var r = (function (e) {
            return function () {
              for (var t = [], n = 0; n < arguments.length; n++)
                t[n] = arguments[n];
              if (e) {
                var r = e.apply(void 0, t);
                for (var o in r) this[o] = r[o];
              }
            };
          })(t);
          function o() {
            for (var e = [], t = 0; t < arguments.length; t++)
              e[t] = arguments[t];
            if (this instanceof o) return r.apply(this, e), this;
            var n,
              i = new ((n = o).bind.apply(n, [void 0].concat(e)))();
            return (a.annotation = i), a;
            function a(e, t, n) {
              for (
                var r = e.hasOwnProperty(u)
                  ? e[u]
                  : Object.defineProperty(e, u, { value: [] })[u];
                r.length <= n;

              )
                r.push(null);
              return (r[n] = r[n] || []).push(i), e;
            }
          }
          return (
            n && (o.prototype = Object.create(n.prototype)),
            (o.prototype.ngMetadataName = e),
            (o.annotationCls = o),
            o
          );
        }
        var p = (function () {
            var e = { Emulated: 0, Native: 1, None: 2 };
            return (
              (e[e.Emulated] = "Emulated"),
              (e[e.Native] = "Native"),
              (e[e.None] = "None"),
              e
            );
          })(),
          h = function (e) {
            (this.full = e),
              (this.major = e.split(".")[0]),
              (this.minor = e.split(".")[1]),
              (this.patch = e.split(".").slice(2).join("."));
          },
          f = new h("5.2.1"),
          d = c("Inject", function (e) {
            return { token: e };
          }),
          y = c("Optional"),
          _ = c("Self"),
          v = c("SkipSelf"),
          b = "undefined" != typeof window && window,
          g =
            "undefined" != typeof self &&
            "undefined" != typeof WorkerGlobalScope &&
            self instanceof WorkerGlobalScope &&
            self,
          m = b || ("undefined" != typeof e && e) || g,
          w = null;
        function C() {
          if (!w) {
            var e = m.Symbol;
            if (e && e.iterator) w = e.iterator;
            else
              for (
                var t = Object.getOwnPropertyNames(Map.prototype), n = 0;
                n < t.length;
                ++n
              ) {
                var r = t[n];
                "entries" !== r &&
                  "size" !== r &&
                  Map.prototype[r] === Map.prototype.entries &&
                  (w = r);
              }
          }
          return w;
        }
        function x(e) {
          Zone.current.scheduleMicroTask("scheduleMicrotask", e);
        }
        function k(e, t) {
          return (
            e === t ||
            ("number" == typeof e &&
              "number" == typeof t &&
              isNaN(e) &&
              isNaN(t))
          );
        }
        function S(e) {
          if ("string" == typeof e) return e;
          if (e instanceof Array) return "[" + e.map(S).join(", ") + "]";
          if (null == e) return "" + e;
          if (e.overriddenName) return "" + e.overriddenName;
          if (e.name) return "" + e.name;
          var t = e.toString();
          if (null == t) return "" + t;
          var n = t.indexOf("\n");
          return -1 === n ? t : t.substring(0, n);
        }
        function E(e) {
          return (
            (e.__forward_ref__ = E),
            (e.toString = function () {
              return S(this());
            }),
            e
          );
        }
        function j(e) {
          return "function" == typeof e &&
            e.hasOwnProperty("__forward_ref__") &&
            e.__forward_ref__ === E
            ? e()
            : e;
        }
        var T = "__source",
          A = new Object(),
          I = (function () {
            function e() {}
            return (
              (e.prototype.get = function (e, t) {
                if ((void 0 === t && (t = A), t === A))
                  throw new Error(
                    "NullInjectorError: No provider for " + S(e) + "!"
                  );
                return t;
              }),
              e
            );
          })(),
          P = (function () {
            function e() {}
            return (
              (e.create = function (e, t) {
                return Array.isArray(e)
                  ? new L(e, t)
                  : new L(e.providers, e.parent, e.name || null);
              }),
              (e.THROW_IF_NOT_FOUND = A),
              (e.NULL = new I()),
              e
            );
          })(),
          O = function (e) {
            return e;
          },
          M = [],
          N = O,
          R = function () {
            return Array.prototype.slice.call(arguments);
          },
          D = {},
          B = (function (e) {
            for (var t in e) if (e[t] === D) return t;
            throw Error("!prop");
          })({ provide: String, useValue: D }),
          V = P.NULL,
          z = /\n/gm,
          F = "\u0275",
          L = (function () {
            function e(e, t, n) {
              void 0 === t && (t = V),
                void 0 === n && (n = null),
                (this.parent = t),
                (this.source = n);
              var r = (this._records = new Map());
              r.set(P, { token: P, fn: O, deps: M, value: this, useNew: !1 }),
                (function e(t, n) {
                  if (n)
                    if ((n = j(n)) instanceof Array)
                      for (var r = 0; r < n.length; r++) e(t, n[r]);
                    else {
                      if ("function" == typeof n)
                        throw W("Function/Class not supported", n);
                      if (!n || "object" != typeof n || !n.provide)
                        throw W("Unexpected provider", n);
                      var o = j(n.provide),
                        i = (function (e) {
                          var t = (function (e) {
                              var t = M,
                                n = e.deps;
                              if (n && n.length) {
                                t = [];
                                for (var r = 0; r < n.length; r++) {
                                  var o = 6;
                                  if ((l = j(n[r])) instanceof Array)
                                    for (var i = 0, a = l; i < a.length; i++) {
                                      var s = a[i];
                                      s instanceof y || s == y
                                        ? (o |= 1)
                                        : s instanceof v || s == v
                                        ? (o &= -3)
                                        : s instanceof _ || s == _
                                        ? (o &= -5)
                                        : (l = s instanceof d ? s.token : j(s));
                                    }
                                  t.push({ token: l, options: o });
                                }
                              } else if (e.useExisting) {
                                var l;
                                t = [
                                  { token: (l = j(e.useExisting)), options: 6 },
                                ];
                              } else if (!(n || B in e))
                                throw W("'deps' required", e);
                              return t;
                            })(e),
                            n = O,
                            r = M,
                            o = !1,
                            i = j(e.provide);
                          if (B in e) r = e.useValue;
                          else if (e.useFactory) n = e.useFactory;
                          else if (e.useExisting);
                          else if (e.useClass) (o = !0), (n = j(e.useClass));
                          else {
                            if ("function" != typeof i)
                              throw W(
                                "StaticProvider does not have [useValue|useFactory|useExisting|useClass] or [provide] is not newable",
                                e
                              );
                            (o = !0), (n = i);
                          }
                          return { deps: t, fn: n, useNew: o, value: r };
                        })(n);
                      if (!0 === n.multi) {
                        var a = t.get(o);
                        if (a) {
                          if (a.fn !== R) throw H(o);
                        } else
                          t.set(
                            o,
                            (a = {
                              token: n.provide,
                              deps: [],
                              useNew: !1,
                              fn: R,
                              value: M,
                            })
                          );
                        a.deps.push({ token: (o = n), options: 6 });
                      }
                      var s = t.get(o);
                      if (s && s.fn == R) throw H(o);
                      t.set(o, i);
                    }
                })(r, e);
            }
            return (
              (e.prototype.get = function (e, t) {
                var n = this._records.get(e);
                try {
                  return (function e(t, n, r, o, i) {
                    try {
                      return (function (t, n, r, o, i) {
                        var a, s;
                        if (n) {
                          if ((a = n.value) == N)
                            throw Error(F + "Circular dependency");
                          if (a === M) {
                            n.value = N;
                            var l = n.useNew,
                              u = n.fn,
                              c = n.deps,
                              p = M;
                            if (c.length) {
                              p = [];
                              for (var h = 0; h < c.length; h++) {
                                var f = c[h],
                                  d = f.options,
                                  y = 2 & d ? r.get(f.token) : void 0;
                                p.push(
                                  e(
                                    f.token,
                                    y,
                                    r,
                                    y || 4 & d ? o : V,
                                    1 & d ? null : P.THROW_IF_NOT_FOUND
                                  )
                                );
                              }
                            }
                            n.value = a = l
                              ? new ((s = u).bind.apply(
                                  s,
                                  [void 0].concat(p)
                                ))()
                              : u.apply(void 0, p);
                          }
                        } else a = o.get(t, i);
                        return a;
                      })(t, n, r, o, i);
                    } catch (e) {
                      throw (
                        (e instanceof Error || (e = new Error(e)),
                        (e.ngTempTokenPath = e.ngTempTokenPath || []).unshift(
                          t
                        ),
                        n && n.value == N && (n.value = M),
                        e)
                      );
                    }
                  })(e, n, this._records, this.parent, t);
                } catch (t) {
                  var r = t.ngTempTokenPath;
                  throw (
                    (e[T] && r.unshift(e[T]),
                    (t.message = U("\n" + t.message, r, this.source)),
                    (t.ngTokenPath = r),
                    (t.ngTempTokenPath = null),
                    t)
                  );
                }
              }),
              (e.prototype.toString = function () {
                var e = [];
                return (
                  this._records.forEach(function (t, n) {
                    return e.push(S(n));
                  }),
                  "StaticInjector[" + e.join(", ") + "]"
                );
              }),
              e
            );
          })();
        function H(e) {
          return W("Cannot mix multi providers and regular providers", e);
        }
        function U(e, t, n) {
          void 0 === n && (n = null),
            (e =
              e && "\n" === e.charAt(0) && e.charAt(1) == F ? e.substr(2) : e);
          var r = S(t);
          if (t instanceof Array) r = t.map(S).join(" -> ");
          else if ("object" == typeof t) {
            var o = [];
            for (var i in t)
              if (t.hasOwnProperty(i)) {
                var a = t[i];
                o.push(
                  i + ":" + ("string" == typeof a ? JSON.stringify(a) : S(a))
                );
              }
            r = "{" + o.join(", ") + "}";
          }
          return (
            "StaticInjectorError" +
            (n ? "(" + n + ")" : "") +
            "[" +
            r +
            "]: " +
            e.replace(z, "\n  ")
          );
        }
        function W(e, t) {
          return new Error(U(e, t));
        }
        var G = "ngDebugContext",
          q = "ngOriginalError",
          Z = "ngErrorLogger";
        function Q(e) {
          return e[G];
        }
        function K(e) {
          return e[q];
        }
        function $(e) {
          for (var t = [], n = 1; n < arguments.length; n++)
            t[n - 1] = arguments[n];
          e.error.apply(e, t);
        }
        var J = (function () {
          function e() {
            this._console = console;
          }
          return (
            (e.prototype.handleError = function (e) {
              var t = this._findOriginalError(e),
                n = this._findContext(e),
                r = (function (e) {
                  return e[Z] || $;
                })(e);
              r(this._console, "ERROR", e),
                t && r(this._console, "ORIGINAL ERROR", t),
                n && r(this._console, "ERROR CONTEXT", n);
            }),
            (e.prototype._findContext = function (e) {
              return e ? (Q(e) ? Q(e) : this._findContext(K(e))) : null;
            }),
            (e.prototype._findOriginalError = function (e) {
              for (var t = K(e); t && K(t); ) t = K(t);
              return t;
            }),
            e
          );
        })();
        function Y(e) {
          return !!e && "function" == typeof e.then;
        }
        function X(e) {
          return !!e && "function" == typeof e.subscribe;
        }
        Function;
        var ee = new l("Application Initializer"),
          te = (function () {
            function e(e) {
              var t = this;
              (this.appInits = e),
                (this.initialized = !1),
                (this.done = !1),
                (this.donePromise = new Promise(function (e, n) {
                  (t.resolve = e), (t.reject = n);
                }));
            }
            return (
              (e.prototype.runInitializers = function () {
                var e = this;
                if (!this.initialized) {
                  var t = [],
                    n = function () {
                      (e.done = !0), e.resolve();
                    };
                  if (this.appInits)
                    for (var r = 0; r < this.appInits.length; r++) {
                      var o = this.appInits[r]();
                      Y(o) && t.push(o);
                    }
                  Promise.all(t)
                    .then(function () {
                      n();
                    })
                    .catch(function (t) {
                      e.reject(t);
                    }),
                    0 === t.length && n(),
                    (this.initialized = !0);
                }
              }),
              e
            );
          })(),
          ne = new l("AppId");
        function re() {
          return "" + oe() + oe() + oe();
        }
        function oe() {
          return String.fromCharCode(97 + Math.floor(25 * Math.random()));
        }
        var ie = new l("Platform Initializer"),
          ae = new l("Platform ID"),
          se = new l("appBootstrapListener"),
          le = (function () {
            function e() {}
            return (
              (e.prototype.log = function (e) {
                console.log(e);
              }),
              (e.prototype.warn = function (e) {
                console.warn(e);
              }),
              (e.ctorParameters = function () {
                return [];
              }),
              e
            );
          })();
        function ue() {
          throw new Error("Runtime compiler is not loaded");
        }
        var ce = (function () {
            function e() {}
            return (
              (e.prototype.compileModuleSync = function (e) {
                throw ue();
              }),
              (e.prototype.compileModuleAsync = function (e) {
                throw ue();
              }),
              (e.prototype.compileModuleAndAllComponentsSync = function (e) {
                throw ue();
              }),
              (e.prototype.compileModuleAndAllComponentsAsync = function (e) {
                throw ue();
              }),
              (e.prototype.clearCache = function () {}),
              (e.prototype.clearCacheFor = function (e) {}),
              e
            );
          })(),
          pe = function () {},
          he = function () {};
        function fe(e) {
          var t = Error(
            "No component factory found for " +
              S(e) +
              ". Did you add it to @NgModule.entryComponents?"
          );
          return (t[_e] = e), t;
        }
        var de,
          ye,
          _e = "ngComponent",
          ve = (function () {
            function e() {}
            return (
              (e.prototype.resolveComponentFactory = function (e) {
                throw fe(e);
              }),
              e
            );
          })(),
          be = (function () {
            function e() {}
            return (e.NULL = new ve()), e;
          })(),
          ge = (function () {
            function e(e, t, n) {
              (this._parent = t),
                (this._ngModule = n),
                (this._factories = new Map());
              for (var r = 0; r < e.length; r++) {
                var o = e[r];
                this._factories.set(o.componentType, o);
              }
            }
            return (
              (e.prototype.resolveComponentFactory = function (e) {
                var t = this._factories.get(e);
                if (
                  (!t &&
                    this._parent &&
                    (t = this._parent.resolveComponentFactory(e)),
                  !t)
                )
                  throw fe(e);
                return new me(t, this._ngModule);
              }),
              e
            );
          })(),
          me = (function (e) {
            function t(t, n) {
              var r = e.call(this) || this;
              return (
                (r.factory = t),
                (r.ngModule = n),
                (r.selector = t.selector),
                (r.componentType = t.componentType),
                (r.ngContentSelectors = t.ngContentSelectors),
                (r.inputs = t.inputs),
                (r.outputs = t.outputs),
                r
              );
            }
            return (
              Object(r.b)(t, e),
              (t.prototype.create = function (e, t, n, r) {
                return this.factory.create(e, t, n, r || this.ngModule);
              }),
              t
            );
          })(he),
          we = function () {},
          Ce = (function () {
            var e = m.wtf;
            return !(!e || !(de = e.trace) || ((ye = de.events), 0));
          })();
        function xe(e, t) {
          return null;
        }
        var ke = Ce
            ? function (e, t) {
                return void 0 === t && (t = null), ye.createScope(e, t);
              }
            : function (e, t) {
                return xe;
              },
          Se = Ce
            ? function (e, t) {
                return de.leaveScope(e, t), t;
              }
            : function (e, t) {
                return t;
              },
          Ee = (function (e) {
            function t(t) {
              void 0 === t && (t = !1);
              var n = e.call(this) || this;
              return (n.__isAsync = t), n;
            }
            return (
              Object(r.b)(t, e),
              (t.prototype.emit = function (t) {
                e.prototype.next.call(this, t);
              }),
              (t.prototype.subscribe = function (t, n, r) {
                var o,
                  i = function (e) {
                    return null;
                  },
                  a = function () {
                    return null;
                  };
                return (
                  t && "object" == typeof t
                    ? ((o = this.__isAsync
                        ? function (e) {
                            setTimeout(function () {
                              return t.next(e);
                            });
                          }
                        : function (e) {
                            t.next(e);
                          }),
                      t.error &&
                        (i = this.__isAsync
                          ? function (e) {
                              setTimeout(function () {
                                return t.error(e);
                              });
                            }
                          : function (e) {
                              t.error(e);
                            }),
                      t.complete &&
                        (a = this.__isAsync
                          ? function () {
                              setTimeout(function () {
                                return t.complete();
                              });
                            }
                          : function () {
                              t.complete();
                            }))
                    : ((o = this.__isAsync
                        ? function (e) {
                            setTimeout(function () {
                              return t(e);
                            });
                          }
                        : function (e) {
                            t(e);
                          }),
                      n &&
                        (i = this.__isAsync
                          ? function (e) {
                              setTimeout(function () {
                                return n(e);
                              });
                            }
                          : function (e) {
                              n(e);
                            }),
                      r &&
                        (a = this.__isAsync
                          ? function () {
                              setTimeout(function () {
                                return r();
                              });
                            }
                          : function () {
                              r();
                            })),
                  e.prototype.subscribe.call(this, o, i, a)
                );
              }),
              t
            );
          })(s.a),
          je = (function () {
            function e(e) {
              var t,
                n = e.enableLongStackTrace,
                r = void 0 !== n && n;
              if (
                ((this.hasPendingMicrotasks = !1),
                (this.hasPendingMacrotasks = !1),
                (this.isStable = !0),
                (this.onUnstable = new Ee(!1)),
                (this.onMicrotaskEmpty = new Ee(!1)),
                (this.onStable = new Ee(!1)),
                (this.onError = new Ee(!1)),
                "undefined" == typeof Zone)
              )
                throw new Error(
                  "In this configuration Angular requires Zone.js"
                );
              Zone.assertZonePatched(),
                (this._nesting = 0),
                (this._outer = this._inner = Zone.current),
                Zone.wtfZoneSpec &&
                  (this._inner = this._inner.fork(Zone.wtfZoneSpec)),
                r &&
                  Zone.longStackTraceZoneSpec &&
                  (this._inner = this._inner.fork(Zone.longStackTraceZoneSpec)),
                ((t = this)._inner = t._inner.fork({
                  name: "angular",
                  properties: { isAngularZone: !0 },
                  onInvokeTask: function (e, n, r, o, i, a) {
                    try {
                      return Pe(t), e.invokeTask(r, o, i, a);
                    } finally {
                      Oe(t);
                    }
                  },
                  onInvoke: function (e, n, r, o, i, a, s) {
                    try {
                      return Pe(t), e.invoke(r, o, i, a, s);
                    } finally {
                      Oe(t);
                    }
                  },
                  onHasTask: function (e, n, r, o) {
                    e.hasTask(r, o),
                      n === r &&
                        ("microTask" == o.change
                          ? ((t.hasPendingMicrotasks = o.microTask), Ie(t))
                          : "macroTask" == o.change &&
                            (t.hasPendingMacrotasks = o.macroTask));
                  },
                  onHandleError: function (e, n, r, o) {
                    return (
                      e.handleError(r, o),
                      t.runOutsideAngular(function () {
                        return t.onError.emit(o);
                      }),
                      !1
                    );
                  },
                }));
            }
            return (
              (e.isInAngularZone = function () {
                return !0 === Zone.current.get("isAngularZone");
              }),
              (e.assertInAngularZone = function () {
                if (!e.isInAngularZone())
                  throw new Error(
                    "Expected to be in Angular Zone, but it is not!"
                  );
              }),
              (e.assertNotInAngularZone = function () {
                if (e.isInAngularZone())
                  throw new Error(
                    "Expected to not be in Angular Zone, but it is!"
                  );
              }),
              (e.prototype.run = function (e, t, n) {
                return this._inner.run(e, t, n);
              }),
              (e.prototype.runTask = function (e, t, n, r) {
                var o = this._inner,
                  i = o.scheduleEventTask("NgZoneEvent: " + r, e, Ae, Te, Te);
                try {
                  return o.runTask(i, t, n);
                } finally {
                  o.cancelTask(i);
                }
              }),
              (e.prototype.runGuarded = function (e, t, n) {
                return this._inner.runGuarded(e, t, n);
              }),
              (e.prototype.runOutsideAngular = function (e) {
                return this._outer.run(e);
              }),
              e
            );
          })();
        function Te() {}
        var Ae = {};
        function Ie(e) {
          if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
            try {
              e._nesting++, e.onMicrotaskEmpty.emit(null);
            } finally {
              if ((e._nesting--, !e.hasPendingMicrotasks))
                try {
                  e.runOutsideAngular(function () {
                    return e.onStable.emit(null);
                  });
                } finally {
                  e.isStable = !0;
                }
            }
        }
        function Pe(e) {
          e._nesting++,
            e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
        }
        function Oe(e) {
          e._nesting--, Ie(e);
        }
        var Me = (function () {
            function e() {
              (this.hasPendingMicrotasks = !1),
                (this.hasPendingMacrotasks = !1),
                (this.isStable = !0),
                (this.onUnstable = new Ee()),
                (this.onMicrotaskEmpty = new Ee()),
                (this.onStable = new Ee()),
                (this.onError = new Ee());
            }
            return (
              (e.prototype.run = function (e) {
                return e();
              }),
              (e.prototype.runGuarded = function (e) {
                return e();
              }),
              (e.prototype.runOutsideAngular = function (e) {
                return e();
              }),
              (e.prototype.runTask = function (e) {
                return e();
              }),
              e
            );
          })(),
          Ne = (function () {
            function e(e) {
              (this._ngZone = e),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                this._watchAngularEvents();
            }
            return (
              (e.prototype._watchAngularEvents = function () {
                var e = this;
                this._ngZone.onUnstable.subscribe({
                  next: function () {
                    (e._didWork = !0), (e._isZoneStable = !1);
                  },
                }),
                  this._ngZone.runOutsideAngular(function () {
                    e._ngZone.onStable.subscribe({
                      next: function () {
                        je.assertNotInAngularZone(),
                          x(function () {
                            (e._isZoneStable = !0), e._runCallbacksIfReady();
                          });
                      },
                    });
                  });
              }),
              (e.prototype.increasePendingRequestCount = function () {
                return (
                  (this._pendingCount += 1),
                  (this._didWork = !0),
                  this._pendingCount
                );
              }),
              (e.prototype.decreasePendingRequestCount = function () {
                if (((this._pendingCount -= 1), this._pendingCount < 0))
                  throw new Error("pending async requests below zero");
                return this._runCallbacksIfReady(), this._pendingCount;
              }),
              (e.prototype.isStable = function () {
                return (
                  this._isZoneStable &&
                  0 == this._pendingCount &&
                  !this._ngZone.hasPendingMacrotasks
                );
              }),
              (e.prototype._runCallbacksIfReady = function () {
                var e = this;
                this.isStable()
                  ? 0 !== this._callbacks.length
                    ? this._ngZone.runOutsideAngular(function () {
                        setTimeout(function () {
                          if (e.isStable()) {
                            for (; 0 !== e._callbacks.length; )
                              e._callbacks.pop()(e._didWork);
                            e._didWork = !1;
                          }
                        });
                      })
                    : (this._didWork = !1)
                  : (this._didWork = !0);
              }),
              (e.prototype.whenStable = function (e) {
                this._callbacks.push(e), this._runCallbacksIfReady();
              }),
              (e.prototype.getPendingRequestCount = function () {
                return this._pendingCount;
              }),
              (e.prototype.findProviders = function (e, t, n) {
                return [];
              }),
              e
            );
          })(),
          Re = (function () {
            function e() {
              (this._applications = new Map()), Ve.addToWindow(this);
            }
            return (
              (e.prototype.registerApplication = function (e, t) {
                this._applications.set(e, t);
              }),
              (e.prototype.unregisterApplication = function (e) {
                this._applications.delete(e);
              }),
              (e.prototype.unregisterAllApplications = function () {
                this._applications.clear();
              }),
              (e.prototype.getTestability = function (e) {
                return this._applications.get(e) || null;
              }),
              (e.prototype.getAllTestabilities = function () {
                return Array.from(this._applications.values());
              }),
              (e.prototype.getAllRootElements = function () {
                return Array.from(this._applications.keys());
              }),
              (e.prototype.findTestabilityInTree = function (e, t) {
                return (
                  void 0 === t && (t = !0), Ve.findTestabilityInTree(this, e, t)
                );
              }),
              (e.ctorParameters = function () {
                return [];
              }),
              e
            );
          })();
        function De(e) {
          Ve = e;
        }
        var Be,
          Ve = new ((function () {
            function e() {}
            return (
              (e.prototype.addToWindow = function (e) {}),
              (e.prototype.findTestabilityInTree = function (e, t, n) {
                return null;
              }),
              e
            );
          })())(),
          ze = !0,
          Fe = !1,
          Le = new l("AllowMultipleToken");
        function He() {
          if (Fe)
            throw new Error("Cannot enable prod mode after platform setup.");
          ze = !1;
        }
        function Ue() {
          return (Fe = !0), ze;
        }
        var We = function (e, t) {
          (this.name = e), (this.token = t);
        };
        function Ge(e, t, n) {
          void 0 === n && (n = []);
          var r = "Platform: " + t,
            o = new l(r);
          return function (t) {
            void 0 === t && (t = []);
            var i = qe();
            if (!i || i.injector.get(Le, !1))
              if (e) e(n.concat(t).concat({ provide: o, useValue: !0 }));
              else {
                var a = n.concat(t).concat({ provide: o, useValue: !0 });
                !(function (e) {
                  if (Be && !Be.destroyed && !Be.injector.get(Le, !1))
                    throw new Error(
                      "There can be only one platform. Destroy the previous one to create a new one."
                    );
                  Be = e.get(Ze);
                  var t = e.get(ie, null);
                  t &&
                    t.forEach(function (e) {
                      return e();
                    });
                })(P.create({ providers: a, name: r }));
              }
            return (function (e) {
              var t = qe();
              if (!t) throw new Error("No platform exists!");
              if (!t.injector.get(e, null))
                throw new Error(
                  "A platform with a different configuration has been created. Please destroy it first."
                );
              return t;
            })(o);
          };
        }
        function qe() {
          return Be && !Be.destroyed ? Be : null;
        }
        var Ze = (function () {
          function e(e) {
            (this._injector = e),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          return (
            (e.prototype.bootstrapModuleFactory = function (e, t) {
              var n,
                r = this,
                o =
                  "noop" === (n = t ? t.ngZone : void 0)
                    ? new Me()
                    : ("zone.js" === n ? void 0 : n) ||
                      new je({ enableLongStackTrace: Ue() }),
                i = [{ provide: je, useValue: o }];
              return o.run(function () {
                var t = P.create({
                    providers: i,
                    parent: r.injector,
                    name: e.moduleType.name,
                  }),
                  n = e.create(t),
                  a = n.injector.get(J, null);
                if (!a)
                  throw new Error(
                    "No ErrorHandler. Is platform module (BrowserModule) included?"
                  );
                return (
                  n.onDestroy(function () {
                    return $e(r._modules, n);
                  }),
                  o.runOutsideAngular(function () {
                    return o.onError.subscribe({
                      next: function (e) {
                        a.handleError(e);
                      },
                    });
                  }),
                  (function (e, t, o) {
                    try {
                      var i =
                        ((a = n.injector.get(te)).runInitializers(),
                        a.donePromise.then(function () {
                          return r._moduleDoBootstrap(n), n;
                        }));
                      return Y(i)
                        ? i.catch(function (n) {
                            throw (
                              (t.runOutsideAngular(function () {
                                return e.handleError(n);
                              }),
                              n)
                            );
                          })
                        : i;
                    } catch (n) {
                      throw (
                        (t.runOutsideAngular(function () {
                          return e.handleError(n);
                        }),
                        n)
                      );
                    }
                    var a;
                  })(a, o)
                );
              });
            }),
            (e.prototype.bootstrapModule = function (e, t) {
              var n = this;
              void 0 === t && (t = []);
              var r = this.injector.get(pe),
                o = Qe({}, t);
              return r
                .createCompiler([o])
                .compileModuleAsync(e)
                .then(function (e) {
                  return n.bootstrapModuleFactory(e, o);
                });
            }),
            (e.prototype._moduleDoBootstrap = function (e) {
              var t = e.injector.get(Ke);
              if (e._bootstrapComponents.length > 0)
                e._bootstrapComponents.forEach(function (e) {
                  return t.bootstrap(e);
                });
              else {
                if (!e.instance.ngDoBootstrap)
                  throw new Error(
                    "The module " +
                      S(e.instance.constructor) +
                      ' was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. Please define one of these.'
                  );
                e.instance.ngDoBootstrap(t);
              }
              this._modules.push(e);
            }),
            (e.prototype.onDestroy = function (e) {
              this._destroyListeners.push(e);
            }),
            Object.defineProperty(e.prototype, "injector", {
              get: function () {
                return this._injector;
              },
              enumerable: !0,
              configurable: !0,
            }),
            (e.prototype.destroy = function () {
              if (this._destroyed)
                throw new Error("The platform has already been destroyed!");
              this._modules.slice().forEach(function (e) {
                return e.destroy();
              }),
                this._destroyListeners.forEach(function (e) {
                  return e();
                }),
                (this._destroyed = !0);
            }),
            Object.defineProperty(e.prototype, "destroyed", {
              get: function () {
                return this._destroyed;
              },
              enumerable: !0,
              configurable: !0,
            }),
            e
          );
        })();
        function Qe(e, t) {
          return Array.isArray(t) ? t.reduce(Qe, e) : Object(r.a)({}, e, t);
        }
        var Ke = (function () {
          function e(e, t, n, r, s, l) {
            var u = this;
            (this._zone = e),
              (this._console = t),
              (this._injector = n),
              (this._exceptionHandler = r),
              (this._componentFactoryResolver = s),
              (this._initStatus = l),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._enforceNoNewChanges = !1),
              (this._stable = !0),
              (this.componentTypes = []),
              (this.components = []),
              (this._enforceNoNewChanges = Ue()),
              this._zone.onMicrotaskEmpty.subscribe({
                next: function () {
                  u._zone.run(function () {
                    u.tick();
                  });
                },
              });
            var c = new o.a(function (e) {
                (u._stable =
                  u._zone.isStable &&
                  !u._zone.hasPendingMacrotasks &&
                  !u._zone.hasPendingMicrotasks),
                  u._zone.runOutsideAngular(function () {
                    e.next(u._stable), e.complete();
                  });
              }),
              p = new o.a(function (e) {
                var t;
                u._zone.runOutsideAngular(function () {
                  t = u._zone.onStable.subscribe(function () {
                    je.assertNotInAngularZone(),
                      x(function () {
                        u._stable ||
                          u._zone.hasPendingMacrotasks ||
                          u._zone.hasPendingMicrotasks ||
                          ((u._stable = !0), e.next(!0));
                      });
                  });
                });
                var n = u._zone.onUnstable.subscribe(function () {
                  je.assertInAngularZone(),
                    u._stable &&
                      ((u._stable = !1),
                      u._zone.runOutsideAngular(function () {
                        e.next(!1);
                      }));
                });
                return function () {
                  t.unsubscribe(), n.unsubscribe();
                };
              });
            this.isStable = Object(i.a)(c, a.a.call(p));
          }
          return (
            (e.prototype.bootstrap = function (e, t) {
              var n,
                r = this;
              if (!this._initStatus.done)
                throw new Error(
                  "Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module."
                );
              (n =
                e instanceof he
                  ? e
                  : this._componentFactoryResolver.resolveComponentFactory(e)),
                this.componentTypes.push(n.componentType);
              var o = n instanceof me ? null : this._injector.get(we),
                i = n.create(P.NULL, [], t || n.selector, o);
              i.onDestroy(function () {
                r._unloadComponent(i);
              });
              var a = i.injector.get(Ne, null);
              return (
                a &&
                  i.injector
                    .get(Re)
                    .registerApplication(i.location.nativeElement, a),
                this._loadComponent(i),
                Ue() &&
                  this._console.log(
                    "Angular is running in the development mode. Call enableProdMode() to enable the production mode."
                  ),
                i
              );
            }),
            (e.prototype.tick = function () {
              var t = this;
              if (this._runningTick)
                throw new Error("ApplicationRef.tick is called recursively");
              var n = e._tickScope();
              try {
                (this._runningTick = !0),
                  this._views.forEach(function (e) {
                    return e.detectChanges();
                  }),
                  this._enforceNoNewChanges &&
                    this._views.forEach(function (e) {
                      return e.checkNoChanges();
                    });
              } catch (e) {
                this._zone.runOutsideAngular(function () {
                  return t._exceptionHandler.handleError(e);
                });
              } finally {
                (this._runningTick = !1), Se(n);
              }
            }),
            (e.prototype.attachView = function (e) {
              var t = e;
              this._views.push(t), t.attachToAppRef(this);
            }),
            (e.prototype.detachView = function (e) {
              var t = e;
              $e(this._views, t), t.detachFromAppRef();
            }),
            (e.prototype._loadComponent = function (e) {
              this.attachView(e.hostView),
                this.tick(),
                this.components.push(e),
                this._injector
                  .get(se, [])
                  .concat(this._bootstrapListeners)
                  .forEach(function (t) {
                    return t(e);
                  });
            }),
            (e.prototype._unloadComponent = function (e) {
              this.detachView(e.hostView), $e(this.components, e);
            }),
            (e.prototype.ngOnDestroy = function () {
              this._views.slice().forEach(function (e) {
                return e.destroy();
              });
            }),
            Object.defineProperty(e.prototype, "viewCount", {
              get: function () {
                return this._views.length;
              },
              enumerable: !0,
              configurable: !0,
            }),
            (e._tickScope = ke("ApplicationRef#tick()")),
            e
          );
        })();
        function $e(e, t) {
          var n = e.indexOf(t);
          n > -1 && e.splice(n, 1);
        }
        var Je = function () {},
          Ye = (function () {
            var e = { Important: 1, DashCase: 2 };
            return (
              (e[e.Important] = "Important"), (e[e.DashCase] = "DashCase"), e
            );
          })(),
          Xe = function () {},
          et = function (e) {
            this.nativeElement = e;
          },
          tt = (function () {
            function e() {
              (this.dirty = !0),
                (this._results = []),
                (this.changes = new Ee());
            }
            return (
              (e.prototype.map = function (e) {
                return this._results.map(e);
              }),
              (e.prototype.filter = function (e) {
                return this._results.filter(e);
              }),
              (e.prototype.find = function (e) {
                return this._results.find(e);
              }),
              (e.prototype.reduce = function (e, t) {
                return this._results.reduce(e, t);
              }),
              (e.prototype.forEach = function (e) {
                this._results.forEach(e);
              }),
              (e.prototype.some = function (e) {
                return this._results.some(e);
              }),
              (e.prototype.toArray = function () {
                return this._results.slice();
              }),
              (e.prototype[C()] = function () {
                return this._results[C()]();
              }),
              (e.prototype.toString = function () {
                return this._results.toString();
              }),
              (e.prototype.reset = function (e) {
                (this._results = (function e(t) {
                  return t.reduce(function (t, n) {
                    var r = Array.isArray(n) ? e(n) : n;
                    return t.concat(r);
                  }, []);
                })(e)),
                  (this.dirty = !1),
                  (this.length = this._results.length),
                  (this.last = this._results[this.length - 1]),
                  (this.first = this._results[0]);
              }),
              (e.prototype.notifyOnChanges = function () {
                this.changes.emit(this);
              }),
              (e.prototype.setDirty = function () {
                this.dirty = !0;
              }),
              (e.prototype.destroy = function () {
                this.changes.complete(), this.changes.unsubscribe();
              }),
              e
            );
          })(),
          nt = function () {},
          rt = function () {},
          ot = (function () {
            function e(e, t, n) {
              (this._debugContext = n),
                (this.nativeNode = e),
                t && t instanceof it ? t.addChild(this) : (this.parent = null),
                (this.listeners = []);
            }
            return (
              Object.defineProperty(e.prototype, "injector", {
                get: function () {
                  return this._debugContext.injector;
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(e.prototype, "componentInstance", {
                get: function () {
                  return this._debugContext.component;
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(e.prototype, "context", {
                get: function () {
                  return this._debugContext.context;
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(e.prototype, "references", {
                get: function () {
                  return this._debugContext.references;
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(e.prototype, "providerTokens", {
                get: function () {
                  return this._debugContext.providerTokens;
                },
                enumerable: !0,
                configurable: !0,
              }),
              e
            );
          })(),
          it = (function (e) {
            function t(t, n, r) {
              var o = e.call(this, t, n, r) || this;
              return (
                (o.properties = {}),
                (o.attributes = {}),
                (o.classes = {}),
                (o.styles = {}),
                (o.childNodes = []),
                (o.nativeElement = t),
                o
              );
            }
            return (
              Object(r.b)(t, e),
              (t.prototype.addChild = function (e) {
                e && (this.childNodes.push(e), (e.parent = this));
              }),
              (t.prototype.removeChild = function (e) {
                var t = this.childNodes.indexOf(e);
                -1 !== t && ((e.parent = null), this.childNodes.splice(t, 1));
              }),
              (t.prototype.insertChildrenAfter = function (e, t) {
                var n,
                  r = this,
                  o = this.childNodes.indexOf(e);
                -1 !== o &&
                  ((n = this.childNodes).splice.apply(n, [o + 1, 0].concat(t)),
                  t.forEach(function (e) {
                    e.parent && e.parent.removeChild(e), (e.parent = r);
                  }));
              }),
              (t.prototype.insertBefore = function (e, t) {
                var n = this.childNodes.indexOf(e);
                -1 === n
                  ? this.addChild(t)
                  : (t.parent && t.parent.removeChild(t),
                    (t.parent = this),
                    this.childNodes.splice(n, 0, t));
              }),
              (t.prototype.query = function (e) {
                return this.queryAll(e)[0] || null;
              }),
              (t.prototype.queryAll = function (e) {
                var t = [];
                return at(this, e, t), t;
              }),
              (t.prototype.queryAllNodes = function (e) {
                var t = [];
                return st(this, e, t), t;
              }),
              Object.defineProperty(t.prototype, "children", {
                get: function () {
                  return this.childNodes.filter(function (e) {
                    return e instanceof t;
                  });
                },
                enumerable: !0,
                configurable: !0,
              }),
              (t.prototype.triggerEventHandler = function (e, t) {
                this.listeners.forEach(function (n) {
                  n.name == e && n.callback(t);
                });
              }),
              t
            );
          })(ot);
        function at(e, t, n) {
          e.childNodes.forEach(function (e) {
            e instanceof it && (t(e) && n.push(e), at(e, t, n));
          });
        }
        function st(e, t, n) {
          e instanceof it &&
            e.childNodes.forEach(function (e) {
              t(e) && n.push(e), e instanceof it && st(e, t, n);
            });
        }
        var lt = new Map();
        function ut(e) {
          return lt.get(e) || null;
        }
        function ct(e) {
          lt.set(e.nativeNode, e);
        }
        function pt(e, t) {
          var n = dt(e),
            r = dt(t);
          return n && r
            ? (function (e, t, n) {
                for (var r = e[C()](), o = t[C()](); ; ) {
                  var i = r.next(),
                    a = o.next();
                  if (i.done && a.done) return !0;
                  if (i.done || a.done) return !1;
                  if (!n(i.value, a.value)) return !1;
                }
              })(e, t, pt)
            : !(
                n ||
                !e ||
                ("object" != typeof e && "function" != typeof e) ||
                r ||
                !t ||
                ("object" != typeof t && "function" != typeof t)
              ) || k(e, t);
        }
        var ht = (function () {
            function e(e) {
              this.wrapped = e;
            }
            return (
              (e.wrap = function (t) {
                return new e(t);
              }),
              (e.unwrap = function (t) {
                return e.isWrapped(t) ? t.wrapped : t;
              }),
              (e.isWrapped = function (t) {
                return t instanceof e;
              }),
              e
            );
          })(),
          ft = (function () {
            function e(e, t, n) {
              (this.previousValue = e),
                (this.currentValue = t),
                (this.firstChange = n);
            }
            return (
              (e.prototype.isFirstChange = function () {
                return this.firstChange;
              }),
              e
            );
          })();
        function dt(e) {
          return (
            !!yt(e) && (Array.isArray(e) || (!(e instanceof Map) && C() in e))
          );
        }
        function yt(e) {
          return null !== e && ("function" == typeof e || "object" == typeof e);
        }
        var _t = (function () {
            function e() {}
            return (
              (e.prototype.supports = function (e) {
                return dt(e);
              }),
              (e.prototype.create = function (e) {
                return new bt(e);
              }),
              e
            );
          })(),
          vt = function (e, t) {
            return t;
          },
          bt = (function () {
            function e(e) {
              (this.length = 0),
                (this._linkedRecords = null),
                (this._unlinkedRecords = null),
                (this._previousItHead = null),
                (this._itHead = null),
                (this._itTail = null),
                (this._additionsHead = null),
                (this._additionsTail = null),
                (this._movesHead = null),
                (this._movesTail = null),
                (this._removalsHead = null),
                (this._removalsTail = null),
                (this._identityChangesHead = null),
                (this._identityChangesTail = null),
                (this._trackByFn = e || vt);
            }
            return (
              (e.prototype.forEachItem = function (e) {
                var t;
                for (t = this._itHead; null !== t; t = t._next) e(t);
              }),
              (e.prototype.forEachOperation = function (e) {
                for (
                  var t = this._itHead, n = this._removalsHead, r = 0, o = null;
                  t || n;

                ) {
                  var i = !n || (t && t.currentIndex < Ct(n, r, o)) ? t : n,
                    a = Ct(i, r, o),
                    s = i.currentIndex;
                  if (i === n) r--, (n = n._nextRemoved);
                  else if (((t = t._next), null == i.previousIndex)) r++;
                  else {
                    o || (o = []);
                    var l = a - r,
                      u = s - r;
                    if (l != u) {
                      for (var c = 0; c < l; c++) {
                        var p = c < o.length ? o[c] : (o[c] = 0),
                          h = p + c;
                        u <= h && h < l && (o[c] = p + 1);
                      }
                      o[i.previousIndex] = u - l;
                    }
                  }
                  a !== s && e(i, a, s);
                }
              }),
              (e.prototype.forEachPreviousItem = function (e) {
                var t;
                for (t = this._previousItHead; null !== t; t = t._nextPrevious)
                  e(t);
              }),
              (e.prototype.forEachAddedItem = function (e) {
                var t;
                for (t = this._additionsHead; null !== t; t = t._nextAdded)
                  e(t);
              }),
              (e.prototype.forEachMovedItem = function (e) {
                var t;
                for (t = this._movesHead; null !== t; t = t._nextMoved) e(t);
              }),
              (e.prototype.forEachRemovedItem = function (e) {
                var t;
                for (t = this._removalsHead; null !== t; t = t._nextRemoved)
                  e(t);
              }),
              (e.prototype.forEachIdentityChange = function (e) {
                var t;
                for (
                  t = this._identityChangesHead;
                  null !== t;
                  t = t._nextIdentityChange
                )
                  e(t);
              }),
              (e.prototype.diff = function (e) {
                if ((null == e && (e = []), !dt(e)))
                  throw new Error(
                    "Error trying to diff '" +
                      S(e) +
                      "'. Only arrays and iterables are allowed"
                  );
                return this.check(e) ? this : null;
              }),
              (e.prototype.onDestroy = function () {}),
              (e.prototype.check = function (e) {
                var t = this;
                this._reset();
                var n,
                  r,
                  o,
                  i = this._itHead,
                  a = !1;
                if (Array.isArray(e)) {
                  this.length = e.length;
                  for (var s = 0; s < this.length; s++)
                    (o = this._trackByFn(s, (r = e[s]))),
                      null !== i && k(i.trackById, o)
                        ? (a && (i = this._verifyReinsertion(i, r, o, s)),
                          k(i.item, r) || this._addIdentityChange(i, r))
                        : ((i = this._mismatch(i, r, o, s)), (a = !0)),
                      (i = i._next);
                } else
                  (n = 0),
                    (function (e, t) {
                      if (Array.isArray(e))
                        for (var n = 0; n < e.length; n++) t(e[n]);
                      else
                        for (
                          var r = e[C()](), o = void 0;
                          !(o = r.next()).done;

                        )
                          t(o.value);
                    })(e, function (e) {
                      (o = t._trackByFn(n, e)),
                        null !== i && k(i.trackById, o)
                          ? (a && (i = t._verifyReinsertion(i, e, o, n)),
                            k(i.item, e) || t._addIdentityChange(i, e))
                          : ((i = t._mismatch(i, e, o, n)), (a = !0)),
                        (i = i._next),
                        n++;
                    }),
                    (this.length = n);
                return this._truncate(i), (this.collection = e), this.isDirty;
              }),
              Object.defineProperty(e.prototype, "isDirty", {
                get: function () {
                  return (
                    null !== this._additionsHead ||
                    null !== this._movesHead ||
                    null !== this._removalsHead ||
                    null !== this._identityChangesHead
                  );
                },
                enumerable: !0,
                configurable: !0,
              }),
              (e.prototype._reset = function () {
                if (this.isDirty) {
                  var e = void 0,
                    t = void 0;
                  for (
                    e = this._previousItHead = this._itHead;
                    null !== e;
                    e = e._next
                  )
                    e._nextPrevious = e._next;
                  for (e = this._additionsHead; null !== e; e = e._nextAdded)
                    e.previousIndex = e.currentIndex;
                  for (
                    this._additionsHead = this._additionsTail = null,
                      e = this._movesHead;
                    null !== e;
                    e = t
                  )
                    (e.previousIndex = e.currentIndex), (t = e._nextMoved);
                  (this._movesHead = this._movesTail = null),
                    (this._removalsHead = this._removalsTail = null),
                    (this._identityChangesHead = this._identityChangesTail =
                      null);
                }
              }),
              (e.prototype._mismatch = function (e, t, n, r) {
                var o;
                return (
                  null === e
                    ? (o = this._itTail)
                    : ((o = e._prev), this._remove(e)),
                  null !==
                  (e =
                    null === this._linkedRecords
                      ? null
                      : this._linkedRecords.get(n, r))
                    ? (k(e.item, t) || this._addIdentityChange(e, t),
                      this._moveAfter(e, o, r))
                    : null !==
                      (e =
                        null === this._unlinkedRecords
                          ? null
                          : this._unlinkedRecords.get(n, null))
                    ? (k(e.item, t) || this._addIdentityChange(e, t),
                      this._reinsertAfter(e, o, r))
                    : (e = this._addAfter(new gt(t, n), o, r)),
                  e
                );
              }),
              (e.prototype._verifyReinsertion = function (e, t, n, r) {
                var o =
                  null === this._unlinkedRecords
                    ? null
                    : this._unlinkedRecords.get(n, null);
                return (
                  null !== o
                    ? (e = this._reinsertAfter(o, e._prev, r))
                    : e.currentIndex != r &&
                      ((e.currentIndex = r), this._addToMoves(e, r)),
                  e
                );
              }),
              (e.prototype._truncate = function (e) {
                for (; null !== e; ) {
                  var t = e._next;
                  this._addToRemovals(this._unlink(e)), (e = t);
                }
                null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
                  null !== this._additionsTail &&
                    (this._additionsTail._nextAdded = null),
                  null !== this._movesTail &&
                    (this._movesTail._nextMoved = null),
                  null !== this._itTail && (this._itTail._next = null),
                  null !== this._removalsTail &&
                    (this._removalsTail._nextRemoved = null),
                  null !== this._identityChangesTail &&
                    (this._identityChangesTail._nextIdentityChange = null);
              }),
              (e.prototype._reinsertAfter = function (e, t, n) {
                null !== this._unlinkedRecords &&
                  this._unlinkedRecords.remove(e);
                var r = e._prevRemoved,
                  o = e._nextRemoved;
                return (
                  null === r ? (this._removalsHead = o) : (r._nextRemoved = o),
                  null === o ? (this._removalsTail = r) : (o._prevRemoved = r),
                  this._insertAfter(e, t, n),
                  this._addToMoves(e, n),
                  e
                );
              }),
              (e.prototype._moveAfter = function (e, t, n) {
                return (
                  this._unlink(e),
                  this._insertAfter(e, t, n),
                  this._addToMoves(e, n),
                  e
                );
              }),
              (e.prototype._addAfter = function (e, t, n) {
                return (
                  this._insertAfter(e, t, n),
                  (this._additionsTail =
                    null === this._additionsTail
                      ? (this._additionsHead = e)
                      : (this._additionsTail._nextAdded = e)),
                  e
                );
              }),
              (e.prototype._insertAfter = function (e, t, n) {
                var r = null === t ? this._itHead : t._next;
                return (
                  (e._next = r),
                  (e._prev = t),
                  null === r ? (this._itTail = e) : (r._prev = e),
                  null === t ? (this._itHead = e) : (t._next = e),
                  null === this._linkedRecords &&
                    (this._linkedRecords = new wt()),
                  this._linkedRecords.put(e),
                  (e.currentIndex = n),
                  e
                );
              }),
              (e.prototype._remove = function (e) {
                return this._addToRemovals(this._unlink(e));
              }),
              (e.prototype._unlink = function (e) {
                null !== this._linkedRecords && this._linkedRecords.remove(e);
                var t = e._prev,
                  n = e._next;
                return (
                  null === t ? (this._itHead = n) : (t._next = n),
                  null === n ? (this._itTail = t) : (n._prev = t),
                  e
                );
              }),
              (e.prototype._addToMoves = function (e, t) {
                return e.previousIndex === t
                  ? e
                  : ((this._movesTail =
                      null === this._movesTail
                        ? (this._movesHead = e)
                        : (this._movesTail._nextMoved = e)),
                    e);
              }),
              (e.prototype._addToRemovals = function (e) {
                return (
                  null === this._unlinkedRecords &&
                    (this._unlinkedRecords = new wt()),
                  this._unlinkedRecords.put(e),
                  (e.currentIndex = null),
                  (e._nextRemoved = null),
                  null === this._removalsTail
                    ? ((this._removalsTail = this._removalsHead = e),
                      (e._prevRemoved = null))
                    : ((e._prevRemoved = this._removalsTail),
                      (this._removalsTail = this._removalsTail._nextRemoved =
                        e)),
                  e
                );
              }),
              (e.prototype._addIdentityChange = function (e, t) {
                return (
                  (e.item = t),
                  (this._identityChangesTail =
                    null === this._identityChangesTail
                      ? (this._identityChangesHead = e)
                      : (this._identityChangesTail._nextIdentityChange = e)),
                  e
                );
              }),
              e
            );
          })(),
          gt = function (e, t) {
            (this.item = e),
              (this.trackById = t),
              (this.currentIndex = null),
              (this.previousIndex = null),
              (this._nextPrevious = null),
              (this._prev = null),
              (this._next = null),
              (this._prevDup = null),
              (this._nextDup = null),
              (this._prevRemoved = null),
              (this._nextRemoved = null),
              (this._nextAdded = null),
              (this._nextMoved = null),
              (this._nextIdentityChange = null);
          },
          mt = (function () {
            function e() {
              (this._head = null), (this._tail = null);
            }
            return (
              (e.prototype.add = function (e) {
                null === this._head
                  ? ((this._head = this._tail = e),
                    (e._nextDup = null),
                    (e._prevDup = null))
                  : ((this._tail._nextDup = e),
                    (e._prevDup = this._tail),
                    (e._nextDup = null),
                    (this._tail = e));
              }),
              (e.prototype.get = function (e, t) {
                var n;
                for (n = this._head; null !== n; n = n._nextDup)
                  if ((null === t || t <= n.currentIndex) && k(n.trackById, e))
                    return n;
                return null;
              }),
              (e.prototype.remove = function (e) {
                var t = e._prevDup,
                  n = e._nextDup;
                return (
                  null === t ? (this._head = n) : (t._nextDup = n),
                  null === n ? (this._tail = t) : (n._prevDup = t),
                  null === this._head
                );
              }),
              e
            );
          })(),
          wt = (function () {
            function e() {
              this.map = new Map();
            }
            return (
              (e.prototype.put = function (e) {
                var t = e.trackById,
                  n = this.map.get(t);
                n || ((n = new mt()), this.map.set(t, n)), n.add(e);
              }),
              (e.prototype.get = function (e, t) {
                var n = this.map.get(e);
                return n ? n.get(e, t) : null;
              }),
              (e.prototype.remove = function (e) {
                var t = e.trackById;
                return this.map.get(t).remove(e) && this.map.delete(t), e;
              }),
              Object.defineProperty(e.prototype, "isEmpty", {
                get: function () {
                  return 0 === this.map.size;
                },
                enumerable: !0,
                configurable: !0,
              }),
              (e.prototype.clear = function () {
                this.map.clear();
              }),
              e
            );
          })();
        function Ct(e, t, n) {
          var r = e.previousIndex;
          if (null === r) return r;
          var o = 0;
          return n && r < n.length && (o = n[r]), r + t + o;
        }
        var xt = (function () {
            function e() {}
            return (
              (e.prototype.supports = function (e) {
                return e instanceof Map || yt(e);
              }),
              (e.prototype.create = function () {
                return new kt();
              }),
              e
            );
          })(),
          kt = (function () {
            function e() {
              (this._records = new Map()),
                (this._mapHead = null),
                (this._appendAfter = null),
                (this._previousMapHead = null),
                (this._changesHead = null),
                (this._changesTail = null),
                (this._additionsHead = null),
                (this._additionsTail = null),
                (this._removalsHead = null),
                (this._removalsTail = null);
            }
            return (
              Object.defineProperty(e.prototype, "isDirty", {
                get: function () {
                  return (
                    null !== this._additionsHead ||
                    null !== this._changesHead ||
                    null !== this._removalsHead
                  );
                },
                enumerable: !0,
                configurable: !0,
              }),
              (e.prototype.forEachItem = function (e) {
                var t;
                for (t = this._mapHead; null !== t; t = t._next) e(t);
              }),
              (e.prototype.forEachPreviousItem = function (e) {
                var t;
                for (t = this._previousMapHead; null !== t; t = t._nextPrevious)
                  e(t);
              }),
              (e.prototype.forEachChangedItem = function (e) {
                var t;
                for (t = this._changesHead; null !== t; t = t._nextChanged)
                  e(t);
              }),
              (e.prototype.forEachAddedItem = function (e) {
                var t;
                for (t = this._additionsHead; null !== t; t = t._nextAdded)
                  e(t);
              }),
              (e.prototype.forEachRemovedItem = function (e) {
                var t;
                for (t = this._removalsHead; null !== t; t = t._nextRemoved)
                  e(t);
              }),
              (e.prototype.diff = function (e) {
                if (e) {
                  if (!(e instanceof Map || yt(e)))
                    throw new Error(
                      "Error trying to diff '" +
                        S(e) +
                        "'. Only maps and objects are allowed"
                    );
                } else e = new Map();
                return this.check(e) ? this : null;
              }),
              (e.prototype.onDestroy = function () {}),
              (e.prototype.check = function (e) {
                var t = this;
                this._reset();
                var n = this._mapHead;
                if (
                  ((this._appendAfter = null),
                  this._forEach(e, function (e, r) {
                    if (n && n.key === r)
                      t._maybeAddToChanges(n, e),
                        (t._appendAfter = n),
                        (n = n._next);
                    else {
                      var o = t._getOrCreateRecordForKey(r, e);
                      n = t._insertBeforeOrAppend(n, o);
                    }
                  }),
                  n)
                ) {
                  n._prev && (n._prev._next = null), (this._removalsHead = n);
                  for (var r = n; null !== r; r = r._nextRemoved)
                    r === this._mapHead && (this._mapHead = null),
                      this._records.delete(r.key),
                      (r._nextRemoved = r._next),
                      (r.previousValue = r.currentValue),
                      (r.currentValue = null),
                      (r._prev = null),
                      (r._next = null);
                }
                return (
                  this._changesTail && (this._changesTail._nextChanged = null),
                  this._additionsTail &&
                    (this._additionsTail._nextAdded = null),
                  this.isDirty
                );
              }),
              (e.prototype._insertBeforeOrAppend = function (e, t) {
                if (e) {
                  var n = e._prev;
                  return (
                    (t._next = e),
                    (t._prev = n),
                    (e._prev = t),
                    n && (n._next = t),
                    e === this._mapHead && (this._mapHead = t),
                    (this._appendAfter = e),
                    e
                  );
                }
                return (
                  this._appendAfter
                    ? ((this._appendAfter._next = t),
                      (t._prev = this._appendAfter))
                    : (this._mapHead = t),
                  (this._appendAfter = t),
                  null
                );
              }),
              (e.prototype._getOrCreateRecordForKey = function (e, t) {
                if (this._records.has(e)) {
                  var n = this._records.get(e);
                  this._maybeAddToChanges(n, t);
                  var r = n._prev,
                    o = n._next;
                  return (
                    r && (r._next = o),
                    o && (o._prev = r),
                    (n._next = null),
                    (n._prev = null),
                    n
                  );
                }
                var i = new St(e);
                return (
                  this._records.set(e, i),
                  (i.currentValue = t),
                  this._addToAdditions(i),
                  i
                );
              }),
              (e.prototype._reset = function () {
                if (this.isDirty) {
                  var e = void 0;
                  for (
                    this._previousMapHead = this._mapHead,
                      e = this._previousMapHead;
                    null !== e;
                    e = e._next
                  )
                    e._nextPrevious = e._next;
                  for (e = this._changesHead; null !== e; e = e._nextChanged)
                    e.previousValue = e.currentValue;
                  for (e = this._additionsHead; null != e; e = e._nextAdded)
                    e.previousValue = e.currentValue;
                  (this._changesHead = this._changesTail = null),
                    (this._additionsHead = this._additionsTail = null),
                    (this._removalsHead = null);
                }
              }),
              (e.prototype._maybeAddToChanges = function (e, t) {
                k(t, e.currentValue) ||
                  ((e.previousValue = e.currentValue),
                  (e.currentValue = t),
                  this._addToChanges(e));
              }),
              (e.prototype._addToAdditions = function (e) {
                null === this._additionsHead
                  ? (this._additionsHead = this._additionsTail = e)
                  : ((this._additionsTail._nextAdded = e),
                    (this._additionsTail = e));
              }),
              (e.prototype._addToChanges = function (e) {
                null === this._changesHead
                  ? (this._changesHead = this._changesTail = e)
                  : ((this._changesTail._nextChanged = e),
                    (this._changesTail = e));
              }),
              (e.prototype._forEach = function (e, t) {
                e instanceof Map
                  ? e.forEach(t)
                  : Object.keys(e).forEach(function (n) {
                      return t(e[n], n);
                    });
              }),
              e
            );
          })(),
          St = function (e) {
            (this.key = e),
              (this.previousValue = null),
              (this.currentValue = null),
              (this._nextPrevious = null),
              (this._next = null),
              (this._prev = null),
              (this._nextAdded = null),
              (this._nextRemoved = null),
              (this._nextChanged = null);
          },
          Et = (function () {
            function e(e) {
              this.factories = e;
            }
            return (
              (e.create = function (t, n) {
                if (null != n) {
                  var r = n.factories.slice();
                  return new e((t = t.concat(r)));
                }
                return new e(t);
              }),
              (e.extend = function (t) {
                return {
                  provide: e,
                  useFactory: function (n) {
                    if (!n)
                      throw new Error(
                        "Cannot extend IterableDiffers without a parent injector"
                      );
                    return e.create(t, n);
                  },
                  deps: [[e, new v(), new y()]],
                };
              }),
              (e.prototype.find = function (e) {
                var t,
                  n = this.factories.find(function (t) {
                    return t.supports(e);
                  });
                if (null != n) return n;
                throw new Error(
                  "Cannot find a differ supporting object '" +
                    e +
                    "' of type '" +
                    ((t = e).name || typeof t) +
                    "'"
                );
              }),
              e
            );
          })(),
          jt = (function () {
            function e(e) {
              this.factories = e;
            }
            return (
              (e.create = function (t, n) {
                if (n) {
                  var r = n.factories.slice();
                  t = t.concat(r);
                }
                return new e(t);
              }),
              (e.extend = function (t) {
                return {
                  provide: e,
                  useFactory: function (n) {
                    if (!n)
                      throw new Error(
                        "Cannot extend KeyValueDiffers without a parent injector"
                      );
                    return e.create(t, n);
                  },
                  deps: [[e, new v(), new y()]],
                };
              }),
              (e.prototype.find = function (e) {
                var t = this.factories.find(function (t) {
                  return t.supports(e);
                });
                if (t) return t;
                throw new Error(
                  "Cannot find a differ supporting object '" + e + "'"
                );
              }),
              e
            );
          })(),
          Tt = [new xt()],
          At = new Et([new _t()]),
          It = new jt(Tt),
          Pt = Ge(null, "core", [
            { provide: ae, useValue: "unknown" },
            { provide: Ze, deps: [P] },
            { provide: Re, deps: [] },
            { provide: le, deps: [] },
          ]),
          Ot = new l("LocaleId");
        function Mt() {
          return At;
        }
        function Nt() {
          return It;
        }
        function Rt(e) {
          return e || "en-US";
        }
        var Dt = function (e) {},
          Bt = (function () {
            var e = {
              NONE: 0,
              HTML: 1,
              STYLE: 2,
              SCRIPT: 3,
              URL: 4,
              RESOURCE_URL: 5,
            };
            return (
              (e[e.NONE] = "NONE"),
              (e[e.HTML] = "HTML"),
              (e[e.STYLE] = "STYLE"),
              (e[e.SCRIPT] = "SCRIPT"),
              (e[e.URL] = "URL"),
              (e[e.RESOURCE_URL] = "RESOURCE_URL"),
              e
            );
          })(),
          Vt = function () {};
        function zt(e, t, n) {
          var r = e.state,
            o = 1792 & r;
          return o === t
            ? ((e.state = (-1793 & r) | n), (e.initIndex = -1), !0)
            : o === n;
        }
        function Ft(e, t, n) {
          return (
            (1792 & e.state) === t &&
            e.initIndex <= n &&
            ((e.initIndex = n + 1), !0)
          );
        }
        function Lt(e, t) {
          return e.nodes[t];
        }
        function Ht(e, t) {
          return e.nodes[t];
        }
        function Ut(e, t) {
          return e.nodes[t];
        }
        function Wt(e, t) {
          return e.nodes[t];
        }
        function Gt(e, t) {
          return e.nodes[t];
        }
        var qt = {
          setCurrentNode: void 0,
          createRootView: void 0,
          createEmbeddedView: void 0,
          createComponentView: void 0,
          createNgModuleRef: void 0,
          overrideProvider: void 0,
          overrideComponentView: void 0,
          clearOverrides: void 0,
          checkAndUpdateView: void 0,
          checkNoChangesView: void 0,
          destroyView: void 0,
          resolveDep: void 0,
          createDebugContext: void 0,
          handleEvent: void 0,
          updateDirectives: void 0,
          updateRenderer: void 0,
          dirtyParentQueries: void 0,
        };
        function Zt(e, t, n, r) {
          var o =
            "ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value: '" +
            t +
            "'. Current value: '" +
            n +
            "'.";
          return (
            r &&
              (o +=
                " It seems like the view has been created after its parent and its children have been dirty checked. Has it been created in a change detection hook ?"),
            (function (e, t) {
              var n = new Error(e);
              return Qt(n, t), n;
            })(o, e)
          );
        }
        function Qt(e, t) {
          (e[G] = t), (e[Z] = t.logError.bind(t));
        }
        function Kt(e) {
          return new Error(
            "ViewDestroyedError: Attempt to use a destroyed view: " + e
          );
        }
        var $t = function () {},
          Jt = new Map();
        function Yt(e) {
          var t = Jt.get(e);
          return t || ((t = S(e) + "_" + Jt.size), Jt.set(e, t)), t;
        }
        var Xt = "$$undefined",
          en = "$$empty";
        function tn(e) {
          return {
            id: Xt,
            styles: e.styles,
            encapsulation: e.encapsulation,
            data: e.data,
          };
        }
        var nn = 0;
        function rn(e, t, n, r) {
          return !(!(2 & e.state) && k(e.oldValues[t.bindingIndex + n], r));
        }
        function on(e, t, n, r) {
          return (
            !!rn(e, t, n, r) && ((e.oldValues[t.bindingIndex + n] = r), !0)
          );
        }
        function an(e, t, n, r) {
          var o = e.oldValues[t.bindingIndex + n];
          if (1 & e.state || !pt(o, r)) {
            var i = t.bindings[t.bindingIndex].name;
            throw Zt(
              qt.createDebugContext(e, t.nodeIndex),
              i + ": " + o,
              i + ": " + r,
              0 != (1 & e.state)
            );
          }
        }
        function sn(e) {
          for (var t = e; t; )
            2 & t.def.flags && (t.state |= 8),
              (t = t.viewContainerParent || t.parent);
        }
        function ln(e, t) {
          for (var n = e; n && n !== t; )
            (n.state |= 64), (n = n.viewContainerParent || n.parent);
        }
        function un(e, t, n, r) {
          try {
            return (
              sn(33554432 & e.def.nodes[t].flags ? Ht(e, t).componentView : e),
              qt.handleEvent(e, t, n, r)
            );
          } catch (t) {
            e.root.errorHandler.handleError(t);
          }
        }
        function cn(e) {
          return e.parent ? Ht(e.parent, e.parentNodeDef.nodeIndex) : null;
        }
        function pn(e) {
          return e.parent ? e.parentNodeDef.parent : null;
        }
        function hn(e, t) {
          switch (201347067 & t.flags) {
            case 1:
              return Ht(e, t.nodeIndex).renderElement;
            case 2:
              return Lt(e, t.nodeIndex).renderText;
          }
        }
        function fn(e) {
          return !!e.parent && !!(32768 & e.parentNodeDef.flags);
        }
        function dn(e) {
          return !(!e.parent || 32768 & e.parentNodeDef.flags);
        }
        function yn(e) {
          var t = {},
            n = 0,
            r = {};
          return (
            e &&
              e.forEach(function (e) {
                var o = e[0],
                  i = e[1];
                "number" == typeof o
                  ? ((t[o] = i),
                    (n |= (function (e) {
                      return 1 << e % 32;
                    })(o)))
                  : (r[o] = i);
              }),
            { matchedQueries: t, references: r, matchedQueryIds: n }
          );
        }
        function _n(e, t) {
          return e.map(function (e) {
            var n, r;
            return (
              Array.isArray(e) ? ((r = e[0]), (n = e[1])) : ((r = 0), (n = e)),
              n &&
                ("function" == typeof n || "object" == typeof n) &&
                t &&
                Object.defineProperty(n, T, { value: t, configurable: !0 }),
              { flags: r, token: n, tokenKey: Yt(n) }
            );
          });
        }
        function vn(e, t, n) {
          var r = n.renderParent;
          return r
            ? 0 == (1 & r.flags) ||
              0 == (33554432 & r.flags) ||
              (r.element.componentRendererType &&
                r.element.componentRendererType.encapsulation === p.Native)
              ? Ht(e, n.renderParent.nodeIndex).renderElement
              : void 0
            : t;
        }
        var bn = new WeakMap();
        function gn(e) {
          var t = bn.get(e);
          return (
            t ||
              (((t = e(function () {
                return $t;
              })).factory = e),
              bn.set(e, t)),
            t
          );
        }
        function mn(e, t, n, r, o) {
          3 === t &&
            (n = e.renderer.parentNode(hn(e, e.def.lastRenderRootNode))),
            wn(e, t, 0, e.def.nodes.length - 1, n, r, o);
        }
        function wn(e, t, n, r, o, i, a) {
          for (var s = n; s <= r; s++) {
            var l = e.def.nodes[s];
            11 & l.flags && xn(e, l, t, o, i, a), (s += l.childCount);
          }
        }
        function Cn(e, t, n, r, o, i) {
          for (var a = e; a && !fn(a); ) a = a.parent;
          for (
            var s = a.parent,
              l = pn(a),
              u = l.nodeIndex + l.childCount,
              c = l.nodeIndex + 1;
            c <= u;
            c++
          ) {
            var p = s.def.nodes[c];
            p.ngContentIndex === t && xn(s, p, n, r, o, i), (c += p.childCount);
          }
          if (!s.parent) {
            var h = e.root.projectableNodes[t];
            if (h) for (c = 0; c < h.length; c++) kn(e, h[c], n, r, o, i);
          }
        }
        function xn(e, t, n, r, o, i) {
          if (8 & t.flags) Cn(e, t.ngContent.index, n, r, o, i);
          else {
            var a = hn(e, t);
            if (
              (3 === n && 33554432 & t.flags && 48 & t.bindingFlags
                ? (16 & t.bindingFlags && kn(e, a, n, r, o, i),
                  32 & t.bindingFlags &&
                    kn(Ht(e, t.nodeIndex).componentView, a, n, r, o, i))
                : kn(e, a, n, r, o, i),
              16777216 & t.flags)
            )
              for (
                var s = Ht(e, t.nodeIndex).viewContainer._embeddedViews, l = 0;
                l < s.length;
                l++
              )
                mn(s[l], n, r, o, i);
            1 & t.flags &&
              !t.element.name &&
              wn(e, n, t.nodeIndex + 1, t.nodeIndex + t.childCount, r, o, i);
          }
        }
        function kn(e, t, n, r, o, i) {
          var a = e.renderer;
          switch (n) {
            case 1:
              a.appendChild(r, t);
              break;
            case 2:
              a.insertBefore(r, t, o);
              break;
            case 3:
              a.removeChild(r, t);
              break;
            case 0:
              i.push(t);
          }
        }
        var Sn = /^:([^:]+):(.+)$/;
        function En(e) {
          if (":" === e[0]) {
            var t = e.match(Sn);
            return [t[1], t[2]];
          }
          return ["", e];
        }
        function jn(e) {
          for (var t = 0, n = 0; n < e.length; n++) t |= e[n].flags;
          return t;
        }
        function Tn(
          e,
          t,
          n,
          r,
          o,
          i,
          a,
          s,
          l,
          u,
          c,
          p,
          h,
          f,
          d,
          y,
          _,
          v,
          b,
          g
        ) {
          switch (e) {
            case 1:
              return t + An(n) + r;
            case 2:
              return t + An(n) + r + An(o) + i;
            case 3:
              return t + An(n) + r + An(o) + i + An(a) + s;
            case 4:
              return t + An(n) + r + An(o) + i + An(a) + s + An(l) + u;
            case 5:
              return (
                t + An(n) + r + An(o) + i + An(a) + s + An(l) + u + An(c) + p
              );
            case 6:
              return (
                t +
                An(n) +
                r +
                An(o) +
                i +
                An(a) +
                s +
                An(l) +
                u +
                An(c) +
                p +
                An(h) +
                f
              );
            case 7:
              return (
                t +
                An(n) +
                r +
                An(o) +
                i +
                An(a) +
                s +
                An(l) +
                u +
                An(c) +
                p +
                An(h) +
                f +
                An(d) +
                y
              );
            case 8:
              return (
                t +
                An(n) +
                r +
                An(o) +
                i +
                An(a) +
                s +
                An(l) +
                u +
                An(c) +
                p +
                An(h) +
                f +
                An(d) +
                y +
                An(_) +
                v
              );
            case 9:
              return (
                t +
                An(n) +
                r +
                An(o) +
                i +
                An(a) +
                s +
                An(l) +
                u +
                An(c) +
                p +
                An(h) +
                f +
                An(d) +
                y +
                An(_) +
                v +
                An(b) +
                g
              );
            default:
              throw new Error("Does not support more than 9 expressions");
          }
        }
        function An(e) {
          return null != e ? e.toString() : "";
        }
        function In(e, t, n, r, o, i) {
          e |= 1;
          var a = yn(t);
          return {
            nodeIndex: -1,
            parent: null,
            renderParent: null,
            bindingIndex: -1,
            outputIndex: -1,
            flags: e,
            checkIndex: -1,
            childFlags: 0,
            directChildFlags: 0,
            childMatchedQueries: 0,
            matchedQueries: a.matchedQueries,
            matchedQueryIds: a.matchedQueryIds,
            references: a.references,
            ngContentIndex: n,
            childCount: r,
            bindings: [],
            bindingFlags: 0,
            outputs: [],
            element: {
              ns: null,
              name: null,
              attrs: null,
              template: i ? gn(i) : null,
              componentProvider: null,
              componentView: null,
              componentRendererType: null,
              publicProviders: null,
              allProviders: null,
              handleEvent: o || $t,
            },
            provider: null,
            text: null,
            query: null,
            ngContent: null,
          };
        }
        function Pn(e, t, n, r, o, i, a, s, l, u, c, h) {
          void 0 === a && (a = []), u || (u = $t);
          var f = yn(n),
            d = f.matchedQueries,
            y = f.references,
            _ = f.matchedQueryIds,
            v = null,
            b = null;
          i && ((v = (P = En(i))[0]), (b = P[1])), (s = s || []);
          for (var g = new Array(s.length), m = 0; m < s.length; m++) {
            var w = s[m],
              C = w[0],
              x = w[2],
              k = En(w[1]),
              S = k[0],
              E = k[1],
              j = void 0,
              T = void 0;
            switch (15 & C) {
              case 4:
                T = x;
                break;
              case 1:
              case 8:
                j = x;
            }
            g[m] = {
              flags: C,
              ns: S,
              name: E,
              nonMinifiedName: E,
              securityContext: j,
              suffix: T,
            };
          }
          l = l || [];
          var A = new Array(l.length);
          for (m = 0; m < l.length; m++) {
            var I = l[m];
            A[m] = { type: 0, target: I[0], eventName: I[1], propName: null };
          }
          var P,
            O = (a = a || []).map(function (e) {
              var t = e[1],
                n = En(e[0]);
              return [n[0], n[1], t];
            });
          return (
            (h = (function (e) {
              if (e && e.id === Xt) {
                var t =
                  (null != e.encapsulation && e.encapsulation !== p.None) ||
                  e.styles.length ||
                  Object.keys(e.data).length;
                e.id = t ? "c" + nn++ : en;
              }
              return e && e.id === en && (e = null), e || null;
            })(h)),
            c && (t |= 33554432),
            {
              nodeIndex: -1,
              parent: null,
              renderParent: null,
              bindingIndex: -1,
              outputIndex: -1,
              checkIndex: e,
              flags: (t |= 1),
              childFlags: 0,
              directChildFlags: 0,
              childMatchedQueries: 0,
              matchedQueries: d,
              matchedQueryIds: _,
              references: y,
              ngContentIndex: r,
              childCount: o,
              bindings: g,
              bindingFlags: jn(g),
              outputs: A,
              element: {
                ns: v,
                name: b,
                attrs: O,
                template: null,
                componentProvider: null,
                componentView: c || null,
                componentRendererType: h,
                publicProviders: null,
                allProviders: null,
                handleEvent: u || $t,
              },
              provider: null,
              text: null,
              query: null,
              ngContent: null,
            }
          );
        }
        function On(e, t, n) {
          var r,
            o = n.element,
            i = e.root.selectorOrNode,
            a = e.renderer;
          if (e.parent || !i) {
            r = o.name ? a.createElement(o.name, o.ns) : a.createComment("");
            var s = vn(e, t, n);
            s && a.appendChild(s, r);
          } else r = a.selectRootElement(i);
          if (o.attrs)
            for (var l = 0; l < o.attrs.length; l++) {
              var u = o.attrs[l];
              a.setAttribute(r, u[1], u[2], u[0]);
            }
          return r;
        }
        function Mn(e, t, n, r) {
          for (var o = 0; o < n.outputs.length; o++) {
            var i = n.outputs[o],
              a = Nn(
                e,
                n.nodeIndex,
                ((p = i.eventName), (c = i.target) ? c + ":" + p : p)
              ),
              s = i.target,
              l = e;
            "component" === i.target && ((s = null), (l = t));
            var u = l.renderer.listen(s || r, i.eventName, a);
            e.disposables[n.outputIndex + o] = u;
          }
          var c, p;
        }
        function Nn(e, t, n) {
          return function (r) {
            return un(e, t, n, r);
          };
        }
        function Rn(e, t, n, r) {
          if (!on(e, t, n, r)) return !1;
          var o = t.bindings[n],
            i = Ht(e, t.nodeIndex),
            a = i.renderElement,
            s = o.name;
          switch (15 & o.flags) {
            case 1:
              !(function (e, t, n, r, o, i) {
                var a = t.securityContext,
                  s = a ? e.root.sanitizer.sanitize(a, i) : i;
                s = null != s ? s.toString() : null;
                var l = e.renderer;
                null != i
                  ? l.setAttribute(n, o, s, r)
                  : l.removeAttribute(n, o, r);
              })(e, o, a, o.ns, s, r);
              break;
            case 2:
              !(function (e, t, n, r) {
                var o = e.renderer;
                r ? o.addClass(t, n) : o.removeClass(t, n);
              })(e, a, s, r);
              break;
            case 4:
              !(function (e, t, n, r, o) {
                var i = e.root.sanitizer.sanitize(Bt.STYLE, o);
                if (null != i) {
                  i = i.toString();
                  var a = t.suffix;
                  null != a && (i += a);
                } else i = null;
                var s = e.renderer;
                null != i ? s.setStyle(n, r, i) : s.removeStyle(n, r);
              })(e, o, a, s, r);
              break;
            case 8:
              !(function (e, t, n, r, o) {
                var i = t.securityContext,
                  a = i ? e.root.sanitizer.sanitize(i, o) : o;
                e.renderer.setProperty(n, r, a);
              })(
                33554432 & t.flags && 32 & o.flags ? i.componentView : e,
                o,
                a,
                s,
                r
              );
          }
          return !0;
        }
        var Dn = new Object(),
          Bn = Yt(P),
          Vn = Yt(we);
        function zn(e, t, n, r) {
          return (
            (n = j(n)),
            { index: -1, deps: _n(r, S(t)), flags: e, token: t, value: n }
          );
        }
        function Fn(e) {
          for (var t = {}, n = 0; n < e.length; n++) {
            var r = e[n];
            (r.index = n), (t[Yt(r.token)] = r);
          }
          return { factory: null, providersByKey: t, providers: e };
        }
        function Ln(e, t, n) {
          if ((void 0 === n && (n = P.THROW_IF_NOT_FOUND), 8 & t.flags))
            return t.token;
          if ((2 & t.flags && (n = null), 1 & t.flags))
            return e._parent.get(t.token, n);
          var r = t.tokenKey;
          switch (r) {
            case Bn:
            case Vn:
              return e;
          }
          var o = e._def.providersByKey[r];
          if (o) {
            var i = e._providers[o.index];
            return (
              void 0 === i && (i = e._providers[o.index] = Hn(e, o)),
              i === Dn ? void 0 : i
            );
          }
          return e._parent.get(t.token, n);
        }
        function Hn(e, t) {
          var n;
          switch (201347067 & t.flags) {
            case 512:
              n = (function (e, t, n) {
                var r = n.length;
                switch (r) {
                  case 0:
                    return new t();
                  case 1:
                    return new t(Ln(e, n[0]));
                  case 2:
                    return new t(Ln(e, n[0]), Ln(e, n[1]));
                  case 3:
                    return new t(Ln(e, n[0]), Ln(e, n[1]), Ln(e, n[2]));
                  default:
                    for (var o = new Array(r), i = 0; i < r; i++)
                      o[i] = Ln(e, n[i]);
                    return new (t.bind.apply(t, [void 0].concat(o)))();
                }
              })(e, t.value, t.deps);
              break;
            case 1024:
              n = (function (e, t, n) {
                var r = n.length;
                switch (r) {
                  case 0:
                    return t();
                  case 1:
                    return t(Ln(e, n[0]));
                  case 2:
                    return t(Ln(e, n[0]), Ln(e, n[1]));
                  case 3:
                    return t(Ln(e, n[0]), Ln(e, n[1]), Ln(e, n[2]));
                  default:
                    for (var o = Array(r), i = 0; i < r; i++)
                      o[i] = Ln(e, n[i]);
                    return t.apply(void 0, o);
                }
              })(e, t.value, t.deps);
              break;
            case 2048:
              n = Ln(e, t.deps[0]);
              break;
            case 256:
              n = t.value;
          }
          return void 0 === n ? Dn : n;
        }
        function Un(e, t) {
          var n = e.viewContainer._embeddedViews;
          if (((null == t || t >= n.length) && (t = n.length - 1), t < 0))
            return null;
          var r = n[t];
          return (
            (r.viewContainerParent = null),
            Zn(n, t),
            qt.dirtyParentQueries(r),
            Gn(r),
            r
          );
        }
        function Wn(e, t, n) {
          var r = t ? hn(t, t.def.lastRenderRootNode) : e.renderElement;
          mn(n, 2, n.renderer.parentNode(r), n.renderer.nextSibling(r), void 0);
        }
        function Gn(e) {
          mn(e, 3, null, null, void 0);
        }
        function qn(e, t, n) {
          t >= e.length ? e.push(n) : e.splice(t, 0, n);
        }
        function Zn(e, t) {
          t >= e.length - 1 ? e.pop() : e.splice(t, 1);
        }
        var Qn = new Object();
        function Kn(e, t, n, r, o, i) {
          return new $n(e, t, n, r, o, i);
        }
        var $n = (function (e) {
            function t(t, n, r, o, i, a) {
              var s = e.call(this) || this;
              return (
                (s.selector = t),
                (s.componentType = n),
                (s._inputs = o),
                (s._outputs = i),
                (s.ngContentSelectors = a),
                (s.viewDefFactory = r),
                s
              );
            }
            return (
              Object(r.b)(t, e),
              Object.defineProperty(t.prototype, "inputs", {
                get: function () {
                  var e = [],
                    t = this._inputs;
                  for (var n in t) e.push({ propName: n, templateName: t[n] });
                  return e;
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "outputs", {
                get: function () {
                  var e = [];
                  for (var t in this._outputs)
                    e.push({ propName: t, templateName: this._outputs[t] });
                  return e;
                },
                enumerable: !0,
                configurable: !0,
              }),
              (t.prototype.create = function (e, t, n, r) {
                if (!r) throw new Error("ngModule should be provided");
                var o = gn(this.viewDefFactory),
                  i = o.nodes[0].element.componentProvider.nodeIndex,
                  a = qt.createRootView(e, t || [], n, o, r, Qn),
                  s = Ut(a, i).instance;
                return (
                  n &&
                    a.renderer.setAttribute(
                      Ht(a, 0).renderElement,
                      "ng-version",
                      f.full
                    ),
                  new Jn(a, new tr(a), s)
                );
              }),
              t
            );
          })(he),
          Jn = (function (e) {
            function t(t, n, r) {
              var o = e.call(this) || this;
              return (
                (o._view = t),
                (o._viewRef = n),
                (o._component = r),
                (o._elDef = o._view.def.nodes[0]),
                (o.hostView = n),
                (o.changeDetectorRef = n),
                (o.instance = r),
                o
              );
            }
            return (
              Object(r.b)(t, e),
              Object.defineProperty(t.prototype, "location", {
                get: function () {
                  return new et(
                    Ht(this._view, this._elDef.nodeIndex).renderElement
                  );
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "injector", {
                get: function () {
                  return new ir(this._view, this._elDef);
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "componentType", {
                get: function () {
                  return this._component.constructor;
                },
                enumerable: !0,
                configurable: !0,
              }),
              (t.prototype.destroy = function () {
                this._viewRef.destroy();
              }),
              (t.prototype.onDestroy = function (e) {
                this._viewRef.onDestroy(e);
              }),
              t
            );
          })(function () {});
        function Yn(e, t, n) {
          return new Xn(e, t, n);
        }
        var Xn = (function () {
          function e(e, t, n) {
            (this._view = e),
              (this._elDef = t),
              (this._data = n),
              (this._embeddedViews = []);
          }
          return (
            Object.defineProperty(e.prototype, "element", {
              get: function () {
                return new et(this._data.renderElement);
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "injector", {
              get: function () {
                return new ir(this._view, this._elDef);
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "parentInjector", {
              get: function () {
                for (var e = this._view, t = this._elDef.parent; !t && e; )
                  (t = pn(e)), (e = e.parent);
                return e ? new ir(e, t) : new ir(this._view, null);
              },
              enumerable: !0,
              configurable: !0,
            }),
            (e.prototype.clear = function () {
              for (var e = this._embeddedViews.length - 1; e >= 0; e--) {
                var t = Un(this._data, e);
                qt.destroyView(t);
              }
            }),
            (e.prototype.get = function (e) {
              var t = this._embeddedViews[e];
              if (t) {
                var n = new tr(t);
                return n.attachToViewContainerRef(this), n;
              }
              return null;
            }),
            Object.defineProperty(e.prototype, "length", {
              get: function () {
                return this._embeddedViews.length;
              },
              enumerable: !0,
              configurable: !0,
            }),
            (e.prototype.createEmbeddedView = function (e, t, n) {
              var r = e.createEmbeddedView(t || {});
              return this.insert(r, n), r;
            }),
            (e.prototype.createComponent = function (e, t, n, r, o) {
              var i = n || this.parentInjector;
              o || e instanceof me || (o = i.get(we));
              var a = e.create(i, r, void 0, o);
              return this.insert(a.hostView, t), a;
            }),
            (e.prototype.insert = function (e, t) {
              if (e.destroyed)
                throw new Error(
                  "Cannot insert a destroyed View in a ViewContainer!"
                );
              var n,
                r,
                o,
                i,
                a = e;
              return (
                (o = a._view),
                (i = (n = this._data).viewContainer._embeddedViews),
                (null !== (r = t) && void 0 !== r) || (r = i.length),
                (o.viewContainerParent = this._view),
                qn(i, r, o),
                (function (e, t) {
                  var n = cn(t);
                  if (n && n !== e && !(16 & t.state)) {
                    t.state |= 16;
                    var r = n.template._projectedViews;
                    r || (r = n.template._projectedViews = []),
                      r.push(t),
                      (function (e, n) {
                        if (!(4 & n.flags)) {
                          (t.parent.def.nodeFlags |= 4), (n.flags |= 4);
                          for (var r = n.parent; r; )
                            (r.childFlags |= 4), (r = r.parent);
                        }
                      })(0, t.parentNodeDef);
                  }
                })(n, o),
                qt.dirtyParentQueries(o),
                Wn(n, r > 0 ? i[r - 1] : null, o),
                a.attachToViewContainerRef(this),
                e
              );
            }),
            (e.prototype.move = function (e, t) {
              if (e.destroyed)
                throw new Error(
                  "Cannot move a destroyed View in a ViewContainer!"
                );
              var n,
                r,
                o,
                i,
                a,
                s = this._embeddedViews.indexOf(e._view);
              return (
                (o = t),
                (a = (i = (n = this._data).viewContainer._embeddedViews)[
                  (r = s)
                ]),
                Zn(i, r),
                null == o && (o = i.length),
                qn(i, o, a),
                qt.dirtyParentQueries(a),
                Gn(a),
                Wn(n, o > 0 ? i[o - 1] : null, a),
                e
              );
            }),
            (e.prototype.indexOf = function (e) {
              return this._embeddedViews.indexOf(e._view);
            }),
            (e.prototype.remove = function (e) {
              var t = Un(this._data, e);
              t && qt.destroyView(t);
            }),
            (e.prototype.detach = function (e) {
              var t = Un(this._data, e);
              return t ? new tr(t) : null;
            }),
            e
          );
        })();
        function er(e) {
          return new tr(e);
        }
        var tr = (function () {
          function e(e) {
            (this._view = e),
              (this._viewContainerRef = null),
              (this._appRef = null);
          }
          return (
            Object.defineProperty(e.prototype, "rootNodes", {
              get: function () {
                return mn(this._view, 0, void 0, void 0, (e = [])), e;
                var e;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "context", {
              get: function () {
                return this._view.context;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "destroyed", {
              get: function () {
                return 0 != (128 & this._view.state);
              },
              enumerable: !0,
              configurable: !0,
            }),
            (e.prototype.markForCheck = function () {
              sn(this._view);
            }),
            (e.prototype.detach = function () {
              this._view.state &= -5;
            }),
            (e.prototype.detectChanges = function () {
              var e = this._view.root.rendererFactory;
              e.begin && e.begin();
              try {
                qt.checkAndUpdateView(this._view);
              } finally {
                e.end && e.end();
              }
            }),
            (e.prototype.checkNoChanges = function () {
              qt.checkNoChangesView(this._view);
            }),
            (e.prototype.reattach = function () {
              this._view.state |= 4;
            }),
            (e.prototype.onDestroy = function (e) {
              this._view.disposables || (this._view.disposables = []),
                this._view.disposables.push(e);
            }),
            (e.prototype.destroy = function () {
              this._appRef
                ? this._appRef.detachView(this)
                : this._viewContainerRef &&
                  this._viewContainerRef.detach(
                    this._viewContainerRef.indexOf(this)
                  ),
                qt.destroyView(this._view);
            }),
            (e.prototype.detachFromAppRef = function () {
              (this._appRef = null),
                Gn(this._view),
                qt.dirtyParentQueries(this._view);
            }),
            (e.prototype.attachToAppRef = function (e) {
              if (this._viewContainerRef)
                throw new Error(
                  "This view is already attached to a ViewContainer!"
                );
              this._appRef = e;
            }),
            (e.prototype.attachToViewContainerRef = function (e) {
              if (this._appRef)
                throw new Error(
                  "This view is already attached directly to the ApplicationRef!"
                );
              this._viewContainerRef = e;
            }),
            e
          );
        })();
        function nr(e, t) {
          return new rr(e, t);
        }
        var rr = (function (e) {
          function t(t, n) {
            var r = e.call(this) || this;
            return (r._parentView = t), (r._def = n), r;
          }
          return (
            Object(r.b)(t, e),
            (t.prototype.createEmbeddedView = function (e) {
              return new tr(
                qt.createEmbeddedView(
                  this._parentView,
                  this._def,
                  this._def.element.template,
                  e
                )
              );
            }),
            Object.defineProperty(t.prototype, "elementRef", {
              get: function () {
                return new et(
                  Ht(this._parentView, this._def.nodeIndex).renderElement
                );
              },
              enumerable: !0,
              configurable: !0,
            }),
            t
          );
        })(nt);
        function or(e, t) {
          return new ir(e, t);
        }
        var ir = (function () {
          function e(e, t) {
            (this.view = e), (this.elDef = t);
          }
          return (
            (e.prototype.get = function (e, t) {
              return (
                void 0 === t && (t = P.THROW_IF_NOT_FOUND),
                qt.resolveDep(
                  this.view,
                  this.elDef,
                  !!this.elDef && 0 != (33554432 & this.elDef.flags),
                  { flags: 0, token: e, tokenKey: Yt(e) },
                  t
                )
              );
            }),
            e
          );
        })();
        function ar(e, t) {
          var n = e.def.nodes[t];
          if (1 & n.flags) {
            var r = Ht(e, n.nodeIndex);
            return n.element.template ? r.template : r.renderElement;
          }
          if (2 & n.flags) return Lt(e, n.nodeIndex).renderText;
          if (20240 & n.flags) return Ut(e, n.nodeIndex).instance;
          throw new Error("Illegal state: read nodeValue for node index " + t);
        }
        function sr(e) {
          return new lr(e.renderer);
        }
        var lr = (function () {
          function e(e) {
            this.delegate = e;
          }
          return (
            (e.prototype.selectRootElement = function (e) {
              return this.delegate.selectRootElement(e);
            }),
            (e.prototype.createElement = function (e, t) {
              var n = En(t),
                r = this.delegate.createElement(n[1], n[0]);
              return e && this.delegate.appendChild(e, r), r;
            }),
            (e.prototype.createViewRoot = function (e) {
              return e;
            }),
            (e.prototype.createTemplateAnchor = function (e) {
              var t = this.delegate.createComment("");
              return e && this.delegate.appendChild(e, t), t;
            }),
            (e.prototype.createText = function (e, t) {
              var n = this.delegate.createText(t);
              return e && this.delegate.appendChild(e, n), n;
            }),
            (e.prototype.projectNodes = function (e, t) {
              for (var n = 0; n < t.length; n++)
                this.delegate.appendChild(e, t[n]);
            }),
            (e.prototype.attachViewAfter = function (e, t) {
              for (
                var n = this.delegate.parentNode(e),
                  r = this.delegate.nextSibling(e),
                  o = 0;
                o < t.length;
                o++
              )
                this.delegate.insertBefore(n, t[o], r);
            }),
            (e.prototype.detachView = function (e) {
              for (var t = 0; t < e.length; t++) {
                var n = e[t],
                  r = this.delegate.parentNode(n);
                this.delegate.removeChild(r, n);
              }
            }),
            (e.prototype.destroyView = function (e, t) {
              for (var n = 0; n < t.length; n++)
                this.delegate.destroyNode(t[n]);
            }),
            (e.prototype.listen = function (e, t, n) {
              return this.delegate.listen(e, t, n);
            }),
            (e.prototype.listenGlobal = function (e, t, n) {
              return this.delegate.listen(e, t, n);
            }),
            (e.prototype.setElementProperty = function (e, t, n) {
              this.delegate.setProperty(e, t, n);
            }),
            (e.prototype.setElementAttribute = function (e, t, n) {
              var r = En(t),
                o = r[0],
                i = r[1];
              null != n
                ? this.delegate.setAttribute(e, i, n, o)
                : this.delegate.removeAttribute(e, i, o);
            }),
            (e.prototype.setBindingDebugInfo = function (e, t, n) {}),
            (e.prototype.setElementClass = function (e, t, n) {
              n
                ? this.delegate.addClass(e, t)
                : this.delegate.removeClass(e, t);
            }),
            (e.prototype.setElementStyle = function (e, t, n) {
              null != n
                ? this.delegate.setStyle(e, t, n)
                : this.delegate.removeStyle(e, t);
            }),
            (e.prototype.invokeElementMethod = function (e, t, n) {
              e[t].apply(e, n);
            }),
            (e.prototype.setText = function (e, t) {
              this.delegate.setValue(e, t);
            }),
            (e.prototype.animate = function () {
              throw new Error("Renderer.animate is no longer supported!");
            }),
            e
          );
        })();
        function ur(e, t, n, r) {
          return new cr(e, t, n, r);
        }
        var cr = (function () {
            function e(e, t, n, r) {
              (this._moduleType = e),
                (this._parent = t),
                (this._bootstrapComponents = n),
                (this._def = r),
                (this._destroyListeners = []),
                (this._destroyed = !1),
                (this.injector = this),
                (function (e) {
                  for (
                    var t = e._def,
                      n = (e._providers = new Array(t.providers.length)),
                      r = 0;
                    r < t.providers.length;
                    r++
                  ) {
                    var o = t.providers[r];
                    4096 & o.flags || (n[r] = Hn(e, o));
                  }
                })(this);
            }
            return (
              (e.prototype.get = function (e, t) {
                return (
                  void 0 === t && (t = P.THROW_IF_NOT_FOUND),
                  Ln(this, { token: e, tokenKey: Yt(e), flags: 0 }, t)
                );
              }),
              Object.defineProperty(e.prototype, "instance", {
                get: function () {
                  return this.get(this._moduleType);
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(e.prototype, "componentFactoryResolver", {
                get: function () {
                  return this.get(be);
                },
                enumerable: !0,
                configurable: !0,
              }),
              (e.prototype.destroy = function () {
                if (this._destroyed)
                  throw new Error(
                    "The ng module " +
                      S(this.instance.constructor) +
                      " has already been destroyed."
                  );
                (this._destroyed = !0),
                  (function (e, t) {
                    for (var n = e._def, r = 0; r < n.providers.length; r++)
                      if (131072 & n.providers[r].flags) {
                        var o = e._providers[r];
                        o && o !== Dn && o.ngOnDestroy();
                      }
                  })(this),
                  this._destroyListeners.forEach(function (e) {
                    return e();
                  });
              }),
              (e.prototype.onDestroy = function (e) {
                this._destroyListeners.push(e);
              }),
              e
            );
          })(),
          pr = Yt(function () {}),
          hr = Yt(Xe),
          fr = Yt(et),
          dr = Yt(rt),
          yr = Yt(nt),
          _r = Yt(function () {}),
          vr = Yt(P);
        function br(e, t, n, r, o, i, a, s) {
          var l = [];
          if (a)
            for (var u in a) {
              var c = a[u];
              l[c[0]] = {
                flags: 8,
                name: u,
                nonMinifiedName: c[1],
                ns: null,
                securityContext: null,
                suffix: null,
              };
            }
          var p = [];
          if (s)
            for (var h in s)
              p.push({ type: 1, propName: h, target: null, eventName: s[h] });
          return mr(e, (t |= 16384), n, r, o, o, i, l, p);
        }
        function gr(e, t, n, r, o) {
          return mr(-1, e, t, 0, n, r, o);
        }
        function mr(e, t, n, r, o, i, a, s, l) {
          var u = yn(n),
            c = u.matchedQueries,
            p = u.references,
            h = u.matchedQueryIds;
          l || (l = []), s || (s = []), (i = j(i));
          var f = _n(a, S(o));
          return {
            nodeIndex: -1,
            parent: null,
            renderParent: null,
            bindingIndex: -1,
            outputIndex: -1,
            checkIndex: e,
            flags: t,
            childFlags: 0,
            directChildFlags: 0,
            childMatchedQueries: 0,
            matchedQueries: c,
            matchedQueryIds: h,
            references: p,
            ngContentIndex: -1,
            childCount: r,
            bindings: s,
            bindingFlags: jn(s),
            outputs: l,
            element: null,
            provider: { token: o, value: i, deps: f },
            text: null,
            query: null,
            ngContent: null,
          };
        }
        function wr(e, t) {
          return Sr(e, t);
        }
        function Cr(e, t) {
          for (var n = e; n.parent && !fn(n); ) n = n.parent;
          return Er(n.parent, pn(n), !0, t.provider.value, t.provider.deps);
        }
        function xr(e, t) {
          var n = Er(
            e,
            t.parent,
            (32768 & t.flags) > 0,
            t.provider.value,
            t.provider.deps
          );
          if (t.outputs.length)
            for (var r = 0; r < t.outputs.length; r++) {
              var o = t.outputs[r],
                i = n[o.propName].subscribe(
                  kr(e, t.parent.nodeIndex, o.eventName)
                );
              e.disposables[t.outputIndex + r] = i.unsubscribe.bind(i);
            }
          return n;
        }
        function kr(e, t, n) {
          return function (r) {
            return un(e, t, n, r);
          };
        }
        function Sr(e, t) {
          var n = (8192 & t.flags) > 0,
            r = t.provider;
          switch (201347067 & t.flags) {
            case 512:
              return Er(e, t.parent, n, r.value, r.deps);
            case 1024:
              return (function (e, t, n, r, o) {
                var i = o.length;
                switch (i) {
                  case 0:
                    return r();
                  case 1:
                    return r(Tr(e, t, n, o[0]));
                  case 2:
                    return r(Tr(e, t, n, o[0]), Tr(e, t, n, o[1]));
                  case 3:
                    return r(
                      Tr(e, t, n, o[0]),
                      Tr(e, t, n, o[1]),
                      Tr(e, t, n, o[2])
                    );
                  default:
                    for (var a = Array(i), s = 0; s < i; s++)
                      a[s] = Tr(e, t, n, o[s]);
                    return r.apply(void 0, a);
                }
              })(e, t.parent, n, r.value, r.deps);
            case 2048:
              return Tr(e, t.parent, n, r.deps[0]);
            case 256:
              return r.value;
          }
        }
        function Er(e, t, n, r, o) {
          var i = o.length;
          switch (i) {
            case 0:
              return new r();
            case 1:
              return new r(Tr(e, t, n, o[0]));
            case 2:
              return new r(Tr(e, t, n, o[0]), Tr(e, t, n, o[1]));
            case 3:
              return new r(
                Tr(e, t, n, o[0]),
                Tr(e, t, n, o[1]),
                Tr(e, t, n, o[2])
              );
            default:
              for (var a = new Array(i), s = 0; s < i; s++)
                a[s] = Tr(e, t, n, o[s]);
              return new (r.bind.apply(r, [void 0].concat(a)))();
          }
        }
        var jr = {};
        function Tr(e, t, n, r, o) {
          if ((void 0 === o && (o = P.THROW_IF_NOT_FOUND), 8 & r.flags))
            return r.token;
          var i = e;
          2 & r.flags && (o = null);
          var a = r.tokenKey;
          for (
            a === _r && (n = !(!t || !t.element.componentView)),
              t && 1 & r.flags && ((n = !1), (t = t.parent));
            e;

          ) {
            if (t)
              switch (a) {
                case pr:
                  return sr(Ar(e, t, n));
                case hr:
                  return Ar(e, t, n).renderer;
                case fr:
                  return new et(Ht(e, t.nodeIndex).renderElement);
                case dr:
                  return Ht(e, t.nodeIndex).viewContainer;
                case yr:
                  if (t.element.template) return Ht(e, t.nodeIndex).template;
                  break;
                case _r:
                  return er(Ar(e, t, n));
                case vr:
                  return or(e, t);
                default:
                  var s = (
                    n ? t.element.allProviders : t.element.publicProviders
                  )[a];
                  if (s) {
                    var l = Ut(e, s.nodeIndex);
                    return (
                      l ||
                        ((l = { instance: Sr(e, s) }),
                        (e.nodes[s.nodeIndex] = l)),
                      l.instance
                    );
                  }
              }
            (n = fn(e)), (t = pn(e)), (e = e.parent);
          }
          var u = i.root.injector.get(r.token, jr);
          return u !== jr || o === jr
            ? u
            : i.root.ngModule.injector.get(r.token, o);
        }
        function Ar(e, t, n) {
          var r;
          if (n) r = Ht(e, t.nodeIndex).componentView;
          else for (r = e; r.parent && !fn(r); ) r = r.parent;
          return r;
        }
        function Ir(e, t, n, r, o, i) {
          if (32768 & n.flags) {
            var a = Ht(e, n.parent.nodeIndex).componentView;
            2 & a.def.flags && (a.state |= 8);
          }
          if (((t.instance[n.bindings[r].name] = o), 524288 & n.flags)) {
            i = i || {};
            var s = ht.unwrap(e.oldValues[n.bindingIndex + r]);
            i[n.bindings[r].nonMinifiedName] = new ft(s, o, 0 != (2 & e.state));
          }
          return (e.oldValues[n.bindingIndex + r] = o), i;
        }
        function Pr(e, t) {
          if (e.def.nodeFlags & t)
            for (var n = e.def.nodes, r = 0, o = 0; o < n.length; o++) {
              var i = n[o],
                a = i.parent;
              for (
                !a && i.flags & t && Mr(e, o, i.flags & t, r++),
                  0 == (i.childFlags & t) && (o += i.childCount);
                a && 1 & a.flags && o === a.nodeIndex + a.childCount;

              )
                a.directChildFlags & t && (r = Or(e, a, t, r)), (a = a.parent);
            }
        }
        function Or(e, t, n, r) {
          for (var o = t.nodeIndex + 1; o <= t.nodeIndex + t.childCount; o++) {
            var i = e.def.nodes[o];
            i.flags & n && Mr(e, o, i.flags & n, r++), (o += i.childCount);
          }
          return r;
        }
        function Mr(e, t, n, r) {
          var o = Ut(e, t);
          if (o) {
            var i = o.instance;
            i &&
              (qt.setCurrentNode(e, t),
              1048576 & n && Ft(e, 512, r) && i.ngAfterContentInit(),
              2097152 & n && i.ngAfterContentChecked(),
              4194304 & n && Ft(e, 768, r) && i.ngAfterViewInit(),
              8388608 & n && i.ngAfterViewChecked(),
              131072 & n && i.ngOnDestroy());
          }
        }
        function Nr(e) {
          for (var t = e.def.nodeMatchedQueries; e.parent && dn(e); ) {
            var n = e.parentNodeDef;
            e = e.parent;
            for (var r = n.nodeIndex + n.childCount, o = 0; o <= r; o++)
              67108864 & (i = e.def.nodes[o]).flags &&
                536870912 & i.flags &&
                (i.query.filterId & t) === i.query.filterId &&
                Gt(e, o).setDirty(),
                (!(1 & i.flags && o + i.childCount < n.nodeIndex) &&
                  67108864 & i.childFlags &&
                  536870912 & i.childFlags) ||
                  (o += i.childCount);
          }
          if (134217728 & e.def.nodeFlags)
            for (o = 0; o < e.def.nodes.length; o++) {
              var i;
              134217728 & (i = e.def.nodes[o]).flags &&
                536870912 & i.flags &&
                Gt(e, o).setDirty(),
                (o += i.childCount);
            }
        }
        function Rr(e, t) {
          var n = Gt(e, t.nodeIndex);
          if (n.dirty) {
            var r,
              o = void 0;
            if (67108864 & t.flags) {
              var i = t.parent.parent;
              (o = Dr(e, i.nodeIndex, i.nodeIndex + i.childCount, t.query, [])),
                (r = Ut(e, t.parent.nodeIndex).instance);
            } else
              134217728 & t.flags &&
                ((o = Dr(e, 0, e.def.nodes.length - 1, t.query, [])),
                (r = e.component));
            n.reset(o);
            for (var a = t.query.bindings, s = !1, l = 0; l < a.length; l++) {
              var u = a[l],
                c = void 0;
              switch (u.bindingType) {
                case 0:
                  c = n.first;
                  break;
                case 1:
                  (c = n), (s = !0);
              }
              r[u.propName] = c;
            }
            s && n.notifyOnChanges();
          }
        }
        function Dr(e, t, n, r, o) {
          for (var i = t; i <= n; i++) {
            var a = e.def.nodes[i],
              s = a.matchedQueries[r.id];
            if (
              (null != s && o.push(Br(e, a, s)),
              1 & a.flags &&
                a.element.template &&
                (a.element.template.nodeMatchedQueries & r.filterId) ===
                  r.filterId)
            ) {
              var l = Ht(e, i);
              if (
                ((a.childMatchedQueries & r.filterId) === r.filterId &&
                  (Dr(e, i + 1, i + a.childCount, r, o), (i += a.childCount)),
                16777216 & a.flags)
              )
                for (
                  var u = l.viewContainer._embeddedViews, c = 0;
                  c < u.length;
                  c++
                ) {
                  var p = u[c],
                    h = cn(p);
                  h && h === l && Dr(p, 0, p.def.nodes.length - 1, r, o);
                }
              var f = l.template._projectedViews;
              if (f)
                for (c = 0; c < f.length; c++) {
                  var d = f[c];
                  Dr(d, 0, d.def.nodes.length - 1, r, o);
                }
            }
            (a.childMatchedQueries & r.filterId) !== r.filterId &&
              (i += a.childCount);
          }
          return o;
        }
        function Br(e, t, n) {
          if (null != n)
            switch (n) {
              case 1:
                return Ht(e, t.nodeIndex).renderElement;
              case 0:
                return new et(Ht(e, t.nodeIndex).renderElement);
              case 2:
                return Ht(e, t.nodeIndex).template;
              case 3:
                return Ht(e, t.nodeIndex).viewContainer;
              case 4:
                return Ut(e, t.nodeIndex).instance;
            }
        }
        function Vr(e, t, n) {
          var r = vn(e, t, n);
          r && Cn(e, n.ngContent.index, 1, r, null, void 0);
        }
        function zr(e, t) {
          return (function (e, t, n) {
            for (var r = new Array(n.length), o = 0; o < n.length; o++) {
              var i = n[o];
              r[o] = {
                flags: 8,
                name: i,
                ns: null,
                nonMinifiedName: i,
                securityContext: null,
                suffix: null,
              };
            }
            return {
              nodeIndex: -1,
              parent: null,
              renderParent: null,
              bindingIndex: -1,
              outputIndex: -1,
              checkIndex: t,
              flags: 32,
              childFlags: 0,
              directChildFlags: 0,
              childMatchedQueries: 0,
              matchedQueries: {},
              matchedQueryIds: 0,
              references: {},
              ngContentIndex: -1,
              childCount: 0,
              bindings: r,
              bindingFlags: jn(r),
              outputs: [],
              element: null,
              provider: null,
              text: null,
              query: null,
              ngContent: null,
            };
          })(0, e, new Array(t));
        }
        function Fr(e, t, n) {
          for (var r = new Array(n.length - 1), o = 1; o < n.length; o++)
            r[o - 1] = {
              flags: 8,
              name: null,
              ns: null,
              nonMinifiedName: null,
              securityContext: null,
              suffix: n[o],
            };
          return {
            nodeIndex: -1,
            parent: null,
            renderParent: null,
            bindingIndex: -1,
            outputIndex: -1,
            checkIndex: e,
            flags: 2,
            childFlags: 0,
            directChildFlags: 0,
            childMatchedQueries: 0,
            matchedQueries: {},
            matchedQueryIds: 0,
            references: {},
            ngContentIndex: t,
            childCount: 0,
            bindings: r,
            bindingFlags: 8,
            outputs: [],
            element: null,
            provider: null,
            text: { prefix: n[0] },
            query: null,
            ngContent: null,
          };
        }
        function Lr(e, t, n) {
          var r,
            o = e.renderer;
          r = o.createText(n.text.prefix);
          var i = vn(e, t, n);
          return i && o.appendChild(i, r), { renderText: r };
        }
        function Hr(e, t) {
          return (null != e ? e.toString() : "") + t.suffix;
        }
        function Ur(e, t, n, r) {
          for (
            var o = 0,
              i = 0,
              a = 0,
              s = 0,
              l = 0,
              u = null,
              c = null,
              p = !1,
              h = !1,
              f = null,
              d = 0;
            d < t.length;
            d++
          ) {
            var y = t[d];
            if (
              ((y.nodeIndex = d),
              (y.parent = u),
              (y.bindingIndex = o),
              (y.outputIndex = i),
              (y.renderParent = c),
              (a |= y.flags),
              (l |= y.matchedQueryIds),
              y.element)
            ) {
              var _ = y.element;
              (_.publicProviders = u
                ? u.element.publicProviders
                : Object.create(null)),
                (_.allProviders = _.publicProviders),
                (p = !1),
                (h = !1),
                y.element.template &&
                  (l |= y.element.template.nodeMatchedQueries);
            }
            if (
              (Gr(u, y, t.length),
              (o += y.bindings.length),
              (i += y.outputs.length),
              !c && 3 & y.flags && (f = y),
              20224 & y.flags)
            ) {
              p ||
                ((p = !0),
                (u.element.publicProviders = Object.create(
                  u.element.publicProviders
                )),
                (u.element.allProviders = u.element.publicProviders));
              var v = 0 != (32768 & y.flags);
              0 == (8192 & y.flags) || v
                ? (u.element.publicProviders[Yt(y.provider.token)] = y)
                : (h ||
                    ((h = !0),
                    (u.element.allProviders = Object.create(
                      u.element.publicProviders
                    ))),
                  (u.element.allProviders[Yt(y.provider.token)] = y)),
                v && (u.element.componentProvider = y);
            }
            if (
              (u
                ? ((u.childFlags |= y.flags),
                  (u.directChildFlags |= y.flags),
                  (u.childMatchedQueries |= y.matchedQueryIds),
                  y.element &&
                    y.element.template &&
                    (u.childMatchedQueries |=
                      y.element.template.nodeMatchedQueries))
                : (s |= y.flags),
              y.childCount > 0)
            )
              (u = y), Wr(y) || (c = y);
            else
              for (; u && d === u.nodeIndex + u.childCount; ) {
                var b = u.parent;
                b &&
                  ((b.childFlags |= u.childFlags),
                  (b.childMatchedQueries |= u.childMatchedQueries)),
                  (c = (u = b) && Wr(u) ? u.renderParent : u);
              }
          }
          return {
            factory: null,
            nodeFlags: a,
            rootNodeFlags: s,
            nodeMatchedQueries: l,
            flags: e,
            nodes: t,
            updateDirectives: n || $t,
            updateRenderer: r || $t,
            handleEvent: function (e, n, r, o) {
              return t[n].element.handleEvent(e, r, o);
            },
            bindingCount: o,
            outputCount: i,
            lastRenderRootNode: f,
          };
        }
        function Wr(e) {
          return 0 != (1 & e.flags) && null === e.element.name;
        }
        function Gr(e, t, n) {
          var r = t.element && t.element.template;
          if (r) {
            if (!r.lastRenderRootNode)
              throw new Error(
                "Illegal State: Embedded templates without nodes are not allowed!"
              );
            if (r.lastRenderRootNode && 16777216 & r.lastRenderRootNode.flags)
              throw new Error(
                "Illegal State: Last root node of a template can't have embedded views, at index " +
                  t.nodeIndex +
                  "!"
              );
          }
          if (20224 & t.flags && 0 == (1 & (e ? e.flags : 0)))
            throw new Error(
              "Illegal State: StaticProvider/Directive nodes need to be children of elements or anchors, at index " +
                t.nodeIndex +
                "!"
            );
          if (t.query) {
            if (67108864 & t.flags && (!e || 0 == (16384 & e.flags)))
              throw new Error(
                "Illegal State: Content Query nodes need to be children of directives, at index " +
                  t.nodeIndex +
                  "!"
              );
            if (134217728 & t.flags && e)
              throw new Error(
                "Illegal State: View Query nodes have to be top level nodes, at index " +
                  t.nodeIndex +
                  "!"
              );
          }
          if (t.childCount) {
            var o = e ? e.nodeIndex + e.childCount : n - 1;
            if (t.nodeIndex <= o && t.nodeIndex + t.childCount > o)
              throw new Error(
                "Illegal State: childCount of node leads outside of parent, at index " +
                  t.nodeIndex +
                  "!"
              );
          }
        }
        function qr(e, t, n, r) {
          var o = Kr(e.root, e.renderer, e, t, n);
          return $r(o, e.component, r), Jr(o), o;
        }
        function Zr(e, t, n) {
          var r = Kr(e, e.renderer, null, null, t);
          return $r(r, n, n), Jr(r), r;
        }
        function Qr(e, t, n, r) {
          var o,
            i = t.element.componentRendererType;
          return (
            (o = i
              ? e.root.rendererFactory.createRenderer(r, i)
              : e.root.renderer),
            Kr(e.root, o, e, t.element.componentProvider, n)
          );
        }
        function Kr(e, t, n, r, o) {
          var i = new Array(o.nodes.length),
            a = o.outputCount ? new Array(o.outputCount) : null;
          return {
            def: o,
            parent: n,
            viewContainerParent: null,
            parentNodeDef: r,
            context: null,
            component: null,
            nodes: i,
            state: 13,
            root: e,
            renderer: t,
            oldValues: new Array(o.bindingCount),
            disposables: a,
            initIndex: -1,
          };
        }
        function $r(e, t, n) {
          (e.component = t), (e.context = n);
        }
        function Jr(e) {
          var t;
          fn(e) &&
            (t = Ht(e.parent, e.parentNodeDef.parent.nodeIndex).renderElement);
          for (var n = e.def, r = e.nodes, o = 0; o < n.nodes.length; o++) {
            var i = n.nodes[o];
            qt.setCurrentNode(e, o);
            var a = void 0;
            switch (201347067 & i.flags) {
              case 1:
                var s = On(e, t, i),
                  l = void 0;
                if (33554432 & i.flags) {
                  var u = gn(i.element.componentView);
                  l = qt.createComponentView(e, i, u, s);
                }
                Mn(e, l, i, s),
                  (a = {
                    renderElement: s,
                    componentView: l,
                    viewContainer: null,
                    template: i.element.template ? nr(e, i) : void 0,
                  }),
                  16777216 & i.flags && (a.viewContainer = Yn(e, i, a));
                break;
              case 2:
                a = Lr(e, t, i);
                break;
              case 512:
              case 1024:
              case 2048:
              case 256:
                (a = r[o]) || 4096 & i.flags || (a = { instance: wr(e, i) });
                break;
              case 16:
                a = { instance: Cr(e, i) };
                break;
              case 16384:
                (a = r[o]) || (a = { instance: xr(e, i) }),
                  32768 & i.flags &&
                    $r(
                      Ht(e, i.parent.nodeIndex).componentView,
                      a.instance,
                      a.instance
                    );
                break;
              case 32:
              case 64:
              case 128:
                a = { value: void 0 };
                break;
              case 67108864:
              case 134217728:
                a = new tt();
                break;
              case 8:
                Vr(e, t, i), (a = void 0);
            }
            r[o] = a;
          }
          ao(e, io.CreateViewNodes), co(e, 201326592, 268435456, 0);
        }
        function Yr(e) {
          to(e),
            qt.updateDirectives(e, 1),
            so(e, io.CheckNoChanges),
            qt.updateRenderer(e, 1),
            ao(e, io.CheckNoChanges),
            (e.state &= -97);
        }
        function Xr(e) {
          1 & e.state ? ((e.state &= -2), (e.state |= 2)) : (e.state &= -3),
            zt(e, 0, 256),
            to(e),
            qt.updateDirectives(e, 0),
            so(e, io.CheckAndUpdate),
            co(e, 67108864, 536870912, 0);
          var t = zt(e, 256, 512);
          Pr(e, 2097152 | (t ? 1048576 : 0)),
            qt.updateRenderer(e, 0),
            ao(e, io.CheckAndUpdate),
            co(e, 134217728, 536870912, 0),
            Pr(e, 8388608 | ((t = zt(e, 512, 768)) ? 4194304 : 0)),
            2 & e.def.flags && (e.state &= -9),
            (e.state &= -97),
            zt(e, 768, 1024);
        }
        function eo(e, t, n, r, o, i, a, s, l, u, c, p, h) {
          return 0 === n
            ? (function (e, t, n, r, o, i, a, s, l, u, c, p) {
                switch (201347067 & t.flags) {
                  case 1:
                    return (function (e, t, n, r, o, i, a, s, l, u, c, p) {
                      var h = t.bindings.length,
                        f = !1;
                      return (
                        h > 0 && Rn(e, t, 0, n) && (f = !0),
                        h > 1 && Rn(e, t, 1, r) && (f = !0),
                        h > 2 && Rn(e, t, 2, o) && (f = !0),
                        h > 3 && Rn(e, t, 3, i) && (f = !0),
                        h > 4 && Rn(e, t, 4, a) && (f = !0),
                        h > 5 && Rn(e, t, 5, s) && (f = !0),
                        h > 6 && Rn(e, t, 6, l) && (f = !0),
                        h > 7 && Rn(e, t, 7, u) && (f = !0),
                        h > 8 && Rn(e, t, 8, c) && (f = !0),
                        h > 9 && Rn(e, t, 9, p) && (f = !0),
                        f
                      );
                    })(e, t, n, r, o, i, a, s, l, u, c, p);
                  case 2:
                    return (function (e, t, n, r, o, i, a, s, l, u, c, p) {
                      var h = !1,
                        f = t.bindings,
                        d = f.length;
                      if (
                        (d > 0 && on(e, t, 0, n) && (h = !0),
                        d > 1 && on(e, t, 1, r) && (h = !0),
                        d > 2 && on(e, t, 2, o) && (h = !0),
                        d > 3 && on(e, t, 3, i) && (h = !0),
                        d > 4 && on(e, t, 4, a) && (h = !0),
                        d > 5 && on(e, t, 5, s) && (h = !0),
                        d > 6 && on(e, t, 6, l) && (h = !0),
                        d > 7 && on(e, t, 7, u) && (h = !0),
                        d > 8 && on(e, t, 8, c) && (h = !0),
                        d > 9 && on(e, t, 9, p) && (h = !0),
                        h)
                      ) {
                        var y = t.text.prefix;
                        d > 0 && (y += Hr(n, f[0])),
                          d > 1 && (y += Hr(r, f[1])),
                          d > 2 && (y += Hr(o, f[2])),
                          d > 3 && (y += Hr(i, f[3])),
                          d > 4 && (y += Hr(a, f[4])),
                          d > 5 && (y += Hr(s, f[5])),
                          d > 6 && (y += Hr(l, f[6])),
                          d > 7 && (y += Hr(u, f[7])),
                          d > 8 && (y += Hr(c, f[8])),
                          d > 9 && (y += Hr(p, f[9]));
                        var _ = Lt(e, t.nodeIndex).renderText;
                        e.renderer.setValue(_, y);
                      }
                      return h;
                    })(e, t, n, r, o, i, a, s, l, u, c, p);
                  case 16384:
                    return (function (e, t, n, r, o, i, a, s, l, u, c, p) {
                      var h = Ut(e, t.nodeIndex),
                        f = h.instance,
                        d = !1,
                        y = void 0,
                        _ = t.bindings.length;
                      return (
                        _ > 0 &&
                          rn(e, t, 0, n) &&
                          ((d = !0), (y = Ir(e, h, t, 0, n, y))),
                        _ > 1 &&
                          rn(e, t, 1, r) &&
                          ((d = !0), (y = Ir(e, h, t, 1, r, y))),
                        _ > 2 &&
                          rn(e, t, 2, o) &&
                          ((d = !0), (y = Ir(e, h, t, 2, o, y))),
                        _ > 3 &&
                          rn(e, t, 3, i) &&
                          ((d = !0), (y = Ir(e, h, t, 3, i, y))),
                        _ > 4 &&
                          rn(e, t, 4, a) &&
                          ((d = !0), (y = Ir(e, h, t, 4, a, y))),
                        _ > 5 &&
                          rn(e, t, 5, s) &&
                          ((d = !0), (y = Ir(e, h, t, 5, s, y))),
                        _ > 6 &&
                          rn(e, t, 6, l) &&
                          ((d = !0), (y = Ir(e, h, t, 6, l, y))),
                        _ > 7 &&
                          rn(e, t, 7, u) &&
                          ((d = !0), (y = Ir(e, h, t, 7, u, y))),
                        _ > 8 &&
                          rn(e, t, 8, c) &&
                          ((d = !0), (y = Ir(e, h, t, 8, c, y))),
                        _ > 9 &&
                          rn(e, t, 9, p) &&
                          ((d = !0), (y = Ir(e, h, t, 9, p, y))),
                        y && f.ngOnChanges(y),
                        65536 & t.flags &&
                          Ft(e, 256, t.nodeIndex) &&
                          f.ngOnInit(),
                        262144 & t.flags && f.ngDoCheck(),
                        d
                      );
                    })(e, t, n, r, o, i, a, s, l, u, c, p);
                  case 32:
                  case 64:
                  case 128:
                    return (function (e, t, n, r, o, i, a, s, l, u, c, p) {
                      var h = t.bindings,
                        f = !1,
                        d = h.length;
                      if (
                        (d > 0 && on(e, t, 0, n) && (f = !0),
                        d > 1 && on(e, t, 1, r) && (f = !0),
                        d > 2 && on(e, t, 2, o) && (f = !0),
                        d > 3 && on(e, t, 3, i) && (f = !0),
                        d > 4 && on(e, t, 4, a) && (f = !0),
                        d > 5 && on(e, t, 5, s) && (f = !0),
                        d > 6 && on(e, t, 6, l) && (f = !0),
                        d > 7 && on(e, t, 7, u) && (f = !0),
                        d > 8 && on(e, t, 8, c) && (f = !0),
                        d > 9 && on(e, t, 9, p) && (f = !0),
                        f)
                      ) {
                        var y = Wt(e, t.nodeIndex),
                          _ = void 0;
                        switch (201347067 & t.flags) {
                          case 32:
                            (_ = new Array(h.length)),
                              d > 0 && (_[0] = n),
                              d > 1 && (_[1] = r),
                              d > 2 && (_[2] = o),
                              d > 3 && (_[3] = i),
                              d > 4 && (_[4] = a),
                              d > 5 && (_[5] = s),
                              d > 6 && (_[6] = l),
                              d > 7 && (_[7] = u),
                              d > 8 && (_[8] = c),
                              d > 9 && (_[9] = p);
                            break;
                          case 64:
                            (_ = {}),
                              d > 0 && (_[h[0].name] = n),
                              d > 1 && (_[h[1].name] = r),
                              d > 2 && (_[h[2].name] = o),
                              d > 3 && (_[h[3].name] = i),
                              d > 4 && (_[h[4].name] = a),
                              d > 5 && (_[h[5].name] = s),
                              d > 6 && (_[h[6].name] = l),
                              d > 7 && (_[h[7].name] = u),
                              d > 8 && (_[h[8].name] = c),
                              d > 9 && (_[h[9].name] = p);
                            break;
                          case 128:
                            var v = n;
                            switch (d) {
                              case 1:
                                _ = v.transform(n);
                                break;
                              case 2:
                                _ = v.transform(r);
                                break;
                              case 3:
                                _ = v.transform(r, o);
                                break;
                              case 4:
                                _ = v.transform(r, o, i);
                                break;
                              case 5:
                                _ = v.transform(r, o, i, a);
                                break;
                              case 6:
                                _ = v.transform(r, o, i, a, s);
                                break;
                              case 7:
                                _ = v.transform(r, o, i, a, s, l);
                                break;
                              case 8:
                                _ = v.transform(r, o, i, a, s, l, u);
                                break;
                              case 9:
                                _ = v.transform(r, o, i, a, s, l, u, c);
                                break;
                              case 10:
                                _ = v.transform(r, o, i, a, s, l, u, c, p);
                            }
                        }
                        y.value = _;
                      }
                      return f;
                    })(e, t, n, r, o, i, a, s, l, u, c, p);
                  default:
                    throw "unreachable";
                }
              })(e, t, r, o, i, a, s, l, u, c, p, h)
            : (function (e, t, n) {
                switch (201347067 & t.flags) {
                  case 1:
                    return (function (e, t, n) {
                      for (var r = !1, o = 0; o < n.length; o++)
                        Rn(e, t, o, n[o]) && (r = !0);
                      return r;
                    })(e, t, n);
                  case 2:
                    return (function (e, t, n) {
                      for (var r = t.bindings, o = !1, i = 0; i < n.length; i++)
                        on(e, t, i, n[i]) && (o = !0);
                      if (o) {
                        var a = "";
                        for (i = 0; i < n.length; i++) a += Hr(n[i], r[i]);
                        a = t.text.prefix + a;
                        var s = Lt(e, t.nodeIndex).renderText;
                        e.renderer.setValue(s, a);
                      }
                      return o;
                    })(e, t, n);
                  case 16384:
                    return (function (e, t, n) {
                      for (
                        var r = Ut(e, t.nodeIndex),
                          o = r.instance,
                          i = !1,
                          a = void 0,
                          s = 0;
                        s < n.length;
                        s++
                      )
                        rn(e, t, s, n[s]) &&
                          ((i = !0), (a = Ir(e, r, t, s, n[s], a)));
                      return (
                        a && o.ngOnChanges(a),
                        65536 & t.flags &&
                          Ft(e, 256, t.nodeIndex) &&
                          o.ngOnInit(),
                        262144 & t.flags && o.ngDoCheck(),
                        i
                      );
                    })(e, t, n);
                  case 32:
                  case 64:
                  case 128:
                    return (function (e, t, n) {
                      for (var r = t.bindings, o = !1, i = 0; i < n.length; i++)
                        on(e, t, i, n[i]) && (o = !0);
                      if (o) {
                        var a = Wt(e, t.nodeIndex),
                          s = void 0;
                        switch (201347067 & t.flags) {
                          case 32:
                            s = n;
                            break;
                          case 64:
                            for (s = {}, i = 0; i < n.length; i++)
                              s[r[i].name] = n[i];
                            break;
                          case 128:
                            var l = n[0],
                              u = n.slice(1);
                            s = l.transform.apply(l, u);
                        }
                        a.value = s;
                      }
                      return o;
                    })(e, t, n);
                  default:
                    throw "unreachable";
                }
              })(e, t, r);
        }
        function to(e) {
          var t = e.def;
          if (4 & t.nodeFlags)
            for (var n = 0; n < t.nodes.length; n++) {
              var r = t.nodes[n];
              if (4 & r.flags) {
                var o = Ht(e, n).template._projectedViews;
                if (o)
                  for (var i = 0; i < o.length; i++) {
                    var a = o[i];
                    (a.state |= 32), ln(a, e);
                  }
              } else 0 == (4 & r.childFlags) && (n += r.childCount);
            }
        }
        function no(e, t, n, r, o, i, a, s, l, u, c, p, h) {
          return (
            0 === n
              ? (function (e, t, n, r, o, i, a, s, l, u, c, p) {
                  var h = t.bindings.length;
                  h > 0 && an(e, t, 0, n),
                    h > 1 && an(e, t, 1, r),
                    h > 2 && an(e, t, 2, o),
                    h > 3 && an(e, t, 3, i),
                    h > 4 && an(e, t, 4, a),
                    h > 5 && an(e, t, 5, s),
                    h > 6 && an(e, t, 6, l),
                    h > 7 && an(e, t, 7, u),
                    h > 8 && an(e, t, 8, c),
                    h > 9 && an(e, t, 9, p);
                })(e, t, r, o, i, a, s, l, u, c, p, h)
              : (function (e, t, n) {
                  for (var r = 0; r < n.length; r++) an(e, t, r, n[r]);
                })(e, t, r),
            !1
          );
        }
        function ro(e, t) {
          if (Gt(e, t.nodeIndex).dirty)
            throw Zt(
              qt.createDebugContext(e, t.nodeIndex),
              "Query " + t.query.id + " not dirty",
              "Query " + t.query.id + " dirty",
              0 != (1 & e.state)
            );
        }
        function oo(e) {
          if (!(128 & e.state)) {
            if (
              (so(e, io.Destroy),
              ao(e, io.Destroy),
              Pr(e, 131072),
              e.disposables)
            )
              for (var t = 0; t < e.disposables.length; t++) e.disposables[t]();
            !(function (e) {
              if (16 & e.state) {
                var t = cn(e);
                if (t) {
                  var n = t.template._projectedViews;
                  n && (Zn(n, n.indexOf(e)), qt.dirtyParentQueries(e));
                }
              }
            })(e),
              e.renderer.destroyNode &&
                (function (e) {
                  for (var t = e.def.nodes.length, n = 0; n < t; n++) {
                    var r = e.def.nodes[n];
                    1 & r.flags
                      ? e.renderer.destroyNode(Ht(e, n).renderElement)
                      : 2 & r.flags
                      ? e.renderer.destroyNode(Lt(e, n).renderText)
                      : (67108864 & r.flags || 134217728 & r.flags) &&
                        Gt(e, n).destroy();
                  }
                })(e),
              fn(e) && e.renderer.destroy(),
              (e.state |= 128);
          }
        }
        var io = (function () {
          var e = {
            CreateViewNodes: 0,
            CheckNoChanges: 1,
            CheckNoChangesProjectedViews: 2,
            CheckAndUpdate: 3,
            CheckAndUpdateProjectedViews: 4,
            Destroy: 5,
          };
          return (
            (e[e.CreateViewNodes] = "CreateViewNodes"),
            (e[e.CheckNoChanges] = "CheckNoChanges"),
            (e[e.CheckNoChangesProjectedViews] =
              "CheckNoChangesProjectedViews"),
            (e[e.CheckAndUpdate] = "CheckAndUpdate"),
            (e[e.CheckAndUpdateProjectedViews] =
              "CheckAndUpdateProjectedViews"),
            (e[e.Destroy] = "Destroy"),
            e
          );
        })();
        function ao(e, t) {
          var n = e.def;
          if (33554432 & n.nodeFlags)
            for (var r = 0; r < n.nodes.length; r++) {
              var o = n.nodes[r];
              33554432 & o.flags
                ? lo(Ht(e, r).componentView, t)
                : 0 == (33554432 & o.childFlags) && (r += o.childCount);
            }
        }
        function so(e, t) {
          var n = e.def;
          if (16777216 & n.nodeFlags)
            for (var r = 0; r < n.nodes.length; r++) {
              var o = n.nodes[r];
              if (16777216 & o.flags)
                for (
                  var i = Ht(e, r).viewContainer._embeddedViews, a = 0;
                  a < i.length;
                  a++
                )
                  lo(i[a], t);
              else 0 == (16777216 & o.childFlags) && (r += o.childCount);
            }
        }
        function lo(e, t) {
          var n = e.state;
          switch (t) {
            case io.CheckNoChanges:
              0 == (128 & n) &&
                (12 == (12 & n)
                  ? Yr(e)
                  : 64 & n && uo(e, io.CheckNoChangesProjectedViews));
              break;
            case io.CheckNoChangesProjectedViews:
              0 == (128 & n) && (32 & n ? Yr(e) : 64 & n && uo(e, t));
              break;
            case io.CheckAndUpdate:
              0 == (128 & n) &&
                (12 == (12 & n)
                  ? Xr(e)
                  : 64 & n && uo(e, io.CheckAndUpdateProjectedViews));
              break;
            case io.CheckAndUpdateProjectedViews:
              0 == (128 & n) && (32 & n ? Xr(e) : 64 & n && uo(e, t));
              break;
            case io.Destroy:
              oo(e);
              break;
            case io.CreateViewNodes:
              Jr(e);
          }
        }
        function uo(e, t) {
          so(e, t), ao(e, t);
        }
        function co(e, t, n, r) {
          if (e.def.nodeFlags & t && e.def.nodeFlags & n)
            for (var o = e.def.nodes.length, i = 0; i < o; i++) {
              var a = e.def.nodes[i];
              if (a.flags & t && a.flags & n)
                switch ((qt.setCurrentNode(e, a.nodeIndex), r)) {
                  case 0:
                    Rr(e, a);
                    break;
                  case 1:
                    ro(e, a);
                }
              (a.childFlags & t && a.childFlags & n) || (i += a.childCount);
            }
        }
        var po = !1;
        function ho(e, t, n, r, o, i) {
          return Zr(yo(e, o, o.injector.get(Je), t, n), r, i);
        }
        function fo(e, t, n, r, o, i) {
          var a = o.injector.get(Je),
            s = yo(e, o, new Qo(a), t, n),
            l = ko(r);
          return qo(Mo.create, Zr, null, [s, l, i]);
        }
        function yo(e, t, n, r, o) {
          var i = t.injector.get(Vt),
            a = t.injector.get(J);
          return {
            ngModule: t,
            injector: e,
            projectableNodes: r,
            selectorOrNode: o,
            sanitizer: i,
            rendererFactory: n,
            renderer: n.createRenderer(null, null),
            errorHandler: a,
          };
        }
        function _o(e, t, n, r) {
          var o = ko(n);
          return qo(Mo.create, qr, null, [e, t, o, r]);
        }
        function vo(e, t, n, r) {
          return (
            (n = mo.get(t.element.componentProvider.provider.token) || ko(n)),
            qo(Mo.create, Qr, null, [e, t, n, r])
          );
        }
        function bo(e, t, n, r) {
          return ur(
            e,
            t,
            n,
            (function (e) {
              var t = (function (e) {
                  var t = !1,
                    n = !1;
                  return 0 === go.size
                    ? { hasOverrides: t, hasDeprecatedOverrides: n }
                    : (e.providers.forEach(function (e) {
                        var r = go.get(e.token);
                        3840 & e.flags &&
                          r &&
                          ((t = !0), (n = n || r.deprecatedBehavior));
                      }),
                      { hasOverrides: t, hasDeprecatedOverrides: n });
                })(e),
                n = t.hasDeprecatedOverrides;
              return t.hasOverrides
                ? ((function (e) {
                    for (var t = 0; t < e.providers.length; t++) {
                      var r = e.providers[t];
                      n && (r.flags |= 4096);
                      var o = go.get(r.token);
                      o &&
                        ((r.flags = (-3841 & r.flags) | o.flags),
                        (r.deps = _n(o.deps)),
                        (r.value = o.value));
                    }
                  })(
                    (e = e.factory(function () {
                      return $t;
                    }))
                  ),
                  e)
                : e;
            })(r)
          );
        }
        var go = new Map(),
          mo = new Map();
        function wo(e) {
          go.set(e.token, e);
        }
        function Co(e, t) {
          var n = gn(gn(t.viewDefFactory).nodes[0].element.componentView);
          mo.set(e, n);
        }
        function xo() {
          go.clear(), mo.clear();
        }
        function ko(e) {
          if (0 === go.size) return e;
          var t = (function (e) {
            for (var t = [], n = null, r = 0; r < e.nodes.length; r++) {
              var o = e.nodes[r];
              1 & o.flags && (n = o),
                n &&
                  3840 & o.flags &&
                  go.has(o.provider.token) &&
                  (t.push(n.nodeIndex), (n = null));
            }
            return t;
          })(e);
          if (0 === t.length) return e;
          e = e.factory(function () {
            return $t;
          });
          for (var n = 0; n < t.length; n++) r(e, t[n]);
          return e;
          function r(e, t) {
            for (var n = t + 1; n < e.nodes.length; n++) {
              var r = e.nodes[n];
              if (1 & r.flags) return;
              if (3840 & r.flags) {
                var o = r.provider,
                  i = go.get(o.token);
                i &&
                  ((r.flags = (-3841 & r.flags) | i.flags),
                  (o.deps = _n(i.deps)),
                  (o.value = i.value));
              }
            }
          }
        }
        function So(e, t, n, r, o, i, a, s, l, u, c, p, h) {
          var f = e.def.nodes[t];
          return (
            eo(e, f, n, r, o, i, a, s, l, u, c, p, h),
            224 & f.flags ? Wt(e, t).value : void 0
          );
        }
        function Eo(e, t, n, r, o, i, a, s, l, u, c, p, h) {
          var f = e.def.nodes[t];
          return (
            no(e, f, n, r, o, i, a, s, l, u, c, p, h),
            224 & f.flags ? Wt(e, t).value : void 0
          );
        }
        function jo(e) {
          return qo(Mo.detectChanges, Xr, null, [e]);
        }
        function To(e) {
          return qo(Mo.checkNoChanges, Yr, null, [e]);
        }
        function Ao(e) {
          return qo(Mo.destroy, oo, null, [e]);
        }
        var Io,
          Po,
          Oo,
          Mo = (function () {
            var e = {
              create: 0,
              detectChanges: 1,
              checkNoChanges: 2,
              destroy: 3,
              handleEvent: 4,
            };
            return (
              (e[e.create] = "create"),
              (e[e.detectChanges] = "detectChanges"),
              (e[e.checkNoChanges] = "checkNoChanges"),
              (e[e.destroy] = "destroy"),
              (e[e.handleEvent] = "handleEvent"),
              e
            );
          })();
        function No(e, t) {
          (Po = e), (Oo = t);
        }
        function Ro(e, t, n, r) {
          return (
            No(e, t), qo(Mo.handleEvent, e.def.handleEvent, null, [e, t, n, r])
          );
        }
        function Do(e, t) {
          if (128 & e.state) throw Kt(Mo[Io]);
          return (
            No(e, Ho(e, 0)),
            e.def.updateDirectives(function (e, n, r) {
              for (var o = [], i = 3; i < arguments.length; i++)
                o[i - 3] = arguments[i];
              var a = e.def.nodes[n];
              return (
                0 === t ? Vo(e, a, r, o) : zo(e, a, r, o),
                16384 & a.flags && No(e, Ho(e, n)),
                224 & a.flags ? Wt(e, a.nodeIndex).value : void 0
              );
            }, e)
          );
        }
        function Bo(e, t) {
          if (128 & e.state) throw Kt(Mo[Io]);
          return (
            No(e, Uo(e, 0)),
            e.def.updateRenderer(function (e, n, r) {
              for (var o = [], i = 3; i < arguments.length; i++)
                o[i - 3] = arguments[i];
              var a = e.def.nodes[n];
              return (
                0 === t ? Vo(e, a, r, o) : zo(e, a, r, o),
                3 & a.flags && No(e, Uo(e, n)),
                224 & a.flags ? Wt(e, a.nodeIndex).value : void 0
              );
            }, e)
          );
        }
        function Vo(e, t, n, r) {
          if (eo.apply(void 0, [e, t, n].concat(r))) {
            var o = 1 === n ? r[0] : r;
            if (16384 & t.flags) {
              for (var i = {}, a = 0; a < t.bindings.length; a++) {
                var s = t.bindings[a],
                  l = o[a];
                8 & s.flags &&
                  (i[
                    ((h = s.nonMinifiedName),
                    "ng-reflect-" +
                      (h = h.replace(/[$@]/g, "_").replace(Fo, function () {
                        for (var e = [], t = 0; t < arguments.length; t++)
                          e[t] = arguments[t];
                        return "-" + e[1].toLowerCase();
                      })))
                  ] = Lo(l));
              }
              var u = t.parent,
                c = Ht(e, u.nodeIndex).renderElement;
              if (u.element.name)
                for (var p in i)
                  null != (l = i[p])
                    ? e.renderer.setAttribute(c, p, l)
                    : e.renderer.removeAttribute(c, p);
              else
                e.renderer.setValue(
                  c,
                  "bindings=" + JSON.stringify(i, null, 2)
                );
            }
          }
          var h;
        }
        function zo(e, t, n, r) {
          no.apply(void 0, [e, t, n].concat(r));
        }
        var Fo = /([A-Z])/g;
        function Lo(e) {
          try {
            return null != e ? e.toString().slice(0, 30) : e;
          } catch (e) {
            return "[ERROR] Exception while trying to serialize the value";
          }
        }
        function Ho(e, t) {
          for (var n = t; n < e.def.nodes.length; n++) {
            var r = e.def.nodes[n];
            if (16384 & r.flags && r.bindings && r.bindings.length) return n;
          }
          return null;
        }
        function Uo(e, t) {
          for (var n = t; n < e.def.nodes.length; n++) {
            var r = e.def.nodes[n];
            if (3 & r.flags && r.bindings && r.bindings.length) return n;
          }
          return null;
        }
        var Wo = (function () {
          function e(e, t) {
            (this.view = e),
              (this.nodeIndex = t),
              null == t && (this.nodeIndex = t = 0),
              (this.nodeDef = e.def.nodes[t]);
            for (var n = this.nodeDef, r = e; n && 0 == (1 & n.flags); )
              n = n.parent;
            if (!n) for (; !n && r; ) (n = pn(r)), (r = r.parent);
            (this.elDef = n), (this.elView = r);
          }
          return (
            Object.defineProperty(e.prototype, "elOrCompView", {
              get: function () {
                return (
                  Ht(this.elView, this.elDef.nodeIndex).componentView ||
                  this.view
                );
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "injector", {
              get: function () {
                return or(this.elView, this.elDef);
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "component", {
              get: function () {
                return this.elOrCompView.component;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "context", {
              get: function () {
                return this.elOrCompView.context;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "providerTokens", {
              get: function () {
                var e = [];
                if (this.elDef)
                  for (
                    var t = this.elDef.nodeIndex + 1;
                    t <= this.elDef.nodeIndex + this.elDef.childCount;
                    t++
                  ) {
                    var n = this.elView.def.nodes[t];
                    20224 & n.flags && e.push(n.provider.token),
                      (t += n.childCount);
                  }
                return e;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "references", {
              get: function () {
                var e = {};
                if (this.elDef) {
                  Go(this.elView, this.elDef, e);
                  for (
                    var t = this.elDef.nodeIndex + 1;
                    t <= this.elDef.nodeIndex + this.elDef.childCount;
                    t++
                  ) {
                    var n = this.elView.def.nodes[t];
                    20224 & n.flags && Go(this.elView, n, e),
                      (t += n.childCount);
                  }
                }
                return e;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "componentRenderElement", {
              get: function () {
                var e = (function (e) {
                  for (; e && !fn(e); ) e = e.parent;
                  return e.parent ? Ht(e.parent, pn(e).nodeIndex) : null;
                })(this.elOrCompView);
                return e ? e.renderElement : void 0;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "renderNode", {
              get: function () {
                return 2 & this.nodeDef.flags
                  ? hn(this.view, this.nodeDef)
                  : hn(this.elView, this.elDef);
              },
              enumerable: !0,
              configurable: !0,
            }),
            (e.prototype.logError = function (e) {
              for (var t, n, r = [], o = 1; o < arguments.length; o++)
                r[o - 1] = arguments[o];
              2 & this.nodeDef.flags
                ? ((t = this.view.def), (n = this.nodeDef.nodeIndex))
                : ((t = this.elView.def), (n = this.elDef.nodeIndex));
              var i = (function (e, t) {
                  for (var n = -1, r = 0; r <= t; r++)
                    3 & e.nodes[r].flags && n++;
                  return n;
                })(t, n),
                a = -1;
              t.factory(function () {
                return ++a === i
                  ? (t = e.error).bind.apply(t, [e].concat(r))
                  : $t;
                var t;
              }),
                a < i &&
                  (e.error(
                    "Illegal state: the ViewDefinitionFactory did not call the logger!"
                  ),
                  e.error.apply(e, r));
            }),
            e
          );
        })();
        function Go(e, t, n) {
          for (var r in t.references) n[r] = Br(e, t, t.references[r]);
        }
        function qo(e, t, n, r) {
          var o = Io,
            i = Po,
            a = Oo;
          try {
            Io = e;
            var s = t.apply(n, r);
            return (Po = i), (Oo = a), (Io = o), s;
          } catch (e) {
            if (Q(e) || !Po) throw e;
            throw (function (e, t) {
              return (
                e instanceof Error || (e = new Error(e.toString())), Qt(e, t), e
              );
            })(e, Zo());
          }
        }
        function Zo() {
          return Po ? new Wo(Po, Oo) : null;
        }
        var Qo = (function () {
            function e(e) {
              this.delegate = e;
            }
            return (
              (e.prototype.createRenderer = function (e, t) {
                return new Ko(this.delegate.createRenderer(e, t));
              }),
              (e.prototype.begin = function () {
                this.delegate.begin && this.delegate.begin();
              }),
              (e.prototype.end = function () {
                this.delegate.end && this.delegate.end();
              }),
              (e.prototype.whenRenderingDone = function () {
                return this.delegate.whenRenderingDone
                  ? this.delegate.whenRenderingDone()
                  : Promise.resolve(null);
              }),
              e
            );
          })(),
          Ko = (function () {
            function e(e) {
              (this.delegate = e), (this.data = this.delegate.data);
            }
            return (
              (e.prototype.destroyNode = function (e) {
                !(function (e) {
                  lt.delete(e.nativeNode);
                })(ut(e)),
                  this.delegate.destroyNode && this.delegate.destroyNode(e);
              }),
              (e.prototype.destroy = function () {
                this.delegate.destroy();
              }),
              (e.prototype.createElement = function (e, t) {
                var n = this.delegate.createElement(e, t),
                  r = Zo();
                if (r) {
                  var o = new it(n, null, r);
                  (o.name = e), ct(o);
                }
                return n;
              }),
              (e.prototype.createComment = function (e) {
                var t = this.delegate.createComment(e),
                  n = Zo();
                return n && ct(new ot(t, null, n)), t;
              }),
              (e.prototype.createText = function (e) {
                var t = this.delegate.createText(e),
                  n = Zo();
                return n && ct(new ot(t, null, n)), t;
              }),
              (e.prototype.appendChild = function (e, t) {
                var n = ut(e),
                  r = ut(t);
                n && r && n instanceof it && n.addChild(r),
                  this.delegate.appendChild(e, t);
              }),
              (e.prototype.insertBefore = function (e, t, n) {
                var r = ut(e),
                  o = ut(t),
                  i = ut(n);
                r && o && r instanceof it && r.insertBefore(i, o),
                  this.delegate.insertBefore(e, t, n);
              }),
              (e.prototype.removeChild = function (e, t) {
                var n = ut(e),
                  r = ut(t);
                n && r && n instanceof it && n.removeChild(r),
                  this.delegate.removeChild(e, t);
              }),
              (e.prototype.selectRootElement = function (e) {
                var t = this.delegate.selectRootElement(e),
                  n = Zo();
                return n && ct(new it(t, null, n)), t;
              }),
              (e.prototype.setAttribute = function (e, t, n, r) {
                var o = ut(e);
                o && o instanceof it && (o.attributes[r ? r + ":" + t : t] = n),
                  this.delegate.setAttribute(e, t, n, r);
              }),
              (e.prototype.removeAttribute = function (e, t, n) {
                var r = ut(e);
                r &&
                  r instanceof it &&
                  (r.attributes[n ? n + ":" + t : t] = null),
                  this.delegate.removeAttribute(e, t, n);
              }),
              (e.prototype.addClass = function (e, t) {
                var n = ut(e);
                n && n instanceof it && (n.classes[t] = !0),
                  this.delegate.addClass(e, t);
              }),
              (e.prototype.removeClass = function (e, t) {
                var n = ut(e);
                n && n instanceof it && (n.classes[t] = !1),
                  this.delegate.removeClass(e, t);
              }),
              (e.prototype.setStyle = function (e, t, n, r) {
                var o = ut(e);
                o && o instanceof it && (o.styles[t] = n),
                  this.delegate.setStyle(e, t, n, r);
              }),
              (e.prototype.removeStyle = function (e, t, n) {
                var r = ut(e);
                r && r instanceof it && (r.styles[t] = null),
                  this.delegate.removeStyle(e, t, n);
              }),
              (e.prototype.setProperty = function (e, t, n) {
                var r = ut(e);
                r && r instanceof it && (r.properties[t] = n),
                  this.delegate.setProperty(e, t, n);
              }),
              (e.prototype.listen = function (e, t, n) {
                if ("string" != typeof e) {
                  var r = ut(e);
                  r &&
                    r.listeners.push(
                      new (function (e, t) {
                        (this.name = e), (this.callback = t);
                      })(t, n)
                    );
                }
                return this.delegate.listen(e, t, n);
              }),
              (e.prototype.parentNode = function (e) {
                return this.delegate.parentNode(e);
              }),
              (e.prototype.nextSibling = function (e) {
                return this.delegate.nextSibling(e);
              }),
              (e.prototype.setValue = function (e, t) {
                return this.delegate.setValue(e, t);
              }),
              e
            );
          })();
        function $o(e, t, n) {
          return new Yo(e, t, n);
        }
        var Jo,
          Yo = (function (e) {
            function t(t, n, r) {
              var o = e.call(this) || this;
              return (
                (o.moduleType = t),
                (o._bootstrapComponents = n),
                (o._ngModuleDefFactory = r),
                o
              );
            }
            return (
              Object(r.b)(t, e),
              (t.prototype.create = function (e) {
                !(function () {
                  if (!po) {
                    po = !0;
                    var e = Ue()
                      ? {
                          setCurrentNode: No,
                          createRootView: fo,
                          createEmbeddedView: _o,
                          createComponentView: vo,
                          createNgModuleRef: bo,
                          overrideProvider: wo,
                          overrideComponentView: Co,
                          clearOverrides: xo,
                          checkAndUpdateView: jo,
                          checkNoChangesView: To,
                          destroyView: Ao,
                          createDebugContext: function (e, t) {
                            return new Wo(e, t);
                          },
                          handleEvent: Ro,
                          updateDirectives: Do,
                          updateRenderer: Bo,
                        }
                      : {
                          setCurrentNode: function () {},
                          createRootView: ho,
                          createEmbeddedView: qr,
                          createComponentView: Qr,
                          createNgModuleRef: ur,
                          overrideProvider: $t,
                          overrideComponentView: $t,
                          clearOverrides: $t,
                          checkAndUpdateView: Xr,
                          checkNoChangesView: Yr,
                          destroyView: oo,
                          createDebugContext: function (e, t) {
                            return new Wo(e, t);
                          },
                          handleEvent: function (e, t, n, r) {
                            return e.def.handleEvent(e, t, n, r);
                          },
                          updateDirectives: function (e, t) {
                            return e.def.updateDirectives(0 === t ? So : Eo, e);
                          },
                          updateRenderer: function (e, t) {
                            return e.def.updateRenderer(0 === t ? So : Eo, e);
                          },
                        };
                    (qt.setCurrentNode = e.setCurrentNode),
                      (qt.createRootView = e.createRootView),
                      (qt.createEmbeddedView = e.createEmbeddedView),
                      (qt.createComponentView = e.createComponentView),
                      (qt.createNgModuleRef = e.createNgModuleRef),
                      (qt.overrideProvider = e.overrideProvider),
                      (qt.overrideComponentView = e.overrideComponentView),
                      (qt.clearOverrides = e.clearOverrides),
                      (qt.checkAndUpdateView = e.checkAndUpdateView),
                      (qt.checkNoChangesView = e.checkNoChangesView),
                      (qt.destroyView = e.destroyView),
                      (qt.resolveDep = Tr),
                      (qt.createDebugContext = e.createDebugContext),
                      (qt.handleEvent = e.handleEvent),
                      (qt.updateDirectives = e.updateDirectives),
                      (qt.updateRenderer = e.updateRenderer),
                      (qt.dirtyParentQueries = Nr);
                  }
                })();
                var t = gn(this._ngModuleDefFactory);
                return qt.createNgModuleRef(
                  this.moduleType,
                  e || P.NULL,
                  this._bootstrapComponents,
                  t
                );
              }),
              t
            );
          })(function () {});
        "undefined" == typeof ngDevMode &&
          ("undefined" != typeof window && (window.ngDevMode = !0),
          "undefined" != typeof self && (self.ngDevMode = !0),
          "undefined" != typeof e && (e.ngDevMode = !0)),
          (Jo = (function (e, t, n) {
            return {
              parent: Jo,
              id: null,
              node: null,
              data: [],
              ngStaticData: [],
              cleanup: null,
              renderer: null,
              child: null,
              tail: null,
              next: null,
              bindingStartIndex: null,
              creationMode: !0,
              viewHookStartIndex: null,
            };
          })());
      }).call(t, n("fRUx"));
    },
    MwgA: function (e, t) {
      e.exports = function () {
        throw new Error("define cannot be used indirect");
      };
    },
    NGRF: function (e, t, n) {
      "use strict";
      t.a = function (e) {
        return null != e && "object" == typeof e;
      };
    },
    NyNv: function (e, t, n) {
      (function (e) {
        var r;
        !(function (e, o, i) {
          function a(e, t) {
            return (t.x = e.x), (t.y = e.y), (t.z = e.z), (t.w = e.w), t;
          }
          function s(e, t) {
            var n = new (function (e) {
                var t = this,
                  n = "";
                (t.x = 0),
                  (t.y = 0),
                  (t.z = 0),
                  (t.w = 0),
                  (t.next = function () {
                    var e = t.x ^ (t.x << 11);
                    return (
                      (t.x = t.y),
                      (t.y = t.z),
                      (t.z = t.w),
                      (t.w ^= (t.w >>> 19) ^ e ^ (e >>> 8))
                    );
                  }),
                  e === (0 | e) ? (t.x = e) : (n += e);
                for (var r = 0; r < n.length + 64; r++)
                  (t.x ^= 0 | n.charCodeAt(r)), t.next();
              })(e),
              r = t && t.state,
              o = function () {
                return (n.next() >>> 0) / 4294967296;
              };
            return (
              (o.double = function () {
                do {
                  var e =
                    ((n.next() >>> 11) + (n.next() >>> 0) / 4294967296) /
                    (1 << 21);
                } while (0 === e);
                return e;
              }),
              (o.int32 = n.next),
              (o.quick = o),
              r &&
                ("object" == typeof r && a(r, n),
                (o.state = function () {
                  return a(n, {});
                })),
              o
            );
          }
          o && o.exports
            ? (o.exports = s)
            : n("MwgA") && n("f8Ud")
            ? void 0 ===
                (r = function () {
                  return s;
                }.call(t, n, t, o)) || (o.exports = r)
            : (this.xor128 = s);
        })(0, "object" == typeof e && e, n("MwgA"));
      }).call(t, n("ZwkM")(e));
    },
    TDVe: function (e, t, n) {
      (function (e) {
        var r;
        !(function (e, o, i) {
          function a(e, t) {
            return (t.c = e.c), (t.s0 = e.s0), (t.s1 = e.s1), (t.s2 = e.s2), t;
          }
          function s(e, t) {
            var n = new (function (e) {
                var t,
                  n = this,
                  r =
                    ((t = 4022871197),
                    function (e) {
                      e = e.toString();
                      for (var n = 0; n < e.length; n++) {
                        var r = 0.02519603282416938 * (t += e.charCodeAt(n));
                        (r -= t = r >>> 0),
                          (t = (r *= t) >>> 0),
                          (t += 4294967296 * (r -= t));
                      }
                      return 2.3283064365386963e-10 * (t >>> 0);
                    });
                (n.next = function () {
                  var e = 2091639 * n.s0 + 2.3283064365386963e-10 * n.c;
                  return (
                    (n.s0 = n.s1), (n.s1 = n.s2), (n.s2 = e - (n.c = 0 | e))
                  );
                }),
                  (n.c = 1),
                  (n.s0 = r(" ")),
                  (n.s1 = r(" ")),
                  (n.s2 = r(" ")),
                  (n.s0 -= r(e)),
                  n.s0 < 0 && (n.s0 += 1),
                  (n.s1 -= r(e)),
                  n.s1 < 0 && (n.s1 += 1),
                  (n.s2 -= r(e)),
                  n.s2 < 0 && (n.s2 += 1),
                  (r = null);
              })(e),
              r = t && t.state,
              o = n.next;
            return (
              (o.int32 = function () {
                return (4294967296 * n.next()) | 0;
              }),
              (o.double = function () {
                return o() + 1.1102230246251565e-16 * ((2097152 * o()) | 0);
              }),
              (o.quick = o),
              r &&
                ("object" == typeof r && a(r, n),
                (o.state = function () {
                  return a(n, {});
                })),
              o
            );
          }
          o && o.exports
            ? (o.exports = s)
            : n("MwgA") && n("f8Ud")
            ? void 0 ===
                (r = function () {
                  return s;
                }.call(t, n, t, o)) || (o.exports = r)
            : (this.alea = s);
        })(0, "object" == typeof e && e, n("MwgA"));
      }).call(t, n("ZwkM")(e));
    },
    TNQo: function (e, t, n) {
      var r = n("TDVe"),
        o = n("NyNv"),
        i = n("Jnzd"),
        a = n("x5jA"),
        s = n("j/u5"),
        l = n("mKHA"),
        u = n("fQhz");
      (u.alea = r),
        (u.xor128 = o),
        (u.xorwow = i),
        (u.xorshift7 = a),
        (u.xor4096 = s),
        (u.tychei = l),
        (e.exports = u);
    },
    TO51: function (e, t, n) {
      "use strict";
      var r = n("6Xbx"),
        o = n("AP4T"),
        i = n("E9/g"),
        a = n("qLnt"),
        s = (function (e) {
          function t() {
            var t = e.call(this, "object unsubscribed");
            (this.name = t.name = "ObjectUnsubscribedError"),
              (this.stack = t.stack),
              (this.message = t.message);
          }
          return Object(r.b)(t, e), t;
        })(Error),
        l = (function (e) {
          function t(t, n) {
            e.call(this),
              (this.subject = t),
              (this.subscriber = n),
              (this.closed = !1);
          }
          return (
            Object(r.b)(t, e),
            (t.prototype.unsubscribe = function () {
              if (!this.closed) {
                this.closed = !0;
                var e = this.subject,
                  t = e.observers;
                if (
                  ((this.subject = null),
                  t && 0 !== t.length && !e.isStopped && !e.closed)
                ) {
                  var n = t.indexOf(this.subscriber);
                  -1 !== n && t.splice(n, 1);
                }
              }
            }),
            t
          );
        })(a.a),
        u = n("V7AE");
      n.d(t, "b", function () {
        return c;
      }),
        n.d(t, "a", function () {
          return p;
        });
      var c = (function (e) {
          function t(t) {
            e.call(this, t), (this.destination = t);
          }
          return Object(r.b)(t, e), t;
        })(i.a),
        p = (function (e) {
          function t() {
            e.call(this),
              (this.observers = []),
              (this.closed = !1),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          return (
            Object(r.b)(t, e),
            (t.prototype[u.a] = function () {
              return new c(this);
            }),
            (t.prototype.lift = function (e) {
              var t = new h(this, this);
              return (t.operator = e), t;
            }),
            (t.prototype.next = function (e) {
              if (this.closed) throw new s();
              if (!this.isStopped)
                for (
                  var t = this.observers, n = t.length, r = t.slice(), o = 0;
                  o < n;
                  o++
                )
                  r[o].next(e);
            }),
            (t.prototype.error = function (e) {
              if (this.closed) throw new s();
              (this.hasError = !0),
                (this.thrownError = e),
                (this.isStopped = !0);
              for (
                var t = this.observers, n = t.length, r = t.slice(), o = 0;
                o < n;
                o++
              )
                r[o].error(e);
              this.observers.length = 0;
            }),
            (t.prototype.complete = function () {
              if (this.closed) throw new s();
              this.isStopped = !0;
              for (
                var e = this.observers, t = e.length, n = e.slice(), r = 0;
                r < t;
                r++
              )
                n[r].complete();
              this.observers.length = 0;
            }),
            (t.prototype.unsubscribe = function () {
              (this.isStopped = !0),
                (this.closed = !0),
                (this.observers = null);
            }),
            (t.prototype._trySubscribe = function (t) {
              if (this.closed) throw new s();
              return e.prototype._trySubscribe.call(this, t);
            }),
            (t.prototype._subscribe = function (e) {
              if (this.closed) throw new s();
              return this.hasError
                ? (e.error(this.thrownError), a.a.EMPTY)
                : this.isStopped
                ? (e.complete(), a.a.EMPTY)
                : (this.observers.push(e), new l(this, e));
            }),
            (t.prototype.asObservable = function () {
              var e = new o.a();
              return (e.source = this), e;
            }),
            (t.create = function (e, t) {
              return new h(e, t);
            }),
            t
          );
        })(o.a),
        h = (function (e) {
          function t(t, n) {
            e.call(this), (this.destination = t), (this.source = n);
          }
          return (
            Object(r.b)(t, e),
            (t.prototype.next = function (e) {
              var t = this.destination;
              t && t.next && t.next(e);
            }),
            (t.prototype.error = function (e) {
              var t = this.destination;
              t && t.error && this.destination.error(e);
            }),
            (t.prototype.complete = function () {
              var e = this.destination;
              e && e.complete && this.destination.complete();
            }),
            (t.prototype._subscribe = function (e) {
              return this.source ? this.source.subscribe(e) : a.a.EMPTY;
            }),
            t
          );
        })(p);
    },
    URbD: function (e, t, n) {
      "use strict";
      var r = n("6Xbx"),
        o = n("TO51"),
        i = n("AP4T"),
        a = n("E9/g"),
        s = n("qLnt");
      function l() {
        return function (e) {
          return e.lift(new u(e));
        };
      }
      var u = (function () {
          function e(e) {
            this.connectable = e;
          }
          return (
            (e.prototype.call = function (e, t) {
              var n = this.connectable;
              n._refCount++;
              var r = new c(e, n),
                o = t.subscribe(r);
              return r.closed || (r.connection = n.connect()), o;
            }),
            e
          );
        })(),
        c = (function (e) {
          function t(t, n) {
            e.call(this, t), (this.connectable = n);
          }
          return (
            Object(r.b)(t, e),
            (t.prototype._unsubscribe = function () {
              var e = this.connectable;
              if (e) {
                this.connectable = null;
                var t = e._refCount;
                if (t <= 0) this.connection = null;
                else if (((e._refCount = t - 1), t > 1)) this.connection = null;
                else {
                  var n = this.connection,
                    r = e._connection;
                  (this.connection = null),
                    !r || (n && r !== n) || r.unsubscribe();
                }
              } else this.connection = null;
            }),
            t
          );
        })(a.a),
        p = (function (e) {
          function t(t, n) {
            e.call(this),
              (this.source = t),
              (this.subjectFactory = n),
              (this._refCount = 0),
              (this._isComplete = !1);
          }
          return (
            Object(r.b)(t, e),
            (t.prototype._subscribe = function (e) {
              return this.getSubject().subscribe(e);
            }),
            (t.prototype.getSubject = function () {
              var e = this._subject;
              return (
                (e && !e.isStopped) || (this._subject = this.subjectFactory()),
                this._subject
              );
            }),
            (t.prototype.connect = function () {
              var e = this._connection;
              return (
                e ||
                  ((this._isComplete = !1),
                  (e = this._connection = new s.a()).add(
                    this.source.subscribe(new f(this.getSubject(), this))
                  ),
                  e.closed
                    ? ((this._connection = null), (e = s.a.EMPTY))
                    : (this._connection = e)),
                e
              );
            }),
            (t.prototype.refCount = function () {
              return l()(this);
            }),
            t
          );
        })(i.a).prototype,
        h = {
          operator: { value: null },
          _refCount: { value: 0, writable: !0 },
          _subject: { value: null, writable: !0 },
          _connection: { value: null, writable: !0 },
          _subscribe: { value: p._subscribe },
          _isComplete: { value: p._isComplete, writable: !0 },
          getSubject: { value: p.getSubject },
          connect: { value: p.connect },
          refCount: { value: p.refCount },
        },
        f = (function (e) {
          function t(t, n) {
            e.call(this, t), (this.connectable = n);
          }
          return (
            Object(r.b)(t, e),
            (t.prototype._error = function (t) {
              this._unsubscribe(), e.prototype._error.call(this, t);
            }),
            (t.prototype._complete = function () {
              (this.connectable._isComplete = !0),
                this._unsubscribe(),
                e.prototype._complete.call(this);
            }),
            (t.prototype._unsubscribe = function () {
              var e = this.connectable;
              if (e) {
                this.connectable = null;
                var t = e._connection;
                (e._refCount = 0),
                  (e._subject = null),
                  (e._connection = null),
                  t && t.unsubscribe();
              }
            }),
            t
          );
        })(o.b);
      function d() {
        return new o.a();
      }
      t.a = function () {
        return (
          this,
          l()(
            ((e = d),
            function (t) {
              var n;
              n =
                "function" == typeof e
                  ? e
                  : function () {
                      return e;
                    };
              var r = Object.create(t, h);
              return (r.source = t), (r.subjectFactory = n), r;
            })(this)
          )
        );
        var e;
      };
    },
    V7AE: function (e, t, n) {
      "use strict";
      n.d(t, "a", function () {
        return o;
      });
      var r = n("xIGM").a.Symbol,
        o =
          "function" == typeof r && "function" == typeof r.for
            ? r.for("rxSubscriber")
            : "@@rxSubscriber";
    },
    YuZA: function (e, t) {
      function n(e) {
        return Promise.resolve().then(function () {
          throw new Error("Cannot find module '" + e + "'.");
        });
      }
      (n.keys = function () {
        return [];
      }),
        (n.resolve = n),
        (e.exports = n),
        (n.id = "YuZA");
    },
    ZwkM: function (e, t) {
      e.exports = function (e) {
        return (
          e.webpackPolyfill ||
            ((e.deprecate = function () {}),
            (e.paths = []),
            e.children || (e.children = []),
            Object.defineProperty(e, "loaded", {
              enumerable: !0,
              get: function () {
                return e.l;
              },
            }),
            Object.defineProperty(e, "id", {
              enumerable: !0,
              get: function () {
                return e.i;
              },
            }),
            (e.webpackPolyfill = 1)),
          e
        );
      };
    },
    cDNt: function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var r = n("LMZF"),
        o = function () {},
        i = function () {
          (this.title = "app"), (this.subtitle = "Whats up my homies");
        },
        a = n("6Xbx"),
        s = function () {},
        l = [
          "en",
          [
            ["a", "p"],
            ["AM", "PM"],
          ],
          [["AM", "PM"], ,],
          [
            ["S", "M", "T", "W", "T", "F", "S"],
            ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            [
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],
            ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
          ],
          ,
          [
            ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
            [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
            [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ],
          ],
          ,
          [
            ["B", "A"],
            ["BC", "AD"],
            ["Before Christ", "Anno Domini"],
          ],
          0,
          [6, 0],
          ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"],
          ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"],
          ["{1}, {0}", , "{1} 'at' {0}"],
          [
            ".",
            ",",
            ";",
            "%",
            "+",
            "-",
            "E",
            "\xd7",
            "\u2030",
            "\u221e",
            "NaN",
            ":",
          ],
          ["#,##0.###", "#,##0%", "\xa4#,##0.00", "#E0"],
          "$",
          "US Dollar",
          function (e) {
            var t = Math.floor(Math.abs(e)),
              n = e.toString().replace(/^[^.]*\.?/, "").length;
            return 1 === t && 0 === n ? 1 : 5;
          },
        ],
        u = {},
        c = (function () {
          var e = { Zero: 0, One: 1, Two: 2, Few: 3, Many: 4, Other: 5 };
          return (
            (e[e.Zero] = "Zero"),
            (e[e.One] = "One"),
            (e[e.Two] = "Two"),
            (e[e.Few] = "Few"),
            (e[e.Many] = "Many"),
            (e[e.Other] = "Other"),
            e
          );
        })(),
        p = new r.l("UseV4Plurals"),
        h = function () {},
        f = (function (e) {
          function t(t, n) {
            var r = e.call(this) || this;
            return (r.locale = t), (r.deprecatedPluralFn = n), r;
          }
          return (
            Object(a.b)(t, e),
            (t.prototype.getPluralCategory = function (e, t) {
              switch (
                this.deprecatedPluralFn
                  ? this.deprecatedPluralFn(t || this.locale, e)
                  : (function (e) {
                      return (function (e) {
                        var t = e.toLowerCase().replace(/_/g, "-"),
                          n = u[t];
                        if (n) return n;
                        var r = t.split("-")[0];
                        if ((n = u[r])) return n;
                        if ("en" === r) return l;
                        throw new Error(
                          'Missing locale data for the locale "' + e + '".'
                        );
                      })(e)[17];
                    })(t || this.locale)(e)
              ) {
                case c.Zero:
                  return "zero";
                case c.One:
                  return "one";
                case c.Two:
                  return "two";
                case c.Few:
                  return "few";
                case c.Many:
                  return "many";
                default:
                  return "other";
              }
            }),
            t
          );
        })(h),
        d = (function () {
          function e(e, t, n, r) {
            (this.$implicit = e),
              (this.ngForOf = t),
              (this.index = n),
              (this.count = r);
          }
          return (
            Object.defineProperty(e.prototype, "first", {
              get: function () {
                return 0 === this.index;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "last", {
              get: function () {
                return this.index === this.count - 1;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "even", {
              get: function () {
                return this.index % 2 == 0;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "odd", {
              get: function () {
                return !this.even;
              },
              enumerable: !0,
              configurable: !0,
            }),
            e
          );
        })(),
        y = (function () {
          function e(e, t, n) {
            (this._viewContainer = e),
              (this._template = t),
              (this._differs = n),
              (this._differ = null);
          }
          return (
            Object.defineProperty(e.prototype, "ngForTrackBy", {
              get: function () {
                return this._trackByFn;
              },
              set: function (e) {
                Object(r.L)() &&
                  null != e &&
                  "function" != typeof e &&
                  console &&
                  console.warn &&
                  console.warn(
                    "trackBy must be a function, but received " +
                      JSON.stringify(e) +
                      ". See https://angular.io/docs/ts/latest/api/common/index/NgFor-directive.html#!#change-propagation for more information."
                  ),
                  (this._trackByFn = e);
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "ngForTemplate", {
              set: function (e) {
                e && (this._template = e);
              },
              enumerable: !0,
              configurable: !0,
            }),
            (e.prototype.ngOnChanges = function (e) {
              if ("ngForOf" in e) {
                var t = e.ngForOf.currentValue;
                if (!this._differ && t)
                  try {
                    this._differ = this._differs
                      .find(t)
                      .create(this.ngForTrackBy);
                  } catch (e) {
                    throw new Error(
                      "Cannot find a differ supporting object '" +
                        t +
                        "' of type '" +
                        ((n = t).name || typeof n) +
                        "'. NgFor only supports binding to Iterables such as Arrays."
                    );
                  }
              }
              var n;
            }),
            (e.prototype.ngDoCheck = function () {
              if (this._differ) {
                var e = this._differ.diff(this.ngForOf);
                e && this._applyChanges(e);
              }
            }),
            (e.prototype._applyChanges = function (e) {
              var t = this,
                n = [];
              e.forEachOperation(function (e, r, o) {
                if (null == e.previousIndex) {
                  var i = t._viewContainer.createEmbeddedView(
                      t._template,
                      new d(null, t.ngForOf, -1, -1),
                      o
                    ),
                    a = new _(e, i);
                  n.push(a);
                } else null == o ? t._viewContainer.remove(r) : ((i = t._viewContainer.get(r)), t._viewContainer.move(i, o), (a = new _(e, i)), n.push(a));
              });
              for (var r = 0; r < n.length; r++)
                this._perViewChange(n[r].view, n[r].record);
              r = 0;
              for (var o = this._viewContainer.length; r < o; r++) {
                var i = this._viewContainer.get(r);
                (i.context.index = r), (i.context.count = o);
              }
              e.forEachIdentityChange(function (e) {
                t._viewContainer.get(e.currentIndex).context.$implicit = e.item;
              });
            }),
            (e.prototype._perViewChange = function (e, t) {
              e.context.$implicit = t.item;
            }),
            e
          );
        })(),
        _ = function (e, t) {
          (this.record = e), (this.view = t);
        },
        v = (function () {
          function e(e, t) {
            (this._viewContainer = e),
              (this._context = new b()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = t);
          }
          return (
            Object.defineProperty(e.prototype, "ngIf", {
              set: function (e) {
                (this._context.$implicit = this._context.ngIf = e),
                  this._updateView();
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "ngIfThen", {
              set: function (e) {
                (this._thenTemplateRef = e),
                  (this._thenViewRef = null),
                  this._updateView();
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "ngIfElse", {
              set: function (e) {
                (this._elseTemplateRef = e),
                  (this._elseViewRef = null),
                  this._updateView();
              },
              enumerable: !0,
              configurable: !0,
            }),
            (e.prototype._updateView = function () {
              this._context.$implicit
                ? this._thenViewRef ||
                  (this._viewContainer.clear(),
                  (this._elseViewRef = null),
                  this._thenTemplateRef &&
                    (this._thenViewRef = this._viewContainer.createEmbeddedView(
                      this._thenTemplateRef,
                      this._context
                    )))
                : this._elseViewRef ||
                  (this._viewContainer.clear(),
                  (this._thenViewRef = null),
                  this._elseTemplateRef &&
                    (this._elseViewRef = this._viewContainer.createEmbeddedView(
                      this._elseTemplateRef,
                      this._context
                    )));
            }),
            e
          );
        })(),
        b = function () {
          (this.$implicit = null), (this.ngIf = null);
        },
        g = function () {},
        m = new r.l("DocumentToken"),
        w = (function () {
          function e() {
            this.url = "";
          }
          return (
            (e.prototype.ngOnInit = function () {
              console.log("constructing grid-item");
              var e = this.name.codePointAt(0).toString(16);
              (this.url = "https://twemoji.maxcdn.com/72x72/" + e + ".png"),
                console.log(this.url);
            }),
            e
          );
        })(),
        C = r.T({
          encapsulation: 0,
          styles: [
            [".emojiImg[_ngcontent-%COMP%]{max-width:100%;max-height:100%}"],
          ],
          data: {},
        });
      function x(e) {
        return r._13(
          0,
          [
            (e()(), r._12(-1, null, ["\n  "])),
            (e()(), r._12(-1, null, ["\n  "])),
            (e()(),
            r.V(
              2,
              0,
              null,
              null,
              0,
              "img",
              [["class", "emojiImg"]],
              [
                [8, "src", 4],
                [8, "alt", 0],
              ],
              null,
              null,
              null,
              null
            )),
            (e()(), r._12(-1, null, ["\n"])),
          ],
          null,
          function (e, t) {
            var n = t.component;
            e(t, 2, 0, r.Y(1, "", n.url, ""), r.Y(1, "", n.name, ""));
          }
        );
      }
      n("AP4T"),
        n("Ecq+"),
        n("1j/l"),
        n("qgI0"),
        n("lI6h"),
        n("xIGM"),
        n("E9/g");
      var k = null;
      function S() {
        return k;
      }
      var E,
        j = {
          class: "className",
          innerHtml: "innerHTML",
          readonly: "readOnly",
          tabindex: "tabIndex",
        },
        T = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        A = {
          A: "1",
          B: "2",
          C: "3",
          D: "4",
          E: "5",
          F: "6",
          G: "7",
          H: "8",
          I: "9",
          J: "*",
          K: "+",
          M: "-",
          N: ".",
          O: "/",
          "`": "0",
          "\x90": "NumLock",
        };
      r.W.Node &&
        (E =
          r.W.Node.prototype.contains ||
          function (e) {
            return !!(16 & this.compareDocumentPosition(e));
          });
      var I,
        P = (function (e) {
          function t() {
            return (null !== e && e.apply(this, arguments)) || this;
          }
          return (
            Object(a.b)(t, e),
            (t.prototype.parse = function (e) {
              throw new Error("parse not implemented");
            }),
            (t.makeCurrent = function () {
              var e;
              (e = new t()), k || (k = e);
            }),
            (t.prototype.hasProperty = function (e, t) {
              return t in e;
            }),
            (t.prototype.setProperty = function (e, t, n) {
              e[t] = n;
            }),
            (t.prototype.getProperty = function (e, t) {
              return e[t];
            }),
            (t.prototype.invoke = function (e, t, n) {
              var r;
              (r = e)[t].apply(r, n);
            }),
            (t.prototype.logError = function (e) {
              window.console &&
                (console.error ? console.error(e) : console.log(e));
            }),
            (t.prototype.log = function (e) {
              window.console && window.console.log && window.console.log(e);
            }),
            (t.prototype.logGroup = function (e) {
              window.console && window.console.group && window.console.group(e);
            }),
            (t.prototype.logGroupEnd = function () {
              window.console &&
                window.console.groupEnd &&
                window.console.groupEnd();
            }),
            Object.defineProperty(t.prototype, "attrToPropMap", {
              get: function () {
                return j;
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.contains = function (e, t) {
              return E.call(e, t);
            }),
            (t.prototype.querySelector = function (e, t) {
              return e.querySelector(t);
            }),
            (t.prototype.querySelectorAll = function (e, t) {
              return e.querySelectorAll(t);
            }),
            (t.prototype.on = function (e, t, n) {
              e.addEventListener(t, n, !1);
            }),
            (t.prototype.onAndCancel = function (e, t, n) {
              return (
                e.addEventListener(t, n, !1),
                function () {
                  e.removeEventListener(t, n, !1);
                }
              );
            }),
            (t.prototype.dispatchEvent = function (e, t) {
              e.dispatchEvent(t);
            }),
            (t.prototype.createMouseEvent = function (e) {
              var t = this.getDefaultDocument().createEvent("MouseEvent");
              return t.initEvent(e, !0, !0), t;
            }),
            (t.prototype.createEvent = function (e) {
              var t = this.getDefaultDocument().createEvent("Event");
              return t.initEvent(e, !0, !0), t;
            }),
            (t.prototype.preventDefault = function (e) {
              e.preventDefault(), (e.returnValue = !1);
            }),
            (t.prototype.isPrevented = function (e) {
              return (
                e.defaultPrevented || (null != e.returnValue && !e.returnValue)
              );
            }),
            (t.prototype.getInnerHTML = function (e) {
              return e.innerHTML;
            }),
            (t.prototype.getTemplateContent = function (e) {
              return "content" in e && this.isTemplateElement(e)
                ? e.content
                : null;
            }),
            (t.prototype.getOuterHTML = function (e) {
              return e.outerHTML;
            }),
            (t.prototype.nodeName = function (e) {
              return e.nodeName;
            }),
            (t.prototype.nodeValue = function (e) {
              return e.nodeValue;
            }),
            (t.prototype.type = function (e) {
              return e.type;
            }),
            (t.prototype.content = function (e) {
              return this.hasProperty(e, "content") ? e.content : e;
            }),
            (t.prototype.firstChild = function (e) {
              return e.firstChild;
            }),
            (t.prototype.nextSibling = function (e) {
              return e.nextSibling;
            }),
            (t.prototype.parentElement = function (e) {
              return e.parentNode;
            }),
            (t.prototype.childNodes = function (e) {
              return e.childNodes;
            }),
            (t.prototype.childNodesAsList = function (e) {
              for (
                var t = e.childNodes, n = new Array(t.length), r = 0;
                r < t.length;
                r++
              )
                n[r] = t[r];
              return n;
            }),
            (t.prototype.clearNodes = function (e) {
              for (; e.firstChild; ) e.removeChild(e.firstChild);
            }),
            (t.prototype.appendChild = function (e, t) {
              e.appendChild(t);
            }),
            (t.prototype.removeChild = function (e, t) {
              e.removeChild(t);
            }),
            (t.prototype.replaceChild = function (e, t, n) {
              e.replaceChild(t, n);
            }),
            (t.prototype.remove = function (e) {
              return e.parentNode && e.parentNode.removeChild(e), e;
            }),
            (t.prototype.insertBefore = function (e, t, n) {
              e.insertBefore(n, t);
            }),
            (t.prototype.insertAllBefore = function (e, t, n) {
              n.forEach(function (n) {
                return e.insertBefore(n, t);
              });
            }),
            (t.prototype.insertAfter = function (e, t, n) {
              e.insertBefore(n, t.nextSibling);
            }),
            (t.prototype.setInnerHTML = function (e, t) {
              e.innerHTML = t;
            }),
            (t.prototype.getText = function (e) {
              return e.textContent;
            }),
            (t.prototype.setText = function (e, t) {
              e.textContent = t;
            }),
            (t.prototype.getValue = function (e) {
              return e.value;
            }),
            (t.prototype.setValue = function (e, t) {
              e.value = t;
            }),
            (t.prototype.getChecked = function (e) {
              return e.checked;
            }),
            (t.prototype.setChecked = function (e, t) {
              e.checked = t;
            }),
            (t.prototype.createComment = function (e) {
              return this.getDefaultDocument().createComment(e);
            }),
            (t.prototype.createTemplate = function (e) {
              var t = this.getDefaultDocument().createElement("template");
              return (t.innerHTML = e), t;
            }),
            (t.prototype.createElement = function (e, t) {
              return (t = t || this.getDefaultDocument()).createElement(e);
            }),
            (t.prototype.createElementNS = function (e, t, n) {
              return (n = n || this.getDefaultDocument()).createElementNS(e, t);
            }),
            (t.prototype.createTextNode = function (e, t) {
              return (t = t || this.getDefaultDocument()).createTextNode(e);
            }),
            (t.prototype.createScriptTag = function (e, t, n) {
              var r = (n = n || this.getDefaultDocument()).createElement(
                "SCRIPT"
              );
              return r.setAttribute(e, t), r;
            }),
            (t.prototype.createStyleElement = function (e, t) {
              var n = (t = t || this.getDefaultDocument()).createElement(
                "style"
              );
              return this.appendChild(n, this.createTextNode(e, t)), n;
            }),
            (t.prototype.createShadowRoot = function (e) {
              return e.createShadowRoot();
            }),
            (t.prototype.getShadowRoot = function (e) {
              return e.shadowRoot;
            }),
            (t.prototype.getHost = function (e) {
              return e.host;
            }),
            (t.prototype.clone = function (e) {
              return e.cloneNode(!0);
            }),
            (t.prototype.getElementsByClassName = function (e, t) {
              return e.getElementsByClassName(t);
            }),
            (t.prototype.getElementsByTagName = function (e, t) {
              return e.getElementsByTagName(t);
            }),
            (t.prototype.classList = function (e) {
              return Array.prototype.slice.call(e.classList, 0);
            }),
            (t.prototype.addClass = function (e, t) {
              e.classList.add(t);
            }),
            (t.prototype.removeClass = function (e, t) {
              e.classList.remove(t);
            }),
            (t.prototype.hasClass = function (e, t) {
              return e.classList.contains(t);
            }),
            (t.prototype.setStyle = function (e, t, n) {
              e.style[t] = n;
            }),
            (t.prototype.removeStyle = function (e, t) {
              e.style[t] = "";
            }),
            (t.prototype.getStyle = function (e, t) {
              return e.style[t];
            }),
            (t.prototype.hasStyle = function (e, t, n) {
              var r = this.getStyle(e, t) || "";
              return n ? r == n : r.length > 0;
            }),
            (t.prototype.tagName = function (e) {
              return e.tagName;
            }),
            (t.prototype.attributeMap = function (e) {
              for (
                var t = new Map(), n = e.attributes, r = 0;
                r < n.length;
                r++
              ) {
                var o = n.item(r);
                t.set(o.name, o.value);
              }
              return t;
            }),
            (t.prototype.hasAttribute = function (e, t) {
              return e.hasAttribute(t);
            }),
            (t.prototype.hasAttributeNS = function (e, t, n) {
              return e.hasAttributeNS(t, n);
            }),
            (t.prototype.getAttribute = function (e, t) {
              return e.getAttribute(t);
            }),
            (t.prototype.getAttributeNS = function (e, t, n) {
              return e.getAttributeNS(t, n);
            }),
            (t.prototype.setAttribute = function (e, t, n) {
              e.setAttribute(t, n);
            }),
            (t.prototype.setAttributeNS = function (e, t, n, r) {
              e.setAttributeNS(t, n, r);
            }),
            (t.prototype.removeAttribute = function (e, t) {
              e.removeAttribute(t);
            }),
            (t.prototype.removeAttributeNS = function (e, t, n) {
              e.removeAttributeNS(t, n);
            }),
            (t.prototype.templateAwareRoot = function (e) {
              return this.isTemplateElement(e) ? this.content(e) : e;
            }),
            (t.prototype.createHtmlDocument = function () {
              return document.implementation.createHTMLDocument("fakeTitle");
            }),
            (t.prototype.getDefaultDocument = function () {
              return document;
            }),
            (t.prototype.getBoundingClientRect = function (e) {
              try {
                return e.getBoundingClientRect();
              } catch (e) {
                return {
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  width: 0,
                  height: 0,
                };
              }
            }),
            (t.prototype.getTitle = function (e) {
              return e.title;
            }),
            (t.prototype.setTitle = function (e, t) {
              e.title = t || "";
            }),
            (t.prototype.elementMatches = function (e, t) {
              return (
                !!this.isElementNode(e) &&
                ((e.matches && e.matches(t)) ||
                  (e.msMatchesSelector && e.msMatchesSelector(t)) ||
                  (e.webkitMatchesSelector && e.webkitMatchesSelector(t)))
              );
            }),
            (t.prototype.isTemplateElement = function (e) {
              return this.isElementNode(e) && "TEMPLATE" === e.nodeName;
            }),
            (t.prototype.isTextNode = function (e) {
              return e.nodeType === Node.TEXT_NODE;
            }),
            (t.prototype.isCommentNode = function (e) {
              return e.nodeType === Node.COMMENT_NODE;
            }),
            (t.prototype.isElementNode = function (e) {
              return e.nodeType === Node.ELEMENT_NODE;
            }),
            (t.prototype.hasShadowRoot = function (e) {
              return null != e.shadowRoot && e instanceof HTMLElement;
            }),
            (t.prototype.isShadowRoot = function (e) {
              return e instanceof DocumentFragment;
            }),
            (t.prototype.importIntoDoc = function (e) {
              return document.importNode(this.templateAwareRoot(e), !0);
            }),
            (t.prototype.adoptNode = function (e) {
              return document.adoptNode(e);
            }),
            (t.prototype.getHref = function (e) {
              return e.getAttribute("href");
            }),
            (t.prototype.getEventKey = function (e) {
              var t = e.key;
              if (null == t) {
                if (null == (t = e.keyIdentifier)) return "Unidentified";
                t.startsWith("U+") &&
                  ((t = String.fromCharCode(parseInt(t.substring(2), 16))),
                  3 === e.location && A.hasOwnProperty(t) && (t = A[t]));
              }
              return T[t] || t;
            }),
            (t.prototype.getGlobalEventTarget = function (e, t) {
              return "window" === t
                ? window
                : "document" === t
                ? e
                : "body" === t
                ? e.body
                : null;
            }),
            (t.prototype.getHistory = function () {
              return window.history;
            }),
            (t.prototype.getLocation = function () {
              return window.location;
            }),
            (t.prototype.getBaseHref = function (e) {
              var t,
                n =
                  O || (O = document.querySelector("base"))
                    ? O.getAttribute("href")
                    : null;
              return null == n
                ? null
                : ((t = n),
                  I || (I = document.createElement("a")),
                  I.setAttribute("href", t),
                  "/" === I.pathname.charAt(0) ? I.pathname : "/" + I.pathname);
            }),
            (t.prototype.resetBaseElement = function () {
              O = null;
            }),
            (t.prototype.getUserAgent = function () {
              return window.navigator.userAgent;
            }),
            (t.prototype.setData = function (e, t, n) {
              this.setAttribute(e, "data-" + t, n);
            }),
            (t.prototype.getData = function (e, t) {
              return this.getAttribute(e, "data-" + t);
            }),
            (t.prototype.getComputedStyle = function (e) {
              return getComputedStyle(e);
            }),
            (t.prototype.supportsWebAnimation = function () {
              return "function" == typeof Element.prototype.animate;
            }),
            (t.prototype.performanceNow = function () {
              return window.performance && window.performance.now
                ? window.performance.now()
                : new Date().getTime();
            }),
            (t.prototype.supportsCookies = function () {
              return !0;
            }),
            (t.prototype.getCookie = function (e) {
              return (function (e, t) {
                t = encodeURIComponent(t);
                for (var n = 0, r = e.split(";"); n < r.length; n++) {
                  var o = r[n],
                    i = o.indexOf("="),
                    a = -1 == i ? [o, ""] : [o.slice(0, i), o.slice(i + 1)],
                    s = a[1];
                  if (a[0].trim() === t) return decodeURIComponent(s);
                }
                return null;
              })(document.cookie, e);
            }),
            (t.prototype.setCookie = function (e, t) {
              document.cookie =
                encodeURIComponent(e) + "=" + encodeURIComponent(t);
            }),
            t
          );
        })(
          (function (e) {
            function t() {
              var t = e.call(this) || this;
              (t._animationPrefix = null), (t._transitionEnd = null);
              try {
                var n = t.createElement("div", document);
                if (null != t.getStyle(n, "animationName"))
                  t._animationPrefix = "";
                else
                  for (
                    var r = ["Webkit", "Moz", "O", "ms"], o = 0;
                    o < r.length;
                    o++
                  )
                    if (null != t.getStyle(n, r[o] + "AnimationName")) {
                      t._animationPrefix = "-" + r[o].toLowerCase() + "-";
                      break;
                    }
                var i = {
                  WebkitTransition: "webkitTransitionEnd",
                  MozTransition: "transitionend",
                  OTransition: "oTransitionEnd otransitionend",
                  transition: "transitionend",
                };
                Object.keys(i).forEach(function (e) {
                  null != t.getStyle(n, e) && (t._transitionEnd = i[e]);
                });
              } catch (e) {
                (t._animationPrefix = null), (t._transitionEnd = null);
              }
              return t;
            }
            return (
              Object(a.b)(t, e),
              (t.prototype.getDistributedNodes = function (e) {
                return e.getDistributedNodes();
              }),
              (t.prototype.resolveAndSetHref = function (e, t, n) {
                e.href = null == n ? t : t + "/../" + n;
              }),
              (t.prototype.supportsDOMEvents = function () {
                return !0;
              }),
              (t.prototype.supportsNativeShadowDOM = function () {
                return "function" == typeof document.body.createShadowRoot;
              }),
              (t.prototype.getAnimationPrefix = function () {
                return this._animationPrefix ? this._animationPrefix : "";
              }),
              (t.prototype.getTransitionEnd = function () {
                return this._transitionEnd ? this._transitionEnd : "";
              }),
              (t.prototype.supportsAnimation = function () {
                return (
                  null != this._animationPrefix && null != this._transitionEnd
                );
              }),
              t
            );
          })(
            (function () {
              function e() {
                this.resourceLoaderType = null;
              }
              return (
                Object.defineProperty(e.prototype, "attrToPropMap", {
                  get: function () {
                    return this._attrToPropMap;
                  },
                  set: function (e) {
                    this._attrToPropMap = e;
                  },
                  enumerable: !0,
                  configurable: !0,
                }),
                e
              );
            })()
          )
        ),
        O = null,
        M = m;
      function N() {
        return !!window.history.pushState;
      }
      var R = (function (e) {
          function t(t) {
            var n = e.call(this) || this;
            return (n._doc = t), n._init(), n;
          }
          return (
            Object(a.b)(t, e),
            (t.prototype._init = function () {
              (this.location = S().getLocation()),
                (this._history = S().getHistory());
            }),
            (t.prototype.getBaseHrefFromDOM = function () {
              return S().getBaseHref(this._doc);
            }),
            (t.prototype.onPopState = function (e) {
              S()
                .getGlobalEventTarget(this._doc, "window")
                .addEventListener("popstate", e, !1);
            }),
            (t.prototype.onHashChange = function (e) {
              S()
                .getGlobalEventTarget(this._doc, "window")
                .addEventListener("hashchange", e, !1);
            }),
            Object.defineProperty(t.prototype, "pathname", {
              get: function () {
                return this.location.pathname;
              },
              set: function (e) {
                this.location.pathname = e;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "search", {
              get: function () {
                return this.location.search;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "hash", {
              get: function () {
                return this.location.hash;
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.pushState = function (e, t, n) {
              N() ? this._history.pushState(e, t, n) : (this.location.hash = n);
            }),
            (t.prototype.replaceState = function (e, t, n) {
              N()
                ? this._history.replaceState(e, t, n)
                : (this.location.hash = n);
            }),
            (t.prototype.forward = function () {
              this._history.forward();
            }),
            (t.prototype.back = function () {
              this._history.back();
            }),
            (t.ctorParameters = function () {
              return [{ type: void 0, decorators: [{ type: r.k, args: [M] }] }];
            }),
            t
          );
        })(s),
        D = (function () {
          function e(e) {
            (this._doc = e), (this._dom = S());
          }
          return (
            (e.prototype.addTag = function (e, t) {
              return (
                void 0 === t && (t = !1),
                e ? this._getOrCreateElement(e, t) : null
              );
            }),
            (e.prototype.addTags = function (e, t) {
              var n = this;
              return (
                void 0 === t && (t = !1),
                e
                  ? e.reduce(function (e, r) {
                      return r && e.push(n._getOrCreateElement(r, t)), e;
                    }, [])
                  : []
              );
            }),
            (e.prototype.getTag = function (e) {
              return (
                (e && this._dom.querySelector(this._doc, "meta[" + e + "]")) ||
                null
              );
            }),
            (e.prototype.getTags = function (e) {
              if (!e) return [];
              var t = this._dom.querySelectorAll(this._doc, "meta[" + e + "]");
              return t ? [].slice.call(t) : [];
            }),
            (e.prototype.updateTag = function (e, t) {
              if (!e) return null;
              t = t || this._parseSelector(e);
              var n = this.getTag(t);
              return n
                ? this._setMetaElementAttributes(e, n)
                : this._getOrCreateElement(e, !0);
            }),
            (e.prototype.removeTag = function (e) {
              this.removeTagElement(this.getTag(e));
            }),
            (e.prototype.removeTagElement = function (e) {
              e && this._dom.remove(e);
            }),
            (e.prototype._getOrCreateElement = function (e, t) {
              if ((void 0 === t && (t = !1), !t)) {
                var n = this._parseSelector(e),
                  r = this.getTag(n);
                if (r && this._containsAttributes(e, r)) return r;
              }
              var o = this._dom.createElement("meta");
              this._setMetaElementAttributes(e, o);
              var i = this._dom.getElementsByTagName(this._doc, "head")[0];
              return this._dom.appendChild(i, o), o;
            }),
            (e.prototype._setMetaElementAttributes = function (e, t) {
              var n = this;
              return (
                Object.keys(e).forEach(function (r) {
                  return n._dom.setAttribute(t, r, e[r]);
                }),
                t
              );
            }),
            (e.prototype._parseSelector = function (e) {
              var t = e.name ? "name" : "property";
              return t + '="' + e[t] + '"';
            }),
            (e.prototype._containsAttributes = function (e, t) {
              var n = this;
              return Object.keys(e).every(function (r) {
                return n._dom.getAttribute(t, r) === e[r];
              });
            }),
            e
          );
        })(),
        B = new r.l("TRANSITION_ID"),
        V = [
          {
            provide: r.b,
            useFactory: function (e, t, n) {
              return function () {
                n.get(r.c).donePromise.then(function () {
                  var n = S();
                  Array.prototype.slice
                    .apply(n.querySelectorAll(t, "style[ng-transition]"))
                    .filter(function (t) {
                      return n.getAttribute(t, "ng-transition") === e;
                    })
                    .forEach(function (e) {
                      return n.remove(e);
                    });
                });
              };
            },
            deps: [B, M, r.m],
            multi: !0,
          },
        ],
        z = (function () {
          function e() {}
          return (
            (e.init = function () {
              Object(r.N)(new e());
            }),
            (e.prototype.addToWindow = function (e) {
              (r.W.getAngularTestability = function (t, n) {
                void 0 === n && (n = !0);
                var r = e.findTestabilityInTree(t, n);
                if (null == r)
                  throw new Error("Could not find testability for element.");
                return r;
              }),
                (r.W.getAllAngularTestabilities = function () {
                  return e.getAllTestabilities();
                }),
                (r.W.getAllAngularRootElements = function () {
                  return e.getAllRootElements();
                }),
                r.W.frameworkStabilizers || (r.W.frameworkStabilizers = []),
                r.W.frameworkStabilizers.push(function (e) {
                  var t = r.W.getAllAngularTestabilities(),
                    n = t.length,
                    o = !1,
                    i = function (t) {
                      (o = o || t), 0 == --n && e(o);
                    };
                  t.forEach(function (e) {
                    e.whenStable(i);
                  });
                });
            }),
            (e.prototype.findTestabilityInTree = function (e, t, n) {
              if (null == t) return null;
              var r = e.getTestability(t);
              return null != r
                ? r
                : n
                ? S().isShadowRoot(t)
                  ? this.findTestabilityInTree(e, S().getHost(t), !0)
                  : this.findTestabilityInTree(e, S().parentElement(t), !0)
                : null;
            }),
            e
          );
        })(),
        F = (function () {
          function e(e) {
            this._doc = e;
          }
          return (
            (e.prototype.getTitle = function () {
              return S().getTitle(this._doc);
            }),
            (e.prototype.setTitle = function (e) {
              S().setTitle(this._doc, e);
            }),
            e
          );
        })();
      function L(e, t) {
        ("undefined" != typeof COMPILED && COMPILED) ||
          ((r.W.ng = r.W.ng || {})[e] = t);
      }
      var H = { ApplicationRef: r.e, NgZone: r.s };
      function U(e) {
        return Object(r.K)(e);
      }
      var W = new r.l("EventManagerPlugins"),
        G = (function () {
          function e(e, t) {
            var n = this;
            (this._zone = t),
              (this._eventNameToPlugin = new Map()),
              e.forEach(function (e) {
                return (e.manager = n);
              }),
              (this._plugins = e.slice().reverse());
          }
          return (
            (e.prototype.addEventListener = function (e, t, n) {
              return this._findPluginFor(t).addEventListener(e, t, n);
            }),
            (e.prototype.addGlobalEventListener = function (e, t, n) {
              return this._findPluginFor(t).addGlobalEventListener(e, t, n);
            }),
            (e.prototype.getZone = function () {
              return this._zone;
            }),
            (e.prototype._findPluginFor = function (e) {
              var t = this._eventNameToPlugin.get(e);
              if (t) return t;
              for (var n = this._plugins, r = 0; r < n.length; r++) {
                var o = n[r];
                if (o.supports(e)) return this._eventNameToPlugin.set(e, o), o;
              }
              throw new Error("No event manager plugin found for event " + e);
            }),
            e
          );
        })(),
        q = (function () {
          function e(e) {
            this._doc = e;
          }
          return (
            (e.prototype.addGlobalEventListener = function (e, t, n) {
              var r = S().getGlobalEventTarget(this._doc, e);
              if (!r)
                throw new Error(
                  "Unsupported event target " + r + " for event " + t
                );
              return this.addEventListener(r, t, n);
            }),
            e
          );
        })(),
        Z = (function () {
          function e() {
            this._stylesSet = new Set();
          }
          return (
            (e.prototype.addStyles = function (e) {
              var t = this,
                n = new Set();
              e.forEach(function (e) {
                t._stylesSet.has(e) || (t._stylesSet.add(e), n.add(e));
              }),
                this.onStylesAdded(n);
            }),
            (e.prototype.onStylesAdded = function (e) {}),
            (e.prototype.getAllStyles = function () {
              return Array.from(this._stylesSet);
            }),
            e
          );
        })(),
        Q = (function (e) {
          function t(t) {
            var n = e.call(this) || this;
            return (
              (n._doc = t),
              (n._hostNodes = new Set()),
              (n._styleNodes = new Set()),
              n._hostNodes.add(t.head),
              n
            );
          }
          return (
            Object(a.b)(t, e),
            (t.prototype._addStylesToHost = function (e, t) {
              var n = this;
              e.forEach(function (e) {
                var r = n._doc.createElement("style");
                (r.textContent = e), n._styleNodes.add(t.appendChild(r));
              });
            }),
            (t.prototype.addHost = function (e) {
              this._addStylesToHost(this._stylesSet, e), this._hostNodes.add(e);
            }),
            (t.prototype.removeHost = function (e) {
              this._hostNodes.delete(e);
            }),
            (t.prototype.onStylesAdded = function (e) {
              var t = this;
              this._hostNodes.forEach(function (n) {
                return t._addStylesToHost(e, n);
              });
            }),
            (t.prototype.ngOnDestroy = function () {
              this._styleNodes.forEach(function (e) {
                return S().remove(e);
              });
            }),
            t
          );
        })(Z),
        K = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
        },
        $ = /%COMP%/g,
        J = "_nghost-%COMP%",
        Y = "_ngcontent-%COMP%";
      function X(e, t, n) {
        for (var r = 0; r < t.length; r++) {
          var o = t[r];
          Array.isArray(o) ? X(e, o, n) : ((o = o.replace($, e)), n.push(o));
        }
        return n;
      }
      function ee(e) {
        return function (t) {
          !1 === e(t) && (t.preventDefault(), (t.returnValue = !1));
        };
      }
      var te = (function () {
          function e(e, t) {
            (this.eventManager = e),
              (this.sharedStylesHost = t),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new ne(e));
          }
          return (
            (e.prototype.createRenderer = function (e, t) {
              if (!e || !t) return this.defaultRenderer;
              switch (t.encapsulation) {
                case r.F.Emulated:
                  var n = this.rendererByCompId.get(t.id);
                  return (
                    n ||
                      ((n = new ae(
                        this.eventManager,
                        this.sharedStylesHost,
                        t
                      )),
                      this.rendererByCompId.set(t.id, n)),
                    n.applyToHost(e),
                    n
                  );
                case r.F.Native:
                  return new se(this.eventManager, this.sharedStylesHost, e, t);
                default:
                  if (!this.rendererByCompId.has(t.id)) {
                    var o = X(t.id, t.styles, []);
                    this.sharedStylesHost.addStyles(o),
                      this.rendererByCompId.set(t.id, this.defaultRenderer);
                  }
                  return this.defaultRenderer;
              }
            }),
            (e.prototype.begin = function () {}),
            (e.prototype.end = function () {}),
            e
          );
        })(),
        ne = (function () {
          function e(e) {
            (this.eventManager = e), (this.data = Object.create(null));
          }
          return (
            (e.prototype.destroy = function () {}),
            (e.prototype.createElement = function (e, t) {
              return t
                ? document.createElementNS(K[t], e)
                : document.createElement(e);
            }),
            (e.prototype.createComment = function (e) {
              return document.createComment(e);
            }),
            (e.prototype.createText = function (e) {
              return document.createTextNode(e);
            }),
            (e.prototype.appendChild = function (e, t) {
              e.appendChild(t);
            }),
            (e.prototype.insertBefore = function (e, t, n) {
              e && e.insertBefore(t, n);
            }),
            (e.prototype.removeChild = function (e, t) {
              e && e.removeChild(t);
            }),
            (e.prototype.selectRootElement = function (e) {
              var t = "string" == typeof e ? document.querySelector(e) : e;
              if (!t)
                throw new Error(
                  'The selector "' + e + '" did not match any elements'
                );
              return (t.textContent = ""), t;
            }),
            (e.prototype.parentNode = function (e) {
              return e.parentNode;
            }),
            (e.prototype.nextSibling = function (e) {
              return e.nextSibling;
            }),
            (e.prototype.setAttribute = function (e, t, n, r) {
              if (r) {
                t = r + ":" + t;
                var o = K[r];
                o ? e.setAttributeNS(o, t, n) : e.setAttribute(t, n);
              } else e.setAttribute(t, n);
            }),
            (e.prototype.removeAttribute = function (e, t, n) {
              if (n) {
                var r = K[n];
                r ? e.removeAttributeNS(r, t) : e.removeAttribute(n + ":" + t);
              } else e.removeAttribute(t);
            }),
            (e.prototype.addClass = function (e, t) {
              e.classList.add(t);
            }),
            (e.prototype.removeClass = function (e, t) {
              e.classList.remove(t);
            }),
            (e.prototype.setStyle = function (e, t, n, o) {
              o & r.y.DashCase
                ? e.style.setProperty(
                    t,
                    n,
                    o & r.y.Important ? "important" : ""
                  )
                : (e.style[t] = n);
            }),
            (e.prototype.removeStyle = function (e, t, n) {
              n & r.y.DashCase ? e.style.removeProperty(t) : (e.style[t] = "");
            }),
            (e.prototype.setProperty = function (e, t, n) {
              oe(t, "property"), (e[t] = n);
            }),
            (e.prototype.setValue = function (e, t) {
              e.nodeValue = t;
            }),
            (e.prototype.listen = function (e, t, n) {
              return (
                oe(t, "listener"),
                "string" == typeof e
                  ? this.eventManager.addGlobalEventListener(e, t, ee(n))
                  : this.eventManager.addEventListener(e, t, ee(n))
              );
            }),
            e
          );
        })(),
        re = "@".charCodeAt(0);
      function oe(e, t) {
        if (e.charCodeAt(0) === re)
          throw new Error(
            "Found the synthetic " +
              t +
              " " +
              e +
              '. Please include either "BrowserAnimationsModule" or "NoopAnimationsModule" in your application.'
          );
      }
      var ie,
        ae = (function (e) {
          function t(t, n, r) {
            var o = e.call(this, t) || this;
            o.component = r;
            var i = X(r.id, r.styles, []);
            return (
              n.addStyles(i),
              (o.contentAttr = Y.replace($, r.id)),
              (o.hostAttr = J.replace($, r.id)),
              o
            );
          }
          return (
            Object(a.b)(t, e),
            (t.prototype.applyToHost = function (t) {
              e.prototype.setAttribute.call(this, t, this.hostAttr, "");
            }),
            (t.prototype.createElement = function (t, n) {
              var r = e.prototype.createElement.call(this, t, n);
              return (
                e.prototype.setAttribute.call(this, r, this.contentAttr, ""), r
              );
            }),
            t
          );
        })(ne),
        se = (function (e) {
          function t(t, n, r, o) {
            var i = e.call(this, t) || this;
            (i.sharedStylesHost = n),
              (i.hostEl = r),
              (i.component = o),
              (i.shadowRoot = r.createShadowRoot()),
              i.sharedStylesHost.addHost(i.shadowRoot);
            for (var a = X(o.id, o.styles, []), s = 0; s < a.length; s++) {
              var l = document.createElement("style");
              (l.textContent = a[s]), i.shadowRoot.appendChild(l);
            }
            return i;
          }
          return (
            Object(a.b)(t, e),
            (t.prototype.nodeOrShadowRoot = function (e) {
              return e === this.hostEl ? this.shadowRoot : e;
            }),
            (t.prototype.destroy = function () {
              this.sharedStylesHost.removeHost(this.shadowRoot);
            }),
            (t.prototype.appendChild = function (t, n) {
              return e.prototype.appendChild.call(
                this,
                this.nodeOrShadowRoot(t),
                n
              );
            }),
            (t.prototype.insertBefore = function (t, n, r) {
              return e.prototype.insertBefore.call(
                this,
                this.nodeOrShadowRoot(t),
                n,
                r
              );
            }),
            (t.prototype.removeChild = function (t, n) {
              return e.prototype.removeChild.call(
                this,
                this.nodeOrShadowRoot(t),
                n
              );
            }),
            (t.prototype.parentNode = function (t) {
              return this.nodeOrShadowRoot(
                e.prototype.parentNode.call(this, this.nodeOrShadowRoot(t))
              );
            }),
            t
          );
        })(ne),
        le =
          ("undefined" != typeof Zone && Zone.__symbol__) ||
          function (e) {
            return "__zone_symbol__" + e;
          },
        ue = le("addEventListener"),
        ce = le("removeEventListener"),
        pe = {},
        he = "__zone_symbol__propagationStopped";
      "undefined" != typeof Zone &&
        Zone[le("BLACK_LISTED_EVENTS")] &&
        (ie = {});
      var fe = function (e) {
          return !!ie && ie.hasOwnProperty(e);
        },
        de = function (e) {
          var t = pe[e.type];
          if (t) {
            var n = this[t];
            if (n) {
              var r = [e];
              if (1 === n.length)
                return (a = n[0]).zone !== Zone.current
                  ? a.zone.run(a.handler, this, r)
                  : a.handler.apply(this, r);
              for (
                var o = n.slice(), i = 0;
                i < o.length && !0 !== e[he];
                i++
              ) {
                var a;
                (a = o[i]).zone !== Zone.current
                  ? a.zone.run(a.handler, this, r)
                  : a.handler.apply(this, r);
              }
            }
          }
        },
        ye = (function (e) {
          function t(t, n) {
            var r = e.call(this, t) || this;
            return (r.ngZone = n), r.patchEvent(), r;
          }
          return (
            Object(a.b)(t, e),
            (t.prototype.patchEvent = function () {
              if (
                Event &&
                Event.prototype &&
                !Event.prototype.__zone_symbol__stopImmediatePropagation
              ) {
                var e =
                  (Event.prototype.__zone_symbol__stopImmediatePropagation =
                    Event.prototype.stopImmediatePropagation);
                Event.prototype.stopImmediatePropagation = function () {
                  this && (this[he] = !0), e && e.apply(this, arguments);
                };
              }
            }),
            (t.prototype.supports = function (e) {
              return !0;
            }),
            (t.prototype.addEventListener = function (e, t, n) {
              var o = this,
                i = n;
              if (!e[ue] || (r.s.isInAngularZone() && !fe(t)))
                e.addEventListener(t, i, !1);
              else {
                var a = pe[t];
                a || (a = pe[t] = le("ANGULAR" + t + "FALSE"));
                var s = e[a],
                  l = s && s.length > 0;
                s || (s = e[a] = []);
                var u = fe(t) ? Zone.root : Zone.current;
                if (0 === s.length) s.push({ zone: u, handler: i });
                else {
                  for (var c = !1, p = 0; p < s.length; p++)
                    if (s[p].handler === i) {
                      c = !0;
                      break;
                    }
                  c || s.push({ zone: u, handler: i });
                }
                l || e[ue](t, de, !1);
              }
              return function () {
                return o.removeEventListener(e, t, i);
              };
            }),
            (t.prototype.removeEventListener = function (e, t, n) {
              var r = e[ce];
              if (!r) return e.removeEventListener.apply(e, [t, n, !1]);
              var o = pe[t],
                i = o && e[o];
              if (!i) return e.removeEventListener.apply(e, [t, n, !1]);
              for (var a = !1, s = 0; s < i.length; s++)
                if (i[s].handler === n) {
                  (a = !0), i.splice(s, 1);
                  break;
                }
              a
                ? 0 === i.length && r.apply(e, [t, de, !1])
                : e.removeEventListener.apply(e, [t, n, !1]);
            }),
            t
          );
        })(q),
        _e = {
          pan: !0,
          panstart: !0,
          panmove: !0,
          panend: !0,
          pancancel: !0,
          panleft: !0,
          panright: !0,
          panup: !0,
          pandown: !0,
          pinch: !0,
          pinchstart: !0,
          pinchmove: !0,
          pinchend: !0,
          pinchcancel: !0,
          pinchin: !0,
          pinchout: !0,
          press: !0,
          pressup: !0,
          rotate: !0,
          rotatestart: !0,
          rotatemove: !0,
          rotateend: !0,
          rotatecancel: !0,
          swipe: !0,
          swipeleft: !0,
          swiperight: !0,
          swipeup: !0,
          swipedown: !0,
          tap: !0,
        },
        ve = new r.l("HammerGestureConfig"),
        be = (function () {
          function e() {
            (this.events = []), (this.overrides = {});
          }
          return (
            (e.prototype.buildHammer = function (e) {
              var t = new Hammer(e);
              for (var n in (t.get("pinch").set({ enable: !0 }),
              t.get("rotate").set({ enable: !0 }),
              this.overrides))
                t.get(n).set(this.overrides[n]);
              return t;
            }),
            e
          );
        })(),
        ge = (function (e) {
          function t(t, n) {
            var r = e.call(this, t) || this;
            return (r._config = n), r;
          }
          return (
            Object(a.b)(t, e),
            (t.prototype.supports = function (e) {
              if (!_e.hasOwnProperty(e.toLowerCase()) && !this.isCustomEvent(e))
                return !1;
              if (!window.Hammer)
                throw new Error(
                  "Hammer.js is not loaded, can not bind " + e + " event"
                );
              return !0;
            }),
            (t.prototype.addEventListener = function (e, t, n) {
              var r = this,
                o = this.manager.getZone();
              return (
                (t = t.toLowerCase()),
                o.runOutsideAngular(function () {
                  var i = r._config.buildHammer(e),
                    a = function (e) {
                      o.runGuarded(function () {
                        n(e);
                      });
                    };
                  return (
                    i.on(t, a),
                    function () {
                      return i.off(t, a);
                    }
                  );
                })
              );
            }),
            (t.prototype.isCustomEvent = function (e) {
              return this._config.events.indexOf(e) > -1;
            }),
            t
          );
        })(q),
        me = ["alt", "control", "meta", "shift"],
        we = {
          alt: function (e) {
            return e.altKey;
          },
          control: function (e) {
            return e.ctrlKey;
          },
          meta: function (e) {
            return e.metaKey;
          },
          shift: function (e) {
            return e.shiftKey;
          },
        },
        Ce = (function (e) {
          function t(t) {
            return e.call(this, t) || this;
          }
          return (
            Object(a.b)(t, e),
            (t.prototype.supports = function (e) {
              return null != t.parseEventName(e);
            }),
            (t.prototype.addEventListener = function (e, n, r) {
              var o = t.parseEventName(n),
                i = t.eventCallback(o.fullKey, r, this.manager.getZone());
              return this.manager.getZone().runOutsideAngular(function () {
                return S().onAndCancel(e, o.domEventName, i);
              });
            }),
            (t.parseEventName = function (e) {
              var n = e.toLowerCase().split("."),
                r = n.shift();
              if (0 === n.length || ("keydown" !== r && "keyup" !== r))
                return null;
              var o = t._normalizeKey(n.pop()),
                i = "";
              if (
                (me.forEach(function (e) {
                  var t = n.indexOf(e);
                  t > -1 && (n.splice(t, 1), (i += e + "."));
                }),
                (i += o),
                0 != n.length || 0 === o.length)
              )
                return null;
              var a = {};
              return (a.domEventName = r), (a.fullKey = i), a;
            }),
            (t.getEventFullKey = function (e) {
              var t = "",
                n = S().getEventKey(e);
              return (
                " " === (n = n.toLowerCase())
                  ? (n = "space")
                  : "." === n && (n = "dot"),
                me.forEach(function (r) {
                  r != n && (0, we[r])(e) && (t += r + ".");
                }),
                (t += n)
              );
            }),
            (t.eventCallback = function (e, n, r) {
              return function (o) {
                t.getEventFullKey(o) === e &&
                  r.runGuarded(function () {
                    return n(o);
                  });
              };
            }),
            (t._normalizeKey = function (e) {
              switch (e) {
                case "esc":
                  return "escape";
                default:
                  return e;
              }
            }),
            t
          );
        })(q),
        xe = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi,
        ke =
          /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;
      function Se(e) {
        return (e = String(e)).match(xe) || e.match(ke)
          ? e
          : (Object(r.L)() &&
              S().log(
                "WARNING: sanitizing unsafe URL value " +
                  e +
                  " (see http://g.co/ng/security#xss)"
              ),
            "unsafe:" + e);
      }
      var Ee = null,
        je = null;
      function Te(e) {
        for (var t = {}, n = 0, r = e.split(","); n < r.length; n++)
          t[r[n]] = !0;
        return t;
      }
      function Ae() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        for (var n = {}, r = 0, o = e; r < o.length; r++) {
          var i = o[r];
          for (var a in i) i.hasOwnProperty(a) && (n[a] = !0);
        }
        return n;
      }
      var Ie = Te("area,br,col,hr,img,wbr"),
        Pe = Te("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
        Oe = Te("rp,rt"),
        Me = Ae(Oe, Pe),
        Ne = Ae(
          Ie,
          Ae(
            Pe,
            Te(
              "address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul"
            )
          ),
          Ae(
            Oe,
            Te(
              "a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video"
            )
          ),
          Me
        ),
        Re = Te("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),
        De = Te("srcset"),
        Be = Ae(
          Re,
          De,
          Te(
            "abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"
          )
        ),
        Ve = (function () {
          function e() {
            (this.sanitizedSomething = !1), (this.buf = []);
          }
          return (
            (e.prototype.sanitizeChildren = function (e) {
              for (var t = e.firstChild; t; )
                if (
                  (je.isElementNode(t)
                    ? this.startElement(t)
                    : je.isTextNode(t)
                    ? this.chars(je.nodeValue(t))
                    : (this.sanitizedSomething = !0),
                  je.firstChild(t))
                )
                  t = je.firstChild(t);
                else
                  for (; t; ) {
                    je.isElementNode(t) && this.endElement(t);
                    var n = ze(t, je.nextSibling(t));
                    if (n) {
                      t = n;
                      break;
                    }
                    t = ze(t, je.parentElement(t));
                  }
              return this.buf.join("");
            }),
            (e.prototype.startElement = function (e) {
              var t = this,
                n = je.nodeName(e).toLowerCase();
              Ne.hasOwnProperty(n)
                ? (this.buf.push("<"),
                  this.buf.push(n),
                  je.attributeMap(e).forEach(function (e, n) {
                    var r,
                      o = n.toLowerCase();
                    Be.hasOwnProperty(o)
                      ? (Re[o] && (e = Se(e)),
                        De[o] &&
                          ((r = e),
                          (e = (r = String(r))
                            .split(",")
                            .map(function (e) {
                              return Se(e.trim());
                            })
                            .join(", "))),
                        t.buf.push(" "),
                        t.buf.push(n),
                        t.buf.push('="'),
                        t.buf.push(He(e)),
                        t.buf.push('"'))
                      : (t.sanitizedSomething = !0);
                  }),
                  this.buf.push(">"))
                : (this.sanitizedSomething = !0);
            }),
            (e.prototype.endElement = function (e) {
              var t = je.nodeName(e).toLowerCase();
              Ne.hasOwnProperty(t) &&
                !Ie.hasOwnProperty(t) &&
                (this.buf.push("</"), this.buf.push(t), this.buf.push(">"));
            }),
            (e.prototype.chars = function (e) {
              this.buf.push(He(e));
            }),
            e
          );
        })();
      function ze(e, t) {
        if (t && je.contains(e, t))
          throw new Error(
            "Failed to sanitize html because the element is clobbered: " +
              je.getOuterHTML(e)
          );
        return t;
      }
      var Fe = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
        Le = /([^\#-~ |!])/g;
      function He(e) {
        return e
          .replace(/&/g, "&amp;")
          .replace(Fe, function (e) {
            return (
              "&#" +
              (1024 * (e.charCodeAt(0) - 55296) +
                (e.charCodeAt(1) - 56320) +
                65536) +
              ";"
            );
          })
          .replace(Le, function (e) {
            return "&#" + e.charCodeAt(0) + ";";
          })
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
      }
      function Ue(e) {
        je.attributeMap(e).forEach(function (t, n) {
          ("xmlns:ns1" !== n && 0 !== n.indexOf("ns1:")) ||
            je.removeAttribute(e, n);
        });
        for (var t = 0, n = je.childNodesAsList(e); t < n.length; t++) {
          var r = n[t];
          je.isElementNode(r) && Ue(r);
        }
      }
      var We = new RegExp(
          "^([-,.\"'%_!# a-zA-Z0-9]+|(?:(?:matrix|translate|scale|rotate|skew|perspective)(?:X|Y|3d)?|(?:rgb|hsl)a?|(?:repeating-)?(?:linear|radial)-gradient|(?:calc|attr))\\([-0-9.%, #a-zA-Z]+\\))$",
          "g"
        ),
        Ge = /^url\(([^)]+)\)$/,
        qe = function () {},
        Ze = (function (e) {
          function t(t) {
            var n = e.call(this) || this;
            return (n._doc = t), n;
          }
          return (
            Object(a.b)(t, e),
            (t.prototype.sanitize = function (e, t) {
              if (null == t) return null;
              switch (e) {
                case r.A.NONE:
                  return t;
                case r.A.HTML:
                  return t instanceof Ke
                    ? t.changingThisBreaksApplicationSecurity
                    : (this.checkNotSafeValue(t, "HTML"),
                      (function (e, t) {
                        try {
                          var n = (function () {
                              if (Ee) return Ee;
                              var e = (je = S()).createElement("template");
                              if ("content" in e) return e;
                              var t = je.createHtmlDocument();
                              if (null == (Ee = je.querySelector(t, "body"))) {
                                var n = je.createElement("html", t);
                                (Ee = je.createElement("body", t)),
                                  je.appendChild(n, Ee),
                                  je.appendChild(t, n);
                              }
                              return Ee;
                            })(),
                            o = t ? String(t) : "",
                            i = 5,
                            a = o;
                          do {
                            if (0 === i)
                              throw new Error(
                                "Failed to sanitize html because the input is unstable"
                              );
                            i--,
                              je.setInnerHTML(n, (o = a)),
                              e.documentMode && Ue(n),
                              (a = je.getInnerHTML(n));
                          } while (o !== a);
                          for (
                            var s = new Ve(),
                              l = s.sanitizeChildren(
                                je.getTemplateContent(n) || n
                              ),
                              u = je.getTemplateContent(n) || n,
                              c = 0,
                              p = je.childNodesAsList(u);
                            c < p.length;
                            c++
                          )
                            je.removeChild(u, p[c]);
                          return (
                            Object(r.L)() &&
                              s.sanitizedSomething &&
                              je.log(
                                "WARNING: sanitizing HTML stripped some content (see http://g.co/ng/security#xss)."
                              ),
                            l
                          );
                        } catch (e) {
                          throw ((Ee = null), e);
                        }
                      })(this._doc, String(t)));
                case r.A.STYLE:
                  return t instanceof $e
                    ? t.changingThisBreaksApplicationSecurity
                    : (this.checkNotSafeValue(t, "Style"),
                      (function (e) {
                        if (!(e = String(e).trim())) return "";
                        var t = e.match(Ge);
                        return (t && Se(t[1]) === t[1]) ||
                          (e.match(We) &&
                            (function (e) {
                              for (
                                var t = !0, n = !0, r = 0;
                                r < e.length;
                                r++
                              ) {
                                var o = e.charAt(r);
                                "'" === o && n
                                  ? (t = !t)
                                  : '"' === o && t && (n = !n);
                              }
                              return t && n;
                            })(e))
                          ? e
                          : (Object(r.L)() &&
                              S().log(
                                "WARNING: sanitizing unsafe style value " +
                                  e +
                                  " (see http://g.co/ng/security#xss)."
                              ),
                            "unsafe");
                      })(t));
                case r.A.SCRIPT:
                  if (t instanceof Je)
                    return t.changingThisBreaksApplicationSecurity;
                  throw (
                    (this.checkNotSafeValue(t, "Script"),
                    new Error("unsafe value used in a script context"))
                  );
                case r.A.URL:
                  return t instanceof Xe || t instanceof Ye
                    ? t.changingThisBreaksApplicationSecurity
                    : (this.checkNotSafeValue(t, "URL"), Se(String(t)));
                case r.A.RESOURCE_URL:
                  if (t instanceof Xe)
                    return t.changingThisBreaksApplicationSecurity;
                  throw (
                    (this.checkNotSafeValue(t, "ResourceURL"),
                    new Error(
                      "unsafe value used in a resource URL context (see http://g.co/ng/security#xss)"
                    ))
                  );
                default:
                  throw new Error(
                    "Unexpected SecurityContext " +
                      e +
                      " (see http://g.co/ng/security#xss)"
                  );
              }
            }),
            (t.prototype.checkNotSafeValue = function (e, t) {
              if (e instanceof Qe)
                throw new Error(
                  "Required a safe " +
                    t +
                    ", got a " +
                    e.getTypeName() +
                    " (see http://g.co/ng/security#xss)"
                );
            }),
            (t.prototype.bypassSecurityTrustHtml = function (e) {
              return new Ke(e);
            }),
            (t.prototype.bypassSecurityTrustStyle = function (e) {
              return new $e(e);
            }),
            (t.prototype.bypassSecurityTrustScript = function (e) {
              return new Je(e);
            }),
            (t.prototype.bypassSecurityTrustUrl = function (e) {
              return new Ye(e);
            }),
            (t.prototype.bypassSecurityTrustResourceUrl = function (e) {
              return new Xe(e);
            }),
            t
          );
        })(qe),
        Qe = (function () {
          function e(e) {
            this.changingThisBreaksApplicationSecurity = e;
          }
          return (
            (e.prototype.toString = function () {
              return (
                "SafeValue must use [property]=binding: " +
                this.changingThisBreaksApplicationSecurity +
                " (see http://g.co/ng/security#xss)"
              );
            }),
            e
          );
        })(),
        Ke = (function (e) {
          function t() {
            return (null !== e && e.apply(this, arguments)) || this;
          }
          return (
            Object(a.b)(t, e),
            (t.prototype.getTypeName = function () {
              return "HTML";
            }),
            t
          );
        })(Qe),
        $e = (function (e) {
          function t() {
            return (null !== e && e.apply(this, arguments)) || this;
          }
          return (
            Object(a.b)(t, e),
            (t.prototype.getTypeName = function () {
              return "Style";
            }),
            t
          );
        })(Qe),
        Je = (function (e) {
          function t() {
            return (null !== e && e.apply(this, arguments)) || this;
          }
          return (
            Object(a.b)(t, e),
            (t.prototype.getTypeName = function () {
              return "Script";
            }),
            t
          );
        })(Qe),
        Ye = (function (e) {
          function t() {
            return (null !== e && e.apply(this, arguments)) || this;
          }
          return (
            Object(a.b)(t, e),
            (t.prototype.getTypeName = function () {
              return "URL";
            }),
            t
          );
        })(Qe),
        Xe = (function (e) {
          function t() {
            return (null !== e && e.apply(this, arguments)) || this;
          }
          return (
            Object(a.b)(t, e),
            (t.prototype.getTypeName = function () {
              return "ResourceURL";
            }),
            t
          );
        })(Qe),
        et = [
          { provide: r.u, useValue: "browser" },
          {
            provide: r.v,
            useValue: function () {
              P.makeCurrent(), z.init();
            },
            multi: !0,
          },
          { provide: s, useClass: R, deps: [M] },
          {
            provide: M,
            useFactory: function () {
              return document;
            },
            deps: [],
          },
        ],
        tt = Object(r.H)(r.M, "browser", et);
      function nt() {
        return new r.i();
      }
      var rt = (function () {
        function e(e) {
          if (e)
            throw new Error(
              "BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead."
            );
        }
        return (
          (e.withServerTransition = function (t) {
            return {
              ngModule: e,
              providers: [
                { provide: r.a, useValue: t.appId },
                { provide: B, useExisting: r.a },
                V,
              ],
            };
          }),
          e
        );
      })();
      "undefined" != typeof window && window;
      var ot = (function () {
          function e() {
            this._accessors = [];
          }
          return (
            (e.prototype.add = function (e, t) {
              this._accessors.push([e, t]);
            }),
            (e.prototype.remove = function (e) {
              for (var t = this._accessors.length - 1; t >= 0; --t)
                if (this._accessors[t][1] === e)
                  return void this._accessors.splice(t, 1);
            }),
            (e.prototype.select = function (e) {
              var t = this;
              this._accessors.forEach(function (n) {
                t._isSameGroup(n, e) && n[1] !== e && n[1].fireUncheck(e.value);
              });
            }),
            (e.prototype._isSameGroup = function (e, t) {
              return (
                !!e[0].control &&
                e[0]._parent === t._control._parent &&
                e[1].name === t.name
              );
            }),
            e
          );
        })(),
        it = (function () {
          function e(e, t, n) {
            (this._element = e),
              (this._renderer = t),
              (this._select = n),
              this._select && (this.id = this._select._registerOption());
          }
          return (
            Object.defineProperty(e.prototype, "ngValue", {
              set: function (e) {
                null != this._select &&
                  (this._select._optionMap.set(this.id, e),
                  this._setElementValue(
                    (function (e, t) {
                      return null == e
                        ? "" + t
                        : (t && "object" == typeof t && (t = "Object"),
                          (e + ": " + t).slice(0, 50));
                    })(this.id, e)
                  ),
                  this._select.writeValue(this._select.value));
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "value", {
              set: function (e) {
                this._setElementValue(e),
                  this._select && this._select.writeValue(this._select.value);
              },
              enumerable: !0,
              configurable: !0,
            }),
            (e.prototype._setElementValue = function (e) {
              this._renderer.setProperty(
                this._element.nativeElement,
                "value",
                e
              );
            }),
            (e.prototype.ngOnDestroy = function () {
              this._select &&
                (this._select._optionMap.delete(this.id),
                this._select.writeValue(this._select.value));
            }),
            e
          );
        })();
      function at(e, t) {
        return null == e
          ? "" + t
          : ("string" == typeof t && (t = "'" + t + "'"),
            t && "object" == typeof t && (t = "Object"),
            (e + ": " + t).slice(0, 50));
      }
      var st = (function () {
          function e(e, t, n) {
            (this._element = e),
              (this._renderer = t),
              (this._select = n),
              this._select && (this.id = this._select._registerOption(this));
          }
          return (
            Object.defineProperty(e.prototype, "ngValue", {
              set: function (e) {
                null != this._select &&
                  ((this._value = e),
                  this._setElementValue(at(this.id, e)),
                  this._select.writeValue(this._select.value));
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "value", {
              set: function (e) {
                this._select
                  ? ((this._value = e),
                    this._setElementValue(at(this.id, e)),
                    this._select.writeValue(this._select.value))
                  : this._setElementValue(e);
              },
              enumerable: !0,
              configurable: !0,
            }),
            (e.prototype._setElementValue = function (e) {
              this._renderer.setProperty(
                this._element.nativeElement,
                "value",
                e
              );
            }),
            (e.prototype._setSelected = function (e) {
              this._renderer.setProperty(
                this._element.nativeElement,
                "selected",
                e
              );
            }),
            (e.prototype.ngOnDestroy = function () {
              this._select &&
                (this._select._optionMap.delete(this.id),
                this._select.writeValue(this._select.value));
            }),
            e
          );
        })(),
        lt = function () {},
        ut = function () {},
        ct = n("TNQo"),
        pt = Math.random,
        ht = function (e, t) {
          e = Math.ceil(e);
          var n = (t = Math.floor(t)) - e,
            r = pt(),
            o = Math.floor(r * n) + e;
          return (
            (o < e || o >= t || !Number.isInteger(o)) &&
              console.error(
                "INT IN RANGE HALF OPEN RETURNED ",
                o,
                " FOR MIN ",
                e,
                " AND MAX ",
                t
              ),
            o
          );
        },
        ft = function (e, t) {
          for (var n, r, o = e.slice(), i = o.length; i > o.length - t; )
            (r = Math.floor(pt() * i)), (n = o[--i]), (o[i] = o[r]), (o[r] = n);
          return o.slice(i);
        },
        dt = {
          shuffle: function (e) {
            return ft(e, e.length);
          },
          elementFromArray: function (e) {
            return e[ht(0, e.length)];
          },
          elementsFromArray: function (e, t) {
            return ft(e, t);
          },
          intInRangeHalfOpen: ht,
          intInRangeInclusive: function (e, t) {
            return ht(e, t + 1);
          },
          setSeed: function (e) {
            return (t = ct(e)), (pt = t);
            var t;
          },
          generateSeedFromTime: function () {
            var e = new Date().getMinutes();
            return (
              Math.floor(e / 5) +
              "XLAIDJFOAIWEJF" +
              new Date().toLocaleDateString() +
              new Date().getHours()
            );
          },
          shuffledIndices: function (e) {
            var t = new Array(e).fill(0).map(function (e, t) {
              return t;
            });
            return dt.shuffle(t);
          },
        },
        yt = n("xrDH"),
        _t = n("qs7J");
      console.log("emoji loaded"),
        yt.range(128513, 128592),
        yt.range(128640, 128704);
      var vt = yt.range(parseInt("1F354", 16), parseInt("1F373", 16)),
        bt = yt.range(parseInt("1F3A3", 16), parseInt("1F3CA", 16)),
        gt = yt.range(parseInt("1F40C", 16), parseInt("1F43E", 16)),
        mt = yt.range(parseInt("1F466", 16), parseInt("1F488", 16)),
        wt = (yt.range(parseInt("1F525", 16), parseInt("1F529", 16)), []);
      wt = (wt = (wt = (wt = wt.concat(mt)).concat(gt)).concat(bt)).concat(vt);
      var Ct = [
        "1F3C5",
        "1F3B0",
        "1F3A6",
        "1F6BB",
        "1F6BD",
        "1F379",
        "1F37A",
        "1F37B",
        "1F377",
        "1F459",
        "1F4A9",
        "1F489",
        "1F46C",
        "1F46D",
      ];
      (Ct = Ct.map(function (e) {
        return parseInt(e, 16);
      })),
        (wt = (wt = yt.compact(yt.without.apply(yt, [wt].concat(Ct)))).map(
          function (e) {
            return e.toString(16);
          }
        ));
      var xt = "20e3",
        kt = "fe0f",
        St = Object.keys(_t).reduce(function (e, t) {
          var n = _t[t].character;
          return (function (e) {
            var t = e.character,
              n = e.types;
            console.log(t);
            var r =
                void 0 !=
                [xt, kt].find(function (e) {
                  return (function (e, t) {
                    return (
                      void 0 !=
                      [0, 1, 2].find(function (n) {
                        var r = e.codePointAt(n);
                        if (void 0 == r) return !1;
                        var o = r.toString(16);
                        return console.log("hex", o), o == t;
                      })
                    );
                  })(t, e);
                }),
              o =
                void 0 !=
                ["noun", "adjective"].find(function (e) {
                  return n.includes(e);
                });
            return (
              !r &&
              o &&
              !(function (e) {
                return (
                  void 0 !=
                  (function (e) {
                    for (var t = [], n = 0, r = e.codePointAt(n); void 0 != r; )
                      t.push(r.toString(16)), (r = e.codePointAt(++n));
                    return t;
                  })(e).find(function (e) {
                    return "1f1" == e.slice(0, 3);
                  })
                );
              })(t)
            );
          })(_t[t])
            ? ((e[n] = t), e)
            : e;
        }, {}),
        Et = Object.keys(St);
      console.log("list of emoji", _t);
      var jt = {
          ultron: wt,
          list: Et,
          getName: function (e) {
            return St[e];
          },
        },
        Tt = [
          "Hollywood",
          "Well",
          "Foot",
          "New York",
          "Spring",
          "Court",
          "Tube",
          "Point",
          "Tablet",
          "Slip",
          "Date",
          "Drill",
          "Lemon",
          "Bell",
          "Screen",
          "Fair",
          "Torch",
          "State",
          "Match",
          "Iron",
          "Block",
          "France",
          "Australia",
          "Limousine",
          "Stream",
          "Glove",
          "Nurse",
          "Leprechaun",
          "Play",
          "Tooth",
          "Arm",
          "Bermuda",
          "Diamond",
          "Whale",
          "Comic",
          "Mammoth",
          "Green",
          "Pass",
          "Missile",
          "Paste",
          "Drop",
          "Phoenix",
          "Marble",
          "Staff",
          "Figure",
          "Park",
          "Centaur",
          "Shadow",
          "Fish",
          "Cotton",
          "Egypt",
          "Theater",
          "Scale",
          "Fall",
          "Track",
          "Force",
          "Dinosaur",
          "Bill",
          "Mine",
          "Turkey",
          "March",
          "Contract",
          "Bridge",
          "Robin",
          "Line",
          "Plate",
          "Band",
          "Fire",
          "Bank",
          "Boom",
          "Cat",
          "Shot",
          "Suit",
          "Chocolate",
          "Roulette",
          "Mercury",
          "Moon",
          "Net",
          "Lawyer",
          "Satellite",
          "Angel",
          "Spider",
          "Germany",
          "Fork",
          "Pitch",
          "King",
          "Crane",
          "Trip",
          "Dog",
          "Conductor",
          "Part",
          "Bugle",
          "Witch",
          "Ketchup",
          "Press",
          "Spine",
          "Worm",
          "Alps",
          "Bond",
          "Pan",
          "Beijing",
          "Racket",
          "Cross",
          "Seal",
          "Aztec",
          "Maple",
          "Parachute",
          "Hotel",
          "Berry",
          "Soldier",
          "Ray",
          "Post",
          "Greece",
          "Square",
          "Mass",
          "Bat",
          "Wave",
          "Car",
          "Smuggler",
          "England",
          "Crash",
          "Tail",
          "Card",
          "Horn",
          "Capital",
          "Fence",
          "Deck",
          "Buffalo",
          "Microscope",
          "Jet",
          "Duck",
          "Ring",
          "Train",
          "Field",
          "Gold",
          "Tick",
          "Check",
          "Queen",
          "Strike",
          "Kangaroo",
          "Spike",
          "Scientist",
          "Engine",
          "Shakespeare",
          "Wind",
          "Kid",
          "Embassy",
          "Robot",
          "Note",
          "Ground",
          "Draft",
          "Ham",
          "War",
          "Mouse",
          "Center",
          "Chick",
          "China",
          "Bolt",
          "Spot",
          "Piano",
          "Pupil",
          "Plot",
          "Lion",
          "Police",
          "Head",
          "Litter",
          "Concert",
          "Mug",
          "Vacuum",
          "Atlantis",
          "Straw",
          "Switch",
          "Skyscraper",
          "Laser",
          "Scuba Diver",
          "Africa",
          "Plastic",
          "Dwarf",
          "Lap",
          "Life",
          "Honey",
          "Horseshoe",
          "Unicorn",
          "Spy",
          "Pants",
          "Wall",
          "Paper",
          "Sound",
          "Ice",
          "Tag",
          "Web",
          "Fan",
          "Orange",
          "Temple",
          "Canada",
          "Scorpion",
          "Undertaker",
          "Mail",
          "Europe",
          "Soul",
          "Apple",
          "Pole",
          "Tap",
          "Mouth",
          "Ambulance",
          "Dress",
          "Ice Cream",
          "Rabbit",
          "Buck",
          "Agent",
          "Sock",
          "Nut",
          "Boot",
          "Ghost",
          "Oil",
          "Superhero",
          "Code",
          "Kiwi",
          "Hospital",
          "Saturn",
          "Film",
          "Button",
          "Snowman",
          "Helicopter",
          "Loch Ness",
          "Log",
          "Princess",
          "Time",
          "Cook",
          "Revolution",
          "Shoe",
          "Mole",
          "Spell",
          "Grass",
          "Washer",
          "Game",
          "Beat",
          "Hole",
          "Horse",
          "Pirate",
          "Link",
          "Dance",
          "Fly",
          "Pit",
          "Server",
          "School",
          "Lock",
          "Brush",
          "Pool",
          "Star",
          "Jam",
          "Organ",
          "Berlin",
          "Face",
          "Luck",
          "Amazon",
          "Cast",
          "Gas",
          "Club",
          "Sink",
          "Water",
          "Chair",
          "Shark",
          "Jupiter",
          "Copper",
          "Jack",
          "Platypus",
          "Stick",
          "Olive",
          "Grace",
          "Bear",
          "Glass",
          "Row",
          "Pistol",
          "London",
          "Rock",
          "Van",
          "Vet",
          "Beach",
          "Charge",
          "Port",
          "Disease",
          "Palm",
          "Moscow",
          "Pin",
          "Washington",
          "Pyramid",
          "Opera",
          "Casino",
          "Pilot",
          "String",
          "Night",
          "Chest",
          "Yard",
          "Teacher",
          "Pumpkin",
          "Thief",
          "Bark",
          "Bug",
          "Mint",
          "Cycle",
          "Telescope",
          "Calf",
          "Air",
          "Box",
          "Mount",
          "Thumb",
          "Antarctica",
          "Trunk",
          "Snow",
          "Penguin",
          "Root",
          "Bar",
          "File",
          "Hawk",
          "Battery",
          "Compound",
          "Slug",
          "Octopus",
          "Whip",
          "America",
          "Ivory",
          "Pound",
          "Sub",
          "Cliff",
          "Lab",
          "Eagle",
          "Genius",
          "Ship",
          "Dice",
          "Hood",
          "Heart",
          "Novel",
          "Pipe",
          "Himalayas",
          "Crown",
          "Round",
          "India",
          "Needle",
          "Shop",
          "Watch",
          "Lead",
          "Tie",
          "Table",
          "Cell",
          "Cover",
          "Czech",
          "Back",
          "Bomb",
          "Ruler",
          "Forest",
          "Bottle",
          "Space",
          "Hook",
          "Doctor",
          "Ball",
          "Bow",
          "Degree",
          "Rome",
          "Plane",
          "Giant",
          "Nail",
          "Dragon",
          "Stadium",
          "Flute",
          "Carrot",
          "Wake",
          "Fighter",
          "Model",
          "Tokyo",
          "Eye",
          "Mexico",
          "Hand",
          "Swing",
          "Key",
          "Alien",
          "Tower",
          "Poison",
          "Cricket",
          "Cold",
          "Knife",
          "Church",
          "Board",
          "Cloak",
          "Ninja",
          "Olympus",
          "Belt",
          "Light",
          "Death",
          "Stock",
          "Millionaire",
          "Day",
          "Knight",
          "Pie",
          "Bed",
          "Circle",
          "Rose",
          "Change",
          "Cap",
          "Triangle",
        ],
        At = [
          "Cuckold",
          "Horse",
          "Sauna",
          "Hooker",
          "Stool",
          "Mouth",
          "Touchdown",
          "Snake",
          "Whiskey",
          "Pickle",
          "Hose",
          "Legend",
          "Blush",
          "Dick",
          "Cock",
          "Alcohol",
          "Sausage",
          "Pecker",
          "Straight",
          "Sore",
          "Toy",
          "Black",
          "White",
          "Period",
          "Couch",
          "Juice",
          "Bra",
          "Dame",
          "Chick",
          "Bitch",
          "Score",
          "Sheep",
          "Strap",
          "Mattress",
          "Train",
          "Bondage",
          "Wiener",
          "Penis",
          "Furry",
          "Joystick",
          "Apples",
          "Condom",
          "Bisexual",
          "Hole",
          "Secretary",
          "Roll",
          "Strip",
          "Freak",
          "Tramp",
          "Foreskin",
          "Wine",
          "Pee",
          "Experiment",
          "Johnson",
          "Banana",
          "Clam",
          "Blow",
          "Balloon",
          "Semen",
          "Regret",
          "Stripper",
          "Homerun",
          "Trim",
          "Bar",
          "Wood",
          "Paddle",
          "Cowgirl",
          "John",
          "Candle",
          "Cigarette",
          "Cigar",
          "Knob",
          "Sex",
          "Gang",
          "Stud",
          "Screw",
          "Trousers",
          "Safe",
          "Girl",
          "Package",
          "Grope",
          "Jewels",
          "Beach",
          "Chubby",
          "Beef",
          "Bender",
          "Shaft",
          "Peaches",
          "Swallow",
          "Flower",
          "Trunk",
          "Sack",
          "Job",
          "Onion",
          "Bowl",
          "Jerk",
          "Crap",
          "Bush",
          "Box",
          "Mushroom",
          "Shame",
          "Couple",
          "Sweat",
          "Strobe",
          "Tubesteak",
          "Rug",
          "Butt",
          "Nylon",
          "Lick",
          "Hotel",
          "Boy",
          "Boob",
          "Biscuits",
          "Fatty",
          "Share",
          "Slut",
          "Swimmers",
          "Pound",
          "Tuna",
          "Roach",
          "Brownie",
          "Nuts",
          "Blonde",
          "Horny",
          "Catcher",
          "Body",
          "Dominate",
          "Mole",
          "Shave",
          "Orgasm",
          "Taboo",
          "Roof",
          "Twig",
          "Red",
          "Lube",
          "Nude",
          "Eat",
          "Hooters",
          "Legs",
          "Behind",
          "Olive",
          "Brown",
          "Shower",
          "Oyster",
          "Taco",
          "Salad",
          "Udders",
          "Rave",
          "Inch",
          "Nipple",
          "Gay",
          "High",
          "Booze",
          "Beaver",
          "Pussy",
          "Ice",
          "Skank",
          "Melons",
          "Tail",
          "Rack",
          "Uranus",
          "Queer",
          "Lingerie",
          "Needle",
          "Escort",
          "Herb",
          "Bear",
          "Beans",
          "Log",
          "Hamster",
          "Skirt",
          "Gigolo",
          "Tap",
          "Pie",
          "Vasectomy",
          "Queen",
          "Group",
          "Necklace",
          "Commando",
          "Headlights",
          "Ashes",
          "Bacon",
          "Goose",
          "Pillows",
          "Smell",
          "Latex",
          "Tavern",
          "Smegma",
          "Vegas",
          "Queef",
          "Hot",
          "Navel",
          "Gag",
          "Headboard",
          "Bed",
          "Ass",
          "Caboose",
          "Carpet",
          "Smoke",
          "Cuffs",
          "Teabag",
          "Shot",
          "Vein",
          "Purple",
          "Gash",
          "Nail",
          "Hand",
          "Head",
          "Chaps",
          "Animal",
          "Koozie",
          "Fish",
          "Snatch",
          "Rookie",
          "Tease",
          "Snort",
          "Vibrator",
          "Pucker",
          "Film",
          "Mug",
          "Bang",
          "Hammer",
          "Grandma",
          "Grass",
          "Sniff",
          "Prick",
          "Tent",
          "Baked",
          "Video",
          "Pub",
          "G-Spot",
          "Movie",
          "Jazz",
          "Friction",
          "Eyes",
          "Drunk",
          "Softballs",
          "Kitty",
          "Tequila",
          "Bottom",
          "Vinyl",
          "Prostate",
          "Chains",
          "Motorboat",
          "Crabs",
          "French",
          "Hurl",
          "Cheek",
          "Solo",
          "Lizard",
          "Threesome",
          "Breast",
          "Virgin",
          "Prison",
          "Donkey",
          "Monkey",
          "Douche",
          "Freckles",
          "Bond",
          "Keg",
          "Spank",
          "Boxers",
          "Throat",
          "Pinch",
          "Vodka",
          "Pot",
          "Lips",
          "Mom",
          "Finger",
          "Fluff",
          "Bling",
          "Rectum",
          "Speed",
          "Missionary",
          "Tickle",
          "Sin",
          "Vomit",
          "Porn",
          "Cuddle",
          "Moist",
          "Manboobs",
          "Flash",
          "Dildo",
          "Cocktail",
          "Sperm",
          "Emission",
          "tie",
          "Diarrhea",
          "Wad",
          "Pork",
          "Bottle",
          "Mixer",
          "Crack",
          "Fist",
          "Club",
          "Cucumber",
          "Spoon",
          "Seed",
          "Tip",
          "Intern",
          "Wang",
          "Pole",
          "Champagne",
          "Milk",
          "Loose",
          "Fire",
          "Choke",
          "Noodle",
          "Spread",
          "Doggy",
          "Tit",
          "Beer",
          "Waste",
          "Poker",
          "Gerbil",
          "Member",
          "Bartender",
          "Fetish",
          "Bone",
          "Motel",
          "Squirt",
          "Lotion",
          "Tongue",
          "Flesh",
          "Watch",
          "Player",
          "Balls",
          "Meat",
          "Cream",
          "Fecal",
          "Rubber",
          "Kinky",
          "Stalker",
          "Bust",
          "Tool",
          "Skid",
          "Wax",
          "Pitcher",
          "Knees",
          "Martini",
          "Lobster",
          "Feather",
          "Booty",
          "Joint",
          "Steamy",
          "Mesh",
          "Top",
          "Facial",
          "Weed",
          "Pipe",
          "Cherry",
          "Lust",
          "Knockers",
          "Fantasy",
          "Hump",
          "Poop",
          "Stiff",
          "Nurse",
          "Torture",
          "Bong",
          "Wench",
          "Pink",
          "Gangbang",
          "Love",
          "Coyote",
          "Drill",
          "Acid",
          "Line",
          "Stiletto",
          "Turd",
          "Touch",
          "Daddy",
          "Wet",
          "Pimp",
          "Hell",
          "Liquor",
          "Burn",
          "Drag",
          "Cougar",
          "Briefs",
          "Stones",
          "Naked",
          "Orgy",
          "Chest",
          "Whip",
          "Pig",
          "Jugs",
          "Lighter",
          "Cannons",
          "Down",
          "Clap",
        ],
        It = [
          "Drum",
          "Bride",
          "Wagon",
          "University",
          "Hit",
          "Ash",
          "Bass",
          "Astronaut",
          "Doll",
          "Nerve",
          "Coach",
          "Beam",
          "Spoon",
          "Country",
          "Nose",
          "King Arthur",
          "Stamp",
          "Camp",
          "Brain",
          "Leaf",
          "Tutu",
          "Coast",
          "Lunch",
          "Thunder",
          "Potato",
          "Desk",
          "Onion",
          "Elephant",
          "Anchor",
          "Cowboy",
          "Flood",
          "Mohawk",
          "Santa",
          "Pitcher",
          "Barbecue",
          "Leather",
          "Skates",
          "Musketeer",
          "Snap",
          "Saddle",
          "Genie",
          "Mark",
          "Shoulder",
          "Governor",
          "Manicure",
          "Anthem",
          "Halloween",
          "Newton",
          "Balloon",
          "Fiddle",
          "Craft",
          "Glacier",
          "Cake",
          "Rat",
          "Tank",
          "Blind",
          "Spirit",
          "Cable",
          "Swamp",
          "Einstein",
          "Hide",
          "Crystal",
          "Gear",
          "Kiss",
          "Pew",
          "Powder",
          "Turtle",
          "Bacon",
          "Sherlock",
          "Squash",
          "Book",
          "Razor",
          "Dressing",
          "Brick",
          "Brazil",
          "Tear",
          "Stable",
          "Bikini",
          "Pen",
          "Roll",
          "Christmas",
          "Rubber",
          "Bay",
          "Mother",
          "Kick",
          "Fog",
          "Radio",
          "Crab",
          "Cone",
          "Skull",
          "Wheelchair",
          "Egg",
          "Butter",
          "Werewolf",
          "Cherry",
          "Patient",
          "Dryer",
          "Drawing",
          "Boss",
          "Fever",
          "Banana",
          "Polish",
          "Knot",
          "Paint",
          "Storm",
          "Goldilocks",
          "Pillow",
          "Chain",
          "Moses",
          "Saw",
          "Brother",
          "Rail",
          "Rope",
          "Street",
          "Pad",
          "Captain",
          "Wish",
          "Axe",
          "Shorts",
          "Popcorn",
          "Castle",
          "Second",
          "Team",
          "Oasis",
          "Mess",
          "Miss",
          "Avalanche",
          "Texas",
          "Sun",
          "Letter",
          "Rust",
          "Wing",
          "Steel",
          "Ear",
          "Scroll",
          "Bunk",
          "Cane",
          "Venus",
          "Ladder",
          "Purse",
          "Sheet",
          "Napoleon",
          "Sugar",
          "Director",
          "Ace",
          "Scratch",
          "Bucket",
          "Caesar",
          "Disk",
          "Beard",
          "Bulb",
          "Bench",
          "Scarecrow",
          "Igloo",
          "Tuxedo",
          "Earth",
          "Ram",
          "Sister",
          "Bread",
          "Record",
          "Dash",
          "Greenhouse",
          "Drone",
          "Steam",
          "Biscuit",
          "Rip",
          "Notre Dame",
          "Lip",
          "Shampoo",
          "Cheese",
          "Sack",
          "Mountie",
          "Sumo",
          "Sahara",
          "Walrus",
          "Dust",
          "Hammer",
          "Cloud",
          "Spray",
          "St.Patrick",
          "Kilt",
          "Monkey",
          "Frog",
          "Dentist",
          "Rainbow",
          "Whistle",
          "Reindeer",
          "Kitchen",
          "Lemonade",
          "Slipper",
          "Floor",
          "Valentine",
          "Pepper",
          "Road",
          "Shed",
          "Bowler",
          "Milk",
          "Wheel",
          "Magazine",
          "Brass",
          "Tea",
          "Helmet",
          "Flag",
          "Troll",
          "Jail",
          "Sticker",
          "Puppet",
          "Chalk",
          "Bonsai",
          "Sweat",
          "Gangster",
          "Butterfly",
          "Story",
          "Salad",
          "Armor",
          "Smoke",
          "Cave",
          "Quack",
          "Break",
          "Snake",
          "Mill",
          "Gymnast",
          "Wonderland",
          "Driver",
          "Spurs",
          "Zombie",
          "Pig",
          "Cleopatra",
          "Toast",
          "Penny",
          "Ant",
          "Volume",
          "Lace",
          "Battleship",
          "Maracas",
          "Meter",
          "Sling",
          "Delta",
          "Step",
          "Joan of Arc",
          "Comet",
          "Bath",
          "Polo",
          "Gum",
          "Vampire",
          "Ski",
          "Pocket",
          "Battle",
          "Foam",
          "Rodeo",
          "Squirrel",
          "Salt",
          "Mummy",
          "Blacksmith",
          "Chip",
          "Goat",
          "Laundry",
          "Bee",
          "Tattoo",
          "Russia",
          "Tin",
          "Map",
          "Yellowstone",
          "Silk",
          "Hose",
          "Sloth",
          "Kung Fu",
          "Clock",
          "Bean",
          "Lightning",
          "Bowl",
          "Guitar",
          "Ranch",
          "Pearl",
          "Flat",
          "Virus",
          "Ice Age",
          "Coffee",
          "Marathon",
          "Attic",
          "Wedding",
          "Columbus",
          "Pop",
          "Sherwood",
          "Trick",
          "Nylon",
          "Locust",
          "Pacific",
          "Cuckoo",
          "Tornado",
          "Memory",
          "Jockey",
          "Minotaur",
          "Big Bang",
          "Page",
          "Sphinx",
          "Crusader",
          "Volcano",
          "Rifle",
          "Boil",
          "Hair",
          "Bicycle",
          "Jumper",
          "Smoothie",
          "Sleep",
          "Pentagon",
          "Groom",
          "River",
          "Farm",
          "Judge",
          "Viking",
          "Easter",
          "Mud",
          "Parrot",
          "Comb",
          "Salsa",
          "Eden",
          "Army",
          "Paddle",
          "Saloon",
          "Mona Lisa",
          "Mile",
          "Blizzard",
          "Quarter",
          "Jeweler",
          "Hamburger",
          "Glasses",
          "Sail",
          "Boxer",
          "Rice",
          "Mirror",
          "Ink",
          "Beer",
          "Teepee",
          "Makeup",
          "Microwave",
          "Hercules",
          "Sign",
          "Pizza",
          "Wool",
          "Homer",
          "Minute",
          "Sword",
          "Soup",
          "Alaska",
          "Baby",
          "Potter",
          "Shower",
          "Blade",
          "Noah",
          "Soap",
          "Tunnel",
          "Peach",
          "Dollar",
          "Tip",
          "Love",
          "Jellyfish",
          "Stethoscope",
          "Taste",
          "Fuel",
          "Mosquito",
          "Wizard",
          "Big Ben",
          "Garden",
          "Waitress",
          "Shoot",
          "Shell",
          "Lumberjack",
          "Medic",
          "Dream",
          "Blues",
          "Earthquake",
          "Pea",
          "Parade",
          "Sled",
          "Smell",
          "Computer",
          "Cow",
          "Peanut",
          "Window",
          "Mustard",
          "Sand",
          "Golf",
          "Crow",
          "Iceland",
          "Apron",
          "Violet",
          "Door",
          "Tiger",
          "Joker",
          "House",
          "Collar",
          "Hawaii",
          "Dwarf",
          "Pine",
          "Magician",
          "Frost",
          "Curry",
          "Bubble",
          "Wood",
        ],
        Pt = [
          "assets/top_100_paintings_mona_lisa_by_leonardo_da_vinci.jpg",
          "assets/top_100_paintings_the_starry_night_by_vincent_van_gogh.jpg",
          "assets/top_100_paintings_the_scream_by_edvard_munch.jpg",
          "assets/top_100_paintings_the_night_watch_by_rembrandt_m29.jpg",
          "assets/top_100_paintings_the_kiss_by_gustav_klimt.jpg",
          "assets/top_100_paintings_the_arnolfini_portrait_by_jan_van_eyck_v44.jpg",
          "assets/top_100_paintings_the_girl_with_a_pearl_earring_by_johannes_vermeer.jpg",
          "assets/top_100_paintings_impression,_sunrise_by_claude_monet.jpg",
          "assets/top_100_paintings_las_meninas_by_diego_velazquez_l36.jpg",
          "assets/top_100_paintings_the_creation_of_adam_by_michelangelo.jpg",
          "assets/top_100_paintings_luncheon_of_the_boating_party_by_pierre-auguste_renoir_x40.jpg",
          "assets/top_100_paintings_the_grand_odalisque_by_jean_auguste_dominique_ingres_f91.jpg",
          "assets/top_100_paintings_the_happy_accidents_of_the_swing_by_jean-honore_fragonard_s7.jpg",
          "assets/top_100_paintings_the_liberty_leading_the_people_by_eugene_delacroix.jpg",
          "assets/top_100_paintings_the_birth_of_venus_by_sandro_botticelli_v46.jpg",
          "assets/top_100_paintings_napoleon_crossing_the_alps_by_jacques-louis_david_i39.jpg",
          "assets/top_100_paintings_musicians_by_caravaggio.jpg",
          "assets/top_100_paintings_american_gothic_by_grant_wood_c92.jpg",
          "assets/top_100_paintings_sunday_afternoon_on_the_island_of_la_grande_jatte_by_georges_seurat_t11.jpg",
          "assets/top_100_paintings_the_sleeping_gypsy_by_henri_rousseau.jpg",
          "assets/top_100_paintings_the_triumph_of_galatea_by_raphael_h76.jpg",
          "assets/top_100_paintings_the_gleaners_by_jean-francois_millet.jpg",
          "assets/top_100_paintings_primavera_by_sandro_botticelli_c99.jpg",
          "assets/top_100_paintings_the_third_of_may_1808_by_francisco_goya_h39.jpg",
          "assets/top_100_paintings_charles_i_in_three_positions_by_anthony_van_dyck.jpg",
          "assets/top_100_paintings_the_wanderer_above_the_sea_of_fog_by_caspar_david_friedrich.jpg",
          "assets/top_100_paintings_olympia_by_edouard_manet.jpg",
          "assets/top_100_paintings_the_tower_of_babel_by_pieter_bruegel_the_elder_w1.jpg",
          "assets/top_100_paintings_view_of_toledo_by_el_greco_c24.jpg",
          "assets/top_100_paintings_a_cotton_office_in_new_orleans_by_edgar_degas_u56.jpg",
          "assets/top_100_paintings_bacchus_and_ariadne_by_titian_y83.jpg",
          "assets/top_100_paintings_the_sleepers_by_gustave_courbet.jpg",
          "assets/top_100_paintings_the_gross_clinic_by_thomas_eakins_n38.jpg",
          "assets/top_100_paintings_the_ninth_wave_by_ivan_aivazovsky_m94.jpg",
          "assets/top_100_paintings_the_last_supper_by_leonardo_da_vinci_e69.jpg",
          "assets/top_100_paintings_st._george_and_the_dragon_by_paolo_uccello_o25.jpg",
          "assets/top_100_paintings_mr_and_mrs_robert_andrews_by_thomas_gainsborough.jpg",
          "assets/top_100_paintings_pollice_verso_by_jean-leon_gerome_n88.jpg",
          "assets/top_100_paintings_pilgrimage_to_cythera_by_antoine_watteau_h25.jpg",
          "assets/top_100_paintings_large_bathers_by_paul_cezanne_j99.jpg",
          "assets/top_100_paintings_the_astronomer_by_johannes_vermeer_l73.jpg",
          "assets/top_100_paintings_wave_by_william-adolphe_bouguereau_o33.jpg",
          "assets/top_100_paintings_the_fall_of_the_damned_by_peter_paul_rubens_k14.jpg",
          "assets/top_100_paintings_a_bar_at_the_folies_bergere_by_edouard_manet.jpg",
          "assets/top_100_paintings_the_storm_on_the_sea_of_galilee_by_rembrandt_f63.jpg",
          "assets/top_100_paintings_the_laughing_cavalier_by_frans_hals_g38.jpg",
          "assets/top_100_paintings_paris_street_in_rainy_weather_by_gustave_caillebotte.jpg",
          "assets/top_100_paintings_foxes_by_franz_marc_y6.jpg",
          "assets/top_100_paintings_the_lady_with_the_ermine_by_leonardo_da_vinci.jpg",
          "assets/top_100_paintings_watson_and_the_shark_by_john_singleton_copley_s96.jpg",
          "assets/top_100_paintings_the_ladies_waldegrave_by_joshua_reynolds_o12.jpg",
          "assets/top_100_paintings_arrangement_in_grey_and_black_no_1_portrait_of_the_artists_mother_by_james_abbott_mcneill_whistler_c15.jpg",
          "assets/top_100_paintings_dance_at_the_moulin_de_la_galette_by_pierre_auguste_renoir.jpg",
          "assets/top_100_paintings_breezing_up_by_winslow_homer_w66.jpg",
          "assets/top_100_paintings_the_great_wave_off_kanagawa_by_katsushika_hokusai_q50.jpg",
          "assets/top_100_paintings_large_seated_nude_by_amedeo_modigliani.jpg",
          "assets/top_100_paintings_stag_night_at_sharkeys_by_george_bellows.jpg",
          "assets/top_100_paintings_the_night_cafe_by_vincent_van_gogh.jpg",
          "assets/top_100_paintings_the_avenue_in_the_rain_by_childe_hassam.jpg",
          "assets/top_100_paintings_annunciation_by_leonardo_da_vinci.jpg",
          "assets/top_100_paintings_the_ambassadors_by_hans_holbein_the_younger_n93.jpg",
          "assets/top_100_paintings_flaming_june_by_frederic_lord_leighton_i45.jpg",
          "assets/top_100_paintings_susanna_and_the_elders_by_artemisia_gentileschi_r8.jpg",
          "assets/top_100_paintings_composition_viii_by_wassily_kandinsky_k55.jpg",
          "assets/top_100_paintings_the_oath_of_horatii_by_jacques-louis_david_k39.jpg",
          "assets/top_100_paintings_a_friend_in_need_by_cassius_marcellus_coolidge.jpg",
          "assets/top_100_paintings_dante_and_virgil_in_hell_by_william-adolphe_bouguereau_f37.jpg",
          "assets/top_100_paintings_saturn_devouring_his_son_by_francisco_goya_a27.jpg",
          "assets/top_100_paintings_battle_of_issus_by_albrecht_altdorfer_e1.jpg",
          "assets/top_100_paintings_the_potato_eaters_by_vincent_van_gogh.jpg",
          "assets/top_100_paintings_the_birth_of_venus_by_alexandre_cabanel_r44.jpg",
          "assets/top_100_paintings_mars_and_venus_allegory_of_peace_by_louis-jean-francois_lagrenee_s96.jpg",
          "assets/top_100_paintings_red_balloon_by_paul_klee_g28.jpg",
          "assets/top_100_paintings_the_lady_of_shalott_by_john_william_waterhouse_v45.jpg",
          "assets/top_100_paintings_portrait_of_a_gentleman_skating_by_gilbert_stuart_d40.jpg",
          "assets/top_100_paintings_the_hay_wain_by_john_constable_z55.jpg",
          "assets/top_100_paintings_the_boat_trip_by_mary_cassatt_b96.jpg",
          "assets/top_100_paintings_sleeping_venus_by_titian_g21.jpg",
          "assets/top_100_paintings_adoration_of_the_magi_by_gentile_da_fabriano_c29.jpg",
          "assets/top_100_paintings_portrait_of_a_young_man_by_raphael_l5.jpg",
          "assets/top_100_paintings_boulevard_montmartre_spring_by_camille_pissarro_m76.jpg",
          "assets/top_100_paintings_the_wedding_at_cana_by_paolo_veronese_f69.jpg",
          "assets/top_100_paintings_the_anatomy_lesson_of_dr._nicolaes_tulp_by_rembrandt_o27.jpg",
          "assets/top_100_paintings_the_raft_of_the_medusa_by_theodore_gericault_i70.jpg",
          "assets/top_100_paintings_the_kiss_by_francesco_hayez_l46.jpg",
          "assets/top_100_paintings_the_bath_by_jean-leon_gerome_i47.jpg",
          "assets/top_100_paintings_fort_vimieux_by_joseph_mallord_william_turner_a45.jpg",
          "assets/top_100_paintings_the_japanese_bridge_by_claude_monet_s92.jpg",
          "assets/top_100_paintings_washington_crossing_the_delaware_by_emanuel_gottlieb_leutze_j38.jpg",
          "assets/top_100_paintings_the_garden_of_earthly_delights_-_central_panel_by_hieronymus_bosch_t34.jpg",
          "assets/top_100_paintings_supper_at_emmaus_by_caravaggio_k55.jpg",
          "assets/top_100_paintings_feast_of_the_rosary_by_albrecht_durer.jpg",
          "assets/top_100_paintings_the_hireling_shepherd_by_william_holman_hunt_v34.jpg",
          "assets/top_100_paintings_hunters_in_the_snow_by_pieter_bruegel_the_elder_k1.jpg",
          "assets/top_100_paintings_the_seed_of_areoi_by_paul_gauguin_z97.jpg",
          "assets/top_100_paintings_barge_haulers_on_the_volga_by_ilya_repin.jpg",
          "assets/top_100_paintings_odalisque_by_francois_boucher.jpg",
          "assets/top_100_paintings_cardsharps_by_caravaggio.jpg",
          "assets/top_100_paintings_the_pont_du_gard_by_hubert_robert.jpg",
          "assets/top_100_paintings_the_luncheon_on_the_grass_by_edouard_manet_d60.jpg",
        ],
        Ot = [
          "Beauty",
          "Bravery",
          "Brilliance",
          "Brutality",
          "Calmness",
          "Charity",
          "Coldness",
          "Compassion",
          "Confidence",
          "Contentment",
          "Courage",
          "Curiosity",
          "Dedication",
          "Determination",
          "Ego",
          "Elegance",
          "Enthusiasm",
          "Envy",
          "Evil",
          "Fear",
          "Generosity",
          "Goodness",
          "Graciousness",
          "Hatred",
          "Honesty",
          "Honor",
          "Hope",
          "Humility",
          "Humor",
          "Insanity",
          "Integrity",
          "Intelligence",
          "Jealousy",
          "Kindness",
          "Loyalty",
          "Maturity",
          "Patience",
          "Perseverance",
          "Sanity",
          "Selfcontrol",
          "Sensitivity",
          "Sophistication",
          "Stupidity",
          "Sympathy",
          "Talent",
          "Tolerance",
          "Trust",
          "Warmth",
          "Weakness",
          "Wisdom",
          "Wit",
          "Adoration",
          "Amazement",
          "Anger",
          "Anxiety",
          "Apprehension",
          "Clarity",
          "Delight",
          "Despair",
          "Disappointment",
          "Disbelief",
          "Excitement",
          "Fascination",
          "Friendship",
          "Grief",
          "Happiness",
          "Hate",
          "Helpfulness",
          "Helplessness",
          "Infatuation",
          "Joy",
          "Love",
          "Misery",
          "Pain",
          "Pleasure",
          "Power",
          "Pride",
          "Relaxation",
          "Relief",
          "Romance",
          "Sadness",
          "Satisfaction",
          "Silliness",
          "Sorrow",
          "Strength",
          "Surprise",
          "Tiredness",
          "Uncertainty",
          "Wariness",
          "Weariness",
          "Worry",
          "Ability",
          "Adventure",
          "Artistry",
          "Awe",
          "Belief",
          "Chaos",
          "Comfort",
          "Communication",
          "Consideration",
          "Crime",
          "Culture",
          "Death",
          "Deceit",
          "Defeat",
          "Democracy",
          "Dexterity",
          "Dictatorship",
          "Disquiet",
          "Disturbance",
          "Dreams",
          "Energy",
          "Enhancement",
          "Failure",
          "Faith",
          "Faithfulness",
          "Faithlessness",
          "Favoritism",
          "Forgiveness",
          "Fragility",
          "Frailty",
          "Freedom",
          "Gossip",
          "Grace",
          "Hearsay",
          "Homelessness",
          "Hurt",
          "Idea",
          "Idiosyncrasy",
          "Imagination",
          "Impression",
          "Improvement",
          "Inflation",
          "Information",
          "Justice",
          "Knowledge",
          "Laughter",
          "Law",
          "Liberty",
          "Life",
          "Loss",
          "Luck",
          "Luxury",
          "Memory",
          "Mercy",
          "Motivation",
          "Movement",
          "Need",
          "Omen",
          "Opinion",
          "Opportunism",
          "Opportunity",
          "Parenthood",
          "Patriotism",
          "Peace",
          "Peculiarity",
          "Poverty",
          "Principle",
          "Reality",
          "Redemption",
          "Refreshment",
          "Riches",
          "Rumor",
          "Service",
          "Shock",
          "Skill",
          "Slavery",
          "Sleep",
          "Sparkle",
          "Speculation",
          "Speed",
          "Strictness",
          "Submission",
          "Success",
          "Thought",
          "Thrill",
          "Truth",
          "Unemployment",
          "Unreality",
          "Victory",
          "Wealth",
          "Magician",
          "Mystery",
          "Thriller",
          "Pottermore",
          "Pensieve",
          "Play",
          "Voldemort",
          "Series",
          "Genre",
          "Drama",
          "Theme",
          "Flashback",
          "Alchemy",
          "Wand",
          "Broomstick",
          "Centaur",
          "Narnia",
          "Novel",
          "Basilisk",
          "Werewolf",
          "Muggles",
          "Middle-Earth",
          "Zelda",
          "Rupert",
          "Disney",
          "Dickensian",
          "Wicca",
          "Beowulf",
          "Beatles",
          "California",
          "Epidemic",
          "Influenza",
          "Measles",
          "Hiv",
          "Smallpox",
          "Tuberculosis",
          "General",
          "Disease",
          "Vaccination",
          "Malaria",
          "Vaccine",
          "Pathogen",
          "Sars",
          "Cholera",
          "Ebola",
          "Typhus",
          "Aids",
          "Cancer",
          "Virulence",
          "Infection",
          "Infect",
          "Zoonosis",
          "Africa",
          "Flu",
          "Outbreak",
          "Infectious",
          "Virus",
          "Mexico",
          "H5N1",
          "Polio",
          "Leprosy",
          "Preparedness",
          "Infections",
          "Dengue",
          "Tsunamis",
          "Bioterrorism",
          "Immunization",
          "Inoculation",
          "Filariasis",
          "Rinderpest",
          "Rotavirus",
          "Contagion",
          "Continents",
          "Endemic",
          "History",
          "Domestication",
          "Food",
          "Nutrition",
          "Rice",
          "Nutrient",
          "Beef",
          "Meat",
          "Provender",
          "Victuals",
          "Cooking",
          "Seafood",
          "Pabulum",
          "Animal",
          "Cereal",
          "Drink",
          "Cheese",
          "Fat",
          "Soup",
          "Butter",
          "Yogurt",
          "Nourishment",
          "Agriculture",
          "Pasta",
          "Feed",
          "Fish",
          "Sustenance",
          "Meal",
          "Milk",
          "Ingredients",
          "Chicken",
          "Sushi",
          "Hunger",
          "Sugar",
          "Maize",
          "Wheat",
          "Plant",
          "Vegetarian",
          "Substance",
          "Protein",
          "Vitamin",
          "Dairy",
          "Nutriment",
          "Chyme",
          "Bitter",
          "Foodstuff",
          "Comestible",
          "Saltiness",
          "Eatable",
          "Salad",
          "Commissariat",
          "Victual",
          "Aliment",
          "Water",
          "Edible",
          "Produce",
          "Fruit",
          "Vegetable",
          "Restaurant",
          "Chocolate",
          "Coconut",
          "Halal",
          "Bread",
          "Viands",
          "Alimentation",
          "Foody",
          "Eat",
          "Bacteria",
          "Fermentation",
          "Kitchen",
          "Nut",
          "Supplies",
          "Goods",
          "Pizza",
          "Omega",
          "Lemon",
          "Vegetables",
          "Livestock",
          "Hamburger",
          "Meals",
          "Drinks",
          "Clothing",
          "Foodstuffs",
          "Tobacco",
          "Crops",
          "Curing",
          "Salting",
          "Vegan",
          "Biodiversity",
          "Petfood",
          "Environmentalism",
          "Evolution",
          "Bacon",
          "Sweetness",
          "Supermarket",
          "Breadless",
          "Umami",
          "Kashrut",
          "Rancidity",
          "Taste",
          "Cuisine",
          "Pork",
          "Hygiene",
          "Mineral",
          "Ingestion",
          "Organism",
          "Cell",
          "Sustainability",
          "Kosher",
          "Fungi",
          "Mushroom",
          "Pickled",
          "Solid",
          "Beverage",
          "Manna",
          "Provisions",
          "Fare",
          "Yolk",
          "Yoghurt",
          "Loaf",
          "Leftovers",
          "Content",
          "Medium",
          "Slop",
          "Potable",
          "Drinkable",
          "Mouthfeel",
          "Alimentary",
          "Salt",
          "Cultivar",
          "Seed",
          "Carbohydrate",
          "Legume",
          "Bean",
          "Pea",
          "Lentil",
          "Oilseed",
          "Sunflower",
          "Flaxseed",
          "Rapeseed",
          "Foodie",
          "Sesame",
          "Cherries",
          "Icescr",
          "Apple",
          "Foodservice",
          "Cyanide",
          "Excretion",
          "Tomato",
          "Pumpkin",
          "Eggplant",
          "Potato",
          "Carrot",
          "Repast",
          "Onion",
          "Spinach",
          "Vitellus",
          "Yoghourt",
          "Micronutrient",
          "Lettuce",
          "Farming",
          "Bamboo",
          "Asparagus",
          "Kombucha",
          "Perishable",
          "Broccoli",
          "Forage",
          "Fodder",
          "Spirulina",
          "Cabbage",
          "Cauliflower",
          "Sausage",
          "Products",
          "Muscle",
          "Organ",
          "Gardening",
          "Coffee",
          "Oatmeal",
          "Egg",
          "Bee",
          "Honey",
          "Nectar",
          "Vegetarianism",
          "Blood",
          "Foods",
          "Nutrify",
          "Supply",
          "Items",
          "Medicines",
          "Starvation",
          "Breakfast",
          "Eating",
          "Spaghetti",
          "Raw",
          "Bulk",
          "Consumption",
          "Coevolution",
          "Poultry",
          "Lasagna",
          "Industry",
          "Brunch",
          "Consuming",
          "Bagel",
          "Drinking",
          "Shortage",
          "Snack",
          "Health",
          "Fresh",
          "Burger",
          "Domestic",
          "Farmers",
          "Steak",
          "Imported",
          "Grain",
          "Luncheon",
          "Ecosystem",
          "Quality",
          "Essential",
          "Fertility",
          "Besides",
          "Selling",
          "Spread",
          "Available",
          "Treats",
          "Safe",
          "Adding",
          "Product",
          "Care",
          "Diet",
          "Cheap",
          "Costs",
          "Dinner",
          "Bringing",
          "Consumers",
          "Unep",
          "Bring",
          "Well",
          "Specialty",
          "Cleaning",
          "Especially",
          "Sells",
          "Supplement",
          "Sweet",
          "Keeping",
          "Variety",
          "Imports",
          "Sour",
          "Aid",
          "Crop",
          "Needs",
          "Wine",
          "Oil",
          "China",
          "Poor",
          "Making",
          "Make",
          "Scarce",
          "Export",
          "Local",
          "Croquette",
          "Businesses",
          "Natural",
          "Supper",
          "Processing",
          "Consumed",
          "Cornbread",
          "Business",
          "Tea",
          "More",
          "Affected",
          "Provide",
          "Gobbler",
          "Foodtography",
          "Mealy",
          "Opportunivore",
          "Mexican",
          "Glucose",
          "Europe",
          "Fructose",
          "Sucrose",
          "Market",
          "Famine",
          "Jugging",
          "Polyphage",
          "Acid",
          "Cookbook",
          "Vinegar",
          "Citrus",
          "Lime",
          "Veganism",
          "Orange",
          "Leftover",
          "Goatmeat",
          "Macaroni",
          "Viand",
          "Ions",
          "Sodium",
          "Ort",
          "Potassium",
          "Chow",
          "Electrolyte",
          "Kidney",
          "Iodine",
          "Herbalism",
          "Thyroid",
          "Sweetbread",
          "Pot",
          "Noodle",
          "Agroecosystem",
          "Broth",
          "Lunch",
          "Ham",
          "Fee",
          "Fridge",
          "Caffeine",
          "Judaism",
          "Islam",
          "Hinduism",
          "Obesity",
          "Glutamate",
          "Quorn",
          "Refrigerator",
          "Salmon",
          "Dunch",
          "Mushrooms",
          "Porridge",
          "Gastronomy",
          "Resturant",
          "Fleshmeat",
          "Fooder",
          "Maida",
          "Salmagundi",
          "Meaty",
          "Tryptophan",
          "Habit",
          "Jibarito",
          "Tachyphagia",
          "Omnivore",
          "Celery",
          "Burrito",
          "Disaccharides",
          "Morality",
          "Garlic",
          "Activism",
          "Taco",
          "Insalivation",
          "Sucralose",
          "Plate",
          "Texture",
          "Stevia",
          "Oilman",
          "Hominy",
          "Steviol",
          "Pigmeat",
          "Freezer",
          "Cornmeal",
          "Knife",
          "Chowder",
          "Cheeseburger",
          "Sandwich",
          "Ciabatta",
          "Veal",
          "Pho",
          "Flavor",
          "Dine",
          "Ravioli",
          "Fork",
          "Slaughter",
          "Jambalaya",
          "Rendering",
          "Catfood",
          "Polyphagous",
          "Slaughterhouses",
          "Brainfood",
          "Chickenability",
          "Parmo",
          "Taquito",
          "Chopsticks",
          "Niblet",
          "Tool",
          "Nosh",
          "Gazpacho",
          "Grocerant",
          "Pilaf",
          "Pottery",
          "Oven",
          "Spoon",
        ],
        Mt = Tt,
        Nt = {
          useFrancisList: function () {
            return (Mt = Ot);
          },
          getRandomWords: function (e) {
            var t = dt.elementsFromArray(Mt, e);
            return (
              console.log("resulting words", t),
              console.log("and random number", dt.intInRangeInclusive(0, 1e3)),
              t
            );
          },
          getRandomWord: function () {
            return dt.elementFromArray(Mt);
          },
          useCodenamesList: function () {
            return (Mt = Tt);
          },
          useDuetList: function () {
            return (Mt = It);
          },
          useEmojiList: function () {
            return (Mt = jt.list);
          },
          usePaintingsList: function () {
            return (Mt = Pt);
          },
          useUnderCoverList: function () {
            return (Mt = At);
          },
        },
        Rt = n("TO51"),
        Dt = (function () {
          function e() {
            (this.subject = new Rt.a()),
              (this.initialSeed = this.generateInitialSeed()),
              this.setSeed(this.initialSeed);
          }
          return (
            (e.prototype.setSeed = function (e) {
              console.log("setting seed to be", e),
                (this.seed = e),
                this.subject.next(e),
                dt.setSeed(this.seed);
            }),
            (e.prototype.getSeed = function () {
              return this.subject.asObservable();
            }),
            (e.prototype.generateInitialSeed = function () {
              var e = dt.generateSeedFromTime();
              return dt.setSeed(e), Nt.getRandomWords(2).join("");
            }),
            e
          );
        })(),
        Bt = (function () {
          function e(e) {
            var t = this;
            (this.targets = []),
              (this.items = []),
              (this.revealAll = !1),
              (this.rows = 5),
              (this.cols = 5),
              (this.getItemWidth = function () {
                return 100 / t.cols - 0.5;
              }),
              (this.getItemHeight = function () {
                return 85 / t.rows;
              }),
              (this.cycleTeam = function (e) {
                var t;
                (e.team =
                  "None" == (t = e.team)
                    ? "Red"
                    : "Red" == t
                    ? "Blue"
                    : "Blue" == t
                    ? "Gray"
                    : "Gray" == t
                    ? "Black"
                    : "Black" == t
                    ? "None"
                    : void 0),
                  (e.revealed = "None" != e.team);
              }),
              (this.toggleRevealItem = function (e) {
                e.revealed = !e.revealed;
              }),
              (this.clickItem = function (e, n) {
                return (
                  t.isSpymaster
                    ? (t.toggleRevealItem(e), t.playSound(e.trueTeam))
                    : t.cycleTeam(e),
                  t.flipTimer(),
                  n.preventDefault(),
                  n.stopPropagation(),
                  console.log(t.items),
                  !1
                );
              }),
              (this.createGrid = function (e) {
                (t.items = []),
                  (t.revealAll = !1),
                  (t.targets = []),
                  (e = e.toLowerCase()),
                  dt.setSeed(e);
                var n = 25,
                  r = { Red: 7, Blue: 7, Gray: 4, Black: 1, Green: 0 },
                  o = { Red: 8, Blue: 8, Gray: 7, Black: 1, Green: 0 };
                (t.rows = 5),
                  (t.cols = 5),
                  "codenames" == t.modeName && Nt.useCodenamesList(),
                  "undercover" == t.modeName && Nt.useUnderCoverList(),
                  "duet" == t.modeName && Nt.useDuetList(),
                  "emoji" == t.modeName &&
                    (Nt.useEmojiList(), (o = r), (t.rows = 4), (n = 20)),
                  "paintings" == t.modeName &&
                    (Nt.usePaintingsList(), (o = r), (t.rows = 4), (n = 20)),
                  "francis" == t.modeName && Nt.useFrancisList(),
                  Nt.getRandomWords(n).forEach(function (e) {
                    t.items.push({
                      description: e,
                      team: "None",
                      revealed: !1,
                      trueTeam: "None",
                    });
                  }),
                  (function (e) {
                    var n = dt.shuffledIndices(e),
                      r = new Array(e);
                    (t.firstTeam = dt.elementFromArray(["Red", "Blue"])),
                      (o[t.firstTeam] += 1);
                    var i = n.splice(0, o.Red),
                      a = n.splice(0, o.Blue),
                      s = n.splice(0, o.Gray),
                      l = n.splice(0, o.Black),
                      u = n.splice(0, o.Green);
                    return (
                      i.forEach(function (e) {
                        return (r[e] = "Red");
                      }),
                      a.forEach(function (e) {
                        return (r[e] = "Blue");
                      }),
                      s.forEach(function (e) {
                        return (r[e] = "Gray");
                      }),
                      l.forEach(function (e) {
                        return (r[e] = "Black");
                      }),
                      u.forEach(function (e) {
                        return (r[e] = "Green");
                      }),
                      r
                    );
                  })(n).forEach(function (e, n) {
                    return (t.items[n].trueTeam = e);
                  }),
                  t.isSpymaster && t.setSpymaster();
              }),
              (this.setSeed = function (e) {
                console.log("setSeed in grid component", e);
                var n = Math.floor(50 - 1.1 * (e.length + 6)),
                  r = Math.min(30, n);
                document
                  .querySelector("#seedLabel")
                  .setAttribute("style", "left: " + r + "vw"),
                  console.log(r),
                  (t.seed = e),
                  t.createGrid(e);
              }),
              (this.showChillTunes = !1),
              (this.isSpymaster = !1),
              (this.identityConfirmed = !1),
              (this.setSpymaster = function () {
                (t.isSpymaster = !0),
                  (t.identityConfirmed = !0),
                  t.items.forEach(function (e) {
                    (e.team = e.trueTeam), (e.revealed = !1);
                  });
              }),
              (this.setNotSpymaster = function () {
                (t.isSpymaster = !1), (t.identityConfirmed = !0);
              }),
              (this.claimToBeSpymaster = function () {
                confirm("Are you sure you're a Spymaster?") && t.setSpymaster();
              }),
              (this.claimToNotBeSpymaster = this.setNotSpymaster),
              (this.refreshGrid = function () {
                return t.createGrid(t.seed);
              }),
              (this.DEFAULTMODE = "codenames"),
              (this.chooseMode = function (e) {
                console.log("choose mode", e, t.modeName),
                  document
                    .querySelector("#gameChooser > [value=" + e + "]")
                    .setAttribute("selected", "true"),
                  t.storeListName(e),
                  (t.modeName = e),
                  t.refreshGrid();
              }),
              (this.setSizes = function () {
                var e = Array.from(document.querySelectorAll(".gridItemDiv"));
                e.length > 0 &&
                  e.forEach(function (e) {
                    var n = e;
                    console.log("width", t.getItemHeight()),
                      (n.style.width = t.getItemWidth() + "vw"),
                      (n.style.height = t.getItemHeight() + "vh");
                  });
              }),
              (this.storeListName = function (e) {
                console.log("storing list name ", e),
                  window.sessionStorage.setItem("listName", e);
              }),
              (this.chooseAppropriateDefaultList = function () {
                var e = window.sessionStorage.getItem("listName");
                console.log("stored", e), t.chooseMode(e || t.DEFAULTMODE);
              }),
              (this.timeSinceLastChange = 0),
              (this.timerStarted = !1),
              (this.flipTimer = function () {
                (t.timeSinceLastChange = 0),
                  t.timerStarted ||
                    (window.setInterval(t.updateTimer, 1e3),
                    (t.timerStarted = !0));
              }),
              (this.updateTimer = function () {
                ++t.timeSinceLastChange;
              }),
              (this.getRedMaxScore = function () {
                var e = 7;
                return (
                  ["emoji", "paintings"].includes(t.modeName) || ++e,
                  "Red" == t.firstTeam && ++e,
                  e
                );
              }),
              (this.getBlueMaxScore = function () {
                var e = 7;
                return (
                  ["emoji", "paintings"].includes(t.modeName) || ++e,
                  "Blue" == t.firstTeam && ++e,
                  e
                );
              }),
              (this.getRedScore = function () {
                return t.items.filter(function (e) {
                  return "Red" == e.team && e.revealed;
                }).length;
              }),
              (this.getBlueScore = function () {
                return t.items.filter(function (e) {
                  return "Blue" == e.team && e.revealed;
                }).length;
              }),
              (this.zoom = { show: !1, side: "left", src: "", label: "" }),
              (this.srcToLabel = function (e) {
                var t = e
                    .replace(/_/g, " ")
                    .split(" ")
                    .map(function (e) {
                      return e.charAt(0).toUpperCase() + e.slice(1);
                    }),
                  n = t[t.length - 1];
                return (
                  n.length < 4 && n.search(/\d/) > -1 && t.pop(), t.join(" ")
                );
              }),
              (this.isAnAssassin = function () {
                return (
                  t.items.filter(function (e) {
                    return "Black" == e.team && e.revealed;
                  }).length > 0
                );
              }),
              (this.isGameOver = function () {
                var e = t.getRedScore() >= t.getRedMaxScore(),
                  n = t.getBlueScore() >= t.getBlueMaxScore();
                return e || n;
              }),
              (this.isLabelRevealed = function () {
                return t.isGameOver();
              }),
              (this.getEmojiCaption = function (e) {
                return jt.getName(e);
              }),
              (this.showEmojiCaptions = function () {
                return t.isGameOver();
              }),
              (this.showCaptions = !1),
              (this.muteSounds = !1),
              (this.showPaintingZoom = function (e, n) {
                (t.zoom.side =
                  n.screenX < n.view.screen.width / 2 ? "right" : "left"),
                  console.log("event", n),
                  (t.zoom.show = !0),
                  (t.zoom.src = e);
                var r = [];
                (r[0] = e.indexOf("paintings_") + 10),
                  (r[1] = e.indexOf("_by_")),
                  (r[2] = r[1] + 4),
                  (r[3] = e.indexOf(".jpg"));
                var o = e.slice(r[0], r[1]);
                o = t.srcToLabel(o);
                var i = e.slice(r[2], r[3]);
                (i = t.srcToLabel(i)), (t.zoom.label = o + " by " + i);
              }),
              (this.showLeftZoom = function () {
                return t.zoom.show && "left" == t.zoom.side;
              }),
              (this.showRightZoom = function () {
                return t.zoom.show && "right" == t.zoom.side;
              }),
              (this.getZoomSrc = function () {
                return t.zoom.src;
              }),
              (this.hideZoom = function () {
                t.zoom.show = !1;
              }),
              (this.audioSrcs = ["", "", "", ""]),
              (this.currentAudioID = 0),
              (this.playSound = function (e) {
                if (!t.muteSounds) {
                  t.audioSrcs[t.currentAudioID] = {
                    Blue: "./assets/blue.wav",
                    Red: "./assets/red.wav",
                    Gray: "./assets/marilyn-gray.wav",
                    Black: "./assets/wilhelm.wav",
                  }[e];
                  var n = document.getElementById(
                    "audioPlayer" + t.currentAudioID
                  );
                  console.log(t.audioSrcs, "srcs", n),
                    (n.src = t.audioSrcs[t.currentAudioID]),
                    n.play(),
                    (t.currentAudioID += 1),
                    t.currentAudioID >= 4 && (t.currentAudioID = 0);
                }
              }),
              (this.ss = e);
          }
          return (
            (e.prototype.ngOnInit = function () {
              this.ss.getSeed().subscribe(this.setSeed),
                this.setSeed(this.ss.initialSeed),
                this.chooseAppropriateDefaultList();
            }),
            e
          );
        })(),
        Vt = r.T({
          encapsulation: 0,
          styles: [
            [
              "#titleDiv[_ngcontent-%COMP%]{font-size:6vw;height:14vh;line-height:14vh}#gameChooser[_ngcontent-%COMP%], #seedBox[_ngcontent-%COMP%], #titleDiv[_ngcontent-%COMP%]{width:99vw;font-weight:700;text-align:center}#seedBox[_ngcontent-%COMP%]{border:none;padding:0}#seedLabel[_ngcontent-%COMP%]{position:absolute;line-height:14vh;top:0;font-size:3vw;font-weight:700;color:#000}#gridDiv[_ngcontent-%COMP%]{list-style:none;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;\r\n    width:99vw;position:relative;-ms-flex-pack:distribute;justify-content:space-around}.gridItemDiv[_ngcontent-%COMP%]{background:hsla(39,77%,83%,.8);height:16vh;width:19.5vw;\r\n    line-height:16vh;overflow:hidden;\r\n    font-weight:700;font-size:5vmin;text-align:center;color:#000;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;border-radius:2vmin;-webkit-box-shadow:0 0 0 1vmin gray inset;box-shadow:inset 0 0 0 1vmin gray;position:relative}.gridItemDiv.cols-5[_ngcontent-%COMP%]{width:19.5vw}.gridItemDiv.rows-5[_ngcontent-%COMP%]{height:17vh}.gridItemDiv.cols-4[_ngcontent-%COMP%]{width:24.5vw}.gridItemDiv.rows-4[_ngcontent-%COMP%]{height:21.75vh}.emoji[_ngcontent-%COMP%]{position:relative;height:18vh;padding-top:2vh}.emojiContent[_ngcontent-%COMP%]{width:100%;height:100%;font-size:15vh}.emojiCaption[_ngcontent-%COMP%]{position:absolute;bottom:0;left:1vh;font-size:3vh;line-height:normal;background-color:#fff;color:#000}.painting[_ngcontent-%COMP%]{max-height:20vh;max-width:19vw;width:auto;height:auto;padding-top:1vh;\r\n     top:50%; -webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%) }\r\n.painting[_ngcontent-%COMP%], .zoom[_ngcontent-%COMP%]{position:absolute}.zoom[_ngcontent-%COMP%]{\r\n    \r\n    z-index:10; max-width:45vw;max-height:80vh;width:60vw;height:100vh;top:0;border-radius:2vmin;border:2vmin solid gray}.zoom[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:100%}.zoom.left[_ngcontent-%COMP%]{left:0}.zoom.right[_ngcontent-%COMP%]{right:.5vw}.zoomLabel[_ngcontent-%COMP%]{position:absolute;bottom:0;\r\n    font-size:7vh;background-color:#fff;color:#000;opacity:.8}.revealed[_ngcontent-%COMP%] > .gridItemContents[_ngcontent-%COMP%]{opacity:.25;text-shadow:none}.revealAllButton[_ngcontent-%COMP%]{font-size:4em}.teamBlack[_ngcontent-%COMP%]{background:#000;color:#fff}.teamGray[_ngcontent-%COMP%]{background:#555;color:#fff}.teamBlue[_ngcontent-%COMP%]{background:#99badd; color:#fff\r\n    }.teamRed[_ngcontent-%COMP%]{background:#c00; color:#fff\r\n    }kbd.key[_ngcontent-%COMP%]{border-radius:3px;padding:1px 2px 0;border:1px solid #000}.firstTeam[_ngcontent-%COMP%]{width:99vw;font-weight:700;text-align:center;position:relative}#firstTeamBubble[_ngcontent-%COMP%]{background-color:#fff;color:#000;width:20vw;line-height:7.5vh;margin-left:auto;margin-right:auto}.bubble[_ngcontent-%COMP%]{border-radius:5vw;height:8vh;position:relative;top:3vh;line-height:normal;text-align:center}#scoreBoard[_ngcontent-%COMP%]   .bubble[_ngcontent-%COMP%]{width:30vw;background-color:#fff;color:#000}.btn[_ngcontent-%COMP%]{line-height:7vh}.bar[_ngcontent-%COMP%], .btn[_ngcontent-%COMP%]{height:14vh;font-size:3vw}.bar[_ngcontent-%COMP%]{line-height:14vh}#chillTunes[_ngcontent-%COMP%], #muteSounds[_ngcontent-%COMP%], #showCaptions[_ngcontent-%COMP%]{width:99vw}h1[_ngcontent-%COMP%], h3[_ngcontent-%COMP%]{margin:0}#claimToBeSpymaster[_ngcontent-%COMP%]{width:99vw}#scoreBoard[_ngcontent-%COMP%]{left:2vw;width:40vw;text-align:left}#scoreBoard[_ngcontent-%COMP%], .timer[_ngcontent-%COMP%]{position:absolute;font-size:3vw;height:14vh}.timer[_ngcontent-%COMP%]{right:2vw;top:0;width:20vw;text-align:right}",
            ],
          ],
          data: {},
        });
      function zt(e) {
        return r._13(
          0,
          [
            (e()(),
            r.V(0, 0, null, null, 1, "span", [], null, null, null, null, null)),
            (e()(), r._12(-1, null, ["\u2705"])),
          ],
          null,
          null
        );
      }
      function Ft(e) {
        return r._13(
          0,
          [
            (e()(),
            r.V(0, 0, null, null, 1, "span", [], null, null, null, null, null)),
            (e()(), r._12(-1, null, ["\u274c"])),
          ],
          null,
          null
        );
      }
      function Lt(e) {
        return r._13(
          0,
          [
            (e()(),
            r.V(
              0,
              0,
              null,
              null,
              7,
              "button",
              [
                ["class", "btn"],
                ["id", "showCaptions"],
              ],
              null,
              [[null, "click"]],
              function (e, t, n) {
                var r = !0,
                  o = e.component;
                return (
                  "click" === t &&
                    (r = 0 != (o.showCaptions = !o.showCaptions) && r),
                  r
                );
              },
              null,
              null
            )),
            (e()(), r._12(-1, null, ["\n  Show Captions\n  "])),
            (e()(), r.Q(16777216, null, null, 1, null, zt)),
            r.U(3, 16384, null, 0, v, [r.E, r.B], { ngIf: [0, "ngIf"] }, null),
            (e()(), r._12(-1, null, ["\n  "])),
            (e()(), r.Q(16777216, null, null, 1, null, Ft)),
            r.U(6, 16384, null, 0, v, [r.E, r.B], { ngIf: [0, "ngIf"] }, null),
            (e()(), r._12(-1, null, ["\n"])),
          ],
          function (e, t) {
            var n = t.component;
            e(t, 3, 0, n.showCaptions), e(t, 6, 0, !n.showCaptions);
          },
          null
        );
      }
      function Ht(e) {
        return r._13(
          0,
          [
            (e()(),
            r.V(0, 0, null, null, 1, "span", [], null, null, null, null, null)),
            (e()(), r._12(-1, null, ["\u2705"])),
          ],
          null,
          null
        );
      }
      function Ut(e) {
        return r._13(
          0,
          [
            (e()(),
            r.V(0, 0, null, null, 1, "span", [], null, null, null, null, null)),
            (e()(), r._12(-1, null, ["\u274c"])),
          ],
          null,
          null
        );
      }
      function Wt(e) {
        return r._13(
          0,
          [
            (e()(),
            r.V(
              0,
              0,
              null,
              null,
              7,
              "button",
              [
                ["class", "btn"],
                ["id", "muteSounds"],
              ],
              null,
              [[null, "click"]],
              function (e, t, n) {
                var r = !0,
                  o = e.component;
                return (
                  "click" === t &&
                    (r = 0 != (o.muteSounds = !o.muteSounds) && r),
                  r
                );
              },
              null,
              null
            )),
            (e()(), r._12(-1, null, ["\n  Mute Sounds\n  "])),
            (e()(), r.Q(16777216, null, null, 1, null, Ht)),
            r.U(3, 16384, null, 0, v, [r.E, r.B], { ngIf: [0, "ngIf"] }, null),
            (e()(), r._12(-1, null, ["\n  "])),
            (e()(), r.Q(16777216, null, null, 1, null, Ut)),
            r.U(6, 16384, null, 0, v, [r.E, r.B], { ngIf: [0, "ngIf"] }, null),
            (e()(), r._12(-1, null, ["\n"])),
          ],
          function (e, t) {
            var n = t.component;
            e(t, 3, 0, n.muteSounds), e(t, 6, 0, !n.muteSounds);
          },
          null
        );
      }
      function Gt(e) {
        return r._13(
          0,
          [
            (e()(),
            r.V(
              0,
              0,
              null,
              null,
              0,
              "iframe",
              [
                ["allow", "encrypted-media"],
                ["allowtransparency", "true"],
                ["frameborder", "0"],
                ["height", "380"],
                [
                  "src",
                  "https://open.spotify.com/embed/user/1137876031/playlist/35HE0QT1p4gOxhOnjZ6oky",
                ],
                ["width", "300"],
              ],
              null,
              null,
              null,
              null,
              null
            )),
          ],
          null,
          null
        );
      }
      function qt(e) {
        return r._13(
          0,
          [
            (e()(),
            r.V(
              0,
              0,
              null,
              null,
              1,
              "button",
              [
                ["class", "btn"],
                ["id", "claimToBeSpymaster"],
              ],
              null,
              [[null, "click"]],
              function (e, t, n) {
                var r = !0;
                return (
                  "click" === t &&
                    (r = !1 !== e.component.claimToBeSpymaster() && r),
                  r
                );
              },
              null,
              null
            )),
            (e()(), r._12(-1, null, ["I am a Spymaster"])),
          ],
          null,
          null
        );
      }
      function Zt(e) {
        return r._13(
          0,
          [
            (e()(),
            r.V(
              0,
              0,
              null,
              null,
              3,
              "span",
              [["id", "scoreBoard"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), r._12(-1, null, ["\n    "])),
            (e()(),
            r._12(2, null, ["\n      Red:", "/", " | Blue:", "/", "\n    "])),
            (e()(), r._12(-1, null, ["\n  "])),
          ],
          null,
          function (e, t) {
            var n = t.component;
            e(
              t,
              2,
              0,
              n.getRedScore(),
              n.getRedMaxScore(),
              n.getBlueScore(),
              n.getBlueMaxScore()
            );
          }
        );
      }
      function Qt(e) {
        return r._13(
          0,
          [
            (e()(),
            r.V(
              0,
              0,
              null,
              null,
              1,
              "span",
              [["class", "timer"]],
              null,
              [[null, "click"]],
              function (e, t, n) {
                var r = !0;
                return (
                  "click" === t && (r = !1 !== e.component.flipTimer() && r), r
                );
              },
              null,
              null
            )),
            (e()(), r._12(1, null, ["", ""])),
          ],
          null,
          function (e, t) {
            e(t, 1, 0, t.component.timeSinceLastChange);
          }
        );
      }
      function Kt(e) {
        return r._13(
          0,
          [
            (e()(),
            r.V(
              0,
              0,
              null,
              null,
              1,
              "div",
              [["class", "zoomLabel"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), r._12(1, null, ["\n      ", "\n    "])),
          ],
          null,
          function (e, t) {
            e(t, 1, 0, t.component.zoom.label);
          }
        );
      }
      function $t(e) {
        return r._13(
          0,
          [
            (e()(),
            r.V(
              0,
              0,
              null,
              null,
              6,
              "div",
              [],
              [[8, "className", 0]],
              null,
              null,
              null,
              null
            )),
            (e()(), r._12(-1, null, ["\n    "])),
            (e()(),
            r.V(
              2,
              0,
              null,
              null,
              0,
              "img",
              [],
              [[8, "src", 4]],
              null,
              null,
              null,
              null
            )),
            (e()(), r._12(-1, null, ["\n    "])),
            (e()(), r.Q(16777216, null, null, 1, null, Kt)),
            r.U(5, 16384, null, 0, v, [r.E, r.B], { ngIf: [0, "ngIf"] }, null),
            (e()(), r._12(-1, null, ["\n  "])),
          ],
          function (e, t) {
            e(t, 5, 0, t.component.showCaptions);
          },
          function (e, t) {
            var n = t.component;
            e(
              t,
              0,
              0,
              r.Y(1, "zoom ", "left" == n.zoom.side ? "left" : "right", "")
            ),
              e(t, 2, 0, r.Y(1, "", n.zoom.src, ""));
          }
        );
      }
      function Jt(e) {
        return r._13(
          0,
          [
            (e()(),
            r.V(0, 0, null, null, 1, "div", [], null, null, null, null, null)),
            (e()(), r._12(1, null, ["", ""])),
          ],
          null,
          function (e, t) {
            e(t, 1, 0, t.parent.context.$implicit.description);
          }
        );
      }
      function Yt(e) {
        return r._13(
          0,
          [
            (e()(),
            r.V(
              0,
              0,
              null,
              null,
              1,
              "div",
              [["class", "emojiCaption"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), r._12(1, null, ["", ""])),
          ],
          null,
          function (e, t) {
            e(
              t,
              1,
              0,
              t.component.getEmojiCaption(
                t.parent.parent.context.$implicit.description
              )
            );
          }
        );
      }
      function Xt(e) {
        return r._13(
          0,
          [
            (e()(),
            r.V(
              0,
              0,
              null,
              null,
              11,
              "div",
              [["class", "emoji"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), r._12(-1, null, ["\n        "])),
            (e()(),
            r.V(
              2,
              0,
              null,
              null,
              5,
              "div",
              [["class", "emojiContent"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), r._12(-1, null, ["\n          "])),
            (e()(), r._12(-1, null, ["\n          "])),
            (e()(),
            r.V(
              5,
              0,
              null,
              null,
              1,
              "app-grid-item",
              [],
              null,
              null,
              null,
              x,
              C
            )),
            r.U(6, 114688, null, 0, w, [], { name: [0, "name"] }, null),
            (e()(), r._12(-1, null, ["\n        "])),
            (e()(), r._12(-1, null, ["\n        "])),
            (e()(), r.Q(16777216, null, null, 1, null, Yt)),
            r.U(10, 16384, null, 0, v, [r.E, r.B], { ngIf: [0, "ngIf"] }, null),
            (e()(), r._12(-1, null, ["\n      "])),
          ],
          function (e, t) {
            var n = t.component;
            e(t, 6, 0, r.Y(1, "", t.parent.context.$implicit.description, "")),
              e(t, 10, 0, n.showCaptions);
          },
          null
        );
      }
      function en(e) {
        return r._13(
          0,
          [
            (e()(),
            r.V(
              0,
              0,
              null,
              null,
              0,
              "img",
              [["class", "painting"]],
              [[8, "src", 4]],
              [
                [null, "mouseenter"],
                [null, "mouseleave"],
              ],
              function (e, t, n) {
                var r = !0,
                  o = e.component;
                return (
                  "mouseenter" === t &&
                    (r =
                      !1 !==
                        o.showPaintingZoom(
                          e.parent.context.$implicit.description,
                          n
                        ) && r),
                  "mouseleave" === t && (r = !1 !== o.hideZoom() && r),
                  r
                );
              },
              null,
              null
            )),
          ],
          null,
          function (e, t) {
            e(t, 0, 0, r.Y(1, "", t.parent.context.$implicit.description, ""));
          }
        );
      }
      function tn(e) {
        return r._13(
          0,
          [
            (e()(),
            r.V(
              0,
              0,
              null,
              null,
              15,
              "div",
              [],
              [[8, "className", 0]],
              [[null, "click"]],
              function (e, t, n) {
                var r = !0;
                return (
                  "click" === t &&
                    (r =
                      !1 !== e.component.clickItem(e.context.$implicit, n) &&
                      r),
                  r
                );
              },
              null,
              null
            )),
            (e()(), r._12(-1, null, ["\n    "])),
            (e()(),
            r.V(
              2,
              0,
              null,
              null,
              12,
              "div",
              [["class", "gridItemContents"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), r._12(-1, null, ["\n      "])),
            (e()(), r.Q(16777216, null, null, 2, null, Jt)),
            r.U(5, 16384, null, 0, v, [r.E, r.B], { ngIf: [0, "ngIf"] }, null),
            r._9(6, 2),
            (e()(), r._12(-1, null, ["\n      "])),
            (e()(), r._12(-1, null, ["\n      "])),
            (e()(), r.Q(16777216, null, null, 1, null, Xt)),
            r.U(10, 16384, null, 0, v, [r.E, r.B], { ngIf: [0, "ngIf"] }, null),
            (e()(), r._12(-1, null, ["\n      "])),
            (e()(), r.Q(16777216, null, null, 1, null, en)),
            r.U(13, 16384, null, 0, v, [r.E, r.B], { ngIf: [0, "ngIf"] }, null),
            (e()(), r._12(-1, null, ["\n    "])),
            (e()(), r._12(-1, null, ["\n  "])),
          ],
          function (e, t) {
            var n = t.component;
            e(t, 5, 0, !e(t, 6, 0, "emoji", "paintings").includes(n.modeName)),
              e(t, 10, 0, "emoji" == n.modeName),
              e(t, 13, 0, "paintings" == n.modeName);
          },
          function (e, t) {
            var n = t.component;
            e(
              t,
              0,
              0,
              r.Y(
                4,
                "gridItemDiv cols-",
                n.cols,
                " rows-",
                n.rows,
                " ",
                n.isSpymaster
                  ? "team" + t.context.$implicit.trueTeam + " spymaster"
                  : "team" + t.context.$implicit.team,
                " ",
                t.context.$implicit.revealed ? "revealed" : "",
                " "
              )
            );
          }
        );
      }
      function nn(e) {
        return r._13(
          0,
          [
            (e()(), r._12(-1, null, ["\n"])),
            (e()(),
            r.V(
              1,
              0,
              null,
              null,
              1,
              "div",
              [["id", "titleDiv"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), r._12(-1, null, [" CodeGames "])),
            (e()(), r._12(-1, null, ["\n"])),
            (e()(),
            r.V(
              4,
              0,
              [["t", 1]],
              null,
              36,
              "select",
              [
                ["class", "bar"],
                ["id", "gameChooser"],
              ],
              null,
              [[null, "change"]],
              function (e, t, n) {
                var o = !0;
                return (
                  "change" === t &&
                    (o = !1 !== e.component.chooseMode(r._7(e, 4).value) && o),
                  o
                );
              },
              null,
              null
            )),
            (e()(), r._12(-1, null, ["\n  "])),
            (e()(),
            r.V(
              6,
              0,
              null,
              null,
              3,
              "option",
              [["value", "codenames"]],
              null,
              null,
              null,
              null,
              null
            )),
            r.U(
              7,
              147456,
              null,
              0,
              it,
              [r.h, r.w, [8, null]],
              { value: [0, "value"] },
              null
            ),
            r.U(
              8,
              147456,
              null,
              0,
              st,
              [r.h, r.w, [8, null]],
              { value: [0, "value"] },
              null
            ),
            (e()(), r._12(-1, null, ["Change Game Mode"])),
            (e()(), r._12(-1, null, ["\n  "])),
            (e()(),
            r.V(
              11,
              0,
              null,
              null,
              3,
              "option",
              [["value", "codenames"]],
              null,
              null,
              null,
              null,
              null
            )),
            r.U(
              12,
              147456,
              null,
              0,
              it,
              [r.h, r.w, [8, null]],
              { value: [0, "value"] },
              null
            ),
            r.U(
              13,
              147456,
              null,
              0,
              st,
              [r.h, r.w, [8, null]],
              { value: [0, "value"] },
              null
            ),
            (e()(), r._12(-1, null, ["Codenames!"])),
            (e()(), r._12(-1, null, ["\n  "])),
            (e()(),
            r.V(
              16,
              0,
              null,
              null,
              3,
              "option",
              [["value", "undercover"]],
              null,
              null,
              null,
              null,
              null
            )),
            r.U(
              17,
              147456,
              null,
              0,
              it,
              [r.h, r.w, [8, null]],
              { value: [0, "value"] },
              null
            ),
            r.U(
              18,
              147456,
              null,
              0,
              st,
              [r.h, r.w, [8, null]],
              { value: [0, "value"] },
              null
            ),
            (e()(), r._12(-1, null, ["Codenames: Deep Undercover!"])),
            (e()(), r._12(-1, null, ["\n  "])),
            (e()(),
            r.V(
              21,
              0,
              null,
              null,
              3,
              "option",
              [["value", "duet"]],
              null,
              null,
              null,
              null,
              null
            )),
            r.U(
              22,
              147456,
              null,
              0,
              it,
              [r.h, r.w, [8, null]],
              { value: [0, "value"] },
              null
            ),
            r.U(
              23,
              147456,
              null,
              0,
              st,
              [r.h, r.w, [8, null]],
              { value: [0, "value"] },
              null
            ),
            (e()(), r._12(-1, null, ["Codenames: Duet!"])),
            (e()(), r._12(-1, null, ["\n  "])),
            (e()(),
            r.V(
              26,
              0,
              null,
              null,
              3,
              "option",
              [["value", "emoji"]],
              null,
              null,
              null,
              null,
              null
            )),
            r.U(
              27,
              147456,
              null,
              0,
              it,
              [r.h, r.w, [8, null]],
              { value: [0, "value"] },
              null
            ),
            r.U(
              28,
              147456,
              null,
              0,
              st,
              [r.h, r.w, [8, null]],
              { value: [0, "value"] },
              null
            ),
            (e()(), r._12(-1, null, ["CodeGames: Emoji!"])),
            (e()(), r._12(-1, null, ["\n  "])),
            (e()(),
            r.V(
              31,
              0,
              null,
              null,
              3,
              "option",
              [["value", "francis"]],
              null,
              null,
              null,
              null,
              null
            )),
            r.U(
              32,
              147456,
              null,
              0,
              it,
              [r.h, r.w, [8, null]],
              { value: [0, "value"] },
              null
            ),
            r.U(
              33,
              147456,
              null,
              0,
              st,
              [r.h, r.w, [8, null]],
              { value: [0, "value"] },
              null
            ),
            (e()(), r._12(-1, null, ["CodeGames: Hungry Has Hansen's"])),
            (e()(), r._12(-1, null, ["\n  "])),
            (e()(),
            r.V(
              36,
              0,
              null,
              null,
              3,
              "option",
              [["value", "paintings"]],
              null,
              null,
              null,
              null,
              null
            )),
            r.U(
              37,
              147456,
              null,
              0,
              it,
              [r.h, r.w, [8, null]],
              { value: [0, "value"] },
              null
            ),
            r.U(
              38,
              147456,
              null,
              0,
              st,
              [r.h, r.w, [8, null]],
              { value: [0, "value"] },
              null
            ),
            (e()(), r._12(-1, null, ["CodeGames: Paintings!"])),
            (e()(), r._12(-1, null, ["\n"])),
            (e()(), r._12(-1, null, ["\n"])),
            (e()(), r._12(-1, null, ["\n"])),
            (e()(), r._12(-1, null, ["\n"])),
            (e()(), r.Q(16777216, null, null, 2, null, Lt)),
            r.U(45, 16384, null, 0, v, [r.E, r.B], { ngIf: [0, "ngIf"] }, null),
            r._9(46, 2),
            (e()(), r._12(-1, null, ["\n"])),
            (e()(), r._12(-1, null, ["\n"])),
            (e()(), r.Q(16777216, null, null, 1, null, Wt)),
            r.U(50, 16384, null, 0, v, [r.E, r.B], { ngIf: [0, "ngIf"] }, null),
            (e()(), r._12(-1, null, ["\n"])),
            (e()(), r._12(-1, null, ["\n"])),
            (e()(),
            r.V(
              53,
              0,
              null,
              null,
              1,
              "button",
              [
                ["class", "btn"],
                ["id", "chillTunes"],
              ],
              null,
              [[null, "click"]],
              function (e, t, n) {
                var r = !0,
                  o = e.component;
                return (
                  "click" === t &&
                    (r = 0 != (o.showChillTunes = !o.showChillTunes) && r),
                  r
                );
              },
              null,
              null
            )),
            (e()(), r._12(-1, null, ["Chill Tunes"])),
            (e()(), r._12(-1, null, ["\n"])),
            (e()(), r.Q(16777216, null, null, 1, null, Gt)),
            r.U(57, 16384, null, 0, v, [r.E, r.B], { ngIf: [0, "ngIf"] }, null),
            (e()(), r._12(-1, null, ["\n"])),
            (e()(), r._12(-1, null, ["\n"])),
            (e()(), r.Q(16777216, null, null, 1, null, qt)),
            r.U(61, 16384, null, 0, v, [r.E, r.B], { ngIf: [0, "ngIf"] }, null),
            (e()(), r._12(-1, null, ["\n"])),
            (e()(), r._12(-1, null, ["\n"])),
            (e()(),
            r.V(
              64,
              0,
              null,
              null,
              6,
              "div",
              [
                ["class", "bar"],
                ["style", "position:relative"],
              ],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), r._12(-1, null, ["\n  "])),
            (e()(),
            r.V(
              66,
              0,
              [["seedBox", 1]],
              null,
              0,
              "input",
              [
                ["class", "bar"],
                ["id", "seedBox"],
                ["type", "text"],
              ],
              [[8, "value", 0]],
              [[null, "input"]],
              function (e, t, n) {
                var o = !0;
                return (
                  "input" === t &&
                    (o = !1 !== e.component.ss.setSeed(r._7(e, 66).value) && o),
                  o
                );
              },
              null,
              null
            )),
            (e()(), r._12(-1, null, ["\n  "])),
            (e()(),
            r.V(
              68,
              0,
              null,
              null,
              1,
              "span",
              [["id", "seedLabel"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), r._12(-1, null, ["Seed:"])),
            (e()(), r._12(-1, null, ["\n"])),
            (e()(), r._12(-1, null, ["\n\n"])),
            (e()(),
            r.V(
              72,
              0,
              null,
              null,
              9,
              "div",
              [["ng-show", "false"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), r._12(-1, null, ["\n  "])),
            (e()(),
            r.V(
              74,
              0,
              null,
              null,
              0,
              "audio",
              [["id", "audioPlayer0"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), r._12(-1, null, ["\n  "])),
            (e()(),
            r.V(
              76,
              0,
              null,
              null,
              0,
              "audio",
              [["id", "audioPlayer1"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), r._12(-1, null, ["\n  "])),
            (e()(),
            r.V(
              78,
              0,
              null,
              null,
              0,
              "audio",
              [["id", "audioPlayer2"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), r._12(-1, null, ["\n  "])),
            (e()(),
            r.V(
              80,
              0,
              null,
              null,
              0,
              "audio",
              [["id", "audioPlayer3"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), r._12(-1, null, ["\n"])),
            (e()(), r._12(-1, null, ["\n\n\n\n"])),
            (e()(), r._12(-1, null, ["\n"])),
            (e()(),
            r.V(
              84,
              0,
              null,
              null,
              10,
              "div",
              [],
              [[8, "className", 0]],
              null,
              null,
              null,
              null
            )),
            (e()(), r._12(-1, null, ["\n  "])),
            (e()(), r.Q(16777216, null, null, 1, null, Zt)),
            r.U(87, 16384, null, 0, v, [r.E, r.B], { ngIf: [0, "ngIf"] }, null),
            (e()(), r._12(-1, null, ["\n  "])),
            (e()(),
            r.V(
              89,
              0,
              null,
              null,
              1,
              "div",
              [
                ["class", "bubble"],
                ["id", "firstTeamBubble"],
              ],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), r._12(90, null, ["", " goes first"])),
            (e()(), r._12(-1, null, ["\n  "])),
            (e()(), r.Q(16777216, null, null, 1, null, Qt)),
            r.U(93, 16384, null, 0, v, [r.E, r.B], { ngIf: [0, "ngIf"] }, null),
            (e()(), r._12(-1, null, ["\n"])),
            (e()(), r._12(-1, null, ["\n"])),
            (e()(),
            r.V(
              96,
              0,
              null,
              null,
              7,
              "div",
              [["id", "gridDiv"]],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), r._12(-1, null, ["\n  "])),
            (e()(), r.Q(16777216, null, null, 1, null, $t)),
            r.U(99, 16384, null, 0, v, [r.E, r.B], { ngIf: [0, "ngIf"] }, null),
            (e()(), r._12(-1, null, ["\n  "])),
            (e()(), r.Q(16777216, null, null, 1, null, tn)),
            r.U(
              102,
              802816,
              null,
              0,
              y,
              [r.E, r.B, r.n],
              { ngForOf: [0, "ngForOf"] },
              null
            ),
            (e()(), r._12(-1, null, ["\n"])),
          ],
          function (e, t) {
            var n = t.component;
            e(t, 7, 0, "codenames"),
              e(t, 8, 0, "codenames"),
              e(t, 12, 0, "codenames"),
              e(t, 13, 0, "codenames"),
              e(t, 17, 0, "undercover"),
              e(t, 18, 0, "undercover"),
              e(t, 22, 0, "duet"),
              e(t, 23, 0, "duet"),
              e(t, 27, 0, "emoji"),
              e(t, 28, 0, "emoji"),
              e(t, 32, 0, "francis"),
              e(t, 33, 0, "francis"),
              e(t, 37, 0, "paintings"),
              e(t, 38, 0, "paintings"),
              e(
                t,
                45,
                0,
                e(t, 46, 0, "paintings", "emoji").includes(n.modeName)
              ),
              e(t, 50, 0, n.isSpymaster),
              e(t, 57, 0, n.showChillTunes),
              e(t, 61, 0, !n.identityConfirmed),
              e(t, 87, 0, n.getRedScore() || n.getBlueScore()),
              e(t, 93, 0, n.timeSinceLastChange >= 60),
              e(t, 99, 0, n.zoom.show),
              e(t, 102, 0, n.items);
          },
          function (e, t) {
            var n = t.component;
            e(t, 66, 0, r.Y(1, "", n.ss.initialSeed, "")),
              e(
                t,
                84,
                0,
                r.Y(1, "team", n.firstTeam, " showing firstTeam bar")
              ),
              e(t, 90, 0, n.firstTeam);
          }
        );
      }
      var rn = r.T({ encapsulation: 0, styles: [[""]], data: {} });
      function on(e) {
        return r._13(
          0,
          [
            (e()(), r._12(-1, null, ["\n"])),
            (e()(),
            r.V(
              1,
              0,
              null,
              null,
              0,
              "meta",
              [
                ["content", "width=device-width,initial-scale=1"],
                ["name", "viewport"],
              ],
              null,
              null,
              null,
              null,
              null
            )),
            (e()(), r._12(-1, null, ["\n"])),
            (e()(),
            r.V(3, 0, null, null, 5, "div", [], null, null, null, null, null)),
            (e()(), r._12(-1, null, ["\n  "])),
            (e()(),
            r.V(5, 0, null, null, 2, "app-grid", [], null, null, null, nn, Vt)),
            r._10(512, null, Dt, Dt, []),
            r.U(7, 114688, null, 0, Bt, [Dt], null, null),
            (e()(), r._12(-1, null, ["\n"])),
            (e()(), r._12(-1, null, ["\n"])),
          ],
          function (e, t) {
            e(t, 7, 0);
          },
          null
        );
      }
      var an = r.R(
          "app-root",
          i,
          function (e) {
            return r._13(
              0,
              [
                (e()(),
                r.V(
                  0,
                  0,
                  null,
                  null,
                  1,
                  "app-root",
                  [],
                  null,
                  null,
                  null,
                  on,
                  rn
                )),
                r.U(1, 49152, null, 0, i, [], null, null),
              ],
              null,
              null
            );
          },
          {},
          {},
          []
        ),
        sn = r.S(o, [i], function (e) {
          return r._4([
            r._5(512, r.g, r.O, [[8, [an]], [3, r.g], r.q]),
            r._5(5120, r.p, r._8, [[3, r.p]]),
            r._5(4608, h, f, [r.p, [2, p]]),
            r._5(4608, r.f, r.f, []),
            r._5(5120, r.a, r.X, []),
            r._5(5120, r.n, r._3, []),
            r._5(5120, r.o, r._6, []),
            r._5(4608, qe, Ze, [m]),
            r._5(6144, r.z, null, [qe]),
            r._5(4608, ve, be, []),
            r._5(
              5120,
              W,
              function (e, t, n, r, o) {
                return [new ye(e, t), new Ce(n), new ge(r, o)];
              },
              [m, r.s, m, m, ve]
            ),
            r._5(4608, G, G, [W, r.s]),
            r._5(135680, Q, Q, [m]),
            r._5(4608, te, te, [G, Q]),
            r._5(6144, r.x, null, [te]),
            r._5(6144, Z, null, [Q]),
            r._5(4608, r.C, r.C, [r.s]),
            r._5(4608, D, D, [m]),
            r._5(4608, F, F, [m]),
            r._5(4608, ot, ot, []),
            r._5(512, g, g, []),
            r._5(1024, r.i, nt, []),
            r._5(
              1024,
              r.b,
              function (e) {
                return [
                  ((t = e),
                  L("probe", U),
                  L(
                    "coreTokens",
                    Object(a.a)(
                      {},
                      H,
                      (t || []).reduce(function (e, t) {
                        return (e[t.name] = t.token), e;
                      }, {})
                    )
                  ),
                  function () {
                    return U;
                  }),
                ];
                var t;
              },
              [[2, r.r]]
            ),
            r._5(512, r.c, r.c, [[2, r.b]]),
            r._5(131584, r.e, r.e, [r.s, r.P, r.m, r.i, r.g, r.c]),
            r._5(512, r.d, r.d, [r.e]),
            r._5(512, rt, rt, [[3, rt]]),
            r._5(512, lt, lt, []),
            r._5(512, ut, ut, []),
            r._5(512, o, o, []),
          ]);
        });
      Object(r.I)(),
        tt()
          .bootstrapModuleFactory(sn)
          .catch(function (e) {
            return console.log(e);
          });
    },
    f8Ud: function (e, t) {
      (function (t) {
        e.exports = t;
      }).call(t, {});
    },
    fQhz: function (e, t, n) {
      var r;
      !(function (o, i) {
        var a,
          s = this,
          l = 256,
          u = 6,
          c = "random",
          p = i.pow(l, u),
          h = i.pow(2, 52),
          f = 2 * h,
          d = l - 1;
        function y(e, t, n) {
          var r = [],
            y = v(
              (function e(t, n) {
                var r,
                  o = [],
                  i = typeof t;
                if (n && "object" == i)
                  for (r in t)
                    try {
                      o.push(e(t[r], n - 1));
                    } catch (e) {}
                return o.length ? o : "string" == i ? t : t + "\0";
              })(
                (t = 1 == t ? { entropy: !0 } : t || {}).entropy
                  ? [e, b(o)]
                  : null == e
                  ? (function () {
                      try {
                        var e;
                        return (
                          a && (e = a.randomBytes)
                            ? (e = e(l))
                            : ((e = new Uint8Array(l)),
                              (s.crypto || s.msCrypto).getRandomValues(e)),
                          b(e)
                        );
                      } catch (e) {
                        var t = s.navigator,
                          n = t && t.plugins;
                        return [+new Date(), s, n, s.screen, b(o)];
                      }
                    })()
                  : e,
                3
              ),
              r
            ),
            g = new (function (e) {
              var t,
                n = e.length,
                r = this,
                o = 0,
                i = (r.i = r.j = 0),
                a = (r.S = []);
              for (n || (e = [n++]); o < l; ) a[o] = o++;
              for (o = 0; o < l; o++)
                (a[o] = a[(i = d & (i + e[o % n] + (t = a[o])))]), (a[i] = t);
              (r.g = function (e) {
                for (var t, n = 0, o = r.i, i = r.j, a = r.S; e--; )
                  (t = a[(o = d & (o + 1))]),
                    (n =
                      n * l +
                      a[d & ((a[o] = a[(i = d & (i + t))]) + (a[i] = t))]);
                return (r.i = o), (r.j = i), n;
              })(l);
            })(r),
            m = function () {
              for (var e = g.g(u), t = p, n = 0; e < h; )
                (e = (e + n) * l), (t *= l), (n = g.g(1));
              for (; e >= f; ) (e /= 2), (t /= 2), (n >>>= 1);
              return (e + n) / t;
            };
          return (
            (m.int32 = function () {
              return 0 | g.g(4);
            }),
            (m.quick = function () {
              return g.g(4) / 4294967296;
            }),
            (m.double = m),
            v(b(g.S), o),
            (
              t.pass ||
              n ||
              function (e, t, n, r) {
                return (
                  r &&
                    (r.S && _(r, g),
                    (e.state = function () {
                      return _(g, {});
                    })),
                  n ? ((i[c] = e), t) : e
                );
              }
            )(m, y, "global" in t ? t.global : this == i, t.state)
          );
        }
        function _(e, t) {
          return (t.i = e.i), (t.j = e.j), (t.S = e.S.slice()), t;
        }
        function v(e, t) {
          for (var n, r = e + "", o = 0; o < r.length; )
            t[d & o] = d & ((n ^= 19 * t[d & o]) + r.charCodeAt(o++));
          return b(t);
        }
        function b(e) {
          return String.fromCharCode.apply(0, e);
        }
        if (
          ((i["seed" + c] = y),
          v(i.random(), o),
          "object" == typeof e && e.exports)
        ) {
          e.exports = y;
          try {
            a = n(1);
          } catch (e) {}
        } else
          void 0 ===
            (r = function () {
              return y;
            }.call(t, n, t, e)) || (e.exports = r);
      })([], Math);
    },
    fRUx: function (e, t) {
      var n;
      n = (function () {
        return this;
      })();
      try {
        n = n || Function("return this")() || (0, eval)("this");
      } catch (e) {
        "object" == typeof window && (n = window);
      }
      e.exports = n;
    },
    grVA: function (e, t, n) {
      "use strict";
      n.d(t, "a", function () {
        return r;
      });
      var r = {
        closed: !0,
        next: function (e) {},
        error: function (e) {
          throw e;
        },
        complete: function () {},
      };
    },
    "j/u5": function (e, t, n) {
      (function (e) {
        var r;
        !(function (e, o, i) {
          function a(e, t) {
            return (t.i = e.i), (t.w = e.w), (t.X = e.X.slice()), t;
          }
          function s(e, t) {
            null == e && (e = +new Date());
            var n = new (function (e) {
                var t = this;
                (t.next = function () {
                  var e,
                    n,
                    r = t.w,
                    o = t.X,
                    i = t.i;
                  return (
                    (t.w = r = (r + 1640531527) | 0),
                    (n = o[(i + 34) & 127]),
                    (e = o[(i = (i + 1) & 127)]),
                    (n ^= n << 13),
                    (e ^= e << 17),
                    (n = o[i] = (n ^= n >>> 15) ^ (e ^= e >>> 12)),
                    (t.i = i),
                    (n + (r ^ (r >>> 16))) | 0
                  );
                }),
                  (function (e, t) {
                    var n,
                      r,
                      o,
                      i,
                      a,
                      s = [],
                      l = 128;
                    for (
                      t === (0 | t)
                        ? ((r = t), (t = null))
                        : ((t += "\0"), (r = 0), (l = Math.max(l, t.length))),
                        o = 0,
                        i = -32;
                      i < l;
                      ++i
                    )
                      t && (r ^= t.charCodeAt((i + 32) % t.length)),
                        0 === i && (a = r),
                        (r ^= r << 10),
                        (r ^= r >>> 15),
                        (r ^= r << 4),
                        (r ^= r >>> 13),
                        i >= 0 &&
                          (o =
                            0 ==
                            (n = s[127 & i] ^= r + (a = (a + 1640531527) | 0))
                              ? o + 1
                              : 0);
                    for (
                      o >= 128 && (s[127 & ((t && t.length) || 0)] = -1),
                        o = 127,
                        i = 512;
                      i > 0;
                      --i
                    )
                      (r = s[(o + 34) & 127]),
                        (n = s[(o = (o + 1) & 127)]),
                        (r ^= r << 13),
                        (n ^= n << 17),
                        (s[o] = (r ^= r >>> 15) ^ (n ^= n >>> 12));
                    (e.w = a), (e.X = s), (e.i = o);
                  })(t, e);
              })(e),
              r = t && t.state,
              o = function () {
                return (n.next() >>> 0) / 4294967296;
              };
            return (
              (o.double = function () {
                do {
                  var e =
                    ((n.next() >>> 11) + (n.next() >>> 0) / 4294967296) /
                    (1 << 21);
                } while (0 === e);
                return e;
              }),
              (o.int32 = n.next),
              (o.quick = o),
              r &&
                (r.X && a(r, n),
                (o.state = function () {
                  return a(n, {});
                })),
              o
            );
          }
          o && o.exports
            ? (o.exports = s)
            : n("MwgA") && n("f8Ud")
            ? void 0 ===
                (r = function () {
                  return s;
                }.call(t, n, t, o)) || (o.exports = r)
            : (this.xor4096 = s);
        })(0, "object" == typeof e && e, n("MwgA"));
      }).call(t, n("ZwkM")(e));
    },
    lI6h: function (e, t, n) {
      "use strict";
      n.d(t, "a", function () {
        return o;
      });
      var r = n("6Xbx"),
        o = (function (e) {
          function t() {
            e.apply(this, arguments);
          }
          return (
            Object(r.b)(t, e),
            (t.prototype.notifyNext = function (e, t, n, r, o) {
              this.destination.next(t);
            }),
            (t.prototype.notifyError = function (e, t) {
              this.destination.error(e);
            }),
            (t.prototype.notifyComplete = function (e) {
              this.destination.complete();
            }),
            t
          );
        })(n("E9/g").a);
    },
    mKHA: function (e, t, n) {
      (function (e) {
        var r;
        !(function (e, o, i) {
          function a(e, t) {
            return (t.a = e.a), (t.b = e.b), (t.c = e.c), (t.d = e.d), t;
          }
          function s(e, t) {
            var n = new (function (e) {
                var t = this,
                  n = "";
                (t.next = function () {
                  var e = t.b,
                    n = t.c,
                    r = t.d,
                    o = t.a;
                  return (
                    (e = (e << 25) ^ (e >>> 7) ^ n),
                    (n = (n - r) | 0),
                    (r = (r << 24) ^ (r >>> 8) ^ o),
                    (o = (o - e) | 0),
                    (t.b = e = (e << 20) ^ (e >>> 12) ^ n),
                    (t.c = n = (n - r) | 0),
                    (t.d = (r << 16) ^ (n >>> 16) ^ o),
                    (t.a = (o - e) | 0)
                  );
                }),
                  (t.a = 0),
                  (t.b = 0),
                  (t.c = -1640531527),
                  (t.d = 1367130551),
                  e === Math.floor(e)
                    ? ((t.a = (e / 4294967296) | 0), (t.b = 0 | e))
                    : (n += e);
                for (var r = 0; r < n.length + 20; r++)
                  (t.b ^= 0 | n.charCodeAt(r)), t.next();
              })(e),
              r = t && t.state,
              o = function () {
                return (n.next() >>> 0) / 4294967296;
              };
            return (
              (o.double = function () {
                do {
                  var e =
                    ((n.next() >>> 11) + (n.next() >>> 0) / 4294967296) /
                    (1 << 21);
                } while (0 === e);
                return e;
              }),
              (o.int32 = n.next),
              (o.quick = o),
              r &&
                ("object" == typeof r && a(r, n),
                (o.state = function () {
                  return a(n, {});
                })),
              o
            );
          }
          o && o.exports
            ? (o.exports = s)
            : n("MwgA") && n("f8Ud")
            ? void 0 ===
                (r = function () {
                  return s;
                }.call(t, n, t, o)) || (o.exports = r)
            : (this.tychei = s);
        })(0, "object" == typeof e && e, n("MwgA"));
      }).call(t, n("ZwkM")(e));
    },
    mz3w: function (e, t, n) {
      "use strict";
      n.d(t, "a", function () {
        return r;
      });
      var r = (function (e) {
        var t,
          r = n("xIGM").a.Symbol;
        return (
          "function" == typeof r
            ? r.observable
              ? (t = r.observable)
              : ((t = r("observable")), (r.observable = t))
            : (t = "@@observable"),
          t
        );
      })();
    },
    qLnt: function (e, t, n) {
      "use strict";
      var r,
        o = n("1j/l"),
        i = n("NGRF"),
        a = n("B1iP"),
        s = { e: {} };
      function l() {
        try {
          return r.apply(this, arguments);
        } catch (e) {
          return (s.e = e), s;
        }
      }
      function u(e) {
        return (r = e), l;
      }
      var c = n("6Xbx"),
        p = (function (e) {
          function t(t) {
            e.call(this), (this.errors = t);
            var n = Error.call(
              this,
              t
                ? t.length +
                    " errors occurred during unsubscription:\n  " +
                    t
                      .map(function (e, t) {
                        return t + 1 + ") " + e.toString();
                      })
                      .join("\n  ")
                : ""
            );
            (this.name = n.name = "UnsubscriptionError"),
              (this.stack = n.stack),
              (this.message = n.message);
          }
          return Object(c.b)(t, e), t;
        })(Error);
      n.d(t, "a", function () {
        return h;
      });
      var h = (function () {
        function e(e) {
          (this.closed = !1),
            (this._parent = null),
            (this._parents = null),
            (this._subscriptions = null),
            e && (this._unsubscribe = e);
        }
        var t;
        return (
          (e.prototype.unsubscribe = function () {
            var e,
              t = !1;
            if (!this.closed) {
              var n = this._parent,
                r = this._parents,
                l = this._unsubscribe,
                c = this._subscriptions;
              (this.closed = !0),
                (this._parent = null),
                (this._parents = null),
                (this._subscriptions = null);
              for (var h = -1, d = r ? r.length : 0; n; )
                n.remove(this), (n = (++h < d && r[h]) || null);
              if (
                (Object(a.a)(l) &&
                  u(l).call(this) === s &&
                  ((t = !0),
                  (e = e || (s.e instanceof p ? f(s.e.errors) : [s.e]))),
                Object(o.a)(c))
              )
                for (h = -1, d = c.length; ++h < d; ) {
                  var y = c[h];
                  if (Object(i.a)(y) && u(y.unsubscribe).call(y) === s) {
                    (t = !0), (e = e || []);
                    var _ = s.e;
                    _ instanceof p ? (e = e.concat(f(_.errors))) : e.push(_);
                  }
                }
              if (t) throw new p(e);
            }
          }),
          (e.prototype.add = function (t) {
            if (!t || t === e.EMPTY) return e.EMPTY;
            if (t === this) return this;
            var n = t;
            switch (typeof t) {
              case "function":
                n = new e(t);
              case "object":
                if (n.closed || "function" != typeof n.unsubscribe) return n;
                if (this.closed) return n.unsubscribe(), n;
                if ("function" != typeof n._addParent) {
                  var r = n;
                  (n = new e())._subscriptions = [r];
                }
                break;
              default:
                throw new Error(
                  "unrecognized teardown " + t + " added to Subscription."
                );
            }
            return (
              (this._subscriptions || (this._subscriptions = [])).push(n),
              n._addParent(this),
              n
            );
          }),
          (e.prototype.remove = function (e) {
            var t = this._subscriptions;
            if (t) {
              var n = t.indexOf(e);
              -1 !== n && t.splice(n, 1);
            }
          }),
          (e.prototype._addParent = function (e) {
            var t = this._parent,
              n = this._parents;
            t && t !== e
              ? n
                ? -1 === n.indexOf(e) && n.push(e)
                : (this._parents = [e])
              : (this._parent = e);
          }),
          (e.EMPTY = (((t = new e()).closed = !0), t)),
          e
        );
      })();
      function f(e) {
        return e.reduce(function (e, t) {
          return e.concat(t instanceof p ? t.errors : t);
        }, []);
      }
    },
    qgI0: function (e, t, n) {
      "use strict";
      var r = n("xIGM"),
        o = n("NGRF"),
        i = n("AP4T"),
        a = (function (e) {
          var t = e.Symbol;
          if ("function" == typeof t)
            return (
              t.iterator || (t.iterator = t("iterator polyfill")), t.iterator
            );
          var n = e.Set;
          if (n && "function" == typeof new n()["@@iterator"])
            return "@@iterator";
          var r = e.Map;
          if (r)
            for (
              var o = Object.getOwnPropertyNames(r.prototype), i = 0;
              i < o.length;
              ++i
            ) {
              var a = o[i];
              if (
                "entries" !== a &&
                "size" !== a &&
                r.prototype[a] === r.prototype.entries
              )
                return a;
            }
          return "@@iterator";
        })(r.a),
        s = n("6Xbx"),
        l = (function (e) {
          function t(t, n, r) {
            e.call(this),
              (this.parent = t),
              (this.outerValue = n),
              (this.outerIndex = r),
              (this.index = 0);
          }
          return (
            Object(s.b)(t, e),
            (t.prototype._next = function (e) {
              this.parent.notifyNext(
                this.outerValue,
                e,
                this.outerIndex,
                this.index++,
                this
              );
            }),
            (t.prototype._error = function (e) {
              this.parent.notifyError(e, this), this.unsubscribe();
            }),
            (t.prototype._complete = function () {
              this.parent.notifyComplete(this), this.unsubscribe();
            }),
            t
          );
        })(n("E9/g").a),
        u = n("mz3w");
      t.a = function (e, t, n, s) {
        var c,
          p = new l(e, n, s);
        if (p.closed) return null;
        if (t instanceof i.a)
          return t._isScalar
            ? (p.next(t.value), p.complete(), null)
            : ((p.syncErrorThrowable = !0), t.subscribe(p));
        if ((c = t) && "number" == typeof c.length) {
          for (var h = 0, f = t.length; h < f && !p.closed; h++) p.next(t[h]);
          p.closed || p.complete();
        } else {
          if (
            t &&
            "function" != typeof t.subscribe &&
            "function" == typeof t.then
          )
            return (
              t
                .then(
                  function (e) {
                    p.closed || (p.next(e), p.complete());
                  },
                  function (e) {
                    return p.error(e);
                  }
                )
                .then(null, function (e) {
                  r.a.setTimeout(function () {
                    throw e;
                  });
                }),
              p
            );
          if (t && "function" == typeof t[a])
            for (var d = t[a](); ; ) {
              var y = d.next();
              if (y.done) {
                p.complete();
                break;
              }
              if ((p.next(y.value), p.closed)) break;
            }
          else if (t && "function" == typeof t[u.a]) {
            var _ = t[u.a]();
            if ("function" == typeof _.subscribe)
              return _.subscribe(new l(e, n, s));
            p.error(
              new TypeError(
                "Provided object does not correctly implement Symbol.observable"
              )
            );
          } else {
            var v = Object(o.a)(t) ? "an invalid object" : "'" + t + "'";
            p.error(
              new TypeError(
                "You provided " +
                  v +
                  " where a stream was expected. You can provide an Observable, Promise, Array, or Iterable."
              )
            );
          }
        }
        return null;
      };
    },
    qs7J: function (e, t, n) {
      e.exports = {
        100: { character: "\ud83d\udcaf", syllables: 3, types: ["noun"] },
        1234: { character: "\ud83d\udd22", syllables: 4, types: [] },
        "+1": {
          character: "\ud83d\udc4d",
          syllables: 2,
          types: ["interjection"],
        },
        "-1": { character: "\ud83d\udc4e", syllables: 3, types: [] },
        "8ball": { character: "\ud83c\udfb1", syllables: 2, types: [] },
        a: {
          character: "\ud83c\udd70",
          syllables: 1,
          types: [
            "noun",
            "idiom",
            "indefinite-article",
            "preposition",
            "auxiliary-verb",
            "abbreviation",
          ],
        },
        ab: { character: "\ud83c\udd8e", syllables: 1, types: ["noun"] },
        abc: { character: "\ud83d\udd24", syllables: 3, types: [] },
        abcd: { character: "\ud83d\udd21", syllables: 4, types: [] },
        accept: {
          character: "\ud83c\ude51",
          syllables: 2,
          types: ["verb-transitive", "verb-intransitive"],
        },
        aerial_tramway: { character: "\ud83d\udea1", syllables: 3, types: [] },
        airplane: { character: "\u2708\ufe0f", syllables: 2, types: ["noun"] },
        alarm_clock: { character: "\u23f0", syllables: 3, types: [] },
        alien: {
          character: "\ud83d\udc7d",
          syllables: 3,
          types: ["adjective", "noun", "verb-transitive"],
        },
        ambulance: { character: "\ud83d\ude91", syllables: 3, types: ["noun"] },
        anchor: {
          character: "\u2693\ufe0f",
          syllables: 2,
          types: ["noun", "verb-transitive", "verb-intransitive"],
        },
        angel: { character: "\ud83d\udc7c", syllables: 2, types: ["noun"] },
        anger: {
          character: "\ud83d\udca2",
          syllables: 2,
          types: ["noun", "verb-transitive", "verb-intransitive"],
        },
        angry: {
          character: "\ud83d\ude20",
          syllables: 2,
          types: ["adjective"],
        },
        anguished: {
          character: "\ud83d\ude1f",
          syllables: 2,
          types: ["adjective"],
        },
        ant: {
          character: "\ud83d\udc1c",
          syllables: 1,
          types: ["noun", "idiom"],
        },
        apple: {
          character: "\ud83c\udf4e",
          syllables: 2,
          types: ["noun", "idiom"],
        },
        aquarius: { character: "\u2652\ufe0f", syllables: 4, types: [] },
        aries: { character: "\u2648\ufe0f", syllables: 2, types: [] },
        arrow_backward: { character: "\u25c0\ufe0f", syllables: 4, types: [] },
        arrow_double_down: { character: "\u23ec", syllables: 5, types: [] },
        arrow_double_up: { character: "\u23eb", syllables: 5, types: [] },
        arrow_down: { character: "\u2b07\ufe0f", syllables: 3, types: [] },
        arrow_down_small: {
          character: "\ud83d\udd3d",
          syllables: 4,
          types: [],
        },
        arrow_forward: { character: "\u25b6\ufe0f", syllables: 4, types: [] },
        arrow_heading_down: {
          character: "\u2935\ufe0f",
          syllables: 5,
          types: [],
        },
        arrow_heading_up: {
          character: "\u2934\ufe0f",
          syllables: 5,
          types: [],
        },
        arrow_left: { character: "\u2b05\ufe0f", syllables: 3, types: [] },
        arrow_lower_left: {
          character: "\u2199\ufe0f",
          syllables: 5,
          types: [],
        },
        arrow_lower_right: {
          character: "\u2198\ufe0f",
          syllables: 5,
          types: [],
        },
        arrow_right: { character: "\u27a1\ufe0f", syllables: 3, types: [] },
        arrow_right_hook: {
          character: "\u21aa\ufe0f",
          syllables: 4,
          types: [],
        },
        arrow_up: { character: "\u2b06\ufe0f", syllables: 3, types: [] },
        arrow_up_down: { character: "\u2195\ufe0f", syllables: 4, types: [] },
        arrow_up_small: { character: "\ud83d\udd3c", syllables: 4, types: [] },
        arrow_upper_left: {
          character: "\u2196\ufe0f",
          syllables: 5,
          types: [],
        },
        arrow_upper_right: {
          character: "\u2197\ufe0f",
          syllables: 5,
          types: [],
        },
        arrows_clockwise: {
          character: "\ud83d\udd03",
          syllables: 4,
          types: [],
        },
        arrows_counterclockwise: {
          character: "\ud83d\udd04",
          syllables: 6,
          types: [],
        },
        art: {
          character: "\ud83c\udfa8",
          syllables: 1,
          types: ["noun", "verb"],
        },
        articulated_lorry: {
          character: "\ud83d\ude9b",
          syllables: 7,
          types: [],
        },
        astonished: {
          character: "\ud83d\ude32",
          syllables: 3,
          types: ["adjective", "verb"],
        },
        atm: {
          character: "\ud83c\udfe7",
          syllables: 3,
          types: ["abbreviation"],
        },
        b: {
          character: "\ud83c\udd71",
          syllables: 1,
          types: ["noun", "abbreviation"],
        },
        baby: {
          character: "\ud83d\udc76",
          syllables: 2,
          types: ["noun", "adjective", "verb-transitive"],
        },
        baby_bottle: { character: "\ud83c\udf7c", syllables: 4, types: [] },
        baby_chick: { character: "\ud83d\udc24", syllables: 3, types: [] },
        baby_symbol: { character: "\ud83d\udebc", syllables: 4, types: [] },
        baggage_claim: { character: "\ud83d\udec4", syllables: 3, types: [] },
        balloon: {
          character: "\ud83c\udf88",
          syllables: 2,
          types: ["noun", "verb-intransitive", "verb-transitive", "adjective"],
        },
        ballot_box_with_check: {
          character: "\u2611\ufe0f",
          syllables: 5,
          types: [],
        },
        bamboo: { character: "\ud83c\udf8d", syllables: 2, types: ["noun"] },
        banana: { character: "\ud83c\udf4c", syllables: 3, types: ["noun"] },
        bangbang: { character: "\u203c\ufe0f", syllables: 2, types: [] },
        bank: {
          character: "\ud83c\udfe6",
          syllables: 1,
          types: [
            "noun",
            "verb-transitive",
            "verb-intransitive",
            "phrasal-verb",
          ],
        },
        bar_chart: { character: "\ud83d\udcca", syllables: 2, types: [] },
        barber: {
          character: "\ud83d\udc88",
          syllables: 2,
          types: ["noun", "verb-transitive", "verb-intransitive"],
        },
        baseball: { character: "\u26be\ufe0f", syllables: 2, types: ["noun"] },
        basketball: {
          character: "\ud83c\udfc0",
          syllables: 3,
          types: ["noun"],
        },
        bath: { character: "\ud83d\udec0", syllables: 1, types: ["noun"] },
        bathtub: { character: "\ud83d\udec1", syllables: 2, types: ["noun"] },
        battery: { character: "\ud83d\udd0b", syllables: 3, types: ["noun"] },
        bear: {
          character: "\ud83d\udc3b",
          syllables: 1,
          types: [
            "verb-transitive",
            "verb-intransitive",
            "phrasal-verb",
            "idiom",
            "noun",
            "adjective",
          ],
        },
        bee: {
          character: "\ud83d\udc1d",
          syllables: 1,
          types: ["noun", "idiom"],
        },
        beer: { character: "\ud83c\udf7a", syllables: 1, types: ["noun"] },
        beers: { character: "\ud83c\udf7b", syllables: 1, types: ["noun"] },
        beetle: {
          character: "\ud83d\udc1e",
          syllables: 2,
          types: ["noun", "verb-intransitive", "adjective"],
        },
        beginner: { character: "\ud83d\udd30", syllables: 3, types: ["noun"] },
        bell: {
          character: "\ud83d\udd14",
          syllables: 1,
          types: ["noun", "verb-transitive", "verb-intransitive", "idiom"],
        },
        bento: { character: "\ud83c\udf71", syllables: 2, types: ["noun"] },
        bicyclist: { character: "\ud83d\udeb4", syllables: 3, types: ["noun"] },
        bike: {
          character: "\ud83d\udeb2",
          syllables: 1,
          types: ["noun", "verb-intransitive"],
        },
        bikini: { character: "\ud83d\udc59", syllables: 3, types: ["noun"] },
        bird: {
          character: "\ud83d\udc26",
          syllables: 1,
          types: ["noun", "verb-intransitive", "idiom"],
        },
        birthday: { character: "\ud83c\udf82", syllables: 2, types: ["noun"] },
        black_circle: { character: "\u26ab", syllables: 3, types: [] },
        black_joker: { character: "\ud83c\udccf", syllables: 3, types: [] },
        black_nib: { character: "\u2712\ufe0f", syllables: 2, types: [] },
        black_square: { character: "\u2b1b\ufe0f", syllables: 2, types: [] },
        black_square_button: {
          character: "\ud83d\udd32",
          syllables: 4,
          types: [],
        },
        blossom: {
          character: "\ud83c\udf3c",
          syllables: 2,
          types: ["noun", "verb-intransitive"],
        },
        blowfish: { character: "\ud83d\udc21", syllables: 2, types: ["noun"] },
        blue_book: { character: "\ud83d\udcd8", syllables: 2, types: [] },
        blue_car: { character: "\ud83d\ude99", syllables: 2, types: [] },
        blue_heart: { character: "\ud83d\udc99", syllables: 2, types: [] },
        blush: {
          character: "\ud83d\ude0a",
          syllables: 1,
          types: ["verb-intransitive", "noun"],
        },
        boar: { character: "\ud83d\udc17", syllables: 1, types: ["noun"] },
        boat: {
          character: "\u26f5\ufe0f",
          syllables: 1,
          types: ["noun", "verb-intransitive", "verb-transitive", "idiom"],
        },
        bomb: {
          character: "\ud83d\udca3",
          syllables: 1,
          types: ["noun", "verb-transitive", "verb-intransitive"],
        },
        book: {
          character: "\ud83d\udcd6",
          syllables: 1,
          types: [
            "noun",
            "verb-transitive",
            "verb-intransitive",
            "adjective",
            "idiom",
          ],
        },
        bookmark: { character: "\ud83d\udd16", syllables: 2, types: ["noun"] },
        bookmark_tabs: { character: "\ud83d\udcd1", syllables: 3, types: [] },
        books: {
          character: "\ud83d\udcda",
          syllables: 1,
          types: ["noun", "verb"],
        },
        boom: {
          character: "\ud83d\udca5",
          syllables: 1,
          types: ["verb-intransitive", "verb-transitive", "noun", "idiom"],
        },
        boot: {
          character: "\ud83d\udc62",
          syllables: 1,
          types: ["noun", "verb-transitive", "verb-intransitive", "idiom"],
        },
        bouquet: { character: "\ud83d\udc90", syllables: 2, types: ["noun"] },
        bow: {
          character: "\ud83d\ude47",
          syllables: 1,
          types: [
            "noun",
            "verb-intransitive",
            "verb-transitive",
            "phrasal-verb",
            "idiom",
          ],
        },
        bowling: { character: "\ud83c\udfb3", syllables: 2, types: ["noun"] },
        boy: {
          character: "\ud83d\udc66",
          syllables: 1,
          types: ["noun", "interjection"],
        },
        bread: {
          character: "\ud83c\udf5e",
          syllables: 1,
          types: ["noun", "verb-transitive"],
        },
        bride_with_veil: { character: "\ud83d\udc70", syllables: 3, types: [] },
        bridge_at_night: { character: "\ud83c\udf09", syllables: 3, types: [] },
        briefcase: { character: "\ud83d\udcbc", syllables: 2, types: ["noun"] },
        broken_heart: { character: "\ud83d\udc94", syllables: 3, types: [] },
        bug: {
          character: "\ud83d\udc1b",
          syllables: 1,
          types: [
            "noun",
            "verb-intransitive",
            "verb-transitive",
            "phrasal-verb",
            "idiom",
          ],
        },
        bulb: { character: "\ud83d\udca1", syllables: 1, types: ["noun"] },
        bullettrain_front: {
          character: "\ud83d\ude86",
          syllables: 4,
          types: [],
        },
        bullettrain_side: {
          character: "\ud83d\ude85",
          syllables: 4,
          types: [],
        },
        bus: {
          character: "\ud83d\ude8c",
          syllables: 1,
          types: ["noun", "verb-transitive", "verb-intransitive"],
        },
        busstop: { character: "\ud83d\ude8f", syllables: 2, types: [] },
        bust_in_silhouette: {
          character: "\ud83d\udc64",
          syllables: 5,
          types: [],
        },
        busts_in_silhouette: {
          character: "\ud83d\udc65",
          syllables: 5,
          types: [],
        },
        cactus: { character: "\ud83c\udf35", syllables: 2, types: ["noun"] },
        cake: {
          character: "\ud83c\udf70",
          syllables: 1,
          types: ["noun", "verb-transitive", "verb-intransitive"],
        },
        calendar: {
          character: "\ud83d\udcc6",
          syllables: 3,
          types: ["noun", "verb-transitive"],
        },
        calling: { character: "\ud83d\udcf2", syllables: 2, types: ["noun"] },
        camel: { character: "\ud83d\udc2b", syllables: 2, types: ["noun"] },
        camera: {
          character: "\ud83d\udcf7",
          syllables: 3,
          types: ["noun", "idiom"],
        },
        cancer: { character: "\u264b\ufe0f", syllables: 2, types: ["noun"] },
        candy: {
          character: "\ud83c\udf6c",
          syllables: 2,
          types: ["noun", "verb-transitive", "verb-intransitive"],
        },
        capital_abcd: { character: "\ud83d\udd20", syllables: 7, types: [] },
        capricorn: { character: "\u2651\ufe0f", syllables: 3, types: [] },
        car: { character: "\ud83d\ude97", syllables: 1, types: ["noun"] },
        card_index: { character: "\ud83d\udcc7", syllables: 3, types: [] },
        carousel_horse: { character: "\ud83c\udfa0", syllables: 4, types: [] },
        cat: {
          character: "\ud83d\udc31",
          syllables: 1,
          types: ["noun", "verb-transitive", "verb-intransitive", "idiom"],
        },
        cat2: { character: "\ud83d\udc08", syllables: 2, types: [] },
        cd: {
          character: "\ud83d\udcbf",
          syllables: 2,
          types: ["abbreviation"],
        },
        chart: {
          character: "\ud83d\udcb9",
          syllables: 1,
          types: ["noun", "verb-transitive", "verb-intransitive"],
        },
        chart_with_downwards_trend: {
          character: "\ud83d\udcc9",
          syllables: 5,
          types: [],
        },
        chart_with_upwards_trend: {
          character: "\ud83d\udcc8",
          syllables: 5,
          types: [],
        },
        checkered_flag: { character: "\ud83c\udfc1", syllables: 3, types: [] },
        cherries: { character: "\ud83c\udf52", syllables: 2, types: ["noun"] },
        cherry_blossom: { character: "\ud83c\udf38", syllables: 4, types: [] },
        chestnut: {
          character: "\ud83c\udf30",
          syllables: 2,
          types: ["noun", "adjective"],
        },
        chicken: {
          character: "\ud83d\udc14",
          syllables: 2,
          types: ["noun", "adjective", "verb-intransitive"],
        },
        children_crossing: {
          character: "\ud83d\udeb8",
          syllables: 4,
          types: [],
        },
        chocolate_bar: { character: "\ud83c\udf6b", syllables: 3, types: [] },
        christmas_tree: { character: "\ud83c\udf84", syllables: 3, types: [] },
        church: {
          character: "\u26ea\ufe0f",
          syllables: 1,
          types: ["noun", "verb-transitive", "adjective"],
        },
        cinema: { character: "\ud83c\udfa6", syllables: 3, types: ["noun"] },
        circus_tent: { character: "\ud83c\udfaa", syllables: 3, types: [] },
        city_sunrise: { character: "\ud83c\udf07", syllables: 4, types: [] },
        city_sunset: { character: "\ud83c\udf06", syllables: 4, types: [] },
        cl: {
          character: "\ud83c\udd91",
          syllables: 2,
          types: ["abbreviation"],
        },
        clap: {
          character: "\ud83d\udc4f",
          syllables: 1,
          types: ["verb-intransitive", "verb-transitive", "noun"],
        },
        clapper: { character: "\ud83c\udfac", syllables: 2, types: ["noun"] },
        clipboard: { character: "\ud83d\udccb", syllables: 2, types: ["noun"] },
        clock1: { character: "\ud83d\udd50", syllables: 2, types: [] },
        clock10: { character: "\ud83d\udd59", syllables: 2, types: [] },
        clock1030: { character: "\ud83d\udd65", syllables: 4, types: [] },
        clock11: { character: "\ud83d\udd5a", syllables: 4, types: [] },
        clock1130: { character: "\ud83d\udd66", syllables: 6, types: [] },
        clock12: { character: "\ud83d\udd5b", syllables: 2, types: [] },
        clock1230: { character: "\ud83d\udd67", syllables: 4, types: [] },
        clock130: { character: "\ud83d\udd5c", syllables: 4, types: [] },
        clock2: { character: "\ud83d\udd51", syllables: 2, types: [] },
        clock230: { character: "\ud83d\udd5d", syllables: 4, types: [] },
        clock3: { character: "\ud83d\udd52", syllables: 2, types: [] },
        clock330: { character: "\ud83d\udd5e", syllables: 4, types: [] },
        clock4: { character: "\ud83d\udd53", syllables: 2, types: [] },
        clock430: { character: "\ud83d\udd5f", syllables: 4, types: [] },
        clock5: { character: "\ud83d\udd54", syllables: 2, types: [] },
        clock530: { character: "\ud83d\udd60", syllables: 4, types: [] },
        clock6: { character: "\ud83d\udd55", syllables: 2, types: [] },
        clock630: { character: "\ud83d\udd61", syllables: 4, types: [] },
        clock7: { character: "\ud83d\udd56", syllables: 3, types: [] },
        clock730: { character: "\ud83d\udd62", syllables: 5, types: [] },
        clock8: { character: "\ud83d\udd57", syllables: 2, types: [] },
        clock830: { character: "\ud83d\udd63", syllables: 4, types: [] },
        clock9: { character: "\ud83d\udd58", syllables: 2, types: [] },
        clock930: { character: "\ud83d\udd64", syllables: 4, types: [] },
        closed_book: { character: "\ud83d\udcd5", syllables: 2, types: [] },
        closed_lock_with_key: {
          character: "\ud83d\udd10",
          syllables: 4,
          types: [],
        },
        closed_umbrella: { character: "\ud83c\udf02", syllables: 4, types: [] },
        cloud: {
          character: "\u2601\ufe0f",
          syllables: 1,
          types: ["noun", "verb-transitive", "verb-intransitive", "idiom"],
        },
        clubs: {
          character: "\u2663\ufe0f",
          syllables: 1,
          types: ["verb", "noun"],
        },
        cn: { character: "\ud83c\udde8\ud83c\uddf3", syllables: 2, types: [] },
        cocktail: {
          character: "\ud83c\udf78",
          syllables: 2,
          types: ["noun", "adjective"],
        },
        coffee: { character: "\u2615\ufe0f", syllables: 2, types: ["noun"] },
        cold_sweat: { character: "\ud83d\ude30", syllables: 2, types: [] },
        collision: { character: "\ud83d\udca5", syllables: 3, types: ["noun"] },
        computer: { character: "\ud83d\udcbb", syllables: 3, types: ["noun"] },
        confetti_ball: { character: "\ud83c\udf8a", syllables: 4, types: [] },
        confounded: {
          character: "\ud83d\ude16",
          syllables: 3,
          types: ["adjective"],
        },
        confused: {
          character: "\ud83d\ude15",
          syllables: 2,
          types: ["adjective"],
        },
        congratulations: {
          character: "\u3297\ufe0f",
          syllables: 5,
          types: ["interjection", "noun"],
        },
        construction: {
          character: "\ud83d\udea7",
          syllables: 3,
          types: ["noun"],
        },
        construction_worker: {
          character: "\ud83d\udc77",
          syllables: 5,
          types: [],
        },
        convenience_store: {
          character: "\ud83c\udfea",
          syllables: 4,
          types: [],
        },
        cookie: { character: "\ud83c\udf6a", syllables: 2, types: ["noun"] },
        cool: {
          character: "\ud83c\udd92",
          syllables: 1,
          types: [
            "adjective",
            "adverb",
            "verb-transitive",
            "verb-intransitive",
            "noun",
            "idiom",
          ],
        },
        cop: {
          character: "\ud83d\udc6e",
          syllables: 1,
          types: ["noun", "verb-transitive", "phrasal-verb", "idiom"],
        },
        copyright: {
          character: "\xa9",
          syllables: 3,
          types: ["noun", "adjective", "verb-transitive"],
        },
        corn: {
          character: "\ud83c\udf3d",
          syllables: 1,
          types: ["noun", "verb-transitive", "verb-intransitive"],
        },
        couple: {
          character: "\ud83d\udc6b",
          syllables: 2,
          types: ["noun", "verb-transitive", "verb-intransitive", "adjective"],
        },
        couple_with_heart: {
          character: "\ud83d\udc91",
          syllables: 4,
          types: [],
        },
        couplekiss: { character: "\ud83d\udc8f", syllables: 3, types: [] },
        cow: {
          character: "\ud83d\udc2e",
          syllables: 1,
          types: ["noun", "idiom", "verb-transitive"],
        },
        cow2: { character: "\ud83d\udc04", syllables: 2, types: [] },
        credit_card: { character: "\ud83d\udcb3", syllables: 3, types: [] },
        crocodile: { character: "\ud83d\udc0a", syllables: 3, types: ["noun"] },
        crossed_flags: { character: "\ud83c\udf8c", syllables: 2, types: [] },
        crown: {
          character: "\ud83d\udc51",
          syllables: 1,
          types: ["noun", "verb-transitive", "verb-intransitive"],
        },
        cry: {
          character: "\ud83d\ude22",
          syllables: 1,
          types: [
            "verb-intransitive",
            "verb-transitive",
            "noun",
            "phrasal-verb",
            "idiom",
          ],
        },
        crying_cat_face: { character: "\ud83d\ude3f", syllables: 4, types: [] },
        crystal_ball: { character: "\ud83d\udd2e", syllables: 3, types: [] },
        cupid: { character: "\ud83d\udc98", syllables: 2, types: ["noun"] },
        curly_loop: { character: "\u27b0", syllables: 3, types: [] },
        currency_exchange: {
          character: "\ud83d\udcb1",
          syllables: 5,
          types: [],
        },
        curry: {
          character: "\ud83c\udf5b",
          syllables: 2,
          types: ["verb-transitive", "idiom", "noun"],
        },
        custard: { character: "\ud83c\udf6e", syllables: 2, types: ["noun"] },
        customs: { character: "\ud83d\udec3", syllables: 2, types: ["noun"] },
        cyclone: { character: "\ud83c\udf00", syllables: 2, types: ["noun"] },
        dancer: { character: "\ud83d\udc83", syllables: 2, types: ["noun"] },
        dancers: { character: "\ud83d\udc6f", syllables: 2, types: ["noun"] },
        dango: { character: "\ud83c\udf61", syllables: 2, types: [] },
        dart: {
          character: "\ud83c\udfaf",
          syllables: 1,
          types: ["noun", "verb-intransitive", "verb-transitive"],
        },
        dash: {
          character: "\ud83d\udca8",
          syllables: 1,
          types: ["verb-transitive", "verb-intransitive", "noun"],
        },
        date: {
          character: "\ud83d\udcc5",
          syllables: 1,
          types: ["noun", "verb-transitive", "verb-intransitive", "idiom"],
        },
        de: {
          character: "\ud83c\udde9\ud83c\uddea",
          syllables: 1,
          types: ["noun", "verb"],
        },
        deciduous_tree: { character: "\ud83c\udf33", syllables: 5, types: [] },
        department_store: {
          character: "\ud83c\udfec",
          syllables: 4,
          types: [],
        },
        diamond_shape_with_a_dot_inside: {
          character: "\ud83d\udca0",
          syllables: 8,
          types: [],
        },
        diamonds: {
          character: "\u2666\ufe0f",
          syllables: 2,
          types: ["noun", "verb"],
        },
        disappointed: {
          character: "\ud83d\ude1e",
          syllables: 4,
          types: ["adjective"],
        },
        disappointed_relieved: {
          character: "\ud83d\ude25",
          syllables: 6,
          types: [],
        },
        dizzy: {
          character: "\ud83d\udcab",
          syllables: 2,
          types: ["adjective", "verb-transitive"],
        },
        dizzy_face: { character: "\ud83d\ude35", syllables: 3, types: [] },
        do_not_litter: { character: "\ud83d\udeaf", syllables: 4, types: [] },
        dog: {
          character: "\ud83d\udc36",
          syllables: 1,
          types: ["noun", "adverb", "verb-transitive", "idiom"],
        },
        dog2: { character: "\ud83d\udc15", syllables: 2, types: [] },
        dollar: { character: "\ud83d\udcb5", syllables: 2, types: ["noun"] },
        dolls: { character: "\ud83c\udf8e", syllables: 1, types: ["noun"] },
        dolphin: { character: "\ud83d\udc2c", syllables: 2, types: ["noun"] },
        donut: { character: "\ud83c\udf69", syllables: 2, types: ["noun"] },
        door: {
          character: "\ud83d\udeaa",
          syllables: 1,
          types: ["noun", "verb-transitive", "idiom"],
        },
        doughnut: { character: "\ud83c\udf69", syllables: 2, types: ["noun"] },
        dragon: { character: "\ud83d\udc09", syllables: 2, types: ["noun"] },
        dragon_face: { character: "\ud83d\udc32", syllables: 3, types: [] },
        dress: {
          character: "\ud83d\udc57",
          syllables: 1,
          types: [
            "verb-transitive",
            "verb-intransitive",
            "noun",
            "adjective",
            "phrasal-verb",
            "idiom",
          ],
        },
        dromedary_camel: { character: "\ud83d\udc2a", syllables: 6, types: [] },
        droplet: { character: "\ud83d\udca7", syllables: 2, types: ["noun"] },
        dvd: { character: "\ud83d\udcc0", syllables: 3, types: [] },
        "e-mail": {
          character: "\ud83d\udce7",
          syllables: 2,
          types: ["noun", "verb-transitive"],
        },
        ear: {
          character: "\ud83d\udc42",
          syllables: 1,
          types: ["noun", "idiom", "verb-intransitive"],
        },
        ear_of_rice: { character: "\ud83c\udf3e", syllables: 3, types: [] },
        earth_africa: { character: "\ud83c\udf0d", syllables: 4, types: [] },
        earth_americas: { character: "\ud83c\udf0e", syllables: 5, types: [] },
        earth_asia: { character: "\ud83c\udf0f", syllables: 3, types: [] },
        egg: {
          character: "\ud83c\udf73",
          syllables: 1,
          types: ["noun", "verb-transitive", "idiom"],
        },
        eggplant: { character: "\ud83c\udf46", syllables: 2, types: ["noun"] },
        eight: { character: "8\ufe0f\u20e3", syllables: 1, types: ["noun"] },
        eight_pointed_black_star: {
          character: "\u2734\ufe0f",
          syllables: 5,
          types: [],
        },
        eight_spoked_asterisk: {
          character: "\u2733\ufe0f",
          syllables: 4,
          types: [],
        },
        electric_plug: { character: "\ud83d\udd0c", syllables: 4, types: [] },
        elephant: { character: "\ud83d\udc18", syllables: 3, types: ["noun"] },
        email: {
          character: "\ud83d\udce9",
          syllables: 2,
          types: ["noun", "verb"],
        },
        end: {
          character: "\ud83d\udd1a",
          syllables: 1,
          types: ["noun", "verb-transitive", "verb-intransitive", "idiom"],
        },
        envelope: {
          character: "\u2709\ufe0f",
          syllables: 3,
          types: ["noun", "idiom"],
        },
        es: {
          character: "\ud83c\uddea\ud83c\uddf8",
          syllables: 1,
          types: ["noun"],
        },
        euro: { character: "\ud83d\udcb6", syllables: 2, types: ["noun"] },
        european_castle: { character: "\ud83c\udff0", syllables: 6, types: [] },
        european_post_office: {
          character: "\ud83c\udfe4",
          syllables: 7,
          types: [],
        },
        evergreen_tree: { character: "\ud83c\udf32", syllables: 4, types: [] },
        exclamation: {
          character: "\u2757\ufe0f",
          syllables: 4,
          types: ["noun"],
        },
        expressionless: {
          character: "\ud83d\ude11",
          syllables: 4,
          types: ["adjective"],
        },
        eyeglasses: {
          character: "\ud83d\udc53",
          syllables: 3,
          types: ["noun"],
        },
        eyes: {
          character: "\ud83d\udc40",
          syllables: 1,
          types: ["noun", "verb"],
        },
        facepunch: { character: "\ud83d\udc4a", syllables: 2, types: [] },
        factory: { character: "\ud83c\udfed", syllables: 3, types: ["noun"] },
        fallen_leaf: { character: "\ud83c\udf42", syllables: 3, types: [] },
        family: {
          character: "\ud83d\udc6a",
          syllables: 3,
          types: ["noun", "adjective"],
        },
        fast_forward: { character: "\u23e9", syllables: 3, types: [] },
        fax: {
          character: "\ud83d\udce0",
          syllables: 1,
          types: ["noun", "verb-transitive"],
        },
        fearful: {
          character: "\ud83d\ude28",
          syllables: 2,
          types: ["adjective"],
        },
        feet: { character: "\ud83d\udc63", syllables: 1, types: ["noun"] },
        ferris_wheel: { character: "\ud83c\udfa1", syllables: 3, types: [] },
        file_folder: { character: "\ud83d\udcc1", syllables: 3, types: [] },
        fire: {
          character: "\ud83d\udd25",
          syllables: 2,
          types: [
            "noun",
            "verb-transitive",
            "verb-intransitive",
            "phrasal-verb",
            "idiom",
          ],
        },
        fire_engine: { character: "\ud83d\ude92", syllables: 4, types: [] },
        fireworks: { character: "\ud83c\udf86", syllables: 2, types: ["noun"] },
        first_quarter_moon: {
          character: "\ud83c\udf13",
          syllables: 4,
          types: [],
        },
        first_quarter_moon_with_face: {
          character: "\ud83c\udf1b",
          syllables: 6,
          types: [],
        },
        fish: {
          character: "\ud83d\udc1f",
          syllables: 1,
          types: [
            "noun",
            "verb-intransitive",
            "verb-transitive",
            "phrasal-verb",
            "idiom",
          ],
        },
        fish_cake: { character: "\ud83c\udf65", syllables: 2, types: [] },
        fishing_pole_and_fish: {
          character: "\ud83c\udfa3",
          syllables: 5,
          types: [],
        },
        fist: {
          character: "\u270a",
          syllables: 1,
          types: ["noun", "verb-transitive"],
        },
        five: { character: "5\ufe0f\u20e3", syllables: 1, types: ["noun"] },
        flags: { character: "\ud83c\udf8f", syllables: 1, types: ["noun"] },
        flashlight: {
          character: "\ud83d\udd26",
          syllables: 2,
          types: ["noun"],
        },
        floppy_disk: { character: "\ud83d\udcbe", syllables: 3, types: [] },
        flower_playing_cards: {
          character: "\ud83c\udfb4",
          syllables: 5,
          types: [],
        },
        flushed: {
          character: "\ud83d\ude33",
          syllables: 1,
          types: ["adjective", "verb"],
        },
        foggy: {
          character: "\ud83c\udf01",
          syllables: 2,
          types: ["adjective"],
        },
        football: { character: "\ud83c\udfc8", syllables: 2, types: ["noun"] },
        fork_and_knife: { character: "\ud83c\udf74", syllables: 3, types: [] },
        fountain: {
          character: "\u26f2\ufe0f",
          syllables: 2,
          types: ["noun", "verb-transitive"],
        },
        four: {
          character: "4\ufe0f\u20e3",
          syllables: 1,
          types: ["noun", "idiom"],
        },
        four_leaf_clover: {
          character: "\ud83c\udf40",
          syllables: 4,
          types: [],
        },
        fr: { character: "\ud83c\uddeb\ud83c\uddf7", syllables: 2, types: [] },
        free: {
          character: "\ud83c\udd93",
          syllables: 1,
          types: ["adjective", "adverb", "verb-transitive", "idiom"],
        },
        fried_shrimp: { character: "\ud83c\udf64", syllables: 2, types: [] },
        fries: {
          character: "\ud83c\udf5f",
          syllables: 1,
          types: ["verb", "noun"],
        },
        frog: { character: "\ud83d\udc38", syllables: 1, types: ["noun"] },
        frowning: { character: "\ud83d\ude26", syllables: 2, types: ["verb"] },
        fuelpump: { character: "\u26fd\ufe0f", syllables: 2, types: [] },
        full_moon: { character: "\ud83c\udf15", syllables: 2, types: [] },
        full_moon_with_face: {
          character: "\ud83c\udf1d",
          syllables: 4,
          types: [],
        },
        game_die: { character: "\ud83c\udfb2", syllables: 2, types: [] },
        gb: { character: "\ud83c\uddec\ud83c\udde7", syllables: 2, types: [] },
        gem: {
          character: "\ud83d\udc8e",
          syllables: 1,
          types: ["noun", "verb-transitive"],
        },
        gemini: { character: "\u264a\ufe0f", syllables: 3, types: [] },
        ghost: {
          character: "\ud83d\udc7b",
          syllables: 1,
          types: ["noun", "verb-intransitive", "verb-transitive"],
        },
        gift: {
          character: "\ud83c\udf81",
          syllables: 1,
          types: ["noun", "verb-transitive"],
        },
        gift_heart: { character: "\ud83d\udc9d", syllables: 2, types: [] },
        girl: { character: "\ud83d\udc67", syllables: 1, types: ["noun"] },
        globe_with_meridians: {
          character: "\ud83c\udf10",
          syllables: 2,
          types: [],
        },
        goat: { character: "\ud83d\udc10", syllables: 1, types: ["noun"] },
        golf: {
          character: "\u26f3\ufe0f",
          syllables: 1,
          types: ["noun", "verb-intransitive"],
        },
        grapes: { character: "\ud83c\udf47", syllables: 1, types: ["noun"] },
        green_apple: { character: "\ud83c\udf4f", syllables: 3, types: [] },
        green_book: { character: "\ud83d\udcd7", syllables: 2, types: [] },
        green_heart: { character: "\ud83d\udc9a", syllables: 2, types: [] },
        grey_exclamation: { character: "\u2755", syllables: 5, types: [] },
        grey_question: { character: "\u2754", syllables: 3, types: [] },
        grimacing: { character: "\ud83d\ude2c", syllables: 3, types: ["verb"] },
        grin: {
          character: "\ud83d\ude01",
          syllables: 1,
          types: ["verb-intransitive", "verb-transitive", "noun"],
        },
        grinning: { character: "\ud83d\ude00", syllables: 2, types: ["verb"] },
        guardsman: { character: "\ud83d\udc82", syllables: 2, types: ["noun"] },
        guitar: { character: "\ud83c\udfb8", syllables: 2, types: ["noun"] },
        gun: {
          character: "\ud83d\udd2b",
          syllables: 1,
          types: [
            "noun",
            "verb-transitive",
            "verb-intransitive",
            "phrasal-verb",
            "idiom",
          ],
        },
        haircut: { character: "\ud83d\udc87", syllables: 2, types: ["noun"] },
        hamburger: { character: "\ud83c\udf54", syllables: 3, types: ["noun"] },
        hammer: {
          character: "\ud83d\udd28",
          syllables: 2,
          types: ["noun", "verb-transitive", "verb-intransitive", "idiom"],
        },
        hamster: { character: "\ud83d\udc39", syllables: 2, types: ["noun"] },
        hand: {
          character: "\u270b",
          syllables: 1,
          types: [
            "noun",
            "verb-transitive",
            "verb-intransitive",
            "phrasal-verb",
            "idiom",
          ],
        },
        handbag: { character: "\ud83d\udc5c", syllables: 2, types: ["noun"] },
        hankey: { character: "\ud83d\udca9", syllables: 2, types: ["noun"] },
        hash: {
          character: "#\ufe0f\u20e3",
          syllables: 1,
          types: ["noun", "verb-transitive", "idiom"],
        },
        hatched_chick: { character: "\ud83d\udc25", syllables: 2, types: [] },
        hatching_chick: { character: "\ud83d\udc23", syllables: 3, types: [] },
        headphones: {
          character: "\ud83c\udfa7",
          syllables: 2,
          types: ["noun"],
        },
        hear_no_evil: { character: "\ud83d\ude49", syllables: 4, types: [] },
        heart: {
          character: "\u2764\ufe0f",
          syllables: 1,
          types: ["noun", "verb-transitive", "idiom"],
        },
        heart_decoration: {
          character: "\ud83d\udc9f",
          syllables: 5,
          types: [],
        },
        heart_eyes: { character: "\ud83d\ude0d", syllables: 2, types: [] },
        heart_eyes_cat: { character: "\ud83d\ude3b", syllables: 3, types: [] },
        heartbeat: { character: "\ud83d\udc93", syllables: 2, types: ["noun"] },
        heartpulse: { character: "\ud83d\udc97", syllables: 2, types: [] },
        hearts: {
          character: "\u2665\ufe0f",
          syllables: 1,
          types: ["noun", "verb"],
        },
        heavy_check_mark: {
          character: "\u2714\ufe0f",
          syllables: 4,
          types: [],
        },
        heavy_division_sign: { character: "\u2797", syllables: 6, types: [] },
        heavy_dollar_sign: {
          character: "\ud83d\udcb2",
          syllables: 5,
          types: [],
        },
        heavy_exclamation_mark: {
          character: "\u2757\ufe0f",
          syllables: 7,
          types: [],
        },
        heavy_minus_sign: { character: "\u2796", syllables: 5, types: [] },
        heavy_multiplication_x: {
          character: "\u2716\ufe0f",
          syllables: 8,
          types: [],
        },
        heavy_plus_sign: { character: "\u2795", syllables: 4, types: [] },
        helicopter: {
          character: "\ud83d\ude81",
          syllables: 4,
          types: ["noun", "verb-transitive"],
        },
        herb: { character: "\ud83c\udf3f", syllables: 1, types: ["noun"] },
        hibiscus: { character: "\ud83c\udf3a", syllables: 3, types: ["noun"] },
        high_brightness: { character: "\ud83d\udd06", syllables: 3, types: [] },
        high_heel: { character: "\ud83d\udc60", syllables: 2, types: [] },
        hocho: { character: "\ud83d\udd2a", syllables: 2, types: [] },
        honey_pot: { character: "\ud83c\udf6f", syllables: 3, types: [] },
        honeybee: { character: "\ud83d\udc1d", syllables: 3, types: ["noun"] },
        horse: {
          character: "\ud83d\udc34",
          syllables: 1,
          types: [
            "noun",
            "verb-transitive",
            "verb-intransitive",
            "adjective",
            "phrasal-verb",
            "idiom",
          ],
        },
        horse_racing: { character: "\ud83c\udfc7", syllables: 3, types: [] },
        hospital: { character: "\ud83c\udfe5", syllables: 3, types: ["noun"] },
        hotel: { character: "\ud83c\udfe8", syllables: 2, types: ["noun"] },
        hotsprings: { character: "\u2668\ufe0f", syllables: 2, types: [] },
        hourglass: {
          character: "\u231b\ufe0f",
          syllables: 3,
          types: ["noun", "adjective"],
        },
        hourglass_flowing_sand: {
          character: "\u23f3",
          syllables: 6,
          types: [],
        },
        house: {
          character: "\ud83c\udfe0",
          syllables: 1,
          types: ["noun", "verb-transitive", "verb-intransitive", "idiom"],
        },
        house_with_garden: {
          character: "\ud83c\udfe1",
          syllables: 4,
          types: [],
        },
        hushed: {
          character: "\ud83d\ude27",
          syllables: 1,
          types: ["adjective", "verb"],
        },
        ice_cream: { character: "\ud83c\udf68", syllables: 2, types: [] },
        icecream: { character: "\ud83c\udf66", syllables: 2, types: ["noun"] },
        id: { character: "\ud83c\udd94", syllables: 1, types: ["noun"] },
        ideograph_advantage: {
          character: "\ud83c\ude50",
          syllables: 3,
          types: [],
        },
        imp: {
          character: "\ud83d\udc7f",
          syllables: 1,
          types: ["noun", "verb-transitive"],
        },
        inbox_tray: { character: "\ud83d\udce5", syllables: 1, types: [] },
        incoming_envelope: {
          character: "\ud83d\udce8",
          syllables: 6,
          types: [],
        },
        information_desk_person: {
          character: "\ud83d\udc81",
          syllables: 7,
          types: [],
        },
        information_source: {
          character: "\u2139\ufe0f",
          syllables: 5,
          types: [],
        },
        innocent: {
          character: "\ud83d\ude07",
          syllables: 3,
          types: ["adjective", "noun"],
        },
        interrobang: {
          character: "\u2049\ufe0f",
          syllables: 4,
          types: ["noun"],
        },
        iphone: { character: "\ud83d\udcf1", syllables: 2, types: [] },
        it: {
          character: "\ud83c\uddee\ud83c\uddf9",
          syllables: 1,
          types: ["pronoun", "noun", "idiom"],
        },
        izakaya_lantern: { character: "\ud83c\udfee", syllables: 2, types: [] },
        jack_o_lantern: { character: "\ud83c\udf83", syllables: 4, types: [] },
        japan: {
          character: "\ud83d\uddfe",
          syllables: 2,
          types: ["noun", "verb-transitive"],
        },
        japanese_castle: { character: "\ud83c\udfef", syllables: 5, types: [] },
        japanese_goblin: { character: "\ud83d\udc7a", syllables: 5, types: [] },
        japanese_ogre: { character: "\ud83d\udc79", syllables: 5, types: [] },
        jeans: { character: "\ud83d\udc56", syllables: 1, types: ["noun"] },
        joy: {
          character: "\ud83d\ude02",
          syllables: 1,
          types: ["noun", "verb-intransitive", "verb-transitive"],
        },
        joy_cat: { character: "\ud83d\ude39", syllables: 2, types: [] },
        jp: {
          character: "\ud83c\uddef\ud83c\uddf5",
          syllables: 2,
          types: ["abbreviation"],
        },
        key: {
          character: "\ud83d\udd11",
          syllables: 1,
          types: [
            "noun",
            "adjective",
            "verb-transitive",
            "verb-intransitive",
            "phrasal-verb",
            "idiom",
          ],
        },
        keycap_ten: { character: "\ud83d\udd1f", syllables: 1, types: [] },
        kimono: { character: "\ud83d\udc58", syllables: 3, types: ["noun"] },
        kiss: {
          character: "\ud83d\udc8b",
          syllables: 1,
          types: [
            "verb-transitive",
            "verb-intransitive",
            "noun",
            "phrasal-verb",
            "idiom",
          ],
        },
        kissing: {
          character: "\ud83d\ude17",
          syllables: 2,
          types: ["verb", "adjective"],
        },
        kissing_cat: { character: "\ud83d\ude3d", syllables: 3, types: [] },
        kissing_closed_eyes: {
          character: "\ud83d\ude1a",
          syllables: 4,
          types: [],
        },
        kissing_face: { character: "\ud83d\ude1a", syllables: 3, types: [] },
        kissing_heart: { character: "\ud83d\ude18", syllables: 3, types: [] },
        kissing_smiling_eyes: {
          character: "\ud83d\ude19",
          syllables: 5,
          types: [],
        },
        koala: { character: "\ud83d\udc28", syllables: 3, types: ["noun"] },
        koko: { character: "\ud83c\ude01", syllables: 2, types: ["noun"] },
        kr: { character: "\ud83c\uddf0\ud83c\uddf7", syllables: 2, types: [] },
        large_blue_circle: {
          character: "\ud83d\udd35",
          syllables: 4,
          types: [],
        },
        large_blue_diamond: {
          character: "\ud83d\udd37",
          syllables: 4,
          types: [],
        },
        large_orange_diamond: {
          character: "\ud83d\udd36",
          syllables: 5,
          types: [],
        },
        last_quarter_moon: {
          character: "\ud83c\udf17",
          syllables: 4,
          types: [],
        },
        last_quarter_moon_with_face: {
          character: "\ud83c\udf1c",
          syllables: 6,
          types: [],
        },
        laughing: {
          character: "\ud83d\ude06",
          syllables: 2,
          types: ["noun", "verb"],
        },
        leaves: { character: "\ud83c\udf43", syllables: 1, types: ["noun"] },
        ledger: { character: "\ud83d\udcd2", syllables: 2, types: ["noun"] },
        left_luggage: { character: "\ud83d\udec5", syllables: 3, types: [] },
        left_right_arrow: {
          character: "\u2194\ufe0f",
          syllables: 4,
          types: [],
        },
        leftwards_arrow_with_hook: {
          character: "\u21a9\ufe0f",
          syllables: 4,
          types: [],
        },
        lemon: {
          character: "\ud83c\udf4b",
          syllables: 2,
          types: ["noun", "adjective"],
        },
        leo: { character: "\u264c\ufe0f", syllables: 2, types: [] },
        leopard: { character: "\ud83d\udc06", syllables: 2, types: ["noun"] },
        libra: { character: "\u264e\ufe0f", syllables: 2, types: ["noun"] },
        light_rail: { character: "\ud83d\ude88", syllables: 2, types: [] },
        link: {
          character: "\ud83d\udd17",
          syllables: 1,
          types: ["noun", "verb-transitive", "verb-intransitive"],
        },
        lips: { character: "\ud83d\udc44", syllables: 1, types: ["noun"] },
        lipstick: { character: "\ud83d\udc84", syllables: 2, types: ["noun"] },
        lock: {
          character: "\ud83d\udd12",
          syllables: 1,
          types: [
            "noun",
            "verb-transitive",
            "verb-intransitive",
            "phrasal-verb",
            "idiom",
          ],
        },
        lock_with_ink_pen: {
          character: "\ud83d\udd0f",
          syllables: 4,
          types: [],
        },
        lollipop: { character: "\ud83c\udf6d", syllables: 3, types: ["noun"] },
        loop: {
          character: "\u27bf",
          syllables: 1,
          types: ["noun", "verb-transitive", "verb-intransitive", "idiom"],
        },
        loudspeaker: {
          character: "\ud83d\udce2",
          syllables: 3,
          types: ["noun"],
        },
        love_hotel: { character: "\ud83c\udfe9", syllables: 3, types: [] },
        love_letter: { character: "\ud83d\udc8c", syllables: 3, types: [] },
        low_brightness: { character: "\ud83d\udd05", syllables: 3, types: [] },
        m: {
          character: "\u24dc",
          syllables: 1,
          types: ["noun", "abbreviation"],
        },
        mag: { character: "\ud83d\udd0d", syllables: 1, types: ["noun"] },
        mag_right: { character: "\ud83d\udd0e", syllables: 2, types: [] },
        mahjong: {
          character: "\ud83c\udc04\ufe0f",
          syllables: 2,
          types: ["noun"],
        },
        mailbox: { character: "\ud83d\udceb", syllables: 2, types: ["noun"] },
        mailbox_closed: { character: "\ud83d\udcea", syllables: 3, types: [] },
        mailbox_with_mail: {
          character: "\ud83d\udcec",
          syllables: 4,
          types: [],
        },
        mailbox_with_no_mail: {
          character: "\ud83d\udced",
          syllables: 5,
          types: [],
        },
        man: {
          character: "\ud83d\udc68",
          syllables: 1,
          types: ["noun", "verb-transitive", "interjection", "idiom"],
        },
        man_with_gua_pi_mao: {
          character: "\ud83d\udc72",
          syllables: 4,
          types: [],
        },
        man_with_turban: { character: "\ud83d\udc73", syllables: 4, types: [] },
        mans_shoe: { character: "\ud83d\udc5e", syllables: 2, types: [] },
        maple_leaf: { character: "\ud83c\udf41", syllables: 3, types: [] },
        mask: {
          character: "\ud83d\ude37",
          syllables: 1,
          types: ["noun", "verb-transitive", "verb-intransitive"],
        },
        massage: {
          character: "\ud83d\udc86",
          syllables: 2,
          types: ["noun", "verb-transitive"],
        },
        meat_on_bone: { character: "\ud83c\udf56", syllables: 3, types: [] },
        mega: { character: "\ud83d\udce3", syllables: 2, types: ["adjective"] },
        melon: { character: "\ud83c\udf48", syllables: 2, types: ["noun"] },
        memo: { character: "\ud83d\udcdd", syllables: 2, types: ["noun"] },
        mens: { character: "\ud83d\udeb9", syllables: 1, types: [] },
        metro: {
          character: "\ud83d\ude87",
          syllables: 2,
          types: ["noun", "adjective"],
        },
        microphone: {
          character: "\ud83c\udfa4",
          syllables: 3,
          types: ["noun"],
        },
        microscope: {
          character: "\ud83d\udd2c",
          syllables: 3,
          types: ["noun"],
        },
        milky_way: { character: "\ud83c\udf0c", syllables: 3, types: [] },
        minibus: { character: "\ud83d\ude90", syllables: 3, types: ["noun"] },
        minidisc: { character: "\ud83d\udcbd", syllables: 3, types: ["noun"] },
        mobile_phone_off: {
          character: "\ud83d\udcf4",
          syllables: 4,
          types: [],
        },
        money_with_wings: {
          character: "\ud83d\udcb8",
          syllables: 4,
          types: [],
        },
        moneybag: { character: "\ud83d\udcb0", syllables: 3, types: ["noun"] },
        monkey: {
          character: "\ud83d\udc12",
          syllables: 2,
          types: ["noun", "verb-intransitive", "verb-transitive"],
        },
        monkey_face: { character: "\ud83d\udc35", syllables: 3, types: [] },
        monorail: { character: "\ud83d\ude9d", syllables: 3, types: ["noun"] },
        moon: {
          character: "\ud83c\udf19",
          syllables: 1,
          types: ["noun", "verb-intransitive", "verb-transitive"],
        },
        mortar_board: { character: "\ud83c\udf93", syllables: 3, types: [] },
        mount_fuji: { character: "\ud83d\uddfb", syllables: 3, types: [] },
        mountain_bicyclist: {
          character: "\ud83d\udeb5",
          syllables: 5,
          types: [],
        },
        mountain_cableway: {
          character: "\ud83d\udea0",
          syllables: 2,
          types: [],
        },
        mountain_railway: {
          character: "\ud83d\ude9e",
          syllables: 4,
          types: [],
        },
        mouse: {
          character: "\ud83d\udc2d",
          syllables: 1,
          types: ["noun", "verb-intransitive"],
        },
        mouse2: { character: "\ud83d\udc01", syllables: 2, types: [] },
        movie_camera: { character: "\ud83c\udfa5", syllables: 5, types: [] },
        moyai: { character: "\ud83d\uddff", syllables: 2, types: [] },
        muscle: {
          character: "\ud83d\udcaa",
          syllables: 2,
          types: ["noun", "verb-intransitive", "verb-transitive"],
        },
        mushroom: {
          character: "\ud83c\udf44",
          syllables: 2,
          types: ["noun", "verb-intransitive", "adjective"],
        },
        musical_keyboard: {
          character: "\ud83c\udfb9",
          syllables: 5,
          types: [],
        },
        musical_note: { character: "\ud83c\udfb5", syllables: 4, types: [] },
        musical_score: { character: "\ud83c\udfbc", syllables: 4, types: [] },
        mute: {
          character: "\ud83d\udd07",
          syllables: 1,
          types: ["adjective", "noun", "verb-transitive"],
        },
        nail_care: { character: "\ud83d\udc85", syllables: 2, types: [] },
        name_badge: { character: "\ud83d\udcdb", syllables: 2, types: [] },
        necktie: { character: "\ud83d\udc54", syllables: 2, types: ["noun"] },
        negative_squared_cross_mark: {
          character: "\u274e",
          syllables: 6,
          types: [],
        },
        neutral_face: { character: "\ud83d\ude10", syllables: 3, types: [] },
        new: {
          character: "\ud83c\udd95",
          syllables: 1,
          types: ["adjective", "adverb"],
        },
        new_moon: { character: "\ud83c\udf11", syllables: 2, types: [] },
        new_moon_with_face: {
          character: "\ud83c\udf1a",
          syllables: 4,
          types: [],
        },
        newspaper: { character: "\ud83d\udcf0", syllables: 3, types: ["noun"] },
        ng: {
          character: "\ud83c\udd96",
          syllables: 1,
          types: ["abbreviation"],
        },
        nine: {
          character: "9\ufe0f\u20e3",
          syllables: 1,
          types: ["noun", "idiom"],
        },
        no_bell: { character: "\ud83d\udd15", syllables: 2, types: [] },
        no_bicycles: { character: "\ud83d\udeb3", syllables: 4, types: [] },
        no_entry: { character: "\u26d4\ufe0f", syllables: 3, types: [] },
        no_entry_sign: { character: "\ud83d\udeab", syllables: 4, types: [] },
        no_good: { character: "\ud83d\ude45", syllables: 2, types: [] },
        no_mobile_phones: {
          character: "\ud83d\udcf5",
          syllables: 4,
          types: [],
        },
        no_mouth: { character: "\ud83d\ude36", syllables: 2, types: [] },
        no_pedestrians: { character: "\ud83d\udeb7", syllables: 5, types: [] },
        no_smoking: { character: "\ud83d\udead", syllables: 3, types: [] },
        "non-potable_water": {
          character: "\ud83d\udeb1",
          syllables: 6,
          types: [],
        },
        nose: {
          character: "\ud83d\udc43",
          syllables: 1,
          types: [
            "noun",
            "verb-transitive",
            "verb-intransitive",
            "phrasal-verb",
            "idiom",
          ],
        },
        notebook: { character: "\ud83d\udcd3", syllables: 2, types: ["noun"] },
        notebook_with_decorative_cover: {
          character: "\ud83d\udcd4",
          syllables: 8,
          types: [],
        },
        notes: { character: "\ud83c\udfb6", syllables: 1, types: ["noun"] },
        nut_and_bolt: { character: "\ud83d\udd29", syllables: 3, types: [] },
        o: { character: "\u2b55\ufe0f", syllables: 1, types: ["noun"] },
        o2: { character: "\ud83c\udd7e", syllables: 2, types: [] },
        ocean: { character: "\ud83c\udf0a", syllables: 2, types: ["noun"] },
        octopus: { character: "\ud83d\udc19", syllables: 3, types: ["noun"] },
        oden: { character: "\ud83c\udf62", syllables: 2, types: [] },
        office: { character: "\ud83c\udfe2", syllables: 2, types: ["noun"] },
        ok: { character: "\ud83c\udd97", syllables: 2, types: ["adjective"] },
        ok_hand: { character: "\ud83d\udc4c", syllables: 3, types: [] },
        ok_woman: { character: "\ud83d\ude46", syllables: 4, types: [] },
        older_man: { character: "\ud83d\udc74", syllables: 3, types: [] },
        older_woman: { character: "\ud83d\udc75", syllables: 4, types: [] },
        on: {
          character: "\ud83d\udd1b",
          syllables: 1,
          types: ["preposition", "adverb", "adjective", "idiom"],
        },
        oncoming_automobile: {
          character: "\ud83d\ude98",
          syllables: 7,
          types: [],
        },
        oncoming_bus: { character: "\ud83d\ude8d", syllables: 4, types: [] },
        oncoming_police_car: {
          character: "\ud83d\ude94",
          syllables: 6,
          types: [],
        },
        oncoming_taxi: { character: "\ud83d\ude96", syllables: 5, types: [] },
        one: {
          character: "1\ufe0f\u20e3",
          syllables: 1,
          types: ["adjective", "noun", "pronoun", "idiom"],
        },
        open_file_folder: {
          character: "\ud83d\udcc2",
          syllables: 5,
          types: [],
        },
        open_hands: { character: "\ud83d\udc50", syllables: 3, types: [] },
        open_mouth: { character: "\ud83d\ude2e", syllables: 3, types: [] },
        ophiuchus: { character: "\u26ce", syllables: 4, types: [] },
        orange_book: { character: "\ud83d\udcd9", syllables: 3, types: [] },
        outbox_tray: { character: "\ud83d\udce4", syllables: 1, types: [] },
        ox: { character: "\ud83d\udc02", syllables: 1, types: ["noun"] },
        page_facing_up: { character: "\ud83d\udcc4", syllables: 4, types: [] },
        page_with_curl: { character: "\ud83d\udcc3", syllables: 3, types: [] },
        pager: { character: "\ud83d\udcdf", syllables: 2, types: ["noun"] },
        palm_tree: { character: "\ud83c\udf34", syllables: 2, types: [] },
        panda_face: { character: "\ud83d\udc3c", syllables: 3, types: [] },
        paperclip: { character: "\ud83d\udcce", syllables: 3, types: ["noun"] },
        parking: {
          character: "\ud83c\udd7f\ufe0f",
          syllables: 2,
          types: ["noun"],
        },
        part_alternation_mark: {
          character: "\u303d\ufe0f",
          syllables: 6,
          types: [],
        },
        partly_sunny: { character: "\u26c5\ufe0f", syllables: 4, types: [] },
        passport_control: {
          character: "\ud83d\udec2",
          syllables: 4,
          types: [],
        },
        paw_prints: { character: "\ud83d\udc3e", syllables: 2, types: [] },
        peach: {
          character: "\ud83c\udf51",
          syllables: 1,
          types: ["noun", "verb-intransitive", "verb-transitive"],
        },
        pear: { character: "\ud83c\udf50", syllables: 1, types: ["noun"] },
        pencil: {
          character: "\ud83d\udcdd",
          syllables: 2,
          types: ["noun", "verb-transitive", "phrasal-verb"],
        },
        pencil2: { character: "\u270f\ufe0f", syllables: 3, types: [] },
        penguin: { character: "\ud83d\udc27", syllables: 2, types: ["noun"] },
        pensive: {
          character: "\ud83d\ude14",
          syllables: 2,
          types: ["adjective"],
        },
        performing_arts: { character: "\ud83c\udfad", syllables: 4, types: [] },
        persevere: {
          character: "\ud83d\ude23",
          syllables: 3,
          types: ["verb-intransitive"],
        },
        person_frowning: { character: "\ud83d\ude4d", syllables: 4, types: [] },
        person_with_blond_hair: {
          character: "\ud83d\udc71",
          syllables: 5,
          types: [],
        },
        person_with_pouting_face: {
          character: "\ud83d\ude4e",
          syllables: 6,
          types: [],
        },
        phone: {
          character: "\u260e\ufe0f",
          syllables: 1,
          types: ["noun", "verb-intransitive", "verb-transitive"],
        },
        pig: {
          character: "\ud83d\udc37",
          syllables: 1,
          types: ["noun", "verb-intransitive", "phrasal-verb", "idiom"],
        },
        pig2: { character: "\ud83d\udc16", syllables: 2, types: [] },
        pig_nose: { character: "\ud83d\udc3d", syllables: 2, types: [] },
        pill: {
          character: "\ud83d\udc8a",
          syllables: 1,
          types: ["noun", "verb-transitive", "verb-intransitive"],
        },
        pineapple: { character: "\ud83c\udf4d", syllables: 3, types: ["noun"] },
        pisces: { character: "\u2653\ufe0f", syllables: 2, types: [] },
        pizza: { character: "\ud83c\udf55", syllables: 2, types: ["noun"] },
        plus1: { character: "\ud83d\udc4d", syllables: 2, types: [] },
        point_down: { character: "\ud83d\udc47", syllables: 2, types: [] },
        point_left: { character: "\ud83d\udc48", syllables: 2, types: [] },
        point_right: { character: "\ud83d\udc49", syllables: 2, types: [] },
        point_up: { character: "\u261d\ufe0f", syllables: 2, types: [] },
        point_up_2: { character: "\ud83d\udc46", syllables: 2, types: [] },
        police_car: { character: "\ud83d\ude93", syllables: 3, types: [] },
        poodle: { character: "\ud83d\udc29", syllables: 2, types: ["noun"] },
        poop: {
          character: "\ud83d\udca9",
          syllables: 1,
          types: [
            "noun",
            "verb-transitive",
            "phrasal-verb",
            "verb-intransitive",
          ],
        },
        post_office: { character: "\ud83c\udfe3", syllables: 3, types: [] },
        postal_horn: { character: "\ud83d\udcef", syllables: 3, types: [] },
        postbox: { character: "\ud83d\udcee", syllables: 2, types: ["noun"] },
        potable_water: { character: "\ud83d\udeb0", syllables: 5, types: [] },
        pouch: {
          character: "\ud83d\udc5d",
          syllables: 1,
          types: ["noun", "verb-transitive", "verb-intransitive"],
        },
        poultry_leg: { character: "\ud83c\udf57", syllables: 3, types: [] },
        pound: {
          character: "\ud83d\udcb7",
          syllables: 1,
          types: ["noun", "verb-transitive", "verb-intransitive", "idiom"],
        },
        pouting_cat: { character: "\ud83d\ude3e", syllables: 3, types: [] },
        pray: {
          character: "\ud83d\ude4f",
          syllables: 1,
          types: ["verb-intransitive", "verb-transitive"],
        },
        princess: {
          character: "\ud83d\udc78",
          syllables: 2,
          types: ["noun", "adjective"],
        },
        punch: {
          character: "\ud83d\udc4a",
          syllables: 1,
          types: ["noun", "verb-transitive", "phrasal-verb", "idiom"],
        },
        purple_heart: { character: "\ud83d\udc9c", syllables: 3, types: [] },
        purse: {
          character: "\ud83d\udc5b",
          syllables: 1,
          types: ["noun", "verb-transitive"],
        },
        pushpin: { character: "\ud83d\udccc", syllables: 2, types: ["noun"] },
        put_litter_in_its_place: {
          character: "\ud83d\udeae",
          syllables: 6,
          types: [],
        },
        question: {
          character: "\u2753",
          syllables: 2,
          types: ["noun", "verb-transitive", "verb-intransitive", "idiom"],
        },
        rabbit: {
          character: "\ud83d\udc30",
          syllables: 2,
          types: ["noun", "verb-intransitive"],
        },
        rabbit2: { character: "\ud83d\udc07", syllables: 3, types: [] },
        racehorse: { character: "\ud83d\udc0e", syllables: 2, types: ["noun"] },
        radio: {
          character: "\ud83d\udcfb",
          syllables: 3,
          types: ["noun", "verb-transitive", "verb-intransitive"],
        },
        radio_button: { character: "\ud83d\udd18", syllables: 5, types: [] },
        rage: {
          character: "\ud83d\ude21",
          syllables: 1,
          types: ["noun", "verb-intransitive"],
        },
        railway_car: { character: "\ud83d\ude8b", syllables: 3, types: [] },
        rainbow: { character: "\ud83c\udf08", syllables: 2, types: ["noun"] },
        raised_hand: { character: "\u270b", syllables: 2, types: [] },
        raised_hands: { character: "\ud83d\ude4c", syllables: 2, types: [] },
        raising_hand: { character: "\ud83d\ude4b", syllables: 3, types: [] },
        ram: {
          character: "\ud83d\udc0f",
          syllables: 1,
          types: ["noun", "verb-transitive"],
        },
        ramen: { character: "\ud83c\udf5c", syllables: 2, types: ["noun"] },
        rat: {
          character: "\ud83d\udc00",
          syllables: 1,
          types: ["noun", "verb-intransitive", "verb-transitive"],
        },
        recycle: {
          character: "\u267b\ufe0f",
          syllables: 3,
          types: ["verb-transitive"],
        },
        red_car: { character: "\ud83d\ude97", syllables: 2, types: [] },
        red_circle: { character: "\ud83d\udd34", syllables: 3, types: [] },
        registered: { character: "\xae", syllables: 3, types: ["adjective"] },
        relaxed: {
          character: "\u263a\ufe0f",
          syllables: 2,
          types: ["adjective"],
        },
        relieved: {
          character: "\ud83d\ude0c",
          syllables: 2,
          types: ["adjective", "verb"],
        },
        repeat: {
          character: "\ud83d\udd01",
          syllables: 2,
          types: ["verb-transitive", "verb-intransitive", "noun", "adjective"],
        },
        repeat_one: { character: "\ud83d\udd02", syllables: 3, types: [] },
        restroom: { character: "\ud83d\udebb", syllables: 2, types: ["noun"] },
        revolving_hearts: {
          character: "\ud83d\udc9e",
          syllables: 4,
          types: [],
        },
        rewind: {
          character: "\u23ea",
          syllables: 2,
          types: ["verb-transitive", "noun"],
        },
        ribbon: {
          character: "\ud83c\udf80",
          syllables: 2,
          types: ["noun", "verb-transitive"],
        },
        rice: {
          character: "\ud83c\udf5a",
          syllables: 1,
          types: ["noun", "verb-transitive"],
        },
        rice_ball: { character: "\ud83c\udf59", syllables: 2, types: [] },
        rice_cracker: { character: "\ud83c\udf58", syllables: 3, types: [] },
        rice_scene: { character: "\ud83c\udf91", syllables: 2, types: [] },
        ring: {
          character: "\ud83d\udc8d",
          syllables: 1,
          types: [
            "noun",
            "verb-transitive",
            "verb-intransitive",
            "phrasal-verb",
            "idiom",
          ],
        },
        rocket: {
          character: "\ud83d\ude80",
          syllables: 2,
          types: ["noun", "verb-intransitive", "verb-transitive"],
        },
        roller_coaster: { character: "\ud83c\udfa2", syllables: 4, types: [] },
        rooster: { character: "\ud83d\udc13", syllables: 2, types: ["noun"] },
        rose: {
          character: "\ud83c\udf39",
          syllables: 1,
          types: ["noun", "adjective", "idiom", "verb"],
        },
        rotating_light: { character: "\ud83d\udea8", syllables: 4, types: [] },
        round_pushpin: { character: "\ud83d\udccd", syllables: 3, types: [] },
        rowboat: { character: "\ud83d\udea3", syllables: 2, types: ["noun"] },
        ru: { character: "\ud83c\uddf7\ud83c\uddfa", syllables: 1, types: [] },
        rugby_football: { character: "\ud83c\udfc9", syllables: 4, types: [] },
        runner: { character: "\ud83c\udfc3", syllables: 2, types: ["noun"] },
        running: {
          character: "\ud83c\udfc3",
          syllables: 2,
          types: ["noun", "adjective", "adverb", "idiom"],
        },
        running_shirt_with_sash: {
          character: "\ud83c\udfbd",
          syllables: 5,
          types: [],
        },
        sa: { character: "\ud83c\ude02", syllables: 1, types: [] },
        sagittarius: { character: "\u2650\ufe0f", syllables: 5, types: [] },
        sailboat: { character: "\u26f5\ufe0f", syllables: 2, types: ["noun"] },
        sake: { character: "\ud83c\udf76", syllables: 1, types: ["noun"] },
        sandal: { character: "\ud83d\udc61", syllables: 2, types: ["noun"] },
        santa: { character: "\ud83c\udf85", syllables: 2, types: [] },
        satellite: { character: "\ud83d\udce1", syllables: 3, types: ["noun"] },
        satisfied: {
          character: "\ud83d\ude06",
          syllables: 3,
          types: ["adjective"],
        },
        saxophone: { character: "\ud83c\udfb7", syllables: 3, types: ["noun"] },
        school: {
          character: "\ud83c\udfeb",
          syllables: 1,
          types: ["noun", "verb-transitive", "adjective", "verb-intransitive"],
        },
        school_satchel: { character: "\ud83c\udf92", syllables: 1, types: [] },
        scissors: {
          character: "\u2702\ufe0f",
          syllables: 2,
          types: ["noun", "verb"],
        },
        scorpius: { character: "\u264f\ufe0f", syllables: 3, types: [] },
        scream: {
          character: "\ud83d\ude31",
          syllables: 1,
          types: ["verb-intransitive", "verb-transitive", "noun"],
        },
        scream_cat: { character: "\ud83d\ude40", syllables: 2, types: [] },
        scroll: {
          character: "\ud83d\udcdc",
          syllables: 1,
          types: ["noun", "verb-transitive", "verb-intransitive"],
        },
        seat: {
          character: "\ud83d\udcba",
          syllables: 1,
          types: ["noun", "verb-transitive", "verb-intransitive", "idiom"],
        },
        secret: {
          character: "\u3299\ufe0f",
          syllables: 2,
          types: ["adjective", "noun"],
        },
        see_no_evil: { character: "\ud83d\ude48", syllables: 4, types: [] },
        seedling: { character: "\ud83c\udf31", syllables: 2, types: ["noun"] },
        seven: { character: "7\ufe0f\u20e3", syllables: 2, types: ["noun"] },
        shaved_ice: { character: "\ud83c\udf67", syllables: 2, types: [] },
        sheep: { character: "\ud83d\udc11", syllables: 1, types: ["noun"] },
        shell: {
          character: "\ud83d\udc1a",
          syllables: 1,
          types: [
            "noun",
            "verb-transitive",
            "verb-intransitive",
            "phrasal-verb",
          ],
        },
        ship: {
          character: "\ud83d\udea2",
          syllables: 1,
          types: [
            "noun",
            "verb-transitive",
            "verb-intransitive",
            "phrasal-verb",
            "idiom",
          ],
        },
        shirt: {
          character: "\ud83d\udc55",
          syllables: 1,
          types: ["noun", "idiom"],
        },
        shit: {
          character: "\ud83d\udca9",
          syllables: 1,
          types: [
            "verb-intransitive",
            "verb-transitive",
            "noun",
            "interjection",
            "phrasal-verb",
            "idiom",
          ],
        },
        shoe: {
          character: "\ud83d\udc5f",
          syllables: 1,
          types: ["noun", "verb-transitive", "idiom"],
        },
        shower: {
          character: "\ud83d\udebf",
          syllables: 2,
          types: ["noun", "verb-transitive", "verb-intransitive"],
        },
        signal_strength: { character: "\ud83d\udcf6", syllables: 3, types: [] },
        six: {
          character: "6\ufe0f\u20e3",
          syllables: 1,
          types: ["noun", "idiom"],
        },
        six_pointed_star: {
          character: "\ud83d\udd2f",
          syllables: 4,
          types: [],
        },
        ski: {
          character: "\ud83c\udfbf",
          syllables: 1,
          types: ["noun", "verb-intransitive", "verb-transitive"],
        },
        skull: { character: "\ud83d\udc80", syllables: 1, types: ["noun"] },
        sleeping: {
          character: "\ud83d\ude34",
          syllables: 2,
          types: ["verb", "adjective", "noun"],
        },
        sleepy: {
          character: "\ud83d\ude2a",
          syllables: 2,
          types: ["adjective"],
        },
        slot_machine: { character: "\ud83c\udfb0", syllables: 3, types: [] },
        small_blue_diamond: {
          character: "\ud83d\udd39",
          syllables: 4,
          types: [],
        },
        small_orange_diamond: {
          character: "\ud83d\udd38",
          syllables: 5,
          types: [],
        },
        small_red_triangle: {
          character: "\ud83d\udd3a",
          syllables: 5,
          types: [],
        },
        small_red_triangle_down: {
          character: "\ud83d\udd3b",
          syllables: 6,
          types: [],
        },
        smile: {
          character: "\ud83d\ude04",
          syllables: 1,
          types: ["noun", "verb-intransitive", "verb-transitive"],
        },
        smile_cat: { character: "\ud83d\ude38", syllables: 2, types: [] },
        smiley: {
          character: "\ud83d\ude03",
          syllables: 2,
          types: ["noun", "adjective"],
        },
        smiley_cat: { character: "\ud83d\ude3a", syllables: 3, types: [] },
        smiling_imp: { character: "\ud83d\ude08", syllables: 3, types: [] },
        smirk: {
          character: "\ud83d\ude0f",
          syllables: 1,
          types: ["verb-intransitive", "noun"],
        },
        smirk_cat: { character: "\ud83d\ude3c", syllables: 2, types: [] },
        smoking: {
          character: "\ud83d\udeac",
          syllables: 2,
          types: ["adjective"],
        },
        snail: { character: "\ud83d\udc0c", syllables: 1, types: ["noun"] },
        snake: {
          character: "\ud83d\udc0d",
          syllables: 1,
          types: ["noun", "verb-transitive", "verb-intransitive"],
        },
        snowboarder: {
          character: "\ud83c\udfc2",
          syllables: 3,
          types: ["noun"],
        },
        snowflake: { character: "\u2744\ufe0f", syllables: 2, types: ["noun"] },
        snowman: { character: "\u26c4\ufe0f", syllables: 2, types: ["noun"] },
        sob: {
          character: "\ud83d\ude2d",
          syllables: 1,
          types: ["verb-intransitive", "verb-transitive", "noun"],
        },
        soccer: { character: "\u26bd\ufe0f", syllables: 2, types: ["noun"] },
        soon: {
          character: "\ud83d\udd1c",
          syllables: 1,
          types: ["adverb", "idiom"],
        },
        sos: { character: "\ud83c\udd98", syllables: 3, types: [] },
        sound: {
          character: "\ud83d\udd09",
          syllables: 1,
          types: [
            "noun",
            "verb-intransitive",
            "verb-transitive",
            "phrasal-verb",
            "adjective",
            "adverb",
          ],
        },
        space_invader: { character: "\ud83d\udc7e", syllables: 4, types: [] },
        spades: {
          character: "\u2660\ufe0f",
          syllables: 1,
          types: ["noun", "verb"],
        },
        spaghetti: { character: "\ud83c\udf5d", syllables: 3, types: ["noun"] },
        sparkler: { character: "\ud83c\udf87", syllables: 2, types: ["noun"] },
        sparkles: {
          character: "\u2728",
          syllables: 2,
          types: ["noun", "verb"],
        },
        sparkling_heart: { character: "\ud83d\udc96", syllables: 3, types: [] },
        speak_no_evil: { character: "\ud83d\ude4a", syllables: 4, types: [] },
        speaker: { character: "\ud83d\udd08", syllables: 2, types: ["noun"] },
        speech_balloon: { character: "\ud83d\udcac", syllables: 3, types: [] },
        speedboat: { character: "\ud83d\udea4", syllables: 2, types: ["noun"] },
        star: {
          character: "\u2b50\ufe0f",
          syllables: 1,
          types: [
            "noun",
            "adjective",
            "verb-transitive",
            "verb-intransitive",
            "idiom",
          ],
        },
        star2: { character: "\ud83c\udf1f", syllables: 2, types: [] },
        stars: {
          character: "\ud83c\udf20",
          syllables: 1,
          types: ["noun", "verb"],
        },
        station: {
          character: "\ud83d\ude89",
          syllables: 2,
          types: ["noun", "verb-transitive"],
        },
        statue_of_liberty: {
          character: "\ud83d\uddfd",
          syllables: 6,
          types: [],
        },
        steam_locomotive: {
          character: "\ud83d\ude82",
          syllables: 5,
          types: [],
        },
        stew: {
          character: "\ud83c\udf72",
          syllables: 1,
          types: ["verb-transitive", "verb-intransitive", "noun"],
        },
        straight_ruler: { character: "\ud83d\udccf", syllables: 3, types: [] },
        strawberry: {
          character: "\ud83c\udf53",
          syllables: 3,
          types: ["noun", "adjective"],
        },
        stuck_out_tongue: {
          character: "\ud83d\ude1b",
          syllables: 3,
          types: [],
        },
        stuck_out_tongue_closed_eyes: {
          character: "\ud83d\ude1d",
          syllables: 5,
          types: [],
        },
        stuck_out_tongue_winking_eye: {
          character: "\ud83d\ude1c",
          syllables: 6,
          types: [],
        },
        sun_with_face: { character: "\ud83c\udf1e", syllables: 3, types: [] },
        sunflower: { character: "\ud83c\udf3b", syllables: 3, types: ["noun"] },
        sunglasses: {
          character: "\ud83d\ude0e",
          syllables: 3,
          types: ["noun"],
        },
        sunny: {
          character: "\u2600\ufe0f",
          syllables: 2,
          types: ["adjective"],
        },
        sunrise: { character: "\ud83c\udf05", syllables: 2, types: ["noun"] },
        sunrise_over_mountains: {
          character: "\ud83c\udf04",
          syllables: 6,
          types: [],
        },
        surfer: { character: "\ud83c\udfc4", syllables: 2, types: ["noun"] },
        sushi: { character: "\ud83c\udf63", syllables: 2, types: ["noun"] },
        suspension_railway: {
          character: "\ud83d\ude9f",
          syllables: 5,
          types: [],
        },
        sweat: {
          character: "\ud83d\ude13",
          syllables: 1,
          types: [
            "verb-intransitive",
            "verb-transitive",
            "noun",
            "phrasal-verb",
            "idiom",
          ],
        },
        sweat_drops: { character: "\ud83d\udca6", syllables: 2, types: [] },
        sweat_smile: { character: "\ud83d\ude05", syllables: 2, types: [] },
        sweet_potato: { character: "\ud83c\udf60", syllables: 4, types: [] },
        swimmer: { character: "\ud83c\udfca", syllables: 2, types: ["noun"] },
        symbols: { character: "\ud83d\udd23", syllables: 2, types: ["noun"] },
        syringe: { character: "\ud83d\udc89", syllables: 2, types: ["noun"] },
        tada: {
          character: "\ud83c\udf89",
          syllables: 2,
          types: ["interjection"],
        },
        tanabata_tree: { character: "\ud83c\udf8b", syllables: 5, types: [] },
        tangerine: { character: "\ud83c\udf4a", syllables: 3, types: ["noun"] },
        taurus: { character: "\u2649\ufe0f", syllables: 2, types: ["noun"] },
        taxi: {
          character: "\ud83d\ude95",
          syllables: 2,
          types: ["noun", "verb-intransitive", "verb-transitive"],
        },
        tea: { character: "\ud83c\udf75", syllables: 1, types: ["noun"] },
        telephone: {
          character: "\u260e\ufe0f",
          syllables: 3,
          types: ["noun", "verb-transitive", "verb-intransitive"],
        },
        telephone_receiver: {
          character: "\ud83d\udcde",
          syllables: 6,
          types: [],
        },
        telescope: {
          character: "\ud83d\udd2d",
          syllables: 3,
          types: ["noun", "verb-transitive", "verb-intransitive"],
        },
        tennis: { character: "\ud83c\udfbe", syllables: 2, types: ["noun"] },
        tent: {
          character: "\u26fa\ufe0f",
          syllables: 1,
          types: ["noun", "verb-intransitive", "verb-transitive"],
        },
        thought_balloon: { character: "\ud83d\udcad", syllables: 3, types: [] },
        three: { character: "3\ufe0f\u20e3", syllables: 1, types: ["noun"] },
        thumbsdown: { character: "\ud83d\udc4e", syllables: 2, types: [] },
        thumbsup: { character: "\ud83d\udc4d", syllables: 2, types: [] },
        ticket: {
          character: "\ud83c\udfab",
          syllables: 2,
          types: ["noun", "verb-transitive"],
        },
        tiger: { character: "\ud83d\udc2f", syllables: 2, types: ["noun"] },
        tiger2: { character: "\ud83d\udc05", syllables: 3, types: [] },
        tired_face: { character: "\ud83d\ude2b", syllables: 3, types: [] },
        tm: { character: "\u2122", syllables: 2, types: [] },
        toilet: { character: "\ud83d\udebd", syllables: 2, types: ["noun"] },
        tokyo_tower: { character: "\ud83d\uddfc", syllables: 5, types: [] },
        tomato: { character: "\ud83c\udf45", syllables: 3, types: ["noun"] },
        tongue: {
          character: "\ud83d\udc45",
          syllables: 1,
          types: ["noun", "verb-transitive", "verb-intransitive", "idiom"],
        },
        top: {
          character: "\ud83d\udd1d",
          syllables: 1,
          types: [
            "noun",
            "adjective",
            "verb-transitive",
            "verb-intransitive",
            "phrasal-verb",
            "idiom",
          ],
        },
        tophat: { character: "\ud83c\udfa9", syllables: 2, types: ["noun"] },
        tractor: { character: "\ud83d\ude9c", syllables: 2, types: ["noun"] },
        traffic_light: { character: "\ud83d\udea5", syllables: 3, types: [] },
        train: {
          character: "\ud83d\ude8b",
          syllables: 1,
          types: ["noun", "verb-transitive", "verb-intransitive"],
        },
        train2: { character: "\ud83d\ude86", syllables: 2, types: [] },
        tram: {
          character: "\ud83d\ude8a",
          syllables: 1,
          types: ["noun", "verb-transitive"],
        },
        triangular_flag_on_post: {
          character: "\ud83d\udea9",
          syllables: 7,
          types: [],
        },
        triangular_ruler: {
          character: "\ud83d\udcd0",
          syllables: 6,
          types: [],
        },
        trident: {
          character: "\ud83d\udd31",
          syllables: 2,
          types: ["noun", "adjective"],
        },
        triumph: {
          character: "\ud83d\ude24",
          syllables: 2,
          types: ["verb-intransitive", "noun"],
        },
        trolleybus: {
          character: "\ud83d\ude8e",
          syllables: 3,
          types: ["noun"],
        },
        trophy: { character: "\ud83c\udfc6", syllables: 2, types: ["noun"] },
        tropical_drink: { character: "\ud83c\udf79", syllables: 4, types: [] },
        tropical_fish: { character: "\ud83d\udc20", syllables: 4, types: [] },
        truck: {
          character: "\ud83d\ude9a",
          syllables: 1,
          types: ["noun", "verb-transitive", "verb-intransitive"],
        },
        trumpet: {
          character: "\ud83c\udfba",
          syllables: 2,
          types: ["noun", "verb-intransitive", "verb-transitive"],
        },
        tshirt: { character: "\ud83d\udc55", syllables: 2, types: [] },
        tulip: { character: "\ud83c\udf37", syllables: 2, types: ["noun"] },
        turtle: {
          character: "\ud83d\udc22",
          syllables: 2,
          types: ["noun", "verb-intransitive"],
        },
        tv: { character: "\ud83d\udcfa", syllables: 2, types: ["noun"] },
        twisted_rightwards_arrows: {
          character: "\ud83d\udd00",
          syllables: 4,
          types: [],
        },
        two: {
          character: "2\ufe0f\u20e3",
          syllables: 1,
          types: ["noun", "idiom"],
        },
        two_hearts: { character: "\ud83d\udc95", syllables: 2, types: [] },
        two_men_holding_hands: {
          character: "\ud83d\udc6c",
          syllables: 5,
          types: [],
        },
        two_women_holding_hands: {
          character: "\ud83d\udc6d",
          syllables: 6,
          types: [],
        },
        u5272: { character: "\ud83c\ude39", syllables: 0, types: [] },
        u5408: { character: "\ud83c\ude34", syllables: 0, types: [] },
        u55b6: { character: "\ud83c\ude3a", syllables: 0, types: [] },
        u6307: { character: "\ud83c\ude2f\ufe0f", syllables: 0, types: [] },
        u6708: { character: "\ud83c\ude37", syllables: 0, types: [] },
        u6709: { character: "\ud83c\ude36", syllables: 0, types: [] },
        u6e80: { character: "\ud83c\ude35", syllables: 0, types: [] },
        u7121: { character: "\ud83c\ude1a\ufe0f", syllables: 0, types: [] },
        u7533: { character: "\ud83c\ude38", syllables: 0, types: [] },
        u7981: { character: "\ud83c\ude32", syllables: 0, types: [] },
        u7a7a: { character: "\ud83c\ude33", syllables: 0, types: [] },
        uk: { character: "\ud83c\uddec\ud83c\udde7", syllables: 2, types: [] },
        umbrella: { character: "\u2614\ufe0f", syllables: 3, types: ["noun"] },
        unamused: {
          character: "\ud83d\ude12",
          syllables: 3,
          types: ["adjective"],
        },
        underage: {
          character: "\ud83d\udd1e",
          syllables: 3,
          types: ["noun", "adjective"],
        },
        unlock: {
          character: "\ud83d\udd13",
          syllables: 2,
          types: ["verb-transitive", "verb-intransitive"],
        },
        up: {
          character: "\ud83c\udd99",
          syllables: 1,
          types: [
            "adverb",
            "adjective",
            "preposition",
            "noun",
            "verb-transitive",
            "verb-intransitive",
            "idiom",
          ],
        },
        us: {
          character: "\ud83c\uddfa\ud83c\uddf8",
          syllables: 1,
          types: ["pronoun"],
        },
        v: { character: "\u270c\ufe0f", syllables: 1, types: ["noun"] },
        vertical_traffic_light: {
          character: "\ud83d\udea6",
          syllables: 6,
          types: [],
        },
        vhs: { character: "\ud83d\udcfc", syllables: 3, types: [] },
        vibration_mode: { character: "\ud83d\udcf3", syllables: 4, types: [] },
        video_camera: { character: "\ud83d\udcf9", syllables: 6, types: [] },
        video_game: { character: "\ud83c\udfae", syllables: 4, types: [] },
        violin: { character: "\ud83c\udfbb", syllables: 3, types: ["noun"] },
        virgo: { character: "\u264d\ufe0f", syllables: 2, types: [] },
        volcano: { character: "\ud83c\udf0b", syllables: 3, types: ["noun"] },
        vs: { character: "\ud83c\udd9a", syllables: 2, types: ["preposition"] },
        walking: {
          character: "\ud83d\udeb6",
          syllables: 2,
          types: ["adjective", "noun"],
        },
        waning_crescent_moon: {
          character: "\ud83c\udf18",
          syllables: 5,
          types: [],
        },
        waning_gibbous_moon: {
          character: "\ud83c\udf16",
          syllables: 5,
          types: [],
        },
        warning: {
          character: "\u26a0\ufe0f",
          syllables: 2,
          types: ["noun", "adjective"],
        },
        watch: {
          character: "\u231a\ufe0f",
          syllables: 1,
          types: [
            "verb-intransitive",
            "verb-transitive",
            "noun",
            "phrasal-verb",
            "idiom",
          ],
        },
        water_buffalo: { character: "\ud83d\udc03", syllables: 5, types: [] },
        watermelon: {
          character: "\ud83c\udf49",
          syllables: 4,
          types: ["noun"],
        },
        wave: {
          character: "\ud83d\udc4b",
          syllables: 1,
          types: [
            "verb-intransitive",
            "verb-transitive",
            "noun",
            "phrasal-verb",
          ],
        },
        wavy_dash: { character: "\u3030", syllables: 3, types: [] },
        waxing_crescent_moon: {
          character: "\ud83c\udf12",
          syllables: 5,
          types: [],
        },
        waxing_gibbous_moon: {
          character: "\ud83c\udf14",
          syllables: 5,
          types: [],
        },
        wc: { character: "\ud83d\udebe", syllables: 2, types: [] },
        weary: {
          character: "\ud83d\ude29",
          syllables: 2,
          types: ["adjective", "verb-transitive"],
        },
        wedding: { character: "\ud83d\udc92", syllables: 2, types: ["noun"] },
        whale: {
          character: "\ud83d\udc33",
          syllables: 1,
          types: ["noun", "verb-intransitive", "verb-transitive"],
        },
        whale2: { character: "\ud83d\udc0b", syllables: 2, types: [] },
        wheelchair: {
          character: "\u267f\ufe0f",
          syllables: 2,
          types: ["noun"],
        },
        white_check_mark: { character: "\u2705", syllables: 3, types: [] },
        white_circle: { character: "\u26aa", syllables: 3, types: [] },
        white_flower: { character: "\ud83d\udcae", syllables: 3, types: [] },
        white_large_square: {
          character: "\u25fb\ufe0f",
          syllables: 3,
          types: [],
        },
        white_square_button: {
          character: "\ud83d\udd33",
          syllables: 4,
          types: [],
        },
        wind_chime: { character: "\ud83c\udf90", syllables: 2, types: [] },
        wine_glass: { character: "\ud83c\udf77", syllables: 2, types: [] },
        wink: {
          character: "\ud83d\ude09",
          syllables: 1,
          types: [
            "verb-intransitive",
            "verb-transitive",
            "noun",
            "phrasal-verb",
          ],
        },
        wolf: {
          character: "\ud83d\udc3a",
          syllables: 1,
          types: ["noun", "verb-transitive", "idiom"],
        },
        woman: {
          character: "\ud83d\udc69",
          syllables: 2,
          types: ["noun", "idiom"],
        },
        womans_clothes: { character: "\ud83d\udc5a", syllables: 3, types: [] },
        womans_hat: { character: "\ud83d\udc52", syllables: 3, types: [] },
        womens: { character: "\ud83d\udeba", syllables: 2, types: [] },
        worried: {
          character: "\ud83d\ude1f",
          syllables: 2,
          types: ["adjective", "verb"],
        },
        wrench: {
          character: "\ud83d\udd27",
          syllables: 1,
          types: ["noun", "verb-transitive", "verb-intransitive"],
        },
        x: {
          character: "\u274c",
          syllables: 1,
          types: ["noun", "verb-transitive", null],
        },
        yellow_heart: { character: "\ud83d\udc9b", syllables: 3, types: [] },
        yen: {
          character: "\ud83d\udcb4",
          syllables: 1,
          types: ["noun", "verb-intransitive"],
        },
        yum: {
          character: "\ud83d\ude0b",
          syllables: 1,
          types: ["interjection"],
        },
        zap: {
          character: "\u26a1\ufe0f",
          syllables: 1,
          types: [
            "verb-transitive",
            "verb-intransitive",
            "noun",
            "interjection",
          ],
        },
        zero: {
          character: "0\ufe0f\u20e3",
          syllables: 2,
          types: ["noun", "adjective", "verb-transitive", "phrasal-verb"],
        },
        zzz: {
          character: "\ud83d\udca4",
          syllables: 0,
          types: ["interjection", "verb"],
        },
      };
    },
    x5jA: function (e, t, n) {
      (function (e) {
        var r;
        !(function (e, o, i) {
          function a(e, t) {
            return (t.x = e.x.slice()), (t.i = e.i), t;
          }
          function s(e, t) {
            null == e && (e = +new Date());
            var n = new (function (e) {
                var t = this;
                (t.next = function () {
                  var e,
                    n,
                    r = t.x,
                    o = t.i;
                  return (
                    (e = r[o]),
                    (n = (e ^= e >>> 7) ^ (e << 24)),
                    (n ^= (e = r[(o + 1) & 7]) ^ (e >>> 10)),
                    (n ^= (e = r[(o + 3) & 7]) ^ (e >>> 3)),
                    (n ^= (e = r[(o + 4) & 7]) ^ (e << 7)),
                    (e = r[(o + 7) & 7]),
                    (r[o] = n ^= (e ^= e << 13) ^ (e << 9)),
                    (t.i = (o + 1) & 7),
                    n
                  );
                }),
                  (function (e, t) {
                    var n,
                      r = [];
                    if (t === (0 | t)) r[0] = t;
                    else
                      for (t = "" + t, n = 0; n < t.length; ++n)
                        r[7 & n] =
                          (r[7 & n] << 15) ^
                          ((t.charCodeAt(n) + r[(n + 1) & 7]) << 13);
                    for (; r.length < 8; ) r.push(0);
                    for (n = 0; n < 8 && 0 === r[n]; ++n);
                    for (
                      8 == n && (r[7] = -1), e.x = r, e.i = 0, n = 256;
                      n > 0;
                      --n
                    )
                      e.next();
                  })(t, e);
              })(e),
              r = t && t.state,
              o = function () {
                return (n.next() >>> 0) / 4294967296;
              };
            return (
              (o.double = function () {
                do {
                  var e =
                    ((n.next() >>> 11) + (n.next() >>> 0) / 4294967296) /
                    (1 << 21);
                } while (0 === e);
                return e;
              }),
              (o.int32 = n.next),
              (o.quick = o),
              r &&
                (r.x && a(r, n),
                (o.state = function () {
                  return a(n, {});
                })),
              o
            );
          }
          o && o.exports
            ? (o.exports = s)
            : n("MwgA") && n("f8Ud")
            ? void 0 ===
                (r = function () {
                  return s;
                }.call(t, n, t, o)) || (o.exports = r)
            : (this.xorshift7 = s);
        })(0, "object" == typeof e && e, n("MwgA"));
      }).call(t, n("ZwkM")(e));
    },
    xIGM: function (e, t, n) {
      "use strict";
      (function (e) {
        n.d(t, "a", function () {
          return i;
        });
        var r = "undefined" != typeof window && window,
          o =
            "undefined" != typeof self &&
            "undefined" != typeof WorkerGlobalScope &&
            self instanceof WorkerGlobalScope &&
            self,
          i = r || ("undefined" != typeof e && e) || o;
      }).call(t, n("fRUx"));
    },
    xrDH: function (e, t, n) {
      (function (e, r) {
        var o;
        (function () {
          var i,
            a = 200,
            s = "Expected a function",
            l = "__lodash_placeholder__",
            u = 1,
            c = 2,
            p = 4,
            h = 1,
            f = 2,
            d = 1,
            y = 2,
            _ = 4,
            v = 8,
            b = 16,
            g = 32,
            m = 64,
            w = 128,
            C = 256,
            x = 512,
            k = 800,
            S = 16,
            E = 1 / 0,
            j = 9007199254740991,
            T = 1.7976931348623157e308,
            A = NaN,
            I = 4294967295,
            P = I - 1,
            O = I >>> 1,
            M = [
              ["ary", w],
              ["bind", d],
              ["bindKey", y],
              ["curry", v],
              ["curryRight", b],
              ["flip", x],
              ["partial", g],
              ["partialRight", m],
              ["rearg", C],
            ],
            N = "[object Arguments]",
            R = "[object Array]",
            D = "[object AsyncFunction]",
            B = "[object Boolean]",
            V = "[object Date]",
            z = "[object DOMException]",
            F = "[object Error]",
            L = "[object Function]",
            H = "[object GeneratorFunction]",
            U = "[object Map]",
            W = "[object Number]",
            G = "[object Null]",
            q = "[object Object]",
            Z = "[object Proxy]",
            Q = "[object RegExp]",
            K = "[object Set]",
            $ = "[object String]",
            J = "[object Symbol]",
            Y = "[object Undefined]",
            X = "[object WeakMap]",
            ee = "[object ArrayBuffer]",
            te = "[object DataView]",
            ne = "[object Float32Array]",
            re = "[object Float64Array]",
            oe = "[object Int8Array]",
            ie = "[object Int16Array]",
            ae = "[object Int32Array]",
            se = "[object Uint8Array]",
            le = "[object Uint8ClampedArray]",
            ue = "[object Uint16Array]",
            ce = "[object Uint32Array]",
            pe = /\b__p \+= '';/g,
            he = /\b(__p \+=) '' \+/g,
            fe = /(__e\(.*?\)|\b__t\)) \+\n'';/g,
            de = /&(?:amp|lt|gt|quot|#39);/g,
            ye = /[&<>"']/g,
            _e = RegExp(de.source),
            ve = RegExp(ye.source),
            be = /<%-([\s\S]+?)%>/g,
            ge = /<%([\s\S]+?)%>/g,
            me = /<%=([\s\S]+?)%>/g,
            we = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
            Ce = /^\w*$/,
            xe =
              /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
            ke = /[\\^$.*+?()[\]{}|]/g,
            Se = RegExp(ke.source),
            Ee = /^\s+|\s+$/g,
            je = /^\s+/,
            Te = /\s+$/,
            Ae = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,
            Ie = /\{\n\/\* \[wrapped with (.+)\] \*/,
            Pe = /,? & /,
            Oe = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,
            Me = /\\(\\)?/g,
            Ne = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,
            Re = /\w*$/,
            De = /^[-+]0x[0-9a-f]+$/i,
            Be = /^0b[01]+$/i,
            Ve = /^\[object .+?Constructor\]$/,
            ze = /^0o[0-7]+$/i,
            Fe = /^(?:0|[1-9]\d*)$/,
            Le = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,
            He = /($^)/,
            Ue = /['\n\r\u2028\u2029\\]/g,
            We = "\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff",
            Ge =
              "\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",
            qe = "[" + Ge + "]",
            Ze = "[" + We + "]",
            Qe = "\\d+",
            Ke = "[a-z\\xdf-\\xf6\\xf8-\\xff]",
            $e =
              "[^\\ud800-\\udfff" +
              Ge +
              Qe +
              "\\u2700-\\u27bfa-z\\xdf-\\xf6\\xf8-\\xffA-Z\\xc0-\\xd6\\xd8-\\xde]",
            Je = "\\ud83c[\\udffb-\\udfff]",
            Ye = "[^\\ud800-\\udfff]",
            Xe = "(?:\\ud83c[\\udde6-\\uddff]){2}",
            et = "[\\ud800-\\udbff][\\udc00-\\udfff]",
            tt = "[A-Z\\xc0-\\xd6\\xd8-\\xde]",
            nt = "(?:" + Ke + "|" + $e + ")",
            rt = "(?:" + tt + "|" + $e + ")",
            ot = "(?:" + Ze + "|" + Je + ")?",
            it =
              "[\\ufe0e\\ufe0f]?" +
              ot +
              "(?:\\u200d(?:" +
              [Ye, Xe, et].join("|") +
              ")[\\ufe0e\\ufe0f]?" +
              ot +
              ")*",
            at = "(?:" + ["[\\u2700-\\u27bf]", Xe, et].join("|") + ")" + it,
            st =
              "(?:" +
              [Ye + Ze + "?", Ze, Xe, et, "[\\ud800-\\udfff]"].join("|") +
              ")",
            lt = RegExp("['\u2019]", "g"),
            ut = RegExp(Ze, "g"),
            ct = RegExp(Je + "(?=" + Je + ")|" + st + it, "g"),
            pt = RegExp(
              [
                tt +
                  "?" +
                  Ke +
                  "+(?:['\u2019](?:d|ll|m|re|s|t|ve))?(?=" +
                  [qe, tt, "$"].join("|") +
                  ")",
                rt +
                  "+(?:['\u2019](?:D|LL|M|RE|S|T|VE))?(?=" +
                  [qe, tt + nt, "$"].join("|") +
                  ")",
                tt + "?" + nt + "+(?:['\u2019](?:d|ll|m|re|s|t|ve))?",
                tt + "+(?:['\u2019](?:D|LL|M|RE|S|T|VE))?",
                "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])",
                "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])",
                Qe,
                at,
              ].join("|"),
              "g"
            ),
            ht = RegExp("[\\u200d\\ud800-\\udfff" + We + "\\ufe0e\\ufe0f]"),
            ft =
              /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,
            dt = [
              "Array",
              "Buffer",
              "DataView",
              "Date",
              "Error",
              "Float32Array",
              "Float64Array",
              "Function",
              "Int8Array",
              "Int16Array",
              "Int32Array",
              "Map",
              "Math",
              "Object",
              "Promise",
              "RegExp",
              "Set",
              "String",
              "Symbol",
              "TypeError",
              "Uint8Array",
              "Uint8ClampedArray",
              "Uint16Array",
              "Uint32Array",
              "WeakMap",
              "_",
              "clearTimeout",
              "isFinite",
              "parseInt",
              "setTimeout",
            ],
            yt = -1,
            _t = {};
          (_t[ne] =
            _t[re] =
            _t[oe] =
            _t[ie] =
            _t[ae] =
            _t[se] =
            _t[le] =
            _t[ue] =
            _t[ce] =
              !0),
            (_t[N] =
              _t[R] =
              _t[ee] =
              _t[B] =
              _t[te] =
              _t[V] =
              _t[F] =
              _t[L] =
              _t[U] =
              _t[W] =
              _t[q] =
              _t[Q] =
              _t[K] =
              _t[$] =
              _t[X] =
                !1);
          var vt = {};
          (vt[N] =
            vt[R] =
            vt[ee] =
            vt[te] =
            vt[B] =
            vt[V] =
            vt[ne] =
            vt[re] =
            vt[oe] =
            vt[ie] =
            vt[ae] =
            vt[U] =
            vt[W] =
            vt[q] =
            vt[Q] =
            vt[K] =
            vt[$] =
            vt[J] =
            vt[se] =
            vt[le] =
            vt[ue] =
            vt[ce] =
              !0),
            (vt[F] = vt[L] = vt[X] = !1);
          var bt = {
              "\\": "\\",
              "'": "'",
              "\n": "n",
              "\r": "r",
              "\u2028": "u2028",
              "\u2029": "u2029",
            },
            gt = parseFloat,
            mt = parseInt,
            wt = "object" == typeof e && e && e.Object === Object && e,
            Ct =
              "object" == typeof self && self && self.Object === Object && self,
            xt = wt || Ct || Function("return this")(),
            kt = "object" == typeof t && t && !t.nodeType && t,
            St = kt && "object" == typeof r && r && !r.nodeType && r,
            Et = St && St.exports === kt,
            jt = Et && wt.process,
            Tt = (function () {
              try {
                return jt && jt.binding && jt.binding("util");
              } catch (e) {}
            })(),
            At = Tt && Tt.isArrayBuffer,
            It = Tt && Tt.isDate,
            Pt = Tt && Tt.isMap,
            Ot = Tt && Tt.isRegExp,
            Mt = Tt && Tt.isSet,
            Nt = Tt && Tt.isTypedArray;
          function Rt(e, t, n) {
            switch (n.length) {
              case 0:
                return e.call(t);
              case 1:
                return e.call(t, n[0]);
              case 2:
                return e.call(t, n[0], n[1]);
              case 3:
                return e.call(t, n[0], n[1], n[2]);
            }
            return e.apply(t, n);
          }
          function Dt(e, t, n, r) {
            for (var o = -1, i = null == e ? 0 : e.length; ++o < i; ) {
              var a = e[o];
              t(r, a, n(a), e);
            }
            return r;
          }
          function Bt(e, t) {
            for (
              var n = -1, r = null == e ? 0 : e.length;
              ++n < r && !1 !== t(e[n], n, e);

            );
            return e;
          }
          function Vt(e, t) {
            for (var n = -1, r = null == e ? 0 : e.length; ++n < r; )
              if (!t(e[n], n, e)) return !1;
            return !0;
          }
          function zt(e, t) {
            for (
              var n = -1, r = null == e ? 0 : e.length, o = 0, i = [];
              ++n < r;

            ) {
              var a = e[n];
              t(a, n, e) && (i[o++] = a);
            }
            return i;
          }
          function Ft(e, t) {
            return !(null == e || !e.length) && $t(e, t, 0) > -1;
          }
          function Lt(e, t, n) {
            for (var r = -1, o = null == e ? 0 : e.length; ++r < o; )
              if (n(t, e[r])) return !0;
            return !1;
          }
          function Ht(e, t) {
            for (
              var n = -1, r = null == e ? 0 : e.length, o = Array(r);
              ++n < r;

            )
              o[n] = t(e[n], n, e);
            return o;
          }
          function Ut(e, t) {
            for (var n = -1, r = t.length, o = e.length; ++n < r; )
              e[o + n] = t[n];
            return e;
          }
          function Wt(e, t, n, r) {
            var o = -1,
              i = null == e ? 0 : e.length;
            for (r && i && (n = e[++o]); ++o < i; ) n = t(n, e[o], o, e);
            return n;
          }
          function Gt(e, t, n, r) {
            var o = null == e ? 0 : e.length;
            for (r && o && (n = e[--o]); o--; ) n = t(n, e[o], o, e);
            return n;
          }
          function qt(e, t) {
            for (var n = -1, r = null == e ? 0 : e.length; ++n < r; )
              if (t(e[n], n, e)) return !0;
            return !1;
          }
          var Zt = en("length");
          function Qt(e, t, n) {
            var r;
            return (
              n(e, function (e, n, o) {
                if (t(e, n, o)) return (r = n), !1;
              }),
              r
            );
          }
          function Kt(e, t, n, r) {
            for (var o = e.length, i = n + (r ? 1 : -1); r ? i-- : ++i < o; )
              if (t(e[i], i, e)) return i;
            return -1;
          }
          function $t(e, t, n) {
            return t == t
              ? (function (e, t, n) {
                  for (var r = n - 1, o = e.length; ++r < o; )
                    if (e[r] === t) return r;
                  return -1;
                })(e, t, n)
              : Kt(e, Yt, n);
          }
          function Jt(e, t, n, r) {
            for (var o = n - 1, i = e.length; ++o < i; )
              if (r(e[o], t)) return o;
            return -1;
          }
          function Yt(e) {
            return e != e;
          }
          function Xt(e, t) {
            var n = null == e ? 0 : e.length;
            return n ? rn(e, t) / n : A;
          }
          function en(e) {
            return function (t) {
              return null == t ? i : t[e];
            };
          }
          function tn(e) {
            return function (t) {
              return null == e ? i : e[t];
            };
          }
          function nn(e, t, n, r, o) {
            return (
              o(e, function (e, o, i) {
                n = r ? ((r = !1), e) : t(n, e, o, i);
              }),
              n
            );
          }
          function rn(e, t) {
            for (var n, r = -1, o = e.length; ++r < o; ) {
              var a = t(e[r]);
              a !== i && (n = n === i ? a : n + a);
            }
            return n;
          }
          function on(e, t) {
            for (var n = -1, r = Array(e); ++n < e; ) r[n] = t(n);
            return r;
          }
          function an(e) {
            return function (t) {
              return e(t);
            };
          }
          function sn(e, t) {
            return Ht(t, function (t) {
              return e[t];
            });
          }
          function ln(e, t) {
            return e.has(t);
          }
          function un(e, t) {
            for (var n = -1, r = e.length; ++n < r && $t(t, e[n], 0) > -1; );
            return n;
          }
          function cn(e, t) {
            for (var n = e.length; n-- && $t(t, e[n], 0) > -1; );
            return n;
          }
          var pn = tn({
              "\xc0": "A",
              "\xc1": "A",
              "\xc2": "A",
              "\xc3": "A",
              "\xc4": "A",
              "\xc5": "A",
              "\xe0": "a",
              "\xe1": "a",
              "\xe2": "a",
              "\xe3": "a",
              "\xe4": "a",
              "\xe5": "a",
              "\xc7": "C",
              "\xe7": "c",
              "\xd0": "D",
              "\xf0": "d",
              "\xc8": "E",
              "\xc9": "E",
              "\xca": "E",
              "\xcb": "E",
              "\xe8": "e",
              "\xe9": "e",
              "\xea": "e",
              "\xeb": "e",
              "\xcc": "I",
              "\xcd": "I",
              "\xce": "I",
              "\xcf": "I",
              "\xec": "i",
              "\xed": "i",
              "\xee": "i",
              "\xef": "i",
              "\xd1": "N",
              "\xf1": "n",
              "\xd2": "O",
              "\xd3": "O",
              "\xd4": "O",
              "\xd5": "O",
              "\xd6": "O",
              "\xd8": "O",
              "\xf2": "o",
              "\xf3": "o",
              "\xf4": "o",
              "\xf5": "o",
              "\xf6": "o",
              "\xf8": "o",
              "\xd9": "U",
              "\xda": "U",
              "\xdb": "U",
              "\xdc": "U",
              "\xf9": "u",
              "\xfa": "u",
              "\xfb": "u",
              "\xfc": "u",
              "\xdd": "Y",
              "\xfd": "y",
              "\xff": "y",
              "\xc6": "Ae",
              "\xe6": "ae",
              "\xde": "Th",
              "\xfe": "th",
              "\xdf": "ss",
              "\u0100": "A",
              "\u0102": "A",
              "\u0104": "A",
              "\u0101": "a",
              "\u0103": "a",
              "\u0105": "a",
              "\u0106": "C",
              "\u0108": "C",
              "\u010a": "C",
              "\u010c": "C",
              "\u0107": "c",
              "\u0109": "c",
              "\u010b": "c",
              "\u010d": "c",
              "\u010e": "D",
              "\u0110": "D",
              "\u010f": "d",
              "\u0111": "d",
              "\u0112": "E",
              "\u0114": "E",
              "\u0116": "E",
              "\u0118": "E",
              "\u011a": "E",
              "\u0113": "e",
              "\u0115": "e",
              "\u0117": "e",
              "\u0119": "e",
              "\u011b": "e",
              "\u011c": "G",
              "\u011e": "G",
              "\u0120": "G",
              "\u0122": "G",
              "\u011d": "g",
              "\u011f": "g",
              "\u0121": "g",
              "\u0123": "g",
              "\u0124": "H",
              "\u0126": "H",
              "\u0125": "h",
              "\u0127": "h",
              "\u0128": "I",
              "\u012a": "I",
              "\u012c": "I",
              "\u012e": "I",
              "\u0130": "I",
              "\u0129": "i",
              "\u012b": "i",
              "\u012d": "i",
              "\u012f": "i",
              "\u0131": "i",
              "\u0134": "J",
              "\u0135": "j",
              "\u0136": "K",
              "\u0137": "k",
              "\u0138": "k",
              "\u0139": "L",
              "\u013b": "L",
              "\u013d": "L",
              "\u013f": "L",
              "\u0141": "L",
              "\u013a": "l",
              "\u013c": "l",
              "\u013e": "l",
              "\u0140": "l",
              "\u0142": "l",
              "\u0143": "N",
              "\u0145": "N",
              "\u0147": "N",
              "\u014a": "N",
              "\u0144": "n",
              "\u0146": "n",
              "\u0148": "n",
              "\u014b": "n",
              "\u014c": "O",
              "\u014e": "O",
              "\u0150": "O",
              "\u014d": "o",
              "\u014f": "o",
              "\u0151": "o",
              "\u0154": "R",
              "\u0156": "R",
              "\u0158": "R",
              "\u0155": "r",
              "\u0157": "r",
              "\u0159": "r",
              "\u015a": "S",
              "\u015c": "S",
              "\u015e": "S",
              "\u0160": "S",
              "\u015b": "s",
              "\u015d": "s",
              "\u015f": "s",
              "\u0161": "s",
              "\u0162": "T",
              "\u0164": "T",
              "\u0166": "T",
              "\u0163": "t",
              "\u0165": "t",
              "\u0167": "t",
              "\u0168": "U",
              "\u016a": "U",
              "\u016c": "U",
              "\u016e": "U",
              "\u0170": "U",
              "\u0172": "U",
              "\u0169": "u",
              "\u016b": "u",
              "\u016d": "u",
              "\u016f": "u",
              "\u0171": "u",
              "\u0173": "u",
              "\u0174": "W",
              "\u0175": "w",
              "\u0176": "Y",
              "\u0177": "y",
              "\u0178": "Y",
              "\u0179": "Z",
              "\u017b": "Z",
              "\u017d": "Z",
              "\u017a": "z",
              "\u017c": "z",
              "\u017e": "z",
              "\u0132": "IJ",
              "\u0133": "ij",
              "\u0152": "Oe",
              "\u0153": "oe",
              "\u0149": "'n",
              "\u017f": "s",
            }),
            hn = tn({
              "&": "&amp;",
              "<": "&lt;",
              ">": "&gt;",
              '"': "&quot;",
              "'": "&#39;",
            });
          function fn(e) {
            return "\\" + bt[e];
          }
          function dn(e) {
            return ht.test(e);
          }
          function yn(e) {
            var t = -1,
              n = Array(e.size);
            return (
              e.forEach(function (e, r) {
                n[++t] = [r, e];
              }),
              n
            );
          }
          function _n(e, t) {
            return function (n) {
              return e(t(n));
            };
          }
          function vn(e, t) {
            for (var n = -1, r = e.length, o = 0, i = []; ++n < r; ) {
              var a = e[n];
              (a !== t && a !== l) || ((e[n] = l), (i[o++] = n));
            }
            return i;
          }
          function bn(e, t) {
            return "__proto__" == t ? i : e[t];
          }
          function gn(e) {
            var t = -1,
              n = Array(e.size);
            return (
              e.forEach(function (e) {
                n[++t] = e;
              }),
              n
            );
          }
          function mn(e) {
            var t = -1,
              n = Array(e.size);
            return (
              e.forEach(function (e) {
                n[++t] = [e, e];
              }),
              n
            );
          }
          function wn(e) {
            return dn(e)
              ? (function (e) {
                  for (var t = (ct.lastIndex = 0); ct.test(e); ) ++t;
                  return t;
                })(e)
              : Zt(e);
          }
          function Cn(e) {
            return dn(e)
              ? (function (e) {
                  return e.match(ct) || [];
                })(e)
              : (function (e) {
                  return e.split("");
                })(e);
          }
          var xn = tn({
              "&amp;": "&",
              "&lt;": "<",
              "&gt;": ">",
              "&quot;": '"',
              "&#39;": "'",
            }),
            kn = (function e(t) {
              var n,
                r = (t =
                  null == t ? xt : kn.defaults(xt.Object(), t, kn.pick(xt, dt)))
                  .Array,
                o = t.Date,
                We = t.Error,
                Ge = t.Function,
                qe = t.Math,
                Ze = t.Object,
                Qe = t.RegExp,
                Ke = t.String,
                $e = t.TypeError,
                Je = r.prototype,
                Ye = Ze.prototype,
                Xe = t["__core-js_shared__"],
                et = Ge.prototype.toString,
                tt = Ye.hasOwnProperty,
                nt = 0,
                rt = (n = /[^.]+$/.exec(
                  (Xe && Xe.keys && Xe.keys.IE_PROTO) || ""
                ))
                  ? "Symbol(src)_1." + n
                  : "",
                ot = Ye.toString,
                it = et.call(Ze),
                at = xt._,
                st = Qe(
                  "^" +
                    et
                      .call(tt)
                      .replace(ke, "\\$&")
                      .replace(
                        /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
                        "$1.*?"
                      ) +
                    "$"
                ),
                ct = Et ? t.Buffer : i,
                ht = t.Symbol,
                bt = t.Uint8Array,
                wt = ct ? ct.allocUnsafe : i,
                Ct = _n(Ze.getPrototypeOf, Ze),
                kt = Ze.create,
                St = Ye.propertyIsEnumerable,
                jt = Je.splice,
                Tt = ht ? ht.isConcatSpreadable : i,
                Zt = ht ? ht.iterator : i,
                tn = ht ? ht.toStringTag : i,
                Sn = (function () {
                  try {
                    var e = ki(Ze, "defineProperty");
                    return e({}, "", {}), e;
                  } catch (e) {}
                })(),
                En = t.clearTimeout !== xt.clearTimeout && t.clearTimeout,
                jn = o && o.now !== xt.Date.now && o.now,
                Tn = t.setTimeout !== xt.setTimeout && t.setTimeout,
                An = qe.ceil,
                In = qe.floor,
                Pn = Ze.getOwnPropertySymbols,
                On = ct ? ct.isBuffer : i,
                Mn = t.isFinite,
                Nn = Je.join,
                Rn = _n(Ze.keys, Ze),
                Dn = qe.max,
                Bn = qe.min,
                Vn = o.now,
                zn = t.parseInt,
                Fn = qe.random,
                Ln = Je.reverse,
                Hn = ki(t, "DataView"),
                Un = ki(t, "Map"),
                Wn = ki(t, "Promise"),
                Gn = ki(t, "Set"),
                qn = ki(t, "WeakMap"),
                Zn = ki(Ze, "create"),
                Qn = qn && new qn(),
                Kn = {},
                $n = Ki(Hn),
                Jn = Ki(Un),
                Yn = Ki(Wn),
                Xn = Ki(Gn),
                er = Ki(qn),
                tr = ht ? ht.prototype : i,
                nr = tr ? tr.valueOf : i,
                rr = tr ? tr.toString : i;
              function or(e) {
                if (hs(e) && !ts(e) && !(e instanceof lr)) {
                  if (e instanceof sr) return e;
                  if (tt.call(e, "__wrapped__")) return $i(e);
                }
                return new sr(e);
              }
              var ir = (function () {
                function e() {}
                return function (t) {
                  if (!ps(t)) return {};
                  if (kt) return kt(t);
                  e.prototype = t;
                  var n = new e();
                  return (e.prototype = i), n;
                };
              })();
              function ar() {}
              function sr(e, t) {
                (this.__wrapped__ = e),
                  (this.__actions__ = []),
                  (this.__chain__ = !!t),
                  (this.__index__ = 0),
                  (this.__values__ = i);
              }
              function lr(e) {
                (this.__wrapped__ = e),
                  (this.__actions__ = []),
                  (this.__dir__ = 1),
                  (this.__filtered__ = !1),
                  (this.__iteratees__ = []),
                  (this.__takeCount__ = I),
                  (this.__views__ = []);
              }
              function ur(e) {
                var t = -1,
                  n = null == e ? 0 : e.length;
                for (this.clear(); ++t < n; ) {
                  var r = e[t];
                  this.set(r[0], r[1]);
                }
              }
              function cr(e) {
                var t = -1,
                  n = null == e ? 0 : e.length;
                for (this.clear(); ++t < n; ) {
                  var r = e[t];
                  this.set(r[0], r[1]);
                }
              }
              function pr(e) {
                var t = -1,
                  n = null == e ? 0 : e.length;
                for (this.clear(); ++t < n; ) {
                  var r = e[t];
                  this.set(r[0], r[1]);
                }
              }
              function hr(e) {
                var t = -1,
                  n = null == e ? 0 : e.length;
                for (this.__data__ = new pr(); ++t < n; ) this.add(e[t]);
              }
              function fr(e) {
                var t = (this.__data__ = new cr(e));
                this.size = t.size;
              }
              function dr(e, t) {
                var n = ts(e),
                  r = !n && es(e),
                  o = !n && !r && is(e),
                  i = !n && !r && !o && ms(e),
                  a = n || r || o || i,
                  s = a ? on(e.length, Ke) : [],
                  l = s.length;
                for (var u in e)
                  (!t && !tt.call(e, u)) ||
                    (a &&
                      ("length" == u ||
                        (o && ("offset" == u || "parent" == u)) ||
                        (i &&
                          ("buffer" == u ||
                            "byteLength" == u ||
                            "byteOffset" == u)) ||
                        Pi(u, l))) ||
                    s.push(u);
                return s;
              }
              function yr(e) {
                var t = e.length;
                return t ? e[uo(0, t - 1)] : i;
              }
              function _r(e, t, n) {
                ((n === i || Ja(e[t], n)) && (n !== i || t in e)) ||
                  wr(e, t, n);
              }
              function vr(e, t, n) {
                var r = e[t];
                (tt.call(e, t) && Ja(r, n) && (n !== i || t in e)) ||
                  wr(e, t, n);
              }
              function br(e, t) {
                for (var n = e.length; n--; ) if (Ja(e[n][0], t)) return n;
                return -1;
              }
              function gr(e, t, n, r) {
                return (
                  Tr(e, function (e, o, i) {
                    t(r, e, n(e), i);
                  }),
                  r
                );
              }
              function mr(e, t) {
                return e && Uo(t, Hs(t), e);
              }
              function wr(e, t, n) {
                "__proto__" == t && Sn
                  ? Sn(e, t, {
                      configurable: !0,
                      enumerable: !0,
                      value: n,
                      writable: !0,
                    })
                  : (e[t] = n);
              }
              function Cr(e, t) {
                for (
                  var n = -1, o = t.length, a = r(o), s = null == e;
                  ++n < o;

                )
                  a[n] = s ? i : Bs(e, t[n]);
                return a;
              }
              function xr(e, t, n) {
                return (
                  e == e &&
                    (n !== i && (e = e <= n ? e : n),
                    t !== i && (e = e >= t ? e : t)),
                  e
                );
              }
              function kr(e, t, n, r, o, a) {
                var s,
                  l = t & u,
                  h = t & c,
                  f = t & p;
                if ((n && (s = o ? n(e, r, o, a) : n(e)), s !== i)) return s;
                if (!ps(e)) return e;
                var d = ts(e);
                if (d) {
                  if (
                    ((s = (function (e) {
                      var t = e.length,
                        n = new e.constructor(t);
                      return (
                        t &&
                          "string" == typeof e[0] &&
                          tt.call(e, "index") &&
                          ((n.index = e.index), (n.input = e.input)),
                        n
                      );
                    })(e)),
                    !l)
                  )
                    return Ho(e, s);
                } else {
                  var y = ji(e),
                    _ = y == L || y == H;
                  if (is(e)) return Do(e, l);
                  if (y == q || y == N || (_ && !o)) {
                    if (((s = h || _ ? {} : Ai(e)), !l))
                      return h
                        ? (function (e, t) {
                            return Uo(e, Ei(e), t);
                          })(
                            e,
                            (function (t, n) {
                              return t && Uo(e, Us(e), t);
                            })(s)
                          )
                        : (function (e, t) {
                            return Uo(e, Si(e), t);
                          })(e, mr(s, e));
                  } else {
                    if (!vt[y]) return o ? e : {};
                    s = (function (e, t, n) {
                      var r,
                        o,
                        i = e.constructor;
                      switch (t) {
                        case ee:
                          return Bo(e);
                        case B:
                        case V:
                          return new i(+e);
                        case te:
                          return (function (e, t) {
                            var n = t ? Bo(e.buffer) : e.buffer;
                            return new e.constructor(
                              n,
                              e.byteOffset,
                              e.byteLength
                            );
                          })(e, n);
                        case ne:
                        case re:
                        case oe:
                        case ie:
                        case ae:
                        case se:
                        case le:
                        case ue:
                        case ce:
                          return Vo(e, n);
                        case U:
                          return new i();
                        case W:
                        case $:
                          return new i(e);
                        case Q:
                          return (
                            ((o = new (r = e).constructor(
                              r.source,
                              Re.exec(r)
                            )).lastIndex = r.lastIndex),
                            o
                          );
                        case K:
                          return new i();
                        case J:
                          return nr ? Ze(nr.call(e)) : {};
                      }
                    })(e, y, l);
                  }
                }
                a || (a = new fr());
                var v = a.get(e);
                if (v) return v;
                if ((a.set(e, s), vs(e)))
                  return (
                    e.forEach(function (r) {
                      s.add(kr(r, t, n, r, e, a));
                    }),
                    s
                  );
                if (fs(e))
                  return (
                    e.forEach(function (r, o) {
                      s.set(o, kr(r, t, n, o, e, a));
                    }),
                    s
                  );
                var b = d ? i : (f ? (h ? vi : _i) : h ? Us : Hs)(e);
                return (
                  Bt(b || e, function (r, o) {
                    b && (r = e[(o = r)]), vr(s, o, kr(r, t, n, o, e, a));
                  }),
                  s
                );
              }
              function Sr(e, t, n) {
                var r = n.length;
                if (null == e) return !r;
                for (e = Ze(e); r--; ) {
                  var o = n[r],
                    a = e[o];
                  if ((a === i && !(o in e)) || !(0, t[o])(a)) return !1;
                }
                return !0;
              }
              function Er(e, t, n) {
                if ("function" != typeof e) throw new $e(s);
                return Hi(function () {
                  e.apply(i, n);
                }, t);
              }
              function jr(e, t, n, r) {
                var o = -1,
                  i = Ft,
                  s = !0,
                  l = e.length,
                  u = [],
                  c = t.length;
                if (!l) return u;
                n && (t = Ht(t, an(n))),
                  r
                    ? ((i = Lt), (s = !1))
                    : t.length >= a && ((i = ln), (s = !1), (t = new hr(t)));
                e: for (; ++o < l; ) {
                  var p = e[o],
                    h = null == n ? p : n(p);
                  if (((p = r || 0 !== p ? p : 0), s && h == h)) {
                    for (var f = c; f--; ) if (t[f] === h) continue e;
                    u.push(p);
                  } else i(t, h, r) || u.push(p);
                }
                return u;
              }
              (or.templateSettings = {
                escape: be,
                evaluate: ge,
                interpolate: me,
                variable: "",
                imports: { _: or },
              }),
                ((or.prototype = ar.prototype).constructor = or),
                ((sr.prototype = ir(ar.prototype)).constructor = sr),
                ((lr.prototype = ir(ar.prototype)).constructor = lr),
                (ur.prototype.clear = function () {
                  (this.__data__ = Zn ? Zn(null) : {}), (this.size = 0);
                }),
                (ur.prototype.delete = function (e) {
                  var t = this.has(e) && delete this.__data__[e];
                  return (this.size -= t ? 1 : 0), t;
                }),
                (ur.prototype.get = function (e) {
                  var t = this.__data__;
                  if (Zn) {
                    var n = t[e];
                    return "__lodash_hash_undefined__" === n ? i : n;
                  }
                  return tt.call(t, e) ? t[e] : i;
                }),
                (ur.prototype.has = function (e) {
                  var t = this.__data__;
                  return Zn ? t[e] !== i : tt.call(t, e);
                }),
                (ur.prototype.set = function (e, t) {
                  var n = this.__data__;
                  return (
                    (this.size += this.has(e) ? 0 : 1),
                    (n[e] = Zn && t === i ? "__lodash_hash_undefined__" : t),
                    this
                  );
                }),
                (cr.prototype.clear = function () {
                  (this.__data__ = []), (this.size = 0);
                }),
                (cr.prototype.delete = function (e) {
                  var t = this.__data__,
                    n = br(t, e);
                  return !(
                    n < 0 ||
                    (n == t.length - 1 ? t.pop() : jt.call(t, n, 1),
                    --this.size,
                    0)
                  );
                }),
                (cr.prototype.get = function (e) {
                  var t = this.__data__,
                    n = br(t, e);
                  return n < 0 ? i : t[n][1];
                }),
                (cr.prototype.has = function (e) {
                  return br(this.__data__, e) > -1;
                }),
                (cr.prototype.set = function (e, t) {
                  var n = this.__data__,
                    r = br(n, e);
                  return (
                    r < 0 ? (++this.size, n.push([e, t])) : (n[r][1] = t), this
                  );
                }),
                (pr.prototype.clear = function () {
                  (this.size = 0),
                    (this.__data__ = {
                      hash: new ur(),
                      map: new (Un || cr)(),
                      string: new ur(),
                    });
                }),
                (pr.prototype.delete = function (e) {
                  var t = Ci(this, e).delete(e);
                  return (this.size -= t ? 1 : 0), t;
                }),
                (pr.prototype.get = function (e) {
                  return Ci(this, e).get(e);
                }),
                (pr.prototype.has = function (e) {
                  return Ci(this, e).has(e);
                }),
                (pr.prototype.set = function (e, t) {
                  var n = Ci(this, e),
                    r = n.size;
                  return n.set(e, t), (this.size += n.size == r ? 0 : 1), this;
                }),
                (hr.prototype.add = hr.prototype.push =
                  function (e) {
                    return (
                      this.__data__.set(e, "__lodash_hash_undefined__"), this
                    );
                  }),
                (hr.prototype.has = function (e) {
                  return this.__data__.has(e);
                }),
                (fr.prototype.clear = function () {
                  (this.__data__ = new cr()), (this.size = 0);
                }),
                (fr.prototype.delete = function (e) {
                  var t = this.__data__,
                    n = t.delete(e);
                  return (this.size = t.size), n;
                }),
                (fr.prototype.get = function (e) {
                  return this.__data__.get(e);
                }),
                (fr.prototype.has = function (e) {
                  return this.__data__.has(e);
                }),
                (fr.prototype.set = function (e, t) {
                  var n = this.__data__;
                  if (n instanceof cr) {
                    var r = n.__data__;
                    if (!Un || r.length < a - 1)
                      return r.push([e, t]), (this.size = ++n.size), this;
                    n = this.__data__ = new pr(r);
                  }
                  return n.set(e, t), (this.size = n.size), this;
                });
              var Tr = qo(Dr),
                Ar = qo(Br, !0);
              function Ir(e, t) {
                var n = !0;
                return (
                  Tr(e, function (e, r, o) {
                    return (n = !!t(e, r, o));
                  }),
                  n
                );
              }
              function Pr(e, t, n) {
                for (var r = -1, o = e.length; ++r < o; ) {
                  var a = e[r],
                    s = t(a);
                  if (null != s && (l === i ? s == s && !gs(s) : n(s, l)))
                    var l = s,
                      u = a;
                }
                return u;
              }
              function Or(e, t) {
                var n = [];
                return (
                  Tr(e, function (e, r, o) {
                    t(e, r, o) && n.push(e);
                  }),
                  n
                );
              }
              function Mr(e, t, n, r, o) {
                var i = -1,
                  a = e.length;
                for (n || (n = Ii), o || (o = []); ++i < a; ) {
                  var s = e[i];
                  t > 0 && n(s)
                    ? t > 1
                      ? Mr(s, t - 1, n, r, o)
                      : Ut(o, s)
                    : r || (o[o.length] = s);
                }
                return o;
              }
              var Nr = Zo(),
                Rr = Zo(!0);
              function Dr(e, t) {
                return e && Nr(e, t, Hs);
              }
              function Br(e, t) {
                return e && Rr(e, t, Hs);
              }
              function Vr(e, t) {
                return zt(t, function (t) {
                  return ls(e[t]);
                });
              }
              function zr(e, t) {
                for (var n = 0, r = (t = Oo(t, e)).length; null != e && n < r; )
                  e = e[Qi(t[n++])];
                return n && n == r ? e : i;
              }
              function Fr(e, t, n) {
                var r = t(e);
                return ts(e) ? r : Ut(r, n(e));
              }
              function Lr(e) {
                return null == e
                  ? e === i
                    ? Y
                    : G
                  : tn && tn in Ze(e)
                  ? (function (e) {
                      var t = tt.call(e, tn),
                        n = e[tn];
                      try {
                        e[tn] = i;
                        var r = !0;
                      } catch (e) {}
                      var o = ot.call(e);
                      return r && (t ? (e[tn] = n) : delete e[tn]), o;
                    })(e)
                  : (function (e) {
                      return ot.call(e);
                    })(e);
              }
              function Hr(e, t) {
                return e > t;
              }
              function Ur(e, t) {
                return null != e && tt.call(e, t);
              }
              function Wr(e, t) {
                return null != e && t in Ze(e);
              }
              function Gr(e, t, n) {
                for (
                  var o = n ? Lt : Ft,
                    a = e[0].length,
                    s = e.length,
                    l = s,
                    u = r(s),
                    c = 1 / 0,
                    p = [];
                  l--;

                ) {
                  var h = e[l];
                  l && t && (h = Ht(h, an(t))),
                    (c = Bn(h.length, c)),
                    (u[l] =
                      !n && (t || (a >= 120 && h.length >= 120))
                        ? new hr(l && h)
                        : i);
                }
                h = e[0];
                var f = -1,
                  d = u[0];
                e: for (; ++f < a && p.length < c; ) {
                  var y = h[f],
                    _ = t ? t(y) : y;
                  if (
                    ((y = n || 0 !== y ? y : 0), !(d ? ln(d, _) : o(p, _, n)))
                  ) {
                    for (l = s; --l; ) {
                      var v = u[l];
                      if (!(v ? ln(v, _) : o(e[l], _, n))) continue e;
                    }
                    d && d.push(_), p.push(y);
                  }
                }
                return p;
              }
              function qr(e, t, n) {
                var r = null == (e = Fi(e, (t = Oo(t, e)))) ? e : e[Qi(sa(t))];
                return null == r ? i : Rt(r, e, n);
              }
              function Zr(e) {
                return hs(e) && Lr(e) == N;
              }
              function Qr(e, t, n, r, o) {
                return (
                  e === t ||
                  (null == e || null == t || (!hs(e) && !hs(t))
                    ? e != e && t != t
                    : (function (e, t, n, r, o, a) {
                        var s = ts(e),
                          l = ts(t),
                          u = s ? R : ji(e),
                          c = l ? R : ji(t),
                          p = (u = u == N ? q : u) == q,
                          d = (c = c == N ? q : c) == q,
                          y = u == c;
                        if (y && is(e)) {
                          if (!is(t)) return !1;
                          (s = !0), (p = !1);
                        }
                        if (y && !p)
                          return (
                            a || (a = new fr()),
                            s || ms(e)
                              ? di(e, t, n, r, o, a)
                              : (function (e, t, n, r, o, i, a) {
                                  switch (u) {
                                    case te:
                                      if (
                                        e.byteLength != t.byteLength ||
                                        e.byteOffset != t.byteOffset
                                      )
                                        return !1;
                                      (e = e.buffer), (t = t.buffer);
                                    case ee:
                                      return !(
                                        e.byteLength != t.byteLength ||
                                        !i(new bt(e), new bt(t))
                                      );
                                    case B:
                                    case V:
                                    case W:
                                      return Ja(+e, +t);
                                    case F:
                                      return (
                                        e.name == t.name &&
                                        e.message == t.message
                                      );
                                    case Q:
                                    case $:
                                      return e == t + "";
                                    case U:
                                      var s = yn;
                                    case K:
                                      if (
                                        (s || (s = gn),
                                        e.size != t.size && !(r & h))
                                      )
                                        return !1;
                                      var l = a.get(e);
                                      if (l) return l == t;
                                      (r |= f), a.set(e, t);
                                      var c = di(s(e), s(t), r, o, i, a);
                                      return a.delete(e), c;
                                    case J:
                                      if (nr) return nr.call(e) == nr.call(t);
                                  }
                                  return !1;
                                })(e, t, 0, n, r, o, a)
                          );
                        if (!(n & h)) {
                          var _ = p && tt.call(e, "__wrapped__"),
                            v = d && tt.call(t, "__wrapped__");
                          if (_ || v) {
                            var b = _ ? e.value() : e,
                              g = v ? t.value() : t;
                            return a || (a = new fr()), o(b, g, n, r, a);
                          }
                        }
                        return (
                          !!y &&
                          (a || (a = new fr()),
                          (function (e, t, n, r, o, a) {
                            var s = n & h,
                              l = _i(e),
                              u = l.length;
                            if (u != _i(t).length && !s) return !1;
                            for (var c = u; c--; ) {
                              var p = l[c];
                              if (!(s ? p in t : tt.call(t, p))) return !1;
                            }
                            var f = a.get(e);
                            if (f && a.get(t)) return f == t;
                            var d = !0;
                            a.set(e, t), a.set(t, e);
                            for (var y = s; ++c < u; ) {
                              var _ = e[(p = l[c])],
                                v = t[p];
                              if (r)
                                var b = s
                                  ? r(v, _, p, t, e, a)
                                  : r(_, v, p, e, t, a);
                              if (
                                !(b === i ? _ === v || o(_, v, n, r, a) : b)
                              ) {
                                d = !1;
                                break;
                              }
                              y || (y = "constructor" == p);
                            }
                            if (d && !y) {
                              var g = e.constructor,
                                m = t.constructor;
                              g != m &&
                                "constructor" in e &&
                                "constructor" in t &&
                                !(
                                  "function" == typeof g &&
                                  g instanceof g &&
                                  "function" == typeof m &&
                                  m instanceof m
                                ) &&
                                (d = !1);
                            }
                            return a.delete(e), a.delete(t), d;
                          })(e, t, n, r, o, a))
                        );
                      })(e, t, n, r, Qr, o))
                );
              }
              function Kr(e, t, n, r) {
                var o = n.length,
                  a = o,
                  s = !r;
                if (null == e) return !a;
                for (e = Ze(e); o--; ) {
                  var l = n[o];
                  if (s && l[2] ? l[1] !== e[l[0]] : !(l[0] in e)) return !1;
                }
                for (; ++o < a; ) {
                  var u = (l = n[o])[0],
                    c = e[u],
                    p = l[1];
                  if (s && l[2]) {
                    if (c === i && !(u in e)) return !1;
                  } else {
                    var d = new fr();
                    if (r) var y = r(c, p, u, e, t, d);
                    if (!(y === i ? Qr(p, c, h | f, r, d) : y)) return !1;
                  }
                }
                return !0;
              }
              function $r(e) {
                return (
                  !(!ps(e) || (rt && rt in e)) && (ls(e) ? st : Ve).test(Ki(e))
                );
              }
              function Jr(e) {
                return "function" == typeof e
                  ? e
                  : null == e
                  ? dl
                  : "object" == typeof e
                  ? ts(e)
                    ? no(e[0], e[1])
                    : to(e)
                  : xl(e);
              }
              function Yr(e) {
                if (!Di(e)) return Rn(e);
                var t = [];
                for (var n in Ze(e))
                  tt.call(e, n) && "constructor" != n && t.push(n);
                return t;
              }
              function Xr(e, t) {
                return e < t;
              }
              function eo(e, t) {
                var n = -1,
                  o = rs(e) ? r(e.length) : [];
                return (
                  Tr(e, function (e, r, i) {
                    o[++n] = t(e, r, i);
                  }),
                  o
                );
              }
              function to(e) {
                var t = xi(e);
                return 1 == t.length && t[0][2]
                  ? Vi(t[0][0], t[0][1])
                  : function (n) {
                      return n === e || Kr(n, e, t);
                    };
              }
              function no(e, t) {
                return Mi(e) && Bi(t)
                  ? Vi(Qi(e), t)
                  : function (n) {
                      var r = Bs(n, e);
                      return r === i && r === t ? Vs(n, e) : Qr(t, r, h | f);
                    };
              }
              function ro(e, t, n, r, o) {
                e !== t &&
                  Nr(
                    t,
                    function (a, s) {
                      if (ps(a))
                        o || (o = new fr()),
                          (function (e, t, n, r, o, a, s) {
                            var l = bn(e, n),
                              u = bn(t, n),
                              c = s.get(u);
                            if (c) _r(e, n, c);
                            else {
                              var p = a ? a(l, u, n + "", e, t, s) : i,
                                h = p === i;
                              if (h) {
                                var f = ts(u),
                                  d = !f && is(u),
                                  y = !f && !d && ms(u);
                                (p = u),
                                  f || d || y
                                    ? ts(l)
                                      ? (p = l)
                                      : os(l)
                                      ? (p = Ho(l))
                                      : d
                                      ? ((h = !1), (p = Do(u, !0)))
                                      : y
                                      ? ((h = !1), (p = Vo(u, !0)))
                                      : (p = [])
                                    : ys(u) || es(u)
                                    ? ((p = l),
                                      es(l)
                                        ? (p = Ts(l))
                                        : (!ps(l) || (r && ls(l))) &&
                                          (p = Ai(u)))
                                    : (h = !1);
                              }
                              h && (s.set(u, p), o(p, u, r, a, s), s.delete(u)),
                                _r(e, n, p);
                            }
                          })(e, t, s, n, ro, r, o);
                      else {
                        var l = r ? r(bn(e, s), a, s + "", e, t, o) : i;
                        l === i && (l = a), _r(e, s, l);
                      }
                    },
                    Us
                  );
              }
              function oo(e, t) {
                var n = e.length;
                if (n) return Pi((t += t < 0 ? n : 0), n) ? e[t] : i;
              }
              function io(e, t, n) {
                var r = -1;
                return (
                  (t = Ht(t.length ? t : [dl], an(wi()))),
                  (function (e, t) {
                    var r = e.length;
                    for (
                      e.sort(function (e, t) {
                        return (function (e, t, n) {
                          for (
                            var r = -1,
                              o = e.criteria,
                              i = t.criteria,
                              a = o.length,
                              s = n.length;
                            ++r < a;

                          ) {
                            var l = zo(o[r], i[r]);
                            if (l)
                              return r >= s ? l : l * ("desc" == n[r] ? -1 : 1);
                          }
                          return e.index - t.index;
                        })(e, t, n);
                      });
                      r--;

                    )
                      e[r] = e[r].value;
                    return e;
                  })(
                    eo(e, function (e, n, o) {
                      return {
                        criteria: Ht(t, function (t) {
                          return t(e);
                        }),
                        index: ++r,
                        value: e,
                      };
                    })
                  )
                );
              }
              function ao(e, t, n) {
                for (var r = -1, o = t.length, i = {}; ++r < o; ) {
                  var a = t[r],
                    s = zr(e, a);
                  n(s, a) && ho(i, Oo(a, e), s);
                }
                return i;
              }
              function so(e, t, n, r) {
                var o = r ? Jt : $t,
                  i = -1,
                  a = t.length,
                  s = e;
                for (e === t && (t = Ho(t)), n && (s = Ht(e, an(n))); ++i < a; )
                  for (
                    var l = 0, u = t[i], c = n ? n(u) : u;
                    (l = o(s, c, l, r)) > -1;

                  )
                    s !== e && jt.call(s, l, 1), jt.call(e, l, 1);
                return e;
              }
              function lo(e, t) {
                for (var n = e ? t.length : 0, r = n - 1; n--; ) {
                  var o = t[n];
                  if (n == r || o !== i) {
                    var i = o;
                    Pi(o) ? jt.call(e, o, 1) : ko(e, o);
                  }
                }
                return e;
              }
              function uo(e, t) {
                return e + In(Fn() * (t - e + 1));
              }
              function co(e, t) {
                var n = "";
                if (!e || t < 1 || t > j) return n;
                do {
                  t % 2 && (n += e), (t = In(t / 2)) && (e += e);
                } while (t);
                return n;
              }
              function po(e, t) {
                return Ui(zi(e, t, dl), e + "");
              }
              function ho(e, t, n, r) {
                if (!ps(e)) return e;
                for (
                  var o = -1, a = (t = Oo(t, e)).length, s = a - 1, l = e;
                  null != l && ++o < a;

                ) {
                  var u = Qi(t[o]),
                    c = n;
                  if (o != s) {
                    var p = l[u];
                    (c = r ? r(p, u, l) : i) === i &&
                      (c = ps(p) ? p : Pi(t[o + 1]) ? [] : {});
                  }
                  vr(l, u, c), (l = l[u]);
                }
                return e;
              }
              var fo = Qn
                  ? function (e, t) {
                      return Qn.set(e, t), e;
                    }
                  : dl,
                yo = Sn
                  ? function (e, t) {
                      return Sn(e, "toString", {
                        configurable: !0,
                        enumerable: !1,
                        value: pl(t),
                        writable: !0,
                      });
                    }
                  : dl;
              function _o(e, t, n) {
                var o = -1,
                  i = e.length;
                t < 0 && (t = -t > i ? 0 : i + t),
                  (n = n > i ? i : n) < 0 && (n += i),
                  (i = t > n ? 0 : (n - t) >>> 0),
                  (t >>>= 0);
                for (var a = r(i); ++o < i; ) a[o] = e[o + t];
                return a;
              }
              function vo(e, t) {
                var n;
                return (
                  Tr(e, function (e, r, o) {
                    return !(n = t(e, r, o));
                  }),
                  !!n
                );
              }
              function bo(e, t, n) {
                var r = 0,
                  o = null == e ? r : e.length;
                if ("number" == typeof t && t == t && o <= O) {
                  for (; r < o; ) {
                    var i = (r + o) >>> 1,
                      a = e[i];
                    null !== a && !gs(a) && (n ? a <= t : a < t)
                      ? (r = i + 1)
                      : (o = i);
                  }
                  return o;
                }
                return go(e, t, dl, n);
              }
              function go(e, t, n, r) {
                t = n(t);
                for (
                  var o = 0,
                    a = null == e ? 0 : e.length,
                    s = t != t,
                    l = null === t,
                    u = gs(t),
                    c = t === i;
                  o < a;

                ) {
                  var p = In((o + a) / 2),
                    h = n(e[p]),
                    f = h !== i,
                    d = null === h,
                    y = h == h,
                    _ = gs(h);
                  if (s) var v = r || y;
                  else
                    v = c
                      ? y && (r || f)
                      : l
                      ? y && f && (r || !d)
                      : u
                      ? y && f && !d && (r || !_)
                      : !d && !_ && (r ? h <= t : h < t);
                  v ? (o = p + 1) : (a = p);
                }
                return Bn(a, P);
              }
              function mo(e, t) {
                for (var n = -1, r = e.length, o = 0, i = []; ++n < r; ) {
                  var a = e[n],
                    s = t ? t(a) : a;
                  if (!n || !Ja(s, l)) {
                    var l = s;
                    i[o++] = 0 === a ? 0 : a;
                  }
                }
                return i;
              }
              function wo(e) {
                return "number" == typeof e ? e : gs(e) ? A : +e;
              }
              function Co(e) {
                if ("string" == typeof e) return e;
                if (ts(e)) return Ht(e, Co) + "";
                if (gs(e)) return rr ? rr.call(e) : "";
                var t = e + "";
                return "0" == t && 1 / e == -E ? "-0" : t;
              }
              function xo(e, t, n) {
                var r = -1,
                  o = Ft,
                  i = e.length,
                  s = !0,
                  l = [],
                  u = l;
                if (n) (s = !1), (o = Lt);
                else if (i >= a) {
                  var c = t ? null : li(e);
                  if (c) return gn(c);
                  (s = !1), (o = ln), (u = new hr());
                } else u = t ? [] : l;
                e: for (; ++r < i; ) {
                  var p = e[r],
                    h = t ? t(p) : p;
                  if (((p = n || 0 !== p ? p : 0), s && h == h)) {
                    for (var f = u.length; f--; ) if (u[f] === h) continue e;
                    t && u.push(h), l.push(p);
                  } else o(u, h, n) || (u !== l && u.push(h), l.push(p));
                }
                return l;
              }
              function ko(e, t) {
                return (
                  null == (e = Fi(e, (t = Oo(t, e)))) || delete e[Qi(sa(t))]
                );
              }
              function So(e, t, n, r) {
                return ho(e, t, n(zr(e, t)), r);
              }
              function Eo(e, t, n, r) {
                for (
                  var o = e.length, i = r ? o : -1;
                  (r ? i-- : ++i < o) && t(e[i], i, e);

                );
                return n
                  ? _o(e, r ? 0 : i, r ? i + 1 : o)
                  : _o(e, r ? i + 1 : 0, r ? o : i);
              }
              function jo(e, t) {
                var n = e;
                return (
                  n instanceof lr && (n = n.value()),
                  Wt(
                    t,
                    function (e, t) {
                      return t.func.apply(t.thisArg, Ut([e], t.args));
                    },
                    n
                  )
                );
              }
              function To(e, t, n) {
                var o = e.length;
                if (o < 2) return o ? xo(e[0]) : [];
                for (var i = -1, a = r(o); ++i < o; )
                  for (var s = e[i], l = -1; ++l < o; )
                    l != i && (a[i] = jr(a[i] || s, e[l], t, n));
                return xo(Mr(a, 1), t, n);
              }
              function Ao(e, t, n) {
                for (var r = -1, o = e.length, a = t.length, s = {}; ++r < o; )
                  n(s, e[r], r < a ? t[r] : i);
                return s;
              }
              function Io(e) {
                return os(e) ? e : [];
              }
              function Po(e) {
                return "function" == typeof e ? e : dl;
              }
              function Oo(e, t) {
                return ts(e) ? e : Mi(e, t) ? [e] : Zi(As(e));
              }
              var Mo = po;
              function No(e, t, n) {
                var r = e.length;
                return (n = n === i ? r : n), !t && n >= r ? e : _o(e, t, n);
              }
              var Ro =
                En ||
                function (e) {
                  return xt.clearTimeout(e);
                };
              function Do(e, t) {
                if (t) return e.slice();
                var n = e.length,
                  r = wt ? wt(n) : new e.constructor(n);
                return e.copy(r), r;
              }
              function Bo(e) {
                var t = new e.constructor(e.byteLength);
                return new bt(t).set(new bt(e)), t;
              }
              function Vo(e, t) {
                var n = t ? Bo(e.buffer) : e.buffer;
                return new e.constructor(n, e.byteOffset, e.length);
              }
              function zo(e, t) {
                if (e !== t) {
                  var n = e !== i,
                    r = null === e,
                    o = e == e,
                    a = gs(e),
                    s = t !== i,
                    l = null === t,
                    u = t == t,
                    c = gs(t);
                  if (
                    (!l && !c && !a && e > t) ||
                    (a && s && u && !l && !c) ||
                    (r && s && u) ||
                    (!n && u) ||
                    !o
                  )
                    return 1;
                  if (
                    (!r && !a && !c && e < t) ||
                    (c && n && o && !r && !a) ||
                    (l && n && o) ||
                    (!s && o) ||
                    !u
                  )
                    return -1;
                }
                return 0;
              }
              function Fo(e, t, n, o) {
                for (
                  var i = -1,
                    a = e.length,
                    s = n.length,
                    l = -1,
                    u = t.length,
                    c = Dn(a - s, 0),
                    p = r(u + c),
                    h = !o;
                  ++l < u;

                )
                  p[l] = t[l];
                for (; ++i < s; ) (h || i < a) && (p[n[i]] = e[i]);
                for (; c--; ) p[l++] = e[i++];
                return p;
              }
              function Lo(e, t, n, o) {
                for (
                  var i = -1,
                    a = e.length,
                    s = -1,
                    l = n.length,
                    u = -1,
                    c = t.length,
                    p = Dn(a - l, 0),
                    h = r(p + c),
                    f = !o;
                  ++i < p;

                )
                  h[i] = e[i];
                for (var d = i; ++u < c; ) h[d + u] = t[u];
                for (; ++s < l; ) (f || i < a) && (h[d + n[s]] = e[i++]);
                return h;
              }
              function Ho(e, t) {
                var n = -1,
                  o = e.length;
                for (t || (t = r(o)); ++n < o; ) t[n] = e[n];
                return t;
              }
              function Uo(e, t, n, r) {
                var o = !n;
                n || (n = {});
                for (var a = -1, s = t.length; ++a < s; ) {
                  var l = t[a],
                    u = r ? r(n[l], e[l], l, n, e) : i;
                  u === i && (u = e[l]), o ? wr(n, l, u) : vr(n, l, u);
                }
                return n;
              }
              function Wo(e, t) {
                return function (n, r) {
                  var o = ts(n) ? Dt : gr,
                    i = t ? t() : {};
                  return o(n, e, wi(r, 2), i);
                };
              }
              function Go(e) {
                return po(function (t, n) {
                  var r = -1,
                    o = n.length,
                    a = o > 1 ? n[o - 1] : i,
                    s = o > 2 ? n[2] : i;
                  for (
                    a = e.length > 3 && "function" == typeof a ? (o--, a) : i,
                      s && Oi(n[0], n[1], s) && ((a = o < 3 ? i : a), (o = 1)),
                      t = Ze(t);
                    ++r < o;

                  ) {
                    var l = n[r];
                    l && e(t, l, r, a);
                  }
                  return t;
                });
              }
              function qo(e, t) {
                return function (n, r) {
                  if (null == n) return n;
                  if (!rs(n)) return e(n, r);
                  for (
                    var o = n.length, i = t ? o : -1, a = Ze(n);
                    (t ? i-- : ++i < o) && !1 !== r(a[i], i, a);

                  );
                  return n;
                };
              }
              function Zo(e) {
                return function (t, n, r) {
                  for (var o = -1, i = Ze(t), a = r(t), s = a.length; s--; ) {
                    var l = a[e ? s : ++o];
                    if (!1 === n(i[l], l, i)) break;
                  }
                  return t;
                };
              }
              function Qo(e) {
                return function (t) {
                  var n = dn((t = As(t))) ? Cn(t) : i,
                    r = n ? n[0] : t.charAt(0),
                    o = n ? No(n, 1).join("") : t.slice(1);
                  return r[e]() + o;
                };
              }
              function Ko(e) {
                return function (t) {
                  return Wt(ll(el(t).replace(lt, "")), e, "");
                };
              }
              function $o(e) {
                return function () {
                  var t = arguments;
                  switch (t.length) {
                    case 0:
                      return new e();
                    case 1:
                      return new e(t[0]);
                    case 2:
                      return new e(t[0], t[1]);
                    case 3:
                      return new e(t[0], t[1], t[2]);
                    case 4:
                      return new e(t[0], t[1], t[2], t[3]);
                    case 5:
                      return new e(t[0], t[1], t[2], t[3], t[4]);
                    case 6:
                      return new e(t[0], t[1], t[2], t[3], t[4], t[5]);
                    case 7:
                      return new e(t[0], t[1], t[2], t[3], t[4], t[5], t[6]);
                  }
                  var n = ir(e.prototype),
                    r = e.apply(n, t);
                  return ps(r) ? r : n;
                };
              }
              function Jo(e) {
                return function (t, n, r) {
                  var o = Ze(t);
                  if (!rs(t)) {
                    var a = wi(n, 3);
                    (t = Hs(t)),
                      (n = function (e) {
                        return a(o[e], e, o);
                      });
                  }
                  var s = e(t, n, r);
                  return s > -1 ? o[a ? t[s] : s] : i;
                };
              }
              function Yo(e) {
                return yi(function (t) {
                  var n = t.length,
                    r = n,
                    o = sr.prototype.thru;
                  for (e && t.reverse(); r--; ) {
                    var a = t[r];
                    if ("function" != typeof a) throw new $e(s);
                    if (o && !l && "wrapper" == gi(a)) var l = new sr([], !0);
                  }
                  for (r = l ? r : n; ++r < n; ) {
                    var u = gi((a = t[r])),
                      c = "wrapper" == u ? bi(a) : i;
                    l =
                      c &&
                      Ni(c[0]) &&
                      c[1] == (w | v | g | C) &&
                      !c[4].length &&
                      1 == c[9]
                        ? l[gi(c[0])].apply(l, c[3])
                        : 1 == a.length && Ni(a)
                        ? l[u]()
                        : l.thru(a);
                  }
                  return function () {
                    var e = arguments,
                      r = e[0];
                    if (l && 1 == e.length && ts(r)) return l.plant(r).value();
                    for (var o = 0, i = n ? t[o].apply(this, e) : r; ++o < n; )
                      i = t[o].call(this, i);
                    return i;
                  };
                });
              }
              function Xo(e, t, n, o, a, s, l, u, c, p) {
                var h = t & w,
                  f = t & d,
                  _ = t & y,
                  g = t & (v | b),
                  m = t & x,
                  C = _ ? i : $o(e);
                return function d() {
                  for (var y = arguments.length, v = r(y), b = y; b--; )
                    v[b] = arguments[b];
                  if (g)
                    var w = mi(d),
                      x = (function (e, t) {
                        for (var n = e.length, r = 0; n--; ) e[n] === t && ++r;
                        return r;
                      })(v, w);
                  if (
                    (o && (v = Fo(v, o, a, g)),
                    s && (v = Lo(v, s, l, g)),
                    (y -= x),
                    g && y < p)
                  ) {
                    var k = vn(v, w);
                    return ai(e, t, Xo, d.placeholder, n, v, k, u, c, p - y);
                  }
                  var S = f ? n : this,
                    E = _ ? S[e] : e;
                  return (
                    (y = v.length),
                    u
                      ? (v = (function (e, t) {
                          for (
                            var n = e.length, r = Bn(t.length, n), o = Ho(e);
                            r--;

                          ) {
                            var a = t[r];
                            e[r] = Pi(a, n) ? o[a] : i;
                          }
                          return e;
                        })(v, u))
                      : m && y > 1 && v.reverse(),
                    h && c < y && (v.length = c),
                    this &&
                      this !== xt &&
                      this instanceof d &&
                      (E = C || $o(E)),
                    E.apply(S, v)
                  );
                };
              }
              function ei(e, t) {
                return function (n, r) {
                  return (function (e, t, n, r) {
                    return (
                      Dr(e, function (e, o, i) {
                        t(r, n(e), o, i);
                      }),
                      r
                    );
                  })(n, e, t(r), {});
                };
              }
              function ti(e, t) {
                return function (n, r) {
                  var o;
                  if (n === i && r === i) return t;
                  if ((n !== i && (o = n), r !== i)) {
                    if (o === i) return r;
                    "string" == typeof n || "string" == typeof r
                      ? ((n = Co(n)), (r = Co(r)))
                      : ((n = wo(n)), (r = wo(r))),
                      (o = e(n, r));
                  }
                  return o;
                };
              }
              function ni(e) {
                return yi(function (t) {
                  return (
                    (t = Ht(t, an(wi()))),
                    po(function (n) {
                      var r = this;
                      return e(t, function (e) {
                        return Rt(e, r, n);
                      });
                    })
                  );
                });
              }
              function ri(e, t) {
                var n = (t = t === i ? " " : Co(t)).length;
                if (n < 2) return n ? co(t, e) : t;
                var r = co(t, An(e / wn(t)));
                return dn(t) ? No(Cn(r), 0, e).join("") : r.slice(0, e);
              }
              function oi(e) {
                return function (t, n, o) {
                  return (
                    o && "number" != typeof o && Oi(t, n, o) && (n = o = i),
                    (t = ks(t)),
                    n === i ? ((n = t), (t = 0)) : (n = ks(n)),
                    (function (e, t, n, o) {
                      for (
                        var i = -1, a = Dn(An((t - e) / (n || 1)), 0), s = r(a);
                        a--;

                      )
                        (s[o ? a : ++i] = e), (e += n);
                      return s;
                    })(t, n, (o = o === i ? (t < n ? 1 : -1) : ks(o)), e)
                  );
                };
              }
              function ii(e) {
                return function (t, n) {
                  return (
                    ("string" == typeof t && "string" == typeof n) ||
                      ((t = js(t)), (n = js(n))),
                    e(t, n)
                  );
                };
              }
              function ai(e, t, n, r, o, a, s, l, u, c) {
                var p = t & v;
                (t |= p ? g : m), (t &= ~(p ? m : g)) & _ || (t &= ~(d | y));
                var h = [
                    e,
                    t,
                    o,
                    p ? a : i,
                    p ? s : i,
                    p ? i : a,
                    p ? i : s,
                    l,
                    u,
                    c,
                  ],
                  f = n.apply(i, h);
                return Ni(e) && Li(f, h), (f.placeholder = r), Wi(f, e, t);
              }
              function si(e) {
                var t = qe[e];
                return function (e, n) {
                  if (((e = js(e)), (n = null == n ? 0 : Bn(Ss(n), 292)))) {
                    var r = (As(e) + "e").split("e");
                    return +(
                      (r = (As(t(r[0] + "e" + (+r[1] + n))) + "e").split(
                        "e"
                      ))[0] +
                      "e" +
                      (+r[1] - n)
                    );
                  }
                  return t(e);
                };
              }
              var li =
                Gn && 1 / gn(new Gn([, -0]))[1] == E
                  ? function (e) {
                      return new Gn(e);
                    }
                  : gl;
              function ui(e) {
                return function (t) {
                  var n = ji(t);
                  return n == U
                    ? yn(t)
                    : n == K
                    ? mn(t)
                    : (function (e, t) {
                        return Ht(t, function (t) {
                          return [t, e[t]];
                        });
                      })(t, e(t));
                };
              }
              function ci(e, t, n, o, a, u, c, p) {
                var h = t & y;
                if (!h && "function" != typeof e) throw new $e(s);
                var f = o ? o.length : 0;
                if (
                  (f || ((t &= ~(g | m)), (o = a = i)),
                  (c = c === i ? c : Dn(Ss(c), 0)),
                  (p = p === i ? p : Ss(p)),
                  (f -= a ? a.length : 0),
                  t & m)
                ) {
                  var x = o,
                    k = a;
                  o = a = i;
                }
                var S = h ? i : bi(e),
                  E = [e, t, n, o, a, x, k, u, c, p];
                if (
                  (S &&
                    (function (e, t) {
                      var n = e[1],
                        r = t[1],
                        o = n | r;
                      if (
                        !(
                          o < (d | y | w) ||
                          (r == w && n == v) ||
                          (r == w && n == C && e[7].length <= t[8]) ||
                          (r == (w | C) && t[7].length <= t[8] && n == v)
                        )
                      )
                        return e;
                      r & d && ((e[2] = t[2]), (o |= n & d ? 0 : _));
                      var i = t[3];
                      if (i) {
                        var a = e[3];
                        (e[3] = a ? Fo(a, i, t[4]) : i),
                          (e[4] = a ? vn(e[3], l) : t[4]);
                      }
                      (i = t[5]) &&
                        ((e[5] = (a = e[5]) ? Lo(a, i, t[6]) : i),
                        (e[6] = a ? vn(e[5], l) : t[6])),
                        (i = t[7]) && (e[7] = i),
                        r & w && (e[8] = null == e[8] ? t[8] : Bn(e[8], t[8])),
                        null == e[9] && (e[9] = t[9]),
                        (e[0] = t[0]),
                        (e[1] = o);
                    })(E, S),
                  (e = E[0]),
                  (t = E[1]),
                  (n = E[2]),
                  (o = E[3]),
                  (a = E[4]),
                  !(p = E[9] =
                    E[9] === i ? (h ? 0 : e.length) : Dn(E[9] - f, 0)) &&
                    t & (v | b) &&
                    (t &= ~(v | b)),
                  t && t != d)
                )
                  j =
                    t == v || t == b
                      ? (function (e, t, n) {
                          var o = $o(e);
                          return function a() {
                            for (
                              var s = arguments.length,
                                l = r(s),
                                u = s,
                                c = mi(a);
                              u--;

                            )
                              l[u] = arguments[u];
                            var p =
                              s < 3 && l[0] !== c && l[s - 1] !== c
                                ? []
                                : vn(l, c);
                            return (s -= p.length) < n
                              ? ai(
                                  e,
                                  t,
                                  Xo,
                                  a.placeholder,
                                  i,
                                  l,
                                  p,
                                  i,
                                  i,
                                  n - s
                                )
                              : Rt(
                                  this && this !== xt && this instanceof a
                                    ? o
                                    : e,
                                  this,
                                  l
                                );
                          };
                        })(e, t, p)
                      : (t != g && t != (d | g)) || a.length
                      ? Xo.apply(i, E)
                      : (function (e, t, n, o) {
                          var i = t & d,
                            a = $o(e);
                          return function t() {
                            for (
                              var s = -1,
                                l = arguments.length,
                                u = -1,
                                c = o.length,
                                p = r(c + l),
                                h =
                                  this && this !== xt && this instanceof t
                                    ? a
                                    : e;
                              ++u < c;

                            )
                              p[u] = o[u];
                            for (; l--; ) p[u++] = arguments[++s];
                            return Rt(h, i ? n : this, p);
                          };
                        })(e, t, n, o);
                else
                  var j = (function (e, t, n) {
                    var r = t & d,
                      o = $o(e);
                    return function t() {
                      return (
                        this && this !== xt && this instanceof t ? o : e
                      ).apply(r ? n : this, arguments);
                    };
                  })(e, t, n);
                return Wi((S ? fo : Li)(j, E), e, t);
              }
              function pi(e, t, n, r) {
                return e === i || (Ja(e, Ye[n]) && !tt.call(r, n)) ? t : e;
              }
              function hi(e, t, n, r, o, a) {
                return (
                  ps(e) &&
                    ps(t) &&
                    (a.set(t, e), ro(e, t, i, hi, a), a.delete(t)),
                  e
                );
              }
              function fi(e) {
                return ys(e) ? i : e;
              }
              function di(e, t, n, r, o, a) {
                var s = n & h,
                  l = e.length,
                  u = t.length;
                if (l != u && !(s && u > l)) return !1;
                var c = a.get(e);
                if (c && a.get(t)) return c == t;
                var p = -1,
                  d = !0,
                  y = n & f ? new hr() : i;
                for (a.set(e, t), a.set(t, e); ++p < l; ) {
                  var _ = e[p],
                    v = t[p];
                  if (r) var b = s ? r(v, _, p, t, e, a) : r(_, v, p, e, t, a);
                  if (b !== i) {
                    if (b) continue;
                    d = !1;
                    break;
                  }
                  if (y) {
                    if (
                      !qt(t, function (e, t) {
                        if (!ln(y, t) && (_ === e || o(_, e, n, r, a)))
                          return y.push(t);
                      })
                    ) {
                      d = !1;
                      break;
                    }
                  } else if (_ !== v && !o(_, v, n, r, a)) {
                    d = !1;
                    break;
                  }
                }
                return a.delete(e), a.delete(t), d;
              }
              function yi(e) {
                return Ui(zi(e, i, na), e + "");
              }
              function _i(e) {
                return Fr(e, Hs, Si);
              }
              function vi(e) {
                return Fr(e, Us, Ei);
              }
              var bi = Qn
                ? function (e) {
                    return Qn.get(e);
                  }
                : gl;
              function gi(e) {
                for (
                  var t = e.name + "",
                    n = Kn[t],
                    r = tt.call(Kn, t) ? n.length : 0;
                  r--;

                ) {
                  var o = n[r],
                    i = o.func;
                  if (null == i || i == e) return o.name;
                }
                return t;
              }
              function mi(e) {
                return (tt.call(or, "placeholder") ? or : e).placeholder;
              }
              function wi() {
                var e = or.iteratee || yl;
                return (
                  (e = e === yl ? Jr : e),
                  arguments.length ? e(arguments[0], arguments[1]) : e
                );
              }
              function Ci(e, t) {
                var n,
                  r,
                  o = e.__data__;
                return (
                  "string" == (r = typeof (n = t)) ||
                  "number" == r ||
                  "symbol" == r ||
                  "boolean" == r
                    ? "__proto__" !== n
                    : null === n
                )
                  ? o["string" == typeof t ? "string" : "hash"]
                  : o.map;
              }
              function xi(e) {
                for (var t = Hs(e), n = t.length; n--; ) {
                  var r = t[n],
                    o = e[r];
                  t[n] = [r, o, Bi(o)];
                }
                return t;
              }
              function ki(e, t) {
                var n = (function (e, t) {
                  return null == e ? i : e[t];
                })(e, t);
                return $r(n) ? n : i;
              }
              var Si = Pn
                  ? function (e) {
                      return null == e
                        ? []
                        : ((e = Ze(e)),
                          zt(Pn(e), function (t) {
                            return St.call(e, t);
                          }));
                    }
                  : El,
                Ei = Pn
                  ? function (e) {
                      for (var t = []; e; ) Ut(t, Si(e)), (e = Ct(e));
                      return t;
                    }
                  : El,
                ji = Lr;
              function Ti(e, t, n) {
                for (var r = -1, o = (t = Oo(t, e)).length, i = !1; ++r < o; ) {
                  var a = Qi(t[r]);
                  if (!(i = null != e && n(e, a))) break;
                  e = e[a];
                }
                return i || ++r != o
                  ? i
                  : !!(o = null == e ? 0 : e.length) &&
                      cs(o) &&
                      Pi(a, o) &&
                      (ts(e) || es(e));
              }
              function Ai(e) {
                return "function" != typeof e.constructor || Di(e)
                  ? {}
                  : ir(Ct(e));
              }
              function Ii(e) {
                return ts(e) || es(e) || !!(Tt && e && e[Tt]);
              }
              function Pi(e, t) {
                var n = typeof e;
                return (
                  !!(t = null == t ? j : t) &&
                  ("number" == n || ("symbol" != n && Fe.test(e))) &&
                  e > -1 &&
                  e % 1 == 0 &&
                  e < t
                );
              }
              function Oi(e, t, n) {
                if (!ps(n)) return !1;
                var r = typeof t;
                return (
                  !!("number" == r
                    ? rs(n) && Pi(t, n.length)
                    : "string" == r && t in n) && Ja(n[t], e)
                );
              }
              function Mi(e, t) {
                if (ts(e)) return !1;
                var n = typeof e;
                return (
                  !(
                    "number" != n &&
                    "symbol" != n &&
                    "boolean" != n &&
                    null != e &&
                    !gs(e)
                  ) ||
                  Ce.test(e) ||
                  !we.test(e) ||
                  (null != t && e in Ze(t))
                );
              }
              function Ni(e) {
                var t = gi(e),
                  n = or[t];
                if ("function" != typeof n || !(t in lr.prototype)) return !1;
                if (e === n) return !0;
                var r = bi(n);
                return !!r && e === r[0];
              }
              ((Hn && ji(new Hn(new ArrayBuffer(1))) != te) ||
                (Un && ji(new Un()) != U) ||
                (Wn && "[object Promise]" != ji(Wn.resolve())) ||
                (Gn && ji(new Gn()) != K) ||
                (qn && ji(new qn()) != X)) &&
                (ji = function (e) {
                  var t = Lr(e),
                    n = t == q ? e.constructor : i,
                    r = n ? Ki(n) : "";
                  if (r)
                    switch (r) {
                      case $n:
                        return te;
                      case Jn:
                        return U;
                      case Yn:
                        return "[object Promise]";
                      case Xn:
                        return K;
                      case er:
                        return X;
                    }
                  return t;
                });
              var Ri = Xe ? ls : jl;
              function Di(e) {
                var t = e && e.constructor;
                return e === (("function" == typeof t && t.prototype) || Ye);
              }
              function Bi(e) {
                return e == e && !ps(e);
              }
              function Vi(e, t) {
                return function (n) {
                  return null != n && n[e] === t && (t !== i || e in Ze(n));
                };
              }
              function zi(e, t, n) {
                return (
                  (t = Dn(t === i ? e.length - 1 : t, 0)),
                  function () {
                    for (
                      var o = arguments,
                        i = -1,
                        a = Dn(o.length - t, 0),
                        s = r(a);
                      ++i < a;

                    )
                      s[i] = o[t + i];
                    i = -1;
                    for (var l = r(t + 1); ++i < t; ) l[i] = o[i];
                    return (l[t] = n(s)), Rt(e, this, l);
                  }
                );
              }
              function Fi(e, t) {
                return t.length < 2 ? e : zr(e, _o(t, 0, -1));
              }
              var Li = Gi(fo),
                Hi =
                  Tn ||
                  function (e, t) {
                    return xt.setTimeout(e, t);
                  },
                Ui = Gi(yo);
              function Wi(e, t, n) {
                var r = t + "";
                return Ui(
                  e,
                  (function (e, t) {
                    var n = t.length;
                    if (!n) return e;
                    var r = n - 1;
                    return (
                      (t[r] = (n > 1 ? "& " : "") + t[r]),
                      (t = t.join(n > 2 ? ", " : " ")),
                      e.replace(Ae, "{\n/* [wrapped with " + t + "] */\n")
                    );
                  })(
                    r,
                    (function (e, t) {
                      return (
                        Bt(M, function (n) {
                          var r = "_." + n[0];
                          t & n[1] && !Ft(e, r) && e.push(r);
                        }),
                        e.sort()
                      );
                    })(
                      (function (e) {
                        var t = e.match(Ie);
                        return t ? t[1].split(Pe) : [];
                      })(r),
                      n
                    )
                  )
                );
              }
              function Gi(e) {
                var t = 0,
                  n = 0;
                return function () {
                  var r = Vn(),
                    o = S - (r - n);
                  if (((n = r), o > 0)) {
                    if (++t >= k) return arguments[0];
                  } else t = 0;
                  return e.apply(i, arguments);
                };
              }
              function qi(e, t) {
                var n = -1,
                  r = e.length,
                  o = r - 1;
                for (t = t === i ? r : t; ++n < t; ) {
                  var a = uo(n, o),
                    s = e[a];
                  (e[a] = e[n]), (e[n] = s);
                }
                return (e.length = t), e;
              }
              var Zi = (function (e) {
                var t = Ga(
                    function (e) {
                      var t = [];
                      return (
                        46 === e.charCodeAt(0) && t.push(""),
                        e.replace(xe, function (e, n, r, o) {
                          t.push(r ? o.replace(Me, "$1") : n || e);
                        }),
                        t
                      );
                    },
                    function (e) {
                      return 500 === n.size && n.clear(), e;
                    }
                  ),
                  n = t.cache;
                return t;
              })();
              function Qi(e) {
                if ("string" == typeof e || gs(e)) return e;
                var t = e + "";
                return "0" == t && 1 / e == -E ? "-0" : t;
              }
              function Ki(e) {
                if (null != e) {
                  try {
                    return et.call(e);
                  } catch (e) {}
                  try {
                    return e + "";
                  } catch (e) {}
                }
                return "";
              }
              function $i(e) {
                if (e instanceof lr) return e.clone();
                var t = new sr(e.__wrapped__, e.__chain__);
                return (
                  (t.__actions__ = Ho(e.__actions__)),
                  (t.__index__ = e.__index__),
                  (t.__values__ = e.__values__),
                  t
                );
              }
              var Ji = po(function (e, t) {
                  return os(e) ? jr(e, Mr(t, 1, os, !0)) : [];
                }),
                Yi = po(function (e, t) {
                  var n = sa(t);
                  return (
                    os(n) && (n = i),
                    os(e) ? jr(e, Mr(t, 1, os, !0), wi(n, 2)) : []
                  );
                }),
                Xi = po(function (e, t) {
                  var n = sa(t);
                  return (
                    os(n) && (n = i), os(e) ? jr(e, Mr(t, 1, os, !0), i, n) : []
                  );
                });
              function ea(e, t, n) {
                var r = null == e ? 0 : e.length;
                if (!r) return -1;
                var o = null == n ? 0 : Ss(n);
                return o < 0 && (o = Dn(r + o, 0)), Kt(e, wi(t, 3), o);
              }
              function ta(e, t, n) {
                var r = null == e ? 0 : e.length;
                if (!r) return -1;
                var o = r - 1;
                return (
                  n !== i &&
                    ((o = Ss(n)), (o = n < 0 ? Dn(r + o, 0) : Bn(o, r - 1))),
                  Kt(e, wi(t, 3), o, !0)
                );
              }
              function na(e) {
                return null != e && e.length ? Mr(e, 1) : [];
              }
              function ra(e) {
                return e && e.length ? e[0] : i;
              }
              var oa = po(function (e) {
                  var t = Ht(e, Io);
                  return t.length && t[0] === e[0] ? Gr(t) : [];
                }),
                ia = po(function (e) {
                  var t = sa(e),
                    n = Ht(e, Io);
                  return (
                    t === sa(n) ? (t = i) : n.pop(),
                    n.length && n[0] === e[0] ? Gr(n, wi(t, 2)) : []
                  );
                }),
                aa = po(function (e) {
                  var t = sa(e),
                    n = Ht(e, Io);
                  return (
                    (t = "function" == typeof t ? t : i) && n.pop(),
                    n.length && n[0] === e[0] ? Gr(n, i, t) : []
                  );
                });
              function sa(e) {
                var t = null == e ? 0 : e.length;
                return t ? e[t - 1] : i;
              }
              var la = po(ua);
              function ua(e, t) {
                return e && e.length && t && t.length ? so(e, t) : e;
              }
              var ca = yi(function (e, t) {
                var n = null == e ? 0 : e.length,
                  r = Cr(e, t);
                return (
                  lo(
                    e,
                    Ht(t, function (e) {
                      return Pi(e, n) ? +e : e;
                    }).sort(zo)
                  ),
                  r
                );
              });
              function pa(e) {
                return null == e ? e : Ln.call(e);
              }
              var ha = po(function (e) {
                  return xo(Mr(e, 1, os, !0));
                }),
                fa = po(function (e) {
                  var t = sa(e);
                  return os(t) && (t = i), xo(Mr(e, 1, os, !0), wi(t, 2));
                }),
                da = po(function (e) {
                  var t = sa(e);
                  return (
                    (t = "function" == typeof t ? t : i),
                    xo(Mr(e, 1, os, !0), i, t)
                  );
                });
              function ya(e) {
                if (!e || !e.length) return [];
                var t = 0;
                return (
                  (e = zt(e, function (e) {
                    if (os(e)) return (t = Dn(e.length, t)), !0;
                  })),
                  on(t, function (t) {
                    return Ht(e, en(t));
                  })
                );
              }
              function _a(e, t) {
                if (!e || !e.length) return [];
                var n = ya(e);
                return null == t
                  ? n
                  : Ht(n, function (e) {
                      return Rt(t, i, e);
                    });
              }
              var va = po(function (e, t) {
                  return os(e) ? jr(e, t) : [];
                }),
                ba = po(function (e) {
                  return To(zt(e, os));
                }),
                ga = po(function (e) {
                  var t = sa(e);
                  return os(t) && (t = i), To(zt(e, os), wi(t, 2));
                }),
                ma = po(function (e) {
                  var t = sa(e);
                  return (
                    (t = "function" == typeof t ? t : i), To(zt(e, os), i, t)
                  );
                }),
                wa = po(ya),
                Ca = po(function (e) {
                  var t = e.length,
                    n = t > 1 ? e[t - 1] : i;
                  return _a(e, (n = "function" == typeof n ? (e.pop(), n) : i));
                });
              function xa(e) {
                var t = or(e);
                return (t.__chain__ = !0), t;
              }
              function ka(e, t) {
                return t(e);
              }
              var Sa = yi(function (e) {
                  var t = e.length,
                    n = t ? e[0] : 0,
                    r = this.__wrapped__,
                    o = function (t) {
                      return Cr(t, e);
                    };
                  return !(t > 1 || this.__actions__.length) &&
                    r instanceof lr &&
                    Pi(n)
                    ? ((r = r.slice(n, +n + (t ? 1 : 0))).__actions__.push({
                        func: ka,
                        args: [o],
                        thisArg: i,
                      }),
                      new sr(r, this.__chain__).thru(function (e) {
                        return t && !e.length && e.push(i), e;
                      }))
                    : this.thru(o);
                }),
                Ea = Wo(function (e, t, n) {
                  tt.call(e, n) ? ++e[n] : wr(e, n, 1);
                }),
                ja = Jo(ea),
                Ta = Jo(ta);
              function Aa(e, t) {
                return (ts(e) ? Bt : Tr)(e, wi(t, 3));
              }
              function Ia(e, t) {
                return (
                  ts(e)
                    ? function (e, t) {
                        for (
                          var n = null == e ? 0 : e.length;
                          n-- && !1 !== t(e[n], n, e);

                        );
                        return e;
                      }
                    : Ar
                )(e, wi(t, 3));
              }
              var Pa = Wo(function (e, t, n) {
                  tt.call(e, n) ? e[n].push(t) : wr(e, n, [t]);
                }),
                Oa = po(function (e, t, n) {
                  var o = -1,
                    i = "function" == typeof t,
                    a = rs(e) ? r(e.length) : [];
                  return (
                    Tr(e, function (e) {
                      a[++o] = i ? Rt(t, e, n) : qr(e, t, n);
                    }),
                    a
                  );
                }),
                Ma = Wo(function (e, t, n) {
                  wr(e, n, t);
                });
              function Na(e, t) {
                return (ts(e) ? Ht : eo)(e, wi(t, 3));
              }
              var Ra = Wo(
                  function (e, t, n) {
                    e[n ? 0 : 1].push(t);
                  },
                  function () {
                    return [[], []];
                  }
                ),
                Da = po(function (e, t) {
                  if (null == e) return [];
                  var n = t.length;
                  return (
                    n > 1 && Oi(e, t[0], t[1])
                      ? (t = [])
                      : n > 2 && Oi(t[0], t[1], t[2]) && (t = [t[0]]),
                    io(e, Mr(t, 1), [])
                  );
                }),
                Ba =
                  jn ||
                  function () {
                    return xt.Date.now();
                  };
              function Va(e, t, n) {
                return (
                  (t = n ? i : t),
                  ci(e, w, i, i, i, i, (t = e && null == t ? e.length : t))
                );
              }
              function za(e, t) {
                var n;
                if ("function" != typeof t) throw new $e(s);
                return (
                  (e = Ss(e)),
                  function () {
                    return (
                      --e > 0 && (n = t.apply(this, arguments)),
                      e <= 1 && (t = i),
                      n
                    );
                  }
                );
              }
              var Fa = po(function (e, t, n) {
                  var r = d;
                  if (n.length) {
                    var o = vn(n, mi(Fa));
                    r |= g;
                  }
                  return ci(e, r, t, n, o);
                }),
                La = po(function (e, t, n) {
                  var r = d | y;
                  if (n.length) {
                    var o = vn(n, mi(La));
                    r |= g;
                  }
                  return ci(t, r, e, n, o);
                });
              function Ha(e, t, n) {
                var r,
                  o,
                  a,
                  l,
                  u,
                  c,
                  p = 0,
                  h = !1,
                  f = !1,
                  d = !0;
                if ("function" != typeof e) throw new $e(s);
                function y(t) {
                  var n = r,
                    a = o;
                  return (r = o = i), (p = t), (l = e.apply(a, n));
                }
                function _(e) {
                  var n = e - c;
                  return c === i || n >= t || n < 0 || (f && e - p >= a);
                }
                function v() {
                  var e = Ba();
                  if (_(e)) return b(e);
                  u = Hi(
                    v,
                    (function (e) {
                      var n = t - (e - c);
                      return f ? Bn(n, a - (e - p)) : n;
                    })(e)
                  );
                }
                function b(e) {
                  return (u = i), d && r ? y(e) : ((r = o = i), l);
                }
                function g() {
                  var e = Ba(),
                    n = _(e);
                  if (((r = arguments), (o = this), (c = e), n)) {
                    if (u === i)
                      return (function (e) {
                        return (p = e), (u = Hi(v, t)), h ? y(e) : l;
                      })(c);
                    if (f) return (u = Hi(v, t)), y(c);
                  }
                  return u === i && (u = Hi(v, t)), l;
                }
                return (
                  (t = js(t) || 0),
                  ps(n) &&
                    ((h = !!n.leading),
                    (a = (f = "maxWait" in n) ? Dn(js(n.maxWait) || 0, t) : a),
                    (d = "trailing" in n ? !!n.trailing : d)),
                  (g.cancel = function () {
                    u !== i && Ro(u), (p = 0), (r = c = o = u = i);
                  }),
                  (g.flush = function () {
                    return u === i ? l : b(Ba());
                  }),
                  g
                );
              }
              var Ua = po(function (e, t) {
                  return Er(e, 1, t);
                }),
                Wa = po(function (e, t, n) {
                  return Er(e, js(t) || 0, n);
                });
              function Ga(e, t) {
                if (
                  "function" != typeof e ||
                  (null != t && "function" != typeof t)
                )
                  throw new $e(s);
                var n = function () {
                  var r = arguments,
                    o = t ? t.apply(this, r) : r[0],
                    i = n.cache;
                  if (i.has(o)) return i.get(o);
                  var a = e.apply(this, r);
                  return (n.cache = i.set(o, a) || i), a;
                };
                return (n.cache = new (Ga.Cache || pr)()), n;
              }
              function qa(e) {
                if ("function" != typeof e) throw new $e(s);
                return function () {
                  var t = arguments;
                  switch (t.length) {
                    case 0:
                      return !e.call(this);
                    case 1:
                      return !e.call(this, t[0]);
                    case 2:
                      return !e.call(this, t[0], t[1]);
                    case 3:
                      return !e.call(this, t[0], t[1], t[2]);
                  }
                  return !e.apply(this, t);
                };
              }
              Ga.Cache = pr;
              var Za = Mo(function (e, t) {
                  var n = (t =
                    1 == t.length && ts(t[0])
                      ? Ht(t[0], an(wi()))
                      : Ht(Mr(t, 1), an(wi()))).length;
                  return po(function (r) {
                    for (var o = -1, i = Bn(r.length, n); ++o < i; )
                      r[o] = t[o].call(this, r[o]);
                    return Rt(e, this, r);
                  });
                }),
                Qa = po(function (e, t) {
                  var n = vn(t, mi(Qa));
                  return ci(e, g, i, t, n);
                }),
                Ka = po(function (e, t) {
                  var n = vn(t, mi(Ka));
                  return ci(e, m, i, t, n);
                }),
                $a = yi(function (e, t) {
                  return ci(e, C, i, i, i, t);
                });
              function Ja(e, t) {
                return e === t || (e != e && t != t);
              }
              var Ya = ii(Hr),
                Xa = ii(function (e, t) {
                  return e >= t;
                }),
                es = Zr(
                  (function () {
                    return arguments;
                  })()
                )
                  ? Zr
                  : function (e) {
                      return (
                        hs(e) && tt.call(e, "callee") && !St.call(e, "callee")
                      );
                    },
                ts = r.isArray,
                ns = At
                  ? an(At)
                  : function (e) {
                      return hs(e) && Lr(e) == ee;
                    };
              function rs(e) {
                return null != e && cs(e.length) && !ls(e);
              }
              function os(e) {
                return hs(e) && rs(e);
              }
              var is = On || jl,
                as = It
                  ? an(It)
                  : function (e) {
                      return hs(e) && Lr(e) == V;
                    };
              function ss(e) {
                if (!hs(e)) return !1;
                var t = Lr(e);
                return (
                  t == F ||
                  t == z ||
                  ("string" == typeof e.message &&
                    "string" == typeof e.name &&
                    !ys(e))
                );
              }
              function ls(e) {
                if (!ps(e)) return !1;
                var t = Lr(e);
                return t == L || t == H || t == D || t == Z;
              }
              function us(e) {
                return "number" == typeof e && e == Ss(e);
              }
              function cs(e) {
                return "number" == typeof e && e > -1 && e % 1 == 0 && e <= j;
              }
              function ps(e) {
                var t = typeof e;
                return null != e && ("object" == t || "function" == t);
              }
              function hs(e) {
                return null != e && "object" == typeof e;
              }
              var fs = Pt
                ? an(Pt)
                : function (e) {
                    return hs(e) && ji(e) == U;
                  };
              function ds(e) {
                return "number" == typeof e || (hs(e) && Lr(e) == W);
              }
              function ys(e) {
                if (!hs(e) || Lr(e) != q) return !1;
                var t = Ct(e);
                if (null === t) return !0;
                var n = tt.call(t, "constructor") && t.constructor;
                return (
                  "function" == typeof n && n instanceof n && et.call(n) == it
                );
              }
              var _s = Ot
                  ? an(Ot)
                  : function (e) {
                      return hs(e) && Lr(e) == Q;
                    },
                vs = Mt
                  ? an(Mt)
                  : function (e) {
                      return hs(e) && ji(e) == K;
                    };
              function bs(e) {
                return "string" == typeof e || (!ts(e) && hs(e) && Lr(e) == $);
              }
              function gs(e) {
                return "symbol" == typeof e || (hs(e) && Lr(e) == J);
              }
              var ms = Nt
                  ? an(Nt)
                  : function (e) {
                      return hs(e) && cs(e.length) && !!_t[Lr(e)];
                    },
                ws = ii(Xr),
                Cs = ii(function (e, t) {
                  return e <= t;
                });
              function xs(e) {
                if (!e) return [];
                if (rs(e)) return bs(e) ? Cn(e) : Ho(e);
                if (Zt && e[Zt])
                  return (function (e) {
                    for (var t, n = []; !(t = e.next()).done; ) n.push(t.value);
                    return n;
                  })(e[Zt]());
                var t = ji(e);
                return (t == U ? yn : t == K ? gn : Js)(e);
              }
              function ks(e) {
                return e
                  ? (e = js(e)) === E || e === -E
                    ? (e < 0 ? -1 : 1) * T
                    : e == e
                    ? e
                    : 0
                  : 0 === e
                  ? e
                  : 0;
              }
              function Ss(e) {
                var t = ks(e),
                  n = t % 1;
                return t == t ? (n ? t - n : t) : 0;
              }
              function Es(e) {
                return e ? xr(Ss(e), 0, I) : 0;
              }
              function js(e) {
                if ("number" == typeof e) return e;
                if (gs(e)) return A;
                if (ps(e)) {
                  var t = "function" == typeof e.valueOf ? e.valueOf() : e;
                  e = ps(t) ? t + "" : t;
                }
                if ("string" != typeof e) return 0 === e ? e : +e;
                e = e.replace(Ee, "");
                var n = Be.test(e);
                return n || ze.test(e)
                  ? mt(e.slice(2), n ? 2 : 8)
                  : De.test(e)
                  ? A
                  : +e;
              }
              function Ts(e) {
                return Uo(e, Us(e));
              }
              function As(e) {
                return null == e ? "" : Co(e);
              }
              var Is = Go(function (e, t) {
                  if (Di(t) || rs(t)) Uo(t, Hs(t), e);
                  else for (var n in t) tt.call(t, n) && vr(e, n, t[n]);
                }),
                Ps = Go(function (e, t) {
                  Uo(t, Us(t), e);
                }),
                Os = Go(function (e, t, n, r) {
                  Uo(t, Us(t), e, r);
                }),
                Ms = Go(function (e, t, n, r) {
                  Uo(t, Hs(t), e, r);
                }),
                Ns = yi(Cr),
                Rs = po(function (e, t) {
                  e = Ze(e);
                  var n = -1,
                    r = t.length,
                    o = r > 2 ? t[2] : i;
                  for (o && Oi(t[0], t[1], o) && (r = 1); ++n < r; )
                    for (
                      var a = t[n], s = Us(a), l = -1, u = s.length;
                      ++l < u;

                    ) {
                      var c = s[l],
                        p = e[c];
                      (p === i || (Ja(p, Ye[c]) && !tt.call(e, c))) &&
                        (e[c] = a[c]);
                    }
                  return e;
                }),
                Ds = po(function (e) {
                  return e.push(i, hi), Rt(Gs, i, e);
                });
              function Bs(e, t, n) {
                var r = null == e ? i : zr(e, t);
                return r === i ? n : r;
              }
              function Vs(e, t) {
                return null != e && Ti(e, t, Wr);
              }
              var zs = ei(function (e, t, n) {
                  null != t &&
                    "function" != typeof t.toString &&
                    (t = ot.call(t)),
                    (e[t] = n);
                }, pl(dl)),
                Fs = ei(function (e, t, n) {
                  null != t &&
                    "function" != typeof t.toString &&
                    (t = ot.call(t)),
                    tt.call(e, t) ? e[t].push(n) : (e[t] = [n]);
                }, wi),
                Ls = po(qr);
              function Hs(e) {
                return rs(e) ? dr(e) : Yr(e);
              }
              function Us(e) {
                return rs(e)
                  ? dr(e, !0)
                  : (function (e) {
                      if (!ps(e))
                        return (function (e) {
                          var t = [];
                          if (null != e) for (var n in Ze(e)) t.push(n);
                          return t;
                        })(e);
                      var t = Di(e),
                        n = [];
                      for (var r in e)
                        ("constructor" != r || (!t && tt.call(e, r))) &&
                          n.push(r);
                      return n;
                    })(e);
              }
              var Ws = Go(function (e, t, n) {
                  ro(e, t, n);
                }),
                Gs = Go(function (e, t, n, r) {
                  ro(e, t, n, r);
                }),
                qs = yi(function (e, t) {
                  var n = {};
                  if (null == e) return n;
                  var r = !1;
                  (t = Ht(t, function (t) {
                    return (t = Oo(t, e)), r || (r = t.length > 1), t;
                  })),
                    Uo(e, vi(e), n),
                    r && (n = kr(n, u | c | p, fi));
                  for (var o = t.length; o--; ) ko(n, t[o]);
                  return n;
                }),
                Zs = yi(function (e, t) {
                  return null == e
                    ? {}
                    : (function (e, t) {
                        return ao(e, t, function (t, n) {
                          return Vs(e, n);
                        });
                      })(e, t);
                });
              function Qs(e, t) {
                if (null == e) return {};
                var n = Ht(vi(e), function (e) {
                  return [e];
                });
                return (
                  (t = wi(t)),
                  ao(e, n, function (e, n) {
                    return t(e, n[0]);
                  })
                );
              }
              var Ks = ui(Hs),
                $s = ui(Us);
              function Js(e) {
                return null == e ? [] : sn(e, Hs(e));
              }
              var Ys = Ko(function (e, t, n) {
                return (t = t.toLowerCase()), e + (n ? Xs(t) : t);
              });
              function Xs(e) {
                return sl(As(e).toLowerCase());
              }
              function el(e) {
                return (e = As(e)) && e.replace(Le, pn).replace(ut, "");
              }
              var tl = Ko(function (e, t, n) {
                  return e + (n ? "-" : "") + t.toLowerCase();
                }),
                nl = Ko(function (e, t, n) {
                  return e + (n ? " " : "") + t.toLowerCase();
                }),
                rl = Qo("toLowerCase"),
                ol = Ko(function (e, t, n) {
                  return e + (n ? "_" : "") + t.toLowerCase();
                }),
                il = Ko(function (e, t, n) {
                  return e + (n ? " " : "") + sl(t);
                }),
                al = Ko(function (e, t, n) {
                  return e + (n ? " " : "") + t.toUpperCase();
                }),
                sl = Qo("toUpperCase");
              function ll(e, t, n) {
                return (
                  (e = As(e)),
                  (t = n ? i : t) === i
                    ? (function (e) {
                        return ft.test(e);
                      })(e)
                      ? (function (e) {
                          return e.match(pt) || [];
                        })(e)
                      : (function (e) {
                          return e.match(Oe) || [];
                        })(e)
                    : e.match(t) || []
                );
              }
              var ul = po(function (e, t) {
                  try {
                    return Rt(e, i, t);
                  } catch (e) {
                    return ss(e) ? e : new We(e);
                  }
                }),
                cl = yi(function (e, t) {
                  return (
                    Bt(t, function (t) {
                      (t = Qi(t)), wr(e, t, Fa(e[t], e));
                    }),
                    e
                  );
                });
              function pl(e) {
                return function () {
                  return e;
                };
              }
              var hl = Yo(),
                fl = Yo(!0);
              function dl(e) {
                return e;
              }
              function yl(e) {
                return Jr("function" == typeof e ? e : kr(e, u));
              }
              var _l = po(function (e, t) {
                  return function (n) {
                    return qr(n, e, t);
                  };
                }),
                vl = po(function (e, t) {
                  return function (n) {
                    return qr(e, n, t);
                  };
                });
              function bl(e, t, n) {
                var r = Hs(t),
                  o = Vr(t, r);
                null != n ||
                  (ps(t) && (o.length || !r.length)) ||
                  ((n = t), (t = e), (e = this), (o = Vr(t, Hs(t))));
                var i = !(ps(n) && "chain" in n && !n.chain),
                  a = ls(e);
                return (
                  Bt(o, function (n) {
                    var r = t[n];
                    (e[n] = r),
                      a &&
                        (e.prototype[n] = function () {
                          var t = this.__chain__;
                          if (i || t) {
                            var n = e(this.__wrapped__);
                            return (
                              (n.__actions__ = Ho(this.__actions__)).push({
                                func: r,
                                args: arguments,
                                thisArg: e,
                              }),
                              (n.__chain__ = t),
                              n
                            );
                          }
                          return r.apply(e, Ut([this.value()], arguments));
                        });
                  }),
                  e
                );
              }
              function gl() {}
              var ml = ni(Ht),
                wl = ni(Vt),
                Cl = ni(qt);
              function xl(e) {
                return Mi(e)
                  ? en(Qi(e))
                  : (function (e) {
                      return function (t) {
                        return zr(t, e);
                      };
                    })(e);
              }
              var kl = oi(),
                Sl = oi(!0);
              function El() {
                return [];
              }
              function jl() {
                return !1;
              }
              var Tl,
                Al = ti(function (e, t) {
                  return e + t;
                }, 0),
                Il = si("ceil"),
                Pl = ti(function (e, t) {
                  return e / t;
                }, 1),
                Ol = si("floor"),
                Ml = ti(function (e, t) {
                  return e * t;
                }, 1),
                Nl = si("round"),
                Rl = ti(function (e, t) {
                  return e - t;
                }, 0);
              return (
                (or.after = function (e, t) {
                  if ("function" != typeof t) throw new $e(s);
                  return (
                    (e = Ss(e)),
                    function () {
                      if (--e < 1) return t.apply(this, arguments);
                    }
                  );
                }),
                (or.ary = Va),
                (or.assign = Is),
                (or.assignIn = Ps),
                (or.assignInWith = Os),
                (or.assignWith = Ms),
                (or.at = Ns),
                (or.before = za),
                (or.bind = Fa),
                (or.bindAll = cl),
                (or.bindKey = La),
                (or.castArray = function () {
                  if (!arguments.length) return [];
                  var e = arguments[0];
                  return ts(e) ? e : [e];
                }),
                (or.chain = xa),
                (or.chunk = function (e, t, n) {
                  t = (n ? Oi(e, t, n) : t === i) ? 1 : Dn(Ss(t), 0);
                  var o = null == e ? 0 : e.length;
                  if (!o || t < 1) return [];
                  for (var a = 0, s = 0, l = r(An(o / t)); a < o; )
                    l[s++] = _o(e, a, (a += t));
                  return l;
                }),
                (or.compact = function (e) {
                  for (
                    var t = -1, n = null == e ? 0 : e.length, r = 0, o = [];
                    ++t < n;

                  ) {
                    var i = e[t];
                    i && (o[r++] = i);
                  }
                  return o;
                }),
                (or.concat = function () {
                  var e = arguments.length;
                  if (!e) return [];
                  for (var t = r(e - 1), n = arguments[0], o = e; o--; )
                    t[o - 1] = arguments[o];
                  return Ut(ts(n) ? Ho(n) : [n], Mr(t, 1));
                }),
                (or.cond = function (e) {
                  var t = null == e ? 0 : e.length,
                    n = wi();
                  return (
                    (e = t
                      ? Ht(e, function (e) {
                          if ("function" != typeof e[1]) throw new $e(s);
                          return [n(e[0]), e[1]];
                        })
                      : []),
                    po(function (n) {
                      for (var r = -1; ++r < t; ) {
                        var o = e[r];
                        if (Rt(o[0], this, n)) return Rt(o[1], this, n);
                      }
                    })
                  );
                }),
                (or.conforms = function (e) {
                  return (function (e) {
                    var t = Hs(e);
                    return function (n) {
                      return Sr(n, e, t);
                    };
                  })(kr(e, u));
                }),
                (or.constant = pl),
                (or.countBy = Ea),
                (or.create = function (e, t) {
                  var n = ir(e);
                  return null == t ? n : mr(n, t);
                }),
                (or.curry = function e(t, n, r) {
                  var o = ci(t, v, i, i, i, i, i, (n = r ? i : n));
                  return (o.placeholder = e.placeholder), o;
                }),
                (or.curryRight = function e(t, n, r) {
                  var o = ci(t, b, i, i, i, i, i, (n = r ? i : n));
                  return (o.placeholder = e.placeholder), o;
                }),
                (or.debounce = Ha),
                (or.defaults = Rs),
                (or.defaultsDeep = Ds),
                (or.defer = Ua),
                (or.delay = Wa),
                (or.difference = Ji),
                (or.differenceBy = Yi),
                (or.differenceWith = Xi),
                (or.drop = function (e, t, n) {
                  var r = null == e ? 0 : e.length;
                  return r
                    ? _o(e, (t = n || t === i ? 1 : Ss(t)) < 0 ? 0 : t, r)
                    : [];
                }),
                (or.dropRight = function (e, t, n) {
                  var r = null == e ? 0 : e.length;
                  return r
                    ? _o(
                        e,
                        0,
                        (t = r - (t = n || t === i ? 1 : Ss(t))) < 0 ? 0 : t
                      )
                    : [];
                }),
                (or.dropRightWhile = function (e, t) {
                  return e && e.length ? Eo(e, wi(t, 3), !0, !0) : [];
                }),
                (or.dropWhile = function (e, t) {
                  return e && e.length ? Eo(e, wi(t, 3), !0) : [];
                }),
                (or.fill = function (e, t, n, r) {
                  var o = null == e ? 0 : e.length;
                  return o
                    ? (n &&
                        "number" != typeof n &&
                        Oi(e, t, n) &&
                        ((n = 0), (r = o)),
                      (function (e, t, n, r) {
                        var o = e.length;
                        for (
                          (n = Ss(n)) < 0 && (n = -n > o ? 0 : o + n),
                            (r = r === i || r > o ? o : Ss(r)) < 0 && (r += o),
                            r = n > r ? 0 : Es(r);
                          n < r;

                        )
                          e[n++] = t;
                        return e;
                      })(e, t, n, r))
                    : [];
                }),
                (or.filter = function (e, t) {
                  return (ts(e) ? zt : Or)(e, wi(t, 3));
                }),
                (or.flatMap = function (e, t) {
                  return Mr(Na(e, t), 1);
                }),
                (or.flatMapDeep = function (e, t) {
                  return Mr(Na(e, t), E);
                }),
                (or.flatMapDepth = function (e, t, n) {
                  return (n = n === i ? 1 : Ss(n)), Mr(Na(e, t), n);
                }),
                (or.flatten = na),
                (or.flattenDeep = function (e) {
                  return null != e && e.length ? Mr(e, E) : [];
                }),
                (or.flattenDepth = function (e, t) {
                  return null != e && e.length
                    ? Mr(e, (t = t === i ? 1 : Ss(t)))
                    : [];
                }),
                (or.flip = function (e) {
                  return ci(e, x);
                }),
                (or.flow = hl),
                (or.flowRight = fl),
                (or.fromPairs = function (e) {
                  for (
                    var t = -1, n = null == e ? 0 : e.length, r = {};
                    ++t < n;

                  ) {
                    var o = e[t];
                    r[o[0]] = o[1];
                  }
                  return r;
                }),
                (or.functions = function (e) {
                  return null == e ? [] : Vr(e, Hs(e));
                }),
                (or.functionsIn = function (e) {
                  return null == e ? [] : Vr(e, Us(e));
                }),
                (or.groupBy = Pa),
                (or.initial = function (e) {
                  return null != e && e.length ? _o(e, 0, -1) : [];
                }),
                (or.intersection = oa),
                (or.intersectionBy = ia),
                (or.intersectionWith = aa),
                (or.invert = zs),
                (or.invertBy = Fs),
                (or.invokeMap = Oa),
                (or.iteratee = yl),
                (or.keyBy = Ma),
                (or.keys = Hs),
                (or.keysIn = Us),
                (or.map = Na),
                (or.mapKeys = function (e, t) {
                  var n = {};
                  return (
                    (t = wi(t, 3)),
                    Dr(e, function (e, r, o) {
                      wr(n, t(e, r, o), e);
                    }),
                    n
                  );
                }),
                (or.mapValues = function (e, t) {
                  var n = {};
                  return (
                    (t = wi(t, 3)),
                    Dr(e, function (e, r, o) {
                      wr(n, r, t(e, r, o));
                    }),
                    n
                  );
                }),
                (or.matches = function (e) {
                  return to(kr(e, u));
                }),
                (or.matchesProperty = function (e, t) {
                  return no(e, kr(t, u));
                }),
                (or.memoize = Ga),
                (or.merge = Ws),
                (or.mergeWith = Gs),
                (or.method = _l),
                (or.methodOf = vl),
                (or.mixin = bl),
                (or.negate = qa),
                (or.nthArg = function (e) {
                  return (
                    (e = Ss(e)),
                    po(function (t) {
                      return oo(t, e);
                    })
                  );
                }),
                (or.omit = qs),
                (or.omitBy = function (e, t) {
                  return Qs(e, qa(wi(t)));
                }),
                (or.once = function (e) {
                  return za(2, e);
                }),
                (or.orderBy = function (e, t, n, r) {
                  return null == e
                    ? []
                    : (ts(t) || (t = null == t ? [] : [t]),
                      ts((n = r ? i : n)) || (n = null == n ? [] : [n]),
                      io(e, t, n));
                }),
                (or.over = ml),
                (or.overArgs = Za),
                (or.overEvery = wl),
                (or.overSome = Cl),
                (or.partial = Qa),
                (or.partialRight = Ka),
                (or.partition = Ra),
                (or.pick = Zs),
                (or.pickBy = Qs),
                (or.property = xl),
                (or.propertyOf = function (e) {
                  return function (t) {
                    return null == e ? i : zr(e, t);
                  };
                }),
                (or.pull = la),
                (or.pullAll = ua),
                (or.pullAllBy = function (e, t, n) {
                  return e && e.length && t && t.length
                    ? so(e, t, wi(n, 2))
                    : e;
                }),
                (or.pullAllWith = function (e, t, n) {
                  return e && e.length && t && t.length ? so(e, t, i, n) : e;
                }),
                (or.pullAt = ca),
                (or.range = kl),
                (or.rangeRight = Sl),
                (or.rearg = $a),
                (or.reject = function (e, t) {
                  return (ts(e) ? zt : Or)(e, qa(wi(t, 3)));
                }),
                (or.remove = function (e, t) {
                  var n = [];
                  if (!e || !e.length) return n;
                  var r = -1,
                    o = [],
                    i = e.length;
                  for (t = wi(t, 3); ++r < i; ) {
                    var a = e[r];
                    t(a, r, e) && (n.push(a), o.push(r));
                  }
                  return lo(e, o), n;
                }),
                (or.rest = function (e, t) {
                  if ("function" != typeof e) throw new $e(s);
                  return po(e, (t = t === i ? t : Ss(t)));
                }),
                (or.reverse = pa),
                (or.sampleSize = function (e, t, n) {
                  return (
                    (t = (n ? Oi(e, t, n) : t === i) ? 1 : Ss(t)),
                    (ts(e)
                      ? function (e, t) {
                          return qi(Ho(e), xr(t, 0, e.length));
                        }
                      : function (e, t) {
                          var n = Js(e);
                          return qi(n, xr(t, 0, n.length));
                        })(e, t)
                  );
                }),
                (or.set = function (e, t, n) {
                  return null == e ? e : ho(e, t, n);
                }),
                (or.setWith = function (e, t, n, r) {
                  return (
                    (r = "function" == typeof r ? r : i),
                    null == e ? e : ho(e, t, n, r)
                  );
                }),
                (or.shuffle = function (e) {
                  return (
                    ts(e)
                      ? function (e) {
                          return qi(Ho(e));
                        }
                      : function (e) {
                          return qi(Js(e));
                        }
                  )(e);
                }),
                (or.slice = function (e, t, n) {
                  var r = null == e ? 0 : e.length;
                  return r
                    ? (n && "number" != typeof n && Oi(e, t, n)
                        ? ((t = 0), (n = r))
                        : ((t = null == t ? 0 : Ss(t)),
                          (n = n === i ? r : Ss(n))),
                      _o(e, t, n))
                    : [];
                }),
                (or.sortBy = Da),
                (or.sortedUniq = function (e) {
                  return e && e.length ? mo(e) : [];
                }),
                (or.sortedUniqBy = function (e, t) {
                  return e && e.length ? mo(e, wi(t, 2)) : [];
                }),
                (or.split = function (e, t, n) {
                  return (
                    n && "number" != typeof n && Oi(e, t, n) && (t = n = i),
                    (n = n === i ? I : n >>> 0)
                      ? (e = As(e)) &&
                        ("string" == typeof t || (null != t && !_s(t))) &&
                        !(t = Co(t)) &&
                        dn(e)
                        ? No(Cn(e), 0, n)
                        : e.split(t, n)
                      : []
                  );
                }),
                (or.spread = function (e, t) {
                  if ("function" != typeof e) throw new $e(s);
                  return (
                    (t = null == t ? 0 : Dn(Ss(t), 0)),
                    po(function (n) {
                      var r = n[t],
                        o = No(n, 0, t);
                      return r && Ut(o, r), Rt(e, this, o);
                    })
                  );
                }),
                (or.tail = function (e) {
                  var t = null == e ? 0 : e.length;
                  return t ? _o(e, 1, t) : [];
                }),
                (or.take = function (e, t, n) {
                  return e && e.length
                    ? _o(e, 0, (t = n || t === i ? 1 : Ss(t)) < 0 ? 0 : t)
                    : [];
                }),
                (or.takeRight = function (e, t, n) {
                  var r = null == e ? 0 : e.length;
                  return r
                    ? _o(
                        e,
                        (t = r - (t = n || t === i ? 1 : Ss(t))) < 0 ? 0 : t,
                        r
                      )
                    : [];
                }),
                (or.takeRightWhile = function (e, t) {
                  return e && e.length ? Eo(e, wi(t, 3), !1, !0) : [];
                }),
                (or.takeWhile = function (e, t) {
                  return e && e.length ? Eo(e, wi(t, 3)) : [];
                }),
                (or.tap = function (e, t) {
                  return t(e), e;
                }),
                (or.throttle = function (e, t, n) {
                  var r = !0,
                    o = !0;
                  if ("function" != typeof e) throw new $e(s);
                  return (
                    ps(n) &&
                      ((r = "leading" in n ? !!n.leading : r),
                      (o = "trailing" in n ? !!n.trailing : o)),
                    Ha(e, t, { leading: r, maxWait: t, trailing: o })
                  );
                }),
                (or.thru = ka),
                (or.toArray = xs),
                (or.toPairs = Ks),
                (or.toPairsIn = $s),
                (or.toPath = function (e) {
                  return ts(e) ? Ht(e, Qi) : gs(e) ? [e] : Ho(Zi(As(e)));
                }),
                (or.toPlainObject = Ts),
                (or.transform = function (e, t, n) {
                  var r = ts(e),
                    o = r || is(e) || ms(e);
                  if (((t = wi(t, 4)), null == n)) {
                    var i = e && e.constructor;
                    n = o
                      ? r
                        ? new i()
                        : []
                      : ps(e) && ls(i)
                      ? ir(Ct(e))
                      : {};
                  }
                  return (
                    (o ? Bt : Dr)(e, function (e, r, o) {
                      return t(n, e, r, o);
                    }),
                    n
                  );
                }),
                (or.unary = function (e) {
                  return Va(e, 1);
                }),
                (or.union = ha),
                (or.unionBy = fa),
                (or.unionWith = da),
                (or.uniq = function (e) {
                  return e && e.length ? xo(e) : [];
                }),
                (or.uniqBy = function (e, t) {
                  return e && e.length ? xo(e, wi(t, 2)) : [];
                }),
                (or.uniqWith = function (e, t) {
                  return (
                    (t = "function" == typeof t ? t : i),
                    e && e.length ? xo(e, i, t) : []
                  );
                }),
                (or.unset = function (e, t) {
                  return null == e || ko(e, t);
                }),
                (or.unzip = ya),
                (or.unzipWith = _a),
                (or.update = function (e, t, n) {
                  return null == e ? e : So(e, t, Po(n));
                }),
                (or.updateWith = function (e, t, n, r) {
                  return (
                    (r = "function" == typeof r ? r : i),
                    null == e ? e : So(e, t, Po(n), r)
                  );
                }),
                (or.values = Js),
                (or.valuesIn = function (e) {
                  return null == e ? [] : sn(e, Us(e));
                }),
                (or.without = va),
                (or.words = ll),
                (or.wrap = function (e, t) {
                  return Qa(Po(t), e);
                }),
                (or.xor = ba),
                (or.xorBy = ga),
                (or.xorWith = ma),
                (or.zip = wa),
                (or.zipObject = function (e, t) {
                  return Ao(e || [], t || [], vr);
                }),
                (or.zipObjectDeep = function (e, t) {
                  return Ao(e || [], t || [], ho);
                }),
                (or.zipWith = Ca),
                (or.entries = Ks),
                (or.entriesIn = $s),
                (or.extend = Ps),
                (or.extendWith = Os),
                bl(or, or),
                (or.add = Al),
                (or.attempt = ul),
                (or.camelCase = Ys),
                (or.capitalize = Xs),
                (or.ceil = Il),
                (or.clamp = function (e, t, n) {
                  return (
                    n === i && ((n = t), (t = i)),
                    n !== i && (n = (n = js(n)) == n ? n : 0),
                    t !== i && (t = (t = js(t)) == t ? t : 0),
                    xr(js(e), t, n)
                  );
                }),
                (or.clone = function (e) {
                  return kr(e, p);
                }),
                (or.cloneDeep = function (e) {
                  return kr(e, u | p);
                }),
                (or.cloneDeepWith = function (e, t) {
                  return kr(e, u | p, (t = "function" == typeof t ? t : i));
                }),
                (or.cloneWith = function (e, t) {
                  return kr(e, p, (t = "function" == typeof t ? t : i));
                }),
                (or.conformsTo = function (e, t) {
                  return null == t || Sr(e, t, Hs(t));
                }),
                (or.deburr = el),
                (or.defaultTo = function (e, t) {
                  return null == e || e != e ? t : e;
                }),
                (or.divide = Pl),
                (or.endsWith = function (e, t, n) {
                  (e = As(e)), (t = Co(t));
                  var r = e.length,
                    o = (n = n === i ? r : xr(Ss(n), 0, r));
                  return (n -= t.length) >= 0 && e.slice(n, o) == t;
                }),
                (or.eq = Ja),
                (or.escape = function (e) {
                  return (e = As(e)) && ve.test(e) ? e.replace(ye, hn) : e;
                }),
                (or.escapeRegExp = function (e) {
                  return (e = As(e)) && Se.test(e) ? e.replace(ke, "\\$&") : e;
                }),
                (or.every = function (e, t, n) {
                  var r = ts(e) ? Vt : Ir;
                  return n && Oi(e, t, n) && (t = i), r(e, wi(t, 3));
                }),
                (or.find = ja),
                (or.findIndex = ea),
                (or.findKey = function (e, t) {
                  return Qt(e, wi(t, 3), Dr);
                }),
                (or.findLast = Ta),
                (or.findLastIndex = ta),
                (or.findLastKey = function (e, t) {
                  return Qt(e, wi(t, 3), Br);
                }),
                (or.floor = Ol),
                (or.forEach = Aa),
                (or.forEachRight = Ia),
                (or.forIn = function (e, t) {
                  return null == e ? e : Nr(e, wi(t, 3), Us);
                }),
                (or.forInRight = function (e, t) {
                  return null == e ? e : Rr(e, wi(t, 3), Us);
                }),
                (or.forOwn = function (e, t) {
                  return e && Dr(e, wi(t, 3));
                }),
                (or.forOwnRight = function (e, t) {
                  return e && Br(e, wi(t, 3));
                }),
                (or.get = Bs),
                (or.gt = Ya),
                (or.gte = Xa),
                (or.has = function (e, t) {
                  return null != e && Ti(e, t, Ur);
                }),
                (or.hasIn = Vs),
                (or.head = ra),
                (or.identity = dl),
                (or.includes = function (e, t, n, r) {
                  (e = rs(e) ? e : Js(e)), (n = n && !r ? Ss(n) : 0);
                  var o = e.length;
                  return (
                    n < 0 && (n = Dn(o + n, 0)),
                    bs(e)
                      ? n <= o && e.indexOf(t, n) > -1
                      : !!o && $t(e, t, n) > -1
                  );
                }),
                (or.indexOf = function (e, t, n) {
                  var r = null == e ? 0 : e.length;
                  if (!r) return -1;
                  var o = null == n ? 0 : Ss(n);
                  return o < 0 && (o = Dn(r + o, 0)), $t(e, t, o);
                }),
                (or.inRange = function (e, t, n) {
                  return (
                    (t = ks(t)),
                    n === i ? ((n = t), (t = 0)) : (n = ks(n)),
                    (function (e, t, n) {
                      return e >= Bn(t, n) && e < Dn(t, n);
                    })((e = js(e)), t, n)
                  );
                }),
                (or.invoke = Ls),
                (or.isArguments = es),
                (or.isArray = ts),
                (or.isArrayBuffer = ns),
                (or.isArrayLike = rs),
                (or.isArrayLikeObject = os),
                (or.isBoolean = function (e) {
                  return !0 === e || !1 === e || (hs(e) && Lr(e) == B);
                }),
                (or.isBuffer = is),
                (or.isDate = as),
                (or.isElement = function (e) {
                  return hs(e) && 1 === e.nodeType && !ys(e);
                }),
                (or.isEmpty = function (e) {
                  if (null == e) return !0;
                  if (
                    rs(e) &&
                    (ts(e) ||
                      "string" == typeof e ||
                      "function" == typeof e.splice ||
                      is(e) ||
                      ms(e) ||
                      es(e))
                  )
                    return !e.length;
                  var t = ji(e);
                  if (t == U || t == K) return !e.size;
                  if (Di(e)) return !Yr(e).length;
                  for (var n in e) if (tt.call(e, n)) return !1;
                  return !0;
                }),
                (or.isEqual = function (e, t) {
                  return Qr(e, t);
                }),
                (or.isEqualWith = function (e, t, n) {
                  var r = (n = "function" == typeof n ? n : i) ? n(e, t) : i;
                  return r === i ? Qr(e, t, i, n) : !!r;
                }),
                (or.isError = ss),
                (or.isFinite = function (e) {
                  return "number" == typeof e && Mn(e);
                }),
                (or.isFunction = ls),
                (or.isInteger = us),
                (or.isLength = cs),
                (or.isMap = fs),
                (or.isMatch = function (e, t) {
                  return e === t || Kr(e, t, xi(t));
                }),
                (or.isMatchWith = function (e, t, n) {
                  return (
                    (n = "function" == typeof n ? n : i), Kr(e, t, xi(t), n)
                  );
                }),
                (or.isNaN = function (e) {
                  return ds(e) && e != +e;
                }),
                (or.isNative = function (e) {
                  if (Ri(e))
                    throw new We(
                      "Unsupported core-js use. Try https://npms.io/search?q=ponyfill."
                    );
                  return $r(e);
                }),
                (or.isNil = function (e) {
                  return null == e;
                }),
                (or.isNull = function (e) {
                  return null === e;
                }),
                (or.isNumber = ds),
                (or.isObject = ps),
                (or.isObjectLike = hs),
                (or.isPlainObject = ys),
                (or.isRegExp = _s),
                (or.isSafeInteger = function (e) {
                  return us(e) && e >= -j && e <= j;
                }),
                (or.isSet = vs),
                (or.isString = bs),
                (or.isSymbol = gs),
                (or.isTypedArray = ms),
                (or.isUndefined = function (e) {
                  return e === i;
                }),
                (or.isWeakMap = function (e) {
                  return hs(e) && ji(e) == X;
                }),
                (or.isWeakSet = function (e) {
                  return hs(e) && "[object WeakSet]" == Lr(e);
                }),
                (or.join = function (e, t) {
                  return null == e ? "" : Nn.call(e, t);
                }),
                (or.kebabCase = tl),
                (or.last = sa),
                (or.lastIndexOf = function (e, t, n) {
                  var r = null == e ? 0 : e.length;
                  if (!r) return -1;
                  var o = r;
                  return (
                    n !== i &&
                      (o = (o = Ss(n)) < 0 ? Dn(r + o, 0) : Bn(o, r - 1)),
                    t == t
                      ? (function (e, t, n) {
                          for (var r = n + 1; r--; ) if (e[r] === t) return r;
                          return r;
                        })(e, t, o)
                      : Kt(e, Yt, o, !0)
                  );
                }),
                (or.lowerCase = nl),
                (or.lowerFirst = rl),
                (or.lt = ws),
                (or.lte = Cs),
                (or.max = function (e) {
                  return e && e.length ? Pr(e, dl, Hr) : i;
                }),
                (or.maxBy = function (e, t) {
                  return e && e.length ? Pr(e, wi(t, 2), Hr) : i;
                }),
                (or.mean = function (e) {
                  return Xt(e, dl);
                }),
                (or.meanBy = function (e, t) {
                  return Xt(e, wi(t, 2));
                }),
                (or.min = function (e) {
                  return e && e.length ? Pr(e, dl, Xr) : i;
                }),
                (or.minBy = function (e, t) {
                  return e && e.length ? Pr(e, wi(t, 2), Xr) : i;
                }),
                (or.stubArray = El),
                (or.stubFalse = jl),
                (or.stubObject = function () {
                  return {};
                }),
                (or.stubString = function () {
                  return "";
                }),
                (or.stubTrue = function () {
                  return !0;
                }),
                (or.multiply = Ml),
                (or.nth = function (e, t) {
                  return e && e.length ? oo(e, Ss(t)) : i;
                }),
                (or.noConflict = function () {
                  return xt._ === this && (xt._ = at), this;
                }),
                (or.noop = gl),
                (or.now = Ba),
                (or.pad = function (e, t, n) {
                  e = As(e);
                  var r = (t = Ss(t)) ? wn(e) : 0;
                  if (!t || r >= t) return e;
                  var o = (t - r) / 2;
                  return ri(In(o), n) + e + ri(An(o), n);
                }),
                (or.padEnd = function (e, t, n) {
                  e = As(e);
                  var r = (t = Ss(t)) ? wn(e) : 0;
                  return t && r < t ? e + ri(t - r, n) : e;
                }),
                (or.padStart = function (e, t, n) {
                  e = As(e);
                  var r = (t = Ss(t)) ? wn(e) : 0;
                  return t && r < t ? ri(t - r, n) + e : e;
                }),
                (or.parseInt = function (e, t, n) {
                  return (
                    n || null == t ? (t = 0) : t && (t = +t),
                    zn(As(e).replace(je, ""), t || 0)
                  );
                }),
                (or.random = function (e, t, n) {
                  if (
                    (n && "boolean" != typeof n && Oi(e, t, n) && (t = n = i),
                    n === i &&
                      ("boolean" == typeof t
                        ? ((n = t), (t = i))
                        : "boolean" == typeof e && ((n = e), (e = i))),
                    e === i && t === i
                      ? ((e = 0), (t = 1))
                      : ((e = ks(e)),
                        t === i ? ((t = e), (e = 0)) : (t = ks(t))),
                    e > t)
                  ) {
                    var r = e;
                    (e = t), (t = r);
                  }
                  if (n || e % 1 || t % 1) {
                    var o = Fn();
                    return Bn(
                      e + o * (t - e + gt("1e-" + ((o + "").length - 1))),
                      t
                    );
                  }
                  return uo(e, t);
                }),
                (or.reduce = function (e, t, n) {
                  var r = ts(e) ? Wt : nn,
                    o = arguments.length < 3;
                  return r(e, wi(t, 4), n, o, Tr);
                }),
                (or.reduceRight = function (e, t, n) {
                  var r = ts(e) ? Gt : nn,
                    o = arguments.length < 3;
                  return r(e, wi(t, 4), n, o, Ar);
                }),
                (or.repeat = function (e, t, n) {
                  return (
                    (t = (n ? Oi(e, t, n) : t === i) ? 1 : Ss(t)), co(As(e), t)
                  );
                }),
                (or.replace = function () {
                  var e = arguments,
                    t = As(e[0]);
                  return e.length < 3 ? t : t.replace(e[1], e[2]);
                }),
                (or.result = function (e, t, n) {
                  var r = -1,
                    o = (t = Oo(t, e)).length;
                  for (o || ((o = 1), (e = i)); ++r < o; ) {
                    var a = null == e ? i : e[Qi(t[r])];
                    a === i && ((r = o), (a = n)), (e = ls(a) ? a.call(e) : a);
                  }
                  return e;
                }),
                (or.round = Nl),
                (or.runInContext = e),
                (or.sample = function (e) {
                  return (
                    ts(e)
                      ? yr
                      : function (e) {
                          return yr(Js(e));
                        }
                  )(e);
                }),
                (or.size = function (e) {
                  if (null == e) return 0;
                  if (rs(e)) return bs(e) ? wn(e) : e.length;
                  var t = ji(e);
                  return t == U || t == K ? e.size : Yr(e).length;
                }),
                (or.snakeCase = ol),
                (or.some = function (e, t, n) {
                  var r = ts(e) ? qt : vo;
                  return n && Oi(e, t, n) && (t = i), r(e, wi(t, 3));
                }),
                (or.sortedIndex = function (e, t) {
                  return bo(e, t);
                }),
                (or.sortedIndexBy = function (e, t, n) {
                  return go(e, t, wi(n, 2));
                }),
                (or.sortedIndexOf = function (e, t) {
                  var n = null == e ? 0 : e.length;
                  if (n) {
                    var r = bo(e, t);
                    if (r < n && Ja(e[r], t)) return r;
                  }
                  return -1;
                }),
                (or.sortedLastIndex = function (e, t) {
                  return bo(e, t, !0);
                }),
                (or.sortedLastIndexBy = function (e, t, n) {
                  return go(e, t, wi(n, 2), !0);
                }),
                (or.sortedLastIndexOf = function (e, t) {
                  if (null != e && e.length) {
                    var n = bo(e, t, !0) - 1;
                    if (Ja(e[n], t)) return n;
                  }
                  return -1;
                }),
                (or.startCase = il),
                (or.startsWith = function (e, t, n) {
                  return (
                    (e = As(e)),
                    (n = null == n ? 0 : xr(Ss(n), 0, e.length)),
                    (t = Co(t)),
                    e.slice(n, n + t.length) == t
                  );
                }),
                (or.subtract = Rl),
                (or.sum = function (e) {
                  return e && e.length ? rn(e, dl) : 0;
                }),
                (or.sumBy = function (e, t) {
                  return e && e.length ? rn(e, wi(t, 2)) : 0;
                }),
                (or.template = function (e, t, n) {
                  var r = or.templateSettings;
                  n && Oi(e, t, n) && (t = i),
                    (e = As(e)),
                    (t = Os({}, t, r, pi));
                  var o,
                    a,
                    s = Os({}, t.imports, r.imports, pi),
                    l = Hs(s),
                    u = sn(s, l),
                    c = 0,
                    p = t.interpolate || He,
                    h = "__p += '",
                    f = Qe(
                      (t.escape || He).source +
                        "|" +
                        p.source +
                        "|" +
                        (p === me ? Ne : He).source +
                        "|" +
                        (t.evaluate || He).source +
                        "|$",
                      "g"
                    ),
                    d =
                      "//# sourceURL=" +
                      ("sourceURL" in t
                        ? t.sourceURL
                        : "lodash.templateSources[" + ++yt + "]") +
                      "\n";
                  e.replace(f, function (t, n, r, i, s, l) {
                    return (
                      r || (r = i),
                      (h += e.slice(c, l).replace(Ue, fn)),
                      n && ((o = !0), (h += "' +\n__e(" + n + ") +\n'")),
                      s && ((a = !0), (h += "';\n" + s + ";\n__p += '")),
                      r &&
                        (h +=
                          "' +\n((__t = (" + r + ")) == null ? '' : __t) +\n'"),
                      (c = l + t.length),
                      t
                    );
                  }),
                    (h += "';\n");
                  var y = t.variable;
                  y || (h = "with (obj) {\n" + h + "\n}\n"),
                    (h = (a ? h.replace(pe, "") : h)
                      .replace(he, "$1")
                      .replace(fe, "$1;")),
                    (h =
                      "function(" +
                      (y || "obj") +
                      ") {\n" +
                      (y ? "" : "obj || (obj = {});\n") +
                      "var __t, __p = ''" +
                      (o ? ", __e = _.escape" : "") +
                      (a
                        ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n"
                        : ";\n") +
                      h +
                      "return __p\n}");
                  var _ = ul(function () {
                    return Ge(l, d + "return " + h).apply(i, u);
                  });
                  if (((_.source = h), ss(_))) throw _;
                  return _;
                }),
                (or.times = function (e, t) {
                  if ((e = Ss(e)) < 1 || e > j) return [];
                  var n = I,
                    r = Bn(e, I);
                  (t = wi(t)), (e -= I);
                  for (var o = on(r, t); ++n < e; ) t(n);
                  return o;
                }),
                (or.toFinite = ks),
                (or.toInteger = Ss),
                (or.toLength = Es),
                (or.toLower = function (e) {
                  return As(e).toLowerCase();
                }),
                (or.toNumber = js),
                (or.toSafeInteger = function (e) {
                  return e ? xr(Ss(e), -j, j) : 0 === e ? e : 0;
                }),
                (or.toString = As),
                (or.toUpper = function (e) {
                  return As(e).toUpperCase();
                }),
                (or.trim = function (e, t, n) {
                  if ((e = As(e)) && (n || t === i)) return e.replace(Ee, "");
                  if (!e || !(t = Co(t))) return e;
                  var r = Cn(e),
                    o = Cn(t);
                  return No(r, un(r, o), cn(r, o) + 1).join("");
                }),
                (or.trimEnd = function (e, t, n) {
                  if ((e = As(e)) && (n || t === i)) return e.replace(Te, "");
                  if (!e || !(t = Co(t))) return e;
                  var r = Cn(e);
                  return No(r, 0, cn(r, Cn(t)) + 1).join("");
                }),
                (or.trimStart = function (e, t, n) {
                  if ((e = As(e)) && (n || t === i)) return e.replace(je, "");
                  if (!e || !(t = Co(t))) return e;
                  var r = Cn(e);
                  return No(r, un(r, Cn(t))).join("");
                }),
                (or.truncate = function (e, t) {
                  var n = 30,
                    r = "...";
                  if (ps(t)) {
                    var o = "separator" in t ? t.separator : o;
                    (n = "length" in t ? Ss(t.length) : n),
                      (r = "omission" in t ? Co(t.omission) : r);
                  }
                  var a = (e = As(e)).length;
                  if (dn(e)) {
                    var s = Cn(e);
                    a = s.length;
                  }
                  if (n >= a) return e;
                  var l = n - wn(r);
                  if (l < 1) return r;
                  var u = s ? No(s, 0, l).join("") : e.slice(0, l);
                  if (o === i) return u + r;
                  if ((s && (l += u.length - l), _s(o))) {
                    if (e.slice(l).search(o)) {
                      var c,
                        p = u;
                      for (
                        o.global || (o = Qe(o.source, As(Re.exec(o)) + "g")),
                          o.lastIndex = 0;
                        (c = o.exec(p));

                      )
                        var h = c.index;
                      u = u.slice(0, h === i ? l : h);
                    }
                  } else if (e.indexOf(Co(o), l) != l) {
                    var f = u.lastIndexOf(o);
                    f > -1 && (u = u.slice(0, f));
                  }
                  return u + r;
                }),
                (or.unescape = function (e) {
                  return (e = As(e)) && _e.test(e) ? e.replace(de, xn) : e;
                }),
                (or.uniqueId = function (e) {
                  var t = ++nt;
                  return As(e) + t;
                }),
                (or.upperCase = al),
                (or.upperFirst = sl),
                (or.each = Aa),
                (or.eachRight = Ia),
                (or.first = ra),
                bl(
                  or,
                  ((Tl = {}),
                  Dr(or, function (e, t) {
                    tt.call(or.prototype, t) || (Tl[t] = e);
                  }),
                  Tl),
                  { chain: !1 }
                ),
                (or.VERSION = "4.17.5"),
                Bt(
                  [
                    "bind",
                    "bindKey",
                    "curry",
                    "curryRight",
                    "partial",
                    "partialRight",
                  ],
                  function (e) {
                    or[e].placeholder = or;
                  }
                ),
                Bt(["drop", "take"], function (e, t) {
                  (lr.prototype[e] = function (n) {
                    n = n === i ? 1 : Dn(Ss(n), 0);
                    var r =
                      this.__filtered__ && !t ? new lr(this) : this.clone();
                    return (
                      r.__filtered__
                        ? (r.__takeCount__ = Bn(n, r.__takeCount__))
                        : r.__views__.push({
                            size: Bn(n, I),
                            type: e + (r.__dir__ < 0 ? "Right" : ""),
                          }),
                      r
                    );
                  }),
                    (lr.prototype[e + "Right"] = function (t) {
                      return this.reverse()[e](t).reverse();
                    });
                }),
                Bt(["filter", "map", "takeWhile"], function (e, t) {
                  var n = t + 1,
                    r = 1 == n || 3 == n;
                  lr.prototype[e] = function (e) {
                    var t = this.clone();
                    return (
                      t.__iteratees__.push({ iteratee: wi(e, 3), type: n }),
                      (t.__filtered__ = t.__filtered__ || r),
                      t
                    );
                  };
                }),
                Bt(["head", "last"], function (e, t) {
                  var n = "take" + (t ? "Right" : "");
                  lr.prototype[e] = function () {
                    return this[n](1).value()[0];
                  };
                }),
                Bt(["initial", "tail"], function (e, t) {
                  var n = "drop" + (t ? "" : "Right");
                  lr.prototype[e] = function () {
                    return this.__filtered__ ? new lr(this) : this[n](1);
                  };
                }),
                (lr.prototype.compact = function () {
                  return this.filter(dl);
                }),
                (lr.prototype.find = function (e) {
                  return this.filter(e).head();
                }),
                (lr.prototype.findLast = function (e) {
                  return this.reverse().find(e);
                }),
                (lr.prototype.invokeMap = po(function (e, t) {
                  return "function" == typeof e
                    ? new lr(this)
                    : this.map(function (n) {
                        return qr(n, e, t);
                      });
                })),
                (lr.prototype.reject = function (e) {
                  return this.filter(qa(wi(e)));
                }),
                (lr.prototype.slice = function (e, t) {
                  e = Ss(e);
                  var n = this;
                  return n.__filtered__ && (e > 0 || t < 0)
                    ? new lr(n)
                    : (e < 0 ? (n = n.takeRight(-e)) : e && (n = n.drop(e)),
                      t !== i &&
                        (n = (t = Ss(t)) < 0 ? n.dropRight(-t) : n.take(t - e)),
                      n);
                }),
                (lr.prototype.takeRightWhile = function (e) {
                  return this.reverse().takeWhile(e).reverse();
                }),
                (lr.prototype.toArray = function () {
                  return this.take(I);
                }),
                Dr(lr.prototype, function (e, t) {
                  var n = /^(?:filter|find|map|reject)|While$/.test(t),
                    r = /^(?:head|last)$/.test(t),
                    o = or[r ? "take" + ("last" == t ? "Right" : "") : t],
                    a = r || /^find/.test(t);
                  o &&
                    (or.prototype[t] = function () {
                      var t = this.__wrapped__,
                        s = r ? [1] : arguments,
                        l = t instanceof lr,
                        u = s[0],
                        c = l || ts(t),
                        p = function (e) {
                          var t = o.apply(or, Ut([e], s));
                          return r && h ? t[0] : t;
                        };
                      c &&
                        n &&
                        "function" == typeof u &&
                        1 != u.length &&
                        (l = c = !1);
                      var h = this.__chain__,
                        f = a && !h,
                        d = l && !this.__actions__.length;
                      if (!a && c) {
                        t = d ? t : new lr(this);
                        var y = e.apply(t, s);
                        return (
                          y.__actions__.push({
                            func: ka,
                            args: [p],
                            thisArg: i,
                          }),
                          new sr(y, h)
                        );
                      }
                      return f && d
                        ? e.apply(this, s)
                        : ((y = this.thru(p)),
                          f ? (r ? y.value()[0] : y.value()) : y);
                    });
                }),
                Bt(
                  ["pop", "push", "shift", "sort", "splice", "unshift"],
                  function (e) {
                    var t = Je[e],
                      n = /^(?:push|sort|unshift)$/.test(e) ? "tap" : "thru",
                      r = /^(?:pop|shift)$/.test(e);
                    or.prototype[e] = function () {
                      var e = arguments;
                      if (r && !this.__chain__) {
                        var o = this.value();
                        return t.apply(ts(o) ? o : [], e);
                      }
                      return this[n](function (n) {
                        return t.apply(ts(n) ? n : [], e);
                      });
                    };
                  }
                ),
                Dr(lr.prototype, function (e, t) {
                  var n = or[t];
                  if (n) {
                    var r = n.name + "";
                    (Kn[r] || (Kn[r] = [])).push({ name: t, func: n });
                  }
                }),
                (Kn[Xo(i, y).name] = [{ name: "wrapper", func: i }]),
                (lr.prototype.clone = function () {
                  var e = new lr(this.__wrapped__);
                  return (
                    (e.__actions__ = Ho(this.__actions__)),
                    (e.__dir__ = this.__dir__),
                    (e.__filtered__ = this.__filtered__),
                    (e.__iteratees__ = Ho(this.__iteratees__)),
                    (e.__takeCount__ = this.__takeCount__),
                    (e.__views__ = Ho(this.__views__)),
                    e
                  );
                }),
                (lr.prototype.reverse = function () {
                  if (this.__filtered__) {
                    var e = new lr(this);
                    (e.__dir__ = -1), (e.__filtered__ = !0);
                  } else (e = this.clone()).__dir__ *= -1;
                  return e;
                }),
                (lr.prototype.value = function () {
                  var e = this.__wrapped__.value(),
                    t = this.__dir__,
                    n = ts(e),
                    r = t < 0,
                    o = n ? e.length : 0,
                    i = (function (e, t, n) {
                      for (var r = -1, o = n.length; ++r < o; ) {
                        var i = n[r],
                          a = i.size;
                        switch (i.type) {
                          case "drop":
                            e += a;
                            break;
                          case "dropRight":
                            t -= a;
                            break;
                          case "take":
                            t = Bn(t, e + a);
                            break;
                          case "takeRight":
                            e = Dn(e, t - a);
                        }
                      }
                      return { start: e, end: t };
                    })(0, o, this.__views__),
                    a = i.start,
                    s = i.end,
                    l = s - a,
                    u = r ? s : a - 1,
                    c = this.__iteratees__,
                    p = c.length,
                    h = 0,
                    f = Bn(l, this.__takeCount__);
                  if (!n || (!r && o == l && f == l))
                    return jo(e, this.__actions__);
                  var d = [];
                  e: for (; l-- && h < f; ) {
                    for (var y = -1, _ = e[(u += t)]; ++y < p; ) {
                      var v = c[y],
                        b = v.type,
                        g = (0, v.iteratee)(_);
                      if (2 == b) _ = g;
                      else if (!g) {
                        if (1 == b) continue e;
                        break e;
                      }
                    }
                    d[h++] = _;
                  }
                  return d;
                }),
                (or.prototype.at = Sa),
                (or.prototype.chain = function () {
                  return xa(this);
                }),
                (or.prototype.commit = function () {
                  return new sr(this.value(), this.__chain__);
                }),
                (or.prototype.next = function () {
                  this.__values__ === i && (this.__values__ = xs(this.value()));
                  var e = this.__index__ >= this.__values__.length;
                  return {
                    done: e,
                    value: e ? i : this.__values__[this.__index__++],
                  };
                }),
                (or.prototype.plant = function (e) {
                  for (var t, n = this; n instanceof ar; ) {
                    var r = $i(n);
                    (r.__index__ = 0),
                      (r.__values__ = i),
                      t ? (o.__wrapped__ = r) : (t = r);
                    var o = r;
                    n = n.__wrapped__;
                  }
                  return (o.__wrapped__ = e), t;
                }),
                (or.prototype.reverse = function () {
                  var e = this.__wrapped__;
                  if (e instanceof lr) {
                    var t = e;
                    return (
                      this.__actions__.length && (t = new lr(this)),
                      (t = t.reverse()).__actions__.push({
                        func: ka,
                        args: [pa],
                        thisArg: i,
                      }),
                      new sr(t, this.__chain__)
                    );
                  }
                  return this.thru(pa);
                }),
                (or.prototype.toJSON =
                  or.prototype.valueOf =
                  or.prototype.value =
                    function () {
                      return jo(this.__wrapped__, this.__actions__);
                    }),
                (or.prototype.first = or.prototype.head),
                Zt &&
                  (or.prototype[Zt] = function () {
                    return this;
                  }),
                or
              );
            })();
          (xt._ = kn),
            (o = function () {
              return kn;
            }.call(t, n, t, r)) === i || (r.exports = o);
        }).call(this);
      }).call(t, n("fRUx"), n("ZwkM")(e));
    },
  },
  [0]
);
