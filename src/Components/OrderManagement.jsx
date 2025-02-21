import { useState, useEffect } from "react";

export default function OrderManagement() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    console.log("Loaded Orders from LocalStorage:", storedOrders);
    setOrders(storedOrders);
  }, []);

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(order => {
      console.log(`Updating Order ID ${order.id}:`, order);
      return order.id === orderId ? { ...order, status: newStatus } : order;
    });

    console.log("Updated Orders:", updatedOrders);
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Order Management</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map(order => {
          console.log("Rendering Order:", order);
          return (
            <div key={order.id} style={{ border: "1px solid #ddd", padding: "10px", margin: "10px 0" }}>
              <p>Order ID: {order.id}</p>
              <p>Customer: {order.customer}</p>
              <p>Status: <strong>{order.status}</strong></p>
              <button onClick={() => updateOrderStatus(order.id, "Processing")}>Processing</button>
              <button onClick={() => updateOrderStatus(order.id, "Shipped")}>Shipped</button>
              <button onClick={() => updateOrderStatus(order.id, "Delivered")}>Delivered</button>
            </div>
          );
        })
      )}
    </div>
  );
}
