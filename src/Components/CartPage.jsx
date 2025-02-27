import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function CartPage({ cart, updateQuantity, removeFromCart }) {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleSelection = (item) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(item)
        ? prevSelected.filter((i) => i.id !== item.id)
        : [...prevSelected, item]
    );
  };

  const handleProceedToCheckout = () => {
    if (selectedItems.length === 0) {
      alert("Please select at least one item to proceed.");
      return;
    }
    navigate('/checkout', { state: { cart: selectedItems } });
  };

  const calculateTotal = () => {
    return selectedItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    ).toFixed(2);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Shopping Cart</h1>
      <Link to="/" style={styles.backLink}>
        Back to Shop
      </Link>

      {cart.length === 0 ? (
        <p style={styles.emptyCart}>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} style={styles.itemContainer}>
              <input
                type="checkbox"
                checked={selectedItems.find((selectedItem) => selectedItem.id === item.id)}
                onChange={() => toggleSelection(item)}
                style={styles.checkbox}
              />
              <img src={item.image} alt={item.name} style={styles.itemImage} />
              <span style={styles.itemName}>
                {item.name} - ${(item.price * item.quantity).toFixed(2)}
              </span>
              <div style={styles.quantityControls}>
                <button onClick={() => updateQuantity(item, -1)} style={styles.quantityButton}>
                  -
                </button>
                {item.quantity}
                <button onClick={() => updateQuantity(item, 1)} style={styles.quantityButton}>
                  +
                </button>
              </div>
              <button onClick={() => removeFromCart(item.id)} style={styles.removeButton}>
                Remove
              </button>
            </div>
          ))}
          <div style={styles.totalContainer}>
            <p style={styles.totalText}>Total for selected item: <span style={{color:"#22c55e"}}>${calculateTotal()}</span></p>
          </div>
          <button onClick={handleProceedToCheckout} style={styles.checkoutButton}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '24px',
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center',
    backgroundColor: '#f8f9fa',
    fontFamily: "'Poppins', sans-serif",
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '16px',
  },
  backLink: {
    display: 'block',
    marginBottom: '16px',
    color: '#3b82f6',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  emptyCart: {
    fontSize: '18px',
    color: '#6b7280',
    marginTop: '24px',
  },
  itemContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #ddd',
    padding: '10px 15px',
    backgroundColor: 'white',
    borderRadius: '8px',
    marginBottom: '8px',
    boxShadow: '2px 2px 10px rgba(0,0,0,0.1)',
  },
  checkbox: {
    marginRight: '10px',
    cursor:"pointer"
  },
  itemImage: {
    width: '60px',
    height: '60px',
    borderRadius: '8px',
  },
  itemName: {
    flex: 1,
    textAlign: 'left',
    marginLeft: '10px',
    fontWeight: 'bold',
    color: '#222',
  },
  quantityControls: {
    display: 'flex',
    alignItems: 'center',
  },
  quantityButton: {
    margin: '0 8px',
    padding: '6px',
    cursor: 'pointer',
    borderRadius: '4px',
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
  },
  removeButton: {
    backgroundColor: '#f44336',
    marginLeft: '10px',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: "#dc2626",
    },
  },
  checkoutButton: {
    marginTop: '16px',
    padding: '12px 24px',
    backgroundColor: '#3b82f6',
    color: 'white',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
    "&:hover": {
      backgroundColor: '#2563eb',
    },
  },
    totalContainer: {
        margin: "10px 0",
    },
    totalText: {
        fontSize: "18px",
    }
};

export default CartPage;
