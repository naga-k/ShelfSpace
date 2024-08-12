"use client";

import React, { useEffect } from 'react';
import { Box, Button, Heading, Text, VStack, Center } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import useAuth from './hooks/useAuth'; // Adjust the path as necessary
import { auth } from './firebase'; // Import the auth object

const Home: React.FC = () => {
  const router = useRouter();
  const { user, loading } = useAuth(auth); // Assuming useAuth provides user and loading status

  useEffect(() => {
    console.log('Loading:', loading); // Debugging log
    console.log('User:', user); // Debugging log

    if (!loading && user) {
      router.push('/dashboard'); // Redirect to dashboard if user is logged in
    }
  }, [user, loading, router]);

  const handleLoginClick = () => {
    router.push('/login'); // Navigate to the login page
  };

  return (
    <Center h="100vh" bg="gray.100"> {/* Center content vertically and horizontally */}
      <VStack spacing={4} p={4} bg="white" borderRadius="md" boxShadow="md" textAlign="center">
        <Heading as="h1" mb={4}>Welcome to ShelfSpace</Heading>
        <Text mb={4}>Please log in or sign up to continue.</Text>
        <Button colorScheme="teal" onClick={handleLoginClick}>
          Login / Sign Up
        </Button>
      </VStack>
    </Center>
  );
};

export default Home;
