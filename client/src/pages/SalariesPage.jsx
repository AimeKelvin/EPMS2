import { useEffect, useState } from "react";
import { API_URL, money } from "../api";

export default function SalariesPage() {
  const [salaries, setSalaries] = useState([]);
  const [form, setForm] = useState({
    GrossSalary: "",
    TotalDeduction: "",
    Month: ""
  });
  const [editingId, setEditingId] = useState(null);
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

  async function saveSalary(e) {
    e.preventDefault();

    const url = editingId
      ? `${API_URL}/salaries/${editingId}`
      : `${API_URL}/salaries`;

    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.message || "Failed to save salary");
      return;
    }

    setForm({
      GrossSalary: "",
      TotalDeduction: "",
      Month: ""
    });
    setEditingId(null);
    setMessage(editingId ? "Salary updated successfully" : "Salary added successfully");
    loadSalaries();
  }

  function startEdit(salary) {
    setEditingId(salary.SalaryId);
    setForm({
      GrossSalary: salary.GrossSalary,
      TotalDeduction: salary.TotalDeduction,
      Month: salary.Month
    });
    setMessage("");
  }

  function cancelEdit() {
    setEditingId(null);
    setForm({
      GrossSalary: "",
      TotalDeduction: "",
      Month: ""
    });
    setMessage("");
  }

  async function deleteSalary(id) {
    if (!confirm("Delete this salary?")) return;

    await fetch(`${API_URL}/salaries/${id}`, {
      method: "DELETE"
    });

    if (editingId === id) {
      cancelEdit();
    }

    setMessage("Salary deleted successfully");
    loadSalaries();
  }

  return (
    <div>
      <h1>Salaries</h1>
      <p className="muted">
        Add and update salary packages. Net salary is calculated in the backend.
      </p>

      {message && <div className="message">{message}</div>}

      <form onSubmit={saveSalary} className="card form-grid">
        <input
          placeholder="Gross Salary"
          value={form.GrossSalary}
          onChange={(e) =>
            setForm({ ...form, GrossSalary: e.target.value })
          }
        />

        <input
          placeholder="Total Deduction"
          value={form.TotalDeduction}
          onChange={(e) =>
            setForm({ ...form, TotalDeduction: e.target.value })
          }
        />

        <input
          placeholder="Month e.g January 2026"
          value={form.Month}
          onChange={(e) => setForm({ ...form, Month: e.target.value })}
        />

        <button>{editingId ? "Update Salary" : "Add Salary"}</button>

        {editingId && (
          <button type="button" onClick={cancelEdit}>
            Cancel
          </button>
        )}
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
                <td>
                  <button onClick={() => startEdit(salary)}>
                    Edit
                  </button>{" "}
                  <button
                    className="danger"
                    onClick={() => deleteSalary(salary.SalaryId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}