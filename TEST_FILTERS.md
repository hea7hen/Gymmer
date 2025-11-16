# 🧪 Filter Testing Checklist

## Quick Test (2 minutes)

### Test Location Filter

```
1. Open: http://localhost:5173/search
2. Click: "Koramangala (18)"
3. ✅ Should show: 18 gyms
4. Console: "🔍 Filtering by area: Koramangala"
```

### Test Price Filter

```
1. Move slider to: ₹1000 - ₹5000
2. ✅ Should show: Only gyms in that range
3. Console: "💰 Applying price filter: 1000 - 5000"
```

### Test Gym Type

```
1. Click: "Boxing" chip
2. ✅ Should show: Only boxing gyms
3. Console: "🥊 Applying gym type filter: ["boxing"]"
```

### Test Amenities

```
1. Check: "Parking" checkbox
2. ✅ Should show: Only gyms with parking
3. Console: "🏋️ Applying amenity filter: ["parking"]"
```

---

## Comprehensive Test (10 minutes)

### 1. Default State
- [ ] Page loads successfully
- [ ] Shows "140 gyms found"
- [ ] All neighborhoods visible in sidebar
- [ ] Console: "📊 Fetched gyms from Firestore: 140"

### 2. Single Location Filter
- [ ] Click "Koramangala (18)" → Shows 18 gyms
- [ ] Click "Electronic City (16)" → Shows 16 gyms
- [ ] Click "Indiranagar (12)" → Shows 12 gyms
- [ ] Click "Yelahanka (10)" → Shows 10 gyms
- [ ] Click "Sanjay Nagar (10)" → Shows 10 gyms

### 3. Price Range Filter
- [ ] Move min to ₹1000 → Excludes cheaper gyms
- [ ] Move max to ₹5000 → Excludes expensive gyms
- [ ] Set ₹2000-₹4000 → Shows only mid-range
- [ ] Reset to ₹350-₹9000 → Shows all gyms again

### 4. Gym Type Filters
- [ ] Click "Functional" → Shows functional gyms
- [ ] Click "CrossFit" → Shows CrossFit gyms
- [ ] Click "MMA" → Shows MMA gyms
- [ ] Click "Boxing" → Shows boxing gyms
- [ ] Click "Yoga" → Shows yoga studios
- [ ] Click "Powerlifting" → Shows powerlifting gyms
- [ ] Select multiple types → Shows gyms with ANY selected type

### 5. Amenity Filters
- [ ] Check "Parking" → Shows gyms with parking
- [ ] Check "AC" → Shows air-conditioned gyms
- [ ] Check "Showers" → Shows gyms with showers
- [ ] Check "Lockers" → Shows gyms with lockers
- [ ] Check multiple → Shows gyms with ALL selected amenities

### 6. Combined Filters
- [ ] Koramangala + ₹2000-₹5000 → Shows matching gyms
- [ ] Indiranagar + "Parking" → Shows gyms with parking in Indiranagar
- [ ] "CrossFit" + ₹3000-₹6000 → Shows CrossFit gyms in price range
- [ ] Whitefield + "AC" + "Parking" → Shows AC gyms with parking

### 7. Sorting
- [ ] Sort by "Featured First" → Premium gyms at top
- [ ] Sort by "Price: Low to High" → Cheapest first
- [ ] Sort by "Price: High to Low" → Most expensive first
- [ ] Sort by "Neighborhood" → Alphabetical by area
- [ ] Sort by "Newest First" → Recently added first

### 8. Clear Filters
- [ ] Apply multiple filters
- [ ] Click "Clear All" in sidebar
- [ ] All filters reset
- [ ] Shows all 140 gyms

### 9. Mobile Responsiveness
- [ ] Open on mobile viewport
- [ ] Click "Show Filters" button
- [ ] Filters sidebar appears
- [ ] Apply filters works
- [ ] Click "Hide Filters"
- [ ] Filters hide, results still show

### 10. Pagination
- [ ] Apply filter showing 20+ gyms
- [ ] Scroll to bottom
- [ ] See pagination buttons
- [ ] Click "Next" → Shows next page
- [ ] Click "Previous" → Shows previous page
- [ ] Click page number → Jumps to that page

### 11. Edge Cases
- [ ] Select location with 0 gyms (if any)
- [ ] Set price range that excludes all gyms
- [ ] Select rare amenity combination
- [ ] Multiple filters resulting in 0 results
- [ ] Clear filters from 0 results state

### 12. URL Parameters
- [ ] Click neighborhood from homepage
- [ ] URL shows `?area=Koramangala`
- [ ] Filter automatically applied
- [ ] Refresh page → Filter persists
- [ ] Clear filter → URL parameter removed

---

## Expected Console Output (Example)

When filtering Koramangala + Parking + ₹2000-₹6000:

```
🔍 Filtering by area: Koramangala
📊 Fetched gyms from Firestore: 18
💰 Applying price filter: 2000 - 6000
💰 After price filter: 15 (filtered out 3)
🏋️ Applying amenity filter: ["parking"]
🏋️ After amenity filter: 12 (filtered out 3)
✅ Final gym count: 12
```

---

## Performance Checks

- [ ] Filters respond instantly (< 100ms)
- [ ] No lag when changing filters
- [ ] Smooth animations
- [ ] No console errors
- [ ] React Query cache working (same query doesn't refetch)

---

## Bug Checklist (Should NOT happen)

- [ ] ❌ Selecting location shows 0 results (when gyms exist)
- [ ] ❌ Price filter excludes gyms without pricing
- [ ] ❌ Amenity filter crashes on null data
- [ ] ❌ Gym type filter doesn't work
- [ ] ❌ Sort crashes on missing price
- [ ] ❌ Clear filters doesn't reset everything
- [ ] ❌ Console errors appear
- [ ] ❌ Infinite loading state

---

## Test Results Template

```
Date: ___________
Tester: ___________

PASS [ ] / FAIL [ ]

Issues found:
1. _________________________
2. _________________________
3. _________________________

Notes:
_________________________
_________________________
```

---

**All filters should work perfectly now!** 🎉

Open browser console to see debug logs while testing.

