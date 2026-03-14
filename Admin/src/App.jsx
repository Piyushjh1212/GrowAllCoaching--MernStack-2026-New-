import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Courses from "./Pages/Courses";
import Login from "./Login/login";
import ProtectedRoute from "./Components/ProtectedRoute";
import Addimages from "./Pages/Addimage";
import Addvideo from "./Pages/Addvideo";
import ContactMessages from "./Pages/ContactMessages/ContactMessages";
import PaymentSystemRecord from "./Pages/PaymentSystemRecord";
import Dashboard from "./Pages/Dashboard/Dashboard";
import SecuritySuspiciousDashboard from "./Pages/SuspiciousFIle/Suspicious";
import UploadVideo from "./Pages/AWSVideoUpload/AWVideoUpload"; // Ensure this file exists
import AdminDashboard from "./Login/Dashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

          {/* Admin Protected Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/courses"
          element={
            <ProtectedRoute>
              <Courses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/Paymentsystemrecord"
          element={
            <ProtectedRoute>
              <PaymentSystemRecord />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/lectures/Video"
          element={
            <ProtectedRoute>
              <Addvideo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <Addimages />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/UploadVideo"
          element={
            <ProtectedRoute>
              <UploadVideo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/messages"
          element={
            <ProtectedRoute>
              <ContactMessages />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/suspicious"
          element={
            <ProtectedRoute>
              <SecuritySuspiciousDashboard />
            </ProtectedRoute>
          }
        />

        {/* Default / Catch-all Routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;