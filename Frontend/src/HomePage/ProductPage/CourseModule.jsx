<<<<<<< HEAD
import { useParams, useNavigate } from "react-router-dom";
=======
import { useParams } from "react-router-dom";
>>>>>>> 42eae80c144738479691a32c1b7ab090dbef131c
import { useEffect, useState } from "react";
import "./Productstyle.css";

function CourseModule() {
  const { id } = useParams();
<<<<<<< HEAD
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentloading, setPaymentLoading] = useState(false);
  const [purchasedModules, setPurchasedModules] = useState([]);

  // Fetch course + user purchased modules
=======
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentloading, SetPaymentLoading] = useState(false)

  // Track purchased modules with validity
  const [purchasedModules, setPurchasedModules] = useState([]);



  // 1️⃣ Fetch course + user purchased modules
>>>>>>> 42eae80c144738479691a32c1b7ab090dbef131c
  useEffect(() => {
    const fetchCourseAndPurchases = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch course modules
<<<<<<< HEAD
        const courseRes = await fetch(
          `http://localhost:5000/api/v1/Courses/module/${id}`
        );
=======
        const courseRes = await fetch(`http://localhost:5000/api/v1/Courses/module/${id}`);
>>>>>>> 42eae80c144738479691a32c1b7ab090dbef131c
        const courseData = await courseRes.json();
        setCourse(courseData);

        // Fetch user's purchased modules
        if (token) {
<<<<<<< HEAD
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
=======
          const userRes = await fetch("http://localhost:5000/api/v1/UserLoginSignup/profile", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const userData = await userRes.json();
          setPurchasedModules(userData.purchasedModules || []);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
>>>>>>> 42eae80c144738479691a32c1b7ab090dbef131c
      } finally {
        setLoading(false);
      }
    };
<<<<<<< HEAD

=======
>>>>>>> 42eae80c144738479691a32c1b7ab090dbef131c
    fetchCourseAndPurchases();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!course) return <p>Course not found</p>;

<<<<<<< HEAD
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
=======
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
>>>>>>> 42eae80c144738479691a32c1b7ab090dbef131c
        amount: orderData.order.amount,
        currency: "INR",
        name: "Grow All Coaching",
        description: "Module Purchase",
<<<<<<< HEAD
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
=======
        image: "https://res.cloudinary.com/dieboinjz/image/upload/v1772387672/GacImages/cjgywtxrv1g6etyve2rl.jpg", 
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
>>>>>>> 42eae80c144738479691a32c1b7ab090dbef131c
    } catch (error) {
      console.error("Payment error:", error);
      alert("Something went wrong with payment");
    } finally {
<<<<<<< HEAD
      setPaymentLoading(false);
=======
      SetPaymentLoading(false);
>>>>>>> 42eae80c144738479691a32c1b7ab090dbef131c
    }
  };

  return (
    <div className="cm-products-container">
      <h1 className="cm-module-title">{course.title}</h1>
      <div className="cm-product-grid">
        {course.modules?.map((module) => {
          const discountPrice = module.Discountprice || module.Realprice;
<<<<<<< HEAD

          // ✅ Check purchased module & expiry
          const purchasedModule = getPurchasedModule(module._id);
          const stillValid =
            purchasedModule &&
            new Date() <= new Date(purchasedModule.expiryDate);
=======
          const isPurchased = isModuleValid(module._id);
>>>>>>> 42eae80c144738479691a32c1b7ab090dbef131c

          return (
            <div key={module._id} className="cm-product-card">
              <img src={module.Moduleimage} alt={module.title} />
              <p className="cm-module-name">{module.title}</p>

              <div className="cb-cm-price-box">
<<<<<<< HEAD
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
=======
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
>>>>>>> 42eae80c144738479691a32c1b7ab090dbef131c
                ) : (
                  <button
                    className="cm-btn cm-brochure-btn"
                    disabled={paymentloading}
<<<<<<< HEAD
                    onClick={() => handlePayment(module._id)}
=======
                    onClick={() => handlePayment(module._id, discountPrice)}
>>>>>>> 42eae80c144738479691a32c1b7ab090dbef131c
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