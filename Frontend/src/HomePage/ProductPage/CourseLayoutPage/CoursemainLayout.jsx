import React, { useState } from 'react'
import { useParams } from "react-router-dom"
import "./CourseLayoutPage.css"
import CourseLectureLayout from './CourseLectureLayout'
import { CourseLectureSidebar } from './CourseLectureSidebar'

export default function CoursemainLayout() {

  const { courseId } = useParams()
  const [selectedVideo, setSelectedVideo] = useState(null) // ✅ Lifted state

  return (
    <div className='Course-main-Layout-container'>
        <div className="course-main-layout-left-container">
            <CourseLectureLayout selectedVideo={selectedVideo} />
        </div>
        <div className="course-main-layout-right-container">
            <CourseLectureSidebar 
                courseId={courseId} 
                setSelectedVideo={setSelectedVideo} // ✅ Pass setter to sidebar
            />
        </div>
    </div>
  )
}