"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyValidator = void 0;
require("reflect-metadata");
const MetadataKeys_1 = require("./MetadataKeys");
const bodyValidator = (...keys) => {
    return (target, key, desc) => {
        if (!desc.value)
            return;
        Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.validator, keys, desc.value, key);
    };
};
exports.bodyValidator = bodyValidator;
