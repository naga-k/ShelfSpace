'use client'; // Add this directive to mark the component as a Client Component

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import InventoryForm from '../components/InventoryForm'; // Adjust the path as necessary
import InventoryList from '../components/InventoryList'; // Adjust the path as necessary
import useAuth from '../hooks/useAuth'; // Adjust the path as necessary
import { auth } from '../firebase'; // Import the auth object

const Dashboard: React.FC = () => {
    console.log('Dashboard.tsx rendering');

    const authData = useAuth(auth);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true); // Track loading state

    useEffect(() => {
        // Use a timeout to ensure we wait for auth state to be settled
        const timer = setTimeout(() => {
            if (authData.loading) {
                setIsLoading(true);
            } else {
                setIsLoading(false);
                if (!authData.user) {
                    console.log('User not found, redirecting to login');
                    router.push('/login');
                }
            }
        }, 100); // 100ms timeout to wait for auth state

        // Cleanup timeout on unmount
        return () => clearTimeout(timer);
    }, [authData.user, authData.loading, router]);

    // Show a loading state while waiting for authentication status
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Box>
            <Heading>Dashboard</Heading>
            <Text>Welcome to the dashboard!</Text>
            <Button onClick={authData.logout}>Logout</Button>
            <InventoryForm />
            <InventoryList />
        </Box>
    );
};

export default Dashboard;
