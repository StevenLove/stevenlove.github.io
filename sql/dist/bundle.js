/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/microevent.ts/lib/Event.js":
/*!*************************************************!*\
  !*** ./node_modules/microevent.ts/lib/Event.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar factories = [];\nfactories[0] = function () {\n    return function dispatcher0() { };\n};\nfactories[1] = function (callback, context) {\n    if (typeof (context) === 'undefined')\n        return callback;\n    return function dispatcher1(payload) {\n        callback(payload, context);\n    };\n};\nfunction getFactory(handlerCount) {\n    if (!factories[handlerCount])\n        factories[handlerCount] = compileFactory(handlerCount);\n    return factories[handlerCount];\n}\nfunction compileFactory(handlerCount) {\n    var src = 'return function dispatcher' + handlerCount + '(payload) {\\n';\n    var argsHandlers = [], argsContexts = [];\n    for (var i = 0; i < handlerCount; i++) {\n        argsHandlers.push('cb' + i);\n        argsContexts.push('ctx' + i);\n        src += '    cb' + i + '(payload, ctx' + i + ');\\n';\n    }\n    src += '};';\n    return new (Function.bind.apply(Function, [void 0].concat(argsHandlers.concat(argsContexts), [src])))();\n}\nvar Event = /** @class */ (function () {\n    function Event() {\n        this.hasHandlers = false;\n        this._handlers = [];\n        this._contexts = [];\n        this._createDispatcher();\n    }\n    Event.prototype.addHandler = function (handler, context) {\n        if (!this.isHandlerAttached(handler, context)) {\n            this._handlers.push(handler);\n            this._contexts.push(context);\n            this._createDispatcher();\n            this._updateHasHandlers();\n        }\n        return this;\n    };\n    Event.prototype.removeHandler = function (handler, context) {\n        var idx = this._getHandlerIndex(handler, context);\n        if (typeof (idx) !== 'undefined') {\n            this._handlers.splice(idx, 1);\n            this._contexts.splice(idx, 1);\n            this._createDispatcher();\n            this._updateHasHandlers();\n        }\n        return this;\n    };\n    Event.prototype.isHandlerAttached = function (handler, context) {\n        return typeof (this._getHandlerIndex(handler, context)) !== 'undefined';\n    };\n    Event.prototype._updateHasHandlers = function () {\n        this.hasHandlers = !!this._handlers.length;\n    };\n    Event.prototype._getHandlerIndex = function (handler, context) {\n        var handlerCount = this._handlers.length;\n        var idx;\n        for (idx = 0; idx < handlerCount; idx++) {\n            if (this._handlers[idx] === handler && this._contexts[idx] === context)\n                break;\n        }\n        return idx < handlerCount ? idx : undefined;\n    };\n    Event.prototype._createDispatcher = function () {\n        this.dispatch = getFactory(this._handlers.length).apply(this, this._handlers.concat(this._contexts));\n    };\n    return Event;\n}());\nexports[\"default\"] = Event;\n\n\n//# sourceURL=webpack:///./node_modules/microevent.ts/lib/Event.js?");

/***/ }),

/***/ "./node_modules/microevent.ts/lib/index.js":
/*!*************************************************!*\
  !*** ./node_modules/microevent.ts/lib/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar Event_1 = __webpack_require__(/*! ./Event */ \"./node_modules/microevent.ts/lib/Event.js\");\nexports.Event = Event_1.default;\n\n\n//# sourceURL=webpack:///./node_modules/microevent.ts/lib/index.js?");

/***/ }),

/***/ "./node_modules/sql.js-httpvfs/dist/index.js":
/*!***************************************************!*\
  !*** ./node_modules/sql.js-httpvfs/dist/index.js ***!
  \***************************************************/
