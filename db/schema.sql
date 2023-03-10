-- USE THIS LINE WHEN TESTING ONLY. DELETE FOR PROFESSIONAL DEPLOYMENT!
DROP DATABASE IF EXISTS employee_lerner_db;

CREATE DATABASE employee_lerner_db;

USE employee_lerner_db;

CREATE TABLE department (
id INT NOT NULL AUTO_INCREMENT,
dept_name VARCHAR(30) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE role (
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30) NOT NULL,
salary DECIMAL, 
department_id INT,
PRIMARY KEY (id),
FOREIGN KEY (department_id)
REFERENCES department(id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,   
    manager_id INT DEFAULT NULL,
    PRIMARY KEY (id),   
    FOREIGN KEY (role_id) 
    REFERENCES role(id) ON DELETE CASCADE,
    FOREIGN KEY (manager_id)
    REFERENCES employee(id) ON DELETE SET NULL
);
