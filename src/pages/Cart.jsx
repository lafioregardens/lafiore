import Navbar from "../components/Navbar";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Cart() {
  // Get cart data and actions from context
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useContext(CartContext);

  // Calculate grand total
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

        <section className="cart-items-section">
          {/* Empty cart state */}
          {cartItems.length === 0 ? (
            <div className="empty-cart-box">
              <div className="empty-cart-illustration"></div>
              <h2>Your cart is empty</h2>
              <p>Add flowers and gifts to start building your order.</p>
            </div>
          ) : (
            <>
              {/* Cart item list */}
              <div className="cart-items-list">
                {cartItems.map((item) => {
                  const unitPrice = Number(item.price.replace("AED", "").trim());
                  const itemSubtotal = unitPrice * item.quantity;

                  return (
                    <div className="cart-item-card" key={item.id}>
                      <div className="cart-item-image"></div>

                      <div className="cart-item-details">
                        <h2>{item.month}</h2>
                        <h3>{item.flower}</h3>
                        <p>{item.description}</p>

                        {/* Show extra details only if this item has them */}
                        {item.details && (
                          <div className="cart-item-extra-details">
                            <h4>Details</h4>
                            <ul>
                              <li>
                                <strong>Flowers:</strong> {item.details.flowers}
                              </li>
                              <li>
                                <strong>Wrapping:</strong> {item.details.wrapping}
                              </li>
                              <li>
                                <strong>Size:</strong> {item.details.size}
                              </li>
                              <li>
                                <strong>Message:</strong> {item.details.message}
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>

                      <div className="cart-item-actions">
                        <div className="cart-item-price">{item.price}</div>

                        {/* Quantity controls */}
                        <div className="quantity-controls">
                          <button
                            className="qty-btn"
                            onClick={() => decreaseQuantity(item.id)}
                          >
                            -
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
                          Subtotal: AED {itemSubtotal.toFixed(2)}
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

              {/* Summary section */}
              <div className="cart-summary">
                <h2>Total: AED {totalPrice.toFixed(2)}</h2>

                <div className="cart-summary-buttons">
                  <Link to="/shop" className="continue-btn">
                    Continue Shopping
                  </Link>

                  <button className="clear-cart-btn" onClick={clearCart}>
                    Clear Cart
                  </button>

                  <button className="checkout-btn">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
}

export default Cart;