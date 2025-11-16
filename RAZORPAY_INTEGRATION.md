# 💳 Razorpay Paywall Integration

## Overview

Gymmer now includes a **subscription-based paywall** powered by Razorpay. Users must subscribe to access the gym discovery features.

## Features Implemented

### 1. **Subscription Plans**
- **Monthly Plan**: ₹99/month
  - 30 days access
  - All basic features
  
- **Annual Plan**: ₹999/year ⭐ POPULAR
  - 365 days access
  - Save ₹189 (16% off)
  - Priority support

### 2. **Protected Routes**
The following routes require an active subscription:
- `/search` - Browse and filter gyms
- `/gym/:slug` - View gym details

**Exceptions:**
- Admin users have free access to all features
- Home page and pricing page are public

### 3. **Payment Flow**

```
1. User visits /pricing
2. Clicks "Subscribe Now" on a plan
3. Razorpay checkout modal opens
4. User completes payment
5. Subscription record created in Firestore
6. User gets immediate access to gym features
```

### 4. **Files Created**

#### Types
- `src/types/subscription.ts` - Subscription data models and pricing plans

#### Hooks
- `src/hooks/useSubscription.ts` - Check subscription status and access rights

#### Pages
- `src/pages/Pricing.tsx` - Beautiful pricing page with plan comparison

#### Components
- `src/components/ProtectedRoute.tsx` - Route guard component

## Configuration

### Environment Variables

Add to `.env`:
```bash
VITE_RAZORPAY_KEY_ID=rzp_test_RgUTSG12jeSuAf
```

### Firestore Schema

**Collection**: `subscriptions`

```typescript
{
  userId: string;              // Firebase Auth user ID
  planType: 'monthly' | 'annual';
  amount: number;              // Amount in INR
  razorpayOrderId: string;     // Razorpay order ID
  razorpayPaymentId: string;   // Razorpay payment ID
  razorpaySignature: string;   // Payment signature
  status: 'created' | 'paid' | 'failed';
  startDate: Timestamp;
  endDate: Timestamp;
  createdAt: Timestamp;
}
```

### Firestore Security Rules

```javascript
match /subscriptions/{subscriptionId} {
  allow read: if request.auth != null && resource.data.userId == request.auth.uid;
  allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
  allow update: if request.auth != null && resource.data.userId == request.auth.uid;
}
```

### Firestore Indexes

Composite index for subscription queries:
- `userId` (ASC) + `status` (ASC) + `endDate` (DESC)

## How It Works

### Access Control Logic

```typescript
// User has access if:
1. User is an admin (user.isAdmin === true), OR
2. User has active subscription:
   - status === 'paid'
   - endDate > current date
```

### Protected Route Behavior

When a user tries to access a protected route:

1. **Not logged in** → Redirect to `/login`
2. **Logged in but no subscription** → Show paywall screen with pricing info
3. **Active subscription or admin** → Grant access

### Payment Integration

Using **Razorpay Test Mode**:
- Key ID: `rzp_test_RgUTSG12jeSuAf`
- Payments are in test mode and won't charge real money

#### Test Cards:
- **Success**: 4111 1111 1111 1111
- **Failure**: 4000 0000 0000 0002
- Any future CVV and valid expiry date

## User Experience

### Homepage Updates
- Main CTA button → "View Pricing Plans" (links to `/pricing`)
- Secondary CTA → "Create Free Account" (links to `/signup`)
- Featured gym section → "Get Started Now" (links to `/pricing`)

### Navigation
- New "Pricing" link in header navigation
- Links updated across the app to direct users to pricing

### Pricing Page Features
- Professional design matching Planet Fitness/Cult.fit style
- Side-by-side plan comparison
- "MOST POPULAR" badge on annual plan
- Feature list for each plan
- FAQ section
- Trust indicators (Secure payment, No hidden charges)
- Real-time payment processing with loading states

## Admin Privileges

Admin users bypass the paywall:
- Can access all routes without subscription
- Useful for content management and moderation
- Set `isAdmin: true` in user document in Firestore

## Testing the Integration

### Test the Paywall:

1. **Create a regular user account** (not admin)
2. Try to access `/search` → Should see paywall screen
3. Click "View Pricing Plans"
4. Select a plan and click "Subscribe Now"
5. Use test card: `4111 1111 1111 1111`
6. Complete payment
7. Should redirect to `/search` with full access

### Test Access Control:

```bash
# Without subscription
Visit /search → Paywall screen

# With active subscription
Visit /search → Full gym listing

# Admin user
Visit /search → Full access (no subscription needed)
```

## Subscription Status Check

Users can check their subscription status:
- Visit `/pricing` when logged in
- If active subscription, shows:
  - Plan type
  - Expiry date
  - "Browse Gyms" button

## Analytics Events (Future Enhancement)

Consider tracking:
- `subscription_started`
- `payment_success`
- `payment_failure`
- `subscription_expired`
- `paywall_viewed`

## Production Checklist

Before going live:

- [ ] Replace Razorpay test key with live key
- [ ] Update `.env` with production key
- [ ] Set up Razorpay webhook for automatic payment verification
- [ ] Add email notifications for successful payments
- [ ] Set up subscription expiry notifications
- [ ] Enable Razorpay payment methods (UPI, Cards, Netbanking, Wallets)
- [ ] Configure payment retry logic for failed payments
- [ ] Add invoice generation
- [ ] Set up refund policy and implementation

## Support & Troubleshooting

### Common Issues

**1. "Payment system is loading" message:**
- Razorpay script not loaded yet
- Wait a few seconds and try again

**2. Payment succeeds but no access:**
- Check Firestore subscription document
- Verify `status` is 'paid'
- Check `endDate` is in future

**3. Admin not bypassing paywall:**
- Verify `isAdmin: true` in users collection
- Check Firestore security rules

### Manual Subscription Grant

To manually grant a user subscription:

```javascript
// In Firebase Console > Firestore
// Create document in 'subscriptions' collection:
{
  userId: "USER_FIREBASE_UID",
  planType: "annual",
  amount: 999,
  razorpayOrderId: "manual_grant",
  razorpayPaymentId: "manual_grant",
  status: "paid",
  startDate: NOW,
  endDate: NOW + 365 days,
  createdAt: NOW
}
```

## Security Notes

- Payment processing happens client-side
- Subscription verification uses Firestore security rules
- Admin status stored in Firestore (not in JWT)
- All sensitive routes protected with ProtectedRoute component
- No payment secrets exposed in frontend code

---

**Integration Status**: ✅ Complete and Ready for Testing

**Test Mode**: Active (using Razorpay test credentials)

