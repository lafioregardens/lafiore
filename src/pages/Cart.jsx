import Navbar from "../components/Navbar";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { flowerOptions } from "../data/flowers";
import { BouquetVisualizer } from "../components/BouquetVisualizer";

function Cart() {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useContext(CartContext);

  const [promoCode, setPromoCode] = useState("");
  const [modalBouquet, setModalBouquet] = useState(null);

  const totalPrice = cartItems.reduce((total, item) => {
    const numericPrice = Number(item.price.replace("AED", "").trim());
    return total + numericPrice * item.quantity;
  }, 0);

  return (
    <div>
      <Navbar />

      <main className="cart-page">
        {/* Hero section */}
        <section className="cart-hero">
          <h1 className="cart-title">Shopping Cart</h1>
          <p className="cart-subtitle">
            Review the items you’ve added before checkout.
          </p>
        </section>

        <section className="cart-container">
          {/* Empty cart state */}
          {cartItems.length === 0 ? (
            <div className="empty-cart-box">
              <div className="empty-cart-illustration">🛒</div>
              <h2>Your cart is empty</h2>
              <p>Add flowers and gifts to start building your order.</p>
              <Link to="/shop" className="continue-btn">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="cart-layout">
              {/* Left: Items List */}
              <div className="cart-items-section">
                <h2 className="cart-items-heading">
                  {cartItems.length} Item{cartItems.length !== 1 ? "s" : ""} in Cart
                </h2>

                <div className="cart-items-list">
                  {cartItems.map((item) => {
                    const unitPrice = Number(item.price.replace("AED", "").trim());
                    const itemSubtotal = unitPrice * item.quantity;
                    const isCustomBouquet = item.customType === "bouquet";

                    return (
                      <div className="cart-item-card" key={item.id}>
                        {/* Product Image or Visualizer */}
                        {isCustomBouquet && item.selectedFlowers && item.selectedFlowers.length > 0 ? (
                          <div
                            className="cart-item-visualizer"
                            onClick={() => setModalBouquet(item)}
                            style={{ cursor: "pointer" }}
                          >
                            <BouquetVisualizer
                              selectedFlowers={item.selectedFlowers}
                              selectedWrap={item.selectedWrap}
                              selectedSize={item.selectedSize}
                              compact={true}
                            />
                            <div className="visualizer-click-hint">Click to expand</div>
                          </div>
                        ) : (
                          <div className="cart-item-image">
                            {item.image ? (
                              <img src={item.image} alt={item.flower} />
                            ) : (
                              <div className="cart-item-placeholder">
                                {item.customType === "bouquet" ? "💐" : "🌿"}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Product Details */}
                        <div className="cart-item-info">
                          <h3 className="cart-item-name">{item.flower}</h3>
                          <p className="cart-item-desc">{item.description}</p>

                          {/* Show details ONLY for custom bouquets */}
                          {isCustomBouquet && item.details && (
                            <div className="cart-item-details-box">
                              <ul className="details-list">
                                {item.details.flowers && (
                                  <li><strong>Flowers:</strong> {item.details.flowers}</li>
                                )}
                                {item.details.wrapping && (
                                  <li><strong>Wrapping:</strong> {item.details.wrapping}</li>
                                )}
                                {item.details.size && (
                                  <li><strong>Size:</strong> {item.details.size}</li>
                                )}
                                {item.details.message && (
                                  <li><strong>Message:</strong> {item.details.message}</li>
                                )}
                              </ul>
                            </div>
                          )}
                        </div>

                        {/* Actions Column */}
                        <div className="cart-item-actions">
                          <div className="cart-item-price">{item.price}</div>

                          <div className="quantity-controls">
                            <button
                              className="qty-btn"
                              onClick={() => decreaseQuantity(item.id)}
                            >
                              −
                            </button>
                            <span className="qty-value">{item.quantity}</span>
                            <button
                              className="qty-btn"
                              onClick={() => increaseQuantity(item.id)}
                            >
                              +
                            </button>
                          </div>

                          <div className="item-subtotal">
                            AED {itemSubtotal.toFixed(2)}
                          </div>

                          <button
                            className="remove-btn"
                            onClick={() => removeFromCart(item.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right: Order Summary */}
              <aside className="cart-summary-section">
                <div className="cart-summary">
                  <h2 className="summary-title">Order Summary</h2>

                  {/* Itemized List */}
                  <div className="summary-items">
                    {cartItems.map((item) => {
                      const unitPrice = Number(item.price.replace("AED", "").trim());
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
                      <span>Subtotal</span>
                      <span>AED {totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="summary-row">
                      <span>Delivery</span>
                      <span className="delivery-free">Free</span>
                    </div>
                  </div>

                  <div className="summary-divider"></div>

                  <div className="summary-total">
                    <span>Grand Total</span>
                    <span>AED {totalPrice.toFixed(2)}</span>
                  </div>

                  {/* Promo Code */}
                  <div className="promo-section">
                    <input
                      type="text"
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="promo-input"
                    />
                    <button className="promo-btn">Apply</button>
                  </div>

                  {/* Buttons */}
                  <div className="summary-buttons">
                    <Link to="/checkout" className="checkout-btn">
                      Proceed to Checkout
                    </Link>
                    <Link to="/shop" className="continue-shopping-btn">
                      Continue Shopping
                    </Link>
                    <button className="clear-cart-btn" onClick={clearCart}>
                      Clear Cart
                    </button>
                  </div>
                </div>
              </aside>
            </div>
          )}
        </section>

        {/* Bouquet Visualization Modal */}
        {modalBouquet && (
          <div className="bouquet-modal-overlay" onClick={() => setModalBouquet(null)}>
            <div className="bouquet-modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="bouquet-modal-close" onClick={() => setModalBouquet(null)}>
                ×
              </button>
              <h2 className="bouquet-modal-title">Your Bouquet</h2>
              <div className="bouquet-modal-visualizer">
                <BouquetVisualizer
                  selectedFlowers={modalBouquet.selectedFlowers}
                  selectedWrap={modalBouquet.selectedWrap}
                  selectedSize={modalBouquet.selectedSize}
                  compact={false}
                  showTitle={false}
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Cart;