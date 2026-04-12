import { useState } from "react";
import "./StarRating.css";

function StarRating({ rating = 0, mode = "display", onRate, size = "md" }) {
  const [hoverRating, setHoverRating] = useState(0);
  const displayRating = mode === "input" ? hoverRating || rating : rating;

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= Math.floor(displayRating);
      const isHalf = i === Math.ceil(displayRating) && displayRating % 1 !== 0;

      stars.push(
        <span
          key={i}
          className={`star-icon ${isFilled ? "star-icon--filled" : isHalf ? "star-icon--half" : "star-icon--empty"}`}
          onClick={() => mode === "input" && onRate?.(i)}
          onMouseEnter={() => mode === "input" && setHoverRating(i)}
          onMouseLeave={() => mode === "input" && setHoverRating(0)}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className={`star-rating star-rating--${size}`}>
      <div className="star-rating-stars">{renderStars()}</div>
      {mode === "display" && (
        <span className="star-rating-value">
          {rating.toFixed(1)} <span className="star-rating-count">({rating || 0})</span>
        </span>
      )}
    </div>
  );
}

export default StarRating;
