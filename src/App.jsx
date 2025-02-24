import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import HomePage from "./Components/Homepage";
import CartPage from "./Components/CartPage";
import ProductDetailsPage from "./Components/ProductDetailsPage";
import SuccessPage from "./Components/SuccessPage";
import CheckoutPage from "./Components/CheckoutPage";
import OrderTracking from "./Components/OrderTracking";
import OrderManagement from "./Components/OrderManagement";
import AdminDashboard from "./Components/AdminDashboard";
import LoginPage from "./Components/LoginPage";
import SignUpPage from "./Components/SignUpPage";
import Navbar from "./Components/Navbar";
// import LogoutPage from "./Components/LogoutPage";

export default function App() {
  const [cart, setCart] = useState([]);
  const [authUser, setAuthUser] = useState(null);

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("authUser"));
    if (storedUser) {
      setAuthUser(storedUser);
    }
  }, []);

  // Function to protect routes (Redirects if not logged in)
  const ProtectedRoute = ({ element }) => {
    return authUser ? element : <Navigate to="/login" />;
  };

  const addToCart = product => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(
        item => item.id === product.id
      );
      if (existingItemIndex !== -1) {
        return prevCart.map(
          item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (product, change) => {
    setCart(prevCart =>
      prevCart.map(
        item =>
          item.id === product.id
            ? { ...item, quantity: Math.max(1, item.quantity + change) }
            : item
      )
    );
  };

  const removeFromCart = id => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  return (
    <Router>
      <Navbar authUser={authUser} setAuthUser={setAuthUser} />
      <Routes>
        <Route
          path="/"
          element={<HomePage addToCart={addToCart} cart={cart} />}
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute
              element={
                <CartPage
                  cart={cart}
                  updateQuantity={updateQuantity}
                  removeFromCart={removeFromCart}
                />
              }
            />
          }
        />
        <Route
          path="/product/:id"
          element={<ProtectedRoute element={<ProductDetailsPage />} />}
        />
        <Route
          path="/checkout"
          element={<ProtectedRoute element={<CheckoutPage />} />}
        />
        <Route
          path="/success"
          element={<ProtectedRoute element={<SuccessPage />} />}
        />

        {/* Protected Routes */}
        <Route
          path="/order-tracking"
          element={<ProtectedRoute element={<OrderTracking />} />}
        />
        <Route
          path="/order-management"
          element={<ProtectedRoute element={<OrderManagement />} />}
        />
        <Route
          path="/admin-dashboard"
          element={<ProtectedRoute element={<AdminDashboard />} />}
        />

        {/* Authentication Routes */}
        <Route
          path="/login"
          element={<LoginPage setAuthUser={setAuthUser} />}
        />
        <Route
          path="/signup"
          element={<SignUpPage setAuthUser={setAuthUser} />}
        />
        {/* <Route path="/logout" element={<LogoutPage setAuthUser={setAuthUser} />} /> */}
      </Routes>
    </Router>
  );
}
