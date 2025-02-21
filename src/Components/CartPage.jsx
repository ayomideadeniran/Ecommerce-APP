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

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto', textAlign: 'center', backgroundColor: '#f8f9fa' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#333' }}>Shopping Cart</h1>
      <Link to="/" style={{ display: 'block', marginBottom: '16px', color: '#3b82f6', textDecoration: 'none', fontWeight: 'bold' }}>Back to Shop</Link>


      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ddd', padding: '10px 15px', backgroundColor: 'white', borderRadius: '8px', marginBottom: '8px', boxShadow: '2px 2px 10px rgba(0,0,0,0.1)' }}>
              <input
                type="checkbox"
                checked={selectedItems.includes(item)}
                onChange={() => toggleSelection(item)}
              />
              <img src={item.image} alt={item.name} style={{ width: '60px', height: '60px', borderRadius: '8px' }} />
              <span style={{ flex: 1, textAlign: 'left', marginLeft: '10px', fontWeight: 'bold', color: '#222' }}>{item.name} - ${item.price * item.quantity}</span>
              <div>
                <button onClick={() => updateQuantity(item, -1)} style={{ marginRight: '8px', padding: '6px', cursor: 'pointer', borderRadius: '4px', backgroundColor: '#f44336', color: 'white', border: 'none' }}>-</button>
                {item.quantity}
                <button onClick={() => updateQuantity(item, 1)} style={{ marginLeft: '8px', padding: '6px', cursor: 'pointer', borderRadius: '4px', backgroundColor: '#4caf50', color: 'white', border: 'none' }}>+</button>
              </div>
              <button onClick={() => removeFromCart(item.id)} style={{ backgroundColor: '#f44336', marginLeft: '10px', color: 'white', padding: '6px 12px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>Remove</button>
            </div>
          ))}
          <button onClick={handleProceedToCheckout} style={{ marginTop: '16px', padding: '12px 24px', backgroundColor: '#3b82f6', color: 'white', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '16px' }}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default CartPage;










