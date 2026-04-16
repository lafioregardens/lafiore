import { useNavigate } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import Navbar from "../components/Navbar";
import "../styles/wishlist.css";

function Wishlist() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { wishlist, removeFromWishlist, loading } = useWishlist();
  const navigate = useNavigate();

  // If user not logged in, show login prompt
  if (!user) {
    return (
      <>
        <Navbar />
        <div className="wishlist-container">
          <div className="wishlist-empty">
            <div className="empty-icon">💔</div>
            <h2>{t("pleaseLogin") || "Please Log In"}</h2>
            <p>{t("loginToViewWishlist") || "Log in to view your wishlist"}</p>
            <button
              className="btn-primary"
              onClick={() => navigate("/login")}
            >
              {t("login") || "Log In"}
            </button>
          </div>
        </div>
      </>
    );
  }

  // If wishlist is empty
  if (wishlist.length === 0) {
    return (
      <>
        <Navbar />
        <div className="wishlist-container">
          <div className="wishlist-empty">
            <div className="empty-icon">♡</div>
            <h2>{t("emptyWishlist") || "Your Wishlist is Empty"}</h2>
            <p>
              {t("addItemsToWishlist") ||
                "Start adding items to your wishlist!"}
            </p>
            <button
              className="btn-primary"
              onClick={() => navigate("/shop")}
            >
              {t("continueShopping") || "Continue Shopping"}
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="wishlist-container">
        <div className="wishlist-header">
          <h1>♥ {t("myWishlist") || "My Wishlist"}</h1>
          <p className="wishlist-count">
            {wishlist.length} {t("items") || "items"}
          </p>
        </div>

        <div className="wishlist-grid">
          {wishlist.map((item) => (
            <div key={item.productId} className="wishlist-item">
              <div className="wishlist-item-image">
                {item.image ? (
                  <img src={item.image} alt={item.name} />
                ) : (
                  <div className="placeholder-image">No Image</div>
                )}
              </div>

              <div className="wishlist-item-info">
                <h3>{item.name}</h3>
                <p className="price">
                  AED {item.price ? item.price.toFixed(2) : "0.00"}
                </p>
                <p className="added-date">
                  {t("addedOn") || "Added on"}:{" "}
                  {new Date(item.addedAt).toLocaleDateString()}
                </p>
              </div>

              <div className="wishlist-item-actions">
                <button
                  className="btn-add-to-cart"
                  onClick={() => {
                    // TODO: Add to cart functionality
                    navigate(`/product/${item.productId}`);
                  }}
                >
                  {t("viewProduct") || "View"}
                </button>
                <button
                  className="btn-remove"
                  onClick={() => removeFromWishlist(item.productId)}
                  disabled={loading}
                >
                  {loading ? "..." : "✕"}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="wishlist-footer">
          <button
            className="btn-secondary"
            onClick={() => navigate("/shop")}
          >
            {t("continueShopping") || "Continue Shopping"}
          </button>
        </div>
      </div>
    </>
  );
}

export default Wishlist;
