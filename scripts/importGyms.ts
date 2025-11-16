import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';
import Papa from 'papaparse';
import fs from 'fs';
import { CSVGym } from '../src/types/gym';

// Initialize Firebase for Node.js environment
const firebaseConfig = {
  apiKey: "AIzaSyCo6SoM8heFg685KWfGJWYNyq3wgX_BMsY",
  authDomain: "gymmer-aac12.firebaseapp.com",
  projectId: "gymmer-aac12",
  storageBucket: "gymmer-aac12.firebasestorage.app",
  messagingSenderId: "12358863442",
  appId: "1:12358863442:web:86213b5d58955ada85ad8b",
  measurementId: "G-C38MRGH2QV"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Bangalore neighborhood coordinates (approximate center points)
const NEIGHBORHOOD_COORDS: Record<string, { lat: number; lng: number }> = {
  'Koramangala': { lat: 12.9352, lng: 77.6245 },
  'Jayanagar': { lat: 12.9250, lng: 77.5838 },
  'HSR Layout': { lat: 12.9116, lng: 77.6473 },
  'Indiranagar': { lat: 12.9719, lng: 77.6412 },
  'Whitefield': { lat: 12.9698, lng: 77.7499 },
  'Marathahalli': { lat: 12.9591, lng: 77.7009 },
  'Sarjapur Road': { lat: 12.9086, lng: 77.6855 },
  'Yelahanka': { lat: 13.1007, lng: 77.5963 },
  'Hebbal': { lat: 13.0358, lng: 77.5970 },
  'RT Nagar': { lat: 13.0299, lng: 77.5963 },
  'Sanjay Nagar': { lat: 13.0172, lng: 77.5745 },
  'Kaval Byrasandra': { lat: 13.0091, lng: 77.6334 },
  'Seshadripuram': { lat: 12.9896, lng: 77.5707 },
  'Rajajinagar': { lat: 12.9916, lng: 77.5549 },
  'Malleswaram': { lat: 13.0001, lng: 77.5707 },
  'Srirampura': { lat: 12.9852, lng: 77.5487 },
  'Basaveshwara Nagar': { lat: 12.9763, lng: 77.5416 },
  'Electronic City': { lat: 12.8456, lng: 77.6603 },
  'Bannerghatta Road': { lat: 12.8996, lng: 77.5977 },
  'Kumaraswamy Layout': { lat: 12.9147, lng: 77.5481 },
  'Uttarahalli': { lat: 12.9049, lng: 77.5295 },
  'JP Nagar': { lat: 12.9081, lng: 77.5856 },
  'Banashankari': { lat: 12.9250, lng: 77.5484 },
  'Munnekollal': { lat: 12.9698, lng: 77.6951 },
};

// Default amenities based on gym type/price
function inferAmenities(price: number, notes: string): string[] {
  const amenities: string[] = [];
  
  // Basic amenities for all gyms
  amenities.push('weights', 'cardio');
  
  // Price-based inference
  if (price >= 3000) {
    amenities.push('ac', 'lockers', 'showers', 'personal_training');
  } else if (price >= 1500) {
    amenities.push('lockers', 'showers');
  }
  
  // Notes-based inference
  const notesLower = notes.toLowerCase();
  if (notesLower.includes('crossfit') || notesLower.includes('functional')) {
    amenities.push('functional_training');
  }
  if (notesLower.includes('mma') || notesLower.includes('boxing')) {
    amenities.push('boxing');
  }
  if (notesLower.includes('parking')) {
    amenities.push('parking');
  }
  if (notesLower.includes('steam')) {
    amenities.push('steam');
  }
  if (notesLower.includes('pool') || notesLower.includes('swimming')) {
    amenities.push('swimming');
  }
  
  return [...new Set(amenities)]; // Remove duplicates
}

function inferGymTypes(name: string, notes: string): string[] {
  const types: string[] = [];
  const combined = (name + ' ' + notes).toLowerCase();
  
  if (combined.includes('crossfit') || combined.includes('functional')) {
    types.push('crossfit');
  }
  if (combined.includes('mma') || combined.includes('boxing')) {
    types.push('boxing');
  }
  if (combined.includes('ladies') || combined.includes('women')) {
    types.push('ladies_only');
  }
  if (combined.includes('yoga') || combined.includes('pilates')) {
    types.push('yoga');
  }
  if (types.length === 0) {
    types.push('general');
  }
  
  return types;
}

function parsePrice(priceStr: string): number | null {
  if (!priceStr || priceStr === 'NA') return null;
  
  // Handle ranges like "3100-3300" - take average
  if (priceStr.includes('-')) {
    const [min, max] = priceStr.split('-').map(s => parseInt(s.replace(/[^0-9]/g, '')));
    return Math.round((min + max) / 2);
  }
  
  // Parse single number
  const num = parseInt(priceStr.replace(/[^0-9]/g, ''));
  return isNaN(num) ? null : num;
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

async function importGyms() {
  const csvPath = './bangalore_gyms_data.csv';
  
  if (!fs.existsSync(csvPath)) {
    console.error('CSV file not found at:', csvPath);
    console.log('Please place your bangalore_gyms_data.csv file in the project root directory.');
    return;
  }
  
  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  
  Papa.parse(csvContent, {
    header: true,
    complete: async (results) => {
      const gyms = results.data as CSVGym[];
      
      console.log(`Importing ${gyms.length} gyms...`);
      
      for (const gym of gyms) {
        if (!gym.GymName) continue; // Skip empty rows
        
        const monthlyPrice = parsePrice(gym.MonthlyPrice);
        const quarterlyPrice = parsePrice(gym.QuarterlyPrice);
        const yearlyPrice = parsePrice(gym.YearlyPrice);
        
        // Skip if no pricing data at all
        if (!monthlyPrice && !quarterlyPrice && !yearlyPrice) {
          console.log(`Skipping ${gym.GymName} - no pricing data`);
          continue;
        }
        
        const coords = NEIGHBORHOOD_COORDS[gym.Neighborhood] || { lat: 12.9716, lng: 77.5946 };
        
        const gymData = {
          name: gym.GymName,
          slug: generateSlug(gym.GymName),
          
          // Location
          area: gym.Neighborhood,
          address: gym.Address,
          coordinates: coords,
          
          // Contact (placeholder - add real data later)
          phone: '',
          whatsapp: '',
          email: '',
          instagram: '',
          website: '',
          
          // Pricing
          pricing: {
            monthly: monthlyPrice,
            quarterly: quarterlyPrice,
            annual: yearlyPrice,
          },
          
          // Features (inferred)
          amenities: inferAmenities(monthlyPrice || 2000, gym.Notes),
          gymTypes: inferGymTypes(gym.GymName, gym.Notes),
          
          // Media (placeholder)
          images: [
            'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
          ],
          coverImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
          
          // Metadata
          isVerified: false,
          isPremium: false,
          rating: 0,
          
          // Hours (placeholder)
          hours: {
            monday: '6:00 AM - 10:00 PM',
            tuesday: '6:00 AM - 10:00 PM',
            wednesday: '6:00 AM - 10:00 PM',
            thursday: '6:00 AM - 10:00 PM',
            friday: '6:00 AM - 10:00 PM',
            saturday: '7:00 AM - 9:00 PM',
            sunday: '7:00 AM - 9:00 PM',
          },
          
          // Description (from notes)
          description: gym.Notes || 
            `${gym.GymName} is located in ${gym.Neighborhood}, Bangalore. A quality fitness center with modern equipment and experienced trainers.`,
          
          // Tracking
          viewCount: 0,
          contactClickCount: 0,
          
          // Source
          source: gym.Source,
          
          // Timestamps
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
          createdBy: 'import_script',
        };
        
        try {
          const docRef = await addDoc(collection(db, 'gyms'), gymData);
          console.log(`✓ Imported: ${gym.GymName} (${docRef.id})`);
        } catch (error) {
          console.error(`✗ Failed to import ${gym.GymName}:`, error);
        }
      }
      
      console.log('Import complete!');
    },
  });
}

// Run import
importGyms();

