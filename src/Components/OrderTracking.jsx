import { useState, useEffect } from "react";

export default function OrderTracking() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(JSON.parse(localStorage.getItem("orders")) || []);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Track Your Order</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map(order => (
          <div key={order.id} style={{ border: "1px solid #ddd", padding: "10px", margin: "10px 0" }}>
            <p>Order ID: {order.id}</p>
            <p>Customer: {order.customer}</p>
            <p>Status: <strong>{order.status}</strong></p>
          </div>
        ))
      )}
    </div>
  );
}
