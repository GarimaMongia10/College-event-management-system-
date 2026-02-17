import React, { useEffect, useState } from "react";
import API from "../api";

function AdminDashboard() {
  const [data, setData] = useState({
    totalEvents: 0,
    totalUsers: 0
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await API.get("/report/summary");
    setData(res.data);
  };

  return (
    <div className="card">
      <h2>Admin Dashboard</h2>

      <div className="stats">
        <div className="stat-box">
          <h3>{data.totalEvents}</h3>
          <p>Total Events</p>
        </div>

        <div className="stat-box">
          <h3>{data.totalUsers}</h3>
          <p>Total Users</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
