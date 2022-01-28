import { ModelRepo } from './ModelRepo';
import { ProductProps, ProductCardProps } from '../interfaces/Products';
import { resourceLimits } from 'worker_threads';

export class ProductRepo extends ModelRepo {
  // TODO KESKEN
  async find(): Promise<ProductProps[]> {
    const result = await this.query<ProductProps>(`
      SELECT *
      FROM products
      ORDER BY created_at DESC
      LIMIT 20
    `);

    return result;
  }

  // TODO KESKEN
  async findById(
    productId: number,
    userId: number | null
  ): Promise<ProductProps[]> {
    const result = await this.query<ProductProps>(
      `
      SELECT
        p.id AS product_id,
        p.name AS product_name,
        p.url AS product_url,
        p.description AS product_description,
        p.price AS product_price,
        p.alcohol,
        p.capacity,
        p.manufacturer,
        p.country_of_manufacturer,
        c.id AS category_id,
        c.name AS category_name,
        sc.id AS sub_category_id,
        sc.name AS sub_category_name,
        r.product_rating_count,
        r.product_rating_avg,
        (
          SELECT COUNT(*)::INTEGER
          FROM products_in_storages AS pis
          WHERE pis.product_id = p.id
        ) AS products_in_storage,
        EXISTS (
          SELECT TRUE
          FROM favorites
          WHERE user_id = $2 AND product_id = p.id
        ) AS is_favorite
      FROM products AS p
      JOIN categories AS c ON c.id = p.category_id
      LEFT JOIN sub_categories AS sc ON sc.id = p.sub_category_id
	    LEFT JOIN (
        SELECT
          product_id,
          COUNT(*)::INTEGER AS product_rating_count,
          ROUND(AVG(stars), 1)::DOUBLE PRECISION AS product_rating_avg
          FROM ratings
          WHERE product_id = $1
          GROUP BY product_id
        ) AS r
      ON r.product_id = p.id
      WHERE p.id = $1 AND p.on_sale = TRUE;
    `,
      [productId, userId]
    );

    return result;
  }

  async findLatest(userId: number | null): Promise<ProductCardProps[]> {
    const result = await this.query<ProductCardProps>(
      `
      SELECT
        p.id AS product_id,
        p.name AS product_name,
        p.url AS product_url,
        p.price AS product_price,
        c.id AS category_id,
        c.name AS category_name,
        r.product_rating_avg,
        r.product_rating_count,
        EXISTS (
          SELECT TRUE
          FROM favorites
          WHERE user_id = $1 AND product_id = p.id
        ) AS is_favorite,
        (
          SELECT COUNT(*)::INTEGER
          FROM products_in_storages AS pis
          WHERE pis.product_id = p.id
        ) AS products_in_storage
      FROM products AS p
      JOIN categories AS c ON c.id = p.category_id
      LEFT JOIN (
        SELECT
          product_id,
          COUNT(*)::INTEGER AS product_rating_count,
          ROUND(AVG(stars), 1)::DOUBLE PRECISION AS product_rating_avg
        FROM ratings
        GROUP BY product_id
      ) AS r
      ON r.product_id = p.id
      WHERE p.on_sale = TRUE
      ORDER BY p.created_at DESC
      LIMIT 10;
    `,
      [userId]
    );

    return result;
  }

  async findMostPopulars(userId: number | null): Promise<ProductCardProps[]> {
    const result = await this.query<ProductCardProps>(
      `
      SELECT
        p.id AS product_id,
        p.name AS product_name,
        p.url AS product_url,
        p.price AS product_price,
        c.id AS category_id,
        c.name AS category_name,
        r.product_rating_avg,
        r.product_rating_count,
        EXISTS (
          SELECT TRUE
          FROM favorites
          WHERE user_id = $1 AND product_id = p.id
        ) AS is_favorite,
        (
          SELECT COUNT(*)::INTEGER
          FROM products_in_storages
          WHERE products_in_storages.product_id = p.id
        ) AS products_in_storage
      FROM products AS p
      JOIN categories AS c ON c.id = p.category_id
      JOIN (
        SELECT
          orders_products.product_id,
          COUNT(*) AS products_sold
        FROM orders_products
        WHERE EXTRACT(DAY FROM CURRENT_TIMESTAMP - orders_products.created_at) < 60
        GROUP BY product_id
      ) AS op
      ON op.product_id = p.id
      LEFT JOIN (
        SELECT
          product_id,
          COUNT(*)::INTEGER AS product_rating_count,
          ROUND(AVG(stars), 1)::DOUBLE PRECISION AS product_rating_avg
        FROM ratings
        GROUP BY product_id
      ) AS r
      ON r.product_id = p.id
      ORDER BY op.products_sold DESC
      LIMIT 10;
    `,
      [userId]
    );

    return result;
  }

  async findBestRatings(userId: number | null): Promise<ProductCardProps[]> {
    const result = await this.query<ProductCardProps>(
      `
      SELECT
        p.id AS product_id,
        p.name AS product_name,
        p.url AS product_url,
        p.price AS product_price,
        c.id AS category_id,
        c.name AS category_name,
        r.product_rating_avg,
        r.product_rating_count,
        EXISTS (
          SELECT TRUE
          FROM favorites
          WHERE user_id = $1 AND product_id = p.id
        ) AS is_favorite,
        (
          SELECT COUNT(*)::INTEGER
          FROM products_in_storages
          WHERE products_in_storages.product_id = p.id
        ) AS products_in_storage
      FROM products AS p
      JOIN categories AS c ON c.id = p.category_id
      JOIN (
        SELECT
          product_id,
          COUNT(*)::INTEGER AS product_rating_count,
          ROUND(AVG(stars), 1)::DOUBLE PRECISION AS product_rating_avg
        FROM ratings
        GROUP BY product_id
      ) AS r
      ON r.product_id = p.id
      WHERE p.on_sale = TRUE
      ORDER BY r.product_rating_avg DESC
      LIMIT 10;
    `,
      [userId]
    );

    return result;
  }

  async findByCampaignId(
    campaignId: number,
    userId: number | null
  ): Promise<ProductCardProps[]> {
    const result = await this.query<ProductCardProps>(
      `
      SELECT
        p.id AS product_id,
        p.name AS product_name,
        p.url AS product_url,
        p.price AS product_price,
        c.id AS category_id,
        c.name AS category_name,
        EXISTS (
          SELECT TRUE
          FROM favorites
          WHERE user_id = $2 AND product_id = p.id
        ) AS is_favorite,
        (
          SELECT COUNT(*)::INTEGER
          FROM products_in_storages
          WHERE products_in_storages.product_id = p.id
        ) AS products_in_storage
      FROM products AS p
      JOIN products_campaigns AS pc ON pc.product_id = p.id
      JOIN categories AS c ON c.id = p.category_id
      LEFT JOIN (
        SELECT
          product_id,
          COUNT(*)::INTEGER AS product_rating_count,
          ROUND(AVG(stars), 1)::DOUBLE PRECISION AS product_rating_avg
        FROM ratings
        GROUP BY product_id
      ) AS r
      ON r.product_id = p.id
      WHERE pc.campaign_id = $1
      ORDER BY p.created_at DESC;
    `,
      [campaignId, userId]
    );

    return result;
  }
}
