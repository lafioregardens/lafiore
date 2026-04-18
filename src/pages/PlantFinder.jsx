import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useMemo, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import WishlistButton from "../components/WishlistButton";

// Plant images
import snakePlantImg from "../assets/products/plants/snakeplant.jpg";
import zzPlantImg from "../assets/products/plants/zz.jpg";
import pothosImg from "../assets/products/plants/pothos.jpg";
import spiderPlantImg from "../assets/products/plants/spiderplant.jpg";
import peaceLilyImg from "../assets/products/plants/peacelilyplant.jpg";
import monsteraImg from "../assets/products/plants/monstera.jpg";
import aloeVeraImg from "../assets/products/plants/aloevera.jpg";
import lavenderImg from "../assets/products/plants/lavenderplant.jpg";
import fernImg from "../assets/products/plants/fern.jpg";
import hostaImg from "../assets/products/plants/hosta.jpg";
import jadePlantImg from "../assets/products/plants/jadeplant.jpg";
import succulentImg from "../assets/products/plants/succulentmix.jpg";
import moneyPlantImg from "../assets/products/plants/moneyplant.jpg";
import rubberPlantImg from "../assets/products/plants/rubberplant.jpg";
import fiddleLeafFigImg from "../assets/products/plants/fiddleleaffig.jpg";
import orchidImg from "../assets/products/plants/orchidplant.jpg";
import bougainvilleaImg from "../assets/products/plants/bougainvillea.jpg";
import hibiscusImg from "../assets/products/plants/hibiscus.jpg";
import azaleaImg from "../assets/products/plants/azalea.jpg";

