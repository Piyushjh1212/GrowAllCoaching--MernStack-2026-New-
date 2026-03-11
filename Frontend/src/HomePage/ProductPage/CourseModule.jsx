import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Productstyle.css";

function CourseModule() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentloading, SetPaymentLoading] = useState(false)

  // Track purchased modules with validity
  const [purchasedModules, setPurchasedModules] = useState([]);



  // 1️⃣ Fetch course + user purchased modules
  useEffect(() => {
    const fetchCourseAndPurchases = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch course modules
        const courseRes = await fetch(`http://localhost:5000/api/v1/Courses/module/${id}`);
        const courseData = await courseRes.json();
        setCourse(courseData);

        // Fetch user's purchased modules
        if (token) {
          const userRes = await fetch("http://localhost:5000/api/v1/UserLoginSignup/profile", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const userData = await userRes.json();
          setPurchasedModules(userData.purchasedModules || []);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourseAndPurchases();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!course) return <p>Course not found</p>;

  // Helper to check if module is purchased and still valid
  const isModuleValid = (moduleId) => {
    const pm = purchasedModules.find((m) => m.module === moduleId);
    if (!pm) return false;
    return new Date() <= new Date(pm.expiryDate);
  };

  // 2️⃣ Payment handler
  const handlePayment = async (moduleId, amount) => {
    if (paymentloading) return;
    try {
      SetPaymentLoading(true)
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first!");
        return;
      }

      // Create order in backend
      const orderRes = await fetch("http://localhost:5000/api/v1/Razorpay/createPayment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ moduleId, amount }),
      });

      const orderData = await orderRes.json();
      if (!orderData.success) {
        alert("Payment creation failed");
        return;
      }

      // Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.order.amount,
        currency: "INR",
        name: "Grow All Coaching",
        description: "Module Purchase",
        order_id: orderData.order.id,
        handler: async (response) => {
          const verifyRes = await fetch("http://localhost:5000/api/v1/Razorpay/verifyPayment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ ...response, moduleId }),
          });

          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            alert("Payment Successful 🎉");

            // Update purchasedModules with validity
            setPurchasedModules((prev) => [
              ...prev,
              { module: moduleId, validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) },
            ]);
          } else {
            alert("Payment verification failed");
          }
        },
        theme: { color: "#0a93b2" },
      };

      new window.Razorpay(options).open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Something went wrong with payment");
    } finally {
      SetPaymentLoading(false);
    }
  };

  return (
    <div className="cm-products-container">
      <h1 className="cm-module-title">{course.title}</h1>
      <div className="cm-product-grid">
        {course.modules?.map((module) => {
          const discountPrice = module.Discountprice || module.Realprice;
          const isPurchased = isModuleValid(module._id);

          return (
            <div key={module._id} className="cm-product-card">
              <img src={module.Moduleimage} alt={module.title} />
              <p className="cm-module-name">{module.title}</p>

              <div className="cb-cm-price-box">
                <p className="cm-Moduletitle-Realprice">{module.Realprice || "Price not available"} INR/-</p>
                <p className="cm-Moduletitle-Discountprice">{discountPrice} INR/-</p>
              </div>

              <div className="cm-button-box">
                {isPurchased ? (
                  <button
                    className="cm-btn cm-buy-btn"
                    onClick={() => (window.location.href = `/course/${id}/module/${module._id}`)}
                  >
                    Watch Video
                  </button>
                ) : (
                  <button
                    className="cm-btn cm-brochure-btn"
                    disabled={paymentloading}
                    onClick={() => handlePayment(module._id, discountPrice)}
                  >
                    {paymentloading ? "Processing..." : "Buy Now"}
                  </button>
                )}

                <button className="cm-Product-container-button">Brochure</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CourseModule;