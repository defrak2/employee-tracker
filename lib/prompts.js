// view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

const inquirer = require("inquirer");
const db = require('./queries')

class CLI {
  async run() {
    try {
      const answers = await inquirer.prompt({
        type: "list",
        name: "options",
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
        message: 'Please choose from the following',
      });
      await this.handleOption(answers.options);
      console.log("Operation completed");
      await this.run();
    } catch (err) {
      console.error("Oops. Something went wrong.", err);
    }
  }
    async handleOption(option) {
      switch(option) {
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
              console.log("Invalid option")
      }
    }
    async viewDepts() {
      const { rows } = await db.viewDepts();
      console.table(rows);
    }
    async viewRoles() {
      const { rows } = await db.viewRoles();
      console.table(rows);
    }
    async viewEmployees() {
      const { rows } = await db.viewEmployees();
      console.table(rows);
    }
    async addDept() {
      const { name } = await inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'Enter the department name:',
      });
      await db.addDept(name);
      console.log('Deparment ${name} added.')
    }
    async addRole() {
      const departments = (await db.viewDepts()).rows;
      const { name, salary, departmentId} = await inquirer.prompt([
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
          message: 'Select the deparment for this role:',
          choices: departments.map(dept => ({
            name: dept.name,
            value: dept.id
          }))
        },
      ]);
      await db.addRole(name, salary, departmentId);
      console.log(`Role ${name} added.`);
    }

    // first_name, last_name, roles_id, employees_manager


    async addEmployee() {
      const employee = (await db.viewEmployees()).rows;
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
          choices: departments.map(role => ({
            name: roles.name,
            value: role.id
          }))
        },
        {
          type: 'input',
          name: 'manager',
          message: `Enter employee's manager's name:`
        },
      ]);
      await db.addEmployee(firstName, lastName, roleId, manager);
      console.log(`Employee ${firstName} ${lastName} added`);
    }

    async updateEmployee() {
      const employees = (await db.viewEmployees()).rows;
      const roles = (await db.viewRoles()).rows;
      const { employeeId, newRoleId } = await inquirer.prompt([
        {
          type: 'list', 
          name: 'employeeId',
          message: 'Select the employee to update:',
          choices: employees.map( emp => ({
            name: `${emp.first_name} ${emp.last_name}`,
            value: emp.id
          }))
        },
        {
          type: 'list',
          name: 'newRoleId',
          message: 'Select the new role for the employee',
          choices: roles.map(role => ({
            name: role.name,
            value: role.id
          }))
        }
      ]);
      await db.updateEmployeeRole(employeeId, newRoleId);
      console.log('Employee role updated.')
    }

}


module.exports = {CLI};