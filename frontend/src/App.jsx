import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import { isLoggedIn, clearTokens, isAdmin } from "./auth";
import "./styles/global.css";

function ProtectedRoute({ children }) {
  if (!isLoggedIn()) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <div>
          <Link to="/">Dashboard</Link>
          {isAdmin() && <Link to="/admin">Admin</Link>}
        </div>
        <div>
          {isLoggedIn() ? (
            <button
              onClick={() => {
                clearTokens();
                window.location.href = "/login";
              }}
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              {isAdmin() ? <AdminDashboard /> : <Navigate to="/" />}
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
