import { useState, useEffect } from "react";

export default function OrderTracking() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
      setOrders(storedOrders);
      setLoading(false);
    } catch (err) {
      setError("Error loading orders.");
      setLoading(false);
    }
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Track Your Order</h2>

      {loading && <div style={styles.loading}>Loading orders...</div>}
      {error && <div style={styles.error}>{error}</div>}

      {!loading && !error && orders.length === 0 && (
        <div style={styles.noOrders}>No orders found.</div>
      )}

      {!loading && !error && orders.length > 0 && (
        <div style={styles.ordersContainer}>
          {orders.map((order) => (
            <div key={order.id} style={styles.orderCard}>
              <p style={styles.orderInfo}>
                <span style={styles.infoLabel}>Order ID:</span> {order.id}
              </p>
              <p style={styles.orderInfo}>
                <span style={styles.infoLabel}>Customer:</span> {order.customer}
              </p>
              <p style={styles.orderInfo}>
                <span style={styles.infoLabel}>Status:</span>{" "}
                <strong style={{ ...styles.status, backgroundColor: order.status === "Pending" ? "#fde68a" : order.status === "Processing" ? "#bae6fd" : order.status === "Completed" ? "#bbf7d0" : "#fecaca" }}>
                  {order.status}
                </strong>
              </p>
                <p style={styles.orderInfo}>
                    <span style={styles.infoLabel}>Phone:</span> {order.phone}
                </p>
                <p style={styles.orderInfo}>
                    <span style={styles.infoLabel}>Delivery Location:</span> {order.deliveryLocation}
                </p>
                <p style={styles.orderInfo}>
                    <span style={styles.infoLabel}>Additional Instructions:</span> {order.instructions}
                </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "24px",
    maxWidth: "800px",
    margin: "0 auto",
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: "#f8f9fa",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "24px",
    textAlign: "center",
  },
  loading: {
    textAlign: "center",
    marginTop: "20px",
    color: "#555",
  },
  error: {
    color: "#ef4444",
    marginTop: "20px",
    textAlign: "center",
  },
  noOrders: {
    fontSize: "18px",
    color: "#6b7280",
    textAlign: "center",
    marginTop: "20px",
  },
  ordersContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    marginTop: "24px",
  },
  orderCard: {
    border: "none",
    padding: "16px",
    borderRadius: "12px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  orderInfo: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "8px",
    textAlign:"start"
  },
  infoLabel: {
    fontWeight: "600",
    color: "#333",
    marginRight: "8px",
  },
  status: {
    padding: "4px 8px",
    borderRadius: "8px",
    color: "#333",
  },
};
