// Footer.jsx
import React from "react";
import "./Footer.css";
import { Leaf } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* LEFT SECTION */}
        <div className="footer-section brand">
          <div className="footer-logo">
            <Leaf size={28} className="footer-leaf" />
            <h2>Ayuroot</h2>
          </div>

          <p>
            Bridging ancient healing wisdom with modern technology for
            accessible healthcare.
          </p>
        </div>


        {/* PLATFORM */}
        <div className="footer-section">
          <h3>Platform</h3>
          <ul>
            <li>Features</li>
            <li>AI Chatbot</li>
            <li>Knowledge Base</li>
          </ul>
        </div>


        {/* COMPANY */}
        <div className="footer-section">
          <h3>Company</h3>
          <ul>
            <li>About Us</li>
            <li>Contact</li>
            <li>Privacy Policy</li>
          </ul>
        </div>


        {/* CONTACT */}
        <div className="footer-section">
          <h3>Contact Info</h3>
          <ul>
            <li>Email: support@ayuroot.com</li>
            <li>Phone: +1 (555) 123-4567</li>
            <li>Address: San Francisco, CA</li>
          </ul>
        </div>

      </div>


      {/* BOTTOM */}
      <div className="footer-bottom">
        © 2026 Ayuroot. All rights reserved. For educational and prototyping purposes only.
      </div>

    </footer>
  );
}


