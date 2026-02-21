# Firebase Secrets Storage Location

## Where Firebase Configuration is Stored

### Primary Location: `.env.local` file
**Location**: `/Users/mohitkumar/Personal Projects/bring-the-menu-web/.env.local`

This file contains all your Firebase configuration values:
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

### How It's Used

1. **Environment Variables**: The `.env.local` file is automatically loaded by Next.js
2. **Config File**: `src/lib/firebase/config.ts` reads these environment variables
3. **Client-Side**: Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser

### Security Notes

✅ **Safe to Expose**: These Firebase config values are **public** and safe to expose in client-side code. They are:
- Already visible in your browser's network tab
- Included in your JavaScript bundle
- Not secret credentials

🔒 **Real Security**: Security is enforced through:
- **Firebase Security Rules** (Firestore & Storage)
- **Firebase Authentication** (user permissions)
- **Firebase App Check** (optional, prevents abuse)

⚠️ **Never Commit**: The `.env.local` file is already in `.gitignore` and should **never** be committed to version control.

### For Production Deployment

When deploying to production (Vercel, Netlify, etc.), you need to:

1. **Vercel**: Add environment variables in Project Settings → Environment Variables
2. **Netlify**: Add in Site Settings → Environment Variables
3. **Other platforms**: Add in their respective environment variable settings

### Important Notes

- The `.env.local` file is **local only** and not shared with others
- These are **client-side** Firebase config values (safe to expose)
- **Never** commit `.env.local` to Git (already in `.gitignore`)
- For **server-side** secrets (like Firebase Admin SDK), use server-only environment variables (without `NEXT_PUBLIC_` prefix)

### Viewing Your Current Secrets

To view your current Firebase configuration:
```bash
cat .env.local
```

### Updating Secrets

1. Edit `.env.local` file directly
2. Restart your dev server (`npm run dev`)
3. Clear `.next` cache if needed: `rm -rf .next`
