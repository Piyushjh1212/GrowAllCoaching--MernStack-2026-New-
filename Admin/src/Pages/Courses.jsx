import { useState, useEffect, useMemo } from "react";
import "./CSS/AddCourses.css";

export default function AdminDashboard() {
    const [courses, setCourses] = useState([]);

    // Course form
    const [courseTitle, setCourseTitle] = useState("");
    const [courseDesc, setCourseDesc] = useState("");
    const [coursePrice, setCoursePrice] = useState("");
    const [courseThumbnail, setCourseThumbnail] = useState("");
    const [freeLecturesCount] = useState(5);

    // Module form
    const [moduleTitle, setModuleTitle] = useState("");
    const [selectedCourseId, setSelectedCourseId] = useState("");

    // Lecture form
    const [lectureTitle, setLectureTitle] = useState("");
    const [lectureVideo, setLectureVideo] = useState("");
    const [lectureModuleId, setLectureModuleId] = useState("");
    const [isFree, setIsFree] = useState(false);

    // Fetch courses
    useEffect(() => {
        fetch("http://localhost:5000/api/courses")
            .then(res => res.json())
            .then(data => setCourses(data))
            .catch(err => console.error(err));
    }, []);

    // Derived state for selected course & modules
    const selectedCourse = useMemo(() => courses.find(c => c._id === selectedCourseId) || null, [courses, selectedCourseId]);
    const modules = selectedCourse?.modules || [];

    // ----------------- Handlers -----------------
    const handleCourseSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5000/api/admin/course", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: courseTitle,
                    description: courseDesc,
                    price: coursePrice,
                    thumbnail: courseThumbnail,
                    freeLecturesCount
                })
            });
            const data = await res.json();
            setCourses(prev => [...prev, data]);
            setCourseTitle(""); setCourseDesc(""); setCoursePrice(""); setCourseThumbnail("");
        } catch (err) {
            console.error(err);
        }
    };

    const handleModuleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedCourseId) return alert("Select a course first");
        try {
            const res = await fetch("http://localhost:5000/api/admin/module", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ courseId: selectedCourseId, title: moduleTitle })
            });
            const data = await res.json();
            setCourses(prevCourses => prevCourses.map(c =>
                c._id === selectedCourseId ? { ...c, modules: [...(c.modules || []), data] } : c
            ));
            setModuleTitle("");
        } catch (err) {
            console.error(err);
        }
    };

    const handleLectureSubmit = async (e) => {
        e.preventDefault();
        if (!lectureModuleId) return alert("Select a module first");
        try {
            const res = await fetch("http://localhost:5000/api/admin/lecture", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    moduleId: lectureModuleId,
                    title: lectureTitle,
                    videoUrl: lectureVideo,
                    isFree
                })
            });
            const data = await res.json();
            setCourses(prevCourses => prevCourses.map(c => {
                if (c._id !== selectedCourseId) return c;
                return {
                    ...c,
                    modules: c.modules.map(m =>
                        m._id === lectureModuleId ? { ...m, lectures: [...(m.lectures || []), data] } : m
                    )
                };
            }));
            setLectureTitle(""); setLectureVideo(""); setIsFree(false);
        } catch (err) {
            console.error(err);
        }
    };

    // ----------------- JSX -----------------
    return (
        <div className="admin-container">
            <h1>Admin Dashboard</h1>

            <section className="admin-section">
                <h2>Add Course</h2>
                <form onSubmit={handleCourseSubmit} className="admin-form">
                    <input placeholder="Title" value={courseTitle} onChange={e => setCourseTitle(e.target.value)} />
                    <input placeholder="Description" value={courseDesc} onChange={e => setCourseDesc(e.target.value)} />
                    <input placeholder="Price" value={coursePrice} onChange={e => setCoursePrice(e.target.value)} />
                    <input placeholder="Thumbnail URL" value={courseThumbnail} onChange={e => setCourseThumbnail(e.target.value)} />
                    <button type="submit">Add Course</button>
                </form>
            </section>

            <section className="admin-section">
                <h2>Add Module</h2>
                <form onSubmit={handleModuleSubmit} className="admin-form">
                    <select value={selectedCourseId} onChange={e => setSelectedCourseId(e.target.value)}>
                        <option value="">Select Course</option>
                        {courses.map(c => <option key={c._id} value={c._id}>{c.title}</option>)}
                    </select>
                    <input placeholder="Module Title" value={moduleTitle} onChange={e => setModuleTitle(e.target.value)} />
                    <button type="submit">Add Module</button>
                </form>
            </section>

            <section className="admin-section">
                <h2>Add Lecture</h2>
                <form onSubmit={handleLectureSubmit} className="admin-form">
                    <select value={selectedCourseId} onChange={e => setSelectedCourseId(e.target.value)}>
                        <option value="">Select Course</option>
                        {courses.map(c => <option key={c._id} value={c._id}>{c.title}</option>)}
                    </select>
                    <select value={lectureModuleId} onChange={e => setLectureModuleId(e.target.value)}>
                        <option value="">Select Module</option>
                        {modules.map(m => <option key={m._id} value={m._id}>{m.title}</option>)}
                    </select>
                    <input placeholder="Lecture Title" value={lectureTitle} onChange={e => setLectureTitle(e.target.value)} />
                    <input placeholder="Video URL" value={lectureVideo} onChange={e => setLectureVideo(e.target.value)} />
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