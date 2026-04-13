import { useState, useEffect } from 'react';
import logo from '../assets/images/Logo1.png';
import './CoverPage.css';

function CoverPage({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Show cover for 3 seconds, then fade out
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    // Call onComplete after fade animation finishes
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 4000); // 3s wait + 1s fade animation

    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`cover-page ${isVisible ? 'visible' : 'hidden'}`}>
      {/* Decorative background elements */}
      <div className="cover-bg-accent cover-bg-accent-1"></div>
      <div className="cover-bg-accent cover-bg-accent-2"></div>

      <div className="cover-content">
        {/* Top decorative line */}
        <div className="cover-line cover-line-top"></div>

        {/* Logo with glassmorphic container */}
        <div className="cover-icon-wrapper">
          <div className="cover-icon">
            <img src={logo} alt="LA FIORE Logo" className="cover-logo" />
          </div>
        </div>

        {/* Main Title */}
        <h1 className="cover-title">LA FIORE</h1>

        {/* Subtitle separator */}
        <div className="cover-separator"></div>

        {/* Tagline */}
        <p className="cover-tagline">
          Bringing beauty and nature into your everyday life, one bloom at a time.
        </p>

        {/* Decorative dots */}
        <div className="cover-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Bottom decorative line */}
        <div className="cover-line cover-line-bottom"></div>
      </div>
    </div>
  );
}

export default CoverPage;
