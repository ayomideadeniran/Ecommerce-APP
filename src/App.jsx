import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Components/Homepage';
import CartPage from './Components/CartPage';
import ProductDetailsPage from './Components/ProductDetailsPage';
import SuccessPage from './Components/SuccessPage';
import CheckoutPage from './Components/CheckoutPage';
/////////////////////////////////////////
import OrderTracking from './Components/OrderTracking';
import OrderManagement from './Components/OrderManagement';
import AdminDashboard from './Components/AdminDashboard';
import LoginPage from './Components/LoginPage';
import SignUpPage from './Components/SignUpPage';

export default function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item.id === product.id);
      if (existingItemIndex !== -1) {
        // Product already exists in cart, increment its quantity
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Product does not exist in cart, add it with initial quantity of 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };
  const updateQuantity = (product, change) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === product.id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <Router>
      <Routes>
        {/* Pass the `cart` state to HomePage */}
        <Route path="/" element={<HomePage addToCart={addToCart} cart={cart} />} />
        <Route
          path="/cart"
          element={<CartPage cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />}
        />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/success" element={<SuccessPage />} />
        {/* ////////////////////////////// */}
        <Route path="/order-tracking" element={<OrderTracking />} />
        <Route path="/order-management" element={<OrderManagement />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        {/* ////////////////////// */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </Router>
  );
}



