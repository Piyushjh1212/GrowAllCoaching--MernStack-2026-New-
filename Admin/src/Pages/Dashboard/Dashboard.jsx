import React, { useEffect, useState } from "react";
import './Dashboard.css';
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [totalMessages, setTotalMessages] = useState(0);
  const [totalSuspiciousLogs, setTotalSuspiciousLogs] = useState(0);
  const [totalUserCount, setTotalUserCount] = useState(0);
  const [totalPaymentCount, setTotalPaymentCount] = useState(0);

  // Fetch total messages
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

  // Fetch total suspicious logs
  useEffect(() => {
    const fetchTotalSuspiciousLogs = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/totalsuspiciouslogs-count");
        const data = await res.json();
        if (res.ok) setTotalSuspiciousLogs(data.count);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTotalSuspiciousLogs();
  }, []);

  // Fetch total users
  useEffect(() => {
    const fetchTotalUserCount = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/UserLoginSignup/totalUser-count");
        const data = await res.json();
        if (res.ok) setTotalUserCount(data.count);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTotalUserCount();
  }, []);

  // Fetch total revenue
  useEffect(() => {
    const fetchTotalRevenueCount = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/Razorpay/totalRevenue-Count");
        const data = await res.json();
        if (res.ok) setTotalPaymentCount(data.totalAmount);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTotalRevenueCount();
  }, []);

  // Format numbers in Indian style
  const formatIndianNumber = (num) => {
    if (num >= 10000000) return (num / 10000000).toFixed(1) + " Cr";
    if (num >= 100000) return (num / 100000).toFixed(1) + " L";
    if (num >= 1000) return (num / 1000).toFixed(1) + " K";
    return num;
  };

  const stats = [
    { title: "Total Courses", value: 3, link: "/admin/courses" },
    { title: "Total Modules", value: 9, link: "/admin/courses" },
    { title: "Total Lectures", value: 27, link: "/admin/courses" },
    { title: "Total Users", value: totalUserCount, link: "/admin/users" },
    { title: "Total Revenue", value: formatIndianNumber(totalPaymentCount), link: "/admin/Paymentsystemrecord" },
    { title: "Total Messages", value: totalMessages, link: "/admin/messages" },
    { title: "Total Attacks", value: totalSuspiciousLogs, link: "/admin/suspicious" },
  ];

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Admin Panel</h2>
        <Link to="/admin" className="sidebar-link">Dashboard</Link>
        <Link to="/admin/courses" className="sidebar-link">Add-Courses</Link>
        <Link to="/admin/users" className="sidebar-link">Add-Images</Link>
        <Link to="/admin/lectures/Video" className="sidebar-link">Add-Video</Link>
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