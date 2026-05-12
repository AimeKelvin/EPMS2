import { useEffect, useState } from "react";
import { API_URL, money } from "../api";

export default function PayrollPage() {
  const [payroll, setPayroll] = useState([]);
  const [message, setMessage] = useState("");

  function loadPayroll() {
    fetch(`${API_URL}/payroll`)
      .then((res) => res.json())
      .then((data) => setPayroll(data))
      .catch(() => setMessage("Failed to load payroll"));
  }

  useEffect(() => {
    loadPayroll();
  }, []);

  return (
    <div>
      <h1>Payroll</h1>
      <p className="muted">Payroll is only a report from Department + Salary. Nothing is inserted here.</p>

      {message && <div className="message">{message}</div>}

      <div className="card table-wrap">
        <table>
          <thead>
            <tr>
              <th>Department Code</th>
              <th>Department Name</th>
              <th>Gross Salary</th>
              <th>Total Deduction</th>
            </tr>
          </thead>
          <tbody>
            {payroll.map((item) => (
              <tr key={item.DepartmentCode}>
                <td>{item.DepartmentCode}</td>
                <td>{item.DepartmentName}</td>
                <td>{money(item.GrossSalary)}</td>
                <td>{money(item.TotalDeduction)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
