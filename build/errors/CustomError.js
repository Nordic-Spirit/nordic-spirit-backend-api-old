"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError {
    constructor(message, name, sqlErrorCode) {
        this.message = message;
        this.name = name;
        this.sqlErrorCode = sqlErrorCode;
    }
    log() {
        // TODO In this method we will log errors to somewhere
        console.log({
            error: this
        });
    }
    get responseCode() {
        return this._responseCode || 422;
    }
    set responseCode(code) {
        this._responseCode = code;
    }
}
exports.CustomError = CustomError;
