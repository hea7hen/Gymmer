# 🚀 Razorpay Paywall - Quick Start Guide

## ✅ What's Been Set Up

Your Gymmer app now has a **complete subscription paywall** powered by Razorpay! Here's what's ready:

### Features Implemented:
✅ Two pricing plans (Monthly ₹99, Annual ₹999)
✅ Protected routes for /search and /gym/:slug
✅ Beautiful pricing page
✅ Razorpay payment integration
✅ Subscription tracking in Firestore
✅ Admin bypass (admins get free access)
✅ Homepage CTAs updated to drive to pricing
✅ Firestore security rules deployed
✅ Database indexes optimized

---

## 🎯 How to Test (5 Minutes)

### Step 1: Start the Dev Server

```bash
cd /Users/abhishek/Projects/Gymmer
npm run dev
```

### Step 2: Test the Paywall Flow

1. **Open** http://localhost:5173
2. Click **"View Pricing Plans"** on homepage
3. You'll see the pricing page with 2 plans
4. Click **"Subscribe Now"** on any plan
5. If not logged in, you'll be redirected to login
6. After login, click "Subscribe Now" again

### Step 3: Complete Test Payment

When Razorpay checkout opens:

**Test Card Details:**
- Card Number: `4111 1111 1111 1111`
- Expiry: Any future date (e.g., 12/25)
- CVV: Any 3 digits (e.g., 123)
- Name: Your name

Click **Pay Now**

### Step 4: Verify Access

After successful payment:
- You'll see "Payment successful!" alert
- You'll be redirected to `/search`
- You can now browse all gyms! 🎉

---

## 🔐 Test Different Scenarios

### Scenario 1: User Without Subscription

1. Create a new account or logout
2. Try to visit http://localhost:5173/search
3. You'll see a **paywall screen** with:
   - Lock icon
   - "Subscription Required" message
   - Pricing info
   - "View Pricing Plans" button

### Scenario 2: User With Active Subscription

1. Complete a test payment (as above)
2. Visit http://localhost:5173/search
3. You get **instant access** to gym listings ✅
4. Can view individual gym details
5. Can save favorites

### Scenario 3: Admin User (Bypass Paywall)

1. Open Firebase Console
2. Go to Firestore Database
3. Find your user in `users` collection
4. Add field: `isAdmin: true`
5. Refresh the app
6. You now have **free access** to everything!

---

## 🛣️ Routes Overview

### Public Routes (Anyone can access)
- `/` - Homepage
- `/pricing` - Pricing plans
- `/login` - Login page
- `/signup` - Signup page

### Protected Routes (Subscription required)
- `/search` - Browse gyms ⭐
- `/gym/:slug` - Gym details ⭐

### Admin Routes
- `/admin` - Admin dashboard
- `/admin/gyms` - Manage gyms

---

## 💳 Payment Test Cards

Razorpay provides these test cards:

| Card Number | Outcome |
|-------------|---------|
| 4111 1111 1111 1111 | ✅ Success |
| 4000 0000 0000 0002 | ❌ Declined |
| 5105 1051 0510 5100 | ✅ Success (Mastercard) |

**For all cards:**
- CVV: Any 3 digits
- Expiry: Any future date
- OTP (if asked): 123456

---

## 📊 Check Subscription in Firestore

1. Open Firebase Console
2. Go to **Firestore Database**
3. Look for `subscriptions` collection
4. You'll see your subscription document:
   ```
   {
     userId: "abc123...",
     planType: "monthly" or "annual",
     amount: 99 or 999,
     status: "paid",
     startDate: ...,
     endDate: ...,
     razorpayPaymentId: "pay_..."
   }
   ```

---

## 🎨 User Experience Flow

```
Homepage
   ↓
[View Pricing Plans] button
   ↓
Pricing Page (2 plans)
   ↓
[Subscribe Now] button
   ↓
Login (if not logged in)
   ↓
Razorpay Checkout Modal
   ↓
Payment Success
   ↓
Subscription Created in Firestore
   ↓
User gets access to /search
   ↓
Can browse all gyms! 🎉
```

---

## 🔧 Configuration Files

### Environment Variable (.env)
```bash
VITE_RAZORPAY_KEY_ID=rzp_test_RgUTSG12jeSuAf
```
✅ Already added!

### Firestore Rules
✅ Deployed with subscription permissions

### Firestore Indexes
✅ Deployed for optimized subscription queries

---

## 🐛 Troubleshooting

### Issue: "Payment system is loading" forever
**Solution:** Wait 2-3 seconds for Razorpay script to load from CDN

### Issue: Payment succeeds but still showing paywall
**Solution:** 
1. Check Firestore `subscriptions` collection
2. Verify `status: "paid"` and `endDate` is in future
3. Refresh the page

### Issue: Razorpay checkout not opening
**Solution:**
1. Check browser console for errors
2. Ensure Razorpay script is loaded
3. Check `.env` has `VITE_RAZORPAY_KEY_ID`

### Issue: Getting Firebase permission denied
**Solution:** Firestore rules already deployed. If still happening, run:
```bash
firebase deploy --only firestore:rules
```

---

## 🎯 Next Steps (Optional)

### For Production:
1. **Replace test key with live Razorpay key**
   - Get from Razorpay Dashboard
   - Update in `.env`

2. **Set up webhooks** for automatic payment verification
   - Razorpay Dashboard → Webhooks
   - Add endpoint for payment verification

3. **Add email notifications**
   - Send receipt after successful payment
   - Send reminder before subscription expires

4. **Analytics tracking**
   - Track subscription conversions
   - Monitor payment success rate

---

## 📱 Mobile Testing

The pricing page and payment flow are **fully responsive**:
- Test on mobile viewport in Chrome DevTools
- Razorpay checkout is mobile-optimized
- All buttons and forms work on touch devices

---

## 💰 Pricing Plans Summary

| Feature | Monthly (₹99) | Annual (₹999) |
|---------|---------------|---------------|
| Access Duration | 30 days | 365 days |
| Browse Gyms | ✅ | ✅ |
| Compare Prices | ✅ | ✅ |
| Save Favorites | ✅ | ✅ Unlimited |
| Contact Owners | ✅ | ✅ |
| Savings | - | ₹189 (16% off) |
| Priority Support | ❌ | ✅ |

---

## 🎉 That's It!

Your Razorpay paywall is **100% functional** and ready to test!

**Start testing:** Run `npm run dev` and visit the homepage

**Questions?** Check `RAZORPAY_INTEGRATION.md` for detailed technical docs

---

**Status**: ✅ READY FOR TESTING
**Mode**: TEST MODE (No real charges)
**Test Key**: Active

