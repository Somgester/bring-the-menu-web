import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

// Firebase configuration
// Note: These values are public and safe to expose in client-side code
// Security is enforced through Firebase Security Rules, not by hiding these values
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
};

// Validate configuration
function validateConfig() {
  const missing: string[] = [];
  
  if (!firebaseConfig.apiKey) missing.push("NEXT_PUBLIC_FIREBASE_API_KEY");
  if (!firebaseConfig.authDomain) missing.push("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN");
  if (!firebaseConfig.projectId) missing.push("NEXT_PUBLIC_FIREBASE_PROJECT_ID");
  if (!firebaseConfig.storageBucket) missing.push("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET");
  if (!firebaseConfig.messagingSenderId) missing.push("NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID");
  if (!firebaseConfig.appId) missing.push("NEXT_PUBLIC_FIREBASE_APP_ID");

  if (missing.length > 0) {
    console.error("Firebase Config Validation Failed");
    console.error("Missing variables:", missing);
    console.error("Raw process.env check:", {
      apiKey: typeof process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: typeof process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: typeof process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: typeof process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: typeof process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: typeof process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    });
    console.error("Config values:", {
      apiKey: firebaseConfig.apiKey || "undefined",
      authDomain: firebaseConfig.authDomain || "undefined",
      projectId: firebaseConfig.projectId || "undefined",
      storageBucket: firebaseConfig.storageBucket || "undefined",
      messagingSenderId: firebaseConfig.messagingSenderId || "undefined",
      appId: firebaseConfig.appId || "undefined",
    });
    throw new Error(
      `Missing Firebase environment variables: ${missing.join(", ")}. ` +
      `Ensure .env.local exists in the project root and restart your dev server completely.`
    );
  }
}

// Initialize Firebase lazily
let app: FirebaseApp | null = null;

function getFirebaseApp(): FirebaseApp {
  if (!app) {
    validateConfig();
    
    if (getApps().length === 0) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApps()[0];
    }
  }
  return app;
}

// Initialize services lazily
let authInstance: Auth | null = null;
let dbInstance: Firestore | null = null;
let storageInstance: FirebaseStorage | null = null;

export const auth: Auth = (() => {
  if (!authInstance) {
    authInstance = getAuth(getFirebaseApp());
  }
  return authInstance;
})();

export const db: Firestore = (() => {
  if (!dbInstance) {
    dbInstance = getFirestore(getFirebaseApp());
  }
  return dbInstance;
})();

export const storage: FirebaseStorage = (() => {
  if (!storageInstance) {
    storageInstance = getStorage(getFirebaseApp());
  }
  return storageInstance;
})();

export default getFirebaseApp();
