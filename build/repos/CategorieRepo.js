"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRepo = void 0;
const ModelRepo_1 = require("./ModelRepo");
class CategoryRepo extends ModelRepo_1.ModelRepo {
    findCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.query(`
      SELECT
        id AS category_id,
        name As category_name
      FROM categories;
    `);
            return result;
        });
    }
    findSubCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.query(`
      SELECT
        id AS sub_category_id,
        name AS sub_category_name,
        category_id AS sub_category_category_id
      FROM sub_categories;
    `);
            return result;
        });
    }
}
exports.CategoryRepo = CategoryRepo;
