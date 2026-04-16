import { createContext, useState, useEffect, useContext } from "react";
import api from "../utils/api";

export const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch wishlist when component mounts or user logs in
  useEffect(() => {
    const loadWishlist = async () => {
      try {
        setLoading(true);
        const res = await api.get("/wishlist");
        setWishlist(res.data?.data?.products || []);
      } catch (error) {
        console.warn("Could not load wishlist:", error.message);
        // If not logged in, wishlist will be empty
        setWishlist([]);
      } finally {
        setLoading(false);
      }
    };

    loadWishlist();
  }, []);

  // Add product to wishlist
  const addToWishlist = async (product) => {
    try {
      setLoading(true);
      const res = await api.post("/wishlist", {
        productId: product.id,
      });

      setWishlist(res.data?.data?.products || []);
      return { success: true, message: "Added to wishlist" };
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      if (error.response?.status === 401) {
        return { success: false, message: "Please log in to add to wishlist" };
      }
      if (error.response?.data?.error === "Product already in wishlist") {
        return { success: false, message: "Already in wishlist" };
      }
      return { success: false, message: error.response?.data?.error || "Failed to add to wishlist" };
    } finally {
      setLoading(false);
    }
  };

  // Remove product from wishlist
  const removeFromWishlist = async (productId) => {
    try {
      setLoading(true);
      const res = await api.delete(`/wishlist/${productId}`);

      setWishlist(res.data?.data?.products || []);
      return { success: true, message: "Removed from wishlist" };
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      return { success: false, message: "Failed to remove from wishlist" };
    } finally {
      setLoading(false);
    }
  };

  // Check if product is in wishlist
  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.productId === productId);
  };

  // Get wishlist count
  const wishlistCount = wishlist.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount,
        loading,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

// Custom hook to use wishlist
export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }
  return context;
}
