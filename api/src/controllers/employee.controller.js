import db from "../config/db.js";

const getEmployees = (req, res) => {
  const sql = `
    SELECT 
      e.EmployeeNumber,
      e.FirstName,
      e.LastName,
      e.DepartmentCode,
      d.DepartmentName,
      e.Position,
      e.Address,
      e.Telephone,
      e.Gender,
      e.HiredDate
    FROM Employee e
    LEFT JOIN Department d ON e.DepartmentCode = d.DepartmentCode
    ORDER BY e.EmployeeNumber DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error retrieving employees", error: err });
    }
    res.status(200).json(result);
  });
};

const addEmployee = (req, res) => {
  const {
    FirstName,
    LastName,
    DepartmentCode,
    Position,
    Address,
    Telephone,
    Gender,
    HiredDate
  } = req.body;

  if (!FirstName || !LastName || !DepartmentCode || !Position || !Address || !Telephone) {
    return res.status(400).json({ message: "FirstName, LastName, DepartmentCode, Position, Address and Telephone are required" });
  }

  const sql = `
    INSERT INTO Employee 
      (FirstName, LastName, DepartmentCode, Position, Address, Telephone, Gender, HiredDate)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [FirstName, LastName, DepartmentCode, Position, Address, Telephone, Gender || null, HiredDate || null],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Failed to add employee", error: err });
      }

      res.status(201).json({ message: "Employee added successfully", employeeId: result.insertId });
    }
  );
};

const deleteEmployee = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM Employee WHERE EmployeeNumber = ?", [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Failed to delete employee", error: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ message: "Employee deleted successfully" });
  });
};

export { getEmployees, addEmployee, deleteEmployee };
