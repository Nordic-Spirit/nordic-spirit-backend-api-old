"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = __importDefault(require("pg"));
class Pool {
    constructor() {
        this.pool = null;
    }
    connect(options) {
        this.pool = new pg_1.default.Pool(options);
        return this.pool.query('SELECT 1 + 1;');
    }
    close() {
        var _a;
        return (_a = this.pool) === null || _a === void 0 ? void 0 : _a.end;
    }
    query(sql, params = '') {
        var _a;
        return (_a = this.pool) === null || _a === void 0 ? void 0 : _a.query(sql, params);
    }
}
exports.pool = new Pool();
