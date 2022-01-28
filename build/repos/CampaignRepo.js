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
exports.CampaignRepo = void 0;
const ModelRepo_1 = require("./ModelRepo");
class CampaignRepo extends ModelRepo_1.ModelRepo {
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.query(`

    `);
            return result;
        });
    }
    findLatest() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = this.query(`
      SELECT
        c.id AS campaign_id,
        c.name AS campaign_name,
        c.ends_at AS campaign_ends_at,
        c.url_image AS campaign_url_image,
        discount_percentage AS campaign_discount_percentage,
        (
          SELECT COUNT(product_id)::INTEGER
          FROM products_campaigns
          WHERE campaign_id = c.id
        ) AS product_count_in_campaign
      FROM campaigns AS c
      WHERE
        c.ends_at > CURRENT_TIMESTAMP
        AND
        c.starts_at < CURRENT_TIMESTAMP
      ORDER BY starts_at
      LIMIT 2;
    `);
            return result;
        });
    }
    findLatestProductIds() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.query(`
      SELECT
        product_id,
        campaign_id
      FROM products_campaigns AS pc
      WHERE pc.campaign_id IN (
          SELECT id
          FROM campaigns AS c
          WHERE
            c.ends_at > CURRENT_TIMESTAMP
            AND
            c.starts_at < CURRENT_TIMESTAMP
          ORDER BY starts_at
          LIMIT 2
      );
    `);
            return result;
        });
    }
    findDiscounts() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.query(`
      SELECT
        pc.product_id,
        c.discount_percentage
      FROM campaigns AS c
      JOIN products_campaigns AS pc ON pc.campaign_id = c.id
      WHERE
        c.ends_at > CURRENT_TIMESTAMP
        AND
        c.starts_at < CURRENT_TIMESTAMP;
    `);
            return result;
        });
    }
    findDiscountByProductId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.query(`
      SELECT
        pc.product_id,
        c.discount_percentage
      FROM campaigns AS c
      JOIN products_campaigns AS pc ON pc.campaign_id = c.id
      WHERE
        c.ends_at > CURRENT_TIMESTAMP
        AND
        c.starts_at < CURRENT_TIMESTAMP
        AND
        pc.product_id = $1
      ORDER BY c.discount_percentage DESC
      LIMIT 1;
    `, [id]);
            return result;
        });
    }
}
exports.CampaignRepo = CampaignRepo;
