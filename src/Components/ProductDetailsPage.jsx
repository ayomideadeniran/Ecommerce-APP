import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import products from '/products';

function ProductDetailsPage({ addToCart, cart }) {
  const { id } = useParams();
  const product = products.find((p) => p.id.toString() === id);
    const [addedProducts, setAddedProducts] = useState(new Set());

      // Function to handle adding a product to the cart
  const handleAddToCart = (product) => {
    if (!addedProducts.has(product.id)) {
      addToCart(product); // Add the product to the cart
      setAddedProducts((prevSet) => new Set(prevSet).add(product.id)); // Mark as added
    }
  };
  if (!product) {
    return <p style={styles.notFound}>Product not found.</p>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.productHeader}>
        <h1 style={styles.productName}>{product.name}</h1>
        <div style={styles.priceAndDiscount}>
            {/* Discount Tag */}
            {product.discount > 0 && (
                <span style={styles.discountTag}>-{product.discount}%</span>
            )}
          <span style={styles.price}>
            ${product.discount > 0
                ? (product.price * ((100 - product.discount) / 100)).toFixed(2)
                : product.price.toFixed(2)}
          </span>
            {product.discount > 0 && (
                <span style={styles.originalPrice}> ${product.price.toFixed(2)}</span>
            )}
        </div>
      </div>
      <div style={styles.productImageContainer}>
        <img src={product.image} alt={product.name} style={styles.productImage} />
      </div>

      <div style={styles.productInfo}>
        <p style={styles.description}>{product.description}</p>
        <p style={styles.date}>Date Added: {product.date}</p>
      </div>

      <div style={styles.specificationsSection}>
        <h2 style={styles.sectionTitle}>Specifications</h2>
        <ul style={styles.specificationsList}>
          {Object.entries(product.specifications).map(([key, value]) => (
            <li key={key} style={styles.specificationItem}>
              <span style={styles.specificationKey}>{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
              <span style={styles.specificationValue}>{Array.isArray(value) ? value.join(', ') : value}</span>
            </li>
          ))}
        </ul>
      </div>

      <div style={styles.installmentsSection}>
        <h2 style={styles.sectionTitle}>Installments</h2>
        <ul style={styles.installmentsList}>
          {product.installments.map((installment) => (
            <li key={installment.months} style={styles.installmentItem}>
              <span style={styles.installmentMonths}>{installment.months} Months:</span>
              <span style={styles.installmentAmount}>${installment.monthlyPayment.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
            {/* Stock Status */}
            <div
            style={{
                ...styles.stockStatus,
                color: product.stock > 0 ? "#16a34a" : "#dc2626",
            }}
            >
            {product.stock > 0 ? (product.stock > 10 ? "In Stock" : "Low Stock") : "Out of Stock"}
            </div>
            <button
                    onClick={() => handleAddToCart(product)}
                    style={{
                        ...styles.addToCartButton,
                        ...(addedProducts.has(product.id) || product.stock === 0 && {
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

      <Link to="/" style={styles.backLink}>Back to Shop</Link>
    </div>
  );
}

const styles = {
  container: {
    padding: '24px',
    maxWidth: '1000px',
    margin: '0 auto',
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    fontFamily: "'Poppins', sans-serif",
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  productHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  productName: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#333',
    flexGrow: 1,
    marginRight: '20px',
  },
    priceAndDiscount: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    price: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#22c55e',
    },
    discountTag: {
        backgroundColor: '#ef4444',
        color: '#fff',
        padding: '4px 8px',
        borderRadius: '8px',
        fontSize: '12px',
        fontWeight: 'bold',
    },
    originalPrice: {
        textDecoration: 'line-through',
        color: '#6b7280',
    },
  productImageContainer: {
    marginBottom: '20px',
  },
  productImage: {
    width: '100%',
    maxHeight: '400px',
    objectFit: 'cover',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  productInfo: {
    marginBottom: '24px',
  },
  description: {
    fontSize: '16px',
    color: '#555',
    lineHeight: '1.6',
    marginBottom: '12px',
    textAlign:"start",
  },
  date: {
    fontSize: '14px',
    color: '#777',
    textAlign:"start",
  },
  specificationsSection: {
    marginBottom: '24px',
    textAlign:"start"
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '16px',
    textAlign: "start",
  },
  specificationsList: {
    listStyle: 'none',
    padding: '0',
  },
  specificationItem: {
    fontSize: '16px',
    marginBottom: '8px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  specificationKey: {
    fontWeight: 'bold',
    color: '#444',
  },
  specificationValue: {
    color: '#555',
  },
  installmentsSection: {
    marginBottom: '24px',
    textAlign: "start"
  },
  installmentsList: {
    listStyle: 'none',
    padding: '0',
  },
  installmentItem: {
    fontSize: '16px',
    marginBottom: '8px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  installmentMonths: {
    fontWeight: 'bold',
    color: '#444',
  },
  installmentAmount: {
    color: '#555',
  },
  backLink: {
    display: 'block',
    marginTop: '20px',
    color: '#3b82f6',
    textDecoration: 'none',
    fontWeight: 'bold',
    transition: 'color 0.3s ease',
    '&:hover': {
      color: '#2563eb',
    },
  },
    notFound: {
        fontSize: '18px',
        color: '#6b7280',
        margin: '16px 0',
    },
    stockStatus: {
        fontSize: "14px",
        marginBottom: "8px",
    },
    addToCartButton: {
        backgroundColor: "#22c55e",
        color: "white",
        padding: "8px 12px",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
        marginBottom:"10px",
        "&:hover": {
            backgroundColor: "#16a34a",
        },
    },
};

export default ProductDetailsPage;
