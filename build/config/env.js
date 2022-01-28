"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.secretAccessKey = exports.accessKeyId = exports.region = exports.bucketName = exports.sessionSecret = exports.port = void 0;
exports.port = Number(process.env.API_PORT) || 3006;
exports.sessionSecret = process.env.SESSION_SECRET || 'supersecretsession';
exports.bucketName = process.env.AWS_BUCKET_NAME || 'bucket';
exports.region = process.env.AWS_BUCKET_REGION || 'region';
exports.accessKeyId = process.env.AWS_ACCESS_KEY || 'access_key';
exports.secretAccessKey = process.env.AWS_SECRET_KEY || 'secret_key';
