import { flowerOptions } from "../data/flowers";

export function BouquetVisualizer({
  selectedFlowers,
  selectedWrap,
  selectedSize,
  compact = false,
  showTitle = true,
}) {
  // Get wrapping color gradient based on type
  const getWrappingGradient = (wrapName) => {
    const gradients = {
      "Kraft Wrap": "linear-gradient(180deg, transparent 0%, #c9a875 30%, #b89968 70%, #a88555 100%)",
      "Classic White Wrap": "linear-gradient(180deg, transparent 0%, #f5f5f5 30%, #e8e8e8 70%, #d9d9d9 100%)",
      "Luxury Satin Wrap": "linear-gradient(180deg, transparent 0%, #d4939f 30%, #c17a82 70%, #ae6773 100%)",
      "Transparent Elegant Wrap": "linear-gradient(180deg, transparent 0%, rgba(212, 147, 159, 0.6) 30%, rgba(193, 122, 130, 0.8) 70%, rgba(174, 103, 115, 0.9) 100%)",
    };
    return gradients[wrapName] || gradients["Kraft Wrap"];
  };

  // Get wrapping ribbon pattern color
  const getWrappingRibbonColor = (wrapName) => {
    const colors = {
      "Kraft Wrap": "#8b7355",
      "Classic White Wrap": "#ddd",
      "Luxury Satin Wrap": "#c97c7c",
      "Transparent Elegant Wrap": "#c97c7c",
    };
    return colors[wrapName] || colors["Kraft Wrap"];
  };

  // Get size scale multiplier
  const getSizeMultiplier = () => {
    if (!selectedSize) return 1;
    switch (selectedSize.name) {
      case "Small":
        return 0.8;
      case "Large":
        return 1.2;
      default:
        return 1;
    }
  };

  // Count flowers by type
  const getFlowerCounts = () => {
    const counts = {};
    selectedFlowers.forEach((flower) => {
      const key = `${flower.name} (${flower.color})`;
      counts[key] = (counts[key] || 0) + flower.quantity;
    });
    return counts;
  };

  // Predefined position slots for flowers (x%, y%)
  const positionSlots = [
    { x: 50, y: 5 },    // Row 1: center top
    { x: 30, y: 14 },   // Row 2: left
    { x: 70, y: 14 },   // Row 2: right
    { x: 15, y: 26 },   // Row 3: far left
    { x: 50, y: 22 },   // Row 3: center
    { x: 85, y: 26 },   // Row 3: far right
    { x: 30, y: 36 },   // Row 4: left
    { x: 70, y: 36 },   // Row 4: right
    { x: 10, y: 46 },   // Row 5: far left
    { x: 50, y: 42 },   // Row 5: center
    { x: 90, y: 46 },   // Row 5: far right
    { x: 25, y: 54 },   // Row 6: left
    { x: 75, y: 54 },   // Row 6: right
    { x: 10, y: 62 },   // Row 7: far left
    { x: 50, y: 58 },   // Row 7: center
    { x: 90, y: 62 },   // Row 7: far right
    { x: 30, y: 68 },   // Row 8: left
    { x: 70, y: 68 },   // Row 8: right
    { x: 50, y: 74 },   // Row 9: center
  ];

  // Rotation values per slot for natural variety
  const rotations = [0, -8, 8, -5, 0, 5, -10, 10, -3, 0, 3, -7, 7, -6, 0, 6, -9, 9, 0];

  // Expand selectedFlowers by quantity into flat array
  const flowerSlots = [];
  selectedFlowers.forEach((item) => {
    for (let i = 0; i < item.quantity; i++) {
      flowerSlots.push(item);
    }
  });

  // Get flower image from flowerOptions
  const getFlowerImage = (flowerId) => {
    const flower = flowerOptions.find((f) => f.id === flowerId);
    return flower?.image || null;
  };

  const totalFlowers = flowerSlots.length;

  const panelClass = compact ? "bouquet-visualizer-panel-compact" : "bouquet-visualizer-panel";
  const areaClass = compact ? "bouquet-visualizer-area-compact" : "bouquet-visualizer-area";

  return (
    <div className={panelClass}>
      {!compact && showTitle && (
        <>
          <h3 className="bouquet-visualizer-title">✨ Your Bouquet Preview</h3>
          <div className="bouquet-visualizer-details">
            {selectedSize && (
              <div className="detail-item">
                <span className="detail-label">Size:</span>
                <span className="detail-value">{selectedSize.name}</span>
              </div>
            )}
            {selectedWrap && (
              <div className="detail-item">
                <span className="detail-label">Wrapping:</span>
                <span className="detail-value">{selectedWrap.name}</span>
              </div>
            )}
            {totalFlowers > 0 && (
              <div className="detail-item">
                <span className="detail-label">Flowers:</span>
                <span className="detail-value">{totalFlowers} stem{totalFlowers !== 1 ? 's' : ''}</span>
              </div>
            )}
          </div>
        </>
      )}

      <div className={areaClass}>
        {totalFlowers === 0 ? (
          <div className="bouquet-empty-state">
            <div style={{ fontSize: compact ? "24px" : "32px" }}>🌸</div>
            {!compact && <p>Select flowers to see your bouquet come to life</p>}
          </div>
        ) : (
          <>
            {/* SVG for stems */}
            <svg
              className="bouquet-stems-svg"
              width="100%"
              height="100%"
              style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
              preserveAspectRatio="none"
            >
              {flowerSlots.slice(0, positionSlots.length).map((flower, index) => {
                const position = positionSlots[index];
                const startX = position.x;
                const startY = position.y;
                const endX = 50; // converge to center bottom
                const endY = 85; // stem ends near bottom

                return (
                  <line
                    key={`stem-${index}`}
                    x1={`${startX}%`}
                    y1={`${startY}%`}
                    x2={`${endX}%`}
                    y2={`${endY}%`}
                    stroke="#5a7a4a"
                    strokeWidth={compact ? "1" : "1.5"}
                    opacity="0.7"
                  />
                );
              })}
            </svg>

            {/* Render flower images */}
            {flowerSlots.slice(0, positionSlots.length).map((flower, index) => {
              const position = positionSlots[index];
              const rotation = rotations[index];
              const image = getFlowerImage(flower.flowerId);
              const sizeMultiplier = getSizeMultiplier();
              const flowerSize = compact ? 55 * sizeMultiplier : 70 * sizeMultiplier;

              return (
                <img
                  key={`${index}-${flower.flowerId}-${flower.color}`}
                  src={image}
                  alt={flower.name}
                  className={compact ? "bouquet-flower-slot-compact" : "bouquet-flower-slot"}
                  style={{
                    left: `${position.x}%`,
                    top: `${position.y}%`,
                    transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                    position: "absolute",
                    zIndex: 2,
                    width: `${flowerSize}px`,
                    height: `${flowerSize}px`,
                  }}
                  title={`${flower.name} (${flower.color})`}
                />
              );
            })}

            {/* Stem bundle and wrapping area */}
            <div
              className="bouquet-stem"
              style={{
                background: selectedWrap ? getWrappingGradient(selectedWrap.name) : `linear-gradient(180deg, transparent 0%, #8a9d7a 30%, #6b7d5a 70%, #888 100%)`,
                zIndex: 3,
                boxShadow: selectedWrap ? '0 -4px 12px rgba(0, 0, 0, 0.15), inset 0 2px 4px rgba(0, 0, 0, 0.1)' : 'none',
              }}
            >
              {/* Wrapping Ribbon */}
              {selectedWrap && (
                <div
                  className="wrapping-ribbon"
                  style={{
                    backgroundColor: getWrappingRibbonColor(selectedWrap.name),
                  }}
                />
              )}
              {selectedWrap && !compact && (
                <span className="wrapping-label">{selectedWrap.name}</span>
              )}
            </div>
          </>
        )}
      </div>

      {!compact && showTitle && (
        <div className="bouquet-visualizer-summary">
          {totalFlowers > 0 && (
            <>
              <div className="summary-header">
                <h4>Bouquet Summary</h4>
              </div>

              {/* Flowers List */}
              <div className="summary-section">
                <div className="section-title">🌸 Flowers</div>
                <div className="flower-list">
                  {Object.entries(getFlowerCounts()).map(([name, count]) => (
                    <div key={name} className="flower-item">
                      <span className="flower-name">{name}</span>
                      <span className="flower-qty">×{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Size & Wrapping */}
              <div className="summary-section">
                <div className="size-wrap-row">
                  {selectedSize && (
                    <div className="size-info">
                      <span className="label">Size</span>
                      <span className="value">{selectedSize.name}</span>
                    </div>
                  )}
                  {selectedWrap && (
                    <div className="wrap-info">
                      <span className="label">Wrap</span>
                      <span className="value">{selectedWrap.name}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Total */}
              <div className="summary-total">
                <span className="total-text">{totalFlowers} stem{totalFlowers !== 1 ? "s" : ""} total</span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
