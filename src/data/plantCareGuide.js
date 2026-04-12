const careProfiles = {
  herb: {
    watering: "Water when the top inch of soil feels dry — usually every 2–3 days. Prefers consistently moist (not soggy) soil.",
    light: "Bright, direct sunlight for at least 6 hours a day. A sunny windowsill is ideal.",
    temperature: "Thrives in 18–27°C. Protect from cold drafts below 10°C.",
    fertilizer: "Feed with a diluted balanced fertilizer every 2–3 weeks during the growing season.",
  },
  fruitPlant: {
    watering: "Water deeply 2–3 times a week, keeping soil consistently moist during fruiting. Avoid wetting foliage.",
    light: "Full sun — at least 6–8 hours of direct sunlight daily for best fruit production.",
    temperature: "Best in 20–30°C. Avoid temperatures below 13°C which can slow growth.",
    fertilizer: "Use a high-potassium fertilizer every 2 weeks once flowers appear to boost fruiting.",
  },
  leafyGreen: {
    watering: "Keep soil evenly moist. Water every 1–2 days in warm weather; less in cooler months.",
    light: "4–6 hours of morning sunlight; afternoon shade is beneficial in hot climates.",
    temperature: "Prefers cooler conditions, 15–22°C. Heat can cause bolting and bitter leaves.",
    fertilizer: "Apply a nitrogen-rich liquid fertilizer every 2 weeks for lush leaf growth.",
  },
  rootVegetable: {
    watering: "Water deeply once a week to encourage strong root development. Avoid waterlogging.",
    light: "Full sun — 6+ hours daily in loose, well-drained soil.",
    temperature: "Cool to moderate temperatures, 13–24°C, produce the sweetest roots.",
    fertilizer: "Use a low-nitrogen, phosphorus-rich fertilizer at planting; avoid over-fertilizing.",
  },
  vegetable: {
    watering: "Water 2–3 times a week, deeply. Keep soil moist but not soggy during fruiting.",
    light: "Full sun — 6–8 hours of direct sunlight daily.",
    temperature: "Thrives in 20–30°C warm weather; protect from frost.",
    fertilizer: "Balanced 10-10-10 fertilizer every 2 weeks during growing season.",
  },
  vinePlant: {
    watering: "Water 2–3 times weekly, more in hot weather. Keep soil consistently moist.",
    light: "Full sun, 6+ hours daily. Provide a trellis or support for climbing.",
    temperature: "Warm conditions, 20–30°C. Sensitive to cold.",
    fertilizer: "Balanced liquid fertilizer every 2 weeks once flowering begins.",
  },
  fruitShrub: {
    watering: "Keep soil consistently moist, especially during fruiting. Mulch helps retain moisture.",
    light: "Full sun to partial shade — 4–6 hours daily.",
    temperature: "Hardy; tolerates 10–28°C. Acidic soil is essential for healthy growth.",
    fertilizer: "Use an acid-loving plant fertilizer in spring and again mid-season.",
  },
  indoorLowMaintenance: {
    watering: "Water only when soil is dry to the touch — typically every 7–10 days. Overwatering is the main killer.",
    light: "Bright, indirect light. Tolerates low light but grows slower.",
    temperature: "Comfortable in 18–26°C, typical indoor conditions.",
    fertilizer: "A diluted houseplant fertilizer once a month during spring and summer is enough.",
  },
  succulent: {
    watering: "Water sparingly — let soil dry completely between waterings. Every 10–14 days indoors.",
    light: "Bright light, including some direct sun. South or west-facing windows are ideal.",
    temperature: "Prefers warm, dry conditions, 18–30°C. Dislikes humidity.",
    fertilizer: "Use a cactus/succulent fertilizer once in spring and once in summer — that's all.",
  },
  outdoorFlowering: {
    watering: "Water deeply 2–3 times a week. Mulch around the base to retain moisture.",
    light: "Full sun to partial shade, depending on variety. Most prefer 4–6 hours of sun.",
    temperature: "Varies by species; most thrive in 15–28°C outdoors.",
    fertilizer: "Feed with a bloom-boosting (high phosphorus) fertilizer every 3–4 weeks in growing season.",
  },
  outdoorEvergreen: {
    watering: "Water deeply once a week for the first year; established plants need minimal watering.",
    light: "Full sun to partial shade. Tolerates most light conditions.",
    temperature: "Hardy; tolerates a wide range of outdoor temperatures.",
    fertilizer: "Slow-release fertilizer once in spring is sufficient.",
  },
  outdoorShadeTolerant: {
    watering: "Water weekly, keeping soil evenly moist. Mulch helps in hot weather.",
    light: "Partial to full shade — avoid direct afternoon sun.",
    temperature: "Prefers cooler, shaded conditions 15–24°C.",
    fertilizer: "Balanced fertilizer once in early spring and again in midsummer.",
  },
  outdoorFragrant: {
    watering: "Allow soil to dry between waterings. Drought-tolerant once established.",
    light: "Full sun — 6+ hours daily for the best fragrance and blooms.",
    temperature: "Warm, dry conditions, 18–30°C. Dislikes humidity.",
    fertilizer: "Minimal feeding — over-fertilizing reduces fragrance. One spring feeding is enough.",
  },
  outdoorLowMaintenance: {
    watering: "Water deeply but infrequently — every 1–2 weeks once established. Very drought tolerant.",
    light: "Full sun. Loves heat and dry conditions.",
    temperature: "Thrives in warm, arid climates up to 40°C.",
    fertilizer: "Very little feeding needed; once a year in spring is plenty.",
  },
  plantDefault: {
    watering: "Water when the top inch of soil feels dry. Adjust frequency based on season and humidity.",
    light: "Bright, indirect light for 4–6 hours daily. Avoid harsh midday sun.",
    temperature: "Comfortable in 18–26°C. Protect from cold drafts and sudden changes.",
    fertilizer: "Balanced liquid fertilizer every 4–6 weeks during the growing season.",
  },
  bouquet: {
    watering: "Change vase water every 2 days. Re-cut stems at an angle under running water.",
    light: "Keep away from direct sunlight, heat sources, and ripening fruit.",
    temperature: "Cool room temperature (18–22°C) makes blooms last longer.",
    fertilizer: "Add flower food (or a pinch of sugar + a drop of bleach) with each water change.",
  },
};

