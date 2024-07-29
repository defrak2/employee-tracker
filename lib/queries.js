const { Pool } = require('pg')

const pool = new Pool({
  user: ''
})

class Database {
async query (sql, params = []) {
  const client = await pool.connect()
  try {
    const result = await client.query(sql, params)
    return result
  } catch (err) {
  console.error (err)  
  throw err;
  }
  finally {
    client.release();
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

async addDept(name) {
  return this.query('INSERT INTO department (name) VALUES ($1)', [name])
}

async addRole(name, salary, departmentId) {
  return this.query('INSERT INTO roles (name, salary, department_id) VALUES ($1, $2, $3)', [name, salary, departmentId]);
}

async addEmployee(firstName, lastName, roleId, manager) {
  return this.query('INSERT INTO employee_names (first_name, last_name, roles_id, employees_manager) VALUES ($1, $2, $3, $4)', [firstName, lastName, roleId, manager]);
}

async updateEmployee(employeeId, newRoleId) {
  return this.query('UPDATE employee_names SET roles_id = $1 WHERE id = $2', [newRoleId, employeeId]);
}
}


module.exports = { Database }