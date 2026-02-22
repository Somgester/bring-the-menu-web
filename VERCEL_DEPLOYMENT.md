# Vercel Deployment Guide

## Environment Variables Setup

To fix the UI issues on Vercel, you need to configure Firebase environment variables in your Vercel project settings.

### Steps to Add Environment Variables:

1. **Go to Vercel Dashboard**
   - Navigate to your project: `bring-the-menu-web`
   - Click on **Settings** → **Environment Variables**

2. **Add the following environment variables:**

   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id_here
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id_here
   ```

3. **Get your Firebase config values:**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Select your project: `bring-the-menu`
   - Go to **Project Settings** → **General**
   - Scroll down to **Your apps** section
   - Click on the web app (or create one if needed)
   - Copy the config values from the `firebaseConfig` object

4. **Set Environment for each variable:**
   - Select **Production**, **Preview**, and **Development** for all variables
   - This ensures they work in all environments

5. **Redeploy:**
   - After adding variables, go to **Deployments**
   - Click the **⋯** menu on the latest deployment
   - Click **Redeploy**
   - Or push a new commit to trigger a new deployment

### Common Issues:

#### Issue 1: Empty Menu Items / Images Not Loading
**Cause:** Firebase environment variables not configured in Vercel
**Solution:** Add all `NEXT_PUBLIC_FIREBASE_*` variables as shown above

#### Issue 2: UI Looks Different from Localhost
**Cause:** The restaurant page was showing hardcoded data instead of fetching from Firebase
**Solution:** The code has been updated to fetch real data. Make sure environment variables are set.

#### Issue 3: Images Not Displaying
**Cause:** External image domains not configured in `next.config.ts`
**Solution:** Already configured. If issues persist, check browser console for CORS errors.

### Verification:

After redeploying, check:
1. Open your Vercel deployment URL
2. Open browser DevTools → Console
3. Look for Firebase initialization errors
4. Check Network tab for failed Firebase requests
5. Verify menu items load from Firestore

### Quick Checklist:

- [ ] All 6 Firebase environment variables added to Vercel
- [ ] Variables set for Production, Preview, and Development
- [ ] Redeployed after adding variables
- [ ] Checked browser console for errors
- [ ] Verified menu items load correctly

### How to Check if Variables are Set:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. You should see all 6 `NEXT_PUBLIC_FIREBASE_*` variables listed
3. Each should have values (not empty)
4. Each should be enabled for Production, Preview, and Development

### If You Still See Empty Boxes:

1. **Open Browser Console** (F12 or Right-click → Inspect → Console)
2. Look for errors starting with "Firebase" or "Missing"
3. Check if you see: "Firebase is not configured" message
4. If yes → Environment variables are missing in Vercel
5. If no → Check Network tab for failed Firebase requests

### Common Error Messages:

- **"Firebase is not configured"** → Add environment variables in Vercel
- **"Restaurant not found"** → Check if restaurant ID in URL matches your Firebase database
- **"Failed to load menu"** → Check Firebase Security Rules allow read access
- **Empty menu items** → No items added yet, or Firebase connection issue
