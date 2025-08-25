import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import RoleSelect from "./pages/RoleSelect";
import { isLoggedIn, clearTokens, isAdmin } from "./auth";
import "./styles/global.css";

function ProtectedRoute({ children }) {
  if (!isLoggedIn()) return <Navigate to="/role" replace />;
  return children;
}

export default function App() {
  // 👇 track login state to force rerender on login/logout
  const [authState, setAuthState] = useState({
    loggedIn: isLoggedIn(),
    admin: isAdmin(),
  });

  // 👇 update auth state on storage change
  useEffect(() => {
    const updateState = () =>
      setAuthState({ loggedIn: isLoggedIn(), admin: isAdmin() });

    window.addEventListener("storage", updateState);
    return () => window.removeEventListener("storage", updateState);
  }, []);

  return (
    <BrowserRouter key={authState.loggedIn + "-" + authState.admin}>
      <div className={authState.admin ? "admin-theme" : "user-theme"}>
        <nav className={authState.admin ? "admin-nav" : "user-nav"}>
          <div>
            {authState.loggedIn && !authState.admin && (
              <Link to="/dashboard">Dashboard</Link>
            )}
            {authState.loggedIn && authState.admin && (
              <Link to="/admin">Admin Panel</Link>
            )}
          </div>
          <div>
            {authState.loggedIn ? (
              <button
                className="btn"
                onClick={() => {
                  clearTokens();
                  setAuthState({ loggedIn: false, admin: false }); // 👈 force update
                  window.location.href = "/role";
                }}
              >
                Logout
              </button>
            ) : (
              <Link to="/role">Choose Role</Link>
            )}
          </div>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              authState.loggedIn ? (
                authState.admin ? <Navigate to="/admin" /> : <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/role" />
              )
            }
          />
          <Route path="/role" element={<RoleSelect />} />
          <Route path="/login" element={<Login onLogin={() => setAuthState({ loggedIn: true, admin: isAdmin() })} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                {authState.admin ? <Navigate to="/admin" /> : <Dashboard />}
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                {authState.admin ? <AdminDashboard /> : <Navigate to="/dashboard" />}
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/role" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
