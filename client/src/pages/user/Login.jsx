import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/AuthForm";
import { useAuth } from "../../context/AuthContext"; // Use the custom hook

const Login = () => {
  const { login } = useAuth(); // cleaner and reusable
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dummy login logic (can replace with real API call later)
    if (
      formData.email === "user@example.com" &&
      formData.password === "password"
    ) {
      login({ email: formData.email });
      navigate("/");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <AuthForm
      type="login"
      formData={formData}
      setFormData={setFormData}
      onSubmit={handleSubmit}
      error={error}
    />
  );
};

export default Login;
