import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Slideshow from "../components/Slideshow";
import { useLanguage } from "../context/LanguageContext";
import eventImg from "../assets/images/event.jpg";
import wed1 from "../assets/images/wed1.jpg";
import wed2 from "../assets/images/wed2.jpg";
import wed3 from "../assets/images/wed3.jpg";
import wed4 from "../assets/images/wed4.jpg";
import "./ServiceDetail.css";

function ServiceEventWedding() {
  const { t } = useLanguage();

  return (
    <div>
      <Navbar />

      <main className="service-detail-page">
        {/* Hero Section */}
        <section className="service-hero">
          <div className="service-hero-content">
            <h1>{t("eventWeddingFlowers")}</h1>
            <p>{t("bespokeFloralStyling")}</p>
          </div>
        </section>

        {/* Overview Section */}
        <section className="service-section">
          <div className="service-container">
            <div className="service-content">
              <h2>{t("createUnforgettableMoments")}</h2>
              <p>{t("eventWeddingDesc1")}</p>
              <p>{t("eventWeddingDesc2")}</p>
            </div>
            <Slideshow images={[eventImg, wed1, wed2, wed3, wed4]} />
          </div>
        </section>

        {/* What We Offer */}
        <section className="service-section service-section-alt">
          <div className="service-container">
            <h2>{t("whatWeOffer")}</h2>
            <div className="service-offerings">
              <div className="offering-card">
                <div className="offering-icon">💒</div>
                <h3>{t("weddingCeremonies")}</h3>
                <p>{t("brdalBouquetsCeremony")}</p>
              </div>
              <div className="offering-card">
                <div className="offering-icon">🎉</div>
                <h3>{t("celebrationsEvents")}</h3>
                <p>{t("centerpieces")}</p>
              </div>
              <div className="offering-card">
                <div className="offering-icon">💍</div>
                <h3>{t("engagementsLaunches")}</h3>
                <p>{t("customArrangementsSpecial")}</p>
              </div>
              <div className="offering-card">
                <div className="offering-icon">🎁</div>
                <h3>{t("premiumDesigns")}</h3>
                <p>{t("seasonalFlowers")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="service-section">
          <div className="service-container">
            <h2>{t("ourProcess")}</h2>
            <div className="process-steps">
              <div className="process-step">
                <div className="step-number">1</div>
                <h3>{t("consultation")}</h3>
                <p>{t("discussVisionTheme")}</p>
              </div>
              <div className="process-step">
                <div className="step-number">2</div>
                <h3>{t("design")}</h3>
                <p>{t("createCustomDesigns")}</p>
              </div>
              <div className="process-step">
                <div className="step-number">3</div>
                <h3>{t("preparation")}</h3>
                <p>{t("arrangeFlowersWithCare")}</p>
              </div>
              <div className="process-step">
                <div className="step-number">4</div>
                <h3>{t("deliverySetup")}</h3>
                <p>{t("professionalDelivery")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="service-cta">
          <div className="service-container">
            <h2>{t("readyCreatePerfectFloral")}</h2>
            <p>{t("bringsVisionLife")}</p>
            <div className="cta-buttons">
              <Link to="/consultation#consultation-form" className="cta-primary-btn">
                {t("bookFreeConsultation")}
              </Link>
              <Link to="/consultation#consultation-services" className="cta-secondary-btn">
                {t("exploreOtherServices")}
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
