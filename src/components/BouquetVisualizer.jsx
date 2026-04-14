import { flowerOptions } from "../data/flowers";

export function BouquetVisualizer({
  selectedFlowers,
  selectedWrap,
  selectedSize,
  compact = false,
  showTitle = true,
}) {
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
      {!compact && showTitle && <h3 className="bouquet-visualizer-title">Your Bouquet</h3>}

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
                  }}
                  title={`${flower.name} (${flower.color})`}
                />
              );
            })}

            {/* Stem bundle and wrapping area */}
            <div
              className="bouquet-stem"
              style={{
                background: selectedWrap
                  ? `linear-gradient(180deg, transparent 0%, #8a9d7a 30%, #6b7d5a 70%, #5a6d4a 100%)`
                  : `linear-gradient(180deg, transparent 0%, #8a9d7a 30%, #6b7d5a 70%, #888 100%)`,
                zIndex: 3,
              }}
            >
              {selectedWrap && !compact && <span style={{ fontSize: "11px" }}>{selectedWrap.name}</span>}
            </div>
          </>
        )}
      </div>

      {!compact && showTitle && (
        <div className="bouquet-visualizer-count">
          {totalFlowers > 0 && (
            <p>
              {totalFlowers} flower{totalFlowers !== 1 ? "s" : ""} selected
              {selectedSize && ` • ${selectedSize.name}`}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
