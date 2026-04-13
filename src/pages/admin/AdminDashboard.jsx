import Navbar from "../../components/Navbar";
import AdminSidebar from "./AdminSidebar";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import api from "../../utils/api";
import "./AdminPages.css";

function AdminDashboard() {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        setLoading(true);
        // Fetch stats
        const statsResponse = await api.get("/admin/stats");
        setStats(statsResponse.data.data);

        // Fetch recent orders
        const ordersResponse = await api.get("/admin/orders");
        setOrders(ordersResponse.data.data?.slice(0, 5) || []);

        setError(null);
      } catch (err) {
        console.error("Failed to fetch admin data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === "admin") {
      fetchAdminData();
    }
  }, [user]);

  const seedDatabase = async () => {
    try {
      const response = await api.post("/admin/seed");
      alert("✅ Database seeded successfully! Refresh to see new data.");
      // Refresh stats
      const statsResponse = await api.get("/admin/stats");
      setStats(statsResponse.data.data);
      const ordersResponse = await api.get("/admin/orders");
      setOrders(ordersResponse.data.data?.slice(0, 5) || []);
    } catch (err) {
      alert("❌ Seeding failed: " + err.message);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div>
      <Navbar />

      <main className="admin-page">
        <AdminSidebar />

        <section className="admin-content">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1>Dashboard</h1>
            <button
              onClick={seedDatabase}
              style={{
                padding: '10px 20px',
                background: '#d4a5a5',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              🌱 Seed Demo Data
            </button>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <p>Loading stats...</p>
            </div>
          ) : error ? (
            <div style={{ color: 'red', padding: '20px' }}>
              <p>Error: {error}</p>
            </div>
          ) : stats ? (
            <>
              <div className="dashboard-stats">
                <div className="stat-card">
                  <h3>Total Orders</h3>
                  <p className="stat-value">{stats.totalOrders || 0}</p>
                  <span className="stat-label">All time</span>
                </div>

                <div className="stat-card">
                  <h3>Total Revenue</h3>
                  <p className="stat-value">{formatCurrency(stats.revenue || 0)}</p>
                  <span className="stat-label">All time</span>
                </div>

                <div className="stat-card">
                  <h3>Total Customers</h3>
                  <p className="stat-value">{stats.customers || 0}</p>
                  <span className="stat-label">Registered</span>
                </div>

                <div className="stat-card">
                  <h3>Pending Orders</h3>
                  <p className="stat-value">{stats.pending || 0}</p>
                  <span className="stat-label">Processing</span>
                </div>
              </div>

              <div className="dashboard-section">
                <h2>Recent Orders</h2>
                {orders.length > 0 ? (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ borderBottom: '2px solid #eee' }}>
                          <th style={{ padding: '10px', textAlign: 'left' }}>Order ID</th>
                          <th style={{ padding: '10px', textAlign: 'left' }}>Customer</th>
                          <th style={{ padding: '10px', textAlign: 'left' }}>Total</th>
                          <th style={{ padding: '10px', textAlign: 'left' }}>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => (
                          <tr key={order._id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                            <td style={{ padding: '10px' }}>{order.orderId}</td>
                            <td style={{ padding: '10px' }}>{order.customer?.name || 'N/A'}</td>
                            <td style={{ padding: '10px' }}>{formatCurrency(order.total)}</td>
                            <td style={{ padding: '10px' }}>
                              <span style={{
                                padding: '5px 10px',
                                borderRadius: '20px',
                                fontSize: '12px',
                                fontWeight: 'bold',
                                backgroundColor: order.status === 'Delivered' ? '#d4f1d4' :
                                  order.status === 'Shipped' ? '#d4e8f1' :
                                  order.status === 'Processing' ? '#fff3cd' : '#f8d7da',
                                color: order.status === 'Delivered' ? '#155724' :
                                  order.status === 'Shipped' ? '#004085' :
                                  order.status === 'Processing' ? '#856404' : '#721c24',
                              }}>
                                {order.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="empty-state">
                    <p>No orders yet. Click "Seed Demo Data" to create sample orders.</p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <p>No data available</p>
            </div>
          )}

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
