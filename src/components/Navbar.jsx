import { Link } from "react-router-dom";
import logoImage from "../assets/images/Logo1.png";
import { useContext, useState, useRef, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import SearchBar from "./SearchBar";
function Navbar() {
  const { cartItems } = useContext(CartContext);
  const { user, isAdmin } = useContext(AuthContext);
  const { language, changeLanguage, languages, t } = useLanguage();
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef(null);
  const cartCount = cartItems.length;
  const accountLink = user ? (isAdmin ? "/admin/dashboard" : "/account") : "/login";

  const currentLang = languages.find((l) => l.code === language);

  useEffect(() => {
    const handleClick = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <nav className="navbar-container">
      <div className="logo-wrapper">
        <img src={logoImage} alt="LaFiore Logo" className="logo-image" />
        <div className="logo">LA FIORE</div>
      </div>
      <div className="nav-row">
        <div className="nav-menu">
          <Link to="/">Home</Link>
          <Link to="/shop">{t("shop")}</Link>
          <Link to="/plantfinder">{t("plantFinder")}</Link>
          <Link to="/customize">{t("customizeBouquets")}</Link>
          <Link to="/birth-month">{t("birthMonthFlowers")}</Link>
          <Link to="/consultation">{t("ourServices")}</Link>
        </div>
        <div className="nav-icons">
          <div className="nav-search-wrapper">
            <SearchBar />
          </div>
          <Link to={accountLink} className="icon-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </Link>
          <Link to="/cart" className="icon-link cart-icon-wrapper">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          <div className="lang-selector" ref={langRef}>
            <button className="lang-toggle" onClick={() => setLangOpen(!langOpen)} title="Change language">
              {currentLang?.flag} <span className="lang-code">{currentLang?.code.toUpperCase()}</span>
            </button>
            {langOpen && (
              <div className="lang-dropdown">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    className={`lang-option ${l.code === language ? "lang-option--active" : ""}`}
                    onClick={() => { changeLanguage(l.code); setLangOpen(false); }}
                  >
                    <span>{l.flag}</span> {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <hr className="nav-divider" />
    </nav>
  );
}

export default Navbar;