import React from 'react';
import { Button, Spinner, useToast } from '@chakra-ui/react';
import { FaGoogle } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { auth } from '../../firebase';
import useAuth from '../../hooks/useAuth';

interface GoogleButtonProps {
  authMode: 'login' | 'signup';
  loading: boolean;
  onClick: () => Promise<void>;
  setLoading: (loading: boolean) => void;
}

const GoogleButton: React.FC<GoogleButtonProps> = ({ authMode, loading, onClick, setLoading }) => {
  const toast = useToast();
  const router = useRouter();

  const handleGoogleLogin = async () => {
    if (!auth) {
      toast({
        title: 'Login Failed',
        description: 'Authentication failed. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      console.error('Auth is undefined');
      return;
    }

    setLoading(true);

    try {
      await onClick();
      if (auth.currentUser) {
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
      console.error('Login with Google failed:', err);
      toast({
        title: 'Login Failed',
        description: 'Failed to login with Google. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      mt={4}
      colorScheme="blue"
      width="full"
      onClick={handleGoogleLogin}
      isDisabled={loading}
      leftIcon={<FaGoogle />}
    >
      {loading ? <Spinner size="sm" /> : (authMode === 'login' ? 'Login' : 'Sign Up') + ' with Google'}
    </Button>
  );
};

export default GoogleButton;