/***/ (function(module) {

eval("!function(e,t){if(true)module.exports=t();else { var r, n; }}(this,(function(){return(()=>{\"use strict\";var e={870:(e,t,n)=>{n.r(t),n.d(t,{createEndpoint:()=>o,expose:()=>l,proxy:()=>g,proxyMarker:()=>r,releaseProxy:()=>a,transfer:()=>y,transferHandlers:()=>c,windowEndpoint:()=>v,wrap:()=>f});const r=Symbol(\"Comlink.proxy\"),o=Symbol(\"Comlink.endpoint\"),a=Symbol(\"Comlink.releaseProxy\"),s=Symbol(\"Comlink.thrown\"),i=e=>\"object\"==typeof e&&null!==e||\"function\"==typeof e,c=new Map([[\"proxy\",{canHandle:e=>i(e)&&e[r],serialize(e){const{port1:t,port2:n}=new MessageChannel;return l(e,t),[n,[n]]},deserialize:e=>(e.start(),f(e))}],[\"throw\",{canHandle:e=>i(e)&&s in e,serialize({value:e}){let t;return t=e instanceof Error?{isError:!0,value:{message:e.message,name:e.name,stack:e.stack}}:{isError:!1,value:e},[t,[]]},deserialize(e){if(e.isError)throw Object.assign(new Error(e.value.message),e.value);throw e.value}}]]);function l(e,t=self){t.addEventListener(\"message\",(function n(r){if(!r||!r.data)return;const{id:o,type:a,path:i}=Object.assign({path:[]},r.data),c=(r.data.argumentList||[]).map(w);let f;try{const t=i.slice(0,-1).reduce(((e,t)=>e[t]),e),n=i.reduce(((e,t)=>e[t]),e);switch(a){case 0:f=n;break;case 1:t[i.slice(-1)[0]]=w(r.data.value),f=!0;break;case 2:f=n.apply(t,c);break;case 3:f=g(new n(...c));break;case 4:{const{port1:t,port2:n}=new MessageChannel;l(e,n),f=y(t,[t])}break;case 5:f=void 0}}catch(e){f={value:e,[s]:0}}Promise.resolve(f).catch((e=>({value:e,[s]:0}))).then((e=>{const[r,s]=b(e);t.postMessage(Object.assign(Object.assign({},r),{id:o}),s),5===a&&(t.removeEventListener(\"message\",n),u(t))}))})),t.start&&t.start()}function u(e){(function(e){return\"MessagePort\"===e.constructor.name})(e)&&e.close()}function f(e,t){return d(e,[],t)}function p(e){if(e)throw new Error(\"Proxy has been released and is not useable\")}function d(e,t=[],n=function(){}){let r=!1;const s=new Proxy(n,{get(n,o){if(p(r),o===a)return()=>E(e,{type:5,path:t.map((e=>e.toString()))}).then((()=>{u(e),r=!0}));if(\"then\"===o){if(0===t.length)return{then:()=>s};const n=E(e,{type:0,path:t.map((e=>e.toString()))}).then(w);return n.then.bind(n)}return d(e,[...t,o])},set(n,o,a){p(r);const[s,i]=b(a);return E(e,{type:1,path:[...t,o].map((e=>e.toString())),value:s},i).then(w)},apply(n,a,s){p(r);const i=t[t.length-1];if(i===o)return E(e,{type:4}).then(w);if(\"bind\"===i)return d(e,t.slice(0,-1));const[c,l]=m(s);return E(e,{type:2,path:t.map((e=>e.toString())),argumentList:c},l).then(w)},construct(n,o){p(r);const[a,s]=m(o);return E(e,{type:3,path:t.map((e=>e.toString())),argumentList:a},s).then(w)}});return s}function m(e){const t=e.map(b);return[t.map((e=>e[0])),(n=t.map((e=>e[1])),Array.prototype.concat.apply([],n))];var n}const h=new WeakMap;function y(e,t){return h.set(e,t),e}function g(e){return Object.assign(e,{[r]:!0})}function v(e,t=self,n=\"*\"){return{postMessage:(t,r)=>e.postMessage(t,n,r),addEventListener:t.addEventListener.bind(t),removeEventListener:t.removeEventListener.bind(t)}}function b(e){for(const[t,n]of c)if(n.canHandle(e)){const[r,o]=n.serialize(e);return[{type:3,name:t,value:r},o]}return[{type:0,value:e},h.get(e)||[]]}function w(e){switch(e.type){case 3:return c.get(e.name).deserialize(e.value);case 0:return e.value}}function E(e,t,n){return new Promise((r=>{const o=new Array(4).fill(0).map((()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16))).join(\"-\");e.addEventListener(\"message\",(function t(n){n.data&&n.data.id&&n.data.id===o&&(e.removeEventListener(\"message\",t),r(n.data))})),e.start&&e.start(),e.postMessage(Object.assign({id:o},t),n)}))}},162:function(e,t,n){var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,\"default\",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)\"default\"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return o(t,e),t};Object.defineProperty(t,\"__esModule\",{value:!0}),t.createDbWorker=void 0;const s=a(n(870));async function i(e){if(e.data&&\"eval\"===e.data.action){const t=new Int32Array(e.data.notify,0,2),n=new Uint8Array(e.data.notify,8);let r;try{r={ok:await u(e.data.request)}}catch(t){console.error(\"worker request error\",e.data.request,t),r={err:String(t)}}const o=(new TextEncoder).encode(JSON.stringify(r));n.set(o,0),t[1]=o.length,Atomics.notify(t,0)}}function c(e){if(\"BODY\"===e.tagName)return\"body\";const t=[];for(;e.parentElement&&\"BODY\"!==e.tagName;){if(e.id){t.unshift(\"#\"+e.id);break}{let n=1,r=e;for(;r.previousElementSibling;)r=r.previousElementSibling,n++;t.unshift(e.tagName.toLowerCase()+\":nth-child(\"+n+\")\")}e=e.parentElement}return t.join(\" > \")}function l(e){return Object.keys(e)}async function u(e){if(console.log(\"dom vtable request\",e),\"select\"===e.type)return[...document.querySelectorAll(e.selector)].map((t=>{const n={};for(const r of e.columns)\"selector\"===r?n.selector=c(t):\"parent\"===r?t.parentElement&&(n.parent=t.parentElement?c(t.parentElement):null):\"idx\"===r||(n[r]=t[r]);return n}));if(\"insert\"===e.type){if(!e.value.parent)throw Error('\"parent\" column must be set when inserting');const t=document.querySelectorAll(e.value.parent);if(0===t.length)throw Error(`Parent element ${e.value.parent} could not be found`);if(t.length>1)throw Error(`Parent element ${e.value.parent} ambiguous (${t.length} results)`);const n=t[0];if(!e.value.tagName)throw Error(\"tagName must be set for inserting\");const r=document.createElement(e.value.tagName);for(const t of l(e.value))if(null!==e.value[t]){if(\"tagName\"===t||\"parent\"===t)continue;if(\"idx\"===t||\"selector\"===t)throw Error(`${t} can't be set`);r[t]=e.value[t]}return n.appendChild(r),null}if(\"update\"===e.type){const t=document.querySelector(e.value.selector);if(!t)throw Error(`Element ${e.value.selector} not found!`);const n=[];for(const r of l(e.value)){const o=e.value[r];if(\"parent\"!==r){if(\"idx\"!==r&&\"selector\"!==r&&o!==t[r]){if(console.log(\"SETTING \",r,t[r],\"->\",o),\"tagName\"===r)throw Error(\"can't change tagName\");n.push(r)}}else if(o!==c(t.parentElement)){const e=document.querySelectorAll(o);if(1!==e.length)throw Error(`Invalid target parent: found ${e.length} matches`);e[0].appendChild(t)}}for(const r of n)t[r]=e.value[r];return null}throw Error(`unknown request ${e.type}`)}s.transferHandlers.set(\"WORKERSQLPROXIES\",{canHandle:e=>!1,serialize(e){throw Error(\"no\")},deserialize:e=>(e.start(),s.wrap(e))}),t.createDbWorker=async function(e,t,n){const r=new Worker(t),o=s.wrap(r),a=await o.SplitFileHttpDatabase(n,e);return r.addEventListener(\"message\",i),{db:a,worker:o,configs:e}}},432:function(e,t,n){var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__exportStar||function(e,t){for(var n in e)\"default\"===n||Object.prototype.hasOwnProperty.call(t,n)||r(t,e,n)};Object.defineProperty(t,\"__esModule\",{value:!0}),o(n(162),t)}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var a=t[r]={exports:{}};return e[r].call(a.exports,a,a.exports,n),a.exports}return n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{\"undefined\"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:\"Module\"}),Object.defineProperty(e,\"__esModule\",{value:!0})},n(432)})()}));\n//# sourceMappingURL=index.js.map\n\n//# sourceURL=webpack:///./node_modules/sql.js-httpvfs/dist/index.js?");

/***/ }),

