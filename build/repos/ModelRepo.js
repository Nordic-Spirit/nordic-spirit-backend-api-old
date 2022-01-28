"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelRepo = void 0;
const pool_1 = __importDefault(require("../config/pool"));
const CustomError_1 = require("../errors/CustomError");
const errors_1 = require("../errors");
class ModelRepo {
    query(sql, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield pool_1.default.connect();
            const result = client
                .query(sql, params)
                .then(({ rows }) => {
                return this.toCamelCase(rows);
            })
                .catch(err => {
                throw new CustomError_1.CustomError(err.message, errors_1.ErrorNames.databaseError, err.code);
            })
                .finally(() => {
                client.release();
            });
            return result;
        });
    }
    toCamelCase(rows) {
        return rows.map((row) => {
            const replaced = {};
            for (let key in row) {
                const camelCase = key.replace(/([-_][a-z])/gi, $1 => {
                    return $1.toUpperCase().replace('_', '');
                });
                replaced[camelCase] = row[key];
            }
            return replaced;
        });
    }
}
exports.ModelRepo = ModelRepo;
