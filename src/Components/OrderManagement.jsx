import { useState, useEffect } from "react";

function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("all"); // Track selected status

  useEffect(() => {
    // Simulate fetching data from local storage (replace with API call in real app)
    try {
      const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
      setOrders(storedOrders);
      setLoading(false);
    } catch (err) {
      setError("Error loading orders.");
      setLoading(false);
    }
  }, []);

  const handleOrderStatusChange = (orderId, newStatus) => {
    const updatedOrders = orders.map((order) => {
      if (order.id === orderId) {
        return { ...order, status: newStatus };
      }
      return order;
    });

    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  // Filter orders by selected status
  const filteredOrders =
    selectedStatus === "all"
      ? orders
      : orders.filter((order) => order.status === selectedStatus);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Order Management</h1>

      {/* Status Filter */}
      <div style={styles.filterContainer}>
        <label htmlFor="statusFilter" style={styles.filterLabel}>
          Filter by Status:
        </label>
        <select
          id="statusFilter"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          style={styles.filterSelect}
        >
          <option value="all">All</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {loading && <div style={styles.loading}>Loading orders...</div>}
      {error && <div style={styles.error}>{error}</div>}

      {!loading && !error && filteredOrders.length === 0 && (
        <div style={styles.noOrders}>No orders found.</div>
      )}

      {!loading && !error && filteredOrders.length > 0 && (
        <table style={styles.table}>
          <thead style={styles.thead}>
            <tr>
              <th style={styles.th}>Order ID</th>
              <th style={styles.th}>Customer</th>
              <th style={styles.th}>Phone</th>
              <th style={styles.th}>Delivery Location</th>
              <th style={styles.th}>Instructions</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody style={styles.tbody}>
            {filteredOrders.map((order) => (
              <tr key={order.id} style={styles.tr}>
                <td style={styles.td}>{order.id}</td>
                <td style={styles.td}>{order.customer}</td>
                <td style={styles.td}>{order.phone}</td>
                <td style={styles.td}>{order.deliveryLocation}</td>
                <td style={styles.td}>{order.instructions}</td>
                <td style={styles.td}>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleOrderStatusChange(order.id, e.target.value)
                    }
                    style={{
                      ...styles.select,
                      backgroundColor:
                        order.status === "Pending"
                          ? "#fde68a"
                          : order.status === "Processing"
                          ? "#bae6fd"
                          : order.status === "Completed"
                          ? "#bbf7d0"
                          : "#fecaca",
                    }}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td style={styles.td}>
                  <button
                    onClick={() =>
                      handleOrderStatusChange(order.id, "Cancelled")
                    }
                    style={styles.cancelButton}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "24px",
    maxWidth: "1200px",
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
  filterContainer: {
    marginBottom: "24px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  filterLabel: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#555",
  },
  filterSelect: {
    padding: "8px 12px",
    fontSize: "14px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    cursor: "pointer",
    outline: "none",
    transition: "border-color 0.3s ease",
    "&:focus": {
      borderColor: "#22c55e",
    },
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
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  thead: {
    backgroundColor: "#22c55e",
    color: "#fff",
  },
  tbody: {
    backgroundColor: "#fff",
  },
  th: {
    padding: "12px 15px",
    textAlign: "left",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  tr: {
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: "#f0fdf4", // Light green on hover
    },
  },
  td: {
    padding: "12px 15px",
    borderBottom: "1px solid #ddd",
  },
  select: {
    padding: "8px 12px",
    fontSize: "14px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    cursor: "pointer",
    outline: "none",
    transition: "background-color 0.3s ease",
  },
  cancelButton: {
    backgroundColor: "#ef4444",
    color: "#fff",
    padding: "8px 12px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: "#dc2626",
    },
  },
};

export default OrderManagement;
