import db from "../config/db.js";

const getDepartments = (req, res) => {
  const sql = `
    SELECT 
      d.DepartmentCode,
      d.DepartmentName,
      d.SalaryId,
      s.GrossSalary,
      s.TotalDeduction,
      s.NetSalary,
      s.Month
    FROM Department d
    LEFT JOIN Salary s ON d.SalaryId = s.SalaryId
    ORDER BY d.DepartmentName ASC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error retrieving departments", error: err });
    }
    res.status(200).json(result);
  });
};

const addDepartment = (req, res) => {
  const { DepartmentCode, DepartmentName, SalaryId } = req.body;

  if (!DepartmentCode || !DepartmentName) {
    return res.status(400).json({ message: "DepartmentCode and DepartmentName are required" });
  }

  const sql = "INSERT INTO Department (DepartmentCode, DepartmentName, SalaryId) VALUES (?, ?, ?)";

  db.query(sql, [DepartmentCode, DepartmentName, SalaryId || null], (err) => {
    if (err) {
      return res.status(500).json({ message: "Error adding department", error: err });
    }
    res.status(201).json({ message: "Department added successfully", DepartmentCode });
  });
};

const deleteDepartment = (req, res) => {
  const { code } = req.params;

  db.query("DELETE FROM Department WHERE DepartmentCode = ?", [code], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Failed to delete department", error: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.status(200).json({ message: "Department deleted successfully" });
  });
};

export { getDepartments, addDepartment, deleteDepartment };
