import { useEffect, useState } from "react";
import { API_URL } from "../api";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [form, setForm] = useState({
    FirstName: "",
    LastName: "",
    DepartmentCode: "",
    Position: "",
    Address: "",
    Telephone: "",
    Gender: "",
    HiredDate: ""
  });
  const [message, setMessage] = useState("");

  function loadEmployees() {
    fetch(`${API_URL}/employees`)
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch(() => setMessage("Failed to load employees"));
  }

  function loadDepartments() {
    fetch(`${API_URL}/departments`)
      .then((res) => res.json())
      .then((data) => setDepartments(data));
  }

  useEffect(() => {
    loadEmployees();
    loadDepartments();
  }, []);

  async function addEmployee(e) {
    e.preventDefault();

    const res = await fetch(`${API_URL}/employees`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.message || "Failed to add employee");
      return;
    }

    setForm({ FirstName: "", LastName: "", DepartmentCode: "", Position: "", Address: "", Telephone: "", Gender: "", HiredDate: "" });
    setMessage("Employee added successfully");
    loadEmployees();
  }

  async function deleteEmployee(id) {
    if (!confirm("Delete this employee?")) return;

    await fetch(`${API_URL}/employees/${id}`, { method: "DELETE" });
    loadEmployees();
  }

  return (
    <div>
      <h1>Employees</h1>
      <p className="muted">Simple employee list with add and delete.</p>

      {message && <div className="message">{message}</div>}

      <form onSubmit={addEmployee} className="card form-grid">
        <input placeholder="First Name" value={form.FirstName} onChange={(e) => setForm({ ...form, FirstName: e.target.value })} />
        <input placeholder="Last Name" value={form.LastName} onChange={(e) => setForm({ ...form, LastName: e.target.value })} />
        <select value={form.DepartmentCode} onChange={(e) => setForm({ ...form, DepartmentCode: e.target.value })}>
          <option value="">Select Department</option>
          {departments.map((dept) => (
            <option key={dept.DepartmentCode} value={dept.DepartmentCode}>{dept.DepartmentName}</option>
          ))}
        </select>
        <input placeholder="Position" value={form.Position} onChange={(e) => setForm({ ...form, Position: e.target.value })} />
        <input placeholder="Address" value={form.Address} onChange={(e) => setForm({ ...form, Address: e.target.value })} />
        <input placeholder="Telephone" value={form.Telephone} onChange={(e) => setForm({ ...form, Telephone: e.target.value })} />
        <select value={form.Gender} onChange={(e) => setForm({ ...form, Gender: e.target.value })}>
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input type="date" value={form.HiredDate} onChange={(e) => setForm({ ...form, HiredDate: e.target.value })} />
        <button>Add Employee</button>
      </form>

      <div className="card table-wrap">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Department</th>
              <th>Position</th>
              <th>Address</th>
              <th>Telephone</th>
              <th>Gender</th>
              <th>Hired Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.EmployeeNumber}>
                <td>{employee.EmployeeNumber}</td>
                <td>{employee.FirstName}</td>
                <td>{employee.LastName}</td>
                <td>{employee.DepartmentName}</td>
                <td>{employee.Position}</td>
                <td>{employee.Address}</td>
                <td>{employee.Telephone}</td>
                <td>{employee.Gender || "-"}</td>
                <td>{employee.HiredDate ? String(employee.HiredDate).slice(0, 10) : "-"}</td>
                <td><button className="danger" onClick={() => deleteEmployee(employee.EmployeeNumber)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
