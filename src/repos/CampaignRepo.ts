import { ModelRepo } from './ModelRepo';
import {
  ProductDiscount,
  CampaignProps,
  ProductCampaignIds
} from '../interfaces';

export class CampaignRepo extends ModelRepo {
  async find(): Promise<CampaignProps[]> {
    const result = await this.query<CampaignProps>(`

    `);

    return result;
  }

  async findLatest(): Promise<CampaignProps[]> {
    const result = this.query<CampaignProps>(`
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
  }

  async findLatestProductIds(): Promise<ProductCampaignIds[]> {
    const result = await this.query<ProductCampaignIds>(`
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
  }

  async findDiscounts(): Promise<ProductDiscount[]> {
    const result = await this.query<ProductDiscount>(`
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
  }

  async findDiscountByProductId(id: number): Promise<ProductDiscount[]> {
    const result = await this.query<ProductDiscount>(
      `
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
    `,
      [id]
    );

    return result;
  }
}
