import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api";
import { saveTokens, isAdmin } from "../auth";
import "../styles/auth.css";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const role = params.get("role") || "user"; // role passed from RoleSelect

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login/", { username, password });

      // ✅ Save tokens + staff flag
      saveTokens(res.data);
      const isStaff = res.data.is_staff === true;

      // ✅ Save chosen role
      localStorage.setItem("login_role", role);

      // ✅ Enforce role restrictions
      if (role === "admin" && !isStaff) {
        setErr("This account is not an admin. Please log in as User.");
        return;
      }
      if (role === "user" && isStaff) {
        setErr("This account is an Admin. Please log in as Admin.");
        return;
      }

      // ✅ Notify App.jsx that login happened → update navbar/logout button
      if (onLogin) {
        onLogin();
      }

      // ✅ Redirect correctly
      if (isStaff) {
        navigate("/admin", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    } catch (e) {
      setErr("Invalid credentials");
    }
  }

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>{role === "admin" ? "Admin Login" : "User Login"}</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {err && <p style={{ color: "red" }}>{err}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
