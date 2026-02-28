import React, { useState, useEffect } from 'react';
import "./Dashboard.css";

export default function Courses() {
  // ===================== STATES =====================
  const [coursesForm, setCoursesForm] = useState({
    title: "",
    description: "",
    price: "",
    image: ""
  });
  const [courses, setCourses] = useState([]); // array for .map
  const [selectedCourseId, setSelectedCourseId] = useState("");

  const [moduleForm, setModuleForm] = useState({
    title: "",
    Moduleimage: "",
    Realprice: ""
  });
  const [modules, setModules] = useState([]); // array for .map

  const [lectureForm, setLectureForm] = useState({
    title: "",
    videoUrl: ""
  });
  const [selectedModuleId, setSelectedModuleId] = useState("");
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

  const handleCourseSelect = (e) => {
    const courseId = e.target.value;
    setSelectedCourseId(courseId);
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

  // ===================== SUBMIT HANDLERS =====================
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

  const handleModuleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCourseId) return alert("Please select a course first");

    try {
      const res = await fetch("http://localhost:5000/api/v1/Courses/module", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...moduleForm,
          courseId: selectedCourseId
        })
      });
      const data = await res.json();
      setModules(prev => [...prev, data]);
      setModuleForm({ title: "", Moduleimage: "", Realprice: "" });
    } catch (error) {
      console.error("Error adding module:", error);
    }
  };

  const handleLectureSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCourseId || !selectedModuleId) return alert("Select course & module first");

    try {
      const res = await fetch("http://localhost:5000/api/v1/Courses/Lecture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...lectureForm,
          courseId: selectedCourseId,
          moduleId: selectedModuleId,
          isFree
        })
      });
      const data = await res.json();
      console.log("Lecture added:", data);
      setLectureForm({ title: "", videoUrl: "" });
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
    <div className='admin-container'>
      {/* ========== ADD COURSE ========== */}
      <section className='admin-Course-update'>
        <h2 className='admin-course-update-heading'>Add Course</h2>
        <form onSubmit={handleCourseSubmit} className='admin-add-course-form'>
          <input type="text" name='title' placeholder="Course Name"
            value={coursesForm.title} onChange={handleCourseChange} />
          <input type="text" name='description' placeholder="Course Description"
            value={coursesForm.description} onChange={handleCourseChange} />
          <input type="number" name='price' placeholder="Price"
            value={coursesForm.price} onChange={handleCourseChange} />
          <input type="text" name='image' placeholder="Course Image URL"
            value={coursesForm.image} onChange={handleCourseChange} />
          <button type="submit">Add Course</button>
        </form>
      </section>

      {/* ========== ADD MODULE ========== */}
      <section className='admin-Course-update'>
        <h2 className='admin-course-update-heading'>Add Module</h2>
        <form onSubmit={handleModuleSubmit}>
          <select value={selectedCourseId} onChange={handleCourseSelect} className='admin-select-course'>
            <option value="">Select Course</option>
            {courses.map(course => (
              <option key={course._id} value={course._id}>{course.title}</option>
            ))}
          </select>

          <input type="text" name='title' placeholder='Module Title'
            value={moduleForm.title} onChange={handleModuleChange} />

          <input type="text" name='Moduleimage' placeholder='Module Image URL'
            value={moduleForm.Moduleimage} onChange={handleModuleChange} />

          <input type="number" name='Realprice' placeholder='Module Price'
            value={moduleForm.Realprice} onChange={handleModuleChange} />

          <button type="submit">Add Module</button>
        </form>
      </section>

      {/* ========== ADD LECTURE ========== */}
      <section className="admin-section">
        <h2>Add Lecture</h2>
        <form onSubmit={handleLectureSubmit} className="admin-form">
          <select value={selectedCourseId} onChange={handleCourseSelect}>
            <option value="">Select Course</option>
            {courses.map(c => <option key={c._id} value={c._id}>{c.title}</option>)}
          </select>

          <select value={selectedModuleId} onChange={e => setSelectedModuleId(e.target.value)}>
            <option value="">Select Module</option>
            {modules.map(m => <option key={m._id} value={m._id}>{m.title}</option>)}
          </select>

          <input
            name="title"
            placeholder="Lecture Title"
            value={lectureForm.title}
            onChange={handleLectureChange} />

          <input
            name="videoUrl"
            placeholder="Video URL"
            value={lectureForm.videoUrl}
            onChange={handleLectureChange} />

          <label>
            Free Lecture
            <input type="checkbox" checked={isFree} onChange={e => setIsFree(e.target.checked)} />
          </label>

          <button type="submit">Add Lecture</button>
        </form>
      </section>
    </div>
  );
}