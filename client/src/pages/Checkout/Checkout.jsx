import React, { useState } from "react";
import { useCart } from "../../context/CartContext";

const Checkout = () => {
  const { state } = useCart();
  const cartItems = state?.cart || [];

  const [paymentMethod, setPaymentMethod] = useState("card");

  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div className="container py-5">
      <h2 className="text-center elegant-heading mb-4">🌸 Checkout</h2>

      <div className="row">
        {/* Billing Form */}
        <div className="col-md-6 mb-4">
          <h4 className="mb-3">Billing Information</h4>
          <form>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your full name"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="you@example.com"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Shipping Address</label>
              <textarea
                className="form-control"
                rows="3"
                placeholder="Your address..."
              ></textarea>
            </div>

            {/* Payment Method */}
            <h5 className="mt-4">Payment Method</h5>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                value="card"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
              />
              <label className="form-check-label">Credit/Debit Card</label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                value="upi"
                checked={paymentMethod === "upi"}
                onChange={() => setPaymentMethod("upi")}
              />
              <label className="form-check-label">UPI</label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
              />
              <label className="form-check-label">Cash on Delivery</label>
            </div>

            {/* Conditional Payment Input */}
            {paymentMethod === "card" && (
              <div className="mt-3">
                <label className="form-label">Card Details</label>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Card Number"
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="MM/YY"
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="CVV"
                />
              </div>
            )}

            {paymentMethod === "upi" && (
              <div className="mt-3">
                <label className="form-label">UPI ID</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="example@upi"
                />
              </div>
            )}
          </form>
        </div>

        {/* Order Summary */}
        <div className="col-md-6">
          <h4 className="mb-3">Order Summary</h4>
          <div className="list-group mb-3 shadow-sm">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <h6 className="my-0">{item.name}</h6>
                  <small className="text-muted">₹{item.price}</small>
                </div>
                <span>₹{item.price}</span>
              </div>
            ))}
            <div className="list-group-item d-flex justify-content-between">
              <strong>Total</strong>
              <strong>₹{totalAmount}</strong>
            </div>
          </div>

          <button className="btn btn-pink w-100">Place Order</button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
