// src/pages/Profile.jsx
import React, { useState } from "react";

const Profile = () => {
  const [user, setUser] = useState({
    name: "Saurav Kumar",
    dob: "2001-09-03",
    email: "saurav@example.com",
    phone: "+91 9876543210",
  });

  const [formData, setFormData] = useState(user);
  const [editing, setEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      alert("Name cannot be empty!");
      return;
    }
    setUser(formData);
    setEditing(false);
    alert("Profile updated successfully! ✅");
  };

  const handleCancel = () => {
    setFormData(user);
    setEditing(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-title">👤 My Profile</h2>

        <div className="profile-section">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            disabled={!editing}
            onChange={handleChange}
          />
        </div>

        <div className="profile-section">
          <label>Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            disabled={!editing}
            onChange={handleChange}
          />
        </div>

        <div className="profile-section">
          <label>Email (optional)</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            disabled={!editing}
            onChange={handleChange}
          />
        </div>

        <div className="profile-section">
          <label>Phone</label>
          <input type="text" value={formData.phone} disabled />
        </div>

        <div className="profile-btnBox">
          {editing ? (
            <>
              <button onClick={handleSave} className="profile-saveBtn">
                Save ✅
              </button>
              <button onClick={handleCancel} className="profile-cancelBtn">
                Cancel ❌
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="profile-editBtn"
            >
              Edit ✏️
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
