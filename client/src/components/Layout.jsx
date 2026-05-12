import { Link, Outlet, useNavigate } from "react-router-dom";
import { API_URL } from "../api";

export default function Layout() {
  const navigate = useNavigate();

  async function logout() {
    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include"
    });
    navigate("/login");
  }

  return (
    <div>
      <nav className="navbar">
        <h2>EPMS</h2>
        <div className="links">
          <Link to="/employees">Employees</Link>
          <Link to="/departments">Departments</Link>
          <Link to="/salary">Salary</Link>
          <Link to="/payroll">Payroll</Link>
          <button onClick={logout}>Logout</button>
        </div>
      </nav>

      <main className="container">
        <Outlet />
      </main>
    </div>
  );
}
