import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import FormToast from "../components/FormToast";

function Login() {
  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Password visibility toggle
  const [showPassword, setShowPassword] = useState(false);

  // Toast state
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  // Handle login button
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

          <p className="signup-text">
            Don’t have an account?{" "}
            <Link to="/signup" className="signup-link">
              Sign Up
            </Link>
          </p>
        </section>
      </main>
    </div>
  );
}

export default Login;