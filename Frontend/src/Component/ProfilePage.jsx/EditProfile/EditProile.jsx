import React, { useState } from "react";
import "./EditProfile.css";

const EditProfile = ({ user = {}, onClose, onSave }) => {
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [profilePic, setProfilePic] = useState(user.profilePic || "https://randomuser.me/api/portraits/women/44.jpg");

  const handleSave = () => {
    onSave({ name, email, profilePic });
    onClose();
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfilePic(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="ep-overlay">
      <div className="ep-modal">
        <h2 className="ep-title">Edit Profile</h2>

        <div className="ep-profile-pic-section">
          <img src={profilePic} alt="Profile" className="ep-profile-img" />
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePicChange}
            className="ep-file-input"
          />
        </div>

        <div className="ep-form">
          <label className="ep-label">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="ep-input"
          />

          <label className="ep-label">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="ep-input"
          />
        </div>

        <div className="ep-buttons">
          <button className="ep-btn-save" onClick={handleSave}>
            Save
          </button>
          <button className="ep-btn-cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;