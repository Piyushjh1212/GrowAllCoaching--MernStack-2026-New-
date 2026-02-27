import React from 'react'
import "./CourseLayoutPage.css"
import CourseLectureLayout from './CourseLectureLayout'
import CourseLectureSidebar from './CourseLectureSidebar'

export default function CoursemainLayout() {
  return (
    <div className='Course-main-Layout-container'>
        <div className="course-main-layout-left-container">
            <CourseLectureLayout />
        </div>
        <div className="course-main-layout-right-container">
            <CourseLectureSidebar />
        </div>
    </div>
  )
}
