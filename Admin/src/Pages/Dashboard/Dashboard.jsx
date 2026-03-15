import React from "react";
import "./Dashboard.css";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="cs-ad-dashboard-container">

      {/* Sidebar */}
      <div className="cs-ad-sidebar">
        <h2 className="cs-ad-sidebar-title">Admin Panel</h2>

        <Link to="/admin" className="cs-ad-sidebar-link">Dashboard</Link>
        <Link to="/admin/courses" className="cs-ad-sidebar-link">Add-Courses</Link>
        <Link to="/admin/ImagesNBBNNmlUploadto&&**cloudinary&&88" className="cs-ad-sidebar-link">Add-Images</Link>
        <Link to="/admin/lectures/Video" className="cs-ad-sidebar-link">Add-Video</Link>
        <Link to="/admin/UploadAWSVideo" className="cs-ad-sidebar-link">AddAWSVideo</Link>

        <Link
          to="/login"
          className="cs-ad-sidebar-link cs-ad-logout"
          onClick={() => localStorage.removeItem("token")}
        >
          Logout
        </Link>
      </div>

      {/* Right Side Content */}
      <div className="cs-ad-main-content">
        <Outlet />
      </div>

    </div>
  );
};

export default Dashboard;