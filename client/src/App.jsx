import { NavLink, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import DepartmentsPage from "./pages/DepartmentsPage";
import EmployeesPage from "./pages/EmployeesPage";
import PayrollPage from "./pages/PayrollPage";
import SalariesPage from "./pages/SalariesPage";

const pages = [
  { path: "/employees", label: "Employees" },
  { path: "/departments", label: "Departments" },
  { path: "/salaries", label: "Salaries" },
  { path: "/payroll", label: "Payroll" }
];

export default function App() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-5 text-slate-950 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <header className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">EPMS</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">Payroll Management</h1>
        </header>

        <nav className="mb-5 flex gap-2 overflow-x-auto border-b border-slate-200 pb-2">
          {pages.map((page) => (
            <NavLink
              key={page.path}
              to={page.path}
              className={({ isActive }) =>
                `shrink-0 rounded-md px-3 py-2 text-sm font-medium ${
                  isActive
                    ? "bg-slate-900 text-white"
                    : "bg-white text-slate-700 hover:bg-slate-100"
                }`
              }
            >
              {page.label}
            </NavLink>
          ))}
        </nav>

        <Routes>
          <Route path="/" element={<Navigate to="/employees" replace />} />
          <Route path="/employees" element={<EmployeesPage />} />
          <Route path="/departments" element={<DepartmentsPage />} />
          <Route path="/salaries" element={<SalariesPage />} />
          <Route path="/payroll" element={<PayrollPage />} />
        </Routes>
      </div>
    </main>
  );
}
