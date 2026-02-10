# Ayuroot - Ayurveda Chatbot

A full-stack web application combining React frontend with Express backend, deployed on Vercel as a serverless monorepo.

## 📋 Project Overview

**Ayuroot** is an AI-powered Ayurveda chatbot that helps users learn about Ayurvedic remedies and practices using Google's Gemini AI.

- **Frontend**: React 19 with React Router, Tailwind CSS
- **Backend**: Express.js with MongoDB and Gemini AI integration
- **Deployment**: Vercel (Serverless Functions)
- **Database**: MongoDB Atlas

## 🏗️ Project Structure

```
ayuroot/
├── frontend/              # React application
│   ├── src/
│   │   ├── pages/        # Login, Signup, Dashboard, ChatPage
│   │   ├── components/   # Navbar, Footer, RemedyCard
│   │   ├── services/     # API configuration
│   │   └── context/      # Auth context
│   └── package.json
│
├── backend/              # Express API
│   ├── server.js
│   ├── routes/          # Auth, Chat, Remedy routes
│   ├── controllers/      # Business logic
│   ├── models/          # MongoDB schemas
│   ├── config/          # Database, Gemini setup
│   └── package.json
│
├── api/
│   └── index.js         # Vercel serverless handler
│
├── vercel.json          # Deployment configuration
└── package.json         # Root package
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Google Gemini API key
- Vercel account (for deployment)

### Local Development

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd ayuroot
   cp .env.example .env
   ```

2. **Update `.env` with your credentials:**
   ```
   MONGODB_URL=mongodb+srv://user:password@cluster.mongodb.net/ayuroot
   JWT_SECRET=your-secret-key-here
   GEMINI_API_KEY=your-api-key-here
   FRONTEND_URL=http://localhost:3000
   ```

3. **Install dependencies:**
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   cd ..
   ```

4. **Run locally:**
   ```bash
   # Install concurrently at root
   npm install
   
   # Run both servers
   npm run dev
   ```

   Or manually:
   ```bash
   # Terminal 1
   cd backend && npm run dev
   
   # Terminal 2
   cd frontend && npm start
   ```

5. **Access the app:**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:8000
   - API: http://localhost:8000/api/v1

## 📦 Available Scripts

### Root
```bash
npm run build    # Build frontend for production
npm run dev      # Run both frontend and backend in dev mode
npm start        # Start backend server only
```

### Frontend
```bash
npm start        # Start dev server (port 3000)
npm run build    # Build for production
npm test         # Run tests
```

### Backend
```bash
npm start        # Start server (port 8000)
npm run dev      # Start with nodemon (auto-reload)
```

## 🔐 Environment Variables

### Required for All Environments
- `MONGODB_URL` - MongoDB Atlas connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `GEMINI_API_KEY` - Google Gemini API key
- `FRONTEND_URL` - Frontend URL (localhost:3000 for dev, Vercel URL for prod)

### Optional
- `PORT` - Backend server port (default: 8000)

## 🌐 Deployment on Vercel

### Why Vercel?
- Serverless functions for backend API
- Static hosting for React frontend
- Automatic builds on push
- Built-in CI/CD pipeline
- Environment variable management

### Deployment Steps

#### Option 1: CLI
```bash
npm i -g vercel
vercel login
vercel --prod
```

#### Option 2: GitHub Integration (Recommended)
1. Push to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables (Settings → Environment Variables):
   - `MONGODB_URL`
   - `JWT_SECRET`
   - `GEMINI_API_KEY`
   - `FRONTEND_URL` (your Vercel domain)
5. Click Deploy

### Vercel Configuration

The `vercel.json` file handles:
- **Build command**: `npm run build` (builds React app)
- **Output directory**: `frontend/build`
- **Routes**: 
  - `/api/v1/*` → Serverless functions
  - All other routes → React SPA

## 📚 API Endpoints

All endpoints are accessible at `/api/v1`

### Authentication
```
POST   /api/v1/signup
       body: { name, email, password }

POST   /api/v1/login
       body: { email, password }
```

### Chat
```
POST   /api/v1/chat
       headers: { Authorization: Bearer <token> }
       body: { message }

GET    /api/v1/chat-history
       headers: { Authorization: Bearer <token> }
```

## 🔗 API Integration in Frontend

The frontend automatically detects the environment and switches API URLs:

```javascript
// In development (localhost)
API_BASE_URL = "http://localhost:8000/api/v1"

// In production (Vercel)
API_BASE_URL = "/api/v1"
```

See [frontend/src/services/api.js](frontend/src/services/api.js) for implementation.

## 📖 Documentation

For detailed information, see:

| Document | Purpose |
|----------|---------|
| [ARCHITECTURE.md](ARCHITECTURE.md) | System architecture and flow diagrams |
| [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md) | Complete deployment guide |
| [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) | Pre-deployment verification checklist |
| [QUICK_REFERENCE.md](QUICK_REFERENCE.md) | Quick lookup guide |
| [ANALYSIS_AND_CHANGES.md](ANALYSIS_AND_CHANGES.md) | Detailed changes made for Vercel |

## 🔧 Configuration Details

### Backend Configuration
- **Framework**: Express.js 5
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT tokens
- **AI Integration**: Google Gemini API
- **CORS**: Enabled with configurable origin

### Frontend Configuration
- **Framework**: React 19
- **Routing**: React Router v7
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Markdown**: React Markdown with GitHub Flavored Markdown

## 🐛 Troubleshooting

### Common Issues

**CORS Error**
- Check `FRONTEND_URL` environment variable
- Ensure it matches your deployed domain

**API 404**
- Verify `/api/index.js` exists
- Check Vercel routing rules in `vercel.json`
- View Vercel deployment logs

**Database Connection Error**
- Verify `MONGODB_URL` is correct
- Add Vercel IP to MongoDB whitelist
- Check database credentials

**Build Failure**
- Run `npm run build` locally to see detailed errors
- Check all imports are correct
- Ensure all dependencies are installed

**Cold Start Timeout**
- First request may take 5-10 seconds (normal for serverless)
- Subsequent requests are faster

## 🚀 Production Checklist

Before deploying to production:
- [ ] All hardcoded URLs removed
- [ ] Environment variables set on Vercel
- [ ] MongoDB whitelist includes Vercel IPs
- [ ] JWT secret is strong and unique
- [ ] Gemini API key is valid
- [ ] Frontend URL is set to actual domain
- [ ] Build succeeds locally
- [ ] All tests pass
- [ ] No sensitive data in source code

See [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) for complete checklist.

## 🤝 Contributing

1. Create a feature branch
2. Make changes
3. Test locally
4. Push to GitHub
5. Vercel will auto-deploy on merge

## 📝 License

[Add your license here]

## 🆘 Support

For deployment issues, see the troubleshooting sections in:
- [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md#troubleshooting)
- [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md#common-issues-to-check)

For Vercel docs: https://vercel.com/docs

---

**Status**: ✅ Configured for Vercel deployment

**Last Updated**: February 10, 2026

All files are ready for production deployment!
