import db from "../config/db.js";

export function getSalaries(req, res) {
  db.query("SELECT * FROM Salary ORDER BY SalaryId DESC", (err, rows) => {
    if (err) return res.status(500).json({ message: "Failed to get salaries", error: err });
    res.json(rows);
  });
}

export function addSalary(req, res) {
  const { GrossSalary, TotalDeduction, Month } = req.body;
  const gross = Number(GrossSalary || 0);
  const deduction = Number(TotalDeduction || 0);
  const net = gross - deduction;

  if (!GrossSalary || !TotalDeduction || !Month) {
    return res.status(400).json({ message: "GrossSalary, TotalDeduction and Month are required" });
  }

  const sql = "INSERT INTO Salary (GrossSalary, TotalDeduction, NetSalary, Month) VALUES (?, ?, ?, ?)";

  db.query(sql, [gross, deduction, net, Month], (err, result) => {
    if (err) return res.status(500).json({ message: "Failed to add salary", error: err });
    res.status(201).json({ message: "Salary added", id: result.insertId });
  });
}

export function deleteSalary(req, res) {
  const id = req.params.id;

  db.query("DELETE FROM Salary WHERE SalaryId = ?", [id], (err) => {
    if (err) return res.status(500).json({ message: "Failed to delete salary", error: err });
    res.json({ message: "Salary deleted" });
  });
}
