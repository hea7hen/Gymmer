# 🚀 Vercel Deployment Guide

## Step-by-Step Deployment

### 1. Prerequisites
- GitHub account
- Vercel account (sign up at vercel.com)
- Your code pushed to GitHub

### 2. Push Code to GitHub

```bash
cd /Users/abhishek/Projects/Gymmer

# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Gymmer app with Razorpay paywall"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/gymmer.git
git branch -M main
git push -u origin main
```

### 3. Connect to Vercel

1. Go to https://vercel.com
2. Click "Add New Project"
3. Import your GitHub repository
4. Select "Gymmer" repository

### 4. Configure Build Settings

**Framework Preset**: Vite

**Build Command**:
```bash
npm run build
```

**Output Directory**:
```
dist
```

**Install Command** (leave default):
```bash
npm install
```

**Root Directory**: `./` (leave default)

### 5. Environment Variables

Click "Environment Variables" and add these:

| Name | Value |
|------|-------|
| `VITE_FIREBASE_API_KEY` | `AIzaSyCo6SoM8heFg685KWfGJWYNyq3wgX_BMsY` |
| `VITE_FIREBASE_AUTH_DOMAIN` | `gymmer-aac12.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | `gymmer-aac12` |
| `VITE_FIREBASE_STORAGE_BUCKET` | `gymmer-aac12.firebasestorage.app` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `12358863442` |
| `VITE_FIREBASE_APP_ID` | `1:12358863442:web:86213b5d58955ada85ad8b` |
| `VITE_FIREBASE_MEASUREMENT_ID` | `G-C38MRGH2QV` |
| `VITE_RAZORPAY_KEY_ID` | `rzp_test_RgUTSG12jeSuAf` |

**Important**: For all environments (Production, Preview, Development)

### 6. Deploy

1. Click "Deploy"
2. Wait for build to complete (~2-3 minutes)
3. Your app will be live at: `https://gymmer-yourusername.vercel.app`

---

## Vercel Configuration File (Optional)

Create `vercel.json` in your project root:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

---

## Quick Setup Script

Copy and paste all environment variables at once:

```
VITE_FIREBASE_API_KEY=AIzaSyCo6SoM8heFg685KWfGJWYNyq3wgX_BMsY
VITE_FIREBASE_AUTH_DOMAIN=gymmer-aac12.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=gymmer-aac12
VITE_FIREBASE_STORAGE_BUCKET=gymmer-aac12.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=12358863442
VITE_FIREBASE_APP_ID=1:12358863442:web:86213b5d58955ada85ad8b
VITE_FIREBASE_MEASUREMENT_ID=G-C38MRGH2QV
VITE_RAZORPAY_KEY_ID=rzp_test_RgUTSG12jeSuAf
```

---

## Troubleshooting

### Build Fails

**Issue**: `npm run build` fails
**Solution**: 
```bash
# Test locally first
npm run build
# Check for TypeScript errors
npm run build
```

### 404 on Routes

**Issue**: Routes like `/search` return 404
**Solution**: Add `vercel.json` with rewrites (see above)

### Environment Variables Not Working

**Issue**: Firebase not connecting
**Solution**: 
1. Check all variables start with `VITE_`
2. Redeploy after adding variables
3. Check spelling and values

### Razorpay Not Loading

**Issue**: Payment not working
**Solution**: 
1. Verify `VITE_RAZORPAY_KEY_ID` is set
2. Check browser console for errors
3. Ensure key starts with `rzp_test_` or `rzp_live_`

---

## Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Wait for SSL certificate (automatic)

---

## Continuous Deployment

Once set up, every push to `main` branch auto-deploys:

```bash
git add .
git commit -m "Update feature"
git push origin main
# Vercel automatically deploys! 🚀
```

---

## Production Checklist

Before going live:

- [ ] Replace Razorpay test key with live key
- [ ] Update Firebase security rules
- [ ] Test all features on Vercel preview
- [ ] Check mobile responsiveness
- [ ] Test payment flow end-to-end
- [ ] Set up custom domain
- [ ] Enable Firebase App Check
- [ ] Set up error monitoring (Sentry)
- [ ] Configure analytics

---

## Environment Variables Summary

**Required for Vercel:**

```bash
# Firebase
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
VITE_FIREBASE_MEASUREMENT_ID

# Razorpay
VITE_RAZORPAY_KEY_ID
```

**Build Settings:**

- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node Version**: 18.x (automatic)

---

## Deploy Commands

```bash
# Install Vercel CLI (optional)
npm i -g vercel

# Deploy from terminal
vercel

# Deploy to production
vercel --prod
```

---

**Your app will be live at**: `https://your-project.vercel.app`

Deployment typically takes 2-3 minutes! 🎉

