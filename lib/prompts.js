// view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

const inquirer = require("inquirer");


class CLI {
  run() {
    return inquirer
      .prompt(
        {
          type: "list",
          name: "options",
          choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
          message: 'Please choose from the following',
        },
      )
      .then((answers)=> {
        let option;
        switch(answers.option) {
          case "View all departments":
            option = viewDepartments();
            break;
          case "View all roles":
            option = viewRoles();
            break;
          case "View all employees":
            option = viewEmployees();
            break;
          case "Add a department":
            option = addDept();
            break;
          case "Add a role":
            option = addRole();
            break;
          case "Add an employee":
            option = addEmployee();
            break;
          case "Update an employee role":
            option = updateEmployee();
        }
          
      })
      .then(() => console.log("Started app"))
      .catch((err) => {
        console.log(err);
        console.log("Oops. Something went wrong.");
      });
  }
}


module.exports = {CLI};