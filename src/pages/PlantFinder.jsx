// Import navbar shown on all pages
import Navbar from "../components/Navbar";

// Import React hooks
import { useState, useContext } from "react";

// Import plant data
import plantRecommendations from "../data/plantRecommendations";

// Import cart context so recommended plants can be added to cart
import { CartContext } from "../context/CartContext";

function PlantFinder() {
  // Access addToCart function from cart context
  const { addToCart } = useContext(CartContext);

  // Store user answers for each filter
  const [climate, setClimate] = useState("");
  const [location, setLocation] = useState("");
  const [sunlight, setSunlight] = useState("");
  const [careLevel, setCareLevel] = useState("");
  const [homeType, setHomeType] = useState("");
  const [watering, setWatering] = useState("");

  // Store final recommended plants after clicking the button
  const [recommendations, setRecommendations] = useState([]);

  // Option lists for the questions
  const climateOptions = ["Dry", "Humid", "Moderate"];
  const locationOptions = ["Indoors", "Outdoors", "Both"];
  const sunlightOptions = ["Full Sun", "Partial Sun", "Low Light"];
  const careOptions = ["Low Maintenance", "Moderate Care", "High Maintenance"];
  const homeOptions = ["Apartment", "House", "Office"];
  const wateringOptions = ["Low", "Moderate", "High"];

  // Filter plants using all selected choices
  const handleRecommendations = () => {
    const filteredPlants = plantRecommendations.filter((plant) => {
      return (
        (!climate || plant.climate.includes(climate)) &&
        (!location || plant.location.includes(location)) &&
        (!sunlight || plant.sunlight.includes(sunlight)) &&
        (!careLevel || plant.careLevel.includes(careLevel)) &&
        (!homeType || plant.homeType.includes(homeType)) &&
        (!watering || plant.watering.includes(watering))
      );
    });

    setRecommendations(filteredPlants);
  };

  // Clear all user selections and clear results
  const handleClearChoices = () => {
    setClimate("");
    setLocation("");
    setSunlight("");
    setCareLevel("");
    setHomeType("");
    setWatering("");
    setRecommendations([]);
  };

  // Add one recommended plant to cart
  const handleAddPlantToCart = (plant) => {
    const plantItem = {
      id: plant.id,
      month: "Recommended Plant",
      flower: plant.name,
      description: plant.reason,
      price: plant.price,
      details: {
        climate: plant.climate.join(", "),
        sunlight: plant.sunlight.join(", "),
        watering: plant.watering.join(", "),
        careLevel: plant.careLevel.join(", "),
      },
    };

    addToCart(plantItem);
  };

  // Sort results so Best Match cards always appear first
  const sortedRecommendations = [...recommendations].sort((a, b) => {
    return Number(b.bestMatch) - Number(a.bestMatch);
  });

  return (
    <div>
      <Navbar />

      <main className="plantfinder-page">
        {/* Hero section */}
        <section className="plantfinder-hero">
          <h1>Find Your Perfect Plant</h1>
          <p>
            Let us recommend the best plants for your lifestyle, home, and care
            preferences. Answer a few simple questions to discover your ideal
            plant match.
          </p>
        </section>

        {/* Main finder box */}
        <section className="plantfinder-box">
          {/* Climate */}
          <div className="finder-question">
            <h2>What is your climate like?</h2>

            <div className="finder-options">
              {climateOptions.map((item) => (
                <button
                  key={item}
                  className={
                    climate === item
                      ? "finder-option active-option"
                      : "finder-option"
                  }
                  onClick={() => setClimate(item)}
                >
                  <div className="finder-option-icon"></div>
                  <span>{item}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="finder-question">
            <h2>Where will the plant be placed?</h2>

            <div className="finder-options">
              {locationOptions.map((item) => (
                <button
                  key={item}
                  className={
                    location === item
                      ? "finder-option active-option"
                      : "finder-option"
                  }
                  onClick={() => setLocation(item)}
                >
                  <div className="finder-option-icon"></div>
                  <span>{item}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Sunlight */}
          <div className="finder-question">
            <h2>How much sunlight is available?</h2>

            <div className="finder-options">
              {sunlightOptions.map((item) => (
                <button
                  key={item}
                  className={
                    sunlight === item
                      ? "finder-option active-option"
                      : "finder-option"
                  }
                  onClick={() => setSunlight(item)}
                >
                  <div className="finder-option-icon"></div>
                  <span>{item}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Care level */}
          <div className="finder-question">
            <h2>How much care can you provide?</h2>

            <div className="finder-options">
              {careOptions.map((item) => (
                <button
                  key={item}
                  className={
                    careLevel === item
                      ? "finder-option active-option"
                      : "finder-option"
                  }
                  onClick={() => setCareLevel(item)}
                >
                  <div className="finder-option-icon"></div>
                  <span>{item}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Home type */}
          <div className="finder-question">
            <h2>What is your home type?</h2>

            <div className="finder-options">
              {homeOptions.map((item) => (
                <button
                  key={item}
                  className={
                    homeType === item
                      ? "finder-option active-option"
                      : "finder-option"
                  }
                  onClick={() => setHomeType(item)}
                >
                  <div className="finder-option-icon"></div>
                  <span>{item}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Watering */}
          <div className="finder-question">
            <h2>How often can you water your plant?</h2>

            <div className="finder-options">
              {wateringOptions.map((item) => (
                <button
                  key={item}
                  className={
                    watering === item
                      ? "finder-option active-option"
                      : "finder-option"
                  }
                  onClick={() => setWatering(item)}
                >
                  <div className="finder-option-icon"></div>
                  <span>{item}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="finder-actions">
            <button
              className="finder-btn primary-finder-btn"
              onClick={handleRecommendations}
            >
              Get Recommendations
            </button>

            <button
              className="finder-btn secondary-finder-btn"
              onClick={handleClearChoices}
            >
              Clear Choices
            </button>
          </div>

          {/* Recommendation results */}
          {sortedRecommendations.length > 0 && (
            <div className="recommendation-box">
              <h2>Recommended Plants</h2>

              <div className="recommendation-list">
                {sortedRecommendations.map((plant) => (
                  <div className="recommendation-card" key={plant.id}>
                    {/* Badge row keeps space consistent on all cards */}
                    <div className="recommendation-badge-row">
                      {plant.bestMatch ? (
                        <span className="best-match-badge">Best Match</span>
                      ) : (
                        <span className="best-match-placeholder"></span>
                      )}
                    </div>

                    {/* Image-ready wrapper */}
                    <div className="recommendation-image-wrapper">
                      {plant.image ? (
                        <img
                          src={plant.image}
                          alt={plant.name}
                          className="recommendation-real-image"
                        />
                      ) : (
                        <div className="recommendation-image"></div>
                      )}
                    </div>

                    <h3>{plant.name}</h3>

                    <p className="recommendation-reason">
                      {plant.reason}
                    </p>

                    <div className="plant-tags">
                      {plant.tags.map((tag) => (
                        <span key={tag} className="plant-tag">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Bottom area stays aligned across all cards */}
                    <div className="recommendation-footer">
                      <div className="recommendation-price">
                        {plant.price}
                      </div>

                      <button
                        className="plantfinder-cart-btn"
                        onClick={() => handleAddPlantToCart(plant)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No results */}
          {sortedRecommendations.length === 0 &&
            (climate ||
              location ||
              sunlight ||
              careLevel ||
              homeType ||
              watering) && (
              <div className="no-results-box">
                <p>
                  No exact matches yet. Try adjusting one or two preferences
                  for more results.
                </p>
              </div>
            )}
        </section>
      </main>
    </div>
  );
}

export default PlantFinder;