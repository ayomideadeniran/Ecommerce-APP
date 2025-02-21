import { useParams, Link } from 'react-router-dom';
import products from '/products';

function ProductDetailsPage() {
  const { id } = useParams(); 
  const product = products.find((p) => p.id.toString() === id);

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto', textAlign: 'center', backgroundColor: '#f8f9fa' }}>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', borderRadius: '8px' }} />
      <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{product.description}</p>
      <p><strong>Price:</strong> ${product.price}</p>
      <p><strong>Date Added:</strong> {product.date}</p>

      <h2>Specifications</h2>
      <ul style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
        {Object.entries(product.specifications).map(([key, value]) => (
          <li key={key} style={{ fontSize: '16px' }}>
            <strong>{key.replace(/([A-Z])/g, ' $1').trim()}:</strong> {Array.isArray(value) ? value.join(', ') : value}
          </li>
        ))}
      </ul>

      <Link to="/" style={{ display: 'block', marginTop: '20px', color: '#3b82f6', textDecoration: 'none', fontWeight: 'bold' }}>Back to Shop</Link>
    </div>
  );
}

export default ProductDetailsPage;
