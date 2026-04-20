import { useState, useEffect, useRef } from 'react';
import '../styles/Slideshow.css';

function Slideshow({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (images.length === 0) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(intervalRef.current);
  }, [images.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  if (images.length === 0) {
    return <div className="slideshow-wrapper empty" />;
  }

  return (
    <div className="slideshow-wrapper">
      <div className="slideshow-container">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className="slideshow-img"
            style={{ opacity: index === currentIndex ? 1 : 0 }}
          />
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            className="slideshow-btn prev"
            onClick={goToPrevious}
            aria-label="Previous slide"
          >
            ❮
          </button>
          <button
            className="slideshow-btn next"
            onClick={goToNext}
            aria-label="Next slide"
          >
            ❯
          </button>

          <div className="slideshow-dots">
            {images.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Slideshow;
