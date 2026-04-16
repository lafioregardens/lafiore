import { useContext } from "react";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";
import { CartContext } from "../context/CartContext";
import WishlistButton from "./WishlistButton";
import "./ProductCard.css";

function ProductCard({ product, linkToDetail = true }) {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      flower: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      stock: product.stock,
      details: {
        category: product.mainCategory,
        tags: product.tags?.join(", "),
      },
    });
  };

  const cardContent = (
    <article className="product-card">
      {/* Product Image */}
      <div className="product-image">
        {product.image ? (
          <img src={product.image} alt={product.name} className="product-img" />
        ) : (
          <div className="product-img-placeholder">
            <span className="product-img-placeholder-icon">
              {product.mainCategory === "Bouquets" ? "💐" : "🌿"}
            </span>
            <span className="product-img-placeholder-label">{product.name}</span>
          </div>
        )}
        <div className="product-wishlist-btn">
          <WishlistButton product={product} />
        </div>
      </div>

      {/* Product Info */}
      <div className="product-info">
        {/* Star Rating */}
        <div className="product-rating">
          <StarRating rating={product.rating || 0} mode="display" size="sm" />
        </div>

        {/* Product Name */}
        <h3 className="product-name">{product.name}</h3>

        {/* Colour Swatches */}
        {product.colours && product.colours.length > 0 && (
          <div className="product-swatches">
            {product.colours.map((color) => (
              <span
                key={color}
                className="product-swatch"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        )}

        {/* Product Price */}
        <div className="product-price">
          {typeof product.price === 'number'
            ? `AED ${product.price.toFixed(2)}`
            : product.price}
        </div>

        {/* Low Stock Badge */}
        {product.stock !== undefined && product.stock > 0 && product.stock < 3 && (
          <div className="product-low-stock">Last {product.stock} remaining</div>
        )}

        {/* Add to Cart Button */}
        <button
          className="product-btn"
          onClick={handleAddToCart}
          disabled={product.stock !== undefined && product.stock === 0}
        >
          {product.stock !== undefined && product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          <span className="btn-arrow">→</span>
        </button>
      </div>
    </article>
  );

  // Wrap in Link if linkToDetail is true
  if (linkToDetail) {
    return <Link to={`/product/${product.id}`} className="product-card-link">{cardContent}</Link>;
  }

  return cardContent;
}

export default ProductCard;
