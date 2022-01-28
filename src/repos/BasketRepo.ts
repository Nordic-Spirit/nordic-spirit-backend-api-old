import { ModelRepo } from './ModelRepo';
import { ProductCardProps, BasketProductProps } from '../interfaces';

export class BasketRepo extends ModelRepo {
  async findCount(sessionId: string): Promise<number> {
    const result = await this.query<number>(
      `
      SELECT COUNT(*)::INTEGER
      FROM baskets
      WHERE session_sid = $1
    `,
      [sessionId]
    );

    return result[0];
  }

  async insert(sessionId: string, productId: number): Promise<number[]> {
    const result = await this.query<number>(
      `
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
      `,
      [sessionId, productId]
    );

    return result;
  }

  async findProductById(productId: number): Promise<BasketProductProps> {
    const result = await this.query<BasketProductProps>(
      `
      SELECT
        id AS product_id,
        name AS product_name,
        url AS product_url,
        price AS product_price
      FROM products
      WHERE id = $1;
      `,
      [productId]
    );

    return result[0];
  }

  async findBySessionId(sessionId: string): Promise<ProductCardProps[]> {
    const result = await this.query<ProductCardProps>(
      `
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
    `,
      [sessionId]
    );

    return result;
  }
}
