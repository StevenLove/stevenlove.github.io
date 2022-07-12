/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/microevent.ts/lib/Event.js":
/*!*************************************************!*\
  !*** ./node_modules/microevent.ts/lib/Event.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar factories = [];\nfactories[0] = function () {\n    return function dispatcher0() { };\n};\nfactories[1] = function (callback, context) {\n    if (typeof (context) === 'undefined')\n        return callback;\n    return function dispatcher1(payload) {\n        callback(payload, context);\n    };\n};\nfunction getFactory(handlerCount) {\n    if (!factories[handlerCount])\n        factories[handlerCount] = compileFactory(handlerCount);\n    return factories[handlerCount];\n}\nfunction compileFactory(handlerCount) {\n    var src = 'return function dispatcher' + handlerCount + '(payload) {\\n';\n    var argsHandlers = [], argsContexts = [];\n    for (var i = 0; i < handlerCount; i++) {\n        argsHandlers.push('cb' + i);\n        argsContexts.push('ctx' + i);\n        src += '    cb' + i + '(payload, ctx' + i + ');\\n';\n    }\n    src += '};';\n    return new (Function.bind.apply(Function, [void 0].concat(argsHandlers.concat(argsContexts), [src])))();\n}\nvar Event = /** @class */ (function () {\n    function Event() {\n        this.hasHandlers = false;\n        this._handlers = [];\n        this._contexts = [];\n        this._createDispatcher();\n    }\n    Event.prototype.addHandler = function (handler, context) {\n        if (!this.isHandlerAttached(handler, context)) {\n            this._handlers.push(handler);\n            this._contexts.push(context);\n            this._createDispatcher();\n            this._updateHasHandlers();\n        }\n        return this;\n    };\n    Event.prototype.removeHandler = function (handler, context) {\n        var idx = this._getHandlerIndex(handler, context);\n        if (typeof (idx) !== 'undefined') {\n            this._handlers.splice(idx, 1);\n            this._contexts.splice(idx, 1);\n            this._createDispatcher();\n            this._updateHasHandlers();\n        }\n        return this;\n    };\n    Event.prototype.isHandlerAttached = function (handler, context) {\n        return typeof (this._getHandlerIndex(handler, context)) !== 'undefined';\n    };\n    Event.prototype._updateHasHandlers = function () {\n        this.hasHandlers = !!this._handlers.length;\n    };\n    Event.prototype._getHandlerIndex = function (handler, context) {\n        var handlerCount = this._handlers.length;\n        var idx;\n        for (idx = 0; idx < handlerCount; idx++) {\n            if (this._handlers[idx] === handler && this._contexts[idx] === context)\n                break;\n        }\n        return idx < handlerCount ? idx : undefined;\n    };\n    Event.prototype._createDispatcher = function () {\n        this.dispatch = getFactory(this._handlers.length).apply(this, this._handlers.concat(this._contexts));\n    };\n    return Event;\n}());\nexports[\"default\"] = Event;\n\n\n//# sourceURL=webpack:///./node_modules/microevent.ts/lib/Event.js?");

/***/ }),

/***/ "./node_modules/microevent.ts/lib/index.js":
/*!*************************************************!*\
  !*** ./node_modules/microevent.ts/lib/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar Event_1 = __webpack_require__(/*! ./Event */ \"./node_modules/microevent.ts/lib/Event.js\");\nexports.Event = Event_1.default;\n\n\n//# sourceURL=webpack:///./node_modules/microevent.ts/lib/index.js?");

/***/ }),

/***/ "./src/constants.ts":
/*!**************************!*\
  !*** ./src/constants.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"MAX_RESULTS\": () => (/* binding */ MAX_RESULTS),\n/* harmony export */   \"WEB_WORKER_TIMEOUT\": () => (/* binding */ WEB_WORKER_TIMEOUT)\n/* harmony export */ });\nconst MAX_RESULTS = 500;\nconst WEB_WORKER_TIMEOUT = 1000;\n\n\n//# sourceURL=webpack:///./src/constants.ts?");

/***/ }),

