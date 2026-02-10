import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignupPage from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ChatPage from "./pages/ChatPage";
import MedicinePage from "./pages/MedicinePage";
import LifestyleGuidance from "./pages/LifestyleGuidance";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/medication" element={<MedicinePage />} />
        <Route path="/guidance" element={<LifestyleGuidance />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;