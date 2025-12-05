import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const { setUser, setSubscribedStocks } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email) return alert("Please enter an email.");

    const stored = localStorage.getItem(email);
    const userData = stored ? JSON.parse(stored) : { subscribedStocks: [] };

    setUser({ email });
    setSubscribedStocks(userData.subscribedStocks);

    localStorage.setItem("loggedInUser", JSON.stringify({ email }));

    navigate("/dashboard");
  };

  return (
    <div style={styles.page}>

      {/* Floating circles */}
      <div style={styles.circle1}></div>
      <div style={styles.circle2}></div>

      <div style={styles.card}>
        <h2 style={styles.title}>Stock Broker Login</h2>

        <input
          type="email"
          placeholder="Enter your email"
          style={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button style={styles.button} onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------ */
/*              BEAUTIFUL UI            */
/* ------------------------------------ */

const styles = {
  page: {
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #4a90e2, #6a5acd)",
    overflow: "hidden",
    position: "relative",
  },

  /* Floating glowing circles */
  circle1: {
    position: "absolute",
    width: "300px",
    height: "300px",
    background: "rgba(255,255,255,0.15)",
    borderRadius: "50%",
    top: "10%",
    left: "15%",
    filter: "blur(70px)",
    animation: "float 6s infinite ease-in-out",
  },

  circle2: {
    position: "absolute",
    width: "250px",
    height: "250px",
    background: "rgba(255,255,255,0.1)",
    borderRadius: "50%",
    bottom: "10%",
    right: "15%",
    filter: "blur(60px)",
    animation: "float 7s infinite ease-in-out",
  },

  card: {
    width: "380px",
    padding: "40px",
    borderRadius: "20px",
    background: "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
    textAlign: "center",
    zIndex: 10,
  },

  title: {
    marginBottom: "25px",
    fontSize: "24px",
    fontWeight: "700",
    color: "white",
  },

  input: {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    outline: "none",
    fontSize: "16px",
    marginBottom: "20px",
    background: "rgba(255, 255, 255, 0.9)",
    boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
    transition: "0.3s",
  },

  button: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#3949ab",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontSize: "17px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.3s",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
  },
};

/* Add floating animation */
document.head.insertAdjacentHTML(
  "beforeend",
  `
<style>
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-30px); }
  100% { transform: translateY(0px); }
}
</style>
`
);
