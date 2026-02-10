/**
 * API Configuration
 * Automatically switches between local development and production URLs
 */

export const getAPIBaseURL = () => {
  // In production (Vercel), use relative path to same domain
  if (process.env.NODE_ENV === "production" || window.location.hostname !== "localhost") {
    return "/api/v1";
  }
  // In development, use local backend server
  return "http://localhost:4000/api/v1";
};

export const API_BASE_URL = getAPIBaseURL();
