import React from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function WelcomePage() {
  const { username } = useParams();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/LoginForm");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>CHITRA EYE CARE</h1>
      <hr style={styles.divider} />

      <div style={styles.topRight}>
        <p style={styles.username}>{username?.toUpperCase()}</p>
        <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
      </div>

      <div style={styles.buttonSection}>
        <button style={styles.navButton} onClick={() => navigate("/new-patient")}>
          New Patient
        </button>
        <button style={styles.navButton} onClick={() => navigate("/existing-patient")}>
          Existing Patient
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    padding: "2rem",
    position: "relative",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    textAlign: "center",
    fontSize: "3rem",
    fontWeight: "bold",
    color: "#2c3e50",
    textShadow: "2px 2px 8px rgba(0,0,0,0.2)",
    marginBottom: "1rem",
  },
  divider: {
    border: "none",
    height: "4px",
    backgroundColor: "#2c3e50",
    width: "100%",
    marginBottom: "2rem",
  },
  topRight: {
    position: "absolute",
    top: "20px",
    right: "20px",
    textAlign: "right",
  },
  username: {
    fontWeight: "bold",
    fontSize: "1.2rem",
    marginBottom: "0.5rem",
    color: "#34495e",
  },
  logoutButton: {
    backgroundColor: "#ff4d4d",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "0.5rem 1rem",
    cursor: "pointer",
    fontSize: "1rem",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
  },
  buttonSection: {
    display: "flex",
    justifyContent: "center",
    gap: "2rem",
    marginTop: "4rem",
  },
  navButton: {
    padding: "1rem 2rem",
    fontSize: "1.2rem",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#3498db",
    color: "#fff",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    transition: "background-color 0.3s ease",
  },
};
