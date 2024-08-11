'use client'; // Add this directive to mark the component as a Client Component

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import InventoryForm from '../../components/InventoryForm'; // Adjust the path as necessary
import InventoryList from '../../components/InventoryList'; // Adjust the path as necessary
import useAuth from '../../hooks/useAuth'; // Adjust the path as necessary
import { auth } from '../../firebase'; // Import the auth object

const Dashboard: React.FC = () => {
    console.log('Dashboard.tsx rendering');

    const authData = useAuth(auth!);
    const router = useRouter();

    useEffect(() => {
        if (!authData.user) {
            router.push('/login');
        }
    }, [authData.user, router]);

    // Ensure auth is not undefined
    if (!auth) {
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