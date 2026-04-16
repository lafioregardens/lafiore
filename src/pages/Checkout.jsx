import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Toast from "../components/Toast";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import api from "../utils/api";
import "./Checkout.css";

function Checkout() {
  const navigate = useNavigate();
  const { cartItems, clearCart, triggerToast } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [invalidFields, setInvalidFields] = useState([]);

  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    phone: "",
    street: "",
    area: "",
    emirate: "Dubai",
    deliveryDate: "",
    deliveryTime: "",
    deliveryType: "standard",
    notes: "",
    paymentMethod: "",
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  });

  const subtotal = cartItems.reduce((total, item) => {
    // Handle both string and number price formats
    let numericPrice;
    if (typeof item.price === 'number') {
      numericPrice = item.price;
    } else {
      numericPrice = Number(String(item.price).replace("AED", "").trim());
    }
    return total + numericPrice * item.quantity;
  }, 0);

  // Calculate delivery charges based on delivery type
  let deliveryCharges = 0;
  if (formData.deliveryType === "quick") {
    deliveryCharges = 25; // Quick delivery: 25 AED
  } else {
    // Standard delivery: 5 AED if order is less than 150 AED, otherwise free
    deliveryCharges = subtotal < 150 ? 5 : 0;
  }
  const totalPrice = subtotal + deliveryCharges;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate required fields
    const emptyFields = [];
    if (!formData.name.trim()) emptyFields.push("name");
    if (!formData.email.trim()) emptyFields.push("email");
    if (!formData.phone.trim()) emptyFields.push("phone");
    if (!formData.street.trim()) emptyFields.push("street");
    if (!formData.area.trim()) emptyFields.push("area");
    if (!formData.deliveryDate) emptyFields.push("deliveryDate");
    if (!formData.deliveryTime) emptyFields.push("deliveryTime");
    if (!formData.paymentMethod) emptyFields.push("paymentMethod");

    if (emptyFields.length > 0) {
      setInvalidFields(emptyFields);
      setError(t("fillRequired"));
      triggerToast("Please fill in all required fields");
      return;
    }

    setInvalidFields([]);

    if (cartItems.length === 0) {
      setError(t("cartEmpty"));
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        customer: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        },
        address: {
          street: formData.street,
          area: formData.area,
          emirate: formData.emirate,
        },
        delivery: {
          date: formData.deliveryDate,
          timeSlot: formData.deliveryTime,
        },
        items: cartItems,
        total: totalPrice,
        paymentMethod: formData.paymentMethod,
        notes: formData.notes,
      };

      // Generate order ID
      const orderId = "LAF" + Date.now();

      // Calculate delivery charge (free if > 150, else 5 AED)
      const deliveryCharge = totalPrice > 150 ? 0 : 5;
      const finalTotal = totalPrice + deliveryCharge;

      // Save order to localStorage for tracking
      const savedOrder = {
        id: orderId,
        status: "processing",
        items: cartItems.map(item => ({
          name: item.flower || item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        subtotal: totalPrice,
        deliveryCharge: deliveryCharge,
        total: `AED ${finalTotal.toFixed(2)}`,
        deliveryAddress: {
          name: formData.name,
          street: formData.street,
          area: formData.area,
          emirate: formData.emirate,
          phone: formData.phone,
        },
        deliveryDate: formData.deliveryDate,
        deliveryTime: formData.deliveryTime,
        paymentMethod: formData.paymentMethod,
        notes: formData.notes,
        orderDate: new Date().toISOString().split('T')[0],
        estimatedDelivery: formData.deliveryDate,
        timeline: [
          { status: "Order Placed", date: new Date().toISOString().split('T')[0], completed: true },
          { status: "Processing", date: new Date().toISOString().split('T')[0], completed: true },
          { status: "Order Confirmed", date: formData.deliveryDate, completed: false },
          { status: "Out for Delivery", date: formData.deliveryDate, completed: false },
          { status: "Delivered", date: formData.deliveryDate, completed: false },
        ],
      };
      const existingOrders = JSON.parse(localStorage.getItem("lafiore-orders") || "{}");
      existingOrders[orderId] = savedOrder;
      localStorage.setItem("lafiore-orders", JSON.stringify(existingOrders));

      // Try to POST to backend (optional - works without backend)
      try {
        await api.post("/orders", orderData);
      } catch (apiErr) {
        console.log("Backend not available, continuing with offline order");
      }

      // Decrement inventory stock for each item in the order
      try {
        const stockDecrementData = {
          items: cartItems.map(item => ({
            productId: item.id,
            quantity: item.quantity
          }))
        };
        await api.post("/inventory/decrement", stockDecrementData);
        console.log("Inventory updated successfully");
      } catch (inventoryErr) {
        console.log("Inventory update failed, order still processed", inventoryErr);
        // Don't fail the order if inventory update fails
      }

      // Navigate to success page with order data
      navigate(`/order-success?id=${orderId}`, {
        state: {
          orderItems: cartItems,
          orderTotal: finalTotal,
          subtotal: totalPrice,
          deliveryCharge: deliveryCharge
        }
      });
      // Clear cart after navigation
      clearCart();
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Failed to place order. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div>
        <Navbar />
        <main className="checkout-page">
          <section className="checkout-empty">
            <h1>{t("yourCartEmpty")}</h1>
            <p>{t("addItemsCheckout")}</p>
            <a href="/shop" className="return-btn">
              {t("backHome")}
            </a>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Toast />

      <main className="checkout-page">
        <div className="checkout-container">
          {/* Left: Form */}
          <div className="checkout-form-section">
            <h1 className="checkout-title">{t("checkout")}</h1>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="checkout-form" noValidate>
              {/* Contact Info */}
              <div className="form-section">
                <h2>{t("contactInfo")}</h2>
                <div className={`form-group ${invalidFields.includes("name") ? "invalid" : ""}`}>
                  <label>{t("fullName")} *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                  />
                  {invalidFields.includes("name") && <span className="field-error">This field is required</span>}
                </div>
                <div className="form-row">
                  <div className={`form-group ${invalidFields.includes("email") ? "invalid" : ""}`}>
                    <label>{t("email")} *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                    />
                    {invalidFields.includes("email") && <span className="field-error">This field is required</span>}
                  </div>
                  <div className={`form-group ${invalidFields.includes("phone") ? "invalid" : ""}`}>
                    <label>{t("phone")} *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+971 50 123 4567"
                    />
                    {invalidFields.includes("phone") && <span className="field-error">This field is required</span>}
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="form-section">
                <h2>{t("deliveryAddress")}</h2>
                <div className={`form-group ${invalidFields.includes("street") ? "invalid" : ""}`}>
                  <label>{t("street")} *</label>
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                    placeholder="Building, House no., Street name"
                  />
                  {invalidFields.includes("street") && <span className="field-error">This field is required</span>}
                </div>
                <div className="form-row">
                  <div className={`form-group ${invalidFields.includes("area") ? "invalid" : ""}`}>
                    <label>{t("area")} *</label>
                    <input
                      type="text"
                      name="area"
                      value={formData.area}
                      onChange={handleInputChange}
                      placeholder="Downtown, Marina, etc."
                    />
                    {invalidFields.includes("area") && <span className="field-error">This field is required</span>}
                  </div>
                  <div className="form-group">
                    <label>{t("emirate")} *</label>
                    <select
                      name="emirate"
                      value={formData.emirate}
                      onChange={handleInputChange}
                    >
                      <option value="Dubai">Dubai</option>
                      <option value="Abu Dhabi">Abu Dhabi</option>
                      <option value="Sharjah">Sharjah</option>
                      <option value="Ajman">Ajman</option>
                      <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                      <option value="Fujairah">Fujairah</option>
                      <option value="Umm Al Quwain">Umm Al Quwain</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Delivery Preference */}
              <div className="form-section">
                <h2>{t("deliveryPreference")}</h2>

                {/* Delivery Type Selection */}
                <div className="form-group">
                  <label>{t("deliveryType")} *</label>
                  <div className="radio-group">
                    <label className="radio-label delivery-option">
                      <input
                        type="radio"
                        name="deliveryType"
                        value="standard"
                        checked={formData.deliveryType === "standard"}
                        onChange={handleInputChange}
                      />
                      <div className="delivery-option-content">
                        <span className="delivery-option-title">{t("standardDelivery")}</span>
                        <span className="delivery-option-price">
                          {subtotal < 150 ? "AED 5" : t("free")}
                        </span>
                      </div>
                    </label>
                    <label className="radio-label delivery-option">
                      <input
                        type="radio"
                        name="deliveryType"
                        value="quick"
                        checked={formData.deliveryType === "quick"}
                        onChange={handleInputChange}
                      />
                      <div className="delivery-option-content">
                        <span className="delivery-option-title">{t("quickDelivery")}</span>
                        <span className="delivery-option-price">AED 25</span>
                      </div>
                    </label>
                  </div>
                </div>

                <div className={`form-group ${invalidFields.includes("deliveryDate") ? "invalid" : ""}`}>
                  <label>{t("deliveryDate")} *</label>
                  <input
                    type="date"
                    name="deliveryDate"
                    value={formData.deliveryDate}
                    onChange={handleInputChange}
                  />
                  {invalidFields.includes("deliveryDate") && <span className="field-error">This field is required</span>}
                </div>
                <div className={`form-group ${invalidFields.includes("deliveryTime") ? "invalid" : ""}`}>
                  <label>{t("deliveryTime")} *</label>
                  <div className="radio-group">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="deliveryTime"
                        value="morning"
                        checked={formData.deliveryTime === "morning"}
                        onChange={handleInputChange}
                      />
                      {t("morning")} (8 AM - 12 PM)
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="deliveryTime"
                        value="afternoon"
                        checked={formData.deliveryTime === "afternoon"}
                        onChange={handleInputChange}
                      />
                      {t("afternoon")} (12 PM - 4 PM)
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="deliveryTime"
                        value="evening"
                        checked={formData.deliveryTime === "evening"}
                        onChange={handleInputChange}
                      />
                      {t("evening")} (4 PM - 8 PM)
                    </label>
                  </div>
                  {invalidFields.includes("deliveryTime") && <span className="field-error">This field is required</span>}
                </div>
              </div>

              {/* Order Notes */}
              <div className="form-section">
                <h2>{t("orderNotes")}</h2>
                <div className="form-group">
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Any special instructions or notes for your order..."
                    rows="4"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className={`form-section ${invalidFields.includes("paymentMethod") ? "invalid-section" : ""}`}>
                <h2>{t("paymentMethod")} *</h2>
                <div className="radio-group">
                  <label className="radio-label payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={formData.paymentMethod === "cash"}
                      onChange={handleInputChange}
                    />
                    <span className="radio-content">
                      <span className="radio-title">{t("cashOnDelivery")}</span>
                      <span className="radio-desc">{t("payOnDelivery")}</span>
                    </span>
                  </label>
                  <label className="radio-label payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === "card"}
                      onChange={handleInputChange}
                    />
                    <span className="radio-content">
                      <span className="radio-title">{t("creditDebitCard")}</span>
                      <span className="radio-desc">{t("secureOnlinePayment")}</span>
                    </span>
                  </label>
                </div>
                {invalidFields.includes("paymentMethod") && <span className="field-error">This field is required</span>}

                {/* Card Details Form - Show only when card is selected */}
                {formData.paymentMethod === "card" && (
                  <div className="card-details-section">
                    <div className="card-preview">
                      <div className="card-chip">💳</div>
                      <div className="card-number">
                        {formData.cardNumber.slice(-4).padStart(16, "•")}
                      </div>
                      <div className="card-info">
                        <div className="card-holder">
                          {formData.cardHolder || "CARDHOLDER NAME"}
                        </div>
                        <div className="card-expiry">
                          {formData.expiryDate || "MM/YY"}
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>{t("cardholderName")} *</label>
                      <input
                        type="text"
                        name="cardHolder"
                        value={formData.cardHolder}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        required={formData.paymentMethod === "card"}
                      />
                    </div>

                    <div className="form-group">
                      <label>{t("cardNumber")} *</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\s/g, "").slice(0, 16);
                          setFormData((prev) => ({
                            ...prev,
                            cardNumber: value.replace(/(\d{4})/g, "$1 ").trim(),
                          }));
                        }}
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                        required={formData.paymentMethod === "card"}
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>{t("expiryDate")} *</label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={(e) => {
                            let value = e.target.value.replace(/\D/g, "").slice(0, 4);
                            if (value.length >= 2) {
                              value = value.slice(0, 2) + "/" + value.slice(2);
                            }
                            setFormData((prev) => ({
                              ...prev,
                              expiryDate: value,
                            }));
                          }}
                          placeholder="MM/YY"
                          maxLength="5"
                          required={formData.paymentMethod === "card"}
                        />
                      </div>
                      <div className="form-group">
                        <label>{t("cvv")} *</label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "").slice(0, 4);
                            setFormData((prev) => ({
                              ...prev,
                              cvv: value,
                            }));
                          }}
                          placeholder="123"
                          maxLength="4"
                          required={formData.paymentMethod === "card"}
                        />
                      </div>
                    </div>

                    <div className="card-security-note">
                      🔒 Your card details are encrypted and secure. We never store your full card information.
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="place-order-btn"
                disabled={loading}
              >
                {loading ? "Processing..." : "Place Order"}
              </button>
            </form>
          </div>

          {/* Right: Order Summary */}
          <aside className="checkout-summary-section">
            <div className="checkout-summary">
              <h2>{t("orderSummary")}</h2>

              {/* Items */}
              <div className="summary-items">
                {cartItems.map((item) => {
                  const unitPrice = typeof item.price === 'number'
                    ? item.price
                    : Number(String(item.price).replace("AED", "").trim());
                  return (
                    <div key={item.id} className="summary-item">
                      <span className="summary-item-name">
                        {item.flower} × {item.quantity}
                      </span>
                      <span className="summary-item-price">
                        AED {(unitPrice * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="summary-divider"></div>

              {/* Totals */}
              <div className="summary-totals">
                <div className="summary-row">
                  <span>{t("subtotal")}</span>
                  <span>AED {subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>{t("deliveryCharges")}</span>
                  <span className={deliveryCharges > 0 ? "delivery-charge" : "free-text"}>
                    {deliveryCharges > 0 ? `AED ${deliveryCharges.toFixed(2)}` : t("free")}
                  </span>
                </div>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-total">
                <span>{t("grandTotal")}</span>
                <span>AED {totalPrice.toFixed(2)}</span>
              </div>

              {/* Trust Badges */}
              <div className="trust-section">
                <div className="trust-item">
                  <span className="trust-icon">🛡️</span>
                  <span>{t("safeCheckout")}</span>
                </div>
                <div className="trust-item">
                  <span className="trust-icon">🚚</span>
                  <span>{t("freeDelivery")}</span>
                </div>
                <div className="trust-item">
                  <span className="trust-icon">💚</span>
                  <span>{t("satisfactionGuaranteed")}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default Checkout;
