// Dependencies
const inquirer = require('inquirer');
const mysql = require('mysql2');
const logo = require('asciiart-logo');
const config = require('./package.json');

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

// Dumb logo art
console.log(
    logo({
        name: 'Employee Tracker',
        font: 'ANSI Shadow',
        lineChars: 10,
        padding: 2,
        margin: 3,
        borderColor: 'grey',
        logoColor: 'bold-green',
        textColor: 'green',
    })
        .emptyLine()
        .center('Please select an option to get started')
        .emptyLine()
        .emptyLine()
        .right('a slerner corp. production')
        .render()
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
                "Quit"
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
                case "Quit": {
                    console.log("Goodbye!")
                    db.end()
                };
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
    db.query(`SELECT e.id, e.first_name AS "First Name", e.last_name AS "Last Name", r.title AS "Title", d.dept_name AS "Department", r.salary AS "Salary", CONCAT(m.first_name," ",m.last_name) AS "Manager"
    FROM employee e
    JOIN role r 
    ON r.id = e.role_id 
    JOIN department d 
    ON d.id = r.department_id
    LEFT JOIN employee m ON m.id = e.manager_id
    ORDER BY e.id;`,

        (err, results) => {
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
                name: "department_id",
                type: "list",
                message: "What department is the role within?",
                choices: () => results.map((result) => {
                    return {
                        value: result.id,
                        name: result.dept_name
                    }
                }),
            }
        ])
            .then(function (answer) {
                db.query(`INSERT INTO role SET ?`, answer, (err, results) => {
                    if (err) throw err
                    console.log(`\n ${answer.title} successfully added to role!`)
                    prompt();
                })
            })
    })
};

// Function to add an employee
function addEmployee() {
    db.query('SELECT * FROM role;', (err, results) => {
        if (err) throw err
        db.query('SELECT * FROM employee WHERE manager_id IS NULL', (error, managerData) => {
            if (error) throw error;
            inquirer.prompt([
                {
                    name: "first_name",
                    type: "input",
                    message: "What is the employee's first name?"
                },
                {
                    name: "last_name",
                    type: "input",
                    message: "What is the employee's last name?"
                },
                {
                    name: "role_id",
                    type: "list",
                    message: "What is this employee's title?",
                    choices: () => results.map((emp_title) => {
                        return {
                            name: emp_title.title,
                            value: emp_title.id
                        }
                    })
                },
                {
                    name: "manager_id",
                    type: "list",
                    message: "Does this employee have a manager?",
                    choices: () => managerData.map((manager) => {
                        return {
                            name: `${manager.first_name} ${manager.last_name}`,
                            value: manager.id
                        }
                    }).concat({
                        name: "No manager for this employee",
                        value: null
                    })
                }
            ])
                .then(function (answer) {
                    db.query(`INSERT INTO employee SET ?`, answer, (err, results) => {
                        if (err) throw err
                        console.log(`\n ${answer.first_name} ${answer.last_name} successfully added!`)
                        prompt();
                    })
                })
        })
    })
}
// Function to update employee role
// Which employee would you like to select?
// What is their new role?

function updateRole() {
    db.query('SELECT * FROM employee;', (err, emp_name) => {
        if (err) throw err
        db.query('SELECT * FROM role', (err, role_name) => {
            if (err) throw err
            inquirer.prompt([
                {
                    name: "employee_id",
                    type: "list",
                    message: "Which employee would you like to select?",
                    choices: () => emp_name.map((emp_fullname) => {
                        return {
                            name: emp_fullname.first_name + ' ' + emp_fullname.last_name,
                            value: emp_fullname.id
                        }
                    })
                },
                {
                    name: "role",
                    type: "list",
                    message: "What is the employee's new title?",
                    choices: () => role_name.map((new_role) => {
                        return {
                            name: new_role.title,
                            value: new_role.id
                        }
                    })

                },
            ])
                .then(function (answer) {
                    db.query('UPDATE employee SET role_id = ? WHERE id = ?', [answer.role, answer.employee_id], (err, results) => {
                        if (err) throw err
                        console.log(`\n Role successfully changed!`)
                        prompt();
                    })
                })
        })
    })
}

// Invoke Inquirer
prompt()