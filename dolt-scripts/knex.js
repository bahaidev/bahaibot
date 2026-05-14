// eslint-disable-next-line @stylistic/max-len -- Long
// eslint-disable-next-line n/no-unpublished-import -- Only for initial population
import knex from 'knex';
// eslint-disable-next-line @stylistic/max-len -- Long
// eslint-disable-next-line n/no-unpublished-import -- Only for initial population
import cfg from '../settings.json' with {type: 'json'};

const poolConfig = {min: 0, max: 7};

const config = {
  host: cfg.development.DB_HOST,
  port: cfg.development.DB_PORT,
  user: cfg.development.DB_USER,
  password: cfg.development.DB_PASSWORD,
  database: cfg.development.DB_NAME
};

export const db = knex({
  client: 'mysql2',
  connection: config,
  pool: poolConfig
});
