/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(`
    CREATE TABLE used_coupon_codes (
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      coupon_code_id INTEGER NOT NULL REFERENCES coupon_codes(id) ON DELETE RESTRICT,
      user_id INTEGER REFERENCES users(id) ON DELETE SET NULL
    );
  `);
};

exports.down = pgm => {
  pgm.sql(`
    DROP TABLE used_coupon_codes;
  `);
};
