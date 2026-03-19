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

  // ---------------- FETCH MODULES ----------------
  useEffect(() => {
    const fetchModules = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/v1/Courses/${courseId}/modules-with-lectures`,
          {
            credentials: "include",
          }
        );

        const data = await res.json();

        if (Array.isArray(data) && data.length > 0) {
          setModules(data);

          const firstModule = data[0];
          const firstLecture =
            firstModule.lectures?.[0] || firstModule.lessons?.[0];

          // 🔥 auto redirect
          if (!lectureId && firstLecture) {
            navigate(
              `/course/${courseId}/module/${firstModule._id}/lecture/${firstLecture._id}`,
              { replace: true }
            );
          }

          setCurrentModuleId(moduleId || firstModule._id);
        }
      } catch (error) {
        console.error("Error fetching modules:", error);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) fetchModules();
  }, [courseId]);

  // ---------------- FIND CURRENT LECTURE ----------------
  const selectedLecture = useMemo(() => {
    if (!lectureId || modules.length === 0) return null;

    return (
      modules
        .flatMap((m) => [...(m.lectures || []), ...(m.lessons || [])])
        .find(
          (lec) => lec?._id?.toString() === lectureId?.toString()
        ) || null
    );
  }, [lectureId, modules]);

  // 🔥 Direct Cloudinary URL
  const videoUrl = selectedLecture?.videoUrl || null;
  const currentLectureId = selectedLecture?._id || null;

  // ---------------- LOADING ----------------
  if (loading) {
    return (
      <div className="loader">
        <h2>Loading modules...</h2>
      </div>
    );
  }

  return (
    <div className="Course-main-Layout-container">
      {/* ---------------- VIDEO PLAYER ---------------- */}
      <div className="course-main-layout-left-container">

        {videoUrl ? (
          <CourseLectureLayout
            selectedVideo={videoUrl}
            currentLectureId={currentLectureId}
          />
        ) : (
          <h3>No Video Available</h3>
        )}

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