import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <div>
      <Navbar />

      <main className="home-page">
        <section className="hero-section">
          <h1 className="hero-title">Grow Beauty, One Bloom at a Time.</h1>

          <p className="hero-subtitle">
            Premium plants, flowers, and garden essentials delivered with love.
          </p>

          <div className="hero-buttons">
            <button className="hero-btn shop-btn">Shop Now</button>
            <button className="hero-btn plant-btn">Try Plant Finder</button>
            <button className="hero-btn custom-btn">Customize Bouquet</button>
            <Link to="/birth-month" className="hero-btn birth-btn">
  Birth Month Flowers
</Link>
          </div>
        </section>

        <section className="feature-cards-section">
          <div className="feature-card">
            <h2>Exquisite Bouquets</h2>
            <div className="feature-image"></div>
            <p>
              Browse our selection of expertly crafted bouquets for every
              occasion.
            </p>
            <button className="feature-price-btn">AED 180.00</button>
          </div>

          <div className="feature-card">
            <h2>Find Your Perfect Plant</h2>
            <div className="feature-image"></div>
            <p>
              Answer a few questions and get personalized plant
              recommendations.
            </p>
            <button className="feature-price-btn">AED 155.00</button>
          </div>

          <div className="feature-card">
            <h2>Custom Arrangements</h2>
            <div className="feature-image"></div>
            <p>
              Create a bespoke bouquet catered to your tastes and preferences.
            </p>
            <button className="feature-price-btn">AED 170.00</button>
          </div>
        </section>

        <section className="shop-section">
          <h2 className="shop-title">Shop Our Collection</h2>

          <p className="shop-subtitle">
            Explore our range of beautiful blooms and unique plants
          </p>

          <div className="shop-grid">
            <div className="product-card">
              <div className="product-image"></div>
              <h3>Rose Deluxe Bouquet</h3>
              <button className="product-btn">AED 200.00</button>
            </div>

            <div className="product-card">
              <div className="product-image"></div>
              <h3>Lavender Plant</h3>
              <button className="product-btn">AED 95.00</button>
            </div>

            <div className="product-card">
              <div className="product-image"></div>
              <h3>Scented Candle Set</h3>
              <button className="product-btn">AED 60.00</button>
            </div>

            <div className="product-card">
              <div className="product-image"></div>
              <h3>Garden Tool Set</h3>
              <button className="product-btn">AED 60.00</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
