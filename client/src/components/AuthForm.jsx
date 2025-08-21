import React from "react";
import { Link } from "react-router-dom";

const AuthForm = ({ type, onSubmit, formData, setFormData }) => {
  const isLogin = type === "login";

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isLogin ? "Welcome Back 🌸" : "Create Account 🌸"}</h2>
        <form onSubmit={onSubmit} className="auth-form">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
          <button type="submit">{isLogin ? "Login" : "Signup"}</button>
        </form>

        <p className="auth-switch">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <Link to={isLogin ? "/signup" : "/login"}>
            {isLogin ? "Sign up" : "Log in"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
