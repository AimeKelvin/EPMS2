import db from "../config/db.js";

const getSalaries = (req, res) => {
  const sql = "SELECT * FROM Salary ORDER BY SalaryId DESC";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error retrieving salaries", error: err });
    }
    res.status(200).json(result);
  });
};

const addSalary = (req, res) => {
  const { GrossSalary, TotalDeduction, Month } = req.body;

  if (GrossSalary === undefined || TotalDeduction === undefined || !Month) {
    return res.status(400).json({ message: "GrossSalary, TotalDeduction and Month are required" });
  }

  const gross = Number(GrossSalary);
  const deductions = Number(TotalDeduction);

  if (Number.isNaN(gross) || Number.isNaN(deductions)) {
    return res.status(400).json({ message: "GrossSalary and TotalDeduction must be numbers" });
  }

  const net = gross - deductions;
  const sql = "INSERT INTO Salary (GrossSalary, TotalDeduction, NetSalary, Month) VALUES (?, ?, ?, ?)";

  db.query(sql, [gross, deductions, net, Month], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error adding salary", error: err });
    }
    res.status(201).json({ message: "Salary added successfully", salaryId: result.insertId, NetSalary: net });
  });
};

const deleteSalary = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM Salary WHERE SalaryId = ?", [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Failed to delete salary", error: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Salary not found" });
    }

    res.status(200).json({ message: "Salary deleted successfully" });
  });
};

export { getSalaries, addSalary, deleteSalary };
