import { Link, useNavigate } from "react-router-dom";
import logoImage from "../assets/images/Logo1.png";
import { useContext, useState, useRef, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { useWishlist } from "../context/WishlistContext";
import SearchBar from "./SearchBar";
function Navbar() {
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);
  const { user, isAdmin, logout } = useContext(AuthContext);
  const { language, changeLanguage, languages, t } = useLanguage();
  const { wishlistCount } = useWishlist();
  const [langOpen, setLangOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const langRef = useRef(null);
  const userMenuRef = useRef(null);
  const cartCount = cartItems.length;
  const accountLink = user ? (isAdmin ? "/admin/dashboard" : "/account") : "/login";

  const currentLang = languages.find((l) => l.code === language);

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      setUserMenuOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    const handleClick = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) setUserMenuOpen(false);
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
          <Link to="/">{t("home")}</Link>
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
          {user ? (
            <div className="user-menu" ref={userMenuRef}>
              <button
                className="icon-link user-menu-toggle"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                title={user.displayName || user.email}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </button>
              {userMenuOpen && (
                <div className="user-dropdown">
                  <div className="user-dropdown-header">
                    <p className="user-name">{user.displayName || user.email}</p>
                  </div>
                  <Link to={accountLink} className="user-dropdown-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <span>{isAdmin ? t("adminDashboard") : t("myAccount")}</span>
                  </Link>
                  <button onClick={handleLogout} className="user-dropdown-item logout-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                      <polyline points="16 17 21 12 16 7"></polyline>
                      <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                    <span>{t("logout")}</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="icon-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </Link>
          )}
          {user && (
            <Link to="/wishlist" className="icon-link wishlist-icon-wrapper" title={t("myWishlist") || "My Wishlist"}>
              <span className="wishlist-icon">♥</span>
              {wishlistCount > 0 && <span className="wishlist-badge">{wishlistCount}</span>}
            </Link>
          )}
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