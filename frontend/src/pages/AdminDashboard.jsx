import { useEffect, useState } from "react";
import api from "../api";
import { isAdmin } from "../auth";
import "../styles/admin.css";

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // ✅ Prevent non-admin from even attempting fetch
    if (!isAdmin()) {
      setError("Access Denied: You are not an admin.");
      return;
    }

    async function fetchMetrics() {
      try {
        const res = await api.get("/admin/metrics/");
        setMetrics(res.data);
      } catch (err) {
        console.error("Failed to fetch admin metrics", err);
        setError("Failed to load metrics. Please try again later.");
      }
    }
    fetchMetrics();
  }, []);

  if (error) {
    return (
      <div className="admin-dashboard">
        <h2>Admin Panel</h2>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  if (!metrics) return <p>Loading metrics...</p>;

  return (
    <div className="admin-dashboard">
      <h2>👑 Welcome, Admin</h2>

      <div className="stats">
        <div className="card">
          <h3>Total Users</h3>
          <p>{metrics.total_users}</p>
        </div>
        <div className="card">
          <h3>Total Tasks</h3>
          <p>{metrics.total_tasks}</p>
        </div>
      </div>

      <h3>📊 Users vs Tasks</h3>
      {metrics.users_tasks.length === 0 ? (
        <p>No users or tasks available.</p>
      ) : (
        <table className="metrics-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Number of Tasks</th>
            </tr>
          </thead>
          <tbody>
            {metrics.users_tasks.map((u) => (
              <tr key={u.username}>
                <td>{u.username}</td>
                <td>{u.task_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
