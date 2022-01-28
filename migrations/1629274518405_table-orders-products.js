/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(`
    CREATE TABLE orders_products (
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
      order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE RESTRICT
    );
  `);
};

exports.down = pgm => {
  pgm.sql(`
    DROP TABLE orders_products;
  `);
};
