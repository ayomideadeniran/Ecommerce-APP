import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ authUser, setAuthUser }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("authUser");
    setAuthUser(null);
    setIsMenuOpen(false); // Close the menu after logout
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        {/* Logo or Brand Name */}
        <Link to="/" style={styles.brandLink}>
          ATECH STORE
        </Link>

        {/* Navigation Links (Desktop View) */}
        <ul style={styles.navList}>
          <li>
            <Link to="/" style={styles.link}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/cart" style={styles.link}>
              Cart <span style={styles.cartIcon}>🛒</span>
            </Link>
          </li>
          {authUser ? (
            <>
              <li>
                <Link to="/order-tracking" style={styles.link}>
                  Order Tracking
                </Link>
              </li>
              <li>
                <a href="https://ecommerce-sms-api.onrender.com" target="_blank" rel="noopener noreferrer" style={styles.link}>
                  Send SMS
                </a>
              </li>
              <li>
                <Link to="/admin-dashboard" style={styles.link}>
                  Admin Dashboard
                </Link>
              </li>
                <li>
                <button onClick={handleLogout} style={styles.logoutButton}>
                    Logout
                </button>
                </li>
            </>
          ) : null}
        </ul>

        {/* Hamburger Menu Toggle (Mobile View) */}
        <div style={styles.hamburgerContainer}>
          <button
            onClick={() => setIsMenuOpen(true)}
            style={styles.hamburgerButton}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              style={styles.hamburgerIcon}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>

        {/* Offcanvas Menu (Mobile View) */}
        {isMenuOpen && (
          <>
            <div style={styles.offcanvasOverlay} onClick={() => setIsMenuOpen(false)}></div>
            <div style={styles.offcanvasMenu}>
              <div style={styles.offcanvasHeader}>
                <h5 style={styles.offcanvasTitle}>ATECH STORE</h5>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  style={styles.closeButton}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    style={styles.closeIcon}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <ul style={styles.offcanvasNavList}>
                <li>
                  <Link to="/" style={styles.link} onClick={() => setIsMenuOpen(false)}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/cart" style={styles.link} onClick={() => setIsMenuOpen(false)}>
                    Cart <span style={styles.cartIcon}>🛒</span>
                  </Link>
                </li>
                {authUser ? (
                  <>
                    <li>
                      <Link to="/order-tracking" style={styles.link} onClick={() => setIsMenuOpen(false)}>
                        Order Tracking
                      </Link>
                    </li>
                    <li>
                      <a href="https://ecommerce-sms-api.onrender.com" target="_blank" rel="noopener noreferrer" style={styles.link}>
                        Send SMS
                      </a>
                    </li>
                    <li>
                      <Link to="/admin-dashboard" style={styles.link} onClick={() => setIsMenuOpen(false)}>
                        Admin Dashboard
                      </Link>
                    </li>
                    <li>
                        <button onClick={handleLogout} style={styles.logoutButton}>
                            Logout
                        </button>
                    </li>
                  </>
                ) : (
                  null
                )}
              </ul>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

// Styles for the Navbar
const styles = {
  navbar: {
    backgroundColor: "#22c55e",
    padding: "10px 20px",
    marginBottom: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "0px",
    fontFamily: "'Poppins', sans-serif",
    position: "sticky",
    top: "0",
    zIndex: "100",
  },
  container: {
    maxWidth: "1200px",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  brandLink: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "20px",
    fontWeight: "bold",
    fontFamily: "'Poppins', sans-serif",
  },
  navList: {
    listStyle: "none",
    display: "flex",
    gap: "20px",
    margin: 0,
    padding: 0,
    alignItems: "center",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "500",
    transition: "color 0.3s ease",
    "&:hover": {
      color: "#f8f9fa",
    },
    display: "flex",
    alignItems: "center",
  },
    cartIcon:{
        marginLeft:"4px"
    },
  connectButton: {
    backgroundColor: "#16a34a",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: "#15803d",
    },
  },
  logoutButton: {
    backgroundColor: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: "#dc2626",
    },
  },
  hamburgerContainer: {
    display: "none",
    "@media (max-width: 768px)": {
      display: "flex",
    },
  },
  hamburgerButton: {
    color: "#fff",
    background: "none",
    border: "none",
    cursor: "pointer",
  },
  hamburgerIcon: {
    width: "24px",
    height: "24px",
  },
  offcanvasOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
  },
  offcanvasMenu: {
    position: "fixed",
    top: 0,
    right: "-300px",
    width: "300px",
    height: "100%",
    backgroundColor: "#ffffff",
    zIndex: 1000,
    padding: "20px",
    transition: "right 0.3s ease",
    "@media (max-width: 768px)": {
      right: "0",
    },
    boxShadow: "-2px 0 5px rgba(0, 0, 0, 0.2)", // Add a subtle shadow
  },
  offcanvasHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
      color:"#22c55e",
      fontWeight:"bold"
  },
  offcanvasTitle: {
    color: "#22c55e",
    fontSize: "20px",
    fontWeight: "bold",
  },
  closeButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
  },
  closeIcon: {
    width: "24px",
    height: "24px",
    color: "#333",
  },
  offcanvasNavList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
};

export default Navbar;
