import db from "../config/db.js";

export function getPayroll(req, res) {
  const sql = `
    SELECT Department.DepartmentCode, Department.DepartmentName,
           Salary.GrossSalary, Salary.TotalDeduction
    FROM Department
    LEFT JOIN Salary ON Department.SalaryId = Salary.SalaryId
    ORDER BY Department.DepartmentCode ASC
  `;

  db.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ message: "Failed to get payroll", error: err });
    res.json(rows);
  });
}
