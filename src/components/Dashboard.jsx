import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { supportedStocks } from "../data/supportedStocks";
import StockCard from "./StockCard";
import { getRandomPrice } from "../utils/randomPrice";
import Toast from "./Toast";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user, subscribedStocks, setSubscribedStocks, logout } =
    useContext(UserContext);

  const [prices, setPrices] = useState({});
  const [search, setSearch] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  if (!user)
    return (
      <h2 style={{ textAlign: "center", marginTop: 50 }}>
        Please login first
      </h2>
    );

  // Load stored data
  useEffect(() => {
    const stored = localStorage.getItem(user.email);
    if (stored) {
      const parsed = JSON.parse(stored);
      setSubscribedStocks(parsed.subscribedStocks);
    }
  }, []);

  // Auto update prices
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices((prev) => {
        const updated = { ...prev };
        subscribedStocks.forEach((stock) => {
          updated[stock] = getRandomPrice();
        });
        return updated;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [subscribedStocks]);

  // Save changes
  useEffect(() => {
    localStorage.setItem(
      user.email,
      JSON.stringify({ subscribedStocks })
    );
  }, [subscribedStocks]);

  const subscribeStock = (stock) => {
    if (!subscribedStocks.includes(stock)) {
      setSubscribedStocks([...subscribedStocks, stock]);
    }
  };

  const removeStock = (stock) => {
    setSubscribedStocks(subscribedStocks.filter((s) => s !== stock));
  };

  const filteredStocks = supportedStocks.filter((stock) =>
    stock.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.wrapper}>

      {/* Sidebar */}
      <div
        style={{
          ...styles.sidebar,
          width: isSidebarOpen ? "260px" : "70px",
        }}
        onMouseEnter={() => setIsSidebarOpen(true)}
        onMouseLeave={() => setIsSidebarOpen(false)}
      >
        {/* Avatar */}
        {isSidebarOpen && (
          <img
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.email}`}
            alt="avatar"
            style={styles.avatar}
          />
        )}

        {/* Sidebar Title */}
        {isSidebarOpen && <h2 style={styles.sidebarTitle}>Dashboard</h2>}

        {/* User Email */}
        {isSidebarOpen && <p style={styles.userEmail}>{user.email}</p>}

        {/* Logout Button with Toast */}
        {isSidebarOpen && (
          <button
            style={styles.logoutBtn}
            onClick={() => {
              setShowToast(true);

              setTimeout(() => {
                logout();
                navigate("/");
              }, 1500);
            }}
          >
            Logout
          </button>
        )}
      </div>

      {/* MAIN CONTENT */}
      <div style={styles.mainContent}>
        
        {/* Search */}
        <input
          type="text"
          placeholder="Search stock..."
          style={styles.searchInput}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <h3 style={styles.subTitle}>Subscribe to a Stock</h3>

        <div style={styles.stockButtons}>
          {filteredStocks.map((stock) => (
            <button
              key={stock}
              style={styles.subscribeBtn}
              onClick={() => subscribeStock(stock)}
            >
              {stock}
            </button>
          ))}
        </div>

        <h3 style={styles.subTitle}>Subscribed Stocks</h3>

        <div style={styles.cardGrid}>
          {subscribedStocks.map((stock) => (
            <StockCard
              key={stock}
              stock={stock}
              price={prices[stock]}
              onDelete={() => removeStock(stock)}
            />
          ))}
        </div>
      </div>

      {/* Logout toast */}
      {showToast && (
        <Toast message="You have been logged out successfully" />
      )}
    </div>
  );
}

/* ---------------------- STYLES ---------------------- */

const styles = {
  wrapper: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f4f5fb",
  },

  /* Hover Expandable Sidebar */
  sidebar: {
    padding: "20px 15px",
    background: "#2d47a5",
    color: "white",
    minHeight: "100vh",
    boxShadow: "2px 0 12px rgba(0,0,0,0.1)",
    overflow: "hidden",
    transition: "0.3s ease",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  avatar: {
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    marginBottom: "15px",
    border: "3px solid white",
  },

  sidebarTitle: {
    fontSize: "24px",
    fontWeight: "700",
    marginBottom: "5px",
  },

  userEmail: {
    opacity: 0.9,
    marginBottom: "20px",
  },

  logoutBtn: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    backgroundColor: "#e53935",
    border: "none",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "10px",
  },

  mainContent: {
    flex: 1,
    padding: "40px",
  },

  searchInput: {
    padding: "12px",
    width: "300px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "20px",
  },

  subTitle: {
    fontSize: "22px",
    marginBottom: "10px",
  },

  stockButtons: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "30px",
  },

  subscribeBtn: {
    padding: "10px 16px",
    border: "1px solid #2d47a5",
    backgroundColor: "white",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
  },

  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "25px",
  },
};
