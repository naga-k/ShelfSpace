'use client'; // Add this directive to mark the component as a Client Component

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import InventoryForm from '../../components/InventoryForm'; // Adjust the path as necessary
import InventoryList from '../../components/InventoryList'; // Adjust the path as necessary
import useAuth from '../../hooks/useAuth'; // Adjust the path as necessary

const Dashboard: React.FC = () => {
    console.log('Dashboard.tsx rendering');
    const { user, loading, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        console.log('Loading:', loading);
        console.log('User:', user);

        if (!loading && !user) {
            console.log('Redirecting to /login');
            router.push('/login');
        }
    }, [user, loading, router]);

    const handleLogout = () => {
        logout(); // Call the logout function from the useAuth hook
        router.push('/'); // Redirect to the homepage
    };

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (!user) {
        return null; // Rendering nothing while redirecting
    }

    return (
        <Box className="container" p={4}>
            <Heading as="h1" mb={4}>Inventory Management</Heading>
            <Button onClick={handleLogout} mb={4}>Log Out</Button>
            <InventoryForm />
            <InventoryList />
        </Box>
    );
};

export default Dashboard;
