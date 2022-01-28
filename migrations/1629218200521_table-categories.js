/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(`
    CREATE TABLE categories (
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      name VARCHAR(30) NOT NULL UNIQUE,
      description VARCHAR(240)
    );
  `);
};

exports.down = pgm => {
  pgm.sql(`
    DROP TABLE categories;
  `);
};
