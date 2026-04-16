# Integration Example: How to Add New Translations

This document shows how to integrate the new translation keys into your existing `translations.js` file.

## Current Structure

Your existing `translations.js` uses this structure:

```javascript
const translations = {
  en: {
    // Navbar
    home: "Home",
    shop: "Shop",
    // ... etc
  },
  ko: {
    home: "홈",
    shop: "가게",
    // ... etc
  },
  // ... other languages
};

export default translations;
```

## Integration Approach (2 Options)

### Option 1: Merge into Existing File (Recommended)

1. **Read `newTranslations.json`** from `/frontend/src/data/newTranslations.json`

2. **Transform the data structure** from:
```json
{
  "newTranslationKeys": {
    "eventWeddingFlowers": {
      "en": "Event and Wedding Flowers",
      "ko": "이벤트 및 결혼식 꽃",
      // ...
    }
  }
}
```

To add each key to the appropriate language in translations object:

3. **Add to translations.js:**

```javascript
const translations = {
  en: {
    // ... existing keys ...
    
    // Service Pages (NEW)
    eventWeddingFlowers: "Event and Wedding Flowers",
    bespokeFloralStyling: "Bespoke floral styling that brings your vision to life",
    createUnforgettableMoments: "Create Unforgettable Moments",
    eventWeddingDesc1: "Your special event deserves flowers...",
    // ... all 130 new keys for English ...
  },
  ko: {
    // ... existing keys ...
    
    // Service Pages (NEW)
    eventWeddingFlowers: "이벤트 및 결혼식 꽃",
    bespokeFloralStyling: "당신의 비전을 실현하는 맞춤형 꽃 스타일링",
    createUnforgettableMoments: "잊을 수 없는 순간 만들기",
    eventWeddingDesc1: "당신의 특별한 행사는...",
    // ... all 130 new keys for Korean ...
  },
  es: {
    // ... existing keys ...
    // ... all 130 new keys for Spanish ...
  },
  // ... repeat for fr, de, ja, ta, ml, ru ...
};
```

### Option 2: Keep Separate File

Keep `newTranslations.json` separate and import it:

```javascript
// In translations.js
import newTranslationsData from './newTranslations.json';

// Transform and merge
const newTranslations = {};
Object.keys(newTranslationsData.newTranslationKeys).forEach(key => {
  ['en', 'ko', 'es', 'fr', 'de', 'ja', 'ta', 'ml', 'ru'].forEach(lang => {
    if (!newTranslations[lang]) newTranslations[lang] = {};
    newTranslations[lang][key] = newTranslationsData.newTranslationKeys[key][lang];
  });
});

const translations = {
  en: { ...existingTranslations.en, ...newTranslations.en },
  ko: { ...existingTranslations.ko, ...newTranslations.ko },
  // ... etc
};
```

---

## Component Updates

### Before - ServiceEventWedding.jsx (Hardcoded)

