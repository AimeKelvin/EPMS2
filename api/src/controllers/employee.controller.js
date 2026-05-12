import db from "../config/db.js";

export function getEmployees(req, res) {
  const sql = `
    SELECT Employee.EmployeeNumber, Employee.FirstName, Employee.LastName,
           Employee.DepartmentCode, Department.DepartmentName,
           Employee.Position, Employee.Address, Employee.Telephone,
           Employee.Gender, Employee.HiredDate
    FROM Employee
    LEFT JOIN Department ON Employee.DepartmentCode = Department.DepartmentCode
    ORDER BY Employee.EmployeeNumber DESC
  `;

  db.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ message: "Failed to get employees", error: err });
    res.json(rows);
  });
}

export function addEmployee(req, res) {
  const { FirstName, LastName, DepartmentCode, Position, Address, Telephone, Gender, HiredDate } = req.body;

  if (!FirstName || !LastName || !DepartmentCode || !Position || !Address || !Telephone) {
    return res.status(400).json({ message: "Please fill all required employee fields" });
  }

  const sql = `
    INSERT INTO Employee
    (FirstName, LastName, DepartmentCode, Position, Address, Telephone, Gender, HiredDate)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [FirstName, LastName, DepartmentCode, Position, Address, Telephone, Gender || null, HiredDate || null], (err, result) => {
    if (err) return res.status(500).json({ message: "Failed to add employee", error: err });
    res.status(201).json({ message: "Employee added", id: result.insertId });
  });
}

export function deleteEmployee(req, res) {
  const id = req.params.id;

  db.query("DELETE FROM Employee WHERE EmployeeNumber = ?", [id], (err) => {
    if (err) return res.status(500).json({ message: "Failed to delete employee", error: err });
    res.json({ message: "Employee deleted" });
  });
}
