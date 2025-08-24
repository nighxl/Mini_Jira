import { useState } from "react";
import api from "../api";
import { saveTokens } from "../auth";
import "../styles/auth.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login/", { username, password });
      saveTokens(res.data);

      // Save admin flag if returned by backend
      if (res.data.is_staff !== undefined) {
        localStorage.setItem("is_staff", res.data.is_staff);
      }

      window.location.href = "/";
    } catch {
      setErr("Invalid credentials");
    }
  }

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />
        {err && <p style={{ color: "red" }}>{err}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
