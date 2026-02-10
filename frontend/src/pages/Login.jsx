import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../services/api";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/login`,
        { email, password },
        { withCredentials: true }
      );

      localStorage.setItem("token", response.data.token);

      alert("Login successful!");
      window.location.href = "/dashboard";

    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }

    setLoading(false);
  };

  return (
    <div className="login-wrapper">

      {/* background circles */}
      <div className="circle circle1"></div>
      <div className="circle circle2"></div>

      <div className="login-card">

        <h1 className="logo">Ayuroot</h1>

        <p className="subtitle">
          Welcome back! Please login to continue
        </p>

        <form onSubmit={handleLogin} className="login-form">

          <div className="input-group">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email Address</label>
          </div>

          <div className="input-group">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
          </div>

          <button className="login-button">
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="footer-text">
          Don't have an account?
          <a href="/signup"> Sign up</a>
        </p>

      </div>

    </div>
  );
}

export default Login;