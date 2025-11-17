# Enable Email/Password Authentication in Firebase

The `auth/invalid-credential` error usually means **Email/Password authentication is not enabled** in your Firebase Console.

## Steps to Enable Email/Password Authentication:

1. **Go to Firebase Console**
   - Visit: https://console.firebase.google.com/
   - Select your project: `gymmer-aac12`

2. **Navigate to Authentication**
   - Click on **"Authentication"** in the left sidebar
   - If you haven't set it up, click **"Get Started"**

3. **Enable Email/Password Sign-in Method**
   - Click on the **"Sign-in method"** tab
   - Find **"Email/Password"** in the list
   - Click on it
   - Toggle **"Enable"** to ON
   - Click **"Save"**

4. **Optional: Enable Email Link (Passwordless)**
   - You can also enable "Email link (passwordless sign-in)" if you want, but it's not required

## After Enabling:

1. Try signing in again with your email and password
2. If you don't have an account yet, use the **Sign Up** page to create one first

## Common Issues:

### Issue 1: "Invalid email or password"
- **Solution**: Make sure you've created an account first using the Sign Up page
- The email must be registered before you can sign in

### Issue 2: "Email/Password authentication is not enabled"
- **Solution**: Follow the steps above to enable it in Firebase Console

### Issue 3: "User not found"
- **Solution**: You need to sign up first at `/signup` before you can sign in

## Test Account Creation:

1. Go to `/signup` page
2. Enter:
   - Name: Your name
   - Email: your@email.com
   - Password: (at least 6 characters)
   - Confirm Password: (same as password)
3. Click "Sign Up"
4. Then go to `/login` and sign in with the same credentials

---

**Note**: If you're still getting errors after enabling Email/Password authentication, make sure:
- Your Firebase project is correctly configured
- The `.env` file has the correct Firebase credentials
- You're using the correct email and password that you registered with

