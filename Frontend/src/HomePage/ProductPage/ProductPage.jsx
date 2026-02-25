import { useEffect, useState } from "react";
import "./Productstyle.css";
import { Link } from "react-router-dom";

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/product") // backend URL
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
            <Link to={`/course/${course._id}`}>  
            <button >Explore Now</button>
            </Link>
          
          </div>
        ))}
      </div>
    </section>
  );
}

export default Courses;
