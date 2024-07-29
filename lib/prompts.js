const inquirer = require("inquirer");
const pool = require('../db/db');  // Import the shared database module

class CLI {
  async run() {
    try {
      const answers = await inquirer.prompt({
        type: "list",
        name: "options",
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role'
        ],
        message: 'Please choose from the following',
      });
      await this.handleOption(answers.options);
      console.log("Operation completed");
      await this.run(); // Allow multiple operations
    } catch (err) {
      console.error("Oops. Something went wrong.", err);
    }
  }

  async handleOption(option) {
    switch (option) {
      case "View all departments":
        await this.viewDepts();
        break;
      case "View all roles":
        await this.viewRoles();
        break;
      case "View all employees":
        await this.viewEmployees();
        break;
      case "Add a department":
        await this.addDept();
        break;
      case "Add a role":
        await this.addRole();
        break;
      case "Add an employee":
        await this.addEmployee();
        break;
      case "Update an employee role":
        await this.updateEmployee();
        break;
      default:
        console.log("Invalid option");
    }
  }

  async viewDepts() {
    const result = await pool.query('SELECT * FROM department');
    console.table(result.rows);
  }

  async viewRoles() {
    const result = await pool.query('SELECT * FROM roles');
    console.table(result.rows);
  }

  async viewEmployees() {
    const result = await pool.query('SELECT * FROM employee_names');
    console.table(result.rows);
  }

  async addDept() {
    const { name } = await inquirer.prompt({
      type: 'input',
      name: 'name',
      message: 'Enter the department name:',
    });
    await pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
    console.log(`Department ${name} added.`);
  }

  async addRole() {
    const departments = (await pool.query('SELECT * FROM department')).rows;
    const { name, salary, departmentId } = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter the role name:',
      },
      {
        type: 'input',
        name: 'salary',
        message: 'Enter the role salary:',
      },
      {
        type: 'list',
        name: 'departmentId',
        message: 'Select the department for this role:',
        choices: departments.map(dept => ({
          name: dept.name,
          value: dept.id
        })),
      },
    ]);
    await pool.query('INSERT INTO roles (name, salary, department_id) VALUES ($1, $2, $3)', [name, salary, departmentId]);
    console.log(`Role ${name} added.`);
  }

  async addEmployee() {
    const roles = (await pool.query('SELECT * FROM roles')).rows;
    const { firstName, lastName, roleId, manager } = await inquirer.prompt([
      {
        type: 'input',
        name: 'firstName',
        message: 'Enter first name:',
      },
      {
        type: 'input',
        name: 'lastName',
        message: 'Enter last name:',
      },
      {
        type: 'list',
        name: 'roleId',
        message: 'Select the role for this employee:',
        choices: roles.map(role => ({
          name: role.name,
          value: role.id
        })),
      },
      {
        type: 'input',
        name: 'manager',
        message: `Enter employee's manager's name:`
      },
    ]);
    await pool.query('INSERT INTO employee_names (first_name, last_name, roles_id, employees_manager) VALUES ($1, $2, $3, $4)', [firstName, lastName, roleId, manager]);
    console.log(`Employee ${firstName} ${lastName} added.`);
  }

  async updateEmployee() {
    const employees = (await pool.query('SELECT * FROM employee_names')).rows;
    const roles = (await pool.query('SELECT * FROM roles')).rows;
    const { employeeId, newRoleId } = await inquirer.prompt([
      {
        type: 'list',
        name: 'employeeId',
        message: 'Select the employee to update:',
        choices: employees.map(emp => ({
          name: `${emp.first_name} ${emp.last_name}`,
          value: emp.id
        })),
      },
      {
        type: 'list',
        name: 'newRoleId',
        message: 'Select the new role for the employee:',
        choices: roles.map(role => ({
          name: role.name,
          value: role.id
        })),
      },
    ]);
    await pool.query('UPDATE employee_names SET roles_id = $1 WHERE id = $2', [newRoleId, employeeId]);
    console.log('Employee role updated.');
  }
}

module.exports = { CLI };