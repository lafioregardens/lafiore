import Navbar from "../../components/Navbar";
import AdminSidebar from "./AdminSidebar";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import api from "../../utils/api";
import "./AdminPages.css";

function AdminOrders() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await api.get("/admin/orders");
        const allOrders = response.data.data || [];
        setOrders(allOrders);
        setFilteredOrders(allOrders);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === "admin") {
      fetchOrders();
    }
  }, [user]);

  const handleFilterChange = (status) => {
    setFilter(status);
    if (status === "All") {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter(order => order.status === status));
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await api.put(`/admin/orders/${orderId}/status`, { status: newStatus });
      // Refresh orders
      const response = await api.get("/admin/orders");
      const allOrders = response.data.data || [];
      setOrders(allOrders);
      if (filter === "All") {
        setFilteredOrders(allOrders);
      } else {
        setFilteredOrders(allOrders.filter(order => order.status === filter));
      }
      alert("✅ Order status updated");
    } catch (err) {
      alert("❌ Failed to update order: " + err.message);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (value) => {
    return `AED ${value?.toFixed(2) || '0.00'}`;
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return '#d4f1d4';
      case 'Shipped': return '#d4e8f1';
      case 'Processing': return '#fff3cd';
      case 'Cancelled': return '#f8d7da';
      default: return '#f0f0f0';
    }
  };

  return (
    <div>
      <Navbar />

      <main className="admin-page">
        <AdminSidebar />

        <section className="admin-content">
          <h1>Orders Management</h1>

          <div className="admin-filters">
            <button
              className={`filter-btn ${filter === "All" ? "filter-btn--active" : ""}`}
              onClick={() => handleFilterChange("All")}
            >
              All ({orders.length})
            </button>
            <button
              className={`filter-btn ${filter === "Processing" ? "filter-btn--active" : ""}`}
              onClick={() => handleFilterChange("Processing")}
            >
              Processing
            </button>
            <button
              className={`filter-btn ${filter === "Shipped" ? "filter-btn--active" : ""}`}
              onClick={() => handleFilterChange("Shipped")}
            >
              Shipped
            </button>
            <button
              className={`filter-btn ${filter === "Delivered" ? "filter-btn--active" : ""}`}
              onClick={() => handleFilterChange("Delivered")}
            >
              Delivered
            </button>
            <button
              className={`filter-btn ${filter === "Cancelled" ? "filter-btn--active" : ""}`}
              onClick={() => handleFilterChange("Cancelled")}
            >
              Cancelled
            </button>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <p>Loading orders...</p>
            </div>
          ) : error ? (
            <div style={{ color: 'red', padding: '20px' }}>
              <p>Error: {error}</p>
            </div>
          ) : (
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
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                      <tr key={order._id}>
                        <td><strong>{order.orderId}</strong></td>
                        <td>{order.customer?.name || 'N/A'}</td>
                        <td>{order.items?.length || 0} item(s)</td>
                        <td>{formatCurrency(order.total)}</td>
                        <td>
                          <span style={{
                            padding: '5px 10px',
                            borderRadius: '20px',
                            backgroundColor: getStatusColor(order.status),
                            fontSize: '12px',
                            fontWeight: 'bold',
                          }}>
                            {order.status}
                          </span>
                        </td>
                        <td>{formatDate(order.createdAt)}</td>
                        <td>
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                            style={{
                              padding: '5px',
                              borderRadius: '4px',
                              border: '1px solid #ccc',
                              cursor: 'pointer',
                            }}
                          >
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="empty-state">
                        No orders found. Go to dashboard and click "Seed Demo Data" to create sample orders.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default AdminOrders;
