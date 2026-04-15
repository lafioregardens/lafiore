import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./ServiceDetail.css";

function ServiceGardenPlanning() {
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
            <h1>Garden Planning and Care</h1>
            <p>Transform your outdoor space into a thriving, beautiful sanctuary</p>
          </div>
        </section>

        {/* Overview Section */}
        <section className="service-section">
          <div className="service-container">
            <div className="service-content">
              <h2>Create Your Dream Garden</h2>
              <p>
                A thriving garden is more than just plants—it's a living space that brings
                joy and tranquility to your home. Whether you're starting from scratch or
                enhancing an existing space, we provide expert guidance every step of the way.
              </p>
              <p>
                Our specialists work with you to understand your climate, soil conditions,
                aesthetic preferences, and maintenance capacity. We design gardens that are
                not only beautiful but also sustainable and easy to maintain.
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
                <div className="offering-icon">🌱</div>
                <h3>Plant Selection</h3>
                <p>Expert recommendations for plants suited to your climate and space</p>
              </div>
              <div className="offering-card">
                <div className="offering-icon">📐</div>
                <h3>Garden Design</h3>
                <p>Custom layout planning that maximizes beauty and functionality</p>
              </div>
              <div className="offering-card">
                <div className="offering-icon">🌿</div>
                <h3>Seasonal Care</h3>
                <p>Guidance on watering, pruning, fertilizing, and seasonal maintenance</p>
              </div>
              <div className="offering-card">
                <div className="offering-icon">🏡</div>
                <h3>Garden Maintenance</h3>
                <p>Regular care services to keep your garden thriving year-round</p>
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
                <h3>Site Assessment</h3>
                <p>Evaluate your space, sunlight, soil, and climate conditions</p>
              </div>
              <div className="process-step">
                <div className="step-number">2</div>
                <h3>Planning</h3>
                <p>Create a custom garden design with plant recommendations</p>
              </div>
              <div className="process-step">
                <div className="step-number">3</div>
                <h3>Installation</h3>
                <p>Plant selection, arrangement, and setup of your garden</p>
              </div>
              <div className="process-step">
                <div className="step-number">4</div>
                <h3>Ongoing Care</h3>
                <p>Regular maintenance and seasonal adjustments for lasting beauty</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="service-cta">
          <div className="service-container">
            <h2>Ready to Transform Your Garden?</h2>
            <p>Let's create a beautiful, thriving outdoor space you'll love</p>
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

export default ServiceGardenPlanning;
