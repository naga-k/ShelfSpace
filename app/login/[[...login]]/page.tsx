'use client';

import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Heading, Input, Text, Spinner, Tabs, TabList, TabPanels, Tab, TabPanel, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import useAuth from '../../hooks/useAuth';
import { auth } from '../../firebase'; // Import auth instance

const Auth: React.FC = () => {
  const { loginWithEmail, loginWithGoogle, signUpWithEmail } = useAuth(auth!);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const toast = useToast();
  const router = useRouter();

  // Login with email
  const handleLoginWithEmail = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await loginWithEmail(email, password);
      toast({
        title: 'Logged in successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      router.push('/dashboard'); // Redirect to dashboard
    } catch (err) {
      console.error('Login with email failed:', err);
      setError('Failed to login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Sign up with email
  const handleSignUpWithEmail = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      await signUpWithEmail(email, password);
      toast({
        title: 'Signed up successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      router.push('/dashboard'); // Redirect to dashboard
    } catch (err) {
      console.error('Sign up with email failed:', err);
      setError('Failed to sign up. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Google login
  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      await loginWithGoogle();
      router.push('/dashboard'); // Redirect to dashboard
    } catch (err) {
      console.error('Login with Google failed:', err);
      setError('Failed to login with Google. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxW="lg" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <Heading as="h2" size="lg" mb={6} textAlign="center">Authentication</Heading>
      <Tabs variant="enclosed">
        <TabList>
          <Tab onClick={() => setAuthMode('login')}>Login</Tab>
          <Tab onClick={() => setAuthMode('signup')}>Sign Up</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {authMode === 'login' && (
              <>
                <form onSubmit={handleLoginWithEmail}>
                  <FormControl id="email" mb={4}>
                    <FormLabel>Email:</FormLabel>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </FormControl>
                  <FormControl id="password" mb={4}>
                    <FormLabel>Password:</FormLabel>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </FormControl>
                  <Button
                    type="submit"
                    colorScheme="teal"
                    width="full"
                    isDisabled={loading}
                  >
                    {loading ? <Spinner size="sm" /> : 'Login with Email'}
                  </Button>
                </form>
                <Button
                  mt={4}
                  colorScheme="blue"
                  width="full"
                  onClick={handleGoogleLogin}
                  isDisabled={loading}
                >
                  {loading ? <Spinner size="sm" /> : 'Login with Google'}
                </Button>
              </>
            )}
          </TabPanel>
          <TabPanel>
            {authMode === 'signup' && (
              <>
                <form onSubmit={handleSignUpWithEmail}>
                  <FormControl id="email" mb={4}>
                    <FormLabel>Email:</FormLabel>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </FormControl>
                  <FormControl id="password" mb={4}>
                    <FormLabel>Password:</FormLabel>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </FormControl>
                  <FormControl id="confirm-password" mb={4}>
                    <FormLabel>Confirm Password:</FormLabel>
                    <Input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </FormControl>
                  <Button
                    type="submit"
                    colorScheme="teal"
                    width="full"
                    isDisabled={loading}
                  >
                    {loading ? <Spinner size="sm" /> : 'Sign Up with Email'}
                  </Button>
                </form>
                <Button
                  mt={4}
                  colorScheme="blue"
                  width="full"
                  onClick={handleGoogleLogin}
                  isDisabled={loading}
                >
                  {loading ? <Spinner size="sm" /> : 'Sign Up with Google'}
                </Button>
              </>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
      {error && <Text mt={4} color="red.500" textAlign="center">{error}</Text>}
    </Box>
  );
};

export default Auth;
