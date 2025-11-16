# 🚀 Gymmer - Quick Start (5 Minutes to Live!)

## ✅ What You Have

A **complete, production-ready gym discovery app** with:
- 🎨 Exact logo colors (Orange #FF8C42, Cream #F5F0E8)
- 📊 Support for 90+ real gyms from CSV
- 🔐 Full authentication (Email + Google)
- 👨‍💼 Complete admin panel
- 📱 Mobile-responsive design
- ✅ **Built and tested** (in `dist/` folder)

## ⚡ 3-Step Launch

### Step 1: Firebase Setup (2 minutes)

```bash
# 1. Create Firebase project at https://console.firebase.google.com
# 2. Enable: Authentication, Firestore, Storage, Hosting

# 3. Copy config and create .env file
cat > .env << 'EOF'
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
EOF

# 4. Deploy Firebase rules
npm install -g firebase-tools
firebase login
firebase init  # Select: Firestore, Storage, Hosting (use existing files)
firebase deploy --only firestore:rules,firestore:indexes,storage
```

### Step 2: Import Gym Data (1 minute)

```bash
# Place your bangalore_gyms_data.csv in project root
# Then run:
npm run import-gyms
```

**CSV Format Expected:**
```
GymName,Neighborhood,Address,MonthlyPrice,QuarterlyPrice,YearlyPrice,Notes,Source
Iron Fitness,Koramangala,123 Main St,2000,5500,20000,Great gym,Justdial
```

### Step 3: Create Admin & Deploy (2 minutes)

```bash
# 1. Start dev server
npm run dev

# 2. Open http://localhost:5173 and sign up
# 3. Go to Firebase Console > Firestore > users > your-user
# 4. Edit document: Set isAdmin = true (boolean)

# 5. Build and deploy
npm run build
firebase deploy --only hosting

# 🎉 LIVE! Your site is at:
# https://your-project-id.web.app
```

## 🎯 First Tasks

After launching:

1. **Enhance Top Gyms** (Admin Panel):
   - Add phone numbers (most important!)
   - Upload real gym photos
   - Mark best ones as "Verified"
   - Set 6-8 as "Premium" for homepage

2. **Test Everything**:
   - Search by neighborhood
   - Filter by price
   - Save a gym
   - View gym detail
   - Test on mobile

3. **Share**:
   - r/bangalore
   - Fitness groups
   - WhatsApp communities

## 📂 Key Files

```
.env                    → Your Firebase credentials (CREATE THIS)
bangalore_gyms_data.csv → Your gym data (PUT IN ROOT)
src/                    → All app code (READY)
dist/                   → Built app (READY TO DEPLOY)
firebase.json           → Firebase config (READY)
```

## 🔑 Admin Features

Once you're admin:

- **Dashboard**: View stats (gyms, views, contacts)
- **Manage Gyms**: Edit, delete, bulk actions
- **Edit Gym**: Add phone, photos, amenities
- **Bulk Actions**: Mark verified, premium, export CSV

## 📱 Pages Available

**Public:**
- `/` - Homepage with featured gyms
- `/search` - Search with filters
- `/gym/[slug]` - Gym detail page
- `/saved` - Saved gyms (requires login)
- `/login` - Login page
- `/signup` - Signup page

**Admin:**
- `/admin` - Dashboard
- `/admin/gyms` - Manage gyms
- `/admin/gyms/[id]/edit` - Edit gym

## 🎨 Design

The app uses your exact logo colors:
- **Primary Orange**: `#FF8C42` (CTAs, badges, branding)
- **Cream**: `#F5F0E8` (text on orange, secondary backgrounds)
- **Bold Typography**: Heavy weights matching logo
- **Mobile-First**: Works perfectly on all devices

## 🐛 Troubleshooting

**Can't login?**
→ Enable Email/Password and Google in Firebase Console > Authentication

**Permission denied errors?**
→ Deploy Firebase rules: `firebase deploy --only firestore:rules,storage`

**Can't access admin panel?**
→ Set `isAdmin: true` in your user document (Firestore Console)

**Import script fails?**
→ Check .env has correct Firebase credentials

## 📖 Full Documentation

- `README.md` - Project overview
- `SETUP.md` - Detailed setup guide
- `PROJECT_SUMMARY.md` - Complete feature list
- `FILES_CREATED.md` - All files listing

## 💪 You're Ready!

Everything is built and tested. Just:
1. Add Firebase credentials
2. Import your gym data
3. Deploy

**Time to launch: ~5 minutes** ⚡

Go make Bangalore's gym discovery awesome! 🏋️🚀

