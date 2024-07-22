const express = require('express');

const { Pool } = require('pg');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const pool = new Pool (
  {
    user: '',
    password: 'test123',
    host: 'localhost',
    database: 'courses_db'
  },
console.log('Connected to the employees_db database!')
)

pool.connect();

