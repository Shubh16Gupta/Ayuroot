# Pre-Deployment Checklist

## Before Deploying to Vercel

### Backend Verification
- [ ] All environment variables are defined in `.env.example`
- [ ] Server handles CORS properly with `FRONTEND_URL` env variable
- [ ] Database connection string uses MongoDB Atlas (not localhost)
- [ ] All API routes are properly defined in `/backend/routes/`
- [ ] Controllers are using async/await properly
- [ ] Error handling is implemented

### Frontend Verification
- [ ] All hardcoded API URLs are replaced with dynamic `API_BASE_URL`
- [ ] No `localhost` references in API calls (use relative paths or `API_BASE_URL`)
- [ ] Build completes successfully: `npm run build`
- [ ] Environment-specific logic handles production URLs
- [ ] All imports use correct paths

### Configuration Verification
- [ ] `/vercel.json` exists with proper routing rules
- [ ] `/api/index.js` exists and exports Express app
- [ ] Root `package.json` has build script
- [ ] No `.env` file is committed to Git (add to `.gitignore`)

### Repository Setup
- [ ] Code is pushed to GitHub
- [ ] `.gitignore` includes `node_modules/`, `.env`, etc.
- [ ] No sensitive keys in source code
- [ ] Branch is clean with no merge conflicts

## Vercel Setup

- [ ] Vercel account created
- [ ] Project imported from GitHub
- [ ] Environment variables added:
  - [ ] `MONGODB_URL`
  - [ ] `JWT_SECRET`
  - [ ] `GEMINI_API_KEY`
  - [ ] `FRONTEND_URL` (set after first deploy)
- [ ] Build settings are correct:
  - [ ] Build command: `npm run build`
  - [ ] Output directory: `frontend/build`

## After Deployment

- [ ] Navigate to deployed URL and test signup
- [ ] Test login functionality
- [ ] Test chat functionality
- [ ] Check browser console for errors
- [ ] Check Vercel logs for any issues
- [ ] Update `FRONTEND_URL` env variable with actual deployed URL (if not done yet)
- [ ] Verify API endpoints are accessible

## Common Issues to Check

- [ ] API routes returning 404 → Check `/api/index.js` and routing
- [ ] CORS errors → Verify `FRONTEND_URL` env variable
- [ ] Database connection errors → Check `MONGODB_URL` and whitelist Vercel IPs
- [ ] Static files 404 → Check that React build was created
- [ ] Timeouts → Check for long-running operations in API

## Quick Test Commands

```bash
# Build locally to check for errors
npm run build

# Test API health check (after deployment)
curl https://your-project.vercel.app/api/health

# View Vercel logs
vercel logs --prod
```

## Rollback

If deployment has critical issues:
1. Go to Vercel dashboard
2. Select your project
3. Go to "Deployments"
4. Find the previous working deployment
5. Click "..." → "Promote to Production"
