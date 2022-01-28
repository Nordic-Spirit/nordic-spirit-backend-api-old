"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
require("reflect-metadata");
const AppRouter_1 = require("../../AppRouter");
const MetadataKeys_1 = require("./MetadataKeys");
const bodyValidators = (keys) => {
    return (req, res, next) => {
        if (!req.body) {
            res.status(422).send('Invalid request');
            return;
        }
        for (let key of keys) {
            if (!req.body[key]) {
                res.status(422).send(`Missing property ${key}`);
                return;
            }
        }
        next();
    };
};
const controller = (routePrefix) => {
    return (target) => {
        const router = AppRouter_1.AppRouter.getInstance();
        const prototypes = Object.getOwnPropertyNames(target.prototype).filter(name => name !== 'constructor');
        for (let key of prototypes) {
            const routeHandler = target.prototype[key];
            const path = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.path, target.prototype[key], key);
            const method = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.method, target.prototype[key], key);
            const middlewares = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.middleware, target.prototype[key], key) || [];
            const requiredBodyProps = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.validator, target.prototype[key], key) || [];
            const validator = bodyValidators(requiredBodyProps);
            if (path) {
                router[method](`${routePrefix}${path}`, ...middlewares, validator, routeHandler);
            }
        }
    };
};
exports.controller = controller;
