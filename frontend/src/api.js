import WelcomePage from "./components/WelcomePage";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const API_URL = "http://127.0.0.1:8000/api"; // Update if different

<Routes>
  <Route path="/welcome/:username" element={<WelcomePage />} />
</Routes>

export const signupUser = async (userData) => {
  const response = await fetch(`${API_URL}/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return response.json();
};

export async function loginUser(credentials) {
  try {
    const res = await fetch(`${API_URL}/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return { detail: errorData.detail || "Login failed!" };
    }

    return await res.json();
  } catch (error) {
    console.error("Login error:", error);
    return { detail: "Network error. Please try again." };
  }
}
// Example registerUser function
export async function registerUser(userData) {
  try {
    const res = await fetch(`${API_URL}/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    return await res.json();
  } catch (error) {
    return { detail: "Network error during registration." };
  }
}
