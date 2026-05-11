import db from '../config/db.js';

let getSalaries = (req, res) => {
    let sql = 'SELECT * FROM salary';
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error retrieving salaries', error: err });
        } else {
            res.status(200).json(result);
        }
    });
};

let AddSalary = (req, res) => {
    let { GrossSalary, TotalDeduction, Month } = req.body;
    let NetSalary = GrossSalary - TotalDeduction;
    let sql = 'INSERT INTO salary (GrossSalary, TotalDeduction, NetSalary, Month) VALUES (?, ?, ?, ?)';
    db.query(sql, [ GrossSalary, TotalDeduction, NetSalary, Month ], (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error adding salary', error: err });
        } else {
            res.status(201).json({ message: 'Salary added successfully', salaryId: result.insertId });
        }
    });
};

export {getSalaries, AddSalary}