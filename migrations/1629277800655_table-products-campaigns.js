/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(`
    CREATE TABLE products_campaigns (
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
      campaign_id INTEGER NOT NULL REFERENCES campaigns(id) ON DELETE RESTRICT
    );
  `);
};

exports.down = pgm => {
  pgm.sql(`
    DROP TABLE products_campaigns;
  `);
};
