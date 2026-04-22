import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { BouquetVisualizer } from "../components/BouquetVisualizer";
import { useLanguage } from "../context/LanguageContext";
import products from "../data/products";

function Cart() {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useContext(CartContext);
  const { t } = useLanguage();

  const [promoCode, setPromoCode] = useState("");
  const [modalBouquet, setModalBouquet] = useState(null);

  const getPriceNumber = (price) => {
    if (typeof price === 'number') {
      return price;
    }
    return Number((price || "").replace("AED", "").replace(/,/g, "").trim()) || 0;
  };

  const totalPrice = cartItems.reduce((total, item) => {
    const numericPrice = getPriceNumber(item.price);
    return total + numericPrice * item.quantity;
  }, 0);

  return (
    <div>
      <Navbar />

      <main className="cart-page">
        {/* Hero section */}
        <section className="cart-hero">
          <h1 className="cart-title">{t("shoppingCart")}</h1>
          <p className="cart-subtitle">
            {t("reviewItems")}
          </p>
        </section>

        <section className="cart-container">
          {/* Empty cart state */}
          {cartItems.length === 0 ? (
            <div className="empty-cart-box">
              <div className="empty-cart-illustration">🛒</div>
              <h2>{t("yourCartEmpty")}</h2>
              <p>{t("addFlowersToStart")}</p>
              <Link to="/shop" className="continue-btn">
                {t("continueShopping")}
              </Link>
            </div>
          ) : (
            <div className="cart-layout">
              {/* Left: Items List */}
              <div className="cart-items-section">
                <h2 className="cart-items-heading">
                  {cartItems.length} {t(cartItems.length !== 1 ? "items" : "item")} {t("inCart")}
                </h2>

                <div className="cart-items-list">
                  {cartItems.map((item) => {
                    const unitPrice = getPriceNumber(item.price);
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
                            {(() => {
                              // Try to get image from cart item first, then from local products data
                              const itemImage = item.image || products.find(p => p.id === item.id)?.image;
                              return itemImage ? (
                                <img src={itemImage} alt={item.flower} />
                              ) : (
                                <div className="cart-item-placeholder">
                                  {item.customType === "bouquet" ? "💐" : "🌿"}
                                </div>
                              );
                            })()}
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
                              disabled={item.quantity <= 1}
                            >
                              −
                            </button>
                            <span className="qty-value">{item.quantity}</span>
                            <button
                              className="qty-btn"
                              onClick={() => increaseQuantity(item.id)}
                              disabled={item.stock !== undefined && item.quantity >= item.stock}
                              title={item.stock !== undefined && item.quantity >= item.stock ? `Only ${item.stock} available` : ""}
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
                      const unitPrice = getPriceNumber(item.price);
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

      <Footer />
    </div>
  );
}

export default Cart;