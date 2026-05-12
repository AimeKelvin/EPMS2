import { useEffect, useState } from "react";
import { money, request } from "../api";
import Button from "../components/Button";
import PageHeader from "../components/PageHeader";
import Table from "../components/Table";

export default function PayrollPage() {
  const [payroll, setPayroll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadData() {
    setLoading(true);
    setError("");

    try {
      const payrollData = await request("/payroll");
      setPayroll(payrollData);
    } catch (err) {
      setError(err.message || "Could not load payroll.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <PageHeader
        title="Payroll"
        description="Simple payroll view by department."
        action={
          <Button variant="secondary" onClick={loadData} disabled={loading}>
            {loading ? "Loading..." : "Refresh"}
          </Button>
        }
      />

      {error ? <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">{error}</div> : null}

      <Table
        emptyText={loading ? "Loading payroll..." : "No payroll records yet."}
        rows={payroll.map((row, index) => ({ ...row, id: `${row.DepartmentCode}-${index}` }))}
        columns={[
          { key: "DepartmentCode", label: "Dep Code" },
          { key: "DepartmentName", label: "Department Name" },
          { key: "GrossSalary", label: "Gross", render: (row) => money(row.GrossSalary) },
          { key: "TotalDeduction", label: "Deduction", render: (row) => money(row.TotalDeduction) }
        ]}
      />
    </>
  );
}
