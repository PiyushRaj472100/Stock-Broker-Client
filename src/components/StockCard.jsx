export default function StockCard({ stock, price, onDelete }) {
  return (
    <div style={styles.card}>
      <h3 style={styles.stockName}>{stock}</h3>
      <p style={styles.price}>${price}</p>

      <button style={styles.deleteBtn} onClick={onDelete}>
        Unsubscribe
      </button>
    </div>
  );
}

const styles = {
  card: {
    padding: "25px",
    borderRadius: "16px",
    backgroundColor: "#fff",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    transition: "0.3s",
    textAlign: "center",
    animation: "fadeIn 0.4s ease-in-out",
  },

  stockName: {
    fontSize: "22px",
    fontWeight: "600",
    marginBottom: "10px",
  },

  price: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#2d47a5",
    marginBottom: "15px",
  },

  deleteBtn: {
    padding: "8px 14px",
    backgroundColor: "#e53935",
    borderRadius: "8px",
    border: "none",
    color: "white",
    cursor: "pointer",
  },
};
