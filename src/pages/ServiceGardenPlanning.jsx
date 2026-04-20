import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Slideshow from "../components/Slideshow";
import { useLanguage } from "../context/LanguageContext";
import gardenImg from "../assets/images/garden.jpg";
import pl1 from "../assets/images/pl1.jpg";
import pl2 from "../assets/images/pl2.jpg";
import pl3 from "../assets/images/pl3.jpg";
import pl4 from "../assets/images/pl4.jpg";
import "./ServiceDetail.css";

function ServiceGardenPlanning() {
  const { t } = useLanguage();

  return (
    <div>
      <Navbar />

      <main className="service-detail-page">
        {/* Hero Section */}
        <section className="service-hero">
          <div className="service-hero-content">
            <h1>{t("gardenPlanningCare")}</h1>
            <p>{t("transformOutdoorSpace")}</p>
          </div>
        </section>

        {/* Overview Section */}
        <section className="service-section">
          <div className="service-container">
            <div className="service-content">
              <h2>{t("createDreamGarden")}</h2>
              <p>{t("gardenDesc1")}</p>
              <p>{t("gardenDesc2")}</p>
            </div>
            <Slideshow images={[gardenImg, pl1, pl2, pl3, pl4]} />
          </div>
        </section>

        {/* What We Offer */}
        <section className="service-section service-section-alt">
          <div className="service-container">
            <h2>{t("whatWeOffer")}</h2>
            <div className="service-offerings">
              <div className="offering-card">
                <div className="offering-icon">🌱</div>
                <h3>{t("plantSelection")}</h3>
                <p>{t("plantSelectionDesc")}</p>
              </div>
              <div className="offering-card">
                <div className="offering-icon">📐</div>
                <h3>{t("gardenDesign")}</h3>
                <p>{t("gardenDesignDesc")}</p>
              </div>
              <div className="offering-card">
                <div className="offering-icon">🌿</div>
                <h3>{t("seasonalCare")}</h3>
                <p>{t("seasonalCareDesc")}</p>
              </div>
              <div className="offering-card">
                <div className="offering-icon">🏡</div>
                <h3>{t("gardenMaintenance")}</h3>
                <p>{t("gardenMaintenanceDesc")}</p>
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
                <h3>{t("siteAssessment")}</h3>
                <p>{t("evaluateSpaceSunlight")}</p>
              </div>
              <div className="process-step">
                <div className="step-number">2</div>
                <h3>{t("planning")}</h3>
                <p>{t("createCustomGarden")}</p>
              </div>
              <div className="process-step">
                <div className="step-number">3</div>
                <h3>{t("installation")}</h3>
                <p>{t("plantSelectionArrangement")}</p>
              </div>
              <div className="process-step">
                <div className="step-number">4</div>
                <h3>{t("ongoingCare")}</h3>
                <p>{t("regularMaintenanceSeasonal")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="service-cta">
          <div className="service-container">
            <h2>{t("readyTransformGarden")}</h2>
            <p>{t("createBeautifulThriving")}</p>
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

export default ServiceGardenPlanning;
