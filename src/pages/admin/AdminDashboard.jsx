import Navbar from "../../components/Navbar";
import AdminSidebar from "./AdminSidebar";
import "./AdminPages.css";

function AdminDashboard() {
  return (
    <div>
      <Navbar />

      <main className="admin-page">
        <AdminSidebar />

        <section className="admin-content">
          <h1>Dashboard</h1>

          <div className="dashboard-stats">
            <div className="stat-card">
              <h3>Total Orders</h3>
              <p className="stat-value">—</p>
              <span className="stat-label">Coming soon</span>
            </div>

            <div className="stat-card">
              <h3>Total Revenue</h3>
              <p className="stat-value">—</p>
              <span className="stat-label">Coming soon</span>
            </div>

            <div className="stat-card">
              <h3>Total Customers</h3>
              <p className="stat-value">—</p>
              <span className="stat-label">Coming soon</span>
            </div>

            <div className="stat-card">
              <h3>Pending Orders</h3>
              <p className="stat-value">—</p>
              <span className="stat-label">Coming soon</span>
            </div>
          </div>

          <div className="dashboard-section">
            <h2>Recent Orders</h2>
            <div className="empty-state">
              <p>No orders yet</p>
            </div>
          </div>

          <div className="dashboard-links">
            <h2>Quick Navigation</h2>
            <ul>
              <li><a href="/admin/inventory">Manage Inventory</a></li>
              <li><a href="/admin/orders">View Orders</a></li>
              <li><a href="/admin/customers">Customer Messages</a></li>
              <li><a href="/admin/stats">View Stats</a></li>
              <li><a href="/admin/notifications">Send Notifications</a></li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;
