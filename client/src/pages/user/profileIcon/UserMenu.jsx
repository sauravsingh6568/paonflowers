// src/components/UserMenu.jsx
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const UserMenu = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const handleLogout = () => {
    setIsAuthenticated(false);
    alert("Logged out successfully!");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="user-menu" ref={menuRef} style={{ position: "relative" }}>
      {/* Profile Icon */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: "22px",
        }}
      >
        <img src="/images/profile.png" alt="profile" />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "40px",
            right: 0,
            background: "#fff",
            boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
            borderRadius: "6px",
            width: "180px",
            padding: "10px",
            zIndex: 100,
          }}
        >
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="dropdown-item  btn-pink">
                👤 My Profile
              </Link>
              <Link to="/orders" className="dropdown-item  btn-pink">
                📦 My Orders
              </Link>
              <button
                onClick={handleLogout}
                className="dropdown-item  btn-pink "
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="dropdown-item btn-pink ">
                Login
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu;
