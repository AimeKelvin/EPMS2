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
      <h1>Payroll Report</h1>

      {message && <div className="message">{message}</div>}

      <div className="card table-wrap">
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Position</th>
              <th>Department</th>
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
                <td>{money(item.NetSalary)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}