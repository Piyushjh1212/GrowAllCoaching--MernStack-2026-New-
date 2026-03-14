import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './Component/Header';
import Footer from './Component/Footer';
import Home from './Component/Home';
import LoginPage from './Component/UserLoginPage/Login';
import SignupPage from './Component/UserLoginPage/Signup';
import UserDashboard from './Component/ProfilePage.jsx/ProfileUserDashboard';
import CourseModule from './HomePage/ProductPage/CourseModule';
import CoursemainLayout from './HomePage/ProductPage/CourseLayoutPage/CoursemainLayout';

import { PrivateRoute } from './Route/PrivateRoute';
import { PublicRoute } from './Route/PublicRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* Public Home Page */}
        <Route path="/" element={<Home />} />

        {/* User Authentication */}
        <Route path="/UserLogin" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/UserSignup" element={<PublicRoute><SignupPage /></PublicRoute>} />

        {/* User Dashboard */}
        <Route path="/UserProfileDashboard" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />

        {/* Course Pages */}
        <Route path="/course/:id" element={<PrivateRoute><CourseModule /></PrivateRoute>} />
        <Route 
          path="/course/:courseId/module/:moduleId" 
          element={<PrivateRoute><CoursemainLayout /></PrivateRoute>} 
        />
        <Route 
          path="/course/:courseId/module/:moduleId/lecture/:lectureId" 
          element={<PrivateRoute><CoursemainLayout /></PrivateRoute>} 
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}