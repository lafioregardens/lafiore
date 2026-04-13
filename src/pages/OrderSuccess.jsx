import { useSearchParams, Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { CartContext } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import "./Checkout.css";

function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const { cartItems, clearCart } = useContext(CartContext);
  const { t } = useLanguage();
  const [orderItems, setOrderItems] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0);
  const orderId = searchParams.get("id") || "LAF" + Date.now();

  // Store order data and clear cart on mount
  useEffect(() => {
    if (cartItems.length > 0) {
      // Store items before clearing
      setOrderItems(cartItems);

      // Calculate total
      const total = cartItems.reduce((sum, item) => {
        const numericPrice = Number(item.price.replace("AED", "").trim());
        return sum + numericPrice * item.quantity;
      }, 0);
      setOrderTotal(total);

      // Clear cart
      clearCart();
    }
  }, []);

  return (
    <div>
      <Navbar />

      <main className="order-success-page">
        <div className="success-container">
          {/* Checkmark Animation */}
          <div className="success-animation">
            <div className="success-circle">
              <svg
                className="success-checkmark"
                viewBox="0 0 52 52"
              >
                <circle
                  cx="26"
                  cy="26"
                  r="25"
                  fill="none"
                  stroke="var(--green-main)"
                  strokeWidth="2"
                />
                <path
                  fill="none"
                  stroke="var(--green-main)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  d="M14.1 27.2l7.1 7.2 16.7-16.8"
                  strokeDasharray="48"
                  strokeDashoffset="48"
                  className="checkmark"
                />
              </svg>
            </div>
          </div>

          {/* Success Content */}
          <div className="success-content">
            <h1>{t("orderSuccessful")}</h1>
            <p className="success-subtitle">
              {t("thankYouMessage")}
            </p>

            {/* Order Details */}
            <div className="order-details-box">
              <div className="order-detail-row">
                <span className="detail-label">{t("orderId")}:</span>
                <span className="detail-value">{orderId}</span>
              </div>
              <div className="order-detail-row">
                <span className="detail-label">{t("totalAmount")}:</span>
                <span className="detail-value">AED {orderTotal.toFixed(2)}</span>
              </div>
              <div className="order-detail-row">
                <span className="detail-label">{t("items")}:</span>
                <span className="detail-value">{orderItems.length} {t(orderItems.length !== 1 ? "items" : "item")}</span>
              </div>
            </div>

            {/* Order Summary */}
            <div className="success-summary">
              <h3>{t("orderSummary")}</h3>
              <div className="summary-items-list">
                {orderItems.map((item) => (
                  <div key={item.id} className="summary-item-row">
                    <span>{item.flower} × {item.quantity}</span>
                    <span>
                      AED{" "}
                      {(
                        Number(item.price.replace("AED", "").trim()) *
                        item.quantity
                      ).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Info Message */}
            <div className="success-info">
              <p>
                ✓ A confirmation email has been sent to your email address.<br />
                ✓ You will receive updates about your order delivery.
              </p>
            </div>

            {/* Actions */}
            <div className="success-actions">
              <Link to={`/tracking/${orderId}`} className="track-order-btn">
                Track Your Order
              </Link>
              <Link to="/shop" className="continue-shopping-btn">
                Continue Shopping
              </Link>
              <Link to="/" className="home-btn">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default OrderSuccess;
