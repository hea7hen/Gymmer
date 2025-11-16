# Gymmer Setup Guide

## Quick Start

### 1. Install Dependencies

Dependencies are already installed! If you need to reinstall:

```bash
npm install --legacy-peer-deps
```

### 2. Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project (or use existing)
3. Enable these services:
   - **Authentication**: Email/Password + Google Sign-in
   - **Firestore Database**: Start in production mode
   - **Storage**: Start in production mode
   - **Hosting**: Enable

4. Get your Firebase config:
   - Project Settings > General > Your apps > Web app
   - Copy the config object

5. Create `.env` file in project root:

```bash
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 3. Deploy Firebase Rules

Install Firebase CLI if you haven't:

```bash
npm install -g firebase-tools
firebase login
firebase init
```

Select:
- Firestore
- Storage  
- Hosting

Use existing files (they're already created).

Deploy rules:

```bash
firebase deploy --only firestore:rules,firestore:indexes,storage
```

### 4. Import Gym Data

1. Place `bangalore_gyms_data.csv` in project root with columns:
   - GymName
   - Neighborhood
   - Address
   - MonthlyPrice
   - QuarterlyPrice
   - YearlyPrice
   - Notes
   - Source

2. Run import script:

```bash
npm run import-gyms
```

This will import all gyms to Firestore.

### 5. Create Admin User

1. Start dev server:

```bash
npm run dev
```

2. Open http://localhost:5173
3. Sign up with your email
4. Go to Firestore Console
5. Find your user in `users` collection
6. Edit document and set: `isAdmin: true`
7. Refresh the app - you'll now see Admin menu

### 6. Development

Start dev server:

```bash
npm run dev
```

Visit http://localhost:5173

### 7. Build for Production

```bash
npm run build
```

This creates optimized files in `dist/` folder.

### 8. Deploy to Firebase Hosting

```bash
firebase deploy --only hosting
```

Your site will be live at: `https://your-project-id.web.app`

## Project Structure

```
Gymmer/
├── public/              # Static assets (logo, favicon)
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   │   ├── admin/    # Admin panel pages
│   │   ├── Home.tsx
│   │   ├── Search.tsx
│   │   ├── GymDetail.tsx
│   │   ├── Saved.tsx
│   │   ├── Login.tsx
│   │   └── Signup.tsx
│   ├── hooks/        # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useGyms.ts
│   │   └── useSavedGyms.ts
│   ├── lib/          # Utilities
│   │   ├── firebase.ts
│   │   └── utils.ts
│   ├── types/        # TypeScript types
│   │   ├── gym.ts
│   │   └── user.ts
│   ├── styles/       # Global CSS
│   ├── App.tsx       # Main app component
│   └── main.tsx      # Entry point
├── scripts/
│   └── importGyms.ts  # CSV import script
├── firebase.json      # Firebase config
├── firestore.rules    # Database security rules
├── storage.rules      # Storage security rules
└── package.json
```

## Key Features Implemented

✅ Homepage with search and featured gyms
✅ Advanced search with filters (area, price, amenities)
✅ Gym detail page with pricing, contact, map
✅ Save favorite gyms
✅ Google + Email/Password authentication
✅ Admin dashboard with KPIs
✅ Manage gyms (edit, delete, bulk actions)
✅ Image upload to Firebase Storage
✅ View count and contact click tracking
✅ Mobile-responsive design
✅ Orange (#FF8C42) and Cream (#F5F0E8) theme

## Design System

### Colors
- Primary Orange: `#FF8C42`
- Primary Dark: `#E67835`
- Primary Light: `#FFB17A`
- Cream: `#F5F0E8`
- Cream Dark: `#E8DFD0`

### Components
- All CTAs use orange color
- Cream for secondary backgrounds
- Bold typography (900 weight for logo)
- Smooth transitions and hover effects
- Card-based layout

## Common Tasks

### Add a New Gym Manually

1. Login as admin
2. Go to Admin > Add New Gym
3. Fill in the form
4. Upload up to 5 images
5. Set verified/premium status
6. Save

### Update Gym Information

1. Admin > Manage Gyms
2. Click Edit on any gym
3. Update fields (contact, images, amenities)
4. Save changes

### Make Multiple Gyms Premium

1. Admin > Manage Gyms
2. Select gyms using checkboxes
3. Click "Mark as Premium"

### Export Gym Data

1. Admin > Manage Gyms
2. Click "Export CSV"
3. CSV downloads with all gym data

## Troubleshooting

### "Permission denied" errors
- Check Firebase rules are deployed
- Verify user is authenticated
- For admin operations, ensure `isAdmin: true` in user document

### Images not uploading
- Check Storage rules are deployed
- Verify user has admin permissions
- Check file size (max 5MB recommended)

### Import script fails
- Ensure CSV file is in project root
- Check CSV has correct column names (case-sensitive)
- Verify Firebase credentials in .env

### Build errors
- Delete `node_modules` and reinstall: `npm install --legacy-peer-deps`
- Clear cache: `rm -rf node_modules/.vite`

## Next Steps

1. **Import your gym data** using the CSV script
2. **Create admin account** and set isAdmin flag
3. **Enhance top 20 gyms** with real photos and contact info
4. **Mark 6-8 gyms as premium** for homepage featuring
5. **Test on mobile devices**
6. **Deploy to Firebase Hosting**
7. **Share with users!**

## Support

For issues, check:
- Firebase Console for errors
- Browser console for client errors
- Network tab for API issues

Happy gym discovering! 🏋️💪

