'use client';

import React, { useState } from 'react';
import { Box, Heading, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { auth } from '../../firebase';
import useAuth from '../../hooks/useAuth';
import LoginForm from '../../components/login/LoginForm';
import SignUpForm from '../../components/login/SignUpForm';
import AuthTabs from '../../components/login/AuthTabs';
import GoogleButton from '../../components/login/GoogleButton';
import { useLoginHandler, useSignUpHandler } from '../../hooks/useAuthHandlers';

const Auth: React.FC = () => {
  const { loginWithEmail, signUpWithEmail, loginWithGoogle } = useAuth(auth);
  const [loading, setLoading] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const toast = useToast();
  const router = useRouter();

  const handleLoginWithEmail = useLoginHandler(auth ?? null, loginWithEmail, setLoading, toast, router);
  const handleSignUpWithEmail = useSignUpHandler(auth ?? null, signUpWithEmail, setLoading, toast, router);

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="lg" boxShadow="lg" bg="white">
      <Heading as="h2" size="lg" mb={6} textAlign="center">Authentication</Heading>
      <AuthTabs onChange={(index) => setAuthMode(index === 0 ? 'login' : 'signup')}>
        <LoginForm onSubmit={handleLoginWithEmail} loading={loading} />
        <SignUpForm onSubmit={handleSignUpWithEmail} loading={loading} />
      </AuthTabs>
      <GoogleButton authMode={authMode} loading={loading} onClick={loginWithGoogle} setLoading={setLoading} />
    </Box>
  );
};

export default Auth;