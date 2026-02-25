// Pages/Dashboard.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./CSS/Dashboard.css"; 

const Dashboard = () => {
  const stats = [
    { title: "Total Courses", value: 3, link: "/admin/courses" },
    { title: "Total Modules", value: 9, link: "/admin/courses" },
    { title: "Total Lectures", value: 27, link: "/admin/courses" },
    { title: "Total Users", value: 4, link: "/admin/users" },
  ];

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Admin Panel</h2>
        <Link to="/admin" className="sidebar-link">Dashboard</Link>
        <Link to="/admin/courses" className="sidebar-link">Add-Courses</Link>
        <Link to="/admin/users" className="sidebar-link">Add-images</Link>
        <Link
          to="/login"
          className="sidebar-link logout"
          onClick={() => localStorage.removeItem("token")}
        >
          Logout
        </Link>
      </div>

      {/* Main Content */}
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