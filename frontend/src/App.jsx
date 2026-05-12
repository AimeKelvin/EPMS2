import { useEffect, useMemo, useState } from "react";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:1000";

const pages = [
  { key: "employees", label: "Employees" },
  { key: "departments", label: "Departments" },
  { key: "salaries", label: "Salaries" },
  { key: "payroll", label: "Payroll" }
];

const emptySalary = {
  GrossSalary: "",
  TotalDeduction: "",
  Month: ""
};

const emptyDepartment = {
  DepartmentCode: "",
  DepartmentName: "",
  SalaryId: ""
};

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

function money(value) {
  const amount = Number(value || 0);
  return new Intl.NumberFormat("en-RW", {
    style: "currency",
    currency: "RWF",
    maximumFractionDigits: 0
  }).format(amount);
}

function dateOnly(value) {
  if (!value) return "-";
  return String(value).slice(0, 10);
}

function Field({ label, children }) {
  return (
    <label className="block text-sm text-slate-700">
      <span className="mb-1 block font-medium">{label}</span>
      {children}
    </label>
  );
}

function Input(props) {
  return (
    <input
      {...props}
      className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-800"
    />
  );
}

function Select(props) {
  return (
    <select
      {...props}
      className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-800"
    />
  );
}

function Button({ children, variant = "primary", ...props }) {
  const styles =
    variant === "danger"
      ? "border-red-200 bg-white text-red-700 hover:bg-red-50"
      : variant === "secondary"
        ? "border-slate-300 bg-white text-slate-800 hover:bg-slate-50"
        : "border-slate-900 bg-slate-900 text-white hover:bg-slate-700";

  return (
    <button
      {...props}
      className={`rounded-md border px-3 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-60 ${styles}`}
    >
      {children}
    </button>
  );
}

