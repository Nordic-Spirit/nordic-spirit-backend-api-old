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
exports.BasketRepo = void 0;
const ModelRepo_1 = require("./ModelRepo");
class BasketRepo extends ModelRepo_1.ModelRepo {
    findCount(sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.query(`
      SELECT COUNT(*)::INTEGER
      FROM baskets
      WHERE session_sid = $1
    `, [sessionId]);
            return result[0];
        });
    }
    insert(sessionId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.query(`
      INSERT INTO
        baskets (session_sid, product_id)
      VALUES (
        $1,
        (
          SELECT id
          FROM products
          WHERE id = $2 AND on_sale = TRUE
        )
      ) RETURNING id;
      `, [sessionId, productId]);
            return result;
        });
    }
    findProductById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.query(`
      SELECT
        id AS product_id,
        name AS product_name,
        url AS product_url,
        price AS product_price
      FROM products
      WHERE id = $1;
      `, [productId]);
            return result[0];
        });
    }
    findBySessionId(sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.query(`
      SELECT DISTINCT
        p.id AS product_id,
        p.name AS product_name,
        p.url AS product_url,
        p.price AS product_price,
        (
          SELECT COUNT(*)::INTEGER
          FROM baskets
          WHERE
            session_sid = $1
            AND
            p.id = product_id
          GROUP BY session_sid
        ) AS product_count
      FROM baskets AS b
      JOIN products AS p ON p.id = b.product_id
      WHERE
        b.session_sid = $1
        AND
        p.on_sale = TRUE
        AND (
          SELECT expire
          FROM sessions
          WHERE sid = $1
        ) > CURRENT_TIMESTAMP;
    `, [sessionId]);
            return result;
        });
    }
}
exports.BasketRepo = BasketRepo;
