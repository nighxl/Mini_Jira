import { useState } from "react";
import api from "../api";
import "../styles/auth.css";

export default function Register() {
  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [msg,setMsg] = useState("");

  async function handleSubmit(e){
    e.preventDefault();
    try {
      await api.post("/auth/register/", { username, email, password });
      setMsg("Registration successful. Please login.");
    } catch {
      setMsg("Registration failed.");
    }
  }

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input
          placeholder="Username"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />
        {msg && <p>{msg}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
