"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorResponseCodes = exports.ErrorNames = void 0;
var ErrorNames;
(function (ErrorNames) {
    ErrorNames["databaseError"] = "Database Error";
    ErrorNames["typeError"] = "Type Error";
    ErrorNames["notFound"] = "Item cannot be found";
})(ErrorNames = exports.ErrorNames || (exports.ErrorNames = {}));
var ErrorResponseCodes;
(function (ErrorResponseCodes) {
    ErrorResponseCodes[ErrorResponseCodes["_204"] = 204] = "_204";
    ErrorResponseCodes[ErrorResponseCodes["_404"] = 404] = "_404";
    ErrorResponseCodes[ErrorResponseCodes["_422"] = 422] = "_422";
})(ErrorResponseCodes = exports.ErrorResponseCodes || (exports.ErrorResponseCodes = {}));
