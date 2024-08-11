// app/firebase.tsx

import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAnalytics, Analytics } from 'firebase/analytics';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

export interface User {
  uid: string;
  email: string | null;
  // Add other properties as needed
}

let firebaseApp: FirebaseApp | undefined;
let firestore: Firestore | undefined;
let analytics: Analytics | undefined;
let auth: Auth | undefined;

const initializeFirebase = async () => {
  if (!firebaseApp) {
    // Initialize Firebase only once
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    };

    firebaseApp = initializeApp(firebaseConfig);
    auth = getAuth(firebaseApp);
    firestore = getFirestore(firebaseApp);
    analytics = getAnalytics(firebaseApp);
  }
};

export { firebaseApp, auth, firestore, analytics, initializeFirebase };