/***/ "./src/constants.ts":
/*!**************************!*\
  !*** ./src/constants.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"MAX_RESULTS\": () => (/* binding */ MAX_RESULTS),\n/* harmony export */   \"WEB_WORKER_TIMEOUT\": () => (/* binding */ WEB_WORKER_TIMEOUT)\n/* harmony export */ });\nconst MAX_RESULTS = 500;\nconst WEB_WORKER_TIMEOUT = 1000;\n\n\n//# sourceURL=webpack:///./src/constants.ts?");

/***/ }),

/***/ "./src/dictionary.ts":
/*!***************************!*\
  !*** ./src/dictionary.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"define\": () => (/* binding */ define),\n/* harmony export */   \"preloadWordList\": () => (/* binding */ preloadWordList),\n/* harmony export */   \"searchDictionaryWithRegexp\": () => (/* binding */ searchDictionaryWithRegexp)\n/* harmony export */ });\n/* harmony import */ var _dictionary0__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dictionary0 */ \"./src/dictionary0.ts\");\n/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib */ \"./src/lib.ts\");\n/* harmony import */ var _workerWrapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./workerWrapper */ \"./src/workerWrapper.ts\");\n\n\n\nconst MAC_DICTIONARY = {\n    path: new URL(/* asset import */ __webpack_require__(/*! ../MacDictionary.db */ \"./MacDictionary.db\"), __webpack_require__.b).toString(),\n    tableName: \"xxxxxentries\",\n    wordRowName: \"A\",\n    getDefinitionTextFromRow: row => \"undefined\",\n};\nconst AYESH_DICTIONARY = {\n    path: new URL(/* asset import */ __webpack_require__(/*! ../Dictionary.db */ \"./Dictionary.db\"), __webpack_require__.b).toString(),\n    tableName: \"xxxxxentries\",\n    wordRowName: \"word\",\n    getDefinitionTextFromRow: function (row) {\n        return `${row.word} - ${row.wordtype}\\n${row.definition}`;\n    }\n};\nconst DEFINITION_DICTIONARY = AYESH_DICTIONARY;\nconst WORDLIST_DICTIONARY = MAC_DICTIONARY;\nconst prepareWordList = (0,_lib__WEBPACK_IMPORTED_MODULE_1__.memoize)(async function setup() {\n    let worker = await (0,_dictionary0__WEBPACK_IMPORTED_MODULE_0__.getWorker)(WORDLIST_DICTIONARY.path);\n    let dict = await worker.db.query(`SELECT ${WORDLIST_DICTIONARY.wordRowName} FROM ${WORDLIST_DICTIONARY.tableName}`);\n    let words = dict.map(row => row[WORDLIST_DICTIONARY.wordRowName]); // convert from [{word:\"aardvark\"},{word:\"apple\"} to [\"aardvark\",\"apple\"]\n    return await _workerWrapper__WEBPACK_IMPORTED_MODULE_2__.postDictionary(words);\n});\nconst searchDictionaryWithRegexp = (0,_lib__WEBPACK_IMPORTED_MODULE_1__.memoize)(async function searchDictionaryWithRegexp(rx) {\n    await prepareWordList();\n    return _workerWrapper__WEBPACK_IMPORTED_MODULE_2__.postRegex(rx);\n});\nconst define = (0,_lib__WEBPACK_IMPORTED_MODULE_1__.memoize)(\n// debounce( // debouncing is fine but if we cancel the call then we will store the result in the cache and never actually get the definition\nasync function define(word) {\n    let worker = await (0,_dictionary0__WEBPACK_IMPORTED_MODULE_0__.getWorker)(DEFINITION_DICTIONARY.path);\n    let query = `SELECT * FROM ${DEFINITION_DICTIONARY.tableName} WHERE ${DEFINITION_DICTIONARY.wordRowName} = ?`;\n    let rows = await worker.db.query(query, [word]);\n    return rows.map(DEFINITION_DICTIONARY.getDefinitionTextFromRow);\n}\n// ,50)\n);\nconst preloadWordList = function () { prepareWordList(); };\n\n\n//# sourceURL=webpack:///./src/dictionary.ts?");

/***/ }),

