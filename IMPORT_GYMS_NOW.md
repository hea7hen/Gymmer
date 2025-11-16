# 🏋️ Import Your 87 Gyms - Step by Step

## Why You Can't See Gyms

Your 87 gyms are in the CSV file but **not yet in Firebase Firestore**.
You need to import them first!

## Step-by-Step Guide (5 minutes)

### Step 1: Enable Firestore Database (2 minutes)

1. **Open Firebase Console:**
   https://console.firebase.google.com/project/gymmer-aac12/firestore

2. **Click "Create database"** button

3. **Choose "Start in production mode"**
   - This is important! We already have security rules.

4. **Select location:** `asia-south1 (Mumbai)`
   - Closest to Bangalore for best performance

5. **Click "Enable"**
   - Wait 30 seconds for it to create

### Step 2: Enable Authentication (30 seconds)

**While Firestore is being created:**

1. Open: https://console.firebase.google.com/project/gymmer-aac12/authentication/providers

2. Click "Email/Password" → Enable it → Save

3. Click "Google" → Enable it → Add your email as support email → Save

### Step 3: Deploy Security Rules (1 minute)

**Open a NEW terminal** (keep dev server running):

```bash
cd /Users/abhishek/Projects/Gymmer

# Login to Firebase (opens browser)
firebase login

# Use your project
firebase use gymmer-aac12

# Deploy the security rules
firebase deploy --only firestore:rules,storage
```

Expected output:
```
✔  Deploy complete!
```

### Step 4: Import Your 87 Gyms (1 minute)

**In the same terminal:**

```bash
npm run import-gyms
```

You'll see:
```
Importing 87 gyms...
✓ Imported: Fit Formula (abc123...)
✓ Imported: Pump'it Fitness Studio (def456...)
✓ Imported: Live Fitness (ghi789...)
✓ Imported: Aero Fitness Center (...)
... (continues for all 87 gyms)
Import complete!
```

### Step 5: Refresh Your App

**Go to:** http://localhost:5173

Now:
- ✅ Click "Find Gyms" → See all 87 gyms!
- ✅ Search for "Koramangala" → See 11 gyms
- ✅ Filter by price → Works!
- ✅ Click any gym → See details

## Verification

**Check if import worked:**

1. Go to Firebase Console → Firestore
2. You should see "gyms" collection
3. Click it → See 87 documents (your gyms!)

**Test in app:**

1. Go to http://localhost:5173/search
2. You should see gyms listed
3. Try searching "Indiranagar"
4. Should show 6 gyms

## Common Issues

### "Permission denied" error
→ Run: `firebase deploy --only firestore:rules`

### Import script fails
→ Make sure Firestore database is created first (Step 1)

### Still don't see gyms
→ Check Firebase Console → Firestore → gyms collection
→ If empty, run import script again

### "firebase: command not found"
→ Run: `npm install -g firebase-tools`

## After Import

**Next steps:**

1. **Create admin account:**
   - Sign up at http://localhost:5173
   - Go to Firestore → users → your user
   - Add field: `isAdmin` = `true` (boolean)
   - Refresh → See "Admin" menu

2. **Make some gyms Premium:**
   - Admin → Manage Gyms
   - Select 6-8 good gyms
   - Click "Mark as Premium"
   - They'll show on homepage

3. **Add phone numbers:**
   - Admin → Manage Gyms → Edit
   - Add phone numbers for top gyms
   - Users can call them!

## Quick Commands Summary

```bash
# Terminal 1 (already running):
npm run dev   # Dev server at http://localhost:5173

# Terminal 2 (run these):
cd /Users/abhishek/Projects/Gymmer
firebase login
firebase use gymmer-aac12
firebase deploy --only firestore:rules,storage
npm run import-gyms
```

That's it! Your gyms will appear! 🎉

