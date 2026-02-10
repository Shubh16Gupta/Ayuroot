# Ayuroot Deployment & Chat System Guide

## System Architecture

### Frontend (React)
- **Location**: `/frontend`
- **Tech**: React 18, React Router, Axios, React Markdown
- **Port**: 3000 (development)

### Backend (Express)
- **Location**: `/backend`
- **Tech**: Node.js, Express, MongoDB, Mongoose, JWT, Gemini API
- **Port**: 8000 (development)

---

## Chat System Flow

### 1. Frontend Chat Flow (ChatPage.jsx)
```
User Input → sendMessage() → 
  - Adds user message to chat state
  - Calls /api/v1/chat/stream with SSE
  - Reads response stream with getReader()
  - Parses SSE chunks: { chunk: "..." }
  - Accumulates chunks into botMessage
  - Updates chat state in real-time
  - Displays response as it arrives
```

### 2. Backend Chat Flow (chatController.js)
```
POST /api/v1/chat/stream →
  - Validates message
  - Initializes Gemini 2.5-Flash-Lite model
  - Generates AI response
  - Streams response in 30-char chunks using for loop:
    for (let i = 0; i < fullText.length; i += 30)
  - Sends SSE events: data: { chunk: "..." }
  - Sends completion signal: { done: true }
  - Closes connection
```

### 3. Database Connection
```
MongoDB Atlas Connection String →
  mongoose.connect(MONGODB_URL, options) →
    - serverSelectionTimeoutMS: 20000
    - connectTimeoutMS: 20000
    - family: 4 (IPv4 only)
```

---

## API Endpoints

### Authentication
- `POST /api/v1/signup` - Register new user
- `POST /api/v1/login` - Login user (returns JWT token)

### Chat (Streaming)
- `POST /api/v1/chat/stream` - Streaming chat response (SSE)
  - Request: `{ message: "string" }`
  - Response: SSE stream with chunks
  
### Chat (Standard)
- `POST /api/v1/chat` - Standard chat response (fallback)
  - Request: `{ message: "string" }`
  - Response: `{ success: true, response: "string" }`

---

## Environment Variables (.env)

```
# Backend
PORT=8000
MONGODB_URL=mongodb+srv://user:pass@cluster.mongodb.net/dbname
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_gemini_api_key
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Frontend (via .env or .env.local)
REACT_APP_API_BASE_URL=http://localhost:8000/api/v1
```

---

## Key Features

### ✅ Streaming Responses
- Real-time chunk streaming using for loop
- 30-character chunks with 50ms delay
- SSE (Server-Sent Events) for persistent connection
- Frontend accumulates chunks into full response

### ✅ Gemini AI Integration
- Model: `gemini-2.5-flash-lite`
- Context: Ayurveda health advice
- Error handling with fallback messages

### ✅ Database Connection
- MongoDB Atlas with connection pooling
- IPv4-only connections (DNS stability)
- 20-second timeouts for reliability

### ✅ Authentication
- JWT token-based auth
- Secure password hashing with bcrypt
- Token stored in localStorage (frontend)

---

## Testing the Chat System

### 1. Start Backend
```bash
cd backend
npm install
npm run dev
```

### 2. Start Frontend
```bash
cd frontend
npm install
npm start
```

### 3. Test Chat
1. Go to http://localhost:3000
2. Sign up or login
3. Navigate to Chat
4. Type a health symptom: "headache", "cold", "fatigue"
5. Watch response stream in real-time

---

## Troubleshooting

### Issue: Black/Empty Response
**Solution**: Ensure `/chat/stream` endpoint is being called, not `/chat`

### Issue: MongoDB Connection Timeout
**Solution**: Check:
- MongoDB Atlas IP whitelist (add: 0.0.0.0/0)
- Connection string is correct
- Network connectivity (DNS issues)

### Issue: Gemini API Errors
**Solution**:
- Verify GEMINI_API_KEY is correct
- Check API quota in Google Cloud Console
- Ensure model name is: `gemini-2.5-flash-lite`

### Issue: CORS Errors
**Solution**: Frontend URL must match FRONTEND_URL in backend .env

---

## Deployment (Vercel)

### Frontend Deployment
1. Go to Vercel dashboard
2. Import GitHub repo
3. Set project root to: `frontend`
4. Add env vars: `REACT_APP_API_BASE_URL`
5. Deploy

### Backend Deployment
1. Go to Vercel dashboard
2. Import GitHub repo
3. Set project root to: `backend`
4. Add env vars: `MONGODB_URL`, `JWT_SECRET`, `GEMINI_API_KEY`
5. Deploy

---

## Code Changes Summary

### Backend (chatController.js)
- ✅ Removed helper function pattern
- ✅ Streaming endpoint with 30-char chunks
- ✅ For loop based chunk generation
- ✅ Proper SSE headers and format
- ✅ Gemini 2.5-Flash-Lite model

### Frontend (ChatPage.jsx)
- ✅ SSE reader implementation
- ✅ Real-time chunk accumulation
- ✅ Streaming state updates
- ✅ Error handling with fallback
- ✅ Auto-scroll to latest message

