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
        const products = res.data?.data?.products || [];

        // Fetch full product data to get images
        const productsWithImages = await Promise.all(
          products.map(async (product) => {
            try {
              // Try to fetch full product details from API
              const productRes = await api.get(`/products/${product.productId || product.id}`);
              const apiProduct = productRes.data?.data;
              if (apiProduct?.image) {
                return {
                  ...product,
                  image: apiProduct.image
                };
              }
            } catch (err) {
              // If API fetch fails, just return product as is
            }
            return product;
          })
        );

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

      const res = await api.post("/wishlist", {
        productId: product.id,
      });

      // Fetch full product data to get images
      const products = res.data?.data?.products || [];
      const productsWithImages = await Promise.all(
        products.map(async (item) => {
          try {
            const productRes = await api.get(`/products/${item.productId || item.id}`);
            const apiProduct = productRes.data?.data;
            if (apiProduct?.image) {
              return {
                ...item,
                image: apiProduct.image
              };
            }
          } catch (err) {
            // If API fetch fails, use provided image or fallback
          }
          return item;
        })
      );

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

      // Fetch full product data to get images
      const products = res.data?.data?.products || [];
      const productsWithImages = await Promise.all(
        products.map(async (item) => {
          try {
            const productRes = await api.get(`/products/${item.productId || item.id}`);
            const apiProduct = productRes.data?.data;
            if (apiProduct?.image) {
              return {
                ...item,
                image: apiProduct.image
              };
            }
          } catch (err) {
            // If API fetch fails, return item as is
          }
          return item;
        })
      );

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
