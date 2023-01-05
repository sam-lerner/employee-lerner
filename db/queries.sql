-- To sum salaries
SELECT department_id, SUM (salary) AS total_budget
FROM role
GROUP BY department_id;
function getConstraint() {
    return 'first_name'
}
let firstConstraint = 'first_name';
let 2ndconstraint = 'last_name'

inquirer.prompt([{
    type: 'list',
    choices: ['select what 2 things from where by what']
}]).then(answers => {
    if (answers.answer === 'select what 2 things from where by what'){
        getStuff()
    }
})
db.query('select ??, ?? from employee where ?? = ?', [getConstraint(), 2ndconstraint, 2ndconstraint, 'pablo'], 
select first_name, last_name from employee where last_name = 'pablo'

function getStuff() {
    inquirer.prompt([{
    type: 'input',
    message: 'What is the first column you want to query?',
    name: 'first_column'
},
{
    type: 'input',
    message: 'What is the second column you want to query?',
    name: 'second_column'
}, {
    type: 'input',
    message: 'What is the where column you want to query?',
    name: 'where_column'
},{
    type: 'input',
    message: 'What is the value of the where you want to query?',
    name: 'what_in_where'
},]).then(answers => {
    let preparedArray = [answers.first_column, answers.second_column, answers.where_column, answers.what_in_where];
    db.query('select ??, ?? from employee where ?? = ?', preparedArray,function(err, data) {
        console.table(data);
        init()
    } 
})
db.query('select * from employees',)