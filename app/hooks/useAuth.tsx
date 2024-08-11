import { useState, useEffect, useCallback } from 'react'; // Import useCallback from react
import { Auth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, createUserWithEmailAndPassword } from 'firebase/auth';

interface User {
  email: string;
  uid: string;
  // Add other user properties as needed
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const useAuth = (auth: Auth): AuthState => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!auth) {
      console.error('Firebase auth is not initialized');
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const { email, uid } = firebaseUser;
        setUser({ email: email || '', uid });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  const loginWithEmail = async (email: string, password: string) => {
    if (!auth) {
      setError('Firebase auth is not initialized');
      return;
    }

    setLoading(true);
    try {
      console.log('Logging in with email:', email);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError(err.message);
      console.error('Error logging in with email', err);
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
      console.log('Signing up with email:', email);
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError(err.message);
      console.error('Error signing up with email', err);
    } finally {
      setLoading(false);
    }
  };

  const logout = useCallback(async () => {
    if (!auth) {
      setError('Firebase auth is not initialized');
      return;
    }

    try {
      console.log('Logging out');
      await signOut(auth);
    } catch (error) {
      console.error('Error logging out', error);
    }
  }, [auth]);

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
  }, [auth]);

  return { user, loading, error, loginWithEmail, signUpWithEmail, loginWithGoogle, logout };
};

export default useAuth;
