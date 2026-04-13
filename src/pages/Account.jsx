import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthContext } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import "./Account.css";

function Account() {
  const { user, isAdmin, logout } = useContext(AuthContext);
  const { t } = useLanguage();
  const navigate = useNavigate();

  console.log("Account page loaded. isAdmin:", isAdmin, "user:", user?.email);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div>
      <Navbar />

      <main className="account-page">
        <section className="account-hero">
          <h1>{t("myAccount")}</h1>
          <p>{t("manageProfile")}</p>
        </section>

        <section className="account-content">
          <div className="account-card">
            <div className="account-section">
              <h2>{t("profileInfo")}</h2>
              <div className="account-avatar">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName} />
                ) : (
                  <div className="account-avatar-placeholder">👤</div>
                )}
              </div>
              <div className="account-info">
                <p className="account-name">{user?.displayName || "User"}</p>
                <p className="account-email">{user?.email}</p>
                {isAdmin && <span className="account-admin-badge">ADMIN</span>}
              </div>
            </div>

            {isAdmin && (
              <div className="account-section">
                <h2>{t("adminPanel")}</h2>
                <Link to="/admin/dashboard" className="account-admin-link">
                  {t("goToAdmin")} →
                </Link>
              </div>
            )}

            <div className="account-section">
              <h2>{t("orderHistory")}</h2>
              <div className="account-orders-list">
                <p className="account-empty">{t("noOrders")}</p>
              </div>
            </div>

            <div className="account-section">
              <h2>{t("accountSettings")}</h2>
              <button className="account-logout-btn" onClick={handleLogout}>
                {t("logout")}
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Account;
