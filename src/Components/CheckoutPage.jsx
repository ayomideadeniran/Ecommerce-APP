import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const cart = location.state?.cart || [];

  const [cardNumber, setCardNumber] = useState('6116425849529927');
  const [expiryDate, setExpiryDate] = useState('12/26');
  const [cvv, setCvv] = useState('357');
  const [name, setName] = useState('Ayomide Adeniran');
  const [phone, setPhone] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [instructions, setInstructions] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Calculate total amount
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  // Handle payment submission
  const handlePayment = (e) => {
    e.preventDefault();

    // Validation
    if (!cardNumber || !expiryDate || !cvv || !name || !phone || !deliveryLocation) {
      setError('Please fill in all required fields.');
      return;
    }

    if (cardNumber.length !== 16 || isNaN(Number(cardNumber))) {
      setError('Invalid card number. Must be 16 digits.');
      return;
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
      setError('Invalid expiry date. Format: MM/YY');
      return;
    }

    if (cvv.length !== 3 || isNaN(Number(cvv))) {
      setError('Invalid CVV. Must be 3 digits.');
      return;
    }

    if (!/^[0-9]{11}$/.test(phone)) {
      setError('Invalid phone number. Must be 11 digits.');
      return;
    }

    // Clear error and start processing
    setError('');
    setLoading(true);

    // Create new order
    const newOrder = {
      id: Date.now(),
      customer: name,
      phone,
      deliveryLocation,
      instructions,
      status: 'Pending',
    };

    // Save order to local storage
    const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
    localStorage.setItem('orders', JSON.stringify([...existingOrders, newOrder]));

    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      navigate('/success');
    }, 3000);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Checkout</h2>
      <p style={styles.totalAmount}>Total Amount: <strong>${totalAmount}</strong></p>

      <form onSubmit={handlePayment} style={styles.form}>
        {/* Card Number */}
        <label style={styles.label}>Card Number</label>
        <input
          type="text"
          placeholder="Enter card number"
          maxLength="16"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          required
          style={styles.input}
        />

        {/* Expiry Date */}
        <label style={styles.label}>Expiry Date (MM/YY)</label>
        <input
          type="text"
          placeholder="MM/YY"
          maxLength="5"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          required
          style={styles.input}
        />

        {/* CVV */}
        <label style={styles.label}>CVV</label>
        <input
          type="password"
          placeholder="Enter CVV"
          maxLength="3"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          required
          style={styles.input}
        />

        {/* Cardholder Name */}
        <label style={styles.label}>Cardholder Name</label>
        <input
          type="text"
          placeholder="Enter cardholder name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={styles.input}
        />

        {/* Phone Number */}
        <label style={styles.label}>Phone Number</label>
        <input
          type="text"
          placeholder="Enter phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          style={styles.input}
        />

        {/* Delivery Location */}
        <label style={styles.label}>Delivery Location</label>
        <input
          type="text"
          placeholder="Enter delivery location"
          value={deliveryLocation}
          onChange={(e) => setDeliveryLocation(e.target.value)}
          required
          style={styles.input}
        />

        {/* Additional Instructions */}
        <label style={styles.label}>Additional Instructions (Optional)</label>
        <textarea
          placeholder="Enter any additional instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          style={styles.textarea}
        />

        {/* Error Message */}
        {error && <p style={styles.error}>{error}</p>}

        {/* Submit Button */}
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Processing...' : `Pay $${totalAmount}`}
        </button>
      </form>
    </div>
  );
}

// Styles for the components
const styles = {
  container: {
    padding: '24px',
    maxWidth: '400px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    fontFamily: "'Poppins', sans-serif",
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '16px',
  },
  totalAmount: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#222',
    marginBottom: '24px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#555',
    marginBottom: '4px',
  },
  input: {
    padding: '12px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    outline: 'none',
    transition: 'border-color 0.3s ease',
    '&:focus': {
      borderColor: '#22c55e',
    },
  },
  textarea: {
    padding: '12px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    outline: 'none',
    minHeight: '80px',
    resize: 'none',
    transition: 'border-color 0.3s ease',
    '&:focus': {
      borderColor: '#22c55e',
    },
  },
  error: {
    color: '#ef4444',
    fontSize: '14px',
    marginTop: '8px',
  },
  button: {
    backgroundColor: '#22c55e',
    color: '#fff',
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: '#16a34a',
    },
  },
};