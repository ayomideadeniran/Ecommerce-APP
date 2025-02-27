import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const cart = location.state?.cart || [];

  // Payment Details
  const [cardNumber, setCardNumber] = useState('6116425849529927');
  const [expiryDate, setExpiryDate] = useState('12/26');
  const [cvv, setCvv] = useState('357');

  // Personal Details
  const [name, setName] = useState('Ayomide Adeniran');
  const [phone, setPhone] = useState('08561478239');
  const [deliveryLocation, setDeliveryLocation] = useState('123 Main Street, Lagos');
  const [instructions, setInstructions] = useState('Leave at the doorstep');

  // Identification Details
  const [nin, setNin] = useState('67834591201');
  const [passportNumber, setPassportNumber] = useState('P15623478');

  // State for errors and loading
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);

  // Calculate total amount
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  // Handle payment submission
  const handlePayment = (e) => {
    e.preventDefault();

    // Validation
    if (!cardNumber || !expiryDate || !cvv || !name || !phone || !deliveryLocation || !nin || !passportNumber) {
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
    if (nin.length !== 11 || isNaN(Number(nin))) {
      setError('Invalid NIN. Must be 11 digits.');
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

    // Toggle Policy Visibility
    const togglePolicy = () => {
      setShowPolicy(!showPolicy);
    };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Checkout</h2>
      <p style={styles.totalAmount}>Total Amount: <strong style={{color:"#22c55e"}}>${totalAmount}</strong></p>

      <form onSubmit={handlePayment} style={styles.form}>
        {/* Card Number */}
        <label style={styles.label}>Card Number</label>
        <input
          type="text"
          placeholder="Enter 16-digit card number"
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
          placeholder="Enter expiry date (MM/YY)"
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
          placeholder="Enter 3-digit CVV"
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
          placeholder="Enter 11-digit phone number"
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

        {/* NIN */}
        <label style={styles.label}>NIN (National Identification Number)</label>
        <input
          type="text"
          placeholder="Enter 11-digit NIN"
          value={nin}
          onChange={(e) => setNin(e.target.value)}
          required
          style={styles.input}
          maxLength="11"
        />

        {/* Passport Number */}
        <label style={styles.label}>Passport Number</label>
        <input
          type="text"
          placeholder="Enter passport number"
          value={passportNumber}
          onChange={(e) => setPassportNumber(e.target.value)}
          required
          style={styles.input}
        />
        <div style={styles.policySection}>
          <button type="button" onClick={togglePolicy} style={styles.policyButton}>
              {showPolicy ? 'Hide Installment Policy' : 'View Installment Policy'}
          </button>
          {showPolicy && (
            <div style={styles.policyContent}>
              <h3>Installment Purchase Agreement</h3>
              <p>
                By choosing to purchase through installments, you agree to the following terms:
              </p>
              <ul>
                <li>You will make scheduled payments as agreed upon.</li>
                <li>Failure to meet payments may result in the suspension of installment plans.</li>
                <li>The product will remain the property of the company until full payment is received.</li>
                <li>Returns and exchanges are subject to our standard policy but may have additional terms for installment purchases.</li>
                <li>Installment plans are subject to credit verification.</li>
              </ul>
              <p>Please contact us if you have any questions regarding installment purchases.</p>
            </div>
          )}
        </div>
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
    maxWidth: '600px', // Increased max-width
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
  policySection: {
    marginTop: '20px',
    marginBottom: '20px',
  },
  policyButton: {
    backgroundColor: '#3b82f6',
    color: '#fff',
    padding: '10px 15px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginBottom:"10px",
    '&:hover': {
      backgroundColor: '#2563eb',
    },
  },
  policyContent: {
    border: '1px solid #ddd',
    padding: '15px',
    borderRadius: '8px',
    backgroundColor:"#f3f4f6"
  },
};
