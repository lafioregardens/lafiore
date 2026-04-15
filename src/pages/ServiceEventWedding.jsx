import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./ServiceDetail.css";

function ServiceEventWedding() {
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
            <h1>Event and Wedding Flowers</h1>
            <p>Bespoke floral styling that brings your vision to life</p>
          </div>
        </section>

        {/* Overview Section */}
        <section className="service-section">
          <div className="service-container">
            <div className="service-content">
              <h2>Create Unforgettable Moments</h2>
              <p>
                Your special event deserves flowers that reflect your personality and vision.
                From intimate garden ceremonies to grand celebrations, we design bespoke floral
                arrangements that elevate every moment and create lasting memories.
              </p>
              <p>
                Our expert team works closely with you to understand your theme, color palette,
                venue, and atmosphere. We source premium flowers and create stunning arrangements
                that complement your unique style.
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
                <div className="offering-icon">💒</div>
                <h3>Wedding Ceremonies</h3>
                <p>Bridal bouquets, ceremony arrangements, and altar installations</p>
              </div>
              <div className="offering-card">
                <div className="offering-icon">🎉</div>
                <h3>Celebrations & Events</h3>
                <p>Centerpieces, table arrangements, and event décor</p>
              </div>
              <div className="offering-card">
                <div className="offering-icon">💍</div>
                <h3>Engagements & Launches</h3>
                <p>Custom arrangements for special announcements and milestones</p>
              </div>
              <div className="offering-card">
                <div className="offering-icon">🎁</div>
                <h3>Premium Designs</h3>
                <p>Seasonal flowers, exotic blooms, and sustainable options</p>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="service-section">
          <div className="service-container">
            <h2>Our Process</h2>
            <div className="process-steps">
              <div className="process-step">
                <div className="step-number">1</div>
                <h3>Consultation</h3>
                <p>Discuss your vision, theme, and preferences in a personalized meeting</p>
              </div>
              <div className="process-step">
                <div className="step-number">2</div>
                <h3>Design</h3>
                <p>Create custom designs and select premium flowers that match your vision</p>
              </div>
              <div className="process-step">
                <div className="step-number">3</div>
                <h3>Preparation</h3>
                <p>Arrange flowers with care and prepare all installations</p>
              </div>
              <div className="process-step">
                <div className="step-number">4</div>
                <h3>Delivery & Setup</h3>
                <p>Professional delivery and setup on your special day</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="service-cta">
          <div className="service-container">
            <h2>Ready to Create Your Perfect Floral Experience?</h2>
            <p>Let's bring your vision to life with beautiful, memorable flowers</p>
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

export default ServiceEventWedding;
