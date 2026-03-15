import React, { useState, useEffect } from "react";
import "./Courses.css";

export default function Courses() {

  // ===================== COURSE STATE =====================
  const [coursesForm, setCoursesForm] = useState({
    title: "",
    description: "",
    price: "",
    image: ""
  });

  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");

  // ===================== MODULE STATE =====================
  const [moduleForm, setModuleForm] = useState({
    title: "",
    Moduleimage: "",
    Realprice: "",
    Discountprice: ""
  });

  const [modules, setModules] = useState([]);
  const [selectedModuleId, setSelectedModuleId] = useState("");

  // ===================== LECTURE STATE =====================
  const [lectureForm, setLectureForm] = useState({
    title: "",
    videoUrl: "",
    videoKey: "",
    duration: "",
    subtitles: ["", "", "", "", ""]
  });

  const [isFree, setIsFree] = useState(false);

  // ===================== HANDLERS =====================
  const handleCourseChange = (e) => {
    setCoursesForm({ ...coursesForm, [e.target.name]: e.target.value });
  };

  const handleModuleChange = (e) => {
    setModuleForm({ ...moduleForm, [e.target.name]: e.target.value });
  };

  const handleLectureChange = (e) => {
    setLectureForm({ ...lectureForm, [e.target.name]: e.target.value });
  };

  const handleSubtitleChange = (index, value) => {
    const updated = [...lectureForm.subtitles];
    updated[index] = value;
    setLectureForm({ ...lectureForm, subtitles: updated });
  };

  // ===================== COURSE SELECT =====================
  const handleCourseSelect = (e) => {
    const courseId = e.target.value;
    setSelectedCourseId(courseId);
    setSelectedModuleId("");

    if (courseId) {
      fetch(`http://localhost:5000/api/v1/Courses/${courseId}/modules-with-lectures`)
        .then(res => res.json())
        .then(data => setModules(data))
        .catch(err => {
          console.error("Error fetching modules:", err);
          setModules([]);
        });
    } else {
      setModules([]);
    }
  };

  // ===================== SUBMIT COURSE =====================
  const handleCourseSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/v1/Courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(coursesForm)
      });

      const data = await res.json();
      setCourses(prev => [...prev, data]);

      setCoursesForm({ title: "", description: "", price: "", image: "" });

    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  // ===================== SUBMIT MODULE =====================
  const handleModuleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCourseId) return alert("Please select a course first");

    try {
      const res = await fetch("http://localhost:5000/api/v1/Courses/module", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...moduleForm, courseId: selectedCourseId })
      });

      const data = await res.json();
      setModules(prev => [...prev, data]);

      setModuleForm({ title: "", Moduleimage: "", Realprice: "", Discountprice: "" });

    } catch (error) {
      console.error("Error adding module:", error);
    }
  };

  // ===================== SUBMIT LECTURE =====================
  const handleLectureSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCourseId || !selectedModuleId)
      return alert("Select course & module first");

    try {
      const res = await fetch("http://localhost:5000/api/v1/Courses/Lecture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...lectureForm, courseId: selectedCourseId, moduleId: selectedModuleId, isFree })
      });

      const data = await res.json();
      console.log("Lecture added:", data);

      setLectureForm({ title: "", videoUrl: "", videoKey: "", duration: "", subtitles: ["", "", "", "", ""] });
      setIsFree(false);

    } catch (error) {
      console.error("Error adding lecture:", error);
    }
  };

  // ===================== FETCH COURSES =====================
  useEffect(() => {
    fetch("http://localhost:5000/api/v1/Courses")
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(err => console.error(err));
  }, []);

  // ===================== JSX =====================
  return (
    <div className="cs-ad-container">

      {/* COURSE */}
      <section className="cs-ad-section">
        <h2 className="cs-ad-title">Add Course</h2>

        <form className="cs-ad-form" onSubmit={handleCourseSubmit}>
          <input className="cs-ad-input" name="title" placeholder="Course Name" value={coursesForm.title} onChange={handleCourseChange} />
          <input className="cs-ad-input" name="description" placeholder="Description" value={coursesForm.description} onChange={handleCourseChange} />
          <input className="cs-ad-input" name="price" type="number" placeholder="Price" value={coursesForm.price} onChange={handleCourseChange} />
          <input className="cs-ad-input" name="image" placeholder="Image URL" value={coursesForm.image} onChange={handleCourseChange} />

          <button className="cs-ad-btn" type="submit">Add Course</button>
        </form>
      </section>


      {/* MODULE */}
      <section className="cs-ad-section">
        <h2 className="cs-ad-title">Add Module</h2>

        <form className="cs-ad-form" onSubmit={handleModuleSubmit}>

          <select className="cs-ad-select" value={selectedCourseId} onChange={handleCourseSelect}>
            <option value="">Select Course</option>
            {courses.map(c => (
              <option key={c._id} value={c._id}>{c.title}</option>
            ))}
          </select>

          <input className="cs-ad-input" name="title" placeholder="Module Title" value={moduleForm.title} onChange={handleModuleChange} />
          <input className="cs-ad-input" name="Moduleimage" placeholder="Module Image URL" value={moduleForm.Moduleimage} onChange={handleModuleChange} />
          <input className="cs-ad-input" name="Realprice" type="number" placeholder="Module Real Price" value={moduleForm.Realprice} onChange={handleModuleChange} />
          <input className="cs-ad-input" name="Discountprice" type="number" placeholder="Module Discount Price" value={moduleForm.Discountprice} onChange={handleModuleChange} />

          <button className="cs-ad-btn" type="submit">Add Module</button>
        </form>
      </section>


      {/* LECTURE */}
      <section className="cs-ad-section">
        <h2 className="cs-ad-title">Add Lecture</h2>

        <form className="cs-ad-form" onSubmit={handleLectureSubmit}>

          <select className="cs-ad-select" value={selectedCourseId} onChange={handleCourseSelect}>
            <option value="">Select Course</option>
            {courses.map(c => (
              <option key={c._id} value={c._id}>{c.title}</option>
            ))}
          </select>

          <select className="cs-ad-select" value={selectedModuleId} onChange={e => setSelectedModuleId(e.target.value)}>
            <option value="">Select Module</option>
            {modules.map(m => (
              <option key={m._id} value={m._id}>{m.title}</option>
            ))}
          </select>

          <input className="cs-ad-input" name="title" placeholder="Lecture Title" value={lectureForm.title} onChange={handleLectureChange} />
          <input className="cs-ad-input" name="videoUrl" placeholder="Video URL" value={lectureForm.videoUrl} onChange={handleLectureChange} />
          <input className="cs-ad-input" name="videoKey" placeholder="Video Key" value={lectureForm.videoKey} onChange={handleLectureChange} />
          <input className="cs-ad-input" name="duration" placeholder="Duration (10:25)" value={lectureForm.duration} onChange={handleLectureChange} />

          <h4 className="cs-ad-subtitle-title">Subtitles</h4>

          {lectureForm.subtitles.map((sub, index) => (
            <input
              key={index}
              className="cs-ad-input"
              type="text"
              placeholder={`Subtitle ${index + 1}`}
              value={sub}
              onChange={(e) => handleSubtitleChange(index, e.target.value)}
            />
          ))}

          <label className="cs-ad-checkbox">
            Free Lecture
            <input type="checkbox" checked={isFree} onChange={(e) => setIsFree(e.target.checked)} />
          </label>

          <button className="cs-ad-btn" type="submit">Add Lecture</button>

        </form>
      </section>

    </div>
  );
}