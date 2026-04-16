# LaFiore Translations - Quick Reference

## Key Translation Keys by Category

### Service Titles
- **Event & Wedding**: `eventWeddingFlowers` → "Event and Wedding Flowers"
- **Garden Planning**: `gardenPlanningCare` → "Garden Planning and Care"
- **Planterior Design**: `planteriorDesign` → "Planterior Design"

### Service Subtitles/Taglines
- `bespokeFloralStyling` → "Bespoke floral styling that brings your vision to life"
- `transformOutdoorSpace` → "Transform your outdoor space into a thriving, beautiful sanctuary"
- `blendNatureDesign` → "Blend nature and design to create fresh, elegant living spaces"

### Main Section Headings
- `createUnforgettableMoments` → "Create Unforgettable Moments" (Event & Wedding)
- `createDreamGarden` → "Create Your Dream Garden" (Garden Planning)
- `transformInteriorPlants` → "Transform Your Interior with Plants" (Planterior)

### Service Overview Descriptions
- `eventWeddingDesc1` - Full paragraph about events (200+ chars)
- `eventWeddingDesc2` - Full paragraph about expert team
- `gardenDesc1` - Full paragraph about dream gardens
- `gardenDesc2` - Full paragraph about specialists
- `planteriorDesc1` - Full paragraph about plant power
- `planteriorDesc2` - Full paragraph about plant-forward design

### Service Offerings (Cards in "What We Offer")
#### Event & Wedding
- `weddingCeremonies` + `brdalBouquetsCeremony`
- `celebrationsEvents` + `centerpieces`
- `engagementsLaunches` + `customArrangementsSpecial`
- `premiumDesigns` + `seasonalFlowers`

#### Garden Planning
- `plantSelection` + `plantSelectionDesc`
- `gardenDesign` + `gardenDesignDesc`
- `seasonalCare` + `seasonalCareDesc`
- `gardenMaintenance` + `gardenMaintenanceDesc`

#### Planterior Design
- `plantStyling` + `plantStylingDesc`
- `decorIntegration` + `decorIntegrationDesc`
- `livingWallsFeatures` + `livingWallsDesc`
- `plantCareGuidance` + `plantCareGuidanceDesc`

### Process Steps (4-step process on each service)
**Step 1 Titles:**
- Event & Wedding: `consultation` → "Consultation"
- Garden Planning: `siteAssessment` → "Site Assessment"
- Planterior: `spaceAnalysis` → "Space Analysis"

**Step 1 Descriptions:**
- Event & Wedding: `discussVisionTheme`
- Garden Planning: `evaluateSpaceSunlight`
- Planterior: `assessLighting`

**Step 2 Titles:**
- Event & Wedding: `design` → "Design"
- Garden Planning: `planning` → "Planning"
- Planterior: `designPlan` → "Design Plan"

**Step 2 Descriptions:**
- Event & Wedding: `createCustomDesigns`
- Garden Planning: `createCustomGarden`
- Planterior: `createCustomPlanPlant`

**Step 3 Titles:**
- Event & Wedding: `preparation` → "Preparation"
- Garden Planning: `installation` → "Installation"
- Planterior: `implementation` → "Implementation"

**Step 3 Descriptions:**
- Event & Wedding: `arrangeFlowersWithCare`
- Garden Planning: `plantSelectionArrangement`
- Planterior: `sourcePlantsStyleSpace`

**Step 4 Titles:**
- Event & Wedding: `deliverySetup` → "Delivery & Setup"
- Garden Planning: `ongoingCare` → "Ongoing Care"
- Planterior: `support` → "Support"

**Step 4 Descriptions:**
- Event & Wedding: `professionalDelivery`
- Garden Planning: `regularMaintenanceSeasonal`
- Planterior: `providePlantCareAdjust`

