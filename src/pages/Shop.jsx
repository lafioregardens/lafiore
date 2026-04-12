import Navbar from "../components/Navbar";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import categories from "../data/categories";
import products from "../data/products";

function Shop() {
  const [selectedMainCategory, setSelectedMainCategory] = useState("All");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 12;

  const getPriceNumber = (price) => {
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
    if (selectedMainCategory === categoryName && categoryName !== "All") {
      setSelectedMainCategory("All");
      setSelectedSubCategory("");
    } else {
      setSelectedMainCategory(categoryName);

      const chosenCategory = categories.find((item) => item.name === categoryName);

      if (chosenCategory?.subcategories) {
        setSelectedSubCategory("All");
      } else {
        setSelectedSubCategory("");
      }
    }

    setCurrentPage(1);
  };

  const handleSubCategoryChange = (subcategory) => {
    setSelectedSubCategory(subcategory);
    setCurrentPage(1);
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
            <h1>Shop Our Collection</h1>
            <p>Beautiful Plants, Flowers & Gifts for Every Occasion</p>
          </div>
        </section>

        <section className="shop-layout">
          <aside className="shop-sidebar">
            <div className="shop-sidebar-box">
              <h3>Categories</h3>

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
                      {category.name}
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
                              {subcategory}
                            </button>
                          ))}
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </div>

            <div className="shop-sidebar-box">
              <h3>Price</h3>

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
              <h3>Sort</h3>

              <select
                className="shop-sidebar-select"
                value={sortBy}
                onChange={handleSortChange}
              >
                <option value="default">Default</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
              </select>
            </div>
          </aside>

          <div className="shop-content">
            <div className="shop-topbar">
              <input
                type="text"
                className="shop-search-input"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearchChange}
              />

              <p className="shop-results-count">
                {filteredProducts.length} products found
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
                        <div className="shop-card-image-wrapper">
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
                        </div>

                        <div className="shop-card-content">
                          <div className="shop-card-rating-row">
                            <span className="shop-card-stars">
                              {renderStars(product.rating)}
                            </span>
                            <span className="shop-card-rating-number">
                              {product.rating}.0
                            </span>
                          </div>

                          <h3>{product.name}</h3>

                          <div className="shop-card-price">
                            {product.price || "Price on request"}
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
                      Previous
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
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="shop-empty-box">
                <h2>No products found</h2>
                <p>Try changing your category, search, or price filter.</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Shop;