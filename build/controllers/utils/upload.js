"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadFile = exports.uploadFile = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const fs_1 = require("fs");
const s3_1 = __importDefault(require("../../config/s3"));
const config_1 = require("../../config");
exports.upload = multer_1.default({ dest: '../../../uploads/' });
const uploadFile = (file) => {
    const fileStream = fs_1.createReadStream(file.path);
    return s3_1.default
        .upload({
        Bucket: config_1.bucketName,
        Body: fileStream,
        Key: `product-images/${file.fileName}`
    })
        .promise();
};
exports.uploadFile = uploadFile;
const downloadFile = (fileKey) => { };
exports.downloadFile = downloadFile;
