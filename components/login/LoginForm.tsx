import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Spinner, VStack, Icon, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { HiMail } from 'react-icons/hi';

type LoginFormProps = {
  onSubmit: (email: string, password: string) => void;
  loading: boolean;
};

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, loading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(email, password);
  };

  return (
    <VStack spacing={4} align="stretch">
      <form onSubmit={handleSubmit}>
        <FormControl id="email" mb={4}>
          <FormLabel>Email:</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<Icon as={HiMail} boxSize={5} color="gray.500" />} />
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </InputGroup>
        </FormControl>
        <FormControl id="password" mb={4}>
          <FormLabel>Password:</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </FormControl>
        <Button type="submit" colorScheme="teal" width="full" isDisabled={loading} rightIcon={loading ? <Spinner size="sm" /> : undefined}>
          {loading ? 'Logging in...' : 'Login with Email'}
        </Button>
      </form>
    </VStack>
  );
};

export default LoginForm;