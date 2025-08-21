import React from "react";

const ManageOrders = () => {
  const orders = [
    { id: 101, customer: "Ayesha", product: "Rose Bouquet", status: "Pending" },
    {
      id: 102,
      customer: "Rohan",
      product: "Wedding Flowers",
      status: "Delivered",
    },
  ];

  return (
    <div>
      <h2>Manage Orders</h2>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Status</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.customer}</td>
              <td>{o.product}</td>
              <td>{o.status}</td>
              <td>
                <button className="btn btn-success btn-sm">
                  Mark Delivered
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageOrders;
