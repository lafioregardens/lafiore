import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./OrderTracking.css";

function OrderTracking() {
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState("");
  const [error, setError] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setError("");

    if (!orderId.trim()) {
      setError("Please enter an order ID");
      return;
    }

    // Navigate to tracking details page
    navigate(`/tracking/${orderId.trim()}`);
  };

  return (
    <div>
      <Navbar />

      <main className="tracking-page">
        <section className="tracking-hero">
          <h1>Track Your Order</h1>
          <p>Enter your order ID to see the status and estimated delivery date</p>
        </section>

        <div className="tracking-container">
          <div className="tracking-search-box">
            <form onSubmit={handleSearch} className="tracking-form">
              <div className="form-group">
                <label htmlFor="orderId">Order ID</label>
                <input
                  id="orderId"
                  type="text"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="e.g., LAF1234567890"
                  className="tracking-input"
                  autoFocus
                />
                <small className="help-text">
                  You can find your order ID in your confirmation email
                </small>
              </div>

              {error && <div className="error-message">{error}</div>}

              <button type="submit" className="search-btn">
                Track Order
              </button>
            </form>

            {/* Info Section */}
            <div className="tracking-info">
              <h3>How to find your Order ID?</h3>
              <ul>
                <li>📧 Check your confirmation email</li>
                <li>🎁 It starts with "LAF" followed by numbers</li>
                <li>📱 You'll need it to track your delivery</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default OrderTracking;
