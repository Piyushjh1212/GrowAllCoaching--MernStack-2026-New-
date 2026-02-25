import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Courses from "./Pages/Courses";
import Modules from "./Pages/Modules";
import Lectures from "./Pages/Lectures";
import Users from "./Pages/Users";
import Dashboard from "./Pages/Dashboard";
import Login from "./Login/login";


const App = () => {
  const token = localStorage.getItem("token");
  const isAdmin = !!token; // temporary login check

  return (
    <Router>
      <Routes>
        {/* Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Admin protected routes */}
        {isAdmin ? (
          <>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/courses" element={<Courses />} />
            <Route path="/admin/modules/:courseId" element={<Modules />} />
            <Route path="/admin/lectures/:moduleId" element={<Lectures />} />
            <Route path="/admin/users" element={<Users />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} /> 
        )}
      </Routes>
    </Router>
  );
};

export default App;