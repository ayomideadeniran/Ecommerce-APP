import { Link } from 'react-router-dom';

function SuccessPage() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>✅ Payment Successful!</h1>
      <p style={styles.message}>Thank you for your purchase.</p>
      <p style={styles.message}>Your order is being processed. You will receive a confirmation email with the order details shortly.</p>
      <Link to="/" style={styles.link}>Back to Shop</Link>
    </div>
  );
}

const styles = {
  container: {
    padding: '24px',
    maxWidth: '600px',
    margin: '0 auto',
    textAlign: 'center',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    fontFamily: "'Poppins', sans-serif",
  },
  title: {
    color: '#22c55e', // Green color for success
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '16px',
  },
  message: {
    fontSize: '18px',
    color: '#333',
    marginBottom: '12px',
  },
  link: {
    display: 'inline-block',
    marginTop: '20px',
    color: '#3b82f6', // Blue link color
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '16px',
    transition: 'color 0.3s ease',
    '&:hover': {
      color: '#2563eb',
    },
  },
};

export default SuccessPage;