/***/ "./src/dictionary0.ts":
/*!****************************!*\
  !*** ./src/dictionary0.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getWorker\": () => (/* binding */ getWorker)\n/* harmony export */ });\n/* harmony import */ var sql_js_httpvfs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sql.js-httpvfs */ \"./node_modules/sql.js-httpvfs/dist/index.js\");\n/* harmony import */ var sql_js_httpvfs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sql_js_httpvfs__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib */ \"./src/lib.ts\");\n\n\nconst workerUrl = new URL(/* asset import */ __webpack_require__(/*! sql.js-httpvfs/dist/sqlite.worker.js */ \"./node_modules/sql.js-httpvfs/dist/sqlite.worker.js\"), __webpack_require__.b);\nconst wasmUrl = new URL(/* asset import */ __webpack_require__(/*! sql.js-httpvfs/dist/sql-wasm.wasm */ \"./node_modules/sql.js-httpvfs/dist/sql-wasm.wasm\"), __webpack_require__.b);\nconst getWorker = (0,_lib__WEBPACK_IMPORTED_MODULE_1__.memoize)(async function (path) {\n    return await (0,sql_js_httpvfs__WEBPACK_IMPORTED_MODULE_0__.createDbWorker)([\n        {\n            from: \"inline\",\n            config: {\n                serverMode: \"full\",\n                url: path,\n                // url: \"/Dictionary.db\",\n                // url: \"/example.sqlite3\",\n                requestChunkSize: 4096,\n            },\n        },\n    ], workerUrl.toString(), wasmUrl.toString());\n});\n\n\n//# sourceURL=webpack:///./src/dictionary0.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _dictionary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dictionary */ \"./src/dictionary.ts\");\n/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib */ \"./src/lib.ts\");\n/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ui */ \"./src/ui.ts\");\n/* harmony import */ var _querystring__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./querystring */ \"./src/querystring.ts\");\n\n\n\n\n\nasync function init() {\n    _ui__WEBPACK_IMPORTED_MODULE_2__.displayTheseWords([\"loading dictionary...\"]);\n    await _dictionary__WEBPACK_IMPORTED_MODULE_0__.preloadWordList();\n    if (!processQueryString()) {\n        searchForSomethingInteresting();\n    }\n}\ninit();\nfunction processQueryString() {\n    let query = (0,_querystring__WEBPACK_IMPORTED_MODULE_3__.getQueryObject)();\n    console.log(\"query\", query);\n    return Object.keys(query).some(key => {\n        if (Object.values(_ui__WEBPACK_IMPORTED_MODULE_2__.IDs).includes(key)) {\n            _ui__WEBPACK_IMPORTED_MODULE_2__.setAndTrigger(key, query[key]);\n            return true;\n        }\n    });\n}\nfunction searchForSomethingInteresting() {\n    /* randomly choose one of 5 options */\n    let option = (0,_lib__WEBPACK_IMPORTED_MODULE_1__.from)(0, 4);\n    if ([2].includes(option)) {\n        option = (0,_lib__WEBPACK_IMPORTED_MODULE_1__.from)(0, 4);\n    }\n    switch (option) {\n        case 0:\n            _ui__WEBPACK_IMPORTED_MODULE_2__.setAndTrigger(\"inputInOrder\", new Array((0,_lib__WEBPACK_IMPORTED_MODULE_1__.from)(3, 5)).fill(0).map(_lib__WEBPACK_IMPORTED_MODULE_1__.getRandomChar).join(\"\"));\n            break;\n        case 1:\n            _ui__WEBPACK_IMPORTED_MODULE_2__.setAndTrigger(\"inputNTotal\", (0,_lib__WEBPACK_IMPORTED_MODULE_1__.from)(2, 8));\n            break;\n        case 2:\n            _ui__WEBPACK_IMPORTED_MODULE_2__.setAndTrigger(\"inputNRow\", (0,_lib__WEBPACK_IMPORTED_MODULE_1__.from)(2, 3));\n            break;\n        case 3:\n            _ui__WEBPACK_IMPORTED_MODULE_2__.setAndTrigger(\"input\", (0,_lib__WEBPACK_IMPORTED_MODULE_1__.oneOf)([\"maddox\", \"steven\", \"esther\", \"william\", \"lisa\", \"chugbert\", \"taco\", \"taylor\", \"sarah\", \"dusty\", \"gerald\", \"bonnie\", \"lydia\"]));\n            break;\n        case 4:\n            _ui__WEBPACK_IMPORTED_MODULE_2__.setAndTrigger(\"regexInput\", (0,_lib__WEBPACK_IMPORTED_MODULE_1__.oneOf)([\n                new Array((0,_lib__WEBPACK_IMPORTED_MODULE_1__.from)(1, 24)).fill('.').join(\"\"),\n                \".*(([^s])\\\\2).*\\\\1.*\",\n                \"[^aeiou]{3}[^aeiou]*\",\n                \".*ology\",\n                \".*([gbzp])\\\\1y.*\",\n                \".*ooz|uze|euz.*\",\n                \".*urple.*\",\n                \".*rg[aoeui]r\",\n                \".*e[ae]+.*zy.*\",\n            ]));\n            break;\n    }\n}\n_ui__WEBPACK_IMPORTED_MODULE_2__.onChangeTextInput(async (text) => {\n    useRegex('[' + text.split(\"\").filter(_lib__WEBPACK_IMPORTED_MODULE_1__.FILTERS.onlyHasLetters).map(x => x.toLowerCase()).filter(_lib__WEBPACK_IMPORTED_MODULE_1__.FILTERS.noDupes).join(\"\") + ']+');\n});\n_ui__WEBPACK_IMPORTED_MODULE_2__.onChangeRegexInput(async (regexpString) => {\n    useRegex(regexpString);\n});\n_ui__WEBPACK_IMPORTED_MODULE_2__.onChangeInputInOrder(async (text) => {\n    useRegex(\".*\" + text.split(\"\").map(x => x.toLowerCase()).join(\".*\") + \".*\");\n});\n_ui__WEBPACK_IMPORTED_MODULE_2__.onChangeInputN(async (n) => {\n    useRegex(\".*(.)\\\\1{\" + (n - 1) + \"}.*\");\n});\n_ui__WEBPACK_IMPORTED_MODULE_2__.onChangeInputNTotal(async (n) => {\n    useRegex(\".*(.).*\" + (new Array(n - 1).fill(\"\\\\1\")).join(\".*\") + \".*\");\n});\n/* Enact a search with a given regex string\n  1. Populate the regex textbox with the appropriate text\n  2. Convert to an actual regex and search with that\n  3. Display the results or an error message\n */\nfunction useRegex(regexString) {\n    _ui__WEBPACK_IMPORTED_MODULE_2__.setRegexInput(regexString);\n    try {\n        _dictionary__WEBPACK_IMPORTED_MODULE_0__.searchDictionaryWithRegexp(new RegExp(`^${regexString}$`, \"i\"))\n            .then(results => {\n            _ui__WEBPACK_IMPORTED_MODULE_2__.displayTheseWords(results);\n        }).catch(() => {\n            _ui__WEBPACK_IMPORTED_MODULE_2__.displayTheseWords([\"regexp timed out\"]);\n        });\n    }\n    catch (e) {\n        _ui__WEBPACK_IMPORTED_MODULE_2__.displayTheseWords([\"invalid regular expression\"]);\n    }\n}\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/lib.ts":
