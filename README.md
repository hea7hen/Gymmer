# Gymmer - Find Your Perfect Gym in Bangalore

A web app to discover independent gyms in Bangalore (non-Cult.fit) with real data, pricing, and amenities.

## Features

- 🏋️ Browse 90+ verified gyms across Bangalore
- 🔍 Search and filter by area, price, amenities
- 💰 Compare pricing (monthly, quarterly, annual)
- ❤️ Save favorite gyms
- 📊 Admin panel for gym management
- 📱 Mobile-responsive design

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Backend**: Firebase (Firestore, Auth, Storage, Hosting)
- **State Management**: React Query
- **Routing**: React Router v6
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Firebase account

### Installation

1. Clone the repository:
```bash
git clone <repo-url>
cd Gymmer
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with your Firebase credentials:
```bash
cp .env.example .env
```

Then edit `.env` with your Firebase project credentials.

4. Start the development server:
```bash
npm run dev
```

### Importing Gym Data

1. Place your `bangalore_gyms_data.csv` file in the project root

2. Run the import script:
```bash
npm run import-gyms
```

This will import all gyms from the CSV into Firestore.

## Project Structure

```
src/
├── components/       # Reusable UI components
├── pages/           # Page components
│   ├── admin/      # Admin panel pages
│   └── ...         # Public pages
├── hooks/          # Custom React hooks
├── lib/            # Utility functions and Firebase config
├── types/          # TypeScript type definitions
└── styles/         # Global styles

scripts/
└── importGyms.ts   # CSV import script

public/             # Static assets
```

## Firebase Setup

1. Create a new Firebase project at https://console.firebase.google.com

2. Enable the following services:
   - Authentication (Email/Password and Google)
   - Firestore Database
   - Storage
   - Hosting

3. Copy your Firebase config to `.env`

4. Deploy Firestore rules and indexes:
```bash
firebase deploy --only firestore:rules,firestore:indexes,storage
```

## Deployment

Build and deploy to Firebase Hosting:

```bash
npm run build
firebase deploy --only hosting
```

## Admin Access

To make a user an admin:

1. Sign up/login to the app
2. Go to Firestore Console
3. Find your user document in the `users` collection
4. Set `isAdmin: true`

## CSV Data Format

The import script expects CSV with these columns:
- GymName
- Neighborhood
- Address
- MonthlyPrice
- QuarterlyPrice
- YearlyPrice
- Notes
- Source

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.
