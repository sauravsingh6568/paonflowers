import React, { useState } from "react";

const ManageProducts = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Rose Bouquet", price: 50 },
    { id: 2, name: "Tulip Basket", price: 80 },
  ]);

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div>
      <h2>Manage Products</h2>
      <button className="btn btn-primary mb-3">+ Add Product</button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Flower Name</th>
            <th>Price ($)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2">Edit</button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(p.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProducts;
