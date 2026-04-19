import Navbar from "../components/Navbar";
import { useMemo, useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import WishlistButton from "../components/WishlistButton";
import api from "../utils/api";
import categories from "../data/categories";
import localProducts from "../data/products";

// Helper function to map category names to translation keys
const getCategoryTranslationKey = (categoryName) => {
  const mapping = {
    "All": "catAll",
    "Plants": "catPlants",
    "Flowers": "catFlowers",
    "Seeds": "catSeeds",
    "Oils": "catOils",
    "Tools": "catTools",
    "Soil & Fertilizers": "catSoilFertilizers",
    "Soaps": "catSoaps",
    "Hair Care": "catHairCare",
    "Candles": "catCandles",
    "Apothecary": "catApothecary",
    "Bouquets": "catBouquets",
    "Pots": "catPots",
    "Garden Sets": "catGardenSets",
    "Candle Sets": "catCandleSets",
  };
  return mapping[categoryName] || categoryName;
};

const getSubCategoryTranslationKey = (subcategoryName) => {
  const mapping = {
    "All": "subcatAll",
    "Edible": "subcatEdible",
    "Outdoor": "subcatOutdoor",
    "Indoor": "subcatIndoor",
    "Seasonal": "subcatSeasonal",
    "Aquatic": "subcatAquatic",
    "Medicinal": "subcatMedicinal",
    "Trees": "subcatTrees",
    "Normal": "subcatNormal",
    "Fruit Seeds": "subcatFruitSeeds",
    "Vegetable Seeds": "subcatVegetableSeeds",
    "Flower Seeds": "subcatFlowerSeeds",
    "Herb Seeds": "subcatHerbSeeds",
    "Tree Seeds": "subcatTreeSeeds",
    "Essential Oils": "subcatEssentialOils",
    "Carrier Oils": "subcatCarrierOils",
    "Herbal Oils": "subcatHerbalOils",
  };
  return mapping[subcategoryName] || subcategoryName;
};

function Shop() {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize products with stock data for immediate display
  const [products, setProducts] = useState(() => {
    return localProducts.map((p, idx) => ({
      ...p,
      stock: idx === 0 ? 0 : idx === 1 ? 2 : undefined  // Tomato is out of stock, Basil has 2 left
    }));
  });

  // Read category from URL, default to "All"
  const [selectedMainCategory, setSelectedMainCategory] = useState(searchParams.get("category") || "All");
  const [selectedSubCategory, setSelectedSubCategory] = useState(searchParams.get("subcategory") || "");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [productReviews, setProductReviews] = useState({});

  const productsPerPage = 12;

  // Fetch products from API to get stock information
  useEffect(() => {
    api
      .get("/products?limit=500", { timeout: 15000 }) // 15 second timeout for product list
      .then((res) => {
        const apiProducts = res.data?.data?.products;
        console.log("Products fetched from API:", apiProducts?.length, "products");
        if (apiProducts && apiProducts.length > 0) {
          // Use API products as primary source
          const mergedProducts = apiProducts.map((apiProduct) => {
            const localProduct = localProducts.find((p) => p.id === apiProduct.id);
            // Start with API data, then override with local for critical fields
            const merged = { ...apiProduct };
            if (localProduct) {
              // Always use local image (it's more reliable)
              if (localProduct.image) {
                merged.image = localProduct.image;
              }
              // Keep any other local data that API might not have
              if (!merged.description && localProduct.description) {
                merged.description = localProduct.description;
              }
              if (!merged.tags && localProduct.tags) {
                merged.tags = localProduct.tags;
              }
              if (!merged.colours && localProduct.colours) {
                merged.colours = localProduct.colours;
              }
            }
            return merged;
          });
          console.log("Merged products, displaying:", mergedProducts.length);
          setProducts(mergedProducts);
        } else {
          console.warn("No products from API, using local fallback");
          // Fallback to local products with test stock data
          const withStock = localProducts.map((p, idx) => ({
            ...p,
            stock: idx === 0 ? 0 : idx === 1 ? 2 : undefined
          }));
          setProducts(withStock);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch products from API:", err.message);
        // Fallback to local products with test stock data
        const withStock = localProducts.map((p, idx) => ({
          ...p,
          stock: idx === 0 ? 0 : idx === 1 ? 2 : undefined
        }));
        setProducts(withStock);
      });
  }, []);

  // Fetch reviews for paginated products to get accurate ratings
  useEffect(() => {
    if (paginatedProducts.length === 0) return;

    paginatedProducts.forEach((product) => {
      api
        .get(`/products/${product.id}/reviews`)
        .then((res) => {
          const reviews = res.data?.data || [];
          if (reviews.length > 0) {
            const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
            setProductReviews((prev) => ({
              ...prev,
              [product.id]: Math.round(avgRating * 10) / 10,
            }));
          }
        })
        .catch(() => {});
    });
  }, [paginatedProducts]);

  const getPriceNumber = (price) => {
    // Handle both string (from local data) and number (from API)
    if (typeof price === 'number') {
      return price;
    }
    return Number((price || "").replace("AED", "").replace(/,/g, "").trim()) || 0;
  };

  const allPrices = products
    .map((product) => getPriceNumber(product.price))
    .filter((price) => price > 0);

  const minAvailablePrice = allPrices.length > 0 ? Math.min(...allPrices) : 0;
  const maxAvailablePrice = allPrices.length > 0 ? Math.max(...allPrices) : 500;

  const [maxPrice, setMaxPrice] = useState(maxAvailablePrice);

  const activeCategoryObject =
    categories.find((item) => item.name === selectedMainCategory) || categories[0];

  const availableSubcategories = activeCategoryObject.subcategories || [];

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesMainCategory =
        selectedMainCategory === "All" ||
        product.mainCategory === selectedMainCategory;

      const matchesSubCategory =
        selectedSubCategory === "All" ||
        !selectedSubCategory ||
        (product.subCategories || []).includes(selectedSubCategory);

      const searchableText =
        `${product.name} ${product.description} ${product.mainCategory} ${(product.subCategories || []).join(" ")}`.toLowerCase();

      const matchesSearch = searchableText.includes(searchTerm.toLowerCase());

      const productPrice = getPriceNumber(product.price);
      const matchesPrice = productPrice === 0 || productPrice <= maxPrice;

      return (
        matchesMainCategory &&
        matchesSubCategory &&
        matchesSearch &&
        matchesPrice
      );
    });

    if (sortBy === "name-asc") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortBy === "name-desc") {
      result = [...result].sort((a, b) => b.name.localeCompare(a.name));
    }

    if (sortBy === "price-low-high") {
      result = [...result].sort((a, b) => {
        const aPrice = getPriceNumber(a.price) || Number.MAX_SAFE_INTEGER;
        const bPrice = getPriceNumber(b.price) || Number.MAX_SAFE_INTEGER;
        return aPrice - bPrice;
      });
    }

    if (sortBy === "price-high-low") {
      result = [...result].sort((a, b) => {
        const aPrice = getPriceNumber(a.price) || 0;
        const bPrice = getPriceNumber(b.price) || 0;
        return bPrice - aPrice;
      });
    }

    return result;
  }, [selectedMainCategory, selectedSubCategory, searchTerm, sortBy, maxPrice]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const pagesPerGroup = 5;
  const currentGroup = Math.ceil(currentPage / pagesPerGroup);
  const startPage = (currentGroup - 1) * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

  const visiblePages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  const handleMainCategoryChange = (categoryName) => {
    let newCategory, newSubcategory;

    if (selectedMainCategory === categoryName && categoryName !== "All") {
      newCategory = "All";
      newSubcategory = "";
    } else {
      newCategory = categoryName;

      const chosenCategory = categories.find((item) => item.name === categoryName);

      if (chosenCategory?.subcategories) {
        newSubcategory = "All";
      } else {
        newSubcategory = "";
      }
    }

    setSelectedMainCategory(newCategory);
    setSelectedSubCategory(newSubcategory);
    setCurrentPage(1);

    // Update URL with category
    const params = new URLSearchParams(searchParams);
    params.set("category", newCategory);
    if (newSubcategory) params.set("subcategory", newSubcategory);
    else params.delete("subcategory");
    setSearchParams(params);
  };

  const handleSubCategoryChange = (subcategory) => {
    setSelectedSubCategory(subcategory);
    setCurrentPage(1);

    // Update URL with subcategory
    const params = new URLSearchParams(searchParams);
    params.set("subcategory", subcategory);
    setSearchParams(params);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  const handlePriceChange = (e) => {
    setMaxPrice(Number(e.target.value));
    setCurrentPage(1);
  };

  const renderStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <div>
      <Navbar />

      <main className="shop-page">
        <section className="shop-banner">
          <div className="shop-banner-inner">
            <h1>{t("shopCollection")}</h1>
            <p>{t("beautifulPlantsFlowers")}</p>
          </div>
        </section>

        <section className="shop-layout">
          <aside className="shop-sidebar">
            <div className="shop-sidebar-box">
              <h3>{t("categories")}</h3>

              <div className="shop-sidebar-list">
                {categories.map((category) => (
                  <div key={category.name} className="sidebar-category-group">
                    <button
                      className={
                        selectedMainCategory === category.name
                          ? "sidebar-link active-sidebar-link"
                          : "sidebar-link"
                      }
                      onClick={() => handleMainCategoryChange(category.name)}
                    >
                      {t(getCategoryTranslationKey(category.name))}
                    </button>

                    {selectedMainCategory === category.name &&
                      category.subcategories &&
                      category.name !== "All" && (
                        <div className="sidebar-subcategory-list">
                          {category.subcategories.map((subcategory) => (
                            <button
                              key={subcategory}
                              className={
                                selectedSubCategory === subcategory
                                  ? "sidebar-sublink active-sidebar-sublink"
                                  : "sidebar-sublink"
                              }
                              onClick={() => handleSubCategoryChange(subcategory)}
                            >
                              {t(getSubCategoryTranslationKey(subcategory))}
                            </button>
                          ))}
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </div>

            <div className="shop-sidebar-box">
              <h3>{t("price")}</h3>

              <div className="shop-price-filter">
                <input
                  type="range"
                  min={minAvailablePrice}
                  max={maxAvailablePrice}
                  value={maxPrice}
                  onChange={handlePriceChange}
                  className="shop-price-slider"
                />

                <div className="shop-price-values">
                  <span>AED {minAvailablePrice.toLocaleString()}</span>
                  <span>AED {maxPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="shop-sidebar-box">
              <h3>{t("sort")}</h3>

              <select
                className="shop-sidebar-select"
                value={sortBy}
                onChange={handleSortChange}
              >
                <option value="default">{t("sortDefault")}</option>
                <option value="name-asc">{t("sortNameAsc")}</option>
                <option value="name-desc">{t("sortNameDesc")}</option>
                <option value="price-low-high">{t("sortPriceLow")}</option>
                <option value="price-high-low">{t("sortPriceHigh")}</option>
              </select>
            </div>
          </aside>

          <div className="shop-content">
            <div className="shop-topbar">
              <input
                type="text"
                className="shop-search-input"
                placeholder={t("searchProducts")}
                value={searchTerm}
                onChange={handleSearchChange}
              />

              <p className="shop-results-count">
                {filteredProducts.length} {t("productsFound")}
              </p>
            </div>

            {paginatedProducts.length > 0 ? (
              <>
                <div className="shop-grid">
                  {paginatedProducts.map((product) => (
                    <Link
                      to={`/product/${product.id}`}
                      key={product.id}
                      className="shop-card-link"
                    >
                      <article className="shop-card">
                        {/* Potted Plants Tag */}
                        {product.mainCategory === "Plants" &&
                         !(product.subCategories && product.subCategories.includes("Aquatic")) && (
                          <span className="shop-card-badge shop-card-badge--potted">
                            {t("potPlants")}
                          </span>
                        )}

                        {/* Stock Status Badge - Low Stock */}
                        {product.stock !== undefined && product.stock > 0 && product.stock < 3 && (
                          <span className="shop-card-badge shop-card-badge--low">
                            {t("lastRemaining").replace("{count}", product.stock)}
                          </span>
                        )}

                        <div className="shop-card-image-wrapper">
                          {/* Sold Out Tag on Image */}
                          {product.stock !== undefined && product.stock === 0 && (
                            <div className="shop-card-sold-out-tag">{t("soldOut")}</div>
                          )}

                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="shop-card-real-image"
                            />
                          ) : (
                            <div className="shop-card-image-placeholder">
                              <span className="shop-card-placeholder-icon">
                                {product.mainCategory === "Bouquets" ? "💐" : "🌿"}
                              </span>
                              <span className="shop-card-placeholder-label">
                                {product.name}
                              </span>
                            </div>
                          )}

                          <div className="shop-card-wishlist-btn">
                            <WishlistButton product={product} />
                          </div>
                        </div>

                        <div className="shop-card-content">
                          <div className="shop-card-rating-row">
                            <span className="shop-card-stars">
                              {renderStars(productReviews[product.id] !== undefined ? productReviews[product.id] : product.rating)}
                            </span>
                            <span className="shop-card-rating-number">
                              {(productReviews[product.id] !== undefined ? productReviews[product.id] : product.rating).toFixed(1)}
                            </span>
                          </div>

                          <h3>{product.name}</h3>

                          <div className="shop-card-price">
                            {typeof product.price === 'number'
                              ? `AED ${product.price.toFixed(2)}`
                              : (product.price || t("priceOnRequest"))}
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="shop-pagination">
                    <button
                      className="pagination-btn"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((prev) => prev - 1)}
                    >
                      {t("previous")}
                    </button>

                    <div className="pagination-numbers">
                      {visiblePages.map((page) => (
                        <button
                          key={page}
                          className={
                            currentPage === page
                              ? "pagination-number active-pagination-number"
                              : "pagination-number"
                          }
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </button>
                      ))}

                      {endPage < totalPages && (
                        <>
                          <span className="pagination-dots">...</span>

                          <button
                            className={
                              currentPage === totalPages
                                ? "pagination-number active-pagination-number"
                                : "pagination-number"
                            }
                            onClick={() => setCurrentPage(totalPages)}
                          >
                            {totalPages}
                          </button>
                        </>
                      )}
                    </div>

                    <button
                      className="pagination-btn"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((prev) => prev + 1)}
                    >
                      {t("next")}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="shop-empty-box">
                <h2>{t("noProductsFound")}</h2>
                <p>{t("tryChangingFilter")}</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Shop;