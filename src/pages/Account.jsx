import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthContext } from "../context/AuthContext";
import "./Account.css";

function Account() {
  const { user, isAdmin, logout } = useContext(AuthContext);
  const navigate = useNavigate();

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
          <h1>My Account</h1>
          <p>Manage your profile and orders</p>
        </section>

        <section className="account-content">
          <div className="account-card">
            <div className="account-section">
              <h2>Profile Information</h2>
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
                <h2>Admin Panel</h2>
                <Link to="/admin/dashboard" className="account-admin-link">
                  Go to Admin Dashboard →
                </Link>
              </div>
            )}

            <div className="account-section">
              <h2>Order History</h2>
              <div className="account-orders-list">
                <p className="account-empty">No orders yet</p>
              </div>
            </div>

            <div className="account-section">
              <h2>Account Settings</h2>
              <button className="account-logout-btn" onClick={handleLogout}>
                Logout
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
