import { Link, Outlet, useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function Layout() {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await api.post("/auth/logout");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="font-semibold text-lg">
            EPMS
          </Link>

          <Link to="/employees" className="text-sm hover:text-black">
            Employees
          </Link>

          <Link to="/departments" className="text-sm hover:text-black">
            Departments
          </Link>

          <Link to="/salary" className="text-sm hover:text-black">
            Salaries
          </Link>

          <Link to="/payroll" className="text-sm hover:text-black">
            Payroll
          </Link>
        </div>

        <button
          onClick={logout}
          className="border px-4 py-2 rounded text-sm hover:bg-black hover:text-white transition"
        >
          Logout
        </button>
      </nav>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}