/*!********************!*\
  !*** ./src/lib.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"FILTERS\": () => (/* binding */ FILTERS),\n/* harmony export */   \"debounce\": () => (/* binding */ debounce),\n/* harmony export */   \"from\": () => (/* binding */ from),\n/* harmony export */   \"getRandomChar\": () => (/* binding */ getRandomChar),\n/* harmony export */   \"isMac\": () => (/* binding */ isMac),\n/* harmony export */   \"memoize\": () => (/* binding */ memoize),\n/* harmony export */   \"oneOf\": () => (/* binding */ oneOf),\n/* harmony export */   \"timeEnd\": () => (/* binding */ timeEnd),\n/* harmony export */   \"timeStart\": () => (/* binding */ timeStart),\n/* harmony export */   \"timeoutPromise\": () => (/* binding */ timeoutPromise)\n/* harmony export */ });\nfunction memoize(method) {\n    let cache = {};\n    return async function (...args) {\n        // let args = JSON.stringify(arguments);\n        let argString = stringifyEvenWithRegex(arguments);\n        // let time = Date.now();\n        if (cache[argString]) {\n            console.log(\"cache hit\", argString, cache[argString]);\n        }\n        else {\n            cache[argString] = method.apply(this, arguments);\n        }\n        return cache[argString];\n    };\n}\nfunction stringifyEvenWithRegex(obj) {\n    if (obj.hasOwnProperty('callee')) {\n        obj = Array.from(obj);\n    }\n    if (Array.isArray(obj)) {\n        return \"[\" + obj.map(stringifyEvenWithRegex).join(\",\") + \"]\";\n    }\n    else if (obj instanceof RegExp) {\n        return obj.toString();\n    }\n    return JSON.stringify(obj);\n}\nfunction debounce(method, time) {\n    let timeout;\n    return async function (...args) {\n        clearTimeout(timeout);\n        return new Promise((res, rej) => {\n            timeout = setTimeout(() => {\n                res(method.apply(this, arguments));\n            }, time);\n        });\n    };\n}\nconst FILTERS = {\n    \"onlyHasLetters\": function (str) { return /^[a-z]+$/i.test(str); },\n    \"noDupes\": function (v, i, a) { return a.indexOf(v) === i; }\n};\nfunction timeoutPromise(ms, promise) {\n    /* wrap a promise and reject it if it takes too long */\n    return new Promise((resolve, reject) => {\n        setTimeout(() => {\n            console.log(\"TIMED OUT PROMISE\");\n            reject(\"timeout\");\n        }, ms);\n        promise.then(resolve, reject);\n    });\n}\nlet times = {};\nfunction timeStart(name) {\n    // if(!times[name]){\n    times[name] = Date.now();\n    // }else{\n    //     let diff = Date.now()-times[name]\n    //     console.log(name,\"took\",diff/1000,\"seconds\");\n    // }\n}\nfunction timeEnd(name) {\n    let diff = Date.now() - times[name];\n    console.log(name, \"took\", diff / 1000, \"seconds\");\n    delete times[name];\n}\n/* detect if the user is on Mac */\nfunction isMac() {\n    return navigator.platform.toLowerCase().indexOf(\"mac\") > -1;\n}\nfunction from(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }\nfunction oneOf(array) { return array[Math.floor(Math.random() * array.length)]; }\nfunction getRandomChar() { return String.fromCharCode(Math.floor(Math.random() * 26) + 97); }\n\n\n//# sourceURL=webpack:///./src/lib.ts?");

/***/ }),

/***/ "./src/querystring.ts":
/*!****************************!*\
  !*** ./src/querystring.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getQueryObject\": () => (/* binding */ getQueryObject),\n/* harmony export */   \"updateQueryString\": () => (/* binding */ updateQueryString)\n/* harmony export */ });\nfunction getQueryObject() {\n    /* parse query string into an object */\n    let query = window.location.search.substring(1); // remove the ? at the beginning\n    // decode uri component\n    query = decodeURIComponent(query); // convert from %20 to space and %22 to \"\n    console.log(\"query\", query);\n    const queryObject = {};\n    query.split(\"&\").forEach(function (part) {\n        if (part.includes(\"=\")) { // normal case, something like ?disabled=true\n            const [key, value] = part.split(\"=\");\n            queryObject[key] = value;\n        }\n        else {\n            queryObject[part] = \"\"; // no =, something like ?disabled\n        }\n    });\n    return queryObject;\n}\nfunction updateQueryString(queryObject) {\n    /* update the query string with the given object */\n    let entries = Object.keys(queryObject)\n        .filter(key => queryObject[key] !== \"\") // don't bother with empty string values\n        .map(key => key + \"=\" + queryObject[key]);\n    if (entries.length > 0) {\n        window.history.pushState({}, \"\", window.location.pathname + \"?\" + entries.join(\"&\"));\n    }\n    else {\n        // clear query string\n        window.history.pushState({}, \"\", window.location.pathname);\n    }\n}\n\n\n//# sourceURL=webpack:///./src/querystring.ts?");

/***/ }),

