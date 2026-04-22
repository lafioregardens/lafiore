import { createContext, useState, useEffect, useContext } from "react";
import api from "../utils/api";

export const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load product image cache from localStorage
  const [productImageCache, setProductImageCache] = useState(() => {
    try {
      const cached = localStorage.getItem("wishlistProductImages");
      return cached ? JSON.parse(cached) : {};
    } catch {
      return {};
    }
  });

  // Persist image cache to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("wishlistProductImages", JSON.stringify(productImageCache));
  }, [productImageCache]);

  // Fetch wishlist when component mounts or user logs in
  useEffect(() => {
    const loadWishlist = async () => {
      try {
        setLoading(true);
        const res = await api.get("/wishlist");
        const products = res.data?.data?.products || [];

        // Load current image cache
        const currentCache = (() => {
          try {
            const cached = localStorage.getItem("wishlistProductImages");
            return cached ? JSON.parse(cached) : {};
          } catch {
            return {};
          }
        })();

        // Merge with cached images
        const productsWithImages = products.map(product => ({
          ...product,
          image: product.image || currentCache[product.productId] || currentCache[product.id]
        }));

        setWishlist(productsWithImages);
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

      // Cache product image for later use
      if (product.image) {
        setProductImageCache(prev => ({
          ...prev,
          [product.id]: product.image
        }));
      }

      const res = await api.post("/wishlist", {
        productId: product.id,
      });

      // Merge response with cached images
      const products = res.data?.data?.products || [];
      const productsWithImages = products.map(item => ({
        ...item,
        image: item.image || productImageCache[item.productId] || productImageCache[item.id] || product.image
      }));

      setWishlist(productsWithImages);
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

  // Add custom bouquet to wishlist (local storage)
  const addCustomBouquetToWishlist = (customBouquet) => {
    try {
      setLoading(true);
      // For custom bouquets, store locally with a special ID
      const bouquetWithId = {
        productId: customBouquet.id,
        name: customBouquet.name,
        image: customBouquet.image,
        price: customBouquet.price,
        isCustomBouquet: true,
        details: customBouquet.details,
      };

      // Check if already in wishlist
      if (wishlist.some((item) => item.productId === bouquetWithId.productId)) {
        return { success: false, message: "Already in wishlist" };
      }

      setWishlist((prev) => [...prev, bouquetWithId]);
      return { success: true, message: "Custom bouquet added to wishlist" };
    } catch (error) {
      console.error("Error adding custom bouquet to wishlist:", error);
      return { success: false, message: "Failed to add to wishlist" };
    } finally {
      setLoading(false);
    }
  };

  // Remove product from wishlist
  const removeFromWishlist = async (productId) => {
    try {
      setLoading(true);
      const res = await api.delete(`/wishlist/${productId}`);

      // Merge response with cached images
      const products = res.data?.data?.products || [];
      const productsWithImages = products.map(item => ({
        ...item,
        image: item.image || productImageCache[item.productId] || productImageCache[item.id]
      }));

      setWishlist(productsWithImages);
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
        addCustomBouquetToWishlist,
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
