import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "./OrderTracking.css";

function TrackingDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Simulate fetching order data from backend
    // In real app, this would call: GET /api/orders/{orderId}

    // Simulate API call delay
    setTimeout(() => {
      // Generate mock data for any order ID
      // Extract timestamp from order ID (format: LAF + timestamp)
      const timestamp = orderId.substring(3);
      const orderDate = isNaN(timestamp) ? new Date() : new Date(parseInt(timestamp));

      // Calculate delivery dates
      const deliveryDate = new Date(orderDate);
      deliveryDate.setDate(deliveryDate.getDate() + 3); // 3 days from now

      // Generate mock order data
      const mockOrderData = {
        id: orderId,
        status: "processing",
        items: [
          { name: "Mixed Seasonal Bouquet", quantity: 1, price: "AED 145.00" },
          { name: "Premium Rose Arrangement", quantity: 1, price: "AED 95.00" },
        ],
        total: "AED 240.00",
        deliveryAddress: {
          name: "Customer",
          street: "Delivery Address Street",
          area: "Dubai",
          emirate: "Dubai",
          phone: "+971 50 123 4567",
        },
        estimatedDelivery: deliveryDate.toISOString().split('T')[0],
        orderDate: orderDate.toISOString().split('T')[0],
        timeline: [
          { status: "Order Placed", date: orderDate.toISOString().split('T')[0], completed: true },
          { status: "Processing", date: orderDate.toISOString().split('T')[0], completed: true },
          { status: "Shipped", date: new Date(orderDate.getTime() + 86400000).toISOString().split('T')[0], completed: false },
          { status: "Out for Delivery", date: deliveryDate.toISOString().split('T')[0], completed: false },
          { status: "Delivered", date: deliveryDate.toISOString().split('T')[0], completed: false },
        ],
      };

      // Orders are always found (mock data)
      setOrder(mockOrderData);
      setLoading(false);
    }, 500);
  }, [orderId]);

  if (loading) {
    return (
      <div>
        <Navbar />
        <main className="tracking-page">
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading your order...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <main className="tracking-page">
          <div className="error-state">
            <h2>❌ {error}</h2>
            <button onClick={() => navigate("/tracking")} className="back-btn">
              Back to Search
            </button>
          </div>
        </main>
      </div>
    );
  }

  const statusIndex = order.timeline.findIndex(
    (item) => !item.completed
  );
  const progressPercent = (statusIndex === -1 ? 5 : statusIndex) * 25;

  return (
    <div>
      <Navbar />

      <main className="tracking-page">
        <section className="tracking-hero">
          <h1>Order #{order.id}</h1>
          <p>Placed on {new Date(order.orderDate).toLocaleDateString()}</p>
        </section>

        <div className="tracking-container">
          {/* Status Timeline */}
          <div className="tracking-card timeline-card">
            <h2>Order Status</h2>

            <div className="progress-section">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>

            <div className="timeline">
              {order.timeline.map((item, index) => (
                <div
                  key={index}
                  className={`timeline-item ${
                    item.completed ? "completed" : "pending"
                  }`}
                >
                  <div className="timeline-circle"></div>
                  <div className="timeline-content">
                    <h4>{item.status}</h4>
                    <p>{new Date(item.date).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="status-estimate">
              <p>
                📦 <strong>Estimated Delivery:</strong>{" "}
                {new Date(order.estimatedDelivery).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Delivery Details */}
          <div className="tracking-card">
            <h2>Delivery Details</h2>
            <div className="delivery-info">
              <div className="info-item">
                <label>📍 Delivery Address</label>
                <p>
                  {order.deliveryAddress.street}
                  <br />
                  {order.deliveryAddress.area}
                  <br />
                  {order.deliveryAddress.emirate}
                </p>
              </div>

              <div className="info-item">
                <label>👤 Recipient Name</label>
                <p>{order.deliveryAddress.name}</p>
              </div>

              <div className="info-item">
                <label>📱 Contact Number</label>
                <p>{order.deliveryAddress.phone}</p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="tracking-card">
            <h2>Order Items</h2>
            <div className="items-list">
              {order.items.map((item, index) => (
                <div key={index} className="item-row">
                  <span className="item-name">{item.name}</span>
                  <span className="item-qty">×{item.quantity}</span>
                  <span className="item-price">{item.price}</span>
                </div>
              ))}
              <div className="items-divider"></div>
              <div className="item-row total-row">
                <span className="item-total">Total</span>
                <span className="item-total-price">{order.total}</span>
              </div>
            </div>
          </div>

          {/* Support */}
          <div className="tracking-card support-card">
            <h3>Need Help?</h3>
            <p>
              If you have any questions about your order, please contact us at{" "}
              <strong>lafioregardens@gmail.com</strong> or call{" "}
              <strong>+971 50 123 4567</strong>
            </p>
          </div>

          {/* Actions */}
          <div className="tracking-actions">
            <button onClick={() => navigate("/tracking")} className="search-again-btn">
              Track Another Order
            </button>
            <button onClick={() => navigate("/shop")} className="continue-shopping-btn">
              Continue Shopping
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default TrackingDetails;
