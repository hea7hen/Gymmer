# 💳 Test Payment Instructions

## Quick Test (2 minutes)

### Step 1: Visit Pricing Page
```
http://localhost:5173/pricing
```

### Step 2: Click "Subscribe Now"
Choose either plan (Monthly ₹99 or Annual ₹999)

### Step 3: Login if needed
Create account or login with existing account

### Step 4: Complete Payment

**Razorpay Test Card:**
```
Card Number: 4111 1111 1111 1111
Expiry:      12/25 (any future date)
CVV:         123 (any 3 digits)
Name:        Your Name
```

### Step 5: Verify Success
✅ Alert: "Payment successful!"
✅ Redirected to /search
✅ Can browse all gyms

---

## Alternative Test Cards

### Mastercard
```
Card: 5105 1051 0510 5100
CVV:  123
```

### Failed Payment Test
```
Card: 4000 0000 0000 0002
CVV:  123
```

### UPI Test
```
UPI ID: success@razorpay
```

---

## Verify in Firebase

1. Open Firebase Console
2. Go to Firestore
3. Check `subscriptions` collection
4. Find your subscription with `status: "paid"`

---

**All payments are in TEST MODE - no real money charged!**

