import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./OrderTracking.css";

function TrackingDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setTimeout(() => {
      // Look up order in localStorage
      const savedOrders = JSON.parse(localStorage.getItem("lafiore-orders") || "{}");
      const foundOrder = savedOrders[orderId];

      if (foundOrder) {
        setOrder(foundOrder);
      } else {
        setError("Order not found. Please check your order ID.");
      }
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

  const statusIndex = order.timeline.findIndex((item) => !item.completed);
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
                  className={`timeline-item ${item.completed ? "completed" : "pending"}`}
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
                  {order.deliveryAddress.street}<br />
                  {order.deliveryAddress.area}<br />
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
              {order.deliveryTime && (
                <div className="info-item">
                  <label>🕐 Delivery Time Slot</label>
                  <p style={{ textTransform: "capitalize" }}>{order.deliveryTime}</p>
                </div>
              )}
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
              <div className="item-row">
                <span className="item-total">Subtotal</span>
                <span className="item-total-price">AED {order.subtotal?.toFixed(2) || '0.00'}</span>
              </div>
              <div className="item-row">
                <span className="item-total">Delivery Charge</span>
                <span className="item-total-price">
                  {order.deliveryCharge === 0 ? "FREE" : `AED ${order.deliveryCharge?.toFixed(2) || '0.00'}`}
                </span>
              </div>
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

      <Footer />
    </div>
  );
}

export default TrackingDetails;
