'use client';

import React, { useState, useEffect } from 'react';
import useInventory from '../../hooks/useInventory';
import { Box, Button, Input, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionButton = motion(Button); // Motion-enhanced Button component
const MotionInput = motion(Input); // Motion-enhanced Input component
const MotionNumberInput = motion(NumberInput); // Motion-enhanced NumberInput component

const InventoryForm: React.FC = () => {
  const { addItem } = useInventory();
  const [name, setName] = useState('');
  const [count, setCount] = useState<number | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  // Handle count value on blur
  const handleBlur = () => {
    if (count === 0) {
      setError('Count cannot be zero. Please enter a valid number.');
      setCount(undefined); // Optionally reset or handle as needed
    } else if (count === undefined || isNaN(count)) {
      setError('Invalid number. Please enter a valid number.');
    } else {
      setError(null);
    }
  };

  // Clamp value within range manually on submit
  const clampCount = (value: number | undefined) => {
    if (value === undefined) return 0;
    return Math.max(0, Math.min(value, 10000)); // Assuming 10000 is the max valid value; adjust as needed
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === '' || count === undefined || count === 0) {
      setError('Please provide a valid item name and count.');
      return;
    }
    await addItem(name, clampCount(count));
    setName('');
    setCount(undefined);
    setError(null); // Clear any existing errors
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="md" boxShadow="md" bg="white" width="100%">
      <Box as="form" onSubmit={handleSubmit} width="100%">
        <Box display="flex" flexDirection="row" mb={4} width="100%">
          <MotionInput
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Item name"
            mr={2}
            flex="1"
            whileFocus={{ scale: 1.05 }} // Slightly scale up when focused
            transition={{ duration: 0.2 }} // Smooth transition
          />
          <MotionNumberInput
            value={count === undefined ? '' : count}
            onChange={(valueString) => setCount(valueString ? parseInt(valueString, 10) : undefined)}
            min={0}
            step={1}
            mr={2}
            flex="1"
            allowMouseWheel
            onBlur={handleBlur}
            // No built-in keepWithinRange and clampValueOnBlur, managed manually
            whileFocus={{ scale: 1.05 }} // Slightly scale up when focused
            transition={{ duration: 0.2 }} // Smooth transition
          >
            <NumberInputField placeholder="Item count" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </MotionNumberInput>
          <MotionButton
            type="submit"
            colorScheme="teal"
            whileHover={{ scale: 1.1 }} // Scale up on hover
            whileTap={{ scale: 0.9 }} // Scale down on click
            transition={{ duration: 0.2 }} // Smooth transition
          >
            Add Item
          </MotionButton>
        </Box>
        {error && <Box color="red.500">{error}</Box>} {/* Display error message */}
      </Box>
    </Box>
  );
};

export default InventoryForm;
