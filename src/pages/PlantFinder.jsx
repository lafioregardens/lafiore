import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useMemo, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

// Plant Finder page
function PlantFinder() {
  const { addToCart } = useContext(CartContext);

  // Store selected answers for each question
  const [answers, setAnswers] = useState({
    experience: "",
    location: "",
    sunlight: "",
    watering: "",
    petSafe: "",
    purpose: "",
  });


  // All plant recommendations
  const plantData = [
    {
      id: 1,
      name: "Snake Plant",
      description: "Perfect for low light spaces and needs very little watering.",
      price: "AED 85.00",
      tags: ["Air Purifying", "Low Maintenance"],
      scoreTags: ["beginner", "indoors", "low light", "forgetful", "no pets needed", "air purifying"],
      image: "",
    },
    {
      id: 2,
      name: "ZZ Plant",
      description: "A great choice for low light and busy plant owners.",
      price: "AED 95.00",
      tags: ["Low Maintenance", "Indoor"],
      scoreTags: ["beginner", "indoors", "low light", "forgetful", "no pets needed", "decorative"],
      image: "",
    },
    {
      id: 3,
      name: "Pothos",
      description: "Easy to grow and adapts well to many indoor settings.",
      price: "AED 65.00",
      tags: ["Air Purifying", "Indoor"],
      scoreTags: ["beginner", "indoors", "medium light", "weekly", "no pets needed", "air purifying"],
      image: "",
    },
    {
      id: 4,
      name: "Spider Plant",
      description: "A beginner-friendly plant that grows well in many homes.",
      price: "AED 70.00",
      tags: ["Air Purifying", "Pet Safe"],
      scoreTags: ["beginner", "indoors", "medium light", "weekly", "pet safe", "air purifying"],
      image: "",
    },
    {
      id: 5,
      name: "Peace Lily",
      description: "Ideal for indoor spaces and adds elegant blooms.",
      price: "AED 110.00",
      tags: ["Air Purifying", "Flowering"],
      scoreTags: ["some experience", "indoors", "low light", "weekly", "no pets needed", "decorative"],
      image: "",
    },
    {
      id: 6,
      name: "Monstera Deliciosa",
      description: "A stylish tropical plant for bright indoor corners.",
      price: "AED 120.00",
      tags: ["Indoor", "Decorative"],
      scoreTags: ["some experience", "indoors", "medium light", "weekly", "no pets needed", "decorative"],
      image: "",
    },
    {
      id: 7,
      name: "Aloe Vera",
      description: "A hardy plant that loves bright light and minimal watering.",
      price: "AED 60.00",
      tags: ["Medicinal", "Low Maintenance"],
      scoreTags: ["beginner", "indoors", "bright light", "forgetful", "no pets needed", "functional"],
      image: "",
    },
    {
      id: 8,
      name: "Lavender",
      description: "A fragrant favorite that thrives outdoors in sunny spots.",
      price: "AED 75.00",
      tags: ["Fragrant", "Outdoor"],
      scoreTags: ["some experience", "outdoors", "bright light", "weekly", "pet safe", "functional"],
      image: "",
    },
    {
      id: 9,
      name: "Fern",
      description: "A lush choice for shaded areas with regular moisture.",
      price: "AED 68.00",
      tags: ["Outdoor", "Greenery"],
      scoreTags: ["experienced", "outdoors", "low light", "often", "pet safe", "decorative"],
      image: "",
    },
    {
      id: 10,
      name: "Areca Palm",
      description: "A graceful indoor palm that brightens living spaces.",
      price: "AED 130.00",
      tags: ["Indoor", "Tropical"],
      scoreTags: ["some experience", "indoors", "medium light", "weekly", "no pets needed", "decorative"],
      image: "",
    },
    {
      id: 11,
      name: "Jade Plant",
      description: "Compact and resilient, ideal for desks and sunny rooms.",
      price: "AED 58.00",
      tags: ["Succulent", "Low Maintenance"],
      scoreTags: ["beginner", "indoors", "bright light", "forgetful", "no pets needed", "decorative"],
      image: "",
    },
    {
      id: 13,
      name: "Succulent Mix",
      description: "A collection of hardy succulents that thrive with minimal water and bright light.",
      price: "AED 72.00",
      tags: ["Low Maintenance", "Succulent"],
      scoreTags: ["beginner", "indoors", "bright light", "forgetful", "no pets needed", "decorative"],
      image: "",
    },
    {
      id: 14,
      name: "Money Plant",
      description: "A trailing vine believed to bring prosperity, easy to grow and adaptable.",
      price: "AED 55.00",
      tags: ["Indoor", "Lucky Plant"],
      scoreTags: ["beginner", "indoors", "medium light", "weekly", "no pets needed", "decorative"],
      image: "",
    },
    {
      id: 15,
      name: "Rubber Plant",
      description: "A stunning decorative plant with large dark leaves that purifies air.",
      price: "AED 105.00",
      tags: ["Air Purifying", "Decorative"],
      scoreTags: ["some experience", "indoors", "medium light", "weekly", "no pets needed", "air purifying"],
      image: "",
    },
    {
      id: 16,
      name: "Fiddle Leaf Fig",
      description: "A trendy tall plant with large violin-shaped leaves, adds dramatic style.",
      price: "AED 125.00",
      tags: ["Decorative", "Trendy"],
      scoreTags: ["some experience", "indoors", "bright light", "weekly", "no pets needed", "decorative"],
      image: "",
    },
    {
      id: 17,
      name: "Orchid",
      description: "An elegant flowering plant with long-lasting blooms, perfect for collectors.",
      price: "AED 115.00",
      tags: ["Flowering", "Tropical"],
      scoreTags: ["some experience", "indoors", "medium light", "weekly", "no pets needed", "decorative"],
      image: "",
    },
    {
      id: 18,
      name: "Bonsai",
      description: "A miniature artistic tree that requires patience and attention to detail.",
      price: "AED 135.00",
      tags: ["Art Form", "Indoor"],
      scoreTags: ["experienced", "indoors", "bright light", "often", "no pets needed", "decorative"],
      image: "",
    },
    {
      id: 19,
      name: "Bougainvillea",
      description: "A vibrant flowering shrub with colorful blooms, perfect for sunny outdoor spaces.",
      price: "AED 80.00",
      tags: ["Flowering", "Outdoor"],
      scoreTags: ["some experience", "outdoors", "bright light", "weekly", "no pets needed", "decorative"],
      image: "",
    },
    {
      id: 20,
      name: "Hibiscus",
      description: "A tropical flowering plant with stunning blooms, thrives in bright sunlight.",
      price: "AED 90.00",
      tags: ["Flowering", "Tropical"],
      scoreTags: ["some experience", "outdoors", "bright light", "weekly", "no pets needed", "decorative"],
      image: "",
    },
    {
      id: 21,
      name: "Parlour Palm",
      description: "An elegant indoor palm with tropical vibes, adds height and greenery to spaces.",
      price: "AED 145.00",
      tags: ["Indoor", "Tropical"],
      scoreTags: ["some experience", "indoors", "medium light", "weekly", "no pets needed", "decorative"],
      image: "",
    },
  ];

  // Filter sections
  const filterSections = [
    {
      key: "experience",
      title: "Experience Level",
      options: [
        { label: "Any Level", value: "" },
        { label: "Beginner", value: "beginner" },
        { label: "Some Experience", value: "some experience" },
        { label: "Experienced", value: "experienced" },
      ],
    },
    {
      key: "location",
      title: "Location",
      options: [
        { label: "Any Location", value: "" },
        { label: "Indoors", value: "indoors" },
        { label: "Outdoors", value: "outdoors" },
        { label: "Both", value: "both" },
      ],
    },
    {
      key: "sunlight",
      title: "Light Conditions",
      options: [
        { label: "Any Light Level", value: "" },
        { label: "Low Light", value: "low light" },
        { label: "Medium Light", value: "medium light" },
        { label: "Bright Light", value: "bright light" },
      ],
    },
    {
      key: "watering",
      title: "Watering Frequency",
      options: [
        { label: "Any Watering Need", value: "" },
        { label: "Rarely (Every 2-3 weeks)", value: "forgetful" },
        { label: "Weekly", value: "weekly" },
        { label: "Frequently (2-3 times/week)", value: "often" },
      ],
    },
    {
      key: "petSafe",
      title: "Do you have pets at home?",
      options: [
        { label: "No Preference", value: "" },
        { label: "No", value: "no pets needed" },
        { label: "Yes", value: "pet safe" },
      ],
    },
    {
      key: "purpose",
      title: "Main Goal",
      options: [
        { label: "Any Purpose", value: "" },
        { label: "Air Purifying", value: "air purifying" },
        { label: "Decorative Beauty", value: "decorative" },
        { label: "Functional Use", value: "functional" },
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
          <h1>Find Your Perfect Plant</h1>
          <p>
            Answer a few quick questions and discover plant recommendations that
            best match your home, care style, and light conditions.
          </p>
        </section>

        {/* Main Content - Sidebar + Results */}
        <section className="plant-finder-container">
          {/* Sidebar Filters */}
          <aside className="plant-finder-sidebar">
            <h2>Tell Us About Your Space</h2>

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
              Clear Options
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
  return (
    <article className={isBestMatch ? "plant-card best-match-card" : "plant-card"}>
      {isBestMatch && <span className="best-match-badge">Best Match</span>}

      <div className="plant-image-container">
        {plant.image ? (
          <img src={plant.image} alt={plant.name} className="plant-image" />
        ) : (
          <div className="plant-image-placeholder">
            <span className="plant-emoji">🌿</span>
          </div>
        )}
      </div>

      <div className="plant-content">
        <h3>{plant.name}</h3>
        <p className="plant-description">{plant.description}</p>

        <div className="plant-tags">
          {plant.tags.map((tag) => (
            <span key={tag} className="plant-tag">
              {tag}
            </span>
          ))}
        </div>

        <p className="plant-price">{plant.price}</p>

        <button className="plant-add-btn" onClick={() => addToCart(plant)}>
          Add to Cart
        </button>
      </div>
    </article>
  );
}

export default PlantFinder;