// src/components/ExistingPatient.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ExistingPatienPage = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check login status
    const token = localStorage.getItem("access");
    const user = localStorage.getItem("username");

    if (!token || !user) {
      alert("You must be logged in to access this page.");
      navigate("/LoginForm");
    } else {
      setUsername(user);
    }
  }, [navigate]);

  const handleSearchRedirect = () => {
    navigate("/search-patient");
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1 style={{ color: "#2E86C1" }}>CHITRA EYE CARE</h1>
      <h3>Welcome, <span style={{ fontWeight: "bold", textTransform: "uppercase" }}>{username}</span></h3>

      <p>This is the Existing Patient Page.</p>

      <button onClick={handleSearchRedirect} style={{ padding: "10px 20px", marginTop: "20px" }}>
        Search Patient History
      </button>
    </div>
  );
};
const styles = {
  container: {
    height: "100vh",
    backgroundColor: "#f6f8fa",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    fontSize: "2rem",
    color: "#2c3e50",
    marginBottom: "1rem",
  },
  message: {
    fontSize: "1rem",
    color: "#555",
  },
};

export default ExistingPatienPage;
