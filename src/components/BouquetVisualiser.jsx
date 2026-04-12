import { useEffect, useRef } from "react";
import "./BouquetVisualiser.css";

function BouquetVisualiser({ flowers = [], wrapping = "white" }) {
  const canvasRef = useRef(null);

  const colorMap = {
    red: "#dc2626",
    pink: "#ec4899",
    white: "#ffffff",
    yellow: "#fbbf24",
    purple: "#a855f7",
    orange: "#f97316",
    green: "#22c55e",
    blue: "#3b82f6",
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.fillStyle = colorMap[wrapping] || "#ffffff";
    ctx.fillRect(0, 0, width, height);

    // Draw bouquet - radial fan from bottom center
    const centerX = width / 2;
    const baseY = height - 40;

    flowers.forEach((flower, index) => {
      const totalFlowers = flowers.reduce((sum, f) => sum + f.count, 0);
      const angle = (index / Math.max(flowers.length, 1)) * Math.PI - Math.PI / 2;

      for (let i = 0; i < flower.count; i++) {
        const radius = 80 + i * 15;
        const x = centerX + Math.cos(angle) * radius;
        const y = baseY + Math.sin(angle) * radius;

        // Draw flower circle
        ctx.fillStyle = flower.color || colorMap[flower.name.toLowerCase()] || "#ec4899";
        ctx.beginPath();
        ctx.arc(x, y, 12, 0, Math.PI * 2);
        ctx.fill();

        // Draw flower outline
        ctx.strokeStyle = "rgba(0, 0, 0, 0.1)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    });

    // Draw stem
    ctx.strokeStyle = "#22c55e";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(centerX, baseY);
    ctx.lineTo(centerX, height - 10);
    ctx.stroke();
  }, [flowers, wrapping]);

  return (
    <div className="bouquet-visualiser">
      <canvas
        ref={canvasRef}
        className="bouquet-canvas"
        width={300}
        height={400}
      />
    </div>
  );
}

export default BouquetVisualiser;
