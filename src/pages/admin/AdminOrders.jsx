import Navbar from "../../components/Navbar";
import AdminSidebar from "./AdminSidebar";
import "./AdminPages.css";

function AdminOrders() {
  return (
    <div>
      <Navbar />

      <main className="admin-page">
        <AdminSidebar />

        <section className="admin-content">
          <h1>Orders Management</h1>

          <div className="admin-filters">
            <button className="filter-btn filter-btn--active">All</button>
            <button className="filter-btn">Processing</button>
            <button className="filter-btn">Shipped</button>
            <button className="filter-btn">Delivered</button>
            <button className="filter-btn">Cancelled</button>
          </div>

          <div className="admin-table">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="7" className="empty-state">
                    No orders yet
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="admin-note">📌 Orders will appear here once your backend is ready</p>
        </section>
      </main>
    </div>
  );
}

export default AdminOrders;
