"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionSecret = exports.port = void 0;
exports.port = Number(process.env.API_PORT) || 3006;
exports.sessionSecret = process.env.SESSION_SECRET || 'supersecretsession';