/***/ "./src/ui.ts":
/*!*******************!*\
  !*** ./src/ui.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"IDs\": () => (/* reexport safe */ _ui0__WEBPACK_IMPORTED_MODULE_2__.IDs),\n/* harmony export */   \"displayTheseWords\": () => (/* binding */ displayTheseWords),\n/* harmony export */   \"onChangeInputInOrder\": () => (/* binding */ onChangeInputInOrder),\n/* harmony export */   \"onChangeInputN\": () => (/* binding */ onChangeInputN),\n/* harmony export */   \"onChangeInputNTotal\": () => (/* binding */ onChangeInputNTotal),\n/* harmony export */   \"onChangeRegexInput\": () => (/* binding */ onChangeRegexInput),\n/* harmony export */   \"onChangeTextInput\": () => (/* binding */ onChangeTextInput),\n/* harmony export */   \"setAndTrigger\": () => (/* binding */ setAndTrigger),\n/* harmony export */   \"setRegexInput\": () => (/* binding */ setRegexInput)\n/* harmony export */ });\n/* harmony import */ var _dictionary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dictionary */ \"./src/dictionary.ts\");\n/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib */ \"./src/lib.ts\");\n/* harmony import */ var _ui0__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ui0 */ \"./src/ui0.ts\");\n\n\n\nfunction setRegexInput(text) { (0,_ui0__WEBPACK_IMPORTED_MODULE_2__.getElement)(\"regexInput\").value = text; }\nlet firstRandomization = true;\nasync function setAndTrigger(id, value) {\n    let e = (0,_ui0__WEBPACK_IMPORTED_MODULE_2__.getElement)(id);\n    e.value = value + \"\";\n    e.dispatchEvent(new Event(\"input\"));\n    firstRandomization && animations(id);\n    firstRandomization = false;\n    /* Bring attention to the element by pulsing it */\n}\nasync function animations(id) {\n    await (0,_ui0__WEBPACK_IMPORTED_MODULE_2__.tempAddClass)(id, \"pulse\", 2000);\n    if (id != \"regexInput\") {\n        await (0,_ui0__WEBPACK_IMPORTED_MODULE_2__.tempAddClass)(\"regexInput\", \"pulse\", 2000);\n    }\n    (0,_ui0__WEBPACK_IMPORTED_MODULE_2__.tempAddClass)(\"resultsbg\", \"showy\", 5000);\n}\nconst onChangeInputInOrder = (0,_ui0__WEBPACK_IMPORTED_MODULE_2__.implementOnTextInputChanged)(\"inputInOrder\");\nconst onChangeTextInput = (0,_ui0__WEBPACK_IMPORTED_MODULE_2__.implementOnTextInputChanged)(\"input\");\nconst onChangeRegexInput = (0,_ui0__WEBPACK_IMPORTED_MODULE_2__.implementOnTextInputChanged)(\"regexInput\");\nconst onChangeInputN = (0,_ui0__WEBPACK_IMPORTED_MODULE_2__.implementOnNumberInputChanged)(\"inputNRow\");\nconst onChangeInputNTotal = (0,_ui0__WEBPACK_IMPORTED_MODULE_2__.implementOnNumberInputChanged)(\"inputNTotal\");\n// export const onPressRandomize = (handler:()=>void)=>{\n//     getElement(\"randomize\").addEventListener(\"click\",()=>{\n//         handler()\n//     })\n// }\nfunction displayTheseWords(text) {\n    let time = new Date().getTime();\n    if (text.length == 0) {\n        text.push(\"no results\");\n    }\n    let element = (0,_ui0__WEBPACK_IMPORTED_MODULE_2__.getElement)(\"results\");\n    /* empty results */\n    while (element?.firstChild) {\n        element.removeChild(element.firstChild);\n    }\n    /* populate with hoverable word entries */\n    text.forEach(x => {\n        let p = document.createElement(\"span\");\n        p.innerText = x;\n        p.addEventListener(\"mouseover\", () => displayDefinitions(x));\n        element?.appendChild(p);\n        element?.appendChild(document.createElement(\"br\"));\n    });\n    let t2 = new Date().getTime();\n    console.log(\"took\", (t2 - time) / 1000, \"seconds to display\", text.length, \"words\");\n    _lib__WEBPACK_IMPORTED_MODULE_1__.timeEnd(\"input\");\n}\nasync function displayDefinitions(text) {\n    let element = (0,_ui0__WEBPACK_IMPORTED_MODULE_2__.getElement)(\"definition\");\n    element.value = \"loading definition...\";\n    let definitions = await _dictionary__WEBPACK_IMPORTED_MODULE_0__.define(text);\n    if (definitions.length == 0) {\n        element.value = \"no definition found...\" +\n            (_lib__WEBPACK_IMPORTED_MODULE_1__.isMac() ? \"\\nIf you're on Mac, try hovering the word and typing [Ctrl][Command]+[D]\" : \"\");\n    }\n    else {\n        element.value = definitions.join(\"\\n\\n\");\n    }\n}\n\n\n\n//# sourceURL=webpack:///./src/ui.ts?");

/***/ }),

