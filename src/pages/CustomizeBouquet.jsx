import { useState, useMemo, useContext } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CartContext } from "../context/CartContext";

import aster from "../assets/custombouquet/aster.jpg";
import babysbreath  from "../assets/custombouquet/babysbreath.jpg";
import carnation from "../assets/custombouquet/carnation.jpeg";
import Chrysanthemum from "../assets/custombouquet/Chrysanthemum.jpg";
import daffodil from "../assets/custombouquet/daffodil.jpg";
import daisy from "../assets/custombouquet/daisy.jpg";
import gladiolus from "../assets/custombouquet/gladiolus.jpg";
import iris from "../assets/custombouquet/iris.jpg";
import larkspur from "../assets/custombouquet/larkspur.jpg";
import lily from "../assets/custombouquet/lily.jpg";
import marigold from "../assets/custombouquet/marigold.jpg";
import narcissus from "../assets/custombouquet/narcissus.jpg";
import Nasturtium from "../assets/custombouquet/Nasturtium.jpg";
import orchid from "../assets/custombouquet/orchid.jpg";
import pansy from "../assets/custombouquet/pansy.jpg";
import peony from "../assets/custombouquet/peony.jpg";
import Primrose from "../assets/custombouquet/Primrose.jpg";
import rose from "../assets/custombouquet/rose.jpg";
import tulip from "../assets/custombouquet/tulip.jpg";
import Violets from "../assets/custombouquet/Violets.jpg";

