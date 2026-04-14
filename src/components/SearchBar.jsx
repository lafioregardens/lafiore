import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import products from "../data/products";
import "./SearchBar.css";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const timeoutRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    // Debounce search
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (query.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    timeoutRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        // Try backend first
        const res = await api.get(`/products/search?q=${query}`);
        setResults(res.data.data || []);
      } catch (err) {
        // Fallback to local search
        const filtered = products.filter(
          (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.category?.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered.slice(0, 8));
      }
      setIsOpen(true);
      setLoading(false);
    }, 300);
  }, [query]);

  const handleSelectResult = (productId) => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
    navigate(`/product/${productId}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && query.trim()) {
      e.preventDefault();
      const searchQuery = query.trim();
      setQuery("");
      setResults([]);
      setIsOpen(false);
      setIsExpanded(false);
      navigate(`/search?q=${searchQuery}`);
    }
  };

  const handleIconClick = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      if (!query.trim()) {
        setIsExpanded(false);
      }
      setIsOpen(false);
    }, 150);
  };

  return (
    <div className={`searchbar-wrapper ${isExpanded ? "expanded" : ""}`} ref={wrapperRef}>
      <button
        className="searchbar-icon-btn"
        onClick={handleIconClick}
        aria-label="Search"
      >
        <svg className="searchbar-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
      </button>
      <input
        ref={inputRef}
        type="text"
        className="searchbar-input"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        onBlur={handleBlur}
      />

      {isOpen && results.length > 0 && (
        <div className="searchbar-dropdown">
          {results.map((product) => (
            <div
              key={product.id}
              className="searchbar-result-item"
              onClick={() => handleSelectResult(product.id)}
            >
              {product.image && (
                <img src={product.image} alt={product.name} className="searchbar-result-image" />
              )}
              <div className="searchbar-result-text">
                <span className="searchbar-result-name">{product.name}</span>
                <span className="searchbar-result-price">{product.price}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {isOpen && query.length >= 2 && results.length === 0 && !loading && (
        <div className="searchbar-dropdown">
          <div className="searchbar-no-results">No products found</div>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
