import db from "../config/db.js";

export function getDepartments(req, res) {
  const sql = `
    SELECT Department.DepartmentCode, Department.DepartmentName, Department.SalaryId,
           Salary.GrossSalary, Salary.TotalDeduction, Salary.NetSalary, Salary.Month
    FROM Department
    LEFT JOIN Salary ON Department.SalaryId = Salary.SalaryId
    ORDER BY Department.DepartmentCode ASC
  `;

  db.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ message: "Failed to get departments", error: err });
    res.json(rows);
  });
}

export function addDepartment(req, res) {
  const { DepartmentCode, DepartmentName, SalaryId } = req.body;

  if (!DepartmentCode || !DepartmentName) {
    return res.status(400).json({ message: "DepartmentCode and DepartmentName are required" });
  }

  const sql = "INSERT INTO Department (DepartmentCode, DepartmentName, SalaryId) VALUES (?, ?, ?)";

  db.query(sql, [DepartmentCode, DepartmentName, SalaryId || null], (err) => {
    if (err) return res.status(500).json({ message: "Failed to add department", error: err });
    res.status(201).json({ message: "Department added" });
  });
}

export function deleteDepartment(req, res) {
  const code = req.params.code;

  db.query("DELETE FROM Department WHERE DepartmentCode = ?", [code], (err) => {
    if (err) return res.status(500).json({ message: "Failed to delete department", error: err });
    res.json({ message: "Department deleted" });
  });
}
