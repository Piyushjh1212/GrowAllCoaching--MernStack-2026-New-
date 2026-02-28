import React, { useState } from "react";
import "./CourseLayoutPage.css";

export default function CourseSidebar() {
  const modules = [
    {
      name: "HTML",
      title: "HTML Fundamentals",
      description:
        "Learn how websites are structured using HTML, understand core tags, document structure, and build your first web page from scratch.",
      lessons: [
        { title: "Introduction to HTML", duration: "06:20", completed: true },
        { title: "HTML Document Structure", duration: "05:02", completed: true },
        { title: "Basic Text Tags", duration: "08:15", completed: false }
      ]
    },{
      name: "HTML",
      title: "HTML Fundamentals",
      description:
        "Learn how websites are structured using HTML, understand core tags, document structure, and build your first web page from scratch.",
      lessons: [
        { title: "Introduction to HTML", duration: "06:20", completed: true },
        { title: "HTML Document Structure", duration: "05:02", completed: true },
        { title: "Basic Text Tags", duration: "08:15", completed: false }
      ]
    }
  ];

  const [selectedModuleIndex, setSelectedModuleIndex] = useState(0);

  const handleModuleChange = (e) => {
    setSelectedModuleIndex(parseInt(e.target.value));
  };

  const selectedModule = modules[selectedModuleIndex];

  return (
    <div className="csb-container">

      {/* PROGRESS CARD */}
      <div className="csb-card">
        <h3 className="csb-heading">Your progress</h3>
        <p className="csb-text">
          You have 66 (60%) lessons left. Build AI & Automation design skills with lessons today!
        </p>
        <div className="csb-meta">
          <p>Total duration: <span>48 hrs</span></p>
          <p>Lessons: <span>9 videos</span></p>
        </div>
        <div className="csb-progress-wrapper">
          <div className="csb-progress-bar">
            <div className="csb-progress-fill" style={{ width: "12%" }}></div>
          </div>
          <span className="csb-progress-text">12%</span>
        </div>
      </div>

      {/* MODULE CARD */}
      <div className="csb-card">
        <div className="csb-card-header">
          <h2>{selectedModule.name}</h2>

          {/* Right dropdown for modules */}
          <select
            className="csb-module-dropdown"
            value={selectedModuleIndex}
            onChange={handleModuleChange}
          >
            {modules.map((mod, idx) => (
              <option key={idx} value={idx}>
                {mod.title}
              </option>
            ))}
          </select>
        </div>

        <h3 className="csb-heading">
          <span>Module : </span> {selectedModule.title}
        </h3>
        <p className="csb-subtext">{selectedModule.description}</p>

        <div className="csb-lesson-list">
          {selectedModule.lessons.map((lesson, index) => (
            <div
              key={index}
              className={`csb-lesson-item ${lesson.completed ? "completed" : ""}`}
            >
              <div className="csb-lesson-left">
                <div className="csb-icon">{lesson.completed ? "✓" : "▶"}</div>
                <span className="csb-lesson-title">{lesson.title}</span>
              </div>
              <span className="csb-duration">{lesson.duration}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}