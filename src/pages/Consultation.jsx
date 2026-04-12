// Import navbar and footer
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// React hooks
import { useState } from "react";

// Toast for form feedback
import FormToast from "../components/FormToast";

// Language support
import { useLanguage } from "../context/LanguageContext";

// API
import api from "../utils/api";

function Consultation() {
  const { t } = useLanguage();

  // Form states
  const [title, setTitle] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Toast state
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  // Handle form submit
  const handleConsultationSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!fullName.trim() || !email.trim() || !service.trim() || !message.trim()) {
      setToastType("error");
      setToastMessage(t("fillAllFields"));
      return;
    }

    setSubmitting(true);
    try {
      await api.post("/consultation", {
        fullName: title ? `${title} ${fullName}` : fullName,
        email,
        service,
        message,
      });

      setToastType("success");
      setToastMessage(t("consultationSuccess"));

      // Clear form
      setTitle("");
      setFullName("");
      setEmail("");
      setService("");
      setMessage("");
    } catch (err) {
      setToastType("error");
      setToastMessage(err.response?.data?.error || "Failed to send request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Navbar />

      <main className="consultation-page">
        {/* HERO SECTION */}
        <section className="consultation-hero">
          <div className="consultation-hero-image"></div>

          <div className="consultation-hero-content">
            <p className="consultation-eyebrow">La Fiore Consultation</p>

            <h1>Floral Styling and Green Space Design</h1>

            <p className="consultation-hero-text">
              From memorable events to beautifully styled homes and thriving
              gardens, we create thoughtful floral and plant experiences
              tailored to your space, purpose, and aesthetic.
            </p>

            <div className="consultation-hero-buttons">
              <a href="#consultation-form" className="consultation-primary-btn">
                Book a Consultation
              </a>

              <a href="#consultation-services" className="consultation-secondary-btn">
                Explore Services
              </a>
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section className="consultation-services" id="consultation-services">
          <div className="consultation-section-heading">
            <p className="consultation-eyebrow">What We Offer</p>
            <h2>Tailored Services for Beautiful Living</h2>
            <p>
              Whether you are planning an event, transforming a garden, or
              styling interiors with greenery, we help you create something
              elegant, balanced, and personal.
            </p>
          </div>

          <div className="consultation-service-layout">
            <article className="consultation-service-feature large-service">
              <div className="consultation-service-image"></div>
              <div className="consultation-service-text">
                <h3>Event and Wedding Flowers</h3>
                <p>
                  Bespoke floral styling for weddings, intimate celebrations,
                  engagements, launches, and special events. We design
                  arrangements that match your theme, venue, and atmosphere.
                </p>
              </div>
            </article>

            <article className="consultation-service-feature">
              <div className="consultation-service-image"></div>
              <div className="consultation-service-text">
                <h3>Garden Planning and Care</h3>
                <p>
                  Personalized support for plant selection, layout planning,
                  seasonal care, and greenery maintenance to help your garden
                  flourish beautifully.
                </p>
              </div>
            </article>

            <article className="consultation-service-feature">
              <div className="consultation-service-image"></div>
              <div className="consultation-service-text">
                <h3>Planterior Design</h3>
                <p>
                  Plant-focused interior styling that blends décor and greenery
                  to create fresh, elegant, and calming spaces in homes,
                  studios, and workspaces.
                </p>
              </div>
            </article>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="consultation-process">
          <div className="consultation-section-heading">
            <p className="consultation-eyebrow">How It Works</p>
            <h2>A Simple and Personal Process</h2>
          </div>

          <div className="consultation-process-grid">
            <div className="consultation-process-card">
              <span>01</span>
              <h3>Tell Us Your Vision</h3>
              <p>
                Share your event, space, ideas, preferences, and goals through
                our consultation request form.
              </p>
            </div>

            <div className="consultation-process-card">
              <span>02</span>
              <h3>We Curate a Plan</h3>
              <p>
                We shape recommendations around your style, space, and floral or
                greenery needs.
              </p>
            </div>

            <div className="consultation-process-card">
              <span>03</span>
              <h3>Bring It to Life</h3>
              <p>
                We guide the design direction so your event, garden, or interior
                feels polished and beautifully considered.
              </p>
            </div>
          </div>
        </section>

        {/* FORM SECTION */}
        <section className="consultation-form-section" id="consultation-form">
          <div className="consultation-form-card">
            <div className="consultation-section-heading left-align">
              <p className="consultation-eyebrow">Get Started</p>
              <h2>Request Your Consultation</h2>
              <p>
                Tell us a little about your project and we’ll get back to you
                with the next steps.
              </p>
            </div>

            <FormToast
              message={toastMessage}
              type={toastType}
              onClose={() => setToastMessage("")}
            />

            <form onSubmit={handleConsultationSubmit}>
              <div className="consultation-form-grid">
                <div>
                  <label>{t("title")}</label>
                  <select
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  >
                    <option value="">{t("selectTitle")}</option>
                    <option value="Mr">{t("mr")}</option>
                    <option value="Mrs">{t("mrs")}</option>
                    <option value="Ms">{t("ms")}</option>
                    <option value="Dr">{t("dr")}</option>
                    <option value="">{t("preferNotToSay")}</option>
                  </select>
                </div>

                <div>
                  <label>{t("fullName")}</label>
                  <input
                    type="text"
                    placeholder={t("fullNamePlaceholder")}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
              </div>

              <div className="consultation-form-grid">
                <div>
                  <label>{t("emailAddress")}</label>
                  <input
                    type="email"
                    placeholder={t("emailPlaceholder")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label>{t("selectService")}</label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                  >
                    <option value="">{t("chooseService")}</option>
                    <option value="Event and Wedding Flowers">
                      {t("eventWedding")}
                    </option>
                    <option value="Garden Planning and Care">
                      {t("gardenPlanning")}
                    </option>
                    <option value="Planterior Design">
                      {t("planteriorDesign")}
                    </option>
                  </select>
                </div>
              </div>

              <label>{t("projectDetails")}</label>
              <textarea
                placeholder={t("projectPlaceholder")}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              <button type="submit" className="consultation-submit-btn" disabled={submitting}>
                {submitting ? "..." : t("sendRequest")}
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Consultation;