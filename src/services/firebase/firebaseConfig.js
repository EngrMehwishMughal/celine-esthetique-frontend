// Import Firebase function that starts the app with your project settings
import { initializeApp } from "firebase/app";
// Import helper to use Firebase Authentication (login, signup, etc.)
import { getAuth } from "firebase/auth";
// Import helper to use Cloud Firestore database
import { getFirestore } from "firebase/firestore";
// Import helper to use Firebase Storage for files and images
import { getStorage } from "firebase/storage";

// Firebase project settings read from environment variables in .env
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Start Firebase with the config above
const app = initializeApp(firebaseConfig);

// Export auth so other files can sign users in or out
export const auth = getAuth(app);
// Export database handle for reading and writing documents
export const db = getFirestore(app);
// Export storage handle for uploading and downloading files
export const storage = getStorage(app);
