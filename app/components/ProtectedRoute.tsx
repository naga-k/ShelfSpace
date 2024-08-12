'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Text } from '@chakra-ui/react';
import useAuth from '../hooks/useAuth';
import { auth } from '../firebase';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth(auth);
  const router = useRouter();
  const [redirecting, setRedirecting] = useState<boolean>(false);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        setRedirecting(true);
        router.push('/login');
      } else {
        setRedirecting(false);
      }
    }
  }, [user, loading, router]);

  if (loading || redirecting) {
    return (
      <Box p={4} textAlign="center">
        <Text>Loading...</Text>
      </Box>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
