const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: 'test123',
  host: 'localhost',
  database: 'employees_db',
  port: 5432,
});

pool.on('connect', () => {
  console.log('Connected to the employees_db database!');
});

module.exports = pool;