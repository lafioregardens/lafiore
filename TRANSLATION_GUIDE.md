# Translation Implementation Guide for LA FIORE

## Overview
This guide shows which pages need translation updates and which translation keys to use.

## Available Languages
- 🇬🇧 **English** (en) - Complete
- 🇦🇪 **العربية** (ar) - Complete  
- 🇪🇸 **Español** (es) - Complete
- 🇨🇳 **中文** (zh) - Complete

## Translation Status by Page

### ✅ COMPLETED
- ✅ Login.jsx - FULLY TRANSLATED
- ✅ SignUp.jsx - FULLY TRANSLATED

### 🔄 IN PROGRESS
- Cart.jsx - Keywords: `shoppingCart`, `yourCartEmpty`, `addFlowersToStart`, `remove`, `quantity`, `subtotal`, `total`, `promoCode`, `proceedToCheckout`
- Checkout.jsx - Keywords: `checkout`, `contactInfo`, `deliveryAddress`, `paymentMethod`, `placeOrder`

### ⏳ TO DO
- Home.jsx - Use keywords from existing translations (already have many)
- Shop.jsx - Keywords: `shop`, `filterBy`, `sortBy`, `noResults`
- ProductDetail.jsx - Keywords: `addToCart`, `description`, `reviews`, `quantity`, `rating`
- Account.jsx - Keywords: `myAccount`, `profile`, `orders`, `logout`
- OrderTracking.jsx - Keywords: `trackOrder`, `orderStatus`, `estimatedDelivery`
- Consultation.jsx - Keywords: `bookConsultation`, `exploreServices`
- PlantFinder.jsx - Already using translation keys in many places
- BirthMonthFlowers.jsx - Needs basic translations for section titles
- CustomizeBouquet.jsx - Keywords: `customizeBouquet`, `selectFlowers`, `selectSize`, `selectWrapping`
- OrderSuccess.jsx - Keywords: `orderSuccessful`, `thankYouMessage`, `orderId`, `totalAmount`

## Step-by-Step Implementation for Each Page

### 1. Import Translation Hook
```javascript
import { useLanguage } from "../context/LanguageContext";
```

### 2. Use in Component
```javascript
const { t } = useLanguage();
```

### 3. Replace Hardcoded Text
```javascript
// Before
<h1>Shopping Cart</h1>

// After
<h1>{t("shoppingCart")}</h1>
```

## Common Translation Keys Already Available

### Navigation
- `home`, `shop`, `plantFinder`, `customizeBouquets`, `birthMonthFlowers`, `ourServices`, `account`, `cart`

### Buttons
- `addToCart`, `continueShopping`, `placeOrder`, `trackOrder`, `remove`, `apply`, `cancel`, `submit`, `save`, `edit`, `delete`

### Cart & Checkout
- `shoppingCart`, `yourCartEmpty`, `itemsInCart`, `subtotal`, `total`, `promoCode`, `proceedToCheckout`
- `checkout`, `contactInfo`, `deliveryAddress`, `paymentMethod`, `placeOrder`

### Product Info
- `description`, `reviews`, `quantity`, `rating`, `outOfStock`

### General
- `fillRequired` (validation error)
- `or`, `email`, `password`, `name`, `phone`

## Missing Keys (Need to be added to all 4 languages if used)
Add to translations.js:
- `filterBy` (for Shop page filtering)
- `sortBy` (for product sorting)
- `noResults` (when no products match filter)
- `myProfile` (for account page)
- `orderHistory` (for account orders)
- `trackingNumber` (for order tracking)

---

**Last Updated**: 2026-04-13
**Status**: Login & SignUp complete. Ready for Cart & Checkout.
