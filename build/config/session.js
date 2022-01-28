"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionConfig = void 0;
const express_session_1 = __importDefault(require("express-session"));
const connect_pg_simple_1 = __importDefault(require("connect-pg-simple"));
const pool_1 = __importDefault(require("./pool"));
const _1 = require("./");
const pgSession = connect_pg_simple_1.default(express_session_1.default);
exports.sessionConfig = {
    store: new pgSession({
        pool: pool_1.default,
        tableName: 'sessions'
    }),
    saveUninitialized: true,
    secret: _1.sessionSecret,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 2 // 2 hours
    }
};
