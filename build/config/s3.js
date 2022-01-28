"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s3_1 = __importDefault(require("aws-sdk/clients/s3"));
const env_1 = require("./env");
exports.default = new s3_1.default({
    region: env_1.region,
    accessKeyId: env_1.accessKeyId,
    secretAccessKey: env_1.secretAccessKey
});
