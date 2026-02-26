import React, { useState, useEffect } from 'react';
import "./Dashboard.css";

export default function Courses() {

    // STATES
    const [courses, setCourses] = useState({
        title: "",
        description: "",
        price: "",
        image: ""
    });

    const [freeLecturesCount] = useState(5);
    const [coursesList, setCoursesList] = useState([]);

    const [selectedCourseId, setSelectedCourseId] = useState("");
    const [moduleTitle, setModuleTitle] = useState({ title: "" });


    // HANDLERS

    const Handlechange = (e) => {
        setCourses({ ...courses, [e.target.name]: e.target.value });
    };

    const HandleModuleChange = (e) => {
        setModuleTitle({
            ...moduleTitle,
            [e.target.name]: e.target.value
        });
    };

    const HandleCourseId = (e) => {
        setSelectedCourseId(e.target.value);
    };

    const HandleCourseSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5000/api/v1/Courses", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...courses,
                    freeLecturesCount
                })
            });

            const data = await res.json();
            setCoursesList(prev => [...prev, data]);
            setCourses({ title: "", description: "", price: "", image: "" });

        } catch (error) {
            console.error("Error adding course:", error);
        }
    };

    const HandleModeuleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedCourseId) {
            alert("Please select a course first");
            return;
        }

        try {
            const res = await fetch("http://localhost:5000/api/v1/Courses/module", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: moduleTitle.title,
                    courseId: selectedCourseId
                })
            });

            const data = await res.json();
            console.log("New Module Added:", data);

            setModuleTitle({ title: "" });

        } catch (error) {
            console.error("Error adding module:", error);
        }
    };


    // USE EFFECT
    useEffect(() => {
        fetch("http://localhost:5000/api/v1/Courses")
            .then(res => res.json())
            .then(data => setCoursesList(data))
            .catch(err => console.error(err));
    }, []);


    // JSX
    return (
        <div className='admin-container'>

            {/* ADD COURSE */}
            <section className='admin-Course-update'>
                <h2 className='admin-course-update-heading'>Add Course</h2>
                <form onSubmit={HandleCourseSubmit} className='admin-add-course-form'>

                    <input type="text" name='title' placeholder="Course Name"
                        value={courses.title} onChange={Handlechange} />

                    <input type="text" name='description' placeholder="Course Description"
                        value={courses.description} onChange={Handlechange} />

                    <input type="number" name='price' placeholder="Price"
                        value={courses.price} onChange={Handlechange} />

                    <input type="text" name='image' placeholder="Course Image URL"
                        value={courses.image} onChange={Handlechange} />

                    <button type="submit">Add Course</button>
                </form>
            </section>


            {/* ADD MODULE */}
            <section className='admin-Course-update'>
                <h2 className='admin-course-update-heading'>Add Module</h2>

                <form onSubmit={HandleModeuleSubmit}>

                    <select value={selectedCourseId}
                        onChange={HandleCourseId}
                        className='admin-select-course'>

                        <option value="">Select Course</option>

                        {coursesList.map(course => (
                            <option key={course._id} value={course._id}>
                                {course.title}
                            </option>
                        ))}

                    </select>

                    <input type="text" name='title'
                        placeholder='Module Title'
                        value={moduleTitle.title}
                        onChange={HandleModuleChange}
                    />

                    <button type="submit">Add Module</button>
                </form>
            </section>

        </div>
    );
}