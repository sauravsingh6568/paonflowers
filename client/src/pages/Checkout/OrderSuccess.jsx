import React from "react";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="order-success text-center py-5">
      <div className="checkmark-animation mb-4">✅</div>
      <h2 className="mb-3">Thank You for Your Order!</h2>
      <p className="text-muted mb-4">Your flowers will be delivered soon 💐</p>

      <Link to="/" className="btn btn-dark">
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderSuccess;
