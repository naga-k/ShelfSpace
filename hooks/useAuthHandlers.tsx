import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { Auth } from 'firebase/auth';

export const useLoginHandler = (
  auth: Auth | null,
  loginWithEmail: (email: string, password: string) => Promise<void>,
  setLoading: (loading: boolean) => void,
  toast: ReturnType<typeof useToast>,
  router: ReturnType<typeof useRouter>
) => async (email: string, password: string) => {
  if (!auth) {
    toast({
      title: 'Login Failed',
      description: 'Authentication failed. Please try again.',
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
    return;
  }

  setLoading(true);

  try {
    await loginWithEmail(email, password);
    if (auth.currentUser) {
      toast({
        title: 'Logged in successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      router.push('/dashboard');
    } else {
      toast({
        title: 'Login Failed',
        description: 'Authentication failed. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  } catch (err: any) {
    console.error('Login with email failed:', err);
    toast({
      title: 'Login Failed',
      description: 'Authentication failed. Please try again.',
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  } finally {
    setLoading(false);
  }
};

export const useSignUpHandler = (
  auth: Auth | null,
  signUpWithEmail: (email: string, password: string) => Promise<void>,
  setLoading: (loading: boolean) => void,
  toast: ReturnType<typeof useToast>,
  router: ReturnType<typeof useRouter>
) => async (email: string, password: string, confirmPassword: string) => {
  if (!auth) {
    toast({
      title: 'Sign Up Failed',
      description: 'Authentication failed. Please try again.',
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
    return;
  }

  setLoading(true);

  if (password !== confirmPassword) {
    toast({
      title: 'Sign Up Failed',
      description: 'Passwords do not match.',
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
    setLoading(false);
    return;
  }

  try {
    await signUpWithEmail(email, password);
    if (auth.currentUser) {
      toast({
        title: 'Signed up successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      router.push('/dashboard');
    } else {
      toast({
        title: 'Sign Up Failed',
        description: 'Authentication failed. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  } catch (err: any) {
    console.error('Sign up with email failed:', err);
    toast({
      title: 'Sign Up Failed',
      description: 'Authentication failed. Please try again.',
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  } finally {
    setLoading(false);
  }
};