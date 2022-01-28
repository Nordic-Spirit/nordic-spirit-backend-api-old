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
var CategoryController_1;
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("./decorators");
const repos_1 = require("../repos");
let CategoryController = CategoryController_1 = class CategoryController {
    // TODO - KESKEN
    getCategories(req, res) {
        Promise.all([
            CategoryController_1.categoryRepo.findCategories(),
            CategoryController_1.categoryRepo.findSubCategories()
        ])
            .then(result => {
            const [categories, subCategories] = result;
            const combinedCategories = CategoryController_1.combineCategories(categories, subCategories);
            res.status(200).send({
                data: {
                    combinedCategories
                }
            });
        })
            .catch(error => {
            // TODO - ERROR HANDLINGIIN PAREMMAN VASTAUKSEN LÄHETTÄMINEN CLIENTILLE
            if (error.sqlErrorCode) {
                res.status(422).send(error);
                return;
            }
            res.status(422).send(error);
        });
    }
    static combineCategories(categories, subCategories) {
        return categories.map(({ categoryId, categoryName }) => {
            return {
                categoryId,
                categoryName,
                subCategories: subCategories.flatMap(({ subCategoryId, subCategoryName, subCategoryCategoryId }) => {
                    if (categoryId !== subCategoryCategoryId)
                        return [];
                    return {
                        subCategoryId,
                        subCategoryName,
                        subCategoryCategoryId
                    };
                })
            };
        });
    }
};
CategoryController.categoryRepo = new repos_1.CategoryRepo();
__decorate([
    decorators_1.get('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "getCategories", null);
CategoryController = CategoryController_1 = __decorate([
    decorators_1.controller('/categories')
], CategoryController);
