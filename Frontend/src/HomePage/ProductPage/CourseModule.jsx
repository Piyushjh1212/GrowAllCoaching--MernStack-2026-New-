import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Productstyle.css";

function CourseModule() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentloading, setPaymentLoading] = useState(false);
  const [purchasedModules, setPurchasedModules] = useState([]);

  // Fetch course + user purchased modules
  useEffect(() => {
    const fetchCourseAndPurchases = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch course modules
        const courseRes = await fetch(
          `http://localhost:5000/api/v1/Courses/module/${id}`
        );
        const courseData = await courseRes.json();
        setCourse(courseData);

        // Fetch user's purchased modules
        if (token) {
          const userRes = await fetch(
            "http://localhost:5000/api/v1/UserLoginSignup/profile",
            {
              method: "GET", // explicitly GET
              headers: {
                "Content-Type": "application/json", // ✅ add this
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const userData = await userRes.json();

          // check for auth error
          if (userRes.status === 401) {
            console.log("Not authorized, token invalid or expired");
            // optional: redirect to login
            navigate("/login");
            return;
          }

          setPurchasedModules(userData.purchasedModules || []);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseAndPurchases();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!course) return <p>Course not found</p>;

  // ✅ Helper: get purchase info for a module
  const getPurchasedModule = (moduleId) => {
    return purchasedModules.find(
      (m) => m.module?.toString() === moduleId?.toString()
    );
  };

  // Payment handler
  const handlePayment = async (moduleId) => {
    if (paymentloading) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first!");
      return;
    }

    try {
      setPaymentLoading(true);

      // 1️⃣ Create order in backend
      const orderRes = await fetch(
        "http://localhost:5000/api/v1/Razorpay/createPayment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ moduleId }),
        }
      );

      const orderData = await orderRes.json();

      if (!orderData.success) {
        alert(orderData.message || "Payment creation failed");
        return;
      }

      // 2️⃣ Razorpay options
      const options = {
        key: orderData.key,
        amount: orderData.order.amount,
        currency: "INR",
        name: "Grow All Coaching",
        description: "Module Purchase",
        image:
          "https://res.cloudinary.com/dieboinjz/image/upload/v1772387672/GacImages/cjgywtxrv1g6etyve2rl.jpg",
        order_id: orderData.order.id,

        // Payment success
        handler: async (response) => {
          try {
            const verifyRes = await fetch(
              "http://localhost:5000/api/v1/Razorpay/verifyPayment",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ ...response, moduleId }),
              }
            );

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              alert("Payment Successful 🎉");

              const expiryDate = new Date(
                Date.now() + 30 * 24 * 60 * 60 * 1000
              );

              setPurchasedModules((prev) => [
                ...prev,
                { module: moduleId, expiryDate },
              ]);
            } else {
              alert("Payment verification failed");
            }
          } catch (err) {
            console.error("Verify error:", err);
          }
        },

        // Modal dismiss (user cancelled)
        modal: {
          ondismiss: async () => {
            await fetch(
              "http://localhost:5000/api/v1/Razorpay/paymentFailed",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ orderId: orderData.order.id }),
              }
            );
            console.log("Payment cancelled");
          },
        },

        prefill: { name: "User" },
        theme: { color: "#0a93b2" },
      };

      const rzp = new window.Razorpay(options);

      // Payment failed event
      rzp.on("payment.failed", async function () {
        await fetch("http://localhost:5000/api/v1/Razorpay/paymentFailed", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ orderId: orderData.order.id }),
        });

        alert("Payment Failed ❌");
      });

      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Something went wrong with payment");
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <div className="cm-products-container">
      <h1 className="cm-module-title">{course.title}</h1>
      <div className="cm-product-grid">
        {course.modules?.map((module) => {
          const discountPrice = module.Discountprice || module.Realprice;

          // ✅ Check purchased module & expiry
          const purchasedModule = getPurchasedModule(module._id);
          const stillValid =
            purchasedModule &&
            new Date() <= new Date(purchasedModule.expiryDate);

          return (
            <div key={module._id} className="cm-product-card">
              <img src={module.Moduleimage} alt={module.title} />
              <p className="cm-module-name">{module.title}</p>

              <div className="cb-cm-price-box">
                <p className="cm-Moduletitle-Realprice">
                  {module.Realprice} INR/-
                </p>
                <p className="cm-Moduletitle-Discountprice">
                  {discountPrice} INR/-
                </p>
              </div>

              <div className="cm-button-box">
                {stillValid ? (
                  <button
                    className="cm-btn cm-buy-btn"
                    onClick={() =>
                      navigate(`/course/${id}/module/${module._id}`)
                    }
                  >
                    Watch Video
                  </button>
                ) : purchasedModule ? (
                  <button className="cm-btn cm-expired-btn">
                    Expired - Buy Again
                  </button>
                ) : (
                  <button
                    className="cm-btn cm-brochure-btn"
                    disabled={paymentloading}
                    onClick={() => handlePayment(module._id)}
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