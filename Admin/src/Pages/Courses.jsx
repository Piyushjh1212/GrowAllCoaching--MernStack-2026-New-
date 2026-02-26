import React from 'react'
import { useState, useEffect } from 'react';
import "./CSS/Dashboard.css";


export default function Courses() {
    const [courses, setCourses] = useState({
        title: "",
        description: "",
        price: "",
        image: ""
    });

    const [freeLecturesCount] = useState(5);
    const [coursesList, setCoursesList] = useState([]);

    const Handlechange = (e) => {
        setCourses({ ...courses, [e.target.name]: e.target.value });
    }


    const HandleCourseSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5000/api/v1/Courses", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: courses.title,
                    description: courses.description,
                    price: courses.price,
                    image: courses.image,
                    freeLecturesCount
                })
            });

            const data = await res.json();
            // API response ko coursesList me add karo
            setCoursesList(prev => [...prev, data]);

            // Form clear karo
            setCourses({ title: "", description: "", price: "", image: "" });
        } catch (error) {
            console.error("Error adding course:", error);
        }
    };

    useEffect(() => {
        console.log("Courses updated:", coursesList);
    }, [coursesList]);


    return (
        <section className='admin-Course-update'>
            <h2 className='admin-course-update-heading'> Add course</h2>
            <form onSubmit={HandleCourseSubmit} className='admin-add-course-form'>
                <input
                    type="text"
                    name='title'
                    placeholder="Course Name"
                    value={courses.title}
                    onChange={Handlechange}
                />

                <input
                    type="text"
                    name='description'
                    placeholder="Course Description"
                    value={courses.description}
                    onChange={Handlechange}

                />
                <input
                    type="number"
                    name='price'
                    placeholder="Price"
                    value={courses.price}
                    onChange={Handlechange}

                />
                <input
                    type="text"
                    name='image'
                    placeholder="Course Image URL"
                    value={courses.image}
                    onChange={Handlechange}

                />

                <button type="submit">Add Course</button>
            </form>
        </section>
    )
}

