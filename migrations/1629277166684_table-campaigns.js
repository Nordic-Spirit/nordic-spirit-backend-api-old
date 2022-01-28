/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(`
    CREATE TABLE campaigns (
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      name VARCHAR(60) NOT NULL,
      description VARCHAR(240) NOT NULL,
      url_image VARCHAR(200) NOT NULL,
      starts_at TIMESTAMP WITH TIME ZONE NOT NULL,
      ends_at TIMESTAMP WITH TIME ZONE NOT NULL,
      discount_percentage INTEGER NOT NULL CHECK(discount_percentage < 90 AND discount_percentage > 0),
      CHECK(ends_at > starts_at)
    );
    
    CREATE INDEX ON campaigns(ends_at);
  `);
};

exports.down = pgm => {
  pgm.sql(`
    DROP TABLE campaigns;
  `);
};
