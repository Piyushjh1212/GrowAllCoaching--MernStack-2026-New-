import courses from "../../assets/Product.js";
import "./Productstyle.css";

function Courses() {
  return (
    <section className="courses-section">
      <h1 className="courses-title">Courses We Offer</h1>

      <div className="courses-container">
        {courses.map((course) => (
          <div className="course-card" key={course.id}>
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
