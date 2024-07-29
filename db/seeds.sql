INSERT INTO department (name)
VALUES ('Human Resources'),
       ('Facilities');

INSERT INTO roles (name, salary, department_id)
VALUES ('Team Lead', 65000, 1),
       ('Facilities Manager', 80000, 2);

INSERT INTO employee_names (first_name, last_name, roles_id, employees_manager)
VALUES ('Ron', 'John', 1, 'Beatrice'),
       ('Alfred', 'Brown', 2, 'Jim');

