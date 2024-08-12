"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Heading, Text, Button, VStack, Container, Center } from '@chakra-ui/react';
import InventoryForm from './InventoryForm'; // Adjust the path as necessary
import InventoryList from './InventoryList'; // Adjust the path as necessary
import useAuth from '../hooks/useAuth'; // Adjust the path as necessary
import { auth } from '../firebase'; // Import the auth object

const Dashboard: React.FC = () => {
    const { user, loading, logout } = useAuth(auth);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        // Check loading and user state
        if (!loading) {
            const timer = setTimeout(() => {
                if (!user) {
                    console.log('User not found, redirecting to login');
                    router.push('/login');
                } else {
                    setIsLoading(false); // Set loading to false if user is authenticated
                }
            }, 100);

            return () => clearTimeout(timer);
        }
    }, [user, loading, router]);

    if (isLoading) {
        return <Center h="100vh">Loading...</Center>;
    }

    return (
        <Container maxW="container.lg" p={4}>
            <VStack spacing={6} align="center" width="full">
                <Heading as="h1" size="2xl" textAlign="center">Dashboard</Heading>
                <Text fontSize="lg" textAlign="center">Here you can add or edit items in your ShelfSpace!</Text>
                <Box width="full" maxW="container.md">
                    <InventoryList />
                </Box>
                <Box width="full" maxW="container.md">
                    <InventoryForm />
                </Box>
                <Button colorScheme="teal" onClick={() => logout()}>Logout</Button>
            </VStack>
        </Container>
    );
};

export default Dashboard;
