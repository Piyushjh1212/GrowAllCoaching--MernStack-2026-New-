import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Component/Home'
import Header from './Component/Header'
import Footer from './Component/Footer'
import CourseModule from './HomePage/ProductPage/CourseModule'
import CoursemainLayout from './HomePage/ProductPage/CourseLayoutPage/CoursemainLayout'
import LoginPage from './Component/UserLoginPage/Login'
import SignupPage from './Component/UserLoginPage/Signup'
import UserDashboard from './Component/ProfilePage.jsx/ProfileUserDashboard'



export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/UserProfileDashboard" element={<UserDashboard/>}/>
        <Route path="/UserLogin" element={<LoginPage/>} /> 
        <Route path="/UserSignup" element={<SignupPage/>} />
        <Route path="/course/:id" element={<CourseModule />} />
        <Route path="/course/:courseId/module/:moduleId" element={<CoursemainLayout />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
