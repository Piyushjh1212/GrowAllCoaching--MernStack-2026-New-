import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Productstyle.css";

function CourseModule() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/Courses/module/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("API Response:", data); // 🔥 check this once
        setCourse(data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!course) return <p>Loading...</p>;

  const HandlePaymentSystem = () => {
    alert("Payment system coming soon!");
  }

  return (
    <div className="products-container">
      <div className="product-container-box">
        {course.modules?.map((module) => (
          <div key={module._id} className="product-card">
            <img src={module.Moduleimage} alt="image" />
            <p className="Moduletitle">{module.title}</p>
            <div className="ModuleTitalPrice">
               <p className="Moduletitle-Realprice">{module.Realprice || "Price not available"}</p>
             <p className="Moduletitle-Discountprice">9 INR/-</p>

            </div>
            
            

            <div className="product-container-box-button">
              <Link to={`/course/${id}/module/${module._id}`}>
              <button className="Product-container-button" onClick={HandlePaymentSystem} >Buy Now</button>
              </Link>
              
              <button className="Product-container-button"> Browcher</button>
            </div>

          </div>
        ))}


      </div>
    </div>
  );
}

export default CourseModule;