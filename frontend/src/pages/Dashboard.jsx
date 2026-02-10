import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Leaf, LogOut, User } from "lucide-react";

import shubh from "../images/shubh.png";
import harsh from "../images/harsh.png";
import shivansh from "../images/shivansh.png";
import supriya from "../images/supriya.png";
import sourish from "../images/sourish.png";
import ananya from "../images/ananya.png"
import Footer from "../components/Footer";

import "./Dashboard.css";

function Dashboard() {

  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("User");

  const [searchQuery, setSearchQuery] = useState("");

  // check login
  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }

    const email = localStorage.getItem("email");

    if (email) {
      setUserEmail(email);
    }

  }, [navigate]);


  // logout
  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/login");

  };


  // search redirect
  const handleSearch = () => {

    if (!searchQuery.trim()) return;

    navigate("/chat", {
      state: { query: searchQuery }
    });

  };


  // features
  const features = [

    {
      title: "AI Medical Chatbot",
      desc: "Get instant answers powered by AI trained on Ayurvedic principles.",
      link: "/chat"
    },

    {
      title: "Personalized Guidance",
      desc: "Tailored recommendations based on your health history.",
      link : "/guidance"
    },

    {
      title: "Medication Finder",
      desc: "Search for medications and get AI-powered suggestions.",
      link: "/medication"
    }

  ];


  // team
  const team = [

    {
      name: "Shubh Gupta",
      role: "Full Stack Developer",
      img: shubh
    },

    {
      name: "Shivansh Sharma",
      role: "AI Engineer",
      img: shivansh
    },

    {
      name: "Supriya Suman",
      role: "Presenter",
      img: supriya
    },

    {
      name: "Ananya",
      role: "Frontend Developer",
      img: ananya
    },

    {
      name: "Sourish Shaw",
      role: "UI/UX Designer",
      img: sourish
    },

    {
      name: "Harsh Singh",
      role: "Project Manager",
      img: harsh
    }

  ];


  // past records
  const pastRecords = [

    {
      date: "2026-01-20",
      diagnosis: "Cold & Flu",
      prescription: "Herbal Tea + Steam"
    },

    {
      date: "2026-02-01",
      diagnosis: "Migraine",
      prescription: "Ashwagandha & Meditation"
    },

    {
      date: "2026-02-08",
      diagnosis: "Fatigue",
      prescription: "Ayurvedic Tonics"
    }

  ];


  return (

    <div className="dashboard">


      {/* NAVBAR */}

      <nav className="navbar">

        <div className="logo-section">

          <Leaf className="logo-icon" size={32} />

          <h1 className="logo-text">
            Ayuroot
          </h1>

        </div>


        <div className="navbar-right">

          <div className="profile-section">

            <User size={18} />

            <span>
              {userEmail}
            </span>

          </div>


          <button
            className="logout-btn"
            onClick={handleLogout}
          >

            <LogOut size={18} />

            Logout

          </button>

        </div>

      </nav>



      {/* HERO SECTION */}

      <section className="hero-section">

        <div className="hero-content">

          <div className="hero-badge">

            ✨ Ancient Wisdom Meets Modern AI

          </div>


          <h1>

            Connecting Grassroots Healing
            <br />
            with Modern AI Technology

          </h1>


          <p>

            Describe your symptoms and get AI-powered Ayurvedic guidance instantly.

          </p>



          {/* SEARCH */}

          <div className="hero-search">

            <input

              type="text"

              placeholder="Enter your problem (example: headache, cold, fatigue)"

              value={searchQuery}

              onChange={(e) =>
                setSearchQuery(e.target.value)
              }

              onKeyDown={(e) =>
                e.key === "Enter" && handleSearch()
              }

            />


            <button
              onClick={handleSearch}
            >

              Search

            </button>

          </div>

        </div>


        <div className="scroll-down">

          ↓

        </div>

      </section>



      {/* FEATURES */}

      <section className="ai-model-section">

        <h2>
          Our AI Model
        </h2>


        <div className="features-grid">

          {features.map((feature, index) => (

            <div

              key={index}

              className={`feature-card ${
                feature.link ? "clickable" : ""
              }`}

              onClick={() =>
                feature.link && navigate(feature.link)
              }

            >

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



      {/* PAST RECORDS */}

      <section className="past-records-section">

        <h2>
          Past Records
        </h2>


        <table className="records-table">

          <thead>

            <tr>

              <th>Date</th>

              <th>Diagnosis</th>

              <th>Prescription</th>

            </tr>

          </thead>


          <tbody>

            {pastRecords.map((record, index) => (

              <tr key={index}>

                <td>
                  {record.date}
                </td>

                <td>
                  {record.diagnosis}
                </td>

                <td>
                  {record.prescription}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </section>



      {/* TEAM */}

      <section className="team-section">

        <h2 className="team-heading">

          Meet Our Team

        </h2>


        <div className="team-grid">

          {team.map((member, index) => (

            <div
              key={index}
              className="team-card"
            >

              <img
                src={member.img}
                alt={member.name}
              />

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

export default Dashboard;