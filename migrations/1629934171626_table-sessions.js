/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(`
    CREATE TABLE sessions (
      sid VARCHAR NOT NULL COLLATE "default",
      sess JSON NOT NULL,
      expire TIMESTAMP WITH TIME ZONE NOT NULL
    )
    WITH (OIDS=FALSE);
    
    ALTER TABLE sessions ADD CONSTRAINT sessions_pkey PRIMARY KEY(sid) NOT DEFERRABLE INITIALLY IMMEDIATE;
    
    CREATE INDEX ON sessions(expire);
  `);
};

exports.down = pgm => {
  pgm.sql(`
    DROP TABLE sessions;
  `);
};