```jsx
<section className="service-hero">
  <div className="service-hero-content">
    <h1>Event and Wedding Flowers</h1>
    <p>Bespoke floral styling that brings your vision to life</p>
  </div>
</section>

<section className="service-section">
  <div className="service-container">
    <div className="service-content">
      <h2>Create Unforgettable Moments</h2>
      <p>
        Your special event deserves flowers that reflect your personality and vision.
        From intimate garden ceremonies to grand celebrations, we design bespoke floral
        arrangements that elevate every moment and create lasting memories.
      </p>
      <p>
        Our expert team works closely with you to understand your theme, color palette,
        venue, and atmosphere. We source premium flowers and create stunning arrangements
        that complement your unique style.
      </p>
    </div>
  </div>
</section>

<section className="service-section service-section-alt">
  <div className="service-container">
    <h2>What We Offer</h2>
    <div className="service-offerings">
      <div className="offering-card">
        <div className="offering-icon">💒</div>
        <h3>Wedding Ceremonies</h3>
        <p>Bridal bouquets, ceremony arrangements, and altar installations</p>
      </div>
      {/* ... other offerings ... */}
    </div>
  </div>
</section>

<section className="service-section">
  <div className="service-container">
    <h2>Our Process</h2>
    <div className="process-steps">
      <div className="process-step">
        <div className="step-number">1</div>
        <h3>Consultation</h3>
        <p>Discuss your vision, theme, and preferences in a personalized meeting</p>
      </div>
      <div className="process-step">
        <div className="step-number">2</div>
        <h3>Design</h3>
        <p>Create custom designs and select premium flowers that match your vision</p>
      </div>
      {/* ... more steps ... */}
    </div>
  </div>
</section>

<section className="service-cta">
  <div className="service-container">
    <h2>Ready to Create Your Perfect Floral Experience?</h2>
    <p>Let's bring your vision to life with beautiful, memorable flowers</p>
    <div className="cta-buttons">
      <Link to="/consultation#consultation-form" className="cta-primary-btn">
        Book a Consultation
      </Link>
      <Link to="/consultation#consultation-services" className="cta-secondary-btn">
        Explore Other Services
      </Link>
    </div>
  </div>
</section>
```

### After - ServiceEventWedding.jsx (With translations)

```jsx
import { useLanguage } from "../context/LanguageContext";

function ServiceEventWedding() {
  const { t } = useLanguage();
  
  const offerings = [
    {
      icon: "💒",
      title: t("weddingCeremonies"),
      description: t("brdalBouquetsCeremony")
    },
    {
      icon: "🎉",
      title: t("celebrationsEvents"),
      description: t("centerpieces")
    },
    {
      icon: "💍",
      title: t("engagementsLaunches"),
      description: t("customArrangementsSpecial")
    },
    {
      icon: "🎁",
      title: t("premiumDesigns"),
      description: t("seasonalFlowers")
    }
  ];

  const processSteps = [
    {
      number: 1,
      title: t("consultation"),
      description: t("discussVisionTheme")
    },
    {
      number: 2,
      title: t("design"),
      description: t("createCustomDesigns")
    },
    {
      number: 3,
      title: t("preparation"),
      description: t("arrangeFlowersWithCare")
    },
    {
      number: 4,
      title: t("deliverySetup"),
      description: t("professionalDelivery")
    }
  ];

  return (
    <div>
      <Navbar />
      <main className="service-detail-page">
        {/* Hero Section */}
        <section className="service-hero">
          <div className="service-hero-image"></div>
          <div className="service-hero-content">
            <h1>{t("eventWeddingFlowers")}</h1>
            <p>{t("bespokeFloralStyling")}</p>
          </div>
        </section>

        {/* Overview Section */}
        <section className="service-section">
          <div className="service-container">
            <div className="service-content">
              <h2>{t("createUnforgettableMoments")}</h2>
              <p>{t("eventWeddingDesc1")}</p>
              <p>{t("eventWeddingDesc2")}</p>
            </div>
            <div className="service-image-placeholder"></div>
          </div>
        </section>

        {/* What We Offer */}
        <section className="service-section service-section-alt">
          <div className="service-container">
            <h2>{t("whatWeOffer")}</h2>
            <div className="service-offerings">
              {offerings.map((offering, index) => (
                <div key={index} className="offering-card">
                  <div className="offering-icon">{offering.icon}</div>
                  <h3>{offering.title}</h3>
                  <p>{offering.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="service-section">
          <div className="service-container">
            <h2>{t("ourProcess")}</h2>
            <div className="process-steps">
              {processSteps.map((step, index) => (
                <div key={index} className="process-step">
                  <div className="step-number">{step.number}</div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="service-cta">
          <div className="service-container">
            <h2>{t("readyCreatePerfectFloral")}</h2>
            <p>{t("bringsVisionLife")}</p>
            <div className="cta-buttons">
              <Link to="/consultation#consultation-form" className="cta-primary-btn">
                {t("bookFreeConsultation")}
              </Link>
              <Link to="/consultation#consultation-services" className="cta-secondary-btn">
                {t("exploreOtherServices")}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default ServiceEventWedding;
```

