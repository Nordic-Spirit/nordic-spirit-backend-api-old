"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var BasketController_1;
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("./decorators");
const repos_1 = require("../repos");
const errors_1 = require("../errors");
let BasketController = BasketController_1 = class BasketController {
    getCount(req, res) {
        const sessionId = req.session.id;
        BasketController_1.basketRepo
            .findCount(sessionId)
            .then(result => {
            res.status(200).send({
                data: {
                    count: result
                }
            });
        })
            .catch(error => {
            res.status(422).send({
                error
            });
        });
    }
    getBasket(req, res) {
        const sessionId = req.session.id;
        BasketController_1.basketRepo
            .findBySessionId(sessionId)
            .then(result => {
            res.status(200).send({
                data: {
                    products: result
                }
            });
        })
            .catch(error => {
            res.status(422).send({ error });
        });
    }
    addProduct(req, res) {
        const productId = req.body.productId;
        const sessionId = req.session.id;
        Promise.all([
            BasketController_1.basketRepo.insert(sessionId, productId),
            BasketController_1.basketRepo.findProductById(productId)
        ])
            .then(result => {
            const [id, product] = result;
            res.status(200).send({
                data: {
                    product
                }
            });
        })
            .catch(error => {
            if (error.sqlErrorCode === '23502') {
                res.status(422).send({
                    error: {
                        name: errors_1.ErrorNames.notFound,
                        message: "Can't find product with that id"
                    }
                });
                return;
            }
            res.status(422).send({ error });
        });
    }
};
BasketController.basketRepo = new repos_1.BasketRepo();
BasketController.productRepo = new repos_1.ProductRepo();
__decorate([
    decorators_1.get('/count'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], BasketController.prototype, "getCount", null);
__decorate([
    decorators_1.get('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], BasketController.prototype, "getBasket", null);
__decorate([
    decorators_1.bodyValidator('productId'),
    decorators_1.post('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], BasketController.prototype, "addProduct", null);
BasketController = BasketController_1 = __decorate([
    decorators_1.controller('/basket')
], BasketController);
