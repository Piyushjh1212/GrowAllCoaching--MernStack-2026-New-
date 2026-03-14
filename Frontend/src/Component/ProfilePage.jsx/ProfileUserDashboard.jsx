<<<<<<< HEAD
import React, { useEffect, useState } from "react";
=======
import React, { useState } from "react";
>>>>>>> 42eae80c144738479691a32c1b7ab090dbef131c
import "./UserDashboard.css";
import EditProfile from "./EditProfile/EditProile";

const courses = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    progress: 65,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475"
  },
  {
    id: 2,
    title: "Advanced React & TypeScript",
    progress: 40,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee"
  },
  {
    id: 3,
    title: "UI/UX Design Masterclass",
    progress: 90,
    image: "https://images.unsplash.com/photo-1559028012-481c04fa702d"
  }
];

const UserDashboard = () => {
  const [showEditModal, setShowEditModal] = useState(false);
<<<<<<< HEAD
  const [user, setUser ] = useState({});

  useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/v1/UserLoginSignup/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      const data = await res.json();

      if (res.ok) {
        setUser({
          name: data.name,
          email: data.email,
          profilePic: data.profilePic,
          JoiningDate: data.JoiningDate
          
        });
      }

    } catch (error) {
      console.error(error);
    }
  };

  fetchUser();
}, []);
=======

  const [user, setUser] = useState({
    name: "Sarah Johnson",
    email: "Sarah.johnson@example.com",
    profilePic: "https://randomuser.me/api/portraits/women/44.jpg"
  });
>>>>>>> 42eae80c144738479691a32c1b7ab090dbef131c

  return (
    <div className="ud-dashboard">

      {/* LEFT PROFILE PANEL */}
      <div className="ud-profile-panel">

        <div className="ud-profile-card">
          <img
<<<<<<< HEAD
            src={user.profilePic || "https://tse4.mm.bing.net/th/id/OIP.FkQDxKdriMvRdcRm9X7ZFAHaHX?rs=1&pid=ImgDetMain&o=7&rm=3"}
=======
            src={user.profilePic}
>>>>>>> 42eae80c144738479691a32c1b7ab090dbef131c
            alt="profile"
            className="ud-profile-img"
          />
          <h2 className="ud-profile-name">{user.name}</h2>
          <p className="ud-profile-email">{user.email}</p>

          {/* Button to open modal */}
          <button
            className="ud-edit-btn"
            onClick={() => setShowEditModal(true)}
          >
            Edit Profile
          </button>
        </div>

        <div className="ud-info-card">
          <p className="ud-info-title">Joined</p>
<<<<<<< HEAD
          <h4 className="ud-info-value">
            {user.JoiningDate || "Loading..."}
          </h4>
=======
          <h4 className="ud-info-value">Jan 15, 2024</h4>
>>>>>>> 42eae80c144738479691a32c1b7ab090dbef131c
        </div>

        <div className="ud-info-card">
          <p className="ud-info-title">Courses Purchased</p>
          <h4 className="ud-info-value">3</h4>
        </div>

        <div className="ud-info-card">
          <p className="ud-info-title">Account Status</p>
          <h4 className="ud-info-value active">Active</h4>
        </div>

      </div>

      {/* RIGHT COURSES PANEL */}
      <div className="ud-courses-panel">
        <h1 className="ud-section-title">My Purchased Courses</h1>

        <div className="ud-courses-grid">
          {courses.map((course) => (
            <div className="ud-course-card" key={course.id}>
              <img
                src={course.image}
                alt={course.title}
                className="ud-course-img"
              />
              <div className="ud-course-content">
                <h3 className="ud-course-title">{course.title}</h3>

                <div className="ud-progress-bar">
                  <div
                    className="ud-progress-fill"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>

                <p className="ud-course-progress">{course.progress}% Complete</p>

                <button className="ud-watch-btn">▶ Watch Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <EditProfile
          user={user}
          onClose={() => setShowEditModal(false)}
          onSave={(updatedUser) => setUser(updatedUser)}
        />
      )}
    </div>
  );
};

export default UserDashboard;