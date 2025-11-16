# 💳 Razorpay Test Credentials & Guide

## Important: No Test Account Required!

**Razorpay does NOT require users to create test accounts or login to test payments.**

Users simply use **test card numbers** during checkout to simulate payments.

---

## 🎴 Test Card Numbers (For Users)

When testing payment on your site, use these test cards:

### ✅ Successful Payment

**Card Number**: `4111 1111 1111 1111`
- **CVV**: Any 3 digits (e.g., `123`)
- **Expiry**: Any future date (e.g., `12/25`)
- **Cardholder Name**: Any name (e.g., `Test User`)

**Result**: Payment succeeds ✅

### ❌ Failed Payment (Declined)

**Card Number**: `4000 0000 0000 0002`
- **CVV**: Any 3 digits
- **Expiry**: Any future date

**Result**: Payment fails with "Card declined" ❌

### ✅ Alternative Success Cards

**Mastercard**: `5105 1051 0510 5100`
- **CVV**: Any 3 digits
- **Expiry**: Any future date

**Visa**: `4012 8888 8888 1881`
- **CVV**: Any 3 digits
- **Expiry**: Any future date

---

## 💰 Test UPI (Optional)

If you enable UPI payments:

**UPI ID**: `success@razorpay`
**Result**: Payment succeeds

**UPI ID**: `failure@razorpay`
**Result**: Payment fails

---

## 📱 Test Wallets (Optional)

If you enable wallet payments:

**Phone Number**: `9999999999`
**OTP**: `0007`
**Result**: Payment succeeds

---

## 🎯 Test Payment Flow (Step-by-Step)

### For Your Users:

1. Visit: `http://localhost:5173/pricing`
2. Click: "Subscribe Now" (₹10)
3. Login/Signup if needed
4. Razorpay checkout modal opens
5. Enter test card:
   ```
   Card: 4111 1111 1111 1111
   CVV: 123
   Expiry: 12/25
   Name: Test User
   ```
6. Click "Pay ₹10"
7. Payment succeeds ✅
8. Redirected to /search
9. Access granted!

---

## 🔑 Razorpay Dashboard Access

**Your Razorpay Account:**
- Email: (Your email used to create Razorpay account)
- Password: (Your Razorpay account password)
- Dashboard: https://dashboard.razorpay.com

**Test Mode Key (Already configured):**
```
Key ID: rzp_test_RgUTSG12jeSuAf
Key Secret: qXdjIud1G4GKj0OMJCvuh0bd
```

**Note**: Key Secret should NEVER be exposed in frontend code. Only use Key ID.

---

## 🧪 Test Scenarios

### Scenario 1: Successful Payment
```
User: test@example.com (any email)
Card: 4111 1111 1111 1111
CVV: 123
Expected: Payment succeeds, user gets access
```

### Scenario 2: Declined Card
```
User: test@example.com
Card: 4000 0000 0000 0002
CVV: 123
Expected: Payment fails with error message
```

### Scenario 3: Existing Subscription
```
User: Already paid once
Action: Try to subscribe again
Expected: "You already have an active subscription!"
```

### Scenario 4: Admin User
```
User: Admin (isAdmin: true in Firestore)
Action: Visit /search without paying
Expected: Access granted (bypass paywall)
```

---

## 📊 Verify Payment in Dashboard

After test payment:

1. Go to: https://dashboard.razorpay.com
2. Login with your credentials
3. Select: "Test Mode" (top right)
4. Go to: Transactions → Payments
5. See your test payment listed

---

## 🔍 Debug Payment Issues

### Issue: Payment modal doesn't open
**Check:**
- Browser console for errors
- Razorpay script loaded (`window.Razorpay` exists)
- Key ID is correct in `.env`

### Issue: Payment succeeds but no access
**Check:**
1. Browser console for errors
2. Firestore → `subscriptions` collection
3. Document has `status: "paid"`
4. User is logged in (check `userId`)

### Issue: "Invalid key ID"
**Solution:**
- Verify `VITE_RAZORPAY_KEY_ID` in `.env`
- Restart dev server after changing `.env`

---

## 🎓 For Documentation/Support

### Sample Test Credentials (For your users/testers):

**Email**: `test@gymmer.com` (they create this)
**Password**: `TestPassword123` (they set this)

**Payment Card**: `4111 1111 1111 1111`
**CVV**: `123`
**Expiry**: `12/25`

**Amount**: ₹10
**Access**: Lifetime

---

## 🚀 Production Transition

When going live, replace test key with live key:

**Current (Test Mode):**
```env
VITE_RAZORPAY_KEY_ID=rzp_test_RgUTSG12jeSuAf
```

**Production (Live Mode):**
```env
VITE_RAZORPAY_KEY_ID=rzp_live_YOUR_LIVE_KEY_HERE
```

**Where to get Live Key:**
1. Go to Razorpay Dashboard
2. Switch to "Live Mode"
3. Go to: Settings → API Keys
4. Generate Live Key
5. Copy Key ID (NOT the secret!)
6. Update in Vercel environment variables

---

## ⚠️ Security Notes

### ✅ Safe to Expose:
- Razorpay Key ID (starts with `rzp_test_` or `rzp_live_`)
- Test card numbers
- Test UPI IDs

### ❌ NEVER Expose:
- Razorpay Key Secret
- Razorpay account password
- Production/Live Key Secret
- User passwords
- Firebase Admin SDK keys

---

## 📝 Quick Test Checklist

- [ ] Visit pricing page
- [ ] Click Subscribe Now
- [ ] Login/signup works
- [ ] Razorpay modal opens
- [ ] Enter test card: 4111 1111 1111 1111
- [ ] Payment succeeds
- [ ] Redirected to /search
- [ ] Can browse gyms
- [ ] Check Firestore: subscription created
- [ ] Check Razorpay Dashboard: payment recorded

---

## 💡 Testing Tips

1. **Clear test data**: Delete subscription docs in Firestore between tests
2. **Use different emails**: Test multiple user flows
3. **Test failures**: Use decline card to test error handling
4. **Mobile testing**: Test on actual mobile devices
5. **Network throttling**: Test on slow connections

---

## 🎯 Common Test Cards Summary

| Card Number | Type | CVV | Result |
|-------------|------|-----|--------|
| 4111 1111 1111 1111 | Visa | Any | ✅ Success |
| 5105 1051 0510 5100 | Mastercard | Any | ✅ Success |
| 4012 8888 8888 1881 | Visa | Any | ✅ Success |
| 4000 0000 0000 0002 | Visa | Any | ❌ Declined |

**Expiry**: Any future date works (e.g., 12/25, 12/30)
**CVV**: Any 3 digits work (e.g., 123, 456, 789)

---

## 📞 Support

**Razorpay Docs**: https://razorpay.com/docs/
**Test Cards**: https://razorpay.com/docs/payments/payments/test-card-details/
**Support**: support@razorpay.com

---

**Summary**: No test account needed! Just use card `4111 1111 1111 1111` with any CVV and future expiry date. 🎉

