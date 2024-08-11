'use client';

import React, { useEffect } from 'react';
import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import useAuth from './hooks/useAuth'; // Adjust the path as necessary
import { auth } from './firebase'; // Import the auth object

const Home: React.FC = () => {
  const router = useRouter();
  const { user, loading } = useAuth(auth!); // Assuming useAuth provides user and loading status

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard'); // Redirect to dashboard if user is logged in
    }
  }, [user, loading, router]);

  const handleLoginClick = () => {
    router.push('/login'); // Navigate to the login page
  };

  if (loading) {
    return <Text>Loading...</Text>; // Show loading state while authentication status is being determined
  }

  return (
    <Box className="container" p={4}>
      <Heading as="h1" mb={4}>Welcome to Our Application</Heading>
      <Text mb={4}>Please log in or sign up to continue.</Text>
      <Button colorScheme="teal" onClick={handleLoginClick}>
        Go to Login
      </Button>
    </Box>
  );
};

export default Home;
