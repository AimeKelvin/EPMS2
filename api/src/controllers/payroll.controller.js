import db from "../config/db.js";

const getPayroll = (req, res) => {
  const sql = `
    SELECT
      e.EmployeeNumber,
      CONCAT(e.FirstName, ' ', e.LastName) AS EmployeeName,
      e.Position,
      e.DepartmentCode,
      d.DepartmentName,
      s.SalaryId,
      s.GrossSalary,
      s.TotalDeduction,
      s.NetSalary,
      s.Month,
      e.HiredDate
    FROM Employee e
    LEFT JOIN Department d ON e.DepartmentCode = d.DepartmentCode
    LEFT JOIN Salary s ON d.SalaryId = s.SalaryId
    ORDER BY e.EmployeeNumber DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error retrieving payroll records", error: err });
    }
    res.status(200).json(result);
  });
};

const getPayrollSummary = (req, res) => {
  const sql = `
    SELECT
      COUNT(e.EmployeeNumber) AS TotalEmployees,
      COALESCE(SUM(s.GrossSalary), 0) AS TotalGrossSalary,
      COALESCE(SUM(s.TotalDeduction), 0) AS TotalDeductions,
      COALESCE(SUM(s.NetSalary), 0) AS TotalNetSalary
    FROM Employee e
    LEFT JOIN Department d ON e.DepartmentCode = d.DepartmentCode
    LEFT JOIN Salary s ON d.SalaryId = s.SalaryId
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error retrieving payroll summary", error: err });
    }
    res.status(200).json(result[0]);
  });
};

export { getPayroll, getPayrollSummary };