/***/ "./src/lib.ts":
/*!********************!*\
  !*** ./src/lib.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"FILTERS\": () => (/* binding */ FILTERS),\n/* harmony export */   \"debounce\": () => (/* binding */ debounce),\n/* harmony export */   \"from\": () => (/* binding */ from),\n/* harmony export */   \"getRandomChar\": () => (/* binding */ getRandomChar),\n/* harmony export */   \"isMac\": () => (/* binding */ isMac),\n/* harmony export */   \"memoize\": () => (/* binding */ memoize),\n/* harmony export */   \"oneOf\": () => (/* binding */ oneOf),\n/* harmony export */   \"timeEnd\": () => (/* binding */ timeEnd),\n/* harmony export */   \"timeStart\": () => (/* binding */ timeStart),\n/* harmony export */   \"timeoutPromise\": () => (/* binding */ timeoutPromise)\n/* harmony export */ });\nfunction memoize(method) {\n    let cache = {};\n    return async function (...args) {\n        // let args = JSON.stringify(arguments);\n        let argString = stringifyEvenWithRegex(arguments);\n        // let time = Date.now();\n        if (cache[argString]) {\n            console.log(\"cache hit\", argString, cache[argString]);\n        }\n        else {\n            cache[argString] = method.apply(this, arguments);\n        }\n        return cache[argString];\n    };\n}\nfunction stringifyEvenWithRegex(obj) {\n    if (obj.hasOwnProperty('callee')) {\n        obj = Array.from(obj);\n    }\n    if (Array.isArray(obj)) {\n        return \"[\" + obj.map(stringifyEvenWithRegex).join(\",\") + \"]\";\n    }\n    else if (obj instanceof RegExp) {\n        return obj.toString();\n    }\n    return JSON.stringify(obj);\n}\nfunction debounce(method, time) {\n    let timeout;\n    return async function (...args) {\n        clearTimeout(timeout);\n        return new Promise((res, rej) => {\n            timeout = setTimeout(() => {\n                res(method.apply(this, arguments));\n            }, time);\n        });\n    };\n}\nconst FILTERS = {\n    \"onlyHasLetters\": function (str) { return /^[a-z]+$/i.test(str); },\n    \"noDupes\": function (v, i, a) { return a.indexOf(v) === i; }\n};\nfunction timeoutPromise(ms, promise) {\n    /* wrap a promise and reject it if it takes too long */\n    return new Promise((resolve, reject) => {\n        setTimeout(() => {\n            console.log(\"TIMED OUT PROMISE\");\n            reject(\"timeout\");\n        }, ms);\n        promise.then(resolve, reject);\n    });\n}\nlet times = {};\nfunction timeStart(name) {\n    // if(!times[name]){\n    times[name] = Date.now();\n    // }else{\n    //     let diff = Date.now()-times[name]\n    //     console.log(name,\"took\",diff/1000,\"seconds\");\n    // }\n}\nfunction timeEnd(name) {\n    let diff = Date.now() - times[name];\n    console.log(name, \"took\", diff / 1000, \"seconds\");\n    delete times[name];\n}\n/* detect if the user is on Mac */\nfunction isMac() {\n    return navigator.platform.toLowerCase().indexOf(\"mac\") > -1;\n}\nfunction from(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }\nfunction oneOf(array) { return array[Math.floor(Math.random() * array.length)]; }\nfunction getRandomChar() { return String.fromCharCode(Math.floor(Math.random() * 26) + 97); }\n\n\n//# sourceURL=webpack:///./src/lib.ts?");

/***/ }),

/***/ "./src/worker.ts":
/*!***********************!*\
  !*** ./src/worker.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib */ \"./src/lib.ts\");\n/* harmony import */ var worker_rpc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! worker-rpc */ \"./node_modules/worker-rpc/lib/index.js\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ \"./src/constants.ts\");\n// we can't directly import dictionary because it imports sql.js-httpvfs which tries to use `document`\n// and that's not available in a worker.\n\n\n\nlet words = [];\nconst rpcProvider = new worker_rpc__WEBPACK_IMPORTED_MODULE_1__.RpcProvider((message, transfer) => postMessage(message, transfer));\nonmessage = e => {\n    return rpcProvider.dispatch(e.data);\n};\n// rpcProvider.registerRpcHandler('definition', (w:string) => {\n//   let matches = words.filter(word=>word==w);\n//   return matches.map(m=>JSON.stringify(m)).join(\"\\n\");\n// });\nrpcProvider.registerRpcHandler('dict', (w) => {\n    words = w;\n    return true;\n});\nrpcProvider.registerRpcHandler('regexp', (r) => {\n    let time = new Date().getTime();\n    let result = words.filter(w => r.test(w));\n    let t2 = new Date().getTime();\n    console.log(\"took\", (t2 - time) / 1000, \"seconds to filter by\", r);\n    let numResults = result.length;\n    if (numResults > _constants__WEBPACK_IMPORTED_MODULE_2__.MAX_RESULTS) {\n        result = result.slice(0, _constants__WEBPACK_IMPORTED_MODULE_2__.MAX_RESULTS);\n        result.push((numResults - _constants__WEBPACK_IMPORTED_MODULE_2__.MAX_RESULTS) + \" more results not shown...\");\n    }\n    result = result.filter(_lib__WEBPACK_IMPORTED_MODULE_0__.FILTERS.noDupes);\n    let t3 = new Date().getTime();\n    console.log(\"took\", (t3 - t2) / 1000, \"seconds to filter out duplicates\");\n    return result;\n});\n\n\n//# sourceURL=webpack:///./src/worker.ts?");

