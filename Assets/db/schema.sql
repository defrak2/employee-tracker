DROP DATABASE IF EXISTS  employees_db;
CREATE DATABASE employees_db;

\c employees_db;
CREATE TABLE department (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE service (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  salary INTEGER,
  department_id
);

CREATE TABLE employee_names (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  service_name ,
  employees_manager VARCHAR(30)
);