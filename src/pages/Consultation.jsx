// Import navbar and footer
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// React hooks
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

// Toast for form feedback
import FormToast from "../components/FormToast";

// Language support
import { useLanguage } from "../context/LanguageContext";

// API
import api from "../utils/api";

// Import service images (placeholder)
import eventImg from "../assets/images/event.jpg";
import gardenImg from "../assets/images/garden.jpg";
import planteriorImg from "../assets/images/planterior.jpg";

function Consultation() {
  const { t } = useLanguage();
  const location = useLocation();

  // Form states
  const [title, setTitle] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Service images state
  const [serviceImages, setServiceImages] = useState({
    wedding: eventImg,
    garden: gardenImg,
    planterior: planteriorImg,
  });

  // Toast state
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  // Scroll to hash anchor on page load or location change
  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const elementId = hash.replace("#", "");
      setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 0);
    }
  }, [location]);

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
            <p className="consultation-eyebrow">{t("laFioreConsultation")}</p>

            <h1>{t("consultationHero")}</h1>

            <p className="consultation-hero-text">
              {t("memorableEventsBeautifully")}
            </p>

            <div className="consultation-hero-buttons">
              <Link
                to="/consultation#consultation-form"
                className="consultation-primary-btn"
              >
                {t("bookFreeConsultation")}
              </Link>

              <Link
                to="/consultation#consultation-services"
                className="consultation-secondary-btn"
              >
                {t("exploreServices")}
              </Link>
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section className="consultation-services" id="consultation-services">
          <div className="consultation-section-heading">
            <p className="consultation-eyebrow">{t("whatWeOfferConsult")}</p>
            <h2>{t("tailoredServices")}</h2>
            <p>
              {t("consultationDesc")}
            </p>
          </div>

          <div className="consultation-service-layout">
            <Link to="/service/event-wedding" style={{ textDecoration: 'none' }}>
              <article className="consultation-service-feature large-service">
                <div className="consultation-service-image">
                  {serviceImages.wedding ? (
                    <img src={serviceImages.wedding} alt={t("eventWeddingTitle")} />
                  ) : (
                    <div className="consultation-image-placeholder">
                      <span>💐</span>
                      <p>Event & Wedding</p>
                    </div>
                  )}
                </div>
                <div className="consultation-service-text">
                  <h3>{t("eventWeddingTitle")}</h3>
                  <p>
                    {t("eventWeddingConsultDesc")}
                  </p>
                </div>
              </article>
            </Link>

            <Link to="/service/garden-planning" style={{ textDecoration: 'none' }}>
              <article className="consultation-service-feature">
                <div className="consultation-service-image">
                  {serviceImages.garden ? (
                    <img src={serviceImages.garden} alt={t("gardenPlanningTitle")} />
                  ) : (
                    <div className="consultation-image-placeholder">
                      <span>🌿</span>
                      <p>Garden Planning</p>
                    </div>
                  )}
                </div>
                <div className="consultation-service-text">
                  <h3>{t("gardenPlanningTitle")}</h3>
                  <p>
                    {t("gardenPlanningConsultDesc")}
                  </p>
                </div>
              </article>
            </Link>

            <Link to="/service/planterior-design" style={{ textDecoration: 'none' }}>
              <article className="consultation-service-feature">
                <div className="consultation-service-image">
                  {serviceImages.planterior ? (
                    <img src={serviceImages.planterior} alt={t("planteriorDesignTitle")} />
                  ) : (
                    <div className="consultation-image-placeholder">
                      <span>🪴</span>
                      <p>Planterior Design</p>
                    </div>
                  )}
                </div>
                <div className="consultation-service-text">
                  <h3>{t("planteriorDesignTitle")}</h3>
                  <p>
                    {t("planteriorDesignConsultDesc")}
                  </p>
                </div>
              </article>
            </Link>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="consultation-process">
          <div className="consultation-section-heading">
            <p className="consultation-eyebrow">{t("howItWorks")}</p>
            <h2>{t("simpleProcess")}</h2>
          </div>

          <div className="consultation-process-grid">
            <div className="consultation-process-card">
              <span>01</span>
              <h3>{t("tellVision")}</h3>
              <p>
                {t("tellVisionDesc")}
              </p>
            </div>

            <div className="consultation-process-card">
              <span>02</span>
              <h3>{t("curateplan")}</h3>
              <p>
                {t("curatePlanDesc")}
              </p>
            </div>

            <div className="consultation-process-card">
              <span>03</span>
              <h3>{t("bringVision")}</h3>
              <p>
                {t("bringVisionDesc")}
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