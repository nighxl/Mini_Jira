import { useEffect, useState } from "react";
import api from "../api";
import "../styles/dashboard.css";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  async function loadTasks() {
    const res = await api.get("/tasks/");
    setTasks(res.data);
  }

  useEffect(()=>{ loadTasks(); }, []);

  async function addTask() {
    if (!title) return;
    await api.post("/tasks/", { title, completed: false });
    setTitle("");
    loadTasks();
  }

  async function toggleTask(task) {
    await api.put(`/tasks/${task.id}/`, { ...task, completed: !task.completed });
    loadTasks();
  }

  async function deleteTask(id) {
    await api.delete(`/tasks/${id}/`);
    loadTasks();
  }

  return (
    <div className="dashboard">
      <h2>My Tasks</h2>
      <div className="task-input">
        <input
          value={title}
          onChange={e=>setTitle(e.target.value)}
          placeholder="New task"
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul className="task-list">
        {tasks.map(t=>(
          <li key={t.id}>
            <span className={t.completed ? "completed" : ""}>{t.title}</span>
            <div className="task-actions">
              <button className="toggle" onClick={()=>toggleTask(t)}>Toggle</button>
              <button className="delete" onClick={()=>deleteTask(t.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
