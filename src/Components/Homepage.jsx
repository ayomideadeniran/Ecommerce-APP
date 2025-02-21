import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import products from "/products";

function HomePage({ addToCart, cart }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(""); // State to hold the search term
  const [addedProducts, setAddedProducts] = useState(new Set()); // Track added products

  // Function to handle adding a product to the cart
  const handleAddToCart = (product) => {
    if (!addedProducts.has(product.id)) {
      addToCart(product); // Add the product to the cart
      setAddedProducts((prevSet) => new Set(prevSet).add(product.id)); // Mark as added
    }
  };

  // Filter products based on the search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate total items in the cart
  const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

  // Reset addedProducts when the cart changes (in case items are removed)
  useEffect(() => {
    const currentProductIds = new Set(cart.map((item) => item.id));
    setAddedProducts(currentProductIds);
  }, [cart]);

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <header style={styles.header}>
        <h1 style={styles.title}>Welcome to Our Store</h1>
        <p style={styles.subtitle}>Discover high-quality products at unbeatable prices!</p>

        {/* Cart Notification Icon */}
        <div style={styles.cartNotificationContainer}>
          <Link to="/cart" style={styles.cartLink}>
            <span style={styles.cartIcon}>🛒</span>
            {totalItemsInCart > 0 && (
              <span style={styles.cartItemCount}>{totalItemsInCart}</span>
            )}
          </Link>
        </div>
      </header>

      {/* Search Bar */}
      <div style={styles.searchBarContainer}>
        <input
          type="text"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
        <button onClick={() => setSearchTerm("")} style={styles.clearButton}>
          Clear
        </button>
      </div>

      {/* Featured Products Section */}
      <section style={styles.featuredSection}>
        <h2 style={styles.sectionTitle}>Featured Products</h2>
        <div style={styles.productGrid}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} style={styles.productCard}>
                {/* Product Image */}
                <img
                  src={product.image}
                  alt={product.name}
                  style={styles.productImage}
                />

                {/* Product Name */}
                <h3 style={styles.productName}>{product.name}</h3>

                {/* Discount Tag */}
                {product.discount > 0 && (
                  <span style={styles.discountTag}>-{product.discount}%</span>
                )}

                {/* Product Price */}
                <p style={styles.productPrice}>
                  ${product.discount > 0
                    ? (product.price * ((100 - product.discount) / 100)).toFixed(2)
                    : product.price.toFixed(2)}

                  {/* Original Price (Strikethrough) */}
                  {product.discount > 0 && (
                    <span style={styles.originalPrice}>
                      {" "}
                      ${product.price.toFixed(2)}
                    </span>
                  )}
                </p>

                {/* Stock Status */}
                <p style={styles.stockStatus}>
                  {product.stock > 0
                    ? product.stock > 10
                      ? "In Stock"
                      : "Low Stock"
                    : "Out of Stock"}
                </p>

                {/* Buttons */}
                <div style={styles.buttonContainer}>
                  <button
                    onClick={() => handleAddToCart(product)}
                    style={{
                      ...styles.addToCartButton,
                      ...(addedProducts.has(product.id) ||
                        product.stock === 0 && {
                          opacity: 0.5,
                          pointerEvents: "none",
                        }),
                    }}
                    disabled={addedProducts.has(product.id) || product.stock === 0}
                  >
                    {addedProducts.has(product.id) || product.stock === 0
                      ? product.stock === 0
                        ? "Out of Stock"
                        : "Added"
                      : "Add to Cart"}
                  </button>
                  <button
                    onClick={() => navigate(`/product/${product.id}`)}
                    style={styles.viewDetailsButton}
                  >
                    More Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p style={styles.noResultsMessage}>
              No results found for "{searchTerm}".
            </p>
          )}
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section style={styles.ctaSection}>
        <h2 style={styles.ctaTitle}>Shop Now and Save Big!</h2>
        <p style={styles.ctaSubtitle}>
          Limited-time offers available. Don't miss out!
        </p>
        <button onClick={() => navigate("/shop")} style={styles.ctaButton}>
          Browse All Products
        </button>
      </section>

      {/* Footer Section */}
      <footer style={styles.footer}>
        <p>
          &copy; {new Date().getFullYear()} Your Ecommerce Store. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}

