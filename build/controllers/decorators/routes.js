"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.del = exports.put = exports.patch = exports.post = exports.get = void 0;
require("reflect-metadata");
const Methods_1 = require("./Methods");
const MetadataKeys_1 = require("./MetadataKeys");
const routeBinder = (method) => {
    return (path) => {
        return (target, key, desc) => {
            if (!desc || !desc.value)
                return;
            Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.path, path, desc.value, key);
            Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.method, method, desc.value, key);
        };
    };
};
exports.get = routeBinder(Methods_1.Methods.get);
exports.post = routeBinder(Methods_1.Methods.post);
exports.patch = routeBinder(Methods_1.Methods.patch);
exports.put = routeBinder(Methods_1.Methods.put);
exports.del = routeBinder(Methods_1.Methods.del);
