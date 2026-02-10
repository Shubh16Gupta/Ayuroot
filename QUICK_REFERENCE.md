# Vercel Deployment - Quick Reference

## What Was Changed

### New Files Created
1. **`vercel.json`** - Vercel deployment config with routing rules
2. **`/api/index.js`** - Express serverless function handler
3. **`.env.example`** - Environment variables template
4. **`VERCEL_DEPLOYMENT.md`** - Complete deployment guide
5. **`DEPLOYMENT_CHECKLIST.md`** - Pre/post-deployment checklist
6. **`frontend/src/services/api.js`** - API configuration (was empty)

### Modified Files
1. **`package.json`** (root) - Added build scripts and project metadata
2. **`backend/server.js`** - Made Vercel-compatible, added health check
3. **`frontend/src/pages/Login.jsx`** - Uses dynamic API URL
4. **`frontend/src/pages/Signup.jsx`** - Uses dynamic API URL
5. **`frontend/src/pages/ChatPage.jsx`** - Uses dynamic API URL
6. **`frontend/src/services/chatService.js`** - Uses dynamic API URL

## How It Works Now

```
User Request
    ↓
Vercel Frontend (React)
    ↓
/api/v1/* → Rewritten to /api/*
    ↓
/api/index.js (Serverless Function)
    ↓
Express Routes (/backend/routes/*)
    ↓
Controllers & Database
    ↓
Response
```

## Key Environment Variables

| Variable | Required | Example |
|----------|----------|---------|
| `MONGODB_URL` | ✅ | `mongodb+srv://user:pass@cluster.mongodb.net/ayuroot` |
| `JWT_SECRET` | ✅ | `your-secret-key-123abc` |
| `GEMINI_API_KEY` | ✅ | `AIzaSy...` |
| `FRONTEND_URL` | ✅ | `https://ayuroot.vercel.app` |

## Deployment Commands

### Using Vercel CLI
```bash
npm i -g vercel
vercel login
vercel --prod
```

### Using GitHub (Recommended)
1. Push to GitHub
2. Import on vercel.com
3. Add env variables
4. Deploy automatically

## API Base URL Strategy

The frontend automatically detects environment:

```javascript
// In production (Vercel)
API_BASE_URL = "/api/v1"  // Same domain

// In development (local)
API_BASE_URL = "http://localhost:8000/api/v1"  // Separate backend
```

## Testing Endpoints

After deployment, test with:

```bash
# Health check
curl https://your-project.vercel.app/api/health

# Signup
curl -X POST https://your-project.vercel.app/api/v1/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"123"}'

# Login
curl -X POST https://your-project.vercel.app/api/v1/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123"}'
```

## MongoDB Setup

If using MongoDB Atlas:
1. Create account at mongodb.com
2. Create free cluster
3. Create database user
4. Get connection string
5. Add Vercel IP to whitelist (or allow all: 0.0.0.0/0)
6. Set as `MONGODB_URL` env variable

## Troubleshooting Quick Links

- **CORS Error**: Check `FRONTEND_URL` env variable matches deployed domain
- **404 API**: Verify `/api/index.js` exists and `vercel.json` routing is correct
- **Database Error**: Check `MONGODB_URL` env variable and MongoDB whitelist
- **Build Failed**: Run `npm run build` locally to see error details

## Important Notes

✅ **DO:**
- Use production MongoDB (not localhost)
- Use secure JWT secret (long random string)
- Set proper FRONTEND_URL after deployment
- Keep .env out of git (.gitignore)
- Test locally first

❌ **DON'T:**
- Hardcode API URLs
- Commit .env file
- Use localhost in env variables
- Skip MongoDB whitelist setup
- Use same JWT secret across projects

## Next Steps

1. Read `VERCEL_DEPLOYMENT.md` for detailed guide
2. Check `DEPLOYMENT_CHECKLIST.md` before deploying
3. Set up MongoDB Atlas
4. Add env variables to Vercel
5. Deploy with `vercel --prod` or via GitHub

## Need Help?

- Vercel docs: https://vercel.com/docs
- MongoDB Atlas: https://docs.atlas.mongodb.com
- Express on Vercel: https://vercel.com/docs/functions/serverless-functions