// Styles for the components
const styles = {
  container: {
    padding: "24px",
    maxWidth: "1200px",
    margin: "0 auto",
    textAlign: "center",
    backgroundColor: "#f8f9fa",
    fontFamily: "'Poppins', sans-serif",
  },
  header: {
    marginBottom: "32px",
    padding: "24px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    position: "relative", // For cart notification positioning
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "8px",
  },
  subtitle: {
    fontSize: "18px",
    color: "#6b7280",
  },
  cartNotificationContainer: {
    position: "absolute",
    top: "16px",
    right: "16px",
  },
  cartLink: {
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    color: "#333",
  },
  cartIcon: {
    fontSize: "24px",
    marginRight: "8px",
    cursor: "pointer",
  },
  cartItemCount: {
    backgroundColor: "#ef4444",
    color: "#fff",
    padding: "4px 8px",
    borderRadius: "50%",
    fontSize: "12px",
    fontWeight: "bold",
    minWidth: "16px",
    textAlign: "center",
    lineHeight: "1",
  },
  searchBarContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "24px",
  },
  searchInput: {
    width: "100%",
    maxWidth: "400px",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    outline: "none",
    transition: "border-color 0.3s ease",
    "&:focus": {
      borderColor: "#22c55e",
    },
  },
  clearButton: {
    marginLeft: "12px",
    padding: "8px 16px",
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: "#dc2626",
    },
  },
  featuredSection: {
    marginBottom: "32px",
  },
  sectionTitle: {
    fontSize: "24px",
    fontWeight: "600",
    marginBottom: "16px",
    color: "#555",
  },
  productGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "24px",
  },
  productCard: {
    border: "1px solid #ddd",
    padding: "16px",
    borderRadius: "8px",
    backgroundColor: "white",
    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "scale(1.05)",
    },
    position: "relative", // For discount tag positioning
  },
  productImage: {
    width: "100%",
    height: "160px",
    objectFit: "cover",
    marginBottom: "8px",
    borderRadius: "8px",
  },
  productName: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#222",
    marginBottom: "8px",
  },
  productPrice: {
    fontSize: "16px",
    color: "#6b7280",
    marginBottom: "16px",
  },
  discountTag: {
    backgroundColor: "#ef4444",
    color: "#fff",
    padding: "4px 8px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: "bold",
    position: "absolute",
    top: "8px",
    right: "8px",
  },
  originalPrice: {
    textDecoration: "line-through",
    color: "#6b7280",
    marginLeft: "8px",
  },
  stockStatus: {
    fontSize: "14px",
    color: (product) => (product.stock > 0 ? "#16a34a" : "#dc2626"),
    marginBottom: "8px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  addToCartButton: {
    backgroundColor: "#22c55e",
    color: "white",
    padding: "8px 12px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: "#16a34a",
    },
  },
  viewDetailsButton: {
    backgroundColor: "#3b82f6",
    color: "white",
    padding: "8px 12px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: "#2563eb",
    },
  },
  ctaSection: {
    padding: "32px",
    backgroundColor: "#f3f4f6",
    borderRadius: "8px",
    marginTop: "32px",
  },
  ctaTitle: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "16px",
  },
  ctaSubtitle: {
    fontSize: "16px",
    color: "#6b7280",
    marginBottom: "24px",
  },
  ctaButton: {
    backgroundColor: "#ef4444",
    color: "white",
    padding: "12px 24px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: "#dc2626",
    },
  },
  footer: {
    padding: "16px",
    backgroundColor: "#ffffff",
    marginTop: "32px",
    borderTop: "1px solid #ddd",
    fontSize: "14px",
    color: "#6b7280",
  },
  noResultsMessage: {
    fontSize: "18px",
    color: "#6b7280",
    margin: "16px 0",
  },
};

export default HomePage;



