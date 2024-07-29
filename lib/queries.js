const pool = require('./prompts')

class Database {
async query (sql, params = []) {
  const client = await pool.connect()
  try {
    const result = await client.query(sql, params)
    return result
  } catch (err) {
  console.error (err)  
  }
  finally {
    client.release
  }
}

viewDepts() {
  return this.query('SELECT * FROM department')
}
viewEmployees() {
  return this.query('SELECT * FROM employee_name')
}
viewRoles() {
  return this.query('SELECT * FROM roles')
}
}

//function of queries

//export to index.js

module.exports = { Database }