# Update Razorpay to Live Keys

## ⚠️ Important: Update Your Environment Variables

You need to update your `.env` file with the new **live Razorpay keys**:

### New Live Keys:
```
VITE_RAZORPAY_KEY_ID=rzp_live_RgoIqAeKy5eFsR
VITE_RAZORPAY_KEY_SECRET=jXGuo3REgGFj2tPwOJjA9oiK
```

### Steps:

1. **Update `.env` file** in the project root:
   ```env
   VITE_RAZORPAY_KEY_ID=rzp_live_RgoIqAeKy5eFsR
   ```

2. **Update Vercel Environment Variables** (if deployed):
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Update `VITE_RAZORPAY_KEY_ID` to: `rzp_live_RgoIqAeKy5eFsR`
   - Redeploy your application

3. **Note**: The secret key (`jXGuo3REgGFj2tPwOJjA9oiK`) is only used on the backend/server-side. Since this is a client-side app, you only need the Key ID in the frontend.

### Important Reminders:

- ✅ **Live keys** will process real payments
- ✅ Make sure Razorpay is configured for production in your Razorpay dashboard
- ✅ Test thoroughly before going live
- ✅ The secret key should NEVER be exposed in client-side code

### Testing:

After updating, test the payment flow:
1. Go to `/pricing`
2. Click "Subscribe Now"
3. Use a real payment method (or test card if still in test mode)
4. Verify payment completion

---

**Note**: The code in `src/pages/Pricing.tsx` already uses `import.meta.env.VITE_RAZORPAY_KEY_ID`, so it will automatically pick up the new value from your `.env` file after you update it.

