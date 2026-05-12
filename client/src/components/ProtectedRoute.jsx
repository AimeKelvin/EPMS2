import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { API_URL } from "../api";

export default function ProtectedRoute() {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/auth/me`, { credentials: "include" })
      .then((res) => {
        if (res.ok) setLoggedIn(true);
        else setLoggedIn(false);
      })
      .catch(() => setLoggedIn(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="container">Checking login...</p>;

  if (!loggedIn) return <Navigate to="/login" replace />;

  return <Outlet />;
}
