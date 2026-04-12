import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { Eye, EyeOff } from "lucide-react";
import FormToast from "../components/FormToast";
import { AuthContext } from "../context/AuthContext";

function Login() {
  // Auth & Navigation
  const { googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Password visibility toggle
  const [showPassword, setShowPassword] = useState(false);

  // Toast state
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [loading, setLoading] = useState(false);

  // Handle email/password login
  const handleLogin = (e) => {
    e.preventDefault();

    // Basic validation
    if (!email.trim() || !password.trim()) {
      setToastType("error");
      setToastMessage("Please fill in all fields.");
      return;
    }

    // Demo check (temporary)
    if (password.length < 6) {
      setToastType("error");
      setToastMessage("Incorrect password.");
      return;
    }

    // Success (for now)
    setToastType("success");
    setToastMessage("Logged in successfully.");
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await googleLogin();
      navigate("/");
    } catch (err) {
      setToastType("error");
      setToastMessage(err.message || "Google sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <main className="login-page">
        <section className="login-hero">
          <h1>Welcome Back</h1>
          <p>Log in to continue shopping and manage your orders.</p>
        </section>

        <section className="login-card">

          {/* Toast message */}
          <FormToast
            message={toastMessage}
            type={toastType}
            onClose={() => setToastMessage("")}
          />

          <h2>Log In</h2>

          <form onSubmit={handleLogin}>
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Password</label>

            {/* Password input with toggle */}
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button className="login-btn">Log In</button>
          </form>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <button
            type="button"
            className="google-btn"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <img src="/google-icon.svg" alt="" width="18" height="18" />
            Continue with Google
          </button>

          <p className="signup-text">
            Don't have an account?{" "}
            <Link to="/signup" className="signup-link">
              Sign Up
            </Link>
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Login;