import React, { useState, useEffect } from "react";
import "./CourseLayoutPage.css";
import { FaArrowDown, FaArrowUp, FaLightbulb } from "react-icons/fa";

export function CourseLectureSidebar({ courseId, setSelectedVideo }) {
  const [modules, setModules] = useState([]);
  const [selectedModuleIndex, setSelectedModuleIndex] = useState(0);
  const [selectedLectureIndex, setSelectedLectureIndex] = useState(0);
  const [expandedLessonIndex, setExpandedLessonIndex] = useState(null);

  // ---------------- FETCH MODULES ----------------
  useEffect(() => {
    const fetchModules = async () => {
      try {
        if (!courseId) return;

        const res = await fetch(
          `http://localhost:5000/api/v1/Courses/${courseId}/modules-with-lectures`
        );
        const data = await res.json();
        console.log("Fetched modules:", data);

        if (data && data.length > 0) {
          setModules(data);
          setSelectedModuleIndex(0);
          setSelectedLectureIndex(0);

          if (data[0]?.lessons?.length > 0) {
            setSelectedVideo(data[0].lessons[0].videoUrl); // ✅ Video in parent
            setExpandedLessonIndex(0);
          }
        }
      } catch (err) {
        console.error("Error fetching modules:", err);
      }
    };

    fetchModules();
  }, [courseId, setSelectedVideo]);

  if (modules.length === 0) return <p>Loading modules...</p>;

  const selectedModule = modules[selectedModuleIndex] || { lessons: [] };

  // ---------------- PROGRESS LOGIC ----------------
  const getTotalDuration = (lessons) => {
    let totalSeconds = lessons.reduce((sum, l) => {
      const [mins, secs] = l.duration.split(":").map(Number);
      return sum + (mins * 60 + secs);
    }, 0);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    return `${hours}h ${minutes}m`;
  };

  const completedLessons = selectedModule.lessons.filter((l) => l.completed)
    .length;
  const totalLessons = selectedModule.lessons.length;
  const progressPercent =
    totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  // ---------------- LECTURE CHANGE ----------------
  const handleLectureChange = (e) => {
    const idx = parseInt(e.target.value);
    setSelectedLectureIndex(idx);

    const lesson = selectedModule.lessons[idx];
    if (lesson) {
      setSelectedVideo(lesson.videoUrl);
      setExpandedLessonIndex(idx); // Automatically expand selected lecture
    }
  };

  const handleLessonClick = (lesson, idx) => {
    setSelectedLectureIndex(idx);
    setSelectedVideo(lesson.videoUrl);
    setExpandedLessonIndex(expandedLessonIndex === idx ? null : idx);
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
            Total duration: <span>{getTotalDuration(selectedModule.lessons)}</span>
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

      {/* ---------------- LECTURE CARD ---------------- */}
      <div className="csb-card">
        <div className="csb-card-header">
          <h3 className="csb-heading">Lectures</h3>
        </div>

        {/* ---------------- LESSON LIST ---------------- */}
        <div className="csb-lesson-list">
          {selectedModule.lessons.map((lesson, lessonIdx) => (
            <div key={lesson._id}>
              {/* Lesson Header */}
              <div
                className="csb-lesson-item"
                onClick={() => handleLessonClick(lesson, lessonIdx)}
              >
                <div className="csb-lesson-left">
                  <div className="csb-icon">
                    <FaLightbulb style={{ marginRight: "6px" }} />
                  </div>
                  <span className="csb-lesson-title">{lesson.title}</span>
                </div>

                {/* Toggle Arrow */}
                <span className="csb-duration">
                  {expandedLessonIndex === lessonIdx ? (
                    <FaArrowUp size={15} color="black" />
                  ) : (
                    <FaArrowDown size={15} color="black" />
                  )}
                </span>
              </div>

              {/* Subtitles (only if expanded) */}
              {expandedLessonIndex === lessonIdx &&
                lesson.subtitles?.map((subtitle, subIdx) => (
                  <div key={`${lessonIdx}-${subIdx}`} className="csb-subtitle-item">
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