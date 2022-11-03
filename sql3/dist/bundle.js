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

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (() => {

eval("const MAX_RESULTS = 1000;\nconst LOADING_STRING = \"loading dictionary...\";\nconst DICTIONARY_PATH = \"./466kDictionary.txt\";\nconst NO_RESULTS_STRING = \"no results\";\nasync function init() {\n    let predicate = RegExp.prototype.test.bind(new RegExp(decodeURIComponent(document.location.search).substring(1)));\n    document.write(LOADING_STRING);\n    let results = (await (await fetch(DICTIONARY_PATH)).text())\n        .split(\"\\n\")\n        .filter(predicate)\n        .slice(0, MAX_RESULTS);\n    document.write(results.join(\"<br>\") || NO_RESULTS_STRING);\n}\ninit();\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.ts"]();
/******/ 	
/******/ })()
;