function hasTag(tags, ...matches) {
  if (!tags) return false;
  const lower = tags.map((t) => t.toLowerCase());
  return matches.some((m) => lower.includes(m.toLowerCase()));
}

export function getCareGuide(product) {
  if (!product) return null;
  const { mainCategory, tags = [], subCategories = [] } = product;
  const allTags = [...tags, ...subCategories];

  if (mainCategory === "Bouquets") return careProfiles.bouquet;

  if (mainCategory !== "Plants") return null;

  if (hasTag(allTags, "Herb")) return careProfiles.herb;
  if (hasTag(allTags, "Fruit Plant")) return careProfiles.fruitPlant;
  if (hasTag(allTags, "Fruit Shrub")) return careProfiles.fruitShrub;
  if (hasTag(allTags, "Leafy Green")) return careProfiles.leafyGreen;
  if (hasTag(allTags, "Root Vegetable")) return careProfiles.rootVegetable;
  if (hasTag(allTags, "Vine Plant")) return careProfiles.vinePlant;
  if (hasTag(allTags, "Vegetable")) return careProfiles.vegetable;
  if (hasTag(allTags, "Succulent", "Cactus")) return careProfiles.succulent;
  if (hasTag(allTags, "Fragrant")) return careProfiles.outdoorFragrant;
  if (hasTag(allTags, "Shade Tolerant")) return careProfiles.outdoorShadeTolerant;
  if (hasTag(allTags, "Evergreen")) return careProfiles.outdoorEvergreen;

  const isOutdoor = hasTag(allTags, "Outdoor");
  const isIndoor = hasTag(allTags, "Indoor");
  const isLowMaint = hasTag(allTags, "Low Maintenance");

  if (isOutdoor && hasTag(allTags, "Flowering")) return careProfiles.outdoorFlowering;
  if (isOutdoor && isLowMaint) return careProfiles.outdoorLowMaintenance;
  if (isIndoor && isLowMaint) return careProfiles.indoorLowMaintenance;
  if (isIndoor) return careProfiles.indoorLowMaintenance;

  return careProfiles.plantDefault;
}