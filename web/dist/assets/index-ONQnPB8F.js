(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const l of document.querySelectorAll('link[rel="modulepreload"]')) o(l);
  new MutationObserver((l) => {
    for (const s of l)
      if (s.type === "childList")
        for (const r of s.addedNodes)
          r.tagName === "LINK" && r.rel === "modulepreload" && o(r);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(l) {
    const s = {};
    return (
      l.integrity && (s.integrity = l.integrity),
      l.referrerPolicy && (s.referrerPolicy = l.referrerPolicy),
      l.crossOrigin === "use-credentials"
        ? (s.credentials = "include")
        : l.crossOrigin === "anonymous"
          ? (s.credentials = "omit")
          : (s.credentials = "same-origin"),
      s
    );
  }
  function o(l) {
    if (l.ep) return;
    l.ep = !0;
    const s = n(l);
    fetch(l.href, s);
  }
})();
/**
 * @vue/shared v3.4.21
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ function _l(e, t) {
  const n = new Set(e.split(","));
  return t ? (o) => n.has(o.toLowerCase()) : (o) => n.has(o);
}
const me = {},
  en = [],
  Ye = () => {},
  Li = () => !1,
  bo = (e) =>
    e.charCodeAt(0) === 111 &&
    e.charCodeAt(1) === 110 &&
    (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97),
  xl = (e) => e.startsWith("onUpdate:"),
  Ee = Object.assign,
  Cl = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  Fi = Object.prototype.hasOwnProperty,
  le = (e, t) => Fi.call(e, t),
  J = Array.isArray,
  tn = (e) => yo(e) === "[object Map]",
  lr = (e) => yo(e) === "[object Set]",
  X = (e) => typeof e == "function",
  ye = (e) => typeof e == "string",
  an = (e) => typeof e == "symbol",
  ve = (e) => e !== null && typeof e == "object",
  sr = (e) => (ve(e) || X(e)) && X(e.then) && X(e.catch),
  rr = Object.prototype.toString,
  yo = (e) => rr.call(e),
  Vi = (e) => yo(e).slice(8, -1),
  ir = (e) => yo(e) === "[object Object]",
  wl = (e) =>
    ye(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  pn = _l(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted",
  ),
  _o = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  Hi = /-(\w)/g,
  at = _o((e) => e.replace(Hi, (t, n) => (n ? n.toUpperCase() : ""))),
  zi = /\B([A-Z])/g,
  jt = _o((e) => e.replace(zi, "-$1").toLowerCase()),
  xo = _o((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  Fo = _o((e) => (e ? `on${xo(e)}` : "")),
  It = (e, t) => !Object.is(e, t),
  Vo = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t);
  },
  so = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n });
  },
  ji = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  },
  Ui = (e) => {
    const t = ye(e) ? Number(e) : NaN;
    return isNaN(t) ? e : t;
  };
let Wl;
const ar = () =>
  Wl ||
  (Wl =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
        ? self
        : typeof window < "u"
          ? window
          : typeof global < "u"
            ? global
            : {});
function ft(e) {
  if (J(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const o = e[n],
        l = ye(o) ? Yi(o) : ft(o);
      if (l) for (const s in l) t[s] = l[s];
    }
    return t;
  } else if (ye(e) || ve(e)) return e;
}
const Ki = /;(?![^(]*\))/g,
  Wi = /:([^]+)/,
  Ji = /\/\*[^]*?\*\//g;
function Yi(e) {
  const t = {};
  return (
    e
      .replace(Ji, "")
      .split(Ki)
      .forEach((n) => {
        if (n) {
          const o = n.split(Wi);
          o.length > 1 && (t[o[0].trim()] = o[1].trim());
        }
      }),
    t
  );
}
function Sl(e) {
  let t = "";
  if (ye(e)) t = e;
  else if (J(e))
    for (let n = 0; n < e.length; n++) {
      const o = Sl(e[n]);
      o && (t += o + " ");
    }
  else if (ve(e)) for (const n in e) e[n] && (t += n + " ");
  return t.trim();
}
const Gi =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  qi = _l(Gi);
function cr(e) {
  return !!e || e === "";
}
const Ke = (e) =>
    ye(e)
      ? e
      : e == null
        ? ""
        : J(e) || (ve(e) && (e.toString === rr || !X(e.toString)))
          ? JSON.stringify(e, ur, 2)
          : String(e),
  ur = (e, t) =>
    t && t.__v_isRef
      ? ur(e, t.value)
      : tn(t)
        ? {
            [`Map(${t.size})`]: [...t.entries()].reduce(
              (n, [o, l], s) => ((n[Ho(o, s) + " =>"] = l), n),
              {},
            ),
          }
        : lr(t)
          ? { [`Set(${t.size})`]: [...t.values()].map((n) => Ho(n)) }
          : an(t)
            ? Ho(t)
            : ve(t) && !J(t) && !ir(t)
              ? String(t)
              : t,
  Ho = (e, t = "") => {
    var n;
    return an(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e;
  };
/**
 * @vue/reactivity v3.4.21
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ let Qe;
class Xi {
  constructor(t = !1) {
    (this.detached = t),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = Qe),
      !t && Qe && (this.index = (Qe.scopes || (Qe.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = Qe;
      try {
        return (Qe = this), t();
      } finally {
        Qe = n;
      }
    }
  }
  on() {
    Qe = this;
  }
  off() {
    Qe = this.parent;
  }
  stop(t) {
    if (this._active) {
      let n, o;
      for (n = 0, o = this.effects.length; n < o; n++) this.effects[n].stop();
      for (n = 0, o = this.cleanups.length; n < o; n++) this.cleanups[n]();
      if (this.scopes)
        for (n = 0, o = this.scopes.length; n < o; n++) this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const l = this.parent.scopes.pop();
        l &&
          l !== this &&
          ((this.parent.scopes[this.index] = l), (l.index = this.index));
      }
      (this.parent = void 0), (this._active = !1);
    }
  }
}
function Zi(e, t = Qe) {
  t && t.active && t.effects.push(e);
}
function Qi() {
  return Qe;
}
let Vt;
class El {
  constructor(t, n, o, l) {
    (this.fn = t),
      (this.trigger = n),
      (this.scheduler = o),
      (this.active = !0),
      (this.deps = []),
      (this._dirtyLevel = 4),
      (this._trackId = 0),
      (this._runnings = 0),
      (this._shouldSchedule = !1),
      (this._depsLength = 0),
      Zi(this, l);
  }
  get dirty() {
    if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
      (this._dirtyLevel = 1), Ut();
      for (let t = 0; t < this._depsLength; t++) {
        const n = this.deps[t];
        if (n.computed && (ea(n.computed), this._dirtyLevel >= 4)) break;
      }
      this._dirtyLevel === 1 && (this._dirtyLevel = 0), Kt();
    }
    return this._dirtyLevel >= 4;
  }
  set dirty(t) {
    this._dirtyLevel = t ? 4 : 0;
  }
  run() {
    if (((this._dirtyLevel = 0), !this.active)) return this.fn();
    let t = At,
      n = Vt;
    try {
      return (At = !0), (Vt = this), this._runnings++, Jl(this), this.fn();
    } finally {
      Yl(this), this._runnings--, (Vt = n), (At = t);
    }
  }
  stop() {
    var t;
    this.active &&
      (Jl(this),
      Yl(this),
      (t = this.onStop) == null || t.call(this),
      (this.active = !1));
  }
}
function ea(e) {
  return e.value;
}
function Jl(e) {
  e._trackId++, (e._depsLength = 0);
}
function Yl(e) {
  if (e.deps.length > e._depsLength) {
    for (let t = e._depsLength; t < e.deps.length; t++) fr(e.deps[t], e);
    e.deps.length = e._depsLength;
  }
}
function fr(e, t) {
  const n = e.get(t);
  n !== void 0 &&
    t._trackId !== n &&
    (e.delete(t), e.size === 0 && e.cleanup());
}
let At = !0,
  tl = 0;
const dr = [];
function Ut() {
  dr.push(At), (At = !1);
}
function Kt() {
  const e = dr.pop();
  At = e === void 0 ? !0 : e;
}
function Tl() {
  tl++;
}
function Ol() {
  for (tl--; !tl && nl.length; ) nl.shift()();
}
function hr(e, t, n) {
  if (t.get(e) !== e._trackId) {
    t.set(e, e._trackId);
    const o = e.deps[e._depsLength];
    o !== t ? (o && fr(o, e), (e.deps[e._depsLength++] = t)) : e._depsLength++;
  }
}
const nl = [];
function gr(e, t, n) {
  Tl();
  for (const o of e.keys()) {
    let l;
    o._dirtyLevel < t &&
      (l ?? (l = e.get(o) === o._trackId)) &&
      (o._shouldSchedule || (o._shouldSchedule = o._dirtyLevel === 0),
      (o._dirtyLevel = t)),
      o._shouldSchedule &&
        (l ?? (l = e.get(o) === o._trackId)) &&
        (o.trigger(),
        (!o._runnings || o.allowRecurse) &&
          o._dirtyLevel !== 2 &&
          ((o._shouldSchedule = !1), o.scheduler && nl.push(o.scheduler)));
  }
  Ol();
}
const mr = (e, t) => {
    const n = new Map();
    return (n.cleanup = e), (n.computed = t), n;
  },
  ol = new WeakMap(),
  Ht = Symbol(""),
  ll = Symbol("");
function He(e, t, n) {
  if (At && Vt) {
    let o = ol.get(e);
    o || ol.set(e, (o = new Map()));
    let l = o.get(n);
    l || o.set(n, (l = mr(() => o.delete(n)))), hr(Vt, l);
  }
}
function ht(e, t, n, o, l, s) {
  const r = ol.get(e);
  if (!r) return;
  let i = [];
  if (t === "clear") i = [...r.values()];
  else if (n === "length" && J(e)) {
    const a = Number(o);
    r.forEach((c, f) => {
      (f === "length" || (!an(f) && f >= a)) && i.push(c);
    });
  } else
    switch ((n !== void 0 && i.push(r.get(n)), t)) {
      case "add":
        J(e)
          ? wl(n) && i.push(r.get("length"))
          : (i.push(r.get(Ht)), tn(e) && i.push(r.get(ll)));
        break;
      case "delete":
        J(e) || (i.push(r.get(Ht)), tn(e) && i.push(r.get(ll)));
        break;
      case "set":
        tn(e) && i.push(r.get(Ht));
        break;
    }
  Tl();
  for (const a of i) a && gr(a, 4);
  Ol();
}
const ta = _l("__proto__,__v_isRef,__isVue"),
  vr = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== "arguments" && e !== "caller")
      .map((e) => Symbol[e])
      .filter(an),
  ),
  Gl = na();
function na() {
  const e = {};
  return (
    ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
      e[t] = function (...n) {
        const o = re(this);
        for (let s = 0, r = this.length; s < r; s++) He(o, "get", s + "");
        const l = o[t](...n);
        return l === -1 || l === !1 ? o[t](...n.map(re)) : l;
      };
    }),
    ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
      e[t] = function (...n) {
        Ut(), Tl();
        const o = re(this)[t].apply(this, n);
        return Ol(), Kt(), o;
      };
    }),
    e
  );
}
function oa(e) {
  const t = re(this);
  return He(t, "has", e), t.hasOwnProperty(e);
}
class pr {
  constructor(t = !1, n = !1) {
    (this._isReadonly = t), (this._isShallow = n);
  }
  get(t, n, o) {
    const l = this._isReadonly,
      s = this._isShallow;
    if (n === "__v_isReactive") return !l;
    if (n === "__v_isReadonly") return l;
    if (n === "__v_isShallow") return s;
    if (n === "__v_raw")
      return o === (l ? (s ? va : xr) : s ? _r : yr).get(t) ||
        Object.getPrototypeOf(t) === Object.getPrototypeOf(o)
        ? t
        : void 0;
    const r = J(t);
    if (!l) {
      if (r && le(Gl, n)) return Reflect.get(Gl, n, o);
      if (n === "hasOwnProperty") return oa;
    }
    const i = Reflect.get(t, n, o);
    return (an(n) ? vr.has(n) : ta(n)) || (l || He(t, "get", n), s)
      ? i
      : Me(i)
        ? r && wl(n)
          ? i
          : i.value
        : ve(i)
          ? l
            ? Cr(i)
            : pt(i)
          : i;
  }
}
class br extends pr {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, o, l) {
    let s = t[n];
    if (!this._isShallow) {
      const a = sn(s);
      if (
        (!ro(o) && !sn(o) && ((s = re(s)), (o = re(o))),
        !J(t) && Me(s) && !Me(o))
      )
        return a ? !1 : ((s.value = o), !0);
    }
    const r = J(t) && wl(n) ? Number(n) < t.length : le(t, n),
      i = Reflect.set(t, n, o, l);
    return (
      t === re(l) && (r ? It(o, s) && ht(t, "set", n, o) : ht(t, "add", n, o)),
      i
    );
  }
  deleteProperty(t, n) {
    const o = le(t, n);
    t[n];
    const l = Reflect.deleteProperty(t, n);
    return l && o && ht(t, "delete", n, void 0), l;
  }
  has(t, n) {
    const o = Reflect.has(t, n);
    return (!an(n) || !vr.has(n)) && He(t, "has", n), o;
  }
  ownKeys(t) {
    return He(t, "iterate", J(t) ? "length" : Ht), Reflect.ownKeys(t);
  }
}
class la extends pr {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return !0;
  }
  deleteProperty(t, n) {
    return !0;
  }
}
const sa = new br(),
  ra = new la(),
  ia = new br(!0),
  Al = (e) => e,
  Co = (e) => Reflect.getPrototypeOf(e);
function Fn(e, t, n = !1, o = !1) {
  e = e.__v_raw;
  const l = re(e),
    s = re(t);
  n || (It(t, s) && He(l, "get", t), He(l, "get", s));
  const { has: r } = Co(l),
    i = o ? Al : n ? Bl : Sn;
  if (r.call(l, t)) return i(e.get(t));
  if (r.call(l, s)) return i(e.get(s));
  e !== l && e.get(t);
}
function Vn(e, t = !1) {
  const n = this.__v_raw,
    o = re(n),
    l = re(e);
  return (
    t || (It(e, l) && He(o, "has", e), He(o, "has", l)),
    e === l ? n.has(e) : n.has(e) || n.has(l)
  );
}
function Hn(e, t = !1) {
  return (
    (e = e.__v_raw), !t && He(re(e), "iterate", Ht), Reflect.get(e, "size", e)
  );
}
function ql(e) {
  e = re(e);
  const t = re(this);
  return Co(t).has.call(t, e) || (t.add(e), ht(t, "add", e, e)), this;
}
function Xl(e, t) {
  t = re(t);
  const n = re(this),
    { has: o, get: l } = Co(n);
  let s = o.call(n, e);
  s || ((e = re(e)), (s = o.call(n, e)));
  const r = l.call(n, e);
  return (
    n.set(e, t), s ? It(t, r) && ht(n, "set", e, t) : ht(n, "add", e, t), this
  );
}
function Zl(e) {
  const t = re(this),
    { has: n, get: o } = Co(t);
  let l = n.call(t, e);
  l || ((e = re(e)), (l = n.call(t, e))), o && o.call(t, e);
  const s = t.delete(e);
  return l && ht(t, "delete", e, void 0), s;
}
function Ql() {
  const e = re(this),
    t = e.size !== 0,
    n = e.clear();
  return t && ht(e, "clear", void 0, void 0), n;
}
function zn(e, t) {
  return function (o, l) {
    const s = this,
      r = s.__v_raw,
      i = re(r),
      a = t ? Al : e ? Bl : Sn;
    return (
      !e && He(i, "iterate", Ht), r.forEach((c, f) => o.call(l, a(c), a(f), s))
    );
  };
}
function jn(e, t, n) {
  return function (...o) {
    const l = this.__v_raw,
      s = re(l),
      r = tn(s),
      i = e === "entries" || (e === Symbol.iterator && r),
      a = e === "keys" && r,
      c = l[e](...o),
      f = n ? Al : t ? Bl : Sn;
    return (
      !t && He(s, "iterate", a ? ll : Ht),
      {
        next() {
          const { value: d, done: g } = c.next();
          return g
            ? { value: d, done: g }
            : { value: i ? [f(d[0]), f(d[1])] : f(d), done: g };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function _t(e) {
  return function (...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function aa() {
  const e = {
      get(s) {
        return Fn(this, s);
      },
      get size() {
        return Hn(this);
      },
      has: Vn,
      add: ql,
      set: Xl,
      delete: Zl,
      clear: Ql,
      forEach: zn(!1, !1),
    },
    t = {
      get(s) {
        return Fn(this, s, !1, !0);
      },
      get size() {
        return Hn(this);
      },
      has: Vn,
      add: ql,
      set: Xl,
      delete: Zl,
      clear: Ql,
      forEach: zn(!1, !0),
    },
    n = {
      get(s) {
        return Fn(this, s, !0);
      },
      get size() {
        return Hn(this, !0);
      },
      has(s) {
        return Vn.call(this, s, !0);
      },
      add: _t("add"),
      set: _t("set"),
      delete: _t("delete"),
      clear: _t("clear"),
      forEach: zn(!0, !1),
    },
    o = {
      get(s) {
        return Fn(this, s, !0, !0);
      },
      get size() {
        return Hn(this, !0);
      },
      has(s) {
        return Vn.call(this, s, !0);
      },
      add: _t("add"),
      set: _t("set"),
      delete: _t("delete"),
      clear: _t("clear"),
      forEach: zn(!0, !0),
    };
  return (
    ["keys", "values", "entries", Symbol.iterator].forEach((s) => {
      (e[s] = jn(s, !1, !1)),
        (n[s] = jn(s, !0, !1)),
        (t[s] = jn(s, !1, !0)),
        (o[s] = jn(s, !0, !0));
    }),
    [e, n, t, o]
  );
}
const [ca, ua, fa, da] = aa();
function Pl(e, t) {
  const n = t ? (e ? da : fa) : e ? ua : ca;
  return (o, l, s) =>
    l === "__v_isReactive"
      ? !e
      : l === "__v_isReadonly"
        ? e
        : l === "__v_raw"
          ? o
          : Reflect.get(le(n, l) && l in o ? n : o, l, s);
}
const ha = { get: Pl(!1, !1) },
  ga = { get: Pl(!1, !0) },
  ma = { get: Pl(!0, !1) },
  yr = new WeakMap(),
  _r = new WeakMap(),
  xr = new WeakMap(),
  va = new WeakMap();
function pa(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function ba(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : pa(Vi(e));
}
function pt(e) {
  return sn(e) ? e : Il(e, !1, sa, ha, yr);
}
function ya(e) {
  return Il(e, !1, ia, ga, _r);
}
function Cr(e) {
  return Il(e, !0, ra, ma, xr);
}
function Il(e, t, n, o, l) {
  if (!ve(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const s = l.get(e);
  if (s) return s;
  const r = ba(e);
  if (r === 0) return e;
  const i = new Proxy(e, r === 2 ? o : n);
  return l.set(e, i), i;
}
function nn(e) {
  return sn(e) ? nn(e.__v_raw) : !!(e && e.__v_isReactive);
}
function sn(e) {
  return !!(e && e.__v_isReadonly);
}
function ro(e) {
  return !!(e && e.__v_isShallow);
}
function wr(e) {
  return nn(e) || sn(e);
}
function re(e) {
  const t = e && e.__v_raw;
  return t ? re(t) : e;
}
function Sr(e) {
  return Object.isExtensible(e) && so(e, "__v_skip", !0), e;
}
const Sn = (e) => (ve(e) ? pt(e) : e),
  Bl = (e) => (ve(e) ? Cr(e) : e);
class Er {
  constructor(t, n, o, l) {
    (this.getter = t),
      (this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this.__v_isReadonly = !1),
      (this.effect = new El(
        () => t(this._value),
        () => Qn(this, this.effect._dirtyLevel === 2 ? 2 : 3),
      )),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !l),
      (this.__v_isReadonly = o);
  }
  get value() {
    const t = re(this);
    return (
      (!t._cacheable || t.effect.dirty) &&
        It(t._value, (t._value = t.effect.run())) &&
        Qn(t, 4),
      Tr(t),
      t.effect._dirtyLevel >= 2 && Qn(t, 2),
      t._value
    );
  }
  set value(t) {
    this._setter(t);
  }
  get _dirty() {
    return this.effect.dirty;
  }
  set _dirty(t) {
    this.effect.dirty = t;
  }
}
function _a(e, t, n = !1) {
  let o, l;
  const s = X(e);
  return (
    s ? ((o = e), (l = Ye)) : ((o = e.get), (l = e.set)),
    new Er(o, l, s || !l, n)
  );
}
function Tr(e) {
  var t;
  At &&
    Vt &&
    ((e = re(e)),
    hr(
      Vt,
      (t = e.dep) != null
        ? t
        : (e.dep = mr(() => (e.dep = void 0), e instanceof Er ? e : void 0)),
    ));
}
function Qn(e, t = 4, n) {
  e = re(e);
  const o = e.dep;
  o && gr(o, t);
}
function Me(e) {
  return !!(e && e.__v_isRef === !0);
}
function L(e) {
  return xa(e, !1);
}
function xa(e, t) {
  return Me(e) ? e : new Ca(e, t);
}
class Ca {
  constructor(t, n) {
    (this.__v_isShallow = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = n ? t : re(t)),
      (this._value = n ? t : Sn(t));
  }
  get value() {
    return Tr(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || ro(t) || sn(t);
    (t = n ? t : re(t)),
      It(t, this._rawValue) &&
        ((this._rawValue = t), (this._value = n ? t : Sn(t)), Qn(this, 4));
  }
}
function rn(e) {
  return Me(e) ? e.value : e;
}
const wa = {
  get: (e, t, n) => rn(Reflect.get(e, t, n)),
  set: (e, t, n, o) => {
    const l = e[t];
    return Me(l) && !Me(n) ? ((l.value = n), !0) : Reflect.set(e, t, n, o);
  },
};
function Or(e) {
  return nn(e) ? e : new Proxy(e, wa);
}
/**
 * @vue/runtime-core v3.4.21
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ function Pt(e, t, n, o) {
  try {
    return o ? e(...o) : e();
  } catch (l) {
    wo(l, t, n);
  }
}
function qe(e, t, n, o) {
  if (X(e)) {
    const s = Pt(e, t, n, o);
    return (
      s &&
        sr(s) &&
        s.catch((r) => {
          wo(r, t, n);
        }),
      s
    );
  }
  const l = [];
  for (let s = 0; s < e.length; s++) l.push(qe(e[s], t, n, o));
  return l;
}
function wo(e, t, n, o = !0) {
  const l = t ? t.vnode : null;
  if (t) {
    let s = t.parent;
    const r = t.proxy,
      i = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; s; ) {
      const c = s.ec;
      if (c) {
        for (let f = 0; f < c.length; f++) if (c[f](e, r, i) === !1) return;
      }
      s = s.parent;
    }
    const a = t.appContext.config.errorHandler;
    if (a) {
      Pt(a, null, 10, [e, r, i]);
      return;
    }
  }
  Sa(e, n, l, o);
}
function Sa(e, t, n, o = !0) {
  console.error(e);
}
let En = !1,
  sl = !1;
const $e = [];
let it = 0;
const on = [];
let St = null,
  Dt = 0;
const Ar = Promise.resolve();
let $l = null;
function Ge(e) {
  const t = $l || Ar;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Ea(e) {
  let t = it + 1,
    n = $e.length;
  for (; t < n; ) {
    const o = (t + n) >>> 1,
      l = $e[o],
      s = Tn(l);
    s < e || (s === e && l.pre) ? (t = o + 1) : (n = o);
  }
  return t;
}
function kl(e) {
  (!$e.length || !$e.includes(e, En && e.allowRecurse ? it + 1 : it)) &&
    (e.id == null ? $e.push(e) : $e.splice(Ea(e.id), 0, e), Pr());
}
function Pr() {
  !En && !sl && ((sl = !0), ($l = Ar.then(Br)));
}
function Ta(e) {
  const t = $e.indexOf(e);
  t > it && $e.splice(t, 1);
}
function Oa(e) {
  J(e)
    ? on.push(...e)
    : (!St || !St.includes(e, e.allowRecurse ? Dt + 1 : Dt)) && on.push(e),
    Pr();
}
function es(e, t, n = En ? it + 1 : 0) {
  for (; n < $e.length; n++) {
    const o = $e[n];
    if (o && o.pre) {
      if (e && o.id !== e.uid) continue;
      $e.splice(n, 1), n--, o();
    }
  }
}
function Ir(e) {
  if (on.length) {
    const t = [...new Set(on)].sort((n, o) => Tn(n) - Tn(o));
    if (((on.length = 0), St)) {
      St.push(...t);
      return;
    }
    for (St = t, Dt = 0; Dt < St.length; Dt++) St[Dt]();
    (St = null), (Dt = 0);
  }
}
const Tn = (e) => (e.id == null ? 1 / 0 : e.id),
  Aa = (e, t) => {
    const n = Tn(e) - Tn(t);
    if (n === 0) {
      if (e.pre && !t.pre) return -1;
      if (t.pre && !e.pre) return 1;
    }
    return n;
  };
function Br(e) {
  (sl = !1), (En = !0), $e.sort(Aa);
  try {
    for (it = 0; it < $e.length; it++) {
      const t = $e[it];
      t && t.active !== !1 && Pt(t, null, 14);
    }
  } finally {
    (it = 0),
      ($e.length = 0),
      Ir(),
      (En = !1),
      ($l = null),
      ($e.length || on.length) && Br();
  }
}
function Pa(e, t, ...n) {
  if (e.isUnmounted) return;
  const o = e.vnode.props || me;
  let l = n;
  const s = t.startsWith("update:"),
    r = s && t.slice(7);
  if (r && r in o) {
    const f = `${r === "modelValue" ? "model" : r}Modifiers`,
      { number: d, trim: g } = o[f] || me;
    g && (l = n.map((_) => (ye(_) ? _.trim() : _))), d && (l = n.map(ji));
  }
  let i,
    a = o[(i = Fo(t))] || o[(i = Fo(at(t)))];
  !a && s && (a = o[(i = Fo(jt(t)))]), a && qe(a, e, 6, l);
  const c = o[i + "Once"];
  if (c) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[i]) return;
    (e.emitted[i] = !0), qe(c, e, 6, l);
  }
}
function $r(e, t, n = !1) {
  const o = t.emitsCache,
    l = o.get(e);
  if (l !== void 0) return l;
  const s = e.emits;
  let r = {},
    i = !1;
  if (!X(e)) {
    const a = (c) => {
      const f = $r(c, t, !0);
      f && ((i = !0), Ee(r, f));
    };
    !n && t.mixins.length && t.mixins.forEach(a),
      e.extends && a(e.extends),
      e.mixins && e.mixins.forEach(a);
  }
  return !s && !i
    ? (ve(e) && o.set(e, null), null)
    : (J(s) ? s.forEach((a) => (r[a] = null)) : Ee(r, s),
      ve(e) && o.set(e, r),
      r);
}
function So(e, t) {
  return !e || !bo(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, "")),
      le(e, t[0].toLowerCase() + t.slice(1)) || le(e, jt(t)) || le(e, t));
}
let Re = null,
  kr = null;
function io(e) {
  const t = Re;
  return (Re = e), (kr = (e && e.type.__scopeId) || null), t;
}
function Ce(e, t = Re, n) {
  if (!t || e._n) return e;
  const o = (...l) => {
    o._d && gs(-1);
    const s = io(t);
    let r;
    try {
      r = e(...l);
    } finally {
      io(s), o._d && gs(1);
    }
    return r;
  };
  return (o._n = !0), (o._c = !0), (o._d = !0), o;
}
function zo(e) {
  const {
    type: t,
    vnode: n,
    proxy: o,
    withProxy: l,
    props: s,
    propsOptions: [r],
    slots: i,
    attrs: a,
    emit: c,
    render: f,
    renderCache: d,
    data: g,
    setupState: _,
    ctx: E,
    inheritAttrs: T,
  } = e;
  let $, A;
  const V = io(e);
  try {
    if (n.shapeFlag & 4) {
      const F = l || o,
        U = F;
      ($ = rt(f.call(U, F, d, s, _, g, E))), (A = a);
    } else {
      const F = t;
      ($ = rt(
        F.length > 1 ? F(s, { attrs: a, slots: i, emit: c }) : F(s, null),
      )),
        (A = t.props ? a : Ia(a));
    }
  } catch (F) {
    (xn.length = 0), wo(F, e, 1), ($ = p(tt));
  }
  let D = $;
  if (A && T !== !1) {
    const F = Object.keys(A),
      { shapeFlag: U } = D;
    F.length && U & 7 && (r && F.some(xl) && (A = Ba(A, r)), (D = Bt(D, A)));
  }
  return (
    n.dirs && ((D = Bt(D)), (D.dirs = D.dirs ? D.dirs.concat(n.dirs) : n.dirs)),
    n.transition && (D.transition = n.transition),
    ($ = D),
    io(V),
    $
  );
}
const Ia = (e) => {
    let t;
    for (const n in e)
      (n === "class" || n === "style" || bo(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  },
  Ba = (e, t) => {
    const n = {};
    for (const o in e) (!xl(o) || !(o.slice(9) in t)) && (n[o] = e[o]);
    return n;
  };
function $a(e, t, n) {
  const { props: o, children: l, component: s } = e,
    { props: r, children: i, patchFlag: a } = t,
    c = s.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && a >= 0) {
    if (a & 1024) return !0;
    if (a & 16) return o ? ts(o, r, c) : !!r;
    if (a & 8) {
      const f = t.dynamicProps;
      for (let d = 0; d < f.length; d++) {
        const g = f[d];
        if (r[g] !== o[g] && !So(c, g)) return !0;
      }
    }
  } else
    return (l || i) && (!i || !i.$stable)
      ? !0
      : o === r
        ? !1
        : o
          ? r
            ? ts(o, r, c)
            : !0
          : !!r;
  return !1;
}
function ts(e, t, n) {
  const o = Object.keys(t);
  if (o.length !== Object.keys(e).length) return !0;
  for (let l = 0; l < o.length; l++) {
    const s = o[l];
    if (t[s] !== e[s] && !So(n, s)) return !0;
  }
  return !1;
}
function ka({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const o = t.subTree;
    if ((o.suspense && o.suspense.activeBranch === e && (o.el = e.el), o === e))
      ((e = t.vnode).el = n), (t = t.parent);
    else break;
  }
}
const Nr = "components";
function ke(e, t) {
  return Ra(Nr, e, !0, t) || e;
}
const Na = Symbol.for("v-ndc");
function Ra(e, t, n = !0, o = !1) {
  const l = Re || Pe;
  if (l) {
    const s = l.type;
    if (e === Nr) {
      const i = Ic(s, !1);
      if (i && (i === t || i === at(t) || i === xo(at(t)))) return s;
    }
    const r = ns(l[e] || s[e], t) || ns(l.appContext[e], t);
    return !r && o ? s : r;
  }
}
function ns(e, t) {
  return e && (e[t] || e[at(t)] || e[xo(at(t))]);
}
const Ma = (e) => e.__isSuspense;
function Da(e, t) {
  t && t.pendingBranch
    ? J(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : Oa(e);
}
const La = Symbol.for("v-scx"),
  Fa = () => gt(La);
function Rr(e, t) {
  return Nl(e, null, t);
}
const Un = {};
function we(e, t, n) {
  return Nl(e, t, n);
}
function Nl(
  e,
  t,
  { immediate: n, deep: o, flush: l, once: s, onTrack: r, onTrigger: i } = me,
) {
  if (t && s) {
    const P = t;
    t = (...K) => {
      P(...K), U();
    };
  }
  const a = Pe,
    c = (P) => (o === !0 ? P : Ft(P, o === !1 ? 1 : void 0));
  let f,
    d = !1,
    g = !1;
  if (
    (Me(e)
      ? ((f = () => e.value), (d = ro(e)))
      : nn(e)
        ? ((f = () => c(e)), (d = !0))
        : J(e)
          ? ((g = !0),
            (d = e.some((P) => nn(P) || ro(P))),
            (f = () =>
              e.map((P) => {
                if (Me(P)) return P.value;
                if (nn(P)) return c(P);
                if (X(P)) return Pt(P, a, 2);
              })))
          : X(e)
            ? t
              ? (f = () => Pt(e, a, 2))
              : (f = () => (_ && _(), qe(e, a, 3, [E])))
            : (f = Ye),
    t && o)
  ) {
    const P = f;
    f = () => Ft(P());
  }
  let _,
    E = (P) => {
      _ = D.onStop = () => {
        Pt(P, a, 4), (_ = D.onStop = void 0);
      };
    },
    T;
  if (Bo)
    if (
      ((E = Ye),
      t ? n && qe(t, a, 3, [f(), g ? [] : void 0, E]) : f(),
      l === "sync")
    ) {
      const P = Fa();
      T = P.__watcherHandles || (P.__watcherHandles = []);
    } else return Ye;
  let $ = g ? new Array(e.length).fill(Un) : Un;
  const A = () => {
    if (!(!D.active || !D.dirty))
      if (t) {
        const P = D.run();
        (o || d || (g ? P.some((K, N) => It(K, $[N])) : It(P, $))) &&
          (_ && _(),
          qe(t, a, 3, [P, $ === Un ? void 0 : g && $[0] === Un ? [] : $, E]),
          ($ = P));
      } else D.run();
  };
  A.allowRecurse = !!t;
  let V;
  l === "sync"
    ? (V = A)
    : l === "post"
      ? (V = () => Fe(A, a && a.suspense))
      : ((A.pre = !0), a && (A.id = a.uid), (V = () => kl(A)));
  const D = new El(f, Ye, V),
    F = Qi(),
    U = () => {
      D.stop(), F && Cl(F.effects, D);
    };
  return (
    t
      ? n
        ? A()
        : ($ = D.run())
      : l === "post"
        ? Fe(D.run.bind(D), a && a.suspense)
        : D.run(),
    T && T.push(U),
    U
  );
}
function Va(e, t, n) {
  const o = this.proxy,
    l = ye(e) ? (e.includes(".") ? Mr(o, e) : () => o[e]) : e.bind(o, o);
  let s;
  X(t) ? (s = t) : ((s = t.handler), (n = t));
  const r = Nn(this),
    i = Nl(l, s.bind(o), n);
  return r(), i;
}
function Mr(e, t) {
  const n = t.split(".");
  return () => {
    let o = e;
    for (let l = 0; l < n.length && o; l++) o = o[n[l]];
    return o;
  };
}
function Ft(e, t, n = 0, o) {
  if (!ve(e) || e.__v_skip) return e;
  if (t && t > 0) {
    if (n >= t) return e;
    n++;
  }
  if (((o = o || new Set()), o.has(e))) return e;
  if ((o.add(e), Me(e))) Ft(e.value, t, n, o);
  else if (J(e)) for (let l = 0; l < e.length; l++) Ft(e[l], t, n, o);
  else if (lr(e) || tn(e))
    e.forEach((l) => {
      Ft(l, t, n, o);
    });
  else if (ir(e)) for (const l in e) Ft(e[l], t, n, o);
  return e;
}
function Dr(e, t) {
  if (Re === null) return e;
  const n = $o(Re) || Re.proxy,
    o = e.dirs || (e.dirs = []);
  for (let l = 0; l < t.length; l++) {
    let [s, r, i, a = me] = t[l];
    s &&
      (X(s) && (s = { mounted: s, updated: s }),
      s.deep && Ft(r),
      o.push({
        dir: s,
        instance: n,
        value: r,
        oldValue: void 0,
        arg: i,
        modifiers: a,
      }));
  }
  return e;
}
function kt(e, t, n, o) {
  const l = e.dirs,
    s = t && t.dirs;
  for (let r = 0; r < l.length; r++) {
    const i = l[r];
    s && (i.oldValue = s[r].value);
    let a = i.dir[o];
    a && (Ut(), qe(a, n, 8, [e.el, i, e, t]), Kt());
  }
}
const Et = Symbol("_leaveCb"),
  Kn = Symbol("_enterCb");
function Ha() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: new Map(),
  };
  return (
    yt(() => {
      e.isMounted = !0;
    }),
    $n(() => {
      e.isUnmounting = !0;
    }),
    e
  );
}
const We = [Function, Array],
  Lr = {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    onBeforeEnter: We,
    onEnter: We,
    onAfterEnter: We,
    onEnterCancelled: We,
    onBeforeLeave: We,
    onLeave: We,
    onAfterLeave: We,
    onLeaveCancelled: We,
    onBeforeAppear: We,
    onAppear: We,
    onAfterAppear: We,
    onAppearCancelled: We,
  },
  za = {
    name: "BaseTransition",
    props: Lr,
    setup(e, { slots: t }) {
      const n = Wt(),
        o = Ha();
      return () => {
        const l = t.default && Vr(t.default(), !0);
        if (!l || !l.length) return;
        let s = l[0];
        if (l.length > 1) {
          for (const g of l)
            if (g.type !== tt) {
              s = g;
              break;
            }
        }
        const r = re(e),
          { mode: i } = r;
        if (o.isLeaving) return jo(s);
        const a = os(s);
        if (!a) return jo(s);
        const c = rl(a, r, o, n);
        il(a, c);
        const f = n.subTree,
          d = f && os(f);
        if (d && d.type !== tt && !Lt(a, d)) {
          const g = rl(d, r, o, n);
          if ((il(d, g), i === "out-in"))
            return (
              (o.isLeaving = !0),
              (g.afterLeave = () => {
                (o.isLeaving = !1),
                  n.update.active !== !1 && ((n.effect.dirty = !0), n.update());
              }),
              jo(s)
            );
          i === "in-out" &&
            a.type !== tt &&
            (g.delayLeave = (_, E, T) => {
              const $ = Fr(o, d);
              ($[String(d.key)] = d),
                (_[Et] = () => {
                  E(), (_[Et] = void 0), delete c.delayedLeave;
                }),
                (c.delayedLeave = T);
            });
        }
        return s;
      };
    },
  },
  ja = za;
function Fr(e, t) {
  const { leavingVNodes: n } = e;
  let o = n.get(t.type);
  return o || ((o = Object.create(null)), n.set(t.type, o)), o;
}
function rl(e, t, n, o) {
  const {
      appear: l,
      mode: s,
      persisted: r = !1,
      onBeforeEnter: i,
      onEnter: a,
      onAfterEnter: c,
      onEnterCancelled: f,
      onBeforeLeave: d,
      onLeave: g,
      onAfterLeave: _,
      onLeaveCancelled: E,
      onBeforeAppear: T,
      onAppear: $,
      onAfterAppear: A,
      onAppearCancelled: V,
    } = t,
    D = String(e.key),
    F = Fr(n, e),
    U = (N, W) => {
      N && qe(N, o, 9, W);
    },
    P = (N, W) => {
      const R = W[1];
      U(N, W),
        J(N) ? N.every((m) => m.length <= 1) && R() : N.length <= 1 && R();
    },
    K = {
      mode: s,
      persisted: r,
      beforeEnter(N) {
        let W = i;
        if (!n.isMounted)
          if (l) W = T || i;
          else return;
        N[Et] && N[Et](!0);
        const R = F[D];
        R && Lt(e, R) && R.el[Et] && R.el[Et](), U(W, [N]);
      },
      enter(N) {
        let W = a,
          R = c,
          m = f;
        if (!n.isMounted)
          if (l) (W = $ || a), (R = A || c), (m = V || f);
          else return;
        let b = !1;
        const I = (N[Kn] = (G) => {
          b ||
            ((b = !0),
            G ? U(m, [N]) : U(R, [N]),
            K.delayedLeave && K.delayedLeave(),
            (N[Kn] = void 0));
        });
        W ? P(W, [N, I]) : I();
      },
      leave(N, W) {
        const R = String(e.key);
        if ((N[Kn] && N[Kn](!0), n.isUnmounting)) return W();
        U(d, [N]);
        let m = !1;
        const b = (N[Et] = (I) => {
          m ||
            ((m = !0),
            W(),
            I ? U(E, [N]) : U(_, [N]),
            (N[Et] = void 0),
            F[R] === e && delete F[R]);
        });
        (F[R] = e), g ? P(g, [N, b]) : b();
      },
      clone(N) {
        return rl(N, t, n, o);
      },
    };
  return K;
}
function jo(e) {
  if (Eo(e)) return (e = Bt(e)), (e.children = null), e;
}
function os(e) {
  return Eo(e) ? (e.children ? e.children[0] : void 0) : e;
}
function il(e, t) {
  e.shapeFlag & 6 && e.component
    ? il(e.component.subTree, t)
    : e.shapeFlag & 128
      ? ((e.ssContent.transition = t.clone(e.ssContent)),
        (e.ssFallback.transition = t.clone(e.ssFallback)))
      : (e.transition = t);
}
function Vr(e, t = !1, n) {
  let o = [],
    l = 0;
  for (let s = 0; s < e.length; s++) {
    let r = e[s];
    const i = n == null ? r.key : String(n) + String(r.key != null ? r.key : s);
    r.type === Ve
      ? (r.patchFlag & 128 && l++, (o = o.concat(Vr(r.children, t, i))))
      : (t || r.type !== tt) && o.push(i != null ? Bt(r, { key: i }) : r);
  }
  if (l > 1) for (let s = 0; s < o.length; s++) o[s].patchFlag = -2;
  return o;
}
/*! #__NO_SIDE_EFFECTS__ */ function ge(e, t) {
  return X(e) ? Ee({ name: e.name }, t, { setup: e }) : e;
}
const eo = (e) => !!e.type.__asyncLoader,
  Eo = (e) => e.type.__isKeepAlive;
