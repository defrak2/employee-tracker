DROP DATABASE IF EXISTS  employees_db;
CREATE DATABASE employees_db;

\c employees_db;
CREATE TABLE department (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  salary INTEGER,
  department_id INTEGER,
  CONSTRAINT fk_department
  FOREIGN KEY (department_id)
  REFERENCES department(id)
  ON DELETE CASCADE
);

CREATE TABLE employee_names (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  roles_id INTEGER NOT NULL,
  CONSTRAINT fk_roles
  FOREIGN KEY (roles_id)
  REFERENCES roles(id)
  ON DELETE CASCADE,
  employees_manager VARCHAR(30)
);