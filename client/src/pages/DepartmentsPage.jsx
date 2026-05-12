import { useEffect, useState } from "react";
import { API_URL, money } from "../api";

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState([]);
  const [salaries, setSalaries] = useState([]);
  const [form, setForm] = useState({ DepartmentCode: "", DepartmentName: "", SalaryId: "" });
  const [message, setMessage] = useState("");

  function loadDepartments() {
    fetch(`${API_URL}/departments`)
      .then((res) => res.json())
      .then((data) => setDepartments(data))
      .catch(() => setMessage("Failed to load departments"));
  }

  function loadSalaries() {
    fetch(`${API_URL}/salaries`)
      .then((res) => res.json())
      .then((data) => setSalaries(data));
  }

  useEffect(() => {
    loadDepartments();
    loadSalaries();
  }, []);

  async function addDepartment(e) {
    e.preventDefault();

    const res = await fetch(`${API_URL}/departments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.message || "Failed to add department");
      return;
    }

    setForm({ DepartmentCode: "", DepartmentName: "", SalaryId: "" });
    setMessage("Department added successfully");
    loadDepartments();
  }

  async function deleteDepartment(code) {
    if (!confirm("Delete this department?")) return;

    await fetch(`${API_URL}/departments/${code}`, { method: "DELETE" });
    loadDepartments();
  }

  return (
    <div>
      <h1>Departments</h1>
      <p className="muted">Create departments and connect each department to a salary.</p>

      {message && <div className="message">{message}</div>}

      <form onSubmit={addDepartment} className="card form-grid">
        <input placeholder="Department Code" value={form.DepartmentCode} onChange={(e) => setForm({ ...form, DepartmentCode: e.target.value })} />
        <input placeholder="Department Name" value={form.DepartmentName} onChange={(e) => setForm({ ...form, DepartmentName: e.target.value })} />
        <select value={form.SalaryId} onChange={(e) => setForm({ ...form, SalaryId: e.target.value })}>
          <option value="">Select Salary</option>
          {salaries.map((salary) => (
            <option key={salary.SalaryId} value={salary.SalaryId}>
              {salary.Month} - {money(salary.NetSalary)}
            </option>
          ))}
        </select>
        <button>Add Department</button>
      </form>

      <div className="card table-wrap">
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Salary ID</th>
              <th>Gross</th>
              <th>Deduction</th>
              <th>Net</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dept) => (
              <tr key={dept.DepartmentCode}>
                <td>{dept.DepartmentCode}</td>
                <td>{dept.DepartmentName}</td>
                <td>{dept.SalaryId || "-"}</td>
                <td>{money(dept.GrossSalary)}</td>
                <td>{money(dept.TotalDeduction)}</td>
                <td>{money(dept.NetSalary)}</td>
                <td><button className="danger" onClick={() => deleteDepartment(dept.DepartmentCode)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
