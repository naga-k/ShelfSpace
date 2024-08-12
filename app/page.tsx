'use client'

import React, { useEffect } from 'react';
import { Box, Button, Heading, Text, VStack, Center } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import useAuth from '../hooks/useAuth'; // Adjust the path as necessary
import { auth } from '../firebase'; // Import the auth object
import { motion } from 'framer-motion'; // Import motion from Framer Motion

const MotionButton = motion(Button); // Create a motion-enhanced Button component

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
      <VStack spacing={4} p={8} bg="white" borderRadius="md" boxShadow="md" textAlign="center">
        <Heading as="h1" mb={4}>ShelfSpace</Heading>
        <Text mb={4}>Please log in or sign up to continue.</Text>
        <MotionButton
          colorScheme="teal"
          onClick={handleLoginClick}
          whileHover={{ scale: 1.1 }} // Scale up on hover
          whileTap={{ scale: 0.9 }} // Scale down on click
          transition={{ duration: 0.2 }} // Transition duration
        >
          Login / Sign Up
        </MotionButton>
      </VStack>
    </Center>
  );
};

export default Home;
