// app/firebase.tsx

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

let firebaseApp: FirebaseApp | null = null;
let firestore: ReturnType<typeof getFirestore> | null = null;
let analytics: ReturnType<typeof getAnalytics> | null = null;
let auth: ReturnType<typeof getAuth> | null = null;

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
    };

    firebaseApp = initializeApp(firebaseConfig);
    firestore = getFirestore(firebaseApp);
    auth = getAuth(firebaseApp);

    try {
      if (await isSupported()) {
        analytics = getAnalytics(firebaseApp);
      }
    } catch (error) {
      console.warn('Analytics is not supported:', error);
    }
  }
};

initializeFirebase();

export { firestore, analytics, auth };
