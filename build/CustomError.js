"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError {
    constructor(message, name, statusCode) {
        this.message = message;
        this.name = name;
        this.statusCode = statusCode;
    }
}
exports.CustomError = CustomError;
