import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [totalMessages, setTotalMessages] = useState(0);

  useEffect(() => {
    const fetchMessagesCount = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/messages-count");
        const data = await res.json();
        if (res.ok) setTotalMessages(data.count);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMessagesCount();
  }, []);

  const stats = [
    { title: "Total Courses", value: 3, link: "/admin/courses" },
    { title: "Total Modules", value: 9, link: "/admin/courses" },
    { title: "Total Lectures", value: 27, link: "/admin/courses" },
    { title: "Total Users", value: 45, link: "/admin/users" },
    { title: "Total Revenue", value: "45 K ", link: "/admin/Paymentsystemrecord" },
    { title: "Total Messages", value: totalMessages, link: "/admin/messages" }, // dynamic
  ];

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Admin Panel</h2>
        <Link to="/admin" className="sidebar-link">Dashboard</Link>
        <Link to="/admin/courses" className="sidebar-link">Add-Courses</Link>
        <Link to="/admin/users" className="sidebar-link">Add-images</Link>
        <Link to="/admin/lectures/Video" className="sidebar-link">Add-video</Link>
        <Link
          to="/login"
          className="sidebar-link logout"
          onClick={() => localStorage.removeItem("token")}
        >
          Logout
        </Link>
      </div>

      <div className="main-content">
        <h1>Dashboard</h1>
        <p>Welcome, Admin! Here's a quick overview:</p>

        <div className="stats-cards">
          {stats.map((stat, idx) => (
            <Link key={idx} to={stat.link} className="stat-card">
              <h3>{stat.title}</h3>
              <p>{stat.value}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;