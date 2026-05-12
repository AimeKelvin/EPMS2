CREATE DATABASE IF NOT EXISTS EPMS2;
USE EPMS2;

DROP TABLE IF EXISTS Employee;
DROP TABLE IF EXISTS Department;
DROP TABLE IF EXISTS Salary;

CREATE TABLE Salary (
    SalaryId INT AUTO_INCREMENT PRIMARY KEY,
    GrossSalary INT NOT NULL,
    TotalDeduction INT NOT NULL,
    NetSalary INT NOT NULL,
    Month VARCHAR(50) NOT NULL
);

CREATE TABLE Department (
    DepartmentCode VARCHAR(10) PRIMARY KEY,
    DepartmentName VARCHAR(200) NOT NULL,
    SalaryId INT NULL,
    FOREIGN KEY (SalaryId) REFERENCES Salary(SalaryId)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

CREATE TABLE Employee (
    EmployeeNumber INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(200) NOT NULL,
    LastName VARCHAR(200) NOT NULL,
    DepartmentCode VARCHAR(10) NOT NULL,
    Position VARCHAR(200) NOT NULL,
    Address VARCHAR(200) NOT NULL,
    Telephone VARCHAR(20) NOT NULL,
    Gender VARCHAR(20),
    HiredDate DATE,
    FOREIGN KEY (DepartmentCode) REFERENCES Department(DepartmentCode)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

INSERT INTO Salary (GrossSalary, TotalDeduction, NetSalary, Month) VALUES
(500000, 50000, 450000, 'January 2026'),
(700000, 70000, 630000, 'January 2026'),
(450000, 45000, 405000, 'January 2026');

INSERT INTO Department (DepartmentCode, DepartmentName, SalaryId) VALUES
('HR01', 'Human Resource', 1),
('IT01', 'Information Technology', 2),
('FN01', 'Finance', 3);

INSERT INTO Employee (FirstName, LastName, DepartmentCode, Position, Address, Telephone, Gender, HiredDate) VALUES
('Kelvin', 'Shimwa', 'IT01', 'Frontend Developer', 'Kigali', '0781234567', 'Male', '2025-01-10'),
('Alice', 'Uwase', 'HR01', 'HR Manager', 'Musanze', '0798765432', 'Female', '2024-06-15'),
('David', 'Mugisha', 'FN01', 'Accountant', 'Huye', '0723456789', 'Male', '2023-03-20');
