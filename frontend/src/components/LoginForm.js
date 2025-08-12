// src/components/HomePage.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api";

export default function LoginForm() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  const data = await loginUser(form);

  if (data.access && data.refresh) {
    // Save both tokens and username
    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);
    localStorage.setItem("username", form.username);

    alert("Login successful!");
    navigate(`/welcome/${form.username}`);
  } else {
    setError(data.detail || "Login failed!");
  }
};

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Chitra Eye Care</h1>
      <p style={styles.subtitle}>Login</p>
      <form style={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          style={styles.input}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          style={styles.input}
          onChange={handleChange}
          required
        />
        <button type="submit" style={styles.button}>Login</button>
        <p style={styles.signup}>
          Don’t have an account?{" "}
          <a href="/SignupForm" style={styles.link}>Sign up</a>
        </p>
        {error && <p style={styles.error}>{error}</p>}
      </form>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "3rem",
    backgroundColor: "#f9f9f9",
    height: "100vh",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "0.5rem",
    color: "#222",
  },
  subtitle: {
    fontSize: "1.2rem",
    marginBottom: "2rem",
    color: "#555",
  },
  form: {
    display: "inline-block",
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  input: {
    display: "block",
    width: "250px",
    marginBottom: "1rem",
    padding: "0.7rem",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "6px",
  },
  button: {
    width: "100%",
    padding: "0.7rem",
    fontSize: "1rem",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  signup: {
    marginTop: "1rem",
    fontSize: "0.9rem",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
  },
  error: {
    color: "red",
    marginTop: "1rem",
  },
};
