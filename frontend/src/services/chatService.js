import axios from "axios";

const getAPIBaseURL = () => {
  // In production (Vercel), use relative path
  // In development, use localhost
  if (process.env.NODE_ENV === "production") {
    return "/api/v1";
  }
  return "http://localhost:8000/api/v1";
};

const API = getAPIBaseURL();

export const sendChatMessage = async (message, userId) => {

    const response = await axios.post(`${API}/chat`, {

        message,
        userId

    });

    return response.data;

};