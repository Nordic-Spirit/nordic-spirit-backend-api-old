/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(`
    CREATE TABLE baskets (
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      session_sid VARCHAR NOT NULL REFERENCES sessions(sid) ON DELETE CASCADE,
      product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE RESTRICT
    );
  `);
};

exports.down = pgm => {
  pgm.sql(`
    DROP TABLE baskets;
  `);
};
