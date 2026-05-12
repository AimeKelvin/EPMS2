import { useEffect, useState } from "react";
import { dateOnly, request } from "../api";
import Button from "../components/Button";
import Field from "../components/Field";
import FormBox from "../components/FormBox";
import Input from "../components/Input";
import PageHeader from "../components/PageHeader";
import Select from "../components/Select";
import Table from "../components/Table";

const emptyEmployee = {
  FirstName: "",
  LastName: "",
  DepartmentCode: "",
  Position: "",
  Address: "",
  Telephone: "",
  Gender: "",
  HiredDate: ""
};

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [employeeForm, setEmployeeForm] = useState(emptyEmployee);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function loadData() {
    setLoading(true);
    setError("");

    try {
      const [employeeData, departmentData] = await Promise.all([
        request("/employees"),
        request("/departments")
      ]);

      setEmployees(employeeData);
      setDepartments(departmentData);
    } catch (err) {
      setError(err.message || "Could not load employees.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function submitEmployee(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    try {
      await request("/employees", {
        method: "POST",
        body: JSON.stringify(employeeForm)
      });

      setEmployeeForm(emptyEmployee);
      setMessage("Employee added.");
      await loadData();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function removeEmployee(employeeNumber) {
    const confirmed = window.confirm("Delete this employee?");
    if (!confirmed) return;

    setError("");
    setMessage("");

    try {
      await request(`/employees/${employeeNumber}`, { method: "DELETE" });
      setMessage("Employee deleted.");
      await loadData();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <PageHeader
        title="Employees"
        description="Create and manage employee records."
        action={
          <Button variant="secondary" onClick={loadData} disabled={loading}>
            {loading ? "Loading..." : "Refresh"}
          </Button>
        }
      />

      {message ? <div className="mb-4 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">{message}</div> : null}
      {error ? <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">{error}</div> : null}

      <FormBox title="Add employee">
        <form onSubmit={submitEmployee} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Field label="First name">
            <Input value={employeeForm.FirstName} onChange={(e) => setEmployeeForm({ ...employeeForm, FirstName: e.target.value })} required />
          </Field>
          <Field label="Last name">
            <Input value={employeeForm.LastName} onChange={(e) => setEmployeeForm({ ...employeeForm, LastName: e.target.value })} required />
          </Field>
          <Field label="Department">
            <Select value={employeeForm.DepartmentCode} onChange={(e) => setEmployeeForm({ ...employeeForm, DepartmentCode: e.target.value })} required>
              <option value="">Select department</option>
              {departments.map((department) => (
                <option key={department.DepartmentCode} value={department.DepartmentCode}>
                  {department.DepartmentCode} - {department.DepartmentName}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Position">
            <Input value={employeeForm.Position} onChange={(e) => setEmployeeForm({ ...employeeForm, Position: e.target.value })} required />
          </Field>
          <Field label="Telephone">
            <Input value={employeeForm.Telephone} onChange={(e) => setEmployeeForm({ ...employeeForm, Telephone: e.target.value })} required />
          </Field>
          <Field label="Gender">
            <Select value={employeeForm.Gender} onChange={(e) => setEmployeeForm({ ...employeeForm, Gender: e.target.value })}>
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </Select>
          </Field>
          <Field label="Address">
            <Input value={employeeForm.Address} onChange={(e) => setEmployeeForm({ ...employeeForm, Address: e.target.value })} required />
          </Field>
          <Field label="Hired date">
            <Input type="date" value={employeeForm.HiredDate} onChange={(e) => setEmployeeForm({ ...employeeForm, HiredDate: e.target.value })} />
          </Field>
          <div className="sm:col-span-2 lg:col-span-4">
            <Button disabled={saving}>{saving ? "Saving..." : "Save employee"}</Button>
          </div>
        </form>
      </FormBox>

      <Table
        emptyText={loading ? "Loading employees..." : "No employees yet."}
        rows={employees.map((row) => ({ ...row, id: row.EmployeeNumber }))}
        columns={[
          { key: "EmployeeNumber", label: "No" },
          { key: "name", label: "Name", render: (row) => `${row.FirstName} ${row.LastName}` },
          { key: "DepartmentName", label: "Department" },
          { key: "Position", label: "Position" },
          { key: "Telephone", label: "Telephone" },
          { key: "Gender", label: "Gender" },
          { key: "HiredDate", label: "Hired", render: (row) => dateOnly(row.HiredDate) },
          {
            key: "action",
            label: "Action",
            render: (row) => <Button variant="danger" onClick={() => removeEmployee(row.EmployeeNumber)}>Delete</Button>
          }
        ]}
      />
    </>
  );
}
