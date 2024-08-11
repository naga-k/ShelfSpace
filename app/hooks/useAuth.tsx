// app/hooks/useAuth.tsx

import { useState, useEffect, useCallback } from 'react';
import { auth } from '../firebase';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!auth) {
      console.error('Firebase auth is not initialized');
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('User state changed:', user);
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithEmail = async (email: string, password: string) => {
    setLoading(true);
    try {
      console.log('Logging in with email:', email);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
      console.error('Error logging in with email', err);
    } finally {
      setLoading(false);
    }
  };

  const signUpWithEmail = async (email: string, password: string) => {
    setLoading(true);
    try {
      console.log('Signing up with email:', email);
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
      console.error('Error signing up with email', err);
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = useCallback(async () => {
    if (!auth) {
      console.error('Firebase auth is not initialized');
      return;
    }

    const provider = new GoogleAuthProvider();

    try {
      console.log('Logging in with Google');
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error logging in with Google', error);
    }
  }, []);

  const logout = useCallback(async () => {
    if (!auth) {
      console.error('Firebase auth is not initialized');
      return;
    }

    try {
      console.log('Logging out');
      await signOut(auth);
    } catch (error) {
      console.error('Error logging out', error);
    }
  }, []);

  return { user, loading, error, loginWithEmail, signUpWithEmail, loginWithGoogle, logout };
};

export default useAuth;
