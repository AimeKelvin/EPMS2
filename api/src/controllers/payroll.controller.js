import db from "../config/db.js";

export function getPayroll(req, res) {
  const sql = `
    SELECT 
      Employee.EmployeeNumber,
      Employee.FirstName,
      Employee.LastName,
      Employee.Position,
      Department.DepartmentName,
      Salary.NetSalary
    FROM Employee
    INNER JOIN Department 
      ON Employee.DepartmentCode = Department.DepartmentCode
    INNER JOIN Salary 
      ON Department.SalaryId = Salary.SalaryId
    ORDER BY Employee.EmployeeNumber ASC
  `;

  db.query(sql, (err, rows) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to get payroll report",
        error: err
      });
    }

    res.json(rows);
  });
}