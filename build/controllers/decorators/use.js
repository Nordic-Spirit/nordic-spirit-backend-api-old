"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.use = void 0;
require("reflect-metadata");
const MetadataKeys_1 = require("./MetadataKeys");
function use(middleware) {
    return function (target, key, desc) {
        if (!desc.value)
            return;
        const middlewares = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.middleware, desc.value, key) || [];
        Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.middleware, [...middlewares, middleware], desc.value, key);
    };
}
exports.use = use;
