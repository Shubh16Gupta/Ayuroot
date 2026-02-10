# Vercel Deployment Guide

This project is configured for deployment on Vercel with both frontend (React) and backend (Express API) running on the same domain.

## Architecture

- **Frontend**: React app built with `react-scripts` (deployed in `/frontend/build`)
- **Backend**: Express API deployed as serverless functions (in `/api`)
- **Database**: MongoDB (cloud-hosted)

## Configuration Files

### `/vercel.json`
Main configuration file that:
- Specifies the build output directory
- Routes `/api/v1/*` requests to serverless functions
- Handles SPA routing for React
- Defines environment variables

### `/api/index.js`
Express app that:
- Acts as the main serverless function handler
- Imports all backend routes from `/backend`
- Handles CORS, middleware, and database connections

## Deployment Steps

### 1. Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (or any cloud MongoDB)
- Google Gemini API key
- Vercel account

### 2. Local Testing
```bash
# Install dependencies
cd backend && npm install
cd ../frontend && npm install

# Create .env file with your secrets
cp .env.example .env
# Edit .env and add your actual values

# Run locally
npm run dev  # Requires concurrently in root
# OR manually:
# Terminal 1: cd backend && npm run dev
# Terminal 2: cd frontend && npm start
```

### 3. Deploy to Vercel

#### Option A: Using Vercel CLI
```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

#### Option B: GitHub Integration (Recommended)
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" → Import your repository
4. Select root directory (it should auto-detect)
5. Add environment variables in settings:
   - `MONGODB_URL`
   - `JWT_SECRET`
   - `GEMINI_API_KEY`
   - `FRONTEND_URL` (your Vercel domain)
6. Click "Deploy"

### 4. Environment Variables on Vercel

In your Vercel project settings, add:

```
MONGODB_URL=mongodb+srv://user:password@cluster.mongodb.net/dbname
JWT_SECRET=your_super_secret_jwt_key_here
GEMINI_API_KEY=your_gemini_api_key_here
FRONTEND_URL=https://your-project.vercel.app
```

⚠️ **Important**: Do NOT use localhost URLs. Use your actual production URLs.

## API Endpoints

After deployment, your API will be available at:
- `https://your-project.vercel.app/api/v1/login`
- `https://your-project.vercel.app/api/v1/signup`
- `https://your-project.vercel.app/api/v1/chat`
- `https://your-project.vercel.app/api/v1/chat-history`

## How It Works

1. **Frontend Requests**: React app sends requests to `/api/v1/*`
2. **Routing**: Vercel rewrites these to `/api/$1` (without `/v1`)
3. **Serverless Functions**: Express app in `/api/index.js` handles the request
4. **Backend Routes**: Express routes in `/backend/routes/` process the request
5. **Response**: Data returned to frontend

## Troubleshooting

### Issue: 404 on API endpoints
- Check that `/api/index.js` exists
- Verify `vercel.json` routing rules
- Check Vercel deployment logs

### Issue: CORS errors
- Update `FRONTEND_URL` environment variable
- Ensure `FRONTEND_URL` matches your Vercel domain
- Check backend CORS configuration in `/backend/server.js`

### Issue: Database connection fails
- Verify `MONGODB_URL` in environment variables
- Ensure MongoDB allows connections from Vercel IPs
- Add Vercel IP address to MongoDB Atlas whitelist (or allow all: 0.0.0.0/0)

### Issue: Serverless function timeout
- Check for long-running operations
- Optimize database queries
- Increase timeout in `vercel.json` if needed

## File Structure for Vercel

```
/
├── vercel.json          ← Main Vercel config
├── api/
│   └── index.js         ← Express serverless function
├── frontend/
│   ├── build/           ← Built React app (after `npm run build`)
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/
│   ├── server.js
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── config/
│   └── package.json
└── package.json         ← Root package.json
```

## Development vs Production

The API base URL automatically switches:
- **Development**: `http://localhost:8000/api/v1`
- **Production**: `/api/v1` (same domain)

This is handled in `/frontend/src/services/api.js`

## Next Steps

1. Test locally with `npm run dev`
2. Push to GitHub
3. Import project on Vercel
4. Add environment variables
5. Deploy!
6. Test all endpoints after deployment

For more help: https://vercel.com/docs
