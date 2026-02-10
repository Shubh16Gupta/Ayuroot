import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { API_BASE_URL } from "../services/api";
import "./ChatPage.css";

function ChatPage() {

  const navigate = useNavigate();
  const location = useLocation();

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);
  const initialMessageSentRef = useRef(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // Auto-send initial message from dashboard search (only once)
  useEffect(() => {
    if (location.state?.query && !initialMessageSentRef.current) {
      initialMessageSentRef.current = true;
      const searchQuery = location.state.query;
      
      // Add user message to chat
      setChat([{
        sender: "user",
        text: searchQuery
      }]);
      
      // Start response generation immediately
      generateResponse(searchQuery);
    }
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const generateResponse = async (userMessage) => {
    setLoading(true);
    let botMessage = "";

    try {
      const response = await fetch(`${API_BASE_URL}/chat/stream`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          message: userMessage
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      // Add empty bot message placeholder
      setChat(prev => [
        ...prev,
        {
          sender: "bot",
          text: ""
        }
      ]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n\n");

        // Process all complete messages
        for (let i = 0; i < lines.length - 1; i++) {
          const line = lines[i].trim();
          if (line.startsWith("data: ")) {
            const dataStr = line.slice(6);
            try {
              const data = JSON.parse(dataStr);
              if (data.chunk) {
                botMessage += data.chunk;
                // Update the last bot message with the accumulated text
                setChat(prev => {
                  const newChat = [...prev];
                  newChat[newChat.length - 1].text = botMessage;
                  return newChat;
                });
              } else if (data.done) {
                // Stream completed
                break;
              } else if (data.error) {
                botMessage = data.error;
                setChat(prev => {
                  const newChat = [...prev];
                  newChat[newChat.length - 1].text = botMessage;
                  return newChat;
                });
                break;
              }
            } catch (e) {
              console.error("Error parsing SSE data:", e);
            }
          }
        }

        // Keep the last incomplete line in the buffer
        buffer = lines[lines.length - 1];
      }

      // Ensure final message is set
      setChat(prev => {
        const newChat = [...prev];
        if (newChat[newChat.length - 1].sender === "bot" && newChat[newChat.length - 1].text === "") {
          newChat[newChat.length - 1].text = botMessage || "No response received";
        }
        return newChat;
      });

    } catch (error) {
      console.error("Chat Error:", error);
      setChat(prev => [
        ...prev,
        {
          sender: "bot",
          text: "Server error. Please try again."
        }
      ]);
    }

    setLoading(false);
  };

  // Manual send message handler
  const sendMessage = () => {
    if (!message.trim()) return;

    const userMessage = message;
    setMessage("");

    // Add user message to chat
    setChat(prev => [
      ...prev,
      {
        sender: "user",
        text: userMessage
      }
    ]);

    // Generate response
    generateResponse(userMessage);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (

    <div className="chat-container">

      <div className="chat-header">

        <h2>Ayurvedic AI Chatbot</h2>

        <button
          className="back-btn"
          onClick={() => navigate("/dashboard")}
        >
          Back
        </button>

      </div>

      <div className="chat-box">

        {chat.length === 0 && (
          <div className="chat-placeholder">
            Ask your health problem like:
            <br />
            headache, cold, fatigue, digestion issue...
          </div>
        )}

        {chat.map((msg, index) => (

          <div
            key={index}
            className={`chat-message ${msg.sender}`}
          >

            {msg.sender === "bot" ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {msg.text}
              </ReactMarkdown>
            ) : (
              msg.text
            )}

          </div>

        ))}

        {loading && (
          <div className="chat-message bot">
            Typing...
          </div>
        )}

        <div ref={chatEndRef}></div>

      </div>

      <div className="chat-input-area">

        <input
          type="text"
          placeholder="Type your symptoms..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button onClick={sendMessage}>
          Send
        </button>

      </div>

    </div>

  );

}

export default ChatPage;