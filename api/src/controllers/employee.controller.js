import db from '../config/db.js';

let getEmployees = (req, res) => {
    let sql = 'SELECT * FROM Employees';
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error retrieving salaries', error: err });
        } else {
            res.status(200).json(result);
        }
    });
};


let addEmployee = (req, res) => {
  const {  FirstName, LastName, DepartmentCode, Position, Address, Telephone, Gender,HiredDate} = req.body;

  const query = `INSERT INTO Employee ( FirstName, LastName, DepartmentCode,Position, Address, Telephone, Gender,  HiredDate ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    query,
    [  FirstName, LastName,   DepartmentCode, Position,   Address, Telephone,   Gender,   HiredDate ],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Failed to add employee",
          error: err
        });
      }

      res.status(201).json({
        message: "Employee added successfully",
        employeeId: result.insertId
      });
    }
  );
};
export {getEmployees, addEmployee}