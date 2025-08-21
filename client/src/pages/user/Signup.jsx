import React, { useState } from "react";
import AuthForm from "../../components/AuthForm";
import { useAuth } from "../../context/AuthContext"; // ✅
import { useNavigate } from "react-router-dom"; // ✅

const Signup = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSignup = (e) => {
    e.preventDefault();

    // Dummy signup logic
    console.log("Signing up:", formData);

    login({ name: formData.name, email: formData.email }); // ✅
    navigate("/"); // Redirect after signup
  };

  return (
    <AuthForm
      type="signup"
      formData={formData}
      setFormData={setFormData}
      onSubmit={handleSignup}
    />
  );
};

export default Signup;
