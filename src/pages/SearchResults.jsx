import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import products from "../data/products";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const filteredProducts = useMemo(() => {
    if (!query.trim()) {
      return [];
    }

    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.mainCategory?.toLowerCase().includes(query.toLowerCase()) ||
        p.tags?.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
    );
  }, [query]);

  return (
    <div>
      <Navbar />

      <main className="search-results-page">
        <section className="search-results-hero">
          <h1>Search Results</h1>
          <p>
            {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} found for "
            {query}"
          </p>
        </section>

        <section className="search-results-grid">
          {filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="search-results-empty">
              <p>No products found. Try a different search.</p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default SearchResults;
