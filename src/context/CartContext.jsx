import { createContext, useEffect, useState } from "react";

// Create a global cart context
export const CartContext = createContext();

// This provider wraps the whole app and shares cart data everywhere
export function CartProvider({ children }) {
  // Load cart from localStorage when app first starts
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("lafiore-cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Toast state for small notification popups
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  // Save cart to localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem("lafiore-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Function to show toast briefly
  const triggerToast = (message) => {
    setToastMessage(message);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  // Add item to cart
  const addToCart = (item) => {
    setCartItems((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === item.id);

      // If this is a custom bouquet, use a cleaner toast message
      const itemLabel =
        item.month === "Custom Bouquet"
          ? "Custom bouquet"
          : item.flower || item.name || "Item";

      // If item already exists, increase quantity
      if (existingItem) {
        triggerToast(`${itemLabel} quantity updated in cart`);

        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

      // If new item, add with quantity 1
      triggerToast(`${itemLabel} added to cart`);
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  // Increase quantity of item in cart
  const increaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease quantity of item in cart
  // If quantity becomes 0, remove the item
  const decreaseQuantity = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove item completely
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    triggerToast("Item removed from cart");
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
    triggerToast("Cart cleared");
  };

  // Provide cart data + functions globally
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}