// Plant Finder page
function PlantFinder() {
  const { addToCart } = useContext(CartContext);
  const { t } = useLanguage();

  // Store selected answers for each question
  const [answers, setAnswers] = useState({
    experience: "",
    location: "",
    sunlight: "",
    watering: "",
    petSafe: "",
    purpose: "",
  });


  // All plant recommendations - use translation keys for names and descriptions
  const getPlantData = () => [
    {
      id: 1,
      nameKey: "snakePlant",
      descKey: "snakePlantDesc",
      price: "AED 85.00",
      tags: ["Air Purifying", "Low Maintenance"],
      scoreTags: ["beginner", "indoors", "low light", "forgetful", "no pets needed", "air purifying"],
      image: snakePlantImg,
    },
    {
      id: 2,
      nameKey: "zzPlant",
      descKey: "zzPlantDesc",
      price: "AED 95.00",
      tags: ["Low Maintenance", "Indoor"],
      scoreTags: ["beginner", "indoors", "low light", "forgetful", "no pets needed", "decorative"],
      image: zzPlantImg,
    },
    {
      id: 3,
      nameKey: "pothos",
      descKey: "pothosDesc",
      price: "AED 65.00",
      tags: ["Air Purifying", "Indoor"],
      scoreTags: ["beginner", "indoors", "medium light", "weekly", "no pets needed", "air purifying"],
      image: pothosImg,
    },
    {
      id: 4,
      nameKey: "spiderPlant",
      descKey: "spiderPlantDesc",
      price: "AED 70.00",
      tags: ["Air Purifying", "Pet Safe"],
      scoreTags: ["beginner", "indoors", "medium light", "weekly", "pet safe", "air purifying"],
      image: spiderPlantImg,
    },
    {
      id: 5,
      nameKey: "peaceLily",
      descKey: "peaceLilyDesc",
      price: "AED 110.00",
      tags: ["Air Purifying", "Flowering"],
      scoreTags: ["some experience", "indoors", "low light", "weekly", "no pets needed", "decorative"],
      image: peaceLilyImg,
    },
    {
      id: 6,
      nameKey: "monsteraDeliciosa",
      descKey: "monsteraDeliciosaDesc",
      price: "AED 120.00",
      tags: ["Indoor", "Decorative"],
      scoreTags: ["some experience", "indoors", "medium light", "weekly", "no pets needed", "decorative"],
      image: monsteraImg,
    },
    {
      id: 7,
      nameKey: "aloeVera",
      descKey: "aloeVeraDesc",
      price: "AED 60.00",
      tags: ["Medicinal", "Low Maintenance"],
      scoreTags: ["beginner", "indoors", "bright light", "forgetful", "no pets needed", "functional"],
      image: aloeVeraImg,
    },
    {
      id: 8,
      nameKey: "lavender",
      descKey: "lavenderDesc",
      price: "AED 75.00",
      tags: ["Fragrant", "Outdoor"],
      scoreTags: ["some experience", "outdoors", "bright light", "weekly", "pet safe", "functional"],
      image: lavenderImg,
    },
    {
      id: 9,
      nameKey: "fern",
      descKey: "fernDesc",
      price: "AED 68.00",
      tags: ["Outdoor", "Greenery"],
      scoreTags: ["experienced", "outdoors", "low light", "often", "pet safe", "decorative"],
      image: fernImg,
    },
    {
      id: 10,
      nameKey: "arecaPalm",
      descKey: "arecaPalmDesc",
      price: "AED 130.00",
      tags: ["Indoor", "Tropical"],
      scoreTags: ["some experience", "indoors", "medium light", "weekly", "no pets needed", "decorative"],
      image: hostaImg,
    },
    {
      id: 11,
      nameKey: "jadePlant",
      descKey: "jadePlantDesc",
      price: "AED 58.00",
      tags: ["Succulent", "Low Maintenance"],
      scoreTags: ["beginner", "indoors", "bright light", "forgetful", "no pets needed", "decorative"],
      image: jadePlantImg,
    },
    {
      id: 13,
      nameKey: "succulentMix",
      descKey: "succulentMixDesc",
      price: "AED 72.00",
      tags: ["Low Maintenance", "Succulent"],
      scoreTags: ["beginner", "indoors", "bright light", "forgetful", "no pets needed", "decorative"],
      image: succulentImg,
    },
    {
      id: 14,
      nameKey: "moneyPlant",
      descKey: "moneyPlantDesc",
      price: "AED 55.00",
      tags: ["Indoor", "Lucky Plant"],
      scoreTags: ["beginner", "indoors", "medium light", "weekly", "no pets needed", "decorative"],
      image: moneyPlantImg,
    },
    {
      id: 15,
      nameKey: "rubberPlant",
      descKey: "rubberPlantDesc",
      price: "AED 105.00",
      tags: ["Air Purifying", "Decorative"],
      scoreTags: ["some experience", "indoors", "medium light", "weekly", "no pets needed", "air purifying"],
      image: rubberPlantImg,
    },
    {
      id: 16,
      name: "Fiddle Leaf Fig",
      description: "A trendy tall plant with large violin-shaped leaves, adds dramatic style.",
      price: "AED 125.00",
      tags: ["Decorative", "Trendy"],
      scoreTags: ["some experience", "indoors", "bright light", "weekly", "no pets needed", "decorative"],
      image: fiddleLeafFigImg,
    },
    {
      id: 17,
      name: "Orchid",
      description: "An elegant flowering plant with long-lasting blooms, perfect for collectors.",
      price: "AED 115.00",
      tags: ["Flowering", "Tropical"],
      scoreTags: ["some experience", "indoors", "medium light", "weekly", "no pets needed", "decorative"],
      image: orchidImg,
    },
    {
      id: 18,
      name: "Bonsai",
      description: "A miniature artistic tree that requires patience and attention to detail.",
      price: "AED 135.00",
      tags: ["Art Form", "Indoor"],
      scoreTags: ["experienced", "indoors", "bright light", "often", "no pets needed", "decorative"],
      image: succulentImg,
    },
    {
      id: 19,
      name: "Bougainvillea",
      description: "A vibrant flowering shrub with colorful blooms, perfect for sunny outdoor spaces.",
      price: "AED 80.00",
      tags: ["Flowering", "Outdoor"],
      scoreTags: ["some experience", "outdoors", "bright light", "weekly", "no pets needed", "decorative"],
      image: bougainvilleaImg,
    },
    {
      id: 20,
      name: "Hibiscus",
      description: "A tropical flowering plant with stunning blooms, thrives in bright sunlight.",
      price: "AED 90.00",
      tags: ["Flowering", "Tropical"],
      scoreTags: ["some experience", "outdoors", "bright light", "weekly", "no pets needed", "decorative"],
      image: hibiscusImg,
    },
    {
      id: 21,
      name: "Parlour Palm",
      description: "An elegant indoor palm with tropical vibes, adds height and greenery to spaces.",
      price: "AED 145.00",
      tags: ["Indoor", "Tropical"],
      scoreTags: ["some experience", "indoors", "medium light", "weekly", "no pets needed", "decorative"],
      image: azaleaImg,
    },
  ];

  // Filter sections - uses translation keys
  const filterSections = [
    {
      key: "experience",
      title: t("experienceLevel"),
      options: [
        { label: t("anyLevel"), value: "" },
        { label: t("beginner"), value: "beginner" },
        { label: t("someExperience"), value: "some experience" },
        { label: t("experienced"), value: "experienced" },
      ],
    },
    {
      key: "location",
      title: t("location"),
      options: [
        { label: t("anyLocation"), value: "" },
        { label: t("indoors"), value: "indoors" },
        { label: t("outdoors"), value: "outdoors" },
        { label: t("both"), value: "both" },
      ],
    },
    {
      key: "sunlight",
      title: t("lightConditions"),
      options: [
        { label: t("anyLightLevel"), value: "" },
        { label: t("lowLight"), value: "low light" },
        { label: t("mediumLight"), value: "medium light" },
        { label: t("brightLight"), value: "bright light" },
      ],
    },
    {
      key: "watering",
      title: t("wateringFrequency"),
      options: [
        { label: t("anyWateringNeed"), value: "" },
        { label: t("rarelyWatering"), value: "forgetful" },
        { label: t("weeklyWatering"), value: "weekly" },
        { label: t("frequentlyWatering"), value: "often" },
      ],
    },
    {
      key: "petSafe",
      title: t("petsHome"),
      options: [
        { label: t("noPreference"), value: "" },
        { label: t("noLabel"), value: "no pets needed" },
        { label: t("yesLabel"), value: "pet safe" },
      ],
    },
    {
      key: "purpose",
      title: t("mainGoal"),
      options: [
        { label: t("anyPurpose"), value: "" },
        { label: t("airPurifying"), value: "air purifying" },
        { label: t("decorativeBeauty"), value: "decorative" },
        { label: t("functionalUse"), value: "functional" },
      ],
    },
  ];

  // Update one answer
  const handleSelect = (key, value) => {
    setAnswers((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Reset all selected answers
  const handleClearOptions = () => {
    setAnswers({
      experience: "",
      location: "",
      sunlight: "",
      watering: "",
      petSafe: "",
      purpose: "",
    });
  };

  // Build recommended plants with match score
  const plantData = getPlantData();

  const recommendedPlants = useMemo(() => {
    const selectedValues = Object.values(answers).filter(Boolean);

    // If no filters selected, return empty array
    if (selectedValues.length === 0) {
      return [];
    }

    // Main filter categories: watering, experience, light
    const mainCategories = ["forgetful", "weekly", "often", "beginner", "some experience", "experienced", "low light", "medium light", "bright light"];

    // Add score to each plant (prioritize main categories)
    const scoredPlants = plantData.map((plant) => {
      let mainScore = 0; // Score for main categories (watering, experience, light)
      let otherScore = 0; // Score for secondary categories (pet safe, purpose, location)

      selectedValues.forEach((value) => {
        if (plant.scoreTags.includes(value)) {
          if (mainCategories.includes(value)) {
            mainScore += 1;
          } else {
            otherScore += 1;
          }
        }

        // "both" location should count for indoor and outdoor plants
        if (
          value === "both" &&
          (plant.scoreTags.includes("indoors") || plant.scoreTags.includes("outdoors"))
        ) {
          otherScore += 1;
        }
      });

      return { ...plant, mainScore, otherScore, score: mainScore + otherScore };
    });

    // Filter to only show plants matching at least 2 of the main 3 categories
    const filteredPlants = scoredPlants.filter((plant) => plant.mainScore >= 2);

    // Keep best matches first, then other recommendations
    return filteredPlants.sort((a, b) => {
      // Higher score first
      if (b.score !== a.score) return b.score - a.score;

      // If same score, lower price first
      const priceA = Number(a.price.replace("AED", "").trim());
      const priceB = Number(b.price.replace("AED", "").trim());
      return priceA - priceB;
    });
  }, [answers]);

  // Add selected recommendation to cart
  const handleAddToCart = (plant) => {
    addToCart({
      id: `plantfinder-${plant.id}`,
      month: "Plant Finder",
      flower: plant.name,
      description: plant.description,
      price: plant.price,
      details: {
        source: "Plant Finder Recommendation",
        tags: plant.tags.join(", "),
      },
    });
  };

  return (
    <div>
      <Navbar />

      <main className="plant-finder-page">
        {/* Hero */}
        <section className="plant-finder-hero">
          <h1>{t("findPerfectPlant")}</h1>
          <p>{t("plantFinderDesc")}</p>
        </section>

        {/* Main Content - Sidebar + Results */}
        <section className="plant-finder-container">
          {/* Sidebar Filters */}
          <aside className="plant-finder-sidebar">
            <h2>{t("tellUsSpace")}</h2>

            {filterSections.map((section) => (
              <div className="filter-section" key={section.key}>
                <label className="filter-label">{section.title}</label>
                <select
                  className="filter-select"
                  value={answers[section.key]}
                  onChange={(e) => handleSelect(section.key, e.target.value)}
                >
                  {section.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}

            <button className="clear-options-btn" onClick={handleClearOptions}>
              {t("clearOptions")}
            </button>
          </aside>

          {/* Results Area */}
          <div className="plant-results">
            {recommendedPlants.length === 0 && Object.values(answers).every(val => !val) ? (
              <div className="empty-state">
                <div className="empty-icon">🪴</div>
                <h3>Find Your Perfect Plant</h3>
                <p>
                  Select your preferences above to get personalized plant recommendations!
                </p>
              </div>
            ) : recommendedPlants.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🌱</div>
                <h3>No matching plants found</h3>
                <p>
                  Try adjusting your preferences to see more options.
                </p>
              </div>
            ) : (
              <>
                <h2 className="results-title">
                  {recommendedPlants.length} Plant{recommendedPlants.length !== 1 ? "s" : ""}{" "}
                  Found
                </h2>
                <div className="plant-grid">
                  {recommendedPlants.map((plant, index) => {
                    const isBestMatch = plant.score > 0 && index < 3;

                    return (
                      <PlantCard
                        key={plant.id}
                        plant={plant}
                        isBestMatch={isBestMatch}
                        addToCart={handleAddToCart}
                      />
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function PlantCard({ plant, isBestMatch, addToCart }) {
  const { t } = useLanguage();
  const plantName = t(plant.nameKey);
  const plantDesc = t(plant.descKey);

  return (
    <article className={isBestMatch ? "plant-card best-match-card" : "plant-card"}>
      {isBestMatch && <span className="best-match-badge">Best Match</span>}

      <div className="plant-image-container">
        {plant.image ? (
          <img src={plant.image} alt={plantName} className="plant-image" />
        ) : (
          <div className="plant-image-placeholder">
            <span className="plant-emoji">🌿</span>
          </div>
        )}
        <div className="plant-wishlist-btn">
          <WishlistButton product={{ ...plant, name: plantName }} />
        </div>
      </div>

      <div className="plant-content">
        <h3>{plantName}</h3>
        <p className="plant-description">{plantDesc}</p>

        <div className="plant-tags">
          {plant.tags.map((tag) => (
            <span key={tag} className="plant-tag">
              {tag}
            </span>
          ))}
        </div>

        <p className="plant-price">{plant.price}</p>

        <button className="plant-add-btn" onClick={() => addToCart(plant)}>
          {t("addToCart")}
        </button>
      </div>
    </article>
  );
}

export default PlantFinder;