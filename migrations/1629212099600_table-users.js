/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      first_name VARCHAR(30),
      last_name VARCHAR(50),
      phone VARCHAR(25) UNIQUE,
      email VARCHAR(100) NOT NULL UNIQUE,
      password_hash VARCHAR(150) NOT NULL,
      password_salt VARCHAR(150) NOT NULL,
      country VARCHAR(50),
      address VARCHAR(85),
      postal_code VARCHAR(12),
      city VARCHAR(85)
    );
  `);
};

exports.down = pgm => {
  pgm.sql(`
    DROP TABLE users;
  `);
};
