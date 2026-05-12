import db from "../config/db.js";

const getPayroll = (req, res) => {
  const sql = `
    SELECT
      e.DepartmentCode,
      d.DepartmentName,
      s.GrossSalary,
      s.TotalDeduction
    FROM Employee e
    JOIN Department d
      ON e.DepartmentCode = d.DepartmentCode
    JOIN Salary s
      ON d.SalaryId = s.SalaryId
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Error retrieving payroll",
        error: err
      });
    }

    res.status(200).json(result);
  });
};

export { getPayroll };