import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import "../styles/wishlist-button.css";

function WishlistButton({ product }) {
  const { user } = useAuth();
  const { isInWishlist, addToWishlist, removeFromWishlist, loading } = useWishlist();
  const [message, setMessage] = useState("");

  const inWishlist = isInWishlist(product.id);

  const handleClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      setMessage("Please log in to use wishlist");
      setTimeout(() => setMessage(""), 2000);
      return;
    }

    if (inWishlist) {
      const result = await removeFromWishlist(product.id);
      if (!result.success) {
        setMessage(result.message);
        setTimeout(() => setMessage(""), 2000);
      }
    } else {
      const result = await addToWishlist(product);
      if (!result.success) {
        setMessage(result.message);
        setTimeout(() => setMessage(""), 2000);
      } else {
        setMessage("Added to wishlist!");
        setTimeout(() => setMessage(""), 1500);
      }
    }
  };

  return (
    <div className="wishlist-button-container">
      <button
        className={`wishlist-btn ${inWishlist ? "in-wishlist" : ""}`}
        onClick={handleClick}
        disabled={loading}
        title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
      >
        {inWishlist ? "♥" : "♡"}
      </button>
      {message && <span className="wishlist-message">{message}</span>}
    </div>
  );
}

export default WishlistButton;
