import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Component/Home'
import Header from './Component/Header'
import Footer from './Component/Footer'
import CourseDetail from './HomePage/ProductPage/CourseDetail'

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course/:id" element={<CourseDetail />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
