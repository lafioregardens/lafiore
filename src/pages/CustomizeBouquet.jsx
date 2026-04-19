import { useState, useMemo, useContext } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";
import WishlistButton from "../components/WishlistButton";
import { flowerOptions } from "../data/flowers";
import { BouquetVisualizer } from "../components/BouquetVisualizer";

function CustomizeBouquet() {
  const { addToCart } = useContext(CartContext);
  const { addCustomBouquetToWishlist, loading: wishlistLoading } = useContext(WishlistContext);
  const { user } = useAuth();

  // Tracks which step the user is currently on
  const [step, setStep] = useState(1);

  // Stores the optional message written by the user
  const [message, setMessage] = useState("");

  // Stores the selected wrapping choice
  const [selectedWrap, setSelectedWrap] = useState(null);

  // Stores the selected bouquet size
  const [selectedSize, setSelectedSize] = useState(null);

  // Tracks the created bouquet for wishlist
  const [createdBouquet, setCreatedBouquet] = useState(null);
  const [wishlistMessage, setWishlistMessage] = useState("");


  // Wrapping options and their prices
  const wrappingOptions = [
    { id: 1, name: "Kraft Wrap", price: 15 },
    { id: 2, name: "Classic White Wrap", price: 18 },
    { id: 3, name: "Luxury Satin Wrap", price: 25 },
    { id: 4, name: "Transparent Elegant Wrap", price: 20 },
  ];

  // Bouquet size options with flower counts and prices
  const sizeOptions = [
    { id: 1, name: "Small", flowerCount: 6, price: 0 },
    { id: 2, name: "Medium", flowerCount: 11, price: 20 },
    { id: 3, name: "Large", flowerCount: 19, price: 40 },
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
  const [validationError, setValidationError] = useState("");

  // Adds a flower to bouquet using the currently chosen color
  const addFlower = (flower, color) => {
    if (!color) return;

    // Check if size is selected
    if (!selectedSize) {
      setValidationError("Please select a bouquet size first");
      return;
    }

    setSelectedFlowers((prev) => {
      const totalFlowers = prev.reduce((sum, item) => sum + item.quantity, 0);

      // Check if adding would exceed the limit
      if (totalFlowers >= selectedSize.flowerCount) {
        setValidationError(`Maximum ${selectedSize.flowerCount} flowers allowed for ${selectedSize.name} bouquet`);
        return prev;
      }

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
    if (!selectedSize) return;

    setSelectedFlowers((prev) => {
      const totalFlowers = prev.reduce((sum, item) => sum + item.quantity, 0);

      // Check if adding would exceed the limit
      if (totalFlowers >= selectedSize.flowerCount) {
        setValidationError(`Maximum ${selectedSize.flowerCount} flowers allowed for ${selectedSize.name} bouquet`);
        return prev;
      }

      return prev.map((item) =>
        item.flowerId === flowerId && item.color === color
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    });
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

  // Calculate total number of flowers selected
  const totalFlowersSelected = useMemo(() => {
    return selectedFlowers.reduce((sum, item) => sum + item.quantity, 0);
  }, [selectedFlowers]);

  // Handle next step with validation
  const handleNextStep = () => {
    if (step === 1 && !selectedSize) {
      setValidationError("Please select a bouquet size");
      return;
    }
    if (step === 2 && totalFlowersSelected < 4) {
      setValidationError(`Please select at least 4 flowers (currently ${totalFlowersSelected})`);
      return;
    }
    if (step === 2 && totalFlowersSelected > selectedSize.flowerCount) {
      setValidationError(`Too many flowers for ${selectedSize.name} bouquet (max ${selectedSize.flowerCount})`);
      return;
    }
    setValidationError("");
    setStep(step + 1);
  };

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

    const bouquetId = Date.now();
    const cartItem = {
      id: bouquetId,
      month: "Custom Bouquet",
      flower: "Customized Bouquet",
      description: "A bouquet created by the customer.",
      price: `AED ${bouquetTotal.toFixed(2)}`,
      details: bouquetDetails,
      customType: "bouquet",
      // Store visualization data for cart display
      selectedFlowers: selectedFlowers,
      selectedWrap: selectedWrap,
      selectedSize: selectedSize,
      image: null, // custom bouquets don't have a single image
    };

    addToCart(cartItem);

    // Create bouquet for wishlist
    setCreatedBouquet({
      id: bouquetId,
      name: "Customized Bouquet",
      price: bouquetTotal,
      image: null,
      details: bouquetDetails,
    });
  };

  // Add custom bouquet to wishlist
  const handleAddBouquetToWishlist = async () => {
    if (!user) {
      setWishlistMessage("Please log in to save to wishlist");
      setTimeout(() => setWishlistMessage(""), 2000);
      return;
    }

    if (!createdBouquet) {
      return;
    }

    const result = await addCustomBouquetToWishlist(createdBouquet);
    setWishlistMessage(result.message);
    setTimeout(() => setWishlistMessage(""), 2000);
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
            1. Size
          </div>
          <div className={step === 2 ? "progress-step active-step" : "progress-step"}>
            2. Flowers
          </div>
          <div className={step === 3 ? "progress-step active-step" : "progress-step"}>
            3. Wrapping
          </div>
          <div className={step === 4 ? "progress-step active-step" : "progress-step"}>
            4. Review
          </div>
          <div className={step === 5 ? "progress-step active-step" : "progress-step"}>
            5. Message
          </div>
        </section>

        <div className="bouquet-page-layout">
          {/* Left Column: Steps */}
          <section className="custom-bouquet-builder">
            {/* STEP 1: SIZE */}
            {step === 1 && (
              <div className="bouquet-step-section">
                <h2>Select Bouquet Size</h2>

                {validationError && (
                  <div style={{ backgroundColor: "#fee2e2", border: "1px solid #fca5a5", color: "#b91c1c", padding: "12px", borderRadius: "6px", marginBottom: "16px", fontSize: "14px" }}>
                    {validationError}
                  </div>
                )}

                <div className="bouquet-option-grid">
                  {sizeOptions.map((size) => (
                    <button
                      key={size.id}
                      className={
                        selectedSize?.id === size.id
                          ? "bouquet-option-card selected-option-card"
                          : "bouquet-option-card"
                      }
                      onClick={() => {
                        setSelectedSize(size);
                        setValidationError("");
                      }}
                    >
                      <h3>{size.name}</h3>
                      <p>{size.flowerCount} flowers</p>
                      <p>{size.price === 0 ? "No extra charge" : `+ AED ${size.price}`}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: FLOWERS */}
            {step === 2 && (
              <div className="bouquet-step-section">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <h2 style={{ margin: 0 }}>Select Flowers</h2>
                  <span style={{ fontSize: "14px", color: totalFlowersSelected >= 4 ? "#667a4f" : "#c97c7c", fontWeight: "600" }}>
                    {totalFlowersSelected}/{selectedSize.flowerCount} max
                  </span>
                </div>

                {validationError && (
                  <div style={{ backgroundColor: "#fee2e2", border: "1px solid #fca5a5", color: "#b91c1c", padding: "12px", borderRadius: "6px", marginBottom: "16px", fontSize: "14px" }}>
                    {validationError}
                  </div>
                )}

                <div className="bouquet-flower-grid">
                  {flowerOptions.map((flower) => (
                    <FlowerCard
                      key={flower.id}
                      flower={flower}
                      selectedFlowers={selectedFlowers}
                      addFlower={addFlower}
                      increaseFlower={increaseFlower}
                      decreaseFlower={decreaseFlower}
                      maxFlowers={selectedSize.flowerCount}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: WRAPPING */}
            {step === 3 && (
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

                {createdBouquet && (
                  <div className="bouquet-wishlist-section">
                    <p>Love this bouquet? Save it to your wishlist!</p>
                    <button
                      className="bouquet-wishlist-btn"
                      onClick={handleAddBouquetToWishlist}
                      disabled={wishlistLoading}
                      title="Add custom bouquet to wishlist"
                    >
                      ♡ Add to Wishlist
                    </button>
                    {wishlistMessage && (
                      <span className="bouquet-wishlist-message">{wishlistMessage}</span>
                    )}
                  </div>
                )}
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
                  onClick={handleNextStep}
                  disabled={(step === 1 && !selectedSize) || (step === 2 && totalFlowersSelected < 4)}
                  style={(step === 1 && !selectedSize) || (step === 2 && totalFlowersSelected < 4) ? { opacity: "0.6", cursor: "not-allowed" } : {}}
                >
                  Next
                </button>
              )}
            </div>
          </section>

          {/* Right Column: Bouquet Visualizer */}
          <BouquetVisualizer
            selectedFlowers={selectedFlowers}
            flowerOptions={flowerOptions}
            selectedWrap={selectedWrap}
            selectedSize={selectedSize}
          />
        </div>
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
  maxFlowers,
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
    <div className="flower-image-wrapper">
      {flower.image ? (
        <img
          src={flower.image}
          alt={flower.name}
          className="flower-card-real-image"
        />
      ) : (
        <div className="flower-card-image"></div>
      )}
      <div className="flower-wishlist-btn">
        <WishlistButton product={flower} />
      </div>
    </div>

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