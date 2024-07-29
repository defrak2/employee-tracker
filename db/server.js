const express = require('express');

const { Pool } = require('pg');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const pool = new Pool (
  {
    user: 'postgres',
    password: 'test123',
    host: 'localhost',
    database: 'courses_db'
  },
console.log('Connected to the employees_db database!')
)

pool.connect();

pool.query('INSERT INTO empoloyee_names', function( err, {rows}){
  console.log(rows);
});

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});