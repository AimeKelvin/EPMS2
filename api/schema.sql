CREATE DATABASE EPMS;
USE EPMS;


CREATE TABLE Salary(
    SalaryId INT AUTO_INCREMENT PRIMARY KEY,
    GrossSalary INT NOT NULL,
    TotalDeduction INT NOT NULL,
    NetSalary INT NOT NULL,
    Month VARCHAR(50) NOT NULL
);

CREATE TABLE Department(
    DepartmentCode VARCHAR(10) PRIMARY KEY,
    DepartmentName VARCHAR(200) NOT NULL, 
    SalaryId INT,
    
    FOREIGN KEY (SalaryId) 
    REFERENCES Salary(SalaryId)

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

    FOREIGN KEY (DepartmentCode) 
    REFERENCES Department(DepartmentCode)
);