/***/ "./src/ui0.ts":
/*!********************!*\
  !*** ./src/ui0.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"IDs\": () => (/* binding */ IDs),\n/* harmony export */   \"getElement\": () => (/* binding */ getElement),\n/* harmony export */   \"implementOnNumberInputChanged\": () => (/* binding */ implementOnNumberInputChanged),\n/* harmony export */   \"implementOnTextInputChanged\": () => (/* binding */ implementOnTextInputChanged),\n/* harmony export */   \"tempAddClass\": () => (/* binding */ tempAddClass)\n/* harmony export */ });\n/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib */ \"./src/lib.ts\");\n/* harmony import */ var _querystring__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./querystring */ \"./src/querystring.ts\");\n/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ui */ \"./src/ui.ts\");\n\n\n\nconst IDs = {\n    results: \"results\",\n    randomize: \"randomize\",\n    input: \"input\",\n    regexInput: \"regexInput\",\n    textarea: \"textarea\",\n    definition: \"definition\",\n    inputInOrder: \"inputInOrder\",\n    inputNRow: \"inputNRow\",\n    inputNTotal: \"inputNTotal\",\n    resultsbg: \"resultsbg\",\n};\nfunction getElement(id) { return document.getElementById(id); }\nasync function tempAddClass(id, className, duration = 1000) {\n    let e = getElement(id);\n    e.classList.add(className);\n    e.style.position = \"relative\";\n    await new Promise((res, rej) => {\n        setTimeout(() => {\n            // temp.remove();\n            e.classList.remove(className);\n            res(true);\n        }, duration);\n    });\n}\nfunction implementOnTextInputChanged(id) {\n    return (handler) => {\n        getElement(id).addEventListener(\"input\", () => {\n            _lib__WEBPACK_IMPORTED_MODULE_0__.timeStart(\"input\");\n            handler(getElement(id).value);\n            clearInputsOtherThan(id);\n            (0,_querystring__WEBPACK_IMPORTED_MODULE_1__.updateQueryString)({ [id]: getElement(id).value });\n        });\n    };\n}\nfunction implementOnNumberInputChanged(id) {\n    return (handler) => {\n        getElement(id).addEventListener(\"input\", () => {\n            _lib__WEBPACK_IMPORTED_MODULE_0__.timeStart(\"input\");\n            let v = parseInt(getElement(id).value);\n            if (v <= 0 || Number.isNaN(v) || v > 20) {\n                getElement(id).value = \"\";\n                (0,_ui__WEBPACK_IMPORTED_MODULE_2__.setRegexInput)(\"\");\n            }\n            else {\n                handler(v);\n            }\n            (0,_querystring__WEBPACK_IMPORTED_MODULE_1__.updateQueryString)({ [id]: getElement(id).value });\n            clearInputsOtherThan(id);\n        });\n    };\n}\n/* When typing in one of the inputs, we want to clear other inputs\nso it is clear that they are not being used.\nBut we don't clear the regex because it is always used */\nfunction clearInputsOtherThan(dontClearThis) {\n    // get all the inputs\n    let inputs = document.getElementsByTagName(\"input\");\n    // filter out the ones we don't want to clear\n    let inputsToClear = Array.from(inputs).filter(x => x.id != dontClearThis && x.id != \"regexInput\");\n    // clear them\n    inputsToClear.forEach(x => x.value = \"\");\n}\n\n\n//# sourceURL=webpack:///./src/ui0.ts?");

/***/ }),

/***/ "./src/workerWrapper.ts":
/*!******************************!*\
  !*** ./src/workerWrapper.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"postDictionary\": () => (/* binding */ postDictionary),\n/* harmony export */   \"postRegex\": () => (/* binding */ postRegex)\n/* harmony export */ });\n/* harmony import */ var worker_rpc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! worker-rpc */ \"./node_modules/worker-rpc/lib/index.js\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ \"./src/constants.ts\");\n\n\nconst remoteWorker = new Worker('./dist/worker.js', { type: 'module' }), rpcProvider = new worker_rpc__WEBPACK_IMPORTED_MODULE_0__.RpcProvider((message, transfer) => remoteWorker.postMessage(message, transfer), _constants__WEBPACK_IMPORTED_MODULE_1__.WEB_WORKER_TIMEOUT);\nremoteWorker.onmessage = e => {\n    rpcProvider.dispatch(e.data);\n};\nfunction postDictionary(words) {\n    rpcProvider.rpc('dict', words).then(() => {\n        console.log(\"postDictionary done\");\n    });\n}\nfunction postRegex(regex) {\n    return rpcProvider.rpc('regexp', regex);\n}\n\n\n//# sourceURL=webpack:///./src/workerWrapper.ts?");

/***/ }),

