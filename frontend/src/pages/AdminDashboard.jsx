import { useEffect, useState } from "react";
import api from "../api";

export default function AdminDashboard(){
  const [data,setData] = useState(null);

  useEffect(()=>{
    api.get("/admin/metrics/").then(res=>setData(res.data));
  },[]);

  if(!data) return <p>Loading...</p>;

  return (
    <div style={{
      maxWidth: "500px",
      margin: "40px auto",
      background: "white",
      padding: "20px",
      borderRadius: "8px"
    }}>
      <h2>Admin Dashboard</h2>
      <p>Total Users: {data.users}</p>
      <p>Total Tasks: {data.tasks}</p>
    </div>
  );
}
