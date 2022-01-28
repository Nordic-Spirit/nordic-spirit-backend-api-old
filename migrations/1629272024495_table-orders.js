/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(`
    CREATE TYPE DELIVERY_STATUS as ENUM ('processing', 'cancelled', 'shipped', 'delivered', 'returned');

    CREATE TABLE orders (
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      paid BOOLEAN NOT NULL DEFAULT FALSE,
      delivery_status DELIVERY_STATUS NOT NULL,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
      employee_id INTEGER REFERENCES employees(id) ON DELETE RESTRICT
    );
  `);
};

exports.down = pgm => {
  pgm.sql(`
    DROP TABLE orders;
    DROP TYPE DELIVERY_STATUS;
  `);
};
