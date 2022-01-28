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
var ProductController_1;
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("./decorators");
const repos_1 = require("../repos");
const CustomError_1 = require("../errors/CustomError");
const CampaignRepo_1 = require("../repos/CampaignRepo");
const errors_1 = require("../errors");
const upload_1 = require("./utils/upload");
let ProductController = ProductController_1 = class ProductController {
    // TODO - KESKEN
    getProducts(req, res) {
        const userId = req.body.userId || null;
        ProductController_1.productRepo
            .find()
            .then(result => {
            res.status(200).send({
                data: {
                    result
                }
            });
        })
            .catch(error => {
            const { name, message, sqlErrorCode } = error;
            res
                .status(errors_1.ErrorResponseCodes._422)
                .send({ name, message, sqlErrorCode });
        });
    }
    addProduct(req, res) {
        const productDetails = req.body;
    }
    getByProductId(req, res) {
        const productId = Number(req.params.id);
        const userId = req.body.userId || null;
        if (isNaN(productId)) {
            res
                .status(errors_1.ErrorResponseCodes._422)
                .send(new CustomError_1.CustomError('Cant handle characters in product productId', errors_1.ErrorNames.typeError));
            return;
        }
        Promise.all([
            ProductController_1.productRepo.findById(productId, userId),
            ProductController_1.campaignRepo.findDiscountByProductId(productId)
        ])
            .then(result => {
            const [_product, discount] = result;
            const product = ProductController_1.addDiscountRow(_product, discount)[0];
            if (!product) {
                const error = new CustomError_1.CustomError('Cannot find product', errors_1.ErrorNames.notFound);
                error.responseCode = errors_1.ErrorResponseCodes._404;
                throw error;
            }
            res.status(200).send({
                data: {
                    product
                }
            });
        })
            .catch(error => {
            const { name, message, responseCode } = error;
            res.status(error.responseCode).send({
                error: {
                    name,
                    message,
                    responseCode
                }
            });
        });
    }
    getLatest(req, res) {
        const userId = req.body.userId || null;
        Promise.all([
            ProductController_1.productRepo.findLatest(userId),
            ProductController_1.campaignRepo.findDiscounts()
        ])
            .then(result => {
            const [_products, discounts] = result;
            const products = ProductController_1.addDiscountRow(_products, discounts);
            res.status(200).send({
                data: {
                    products
                }
            });
        })
            .catch(error => {
            const { name, message, sqlErrorCode } = error;
            res
                .status(errors_1.ErrorResponseCodes._422)
                .send({ name, message, sqlErrorCode });
        });
    }
    getMostPopulars(req, res) {
        const userId = req.body.userId || null;
        Promise.all([
            ProductController_1.productRepo.findMostPopulars(userId),
            ProductController_1.campaignRepo.findDiscounts()
        ])
            .then(result => {
            const [_products, discounts] = result;
            const products = ProductController_1.addDiscountRow(_products, discounts);
            res.status(200).send({
                data: {
                    products
                }
            });
        })
            .catch(error => {
            const { name, message, sqlErrorCode } = error;
            res
                .status(errors_1.ErrorResponseCodes._422)
                .send({ name, message, sqlErrorCode });
        });
    }
    getBestRatings(req, res) {
        const userId = req.body.userId || null;
        Promise.all([
            ProductController_1.productRepo.findBestRatings(userId),
            ProductController_1.campaignRepo.findDiscounts()
        ])
            .then(result => {
            const [_products, discounts] = result;
            const products = ProductController_1.addDiscountRow(_products, discounts);
            res.status(200).send({
                data: {
                    products
                }
            });
        })
            .catch(error => {
            res.status(422).send({ error });
        });
    }
    getByCampaignId(req, res) {
        const userId = req.body.userId || null;
        const campaignId = req.body.campaignId;
        Promise.all([
            ProductController_1.productRepo.findByCampaignId(campaignId, userId),
            ProductController_1.campaignRepo.findDiscounts()
        ])
            .then(result => {
            const [_products, discounts] = result;
            const products = ProductController_1.addDiscountRow(_products, discounts);
            res.status(200).send({
                data: {
                    products
                }
            });
        })
            .catch(error => {
            res.status(422).send({ error });
        });
    }
    static addDiscountRow(products, discounts) {
        return products.map((product) => {
            discounts.forEach((discount) => {
                if (product.productId === discount.productId) {
                    product['discountPercentage'] = discount.discountPercentage;
                    return;
                }
            });
            return product;
        });
    }
};
ProductController.productRepo = new repos_1.ProductRepo();
ProductController.campaignRepo = new CampaignRepo_1.CampaignRepo();
__decorate([
    decorators_1.get('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getProducts", null);
__decorate([
    decorators_1.bodyValidator('name', 'description', 'price', 'alcohol', 'capacity', 'manufacturer', 'countryOfManufacturer', 'categorieId', 'subCategorieId', 'image'),
    decorators_1.use(upload_1.upload.single('image')),
    decorators_1.post('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "addProduct", null);
__decorate([
    decorators_1.get('/single/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getByProductId", null);
__decorate([
    decorators_1.get('/latest'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getLatest", null);
__decorate([
    decorators_1.get('/mostpopulars'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getMostPopulars", null);
__decorate([
    decorators_1.get('/bestratings'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getBestRatings", null);
__decorate([
    decorators_1.bodyValidator('campaignId'),
    decorators_1.get('/bycampaignid'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getByCampaignId", null);
ProductController = ProductController_1 = __decorate([
    decorators_1.controller('/products')
], ProductController);
