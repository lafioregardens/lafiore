import { useSearchParams, Link, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { CartContext } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import "./Checkout.css";

function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const { clearCart } = useContext(CartContext);
  const { t } = useLanguage();
  const [orderItems, setOrderItems] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const orderId = searchParams.get("id") || "LAF" + Date.now();

  // Get order data from navigation state (run only once on mount)
  useEffect(() => {
    if (location.state?.orderItems) {
      setOrderItems(location.state.orderItems);
      setOrderTotal(location.state.orderTotal);
      setSubtotal(location.state.subtotal || 0);
      setDeliveryCharge(location.state.deliveryCharge || 0);
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
                <span className="detail-label">Subtotal:</span>
                <span className="detail-value">AED {subtotal.toFixed(2)}</span>
              </div>
              <div className="order-detail-row">
                <span className="detail-label">Delivery Charge:</span>
                <span className="detail-value">{deliveryCharge === 0 ? "FREE" : `AED ${deliveryCharge.toFixed(2)}`}</span>
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
