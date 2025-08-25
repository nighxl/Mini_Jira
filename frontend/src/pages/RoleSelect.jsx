import { useNavigate } from "react-router-dom";
import "../styles/role.css";

export default function RoleSelect() {
  const navigate = useNavigate();

  function handleSelect(role) {
    // ✅ Save role choice so Login knows what to enforce
    localStorage.setItem("login_role", role); 
    navigate(`/login?role=${role}`); // ✅ ensure ?role=user/admin
  }

  return (
    <div className="role-select">
      <h2>Welcome! Please choose your role</h2>
      <div className="role-options">
        <button onClick={() => handleSelect("user")} className="btn user-btn">
          Login as User
        </button>
        <button onClick={() => handleSelect("admin")} className="btn admin-btn">
          Login as Admin
        </button>
        <button onClick={() => navigate("/register")} className="btn register-btn">
          Register
        </button>
      </div>
    </div>
  );
}