function To(e, t) {
  Hr(e, "a", t);
}
function Bn(e, t) {
  Hr(e, "da", t);
}
function Hr(e, t, n = Pe) {
  const o =
    e.__wdc ||
    (e.__wdc = () => {
      let l = n;
      for (; l; ) {
        if (l.isDeactivated) return;
        l = l.parent;
      }
      return e();
    });
  if ((Oo(t, o, n), n)) {
    let l = n.parent;
    for (; l && l.parent; )
      Eo(l.parent.vnode) && Ua(o, t, n, l), (l = l.parent);
  }
}
function Ua(e, t, n, o) {
  const l = Oo(t, e, o, !0);
  Ao(() => {
    Cl(o[t], l);
  }, n);
}
function Oo(e, t, n = Pe, o = !1) {
  if (n) {
    const l = n[e] || (n[e] = []),
      s =
        t.__weh ||
        (t.__weh = (...r) => {
          if (n.isUnmounted) return;
          Ut();
          const i = Nn(n),
            a = qe(t, n, e, r);
          return i(), Kt(), a;
        });
    return o ? l.unshift(s) : l.push(s), s;
  }
}
const bt =
    (e) =>
    (t, n = Pe) =>
      (!Bo || e === "sp") && Oo(e, (...o) => t(...o), n),
  Ka = bt("bm"),
  yt = bt("m"),
  Wa = bt("bu"),
  zr = bt("u"),
  $n = bt("bum"),
  Ao = bt("um"),
  Ja = bt("sp"),
  Ya = bt("rtg"),
  Ga = bt("rtc");
function qa(e, t = Pe) {
  Oo("ec", e, t);
}
function Xa(e, t, n, o) {
  let l;
  const s = n && n[o];
  if (J(e) || ye(e)) {
    l = new Array(e.length);
    for (let r = 0, i = e.length; r < i; r++)
      l[r] = t(e[r], r, void 0, s && s[r]);
  } else if (typeof e == "number") {
    l = new Array(e);
    for (let r = 0; r < e; r++) l[r] = t(r + 1, r, void 0, s && s[r]);
  } else if (ve(e))
    if (e[Symbol.iterator])
      l = Array.from(e, (r, i) => t(r, i, void 0, s && s[i]));
    else {
      const r = Object.keys(e);
      l = new Array(r.length);
      for (let i = 0, a = r.length; i < a; i++) {
        const c = r[i];
        l[i] = t(e[c], c, i, s && s[i]);
      }
    }
  else l = [];
  return n && (n[o] = l), l;
}
const al = (e) => (e ? (ei(e) ? $o(e) || e.proxy : al(e.parent)) : null),
  bn = Ee(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => al(e.parent),
    $root: (e) => al(e.root),
    $emit: (e) => e.emit,
    $options: (e) => Rl(e),
    $forceUpdate: (e) =>
      e.f ||
      (e.f = () => {
        (e.effect.dirty = !0), kl(e.update);
      }),
    $nextTick: (e) => e.n || (e.n = Ge.bind(e.proxy)),
    $watch: (e) => Va.bind(e),
  }),
  Uo = (e, t) => e !== me && !e.__isScriptSetup && le(e, t),
  Za = {
    get({ _: e }, t) {
      const {
        ctx: n,
        setupState: o,
        data: l,
        props: s,
        accessCache: r,
        type: i,
        appContext: a,
      } = e;
      let c;
      if (t[0] !== "$") {
        const _ = r[t];
        if (_ !== void 0)
          switch (_) {
            case 1:
              return o[t];
            case 2:
              return l[t];
            case 4:
              return n[t];
            case 3:
              return s[t];
          }
        else {
          if (Uo(o, t)) return (r[t] = 1), o[t];
          if (l !== me && le(l, t)) return (r[t] = 2), l[t];
          if ((c = e.propsOptions[0]) && le(c, t)) return (r[t] = 3), s[t];
          if (n !== me && le(n, t)) return (r[t] = 4), n[t];
          cl && (r[t] = 0);
        }
      }
      const f = bn[t];
      let d, g;
      if (f) return t === "$attrs" && He(e, "get", t), f(e);
      if ((d = i.__cssModules) && (d = d[t])) return d;
      if (n !== me && le(n, t)) return (r[t] = 4), n[t];
      if (((g = a.config.globalProperties), le(g, t))) return g[t];
    },
    set({ _: e }, t, n) {
      const { data: o, setupState: l, ctx: s } = e;
      return Uo(l, t)
        ? ((l[t] = n), !0)
        : o !== me && le(o, t)
          ? ((o[t] = n), !0)
          : le(e.props, t) || (t[0] === "$" && t.slice(1) in e)
            ? !1
            : ((s[t] = n), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: o,
          appContext: l,
          propsOptions: s,
        },
      },
      r,
    ) {
      let i;
      return (
        !!n[r] ||
        (e !== me && le(e, r)) ||
        Uo(t, r) ||
        ((i = s[0]) && le(i, r)) ||
        le(o, r) ||
        le(bn, r) ||
        le(l.config.globalProperties, r)
      );
    },
    defineProperty(e, t, n) {
      return (
        n.get != null
          ? (e._.accessCache[t] = 0)
          : le(n, "value") && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      );
    },
  };
