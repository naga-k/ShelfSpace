//hooks/useAuth.tsx

import { useState, useEffect, useCallback } from 'react';
import {
  Auth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  createUserWithEmailAndPassword,
  User as FirebaseUser,
} from 'firebase/auth';

interface AuthState {
  user: FirebaseUser | null;
  loading: boolean;
  error: string | null;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const useAuth = (auth: Auth | undefined): AuthState => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!auth) {
      console.error('Firebase auth is not initialized');
      setLoading(false); // Ensure loading is set to false if auth is not available
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        setUser(null);
      }
      setLoading(false); // Ensure loading is set to false
    }, (err) => {
      setError(err.message);
      setLoading(false); // Ensure loading is set to false in case of error
    });

    return () => {
      unsubscribe();
      console.log('Unsubscribed from auth state changes');
    };
  }, [auth]);

  const loginWithEmail = async (email: string, password: string) => {
    if (!auth) {
      setError('Firebase auth is not initialized');
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError(`Error logging in with email: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const signUpWithEmail = async (email: string, password: string) => {
    if (!auth) {
      setError('Firebase auth is not initialized');
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError(`Error signing up with email: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const logout = useCallback(async () => {
    if (!auth) {
      setError('Firebase auth is not initialized');
      return;
    }

    setLoading(true);
    try {
      await signOut(auth);
    } catch (err: any) {
      setError(`Error logging out: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [auth]);

  const loginWithGoogle = useCallback(async () => {
    if (!auth) {
      setError('Firebase auth is not initialized');
      return;
    }

    const provider = new GoogleAuthProvider();

    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      setError(`Error logging in with Google: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [auth]);

  return { user, loading, error, loginWithEmail, signUpWithEmail, loginWithGoogle, logout };
};

export default useAuth;
