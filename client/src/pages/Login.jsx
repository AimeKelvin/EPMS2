import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../api";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("12345");
  const [message, setMessage] = useState("");

  async function login(e) {
    e.preventDefault();
    setMessage("");

    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.message || "Login failed");
      return;
    }

    navigate("/employees");
  }

  return (
    <div className="login-page">
      <form onSubmit={login} className="card login-card">
        <h1>EPMS Login</h1>
        <p>Default: admin@gmail.com / 12345</p>

        {message && <div className="error">{message}</div>}

        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button>Login</button>
      </form>
    </div>
  );
}