function ls(e) {
  return J(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e;
}
let cl = !0;
function Qa(e) {
  const t = Rl(e),
    n = e.proxy,
    o = e.ctx;
  (cl = !1), t.beforeCreate && ss(t.beforeCreate, e, "bc");
  const {
    data: l,
    computed: s,
    methods: r,
    watch: i,
    provide: a,
    inject: c,
    created: f,
    beforeMount: d,
    mounted: g,
    beforeUpdate: _,
    updated: E,
    activated: T,
    deactivated: $,
    beforeDestroy: A,
    beforeUnmount: V,
    destroyed: D,
    unmounted: F,
    render: U,
    renderTracked: P,
    renderTriggered: K,
    errorCaptured: N,
    serverPrefetch: W,
    expose: R,
    inheritAttrs: m,
    components: b,
    directives: I,
    filters: G,
  } = t;
  if ((c && ec(c, o, null), r))
    for (const ie in r) {
      const oe = r[ie];
      X(oe) && (o[ie] = oe.bind(n));
    }
  if (l) {
    const ie = l.call(n, n);
    ve(ie) && (e.data = pt(ie));
  }
  if (((cl = !0), s))
    for (const ie in s) {
      const oe = s[ie],
        Ie = X(oe) ? oe.bind(n, n) : X(oe.get) ? oe.get.bind(n, n) : Ye,
        Xe = !X(oe) && X(oe.set) ? oe.set.bind(n) : Ye,
        De = se({ get: Ie, set: Xe });
      Object.defineProperty(o, ie, {
        enumerable: !0,
        configurable: !0,
        get: () => De.value,
        set: (Be) => (De.value = Be),
      });
    }
  if (i) for (const ie in i) jr(i[ie], o, n, ie);
  if (a) {
    const ie = X(a) ? a.call(n) : a;
    Reflect.ownKeys(ie).forEach((oe) => {
      kn(oe, ie[oe]);
    });
  }
  f && ss(f, e, "c");
  function ne(ie, oe) {
    J(oe) ? oe.forEach((Ie) => ie(Ie.bind(n))) : oe && ie(oe.bind(n));
  }
  if (
    (ne(Ka, d),
    ne(yt, g),
    ne(Wa, _),
    ne(zr, E),
    ne(To, T),
    ne(Bn, $),
    ne(qa, N),
    ne(Ga, P),
    ne(Ya, K),
    ne($n, V),
    ne(Ao, F),
    ne(Ja, W),
    J(R))
  )
    if (R.length) {
      const ie = e.exposed || (e.exposed = {});
      R.forEach((oe) => {
        Object.defineProperty(ie, oe, {
          get: () => n[oe],
          set: (Ie) => (n[oe] = Ie),
        });
      });
    } else e.exposed || (e.exposed = {});
  U && e.render === Ye && (e.render = U),
    m != null && (e.inheritAttrs = m),
    b && (e.components = b),
    I && (e.directives = I);
}
function ec(e, t, n = Ye) {
  J(e) && (e = ul(e));
  for (const o in e) {
    const l = e[o];
    let s;
    ve(l)
      ? "default" in l
        ? (s = gt(l.from || o, l.default, !0))
        : (s = gt(l.from || o))
      : (s = gt(l)),
      Me(s)
        ? Object.defineProperty(t, o, {
            enumerable: !0,
            configurable: !0,
            get: () => s.value,
            set: (r) => (s.value = r),
          })
        : (t[o] = s);
  }
}
function ss(e, t, n) {
  qe(J(e) ? e.map((o) => o.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function jr(e, t, n, o) {
  const l = o.includes(".") ? Mr(n, o) : () => n[o];
  if (ye(e)) {
    const s = t[e];
    X(s) && we(l, s);
  } else if (X(e)) we(l, e.bind(n));
  else if (ve(e))
    if (J(e)) e.forEach((s) => jr(s, t, n, o));
    else {
      const s = X(e.handler) ? e.handler.bind(n) : t[e.handler];
      X(s) && we(l, s, e);
    }
}
function Rl(e) {
  const t = e.type,
    { mixins: n, extends: o } = t,
    {
      mixins: l,
      optionsCache: s,
      config: { optionMergeStrategies: r },
    } = e.appContext,
    i = s.get(t);
  let a;
  return (
    i
      ? (a = i)
      : !l.length && !n && !o
        ? (a = t)
        : ((a = {}),
          l.length && l.forEach((c) => ao(a, c, r, !0)),
          ao(a, t, r)),
    ve(t) && s.set(t, a),
    a
  );
}
function ao(e, t, n, o = !1) {
  const { mixins: l, extends: s } = t;
  s && ao(e, s, n, !0), l && l.forEach((r) => ao(e, r, n, !0));
  for (const r in t)
    if (!(o && r === "expose")) {
      const i = tc[r] || (n && n[r]);
      e[r] = i ? i(e[r], t[r]) : t[r];
    }
  return e;
}
const tc = {
  data: rs,
  props: is,
  emits: is,
  methods: vn,
  computed: vn,
  beforeCreate: Ne,
  created: Ne,
  beforeMount: Ne,
  mounted: Ne,
  beforeUpdate: Ne,
  updated: Ne,
  beforeDestroy: Ne,
  beforeUnmount: Ne,
  destroyed: Ne,
  unmounted: Ne,
  activated: Ne,
  deactivated: Ne,
  errorCaptured: Ne,
  serverPrefetch: Ne,
  components: vn,
  directives: vn,
  watch: oc,
  provide: rs,
  inject: nc,
};
function rs(e, t) {
  return t
    ? e
      ? function () {
          return Ee(
            X(e) ? e.call(this, this) : e,
            X(t) ? t.call(this, this) : t,
          );
        }
      : t
    : e;
}
function nc(e, t) {
  return vn(ul(e), ul(t));
}
function ul(e) {
  if (J(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Ne(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function vn(e, t) {
  return e ? Ee(Object.create(null), e, t) : t;
}
function is(e, t) {
  return e
    ? J(e) && J(t)
      ? [...new Set([...e, ...t])]
      : Ee(Object.create(null), ls(e), ls(t ?? {}))
    : t;
}
function oc(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Ee(Object.create(null), e);
  for (const o in t) n[o] = Ne(e[o], t[o]);
  return n;
}
function Ur() {
  return {
    app: null,
    config: {
      isNativeTag: Li,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let lc = 0;
function sc(e, t) {
  return function (o, l = null) {
    X(o) || (o = Ee({}, o)), l != null && !ve(l) && (l = null);
    const s = Ur(),
      r = new WeakSet();
    let i = !1;
    const a = (s.app = {
      _uid: lc++,
      _component: o,
      _props: l,
      _container: null,
      _context: s,
      _instance: null,
      version: kc,
      get config() {
        return s.config;
      },
      set config(c) {},
      use(c, ...f) {
        return (
          r.has(c) ||
            (c && X(c.install)
              ? (r.add(c), c.install(a, ...f))
              : X(c) && (r.add(c), c(a, ...f))),
          a
        );
      },
      mixin(c) {
        return s.mixins.includes(c) || s.mixins.push(c), a;
      },
      component(c, f) {
        return f ? ((s.components[c] = f), a) : s.components[c];
      },
      directive(c, f) {
        return f ? ((s.directives[c] = f), a) : s.directives[c];
      },
      mount(c, f, d) {
        if (!i) {
          const g = p(o, l);
          return (
            (g.appContext = s),
            d === !0 ? (d = "svg") : d === !1 && (d = void 0),
            f && t ? t(g, c) : e(g, c, d),
            (i = !0),
            (a._container = c),
            (c.__vue_app__ = a),
            $o(g.component) || g.component.proxy
          );
        }
      },
      unmount() {
        i && (e(null, a._container), delete a._container.__vue_app__);
      },
      provide(c, f) {
        return (s.provides[c] = f), a;
      },
      runWithContext(c) {
        const f = yn;
        yn = a;
        try {
          return c();
        } finally {
          yn = f;
        }
      },
    });
    return a;
  };
}
let yn = null;
function kn(e, t) {
  if (Pe) {
    let n = Pe.provides;
    const o = Pe.parent && Pe.parent.provides;
    o === n && (n = Pe.provides = Object.create(o)), (n[e] = t);
  }
}
function gt(e, t, n = !1) {
  const o = Pe || Re;
  if (o || yn) {
    const l = o
      ? o.parent == null
        ? o.vnode.appContext && o.vnode.appContext.provides
        : o.parent.provides
      : yn._context.provides;
    if (l && e in l) return l[e];
    if (arguments.length > 1) return n && X(t) ? t.call(o && o.proxy) : t;
  }
}
function rc(e, t, n, o = !1) {
  const l = {},
    s = {};
  so(s, Io, 1), (e.propsDefaults = Object.create(null)), Kr(e, t, l, s);
  for (const r in e.propsOptions[0]) r in l || (l[r] = void 0);
  n ? (e.props = o ? l : ya(l)) : e.type.props ? (e.props = l) : (e.props = s),
    (e.attrs = s);
}
function ic(e, t, n, o) {
  const {
      props: l,
      attrs: s,
      vnode: { patchFlag: r },
    } = e,
    i = re(l),
    [a] = e.propsOptions;
  let c = !1;
  if ((o || r > 0) && !(r & 16)) {
    if (r & 8) {
      const f = e.vnode.dynamicProps;
      for (let d = 0; d < f.length; d++) {
        let g = f[d];
        if (So(e.emitsOptions, g)) continue;
        const _ = t[g];
        if (a)
          if (le(s, g)) _ !== s[g] && ((s[g] = _), (c = !0));
          else {
            const E = at(g);
            l[E] = fl(a, i, E, _, e, !1);
          }
        else _ !== s[g] && ((s[g] = _), (c = !0));
      }
    }
  } else {
    Kr(e, t, l, s) && (c = !0);
    let f;
    for (const d in i)
      (!t || (!le(t, d) && ((f = jt(d)) === d || !le(t, f)))) &&
        (a
          ? n &&
            (n[d] !== void 0 || n[f] !== void 0) &&
            (l[d] = fl(a, i, d, void 0, e, !0))
          : delete l[d]);
    if (s !== i)
      for (const d in s) (!t || !le(t, d)) && (delete s[d], (c = !0));
  }
  c && ht(e, "set", "$attrs");
}
function Kr(e, t, n, o) {
  const [l, s] = e.propsOptions;
  let r = !1,
    i;
  if (t)
    for (let a in t) {
      if (pn(a)) continue;
      const c = t[a];
      let f;
      l && le(l, (f = at(a)))
        ? !s || !s.includes(f)
          ? (n[f] = c)
          : ((i || (i = {}))[f] = c)
        : So(e.emitsOptions, a) ||
          ((!(a in o) || c !== o[a]) && ((o[a] = c), (r = !0)));
    }
  if (s) {
    const a = re(n),
      c = i || me;
    for (let f = 0; f < s.length; f++) {
      const d = s[f];
      n[d] = fl(l, a, d, c[d], e, !le(c, d));
    }
  }
  return r;
}
function fl(e, t, n, o, l, s) {
  const r = e[n];
  if (r != null) {
    const i = le(r, "default");
    if (i && o === void 0) {
      const a = r.default;
      if (r.type !== Function && !r.skipFactory && X(a)) {
        const { propsDefaults: c } = l;
        if (n in c) o = c[n];
        else {
          const f = Nn(l);
          (o = c[n] = a.call(null, t)), f();
        }
      } else o = a;
    }
    r[0] &&
      (s && !i ? (o = !1) : r[1] && (o === "" || o === jt(n)) && (o = !0));
  }
  return o;
}
function Wr(e, t, n = !1) {
  const o = t.propsCache,
    l = o.get(e);
  if (l) return l;
  const s = e.props,
    r = {},
    i = [];
  let a = !1;
  if (!X(e)) {
    const f = (d) => {
      a = !0;
      const [g, _] = Wr(d, t, !0);
      Ee(r, g), _ && i.push(..._);
    };
    !n && t.mixins.length && t.mixins.forEach(f),
      e.extends && f(e.extends),
      e.mixins && e.mixins.forEach(f);
  }
  if (!s && !a) return ve(e) && o.set(e, en), en;
  if (J(s))
    for (let f = 0; f < s.length; f++) {
      const d = at(s[f]);
      as(d) && (r[d] = me);
    }
  else if (s)
    for (const f in s) {
      const d = at(f);
      if (as(d)) {
        const g = s[f],
          _ = (r[d] = J(g) || X(g) ? { type: g } : Ee({}, g));
        if (_) {
          const E = fs(Boolean, _.type),
            T = fs(String, _.type);
          (_[0] = E > -1),
            (_[1] = T < 0 || E < T),
            (E > -1 || le(_, "default")) && i.push(d);
        }
      }
    }
  const c = [r, i];
  return ve(e) && o.set(e, c), c;
}
function as(e) {
  return e[0] !== "$" && !pn(e);
}
function cs(e) {
  return e === null
    ? "null"
    : typeof e == "function"
      ? e.name || ""
      : (typeof e == "object" && e.constructor && e.constructor.name) || "";
}
function us(e, t) {
  return cs(e) === cs(t);
}
function fs(e, t) {
  return J(t) ? t.findIndex((n) => us(n, e)) : X(t) && us(t, e) ? 0 : -1;
}
const Jr = (e) => e[0] === "_" || e === "$stable",
  Ml = (e) => (J(e) ? e.map(rt) : [rt(e)]),
  ac = (e, t, n) => {
    if (t._n) return t;
    const o = Ce((...l) => Ml(t(...l)), n);
    return (o._c = !1), o;
  },
  Yr = (e, t, n) => {
    const o = e._ctx;
    for (const l in e) {
      if (Jr(l)) continue;
      const s = e[l];
      if (X(s)) t[l] = ac(l, s, o);
      else if (s != null) {
        const r = Ml(s);
        t[l] = () => r;
      }
    }
  },
  Gr = (e, t) => {
    const n = Ml(t);
    e.slots.default = () => n;
  },
  cc = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const n = t._;
      n ? ((e.slots = re(t)), so(t, "_", n)) : Yr(t, (e.slots = {}));
    } else (e.slots = {}), t && Gr(e, t);
    so(e.slots, Io, 1);
  },
  uc = (e, t, n) => {
    const { vnode: o, slots: l } = e;
    let s = !0,
      r = me;
    if (o.shapeFlag & 32) {
      const i = t._;
      i
        ? n && i === 1
          ? (s = !1)
          : (Ee(l, t), !n && i === 1 && delete l._)
        : ((s = !t.$stable), Yr(t, l)),
        (r = t);
    } else t && (Gr(e, t), (r = { default: 1 }));
    if (s) for (const i in l) !Jr(i) && r[i] == null && delete l[i];
  };
function dl(e, t, n, o, l = !1) {
  if (J(e)) {
    e.forEach((g, _) => dl(g, t && (J(t) ? t[_] : t), n, o, l));
    return;
  }
  if (eo(o) && !l) return;
  const s = o.shapeFlag & 4 ? $o(o.component) || o.component.proxy : o.el,
    r = l ? null : s,
    { i, r: a } = e,
    c = t && t.r,
    f = i.refs === me ? (i.refs = {}) : i.refs,
    d = i.setupState;
  if (
    (c != null &&
      c !== a &&
      (ye(c)
        ? ((f[c] = null), le(d, c) && (d[c] = null))
        : Me(c) && (c.value = null)),
    X(a))
  )
    Pt(a, i, 12, [r, f]);
  else {
    const g = ye(a),
      _ = Me(a);
    if (g || _) {
      const E = () => {
        if (e.f) {
          const T = g ? (le(d, a) ? d[a] : f[a]) : a.value;
          l
            ? J(T) && Cl(T, s)
            : J(T)
              ? T.includes(s) || T.push(s)
              : g
                ? ((f[a] = [s]), le(d, a) && (d[a] = f[a]))
                : ((a.value = [s]), e.k && (f[e.k] = a.value));
        } else
          g
            ? ((f[a] = r), le(d, a) && (d[a] = r))
            : _ && ((a.value = r), e.k && (f[e.k] = r));
      };
      r ? ((E.id = -1), Fe(E, n)) : E();
    }
  }
}
const Fe = Da;
function fc(e) {
  return dc(e);
}
function dc(e, t) {
  const n = ar();
  n.__VUE__ = !0;
  const {
      insert: o,
      remove: l,
      patchProp: s,
      createElement: r,
      createText: i,
      createComment: a,
      setText: c,
      setElementText: f,
      parentNode: d,
      nextSibling: g,
      setScopeId: _ = Ye,
      insertStaticContent: E,
    } = e,
    T = (
      u,
      h,
      v,
      y = null,
      C = null,
      O = null,
      k = void 0,
      w = null,
      B = !!h.dynamicChildren,
    ) => {
      if (u === h) return;
      u && !Lt(u, h) && ((y = x(u)), Be(u, C, O, !0), (u = null)),
        h.patchFlag === -2 && ((B = !1), (h.dynamicChildren = null));
      const { type: S, ref: M, shapeFlag: j } = h;
      switch (S) {
        case Po:
          $(u, h, v, y);
          break;
        case tt:
          A(u, h, v, y);
          break;
        case to:
          u == null && V(h, v, y, k);
          break;
        case Ve:
          b(u, h, v, y, C, O, k, w, B);
          break;
        default:
          j & 1
            ? U(u, h, v, y, C, O, k, w, B)
            : j & 6
              ? I(u, h, v, y, C, O, k, w, B)
              : (j & 64 || j & 128) && S.process(u, h, v, y, C, O, k, w, B, ae);
      }
      M != null && C && dl(M, u && u.ref, O, h || u, !h);
    },
    $ = (u, h, v, y) => {
      if (u == null) o((h.el = i(h.children)), v, y);
      else {
        const C = (h.el = u.el);
        h.children !== u.children && c(C, h.children);
      }
    },
    A = (u, h, v, y) => {
      u == null ? o((h.el = a(h.children || "")), v, y) : (h.el = u.el);
    },
    V = (u, h, v, y) => {
      [u.el, u.anchor] = E(u.children, h, v, y, u.el, u.anchor);
    },
    D = ({ el: u, anchor: h }, v, y) => {
      let C;
      for (; u && u !== h; ) (C = g(u)), o(u, v, y), (u = C);
      o(h, v, y);
    },
    F = ({ el: u, anchor: h }) => {
      let v;
      for (; u && u !== h; ) (v = g(u)), l(u), (u = v);
      l(h);
    },
    U = (u, h, v, y, C, O, k, w, B) => {
      h.type === "svg" ? (k = "svg") : h.type === "math" && (k = "mathml"),
        u == null ? P(h, v, y, C, O, k, w, B) : W(u, h, C, O, k, w, B);
    },
    P = (u, h, v, y, C, O, k, w) => {
      let B, S;
      const { props: M, shapeFlag: j, transition: H, dirs: Y } = u;
      if (
        ((B = u.el = r(u.type, O, M && M.is, M)),
        j & 8
          ? f(B, u.children)
          : j & 16 && N(u.children, B, null, y, C, Ko(u, O), k, w),
        Y && kt(u, null, y, "created"),
        K(B, u, u.scopeId, k, y),
        M)
      ) {
        for (const ce in M)
          ce !== "value" &&
            !pn(ce) &&
            s(B, ce, null, M[ce], O, u.children, y, C, ze);
        "value" in M && s(B, "value", null, M.value, O),
          (S = M.onVnodeBeforeMount) && st(S, y, u);
      }
      Y && kt(u, null, y, "beforeMount");
      const ee = hc(C, H);
      ee && H.beforeEnter(B),
        o(B, h, v),
        ((S = M && M.onVnodeMounted) || ee || Y) &&
          Fe(() => {
            S && st(S, y, u), ee && H.enter(B), Y && kt(u, null, y, "mounted");
          }, C);
    },
    K = (u, h, v, y, C) => {
      if ((v && _(u, v), y)) for (let O = 0; O < y.length; O++) _(u, y[O]);
      if (C) {
        let O = C.subTree;
        if (h === O) {
          const k = C.vnode;
          K(u, k, k.scopeId, k.slotScopeIds, C.parent);
        }
      }
    },
    N = (u, h, v, y, C, O, k, w, B = 0) => {
      for (let S = B; S < u.length; S++) {
        const M = (u[S] = w ? Tt(u[S]) : rt(u[S]));
        T(null, M, h, v, y, C, O, k, w);
      }
    },
    W = (u, h, v, y, C, O, k) => {
      const w = (h.el = u.el);
      let { patchFlag: B, dynamicChildren: S, dirs: M } = h;
      B |= u.patchFlag & 16;
      const j = u.props || me,
        H = h.props || me;
      let Y;
      if (
        (v && Nt(v, !1),
        (Y = H.onVnodeBeforeUpdate) && st(Y, v, h, u),
        M && kt(h, u, v, "beforeUpdate"),
        v && Nt(v, !0),
        S
          ? R(u.dynamicChildren, S, w, v, y, Ko(h, C), O)
          : k || oe(u, h, w, null, v, y, Ko(h, C), O, !1),
        B > 0)
      ) {
        if (B & 16) m(w, h, j, H, v, y, C);
        else if (
          (B & 2 && j.class !== H.class && s(w, "class", null, H.class, C),
          B & 4 && s(w, "style", j.style, H.style, C),
          B & 8)
        ) {
          const ee = h.dynamicProps;
          for (let ce = 0; ce < ee.length; ce++) {
            const ue = ee[ce],
              xe = j[ue],
              q = H[ue];
            (q !== xe || ue === "value") &&
              s(w, ue, xe, q, C, u.children, v, y, ze);
          }
        }
        B & 1 && u.children !== h.children && f(w, h.children);
      } else !k && S == null && m(w, h, j, H, v, y, C);
      ((Y = H.onVnodeUpdated) || M) &&
        Fe(() => {
          Y && st(Y, v, h, u), M && kt(h, u, v, "updated");
        }, y);
    },
    R = (u, h, v, y, C, O, k) => {
      for (let w = 0; w < h.length; w++) {
        const B = u[w],
          S = h[w],
          M =
            B.el && (B.type === Ve || !Lt(B, S) || B.shapeFlag & 70)
              ? d(B.el)
              : v;
        T(B, S, M, null, y, C, O, k, !0);
      }
    },
    m = (u, h, v, y, C, O, k) => {
      if (v !== y) {
        if (v !== me)
          for (const w in v)
            !pn(w) && !(w in y) && s(u, w, v[w], null, k, h.children, C, O, ze);
        for (const w in y) {
          if (pn(w)) continue;
          const B = y[w],
            S = v[w];
          B !== S && w !== "value" && s(u, w, S, B, k, h.children, C, O, ze);
        }
        "value" in y && s(u, "value", v.value, y.value, k);
      }
    },
    b = (u, h, v, y, C, O, k, w, B) => {
      const S = (h.el = u ? u.el : i("")),
        M = (h.anchor = u ? u.anchor : i(""));
      let { patchFlag: j, dynamicChildren: H, slotScopeIds: Y } = h;
      Y && (w = w ? w.concat(Y) : Y),
        u == null
          ? (o(S, v, y), o(M, v, y), N(h.children || [], v, M, C, O, k, w, B))
          : j > 0 && j & 64 && H && u.dynamicChildren
            ? (R(u.dynamicChildren, H, v, C, O, k, w),
              (h.key != null || (C && h === C.subTree)) && Dl(u, h, !0))
            : oe(u, h, v, M, C, O, k, w, B);
    },
    I = (u, h, v, y, C, O, k, w, B) => {
      (h.slotScopeIds = w),
        u == null
          ? h.shapeFlag & 512
            ? C.ctx.activate(h, v, y, k, B)
            : G(h, v, y, C, O, k, B)
          : te(u, h, B);
    },
    G = (u, h, v, y, C, O, k) => {
      const w = (u.component = Ec(u, y, C));
      if ((Eo(u) && (w.ctx.renderer = ae), Tc(w), w.asyncDep)) {
        if ((C && C.registerDep(w, ne), !u.el)) {
          const B = (w.subTree = p(tt));
          A(null, B, h, v);
        }
      } else ne(w, u, h, v, C, O, k);
    },
    te = (u, h, v) => {
      const y = (h.component = u.component);
      if ($a(u, h, v))
        if (y.asyncDep && !y.asyncResolved) {
          ie(y, h, v);
          return;
        } else (y.next = h), Ta(y.update), (y.effect.dirty = !0), y.update();
      else (h.el = u.el), (y.vnode = h);
    },
    ne = (u, h, v, y, C, O, k) => {
      const w = () => {
          if (u.isMounted) {
            let { next: M, bu: j, u: H, parent: Y, vnode: ee } = u;
            {
              const ct = qr(u);
              if (ct) {
                M && ((M.el = ee.el), ie(u, M, k)),
                  ct.asyncDep.then(() => {
                    u.isUnmounted || w();
                  });
                return;
              }
            }
            let ce = M,
              ue;
            Nt(u, !1),
              M ? ((M.el = ee.el), ie(u, M, k)) : (M = ee),
              j && Vo(j),
              (ue = M.props && M.props.onVnodeBeforeUpdate) && st(ue, Y, M, ee),
              Nt(u, !0);
            const xe = zo(u),
              q = u.subTree;
            (u.subTree = xe),
              T(q, xe, d(q.el), x(q), u, C, O),
              (M.el = xe.el),
              ce === null && ka(u, xe.el),
              H && Fe(H, C),
              (ue = M.props && M.props.onVnodeUpdated) &&
                Fe(() => st(ue, Y, M, ee), C);
          } else {
            let M;
            const { el: j, props: H } = h,
              { bm: Y, m: ee, parent: ce } = u,
              ue = eo(h);
            if (
              (Nt(u, !1),
              Y && Vo(Y),
              !ue && (M = H && H.onVnodeBeforeMount) && st(M, ce, h),
              Nt(u, !0),
              j && _e)
            ) {
              const xe = () => {
                (u.subTree = zo(u)), _e(j, u.subTree, u, C, null);
              };
              ue
                ? h.type.__asyncLoader().then(() => !u.isUnmounted && xe())
                : xe();
            } else {
              const xe = (u.subTree = zo(u));
              T(null, xe, v, y, u, C, O), (h.el = xe.el);
            }
            if ((ee && Fe(ee, C), !ue && (M = H && H.onVnodeMounted))) {
              const xe = h;
              Fe(() => st(M, ce, xe), C);
            }
            (h.shapeFlag & 256 ||
              (ce && eo(ce.vnode) && ce.vnode.shapeFlag & 256)) &&
              u.a &&
              Fe(u.a, C),
              (u.isMounted = !0),
              (h = v = y = null);
          }
        },
        B = (u.effect = new El(w, Ye, () => kl(S), u.scope)),
        S = (u.update = () => {
          B.dirty && B.run();
        });
      (S.id = u.uid), Nt(u, !0), S();
    },
    ie = (u, h, v) => {
      h.component = u;
      const y = u.vnode.props;
      (u.vnode = h),
        (u.next = null),
        ic(u, h.props, y, v),
        uc(u, h.children, v),
        Ut(),
        es(u),
        Kt();
    },
    oe = (u, h, v, y, C, O, k, w, B = !1) => {
      const S = u && u.children,
        M = u ? u.shapeFlag : 0,
        j = h.children,
        { patchFlag: H, shapeFlag: Y } = h;
      if (H > 0) {
        if (H & 128) {
          Xe(S, j, v, y, C, O, k, w, B);
          return;
        } else if (H & 256) {
          Ie(S, j, v, y, C, O, k, w, B);
          return;
        }
      }
      Y & 8
        ? (M & 16 && ze(S, C, O), j !== S && f(v, j))
        : M & 16
          ? Y & 16
            ? Xe(S, j, v, y, C, O, k, w, B)
            : ze(S, C, O, !0)
          : (M & 8 && f(v, ""), Y & 16 && N(j, v, y, C, O, k, w, B));
    },
    Ie = (u, h, v, y, C, O, k, w, B) => {
      (u = u || en), (h = h || en);
      const S = u.length,
        M = h.length,
        j = Math.min(S, M);
      let H;
      for (H = 0; H < j; H++) {
        const Y = (h[H] = B ? Tt(h[H]) : rt(h[H]));
        T(u[H], Y, v, null, C, O, k, w, B);
      }
      S > M ? ze(u, C, O, !0, !1, j) : N(h, v, y, C, O, k, w, B, j);
    },
    Xe = (u, h, v, y, C, O, k, w, B) => {
      let S = 0;
      const M = h.length;
      let j = u.length - 1,
        H = M - 1;
      for (; S <= j && S <= H; ) {
        const Y = u[S],
          ee = (h[S] = B ? Tt(h[S]) : rt(h[S]));
        if (Lt(Y, ee)) T(Y, ee, v, null, C, O, k, w, B);
        else break;
        S++;
      }
      for (; S <= j && S <= H; ) {
        const Y = u[j],
          ee = (h[H] = B ? Tt(h[H]) : rt(h[H]));
        if (Lt(Y, ee)) T(Y, ee, v, null, C, O, k, w, B);
        else break;
        j--, H--;
      }
      if (S > j) {
        if (S <= H) {
          const Y = H + 1,
            ee = Y < M ? h[Y].el : y;
          for (; S <= H; )
            T(null, (h[S] = B ? Tt(h[S]) : rt(h[S])), v, ee, C, O, k, w, B),
              S++;
        }
      } else if (S > H) for (; S <= j; ) Be(u[S], C, O, !0), S++;
      else {
        const Y = S,
          ee = S,
          ce = new Map();
        for (S = ee; S <= H; S++) {
          const je = (h[S] = B ? Tt(h[S]) : rt(h[S]));
          je.key != null && ce.set(je.key, S);
        }
        let ue,
          xe = 0;
        const q = H - ee + 1;
        let ct = !1,
          jl = 0;
        const un = new Array(q);
        for (S = 0; S < q; S++) un[S] = 0;
        for (S = Y; S <= j; S++) {
          const je = u[S];
          if (xe >= q) {
            Be(je, C, O, !0);
            continue;
          }
          let lt;
          if (je.key != null) lt = ce.get(je.key);
          else
            for (ue = ee; ue <= H; ue++)
              if (un[ue - ee] === 0 && Lt(je, h[ue])) {
                lt = ue;
                break;
              }
          lt === void 0
            ? Be(je, C, O, !0)
            : ((un[lt - ee] = S + 1),
              lt >= jl ? (jl = lt) : (ct = !0),
              T(je, h[lt], v, null, C, O, k, w, B),
              xe++);
        }
        const Ul = ct ? gc(un) : en;
        for (ue = Ul.length - 1, S = q - 1; S >= 0; S--) {
          const je = ee + S,
            lt = h[je],
            Kl = je + 1 < M ? h[je + 1].el : y;
          un[S] === 0
            ? T(null, lt, v, Kl, C, O, k, w, B)
            : ct && (ue < 0 || S !== Ul[ue] ? De(lt, v, Kl, 2) : ue--);
        }
      }
    },
    De = (u, h, v, y, C = null) => {
      const { el: O, type: k, transition: w, children: B, shapeFlag: S } = u;
      if (S & 6) {
        De(u.component.subTree, h, v, y);
        return;
      }
      if (S & 128) {
        u.suspense.move(h, v, y);
        return;
      }
      if (S & 64) {
        k.move(u, h, v, ae);
        return;
      }
      if (k === Ve) {
        o(O, h, v);
        for (let j = 0; j < B.length; j++) De(B[j], h, v, y);
        o(u.anchor, h, v);
        return;
      }
      if (k === to) {
        D(u, h, v);
        return;
      }
      if (y !== 2 && S & 1 && w)
        if (y === 0) w.beforeEnter(O), o(O, h, v), Fe(() => w.enter(O), C);
        else {
          const { leave: j, delayLeave: H, afterLeave: Y } = w,
            ee = () => o(O, h, v),
            ce = () => {
              j(O, () => {
                ee(), Y && Y();
              });
            };
          H ? H(O, ee, ce) : ce();
        }
      else o(O, h, v);
    },
    Be = (u, h, v, y = !1, C = !1) => {
      const {
        type: O,
        props: k,
        ref: w,
        children: B,
        dynamicChildren: S,
        shapeFlag: M,
        patchFlag: j,
        dirs: H,
      } = u;
      if ((w != null && dl(w, null, v, u, !0), M & 256)) {
        h.ctx.deactivate(u);
        return;
      }
      const Y = M & 1 && H,
        ee = !eo(u);
      let ce;
      if ((ee && (ce = k && k.onVnodeBeforeUnmount) && st(ce, h, u), M & 6))
        Gt(u.component, v, y);
      else {
        if (M & 128) {
          u.suspense.unmount(v, y);
          return;
        }
        Y && kt(u, null, h, "beforeUnmount"),
          M & 64
            ? u.type.remove(u, h, v, C, ae, y)
            : S && (O !== Ve || (j > 0 && j & 64))
              ? ze(S, h, v, !1, !0)
              : ((O === Ve && j & 384) || (!C && M & 16)) && ze(B, h, v),
          y && $t(u);
      }
      ((ee && (ce = k && k.onVnodeUnmounted)) || Y) &&
        Fe(() => {
          ce && st(ce, h, u), Y && kt(u, null, h, "unmounted");
        }, v);
    },
    $t = (u) => {
      const { type: h, el: v, anchor: y, transition: C } = u;
      if (h === Ve) {
        cn(v, y);
        return;
      }
      if (h === to) {
        F(u);
        return;
      }
      const O = () => {
        l(v), C && !C.persisted && C.afterLeave && C.afterLeave();
      };
      if (u.shapeFlag & 1 && C && !C.persisted) {
        const { leave: k, delayLeave: w } = C,
          B = () => k(v, O);
        w ? w(u.el, O, B) : B();
      } else O();
    },
    cn = (u, h) => {
      let v;
      for (; u !== h; ) (v = g(u)), l(u), (u = v);
      l(h);
    },
    Gt = (u, h, v) => {
      const { bum: y, scope: C, update: O, subTree: k, um: w } = u;
      y && Vo(y),
        C.stop(),
        O && ((O.active = !1), Be(k, u, h, v)),
        w && Fe(w, h),
        Fe(() => {
          u.isUnmounted = !0;
        }, h),
        h &&
          h.pendingBranch &&
          !h.isUnmounted &&
          u.asyncDep &&
          !u.asyncResolved &&
          u.suspenseId === h.pendingId &&
          (h.deps--, h.deps === 0 && h.resolve());
    },
    ze = (u, h, v, y = !1, C = !1, O = 0) => {
      for (let k = O; k < u.length; k++) Be(u[k], h, v, y, C);
    },
    x = (u) =>
      u.shapeFlag & 6
        ? x(u.component.subTree)
        : u.shapeFlag & 128
          ? u.suspense.next()
          : g(u.anchor || u.el);
  let Z = !1;
  const Q = (u, h, v) => {
      u == null
        ? h._vnode && Be(h._vnode, null, null, !0)
        : T(h._vnode || null, u, h, null, null, null, v),
        Z || ((Z = !0), es(), Ir(), (Z = !1)),
        (h._vnode = u);
    },
    ae = {
      p: T,
      um: Be,
      m: De,
      r: $t,
      mt: G,
      mc: N,
      pc: oe,
      pbc: R,
      n: x,
      o: e,
    };
  let pe, _e;
  return (
    t && ([pe, _e] = t(ae)), { render: Q, hydrate: pe, createApp: sc(Q, pe) }
  );
}
function Ko({ type: e, props: t }, n) {
  return (n === "svg" && e === "foreignObject") ||
    (n === "mathml" &&
      e === "annotation-xml" &&
      t &&
      t.encoding &&
      t.encoding.includes("html"))
    ? void 0
    : n;
}
function Nt({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function hc(e, t) {
  return (!e || (e && !e.pendingBranch)) && t && !t.persisted;
}
function Dl(e, t, n = !1) {
  const o = e.children,
    l = t.children;
  if (J(o) && J(l))
    for (let s = 0; s < o.length; s++) {
      const r = o[s];
      let i = l[s];
      i.shapeFlag & 1 &&
        !i.dynamicChildren &&
        ((i.patchFlag <= 0 || i.patchFlag === 32) &&
          ((i = l[s] = Tt(l[s])), (i.el = r.el)),
        n || Dl(r, i)),
        i.type === Po && (i.el = r.el);
    }
}
function gc(e) {
  const t = e.slice(),
    n = [0];
  let o, l, s, r, i;
  const a = e.length;
  for (o = 0; o < a; o++) {
    const c = e[o];
    if (c !== 0) {
      if (((l = n[n.length - 1]), e[l] < c)) {
        (t[o] = l), n.push(o);
        continue;
      }
      for (s = 0, r = n.length - 1; s < r; )
        (i = (s + r) >> 1), e[n[i]] < c ? (s = i + 1) : (r = i);
      c < e[n[s]] && (s > 0 && (t[o] = n[s - 1]), (n[s] = o));
    }
  }
  for (s = n.length, r = n[s - 1]; s-- > 0; ) (n[s] = r), (r = t[r]);
  return n;
}
function qr(e) {
  const t = e.subTree.component;
  if (t) return t.asyncDep && !t.asyncResolved ? t : qr(t);
}
const mc = (e) => e.__isTeleport,
  _n = (e) => e && (e.disabled || e.disabled === ""),
  ds = (e) => typeof SVGElement < "u" && e instanceof SVGElement,
  hs = (e) => typeof MathMLElement == "function" && e instanceof MathMLElement,
  hl = (e, t) => {
    const n = e && e.to;
    return ye(n) ? (t ? t(n) : null) : n;
  },
  vc = {
    name: "Teleport",
    __isTeleport: !0,
    process(e, t, n, o, l, s, r, i, a, c) {
      const {
          mc: f,
          pc: d,
          pbc: g,
          o: { insert: _, querySelector: E, createText: T, createComment: $ },
        } = c,
        A = _n(t.props);
      let { shapeFlag: V, children: D, dynamicChildren: F } = t;
      if (e == null) {
        const U = (t.el = T("")),
          P = (t.anchor = T(""));
        _(U, n, o), _(P, n, o);
        const K = (t.target = hl(t.props, E)),
          N = (t.targetAnchor = T(""));
        K &&
          (_(N, K),
          r === "svg" || ds(K)
            ? (r = "svg")
            : (r === "mathml" || hs(K)) && (r = "mathml"));
        const W = (R, m) => {
          V & 16 && f(D, R, m, l, s, r, i, a);
        };
        A ? W(n, P) : K && W(K, N);
      } else {
        t.el = e.el;
        const U = (t.anchor = e.anchor),
          P = (t.target = e.target),
          K = (t.targetAnchor = e.targetAnchor),
          N = _n(e.props),
          W = N ? n : P,
          R = N ? U : K;
        if (
          (r === "svg" || ds(P)
            ? (r = "svg")
            : (r === "mathml" || hs(P)) && (r = "mathml"),
          F
            ? (g(e.dynamicChildren, F, W, l, s, r, i), Dl(e, t, !0))
            : a || d(e, t, W, R, l, s, r, i, !1),
          A)
        )
          N
            ? t.props &&
              e.props &&
              t.props.to !== e.props.to &&
              (t.props.to = e.props.to)
            : Wn(t, n, U, c, 1);
        else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
          const m = (t.target = hl(t.props, E));
          m && Wn(t, m, null, c, 0);
        } else N && Wn(t, P, K, c, 1);
      }
      Xr(t);
    },
    remove(e, t, n, o, { um: l, o: { remove: s } }, r) {
      const {
        shapeFlag: i,
        children: a,
        anchor: c,
        targetAnchor: f,
        target: d,
        props: g,
      } = e;
      if ((d && s(f), r && s(c), i & 16)) {
        const _ = r || !_n(g);
        for (let E = 0; E < a.length; E++) {
          const T = a[E];
          l(T, t, n, _, !!T.dynamicChildren);
        }
      }
    },
    move: Wn,
    hydrate: pc,
  };
function Wn(e, t, n, { o: { insert: o }, m: l }, s = 2) {
  s === 0 && o(e.targetAnchor, t, n);
  const { el: r, anchor: i, shapeFlag: a, children: c, props: f } = e,
    d = s === 2;
  if ((d && o(r, t, n), (!d || _n(f)) && a & 16))
    for (let g = 0; g < c.length; g++) l(c[g], t, n, 2);
  d && o(i, t, n);
}
function pc(
  e,
  t,
  n,
  o,
  l,
  s,
  { o: { nextSibling: r, parentNode: i, querySelector: a } },
  c,
) {
  const f = (t.target = hl(t.props, a));
  if (f) {
    const d = f._lpa || f.firstChild;
    if (t.shapeFlag & 16)
      if (_n(t.props))
        (t.anchor = c(r(e), t, i(e), n, o, l, s)), (t.targetAnchor = d);
      else {
        t.anchor = r(e);
        let g = d;
        for (; g; )
          if (
            ((g = r(g)), g && g.nodeType === 8 && g.data === "teleport anchor")
          ) {
            (t.targetAnchor = g),
              (f._lpa = t.targetAnchor && r(t.targetAnchor));
            break;
          }
        c(d, t, f, n, o, l, s);
      }
    Xr(t);
  }
  return t.anchor && r(t.anchor);
}
const bc = vc;
function Xr(e) {
  const t = e.ctx;
  if (t && t.ut) {
    let n = e.children[0].el;
    for (; n && n !== e.targetAnchor; )
      n.nodeType === 1 && n.setAttribute("data-v-owner", t.uid),
        (n = n.nextSibling);
    t.ut();
  }
}
const Ve = Symbol.for("v-fgt"),
  Po = Symbol.for("v-txt"),
  tt = Symbol.for("v-cmt"),
  to = Symbol.for("v-stc"),
  xn = [];
let et = null;
function Le(e = !1) {
  xn.push((et = e ? null : []));
}
function yc() {
  xn.pop(), (et = xn[xn.length - 1] || null);
}
let On = 1;
function gs(e) {
  On += e;
}
function Zr(e) {
  return (
    (e.dynamicChildren = On > 0 ? et || en : null),
    yc(),
    On > 0 && et && et.push(e),
    e
  );
}
function xt(e, t, n, o, l, s) {
  return Zr(z(e, t, n, o, l, s, !0));
}
function Qt(e, t, n, o, l) {
  return Zr(p(e, t, n, o, l, !0));
}
function co(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Lt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Io = "__vInternal",
  Qr = ({ key: e }) => e ?? null,
  no = ({ ref: e, ref_key: t, ref_for: n }) => (
    typeof e == "number" && (e = "" + e),
    e != null
      ? ye(e) || Me(e) || X(e)
        ? { i: Re, r: e, k: t, f: !!n }
        : e
      : null
  );
function z(
  e,
  t = null,
  n = null,
  o = 0,
  l = null,
  s = e === Ve ? 0 : 1,
  r = !1,
  i = !1,
) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Qr(t),
    ref: t && no(t),
    scopeId: kr,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: s,
    patchFlag: o,
    dynamicProps: l,
    dynamicChildren: null,
    appContext: null,
    ctx: Re,
  };
  return (
    i
      ? (Ll(a, n), s & 128 && e.normalize(a))
      : n && (a.shapeFlag |= ye(n) ? 8 : 16),
    On > 0 &&
      !r &&
      et &&
      (a.patchFlag > 0 || s & 6) &&
      a.patchFlag !== 32 &&
      et.push(a),
    a
  );
}
const p = _c;
function _c(e, t = null, n = null, o = 0, l = null, s = !1) {
  if (((!e || e === Na) && (e = tt), co(e))) {
    const i = Bt(e, t, !0);
    return (
      n && Ll(i, n),
      On > 0 &&
        !s &&
        et &&
        (i.shapeFlag & 6 ? (et[et.indexOf(e)] = i) : et.push(i)),
      (i.patchFlag |= -2),
      i
    );
  }
  if ((Bc(e) && (e = e.__vccOpts), t)) {
    t = xc(t);
    let { class: i, style: a } = t;
    i && !ye(i) && (t.class = Sl(i)),
      ve(a) && (wr(a) && !J(a) && (a = Ee({}, a)), (t.style = ft(a)));
  }
  const r = ye(e) ? 1 : Ma(e) ? 128 : mc(e) ? 64 : ve(e) ? 4 : X(e) ? 2 : 0;
  return z(e, t, n, o, l, r, s, !0);
}
function xc(e) {
  return e ? (wr(e) || Io in e ? Ee({}, e) : e) : null;
}
function Bt(e, t, n = !1) {
  const { props: o, ref: l, patchFlag: s, children: r } = e,
    i = t ? ot(o || {}, t) : o;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: i,
    key: i && Qr(i),
    ref:
      t && t.ref ? (n && l ? (J(l) ? l.concat(no(t)) : [l, no(t)]) : no(t)) : l,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: r,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== Ve ? (s === -1 ? 16 : s | 16) : s,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Bt(e.ssContent),
    ssFallback: e.ssFallback && Bt(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce,
  };
}
function uo(e = " ", t = 0) {
  return p(Po, null, e, t);
}
function Cc(e, t) {
  const n = p(to, null, e);
  return (n.staticCount = t), n;
}
function fn(e = "", t = !1) {
  return t ? (Le(), Qt(tt, null, e)) : p(tt, null, e);
}
function rt(e) {
  return e == null || typeof e == "boolean"
    ? p(tt)
    : J(e)
      ? p(Ve, null, e.slice())
      : typeof e == "object"
        ? Tt(e)
        : p(Po, null, String(e));
}
function Tt(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : Bt(e);
}
function Ll(e, t) {
  let n = 0;
  const { shapeFlag: o } = e;
  if (t == null) t = null;
  else if (J(t)) n = 16;
  else if (typeof t == "object")
    if (o & 65) {
      const l = t.default;
      l && (l._c && (l._d = !1), Ll(e, l()), l._c && (l._d = !0));
      return;
    } else {
      n = 32;
      const l = t._;
      !l && !(Io in t)
        ? (t._ctx = Re)
        : l === 3 &&
          Re &&
          (Re.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    X(t)
      ? ((t = { default: t, _ctx: Re }), (n = 32))
      : ((t = String(t)), o & 64 ? ((n = 16), (t = [uo(t)])) : (n = 8));
  (e.children = t), (e.shapeFlag |= n);
}
function ot(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const o = e[n];
    for (const l in o)
      if (l === "class")
        t.class !== o.class && (t.class = Sl([t.class, o.class]));
      else if (l === "style") t.style = ft([t.style, o.style]);
      else if (bo(l)) {
        const s = t[l],
          r = o[l];
        r &&
          s !== r &&
          !(J(s) && s.includes(r)) &&
          (t[l] = s ? [].concat(s, r) : r);
      } else l !== "" && (t[l] = o[l]);
  }
  return t;
}
function st(e, t, n, o = null) {
  qe(e, t, 7, [n, o]);
}
const wc = Ur();
let Sc = 0;
function Ec(e, t, n) {
  const o = e.type,
    l = (t ? t.appContext : e.appContext) || wc,
    s = {
      uid: Sc++,
      vnode: e,
      type: o,
      parent: t,
      appContext: l,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new Xi(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(l.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: Wr(o, l),
      emitsOptions: $r(o, l),
      emit: null,
      emitted: null,
      propsDefaults: me,
      inheritAttrs: o.inheritAttrs,
      ctx: me,
      data: me,
      props: me,
      attrs: me,
      slots: me,
      refs: me,
      setupState: me,
      setupContext: null,
      attrsProxy: null,
      slotsProxy: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (
    (s.ctx = { _: s }),
    (s.root = t ? t.root : s),
    (s.emit = Pa.bind(null, s)),
    e.ce && e.ce(s),
    s
  );
}
let Pe = null;
const Wt = () => Pe || Re;
let fo, gl;
{
  const e = ar(),
    t = (n, o) => {
      let l;
      return (
        (l = e[n]) || (l = e[n] = []),
        l.push(o),
        (s) => {
          l.length > 1 ? l.forEach((r) => r(s)) : l[0](s);
        }
      );
    };
  (fo = t("__VUE_INSTANCE_SETTERS__", (n) => (Pe = n))),
    (gl = t("__VUE_SSR_SETTERS__", (n) => (Bo = n)));
}
const Nn = (e) => {
    const t = Pe;
    return (
      fo(e),
      e.scope.on(),
      () => {
        e.scope.off(), fo(t);
      }
    );
  },
  ms = () => {
    Pe && Pe.scope.off(), fo(null);
  };
function ei(e) {
  return e.vnode.shapeFlag & 4;
}
let Bo = !1;
function Tc(e, t = !1) {
  t && gl(t);
  const { props: n, children: o } = e.vnode,
    l = ei(e);
  rc(e, n, l, t), cc(e, o);
  const s = l ? Oc(e, t) : void 0;
  return t && gl(!1), s;
}
function Oc(e, t) {
  const n = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = Sr(new Proxy(e.ctx, Za)));
  const { setup: o } = n;
  if (o) {
    const l = (e.setupContext = o.length > 1 ? Pc(e) : null),
      s = Nn(e);
    Ut();
    const r = Pt(o, e, 0, [e.props, l]);
    if ((Kt(), s(), sr(r))) {
      if ((r.then(ms, ms), t))
        return r
          .then((i) => {
            vs(e, i, t);
          })
          .catch((i) => {
            wo(i, e, 0);
          });
      e.asyncDep = r;
    } else vs(e, r, t);
  } else ti(e, t);
}
function vs(e, t, n) {
  X(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : ve(t) && (e.setupState = Or(t)),
    ti(e, n);
}
let ps;
function ti(e, t, n) {
  const o = e.type;
  if (!e.render) {
    if (!t && ps && !o.render) {
      const l = o.template || Rl(e).template;
      if (l) {
        const { isCustomElement: s, compilerOptions: r } = e.appContext.config,
          { delimiters: i, compilerOptions: a } = o,
          c = Ee(Ee({ isCustomElement: s, delimiters: i }, r), a);
        o.render = ps(l, c);
      }
    }
    e.render = o.render || Ye;
  }
  {
    const l = Nn(e);
    Ut();
    try {
      Qa(e);
    } finally {
      Kt(), l();
    }
  }
}
function Ac(e) {
  return (
    e.attrsProxy ||
    (e.attrsProxy = new Proxy(e.attrs, {
      get(t, n) {
        return He(e, "get", "$attrs"), t[n];
      },
    }))
  );
}
function Pc(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    get attrs() {
      return Ac(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function $o(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(Or(Sr(e.exposed)), {
        get(t, n) {
          if (n in t) return t[n];
          if (n in bn) return bn[n](e);
        },
        has(t, n) {
          return n in t || n in bn;
        },
      }))
    );
}
function Ic(e, t = !0) {
  return X(e) ? e.displayName || e.name : e.name || (t && e.__name);
}
function Bc(e) {
  return X(e) && "__vccOpts" in e;
}
const se = (e, t) => _a(e, t, Bo);
function $c(e, t, n) {
  const o = arguments.length;
  return o === 2
    ? ve(t) && !J(t)
      ? co(t)
        ? p(e, null, [t])
        : p(e, t)
      : p(e, null, t)
    : (o > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : o === 3 && co(n) && (n = [n]),
      p(e, t, n));
}
const kc = "3.4.21";
/**
 * @vue/runtime-dom v3.4.21
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ const Nc = "http://www.w3.org/2000/svg",
  Rc = "http://www.w3.org/1998/Math/MathML",
  Ot = typeof document < "u" ? document : null,
  bs = Ot && Ot.createElement("template"),
  Mc = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, n, o) => {
      const l =
        t === "svg"
          ? Ot.createElementNS(Nc, e)
          : t === "mathml"
            ? Ot.createElementNS(Rc, e)
            : Ot.createElement(e, n ? { is: n } : void 0);
      return (
        e === "select" &&
          o &&
          o.multiple != null &&
          l.setAttribute("multiple", o.multiple),
        l
      );
    },
    createText: (e) => Ot.createTextNode(e),
    createComment: (e) => Ot.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => Ot.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "");
    },
    insertStaticContent(e, t, n, o, l, s) {
      const r = n ? n.previousSibling : t.lastChild;
      if (l && (l === s || l.nextSibling))
        for (
          ;
          t.insertBefore(l.cloneNode(!0), n),
            !(l === s || !(l = l.nextSibling));

        );
      else {
        bs.innerHTML =
          o === "svg"
            ? `<svg>${e}</svg>`
            : o === "mathml"
              ? `<math>${e}</math>`
              : e;
        const i = bs.content;
        if (o === "svg" || o === "mathml") {
          const a = i.firstChild;
          for (; a.firstChild; ) i.appendChild(a.firstChild);
          i.removeChild(a);
        }
        t.insertBefore(i, n);
      }
      return [
        r ? r.nextSibling : t.firstChild,
        n ? n.previousSibling : t.lastChild,
      ];
    },
  },
  Ct = "transition",
  dn = "animation",
  An = Symbol("_vtc"),
  Rn = (e, { slots: t }) => $c(ja, Dc(e), t);
Rn.displayName = "Transition";
const ni = {
  name: String,
  type: String,
  css: { type: Boolean, default: !0 },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String,
};
Rn.props = Ee({}, Lr, ni);
const Rt = (e, t = []) => {
    J(e) ? e.forEach((n) => n(...t)) : e && e(...t);
  },
  ys = (e) => (e ? (J(e) ? e.some((t) => t.length > 1) : e.length > 1) : !1);
function Dc(e) {
  const t = {};
  for (const b in e) b in ni || (t[b] = e[b]);
  if (e.css === !1) return t;
  const {
      name: n = "v",
      type: o,
      duration: l,
      enterFromClass: s = `${n}-enter-from`,
      enterActiveClass: r = `${n}-enter-active`,
      enterToClass: i = `${n}-enter-to`,
      appearFromClass: a = s,
      appearActiveClass: c = r,
      appearToClass: f = i,
      leaveFromClass: d = `${n}-leave-from`,
      leaveActiveClass: g = `${n}-leave-active`,
      leaveToClass: _ = `${n}-leave-to`,
    } = e,
    E = Lc(l),
    T = E && E[0],
    $ = E && E[1],
    {
      onBeforeEnter: A,
      onEnter: V,
      onEnterCancelled: D,
      onLeave: F,
      onLeaveCancelled: U,
      onBeforeAppear: P = A,
      onAppear: K = V,
      onAppearCancelled: N = D,
    } = t,
    W = (b, I, G) => {
      Mt(b, I ? f : i), Mt(b, I ? c : r), G && G();
    },
    R = (b, I) => {
      (b._isLeaving = !1), Mt(b, d), Mt(b, _), Mt(b, g), I && I();
    },
    m = (b) => (I, G) => {
      const te = b ? K : V,
        ne = () => W(I, b, G);
      Rt(te, [I, ne]),
        _s(() => {
          Mt(I, b ? a : s), wt(I, b ? f : i), ys(te) || xs(I, o, T, ne);
        });
    };
  return Ee(t, {
    onBeforeEnter(b) {
      Rt(A, [b]), wt(b, s), wt(b, r);
    },
    onBeforeAppear(b) {
      Rt(P, [b]), wt(b, a), wt(b, c);
    },
    onEnter: m(!1),
    onAppear: m(!0),
    onLeave(b, I) {
      b._isLeaving = !0;
      const G = () => R(b, I);
      wt(b, d),
        Hc(),
        wt(b, g),
        _s(() => {
          b._isLeaving && (Mt(b, d), wt(b, _), ys(F) || xs(b, o, $, G));
        }),
        Rt(F, [b, G]);
    },
    onEnterCancelled(b) {
      W(b, !1), Rt(D, [b]);
    },
    onAppearCancelled(b) {
      W(b, !0), Rt(N, [b]);
    },
    onLeaveCancelled(b) {
      R(b), Rt(U, [b]);
    },
  });
}
function Lc(e) {
  if (e == null) return null;
  if (ve(e)) return [Wo(e.enter), Wo(e.leave)];
  {
    const t = Wo(e);
    return [t, t];
  }
}
function Wo(e) {
  return Ui(e);
}
function wt(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)),
    (e[An] || (e[An] = new Set())).add(t);
}
function Mt(e, t) {
  t.split(/\s+/).forEach((o) => o && e.classList.remove(o));
  const n = e[An];
  n && (n.delete(t), n.size || (e[An] = void 0));
}
function _s(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let Fc = 0;
function xs(e, t, n, o) {
  const l = (e._endId = ++Fc),
    s = () => {
      l === e._endId && o();
    };
  if (n) return setTimeout(s, n);
  const { type: r, timeout: i, propCount: a } = Vc(e, t);
  if (!r) return o();
  const c = r + "end";
  let f = 0;
  const d = () => {
      e.removeEventListener(c, g), s();
    },
    g = (_) => {
      _.target === e && ++f >= a && d();
    };
  setTimeout(() => {
    f < a && d();
  }, i + 1),
    e.addEventListener(c, g);
}
function Vc(e, t) {
  const n = window.getComputedStyle(e),
    o = (E) => (n[E] || "").split(", "),
    l = o(`${Ct}Delay`),
    s = o(`${Ct}Duration`),
    r = Cs(l, s),
    i = o(`${dn}Delay`),
    a = o(`${dn}Duration`),
    c = Cs(i, a);
  let f = null,
    d = 0,
    g = 0;
  t === Ct
    ? r > 0 && ((f = Ct), (d = r), (g = s.length))
    : t === dn
      ? c > 0 && ((f = dn), (d = c), (g = a.length))
      : ((d = Math.max(r, c)),
        (f = d > 0 ? (r > c ? Ct : dn) : null),
        (g = f ? (f === Ct ? s.length : a.length) : 0));
  const _ =
    f === Ct && /\b(transform|all)(,|$)/.test(o(`${Ct}Property`).toString());
  return { type: f, timeout: d, propCount: g, hasTransform: _ };
}
function Cs(e, t) {
  for (; e.length < t.length; ) e = e.concat(e);
  return Math.max(...t.map((n, o) => ws(n) + ws(e[o])));
}
function ws(e) {
  return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function Hc() {
  return document.body.offsetHeight;
}
function zc(e, t, n) {
  const o = e[An];
  o && (t = (t ? [t, ...o] : [...o]).join(" ")),
    t == null
      ? e.removeAttribute("class")
      : n
        ? e.setAttribute("class", t)
        : (e.className = t);
}
const ho = Symbol("_vod"),
  oi = Symbol("_vsh"),
  li = {
    beforeMount(e, { value: t }, { transition: n }) {
      (e[ho] = e.style.display === "none" ? "" : e.style.display),
        n && t ? n.beforeEnter(e) : hn(e, t);
    },
    mounted(e, { value: t }, { transition: n }) {
      n && t && n.enter(e);
    },
    updated(e, { value: t, oldValue: n }, { transition: o }) {
      !t != !n &&
        (o
          ? t
            ? (o.beforeEnter(e), hn(e, !0), o.enter(e))
            : o.leave(e, () => {
                hn(e, !1);
              })
          : hn(e, t));
    },
    beforeUnmount(e, { value: t }) {
      hn(e, t);
    },
  };
function hn(e, t) {
  (e.style.display = t ? e[ho] : "none"), (e[oi] = !t);
}
const jc = Symbol(""),
  Uc = /(^|;)\s*display\s*:/;
function Kc(e, t, n) {
  const o = e.style,
    l = ye(n);
  let s = !1;
  if (n && !l) {
    if (t)
      if (ye(t))
        for (const r of t.split(";")) {
          const i = r.slice(0, r.indexOf(":")).trim();
          n[i] == null && oo(o, i, "");
        }
      else for (const r in t) n[r] == null && oo(o, r, "");
    for (const r in n) r === "display" && (s = !0), oo(o, r, n[r]);
  } else if (l) {
    if (t !== n) {
      const r = o[jc];
      r && (n += ";" + r), (o.cssText = n), (s = Uc.test(n));
    }
  } else t && e.removeAttribute("style");
  ho in e && ((e[ho] = s ? o.display : ""), e[oi] && (o.display = "none"));
}
const Ss = /\s*!important$/;
function oo(e, t, n) {
  if (J(n)) n.forEach((o) => oo(e, t, o));
  else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n);
  else {
    const o = Wc(e, t);
    Ss.test(n)
      ? e.setProperty(jt(o), n.replace(Ss, ""), "important")
      : (e[o] = n);
  }
}
const Es = ["Webkit", "Moz", "ms"],
  Jo = {};
function Wc(e, t) {
  const n = Jo[t];
  if (n) return n;
  let o = at(t);
  if (o !== "filter" && o in e) return (Jo[t] = o);
  o = xo(o);
  for (let l = 0; l < Es.length; l++) {
    const s = Es[l] + o;
    if (s in e) return (Jo[t] = s);
  }
  return t;
}
const Ts = "http://www.w3.org/1999/xlink";
function Jc(e, t, n, o, l) {
  if (o && t.startsWith("xlink:"))
    n == null
      ? e.removeAttributeNS(Ts, t.slice(6, t.length))
      : e.setAttributeNS(Ts, t, n);
  else {
    const s = qi(t);
    n == null || (s && !cr(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, s ? "" : n);
  }
}
function Yc(e, t, n, o, l, s, r) {
  if (t === "innerHTML" || t === "textContent") {
    o && r(o, l, s), (e[t] = n ?? "");
    return;
  }
  const i = e.tagName;
  if (t === "value" && i !== "PROGRESS" && !i.includes("-")) {
    const c = i === "OPTION" ? e.getAttribute("value") || "" : e.value,
      f = n ?? "";
    (c !== f || !("_value" in e)) && (e.value = f),
      n == null && e.removeAttribute(t),
      (e._value = n);
    return;
  }
  let a = !1;
  if (n === "" || n == null) {
    const c = typeof e[t];
    c === "boolean"
      ? (n = cr(n))
      : n == null && c === "string"
        ? ((n = ""), (a = !0))
        : c === "number" && ((n = 0), (a = !0));
  }
  try {
    e[t] = n;
  } catch {}
  a && e.removeAttribute(t);
}
function Gc(e, t, n, o) {
  e.addEventListener(t, n, o);
}
function qc(e, t, n, o) {
  e.removeEventListener(t, n, o);
}
const Os = Symbol("_vei");
function Xc(e, t, n, o, l = null) {
  const s = e[Os] || (e[Os] = {}),
    r = s[t];
  if (o && r) r.value = o;
  else {
    const [i, a] = Zc(t);
    if (o) {
      const c = (s[t] = tu(o, l));
      Gc(e, i, c, a);
    } else r && (qc(e, i, r, a), (s[t] = void 0));
  }
}
const As = /(?:Once|Passive|Capture)$/;
function Zc(e) {
  let t;
  if (As.test(e)) {
    t = {};
    let o;
    for (; (o = e.match(As)); )
      (e = e.slice(0, e.length - o[0].length)), (t[o[0].toLowerCase()] = !0);
  }
  return [e[2] === ":" ? e.slice(3) : jt(e.slice(2)), t];
}
let Yo = 0;
const Qc = Promise.resolve(),
  eu = () => Yo || (Qc.then(() => (Yo = 0)), (Yo = Date.now()));
function tu(e, t) {
  const n = (o) => {
    if (!o._vts) o._vts = Date.now();
    else if (o._vts <= n.attached) return;
    qe(nu(o, n.value), t, 5, [o]);
  };
  return (n.value = e), (n.attached = eu()), n;
}
function nu(e, t) {
  if (J(t)) {
    const n = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0);
      }),
      t.map((o) => (l) => !l._stopped && o && o(l))
    );
  } else return t;
}
const Ps = (e) =>
    e.charCodeAt(0) === 111 &&
    e.charCodeAt(1) === 110 &&
    e.charCodeAt(2) > 96 &&
    e.charCodeAt(2) < 123,
  ou = (e, t, n, o, l, s, r, i, a) => {
    const c = l === "svg";
    t === "class"
      ? zc(e, o, c)
      : t === "style"
        ? Kc(e, n, o)
        : bo(t)
          ? xl(t) || Xc(e, t, n, o, r)
          : (
                t[0] === "."
                  ? ((t = t.slice(1)), !0)
                  : t[0] === "^"
                    ? ((t = t.slice(1)), !1)
                    : lu(e, t, o, c)
              )
            ? Yc(e, t, o, s, r, i, a)
            : (t === "true-value"
                ? (e._trueValue = o)
                : t === "false-value" && (e._falseValue = o),
              Jc(e, t, o, c));
  };
function lu(e, t, n, o) {
  if (o)
    return !!(
      t === "innerHTML" ||
      t === "textContent" ||
      (t in e && Ps(t) && X(n))
    );
  if (
    t === "spellcheck" ||
    t === "draggable" ||
    t === "translate" ||
    t === "form" ||
    (t === "list" && e.tagName === "INPUT") ||
    (t === "type" && e.tagName === "TEXTAREA")
  )
    return !1;
  if (t === "width" || t === "height") {
    const l = e.tagName;
    if (l === "IMG" || l === "VIDEO" || l === "CANVAS" || l === "SOURCE")
      return !1;
  }
  return Ps(t) && ye(n) ? !1 : t in e;
}
const su = {
    esc: "escape",
    space: " ",
    up: "arrow-up",
    left: "arrow-left",
    right: "arrow-right",
    down: "arrow-down",
    delete: "backspace",
  },
  ru = (e, t) => {
    const n = e._withKeys || (e._withKeys = {}),
      o = t.join(".");
    return (
      n[o] ||
      (n[o] = (l) => {
        if (!("key" in l)) return;
        const s = jt(l.key);
        if (t.some((r) => r === s || su[r] === s)) return e(l);
      })
    );
  },
  iu = Ee({ patchProp: ou }, Mc);
let Is;
function au() {
  return Is || (Is = fc(iu));
}
const si = (...e) => {
  const t = au().createApp(...e),
    { mount: n } = t;
  return (
    (t.mount = (o) => {
      const l = uu(o);
      if (!l) return;
      const s = t._component;
      !X(s) && !s.render && !s.template && (s.template = l.innerHTML),
        (l.innerHTML = "");
      const r = n(l, !1, cu(l));
      return (
        l instanceof Element &&
          (l.removeAttribute("v-cloak"), l.setAttribute("data-v-app", "")),
        r
      );
    }),
    t
  );
};
function cu(e) {
  if (e instanceof SVGElement) return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function uu(e) {
  return ye(e) ? document.querySelector(e) : e;
}
const fu = "/web/logo.png",
  du = "/web/usage.png",
  hu = "/web/tem.png",
  gu = "/web/banner.png";
function ml() {}
const Se = Object.assign,
  ko = typeof window < "u",
  zt = (e) => e !== null && typeof e == "object",
  Oe = (e) => e != null,
  Pn = (e) => typeof e == "function",
  ri = (e) => zt(e) && Pn(e.then) && Pn(e.catch),
  ii = (e) => typeof e == "number" || /^\d+(\.\d+)?$/.test(e),
  mu = () =>
    ko ? /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase()) : !1;
function Bs(e, t) {
  const n = t.split(".");
  let o = e;
  return (
    n.forEach((l) => {
      var s;
      o = zt(o) && (s = o[l]) != null ? s : "";
    }),
    o
  );
}
function go(e, t, n) {
  return t.reduce((o, l) => ((!n || e[l] !== void 0) && (o[l] = e[l]), o), {});
}
const Cn = (e, t) => JSON.stringify(e) === JSON.stringify(t),
  $s = (e) => (Array.isArray(e) ? e : [e]),
  nt = null,
  fe = [Number, String],
  Te = { type: Boolean, default: !0 },
  Jn = (e) => ({ type: e, required: !0 }),
  mo = () => ({ type: Array, default: () => [] }),
  vu = (e) => ({ type: Number, default: e }),
  Ue = (e) => ({ type: fe, default: e }),
  de = (e) => ({ type: String, default: e });
var Mn = typeof window < "u";
function ks(e) {
  return Mn ? requestAnimationFrame(e) : -1;
}
function pu(e) {
  Mn && cancelAnimationFrame(e);
}
var bu = (e) => e === window,
  Ns = (e, t) => ({
    top: 0,
    left: 0,
    right: e,
    bottom: t,
    width: e,
    height: t,
  }),
  In = (e) => {
    const t = rn(e);
    if (bu(t)) {
      const n = t.innerWidth,
        o = t.innerHeight;
      return Ns(n, o);
    }
    return t != null && t.getBoundingClientRect
      ? t.getBoundingClientRect()
      : Ns(0, 0);
  };
function Dn(e) {
  const t = gt(e, null);
  if (t) {
    const n = Wt(),
      { link: o, unlink: l, internalChildren: s } = t;
    o(n), Ao(() => l(n));
    const r = se(() => s.indexOf(n));
    return { parent: t, index: r };
  }
  return { parent: null, index: L(-1) };
}
function yu(e) {
  const t = [],
    n = (o) => {
      Array.isArray(o) &&
        o.forEach((l) => {
          var s;
          co(l) &&
            (t.push(l),
            (s = l.component) != null &&
              s.subTree &&
              (t.push(l.component.subTree), n(l.component.subTree.children)),
            l.children && n(l.children));
        });
    };
  return n(e), t;
}
var Rs = (e, t) => {
  const n = e.indexOf(t);
  return n === -1
    ? e.findIndex(
        (o) =>
          t.key !== void 0 &&
          t.key !== null &&
          o.type === t.type &&
          o.key === t.key,
      )
    : n;
};
function _u(e, t, n) {
  const o = yu(e.subTree.children);
  n.sort((s, r) => Rs(o, s.vnode) - Rs(o, r.vnode));
  const l = n.map((s) => s.proxy);
  t.sort((s, r) => {
    const i = l.indexOf(s),
      a = l.indexOf(r);
    return i - a;
  });
}
function Fl(e) {
  const t = pt([]),
    n = pt([]),
    o = Wt();
  return {
    children: t,
    linkChildren: (s) => {
      kn(
        e,
        Object.assign(
          {
            link: (a) => {
              a.proxy && (n.push(a), t.push(a.proxy), _u(o, t, n));
            },
            unlink: (a) => {
              const c = n.indexOf(a);
              t.splice(c, 1), n.splice(c, 1);
            },
            children: t,
            internalChildren: n,
          },
          s,
        ),
      );
    },
  };
}
function ai(e) {
  let t;
  yt(() => {
    e(),
      Ge(() => {
        t = !0;
      });
  }),
    To(() => {
      t && e();
    });
}
function Jt(e, t, n = {}) {
  if (!Mn) return;
  const { target: o = window, passive: l = !1, capture: s = !1 } = n;
  let r = !1,
    i;
  const a = (d) => {
      if (r) return;
      const g = rn(d);
      g &&
        !i &&
        (g.addEventListener(e, t, { capture: s, passive: l }), (i = !0));
    },
    c = (d) => {
      if (r) return;
      const g = rn(d);
      g && i && (g.removeEventListener(e, t, s), (i = !1));
    };
  Ao(() => c(o)), Bn(() => c(o)), ai(() => a(o));
  let f;
  return (
    Me(o) &&
      (f = we(o, (d, g) => {
        c(g), a(d);
      })),
    () => {
      f == null || f(), c(o), (r = !0);
    }
  );
}
var Yn, Go;
function xu() {
  if (!Yn && ((Yn = L(0)), (Go = L(0)), Mn)) {
    const e = () => {
      (Yn.value = window.innerWidth), (Go.value = window.innerHeight);
    };
    e(),
      window.addEventListener("resize", e, { passive: !0 }),
      window.addEventListener("orientationchange", e, { passive: !0 });
  }
  return { width: Yn, height: Go };
}
var Cu = /scroll|auto|overlay/i,
  ci = Mn ? window : void 0;
function wu(e) {
  return e.tagName !== "HTML" && e.tagName !== "BODY" && e.nodeType === 1;
}
function ui(e, t = ci) {
  let n = e;
  for (; n && n !== t && wu(n); ) {
    const { overflowY: o } = window.getComputedStyle(n);
    if (Cu.test(o)) return n;
    n = n.parentNode;
  }
  return t;
}
function Su(e, t = ci) {
  const n = L();
  return (
    yt(() => {
      e.value && (n.value = ui(e.value, t));
    }),
    n
  );
}
var fi = Symbol("van-field");
function di(e) {
  const t = gt(fi, null);
  t &&
    !t.customValue.value &&
    ((t.customValue.value = e),
    we(e, () => {
      t.resetValidation(), t.validateWithTrigger("onChange");
    }));
}
function Ms(e, t) {
  "scrollTop" in e ? (e.scrollTop = t) : e.scrollTo(e.scrollX, t);
}
function hi() {
  return (
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0
  );
}
function gi(e) {
  Ms(window, e), Ms(document.body, e);
}
const Eu = mu();
function Tu() {
  Eu && gi(hi());
}
const mi = (e) => e.stopPropagation();
function mt(e, t) {
  (typeof e.cancelable != "boolean" || e.cancelable) && e.preventDefault(),
    t && mi(e);
}
function Ou(e) {
  const t = rn(e);
  if (!t) return !1;
  const n = window.getComputedStyle(t),
    o = n.display === "none",
    l = t.offsetParent === null && n.position !== "fixed";
  return o || l;
}
const { width: vi, height: pi } = xu();
function Ae(e) {
  if (Oe(e)) return ii(e) ? `${e}px` : String(e);
}
function Vl(e) {
  if (Oe(e)) {
    if (Array.isArray(e)) return { width: Ae(e[0]), height: Ae(e[1]) };
    const t = Ae(e);
    return { width: t, height: t };
  }
}
function Au(e) {
  const t = {};
  return e !== void 0 && (t.zIndex = +e), t;
}
let qo;
function Pu() {
  if (!qo) {
    const e = document.documentElement,
      t = e.style.fontSize || window.getComputedStyle(e).fontSize;
    qo = parseFloat(t);
  }
  return qo;
}
function Iu(e) {
  return (e = e.replace(/rem/g, "")), +e * Pu();
}
function Bu(e) {
  return (e = e.replace(/vw/g, "")), (+e * vi.value) / 100;
}
function $u(e) {
  return (e = e.replace(/vh/g, "")), (+e * pi.value) / 100;
}
function ku(e) {
  if (typeof e == "number") return e;
  if (ko) {
    if (e.includes("rem")) return Iu(e);
    if (e.includes("vw")) return Bu(e);
    if (e.includes("vh")) return $u(e);
  }
  return parseFloat(e);
}
const Nu = /-(\w)/g,
  bi = (e) => e.replace(Nu, (t, n) => n.toUpperCase()),
  Ru = (e) =>
    e
      .replace(/([A-Z])/g, "-$1")
      .toLowerCase()
      .replace(/^-/, ""),
  vo = (e, t, n) => Math.min(Math.max(e, t), n);
function Ds(e, t, n) {
  const o = e.indexOf(t);
  return o === -1
    ? e
    : t === "-" && o !== 0
      ? e.slice(0, o)
      : e.slice(0, o + 1) + e.slice(o).replace(n, "");
}
function Mu(e, t = !0, n = !0) {
  t ? (e = Ds(e, ".", /\./g)) : (e = e.split(".")[0]),
    n ? (e = Ds(e, "-", /-/g)) : (e = e.replace(/-/, ""));
  const o = t ? /[^-0-9.]/g : /[^-0-9]/g;
  return e.replace(o, "");
}
function Du(e, t) {
  return Math.round((e + t) * 1e10) / 1e10;
}
const { hasOwnProperty: Lu } = Object.prototype;
function Fu(e, t, n) {
  const o = t[n];
  Oe(o) &&
    (!Lu.call(e, n) || !zt(o) ? (e[n] = o) : (e[n] = yi(Object(e[n]), o)));
}
function yi(e, t) {
  return (
    Object.keys(t).forEach((n) => {
      Fu(e, t, n);
    }),
    e
  );
}
var Vu = {
  name: "姓名",
  tel: "电话",
  save: "保存",
  clear: "清空",
  cancel: "取消",
  confirm: "确认",
  delete: "删除",
  loading: "加载中...",
  noCoupon: "暂无优惠券",
  nameEmpty: "请填写姓名",
  addContact: "添加联系人",
  telInvalid: "请填写正确的电话",
  vanCalendar: {
    end: "结束",
    start: "开始",
    title: "日期选择",
    weekdays: ["日", "一", "二", "三", "四", "五", "六"],
    monthTitle: (e, t) => `${e}年${t}月`,
    rangePrompt: (e) => `最多选择 ${e} 天`,
  },
  vanCascader: { select: "请选择" },
  vanPagination: { prev: "上一页", next: "下一页" },
  vanPullRefresh: { pulling: "下拉即可刷新...", loosing: "释放即可刷新..." },
  vanSubmitBar: { label: "合计:" },
  vanCoupon: {
    unlimited: "无门槛",
    discount: (e) => `${e}折`,
    condition: (e) => `满${e}元可用`,
  },
  vanCouponCell: { title: "优惠券", count: (e) => `${e}张可用` },
  vanCouponList: {
    exchange: "兑换",
    close: "不使用",
    enable: "可用",
    disabled: "不可用",
    placeholder: "输入优惠码",
  },
  vanAddressEdit: {
    area: "地区",
    areaEmpty: "请选择地区",
    addressEmpty: "请填写详细地址",
    addressDetail: "详细地址",
    defaultAddress: "设为默认收货地址",
  },
  vanAddressList: { add: "新增地址" },
};
const Ls = L("zh-CN"),
  Fs = pt({ "zh-CN": Vu }),
  Hu = {
    messages() {
      return Fs[Ls.value];
    },
    use(e, t) {
      (Ls.value = e), this.add({ [e]: t });
    },
    add(e = {}) {
      yi(Fs, e);
    },
  };
var zu = Hu;
function ju(e) {
  const t = bi(e) + ".";
  return (n, ...o) => {
    const l = zu.messages(),
      s = Bs(l, t + n) || Bs(l, n);
    return Pn(s) ? s(...o) : s;
  };
}
function vl(e, t) {
  return t
    ? typeof t == "string"
      ? ` ${e}--${t}`
      : Array.isArray(t)
        ? t.reduce((n, o) => n + vl(e, o), "")
        : Object.keys(t).reduce((n, o) => n + (t[o] ? vl(e, o) : ""), "")
    : "";
}
function Uu(e) {
  return (t, n) => (
    t && typeof t != "string" && ((n = t), (t = "")),
    (t = t ? `${e}__${t}` : e),
    `${t}${vl(t, n)}`
  );
}
function he(e) {
  const t = `van-${e}`;
  return [t, Uu(t), ju(t)];
}
const Ln = "van-hairline",
  Ku = `${Ln}--top`,
  Wu = `${Ln}--left`,
  Ju = `${Ln}--surround`,
  Yu = `${Ln}--top-bottom`,
  Gu = `${Ln}-unset--top-bottom`,
  po = "van-haptics-feedback",
  qu = Symbol("van-form"),
  Vs = 5;
function _i(e, { args: t = [], done: n, canceled: o, error: l }) {
  if (e) {
    const s = e.apply(null, t);
    ri(s)
      ? s
          .then((r) => {
            r ? n() : o && o();
          })
          .catch(l || ml)
      : s
        ? n()
        : o && o();
  } else n();
}
function be(e) {
  return (
    (e.install = (t) => {
      const { name: n } = e;
      n && (t.component(n, e), t.component(bi(`-${n}`), e));
    }),
    e
  );
}
const xi = Symbol();
function Xu(e) {
  const t = gt(xi, null);
  t &&
    we(t, (n) => {
      n && e();
    });
}
const Zu = (e, t) => {
  const n = L(),
    o = () => {
      n.value = In(e).height;
    };
  return (
    yt(() => {
      if ((Ge(o), t)) for (let l = 1; l <= 3; l++) setTimeout(o, 100 * l);
    }),
    Xu(() => Ge(o)),
    we([vi, pi], o),
    n
  );
};
function Qu(e, t) {
  const n = Zu(e, !0);
  return (o) =>
    p(
      "div",
      {
        class: t("placeholder"),
        style: { height: n.value ? `${n.value}px` : void 0 },
      },
      [o()],
    );
}
const [Ci, Hs] = he("action-bar"),
  wi = Symbol(Ci),
  ef = { placeholder: Boolean, safeAreaInsetBottom: Te };
var tf = ge({
  name: Ci,
  props: ef,
  setup(e, { slots: t }) {
    const n = L(),
      o = Qu(n, Hs),
      { linkChildren: l } = Fl(wi);
    l();
    const s = () => {
      var r;
      return p(
        "div",
        {
          ref: n,
          class: [Hs(), { "van-safe-area-bottom": e.safeAreaInsetBottom }],
        },
        [(r = t.default) == null ? void 0 : r.call(t)],
      );
    };
    return () => (e.placeholder ? o(s) : s());
  },
});
const nf = be(tf);
function Yt(e) {
  const t = Wt();
  t && Se(t.proxy, e);
}
const No = { to: [String, Object], url: String, replace: Boolean };
function of({ to: e, url: t, replace: n, $router: o }) {
  e && o
    ? o[n ? "replace" : "push"](e)
    : t && (n ? location.replace(t) : (location.href = t));
}
function Ro() {
  const e = Wt().proxy;
  return () => of(e);
}
const [lf, zs] = he("badge"),
  sf = {
    dot: Boolean,
    max: fe,
    tag: de("div"),
    color: String,
    offset: Array,
    content: fe,
    showZero: Te,
    position: de("top-right"),
  };
var rf = ge({
  name: lf,
  props: sf,
  setup(e, { slots: t }) {
    const n = () => {
        if (t.content) return !0;
        const { content: i, showZero: a } = e;
        return Oe(i) && i !== "" && (a || (i !== 0 && i !== "0"));
      },
      o = () => {
        const { dot: i, max: a, content: c } = e;
        if (!i && n())
          return t.content
            ? t.content()
            : Oe(a) && ii(c) && +c > +a
              ? `${a}+`
              : c;
      },
      l = (i) => (i.startsWith("-") ? i.replace("-", "") : `-${i}`),
      s = se(() => {
        const i = { background: e.color };
        if (e.offset) {
          const [a, c] = e.offset,
            { position: f } = e,
            [d, g] = f.split("-");
          t.default
            ? (typeof c == "number"
                ? (i[d] = Ae(d === "top" ? c : -c))
                : (i[d] = d === "top" ? Ae(c) : l(c)),
              typeof a == "number"
                ? (i[g] = Ae(g === "left" ? a : -a))
                : (i[g] = g === "left" ? Ae(a) : l(a)))
            : ((i.marginTop = Ae(c)), (i.marginLeft = Ae(a)));
        }
        return i;
      }),
      r = () => {
        if (n() || e.dot)
          return p(
            "div",
            {
              class: zs([e.position, { dot: e.dot, fixed: !!t.default }]),
              style: s.value,
            },
            [o()],
          );
      };
    return () => {
      if (t.default) {
        const { tag: i } = e;
        return p(
          i,
          { class: zs("wrapper") },
          { default: () => [t.default(), r()] },
        );
      }
      return r();
    };
  },
});
const Si = be(rf);
let Ei = 2e3;
const af = () => ++Ei,
  cf = (e) => {
    Ei = e;
  },
  [Ti, uf] = he("config-provider"),
  Oi = Symbol(Ti),
  ff = {
    tag: de("div"),
    theme: de("light"),
    zIndex: Number,
    themeVars: Object,
    themeVarsDark: Object,
    themeVarsLight: Object,
    themeVarsScope: de("local"),
    iconPrefix: String,
  };
function df(e) {
  return e.replace(/([a-zA-Z])(\d)/g, "$1-$2");
}
function hf(e) {
  const t = {};
  return (
    Object.keys(e).forEach((n) => {
      const o = df(Ru(n));
      t[`--van-${o}`] = e[n];
    }),
    t
  );
}
function Gn(e = {}, t = {}) {
  Object.keys(e).forEach((n) => {
    e[n] !== t[n] && document.documentElement.style.setProperty(n, e[n]);
  }),
    Object.keys(t).forEach((n) => {
      e[n] || document.documentElement.style.removeProperty(n);
    });
}
var gf = ge({
  name: Ti,
  props: ff,
  setup(e, { slots: t }) {
    const n = se(() =>
      hf(
        Se(
          {},
          e.themeVars,
          e.theme === "dark" ? e.themeVarsDark : e.themeVarsLight,
        ),
      ),
    );
    if (ko) {
      const o = () => {
          document.documentElement.classList.add(`van-theme-${e.theme}`);
        },
        l = (s = e.theme) => {
          document.documentElement.classList.remove(`van-theme-${s}`);
        };
      we(
        () => e.theme,
        (s, r) => {
          r && l(r), o();
        },
        { immediate: !0 },
      ),
        To(o),
        Bn(l),
        $n(l),
        we(n, (s, r) => {
          e.themeVarsScope === "global" && Gn(s, r);
        }),
        we(
          () => e.themeVarsScope,
          (s, r) => {
            r === "global" && Gn({}, n.value),
              s === "global" && Gn(n.value, {});
          },
        ),
        e.themeVarsScope === "global" && Gn(n.value, {});
    }
    return (
      kn(Oi, e),
      Rr(() => {
        e.zIndex !== void 0 && cf(e.zIndex);
      }),
      () =>
        p(
          e.tag,
          {
            class: uf(),
            style: e.themeVarsScope === "local" ? n.value : void 0,
          },
          {
            default: () => {
              var o;
              return [(o = t.default) == null ? void 0 : o.call(t)];
            },
          },
        )
    );
  },
});
const [mf, js] = he("icon"),
  vf = (e) => (e == null ? void 0 : e.includes("/")),
  pf = {
    dot: Boolean,
    tag: de("i"),
    name: String,
    size: fe,
    badge: fe,
    color: String,
    badgeProps: Object,
    classPrefix: String,
  };
var bf = ge({
  name: mf,
  props: pf,
  setup(e, { slots: t }) {
    const n = gt(Oi, null),
      o = se(
        () => e.classPrefix || (n == null ? void 0 : n.iconPrefix) || js(),
      );
    return () => {
      const { tag: l, dot: s, name: r, size: i, badge: a, color: c } = e,
        f = vf(r);
      return p(
        Si,
        ot(
          {
            dot: s,
            tag: l,
            class: [o.value, f ? "" : `${o.value}-${r}`],
            style: { color: c, fontSize: Ae(i) },
            content: a,
          },
          e.badgeProps,
        ),
        {
          default: () => {
            var d;
            return [
              (d = t.default) == null ? void 0 : d.call(t),
              f && p("img", { class: js("image"), src: r }, null),
            ];
          },
        },
      );
    };
  },
});
const vt = be(bf),
  [yf, wn] = he("loading"),
  _f = Array(12)
    .fill(null)
    .map((e, t) => p("i", { class: wn("line", String(t + 1)) }, null)),
  xf = p("svg", { class: wn("circular"), viewBox: "25 25 50 50" }, [
    p("circle", { cx: "50", cy: "50", r: "20", fill: "none" }, null),
  ]),
  Cf = {
    size: fe,
    type: de("circular"),
    color: String,
    vertical: Boolean,
    textSize: fe,
    textColor: String,
  };
var wf = ge({
  name: yf,
  props: Cf,
  setup(e, { slots: t }) {
    const n = se(() => Se({ color: e.color }, Vl(e.size))),
      o = () => {
        const s = e.type === "spinner" ? _f : xf;
        return p("span", { class: wn("spinner", e.type), style: n.value }, [
          t.icon ? t.icon() : s,
        ]);
      },
      l = () => {
        var s;
        if (t.default)
          return p(
            "span",
            {
              class: wn("text"),
              style: {
                fontSize: Ae(e.textSize),
                color: (s = e.textColor) != null ? s : e.color,
              },
            },
            [t.default()],
          );
      };
    return () => {
      const { type: s, vertical: r } = e;
      return p(
        "div",
        {
          class: wn([s, { vertical: r }]),
          "aria-live": "polite",
          "aria-busy": !0,
        },
        [o(), l()],
      );
    };
  },
});
const Mo = be(wf),
  [Sf, qt] = he("button"),
  Ef = Se({}, No, {
    tag: de("button"),
    text: String,
    icon: String,
    type: de("default"),
    size: de("normal"),
    color: String,
    block: Boolean,
    plain: Boolean,
    round: Boolean,
    square: Boolean,
    loading: Boolean,
    hairline: Boolean,
    disabled: Boolean,
    iconPrefix: String,
    nativeType: de("button"),
    loadingSize: fe,
    loadingText: String,
    loadingType: String,
    iconPosition: de("left"),
  });
var Tf = ge({
  name: Sf,
  props: Ef,
  emits: ["click"],
  setup(e, { emit: t, slots: n }) {
    const o = Ro(),
      l = () =>
        n.loading
          ? n.loading()
          : p(
              Mo,
              {
                size: e.loadingSize,
                type: e.loadingType,
                class: qt("loading"),
              },
              null,
            ),
      s = () => {
        if (e.loading) return l();
        if (n.icon) return p("div", { class: qt("icon") }, [n.icon()]);
        if (e.icon)
          return p(
            vt,
            { name: e.icon, class: qt("icon"), classPrefix: e.iconPrefix },
            null,
          );
      },
      r = () => {
        let c;
        if (
          (e.loading
            ? (c = e.loadingText)
            : (c = n.default ? n.default() : e.text),
          c)
        )
          return p("span", { class: qt("text") }, [c]);
      },
      i = () => {
        const { color: c, plain: f } = e;
        if (c) {
          const d = { color: f ? c : "white" };
          return (
            f || (d.background = c),
            c.includes("gradient") ? (d.border = 0) : (d.borderColor = c),
            d
          );
        }
      },
      a = (c) => {
        e.loading ? mt(c) : e.disabled || (t("click", c), o());
      };
    return () => {
      const {
          tag: c,
          type: f,
          size: d,
          block: g,
          round: _,
          plain: E,
          square: T,
          loading: $,
          disabled: A,
          hairline: V,
          nativeType: D,
          iconPosition: F,
        } = e,
        U = [
          qt([
            f,
            d,
            {
              plain: E,
              block: g,
              round: _,
              square: T,
              loading: $,
              disabled: A,
              hairline: V,
            },
          ]),
          { [Ju]: V },
        ];
      return p(
        c,
        { type: D, class: U, style: i(), disabled: A, onClick: a },
        {
          default: () => [
            p("div", { class: qt("content") }, [
              F === "left" && s(),
              r(),
              F === "right" && s(),
            ]),
          ],
        },
      );
    };
  },
});
const pl = be(Tf),
  [Of, Af] = he("action-bar-button"),
  Pf = Se({}, No, {
    type: String,
    text: String,
    icon: String,
    color: String,
    loading: Boolean,
    disabled: Boolean,
  });
var If = ge({
  name: Of,
  props: Pf,
  setup(e, { slots: t }) {
    const n = Ro(),
      { parent: o, index: l } = Dn(wi),
      s = se(() => {
        if (o) {
          const i = o.children[l.value - 1];
          return !(i && "isButton" in i);
        }
      }),
      r = se(() => {
        if (o) {
          const i = o.children[l.value + 1];
          return !(i && "isButton" in i);
        }
      });
    return (
      Yt({ isButton: !0 }),
      () => {
        const {
          type: i,
          icon: a,
          text: c,
          color: f,
          loading: d,
          disabled: g,
        } = e;
        return p(
          pl,
          {
            class: Af([i, { last: r.value, first: s.value }]),
            size: "large",
            type: i,
            icon: a,
            color: f,
            loading: d,
            disabled: g,
            onClick: n,
          },
          { default: () => [t.default ? t.default() : c] },
        );
      }
    );
  },
});
const Us = be(If),
  Do = {
    show: Boolean,
    zIndex: fe,
    overlay: Te,
    duration: fe,
    teleport: [String, Object],
    lockScroll: Te,
    lazyRender: Te,
    beforeClose: Function,
    overlayStyle: Object,
    overlayClass: nt,
    transitionAppear: Boolean,
    closeOnClickOverlay: Te,
  },
  Bf = Object.keys(Do);
function $f(e, t) {
  return e > t ? "horizontal" : t > e ? "vertical" : "";
}
function Hl() {
  const e = L(0),
    t = L(0),
    n = L(0),
    o = L(0),
    l = L(0),
    s = L(0),
    r = L(""),
    i = L(!0),
    a = () => r.value === "vertical",
    c = () => r.value === "horizontal",
    f = () => {
      (n.value = 0),
        (o.value = 0),
        (l.value = 0),
        (s.value = 0),
        (r.value = ""),
        (i.value = !0);
    };
  return {
    move: (_) => {
      const E = _.touches[0];
      (n.value = (E.clientX < 0 ? 0 : E.clientX) - e.value),
        (o.value = E.clientY - t.value),
        (l.value = Math.abs(n.value)),
        (s.value = Math.abs(o.value));
      const T = 10;
      (!r.value || (l.value < T && s.value < T)) &&
        (r.value = $f(l.value, s.value)),
        i.value && (l.value > Vs || s.value > Vs) && (i.value = !1);
    },
    start: (_) => {
      f(), (e.value = _.touches[0].clientX), (t.value = _.touches[0].clientY);
    },
    reset: f,
    startX: e,
    startY: t,
    deltaX: n,
    deltaY: o,
    offsetX: l,
    offsetY: s,
    direction: r,
    isVertical: a,
    isHorizontal: c,
    isTap: i,
  };
}
let gn = 0;
const Ks = "van-overflow-hidden";
function kf(e, t) {
  const n = Hl(),
    o = "01",
    l = "10",
    s = (f) => {
      n.move(f);
      const d = n.deltaY.value > 0 ? l : o,
        g = ui(f.target, e.value),
        { scrollHeight: _, offsetHeight: E, scrollTop: T } = g;
      let $ = "11";
      T === 0 ? ($ = E >= _ ? "00" : "01") : T + E >= _ && ($ = "10"),
        $ !== "11" &&
          n.isVertical() &&
          !(parseInt($, 2) & parseInt(d, 2)) &&
          mt(f, !0);
    },
    r = () => {
      document.addEventListener("touchstart", n.start),
        document.addEventListener("touchmove", s, { passive: !1 }),
        gn || document.body.classList.add(Ks),
        gn++;
    },
    i = () => {
      gn &&
        (document.removeEventListener("touchstart", n.start),
        document.removeEventListener("touchmove", s),
        gn--,
        gn || document.body.classList.remove(Ks));
    },
    a = () => t() && r(),
    c = () => t() && i();
  ai(a),
    Bn(c),
    $n(c),
    we(t, (f) => {
      f ? r() : i();
    });
}
function Ai(e) {
  const t = L(!1);
  return (
    we(
      e,
      (n) => {
        n && (t.value = n);
      },
      { immediate: !0 },
    ),
    (n) => () => (t.value ? n() : null)
  );
}
const bl = () => {
    var e;
    const { scopeId: t } = ((e = Wt()) == null ? void 0 : e.vnode) || {};
    return t ? { [t]: "" } : null;
  },
  [Nf, Rf] = he("overlay"),
  Mf = {
    show: Boolean,
    zIndex: fe,
    duration: fe,
    className: nt,
    lockScroll: Te,
    lazyRender: Te,
    customStyle: Object,
  };
var Df = ge({
  name: Nf,
  props: Mf,
  setup(e, { slots: t }) {
    const n = L(),
      o = Ai(() => e.show || !e.lazyRender),
      l = (r) => {
        e.lockScroll && mt(r, !0);
      },
      s = o(() => {
        var r;
        const i = Se(Au(e.zIndex), e.customStyle);
        return (
          Oe(e.duration) && (i.animationDuration = `${e.duration}s`),
          Dr(
            p("div", { ref: n, style: i, class: [Rf(), e.className] }, [
              (r = t.default) == null ? void 0 : r.call(t),
            ]),
            [[li, e.show]],
          )
        );
      });
    return (
      Jt("touchmove", l, { target: n }),
      () => p(Rn, { name: "van-fade", appear: !0 }, { default: s })
    );
  },
});
const Lf = be(Df),
  Ff = Se({}, Do, {
    round: Boolean,
    position: de("center"),
    closeIcon: de("cross"),
    closeable: Boolean,
    transition: String,
    iconPrefix: String,
    closeOnPopstate: Boolean,
    closeIconPosition: de("top-right"),
    safeAreaInsetTop: Boolean,
    safeAreaInsetBottom: Boolean,
  }),
  [Vf, Ws] = he("popup");
var Hf = ge({
  name: Vf,
  inheritAttrs: !1,
  props: Ff,
  emits: [
    "open",
    "close",
    "opened",
    "closed",
    "keydown",
    "update:show",
    "clickOverlay",
    "clickCloseIcon",
  ],
  setup(e, { emit: t, attrs: n, slots: o }) {
    let l, s;
    const r = L(),
      i = L(),
      a = Ai(() => e.show || !e.lazyRender),
      c = se(() => {
        const P = { zIndex: r.value };
        if (Oe(e.duration)) {
          const K =
            e.position === "center"
              ? "animationDuration"
              : "transitionDuration";
          P[K] = `${e.duration}s`;
        }
        return P;
      }),
      f = () => {
        l ||
          ((l = !0),
          (r.value = e.zIndex !== void 0 ? +e.zIndex : af()),
          t("open"));
      },
      d = () => {
        l &&
          _i(e.beforeClose, {
            done() {
              (l = !1), t("close"), t("update:show", !1);
            },
          });
      },
      g = (P) => {
        t("clickOverlay", P), e.closeOnClickOverlay && d();
      },
      _ = () => {
        if (e.overlay)
          return p(
            Lf,
            ot(
              {
                show: e.show,
                class: e.overlayClass,
                zIndex: r.value,
                duration: e.duration,
                customStyle: e.overlayStyle,
                role: e.closeOnClickOverlay ? "button" : void 0,
                tabindex: e.closeOnClickOverlay ? 0 : void 0,
              },
              bl(),
              { onClick: g },
            ),
            { default: o["overlay-content"] },
          );
      },
      E = (P) => {
        t("clickCloseIcon", P), d();
      },
      T = () => {
        if (e.closeable)
          return p(
            vt,
            {
              role: "button",
              tabindex: 0,
              name: e.closeIcon,
              class: [Ws("close-icon", e.closeIconPosition), po],
              classPrefix: e.iconPrefix,
              onClick: E,
            },
            null,
          );
      };
    let $;
    const A = () => {
        $ && clearTimeout($),
          ($ = setTimeout(() => {
            t("opened");
          }));
      },
      V = () => t("closed"),
      D = (P) => t("keydown", P),
      F = a(() => {
        var P;
        const {
          round: K,
          position: N,
          safeAreaInsetTop: W,
          safeAreaInsetBottom: R,
        } = e;
        return Dr(
          p(
            "div",
            ot(
              {
                ref: i,
                style: c.value,
                role: "dialog",
                tabindex: 0,
                class: [
                  Ws({ round: K, [N]: N }),
                  { "van-safe-area-top": W, "van-safe-area-bottom": R },
                ],
                onKeydown: D,
              },
              n,
              bl(),
            ),
            [(P = o.default) == null ? void 0 : P.call(o), T()],
          ),
          [[li, e.show]],
        );
      }),
      U = () => {
        const { position: P, transition: K, transitionAppear: N } = e,
          W = P === "center" ? "van-fade" : `van-popup-slide-${P}`;
        return p(
          Rn,
          { name: K || W, appear: N, onAfterEnter: A, onAfterLeave: V },
          { default: F },
        );
      };
    return (
      we(
        () => e.show,
        (P) => {
          P &&
            !l &&
            (f(),
            n.tabindex === 0 &&
              Ge(() => {
                var K;
                (K = i.value) == null || K.focus();
              })),
            !P && l && ((l = !1), t("close"));
        },
      ),
      Yt({ popupRef: i }),
      kf(i, () => e.show && e.lockScroll),
      Jt("popstate", () => {
        e.closeOnPopstate && (d(), (s = !1));
      }),
      yt(() => {
        e.show && f();
      }),
      To(() => {
        s && (t("update:show", !0), (s = !1));
      }),
      Bn(() => {
        e.show && e.teleport && (d(), (s = !0));
      }),
      kn(xi, () => e.show),
      () =>
        e.teleport
          ? p(bc, { to: e.teleport }, { default: () => [_(), U()] })
          : p(Ve, null, [_(), U()])
    );
  },
});
const zl = be(Hf),
  [zf, dt, Js] = he("picker"),
  Pi = (e) => e.find((t) => !t.disabled) || e[0];
function jf(e, t) {
  const n = e[0];
  if (n) {
    if (Array.isArray(n)) return "multiple";
    if (t.children in n) return "cascade";
  }
  return "default";
}
function lo(e, t) {
  t = vo(t, 0, e.length);
  for (let n = t; n < e.length; n++) if (!e[n].disabled) return n;
  for (let n = t - 1; n >= 0; n--) if (!e[n].disabled) return n;
  return 0;
}
const Ys = (e, t, n) => t !== void 0 && !!e.find((o) => o[n.value] === t);
function yl(e, t, n) {
  const o = e.findIndex((s) => s[n.value] === t),
    l = lo(e, o);
  return e[l];
}
function Uf(e, t, n) {
  const o = [];
  let l = { [t.children]: e },
    s = 0;
  for (; l && l[t.children]; ) {
    const r = l[t.children],
      i = n.value[s];
    if (((l = Oe(i) ? yl(r, i, t) : void 0), !l && r.length)) {
      const a = Pi(r)[t.value];
      l = yl(r, a, t);
    }
    s++, o.push(r);
  }
  return o;
}
function Kf(e) {
  const { transform: t } = window.getComputedStyle(e),
    n = t.slice(7, t.length - 1).split(", ")[5];
  return Number(n);
}
function Wf(e) {
  return Se({ text: "text", value: "value", children: "children" }, e);
}
const Gs = 200,
  qs = 300,
  Jf = 15,
  [Ii, Xo] = he("picker-column"),
  Bi = Symbol(Ii);
var Yf = ge({
  name: Ii,
  props: {
    value: fe,
    fields: Jn(Object),
    options: mo(),
    readonly: Boolean,
    allowHtml: Boolean,
    optionHeight: Jn(Number),
    swipeDuration: Jn(fe),
    visibleOptionNum: Jn(fe),
  },
  emits: ["change", "clickOption", "scrollInto"],
  setup(e, { emit: t, slots: n }) {
    let o, l, s, r, i;
    const a = L(),
      c = L(),
      f = L(0),
      d = L(0),
      g = Hl(),
      _ = () => e.options.length,
      E = () => (e.optionHeight * (+e.visibleOptionNum - 1)) / 2,
      T = (R) => {
        let m = lo(e.options, R);
        const b = -m * e.optionHeight,
          I = () => {
            m > _() - 1 && (m = lo(e.options, R));
            const G = e.options[m][e.fields.value];
            G !== e.value && t("change", G);
          };
        o && b !== f.value ? (i = I) : I(), (f.value = b);
      },
      $ = () => e.readonly || !e.options.length,
      A = (R) => {
        o ||
          $() ||
          ((i = null), (d.value = Gs), T(R), t("clickOption", e.options[R]));
      },
      V = (R) => vo(Math.round(-R / e.optionHeight), 0, _() - 1),
      D = se(() => V(f.value)),
      F = (R, m) => {
        const b = Math.abs(R / m);
        R = f.value + (b / 0.003) * (R < 0 ? -1 : 1);
        const I = V(R);
        (d.value = +e.swipeDuration), T(I);
      },
      U = () => {
        (o = !1), (d.value = 0), i && (i(), (i = null));
      },
      P = (R) => {
        if (!$()) {
          if ((g.start(R), o)) {
            const m = Kf(c.value);
            f.value = Math.min(0, m - E());
          }
          (d.value = 0), (l = f.value), (s = Date.now()), (r = l), (i = null);
        }
      },
      K = (R) => {
        if ($()) return;
        g.move(R), g.isVertical() && ((o = !0), mt(R, !0));
        const m = vo(
            l + g.deltaY.value,
            -(_() * e.optionHeight),
            e.optionHeight,
          ),
          b = V(m);
        b !== D.value && t("scrollInto", e.options[b]), (f.value = m);
        const I = Date.now();
        I - s > qs && ((s = I), (r = m));
      },
      N = () => {
        if ($()) return;
        const R = f.value - r,
          m = Date.now() - s;
        if (m < qs && Math.abs(R) > Jf) {
          F(R, m);
          return;
        }
        const I = V(f.value);
        (d.value = Gs),
          T(I),
          setTimeout(() => {
            o = !1;
          }, 0);
      },
      W = () => {
        const R = { height: `${e.optionHeight}px` };
        return e.options.map((m, b) => {
          const I = m[e.fields.text],
            { disabled: G } = m,
            te = m[e.fields.value],
            ne = {
              role: "button",
              style: R,
              tabindex: G ? -1 : 0,
              class: [
                Xo("item", { disabled: G, selected: te === e.value }),
                m.className,
              ],
              onClick: () => A(b),
            },
            ie = {
              class: "van-ellipsis",
              [e.allowHtml ? "innerHTML" : "textContent"]: I,
            };
          return p("li", ne, [n.option ? n.option(m, b) : p("div", ie, null)]);
        });
      };
    return (
      Dn(Bi),
      Yt({ stopMomentum: U }),
      Rr(() => {
        const R = o
            ? Math.floor(-f.value / e.optionHeight)
            : e.options.findIndex((I) => I[e.fields.value] === e.value),
          m = lo(e.options, R),
          b = -m * e.optionHeight;
        o && m < R && U(), (f.value = b);
      }),
      Jt("touchmove", K, { target: a }),
      () =>
        p(
          "div",
          {
            ref: a,
            class: Xo(),
            onTouchstartPassive: P,
            onTouchend: N,
            onTouchcancel: N,
          },
          [
            p(
              "ul",
              {
                ref: c,
                style: {
                  transform: `translate3d(0, ${f.value + E()}px, 0)`,
                  transitionDuration: `${d.value}ms`,
                  transitionProperty: d.value ? "all" : "none",
                },
                class: Xo("wrapper"),
                onTransitionend: U,
              },
              [W()],
            ),
          ],
        )
    );
  },
});
const [Gf] = he("picker-toolbar"),
  Lo = { title: String, cancelButtonText: String, confirmButtonText: String },
  qf = ["cancel", "confirm", "title", "toolbar"],
  Xf = Object.keys(Lo);
var Zf = ge({
  name: Gf,
  props: Lo,
  emits: ["confirm", "cancel"],
  setup(e, { emit: t, slots: n }) {
    const o = () => {
        if (n.title) return n.title();
        if (e.title)
          return p("div", { class: [dt("title"), "van-ellipsis"] }, [e.title]);
      },
      l = () => t("cancel"),
      s = () => t("confirm"),
      r = () => {
        var a;
        const c = (a = e.cancelButtonText) != null ? a : Js("cancel");
        if (!(!n.cancel && !c))
          return p(
            "button",
            { type: "button", class: [dt("cancel"), po], onClick: l },
            [n.cancel ? n.cancel() : c],
          );
      },
      i = () => {
        var a;
        const c = (a = e.confirmButtonText) != null ? a : Js("confirm");
        if (!(!n.confirm && !c))
          return p(
            "button",
            { type: "button", class: [dt("confirm"), po], onClick: s },
            [n.confirm ? n.confirm() : c],
          );
      };
    return () =>
      p("div", { class: dt("toolbar") }, [
        n.toolbar ? n.toolbar() : [r(), o(), i()],
      ]);
  },
});
let Qf = 0;
function ed() {
  const e = Wt(),
    { name: t = "unknown" } = (e == null ? void 0 : e.type) || {};
  return `${t}-${++Qf}`;
}
const td = Symbol(),
  nd = () => gt(td, null),
  [od, Pg] = he("picker-group"),
  ld = Symbol(od);
Se({ tabs: mo(), activeTab: Ue(0), nextStepText: String }, Lo);
const sd = Se(
    {
      loading: Boolean,
      readonly: Boolean,
      allowHtml: Boolean,
      optionHeight: Ue(44),
      showToolbar: Te,
      swipeDuration: Ue(1e3),
      visibleOptionNum: Ue(6),
    },
    Lo,
  ),
  rd = Se({}, sd, {
    columns: mo(),
    modelValue: mo(),
    toolbarPosition: de("top"),
    columnsFieldNames: Object,
  });
var id = ge({
  name: zf,
  props: rd,
  emits: [
    "confirm",
    "cancel",
    "change",
    "scrollInto",
    "clickOption",
    "update:modelValue",
  ],
  setup(e, { emit: t, slots: n }) {
    const o = L(),
      l = L(e.modelValue.slice(0)),
      { parent: s } = Dn(ld),
      { children: r, linkChildren: i } = Fl(Bi);
    i();
    const a = se(() => Wf(e.columnsFieldNames)),
      c = se(() => ku(e.optionHeight)),
      f = se(() => jf(e.columns, a.value)),
      d = se(() => {
        const { columns: m } = e;
        switch (f.value) {
          case "multiple":
            return m;
          case "cascade":
            return Uf(m, a.value, l);
          default:
            return [m];
        }
      }),
      g = se(() => d.value.some((m) => m.length)),
      _ = se(() => d.value.map((m, b) => yl(m, l.value[b], a.value))),
      E = se(() =>
        d.value.map((m, b) =>
          m.findIndex((I) => I[a.value.value] === l.value[b]),
        ),
      ),
      T = (m, b) => {
        if (l.value[m] !== b) {
          const I = l.value.slice(0);
          (I[m] = b), (l.value = I);
        }
      },
      $ = () => ({
        selectedValues: l.value.slice(0),
        selectedOptions: _.value,
        selectedIndexes: E.value,
      }),
      A = (m, b) => {
        T(b, m),
          f.value === "cascade" &&
            l.value.forEach((I, G) => {
              const te = d.value[G];
              Ys(te, I, a.value) ||
                T(G, te.length ? te[0][a.value.value] : void 0);
            }),
          Ge(() => {
            t("change", Se({ columnIndex: b }, $()));
          });
      },
      V = (m, b) => {
        const I = { columnIndex: b, currentOption: m };
        t("clickOption", Se($(), I)), t("scrollInto", I);
      },
      D = () => {
        r.forEach((b) => b.stopMomentum());
        const m = $();
        return (
          Ge(() => {
            t("confirm", m);
          }),
          m
        );
      },
      F = () => t("cancel", $()),
      U = () =>
        d.value.map((m, b) =>
          p(
            Yf,
            {
              value: l.value[b],
              fields: a.value,
              options: m,
              readonly: e.readonly,
              allowHtml: e.allowHtml,
              optionHeight: c.value,
              swipeDuration: e.swipeDuration,
              visibleOptionNum: e.visibleOptionNum,
              onChange: (I) => A(I, b),
              onClickOption: (I) => V(I, b),
              onScrollInto: (I) => {
                t("scrollInto", { currentOption: I, columnIndex: b });
              },
            },
            { option: n.option },
          ),
        ),
      P = (m) => {
        if (g.value) {
          const b = { height: `${c.value}px` },
            I = { backgroundSize: `100% ${(m - c.value) / 2}px` };
          return [
            p("div", { class: dt("mask"), style: I }, null),
            p("div", { class: [Gu, dt("frame")], style: b }, null),
          ];
        }
      },
      K = () => {
        const m = c.value * +e.visibleOptionNum,
          b = { height: `${m}px` };
        return p("div", { ref: o, class: dt("columns"), style: b }, [
          U(),
          P(m),
        ]);
      },
      N = () => {
        if (e.showToolbar && !s)
          return p(Zf, ot(go(e, Xf), { onConfirm: D, onCancel: F }), go(n, qf));
      };
    we(
      d,
      (m) => {
        m.forEach((b, I) => {
          b.length && !Ys(b, l.value[I], a.value) && T(I, Pi(b)[a.value.value]);
        });
      },
      { immediate: !0 },
    );
    let W;
    return (
      we(
        () => e.modelValue,
        (m) => {
          !Cn(m, l.value) &&
            !Cn(m, W) &&
            ((l.value = m.slice(0)), (W = m.slice(0)));
        },
        { deep: !0 },
      ),
      we(
        l,
        (m) => {
          Cn(m, e.modelValue) || ((W = m.slice(0)), t("update:modelValue", W));
        },
        { immediate: !0 },
      ),
      Jt("touchmove", mt, { target: o }),
      Yt({ confirm: D, getSelectedOptions: () => _.value }),
      () => {
        var m, b;
        return p("div", { class: dt() }, [
          e.toolbarPosition === "top" ? N() : null,
          e.loading ? p(Mo, { class: dt("loading") }, null) : null,
          (m = n["columns-top"]) == null ? void 0 : m.call(n),
          K(),
          (b = n["columns-bottom"]) == null ? void 0 : b.call(n),
          e.toolbarPosition === "bottom" ? N() : null,
        ]);
      }
    );
  },
});
const ad = be(id),
  [cd, Xt] = he("cell"),
  $i = {
    tag: de("div"),
    icon: String,
    size: String,
    title: fe,
    value: fe,
    label: fe,
    center: Boolean,
    isLink: Boolean,
    border: Te,
    iconPrefix: String,
    valueClass: nt,
    labelClass: nt,
    titleClass: nt,
    titleStyle: null,
    arrowDirection: String,
    required: { type: [Boolean, String], default: null },
    clickable: { type: Boolean, default: null },
  },
  ud = Se({}, $i, No);
var fd = ge({
  name: cd,
  props: ud,
  setup(e, { slots: t }) {
    const n = Ro(),
      o = () => {
        if (t.label || Oe(e.label))
          return p("div", { class: [Xt("label"), e.labelClass] }, [
            t.label ? t.label() : e.label,
          ]);
      },
      l = () => {
        var a;
        if (t.title || Oe(e.title)) {
          const c = (a = t.title) == null ? void 0 : a.call(t);
          return Array.isArray(c) && c.length === 0
            ? void 0
            : p(
                "div",
                { class: [Xt("title"), e.titleClass], style: e.titleStyle },
                [c || p("span", null, [e.title]), o()],
              );
        }
      },
      s = () => {
        const a = t.value || t.default;
        if (a || Oe(e.value))
          return p("div", { class: [Xt("value"), e.valueClass] }, [
            a ? a() : p("span", null, [e.value]),
          ]);
      },
      r = () => {
        if (t.icon) return t.icon();
        if (e.icon)
          return p(
            vt,
            { name: e.icon, class: Xt("left-icon"), classPrefix: e.iconPrefix },
            null,
          );
      },
      i = () => {
        if (t["right-icon"]) return t["right-icon"]();
        if (e.isLink) {
          const a =
            e.arrowDirection && e.arrowDirection !== "right"
              ? `arrow-${e.arrowDirection}`
              : "arrow";
          return p(vt, { name: a, class: Xt("right-icon") }, null);
        }
      };
    return () => {
      var a;
      const {
          tag: c,
          size: f,
          center: d,
          border: g,
          isLink: _,
          required: E,
        } = e,
        T = (a = e.clickable) != null ? a : _,
        $ = { center: d, required: !!E, clickable: T, borderless: !g };
      return (
        f && ($[f] = !!f),
        p(
          c,
          {
            class: Xt($),
            role: T ? "button" : void 0,
            tabindex: T ? 0 : void 0,
            onClick: n,
          },
          {
            default: () => {
              var A;
              return [
                r(),
                l(),
                s(),
                i(),
                (A = t.extra) == null ? void 0 : A.call(t),
              ];
            },
          },
        )
      );
    };
  },
});
const ki = be(fd);
function Ni(e) {
  return Array.isArray(e) ? !e.length : e === 0 ? !1 : !e;
}
function dd(e, t) {
  if (Ni(e)) {
    if (t.required) return !1;
    if (t.validateEmpty === !1) return !0;
  }
  return !(t.pattern && !t.pattern.test(String(e)));
}
function hd(e, t) {
  return new Promise((n) => {
    const o = t.validator(e, t);
    if (ri(o)) {
      o.then(n);
      return;
    }
    n(o);
  });
}
function Xs(e, t) {
  const { message: n } = t;
  return Pn(n) ? n(e, t) : n || "";
}
function gd({ target: e }) {
  e.composing = !0;
}
function Zs({ target: e }) {
  e.composing && ((e.composing = !1), e.dispatchEvent(new Event("input")));
}
function md(e, t) {
  const n = hi();
  e.style.height = "auto";
  let o = e.scrollHeight;
  if (zt(t)) {
    const { maxHeight: l, minHeight: s } = t;
    l !== void 0 && (o = Math.min(o, l)), s !== void 0 && (o = Math.max(o, s));
  }
  o && ((e.style.height = `${o}px`), gi(n));
}
function vd(e) {
  return e === "number"
    ? { type: "text", inputmode: "decimal" }
    : e === "digit"
      ? { type: "tel", inputmode: "numeric" }
      : { type: e };
}
function ut(e) {
  return [...e].length;
}
function Zo(e, t) {
  return [...e].slice(0, t).join("");
}
const [pd, Je] = he("field"),
  bd = {
    id: String,
    name: String,
    leftIcon: String,
    rightIcon: String,
    autofocus: Boolean,
    clearable: Boolean,
    maxlength: fe,
    formatter: Function,
    clearIcon: de("clear"),
    modelValue: Ue(""),
    inputAlign: String,
    placeholder: String,
    autocomplete: String,
    autocapitalize: String,
    autocorrect: String,
    errorMessage: String,
    enterkeyhint: String,
    clearTrigger: de("focus"),
    formatTrigger: de("onChange"),
    spellcheck: { type: Boolean, default: null },
    error: { type: Boolean, default: null },
    disabled: { type: Boolean, default: null },
    readonly: { type: Boolean, default: null },
  },
  yd = Se({}, $i, bd, {
    rows: fe,
    type: de("text"),
    rules: Array,
    autosize: [Boolean, Object],
    labelWidth: fe,
    labelClass: nt,
    labelAlign: String,
    showWordLimit: Boolean,
    errorMessageAlign: String,
    colon: { type: Boolean, default: null },
  });
var _d = ge({
  name: pd,
  props: yd,
  emits: [
    "blur",
    "focus",
    "clear",
    "keypress",
    "clickInput",
    "endValidate",
    "startValidate",
    "clickLeftIcon",
    "clickRightIcon",
    "update:modelValue",
  ],
  setup(e, { emit: t, slots: n }) {
    const o = ed(),
      l = pt({ status: "unvalidated", focused: !1, validateMessage: "" }),
      s = L(),
      r = L(),
      i = L(),
      { parent: a } = Dn(qu),
      c = () => {
        var x;
        return String((x = e.modelValue) != null ? x : "");
      },
      f = (x) => {
        if (Oe(e[x])) return e[x];
        if (a && Oe(a.props[x])) return a.props[x];
      },
      d = se(() => {
        const x = f("readonly");
        if (e.clearable && !x) {
          const Z = c() !== "",
            Q =
              e.clearTrigger === "always" ||
              (e.clearTrigger === "focus" && l.focused);
          return Z && Q;
        }
        return !1;
      }),
      g = se(() => (i.value && n.input ? i.value() : e.modelValue)),
      _ = se(() => {
        var x;
        const Z = f("required");
        return Z === "auto"
          ? (x = e.rules) == null
            ? void 0
            : x.some((Q) => Q.required)
          : Z;
      }),
      E = (x) =>
        x.reduce(
          (Z, Q) =>
            Z.then(() => {
              if (l.status === "failed") return;
              let { value: ae } = g;
              if ((Q.formatter && (ae = Q.formatter(ae, Q)), !dd(ae, Q))) {
                (l.status = "failed"), (l.validateMessage = Xs(ae, Q));
                return;
              }
              if (Q.validator)
                return Ni(ae) && Q.validateEmpty === !1
                  ? void 0
                  : hd(ae, Q).then((pe) => {
                      pe && typeof pe == "string"
                        ? ((l.status = "failed"), (l.validateMessage = pe))
                        : pe === !1 &&
                          ((l.status = "failed"),
                          (l.validateMessage = Xs(ae, Q)));
                    });
            }),
          Promise.resolve(),
        ),
      T = () => {
        (l.status = "unvalidated"), (l.validateMessage = "");
      },
      $ = () =>
        t("endValidate", { status: l.status, message: l.validateMessage }),
      A = (x = e.rules) =>
        new Promise((Z) => {
          T(),
            x
              ? (t("startValidate"),
                E(x).then(() => {
                  l.status === "failed"
                    ? (Z({ name: e.name, message: l.validateMessage }), $())
                    : ((l.status = "passed"), Z(), $());
                }))
              : Z();
        }),
      V = (x) => {
        if (a && e.rules) {
          const { validateTrigger: Z } = a.props,
            Q = $s(Z).includes(x),
            ae = e.rules.filter((pe) =>
              pe.trigger ? $s(pe.trigger).includes(x) : Q,
            );
          ae.length && A(ae);
        }
      },
      D = (x) => {
        var Z;
        const { maxlength: Q } = e;
        if (Oe(Q) && ut(x) > +Q) {
          const ae = c();
          if (ae && ut(ae) === +Q) return ae;
          const pe = (Z = s.value) == null ? void 0 : Z.selectionEnd;
          if (l.focused && pe) {
            const _e = [...x],
              u = _e.length - +Q;
            return _e.splice(pe - u, u), _e.join("");
          }
          return Zo(x, +Q);
        }
        return x;
      },
      F = (x, Z = "onChange") => {
        const Q = x;
        x = D(x);
        const ae = ut(Q) - ut(x);
        if (e.type === "number" || e.type === "digit") {
          const _e = e.type === "number";
          x = Mu(x, _e, _e);
        }
        let pe = 0;
        if (e.formatter && Z === e.formatTrigger) {
          const { formatter: _e, maxlength: u } = e;
          if (
            ((x = _e(x)),
            Oe(u) && ut(x) > +u && (x = Zo(x, +u)),
            s.value && l.focused)
          ) {
            const { selectionEnd: h } = s.value,
              v = Zo(Q, h);
            pe = ut(_e(v)) - ut(v);
          }
        }
        if (s.value && s.value.value !== x)
          if (l.focused) {
            let { selectionStart: _e, selectionEnd: u } = s.value;
            if (((s.value.value = x), Oe(_e) && Oe(u))) {
              const h = ut(x);
              ae ? ((_e -= ae), (u -= ae)) : pe && ((_e += pe), (u += pe)),
                s.value.setSelectionRange(Math.min(_e, h), Math.min(u, h));
            }
          } else s.value.value = x;
        x !== e.modelValue && t("update:modelValue", x);
      },
      U = (x) => {
        x.target.composing || F(x.target.value);
      },
      P = () => {
        var x;
        return (x = s.value) == null ? void 0 : x.blur();
      },
      K = () => {
        var x;
        return (x = s.value) == null ? void 0 : x.focus();
      },
      N = () => {
        const x = s.value;
        e.type === "textarea" && e.autosize && x && md(x, e.autosize);
      },
      W = (x) => {
        (l.focused = !0), t("focus", x), Ge(N), f("readonly") && P();
      },
      R = (x) => {
        (l.focused = !1),
          F(c(), "onBlur"),
          t("blur", x),
          !f("readonly") && (V("onBlur"), Ge(N), Tu());
      },
      m = (x) => t("clickInput", x),
      b = (x) => t("clickLeftIcon", x),
      I = (x) => t("clickRightIcon", x),
      G = (x) => {
        mt(x), t("update:modelValue", ""), t("clear", x);
      },
      te = se(() => {
        if (typeof e.error == "boolean") return e.error;
        if (a && a.props.showError && l.status === "failed") return !0;
      }),
      ne = se(() => {
        const x = f("labelWidth"),
          Z = f("labelAlign");
        if (x && Z !== "top") return { width: Ae(x) };
      }),
      ie = (x) => {
        x.keyCode === 13 &&
          (!(a && a.props.submitOnEnter) && e.type !== "textarea" && mt(x),
          e.type === "search" && P()),
          t("keypress", x);
      },
      oe = () => e.id || `${o}-input`,
      Ie = () => l.status,
      Xe = () => {
        const x = Je("control", [
          f("inputAlign"),
          {
            error: te.value,
            custom: !!n.input,
            "min-height": e.type === "textarea" && !e.autosize,
          },
        ]);
        if (n.input) return p("div", { class: x, onClick: m }, [n.input()]);
        const Z = {
          id: oe(),
          ref: s,
          name: e.name,
          rows: e.rows !== void 0 ? +e.rows : void 0,
          class: x,
          disabled: f("disabled"),
          readonly: f("readonly"),
          autofocus: e.autofocus,
          placeholder: e.placeholder,
          autocomplete: e.autocomplete,
          autocapitalize: e.autocapitalize,
          autocorrect: e.autocorrect,
          enterkeyhint: e.enterkeyhint,
          spellcheck: e.spellcheck,
          "aria-labelledby": e.label ? `${o}-label` : void 0,
          onBlur: R,
          onFocus: W,
          onInput: U,
          onClick: m,
          onChange: Zs,
          onKeypress: ie,
          onCompositionend: Zs,
          onCompositionstart: gd,
        };
        return e.type === "textarea"
          ? p("textarea", Z, null)
          : p("input", ot(vd(e.type), Z), null);
      },
      De = () => {
        const x = n["left-icon"];
        if (e.leftIcon || x)
          return p("div", { class: Je("left-icon"), onClick: b }, [
            x
              ? x()
              : p(vt, { name: e.leftIcon, classPrefix: e.iconPrefix }, null),
          ]);
      },
      Be = () => {
        const x = n["right-icon"];
        if (e.rightIcon || x)
          return p("div", { class: Je("right-icon"), onClick: I }, [
            x
              ? x()
              : p(vt, { name: e.rightIcon, classPrefix: e.iconPrefix }, null),
          ]);
      },
      $t = () => {
        if (e.showWordLimit && e.maxlength) {
          const x = ut(c());
          return p("div", { class: Je("word-limit") }, [
            p("span", { class: Je("word-num") }, [x]),
            uo("/"),
            e.maxlength,
          ]);
        }
      },
      cn = () => {
        if (a && a.props.showErrorMessage === !1) return;
        const x = e.errorMessage || l.validateMessage;
        if (x) {
          const Z = n["error-message"],
            Q = f("errorMessageAlign");
          return p("div", { class: Je("error-message", Q) }, [
            Z ? Z({ message: x }) : x,
          ]);
        }
      },
      Gt = () => {
        const x = f("labelWidth"),
          Z = f("labelAlign"),
          Q = f("colon") ? ":" : "";
        if (n.label) return [n.label(), Q];
        if (e.label)
          return p(
            "label",
            {
              id: `${o}-label`,
              for: n.input ? void 0 : oe(),
              onClick: (ae) => {
                mt(ae), K();
              },
              style: Z === "top" && x ? { width: Ae(x) } : void 0,
            },
            [e.label + Q],
          );
      },
      ze = () => [
        p("div", { class: Je("body") }, [
          Xe(),
          d.value &&
            p(vt, { ref: r, name: e.clearIcon, class: Je("clear") }, null),
          Be(),
          n.button && p("div", { class: Je("button") }, [n.button()]),
        ]),
        $t(),
        cn(),
      ];
    return (
      Yt({
        blur: P,
        focus: K,
        validate: A,
        formValue: g,
        resetValidation: T,
        getValidationStatus: Ie,
      }),
      kn(fi, { customValue: i, resetValidation: T, validateWithTrigger: V }),
      we(
        () => e.modelValue,
        () => {
          F(c()), T(), V("onChange"), Ge(N);
        },
      ),
      yt(() => {
        F(c(), e.formatTrigger), Ge(N);
      }),
      Jt("touchstart", G, {
        target: se(() => {
          var x;
          return (x = r.value) == null ? void 0 : x.$el;
        }),
      }),
      () => {
        const x = f("disabled"),
          Z = f("labelAlign"),
          Q = De(),
          ae = () => {
            const pe = Gt();
            return Z === "top" ? [Q, pe].filter(Boolean) : pe || [];
          };
        return p(
          ki,
          {
            size: e.size,
            class: Je({ error: te.value, disabled: x, [`label-${Z}`]: Z }),
            center: e.center,
            border: e.border,
            isLink: e.isLink,
            clickable: e.clickable,
            titleStyle: ne.value,
            valueClass: Je("value"),
            titleClass: [Je("label", [Z, { required: _.value }]), e.labelClass],
            arrowDirection: e.arrowDirection,
          },
          {
            icon: Q && Z !== "top" ? () => Q : null,
            title: ae,
            value: ze,
            extra: n.extra,
          },
        );
      }
    );
  },
});
const xd = be(_d);
function Cd() {
  const e = pt({ show: !1 }),
    t = (l) => {
      e.show = l;
    },
    n = (l) => {
      Se(e, l, { transitionAppear: !0 }), t(!0);
    },
    o = () => t(!1);
  return (
    Yt({ open: n, close: o, toggle: t }),
    { open: n, close: o, state: e, toggle: t }
  );
}
function wd(e) {
  const t = si(e),
    n = document.createElement("div");
  return (
    document.body.appendChild(n),
    {
      instance: t.mount(n),
      unmount() {
        t.unmount(), document.body.removeChild(n);
      },
    }
  );
}
const [Sd, Qo] = he("switch"),
  Ed = {
    size: fe,
    loading: Boolean,
    disabled: Boolean,
    modelValue: nt,
    activeColor: String,
    inactiveColor: String,
    activeValue: { type: nt, default: !0 },
    inactiveValue: { type: nt, default: !1 },
  };
var Td = ge({
  name: Sd,
  props: Ed,
  emits: ["change", "update:modelValue"],
  setup(e, { emit: t, slots: n }) {
    const o = () => e.modelValue === e.activeValue,
      l = () => {
        if (!e.disabled && !e.loading) {
          const r = o() ? e.inactiveValue : e.activeValue;
          t("update:modelValue", r), t("change", r);
        }
      },
      s = () => {
        if (e.loading) {
          const r = o() ? e.activeColor : e.inactiveColor;
          return p(Mo, { class: Qo("loading"), color: r }, null);
        }
        if (n.node) return n.node();
      };
    return (
      di(() => e.modelValue),
      () => {
        var r;
        const {
            size: i,
            loading: a,
            disabled: c,
            activeColor: f,
            inactiveColor: d,
          } = e,
          g = o(),
          _ = { fontSize: Ae(i), backgroundColor: g ? f : d };
        return p(
          "div",
          {
            role: "switch",
            class: Qo({ on: g, loading: a, disabled: c }),
            style: _,
            tabindex: c ? void 0 : 0,
            "aria-checked": g,
            onClick: l,
          },
          [
            p("div", { class: Qo("node") }, [s()]),
            (r = n.background) == null ? void 0 : r.call(n),
          ],
        );
      }
    );
  },
});
const Od = be(Td),
  [Ad, Qs] = he("tag"),
  Pd = {
    size: String,
    mark: Boolean,
    show: Te,
    type: de("default"),
    color: String,
    plain: Boolean,
    round: Boolean,
    textColor: String,
    closeable: Boolean,
  };
var Id = ge({
  name: Ad,
  props: Pd,
  emits: ["close"],
  setup(e, { slots: t, emit: n }) {
    const o = (r) => {
        r.stopPropagation(), n("close", r);
      },
      l = () =>
        e.plain
          ? { color: e.textColor || e.color, borderColor: e.color }
          : { color: e.textColor, background: e.color },
      s = () => {
        var r;
        const {
            type: i,
            mark: a,
            plain: c,
            round: f,
            size: d,
            closeable: g,
          } = e,
          _ = { mark: a, plain: c, round: f };
        d && (_[d] = d);
        const E =
          g &&
          p(vt, { name: "cross", class: [Qs("close"), po], onClick: o }, null);
        return p("span", { style: l(), class: Qs([_, i]) }, [
          (r = t.default) == null ? void 0 : r.call(t),
          E,
        ]);
      };
    return () =>
      p(
        Rn,
        { name: e.closeable ? "van-fade" : void 0 },
        { default: () => [e.show ? s() : null] },
      );
  },
});
const Bd = be(Id),
  [$d, er] = he("cell-group"),
  kd = { title: String, inset: Boolean, border: Te };
var Nd = ge({
  name: $d,
  inheritAttrs: !1,
  props: kd,
  setup(e, { slots: t, attrs: n }) {
    const o = () => {
        var s;
        return p(
          "div",
          ot(
            { class: [er({ inset: e.inset }), { [Yu]: e.border && !e.inset }] },
            n,
            bl(),
          ),
          [(s = t.default) == null ? void 0 : s.call(t)],
        );
      },
      l = () =>
        p("div", { class: er("title", { inset: e.inset }) }, [
          t.title ? t.title() : e.title,
        ]);
    return () => (e.title || t.title ? p(Ve, null, [l(), o()]) : o());
  },
});
const Rd = be(Nd),
  [Md, qn] = he("circle");
let Dd = 0;
const tr = (e) => Math.min(Math.max(+e, 0), 100);
function Ld(e, t) {
  const n = e ? 1 : 0;
  return `M ${t / 2} ${t / 2} m 0, -500 a 500, 500 0 1, ${n} 0, 1000 a 500, 500 0 1, ${n} 0, -1000`;
}
const Fd = {
  text: String,
  size: fe,
  fill: de("none"),
  rate: Ue(100),
  speed: Ue(0),
  color: [String, Object],
  clockwise: Te,
  layerColor: String,
  currentRate: vu(0),
  strokeWidth: Ue(40),
  strokeLinecap: String,
  startPosition: de("top"),
};
var Vd = ge({
  name: Md,
  props: Fd,
  emits: ["update:currentRate"],
  setup(e, { emit: t, slots: n }) {
    const o = `van-circle-${Dd++}`,
      l = se(() => +e.strokeWidth + 1e3),
      s = se(() => Ld(e.clockwise, l.value)),
      r = se(() => {
        const g = { top: 0, right: 90, bottom: 180, left: 270 }[
          e.startPosition
        ];
        if (g) return { transform: `rotate(${g}deg)` };
      });
    we(
      () => e.rate,
      (d) => {
        let g;
        const _ = Date.now(),
          E = e.currentRate,
          T = tr(d),
          $ = Math.abs(((E - T) * 1e3) / +e.speed),
          A = () => {
            const V = Date.now(),
              F = Math.min((V - _) / $, 1) * (T - E) + E;
            t("update:currentRate", tr(parseFloat(F.toFixed(1)))),
              (T > E ? F < T : F > T) && (g = ks(A));
          };
        e.speed ? (g && pu(g), (g = ks(A))) : t("update:currentRate", T);
      },
      { immediate: !0 },
    );
    const i = () => {
        const { strokeWidth: g, currentRate: _, strokeLinecap: E } = e,
          T = (3140 * _) / 100,
          $ = zt(e.color) ? `url(#${o})` : e.color,
          A = {
            stroke: $,
            strokeWidth: `${+g + 1}px`,
            strokeLinecap: E,
            strokeDasharray: `${T}px 3140px`,
          };
        return p(
          "path",
          { d: s.value, style: A, class: qn("hover"), stroke: $ },
          null,
        );
      },
      a = () => {
        const d = {
          fill: e.fill,
          stroke: e.layerColor,
          strokeWidth: `${e.strokeWidth}px`,
        };
        return p("path", { class: qn("layer"), style: d, d: s.value }, null);
      },
      c = () => {
        const { color: d } = e;
        if (!zt(d)) return;
        const g = Object.keys(d)
          .sort((_, E) => parseFloat(_) - parseFloat(E))
          .map((_, E) =>
            p("stop", { key: E, offset: _, "stop-color": d[_] }, null),
          );
        return p("defs", null, [
          p(
            "linearGradient",
            { id: o, x1: "100%", y1: "0%", x2: "0%", y2: "0%" },
            [g],
          ),
        ]);
      },
      f = () => {
        if (n.default) return n.default();
        if (e.text) return p("div", { class: qn("text") }, [e.text]);
      };
    return () =>
      p("div", { class: qn(), style: Vl(e.size) }, [
        p("svg", { viewBox: `0 0 ${l.value} ${l.value}`, style: r.value }, [
          c(),
          a(),
          i(),
        ]),
        f(),
      ]);
  },
});
const Hd = be(Vd),
  zd = be(gf),
  [jd, Ze, Xn] = he("dialog"),
  Ud = Se({}, Do, {
    title: String,
    theme: String,
    width: fe,
    message: [String, Function],
    callback: Function,
    allowHtml: Boolean,
    className: nt,
    transition: de("van-dialog-bounce"),
    messageAlign: String,
    closeOnPopstate: Te,
    showCancelButton: Boolean,
    cancelButtonText: String,
    cancelButtonColor: String,
    cancelButtonDisabled: Boolean,
    confirmButtonText: String,
    confirmButtonColor: String,
    confirmButtonDisabled: Boolean,
    showConfirmButton: Te,
    closeOnClickOverlay: Boolean,
  }),
  Kd = [...Bf, "transition", "closeOnPopstate"];
var Wd = ge({
  name: jd,
  props: Ud,
  emits: ["confirm", "cancel", "keydown", "update:show"],
  setup(e, { emit: t, slots: n }) {
    const o = L(),
      l = pt({ confirm: !1, cancel: !1 }),
      s = (A) => t("update:show", A),
      r = (A) => {
        var V;
        s(!1), (V = e.callback) == null || V.call(e, A);
      },
      i = (A) => () => {
        e.show &&
          (t(A),
          e.beforeClose
            ? ((l[A] = !0),
              _i(e.beforeClose, {
                args: [A],
                done() {
                  r(A), (l[A] = !1);
                },
                canceled() {
                  l[A] = !1;
                },
              }))
            : r(A));
      },
      a = i("cancel"),
      c = i("confirm"),
      f = ru(
        (A) => {
          var V, D;
          if (
            A.target !==
            ((D = (V = o.value) == null ? void 0 : V.popupRef) == null
              ? void 0
              : D.value)
          )
            return;
          ({
            Enter: e.showConfirmButton ? c : ml,
            Escape: e.showCancelButton ? a : ml,
          })[A.key](),
            t("keydown", A);
        },
        ["enter", "esc"],
      ),
      d = () => {
        const A = n.title ? n.title() : e.title;
        if (A)
          return p(
            "div",
            { class: Ze("header", { isolated: !e.message && !n.default }) },
            [A],
          );
      },
      g = (A) => {
        const { message: V, allowHtml: D, messageAlign: F } = e,
          U = Ze("message", { "has-title": A, [F]: F }),
          P = Pn(V) ? V() : V;
        return D && typeof P == "string"
          ? p("div", { class: U, innerHTML: P }, null)
          : p("div", { class: U }, [P]);
      },
      _ = () => {
        if (n.default) return p("div", { class: Ze("content") }, [n.default()]);
        const { title: A, message: V, allowHtml: D } = e;
        if (V) {
          const F = !!(A || n.title);
          return p(
            "div",
            { key: D ? 1 : 0, class: Ze("content", { isolated: !F }) },
            [g(F)],
          );
        }
      },
      E = () =>
        p("div", { class: [Ku, Ze("footer")] }, [
          e.showCancelButton &&
            p(
              pl,
              {
                size: "large",
                text: e.cancelButtonText || Xn("cancel"),
                class: Ze("cancel"),
                style: { color: e.cancelButtonColor },
                loading: l.cancel,
                disabled: e.cancelButtonDisabled,
                onClick: a,
              },
              null,
            ),
          e.showConfirmButton &&
            p(
              pl,
              {
                size: "large",
                text: e.confirmButtonText || Xn("confirm"),
                class: [Ze("confirm"), { [Wu]: e.showCancelButton }],
                style: { color: e.confirmButtonColor },
                loading: l.confirm,
                disabled: e.confirmButtonDisabled,
                onClick: c,
              },
              null,
            ),
        ]),
      T = () =>
        p(
          nf,
          { class: Ze("footer") },
          {
            default: () => [
              e.showCancelButton &&
                p(
                  Us,
                  {
                    type: "warning",
                    text: e.cancelButtonText || Xn("cancel"),
                    class: Ze("cancel"),
                    color: e.cancelButtonColor,
                    loading: l.cancel,
                    disabled: e.cancelButtonDisabled,
                    onClick: a,
                  },
                  null,
                ),
              e.showConfirmButton &&
                p(
                  Us,
                  {
                    type: "danger",
                    text: e.confirmButtonText || Xn("confirm"),
                    class: Ze("confirm"),
                    color: e.confirmButtonColor,
                    loading: l.confirm,
                    disabled: e.confirmButtonDisabled,
                    onClick: c,
                  },
                  null,
                ),
            ],
          },
        ),
      $ = () =>
        n.footer ? n.footer() : e.theme === "round-button" ? T() : E();
    return () => {
      const { width: A, title: V, theme: D, message: F, className: U } = e;
      return p(
        zl,
        ot(
          {
            ref: o,
            role: "dialog",
            class: [Ze([D]), U],
            style: { width: Ae(A) },
            tabindex: 0,
            "aria-labelledby": V || F,
            onKeydown: f,
            "onUpdate:show": s,
          },
          go(e, Kd),
        ),
        { default: () => [d(), _(), $()] },
      );
    };
  },
});
const Jd = be(Wd),
  [Yd, Gd] = he("divider"),
  qd = {
    dashed: Boolean,
    hairline: Te,
    vertical: Boolean,
    contentPosition: de("center"),
  };
var Xd = ge({
  name: Yd,
  props: qd,
  setup(e, { slots: t }) {
    return () => {
      var n;
      return p(
        "div",
        {
          role: "separator",
          class: Gd({
            dashed: e.dashed,
            hairline: e.hairline,
            vertical: e.vertical,
            [`content-${e.contentPosition}`]: !!t.default && !e.vertical,
          }),
        },
        [!e.vertical && ((n = t.default) == null ? void 0 : n.call(t))],
      );
    };
  },
});
const Zd = be(Xd),
  [Qd, Zt, eh] = he("list"),
  th = {
    error: Boolean,
    offset: Ue(300),
    loading: Boolean,
    disabled: Boolean,
    finished: Boolean,
    scroller: Object,
    errorText: String,
    direction: de("down"),
    loadingText: String,
    finishedText: String,
    immediateCheck: Te,
  };
var nh = ge({
  name: Qd,
  props: th,
  emits: ["load", "update:error", "update:loading"],
  setup(e, { emit: t, slots: n }) {
    const o = L(e.loading),
      l = L(),
      s = L(),
      r = nd(),
      i = Su(l),
      a = se(() => e.scroller || i.value),
      c = () => {
        Ge(() => {
          if (
            o.value ||
            e.finished ||
            e.disabled ||
            e.error ||
            (r == null ? void 0 : r.value) === !1
          )
            return;
          const { direction: E } = e,
            T = +e.offset,
            $ = In(a);
          if (!$.height || Ou(l)) return;
          let A = !1;
          const V = In(s);
          E === "up"
            ? (A = $.top - V.top <= T)
            : (A = V.bottom - $.bottom <= T),
            A && ((o.value = !0), t("update:loading", !0), t("load"));
        });
      },
      f = () => {
        if (e.finished) {
          const E = n.finished ? n.finished() : e.finishedText;
          if (E) return p("div", { class: Zt("finished-text") }, [E]);
        }
      },
      d = () => {
        t("update:error", !1), c();
      },
      g = () => {
        if (e.error) {
          const E = n.error ? n.error() : e.errorText;
          if (E)
            return p(
              "div",
              {
                role: "button",
                class: Zt("error-text"),
                tabindex: 0,
                onClick: d,
              },
              [E],
            );
        }
      },
      _ = () => {
        if (o.value && !e.finished && !e.disabled)
          return p("div", { class: Zt("loading") }, [
            n.loading
              ? n.loading()
              : p(
                  Mo,
                  { class: Zt("loading-icon") },
                  { default: () => [e.loadingText || eh("loading")] },
                ),
          ]);
      };
    return (
      we(() => [e.loading, e.finished, e.error], c),
      r &&
        we(r, (E) => {
          E && c();
        }),
      zr(() => {
        o.value = e.loading;
      }),
      yt(() => {
        e.immediateCheck && c();
      }),
      Yt({ check: c }),
      Jt("scroll", c, { target: a, passive: !0 }),
      () => {
        var E;
        const T = (E = n.default) == null ? void 0 : E.call(n),
          $ = p("div", { ref: s, class: Zt("placeholder") }, null);
        return p(
          "div",
          { ref: l, role: "feed", class: Zt(), "aria-busy": o.value },
          [
            e.direction === "down" ? T : $,
            _(),
            f(),
            g(),
            e.direction === "up" ? T : $,
          ],
        );
      }
    );
  },
});
const oh = be(nh),
  [lh, sh] = he("notify"),
  rh = ["lockScroll", "position", "show", "teleport", "zIndex"],
  ih = Se({}, Do, {
    type: de("danger"),
    color: String,
    message: fe,
    position: de("top"),
    className: nt,
    background: String,
    lockScroll: Boolean,
  });
var Ri = ge({
  name: lh,
  props: ih,
  emits: ["update:show"],
  setup(e, { emit: t, slots: n }) {
    const o = (l) => t("update:show", l);
    return () =>
      p(
        zl,
        ot(
          {
            class: [sh([e.type]), e.className],
            style: { color: e.color, background: e.background },
            overlay: !1,
            duration: 0.2,
            "onUpdate:show": o,
          },
          go(e, rh),
        ),
        { default: () => [n.default ? n.default() : e.message] },
      );
  },
});
let nr, ln;
const ah = (e) => (zt(e) ? e : { message: e });
function ch() {
  ({ instance: ln } = wd({
    setup() {
      const { state: e, toggle: t } = Cd();
      return () => p(Ri, ot(e, { "onUpdate:show": t }), null);
    },
  }));
}
const uh = () => ({
  type: "danger",
  color: void 0,
  message: "",
  onClose: void 0,
  onClick: void 0,
  onOpened: void 0,
  duration: 3e3,
  position: void 0,
  className: "",
  lockScroll: !1,
  background: void 0,
});
let fh = uh();
const dh = () => {
  ln && ln.toggle(!1);
};
function Zn(e) {
  if (ko)
    return (
      ln || ch(),
      (e = Se({}, fh, ah(e))),
      ln.open(e),
      clearTimeout(nr),
      e.duration > 0 && (nr = setTimeout(dh, e.duration)),
      ln
    );
}
const hh = be(Ri),
  [gh, el] = he("progress"),
  mh = {
    color: String,
    inactive: Boolean,
    pivotText: String,
    textColor: String,
    showPivot: Te,
    pivotColor: String,
    trackColor: String,
    strokeWidth: fe,
    percentage: {
      type: fe,
      default: 0,
      validator: (e) => +e >= 0 && +e <= 100,
    },
  };
var vh = ge({
  name: gh,
  props: mh,
  setup(e) {
    const t = se(() => (e.inactive ? void 0 : e.color)),
      n = () => {
        const { textColor: o, pivotText: l, pivotColor: s, percentage: r } = e,
          i = l ?? `${r}%`;
        if (e.showPivot && i) {
          const a = {
            color: o,
            left: `${+r}%`,
            transform: `translate(-${+r}%,-50%)`,
            background: s || t.value,
          };
          return p(
            "span",
            { style: a, class: el("pivot", { inactive: e.inactive }) },
            [i],
          );
        }
      };
    return () => {
      const { trackColor: o, percentage: l, strokeWidth: s } = e,
        r = { background: o, height: Ae(s) },
        i = { width: `${l}%`, background: t.value };
      return p("div", { class: el(), style: r }, [
        p(
          "span",
          { class: el("portion", { inactive: e.inactive }), style: i },
          null,
        ),
        n(),
      ]);
    };
  },
});
const ph = be(vh),
  [Mi, bh] = he("sidebar"),
  Di = Symbol(Mi),
  yh = { modelValue: Ue(0) };
var _h = ge({
  name: Mi,
  props: yh,
  emits: ["change", "update:modelValue"],
  setup(e, { emit: t, slots: n }) {
    const { linkChildren: o } = Fl(Di),
      l = () => +e.modelValue;
    return (
      o({
        getActive: l,
        setActive: (r) => {
          r !== l() && (t("update:modelValue", r), t("change", r));
        },
      }),
      () => {
        var r;
        return p("div", { role: "tablist", class: bh() }, [
          (r = n.default) == null ? void 0 : r.call(n),
        ]);
      }
    );
  },
});
const xh = be(_h),
  [Ch, or] = he("sidebar-item"),
  wh = Se({}, No, {
    dot: Boolean,
    title: String,
    badge: fe,
    disabled: Boolean,
    badgeProps: Object,
  });
var Sh = ge({
  name: Ch,
  props: wh,
  emits: ["click"],
  setup(e, { emit: t, slots: n }) {
    const o = Ro(),
      { parent: l, index: s } = Dn(Di);
    if (!l) return;
    const r = () => {
      e.disabled || (t("click", s.value), l.setActive(s.value), o());
    };
    return () => {
      const { dot: i, badge: a, title: c, disabled: f } = e,
        d = s.value === l.getActive();
      return p(
        "div",
        {
          role: "tab",
          class: or({ select: d, disabled: f }),
          tabindex: f ? void 0 : 0,
          "aria-selected": d,
          onClick: r,
        },
        [
          p(Si, ot({ dot: i, class: or("text"), content: a }, e.badgeProps), {
            default: () => [n.title ? n.title() : c],
          }),
        ],
      );
    };
  },
});
const Eh = be(Sh),
  [Th, mn] = he("slider"),
  Oh = {
    min: Ue(0),
    max: Ue(100),
    step: Ue(1),
    range: Boolean,
    reverse: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    vertical: Boolean,
    barHeight: fe,
    buttonSize: fe,
    activeColor: String,
    inactiveColor: String,
    modelValue: { type: [Number, Array], default: 0 },
  };
var Ah = ge({
  name: Th,
  props: Oh,
  emits: ["change", "dragEnd", "dragStart", "update:modelValue"],
  setup(e, { emit: t, slots: n }) {
    let o, l, s;
    const r = L(),
      i = [L(), L()],
      a = L(),
      c = Hl(),
      f = se(() => Number(e.max) - Number(e.min)),
      d = se(() => {
        const m = e.vertical ? "width" : "height";
        return { background: e.inactiveColor, [m]: Ae(e.barHeight) };
      }),
      g = (m) => e.range && Array.isArray(m),
      _ = () => {
        const { modelValue: m, min: b } = e;
        return g(m)
          ? `${((m[1] - m[0]) * 100) / f.value}%`
          : `${((m - Number(b)) * 100) / f.value}%`;
      },
      E = () => {
        const { modelValue: m, min: b } = e;
        return g(m) ? `${((m[0] - Number(b)) * 100) / f.value}%` : "0%";
      },
      T = se(() => {
        const b = {
          [e.vertical ? "height" : "width"]: _(),
          background: e.activeColor,
        };
        a.value && (b.transition = "none");
        const I = () =>
          e.vertical
            ? e.reverse
              ? "bottom"
              : "top"
            : e.reverse
              ? "right"
              : "left";
        return (b[I()] = E()), b;
      }),
      $ = (m) => {
        const b = +e.min,
          I = +e.max,
          G = +e.step;
        m = vo(m, b, I);
        const te = Math.round((m - b) / G) * G;
        return Du(b, te);
      },
      A = () => {
        const m = e.modelValue;
        g(m) ? (s = m.map($)) : (s = $(m));
      },
      V = (m) => {
        var b, I;
        const G = (b = m[0]) != null ? b : Number(e.min),
          te = (I = m[1]) != null ? I : Number(e.max);
        return G > te ? [te, G] : [G, te];
      },
      D = (m, b) => {
        g(m) ? (m = V(m).map($)) : (m = $(m)),
          Cn(m, e.modelValue) || t("update:modelValue", m),
          b && !Cn(m, s) && t("change", m);
      },
      F = (m) => {
        if ((m.stopPropagation(), e.disabled || e.readonly)) return;
        A();
        const { min: b, reverse: I, vertical: G, modelValue: te } = e,
          ne = In(r),
          ie = () =>
            G
              ? I
                ? ne.bottom - m.clientY
                : m.clientY - ne.top
              : I
                ? ne.right - m.clientX
                : m.clientX - ne.left,
          oe = G ? ne.height : ne.width,
          Ie = Number(b) + (ie() / oe) * f.value;
        if (g(te)) {
          const [Xe, De] = te,
            Be = (Xe + De) / 2;
          Ie <= Be ? D([Ie, De], !0) : D([Xe, Ie], !0);
        } else D(Ie, !0);
      },
      U = (m) => {
        e.disabled ||
          e.readonly ||
          (c.start(m), (l = e.modelValue), A(), (a.value = "start"));
      },
      P = (m) => {
        if (e.disabled || e.readonly) return;
        a.value === "start" && t("dragStart", m),
          mt(m, !0),
          c.move(m),
          (a.value = "dragging");
        const b = In(r),
          I = e.vertical ? c.deltaY.value : c.deltaX.value,
          G = e.vertical ? b.height : b.width;
        let te = (I / G) * f.value;
        if ((e.reverse && (te = -te), g(s))) {
          const ne = e.reverse ? 1 - o : o;
          l[ne] = s[ne] + te;
        } else l = s + te;
        D(l);
      },
      K = (m) => {
        e.disabled ||
          e.readonly ||
          (a.value === "dragging" && (D(l, !0), t("dragEnd", m)),
          (a.value = ""));
      },
      N = (m) =>
        typeof m == "number"
          ? mn("button-wrapper", ["left", "right"][m])
          : mn("button-wrapper", e.reverse ? "left" : "right"),
      W = (m, b) => {
        const I = a.value === "dragging";
        if (typeof b == "number") {
          const G = n[b === 0 ? "left-button" : "right-button"];
          let te;
          if ((I && Array.isArray(l) && (te = l[0] > l[1] ? o ^ 1 : o), G))
            return G({ value: m, dragging: I, dragIndex: te });
        }
        return n.button
          ? n.button({ value: m, dragging: I })
          : p("div", { class: mn("button"), style: Vl(e.buttonSize) }, null);
      },
      R = (m) => {
        const b = typeof m == "number" ? e.modelValue[m] : e.modelValue;
        return p(
          "div",
          {
            ref: i[m ?? 0],
            role: "slider",
            class: N(m),
            tabindex: e.disabled ? void 0 : 0,
            "aria-valuemin": e.min,
            "aria-valuenow": b,
            "aria-valuemax": e.max,
            "aria-disabled": e.disabled || void 0,
            "aria-readonly": e.readonly || void 0,
            "aria-orientation": e.vertical ? "vertical" : "horizontal",
            onTouchstartPassive: (I) => {
              typeof m == "number" && (o = m), U(I);
            },
            onTouchend: K,
            onTouchcancel: K,
            onClick: mi,
          },
          [W(b, m)],
        );
      };
    return (
      D(e.modelValue),
      di(() => e.modelValue),
      i.forEach((m) => {
        Jt("touchmove", P, { target: m });
      }),
      () =>
        p(
          "div",
          {
            ref: r,
            style: d.value,
            class: mn({ vertical: e.vertical, disabled: e.disabled }),
            onClick: F,
          },
          [
            p("div", { class: mn("bar"), style: T.value }, [
              e.range ? [R(0), R(1)] : R(),
            ]),
          ],
        )
    );
  },
});
const Ph = be(Ah),
  Ih = z(
    "canvas",
    {
      id: "canvas",
      style: { display: "inline-block", width: "100%", height: "100%" },
    },
    null,
    -1,
  ),
  Bh = { style: { position: "relative" } },
  $h = z("h2", { style: { color: "var(--van-gray-5)" } }, "FILES", -1),
  kh = { style: { position: "absolute", right: "10px", top: "2vh" } },
  Nh = { class: "fox-center" },
  Rh = { class: "fox-global" },
  Mh = { class: "fix-panel" },
  Dh = z(
    "div",
    { class: "fox-panel-item-left", style: { height: "15vh" } },
    [z("img", { src: fu, alt: "", style: { height: "14vh" } })],
    -1,
  ),
  Lh = { class: "fox-panel-item-left", style: { height: "20vh" } },
  Fh = z(
    "img",
    { src: du, style: { width: "5vh", "margin-right": "3px" }, alt: "" },
    null,
    -1,
  ),
  Vh = z("span", { style: { "font-size": "3vh" } }, "%", -1),
  Hh = z("img", { src: hu, style: { width: "5vh" }, alt: "" }, null, -1),
  zh = z("span", { style: { "font-size": "3vh" } }, "℃", -1),
  jh = { class: "fox-panel-item-left", style: { height: "10vh" } },
  Uh = { class: "fox-panel-item-left", style: { height: "25vh" } },
  Kh = { class: "icon-wrapper" },
  Wh = { class: "icon-wrapper" },
  Jh = { class: "fox-panel-item-left", style: { height: "10vh" } },
  Yh = { class: "fox-center", style: { position: "relative" } },
  Gh = { key: 0, class: "blinking fox-center fox-rec-layout" },
  qh = z("span", { class: "fox-rec-font" }, "REC", -1),
  Xh = [qh],
  Zh = { class: "image-container fox-center" },
  Qh = ["src"],
  eg = { key: 2, class: "crosshair" },
  tg = { key: 3, class: "overlay" },
  ng = Cc(
    '<div class="grid"><div class="row"><div class="cell"></div><div class="cell"></div><div class="cell"></div></div><div class="row"><div class="cell"></div><div class="cell"></div><div class="cell"></div></div><div class="row"><div class="cell"></div><div class="cell"></div><div class="cell"></div></div></div>',
    1,
  ),
  og = [ng],
  lg = { class: "fox-picker" },
  sg = { key: 0, class: "fox-gain" },
  rg = { class: "fox-center", style: { height: "180px" } },
  ig = { class: "custom-button-red" },
  ag = { class: "custom-button-blue" },
  cg = { style: { "text-align": "center", "margin-top": "10px" } },
  ug = z("div", { class: "fox-font-2" }, "AWB", -1),
  fg = { class: "fix-panel" },
  dg = { class: "fox-panel-item" },
  hg = z("div", { class: "fox-font-2" }, "FPS", -1),
  gg = { style: { "margin-top": "2vh" } },
  mg = { class: "fox-panel-item" },
  vg = z("div", { class: "fox-font-2" }, "ISO", -1),
  pg = { style: { "margin-top": "2vh" } },
  bg = { class: "fox-panel-item" },
  yg = z("div", { class: "fox-font-2" }, "SHT", -1),
  _g = { style: { "margin-top": "2vh" } },
  xg = { class: "fox-panel-item" },
  Cg = z("div", { class: "fox-font-2" }, "COLOR", -1),
  wg = { style: { "margin-top": "2vh", "font-size": "4vh" } },
  Sg = { class: "fox-panel-item" },
  Eg = z("div", { class: "fox-font-2" }, "ZOOM", -1),
  Tg = { style: { "margin-top": "2vh" } },
  Og = {
    __name: "ControlPanel",
    setup(e) {
      let t = null,
        n = window.location.hostname;
      const o = L(!1),
        l = L(-1),
        s = L(!1),
        r = L(!1),
        i = L([]),
        a = L(!1),
        c = L(!1),
        f = L(!1),
        d = L(!1),
        g = L("24"),
        _ = L("100"),
        E = L("45"),
        T = L("1.0"),
        $ = L("10"),
        A = L("12"),
        V = L(0),
        D = L(0),
        F = L([]),
        U = L("??"),
        P = L("0"),
        K = L(1),
        N = L(0),
        W = L(!1),
        R = L({ oldName: "", newName: "" }),
        m = L(!1),
        b = L(""),
        I = se(() => ($.value / 10).toFixed(1)),
        G = se(() => (A.value / 10).toFixed(1)),
        te = L(!1),
        ne = [
          { text: "8" },
          { text: "24" },
          { text: "30" },
          { text: "50" },
          { text: "60" },
        ],
        ie = [
          { text: "1x", value: "1.0" },
          { text: "2x", value: "2.0" },
          { text: "4x", value: "4.0" },
          { text: "8x", value: "8.0" },
        ],
        oe = [
          { text: "100" },
          { text: "200" },
          { text: "400" },
          { text: "800" },
          { text: "1600" },
          { text: "3200" },
          { text: "6400" },
          { text: "12800" },
        ],
        Ie = [
          { text: "45°", value: "45" },
          { text: "90°", value: "90" },
          { text: "144°", value: "144" },
          { text: "180°", value: "180" },
          { text: "270°", value: "270" },
          { text: "360°", value: "360" },
        ],
        Xe = (v) => {
          switch (v) {
            case 0:
              (i.value = ne), (s.value = !0), (r.value = !1);
              break;
            case 1:
              (i.value = oe), (s.value = !0), (r.value = !1);
              break;
            case 2:
              (i.value = Ie), (s.value = !0), (r.value = !1);
              break;
            case 3:
              (r.value = !0), (s.value = !1);
              break;
            case 4:
              (i.value = ie), (s.value = !0), (r.value = !1);
              break;
          }
        },
        De = () => {
          P.value === "0" ? (P.value = "1") : (P.value = "0"),
            t.send(
              JSON.stringify({ msgType: "is_recording", msgDetail: P.value }),
            );
        },
        Be = (v) => {
          switch (l.value) {
            case 0:
              (g.value = v.currentOption.text),
                t.send(JSON.stringify({ msgType: "fps", msgDetail: g.value }));
              break;
            case 1:
              (_.value = v.currentOption.text),
                t.send(JSON.stringify({ msgType: "iso", msgDetail: _.value }));
              break;
            case 2:
              (E.value = v.currentOption.value),
                t.send(JSON.stringify({ msgType: "sht", msgDetail: E.value }));
              break;
            case 4:
              (T.value = v.currentOption.value),
                t.send(
                  JSON.stringify({ msgType: "lv_zoom", msgDetail: T.value }),
                );
              break;
          }
        },
        $t = (v) => {
          t.send(
            JSON.stringify({
              msgType: "cg_rb",
              msgDetail: `${I.value},${G.value}`,
            }),
          ),
            d.value === !0 &&
              (t.send(JSON.stringify({ msgType: "awb", msgDetail: "0" })),
              (d.value = !1));
        },
        cn = (v) => {
          v
            ? t.send(JSON.stringify({ msgType: "awb", msgDetail: "1" }))
            : t.send(JSON.stringify({ msgType: "awb", msgDetail: "0" }));
        },
        Gt = (v) => {
          (s.value = !1), (r.value = !1), (l.value = -1);
        },
        ze = (v) => {
          switch (JSON.parse(v.data).msgType) {
            case "cg_rb":
              let y = JSON.parse(v.data).msgDetail.split(",");
              ($.value = parseInt(parseFloat(y[0]) * 10)),
                (A.value = parseInt(parseFloat(y[1]) * 10));
              break;
            case "awb":
              d.value = JSON.parse(v.data).msgDetail === "1";
              break;
            case "fps":
              g.value = JSON.parse(v.data).msgDetail;
              break;
            case "iso":
              _.value = JSON.parse(v.data).msgDetail;
              break;
            case "sht":
              E.value = JSON.parse(v.data).msgDetail;
              break;
            case "cpu":
              V.value = JSON.parse(v.data).msgDetail;
              break;
            case "cpuTem":
              D.value = JSON.parse(v.data).msgDetail;
              break;
            case "sensor":
              U.value = JSON.parse(v.data).msgDetail;
              break;
            case "is_recording":
              P.value = JSON.parse(v.data).msgDetail;
              break;
            case "ssd":
              K.value = parseInt(JSON.parse(v.data).msgDetail);
              break;
            case "lv_zoom":
              T.value = JSON.parse(v.data).msgDetail;
              break;
            case "list":
              F.value = JSON.parse(JSON.parse(v.data).msgDetail);
              break;
          }
        },
        x = () => {
          (a.value = !0),
            t.send(JSON.stringify({ msgType: "list", msgDetail: "" }));
        },
        Z = (v) => {
          (R.value.oldName = v), (W.value = !0);
        },
        Q = (v) => {
          (b.value = v), (m.value = !0);
        },
        ae = () => {
          t.send(
            JSON.stringify({
              msgType: "rename",
              msgDetail: JSON.stringify(R.value),
            }),
          ),
            Zn({ type: "success", message: "Rename File success!" }),
            (W.value = !1);
        },
        pe = () => {
          t.send(JSON.stringify({ msgType: "delete", msgDetail: b.value })),
            Zn({ type: "success", message: "Delete File success!" }),
            (m.value = !1);
        },
        _e = () => {
          t.send(JSON.stringify({ msgType: "unmount", msgDetail: "" })),
            Zn({ type: "success", message: "Unmount CFE-card success!" });
        },
        u = () => {
          "WebSocket" in window &&
            ((t = new WebSocket(`ws://${n}:5678/control`)),
            (t.onmessage = ze),
            (t.onclose = (v) => {
              o.value = !1;
            }),
            (t.onopen = (v) => {
              (o.value = !0),
                Zn({ type: "success", message: "Connected success!" });
            }));
        },
        h = (v) => {
          te.value = !0;
        };
      return (
        yt(() => {
          u();
        }),
        $n(() => {
          t !== null && t.close();
        }),
        (v, y) => {
          const C = ke("van-dialog"),
            O = ke("van-field"),
            k = ke("van-cell-group"),
            w = ke("van-icon"),
            B = ke("van-cell"),
            S = ke("van-list"),
            M = ke("van-popup"),
            j = ke("van-tag"),
            H = ke("van-switch"),
            Y = ke("van-circle"),
            ee = ke("van-slider"),
            ce = ke("van-picker"),
            ue = ke("van-sidebar-item"),
            xe = ke("van-sidebar");
          return (
            Le(),
            xt(
              Ve,
              null,
              [
                p(
                  C,
                  {
                    show: te.value,
                    "onUpdate:show": y[0] || (y[0] = (q) => (te.value = q)),
                    title: "Preview",
                  },
                  { default: Ce(() => [Ih]), _: 1 },
                  8,
                  ["show"],
                ),
                p(
                  C,
                  {
                    show: W.value,
                    "onUpdate:show": y[2] || (y[2] = (q) => (W.value = q)),
                    title: "Rename File",
                    "show-cancel-button": "",
                    "confirm-button-text": "Confirm",
                    "cancel-button-text": "Cancel",
                    onConfirm: ae,
                  },
                  {
                    default: Ce(() => [
                      p(
                        k,
                        { inset: "" },
                        {
                          default: Ce(() => [
                            p(
                              O,
                              {
                                modelValue: R.value.newName,
                                "onUpdate:modelValue":
                                  y[1] || (y[1] = (q) => (R.value.newName = q)),
                                label: "New Name",
                                placeholder: "Please type new file name here",
                              },
                              null,
                              8,
                              ["modelValue"],
                            ),
                          ]),
                          _: 1,
                        },
                      ),
                    ]),
                    _: 1,
                  },
                  8,
                  ["show"],
                ),
                p(
                  C,
                  {
                    show: m.value,
                    "onUpdate:show": y[3] || (y[3] = (q) => (m.value = q)),
                    title: "Delete File",
                    message:
                      "The files cannot be restored after being deleted, please confirm it!",
                    "confirm-button-text": "Confirm",
                    "cancel-button-text": "Cancel",
                    "show-cancel-button": "",
                    onConfirm: pe,
                  },
                  null,
                  8,
                  ["show"],
                ),
                p(
                  M,
                  {
                    show: a.value,
                    "onUpdate:show": y[4] || (y[4] = (q) => (a.value = q)),
                    position: "left",
                    style: {
                      width: "80%",
                      height: "100%",
                      textAlign: "center",
                    },
                  },
                  {
                    default: Ce(() => [
                      z("div", Bh, [
                        $h,
                        z("div", kh, [
                          p(w, {
                            onClick: x,
                            name: "replay",
                            size: "8vh",
                            style: { color: "var(--van-success-color)" },
                          }),
                          p(w, {
                            onClick: _e,
                            name: "exchange",
                            size: "8vh",
                            style: {
                              color: "var(--van-danger-color)",
                              "margin-left": "10px",
                            },
                          }),
                        ]),
                        p(
                          S,
                          { "finished-text": "no more files" },
                          {
                            default: Ce(() => [
                              (Le(!0),
                              xt(
                                Ve,
                                null,
                                Xa(
                                  F.value,
                                  (q) => (
                                    Le(),
                                    Qt(
                                      B,
                                      { class: "fox-font", key: q, title: q },
                                      {
                                        title: Ce(() => [uo(Ke(q), 1)]),
                                        "right-icon": Ce(() => [
                                          z("div", Nh, [
                                            p(
                                              w,
                                              {
                                                size: "5vh",
                                                style: {
                                                  color:
                                                    "var(--van-primary-color)",
                                                },
                                                name: "play-circle",
                                                onClick: (ct) => h(q),
                                              },
                                              null,
                                              8,
                                              ["onClick"],
                                            ),
                                            p(
                                              w,
                                              {
                                                size: "5vh",
                                                style: {
                                                  "margin-left": "10px",
                                                  color:
                                                    "var(--van-primary-color)",
                                                },
                                                name: "edit",
                                                onClick: (ct) => Z(q),
                                              },
                                              null,
                                              8,
                                              ["onClick"],
                                            ),
                                            p(
                                              w,
                                              {
                                                size: "5vh",
                                                style: {
                                                  "margin-left": "10px",
                                                  color:
                                                    "var(--van-danger-color)",
                                                },
                                                name: "delete-o",
                                                onClick: (ct) => Q(q),
                                              },
                                              null,
                                              8,
                                              ["onClick"],
                                            ),
                                          ]),
                                        ]),
                                        _: 2,
                                      },
                                      1032,
                                      ["title"],
                                    )
                                  ),
                                ),
                                128,
                              )),
                            ]),
                            _: 1,
                          },
                        ),
                      ]),
                    ]),
                    _: 1,
                  },
                  8,
                  ["show"],
                ),
                z("div", Rh, [
                  z("div", Mh, [
                    Dh,
                    z("div", Lh, [
                      z("div", null, [
                        z(
                          "div",
                          {
                            class: "fox-font fox-center",
                            style: ft(
                              V.value < 60
                                ? V.value < 30
                                  ? "color:var(--van-success-color)"
                                  : "color:var(--van-warning-color)"
                                : "color:var(--van-danger-color)",
                            ),
                          },
                          [Fh, z("span", null, Ke(V.value), 1), Vh],
                          4,
                        ),
                        z(
                          "div",
                          {
                            class: "fox-font fox-center",
                            style: ft([
                              { "margin-top": "3vh" },
                              D.value < 20
                                ? D.value < 30
                                  ? "color:var(--van-success-color)"
                                  : "color:var(--van-warning-color)"
                                : "color:var(--van-danger-color)",
                            ]),
                          },
                          [Hh, z("span", null, Ke(D.value), 1), zh],
                          4,
                        ),
                      ]),
                    ]),
                    z("div", jh, [
                      p(
                        j,
                        { color: "#7232dd" },
                        { default: Ce(() => [uo(Ke(U.value), 1)]), _: 1 },
                      ),
                    ]),
                    z("div", Uh, [
                      z("div", null, [
                        p(
                          H,
                          {
                            size: "22px",
                            modelValue: f.value,
                            "onUpdate:modelValue":
                              y[5] || (y[5] = (q) => (f.value = q)),
                          },
                          {
                            node: Ce(() => [
                              z("div", Kh, [
                                p(
                                  w,
                                  {
                                    name: "plus",
                                    style: ft(
                                      f.value
                                        ? "color: var(--van-blue)"
                                        : "color: var(--van-gray-5)",
                                    ),
                                  },
                                  null,
                                  8,
                                  ["style"],
                                ),
                              ]),
                            ]),
                            _: 1,
                          },
                          8,
                          ["modelValue"],
                        ),
                        p(
                          H,
                          {
                            size: "22px",
                            style: { "margin-top": "10px" },
                            modelValue: c.value,
                            "onUpdate:modelValue":
                              y[6] || (y[6] = (q) => (c.value = q)),
                          },
                          {
                            node: Ce(() => [
                              z("div", Wh, [
                                p(
                                  w,
                                  {
                                    name: "enlarge",
                                    style: ft(
                                      c.value
                                        ? "color: var(--van-blue)"
                                        : "color: var(--van-gray-5)",
                                    ),
                                  },
                                  null,
                                  8,
                                  ["style"],
                                ),
                              ]),
                            ]),
                            _: 1,
                          },
                          8,
                          ["modelValue"],
                        ),
                      ]),
                    ]),
                    z(
                      "div",
                      {
                        class: "fox-panel-item-left",
                        style: { height: "20vh" },
                        onClick: x,
                      },
                      [
                        p(
                          Y,
                          {
                            "current-rate": N.value,
                            "onUpdate:currentRate":
                              y[7] || (y[7] = (q) => (N.value = q)),
                            color:
                              K.value < 70
                                ? K.value < 40
                                  ? "var(--van-success-color)"
                                  : "var(--van-warning-color)"
                                : "var(--van-danger-color)",
                            "layer-color": "#000000",
                            rate: K.value,
                            clockwise: !1,
                            "stroke-width": 100,
                            speed: 100,
                            text: K.value + "%",
                            size: "15vh",
                          },
                          null,
                          8,
                          ["current-rate", "color", "rate", "text"],
                        ),
                      ],
                    ),
                    z("div", Jh, [
                      p(
                        w,
                        {
                          name: "eye-o",
                          style: ft(
                            c.value
                              ? "color: var(--van-blue)"
                              : "color: var(--van-gray-5)",
                          ),
                        },
                        null,
                        8,
                        ["style"],
                      ),
                      p(
                        w,
                        {
                          name: "chart-trending-o",
                          style: ft(
                            c.value
                              ? "color: var(--van-blue)"
                              : "color: var(--van-gray-5)",
                          ),
                        },
                        null,
                        8,
                        ["style"],
                      ),
                    ]),
                  ]),
                  z("div", Yh, [
                    P.value === "1" ? (Le(), xt("div", Gh, Xh)) : fn("", !0),
                    z("div", Zh, [
                      o.value
                        ? (Le(),
                          xt(
                            "img",
                            {
                              key: 1,
                              onMouseup: Gt,
                              src: `http://${rn(n)}:8000/stream`,
                              style: { height: "auto", width: "100%" },
                              alt: "",
                            },
                            null,
                            40,
                            Qh,
                          ))
                        : (Le(),
                          xt(
                            "img",
                            {
                              key: 0,
                              onMouseup: Gt,
                              src: gu,
                              style: { height: "auto", width: "100%" },
                              alt: "",
                            },
                            null,
                            32,
                          )),
                      f.value ? (Le(), xt("div", eg)) : fn("", !0),
                      c.value ? (Le(), xt("div", tg, og)) : fn("", !0),
                    ]),
                    z("div", lg, [
                      r.value
                        ? (Le(),
                          xt("div", sg, [
                            z("div", rg, [
                              p(
                                ee,
                                {
                                  disabled: d.value === !0,
                                  onChange: $t,
                                  reverse: "",
                                  max: "50",
                                  min: "0",
                                  "bar-height": "2vh",
                                  modelValue: $.value,
                                  "onUpdate:modelValue":
                                    y[8] || (y[8] = (q) => ($.value = q)),
                                  vertical: "",
                                  "active-color": "var(--van-danger-color)",
                                },
                                {
                                  button: Ce(() => [
                                    z("div", ig, Ke(I.value), 1),
                                  ]),
                                  _: 1,
                                },
                                8,
                                ["disabled", "modelValue"],
                              ),
                              p(
                                ee,
                                {
                                  disabled: d.value === !0,
                                  onChange: $t,
                                  reverse: "",
                                  max: "50",
                                  min: "0",
                                  "bar-height": "2vh",
                                  style: { "margin-left": "12vh" },
                                  modelValue: A.value,
                                  "onUpdate:modelValue":
                                    y[9] || (y[9] = (q) => (A.value = q)),
                                  vertical: "",
                                  "active-color": "var(--van-primary-color)",
                                },
                                {
                                  button: Ce(() => [
                                    z("div", ag, Ke(G.value), 1),
                                  ]),
                                  _: 1,
                                },
                                8,
                                ["disabled", "modelValue"],
                              ),
                            ]),
                            z("div", cg, [
                              ug,
                              p(
                                H,
                                {
                                  size: "22px",
                                  style: { "margin-top": "5px" },
                                  modelValue: d.value,
                                  "onUpdate:modelValue":
                                    y[10] || (y[10] = (q) => (d.value = q)),
                                  onChange: cn,
                                },
                                null,
                                8,
                                ["modelValue"],
                              ),
                            ]),
                          ]))
                        : fn("", !0),
                      s.value
                        ? (Le(),
                          Qt(
                            ce,
                            {
                              key: 1,
                              columns: i.value,
                              onScrollInto: Be,
                              "confirm-button-text": "",
                              "cancel-button-text": "",
                              "option-height": 50,
                              "show-toolbar": !1,
                              "visible-option-num": 5,
                            },
                            null,
                            8,
                            ["columns"],
                          ))
                        : fn("", !0),
                    ]),
                  ]),
                  z("div", fg, [
                    p(
                      xe,
                      {
                        modelValue: l.value,
                        "onUpdate:modelValue":
                          y[11] || (y[11] = (q) => (l.value = q)),
                        onChange: Xe,
                      },
                      {
                        default: Ce(() => [
                          z("div", dg, [
                            p(ue, null, {
                              title: Ce(() => [
                                hg,
                                z("div", gg, Ke(g.value), 1),
                              ]),
                              _: 1,
                            }),
                          ]),
                          z("div", mg, [
                            p(ue, null, {
                              title: Ce(() => [
                                vg,
                                z("div", pg, Ke(_.value), 1),
                              ]),
                              _: 1,
                            }),
                          ]),
                          z("div", bg, [
                            p(ue, null, {
                              title: Ce(() => [
                                yg,
                                z("div", _g, Ke(E.value) + "°", 1),
                              ]),
                              _: 1,
                            }),
                          ]),
                          z("div", xg, [
                            p(ue, null, {
                              title: Ce(() => [
                                Cg,
                                z(
                                  "div",
                                  wg,
                                  Ke(I.value) + "/" + Ke(G.value),
                                  1,
                                ),
                              ]),
                              _: 1,
                            }),
                          ]),
                          z("div", Sg, [
                            p(ue, null, {
                              title: Ce(() => [
                                Eg,
                                z(
                                  "div",
                                  Tg,
                                  Ke(T.value.replace(".0", "")) + "x",
                                  1,
                                ),
                              ]),
                              _: 1,
                            }),
                          ]),
                          z("div", { class: "fox-panel-item", onClick: De }, [
                            P.value === "1"
                              ? (Le(),
                                Qt(w, {
                                  key: 0,
                                  name: "stop",
                                  size: "15vh",
                                  style: { color: "var(--van-danger-color)" },
                                }))
                              : (Le(),
                                Qt(w, {
                                  key: 1,
                                  name: "circle",
                                  size: "15vh",
                                  style: { color: "var(--van-success-color)" },
                                })),
                          ]),
                        ]),
                        _: 1,
                      },
                      8,
                      ["modelValue"],
                    ),
                  ]),
                ]),
              ],
              64,
            )
          );
        }
      );
    },
  },
  Ag = {
    __name: "App",
    setup(e) {
      return (t, n) => {
        const o = ke("van-config-provider");
        return (
          Le(), Qt(o, { theme: "dark" }, { default: Ce(() => [p(Og)]), _: 1 })
        );
      };
    },
  };
si(Ag)
  .use(xd)
  .use(Rd)
  .use(Jd)
  .use(ki)
  .use(Hd)
  .use(Ph)
  .use(Bd)
  .use(zl)
  .use(hh)
  .use(ph)
  .use(Od)
  .use(Zd)
  .use(ad)
  .use(xh)
  .use(Eh)
  .use(oh)
  .use(zd)
  .use(vt)
  .mount("#app");
