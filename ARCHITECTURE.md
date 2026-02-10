# Vercel Deployment Architecture - Visual Guide

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    VERCEL DEPLOYMENT                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  DOMAIN: https://your-project.vercel.app                   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              FRONTEND (React App)                     │  │
│  │              Static Files from /build                │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │ Router      │ Components │ Services │ Styles   │  │  │
│  │  │ Login       │ Navbar     │ api.js   │ CSS      │  │  │
│  │  │ Signup      │ Footer     │ API_BASE │          │  │  │
│  │  │ Dashboard   │ ChatUI     │ _URL     │          │  │  │
│  │  │ Remedies    │            │          │          │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────┘  │
│              ↓                                               │
│    ✓ All routes → index.html (SPA routing)                 │
│    ✓ /api/v1/* → Rewritten to /api/*                      │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │        SERVERLESS FUNCTIONS (API Routes)             │  │
│  │              /api/index.js                            │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │        Express Application                      │  │  │
│  │  │  • CORS Middleware                             │  │  │
│  │  │  • Cookie Parser                               │  │  │
│  │  │  • JSON Parser                                 │  │  │
│  │  │  • Auth Routes (signup, login)                │  │  │
│  │  │  • Chat Routes (chat, history)                │  │  │
│  │  │  • Database Connection                        │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────┘  │
│              ↓                                               │
│    Imported from /backend/routes/*                         │
│    Imported from /backend/controllers/*                    │
│    Imported from /backend/models/*                         │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                  ENVIRONMENT VARIABLES                      │
│                                                              │
│  MONGODB_URL      → MongoDB Atlas                          │
│  JWT_SECRET       → Token signing key                      │
│  GEMINI_API_KEY   → AI API key                             │
│  FRONTEND_URL     → This Vercel domain                     │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                    EXTERNAL SERVICES                        │
│                                                              │
│  ☁️ MongoDB Atlas          Database Server                 │
│  🤖 Google Gemini API      AI/ML Engine                    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Request/Response Flow

### Frontend → Backend API Call

```
User Action (Login/Signup/Chat)
    ↓
React Component
    ↓
axios.post(`${API_BASE_URL}/route`, ...)
    ↓
┌─────────────────────────────────────────┐
│ API_BASE_URL Resolution:                │
│ • Dev: http://localhost:8000/api/v1     │
│ • Prod: /api/v1                         │
└─────────────────────────────────────────┘
    ↓
HTTP POST Request
    ↓
Vercel Routing Rules (vercel.json)
    ↓
/api/v1/* → /api/*
    ↓
Serverless Function Handler (/api/index.js)
    ↓
Express Middleware
    ├─ CORS Check
    ├─ JSON Parse
    └─ Cookie Parse
    ↓
Route Match (/backend/routes/*)
    ↓
Controller Handler (/backend/controllers/*)
    ↓
Database Query (/backend/models/*)
    ↓
│ Response JSON │
    ↓
Back to Frontend
    ↓
React State Update
    ↓
UI Render
```

## File Organization for Deployment

```
VERCEL SEES THIS STRUCTURE:
(Only relevant files for deployment)

/
├── vercel.json
├── api/
│   └── index.js ..................... ← Vercel runs this for API calls
│
├── frontend/
│   ├── public/ ...................... ← Static assets
│   ├── src/ ......................... ← React components
│   └── build/ ....................... ← Generated on deployment
│       ├── index.html ............... ← SPA entry point
│       ├── static/js/ ............... ← Bundled JS
│       ├── static/css/ .............. ← Bundled CSS
│       └── ... other static files
│
├── backend/ ......................... ← Imported by /api/index.js
│   ├── server.js
│   ├── routes/
│   ├── controllers/
│   └── ...
│
└── package.json ..................... ← Build script
```

## API Endpoint Routing

```
REQUEST PATTERN              VERCEL ROUTING          HANDLER
────────────────────────────────────────────────────────────

POST /api/v1/login      ──→  /api/login      ──→  auth controller
POST /api/v1/signup     ──→  /api/signup     ──→  auth controller  
POST /api/v1/chat       ──→  /api/chat       ──→  chat controller
GET  /api/v1/chat-...   ──→  /api/chat-...   ──→  chat controller
GET  /api/health        ──→  /api/health     ──→  health check

ALL OTHER ROUTES        ──→  /index.html           React SPA
(/, /dashboard, /login, /remedies, etc.)
```

## Environment-Specific Configuration

```
DEVELOPMENT (Local)
┌─────────────────────────────────────────┐
│ Backend runs: npm run dev (port 8000)   │
│ Frontend runs: npm start (port 3000)    │
│ MongoDB: localhost:27017                │
│ API URL: http://localhost:8000/api/v1  │
└─────────────────────────────────────────┘
         ↓ (Different domains)
┌─────────────────────────────────────────┐
│ Frontend makes cross-origin requests    │
│ Backend enables CORS for localhost:3000 │
└─────────────────────────────────────────┘

PRODUCTION (Vercel)
┌─────────────────────────────────────────┐
│ Vercel hosts everything on one domain   │
│ MongoDB: MongoDB Atlas (cloud)          │
│ API URL: /api/v1 (same domain)         │
└─────────────────────────────────────────┘
         ↓ (Same domain)
┌─────────────────────────────────────────┐
│ No CORS issues                          │
│ Faster requests (no extra origin lookup)│
└─────────────────────────────────────────┘
```

## Build & Deployment Process

```
STEP 1: PUSH TO GITHUB
user$ git push origin main
                    ↓
STEP 2: VERCEL WEBHOOK TRIGGERED
vercel.io receives push notification
                    ↓
STEP 3: BUILD PHASE
vercel$ npm run build
        ↓
        cd frontend && npm run build
        ↓
        react-scripts generates /frontend/build
                    ↓
STEP 4: FUNCTION PREPARATION
vercel$ Analyzes /api/index.js
        ↓
        Creates serverless function handler
                    ↓
STEP 5: DEPLOYMENT
vercel$ Uploads frontend static files
        vercel$ Deploys API function
                    ↓
STEP 6: LIVE
https://your-project.vercel.app
Ready to handle traffic!
```

## Key Points

✅ **Same Domain Benefits:**
- No CORS complexity
- Faster requests
- Session/cookie sharing
- Better security
- Single deployment unit

🔄 **Dynamic Configuration:**
- API URL automatically switches
- Environment detection built-in
- Works for both dev and prod

🔐 **Security:**
- Secrets stored in Vercel env vars
- No hardcoded credentials
- MongoDB whitelist required
- JWT tokens for session management

⚡ **Performance:**
- Frontend: Static file serving (CDN)
- Backend: Serverless functions (cold start optimization)
- Database: Cloud-hosted (globally distributed)

## Troubleshooting Flow

```
Issue Encountered
    ↓
Check Vercel Logs
    │
    ├─ Build Error
    │   └─ Check npm run build locally
    │
    ├─ API 404
    │   └─ Check /api/index.js exists
    │   └─ Check vercel.json routing
    │
    ├─ CORS Error
    │   └─ Check FRONTEND_URL env var
    │   └─ Check backend CORS config
    │
    ├─ Database Error
    │   └─ Check MONGODB_URL
    │   └─ Check MongoDB whitelist
    │
    └─ Runtime Error
        └─ Check all imports work
        └─ Check env variables set
```

---

Your project is now architected for modern serverless deployment! 🚀