function CustomizeBouquet() {
  const { addToCart } = useContext(CartContext);

  // Tracks which step the user is currently on
  const [step, setStep] = useState(1);

  // Stores the optional message written by the user
  const [message, setMessage] = useState("");

  // Stores the selected wrapping choice
  const [selectedWrap, setSelectedWrap] = useState(null);

  // Stores the selected bouquet size
  const [selectedSize, setSelectedSize] = useState(null);

  // Flower list with price and color options
  const flowerOptions = [
    {
      id: 1,
      name: "Carnation",
      price: 8,
      colors: ["Pink", "White", "Red", "Peach"],
      image: carnation,
    },
    {
      id: 2,
      name: "Violet",
      price: 7,
      colors: ["Purple", "Blue", "White"],
      image: Violets,
    },
    {
      id: 3,
      name: "Daffodil",
      price: 9,
      colors: ["Yellow", "White"],
      image: daffodil,
    },
    {
      id: 4,
      name: "Daisy",
      price: 7,
      colors: ["White", "Yellow", "Pink"],
      image: daisy,
    },
    {
      id: 5,
      name: "Lily",
      price: 14,
      colors: ["White", "Pink", "Orange"],
      image: lily,
    },
    {
      id: 6,
      name: "Rose",
      price: 12,
      colors: ["Red", "Pink", "White", "Yellow"],
      image: rose,
    },
    {
      id: 7,
      name: "Larkspur",
      price: 10,
      colors: ["Purple", "Blue", "Pink"],
      image: larkspur,
    },
    {
      id: 8,
      name: "Gladiolus",
      price: 11,
      colors: ["White", "Pink", "Red", "Yellow"],
      image: gladiolus,
    },
    {
      id: 9,
      name: "Aster",
      price: 8,
      colors: ["Purple", "Pink", "White"],
      image: aster,
    },
    {
      id: 10,
      name: "Marigold",
      price: 7,
      colors: ["Orange", "Yellow"],
      image: marigold,
    },
    {
      id: 11,
      name: "Chrysanthemum",
      price: 9,
      colors: ["White", "Yellow", "Pink", "Purple"],
      image: Chrysanthemum,
    },
    {
      id: 12,
      name: "Narcissus",
      price: 9,
      colors: ["White", "Yellow"],
      image: narcissus,
    },
    {
      id: 13,
      name: "Baby's Breath",
      price: 6,
      colors: ["White", "Pink"],
      image: babysbreath,
    },
    {
      id: 14,
      name: "Pansy",
      price: 7,
      colors: ["Purple", "Yellow", "Blue"],
      image: pansy,
    },
    {
      id: 15,
      name: "Nasturtium",
      price: 7,
      colors: ["Orange", "Red", "Yellow"],
      image: Nasturtium,
    },
    {
      id: 16,
      name: "Tulips",
      price: 10,
      colors: ["Pink", "White", "Yellow", "Purple"],
      image: tulip,
    },
    {
      id: 17,
      name: "Primrose",
      price: 8,
      colors: ["Pink", "Purple", "White", "Mixed"],
      image: Primrose,
    },
    {
      id: 18,
      name: "Peony",
      price: 15,
      colors: ["Pink", "White", "Blush"],
      image: peony,
    },
    {
      id: 19,
      name: "Iris",
      price: 11,
      colors: ["Purple", "Blue", "White"],
      image: iris,
    },
    {
      id: 20,
      name: "Orchid",
      price: 16,
      colors: ["White", "Purple", "Pink"],
      image: orchid,
    },
  ];

  // Wrapping options and their prices
  const wrappingOptions = [
    { id: 1, name: "Kraft Wrap", price: 15 },
    { id: 2, name: "Classic White Wrap", price: 18 },
    { id: 3, name: "Luxury Satin Wrap", price: 25 },
    { id: 4, name: "Transparent Elegant Wrap", price: 20 },
  ];

  // Bouquet size options and added prices
  const sizeOptions = [
    { id: 1, name: "Small", price: 0 },
    { id: 2, name: "Medium", price: 20 },
    { id: 3, name: "Large", price: 40 },
  ];

  // Stores selected flowers with color + quantity
  // Example item:
  // {
  //   flowerId: 6,
  //   name: "Rose",
  //   color: "Red",
  //   price: 12,
  //   quantity: 2
  // }
  const [selectedFlowers, setSelectedFlowers] = useState([]);

  // Adds a flower to bouquet using the currently chosen color
  const addFlower = (flower, color) => {
    if (!color) return;

    setSelectedFlowers((prev) => {
      const existingItem = prev.find(
        (item) => item.flowerId === flower.id && item.color === color
      );

      if (existingItem) {
        return prev.map((item) =>
          item.flowerId === flower.id && item.color === color
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...prev,
        {
          flowerId: flower.id,
          name: flower.name,
          color,
          price: flower.price,
          quantity: 1,
        },
      ];
    });
  };

  // Increase quantity of one flower/color combination
  const increaseFlower = (flowerId, color) => {
    setSelectedFlowers((prev) =>
      prev.map((item) =>
        item.flowerId === flowerId && item.color === color
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease quantity of one flower/color combination
  const decreaseFlower = (flowerId, color) => {
    setSelectedFlowers((prev) =>
      prev
        .map((item) =>
          item.flowerId === flowerId && item.color === color
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Total price of selected flowers
  const flowersTotal = useMemo(() => {
    return selectedFlowers.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }, [selectedFlowers]);

  // Wrapping total
  const wrapTotal = selectedWrap ? selectedWrap.price : 0;

  // Size total
  const sizeTotal = selectedSize ? selectedSize.price : 0;

  // Final bouquet total
  const bouquetTotal = flowersTotal + wrapTotal + sizeTotal;

  // Add custom bouquet to cart
  const handleAddBouquetToCart = () => {
    const bouquetDetails = {
      flowers: selectedFlowers.length
        ? selectedFlowers
            .map((item) => `${item.name} (${item.color}) x${item.quantity}`)
            .join(", ")
        : "No flowers selected",
      wrapping: selectedWrap ? selectedWrap.name : "Not selected",
      size: selectedSize ? selectedSize.name : "Not selected",
      message: message ? message : "No message added",
    };

    addToCart({
      id: Date.now(),
      month: "Custom Bouquet",
      flower: "Customized Bouquet",
      description: "A bouquet created by the customer.",
      price: `AED ${bouquetTotal.toFixed(2)}`,
      details: bouquetDetails,
      customType: "bouquet",
    });
  };

  return (
    <div>
      <Navbar />

      <main className="custom-bouquet-page">
        <section className="custom-bouquet-hero">
          <h1>Customize Your Bouquet</h1>
          <p>
            Choose your flowers, colors, wrapping, size, and an optional message.
          </p>
        </section>

        {/* Progress indicator */}
        <section className="bouquet-progress">
          <div className={step === 1 ? "progress-step active-step" : "progress-step"}>
            1. Flowers
          </div>
          <div className={step === 2 ? "progress-step active-step" : "progress-step"}>
            2. Wrapping
          </div>
          <div className={step === 3 ? "progress-step active-step" : "progress-step"}>
            3. Size
          </div>
          <div className={step === 4 ? "progress-step active-step" : "progress-step"}>
            4. Review
          </div>
          <div className={step === 5 ? "progress-step active-step" : "progress-step"}>
            5. Message
          </div>
        </section>

        <section className="custom-bouquet-builder">
          {/* STEP 1 */}
          {step === 1 && (
            <div className="bouquet-step-section">
              <h2>Select Flowers</h2>

              <div className="bouquet-flower-grid">
                {flowerOptions.map((flower) => (
                  <FlowerCard
                    key={flower.id}
                    flower={flower}
                    selectedFlowers={selectedFlowers}
                    addFlower={addFlower}
                    increaseFlower={increaseFlower}
                    decreaseFlower={decreaseFlower}
                  />
                ))}
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="bouquet-step-section">
              <h2>Select Wrapping</h2>

              <div className="bouquet-option-grid">
                {wrappingOptions.map((wrap) => (
                  <button
                    key={wrap.id}
                    className={
                      selectedWrap?.id === wrap.id
                        ? "bouquet-option-card selected-option-card"
                        : "bouquet-option-card"
                    }
                    onClick={() => setSelectedWrap(wrap)}
                  >
                    <h3>{wrap.name}</h3>
                    <p>AED {wrap.price.toFixed(2)}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="bouquet-step-section">
              <h2>Select Size</h2>

              <div className="bouquet-option-grid">
                {sizeOptions.map((size) => (
                  <button
                    key={size.id}
                    className={
                      selectedSize?.id === size.id
                        ? "bouquet-option-card selected-option-card"
                        : "bouquet-option-card"
                    }
                    onClick={() => setSelectedSize(size)}
                  >
                    <h3>{size.name}</h3>
                    <p>{size.price === 0 ? "No extra charge" : `+ AED ${size.price}`}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div className="bouquet-step-section">
              <h2>Review Your Bouquet</h2>

              <div className="bouquet-review-box">
                <div className="bouquet-review-block">
                  <h3>Selected Flowers</h3>
                  {selectedFlowers.length > 0 ? (
                    selectedFlowers.map((item) => (
                      <p key={`${item.flowerId}-${item.color}`}>
                        {item.name} ({item.color}) x{item.quantity} — AED{" "}
                        {(item.price * item.quantity).toFixed(2)}
                      </p>
                    ))
                  ) : (
                    <p>No flowers selected yet.</p>
                  )}
                </div>

                <div className="bouquet-review-block">
                  <h3>Wrapping</h3>
                  <p>
                    {selectedWrap
                      ? `${selectedWrap.name} — AED ${selectedWrap.price.toFixed(2)}`
                      : "No wrapping selected"}
                  </p>
                </div>

                <div className="bouquet-review-block">
                  <h3>Size</h3>
                  <p>
                    {selectedSize
                      ? `${selectedSize.name} — AED ${selectedSize.price.toFixed(2)}`
                      : "No size selected"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5 */}
          {step === 5 && (
            <div className="bouquet-step-section">
              <h2>Add a Message</h2>
              <p>This step is optional. You can write a gift note or skip it.</p>

              <textarea
                className="bouquet-message-box"
                placeholder="Write your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              <div className="bouquet-message-actions">
                <button className="skip-message-btn" onClick={handleAddBouquetToCart}>
                  Skip
                </button>

                <button className="save-message-btn" onClick={handleAddBouquetToCart}>
                  Save & Add to Cart
                </button>
              </div>
            </div>
          )}

          {/* Live price summary */}
          <div className="bouquet-live-summary">
            <div className="bouquet-summary-row">
              <span>Flowers:</span>
              <span>AED {flowersTotal.toFixed(2)}</span>
            </div>

            <div className="bouquet-summary-row">
              <span>Wrapping:</span>
              <span>AED {wrapTotal.toFixed(2)}</span>
            </div>

            <div className="bouquet-summary-row">
              <span>Size:</span>
              <span>AED {sizeTotal.toFixed(2)}</span>
            </div>

            <div className="bouquet-summary-row bouquet-total-row">
              <span>Total:</span>
              <span>AED {bouquetTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="bouquet-navigation">
            {step > 1 && step <= 5 && (
              <button
                className="bouquet-nav-btn secondary-btn"
                onClick={() => setStep(step - 1)}
              >
                Previous
              </button>
            )}

            {step < 5 && (
              <button
                className="bouquet-nav-btn primary-btn"
                onClick={() => setStep(step + 1)}
              >
                Next
              </button>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// Flower card component
function FlowerCard({
  flower,
  selectedFlowers,
  addFlower,
  increaseFlower,
  decreaseFlower,
}) {
  // Default selected color for this card
  const [selectedColor, setSelectedColor] = useState(flower.colors[0]);

  // Find all selected entries for this flower
  const selectedFlowerItems = selectedFlowers.filter(
    (item) => item.flowerId === flower.id
  );

  // Total selected quantity for this flower
  const totalFlowerQuantity = selectedFlowerItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // Current selected item for the chosen color
  const currentColorItem = selectedFlowerItems.find(
    (item) => item.color === selectedColor
  );

  return (
  <div className="flower-card">
    {flower.image ? (
      <img
        src={flower.image}
        alt={flower.name}
        className="flower-card-real-image"
      />
    ) : (
      <div className="flower-card-image"></div>
    )}

    <h3>{flower.name}</h3>
    <p className="flower-price">AED {flower.price.toFixed(2)} each</p>

    <select
      className="flower-color-select"
      value={selectedColor}
      onChange={(e) => setSelectedColor(e.target.value)}
    >
      {flower.colors.map((color) => (
        <option key={color} value={color}>
          {color}
        </option>
      ))}
    </select>

    <div className="flower-controls">
      {currentColorItem ? (
        <>
          <button
            className="flower-qty-btn"
            onClick={() => decreaseFlower(flower.id, selectedColor)}
          >
            -
          </button>

          <span className="flower-qty-value">{currentColorItem.quantity}</span>

          <button
            className="flower-qty-btn"
            onClick={() => increaseFlower(flower.id, selectedColor)}
          >
            +
          </button>
        </>
      ) : (
        <button
          className="flower-add-btn"
          onClick={() => addFlower(flower, selectedColor)}
        >
          Add Flower
        </button>
      )}
    </div>

    {totalFlowerQuantity > 0 && (
      <p className="flower-selected-count">Selected: {totalFlowerQuantity}</p>
    )}
  </div>
);
}

export default CustomizeBouquet;