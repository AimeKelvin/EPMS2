import db from "../config/db.js";

const getPayroll = (req, res) => {
  const sql = `
    SELECT
      d.DepartmentCode,
      d.DepartmentName,
      s.GrossSalary,
      s.TotalDeduction,
      (s.GrossSalary - s.TotalDeduction) AS NetSalary
    FROM Department d
    JOIN Salary s
      ON d.SalaryId = s.SalaryId
    ORDER BY d.DepartmentCode ASC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Error retrieving payroll report",
        error: err,
      });
    }

    res.status(200).json(result);
  });
};

export { getPayroll };