/***/ }),

/***/ "./node_modules/worker-rpc/lib/RpcProvider.js":
/*!****************************************************!*\
  !*** ./node_modules/worker-rpc/lib/RpcProvider.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar microevent_ts_1 = __webpack_require__(/*! microevent.ts */ \"./node_modules/microevent.ts/lib/index.js\");\nvar MSG_RESOLVE_TRANSACTION = \"resolve_transaction\", MSG_REJECT_TRANSACTION = \"reject_transaction\", MSG_ERROR = \"error\";\nvar RpcProvider = /** @class */ (function () {\n    function RpcProvider(_dispatch, _rpcTimeout) {\n        if (_rpcTimeout === void 0) { _rpcTimeout = 0; }\n        this._dispatch = _dispatch;\n        this._rpcTimeout = _rpcTimeout;\n        this.error = new microevent_ts_1.Event();\n        this._rpcHandlers = {};\n        this._signalHandlers = {};\n        this._pendingTransactions = {};\n        this._nextTransactionId = 0;\n    }\n    RpcProvider.prototype.dispatch = function (payload) {\n        var message = payload;\n        switch (message.type) {\n            case RpcProvider.MessageType.signal:\n                return this._handleSignal(message);\n            case RpcProvider.MessageType.rpc:\n                return this._handeRpc(message);\n            case RpcProvider.MessageType.internal:\n                return this._handleInternal(message);\n            default:\n                this._raiseError(\"invalid message type \" + message.type);\n        }\n    };\n    RpcProvider.prototype.rpc = function (id, payload, transfer) {\n        var _this = this;\n        var transactionId = this._nextTransactionId++;\n        this._dispatch({\n            type: RpcProvider.MessageType.rpc,\n            transactionId: transactionId,\n            id: id,\n            payload: payload\n        }, transfer ? transfer : undefined);\n        return new Promise(function (resolve, reject) {\n            var transaction = _this._pendingTransactions[transactionId] = {\n                id: transactionId,\n                resolve: resolve,\n                reject: reject\n            };\n            if (_this._rpcTimeout > 0) {\n                _this._pendingTransactions[transactionId].timeoutHandle =\n                    setTimeout(function () { return _this._transactionTimeout(transaction); }, _this._rpcTimeout);\n            }\n        });\n    };\n    ;\n    RpcProvider.prototype.signal = function (id, payload, transfer) {\n        this._dispatch({\n            type: RpcProvider.MessageType.signal,\n            id: id,\n            payload: payload,\n        }, transfer ? transfer : undefined);\n        return this;\n    };\n    RpcProvider.prototype.registerRpcHandler = function (id, handler) {\n        if (this._rpcHandlers[id]) {\n            throw new Error(\"rpc handler for \" + id + \" already registered\");\n        }\n        this._rpcHandlers[id] = handler;\n        return this;\n    };\n    ;\n    RpcProvider.prototype.registerSignalHandler = function (id, handler) {\n        if (!this._signalHandlers[id]) {\n            this._signalHandlers[id] = [];\n        }\n        this._signalHandlers[id].push(handler);\n        return this;\n    };\n    RpcProvider.prototype.deregisterRpcHandler = function (id, handler) {\n        if (this._rpcHandlers[id]) {\n            delete this._rpcHandlers[id];\n        }\n        return this;\n    };\n    ;\n    RpcProvider.prototype.deregisterSignalHandler = function (id, handler) {\n        if (this._signalHandlers[id]) {\n            this._signalHandlers[id] = this._signalHandlers[id].filter(function (h) { return handler !== h; });\n        }\n        return this;\n    };\n    RpcProvider.prototype._raiseError = function (error) {\n        this.error.dispatch(new Error(error));\n        this._dispatch({\n            type: RpcProvider.MessageType.internal,\n            id: MSG_ERROR,\n            payload: error\n        });\n    };\n    RpcProvider.prototype._handleSignal = function (message) {\n        if (!this._signalHandlers[message.id]) {\n            return this._raiseError(\"invalid signal \" + message.id);\n        }\n        this._signalHandlers[message.id].forEach(function (handler) { return handler(message.payload); });\n    };\n    RpcProvider.prototype._handeRpc = function (message) {\n        var _this = this;\n        if (!this._rpcHandlers[message.id]) {\n            return this._raiseError(\"invalid rpc \" + message.id);\n        }\n        Promise.resolve(this._rpcHandlers[message.id](message.payload))\n            .then(function (result) { return _this._dispatch({\n            type: RpcProvider.MessageType.internal,\n            id: MSG_RESOLVE_TRANSACTION,\n            transactionId: message.transactionId,\n            payload: result\n        }); }, function (reason) { return _this._dispatch({\n            type: RpcProvider.MessageType.internal,\n            id: MSG_REJECT_TRANSACTION,\n            transactionId: message.transactionId,\n            payload: reason\n        }); });\n    };\n    RpcProvider.prototype._handleInternal = function (message) {\n        var transaction = typeof (message.transactionId) !== 'undefined' ? this._pendingTransactions[message.transactionId] : undefined;\n        switch (message.id) {\n            case MSG_RESOLVE_TRANSACTION:\n                if (!transaction || typeof (message.transactionId) === 'undefined') {\n                    return this._raiseError(\"no pending transaction with id \" + message.transactionId);\n                }\n                transaction.resolve(message.payload);\n                this._clearTransaction(this._pendingTransactions[message.transactionId]);\n                break;\n            case MSG_REJECT_TRANSACTION:\n                if (!transaction || typeof (message.transactionId) === 'undefined') {\n                    return this._raiseError(\"no pending transaction with id \" + message.transactionId);\n                }\n                this._pendingTransactions[message.transactionId].reject(message.payload);\n                this._clearTransaction(this._pendingTransactions[message.transactionId]);\n                break;\n            case MSG_ERROR:\n                this.error.dispatch(new Error(\"remote error: \" + message.payload));\n                break;\n            default:\n                this._raiseError(\"unhandled internal message \" + message.id);\n                break;\n        }\n    };\n    RpcProvider.prototype._transactionTimeout = function (transaction) {\n        transaction.reject('transaction timed out');\n        this._raiseError(\"transaction \" + transaction.id + \" timed out\");\n        delete this._pendingTransactions[transaction.id];\n        return;\n    };\n    RpcProvider.prototype._clearTransaction = function (transaction) {\n        if (typeof (transaction.timeoutHandle) !== 'undefined') {\n            clearTimeout(transaction.timeoutHandle);\n        }\n        delete this._pendingTransactions[transaction.id];\n    };\n    return RpcProvider;\n}());\n(function (RpcProvider) {\n    var MessageType;\n    (function (MessageType) {\n        MessageType[MessageType[\"signal\"] = 0] = \"signal\";\n        MessageType[MessageType[\"rpc\"] = 1] = \"rpc\";\n        MessageType[MessageType[\"internal\"] = 2] = \"internal\";\n    })(MessageType = RpcProvider.MessageType || (RpcProvider.MessageType = {}));\n    ;\n})(RpcProvider || (RpcProvider = {}));\nexports[\"default\"] = RpcProvider;\n\n\n//# sourceURL=webpack:///./node_modules/worker-rpc/lib/RpcProvider.js?");

/***/ }),

/***/ "./node_modules/worker-rpc/lib/index.js":
/*!**********************************************!*\
  !*** ./node_modules/worker-rpc/lib/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar RpcProvider_1 = __webpack_require__(/*! ./RpcProvider */ \"./node_modules/worker-rpc/lib/RpcProvider.js\");\nexports.RpcProvider = RpcProvider_1.default;\n\n\n//# sourceURL=webpack:///./node_modules/worker-rpc/lib/index.js?");

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
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
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/worker.ts");
/******/ 	
/******/ })()
;