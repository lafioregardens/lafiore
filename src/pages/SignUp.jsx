import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { Eye, EyeOff } from "lucide-react";
import FormToast from "../components/FormToast";
import { AuthContext } from "../context/AuthContext";

function SignUp() {
  // Auth & Navigation
  const { googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  // Form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Toggle states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Toast state
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [loading, setLoading] = useState(false);

  // Handle email/password signup
  const handleSignUp = (e) => {
    e.preventDefault();

    if (!fullName || !email || !password || !confirmPassword) {
      setToastType("error");
      setToastMessage("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setToastType("error");
      setToastMessage("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setToastType("error");
      setToastMessage("Passwords do not match.");
      return;
    }

    setToastType("success");
    setToastMessage("Account created successfully.");
  };

  // Handle Google signup
  const handleGoogleSignUp = async () => {
    try {
      setLoading(true);
      await googleLogin();
      navigate("/");
    } catch (err) {
      setToastType("error");
      setToastMessage(err.message || "Google sign-up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <main className="signup-page">
        <section className="signup-hero">
          <h1>Create an Account</h1>
          <p>Join La Fiore to save favorites and track orders.</p>
        </section>

        <section className="signup-card">
          <FormToast
            message={toastMessage}
            type={toastType}
            onClose={() => setToastMessage("")}
          />

          <h2>Sign Up</h2>

          <form onSubmit={handleSignUp}>
            <label>Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
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

            <label>Confirm Password</label>
            <div className="password-input-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button className="signup-btn">Create Account</button>
          </form>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <button
            type="button"
            className="google-btn"
            onClick={handleGoogleSignUp}
            disabled={loading}
          >
            <img src="/google-icon.svg" alt="" width="18" height="18" />
            Sign up with Google
          </button>

          <p className="login-text">
            Already have an account?{" "}
            <Link to="/login" className="login-link">
              Login
            </Link>
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default SignUp;