/***/ "./node_modules/worker-rpc/lib/RpcProvider.js":
/*!****************************************************!*\
  !*** ./node_modules/worker-rpc/lib/RpcProvider.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar microevent_ts_1 = __webpack_require__(/*! microevent.ts */ \"./node_modules/microevent.ts/lib/index.js\");\nvar MSG_RESOLVE_TRANSACTION = \"resolve_transaction\", MSG_REJECT_TRANSACTION = \"reject_transaction\", MSG_ERROR = \"error\";\nvar RpcProvider = /** @class */ (function () {\n    function RpcProvider(_dispatch, _rpcTimeout) {\n        if (_rpcTimeout === void 0) { _rpcTimeout = 0; }\n        this._dispatch = _dispatch;\n        this._rpcTimeout = _rpcTimeout;\n        this.error = new microevent_ts_1.Event();\n        this._rpcHandlers = {};\n        this._signalHandlers = {};\n        this._pendingTransactions = {};\n        this._nextTransactionId = 0;\n    }\n    RpcProvider.prototype.dispatch = function (payload) {\n        var message = payload;\n        switch (message.type) {\n            case RpcProvider.MessageType.signal:\n                return this._handleSignal(message);\n            case RpcProvider.MessageType.rpc:\n                return this._handeRpc(message);\n            case RpcProvider.MessageType.internal:\n                return this._handleInternal(message);\n            default:\n                this._raiseError(\"invalid message type \" + message.type);\n        }\n    };\n    RpcProvider.prototype.rpc = function (id, payload, transfer) {\n        var _this = this;\n        var transactionId = this._nextTransactionId++;\n        this._dispatch({\n            type: RpcProvider.MessageType.rpc,\n            transactionId: transactionId,\n            id: id,\n            payload: payload\n        }, transfer ? transfer : undefined);\n        return new Promise(function (resolve, reject) {\n            var transaction = _this._pendingTransactions[transactionId] = {\n                id: transactionId,\n                resolve: resolve,\n                reject: reject\n            };\n            if (_this._rpcTimeout > 0) {\n                _this._pendingTransactions[transactionId].timeoutHandle =\n                    setTimeout(function () { return _this._transactionTimeout(transaction); }, _this._rpcTimeout);\n            }\n        });\n    };\n    ;\n    RpcProvider.prototype.signal = function (id, payload, transfer) {\n        this._dispatch({\n            type: RpcProvider.MessageType.signal,\n            id: id,\n            payload: payload,\n        }, transfer ? transfer : undefined);\n        return this;\n    };\n    RpcProvider.prototype.registerRpcHandler = function (id, handler) {\n        if (this._rpcHandlers[id]) {\n            throw new Error(\"rpc handler for \" + id + \" already registered\");\n        }\n        this._rpcHandlers[id] = handler;\n        return this;\n    };\n    ;\n    RpcProvider.prototype.registerSignalHandler = function (id, handler) {\n        if (!this._signalHandlers[id]) {\n            this._signalHandlers[id] = [];\n        }\n        this._signalHandlers[id].push(handler);\n        return this;\n    };\n    RpcProvider.prototype.deregisterRpcHandler = function (id, handler) {\n        if (this._rpcHandlers[id]) {\n            delete this._rpcHandlers[id];\n        }\n        return this;\n    };\n    ;\n    RpcProvider.prototype.deregisterSignalHandler = function (id, handler) {\n        if (this._signalHandlers[id]) {\n            this._signalHandlers[id] = this._signalHandlers[id].filter(function (h) { return handler !== h; });\n        }\n        return this;\n    };\n    RpcProvider.prototype._raiseError = function (error) {\n        this.error.dispatch(new Error(error));\n        this._dispatch({\n            type: RpcProvider.MessageType.internal,\n            id: MSG_ERROR,\n            payload: error\n        });\n    };\n    RpcProvider.prototype._handleSignal = function (message) {\n        if (!this._signalHandlers[message.id]) {\n            return this._raiseError(\"invalid signal \" + message.id);\n        }\n        this._signalHandlers[message.id].forEach(function (handler) { return handler(message.payload); });\n    };\n    RpcProvider.prototype._handeRpc = function (message) {\n        var _this = this;\n        if (!this._rpcHandlers[message.id]) {\n            return this._raiseError(\"invalid rpc \" + message.id);\n        }\n        Promise.resolve(this._rpcHandlers[message.id](message.payload))\n            .then(function (result) { return _this._dispatch({\n            type: RpcProvider.MessageType.internal,\n            id: MSG_RESOLVE_TRANSACTION,\n            transactionId: message.transactionId,\n            payload: result\n        }); }, function (reason) { return _this._dispatch({\n            type: RpcProvider.MessageType.internal,\n            id: MSG_REJECT_TRANSACTION,\n            transactionId: message.transactionId,\n            payload: reason\n        }); });\n    };\n    RpcProvider.prototype._handleInternal = function (message) {\n        var transaction = typeof (message.transactionId) !== 'undefined' ? this._pendingTransactions[message.transactionId] : undefined;\n        switch (message.id) {\n            case MSG_RESOLVE_TRANSACTION:\n                if (!transaction || typeof (message.transactionId) === 'undefined') {\n                    return this._raiseError(\"no pending transaction with id \" + message.transactionId);\n                }\n                transaction.resolve(message.payload);\n                this._clearTransaction(this._pendingTransactions[message.transactionId]);\n                break;\n            case MSG_REJECT_TRANSACTION:\n                if (!transaction || typeof (message.transactionId) === 'undefined') {\n                    return this._raiseError(\"no pending transaction with id \" + message.transactionId);\n                }\n                this._pendingTransactions[message.transactionId].reject(message.payload);\n                this._clearTransaction(this._pendingTransactions[message.transactionId]);\n                break;\n            case MSG_ERROR:\n                this.error.dispatch(new Error(\"remote error: \" + message.payload));\n                break;\n            default:\n                this._raiseError(\"unhandled internal message \" + message.id);\n                break;\n        }\n    };\n    RpcProvider.prototype._transactionTimeout = function (transaction) {\n        transaction.reject('transaction timed out');\n        this._raiseError(\"transaction \" + transaction.id + \" timed out\");\n        delete this._pendingTransactions[transaction.id];\n        return;\n    };\n    RpcProvider.prototype._clearTransaction = function (transaction) {\n        if (typeof (transaction.timeoutHandle) !== 'undefined') {\n            clearTimeout(transaction.timeoutHandle);\n        }\n        delete this._pendingTransactions[transaction.id];\n    };\n    return RpcProvider;\n}());\n(function (RpcProvider) {\n    var MessageType;\n    (function (MessageType) {\n        MessageType[MessageType[\"signal\"] = 0] = \"signal\";\n        MessageType[MessageType[\"rpc\"] = 1] = \"rpc\";\n        MessageType[MessageType[\"internal\"] = 2] = \"internal\";\n    })(MessageType = RpcProvider.MessageType || (RpcProvider.MessageType = {}));\n    ;\n})(RpcProvider || (RpcProvider = {}));\nexports[\"default\"] = RpcProvider;\n\n\n//# sourceURL=webpack:///./node_modules/worker-rpc/lib/RpcProvider.js?");

/***/ }),

/***/ "./node_modules/worker-rpc/lib/index.js":
/*!**********************************************!*\
  !*** ./node_modules/worker-rpc/lib/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar RpcProvider_1 = __webpack_require__(/*! ./RpcProvider */ \"./node_modules/worker-rpc/lib/RpcProvider.js\");\nexports.RpcProvider = RpcProvider_1.default;\n\n\n//# sourceURL=webpack:///./node_modules/worker-rpc/lib/index.js?");

/***/ }),

/***/ "./Dictionary.db":
/*!***********************!*\
  !*** ./Dictionary.db ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"85bbdb65490b1de21a2d.db\";\n\n//# sourceURL=webpack:///./Dictionary.db?");

/***/ }),

/***/ "./MacDictionary.db":
/*!**************************!*\
  !*** ./MacDictionary.db ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"cefe294b17d5ea8c4ff9.db\";\n\n//# sourceURL=webpack:///./MacDictionary.db?");

/***/ }),

/***/ "./node_modules/sql.js-httpvfs/dist/sql-wasm.wasm":
/*!********************************************************!*\
  !*** ./node_modules/sql.js-httpvfs/dist/sql-wasm.wasm ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"c74ad46623e4ee643959.wasm\";\n\n//# sourceURL=webpack:///./node_modules/sql.js-httpvfs/dist/sql-wasm.wasm?");

/***/ }),

/***/ "./node_modules/sql.js-httpvfs/dist/sqlite.worker.js":
/*!***********************************************************!*\
  !*** ./node_modules/sql.js-httpvfs/dist/sqlite.worker.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"8c500ff8a49b305f9ab6.js\";\n\n//# sourceURL=webpack:///./node_modules/sql.js-httpvfs/dist/sqlite.worker.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "./dist/";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"bundle": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;