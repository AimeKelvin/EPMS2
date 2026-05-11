import db from '../config/db.js';

let getDepartments = (req, res) => {
    let sql = 'SELECT * FROM department';
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error retrieving salaries', error: err });
        } else {
            res.status(200).json(result);
        }
    });
};

let AddDepartment = (req, res) => {
    let { DepartmentCode, DepartmentName, SalaryId } = req.body;
    let sql = 'INSERT INTO Department (DepartmentCode, DepartmentName, SalaryId) VALUES (?, ?,?)';
    db.query(sql, [DepartmentCode,  DepartmentName, SalaryId  ], (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error adding Department', error: err });
        } else {
            res.status(201).json({ message: 'Department added successfully', salaryId: result.insertId });
        }
    });
};

export {getDepartments, AddDepartment}