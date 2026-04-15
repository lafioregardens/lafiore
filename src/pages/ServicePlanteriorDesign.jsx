import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./ServiceDetail.css";

function ServicePlanteriorDesign() {
  return (
    <div>
      <Navbar />

      <main className="service-detail-page">
        {/* Hero Section */}
        <section className="service-hero">
          <div className="service-hero-image">
            {/* Image Placeholder */}
          </div>
          <div className="service-hero-content">
            <h1>Planterior Design</h1>
            <p>Blend nature and design to create fresh, elegant living spaces</p>
          </div>
        </section>

        {/* Overview Section */}
        <section className="service-section">
          <div className="service-container">
            <div className="service-content">
              <h2>Transform Your Interior with Plants</h2>
              <p>
                Plants have the power to transform interiors—adding life, color, and a sense
                of calm to any space. Planterior design is about thoughtfully integrating
                greenery into your décor to create environments that are both beautiful and
                rejuvenating.
              </p>
              <p>
                Whether you're styling a home, studio, office, or commercial space, we create
                plant-forward designs that complement your existing aesthetics while bringing
                the benefits of nature indoors. From statement plants to living walls, we find
                the perfect green solutions for your space.
              </p>
            </div>
            <div className="service-image-placeholder">
              {/* Image Placeholder */}
            </div>
          </div>
        </section>

        {/* What We Offer */}
        <section className="service-section service-section-alt">
          <div className="service-container">
            <h2>What We Offer</h2>
            <div className="service-offerings">
              <div className="offering-card">
                <div className="offering-icon">🪴</div>
                <h3>Plant Styling</h3>
                <p>Strategic plant placement to enhance your interior design</p>
              </div>
              <div className="offering-card">
                <div className="offering-icon">🎨</div>
                <h3>Décor Integration</h3>
                <p>Plants that complement your furniture, color schemes, and style</p>
              </div>
              <div className="offering-card">
                <div className="offering-icon">🌿</div>
                <h3>Living Walls & Features</h3>
                <p>Statement plants, terrariums, hanging gardens, and custom arrangements</p>
              </div>
              <div className="offering-card">
                <div className="offering-icon">💚</div>
                <h3>Plant Care Guidance</h3>
                <p>Tips and ongoing support to keep your plants thriving</p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="service-section">
          <div className="service-container">
            <h2>Why Planterior Design?</h2>
            <div className="benefits-grid">
              <div className="benefit-item">
                <h3>Improve Air Quality</h3>
                <p>Plants naturally purify the air, creating healthier indoor environments</p>
              </div>
              <div className="benefit-item">
                <h3>Boost Mood & Productivity</h3>
                <p>Greenery reduces stress and increases focus and creativity</p>
              </div>
              <div className="benefit-item">
                <h3>Enhance Aesthetics</h3>
                <p>Plants add depth, texture, and natural beauty to any space</p>
              </div>
              <div className="benefit-item">
                <h3>Personalized Style</h3>
                <p>Create unique, one-of-a-kind interiors that reflect your personality</p>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="service-section service-section-alt">
          <div className="service-container">
            <h2>Our Process</h2>
            <div className="process-steps">
              <div className="process-step">
                <div className="step-number">1</div>
                <h3>Space Analysis</h3>
                <p>Assess lighting, humidity, and your lifestyle and décor preferences</p>
              </div>
              <div className="process-step">
                <div className="step-number">2</div>
                <h3>Design Plan</h3>
                <p>Create a custom plan with plant selections and placement ideas</p>
              </div>
              <div className="process-step">
                <div className="step-number">3</div>
                <h3>Implementation</h3>
                <p>Source plants and style your space with care and attention to detail</p>
              </div>
              <div className="process-step">
                <div className="step-number">4</div>
                <h3>Support</h3>
                <p>Provide plant care guidance and adjust styling as needed</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="service-cta">
          <div className="service-container">
            <h2>Ready to Bring Nature Into Your Space?</h2>
            <p>Let's create a beautiful, plant-filled environment you'll love</p>
            <div className="cta-buttons">
              <Link to="/consultation#consultation-form" className="cta-primary-btn">
                Book a Consultation
              </Link>
              <Link to="/consultation#consultation-services" className="cta-secondary-btn">
                Explore Other Services
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default ServicePlanteriorDesign;
