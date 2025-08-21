import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const OtpVerification = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Fake delay to simulate animation
    setTimeout(() => {
      setLoading(false);
      navigate("/order-success");
    }, 2000);
  };

  return (
    <div className="otp-verification container text-center py-5">
      <h2 className="mb-4">Enter OTP</h2>
      <p className="text-muted">We've sent an OTP to your phone</p>

      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column align-items-center mt-4"
      >
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="form-control otp-input mb-3"
          maxLength="6"
          placeholder="Enter 6-digit OTP"
          required
        />

        <button type="submit" className="btn btn-dark" disabled={loading}>
          {loading ? (
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
            />
          ) : null}
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>
    </div>
  );
};

export default OtpVerification;
