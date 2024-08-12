// hooks/useAuth.tsx

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
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        console.log('User signed in:', {
          email: firebaseUser.email,
          uid: firebaseUser.uid,
        });
        setUser(firebaseUser);
      } else {
        console.log('No user signed in');
        setUser(null);
      }
      setLoading(false);
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
      console.log('Attempting to log in with email:', email);
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Successfully logged in with email');
    } catch (err: any) {
      setError(`Error logging in with email: ${err.message}`);
      console.error('Error logging in with email:', err);
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
      console.log('Attempting to sign up with email:', email);
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('Successfully signed up with email');
    } catch (err: any) {
      setError(`Error signing up with email: ${err.message}`);
      console.error('Error signing up with email:', err);
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
      console.log('Attempting to log out');
      await signOut(auth);
      console.log('Successfully logged out');
    } catch (err: any) {
      setError(`Error logging out: ${err.message}`);
      console.error('Error logging out:', err);
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
      console.log('Attempting to log in with Google');
      await signInWithPopup(auth, provider);
      console.log('Successfully logged in with Google');
    } catch (err: any) {
      setError(`Error logging in with Google: ${err.message}`);
      console.error('Error logging in with Google:', err);
    } finally {
      setLoading(false);
    }
  }, [auth]);

  return { user, loading, error, loginWithEmail, signUpWithEmail, loginWithGoogle, logout };
};

export default useAuth;
