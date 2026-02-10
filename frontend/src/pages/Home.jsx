import React from "react";
import {Link} from "react-router-dom";

import "./Home.css";
import { Leaf } from "lucide-react";
import shubh from '../images/shubh.png';
import harsh from '../images/harsh.png';
import shivansh from '../images/shivansh.png';
import supriya from '../images/supriya.png';
import sourish from '../images/sourish.png';
import ananya from "../images/ananya.png"
import Footer from "../components/Footer";

export default function Home() {

  const features = [
    {
      title: "AI Medical Chatbot",
      desc: "Get instant answers to your health questions powered by AI trained on Ayurvedic principles.",
      icon: "🤖"
    },
    {
      title: "Traditional Remedy Knowledge Base",
      desc: "Access a comprehensive library of time-tested natural remedies and herbal treatments.",
      icon: "📖"
    },
    {
      title: "Personalized Health Guidance",
      desc: "Receive tailored recommendations based on your unique constitution and health goals.",
      icon: "✨"
    },
    {
      title: "Secure User Accounts",
      desc: "Your health data is protected with enterprise-grade security and encryption.",
      icon: "🛡️"
    },
    {
      title: "Modern AI + Ancient Wisdom",
      desc: "Combining 5000 years of Ayurvedic knowledge with modern machine learning.",
      icon: "🧠"
    },
    {
      title: "Natural & Holistic Healing",
      desc: "Focus on natural healing methods that treat the root cause, not just symptoms.",
      icon: "🌿"
    }
  ];


  const team = [
    {
      name: "Shubh Gupta",
      role: "Full Stack Developer",
      image: shubh
    },
    {
      name: "Shivansh Sharma",
      role: "AI Engineer",
      image: shivansh
    },
    {
      name: "Supriya Suman",
      role: "Presenter",
      image: supriya
    },
    {
      name: "Ananya ",
      role: "Frontend Developer",
      image: ananya
    },
    {
      name: "Sourish Shaw",
      role: "UI/UX Designer",
      image: sourish
    },
    {
      name: "Harsh Singh",
      role: "Project Manager",
      image: harsh
    }
  ];


  return (
    <div className="home">

      {/* NAVBAR */}
      <nav className="navbar">

        <div className="logo-section">
          <Leaf className="logo-icon" size={32} />
          <h1 className="logo-text">Ayuroot</h1>
        </div>

        <div className="nav-buttons">

          <Link to="/login">
            <button className="btn-outline">
              Login
            </button>
          </Link>

          <Link to="/signup">
            <button className="btn-primary">
              Get Started
            </button>
          </Link>

        </div>

      </nav>



      {/* HERO */}
      <section className="hero">

        <div className="hero-badge">
          ✨ Ancient Wisdom Meets Modern AI
        </div>

        <h1>
          Connecting Grassroots Healing <br />
          with Modern AI Technology
        </h1>

        <p>
          Discover the power of traditional Ayurvedic medicine enhanced by artificial intelligence.
          Get personalized health guidance that bridges centuries of natural healing wisdom with cutting-edge technology.
        </p>


        <div className="hero-buttons">

          <Link to="/signup">
            <button className="btn-primary big">
              Get Started Free
            </button>
          </Link>

          <Link to="/login">
            <button className="btn-outline big">
              Sign In
            </button>
          </Link>

        </div>

      </section>



      {/* ABOUT */}
      <section className="about">

        <h2>About Ayuroot</h2>

        <p>
          Ayuroot is a revolutionary medical platform that preserves and modernizes traditional healing knowledge.
          We believe that ancient Ayurvedic wisdom, when combined with modern AI technology,
          can provide accessible, personalized, and holistic healthcare solutions for everyone.
        </p>

        <p>
          Our mission is to democratize access to traditional medicine knowledge while ensuring it's validated,
          safe, and tailored to individual needs through intelligent technology.
        </p>

      </section>



      {/* FEATURES */}
      <section className="features">

        <h2>Powerful Features</h2>

        <p className="section-subtitle">
          Everything you need for holistic health guidance
        </p>


        <div className="features-grid">

          {features.map((feature, index) => (

            <div className="feature-card" key={index}>

              <div className="icon">
                {feature.icon}
              </div>

              <h3>
                {feature.title}
              </h3>

              <p>
                {feature.desc}
              </p>

            </div>

          ))}

        </div>

      </section>



      {/* TEAM */}
      <section className="team">

        <h2>Meet Our Team</h2>

        <div className="team-grid">

          {team.map((member, index) => (

            <div className="team-card" key={index}>

              <img src={member.image} alt="team" />

              <h3>
                {member.name}
              </h3>

              <p>
                {member.role}
              </p>

            </div>

          ))}

        </div>

      </section>



      {/* FOOTER */}
      <Footer/>

    </div>
  );
}