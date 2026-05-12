import { useEffect, useMemo, useState } from "react";
import { money, request } from "../api";
import Button from "../components/Button";
import Field from "../components/Field";
import FormBox from "../components/FormBox";
import Input from "../components/Input";
import PageHeader from "../components/PageHeader";
import Table from "../components/Table";

const emptySalary = {
  GrossSalary: "",
  TotalDeduction: "",
  Month: ""
};

export default function SalariesPage() {
  const [salaries, setSalaries] = useState([]);
  const [salaryForm, setSalaryForm] = useState(emptySalary);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const netPreview = useMemo(() => {
    const gross = Number(salaryForm.GrossSalary || 0);
    const deductions = Number(salaryForm.TotalDeduction || 0);
    return gross - deductions;
  }, [salaryForm]);

  async function loadData() {
    setLoading(true);
    setError("");

    try {
      const salaryData = await request("/salaries");
      setSalaries(salaryData);
    } catch (err) {
      setError(err.message || "Could not load salaries.");
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

  async function removeSalary(salaryId) {
    const confirmed = window.confirm("Delete this salary?");
    if (!confirmed) return;

    setError("");
    setMessage("");

    try {
      await request(`/salaries/${salaryId}`, { method: "DELETE" });
      setMessage("Salary deleted.");
      await loadData();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <PageHeader
        title="Salaries"
        description="Create salary packages for departments."
        action={
          <Button variant="secondary" onClick={loadData} disabled={loading}>
            {loading ? "Loading..." : "Refresh"}
          </Button>
        }
      />

      {message ? <div className="mb-4 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">{message}</div> : null}
      {error ? <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">{error}</div> : null}

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
            render: (row) => <Button variant="danger" onClick={() => removeSalary(row.SalaryId)}>Delete</Button>
          }
        ]}
      />
    </>
  );
}
