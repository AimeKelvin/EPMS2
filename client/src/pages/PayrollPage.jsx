import { useEffect, useState } from "react";
import { API_URL, money } from "../api";

export default function PayrollPage() {
  const [payroll, setPayroll] = useState([]);
  const [message, setMessage] = useState("");
  const [month, setMonth] = useState("");

  function loadPayroll(selectedMonth = "") {
    const url = selectedMonth
      ? `${API_URL}/payroll/${selectedMonth}`
      : `${API_URL}/payroll`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setPayroll(data))
      .catch(() => setMessage("Failed to load payroll"));
  }

  useEffect(() => {
    loadPayroll();
  }, []);

  return (
    <div>
      <h1>Payroll Report</h1>

      {message && <div className="message">{message}</div>}

      <div
        className="card"
        style={{
          marginBottom: "20px",
          display: "flex",
          gap: "10px",
          alignItems: "center"
        }}
      >
        <input
          type="text"
          placeholder="Enter month e.g January 2026"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />

        <button onClick={() => loadPayroll(month)}>
          Filter
        </button>

        <button onClick={() => {
          setMonth("");
          loadPayroll();
        }}>
          Reset
        </button>
      </div>

      <div className="card table-wrap">
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Position</th>
              <th>Department</th>
              <th>Month</th>
              <th>Net Salary</th>
            </tr>
          </thead>

          <tbody>
            {payroll.map((item, index) => (
              <tr key={index}>
                <td>{item.FirstName}</td>
                <td>{item.LastName}</td>
                <td>{item.Position}</td>
                <td>{item.DepartmentName}</td>
                <td>{item.Month}</td>
                <td>{money(item.NetSalary)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}