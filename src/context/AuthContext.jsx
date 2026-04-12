import { createContext, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import api from "../utils/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if user is logged in on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);

        // Try to restore session from backend if token exists
        const token = localStorage.getItem("lafiore_token");
        if (token) {
          try {
            const res = await api.get("/auth/me");
            console.log("Auth ME response:", res.data?.data);
            if (res.data?.data?.role === "admin") {
              console.log("Setting isAdmin to true");
              setIsAdmin(true);
            } else {
              console.log("Role is not admin, role is:", res.data?.data?.role);
            }
          } catch (err) {
            console.warn("Could not restore session from backend", err);
            // Still keep user logged in via Firebase even if backend is offline
          }
        }
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    try {
      const firebaseRes = await signInWithEmailAndPassword(auth, email, password);

      // Get JWT from backend
      try {
        const backendRes = await api.post("/auth/login", {
          email: firebaseRes.user.email,
        });
        localStorage.setItem("lafiore_token", backendRes.data.data.token);

        if (backendRes.data.data.role === "admin") {
          setIsAdmin(true);
        }
      } catch (err) {
        console.warn("Backend login failed, using Firebase only", err.message);
      }

      return firebaseRes.user;
    } catch (error) {
      throw error;
    }
  };

  const register = async (fullName, email, password) => {
    try {
      const firebaseRes = await createUserWithEmailAndPassword(auth, email, password);

      // Update profile with full name
      await updateProfile(firebaseRes.user, { displayName: fullName });

      // Register with backend
      try {
        const backendRes = await api.post("/auth/register", {
          name: fullName,
          email,
        });
        localStorage.setItem("lafiore_token", backendRes.data.data.token);
      } catch (err) {
        console.warn("Backend registration failed", err.message);
      }

      return firebaseRes.user;
    } catch (error) {
      throw error;
    }
  };

  const googleLogin = async () => {
    try {
      const firebaseRes = await signInWithPopup(auth, googleProvider);
      const idToken = await firebaseRes.user.getIdToken();

      // Exchange Firebase token for backend JWT
      try {
        const backendRes = await api.post("/auth/google", {
          idToken,
          email: firebaseRes.user.email,
          name: firebaseRes.user.displayName,
        });
        console.log("Google auth response:", backendRes.data?.data);
        localStorage.setItem("lafiore_token", backendRes.data.data.token);

        if (backendRes.data.data.role === "admin") {
          console.log("Setting isAdmin to true from Google login");
          setIsAdmin(true);
        }
      } catch (err) {
        console.warn("Backend Google auth failed, using Firebase only", err);
      }

      return firebaseRes.user;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("lafiore_token");
      setUser(null);
      setIsAdmin(false);
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin, login, register, googleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
