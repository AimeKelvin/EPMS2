import { useEffect, useState } from "react";
import { money, request } from "../api";
import Button from "../components/Button";
import Field from "../components/Field";
import FormBox from "../components/FormBox";
import Input from "../components/Input";
import PageHeader from "../components/PageHeader";
import Select from "../components/Select";
import Table from "../components/Table";

const emptyDepartment = {
  DepartmentCode: "",
  DepartmentName: "",
  SalaryId: ""
};

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState([]);
  const [salaries, setSalaries] = useState([]);
  const [departmentForm, setDepartmentForm] = useState(emptyDepartment);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function loadData() {
    setLoading(true);
    setError("");

    try {
      const [departmentData, salaryData] = await Promise.all([
        request("/departments"),
        request("/salaries")
      ]);

      setDepartments(departmentData);
      setSalaries(salaryData);
    } catch (err) {
      setError(err.message || "Could not load departments.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function submitDepartment(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    try {
      await request("/departments", {
        method: "POST",
        body: JSON.stringify({
          ...departmentForm,
          SalaryId: departmentForm.SalaryId || null
        })
      });

      setDepartmentForm(emptyDepartment);
      setMessage("Department added.");
      await loadData();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function removeDepartment(departmentCode) {
    const confirmed = window.confirm("Delete this department?");
    if (!confirmed) return;

    setError("");
    setMessage("");

    try {
      await request(`/departments/${departmentCode}`, { method: "DELETE" });
      setMessage("Department deleted.");
      await loadData();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <PageHeader
        title="Departments"
        description="Create departments and link salary packages."
        action={
          <Button variant="secondary" onClick={loadData} disabled={loading}>
            {loading ? "Loading..." : "Refresh"}
          </Button>
        }
      />

      {message ? <div className="mb-4 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">{message}</div> : null}
      {error ? <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">{error}</div> : null}

      <FormBox title="Add department">
        <form onSubmit={submitDepartment} className="grid gap-3 sm:grid-cols-3">
          <Field label="Department code">
            <Input placeholder="IT01" value={departmentForm.DepartmentCode} onChange={(e) => setDepartmentForm({ ...departmentForm, DepartmentCode: e.target.value.toUpperCase() })} required />
          </Field>
          <Field label="Department name">
            <Input placeholder="Information Technology" value={departmentForm.DepartmentName} onChange={(e) => setDepartmentForm({ ...departmentForm, DepartmentName: e.target.value })} required />
          </Field>
          <Field label="Salary package">
            <Select value={departmentForm.SalaryId} onChange={(e) => setDepartmentForm({ ...departmentForm, SalaryId: e.target.value })}>
              <option value="">No salary selected</option>
              {salaries.map((salary) => (
                <option key={salary.SalaryId} value={salary.SalaryId}>
                  #{salary.SalaryId} - {salary.Month} - {money(salary.NetSalary)}
                </option>
              ))}
            </Select>
          </Field>
          <div className="sm:col-span-3">
            <Button disabled={saving}>{saving ? "Saving..." : "Save department"}</Button>
          </div>
        </form>
      </FormBox>

      <Table
        emptyText={loading ? "Loading departments..." : "No departments yet."}
        rows={departments.map((row) => ({ ...row, id: row.DepartmentCode }))}
        columns={[
          { key: "DepartmentCode", label: "Code" },
          { key: "DepartmentName", label: "Name" },
          { key: "SalaryId", label: "Salary ID" },
          { key: "GrossSalary", label: "Gross", render: (row) => money(row.GrossSalary) },
          { key: "TotalDeduction", label: "Deduction", render: (row) => money(row.TotalDeduction) },
          { key: "NetSalary", label: "Net", render: (row) => money(row.NetSalary) },
          {
            key: "action",
            label: "Action",
            render: (row) => <Button variant="danger" onClick={() => removeDepartment(row.DepartmentCode)}>Delete</Button>
          }
        ]}
      />
    </>
  );
}
