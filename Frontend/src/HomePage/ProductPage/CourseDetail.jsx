import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function CourseDetail() {
  const { id } = useParams(); // course id from URL
  const [course, setCourse] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/courses/product/${id}`)
      .then((res) => res.json())
      .then((data) => setCourse(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!course) return <p>Loading...</p>;

  return (
    <div>
      <h1>{course.title}</h1>
      <p>{course.description}</p>

     
      <div className="products-container">
        {course.products?.map((product) => (
          <div key={product._id} className="product-card">
            <img src={product.image} alt={product.name} />
            <p>{product.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseDetail;