function PageHeader({ title, description, action }) {
  return (
    <div className="mb-5 flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-950">{title}</h1>
        {description ? <p className="mt-1 text-sm text-slate-500">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

function FormBox({ title, children }) {
  return (
    <section className="mb-5 rounded-lg border border-slate-200 bg-white p-4">
      <h2 className="mb-4 text-base font-semibold text-slate-950">{title}</h2>
      {children}
    </section>
  );
}

function Table({ columns, rows, emptyText }) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="px-3 py-3 font-semibold">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-3 py-8 text-center text-slate-500">
                  {emptyText}
                </td>
              </tr>
            ) : (
              rows.map((row, index) => (
                <tr key={row.id || index}>
                  {columns.map((column) => (
                    <td key={column.key} className="whitespace-nowrap px-3 py-3 text-slate-700">
                      {column.render ? column.render(row) : row[column.key] || "-"}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function App() {
  const [activePage, setActivePage] = useState("employees");
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [salaries, setSalaries] = useState([]);
  const [payroll, setPayroll] = useState([]);
  const [salaryForm, setSalaryForm] = useState(emptySalary);
  const [departmentForm, setDepartmentForm] = useState(emptyDepartment);
  const [employeeForm, setEmployeeForm] = useState(emptyEmployee);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const netPreview = useMemo(() => {
    const gross = Number(salaryForm.GrossSalary || 0);
    const deductions = Number(salaryForm.TotalDeduction || 0);
    return gross - deductions;
  }, [salaryForm]);

  async function request(path, options = {}) {
    const response = await fetch(`${API_URL}${path}`, {
      headers: { "Content-Type": "application/json", ...(options.headers || {}) },
      ...options
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || "Request failed");
    }

    return data;
  }

  async function loadData() {
    setLoading(true);
    setError("");

    try {
      const [employeeData, departmentData, salaryData, payrollData] = await Promise.all([
        request("/employees"),
        request("/departments"),
        request("/salaries"),
        request("/payroll")
      ]);

      setEmployees(employeeData);
      setDepartments(departmentData);
      setSalaries(salaryData);
      setPayroll(payrollData);
    } catch (err) {
      setError(err.message || "Could not load data. Make sure the backend is running on port 1000.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function submitSalary(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    try {
      await request("/salaries", {
        method: "POST",
        body: JSON.stringify(salaryForm)
      });
      setSalaryForm(emptySalary);
      setMessage("Salary added.");
      await loadData();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

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

  async function remove(path) {
    const confirmed = window.confirm("Delete this record?");
    if (!confirmed) return;

    setError("");
    setMessage("");

    try {
      await request(path, { method: "DELETE" });
      setMessage("Record deleted.");
      await loadData();
    } catch (err) {
      setError(err.message);
    }
  }

  function renderEmployeesPage() {
    return (
      <>
        <PageHeader title="Employees" description="Create and manage employee records." action={<Button variant="secondary" onClick={loadData} disabled={loading}>{loading ? "Loading..." : "Refresh"}</Button>} />

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
              render: (row) => <Button variant="danger" onClick={() => remove(`/employees/${row.EmployeeNumber}`)}>Delete</Button>
            }
          ]}
        />
      </>
    );
  }

  function renderDepartmentsPage() {
    return (
      <>
        <PageHeader title="Departments" description="Create departments and link salary packages." action={<Button variant="secondary" onClick={loadData} disabled={loading}>{loading ? "Loading..." : "Refresh"}</Button>} />

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
              render: (row) => <Button variant="danger" onClick={() => remove(`/departments/${row.DepartmentCode}`)}>Delete</Button>
            }
          ]}
        />
      </>
    );
  }

  function renderSalariesPage() {
    return (
      <>
        <PageHeader title="Salaries" description="Create salary packages for departments." action={<Button variant="secondary" onClick={loadData} disabled={loading}>{loading ? "Loading..." : "Refresh"}</Button>} />

        <FormBox title="Add salary">
          <form onSubmit={submitSalary} className="grid gap-3 sm:grid-cols-4">
            <Field label="Gross salary">
              <Input type="number" min="0" value={salaryForm.GrossSalary} onChange={(e) => setSalaryForm({ ...salaryForm, GrossSalary: e.target.value })} required />
            </Field>
            <Field label="Total deduction">
              <Input type="number" min="0" value={salaryForm.TotalDeduction} onChange={(e) => setSalaryForm({ ...salaryForm, TotalDeduction: e.target.value })} required />
            </Field>
            <Field label="Month">
              <Input placeholder="January 2026" value={salaryForm.Month} onChange={(e) => setSalaryForm({ ...salaryForm, Month: e.target.value })} required />
            </Field>
            <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
              <span className="block text-xs text-slate-500">Net preview</span>
              <strong>{money(netPreview)}</strong>
            </div>
            <div className="sm:col-span-4">
              <Button disabled={saving}>{saving ? "Saving..." : "Save salary"}</Button>
            </div>
          </form>
        </FormBox>

        <Table
          emptyText={loading ? "Loading salaries..." : "No salaries yet."}
          rows={salaries.map((row) => ({ ...row, id: row.SalaryId }))}
          columns={[
            { key: "SalaryId", label: "ID" },
            { key: "Month", label: "Month" },
            { key: "GrossSalary", label: "Gross", render: (row) => money(row.GrossSalary) },
            { key: "TotalDeduction", label: "Deduction", render: (row) => money(row.TotalDeduction) },
            { key: "NetSalary", label: "Net", render: (row) => money(row.NetSalary) },
            {
              key: "action",
              label: "Action",
              render: (row) => <Button variant="danger" onClick={() => remove(`/salaries/${row.SalaryId}`)}>Delete</Button>
            }
          ]}
        />
      </>
    );
  }

  function renderPayrollPage() {
    return (
      <>
        <PageHeader title="Payroll" description="Joined payroll view from employees, departments and salaries." action={<Button variant="secondary" onClick={loadData} disabled={loading}>{loading ? "Loading..." : "Refresh"}</Button>} />
        <Table
          emptyText={loading ? "Loading payroll..." : "No payroll records yet."}
          rows={payroll.map((row) => ({ ...row, id: row.EmployeeNumber }))}
          columns={[
            { key: "EmployeeNumber", label: "No" },
            { key: "EmployeeName", label: "Employee" },
            { key: "DepartmentName", label: "Department" },
            { key: "Position", label: "Position" },
            { key: "Month", label: "Month" },
            { key: "GrossSalary", label: "Gross", render: (row) => money(row.GrossSalary) },
            { key: "TotalDeduction", label: "Deduction", render: (row) => money(row.TotalDeduction) },
            { key: "NetSalary", label: "Net", render: (row) => money(row.NetSalary) }
          ]}
        />
      </>
    );
  }

  const pageContent = {
    employees: renderEmployeesPage,
    departments: renderDepartmentsPage,
    salaries: renderSalariesPage,
    payroll: renderPayrollPage
  }[activePage];

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-5 text-slate-950 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <header className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">EPMS</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">Payroll Management</h1>
        </header>

        <nav className="mb-5 flex gap-2 overflow-x-auto border-b border-slate-200 pb-2">
          {pages.map((page) => (
            <button
              key={page.key}
              onClick={() => setActivePage(page.key)}
              className={`shrink-0 rounded-md px-3 py-2 text-sm font-medium ${
                activePage === page.key ? "bg-slate-900 text-white" : "bg-white text-slate-700 hover:bg-slate-100"
              }`}
            >
              {page.label}
            </button>
          ))}
        </nav>

        {message ? <div className="mb-4 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">{message}</div> : null}
        {error ? <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">{error}</div> : null}

        {pageContent()}
      </div>
    </main>
  );
}
