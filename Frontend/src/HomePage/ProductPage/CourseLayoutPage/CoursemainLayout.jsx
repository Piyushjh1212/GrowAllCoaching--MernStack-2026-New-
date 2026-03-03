import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import "./CourseLayoutPage.css";
import CourseLectureLayout from './CourseLectureLayout';
import { CourseLectureSidebar } from './CourseLectureSidebar';

export default function CoursemainLayout() {
  const { courseId, moduleId } = useParams();
  const navigate = useNavigate();

  const [modules, setModules] = useState([]);
  const [currentModuleId, setCurrentModuleId] = useState(moduleId || null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  // ---------------- FETCH MODULES WITH LECTURES ----------------
  useEffect(() => {
    const fetchModules = async () => {
      try {
        if (!courseId) return;

        const res = await fetch(
          `http://localhost:5000/api/v1/Courses/${courseId}/modules-with-lectures`
        );
        const data = await res.json();

        if (data.length > 0) {
          setModules(data);

          // Auto select first module if URL param is not present
          if (!moduleId) {
            setCurrentModuleId(data[0]._id.toString());
          }
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching modules:", err);
        setLoading(false);
      }
    };

    fetchModules();
  }, [courseId, moduleId]);

  // ---------------- UPDATE URL WHEN MODULE CHANGES ----------------
  useEffect(() => {
    if (currentModuleId && currentModuleId !== moduleId) {
      navigate(`/course/${courseId}/module/${currentModuleId}`, { replace: true });
    }
  }, [currentModuleId, navigate, courseId, moduleId]);

  if (loading) return <p>Loading modules...</p>;
  if (modules.length === 0) return <p>No modules found for this course.</p>;

  return (
    <div className='Course-main-Layout-container'>
        <div className="course-main-layout-left-container">
            <CourseLectureLayout selectedVideo={selectedVideo} />
        </div>
        <div className="course-main-layout-right-container">
            <CourseLectureSidebar 
                courseId={courseId} 
                currentModuleId={currentModuleId} 
                setCurrentModuleId={setCurrentModuleId}  // ✅ pass setter to sidebar
                setSelectedVideo={setSelectedVideo} 
                modules={modules} 
            />
        </div>
    </div>
  );
}