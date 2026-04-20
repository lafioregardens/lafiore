import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Slideshow from "../components/Slideshow";
import { useLanguage } from "../context/LanguageContext";
import planteriorImg from "../assets/images/planterior.jpg";
import in1 from "../assets/images/in1.jpg";
import in2 from "../assets/images/in2.jpg";
import in3 from "../assets/images/in3.jpg";
import in4 from "../assets/images/in4.jpg";
import "./ServiceDetail.css";

function ServicePlanteriorDesign() {
  const { t } = useLanguage();

  return (
    <div>
      <Navbar />

      <main className="service-detail-page">
        {/* Hero Section */}
        <section className="service-hero">
          <div className="service-hero-content">
            <h1>{t("planteriorDesign")}</h1>
            <p>{t("blendNatureDesign")}</p>
          </div>
        </section>

        {/* Overview Section */}
        <section className="service-section">
          <div className="service-container">
            <div className="service-content">
              <h2>{t("transformInteriorPlants")}</h2>
              <p>{t("planteriorDesc1")}</p>
              <p>{t("planteriorDesc2")}</p>
            </div>
            <Slideshow images={[planteriorImg, in1, in2, in3, in4]} />
          </div>
        </section>

        {/* What We Offer */}
        <section className="service-section service-section-alt">
          <div className="service-container">
            <h2>{t("whatWeOffer")}</h2>
            <div className="service-offerings">
              <div className="offering-card">
                <div className="offering-icon">🪴</div>
                <h3>{t("plantStyling")}</h3>
                <p>{t("plantStylingDesc")}</p>
              </div>
              <div className="offering-card">
                <div className="offering-icon">🎨</div>
                <h3>{t("decorIntegration")}</h3>
                <p>{t("decorIntegrationDesc")}</p>
              </div>
              <div className="offering-card">
                <div className="offering-icon">🌿</div>
                <h3>{t("livingWallsFeatures")}</h3>
                <p>{t("livingWallsDesc")}</p>
              </div>
              <div className="offering-card">
                <div className="offering-icon">💚</div>
                <h3>{t("plantCareGuidance")}</h3>
                <p>{t("plantCareGuidanceDesc")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="service-section">
          <div className="service-container">
            <h2>{t("whyPlanteriorDesign")}</h2>
            <div className="benefits-grid">
              <div className="benefit-item">
                <h3>{t("improveAirQuality")}</h3>
                <p>{t("plantsPurifyAir")}</p>
              </div>
              <div className="benefit-item">
                <h3>{t("boostMoodProductivity")}</h3>
                <p>{t("geeeryReducesStress")}</p>
              </div>
              <div className="benefit-item">
                <h3>{t("enhanceAesthetics")}</h3>
                <p>{t("plantsAddDepth")}</p>
              </div>
              <div className="benefit-item">
                <h3>{t("personalizedStyle")}</h3>
                <p>{t("createUniqueOne")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="service-section service-section-alt">
          <div className="service-container">
            <h2>{t("ourProcess")}</h2>
            <div className="process-steps">
              <div className="process-step">
                <div className="step-number">1</div>
                <h3>{t("spaceAnalysis")}</h3>
                <p>{t("assessLighting")}</p>
              </div>
              <div className="process-step">
                <div className="step-number">2</div>
                <h3>{t("designPlan")}</h3>
                <p>{t("createCustomPlanPlant")}</p>
              </div>
              <div className="process-step">
                <div className="step-number">3</div>
                <h3>{t("implementation")}</h3>
                <p>{t("sourcePlantsStyleSpace")}</p>
              </div>
              <div className="process-step">
                <div className="step-number">4</div>
                <h3>{t("support")}</h3>
                <p>{t("providePlantCareAdjust")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="service-cta">
          <div className="service-container">
            <h2>{t("readyBringNature")}</h2>
            <p>{t("createBeautifulPlantFilled")}</p>
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

export default ServicePlanteriorDesign;