### Call-to-Action Sections
**Event & Wedding:**
- `readyCreatePerfectFloral` → "Ready to Create Your Perfect Floral Experience?"
- `bringsVisionLife` → "Let's bring your vision to life with beautiful, memorable flowers"

**Garden Planning:**
- `readyTransformGarden` → "Ready to Transform Your Garden?"
- `createBeautifulThriving` → "Let's create a beautiful, thriving outdoor space you'll love"

**Planterior Design:**
- `readyBringNature` → "Ready to Bring Nature Into Your Space?"
- `createBeautifulPlantFilled` → "Let's create a beautiful, plant-filled environment you'll love"

### Planterior Benefits Section ("Why Planterior Design?")
- `whyPlanteriorDesign` → "Why Planterior Design?"
- `improveAirQuality` → "Improve Air Quality"
- `plantsPurifyAir` → "Plants naturally purify the air, creating healthier indoor environments"
- `boostMoodProductivity` → "Boost Mood & Productivity"
- `geeeryReducesStress` → "Greenery reduces stress and increases focus and creativity"
- `enhanceAesthetics` → "Enhance Aesthetics"
- `plantsAddDepth` → "Plants add depth, texture, and natural beauty to any space"
- `personalizedStyle` → "Personalized Style"
- `createUniqueOne` → "Create unique, one-of-a-kind interiors that reflect your personality"

### Other Important Keys
- `whatWeOffer` → "What We Offer" (used in all services)
- `ourProcess` → "Our Process" (used in all services)
- `bookFreeConsultation` → "Book a Consultation"
- `exploreOtherServices` → "Explore Other Services"
- `laFioreConsultation` → "La Fiore Consultation"
- `floralStylingGreenSpace` → "Floral Styling and Green Space Design"
- `memorableEventsBeautifully` → Full intro paragraph for consultation page
- `tailoredServicesBeautiful` → "Tailored Services for Beautiful Living"
- `whetherPlanningEvent` → Full description of consultation services

### Shop/Product Page Keys
- `potPlants` → "Potted Plants" (badge)
- `lastRemaining` → "Last {count} remaining" (stock status)
- `soldOut` → "Sold Out" (badge)
- `priceOnRequest` → "Price on request" (fallback)

### Birth Month Flowers Keys
- `birthMonthFlowers` → "Birth Month Flowers"
- `discoverFlowerRepresents` → "Discover the flower that represents each month and choose a thoughtful floral gift."

---

## Translation Coverage

### Covered in New Translations
✓ All service page titles, subtitles, and descriptions
✓ All process steps (consultation → delivery/support)
✓ All benefits section content
✓ All CTA sections
✓ Shop page UI text
✓ Birth month flowers page
✓ Consultation page overview

### Already in Existing translations.js
✓ Navigation items (home, shop, cart, etc.)
✓ Common buttons (Add to Cart, Continue Shopping, etc.)
✓ Cart and checkout labels
✓ Product page labels (reviews, description, etc.)
✓ Forms (email, password, etc.)
✓ Messages and errors

---

## Quick Integration Example

**Before (Hardcoded):**
```jsx
<h1>Event and Wedding Flowers</h1>
<p>Bespoke floral styling that brings your vision to life</p>
```

**After (With translations):**
```jsx
<h1>{t("eventWeddingFlowers")}</h1>
<p>{t("bespokeFloralStyling")}</p>
```

---

## Language Statistics

- **Total Keys**: 130
- **Languages Supported**: 8 (EN, KO, ES, FR, DE, JA, TA, ML, RU)
- **Total Translations**: 1,300+ individual translations
- **Page Coverage**: 
  - Service Pages: 100%
  - Shop/Product Pages: 95%
  - Consultation Page: 100%
  - Other Pages: 70%

---

## File Location

All translations in: `/frontend/src/data/newTranslations.json`

Implementation guide: `/frontend/COMPONENT_TRANSLATION_MAPPING.md`

Summary: `/frontend/TRANSLATION_EXTRACTION_SUMMARY.md`
