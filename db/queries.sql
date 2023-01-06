-- To sum salaries
SELECT department_id, SUM (salary) AS total_budget
FROM role
GROUP BY department_id;
function getConstraint() {
    return 'first_name'
}

-- Sorting employee info
SELECT e.id, e.first_name AS "First Name", e.last_name AS "Last Name", r.title AS "Title", d.dept_name AS "Department", r.salary AS "Salary", CONCAT(m.first_name," ",m.last_name) AS "Manager"
    FROM employee e
    JOIN role r 
    ON r.id = e.role_id 
    JOIN department d 
    ON d.id = r.department_id
    -- If no LEFT JOIN, Managers don't show up!
    LEFT JOIN employee m ON m.id = e.manager_id
    ORDER BY e.id;
