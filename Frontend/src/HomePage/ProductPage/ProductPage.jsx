import { useEffect, useState } from "react";
import "./Productstyle.css";

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/all/Courses") // backend URL
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="courses-section">
      <h1 className="courses-title">Courses We Offer</h1>

      <div className="courses-container">
        {courses.map((course) => (
          <div className="course-card" key={course._id}>
            <img src={course.image} alt={course.title} />
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <button>Explore Now</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Courses;