---

## Shop.jsx Example Updates

### Before (Hardcoded)
```jsx
{product.mainCategory === "Plants" && !(product.subCategories && product.subCategories.includes("Aquatic")) && (
  <span className="shop-card-badge shop-card-badge--potted">
    Potted Plants
  </span>
)}

{product.stock !== undefined && product.stock > 0 && product.stock < 3 && (
  <span className="shop-card-badge shop-card-badge--low">
    Last {product.stock} remaining
  </span>
)}

{product.stock !== undefined && product.stock === 0 && (
  <div className="shop-card-sold-out-tag">Sold Out</div>
)}

<div className="shop-card-price">
  {typeof product.price === 'number'
    ? `AED ${product.price.toFixed(2)}`
    : (product.price || "Price on request")}
</div>
```

### After (With translations)
```jsx
import { useLanguage } from "../context/LanguageContext";

function Shop() {
  const { t } = useLanguage();
  
  // ... rest of component ...
  
  {product.mainCategory === "Plants" && !(product.subCategories && product.subCategories.includes("Aquatic")) && (
    <span className="shop-card-badge shop-card-badge--potted">
      {t("potPlants")}
    </span>
  )}

  {product.stock !== undefined && product.stock > 0 && product.stock < 3 && (
    <span className="shop-card-badge shop-card-badge--low">
      {t("lastRemaining").replace("{count}", product.stock)}
    </span>
  )}

  {product.stock !== undefined && product.stock === 0 && (
    <div className="shop-card-sold-out-tag">{t("soldOut")}</div>
  )}

  <div className="shop-card-price">
    {typeof product.price === 'number'
      ? `AED ${product.price.toFixed(2)}`
      : (product.price || t("priceOnRequest"))}
  </div>
}
```

---

## Testing Integration

After integrating translations, test in all 8 languages:

1. **Navigate to each service page:**
   - `/service/event-wedding`
   - `/service/garden-planning`
   - `/service/planterior-design`

2. **Switch languages** in language selector and verify:
   - ✓ Titles display correctly
   - ✓ Descriptions are complete
   - ✓ Process steps show translated titles
   - ✓ CTA buttons show translated text
   - ✓ Layout doesn't break with longer text

3. **Test Shop page:**
   - ✓ Potted Plants badge translates
   - ✓ Stock status messages appear correctly
   - ✓ "Sold Out" badge shows translated
   - ✓ "Price on request" shows in correct language

4. **Verify all 8 languages:**
   - Korean (한국어)
   - Spanish (Español)
   - French (Français)
   - German (Deutsch)
   - Japanese (日本語)
   - Tamil (தமிழ்)
   - Malayalam (മലയാളം)
   - Russian (Русский)

---

## Best Practices

1. **Always use `t()` function** for user-facing text
2. **Keep keys descriptive** (e.g., `eventWeddingDesc1` vs `desc1`)
3. **Test in all languages** before deploying
4. **Check for text overflow** in longer translations
5. **Use context** to store language preference persistently
6. **Fallback gracefully** if translation key is missing

---

## Troubleshooting

**If translation doesn't appear:**
- Verify key exists in all language objects
- Check spelling matches exactly
- Ensure `t()` function is imported from LanguageContext
- Clear browser cache and reload

**If text overflows:**
- Adjust CSS for that element
- Consider shorter translation
- Use responsive padding/margin

**If special characters don't display:**
- Ensure file is saved as UTF-8
- Check browser console for errors
- Verify language font is loaded

---

## Summary

- **130 new translation keys** ready to be integrated
- **All 8 languages** fully translated
- **Service pages** have 100% coverage
- **Integration** takes 2-3 hours for all pages
- **Testing** essential in all languages

See `COMPONENT_TRANSLATION_MAPPING.md` for detailed page-by-page guide.
