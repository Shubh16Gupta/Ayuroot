import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../services/api";
import "./Signup.css";

function Signup() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async (e) => {

    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {

      const response = await axios.post(
        `${API_BASE_URL}/signup`,
        {
          name,
          email,
          password
        }
      );
      console.log(response.data);

      alert("Signup successful!");

      window.location.href = "/login";

    } catch (error) {

      console.log(error);
      alert("Signup failed");

    }

  };

  return (

    <div className="signup-wrapper">

      {/* background circles */}
      <div className="circle circle1"></div>
      <div className="circle circle2"></div>

      <div className="signup-card">

        <h1 className="logo">🌿 Ayuroot</h1>

        <p className="subtitle">
          Create your account and get personalized Ayurvedic guidance
        </p>

        <form onSubmit={handleSignup} className="signup-form">

          <div className="input-group">
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Full Name</label>
          </div>

          <div className="input-group">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email</label>
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

          <div className="input-group">
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <label>Confirm Password</label>
          </div>

          <button type="submit" className="signup-button">
            Create Account
          </button>

        </form>

        <p className="footer-text">
          Already have an account?
          <a href="/login"> Login</a>
        </p>

      </div>

    </div>

  );

}

export default Signup;