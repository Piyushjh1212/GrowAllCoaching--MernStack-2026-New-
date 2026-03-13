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
              <Dashboard />
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
          } />

        <Route path="/admin/messages" element={<ProtectedRoute><ContactMessages /></ProtectedRoute>} />

        <Route path="/admin/s4558875655ious" element={<ProtectedRoute><SecuritySuspiciousDashboard /></ProtectedRoute>} />



          {/* Default route */}
        
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;