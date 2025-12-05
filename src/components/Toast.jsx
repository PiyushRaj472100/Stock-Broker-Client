export default function Toast({ message }) {
  return (
    <div style={styles.toast}>
      {message}
    </div>
  );
}

const styles = {
  toast: {
    position: "fixed",
    bottom: "25px",
    right: "25px",
    background: "#333",
    color: "white",
    padding: "14px 20px",
    borderRadius: "8px",
    boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
    fontSize: "16px",
    zIndex: 9999,
    animation: "fadeInOut 1.5s ease",
  },
};
