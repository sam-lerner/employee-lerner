// Dependencies
const inquirer = require('inquirer');
const mysql = require('mysql2');
const ascii = require('asciiart-logo');

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'rootroot',
        database: 'employee_lerner_db'
    },
    console.log(`Connected to the employee_lerner_db database.`)
);


// Create the inquirer prompt
function prompt() {
    inquirer.prompt(
        {
            name: "main",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View All Departments",
                "View All Roles",
                "View All Employees",
                "Add A Department",
                "Add A Role",
                "Add An Employee",
                "Update Employee Role",
                // Bonus
                // "Update Employee Managers",
                // "View Employees By Manager",
                // "View Employees By Department",
                // "Delete A Department",
                // "Delete A Role",
                // "Delete An Employee",
                // "View Total Utilized Budget Of A Department"
            ],
        }
    )
        .then(function (answer) {
            switch (answer.main) {
                case "View All Departments": viewDepartments();
                    break;
                case "View All Roles": viewRoles();
                    break;
                case "View All Employees": viewEmployees();
                    break;
                case "Add A Department": addDept();
                    break;
                case "Add A Role": addRole();
                    break;
                case "Add An Employee": addEmployee();
                    break;
                case "Update Employee Role": updateRole();
                    break;
            }
        })
};

// Function to view all departments
function viewDepartments() {

    prompt();
}
// Function to view all roles
function viewRoles() {

    prompt();
}
// Function to view all employees
function viewEmployees() {

    prompt();
}
// Function to add a department
function addDept() {

    prompt();
}
// Function to add a role
function addRole() {

    prompt();
}
// Function to add an employee
function addEmployee() {

    prompt();
}
// Function to update employee role
function updateRole() {

    prompt();
}
// Invoke Inquirer
prompt();