import React, { useState, useEffect } from "react";
import "./CourseLayoutPage.css";
import { FaArrowDown, FaArrowUp, FaLightbulb } from "react-icons/fa";

export function CourseLectureSidebar({ courseId, currentModuleId, setCurrentModuleId, setSelectedVideo, modules }) {
  const [lessons, setLessons] = useState([]);
  const [selectedLectureIndex, setSelectedLectureIndex] = useState(0);
  const [expandedLessonIndex, setExpandedLessonIndex] = useState(null);

  // ---------------- FETCH LESSONS FOR CURRENT MODULE ----------------
  useEffect(() => {
    if (!currentModuleId || !modules || modules.length === 0) return;

    const currentModule = modules.find(
      (m) => m._id.toString() === currentModuleId.toString()
    );

    if (currentModule && currentModule.lessons.length > 0) {
      setLessons(currentModule.lessons);
      setSelectedLectureIndex(0);
      setExpandedLessonIndex(0);
      setSelectedVideo(currentModule.lessons[0].videoUrl);
    } else {
      setLessons([]);
      setSelectedVideo(null);
    }
  }, [currentModuleId, modules, setSelectedVideo]);

  if (!lessons || lessons.length === 0) return <p>Loading lectures...</p>;

  // ---------------- PROGRESS LOGIC ----------------
  const getTotalDuration = (lessons) => {
    const totalSeconds = lessons.reduce((sum, l) => {
      const [mins, secs] = l.duration.split(":").map(Number);
      return sum + mins * 60 + secs;
    }, 0);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const completedLessons = lessons.filter((l) => l.completed).length;
  const totalLessons = lessons.length;
  const progressPercent =
    totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  // ---------------- HANDLE LECTURE CLICK ----------------
  const handleLectureClick = (lesson, idx) => {
    setSelectedLectureIndex(idx);
    setSelectedVideo(lesson.videoUrl);
    setExpandedLessonIndex(expandedLessonIndex === idx ? null : idx);
  };

  // ---------------- HANDLE MODULE CLICK (if sidebar shows modules) ----------------
  const handleModuleClick = (moduleId) => {
    setCurrentModuleId(moduleId);
  };

  return (
    <div className="csb-container">
      {/* ---------------- PROGRESS CARD ---------------- */}
      <div className="csb-card">
        <h3 className="csb-heading">Your Progress</h3>
        <p className="csb-text">
          You have {totalLessons - completedLessons} lessons left.
        </p>
        <div className="csb-meta">
          <p>
            Total duration: <span>{getTotalDuration(lessons)}</span>
          </p>
          <p>
            Lessons: <span>{totalLessons} videos</span>
          </p>
        </div>
        <div className="csb-progress-wrapper">
          <div className="csb-progress-bar">
            <div
              className="csb-progress-fill"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <span className="csb-progress-text">{progressPercent}%</span>
        </div>
      </div>

      {/* ---------------- LECTURE LIST ---------------- */}
      <div className="csb-card">
        <div className="csb-card-header">
          <h3 className="csb-heading">Lectures</h3>
        </div>

        <div className="csb-lesson-list">
          {lessons.map((lesson, idx) => (
            <div key={lesson._id}>
              {/* Lecture Header */}
              <div
                className={`csb-lesson-item ${
                  selectedLectureIndex === idx ? "active-lecture" : ""
                }`}
                onClick={() => handleLectureClick(lesson, idx)}
              >
                <div className="csb-lesson-left">
                  <div className="csb-icon">
                    <FaLightbulb style={{ marginRight: "6px" }} />
                  </div>
                  <span className="csb-lesson-title">{lesson.title}</span>
                </div>

                {/* Toggle Arrow */}
                
                <span className="csb-duration">
                  <button className="csb-demo-button">Demo Video</button>
                  {expandedLessonIndex === idx ? (
                    <FaArrowUp size={15} color="black" />
                  ) : (
                    <FaArrowDown size={15} color="black" />
                  )}
                </span>
              </div>

              {/* Subtitles (if expanded) */}
              {expandedLessonIndex === idx &&
                lesson.subtitles?.map((subtitle, subIdx) => (
                  <div key={`${idx}-${subIdx}`} className="csb-subtitle-item">
                    <span className="csb-subtitle-text">{subtitle}</span>
                    <span className="csb-subtitle-duration">{lesson.duration}</span>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}