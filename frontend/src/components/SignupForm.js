// src/components/SignupForm.js

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api"; // Ensure this exists

export default function SignupForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    username: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
    captchaAnswer: "",
  });

  const [error, setError] = useState("");
  const [captcha, setCaptcha] = useState(generateCaptcha());

  function generateCaptcha() {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    return { question: `${a} + ${b}`, answer: (a + b).toString() };
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!form.first_name || !form.last_name || !form.password || !form.confirmPassword || !form.username) {
      setError("Please fill all required fields.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (form.captchaAnswer !== captcha.answer) {
      setError("Captcha is incorrect.");
      setCaptcha(generateCaptcha());
      return;
    }

    const data = await registerUser({
        first_name: form.first_name,
        last_name: form.last_name,
        username: form.username,
        email: form.email,
        password: form.password,
        middle_name: form.middle_name,
        mobile: form.mobile
   
});


    if (data.success)  {
      alert("Registration successful!");
      navigate("/LoginForm");
    } else {
      setError(data.detail || "Registration failed.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Sign Up</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="first_name"
          placeholder="First Name *"
          style={styles.input}
          value={form.first_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="middle_name"
          placeholder="Middle Name"
          style={styles.input}
          value={form.middle_name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name *"
          style={styles.input}
          value={form.last_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="username"
          placeholder="username *"
          style={styles.input}
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="mobile"
          placeholder="Mobile Number"
          style={styles.input}
          value={form.mobile}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          style={styles.input}
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          style={styles.input}
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Re-enter Password"
          style={styles.input}
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />

        {/* Captcha */}
        <label style={styles.captchaLabel}>
          Are you human? What is {captcha.question}
        </label>
        <input
          type="text"
          name="captchaAnswer"
          placeholder="Enter answer"
          style={styles.input}
          value={form.captchaAnswer}
          onChange={handleChange}
          required
        />

        {error && <p style={styles.error}>{error}</p>}

        <div style={styles.buttonRow}>
          <button type="submit" style={styles.button}>
            Sign Up
          </button>
          <Link to="/LoginForm" style={styles.loginLink}>
            Already have an account? Login
          </Link>
        </div>
      </form>
    </div>
  );
}

const styles = {
  container: {
    padding: "2rem",
    maxWidth: "500px",
    margin: "auto",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "1.5rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "0.75rem",
    marginBottom: "1rem",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "6px",
  },
  captchaLabel: {
    marginBottom: "0.5rem",
    fontWeight: "bold",
  },
  buttonRow: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
  },
  button: {
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "0.75rem 2rem",
    border: "none",
    borderRadius: "6px",
    fontSize: "1rem",
    cursor: "pointer",
    width: "100%",
  },
  loginLink: {
    color: "#007bff",
    textDecoration: "none",
    fontSize: "0.95rem",
  },
  error: {
    color: "red",
    fontSize: "0.9rem",
    marginBottom: "1rem",
  },
};
