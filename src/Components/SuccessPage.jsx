import { Link } from 'react-router-dom';

function SuccessPage() {
  return (
    <div style={{ padding: '24px', maxWidth: '600px', margin: '0 auto', textAlign: 'center', backgroundColor: '#f8f9fa' }}>
      <h1 style={{ color: 'green' }}>✅ Payment Successful!</h1>
      <p>Thank you for your purchase.</p>
      <Link to="/">Back to Shop</Link>
    </div>
  );
}

export default SuccessPage;

