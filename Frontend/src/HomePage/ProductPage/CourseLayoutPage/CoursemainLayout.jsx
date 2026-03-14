import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CourseLayoutPage.css";
import "./CourseLectureDownContent.css";
import CourseLectureLayout from "./CourseLectureLayout";
import { CourseLectureSidebar } from "./CourseLectureSidebar";
import CourseLectureDownContent from "./CourseLectureDownContent";

export default function CoursemainLayout() {
  const { courseId, moduleId, lectureId } = useParams();
  const navigate = useNavigate();

  const [modules, setModules] = useState([]);
  const [currentModuleId, setCurrentModuleId] = useState(moduleId || null);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // ---------------- FETCH MODULES ----------------
  useEffect(() => {
    const fetchModules = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/v1/Courses/${courseId}/modules-with-lectures`
        );
        const data = await res.json();

        if (Array.isArray(data) && data.length > 0) {
          setModules(data);

          // Auto select first module/lecture if lectureId not provided
          const firstModule = data[0];
          const firstLecture = firstModule.lectures?.[0] || firstModule.lessons?.[0];

          if (!lectureId && firstLecture) {
            navigate(
              `/course/${courseId}/module/${firstModule._id}/lecture/${firstLecture._id}`,
              { replace: true }
            );
          }

          // set current module if moduleId not provided
          if (!moduleId) {
            setCurrentModuleId(firstModule._id);
          }
        }
      } catch (error) {
        console.error("Error fetching modules:", error);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) fetchModules();
  }, [courseId, lectureId, moduleId, navigate]);

  // ---------------- UPDATE URL WHEN MODULE CHANGE ----------------
  useEffect(() => {
    if (!currentModuleId) return;

    if (currentModuleId !== moduleId) {
      navigate(`/course/${courseId}/module/${currentModuleId}`, { replace: true });
    }
  }, [currentModuleId, navigate, courseId, moduleId]);

  // ---------------- FIND CURRENT LECTURE ----------------
  const selectedLecture = useMemo(() => {
    if (!lectureId || modules.length === 0) return null;

    for (let module of modules) {
      const lecture = module.lectures?.find((lec) => lec._id.toString() === lectureId.toString());
      const lesson = module.lessons?.find((lec) => lec._id.toString() === lectureId.toString());
      const selected = lecture || lesson;
      if (selected) return selected;
    }

    return null;
  }, [lectureId, modules]);

  const selectedVideoUrl = useMemo(() => selectedLecture?.videoUrl || null, [selectedLecture]);
  const currentLectureId = selectedLecture?._id || null;

  // ---------------- LOADING ----------------
  if (loading) return <p>Loading modules...</p>;

  return (
    <div className="Course-main-Layout-container">
      {/* ---------------- VIDEO PLAYER ---------------- */}
      <div className="course-main-layout-left-container">
        <CourseLectureLayout
          selectedVideo={selectedVideoUrl}
          currentLectureId={currentLectureId}
        />
        <CourseLectureDownContent />
      </div>

      {/* ---------------- SIDEBAR ---------------- */}
      <div className="course-main-layout-right-container">
        <CourseLectureSidebar
          modules={modules}
          courseId={courseId}
          currentModuleId={currentModuleId}
          setCurrentModuleId={setCurrentModuleId}
        />
      </div>
    </div>
  );
}