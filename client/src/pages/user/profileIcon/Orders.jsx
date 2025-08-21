// src/pages/Orders.jsx
import React from "react";

const Orders = () => {
  const orders = [
    {
      id: "ORD12345",
      date: "2025-08-10",
      items: "Apples, Bananas",
      status: "Delivered",
      total: "₹450",
    },
    {
      id: "ORD12346",
      date: "2025-08-12",
      items: "Tomatoes, Potatoes",
      status: "Shipped",
      total: "₹320",
    },
    {
      id: "ORD12347",
      date: "2025-08-14",
      items: "Mangoes",
      status: "Pending",
      total: "₹150",
    },
  ];

  return (
    <div className="orders-container">
      <h2 className="orders-title">📦 My Orders</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Items</th>
            <th>Status</th>
            <th>Total</th>
            <th>Invoice</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.date}</td>
              <td>{order.items}</td>
              <td>
                <span className={`status ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </td>
              <td>{order.total}</td>
              <td>
                <button
                  className="invoice-btn"
                  onClick={() => alert(`Invoice for ${order.id}`)}
                >
                  View 🧾
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
