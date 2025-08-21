import React from "react";
import { Link, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard d-flex">
      {/* Sidebar */}
      <aside className="admin-sidebar p-3">
        <h3 className="text-center text-white">🌸 Paon Admin</h3>
        <nav>
          <ul className="list-unstyled">
            <li>
              <Link to="/admin/products">Manage Products</Link>
            </li>
            <li>
              <Link to="/admin/orders">Manage Orders</Link>
            </li>
            <li>
              <Link to="/admin/offers">Manage Offers</Link>
            </li>
            <li>
              <Link to="/admin/delivery">Delivery Status</Link>
            </li>
            <li>
              <Link to="/admin/customers">Customers</Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="admin-content p-4 w-100">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
