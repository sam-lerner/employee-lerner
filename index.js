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
    db.query('SELECT * FROM department;', (err, results) => {
        if (err) throw err
        console.table(results)
        prompt();
    });
};

// Function to view all roles
function viewRoles() {
    db.query('SELECT * FROM role;', (err, results) => {
        if (err) throw err
        console.table(results)
        prompt();
    });
};
// Function to view all employees
function viewEmployees() {
    db.query('SELECT * FROM employee;', (err, results) => {
        if (err) throw err
        console.table(results)
        prompt();
    });
};
// Function to add a department
function addDept() {
    inquirer.prompt({
        name: "dept_name",
        type: "input",
        message: "What is the name of the department?"
    }).then(function (answer) {
        db.query(`INSERT INTO department SET ?`, answer, (err, results) => {
            if (err) throw err
            console.log(`\n ${answer.dept_name} successfully added to departments!`)
        })
        prompt();
    });
}
// Function to add a role
function addRole() {
    db.query('SELECT * FROM department;', (err, results) => {
        if (err) throw err
        console.table(results)

        inquirer.prompt([
            {
                name: "title",
                type: "input",
                message: "What is the role's title?"
            },
            {
                name: "salary",
                type: "input",
                message: "What is the role's salary?"
            },
            {
                name: "dept_name",
                type: "list",
                message: "What department is the role within?",
                choices: () => results.map((result) => result.dept_name),
            }

        ])
    })
    // NEED TO PARSE RESULTS!
    // .then(function (answer) {
    //     answer.dept_name = results.filter((result) => result.dept_name === answer.dept_name)[0].id;
    //     db.query(`INSERT INTO department SET ?`, answer, (err, results) => {
    //         if (err) throw err
    //         console.log(`\n ${answer.dept_name} successfully added to departments!`)
    //     })
    // prompt();
    // });
};
// What is the employee's first name?
// What is the employee's last name?
// What is the employee's role?
// Who is the employee's manager?

// Function to add an employee
function addEmployee() {
    db.query('SELECT * FROM role;', (err, results) => {
        if (err) throw err
        console.table(results)

        inquirer.prompt([
            {
                name: "first_name",
                type: "input",
                mesage: "What is the employee's first name?"
            },
            {
                name: "last",
                type: "input",
                mesage: "What is the employee's last name?"
            },
            {
                name: "title",
                type: "list",
                message: "What is this employee's title?",
                choices: () => results.map((result) => result.title),
            },
            {
                name: "manager",
                type: "boolean",
                message: "Does this employee have a manager?"
            }
        ])
    })
    console.log(answer.manager)

}
// Function to update employee role
function updateRole() {

    prompt();
}
// Invoke Inquirer
prompt();