/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(`
    CREATE TABLE coupon_codes (
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      code VARCHAR(40) NOT NULL,
      description VARCHAR(240),
      discount_percentage INTEGER NOT NULL,
      expiry_date TIMESTAMP WITH TIME ZONE NOT NULL
    );

    CREATE INDEX ON coupon_codes(expiry_date);
  `);
};

exports.down = pgm => {
  pgm.sql(`
    DROP TABLE coupon_codes;
  `);
};
