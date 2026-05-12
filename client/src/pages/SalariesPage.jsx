import { useEffect, useState } from "react";
import { API_URL, money } from "../api";

export default function SalariesPage() {
  const [salaries, setSalaries] = useState([]);
  const [form, setForm] = useState({ GrossSalary: "", TotalDeduction: "", Month: "" });
  const [message, setMessage] = useState("");

  function loadSalaries() {
    fetch(`${API_URL}/salaries`)
      .then((res) => res.json())
      .then((data) => setSalaries(data))
      .catch(() => setMessage("Failed to load salaries"));
  }

  useEffect(() => {
    loadSalaries();
  }, []);

  async function addSalary(e) {
    e.preventDefault();

    const res = await fetch(`${API_URL}/salaries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.message || "Failed to add salary");
      return;
    }

    setForm({ GrossSalary: "", TotalDeduction: "", Month: "" });
    setMessage("Salary added successfully");
    loadSalaries();
  }

  async function deleteSalary(id) {
    if (!confirm("Delete this salary?")) return;

    await fetch(`${API_URL}/salaries/${id}`, { method: "DELETE" });
    loadSalaries();
  }

  return (
    <div>
      <h1>Salaries</h1>
      <p className="muted">Add salary packages. Net salary is calculated in the backend.</p>

      {message && <div className="message">{message}</div>}

      <form onSubmit={addSalary} className="card form-grid">
        <input placeholder="Gross Salary" value={form.GrossSalary} onChange={(e) => setForm({ ...form, GrossSalary: e.target.value })} />
        <input placeholder="Total Deduction" value={form.TotalDeduction} onChange={(e) => setForm({ ...form, TotalDeduction: e.target.value })} />
        <input placeholder="Month e.g January 2026" value={form.Month} onChange={(e) => setForm({ ...form, Month: e.target.value })} />
        <button>Add Salary</button>
      </form>

      <div className="card table-wrap">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Gross</th>
              <th>Deduction</th>
              <th>Net</th>
              <th>Month</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {salaries.map((salary) => (
              <tr key={salary.SalaryId}>
                <td>{salary.SalaryId}</td>
                <td>{money(salary.GrossSalary)}</td>
                <td>{money(salary.TotalDeduction)}</td>
                <td>{money(salary.NetSalary)}</td>
                <td>{salary.Month}</td>
                <td><button className="danger" onClick={() => deleteSalary(salary.SalaryId)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
