function __vite_legacy_guard() {
    import.meta.url,
        import("_").catch(()=>1);
    async function *e() {}
}
(function() {
        const r = document.createElement("link").relList;
        if (r && r.supports && r.supports("modulepreload"))
            return;
        for (const s of document.querySelectorAll('link[rel="modulepreload"]'))
            o(s);
        new MutationObserver(s=>{
                for (const a of s)
                    if (a.type === "childList")
                        for (const c of a.addedNodes)
                            c.tagName === "LINK" && c.rel === "modulepreload" && o(c)
            }
        ).observe(document, {
            childList: !0,
            subtree: !0
        });
        function n(s) {
            const a = {};
            return s.integrity && (a.integrity = s.integrity),
            s.referrerPolicy && (a.referrerPolicy = s.referrerPolicy),
                s.crossOrigin === "use-credentials" ? a.credentials = "include" : s.crossOrigin === "anonymous" ? a.credentials = "omit" : a.credentials = "same-origin",
                a
        }
        function o(s) {
            if (s.ep)
                return;
            s.ep = !0;
            const a = n(s);
            fetch(s.href, a)
        }
    }
)();
function makeMap(e, r) {
    const n = Object.create(null)
        , o = e.split(",");
    for (let s = 0; s < o.length; s++)
        n[o[s]] = !0;
    return r ? s=>!!n[s.toLowerCase()] : s=>!!n[s]
}
const EMPTY_OBJ = {}
    , EMPTY_ARR = []
    , NOOP = ()=>{}
    , NO = ()=>!1
    , isOn = e=>e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97)
    , isModelListener = e=>e.startsWith("onUpdate:")
    , extend$2 = Object.assign
    , remove = (e,r)=>{
        const n = e.indexOf(r);
        n > -1 && e.splice(n, 1)
    }
    , hasOwnProperty$3 = Object.prototype.hasOwnProperty
    , hasOwn = (e,r)=>hasOwnProperty$3.call(e, r)
    , isArray$2 = Array.isArray
    , isMap = e=>toTypeString(e) === "[object Map]"
    , isSet = e=>toTypeString(e) === "[object Set]"
    , isRegExp$1 = e=>toTypeString(e) === "[object RegExp]"
    , isFunction$2 = e=>typeof e == "function"
    , isString$1 = e=>typeof e == "string"
    , isSymbol = e=>typeof e == "symbol"
    , isObject$2 = e=>e !== null && typeof e == "object"
    , isPromise$1 = e=>(isObject$2(e) || isFunction$2(e)) && isFunction$2(e.then) && isFunction$2(e.catch)
    , objectToString = Object.prototype.toString
    , toTypeString = e=>objectToString.call(e)
    , toRawType = e=>toTypeString(e).slice(8, -1)
    , isPlainObject$2 = e=>toTypeString(e) === "[object Object]"
    , isIntegerKey = e=>isString$1(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e
    , isReservedProp = makeMap(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted")
    , cacheStringFunction = e=>{
        const r = Object.create(null);
        return n=>r[n] || (r[n] = e(n))
    }
    , camelizeRE$1 = /-(\w)/g
    , camelize$1 = cacheStringFunction(e=>e.replace(camelizeRE$1, (r,n)=>n ? n.toUpperCase() : ""))
    , hyphenateRE = /\B([A-Z])/g
    , hyphenate = cacheStringFunction(e=>e.replace(hyphenateRE, "-$1").toLowerCase())
    , capitalize = cacheStringFunction(e=>e.charAt(0).toUpperCase() + e.slice(1))
    , toHandlerKey = cacheStringFunction(e=>e ? "on".concat(capitalize(e)) : "")
    , hasChanged = (e,r)=>!Object.is(e, r)
    , invokeArrayFns = (e,r)=>{
        for (let n = 0; n < e.length; n++)
            e[n](r)
    }
    , def = (e,r,n)=>{
        Object.defineProperty(e, r, {
            configurable: !0,
            enumerable: !1,
            value: n
        })
    }
    , looseToNumber = e=>{
        const r = parseFloat(e);
        return isNaN(r) ? e : r
    }
    , toNumber = e=>{
        const r = isString$1(e) ? Number(e) : NaN;
        return isNaN(r) ? e : r
    }
;
let _globalThis;
const getGlobalThis = ()=>_globalThis || (_globalThis = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function normalizeStyle(e) {
    if (isArray$2(e)) {
        const r = {};
        for (let n = 0; n < e.length; n++) {
            const o = e[n]
                , s = isString$1(o) ? parseStringStyle(o) : normalizeStyle(o);
            if (s)
                for (const a in s)
                    r[a] = s[a]
        }
        return r
    } else if (isString$1(e) || isObject$2(e))
        return e
}
const listDelimiterRE = /;(?![^(]*\))/g
    , propertyDelimiterRE = /:([^]+)/
    , styleCommentRE = /\/\*[^]*?\*\//g;
function parseStringStyle(e) {
    const r = {};
    return e.replace(styleCommentRE, "").split(listDelimiterRE).forEach(n=>{
            if (n) {
                const o = n.split(propertyDelimiterRE);
                o.length > 1 && (r[o[0].trim()] = o[1].trim())
            }
        }
    ),
        r
}
function normalizeClass(e) {
    let r = "";
    if (isString$1(e))
        r = e;
    else if (isArray$2(e))
        for (let n = 0; n < e.length; n++) {
            const o = normalizeClass(e[n]);
            o && (r += o + " ")
        }
    else if (isObject$2(e))
        for (const n in e)
            e[n] && (r += n + " ");
    return r.trim()
}
const specialBooleanAttrs = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly"
    , isSpecialBooleanAttr = makeMap(specialBooleanAttrs);
function includeBooleanAttr(e) {
    return !!e || e === ""
}
const toDisplayString = e=>isString$1(e) ? e : e == null ? "" : isArray$2(e) || isObject$2(e) && (e.toString === objectToString || !isFunction$2(e.toString)) ? JSON.stringify(e, replacer, 2) : String(e)
    , replacer = (e,r)=>r && r.__v_isRef ? replacer(e, r.value) : isMap(r) ? {
        ["Map(".concat(r.size, ")")]: [...r.entries()].reduce((n,[o,s],a)=>(n[stringifySymbol(o, a) + " =>"] = s,
            n), {})
    } : isSet(r) ? {
        ["Set(".concat(r.size, ")")]: [...r.values()].map(n=>stringifySymbol(n))
    } : isSymbol(r) ? stringifySymbol(r) : isObject$2(r) && !isArray$2(r) && !isPlainObject$2(r) ? String(r) : r
    , stringifySymbol = (e,r="")=>{
        var n;
        return isSymbol(e) ? "Symbol(".concat((n = e.description) != null ? n : r, ")") : e
    }
;
let activeEffectScope;
class EffectScope {
    constructor(r=!1) {
        this.detached = r,
            this._active = !0,
            this.effects = [],
            this.cleanups = [],
            this.parent = activeEffectScope,
        !r && activeEffectScope && (this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1)
    }
    get active() {
        return this._active
    }
    run(r) {
        if (this._active) {
            const n = activeEffectScope;
            try {
                return activeEffectScope = this,
                    r()
            } finally {
                activeEffectScope = n
            }
        }
    }
    on() {
        activeEffectScope = this
    }
    off() {
        activeEffectScope = this.parent
    }
    stop(r) {
        if (this._active) {
            let n, o;
            for (n = 0,
                     o = this.effects.length; n < o; n++)
                this.effects[n].stop();
            for (n = 0,
                     o = this.cleanups.length; n < o; n++)
                this.cleanups[n]();
            if (this.scopes)
                for (n = 0,
                         o = this.scopes.length; n < o; n++)
                    this.scopes[n].stop(!0);
            if (!this.detached && this.parent && !r) {
                const s = this.parent.scopes.pop();
                s && s !== this && (this.parent.scopes[this.index] = s,
                    s.index = this.index)
            }
            this.parent = void 0,
                this._active = !1
        }
    }
}
function effectScope(e) {
    return new EffectScope(e)
}
function recordEffectScope(e, r=activeEffectScope) {
    r && r.active && r.effects.push(e)
}
function getCurrentScope() {
    return activeEffectScope
}
function onScopeDispose(e) {
    activeEffectScope && activeEffectScope.cleanups.push(e)
}
const createDep = e=>{
    const r = new Set(e);
    return r.w = 0,
        r.n = 0,
        r
}
    , wasTracked = e=>(e.w & trackOpBit) > 0
    , newTracked = e=>(e.n & trackOpBit) > 0
    , initDepMarkers = ({deps: e})=>{
    if (e.length)
        for (let r = 0; r < e.length; r++)
            e[r].w |= trackOpBit
}
    , finalizeDepMarkers = e=>{
    const {deps: r} = e;
    if (r.length) {
        let n = 0;
        for (let o = 0; o < r.length; o++) {
            const s = r[o];
            wasTracked(s) && !newTracked(s) ? s.delete(e) : r[n++] = s,
                s.w &= ~trackOpBit,
                s.n &= ~trackOpBit
        }
        r.length = n
    }
}
    , targetMap = new WeakMap;
let effectTrackDepth = 0
    , trackOpBit = 1;
const maxMarkerBits = 30;
let activeEffect;
const ITERATE_KEY = Symbol("")
    , MAP_KEY_ITERATE_KEY = Symbol("");
class ReactiveEffect {
    constructor(r, n=null, o) {
        this.fn = r,
            this.scheduler = n,
            this.active = !0,
            this.deps = [],
            this.parent = void 0,
            recordEffectScope(this, o)
    }
    run() {
        if (!this.active)
            return this.fn();
        let r = activeEffect
            , n = shouldTrack;
        for (; r; ) {
            if (r === this)
                return;
            r = r.parent
        }
        try {
            return this.parent = activeEffect,
                activeEffect = this,
                shouldTrack = !0,
                trackOpBit = 1 << ++effectTrackDepth,
                effectTrackDepth <= maxMarkerBits ? initDepMarkers(this) : cleanupEffect(this),
                this.fn()
        } finally {
            effectTrackDepth <= maxMarkerBits && finalizeDepMarkers(this),
                trackOpBit = 1 << --effectTrackDepth,
                activeEffect = this.parent,
                shouldTrack = n,
                this.parent = void 0,
            this.deferStop && this.stop()
        }
    }
    stop() {
        activeEffect === this ? this.deferStop = !0 : this.active && (cleanupEffect(this),
        this.onStop && this.onStop(),
            this.active = !1)
    }
}
function cleanupEffect(e) {
    const {deps: r} = e;
    if (r.length) {
        for (let n = 0; n < r.length; n++)
            r[n].delete(e);
        r.length = 0
    }
}
let shouldTrack = !0;
const trackStack = [];
function pauseTracking() {
    trackStack.push(shouldTrack),
        shouldTrack = !1
}
function resetTracking() {
    const e = trackStack.pop();
    shouldTrack = e === void 0 ? !0 : e
}
function track(e, r, n) {
    if (shouldTrack && activeEffect) {
        let o = targetMap.get(e);
        o || targetMap.set(e, o = new Map);
        let s = o.get(n);
        s || o.set(n, s = createDep()),
            trackEffects(s)
    }
}
function trackEffects(e, r) {
    let n = !1;
    effectTrackDepth <= maxMarkerBits ? newTracked(e) || (e.n |= trackOpBit,
        n = !wasTracked(e)) : n = !e.has(activeEffect),
    n && (e.add(activeEffect),
        activeEffect.deps.push(e))
}
function trigger(e, r, n, o, s, a) {
    const c = targetMap.get(e);
    if (!c)
        return;
    let l = [];
    if (r === "clear")
        l = [...c.values()];
    else if (n === "length" && isArray$2(e)) {
        const d = Number(o);
        c.forEach((u,f)=>{
                (f === "length" || !isSymbol(f) && f >= d) && l.push(u)
            }
        )
    } else
        switch (n !== void 0 && l.push(c.get(n)),
            r) {
            case "add":
                isArray$2(e) ? isIntegerKey(n) && l.push(c.get("length")) : (l.push(c.get(ITERATE_KEY)),
                isMap(e) && l.push(c.get(MAP_KEY_ITERATE_KEY)));
                break;
            case "delete":
                isArray$2(e) || (l.push(c.get(ITERATE_KEY)),
                isMap(e) && l.push(c.get(MAP_KEY_ITERATE_KEY)));
                break;
            case "set":
                isMap(e) && l.push(c.get(ITERATE_KEY));
                break
        }
    if (l.length === 1)
        l[0] && triggerEffects(l[0]);
    else {
        const d = [];
        for (const u of l)
            u && d.push(...u);
        triggerEffects(createDep(d))
    }
}
function triggerEffects(e, r) {
    const n = isArray$2(e) ? e : [...e];
    for (const o of n)
        o.computed && triggerEffect(o);
    for (const o of n)
        o.computed || triggerEffect(o)
}
function triggerEffect(e, r) {
    (e !== activeEffect || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run())
}
function getDepFromReactive(e, r) {
    var n;
    return (n = targetMap.get(e)) == null ? void 0 : n.get(r)
}
const isNonTrackableKeys = makeMap("__proto__,__v_isRef,__isVue")
    , builtInSymbols = new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e !== "arguments" && e !== "caller").map(e=>Symbol[e]).filter(isSymbol))
    , arrayInstrumentations = createArrayInstrumentations();
function createArrayInstrumentations() {
    const e = {};
    return ["includes", "indexOf", "lastIndexOf"].forEach(r=>{
            e[r] = function(...n) {
                const o = toRaw(this);
                for (let a = 0, c = this.length; a < c; a++)
                    track(o, "get", a + "");
                const s = o[r](...n);
                return s === -1 || s === !1 ? o[r](...n.map(toRaw)) : s
            }
        }
    ),
        ["push", "pop", "shift", "unshift", "splice"].forEach(r=>{
                e[r] = function(...n) {
                    pauseTracking();
                    const o = toRaw(this)[r].apply(this, n);
                    return resetTracking(),
                        o
                }
            }
        ),
        e
}
function hasOwnProperty$2(e) {
    const r = toRaw(this);
    return track(r, "has", e),
        r.hasOwnProperty(e)
}
class BaseReactiveHandler {
    constructor(r=!1, n=!1) {
        this._isReadonly = r,
            this._shallow = n
    }
    get(r, n, o) {
        const s = this._isReadonly
            , a = this._shallow;
        if (n === "__v_isReactive")
            return !s;
        if (n === "__v_isReadonly")
            return s;
        if (n === "__v_isShallow")
            return a;
        if (n === "__v_raw")
            return o === (s ? a ? shallowReadonlyMap : readonlyMap : a ? shallowReactiveMap : reactiveMap).get(r) || Object.getPrototypeOf(r) === Object.getPrototypeOf(o) ? r : void 0;
        const c = isArray$2(r);
        if (!s) {
            if (c && hasOwn(arrayInstrumentations, n))
                return Reflect.get(arrayInstrumentations, n, o);
            if (n === "hasOwnProperty")
                return hasOwnProperty$2
        }
        const l = Reflect.get(r, n, o);
        return (isSymbol(n) ? builtInSymbols.has(n) : isNonTrackableKeys(n)) || (s || track(r, "get", n),
            a) ? l : isRef(l) ? c && isIntegerKey(n) ? l : l.value : isObject$2(l) ? s ? readonly(l) : reactive(l) : l
    }
}
class MutableReactiveHandler extends BaseReactiveHandler {
    constructor(r=!1) {
        super(!1, r)
    }
    set(r, n, o, s) {
        let a = r[n];
        if (!this._shallow) {
            const d = isReadonly(a);
            if (!isShallow(o) && !isReadonly(o) && (a = toRaw(a),
                o = toRaw(o)),
            !isArray$2(r) && isRef(a) && !isRef(o))
                return d ? !1 : (a.value = o,
                    !0)
        }
        const c = isArray$2(r) && isIntegerKey(n) ? Number(n) < r.length : hasOwn(r, n)
            , l = Reflect.set(r, n, o, s);
        return r === toRaw(s) && (c ? hasChanged(o, a) && trigger(r, "set", n, o) : trigger(r, "add", n, o)),
            l
    }
    deleteProperty(r, n) {
        const o = hasOwn(r, n);
        r[n];
        const s = Reflect.deleteProperty(r, n);
        return s && o && trigger(r, "delete", n, void 0),
            s
    }
    has(r, n) {
        const o = Reflect.has(r, n);
        return (!isSymbol(n) || !builtInSymbols.has(n)) && track(r, "has", n),
            o
    }
    ownKeys(r) {
        return track(r, "iterate", isArray$2(r) ? "length" : ITERATE_KEY),
            Reflect.ownKeys(r)
    }
}
class ReadonlyReactiveHandler extends BaseReactiveHandler {
    constructor(r=!1) {
        super(!0, r)
    }
    set(r, n) {
        return !0
    }
    deleteProperty(r, n) {
        return !0
    }
}
const mutableHandlers = new MutableReactiveHandler
    , readonlyHandlers = new ReadonlyReactiveHandler
    , shallowReactiveHandlers = new MutableReactiveHandler(!0)
    , toShallow = e=>e
    , getProto = e=>Reflect.getPrototypeOf(e);
function get$1(e, r, n=!1, o=!1) {
    e = e.__v_raw;
    const s = toRaw(e)
        , a = toRaw(r);
    n || (hasChanged(r, a) && track(s, "get", r),
        track(s, "get", a));
    const {has: c} = getProto(s)
        , l = o ? toShallow : n ? toReadonly : toReactive;
    if (c.call(s, r))
        return l(e.get(r));
    if (c.call(s, a))
        return l(e.get(a));
    e !== s && e.get(r)
}
function has(e, r=!1) {
    const n = this.__v_raw
        , o = toRaw(n)
        , s = toRaw(e);
    return r || (hasChanged(e, s) && track(o, "has", e),
        track(o, "has", s)),
        e === s ? n.has(e) : n.has(e) || n.has(s)
}
function size(e, r=!1) {
    return e = e.__v_raw,
    !r && track(toRaw(e), "iterate", ITERATE_KEY),
        Reflect.get(e, "size", e)
}
function add(e) {
    e = toRaw(e);
    const r = toRaw(this);
    return getProto(r).has.call(r, e) || (r.add(e),
        trigger(r, "add", e, e)),
        this
}
function set(e, r) {
    r = toRaw(r);
    const n = toRaw(this)
        , {has: o, get: s} = getProto(n);
    let a = o.call(n, e);
    a || (e = toRaw(e),
        a = o.call(n, e));
    const c = s.call(n, e);
    return n.set(e, r),
        a ? hasChanged(r, c) && trigger(n, "set", e, r) : trigger(n, "add", e, r),
        this
}
function deleteEntry(e) {
    const r = toRaw(this)
        , {has: n, get: o} = getProto(r);
    let s = n.call(r, e);
    s || (e = toRaw(e),
        s = n.call(r, e)),
    o && o.call(r, e);
    const a = r.delete(e);
    return s && trigger(r, "delete", e, void 0),
        a
}
function clear() {
    const e = toRaw(this)
        , r = e.size !== 0
        , n = e.clear();
    return r && trigger(e, "clear", void 0, void 0),
        n
}
function createForEach(e, r) {
    return function(o, s) {
        const a = this
            , c = a.__v_raw
            , l = toRaw(c)
            , d = r ? toShallow : e ? toReadonly : toReactive;
        return !e && track(l, "iterate", ITERATE_KEY),
            c.forEach((u,f)=>o.call(s, d(u), d(f), a))
    }
}
function createIterableMethod(e, r, n) {
    return function(...o) {
        const s = this.__v_raw
            , a = toRaw(s)
            , c = isMap(a)
            , l = e === "entries" || e === Symbol.iterator && c
            , d = e === "keys" && c
            , u = s[e](...o)
            , f = n ? toShallow : r ? toReadonly : toReactive;
        return !r && track(a, "iterate", d ? MAP_KEY_ITERATE_KEY : ITERATE_KEY),
            {
                next() {
                    const {value: m, done: x} = u.next();
                    return x ? {
                        value: m,
                        done: x
                    } : {
                        value: l ? [f(m[0]), f(m[1])] : f(m),
                        done: x
                    }
                },
                [Symbol.iterator]() {
                    return this
                }
            }
    }
}
function createReadonlyMethod(e) {
    return function(...r) {
        return e === "delete" ? !1 : e === "clear" ? void 0 : this
    }
}
function createInstrumentations() {
    const e = {
        get(a) {
            return get$1(this, a)
        },
        get size() {
            return size(this)
        },
        has,
        add,
        set,
        delete: deleteEntry,
        clear,
        forEach: createForEach(!1, !1)
    }
        , r = {
        get(a) {
            return get$1(this, a, !1, !0)
        },
        get size() {
            return size(this)
        },
        has,
        add,
        set,
        delete: deleteEntry,
        clear,
        forEach: createForEach(!1, !0)
    }
        , n = {
        get(a) {
            return get$1(this, a, !0)
        },
        get size() {
            return size(this, !0)
        },
        has(a) {
            return has.call(this, a, !0)
        },
        add: createReadonlyMethod("add"),
        set: createReadonlyMethod("set"),
        delete: createReadonlyMethod("delete"),
        clear: createReadonlyMethod("clear"),
        forEach: createForEach(!0, !1)
    }
        , o = {
        get(a) {
            return get$1(this, a, !0, !0)
        },
        get size() {
            return size(this, !0)
        },
        has(a) {
            return has.call(this, a, !0)
        },
        add: createReadonlyMethod("add"),
        set: createReadonlyMethod("set"),
        delete: createReadonlyMethod("delete"),
        clear: createReadonlyMethod("clear"),
        forEach: createForEach(!0, !0)
    };
    return ["keys", "values", "entries", Symbol.iterator].forEach(a=>{
            e[a] = createIterableMethod(a, !1, !1),
                n[a] = createIterableMethod(a, !0, !1),
                r[a] = createIterableMethod(a, !1, !0),
                o[a] = createIterableMethod(a, !0, !0)
        }
    ),
        [e, n, r, o]
}
const [mutableInstrumentations,readonlyInstrumentations,shallowInstrumentations,shallowReadonlyInstrumentations] = createInstrumentations();
function createInstrumentationGetter(e, r) {
    const n = r ? e ? shallowReadonlyInstrumentations : shallowInstrumentations : e ? readonlyInstrumentations : mutableInstrumentations;
    return (o,s,a)=>s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? o : Reflect.get(hasOwn(n, s) && s in o ? n : o, s, a)
}
const mutableCollectionHandlers = {
    get: createInstrumentationGetter(!1, !1)
}
    , shallowCollectionHandlers = {
    get: createInstrumentationGetter(!1, !0)
}
    , readonlyCollectionHandlers = {
    get: createInstrumentationGetter(!0, !1)
}
    , reactiveMap = new WeakMap
    , shallowReactiveMap = new WeakMap
    , readonlyMap = new WeakMap
    , shallowReadonlyMap = new WeakMap;
function targetTypeMap(e) {
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
            return 0
    }
}
function getTargetType(e) {
    return e.__v_skip || !Object.isExtensible(e) ? 0 : targetTypeMap(toRawType(e))
}
function reactive(e) {
    return isReadonly(e) ? e : createReactiveObject(e, !1, mutableHandlers, mutableCollectionHandlers, reactiveMap)
}
function shallowReactive(e) {
    return createReactiveObject(e, !1, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap)
}
function readonly(e) {
    return createReactiveObject(e, !0, readonlyHandlers, readonlyCollectionHandlers, readonlyMap)
}
function createReactiveObject(e, r, n, o, s) {
    if (!isObject$2(e) || e.__v_raw && !(r && e.__v_isReactive))
        return e;
    const a = s.get(e);
    if (a)
        return a;
    const c = getTargetType(e);
    if (c === 0)
        return e;
    const l = new Proxy(e,c === 2 ? o : n);
    return s.set(e, l),
        l
}
function isReactive(e) {
    return isReadonly(e) ? isReactive(e.__v_raw) : !!(e && e.__v_isReactive)
}
function isReadonly(e) {
    return !!(e && e.__v_isReadonly)
}
function isShallow(e) {
    return !!(e && e.__v_isShallow)
}
function isProxy(e) {
    return isReactive(e) || isReadonly(e)
}
function toRaw(e) {
    const r = e && e.__v_raw;
    return r ? toRaw(r) : e
}
function markRaw(e) {
    return def(e, "__v_skip", !0),
        e
}
const toReactive = e=>isObject$2(e) ? reactive(e) : e
    , toReadonly = e=>isObject$2(e) ? readonly(e) : e;
function trackRefValue(e) {
    shouldTrack && activeEffect && (e = toRaw(e),
        trackEffects(e.dep || (e.dep = createDep())))
}
function triggerRefValue(e, r) {
    e = toRaw(e);
    const n = e.dep;
    n && triggerEffects(n)
}
function isRef(e) {
    return !!(e && e.__v_isRef === !0)
}
function ref(e) {
    return createRef(e, !1)
}
function shallowRef(e) {
    return createRef(e, !0)
}
function createRef(e, r) {
    return isRef(e) ? e : new RefImpl(e,r)
}
class RefImpl {
    constructor(r, n) {
        this.__v_isShallow = n,
            this.dep = void 0,
            this.__v_isRef = !0,
            this._rawValue = n ? r : toRaw(r),
            this._value = n ? r : toReactive(r)
    }
    get value() {
        return trackRefValue(this),
            this._value
    }
    set value(r) {
        const n = this.__v_isShallow || isShallow(r) || isReadonly(r);
        r = n ? r : toRaw(r),
        hasChanged(r, this._rawValue) && (this._rawValue = r,
            this._value = n ? r : toReactive(r),
            triggerRefValue(this))
    }
}
function unref(e) {
    return isRef(e) ? e.value : e
}
const shallowUnwrapHandlers = {
    get: (e,r,n)=>unref(Reflect.get(e, r, n)),
    set: (e,r,n,o)=>{
        const s = e[r];
        return isRef(s) && !isRef(n) ? (s.value = n,
            !0) : Reflect.set(e, r, n, o)
    }
};
function proxyRefs(e) {
    return isReactive(e) ? e : new Proxy(e,shallowUnwrapHandlers)
}
function toRefs(e) {
    const r = isArray$2(e) ? new Array(e.length) : {};
    for (const n in e)
        r[n] = propertyToRef(e, n);
    return r
}
class ObjectRefImpl {
    constructor(r, n, o) {
        this._object = r,
            this._key = n,
            this._defaultValue = o,
            this.__v_isRef = !0
    }
    get value() {
        const r = this._object[this._key];
        return r === void 0 ? this._defaultValue : r
    }
    set value(r) {
        this._object[this._key] = r
    }
    get dep() {
        return getDepFromReactive(toRaw(this._object), this._key)
    }
}
class GetterRefImpl {
    constructor(r) {
        this._getter = r,
            this.__v_isRef = !0,
            this.__v_isReadonly = !0
    }
    get value() {
        return this._getter()
    }
}
function toRef(e, r, n) {
    return isRef(e) ? e : isFunction$2(e) ? new GetterRefImpl(e) : isObject$2(e) && arguments.length > 1 ? propertyToRef(e, r, n) : ref(e)
}
function propertyToRef(e, r, n) {
    const o = e[r];
    return isRef(o) ? o : new ObjectRefImpl(e,r,n)
}
class ComputedRefImpl {
    constructor(r, n, o, s) {
        this._setter = n,
            this.dep = void 0,
            this.__v_isRef = !0,
            this.__v_isReadonly = !1,
            this._dirty = !0,
            this.effect = new ReactiveEffect(r,()=>{
                    this._dirty || (this._dirty = !0,
                        triggerRefValue(this))
                }
            ),
            this.effect.computed = this,
            this.effect.active = this._cacheable = !s,
            this.__v_isReadonly = o
    }
    get value() {
        const r = toRaw(this);
        return trackRefValue(r),
        (r._dirty || !r._cacheable) && (r._dirty = !1,
            r._value = r.effect.run()),
            r._value
    }
    set value(r) {
        this._setter(r)
    }
}
function computed$1(e, r, n=!1) {
    let o, s;
    const a = isFunction$2(e);
    return a ? (o = e,
        s = NOOP) : (o = e.get,
        s = e.set),
        new ComputedRefImpl(o,s,a || !s,n)
}
function warn(e, ...r) {}
function callWithErrorHandling(e, r, n, o) {
    let s;
    try {
        s = o ? e(...o) : e()
    } catch (a) {
        handleError(a, r, n)
    }
    return s
}
function callWithAsyncErrorHandling(e, r, n, o) {
    if (isFunction$2(e)) {
        const a = callWithErrorHandling(e, r, n, o);
        return a && isPromise$1(a) && a.catch(c=>{
                handleError(c, r, n)
            }
        ),
            a
    }
    const s = [];
    for (let a = 0; a < e.length; a++)
        s.push(callWithAsyncErrorHandling(e[a], r, n, o));
    return s
}
function handleError(e, r, n, o=!0) {
    const s = r ? r.vnode : null;
    if (r) {
        let a = r.parent;
        const c = r.proxy
            , l = n;
        for (; a; ) {
            const u = a.ec;
            if (u) {
                for (let f = 0; f < u.length; f++)
                    if (u[f](e, c, l) === !1)
                        return
            }
            a = a.parent
        }
        const d = r.appContext.config.errorHandler;
        if (d) {
            callWithErrorHandling(d, null, 10, [e, c, l]);
            return
        }
    }
    logError(e, n, s, o)
}
function logError(e, r, n, o=!0) {
    console.error(e)
}
let isFlushing = !1
    , isFlushPending = !1;
const queue$1 = [];
let flushIndex = 0;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null
    , postFlushIndex = 0;
const resolvedPromise = Promise.resolve();
let currentFlushPromise = null;
function nextTick(e) {
    const r = currentFlushPromise || resolvedPromise;
    return e ? r.then(this ? e.bind(this) : e) : r
}
function findInsertionIndex(e) {
    let r = flushIndex + 1
        , n = queue$1.length;
    for (; r < n; ) {
        const o = r + n >>> 1
            , s = queue$1[o]
            , a = getId(s);
        a < e || a === e && s.pre ? r = o + 1 : n = o
    }
    return r
}
function queueJob(e) {
    (!queue$1.length || !queue$1.includes(e, isFlushing && e.allowRecurse ? flushIndex + 1 : flushIndex)) && (e.id == null ? queue$1.push(e) : queue$1.splice(findInsertionIndex(e.id), 0, e),
        queueFlush())
}
function queueFlush() {
    !isFlushing && !isFlushPending && (isFlushPending = !0,
        currentFlushPromise = resolvedPromise.then(flushJobs))
}
function invalidateJob(e) {
    const r = queue$1.indexOf(e);
    r > flushIndex && queue$1.splice(r, 1)
}
function queuePostFlushCb(e) {
    isArray$2(e) ? pendingPostFlushCbs.push(...e) : (!activePostFlushCbs || !activePostFlushCbs.includes(e, e.allowRecurse ? postFlushIndex + 1 : postFlushIndex)) && pendingPostFlushCbs.push(e),
        queueFlush()
}
function flushPreFlushCbs(e, r, n=isFlushing ? flushIndex + 1 : 0) {
    for (; n < queue$1.length; n++) {
        const o = queue$1[n];
        if (o && o.pre) {
            if (e && o.id !== e.uid)
                continue;
            queue$1.splice(n, 1),
                n--,
                o()
        }
    }
}
function flushPostFlushCbs(e) {
    if (pendingPostFlushCbs.length) {
        const r = [...new Set(pendingPostFlushCbs)];
        if (pendingPostFlushCbs.length = 0,
            activePostFlushCbs) {
            activePostFlushCbs.push(...r);
            return
        }
        for (activePostFlushCbs = r,
                 activePostFlushCbs.sort((n,o)=>getId(n) - getId(o)),
                 postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++)
            activePostFlushCbs[postFlushIndex]();
        activePostFlushCbs = null,
            postFlushIndex = 0
    }
}
const getId = e=>e.id == null ? 1 / 0 : e.id
    , comparator = (e,r)=>{
        const n = getId(e) - getId(r);
        if (n === 0) {
            if (e.pre && !r.pre)
                return -1;
            if (r.pre && !e.pre)
                return 1
        }
        return n
    }
;
function flushJobs(e) {
    isFlushPending = !1,
        isFlushing = !0,
        queue$1.sort(comparator);
    const r = NOOP;
    try {
        for (flushIndex = 0; flushIndex < queue$1.length; flushIndex++) {
            const n = queue$1[flushIndex];
            n && n.active !== !1 && callWithErrorHandling(n, null, 14)
        }
    } finally {
        flushIndex = 0,
            queue$1.length = 0,
            flushPostFlushCbs(),
            isFlushing = !1,
            currentFlushPromise = null,
        (queue$1.length || pendingPostFlushCbs.length) && flushJobs()
    }
}
function emit(e, r, ...n) {
    if (e.isUnmounted)
        return;
    const o = e.vnode.props || EMPTY_OBJ;
    let s = n;
    const a = r.startsWith("update:")
        , c = a && r.slice(7);
    if (c && c in o) {
        const f = "".concat(c === "modelValue" ? "model" : c, "Modifiers")
            , {number: m, trim: x} = o[f] || EMPTY_OBJ;
        x && (s = n.map(_=>isString$1(_) ? _.trim() : _)),
        m && (s = n.map(looseToNumber))
    }
    let l, d = o[l = toHandlerKey(r)] || o[l = toHandlerKey(camelize$1(r))];
    !d && a && (d = o[l = toHandlerKey(hyphenate(r))]),
    d && callWithAsyncErrorHandling(d, e, 6, s);
    const u = o[l + "Once"];
    if (u) {
        if (!e.emitted)
            e.emitted = {};
        else if (e.emitted[l])
            return;
        e.emitted[l] = !0,
            callWithAsyncErrorHandling(u, e, 6, s)
    }
}
function normalizeEmitsOptions(e, r, n=!1) {
    const o = r.emitsCache
        , s = o.get(e);
    if (s !== void 0)
        return s;
    const a = e.emits;
    let c = {}
        , l = !1;
    if (!isFunction$2(e)) {
        const d = u=>{
                const f = normalizeEmitsOptions(u, r, !0);
                f && (l = !0,
                    extend$2(c, f))
            }
        ;
        !n && r.mixins.length && r.mixins.forEach(d),
        e.extends && d(e.extends),
        e.mixins && e.mixins.forEach(d)
    }
    return !a && !l ? (isObject$2(e) && o.set(e, null),
        null) : (isArray$2(a) ? a.forEach(d=>c[d] = null) : extend$2(c, a),
    isObject$2(e) && o.set(e, c),
        c)
}
function isEmitListener(e, r) {
    return !e || !isOn(r) ? !1 : (r = r.slice(2).replace(/Once$/, ""),
    hasOwn(e, r[0].toLowerCase() + r.slice(1)) || hasOwn(e, hyphenate(r)) || hasOwn(e, r))
}
let currentRenderingInstance = null
    , currentScopeId = null;
function setCurrentRenderingInstance(e) {
    const r = currentRenderingInstance;
    return currentRenderingInstance = e,
        currentScopeId = e && e.type.__scopeId || null,
        r
}
function pushScopeId(e) {
    currentScopeId = e
}
function popScopeId() {
    currentScopeId = null
}
function withCtx(e, r=currentRenderingInstance, n) {
    if (!r || e._n)
        return e;
    const o = (...s)=>{
            o._d && setBlockTracking(-1);
            const a = setCurrentRenderingInstance(r);
            let c;
            try {
                c = e(...s)
            } finally {
                setCurrentRenderingInstance(a),
                o._d && setBlockTracking(1)
            }
            return c
        }
    ;
    return o._n = !0,
        o._c = !0,
        o._d = !0,
        o
}
function markAttrsAccessed() {}
function renderComponentRoot(e) {
    const {type: r, vnode: n, proxy: o, withProxy: s, props: a, propsOptions: [c], slots: l, attrs: d, emit: u, render: f, renderCache: m, data: x, setupState: _, ctx: g, inheritAttrs: E} = e;
    let b, w;
    const y = setCurrentRenderingInstance(e);
    try {
        if (n.shapeFlag & 4) {
            const C = s || o
                , B = C;
            b = normalizeVNode(f.call(B, C, m, a, _, x, g)),
                w = d
        } else {
            const C = r;
            b = normalizeVNode(C.length > 1 ? C(a, {
                attrs: d,
                slots: l,
                emit: u
            }) : C(a, null)),
                w = r.props ? d : getFunctionalFallthrough(d)
        }
    } catch (C) {
        blockStack.length = 0,
            handleError(C, e, 1),
            b = createVNode(Comment)
    }
    let A = b;
    if (w && E !== !1) {
        const C = Object.keys(w)
            , {shapeFlag: B} = A;
        C.length && B & 7 && (c && C.some(isModelListener) && (w = filterModelListeners(w, c)),
            A = cloneVNode(A, w))
    }
    return n.dirs && (A = cloneVNode(A),
        A.dirs = A.dirs ? A.dirs.concat(n.dirs) : n.dirs),
    n.transition && (A.transition = n.transition),
        b = A,
        setCurrentRenderingInstance(y),
        b
}
const getFunctionalFallthrough = e=>{
        let r;
        for (const n in e)
            (n === "class" || n === "style" || isOn(n)) && ((r || (r = {}))[n] = e[n]);
        return r
    }
    , filterModelListeners = (e,r)=>{
        const n = {};
        for (const o in e)
            (!isModelListener(o) || !(o.slice(9)in r)) && (n[o] = e[o]);
        return n
    }
;
function shouldUpdateComponent(e, r, n) {
    const {props: o, children: s, component: a} = e
        , {props: c, children: l, patchFlag: d} = r
        , u = a.emitsOptions;
    if (r.dirs || r.transition)
        return !0;
    if (n && d >= 0) {
        if (d & 1024)
            return !0;
        if (d & 16)
            return o ? hasPropsChanged(o, c, u) : !!c;
        if (d & 8) {
            const f = r.dynamicProps;
            for (let m = 0; m < f.length; m++) {
                const x = f[m];
                if (c[x] !== o[x] && !isEmitListener(u, x))
                    return !0
            }
        }
    } else
        return (s || l) && (!l || !l.$stable) ? !0 : o === c ? !1 : o ? c ? hasPropsChanged(o, c, u) : !0 : !!c;
    return !1
}
function hasPropsChanged(e, r, n) {
    const o = Object.keys(r);
    if (o.length !== Object.keys(e).length)
        return !0;
    for (let s = 0; s < o.length; s++) {
        const a = o[s];
        if (r[a] !== e[a] && !isEmitListener(n, a))
            return !0
    }
    return !1
}
function updateHOCHostEl({vnode: e, parent: r}, n) {
    for (; r && r.subTree === e; )
        (e = r.vnode).el = n,
            r = r.parent
}
const COMPONENTS = "components"
    , DIRECTIVES = "directives";
function resolveComponent(e, r) {
    return resolveAsset(COMPONENTS, e, !0, r) || e
}
const NULL_DYNAMIC_COMPONENT = Symbol.for("v-ndc");
function resolveDynamicComponent(e) {
    return isString$1(e) ? resolveAsset(COMPONENTS, e, !1) || e : e || NULL_DYNAMIC_COMPONENT
}
function resolveDirective(e) {
    return resolveAsset(DIRECTIVES, e)
}
function resolveAsset(e, r, n=!0, o=!1) {
    const s = currentRenderingInstance || currentInstance;
    if (s) {
        const a = s.type;
        if (e === COMPONENTS) {
            const l = getComponentName(a, !1);
            if (l && (l === r || l === camelize$1(r) || l === capitalize(camelize$1(r))))
                return a
        }
        const c = resolve(s[e] || a[e], r) || resolve(s.appContext[e], r);
        return !c && o ? a : c
    }
}
function resolve(e, r) {
    return e && (e[r] || e[camelize$1(r)] || e[capitalize(camelize$1(r))])
}
const isSuspense = e=>e.__isSuspense;
function queueEffectWithSuspense(e, r) {
    r && r.pendingBranch ? isArray$2(e) ? r.effects.push(...e) : r.effects.push(e) : queuePostFlushCb(e)
}
function watchEffect(e, r) {
    return doWatch(e, null, r)
}
const INITIAL_WATCHER_VALUE = {};
function watch(e, r, n) {
    return doWatch(e, r, n)
}
function doWatch(e, r, {immediate: n, deep: o, flush: s, onTrack: a, onTrigger: c}=EMPTY_OBJ) {
    var l;
    const d = getCurrentScope() === ((l = currentInstance) == null ? void 0 : l.scope) ? currentInstance : null;
    let u, f = !1, m = !1;
    if (isRef(e) ? (u = ()=>e.value,
        f = isShallow(e)) : isReactive(e) ? (u = ()=>e,
        o = !0) : isArray$2(e) ? (m = !0,
        f = e.some(C=>isReactive(C) || isShallow(C)),
        u = ()=>e.map(C=>{
                if (isRef(C))
                    return C.value;
                if (isReactive(C))
                    return traverse(C);
                if (isFunction$2(C))
                    return callWithErrorHandling(C, d, 2)
            }
        )) : isFunction$2(e) ? r ? u = ()=>callWithErrorHandling(e, d, 2) : u = ()=>{
            if (!(d && d.isUnmounted))
                return x && x(),
                    callWithAsyncErrorHandling(e, d, 3, [_])
        }
        : u = NOOP,
    r && o) {
        const C = u;
        u = ()=>traverse(C())
    }
    let x, _ = C=>{
        x = y.onStop = ()=>{
            callWithErrorHandling(C, d, 4),
                x = y.onStop = void 0
        }
    }
        , g;
    if (isInSSRComponentSetup)
        if (_ = NOOP,
            r ? n && callWithAsyncErrorHandling(r, d, 3, [u(), m ? [] : void 0, _]) : u(),
        s === "sync") {
            const C = useSSRContext();
            g = C.__watcherHandles || (C.__watcherHandles = [])
        } else
            return NOOP;
    let E = m ? new Array(e.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
    const b = ()=>{
            if (y.active)
                if (r) {
                    const C = y.run();
                    (o || f || (m ? C.some((B,P)=>hasChanged(B, E[P])) : hasChanged(C, E))) && (x && x(),
                        callWithAsyncErrorHandling(r, d, 3, [C, E === INITIAL_WATCHER_VALUE ? void 0 : m && E[0] === INITIAL_WATCHER_VALUE ? [] : E, _]),
                        E = C)
                } else
                    y.run()
        }
    ;
    b.allowRecurse = !!r;
    let w;
    s === "sync" ? w = b : s === "post" ? w = ()=>queuePostRenderEffect(b, d && d.suspense) : (b.pre = !0,
    d && (b.id = d.uid),
        w = ()=>queueJob(b));
    const y = new ReactiveEffect(u,w);
    r ? n ? b() : E = y.run() : s === "post" ? queuePostRenderEffect(y.run.bind(y), d && d.suspense) : y.run();
    const A = ()=>{
            y.stop(),
            d && d.scope && remove(d.scope.effects, y)
        }
    ;
    return g && g.push(A),
        A
}
function instanceWatch(e, r, n) {
    const o = this.proxy
        , s = isString$1(e) ? e.includes(".") ? createPathGetter(o, e) : ()=>o[e] : e.bind(o, o);
    let a;
    isFunction$2(r) ? a = r : (a = r.handler,
        n = r);
    const c = currentInstance;
    setCurrentInstance(this);
    const l = doWatch(s, a.bind(o), n);
    return c ? setCurrentInstance(c) : unsetCurrentInstance(),
        l
}
function createPathGetter(e, r) {
    const n = r.split(".");
    return ()=>{
        let o = e;
        for (let s = 0; s < n.length && o; s++)
            o = o[n[s]];
        return o
    }
}
function traverse(e, r) {
    if (!isObject$2(e) || e.__v_skip || (r = r || new Set,
        r.has(e)))
        return e;
    if (r.add(e),
        isRef(e))
        traverse(e.value, r);
    else if (isArray$2(e))
        for (let n = 0; n < e.length; n++)
            traverse(e[n], r);
    else if (isSet(e) || isMap(e))
        e.forEach(n=>{
                traverse(n, r)
            }
        );
    else if (isPlainObject$2(e))
        for (const n in e)
            traverse(e[n], r);
    return e
}
function withDirectives(e, r) {
    const n = currentRenderingInstance;
    if (n === null)
        return e;
    const o = getExposeProxy(n) || n.proxy
        , s = e.dirs || (e.dirs = []);
    for (let a = 0; a < r.length; a++) {
        let[c,l,d,u=EMPTY_OBJ] = r[a];
        c && (isFunction$2(c) && (c = {
            mounted: c,
            updated: c
        }),
        c.deep && traverse(l),
            s.push({
                dir: c,
                instance: o,
                value: l,
                oldValue: void 0,
                arg: d,
                modifiers: u
            }))
    }
    return e
}
function invokeDirectiveHook(e, r, n, o) {
    const s = e.dirs
        , a = r && r.dirs;
    for (let c = 0; c < s.length; c++) {
        const l = s[c];
        a && (l.oldValue = a[c].value);
        let d = l.dir[o];
        d && (pauseTracking(),
            callWithAsyncErrorHandling(d, n, 8, [e.el, l, e, r]),
            resetTracking())
    }
}
const leaveCbKey = Symbol("_leaveCb")
    , enterCbKey = Symbol("_enterCb");
function useTransitionState() {
    const e = {
        isMounted: !1,
        isLeaving: !1,
        isUnmounting: !1,
        leavingVNodes: new Map
    };
    return onMounted(()=>{
            e.isMounted = !0
        }
    ),
        onBeforeUnmount(()=>{
                e.isUnmounting = !0
            }
        ),
        e
}
const TransitionHookValidator = [Function, Array]
    , BaseTransitionPropsValidators = {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    onBeforeEnter: TransitionHookValidator,
    onEnter: TransitionHookValidator,
    onAfterEnter: TransitionHookValidator,
    onEnterCancelled: TransitionHookValidator,
    onBeforeLeave: TransitionHookValidator,
    onLeave: TransitionHookValidator,
    onAfterLeave: TransitionHookValidator,
    onLeaveCancelled: TransitionHookValidator,
    onBeforeAppear: TransitionHookValidator,
    onAppear: TransitionHookValidator,
    onAfterAppear: TransitionHookValidator,
    onAppearCancelled: TransitionHookValidator
}
    , BaseTransitionImpl = {
    name: "BaseTransition",
    props: BaseTransitionPropsValidators,
    setup(e, {slots: r}) {
        const n = getCurrentInstance()
            , o = useTransitionState();
        let s;
        return ()=>{
            const a = r.default && getTransitionRawChildren(r.default(), !0);
            if (!a || !a.length)
                return;
            let c = a[0];
            if (a.length > 1) {
                for (const E of a)
                    if (E.type !== Comment) {
                        c = E;
                        break
                    }
            }
            const l = toRaw(e)
                , {mode: d} = l;
            if (o.isLeaving)
                return emptyPlaceholder(c);
            const u = getKeepAliveChild(c);
            if (!u)
                return emptyPlaceholder(c);
            const f = resolveTransitionHooks(u, l, o, n);
            setTransitionHooks(u, f);
            const m = n.subTree
                , x = m && getKeepAliveChild(m);
            let _ = !1;
            const {getTransitionKey: g} = u.type;
            if (g) {
                const E = g();
                s === void 0 ? s = E : E !== s && (s = E,
                    _ = !0)
            }
            if (x && x.type !== Comment && (!isSameVNodeType(u, x) || _)) {
                const E = resolveTransitionHooks(x, l, o, n);
                if (setTransitionHooks(x, E),
                d === "out-in")
                    return o.isLeaving = !0,
                        E.afterLeave = ()=>{
                            o.isLeaving = !1,
                            n.update.active !== !1 && n.update()
                        }
                        ,
                        emptyPlaceholder(c);
                d === "in-out" && u.type !== Comment && (E.delayLeave = (b,w,y)=>{
                        const A = getLeavingNodesForType(o, x);
                        A[String(x.key)] = x,
                            b[leaveCbKey] = ()=>{
                                w(),
                                    b[leaveCbKey] = void 0,
                                    delete f.delayedLeave
                            }
                            ,
                            f.delayedLeave = y
                    }
                )
            }
            return c
        }
    }
}
    , BaseTransition = BaseTransitionImpl;
function getLeavingNodesForType(e, r) {
    const {leavingVNodes: n} = e;
    let o = n.get(r.type);
    return o || (o = Object.create(null),
        n.set(r.type, o)),
        o
}
function resolveTransitionHooks(e, r, n, o) {
    const {appear: s, mode: a, persisted: c=!1, onBeforeEnter: l, onEnter: d, onAfterEnter: u, onEnterCancelled: f, onBeforeLeave: m, onLeave: x, onAfterLeave: _, onLeaveCancelled: g, onBeforeAppear: E, onAppear: b, onAfterAppear: w, onAppearCancelled: y} = r
        , A = String(e.key)
        , C = getLeavingNodesForType(n, e)
        , B = (D,N)=>{
        D && callWithAsyncErrorHandling(D, o, 9, N)
    }
        , P = (D,N)=>{
        const F = N[1];
        B(D, N),
            isArray$2(D) ? D.every(k=>k.length <= 1) && F() : D.length <= 1 && F()
    }
        , T = {
        mode: a,
        persisted: c,
        beforeEnter(D) {
            let N = l;
            if (!n.isMounted)
                if (s)
                    N = E || l;
                else
                    return;
            D[leaveCbKey] && D[leaveCbKey](!0);
            const F = C[A];
            F && isSameVNodeType(e, F) && F.el[leaveCbKey] && F.el[leaveCbKey](),
                B(N, [D])
        },
        enter(D) {
            let N = d
                , F = u
                , k = f;
            if (!n.isMounted)
                if (s)
                    N = b || d,
                        F = w || u,
                        k = y || f;
                else
                    return;
            let $ = !1;
            const M = D[enterCbKey] = Q=>{
                    $ || ($ = !0,
                        Q ? B(k, [D]) : B(F, [D]),
                    T.delayedLeave && T.delayedLeave(),
                        D[enterCbKey] = void 0)
                }
            ;
            N ? P(N, [D, M]) : M()
        },
        leave(D, N) {
            const F = String(e.key);
            if (D[enterCbKey] && D[enterCbKey](!0),
                n.isUnmounting)
                return N();
            B(m, [D]);
            let k = !1;
            const $ = D[leaveCbKey] = M=>{
                    k || (k = !0,
                        N(),
                        M ? B(g, [D]) : B(_, [D]),
                        D[leaveCbKey] = void 0,
                    C[F] === e && delete C[F])
                }
            ;
            C[F] = e,
                x ? P(x, [D, $]) : $()
        },
        clone(D) {
            return resolveTransitionHooks(D, r, n, o)
        }
    };
    return T
}
function emptyPlaceholder(e) {
    if (isKeepAlive(e))
        return e = cloneVNode(e),
            e.children = null,
            e
}
function getKeepAliveChild(e) {
    return isKeepAlive(e) ? e.children ? e.children[0] : void 0 : e
}
function setTransitionHooks(e, r) {
    e.shapeFlag & 6 && e.component ? setTransitionHooks(e.component.subTree, r) : e.shapeFlag & 128 ? (e.ssContent.transition = r.clone(e.ssContent),
        e.ssFallback.transition = r.clone(e.ssFallback)) : e.transition = r
}
function getTransitionRawChildren(e, r=!1, n) {
    let o = []
        , s = 0;
    for (let a = 0; a < e.length; a++) {
        let c = e[a];
        const l = n == null ? c.key : String(n) + String(c.key != null ? c.key : a);
        c.type === Fragment ? (c.patchFlag & 128 && s++,
            o = o.concat(getTransitionRawChildren(c.children, r, l))) : (r || c.type !== Comment) && o.push(l != null ? cloneVNode(c, {
            key: l
        }) : c)
    }
    if (s > 1)
        for (let a = 0; a < o.length; a++)
            o[a].patchFlag = -2;
    return o
}
/*! #__NO_SIDE_EFFECTS__ */
function defineComponent(e, r) {
    return isFunction$2(e) ? (()=>extend$2({
        name: e.name
    }, r, {
        setup: e
    }))() : e
}
const isAsyncWrapper = e=>!!e.type.__asyncLoader
    , isKeepAlive = e=>e.type.__isKeepAlive
    , KeepAliveImpl = {
    name: "KeepAlive",
    __isKeepAlive: !0,
    props: {
        include: [String, RegExp, Array],
        exclude: [String, RegExp, Array],
        max: [String, Number]
    },
    setup(e, {slots: r}) {
        const n = getCurrentInstance()
            , o = n.ctx;
        if (!o.renderer)
            return ()=>{
                const y = r.default && r.default();
                return y && y.length === 1 ? y[0] : y
            }
                ;
        const s = new Map
            , a = new Set;
        let c = null;
        const l = n.suspense
            , {renderer: {p: d, m: u, um: f, o: {createElement: m}}} = o
            , x = m("div");
        o.activate = (y,A,C,B,P)=>{
            const T = y.component;
            u(y, A, C, 0, l),
                d(T.vnode, y, A, C, T, l, B, y.slotScopeIds, P),
                queuePostRenderEffect(()=>{
                        T.isDeactivated = !1,
                        T.a && invokeArrayFns(T.a);
                        const D = y.props && y.props.onVnodeMounted;
                        D && invokeVNodeHook(D, T.parent, y)
                    }
                    , l)
        }
            ,
            o.deactivate = y=>{
                const A = y.component;
                u(y, x, null, 1, l),
                    queuePostRenderEffect(()=>{
                            A.da && invokeArrayFns(A.da);
                            const C = y.props && y.props.onVnodeUnmounted;
                            C && invokeVNodeHook(C, A.parent, y),
                                A.isDeactivated = !0
                        }
                        , l)
            }
        ;
        function _(y) {
            resetShapeFlag(y),
                f(y, n, l, !0)
        }
        function g(y) {
            s.forEach((A,C)=>{
                    const B = getComponentName(A.type);
                    B && (!y || !y(B)) && E(C)
                }
            )
        }
        function E(y) {
            const A = s.get(y);
            !c || !isSameVNodeType(A, c) ? _(A) : c && resetShapeFlag(c),
                s.delete(y),
                a.delete(y)
        }
        watch(()=>[e.include, e.exclude], ([y,A])=>{
                y && g(C=>matches(y, C)),
                A && g(C=>!matches(A, C))
            }
            , {
                flush: "post",
                deep: !0
            });
        let b = null;
        const w = ()=>{
                b != null && s.set(b, getInnerChild(n.subTree))
            }
        ;
        return onMounted(w),
            onUpdated(w),
            onBeforeUnmount(()=>{
                    s.forEach(y=>{
                            const {subTree: A, suspense: C} = n
                                , B = getInnerChild(A);
                            if (y.type === B.type && y.key === B.key) {
                                resetShapeFlag(B);
                                const P = B.component.da;
                                P && queuePostRenderEffect(P, C);
                                return
                            }
                            _(y)
                        }
                    )
                }
            ),
            ()=>{
                if (b = null,
                    !r.default)
                    return null;
                const y = r.default()
                    , A = y[0];
                if (y.length > 1)
                    return c = null,
                        y;
                if (!isVNode(A) || !(A.shapeFlag & 4) && !(A.shapeFlag & 128))
                    return c = null,
                        A;
                let C = getInnerChild(A);
                const B = C.type
                    , P = getComponentName(isAsyncWrapper(C) ? C.type.__asyncResolved || {} : B)
                    , {include: T, exclude: D, max: N} = e;
                if (T && (!P || !matches(T, P)) || D && P && matches(D, P))
                    return c = C,
                        A;
                const F = C.key == null ? B : C.key
                    , k = s.get(F);
                return C.el && (C = cloneVNode(C),
                A.shapeFlag & 128 && (A.ssContent = C)),
                    b = F,
                    k ? (C.el = k.el,
                        C.component = k.component,
                    C.transition && setTransitionHooks(C, C.transition),
                        C.shapeFlag |= 512,
                        a.delete(F),
                        a.add(F)) : (a.add(F),
                    N && a.size > parseInt(N, 10) && E(a.values().next().value)),
                    C.shapeFlag |= 256,
                    c = C,
                    isSuspense(A.type) ? A : C
            }
    }
}
    , KeepAlive = KeepAliveImpl;
function matches(e, r) {
    return isArray$2(e) ? e.some(n=>matches(n, r)) : isString$1(e) ? e.split(",").includes(r) : isRegExp$1(e) ? e.test(r) : !1
}
function onActivated(e, r) {
    registerKeepAliveHook(e, "a", r)
}
function onDeactivated(e, r) {
    registerKeepAliveHook(e, "da", r)
}
function registerKeepAliveHook(e, r, n=currentInstance) {
    const o = e.__wdc || (e.__wdc = ()=>{
            let s = n;
            for (; s; ) {
                if (s.isDeactivated)
                    return;
                s = s.parent
            }
            return e()
        }
    );
    if (injectHook(r, o, n),
        n) {
        let s = n.parent;
        for (; s && s.parent; )
            isKeepAlive(s.parent.vnode) && injectToKeepAliveRoot(o, r, n, s),
                s = s.parent
    }
}
function injectToKeepAliveRoot(e, r, n, o) {
    const s = injectHook(r, e, o, !0);
    onUnmounted(()=>{
            remove(o[r], s)
        }
        , n)
}
function resetShapeFlag(e) {
    e.shapeFlag &= -257,
        e.shapeFlag &= -513
}
function getInnerChild(e) {
    return e.shapeFlag & 128 ? e.ssContent : e
}
function injectHook(e, r, n=currentInstance, o=!1) {
    if (n) {
        const s = n[e] || (n[e] = [])
            , a = r.__weh || (r.__weh = (...c)=>{
                if (n.isUnmounted)
                    return;
                pauseTracking(),
                    setCurrentInstance(n);
                const l = callWithAsyncErrorHandling(r, n, e, c);
                return unsetCurrentInstance(),
                    resetTracking(),
                    l
            }
        );
        return o ? s.unshift(a) : s.push(a),
            a
    }
}
const createHook = e=>(r,n=currentInstance)=>(!isInSSRComponentSetup || e === "sp") && injectHook(e, (...o)=>r(...o), n)
    , onBeforeMount = createHook("bm")
    , onMounted = createHook("m")
    , onBeforeUpdate = createHook("bu")
    , onUpdated = createHook("u")
    , onBeforeUnmount = createHook("bum")
    , onUnmounted = createHook("um")
    , onServerPrefetch = createHook("sp")
    , onRenderTriggered = createHook("rtg")
    , onRenderTracked = createHook("rtc");
function onErrorCaptured(e, r=currentInstance) {
    injectHook("ec", e, r)
}
function renderList(e, r, n, o) {
    let s;
    const a = n && n[o];
    if (isArray$2(e) || isString$1(e)) {
        s = new Array(e.length);
        for (let c = 0, l = e.length; c < l; c++)
            s[c] = r(e[c], c, void 0, a && a[c])
    } else if (typeof e == "number") {
        s = new Array(e);
        for (let c = 0; c < e; c++)
            s[c] = r(c + 1, c, void 0, a && a[c])
    } else if (isObject$2(e))
        if (e[Symbol.iterator])
            s = Array.from(e, (c,l)=>r(c, l, void 0, a && a[l]));
        else {
            const c = Object.keys(e);
            s = new Array(c.length);
            for (let l = 0, d = c.length; l < d; l++) {
                const u = c[l];
                s[l] = r(e[u], u, l, a && a[l])
            }
        }
    else
        s = [];
    return n && (n[o] = s),
        s
}
function renderSlot(e, r, n={}, o, s) {
    if (currentRenderingInstance.isCE || currentRenderingInstance.parent && isAsyncWrapper(currentRenderingInstance.parent) && currentRenderingInstance.parent.isCE)
        return r !== "default" && (n.name = r),
            createVNode("slot", n, o && o());
    let a = e[r];
    a && a._c && (a._d = !1),
        openBlock();
    const c = a && ensureValidVNode(a(n))
        , l = createBlock(Fragment, {
        key: n.key || c && c.key || "_".concat(r)
    }, c || (o ? o() : []), c && e._ === 1 ? 64 : -2);
    return !s && l.scopeId && (l.slotScopeIds = [l.scopeId + "-s"]),
    a && a._c && (a._d = !0),
        l
}
function ensureValidVNode(e) {
    return e.some(r=>isVNode(r) ? !(r.type === Comment || r.type === Fragment && !ensureValidVNode(r.children)) : !0) ? e : null
}
const getPublicInstance = e=>e ? isStatefulComponent(e) ? getExposeProxy(e) || e.proxy : getPublicInstance(e.parent) : null
    , publicPropertiesMap = extend$2(Object.create(null), {
    $: e=>e,
    $el: e=>e.vnode.el,
    $data: e=>e.data,
    $props: e=>e.props,
    $attrs: e=>e.attrs,
    $slots: e=>e.slots,
    $refs: e=>e.refs,
    $parent: e=>getPublicInstance(e.parent),
    $root: e=>getPublicInstance(e.root),
    $emit: e=>e.emit,
    $options: e=>resolveMergedOptions(e),
    $forceUpdate: e=>e.f || (e.f = ()=>queueJob(e.update)),
    $nextTick: e=>e.n || (e.n = nextTick.bind(e.proxy)),
    $watch: e=>instanceWatch.bind(e)
})
    , hasSetupBinding = (e,r)=>e !== EMPTY_OBJ && !e.__isScriptSetup && hasOwn(e, r)
    , PublicInstanceProxyHandlers = {
    get({_: e}, r) {
        const {ctx: n, setupState: o, data: s, props: a, accessCache: c, type: l, appContext: d} = e;
        let u;
        if (r[0] !== "$") {
            const _ = c[r];
            if (_ !== void 0)
                switch (_) {
                    case 1:
                        return o[r];
                    case 2:
                        return s[r];
                    case 4:
                        return n[r];
                    case 3:
                        return a[r]
                }
            else {
                if (hasSetupBinding(o, r))
                    return c[r] = 1,
                        o[r];
                if (s !== EMPTY_OBJ && hasOwn(s, r))
                    return c[r] = 2,
                        s[r];
                if ((u = e.propsOptions[0]) && hasOwn(u, r))
                    return c[r] = 3,
                        a[r];
                if (n !== EMPTY_OBJ && hasOwn(n, r))
                    return c[r] = 4,
                        n[r];
                shouldCacheAccess && (c[r] = 0)
            }
        }
        const f = publicPropertiesMap[r];
        let m, x;
        if (f)
            return r === "$attrs" && track(e, "get", r),
                f(e);
        if ((m = l.__cssModules) && (m = m[r]))
            return m;
        if (n !== EMPTY_OBJ && hasOwn(n, r))
            return c[r] = 4,
                n[r];
        if (x = d.config.globalProperties,
            hasOwn(x, r))
            return x[r]
    },
    set({_: e}, r, n) {
        const {data: o, setupState: s, ctx: a} = e;
        return hasSetupBinding(s, r) ? (s[r] = n,
            !0) : o !== EMPTY_OBJ && hasOwn(o, r) ? (o[r] = n,
            !0) : hasOwn(e.props, r) || r[0] === "$" && r.slice(1)in e ? !1 : (a[r] = n,
            !0)
    },
    has({_: {data: e, setupState: r, accessCache: n, ctx: o, appContext: s, propsOptions: a}}, c) {
        let l;
        return !!n[c] || e !== EMPTY_OBJ && hasOwn(e, c) || hasSetupBinding(r, c) || (l = a[0]) && hasOwn(l, c) || hasOwn(o, c) || hasOwn(publicPropertiesMap, c) || hasOwn(s.config.globalProperties, c)
    },
    defineProperty(e, r, n) {
        return n.get != null ? e._.accessCache[r] = 0 : hasOwn(n, "value") && this.set(e, r, n.value, null),
            Reflect.defineProperty(e, r, n)
    }
};
function normalizePropsOrEmits(e) {
    return isArray$2(e) ? e.reduce((r,n)=>(r[n] = null,
        r), {}) : e
}
let shouldCacheAccess = !0;
function applyOptions(e) {
    const r = resolveMergedOptions(e)
        , n = e.proxy
        , o = e.ctx;
    shouldCacheAccess = !1,
    r.beforeCreate && callHook$1(r.beforeCreate, e, "bc");
    const {data: s, computed: a, methods: c, watch: l, provide: d, inject: u, created: f, beforeMount: m, mounted: x, beforeUpdate: _, updated: g, activated: E, deactivated: b, beforeDestroy: w, beforeUnmount: y, destroyed: A, unmounted: C, render: B, renderTracked: P, renderTriggered: T, errorCaptured: D, serverPrefetch: N, expose: F, inheritAttrs: k, components: $, directives: M, filters: Q} = r;
    if (u && resolveInjections(u, o, null),
        c)
        for (const ae in c) {
            const ie = c[ae];
            isFunction$2(ie) && (o[ae] = ie.bind(n))
        }
    if (s) {
        const ae = s.call(n, n);
        isObject$2(ae) && (e.data = reactive(ae))
    }
    if (shouldCacheAccess = !0,
        a)
        for (const ae in a) {
            const ie = a[ae]
                , fe = isFunction$2(ie) ? ie.bind(n, n) : isFunction$2(ie.get) ? ie.get.bind(n, n) : NOOP
                , de = !isFunction$2(ie) && isFunction$2(ie.set) ? ie.set.bind(n) : NOOP
                , z = computed({
                get: fe,
                set: de
            });
            Object.defineProperty(o, ae, {
                enumerable: !0,
                configurable: !0,
                get: ()=>z.value,
                set: V=>z.value = V
            })
        }
    if (l)
        for (const ae in l)
            createWatcher(l[ae], o, n, ae);
    if (d) {
        const ae = isFunction$2(d) ? d.call(n) : d;
        Reflect.ownKeys(ae).forEach(ie=>{
                provide(ie, ae[ie])
            }
        )
    }
    f && callHook$1(f, e, "c");
    function J(ae, ie) {
        isArray$2(ie) ? ie.forEach(fe=>ae(fe.bind(n))) : ie && ae(ie.bind(n))
    }
    if (J(onBeforeMount, m),
        J(onMounted, x),
        J(onBeforeUpdate, _),
        J(onUpdated, g),
        J(onActivated, E),
        J(onDeactivated, b),
        J(onErrorCaptured, D),
        J(onRenderTracked, P),
        J(onRenderTriggered, T),
        J(onBeforeUnmount, y),
        J(onUnmounted, C),
        J(onServerPrefetch, N),
        isArray$2(F))
        if (F.length) {
            const ae = e.exposed || (e.exposed = {});
            F.forEach(ie=>{
                    Object.defineProperty(ae, ie, {
                        get: ()=>n[ie],
                        set: fe=>n[ie] = fe
                    })
                }
            )
        } else
            e.exposed || (e.exposed = {});
    B && e.render === NOOP && (e.render = B),
    k != null && (e.inheritAttrs = k),
    $ && (e.components = $),
    M && (e.directives = M)
}
function resolveInjections(e, r, n=NOOP) {
    isArray$2(e) && (e = normalizeInject(e));
    for (const o in e) {
        const s = e[o];
        let a;
        isObject$2(s) ? "default"in s ? a = inject(s.from || o, s.default, !0) : a = inject(s.from || o) : a = inject(s),
            isRef(a) ? Object.defineProperty(r, o, {
                enumerable: !0,
                configurable: !0,
                get: ()=>a.value,
                set: c=>a.value = c
            }) : r[o] = a
    }
}
function callHook$1(e, r, n) {
    callWithAsyncErrorHandling(isArray$2(e) ? e.map(o=>o.bind(r.proxy)) : e.bind(r.proxy), r, n)
}
function createWatcher(e, r, n, o) {
    const s = o.includes(".") ? createPathGetter(n, o) : ()=>n[o];
    if (isString$1(e)) {
        const a = r[e];
        isFunction$2(a) && watch(s, a)
    } else if (isFunction$2(e))
        watch(s, e.bind(n));
    else if (isObject$2(e))
        if (isArray$2(e))
            e.forEach(a=>createWatcher(a, r, n, o));
        else {
            const a = isFunction$2(e.handler) ? e.handler.bind(n) : r[e.handler];
            isFunction$2(a) && watch(s, a, e)
        }
}
function resolveMergedOptions(e) {
    const r = e.type
        , {mixins: n, extends: o} = r
        , {mixins: s, optionsCache: a, config: {optionMergeStrategies: c}} = e.appContext
        , l = a.get(r);
    let d;
    return l ? d = l : !s.length && !n && !o ? d = r : (d = {},
    s.length && s.forEach(u=>mergeOptions$1(d, u, c, !0)),
        mergeOptions$1(d, r, c)),
    isObject$2(r) && a.set(r, d),
        d
}
function mergeOptions$1(e, r, n, o=!1) {
    const {mixins: s, extends: a} = r;
    a && mergeOptions$1(e, a, n, !0),
    s && s.forEach(c=>mergeOptions$1(e, c, n, !0));
    for (const c in r)
        if (!(o && c === "expose")) {
            const l = internalOptionMergeStrats[c] || n && n[c];
            e[c] = l ? l(e[c], r[c]) : r[c]
        }
    return e
}
const internalOptionMergeStrats = {
    data: mergeDataFn,
    props: mergeEmitsOrPropsOptions,
    emits: mergeEmitsOrPropsOptions,
    methods: mergeObjectOptions,
    computed: mergeObjectOptions,
    beforeCreate: mergeAsArray,
    created: mergeAsArray,
    beforeMount: mergeAsArray,
    mounted: mergeAsArray,
    beforeUpdate: mergeAsArray,
    updated: mergeAsArray,
    beforeDestroy: mergeAsArray,
    beforeUnmount: mergeAsArray,
    destroyed: mergeAsArray,
    unmounted: mergeAsArray,
    activated: mergeAsArray,
    deactivated: mergeAsArray,
    errorCaptured: mergeAsArray,
    serverPrefetch: mergeAsArray,
    components: mergeObjectOptions,
    directives: mergeObjectOptions,
    watch: mergeWatchOptions,
    provide: mergeDataFn,
    inject: mergeInject
};
function mergeDataFn(e, r) {
    return r ? e ? function() {
            return extend$2(isFunction$2(e) ? e.call(this, this) : e, isFunction$2(r) ? r.call(this, this) : r)
        }
        : r : e
}
function mergeInject(e, r) {
    return mergeObjectOptions(normalizeInject(e), normalizeInject(r))
}
function normalizeInject(e) {
    if (isArray$2(e)) {
        const r = {};
        for (let n = 0; n < e.length; n++)
            r[e[n]] = e[n];
        return r
    }
    return e
}
function mergeAsArray(e, r) {
    return e ? [...new Set([].concat(e, r))] : r
}
function mergeObjectOptions(e, r) {
    return e ? extend$2(Object.create(null), e, r) : r
}
function mergeEmitsOrPropsOptions(e, r) {
    return e ? isArray$2(e) && isArray$2(r) ? [...new Set([...e, ...r])] : extend$2(Object.create(null), normalizePropsOrEmits(e), normalizePropsOrEmits(r != null ? r : {})) : r
}
function mergeWatchOptions(e, r) {
    if (!e)
        return r;
    if (!r)
        return e;
    const n = extend$2(Object.create(null), e);
    for (const o in r)
        n[o] = mergeAsArray(e[o], r[o]);
    return n
}
function createAppContext() {
    return {
        app: null,
        config: {
            isNativeTag: NO,
            performance: !1,
            globalProperties: {},
            optionMergeStrategies: {},
            errorHandler: void 0,
            warnHandler: void 0,
            compilerOptions: {}
        },
        mixins: [],
        components: {},
        directives: {},
        provides: Object.create(null),
        optionsCache: new WeakMap,
        propsCache: new WeakMap,
        emitsCache: new WeakMap
    }
}
let uid$1 = 0;
function createAppAPI(e, r) {
    return function(o, s=null) {
        isFunction$2(o) || (o = extend$2({}, o)),
        s != null && !isObject$2(s) && (s = null);
        const a = createAppContext()
            , c = new WeakSet;
        let l = !1;
        const d = a.app = {
            _uid: uid$1++,
            _component: o,
            _props: s,
            _container: null,
            _context: a,
            _instance: null,
            version,
            get config() {
                return a.config
            },
            set config(u) {},
            use(u, ...f) {
                return c.has(u) || (u && isFunction$2(u.install) ? (c.add(u),
                    u.install(d, ...f)) : isFunction$2(u) && (c.add(u),
                    u(d, ...f))),
                    d
            },
            mixin(u) {
                return a.mixins.includes(u) || a.mixins.push(u),
                    d
            },
            component(u, f) {
                return f ? (a.components[u] = f,
                    d) : a.components[u]
            },
            directive(u, f) {
                return f ? (a.directives[u] = f,
                    d) : a.directives[u]
            },
            mount(u, f, m) {
                if (!l) {
                    const x = createVNode(o, s);
                    return x.appContext = a,
                        f && r ? r(x, u) : e(x, u, m),
                        l = !0,
                        d._container = u,
                        u.__vue_app__ = d,
                    getExposeProxy(x.component) || x.component.proxy
                }
            },
            unmount() {
                l && (e(null, d._container),
                    delete d._container.__vue_app__)
            },
            provide(u, f) {
                return a.provides[u] = f,
                    d
            },
            runWithContext(u) {
                currentApp = d;
                try {
                    return u()
                } finally {
                    currentApp = null
                }
            }
        };
        return d
    }
}
let currentApp = null;
function provide(e, r) {
    if (currentInstance) {
        let n = currentInstance.provides;
        const o = currentInstance.parent && currentInstance.parent.provides;
        o === n && (n = currentInstance.provides = Object.create(o)),
            n[e] = r
    }
}
function inject(e, r, n=!1) {
    const o = currentInstance || currentRenderingInstance;
    if (o || currentApp) {
        const s = o ? o.parent == null ? o.vnode.appContext && o.vnode.appContext.provides : o.parent.provides : currentApp._context.provides;
        if (s && e in s)
            return s[e];
        if (arguments.length > 1)
            return n && isFunction$2(r) ? r.call(o && o.proxy) : r
    }
}
function hasInjectionContext() {
    return !!(currentInstance || currentRenderingInstance || currentApp)
}
function initProps(e, r, n, o=!1) {
    const s = {}
        , a = {};
    def(a, InternalObjectKey, 1),
        e.propsDefaults = Object.create(null),
        setFullProps(e, r, s, a);
    for (const c in e.propsOptions[0])
        c in s || (s[c] = void 0);
    n ? e.props = o ? s : shallowReactive(s) : e.type.props ? e.props = s : e.props = a,
        e.attrs = a
}
function updateProps(e, r, n, o) {
    const {props: s, attrs: a, vnode: {patchFlag: c}} = e
        , l = toRaw(s)
        , [d] = e.propsOptions;
    let u = !1;
    if ((o || c > 0) && !(c & 16)) {
        if (c & 8) {
            const f = e.vnode.dynamicProps;
            for (let m = 0; m < f.length; m++) {
                let x = f[m];
                if (isEmitListener(e.emitsOptions, x))
                    continue;
                const _ = r[x];
                if (d)
                    if (hasOwn(a, x))
                        _ !== a[x] && (a[x] = _,
                            u = !0);
                    else {
                        const g = camelize$1(x);
                        s[g] = resolvePropValue(d, l, g, _, e, !1)
                    }
                else
                    _ !== a[x] && (a[x] = _,
                        u = !0)
            }
        }
    } else {
        setFullProps(e, r, s, a) && (u = !0);
        let f;
        for (const m in l)
            (!r || !hasOwn(r, m) && ((f = hyphenate(m)) === m || !hasOwn(r, f))) && (d ? n && (n[m] !== void 0 || n[f] !== void 0) && (s[m] = resolvePropValue(d, l, m, void 0, e, !0)) : delete s[m]);
        if (a !== l)
            for (const m in a)
                (!r || !hasOwn(r, m)) && (delete a[m],
                    u = !0)
    }
    u && trigger(e, "set", "$attrs")
}
function setFullProps(e, r, n, o) {
    const [s,a] = e.propsOptions;
    let c = !1, l;
    if (r)
        for (let d in r) {
            if (isReservedProp(d))
                continue;
            const u = r[d];
            let f;
            s && hasOwn(s, f = camelize$1(d)) ? !a || !a.includes(f) ? n[f] = u : (l || (l = {}))[f] = u : isEmitListener(e.emitsOptions, d) || (!(d in o) || u !== o[d]) && (o[d] = u,
                c = !0)
        }
    if (a) {
        const d = toRaw(n)
            , u = l || EMPTY_OBJ;
        for (let f = 0; f < a.length; f++) {
            const m = a[f];
            n[m] = resolvePropValue(s, d, m, u[m], e, !hasOwn(u, m))
        }
    }
    return c
}
function resolvePropValue(e, r, n, o, s, a) {
    const c = e[n];
    if (c != null) {
        const l = hasOwn(c, "default");
        if (l && o === void 0) {
            const d = c.default;
            if (c.type !== Function && !c.skipFactory && isFunction$2(d)) {
                const {propsDefaults: u} = s;
                n in u ? o = u[n] : (setCurrentInstance(s),
                    o = u[n] = d.call(null, r),
                    unsetCurrentInstance())
            } else
                o = d
        }
        c[0] && (a && !l ? o = !1 : c[1] && (o === "" || o === hyphenate(n)) && (o = !0))
    }
    return o
}
function normalizePropsOptions(e, r, n=!1) {
    const o = r.propsCache
        , s = o.get(e);
    if (s)
        return s;
    const a = e.props
        , c = {}
        , l = [];
    let d = !1;
    if (!isFunction$2(e)) {
        const f = m=>{
                d = !0;
                const [x,_] = normalizePropsOptions(m, r, !0);
                extend$2(c, x),
                _ && l.push(..._)
            }
        ;
        !n && r.mixins.length && r.mixins.forEach(f),
        e.extends && f(e.extends),
        e.mixins && e.mixins.forEach(f)
    }
    if (!a && !d)
        return isObject$2(e) && o.set(e, EMPTY_ARR),
            EMPTY_ARR;
    if (isArray$2(a))
        for (let f = 0; f < a.length; f++) {
            const m = camelize$1(a[f]);
            validatePropName(m) && (c[m] = EMPTY_OBJ)
        }
    else if (a)
        for (const f in a) {
            const m = camelize$1(f);
            if (validatePropName(m)) {
                const x = a[f]
                    , _ = c[m] = isArray$2(x) || isFunction$2(x) ? {
                    type: x
                } : extend$2({}, x);
                if (_) {
                    const g = getTypeIndex(Boolean, _.type)
                        , E = getTypeIndex(String, _.type);
                    _[0] = g > -1,
                        _[1] = E < 0 || g < E,
                    (g > -1 || hasOwn(_, "default")) && l.push(m)
                }
            }
        }
    const u = [c, l];
    return isObject$2(e) && o.set(e, u),
        u
}
function validatePropName(e) {
    return e[0] !== "$"
}
function getType(e) {
    const r = e && e.toString().match(/^\s*(function|class) (\w+)/);
    return r ? r[2] : e === null ? "null" : ""
}
function isSameType(e, r) {
    return getType(e) === getType(r)
}
function getTypeIndex(e, r) {
    return isArray$2(r) ? r.findIndex(n=>isSameType(n, e)) : isFunction$2(r) && isSameType(r, e) ? 0 : -1
}
const isInternalKey = e=>e[0] === "_" || e === "$stable"
    , normalizeSlotValue = e=>isArray$2(e) ? e.map(normalizeVNode) : [normalizeVNode(e)]
    , normalizeSlot$1 = (e,r,n)=>{
        if (r._n)
            return r;
        const o = withCtx((...s)=>normalizeSlotValue(r(...s)), n);
        return o._c = !1,
            o
    }
    , normalizeObjectSlots = (e,r,n)=>{
        const o = e._ctx;
        for (const s in e) {
            if (isInternalKey(s))
                continue;
            const a = e[s];
            if (isFunction$2(a))
                r[s] = normalizeSlot$1(s, a, o);
            else if (a != null) {
                const c = normalizeSlotValue(a);
                r[s] = ()=>c
            }
        }
    }
    , normalizeVNodeSlots = (e,r)=>{
        const n = normalizeSlotValue(r);
        e.slots.default = ()=>n
    }
    , initSlots = (e,r)=>{
        if (e.vnode.shapeFlag & 32) {
            const n = r._;
            n ? (e.slots = toRaw(r),
                def(r, "_", n)) : normalizeObjectSlots(r, e.slots = {})
        } else
            e.slots = {},
            r && normalizeVNodeSlots(e, r);
        def(e.slots, InternalObjectKey, 1)
    }
    , updateSlots = (e,r,n)=>{
        const {vnode: o, slots: s} = e;
        let a = !0
            , c = EMPTY_OBJ;
        if (o.shapeFlag & 32) {
            const l = r._;
            l ? n && l === 1 ? a = !1 : (extend$2(s, r),
            !n && l === 1 && delete s._) : (a = !r.$stable,
                normalizeObjectSlots(r, s)),
                c = r
        } else
            r && (normalizeVNodeSlots(e, r),
                c = {
                    default: 1
                });
        if (a)
            for (const l in s)
                !isInternalKey(l) && c[l] == null && delete s[l]
    }
;
function setRef(e, r, n, o, s=!1) {
    if (isArray$2(e)) {
        e.forEach((x,_)=>setRef(x, r && (isArray$2(r) ? r[_] : r), n, o, s));
        return
    }
    if (isAsyncWrapper(o) && !s)
        return;
    const a = o.shapeFlag & 4 ? getExposeProxy(o.component) || o.component.proxy : o.el
        , c = s ? null : a
        , {i: l, r: d} = e
        , u = r && r.r
        , f = l.refs === EMPTY_OBJ ? l.refs = {} : l.refs
        , m = l.setupState;
    if (u != null && u !== d && (isString$1(u) ? (f[u] = null,
    hasOwn(m, u) && (m[u] = null)) : isRef(u) && (u.value = null)),
        isFunction$2(d))
        callWithErrorHandling(d, l, 12, [c, f]);
    else {
        const x = isString$1(d)
            , _ = isRef(d);
        if (x || _) {
            const g = ()=>{
                    if (e.f) {
                        const E = x ? hasOwn(m, d) ? m[d] : f[d] : d.value;
                        s ? isArray$2(E) && remove(E, a) : isArray$2(E) ? E.includes(a) || E.push(a) : x ? (f[d] = [a],
                        hasOwn(m, d) && (m[d] = f[d])) : (d.value = [a],
                        e.k && (f[e.k] = d.value))
                    } else
                        x ? (f[d] = c,
                        hasOwn(m, d) && (m[d] = c)) : _ && (d.value = c,
                        e.k && (f[e.k] = c))
                }
            ;
            c ? (g.id = -1,
                queuePostRenderEffect(g, n)) : g()
        }
    }
}
const queuePostRenderEffect = queueEffectWithSuspense;
function createRenderer(e) {
    return baseCreateRenderer(e)
}
function baseCreateRenderer(e, r) {
    const n = getGlobalThis();
    n.__VUE__ = !0;
    const {insert: o, remove: s, patchProp: a, createElement: c, createText: l, createComment: d, setText: u, setElementText: f, parentNode: m, nextSibling: x, setScopeId: _=NOOP, insertStaticContent: g} = e
        , E = (S,R,O,q=null,U=null,W=null,ee=!1,G=null,Z=!!R.dynamicChildren)=>{
        if (S === R)
            return;
        S && !isSameVNodeType(S, R) && (q = L(S),
            V(S, U, W, !0),
            S = null),
        R.patchFlag === -2 && (Z = !1,
            R.dynamicChildren = null);
        const {type: K, ref: oe, shapeFlag: ne} = R;
        switch (K) {
            case Text:
                b(S, R, O, q);
                break;
            case Comment:
                w(S, R, O, q);
                break;
            case Static:
                S == null && y(R, O, q, ee);
                break;
            case Fragment:
                $(S, R, O, q, U, W, ee, G, Z);
                break;
            default:
                ne & 1 ? B(S, R, O, q, U, W, ee, G, Z) : ne & 6 ? M(S, R, O, q, U, W, ee, G, Z) : (ne & 64 || ne & 128) && K.process(S, R, O, q, U, W, ee, G, Z, Y)
        }
        oe != null && U && setRef(oe, S && S.ref, W, R || S, !R)
    }
        , b = (S,R,O,q)=>{
        if (S == null)
            o(R.el = l(R.children), O, q);
        else {
            const U = R.el = S.el;
            R.children !== S.children && u(U, R.children)
        }
    }
        , w = (S,R,O,q)=>{
        S == null ? o(R.el = d(R.children || ""), O, q) : R.el = S.el
    }
        , y = (S,R,O,q)=>{
        [S.el,S.anchor] = g(S.children, R, O, q, S.el, S.anchor)
    }
        , A = ({el: S, anchor: R},O,q)=>{
        let U;
        for (; S && S !== R; )
            U = x(S),
                o(S, O, q),
                S = U;
        o(R, O, q)
    }
        , C = ({el: S, anchor: R})=>{
        let O;
        for (; S && S !== R; )
            O = x(S),
                s(S),
                S = O;
        s(R)
    }
        , B = (S,R,O,q,U,W,ee,G,Z)=>{
        ee = ee || R.type === "svg",
            S == null ? P(R, O, q, U, W, ee, G, Z) : N(S, R, U, W, ee, G, Z)
    }
        , P = (S,R,O,q,U,W,ee,G)=>{
        let Z, K;
        const {type: oe, props: ne, shapeFlag: ce, transition: le, dirs: ue} = S;
        if (Z = S.el = c(S.type, W, ne && ne.is, ne),
            ce & 8 ? f(Z, S.children) : ce & 16 && D(S.children, Z, null, q, U, W && oe !== "foreignObject", ee, G),
        ue && invokeDirectiveHook(S, null, q, "created"),
            T(Z, S, S.scopeId, ee, q),
            ne) {
            for (const xe in ne)
                xe !== "value" && !isReservedProp(xe) && a(Z, xe, null, ne[xe], W, S.children, q, U, X);
            "value"in ne && a(Z, "value", null, ne.value),
            (K = ne.onVnodeBeforeMount) && invokeVNodeHook(K, q, S)
        }
        ue && invokeDirectiveHook(S, null, q, "beforeMount");
        const he = needTransition(U, le);
        he && le.beforeEnter(Z),
            o(Z, R, O),
        ((K = ne && ne.onVnodeMounted) || he || ue) && queuePostRenderEffect(()=>{
                K && invokeVNodeHook(K, q, S),
                he && le.enter(Z),
                ue && invokeDirectiveHook(S, null, q, "mounted")
            }
            , U)
    }
        , T = (S,R,O,q,U)=>{
        if (O && _(S, O),
            q)
            for (let W = 0; W < q.length; W++)
                _(S, q[W]);
        if (U) {
            let W = U.subTree;
            if (R === W) {
                const ee = U.vnode;
                T(S, ee, ee.scopeId, ee.slotScopeIds, U.parent)
            }
        }
    }
        , D = (S,R,O,q,U,W,ee,G,Z=0)=>{
        for (let K = Z; K < S.length; K++) {
            const oe = S[K] = G ? cloneIfMounted(S[K]) : normalizeVNode(S[K]);
            E(null, oe, R, O, q, U, W, ee, G)
        }
    }
        , N = (S,R,O,q,U,W,ee)=>{
        const G = R.el = S.el;
        let {patchFlag: Z, dynamicChildren: K, dirs: oe} = R;
        Z |= S.patchFlag & 16;
        const ne = S.props || EMPTY_OBJ
            , ce = R.props || EMPTY_OBJ;
        let le;
        O && toggleRecurse(O, !1),
        (le = ce.onVnodeBeforeUpdate) && invokeVNodeHook(le, O, R, S),
        oe && invokeDirectiveHook(R, S, O, "beforeUpdate"),
        O && toggleRecurse(O, !0);
        const ue = U && R.type !== "foreignObject";
        if (K ? F(S.dynamicChildren, K, G, O, q, ue, W) : ee || ie(S, R, G, null, O, q, ue, W, !1),
        Z > 0) {
            if (Z & 16)
                k(G, R, ne, ce, O, q, U);
            else if (Z & 2 && ne.class !== ce.class && a(G, "class", null, ce.class, U),
            Z & 4 && a(G, "style", ne.style, ce.style, U),
            Z & 8) {
                const he = R.dynamicProps;
                for (let xe = 0; xe < he.length; xe++) {
                    const me = he[xe]
                        , ge = ne[me]
                        , _e = ce[me];
                    (_e !== ge || me === "value") && a(G, me, ge, _e, U, S.children, O, q, X)
                }
            }
            Z & 1 && S.children !== R.children && f(G, R.children)
        } else
            !ee && K == null && k(G, R, ne, ce, O, q, U);
        ((le = ce.onVnodeUpdated) || oe) && queuePostRenderEffect(()=>{
                le && invokeVNodeHook(le, O, R, S),
                oe && invokeDirectiveHook(R, S, O, "updated")
            }
            , q)
    }
        , F = (S,R,O,q,U,W,ee)=>{
        for (let G = 0; G < R.length; G++) {
            const Z = S[G]
                , K = R[G]
                , oe = Z.el && (Z.type === Fragment || !isSameVNodeType(Z, K) || Z.shapeFlag & 70) ? m(Z.el) : O;
            E(Z, K, oe, null, q, U, W, ee, !0)
        }
    }
        , k = (S,R,O,q,U,W,ee)=>{
        if (O !== q) {
            if (O !== EMPTY_OBJ)
                for (const G in O)
                    !isReservedProp(G) && !(G in q) && a(S, G, O[G], null, ee, R.children, U, W, X);
            for (const G in q) {
                if (isReservedProp(G))
                    continue;
                const Z = q[G]
                    , K = O[G];
                Z !== K && G !== "value" && a(S, G, K, Z, ee, R.children, U, W, X)
            }
            "value"in q && a(S, "value", O.value, q.value)
        }
    }
        , $ = (S,R,O,q,U,W,ee,G,Z)=>{
        const K = R.el = S ? S.el : l("")
            , oe = R.anchor = S ? S.anchor : l("");
        let {patchFlag: ne, dynamicChildren: ce, slotScopeIds: le} = R;
        le && (G = G ? G.concat(le) : le),
            S == null ? (o(K, O, q),
                o(oe, O, q),
                D(R.children, O, oe, U, W, ee, G, Z)) : ne > 0 && ne & 64 && ce && S.dynamicChildren ? (F(S.dynamicChildren, ce, O, U, W, ee, G),
            (R.key != null || U && R === U.subTree) && traverseStaticChildren(S, R, !0)) : ie(S, R, O, oe, U, W, ee, G, Z)
    }
        , M = (S,R,O,q,U,W,ee,G,Z)=>{
        R.slotScopeIds = G,
            S == null ? R.shapeFlag & 512 ? U.ctx.activate(R, O, q, ee, Z) : Q(R, O, q, U, W, ee, Z) : te(S, R, Z)
    }
        , Q = (S,R,O,q,U,W,ee)=>{
        const G = S.component = createComponentInstance(S, q, U);
        if (isKeepAlive(S) && (G.ctx.renderer = Y),
            setupComponent(G),
            G.asyncDep) {
            if (U && U.registerDep(G, J),
                !S.el) {
                const Z = G.subTree = createVNode(Comment);
                w(null, Z, R, O)
            }
            return
        }
        J(G, S, R, O, U, W, ee)
    }
        , te = (S,R,O)=>{
        const q = R.component = S.component;
        if (shouldUpdateComponent(S, R, O))
            if (q.asyncDep && !q.asyncResolved) {
                ae(q, R, O);
                return
            } else
                q.next = R,
                    invalidateJob(q.update),
                    q.update();
        else
            R.el = S.el,
                q.vnode = R
    }
        , J = (S,R,O,q,U,W,ee)=>{
        const G = ()=>{
            if (S.isMounted) {
                let {next: oe, bu: ne, u: ce, parent: le, vnode: ue} = S, he = oe, xe;
                toggleRecurse(S, !1),
                    oe ? (oe.el = ue.el,
                        ae(S, oe, ee)) : oe = ue,
                ne && invokeArrayFns(ne),
                (xe = oe.props && oe.props.onVnodeBeforeUpdate) && invokeVNodeHook(xe, le, oe, ue),
                    toggleRecurse(S, !0);
                const me = renderComponentRoot(S)
                    , ge = S.subTree;
                S.subTree = me,
                    E(ge, me, m(ge.el), L(ge), S, U, W),
                    oe.el = me.el,
                he === null && updateHOCHostEl(S, me.el),
                ce && queuePostRenderEffect(ce, U),
                (xe = oe.props && oe.props.onVnodeUpdated) && queuePostRenderEffect(()=>invokeVNodeHook(xe, le, oe, ue), U)
            } else {
                let oe;
                const {el: ne, props: ce} = R
                    , {bm: le, m: ue, parent: he} = S
                    , xe = isAsyncWrapper(R);
                if (toggleRecurse(S, !1),
                le && invokeArrayFns(le),
                !xe && (oe = ce && ce.onVnodeBeforeMount) && invokeVNodeHook(oe, he, R),
                    toggleRecurse(S, !0),
                ne && pe) {
                    const me = ()=>{
                            S.subTree = renderComponentRoot(S),
                                pe(ne, S.subTree, S, U, null)
                        }
                    ;
                    xe ? R.type.__asyncLoader().then(()=>!S.isUnmounted && me()) : me()
                } else {
                    const me = S.subTree = renderComponentRoot(S);
                    E(null, me, O, q, S, U, W),
                        R.el = me.el
                }
                if (ue && queuePostRenderEffect(ue, U),
                !xe && (oe = ce && ce.onVnodeMounted)) {
                    const me = R;
                    queuePostRenderEffect(()=>invokeVNodeHook(oe, he, me), U)
                }
                (R.shapeFlag & 256 || he && isAsyncWrapper(he.vnode) && he.vnode.shapeFlag & 256) && S.a && queuePostRenderEffect(S.a, U),
                    S.isMounted = !0,
                    R = O = q = null
            }
        }
            , Z = S.effect = new ReactiveEffect(G,()=>queueJob(K),S.scope)
            , K = S.update = ()=>Z.run();
        K.id = S.uid,
            toggleRecurse(S, !0),
            K()
    }
        , ae = (S,R,O)=>{
        R.component = S;
        const q = S.vnode.props;
        S.vnode = R,
            S.next = null,
            updateProps(S, R.props, q, O),
            updateSlots(S, R.children, O),
            pauseTracking(),
            flushPreFlushCbs(S),
            resetTracking()
    }
        , ie = (S,R,O,q,U,W,ee,G,Z=!1)=>{
        const K = S && S.children
            , oe = S ? S.shapeFlag : 0
            , ne = R.children
            , {patchFlag: ce, shapeFlag: le} = R;
        if (ce > 0) {
            if (ce & 128) {
                de(K, ne, O, q, U, W, ee, G, Z);
                return
            } else if (ce & 256) {
                fe(K, ne, O, q, U, W, ee, G, Z);
                return
            }
        }
        le & 8 ? (oe & 16 && X(K, U, W),
        ne !== K && f(O, ne)) : oe & 16 ? le & 16 ? de(K, ne, O, q, U, W, ee, G, Z) : X(K, U, W, !0) : (oe & 8 && f(O, ""),
        le & 16 && D(ne, O, q, U, W, ee, G, Z))
    }
        , fe = (S,R,O,q,U,W,ee,G,Z)=>{
        S = S || EMPTY_ARR,
            R = R || EMPTY_ARR;
        const K = S.length
            , oe = R.length
            , ne = Math.min(K, oe);
        let ce;
        for (ce = 0; ce < ne; ce++) {
            const le = R[ce] = Z ? cloneIfMounted(R[ce]) : normalizeVNode(R[ce]);
            E(S[ce], le, O, null, U, W, ee, G, Z)
        }
        K > oe ? X(S, U, W, !0, !1, ne) : D(R, O, q, U, W, ee, G, Z, ne)
    }
        , de = (S,R,O,q,U,W,ee,G,Z)=>{
        let K = 0;
        const oe = R.length;
        let ne = S.length - 1
            , ce = oe - 1;
        for (; K <= ne && K <= ce; ) {
            const le = S[K]
                , ue = R[K] = Z ? cloneIfMounted(R[K]) : normalizeVNode(R[K]);
            if (isSameVNodeType(le, ue))
                E(le, ue, O, null, U, W, ee, G, Z);
            else
                break;
            K++
        }
        for (; K <= ne && K <= ce; ) {
            const le = S[ne]
                , ue = R[ce] = Z ? cloneIfMounted(R[ce]) : normalizeVNode(R[ce]);
            if (isSameVNodeType(le, ue))
                E(le, ue, O, null, U, W, ee, G, Z);
            else
                break;
            ne--,
                ce--
        }
        if (K > ne) {
            if (K <= ce) {
                const le = ce + 1
                    , ue = le < oe ? R[le].el : q;
                for (; K <= ce; )
                    E(null, R[K] = Z ? cloneIfMounted(R[K]) : normalizeVNode(R[K]), O, ue, U, W, ee, G, Z),
                        K++
            }
        } else if (K > ce)
            for (; K <= ne; )
                V(S[K], U, W, !0),
                    K++;
        else {
            const le = K
                , ue = K
                , he = new Map;
            for (K = ue; K <= ce; K++) {
                const ve = R[K] = Z ? cloneIfMounted(R[K]) : normalizeVNode(R[K]);
                ve.key != null && he.set(ve.key, K)
            }
            let xe, me = 0;
            const ge = ce - ue + 1;
            let _e = !1
                , be = 0;
            const Ae = new Array(ge);
            for (K = 0; K < ge; K++)
                Ae[K] = 0;
            for (K = le; K <= ne; K++) {
                const ve = S[K];
                if (me >= ge) {
                    V(ve, U, W, !0);
                    continue
                }
                let Ee;
                if (ve.key != null)
                    Ee = he.get(ve.key);
                else
                    for (xe = ue; xe <= ce; xe++)
                        if (Ae[xe - ue] === 0 && isSameVNodeType(ve, R[xe])) {
                            Ee = xe;
                            break
                        }
                Ee === void 0 ? V(ve, U, W, !0) : (Ae[Ee - ue] = K + 1,
                    Ee >= be ? be = Ee : _e = !0,
                    E(ve, R[Ee], O, null, U, W, ee, G, Z),
                    me++)
            }
            const we = _e ? getSequence(Ae) : EMPTY_ARR;
            for (xe = we.length - 1,
                     K = ge - 1; K >= 0; K--) {
                const ve = ue + K
                    , Ee = R[ve]
                    , Be = ve + 1 < oe ? R[ve + 1].el : q;
                Ae[K] === 0 ? E(null, Ee, O, Be, U, W, ee, G, Z) : _e && (xe < 0 || K !== we[xe] ? z(Ee, O, Be, 2) : xe--)
            }
        }
    }
        , z = (S,R,O,q,U=null)=>{
        const {el: W, type: ee, transition: G, children: Z, shapeFlag: K} = S;
        if (K & 6) {
            z(S.component.subTree, R, O, q);
            return
        }
        if (K & 128) {
            S.suspense.move(R, O, q);
            return
        }
        if (K & 64) {
            ee.move(S, R, O, Y);
            return
        }
        if (ee === Fragment) {
            o(W, R, O);
            for (let ne = 0; ne < Z.length; ne++)
                z(Z[ne], R, O, q);
            o(S.anchor, R, O);
            return
        }
        if (ee === Static) {
            A(S, R, O);
            return
        }
        if (q !== 2 && K & 1 && G)
            if (q === 0)
                G.beforeEnter(W),
                    o(W, R, O),
                    queuePostRenderEffect(()=>G.enter(W), U);
            else {
                const {leave: ne, delayLeave: ce, afterLeave: le} = G
                    , ue = ()=>o(W, R, O)
                    , he = ()=>{
                        ne(W, ()=>{
                                ue(),
                                le && le()
                            }
                        )
                    }
                ;
                ce ? ce(W, ue, he) : he()
            }
        else
            o(W, R, O)
    }
        , V = (S,R,O,q=!1,U=!1)=>{
        const {type: W, props: ee, ref: G, children: Z, dynamicChildren: K, shapeFlag: oe, patchFlag: ne, dirs: ce} = S;
        if (G != null && setRef(G, null, O, S, !0),
        oe & 256) {
            R.ctx.deactivate(S);
            return
        }
        const le = oe & 1 && ce
            , ue = !isAsyncWrapper(S);
        let he;
        if (ue && (he = ee && ee.onVnodeBeforeUnmount) && invokeVNodeHook(he, R, S),
        oe & 6)
            re(S.component, O, q);
        else {
            if (oe & 128) {
                S.suspense.unmount(O, q);
                return
            }
            le && invokeDirectiveHook(S, null, R, "beforeUnmount"),
                oe & 64 ? S.type.remove(S, R, O, U, Y, q) : K && (W !== Fragment || ne > 0 && ne & 64) ? X(K, R, O, !1, !0) : (W === Fragment && ne & 384 || !U && oe & 16) && X(Z, R, O),
            q && H(S)
        }
        (ue && (he = ee && ee.onVnodeUnmounted) || le) && queuePostRenderEffect(()=>{
                he && invokeVNodeHook(he, R, S),
                le && invokeDirectiveHook(S, null, R, "unmounted")
            }
            , O)
    }
        , H = S=>{
        const {type: R, el: O, anchor: q, transition: U} = S;
        if (R === Fragment) {
            I(O, q);
            return
        }
        if (R === Static) {
            C(S);
            return
        }
        const W = ()=>{
                s(O),
                U && !U.persisted && U.afterLeave && U.afterLeave()
            }
        ;
        if (S.shapeFlag & 1 && U && !U.persisted) {
            const {leave: ee, delayLeave: G} = U
                , Z = ()=>ee(O, W);
            G ? G(S.el, W, Z) : Z()
        } else
            W()
    }
        , I = (S,R)=>{
        let O;
        for (; S !== R; )
            O = x(S),
                s(S),
                S = O;
        s(R)
    }
        , re = (S,R,O)=>{
        const {bum: q, scope: U, update: W, subTree: ee, um: G} = S;
        q && invokeArrayFns(q),
            U.stop(),
        W && (W.active = !1,
            V(ee, S, R, O)),
        G && queuePostRenderEffect(G, R),
            queuePostRenderEffect(()=>{
                    S.isUnmounted = !0
                }
                , R),
        R && R.pendingBranch && !R.isUnmounted && S.asyncDep && !S.asyncResolved && S.suspenseId === R.pendingId && (R.deps--,
        R.deps === 0 && R.resolve())
    }
        , X = (S,R,O,q=!1,U=!1,W=0)=>{
        for (let ee = W; ee < S.length; ee++)
            V(S[ee], R, O, q, U)
    }
        , L = S=>S.shapeFlag & 6 ? L(S.component.subTree) : S.shapeFlag & 128 ? S.suspense.next() : x(S.anchor || S.el)
        , j = (S,R,O)=>{
        S == null ? R._vnode && V(R._vnode, null, null, !0) : E(R._vnode || null, S, R, null, null, null, O),
            flushPreFlushCbs(),
            flushPostFlushCbs(),
            R._vnode = S
    }
        , Y = {
        p: E,
        um: V,
        m: z,
        r: H,
        mt: Q,
        mc: D,
        pc: ie,
        pbc: F,
        n: L,
        o: e
    };
    let se, pe;
    return r && ([se,pe] = r(Y)),
        {
            render: j,
            hydrate: se,
            createApp: createAppAPI(j, se)
        }
}
function toggleRecurse({effect: e, update: r}, n) {
    e.allowRecurse = r.allowRecurse = n
}
function needTransition(e, r) {
    return (!e || e && !e.pendingBranch) && r && !r.persisted
}
function traverseStaticChildren(e, r, n=!1) {
    const o = e.children
        , s = r.children;
    if (isArray$2(o) && isArray$2(s))
        for (let a = 0; a < o.length; a++) {
            const c = o[a];
            let l = s[a];
            l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = s[a] = cloneIfMounted(s[a]),
                l.el = c.el),
            n || traverseStaticChildren(c, l)),
            l.type === Text && (l.el = c.el)
        }
}
function getSequence(e) {
    const r = e.slice()
        , n = [0];
    let o, s, a, c, l;
    const d = e.length;
    for (o = 0; o < d; o++) {
        const u = e[o];
        if (u !== 0) {
            if (s = n[n.length - 1],
            e[s] < u) {
                r[o] = s,
                    n.push(o);
                continue
            }
            for (a = 0,
                     c = n.length - 1; a < c; )
                l = a + c >> 1,
                    e[n[l]] < u ? a = l + 1 : c = l;
            u < e[n[a]] && (a > 0 && (r[o] = n[a - 1]),
                n[a] = o)
        }
    }
    for (a = n.length,
             c = n[a - 1]; a-- > 0; )
        n[a] = c,
            c = r[c];
    return n
}
const isTeleport = e=>e.__isTeleport
    , isTeleportDisabled = e=>e && (e.disabled || e.disabled === "")
    , isTargetSVG = e=>typeof SVGElement < "u" && e instanceof SVGElement
    , resolveTarget = (e,r)=>{
    const n = e && e.to;
    return isString$1(n) ? r ? r(n) : null : n
}
    , TeleportImpl = {
    name: "Teleport",
    __isTeleport: !0,
    process(e, r, n, o, s, a, c, l, d, u) {
        const {mc: f, pc: m, pbc: x, o: {insert: _, querySelector: g, createText: E, createComment: b}} = u
            , w = isTeleportDisabled(r.props);
        let {shapeFlag: y, children: A, dynamicChildren: C} = r;
        if (e == null) {
            const B = r.el = E("")
                , P = r.anchor = E("");
            _(B, n, o),
                _(P, n, o);
            const T = r.target = resolveTarget(r.props, g)
                , D = r.targetAnchor = E("");
            T && (_(D, T),
                c = c || isTargetSVG(T));
            const N = (F,k)=>{
                    y & 16 && f(A, F, k, s, a, c, l, d)
                }
            ;
            w ? N(n, P) : T && N(T, D)
        } else {
            r.el = e.el;
            const B = r.anchor = e.anchor
                , P = r.target = e.target
                , T = r.targetAnchor = e.targetAnchor
                , D = isTeleportDisabled(e.props)
                , N = D ? n : P
                , F = D ? B : T;
            if (c = c || isTargetSVG(P),
                C ? (x(e.dynamicChildren, C, N, s, a, c, l),
                    traverseStaticChildren(e, r, !0)) : d || m(e, r, N, F, s, a, c, l, !1),
                w)
                D ? r.props && e.props && r.props.to !== e.props.to && (r.props.to = e.props.to) : moveTeleport(r, n, B, u, 1);
            else if ((r.props && r.props.to) !== (e.props && e.props.to)) {
                const k = r.target = resolveTarget(r.props, g);
                k && moveTeleport(r, k, null, u, 0)
            } else
                D && moveTeleport(r, P, T, u, 1)
        }
        updateCssVars(r)
    },
    remove(e, r, n, o, {um: s, o: {remove: a}}, c) {
        const {shapeFlag: l, children: d, anchor: u, targetAnchor: f, target: m, props: x} = e;
        if (m && a(f),
        c && a(u),
        l & 16) {
            const _ = c || !isTeleportDisabled(x);
            for (let g = 0; g < d.length; g++) {
                const E = d[g];
                s(E, r, n, _, !!E.dynamicChildren)
            }
        }
    },
    move: moveTeleport,
    hydrate: hydrateTeleport
};
function moveTeleport(e, r, n, {o: {insert: o}, m: s}, a=2) {
    a === 0 && o(e.targetAnchor, r, n);
    const {el: c, anchor: l, shapeFlag: d, children: u, props: f} = e
        , m = a === 2;
    if (m && o(c, r, n),
    (!m || isTeleportDisabled(f)) && d & 16)
        for (let x = 0; x < u.length; x++)
            s(u[x], r, n, 2);
    m && o(l, r, n)
}
function hydrateTeleport(e, r, n, o, s, a, {o: {nextSibling: c, parentNode: l, querySelector: d}}, u) {
    const f = r.target = resolveTarget(r.props, d);
    if (f) {
        const m = f._lpa || f.firstChild;
        if (r.shapeFlag & 16)
            if (isTeleportDisabled(r.props))
                r.anchor = u(c(e), r, l(e), n, o, s, a),
                    r.targetAnchor = m;
            else {
                r.anchor = c(e);
                let x = m;
                for (; x; )
                    if (x = c(x),
                    x && x.nodeType === 8 && x.data === "teleport anchor") {
                        r.targetAnchor = x,
                            f._lpa = r.targetAnchor && c(r.targetAnchor);
                        break
                    }
                u(m, r, f, n, o, s, a)
            }
        updateCssVars(r)
    }
    return r.anchor && c(r.anchor)
}
const Teleport = TeleportImpl;
function updateCssVars(e) {
    const r = e.ctx;
    if (r && r.ut) {
        let n = e.children[0].el;
        for (; n && n !== e.targetAnchor; )
            n.nodeType === 1 && n.setAttribute("data-v-owner", r.uid),
                n = n.nextSibling;
        r.ut()
    }
}
const Fragment = Symbol.for("v-fgt")
    , Text = Symbol.for("v-txt")
    , Comment = Symbol.for("v-cmt")
    , Static = Symbol.for("v-stc")
    , blockStack = [];
let currentBlock = null;
function openBlock(e=!1) {
    blockStack.push(currentBlock = e ? null : [])
}
function closeBlock() {
    blockStack.pop(),
        currentBlock = blockStack[blockStack.length - 1] || null
}
let isBlockTreeEnabled = 1;
function setBlockTracking(e) {
    isBlockTreeEnabled += e
}
function setupBlock(e) {
    return e.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null,
        closeBlock(),
    isBlockTreeEnabled > 0 && currentBlock && currentBlock.push(e),
        e
}
function createElementBlock(e, r, n, o, s, a) {
    return setupBlock(createBaseVNode(e, r, n, o, s, a, !0))
}
function createBlock(e, r, n, o, s) {
    return setupBlock(createVNode(e, r, n, o, s, !0))
}
function isVNode(e) {
    return e ? e.__v_isVNode === !0 : !1
}
function isSameVNodeType(e, r) {
    return e.type === r.type && e.key === r.key
}
const InternalObjectKey = "__vInternal"
    , normalizeKey = ({key: e})=>e != null ? e : null
    , normalizeRef = ({ref: e, ref_key: r, ref_for: n})=>(typeof e == "number" && (e = "" + e),
    e != null ? isString$1(e) || isRef(e) || isFunction$2(e) ? {
        i: currentRenderingInstance,
        r: e,
        k: r,
        f: !!n
    } : e : null);
function createBaseVNode(e, r=null, n=null, o=0, s=null, a=e === Fragment ? 0 : 1, c=!1, l=!1) {
    const d = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e,
        props: r,
        key: r && normalizeKey(r),
        ref: r && normalizeRef(r),
        scopeId: currentScopeId,
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
        shapeFlag: a,
        patchFlag: o,
        dynamicProps: s,
        dynamicChildren: null,
        appContext: null,
        ctx: currentRenderingInstance
    };
    return l ? (normalizeChildren(d, n),
    a & 128 && e.normalize(d)) : n && (d.shapeFlag |= isString$1(n) ? 8 : 16),
    isBlockTreeEnabled > 0 && !c && currentBlock && (d.patchFlag > 0 || a & 6) && d.patchFlag !== 32 && currentBlock.push(d),
        d
}
const createVNode = _createVNode;
function _createVNode(e, r=null, n=null, o=0, s=null, a=!1) {
    if ((!e || e === NULL_DYNAMIC_COMPONENT) && (e = Comment),
        isVNode(e)) {
        const l = cloneVNode(e, r, !0);
        return n && normalizeChildren(l, n),
        isBlockTreeEnabled > 0 && !a && currentBlock && (l.shapeFlag & 6 ? currentBlock[currentBlock.indexOf(e)] = l : currentBlock.push(l)),
            l.patchFlag |= -2,
            l
    }
    if (isClassComponent(e) && (e = e.__vccOpts),
        r) {
        r = guardReactiveProps(r);
        let {class: l, style: d} = r;
        l && !isString$1(l) && (r.class = normalizeClass(l)),
        isObject$2(d) && (isProxy(d) && !isArray$2(d) && (d = extend$2({}, d)),
            r.style = normalizeStyle(d))
    }
    const c = isString$1(e) ? 1 : isSuspense(e) ? 128 : isTeleport(e) ? 64 : isObject$2(e) ? 4 : isFunction$2(e) ? 2 : 0;
    return createBaseVNode(e, r, n, o, s, c, a, !0)
}
function guardReactiveProps(e) {
    return e ? isProxy(e) || InternalObjectKey in e ? extend$2({}, e) : e : null
}
function cloneVNode(e, r, n=!1) {
    const {props: o, ref: s, patchFlag: a, children: c} = e
        , l = r ? mergeProps(o || {}, r) : o;
    return {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e.type,
        props: l,
        key: l && normalizeKey(l),
        ref: r && r.ref ? n && s ? isArray$2(s) ? s.concat(normalizeRef(r)) : [s, normalizeRef(r)] : normalizeRef(r) : s,
        scopeId: e.scopeId,
        slotScopeIds: e.slotScopeIds,
        children: c,
        target: e.target,
        targetAnchor: e.targetAnchor,
        staticCount: e.staticCount,
        shapeFlag: e.shapeFlag,
        patchFlag: r && e.type !== Fragment ? a === -1 ? 16 : a | 16 : a,
        dynamicProps: e.dynamicProps,
        dynamicChildren: e.dynamicChildren,
        appContext: e.appContext,
        dirs: e.dirs,
        transition: e.transition,
        component: e.component,
        suspense: e.suspense,
        ssContent: e.ssContent && cloneVNode(e.ssContent),
        ssFallback: e.ssFallback && cloneVNode(e.ssFallback),
        el: e.el,
        anchor: e.anchor,
        ctx: e.ctx,
        ce: e.ce
    }
}
function createTextVNode(e=" ", r=0) {
    return createVNode(Text, null, e, r)
}
function createStaticVNode(e, r) {
    const n = createVNode(Static, null, e);
    return n.staticCount = r,
        n
}
function createCommentVNode(e="", r=!1) {
    return r ? (openBlock(),
        createBlock(Comment, null, e)) : createVNode(Comment, null, e)
}
function normalizeVNode(e) {
    return e == null || typeof e == "boolean" ? createVNode(Comment) : isArray$2(e) ? createVNode(Fragment, null, e.slice()) : typeof e == "object" ? cloneIfMounted(e) : createVNode(Text, null, String(e))
}
function cloneIfMounted(e) {
    return e.el === null && e.patchFlag !== -1 || e.memo ? e : cloneVNode(e)
}
function normalizeChildren(e, r) {
    let n = 0;
    const {shapeFlag: o} = e;
    if (r == null)
        r = null;
    else if (isArray$2(r))
        n = 16;
    else if (typeof r == "object")
        if (o & 65) {
            const s = r.default;
            s && (s._c && (s._d = !1),
                normalizeChildren(e, s()),
            s._c && (s._d = !0));
            return
        } else {
            n = 32;
            const s = r._;
            !s && !(InternalObjectKey in r) ? r._ctx = currentRenderingInstance : s === 3 && currentRenderingInstance && (currentRenderingInstance.slots._ === 1 ? r._ = 1 : (r._ = 2,
                e.patchFlag |= 1024))
        }
    else
        isFunction$2(r) ? (r = {
            default: r,
            _ctx: currentRenderingInstance
        },
            n = 32) : (r = String(r),
            o & 64 ? (n = 16,
                r = [createTextVNode(r)]) : n = 8);
    e.children = r,
        e.shapeFlag |= n
}
function mergeProps(...e) {
    const r = {};
    for (let n = 0; n < e.length; n++) {
        const o = e[n];
        for (const s in o)
            if (s === "class")
                r.class !== o.class && (r.class = normalizeClass([r.class, o.class]));
            else if (s === "style")
                r.style = normalizeStyle([r.style, o.style]);
            else if (isOn(s)) {
                const a = r[s]
                    , c = o[s];
                c && a !== c && !(isArray$2(a) && a.includes(c)) && (r[s] = a ? [].concat(a, c) : c)
            } else
                s !== "" && (r[s] = o[s])
    }
    return r
}
function invokeVNodeHook(e, r, n, o=null) {
    callWithAsyncErrorHandling(e, r, 7, [n, o])
}
const emptyAppContext = createAppContext();
let uid = 0;
function createComponentInstance(e, r, n) {
    const o = e.type
        , s = (r ? r.appContext : e.appContext) || emptyAppContext
        , a = {
        uid: uid++,
        vnode: e,
        type: o,
        parent: r,
        appContext: s,
        root: null,
        next: null,
        subTree: null,
        effect: null,
        update: null,
        scope: new EffectScope(!0),
        render: null,
        proxy: null,
        exposed: null,
        exposeProxy: null,
        withProxy: null,
        provides: r ? r.provides : Object.create(s.provides),
        accessCache: null,
        renderCache: [],
        components: null,
        directives: null,
        propsOptions: normalizePropsOptions(o, s),
        emitsOptions: normalizeEmitsOptions(o, s),
        emit: null,
        emitted: null,
        propsDefaults: EMPTY_OBJ,
        inheritAttrs: o.inheritAttrs,
        ctx: EMPTY_OBJ,
        data: EMPTY_OBJ,
        props: EMPTY_OBJ,
        attrs: EMPTY_OBJ,
        slots: EMPTY_OBJ,
        refs: EMPTY_OBJ,
        setupState: EMPTY_OBJ,
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
        sp: null
    };
    return a.ctx = {
        _: a
    },
        a.root = r ? r.root : a,
        a.emit = emit.bind(null, a),
    e.ce && e.ce(a),
        a
}
let currentInstance = null;
const getCurrentInstance = ()=>currentInstance || currentRenderingInstance;
let internalSetCurrentInstance, globalCurrentInstanceSetters, settersKey = "__VUE_INSTANCE_SETTERS__";
(globalCurrentInstanceSetters = getGlobalThis()[settersKey]) || (globalCurrentInstanceSetters = getGlobalThis()[settersKey] = []),
    globalCurrentInstanceSetters.push(e=>currentInstance = e),
    internalSetCurrentInstance = e=>{
        globalCurrentInstanceSetters.length > 1 ? globalCurrentInstanceSetters.forEach(r=>r(e)) : globalCurrentInstanceSetters[0](e)
    }
;
const setCurrentInstance = e=>{
        internalSetCurrentInstance(e),
            e.scope.on()
    }
    , unsetCurrentInstance = ()=>{
        currentInstance && currentInstance.scope.off(),
            internalSetCurrentInstance(null)
    }
;
function isStatefulComponent(e) {
    return e.vnode.shapeFlag & 4
}
let isInSSRComponentSetup = !1;
function setupComponent(e, r=!1) {
    isInSSRComponentSetup = r;
    const {props: n, children: o} = e.vnode
        , s = isStatefulComponent(e);
    initProps(e, n, s, r),
        initSlots(e, o);
    const a = s ? setupStatefulComponent(e, r) : void 0;
    return isInSSRComponentSetup = !1,
        a
}
function setupStatefulComponent(e, r) {
    const n = e.type;
    e.accessCache = Object.create(null),
        e.proxy = markRaw(new Proxy(e.ctx,PublicInstanceProxyHandlers));
    const {setup: o} = n;
    if (o) {
        const s = e.setupContext = o.length > 1 ? createSetupContext(e) : null;
        setCurrentInstance(e),
            pauseTracking();
        const a = callWithErrorHandling(o, e, 0, [e.props, s]);
        if (resetTracking(),
            unsetCurrentInstance(),
            isPromise$1(a)) {
            if (a.then(unsetCurrentInstance, unsetCurrentInstance),
                r)
                return a.then(c=>{
                        handleSetupResult(e, c, r)
                    }
                ).catch(c=>{
                        handleError(c, e, 0)
                    }
                );
            e.asyncDep = a
        } else
            handleSetupResult(e, a, r)
    } else
        finishComponentSetup(e, r)
}
function handleSetupResult(e, r, n) {
    isFunction$2(r) ? e.type.__ssrInlineRender ? e.ssrRender = r : e.render = r : isObject$2(r) && (e.setupState = proxyRefs(r)),
        finishComponentSetup(e, n)
}
let compile;
function finishComponentSetup(e, r, n) {
    const o = e.type;
    if (!e.render) {
        if (!r && compile && !o.render) {
            const s = o.template || resolveMergedOptions(e).template;
            if (s) {
                const {isCustomElement: a, compilerOptions: c} = e.appContext.config
                    , {delimiters: l, compilerOptions: d} = o
                    , u = extend$2(extend$2({
                    isCustomElement: a,
                    delimiters: l
                }, c), d);
                o.render = compile(s, u)
            }
        }
        e.render = o.render || NOOP
    }
    {
        setCurrentInstance(e),
            pauseTracking();
        try {
            applyOptions(e)
        } finally {
            resetTracking(),
                unsetCurrentInstance()
        }
    }
}
function getAttrsProxy(e) {
    return e.attrsProxy || (e.attrsProxy = new Proxy(e.attrs,{
        get(r, n) {
            return track(e, "get", "$attrs"),
                r[n]
        }
    }))
}
function createSetupContext(e) {
    const r = n=>{
            e.exposed = n || {}
        }
    ;
    return {
        get attrs() {
            return getAttrsProxy(e)
        },
        slots: e.slots,
        emit: e.emit,
        expose: r
    }
}
function getExposeProxy(e) {
    if (e.exposed)
        return e.exposeProxy || (e.exposeProxy = new Proxy(proxyRefs(markRaw(e.exposed)),{
            get(r, n) {
                if (n in r)
                    return r[n];
                if (n in publicPropertiesMap)
                    return publicPropertiesMap[n](e)
            },
            has(r, n) {
                return n in r || n in publicPropertiesMap
            }
        }))
}
function getComponentName(e, r=!0) {
    return isFunction$2(e) ? e.displayName || e.name : e.name || r && e.__name
}
function isClassComponent(e) {
    return isFunction$2(e) && "__vccOpts"in e
}
const computed = (e,r)=>computed$1(e, r, isInSSRComponentSetup);
function h(e, r, n) {
    const o = arguments.length;
    return o === 2 ? isObject$2(r) && !isArray$2(r) ? isVNode(r) ? createVNode(e, null, [r]) : createVNode(e, r) : createVNode(e, null, r) : (o > 3 ? n = Array.prototype.slice.call(arguments, 2) : o === 3 && isVNode(n) && (n = [n]),
        createVNode(e, r, n))
}
const ssrContextKey = Symbol.for("v-scx")
    , useSSRContext = ()=>inject(ssrContextKey)
    , version = "3.3.12"
    , svgNS = "http://www.w3.org/2000/svg"
    , doc = typeof document < "u" ? document : null
    , templateContainer = doc && doc.createElement("template")
    , nodeOps = {
    insert: (e,r,n)=>{
        r.insertBefore(e, n || null)
    }
    ,
    remove: e=>{
        const r = e.parentNode;
        r && r.removeChild(e)
    }
    ,
    createElement: (e,r,n,o)=>{
        const s = r ? doc.createElementNS(svgNS, e) : doc.createElement(e, n ? {
            is: n
        } : void 0);
        return e === "select" && o && o.multiple != null && s.setAttribute("multiple", o.multiple),
            s
    }
    ,
    createText: e=>doc.createTextNode(e),
    createComment: e=>doc.createComment(e),
    setText: (e,r)=>{
        e.nodeValue = r
    }
    ,
    setElementText: (e,r)=>{
        e.textContent = r
    }
    ,
    parentNode: e=>e.parentNode,
    nextSibling: e=>e.nextSibling,
    querySelector: e=>doc.querySelector(e),
    setScopeId(e, r) {
        e.setAttribute(r, "")
    },
    insertStaticContent(e, r, n, o, s, a) {
        const c = n ? n.previousSibling : r.lastChild;
        if (s && (s === a || s.nextSibling))
            for (; r.insertBefore(s.cloneNode(!0), n),
                       !(s === a || !(s = s.nextSibling)); )
                ;
        else {
            templateContainer.innerHTML = o ? "<svg>".concat(e, "</svg>") : e;
            const l = templateContainer.content;
            if (o) {
                const d = l.firstChild;
                for (; d.firstChild; )
                    l.appendChild(d.firstChild);
                l.removeChild(d)
            }
            r.insertBefore(l, n)
        }
        return [c ? c.nextSibling : r.firstChild, n ? n.previousSibling : r.lastChild]
    }
}
    , TRANSITION = "transition"
    , ANIMATION = "animation"
    , vtcKey = Symbol("_vtc")
    , Transition = (e,{slots: r})=>h(BaseTransition, resolveTransitionProps(e), r);
Transition.displayName = "Transition";
const DOMTransitionPropsValidators = {
    name: String,
    type: String,
    css: {
        type: Boolean,
        default: !0
    },
    duration: [String, Number, Object],
    enterFromClass: String,
    enterActiveClass: String,
    enterToClass: String,
    appearFromClass: String,
    appearActiveClass: String,
    appearToClass: String,
    leaveFromClass: String,
    leaveActiveClass: String,
    leaveToClass: String
};
Transition.props = extend$2({}, BaseTransitionPropsValidators, DOMTransitionPropsValidators);
const callHook = (e,r=[])=>{
    isArray$2(e) ? e.forEach(n=>n(...r)) : e && e(...r)
}
    , hasExplicitCallback = e=>e ? isArray$2(e) ? e.some(r=>r.length > 1) : e.length > 1 : !1;
function resolveTransitionProps(e) {
    const r = {};
    for (const $ in e)
        $ in DOMTransitionPropsValidators || (r[$] = e[$]);
    if (e.css === !1)
        return r;
    const {name: n="v", type: o, duration: s, enterFromClass: a="".concat(n, "-enter-from"), enterActiveClass: c="".concat(n, "-enter-active"), enterToClass: l="".concat(n, "-enter-to"), appearFromClass: d=a, appearActiveClass: u=c, appearToClass: f=l, leaveFromClass: m="".concat(n, "-leave-from"), leaveActiveClass: x="".concat(n, "-leave-active"), leaveToClass: _="".concat(n, "-leave-to")} = e
        , g = normalizeDuration(s)
        , E = g && g[0]
        , b = g && g[1]
        , {onBeforeEnter: w, onEnter: y, onEnterCancelled: A, onLeave: C, onLeaveCancelled: B, onBeforeAppear: P=w, onAppear: T=y, onAppearCancelled: D=A} = r
        , N = ($,M,Q)=>{
            removeTransitionClass($, M ? f : l),
                removeTransitionClass($, M ? u : c),
            Q && Q()
        }
        , F = ($,M)=>{
            $._isLeaving = !1,
                removeTransitionClass($, m),
                removeTransitionClass($, _),
                removeTransitionClass($, x),
            M && M()
        }
        , k = $=>(M,Q)=>{
            const te = $ ? T : y
                , J = ()=>N(M, $, Q);
            callHook(te, [M, J]),
                nextFrame(()=>{
                        removeTransitionClass(M, $ ? d : a),
                            addTransitionClass(M, $ ? f : l),
                        hasExplicitCallback(te) || whenTransitionEnds(M, o, E, J)
                    }
                )
        }
    ;
    return extend$2(r, {
        onBeforeEnter($) {
            callHook(w, [$]),
                addTransitionClass($, a),
                addTransitionClass($, c)
        },
        onBeforeAppear($) {
            callHook(P, [$]),
                addTransitionClass($, d),
                addTransitionClass($, u)
        },
        onEnter: k(!1),
        onAppear: k(!0),
        onLeave($, M) {
            $._isLeaving = !0;
            const Q = ()=>F($, M);
            addTransitionClass($, m),
                forceReflow(),
                addTransitionClass($, x),
                nextFrame(()=>{
                        $._isLeaving && (removeTransitionClass($, m),
                            addTransitionClass($, _),
                        hasExplicitCallback(C) || whenTransitionEnds($, o, b, Q))
                    }
                ),
                callHook(C, [$, Q])
        },
        onEnterCancelled($) {
            N($, !1),
                callHook(A, [$])
        },
        onAppearCancelled($) {
            N($, !0),
                callHook(D, [$])
        },
        onLeaveCancelled($) {
            F($),
                callHook(B, [$])
        }
    })
}
function normalizeDuration(e) {
    if (e == null)
        return null;
    if (isObject$2(e))
        return [NumberOf(e.enter), NumberOf(e.leave)];
    {
        const r = NumberOf(e);
        return [r, r]
    }
}
function NumberOf(e) {
    return toNumber(e)
}
function addTransitionClass(e, r) {
    r.split(/\s+/).forEach(n=>n && e.classList.add(n)),
        (e[vtcKey] || (e[vtcKey] = new Set)).add(r)
}
function removeTransitionClass(e, r) {
    r.split(/\s+/).forEach(o=>o && e.classList.remove(o));
    const n = e[vtcKey];
    n && (n.delete(r),
    n.size || (e[vtcKey] = void 0))
}
function nextFrame(e) {
    requestAnimationFrame(()=>{
            requestAnimationFrame(e)
        }
    )
}
let endId = 0;
function whenTransitionEnds(e, r, n, o) {
    const s = e._endId = ++endId
        , a = ()=>{
            s === e._endId && o()
        }
    ;
    if (n)
        return setTimeout(a, n);
    const {type: c, timeout: l, propCount: d} = getTransitionInfo(e, r);
    if (!c)
        return o();
    const u = c + "end";
    let f = 0;
    const m = ()=>{
            e.removeEventListener(u, x),
                a()
        }
        , x = _=>{
            _.target === e && ++f >= d && m()
        }
    ;
    setTimeout(()=>{
            f < d && m()
        }
        , l + 1),
        e.addEventListener(u, x)
}
function getTransitionInfo(e, r) {
    const n = window.getComputedStyle(e)
        , o = g=>(n[g] || "").split(", ")
        , s = o("".concat(TRANSITION, "Delay"))
        , a = o("".concat(TRANSITION, "Duration"))
        , c = getTimeout(s, a)
        , l = o("".concat(ANIMATION, "Delay"))
        , d = o("".concat(ANIMATION, "Duration"))
        , u = getTimeout(l, d);
    let f = null
        , m = 0
        , x = 0;
    r === TRANSITION ? c > 0 && (f = TRANSITION,
        m = c,
        x = a.length) : r === ANIMATION ? u > 0 && (f = ANIMATION,
        m = u,
        x = d.length) : (m = Math.max(c, u),
        f = m > 0 ? c > u ? TRANSITION : ANIMATION : null,
        x = f ? f === TRANSITION ? a.length : d.length : 0);
    const _ = f === TRANSITION && /\b(transform|all)(,|$)/.test(o("".concat(TRANSITION, "Property")).toString());
    return {
        type: f,
        timeout: m,
        propCount: x,
        hasTransform: _
    }
}
function getTimeout(e, r) {
    for (; e.length < r.length; )
        e = e.concat(e);
    return Math.max(...r.map((n,o)=>toMs(n) + toMs(e[o])))
}
function toMs(e) {
    return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3
}
function forceReflow() {
    return document.body.offsetHeight
}
function patchClass(e, r, n) {
    const o = e[vtcKey];
    o && (r = (r ? [r, ...o] : [...o]).join(" ")),
        r == null ? e.removeAttribute("class") : n ? e.setAttribute("class", r) : e.className = r
}
const vShowOldKey = Symbol("_vod")
    , vShow = {
    beforeMount(e, {value: r}, {transition: n}) {
        e[vShowOldKey] = e.style.display === "none" ? "" : e.style.display,
            n && r ? n.beforeEnter(e) : setDisplay(e, r)
    },
    mounted(e, {value: r}, {transition: n}) {
        n && r && n.enter(e)
    },
    updated(e, {value: r, oldValue: n}, {transition: o}) {
        !r != !n && (o ? r ? (o.beforeEnter(e),
            setDisplay(e, !0),
            o.enter(e)) : o.leave(e, ()=>{
                setDisplay(e, !1)
            }
        ) : setDisplay(e, r))
    },
    beforeUnmount(e, {value: r}) {
        setDisplay(e, r)
    }
};
function setDisplay(e, r) {
    e.style.display = r ? e[vShowOldKey] : "none"
}
const CSS_VAR_TEXT = Symbol("");
function patchStyle(e, r, n) {
    const o = e.style
        , s = isString$1(n);
    if (n && !s) {
        if (r && !isString$1(r))
            for (const a in r)
                n[a] == null && setStyle(o, a, "");
        for (const a in n)
            setStyle(o, a, n[a])
    } else {
        const a = o.display;
        if (s) {
            if (r !== n) {
                const c = o[CSS_VAR_TEXT];
                c && (n += ";" + c),
                    o.cssText = n
            }
        } else
            r && e.removeAttribute("style");
        vShowOldKey in e && (o.display = a)
    }
}
const importantRE = /\s*!important$/;
function setStyle(e, r, n) {
    if (isArray$2(n))
        n.forEach(o=>setStyle(e, r, o));
    else if (n == null && (n = ""),
        r.startsWith("--"))
        e.setProperty(r, n);
    else {
        const o = autoPrefix(e, r);
        importantRE.test(n) ? e.setProperty(hyphenate(o), n.replace(importantRE, ""), "important") : e[o] = n
    }
}
const prefixes = ["Webkit", "Moz", "ms"]
    , prefixCache = {};
function autoPrefix(e, r) {
    const n = prefixCache[r];
    if (n)
        return n;
    let o = camelize$1(r);
    if (o !== "filter" && o in e)
        return prefixCache[r] = o;
    o = capitalize(o);
    for (let s = 0; s < prefixes.length; s++) {
        const a = prefixes[s] + o;
        if (a in e)
            return prefixCache[r] = a
    }
    return r
}
const xlinkNS = "http://www.w3.org/1999/xlink";
function patchAttr(e, r, n, o, s) {
    if (o && r.startsWith("xlink:"))
        n == null ? e.removeAttributeNS(xlinkNS, r.slice(6, r.length)) : e.setAttributeNS(xlinkNS, r, n);
    else {
        const a = isSpecialBooleanAttr(r);
        n == null || a && !includeBooleanAttr(n) ? e.removeAttribute(r) : e.setAttribute(r, a ? "" : n)
    }
}
function patchDOMProp(e, r, n, o, s, a, c) {
    if (r === "innerHTML" || r === "textContent") {
        o && c(o, s, a),
            e[r] = n == null ? "" : n;
        return
    }
    const l = e.tagName;
    if (r === "value" && l !== "PROGRESS" && !l.includes("-")) {
        e._value = n;
        const u = l === "OPTION" ? e.getAttribute("value") : e.value
            , f = n == null ? "" : n;
        u !== f && (e.value = f),
        n == null && e.removeAttribute(r);
        return
    }
    let d = !1;
    if (n === "" || n == null) {
        const u = typeof e[r];
        u === "boolean" ? n = includeBooleanAttr(n) : n == null && u === "string" ? (n = "",
            d = !0) : u === "number" && (n = 0,
            d = !0)
    }
    try {
        e[r] = n
    } catch (u) {}
    d && e.removeAttribute(r)
}
function addEventListener(e, r, n, o) {
    e.addEventListener(r, n, o)
}
function removeEventListener(e, r, n, o) {
    e.removeEventListener(r, n, o)
}
const veiKey = Symbol("_vei");
function patchEvent(e, r, n, o, s=null) {
    const a = e[veiKey] || (e[veiKey] = {})
        , c = a[r];
    if (o && c)
        c.value = o;
    else {
        const [l,d] = parseName(r);
        if (o) {
            const u = a[r] = createInvoker(o, s);
            addEventListener(e, l, u, d)
        } else
            c && (removeEventListener(e, l, c, d),
                a[r] = void 0)
    }
}
const optionsModifierRE = /(?:Once|Passive|Capture)$/;
function parseName(e) {
    let r;
    if (optionsModifierRE.test(e)) {
        r = {};
        let o;
        for (; o = e.match(optionsModifierRE); )
            e = e.slice(0, e.length - o[0].length),
                r[o[0].toLowerCase()] = !0
    }
    return [e[2] === ":" ? e.slice(3) : hyphenate(e.slice(2)), r]
}
let cachedNow = 0;
const p = Promise.resolve()
    , getNow = ()=>cachedNow || (p.then(()=>cachedNow = 0),
    cachedNow = Date.now());
function createInvoker(e, r) {
    const n = o=>{
            if (!o._vts)
                o._vts = Date.now();
            else if (o._vts <= n.attached)
                return;
            callWithAsyncErrorHandling(patchStopImmediatePropagation(o, n.value), r, 5, [o])
        }
    ;
    return n.value = e,
        n.attached = getNow(),
        n
}
function patchStopImmediatePropagation(e, r) {
    if (isArray$2(r)) {
        const n = e.stopImmediatePropagation;
        return e.stopImmediatePropagation = ()=>{
            n.call(e),
                e._stopped = !0
        }
            ,
            r.map(o=>s=>!s._stopped && o && o(s))
    } else
        return r
}
const isNativeOn = e=>e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123
    , patchProp = (e,r,n,o,s=!1,a,c,l,d)=>{
        r === "class" ? patchClass(e, o, s) : r === "style" ? patchStyle(e, n, o) : isOn(r) ? isModelListener(r) || patchEvent(e, r, n, o, c) : (r[0] === "." ? (r = r.slice(1),
            !0) : r[0] === "^" ? (r = r.slice(1),
            !1) : shouldSetAsProp(e, r, o, s)) ? patchDOMProp(e, r, o, a, c, l, d) : (r === "true-value" ? e._trueValue = o : r === "false-value" && (e._falseValue = o),
            patchAttr(e, r, o, s))
    }
;
function shouldSetAsProp(e, r, n, o) {
    if (o)
        return !!(r === "innerHTML" || r === "textContent" || r in e && isNativeOn(r) && isFunction$2(n));
    if (r === "spellcheck" || r === "draggable" || r === "translate" || r === "form" || r === "list" && e.tagName === "INPUT" || r === "type" && e.tagName === "TEXTAREA")
        return !1;
    if (r === "width" || r === "height") {
        const s = e.tagName;
        if (s === "IMG" || s === "VIDEO" || s === "CANVAS" || s === "SOURCE")
            return !1
    }
    return isNativeOn(r) && isString$1(n) ? !1 : r in e
}
const getModelAssigner = e=>{
        const r = e.props["onUpdate:modelValue"] || !1;
        return isArray$2(r) ? n=>invokeArrayFns(r, n) : r
    }
;
function onCompositionStart(e) {
    e.target.composing = !0
}
function onCompositionEnd(e) {
    const r = e.target;
    r.composing && (r.composing = !1,
        r.dispatchEvent(new Event("input")))
}
const assignKey$1 = Symbol("_assign")
    , vModelText = {
    created(e, {modifiers: {lazy: r, trim: n, number: o}}, s) {
        e[assignKey$1] = getModelAssigner(s);
        const a = o || s.props && s.props.type === "number";
        addEventListener(e, r ? "change" : "input", c=>{
                if (c.target.composing)
                    return;
                let l = e.value;
                n && (l = l.trim()),
                a && (l = looseToNumber(l)),
                    e[assignKey$1](l)
            }
        ),
        n && addEventListener(e, "change", ()=>{
                e.value = e.value.trim()
            }
        ),
        r || (addEventListener(e, "compositionstart", onCompositionStart),
            addEventListener(e, "compositionend", onCompositionEnd),
            addEventListener(e, "change", onCompositionEnd))
    },
    mounted(e, {value: r}) {
        e.value = r == null ? "" : r
    },
    beforeUpdate(e, {value: r, modifiers: {lazy: n, trim: o, number: s}}, a) {
        if (e[assignKey$1] = getModelAssigner(a),
            e.composing)
            return;
        const c = s || e.type === "number" ? looseToNumber(e.value) : e.value
            , l = r == null ? "" : r;
        c !== l && (document.activeElement === e && e.type !== "range" && (n || o && e.value.trim() === l) || (e.value = l))
    }
}
    , systemModifiers = ["ctrl", "shift", "alt", "meta"]
    , modifierGuards = {
    stop: e=>e.stopPropagation(),
    prevent: e=>e.preventDefault(),
    self: e=>e.target !== e.currentTarget,
    ctrl: e=>!e.ctrlKey,
    shift: e=>!e.shiftKey,
    alt: e=>!e.altKey,
    meta: e=>!e.metaKey,
    left: e=>"button"in e && e.button !== 0,
    middle: e=>"button"in e && e.button !== 1,
    right: e=>"button"in e && e.button !== 2,
    exact: (e,r)=>systemModifiers.some(n=>e["".concat(n, "Key")] && !r.includes(n))
}
    , withModifiers = (e,r)=>e._withMods || (e._withMods = (n,...o)=>{
        for (let s = 0; s < r.length; s++) {
            const a = modifierGuards[r[s]];
            if (a && a(n, r))
                return
        }
        return e(n, ...o)
    }
)
    , keyNames = {
    esc: "escape",
    space: " ",
    up: "arrow-up",
    left: "arrow-left",
    right: "arrow-right",
    down: "arrow-down",
    delete: "backspace"
}
    , withKeys = (e,r)=>e._withKeys || (e._withKeys = n=>{
        if (!("key"in n))
            return;
        const o = hyphenate(n.key);
        if (r.some(s=>s === o || keyNames[s] === o))
            return e(n)
    }
)
    , rendererOptions = extend$2({
    patchProp
}, nodeOps);
let renderer;
function ensureRenderer() {
    return renderer || (renderer = createRenderer(rendererOptions))
}
const createApp = (...e)=>{
        const r = ensureRenderer().createApp(...e)
            , {mount: n} = r;
        return r.mount = o=>{
            const s = normalizeContainer(o);
            if (!s)
                return;
            const a = r._component;
            !isFunction$2(a) && !a.render && !a.template && (a.template = s.innerHTML),
                s.innerHTML = "";
            const c = n(s, !1, s instanceof SVGElement);
            return s instanceof Element && (s.removeAttribute("v-cloak"),
                s.setAttribute("data-v-app", "")),
                c
        }
            ,
            r
    }
;
function normalizeContainer(e) {
    return isString$1(e) ? document.querySelector(e) : e
}
function noop$3() {}
const extend$1 = Object.assign
    , inBrowser$1 = typeof window < "u"
    , isObject$1 = e=>e !== null && typeof e == "object"
    , isDef = e=>e != null
    , isFunction$1 = e=>typeof e == "function"
    , isPromise = e=>isObject$1(e) && isFunction$1(e.then) && isFunction$1(e.catch)
    , isDate$1 = e=>Object.prototype.toString.call(e) === "[object Date]" && !Number.isNaN(e.getTime())
    , isNumeric = e=>typeof e == "number" || /^\d+(\.\d+)?$/.test(e)
    , isIOS$1 = ()=>inBrowser$1 ? /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase()) : !1;
function get(e, r) {
    const n = r.split(".");
    let o = e;
    return n.forEach(s=>{
            var a;
            o = isObject$1(o) && (a = o[s]) != null ? a : ""
        }
    ),
        o
}
function pick(e, r, n) {
    return r.reduce((o,s)=>((!n || e[s] !== void 0) && (o[s] = e[s]),
        o), {})
}
const isSameValue = (e,r)=>JSON.stringify(e) === JSON.stringify(r)
    , toArray$1 = e=>Array.isArray(e) ? e : [e]
    , unknownProp = null
    , numericProp = [Number, String]
    , truthProp = {
    type: Boolean,
    default: !0
}
    , makeRequiredProp = e=>({
    type: e,
    required: !0
})
    , makeArrayProp = ()=>({
    type: Array,
    default: ()=>[]
})
    , makeNumberProp = e=>({
    type: Number,
    default: e
})
    , makeNumericProp = e=>({
    type: numericProp,
    default: e
})
    , makeStringProp = e=>({
    type: String,
    default: e
});
var inBrowser = typeof window < "u";
function raf(e) {
    return inBrowser ? requestAnimationFrame(e) : -1
}
function cancelRaf(e) {
    inBrowser && cancelAnimationFrame(e)
}
function doubleRaf(e) {
    raf(()=>raf(e))
}
var isWindow = e=>e === window
    , makeDOMRect = (e,r)=>({
        top: 0,
        left: 0,
        right: e,
        bottom: r,
        width: e,
        height: r
    })
    , useRect = e=>{
        const r = unref(e);
        if (isWindow(r)) {
            const n = r.innerWidth
                , o = r.innerHeight;
            return makeDOMRect(n, o)
        }
        return r != null && r.getBoundingClientRect ? r.getBoundingClientRect() : makeDOMRect(0, 0)
    }
;
function useParent(e) {
    const r = inject(e, null);
    if (r) {
        const n = getCurrentInstance()
            , {link: o, unlink: s, internalChildren: a} = r;
        o(n),
            onUnmounted(()=>s(n));
        const c = computed(()=>a.indexOf(n));
        return {
            parent: r,
            index: c
        }
    }
    return {
        parent: null,
        index: ref(-1)
    }
}
function flattenVNodes(e) {
    const r = []
        , n = o=>{
            Array.isArray(o) && o.forEach(s=>{
                    var a;
                    isVNode(s) && (r.push(s),
                    (a = s.component) != null && a.subTree && (r.push(s.component.subTree),
                        n(s.component.subTree.children)),
                    s.children && n(s.children))
                }
            )
        }
    ;
    return n(e),
        r
}
var findVNodeIndex = (e,r)=>{
        const n = e.indexOf(r);
        return n === -1 ? e.findIndex(o=>r.key !== void 0 && r.key !== null && o.type === r.type && o.key === r.key) : n
    }
;
function sortChildren(e, r, n) {
    const o = flattenVNodes(e.subTree.children);
    n.sort((a,c)=>findVNodeIndex(o, a.vnode) - findVNodeIndex(o, c.vnode));
    const s = n.map(a=>a.proxy);
    r.sort((a,c)=>{
            const l = s.indexOf(a)
                , d = s.indexOf(c);
            return l - d
        }
    )
}
function useChildren(e) {
    const r = reactive([])
        , n = reactive([])
        , o = getCurrentInstance();
    return {
        children: r,
        linkChildren: a=>{
            provide(e, Object.assign({
                link: d=>{
                    d.proxy && (n.push(d),
                        r.push(d.proxy),
                        sortChildren(o, r, n))
                }
                ,
                unlink: d=>{
                    const u = n.indexOf(d);
                    r.splice(u, 1),
                        n.splice(u, 1)
                }
                ,
                children: r,
                internalChildren: n
            }, a))
        }
    }
}
var SECOND = 1e3
    , MINUTE = 60 * SECOND
    , HOUR = 60 * MINUTE
    , DAY = 24 * HOUR;
function parseTime(e) {
    const r = Math.floor(e / DAY)
        , n = Math.floor(e % DAY / HOUR)
        , o = Math.floor(e % HOUR / MINUTE)
        , s = Math.floor(e % MINUTE / SECOND)
        , a = Math.floor(e % SECOND);
    return {
        total: e,
        days: r,
        hours: n,
        minutes: o,
        seconds: s,
        milliseconds: a
    }
}
function isSameSecond(e, r) {
    return Math.floor(e / 1e3) === Math.floor(r / 1e3)
}
function useCountDown(e) {
    let r, n, o, s;
    const a = ref(e.time)
        , c = computed(()=>parseTime(a.value))
        , l = ()=>{
            o = !1,
                cancelRaf(r)
        }
        , d = ()=>Math.max(n - Date.now(), 0)
        , u = E=>{
            var b, w;
            a.value = E,
            (b = e.onChange) == null || b.call(e, c.value),
            E === 0 && (l(),
            (w = e.onFinish) == null || w.call(e))
        }
        , f = ()=>{
            r = raf(()=>{
                    o && (u(d()),
                    a.value > 0 && f())
                }
            )
        }
        , m = ()=>{
            r = raf(()=>{
                    if (o) {
                        const E = d();
                        (!isSameSecond(E, a.value) || E === 0) && u(E),
                        a.value > 0 && m()
                    }
                }
            )
        }
        , x = ()=>{
            inBrowser && (e.millisecond ? f() : m())
        }
        , _ = ()=>{
            o || (n = Date.now() + a.value,
                o = !0,
                x())
        }
        , g = (E=e.time)=>{
            l(),
                a.value = E
        }
    ;
    return onBeforeUnmount(l),
        onActivated(()=>{
                s && (o = !0,
                    s = !1,
                    x())
            }
        ),
        onDeactivated(()=>{
                o && (l(),
                    s = !0)
            }
        ),
        {
            start: _,
            pause: l,
            reset: g,
            current: c
        }
}
function onMountedOrActivated(e) {
    let r;
    onMounted(()=>{
            e(),
                nextTick(()=>{
                        r = !0
                    }
                )
        }
    ),
        onActivated(()=>{
                r && e()
            }
        )
}
function useEventListener(e, r, n={}) {
    if (!inBrowser)
        return;
    const {target: o=window, passive: s=!1, capture: a=!1} = n;
    let c = !1, l;
    const d = m=>{
            if (c)
                return;
            const x = unref(m);
            x && !l && (x.addEventListener(e, r, {
                capture: a,
                passive: s
            }),
                l = !0)
        }
        , u = m=>{
            if (c)
                return;
            const x = unref(m);
            x && l && (x.removeEventListener(e, r, a),
                l = !1)
        }
    ;
    onUnmounted(()=>u(o)),
        onDeactivated(()=>u(o)),
        onMountedOrActivated(()=>d(o));
    let f;
    return isRef(o) && (f = watch(o, (m,x)=>{
            u(x),
                d(m)
        }
    )),
        ()=>{
            f == null || f(),
                u(o),
                c = !0
        }
}
var width, height;
function useWindowSize() {
    if (!width && (width = ref(0),
        height = ref(0),
        inBrowser)) {
        const e = ()=>{
                width.value = window.innerWidth,
                    height.value = window.innerHeight
            }
        ;
        e(),
            window.addEventListener("resize", e, {
                passive: !0
            }),
            window.addEventListener("orientationchange", e, {
                passive: !0
            })
    }
    return {
        width,
        height
    }
}
var overflowScrollReg = /scroll|auto|overlay/i
    , defaultRoot = inBrowser ? window : void 0;
function isElement(e) {
    return e.tagName !== "HTML" && e.tagName !== "BODY" && e.nodeType === 1
}
function getScrollParent(e, r=defaultRoot) {
    let n = e;
    for (; n && n !== r && isElement(n); ) {
        const {overflowY: o} = window.getComputedStyle(n);
        if (overflowScrollReg.test(o))
            return n;
        n = n.parentNode
    }
    return r
}
function useScrollParent(e, r=defaultRoot) {
    const n = ref();
    return onMounted(()=>{
            e.value && (n.value = getScrollParent(e.value, r))
        }
    ),
        n
}
var visibility;
function usePageVisibility() {
    if (!visibility && (visibility = ref("visible"),
        inBrowser)) {
        const e = ()=>{
                visibility.value = document.hidden ? "hidden" : "visible"
            }
        ;
        e(),
            window.addEventListener("visibilitychange", e)
    }
    return visibility
}
var CUSTOM_FIELD_INJECTION_KEY = Symbol("van-field");
function useCustomFieldValue(e) {
    const r = inject(CUSTOM_FIELD_INJECTION_KEY, null);
    r && !r.customValue.value && (r.customValue.value = e,
        watch(e, ()=>{
                r.resetValidation(),
                    r.validateWithTrigger("onChange")
            }
        ))
}
function getScrollTop(e) {
    const r = "scrollTop"in e ? e.scrollTop : e.pageYOffset;
    return Math.max(r, 0)
}
function setScrollTop(e, r) {
    "scrollTop"in e ? e.scrollTop = r : e.scrollTo(e.scrollX, r)
}
function getRootScrollTop() {
    return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
}
function setRootScrollTop(e) {
    setScrollTop(window, e),
        setScrollTop(document.body, e)
}
const isIOS = isIOS$1();
function resetScroll() {
    isIOS && setRootScrollTop(getRootScrollTop())
}
const stopPropagation = e=>e.stopPropagation();
function preventDefault(e, r) {
    (typeof e.cancelable != "boolean" || e.cancelable) && e.preventDefault(),
    r && stopPropagation(e)
}
function isHidden(e) {
    const r = unref(e);
    if (!r)
        return !1;
    const n = window.getComputedStyle(r)
        , o = n.display === "none"
        , s = r.offsetParent === null && n.position !== "fixed";
    return o || s
}
const {width: windowWidth, height: windowHeight} = useWindowSize();
function addUnit(e) {
    if (isDef(e))
        return isNumeric(e) ? "".concat(e, "px") : String(e)
}
function getSizeStyle(e) {
    if (isDef(e)) {
        if (Array.isArray(e))
            return {
                width: addUnit(e[0]),
                height: addUnit(e[1])
            };
        const r = addUnit(e);
        return {
            width: r,
            height: r
        }
    }
}
function getZIndexStyle(e) {
    const r = {};
    return e !== void 0 && (r.zIndex = +e),
        r
}
let rootFontSize;
function getRootFontSize() {
    if (!rootFontSize) {
        const e = document.documentElement
            , r = e.style.fontSize || window.getComputedStyle(e).fontSize;
        rootFontSize = parseFloat(r)
    }
    return rootFontSize
}
function convertRem(e) {
    return e = e.replace(/rem/g, ""),
    +e * getRootFontSize()
}
function convertVw(e) {
    return e = e.replace(/vw/g, ""),
    +e * windowWidth.value / 100
}
function convertVh(e) {
    return e = e.replace(/vh/g, ""),
    +e * windowHeight.value / 100
}
function unitToPx(e) {
    if (typeof e == "number")
        return e;
    if (inBrowser$1) {
        if (e.includes("rem"))
            return convertRem(e);
        if (e.includes("vw"))
            return convertVw(e);
        if (e.includes("vh"))
            return convertVh(e)
    }
    return parseFloat(e)
}
const camelizeRE = /-(\w)/g
    , camelize = e=>e.replace(camelizeRE, (r,n)=>n.toUpperCase())
    , kebabCase = e=>e.replace(/([A-Z])/g, "-$1").toLowerCase().replace(/^-/, "");
function padZero(e, r=2) {
    let n = e + "";
    for (; n.length < r; )
        n = "0" + n;
    return n
}
const clamp = (e,r,n)=>Math.min(Math.max(e, r), n);
function trimExtraChar(e, r, n) {
    const o = e.indexOf(r);
    return o === -1 ? e : r === "-" && o !== 0 ? e.slice(0, o) : e.slice(0, o + 1) + e.slice(o).replace(n, "")
}
function formatNumber(e, r=!0, n=!0) {
    r ? e = trimExtraChar(e, ".", /\./g) : e = e.split(".")[0],
        n ? e = trimExtraChar(e, "-", /-/g) : e = e.replace(/-/, "");
    const o = r ? /[^-0-9.]/g : /[^-0-9]/g;
    return e.replace(o, "")
}
const {hasOwnProperty: hasOwnProperty$1} = Object.prototype;
function assignKey(e, r, n) {
    const o = r[n];
    isDef(o) && (!hasOwnProperty$1.call(e, n) || !isObject$1(o) ? e[n] = o : e[n] = deepAssign(Object(e[n]), o))
}
function deepAssign(e, r) {
    return Object.keys(r).forEach(n=>{
            assignKey(e, r, n)
        }
    ),
        e
}
var stdin_default$i = {
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
        monthTitle: (e,r)=>"".concat(e, "年").concat(r, "月"),
        rangePrompt: e=>"最多选择 ".concat(e, " 天")
    },
    vanCascader: {
        select: "请选择"
    },
    vanPagination: {
        prev: "上一页",
        next: "下一页"
    },
    vanPullRefresh: {
        pulling: "下拉即可刷新...",
        loosing: "释放即可刷新..."
    },
    vanSubmitBar: {
        label: "合计:"
    },
    vanCoupon: {
        unlimited: "无门槛",
        discount: e=>"".concat(e, "折"),
        condition: e=>"满".concat(e, "元可用")
    },
    vanCouponCell: {
        title: "优惠券",
        count: e=>"".concat(e, "张可用")
    },
    vanCouponList: {
        exchange: "兑换",
        close: "不使用",
        enable: "可用",
        disabled: "不可用",
        placeholder: "输入优惠码"
    },
    vanAddressEdit: {
        area: "地区",
        areaEmpty: "请选择地区",
        addressEmpty: "请填写详细地址",
        addressDetail: "详细地址",
        defaultAddress: "设为默认收货地址"
    },
    vanAddressList: {
        add: "新增地址"
    }
};
const lang = ref("zh-CN")
    , messages = reactive({
    "zh-CN": stdin_default$i
})
    , Locale = {
    messages() {
        return messages[lang.value]
    },
    use(e, r) {
        lang.value = e,
            this.add({
                [e]: r
            })
    },
    add(e={}) {
        deepAssign(messages, e)
    }
};
var stdin_default$h = Locale;
function createTranslate(e) {
    const r = camelize(e) + ".";
    return (n,...o)=>{
        const s = stdin_default$h.messages()
            , a = get(s, r + n) || get(s, n);
        return isFunction$1(a) ? a(...o) : a
    }
}
function genBem(e, r) {
    return r ? typeof r == "string" ? " ".concat(e, "--").concat(r) : Array.isArray(r) ? r.reduce((n,o)=>n + genBem(e, o), "") : Object.keys(r).reduce((n,o)=>n + (r[o] ? genBem(e, o) : ""), "") : ""
}
function createBEM(e) {
    return (r,n)=>(r && typeof r != "string" && (n = r,
        r = ""),
        r = r ? "".concat(e, "__").concat(r) : e,
        "".concat(r).concat(genBem(r, n)))
}
function createNamespace(e) {
    const r = "van-".concat(e);
    return [r, createBEM(r), createTranslate(r)]
}
const BORDER = "van-hairline"
    , BORDER_TOP = "".concat(BORDER, "--top")
    , BORDER_LEFT = "".concat(BORDER, "--left")
    , BORDER_SURROUND = "".concat(BORDER, "--surround")
    , BORDER_TOP_BOTTOM = "".concat(BORDER, "--top-bottom")
    , BORDER_UNSET_TOP_BOTTOM = "".concat(BORDER, "-unset--top-bottom")
    , HAPTICS_FEEDBACK = "van-haptics-feedback"
    , FORM_KEY = Symbol("van-form")
    , LONG_PRESS_START_TIME = 500
    , TAP_OFFSET = 5;
function callInterceptor(e, {args: r=[], done: n, canceled: o, error: s}) {
    if (e) {
        const a = e.apply(null, r);
        isPromise(a) ? a.then(c=>{
                c ? n() : o && o()
            }
        ).catch(s || noop$3) : a ? n() : o && o()
    } else
        n()
}
function withInstall(e) {
    return e.install = r=>{
        const {name: n} = e;
        n && (r.component(n, e),
            r.component(camelize("-".concat(n)), e))
    }
        ,
        e
}
const POPUP_TOGGLE_KEY = Symbol();
function onPopupReopen(e) {
    const r = inject(POPUP_TOGGLE_KEY, null);
    r && watch(r, n=>{
            n && e()
        }
    )
}
const useHeight = (e,r)=>{
        const n = ref()
            , o = ()=>{
                n.value = useRect(e).height
            }
        ;
        return onMounted(()=>{
                if (nextTick(o),
                    r)
                    for (let s = 1; s <= 3; s++)
                        setTimeout(o, 100 * s)
            }
        ),
            onPopupReopen(()=>nextTick(o)),
            watch([windowWidth, windowHeight], o),
            n
    }
;
function usePlaceholder(e, r) {
    const n = useHeight(e, !0);
    return o=>createVNode("div", {
        class: r("placeholder"),
        style: {
            height: n.value ? "".concat(n.value, "px") : void 0
        }
    }, [o()])
}
const [name$g,bem$g] = createNamespace("action-bar")
    , ACTION_BAR_KEY = Symbol(name$g)
    , actionBarProps = {
    placeholder: Boolean,
    safeAreaInsetBottom: truthProp
};
var stdin_default$g = defineComponent({
    name: name$g,
    props: actionBarProps,
    setup(e, {slots: r}) {
        const n = ref()
            , o = usePlaceholder(n, bem$g)
            , {linkChildren: s} = useChildren(ACTION_BAR_KEY);
        s();
        const a = ()=>{
                var c;
                return createVNode("div", {
                    ref: n,
                    class: [bem$g(), {
                        "van-safe-area-bottom": e.safeAreaInsetBottom
                    }]
                }, [(c = r.default) == null ? void 0 : c.call(r)])
            }
        ;
        return ()=>e.placeholder ? o(a) : a()
    }
});
const ActionBar = withInstall(stdin_default$g);
function useExpose(e) {
    const r = getCurrentInstance();
    r && extend$1(r.proxy, e)
}
const routeProps = {
    to: [String, Object],
    url: String,
    replace: Boolean
};
function route({to: e, url: r, replace: n, $router: o}) {
    e && o ? o[n ? "replace" : "push"](e) : r && (n ? location.replace(r) : location.href = r)
}
function useRoute$1() {
    const e = getCurrentInstance().proxy;
    return ()=>route(e)
}
const [name$f,bem$f] = createNamespace("badge")
    , badgeProps = {
    dot: Boolean,
    max: numericProp,
    tag: makeStringProp("div"),
    color: String,
    offset: Array,
    content: numericProp,
    showZero: truthProp,
    position: makeStringProp("top-right")
};
var stdin_default$f = defineComponent({
    name: name$f,
    props: badgeProps,
    setup(e, {slots: r}) {
        const n = ()=>{
                if (r.content)
                    return !0;
                const {content: l, showZero: d} = e;
                return isDef(l) && l !== "" && (d || l !== 0 && l !== "0")
            }
            , o = ()=>{
                const {dot: l, max: d, content: u} = e;
                if (!l && n())
                    return r.content ? r.content() : isDef(d) && isNumeric(u) && +u > +d ? "".concat(d, "+") : u
            }
            , s = l=>l.startsWith("-") ? l.replace("-", "") : "-".concat(l)
            , a = computed(()=>{
                    const l = {
                        background: e.color
                    };
                    if (e.offset) {
                        const [d,u] = e.offset
                            , {position: f} = e
                            , [m,x] = f.split("-");
                        r.default ? (typeof u == "number" ? l[m] = addUnit(m === "top" ? u : -u) : l[m] = m === "top" ? addUnit(u) : s(u),
                            typeof d == "number" ? l[x] = addUnit(x === "left" ? d : -d) : l[x] = x === "left" ? addUnit(d) : s(d)) : (l.marginTop = addUnit(u),
                            l.marginLeft = addUnit(d))
                    }
                    return l
                }
            )
            , c = ()=>{
                if (n() || e.dot)
                    return createVNode("div", {
                        class: bem$f([e.position, {
                            dot: e.dot,
                            fixed: !!r.default
                        }]),
                        style: a.value
                    }, [o()])
            }
        ;
        return ()=>{
            if (r.default) {
                const {tag: l} = e;
                return createVNode(l, {
                    class: bem$f("wrapper")
                }, {
                    default: ()=>[r.default(), c()]
                })
            }
            return c()
        }
    }
});
const Badge = withInstall(stdin_default$f);
let globalZIndex = 2e3;
const useGlobalZIndex = ()=>++globalZIndex
    , setGlobalZIndex = e=>{
    globalZIndex = e
}
    , [name$e,bem$e] = createNamespace("config-provider")
    , CONFIG_PROVIDER_KEY = Symbol(name$e)
    , configProviderProps = {
    tag: makeStringProp("div"),
    theme: makeStringProp("light"),
    zIndex: Number,
    themeVars: Object,
    themeVarsDark: Object,
    themeVarsLight: Object,
    themeVarsScope: makeStringProp("local"),
    iconPrefix: String
};
function insertDash(e) {
    return e.replace(/([a-zA-Z])(\d)/g, "$1-$2")
}
function mapThemeVarsToCSSVars(e) {
    const r = {};
    return Object.keys(e).forEach(n=>{
            const o = insertDash(kebabCase(n));
            r["--van-".concat(o)] = e[n]
        }
    ),
        r
}
function syncThemeVarsOnRoot(e={}, r={}) {
    Object.keys(e).forEach(n=>{
            e[n] !== r[n] && document.documentElement.style.setProperty(n, e[n])
        }
    ),
        Object.keys(r).forEach(n=>{
                e[n] || document.documentElement.style.removeProperty(n)
            }
        )
}
var stdin_default$e = defineComponent({
    name: name$e,
    props: configProviderProps,
    setup(e, {slots: r}) {
        const n = computed(()=>mapThemeVarsToCSSVars(extend$1({}, e.themeVars, e.theme === "dark" ? e.themeVarsDark : e.themeVarsLight)));
        if (inBrowser$1) {
            const o = ()=>{
                    document.documentElement.classList.add("van-theme-".concat(e.theme))
                }
                , s = (a=e.theme)=>{
                    document.documentElement.classList.remove("van-theme-".concat(a))
                }
            ;
            watch(()=>e.theme, (a,c)=>{
                    c && s(c),
                        o()
                }
                , {
                    immediate: !0
                }),
                onActivated(o),
                onDeactivated(s),
                onBeforeUnmount(s),
                watch(n, (a,c)=>{
                        e.themeVarsScope === "global" && syncThemeVarsOnRoot(a, c)
                    }
                ),
                watch(()=>e.themeVarsScope, (a,c)=>{
                        c === "global" && syncThemeVarsOnRoot({}, n.value),
                        a === "global" && syncThemeVarsOnRoot(n.value, {})
                    }
                ),
            e.themeVarsScope === "global" && syncThemeVarsOnRoot(n.value, {})
        }
        return provide(CONFIG_PROVIDER_KEY, e),
            watchEffect(()=>{
                    e.zIndex !== void 0 && setGlobalZIndex(e.zIndex)
                }
            ),
            ()=>createVNode(e.tag, {
                class: bem$e(),
                style: e.themeVarsScope === "local" ? n.value : void 0
            }, {
                default: ()=>{
                    var o;
                    return [(o = r.default) == null ? void 0 : o.call(r)]
                }
            })
    }
});
const [name$d,bem$d] = createNamespace("icon")
    , isImage = e=>e == null ? void 0 : e.includes("/")
    , iconProps = {
    dot: Boolean,
    tag: makeStringProp("i"),
    name: String,
    size: numericProp,
    badge: numericProp,
    color: String,
    badgeProps: Object,
    classPrefix: String
};
var stdin_default$d = defineComponent({
    name: name$d,
    props: iconProps,
    setup(e, {slots: r}) {
        const n = inject(CONFIG_PROVIDER_KEY, null)
            , o = computed(()=>e.classPrefix || (n == null ? void 0 : n.iconPrefix) || bem$d());
        return ()=>{
            const {tag: s, dot: a, name: c, size: l, badge: d, color: u} = e
                , f = isImage(c);
            return createVNode(Badge, mergeProps({
                dot: a,
                tag: s,
                class: [o.value, f ? "" : "".concat(o.value, "-").concat(c)],
                style: {
                    color: u,
                    fontSize: addUnit(l)
                },
                content: d
            }, e.badgeProps), {
                default: ()=>{
                    var m;
                    return [(m = r.default) == null ? void 0 : m.call(r), f && createVNode("img", {
                        class: bem$d("image"),
                        src: c
                    }, null)]
                }
            })
        }
    }
});
const Icon = withInstall(stdin_default$d)
    , [name$c,bem$c] = createNamespace("loading")
    , SpinIcon = Array(12).fill(null).map((e,r)=>createVNode("i", {
    class: bem$c("line", String(r + 1))
}, null))
    , CircularIcon = createVNode("svg", {
    class: bem$c("circular"),
    viewBox: "25 25 50 50"
}, [createVNode("circle", {
    cx: "50",
    cy: "50",
    r: "20",
    fill: "none"
}, null)])
    , loadingProps = {
    size: numericProp,
    type: makeStringProp("circular"),
    color: String,
    vertical: Boolean,
    textSize: numericProp,
    textColor: String
};
var stdin_default$c = defineComponent({
    name: name$c,
    props: loadingProps,
    setup(e, {slots: r}) {
        const n = computed(()=>extend$1({
                color: e.color
            }, getSizeStyle(e.size)))
            , o = ()=>{
                const a = e.type === "spinner" ? SpinIcon : CircularIcon;
                return createVNode("span", {
                    class: bem$c("spinner", e.type),
                    style: n.value
                }, [r.icon ? r.icon() : a])
            }
            , s = ()=>{
                var a;
                if (r.default)
                    return createVNode("span", {
                        class: bem$c("text"),
                        style: {
                            fontSize: addUnit(e.textSize),
                            color: (a = e.textColor) != null ? a : e.color
                        }
                    }, [r.default()])
            }
        ;
        return ()=>{
            const {type: a, vertical: c} = e;
            return createVNode("div", {
                class: bem$c([a, {
                    vertical: c
                }]),
                "aria-live": "polite",
                "aria-busy": !0
            }, [o(), s()])
        }
    }
});
const Loading = withInstall(stdin_default$c)
    , [name$b,bem$b] = createNamespace("button")
    , buttonProps = extend$1({}, routeProps, {
    tag: makeStringProp("button"),
    text: String,
    icon: String,
    type: makeStringProp("default"),
    size: makeStringProp("normal"),
    color: String,
    block: Boolean,
    plain: Boolean,
    round: Boolean,
    square: Boolean,
    loading: Boolean,
    hairline: Boolean,
    disabled: Boolean,
    iconPrefix: String,
    nativeType: makeStringProp("button"),
    loadingSize: numericProp,
    loadingText: String,
    loadingType: String,
    iconPosition: makeStringProp("left")
});
var stdin_default$b = defineComponent({
    name: name$b,
    props: buttonProps,
    emits: ["click"],
    setup(e, {emit: r, slots: n}) {
        const o = useRoute$1()
            , s = ()=>n.loading ? n.loading() : createVNode(Loading, {
                size: e.loadingSize,
                type: e.loadingType,
                class: bem$b("loading")
            }, null)
            , a = ()=>{
                if (e.loading)
                    return s();
                if (n.icon)
                    return createVNode("div", {
                        class: bem$b("icon")
                    }, [n.icon()]);
                if (e.icon)
                    return createVNode(Icon, {
                        name: e.icon,
                        class: bem$b("icon"),
                        classPrefix: e.iconPrefix
                    }, null)
            }
            , c = ()=>{
                let u;
                if (e.loading ? u = e.loadingText : u = n.default ? n.default() : e.text,
                    u)
                    return createVNode("span", {
                        class: bem$b("text")
                    }, [u])
            }
            , l = ()=>{
                const {color: u, plain: f} = e;
                if (u) {
                    const m = {
                        color: f ? u : "white"
                    };
                    return f || (m.background = u),
                        u.includes("gradient") ? m.border = 0 : m.borderColor = u,
                        m
                }
            }
            , d = u=>{
                e.loading ? preventDefault(u) : e.disabled || (r("click", u),
                    o())
            }
        ;
        return ()=>{
            const {tag: u, type: f, size: m, block: x, round: _, plain: g, square: E, loading: b, disabled: w, hairline: y, nativeType: A, iconPosition: C} = e
                , B = [bem$b([f, m, {
                plain: g,
                block: x,
                round: _,
                square: E,
                loading: b,
                disabled: w,
                hairline: y
            }]), {
                [BORDER_SURROUND]: y
            }];
            return createVNode(u, {
                type: A,
                class: B,
                style: l(),
                disabled: w,
                onClick: d
            }, {
                default: ()=>[createVNode("div", {
                    class: bem$b("content")
                }, [C === "left" && a(), c(), C === "right" && a()])]
            })
        }
    }
});
const Button = withInstall(stdin_default$b)
    , [name$a,bem$a] = createNamespace("action-bar-button")
    , actionBarButtonProps = extend$1({}, routeProps, {
    type: String,
    text: String,
    icon: String,
    color: String,
    loading: Boolean,
    disabled: Boolean
});
var stdin_default$a = defineComponent({
    name: name$a,
    props: actionBarButtonProps,
    setup(e, {slots: r}) {
        const n = useRoute$1()
            , {parent: o, index: s} = useParent(ACTION_BAR_KEY)
            , a = computed(()=>{
                if (o) {
                    const l = o.children[s.value - 1];
                    return !(l && "isButton"in l)
                }
            }
        )
            , c = computed(()=>{
                if (o) {
                    const l = o.children[s.value + 1];
                    return !(l && "isButton"in l)
                }
            }
        );
        return useExpose({
            isButton: !0
        }),
            ()=>{
                const {type: l, icon: d, text: u, color: f, loading: m, disabled: x} = e;
                return createVNode(Button, {
                    class: bem$a([l, {
                        last: c.value,
                        first: a.value
                    }]),
                    size: "large",
                    type: l,
                    icon: d,
                    color: f,
                    loading: m,
                    disabled: x,
                    onClick: n
                }, {
                    default: ()=>[r.default ? r.default() : u]
                })
            }
    }
});
const ActionBarButton = withInstall(stdin_default$a)
    , popupSharedProps = {
    show: Boolean,
    zIndex: numericProp,
    overlay: truthProp,
    duration: numericProp,
    teleport: [String, Object],
    lockScroll: truthProp,
    lazyRender: truthProp,
    beforeClose: Function,
    overlayStyle: Object,
    overlayClass: unknownProp,
    transitionAppear: Boolean,
    closeOnClickOverlay: truthProp
}
    , popupSharedPropKeys = Object.keys(popupSharedProps);
function getDirection(e, r) {
    return e > r ? "horizontal" : r > e ? "vertical" : ""
}
function useTouch() {
    const e = ref(0)
        , r = ref(0)
        , n = ref(0)
        , o = ref(0)
        , s = ref(0)
        , a = ref(0)
        , c = ref("")
        , l = ref(!0)
        , d = ()=>c.value === "vertical"
        , u = ()=>c.value === "horizontal"
        , f = ()=>{
            n.value = 0,
                o.value = 0,
                s.value = 0,
                a.value = 0,
                c.value = "",
                l.value = !0
        }
    ;
    return {
        move: _=>{
            const g = _.touches[0];
            n.value = (g.clientX < 0 ? 0 : g.clientX) - e.value,
                o.value = g.clientY - r.value,
                s.value = Math.abs(n.value),
                a.value = Math.abs(o.value);
            const E = 10;
            (!c.value || s.value < E && a.value < E) && (c.value = getDirection(s.value, a.value)),
            l.value && (s.value > TAP_OFFSET || a.value > TAP_OFFSET) && (l.value = !1)
        }
        ,
        start: _=>{
            f(),
                e.value = _.touches[0].clientX,
                r.value = _.touches[0].clientY
        }
        ,
        reset: f,
        startX: e,
        startY: r,
        deltaX: n,
        deltaY: o,
        offsetX: s,
        offsetY: a,
        direction: c,
        isVertical: d,
        isHorizontal: u,
        isTap: l
    }
}
let totalLockCount = 0;
const BODY_LOCK_CLASS = "van-overflow-hidden";
function useLockScroll(e, r) {
    const n = useTouch()
        , o = "01"
        , s = "10"
        , a = f=>{
        n.move(f);
        const m = n.deltaY.value > 0 ? s : o
            , x = getScrollParent(f.target, e.value)
            , {scrollHeight: _, offsetHeight: g, scrollTop: E} = x;
        let b = "11";
        E === 0 ? b = g >= _ ? "00" : "01" : E + g >= _ && (b = "10"),
        b !== "11" && n.isVertical() && !(parseInt(b, 2) & parseInt(m, 2)) && preventDefault(f, !0)
    }
        , c = ()=>{
        document.addEventListener("touchstart", n.start),
            document.addEventListener("touchmove", a, {
                passive: !1
            }),
        totalLockCount || document.body.classList.add(BODY_LOCK_CLASS),
            totalLockCount++
    }
        , l = ()=>{
        totalLockCount && (document.removeEventListener("touchstart", n.start),
            document.removeEventListener("touchmove", a),
            totalLockCount--,
        totalLockCount || document.body.classList.remove(BODY_LOCK_CLASS))
    }
        , d = ()=>r() && c()
        , u = ()=>r() && l();
    onMountedOrActivated(d),
        onDeactivated(u),
        onBeforeUnmount(u),
        watch(r, f=>{
                f ? c() : l()
            }
        )
}
function useLazyRender(e) {
    const r = ref(!1);
    return watch(e, n=>{
            n && (r.value = n)
        }
        , {
            immediate: !0
        }),
        n=>()=>r.value ? n() : null
}
const useScopeId = ()=>{
    var e;
    const {scopeId: r} = ((e = getCurrentInstance()) == null ? void 0 : e.vnode) || {};
    return r ? {
        [r]: ""
    } : null
}
    , [name$9,bem$9] = createNamespace("overlay")
    , overlayProps = {
    show: Boolean,
    zIndex: numericProp,
    duration: numericProp,
    className: unknownProp,
    lockScroll: truthProp,
    lazyRender: truthProp,
    customStyle: Object
};
var stdin_default$9 = defineComponent({
    name: name$9,
    props: overlayProps,
    setup(e, {slots: r}) {
        const n = ref()
            , o = useLazyRender(()=>e.show || !e.lazyRender)
            , s = c=>{
            e.lockScroll && preventDefault(c, !0)
        }
            , a = o(()=>{
                var c;
                const l = extend$1(getZIndexStyle(e.zIndex), e.customStyle);
                return isDef(e.duration) && (l.animationDuration = "".concat(e.duration, "s")),
                    withDirectives(createVNode("div", {
                        ref: n,
                        style: l,
                        class: [bem$9(), e.className]
                    }, [(c = r.default) == null ? void 0 : c.call(r)]), [[vShow, e.show]])
            }
        );
        return useEventListener("touchmove", s, {
            target: n
        }),
            ()=>createVNode(Transition, {
                name: "van-fade",
                appear: !0
            }, {
                default: a
            })
    }
});
const Overlay = withInstall(stdin_default$9)
    , popupProps = extend$1({}, popupSharedProps, {
    round: Boolean,
    position: makeStringProp("center"),
    closeIcon: makeStringProp("cross"),
    closeable: Boolean,
    transition: String,
    iconPrefix: String,
    closeOnPopstate: Boolean,
    closeIconPosition: makeStringProp("top-right"),
    safeAreaInsetTop: Boolean,
    safeAreaInsetBottom: Boolean
})
    , [name$8,bem$8] = createNamespace("popup");
var stdin_default$8 = defineComponent({
    name: name$8,
    inheritAttrs: !1,
    props: popupProps,
    emits: ["open", "close", "opened", "closed", "keydown", "update:show", "clickOverlay", "clickCloseIcon"],
    setup(e, {emit: r, attrs: n, slots: o}) {
        let s, a;
        const c = ref()
            , l = ref()
            , d = useLazyRender(()=>e.show || !e.lazyRender)
            , u = computed(()=>{
                    const P = {
                        zIndex: c.value
                    };
                    if (isDef(e.duration)) {
                        const T = e.position === "center" ? "animationDuration" : "transitionDuration";
                        P[T] = "".concat(e.duration, "s")
                    }
                    return P
                }
            )
            , f = ()=>{
                s || (s = !0,
                    c.value = e.zIndex !== void 0 ? +e.zIndex : useGlobalZIndex(),
                    r("open"))
            }
            , m = ()=>{
                s && callInterceptor(e.beforeClose, {
                    done() {
                        s = !1,
                            r("close"),
                            r("update:show", !1)
                    }
                })
            }
            , x = P=>{
                r("clickOverlay", P),
                e.closeOnClickOverlay && m()
            }
            , _ = ()=>{
                if (e.overlay)
                    return createVNode(Overlay, mergeProps({
                        show: e.show,
                        class: e.overlayClass,
                        zIndex: c.value,
                        duration: e.duration,
                        customStyle: e.overlayStyle,
                        role: e.closeOnClickOverlay ? "button" : void 0,
                        tabindex: e.closeOnClickOverlay ? 0 : void 0
                    }, useScopeId(), {
                        onClick: x
                    }), {
                        default: o["overlay-content"]
                    })
            }
            , g = P=>{
                r("clickCloseIcon", P),
                    m()
            }
            , E = ()=>{
                if (e.closeable)
                    return createVNode(Icon, {
                        role: "button",
                        tabindex: 0,
                        name: e.closeIcon,
                        class: [bem$8("close-icon", e.closeIconPosition), HAPTICS_FEEDBACK],
                        classPrefix: e.iconPrefix,
                        onClick: g
                    }, null)
            }
        ;
        let b;
        const w = ()=>{
                b && clearTimeout(b),
                    b = setTimeout(()=>{
                            r("opened")
                        }
                    )
            }
            , y = ()=>r("closed")
            , A = P=>r("keydown", P)
            , C = d(()=>{
                    var P;
                    const {round: T, position: D, safeAreaInsetTop: N, safeAreaInsetBottom: F} = e;
                    return withDirectives(createVNode("div", mergeProps({
                        ref: l,
                        style: u.value,
                        role: "dialog",
                        tabindex: 0,
                        class: [bem$8({
                            round: T,
                            [D]: D
                        }), {
                            "van-safe-area-top": N,
                            "van-safe-area-bottom": F
                        }],
                        onKeydown: A
                    }, n, useScopeId()), [(P = o.default) == null ? void 0 : P.call(o), E()]), [[vShow, e.show]])
                }
            )
            , B = ()=>{
                const {position: P, transition: T, transitionAppear: D} = e
                    , N = P === "center" ? "van-fade" : "van-popup-slide-".concat(P);
                return createVNode(Transition, {
                    name: T || N,
                    appear: D,
                    onAfterEnter: w,
                    onAfterLeave: y
                }, {
                    default: C
                })
            }
        ;
        return watch(()=>e.show, P=>{
                P && !s && (f(),
                n.tabindex === 0 && nextTick(()=>{
                        var T;
                        (T = l.value) == null || T.focus()
                    }
                )),
                !P && s && (s = !1,
                    r("close"))
            }
        ),
            useExpose({
                popupRef: l
            }),
            useLockScroll(l, ()=>e.show && e.lockScroll),
            useEventListener("popstate", ()=>{
                    e.closeOnPopstate && (m(),
                        a = !1)
                }
            ),
            onMounted(()=>{
                    e.show && f()
                }
            ),
            onActivated(()=>{
                    a && (r("update:show", !0),
                        a = !1)
                }
            ),
            onDeactivated(()=>{
                    e.show && e.teleport && (m(),
                        a = !0)
                }
            ),
            provide(POPUP_TOGGLE_KEY, ()=>e.show),
            ()=>e.teleport ? createVNode(Teleport, {
                to: e.teleport
            }, {
                default: ()=>[_(), B()]
            }) : createVNode(Fragment, null, [_(), B()])
    }
});
const Popup = withInstall(stdin_default$8);
let current = 0;
function useId() {
    const e = getCurrentInstance()
        , {name: r="unknown"} = (e == null ? void 0 : e.type) || {};
    return "".concat(r, "-").concat(++current)
}
let lockCount = 0;
function lockClick(e) {
    e ? (lockCount || document.body.classList.add("van-toast--unclickable"),
        lockCount++) : lockCount && (lockCount--,
    lockCount || document.body.classList.remove("van-toast--unclickable"))
}
const [name$7,bem$7] = createNamespace("toast")
    , popupInheritProps = ["show", "overlay", "teleport", "transition", "overlayClass", "overlayStyle", "closeOnClickOverlay"]
    , toastProps = {
    icon: String,
    show: Boolean,
    type: makeStringProp("text"),
    overlay: Boolean,
    message: numericProp,
    iconSize: numericProp,
    duration: makeNumberProp(2e3),
    position: makeStringProp("middle"),
    teleport: [String, Object],
    wordBreak: String,
    className: unknownProp,
    iconPrefix: String,
    transition: makeStringProp("van-fade"),
    loadingType: String,
    forbidClick: Boolean,
    overlayClass: unknownProp,
    overlayStyle: Object,
    closeOnClick: Boolean,
    closeOnClickOverlay: Boolean
};
var stdin_default$7 = defineComponent({
    name: name$7,
    props: toastProps,
    emits: ["update:show"],
    setup(e, {emit: r, slots: n}) {
        let o, s = !1;
        const a = ()=>{
                const m = e.show && e.forbidClick;
                s !== m && (s = m,
                    lockClick(s))
            }
            , c = m=>r("update:show", m)
            , l = ()=>{
                e.closeOnClick && c(!1)
            }
            , d = ()=>clearTimeout(o)
            , u = ()=>{
                const {icon: m, type: x, iconSize: _, iconPrefix: g, loadingType: E} = e;
                if (m || x === "success" || x === "fail")
                    return createVNode(Icon, {
                        name: m || x,
                        size: _,
                        class: bem$7("icon"),
                        classPrefix: g
                    }, null);
                if (x === "loading")
                    return createVNode(Loading, {
                        class: bem$7("loading"),
                        size: _,
                        type: E
                    }, null)
            }
            , f = ()=>{
                const {type: m, message: x} = e;
                if (n.message)
                    return createVNode("div", {
                        class: bem$7("text")
                    }, [n.message()]);
                if (isDef(x) && x !== "")
                    return m === "html" ? createVNode("div", {
                        key: 0,
                        class: bem$7("text"),
                        innerHTML: String(x)
                    }, null) : createVNode("div", {
                        class: bem$7("text")
                    }, [x])
            }
        ;
        return watch(()=>[e.show, e.forbidClick], a),
            watch(()=>[e.show, e.type, e.message, e.duration], ()=>{
                    d(),
                    e.show && e.duration > 0 && (o = setTimeout(()=>{
                            c(!1)
                        }
                        , e.duration))
                }
            ),
            onMounted(a),
            onUnmounted(a),
            ()=>createVNode(Popup, mergeProps({
                class: [bem$7([e.position, e.wordBreak === "normal" ? "break-normal" : e.wordBreak, {
                    [e.type]: !e.icon
                }]), e.className],
                lockScroll: !1,
                onClick: l,
                onClosed: d,
                "onUpdate:show": c
            }, pick(e, popupInheritProps)), {
                default: ()=>[u(), f()]
            })
    }
});
function usePopupState() {
    const e = reactive({
        show: !1
    })
        , r = s=>{
        e.show = s
    }
        , n = s=>{
        extend$1(e, s, {
            transitionAppear: !0
        }),
            r(!0)
    }
        , o = ()=>r(!1);
    return useExpose({
        open: n,
        close: o,
        toggle: r
    }),
        {
            open: n,
            close: o,
            state: e,
            toggle: r
        }
}
function mountComponent(e) {
    const r = createApp(e)
        , n = document.createElement("div");
    return document.body.appendChild(n),
        {
            instance: r.mount(n),
            unmount() {
                r.unmount(),
                    document.body.removeChild(n)
            }
        }
}
const defaultOptions = {
    icon: "",
    type: "text",
    message: "",
    className: "",
    overlay: !1,
    onClose: void 0,
    onOpened: void 0,
    duration: 2e3,
    teleport: "body",
    iconSize: void 0,
    iconPrefix: void 0,
    position: "middle",
    transition: "van-fade",
    forbidClick: !1,
    loadingType: void 0,
    overlayClass: "",
    overlayStyle: void 0,
    closeOnClick: !1,
    closeOnClickOverlay: !1
};
let queue = []
    , allowMultiple = !1
    , currentOptions$2 = extend$1({}, defaultOptions);
const defaultOptionsMap = new Map;
function parseOptions$1(e) {
    return isObject$1(e) ? e : {
        message: e
    }
}
function createInstance$1() {
    const {instance: e, unmount: r} = mountComponent({
        setup() {
            const n = ref("")
                , {open: o, state: s, close: a, toggle: c} = usePopupState()
                , l = ()=>{}
                , d = ()=>createVNode(stdin_default$7, mergeProps(s, {
                onClosed: l,
                "onUpdate:show": c
            }), null);
            return watch(n, u=>{
                    s.message = u
                }
            ),
                getCurrentInstance().render = d,
                {
                    open: o,
                    close: a,
                    message: n
                }
        }
    });
    return e
}
function getInstance() {
    if (!queue.length || allowMultiple) {
        const e = createInstance$1();
        queue.push(e)
    }
    return queue[queue.length - 1]
}
function showToast(e={}) {
    if (!inBrowser$1)
        return {};
    const r = getInstance()
        , n = parseOptions$1(e);
    return r.open(extend$1({}, currentOptions$2, defaultOptionsMap.get(n.type || currentOptions$2.type), n)),
        r
}
const createMethod = e=>r=>showToast(extend$1({
    type: e
}, parseOptions$1(r)))
    , showSuccessToast = createMethod("success")
    , showFailToast = createMethod("fail");
function setToastDefaultOptions(e, r) {
    typeof e == "string" ? defaultOptionsMap.set(e, r) : extend$1(currentOptions$2, e)
}
withInstall(stdin_default$7);
const [name$6,bem$6] = createNamespace("tag")
    , tagProps = {
    size: String,
    mark: Boolean,
    show: truthProp,
    type: makeStringProp("default"),
    color: String,
    plain: Boolean,
    round: Boolean,
    textColor: String,
    closeable: Boolean
};
var stdin_default$6 = defineComponent({
    name: name$6,
    props: tagProps,
    emits: ["close"],
    setup(e, {slots: r, emit: n}) {
        const o = c=>{
                c.stopPropagation(),
                    n("close", c)
            }
            , s = ()=>e.plain ? {
                color: e.textColor || e.color,
                borderColor: e.color
            } : {
                color: e.textColor,
                background: e.color
            }
            , a = ()=>{
                var c;
                const {type: l, mark: d, plain: u, round: f, size: m, closeable: x} = e
                    , _ = {
                    mark: d,
                    plain: u,
                    round: f
                };
                m && (_[m] = m);
                const g = x && createVNode(Icon, {
                    name: "cross",
                    class: [bem$6("close"), HAPTICS_FEEDBACK],
                    onClick: o
                }, null);
                return createVNode("span", {
                    style: s(),
                    class: bem$6([_, l])
                }, [(c = r.default) == null ? void 0 : c.call(r), g])
            }
        ;
        return ()=>createVNode(Transition, {
            name: e.closeable ? "van-fade" : void 0
        }, {
            default: ()=>[e.show ? a() : null]
        })
    }
});
const Tag = withInstall(stdin_default$6)
    , [name$5,bem$5] = createNamespace("image")
    , imageProps = {
    src: String,
    alt: String,
    fit: String,
    position: String,
    round: Boolean,
    block: Boolean,
    width: numericProp,
    height: numericProp,
    radius: numericProp,
    lazyLoad: Boolean,
    iconSize: numericProp,
    showError: truthProp,
    errorIcon: makeStringProp("photo-fail"),
    iconPrefix: String,
    showLoading: truthProp,
    loadingIcon: makeStringProp("photo")
};
var stdin_default$5 = defineComponent({
    name: name$5,
    props: imageProps,
    emits: ["load", "error"],
    setup(e, {emit: r, slots: n}) {
        const o = ref(!1)
            , s = ref(!0)
            , a = ref()
            , {$Lazyload: c} = getCurrentInstance().proxy
            , l = computed(()=>{
                const b = {
                    width: addUnit(e.width),
                    height: addUnit(e.height)
                };
                return isDef(e.radius) && (b.overflow = "hidden",
                    b.borderRadius = addUnit(e.radius)),
                    b
            }
        );
        watch(()=>e.src, ()=>{
                o.value = !1,
                    s.value = !0
            }
        );
        const d = b=>{
                s.value && (s.value = !1,
                    r("load", b))
            }
            , u = ()=>{
                const b = new Event("load");
                Object.defineProperty(b, "target", {
                    value: a.value,
                    enumerable: !0
                }),
                    d(b)
            }
            , f = b=>{
                o.value = !0,
                    s.value = !1,
                    r("error", b)
            }
            , m = (b,w,y)=>y ? y() : createVNode(Icon, {
                name: b,
                size: e.iconSize,
                class: w,
                classPrefix: e.iconPrefix
            }, null)
            , x = ()=>{
                if (s.value && e.showLoading)
                    return createVNode("div", {
                        class: bem$5("loading")
                    }, [m(e.loadingIcon, bem$5("loading-icon"), n.loading)]);
                if (o.value && e.showError)
                    return createVNode("div", {
                        class: bem$5("error")
                    }, [m(e.errorIcon, bem$5("error-icon"), n.error)])
            }
            , _ = ()=>{
                if (o.value || !e.src)
                    return;
                const b = {
                    alt: e.alt,
                    class: bem$5("img"),
                    style: {
                        objectFit: e.fit,
                        objectPosition: e.position
                    }
                };
                return e.lazyLoad ? withDirectives(createVNode("img", mergeProps({
                    ref: a
                }, b), null), [[resolveDirective("lazy"), e.src]]) : createVNode("img", mergeProps({
                    ref: a,
                    src: e.src,
                    onLoad: d,
                    onError: f
                }, b), null)
            }
            , g = ({el: b})=>{
                const w = ()=>{
                        b === a.value && s.value && u()
                    }
                ;
                a.value ? w() : nextTick(w)
            }
            , E = ({el: b})=>{
                b === a.value && !o.value && f()
            }
        ;
        return c && inBrowser$1 && (c.$on("loaded", g),
            c.$on("error", E),
            onBeforeUnmount(()=>{
                    c.$off("loaded", g),
                        c.$off("error", E)
                }
            )),
            onMounted(()=>{
                    nextTick(()=>{
                            var b;
                            (b = a.value) != null && b.complete && !e.lazyLoad && u()
                        }
                    )
                }
            ),
            ()=>{
                var b;
                return createVNode("div", {
                    class: bem$5({
                        round: e.round,
                        block: e.block
                    }),
                    style: l.value
                }, [_(), x(), (b = n.default) == null ? void 0 : b.call(n)])
            }
    }
});
const Image = withInstall(stdin_default$5)
    , [name$4,bem$4] = createNamespace("empty")
    , emptyProps = {
    image: makeStringProp("default"),
    imageSize: [Number, String, Array],
    description: String
};
var stdin_default$4 = defineComponent({
    name: name$4,
    props: emptyProps,
    setup(e, {slots: r}) {
        const n = ()=>{
                const w = r.description ? r.description() : e.description;
                if (w)
                    return createVNode("p", {
                        class: bem$4("description")
                    }, [w])
            }
            , o = ()=>{
                if (r.default)
                    return createVNode("div", {
                        class: bem$4("bottom")
                    }, [r.default()])
            }
            , s = useId()
            , a = w=>"".concat(s, "-").concat(w)
            , c = w=>"url(#".concat(a(w), ")")
            , l = (w,y,A)=>createVNode("stop", {
                "stop-color": w,
                offset: "".concat(y, "%"),
                "stop-opacity": A
            }, null)
            , d = (w,y)=>[l(w, 0), l(y, 100)]
            , u = w=>[createVNode("defs", null, [createVNode("radialGradient", {
                id: a(w),
                cx: "50%",
                cy: "54%",
                fx: "50%",
                fy: "54%",
                r: "297%",
                gradientTransform: "matrix(-.16 0 0 -.33 .58 .72)"
            }, [l("#EBEDF0", 0), l("#F2F3F5", 100, .3)])]), createVNode("ellipse", {
                fill: c(w),
                opacity: ".8",
                cx: "80",
                cy: "140",
                rx: "46",
                ry: "8"
            }, null)]
            , f = ()=>[createVNode("defs", null, [createVNode("linearGradient", {
                id: a("a"),
                x1: "64%",
                y1: "100%",
                x2: "64%"
            }, [l("#FFF", 0, .5), l("#F2F3F5", 100)])]), createVNode("g", {
                opacity: ".8"
            }, [createVNode("path", {
                d: "M36 131V53H16v20H2v58h34z",
                fill: c("a")
            }, null), createVNode("path", {
                d: "M123 15h22v14h9v77h-31V15z",
                fill: c("a")
            }, null)])]
            , m = ()=>[createVNode("defs", null, [createVNode("linearGradient", {
                id: a("b"),
                x1: "64%",
                y1: "97%",
                x2: "64%",
                y2: "0%"
            }, [l("#F2F3F5", 0, .3), l("#F2F3F5", 100)])]), createVNode("g", {
                opacity: ".8"
            }, [createVNode("path", {
                d: "M87 6c3 0 7 3 8 6a8 8 0 1 1-1 16H80a7 7 0 0 1-8-6c0-4 3-7 6-7 0-5 4-9 9-9Z",
                fill: c("b")
            }, null), createVNode("path", {
                d: "M19 23c2 0 3 1 4 3 2 0 4 2 4 4a4 4 0 0 1-4 3v1h-7v-1l-1 1c-2 0-3-2-3-4 0-1 1-3 3-3 0-2 2-4 4-4Z",
                fill: c("b")
            }, null)])]
            , x = ()=>createVNode("svg", {
                viewBox: "0 0 160 160"
            }, [createVNode("defs", null, [createVNode("linearGradient", {
                id: a(1),
                x1: "64%",
                y1: "100%",
                x2: "64%"
            }, [l("#FFF", 0, .5), l("#F2F3F5", 100)]), createVNode("linearGradient", {
                id: a(2),
                x1: "50%",
                x2: "50%",
                y2: "84%"
            }, [l("#EBEDF0", 0), l("#DCDEE0", 100, 0)]), createVNode("linearGradient", {
                id: a(3),
                x1: "100%",
                x2: "100%",
                y2: "100%"
            }, [d("#EAEDF0", "#DCDEE0")]), createVNode("radialGradient", {
                id: a(4),
                cx: "50%",
                cy: "0%",
                fx: "50%",
                fy: "0%",
                r: "100%",
                gradientTransform: "matrix(0 1 -.54 0 .5 -.5)"
            }, [l("#EBEDF0", 0), l("#FFF", 100, 0)])]), createVNode("g", {
                fill: "none"
            }, [f(), createVNode("path", {
                fill: c(4),
                d: "M0 139h160v21H0z"
            }, null), createVNode("path", {
                d: "M80 54a7 7 0 0 1 3 13v27l-2 2h-2a2 2 0 0 1-2-2V67a7 7 0 0 1 3-13z",
                fill: c(2)
            }, null), createVNode("g", {
                opacity: ".6",
                "stroke-linecap": "round",
                "stroke-width": "7"
            }, [createVNode("path", {
                d: "M64 47a19 19 0 0 0-5 13c0 5 2 10 5 13",
                stroke: c(3)
            }, null), createVNode("path", {
                d: "M53 36a34 34 0 0 0 0 48",
                stroke: c(3)
            }, null), createVNode("path", {
                d: "M95 73a19 19 0 0 0 6-13c0-5-2-9-6-13",
                stroke: c(3)
            }, null), createVNode("path", {
                d: "M106 84a34 34 0 0 0 0-48",
                stroke: c(3)
            }, null)]), createVNode("g", {
                transform: "translate(31 105)"
            }, [createVNode("rect", {
                fill: "#EBEDF0",
                width: "98",
                height: "34",
                rx: "2"
            }, null), createVNode("rect", {
                fill: "#FFF",
                x: "9",
                y: "8",
                width: "80",
                height: "18",
                rx: "1.1"
            }, null), createVNode("rect", {
                fill: "#EBEDF0",
                x: "15",
                y: "12",
                width: "18",
                height: "6",
                rx: "1.1"
            }, null)])])])
            , _ = ()=>createVNode("svg", {
                viewBox: "0 0 160 160"
            }, [createVNode("defs", null, [createVNode("linearGradient", {
                x1: "50%",
                x2: "50%",
                y2: "100%",
                id: a(5)
            }, [d("#F2F3F5", "#DCDEE0")]), createVNode("linearGradient", {
                x1: "95%",
                y1: "48%",
                x2: "5.5%",
                y2: "51%",
                id: a(6)
            }, [d("#EAEDF1", "#DCDEE0")]), createVNode("linearGradient", {
                y1: "45%",
                x2: "100%",
                y2: "54%",
                id: a(7)
            }, [d("#EAEDF1", "#DCDEE0")])]), f(), m(), createVNode("g", {
                transform: "translate(36 50)",
                fill: "none"
            }, [createVNode("g", {
                transform: "translate(8)"
            }, [createVNode("rect", {
                fill: "#EBEDF0",
                opacity: ".6",
                x: "38",
                y: "13",
                width: "36",
                height: "53",
                rx: "2"
            }, null), createVNode("rect", {
                fill: c(5),
                width: "64",
                height: "66",
                rx: "2"
            }, null), createVNode("rect", {
                fill: "#FFF",
                x: "6",
                y: "6",
                width: "52",
                height: "55",
                rx: "1"
            }, null), createVNode("g", {
                transform: "translate(15 17)",
                fill: c(6)
            }, [createVNode("rect", {
                width: "34",
                height: "6",
                rx: "1"
            }, null), createVNode("path", {
                d: "M0 14h34v6H0z"
            }, null), createVNode("rect", {
                y: "28",
                width: "34",
                height: "6",
                rx: "1"
            }, null)])]), createVNode("rect", {
                fill: c(7),
                y: "61",
                width: "88",
                height: "28",
                rx: "1"
            }, null), createVNode("rect", {
                fill: "#F7F8FA",
                x: "29",
                y: "72",
                width: "30",
                height: "6",
                rx: "1"
            }, null)])])
            , g = ()=>createVNode("svg", {
                viewBox: "0 0 160 160"
            }, [createVNode("defs", null, [createVNode("linearGradient", {
                x1: "50%",
                x2: "50%",
                y2: "100%",
                id: a(8)
            }, [d("#EAEDF1", "#DCDEE0")])]), f(), m(), u("c"), createVNode("path", {
                d: "m59 60 21 21 21-21h3l9 9v3L92 93l21 21v3l-9 9h-3l-21-21-21 21h-3l-9-9v-3l21-21-21-21v-3l9-9h3Z",
                fill: c(8)
            }, null)])
            , E = ()=>createVNode("svg", {
                viewBox: "0 0 160 160"
            }, [createVNode("defs", null, [createVNode("linearGradient", {
                x1: "50%",
                y1: "100%",
                x2: "50%",
                id: a(9)
            }, [d("#EEE", "#D8D8D8")]), createVNode("linearGradient", {
                x1: "100%",
                y1: "50%",
                y2: "50%",
                id: a(10)
            }, [d("#F2F3F5", "#DCDEE0")]), createVNode("linearGradient", {
                x1: "50%",
                x2: "50%",
                y2: "100%",
                id: a(11)
            }, [d("#F2F3F5", "#DCDEE0")]), createVNode("linearGradient", {
                x1: "50%",
                x2: "50%",
                y2: "100%",
                id: a(12)
            }, [d("#FFF", "#F7F8FA")])]), f(), m(), u("d"), createVNode("g", {
                transform: "rotate(-45 113 -4)",
                fill: "none"
            }, [createVNode("rect", {
                fill: c(9),
                x: "24",
                y: "52.8",
                width: "5.8",
                height: "19",
                rx: "1"
            }, null), createVNode("rect", {
                fill: c(10),
                x: "22.1",
                y: "67.3",
                width: "9.9",
                height: "28",
                rx: "1"
            }, null), createVNode("circle", {
                stroke: c(11),
                "stroke-width": "8",
                cx: "27",
                cy: "27",
                r: "27"
            }, null), createVNode("circle", {
                fill: c(12),
                cx: "27",
                cy: "27",
                r: "16"
            }, null), createVNode("path", {
                d: "M37 7c-8 0-15 5-16 12",
                stroke: c(11),
                "stroke-width": "3",
                opacity: ".5",
                "stroke-linecap": "round",
                transform: "rotate(45 29 13)"
            }, null)])])
            , b = ()=>{
                var w;
                if (r.image)
                    return r.image();
                const y = {
                    error: g,
                    search: E,
                    network: x,
                    default: _
                };
                return ((w = y[e.image]) == null ? void 0 : w.call(y)) || createVNode("img", {
                    src: e.image
                }, null)
            }
        ;
        return ()=>createVNode("div", {
            class: bem$4()
        }, [createVNode("div", {
            class: bem$4("image"),
            style: getSizeStyle(e.imageSize)
        }, [b()]), n(), o()])
    }
});
const Empty = withInstall(stdin_default$4)
    , [name$3,bem$3,t] = createNamespace("dialog")
    , dialogProps = extend$1({}, popupSharedProps, {
    title: String,
    theme: String,
    width: numericProp,
    message: [String, Function],
    callback: Function,
    allowHtml: Boolean,
    className: unknownProp,
    transition: makeStringProp("van-dialog-bounce"),
    messageAlign: String,
    closeOnPopstate: truthProp,
    showCancelButton: Boolean,
    cancelButtonText: String,
    cancelButtonColor: String,
    cancelButtonDisabled: Boolean,
    confirmButtonText: String,
    confirmButtonColor: String,
    confirmButtonDisabled: Boolean,
    showConfirmButton: truthProp,
    closeOnClickOverlay: Boolean
})
    , popupInheritKeys = [...popupSharedPropKeys, "transition", "closeOnPopstate"];
var stdin_default$3 = defineComponent({
    name: name$3,
    props: dialogProps,
    emits: ["confirm", "cancel", "keydown", "update:show"],
    setup(e, {emit: r, slots: n}) {
        const o = ref()
            , s = reactive({
            confirm: !1,
            cancel: !1
        })
            , a = w=>r("update:show", w)
            , c = w=>{
            var y;
            a(!1),
            (y = e.callback) == null || y.call(e, w)
        }
            , l = w=>()=>{
            e.show && (r(w),
                e.beforeClose ? (s[w] = !0,
                    callInterceptor(e.beforeClose, {
                        args: [w],
                        done() {
                            c(w),
                                s[w] = !1
                        },
                        canceled() {
                            s[w] = !1
                        }
                    })) : c(w))
        }
            , d = l("cancel")
            , u = l("confirm")
            , f = withKeys(w=>{
                var y, A;
                if (w.target !== ((A = (y = o.value) == null ? void 0 : y.popupRef) == null ? void 0 : A.value))
                    return;
                ({
                    Enter: e.showConfirmButton ? u : noop$3,
                    Escape: e.showCancelButton ? d : noop$3
                })[w.key](),
                    r("keydown", w)
            }
            , ["enter", "esc"])
            , m = ()=>{
            const w = n.title ? n.title() : e.title;
            if (w)
                return createVNode("div", {
                    class: bem$3("header", {
                        isolated: !e.message && !n.default
                    })
                }, [w])
        }
            , x = w=>{
            const {message: y, allowHtml: A, messageAlign: C} = e
                , B = bem$3("message", {
                "has-title": w,
                [C]: C
            })
                , P = isFunction$1(y) ? y() : y;
            return A && typeof P == "string" ? createVNode("div", {
                class: B,
                innerHTML: P
            }, null) : createVNode("div", {
                class: B
            }, [P])
        }
            , _ = ()=>{
            if (n.default)
                return createVNode("div", {
                    class: bem$3("content")
                }, [n.default()]);
            const {title: w, message: y, allowHtml: A} = e;
            if (y) {
                const C = !!(w || n.title);
                return createVNode("div", {
                    key: A ? 1 : 0,
                    class: bem$3("content", {
                        isolated: !C
                    })
                }, [x(C)])
            }
        }
            , g = ()=>createVNode("div", {
            class: [BORDER_TOP, bem$3("footer")]
        }, [e.showCancelButton && createVNode(Button, {
            size: "large",
            text: e.cancelButtonText || t("cancel"),
            class: bem$3("cancel"),
            style: {
                color: e.cancelButtonColor
            },
            loading: s.cancel,
            disabled: e.cancelButtonDisabled,
            onClick: d
        }, null), e.showConfirmButton && createVNode(Button, {
            size: "large",
            text: e.confirmButtonText || t("confirm"),
            class: [bem$3("confirm"), {
                [BORDER_LEFT]: e.showCancelButton
            }],
            style: {
                color: e.confirmButtonColor
            },
            loading: s.confirm,
            disabled: e.confirmButtonDisabled,
            onClick: u
        }, null)])
            , E = ()=>createVNode(ActionBar, {
            class: bem$3("footer")
        }, {
            default: ()=>[e.showCancelButton && createVNode(ActionBarButton, {
                type: "warning",
                text: e.cancelButtonText || t("cancel"),
                class: bem$3("cancel"),
                color: e.cancelButtonColor,
                loading: s.cancel,
                disabled: e.cancelButtonDisabled,
                onClick: d
            }, null), e.showConfirmButton && createVNode(ActionBarButton, {
                type: "danger",
                text: e.confirmButtonText || t("confirm"),
                class: bem$3("confirm"),
                color: e.confirmButtonColor,
                loading: s.confirm,
                disabled: e.confirmButtonDisabled,
                onClick: u
            }, null)]
        })
            , b = ()=>n.footer ? n.footer() : e.theme === "round-button" ? E() : g();
        return ()=>{
            const {width: w, title: y, theme: A, message: C, className: B} = e;
            return createVNode(Popup, mergeProps({
                ref: o,
                role: "dialog",
                class: [bem$3([A]), B],
                style: {
                    width: addUnit(w)
                },
                tabindex: 0,
                "aria-labelledby": y || C,
                onKeydown: f,
                "onUpdate:show": a
            }, pick(e, popupInheritKeys)), {
                default: ()=>[m(), _(), b()]
            })
        }
    }
});
let instance$1;
const DEFAULT_OPTIONS = {
    title: "",
    width: "",
    theme: null,
    message: "",
    overlay: !0,
    callback: null,
    teleport: "body",
    className: "",
    allowHtml: !1,
    lockScroll: !0,
    transition: void 0,
    beforeClose: null,
    overlayClass: "",
    overlayStyle: void 0,
    messageAlign: "",
    cancelButtonText: "",
    cancelButtonColor: null,
    cancelButtonDisabled: !1,
    confirmButtonText: "",
    confirmButtonColor: null,
    confirmButtonDisabled: !1,
    showConfirmButton: !0,
    showCancelButton: !1,
    closeOnPopstate: !0,
    closeOnClickOverlay: !1
};
let currentOptions$1 = extend$1({}, DEFAULT_OPTIONS);
function initInstance$1() {
    ({instance: instance$1} = mountComponent({
        setup() {
            const {state: r, toggle: n} = usePopupState();
            return ()=>createVNode(stdin_default$3, mergeProps(r, {
                "onUpdate:show": n
            }), null)
        }
    }))
}
function showDialog(e) {
    return inBrowser$1 ? new Promise((r,n)=>{
            instance$1 || initInstance$1(),
                instance$1.open(extend$1({}, currentOptions$1, e, {
                    callback: o=>{
                        (o === "confirm" ? r : n)(o)
                    }
                }))
        }
    ) : Promise.resolve(void 0)
}
const showConfirmDialog = e=>showDialog(extend$1({
    showCancelButton: !0
}, e))
    , Dialog = withInstall(stdin_default$3)
    , [name$2,bem$2] = createNamespace("notify")
    , notifyProps = extend$1({}, popupSharedProps, {
    type: makeStringProp("danger"),
    color: String,
    message: numericProp,
    position: makeStringProp("top"),
    className: unknownProp,
    background: String,
    lockScroll: Boolean
});
var stdin_default$2 = defineComponent({
    name: name$2,
    props: notifyProps,
    emits: ["update:show"],
    setup(e, {emit: r, slots: n}) {
        const o = s=>r("update:show", s);
        return ()=>createVNode(Popup, {
            show: e.show,
            class: [bem$2([e.type]), e.className],
            style: {
                color: e.color,
                background: e.background
            },
            overlay: !1,
            zIndex: e.zIndex,
            position: e.position,
            duration: .2,
            lockScroll: e.lockScroll,
            "onUpdate:show": o
        }, {
            default: ()=>[n.default ? n.default() : e.message]
        })
    }
});
let timer, instance;
const parseOptions = e=>isObject$1(e) ? e : {
    message: e
};
function initInstance() {
    ({instance} = mountComponent({
        setup() {
            const {state: e, toggle: r} = usePopupState();
            return ()=>createVNode(stdin_default$2, mergeProps(e, {
                "onUpdate:show": r
            }), null)
        }
    }))
}
const getDefaultOptions = ()=>({
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
    background: void 0
});
let currentOptions = getDefaultOptions();
const closeNotify = ()=>{
        instance && instance.toggle(!1)
    }
;
function showNotify(e) {
    if (inBrowser$1)
        return instance || initInstance(),
            e = extend$1({}, currentOptions, parseOptions(e)),
            instance.open(e),
            clearTimeout(timer),
        e.duration > 0 && (timer = setTimeout(closeNotify, e.duration)),
            instance
}
withInstall(stdin_default$2);
const [name$1,bem$1] = createNamespace("tabbar")
    , tabbarProps = {
    route: Boolean,
    fixed: truthProp,
    border: truthProp,
    zIndex: numericProp,
    placeholder: Boolean,
    activeColor: String,
    beforeChange: Function,
    inactiveColor: String,
    modelValue: makeNumericProp(0),
    safeAreaInsetBottom: {
        type: Boolean,
        default: null
    }
}
    , TABBAR_KEY = Symbol(name$1);
var stdin_default$1 = defineComponent({
    name: name$1,
    props: tabbarProps,
    emits: ["change", "update:modelValue"],
    setup(e, {emit: r, slots: n}) {
        const o = ref()
            , {linkChildren: s} = useChildren(TABBAR_KEY)
            , a = usePlaceholder(o, bem$1)
            , c = ()=>{
                var u;
                return (u = e.safeAreaInsetBottom) != null ? u : e.fixed
            }
            , l = ()=>{
                var u;
                const {fixed: f, zIndex: m, border: x} = e;
                return createVNode("div", {
                    ref: o,
                    role: "tablist",
                    style: getZIndexStyle(m),
                    class: [bem$1({
                        fixed: f
                    }), {
                        [BORDER_TOP_BOTTOM]: x,
                        "van-safe-area-bottom": c()
                    }]
                }, [(u = n.default) == null ? void 0 : u.call(n)])
            }
        ;
        return s({
            props: e,
            setActive: (u,f)=>{
                callInterceptor(e.beforeChange, {
                    args: [u],
                    done() {
                        r("update:modelValue", u),
                            r("change", u),
                            f()
                    }
                })
            }
        }),
            ()=>e.fixed && e.placeholder ? a(l) : l()
    }
});
const Tabbar = withInstall(stdin_default$1)
    , [name,bem] = createNamespace("tabbar-item")
    , tabbarItemProps = extend$1({}, routeProps, {
    dot: Boolean,
    icon: String,
    name: numericProp,
    badge: numericProp,
    badgeProps: Object,
    iconPrefix: String
});
var stdin_default = defineComponent({
    name,
    props: tabbarItemProps,
    emits: ["click"],
    setup(e, {emit: r, slots: n}) {
        const o = useRoute$1()
            , s = getCurrentInstance().proxy
            , {parent: a, index: c} = useParent(TABBAR_KEY);
        if (!a)
            return;
        const l = computed(()=>{
                    var f;
                    const {route: m, modelValue: x} = a.props;
                    if (m && "$route"in s) {
                        const {$route: _} = s
                            , {to: g} = e
                            , E = isObject$1(g) ? g : {
                            path: g
                        };
                        return !!_.matched.find(b=>{
                                const w = "path"in E && E.path === b.path
                                    , y = "name"in E && E.name === b.name;
                                return w || y
                            }
                        )
                    }
                    return ((f = e.name) != null ? f : c.value) === x
                }
            )
            , d = f=>{
                var m;
                l.value || a.setActive((m = e.name) != null ? m : c.value, o),
                    r("click", f)
            }
            , u = ()=>{
                if (n.icon)
                    return n.icon({
                        active: l.value
                    });
                if (e.icon)
                    return createVNode(Icon, {
                        name: e.icon,
                        classPrefix: e.iconPrefix
                    }, null)
            }
        ;
        return ()=>{
            var f;
            const {dot: m, badge: x} = e
                , {activeColor: _, inactiveColor: g} = a.props
                , E = l.value ? _ : g;
            return createVNode("div", {
                role: "tab",
                class: bem({
                    active: l.value
                }),
                style: {
                    color: E
                },
                tabindex: 0,
                "aria-selected": l.value,
                onClick: d
            }, [createVNode(Badge, mergeProps({
                dot: m,
                class: bem("icon"),
                content: x
            }, e.badgeProps), {
                default: u
            }), createVNode("div", {
                class: bem("text")
            }, [(f = n.default) == null ? void 0 : f.call(n, {
                active: l.value
            })])])
        }
    }
});
const TabbarItem = withInstall(stdin_default)
    , base = ""
    , index$k = ""
    , _hoisted_1$5 = {
        class: "container"
    }
    , _hoisted_2$4 = {
        class: "wrap"
    }
    , _hoisted_3$4 = {
        class: "title"
    }
    , _sfc_main$9 = defineComponent({
        __name: "Loading",
        props: {
            title: {}
        },
        setup(e) {
            return (r,n)=>{
                const o = Loading;
                return openBlock(),
                    createElementBlock("div", _hoisted_1$5, [createBaseVNode("div", _hoisted_2$4, [createVNode(o, {
                        type: "spinner",
                        color: "#fff"
                    }), createBaseVNode("div", _hoisted_3$4, toDisplayString(r.title), 1)])])
            }
        }
    })
    , Loading_vue_vue_type_style_index_0_scoped_5010c6e8_lang = ""
    , _export_sfc = (e,r)=>{
        const n = e.__vccOpts || e;
        for (const [o,s] of r)
            n[o] = s;
        return n
    }
    , __unplugin_components_0$1 = _export_sfc(_sfc_main$9, [["__scopeId", "data-v-5010c6e8"]])
    , index$j = ""
    , index$i = ""
    , index$h = ""
    , index$g = ""
    , scriptRel = "modulepreload"
    , assetsURL = function(e) {
        return "/" + e
    }
    , seen = {}
    , __vitePreload = function(r, n, o) {
        if (!n || n.length === 0)
            return r();
        const s = document.getElementsByTagName("link");
        return Promise.all(n.map(a=>{
                if (a = assetsURL(a),
                a in seen)
                    return;
                seen[a] = !0;
                const c = a.endsWith(".css")
                    , l = c ? '[rel="stylesheet"]' : "";
                if (!!o)
                    for (let f = s.length - 1; f >= 0; f--) {
                        const m = s[f];
                        if (m.href === a && (!c || m.rel === "stylesheet"))
                            return
                    }
                else if (document.querySelector('link[href="'.concat(a, '"]').concat(l)))
                    return;
                const u = document.createElement("link");
                if (u.rel = c ? "stylesheet" : scriptRel,
                c || (u.as = "script",
                    u.crossOrigin = ""),
                    u.href = a,
                    document.head.appendChild(u),
                    c)
                    return new Promise((f,m)=>{
                            u.addEventListener("load", f),
                                u.addEventListener("error", ()=>m(new Error("Unable to preload CSS for ".concat(a))))
                        }
                    )
            }
        )).then(()=>r()).catch(a=>{
                const c = new Event("vite:preloadError",{
                    cancelable: !0
                });
                if (c.payload = a,
                    window.dispatchEvent(c),
                    !c.defaultPrevented)
                    throw a
            }
        )
    }
    , __variableDynamicImportRuntimeHelper = (e,r)=>{
        const n = e[r];
        return n ? typeof n == "function" ? n() : Promise.resolve(n) : new Promise((o,s)=>{
                (typeof queueMicrotask == "function" ? queueMicrotask : setTimeout)(s.bind(null, new Error("Unknown variable dynamic import: " + r)))
            }
        )
    }
;
var isVue2 = !1;
/*!
 * pinia v2.1.7
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */
let activePinia;
const setActivePinia = e=>activePinia = e
    , piniaSymbol = Symbol();
function isPlainObject$1(e) {
    return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function"
}
var MutationType;
(function(e) {
        e.direct = "direct",
            e.patchObject = "patch object",
            e.patchFunction = "patch function"
    }
)(MutationType || (MutationType = {}));
function createPinia() {
    const e = effectScope(!0)
        , r = e.run(()=>ref({}));
    let n = []
        , o = [];
    const s = markRaw({
        install(a) {
            setActivePinia(s),
                s._a = a,
                a.provide(piniaSymbol, s),
                a.config.globalProperties.$pinia = s,
                o.forEach(c=>n.push(c)),
                o = []
        },
        use(a) {
            return !this._a && !isVue2 ? o.push(a) : n.push(a),
                this
        },
        _p: n,
        _a: null,
        _e: e,
        _s: new Map,
        state: r
    });
    return s
}
const noop$2 = ()=>{}
;
function addSubscription(e, r, n, o=noop$2) {
    e.push(r);
    const s = ()=>{
            const a = e.indexOf(r);
            a > -1 && (e.splice(a, 1),
                o())
        }
    ;
    return !n && getCurrentScope() && onScopeDispose(s),
        s
}
function triggerSubscriptions(e, ...r) {
    e.slice().forEach(n=>{
            n(...r)
        }
    )
}
const fallbackRunWithContext = e=>e();
function mergeReactiveObjects(e, r) {
    e instanceof Map && r instanceof Map && r.forEach((n,o)=>e.set(o, n)),
    e instanceof Set && r instanceof Set && r.forEach(e.add, e);
    for (const n in r) {
        if (!r.hasOwnProperty(n))
            continue;
        const o = r[n]
            , s = e[n];
        isPlainObject$1(s) && isPlainObject$1(o) && e.hasOwnProperty(n) && !isRef(o) && !isReactive(o) ? e[n] = mergeReactiveObjects(s, o) : e[n] = o
    }
    return e
}
const skipHydrateSymbol = Symbol();
function shouldHydrate(e) {
    return !isPlainObject$1(e) || !e.hasOwnProperty(skipHydrateSymbol)
}
const {assign: assign$1} = Object;
function isComputed(e) {
    return !!(isRef(e) && e.effect)
}
function createOptionsStore(e, r, n, o) {
    const {state: s, actions: a, getters: c} = r
        , l = n.state.value[e];
    let d;
    function u() {
        l || (n.state.value[e] = s ? s() : {});
        const f = toRefs(n.state.value[e]);
        return assign$1(f, a, Object.keys(c || {}).reduce((m,x)=>(m[x] = markRaw(computed(()=>{
                setActivePinia(n);
                const _ = n._s.get(e);
                return c[x].call(_, _)
            }
        )),
            m), {}))
    }
    return d = createSetupStore(e, u, r, n, o, !0),
        d
}
function createSetupStore(e, r, n={}, o, s, a) {
    let c;
    const l = assign$1({
        actions: {}
    }, n)
        , d = {
        deep: !0
    };
    let u, f, m = [], x = [], _;
    const g = o.state.value[e];
    !a && !g && (o.state.value[e] = {}),
        ref({});
    let E;
    function b(D) {
        let N;
        u = f = !1,
            typeof D == "function" ? (D(o.state.value[e]),
                N = {
                    type: MutationType.patchFunction,
                    storeId: e,
                    events: _
                }) : (mergeReactiveObjects(o.state.value[e], D),
                N = {
                    type: MutationType.patchObject,
                    payload: D,
                    storeId: e,
                    events: _
                });
        const F = E = Symbol();
        nextTick().then(()=>{
                E === F && (u = !0)
            }
        ),
            f = !0,
            triggerSubscriptions(m, N, o.state.value[e])
    }
    const w = a ? function() {
            const {state: N} = n
                , F = N ? N() : {};
            this.$patch(k=>{
                    assign$1(k, F)
                }
            )
        }
        : noop$2;
    function y() {
        c.stop(),
            m = [],
            x = [],
            o._s.delete(e)
    }
    function A(D, N) {
        return function() {
            setActivePinia(o);
            const F = Array.from(arguments)
                , k = []
                , $ = [];
            function M(J) {
                k.push(J)
            }
            function Q(J) {
                $.push(J)
            }
            triggerSubscriptions(x, {
                args: F,
                name: D,
                store: B,
                after: M,
                onError: Q
            });
            let te;
            try {
                te = N.apply(this && this.$id === e ? this : B, F)
            } catch (J) {
                throw triggerSubscriptions($, J),
                    J
            }
            return te instanceof Promise ? te.then(J=>(triggerSubscriptions(k, J),
                J)).catch(J=>(triggerSubscriptions($, J),
                Promise.reject(J))) : (triggerSubscriptions(k, te),
                te)
        }
    }
    const C = {
        _p: o,
        $id: e,
        $onAction: addSubscription.bind(null, x),
        $patch: b,
        $reset: w,
        $subscribe(D, N={}) {
            const F = addSubscription(m, D, N.detached, ()=>k())
                , k = c.run(()=>watch(()=>o.state.value[e], $=>{
                    (N.flush === "sync" ? f : u) && D({
                        storeId: e,
                        type: MutationType.direct,
                        events: _
                    }, $)
                }
                , assign$1({}, d, N)));
            return F
        },
        $dispose: y
    }
        , B = reactive(C);
    o._s.set(e, B);
    const T = (o._a && o._a.runWithContext || fallbackRunWithContext)(()=>o._e.run(()=>(c = effectScope()).run(r)));
    for (const D in T) {
        const N = T[D];
        if (isRef(N) && !isComputed(N) || isReactive(N))
            a || (g && shouldHydrate(N) && (isRef(N) ? N.value = g[D] : mergeReactiveObjects(N, g[D])),
                o.state.value[e][D] = N);
        else if (typeof N == "function") {
            const F = A(D, N);
            T[D] = F,
                l.actions[D] = N
        }
    }
    return assign$1(B, T),
        assign$1(toRaw(B), T),
        Object.defineProperty(B, "$state", {
            get: ()=>o.state.value[e],
            set: D=>{
                b(N=>{
                        assign$1(N, D)
                    }
                )
            }
        }),
        o._p.forEach(D=>{
                assign$1(B, c.run(()=>D({
                    store: B,
                    app: o._a,
                    pinia: o,
                    options: l
                })))
            }
        ),
    g && a && n.hydrate && n.hydrate(B.$state, g),
        u = !0,
        f = !0,
        B
}
function defineStore(e, r, n) {
    let o, s;
    const a = typeof r == "function";
    typeof e == "string" ? (o = e,
        s = a ? n : r) : (s = e,
        o = e.id);
    function c(l, d) {
        const u = hasInjectionContext();
        return l = l || (u ? inject(piniaSymbol, null) : null),
        l && setActivePinia(l),
            l = activePinia,
        l._s.has(o) || (a ? createSetupStore(o, r, s, l) : createOptionsStore(o, s, l)),
            l._s.get(o)
    }
    return c.$id = o,
        c
}
function storeToRefs(e) {
    {
        e = toRaw(e);
        const r = {};
        for (const n in e) {
            const o = e[n];
            (isRef(o) || isReactive(o)) && (r[n] = toRef(e, n))
        }
        return r
    }
}
/*!
  * vue-router v4.2.5
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */
const isBrowser = typeof window < "u";
function isESModule(e) {
    return e.__esModule || e[Symbol.toStringTag] === "Module"
}
const assign = Object.assign;
function applyToParams(e, r) {
    const n = {};
    for (const o in r) {
        const s = r[o];
        n[o] = isArray$1(s) ? s.map(e) : e(s)
    }
    return n
}
const noop$1 = ()=>{}
    , isArray$1 = Array.isArray
    , TRAILING_SLASH_RE = /\/$/
    , removeTrailingSlash = e=>e.replace(TRAILING_SLASH_RE, "");
function parseURL(e, r, n="/") {
    let o, s = {}, a = "", c = "";
    const l = r.indexOf("#");
    let d = r.indexOf("?");
    return l < d && l >= 0 && (d = -1),
    d > -1 && (o = r.slice(0, d),
        a = r.slice(d + 1, l > -1 ? l : r.length),
        s = e(a)),
    l > -1 && (o = o || r.slice(0, l),
        c = r.slice(l, r.length)),
        o = resolveRelativePath(o != null ? o : r, n),
        {
            fullPath: o + (a && "?") + a + c,
            path: o,
            query: s,
            hash: c
        }
}
function stringifyURL(e, r) {
    const n = r.query ? e(r.query) : "";
    return r.path + (n && "?") + n + (r.hash || "")
}
function stripBase(e, r) {
    return !r || !e.toLowerCase().startsWith(r.toLowerCase()) ? e : e.slice(r.length) || "/"
}
function isSameRouteLocation(e, r, n) {
    const o = r.matched.length - 1
        , s = n.matched.length - 1;
    return o > -1 && o === s && isSameRouteRecord(r.matched[o], n.matched[s]) && isSameRouteLocationParams(r.params, n.params) && e(r.query) === e(n.query) && r.hash === n.hash
}
function isSameRouteRecord(e, r) {
    return (e.aliasOf || e) === (r.aliasOf || r)
}
function isSameRouteLocationParams(e, r) {
    if (Object.keys(e).length !== Object.keys(r).length)
        return !1;
    for (const n in e)
        if (!isSameRouteLocationParamsValue(e[n], r[n]))
            return !1;
    return !0
}
function isSameRouteLocationParamsValue(e, r) {
    return isArray$1(e) ? isEquivalentArray(e, r) : isArray$1(r) ? isEquivalentArray(r, e) : e === r
}
function isEquivalentArray(e, r) {
    return isArray$1(r) ? e.length === r.length && e.every((n,o)=>n === r[o]) : e.length === 1 && e[0] === r
}
function resolveRelativePath(e, r) {
    if (e.startsWith("/"))
        return e;
    if (!e)
        return r;
    const n = r.split("/")
        , o = e.split("/")
        , s = o[o.length - 1];
    (s === ".." || s === ".") && o.push("");
    let a = n.length - 1, c, l;
    for (c = 0; c < o.length; c++)
        if (l = o[c],
        l !== ".")
            if (l === "..")
                a > 1 && a--;
            else
                break;
    return n.slice(0, a).join("/") + "/" + o.slice(c - (c === o.length ? 1 : 0)).join("/")
}
var NavigationType;
(function(e) {
        e.pop = "pop",
            e.push = "push"
    }
)(NavigationType || (NavigationType = {}));
var NavigationDirection;
(function(e) {
        e.back = "back",
            e.forward = "forward",
            e.unknown = ""
    }
)(NavigationDirection || (NavigationDirection = {}));
function normalizeBase(e) {
    if (!e)
        if (isBrowser) {
            const r = document.querySelector("base");
            e = r && r.getAttribute("href") || "/",
                e = e.replace(/^\w+:\/\/[^\/]+/, "")
        } else
            e = "/";
    return e[0] !== "/" && e[0] !== "#" && (e = "/" + e),
        removeTrailingSlash(e)
}
const BEFORE_HASH_RE = /^[^#]+#/;
function createHref(e, r) {
    return e.replace(BEFORE_HASH_RE, "#") + r
}
function getElementPosition(e, r) {
    const n = document.documentElement.getBoundingClientRect()
        , o = e.getBoundingClientRect();
    return {
        behavior: r.behavior,
        left: o.left - n.left - (r.left || 0),
        top: o.top - n.top - (r.top || 0)
    }
}
const computeScrollPosition = ()=>({
    left: window.pageXOffset,
    top: window.pageYOffset
});
function scrollToPosition(e) {
    let r;
    if ("el"in e) {
        const n = e.el
            , o = typeof n == "string" && n.startsWith("#")
            , s = typeof n == "string" ? o ? document.getElementById(n.slice(1)) : document.querySelector(n) : n;
        if (!s)
            return;
        r = getElementPosition(s, e)
    } else
        r = e;
    "scrollBehavior"in document.documentElement.style ? window.scrollTo(r) : window.scrollTo(r.left != null ? r.left : window.pageXOffset, r.top != null ? r.top : window.pageYOffset)
}
function getScrollKey(e, r) {
    return (history.state ? history.state.position - r : -1) + e
}
const scrollPositions = new Map;
function saveScrollPosition(e, r) {
    scrollPositions.set(e, r)
}
function getSavedScrollPosition(e) {
    const r = scrollPositions.get(e);
    return scrollPositions.delete(e),
        r
}
let createBaseLocation = ()=>location.protocol + "//" + location.host;
function createCurrentLocation(e, r) {
    const {pathname: n, search: o, hash: s} = r
        , a = e.indexOf("#");
    if (a > -1) {
        let l = s.includes(e.slice(a)) ? e.slice(a).length : 1
            , d = s.slice(l);
        return d[0] !== "/" && (d = "/" + d),
            stripBase(d, "")
    }
    return stripBase(n, e) + o + s
}
function useHistoryListeners(e, r, n, o) {
    let s = []
        , a = []
        , c = null;
    const l = ({state: x})=>{
            const _ = createCurrentLocation(e, location)
                , g = n.value
                , E = r.value;
            let b = 0;
            if (x) {
                if (n.value = _,
                    r.value = x,
                c && c === g) {
                    c = null;
                    return
                }
                b = E ? x.position - E.position : 0
            } else
                o(_);
            s.forEach(w=>{
                    w(n.value, g, {
                        delta: b,
                        type: NavigationType.pop,
                        direction: b ? b > 0 ? NavigationDirection.forward : NavigationDirection.back : NavigationDirection.unknown
                    })
                }
            )
        }
    ;
    function d() {
        c = n.value
    }
    function u(x) {
        s.push(x);
        const _ = ()=>{
                const g = s.indexOf(x);
                g > -1 && s.splice(g, 1)
            }
        ;
        return a.push(_),
            _
    }
    function f() {
        const {history: x} = window;
        x.state && x.replaceState(assign({}, x.state, {
            scroll: computeScrollPosition()
        }), "")
    }
    function m() {
        for (const x of a)
            x();
        a = [],
            window.removeEventListener("popstate", l),
            window.removeEventListener("beforeunload", f)
    }
    return window.addEventListener("popstate", l),
        window.addEventListener("beforeunload", f, {
            passive: !0
        }),
        {
            pauseListeners: d,
            listen: u,
            destroy: m
        }
}
function buildState(e, r, n, o=!1, s=!1) {
    return {
        back: e,
        current: r,
        forward: n,
        replaced: o,
        position: window.history.length,
        scroll: s ? computeScrollPosition() : null
    }
}
function useHistoryStateNavigation(e) {
    const {history: r, location: n} = window
        , o = {
        value: createCurrentLocation(e, n)
    }
        , s = {
        value: r.state
    };
    s.value || a(o.value, {
        back: null,
        current: o.value,
        forward: null,
        position: r.length - 1,
        replaced: !0,
        scroll: null
    }, !0);
    function a(d, u, f) {
        const m = e.indexOf("#")
            , x = m > -1 ? (n.host && document.querySelector("base") ? e : e.slice(m)) + d : createBaseLocation() + e + d;
        try {
            r[f ? "replaceState" : "pushState"](u, "", x),
                s.value = u
        } catch (_) {
            console.error(_),
                n[f ? "replace" : "assign"](x)
        }
    }
    function c(d, u) {
        const f = assign({}, r.state, buildState(s.value.back, d, s.value.forward, !0), u, {
            position: s.value.position
        });
        a(d, f, !0),
            o.value = d
    }
    function l(d, u) {
        const f = assign({}, s.value, r.state, {
            forward: d,
            scroll: computeScrollPosition()
        });
        a(f.current, f, !0);
        const m = assign({}, buildState(o.value, d, null), {
            position: f.position + 1
        }, u);
        a(d, m, !1),
            o.value = d
    }
    return {
        location: o,
        state: s,
        push: l,
        replace: c
    }
}
function createWebHistory(e) {
    e = normalizeBase(e);
    const r = useHistoryStateNavigation(e)
        , n = useHistoryListeners(e, r.state, r.location, r.replace);
    function o(a, c=!0) {
        c || n.pauseListeners(),
            history.go(a)
    }
    const s = assign({
        location: "",
        base: e,
        go: o,
        createHref: createHref.bind(null, e)
    }, r, n);
    return Object.defineProperty(s, "location", {
        enumerable: !0,
        get: ()=>r.location.value
    }),
        Object.defineProperty(s, "state", {
            enumerable: !0,
            get: ()=>r.state.value
        }),
        s
}
function isRouteLocation(e) {
    return typeof e == "string" || e && typeof e == "object"
}
function isRouteName(e) {
    return typeof e == "string" || typeof e == "symbol"
}
const START_LOCATION_NORMALIZED = {
    path: "/",
    name: void 0,
    params: {},
    query: {},
    hash: "",
    fullPath: "/",
    matched: [],
    meta: {},
    redirectedFrom: void 0
}
    , NavigationFailureSymbol = Symbol("");
var NavigationFailureType;
(function(e) {
        e[e.aborted = 4] = "aborted",
            e[e.cancelled = 8] = "cancelled",
            e[e.duplicated = 16] = "duplicated"
    }
)(NavigationFailureType || (NavigationFailureType = {}));
function createRouterError(e, r) {
    return assign(new Error, {
        type: e,
        [NavigationFailureSymbol]: !0
    }, r)
}
function isNavigationFailure(e, r) {
    return e instanceof Error && NavigationFailureSymbol in e && (r == null || !!(e.type & r))
}
const BASE_PARAM_PATTERN = "[^/]+?"
    , BASE_PATH_PARSER_OPTIONS = {
    sensitive: !1,
    strict: !1,
    start: !0,
    end: !0
}
    , REGEX_CHARS_RE = /[.+*?^${}()[\]/\\]/g;
function tokensToParser(e, r) {
    const n = assign({}, BASE_PATH_PARSER_OPTIONS, r)
        , o = [];
    let s = n.start ? "^" : "";
    const a = [];
    for (const u of e) {
        const f = u.length ? [] : [90];
        n.strict && !u.length && (s += "/");
        for (let m = 0; m < u.length; m++) {
            const x = u[m];
            let _ = 40 + (n.sensitive ? .25 : 0);
            if (x.type === 0)
                m || (s += "/"),
                    s += x.value.replace(REGEX_CHARS_RE, "\\$&"),
                    _ += 40;
            else if (x.type === 1) {
                const {value: g, repeatable: E, optional: b, regexp: w} = x;
                a.push({
                    name: g,
                    repeatable: E,
                    optional: b
                });
                const y = w || BASE_PARAM_PATTERN;
                if (y !== BASE_PARAM_PATTERN) {
                    _ += 10;
                    try {
                        new RegExp("(".concat(y, ")"))
                    } catch (C) {
                        throw new Error('Invalid custom RegExp for param "'.concat(g, '" (').concat(y, "): ") + C.message)
                    }
                }
                let A = E ? "((?:".concat(y, ")(?:/(?:").concat(y, "))*)") : "(".concat(y, ")");
                m || (A = b && u.length < 2 ? "(?:/".concat(A, ")") : "/" + A),
                b && (A += "?"),
                    s += A,
                    _ += 20,
                b && (_ += -8),
                E && (_ += -20),
                y === ".*" && (_ += -50)
            }
            f.push(_)
        }
        o.push(f)
    }
    if (n.strict && n.end) {
        const u = o.length - 1;
        o[u][o[u].length - 1] += .7000000000000001
    }
    n.strict || (s += "/?"),
        n.end ? s += "$" : n.strict && (s += "(?:/|$)");
    const c = new RegExp(s,n.sensitive ? "" : "i");
    function l(u) {
        const f = u.match(c)
            , m = {};
        if (!f)
            return null;
        for (let x = 1; x < f.length; x++) {
            const _ = f[x] || ""
                , g = a[x - 1];
            m[g.name] = _ && g.repeatable ? _.split("/") : _
        }
        return m
    }
    function d(u) {
        let f = ""
            , m = !1;
        for (const x of e) {
            (!m || !f.endsWith("/")) && (f += "/"),
                m = !1;
            for (const _ of x)
                if (_.type === 0)
                    f += _.value;
                else if (_.type === 1) {
                    const {value: g, repeatable: E, optional: b} = _
                        , w = g in u ? u[g] : "";
                    if (isArray$1(w) && !E)
                        throw new Error('Provided param "'.concat(g, '" is an array but it is not repeatable (* or + modifiers)'));
                    const y = isArray$1(w) ? w.join("/") : w;
                    if (!y)
                        if (b)
                            x.length < 2 && (f.endsWith("/") ? f = f.slice(0, -1) : m = !0);
                        else
                            throw new Error('Missing required param "'.concat(g, '"'));
                    f += y
                }
        }
        return f || "/"
    }
    return {
        re: c,
        score: o,
        keys: a,
        parse: l,
        stringify: d
    }
}
function compareScoreArray(e, r) {
    let n = 0;
    for (; n < e.length && n < r.length; ) {
        const o = r[n] - e[n];
        if (o)
            return o;
        n++
    }
    return e.length < r.length ? e.length === 1 && e[0] === 40 + 40 ? -1 : 1 : e.length > r.length ? r.length === 1 && r[0] === 40 + 40 ? 1 : -1 : 0
}
function comparePathParserScore(e, r) {
    let n = 0;
    const o = e.score
        , s = r.score;
    for (; n < o.length && n < s.length; ) {
        const a = compareScoreArray(o[n], s[n]);
        if (a)
            return a;
        n++
    }
    if (Math.abs(s.length - o.length) === 1) {
        if (isLastScoreNegative(o))
            return 1;
        if (isLastScoreNegative(s))
            return -1
    }
    return s.length - o.length
}
function isLastScoreNegative(e) {
    const r = e[e.length - 1];
    return e.length > 0 && r[r.length - 1] < 0
}
const ROOT_TOKEN = {
    type: 0,
    value: ""
}
    , VALID_PARAM_RE = /[a-zA-Z0-9_]/;
function tokenizePath(e) {
    if (!e)
        return [[]];
    if (e === "/")
        return [[ROOT_TOKEN]];
    if (!e.startsWith("/"))
        throw new Error('Invalid path "'.concat(e, '"'));
    function r(_) {
        throw new Error("ERR (".concat(n, ')/"').concat(u, '": ').concat(_))
    }
    let n = 0
        , o = n;
    const s = [];
    let a;
    function c() {
        a && s.push(a),
            a = []
    }
    let l = 0, d, u = "", f = "";
    function m() {
        u && (n === 0 ? a.push({
            type: 0,
            value: u
        }) : n === 1 || n === 2 || n === 3 ? (a.length > 1 && (d === "*" || d === "+") && r("A repeatable param (".concat(u, ") must be alone in its segment. eg: '/:ids+.")),
            a.push({
                type: 1,
                value: u,
                regexp: f,
                repeatable: d === "*" || d === "+",
                optional: d === "*" || d === "?"
            })) : r("Invalid state to consume buffer"),
            u = "")
    }
    function x() {
        u += d
    }
    for (; l < e.length; ) {
        if (d = e[l++],
        d === "\\" && n !== 2) {
            o = n,
                n = 4;
            continue
        }
        switch (n) {
            case 0:
                d === "/" ? (u && m(),
                    c()) : d === ":" ? (m(),
                    n = 1) : x();
                break;
            case 4:
                x(),
                    n = o;
                break;
            case 1:
                d === "(" ? n = 2 : VALID_PARAM_RE.test(d) ? x() : (m(),
                    n = 0,
                d !== "*" && d !== "?" && d !== "+" && l--);
                break;
            case 2:
                d === ")" ? f[f.length - 1] == "\\" ? f = f.slice(0, -1) + d : n = 3 : f += d;
                break;
            case 3:
                m(),
                    n = 0,
                d !== "*" && d !== "?" && d !== "+" && l--,
                    f = "";
                break;
            default:
                r("Unknown state");
                break
        }
    }
    return n === 2 && r('Unfinished custom RegExp for param "'.concat(u, '"')),
        m(),
        c(),
        s
}
function createRouteRecordMatcher(e, r, n) {
    const o = tokensToParser(tokenizePath(e.path), n)
        , s = assign(o, {
        record: e,
        parent: r,
        children: [],
        alias: []
    });
    return r && !s.record.aliasOf == !r.record.aliasOf && r.children.push(s),
        s
}
function createRouterMatcher(e, r) {
    const n = []
        , o = new Map;
    r = mergeOptions({
        strict: !1,
        end: !0,
        sensitive: !1
    }, r);
    function s(f) {
        return o.get(f)
    }
    function a(f, m, x) {
        const _ = !x
            , g = normalizeRouteRecord(f);
        g.aliasOf = x && x.record;
        const E = mergeOptions(r, f)
            , b = [g];
        if ("alias"in f) {
            const A = typeof f.alias == "string" ? [f.alias] : f.alias;
            for (const C of A)
                b.push(assign({}, g, {
                    components: x ? x.record.components : g.components,
                    path: C,
                    aliasOf: x ? x.record : g
                }))
        }
        let w, y;
        for (const A of b) {
            const {path: C} = A;
            if (m && C[0] !== "/") {
                const B = m.record.path
                    , P = B[B.length - 1] === "/" ? "" : "/";
                A.path = m.record.path + (C && P + C)
            }
            if (w = createRouteRecordMatcher(A, m, E),
                x ? x.alias.push(w) : (y = y || w,
                y !== w && y.alias.push(w),
                _ && f.name && !isAliasRecord(w) && c(f.name)),
                g.children) {
                const B = g.children;
                for (let P = 0; P < B.length; P++)
                    a(B[P], w, x && x.children[P])
            }
            x = x || w,
            (w.record.components && Object.keys(w.record.components).length || w.record.name || w.record.redirect) && d(w)
        }
        return y ? ()=>{
                c(y)
            }
            : noop$1
    }
    function c(f) {
        if (isRouteName(f)) {
            const m = o.get(f);
            m && (o.delete(f),
                n.splice(n.indexOf(m), 1),
                m.children.forEach(c),
                m.alias.forEach(c))
        } else {
            const m = n.indexOf(f);
            m > -1 && (n.splice(m, 1),
            f.record.name && o.delete(f.record.name),
                f.children.forEach(c),
                f.alias.forEach(c))
        }
    }
    function l() {
        return n
    }
    function d(f) {
        let m = 0;
        for (; m < n.length && comparePathParserScore(f, n[m]) >= 0 && (f.record.path !== n[m].record.path || !isRecordChildOf(f, n[m])); )
            m++;
        n.splice(m, 0, f),
        f.record.name && !isAliasRecord(f) && o.set(f.record.name, f)
    }
    function u(f, m) {
        let x, _ = {}, g, E;
        if ("name"in f && f.name) {
            if (x = o.get(f.name),
                !x)
                throw createRouterError(1, {
                    location: f
                });
            E = x.record.name,
                _ = assign(paramsFromLocation(m.params, x.keys.filter(y=>!y.optional).map(y=>y.name)), f.params && paramsFromLocation(f.params, x.keys.map(y=>y.name))),
                g = x.stringify(_)
        } else if ("path"in f)
            g = f.path,
                x = n.find(y=>y.re.test(g)),
            x && (_ = x.parse(g),
                E = x.record.name);
        else {
            if (x = m.name ? o.get(m.name) : n.find(y=>y.re.test(m.path)),
                !x)
                throw createRouterError(1, {
                    location: f,
                    currentLocation: m
                });
            E = x.record.name,
                _ = assign({}, m.params, f.params),
                g = x.stringify(_)
        }
        const b = [];
        let w = x;
        for (; w; )
            b.unshift(w.record),
                w = w.parent;
        return {
            name: E,
            path: g,
            params: _,
            matched: b,
            meta: mergeMetaFields(b)
        }
    }
    return e.forEach(f=>a(f)),
        {
            addRoute: a,
            resolve: u,
            removeRoute: c,
            getRoutes: l,
            getRecordMatcher: s
        }
}
function paramsFromLocation(e, r) {
    const n = {};
    for (const o of r)
        o in e && (n[o] = e[o]);
    return n
}
function normalizeRouteRecord(e) {
    return {
        path: e.path,
        redirect: e.redirect,
        name: e.name,
        meta: e.meta || {},
        aliasOf: void 0,
        beforeEnter: e.beforeEnter,
        props: normalizeRecordProps(e),
        children: e.children || [],
        instances: {},
        leaveGuards: new Set,
        updateGuards: new Set,
        enterCallbacks: {},
        components: "components"in e ? e.components || null : e.component && {
            default: e.component
        }
    }
}
function normalizeRecordProps(e) {
    const r = {}
        , n = e.props || !1;
    if ("component"in e)
        r.default = n;
    else
        for (const o in e.components)
            r[o] = typeof n == "object" ? n[o] : n;
    return r
}
function isAliasRecord(e) {
    for (; e; ) {
        if (e.record.aliasOf)
            return !0;
        e = e.parent
    }
    return !1
}
function mergeMetaFields(e) {
    return e.reduce((r,n)=>assign(r, n.meta), {})
}
function mergeOptions(e, r) {
    const n = {};
    for (const o in e)
        n[o] = o in r ? r[o] : e[o];
    return n
}
function isRecordChildOf(e, r) {
    return r.children.some(n=>n === e || isRecordChildOf(e, n))
}
const HASH_RE = /#/g
    , AMPERSAND_RE = /&/g
    , SLASH_RE = /\//g
    , EQUAL_RE = /=/g
    , IM_RE = /\?/g
    , PLUS_RE = /\+/g
    , ENC_BRACKET_OPEN_RE = /%5B/g
    , ENC_BRACKET_CLOSE_RE = /%5D/g
    , ENC_CARET_RE = /%5E/g
    , ENC_BACKTICK_RE = /%60/g
    , ENC_CURLY_OPEN_RE = /%7B/g
    , ENC_PIPE_RE = /%7C/g
    , ENC_CURLY_CLOSE_RE = /%7D/g
    , ENC_SPACE_RE = /%20/g;
function commonEncode(e) {
    return encodeURI("" + e).replace(ENC_PIPE_RE, "|").replace(ENC_BRACKET_OPEN_RE, "[").replace(ENC_BRACKET_CLOSE_RE, "]")
}
function encodeHash(e) {
    return commonEncode(e).replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^")
}
function encodeQueryValue(e) {
    return commonEncode(e).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^")
}
function encodeQueryKey(e) {
    return encodeQueryValue(e).replace(EQUAL_RE, "%3D")
}
function encodePath(e) {
    return commonEncode(e).replace(HASH_RE, "%23").replace(IM_RE, "%3F")
}
function encodeParam(e) {
    return e == null ? "" : encodePath(e).replace(SLASH_RE, "%2F")
}
function decode(e) {
    try {
        return decodeURIComponent("" + e)
    } catch (r) {}
    return "" + e
}
function parseQuery(e) {
    const r = {};
    if (e === "" || e === "?")
        return r;
    const o = (e[0] === "?" ? e.slice(1) : e).split("&");
    for (let s = 0; s < o.length; ++s) {
        const a = o[s].replace(PLUS_RE, " ")
            , c = a.indexOf("=")
            , l = decode(c < 0 ? a : a.slice(0, c))
            , d = c < 0 ? null : decode(a.slice(c + 1));
        if (l in r) {
            let u = r[l];
            isArray$1(u) || (u = r[l] = [u]),
                u.push(d)
        } else
            r[l] = d
    }
    return r
}
function stringifyQuery(e) {
    let r = "";
    for (let n in e) {
        const o = e[n];
        if (n = encodeQueryKey(n),
        o == null) {
            o !== void 0 && (r += (r.length ? "&" : "") + n);
            continue
        }
        (isArray$1(o) ? o.map(a=>a && encodeQueryValue(a)) : [o && encodeQueryValue(o)]).forEach(a=>{
                a !== void 0 && (r += (r.length ? "&" : "") + n,
                a != null && (r += "=" + a))
            }
        )
    }
    return r
}
function normalizeQuery(e) {
    const r = {};
    for (const n in e) {
        const o = e[n];
        o !== void 0 && (r[n] = isArray$1(o) ? o.map(s=>s == null ? null : "" + s) : o == null ? o : "" + o)
    }
    return r
}
const matchedRouteKey = Symbol("")
    , viewDepthKey = Symbol("")
    , routerKey = Symbol("")
    , routeLocationKey = Symbol("")
    , routerViewLocationKey = Symbol("");
function useCallbacks() {
    let e = [];
    function r(o) {
        return e.push(o),
            ()=>{
                const s = e.indexOf(o);
                s > -1 && e.splice(s, 1)
            }
    }
    function n() {
        e = []
    }
    return {
        add: r,
        list: ()=>e.slice(),
        reset: n
    }
}
function registerGuard(e, r, n) {
    const o = ()=>{
            e[r].delete(n)
        }
    ;
    onUnmounted(o),
        onDeactivated(o),
        onActivated(()=>{
                e[r].add(n)
            }
        ),
        e[r].add(n)
}
function onBeforeRouteLeave(e) {
    const r = inject(matchedRouteKey, {}).value;
    r && registerGuard(r, "leaveGuards", e)
}
function guardToPromiseFn(e, r, n, o, s) {
    const a = o && (o.enterCallbacks[s] = o.enterCallbacks[s] || []);
    return ()=>new Promise((c,l)=>{
            const d = m=>{
                m === !1 ? l(createRouterError(4, {
                    from: n,
                    to: r
                })) : m instanceof Error ? l(m) : isRouteLocation(m) ? l(createRouterError(2, {
                    from: r,
                    to: m
                })) : (a && o.enterCallbacks[s] === a && typeof m == "function" && a.push(m),
                    c())
            }
                , u = e.call(o && o.instances[s], r, n, d);
            let f = Promise.resolve(u);
            e.length < 3 && (f = f.then(d)),
                f.catch(m=>l(m))
        }
    )
}
function extractComponentsGuards(e, r, n, o) {
    const s = [];
    for (const a of e)
        for (const c in a.components) {
            let l = a.components[c];
            if (!(r !== "beforeRouteEnter" && !a.instances[c]))
                if (isRouteComponent(l)) {
                    const u = (l.__vccOpts || l)[r];
                    u && s.push(guardToPromiseFn(u, n, o, a, c))
                } else {
                    let d = l();
                    s.push(()=>d.then(u=>{
                            if (!u)
                                return Promise.reject(new Error("Couldn't resolve component \"".concat(c, '" at "').concat(a.path, '"')));
                            const f = isESModule(u) ? u.default : u;
                            a.components[c] = f;
                            const x = (f.__vccOpts || f)[r];
                            return x && guardToPromiseFn(x, n, o, a, c)()
                        }
                    ))
                }
        }
    return s
}
function isRouteComponent(e) {
    return typeof e == "object" || "displayName"in e || "props"in e || "__vccOpts"in e
}
function useLink(e) {
    const r = inject(routerKey)
        , n = inject(routeLocationKey)
        , o = computed(()=>r.resolve(unref(e.to)))
        , s = computed(()=>{
            const {matched: d} = o.value
                , {length: u} = d
                , f = d[u - 1]
                , m = n.matched;
            if (!f || !m.length)
                return -1;
            const x = m.findIndex(isSameRouteRecord.bind(null, f));
            if (x > -1)
                return x;
            const _ = getOriginalPath(d[u - 2]);
            return u > 1 && getOriginalPath(f) === _ && m[m.length - 1].path !== _ ? m.findIndex(isSameRouteRecord.bind(null, d[u - 2])) : x
        }
    )
        , a = computed(()=>s.value > -1 && includesParams(n.params, o.value.params))
        , c = computed(()=>s.value > -1 && s.value === n.matched.length - 1 && isSameRouteLocationParams(n.params, o.value.params));
    function l(d={}) {
        return guardEvent(d) ? r[unref(e.replace) ? "replace" : "push"](unref(e.to)).catch(noop$1) : Promise.resolve()
    }
    return {
        route: o,
        href: computed(()=>o.value.href),
        isActive: a,
        isExactActive: c,
        navigate: l
    }
}
const RouterLinkImpl = defineComponent({
    name: "RouterLink",
    compatConfig: {
        MODE: 3
    },
    props: {
        to: {
            type: [String, Object],
            required: !0
        },
        replace: Boolean,
        activeClass: String,
        exactActiveClass: String,
        custom: Boolean,
        ariaCurrentValue: {
            type: String,
            default: "page"
        }
    },
    useLink,
    setup(e, {slots: r}) {
        const n = reactive(useLink(e))
            , {options: o} = inject(routerKey)
            , s = computed(()=>({
            [getLinkClass(e.activeClass, o.linkActiveClass, "router-link-active")]: n.isActive,
            [getLinkClass(e.exactActiveClass, o.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive
        }));
        return ()=>{
            const a = r.default && r.default(n);
            return e.custom ? a : h("a", {
                "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
                href: n.href,
                onClick: n.navigate,
                class: s.value
            }, a)
        }
    }
})
    , RouterLink = RouterLinkImpl;
function guardEvent(e) {
    if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
        if (e.currentTarget && e.currentTarget.getAttribute) {
            const r = e.currentTarget.getAttribute("target");
            if (/\b_blank\b/i.test(r))
                return
        }
        return e.preventDefault && e.preventDefault(),
            !0
    }
}
function includesParams(e, r) {
    for (const n in r) {
        const o = r[n]
            , s = e[n];
        if (typeof o == "string") {
            if (o !== s)
                return !1
        } else if (!isArray$1(s) || s.length !== o.length || o.some((a,c)=>a !== s[c]))
            return !1
    }
    return !0
}
function getOriginalPath(e) {
    return e ? e.aliasOf ? e.aliasOf.path : e.path : ""
}
const getLinkClass = (e,r,n)=>e != null ? e : r != null ? r : n
    , RouterViewImpl = defineComponent({
    name: "RouterView",
    inheritAttrs: !1,
    props: {
        name: {
            type: String,
            default: "default"
        },
        route: Object
    },
    compatConfig: {
        MODE: 3
    },
    setup(e, {attrs: r, slots: n}) {
        const o = inject(routerViewLocationKey)
            , s = computed(()=>e.route || o.value)
            , a = inject(viewDepthKey, 0)
            , c = computed(()=>{
                let u = unref(a);
                const {matched: f} = s.value;
                let m;
                for (; (m = f[u]) && !m.components; )
                    u++;
                return u
            }
        )
            , l = computed(()=>s.value.matched[c.value]);
        provide(viewDepthKey, computed(()=>c.value + 1)),
            provide(matchedRouteKey, l),
            provide(routerViewLocationKey, s);
        const d = ref();
        return watch(()=>[d.value, l.value, e.name], ([u,f,m],[x,_,g])=>{
                f && (f.instances[m] = u,
                _ && _ !== f && u && u === x && (f.leaveGuards.size || (f.leaveGuards = _.leaveGuards),
                f.updateGuards.size || (f.updateGuards = _.updateGuards))),
                u && f && (!_ || !isSameRouteRecord(f, _) || !x) && (f.enterCallbacks[m] || []).forEach(E=>E(u))
            }
            , {
                flush: "post"
            }),
            ()=>{
                const u = s.value
                    , f = e.name
                    , m = l.value
                    , x = m && m.components[f];
                if (!x)
                    return normalizeSlot(n.default, {
                        Component: x,
                        route: u
                    });
                const _ = m.props[f]
                    , g = _ ? _ === !0 ? u.params : typeof _ == "function" ? _(u) : _ : null
                    , b = h(x, assign({}, g, r, {
                    onVnodeUnmounted: w=>{
                        w.component.isUnmounted && (m.instances[f] = null)
                    }
                    ,
                    ref: d
                }));
                return normalizeSlot(n.default, {
                    Component: b,
                    route: u
                }) || b
            }
    }
});
function normalizeSlot(e, r) {
    if (!e)
        return null;
    const n = e(r);
    return n.length === 1 ? n[0] : n
}
const RouterView = RouterViewImpl;
function createRouter(e) {
    const r = createRouterMatcher(e.routes, e)
        , n = e.parseQuery || parseQuery
        , o = e.stringifyQuery || stringifyQuery
        , s = e.history
        , a = useCallbacks()
        , c = useCallbacks()
        , l = useCallbacks()
        , d = shallowRef(START_LOCATION_NORMALIZED);
    let u = START_LOCATION_NORMALIZED;
    isBrowser && e.scrollBehavior && "scrollRestoration"in history && (history.scrollRestoration = "manual");
    const f = applyToParams.bind(null, L=>"" + L)
        , m = applyToParams.bind(null, encodeParam)
        , x = applyToParams.bind(null, decode);
    function _(L, j) {
        let Y, se;
        return isRouteName(L) ? (Y = r.getRecordMatcher(L),
            se = j) : se = L,
            r.addRoute(se, Y)
    }
    function g(L) {
        const j = r.getRecordMatcher(L);
        j && r.removeRoute(j)
    }
    function E() {
        return r.getRoutes().map(L=>L.record)
    }
    function b(L) {
        return !!r.getRecordMatcher(L)
    }
    function w(L, j) {
        if (j = assign({}, j || d.value),
        typeof L == "string") {
            const O = parseURL(n, L, j.path)
                , q = r.resolve({
                path: O.path
            }, j)
                , U = s.createHref(O.fullPath);
            return assign(O, q, {
                params: x(q.params),
                hash: decode(O.hash),
                redirectedFrom: void 0,
                href: U
            })
        }
        let Y;
        if ("path"in L)
            Y = assign({}, L, {
                path: parseURL(n, L.path, j.path).path
            });
        else {
            const O = assign({}, L.params);
            for (const q in O)
                O[q] == null && delete O[q];
            Y = assign({}, L, {
                params: m(O)
            }),
                j.params = m(j.params)
        }
        const se = r.resolve(Y, j)
            , pe = L.hash || "";
        se.params = f(x(se.params));
        const S = stringifyURL(o, assign({}, L, {
            hash: encodeHash(pe),
            path: se.path
        }))
            , R = s.createHref(S);
        return assign({
            fullPath: S,
            hash: pe,
            query: o === stringifyQuery ? normalizeQuery(L.query) : L.query || {}
        }, se, {
            redirectedFrom: void 0,
            href: R
        })
    }
    function y(L) {
        return typeof L == "string" ? parseURL(n, L, d.value.path) : assign({}, L)
    }
    function A(L, j) {
        if (u !== L)
            return createRouterError(8, {
                from: j,
                to: L
            })
    }
    function C(L) {
        return T(L)
    }
    function B(L) {
        return C(assign(y(L), {
            replace: !0
        }))
    }
    function P(L) {
        const j = L.matched[L.matched.length - 1];
        if (j && j.redirect) {
            const {redirect: Y} = j;
            let se = typeof Y == "function" ? Y(L) : Y;
            return typeof se == "string" && (se = se.includes("?") || se.includes("#") ? se = y(se) : {
                path: se
            },
                se.params = {}),
                assign({
                    query: L.query,
                    hash: L.hash,
                    params: "path"in se ? {} : L.params
                }, se)
        }
    }
    function T(L, j) {
        const Y = u = w(L)
            , se = d.value
            , pe = L.state
            , S = L.force
            , R = L.replace === !0
            , O = P(Y);
        if (O)
            return T(assign(y(O), {
                state: typeof O == "object" ? assign({}, pe, O.state) : pe,
                force: S,
                replace: R
            }), j || Y);
        const q = Y;
        q.redirectedFrom = j;
        let U;
        return !S && isSameRouteLocation(o, se, Y) && (U = createRouterError(16, {
            to: q,
            from: se
        }),
            z(se, se, !0, !1)),
            (U ? Promise.resolve(U) : F(q, se)).catch(W=>isNavigationFailure(W) ? isNavigationFailure(W, 2) ? W : de(W) : ie(W, q, se)).then(W=>{
                    if (W) {
                        if (isNavigationFailure(W, 2))
                            return T(assign({
                                replace: R
                            }, y(W.to), {
                                state: typeof W.to == "object" ? assign({}, pe, W.to.state) : pe,
                                force: S
                            }), j || q)
                    } else
                        W = $(q, se, !0, R, pe);
                    return k(q, se, W),
                        W
                }
            )
    }
    function D(L, j) {
        const Y = A(L, j);
        return Y ? Promise.reject(Y) : Promise.resolve()
    }
    function N(L) {
        const j = I.values().next().value;
        return j && typeof j.runWithContext == "function" ? j.runWithContext(L) : L()
    }
    function F(L, j) {
        let Y;
        const [se,pe,S] = extractChangingRecords(L, j);
        Y = extractComponentsGuards(se.reverse(), "beforeRouteLeave", L, j);
        for (const O of se)
            O.leaveGuards.forEach(q=>{
                    Y.push(guardToPromiseFn(q, L, j))
                }
            );
        const R = D.bind(null, L, j);
        return Y.push(R),
            X(Y).then(()=>{
                    Y = [];
                    for (const O of a.list())
                        Y.push(guardToPromiseFn(O, L, j));
                    return Y.push(R),
                        X(Y)
                }
            ).then(()=>{
                    Y = extractComponentsGuards(pe, "beforeRouteUpdate", L, j);
                    for (const O of pe)
                        O.updateGuards.forEach(q=>{
                                Y.push(guardToPromiseFn(q, L, j))
                            }
                        );
                    return Y.push(R),
                        X(Y)
                }
            ).then(()=>{
                    Y = [];
                    for (const O of S)
                        if (O.beforeEnter)
                            if (isArray$1(O.beforeEnter))
                                for (const q of O.beforeEnter)
                                    Y.push(guardToPromiseFn(q, L, j));
                            else
                                Y.push(guardToPromiseFn(O.beforeEnter, L, j));
                    return Y.push(R),
                        X(Y)
                }
            ).then(()=>(L.matched.forEach(O=>O.enterCallbacks = {}),
                Y = extractComponentsGuards(S, "beforeRouteEnter", L, j),
                Y.push(R),
                X(Y))).then(()=>{
                    Y = [];
                    for (const O of c.list())
                        Y.push(guardToPromiseFn(O, L, j));
                    return Y.push(R),
                        X(Y)
                }
            ).catch(O=>isNavigationFailure(O, 8) ? O : Promise.reject(O))
    }
    function k(L, j, Y) {
        l.list().forEach(se=>N(()=>se(L, j, Y)))
    }
    function $(L, j, Y, se, pe) {
        const S = A(L, j);
        if (S)
            return S;
        const R = j === START_LOCATION_NORMALIZED
            , O = isBrowser ? history.state : {};
        Y && (se || R ? s.replace(L.fullPath, assign({
            scroll: R && O && O.scroll
        }, pe)) : s.push(L.fullPath, pe)),
            d.value = L,
            z(L, j, Y, R),
            de()
    }
    let M;
    function Q() {
        M || (M = s.listen((L,j,Y)=>{
                if (!re.listening)
                    return;
                const se = w(L)
                    , pe = P(se);
                if (pe) {
                    T(assign(pe, {
                        replace: !0
                    }), se).catch(noop$1);
                    return
                }
                u = se;
                const S = d.value;
                isBrowser && saveScrollPosition(getScrollKey(S.fullPath, Y.delta), computeScrollPosition()),
                    F(se, S).catch(R=>isNavigationFailure(R, 12) ? R : isNavigationFailure(R, 2) ? (T(R.to, se).then(O=>{
                            isNavigationFailure(O, 20) && !Y.delta && Y.type === NavigationType.pop && s.go(-1, !1)
                        }
                    ).catch(noop$1),
                        Promise.reject()) : (Y.delta && s.go(-Y.delta, !1),
                        ie(R, se, S))).then(R=>{
                            R = R || $(se, S, !1),
                            R && (Y.delta && !isNavigationFailure(R, 8) ? s.go(-Y.delta, !1) : Y.type === NavigationType.pop && isNavigationFailure(R, 20) && s.go(-1, !1)),
                                k(se, S, R)
                        }
                    ).catch(noop$1)
            }
        ))
    }
    let te = useCallbacks(), J = useCallbacks(), ae;
    function ie(L, j, Y) {
        de(L);
        const se = J.list();
        return se.length ? se.forEach(pe=>pe(L, j, Y)) : console.error(L),
            Promise.reject(L)
    }
    function fe() {
        return ae && d.value !== START_LOCATION_NORMALIZED ? Promise.resolve() : new Promise((L,j)=>{
                te.add([L, j])
            }
        )
    }
    function de(L) {
        return ae || (ae = !L,
            Q(),
            te.list().forEach(([j,Y])=>L ? Y(L) : j()),
            te.reset()),
            L
    }
    function z(L, j, Y, se) {
        const {scrollBehavior: pe} = e;
        if (!isBrowser || !pe)
            return Promise.resolve();
        const S = !Y && getSavedScrollPosition(getScrollKey(L.fullPath, 0)) || (se || !Y) && history.state && history.state.scroll || null;
        return nextTick().then(()=>pe(L, j, S)).then(R=>R && scrollToPosition(R)).catch(R=>ie(R, L, j))
    }
    const V = L=>s.go(L);
    let H;
    const I = new Set
        , re = {
        currentRoute: d,
        listening: !0,
        addRoute: _,
        removeRoute: g,
        hasRoute: b,
        getRoutes: E,
        resolve: w,
        options: e,
        push: C,
        replace: B,
        go: V,
        back: ()=>V(-1),
        forward: ()=>V(1),
        beforeEach: a.add,
        beforeResolve: c.add,
        afterEach: l.add,
        onError: J.add,
        isReady: fe,
        install(L) {
            const j = this;
            L.component("RouterLink", RouterLink),
                L.component("RouterView", RouterView),
                L.config.globalProperties.$router = j,
                Object.defineProperty(L.config.globalProperties, "$route", {
                    enumerable: !0,
                    get: ()=>unref(d)
                }),
            isBrowser && !H && d.value === START_LOCATION_NORMALIZED && (H = !0,
                C(s.location).catch(pe=>{}
                ));
            const Y = {};
            for (const pe in START_LOCATION_NORMALIZED)
                Object.defineProperty(Y, pe, {
                    get: ()=>d.value[pe],
                    enumerable: !0
                });
            L.provide(routerKey, j),
                L.provide(routeLocationKey, shallowReactive(Y)),
                L.provide(routerViewLocationKey, d);
            const se = L.unmount;
            I.add(L),
                L.unmount = function() {
                    I.delete(L),
                    I.size < 1 && (u = START_LOCATION_NORMALIZED,
                    M && M(),
                        M = null,
                        d.value = START_LOCATION_NORMALIZED,
                        H = !1,
                        ae = !1),
                        se()
                }
        }
    };
    function X(L) {
        return L.reduce((j,Y)=>j.then(()=>N(Y)), Promise.resolve())
    }
    return re
}
function extractChangingRecords(e, r) {
    const n = []
        , o = []
        , s = []
        , a = Math.max(r.matched.length, e.matched.length);
    for (let c = 0; c < a; c++) {
        const l = r.matched[c];
        l && (e.matched.find(u=>isSameRouteRecord(u, l)) ? o.push(l) : n.push(l));
        const d = e.matched[c];
        d && (r.matched.find(u=>isSameRouteRecord(u, d)) || s.push(d))
    }
    return [n, o, s]
}
function useRouter() {
    return inject(routerKey)
}
function useRoute() {
    return inject(routeLocationKey)
}
const index$f = ""
    , _sfc_main$8 = {};
function _sfc_render$3(e, r) {
    const n = Empty;
    return openBlock(),
        createBlock(n, {
            image: "error",
            description: "出错了"
        })
}
const NotFoundPage = _export_sfc(_sfc_main$8, [["render", _sfc_render$3]])
    , _sfc_main$7 = {};
function _sfc_render$2(e, r) {
    return null
}
const Index = _export_sfc(_sfc_main$7, [["render", _sfc_render$2]])
    , index$e = "";
var LotteryOptionType = (e=>(e[e.Goods = 1] = "Goods",
    e[e.Coupon = 2] = "Coupon",
    e[e.RedPacket = 3] = "RedPacket",
    e[e.Credit = 4] = "Credit",
    e))(LotteryOptionType || {});
const RewardStateMap = {
    0: {
        str: "待核销",
        theme: "primary"
    },
    1: {
        str: "已领取",
        theme: "success"
    },
    2: {
        str: "付款失败",
        theme: "danger"
    },
    3: {
        str: "等待处理",
        theme: ""
    },
    4: {
        str: "付款异常",
        theme: "danger"
    },
    5: {
        str: "待领取",
        theme: "warning"
    }
};
function bind(e, r) {
    return function() {
        return e.apply(r, arguments)
    }
}
const {toString} = Object.prototype
    , {getPrototypeOf} = Object
    , kindOf = (e=>r=>{
        const n = toString.call(r);
        return e[n] || (e[n] = n.slice(8, -1).toLowerCase())
    }
)(Object.create(null))
    , kindOfTest = e=>(e = e.toLowerCase(),
    r=>kindOf(r) === e)
    , typeOfTest = e=>r=>typeof r === e
    , {isArray} = Array
    , isUndefined = typeOfTest("undefined");
function isBuffer(e) {
    return e !== null && !isUndefined(e) && e.constructor !== null && !isUndefined(e.constructor) && isFunction(e.constructor.isBuffer) && e.constructor.isBuffer(e)
}
const isArrayBuffer = kindOfTest("ArrayBuffer");
function isArrayBufferView(e) {
    let r;
    return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? r = ArrayBuffer.isView(e) : r = e && e.buffer && isArrayBuffer(e.buffer),
        r
}
const isString = typeOfTest("string")
    , isFunction = typeOfTest("function")
    , isNumber = typeOfTest("number")
    , isObject = e=>e !== null && typeof e == "object"
    , isBoolean = e=>e === !0 || e === !1
    , isPlainObject = e=>{
    if (kindOf(e) !== "object")
        return !1;
    const r = getPrototypeOf(e);
    return (r === null || r === Object.prototype || Object.getPrototypeOf(r) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e)
}
    , isDate = kindOfTest("Date")
    , isFile = kindOfTest("File")
    , isBlob = kindOfTest("Blob")
    , isFileList = kindOfTest("FileList")
    , isStream = e=>isObject(e) && isFunction(e.pipe)
    , isFormData = e=>{
    let r;
    return e && (typeof FormData == "function" && e instanceof FormData || isFunction(e.append) && ((r = kindOf(e)) === "formdata" || r === "object" && isFunction(e.toString) && e.toString() === "[object FormData]"))
}
    , isURLSearchParams = kindOfTest("URLSearchParams")
    , trim = e=>e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function forEach(e, r, {allOwnKeys: n=!1}={}) {
    if (e === null || typeof e > "u")
        return;
    let o, s;
    if (typeof e != "object" && (e = [e]),
        isArray(e))
        for (o = 0,
                 s = e.length; o < s; o++)
            r.call(null, e[o], o, e);
    else {
        const a = n ? Object.getOwnPropertyNames(e) : Object.keys(e)
            , c = a.length;
        let l;
        for (o = 0; o < c; o++)
            l = a[o],
                r.call(null, e[l], l, e)
    }
}
function findKey(e, r) {
    r = r.toLowerCase();
    const n = Object.keys(e);
    let o = n.length, s;
    for (; o-- > 0; )
        if (s = n[o],
        r === s.toLowerCase())
            return s;
    return null
}
const _global = (()=>typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global)()
    , isContextDefined = e=>!isUndefined(e) && e !== _global;
function merge() {
    const {caseless: e} = isContextDefined(this) && this || {}
        , r = {}
        , n = (o,s)=>{
            const a = e && findKey(r, s) || s;
            isPlainObject(r[a]) && isPlainObject(o) ? r[a] = merge(r[a], o) : isPlainObject(o) ? r[a] = merge({}, o) : isArray(o) ? r[a] = o.slice() : r[a] = o
        }
    ;
    for (let o = 0, s = arguments.length; o < s; o++)
        arguments[o] && forEach(arguments[o], n);
    return r
}
const extend = (e,r,n,{allOwnKeys: o}={})=>(forEach(r, (s,a)=>{
            n && isFunction(s) ? e[a] = bind(s, n) : e[a] = s
        }
        , {
            allOwnKeys: o
        }),
        e)
    , stripBOM = e=>(e.charCodeAt(0) === 65279 && (e = e.slice(1)),
        e)
    , inherits = (e,r,n,o)=>{
        e.prototype = Object.create(r.prototype, o),
            e.prototype.constructor = e,
            Object.defineProperty(e, "super", {
                value: r.prototype
            }),
        n && Object.assign(e.prototype, n)
    }
    , toFlatObject = (e,r,n,o)=>{
        let s, a, c;
        const l = {};
        if (r = r || {},
        e == null)
            return r;
        do {
            for (s = Object.getOwnPropertyNames(e),
                     a = s.length; a-- > 0; )
                c = s[a],
                (!o || o(c, e, r)) && !l[c] && (r[c] = e[c],
                    l[c] = !0);
            e = n !== !1 && getPrototypeOf(e)
        } while (e && (!n || n(e, r)) && e !== Object.prototype);
        return r
    }
    , endsWith = (e,r,n)=>{
        e = String(e),
        (n === void 0 || n > e.length) && (n = e.length),
            n -= r.length;
        const o = e.indexOf(r, n);
        return o !== -1 && o === n
    }
    , toArray = e=>{
        if (!e)
            return null;
        if (isArray(e))
            return e;
        let r = e.length;
        if (!isNumber(r))
            return null;
        const n = new Array(r);
        for (; r-- > 0; )
            n[r] = e[r];
        return n
    }
    , isTypedArray = (e=>r=>e && r instanceof e)(typeof Uint8Array < "u" && getPrototypeOf(Uint8Array))
    , forEachEntry = (e,r)=>{
        const o = (e && e[Symbol.iterator]).call(e);
        let s;
        for (; (s = o.next()) && !s.done; ) {
            const a = s.value;
            r.call(e, a[0], a[1])
        }
    }
    , matchAll = (e,r)=>{
        let n;
        const o = [];
        for (; (n = e.exec(r)) !== null; )
            o.push(n);
        return o
    }
    , isHTMLForm = kindOfTest("HTMLFormElement")
    , toCamelCase = e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function(n, o, s) {
        return o.toUpperCase() + s
    })
    , hasOwnProperty = (({hasOwnProperty: e})=>(r,n)=>e.call(r, n))(Object.prototype)
    , isRegExp = kindOfTest("RegExp")
    , reduceDescriptors = (e,r)=>{
        const n = Object.getOwnPropertyDescriptors(e)
            , o = {};
        forEach(n, (s,a)=>{
                let c;
                (c = r(s, a, e)) !== !1 && (o[a] = c || s)
            }
        ),
            Object.defineProperties(e, o)
    }
    , freezeMethods = e=>{
        reduceDescriptors(e, (r,n)=>{
                if (isFunction(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
                    return !1;
                const o = e[n];
                if (isFunction(o)) {
                    if (r.enumerable = !1,
                    "writable"in r) {
                        r.writable = !1;
                        return
                    }
                    r.set || (r.set = ()=>{
                            throw Error("Can not rewrite read-only method '" + n + "'")
                        }
                    )
                }
            }
        )
    }
    , toObjectSet = (e,r)=>{
        const n = {}
            , o = s=>{
                s.forEach(a=>{
                        n[a] = !0
                    }
                )
            }
        ;
        return isArray(e) ? o(e) : o(String(e).split(r)),
            n
    }
    , noop = ()=>{}
    , toFiniteNumber = (e,r)=>(e = +e,
        Number.isFinite(e) ? e : r)
    , ALPHA = "abcdefghijklmnopqrstuvwxyz"
    , DIGIT = "0123456789"
    , ALPHABET = {
        DIGIT,
        ALPHA,
        ALPHA_DIGIT: ALPHA + ALPHA.toUpperCase() + DIGIT
    }
    , generateString = (e=16,r=ALPHABET.ALPHA_DIGIT)=>{
        let n = "";
        const {length: o} = r;
        for (; e--; )
            n += r[Math.random() * o | 0];
        return n
    }
;
function isSpecCompliantForm(e) {
    return !!(e && isFunction(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator])
}
const toJSONObject = e=>{
    const r = new Array(10)
        , n = (o,s)=>{
            if (isObject(o)) {
                if (r.indexOf(o) >= 0)
                    return;
                if (!("toJSON"in o)) {
                    r[s] = o;
                    const a = isArray(o) ? [] : {};
                    return forEach(o, (c,l)=>{
                            const d = n(c, s + 1);
                            !isUndefined(d) && (a[l] = d)
                        }
                    ),
                        r[s] = void 0,
                        a
                }
            }
            return o
        }
    ;
    return n(e, 0)
}
    , isAsyncFn = kindOfTest("AsyncFunction")
    , isThenable = e=>e && (isObject(e) || isFunction(e)) && isFunction(e.then) && isFunction(e.catch)
    , utils$1 = {
    isArray,
    isArrayBuffer,
    isBuffer,
    isFormData,
    isArrayBufferView,
    isString,
    isNumber,
    isBoolean,
    isObject,
    isPlainObject,
    isUndefined,
    isDate,
    isFile,
    isBlob,
    isRegExp,
    isFunction,
    isStream,
    isURLSearchParams,
    isTypedArray,
    isFileList,
    forEach,
    merge,
    extend,
    trim,
    stripBOM,
    inherits,
    toFlatObject,
    kindOf,
    kindOfTest,
    endsWith,
    toArray,
    forEachEntry,
    matchAll,
    isHTMLForm,
    hasOwnProperty,
    hasOwnProp: hasOwnProperty,
    reduceDescriptors,
    freezeMethods,
    toObjectSet,
    toCamelCase,
    noop,
    toFiniteNumber,
    findKey,
    global: _global,
    isContextDefined,
    ALPHABET,
    generateString,
    isSpecCompliantForm,
    toJSONObject,
    isAsyncFn,
    isThenable
};
function AxiosError(e, r, n, o, s) {
    Error.call(this),
        Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack,
        this.message = e,
        this.name = "AxiosError",
    r && (this.code = r),
    n && (this.config = n),
    o && (this.request = o),
    s && (this.response = s)
}
utils$1.inherits(AxiosError, Error, {
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
            config: utils$1.toJSONObject(this.config),
            code: this.code,
            status: this.response && this.response.status ? this.response.status : null
        }
    }
});
const prototype$1 = AxiosError.prototype
    , descriptors = {};
["ERR_BAD_OPTION_VALUE", "ERR_BAD_OPTION", "ECONNABORTED", "ETIMEDOUT", "ERR_NETWORK", "ERR_FR_TOO_MANY_REDIRECTS", "ERR_DEPRECATED", "ERR_BAD_RESPONSE", "ERR_BAD_REQUEST", "ERR_CANCELED", "ERR_NOT_SUPPORT", "ERR_INVALID_URL"].forEach(e=>{
        descriptors[e] = {
            value: e
        }
    }
);
Object.defineProperties(AxiosError, descriptors);
Object.defineProperty(prototype$1, "isAxiosError", {
    value: !0
});
AxiosError.from = (e,r,n,o,s,a)=>{
    const c = Object.create(prototype$1);
    return utils$1.toFlatObject(e, c, function(d) {
        return d !== Error.prototype
    }, l=>l !== "isAxiosError"),
        AxiosError.call(c, e.message, r, n, o, s),
        c.cause = e,
        c.name = e.name,
    a && Object.assign(c, a),
        c
}
;
const httpAdapter = null;
function isVisitable(e) {
    return utils$1.isPlainObject(e) || utils$1.isArray(e)
}
function removeBrackets(e) {
    return utils$1.endsWith(e, "[]") ? e.slice(0, -2) : e
}
function renderKey(e, r, n) {
    return e ? e.concat(r).map(function(s, a) {
        return s = removeBrackets(s),
            !n && a ? "[" + s + "]" : s
    }).join(n ? "." : "") : r
}
function isFlatArray(e) {
    return utils$1.isArray(e) && !e.some(isVisitable)
}
const predicates = utils$1.toFlatObject(utils$1, {}, null, function(r) {
    return /^is[A-Z]/.test(r)
});
function toFormData(e, r, n) {
    if (!utils$1.isObject(e))
        throw new TypeError("target must be an object");
    r = r || new FormData,
        n = utils$1.toFlatObject(n, {
            metaTokens: !0,
            dots: !1,
            indexes: !1
        }, !1, function(E, b) {
            return !utils$1.isUndefined(b[E])
        });
    const o = n.metaTokens
        , s = n.visitor || f
        , a = n.dots
        , c = n.indexes
        , d = (n.Blob || typeof Blob < "u" && Blob) && utils$1.isSpecCompliantForm(r);
    if (!utils$1.isFunction(s))
        throw new TypeError("visitor must be a function");
    function u(g) {
        if (g === null)
            return "";
        if (utils$1.isDate(g))
            return g.toISOString();
        if (!d && utils$1.isBlob(g))
            throw new AxiosError("Blob is not supported. Use a Buffer instead.");
        return utils$1.isArrayBuffer(g) || utils$1.isTypedArray(g) ? d && typeof Blob == "function" ? new Blob([g]) : Buffer.from(g) : g
    }
    function f(g, E, b) {
        let w = g;
        if (g && !b && typeof g == "object") {
            if (utils$1.endsWith(E, "{}"))
                E = o ? E : E.slice(0, -2),
                    g = JSON.stringify(g);
            else if (utils$1.isArray(g) && isFlatArray(g) || (utils$1.isFileList(g) || utils$1.endsWith(E, "[]")) && (w = utils$1.toArray(g)))
                return E = removeBrackets(E),
                    w.forEach(function(A, C) {
                        !(utils$1.isUndefined(A) || A === null) && r.append(c === !0 ? renderKey([E], C, a) : c === null ? E : E + "[]", u(A))
                    }),
                    !1
        }
        return isVisitable(g) ? !0 : (r.append(renderKey(b, E, a), u(g)),
            !1)
    }
    const m = []
        , x = Object.assign(predicates, {
        defaultVisitor: f,
        convertValue: u,
        isVisitable
    });
    function _(g, E) {
        if (!utils$1.isUndefined(g)) {
            if (m.indexOf(g) !== -1)
                throw Error("Circular reference detected in " + E.join("."));
            m.push(g),
                utils$1.forEach(g, function(w, y) {
                    (!(utils$1.isUndefined(w) || w === null) && s.call(r, w, utils$1.isString(y) ? y.trim() : y, E, x)) === !0 && _(w, E ? E.concat(y) : [y])
                }),
                m.pop()
        }
    }
    if (!utils$1.isObject(e))
        throw new TypeError("data must be an object");
    return _(e),
        r
}
function encode$1(e) {
    const r = {
        "!": "%21",
        "'": "%27",
        "(": "%28",
        ")": "%29",
        "~": "%7E",
        "%20": "+",
        "%00": "\0"
    };
    return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(o) {
        return r[o]
    })
}
function AxiosURLSearchParams(e, r) {
    this._pairs = [],
    e && toFormData(e, this, r)
}
const prototype = AxiosURLSearchParams.prototype;
prototype.append = function(r, n) {
    this._pairs.push([r, n])
}
;
prototype.toString = function(r) {
    const n = r ? function(o) {
            return r.call(this, o, encode$1)
        }
        : encode$1;
    return this._pairs.map(function(s) {
        return n(s[0]) + "=" + n(s[1])
    }, "").join("&")
}
;
function encode(e) {
    return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]")
}
function buildURL(e, r, n) {
    if (!r)
        return e;
    const o = n && n.encode || encode
        , s = n && n.serialize;
    let a;
    if (s ? a = s(r, n) : a = utils$1.isURLSearchParams(r) ? r.toString() : new AxiosURLSearchParams(r,n).toString(o),
        a) {
        const c = e.indexOf("#");
        c !== -1 && (e = e.slice(0, c)),
            e += (e.indexOf("?") === -1 ? "?" : "&") + a
    }
    return e
}
class InterceptorManager {
    constructor() {
        this.handlers = []
    }
    use(r, n, o) {
        return this.handlers.push({
            fulfilled: r,
            rejected: n,
            synchronous: o ? o.synchronous : !1,
            runWhen: o ? o.runWhen : null
        }),
        this.handlers.length - 1
    }
    eject(r) {
        this.handlers[r] && (this.handlers[r] = null)
    }
    clear() {
        this.handlers && (this.handlers = [])
    }
    forEach(r) {
        utils$1.forEach(this.handlers, function(o) {
            o !== null && r(o)
        })
    }
}
const InterceptorManager$1 = InterceptorManager
    , transitionalDefaults = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1
}
    , URLSearchParams$1 = typeof URLSearchParams < "u" ? URLSearchParams : AxiosURLSearchParams
    , FormData$1 = typeof FormData < "u" ? FormData : null
    , Blob$1 = typeof Blob < "u" ? Blob : null
    , platform$1 = {
    isBrowser: !0,
    classes: {
        URLSearchParams: URLSearchParams$1,
        FormData: FormData$1,
        Blob: Blob$1
    },
    protocols: ["http", "https", "file", "blob", "url", "data"]
}
    , hasBrowserEnv = typeof window < "u" && typeof document < "u"
    , hasStandardBrowserEnv = (e=>hasBrowserEnv && ["ReactNative", "NativeScript", "NS"].indexOf(e) < 0)(typeof navigator < "u" && navigator.product)
    , hasStandardBrowserWebWorkerEnv = (()=>typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope && typeof self.importScripts == "function")()
    , utils = Object.freeze(Object.defineProperty({
    __proto__: null,
    hasBrowserEnv,
    hasStandardBrowserEnv,
    hasStandardBrowserWebWorkerEnv
}, Symbol.toStringTag, {
    value: "Module"
}))
    , platform = {
    ...utils,
    ...platform$1
};
function toURLEncodedForm(e, r) {
    return toFormData(e, new platform.classes.URLSearchParams, Object.assign({
        visitor: function(n, o, s, a) {
            return platform.isNode && utils$1.isBuffer(n) ? (this.append(o, n.toString("base64")),
                !1) : a.defaultVisitor.apply(this, arguments)
        }
    }, r))
}
function parsePropPath(e) {
    return utils$1.matchAll(/\w+|\[(\w*)]/g, e).map(r=>r[0] === "[]" ? "" : r[1] || r[0])
}
function arrayToObject(e) {
    const r = {}
        , n = Object.keys(e);
    let o;
    const s = n.length;
    let a;
    for (o = 0; o < s; o++)
        a = n[o],
            r[a] = e[a];
    return r
}
function formDataToJSON(e) {
    function r(n, o, s, a) {
        let c = n[a++];
        const l = Number.isFinite(+c)
            , d = a >= n.length;
        return c = !c && utils$1.isArray(s) ? s.length : c,
            d ? (utils$1.hasOwnProp(s, c) ? s[c] = [s[c], o] : s[c] = o,
                !l) : ((!s[c] || !utils$1.isObject(s[c])) && (s[c] = []),
            r(n, o, s[c], a) && utils$1.isArray(s[c]) && (s[c] = arrayToObject(s[c])),
                !l)
    }
    if (utils$1.isFormData(e) && utils$1.isFunction(e.entries)) {
        const n = {};
        return utils$1.forEachEntry(e, (o,s)=>{
                r(parsePropPath(o), s, n, 0)
            }
        ),
            n
    }
    return null
}
function stringifySafely(e, r, n) {
    if (utils$1.isString(e))
        try {
            return (r || JSON.parse)(e),
                utils$1.trim(e)
        } catch (o) {
            if (o.name !== "SyntaxError")
                throw o
        }
    return (n || JSON.stringify)(e)
}
const defaults = {
    transitional: transitionalDefaults,
    adapter: ["xhr", "http"],
    transformRequest: [function(r, n) {
        const o = n.getContentType() || ""
            , s = o.indexOf("application/json") > -1
            , a = utils$1.isObject(r);
        if (a && utils$1.isHTMLForm(r) && (r = new FormData(r)),
            utils$1.isFormData(r))
            return s && s ? JSON.stringify(formDataToJSON(r)) : r;
        if (utils$1.isArrayBuffer(r) || utils$1.isBuffer(r) || utils$1.isStream(r) || utils$1.isFile(r) || utils$1.isBlob(r))
            return r;
        if (utils$1.isArrayBufferView(r))
            return r.buffer;
        if (utils$1.isURLSearchParams(r))
            return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1),
                r.toString();
        let l;
        if (a) {
            if (o.indexOf("application/x-www-form-urlencoded") > -1)
                return toURLEncodedForm(r, this.formSerializer).toString();
            if ((l = utils$1.isFileList(r)) || o.indexOf("multipart/form-data") > -1) {
                const d = this.env && this.env.FormData;
                return toFormData(l ? {
                    "files[]": r
                } : r, d && new d, this.formSerializer)
            }
        }
        return a || s ? (n.setContentType("application/json", !1),
            stringifySafely(r)) : r
    }
    ],
    transformResponse: [function(r) {
        const n = this.transitional || defaults.transitional
            , o = n && n.forcedJSONParsing
            , s = this.responseType === "json";
        if (r && utils$1.isString(r) && (o && !this.responseType || s)) {
            const c = !(n && n.silentJSONParsing) && s;
            try {
                return JSON.parse(r)
            } catch (l) {
                if (c)
                    throw l.name === "SyntaxError" ? AxiosError.from(l, AxiosError.ERR_BAD_RESPONSE, this, null, this.response) : l
            }
        }
        return r
    }
    ],
    timeout: 0,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {
        FormData: platform.classes.FormData,
        Blob: platform.classes.Blob
    },
    validateStatus: function(r) {
        return r >= 200 && r < 300
    },
    headers: {
        common: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": void 0
        }
    }
};
utils$1.forEach(["delete", "get", "head", "post", "put", "patch"], e=>{
        defaults.headers[e] = {}
    }
);
const defaults$1 = defaults
    , ignoreDuplicateOf = utils$1.toObjectSet(["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"])
    , parseHeaders = e=>{
    const r = {};
    let n, o, s;
    return e && e.split("\n").forEach(function(c) {
        s = c.indexOf(":"),
            n = c.substring(0, s).trim().toLowerCase(),
            o = c.substring(s + 1).trim(),
        !(!n || r[n] && ignoreDuplicateOf[n]) && (n === "set-cookie" ? r[n] ? r[n].push(o) : r[n] = [o] : r[n] = r[n] ? r[n] + ", " + o : o)
    }),
        r
}
    , $internals = Symbol("internals");
function normalizeHeader(e) {
    return e && String(e).trim().toLowerCase()
}
function normalizeValue(e) {
    return e === !1 || e == null ? e : utils$1.isArray(e) ? e.map(normalizeValue) : String(e)
}
function parseTokens(e) {
    const r = Object.create(null)
        , n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
    let o;
    for (; o = n.exec(e); )
        r[o[1]] = o[2];
    return r
}
const isValidHeaderName = e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function matchHeaderValue(e, r, n, o, s) {
    if (utils$1.isFunction(o))
        return o.call(this, r, n);
    if (s && (r = n),
        !!utils$1.isString(r)) {
        if (utils$1.isString(o))
            return r.indexOf(o) !== -1;
        if (utils$1.isRegExp(o))
            return o.test(r)
    }
}
function formatHeader(e) {
    return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (r,n,o)=>n.toUpperCase() + o)
}
function buildAccessors(e, r) {
    const n = utils$1.toCamelCase(" " + r);
    ["get", "set", "has"].forEach(o=>{
            Object.defineProperty(e, o + n, {
                value: function(s, a, c) {
                    return this[o].call(this, r, s, a, c)
                },
                configurable: !0
            })
        }
    )
}
class AxiosHeaders {
    constructor(r) {
        r && this.set(r)
    }
    set(r, n, o) {
        const s = this;
        function a(l, d, u) {
            const f = normalizeHeader(d);
            if (!f)
                throw new Error("header name must be a non-empty string");
            const m = utils$1.findKey(s, f);
            (!m || s[m] === void 0 || u === !0 || u === void 0 && s[m] !== !1) && (s[m || d] = normalizeValue(l))
        }
        const c = (l,d)=>utils$1.forEach(l, (u,f)=>a(u, f, d));
        return utils$1.isPlainObject(r) || r instanceof this.constructor ? c(r, n) : utils$1.isString(r) && (r = r.trim()) && !isValidHeaderName(r) ? c(parseHeaders(r), n) : r != null && a(n, r, o),
            this
    }
    get(r, n) {
        if (r = normalizeHeader(r),
            r) {
            const o = utils$1.findKey(this, r);
            if (o) {
                const s = this[o];
                if (!n)
                    return s;
                if (n === !0)
                    return parseTokens(s);
                if (utils$1.isFunction(n))
                    return n.call(this, s, o);
                if (utils$1.isRegExp(n))
                    return n.exec(s);
                throw new TypeError("parser must be boolean|regexp|function")
            }
        }
    }
    has(r, n) {
        if (r = normalizeHeader(r),
            r) {
            const o = utils$1.findKey(this, r);
            return !!(o && this[o] !== void 0 && (!n || matchHeaderValue(this, this[o], o, n)))
        }
        return !1
    }
    delete(r, n) {
        const o = this;
        let s = !1;
        function a(c) {
            if (c = normalizeHeader(c),
                c) {
                const l = utils$1.findKey(o, c);
                l && (!n || matchHeaderValue(o, o[l], l, n)) && (delete o[l],
                    s = !0)
            }
        }
        return utils$1.isArray(r) ? r.forEach(a) : a(r),
            s
    }
    clear(r) {
        const n = Object.keys(this);
        let o = n.length
            , s = !1;
        for (; o--; ) {
            const a = n[o];
            (!r || matchHeaderValue(this, this[a], a, r, !0)) && (delete this[a],
                s = !0)
        }
        return s
    }
    normalize(r) {
        const n = this
            , o = {};
        return utils$1.forEach(this, (s,a)=>{
                const c = utils$1.findKey(o, a);
                if (c) {
                    n[c] = normalizeValue(s),
                        delete n[a];
                    return
                }
                const l = r ? formatHeader(a) : String(a).trim();
                l !== a && delete n[a],
                    n[l] = normalizeValue(s),
                    o[l] = !0
            }
        ),
            this
    }
    concat(...r) {
        return this.constructor.concat(this, ...r)
    }
    toJSON(r) {
        const n = Object.create(null);
        return utils$1.forEach(this, (o,s)=>{
                o != null && o !== !1 && (n[s] = r && utils$1.isArray(o) ? o.join(", ") : o)
            }
        ),
            n
    }
    [Symbol.iterator]() {
        return Object.entries(this.toJSON())[Symbol.iterator]()
    }
    toString() {
        return Object.entries(this.toJSON()).map(([r,n])=>r + ": " + n).join("\n")
    }
    get[Symbol.toStringTag]() {
        return "AxiosHeaders"
    }
    static from(r) {
        return r instanceof this ? r : new this(r)
    }
    static concat(r, ...n) {
        const o = new this(r);
        return n.forEach(s=>o.set(s)),
            o
    }
    static accessor(r) {
        const o = (this[$internals] = this[$internals] = {
            accessors: {}
        }).accessors
            , s = this.prototype;
        function a(c) {
            const l = normalizeHeader(c);
            o[l] || (buildAccessors(s, c),
                o[l] = !0)
        }
        return utils$1.isArray(r) ? r.forEach(a) : a(r),
            this
    }
}
AxiosHeaders.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
utils$1.reduceDescriptors(AxiosHeaders.prototype, ({value: e},r)=>{
        let n = r[0].toUpperCase() + r.slice(1);
        return {
            get: ()=>e,
            set(o) {
                this[n] = o
            }
        }
    }
);
utils$1.freezeMethods(AxiosHeaders);
const AxiosHeaders$1 = AxiosHeaders;
function transformData(e, r) {
    const n = this || defaults$1
        , o = r || n
        , s = AxiosHeaders$1.from(o.headers);
    let a = o.data;
    return utils$1.forEach(e, function(l) {
        a = l.call(n, a, s.normalize(), r ? r.status : void 0)
    }),
        s.normalize(),
        a
}
function isCancel(e) {
    return !!(e && e.__CANCEL__)
}
function CanceledError(e, r, n) {
    AxiosError.call(this, e == null ? "canceled" : e, AxiosError.ERR_CANCELED, r, n),
        this.name = "CanceledError"
}
utils$1.inherits(CanceledError, AxiosError, {
    __CANCEL__: !0
});
function settle(e, r, n) {
    const o = n.config.validateStatus;
    !n.status || !o || o(n.status) ? e(n) : r(new AxiosError("Request failed with status code " + n.status,[AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],n.config,n.request,n))
}
const cookies = platform.hasStandardBrowserEnv ? {
    write(e, r, n, o, s, a) {
        const c = [e + "=" + encodeURIComponent(r)];
        utils$1.isNumber(n) && c.push("expires=" + new Date(n).toGMTString()),
        utils$1.isString(o) && c.push("path=" + o),
        utils$1.isString(s) && c.push("domain=" + s),
        a === !0 && c.push("secure"),
            document.cookie = c.join("; ")
    },
    read(e) {
        const r = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
        return r ? decodeURIComponent(r[3]) : null
    },
    remove(e) {
        this.write(e, "", Date.now() - 864e5)
    }
} : {
    write() {},
    read() {
        return null
    },
    remove() {}
};
function isAbsoluteURL(e) {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)
}
function combineURLs(e, r) {
    return r ? e.replace(/\/+$/, "") + "/" + r.replace(/^\/+/, "") : e
}
function buildFullPath(e, r) {
    return e && !isAbsoluteURL(r) ? combineURLs(e, r) : r
}
const isURLSameOrigin = platform.hasStandardBrowserEnv ? function() {
    const r = /(msie|trident)/i.test(navigator.userAgent)
        , n = document.createElement("a");
    let o;
    function s(a) {
        let c = a;
        return r && (n.setAttribute("href", c),
            c = n.href),
            n.setAttribute("href", c),
            {
                href: n.href,
                protocol: n.protocol ? n.protocol.replace(/:$/, "") : "",
                host: n.host,
                search: n.search ? n.search.replace(/^\?/, "") : "",
                hash: n.hash ? n.hash.replace(/^#/, "") : "",
                hostname: n.hostname,
                port: n.port,
                pathname: n.pathname.charAt(0) === "/" ? n.pathname : "/" + n.pathname
            }
    }
    return o = s(window.location.href),
        function(c) {
            const l = utils$1.isString(c) ? s(c) : c;
            return l.protocol === o.protocol && l.host === o.host
        }
}() : function() {
    return function() {
        return !0
    }
}();
function parseProtocol(e) {
    const r = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
    return r && r[1] || ""
}
function speedometer(e, r) {
    e = e || 10;
    const n = new Array(e)
        , o = new Array(e);
    let s = 0, a = 0, c;
    return r = r !== void 0 ? r : 1e3,
        function(d) {
            const u = Date.now()
                , f = o[a];
            c || (c = u),
                n[s] = d,
                o[s] = u;
            let m = a
                , x = 0;
            for (; m !== s; )
                x += n[m++],
                    m = m % e;
            if (s = (s + 1) % e,
            s === a && (a = (a + 1) % e),
            u - c < r)
                return;
            const _ = f && u - f;
            return _ ? Math.round(x * 1e3 / _) : void 0
        }
}
function progressEventReducer(e, r) {
    let n = 0;
    const o = speedometer(50, 250);
    return s=>{
        const a = s.loaded
            , c = s.lengthComputable ? s.total : void 0
            , l = a - n
            , d = o(l)
            , u = a <= c;
        n = a;
        const f = {
            loaded: a,
            total: c,
            progress: c ? a / c : void 0,
            bytes: l,
            rate: d || void 0,
            estimated: d && c && u ? (c - a) / d : void 0,
            event: s
        };
        f[r ? "download" : "upload"] = !0,
            e(f)
    }
}
const isXHRAdapterSupported = typeof XMLHttpRequest < "u"
    , xhrAdapter = isXHRAdapterSupported && function(e) {
    return new Promise(function(n, o) {
            let s = e.data;
            const a = AxiosHeaders$1.from(e.headers).normalize();
            let {responseType: c, withXSRFToken: l} = e, d;
            function u() {
                e.cancelToken && e.cancelToken.unsubscribe(d),
                e.signal && e.signal.removeEventListener("abort", d)
            }
            let f;
            if (utils$1.isFormData(s)) {
                if (platform.hasStandardBrowserEnv || platform.hasStandardBrowserWebWorkerEnv)
                    a.setContentType(!1);
                else if ((f = a.getContentType()) !== !1) {
                    const [E,...b] = f ? f.split(";").map(w=>w.trim()).filter(Boolean) : [];
                    a.setContentType([E || "multipart/form-data", ...b].join("; "))
                }
            }
            let m = new XMLHttpRequest;
            if (e.auth) {
                const E = e.auth.username || ""
                    , b = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : "";
                a.set("Authorization", "Basic " + btoa(E + ":" + b))
            }
            const x = buildFullPath(e.baseURL, e.url);
            m.open(e.method.toUpperCase(), buildURL(x, e.params, e.paramsSerializer), !0),
                m.timeout = e.timeout;
            function _() {
                if (!m)
                    return;
                const E = AxiosHeaders$1.from("getAllResponseHeaders"in m && m.getAllResponseHeaders())
                    , w = {
                    data: !c || c === "text" || c === "json" ? m.responseText : m.response,
                    status: m.status,
                    statusText: m.statusText,
                    headers: E,
                    config: e,
                    request: m
                };
                settle(function(A) {
                    n(A),
                        u()
                }, function(A) {
                    o(A),
                        u()
                }, w),
                    m = null
            }
            if ("onloadend"in m ? m.onloadend = _ : m.onreadystatechange = function() {
                !m || m.readyState !== 4 || m.status === 0 && !(m.responseURL && m.responseURL.indexOf("file:") === 0) || setTimeout(_)
            }
                ,
                m.onabort = function() {
                    m && (o(new AxiosError("Request aborted",AxiosError.ECONNABORTED,e,m)),
                        m = null)
                }
                ,
                m.onerror = function() {
                    o(new AxiosError("Network Error",AxiosError.ERR_NETWORK,e,m)),
                        m = null
                }
                ,
                m.ontimeout = function() {
                    let b = e.timeout ? "timeout of " + e.timeout + "ms exceeded" : "timeout exceeded";
                    const w = e.transitional || transitionalDefaults;
                    e.timeoutErrorMessage && (b = e.timeoutErrorMessage),
                        o(new AxiosError(b,w.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED,e,m)),
                        m = null
                }
                ,
            platform.hasStandardBrowserEnv && (l && utils$1.isFunction(l) && (l = l(e)),
            l || l !== !1 && isURLSameOrigin(x))) {
                const E = e.xsrfHeaderName && e.xsrfCookieName && cookies.read(e.xsrfCookieName);
                E && a.set(e.xsrfHeaderName, E)
            }
            s === void 0 && a.setContentType(null),
            "setRequestHeader"in m && utils$1.forEach(a.toJSON(), function(b, w) {
                m.setRequestHeader(w, b)
            }),
            utils$1.isUndefined(e.withCredentials) || (m.withCredentials = !!e.withCredentials),
            c && c !== "json" && (m.responseType = e.responseType),
            typeof e.onDownloadProgress == "function" && m.addEventListener("progress", progressEventReducer(e.onDownloadProgress, !0)),
            typeof e.onUploadProgress == "function" && m.upload && m.upload.addEventListener("progress", progressEventReducer(e.onUploadProgress)),
            (e.cancelToken || e.signal) && (d = E=>{
                m && (o(!E || E.type ? new CanceledError(null,e,m) : E),
                    m.abort(),
                    m = null)
            }
                ,
            e.cancelToken && e.cancelToken.subscribe(d),
            e.signal && (e.signal.aborted ? d() : e.signal.addEventListener("abort", d)));
            const g = parseProtocol(x);
            if (g && platform.protocols.indexOf(g) === -1) {
                o(new AxiosError("Unsupported protocol " + g + ":",AxiosError.ERR_BAD_REQUEST,e));
                return
            }
            m.send(s || null)
        }
    )
}
    , knownAdapters = {
    http: httpAdapter,
    xhr: xhrAdapter
};
utils$1.forEach(knownAdapters, (e,r)=>{
        if (e) {
            try {
                Object.defineProperty(e, "name", {
                    value: r
                })
            } catch (n) {}
            Object.defineProperty(e, "adapterName", {
                value: r
            })
        }
    }
);
const renderReason = e=>"- ".concat(e)
    , isResolvedHandle = e=>utils$1.isFunction(e) || e === null || e === !1
    , adapters = {
    getAdapter: e=>{
        e = utils$1.isArray(e) ? e : [e];
        const {length: r} = e;
        let n, o;
        const s = {};
        for (let a = 0; a < r; a++) {
            n = e[a];
            let c;
            if (o = n,
            !isResolvedHandle(n) && (o = knownAdapters[(c = String(n)).toLowerCase()],
            o === void 0))
                throw new AxiosError("Unknown adapter '".concat(c, "'"));
            if (o)
                break;
            s[c || "#" + a] = o
        }
        if (!o) {
            const a = Object.entries(s).map(([l,d])=>"adapter ".concat(l, " ") + (d === !1 ? "is not supported by the environment" : "is not available in the build"));
            let c = r ? a.length > 1 ? "since :\n" + a.map(renderReason).join("\n") : " " + renderReason(a[0]) : "as no adapter specified";
            throw new AxiosError("There is no suitable adapter to dispatch the request " + c,"ERR_NOT_SUPPORT")
        }
        return o
    }
    ,
    adapters: knownAdapters
};
function throwIfCancellationRequested(e) {
    if (e.cancelToken && e.cancelToken.throwIfRequested(),
    e.signal && e.signal.aborted)
        throw new CanceledError(null,e)
}
function dispatchRequest(e) {
    return throwIfCancellationRequested(e),
        e.headers = AxiosHeaders$1.from(e.headers),
        e.data = transformData.call(e, e.transformRequest),
    ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1),
        adapters.getAdapter(e.adapter || defaults$1.adapter)(e).then(function(o) {
            return throwIfCancellationRequested(e),
                o.data = transformData.call(e, e.transformResponse, o),
                o.headers = AxiosHeaders$1.from(o.headers),
                o
        }, function(o) {
            return isCancel(o) || (throwIfCancellationRequested(e),
            o && o.response && (o.response.data = transformData.call(e, e.transformResponse, o.response),
                o.response.headers = AxiosHeaders$1.from(o.response.headers))),
                Promise.reject(o)
        })
}
const headersToObject = e=>e instanceof AxiosHeaders$1 ? e.toJSON() : e;
function mergeConfig(e, r) {
    r = r || {};
    const n = {};
    function o(u, f, m) {
        return utils$1.isPlainObject(u) && utils$1.isPlainObject(f) ? utils$1.merge.call({
            caseless: m
        }, u, f) : utils$1.isPlainObject(f) ? utils$1.merge({}, f) : utils$1.isArray(f) ? f.slice() : f
    }
    function s(u, f, m) {
        if (utils$1.isUndefined(f)) {
            if (!utils$1.isUndefined(u))
                return o(void 0, u, m)
        } else
            return o(u, f, m)
    }
    function a(u, f) {
        if (!utils$1.isUndefined(f))
            return o(void 0, f)
    }
    function c(u, f) {
        if (utils$1.isUndefined(f)) {
            if (!utils$1.isUndefined(u))
                return o(void 0, u)
        } else
            return o(void 0, f)
    }
    function l(u, f, m) {
        if (m in r)
            return o(u, f);
        if (m in e)
            return o(void 0, u)
    }
    const d = {
        url: a,
        method: a,
        data: a,
        baseURL: c,
        transformRequest: c,
        transformResponse: c,
        paramsSerializer: c,
        timeout: c,
        timeoutMessage: c,
        withCredentials: c,
        withXSRFToken: c,
        adapter: c,
        responseType: c,
        xsrfCookieName: c,
        xsrfHeaderName: c,
        onUploadProgress: c,
        onDownloadProgress: c,
        decompress: c,
        maxContentLength: c,
        maxBodyLength: c,
        beforeRedirect: c,
        transport: c,
        httpAgent: c,
        httpsAgent: c,
        cancelToken: c,
        socketPath: c,
        responseEncoding: c,
        validateStatus: l,
        headers: (u,f)=>s(headersToObject(u), headersToObject(f), !0)
    };
    return utils$1.forEach(Object.keys(Object.assign({}, e, r)), function(f) {
        const m = d[f] || s
            , x = m(e[f], r[f], f);
        utils$1.isUndefined(x) && m !== l || (n[f] = x)
    }),
        n
}
const VERSION = "1.6.2"
    , validators$1 = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e,r)=>{
        validators$1[e] = function(o) {
            return typeof o === e || "a" + (r < 1 ? "n " : " ") + e
        }
    }
);
const deprecatedWarnings = {};
validators$1.transitional = function(r, n, o) {
    function s(a, c) {
        return "[Axios v" + VERSION + "] Transitional option '" + a + "'" + c + (o ? ". " + o : "")
    }
    return (a,c,l)=>{
        if (r === !1)
            throw new AxiosError(s(c, " has been removed" + (n ? " in " + n : "")),AxiosError.ERR_DEPRECATED);
        return n && !deprecatedWarnings[c] && (deprecatedWarnings[c] = !0,
            console.warn(s(c, " has been deprecated since v" + n + " and will be removed in the near future"))),
            r ? r(a, c, l) : !0
    }
}
;
function assertOptions(e, r, n) {
    if (typeof e != "object")
        throw new AxiosError("options must be an object",AxiosError.ERR_BAD_OPTION_VALUE);
    const o = Object.keys(e);
    let s = o.length;
    for (; s-- > 0; ) {
        const a = o[s]
            , c = r[a];
        if (c) {
            const l = e[a]
                , d = l === void 0 || c(l, a, e);
            if (d !== !0)
                throw new AxiosError("option " + a + " must be " + d,AxiosError.ERR_BAD_OPTION_VALUE);
            continue
        }
        if (n !== !0)
            throw new AxiosError("Unknown option " + a,AxiosError.ERR_BAD_OPTION)
    }
}
const validator = {
    assertOptions,
    validators: validators$1
}
    , validators = validator.validators;
class Axios {
    constructor(r) {
        this.defaults = r,
            this.interceptors = {
                request: new InterceptorManager$1,
                response: new InterceptorManager$1
            }
    }
    request(r, n) {
        typeof r == "string" ? (n = n || {},
            n.url = r) : n = r || {},
            n = mergeConfig(this.defaults, n);
        const {transitional: o, paramsSerializer: s, headers: a} = n;
        o !== void 0 && validator.assertOptions(o, {
            silentJSONParsing: validators.transitional(validators.boolean),
            forcedJSONParsing: validators.transitional(validators.boolean),
            clarifyTimeoutError: validators.transitional(validators.boolean)
        }, !1),
        s != null && (utils$1.isFunction(s) ? n.paramsSerializer = {
            serialize: s
        } : validator.assertOptions(s, {
            encode: validators.function,
            serialize: validators.function
        }, !0)),
            n.method = (n.method || this.defaults.method || "get").toLowerCase();
        let c = a && utils$1.merge(a.common, a[n.method]);
        a && utils$1.forEach(["delete", "get", "head", "post", "put", "patch", "common"], g=>{
                delete a[g]
            }
        ),
            n.headers = AxiosHeaders$1.concat(c, a);
        const l = [];
        let d = !0;
        this.interceptors.request.forEach(function(E) {
            typeof E.runWhen == "function" && E.runWhen(n) === !1 || (d = d && E.synchronous,
                l.unshift(E.fulfilled, E.rejected))
        });
        const u = [];
        this.interceptors.response.forEach(function(E) {
            u.push(E.fulfilled, E.rejected)
        });
        let f, m = 0, x;
        if (!d) {
            const g = [dispatchRequest.bind(this), void 0];
            for (g.unshift.apply(g, l),
                     g.push.apply(g, u),
                     x = g.length,
                     f = Promise.resolve(n); m < x; )
                f = f.then(g[m++], g[m++]);
            return f
        }
        x = l.length;
        let _ = n;
        for (m = 0; m < x; ) {
            const g = l[m++]
                , E = l[m++];
            try {
                _ = g(_)
            } catch (b) {
                E.call(this, b);
                break
            }
        }
        try {
            f = dispatchRequest.call(this, _)
        } catch (g) {
            return Promise.reject(g)
        }
        for (m = 0,
                 x = u.length; m < x; )
            f = f.then(u[m++], u[m++]);
        return f
    }
    getUri(r) {
        r = mergeConfig(this.defaults, r);
        const n = buildFullPath(r.baseURL, r.url);
        return buildURL(n, r.params, r.paramsSerializer)
    }
}
utils$1.forEach(["delete", "get", "head", "options"], function(r) {
    Axios.prototype[r] = function(n, o) {
        return this.request(mergeConfig(o || {}, {
            method: r,
            url: n,
            data: (o || {}).data
        }))
    }
});
utils$1.forEach(["post", "put", "patch"], function(r) {
    function n(o) {
        return function(a, c, l) {
            return this.request(mergeConfig(l || {}, {
                method: r,
                headers: o ? {
                    "Content-Type": "multipart/form-data"
                } : {},
                url: a,
                data: c
            }))
        }
    }
    Axios.prototype[r] = n(),
        Axios.prototype[r + "Form"] = n(!0)
});
const Axios$1 = Axios;
class CancelToken {
    constructor(r) {
        if (typeof r != "function")
            throw new TypeError("executor must be a function.");
        let n;
        this.promise = new Promise(function(a) {
                n = a
            }
        );
        const o = this;
        this.promise.then(s=>{
                if (!o._listeners)
                    return;
                let a = o._listeners.length;
                for (; a-- > 0; )
                    o._listeners[a](s);
                o._listeners = null
            }
        ),
            this.promise.then = s=>{
                let a;
                const c = new Promise(l=>{
                        o.subscribe(l),
                            a = l
                    }
                ).then(s);
                return c.cancel = function() {
                    o.unsubscribe(a)
                }
                    ,
                    c
            }
            ,
            r(function(a, c, l) {
                o.reason || (o.reason = new CanceledError(a,c,l),
                    n(o.reason))
            })
    }
    throwIfRequested() {
        if (this.reason)
            throw this.reason
    }
    subscribe(r) {
        if (this.reason) {
            r(this.reason);
            return
        }
        this._listeners ? this._listeners.push(r) : this._listeners = [r]
    }
    unsubscribe(r) {
        if (!this._listeners)
            return;
        const n = this._listeners.indexOf(r);
        n !== -1 && this._listeners.splice(n, 1)
    }
    static source() {
        let r;
        return {
            token: new CancelToken(function(s) {
                    r = s
                }
            ),
            cancel: r
        }
    }
}
const CancelToken$1 = CancelToken;
function spread(e) {
    return function(n) {
        return e.apply(null, n)
    }
}
function isAxiosError(e) {
    return utils$1.isObject(e) && e.isAxiosError === !0
}
const HttpStatusCode = {
    Continue: 100,
    SwitchingProtocols: 101,
    Processing: 102,
    EarlyHints: 103,
    Ok: 200,
    Created: 201,
    Accepted: 202,
    NonAuthoritativeInformation: 203,
    NoContent: 204,
    ResetContent: 205,
    PartialContent: 206,
    MultiStatus: 207,
    AlreadyReported: 208,
    ImUsed: 226,
    MultipleChoices: 300,
    MovedPermanently: 301,
    Found: 302,
    SeeOther: 303,
    NotModified: 304,
    UseProxy: 305,
    Unused: 306,
    TemporaryRedirect: 307,
    PermanentRedirect: 308,
    BadRequest: 400,
    Unauthorized: 401,
    PaymentRequired: 402,
    Forbidden: 403,
    NotFound: 404,
    MethodNotAllowed: 405,
    NotAcceptable: 406,
    ProxyAuthenticationRequired: 407,
    RequestTimeout: 408,
    Conflict: 409,
    Gone: 410,
    LengthRequired: 411,
    PreconditionFailed: 412,
    PayloadTooLarge: 413,
    UriTooLong: 414,
    UnsupportedMediaType: 415,
    RangeNotSatisfiable: 416,
    ExpectationFailed: 417,
    ImATeapot: 418,
    MisdirectedRequest: 421,
    UnprocessableEntity: 422,
    Locked: 423,
    FailedDependency: 424,
    TooEarly: 425,
    UpgradeRequired: 426,
    PreconditionRequired: 428,
    TooManyRequests: 429,
    RequestHeaderFieldsTooLarge: 431,
    UnavailableForLegalReasons: 451,
    InternalServerError: 500,
    NotImplemented: 501,
    BadGateway: 502,
    ServiceUnavailable: 503,
    GatewayTimeout: 504,
    HttpVersionNotSupported: 505,
    VariantAlsoNegotiates: 506,
    InsufficientStorage: 507,
    LoopDetected: 508,
    NotExtended: 510,
    NetworkAuthenticationRequired: 511
};
Object.entries(HttpStatusCode).forEach(([e,r])=>{
        HttpStatusCode[r] = e
    }
);
const HttpStatusCode$1 = HttpStatusCode;
function createInstance(e) {
    const r = new Axios$1(e)
        , n = bind(Axios$1.prototype.request, r);
    return utils$1.extend(n, Axios$1.prototype, r, {
        allOwnKeys: !0
    }),
        utils$1.extend(n, r, null, {
            allOwnKeys: !0
        }),
        n.create = function(s) {
            return createInstance(mergeConfig(e, s))
        }
        ,
        n
}
const axios = createInstance(defaults$1);
axios.Axios = Axios$1;
axios.CanceledError = CanceledError;
axios.CancelToken = CancelToken$1;
axios.isCancel = isCancel;
axios.VERSION = VERSION;
axios.toFormData = toFormData;
axios.AxiosError = AxiosError;
axios.Cancel = axios.CanceledError;
axios.all = function(r) {
    return Promise.all(r)
}
;
axios.spread = spread;
axios.isAxiosError = isAxiosError;
axios.mergeConfig = mergeConfig;
axios.AxiosHeaders = AxiosHeaders$1;
axios.formToJSON = e=>formDataToJSON(utils$1.isHTMLForm(e) ? new FormData(e) : e);
axios.getAdapter = adapters.getAdapter;
axios.HttpStatusCode = HttpStatusCode$1;
axios.default = axios;
const axios$1 = axios;
var commonjsGlobal = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function getDefaultExportFromCjs(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e
}
function getAugmentedNamespace(e) {
    if (e.__esModule)
        return e;
    var r = e.default;
    if (typeof r == "function") {
        var n = function o() {
            return this instanceof o ? Reflect.construct(r, arguments, this.constructor) : r.apply(this, arguments)
        };
        n.prototype = r.prototype
    } else
        n = {};
    return Object.defineProperty(n, "__esModule", {
        value: !0
    }),
        Object.keys(e).forEach(function(o) {
            var s = Object.getOwnPropertyDescriptor(e, o);
            Object.defineProperty(n, o, s.get ? s : {
                enumerable: !0,
                get: function() {
                    return e[o]
                }
            })
        }),
        n
}
var cryptoJs = {
    exports: {}
};
function commonjsRequire(e) {
    throw new Error('Could not dynamically require "' + e + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')
}
var core = {
    exports: {}
};
const __viteBrowserExternal = {}
    , __viteBrowserExternal$1 = Object.freeze(Object.defineProperty({
    __proto__: null,
    default: __viteBrowserExternal
}, Symbol.toStringTag, {
    value: "Module"
}))
    , require$$0 = getAugmentedNamespace(__viteBrowserExternal$1);
var hasRequiredCore;
function requireCore() {
    return hasRequiredCore || (hasRequiredCore = 1,
        function(e, r) {
            (function(n, o) {
                    e.exports = o()
                }
            )(commonjsGlobal, function() {
                var n = n || function(o, s) {
                    var a;
                    if (typeof window < "u" && window.crypto && (a = window.crypto),
                    typeof self < "u" && self.crypto && (a = self.crypto),
                    typeof globalThis < "u" && globalThis.crypto && (a = globalThis.crypto),
                    !a && typeof window < "u" && window.msCrypto && (a = window.msCrypto),
                    !a && typeof commonjsGlobal < "u" && commonjsGlobal.crypto && (a = commonjsGlobal.crypto),
                    !a && typeof commonjsRequire == "function")
                        try {
                            a = require$$0
                        } catch (y) {}
                    var c = function() {
                        if (a) {
                            if (typeof a.getRandomValues == "function")
                                try {
                                    return a.getRandomValues(new Uint32Array(1))[0]
                                } catch (y) {}
                            if (typeof a.randomBytes == "function")
                                try {
                                    return a.randomBytes(4).readInt32LE()
                                } catch (y) {}
                        }
                        throw new Error("Native crypto module could not be used to get secure random number.")
                    }
                        , l = Object.create || function() {
                        function y() {}
                        return function(A) {
                            var C;
                            return y.prototype = A,
                                C = new y,
                                y.prototype = null,
                                C
                        }
                    }()
                        , d = {}
                        , u = d.lib = {}
                        , f = u.Base = function() {
                        return {
                            extend: function(y) {
                                var A = l(this);
                                return y && A.mixIn(y),
                                (!A.hasOwnProperty("init") || this.init === A.init) && (A.init = function() {
                                        A.$super.init.apply(this, arguments)
                                    }
                                ),
                                    A.init.prototype = A,
                                    A.$super = this,
                                    A
                            },
                            create: function() {
                                var y = this.extend();
                                return y.init.apply(y, arguments),
                                    y
                            },
                            init: function() {},
                            mixIn: function(y) {
                                for (var A in y)
                                    y.hasOwnProperty(A) && (this[A] = y[A]);
                                y.hasOwnProperty("toString") && (this.toString = y.toString)
                            },
                            clone: function() {
                                return this.init.prototype.extend(this)
                            }
                        }
                    }()
                        , m = u.WordArray = f.extend({
                        init: function(y, A) {
                            y = this.words = y || [],
                                A != s ? this.sigBytes = A : this.sigBytes = y.length * 4
                        },
                        toString: function(y) {
                            return (y || _).stringify(this)
                        },
                        concat: function(y) {
                            var A = this.words
                                , C = y.words
                                , B = this.sigBytes
                                , P = y.sigBytes;
                            if (this.clamp(),
                            B % 4)
                                for (var T = 0; T < P; T++) {
                                    var D = C[T >>> 2] >>> 24 - T % 4 * 8 & 255;
                                    A[B + T >>> 2] |= D << 24 - (B + T) % 4 * 8
                                }
                            else
                                for (var N = 0; N < P; N += 4)
                                    A[B + N >>> 2] = C[N >>> 2];
                            return this.sigBytes += P,
                                this
                        },
                        clamp: function() {
                            var y = this.words
                                , A = this.sigBytes;
                            y[A >>> 2] &= 4294967295 << 32 - A % 4 * 8,
                                y.length = o.ceil(A / 4)
                        },
                        clone: function() {
                            var y = f.clone.call(this);
                            return y.words = this.words.slice(0),
                                y
                        },
                        random: function(y) {
                            for (var A = [], C = 0; C < y; C += 4)
                                A.push(c());
                            return new m.init(A,y)
                        }
                    })
                        , x = d.enc = {}
                        , _ = x.Hex = {
                        stringify: function(y) {
                            for (var A = y.words, C = y.sigBytes, B = [], P = 0; P < C; P++) {
                                var T = A[P >>> 2] >>> 24 - P % 4 * 8 & 255;
                                B.push((T >>> 4).toString(16)),
                                    B.push((T & 15).toString(16))
                            }
                            return B.join("")
                        },
                        parse: function(y) {
                            for (var A = y.length, C = [], B = 0; B < A; B += 2)
                                C[B >>> 3] |= parseInt(y.substr(B, 2), 16) << 24 - B % 8 * 4;
                            return new m.init(C,A / 2)
                        }
                    }
                        , g = x.Latin1 = {
                        stringify: function(y) {
                            for (var A = y.words, C = y.sigBytes, B = [], P = 0; P < C; P++) {
                                var T = A[P >>> 2] >>> 24 - P % 4 * 8 & 255;
                                B.push(String.fromCharCode(T))
                            }
                            return B.join("")
                        },
                        parse: function(y) {
                            for (var A = y.length, C = [], B = 0; B < A; B++)
                                C[B >>> 2] |= (y.charCodeAt(B) & 255) << 24 - B % 4 * 8;
                            return new m.init(C,A)
                        }
                    }
                        , E = x.Utf8 = {
                        stringify: function(y) {
                            try {
                                return decodeURIComponent(escape(g.stringify(y)))
                            } catch (A) {
                                throw new Error("Malformed UTF-8 data")
                            }
                        },
                        parse: function(y) {
                            return g.parse(unescape(encodeURIComponent(y)))
                        }
                    }
                        , b = u.BufferedBlockAlgorithm = f.extend({
                        reset: function() {
                            this._data = new m.init,
                                this._nDataBytes = 0
                        },
                        _append: function(y) {
                            typeof y == "string" && (y = E.parse(y)),
                                this._data.concat(y),
                                this._nDataBytes += y.sigBytes
                        },
                        _process: function(y) {
                            var A, C = this._data, B = C.words, P = C.sigBytes, T = this.blockSize, D = T * 4, N = P / D;
                            y ? N = o.ceil(N) : N = o.max((N | 0) - this._minBufferSize, 0);
                            var F = N * T
                                , k = o.min(F * 4, P);
                            if (F) {
                                for (var $ = 0; $ < F; $ += T)
                                    this._doProcessBlock(B, $);
                                A = B.splice(0, F),
                                    C.sigBytes -= k
                            }
                            return new m.init(A,k)
                        },
                        clone: function() {
                            var y = f.clone.call(this);
                            return y._data = this._data.clone(),
                                y
                        },
                        _minBufferSize: 0
                    });
                    u.Hasher = b.extend({
                        cfg: f.extend(),
                        init: function(y) {
                            this.cfg = this.cfg.extend(y),
                                this.reset()
                        },
                        reset: function() {
                            b.reset.call(this),
                                this._doReset()
                        },
                        update: function(y) {
                            return this._append(y),
                                this._process(),
                                this
                        },
                        finalize: function(y) {
                            y && this._append(y);
                            var A = this._doFinalize();
                            return A
                        },
                        blockSize: 16,
                        _createHelper: function(y) {
                            return function(A, C) {
                                return new y.init(C).finalize(A)
                            }
                        },
                        _createHmacHelper: function(y) {
                            return function(A, C) {
                                return new w.HMAC.init(y,C).finalize(A)
                            }
                        }
                    });
                    var w = d.algo = {};
                    return d
                }(Math);
                return n
            })
        }(core)),
        core.exports
}
var x64Core = {
    exports: {}
}, hasRequiredX64Core;
function requireX64Core() {
    return hasRequiredX64Core || (hasRequiredX64Core = 1,
        function(e, r) {
            (function(n, o) {
                    e.exports = o(requireCore())
                }
            )(commonjsGlobal, function(n) {
                return function(o) {
                    var s = n
                        , a = s.lib
                        , c = a.Base
                        , l = a.WordArray
                        , d = s.x64 = {};
                    d.Word = c.extend({
                        init: function(u, f) {
                            this.high = u,
                                this.low = f
                        }
                    }),
                        d.WordArray = c.extend({
                            init: function(u, f) {
                                u = this.words = u || [],
                                    f != o ? this.sigBytes = f : this.sigBytes = u.length * 8
                            },
                            toX32: function() {
                                for (var u = this.words, f = u.length, m = [], x = 0; x < f; x++) {
                                    var _ = u[x];
                                    m.push(_.high),
                                        m.push(_.low)
                                }
                                return l.create(m, this.sigBytes)
                            },
                            clone: function() {
                                for (var u = c.clone.call(this), f = u.words = this.words.slice(0), m = f.length, x = 0; x < m; x++)
                                    f[x] = f[x].clone();
                                return u
                            }
                        })
                }(),
                    n
            })
        }(x64Core)),
        x64Core.exports
}
var libTypedarrays = {
    exports: {}
}, hasRequiredLibTypedarrays;
function requireLibTypedarrays() {
    return hasRequiredLibTypedarrays || (hasRequiredLibTypedarrays = 1,
        function(e, r) {
            (function(n, o) {
                    e.exports = o(requireCore())
                }
            )(commonjsGlobal, function(n) {
                return function() {
                    if (typeof ArrayBuffer == "function") {
                        var o = n
                            , s = o.lib
                            , a = s.WordArray
                            , c = a.init
                            , l = a.init = function(d) {
                                if (d instanceof ArrayBuffer && (d = new Uint8Array(d)),
                                (d instanceof Int8Array || typeof Uint8ClampedArray < "u" && d instanceof Uint8ClampedArray || d instanceof Int16Array || d instanceof Uint16Array || d instanceof Int32Array || d instanceof Uint32Array || d instanceof Float32Array || d instanceof Float64Array) && (d = new Uint8Array(d.buffer,d.byteOffset,d.byteLength)),
                                d instanceof Uint8Array) {
                                    for (var u = d.byteLength, f = [], m = 0; m < u; m++)
                                        f[m >>> 2] |= d[m] << 24 - m % 4 * 8;
                                    c.call(this, f, u)
                                } else
                                    c.apply(this, arguments)
                            }
                        ;
                        l.prototype = a
                    }
                }(),
                    n.lib.WordArray
            })
        }(libTypedarrays)),
        libTypedarrays.exports
}
var encUtf16 = {
    exports: {}
}, hasRequiredEncUtf16;
function requireEncUtf16() {
    return hasRequiredEncUtf16 || (hasRequiredEncUtf16 = 1,
        function(e, r) {
            (function(n, o) {
                    e.exports = o(requireCore())
                }
            )(commonjsGlobal, function(n) {
                return function() {
                    var o = n
                        , s = o.lib
                        , a = s.WordArray
                        , c = o.enc;
                    c.Utf16 = c.Utf16BE = {
                        stringify: function(d) {
                            for (var u = d.words, f = d.sigBytes, m = [], x = 0; x < f; x += 2) {
                                var _ = u[x >>> 2] >>> 16 - x % 4 * 8 & 65535;
                                m.push(String.fromCharCode(_))
                            }
                            return m.join("")
                        },
                        parse: function(d) {
                            for (var u = d.length, f = [], m = 0; m < u; m++)
                                f[m >>> 1] |= d.charCodeAt(m) << 16 - m % 2 * 16;
                            return a.create(f, u * 2)
                        }
                    },
                        c.Utf16LE = {
                            stringify: function(d) {
                                for (var u = d.words, f = d.sigBytes, m = [], x = 0; x < f; x += 2) {
                                    var _ = l(u[x >>> 2] >>> 16 - x % 4 * 8 & 65535);
                                    m.push(String.fromCharCode(_))
                                }
                                return m.join("")
                            },
                            parse: function(d) {
                                for (var u = d.length, f = [], m = 0; m < u; m++)
                                    f[m >>> 1] |= l(d.charCodeAt(m) << 16 - m % 2 * 16);
                                return a.create(f, u * 2)
                            }
                        };
                    function l(d) {
                        return d << 8 & 4278255360 | d >>> 8 & 16711935
                    }
                }(),
                    n.enc.Utf16
            })
        }(encUtf16)),
        encUtf16.exports
}
var encBase64 = {
    exports: {}
}, hasRequiredEncBase64;
function requireEncBase64() {
    return hasRequiredEncBase64 || (hasRequiredEncBase64 = 1,
        function(e, r) {
            (function(n, o) {
                    e.exports = o(requireCore())
                }
            )(commonjsGlobal, function(n) {
                return function() {
                    var o = n
                        , s = o.lib
                        , a = s.WordArray
                        , c = o.enc;
                    c.Base64 = {
                        stringify: function(d) {
                            var u = d.words
                                , f = d.sigBytes
                                , m = this._map;
                            d.clamp();
                            for (var x = [], _ = 0; _ < f; _ += 3)
                                for (var g = u[_ >>> 2] >>> 24 - _ % 4 * 8 & 255, E = u[_ + 1 >>> 2] >>> 24 - (_ + 1) % 4 * 8 & 255, b = u[_ + 2 >>> 2] >>> 24 - (_ + 2) % 4 * 8 & 255, w = g << 16 | E << 8 | b, y = 0; y < 4 && _ + y * .75 < f; y++)
                                    x.push(m.charAt(w >>> 6 * (3 - y) & 63));
                            var A = m.charAt(64);
                            if (A)
                                for (; x.length % 4; )
                                    x.push(A);
                            return x.join("")
                        },
                        parse: function(d) {
                            var u = d.length
                                , f = this._map
                                , m = this._reverseMap;
                            if (!m) {
                                m = this._reverseMap = [];
                                for (var x = 0; x < f.length; x++)
                                    m[f.charCodeAt(x)] = x
                            }
                            var _ = f.charAt(64);
                            if (_) {
                                var g = d.indexOf(_);
                                g !== -1 && (u = g)
                            }
                            return l(d, u, m)
                        },
                        _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
                    };
                    function l(d, u, f) {
                        for (var m = [], x = 0, _ = 0; _ < u; _++)
                            if (_ % 4) {
                                var g = f[d.charCodeAt(_ - 1)] << _ % 4 * 2
                                    , E = f[d.charCodeAt(_)] >>> 6 - _ % 4 * 2
                                    , b = g | E;
                                m[x >>> 2] |= b << 24 - x % 4 * 8,
                                    x++
                            }
                        return a.create(m, x)
                    }
                }(),
                    n.enc.Base64
            })
        }(encBase64)),
        encBase64.exports
}
var encBase64url = {
    exports: {}
}, hasRequiredEncBase64url;
function requireEncBase64url() {
    return hasRequiredEncBase64url || (hasRequiredEncBase64url = 1,
        function(e, r) {
            (function(n, o) {
                    e.exports = o(requireCore())
                }
            )(commonjsGlobal, function(n) {
                return function() {
                    var o = n
                        , s = o.lib
                        , a = s.WordArray
                        , c = o.enc;
                    c.Base64url = {
                        stringify: function(d, u) {
                            u === void 0 && (u = !0);
                            var f = d.words
                                , m = d.sigBytes
                                , x = u ? this._safe_map : this._map;
                            d.clamp();
                            for (var _ = [], g = 0; g < m; g += 3)
                                for (var E = f[g >>> 2] >>> 24 - g % 4 * 8 & 255, b = f[g + 1 >>> 2] >>> 24 - (g + 1) % 4 * 8 & 255, w = f[g + 2 >>> 2] >>> 24 - (g + 2) % 4 * 8 & 255, y = E << 16 | b << 8 | w, A = 0; A < 4 && g + A * .75 < m; A++)
                                    _.push(x.charAt(y >>> 6 * (3 - A) & 63));
                            var C = x.charAt(64);
                            if (C)
                                for (; _.length % 4; )
                                    _.push(C);
                            return _.join("")
                        },
                        parse: function(d, u) {
                            u === void 0 && (u = !0);
                            var f = d.length
                                , m = u ? this._safe_map : this._map
                                , x = this._reverseMap;
                            if (!x) {
                                x = this._reverseMap = [];
                                for (var _ = 0; _ < m.length; _++)
                                    x[m.charCodeAt(_)] = _
                            }
                            var g = m.charAt(64);
                            if (g) {
                                var E = d.indexOf(g);
                                E !== -1 && (f = E)
                            }
                            return l(d, f, x)
                        },
                        _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                        _safe_map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"
                    };
                    function l(d, u, f) {
                        for (var m = [], x = 0, _ = 0; _ < u; _++)
                            if (_ % 4) {
                                var g = f[d.charCodeAt(_ - 1)] << _ % 4 * 2
                                    , E = f[d.charCodeAt(_)] >>> 6 - _ % 4 * 2
                                    , b = g | E;
                                m[x >>> 2] |= b << 24 - x % 4 * 8,
                                    x++
                            }
                        return a.create(m, x)
                    }
                }(),
                    n.enc.Base64url
            })
        }(encBase64url)),
        encBase64url.exports
}
var md5 = {
    exports: {}
}, hasRequiredMd5;
function requireMd5() {
    return hasRequiredMd5 || (hasRequiredMd5 = 1,
        function(e, r) {
            (function(n, o) {
                    e.exports = o(requireCore())
                }
            )(commonjsGlobal, function(n) {
                return function(o) {
                    var s = n
                        , a = s.lib
                        , c = a.WordArray
                        , l = a.Hasher
                        , d = s.algo
                        , u = [];
                    (function() {
                            for (var E = 0; E < 64; E++)
                                u[E] = o.abs(o.sin(E + 1)) * 4294967296 | 0
                        }
                    )();
                    var f = d.MD5 = l.extend({
                        _doReset: function() {
                            this._hash = new c.init([1732584193, 4023233417, 2562383102, 271733878])
                        },
                        _doProcessBlock: function(E, b) {
                            for (var w = 0; w < 16; w++) {
                                var y = b + w
                                    , A = E[y];
                                E[y] = (A << 8 | A >>> 24) & 16711935 | (A << 24 | A >>> 8) & 4278255360
                            }
                            var C = this._hash.words
                                , B = E[b + 0]
                                , P = E[b + 1]
                                , T = E[b + 2]
                                , D = E[b + 3]
                                , N = E[b + 4]
                                , F = E[b + 5]
                                , k = E[b + 6]
                                , $ = E[b + 7]
                                , M = E[b + 8]
                                , Q = E[b + 9]
                                , te = E[b + 10]
                                , J = E[b + 11]
                                , ae = E[b + 12]
                                , ie = E[b + 13]
                                , fe = E[b + 14]
                                , de = E[b + 15]
                                , z = C[0]
                                , V = C[1]
                                , H = C[2]
                                , I = C[3];
                            z = m(z, V, H, I, B, 7, u[0]),
                                I = m(I, z, V, H, P, 12, u[1]),
                                H = m(H, I, z, V, T, 17, u[2]),
                                V = m(V, H, I, z, D, 22, u[3]),
                                z = m(z, V, H, I, N, 7, u[4]),
                                I = m(I, z, V, H, F, 12, u[5]),
                                H = m(H, I, z, V, k, 17, u[6]),
                                V = m(V, H, I, z, $, 22, u[7]),
                                z = m(z, V, H, I, M, 7, u[8]),
                                I = m(I, z, V, H, Q, 12, u[9]),
                                H = m(H, I, z, V, te, 17, u[10]),
                                V = m(V, H, I, z, J, 22, u[11]),
                                z = m(z, V, H, I, ae, 7, u[12]),
                                I = m(I, z, V, H, ie, 12, u[13]),
                                H = m(H, I, z, V, fe, 17, u[14]),
                                V = m(V, H, I, z, de, 22, u[15]),
                                z = x(z, V, H, I, P, 5, u[16]),
                                I = x(I, z, V, H, k, 9, u[17]),
                                H = x(H, I, z, V, J, 14, u[18]),
                                V = x(V, H, I, z, B, 20, u[19]),
                                z = x(z, V, H, I, F, 5, u[20]),
                                I = x(I, z, V, H, te, 9, u[21]),
                                H = x(H, I, z, V, de, 14, u[22]),
                                V = x(V, H, I, z, N, 20, u[23]),
                                z = x(z, V, H, I, Q, 5, u[24]),
                                I = x(I, z, V, H, fe, 9, u[25]),
                                H = x(H, I, z, V, D, 14, u[26]),
                                V = x(V, H, I, z, M, 20, u[27]),
                                z = x(z, V, H, I, ie, 5, u[28]),
                                I = x(I, z, V, H, T, 9, u[29]),
                                H = x(H, I, z, V, $, 14, u[30]),
                                V = x(V, H, I, z, ae, 20, u[31]),
                                z = _(z, V, H, I, F, 4, u[32]),
                                I = _(I, z, V, H, M, 11, u[33]),
                                H = _(H, I, z, V, J, 16, u[34]),
                                V = _(V, H, I, z, fe, 23, u[35]),
                                z = _(z, V, H, I, P, 4, u[36]),
                                I = _(I, z, V, H, N, 11, u[37]),
                                H = _(H, I, z, V, $, 16, u[38]),
                                V = _(V, H, I, z, te, 23, u[39]),
                                z = _(z, V, H, I, ie, 4, u[40]),
                                I = _(I, z, V, H, B, 11, u[41]),
                                H = _(H, I, z, V, D, 16, u[42]),
                                V = _(V, H, I, z, k, 23, u[43]),
                                z = _(z, V, H, I, Q, 4, u[44]),
                                I = _(I, z, V, H, ae, 11, u[45]),
                                H = _(H, I, z, V, de, 16, u[46]),
                                V = _(V, H, I, z, T, 23, u[47]),
                                z = g(z, V, H, I, B, 6, u[48]),
                                I = g(I, z, V, H, $, 10, u[49]),
                                H = g(H, I, z, V, fe, 15, u[50]),
                                V = g(V, H, I, z, F, 21, u[51]),
                                z = g(z, V, H, I, ae, 6, u[52]),
                                I = g(I, z, V, H, D, 10, u[53]),
                                H = g(H, I, z, V, te, 15, u[54]),
                                V = g(V, H, I, z, P, 21, u[55]),
                                z = g(z, V, H, I, M, 6, u[56]),
                                I = g(I, z, V, H, de, 10, u[57]),
                                H = g(H, I, z, V, k, 15, u[58]),
                                V = g(V, H, I, z, ie, 21, u[59]),
                                z = g(z, V, H, I, N, 6, u[60]),
                                I = g(I, z, V, H, J, 10, u[61]),
                                H = g(H, I, z, V, T, 15, u[62]),
                                V = g(V, H, I, z, Q, 21, u[63]),
                                C[0] = C[0] + z | 0,
                                C[1] = C[1] + V | 0,
                                C[2] = C[2] + H | 0,
                                C[3] = C[3] + I | 0
                        },
                        _doFinalize: function() {
                            var E = this._data
                                , b = E.words
                                , w = this._nDataBytes * 8
                                , y = E.sigBytes * 8;
                            b[y >>> 5] |= 128 << 24 - y % 32;
                            var A = o.floor(w / 4294967296)
                                , C = w;
                            b[(y + 64 >>> 9 << 4) + 15] = (A << 8 | A >>> 24) & 16711935 | (A << 24 | A >>> 8) & 4278255360,
                                b[(y + 64 >>> 9 << 4) + 14] = (C << 8 | C >>> 24) & 16711935 | (C << 24 | C >>> 8) & 4278255360,
                                E.sigBytes = (b.length + 1) * 4,
                                this._process();
                            for (var B = this._hash, P = B.words, T = 0; T < 4; T++) {
                                var D = P[T];
                                P[T] = (D << 8 | D >>> 24) & 16711935 | (D << 24 | D >>> 8) & 4278255360
                            }
                            return B
                        },
                        clone: function() {
                            var E = l.clone.call(this);
                            return E._hash = this._hash.clone(),
                                E
                        }
                    });
                    function m(E, b, w, y, A, C, B) {
                        var P = E + (b & w | ~b & y) + A + B;
                        return (P << C | P >>> 32 - C) + b
                    }
                    function x(E, b, w, y, A, C, B) {
                        var P = E + (b & y | w & ~y) + A + B;
                        return (P << C | P >>> 32 - C) + b
                    }
                    function _(E, b, w, y, A, C, B) {
                        var P = E + (b ^ w ^ y) + A + B;
                        return (P << C | P >>> 32 - C) + b
                    }
                    function g(E, b, w, y, A, C, B) {
                        var P = E + (w ^ (b | ~y)) + A + B;
                        return (P << C | P >>> 32 - C) + b
                    }
                    s.MD5 = l._createHelper(f),
                        s.HmacMD5 = l._createHmacHelper(f)
                }(Math),
                    n.MD5
            })
        }(md5)),
        md5.exports
}
var sha1 = {
    exports: {}
}, hasRequiredSha1;
function requireSha1() {
    return hasRequiredSha1 || (hasRequiredSha1 = 1,
        function(e, r) {
            (function(n, o) {
                    e.exports = o(requireCore())
                }
            )(commonjsGlobal, function(n) {
                return function() {
                    var o = n
                        , s = o.lib
                        , a = s.WordArray
                        , c = s.Hasher
                        , l = o.algo
                        , d = []
                        , u = l.SHA1 = c.extend({
                        _doReset: function() {
                            this._hash = new a.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520])
                        },
                        _doProcessBlock: function(f, m) {
                            for (var x = this._hash.words, _ = x[0], g = x[1], E = x[2], b = x[3], w = x[4], y = 0; y < 80; y++) {
                                if (y < 16)
                                    d[y] = f[m + y] | 0;
                                else {
                                    var A = d[y - 3] ^ d[y - 8] ^ d[y - 14] ^ d[y - 16];
                                    d[y] = A << 1 | A >>> 31
                                }
                                var C = (_ << 5 | _ >>> 27) + w + d[y];
                                y < 20 ? C += (g & E | ~g & b) + 1518500249 : y < 40 ? C += (g ^ E ^ b) + 1859775393 : y < 60 ? C += (g & E | g & b | E & b) - 1894007588 : C += (g ^ E ^ b) - 899497514,
                                    w = b,
                                    b = E,
                                    E = g << 30 | g >>> 2,
                                    g = _,
                                    _ = C
                            }
                            x[0] = x[0] + _ | 0,
                                x[1] = x[1] + g | 0,
                                x[2] = x[2] + E | 0,
                                x[3] = x[3] + b | 0,
                                x[4] = x[4] + w | 0
                        },
                        _doFinalize: function() {
                            var f = this._data
                                , m = f.words
                                , x = this._nDataBytes * 8
                                , _ = f.sigBytes * 8;
                            return m[_ >>> 5] |= 128 << 24 - _ % 32,
                                m[(_ + 64 >>> 9 << 4) + 14] = Math.floor(x / 4294967296),
                                m[(_ + 64 >>> 9 << 4) + 15] = x,
                                f.sigBytes = m.length * 4,
                                this._process(),
                                this._hash
                        },
                        clone: function() {
                            var f = c.clone.call(this);
                            return f._hash = this._hash.clone(),
                                f
                        }
                    });
                    o.SHA1 = c._createHelper(u),
                        o.HmacSHA1 = c._createHmacHelper(u)
                }(),
                    n.SHA1
            })
        }(sha1)),
        sha1.exports
}
var sha256 = {
    exports: {}
}, hasRequiredSha256;
function requireSha256() {
    return hasRequiredSha256 || (hasRequiredSha256 = 1,
        function(e, r) {
            (function(n, o) {
                    e.exports = o(requireCore())
                }
            )(commonjsGlobal, function(n) {
                return function(o) {
                    var s = n
                        , a = s.lib
                        , c = a.WordArray
                        , l = a.Hasher
                        , d = s.algo
                        , u = []
                        , f = [];
                    (function() {
                            function _(w) {
                                for (var y = o.sqrt(w), A = 2; A <= y; A++)
                                    if (!(w % A))
                                        return !1;
                                return !0
                            }
                            function g(w) {
                                return (w - (w | 0)) * 4294967296 | 0
                            }
                            for (var E = 2, b = 0; b < 64; )
                                _(E) && (b < 8 && (u[b] = g(o.pow(E, 1 / 2))),
                                    f[b] = g(o.pow(E, 1 / 3)),
                                    b++),
                                    E++
                        }
                    )();
                    var m = []
                        , x = d.SHA256 = l.extend({
                        _doReset: function() {
                            this._hash = new c.init(u.slice(0))
                        },
                        _doProcessBlock: function(_, g) {
                            for (var E = this._hash.words, b = E[0], w = E[1], y = E[2], A = E[3], C = E[4], B = E[5], P = E[6], T = E[7], D = 0; D < 64; D++) {
                                if (D < 16)
                                    m[D] = _[g + D] | 0;
                                else {
                                    var N = m[D - 15]
                                        , F = (N << 25 | N >>> 7) ^ (N << 14 | N >>> 18) ^ N >>> 3
                                        , k = m[D - 2]
                                        , $ = (k << 15 | k >>> 17) ^ (k << 13 | k >>> 19) ^ k >>> 10;
                                    m[D] = F + m[D - 7] + $ + m[D - 16]
                                }
                                var M = C & B ^ ~C & P
                                    , Q = b & w ^ b & y ^ w & y
                                    , te = (b << 30 | b >>> 2) ^ (b << 19 | b >>> 13) ^ (b << 10 | b >>> 22)
                                    , J = (C << 26 | C >>> 6) ^ (C << 21 | C >>> 11) ^ (C << 7 | C >>> 25)
                                    , ae = T + J + M + f[D] + m[D]
                                    , ie = te + Q;
                                T = P,
                                    P = B,
                                    B = C,
                                    C = A + ae | 0,
                                    A = y,
                                    y = w,
                                    w = b,
                                    b = ae + ie | 0
                            }
                            E[0] = E[0] + b | 0,
                                E[1] = E[1] + w | 0,
                                E[2] = E[2] + y | 0,
                                E[3] = E[3] + A | 0,
                                E[4] = E[4] + C | 0,
                                E[5] = E[5] + B | 0,
                                E[6] = E[6] + P | 0,
                                E[7] = E[7] + T | 0
                        },
                        _doFinalize: function() {
                            var _ = this._data
                                , g = _.words
                                , E = this._nDataBytes * 8
                                , b = _.sigBytes * 8;
                            return g[b >>> 5] |= 128 << 24 - b % 32,
                                g[(b + 64 >>> 9 << 4) + 14] = o.floor(E / 4294967296),
                                g[(b + 64 >>> 9 << 4) + 15] = E,
                                _.sigBytes = g.length * 4,
                                this._process(),
                                this._hash
                        },
                        clone: function() {
                            var _ = l.clone.call(this);
                            return _._hash = this._hash.clone(),
                                _
                        }
                    });
                    s.SHA256 = l._createHelper(x),
                        s.HmacSHA256 = l._createHmacHelper(x)
                }(Math),
                    n.SHA256
            })
        }(sha256)),
        sha256.exports
}
var sha224 = {
    exports: {}
}, hasRequiredSha224;
function requireSha224() {
    return hasRequiredSha224 || (hasRequiredSha224 = 1,
        function(e, r) {
            (function(n, o, s) {
                    e.exports = o(requireCore(), requireSha256())
                }
            )(commonjsGlobal, function(n) {
                return function() {
                    var o = n
                        , s = o.lib
                        , a = s.WordArray
                        , c = o.algo
                        , l = c.SHA256
                        , d = c.SHA224 = l.extend({
                        _doReset: function() {
                            this._hash = new a.init([3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428])
                        },
                        _doFinalize: function() {
                            var u = l._doFinalize.call(this);
                            return u.sigBytes -= 4,
                                u
                        }
                    });
                    o.SHA224 = l._createHelper(d),
                        o.HmacSHA224 = l._createHmacHelper(d)
                }(),
                    n.SHA224
            })
        }(sha224)),
        sha224.exports
}
var sha512 = {
    exports: {}
}, hasRequiredSha512;
function requireSha512() {
    return hasRequiredSha512 || (hasRequiredSha512 = 1,
        function(e, r) {
            (function(n, o, s) {
                    e.exports = o(requireCore(), requireX64Core())
                }
            )(commonjsGlobal, function(n) {
                return function() {
                    var o = n
                        , s = o.lib
                        , a = s.Hasher
                        , c = o.x64
                        , l = c.Word
                        , d = c.WordArray
                        , u = o.algo;
                    function f() {
                        return l.create.apply(l, arguments)
                    }
                    var m = [f(1116352408, 3609767458), f(1899447441, 602891725), f(3049323471, 3964484399), f(3921009573, 2173295548), f(961987163, 4081628472), f(1508970993, 3053834265), f(2453635748, 2937671579), f(2870763221, 3664609560), f(3624381080, 2734883394), f(310598401, 1164996542), f(607225278, 1323610764), f(1426881987, 3590304994), f(1925078388, 4068182383), f(2162078206, 991336113), f(2614888103, 633803317), f(3248222580, 3479774868), f(3835390401, 2666613458), f(4022224774, 944711139), f(264347078, 2341262773), f(604807628, 2007800933), f(770255983, 1495990901), f(1249150122, 1856431235), f(1555081692, 3175218132), f(1996064986, 2198950837), f(2554220882, 3999719339), f(2821834349, 766784016), f(2952996808, 2566594879), f(3210313671, 3203337956), f(3336571891, 1034457026), f(3584528711, 2466948901), f(113926993, 3758326383), f(338241895, 168717936), f(666307205, 1188179964), f(773529912, 1546045734), f(1294757372, 1522805485), f(1396182291, 2643833823), f(1695183700, 2343527390), f(1986661051, 1014477480), f(2177026350, 1206759142), f(2456956037, 344077627), f(2730485921, 1290863460), f(2820302411, 3158454273), f(3259730800, 3505952657), f(3345764771, 106217008), f(3516065817, 3606008344), f(3600352804, 1432725776), f(4094571909, 1467031594), f(275423344, 851169720), f(430227734, 3100823752), f(506948616, 1363258195), f(659060556, 3750685593), f(883997877, 3785050280), f(958139571, 3318307427), f(1322822218, 3812723403), f(1537002063, 2003034995), f(1747873779, 3602036899), f(1955562222, 1575990012), f(2024104815, 1125592928), f(2227730452, 2716904306), f(2361852424, 442776044), f(2428436474, 593698344), f(2756734187, 3733110249), f(3204031479, 2999351573), f(3329325298, 3815920427), f(3391569614, 3928383900), f(3515267271, 566280711), f(3940187606, 3454069534), f(4118630271, 4000239992), f(116418474, 1914138554), f(174292421, 2731055270), f(289380356, 3203993006), f(460393269, 320620315), f(685471733, 587496836), f(852142971, 1086792851), f(1017036298, 365543100), f(1126000580, 2618297676), f(1288033470, 3409855158), f(1501505948, 4234509866), f(1607167915, 987167468), f(1816402316, 1246189591)]
                        , x = [];
                    (function() {
                            for (var g = 0; g < 80; g++)
                                x[g] = f()
                        }
                    )();
                    var _ = u.SHA512 = a.extend({
                        _doReset: function() {
                            this._hash = new d.init([new l.init(1779033703,4089235720), new l.init(3144134277,2227873595), new l.init(1013904242,4271175723), new l.init(2773480762,1595750129), new l.init(1359893119,2917565137), new l.init(2600822924,725511199), new l.init(528734635,4215389547), new l.init(1541459225,327033209)])
                        },
                        _doProcessBlock: function(g, E) {
                            for (var b = this._hash.words, w = b[0], y = b[1], A = b[2], C = b[3], B = b[4], P = b[5], T = b[6], D = b[7], N = w.high, F = w.low, k = y.high, $ = y.low, M = A.high, Q = A.low, te = C.high, J = C.low, ae = B.high, ie = B.low, fe = P.high, de = P.low, z = T.high, V = T.low, H = D.high, I = D.low, re = N, X = F, L = k, j = $, Y = M, se = Q, pe = te, S = J, R = ae, O = ie, q = fe, U = de, W = z, ee = V, G = H, Z = I, K = 0; K < 80; K++) {
                                var oe, ne, ce = x[K];
                                if (K < 16)
                                    ne = ce.high = g[E + K * 2] | 0,
                                        oe = ce.low = g[E + K * 2 + 1] | 0;
                                else {
                                    var le = x[K - 15]
                                        , ue = le.high
                                        , he = le.low
                                        , xe = (ue >>> 1 | he << 31) ^ (ue >>> 8 | he << 24) ^ ue >>> 7
                                        , me = (he >>> 1 | ue << 31) ^ (he >>> 8 | ue << 24) ^ (he >>> 7 | ue << 25)
                                        , ge = x[K - 2]
                                        , _e = ge.high
                                        , be = ge.low
                                        , Ae = (_e >>> 19 | be << 13) ^ (_e << 3 | be >>> 29) ^ _e >>> 6
                                        , we = (be >>> 19 | _e << 13) ^ (be << 3 | _e >>> 29) ^ (be >>> 6 | _e << 26)
                                        , ve = x[K - 7]
                                        , Ee = ve.high
                                        , Be = ve.low
                                        , Se = x[K - 16]
                                        , Oe = Se.high
                                        , Re = Se.low;
                                    oe = me + Be,
                                        ne = xe + Ee + (oe >>> 0 < me >>> 0 ? 1 : 0),
                                        oe = oe + we,
                                        ne = ne + Ae + (oe >>> 0 < we >>> 0 ? 1 : 0),
                                        oe = oe + Re,
                                        ne = ne + Oe + (oe >>> 0 < Re >>> 0 ? 1 : 0),
                                        ce.high = ne,
                                        ce.low = oe
                                }
                                var $e = R & q ^ ~R & W
                                    , Pe = O & U ^ ~O & ee
                                    , Ie = re & L ^ re & Y ^ L & Y
                                    , Ne = X & j ^ X & se ^ j & se
                                    , Le = (re >>> 28 | X << 4) ^ (re << 30 | X >>> 2) ^ (re << 25 | X >>> 7)
                                    , Fe = (X >>> 28 | re << 4) ^ (X << 30 | re >>> 2) ^ (X << 25 | re >>> 7)
                                    , He = (R >>> 14 | O << 18) ^ (R >>> 18 | O << 14) ^ (R << 23 | O >>> 9)
                                    , Ve = (O >>> 14 | R << 18) ^ (O >>> 18 | R << 14) ^ (O << 23 | R >>> 9)
                                    , De = m[K]
                                    , Me = De.high
                                    , Te = De.low
                                    , ye = Z + Ve
                                    , Ce = G + He + (ye >>> 0 < Z >>> 0 ? 1 : 0)
                                    , ye = ye + Pe
                                    , Ce = Ce + $e + (ye >>> 0 < Pe >>> 0 ? 1 : 0)
                                    , ye = ye + Te
                                    , Ce = Ce + Me + (ye >>> 0 < Te >>> 0 ? 1 : 0)
                                    , ye = ye + oe
                                    , Ce = Ce + ne + (ye >>> 0 < oe >>> 0 ? 1 : 0)
                                    , ke = Fe + Ne
                                    , qe = Le + Ie + (ke >>> 0 < Fe >>> 0 ? 1 : 0);
                                G = W,
                                    Z = ee,
                                    W = q,
                                    ee = U,
                                    q = R,
                                    U = O,
                                    O = S + ye | 0,
                                    R = pe + Ce + (O >>> 0 < S >>> 0 ? 1 : 0) | 0,
                                    pe = Y,
                                    S = se,
                                    Y = L,
                                    se = j,
                                    L = re,
                                    j = X,
                                    X = ye + ke | 0,
                                    re = Ce + qe + (X >>> 0 < ye >>> 0 ? 1 : 0) | 0
                            }
                            F = w.low = F + X,
                                w.high = N + re + (F >>> 0 < X >>> 0 ? 1 : 0),
                                $ = y.low = $ + j,
                                y.high = k + L + ($ >>> 0 < j >>> 0 ? 1 : 0),
                                Q = A.low = Q + se,
                                A.high = M + Y + (Q >>> 0 < se >>> 0 ? 1 : 0),
                                J = C.low = J + S,
                                C.high = te + pe + (J >>> 0 < S >>> 0 ? 1 : 0),
                                ie = B.low = ie + O,
                                B.high = ae + R + (ie >>> 0 < O >>> 0 ? 1 : 0),
                                de = P.low = de + U,
                                P.high = fe + q + (de >>> 0 < U >>> 0 ? 1 : 0),
                                V = T.low = V + ee,
                                T.high = z + W + (V >>> 0 < ee >>> 0 ? 1 : 0),
                                I = D.low = I + Z,
                                D.high = H + G + (I >>> 0 < Z >>> 0 ? 1 : 0)
                        },
                        _doFinalize: function() {
                            var g = this._data
                                , E = g.words
                                , b = this._nDataBytes * 8
                                , w = g.sigBytes * 8;
                            E[w >>> 5] |= 128 << 24 - w % 32,
                                E[(w + 128 >>> 10 << 5) + 30] = Math.floor(b / 4294967296),
                                E[(w + 128 >>> 10 << 5) + 31] = b,
                                g.sigBytes = E.length * 4,
                                this._process();
                            var y = this._hash.toX32();
                            return y
                        },
                        clone: function() {
                            var g = a.clone.call(this);
                            return g._hash = this._hash.clone(),
                                g
                        },
                        blockSize: 1024 / 32
                    });
                    o.SHA512 = a._createHelper(_),
                        o.HmacSHA512 = a._createHmacHelper(_)
                }(),
                    n.SHA512
            })
        }(sha512)),
        sha512.exports
}
var sha384 = {
    exports: {}
}, hasRequiredSha384;
function requireSha384() {
    return hasRequiredSha384 || (hasRequiredSha384 = 1,
        function(e, r) {
            (function(n, o, s) {
                    e.exports = o(requireCore(), requireX64Core(), requireSha512())
                }
            )(commonjsGlobal, function(n) {
                return function() {
                    var o = n
                        , s = o.x64
                        , a = s.Word
                        , c = s.WordArray
                        , l = o.algo
                        , d = l.SHA512
                        , u = l.SHA384 = d.extend({
                        _doReset: function() {
                            this._hash = new c.init([new a.init(3418070365,3238371032), new a.init(1654270250,914150663), new a.init(2438529370,812702999), new a.init(355462360,4144912697), new a.init(1731405415,4290775857), new a.init(2394180231,1750603025), new a.init(3675008525,1694076839), new a.init(1203062813,3204075428)])
                        },
                        _doFinalize: function() {
                            var f = d._doFinalize.call(this);
                            return f.sigBytes -= 16,
                                f
                        }
                    });
                    o.SHA384 = d._createHelper(u),
                        o.HmacSHA384 = d._createHmacHelper(u)
                }(),
                    n.SHA384
            })
        }(sha384)),
        sha384.exports
}
var sha3 = {
    exports: {}
}, hasRequiredSha3;
function requireSha3() {
    return hasRequiredSha3 || (hasRequiredSha3 = 1,
        function(e, r) {
            (function(n, o, s) {
                    e.exports = o(requireCore(), requireX64Core())
                }
            )(commonjsGlobal, function(n) {
                return function(o) {
                    var s = n
                        , a = s.lib
                        , c = a.WordArray
                        , l = a.Hasher
                        , d = s.x64
                        , u = d.Word
                        , f = s.algo
                        , m = []
                        , x = []
                        , _ = [];
                    (function() {
                            for (var b = 1, w = 0, y = 0; y < 24; y++) {
                                m[b + 5 * w] = (y + 1) * (y + 2) / 2 % 64;
                                var A = w % 5
                                    , C = (2 * b + 3 * w) % 5;
                                b = A,
                                    w = C
                            }
                            for (var b = 0; b < 5; b++)
                                for (var w = 0; w < 5; w++)
                                    x[b + 5 * w] = w + (2 * b + 3 * w) % 5 * 5;
                            for (var B = 1, P = 0; P < 24; P++) {
                                for (var T = 0, D = 0, N = 0; N < 7; N++) {
                                    if (B & 1) {
                                        var F = (1 << N) - 1;
                                        F < 32 ? D ^= 1 << F : T ^= 1 << F - 32
                                    }
                                    B & 128 ? B = B << 1 ^ 113 : B <<= 1
                                }
                                _[P] = u.create(T, D)
                            }
                        }
                    )();
                    var g = [];
                    (function() {
                            for (var b = 0; b < 25; b++)
                                g[b] = u.create()
                        }
                    )();
                    var E = f.SHA3 = l.extend({
                        cfg: l.cfg.extend({
                            outputLength: 512
                        }),
                        _doReset: function() {
                            for (var b = this._state = [], w = 0; w < 25; w++)
                                b[w] = new u.init;
                            this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32
                        },
                        _doProcessBlock: function(b, w) {
                            for (var y = this._state, A = this.blockSize / 2, C = 0; C < A; C++) {
                                var B = b[w + 2 * C]
                                    , P = b[w + 2 * C + 1];
                                B = (B << 8 | B >>> 24) & 16711935 | (B << 24 | B >>> 8) & 4278255360,
                                    P = (P << 8 | P >>> 24) & 16711935 | (P << 24 | P >>> 8) & 4278255360;
                                var T = y[C];
                                T.high ^= P,
                                    T.low ^= B
                            }
                            for (var D = 0; D < 24; D++) {
                                for (var N = 0; N < 5; N++) {
                                    for (var F = 0, k = 0, $ = 0; $ < 5; $++) {
                                        var T = y[N + 5 * $];
                                        F ^= T.high,
                                            k ^= T.low
                                    }
                                    var M = g[N];
                                    M.high = F,
                                        M.low = k
                                }
                                for (var N = 0; N < 5; N++)
                                    for (var Q = g[(N + 4) % 5], te = g[(N + 1) % 5], J = te.high, ae = te.low, F = Q.high ^ (J << 1 | ae >>> 31), k = Q.low ^ (ae << 1 | J >>> 31), $ = 0; $ < 5; $++) {
                                        var T = y[N + 5 * $];
                                        T.high ^= F,
                                            T.low ^= k
                                    }
                                for (var ie = 1; ie < 25; ie++) {
                                    var F, k, T = y[ie], fe = T.high, de = T.low, z = m[ie];
                                    z < 32 ? (F = fe << z | de >>> 32 - z,
                                        k = de << z | fe >>> 32 - z) : (F = de << z - 32 | fe >>> 64 - z,
                                        k = fe << z - 32 | de >>> 64 - z);
                                    var V = g[x[ie]];
                                    V.high = F,
                                        V.low = k
                                }
                                var H = g[0]
                                    , I = y[0];
                                H.high = I.high,
                                    H.low = I.low;
                                for (var N = 0; N < 5; N++)
                                    for (var $ = 0; $ < 5; $++) {
                                        var ie = N + 5 * $
                                            , T = y[ie]
                                            , re = g[ie]
                                            , X = g[(N + 1) % 5 + 5 * $]
                                            , L = g[(N + 2) % 5 + 5 * $];
                                        T.high = re.high ^ ~X.high & L.high,
                                            T.low = re.low ^ ~X.low & L.low
                                    }
                                var T = y[0]
                                    , j = _[D];
                                T.high ^= j.high,
                                    T.low ^= j.low
                            }
                        },
                        _doFinalize: function() {
                            var b = this._data
                                , w = b.words;
                            this._nDataBytes * 8;
                            var y = b.sigBytes * 8
                                , A = this.blockSize * 32;
                            w[y >>> 5] |= 1 << 24 - y % 32,
                                w[(o.ceil((y + 1) / A) * A >>> 5) - 1] |= 128,
                                b.sigBytes = w.length * 4,
                                this._process();
                            for (var C = this._state, B = this.cfg.outputLength / 8, P = B / 8, T = [], D = 0; D < P; D++) {
                                var N = C[D]
                                    , F = N.high
                                    , k = N.low;
                                F = (F << 8 | F >>> 24) & 16711935 | (F << 24 | F >>> 8) & 4278255360,
                                    k = (k << 8 | k >>> 24) & 16711935 | (k << 24 | k >>> 8) & 4278255360,
                                    T.push(k),
                                    T.push(F)
                            }
                            return new c.init(T,B)
                        },
                        clone: function() {
                            for (var b = l.clone.call(this), w = b._state = this._state.slice(0), y = 0; y < 25; y++)
                                w[y] = w[y].clone();
                            return b
                        }
                    });
                    s.SHA3 = l._createHelper(E),
                        s.HmacSHA3 = l._createHmacHelper(E)
                }(Math),
                    n.SHA3
            })
        }(sha3)),
        sha3.exports
}
var ripemd160 = {
    exports: {}
}, hasRequiredRipemd160;
function requireRipemd160() {
    return hasRequiredRipemd160 || (hasRequiredRipemd160 = 1,
        function(e, r) {
            (function(n, o) {
                    e.exports = o(requireCore())
                }
            )(commonjsGlobal, function(n) {
                /** @preserve
                 (c) 2012 by Cédric Mesnil. All rights reserved.

                 Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

                 - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
                 - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

                 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
                 */
                return function(o) {
                    var s = n
                        , a = s.lib
                        , c = a.WordArray
                        , l = a.Hasher
                        , d = s.algo
                        , u = c.create([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13])
                        , f = c.create([5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11])
                        , m = c.create([11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6])
                        , x = c.create([8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11])
                        , _ = c.create([0, 1518500249, 1859775393, 2400959708, 2840853838])
                        , g = c.create([1352829926, 1548603684, 1836072691, 2053994217, 0])
                        , E = d.RIPEMD160 = l.extend({
                        _doReset: function() {
                            this._hash = c.create([1732584193, 4023233417, 2562383102, 271733878, 3285377520])
                        },
                        _doProcessBlock: function(P, T) {
                            for (var D = 0; D < 16; D++) {
                                var N = T + D
                                    , F = P[N];
                                P[N] = (F << 8 | F >>> 24) & 16711935 | (F << 24 | F >>> 8) & 4278255360
                            }
                            var k = this._hash.words, $ = _.words, M = g.words, Q = u.words, te = f.words, J = m.words, ae = x.words, ie, fe, de, z, V, H, I, re, X, L;
                            H = ie = k[0],
                                I = fe = k[1],
                                re = de = k[2],
                                X = z = k[3],
                                L = V = k[4];
                            for (var j, D = 0; D < 80; D += 1)
                                j = ie + P[T + Q[D]] | 0,
                                    D < 16 ? j += b(fe, de, z) + $[0] : D < 32 ? j += w(fe, de, z) + $[1] : D < 48 ? j += y(fe, de, z) + $[2] : D < 64 ? j += A(fe, de, z) + $[3] : j += C(fe, de, z) + $[4],
                                    j = j | 0,
                                    j = B(j, J[D]),
                                    j = j + V | 0,
                                    ie = V,
                                    V = z,
                                    z = B(de, 10),
                                    de = fe,
                                    fe = j,
                                    j = H + P[T + te[D]] | 0,
                                    D < 16 ? j += C(I, re, X) + M[0] : D < 32 ? j += A(I, re, X) + M[1] : D < 48 ? j += y(I, re, X) + M[2] : D < 64 ? j += w(I, re, X) + M[3] : j += b(I, re, X) + M[4],
                                    j = j | 0,
                                    j = B(j, ae[D]),
                                    j = j + L | 0,
                                    H = L,
                                    L = X,
                                    X = B(re, 10),
                                    re = I,
                                    I = j;
                            j = k[1] + de + X | 0,
                                k[1] = k[2] + z + L | 0,
                                k[2] = k[3] + V + H | 0,
                                k[3] = k[4] + ie + I | 0,
                                k[4] = k[0] + fe + re | 0,
                                k[0] = j
                        },
                        _doFinalize: function() {
                            var P = this._data
                                , T = P.words
                                , D = this._nDataBytes * 8
                                , N = P.sigBytes * 8;
                            T[N >>> 5] |= 128 << 24 - N % 32,
                                T[(N + 64 >>> 9 << 4) + 14] = (D << 8 | D >>> 24) & 16711935 | (D << 24 | D >>> 8) & 4278255360,
                                P.sigBytes = (T.length + 1) * 4,
                                this._process();
                            for (var F = this._hash, k = F.words, $ = 0; $ < 5; $++) {
                                var M = k[$];
                                k[$] = (M << 8 | M >>> 24) & 16711935 | (M << 24 | M >>> 8) & 4278255360
                            }
                            return F
                        },
                        clone: function() {
                            var P = l.clone.call(this);
                            return P._hash = this._hash.clone(),
                                P
                        }
                    });
                    function b(P, T, D) {
                        return P ^ T ^ D
                    }
                    function w(P, T, D) {
                        return P & T | ~P & D
                    }
                    function y(P, T, D) {
                        return (P | ~T) ^ D
                    }
                    function A(P, T, D) {
                        return P & D | T & ~D
                    }
                    function C(P, T, D) {
                        return P ^ (T | ~D)
                    }
                    function B(P, T) {
                        return P << T | P >>> 32 - T
                    }
                    s.RIPEMD160 = l._createHelper(E),
                        s.HmacRIPEMD160 = l._createHmacHelper(E)
                }(),
                    n.RIPEMD160
            })
        }(ripemd160)),
        ripemd160.exports
}
var hmac = {
    exports: {}
}, hasRequiredHmac;
function requireHmac() {
    return hasRequiredHmac || (hasRequiredHmac = 1,
        function(e, r) {
            (function(n, o) {
                    e.exports = o(requireCore())
                }
            )(commonjsGlobal, function(n) {
                (function() {
                        var o = n
                            , s = o.lib
                            , a = s.Base
                            , c = o.enc
                            , l = c.Utf8
                            , d = o.algo;
                        d.HMAC = a.extend({
                            init: function(u, f) {
                                u = this._hasher = new u.init,
                                typeof f == "string" && (f = l.parse(f));
                                var m = u.blockSize
                                    , x = m * 4;
                                f.sigBytes > x && (f = u.finalize(f)),
                                    f.clamp();
                                for (var _ = this._oKey = f.clone(), g = this._iKey = f.clone(), E = _.words, b = g.words, w = 0; w < m; w++)
                                    E[w] ^= 1549556828,
                                        b[w] ^= 909522486;
                                _.sigBytes = g.sigBytes = x,
                                    this.reset()
                            },
                            reset: function() {
                                var u = this._hasher;
                                u.reset(),
                                    u.update(this._iKey)
                            },
                            update: function(u) {
                                return this._hasher.update(u),
                                    this
                            },
                            finalize: function(u) {
                                var f = this._hasher
                                    , m = f.finalize(u);
                                f.reset();
                                var x = f.finalize(this._oKey.clone().concat(m));
                                return x
                            }
                        })
                    }
                )()
            })
        }(hmac)),
        hmac.exports
}
var pbkdf2 = {
    exports: {}
}, hasRequiredPbkdf2;
function requirePbkdf2() {
    return hasRequiredPbkdf2 || (hasRequiredPbkdf2 = 1,
        function(e, r) {
            (function(n, o, s) {
                    e.exports = o(requireCore(), requireSha256(), requireHmac())
                }
            )(commonjsGlobal, function(n) {
                return function() {
                    var o = n
                        , s = o.lib
                        , a = s.Base
                        , c = s.WordArray
                        , l = o.algo
                        , d = l.SHA256
                        , u = l.HMAC
                        , f = l.PBKDF2 = a.extend({
                        cfg: a.extend({
                            keySize: 128 / 32,
                            hasher: d,
                            iterations: 25e4
                        }),
                        init: function(m) {
                            this.cfg = this.cfg.extend(m)
                        },
                        compute: function(m, x) {
                            for (var _ = this.cfg, g = u.create(_.hasher, m), E = c.create(), b = c.create([1]), w = E.words, y = b.words, A = _.keySize, C = _.iterations; w.length < A; ) {
                                var B = g.update(x).finalize(b);
                                g.reset();
                                for (var P = B.words, T = P.length, D = B, N = 1; N < C; N++) {
                                    D = g.finalize(D),
                                        g.reset();
                                    for (var F = D.words, k = 0; k < T; k++)
                                        P[k] ^= F[k]
                                }
                                E.concat(B),
                                    y[0]++
                            }
                            return E.sigBytes = A * 4,
                                E
                        }
                    });
                    o.PBKDF2 = function(m, x, _) {
                        return f.create(_).compute(m, x)
                    }
                }(),
                    n.PBKDF2
            })
        }(pbkdf2)),
        pbkdf2.exports
}
var evpkdf = {
    exports: {}
}, hasRequiredEvpkdf;
function requireEvpkdf() {
    return hasRequiredEvpkdf || (hasRequiredEvpkdf = 1,
        function(e, r) {
            (function(n, o, s) {
                    e.exports = o(requireCore(), requireSha1(), requireHmac())
                }
            )(commonjsGlobal, function(n) {
                return function() {
                    var o = n
                        , s = o.lib
                        , a = s.Base
                        , c = s.WordArray
                        , l = o.algo
                        , d = l.MD5
                        , u = l.EvpKDF = a.extend({
                        cfg: a.extend({
                            keySize: 128 / 32,
                            hasher: d,
                            iterations: 1
                        }),
                        init: function(f) {
                            this.cfg = this.cfg.extend(f)
                        },
                        compute: function(f, m) {
                            for (var x, _ = this.cfg, g = _.hasher.create(), E = c.create(), b = E.words, w = _.keySize, y = _.iterations; b.length < w; ) {
                                x && g.update(x),
                                    x = g.update(f).finalize(m),
                                    g.reset();
                                for (var A = 1; A < y; A++)
                                    x = g.finalize(x),
                                        g.reset();
                                E.concat(x)
                            }
                            return E.sigBytes = w * 4,
                                E
                        }
                    });
                    o.EvpKDF = function(f, m, x) {
                        return u.create(x).compute(f, m)
                    }
                }(),
                    n.EvpKDF
            })
        }(evpkdf)),
        evpkdf.exports
}
var cipherCore = {
    exports: {}
}, hasRequiredCipherCore;
function requireCipherCore() {
    return hasRequiredCipherCore || (hasRequiredCipherCore = 1,
        function(e, r) {
            (function(n, o, s) {
                    e.exports = o(requireCore(), requireEvpkdf())
                }
            )(commonjsGlobal, function(n) {
                n.lib.Cipher || function(o) {
                    var s = n
                        , a = s.lib
                        , c = a.Base
                        , l = a.WordArray
                        , d = a.BufferedBlockAlgorithm
                        , u = s.enc;
                    u.Utf8;
                    var f = u.Base64
                        , m = s.algo
                        , x = m.EvpKDF
                        , _ = a.Cipher = d.extend({
                        cfg: c.extend(),
                        createEncryptor: function(F, k) {
                            return this.create(this._ENC_XFORM_MODE, F, k)
                        },
                        createDecryptor: function(F, k) {
                            return this.create(this._DEC_XFORM_MODE, F, k)
                        },
                        init: function(F, k, $) {
                            this.cfg = this.cfg.extend($),
                                this._xformMode = F,
                                this._key = k,
                                this.reset()
                        },
                        reset: function() {
                            d.reset.call(this),
                                this._doReset()
                        },
                        process: function(F) {
                            return this._append(F),
                                this._process()
                        },
                        finalize: function(F) {
                            F && this._append(F);
                            var k = this._doFinalize();
                            return k
                        },
                        keySize: 128 / 32,
                        ivSize: 128 / 32,
                        _ENC_XFORM_MODE: 1,
                        _DEC_XFORM_MODE: 2,
                        _createHelper: function() {
                            function F(k) {
                                return typeof k == "string" ? N : P
                            }
                            return function(k) {
                                return {
                                    encrypt: function($, M, Q) {
                                        return F(M).encrypt(k, $, M, Q)
                                    },
                                    decrypt: function($, M, Q) {
                                        return F(M).decrypt(k, $, M, Q)
                                    }
                                }
                            }
                        }()
                    });
                    a.StreamCipher = _.extend({
                        _doFinalize: function() {
                            var F = this._process(!0);
                            return F
                        },
                        blockSize: 1
                    });
                    var g = s.mode = {}
                        , E = a.BlockCipherMode = c.extend({
                        createEncryptor: function(F, k) {
                            return this.Encryptor.create(F, k)
                        },
                        createDecryptor: function(F, k) {
                            return this.Decryptor.create(F, k)
                        },
                        init: function(F, k) {
                            this._cipher = F,
                                this._iv = k
                        }
                    })
                        , b = g.CBC = function() {
                        var F = E.extend();
                        F.Encryptor = F.extend({
                            processBlock: function($, M) {
                                var Q = this._cipher
                                    , te = Q.blockSize;
                                k.call(this, $, M, te),
                                    Q.encryptBlock($, M),
                                    this._prevBlock = $.slice(M, M + te)
                            }
                        }),
                            F.Decryptor = F.extend({
                                processBlock: function($, M) {
                                    var Q = this._cipher
                                        , te = Q.blockSize
                                        , J = $.slice(M, M + te);
                                    Q.decryptBlock($, M),
                                        k.call(this, $, M, te),
                                        this._prevBlock = J
                                }
                            });
                        function k($, M, Q) {
                            var te, J = this._iv;
                            J ? (te = J,
                                this._iv = o) : te = this._prevBlock;
                            for (var ae = 0; ae < Q; ae++)
                                $[M + ae] ^= te[ae]
                        }
                        return F
                    }()
                        , w = s.pad = {}
                        , y = w.Pkcs7 = {
                        pad: function(F, k) {
                            for (var $ = k * 4, M = $ - F.sigBytes % $, Q = M << 24 | M << 16 | M << 8 | M, te = [], J = 0; J < M; J += 4)
                                te.push(Q);
                            var ae = l.create(te, M);
                            F.concat(ae)
                        },
                        unpad: function(F) {
                            var k = F.words[F.sigBytes - 1 >>> 2] & 255;
                            F.sigBytes -= k
                        }
                    };
                    a.BlockCipher = _.extend({
                        cfg: _.cfg.extend({
                            mode: b,
                            padding: y
                        }),
                        reset: function() {
                            var F;
                            _.reset.call(this);
                            var k = this.cfg
                                , $ = k.iv
                                , M = k.mode;
                            this._xformMode == this._ENC_XFORM_MODE ? F = M.createEncryptor : (F = M.createDecryptor,
                                this._minBufferSize = 1),
                                this._mode && this._mode.__creator == F ? this._mode.init(this, $ && $.words) : (this._mode = F.call(M, this, $ && $.words),
                                    this._mode.__creator = F)
                        },
                        _doProcessBlock: function(F, k) {
                            this._mode.processBlock(F, k)
                        },
                        _doFinalize: function() {
                            var F, k = this.cfg.padding;
                            return this._xformMode == this._ENC_XFORM_MODE ? (k.pad(this._data, this.blockSize),
                                F = this._process(!0)) : (F = this._process(!0),
                                k.unpad(F)),
                                F
                        },
                        blockSize: 128 / 32
                    });
                    var A = a.CipherParams = c.extend({
                        init: function(F) {
                            this.mixIn(F)
                        },
                        toString: function(F) {
                            return (F || this.formatter).stringify(this)
                        }
                    })
                        , C = s.format = {}
                        , B = C.OpenSSL = {
                        stringify: function(F) {
                            var k, $ = F.ciphertext, M = F.salt;
                            return M ? k = l.create([1398893684, 1701076831]).concat(M).concat($) : k = $,
                                k.toString(f)
                        },
                        parse: function(F) {
                            var k, $ = f.parse(F), M = $.words;
                            return M[0] == 1398893684 && M[1] == 1701076831 && (k = l.create(M.slice(2, 4)),
                                M.splice(0, 4),
                                $.sigBytes -= 16),
                                A.create({
                                    ciphertext: $,
                                    salt: k
                                })
                        }
                    }
                        , P = a.SerializableCipher = c.extend({
                        cfg: c.extend({
                            format: B
                        }),
                        encrypt: function(F, k, $, M) {
                            M = this.cfg.extend(M);
                            var Q = F.createEncryptor($, M)
                                , te = Q.finalize(k)
                                , J = Q.cfg;
                            return A.create({
                                ciphertext: te,
                                key: $,
                                iv: J.iv,
                                algorithm: F,
                                mode: J.mode,
                                padding: J.padding,
                                blockSize: F.blockSize,
                                formatter: M.format
                            })
                        },
                        decrypt: function(F, k, $, M) {
                            M = this.cfg.extend(M),
                                k = this._parse(k, M.format);
                            var Q = F.createDecryptor($, M).finalize(k.ciphertext);
                            return Q
                        },
                        _parse: function(F, k) {
                            return typeof F == "string" ? k.parse(F, this) : F
                        }
                    })
                        , T = s.kdf = {}
                        , D = T.OpenSSL = {
                        execute: function(F, k, $, M, Q) {
                            if (M || (M = l.random(64 / 8)),
                                Q)
                                var te = x.create({
                                    keySize: k + $,
                                    hasher: Q
                                }).compute(F, M);
                            else
                                var te = x.create({
                                    keySize: k + $
                                }).compute(F, M);
                            var J = l.create(te.words.slice(k), $ * 4);
                            return te.sigBytes = k * 4,
                                A.create({
                                    key: te,
                                    iv: J,
                                    salt: M
                                })
                        }
                    }
                        , N = a.PasswordBasedCipher = P.extend({
                        cfg: P.cfg.extend({
                            kdf: D
                        }),
                        encrypt: function(F, k, $, M) {
                            M = this.cfg.extend(M);
                            var Q = M.kdf.execute($, F.keySize, F.ivSize, M.salt, M.hasher);
                            M.iv = Q.iv;
                            var te = P.encrypt.call(this, F, k, Q.key, M);
                            return te.mixIn(Q),
                                te
                        },
                        decrypt: function(F, k, $, M) {
                            M = this.cfg.extend(M),
                                k = this._parse(k, M.format);
                            var Q = M.kdf.execute($, F.keySize, F.ivSize, k.salt, M.hasher);
                            M.iv = Q.iv;
                            var te = P.decrypt.call(this, F, k, Q.key, M);
                            return te
                        }
                    })
                }()
            })
        }(cipherCore)),
        cipherCore.exports
}
var modeCfb = {
    exports: {}
}, hasRequiredModeCfb;
function requireModeCfb() {
    return hasRequiredModeCfb || (hasRequiredModeCfb = 1,
        function(e, r) {
            (function(n, o, s) {
                    e.exports = o(requireCore(), requireCipherCore())
                }
            )(commonjsGlobal, function(n) {
                return n.mode.CFB = function() {
                    var o = n.lib.BlockCipherMode.extend();
                    o.Encryptor = o.extend({
                        processBlock: function(a, c) {
                            var l = this._cipher
                                , d = l.blockSize;
                            s.call(this, a, c, d, l),
                                this._prevBlock = a.slice(c, c + d)
                        }
                    }),
                        o.Decryptor = o.extend({
                            processBlock: function(a, c) {
                                var l = this._cipher
                                    , d = l.blockSize
                                    , u = a.slice(c, c + d);
                                s.call(this, a, c, d, l),
                                    this._prevBlock = u
                            }
                        });
                    function s(a, c, l, d) {
                        var u, f = this._iv;
                        f ? (u = f.slice(0),
                            this._iv = void 0) : u = this._prevBlock,
                            d.encryptBlock(u, 0);
                        for (var m = 0; m < l; m++)
                            a[c + m] ^= u[m]
                    }
                    return o
                }(),
                    n.mode.CFB
            })
        }(modeCfb)),
        modeCfb.exports
}
var modeCtr = {
    exports: {}
}, hasRequiredModeCtr;
function requireModeCtr() {
    return hasRequiredModeCtr || (hasRequiredModeCtr = 1,
        function(e, r) {
            (function(n, o, s) {
                    e.exports = o(requireCore(), requireCipherCore())
                }
            )(commonjsGlobal, function(n) {
                return n.mode.CTR = function() {
                    var o = n.lib.BlockCipherMode.extend()
                        , s = o.Encryptor = o.extend({
                        processBlock: function(a, c) {
                            var l = this._cipher
                                , d = l.blockSize
                                , u = this._iv
                                , f = this._counter;
                            u && (f = this._counter = u.slice(0),
                                this._iv = void 0);
                            var m = f.slice(0);
                            l.encryptBlock(m, 0),
                                f[d - 1] = f[d - 1] + 1 | 0;
                            for (var x = 0; x < d; x++)
                                a[c + x] ^= m[x]
                        }
                    });
                    return o.Decryptor = s,
                        o
                }(),
                    n.mode.CTR
            })
        }(modeCtr)),
        modeCtr.exports
}
var modeCtrGladman = {
    exports: {}
}, hasRequiredModeCtrGladman;
function requireModeCtrGladman() {
    return hasRequiredModeCtrGladman || (hasRequiredModeCtrGladman = 1,
        function(e, r) {
            (function(n, o, s) {
                    e.exports = o(requireCore(), requireCipherCore())
                }
            )(commonjsGlobal, function(n) {
                /** @preserve
                 * Counter block mode compatible with  Dr Brian Gladman fileenc.c
                 * derived from CryptoJS.mode.CTR
                 * Jan Hruby jhruby.web@gmail.com
                 */
                return n.mode.CTRGladman = function() {
                    var o = n.lib.BlockCipherMode.extend();
                    function s(l) {
                        if ((l >> 24 & 255) === 255) {
                            var d = l >> 16 & 255
                                , u = l >> 8 & 255
                                , f = l & 255;
                            d === 255 ? (d = 0,
                                u === 255 ? (u = 0,
                                    f === 255 ? f = 0 : ++f) : ++u) : ++d,
                                l = 0,
                                l += d << 16,
                                l += u << 8,
                                l += f
                        } else
                            l += 1 << 24;
                        return l
                    }
                    function a(l) {
                        return (l[0] = s(l[0])) === 0 && (l[1] = s(l[1])),
                            l
                    }
                    var c = o.Encryptor = o.extend({
                        processBlock: function(l, d) {
                            var u = this._cipher
                                , f = u.blockSize
                                , m = this._iv
                                , x = this._counter;
                            m && (x = this._counter = m.slice(0),
                                this._iv = void 0),
                                a(x);
                            var _ = x.slice(0);
                            u.encryptBlock(_, 0);
                            for (var g = 0; g < f; g++)
                                l[d + g] ^= _[g]
                        }
                    });
                    return o.Decryptor = c,
                        o
                }(),
                    n.mode.CTRGladman
            })
        }(modeCtrGladman)),
        modeCtrGladman.exports
}
var modeOfb = {
    exports: {}
}, hasRequiredModeOfb;
function requireModeOfb() {
    return hasRequiredModeOfb || (hasRequiredModeOfb = 1,
        function(e, r) {
            (function(n, o, s) {
                    e.exports = o(requireCore(), requireCipherCore())
                }
            )(commonjsGlobal, function(n) {
                return n.mode.OFB = function() {
                    var o = n.lib.BlockCipherMode.extend()
                        , s = o.Encryptor = o.extend({
                        processBlock: function(a, c) {
                            var l = this._cipher
                                , d = l.blockSize
                                , u = this._iv
                                , f = this._keystream;
                            u && (f = this._keystream = u.slice(0),
                                this._iv = void 0),
                                l.encryptBlock(f, 0);
                            for (var m = 0; m < d; m++)
                                a[c + m] ^= f[m]
                        }
                    });
                    return o.Decryptor = s,
                        o
                }(),
                    n.mode.OFB
            })
        }(modeOfb)),
        modeOfb.exports
}
var modeEcb = {
    exports: {}
}, hasRequiredModeEcb;
function requireModeEcb() {
    return hasRequiredModeEcb || (hasRequiredModeEcb = 1,
        function(e, r) {
            (function(n, o, s) {
                    e.exports = o(requireCore(), requireCipherCore())
                }
            )(commonjsGlobal, function(n) {
                return n.mode.ECB = function() {
                    var o = n.lib.BlockCipherMode.extend();
                    return o.Encryptor = o.extend({
                        processBlock: function(s, a) {
                            this._cipher.encryptBlock(s, a)
                        }
                    }),
                        o.Decryptor = o.extend({
                            processBlock: function(s, a) {
                                this._cipher.decryptBlock(s, a)
                            }
                        }),
                        o
                }(),
                    n.mode.ECB
            })
        }(modeEcb)),
        modeEcb.exports
}
var padAnsix923 = {
    exports: {}
}, hasRequiredPadAnsix923;
function requirePadAnsix923() {
    return hasRequiredPadAnsix923 || (hasRequiredPadAnsix923 = 1,
        function(e, r) {
            (function(n, o, s) {
                    e.exports = o(requireCore(), requireCipherCore())
                }
            )(commonjsGlobal, function(n) {
                return n.pad.AnsiX923 = {
                    pad: function(o, s) {
                        var a = o.sigBytes
                            , c = s * 4
                            , l = c - a % c
                            , d = a + l - 1;
                        o.clamp(),
                            o.words[d >>> 2] |= l << 24 - d % 4 * 8,
                            o.sigBytes += l
                    },
                    unpad: function(o) {
                        var s = o.words[o.sigBytes - 1 >>> 2] & 255;
                        o.sigBytes -= s
                    }
                },
                    n.pad.Ansix923
            })
        }(padAnsix923)),
        padAnsix923.exports
}
var padIso10126 = {
    exports: {}
}, hasRequiredPadIso10126;
function requirePadIso10126() {
    return hasRequiredPadIso10126 || (hasRequiredPadIso10126 = 1,
        function(e, r) {
            (function(n, o, s) {
                    e.exports = o(requireCore(), requireCipherCore())
                }
            )(commonjsGlobal, function(n) {
                return n.pad.Iso10126 = {
                    pad: function(o, s) {
                        var a = s * 4
                            , c = a - o.sigBytes % a;
                        o.concat(n.lib.WordArray.random(c - 1)).concat(n.lib.WordArray.create([c << 24], 1))
                    },
                    unpad: function(o) {
                        var s = o.words[o.sigBytes - 1 >>> 2] & 255;
                        o.sigBytes -= s
                    }
                },
                    n.pad.Iso10126
            })
        }(padIso10126)),
        padIso10126.exports
}
var padIso97971 = {
    exports: {}
}, hasRequiredPadIso97971;
function requirePadIso97971() {
    return hasRequiredPadIso97971 || (hasRequiredPadIso97971 = 1,
        function(e, r) {
            (function(n, o, s) {
                    e.exports = o(requireCore(), requireCipherCore())
                }
            )(commonjsGlobal, function(n) {
                return n.pad.Iso97971 = {
                    pad: function(o, s) {
                        o.concat(n.lib.WordArray.create([2147483648], 1)),
                            n.pad.ZeroPadding.pad(o, s)
                    },
                    unpad: function(o) {
                        n.pad.ZeroPadding.unpad(o),
                            o.sigBytes--
                    }
                },
                    n.pad.Iso97971
            })
        }(padIso97971)),
        padIso97971.exports
}
var padZeropadding = {
    exports: {}
}, hasRequiredPadZeropadding;
function requirePadZeropadding() {
    return hasRequiredPadZeropadding || (hasRequiredPadZeropadding = 1,
        function(e, r) {
            (function(n, o, s) {
                    e.exports = o(requireCore(), requireCipherCore())
                }
            )(commonjsGlobal, function(n) {
                return n.pad.ZeroPadding = {
                    pad: function(o, s) {
                        var a = s * 4;
                        o.clamp(),
                            o.sigBytes += a - (o.sigBytes % a || a)
                    },
                    unpad: function(o) {
                        for (var s = o.words, a = o.sigBytes - 1, a = o.sigBytes - 1; a >= 0; a--)
                            if (s[a >>> 2] >>> 24 - a % 4 * 8 & 255) {
                                o.sigBytes = a + 1;
                                break
                            }
                    }
                },
                    n.pad.ZeroPadding
            })
        }(padZeropadding)),
        padZeropadding.exports
}
var padNopadding = {
    exports: {}
}, hasRequiredPadNopadding;
function requirePadNopadding() {
    return hasRequiredPadNopadding || (hasRequiredPadNopadding = 1,
        function(e, r) {
            (function(n, o, s) {
                    e.exports = o(requireCore(), requireCipherCore())
                }
            )(commonjsGlobal, function(n) {
                return n.pad.NoPadding = {
                    pad: function() {},
                    unpad: function() {}
                },
                    n.pad.NoPadding
            })
        }(padNopadding)),
        padNopadding.exports
}
var formatHex = {
    exports: {}
}, hasRequiredFormatHex;
function requireFormatHex() {
    return hasRequiredFormatHex || (hasRequiredFormatHex = 1,
        function(e, r) {
            (function(n, o, s) {
                    e.exports = o(requireCore(), requireCipherCore())
                }
            )(commonjsGlobal, function(n) {
                return function(o) {
                    var s = n
                        , a = s.lib
                        , c = a.CipherParams
                        , l = s.enc
                        , d = l.Hex
                        , u = s.format;
                    u.Hex = {
                        stringify: function(f) {
                            return f.ciphertext.toString(d)
                        },
                        parse: function(f) {
                            var m = d.parse(f);
                            return c.create({
                                ciphertext: m
                            })
                        }
                    }
                }(),
                    n.format.Hex
            })
        }(formatHex)),
        formatHex.exports
}
var aes = {
    exports: {}
}, hasRequiredAes;
function requireAes() {
    return hasRequiredAes || (hasRequiredAes = 1,
        function(e, r) {
            (function(n, o, s) {
                    e.exports = o(requireCore(), requireEncBase64(), requireMd5(), requireEvpkdf(), requireCipherCore())
                }
            )(commonjsGlobal, function(n) {
                return function() {
                    var o = n
                        , s = o.lib
                        , a = s.BlockCipher
                        , c = o.algo
                        , l = []
                        , d = []
                        , u = []
                        , f = []
                        , m = []
                        , x = []
                        , _ = []
                        , g = []
                        , E = []
                        , b = [];
                    (function() {
                            for (var A = [], C = 0; C < 256; C++)
                                C < 128 ? A[C] = C << 1 : A[C] = C << 1 ^ 283;
                            for (var B = 0, P = 0, C = 0; C < 256; C++) {
                                var T = P ^ P << 1 ^ P << 2 ^ P << 3 ^ P << 4;
                                T = T >>> 8 ^ T & 255 ^ 99,
                                    l[B] = T,
                                    d[T] = B;
                                var D = A[B]
                                    , N = A[D]
                                    , F = A[N]
                                    , k = A[T] * 257 ^ T * 16843008;
                                u[B] = k << 24 | k >>> 8,
                                    f[B] = k << 16 | k >>> 16,
                                    m[B] = k << 8 | k >>> 24,
                                    x[B] = k;
                                var k = F * 16843009 ^ N * 65537 ^ D * 257 ^ B * 16843008;
                                _[T] = k << 24 | k >>> 8,
                                    g[T] = k << 16 | k >>> 16,
                                    E[T] = k << 8 | k >>> 24,
                                    b[T] = k,
                                    B ? (B = D ^ A[A[A[F ^ D]]],
                                        P ^= A[A[P]]) : B = P = 1
                            }
                        }
                    )();
                    var w = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54]
                        , y = c.AES = a.extend({
                        _doReset: function() {
                            var A;
                            if (!(this._nRounds && this._keyPriorReset === this._key)) {
                                for (var C = this._keyPriorReset = this._key, B = C.words, P = C.sigBytes / 4, T = this._nRounds = P + 6, D = (T + 1) * 4, N = this._keySchedule = [], F = 0; F < D; F++)
                                    F < P ? N[F] = B[F] : (A = N[F - 1],
                                        F % P ? P > 6 && F % P == 4 && (A = l[A >>> 24] << 24 | l[A >>> 16 & 255] << 16 | l[A >>> 8 & 255] << 8 | l[A & 255]) : (A = A << 8 | A >>> 24,
                                            A = l[A >>> 24] << 24 | l[A >>> 16 & 255] << 16 | l[A >>> 8 & 255] << 8 | l[A & 255],
                                            A ^= w[F / P | 0] << 24),
                                        N[F] = N[F - P] ^ A);
                                for (var k = this._invKeySchedule = [], $ = 0; $ < D; $++) {
                                    var F = D - $;
                                    if ($ % 4)
                                        var A = N[F];
                                    else
                                        var A = N[F - 4];
                                    $ < 4 || F <= 4 ? k[$] = A : k[$] = _[l[A >>> 24]] ^ g[l[A >>> 16 & 255]] ^ E[l[A >>> 8 & 255]] ^ b[l[A & 255]]
                                }
                            }
                        },
                        encryptBlock: function(A, C) {
                            this._doCryptBlock(A, C, this._keySchedule, u, f, m, x, l)
                        },
                        decryptBlock: function(A, C) {
                            var B = A[C + 1];
                            A[C + 1] = A[C + 3],
                                A[C + 3] = B,
                                this._doCryptBlock(A, C, this._invKeySchedule, _, g, E, b, d);
                            var B = A[C + 1];
                            A[C + 1] = A[C + 3],
                                A[C + 3] = B
                        },
                        _doCryptBlock: function(A, C, B, P, T, D, N, F) {
                            for (var k = this._nRounds, $ = A[C] ^ B[0], M = A[C + 1] ^ B[1], Q = A[C + 2] ^ B[2], te = A[C + 3] ^ B[3], J = 4, ae = 1; ae < k; ae++) {
                                var ie = P[$ >>> 24] ^ T[M >>> 16 & 255] ^ D[Q >>> 8 & 255] ^ N[te & 255] ^ B[J++]
                                    , fe = P[M >>> 24] ^ T[Q >>> 16 & 255] ^ D[te >>> 8 & 255] ^ N[$ & 255] ^ B[J++]
                                    , de = P[Q >>> 24] ^ T[te >>> 16 & 255] ^ D[$ >>> 8 & 255] ^ N[M & 255] ^ B[J++]
                                    , z = P[te >>> 24] ^ T[$ >>> 16 & 255] ^ D[M >>> 8 & 255] ^ N[Q & 255] ^ B[J++];
                                $ = ie,
                                    M = fe,
                                    Q = de,
                                    te = z
                            }
                            var ie = (F[$ >>> 24] << 24 | F[M >>> 16 & 255] << 16 | F[Q >>> 8 & 255] << 8 | F[te & 255]) ^ B[J++]
                                , fe = (F[M >>> 24] << 24 | F[Q >>> 16 & 255] << 16 | F[te >>> 8 & 255] << 8 | F[$ & 255]) ^ B[J++]
                                , de = (F[Q >>> 24] << 24 | F[te >>> 16 & 255] << 16 | F[$ >>> 8 & 255] << 8 | F[M & 255]) ^ B[J++]
                                , z = (F[te >>> 24] << 24 | F[$ >>> 16 & 255] << 16 | F[M >>> 8 & 255] << 8 | F[Q & 255]) ^ B[J++];
                            A[C] = ie,
                                A[C + 1] = fe,
                                A[C + 2] = de,
                                A[C + 3] = z
                        },
                        keySize: 256 / 32
                    });
                    o.AES = a._createHelper(y)
                }(),
                    n.AES
            })
        }(aes)),
        aes.exports
}
var tripledes = {
    exports: {}
}, hasRequiredTripledes;
function requireTripledes() {
    return hasRequiredTripledes || (hasRequiredTripledes = 1,
        function(e, r) {
            (function(n, o, s) {
                    e.exports = o(requireCore(), requireEncBase64(), requireMd5(), requireEvpkdf(), requireCipherCore())
                }
            )(commonjsGlobal, function(n) {
                return function() {
                    var o = n
                        , s = o.lib
                        , a = s.WordArray
                        , c = s.BlockCipher
                        , l = o.algo
                        , d = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4]
                        , u = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32]
                        , f = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28]
                        , m = [{
                        0: 8421888,
                        268435456: 32768,
                        536870912: 8421378,
                        805306368: 2,
                        1073741824: 512,
                        1342177280: 8421890,
                        1610612736: 8389122,
                        1879048192: 8388608,
                        2147483648: 514,
                        2415919104: 8389120,
                        2684354560: 33280,
                        2952790016: 8421376,
                        3221225472: 32770,
                        3489660928: 8388610,
                        3758096384: 0,
                        4026531840: 33282,
                        134217728: 0,
                        402653184: 8421890,
                        671088640: 33282,
                        939524096: 32768,
                        1207959552: 8421888,
                        1476395008: 512,
                        1744830464: 8421378,
                        2013265920: 2,
                        2281701376: 8389120,
                        2550136832: 33280,
                        2818572288: 8421376,
                        3087007744: 8389122,
                        3355443200: 8388610,
                        3623878656: 32770,
                        3892314112: 514,
                        4160749568: 8388608,
                        1: 32768,
                        268435457: 2,
                        536870913: 8421888,
                        805306369: 8388608,
                        1073741825: 8421378,
                        1342177281: 33280,
                        1610612737: 512,
                        1879048193: 8389122,
                        2147483649: 8421890,
                        2415919105: 8421376,
                        2684354561: 8388610,
                        2952790017: 33282,
                        3221225473: 514,
                        3489660929: 8389120,
                        3758096385: 32770,
                        4026531841: 0,
                        134217729: 8421890,
                        402653185: 8421376,
                        671088641: 8388608,
                        939524097: 512,
                        1207959553: 32768,
                        1476395009: 8388610,
                        1744830465: 2,
                        2013265921: 33282,
                        2281701377: 32770,
                        2550136833: 8389122,
                        2818572289: 514,
                        3087007745: 8421888,
                        3355443201: 8389120,
                        3623878657: 0,
                        3892314113: 33280,
                        4160749569: 8421378
                    }, {
                        0: 1074282512,
                        16777216: 16384,
                        33554432: 524288,
                        50331648: 1074266128,
                        67108864: 1073741840,
                        83886080: 1074282496,
                        100663296: 1073758208,
                        117440512: 16,
                        134217728: 540672,
                        150994944: 1073758224,
                        167772160: 1073741824,
                        184549376: 540688,
                        201326592: 524304,
                        218103808: 0,
                        234881024: 16400,
                        251658240: 1074266112,
                        8388608: 1073758208,
                        25165824: 540688,
                        41943040: 16,
                        58720256: 1073758224,
                        75497472: 1074282512,
                        92274688: 1073741824,
                        109051904: 524288,
                        125829120: 1074266128,
                        142606336: 524304,
                        159383552: 0,
                        176160768: 16384,
                        192937984: 1074266112,
                        209715200: 1073741840,
                        226492416: 540672,
                        243269632: 1074282496,
                        260046848: 16400,
                        268435456: 0,
                        285212672: 1074266128,
                        301989888: 1073758224,
                        318767104: 1074282496,
                        335544320: 1074266112,
                        352321536: 16,
                        369098752: 540688,
                        385875968: 16384,
                        402653184: 16400,
                        419430400: 524288,
                        436207616: 524304,
                        452984832: 1073741840,
                        469762048: 540672,
                        486539264: 1073758208,
                        503316480: 1073741824,
                        520093696: 1074282512,
                        276824064: 540688,
                        293601280: 524288,
                        310378496: 1074266112,
                        327155712: 16384,
                        343932928: 1073758208,
                        360710144: 1074282512,
                        377487360: 16,
                        394264576: 1073741824,
                        411041792: 1074282496,
                        427819008: 1073741840,
                        444596224: 1073758224,
                        461373440: 524304,
                        478150656: 0,
                        494927872: 16400,
                        511705088: 1074266128,
                        528482304: 540672
                    }, {
                        0: 260,
                        1048576: 0,
                        2097152: 67109120,
                        3145728: 65796,
                        4194304: 65540,
                        5242880: 67108868,
                        6291456: 67174660,
                        7340032: 67174400,
                        8388608: 67108864,
                        9437184: 67174656,
                        10485760: 65792,
                        11534336: 67174404,
                        12582912: 67109124,
                        13631488: 65536,
                        14680064: 4,
                        15728640: 256,
                        524288: 67174656,
                        1572864: 67174404,
                        2621440: 0,
                        3670016: 67109120,
                        4718592: 67108868,
                        5767168: 65536,
                        6815744: 65540,
                        7864320: 260,
                        8912896: 4,
                        9961472: 256,
                        11010048: 67174400,
                        12058624: 65796,
                        13107200: 65792,
                        14155776: 67109124,
                        15204352: 67174660,
                        16252928: 67108864,
                        16777216: 67174656,
                        17825792: 65540,
                        18874368: 65536,
                        19922944: 67109120,
                        20971520: 256,
                        22020096: 67174660,
                        23068672: 67108868,
                        24117248: 0,
                        25165824: 67109124,
                        26214400: 67108864,
                        27262976: 4,
                        28311552: 65792,
                        29360128: 67174400,
                        30408704: 260,
                        31457280: 65796,
                        32505856: 67174404,
                        17301504: 67108864,
                        18350080: 260,
                        19398656: 67174656,
                        20447232: 0,
                        21495808: 65540,
                        22544384: 67109120,
                        23592960: 256,
                        24641536: 67174404,
                        25690112: 65536,
                        26738688: 67174660,
                        27787264: 65796,
                        28835840: 67108868,
                        29884416: 67109124,
                        30932992: 67174400,
                        31981568: 4,
                        33030144: 65792
                    }, {
                        0: 2151682048,
                        65536: 2147487808,
                        131072: 4198464,
                        196608: 2151677952,
                        262144: 0,
                        327680: 4198400,
                        393216: 2147483712,
                        458752: 4194368,
                        524288: 2147483648,
                        589824: 4194304,
                        655360: 64,
                        720896: 2147487744,
                        786432: 2151678016,
                        851968: 4160,
                        917504: 4096,
                        983040: 2151682112,
                        32768: 2147487808,
                        98304: 64,
                        163840: 2151678016,
                        229376: 2147487744,
                        294912: 4198400,
                        360448: 2151682112,
                        425984: 0,
                        491520: 2151677952,
                        557056: 4096,
                        622592: 2151682048,
                        688128: 4194304,
                        753664: 4160,
                        819200: 2147483648,
                        884736: 4194368,
                        950272: 4198464,
                        1015808: 2147483712,
                        1048576: 4194368,
                        1114112: 4198400,
                        1179648: 2147483712,
                        1245184: 0,
                        1310720: 4160,
                        1376256: 2151678016,
                        1441792: 2151682048,
                        1507328: 2147487808,
                        1572864: 2151682112,
                        1638400: 2147483648,
                        1703936: 2151677952,
                        1769472: 4198464,
                        1835008: 2147487744,
                        1900544: 4194304,
                        1966080: 64,
                        2031616: 4096,
                        1081344: 2151677952,
                        1146880: 2151682112,
                        1212416: 0,
                        1277952: 4198400,
                        1343488: 4194368,
                        1409024: 2147483648,
                        1474560: 2147487808,
                        1540096: 64,
                        1605632: 2147483712,
                        1671168: 4096,
                        1736704: 2147487744,
                        1802240: 2151678016,
                        1867776: 4160,
                        1933312: 2151682048,
                        1998848: 4194304,
                        2064384: 4198464
                    }, {
                        0: 128,
                        4096: 17039360,
                        8192: 262144,
                        12288: 536870912,
                        16384: 537133184,
                        20480: 16777344,
                        24576: 553648256,
                        28672: 262272,
                        32768: 16777216,
                        36864: 537133056,
                        40960: 536871040,
                        45056: 553910400,
                        49152: 553910272,
                        53248: 0,
                        57344: 17039488,
                        61440: 553648128,
                        2048: 17039488,
                        6144: 553648256,
                        10240: 128,
                        14336: 17039360,
                        18432: 262144,
                        22528: 537133184,
                        26624: 553910272,
                        30720: 536870912,
                        34816: 537133056,
                        38912: 0,
                        43008: 553910400,
                        47104: 16777344,
                        51200: 536871040,
                        55296: 553648128,
                        59392: 16777216,
                        63488: 262272,
                        65536: 262144,
                        69632: 128,
                        73728: 536870912,
                        77824: 553648256,
                        81920: 16777344,
                        86016: 553910272,
                        90112: 537133184,
                        94208: 16777216,
                        98304: 553910400,
                        102400: 553648128,
                        106496: 17039360,
                        110592: 537133056,
                        114688: 262272,
                        118784: 536871040,
                        122880: 0,
                        126976: 17039488,
                        67584: 553648256,
                        71680: 16777216,
                        75776: 17039360,
                        79872: 537133184,
                        83968: 536870912,
                        88064: 17039488,
                        92160: 128,
                        96256: 553910272,
                        100352: 262272,
                        104448: 553910400,
                        108544: 0,
                        112640: 553648128,
                        116736: 16777344,
                        120832: 262144,
                        124928: 537133056,
                        129024: 536871040
                    }, {
                        0: 268435464,
                        256: 8192,
                        512: 270532608,
                        768: 270540808,
                        1024: 268443648,
                        1280: 2097152,
                        1536: 2097160,
                        1792: 268435456,
                        2048: 0,
                        2304: 268443656,
                        2560: 2105344,
                        2816: 8,
                        3072: 270532616,
                        3328: 2105352,
                        3584: 8200,
                        3840: 270540800,
                        128: 270532608,
                        384: 270540808,
                        640: 8,
                        896: 2097152,
                        1152: 2105352,
                        1408: 268435464,
                        1664: 268443648,
                        1920: 8200,
                        2176: 2097160,
                        2432: 8192,
                        2688: 268443656,
                        2944: 270532616,
                        3200: 0,
                        3456: 270540800,
                        3712: 2105344,
                        3968: 268435456,
                        4096: 268443648,
                        4352: 270532616,
                        4608: 270540808,
                        4864: 8200,
                        5120: 2097152,
                        5376: 268435456,
                        5632: 268435464,
                        5888: 2105344,
                        6144: 2105352,
                        6400: 0,
                        6656: 8,
                        6912: 270532608,
                        7168: 8192,
                        7424: 268443656,
                        7680: 270540800,
                        7936: 2097160,
                        4224: 8,
                        4480: 2105344,
                        4736: 2097152,
                        4992: 268435464,
                        5248: 268443648,
                        5504: 8200,
                        5760: 270540808,
                        6016: 270532608,
                        6272: 270540800,
                        6528: 270532616,
                        6784: 8192,
                        7040: 2105352,
                        7296: 2097160,
                        7552: 0,
                        7808: 268435456,
                        8064: 268443656
                    }, {
                        0: 1048576,
                        16: 33555457,
                        32: 1024,
                        48: 1049601,
                        64: 34604033,
                        80: 0,
                        96: 1,
                        112: 34603009,
                        128: 33555456,
                        144: 1048577,
                        160: 33554433,
                        176: 34604032,
                        192: 34603008,
                        208: 1025,
                        224: 1049600,
                        240: 33554432,
                        8: 34603009,
                        24: 0,
                        40: 33555457,
                        56: 34604032,
                        72: 1048576,
                        88: 33554433,
                        104: 33554432,
                        120: 1025,
                        136: 1049601,
                        152: 33555456,
                        168: 34603008,
                        184: 1048577,
                        200: 1024,
                        216: 34604033,
                        232: 1,
                        248: 1049600,
                        256: 33554432,
                        272: 1048576,
                        288: 33555457,
                        304: 34603009,
                        320: 1048577,
                        336: 33555456,
                        352: 34604032,
                        368: 1049601,
                        384: 1025,
                        400: 34604033,
                        416: 1049600,
                        432: 1,
                        448: 0,
                        464: 34603008,
                        480: 33554433,
                        496: 1024,
                        264: 1049600,
                        280: 33555457,
                        296: 34603009,
                        312: 1,
                        328: 33554432,
                        344: 1048576,
                        360: 1025,
                        376: 34604032,
                        392: 33554433,
                        408: 34603008,
                        424: 0,
                        440: 34604033,
                        456: 1049601,
                        472: 1024,
                        488: 33555456,
                        504: 1048577
                    }, {
                        0: 134219808,
                        1: 131072,
                        2: 134217728,
                        3: 32,
                        4: 131104,
                        5: 134350880,
                        6: 134350848,
                        7: 2048,
                        8: 134348800,
                        9: 134219776,
                        10: 133120,
                        11: 134348832,
                        12: 2080,
                        13: 0,
                        14: 134217760,
                        15: 133152,
                        2147483648: 2048,
                        2147483649: 134350880,
                        2147483650: 134219808,
                        2147483651: 134217728,
                        2147483652: 134348800,
                        2147483653: 133120,
                        2147483654: 133152,
                        2147483655: 32,
                        2147483656: 134217760,
                        2147483657: 2080,
                        2147483658: 131104,
                        2147483659: 134350848,
                        2147483660: 0,
                        2147483661: 134348832,
                        2147483662: 134219776,
                        2147483663: 131072,
                        16: 133152,
                        17: 134350848,
                        18: 32,
                        19: 2048,
                        20: 134219776,
                        21: 134217760,
                        22: 134348832,
                        23: 131072,
                        24: 0,
                        25: 131104,
                        26: 134348800,
                        27: 134219808,
                        28: 134350880,
                        29: 133120,
                        30: 2080,
                        31: 134217728,
                        2147483664: 131072,
                        2147483665: 2048,
                        2147483666: 134348832,
                        2147483667: 133152,
                        2147483668: 32,
                        2147483669: 134348800,
                        2147483670: 134217728,
                        2147483671: 134219808,
                        2147483672: 134350880,
                        2147483673: 134217760,
                        2147483674: 134219776,
                        2147483675: 0,
                        2147483676: 133120,
                        2147483677: 2080,
                        2147483678: 131104,
                        2147483679: 134350848
                    }]
                        , x = [4160749569, 528482304, 33030144, 2064384, 129024, 8064, 504, 2147483679]
                        , _ = l.DES = c.extend({
                        _doReset: function() {
                            for (var w = this._key, y = w.words, A = [], C = 0; C < 56; C++) {
                                var B = d[C] - 1;
                                A[C] = y[B >>> 5] >>> 31 - B % 32 & 1
                            }
                            for (var P = this._subKeys = [], T = 0; T < 16; T++) {
                                for (var D = P[T] = [], N = f[T], C = 0; C < 24; C++)
                                    D[C / 6 | 0] |= A[(u[C] - 1 + N) % 28] << 31 - C % 6,
                                        D[4 + (C / 6 | 0)] |= A[28 + (u[C + 24] - 1 + N) % 28] << 31 - C % 6;
                                D[0] = D[0] << 1 | D[0] >>> 31;
                                for (var C = 1; C < 7; C++)
                                    D[C] = D[C] >>> (C - 1) * 4 + 3;
                                D[7] = D[7] << 5 | D[7] >>> 27
                            }
                            for (var F = this._invSubKeys = [], C = 0; C < 16; C++)
                                F[C] = P[15 - C]
                        },
                        encryptBlock: function(w, y) {
                            this._doCryptBlock(w, y, this._subKeys)
                        },
                        decryptBlock: function(w, y) {
                            this._doCryptBlock(w, y, this._invSubKeys)
                        },
                        _doCryptBlock: function(w, y, A) {
                            this._lBlock = w[y],
                                this._rBlock = w[y + 1],
                                g.call(this, 4, 252645135),
                                g.call(this, 16, 65535),
                                E.call(this, 2, 858993459),
                                E.call(this, 8, 16711935),
                                g.call(this, 1, 1431655765);
                            for (var C = 0; C < 16; C++) {
                                for (var B = A[C], P = this._lBlock, T = this._rBlock, D = 0, N = 0; N < 8; N++)
                                    D |= m[N][((T ^ B[N]) & x[N]) >>> 0];
                                this._lBlock = T,
                                    this._rBlock = P ^ D
                            }
                            var F = this._lBlock;
                            this._lBlock = this._rBlock,
                                this._rBlock = F,
                                g.call(this, 1, 1431655765),
                                E.call(this, 8, 16711935),
                                E.call(this, 2, 858993459),
                                g.call(this, 16, 65535),
                                g.call(this, 4, 252645135),
                                w[y] = this._lBlock,
                                w[y + 1] = this._rBlock
                        },
                        keySize: 64 / 32,
                        ivSize: 64 / 32,
                        blockSize: 64 / 32
                    });
                    function g(w, y) {
                        var A = (this._lBlock >>> w ^ this._rBlock) & y;
                        this._rBlock ^= A,
                            this._lBlock ^= A << w
                    }
                    function E(w, y) {
                        var A = (this._rBlock >>> w ^ this._lBlock) & y;
                        this._lBlock ^= A,
                            this._rBlock ^= A << w
                    }
                    o.DES = c._createHelper(_);
                    var b = l.TripleDES = c.extend({
                        _doReset: function() {
                            var w = this._key
                                , y = w.words;
                            if (y.length !== 2 && y.length !== 4 && y.length < 6)
                                throw new Error("Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192.");
                            var A = y.slice(0, 2)
                                , C = y.length < 4 ? y.slice(0, 2) : y.slice(2, 4)
                                , B = y.length < 6 ? y.slice(0, 2) : y.slice(4, 6);
                            this._des1 = _.createEncryptor(a.create(A)),
                                this._des2 = _.createEncryptor(a.create(C)),
                                this._des3 = _.createEncryptor(a.create(B))
                        },
                        encryptBlock: function(w, y) {
                            this._des1.encryptBlock(w, y),
                                this._des2.decryptBlock(w, y),
                                this._des3.encryptBlock(w, y)
                        },
                        decryptBlock: function(w, y) {
                            this._des3.decryptBlock(w, y),
                                this._des2.encryptBlock(w, y),
                                this._des1.decryptBlock(w, y)
                        },
                        keySize: 192 / 32,
                        ivSize: 64 / 32,
                        blockSize: 64 / 32
                    });
                    o.TripleDES = c._createHelper(b)
                }(),
                    n.TripleDES
            })
        }(tripledes)),
        tripledes.exports
}
var rc4 = {
    exports: {}
}, hasRequiredRc4;
function requireRc4() {
    return hasRequiredRc4 || (hasRequiredRc4 = 1,
        function(e, r) {
            (function(n, o, s) {
                    e.exports = o(requireCore(), requireEncBase64(), requireMd5(), requireEvpkdf(), requireCipherCore())
                }
            )(commonjsGlobal, function(n) {
                return function() {
                    var o = n
                        , s = o.lib
                        , a = s.StreamCipher
                        , c = o.algo
                        , l = c.RC4 = a.extend({
                        _doReset: function() {
                            for (var f = this._key, m = f.words, x = f.sigBytes, _ = this._S = [], g = 0; g < 256; g++)
                                _[g] = g;
                            for (var g = 0, E = 0; g < 256; g++) {
                                var b = g % x
                                    , w = m[b >>> 2] >>> 24 - b % 4 * 8 & 255;
                                E = (E + _[g] + w) % 256;
                                var y = _[g];
                                _[g] = _[E],
                                    _[E] = y
                            }
                            this._i = this._j = 0
                        },
                        _doProcessBlock: function(f, m) {
                            f[m] ^= d.call(this)
                        },
                        keySize: 256 / 32,
                        ivSize: 0
                    });
                    function d() {
                        for (var f = this._S, m = this._i, x = this._j, _ = 0, g = 0; g < 4; g++) {
                            m = (m + 1) % 256,
                                x = (x + f[m]) % 256;
                            var E = f[m];
                            f[m] = f[x],
                                f[x] = E,
                                _ |= f[(f[m] + f[x]) % 256] << 24 - g * 8
                        }
                        return this._i = m,
                            this._j = x,
                            _
                    }
                    o.RC4 = a._createHelper(l);
                    var u = c.RC4Drop = l.extend({
                        cfg: l.cfg.extend({
                            drop: 192
                        }),
                        _doReset: function() {
                            l._doReset.call(this);
                            for (var f = this.cfg.drop; f > 0; f--)
                                d.call(this)
                        }
                    });
                    o.RC4Drop = a._createHelper(u)
                }(),
                    n.RC4
            })
        }(rc4)),
        rc4.exports
}
var rabbit = {
    exports: {}
}, hasRequiredRabbit;
function requireRabbit() {
    return hasRequiredRabbit || (hasRequiredRabbit = 1,
        function(e, r) {
            (function(n, o, s) {
                    e.exports = o(requireCore(), requireEncBase64(), requireMd5(), requireEvpkdf(), requireCipherCore())
                }
            )(commonjsGlobal, function(n) {
                return function() {
                    var o = n
                        , s = o.lib
                        , a = s.StreamCipher
                        , c = o.algo
                        , l = []
                        , d = []
                        , u = []
                        , f = c.Rabbit = a.extend({
                        _doReset: function() {
                            for (var x = this._key.words, _ = this.cfg.iv, g = 0; g < 4; g++)
                                x[g] = (x[g] << 8 | x[g] >>> 24) & 16711935 | (x[g] << 24 | x[g] >>> 8) & 4278255360;
                            var E = this._X = [x[0], x[3] << 16 | x[2] >>> 16, x[1], x[0] << 16 | x[3] >>> 16, x[2], x[1] << 16 | x[0] >>> 16, x[3], x[2] << 16 | x[1] >>> 16]
                                , b = this._C = [x[2] << 16 | x[2] >>> 16, x[0] & 4294901760 | x[1] & 65535, x[3] << 16 | x[3] >>> 16, x[1] & 4294901760 | x[2] & 65535, x[0] << 16 | x[0] >>> 16, x[2] & 4294901760 | x[3] & 65535, x[1] << 16 | x[1] >>> 16, x[3] & 4294901760 | x[0] & 65535];
                            this._b = 0;
                            for (var g = 0; g < 4; g++)
                                m.call(this);
                            for (var g = 0; g < 8; g++)
                                b[g] ^= E[g + 4 & 7];
                            if (_) {
                                var w = _.words
                                    , y = w[0]
                                    , A = w[1]
                                    , C = (y << 8 | y >>> 24) & 16711935 | (y << 24 | y >>> 8) & 4278255360
                                    , B = (A << 8 | A >>> 24) & 16711935 | (A << 24 | A >>> 8) & 4278255360
                                    , P = C >>> 16 | B & 4294901760
                                    , T = B << 16 | C & 65535;
                                b[0] ^= C,
                                    b[1] ^= P,
                                    b[2] ^= B,
                                    b[3] ^= T,
                                    b[4] ^= C,
                                    b[5] ^= P,
                                    b[6] ^= B,
                                    b[7] ^= T;
                                for (var g = 0; g < 4; g++)
                                    m.call(this)
                            }
                        },
                        _doProcessBlock: function(x, _) {
                            var g = this._X;
                            m.call(this),
                                l[0] = g[0] ^ g[5] >>> 16 ^ g[3] << 16,
                                l[1] = g[2] ^ g[7] >>> 16 ^ g[5] << 16,
                                l[2] = g[4] ^ g[1] >>> 16 ^ g[7] << 16,
                                l[3] = g[6] ^ g[3] >>> 16 ^ g[1] << 16;
                            for (var E = 0; E < 4; E++)
                                l[E] = (l[E] << 8 | l[E] >>> 24) & 16711935 | (l[E] << 24 | l[E] >>> 8) & 4278255360,
                                    x[_ + E] ^= l[E]
                        },
                        blockSize: 128 / 32,
                        ivSize: 64 / 32
                    });
                    function m() {
                        for (var x = this._X, _ = this._C, g = 0; g < 8; g++)
                            d[g] = _[g];
                        _[0] = _[0] + 1295307597 + this._b | 0,
                            _[1] = _[1] + 3545052371 + (_[0] >>> 0 < d[0] >>> 0 ? 1 : 0) | 0,
                            _[2] = _[2] + 886263092 + (_[1] >>> 0 < d[1] >>> 0 ? 1 : 0) | 0,
                            _[3] = _[3] + 1295307597 + (_[2] >>> 0 < d[2] >>> 0 ? 1 : 0) | 0,
                            _[4] = _[4] + 3545052371 + (_[3] >>> 0 < d[3] >>> 0 ? 1 : 0) | 0,
                            _[5] = _[5] + 886263092 + (_[4] >>> 0 < d[4] >>> 0 ? 1 : 0) | 0,
                            _[6] = _[6] + 1295307597 + (_[5] >>> 0 < d[5] >>> 0 ? 1 : 0) | 0,
                            _[7] = _[7] + 3545052371 + (_[6] >>> 0 < d[6] >>> 0 ? 1 : 0) | 0,
                            this._b = _[7] >>> 0 < d[7] >>> 0 ? 1 : 0;
                        for (var g = 0; g < 8; g++) {
                            var E = x[g] + _[g]
                                , b = E & 65535
                                , w = E >>> 16
                                , y = ((b * b >>> 17) + b * w >>> 15) + w * w
                                , A = ((E & 4294901760) * E | 0) + ((E & 65535) * E | 0);
                            u[g] = y ^ A
                        }
                        x[0] = u[0] + (u[7] << 16 | u[7] >>> 16) + (u[6] << 16 | u[6] >>> 16) | 0,
                            x[1] = u[1] + (u[0] << 8 | u[0] >>> 24) + u[7] | 0,
                            x[2] = u[2] + (u[1] << 16 | u[1] >>> 16) + (u[0] << 16 | u[0] >>> 16) | 0,
                            x[3] = u[3] + (u[2] << 8 | u[2] >>> 24) + u[1] | 0,
                            x[4] = u[4] + (u[3] << 16 | u[3] >>> 16) + (u[2] << 16 | u[2] >>> 16) | 0,
                            x[5] = u[5] + (u[4] << 8 | u[4] >>> 24) + u[3] | 0,
                            x[6] = u[6] + (u[5] << 16 | u[5] >>> 16) + (u[4] << 16 | u[4] >>> 16) | 0,
                            x[7] = u[7] + (u[6] << 8 | u[6] >>> 24) + u[5] | 0
                    }
                    o.Rabbit = a._createHelper(f)
                }(),
                    n.Rabbit
            })
        }(rabbit)),
        rabbit.exports
}
var rabbitLegacy = {
    exports: {}
}, hasRequiredRabbitLegacy;
function requireRabbitLegacy() {
    return hasRequiredRabbitLegacy || (hasRequiredRabbitLegacy = 1,
        function(e, r) {
            (function(n, o, s) {
                    e.exports = o(requireCore(), requireEncBase64(), requireMd5(), requireEvpkdf(), requireCipherCore())
                }
            )(commonjsGlobal, function(n) {
                return function() {
                    var o = n
                        , s = o.lib
                        , a = s.StreamCipher
                        , c = o.algo
                        , l = []
                        , d = []
                        , u = []
                        , f = c.RabbitLegacy = a.extend({
                        _doReset: function() {
                            var x = this._key.words
                                , _ = this.cfg.iv
                                , g = this._X = [x[0], x[3] << 16 | x[2] >>> 16, x[1], x[0] << 16 | x[3] >>> 16, x[2], x[1] << 16 | x[0] >>> 16, x[3], x[2] << 16 | x[1] >>> 16]
                                , E = this._C = [x[2] << 16 | x[2] >>> 16, x[0] & 4294901760 | x[1] & 65535, x[3] << 16 | x[3] >>> 16, x[1] & 4294901760 | x[2] & 65535, x[0] << 16 | x[0] >>> 16, x[2] & 4294901760 | x[3] & 65535, x[1] << 16 | x[1] >>> 16, x[3] & 4294901760 | x[0] & 65535];
                            this._b = 0;
                            for (var b = 0; b < 4; b++)
                                m.call(this);
                            for (var b = 0; b < 8; b++)
                                E[b] ^= g[b + 4 & 7];
                            if (_) {
                                var w = _.words
                                    , y = w[0]
                                    , A = w[1]
                                    , C = (y << 8 | y >>> 24) & 16711935 | (y << 24 | y >>> 8) & 4278255360
                                    , B = (A << 8 | A >>> 24) & 16711935 | (A << 24 | A >>> 8) & 4278255360
                                    , P = C >>> 16 | B & 4294901760
                                    , T = B << 16 | C & 65535;
                                E[0] ^= C,
                                    E[1] ^= P,
                                    E[2] ^= B,
                                    E[3] ^= T,
                                    E[4] ^= C,
                                    E[5] ^= P,
                                    E[6] ^= B,
                                    E[7] ^= T;
                                for (var b = 0; b < 4; b++)
                                    m.call(this)
                            }
                        },
                        _doProcessBlock: function(x, _) {
                            var g = this._X;
                            m.call(this),
                                l[0] = g[0] ^ g[5] >>> 16 ^ g[3] << 16,
                                l[1] = g[2] ^ g[7] >>> 16 ^ g[5] << 16,
                                l[2] = g[4] ^ g[1] >>> 16 ^ g[7] << 16,
                                l[3] = g[6] ^ g[3] >>> 16 ^ g[1] << 16;
                            for (var E = 0; E < 4; E++)
                                l[E] = (l[E] << 8 | l[E] >>> 24) & 16711935 | (l[E] << 24 | l[E] >>> 8) & 4278255360,
                                    x[_ + E] ^= l[E]
                        },
                        blockSize: 128 / 32,
                        ivSize: 64 / 32
                    });
                    function m() {
                        for (var x = this._X, _ = this._C, g = 0; g < 8; g++)
                            d[g] = _[g];
                        _[0] = _[0] + 1295307597 + this._b | 0,
                            _[1] = _[1] + 3545052371 + (_[0] >>> 0 < d[0] >>> 0 ? 1 : 0) | 0,
                            _[2] = _[2] + 886263092 + (_[1] >>> 0 < d[1] >>> 0 ? 1 : 0) | 0,
                            _[3] = _[3] + 1295307597 + (_[2] >>> 0 < d[2] >>> 0 ? 1 : 0) | 0,
                            _[4] = _[4] + 3545052371 + (_[3] >>> 0 < d[3] >>> 0 ? 1 : 0) | 0,
                            _[5] = _[5] + 886263092 + (_[4] >>> 0 < d[4] >>> 0 ? 1 : 0) | 0,
                            _[6] = _[6] + 1295307597 + (_[5] >>> 0 < d[5] >>> 0 ? 1 : 0) | 0,
                            _[7] = _[7] + 3545052371 + (_[6] >>> 0 < d[6] >>> 0 ? 1 : 0) | 0,
                            this._b = _[7] >>> 0 < d[7] >>> 0 ? 1 : 0;
                        for (var g = 0; g < 8; g++) {
                            var E = x[g] + _[g]
                                , b = E & 65535
                                , w = E >>> 16
                                , y = ((b * b >>> 17) + b * w >>> 15) + w * w
                                , A = ((E & 4294901760) * E | 0) + ((E & 65535) * E | 0);
                            u[g] = y ^ A
                        }
                        x[0] = u[0] + (u[7] << 16 | u[7] >>> 16) + (u[6] << 16 | u[6] >>> 16) | 0,
                            x[1] = u[1] + (u[0] << 8 | u[0] >>> 24) + u[7] | 0,
                            x[2] = u[2] + (u[1] << 16 | u[1] >>> 16) + (u[0] << 16 | u[0] >>> 16) | 0,
                            x[3] = u[3] + (u[2] << 8 | u[2] >>> 24) + u[1] | 0,
                            x[4] = u[4] + (u[3] << 16 | u[3] >>> 16) + (u[2] << 16 | u[2] >>> 16) | 0,
                            x[5] = u[5] + (u[4] << 8 | u[4] >>> 24) + u[3] | 0,
                            x[6] = u[6] + (u[5] << 16 | u[5] >>> 16) + (u[4] << 16 | u[4] >>> 16) | 0,
                            x[7] = u[7] + (u[6] << 8 | u[6] >>> 24) + u[5] | 0
                    }
                    o.RabbitLegacy = a._createHelper(f)
                }(),
                    n.RabbitLegacy
            })
        }(rabbitLegacy)),
        rabbitLegacy.exports
}
var blowfish = {
    exports: {}
}, hasRequiredBlowfish;
function requireBlowfish() {
    return hasRequiredBlowfish || (hasRequiredBlowfish = 1,
        function(e, r) {
            (function(n, o, s) {
                    e.exports = o(requireCore(), requireEncBase64(), requireMd5(), requireEvpkdf(), requireCipherCore())
                }
            )(commonjsGlobal, function(n) {
                return function() {
                    var o = n
                        , s = o.lib
                        , a = s.BlockCipher
                        , c = o.algo;
                    const l = 16
                        , d = [608135816, 2242054355, 320440878, 57701188, 2752067618, 698298832, 137296536, 3964562569, 1160258022, 953160567, 3193202383, 887688300, 3232508343, 3380367581, 1065670069, 3041331479, 2450970073, 2306472731]
                        , u = [[3509652390, 2564797868, 805139163, 3491422135, 3101798381, 1780907670, 3128725573, 4046225305, 614570311, 3012652279, 134345442, 2240740374, 1667834072, 1901547113, 2757295779, 4103290238, 227898511, 1921955416, 1904987480, 2182433518, 2069144605, 3260701109, 2620446009, 720527379, 3318853667, 677414384, 3393288472, 3101374703, 2390351024, 1614419982, 1822297739, 2954791486, 3608508353, 3174124327, 2024746970, 1432378464, 3864339955, 2857741204, 1464375394, 1676153920, 1439316330, 715854006, 3033291828, 289532110, 2706671279, 2087905683, 3018724369, 1668267050, 732546397, 1947742710, 3462151702, 2609353502, 2950085171, 1814351708, 2050118529, 680887927, 999245976, 1800124847, 3300911131, 1713906067, 1641548236, 4213287313, 1216130144, 1575780402, 4018429277, 3917837745, 3693486850, 3949271944, 596196993, 3549867205, 258830323, 2213823033, 772490370, 2760122372, 1774776394, 2652871518, 566650946, 4142492826, 1728879713, 2882767088, 1783734482, 3629395816, 2517608232, 2874225571, 1861159788, 326777828, 3124490320, 2130389656, 2716951837, 967770486, 1724537150, 2185432712, 2364442137, 1164943284, 2105845187, 998989502, 3765401048, 2244026483, 1075463327, 1455516326, 1322494562, 910128902, 469688178, 1117454909, 936433444, 3490320968, 3675253459, 1240580251, 122909385, 2157517691, 634681816, 4142456567, 3825094682, 3061402683, 2540495037, 79693498, 3249098678, 1084186820, 1583128258, 426386531, 1761308591, 1047286709, 322548459, 995290223, 1845252383, 2603652396, 3431023940, 2942221577, 3202600964, 3727903485, 1712269319, 422464435, 3234572375, 1170764815, 3523960633, 3117677531, 1434042557, 442511882, 3600875718, 1076654713, 1738483198, 4213154764, 2393238008, 3677496056, 1014306527, 4251020053, 793779912, 2902807211, 842905082, 4246964064, 1395751752, 1040244610, 2656851899, 3396308128, 445077038, 3742853595, 3577915638, 679411651, 2892444358, 2354009459, 1767581616, 3150600392, 3791627101, 3102740896, 284835224, 4246832056, 1258075500, 768725851, 2589189241, 3069724005, 3532540348, 1274779536, 3789419226, 2764799539, 1660621633, 3471099624, 4011903706, 913787905, 3497959166, 737222580, 2514213453, 2928710040, 3937242737, 1804850592, 3499020752, 2949064160, 2386320175, 2390070455, 2415321851, 4061277028, 2290661394, 2416832540, 1336762016, 1754252060, 3520065937, 3014181293, 791618072, 3188594551, 3933548030, 2332172193, 3852520463, 3043980520, 413987798, 3465142937, 3030929376, 4245938359, 2093235073, 3534596313, 375366246, 2157278981, 2479649556, 555357303, 3870105701, 2008414854, 3344188149, 4221384143, 3956125452, 2067696032, 3594591187, 2921233993, 2428461, 544322398, 577241275, 1471733935, 610547355, 4027169054, 1432588573, 1507829418, 2025931657, 3646575487, 545086370, 48609733, 2200306550, 1653985193, 298326376, 1316178497, 3007786442, 2064951626, 458293330, 2589141269, 3591329599, 3164325604, 727753846, 2179363840, 146436021, 1461446943, 4069977195, 705550613, 3059967265, 3887724982, 4281599278, 3313849956, 1404054877, 2845806497, 146425753, 1854211946], [1266315497, 3048417604, 3681880366, 3289982499, 290971e4, 1235738493, 2632868024, 2414719590, 3970600049, 1771706367, 1449415276, 3266420449, 422970021, 1963543593, 2690192192, 3826793022, 1062508698, 1531092325, 1804592342, 2583117782, 2714934279, 4024971509, 1294809318, 4028980673, 1289560198, 2221992742, 1669523910, 35572830, 157838143, 1052438473, 1016535060, 1802137761, 1753167236, 1386275462, 3080475397, 2857371447, 1040679964, 2145300060, 2390574316, 1461121720, 2956646967, 4031777805, 4028374788, 33600511, 2920084762, 1018524850, 629373528, 3691585981, 3515945977, 2091462646, 2486323059, 586499841, 988145025, 935516892, 3367335476, 2599673255, 2839830854, 265290510, 3972581182, 2759138881, 3795373465, 1005194799, 847297441, 406762289, 1314163512, 1332590856, 1866599683, 4127851711, 750260880, 613907577, 1450815602, 3165620655, 3734664991, 3650291728, 3012275730, 3704569646, 1427272223, 778793252, 1343938022, 2676280711, 2052605720, 1946737175, 3164576444, 3914038668, 3967478842, 3682934266, 1661551462, 3294938066, 4011595847, 840292616, 3712170807, 616741398, 312560963, 711312465, 1351876610, 322626781, 1910503582, 271666773, 2175563734, 1594956187, 70604529, 3617834859, 1007753275, 1495573769, 4069517037, 2549218298, 2663038764, 504708206, 2263041392, 3941167025, 2249088522, 1514023603, 1998579484, 1312622330, 694541497, 2582060303, 2151582166, 1382467621, 776784248, 2618340202, 3323268794, 2497899128, 2784771155, 503983604, 4076293799, 907881277, 423175695, 432175456, 1378068232, 4145222326, 3954048622, 3938656102, 3820766613, 2793130115, 2977904593, 26017576, 3274890735, 3194772133, 1700274565, 1756076034, 4006520079, 3677328699, 720338349, 1533947780, 354530856, 688349552, 3973924725, 1637815568, 332179504, 3949051286, 53804574, 2852348879, 3044236432, 1282449977, 3583942155, 3416972820, 4006381244, 1617046695, 2628476075, 3002303598, 1686838959, 431878346, 2686675385, 1700445008, 1080580658, 1009431731, 832498133, 3223435511, 2605976345, 2271191193, 2516031870, 1648197032, 4164389018, 2548247927, 300782431, 375919233, 238389289, 3353747414, 2531188641, 2019080857, 1475708069, 455242339, 2609103871, 448939670, 3451063019, 1395535956, 2413381860, 1841049896, 1491858159, 885456874, 4264095073, 4001119347, 1565136089, 3898914787, 1108368660, 540939232, 1173283510, 2745871338, 3681308437, 4207628240, 3343053890, 4016749493, 1699691293, 1103962373, 3625875870, 2256883143, 3830138730, 1031889488, 3479347698, 1535977030, 4236805024, 3251091107, 2132092099, 1774941330, 1199868427, 1452454533, 157007616, 2904115357, 342012276, 595725824, 1480756522, 206960106, 497939518, 591360097, 863170706, 2375253569, 3596610801, 1814182875, 2094937945, 3421402208, 1082520231, 3463918190, 2785509508, 435703966, 3908032597, 1641649973, 2842273706, 3305899714, 1510255612, 2148256476, 2655287854, 3276092548, 4258621189, 236887753, 3681803219, 274041037, 1734335097, 3815195456, 3317970021, 1899903192, 1026095262, 4050517792, 356393447, 2410691914, 3873677099, 3682840055], [3913112168, 2491498743, 4132185628, 2489919796, 1091903735, 1979897079, 3170134830, 3567386728, 3557303409, 857797738, 1136121015, 1342202287, 507115054, 2535736646, 337727348, 3213592640, 1301675037, 2528481711, 1895095763, 1721773893, 3216771564, 62756741, 2142006736, 835421444, 2531993523, 1442658625, 3659876326, 2882144922, 676362277, 1392781812, 170690266, 3921047035, 1759253602, 3611846912, 1745797284, 664899054, 1329594018, 3901205900, 3045908486, 2062866102, 2865634940, 3543621612, 3464012697, 1080764994, 553557557, 3656615353, 3996768171, 991055499, 499776247, 1265440854, 648242737, 3940784050, 980351604, 3713745714, 1749149687, 3396870395, 4211799374, 3640570775, 1161844396, 3125318951, 1431517754, 545492359, 4268468663, 3499529547, 1437099964, 2702547544, 3433638243, 2581715763, 2787789398, 1060185593, 1593081372, 2418618748, 4260947970, 69676912, 2159744348, 86519011, 2512459080, 3838209314, 1220612927, 3339683548, 133810670, 1090789135, 1078426020, 1569222167, 845107691, 3583754449, 4072456591, 1091646820, 628848692, 1613405280, 3757631651, 526609435, 236106946, 48312990, 2942717905, 3402727701, 1797494240, 859738849, 992217954, 4005476642, 2243076622, 3870952857, 3732016268, 765654824, 3490871365, 2511836413, 1685915746, 3888969200, 1414112111, 2273134842, 3281911079, 4080962846, 172450625, 2569994100, 980381355, 4109958455, 2819808352, 2716589560, 2568741196, 3681446669, 3329971472, 1835478071, 660984891, 3704678404, 4045999559, 3422617507, 3040415634, 1762651403, 1719377915, 3470491036, 2693910283, 3642056355, 3138596744, 1364962596, 2073328063, 1983633131, 926494387, 3423689081, 2150032023, 4096667949, 1749200295, 3328846651, 309677260, 2016342300, 1779581495, 3079819751, 111262694, 1274766160, 443224088, 298511866, 1025883608, 3806446537, 1145181785, 168956806, 3641502830, 3584813610, 1689216846, 3666258015, 3200248200, 1692713982, 2646376535, 4042768518, 1618508792, 1610833997, 3523052358, 4130873264, 2001055236, 3610705100, 2202168115, 4028541809, 2961195399, 1006657119, 2006996926, 3186142756, 1430667929, 3210227297, 1314452623, 4074634658, 4101304120, 2273951170, 1399257539, 3367210612, 3027628629, 1190975929, 2062231137, 2333990788, 2221543033, 2438960610, 1181637006, 548689776, 2362791313, 3372408396, 3104550113, 3145860560, 296247880, 1970579870, 3078560182, 3769228297, 1714227617, 3291629107, 3898220290, 166772364, 1251581989, 493813264, 448347421, 195405023, 2709975567, 677966185, 3703036547, 1463355134, 2715995803, 1338867538, 1343315457, 2802222074, 2684532164, 233230375, 2599980071, 2000651841, 3277868038, 1638401717, 4028070440, 3237316320, 6314154, 819756386, 300326615, 590932579, 1405279636, 3267499572, 3150704214, 2428286686, 3959192993, 3461946742, 1862657033, 1266418056, 963775037, 2089974820, 2263052895, 1917689273, 448879540, 3550394620, 3981727096, 150775221, 3627908307, 1303187396, 508620638, 2975983352, 2726630617, 1817252668, 1876281319, 1457606340, 908771278, 3720792119, 3617206836, 2455994898, 1729034894, 1080033504], [976866871, 3556439503, 2881648439, 1522871579, 1555064734, 1336096578, 3548522304, 2579274686, 3574697629, 3205460757, 3593280638, 3338716283, 3079412587, 564236357, 2993598910, 1781952180, 1464380207, 3163844217, 3332601554, 1699332808, 1393555694, 1183702653, 3581086237, 1288719814, 691649499, 2847557200, 2895455976, 3193889540, 2717570544, 1781354906, 1676643554, 2592534050, 3230253752, 1126444790, 2770207658, 2633158820, 2210423226, 2615765581, 2414155088, 3127139286, 673620729, 2805611233, 1269405062, 4015350505, 3341807571, 4149409754, 1057255273, 2012875353, 2162469141, 2276492801, 2601117357, 993977747, 3918593370, 2654263191, 753973209, 36408145, 2530585658, 25011837, 3520020182, 2088578344, 530523599, 2918365339, 1524020338, 1518925132, 3760827505, 3759777254, 1202760957, 3985898139, 3906192525, 674977740, 4174734889, 2031300136, 2019492241, 3983892565, 4153806404, 3822280332, 352677332, 2297720250, 60907813, 90501309, 3286998549, 1016092578, 2535922412, 2839152426, 457141659, 509813237, 4120667899, 652014361, 1966332200, 2975202805, 55981186, 2327461051, 676427537, 3255491064, 2882294119, 3433927263, 1307055953, 942726286, 933058658, 2468411793, 3933900994, 4215176142, 1361170020, 2001714738, 2830558078, 3274259782, 1222529897, 1679025792, 2729314320, 3714953764, 1770335741, 151462246, 3013232138, 1682292957, 1483529935, 471910574, 1539241949, 458788160, 3436315007, 1807016891, 3718408830, 978976581, 1043663428, 3165965781, 1927990952, 4200891579, 2372276910, 3208408903, 3533431907, 1412390302, 2931980059, 4132332400, 1947078029, 3881505623, 4168226417, 2941484381, 1077988104, 1320477388, 886195818, 18198404, 3786409e3, 2509781533, 112762804, 3463356488, 1866414978, 891333506, 18488651, 661792760, 1628790961, 3885187036, 3141171499, 876946877, 2693282273, 1372485963, 791857591, 2686433993, 3759982718, 3167212022, 3472953795, 2716379847, 445679433, 3561995674, 3504004811, 3574258232, 54117162, 3331405415, 2381918588, 3769707343, 4154350007, 1140177722, 4074052095, 668550556, 3214352940, 367459370, 261225585, 2610173221, 4209349473, 3468074219, 3265815641, 314222801, 3066103646, 3808782860, 282218597, 3406013506, 3773591054, 379116347, 1285071038, 846784868, 2669647154, 3771962079, 3550491691, 2305946142, 453669953, 1268987020, 3317592352, 3279303384, 3744833421, 2610507566, 3859509063, 266596637, 3847019092, 517658769, 3462560207, 3443424879, 370717030, 4247526661, 2224018117, 4143653529, 4112773975, 2788324899, 2477274417, 1456262402, 2901442914, 1517677493, 1846949527, 2295493580, 3734397586, 2176403920, 1280348187, 1908823572, 3871786941, 846861322, 1172426758, 3287448474, 3383383037, 1655181056, 3139813346, 901632758, 1897031941, 2986607138, 3066810236, 3447102507, 1393639104, 373351379, 950779232, 625454576, 3124240540, 4148612726, 2007998917, 544563296, 2244738638, 2330496472, 2058025392, 1291430526, 424198748, 50039436, 29584100, 3605783033, 2429876329, 2791104160, 1057563949, 3255363231, 3075367218, 3463963227, 1469046755, 985887462]];
                    var f = {
                        pbox: [],
                        sbox: []
                    };
                    function m(b, w) {
                        let y = w >> 24 & 255
                            , A = w >> 16 & 255
                            , C = w >> 8 & 255
                            , B = w & 255
                            , P = b.sbox[0][y] + b.sbox[1][A];
                        return P = P ^ b.sbox[2][C],
                            P = P + b.sbox[3][B],
                            P
                    }
                    function x(b, w, y) {
                        let A = w, C = y, B;
                        for (let P = 0; P < l; ++P)
                            A = A ^ b.pbox[P],
                                C = m(b, A) ^ C,
                                B = A,
                                A = C,
                                C = B;
                        return B = A,
                            A = C,
                            C = B,
                            C = C ^ b.pbox[l],
                            A = A ^ b.pbox[l + 1],
                            {
                                left: A,
                                right: C
                            }
                    }
                    function _(b, w, y) {
                        let A = w, C = y, B;
                        for (let P = l + 1; P > 1; --P)
                            A = A ^ b.pbox[P],
                                C = m(b, A) ^ C,
                                B = A,
                                A = C,
                                C = B;
                        return B = A,
                            A = C,
                            C = B,
                            C = C ^ b.pbox[1],
                            A = A ^ b.pbox[0],
                            {
                                left: A,
                                right: C
                            }
                    }
                    function g(b, w, y) {
                        for (let T = 0; T < 4; T++) {
                            b.sbox[T] = [];
                            for (let D = 0; D < 256; D++)
                                b.sbox[T][D] = u[T][D]
                        }
                        let A = 0;
                        for (let T = 0; T < l + 2; T++)
                            b.pbox[T] = d[T] ^ w[A],
                                A++,
                            A >= y && (A = 0);
                        let C = 0
                            , B = 0
                            , P = 0;
                        for (let T = 0; T < l + 2; T += 2)
                            P = x(b, C, B),
                                C = P.left,
                                B = P.right,
                                b.pbox[T] = C,
                                b.pbox[T + 1] = B;
                        for (let T = 0; T < 4; T++)
                            for (let D = 0; D < 256; D += 2)
                                P = x(b, C, B),
                                    C = P.left,
                                    B = P.right,
                                    b.sbox[T][D] = C,
                                    b.sbox[T][D + 1] = B;
                        return !0
                    }
                    var E = c.Blowfish = a.extend({
                        _doReset: function() {
                            if (this._keyPriorReset !== this._key) {
                                var b = this._keyPriorReset = this._key
                                    , w = b.words
                                    , y = b.sigBytes / 4;
                                g(f, w, y)
                            }
                        },
                        encryptBlock: function(b, w) {
                            var y = x(f, b[w], b[w + 1]);
                            b[w] = y.left,
                                b[w + 1] = y.right
                        },
                        decryptBlock: function(b, w) {
                            var y = _(f, b[w], b[w + 1]);
                            b[w] = y.left,
                                b[w + 1] = y.right
                        },
                        blockSize: 64 / 32,
                        keySize: 128 / 32,
                        ivSize: 64 / 32
                    });
                    o.Blowfish = a._createHelper(E)
                }(),
                    n.Blowfish
            })
        }(blowfish)),
        blowfish.exports
}
(function(e, r) {
        (function(n, o, s) {
                e.exports = o(requireCore(), requireX64Core(), requireLibTypedarrays(), requireEncUtf16(), requireEncBase64(), requireEncBase64url(), requireMd5(), requireSha1(), requireSha256(), requireSha224(), requireSha512(), requireSha384(), requireSha3(), requireRipemd160(), requireHmac(), requirePbkdf2(), requireEvpkdf(), requireCipherCore(), requireModeCfb(), requireModeCtr(), requireModeCtrGladman(), requireModeOfb(), requireModeEcb(), requirePadAnsix923(), requirePadIso10126(), requirePadIso97971(), requirePadZeropadding(), requirePadNopadding(), requireFormatHex(), requireAes(), requireTripledes(), requireRc4(), requireRabbit(), requireRabbitLegacy(), requireBlowfish())
            }
        )(commonjsGlobal, function(n) {
            return n
        })
    }
)(cryptoJs);
var cryptoJsExports = cryptoJs.exports;
const CryptoJS = getDefaultExportFromCjs(cryptoJsExports);
function aesEncrypt(e, r) {
    var n = CryptoJS.enc.Utf8.parse(r)
        , o = CryptoJS.enc.Utf8.parse(e)
        , s = CryptoJS.AES.encrypt(o, n, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return s.toString()
}
const getApiSign = (e,r,n,o,s,a,c,l,d)=>{
        let u = {
            app_id: e,
            device_id: r,
            nonce_str: n,
            timestamp: o,
            auth_id: s,
            token: a,
            source_type: d,
            ...c
        }
            , f = Object.keys(u);
        f.sort();
        let m = "";
        for (let x of f) {
            if (x == "file")
                continue;
            let _ = "";
            Array.isArray(u[x]) ? _ = JSON.stringify(u[x]) : _ = "" + u[x],
                m += x + "=" + _ + "&&"
        }
        return CryptoJS.SHA256(m + l)
    }
;
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
    if (!getRandomValues && (getRandomValues = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto),
        !getRandomValues))
        throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    return getRandomValues(rnds8)
}
const byteToHex = [];
for (let e = 0; e < 256; ++e)
    byteToHex.push((e + 256).toString(16).slice(1));
function unsafeStringify(e, r=0) {
    return byteToHex[e[r + 0]] + byteToHex[e[r + 1]] + byteToHex[e[r + 2]] + byteToHex[e[r + 3]] + "-" + byteToHex[e[r + 4]] + byteToHex[e[r + 5]] + "-" + byteToHex[e[r + 6]] + byteToHex[e[r + 7]] + "-" + byteToHex[e[r + 8]] + byteToHex[e[r + 9]] + "-" + byteToHex[e[r + 10]] + byteToHex[e[r + 11]] + byteToHex[e[r + 12]] + byteToHex[e[r + 13]] + byteToHex[e[r + 14]] + byteToHex[e[r + 15]]
}
const randomUUID = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto)
    , native = {
    randomUUID
};
function v4(e, r, n) {
    if (native.randomUUID && !r && !e)
        return native.randomUUID();
    e = e || {};
    const o = e.random || (e.rng || rng)();
    if (o[6] = o[6] & 15 | 64,
        o[8] = o[8] & 63 | 128,
        r) {
        n = n || 0;
        for (let s = 0; s < 16; ++s)
            r[n + s] = o[s];
        return r
    }
    return unsafeStringify(o)
}
const request = axios$1.create({
    baseURL: "https://op-api.cloud.jinhua.com.cn",
    timeout: 15e3,
    headers: {
        "Content-Type": "application/json; charset=utf-8"
    }
});
request.interceptors.request.use(function(e) {
    const r = userStore()
        , {token: n, appId: o, systemInfo: s, signKey: a, userInfo: c, env: l} = storeToRefs(r)
        , d = e.headers
        , u = v4()
        , f = new Date().getTime();
    d["Access-App-Id"] = o.value,
        d["Access-Device-Id"] = s.value.deviceId,
        d["Access-Nonce-Str"] = u,
        d["Access-Timestamp"] = f,
        d["Access-Auth-Id"] = c.value.account_id,
    d["Access-Api-Token"] || (d["Access-Api-Token"] = c.value.token),
        d["Access-Type"] = l.value;
    let m = {};
    if (e.headers["Content-Type"] == "multipart/form-data") {
        d["Content-Type"] = e.headers["Content-Type"];
        for (const [x,_] of e.data.entries())
            m[x] = _
    } else
        m = e.data || e.params || {};
    if (d["Access-Api-Signature"] = getApiSign(o.value, s.value.deviceId, u, f, c.value.account_id || "", d["Access-Api-Token"] || "", m, d.auth == !1 ? "35c782a2" : a.value, l.value),
    d.auth != !1)
        if (n.value)
            d.Authorization = "Bearer " + n.value;
        else {
            const x = new AbortController;
            return x.abort(),
                {
                    ...e,
                    signal: x.signal
                }
        }
    return e
}, function(e) {
    return alert("请求错误：".concat(e)),
        Promise.reject(e)
});
request.interceptors.response.use(function(e) {
    if (e.data.code === 0)
        return e.data.data;
    if (e.data.code === 10001) {
        const r = userStore();
        localStorage.clear(),
            sessionStorage.clear(),
            location.href = r.fullLink
    } else if (e.data.code === 10002) {
        const r = userStore();
        localStorage.clear(),
            sessionStorage.clear(),
            location.href = r.fullLink
    } else
        return e.data.code === 1e4 || showFailToast(e.data.message),
            Promise.reject(e.data.code)
}, function(e) {
    switch (e.code) {
        case "Network Error":
        case "ERR_BAD_REQUEST":
            showToast({
                message: "网络错误"
            });
            break
    }
    return Promise.reject(e)
});
const requestGet = async(e,r)=>request({
    url: e,
    method: "get",
    params: r
})
    , requestPost = (e,r)=>request({
    url: e,
    method: "post",
    data: r
});
function getBigWheelDetail(e) {
    return request({
        method: "post",
        url: "/api/lotterybigwheel/_ac_detail",
        data: {
            id: e
        },
        headers: {
            auth: !1
        }
    })
}
function getLotteryCount(e, r) {
    return request({
        method: "post",
        url: "/api/lotterybigwheel/_ac_lottery_count",
        data: {
            id: e,
            module: r
        }
    })
}
function lottery(e, r, n) {
    return request({
        method: "post",
        url: "/api/lotterybigwheel/_ac_lottery",
        data: {
            id: e,
            app_id: r,
            module: n
        }
    })
}
function getPrizeRecord(e, r) {
    return request({
        method: "post",
        url: "/api/lotterybigwheel/_ac_lottery_records",
        data: {
            id: e,
            module: r
        }
    })
}
function getPrizeRecordDetail(e, r) {
    return request({
        method: "get",
        url: "/api/lotterybigwheel/_ac_lottery_record",
        params: {
            id: e,
            module: r == "bigWheel" ? "" : r
        }
    })
}
function fetchReward(e, r) {
    return request({
        method: "post",
        url: "/api/lotterybigwheel/_ac_url_scheme",
        data: {
            record_id: e,
            platform: r
        }
    })
}
function collect(e, r, n) {
    return request({
        method: "post",
        url: "/api/lotterybigwheel/collection",
        data: {
            record_id: r,
            activity_id: e,
            collection: n
        }
    })
}
function exchange(e) {
    return request({
        method: "post",
        url: "/api/lotterybigwheel/exchange_lottery_num",
        data: {
            id: e
        }
    })
}
const useModalStore = defineStore({
    id: "modal",
    state: ()=>({
        loading: {
            visible: !1,
            title: "加载中..."
        }
    }),
    actions: {
        showLoading(e) {
            this.loading = {
                visible: !0,
                title: e || "加载中..."
            },
                setTimeout(()=>{
                        this.hideLoading()
                    }
                    , 1e4)
        },
        hideLoading() {
            this.loading = {
                ...this.loading,
                visible: !1
            }
        }
    }
})
    , IconRedPacket = "/assets/hb-44bdf8cb.png"
    , IconCredit = "/assets/jf-2ac05be1.png"
    , useBigWheelStore = defineStore({
    id: "bigWheel",
    state: ()=>({
        style: {
            is_show_countdown_start: !1,
            is_show_countdown_end: !1,
            is_show_myPrize_button: !1,
            style_theme_type: 1,
            is_show_prize_icon: !0,
            is_show_prize_title: !1,
            is_show_prize_good_title: !1,
            background_color: "",
            padding_top: 0,
            background_image: "",
            bg_image_show_type: 0,
            is_show_win_rotation: 0
        },
        result: {
            win: !1,
            notWon: !1,
            result: "",
            code: "",
            title: "",
            text: "",
            prize: "",
            prizeIcon: "",
            duration: 5e3,
            count: 0,
            id: 0,
            bind: !1,
            type: 0,
            exchangeCount: 0,
            exchangeScore: 0
        },
        prize: {
            show: !1,
            record: [],
            options: [],
            default: {
                id: 0,
                title: "谢谢参与",
                goodsTitle: "谢谢参与",
                goodsIndexpic: "https://img.cloud.jinhua.com.cn/jhgd/icon/smile.png"
            },
            list: []
        },
        ruleInfo: {
            win: {
                title: "",
                text: "",
                prize: ""
            },
            notWon: {
                title: "",
                text: "",
                icon: "https://img.cloud.jinhua.com.cn/jhgd/icon/cry.png"
            },
            collection: {},
            isJump: !1,
            url: "",
            isVerify: 0,
            verifyType: 1,
            onVerify: !1
        },
        setting: {
            allowWx: !1,
            allowPc: !1
        },
        share: {
            brief: "",
            index_pic: "",
            link_url: "",
            title: ""
        },
        inviteTask: {
            show: !1,
            text: "助力赢机会",
            btnColor: ""
        },
        doTask: {
            show: !1,
            text: "",
            defaultText: "做任务",
            url: "",
            defaultUrl: "",
            btnColor: ""
        },
        wins: [],
        description: "",
        countDown: 0,
        title: "",
        indexPic: "",
        organizer: "",
        transactor: "",
        recordReady: !1
    }),
    actions: {
        setOrganizer(e) {
            this.organizer = e
        },
        setTransactor(e) {
            this.transactor = e
        },
        setStyle(e) {
            this.style = {
                ...this.style,
                ...e
            }
        },
        setResult(e) {
            this.result = {
                ...this.result,
                ...e
            }
        },
        setPrize(e) {
            this.prize = {
                ...this.prize,
                ...e
            }
        },
        setRuleInfo(e) {
            this.ruleInfo = {
                ...this.ruleInfo,
                ...e
            }
        },
        setSetting(e) {
            this.settting = {
                ...this.settting,
                ...e
            }
        },
        setDescription(e) {
            this.description = e
        },
        setCountdonw(e) {
            this.countDown = e
        },
        setShare(e) {
            this.share = {
                ...e
            }
        },
        setDownload(e) {
            this.download = {
                ...e
            }
        },
        setTitle(e) {
            this.title = e
        },
        setIndexPic(e) {
            this.indexPic = e
        }
    }
})
    , index$d = ""
    , index$c = ""
    , index$b = ""
    , _withScopeId$2 = e=>(pushScopeId("data-v-8c0e2601"),
    e = e(),
    popScopeId(),
    e)
    , _hoisted_1$4 = _withScopeId$2(()=>createBaseVNode("p", {
    class: "title"
}, "信息收集", -1))
    , _hoisted_2$3 = {
    class: "form"
}
    , _hoisted_3$3 = {
    class: "item"
}
    , _hoisted_4$2 = {
    class: "field-title"
}
    , _hoisted_5$2 = {
    key: 0,
    style: {
        color: "#ff2557"
    }
}
    , _hoisted_6$1 = ["type", "placeholder", "maxlength", "onChange"]
    , _hoisted_7$1 = {
    class: "btns"
}
    , _sfc_main$6 = defineComponent({
    __name: "Collection",
    props: {
        fields: {},
        modelValue: {
            type: Boolean
        }
    },
    emits: ["update:modelValue", "submit"],
    setup(__props, {emit: __emit}) {
        const fieldData = {}
            , props = __props
            , emit = __emit
            , valueId = computed({
                get: ()=>props.modelValue,
                set: e=>{
                    emit("update:modelValue", e)
                }
            })
            , submit = ()=>{
                for (const i of props.fields) {
                    const v = fieldData[i.data.title];
                    if (i.data.required) {
                        if (!v) {
                            showToast("".concat(i.data.title, "必填"));
                            return
                        }
                    } else if (!v)
                        continue;
                    if (i.data.pattern && !eval(i.data.pattern).test(v)) {
                        showToast("请填写正确的".concat(i.data.title));
                        return
                    }
                }
                emit("submit", fieldData)
            }
            , onInputChange = (e,r)=>{
                fieldData[r.data.title] = e.target.value
            }
            , cancel = ()=>{
                emit("update:modelValue", !1)
            }
        ;
        return (e,r)=>{
            const n = Button
                , o = Popup;
            return openBlock(),
                createBlock(o, {
                    show: valueId.value,
                    "onUpdate:show": r[0] || (r[0] = s=>valueId.value = s),
                    round: "",
                    "close-on-click-overlay": !1,
                    "z-index": "101",
                    style: {
                        width: "90vw",
                        display: "flex",
                        flexDirection: "column",
                        padding: "15px",
                        paddingTop: "0px",
                        minHeight: "30vh",
                        maxHeight: "70vh",
                        overflow: "auto"
                    }
                }, {
                    default: withCtx(()=>[_hoisted_1$4, createBaseVNode("div", _hoisted_2$3, [(openBlock(!0),
                        createElementBlock(Fragment, null, renderList(e.fields, s=>(openBlock(),
                            createElementBlock("div", _hoisted_3$3, [createBaseVNode("div", _hoisted_4$2, [s.data.required ? (openBlock(),
                                createElementBlock("span", _hoisted_5$2, "*")) : createCommentVNode("", !0), createTextVNode(" " + toDisplayString(s.data.title), 1)]), s.templateId == "username" || s.templateId == "input" || s.templateId == "phone" || s.templateId == "address" ? (openBlock(),
                                createElementBlock("input", {
                                    key: 0,
                                    class: "field",
                                    type: s.data.type,
                                    placeholder: s.data.placeholder,
                                    maxlength: s.data.max,
                                    onChange: a=>onInputChange(a, s)
                                }, null, 40, _hoisted_6$1)) : createCommentVNode("", !0)]))), 256))]), createBaseVNode("div", _hoisted_7$1, [createVNode(n, {
                        onClick: cancel,
                        class: "btn"
                    }, {
                        default: withCtx(()=>[createTextVNode("取消")]),
                        _: 1
                    }), createVNode(n, {
                        onClick: submit,
                        class: "btn",
                        type: "warning"
                    }, {
                        default: withCtx(()=>[createTextVNode("提交")]),
                        _: 1
                    })])]),
                    _: 1
                }, 8, ["show"])
        }
    }
})
    , Collection_vue_vue_type_style_index_0_scoped_8c0e2601_lang = ""
    , Collection = _export_sfc(_sfc_main$6, [["__scopeId", "data-v-8c0e2601"]])
    , _withScopeId$1 = e=>(pushScopeId("data-v-c76ee08d"),
    e = e(),
    popScopeId(),
    e)
    , _hoisted_1$3 = {
    key: 0,
    class: "container"
}
    , _hoisted_2$2 = {
    class: "card"
}
    , _hoisted_3$2 = {
    class: "reward-info"
}
    , _hoisted_4$1 = ["src"]
    , _hoisted_5$1 = {
    class: "info"
}
    , _hoisted_6 = {
    style: {
        display: "flex",
        "align-items": "center"
    }
}
    , _hoisted_7 = {
    style: {
        "margin-right": "15px",
        "max-width": "135px"
    }
}
    , _hoisted_8 = {
    style: {
        margin: "10px 0",
        "font-size": "12px",
        color: "#bfbfbf"
    }
}
    , _hoisted_9 = {
    style: {
        "font-size": "12px",
        color: "#bfbfbf"
    }
}
    , _hoisted_10 = {
    style: {
        "font-size": "13px",
        color: "#999",
        "margin-top": "20px"
    }
}
    , _hoisted_11 = _withScopeId$1(()=>createBaseVNode("div", {
    style: {
        width: "100%",
        height: "1px",
        "background-color": "#f2f4f7",
        "margin-top": "10px"
    }
}, null, -1))
    , _hoisted_12 = {
    style: {
        "font-size": "16px",
        "margin-top": "15px",
        "font-weight": "500"
    }
}
    , _hoisted_13 = {
    style: {
        "font-size": "14px",
        "margin-top": "10px"
    }
}
    , _hoisted_14 = {
    style: {
        "margin-bottom": "5px"
    }
}
    , _hoisted_15 = _withScopeId$1(()=>createBaseVNode("div", {
    style: {
        "font-size": "16px",
        "margin-top": "15px",
        "font-weight": "500"
    }
}, " 使用说明: ", -1))
    , _hoisted_16 = ["innerHTML"]
    , _hoisted_17 = {
    key: 2,
    style: {
        "font-size": "14px"
    }
}
    , _hoisted_18 = {
    key: 3,
    style: {
        "font-size": "14px"
    }
}
    , _hoisted_19 = {
    key: 4,
    style: {
        "font-size": "14px"
    }
}
    , _hoisted_20 = _withScopeId$1(()=>createBaseVNode("div", {
    style: {
        "font-size": "16px",
        "margin-top": "15px",
        "font-weight": "500"
    }
}, " 活动说明: ", -1))
    , _hoisted_21 = ["innerHTML"]
    , _sfc_main$5 = defineComponent({
    __name: "lotteryResult",
    setup(e) {
        const r = userStore()
            , n = useModalStore()
            , o = useBigWheelStore()
            , {ruleInfo: s} = storeToRefs(o)
            , a = ref()
            , c = useRoute()
            , l = ref()
            , d = ref(!1);
        onMounted(()=>{
                n.showLoading(),
                    getPrizeRecordDetail(c.query.id, r.module).then(x=>{
                            if (a.value = x,
                                x.collection)
                                try {
                                    l.value = JSON.parse(x.collection)
                                } catch (_) {}
                            n.hideLoading()
                        }
                    )
            }
        );
        const u = x=>{
                collect(a.value.activityId, c.query.id, JSON.stringify(x)).then(()=>{
                        d.value = !1,
                            showToast("已收集")
                    }
                )
            }
            , f = x=>{
                x.type == LotteryOptionType.RedPacket && x.state == 5 && (n.showLoading(),
                    fetchReward(x.id, r.env).then(_=>{
                            _.data ? showConfirmDialog({
                                title: "提示",
                                message: "当前红包未领取，是否跳转小程序领取"
                            }).then(()=>{
                                    location.href = _.data,
                                        n.hideLoading()
                                }
                            ) : showToast("未获取到scheme_url")
                        }
                    ).finally(()=>{
                            n.hideLoading()
                        }
                    ))
            }
            , m = x=>{
                var _, g;
                switch (x.type) {
                    case LotteryOptionType.Goods:
                        return (_ = x.goodsIndexpic) == null ? void 0 : _.src;
                    case LotteryOptionType.RedPacket:
                        return IconRedPacket;
                    case LotteryOptionType.Credit:
                        return IconCredit;
                    default:
                        return (g = x.goodsIndexpic) == null ? void 0 : g.src
                }
            }
        ;
        return (x,_)=>{
            var E, b, w;
            const g = Tag;
            return a.value ? (openBlock(),
                createElementBlock("div", _hoisted_1$3, [createBaseVNode("div", _hoisted_2$2, [createBaseVNode("div", _hoisted_3$2, [createBaseVNode("img", {
                    onClick: _[0] || (_[0] = y=>f(a.value)),
                    class: "icon",
                    src: m(a.value)
                }, null, 8, _hoisted_4$1), createBaseVNode("div", _hoisted_5$1, [createBaseVNode("div", _hoisted_6, [createBaseVNode("div", _hoisted_7, toDisplayString(a.value.goodsTitle), 1), createVNode(g, {
                    type: (E = unref(RewardStateMap)[a.value.state]) == null ? void 0 : E.theme
                }, {
                    default: withCtx(()=>{
                            var y;
                            return [createTextVNode(toDisplayString((y = unref(RewardStateMap)[a.value.state]) == null ? void 0 : y.str), 1)]
                        }
                    ),
                    _: 1
                }, 8, ["type"])]), createBaseVNode("div", _hoisted_8, " 中奖时间:" + toDisplayString(a.value.createdAt), 1), createBaseVNode("div", _hoisted_9, " 中奖人：" + toDisplayString(a.value.createName), 1)])]), createBaseVNode("div", _hoisted_10, " 中奖识别码：" + toDisplayString(a.value.code), 1), _hoisted_11, a.value.type == 1 || a.value.type == 2 ? (openBlock(),
                    createElementBlock(Fragment, {
                        key: 0
                    }, [createBaseVNode("div", _hoisted_12, [createTextVNode(" 用户信息收集: "), createBaseVNode("a", {
                        onClick: _[1] || (_[1] = y=>d.value = !0),
                        style: {
                            "margin-left": "5px",
                            color: "lightpink",
                            "text-decoration": "underline"
                        }
                    }, "收集信息")]), createBaseVNode("div", _hoisted_13, [(openBlock(!0),
                        createElementBlock(Fragment, null, renderList(Object.keys(l.value || {}), y=>(openBlock(),
                            createElementBlock("div", _hoisted_14, toDisplayString(y) + ":" + toDisplayString(l.value[y]), 1))), 256))])], 64)) : createCommentVNode("", !0), _hoisted_15, a.value.type == unref(LotteryOptionType).Goods ? (openBlock(),
                    createElementBlock("div", {
                        key: 1,
                        innerHTML: a.value.rule,
                        style: {
                            "font-size": "14px"
                        }
                    }, null, 8, _hoisted_16)) : a.value.type == unref(LotteryOptionType).Credit ? (openBlock(),
                    createElementBlock("div", _hoisted_17, " 积分2分钟内会进入用户账户，请前往个人中心查看 ")) : a.value.type == unref(LotteryOptionType).RedPacket && a.value.state == 5 ? (openBlock(),
                    createElementBlock("div", _hoisted_18, " 你还未领取此红包，点击“红包图标”前往领取 ")) : (openBlock(),
                    createElementBlock("div", _hoisted_19, " 红包24小时内到账，请留意微信收款通知 ")), _hoisted_20, createBaseVNode("div", {
                    innerHTML: a.value.brief
                }, null, 8, _hoisted_21)]), ((b = unref(s).collection) == null ? void 0 : b.open) == 1 ? (openBlock(),
                    createBlock(Collection, {
                        key: 0,
                        modelValue: d.value,
                        "onUpdate:modelValue": _[2] || (_[2] = y=>d.value = y),
                        fields: (w = unref(s).collection) == null ? void 0 : w.fields,
                        onSubmit: u
                    }, null, 8, ["modelValue", "fields"])) : createCommentVNode("", !0)])) : createCommentVNode("", !0)
        }
    }
})
    , lotteryResult_vue_vue_type_style_index_0_scoped_c76ee08d_lang = ""
    , LotteryResult = _export_sfc(_sfc_main$5, [["__scopeId", "data-v-c76ee08d"]])
    , getStudyList = e=>request({
    url: "/api/study/detail",
    params: e,
    method: "get",
    headers: {
        auth: !1
    }
})
    , getStudyRank = e=>request({
    url: "/api/study/rank",
    method: "get",
    params: e
})
    , getStudyLevel = async e=>await request({
    url: "/api/study/level",
    method: "get",
    params: e
})
    , getComplete = async e=>await request({
    url: "/api/study/task/complete",
    data: e,
    method: "post"
})
    , getPrizeDrawCount = async e=>await request({
    url: "/api/lotterybigwheel/_ac_lottery_count",
    method: "post",
    data: e
})
    , useStudyStore = defineStore({
    id: "study",
    state: ()=>({
        lotteryConfig: {
            lottery_id: null
        },
        studyList: [],
        studyStyle: {},
        activityDetail: {},
        taskPageReady: !1,
        isReward: 0,
        rule: {
            taskDuration: 0
        }
    }),
    actions: {},
    persist: {
        enabled: !0
    }
});
function useTitle(e) {
    if (e) {
        let r = document.title;
        document.title = e,
            onUnmounted(()=>{
                    document.title = r
                }
            )
    }
}
const _hoisted_1$2 = ["src"]
    , _sfc_main$4 = defineComponent({
    __name: "link",
    setup(e) {
        let r;
        const n = useModalStore()
            , o = useStudyStore();
        n.showLoading();
        const s = useRoute()
            , {id: a, module: c, duration: l=0, title: d} = s.query;
        useTitle(d);
        const u = parseInt(l);
        onUnmounted(()=>{
                r && clearTimeout(r),
                    closeNotify()
            }
        );
        const f = ()=>{
                n.hideLoading(),
                u > 0 && showToast("浏览".concat(u, "秒后即可成阅读")),
                    r = setTimeout(()=>{
                            switch (c) {
                                case "study":
                                    getComplete({
                                        id: a
                                    }).then(m=>{
                                            showNotify({
                                                type: "primary",
                                                message: "你已完成阅读"
                                            }),
                                                o.isReward = m.isReward
                                        }
                                    );
                                    break
                            }
                        }
                        , u * 1e3)
            }
        ;
        return (m,x)=>(openBlock(),
            createElementBlock("iframe", {
                allowfullscreen: "",
                frameborder: "0",
                onLoad: f,
                style: {
                    height: "100vh",
                    width: "100vw"
                },
                src: decodeURIComponent(unref(s).query.url)
            }, "\n  ", 40, _hoisted_1$2))
    }
})
    , useTabBarStore = defineStore({
    id: "tabBar",
    state: ()=>({
        tabBar: {
            activeColor: "#000",
            tabs: [],
            show: !0
        }
    }),
    actions: {
        setTabBar(e) {
            this.tabBar = e
        },
        setActiveColor(e) {
            this.tabBar = {
                ...this.tabBar,
                activeColor: e
            }
        },
        handleTabVisible(e, r) {
            const n = this.tabBar.tabs[e];
            n.show = r
        },
        handleTabBarVisible(e) {
            this.tabBar = {
                ...this.tabBar,
                show: e
            }
        }
    }
});
class JSSDK {
}
class JCYSDK extends JSSDK {
    clearCache() {
        return window.flutter_inappwebview.callHandler("clearCache")
    }
    closePage() {
        return window.flutter_inappwebview.callHandler("closeWebPage")
    }
    realNameAuthenticate() {
        return window.flutter_inappwebview.callHandler("goToVerifyPage")
    }
    bindWechat() {
        return window.flutter_inappwebview.callHandler("bindWeChatPlatform").then(r=>({
            result: r.binSuccess ? 1 : 0
        }))
    }
    goPage(r) {
        r && (location.href = r)
    }
    href(r) {
        switch (r.type) {
            case "innerLink":
            case "outterLink":
                return window.flutter_inappwebview.callHandler("linkTo", {
                    url: r.url
                });
            case "news":
                return window.flutter_inappwebview.callHandler("jumpToNews", {
                    id: r.id + ""
                })
        }
    }
    openApp() {
        return Promise.resolve()
    }
    callAppLogin() {
        return new Promise(r=>{
                window.flutter_inappwebview.callHandler("goToLoginPage"),
                    r(!0)
            }
        )
    }
    isLogin() {
        return window.flutter_inappwebview.callHandler("isLogin")
    }
    onSDKReady() {
        return new Promise((r,n)=>{
                let o = 0
                    , s = setInterval(()=>{
                        o++ > 50 && (n("失败了"),
                            clearInterval(s)),
                        window.moduleReady && (r(null),
                            clearInterval(s))
                    }
                    , 100)
            }
        )
    }
    getUserInfo() {
        return window.flutter_inappwebview.callHandler("getUserInfo").then(r=>{
                const n = JSON.parse(r);
                return {
                    token: n.token,
                    account_id: n.account_id,
                    isBindWechat: n.isBindWechat,
                    isCertificated: n.isVerify
                }
            }
        )
    }
    shareConfig(r) {
        return window.flutter_inappwebview.callHandler("shareTo", {
            ...r,
            is_set: r.isSet || "1"
        })
    }
    getSystemInfo() {
        return new Promise((r,n)=>{
                window.flutter_inappwebview.callHandler("getSystemInfo", {
                    type: ""
                }).then(o=>{
                        const s = JSON.parse(o)
                            , a = s["x-driver-type"].includes("iOS") ? "ios" : s["x-driver-type"];
                        r({
                            deviceId: s["x-driver-id"],
                            deviceType: s["x-phone-models"],
                            system: a,
                            systemVersion: s["x-driver-type"],
                            networkType: s.networkType,
                            safeHeight: {
                                top: s.safePadding.topSafePadding,
                                bottom: s.safePadding.bottomSafePadding
                            }
                        })
                    }
                ).catch(()=>{
                        n()
                    }
                )
            }
        )
    }
}
class TianMuSDK extends JSSDK {
    clearCache() {
        throw new Error("Method not implemented.")
    }
    realNameAuthenticate() {
        throw new Error("Method not implemented.")
    }
    bindWechat() {
        throw new Error("Method not implemented.")
    }
    goPage(r) {
        throw new Error(r)
    }
    closePage() {
        return new Promise((r,n)=>{
                window.CP.closePage({
                    completed: function() {
                        r()
                    },
                    cpIncompatible: function() {
                        n()
                    }
                })
            }
        )
    }
    href(r) {
        return new Promise(n=>{
                switch (r.type) {
                    case "innerLink":
                        window.CP.urlRedirect({
                            url: r.url + "&gaze_open=1"
                        });
                        break;
                    case "outterLink":
                        if (!r.url)
                            return;
                        window.CP.urlRedirect({
                            url: r.url + (r.url.includes("?") ? "&" : "?") + "gaze_open=1"
                        });
                        break;
                    case "news":
                        window.CP.urlRedirect({
                            url: "https://app.tmuyun.com/webDetails/news?id=".concat(r.id, "&tenantId=30&gaze_open=1")
                        });
                        break
                }
                n()
            }
        )
    }
    openApp() {
        return new Promise((r,n)=>{
                window.CP.openInApp({
                    completed: function() {
                        r()
                    },
                    cpIncompatible: function() {
                        n()
                    },
                    timeout: 1e3,
                    defaultClient: {
                        client_code: "xsb_panan"
                    },
                    directJump: 1,
                    link_url: location.href
                })
            }
        )
    }
    callAppLogin() {
        return new Promise((r,n)=>{
                window.CP.showLogin({
                    completed: function(o) {
                        r(o.is_login == "1")
                    },
                    cpIncompatible: function() {
                        n()
                    }
                })
            }
        )
    }
    isLogin() {
        return new Promise((r,n)=>{
                window.CP.isLogin({
                    completed: function(o) {
                        r(o.is_login == "1")
                    },
                    cpIncompatible: function() {
                        n()
                    }
                })
            }
        )
    }
    onSDKReady() {
        return new Promise((r,n)=>{
                window.CP.ready({
                    debug: !1,
                    es6Require: !1,
                    ready: function() {
                        r()
                    },
                    error: function(o) {
                        n(o)
                    }
                })
            }
        )
    }
    getUserInfo() {
        return Promise.all([new Promise((r,n)=>{
                window.CP.getUniqueId({
                    completed: function(o) {
                        r(o.unique_id)
                    },
                    cpIncompatible: function() {
                        n()
                    }
                })
            }
        ), new Promise((r,n)=>{
                window.CP.getCustomerInfo({
                    completed: function(o) {
                        r(o)
                    },
                    cpIncompatible: function() {
                        n()
                    }
                })
            }
        )]).then(r=>{
                const [n,o] = r;
                return {
                    account_id: o.account_id,
                    token: n
                }
            }
        )
    }
    shareConfig(r) {
        return new Promise((n,o)=>{
                window.CP.setShare({
                    completed: function(s) {
                        s.success == "1" ? n() : o()
                    },
                    cpIncompatible: function() {
                        o()
                    },
                    title: r.title,
                    shareTo: "",
                    link: r.link_url,
                    imgUrl: r.indexpic,
                    shareSummary: r.brief
                })
            }
        )
    }
    getSystemInfo() {
        return new Promise((r,n)=>{
                window.CP.getDeviceInfo({
                    completed: function(o) {
                        r({
                            system: o.system,
                            systemVersion: o.system_version,
                            deviceId: o.device_no,
                            deviceType: o.device_type,
                            networkType: o.networkType,
                            safeHeight: {
                                top: 0,
                                bottom: 0
                            }
                        })
                    },
                    cpIncompatible: function() {
                        n()
                    }
                })
            }
        )
    }
}
class UnKownJssdk extends JSSDK {
    onSDKReady() {
        return Promise.resolve()
    }
    callAppLogin() {
        throw new Error("Method not implemented.")
    }
    getUserInfo() {
        return Promise.resolve({
            account_id: "",
            token: "",
            isBindWechat: !1,
            isCertificated: !1
        })
    }
    shareConfig(r) {
        throw new Error(JSON.stringify(r))
    }
    getSystemInfo() {
        let r = localStorage.getItem("device_token");
        return r || (r = v4(),
            localStorage.setItem("device_token", r)),
            Promise.resolve({
                deviceId: r,
                deviceType: "unknow",
                system: "",
                systemVersion: "",
                networkType: "wifi",
                safeHeight: {
                    top: 0,
                    bottom: 0
                }
            })
    }
    isLogin() {
        return Promise.resolve(!0)
    }
    openApp() {
        throw new Error("Method not implemented.")
    }
    href(r) {
        throw new Error(JSON.stringify(r))
    }
    goPage(r) {
        throw new Error(r)
    }
    bindWechat() {
        throw new Error("Method not implemented.")
    }
    realNameAuthenticate() {
        throw new Error("Method not implemented.")
    }
    closePage() {
        throw new Error("Method not implemented.")
    }
    clearCache() {
        throw new Error("Method not implemented.")
    }
}
class WXJssdk extends JSSDK {
    onSDKReady() {
        return Promise.resolve()
    }
    callAppLogin() {
        throw new Error("Method not implemented.")
    }
    getUserInfo() {
        throw new Error("Method not implemented.")
    }
    shareConfig(r) {
        throw new Error(JSON.stringify(r))
    }
    getSystemInfo() {
        let r = localStorage.getItem("device_token");
        return r || (r = v4(),
            localStorage.setItem("device_token", r)),
            Promise.resolve({
                deviceId: r,
                deviceType: "",
                system: "",
                systemVersion: "",
                networkType: "wifi",
                safeHeight: {
                    top: 0,
                    bottom: 0
                }
            })
    }
    isLogin() {
        return Promise.resolve(!0)
    }
    openApp() {
        throw new Error("Method not implemented.")
    }
    href(r) {
        throw new Error(JSON.stringify(r))
    }
    goPage(r) {
        throw new Error(r)
    }
    bindWechat() {
        throw new Error("Method not implemented.")
    }
    realNameAuthenticate() {
        throw new Error("Method not implemented.")
    }
    closePage() {
        throw new Error("Method not implemented.")
    }
    clearCache() {
        throw new Error("Method not implemented.")
    }
}
let sdk;
function getJSSDK(e) {
    if (sdk)
        return sdk;
    switch (e) {
        case "jcy":
            sdk = new JCYSDK;
            break;
        case "tianmu":
            sdk = new TianMuSDK;
            break;
        case "unknow":
            sdk = new UnKownJssdk;
            break;
        case "wx":
            sdk = new WXJssdk;
            break
    }
    return sdk
}
const routes = [{
    path: "/",
    component: Index
}, {
    path: "/link",
    component: _sfc_main$4
}, {
    path: "/404",
    name: "404",
    component: NotFoundPage
}, {
    path: "/lottery/result",
    name: "LotteryResult",
    component: LotteryResult,
    meta: {
        title: "中奖详情"
    }
}]
    , router = createRouter({
    history: createWebHistory({}.BASE_URL),
    routes,
    scrollBehavior(e, r, n) {
        var o;
        return (o = e.meta) != null && o.keepAlive ? n || {
            left: 0,
            top: 0
        } : {
            left: 0,
            top: 0
        }
    }
})
    , commonPaths = ["/lottery/result", "/404"];
router.beforeEach((e,r,n)=>{
        const o = useTabBarStore()
            , s = useModalStore()
            , a = userStore();
        s.hideLoading(),
        o.tabBar && o.tabBar.tabs && o.tabBar.tabs.length && o.handleTabBarVisible(o.tabBar.tabs.some(c=>e.path.includes(c.path))),
        e.meta.title && (document.title = e.meta.title),
            commonPaths.includes(e.path) || e.fullPath.match(/\/m-([a-zA-Z]+)-([a-zA-Z]+)\//) ? n() : n("/m-".concat(a.module, "-").concat(a.provider).concat(e.fullPath))
    }
);
router.onError(e=>{
        if (e.message.includes("Failed to fetch dynamically imported module")) {
            const r = userStore();
            showDialog({
                title: "温馨提示",
                message: "有版本更新，请刷新再试!"
            }).then(()=>{
                    getJSSDK().clearCache(),
                        window.location = r.fullLink
                }
            )
        }
    }
);
const wxLogin = async e=>await request({
    url: "/api/member/wxLogin",
    method: "post",
    headers: {
        ...e,
        auth: !1
    }
})
    , appLogin = async e=>await request({
    url: "/api/member/login",
    method: "post",
    headers: {
        auth: !1
    },
    data: e
})
    , getSiteInfo = ()=>request({
    url: "/api/base/_wx_info",
    method: "get",
    headers: {
        auth: !1
    }
})
    , getCaptcha = (e,r)=>request({
    url: "/api/captcha/get",
    method: "post",
    data: {
        activity_id: e,
        module: r
    },
    headers: {
        auth: !1
    }
})
    , checkCaptcha = e=>request({
    url: "/api/captcha/check",
    method: "post",
    data: e
})
    , getJsSdkSignature = e=>request({
    url: "/api/wx/sign",
    method: "post",
    data: e
})
    , updateMemberInfo = ()=>request({
    url: "/api/member/update",
    method: "post"
})
    , reportError = async e=>{
    const r = userStore()
        , n = await __vitePreload(()=>import("./manifest-ce5ff654.js"), []);
    return request({
        url: "/api/base/exception",
        method: "post",
        data: {
            token: r.token,
            model: r.systemInfo.deviceType,
            platform: r.systemInfo.system,
            osVersion: r.systemInfo.systemVersion,
            h5Version: n.version,
            network: r.systemInfo.networkType,
            ...e
        }
    })
}
    , userStore = defineStore({
    id: "info",
    state: ()=>({
        token: "",
        expires: 0,
        userInfo: {},
        safeHeight: 0,
        appId: "",
        wxAppId: "",
        fullLink: "",
        module: "",
        activityId: "",
        provider: "",
        env: "",
        signKey: "",
        scrollY: 0,
        preview: 0,
        subscribe: 0,
        wxjssdkReady: !1,
        systemInfo: {
            deviceType: "",
            system: "",
            systemVersion: "",
            deviceId: "Az09cM0090MDFSXC",
            safeHeight: {
                top: 0,
                bottom: 0
            }
        },
        vc: {
            app: {}
        }
    }),
    actions: {
        async login(e, r, n) {
            return e == "unknow" && r == 0 ? Promise.resolve() : appLogin({
                debug: r,
                userId: n
            }).then(o=>{
                    this.token = o.token,
                        this.signKey = o.key
                }
            )
        },
        async wxLogin(e) {
            const r = useModalStore();
            return r.showLoading(),
                wxLogin({
                    "Access-Api-Token": e
                }).then(n=>{
                        let o = Math.floor(Date.now() / 1e3);
                        this.token = n.token,
                            this.signKey = n.key,
                            this.expires = o + n.expires - 120,
                            this.subscribe = n.subscribe
                    }
                ).finally(()=>{
                        r.hideLoading()
                    }
                )
        },
        wxAuth(e) {
            location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=".concat(e, "&redirect_uri=").concat(encodeURIComponent(location.href), "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect")
        },
        setProvider(e) {
            this.provider = e
        },
        setUserToken(e) {
            this.userInfo = e
        },
        setSafeHeight(e) {
            this.safeHeight = e
        },
        setAppId(e) {
            this.appId = e
        },
        setModule(e) {
            this.module = e
        },
        setWxAppId(e) {
            this.wxAppId = e
        },
        setFullLink(e) {
            this.fullLink = e
        },
        setWxjssdkReady(e) {
            this.wxjssdkReady = e
        },
        setActivityId(e) {
            this.activityId = e
        },
        isLogin() {
            return !!this.token
        },
        setEnv(e) {
            this.env = e
        },
        setSystemInfo(e) {
            this.systemInfo = e
        },
        setVC(e) {
            this.vc = e
        },
        setPreview(e) {
            this.preview = e
        },
        loadRoutes(e, r, n) {
            n.forEach(o=>{
                    let s = null;
                    (o.component || o.name) && (s = ()=>__variableDynamicImportRuntimeHelper(Object.assign({
                        "../views/answer/detail.vue": ()=>__vitePreload(()=>import("./detail-fa62b7b8.js"), ["assets/detail-fa62b7b8.js", "assets/TextCaptcha-a0a6c69a.js", "assets/TextCaptcha-33835f1c.css", "assets/Captcha-50c4b25a.js", "assets/Captcha-622e3699.css", "assets/index-0c8a8876.js", "assets/answer-833e3373.js", "assets/detail-c37bdf25.css"]),
                        "../views/answer/home.vue": ()=>__vitePreload(()=>import("./home-432f1f21.js"), ["assets/home-432f1f21.js", "assets/index-86964e88.js", "assets/index-49e6873a.css", "assets/index-82aa9a40.js", "assets/index-c67467c1.css", "assets/Lottery-10411c88.js", "assets/BigWheel-e37ef64f.js", "assets/Captcha-50c4b25a.js", "assets/Captcha-622e3699.css", "assets/TextCaptcha-a0a6c69a.js", "assets/TextCaptcha-33835f1c.css", "assets/BigWheel-852a6e14.css", "assets/Lottery-7896b4d5.css", "assets/ActivityDescription-d7f867e7.js", "assets/ActivityDescription-29f30372.css", "assets/PrizeListModal-5e6772b3.js", "assets/img-norecord-266b7c42.js", "assets/model-1c9a6dfc.js", "assets/PrizeListModal-c7339ba5.css", "assets/index-0c8a8876.js", "assets/dayjs.min-b6bb39b4.js", "assets/answer-833e3373.js", "assets/index-af19f611.js", "assets/home-80a68fc1.css"]),
                        "../views/answer/person.vue": ()=>__vitePreload(()=>import("./person-57f0ed41.js"), []),
                        "../views/answer/rank.vue": ()=>__vitePreload(()=>import("./rank-508d1fa3.js"), ["assets/rank-508d1fa3.js", "assets/index-0c8a8876.js", "assets/img-norecord-266b7c42.js", "assets/answer-833e3373.js", "assets/rank-0b00cf4b.css"]),
                        "../views/answer/record.vue": ()=>__vitePreload(()=>import("./record-c24c4fa1.js"), ["assets/record-c24c4fa1.js", "assets/dayjs.min-b6bb39b4.js", "assets/img-norecord-266b7c42.js", "assets/index-0c8a8876.js", "assets/index-c6ec9953.js", "assets/record-2df0702e.css", "assets/index-a02b32f1.css"]),
                        "../views/answer/result.vue": ()=>__vitePreload(()=>import("./result-da969d77.js"), ["assets/result-da969d77.js", "assets/Lottery-10411c88.js", "assets/BigWheel-e37ef64f.js", "assets/Captcha-50c4b25a.js", "assets/Captcha-622e3699.css", "assets/TextCaptcha-a0a6c69a.js", "assets/TextCaptcha-33835f1c.css", "assets/BigWheel-852a6e14.css", "assets/Lottery-7896b4d5.css", "assets/dayjs.min-b6bb39b4.js", "assets/answer-833e3373.js", "assets/result-b2639653.css"]),
                        "../views/benefit/benefitRecord.vue": ()=>__vitePreload(()=>import("./benefitRecord-cc6f47a9.js"), ["assets/benefitRecord-cc6f47a9.js", "assets/index-86964e88.js", "assets/index-49e6873a.css", "assets/index-e382bee5.js", "assets/index-cd8ab090.css", "assets/Exchange-2f65d1ab.js", "assets/index-82aa9a40.js", "assets/index-c67467c1.css", "assets/benefit-1ccc4cc9.js", "assets/index-d8bf69ca.js", "assets/index-39fb64f8.js", "assets/Exchange-4c946dbe.css", "assets/decimal-d133ee8e.js", "assets/dayjs.min-b6bb39b4.js", "assets/NavBar-f0f31c74.js", "assets/NavBar-d2cd393c.css", "assets/index-78473917.js", "assets/index-c6ec9953.js", "assets/benefitRecord-1ce1e8ed.css", "assets/index-a02b32f1.css"]),
                        "../views/benefit/challenge.vue": ()=>__vitePreload(()=>import("./challenge-fdd00d34.js"), ["assets/challenge-fdd00d34.js", "assets/index-e382bee5.js", "assets/index-cd8ab090.css", "assets/little-golden-bean-4ee66cd8.js", "assets/index-d8bf69ca.js", "assets/img-norecord-266b7c42.js", "assets/NavBar-f0f31c74.js", "assets/NavBar-d2cd393c.css", "assets/index-c6ec9953.js", "assets/challenge-9cce5fa3.css", "assets/index-a02b32f1.css"]),
                        "../views/benefit/home.vue": ()=>__vitePreload(()=>import("./home-22dd8976.js"), ["assets/home-22dd8976.js", "assets/index-e382bee5.js", "assets/index-cd8ab090.css", "assets/Exchange-2f65d1ab.js", "assets/index-82aa9a40.js", "assets/index-c67467c1.css", "assets/benefit-1ccc4cc9.js", "assets/index-d8bf69ca.js", "assets/index-39fb64f8.js", "assets/Exchange-4c946dbe.css", "assets/little-golden-bean-4ee66cd8.js", "assets/decimal-d133ee8e.js", "assets/NavBar-f0f31c74.js", "assets/NavBar-d2cd393c.css", "assets/dayjs.min-b6bb39b4.js", "assets/home-3bc2ed5a.css"]),
                        "../views/benefit/signin.vue": ()=>__vitePreload(()=>import("./signin-0765a385.js"), ["assets/signin-0765a385.js", "assets/signin-27c39eba.css"]),
                        "../views/benefit/task.vue": ()=>__vitePreload(()=>import("./task-f54d6ddf.js"), []),
                        "../views/benefit/withdraw.vue": ()=>__vitePreload(()=>import("./withdraw-3492cbdc.js"), ["assets/withdraw-3492cbdc.js", "assets/Captcha-50c4b25a.js", "assets/Captcha-622e3699.css", "assets/NavBar-f0f31c74.js", "assets/NavBar-d2cd393c.css", "assets/index-e382bee5.js", "assets/index-cd8ab090.css", "assets/avatar_default-0860ba30.js", "assets/benefit-1ccc4cc9.js", "assets/index-d8bf69ca.js", "assets/decimal-d133ee8e.js", "assets/withdraw-fa56119e.css"]),
                        "../views/benefit/withdrawRecord.vue": ()=>__vitePreload(()=>import("./withdrawRecord-2c8a0ae1.js"), ["assets/withdrawRecord-2c8a0ae1.js", "assets/index-e382bee5.js", "assets/index-cd8ab090.css", "assets/NavBar-f0f31c74.js", "assets/NavBar-d2cd393c.css", "assets/dayjs.min-b6bb39b4.js", "assets/index-d8bf69ca.js", "assets/decimal-d133ee8e.js", "assets/img-norecord-266b7c42.js", "assets/avatar_default-0860ba30.js", "assets/index-c6ec9953.js", "assets/withdrawRecord-77d474ed.css", "assets/index-a02b32f1.css"]),
                        "../views/bigWheel/home.vue": ()=>__vitePreload(()=>import("./home-46f4afa1.js"), ["assets/home-46f4afa1.js", "assets/index-2c8afa37.js", "assets/index-c8c7e632.css", "assets/DescriptionModal-d401c602.js", "assets/DescriptionModal-c7e55223.css", "assets/BigWheel-e37ef64f.js", "assets/Captcha-50c4b25a.js", "assets/Captcha-622e3699.css", "assets/TextCaptcha-a0a6c69a.js", "assets/TextCaptcha-33835f1c.css", "assets/BigWheel-852a6e14.css", "assets/PrizeListModal-5e6772b3.js", "assets/img-norecord-266b7c42.js", "assets/model-1c9a6dfc.js", "assets/PrizeListModal-c7339ba5.css", "assets/inobounce-459218e6.js", "assets/home-8c655036.css"]),
                        "../views/hotLive/advance.vue": ()=>__vitePreload(()=>import("./advance-b474c84b.js"), ["assets/advance-b474c84b.js", "assets/dayjs.min-b6bb39b4.js", "assets/index-cd9f60f4.js", "assets/img-norecord-266b7c42.js", "assets/index-c6ec9953.js", "assets/advance-dc3c5431.css", "assets/index-a02b32f1.css"]),
                        "../views/hotLive/detail.vue": ()=>__vitePreload(()=>import("./detail-f5108e87.js"), ["assets/detail-f5108e87.js", "assets/icon-fenxiang-b025794a.js", "assets/index-e382bee5.js", "assets/index-cd8ab090.css", "assets/index-c6ec9953.js", "assets/timeformat-a90de9bc.js", "assets/function-call-6c94c2d3.js", "assets/index-6b3258de.js", "assets/index-1a8c21ca.js", "assets/detail-b1cf9970.css"]),
                        "../views/hotLive/home.vue": ()=>__vitePreload(()=>import("./home-c3a62e5a.js"), ["assets/home-c3a62e5a.js", "assets/icon-fenxiang-b025794a.js", "assets/core.esm-f7fce978.js", "assets/index-cd9f60f4.js", "assets/index-6b3258de.js", "assets/index-c6ec9953.js", "assets/home-f2a47883.css", "assets/index-a02b32f1.css"]),
                        "../views/hotLive/popular.vue": ()=>__vitePreload(()=>import("./popular-53c9352a.js"), ["assets/popular-53c9352a.js", "assets/icon-fenxiang-b025794a.js", "assets/img-norecord-266b7c42.js", "assets/index-c6ec9953.js", "assets/popular-30088653.css", "assets/index-a02b32f1.css"]),
                        "../views/juba/exposure.vue": ()=>__vitePreload(()=>import("./exposure-4b2a4a2c.js"), ["assets/exposure-4b2a4a2c.js", "assets/gerengzhuye_zhanwu-ecee6813.js", "assets/VideoPlayer-e5bd6198.js", "assets/VideoPlayer-6805436b.css", "assets/timeformat-a90de9bc.js", "assets/function-call-6c94c2d3.js", "assets/index-6b3258de.js", "assets/exposure-1b78d4f3.css"]),
                        "../views/juba/home.vue": ()=>__vitePreload(()=>import("./home-d1da17e2.js"), ["assets/home-d1da17e2.js", "assets/posts-137103c5.js", "assets/timeformat-a90de9bc.js", "assets/VideoPlayer-e5bd6198.js", "assets/VideoPlayer-6805436b.css", "assets/share-d2566bf3.js", "assets/topic-a34eab1a.js", "assets/function-call-6c94c2d3.js", "assets/index-6b3258de.js", "assets/home-8314cc48.css"]),
                        "../views/juba/posts.vue": ()=>__vitePreload(()=>import("./posts-8e40b92b.js"), ["assets/posts-8e40b92b.js", "assets/topic-a34eab1a.js", "assets/gerengzhuye_zhanwu-ecee6813.js", "assets/VideoPlayer-e5bd6198.js", "assets/VideoPlayer-6805436b.css", "assets/posts-137103c5.js", "assets/timeformat-a90de9bc.js", "assets/function-call-6c94c2d3.js", "assets/index-6b3258de.js", "assets/posts-faf5bef7.css"]),
                        "../views/juba/topic.vue": ()=>__vitePreload(()=>import("./topic-223e73eb.js"), ["assets/topic-223e73eb.js", "assets/timeformat-a90de9bc.js", "assets/VideoPlayer-e5bd6198.js", "assets/VideoPlayer-6805436b.css", "assets/share-d2566bf3.js", "assets/topic-a34eab1a.js", "assets/function-call-6c94c2d3.js", "assets/index-6b3258de.js", "assets/topic-b0c7fe66.css"]),
                        "../views/registration/detail.vue": ()=>__vitePreload(()=>import("./detail-bc6b5dfc.js"), ["assets/detail-bc6b5dfc.js", "assets/detail-7bc06c0e.css"]),
                        "../views/registration/home.vue": ()=>__vitePreload(()=>import("./home-954320c3.js"), ["assets/home-954320c3.js", "assets/index-2c8afa37.js", "assets/index-c8c7e632.css", "assets/home-835cac59.js", "assets/dayjs.min-b6bb39b4.js", "assets/index-82aa9a40.js", "assets/index-c67467c1.css", "assets/index-ad9ffcb4.js", "assets/index-7b7c278d.css", "assets/function-call-6c94c2d3.js", "assets/index-6b3258de.js", "assets/index-1a8c21ca.js", "assets/index-86964e88.js", "assets/index-49e6873a.css", "assets/downArrow-91370dfc.js", "assets/index-78473917.js", "assets/ActivityDescription-d7f867e7.js", "assets/ActivityDescription-29f30372.css", "assets/index-af19f611.js", "assets/index-39fb64f8.js", "assets/home-024034fc.css"]),
                        "../views/registration/myHistory.vue": ()=>__vitePreload(()=>import("./myHistory-3d08ed59.js"), ["assets/myHistory-3d08ed59.js", "assets/home-835cac59.js", "assets/index-c6ec9953.js", "assets/myHistory-5ccbfefe.css", "assets/index-a02b32f1.css"]),
                        "../views/signin/home.vue": ()=>__vitePreload(()=>import("./home-72688b2c.js"), ["assets/home-72688b2c.js", "assets/Lottery-10411c88.js", "assets/BigWheel-e37ef64f.js", "assets/Captcha-50c4b25a.js", "assets/Captcha-622e3699.css", "assets/TextCaptcha-a0a6c69a.js", "assets/TextCaptcha-33835f1c.css", "assets/BigWheel-852a6e14.css", "assets/Lottery-7896b4d5.css", "assets/DescriptionModal-d401c602.js", "assets/DescriptionModal-c7e55223.css", "assets/img-norecord-266b7c42.js", "assets/model-1c9a6dfc.js", "assets/index-c6ec9953.js", "assets/index-2c8afa37.js", "assets/index-c8c7e632.css", "assets/home-0499a530.css", "assets/index-a02b32f1.css"]),
                        "../views/study/desc.vue": ()=>__vitePreload(()=>import("./desc-71014399.js"), ["assets/desc-71014399.js", "assets/desc-309c8391.css"]),
                        "../views/study/home.vue": ()=>__vitePreload(()=>import("./home-44d891ce.js"), ["assets/home-44d891ce.js", "assets/Lottery-10411c88.js", "assets/BigWheel-e37ef64f.js", "assets/Captcha-50c4b25a.js", "assets/Captcha-622e3699.css", "assets/TextCaptcha-a0a6c69a.js", "assets/TextCaptcha-33835f1c.css", "assets/BigWheel-852a6e14.css", "assets/Lottery-7896b4d5.css", "assets/index-2c8afa37.js", "assets/index-c8c7e632.css", "assets/PrizeListModal-5e6772b3.js", "assets/img-norecord-266b7c42.js", "assets/model-1c9a6dfc.js", "assets/PrizeListModal-c7339ba5.css", "assets/dayjs.min-b6bb39b4.js", "assets/inobounce-459218e6.js", "assets/home-40021671.css"]),
                        "../views/study/level.vue": ()=>__vitePreload(()=>import("./level-a11a44b6.js"), ["assets/level-a11a44b6.js", "assets/Lottery-10411c88.js", "assets/BigWheel-e37ef64f.js", "assets/Captcha-50c4b25a.js", "assets/Captcha-622e3699.css", "assets/TextCaptcha-a0a6c69a.js", "assets/TextCaptcha-33835f1c.css", "assets/BigWheel-852a6e14.css", "assets/Lottery-7896b4d5.css", "assets/level-50b79a0d.css"]),
                        "../views/study/rank.vue": ()=>__vitePreload(()=>import("./rank-41b9dc93.js"), ["assets/rank-41b9dc93.js", "assets/img-norecord-266b7c42.js", "assets/index-c6ec9953.js", "assets/rank-d4d818fc.css", "assets/index-a02b32f1.css"]),
                        "../views/vieToAnswer/dailyLuckyPrize.vue": ()=>__vitePreload(()=>import("./dailyLuckyPrize-1e816fac.js"), ["assets/dailyLuckyPrize-1e816fac.js", "assets/index-86964e88.js", "assets/index-49e6873a.css", "assets/downArrow-91370dfc.js", "assets/icon-explanation-5f086d57.js", "assets/myPrize-774df3a6.js", "assets/dayjs.min-b6bb39b4.js", "assets/textAlert-f8bd1ff6.js", "assets/answer-card-header-a4109625.js", "assets/index-39fb64f8.js", "assets/textAlert-f0eadc97.css", "assets/index-c6ec9953.js", "assets/index-78473917.js", "assets/dailyLuckyPrize-25d17cb0.css", "assets/index-a02b32f1.css"]),
                        "../views/vieToAnswer/home.vue": ()=>__vitePreload(()=>import("./home-5a5e085e.js"), ["assets/home-5a5e085e.js", "assets/index-82aa9a40.js", "assets/index-c67467c1.css", "assets/index-2c8afa37.js", "assets/index-c8c7e632.css", "assets/imageUtil-f103c78f.js", "assets/answer-card-header-a4109625.js", "assets/answer-wrong-0ce1a693.js", "assets/downArrow-91370dfc.js", "assets/icon-explanation-5f086d57.js", "assets/myPrize-774df3a6.js", "assets/qrcode-0a6e176c.js", "assets/textAlert-f8bd1ff6.js", "assets/index-39fb64f8.js", "assets/textAlert-f0eadc97.css", "assets/dayjs.min-b6bb39b4.js", "assets/qrcodeAlert-63fe34cb.js", "assets/qrcodeAlert-619a23b7.css", "assets/home-c5b2bd85.css"]),
                        "../views/vieToAnswer/myIntegral.vue": ()=>__vitePreload(()=>import("./myIntegral-1ff9e39d.js"), ["assets/myIntegral-1ff9e39d.js", "assets/myPrize-774df3a6.js", "assets/textAlert-f8bd1ff6.js", "assets/answer-card-header-a4109625.js", "assets/index-39fb64f8.js", "assets/textAlert-f0eadc97.css", "assets/dayjs.min-b6bb39b4.js", "assets/index-c6ec9953.js", "assets/myIntegral-3c996bbc.css", "assets/index-a02b32f1.css"]),
                        "../views/vieToAnswer/myPrize.vue": ()=>__vitePreload(()=>import("./myPrize-ba10db3a.js"), ["assets/myPrize-ba10db3a.js", "assets/icon-explanation-5f086d57.js", "assets/myPrize-774df3a6.js", "assets/textAlert-f8bd1ff6.js", "assets/answer-card-header-a4109625.js", "assets/index-39fb64f8.js", "assets/textAlert-f0eadc97.css", "assets/dayjs.min-b6bb39b4.js", "assets/myPrize-1e9f8217.css"]),
                        "../views/vieToAnswer/qrcodeAlert.vue": ()=>__vitePreload(()=>import("./qrcodeAlert-63fe34cb.js"), ["assets/qrcodeAlert-63fe34cb.js", "assets/qrcode-0a6e176c.js", "assets/index-39fb64f8.js", "assets/qrcodeAlert-619a23b7.css"]),
                        "../views/vieToAnswer/rank.vue": ()=>__vitePreload(()=>import("./rank-bcf6a51b.js"), ["assets/rank-bcf6a51b.js", "assets/myPrize-774df3a6.js", "assets/imageUtil-f103c78f.js", "assets/answer-card-header-a4109625.js", "assets/answer-wrong-0ce1a693.js", "assets/downArrow-91370dfc.js", "assets/icon-explanation-5f086d57.js", "assets/qrcode-0a6e176c.js", "assets/index-39fb64f8.js", "assets/index-c6ec9953.js", "assets/rank-f38e930d.css", "assets/index-a02b32f1.css"]),
                        "../views/vieToAnswer/textAlert.vue": ()=>__vitePreload(()=>import("./textAlert-f8bd1ff6.js"), ["assets/textAlert-f8bd1ff6.js", "assets/answer-card-header-a4109625.js", "assets/index-39fb64f8.js", "assets/textAlert-f0eadc97.css"]),
                        "../views/vieToAnswer/vie.vue": ()=>__vitePreload(()=>import("./vie-b5e35f32.js"), ["assets/vie-b5e35f32.js", "assets/index-2c8afa37.js", "assets/index-c8c7e632.css", "assets/answer-wrong-0ce1a693.js", "assets/answer-card-header-a4109625.js", "assets/dayjs.min-b6bb39b4.js", "assets/index-39fb64f8.js", "assets/vie-0f26ba03.css"]),
                        "../views/vote/detail.vue": ()=>__vitePreload(()=>import("./detail-34961949.js"), ["assets/detail-34961949.js", "assets/Lottery-10411c88.js", "assets/BigWheel-e37ef64f.js", "assets/Captcha-50c4b25a.js", "assets/Captcha-622e3699.css", "assets/TextCaptcha-a0a6c69a.js", "assets/TextCaptcha-33835f1c.css", "assets/BigWheel-852a6e14.css", "assets/Lottery-7896b4d5.css", "assets/index-2c8afa37.js", "assets/index-c8c7e632.css", "assets/Canvassing.vue_vue_type_script_setup_true_lang-8b051d4f.js", "assets/Canvassing-d41d76ab.css", "assets/detail-3c41a9fb.css"]),
                        "../views/vote/home.vue": ()=>__vitePreload(()=>import("./home-ebaa729b.js"), ["assets/home-ebaa729b.js", "assets/Lottery-10411c88.js", "assets/BigWheel-e37ef64f.js", "assets/Captcha-50c4b25a.js", "assets/Captcha-622e3699.css", "assets/TextCaptcha-a0a6c69a.js", "assets/TextCaptcha-33835f1c.css", "assets/BigWheel-852a6e14.css", "assets/Lottery-7896b4d5.css", "assets/ActivityDescription-d7f867e7.js", "assets/ActivityDescription-29f30372.css", "assets/index-ad9ffcb4.js", "assets/index-7b7c278d.css", "assets/Canvassing.vue_vue_type_script_setup_true_lang-8b051d4f.js", "assets/Canvassing-d41d76ab.css", "assets/index-82aa9a40.js", "assets/index-c67467c1.css", "assets/index-2c8afa37.js", "assets/index-c8c7e632.css", "assets/PrizeListModal-5e6772b3.js", "assets/img-norecord-266b7c42.js", "assets/model-1c9a6dfc.js", "assets/PrizeListModal-c7339ba5.css", "assets/core.esm-f7fce978.js", "assets/index-6b3258de.js", "assets/index-c6ec9953.js", "assets/home-3061f9b5.css", "assets/index-a02b32f1.css"])
                    }), "../views/".concat(e, "/").concat(o.component || o.name, ".vue"))),
                        router.addRoute({
                            ...o,
                            path: "/m-".concat(e, "-").concat(r).concat(o.path),
                            component: s
                        })
                }
            )
        }
    },
    persist: {
        enabled: !0,
        strategies: [{
            storage: localStorage,
            paths: ["token", "signKey", "expires", "activityId", "fullLink", "subscribe"]
        }]
    }
})
    , _sfc_main$3 = defineComponent({
    __name: "TabBar",
    props: {
        tabs: {},
        activeColor: {}
    },
    setup(e) {
        const r = userStore();
        return (n,o)=>{
            const s = TabbarItem
                , a = Tabbar;
            return openBlock(),
                createBlock(a, {
                    route: "",
                    border: !1,
                    fixed: "",
                    "active-color": n.activeColor,
                    style: normalizeStyle({
                        "padding-bottom": "".concat(unref(r).safeHeight, "px")
                    })
                }, {
                    default: withCtx(()=>[(openBlock(!0),
                        createElementBlock(Fragment, null, renderList(n.tabs, c=>(openBlock(),
                            createElementBlock(Fragment, null, [c.show ? (openBlock(),
                                createBlock(s, {
                                    key: 0,
                                    to: c.path,
                                    replace: ""
                                }, {
                                    icon: withCtx(()=>[createBaseVNode("i", {
                                        class: normalizeClass(["iconfont", c.icon.src])
                                    }, null, 2)]),
                                    default: withCtx(()=>[createTextVNode(toDisplayString(c.title) + " ", 1)]),
                                    _: 2
                                }, 1032, ["to"])) : createCommentVNode("", !0)], 64))), 256))]),
                    _: 1
                }, 8, ["active-color", "style"])
        }
    }
})
    , _imports_0 = "/assets/people-048a2eac.png"
    , PageLoading_vue_vue_type_style_index_0_scoped_75011315_lang = ""
    , _sfc_main$2 = {}
    , _withScopeId = e=>(pushScopeId("data-v-75011315"),
    e = e(),
    popScopeId(),
    e)
    , _hoisted_1$1 = {
    class: "page-loading"
}
    , _hoisted_2$1 = _withScopeId(()=>createBaseVNode("img", {
    class: "people",
    src: _imports_0
}, null, -1))
    , _hoisted_3$1 = [_hoisted_2$1];
function _sfc_render$1(e, r) {
    return openBlock(),
        createElementBlock("div", _hoisted_1$1, _hoisted_3$1)
}
const __unplugin_components_0 = _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__scopeId", "data-v-75011315"]]);
function download() {
    let e = navigator.userAgent
        , r = e.indexOf("Android") > -1 || e.indexOf("Linux") > -1
        , n = !!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
        , o = window.document;
    r && (window.location.href = "jincaiapp://com.hoge.android.jinhua/jincaiapp",
        setTimeout(function() {
            let s = o.hidden || o.mozHidden || o.msHidden || o.webkitHidden;
            (typeof s > "u" || s == !1) && (window.location.href = "/download")
        }, 2e3)),
    n && (window.location.href = "https://apps.apple.com/us/app/%E9%87%91%E5%BD%A9%E4%BA%91-%E7%9C%8B%E8%A7%81%E4%BD%A0%E7%9A%84%E7%B2%BE%E5%BD%A9/id1090372266",
        setTimeout(function() {
            let s = o.hidden || o.mozHidden || o.msHidden || o.webkitHidden;
            (typeof s > "u" || s == !1) && (window.location.href = "/download")
        }, 2e3))
}
function copyDomText(e) {
    const r = e
        , n = document.createElement("input");
    n.value = r,
        document.body.appendChild(n),
        n.select(),
        document.execCommand("copy"),
        document.body.removeChild(n)
}
function getBrowserType() {
    return navigator.userAgent.toLowerCase().indexOf("micromessenger") !== -1 ? "wechat" : "browser"
}
function configJSSDK(e) {
    return new Promise((r,n)=>{
            let o = document.createElement("script");
            o.async = !0,
                o.src = e,
                document.body.appendChild(o),
                o.onload = function() {
                    r()
                }
                ,
                o.onerror = function() {
                    n()
                }
        }
    )
}
function throttle(e, r) {
    let n = 0;
    return function(...o) {
        const s = Date.now();
        s - n >= r && (e.apply(this, o),
            n = s)
    }
}
function toFixed(e, r) {
    e = e.toString();
    let n = e.indexOf(".");
    return n !== -1 ? e = e.substring(0, r + n + 1) : e = e.substring(0),
        parseFloat(e).toFixed(r)
}
function toRP(e) {
    return Math.ceil(window.innerWidth * e / 375)
}
function wxConfig(e, r, n) {
    const o = new Date().getTime()
        , s = v4();
    getJsSdkSignature({
        wxtimestamp: o,
        noncestr: s,
        url: r
    }).then(a=>{
            window.wx.config({
                debug: !1,
                appId: e,
                timestamp: o,
                nonceStr: s,
                signature: a.Data.signature,
                jsApiList: n
            })
        }
    )
}
function shareConfig(e) {
    window.wx.ready(function() {
        window.wx.updateAppMessageShareData(e)
    })
}
const index$a = "";
var clipboard$1 = {
    exports: {}
};
/*!
 * clipboard.js v2.0.11
 * https://clipboardjs.com/
 *
 * Licensed MIT © Zeno Rocha
 */
(function(e, r) {
        (function(o, s) {
                e.exports = s()
            }
        )(commonjsGlobal, function() {
            return function() {
                var n = {
                    686: function(a, c, l) {
                        l.d(c, {
                            default: function() {
                                return z
                            }
                        });
                        var d = l(279)
                            , u = l.n(d)
                            , f = l(370)
                            , m = l.n(f)
                            , x = l(817)
                            , _ = l.n(x);
                        function g(V) {
                            try {
                                return document.execCommand(V)
                            } catch (H) {
                                return !1
                            }
                        }
                        var E = function(H) {
                            var I = _()(H);
                            return g("cut"),
                                I
                        }
                            , b = E;
                        function w(V) {
                            var H = document.documentElement.getAttribute("dir") === "rtl"
                                , I = document.createElement("textarea");
                            I.style.fontSize = "12pt",
                                I.style.border = "0",
                                I.style.padding = "0",
                                I.style.margin = "0",
                                I.style.position = "absolute",
                                I.style[H ? "right" : "left"] = "-9999px";
                            var re = window.pageYOffset || document.documentElement.scrollTop;
                            return I.style.top = "".concat(re, "px"),
                                I.setAttribute("readonly", ""),
                                I.value = V,
                                I
                        }
                        var y = function(H, I) {
                            var re = w(H);
                            I.container.appendChild(re);
                            var X = _()(re);
                            return g("copy"),
                                re.remove(),
                                X
                        }
                            , A = function(H) {
                            var I = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
                                container: document.body
                            }
                                , re = "";
                            return typeof H == "string" ? re = y(H, I) : H instanceof HTMLInputElement && !["text", "search", "url", "tel", "password"].includes(H == null ? void 0 : H.type) ? re = y(H.value, I) : (re = _()(H),
                                g("copy")),
                                re
                        }
                            , C = A;
                        function B(V) {
                            "@babel/helpers - typeof";
                            return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? B = function(I) {
                                    return typeof I
                                }
                                : B = function(I) {
                                    return I && typeof Symbol == "function" && I.constructor === Symbol && I !== Symbol.prototype ? "symbol" : typeof I
                                }
                                ,
                                B(V)
                        }
                        var P = function() {
                            var H = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}
                                , I = H.action
                                , re = I === void 0 ? "copy" : I
                                , X = H.container
                                , L = H.target
                                , j = H.text;
                            if (re !== "copy" && re !== "cut")
                                throw new Error('Invalid "action" value, use either "copy" or "cut"');
                            if (L !== void 0)
                                if (L && B(L) === "object" && L.nodeType === 1) {
                                    if (re === "copy" && L.hasAttribute("disabled"))
                                        throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                                    if (re === "cut" && (L.hasAttribute("readonly") || L.hasAttribute("disabled")))
                                        throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes')
                                } else
                                    throw new Error('Invalid "target" value, use a valid Element');
                            if (j)
                                return C(j, {
                                    container: X
                                });
                            if (L)
                                return re === "cut" ? b(L) : C(L, {
                                    container: X
                                })
                        }
                            , T = P;
                        function D(V) {
                            "@babel/helpers - typeof";
                            return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? D = function(I) {
                                    return typeof I
                                }
                                : D = function(I) {
                                    return I && typeof Symbol == "function" && I.constructor === Symbol && I !== Symbol.prototype ? "symbol" : typeof I
                                }
                                ,
                                D(V)
                        }
                        function N(V, H) {
                            if (!(V instanceof H))
                                throw new TypeError("Cannot call a class as a function")
                        }
                        function F(V, H) {
                            for (var I = 0; I < H.length; I++) {
                                var re = H[I];
                                re.enumerable = re.enumerable || !1,
                                    re.configurable = !0,
                                "value"in re && (re.writable = !0),
                                    Object.defineProperty(V, re.key, re)
                            }
                        }
                        function k(V, H, I) {
                            return H && F(V.prototype, H),
                            I && F(V, I),
                                V
                        }
                        function $(V, H) {
                            if (typeof H != "function" && H !== null)
                                throw new TypeError("Super expression must either be null or a function");
                            V.prototype = Object.create(H && H.prototype, {
                                constructor: {
                                    value: V,
                                    writable: !0,
                                    configurable: !0
                                }
                            }),
                            H && M(V, H)
                        }
                        function M(V, H) {
                            return M = Object.setPrototypeOf || function(re, X) {
                                return re.__proto__ = X,
                                    re
                            }
                                ,
                                M(V, H)
                        }
                        function Q(V) {
                            var H = ae();
                            return function() {
                                var re = ie(V), X;
                                if (H) {
                                    var L = ie(this).constructor;
                                    X = Reflect.construct(re, arguments, L)
                                } else
                                    X = re.apply(this, arguments);
                                return te(this, X)
                            }
                        }
                        function te(V, H) {
                            return H && (D(H) === "object" || typeof H == "function") ? H : J(V)
                        }
                        function J(V) {
                            if (V === void 0)
                                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return V
                        }
                        function ae() {
                            if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
                                return !1;
                            if (typeof Proxy == "function")
                                return !0;
                            try {
                                return Date.prototype.toString.call(Reflect.construct(Date, [], function() {})),
                                    !0
                            } catch (V) {
                                return !1
                            }
                        }
                        function ie(V) {
                            return ie = Object.setPrototypeOf ? Object.getPrototypeOf : function(I) {
                                return I.__proto__ || Object.getPrototypeOf(I)
                            }
                                ,
                                ie(V)
                        }
                        function fe(V, H) {
                            var I = "data-clipboard-".concat(V);
                            if (H.hasAttribute(I))
                                return H.getAttribute(I)
                        }
                        var de = function(V) {
                            $(I, V);
                            var H = Q(I);
                            function I(re, X) {
                                var L;
                                return N(this, I),
                                    L = H.call(this),
                                    L.resolveOptions(X),
                                    L.listenClick(re),
                                    L
                            }
                            return k(I, [{
                                key: "resolveOptions",
                                value: function() {
                                    var X = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                                    this.action = typeof X.action == "function" ? X.action : this.defaultAction,
                                        this.target = typeof X.target == "function" ? X.target : this.defaultTarget,
                                        this.text = typeof X.text == "function" ? X.text : this.defaultText,
                                        this.container = D(X.container) === "object" ? X.container : document.body
                                }
                            }, {
                                key: "listenClick",
                                value: function(X) {
                                    var L = this;
                                    this.listener = m()(X, "click", function(j) {
                                        return L.onClick(j)
                                    })
                                }
                            }, {
                                key: "onClick",
                                value: function(X) {
                                    var L = X.delegateTarget || X.currentTarget
                                        , j = this.action(L) || "copy"
                                        , Y = T({
                                        action: j,
                                        container: this.container,
                                        target: this.target(L),
                                        text: this.text(L)
                                    });
                                    this.emit(Y ? "success" : "error", {
                                        action: j,
                                        text: Y,
                                        trigger: L,
                                        clearSelection: function() {
                                            L && L.focus(),
                                                window.getSelection().removeAllRanges()
                                        }
                                    })
                                }
                            }, {
                                key: "defaultAction",
                                value: function(X) {
                                    return fe("action", X)
                                }
                            }, {
                                key: "defaultTarget",
                                value: function(X) {
                                    var L = fe("target", X);
                                    if (L)
                                        return document.querySelector(L)
                                }
                            }, {
                                key: "defaultText",
                                value: function(X) {
                                    return fe("text", X)
                                }
                            }, {
                                key: "destroy",
                                value: function() {
                                    this.listener.destroy()
                                }
                            }], [{
                                key: "copy",
                                value: function(X) {
                                    var L = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
                                        container: document.body
                                    };
                                    return C(X, L)
                                }
                            }, {
                                key: "cut",
                                value: function(X) {
                                    return b(X)
                                }
                            }, {
                                key: "isSupported",
                                value: function() {
                                    var X = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ["copy", "cut"]
                                        , L = typeof X == "string" ? [X] : X
                                        , j = !!document.queryCommandSupported;
                                    return L.forEach(function(Y) {
                                        j = j && !!document.queryCommandSupported(Y)
                                    }),
                                        j
                                }
                            }]),
                                I
                        }(u())
                            , z = de
                    },
                    828: function(a) {
                        var c = 9;
                        if (typeof Element < "u" && !Element.prototype.matches) {
                            var l = Element.prototype;
                            l.matches = l.matchesSelector || l.mozMatchesSelector || l.msMatchesSelector || l.oMatchesSelector || l.webkitMatchesSelector
                        }
                        function d(u, f) {
                            for (; u && u.nodeType !== c; ) {
                                if (typeof u.matches == "function" && u.matches(f))
                                    return u;
                                u = u.parentNode
                            }
                        }
                        a.exports = d
                    },
                    438: function(a, c, l) {
                        var d = l(828);
                        function u(x, _, g, E, b) {
                            var w = m.apply(this, arguments);
                            return x.addEventListener(g, w, b),
                                {
                                    destroy: function() {
                                        x.removeEventListener(g, w, b)
                                    }
                                }
                        }
                        function f(x, _, g, E, b) {
                            return typeof x.addEventListener == "function" ? u.apply(null, arguments) : typeof g == "function" ? u.bind(null, document).apply(null, arguments) : (typeof x == "string" && (x = document.querySelectorAll(x)),
                                Array.prototype.map.call(x, function(w) {
                                    return u(w, _, g, E, b)
                                }))
                        }
                        function m(x, _, g, E) {
                            return function(b) {
                                b.delegateTarget = d(b.target, _),
                                b.delegateTarget && E.call(x, b)
                            }
                        }
                        a.exports = f
                    },
                    879: function(a, c) {
                        c.node = function(l) {
                            return l !== void 0 && l instanceof HTMLElement && l.nodeType === 1
                        }
                            ,
                            c.nodeList = function(l) {
                                var d = Object.prototype.toString.call(l);
                                return l !== void 0 && (d === "[object NodeList]" || d === "[object HTMLCollection]") && "length"in l && (l.length === 0 || c.node(l[0]))
                            }
                            ,
                            c.string = function(l) {
                                return typeof l == "string" || l instanceof String
                            }
                            ,
                            c.fn = function(l) {
                                var d = Object.prototype.toString.call(l);
                                return d === "[object Function]"
                            }
                    },
                    370: function(a, c, l) {
                        var d = l(879)
                            , u = l(438);
                        function f(g, E, b) {
                            if (!g && !E && !b)
                                throw new Error("Missing required arguments");
                            if (!d.string(E))
                                throw new TypeError("Second argument must be a String");
                            if (!d.fn(b))
                                throw new TypeError("Third argument must be a Function");
                            if (d.node(g))
                                return m(g, E, b);
                            if (d.nodeList(g))
                                return x(g, E, b);
                            if (d.string(g))
                                return _(g, E, b);
                            throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")
                        }
                        function m(g, E, b) {
                            return g.addEventListener(E, b),
                                {
                                    destroy: function() {
                                        g.removeEventListener(E, b)
                                    }
                                }
                        }
                        function x(g, E, b) {
                            return Array.prototype.forEach.call(g, function(w) {
                                w.addEventListener(E, b)
                            }),
                                {
                                    destroy: function() {
                                        Array.prototype.forEach.call(g, function(w) {
                                            w.removeEventListener(E, b)
                                        })
                                    }
                                }
                        }
                        function _(g, E, b) {
                            return u(document.body, g, E, b)
                        }
                        a.exports = f
                    },
                    817: function(a) {
                        function c(l) {
                            var d;
                            if (l.nodeName === "SELECT")
                                l.focus(),
                                    d = l.value;
                            else if (l.nodeName === "INPUT" || l.nodeName === "TEXTAREA") {
                                var u = l.hasAttribute("readonly");
                                u || l.setAttribute("readonly", ""),
                                    l.select(),
                                    l.setSelectionRange(0, l.value.length),
                                u || l.removeAttribute("readonly"),
                                    d = l.value
                            } else {
                                l.hasAttribute("contenteditable") && l.focus();
                                var f = window.getSelection()
                                    , m = document.createRange();
                                m.selectNodeContents(l),
                                    f.removeAllRanges(),
                                    f.addRange(m),
                                    d = f.toString()
                            }
                            return d
                        }
                        a.exports = c
                    },
                    279: function(a) {
                        function c() {}
                        c.prototype = {
                            on: function(l, d, u) {
                                var f = this.e || (this.e = {});
                                return (f[l] || (f[l] = [])).push({
                                    fn: d,
                                    ctx: u
                                }),
                                    this
                            },
                            once: function(l, d, u) {
                                var f = this;
                                function m() {
                                    f.off(l, m),
                                        d.apply(u, arguments)
                                }
                                return m._ = d,
                                    this.on(l, m, u)
                            },
                            emit: function(l) {
                                var d = [].slice.call(arguments, 1)
                                    , u = ((this.e || (this.e = {}))[l] || []).slice()
                                    , f = 0
                                    , m = u.length;
                                for (f; f < m; f++)
                                    u[f].fn.apply(u[f].ctx, d);
                                return this
                            },
                            off: function(l, d) {
                                var u = this.e || (this.e = {})
                                    , f = u[l]
                                    , m = [];
                                if (f && d)
                                    for (var x = 0, _ = f.length; x < _; x++)
                                        f[x].fn !== d && f[x].fn._ !== d && m.push(f[x]);
                                return m.length ? u[l] = m : delete u[l],
                                    this
                            }
                        },
                            a.exports = c,
                            a.exports.TinyEmitter = c
                    }
                }
                    , o = {};
                function s(a) {
                    if (o[a])
                        return o[a].exports;
                    var c = o[a] = {
                        exports: {}
                    };
                    return n[a](c, c.exports, s),
                        c.exports
                }
                return function() {
                    s.n = function(a) {
                        var c = a && a.__esModule ? function() {
                                    return a.default
                                }
                                : function() {
                                    return a
                                }
                        ;
                        return s.d(c, {
                            a: c
                        }),
                            c
                    }
                }(),
                    function() {
                        s.d = function(a, c) {
                            for (var l in c)
                                s.o(c, l) && !s.o(a, l) && Object.defineProperty(a, l, {
                                    enumerable: !0,
                                    get: c[l]
                                })
                        }
                    }(),
                    function() {
                        s.o = function(a, c) {
                            return Object.prototype.hasOwnProperty.call(a, c)
                        }
                    }(),
                    s(686)
            }().default
        })
    }
)(clipboard$1);
var clipboardExports = clipboard$1.exports;
const clipboard = getDefaultExportFromCjs(clipboardExports)
    , _hoisted_1 = {
    class: "container"
}
    , _hoisted_2 = {
    class: "flex-one"
}
    , _hoisted_3 = {
    class: "name"
}
    , _hoisted_4 = {
    class: "desc"
}
    , _hoisted_5 = {
    class: "download-item-right"
}
    , _sfc_main$1 = defineComponent({
    __name: "DownloadGuide",
    props: {
        show: {
            type: Boolean
        }
    },
    emits: ["update:show"],
    setup(e, {emit: r}) {
        const n = userStore()
            , {vc: o} = storeToRefs(n)
            , s = r
            , a = ()=>{
                o.value.innerLink.clipboard && clipboard.copy(o.value.innerLink.clipboard.replace("$", location.href)),
                    window.location.href = o.value.app.downloadUrl
            }
            , c = ()=>{
                s("update:show")
            }
        ;
        return (l,d)=>{
            const u = Image
                , f = Icon;
            return withDirectives((openBlock(),
                createElementBlock("div", _hoisted_1, [createVNode(u, {
                    style: {
                        "border-radius": "10px"
                    },
                    width: "40",
                    height: "40",
                    src: unref(o).app.logo
                }, null, 8, ["src"]), createBaseVNode("div", _hoisted_2, [createBaseVNode("div", _hoisted_3, toDisplayString(unref(o).app.name), 1), createBaseVNode("div", _hoisted_4, toDisplayString(unref(o).app.desc), 1)]), createBaseVNode("div", _hoisted_5, [createBaseVNode("div", {
                    class: "item-btn",
                    onClick: a
                }, "打开"), createVNode(f, {
                    onClick: c,
                    color: "#fff",
                    size: "26",
                    name: "close"
                })])], 512)), [[vShow, l.show]])
        }
    }
})
    , DownloadGuide_vue_vue_type_style_index_0_scoped_e00653a1_lang = ""
    , DownloadGuide = _export_sfc(_sfc_main$1, [["__scopeId", "data-v-e00653a1"]]);
function getCurrentEnv(e) {
    return e() ? "app" : /micromessenger/i.test(navigator.userAgent) ? "wx" : "unknow"
}
function checkCurrentEnvAllowed(e, r, n, o, s) {
    return new Promise((a,c)=>{
            o == "app" ? r ? a() : e ? (showDialog({
                title: "友情提示",
                message: "请在微信中打开参与活动"
            }).then(()=>{}
            ),
                c()) : (showDialog({
                title: "当前系统环境无法参与活动"
            }),
                c()) : o == "wx" ? e ? a() : r && (showDialog({
                title: "友情提示",
                message: "请在".concat(n, "app中打开参与活动")
            }).then(()=>{
                    location.href = s
                }
            ),
                c()) : (showDialog({
                title: "友情提示",
                message: "请在".concat(n, "APP").concat(e ? "或微信" : "", "中打开参与活动")
            }).then(()=>{
                    r && (location.href = s)
                }
            ),
                c())
        }
    )
}
function getModuleFromUrl(e) {
    if (!e)
        return [];
    const r = /.+\/m-([a-zA-Z]+)-([a-zA-Z]+)\//
        , n = e.match(r);
    return n ? [n[1], n[2]] : []
}
let lastErr;
const _sfc_main = defineComponent({
    setup() {
        const e = useRouter()
            , r = useRoute()
            , n = userStore()
            , o = useTabBarStore()
            , s = useModalStore()
            , a = ref(!1)
            , c = ref(!1)
            , l = location.href.split("#")[0]
            , d = location.href.split("?")
            , u = new URLSearchParams(d[1])
            , f = u.get("id")
            , m = u.get("code")
            , x = u.get("preview")
            , _ = u.get("debug")
            , g = u.get("userId")
            , E = location.pathname
            , b = ref(!1)
            , [w,y] = getModuleFromUrl(location.href);
        n.setModule(w),
        f && n.setActivityId(f),
            n.setPreview(x),
            n.setProvider(y),
        location.href.includes("/home") && !m && n.setFullLink(location.href);
        const A = ()=>{
                e.go(-1)
            }
        ;
        onErrorCaptured(B=>{
                lastErr != B.message && (reportError({
                    path: window.location.href,
                    info: B.message,
                    stack: B.stack,
                    module: w,
                    provider: y
                }).then(()=>{
                        showConfirmDialog({
                            title: "提示",
                            message: "捕获到异常，已上报服务器，请联系管理员或刷新再试!"
                        }).then(()=>{
                                location.reload()
                            }
                        )
                    }
                ),
                    lastErr = B.message)
            }
        ),
            watch(r, B=>{
                    B.name === "home" ? b.value = !1 : b.value = !0
                }
            );
        let C;
        return onMounted(async()=>{
                var M, Q;
                if (!w) {
                    a.value = !0;
                    return
                }
                let B;
                try {
                    B = (await __variableDynamicImportRuntimeHelper(Object.assign({
                        "./config/module/answer.ts": ()=>__vitePreload(()=>import("./answer-a3d61edb.js"), []),
                        "./config/module/benefit.ts": ()=>__vitePreload(()=>import("./benefit-c30492f7.js"), ["assets/benefit-c30492f7.js", "assets/index-d8bf69ca.js"]),
                        "./config/module/bigWheel.ts": ()=>__vitePreload(()=>import("./bigWheel-a3ec4cfe.js"), []),
                        "./config/module/hotLive.ts": ()=>__vitePreload(()=>import("./hotLive-3762042c.js"), []),
                        "./config/module/juba.ts": ()=>__vitePreload(()=>import("./juba-54e58ece.js"), []),
                        "./config/module/myHistory.ts": ()=>__vitePreload(()=>import("./myHistory-16866793.js"), []),
                        "./config/module/registration.ts": ()=>__vitePreload(()=>import("./registration-559078bb.js"), []),
                        "./config/module/signin.ts": ()=>__vitePreload(()=>import("./signin-a3ec4cfe.js"), []),
                        "./config/module/study.ts": ()=>__vitePreload(()=>import("./study-d2f9118b.js"), []),
                        "./config/module/vieToAnswer.ts": ()=>__vitePreload(()=>import("./vieToAnswer-46ac37c6.js"), []),
                        "./config/module/vote.ts": ()=>__vitePreload(()=>import("./vote-9d12afb1.js"), [])
                    }), "./config/module/".concat(w, ".ts"))).default
                } catch (te) {
                    showDialog({
                        title: "友情提示",
                        message: "找不到对应模块,".concat(w)
                    });
                    return
                }
                (M = B.onInit) == null || M.call(B),
                    o.setTabBar(B.tabBar);
                try {
                    C = (await __variableDynamicImportRuntimeHelper(Object.assign({
                        "./config/vendor/jcy.ts": ()=>__vitePreload(()=>import("./jcy-0fbb1ce2.js"), ["assets/jcy-0fbb1ce2.js", "assets/panan_small-c450fa77.js"]),
                        "./config/vendor/jd.ts": ()=>__vitePreload(()=>import("./jd-60507f75.js"), []),
                        "./config/vendor/panan.ts": ()=>__vitePreload(()=>import("./panan-745acd82.js"), ["assets/panan-745acd82.js", "assets/panan_small-c450fa77.js"]),
                        "./config/vendor/pujiang.ts": ()=>__vitePreload(()=>import("./pujiang-9c448ba2.js"), []),
                        "./config/vendor/shengzhou.ts": ()=>__vitePreload(()=>import("./shengzhou-20d5e1a1.js"), []),
                        "./config/vendor/wuyi.ts": ()=>__vitePreload(()=>import("./wuyi-29041583.js"), []),
                        "./config/vendor/wuyiwenming.ts": ()=>__vitePreload(()=>import("./wuyiwenming-664af7d5.js"), []),
                        "./config/vendor/yuecheng.ts": ()=>__vitePreload(()=>import("./yuecheng-b397f093.js"), []),
                        "./config/vendor/zhuji.ts": ()=>__vitePreload(()=>import("./zhuji-d73f3b91.js"), [])
                    }), "./config/vendor/".concat(y, ".ts"))).default
                } catch (te) {
                    showDialog({
                        title: "友情提示",
                        message: "站点配置错误,".concat(y)
                    });
                    return
                }
                n.setAppId(C.appId);
                const P = await getSiteInfo();
                if (!P || !P.provider) {
                    showDialog({
                        title: "友情提示",
                        message: "站点配置错误,".concat(y)
                    });
                    return
                }
                const T = await __vitePreload(()=>import("./manifest-ce5ff654.js"), []);
                if (P.manifest && P.manifest.version && P.manifest.version > T.version) {
                    const te = localStorage.getItem("last_refresh_time")
                        , J = new Date().getTime();
                    (!te || J - parseInt(te) > 6e5) && (location.reload(),
                        localStorage.setItem("last_refresh_time", J.toString()))
                }
                n.loadRoutes(w, y, B.routes),
                    u.delete("code"),
                    u.delete("state");
                const D = u.toString();
                e.replace(E + D ? "?".concat(D) : ""),
                    n.setVC(C);
                const N = getCurrentEnv(C.isInApp || (()=>!1));
                n.setEnv(N),
                C.app && await configJSSDK(P.sdkUrl);
                const F = N == "app" ? C.sdkProvider : N
                    , k = getJSSDK(F);
                await k.onSDKReady();
                const $ = await k.getSystemInfo();
                if (n.setSystemInfo($),
                N == "app" || N == "unknow")
                    B.isLogin && (s.showLoading(),
                        await k.isLogin() ? k.getUserInfo().then(J=>{
                                n.setUserToken(J),
                                    n.login(N, _ || 0, g || "").finally(()=>{
                                            var ae;
                                            s.hideLoading(),
                                            (ae = B.afterLogin) == null || ae.call(B),
                                                a.value = !0
                                        }
                                    )
                            }
                        ) : (s.hideLoading(),
                            await showConfirmDialog({
                                title: "友情提示",
                                message: "请您先登录"
                            }),
                        await k.callAppLogin() && location.reload()));
                else if (N == "wx")
                    if (B.isLogin && C.allowWx) {
                        n.setWxAppId(P.officialAppId);
                        let te = Math.floor(Date.now() / 1e3);
                        if (n.token && w != "vieToAnswer" && te < n.expires) {
                            P.officialAppId && B.wxjsapi && (n.setWxjssdkReady(!0),
                                wxConfig(P.officialAppId, l, B.wxjsapi)),
                            (Q = B.afterLogin) == null || Q.call(B),
                                a.value = !0;
                            return
                        }
                        m ? n.wxLogin(m).finally(()=>{
                                var J;
                                P.officialAppId && B.wxjsapi && (n.setWxjssdkReady(!0),
                                    wxConfig(P.officialAppId, l, B.wxjsapi)),
                                (J = B.afterLogin) == null || J.call(B),
                                    a.value = !0
                            }
                        ) : n.wxAuth(P.officialAppId)
                    } else
                        a.value = !0
            }
        ),
            {
                tabBarStore: o,
                modalStore: s,
                ready: a,
                guide: c,
                vc: C,
                handleGoBack: A,
                store: n,
                is_home: b
            }
    },
    components: {
        TabBar: _sfc_main$3,
        DownloadGuide,
        PageLoading: __unplugin_components_0
    }
})
    , App_vue_vue_type_style_index_0_lang = "";
function _sfc_render(e, r, n, o, s, a) {
    var f, m, x, _, g, E, b, w;
    const c = resolveComponent("router-view")
        , l = __unplugin_components_0
        , d = _sfc_main$3
        , u = __unplugin_components_0$1;
    return openBlock(),
        createElementBlock("div", null, [e.ready ? (openBlock(),
            createBlock(c, {
                key: 0
            })) : (openBlock(),
            createBlock(l, {
                key: 1
            })), e.ready && ((f = e.tabBarStore) != null && f.tabBar) && ((m = e.tabBarStore) != null && m.tabBar.show) && ((x = e.tabBarStore) != null && x.tabBar.tabs) && ((_ = e.tabBarStore) != null && _.tabBar.tabs.length) ? (openBlock(),
            createBlock(d, {
                key: 2,
                tabs: (g = e.tabBarStore) == null ? void 0 : g.tabBar.tabs,
                "active-color": (E = e.tabBarStore) == null ? void 0 : E.tabBar.activeColor
            }, null, 8, ["tabs", "active-color"])) : createCommentVNode("", !0), (b = e.modalStore) != null && b.loading.visible ? (openBlock(),
            createBlock(u, {
                key: 3,
                title: (w = e.modalStore) == null ? void 0 : w.loading.title
            }, null, 8, ["title"])) : createCommentVNode("", !0), e.store.env === "wx" && e.store.module === "answer" && e.is_home ? (openBlock(),
            createElementBlock("div", {
                key: 4,
                class: "go-back",
                onClick: r[0] || (r[0] = (...y)=>e.handleGoBack && e.handleGoBack(...y))
            })) : createCommentVNode("", !0)])
}
const App = _export_sfc(_sfc_main, [["render", _sfc_render]])
    , updateStorage = (e,r)=>{
        const n = e.storage || sessionStorage
            , o = e.key || r.$id;
        if (e.paths) {
            const s = e.paths.reduce((a,c)=>(a[c] = r.$state[c],
                a), {});
            n.setItem(o, JSON.stringify(s))
        } else
            n.setItem(o, JSON.stringify(r.$state))
    }
;
var index$9 = ({options: e, store: r})=>{
        var n, o, s, a;
        if ((n = e.persist) != null && n.enabled) {
            const c = [{
                key: r.$id,
                storage: sessionStorage
            }]
                , l = (s = (o = e.persist) == null ? void 0 : o.strategies) != null && s.length ? (a = e.persist) == null ? void 0 : a.strategies : c;
            l.forEach(d=>{
                    const u = d.storage || sessionStorage
                        , f = d.key || r.$id
                        , m = u.getItem(f);
                    m && (r.$patch(JSON.parse(m)),
                        updateStorage(d, r))
                }
            ),
                r.$subscribe(()=>{
                        l.forEach(d=>{
                                updateStorage(d, r)
                            }
                        )
                    }
                )
        }
    }
;
const iconfont = ""
    , index$8 = ""
    , scale_animation = ""
    , index$7 = ""
    , index$6 = ""
    , index$5 = ""
    , index$4 = ""
    , index$3 = ""
    , index$2 = ""
    , index$1 = ""
    , index = ""
    , pinia = createPinia();
pinia.use(index$9);
const app = createApp(App);
app.use(router).use(pinia).mount("#app");
export {makeNumberProp as $, shareConfig as A, BORDER_TOP_BOTTOM as B, showToast as C, Dialog as D, showFailToast as E, Fragment as F, withDirectives as G, vModelText as H, Icon as I, createTextVNode as J, showSuccessToast as K, Button as L, __unplugin_components_0$1 as M, watchEffect as N, Empty as O, Popup as P, normalizeClass as Q, Image as R, request as S, useRoute as T, defineStore as U, watch as V, onUnmounted as W, computed as X, addUnit as Y, makeArrayProp as Z, _export_sfc as _, __vite_legacy_guard, createBaseVNode as a, getBigWheelDetail as a$, makeStringProp as a0, padZero as a1, useExpose as a2, raf as a3, windowWidth as a4, makeNumericProp as a5, withModifiers as a6, useModalStore as a7, onBeforeRouteLeave as a8, toRP as a9, unknownProp as aA, routeProps as aB, useRoute$1 as aC, getRootScrollTop as aD, setRootScrollTop as aE, isPromise as aF, isFunction$1 as aG, isObject$1 as aH, useId as aI, provide as aJ, CUSTOM_FIELD_INJECTION_KEY as aK, FORM_KEY as aL, toArray$1 as aM, formatNumber as aN, resetScroll as aO, useBigWheelStore as aP, vShow as aQ, Teleport as aR, getPrizeDrawCount as aS, Badge as aT, getPrizeRecord as aU, LotteryOptionType as aV, IconCredit as aW, IconRedPacket as aX, commonjsGlobal as aY, exchange as aZ, getLotteryCount as a_, getCurrentInstance as aa, throttle as ab, resolveComponent as ac, toFixed as ad, createStaticVNode as ae, getCaptcha as af, checkCaptcha as ag, aesEncrypt as ah, Loading as ai, getDefaultExportFromCjs as aj, isDef as ak, extend$1 as al, clamp as am, numericProp as an, makeRequiredProp as ao, useTouch as ap, useParent as aq, useEventListener as ar, preventDefault as as, HAPTICS_FEEDBACK as at, useChildren as au, unitToPx as av, isSameValue as aw, nextTick as ax, pick as ay, BORDER_UNSET_TOP_BOTTOM as az, createBlock as b, showDialog as b0, Collection as b1, collect as b2, fetchReward as b3, checkCurrentEnvAllowed as b4, lottery as b5, inject as b6, useScrollParent as b7, onUpdated as b8, useRect as b9, onDeactivated as bA, onBeforeUnmount as bB, doubleRaf as bC, getCurrentScope as bD, onScopeDispose as bE, getBrowserType as bF, copyDomText as bG, download as bH, useCustomFieldValue as bI, resolveDynamicComponent as bJ, KeepAlive as bK, Transition as bL, useStudyStore as bM, useTabBarStore as bN, getStudyList as bO, showNotify as bP, closeNotify as bQ, getStudyLevel as bR, getComplete as bS, getStudyRank as bT, setToastDefaultOptions as bU, isHidden as ba, getScrollTop as bb, popupSharedProps as bc, popupSharedPropKeys as bd, __vitePreload as be, isDate$1 as bf, stdin_default$e as bg, getSizeStyle as bh, renderSlot as bi, updateMemberInfo as bj, showConfirmDialog as bk, Overlay as bl, useCountDown as bm, requestGet as bn, requestPost as bo, withKeys as bp, TAP_OFFSET as bq, LONG_PRESS_START_TIME as br, windowHeight as bs, callInterceptor as bt, inBrowser$1 as bu, mountComponent as bv, usePopupState as bw, usePageVisibility as bx, onActivated as by, onPopupReopen as bz, createElementBlock as c, defineComponent as d, createCommentVNode as e, useRouter as f, ref as g, reactive as h, onMounted as i, unref as j, createVNode as k, popScopeId as l, createNamespace as m, normalizeStyle as n, openBlock as o, pushScopeId as p, truthProp as q, renderList as r, storeToRefs as s, toDisplayString as t, userStore as u, mergeProps as v, withCtx as w, useScopeId as x, withInstall as y, getJSSDK as z};
