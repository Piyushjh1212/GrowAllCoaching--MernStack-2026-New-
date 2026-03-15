import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute"
import Login from "./Login/login"
import AdminDashboard from "./Login/Dashboard";
import DashboardHome from "./Pages/Dashboard/DashboardHome";
import PaymentSystemRecord from "./Pages/PaymentSystemRecord"
import Addvideo from "./Pages/Addvideo"
import Addimages from "./Pages/ImageUploader/Addimage";
import AWSUploadVideo from "./Pages/AWSVideoUpload/AWVideoUpload";
import Courses from "./Pages/Courses";
import ContactMessages from "./Pages/ContactMessages/ContactMessages"
import SecuritySuspiciousDashboard from "./Pages/SuspiciousFIle/Suspicious"
import Totalpayment from "./Pages/AlltotalPage/Totalpayment";
import TotalUsers from "./Pages/AlltotalPage/TotalUsers";
import TotalCourses from "./Pages/AlltotalPage/TotalCoures"
import TotalLectures from "./Pages/AlltotalPage/TotalLectures";
import TotalModules from "./Pages/AlltotalPage/TotalModules";


const App = () => {
  return (
    <Router>
      <Routes>

        {/* Public */}
        <Route path="/login" element={<Login/>} />

        {/* Protected Admin Layout */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard/>
            </ProtectedRoute>
          }
        >

          {/* Dashboard Home */}
          <Route index element={<DashboardHome />} />

          <Route path="courses" element={<Courses />} />

          <Route path="Paymentsystemrecord" element={<PaymentSystemRecord />} />

          <Route path="lectures/Video" element={<Addvideo />} />

          <Route path="ImagesNBBNNmlUploadto&&**cloudinary&&88" element={<Addimages />} />

          <Route path="UploadAWSVideo" element={<AWSUploadVideo />} />

          <Route path="messages" element={<ContactMessages />} />

          <Route path="suspicious" element={<SecuritySuspiciousDashboard />} />

          <Route path="TotalPayment" element={<Totalpayment />} />
          <Route path="TotalUsers" element={<TotalUsers />} />
          <Route path="Totalcourses" element = {<TotalCourses />} />
          <Route path="TotalLectures" element = {<TotalLectures />} />
          <Route path="TotalCourses" element = {<TotalCourses />} />
          <Route path="TotalModule" element = {<TotalModules />} />

        </Route>

        {/* Default */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </Router>
  );
};

export default App;