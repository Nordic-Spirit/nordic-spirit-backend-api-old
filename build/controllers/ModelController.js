"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelController = void 0;
const repos_1 = require("../repos");
class ModelController {
}
exports.ModelController = ModelController;
ModelController.productRepo = new repos_1.ProductRepo();
ModelController.userRepo = new repos_1.UserRepo();
ModelController.campaignRepo = new repos_1.CampaignRepo();
ModelController.categoryRepo = new repos_1.CategoryRepo();
