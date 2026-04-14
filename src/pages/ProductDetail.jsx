import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StarRating from "../components/StarRating";
import FormToast from "../components/FormToast";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import api from "../utils/api";
import products from "../data/products";
import { getCareGuide } from "../data/plantCareGuide";
import "./ProductDetail.css";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("description");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [reviewName, setReviewName] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Find product from local data
  const product = products.find((p) => p.id === parseInt(id));

  const care = getCareGuide(product);

  useEffect(() => {
    if (!product) return;
    api
      .get(`/products/${product.id}/reviews`)
      .then((res) => {
        const list = res.data?.data || [];
        setReviews(list);
        if (list.length > 0) {
          const avg = list.reduce((s, r) => s + r.rating, 0) / list.length;
          setAvgRating(Math.round(avg * 10) / 10);
        }
      })
      .catch(() => {});
  }, [product]);

  if (!product) {
    return (
      <div className="product-detail-modal">
        <div className="product-detail-grid">
          <button
            className="product-close-btn"
            onClick={() => navigate("/shop")}
            aria-label="Close product details"
          >
            ✕
          </button>
          <div className="product-not-found">
            <h2>Product not found</h2>
            <p>Sorry, this product doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        flower: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
        details: {
          category: product.mainCategory,
          tags: product.tags?.join(", "),
        },
      });
    }
    setToastType("success");
    setToastMessage(`${quantity} × ${product.name} added to cart!`);
  };

  const handleSubmitReview = async () => {
    if (rating === 0) {
      setToastType("error");
      setToastMessage(t("selectRating"));
      return;
    }
    if (!user && !reviewName.trim()) {
      setToastType("error");
      setToastMessage(t("enterName"));
      return;
    }

    try {
      await api.post(`/products/${product.id}/reviews`, {
        rating,
        comment: review,
        name: user ? user.displayName : reviewName.trim(),
        anonymous: !user,
      });
      const res = await api.get(`/products/${product.id}/reviews`);
      const list = res.data?.data || [];
      setReviews(list);
      if (list.length > 0) {
        const avg = list.reduce((s, r) => s + r.rating, 0) / list.length;
        setAvgRating(Math.round(avg * 10) / 10);
      }
      setToastType("success");
      setToastMessage(t("reviewSuccess"));
      setRating(0);
      setReview("");
      setReviewName("");
    } catch (err) {
      setToastType("error");
      setToastMessage("Failed to submit: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="product-detail-modal">
      <div className="product-detail-grid">
        {/* Close Button */}
        <button
          className="product-close-btn"
          onClick={() => navigate("/shop")}
          aria-label="Close product details"
        >
          ✕
        </button>

        {/* Product Image */}
        <div className="product-detail-image">
          {product.image ? (
            <img src={product.image} alt={product.name} />
          ) : (
            <div className="product-image-placeholder">
              <span className="placeholder-icon">
                {product.mainCategory === "Bouquets" ? "💐" : "🌿"}
              </span>
              <span className="placeholder-label">{product.name}</span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="product-detail-info">
          {product.mainCategory && (
            <span className="product-category-label">{product.mainCategory}</span>
          )}

          <h1>{product.name}</h1>

          <div className="product-rating-row">
            <StarRating rating={avgRating || product.rating || 0} mode="display" size="md" />
            {reviews.length > 0 && (
              <span className="product-review-count">
                ({reviews.length} review{reviews.length === 1 ? "" : "s"})
              </span>
            )}
          </div>

          <div className="product-price-section">
            <span className="product-price">{product.price}</span>
            {product.stock === 0 && (
              <span className="product-status-sold">Out of Stock</span>
            )}
          </div>

          {product.description && (
            <p className="product-short-desc">{product.description}</p>
          )}

          {product.tags && product.tags.length > 0 && (
            <div className="product-tags">
              {product.tags.map((tag) => (
                <span key={tag} className="product-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {product.colours && product.colours.length > 0 && (
            <div className="product-colours">
              <h3>Available Colors</h3>
              <div className="colour-swatches">
                {product.colours.map((color) => (
                  <div key={color} className="colour-swatch">
                    <div
                      className="swatch"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="product-actions-row">
            <div className="product-quantity">
              <label>Quantity</label>
              <div className="quantity-controls">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                >
                  −
                </button>
                <span className="quantity-value">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <button
              className="product-add-btn"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
          </div>

          <div className="product-payment-section">
            <h4>We Accept</h4>
            <div className="payment-methods">
              <div className="payment-method">
                <span className="payment-icon">💵</span>
                <span>Cash on Delivery</span>
              </div>
              <div className="payment-method">
                <span className="payment-icon payment-icon--visa">VISA</span>
              </div>
              <div className="payment-method">
                <span className="payment-icon payment-icon--mc">
                  <span className="mc-circle mc-circle--red"></span>
                  <span className="mc-circle mc-circle--yellow"></span>
                </span>
              </div>
              <div className="payment-method">
                <span className="payment-icon payment-icon--amex">AMEX</span>
              </div>
              <div className="payment-method">
                <span className="payment-icon payment-icon--apple">Pay</span>
              </div>
              <div className="payment-method">
                <span className="payment-icon payment-icon--gpay">GPay</span>
              </div>
            </div>
          </div>

          <div className="product-trust-badges">
            <div className="trust-badge">
              <span className="trust-badge-icon">🛡️</span>
              <div>
                <strong>Safe Checkout</strong>
                <small>Secure payments</small>
              </div>
            </div>
            <div className="trust-badge">
              <span className="trust-badge-icon">🚚</span>
              <div>
                <strong>Free Delivery</strong>
                <small>Across UAE</small>
              </div>
            </div>
            <div className="trust-badge">
              <span className="trust-badge-icon">🌿</span>
              <div>
                <strong>Fresh Guarantee</strong>
                <small>Or your money back</small>
              </div>
            </div>
            <div className="trust-badge">
              <span className="trust-badge-icon">💚</span>
              <div>
                <strong>Care Guide</strong>
                <small>Included with every plant</small>
              </div>
            </div>

            {/* Reviews Section in Modal */}
            <FormToast
              message={toastMessage}
              type={toastType}
              onClose={() => setToastMessage("")}
            />

            <div className="product-reviews-section">
              <h2>{t("customerReviews")}</h2>
              <div className="product-reviews-list">
                {reviews.length === 0 ? (
                  <p className="reviews-empty">{t("noReviews")}</p>
                ) : (
                  reviews.map((r) => (
                    <div key={r._id} className="review-item">
                      <div className="review-item-header">
                        <strong>{r.name}</strong>
                        <StarRating rating={r.rating} mode="display" size="sm" />
                      </div>
                      <p className="review-item-date">
                        {new Date(r.createdAt).toLocaleDateString()}
                      </p>
                      {r.comment && <p className="review-item-comment">{r.comment}</p>}
                    </div>
                  ))
                )}
              </div>

              <div className="product-review-form">
                <h3>{t("leaveReview")}</h3>
                {!user && (
                  <div className="form-group">
                    <label>{t("yourName")}</label>
                    <input
                      type="text"
                      placeholder={t("yourName")}
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                    />
                  </div>
                )}
                <div className="form-group">
                  <label>{t("rating")}</label>
                  <StarRating
                    rating={rating}
                    mode="input"
                    onRate={setRating}
                    size="lg"
                  />
                </div>
                <div className="form-group">
                  <label>{t("yourReview")}</label>
                  <textarea
                    placeholder={t("reviewPlaceholder")}
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                  />
                </div>
                <button className="review-submit-btn" onClick={handleSubmitReview}>
                  {t("submitReview")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {care && (
        <div className="product-care-card">
          <h2>Plant Care Guide</h2>
          <div className="care-grid">
            <div className="care-item">
              <div className="care-icon">💧</div>
              <div>
                <h4>Watering</h4>
                <p>{care.watering}</p>
              </div>
            </div>
            <div className="care-item">
              <div className="care-icon">☀️</div>
              <div>
                <h4>Light</h4>
                <p>{care.light}</p>
              </div>
            </div>
            <div className="care-item">
              <div className="care-icon">🌡️</div>
              <div>
                <h4>Temperature</h4>
                <p>{care.temperature}</p>
              </div>
            </div>
            <div className="care-item">
              <div className="care-icon">🌱</div>
              <div>
                <h4>Fertilizer</h4>
                <p>{care.fertilizer}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="product-detail-tabs">
        <button
          className={`product-detail-tab ${activeTab === "description" ? "product-detail-tab--active" : ""}`}
          onClick={() => setActiveTab("description")}
        >
          Description
        </button>
        <button
          className={`product-detail-tab ${activeTab === "reviews" ? "product-detail-tab--active" : ""}`}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "description" && (
        <div className="product-detail-content">
          <p>{product.description}</p>
        </div>
      )}

    </div>
  );
}

export default ProductDetail;
