/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(`
    CREATE TYPE ROLE AS ENUM ('standard', 'admin');

    CREATE TABLE employees (
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      first_name VARCHAR(30) NOT NULL,
      last_name VARCHAR(50) NOT NULL,
      phone VARCHAR(25) NOT NULL UNIQUE,
      email VARCHAR(100) NOT NULL UNIQUE,
      address VARCHAR(85),
      password_hash VARCHAR(150),
      password_salt VARCHAR(150),
      role ROLE NOT NULL
    );
  `);
};

exports.down = pgm => {
  pgm.sql(`
    DROP TABLE employees;
    DROP TYPE ROLE;
  `);
};
