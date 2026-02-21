# Firebase Setup Guide

This project uses Firebase for authentication, database (Firestore), and file storage.

## Environment Variables

The Firebase configuration is stored in `.env.local`. Make sure this file exists and contains:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

**Important:** Never commit `.env.local` to version control. It's already added to `.gitignore`.

## Firebase Console Setup

### 1. Authentication

1. Go to Firebase Console → Authentication
2. Enable "Email/Password" authentication method
3. **Enable "Google" authentication method:**
   - Click on "Sign-in method" tab
   - Click on "Google" provider
   - Toggle "Enable" switch
   - Enter your project support email (usually your Firebase project email)
   - Click "Save"
4. (Optional) Configure email templates for password reset

### 2. Firestore Database

1. Go to Firebase Console → Firestore Database
2. Create database in "Production mode" (or "Test mode" for development)
3. Set up security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Restaurants collection
    match /restaurants/{restaurantId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    // Menus collection
    match /menus/{menuId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/restaurants/$(resource.data.restaurantId)).data.userId == request.auth.uid;
    }
    
    // Orders collection
    match /orders/{orderId} {
      allow read: if request.auth != null && 
        get(/databases/$(database)/documents/restaurants/$(resource.data.restaurantId)).data.userId == request.auth.uid;
      allow create: if true; // Allow customers to create orders
      allow update: if request.auth != null && 
        get(/databases/$(database)/documents/restaurants/$(resource.data.restaurantId)).data.userId == request.auth.uid;
    }
    
    // Tables collection
    match /tables/{tableId} {
      allow read: if true; // Public read for QR codes
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/restaurants/$(resource.data.restaurantId)).data.userId == request.auth.uid;
    }
  }
}
```

### 3. Storage

1. Go to Firebase Console → Storage
2. Create storage bucket
3. Set up security rules:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Menu images
    match /menus/{restaurantId}/{allPaths=**} {
      allow read: if true; // Public read
      allow write: if request.auth != null && 
        firestore.get(/databases/(default)/documents/restaurants/$(restaurantId)).data.userId == request.auth.uid;
    }
  }
}
```

## Usage

### Authentication

```typescript
import { useAuth } from '@/hooks/useAuth';

function MyComponent() {
  const { user, restaurant, signUp, signIn, logout } = useAuth();
  
  // Sign up
  await signUp({
    email: 'restaurant@example.com',
    password: 'password123',
    restaurantName: 'My Restaurant'
  });
  
  // Sign in
  await signIn({
    email: 'restaurant@example.com',
    password: 'password123'
  });
  
  // Sign in with Google
  await signInWithGoogle();
  
  // Sign out
  await logout();
}
```

### Firestore Operations

```typescript
import { 
  createMenuItem, 
  getMenuItems, 
  createOrder,
  getRestaurantOrders 
} from '@/lib/firebase/firestore';

// Create menu item
const menuItemId = await createMenuItem(restaurantId, {
  name: 'Pasta Carbonara',
  description: 'Creamy pasta with bacon',
  price: 18.99,
  category: 'Main Course',
  available: true
});

// Get menu items
const items = await getMenuItems(restaurantId);

// Create order
const orderId = await createOrder({
  restaurantId,
  tableNumber: '5',
  items: [/* ... */],
  total: 35.49,
  status: 'pending'
});
```

### Storage Operations

```typescript
import { uploadMenuItemImage } from '@/lib/firebase/storage';

// Upload menu item image
const imageUrl = await uploadMenuItemImage(
  file,
  restaurantId,
  menuItemId
);
```

## Project Structure

```
src/
├── lib/
│   └── firebase/
│       ├── config.ts          # Firebase initialization
│       ├── auth.ts             # Authentication functions
│       ├── firestore.ts        # Firestore operations
│       └── storage.ts          # Storage operations
├── contexts/
│   └── AuthContext.tsx         # Auth context provider
└── hooks/
    └── useAuth.ts              # Auth hook
```

## Security Notes

1. **Never expose Firebase Admin SDK credentials** in client-side code
2. **Always validate data** on the server side (use Cloud Functions for sensitive operations)
3. **Use Firestore security rules** to protect your data
4. **Keep environment variables secure** - never commit them to version control
5. **Enable Firebase App Check** in production to prevent abuse

## Next Steps

1. Set up Firebase Console as described above
2. Test authentication flow
3. Create a dashboard page that uses the authenticated user
4. Implement menu management features
5. Set up real-time order updates using Firestore listeners
